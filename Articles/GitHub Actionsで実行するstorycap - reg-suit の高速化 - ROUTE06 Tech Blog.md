---
URL: https://tech.route06.co.jp/entry/2023/03/29/080000
Created: 2024-03-28T01:41:00
Tags: [topic/技術/テスト]
---
こんにちは！ROUTE06 プロダクトデベロップメント本部の [@mh4gf](https://twitter.com/MH4GF) です。

現在僕が関わっているプロジェクトでは、実装の変更に伴う UI のデグレードを検知するために[storycap](https://github.com/reg-viz/storycap)と[reg-suit](https://github.com/reg-viz/reg-suit)を利用した Visual Regression Test を GitHub Actions で実施しています。

運用を進める中で撮影対象のスクリーンショット数も増え、テスト実行時間の増加に悩まされてきました。テスト高速化に取り組みいくつかの改善に成功したため、この記事でその方法を紹介します。

## 3 行まとめ

- まず最初に取り組むべき並列実行の基本についてはこの記事を参照してください [https://blog.wadackel.me/2022/vrt-performance-optimize/](https://blog.wadackel.me/2022/vrt-performance-optimize/)
- turborepo を利用し storybook の差分ビルドを行う
- GitHub Actions では Job ごとに依存パッケージのインストールが必要になるため、npx での実行やパッケージ分離などを利用し短縮化する

## 前提となる技術スタック

現在のプロジェクトで利用している技術スタックは以下です。

- Next.js v13
- Storybook v6 / Webpack
- storycap v4.0.0
- reg-suit v0.12.1
- GitHub Actions

また yarn workspace を利用した monorepo によるパッケージ分離を行なっています。以下のようなディレクトリ構成となっています。

```plain text
./
├── apps/
│   ├── app/
│   └── storybook/
├── packages/
│   └── some-package/
├── lib/
│   └── reg-suit/
└── package.json
```

`app/` は Next.js アプリケーション、 `storybook/` は storybook 関連の依存関係や設定をまとめています。 `packages/` はいくつかのパッケージにモジュール分割してロジックを管理しています。

`lib/` に含めている `reg-suit/` には reg-suit とプラグインをまとめており、yarn workspace の管理外の独立したパッケージとしています。今回の高速化に関わるため後述します。

また本記事では storycap や reg-suit を始めいくつかのツールを利用した実例を紹介しますが、それぞれのツールの利用方法等は説明を省略しています。あらかじめご了承ください。

## 起きていた問題

高速化を実施する前は以下のような状況となっていました。

- スクリーンショット対象の Story 数は 900 件
- Play function を多用しており、レンダリング終了に時間がかかる Story がいくつかある
- ワークフローの終了まで 30 分以上かかっていた

## 結果

以下が実際のプロジェクトでの Summary のスクリーンショットです。スクリーンショット撮影を 15 並列で実施し、結果として 11 分で完了するようになりました。

30 分以上かかっていたことを考えると 63%の削減が可能となりました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/r/route06/20230329/20230329080002.png)

チューニング後のGitHub Actionsでの実行結果

この計測時間は後述する turborepo による build フェーズのスキップは行なっていない場合の時間となるため、build フェーズがスキップできる状況であればさらに高速に実行できます。

## storycap の並列実行

storycap / reg-suit を利用した VRT の高速化でまず取り組むべきことは storycap を複数マシンで並列実行することです。詳しくは両パッケージ作成者の [@wadackel](https://twitter.com/wadackel) さんの記事によくまとまっています。

[https://blog.wadackel.me/2022/vrt-performance-optimize/](https://blog.wadackel.me/2022/vrt-performance-optimize/)

上記記事の紹介だけではこの記事の価値がなくなってしまいますが、この記事では GitHub Actions 特有の改善内容を始めとした、追加で実施した改善内容について紹介します。

## 最終的なワークフローファイルの紹介

早速結論ですが、今回の最適化を実施したワークフローファイルを紹介します。

実際にプロジェクトで動かしているワークフローは monorepo のためもう少し複雑で、今回は簡略化したものとなります。

```plain text
// .github/workflows/vrt.yml
name: vrt

on:
  pull_request:

jobs:
  storybook-build:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    permissions:
      contents: read

    steps:
      - uses: actions/checkout@v3

      - name: Cache turbo build setup
        uses: actions/cache@v3
        with:
          path: ./.turbo
          key: ${{ runner.os }}-turbo-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-turbo-

      - name: Setup node env
        uses: actions/setup-node@v3.5.1
        with:
          node-version-file: ".node-version"
          cache: "yarn"
          cache-dependency-path: "yarn.lock"

      - name: Install dependencies
        run: yarn install --frozen-lockfile --prefer-offline

      - name: build storybook
        run: yarn build --filter=storybook

      - name: Upload storybook artifact
        uses: actions/upload-artifact@v3
        with:
          name: storybook-artifact
          path: apps/storybook/storybook-static
          retention-days: 1

  storybook-screenshot:
    needs: storybook-build
    runs-on: ubuntu-latest
    timeout-minutes: 15

    permissions:
      contents: read

    strategy:
      matrix:
        shard: [1/15, 2/15, 3/15, 4/15, 5/15, 6/15, 7/15, 8/15, 9/15, 10/15, 11/15, 12/15, 13/15, 14/15, 15/15]

    steps:
      - uses: actions/checkout@v3

      - name: Setup node env
        uses: actions/setup-node@v3.5.1
        with:
          node-version-file: ".node-version"
          cache: 'npm'
          cache-dependency-path: '.github/workflows/vrt.yml'

      - name: Install native dependencies
        run: sudo apt-get install fonts-ipafont-gothic

      - name: Download storybook artifact
        uses: actions/download-artifact@v3
        with:
          name: storybook-artifact
          path: apps/storybook/storybook-static

      - name: run storycap
        run: npx storycap http://127.0.0.1:6006 --serverCmd 'npx http-server storybook-static --ci -p 6006' --shard=${{ matrix.shard }}

      - name: Upload storybook screenshots
        uses: actions/upload-artifact@v3
        with:
          name: storycap-artifact
          path: apps/storybook/__screenshots__
          retention-days: 1

  regression:
    needs: storybook-screenshot
    runs-on: ubuntu-latest
    timeout-minutes: 15

    permissions:
      id-token: write
      contents: read

    env:
      CI: true
      AWS_ROLE_ARN: ${{ secrets.AWS_ROLE_ARN }}
      REG_NOTICE_CLIENT_ID: ${{ secrets.REG_NOTICE_CLIENT_ID }}

    defaults:
      run:
        working-directory: ./lib/reg-suit

    steps:
      - uses: actions/checkout@v3

      - name: Setup node env 🏗
        uses: actions/setup-node@v3.5.1
        with:
          node-version-file: ".node-version"
          cache: "yarn"
          cache-dependency-path: "lib/reg-suit/yarn.lock"

      - name: Install dependencies
        run: yarn install --frozen-lockfile --prefer-offline

      - name: Download storybook screenshots
        uses: actions/download-artifact@v3
        with:
          name: storycap-artifact
          path: apps/storybook/__screenshots__

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@master
        with:
          aws-region: ap-northeast-1
          role-to-assume: ${{ env.AWS_ROLE_ARN }}
          role-duration-seconds: 1800

      - name: run reg-suit
        run: yarn reg-suit run

```

フェーズごとに job を分離しています。

- build: storybook の build, turborepo による差分ビルドを実施する。artifact に build 成果物をアップロードする
- screenshot: artifact から build 成果物をダウンロードし serve、storycap を実行し、artifact にスクリーンショットファイルをアップロードする。shard オプションを使ってスクリーンショット対象を絞り込むことでこの job を並列化する。shard オプションは後述
- regression: artifact からスクリーンショットファイルをダウンロードし reg-suit を実行

それぞれの job を詳しく紹介していきます。

### build job

build-storybook を実行しビルドし、ビルド成果物を後続の job で利用するために Artifacts へアップロードします。

```plain text
storybook-build:
  runs-on: ubuntu-latest
  timeout-minutes: 15

  permissions:
    contents: read # git checkoutのために必要

  steps:
    - uses: actions/checkout@v3

    # turborepoのキャッシュをGitHub Actionsで扱う
    - name: Cache turbo build setup
      uses: actions/cache@v3
      with:
        path: ./.turbo
        key: ${{ runner.os }}-turbo-${{ github.sha }}
        restore-keys: |
          ${{ runner.os }}-turbo-

    - name: Setup node env
      uses: actions/setup-node@v3.5.1
      with:
        node-version-file: ".node-version"
        cache: "yarn"
        cache-dependency-path: "yarn.lock"

    - name: Install dependencies
      run: yarn install --frozen-lockfile --prefer-offline

    # turborepoによる差分ビルドを実施する。詳しくは後述
    - name: build storybook
      run: yarn build --filter=storybook

    - name: Upload storybook artifact
      uses: actions/upload-artifact@v3
      with:
        name: storybook-artifact
        path: apps/storybook/storybook-static
        retention-days: 1

```

### turborepo による差分ビルド

[turborepo](https://turbo.build/)を利用し、storybook のビルドで何度も同じ成果物のビルドが行われてしまうことを避けています。

この設定は本質的な VRT の実行時間削減には貢献しませんが、例えば「アプリケーションコードや story ファイルの変更はないが storycap や reg-suit の設定を変えて実行したい」といった状況でビルドフェーズをスキップすることが可能になります。

また今回の記事では簡略化のために単に「storybook のビルド」としていますが、実際のプロジェクトではコードジェネレート等 storybook のビルドの前に必要なビルドステップがあることも多いです。それらのビルドを差分実行できるようにしておくと効率的なビルド実行が可能となります。

今回は turborepo の詳細な説明はしませんが、実際の設定例を紹介します。turbo.json は以下のようにしています。

```plain text
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {}
  }
}

```

```plain text
// apps/storybook/turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": ["storybook-static/**"],
      "inputs": ["../app/**/*.tsx"]
    }
  }
}

```

inputs に指定したファイルに変更があれば差分ビルドさせます。実際にはプロジェクトごとに追加で必要な依存があるはずですので、適宜調整が必要となります。

続いて npm scripts は以下となっています。

```plain text
// package.json
"build": "turbo build --cache-dir=.turbo"

```

```plain text
// apps/storybook/package.json
"build": "build-storybook",

```

前述の通り GitHub Actions での実行内容は `yarn build --filter=storybook` としており、storybook だけをビルドさせます。

ここでは `--cache-dir` を指定しディレクトリを変更しています。turborepo はデフォルトでは `./node_modules/.cache/turbo` にキャッシュを保存しますが、GitHub Actions でキャッシュを扱うことを考えると node_modules は扱いづらいです。

そのため別ディレクトリに設定し GitHub Actions 上で actions/cache を利用しキャッシュを扱えるようにします。

[https://turbo.build/repo/docs/reference/command-line-reference#--cache-dir](https://turbo.build/repo/docs/reference/command-line-reference#--cache-dir)

### screenshot job

storycap を実行しスクリーンショットを撮る job です。

```plain text
storybook-screenshot:
  needs: storybook-build
  runs-on: ubuntu-latest
  timeout-minutes: 15

permissions:
  contents: read # git checkoutで必要

strategy:
  matrix:
    shard: [1/15, 2/15, 3/15, 4/15, 5/15, 6/15, 7/15, 8/15, 9/15, 10/15, 11/15, 12/15, 13/15, 14/15, 15/15] # ジョブの並列数。状況によって増減させて良い
steps:
  - uses: actions/checkout@v3

  # 実行時間の削減のためyarn installを実施しない。詳しくは後述
  - name: Setup node env
    uses: actions/setup-node@v3.5.1
    with:
      node-version-file: ".node-version"
      cache: "npm"
      cache-dependency-path: ".github/workflows/vrt.yml"

  # スクリーンショット画像で豆腐になってしまうため日本語フォントをダウンロード
  - name: Install native dependencies
    run: sudo apt-get install fonts-ipafont-gothic

  # build jobの成果物をダウンロード
  - name: Download storybook artifact
    uses: actions/download-artifact@v3
    with:
      name: storybook-artifact
      path: apps/storybook/storybook-static

  # npm scriptsで実施せずstorycapで実行する
  # serverCmdを利用しビルド成果物をserveする
  # shardオプションを利用してスクリーンショット対象を絞り込む
  - name: run storycap
    run: npx storycap http://127.0.0.1:6006 --serverCmd 'npx http-server storybook-static --ci -p 6006' --shard=${{ matrix.shard }}

  # 撮影したスクリーンショットをartifactへアップロード
  - name: Upload storybook screenshots
    uses: actions/upload-artifact@v3
    with:
      name: storycap-artifact
      path: apps/storybook/__screenshots__
      retention-days: 1

```

ここで重要なポイントは以下の二つです。

- npx で storycap を実行する
- shard オプションを利用してスクリーンショット対象を絞り込む
- artifact へのアップロードは並列するジョブ間で同じ name を指定しても問題ない

### npx で storycap を実行する

GitHub Actions では Circle CI の[Workspace](https://circleci.com/docs/ja/workspaces/)機能のようなジョブのセットアップ処理の共通化ができず、全ての job で git checkout と yarn install を行う必要があります。今回のプロジェクトは比較的大規模となっており、setup-node のキャッシュを利用したとしても yarn install で 1 分程度かかっていました。

job の分離により各ジョブで yarn install が行われることになるため、job 全体の体感時間としては build → screenshot → regression で yarn install に 3 分かかることになります。また screenshot job を 15 並列で実施すると billable time(課金対象時間)としては 15 分かかってしまいます。

解決策としては storycap を npx で単体実行することで yarn install をスキップすることができます。build job で生成した storybook-static ディレクトリがあるため、storycap は他のパッケージの依存なく単体で実行することが可能です。

注意点としては、npx で実行するものの package のインストールは依然として必要な点です。managed mode で storycap を利用するためには storybook に addon と decorator を追加する必要があるためです。storycap の利用方法についてはこちらをご覧ください。

[https://github.com/reg-viz/storycap/tree/v4.0.0#managed-mode](https://github.com/reg-viz/storycap/tree/v4.0.0#managed-mode)

また、npx で実行するパッケージを都度レジストリからダウンロードするのはよろしくないため、キャッシュする方法として setup-node の cache-dependency-path に workflow ファイルを指定するテクニックも有用です。

これにより workflow ファイルの変更によってキャッシュが破棄されます。

[https://til.simonwillison.net/github-actions/npm-cache-with-npx-no-package](https://til.simonwillison.net/github-actions/npm-cache-with-npx-no-package)

### shard オプションを利用してスクリーンショット対象を絞り込む

[元記事](https://blog.wadackel.me/2022/vrt-performance-optimize/)ではスクリーンショット対象の絞り込みのためにシェルスクリプトを用意することで解決していました。

しかし storycap v4.0.0 ではシャーディングを実現するための `--shard` オプションが追加されました。これは Jest や Playwright と同様に `1/2` のようなフォーマットで絞り込みを行うことができます。

そのため絞り込みのためのスクリプトを用意する必要なくマシンレベルでの job 分割が可能となりました。

### artifact へのアップロードは並列するジョブ間で同じ name を指定しても問題ない

screenshot job は並列で実行し、撮影したスクリーンショットを artifact へ保存します。ここで懸念としてあったのが並列したジョブ間で同じ artifact の保存が可能なのか？コンフリクトが発生することはないのか？という点でした。

結論から言うと特に問題はありませんでした。それぞれの job でアップロードするファイル群はそれぞれマージされて保存されるようです。job 間で同名ファイルパスでのアップロードがあるならば話は別ですが、シャーディングされた job で同名ファイルが生成されることはないので大丈夫なようです。

### regression job

最後に撮影したスクリーンショットを利用して reg-suit による比較を行います。

```plain text
regression:
  needs: storybook-screenshot
  runs-on: ubuntu-latest
  timeout-minutes: 15

  permissions:
    id-token: write # aws-actions/configure-aws-credentialsで利用
    contents: read # git checkoutで利用

  env:
    CI: true
    AWS_ROLE_ARN: ${{ secrets.AWS_ROLE_ARN }}
    REG_NOTICE_CLIENT_ID: ${{ secrets.REG_NOTICE_CLIENT_ID }}

  defaults:
    run:
      working-directory: ./lib/reg-suit # yarn workspace 管理外で実行するため working directory を変更する

  steps:
    - uses: actions/checkout@v3

    - name: Setup node env 🏗
      uses: actions/setup-node@v3.5.1
      with:
        node-version-file: ".node-version"
        cache: "yarn"
        cache-dependency-path: "lib/reg-suit/yarn.lock"

    - name: Install dependencies
      run: yarn install --frozen-lockfile --prefer-offline

    # 撮影したスクリーンショットをダウンロード
    - name: Download storybook screenshots
      uses: actions/download-artifact@v3
      with:
        name: storycap-artifact
        path: apps/storybook/__screenshots__

    # reg-publish-s3-pluginでS3へアップロードするためのAWS認証情報
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@master
      with:
        aws-region: ap-northeast-1
        role-to-assume: ${{ env.AWS_ROLE_ARN }}
        role-duration-seconds: 1800

    - name: run reg-suit
      run: yarn reg-suit run

```

ここでは working-directory を `./lib/reg-suit/` へ変更して実行しています。screenshot job と同様に必要な依存だけをインストールすることによる高速化を目的としています。

storycap は他のパッケージへの依存がないため npx で単体実行できましたが、reg-suit の場合いくつかのプラグインに依存しかつ実行時に require するため npx で実行できません。そのため package.json を分離し別プロジェクトとして独立して実行することにより実現できました。

余談：Yarn v1 の `nohoist` について

package.json の分離という解決方法は初見では驚きがあるかもしれません。本来はワークスペース内のパッケージとして含められたらより良いと思っていました。

reg-suit の依存解決高速化で行いたいことは「ワークスペース全体の依存を解決するのではなくパッケージの実行に必要な依存だけ解決したい」であり、これは実は Yarn v1 の nohoist オプションを利用することでプロジェクトルートの node_modules から分離することが可能です。

[https://classic.yarnpkg.com/blog/2018/02/15/nohoist/](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/)

ただ、この nohoist オプションは Yarn v2 以降ではサポートされていないのです。また pnpm では同等の機能はないようです。（ 近しい機能として `shamefully-hoist` オプションがありますが、これはプロジェクト全体に適用されてしまうため特定のパッケージだけ分離することはできません） 現在僕たちのチームでは Yarn v1 からの別のパッケージマネージャへの移行を検討しているということもあり、どのパッケージマネージャでも対応できる方法にするために別プロジェクトとして分離する方法を選択しました。

また、[元記事](https://blog.wadackel.me/2022/vrt-performance-optimize/)では reg-suit run を使わずに sync-expected を job として分離する方法も紹介されていましたが、現状 reg-suit run の実行は 1 分程度で完了するため効果が薄く実施していません。

## 終わりに

本記事では GitHub Actions で storycap / reg-suit を実施する上での高速化について紹介しました。前述した通り当初の 63%の削減ができました。

残っている改善できそうな項目として、現在最も時間がかかっているのは Storybook のビルド時間となっています。

Webpack を別のモジュールバンドラに切り替えたり、storybook のビルドプロセス自体を分割する手もあるかもしれません。こちらについては実行時間の課題がまた顕著になってきたら取り組もうと思っています。

他の最適化の方法をご存知の方がいればぜひお知らせください。

また、ROUTE06 では今回のような Web フロントエンドテストの改善に一緒に取り組んでいただけるメンバーを募集しています！興味のある方はこちらからご連絡ください。

ROUTE06のメンバーがお送りする「ルートシックスラジオ」で、プロジェクトのチームメンバーとこの記事の内容について話しました。 改善に取り組む経緯や、Twitter上で頂いた質問にもお答えしていますので、ぜひ聴いてみてください！

こんにちは。ROUTE06 Tech Blogの編集チームです。

ROUTE06のエンジニアによる対談を、連載でお届けします。

第1回は、CTOの重岡 正さんとエンジニアリングマネージャーの[**加藤 貴晴（かとう たかはる）**](https://twitter.com/eggpogg)さんです。

Androidエンジニアとしてキャリアを重ねてきた加藤さんは、ROUTE06の立ち上げ初期に入社。そのきっかけは、「Android以外の開発ができそうだったから」といいます。

加藤さんは、[そごう・西武さまの展開するCHOOSEBASE SHIBUYAの開発](https://route06.co.jp/news/5)や[三菱商事さまとのプロジェクト立ち上げ](https://route06.co.jp/news/9)に関わり、現在はエンジニアリングマネージャーとして、プロジェクトの進行管理からエンジニアのマネジメントまで担当しています。

加藤さんのこれまでのキャリアをふりかえりながら、マネジメントで大事にしていることを語り合いました。

加藤貴晴 KATO Takaharu

1990年生まれ。愛知県出身。

大学卒業後、Webサイト制作会社に入社し、コーポレートサイトの開発や運用などに携わる。その後、Tokyo Otaku Mode Inc.とヤフー株式会社を経て、2020年ROUTE06に入社。

「CHOOSEBASE SHIBUYA」や三菱商事の部品調達に関するマーケットプレイスの開発を担当。2022年より、エンジニアリングマネージャーを務める。使用言語は、Kotlin、Node.js、TypeScript。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/r/route06/20230315/20230315162138.png)

CTOの重岡さんとエンジニアリングマネージャーの加藤さん

### 開発に対する価値観が壊れたターニングポイント

**重岡**

私と加藤さんは、Tokyo Otaku Mode（※）で一緒に働いていた時期があるんですよね。

(※Tokyo Otaku Mode…アニメやマンガなど、日本のポップカルチャーにまつわる情報発信や、越境ECビジネスを展開する企業)

**加藤**

そう思うと、重岡さんとは8年ぐらいの付き合いがありますね。

**重岡**

Tokyo Otaku Modeの前は、地元でお仕事されていたんでしたっけ。

**加藤**

そうです。大学の頃からプログラミングをやっていて、卒業後は愛知県のWeb制作会社に就職しました。

実は、メガベンチャーのインターンを受けたり、東京で就職活動もしていたんです。でも採用されなかったから、当時は「センスないのかな」と思うこともあったり。

**重岡**

私も、当時成長し始めていたとあるベンチャーの最終面接に落ちて、「新卒採用ってそんなもんだよな」と思ってました。でも、**行きたかった会社に中途で入社することも珍しくない**ですよね。入り方が違うだけ。

最初の会社では、どんなことをしていたんですか。

**加藤**

地元の有名企業のコーポレートサイトの開発や運用を担当しました。そのなかで、Androidアプリの開発をする機会があったんです。

それで、自社サービスの開発に興味が沸き、転職活動をしていたところ、Tokyo Otaku Modeとご縁がありました。

**重岡**

加藤さんがTokyo Otaku Modeに入社したとき、私も第二新卒くらいの年齢でした。なのに、社歴上の関係で、加藤さんとはメンターとメンティーのような関係になってしまって。

メンター側に立ったのは初めてだったので、うまく立ち回れなかったですね。加藤さんにむちゃぶりしてしまうこともあったなと。

私も、今よりとんがってましたし（笑）。「申し訳なかったな」とふりかえりつつ、良い経験をさせていただきました。

**加藤**

重岡さん、とんがってましたねー。でも、Tokyo Otaku Modeは僕の1番のターニングポイントでした。**開発に対するそれまでの価値観がぶっ壊れた**んです。

**重岡**

「価値観がぶっ壊れた」というと？

**加藤**

「自分はエンジニアだ」と思っていたのに、圧倒的に技術力がなかった。「プログラミングってこういうことなんだ」と気づいたのは、Tokyo Otaku Modeに入社してからです。

「Webサーバーとは？」のところから、フロントもバックエンドもしっかり勉強し直しました。Tokyo Otaku Modeの1年目はがむしゃらにやって、成長を感じられた年だったなと思います。

**重岡**

そうだったんですね。加藤さんは、入社してすぐにメール配信システムの内製化プロジェクトにアサインされて、大変だったと思うんですよ。

これまでの経験とは違う技術やアーキテクチャが求められるなかで、いきなり難しいことにチャレンジしなくてはいけなくて。

いっぽうで、ECのAndroidアプリの開発ではKotlinを早い段階から使っていて、対応が先進的だなって思ってました。あんまり日を浴びることのないプロダクトの開発にも、がんばって取り組んでいましたし。

やっぱりね、せっかく作ったのに、鳴かず飛ばずだったアプリもあったから。

**加藤**

「3日間でアプリを作って」と言われて急いだのに、リリースしなかったり、かたやリリースしたけど、運用が回らなかったりはありましたね。

ただ、アプリやサービスをゼロから開発するゼロイチの経験ができたのは、Tokyo Otaku Modeが初めてでした。1年目は本当に人生のターニングポイント。

**サービスのグロースを楽しく経験しましたし、大変だったけどゼロイチの経験もできた**。2年間という短い期間でしたが、本当にすごく濃い日々を過ごしました。

### Android開発に没頭したヤフー時代

**重岡**

Tokyo Otaku Modeのあとは、ヤフーに転職しましたよね。

**加藤**

スタートアップで自社サービスの開発に関われたので、「もうちょっと大きな組織で開発したい」と思うようになったんです。

ちょうどヤフーがモバイルファーストを謳っていて、ECにも力を入れている時期だったんですよ。ECのドメイン知識とAndroidエンジニアの経験を買われて、Yahoo!ショッピングの開発チームに入りました。

ヤフーには3年半いましたが、**Androidを追求できる環境で開発に没頭し、技術の深掘りができました**。

**重岡**

そういえば加藤さん、ヤフーにいたときにDroidKaigiに登壇されてました！

**加藤**

はい。DroidKaigiの登壇は、いい経験になりました。話し方やスライドの作り方、「情報を整理して伝える」といったことが、実はできていなかったんだなと気づき、勉強になりました。

あとは、アメリカで行われたGoogle I/Oにも参加しました。発表内容が英語なのでわからないことが多かったのですが、雰囲気は味わえました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/r/route06/20230315/20230315095800.jpg)

Google I/Oにて（撮影・加藤 貴晴）

**重岡**

ヤフーでは、他にどんなことが印象に残っていますか。

**加藤**

**まわりを見る余裕が出てきて、人の動きがわかるようになってきた**ことです。

たとえば、長く担当しているプロダクトに新しい機能開発や修正依頼が来たとき、「あれを直せばできるな」とイメージできるようになりました。

また、「自分がどのように立ち回ると仕事が早くできて、メンバーも動きやすいだろう？」のような、全体を俯瞰してみる視点も少しずつ生まれてきたんです。

**重岡**

他の人の動きにも、意識が向くようになったんですね。

**加藤**

しだいに、技術側の意思決定や、ロードマップを書くなど、技術をリードするような立場で担当プロダクトの開発に関わることが増えていきました。

でも、もっと自分の開発技術を高めるためには、Android以外の他の領域も学ばないとな、と考え始めてもいたんです。

### キャリアがあるから悩ましい？転職のジレンマとは

**重岡**

加藤さんがTokyo Otaku Modeを辞めたあとも、私たちは1年に1回ぐらい、飲みに行くような関係だったんですよね。

それで、ROUTE06を始める前の年の年末に「ご飯に行きましょう」と。

**加藤**

そのときでしたね。重岡さんから「新しく会社始めるんで、よかったらどう？」とROUTE06にお誘いを受けて。

ちょうど転職しようかなと思っていた時期だったんです。

**重岡**

最初は、業務委託で入ってもらって。私が言うのもなんですが、他の会社は検討しなかったんですか？

**加藤**

業務委託中に何社か話を聞きましたが、ほぼAndroidの開発を求められるんですよ。でも僕は、**Android以外の新しいことにチャレンジできる職場を考えていた**ので、違うなと。

対して重岡さんは、Androidエンジニアとしての僕に声をかけてきたわけではなかった。業務委託を通して、いろいろと挑戦もできる環境だってことも感じたので、正式にROUTE06へジョインしました。

入社後は、フルスタックエンジニアとして幅広く学び直しするところから始めました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/r/route06/20230309/20230309114453.png)

「CHOOSEBASE SHIBUYA」で購入後、商品受取り待ちの加藤さん（撮影・ROUTE06社員）

**重岡**

Androidの開発者は母数が少ないので、企業としては「ぜひAndroidの開発で」となってしまうのはありますね。

ただ、**ひとつの分野を極めたいという人ばかりではないし、違う開発をやってみたい人もいます**。

**加藤**

また、ROUTE06がスタートアップであることも、入社のきっかけでした。やっぱり、**シードラウンドから経験できるってあまりないこと**ですし、チャレンジできて、良い意味で未来がわからないところに面白さやメリットを感じたんです。

**重岡**

たしかに、シードラウンドから参加できる機会は、人生においてもそんなにないと思います。

**加藤**

何より「石橋をめちゃくちゃ叩いて渡るタイプの重岡さんが共同創業者なら」という、信頼感もありました。重岡さんは、そのときの勢いやテンションで何かを判断したり、取り組む人ではないし、ちゃんと裏づけを持って行動する人。

そういう人柄も知っているので、一緒に働いています。

**重岡**

私の性格をわかってくれていますね！

加藤さんはヤフーを経験されていて、エンタープライズ企業をはじめ、さまざまな立場の人と一緒に働く知見も持っている。そういうところも、私は信頼しています。

実際に加藤さんは、自分のことをどんなタイプだと思っていますか。

**加藤**

**自分が何をすべきかを考える、責任感が強いタイプ**だと感じています。仕事で必要ならば、何でもやるぐらいの気持ちです。

たとえば、プロジェクトの安定稼働を考えるような場面では、「自分はこのポジションにいると良さそうだな」とか「こんな技術を学ぶ必要があるな」と考えるんです。全体を俯瞰して見ながら、自分の立ち位置を変えてきたところがあります。

開発が好きで今があることは確かですが、明確に「こうありたい」のようなベースの上に、僕が成り立っているわけではないんです。

ヤフー時代の経験も大きくて、**開発のために必要な関係や環境作りも含めて仕事だなと思い始めています**。ちょっと大人になったんですかね。

エンジニアリングマネージャーをしているのも、プログラミングだけじゃない開発の仕事にも興味があるからなんです。

### エンジニアリングマネージャーのあり方を現場で学び、考える

**重岡**

エンジニアリングマネージャーも、2年目に入るところです。マネージャー業は、率直にどうですか。

**加藤**

本当に何も経験がないところから始めているので、今も勉強をしながらですね。

僕が注力している仕事は、大きく3つあります。**クライアントワークのQCD（Quality/Cost/Delivery）のサポート**と、**心理的安全性のある環境作り**。そして、**メンバーのキャリアパスを意識すること**です。

ROUTE06は、お客様へいろいろな価値提供ができる点が強みで、案件も開発フェーズもさまざまです。なので、メンバーそれぞれのキャリアビジョンをふまえて、日頃から「誰をどのプロジェクトにどのタイミングでアサインするのが良いだろうか」を考えています。

**重岡**

**ROUTE06は、エンジニアが成長できる機会やキャリアパスが多様にあります**。主体性が大事なので、エンジニアには、得意・不得意や、何をやりたいか、やりたくないかを聞くようにしています。

先ほどの加藤さんの「Android以外の開発をやりたい」みたいに、**得意なことが必ずしもやりたいこととは限らない**。**ミスマッチを起こしたくない**ので、とくに採用面接では5年後、10年後の先のことも、必ず聞いています。

では、エンジニアリングマネージャーになって、加藤さん自身に変化はありましたか？

**加藤**学び方が変わりました。開発者のときは、書籍やブログから学ぶことが多かったのですが、**マネージャーになってからは、現場で学ぶことが増えました**。

ROUTE06のエンジニアリングマネージャーの仕事は、実務から個人のキャリアマネジメントまでと幅広い。技術のことだけなら、QiitaやZenn、勉強会などで学び、仕事に活かせるんですが、マネジメント業務はそうはいかないし、答えがありません。

上長とメンバー間で情報をやり取りする際の機密性のとりかたや、期待値コントロール、フィードバックの方法など、さまざまなことを現場から学んでいますね。**「やっぱり仕事って、人という"いきもの”と対話することなんだな」と実感しています**。

マネジメント関連の書籍やブログも、自分のふるまいの答え合わせをするような感覚で読んでいます。

### 1on1には必ず雑談を取り入れたい

**重岡**

加藤さんは、メンバーとのコミュニケーションを大事にしているなぁと思ってます。

**加藤**

僕が見ているメンバーに対しては、週1回30分の1on1をしています。あとは、担当案件の開発メンバーとも、15分くらい話をする機会を作っていますね。**僕が、会社で1番1on1をしている人間なんじゃないかな**と。

実は、ROUTE06に入社したときから1on1を意識していて、自分からメンバーに声をかけていました。

**重岡**

そうだったんですか！

**加藤**

1on1の文化に初めて触れたのはヤフー時代で、仕事を進めるうえでとても良いものだなと感じていたんです。メンバーとの関係性の構築や、隠れている問題の発見などにつながっていました。

ROUTE06は会社の立ち上がりからフルリモートで、それを前提とした組織作りをしていますが、個人としては不安もあったんです。やっぱり、隣で机を並べつつ作業していないと、何を考えているかわからないことがあるので。

どうしたらいいかな？と考えていたとき、ヤフー時代の1on1のことを思い出したんですよ。それで、**みんなと雑談を兼ねた1on1**をするようになりました。

**重岡**

エンジニアリングマネージャーとなった今では、1on1でどのようなことを話しているんですか。

**加藤**

取りかかっている仕事のことや、今後どうしたいのかなどをメインに話しています。共通の仕事があれば、自然と思ってることは出てきますし、会話に苦労はしていません。

毎日、デイリースクラムを兼ねた朝会もやりますが、そのタイミングで言いづらかったことや、言うほどでもないことを、みんな抱えていることが多い。それを吐き出す場として、1on1を使っています。

そして、**やっぱり雑談は欠かせません**。**相手から思いがけない情報を得られることもあるので、1on1は大切にしたい**です。

### ROUTE06が目指す「ナラティブな組織」が見えてきた

**重岡**

加藤さんから見て、ROUTE06はどんな会社でしょう。

**加藤**

遠藤さん（ROUTE06 CEO・遠藤崇史）が話している[「ナラティブ組織とは何か」](https://note.com/tkendou/n/nd6607c657021)が、自分なりに腑に落ち始めた感覚があります。

ROUTE06のメンバーは、Webサービスの開発経験が豊富で、良いところや悪いところ含めて多くの知見を持っています。それぞれの技術や経験がもとになって、成り立っているところがあるんです。

**重岡**

ROUTE06は、ナラティブな組織を目指しているんですよね。遠藤さんの言葉を借りると、*「ナラティブ」とは、特定の誰かの視点に限定されず、登場する一人一人が主体となり、それぞれの人生/経験/想いなどが、物語のように自然と紡がれていく状態*のことを言います。

**加藤**

仕事をしていると、**「本当にこの人が同じ組織にいてくれて良かった」と感じることが多い**です。

たとえば、ある領域のドメインに詳しくて、仕様を理解してコードに落とし込むことが得意な人がいたり、ゼロからフロントエンドを立ち上げることが大好きな人がいたりします。エンタープライズ企業ならではの商流や、業務フローに詳しい人もいる。

本当に、**みんなの経験から僕も勉強をさせてもらっています**。今ある関係性が、ナラティブな組織なんだなと実感しています。

### 10年後、何をしていたいですか？

**重岡**

では10年後、加藤さんはどんなことをしていたいですか。

**加藤**

なんとなくですが、開発に関わっていて、現場に近い側にいると思います。重岡さんは？

**重岡**

10年後、世の中はもっとデジタルに進んでいるだろうし、デジタルにまつわる課題も次のフェーズになっていると思うんですよね。

**ROUTE06は、世の中の課題や環境を解像度高く捉え、関われる会社になっていてほしいし、僕個人も、その課題解決に引き続き携わっていきたい**と思っています。

あと、小さくてもいいからコードを書いていたいな。プロダクトのコードをバリバリ書いているイメージは浮かんでいないんですが、**プログラミングはやり続けたい**です。

**加藤**

10年後に何をやっているかを定めるために、今動いているところがあります。エンジニアリングマネージャーを通して、自分の強みはどこなのかを探りたいです。

ここ数年で、**自分の強みはプロジェクトを推進する力や、人とのコミュニケーションの部分にある**と見えてきたんです。その強みを生かせる環境や組織にいたいですね。

（編集・執筆：[マチコマキ](https://note.com/sukizuki/n/nbfca9688c971)）