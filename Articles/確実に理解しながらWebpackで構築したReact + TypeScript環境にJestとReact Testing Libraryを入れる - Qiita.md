---
URL: https://qiita.com/Mr_ozin/items/ff9034e35f67580a7226
Created: 2021-01-27T23:12:00
Tags: [topic/技術/テスト]
---
![[Attachments/無題のフォルダ/https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94 3.png]]

サンプルコードは下記です。サンプルで必要な箇所以外は極力シンプルにしています。

[https://github.com/ryokryok/react-ts-jest-rtl](https://github.com/ryokryok/react-ts-jest-rtl)

- React + TypeScript(with Webpack)
- Jest(ts-jest)
- React Test Library
- 最低限の `yarn` または `npm` コマンドの使い方がわかること。
- JavaScript には `Node.js` 環境で実行されるものと ブラウザで実行されるものがあるのを知っていること。
- この記事では基本的な環境構築と簡素なテストのみ実行記載するが、詳細は各自公式ドキュメントを読むこと。

前提として、下記のような Webpack 環境で React + TypeScript がビルド&開発用サーバーが立ち上がることを前提とする。

詳細なファイルの内容は下記のリポジトリのコミットを参照。

[https://github.com/ryokryok/react-ts-jest-rtl/tree/4620f7be17e8a2cbcbe2af179af751ce9dbaf120](https://github.com/ryokryok/react-ts-jest-rtl/tree/4620f7be17e8a2cbcbe2af179af751ce9dbaf120)

手元に Clone する場合は下記のように checkout すれば各ファイルの詳細が見られます。

ファイル構成

```plain text
.
├── .git
├── .gitignore
├── node_modules
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.tsx
│   └── index.tsx
├── tsconfig.json
├── webpack.config.js
└── yarn.lock

```

package.json

```plain text
// package.json{
  "name": "react-typescript-jest",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.3.0",
    "ts-loader": "^8.0.2",
    "typescript": "^3.9.7",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  },
  "dependencies": {
    "@types/react": "^16.9.46",
    "@types/react-dom": "^16.9.8",
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "scripts": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server",
    "typecheck": "tsc -p . --noEmit"
  }}
```

webpack.config.js

```plain text
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};

```

### 最低限のテスト実行環境を作成する

まず Jest のみの導入して、最低限のテスト環境を構築する。
 今回は TypeScript をコンパイルする必要があるため、 `ts-jest` `@types/jest` も導入する。

生成された Jest の設定ファイル `jest.config.js` にて `testEnvironment: "jsdom"` に書き換える。
 今回のテスト対象はブラウザ実行される JavaScript なので、`jsdom` を指定する。

[https://jestjs.io/docs/en/configuration#testenvironment-string](https://jestjs.io/docs/en/configuration#testenvironment-string)

jest.config.js

```plain text
// jest.config.js
module.exports = {
  preset: "ts-jest",
-  testEnvironment: "node",
+  testEnvironment: "jsdom",
};

```

`package.json` にテスト実行用 Scripts を追加する。

最低限のテスト実行環境が構築できたのでシンプルなコードとテストコードを書く。
 デフォルトでは正規表現 `**/__tests__/**/*.[jt]s?(x)` または `**/?(*.)+(spec|test).[tj]s?(x)` に合致するファイルに対してテストが実行されるため、それに合わせた命名規則でテストコードを作成する。
 Matcher を指定して、想定通りの値が出ているか確認する。[https://jestjs.io/docs/ja/using-matchers](https://jestjs.io/docs/ja/using-matchers)

src/lib/sample.ts

```plain text
// src/lib/sample.ts
export function sum(a: number, b: number): number {
  return a + b;
}

export function fibonacci(n: number): number {
  return n == 0 || n == 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

```

src/lib/sample.test.ts

```plain text
// src/lib/sample.test.ts
import { sum, fibonacci } from "./sample";

describe("index.ts test", () => {
  test("sum test", () => {
    expect(sum(1, 3)).toBe(4);
    expect(sum(2, 5)).not.toBe(4);
  });

  test("fibonacci", () => {
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(10)).toBe(55);
    expect(fibonacci(20)).toBe(6765);
  });
});

```

`yarn test` でテストを実行する。
 すると Jest が正規表現に合致するファイル自動的にテストが実行されます。

```plain text
$ yarn test
yarn run v1.22.4
$ jest
 PASS  src/lib/sample.test.ts
  index.ts test
    ✓ sum test (1 ms)
    ✓ fibonacci (2 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.761 s
Ran all test suites.
✨  Done in 3.96s.

```

`src/lib/sample.test.ts` に対して Matcher を書き換えたり、テストが成功しない値に設定したり、`import` のパスを間違えると、エラー発生箇所を自動的に指摘される。

また `yarn test --watch` では Watch モードになり、コードを更新すると自動的にテストが再実行される。( `webpack-dev-server` のように自動更新される。)

### テストファイルの置き場所を変更する

テストファイルと実行用ファイルが同一階層上に存在するのは見辛いので、テスト用ディレクトリを作成してそこにテストファイルを置く。
 今回はルート直下に `test` ディレクトリを配置する。

`jest.config.js` にはテストファイルを探索するディレクトリを変更するように設定を追加する。

[https://jestjs.io/docs/ja/configuration#roots-arraystring](https://jestjs.io/docs/ja/configuration#roots-arraystring)

配置を変更した `test/sample.test.ts` import のパスを書き換える。
 ちなみに書き換え前に `yarn test` を実行すると `Cannot find module './sample' or its corresponding type declarations.` と表示される。

### React を テストするためのライブラリを導入する

React コンポーネントをテストするライブラリは複数あるが、公式が推奨している `React Testing Library(RTL)` を導入する。

`@testing-library/react` ではコンポーネントのレンダリングや出力のために導入する。

`@testing-library/jest-dom` では `toBeInTheDocument()` のような Jest の Matcher を拡張する。これによって、「Document 上に条件に合致するコンポーネントはレンダリングされているか」などの確認ができる。

RTL の詳細な使い方は下記がわかりやすい。

[https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f](https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f)

今回は簡単なコンポーネントを例にテストを実行する。

src/App.tsx

```plain text
// src/App.tsx
import React, { useState } from "react";

function useAuth() {
  const [auth, setAuth] = useState(false);
  function handleClick() {
    setAuth(!auth);
  }
  return { auth, handleClick };
}

export default function App() {
  const { auth, handleClick } = useAuth();
  return (
    <div>
      {auth ? (
        <>
          <h1>Welcome</h1>
          <button name="signOut" onClick={handleClick}>
            Sign out
          </button>
        </>
      ) : (
        <>
          <h1>Please sign in</h1>
          <button name="signIn" onClick={handleClick}>
            Sign in
          </button>
        </>
      )}
    </div>
  );
}

```

これからはテストに変更を繰り返すので`yarn test --watch` を実行していく。

まずは、RTL ではどのようにコンポーネント評価されるのか確認するためにまずは `<App />` をレンダリングする前にどのような状態になっているか確認するため、 `screen.debug()` メソッドを実行する。

test/App.test.tsx

```plain text
// test/App.test.tsx
import App from "../src/App";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";

describe("App components", () => {
  test("render App components", () => {
    screen.debug();
  });
});

```

するとコンソール上に下記のように表示される。

ここで `render(<App />)` を実行する。

test/App.test.tsx

```plain text
import App from "../src/App";
import "@testing-library/jest-dom";
- import { screen } from "@testing-library/react";
+ import { screen, render } from "@testing-library/react";
import React from "react";

describe("App components", () => {
  test("render App components", () => {
+    render(<App />);
    screen.debug();
  });
});

```

するとコンソール上に `<App />` が `document.body` 内にレンダリングされる。`div` タグが 1 個多いのは、デフォルトの状態では `render` メソッドで `document.body` に `div` を Append しているため。

[https://testing-library.com/docs/react-testing-library/api#container](https://testing-library.com/docs/react-testing-library/api#container)

```plain text
    <body>
      <div>
        <div>
          <h1>
            Please sign in
          </h1>
          <button
            name="signIn"
          >
            Sign in
          </button>
        </div>
      </div>
    </body>

```

RTL を使用したテストでは基本的に DOM の構造に着目して評価を行っている。

### 実際にテストを書く

`src/App.tsx` でテストしたいことは下記。

- 初期状態では `Please sign in` が表示されている
- Sign In ボタンを押すと `auth` が変更され、`Welcome` が表示される
- Sign Out ボタンを押すと `auth` が変更され、再び `Please sign in` が表示される

結果として下記のようなテストを書いた。

test/App.test.tsx

```plain text
// test/App.test.tsx
import App from "../src/App";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";

describe("App components", () => {
  test("render App components", () => {
    const { getByText } = render(<App />);
    //screen.debug();
    expect(getByText(/Please sign in/)).toBeInTheDocument();
    expect(getByText(/Sign in/)).toBeInTheDocument();
    fireEvent.click(getByText(/Sign in/));

    //screen.debug();
    expect(getByText(/Welcome/)).toBeInTheDocument();
    expect(getByText(/Sign out/)).toBeInTheDocument();
    fireEvent.click(getByText(/Sign out/));

    //screen.debug();
    expect(getByText(/Please sign in/)).toBeInTheDocument();
  });
});

```

`screen.debug()` では実際の DOM の状態をコンソールに出力するので、入力やクリックなどのアクション後に期待通り DOM 構造が変化しているか確かめることができる。
 ただし、実際にテストを実行する際は不要なので、終わったらコメントアウトか消すことを推奨する。

`render` メソッドではレンダリング結果として様々なプロパティを取得できるが、今回はレンダリングした DOM のテキストを検索するためのプロパティを取得する。

[https://testing-library.com/docs/react-testing-library/api#render-result](https://testing-library.com/docs/react-testing-library/api#render-result)

`getByText()` メソッドの引数に文字列のマッチ条件を与えると合致したテキストを含んだ DOM を返す。

今回の場合、`<App />` コンポーネントの中に存在する DOM を返す。

`toBeInTheDocument()` にて「Document に該当する DOM が存在するか」をテストできる。

ユーザーが DOM 対してクリックや入力などのアクションを行ったときは `fireEvent` を使用する。今回は Sign in ボタンのクリックなので下記のようになる。

### テストライブラリの組み合わせ

調べてみると、テストライブラリには複数のパターンがあり、目的が違えど下記のように存在する。

- テストランナーとして Jest, Mocha, Karma ...
- TypeScript のコンパイルを ts-jest または babel で行うか
- React コンポーネントのテストライブラリ Enzyme または React Testing Library または Test Renderer を使用するか

目的やプロジェクトに合わせて使用を選定する必要があるが、今回は React の開発元である facebook が公式ドキュメントで触れている `Jest` `React Testing Library` を使用した。コンパイル時に型チェックを行うために`ts-jest` を選定した。

個人でゼロからコードを書く場合、 `console.log` デバッグや REPL で書いてうまく行った結果を書くことで済んでしまうが、実際にテストコードを書いてみて、プロジェクトが膨らんだときやリファクタリングするときは個人で開発していても有効だと感じた。

Why not register and get more from Qiita?

1. We will deliver articles that match you
2. you can read useful information later efficiently

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2FMr_ozin%2Fitems%2Fff9034e35f67580a7226&realm=qiita)[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2FMr_ozin%2Fitems%2Fff9034e35f67580a7226&realm=qiita)