---
type: summary
updated: 2026-07-26
---

# MUIを使う際に、ViteのSSRの場合で発生したエラーに対処した設定 vite - Qiita 要約

ソース: [[MUIを使う際に、ViteのSSRの場合で発生したエラーに対処した設定 vite - Qiita]]

MUI を Vite でビルドした際、ブラウザレンダリングでは問題ないのに SSR ビルドで `SyntaxError: Unexpected token 'export'` 等のエラーが出る問題への対処記事。
原因は Node.js が MUI の ESM 形式のファイルを CommonJS として読もうとすることで、`@mui/material/MenuItem` のようなサブパス import や DatePicker で顕在化する。
当初は `import { MenuItem } from "@mui/material"` に書き換える回避策を取っていたが、根本対処は vite.config.js の `ssr.noExternal` に `@mui/material` `@mui/x-date-pickers` などを列挙して Vite に事前処理させること。
エラーの原因が MUI・Vite・自環境（Inertia + PHP）のどれにあるか切り分けにくいのが SSR × UI ライブラリの難所だと締めており、ESM/CJS 互換問題の典型例として参考になる。
