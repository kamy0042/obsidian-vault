---
type: entity
entity-type: product
aliases: [ストーリーブック]
updated: 2026-07-12
---

# Storybook

## 概要

コード実装された UI コンポーネントを構築・表示・テスト・レビュー・文書化する「フロントエンドワークショップ」の事実上の標準。この wiki で最も頻繁に登場するツール実体（13ページ超）で、単なる見本帳ではなく**仕様確認の場・ドキュメント集約先・デザインとコードの橋・AI への文脈供給源**という複数の顔で現れる。

## 主要な事実

- [[Brad Frost]] のエコシステム論での位置づけ: **フロントエンドワークショップ**としてコンポーネントリポジトリの dev dependency に含め、Netlify 等で**ブランチごとにデプロイ**してマージ前のテスト・レビュー・議論に使う。リファレンスサイト（storefront）とは workshop / storefront の対の関係（出典: [[The Design System Ecosystem  Brad Frost]]）
- **「カタログではなく仕様確認の場」**: 目的（仕様の確認）を失った Story は腐る——展示棚ではなく、コンポーネントの仕様・状態・エッジケースを確認する場という位置づけ（出典: [[Storybookは目的を持って活用しましょう ~コンポーネントの「仕様」を考える~ - Qiita]]）。「カタログ止まりの実装はデザインシステムの抽象を運べない」という批判は [[React でデザインシステムを正しく実装する - コンポーネントカタログを超えて  Wantedly Engineer Blog]]。詳細は [[コンポーネントカタログ]]
- **ドキュメント集約先として**: DMM Turtle は利用者アンケートで「Storybook が馴染みのあるリソース」と確認した上で社内 Wiki から集約し、Google Analytics で参照統計を取り、mdx + ArgTypes で実装コードの JSDoc から Props 表を自動生成して二重管理を避けた（出典: [[入社10ヶ月で行った Turtle デザインシステムの開発と関連する取り組み - DMM Developers Blog]]）。kintone も GettingStarted / Contributing / Guidelines / DesignTokens / Components を Storybook で提供し、利用者4属性別の入口を整備（出典: [[デザインシステム啓発のためのアプローチ｜kintone Design Systemのオンボーディング改善とリリースブログ｜トビ - KazuhiroTobita]]）
- ただし注意も: 「**Storybook はデザイナー向けとデベロッパー向けのドキュメント分裂を作りうる。すべてを一箇所に**」（出典: [[Design System Wisdom 2023]]）——Zeroheight 等で Figma と Storybook を単一のリファレンスに束ねる構成はこの分裂への回答（出典: [[The Design System Ecosystem  Brad Frost]]）
- **デザイナーによる更新の民主化**: ANDPAD Tsukuri は「デザイナーが GitHub で Storybook を更新するのは心理的ハードルが高い」という懸念を勉強会とハンズオンで克服し、全デザイナーが更新可能にした（出典: [[デザインシステム「Tsukuri」の立ち上げから現在まで〜取り組みとその成果〜 - ANDPAD Tech Blog]]）。Design System in 90 Days のカリキュラムにも「Teach Storybook to Designers」が組み込まれている（出典: [[“Design System in 90 Days,” a workbook from SuperFriendly]]）
- **階層間の共通ツールとして**: Central と Local で同じツール（Storybook）を使うと、コンポーネントやドキュメントの移動——Local から Central への昇格——が容易になる（出典: [[Central と Local モデルで進化するデザインシステムの拡張と戦略｜sakito]]。詳細は [[デザインシステムの階層化]]）
- **AI への文脈供給**: Storybook MCP server（[[Model Context Protocol]]）が AI ツールに構造化されたコンポーネントコンテキストを提供し、インタラクション/アクセシビリティテストを回す自律修正ループを可能にする——「AI が UI の大部分を書くようになれば nice to have ではなくなる」（出典: [[Your design system has opinions. They’re just not being enforced]]。詳細は [[AI時代のデザインシステム]]）
- **ネイティブの空白**: 「iOS/Android の Storybook はあるか」と何度も聞かれるほどネイティブ側のワークショップツールは未成熟。Intuit がネイティブコンポーネントを Storybook 内で実際にネイティブレンダリングするデモを示した（出典: [[The Design System Ecosystem  Brad Frost]], [[An Introduction to Multi-Platform Design Systems]]）
- トークンとの連携: Style Dictionary で生成したデザイントークンを Storybook で可視化する連携フローの実例がある（出典: [[Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ]]。詳細は [[デザイントークンのツールチェーン]]）

## 登場するソース

[[The Design System Ecosystem  Brad Frost]], [[Storybookは目的を持って活用しましょう ~コンポーネントの「仕様」を考える~ - Qiita]], [[React でデザインシステムを正しく実装する - コンポーネントカタログを超えて  Wantedly Engineer Blog]], [[入社10ヶ月で行った Turtle デザインシステムの開発と関連する取り組み - DMM Developers Blog]], [[デザインシステム啓発のためのアプローチ｜kintone Design Systemのオンボーディング改善とリリースブログ｜トビ - KazuhiroTobita]], [[Design System Wisdom 2023]], [[デザインシステム「Tsukuri」の立ち上げから現在まで〜取り組みとその成果〜 - ANDPAD Tech Blog]], [[“Design System in 90 Days,” a workbook from SuperFriendly]], [[Central と Local モデルで進化するデザインシステムの拡張と戦略｜sakito]], [[Your design system has opinions. They’re just not being enforced]], [[An Introduction to Multi-Platform Design Systems]], [[Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ]]

## 関連ページ

[[コンポーネントカタログ]], [[デザインシステムのドキュメンテーション]], [[デザインシステムの階層化]], [[AI時代のデザインシステム]], [[デザイントークンのツールチェーン]], [[Brad Frost]], [[Style Dictionary]]
