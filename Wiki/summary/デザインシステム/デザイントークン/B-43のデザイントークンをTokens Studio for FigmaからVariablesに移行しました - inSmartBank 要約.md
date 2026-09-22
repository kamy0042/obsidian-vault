---
type: summary
updated: 2026-07-25
---

# B-43のデザイントークンをTokens Studio for FigmaからVariablesに移行しました - inSmartBank 要約

ソース: [[B-43のデザイントークンをTokens Studio for FigmaからVariablesに移行しました - inSmartBank]]

スマートバンクのデザイナー @putchom が、家計簿プリカ B/43 のデザイントークン管理を Tokens Studio for Figma から Figma 標準の Variables に移行した事例報告。
移行理由は、プラグインを毎回起動する手間、一括処理時の動作不安定（クラッシュや適用漏れ）、GitHub の Personal Access Token 設定など非エンジニアに高いセットアップ・学習障壁の3点。
プロフェッショナルプランでは REST API による JSON インポートが使えないため、公式サンプルを改変した独自プラグインを開発し、ライト/ダークモードのテーマ対応・Variables の更新・GitHub からのインポートを実現した。
移行時点で Variables が未対応だった Typography 型は Text Styles、Gradient 型は Color Styles で代替し、トークンの型ごとにファイルを分けてライブラリとして公開した。
結果として、デザイナーに限らず PM やエンジニアも障壁なくセマンティックなデザイントークンを扱えるようになり、動作も軽く安定したと結論づけている。
