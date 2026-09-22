---
type: summary
updated: 2026-07-26
---

# Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog 要約

ソース: [[Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog]]

弁護士ドットコムが Tokens Studio for Figma と Style Dictionary を組み合わせてデザイントークン運用を構築した実践記事（クリップは記事後半のみで、前半のトークン定義手順は欠落）。
Tokens Studio を GitLab とアクセストークンで連携させてトークンを同期し、Storybook プラグイン storybook-design-token でカテゴリごとのトークンドキュメントを自動生成している（コメントブロックは開始/終了の両方を宣言すると表示が安定するという実践知を含む）。
今後のアイデアとして、ドキュメンテーション トークンと Automator プラグインによる Figma 上のリファレンスシート自動生成や、Illustrator スウォッチへの一括登録を挙げる。
デザイントークンはただの変数ではなく組織の共通言語であり、ツール移行やマルチプラットフォーム展開の際も「信頼できる唯一の情報源」としてツール非依存の運用を支えると結論づける。
社内でも新規プロダクトへの導入や他チームの検討が始まり、トークンの輪が徐々に広がっているという。
