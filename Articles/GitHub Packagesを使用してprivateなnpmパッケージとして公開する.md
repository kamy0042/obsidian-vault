---
タグ: []
作成日時: 2024-03-07T16:55:00
URL: https://zenn.dev/052hide/articles/github-packages-npm-052hide
Tags: [topic/デザインシステム/配信基盤]
---
同じ内容の記事がいくつも公開されていますが、実際に試してみたら結構はまったので備忘録として残します。

# やりたいこと

GitHub Packagesにプライベートで公開したnpmパッケージを、複数のアプリケーションで使用する。

![](https://res.cloudinary.com/zenn/image/fetch/s--Up4UXvFk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/41c2b99b221c66220cbd38bd.png%3Fsha%3D71651d1276e14d6ce5656e72cd5540581c465b5b)

npmなどのレジストリから取得しているパブリックなパッケージと同じように、自作パッケージをGitHub Packagesからバージョン指定してインストールできるようにする。

![](https://res.cloudinary.com/zenn/image/fetch/s--kn04s6Xw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/01fe5a0f26c8c1b55a4ecd9e.png%3Fsha%3Dc744ccfc56f88484cdfb3d50806e54d7345821c8)

## GitHub Packagesとは

GitHub PackagesはGitHubが提供しているレジストリ。

GitHubのユーザーまたはOrgに閉じたパッケージを公開できる。

## パッケージをGitHub Packagesへパッケージ公開

### `package.json` の設定

公開するパッケージの `package.json` に以下の情報を設定する。

- name: パッケージ名 
    - フォーマット: `@<スコープ>/<パッケージ名>`
    - 例: `@052hide/my-lib`
- version: パッケージバージョン 
    - フォーマット: `x.x.x`
    - 例: `1.0.0`
- publishConfig: registryのURL 
    - フォーマット: `{ "@<スコープ>:registry": "<GitHub PackagesのレジストリURL>" }`
    - 例: `{ "@052hide:registry": "https://npm.pkg.github.com" }`
- private: 削除する 
    - パッケージを公開するため `private: true` は削除する必要がある。 削除したからといって、Github Packagesにpublishしたパッケージがパブリックに公開されるわけではない。

```plain text
{
+  "name": "@052hide/my-lib",
+  "version": "1.0.0",
+  "publishConfig": {
+    "@052hide:registry": "https://npm.pkg.github.com"
+  },
-  "private": true
 ...
}

```

### `.npmrc` の設定

公開するパッケージの `.npmrc` に以下の情報を設定する。

- _authToken: GitHub Packagesへ公開用のPersonal Access Token 
    - GitHub Actionsから指定することを想定し、 `GITHUB_PACKAGES_NPM_PUBLISH_AUTH_TOKEN` という環境変数で受け取るようにする。

```plain text
+ //npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_NPM_PUBLISH_AUTH_TOKEN}

```

### ローカルからpublish

ローカルからpublishすることは無いので省略[[1]](https://zenn.dev/052hide/articles/github-packages-npm-052hide#fn-406c-1)

### GitHub Actionsからpublish

```plain text
name: Publish Package
on:
  release:
    types: [published]
jobs:
  build:
    # 省略

  publish:
    needs: build
    name: Publish GitHub Packages
    runs-on: ${{ matrix.os }}
    timeout-minutes: 30

    strategy:
      matrix:
        os: [ubuntu-latest]

    permissions:
      packages: write # GitHub Packagesへの書き込み権限が必要
      contents: read # リポジトリの内容の読み取り権限が必要

    steps:
      - name: Checkout 🛎
        uses: actions/checkout@v4.1.0

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - run: npm publish
        env:
          GITHUB_PACKAGES_NPM_PUBLISH_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}} # permissionsで指定した権限を持つGITHUB_TOKENを指定する


```

GitHub Packagesに公開完了🎉

## 公開したパッケージの使用

### GitHub Packageの設定

**repositoryの登録**

installを許可するリポジトリを追加する。

`https://github.com/orgs/<org>/packages/npm/<package-name>/settings` or `https://github.com/users/<user>/packages/npm/<package-name>/settings`

## GitHub Packagesからインストール

### `.npmrc` の設定

`.npmrc` に以下の情報を設定する。

- registry: スコープに対するレジストリURL 
    - フォーマット: `@<スコープ>/<パッケージ名>=https://npm.pkg.github.com`
    - 例: `@052hide/my-lib=https://npm.pkg.github.com`
- _authToken: GitHub Packagesから取得用のPersonal Access Token 
    - GitHub Actionsから指定することを想定し、 `GITHUB_PACKAGES_NPM_READ_AUTH_TOKEN` という環境変数で受け取るようにする。

```plain text
+ @052hide:registry=https://npm.pkg.github.com
+ //npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_NPM_READ_AUTH_TOKEN}

```

### ローカルでパッケージインストール

### PATの生成

- 権限 
    - read:packages

### `GITHUB_PACKAGES_NPM_READ_AUTH_TOKEN` の設定

```plain text
export GITHUB_PACKAGES_NPM_READ_AUTH_TOKEN=<PAT>
# export GITHUB_PACKAGES_NPM_READ_AUTH_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

```

### パッケージインストール

```plain text
npm install <package-name>
# npm install @052hide/my-lib

```

### GitHub Actionsでパッケージインストール

package.json

```plain text
{
  "dependencies": {
    "@052hide/my-lib": "1.0.0"
  }
}

```

workflow.yml

```plain text
name: Install Packages

on:
  push:

jobs:
  ci:
    name: CI
    runs-on: ${{ matrix.os }}
    timeout-minutes: 30

    strategy:
      matrix:
        os: [ubuntu-latest]

    steps:
      - name: Checkout 🛎
        uses: actions/checkout@v4.1.0

      - name: 'Install Node Modules'
        run: npm install
        env:
          GITHUB_PACKAGES_NPM_READ_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GITHUB_TOKENを指定する
          # Composite Actionを使用する場合はgithub.tokenを指定する

```

GitHub Packagesに公開したnpmパッケージをローカルとGitHub Actionsから使用できるようになりました🎉🎉🎉

脚注

1. 
適切な権限のPATを `GITHUB_PACKAGES_NPM_PUBLISH_AUTH_TOKEN` に指定が必要 [↩︎](https://zenn.dev/052hide/articles/github-packages-npm-052hide#fnref-406c-1)

[Hidetoshi Ota](https://zenn.dev/052hide)
フロントエンドエンジニアです

![](https://static.zenn.studio/images/drawing/discussion.png)