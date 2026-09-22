---
type: summary
updated: 2026-07-27
---

# Component Contracts The missing piece for AI-era Design System handoff 要約

ソース: [[Component Contracts The missing piece for AI-era Design System handoff]]

イランの大手動画プラットフォーム Aparat の DS オーナー Ehsān Vaeghi による、コンポーネントの「振る舞い」を機械可読に記述する Component Contracts の実践報告。
トークンや Figma で視覚・構造は共有できても、独自コンポーネントの状態・遷移・制約という振る舞い層には公開標準がなく、曖昧さが質問とブロックを生むと指摘する。
振る舞いを列挙する平文テンプレートの MVP だけで曖昧さが約70%減し、その理由を「モデルよりコンテキスト」（Figma Make と素の Claude の品質差はモデルではなく見えている情報の差）と分析。
リストを JSON の契約（props・状態機械・トリガー・a11y・応答規則。視覚情報は意図的に除外し「契約にない振る舞いは存在しない」実行境界とする）に発展させ、ブロック時間は15.9%→3.3%、複雑タスクのスループットは7.8倍になった。
契約はデザイナーの自然言語の意図と Figma MCP の構造情報から AI が生成するようになり、デザイン・開発・AI エージェント間の同期層として OSS 公開されている。
