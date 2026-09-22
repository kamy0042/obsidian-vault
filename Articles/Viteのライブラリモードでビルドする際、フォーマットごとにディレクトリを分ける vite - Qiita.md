---
タグ: []
作成日時: 2024-03-07T16:55:00
URL: https://qiita.com/xrxoxcxox/items/dc91226ad49a761dcac3
Tags: [topic/デザインシステム/配信基盤]
---
Viteには[ライブラリモード](https://vitejs.dev/guide/build.html#library-mode)があります。

ライブラリを配布するためのバンドル設定はに記載をします。

その際、フォーマットにあわせてビルドアセットのディレクトリを分けるのに手こずったので記事にしました。

## 環境

Viteのバージョンは4.2.1です。

## やりたかったこと

以下のような構成で配布をしようとしていました。

ES ModulesとCommonJSの両方で配布する、いわゆるdual packageのUIライブラリです。

ビルド前

```plain text
src
├── components
│   ├── Foo
│   ├── Bar
│   └── Baz
└── index.js

```

ビルド後

```plain text
dist
├── cjs
│   ├── index.js
│   └── components
│       ├── Foo
│       │   └── Foo.js
│       ├── Bar
│       │   └── Bar.js
│       └── Baz
│           └── Baz.js
└── es
    ├── index.mjs
    └── components
        ├── Foo
        │   └── Foo.mjs
        ├── Bar
        │   └── Bar.mjs
        └── Baz
            └── Baz.mjs

```

## 完成形

若干省略していますが、最終的なconfigは以下のようになりました。

vite.config.js

```plain text
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es', 'cjs'],
      fileName: '[format]/[name]',
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        exports: 'named',
      },
    },
  },
})

```

## ステップバイステップ

ライブラリモードを使うにあたって、1番簡単な（？）指定は次のようなイメージです。

vite.config.js

```plain text
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es', 'cjs'],
    },
  },
})

```

この状態だと、への出力は次のようになります。

```plain text
dist
├── package-name.js
└── package-name.mjs

```

1つのファイルにまとまっているので、コンポーネントごとにファイルを分けたいです。

そのためを指定します。

vite.config.js

```plain text
  import { resolve } from 'path'
  import { defineConfig } from 'vite'

  export default defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        formats: ['es', 'cjs'],
      },
+     rollupOptions: {
+       output: {
+         preserveModules: true,
+         exports: 'named',
+       },
+     },
    },
  })

```

への出力は次のようになります。

```plain text
dist
├── package-name.js
├── package-name.mjs
├── package-name2.js
├── package-name2.mjs
├── package-name3.js
├── package-name3.mjs
├── package-name4.js
└── package-name4.mjs

```

ファイル名がただの連番になってしまっているので、ちゃんとコンポーネント名をつけたくなります。

の欄を指定するとファイル名を変えられます。

ただし、単なる文字列を指定しても、結局その文字列+連番で出力されるだけです。

ここで次のような書式で指定すると、目当ての結果が得られます。

vite.config.js

```plain text
  import { resolve } from 'path'
  import { defineConfig } from 'vite'

  export default defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        formats: ['es', 'cjs'],
+       fileName: '[format]/[name]',
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          exports: 'named',
        },
      },
    },
  })

```

```plain text
dist
├── cjs
│   ├── index.js
│   └── components
│       ├── Foo
│       │   └── Foo.js
│       ├── Bar
│       │   └── Bar.js
│       └── Baz
│           └── Baz.js
└── es
    ├── index.mjs
    └── components
        ├── Foo
        │   └── Foo.mjs
        ├── Bar
        │   └── Bar.mjs
        └── Baz
            └── Baz.mjs

```

指定できる書式は以下の通りです。

- 
    - 以下の4つから選べます
- 
    - ハッシュ値が付与されます
- 
    - ディレクトリ名、ファイル名などがすべて付与されます

これは、Viteの機能というより、Viteが内部で使っているRollupの機能です。

そのためViteのドキュメントには（恐らく）記載がなく、[Rollupのドキュメント](https://rollupjs.org/configuration-options/#output-entryfilenames)を見ないと分からないと思います。

ちなみにrollupOption内に記載をしても似たような動きをしますが、うまく実現できませんでした。

vite.config.js

```plain text
  import { resolve } from 'path'
  import { defineConfig } from 'vite'

  export default defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        formats: ['es', 'cjs'],
-       fileName: '[format]/[name]',
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          exports: 'named',
+         entryFileNames: '[format]/[name]',
        },
      },
    },
  })

```

次のように、軒並み拡張子が消えてしまいました。

```plain text
dist
├── cjs
│   ├── index # 拡張子無し
│   └── components
│       ├── Foo
│       │   └── Foo # 拡張子無し
│       ├── Bar
│       │   └── Bar # 拡張子無し
│       └── Baz
│           └── Baz # 拡張子無し
└── es
    ├── index # 拡張子無し
    └── components
        ├── Foo
        │   └── Foo # 拡張子無し
        ├── Bar
        │   └── Bar # 拡張子無し
        └── Baz
            └── Baz # 拡張子無し

```

の中でformatにあわせて拡張子を変えるのが自分では実現できなかったのもあり、ではなくの中でを指定するに至りました。

## 最後に

過去に書いた記事とかなり近しい内容ですが、今回は今回で悩むポイントが変わりました。

Viteとしての動き、Rollupをラップしているだけの動き、どちらもあるので難しかったです。

探しても意外と出てこない情報だったので記事にしました。

ニッチな自覚はありますが、誰かの役に立場幸いです。

最後まで読んでくださってありがとうございます！

[Twitter](https://twitter.com/xrxoxcxox)でも情報を発信しているので、良かったらフォローお願いします！

[Devトーク](https://jobs.qiita.com/employers/qiita-inc/dev_talks/489)でお話してくださる方も募集中です！

![]('https://cdn.qiita.com/assets/public/image-qiitan_for_login_modal-014e085d3e40a240e3fe8d61b70b29a9.png')

Register as a new user and use Qiita more conveniently

1. You get articles that match your needs
2. You can efficiently read back useful information
3. You can use dark theme

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fxrxoxcxox%2Fitems%2Fdc91226ad49a761dcac3&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fxrxoxcxox%2Fitems%2Fdc91226ad49a761dcac3&realm=qiita)