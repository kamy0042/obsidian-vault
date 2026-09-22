---
Created: 2022-07-05T20:09:00
URL: https://zenn.dev/ro_komatsuna/articles/eslint_setup
Updated: 2022-07-25T16:44:00
Tags: [topic/技術/ビルドツール]
---
## 概略

前回[[1]](https://zenn.dev/ro_komatsuna/articles/eslint_setup#fn-f524-1)初期構築した React アプリ（TypeScript）に, Linter を適用します。
 Linter はコードの問題などを解析してくれる静的解析ツールですね。

今回の記事では Linter として ESLint を導入します。（著名なやつですね）

ESLint 導入後は, 次の記事の Formatter 適用（[【React / TypeScript】ESLint と Prettier を設定する（Prettier 編）](https://qiita.com/ro-komatsuna/items/bbfe5304c78ce4a10f1a)） に進んでいく形です。（1 記事でまとまりませんでした）

## Linter（ESLint） の設定

### 現状の確認（React アプリ）

とりあえず, 設定したいプロジェクトのディレクトリへ移動します。

```plain text
% cd my-app

```

今回のように Create React App で作成したアプリだと, すでに ESLint が導入されており, `my-app/package.json` には以下記載があります。`package-lock.json` を確認すると `react-scripts` の依存関係に `eslint` の記載があることがわかります。

```plain text
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}

```

とはいえ, まるっと設定を実施するのでいずれ上記は別の箇所に移動していきます。

### ESLint の初期設定

[公式の Getting Started](https://eslint.org/docs/user-guide/getting-started) を参考に実施していきます。
 簡単に `eslint --init` を使って, 構成ファイル生成とライブラリのインストールをやります。（eslint をグローバルインストールしたくないので, 公式通りに便利な `npx` で実施していきます）

ちなみに, [公式の Getting Started](https://eslint.org/docs/user-guide/getting-started) の先頭の `npm install eslint --save-dev` を飛ばしているのは, `eslint --init` の最後で `npm install` に誘導してくれるからです。

```plain text
% npx eslint --init

```

設定内容を聞かれるので自分のアプリとかにあったものを設定します。以下は, React/TypeScript の場合です。（聞かれる質問と選択肢も記載しているのでご参考程度に）

```plain text
? What type of modules does your project use? …
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
? Which framework does your project use? …
❯ React
  Vue.js
  None of these
? Does your project use TypeScript? No / ❯ Yes
? Where does your code run? …
❯ Browser
  Node
? How would you like to define a style for your project? …
❯ Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)
? Which style guide do you want to follow? …
❯ Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
? What format do you want your config file to be in? …
  JavaScript
  YAML
❯ JSON
Checking peerDependencies of eslint-config-airbnb@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.21.5 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1 eslint-plugin-jsx-a11y@^6.4.1 eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 || ^1.7.0 @typescript-eslint/parser@latest
? Would you like to install them now with npm? No / ❯ Yes

```

以下は質問の内容と, 選択した内容のまとめです。

**What type of modules does your project use**
 JavaScript modules（import/export）を選びました**Which framework does your project use**
 React を選びました（React 以外なら Vue.js やその他の選択肢もあります）**Does your project use TypeScript?**
 TypeScript を使っているので Yes を選びました**Where does your code run?**
 Web アプリなので Browser を選びました**How would you like to define a style for your project**
 静的解析に使われるルールの設定です。存在しているスタイルガイドを使うのが安定っぽいので, Use a popular style guide を選びました**Which style guide do you want to follow?**
 どのスタイルガイドを使うかですが, 使用率が高くかつ, 厳格めのルールを課す Airbnb を選びました**What format do you want your config file to be in?**
 ESLint の設定ファイルの format の指定です。JavaScript か JSON か悩んで JSON にしました**Would you like to install them now with npm?**
 必要なライブラリを `npm install` するかどうか聞かれているので, Yes にしました（本記事最初に `npm install` を飛ばした eslint も合わせて入ります）

最後の `npm install` の質問に Yes と答えた場合, 設定ファイルの生成に加えて `npm install` が走るので待機します。

```plain text
✔ Would you like to install them now with npm?  No / ❯ Yes
Installing eslint-plugin-react@^7.21.5, @typescript-eslint/eslint-plugin@latest, eslint-config-airbnb@latest, eslint@^5.16.0 || ^6.8.0 || ^7.2.0, eslint-plugin-import@^2.22.1, eslint-plugin-jsx-a11y@^6.4.1, eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 || ^1.7.0, @typescript-eslint/parser@latest
+ eslint-plugin-react-hooks@4.2.0
+ eslint-plugin-import@2.22.1
+ eslint-plugin-react@7.22.0
+ eslint-plugin-jsx-a11y@6.4.1
+ eslint-config-airbnb@18.2.1
+ eslint@7.18.0
+ @typescript-eslint/eslint-plugin@4.13.0
+ @typescript-eslint/parser@4.13.0
added 11 packages from 3 contributors, updated 8 packages and audited 1992 packages in 11.088s

122 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Successfully created .eslintrc.json file in /[your-path]/my-app
ESLint was installed locally. We recommend using this local copy instead of your globally-installed copy.

```

さて, これでプロジェクトディレクトリの配下に `.eslintrc.json[or .js, .yml]` ができているはずです。

```plain text
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    }
}

```

また, `npm install` の実行を指示した場合は `package.json` に以下が追加されたはずです。（開発時に必要なのみなので, `devDependencies` に入る感じです）

```plain text
"devDependencies": {
  "@typescript-eslint/eslint-plugin": "^4.13.0",
  "@typescript-eslint/parser": "^4.13.0",
  "eslint": "^7.18.0",
  "eslint-config-airbnb": "^18.2.1",
  "eslint-plugin-import": "^2.22.1",
  "eslint-plugin-jsx-a11y": "^6.4.1",
  "eslint-plugin-react": "^7.22.0",
  "eslint-plugin-react-hooks": "^4.2.0"
}

```

### ESLint を動かす

とりあえず `App.tsx` に対して実行してみます。eslint コマンドに, ファイルを指定して実行します。
 なお, あえて eslint をグローバルインストールしていないので PATH が通っていません。このため, `node_modules`配下から呼び出します。

```plain text
import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      Hello World
    </div>
  );
}

export default App;

```

```plain text
% ./node_modules/.bin/eslint src/App.tsx

/[your-path]/src/App.tsx
  1:8   error  'React' was used before it was defined                                                                 no-use-before-define
  3:29  error  Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`  arrow-body-style
  5:5   error  JSX not allowed in files with extension '.tsx'                                                         react/jsx-filename-extension
  9:2   error  Missing semicolon                                                                                      semi

✖ 4 problems (4 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.

```

いろいろエラーがでました。まだ, TSX の設定や React の設定が入ってないことも含め, 落ちている箇所がいくつかあります。
 各エラーの読み方ですが, `[行数:文字位置] [error/warnなどの状態] [エラー等のメッセージ] [対象のルール名]` となっています。今回みたいに落ちた場合は, ルール名とエラーメッセージを検索すると理由が大体わかります。

### eslintrc へ React と TSX の設定を入れる

先ほどの実行ででたエラーを潰しつつ設定を入れます。また, TSX にすることで発生する他のエラーもあるので合わせて設定方法を記載します。

### 最終的な設定内容

最終的な設定内容（`.eslintrc.json`）をいったん記載します。
 以降に設定の説明を書いているので不要であれば, 最後の方の「npm scripts に ESLint の実行を追加する」まで呼び飛ばしてください。

.eslintrc.json

```plain text
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "react-app",
        "react-app/jest",
        "plugin:react/recommended",
        "airbnb",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "import"
    ],
    "rules": {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
            "error"
        ],
        "react/jsx-filename-extension": [
            "error",
            {
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx"
                ]
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx"
                ]
            }
        }
    }
}

```

前述したように Create React App で作成したときに ESLint の設定が入っているのでそれを `.eslintrc.json` に移動します。

`package.json` から `eslintConfig` の記載箇所を削除します。そして, `eslintConfig` で書かれていた `extends` の設定を, `.eslintrc.json` に移動します。

.eslintrc.json

```plain text
"extends": [
  "react-app",      // eslintConfig から移動
  "react-app/jest", // eslintConfig から移動
  "plugin:react/recommended",
  "airbnb",
]

```

特に `react-app/jest` の輸送を忘れると, `.test.tsx` で `Jest` 使うときに `expect` などの箇所でエラーを出したりします。

### ② jsx-filename-extension

先ほどの実行で `react/jsx-filename-extension` のルールで, `JSX not allowed in files with extension '.tsx'` が出てました。
 メッセージ通りによむと JSX の記法は `.tsx` のファイルでは許されてないよということですが, TypeScript 版なので `.tsx` も許可するように設定します。

[react/jsx-filename-extension](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) より, default 設定が以下のようになっているそうなので,

```plain text
"rules": {
  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
}

```

`.eslintrc.json` の `rules` に以下のように記載して, `.tsx` を仲間に入れます。（`.js` は不要だと思うので外します）

```plain text
"rules": {
  "react/jsx-filename-extension": ["error", { "extensions": [".jsx", ".tsx"] }]
}

```

### ③ no-use-before-define

先ほどの実行で `no-use-before-define` のルールで, `'React' was used before it was defined` が出てました。
 こちらは, 既存ルール `no-use-before-define` を無効にし, [typescript-eslint/no-use-before-define](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md) を使うように `rules` に追加します。

```plain text
"rules": {
  "no-use-before-define": "off",
  "@typescript-eslint/no-use-before-define": ["error"]
}

```

### ④ import/no-unresolved と import/extensions

`Component.tsx` や `Utils.ts` などを `import` しようとすると, `Missing file extension for "./Component"` や `Unable to resolve path to module "./Component"` というエラーが発生します。

デフォルトでは `.tsx` で拡張子の指定が必須になっていたり, 解析対象に入っていなかったりして発生しています。
 対処としては以下になります。

1. plugin や extends に eslint-plugin-import の設定を追加します（[eslint-plugin-import#Installation](https://github.com/benmosher/eslint-plugin-import#Installation) 参照）
2. `.tsx`/`.ts` ファイルを `import` する時に拡張子の指定がいらないように, `import/extensions` のルールに指定します（詳しい動作は[公式](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md)参照）
3. `import/resolver` の設定を追加します（[eslint-plugin-import#Settings](https://github.com/benmosher/eslint-plugin-import#Settings) 参照）

.eslintrc.json

```plain text
"extends": [
  "react-app",
  "react-app/jest",
  "plugin:react/recommended",
  "airbnb",
  "plugin:import/errors",     // 追加
  "plugin:import/warnings",   // 追加
  "plugin:import/typescript"  // 追加
],
"plugins": [
  "react",
  "@typescript-eslint",
  "import"                    // 追加
],
"rules": {
  // ... ...
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never"
    }
  ]
}
"settings": {
  "import/resolver": {
    "node": {
      "extensions": [
        ".js",
        ".jsx",
        ".ts",
        ".tsx"
      ]
    }
  }
}

```

ESLint 設定時に `typescript-eslint` が入ったかと思います。TypeScript ベース向けのプラグインであり, 初期時点では `plugins` に記載がありつつも `extends` に記載がなくルール適用されていないので, 追加しておきます。

[公式](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/README.md) に従いつつ, 型チェック系の `recommended-requiring-type-checking` も入れておきます。（`parserOptions.project` も設定します）

.eslintrc.json

```plain text
"extends": [
  "react-app",
  "react-app/jest",
  "plugin:react/recommended",
  "airbnb",
  "plugin:import/errors",
  "plugin:import/warnings",
  "plugin:import/typescript",
  "plugin:@typescript-eslint/recommended", // 追加
  "plugin:@typescript-eslint/recommended-requiring-type-checking" // 追加
],
"parserOptions": {
  "project": "./tsconfig.json", // 追加
},

```

### ⑥ App.tsx で他に出ていたエラーについて

今回のサンプルでは残り二つでていましたが, `rules` をいじる必要なく直せる基本的なエラーなので本記事ではスキップします。

エラー解消方法がわからない場合, eslint で `--fix` を指定すると, おおよそ解消してくれたりするので, どこがエラーになっているのか判別するときにざっくり実行すると便利です。

### npm scripts に ESLint の実行を追加する

eslint を実行する scripts を `package.json` に追加します。
 以下は `src/` 配下の `.ts, .tsx, .js, .jsx` ファイルに対して実行するように指定しています。

これで以下を実行すれば上記コマンドが実行されます。Lintter がエラーを返せば, `npm ERR!` となります。

## おわりに

Prettier 導入は次の記事（[【React / TypeScript】ESLint と Prettier を設定する（Prettier 編）](https://qiita.com/ro-komatsuna/items/bbfe5304c78ce4a10f1a)]） に書きました。

### Discussion

![[discussion 10.png]]