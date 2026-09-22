---
Updated: 2024-12-20T18:52:00
Created: 2024-02-27T19:40:00
Tags: [topic/技術/React, topic/技術/ビルドツール]
---
最近最小限のReactアプリを作るのに使ってるもの についてとりあえずメモしとく。

## 前提: デカいフレームワークは使わない

next.js, Astro, Remixは使わない。next.jsとAstroは大好きなのだが、社内向けとか個人用とか小さいアプリに使うにはあきらかに恐竜であると思う。Remixは大好きではない。

## 前提: SSRしない

SSRもSSGもISGもしない。CSRでいい。SSRしたいならReactをそもそもぶん投げたほうが(個人レベルなら)いいと思ってる。それがほしいならPHPやRails でええ。今更RailsでView書きたくないとか思うかもしれないけどどうせTailwind使うんだからそんな負担にならない(ただし個人レベルではRailsではなくSinatra+Tailwind/sakura.css使ってる)。

- esbuild
- [esbuild-server](https://github.com/oblador/esbuild-server)

esbuild を直で使う。ホットリロードを実現するには esbuild-server という超便利パッケージがあるのでこれを使う。

実際の設定は以下のような感じになる

build.ts

```plain text
import { createServer } from "esbuild-server";
import esbuild from "esbuild";

const mode = process.argv[2] === "--watch" ? "watch" : "build";

const esbuildOptions = {
  entryPoints: ["src/index.tsx"],
  bundle: true,
  sourcemap: true,
  loader: { ".svg": "text" },
  outdir: "public",
  logLevel: "info",
};

if (mode === "build") {
  esbuild
    .build({
      ...esbuildOptions,
    })
    .catch(() =&gt; process.exit(1));
}

if (mode === "watch") {
  const port = parseInt(process.env.PORT || "8080");
  console.log(`Development server started at http://localhost:${port}`);
  createServer(
    { ...esbuildOptions },
    { static: "public", historyApiFallback: true, port },
  ).start();
}

```

package.json には以下のように書いておく

```plain text
{
  "scripts": {
    "dev": "tsx esbuild.ts --watch",
    "build": "tsx esbuild.ts"
  }
}

```

こんな感じなので[tsx](https://www.npmjs.com/package/tsx)も必要。あとはreactとかreact-domとかも適宜入れる。Tailwindが必要なら[twind](https://twind.dev/)あたりが楽。自分用とか社内ツールなら[MVP.css](https://andybrewer.github.io/mvp/)あたりで楽するのもよい。

ルーティングは[wouter](https://github.com/molefrog/wouter)を使おう。大抵の用途でこれで困らないはず。

### おわりに

たぶんこれがベストとかじゃないとは思うんだけど、Reactアプリをフレームワークなしでとりあえず実用レベルで提供できる方法みたいのは手元に持っておくとわりといいことがあると思います。