---
Created: 2021-02-19T11:55:00
URL: https://zenn.dev/teppeis/articles/2021-02-eslint-prettier-vscode
Updated: 2021-11-06T23:06:00
Tags: [topic/技術/ビルドツール]
---
![[new_txlqub 2.png]]

eslint-plugin-prettier 時代の設定をずっと使っていたので、重い腰を上げてアップデートした作業メモ。

## 背景

[Prettier 公式ドキュメント](https://prettier.io/docs/en/integrating-with-linters.html)によれば、現在 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) は以下の問題があるとして推奨していない。

- エディタが真っ赤になる（人間が気にする必要のない問題なのに！）
- 直接実行するより遅い（同様に prettier-eslint も遅い）
- ESLint と Prettier の間に間接レイヤーを追加するので、壊れやすい

なるほど正しい。

一方、別々に実行することで以下のような問題も出てくるので、解決していく。

- CLI とエディタを個別に設定する必要がある
- エディタで ESLint と Prettier の協調動作が必要
- CLI (npm scripts) で ESLint と Prettier の対象ファイルが別管理になる
- 上記のようなインストールや設定の手数が増える

## ESLint / Prettier 設定

方針

- ESLint と Prettier をそれぞれ独立して動かす
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) で Prettier と競合する ESLint ルールを無効化
- 設定ファイル等は一般的な形式にし、VS Code 以外のエディタ環境でもなるべく動作することを期待

特に難しいことはなく、eslint-config-prettier を普通に使えば OK。README に書いてある通り、必要なものを `.eslintrc.*` の `extends` に追加していく。

Prettier の設定を変えたい場合は、設定ファイル `.prettierrc.json` をお好みで設定。今回は VS Code で Prettier 拡張をデフォルト有効化するので、設定ファイルはあってもなくても構わない。

以下のような動作を目指す。

- ワークスペースに ESLint の設定が無い場合、Prettier と VS Code 標準の Organize Imports で自動フォーマット
- 設定がある場合、その設定にしたがって Prettier → ESLint の順で自動フォーマット
- Prettier でフォーマットしたくない場合は、都度オプトアウト

入れる拡張は定番三種

最後の Formatting Toggle は、自動フォーマットしたくないファイルを開いたときにステータスバーからサクッとトグルで無効化できる便利拡張。（ただし、ファイル単位での設定ではなくワークスペース単位なのが惜しい）

VS Code のユーザー設定は以下。

```plain text
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "editor.codeActionsOnSave": [
    "source.organizeImports",
    "source.fixAll.eslint"
  ]
}

```

VS Code には Formatter と Code Actions という別の概念がある。前者は特定のファイル（言語）に一つだけ、後者は複数取れる。ポイントは、Prettier を Formatter として、ESLint を Code Actions として動かすこと。`eslint.format.enable` を有効にすると ESLint が Formatter 扱いで動いちゃうのでダメ。

今回は、Prettier を全体のデフォルトフォーマッターに設定した。VS Code が組み込みで持っているフォーマッターの種類はそんなに多くないので、Prettier をデフォルトに被せちゃって OK と判断。（微妙になってきたら言語ごとの設定に変更すればよい）

Code Actions では、ESLint による auto fix だけでなく、`source.organizeImports` （VS Code 組み込みの `import` 文フォーマット機能）も有効にしている。この Organize Imports は [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) の [import/order ルール](https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/order.md)と重複するが、ESLint や import/order を使ってないプロジェクトでも `import` 文を整理したいので有効化している。

この 2 つは、import/order が named import したメンバーのソートに対応しない、[アンダースコアのソート順が異なる](https://github.com/benmosher/eslint-plugin-import/issues/1742)などの挙動の差異があり、競合する可能性もある。ただし、`editor.codeActionsOnSave` をオブジェクトではなく配列として明示的に順序を指定することで、Organize Imports よりも ESLint の結果を優先できる。

このように Code Actions を配列指定で順序を明示できるようになったのは [VS Code March 2020 (v1.44)](https://github.com/microsoft/vscode-docs/blob/cca174121f557689d0350c0eaaa0c03e4f29e111/release-notes/v1_44.md#explicit-ordering-for-code-actions-on-save) から。比較的新しい機能で、今回初めて知った。

本当は、ESLint が有効な場合には Organize Imports を無効にしたいがそういう設定は簡単にはできないっぽい。また、[prettier-plugin-organize-imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports) という Prettier プラグインを使えば、VS Code が内部実装で使用している TypeScript Language Service の Organize Imports そのものを Prettier の中で実行できるようになり、import/order を利用する必要がなくなるが、このプラグインは Prettier 本体の挙動を書き換えてしまう少々乱暴な実装で動作も Prettier のスコープを逸脱しているので使っていくかどうか迷うところ。他にも [CLI で Organize Imports を実行する](https://github.com/thorn0/organize-imports-cli)なども考えたがひとまず見送り。

しばらく運用してまた考える。Organize Imports を手動実行にするのが実は一番バランス良さそう。

## CLI / npm scripts

通常の開発作業ではエディタ上で自動フォーマットされるので、CLI の役割は、ローカルまたは CI で **一括で** lint やフォーマットをしたいケース。

結論としては、以下のようにコマンドライン引数ではプロジェクトルートを `.` （ドット）で渡すのみとし、対象ファイルは `.eslintignore` と `.prettierignore` の側で管理調整することにした。

```plain text
  "scripts": {
    "lint": "run-p -l -c --aggregate-output lint:*",
    "lint:eslint": "eslint .",
    "lint:prettier": "prettier --check .",
    "fix": "run-s fix:prettier fix:eslint",
    "fix:eslint": "npm run lint:eslint -- --fix",
    "fix:prettier": "npm run lint:prettier -- --write",
    "test": "run-p -l -c --aggregate-output lint:* unit",
    "unit": "jest"
  },

```

利点は以下。

- 同じような引数を `eslint` と `prettier` に 2 回書かないで良い
- 複数のプロジェクトで npm scripts をコピペ（もしくは共通スクリプト化して）使いまわせる
- `package.json` が煩雑にならない

実際にいくつかのプロジェクトに適用してみると、ignore ファイルは各プロジェクト固有の少数のファイルやディレクトリだけであり、共通するのは `/dist` ぐらいだった。

また、ESLint と Prettier は本来対象ファイルの集合が異なり、無理に引数を共通化するよりそれぞれの ignore ファイルで管理する方が自然と感じた。例えば Prettier は JSON, Markdown, YAML を対象にするが、それらは ESLint の対象ではない。また `eslint`, `prettier` コマンドそれぞれがデフォルトで ignore するファイルの仕様も微妙に異なるという要因もある（ドット始まりのファイルの扱いなど）。

このように引数をシンプルにできたのは、ESLint v7 から `--ext` オプションが不要になったことも寄与している。[`overrides`](https://qiita.com/mysticatea/items/0931a7d910fcb91733ee#overrides-%E8%A8%AD%E5%AE%9A%E3%81%AB%E4%B8%80%E8%87%B4%E3%81%99%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E8%87%AA%E5%8B%95%E7%9A%84%E3%81%AB%E3%83%AA%E3%83%B3%E3%83%88%E5%AF%BE%E8%B1%A1%E3%81%AB%E3%81%97%E3%81%BE%E3%81%99)[ が賢くなった](https://qiita.com/mysticatea/items/0931a7d910fcb91733ee#overrides-%E8%A8%AD%E5%AE%9A%E3%81%AB%E4%B8%80%E8%87%B4%E3%81%99%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E8%87%AA%E5%8B%95%E7%9A%84%E3%81%AB%E3%83%AA%E3%83%B3%E3%83%88%E5%AF%BE%E8%B1%A1%E3%81%AB%E3%81%97%E3%81%BE%E3%81%99)ため、設定が適切なら TypeScript や JSX を対象としたい場合でも `eslint .` と `.eslintignore` の組み合わせだけでスキャン対象をシンプルに指定できる。

`run-s`, `run-p` は言わずと知れた [npm-run-all](https://github.com/mysticatea/npm-run-all) のコマンドで、複数の npm scripts をシリアルまたはパラレルで実行できる便利ツール。オプションはお好みで。

npm scripts の構成は、[Prettier 本体プロジェクトの pacakge.json](https://github.com/prettier/prettier/blob/cc1f0543e6fd5cf09fd82c25b393124aa5ef55ad/package.json#L148-L158) が参考になった。

`printWidth` を微妙に調整したいなどの欲求が出てきたが、個別プロジェクトで `.prettierrc.json` を書いたり、設定を追従したりするのが面倒なので、うまく設定共有することを考える。

もともと、ESLint の 個人用 shareable config に `.prettierrc.json`を同梱していたのでこれを利用する（これだけのために Prettier 設定共有専用 npm パッケージを作りたくなかった）。それをプロジェクトルートに symlink する[コマンド](https://github.com/teppeis/eslint-config-teppeis/blob/ed3224f79c6f96e28003def6194796ce8b85509b/bin/link-prettierrc.mjs)を追加して `npx link-prettierrc` で叩けるようにした。問題なさそうなら npm postinstall スクリプトに仕込んでしまおうかと思っている。

[Prettier ドキュメントに紹介](https://prettier.io/docs/en/configuration.html#sharing-configurations)されている `.prettierrc.js` の中で `require()` を使う方法と迷ったが、JSON の方が補完も効きやすいし、なんとなく対応環境も多そうなので JSON を選択した。これで様子を見てみる。

eslint-plugin-prettier から卒業しつつ、VS Code と npm scripts で ESLint と Prettier をうまく協調動作するように設定した。また、対象ファイルの管理方法や設定コスト低減について検討した。

実際に Prettier を ESLint から分離してみて、エディタに大量に赤い波線が出なくなったのは、認知負荷が下がって想像していたより良い改善になったと感じた。心なしか以前よりもエディタの自動フォーマットがキビキビ動いているような気がしないでもないが、わからん。