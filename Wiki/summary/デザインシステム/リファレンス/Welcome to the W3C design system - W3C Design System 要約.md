---
type: summary
updated: 2026-07-26
---

# Welcome to the W3C design system - W3C Design System 要約

ソース: [[Welcome to the W3C design system - W3C Design System]]

W3C の Web サイト群で使うスタイル・コンポーネント・テンプレートを文書化した公式デザインシステムのトップページで、フロントエンドアセットの設計思想の解説が中心。
CSS は Sass（SCSS）+ CUBE CSS の影響下にあり、00-settings から 90-utilities まで詳細度の低い順に10レベルへ分割するアーキテクチャを採る。
コンパイル成果物は core.css / advanced.css / print.css の3本に分かれ、advanced.css は「CSS Only Mustard Cut」というメディアクエリ技法で対応ブラウザにのみ配信される（JS を使わないプログレッシブエンハンスメント）。
JavaScript は data-attributes をフックにし、JS が付与するクラスには .js- プレフィックスを付ける規約で、Chris Ferdinandi 流のバニラ JS 構成を参照している。
フレームワークに依存しない古典的かつ堅実な Web 標準志向の設計例として、配信戦略やレイヤリングの参考になる。
