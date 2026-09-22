---
type: summary
updated: 2026-07-26
---

# Viteのライブラリモードでビルドする際、フォーマットごとにディレクトリを分ける vite - Qiita 要約

ソース: [[Viteのライブラリモードでビルドする際、フォーマットごとにディレクトリを分ける vite - Qiita]]

Vite のライブラリモードで ES Modules と CommonJS の dual package UI ライブラリを、dist/es・dist/cjs のディレクトリに分けて出力する方法の解説。
rollupOptions.output の preserveModules: true でコンポーネントごとのファイル分割を保ち、lib.fileName に '[format]/[name]' という書式を指定するのが鍵。
似た働きをする rollupOptions.output.entryFileNames に同じ書式を書くと拡張子が消えてしまい、うまくいかなかった。
この書式は Vite ではなく内部で使われている Rollup の機能のため、Vite のドキュメントには載っておらず Rollup 側を見ないと分からないと指摘する。
Vite としての動きと Rollup をラップしただけの動きが混在するのがライブラリモードの難しさだと結論づける。
