---
type: summary
updated: 2026-09-22
---

# Why Your Color Tokens Must Describe Purpose, Not Just Appearance 要約

ソース: [[Why Your Color Tokens Must Describe Purpose, Not Just Appearance]]

色を `blue-500` や `gray-200` のような見た目で命名すると、同じ値がボタン・選択状態・リンク・バナーなど異なる役割に流用され、ダークモードやリブランド時に一括置換できなくなる。
`color-action-primary` や `color-feedback-critical` のような目的ベースの名前は、値と意図を分離し、利用者に正しい用途を示す行動上のガードレールとして働く。
筆者は、見た目を表す Global、目的を割り当てる Alias、必要時だけ使う Component の3層を設け、コンポーネントからは Alias のみを参照する構造を推奨する。
ただしアーキテクチャだけでは定着せず、Figma とコードの命名一致、補完ツール、プラグイン、lint、コードレビューによって正しい使い方を最も容易な経路にする必要がある。
目的ベースのトークンはテーマ変更を局所化し、チームを色選びからユーザー課題へ集中させる、変更に強いプロダクト基盤になると結論づける。
