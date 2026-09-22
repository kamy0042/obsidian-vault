---
type: summary
updated: 2026-07-27
---

# How to Build an Agentic Design System People (and Agents) Will Actually Use (Part 1) 要約

ソース: [[How to Build an Agentic Design System People (and Agents) Will Actually Use (Part 1)]]

Manychat の iOS エンジニア Thành Đỗ Long が、3プラットフォームで乖離していたデザインシステムを AI 駆動の「Manyfest Design System」として10営業日で再構築した事例の第1章。
デザインシステムの本質はコンポーネントライブラリではなくデザインとエンジニアリングの共有言語であり、コンポーネントより先にトークン（サブアトム層）を Core → Semantic → Component の3層で整備すべきと説く。
AI エージェントは人間と違い欠落を直感で埋められないため、DTCG 標準に intent ブロック（useFor / doNotUseFor / pairsWith）を追加した「トークン意図メタデータ」で使途の why を構造的に持たせた。
Figma ファイルを解析してデザイナー向け・エンジニア向けの質問を書き戻すレビュースキルや、全 PR への AI レビューなど、レビューに第3の読み手として AI を組み込んでいる。
10日間の高速構築は数ヶ月の従来型構築で基盤の正解を見つけていたから可能であり、AI は判断ではなく加速に使えというのが結論。
