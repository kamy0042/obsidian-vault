---
Created: 2021-01-15T18:01:00
URL: https://qiita.com/sprout2000/items/ee4fc97f83f45ba1d227
Updated: 2021-01-15T18:01:00
Tags: [topic/技術/ビルドツール]
---
# はじめに

- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)が『[一般的には非推奨](https://prettier.io/docs/en/integrating-with-linters.html#notes)（Prettier公式）』となったのを受けて、リンター＆フォーマッター環境を見直す自分用メモ

### 目標

- [React](https://reactjs.org/) + [TypeScirpt](https://www.typescriptlang.org/) のリント
- [VSCode](https://code.visualstudio.com/)保存時にエラーの解消＆コード整形

### 前提

- [Node.js](https://nodejs.org/en/)と[Yarn](https://yarnpkg.com/)はインストール済みとします（Yarnを使います）

# ESLint, Prettier, TypeScript, React のインストール

### プロジェクト・フォルダの作成

bash

Copied!

`$ mkdir qiita && cd $_
$ yarn init -y
yarn init v1.22.10
warning The yes flag has been set. This will automatically answer yes to all questions, which may have security implications.
success Saved package.json
✨  Done in 0.04s.`

### ESLint と Prettier

bash

Copied!

`$ yarn add -D eslint prettier eslint-config-prettier`

### TypeScript 関連

bash

Copied!

`$ yarn add -D typescript @typescript-eslint/{parser,eslint-plugin}`

### React 関連

bash

Copied!

`$ yarn add react react-dom
$ yarn add -D @types/{react,react-dom}
$ yarn add -D eslint-plugin-{react,react-hooks}`

# tsconfig.json

tsconfig.json

Copied!

`{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "lib": ["DOM", "ES2015"],
    "jsx": "react",
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "*": ["@types/*"]
    }
  }
}`

# .eslintrc.json

.eslintrc.json

Copied!

`{
  // 適用する環境
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "commonjs": true
  },
  // パーサー
  "parser": "@typescript-eslint/parser",
  // jsx を使います
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  // React のバージョンは自動検出に
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "plugins": ["react-hooks", "react", "@typescript-eslint"],
  // 基本的にルールは recommended に従う
  // prettier 関連は配列の最後尾に書く
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  "rules": {
    // TypeScirpt なので prop-types は要らない
    "react/prop-types": "off"
  },
  // .js ファイルをオーバーライド （webpack.conig.jsなど）
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ]
}`

**注意点**: `extends` では prettier 関連を配列の**最後部**に記述すること！

# .prettierrc.json

prettierのオプションは[こちら](https://prettier.io/docs/en/options.html)（少ない！）。

.prettierrc.json

Copied!

`{
  "singleQuote": true,
  "jsxBracketSameLine": true
}`

# VSCodeの設定

### ESLint, Prettier 拡張をインストール

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### .vscode/settings.json

settings.json

Copied!

`{
  "editor.formatOnSave": true,    // <-- prettierで整形
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true  // <-- eslintでリント
  },
  // デフォルトフォーマッタをprettierに
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`

`editor.defaultFormatter` がキモ？`editor.formatOnSave` でPrettierの整形が効かない時は大抵これを忘れてます。

# 謝々

- [eslint-plugin-prettier って generally not recommended だったのか](https://qiita.com/iwaiktos/items/42fab6ad04cb297b8bbd)
- [React × Typescript × ESLint × Prettier × VSCodeなSetup](https://qiita.com/sho-t/items/c9fe6d382636bd3402f8)
- [formatOnSave がある日突然動かなくなった。Prettier VSCode](https://qiita.com/take_o/items/16beaec4619301ca8257)