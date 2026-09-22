---
type: summary
updated: 2026-07-26
---

# GitHub Packages の npm レジストリを使って、社内 org 用のプライベートパッケージを公開する手順とインストールする手順 要約

ソース: [[GitHub Packages の npm レジストリを使って、社内 org 用のプライベートパッケージを公開する手順とインストールする手順]]

マネーフォワードのデザインシステム構築を背景に、共通 UI コンポーネントライブラリを GitHub Organization 内限定で配布する手順を社内共有用にまとめた記事。
GitHub Packages の npm レジストリを使い、パッケージ直下の .npmrc に環境変数 `NPM_TOKEN` 経由の authToken と `@org:registry` を設定する——ユーザールートの ~/.npmrc に直接書かず、認証が必要であることを明示するのが工夫点。
認証はローカルでは PAT (Classic)、GitHub Actions では `GITHUB_TOKEN` を使い分け、公開・インストールの両シーンで同じ経路に共通化する。
package.json では `@org/name` 形式の name・version・repository が必須で、monorepo の一部パッケージを公開する場合は repository 内に `directory` フィールドを追加する。
org 限定のプライベートパッケージ配布は GitHub Packages で簡単に実現できるが、インストール側も含めあらゆるシーンでトークン認証が必要になると結論づけている。
