---
タグ: []
作成日時: 2024-02-27T00:30:00
URL: https://sqripts.com/2022/09/01/20384/
Tags: [topic/デザインシステム/配信基盤]
---
こんにちは、フロントエンドエンジニアをしている やまたろう です。

今回は、進行中のプロジェクトでUIライブラリを作ることになったので、Github Packagesを活用して社内のGithub組織のメンバーだけに公開するnpmパッケージの作り方を紹介します。

[[閉じる](https://sqripts.com/2022/09/01/20384/#)]

- [Github Packagesとは](https://sqripts.com/2022/09/01/20384/#Github_Packages)
- [プロジェクト準備](https://sqripts.com/2022/09/01/20384/#i)
- [Github Packagesへの公開](https://sqripts.com/2022/09/01/20384/#Github_Packages-2)
- [おわりに](https://sqripts.com/2022/09/01/20384/#i-2)

## Github Packagesとは

Githubが提供するパッケージレジストリサービスです。

npm・Docker・Nuget・Maven・Gradleなど様々な用途のレジストリが存在します。Nugetまでカバーされているのは流石ですね。

パブリックなリポジトリでは無料で利用でき、プライベートなリポジトリでもストレージやデータ転送量に制限はありますが無料で始めることができます。お試しや外に出したくないものの個人開発で活用できそうです。

npm公式のリポジトリと比較して、Privateリポジトリであっても無料で始められる点やアクセス権限と編集権限ユーザーをGithubで一元管理できたり、Github Actionsとの連携のしやすさが魅力的です。[Github Packages公式ページ](https://github.co.jp/features/packages)

## プロジェクト準備

Vite + Vue3 + Typescript のテンプレートを利用してコンポーネントをビルドするプロジェクトを作成します。

開発環境はNode.jsのLTSのバージョンが入っていればよいと思います。執筆時点では16.17.0です。

まずは、以下のコマンドでプロジェクトを作成します。

```plain text
npm init vite@latest <YOUR_PROJECT_NAME>
```

![](https://sqripts.com/wp-content/uploads/2022/11/1_setup-project.png)

vueのほかReactなどプロジェクトを作成できる

生成後、プロジェクトの構造は以下のようになっているので、必要最低限なものを残して他は全て削除します。

![](https://sqripts.com/wp-content/uploads/2022/11/2Untitled.png)

テンプレートの初期状態

![](https://sqripts.com/wp-content/uploads/2022/11/3Untitled.png)

削除後の状態

src 配下にあったファイルは `HelloWorld.vue` と `vite-end.d.ts` 以外は削除して HelloWorld.vue をExportする `index.ts` を作成しています。

実際にUIライブラリを作成する際は storybookなどの設定や、AtomcDesignなどのデザインパターンを取り入れると思います。

次に、viteにビルド用の設定を追記していきます。初期状態は非常にシンプルなものになっていて何も設定をしていない場合エントリポイントの index.html を探して依存関係を見つけていきます。

```plain text
// vite.config.ts - 初期状態

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
```

vite.config.js – 初期状態

```plain text
// vite.config.ts - 追記後

import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "sample",
      formats: ["es"],
      fileName: (ext) => `index.${ext}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: { vue: "Vue" },
      },
    },
  },
});
```

vite.config.js – 追記後

`build` プロパティでエントリポイントや出力するモジュールの種類やファイルを設定したのち、vue や react といった利用先のモジュールをバンドルしないような設定を追加します。

path moduleの型が見つからない場合は `@types/node` モジュールを追加してください。

これでビルドできるようになりましたが、Typescriptの型定義ファイルの出力をするためには別でプラグインを読み込む必要があるので追加・設定します。

```plain text
yarn add -D vite-plugin-dts
```

```plain text
// vite.config.ts - vite-plugin-dts 追加後

import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "sample",
      formats: ["es"],
      fileName: (ext) => `index.${ext}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: { vue: "Vue" },
      },
    },
  },
});
```

これでビルドに関する準備は全て整ったので、早速実行してみます。

![](https://sqripts.com/wp-content/uploads/2022/11/4Untitled.png)

無事ビルドが成功して、プラグインによる型定義ファイルの出力も成功しています。

![](https://sqripts.com/wp-content/uploads/2022/11/5Untitled.png)

作成したプロジェクトをGithubのPriavate Repositoryに登録して準備は完了です。

## Github Packagesへの公開

始めに、package.jsonにpublish用の設定を追加していきます。

以下を参考にエントリポイントやPublish先のレジストリを指定します。注意点として nameプロパティにGithubのユーザーもしくはOrganization名をパスで含める必要があります。

```plain text
// package.json

{
  "name": "@<Githubユーザー名 または Github組織名>/package-sample",
  "version": "1.0.0",
  "scripts": {
    "prepublishOnly": "npm run build",
    "build": "rimraf dist && vue-tsc --noEmit && vite build"
  },
  "peerDependencies": {...},
  "devDependencies": {...},

  "main": "dist/index.es.js",
  "types": "./dist/index.d.ts",
  "module": "./dist/index.es.js",
  "exports": {
    ".": "./dist/index.es.js",
    "./style": "./dist/style.css"
  },
  "publishConfig": {
        "access": "restricted",
    "registry": "https://npm.pkg.github.com/<ユーザー名 または Github組織名>"
  }
}
```

普段はパッケージを利用する人間なので、プロパティ設定時の挙動などがわからず [公式ドキュメント](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)にかなりお世話になりました。

また、 `prepublishOnly` という名前のスクリプトを設定することで publishの直前に実行するコマンドを仕込むことができるようなので、ビルドコマンドを設定しています。

これで大体の設定が完了したので、Github ActionsでPublishするようワークフローを作成します。

完成形は以下の通り。

```plain text
# .github/workflows/publish.yml

name: publish package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://npm.pkg.github.com/

      - name: Package install
        run: yarn install --frozen-lockfile

      - name: Update package.json version
        uses: jossef/action-set-json-field@v1
        with:
          file: package.json
          field: version
          value: ${{ github.event.release.name }}

      - name: Publish package
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

ポイントごとにいくつか解説していきます。

トリガーは、リリースの作成時に指定していますが、プルリクエストやブランチによるトリガーももちろん可能なので運用に応じて変更可能です。

今回はGithubのリリース機能との相性が良さそうだったので設定しています。

```plain text
on:
  release:
    types: [created]
```

ジョブのランタイムの設定で、Github Packagesに書き込む権限を与える必要があります。これがないとパッケージをパブリッシュする際にエラーが発生します。

この設定で `GITHUB_TOKEN` に与えるアクセス権限を設定しているようです。

```plain text
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read
```

Node.js のセットアップを行う際にレジストリをGithub Packagesに指定します。

```plain text
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://npm.pkg.github.com/
```

ステップの中で package.json に記載されているバージョンを書き換えています。今回はリリース名をそのまま流用。

```plain text
      - name: Update package.json version
        uses: jossef/action-set-json-field@v1
        with:
          file: package.json
          field: version
          value: ${{ github.event.release.name }}
```

最後にパッケージのパブリッシュを行います。 `NODE_AUTH_TOKEN` にGithubの認証トークンを入れて終了です。認証トークンの管理を自分で行う必要がないのが快適でよいですね。

これで全ての設定が完了しました。

早速、新しいリリースを作ってパッケージが作成されることを確認します。

リポジトリのトップページから [Release] → [Create a new Release] と選択して、リリース作成画面に遷移します。

そこでタグ情報とリリース名を指定してパブリッシュを実行。

![](https://sqripts.com/wp-content/uploads/2022/11/6Untitled-1.png)

暫くするとGithub Actionsが動作し、パッケージが登録されました。

![](https://sqripts.com/wp-content/uploads/2022/11/7スクリーンショット-2022-08-26-14.27.35-1.png)

## おわりに

Github Packagesを利用することで最低限の設定でパッケージの管理を行うことができました。

冒頭でも述べた通り、Githubのアカウントがあれば利用できる点が個人でも企業でも使いやすいと私は感じているので、複数サービスのアカウントや認証トークンを管理して疲弊している方は思い切って移行すると楽になれるかもしれません。

最後までお読みいただきありがとうございました。

SHARE

SQRIPTER