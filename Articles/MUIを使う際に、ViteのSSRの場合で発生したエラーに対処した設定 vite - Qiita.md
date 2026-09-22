---
タグ: []
作成日時: 2024-04-12T17:23:00
URL: https://qiita.com/miyawa-tarou/items/b03ecc5e082edd1c4c4f
Tags: [topic/デザインシステム/配信基盤]
---
![[https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-9f5428127621718a910c8b63951390ad 1.png]]

MUIを使って構築しViteでビルドした際に、ブラウザレンダリングではなんともなかったが、SSRのbuildをして、いざ動かすとエラーが出ることが多々あった。

それの対応について。

## materialとかの読み込みエラー

多くの場合は下記のようにMUIのパーツを読み込む場合

```plain text
import MenuItem from "@mui/material/MenuItem";

```

ブラウザでレンダリングしているときはエラーではなかったが、SSRにするとなぜかエラーになった

```plain text
(node:66490) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/*****/node_modules/@mui/material/MenuItem/index.js:3
export { default } from './MenuItem';
^^^^^^

SyntaxError: Unexpected token 'export'
    at internalCompileFunction (node:internal/vm:74:18)
    at wrapSafe (node:internal/modules/cjs/loader:1141:20)
    at Module._compile (node:internal/modules/cjs/loader:1182:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1272:10)
    at Module.load (node:internal/modules/cjs/loader:1081:32)
    at Module._load (node:internal/modules/cjs/loader:922:12)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:169:29)
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)

```

色々探って、下記みたいな回避策を取っていた。しかし開発中は気づけなくて割と困っていた。

```plain text
import { MenuItem } from "@mui/material";

```

しかし実は下記のような記載をvite.config.jsに記載すれば回避できるようである

vite.config.js

```plain text
export default defineConfig({

  plugins: [
  (省略)
  ],
  ssr: {
    noExternal: [
      // MUI needs to be pre-processed by Vite in production: https://github.com/brillout/vite-plugin-ssr/discussions/901
      "@mui/base",
      "@mui/icons-material",
      "@mui/material",
      "@mui/utils"
    ],
  }

```

## MUI DatePickerまわりでのエラー

正確には自分の場合は先に読み込んだ  で同じ内容のエラーがまず出たのだが、

```plain text
import { DatePicker } from "@mui/x-date-pickers/DatePicker/index.js";
         ^^^^^^^^^^
SyntaxError: Named export 'DatePicker' not found. The requested module '@mui/x-date-pickers/DatePicker/index.js' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '@mui/x-date-pickers/DatePicker/index.js';
const { DatePicker } = pkg;

    at ModuleJob._instantiate (node:internal/modules/esm/module_job:124:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:190:5)

Node.js v18.18.2

```

これも同様で、vite.config.jsに記載すれば回避できるようである

vite.config.js

```plain text
  ssr: {
    noExternal: [
      // MUI needs to be pre-processed by Vite in production: https://github.com/brillout/vite-plugin-ssr/discussions/901
      "@mui/base",
      "@mui/icons-material",
      "@mui/material",
      "@mui/utils",
      "@mui/x-date-pickers" // これを追加
    ],
  }

```

エラー周りは、MUIが原因か、Viteが原因か、自分はInertiaでPHPからReactを使っているのでそこが原因かわかりにくいのがしんどいです。まあコピペは間違っていないのでMUIが直接原因という可能性は低そうですが。

これにより私の睡眠時間が2時間削られた……。