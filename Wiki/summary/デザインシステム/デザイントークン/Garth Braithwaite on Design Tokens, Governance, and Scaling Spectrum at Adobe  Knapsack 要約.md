---
type: summary
updated: 2026-07-26
---

# Garth Braithwaite on Design Tokens, Governance, and Scaling Spectrum at Adobe  Knapsack 要約

ソース: [[Garth Braithwaite on Design Tokens, Governance, and Scaling Spectrum at Adobe  Knapsack]]

Adobe Spectrum のトークン管理責任者 Garth Braithwaite への Design Systems Podcast インタビュー。
Spectrum は Figma で設計されたトークンを JSON Schema で検証された JSON として全プラットフォーム実装（CSS / React / Web Components / iOS / Android）に配布し、値→エイリアス→コンポーネント別エイリアスの3層命名で「どの色を使うべきか」を伝えるが、エンジニアが「2px ならどれでも同じ」と低レベルトークンを掴む誤用が絶えず、セマンティックな代替を提案するリンターや、名前文字列に埋め込まれた意味情報を型検証可能なオブジェクトへ移す「anonymous tokens」構想で対処しようとしている。
命名の鍵はコンテンツストラテジストの雇用で、デザイナー・多プラットフォームのエンジニアに通じる共通言語の策定を研究と議論のファシリテーションで担う。
バージョニングはコンポーネント単位の semver を採用するが、デザイン上の破壊的変更と実装上の破壊的変更は一致しない（見た目が同じでも DOM 構造が変わる等）ため万能な規則はなく、過剰なほどのコミュニケーションで補う。
Garth のフロントエンド・マニフェストは「デザインシステムはインフラである」「デザインシステムの目的は変化し、変化を管理することである」「プロダクトオーナーへの価値を構築せよ（DS 警察になるな）」の3箇条で、完璧を目指して麻痺するより今ある資源で始めて反復せよと説く。
