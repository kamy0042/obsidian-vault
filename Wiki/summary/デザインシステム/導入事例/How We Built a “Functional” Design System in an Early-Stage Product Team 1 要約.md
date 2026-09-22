---
type: summary
updated: 2026-09-22
---

# How We Built a “Functional” Design System in an Early-Stage Product Team 1 要約

ソース: [[How We Built a “Functional” Design System in an Early-Stage Product Team 1]]

機能するデザインシステムはコンポーネントライブラリではなく、チームのコミュニケーションと意思決定を支え、不要な判断を減らす仕組みである。
当初はStorybookとFigmaが分断されて同種UIが再実装されていたため、実際の画面を監査しながらFigmaとVue.jsの再利用部品を揃えた。
新規コンポーネントを作る前に、既存部品の再利用・拡張、将来の反復可能性、差異のユーザー上の必要性を話し合う運用へ移行した。
さらに余白・見出し・フォーム構造を扱うレイアウトパターンと、複数画面にまたがる行動を扱うワークフローパターンを整備した。
初期チームでは巨大なシステムを先に作らず、実際の製品開発を通じて「コンポーネント→パターン→ワークフロー思考」と段階的に育てるべきだと結論づける。
