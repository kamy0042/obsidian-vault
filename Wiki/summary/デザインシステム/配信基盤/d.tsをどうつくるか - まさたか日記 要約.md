---
type: summary
updated: 2026-07-26
---

# d.tsをどうつくるか - まさたか日記 要約

ソース: [[d.tsをどうつくるか - まさたか日記]]

TypeScript 製ライブラリが型定義ファイル（d.ts）をどう提供すべきかを、Angular のソースコードから学んだ知見として解説する日記記事。
答えは「index.d.ts を手書きしない」ことで、`export * from './public_api'` 形式の index.ts を用意し、tsconfig の `declaration: true` で全 .ts から .js と .d.ts のペアを自動生成させる。
生成された index.d.ts を package.json の `types` フィールドで指すだけで、ECMAScript / TypeScript どちらの利用者にも対応できる。
後半は日記として、Enzyme v3 移行のセットアップ手順、keyof 演算子によるプロパティ名の型束縛、関数オーバーロード・ユニオン型・as 演算子の三点セットの理解などの TypeScript 学習記録が続く。
自作 React フォームライブラリの npm 公開経験を通じ、難所はライブラリ本体の実装よりも「切り出しとパッケージング」にあったと振り返っている。
