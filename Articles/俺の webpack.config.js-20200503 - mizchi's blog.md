---
URL: https://mizchi.hatenablog.com/entry/2020/05/03/151022
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
## 基本思想

- とにかく薄く。必要なものだけ。基本は ts-loader を `transpileOnly: true` で使うだけ。最悪これだけでいい。型チェックは[IDE](http://d.hatena.ne.jp/keyword/IDE)か `yarn tsc -p . --noEmit` でやる。
- CRA や parcel は使わない。暗黙な振る舞いが多すぎるので。一切勉強したくない人はいれていいと思うが、その場合 eject しない、dist [ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リをそのまま使うこと前提。
- style-loader/[css](http://d.hatena.ne.jp/keyword/css)loader は外部[CSS](http://d.hatena.ne.jp/keyword/CSS)を読むときに設定する
- worker-plugin はなくてもいいけど、 worker もビルドしたいことが多いので、入れていることが多い
- html-webpack-plugin と webpack-dev-server 組み合わせると、他と組み合わせずに完結して動く。このHTMLを本番で使わずとも、[デバッグ](http://d.hatena.ne.jp/keyword/%A5%C7%A5%D0%A5%C3%A5%B0)で使ってることが多いので常に入れてる
- デフォルトの src/index をentry, dist/main.js を出力するのはそのままで、複数ファイルになったらいじる

### 期待している構造

```plain text
src/index.ts(x)
src/index.html
package.json
tsconfig.json
--- ignore ---
dist/*
node_modules/*
```

### install

```plain text
yarn init -y # package.json がない場合
yarn add webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin worker-plugin style-loader css-loader typescript -D
# or npm install --save-dev ...
```

### webpack.config.js (最小)

```plain text
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"],
  },
};

```

### webpack.config.js (通常)

```plain text
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
    new WorkerPlugin()
  ],
};

```

### tsconfig.[json](http://d.hatena.ne.jp/keyword/json)

`module: commonjs` だと tree shaking (未 import のコードを削る機能)が効かない。tree shaking するために、 `module: esnext` を設定する。
あと個人的には `"moduleResolution": "node"` と `esModuleInterop: true` も必須だと思っている。あとはお好きに。

```plain text
{
  "compilerOptions": {
    "target": "es2019",
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

(大抵はnodeの細かいユーティリティ使うために `yarn add @types/node` もしている)

### package.[json](http://d.hatena.ne.jp/keyword/json) scripts

```plain text
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack-dev-server",
    "typecheck": "tsc -p . --noEmit"
  },
```

CI で typecheck を走らせる。[watch](http://d.hatena.ne.jp/keyword/watch) ビルド時に常に型チェックするのはCPUの無駄。

dev では、html-webpack-plugin が入っているので、index.html も生成され、[localhost](http://d.hatena.ne.jp/keyword/localhost):8080 でプレビューできる

(このとき index.html に entry の script タグが自動挿入されるので、書かなくて良い)

## netlify にデプロイ

yarn build (npm run build) して、生成された `dist` をどこかの[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)サイトにアップロードしたら終わり。

```plain text
yarn build # 生成

npm i -g netlify-cli
netlify deploy -d dist --prod
```

> webpack のベストプラクティス、 ts-loader を transpileOnly: true で使う、ぐらいに落ち着くので、わかってる人ほど何も書くことがないのだと思う https://t.co/DqIKQJZLUS— 滞納太郎 (@mizchi) 2020年5月3日

> 大抵の人はこれを使うとかでもいいじゃないかな。 "namics/webpack-config-plugins: Provide best practices for webpack loader configurations" https://t.co/KEyUoSZtwK— azu (@azu_re) 2020年5月3日