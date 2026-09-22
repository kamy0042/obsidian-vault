---
type: summary
updated: 2026-07-26
---

# GitHub Packagesを使用してprivateなnpmパッケージとして公開する 要約

ソース: [[GitHub Packagesを使用してprivateなnpmパッケージとして公開する]]

自作 npm パッケージを GitHub Packages にプライベート公開し、複数アプリからバージョン指定でインストールできるようにする手順の備忘録。
公開側は package.json に `@スコープ/名前` 形式の name・version・publishConfig を設定し、`private: true` の削除が必要（削除してもパブリック公開にはならない）。
publish は GitHub Actions のリリース公開トリガーで行い、`permissions: packages: write` を与えた `GITHUB_TOKEN` を .npmrc の環境変数越しに渡す。
利用側で見落としやすいのは、パッケージ設定画面でインストールを許可するリポジトリを明示的に追加する必要がある点。
インストール側の .npmrc にもスコープのレジストリ URL と read:packages 権限のトークンを設定し、ローカルでは PAT、Actions では `GITHUB_TOKEN` で認証する。
