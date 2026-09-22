---
タグ: []
作成日時: 2024-10-03T14:40:00
URL: https://ymmt.hatenablog.com/entry/2024/10/02/222243
Tags: [topic/デザインシステム/配信基盤]
---
GitHub Actions で CI している皆様、こんにちは。

GitHub Actions 便利ですよね。使わない日がないというくらい毎日お世話になっています。

さて、CI といえば良く問題になるのが実行時間。 長い待ち時間は開発効率を下げますし、プライベートリポジトリだと Runner の費用も嵩んでしまいます。 時間を短縮する方法は色々ありますが、一手目によく行われるのが依存パッケージのキャッシュじゃないかなと思います。

例えば Go で開発していると、依存パッケージは `~/go/pkg/mod` にダウンロードして保存されます。 これを CI 実行のたびにダウンロードしてコンパイルするのは時間とお金の無駄というものです。

幸い、GitHub Actions には CI の実行間でこういった依存パッケージを保存して再利用できるキャッシュ機能があります。 詳しくは以下のドキュメントをご覧ください。

[Caching dependencies to speed up workflows - GitHub Docs](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows)

とか書いてますが、面倒くさがりな私はこれまでまともにこのキャッシュ機能を調べたことはありませんでした。 なぜって GitHub はとても親切なので、以下のようにするだけでキャッシュ機能で依存関係を保存して再利用できるようにしてくれているからです。

```plain text
jobs:
  test:
    name: Run tests
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-go@v5
      with:
        cache: true

```

注目は `cache: true` です。こうするだけで Go の依存パッケージをキャッシュしてくれます。 しかもデフォルトが true なので、実は書かなくても大丈夫。えらい！楽！以上！

・・・そうは問屋が卸さなかったのが今回の話です。

ある日管理者から、「お宅のリポジトリ、まともにキャッシュ使えてないので見直してください」とお達しを受けました。 いわく、

- リポジトリに保存できるキャッシュ容量の上限 10 GiB を一日以内に使い果たしている
- ブランチ毎に保存されているが、マージキューのブランチでも保存していて無駄
- デフォルトブランチだけで保存するようにしたらどうか

不勉強がたたって、何を言われているのか理解できませんでした 😖

ひとまずキャッシュの保存状況を見てみたところ、以下のように**同一のキーが多数保存されているのを見つけました**。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/ymmt2005/20241002/20241002220413.png)

cached objects with the same key

キーは依存関係を表す `go.sum` というファイルから計算されていて、同じキーなら同じ内容になってしかるべきです。 当然複数保存してほしいことなどなく、一つ保存したら後の CI 実行はそれを再利用するだけにしてほしい。

どうしてこのようになるのか調べたところ、なんと**キャッシュはブランチ毎に名前空間が分かれて保存される**という仕様でした。 上記のドキュメントに以下の記述を見つけられるはずです。

> Access restrictions provide cache isolation and security by creating a logical boundary between different branches or tags. Workflow runs can restore caches created in either the current branch or the default branch (usually main).

ブランチ毎に保存され、しかも基本的に他のブランチで保存したキャッシュは再利用できないとあります。 再利用したければデフォルトブランチ（`main`）で保存しなさいというわけですね。

当該のリポジトリはかなり大きなコードを含んでおり、多人数の開発者が日々プルリクエストを提出しています。 `actions/setup-go` による簡易なキャッシュ設定はすべてのブランチでキャッシュを保存するため、提出される PR 数（≒ブランチ数）と同じだけキャッシュに保存されていたというわけです。 さらに [merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) も利用していたため PR 数の二倍保存されていたという始末でした。

理解できたところで、解決方法は単純で `main` ブランチでのみキャッシュに保存するようにすれば良いです。 これは `actions/setup-go` の簡易設定ではできず、[`actions/cache/restore`](https://github.com/marketplace/actions/cache)[ と ](https://github.com/marketplace/actions/cache)[`actions/cache/save`](https://github.com/marketplace/actions/cache) を使い分けなければいけません。 具体的には以下のようになります。

```plain text
jobs:
  test:
    name: Run tests
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-go@v5
      with:
        cache: false  # デフォルト true なので false にしないといけない
    - uses: actions/cache/restore@v4
      id: go-cache
      with:
        path: |
          ~/.cache/go-build
          ~/go/pkg/mod
        key: go-${{ hashFiles('go.sum') }}
        restore-keys: |
          go-  # 正確にマッチするものがなくても prefix マッチで拾ってきてくれる。
    - run: go test ./...
    - uses: actions/cache/save@v4
      if: github.ref_name == 'main'    # main でだけ保存
      with:
        path: |
          ~/.cache/go-build
          ~/go/pkg/mod
        key: ${{ steps.go-cache.outputs.cache-primary-key }}

```

というわけで、無知は罪という話でした。