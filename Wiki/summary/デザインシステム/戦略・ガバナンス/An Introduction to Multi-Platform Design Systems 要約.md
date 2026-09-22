---
type: summary
updated: 2026-07-25
---

# An Introduction to Multi-Platform Design Systems 要約

ソース: [[An Introduction to Multi-Platform Design Systems]]

Amazonのデザインシステムに携わるDanny Banksが、公開デザインシステムの10%未満しかWeb以外のプラットフォームに対応していない現状を指摘し、Web中心主義から脱却したマルチプラットフォーム設計を提唱するClarity 2020の講演記事。
「cross-platform」ではなく「multi-platform」という語をあえて使い、全プラットフォームで同一の見た目・実装を求めるのではなく、consistency（一貫性）よりcohesion（凝集性）、efficiency（効率）よりautonomy（自律性）を目指すべきだと主張する。
凝集性の層として、原則・voice & tone等の基盤、design tokensによる視覚的凝集、そしてコンポーネント名・API・ドキュメントの共有定義を挙げ、実装はプラットフォームごとに異なってよいが乖離は意図的であるべきとし、Lyftの並行設計やdocumentation driven developmentを解決策として紹介する。
著者のチームでは、ネイティブ環境構築なしにUIコードを書ける開発環境や、モックアップ依存を減らしデザイナーと開発者がペアで本番UIを作る手法により、創る側の摩擦を除去して体験のオーナーシップを組織全体に分散させている。
結論として、プラットフォーム単位ではなく顧客の課題から逆算して、誰もが凝集性のある体験を作れるようにすることが重要だと訴える。
