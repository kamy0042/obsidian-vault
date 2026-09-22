---
type: summary
updated: 2026-07-26
---

# package.jsonのexportsフィールドについて 要約

ソース: [[package.jsonのexportsフィールドについて]]

npm パッケージで複数のエントリーポイントを公開するための `exports` フィールドの仕様を、Node.js 公式ドキュメントに沿って確認するメモ記事。
`exports` は単なるエントリーポイント定義ではなくパッケージのインターフェース定義であり、指定したもの以外は非公開となって利用側から読み込めなくなる（指定漏れは `ERR_PACKAGE_PATH_NOT_EXPORTED` を引き起こす）。
`main` と併存する場合は `exports` が優先されるが、未サポート環境へのフォールバックとして両方の定義が推奨される。
Conditional exports により `import` / `require` など条件ごとに異なるファイルを指せるため、ESM / CJS のどちらを見るべきかを利用者が気にしなくて済む。
型定義は TypeScript 4.7 から `exports` 内の `types` 条件でパス指定でき、提供側が「何をどう使ってもらうか」をコントロールできる点が最大の利点だとまとめている。
