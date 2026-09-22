---
タグ: []
作成日時: 2022-06-25T11:48:00
URL: https://blog.microcms.io/styledictionary-storybook/
Tags: [topic/デザインシステム/デザイントークン]
---
![[mi20(12).png]]

### 目次

今年の3月3日に[UIリニューアルのお知らせ](https://blog.microcms.io/ui-renewal-2021-after)がありました。私はエンジニアとして、開発面をサポートするツールの導入やフロントエンドの実装を担当しました。

UIリニューアルに至った理由として、**デザイナー組織が誕生**したことが上げられます。今までは専業のデザイナーがおらず、デザインカンプもない状態でした。そして、組織の体制が変わるにあたって、エンジニアとデザイナー間での開発フローを最優先で整える必要がありました。

そこで、デザイン・開発フローの一例として、**Style DictionaryとStorybook**を導入してデザイントークンを連携したmicroCMSの事例を紹介致します。

# 概要

UIリニューアルをするにあたって、FigmaにmicroCMS Design Systemとしてデザインを作成して頂きました。(サムネイルがすごいいい感じだったのでシェアします)

Figma上では、管理画面の各ページ毎のデザインや、**カラーやシャドウ、スペース**などのデザイントークンが定義されています。デザイントークンは、**Figma Tokens**というプラグインを導入しています。これはデザインリソースを一元管理でき、JSONとしても出力できます。

フロントエンド開発において、**デザイントークンは開発コスト**に大きく関わってきます。デザイントークンがあることで、エンジニアとデザイナーの共通ルールとして、一貫性のあるデザイン・プロダクトを作ることができます。

Figma内のデザイントークンとプロダクト内のコードにできるだけ差分が生まれないようにデザイナー主導でトークンを管理する必要がありました。そこで、出来るだけ変更コストを下げるために、Style DictionaryとStorybookを導入しました。以下連携フローの説明です。

# Style Dictionaryの導入

Style Dictionaryでは、JSONやJSファイルで構成されたデザイントークンをCSSカスタムプロパティ (変数) として出力してくれるツールです。OSSで公開されています。[https://github.com/amzn/style-dictionary](https://github.com/amzn/style-dictionary)

Style Dictionaryを導入するために設定ファイルが必要になります。下記は実際にmicroCMSで使用している設定ファイルです。`style-dictionary/tokens.json`の設定ファイルを元にファイルを生成します。ビルドパスである`./src/styles`に`variables.css`として生成します。

```plain text
{
  "source": ["./style-dictionary/tokens.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "./src/styles/",
      "files": [
        {
          "format": "css/variables",
          "destination": "variables.css"
        }
      ]
    }
  }
}
```

Figma Tokensでデザイントークンが定義されたJSONデータを取得することができます。これは`tokens.json`ファイルの内容になります。

この定義ファイルを元にStyle Dictionaryのビルドコマンドがあるので実行します。

```plain text
style-dictionary build --config ./style-dictionary/config.json
```

実際に以下のように生成することができます。あとはCSS内で変数を参照するだけです。

```plain text
/**
 * Do not edit directly
 * Generated on Wed, 06 Apr 2022 06:45:38 GMT
 */

:root {
  --border-radius-base: 4px;
  --border-radius-large: 8px;
  --color-text-main: #21213b;
  // more
}
```

# FigmaとGitHubを連携してデザイントークンを更新する

**Style Dictionary**はデザイントークンをCSS変数化してくれる非常に便利ツールであることが分かりました。上記仕組みは、GitHubと連携することでさらに強固なものになります。Figma Tokens上でGitHubと連携するとPull Requestを送ることができます。差分を更新することができます。

## GitHub上でStorybookの内容をプレビューする

StorybookはNetlifyにホスティングしています。Netlifyでは、Pull Request毎に**プレビューリンク**を発行してくれます。
これはブランチ毎に制御可能なため、**storybook**ブランチにPull Requestを送るとプレビューURLを発行する設定にしています。これで、Figma Tokensで出したPull RequestをStorybook上で確認してレビューすることができます。この仕組みは非常に強力でレビューのために開発サーバーを立ち上げる必要はなくなります。

こちらは社内で使われている実際のStorybookです。

# 【発展】hygenを使った新規コンポーネントの開発

当初、Storybookはエンジニア・デザイナー間で齟齬や認識の違いがないかを確認するツールとして導入しました。ですが、開発を進めていくに連れて、複雑な開発環境を立ち上げずにローカルでコンポーネントを開発できる利点に気づきました。その利点を活用して、デザイナーやフロントエンドのメンバー以外でもコンポーネントを新規作成しやすいように[hygen](https://www.hygen.io/)を導入しました。`npm run create:ui`を実行すると対話ベースでコンポーネントを作成することができます。

実行すると、Storybookの構成ファイルを含むコンポーネントを作成できるようなっています。

```plain text
Loaded templates: .hygen
       added: src/components/ButtonComponent/ButtonComponent.stories.tsx
       added: src/components/ButtonComponent/ButtonComponent.tsx
       added: src/components/ButtonComponent/index.tsx
       added: src/components/ButtonComponent/buttonComponent.module.css
```

# 最後に

今回はStyle DictionaryとStorybookを使ってデザイントークンの連携フローを構築したお話でした。実際にエンジニアとデザイナー間の連携で悩んでる方も多いと思います。microCMS内での一例がお役に立てば嬉しいです。今後もエンジニア・デザイナー間での連携強化について考えていきます。