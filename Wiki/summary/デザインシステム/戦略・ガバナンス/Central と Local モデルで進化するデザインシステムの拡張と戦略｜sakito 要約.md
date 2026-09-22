---
type: summary
updated: 2026-07-25
---

# Central と Local モデルで進化するデザインシステムの拡張と戦略｜sakito 要約

ソース: [[Central と Local モデルで進化するデザインシステムの拡張と戦略｜sakito]]

サイボウズでプロダクトデザイン戦略を担当する sakito 氏が、Nathan Curtis の Design System Tiers に基づき、デザインシステムを全プロダクト共通の「Central」とプロダクト固有の「Local」に階層化する戦略を解説した記事。
Central にはデザイン原則・デザイントークン・アイコン・基本コンポーネントが含まれ、Local には Central を基にした複合コンポーネントやプロダクト固有の要素が対応する（Brad Frost の The Design System Ecosystem の5層ではコアデザインシステム層が Central、他の層が Local に相当）。
この分割のメリットとして、全パターンを網羅する必要がなくなること、デザインシステムチームとプロダクトチームへの責任の分散、同じツール（Storybook 等）を使うことで成果物を Central と Local の間で移動しやすくなることの3点を挙げる。
実践例として kintone Design System では、全関係者が貢献しつつコアメンバーが責任を持つ「Federated チームモデル」を採用し、ドメインチームが作った共通利用可能なコンポーネントを Local から Central へ引き上げる運用を行っている。
今後は Cybozu の「ワンプラットフォーム」「エコシステム」構想を支えるため、デザイン組織全体でシステムを成長させ続けると結んでいる。
