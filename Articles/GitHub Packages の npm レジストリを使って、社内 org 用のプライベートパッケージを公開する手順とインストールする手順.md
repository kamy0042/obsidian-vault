---
タグ: []
作成日時: 2024-03-10T01:44:00
URL: https://zenn.dev/moneyforward/articles/20230620-github-packages
Tags: [topic/デザインシステム/配信基盤]
---
複数のリポジトリで共有する node パッケージを、パブリックな npm レジストリではなく GitHub Packages の npm レジストリに公開して、 GitHub Organization 内でのみ利用可能なパッケージとして扱う手順を、社内共有用にまとめていきます。

本記事の内容は、以下の公式ドキュメントを読めばだいたい分かります。

## 背景

マネーフォワード クラウドシリーズのデザインシステムを構築しようとしており、複数のプロダクトで共通して利用できる汎用的な UI コンポーネントを揃えたライブラリを各プロダクト向けに公開したい。検証段階なので、一旦 org 内に限定した状態で利用したい。

## GitHub Packages とは

[Introduction to GitHub Packages - GitHub Docs](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages) より

> 
> GitHub Packages is a software package hosting service that allows you to host your software packages privately or publicly and use packages as dependencies in your projects.

> 
> GitHub Packages offers different package registries for commonly used package managers, such as npm, RubyGems, Apache Maven, Gradle, Docker, and NuGet.

GitHub Packages とは、ソフトウェアパッケージをパブリックまたはプライベートにホストして利用することができるホスティングサービスです。これを使うことで、特定の org 内でのみ利用可能なパッケージをホストすることができます。

GitHub Packages のレジストリは、 npm や RubyGems などの各言語の標準的なパッケージ管理サービスをサポートしています。今回は npm レジストリの場合の公開手順とインストール手順について書いていきます。

## 公開する

### 1. パッケージローカルの `.npmrc` に `authToken` と `registry` を設定する

公開したいパッケージのディレクトリ直下の `.npmrc` に、環境変数 `NPM_TOKEN` で authToken を受け取る設定と、公開範囲を指定した registry URL を設定します。例えば、 `moneyforward` org 内に限定した場合は以下のように `@moneyforward` を付与します。

.npmrc

```plain text
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
@moneyforward:registry=https://npm.pkg.github.com

```

公式ドキュメントではユーザールートの `~/.npmrc` に `authToken` の設定を記述し、後述の PAT を直接代入していますが、グローバルな設定にすることで認証が暗黙的になってしまうため、パッケージのディレクトリ以下の `.npmrc` に記述することで、環境変数による認証が必要であることをより明確にしています。

また、環境変数 `NPM_TOKEN` として受け取るようにすることで、ローカルや GitHub Actions など後述する各利用シーンにおける認証経路を共通化して分かりやすくする意図もあります。

### 2. パッケージ公開用のアクセストークンを設定する

### ローカルコンピュータから公開する場合: Personal Access Token (Classic) を発行する

GitHub Packages を使って org 内に限定したプライベートなパッケージをローカルコンピュータから公開するには、 Personal Access Token (Classic) の発行が必要です。

[Creating a personal access token - GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic) に従い、以下の権限を持つ PAT を発行してください。

- `repo`
- `read:packages`
- `write:packages`

また、公開したパッケージの削除を行いたい場合は以下の権限を加えてください。

- `delete:packages`

権限設定の詳細は [About permissions for GitHub Packages - GitHub Docs](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages) をご参照ください。

PAT を発行したら、利用している shell の設定ファイル (`.zshrc` など) にトークンの値を環境変数 `NPM_TOKEN` として export する記述を追加して、手順 1 で作成した `.npmrc` に読み込ませて認証します。

~/.zshrc

```plain text
export NPM_TOKEN=<YOUR_GITHUB_PAT>

```

### GitHub Actions で公開する場合: `GITHUB_TOKEN` を使用する

GitHub Actions ワークフローで GitHub Packages にパッケージを公開する場合は `GITHUB_TOKEN` を使用します。

以下のように、`actions/setup-node` を使用するステップと `publish` あるいは `install` (`npm` の場合は `ci`) コマンドを実行するステップで、環境変数 `NPM_TOKEN` に `secrets.GITHUB_TOKEN` を指定して、手順 1 で作成した `.npmrc` に読み込ませて認証します。

```plain text
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version-file: .node-version
  env:
    NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

```plain text
- name: Publish
  run: npm publish
  env:
    NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

### 3. `package.json` に必要なフィールドを設定する

公開したいパッケージの `package.json` に、必要最低限のフィールドを設定していきます。 実際には `main` や `files` など、他所でインストールされるパッケージとして設定すべきフィールドは他にもありますが、今回は省略します。

1. まず `name` フィールドにパッケージの名前を設定します。パッケージ名には公開する範囲のスコープを示すためのプレフィックスをつける必要があります。例えば、 `moneyforward` org で `foo` という名前のパッケージを公開したい場合は `@moneyforward/foo` とします。
2. 次に `version` フィールドに `x.y.z` の形式でバージョンを明記します。 `npm publish` を実行する際に既に同じバージョンが存在している場合、 publish は失敗します。
3. 最後に `repository` フィールドを設定し、`url` に管理しているリポジトリを紐づけます。

以下は `moneyforward` org 内にパッケージ `foo` を公開する時の `package.json` での設定例です。

foo/package.json

```plain text
{
  "name": "@moneyforward/foo",
  "version": "0.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/moneyforward/foo.git",
  },
  ...
}

```

### monorepo 内の一部パッケージを公開したい時

以下の記事を参考にしました。

あるリポジトリが pnpm workspace などを使って、以下のように packages/ ディレクトリ以下にそれぞれ独立したパッケージ `bar`, `baz` を持つ monorepo 構成を採用しているとします。

```plain text
bar-monorepo/
├── packages/
|   ├── bar/
|   |   ├── ...
|   |   └── package.json
|   └── baz/
|       ├── ...
|       └── package.json
├── ...
├── pnpm-workspace.yaml
└── package.json

```

このような monorepo 内の一部パッケージを公開したい場合は、対象のパッケージディレクトリ以下の `package.json` の `repository` フィールド内に `directory` フィールドを追加してそのパッケージのディレクトリを指定します。

以下は monorepo 構成において、 `moneyforward` org 内にパッケージ `bar` を公開する時の `packages/bar/package.json` での設定例です。

bar-monorepo/packages/bar/package.json

```plain text
{
  "name": "@moneyforward/bar",
  "version": "0.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/moneyforward/bar-monorepo.git",
    "directory": "packages/bar"
  },
  ...
}

```

### 4. パッケージを公開する

パッケージを公開するには `publish` コマンドを使用します。

[npm-publish | npm Docs](https://docs.npmjs.com/cli/v9/commands/npm-publish)

```plain text
npm publish

```

npm 以外のパッケージマネージャーにも同様のコマンドが用意されています。

[pnpm publish | pnpm](https://pnpm.io/cli/publish)

```plain text
pnpm publish

```

[yarn publish | Yarn](https://classic.yarnpkg.com/lang/en/docs/cli/publish/)

```plain text
yarn publish

```

## インストールする

### 1. インストール先の `.npmrc` に `authToken` と `registry` を設定する

公開手順 1 と同様に、GitHub Packages に公開されたパッケージをインストールする先のルートディレクトリの `.npmrc` に、環境変数 `NPM_TOKEN` で authToken を受け取る設定と、公開範囲を指定した registry URL を設定します。

.npmrc

```plain text
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
@moneyforward:registry=https://npm.pkg.github.com

```

### 2. インストール用のアクセストークンを設定する

GitHub Packages にホストされている org 内に閉じたプライベートなパッケージをインストールする場合、公開手順 2 と同様に、ローカルコンピュータや GitHub Actions ワークフローなどあらゆるシーンで認証が必要になります。

### ローカルコンピュータにインストールする場合: Personal Access Token (Classic) を発行する

GitHub Packages に公開されたパッケージをローカルコンピュータにインストールするには、 Personal Access Token (Classic) の発行が必要です。

[Creating a personal access token - GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic) に従い、以下の権限を持つ PAT を発行してください。

- `repo`
- `read:packages`

PAT を発行したら、 shell の設定ファイル `.zshrc` などにトークンの値を環境変数 `NPM_TOKEN` として export する記述を追加して、手順 1 で作成した `.npmrc` に読み込ませて認証します。

~/.zshrc

```plain text
export NPM_TOKEN=<YOUR_GITHUB_PAT>

```

### GitHub Actions でインストールする場合: `GITHUB_TOKEN` を使用する

GitHub Actions ワークフローで GitHub Packages に公開されたパッケージのインストールを行う場合は、 `GITHUB_TOKEN` を使用します。

以下のように、`actions/setup-node` を使用するステップと install コマンドを実行するステップで、環境変数 `NPM_TOKEN` に `secrets.GITHUB_TOKEN` を指定して、手順 1 で作成した `.npmrc` に読み込ませて認証します。

```plain text
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version-file: .node-version
  env:
    NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

```plain text
- name: Install dependencies
  run: npm ci
  env:
    NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

### 3. パッケージをインストールする

パッケージをインストールするには、コマンドライン上か、 `package.json` にパッケージ名を指定してから `install` または `add` コマンドを実行します。

```plain text
npm install @moneyforward/foo
# pnpm add @moneyforward/foo
# yarn add @moneyforward/foo

```

or

package.json

```plain text
{
  "dependencies": {
    "@moneyforward/foo": "0.0.0"
  }
}

```

```plain text
npm install
# pnpm install
# yarn install

```

## まとめ

- 特定の org に限定したプライベートなパッケージを公開するには GitHub Packages を使うと簡単にできる
- プライベートなパッケージを公開する場合は、ローカルでは PAT を発行して、 GitHub Actions ワークフローでは `actions/setup-node` と `publish` コマンドの各ステップで `GITHUB_TOKEN` を使って認証する
- GitHub Packages のプライベートパッケージをインストールする場合は、公開する場合と同様に、あらゆる利用シーンでアクセストークンによる認証が必要になる
- 公開するパッケージの `package.json` には、`name`, `version`, `repository` フィールドを設定し、パッケージ名には `@moneyforward/foo` のように公開範囲のスコープを示したプレフィックスを付ける
- monorepo の一部パッケージを公開する場合には、対象のパッケージディレクトリ以下の `package.json` の `repository` フィールド内に `directory` フィールドを追加してそのパッケージのディレクトリを指定する

## 関連 URL

- [Introduction to GitHub Packages - GitHub Docs](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages)
- [Working with the npm registry - GitHub Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [Creating a personal access token - GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)
- [About permissions for GitHub Packages - GitHub Docs](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages)
- [Publishing Node.js packages - GitHub Docs](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)
- [Installing a package - GitHub Docs](https://docs.github.com/en/packages/learn-github-packages/installing-a-package)
- [モノリポの一部を GitHub Packages のプライベート NPM パッケージで公開する | DevelopersIO](https://dev.classmethod.jp/articles/github-packages-private/)
- [npm-publish | npm Docs](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [pnpm publish | pnpm](https://pnpm.io/cli/publish)
- [yarn publish | Yarn](https://classic.yarnpkg.com/lang/en/docs/cli/publish/)

[GitHubで編集を提案](https://github.com/taigakiyokawa/zenn/blob/main/articles/20230620-github-packages.md)

27

[Taiga KIYOKAWA](https://zenn.dev/taigakiyokawa)
Webアクセシビリティの勉強をしています。

[Money Forward Developers](https://zenn.dev/p/moneyforward)[Publication](https://zenn.dev/faq#what-is-publication)

![](https://static.zenn.studio/images/drawing/discussion.png)