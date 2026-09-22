---
type: summary
updated: 2026-07-26
---

# 【デザインシステム】デザイントークンをコード変換する Style Dictionary が超便利 要約

ソース: [[【デザインシステム】デザイントークンをコード変換する Style Dictionary が超便利]]

マイベストがデザインシステム構築で使う Style Dictionary の実践的な使い方解説。
Figma のデザイントークンを Tokens Studio で管理し、Style Dictionary で CSS Variables や TypeScript オブジェクトなど実装コードへ変換することで、Figma 上のトークンと実装の変数を一致させている。
config.js を使ったカスタマイズとして、実際に使っている3つの register 関数を紹介する。

- registerTransform — fontWeight の数値を文字列化するなど値の変換
- registerFormat — 余計な値を除いた TS ファイル（`as const` 付き theme）として出力
- registerFilter — Figma 用の primitiveColor を除外しセマンティックトークンのみ出力

柔軟にカスタマイズして組織の運用に合わせた出力にできるため、デザイナーとエンジニアのコミュニケーションが大幅に楽になると結論づける。
