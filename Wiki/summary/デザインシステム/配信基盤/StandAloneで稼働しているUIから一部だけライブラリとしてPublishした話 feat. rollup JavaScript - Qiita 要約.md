---
type: summary
updated: 2026-07-26
---

# StandAloneで稼働しているUIから一部だけライブラリとしてPublishした話 feat. rollup JavaScript - Qiita 要約

ソース: [[StandAloneで稼働しているUIから一部だけライブラリとしてPublishした話 feat. rollup JavaScript - Qiita]]

既存 React アプリの約60%のコンポーネントを社内の別プロジェクトでも使うため、ライブラリとして切り出した事例。
従来はほぼソースコードそのままが配布されコンシューマ側でのビルドが必要だった問題を、rollup でバンドル済み JS（ES/CJS の dual 出力）を配布する形に改善した。
プラグインは babel・resolve・commonjs の「3種の神器」に postcss（CSS Modules を css ファイルに抽出）を加え、React は別インスタンス問題を避けるため必ず external に入れる。
コンシューマ側の scss 1行でスタイルを当てる仕組みは実現できず、結果は「まぁまぁ」と自己評価している。
教訓として、ライブラリ部分はディレクトリを完全に独立させ package.json を分けておくべきで、やっていないと publish 時に余計なワークアラウンドが必要になると述べる。
