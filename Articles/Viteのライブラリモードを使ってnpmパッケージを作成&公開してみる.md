---
タグ: []
作成日時: 2024-03-07T16:56:00
URL: https://zenn.dev/s_takashi/articles/20ecebd0a42010#vite.config.js%E3%82%92%E4%BD%9C%E3%82%8B
Tags: [topic/デザインシステム/配信基盤]
---
# はじめに

# Viteのプロジェクトを生成する

# 開発するファイルを作成

src/lib/cclg/index.ts

```plain text


  label
  color
  bgColor
  value?: string | number | object | null | undefined
  cStyle?: string
  type?: 'log' | 'info' | 'warn' | 'error'
}

const getConsole = (type: 'log' | 'info' | 'warn' | 'error' | undefined = 'log') => {
  switch (type) {
    case 'log':
      return console.log
    case 'info':
      return console.info
    case 'warn':
      return console.warn
    case 'error':
      return console.error
    default:
      return console.log
  }
}

/**
 * custom console
 * @param args {@link TCclg}
 * @returns console medhod
 */
export const cclg = ({ label, color, bgColor, cStyle, value, type }: TCclg) => {
  const _color = color ?? '#000000'
  const style = cStyle ?? `color: ${_color}; background: ${bgColor}; padding: 2px 4px;`

  const console = getConsole(type)

  if (value) return console(`%c${label}`, style, `${value}`)
  return console(`%c${label}`, style)
}


```

```plain text
  cclg

 label
 label  color
 label  color  bgColor
 label  color  bgColor  value
 label  cStyle
 label  type
 label  type
cclg({ label: 'type warn', type: 'warn' })
cclg({ label: 'type error', type: 'error' })

```

# vite.config.jsを作る

Viteを[ライブラリモード](https://ja.vitejs.dev/guide/build.html#%E3%83%A9%E3%82%A4%E3%83%95%E3%82%99%E3%83%A9%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%82%99)として使うためにvite.configを設置します。

vite.config.js

```plain text
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/cclg/index.ts'),
      name: 'index',
      fileName: 'index',
    },
  },
})

```

# ビルドしてみる

```plain text
npm run build

```

Viteはデフォルトでは`es`と`umd`フォーマットが生成されるようです。

参考: [\#build-lib](https://ja.vitejs.dev/config/build-options.html#build-lib)

```plain text
dist
 ┣ index.js
 ┗ index.umd.cjs

```

# 型定義（d.ts）ファイルを出力する

Viteでプロジェクトを作成するとtsconfigで`noEmit`が`true`になっていて、型定義ファイルが生成されません。以下のDiscussionでは[vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)というプラグインが紹介されていました。

こちらのプラグインを使ってもいいですが、今回はこれは使わずにやりました。

## tsconfig.jsonを修正

Viteでプロジェクト作成した状態のままだとtsconfigで型定義ファイルを生成しない設定になっているので、生成するように設定を変えます。

```plain text
{
 "compilerOptions": {
    ...
+    "emitDeclarationOnly": true,
+    "declaration": true,
+    "declarationDir": "./types",
-    "noEmit": true,
   ...
  },
  "include": ["src/lib"]
}

```

参考: [TypeScript: Documentation - .jsファイルから.d.tsファイルを生成する](https://www.typescriptlang.org/ja/docs/handbook/declaration-files/dts-from-js.html)

## buildスクリプトを修正

初期設定だと以下のようになっています。

package.json

```plain text
"build": "tsc && vite build",

```

これだと`tsc`コマンドで型定義ファイルを出力した後に`vite build`コマンドでファイルが消されてしまいます。これについては下記のDiscussionで聞いてる人がいました。buildコマンドの`emptyOutDir`フラグを`false`にするといいよとありました。

ただここではコマンドの順番を逆にすれば問題なさそうだったのでそうしました。

先に`vite build`をしてから`tsc`を実行するようにします。

package.json

```plain text
"build": "vite build && tsc",

```

これで`npm run build`すると以下のように`d.ts`ファイルもdistフォルダに残ります。

```plain text
dist
 ┣ index.d.ts
 ┣ index.js
 ┗ index.umd.cjs

```

# package.jsonを修正

公開に必要そうな項目を修正します。

```plain text
{
 ...
+  "main": "./dist/index.umd.cjs",
+  "module": "./dist/index.js",
+  "types": "./dist/index.d.ts",
+  "author": "takashi_shiratori",
+  "license": "MIT",
+  "repository": {
+    "type": "git",
+    "url": "https://github.com/t-shiratori/cclg"
+  },
+  "files": [
+    "dist"
+  ],
+  "exports": {
+    ".": {
+      "require": "./dist/index.umd.cjs",
+      "import": "./dist/index.js"
+    }
+  },
 ...
}

```

### 参考

- [package.jsonにfilesを書かないあなたは、誰かを少しだけ不幸にしています - Qiita](https://qiita.com/masato_makino/items/656f4fbb1595cbcdc23d)
- [package.jsonのexportsフィールドについて](https://zenn.dev/makotot/articles/5edb504ef7d2e6)
- [TypeScript: Documentation - Publishing](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package)

# NPMにパブリッシュ

npmアカウントがない場合は作成します。

[npm | Sign Up](https://npmjs.org/signup)

npmにログイン

```plain text
npm login

```

npmに公開

```plain text
npm publish

```

16

[shiratori](https://zenn.dev/s_takashi)
フロントエンドエンジニア [codepen.io/tksiiii](https://codepen.io/tksiiii)

バッジを贈って著者を応援しようバッジを受け取った著者にはZennから現金やAmazonギフトカードが還元されます。

### Discussion

![](https://static.zenn.studio/images/drawing/discussion.png)

ログインするとコメントできます

目次
1. [はじめに](https://zenn.dev/s_takashi/articles/20ecebd0a42010#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
2. [Viteのプロジェクトを生成する](https://zenn.dev/s_takashi/articles/20ecebd0a42010#vite%E3%81%AE%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E7%94%9F%E6%88%90%E3%81%99%E3%82%8B)
3. [開発するファイルを作成](https://zenn.dev/s_takashi/articles/20ecebd0a42010#%E9%96%8B%E7%99%BA%E3%81%99%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%9C%E6%88%90)
4. [vite.config.jsを作る](https://zenn.dev/s_takashi/articles/20ecebd0a42010#vite.config.js%E3%82%92%E4%BD%9C%E3%82%8B)
5. [ビルドしてみる](https://zenn.dev/s_takashi/articles/20ecebd0a42010#%E3%83%93%E3%83%AB%E3%83%89%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)
6. [型定義（d.ts）ファイルを出力する](https://zenn.dev/s_takashi/articles/20ecebd0a42010#%E5%9E%8B%E5%AE%9A%E7%BE%A9%EF%BC%88d.ts%EF%BC%89%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E5%87%BA%E5%8A%9B%E3%81%99%E3%82%8B)
    1. [tsconfig.jsonを修正](https://zenn.dev/s_takashi/articles/20ecebd0a42010#tsconfig.json%E3%82%92%E4%BF%AE%E6%AD%A3)
    2. [buildスクリプトを修正](https://zenn.dev/s_takashi/articles/20ecebd0a42010#build%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%82%92%E4%BF%AE%E6%AD%A3)
7. [package.jsonを修正](https://zenn.dev/s_takashi/articles/20ecebd0a42010#package.json%E3%82%92%E4%BF%AE%E6%AD%A3)
    1. [参考](https://zenn.dev/s_takashi/articles/20ecebd0a42010#%E5%8F%82%E8%80%83)
8. [NPMにパブリッシュ](https://zenn.dev/s_takashi/articles/20ecebd0a42010#npm%E3%81%AB%E3%83%91%E3%83%96%E3%83%AA%E3%83%83%E3%82%B7%E3%83%A5)