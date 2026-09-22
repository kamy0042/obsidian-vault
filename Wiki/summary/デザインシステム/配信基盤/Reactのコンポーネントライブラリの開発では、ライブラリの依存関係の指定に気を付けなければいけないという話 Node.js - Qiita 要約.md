---
type: summary
updated: 2026-07-26
---

# Reactのコンポーネントライブラリの開発では、ライブラリの依存関係の指定に気を付けなければいけないという話 Node.js - Qiita 要約

ソース: [[Reactのコンポーネントライブラリの開発では、ライブラリの依存関係の指定に気を付けなければいけないという話 Node.js - Qiita]]

初めての React コンポーネントライブラリ開発で「Invalid hook call」エラーに遭遇した経験から、依存関係指定の重要性を学ぶ記事。
原因はライブラリ側の dependencies に react / react-dom を入れていたため、利用側アプリに React のコピーが2つ含まれてしまう「重複した React」問題だった。
解決策は、react / react-dom を dependencies から外し、開発時用に devDependencies へ、利用側のものを参照させる宣言として peerDependencies（`>=16.8.0` のように幅を持たせる）へ置くこと。
peerDependencies は npm v7 から自動インストールされる仕様に変わった点にも触れ、有名ライブラリの package.json も同じ構成だと確認している。
他プロジェクトから参照される前提のライブラリでは、アプリ開発と違って依存の置き場所そのものが設計判断になる、というのが教訓。
