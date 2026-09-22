---
URL: https://chaika.hatenablog.com/entry/2021/07/21/083000
Updated: 2021-11-06T22:50:00
Created: 2021-09-05T19:41:00
Tags: [topic/技術/React, topic/技術/ビルドツール]
---
何回も作るのに都度調べるのめんどくなってきたからメモ

## Next.js のプロジェクトを作る

今いる[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リにプロジェクトを作る

```plain text
$ npx create-next-app --use-npm .

```

- `-use-npm` オプションつけないと `npm` が無いって怒られる。忘れがち…

## TypeScript 化

```plain text
$ npm install --save-dev typescript @types/react @types/node
$ touch tsconfig.json

```

この状態で Next のプロジェクトを dev モードで起動すると自動的に `tsconfig.json` の中身が記述され、`next-env.d.ts` ファイルも作成される

```plain text
$ npm run dev

```

## ESLint の導入

> Since version 11.0.0, Next.js provides an integrated ESLint experience out of the box. Add next lint as a script to package.json cf. Basic Features: ESLint | Next.js

Next.js v11.0.0 からはプロジェクト内に ESLint が入っていて `npx next lint` で動作するらしい。

必要なパッケージのインストール

```plain text
$ npm install --save-dev eslint eslint-config-next

```

### ESLint を実行する npm script を追加

`package.json`

```plain text
{
  "script": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
+   "lint": "next lint",
+   "lint:fix": "next lint --fix"
  },
}

```

Prettier を使うのと、独自のルールを追加したいので ESLint の設定ファイルを作る

```plain text
$ touch .eslintrc.js

```

`.eslintrc.js` (cf. [Basic Features: ESLint | Next.js](https://nextjs.org/docs/basic-features/eslint#disabling-rules))

```plain text
module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    'semi': 'error',
    'import/prefer-default-export': 'off',
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-var': 'error',
  },
};

```

`npm run lint:fix` で ESLint での修正が入れば OK

## Prettier の導入

```plain text
$ npm install --save-dev prettier eslint-config-prettier
$ touch .prettierrc.json

```

Prettier の設定 `.prettierrc.json` (お好みで)

```plain text
{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true, // 末尾セミコロンあり
  "singleQuote": true, // シングルコーテーションを使う
  "jsxSingleQuote": true, // JSX もシングルコーテーションに
  "arrowParens": "always", // Arrow 関数の引数に () を付ける
  "endOfLine": "lf" // 改行コード LF
}

```

### ESLint と Prettier がバッティングしないように連携させる

`.eslintrc.js`

```plain text
module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
+   'prettier',
  ],
  rules: {

```

### Prettier を実行する npm script を追加

`package.json`

```plain text
{
  "script": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
+   "format": "prettier --write --ignore-path .gitignore './**/*.{js,jsx,ts,tsx,json,css,scss}'"
  },
}

```

`npm run format` を実行して Prettier でのフォーマットが実行されれば OK

## [VS Code](http://d.hatena.ne.jp/keyword/VS%20Code) で保存時に ESLint, Prettier を実行してフォーマットする

```plain text
$ mkdir .vscode
$ touch .vscode/settings.json

```

`.vscode/settings.json`

```plain text
{
  "files.exclude": {
    "**/node_modules": true
  },
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[markdown]": {
    "files.trimTrailingWhitespace": false
  }
}

```

適当なファイルを開いて保存時にフォーマットが実行されればOK

### 所管

Next.js という[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)がお膳立てして用意してくれているおかげ素の TypeScript で環境作るよりめちゃめちゃ簡単でした！
 でも毎回やるのめんどいからテンプレート化しておこうかな…というお気持ち

[参考]

![[41QSmQVOu9L._SL500_.jpg]]

正直 Next.js の本は何が良いのか何もわからん…

[TVアニメ『小林さんちのメイドラゴンS』OP主題歌「愛のシュプリーム! 」【アニメ盤】](https://www.amazon.co.jp/exec/obidos/ASIN/B0916TB764/kikiki83-22/)

![[61Y-YAJJmPS._SL500_.jpg]]

メイドラゴン放送されて嬉しい〜 トールかわいい〜

プロトタイプを作っているときなど、ダミー画像で画像生成サービスを使うことがあります。
 Next.js の組み込み[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8) `next/image` でダミー画像生成サービスの url を src に設定したらエラーになったので忘れないようにメモ。

## `next/image` の src に外部[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)を指定するとエラーになる

例えばダミー画像の [Avatar](http://d.hatena.ne.jp/keyword/Avatar) を表示する[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)

```plain text
import { VFC } from "react";
import Image from 'next/image';

type AvatarProps = {
  alt?: string;
  width: number;
  height: number;
}

const dummyImage = 'https://placeimg.com/140/140/any';

export const Avatar: VFC = ({ alt, width, height }) => {
  return (
    <Image src={dummyImage} width={width} height={height} alt={alt} />
  );
};

```

=> Server Error`Error: Invalid src prop (https://placeimg.com/140/140/any) on `next/image`, hostname "placeimg.com" is not configured under images in your `next.config.js```See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`

エラーになります。

## next.config.js に使用する外部[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)を設定しておく必要がある

> To enable Image Optimization for images hosted on an external website, use an absolute url for the Image src and specify which domains are allowed to be optimized. This is needed to ensure that external urls can't be abused. When loader is set to an external image service, this option is ignored. cf. Basic Features: Image Optimization | Next.js

`next/image` が画像最適化を行うために外部[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)の画像を使う場合は[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)を指定しておく必要がある。ﾄﾉｺﾄ

`next.config.js` が無ければ作る。

```plain text
$ touch next.config.js

```

`next.config.js`

```plain text
module.exports = {
  images: {
    domains: ['placeimg.com'],
  },
};

```

今回は `https://placeimg.com/140/140/any` を使いたいので `domains` には `placeimg.com` を指定する

設定ファイルなので反映させるにはサーバーを再起動させる必要がある。`ctl + C` でサーバーを止めて `npm run dev` で再起動。`Avatar` [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の画像が問題なく表示されていれば OK

[参考]

[WEB+DB PRESS Vol.123](https://www.amazon.co.jp/exec/obidos/ASIN/B097D7WMDB/kikiki83-22/)

![[51-RGvu8GUS._SL500_.jpg]]

[かげきしょうじょ！！ シーズンゼロ 上巻 (花とゆめコミックススペシャル)](https://www.amazon.co.jp/exec/obidos/ASIN/B074M4RWGH/kikiki83-22/)

![[51Q6khy7DL._SL500_.jpg]]

今季は かげきしょうじょ 観てます。オススメあったら教えてください！