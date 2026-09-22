---
type: summary
updated: 2026-07-26
---

# React でデザインシステムを正しく実装する - コンポーネントカタログを超えて  Wantedly Engineer Blog 要約

ソース: [[React でデザインシステムを正しく実装する - コンポーネントカタログを超えて  Wantedly Engineer Blog]]

Wantedly の UI デザインシステムの React 実装を、バックエンドテックリードの izumin5210 氏が解説する記事。
デザインシステムを「エンジニアとデザイナが効率よくコミュニケーションするための共通言語」と捉え、単なるコンポーネントカタログではなく、デザイナと同じレベルの抽象を持つライブラリ・フレームワークとして実装すべきだと主張する。
具体的には Lv.0 Foundation（色・Elevation・Reaction 等の原則）を styled-components の CSS interpolation とカスタム Hook（useReaction 等）のツールキットとして提供し、Lv.1 Basic Components はそれを組み合わせて実装する。
Foundation の原則にはロジックが含まれるため、単なるスタイル定義集（styled-system 型）ではなくフックを併用する構成になった点が設計の要。
デザイナがコンポーネント作成時に指定するパラメタがそのまま Props に表出することで、「デザイナと同じロジックでコンポーネントを作れる」状態を実現している。
