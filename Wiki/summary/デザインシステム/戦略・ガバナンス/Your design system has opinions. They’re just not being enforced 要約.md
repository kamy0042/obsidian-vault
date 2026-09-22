---
type: summary
updated: 2026-07-26
---

# Your design system has opinions. They’re just not being enforced 要約

ソース: [[Your design system has opinions. They’re just not being enforced]]

Murphy Trueman が、ドキュメントに書いただけで強制されないデザインシステムは「インフラではなく希望で動くライブラリ」だと批判し、ドキュメントと採用の間に欠けている「バリデーション層」を設けよと主張する記事。
バックエンドが入力検証やスキーマ制約を当然とするのに対し、UI は曖昧さを放置しており、必須の子要素（Modal には ModalActions が必須など）・禁止の props 組み合わせ（loading と disabled の併用など）・状態制約を契約としてコード化すべきだとする。
検証はデザイン時（Figma lint、コンポーネント定義のデータ化）・ビルド時（TypeScript の never 型、ESLint、CI のスキーマ検証）・ランタイム（開発時のみのガードレール）の3点で行う。
AI エージェントが UI を書く時代には人間のように「察して直す」ことができないため、Google の A2UI のようなスキーマとカタログによる契約がいっそう重要になると位置づける。
「ドキュメント化する価値があるルールは強制する価値がある」とし、誤用の多い3〜5コンポーネントから小さく始めることを勧める。
