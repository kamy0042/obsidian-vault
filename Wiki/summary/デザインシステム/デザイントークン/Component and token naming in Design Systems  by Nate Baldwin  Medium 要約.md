---
type: summary
updated: 2026-07-26
---

# Component and token naming in Design Systems  by Nate Baldwin  Medium 要約

ソース: [[Component and token naming in Design Systems  by Nate Baldwin  Medium]]

Adobe Spectrum のメンテナである Nate Baldwin が、エンタープライズ・クロスプラットフォーム DS の実務視点で命名論の通説を修正する記事。
「コンポーネント」「パターン」などの呼称や、ケース記法（camelCase / kebab-case 等）のシステム全体での統一は不要で、各ライブラリが自前の一貫した規約を守ればよい——問題なのは同じ部品に別名を付けることだけだと説く。
名前そのものより重要なのはコンポーネントの「Design API」で、どのオプションが boolean / 列挙か、何が組み合わせ可能・排他かをプラットフォーム非依存に文書化することが全プラットフォームでの一貫実装を支える。
トークン命名では `primary` のような曖昧なセマンティクスだけの名前を否定し、色の実体を示す名前（purple300）→広い文脈（primaryBackgroundColor）→具体的文脈（primaryButtonBackgroundColor）へとエイリアスを階層化する方式を推奨する。
結論は「uniformity（画一）ではなく unity（統一の精神）」——全体で矛盾しない限り、各リソースが自律的な標準を持つべきだとする。
