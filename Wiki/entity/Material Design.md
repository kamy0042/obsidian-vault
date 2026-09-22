---
type: entity
entity-type: product
aliases: [M3, Material 3, マテリアルデザイン]
updated: 2026-07-10
---

# Material Design

## 概要

Google のデザインシステム。「UIデザインのベストプラクティスを支援するガイドライン・コンポーネント・ツールの適応可能なシステム」を掲げ、M1 → M2（Material Theming）→ M3（Material You / Dynamic Color）と3世代進化してきた（出典: [[Material 3 やめました - Good-bye M3 design system - Speaker Deck]]）。

## 主要な事実

- **デザイントークンの3階層**を持つ: Reference Token（`md.ref`、文脈で変化しない全参照元）/ System Token（`md.sys`、文脈に応じて異なる Reference を指す、システムの性格を決める決定）/ Component Token（`md.comp`、コンポーネント内要素に割り当てる属性）（出典: [[Material 3 やめました - Good-bye M3 design system - Speaker Deck]]）
- **M3 のカラーシステム**は配色を固定値ではなく「相対的な色調のまとまり」として扱う: 5つのキーカラー（primary / secondary / tertiary / neutral / neutral variant。error は別枠、カスタム追加可）× 白黒含む13トーン（0〜100）を生成し、そこから26+のカラーロール（primary / on-primary / primary-container / on-primary-container…）を UI へマッピングする。**トーン値の差がコントラストを保証**（40以上で 3:1、50以上で 4.5:1。Primary Container vs On Primary Container は常に 7:1）ため、動的配色やテーマ切替でも比が保たれる。サーフェスの高度（elevation）は primary の半透明オーバーレイで表現。カスタム色は自動調和され、設定した色そのものがスキームに含まれないこともある（出典: [[Material Design 3 要点まとめ 7 Color - Color system｜パジェロ｜COMPASS]], [[Color system – Material Design 3]]）
- この3階層構成は他社のトークン設計の参照モデルになっている。ANDPAD は自社トークン体系（リファレンス→システム→コンポーネント）の設計で「一番合う」として Material Design を参考にした（出典: [[ANDPADに学ぶ、デザインシステム導入の“落とし穴”。業界特化型SaaSの試行錯誤  キャリアハック]]）
- **M3 離脱事例**（Android アプリ開発、DroidKaigi 2023 の Yuki Anzai）: 最大のペインポイントは**色**。ブランドカラーを使いたいのに M3 はトーナルパレット（キーカラーから13トーンを生成しロールに割当）前提で手動調整が難しく、カスタム色は Dynamic Color にもダークモードにも対応しない → 「全色を自前定義した方がよい」。また Component Token は「参照が深く追いにくく、そこまでの抽象化は不要」として不採用。結論として M3 のトークン**機構**（Reference/System）だけを流用し、CompositionLocal ベースの自前テーマ + M3 コンポーネントのラッパーでカスタムデザインシステムを構築した（出典: [[Material 3 やめました - Good-bye M3 design system - Speaker Deck]]）
- Material Design チームを約5年率いた [[Itai Vonshak]] 自身が、退任後に「デザインシステムは私たちを失望させた。取り扱い説明書に書かれているようにはならなかった」と総括している（出典: [[翻訳記事：デザインシステムの破られた約束；なぜルールに従っても優れた製品が得られないのに従うのか｜Nobuya Sato]]）
- ドキュメンテーションの雛形としても参照される。ただし Material の Do's and Don'ts を流用した文書は自プロダクトの実際のエッジケースをカバーせず利用者の質問に答えない、という失敗事例が報告されている（出典: [[We Thought Our Design System Documentation Was Good. Our Users Disagreed.]]）。詳細は [[デザインシステムのドキュメンテーション]]

## 登場するソース

[[Material 3 やめました - Good-bye M3 design system - Speaker Deck]], [[ANDPADに学ぶ、デザインシステム導入の“落とし穴”。業界特化型SaaSの試行錯誤  キャリアハック]], [[翻訳記事：デザインシステムの破られた約束；なぜルールに従っても優れた製品が得られないのに従うのか｜Nobuya Sato]], [[We Thought Our Design System Documentation Was Good. Our Users Disagreed.]], [[Material Design 3 要点まとめ 7 Color - Color system｜パジェロ｜COMPASS]], [[Color system – Material Design 3]]

## 関連ページ

[[Itai Vonshak]], [[デザインシステムの過剰設計]], [[デザインシステム批判論]], [[デザイントークン]], [[セマンティックトークン]], [[カラーシステムの設計]]
