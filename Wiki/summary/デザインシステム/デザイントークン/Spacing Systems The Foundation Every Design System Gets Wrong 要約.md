---
type: summary
updated: 2026-07-26
---

# Spacing Systems The Foundation Every Design System Gets Wrong 要約

ソース: [[Spacing Systems The Foundation Every Design System Gets Wrong]]

Roberto Moreno Celta（Design Systems Collective）による、スペーシングシステム設計論。
多くのスペーシングシステムが失敗するのは、コンポーネント単体のパディング・マージンから定義する「コンポーネントファーストの罠」に陥り、コンポーネント間・レイアウト内の関係性を無視しているからだと指摘する。
処方箋は、8px 倍数などの数学的スケールを土台にしつつ視覚バランスのための文書化された例外（optical adjustment）を許容するハイブリッド方式と、サイズ名（small / medium）ではなく目的ベースのセマンティックトークン（--space-related-elements、--space-section-break 等）の採用。
レスポンシブ対応は比例縮小ではなく画面サイズごとに空間関係そのものが変わる（モバイルは密度優先＋44px のタッチターゲット、デスクトップは余白で認知負荷を軽減）と捉えるべきとする。
トークンはプリミティブ→セマンティック→コンポーネントの3層で構成し、スペーシング値は5〜7個に絞り、実コンテンツ・実ユーザー・複数デバイスで検証せよ、「最良のシステムはチームが実際に一貫して使うもの」と結ぶ。
