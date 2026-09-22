---
type: summary
updated: 2026-07-26
---

# Github PackagesでPrivateなnpmパッケージを公開する  Sqripts 要約

ソース: [[Github PackagesでPrivateなnpmパッケージを公開する  Sqripts]]

社内 UI ライブラリを GitHub 組織メンバーだけに配布するため、Vite + Vue3 + TypeScript プロジェクトを GitHub Packages に公開する手順を解説する記事。
Vite のライブラリモード（`build.lib`）で ES モジュール形式にビルドし、vue を external 指定でバンドルから除外、型定義は vite-plugin-dts で出力する。
package.json では `@ユーザー名/パッケージ名` 形式の name と `publishConfig.registry` の指定が必須で、`prepublishOnly` スクリプトに publish 直前のビルドを仕込める。
公開は GitHub Actions で自動化し、リリース作成をトリガーに `permissions: packages: write` を与え、リリース名を version に流用して `GITHUB_TOKEN` で publish する構成。
npm 公式レジストリと比べ、プライベートでも無料で始められアクセス権限を GitHub で一元管理できる点が魅力で、トークン管理に疲弊しているなら移行の価値があると結論づけている。
