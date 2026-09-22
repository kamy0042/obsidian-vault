---
タグ: []
作成日時: 2023-09-21T16:00:00
URL: https://zenn.dev/mybest_dev/articles/68e4cfadca4746
Tags: [topic/デザインシステム/デザイントークン]
---
![[og-base-w1200-v2 5.png]]

# はじめに

弊社マイベストでは、現在**デザインシステムを構築中**です。

（近日中にデザイナー陣から面白いアウトプットが有りそうなので、後日追記するかもしれません。）

デザインにはFigmaを使っており、デザイントークンを**Tokens Studio**で管理しています。

- デザイントークンとは何か、ChatGPTに聞いてみました。 
> 
> 「デザイントークン」とは、デザインに関連する情報を格納する変数のことです。例えば、色やフォントのサイズなどがあります。これらを使うことで、デザインを一貫性を持って管理することができます。デザインシステムを使うことで、将来の修正や更新もスムーズに行えます。
- Tokens Studio(少し前まで Figma Tokens という名前でした）については以下に詳しいです。

# [Figma Tokens で小さくはじめるデザインシステム](https://zenn.dev/mi_/articles/453f7594120c9a)

[miさんによる記事zenn.dev](https://zenn.dev/mi_/articles/453f7594120c9a)

そして、デザイントークンをそのまま実装でも使えるように変換して運用しています。

つまり**Figma上で使うトークンと実装で使える変数が一致しているため、デザイナーとエンジニアのコミュニケーションがとてもスムーズ**にできます。

トークンの変換には、AmazonがOSSとして公開している**Style Dictionaryを使っていて、とても便利だったので、今回はその使い方をご紹介します。**

# Style Dictionaryとは

JSON形式のデザイントークンを、実装コードとして使える形に変換するものです。

例えば、CSS VariablesやJSのObject形式に変換できます。

# [Style Dictionary - Style once, use everywhere. A build system for creating cross-platform styles.](https://amzn.github.io/style-dictionary/#/)

[Style once, use everywhere. A build system for creating cross-platform styles.amzn.github.io](https://amzn.github.io/style-dictionary/#/)

## ベーシックな使い方

ベーシックに使うには、config.jsonを用意します。

一例としては、以下のようにすると、scss形式で、variablesのファイルが生成されます。

```plain text
// config.json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }],
    }
  }
}

```

※別のパターンを設定するには、以下のドキュメントを参考に調整してください。

# [Style Dictionary - Style once, use everywhere. A build system for creating cross-platform styles.](https://amzn.github.io/style-dictionary/#/config)

[Style once, use everywhere. A build system for creating cross-platform styles.amzn.github.io](https://amzn.github.io/style-dictionary/#/config)

そしてコマンドを用意して、`npm run build`または`yarn build`すればtokenが生成されます。

```plain text
// package.json
"scripts": {
  "build": "style-dictionary build"
}

```

単純な使い方をするにはこれだけで簡単ですが、

組織の運用に合わせてカスタマイズした方が都合が良いと思うので、

ここからカスタマイズ方法をご紹介していきます。

## カスタマイズ方法

主なカスタマイズ方法としては、config.jsを用意する、というものが有ります。

configファイルの種類としてjsも使えるので、config.jsonではなく、config.jsを用意することで自由な処理を追加できます。

具体的なカスタマイズ手段はいくつかのregister関数を公式が用意してくれています。

> 
> registerTransform
> 
> registerTransformGroup
> 
> registerFilter
> 
> registerFormat
> 
> registerTemplate (deprecated)
> 
> registerAction
> 
> registerParser

# [Style Dictionary - Style once, use everywhere. A build system for creating cross-platform styles.](https://amzn.github.io/style-dictionary/#/extending?id=extension-functions-in-the-api)

[Style once, use everywhere. A build system for creating cross-platform styles.amzn.github.io](https://amzn.github.io/style-dictionary/#/extending?id=extension-functions-in-the-api)

今回は、その中から弊社で実際に使っている3つを紹介します。

### ①registerTransform

トークンの中身をcamelCaseにしたりremにしたりpxにしたりといった変換ができます。

# [Style Dictionary - Style once, use everywhere. A build system for creating cross-platform styles.](https://amzn.github.io/style-dictionary/#/api?id=registertransform)

[Style once, use everywhere. A build system for creating cross-platform styles.amzn.github.io](https://amzn.github.io/style-dictionary/#/api?id=registertransform)

弊社では、一部トークンの値をstringに変換したり、"px"という文字を消して数値だけ残したりしています。

```plain text
// config.js
StyleDictionary.registerTransform({
  name: "number-to-string",
  type: "value",
  matcher: (token) => token.type === "fontWeight",
  transformer: (token) => token.value.toString(),
});

module.exports = {
  platforms: {
    js: {
      transforms: ["number-to-string"],
      ...
    }
  }
}

```

### ②registerFormat

アウトプットするファイルの形式を変更できます。

# [Style Dictionary - Style once, use everywhere. A build system for creating cross-platform styles.](https://amzn.github.io/style-dictionary/#/api?id=registerformat)

[Style once, use everywhere. A build system for creating cross-platform styles.amzn.github.io](https://amzn.github.io/style-dictionary/#/api?id=registerformat)

弊社では「余計な値を除いた上で、TSファイルとして扱う」ために、以下のようにしています。

```plain text
// config.js
StyleDictionary.registerFormat({
  name: "tsFormat",
  formatter: function ({ dictionary, file }) {
    const tokens = minifyDictionary(dictionary.tokens)
    return (
      fileHeader({ file }) +
      "export const theme = " +
      JSON.stringify(tokens, null, 2) +
      " as const;"
    );
  },
});

module.exports = {
  platforms: {
    js: {
      files: [
        {
          format: "tsFormat",
          destination: "theme.ts",
        },
      ]
      ...
    }
  }
}

```

※公式の以下のコードを参考にしています

以下の記事では、コメントをJSDoc形式に変換する方法も紹介されていました。

### ③registerFilter

アウトプットするtokenをfilteringできます。

弊社ではデザイン時にFigma上で使えるカラーパレットをprimitiveColorとして用意していますが、実装時にはセマンティックな名前をつけているため、filterによって除外しています。

```plain text
// config.js
StyleDictionary.registerFilter({
  name: "only-semantics",
  matcher: (token) => !["primitiveColor", "tokenSetOrder"].includes(token.path[0])
});

module.exports = {
  platforms: {
    js: {
      files: [
        {
          format: "tsFormat",
          destination: "theme.ts",
        },
      ]
      ...
    }
  }
}

```

## さらに応用的に使いたい時は

configファイルだけでは足りない場合、build.js(ファイル名は何でも良いです)を用意して実行できます。

以下のように書くと、好きな処理を入れつつ、`buildAllPlatforms`でbuild処理を実行できます。

```plain text
// build.js
const StyleDictionary = require('style-dictionary');
// config.jsonを使いたい時は以下のようにする
// const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.json');


// 何らかの処理

StyleDictionary.buildAllPlatforms();

```

コマンド実行

```plain text
node build.js

```

公式ドキュメントによると、例えば異なるconfigファイルで複数回style-dictionaryを実行したい時などに使えるようです。

# まとめ

FigmaのデザイントークンをStyle Dictionaryを使ってカスタマイズしたアウトプットにする方法を書きました。

かなり柔軟にカスタマイズできるので、デザインシステムの運用に合わせて出力できると実装時のコミュニケーションがかなり楽になります。

デザインシステム構築の際にはぜひ使ってみてください！

また、今後もデザインシステムやその実装、あるいはNext.jsやGraphQLについて発信していきますので、よければTwitterなども見てみてください。

マイベスト テックブログ により固定採用情報はこちら > [https://my-best.com/engineer-recruitment](https://my-best.com/engineer-recruitment)

ツイート