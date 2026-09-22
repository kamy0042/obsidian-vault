---
type: summary
updated: 2026-07-26
---

# 新しいメルカリDesign System Web  メルカリエンジニアリング 要約

ソース: [[新しいメルカリDesign System Web  メルカリエンジニアリング]]

メルカリの Design System Web 開発者による、React 製ライブラリから Web Components ベースへの作り直しの技術解説（2021年）。
メルカリ単体からグループ全体・マーケットアプリ全体で使えるデザインシステムへと目的を改めた結果、チームごとに技術スタックが異なる環境でも使える「真にスケーラブルなライブラリ」が必要になり、Web 標準である Web Components（実装は Lit）を採用した。
コンポーネント単位で WCAG 2.1 AA のアクセシビリティを保証し、機械テスト・lighthouse・キーボード/スクリーンリーダーの実機検証を組み合わせている。
i18n はあえてライブラリ側で何もせず alt や aria-label まで attribute で利用者に設定を必須化、ダークモード/テーマは CSS variable と Color Token の参照置き換えで実現、React には型付き Wrapper を自動生成して対応した。
SSR は Lit 単体では未対応のため Rendertron + Polyfill での回避を推奨とするなど制約も率直に共有し、Web Components を実運用に載せた先行事例として界隈の機運を高めたいと結んでいる。
