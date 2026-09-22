---
type: entity
entity-type: product
updated: 2026-07-25
---

# StyleX

## 概要

Meta が2023年12月にオープンソース化したコンパイル時 CSS エンジン。ランタイム CSS-in-JS ではなく、ビルド時に実行される Babel プラグインとしてスタイル宣言を抽出し、プロパティ・値ペアごとにアトミック CSS クラスへ変換、コードベース全体でグローバルに重複排除して静的スタイルシートを出力する。

## 主要な事実

以下すべて出典: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]

- CSS バンドルがアプリケーションサイズに比例して増加しない設計。Meta 規模では冗長なスタイル宣言の排除により CSS サイズを約80%削減（https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/）
- Figma や Snowflake などの外部企業も採用しており、コンパイル時パイプラインは Meta 外のエンタープライズ規模でも検証済み
- [[Astryx]] のスタイリングレイヤーとして採用。Astryx では CSS がプリコンパイルされているため、利用側が StyleX を依存関係として設定する必要はない
- Tailwind のユーティリティクラスと異なり、実行時オーバーヘッドなしでアトミックかつ重複のない CSS を生成する点が shadcn/ui との構造的差異のひとつ

## 登場するソース

[[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]

## 関連ページ

[[Astryx]], [[AI時代のデザインシステム]]
