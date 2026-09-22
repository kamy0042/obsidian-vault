---
type: summary
updated: 2026-07-26
---

# 入社10ヶ月で行った Turtle デザインシステムの開発と関連する取り組み - DMM Developers Blog 要約

ソース: [[入社10ヶ月で行った Turtle デザインシステムの開発と関連する取り組み - DMM Developers Blog]]

DMM.com の社内デザインシステム Turtle の開発メンバー（debiru 氏）による、入社10ヶ月間の改善施策の詳細な技術報告（2024年）。
Turtle はデザイン原則（ABCDE の5価値）・3種のガイドライン・デザイントークン/Figma/React ライブラリ・マニュアルと Storybook で構成され、全社統一のデザインシステムを目指している。
最大の施策はデザイントークンの一元管理で、スプレッドシートをマスターデータに GAS で JSON 化し、自作 Figma プラグイン「Local Variables Manipulator」・メタプログラミングによる JSDoc 付き実装コード生成で、Figma・React・マニュアルの3箇所に分散していた値を単一ソース化した。
Figma Code Connect を全コンポーネントに設定してデザインからのコード出力を可能にし、「Code Connect ファイルは実行されず文字列として扱われる」制約などの実践知見も共有している。
ほかにリファレンスアプリの作成（ドッグフーディングによる改善点発見）、Storybook への文書集約（mdx + ArgTypes、react-docgen-typescript への切り替え）を行い、2025年中の一般公開を展望に掲げる。
