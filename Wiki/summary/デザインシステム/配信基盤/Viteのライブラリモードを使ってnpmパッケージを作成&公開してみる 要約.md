---
type: summary
updated: 2026-07-26
---

# Viteのライブラリモードを使ってnpmパッケージを作成&公開してみる 要約

ソース: [[Viteのライブラリモードを使ってnpmパッケージを作成&公開してみる]]

Vite のライブラリモードでカスタム console 出力の小さな npm パッケージを作成し、公開するまでのチュートリアル。
vite.config.js の build.lib に entry・name・fileName を指定すると、デフォルトで es と umd の2フォーマットが dist に生成される。
型定義ファイルは vite-plugin-dts を使わず、tsconfig の noEmit を外して declaration / emitDeclarationOnly を設定する方法で対応した。
build スクリプトは「tsc && vite build」のままだと vite build が型定義を消してしまうため、「vite build && tsc」に順序を入れ替えるのがポイント。
仕上げに package.json の main・module・types・files・exports を設定し、npm login と npm publish で公開して完了する。
