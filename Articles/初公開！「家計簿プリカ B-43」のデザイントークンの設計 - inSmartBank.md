---
タグ: []
作成日時: 2024-02-22T19:37:00
URL: https://blog.smartbank.co.jp/entry/2023/06/19/095816
Tags: [topic/デザインシステム/デザイントークン]
---
![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smartbank/20230615/20230615144047.png)

こんにちはスマートバンクのデザイナーの[putchom](https://twitter.com/putchom)です。普段は「[家計簿プリカ B/43](https://b43.jp/)」のプロダクトデザインやデザインシステムの構築を担当しています。

先日、[CreatorZine](https://creatorzine.jp/)さんでプロダクトデザインに関する[スマートバンクの連載記事](https://creatorzine.jp/author/116)を書かせていただいたのですが、今回はその中でお伝えしきれなかった「**デザイントークンの設計**」についてご紹介しようと思います。

そもそもデザイントークンとは、**色、タイポグラフィ、サイズ、不透明度、影などのデザインをするための最小要素**のことであり、スマートバンクではデザインの一貫性を保ったり、関わるメンバーがよりデザインに対する共通認識を持てるようにして、プロダクトの価値提供を早くするために定義しています。

まず完成形です。このあと説明する様々な工程を経て、以下のようなデザイントークンをJSONで定義しました。（すべて記述するとかなり長くなってしまうので、伝わる範囲で一部省略しています。）

```plain text
{
  "b43": {
    "reference": {
      "color": {
        "scale": {
          "mint": {
            "0": {},
            "10": {},
            "20": {
              "value": "#176256"
            },
            "30": {},
            "40": {},
            "50": {},
            "60": {},
            "70": {},
            "80": {},
            "90": {},
            "95": {
              "value": "#cff4ed"
            },
            "99": {},
            "100": {}
          }
        }
      },
      "dimension": {},
      "opacity": {},
      "typography": {}
    },
    "system": {
      "color": {
        "impression": {
          "positive": {
            "base": {},
            "baseVariant": {},
            "container": {
              "light": {
                "value": "{color.scale.mint.95}"
              },
              "dark": {
                "value": "{color.scale.mint.20}"
              }
            },
            "onContainer": {}
          }
        }
      },
      "dimension": {},
      "opacity": {},
      "typography": {}
    }
  }
}

```

スマートバンクではデザイントークンのビルドシステムに[Style Dictionary](https://amzn.github.io/style-dictionary/#/)を採用しており、`{color.scale.mint.95}` などの`{}`で囲まれた値はStyle Dictionaryにおける参照を表しています。

- 参考: [Referencing / Aliasing | Style Dictionary - Style once, use everywhere. A build system for creating cross-platform styles.](https://amzn.github.io/style-dictionary/#/tokens?id=referencing-aliasing)

参照しやすさや再利用性を高めて効率的に運用するため、デザイントークンを「**Reference Token**」と「**System Token**」の2つに分類しました。

## Reference Token

例えば色の場合、`#1dd0b0` のような直接的なカラーコードのままではデザイントークンを認識しづらいため、カラーコードのReference（参照）としてMintなどのわかりやすい名前をつけます。その**参照用のトークン**をReference Tokenと呼んでいます。

```plain text
// Mintのレベル60を表したデザイントークンの例
b43.reference.color.scale.mint.60
```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smartbank/20230615/20230615111326.png)

ColorのReference Tokenをパレットに起こしたもの

## System Token

類似した役割やコンテキストを持つものは類似した見た目によって一貫性を担保したいため、ある程度汎用的な値を抽象化して用意しておくのが望ましいです。

このように**システム全体で使用する抽象化されたトークン**をSystem Tokenと呼んでいます。

```plain text
// 注意の印象を与える入れ物の背景に使うSystem Tokenの例
b43.system.color.impression.attention.container
```

System Tokenは以下のようにReference Tokenを参照しています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smartbank/20230615/20230615111739.png)

ユーザーに注意の印象を与えるStickerコンポーネントの背景色は抽象化されたSystem Tokenを参照している。また、System TokenはReference Tokenを参照している

また、System Tokenはダークモードになった場合など、**ユーザーや環境の設定に応じて参照先を変化させます**。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smartbank/20230615/20230615112056.png)

ダークモードに環境が変化した場合はSystem Tokenの参照先が変わり適用される色が変化する

コンポーネントレベルのデザイントークンを用意しているデザインシステムもありますが、スマートバンクではどのコンポーネントにどのトークンをアサインするかは後述する[Tokens Studio for Figma](https://tokens.studio/)を使ってFigmaを見れば判断できるため採用しませんでした。

ちなみにこれらの分類の定義は [Material Design 3](https://m3.material.io/) のデザイントークンの定義を参考にしています。

また、デザイントークンの命名の判断コストをさげるために、以下のような命名規則を定め、図式化しました。この図式はNathan Curtis氏の「[Naming Tokens in Design Systems](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676)」を参考に構築しました。

```plain text
// Reference Tokenの命名の例
b43.reference.color.scale.mint.60

// System Tokenの命名の例
b43.system.color.impression.positive.base.light
```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smartbank/20230615/20230615112441.png)

命名規則を図式化したもの

それぞれのレイヤーについて詳しく説明していきます。

## Domain

一つの会社が提供するサービスは将来に渡って一つとは限りません。また、プロダクトとは別のコーポレートブランドのデザイントークンを用意することになるかもしれません。Domainのレイヤーで`b43`をつけることで、「B/43」というプロダクトで使用されるデザイントークンであることを示しています。

## Category

前章の定義による分類です。`reference` と`system` から選択します。

## Type

`color`、`opacity`、`dimension`、`typography`、`shadow`などのデザイントークンの型を示します。ビルドシステムから参照することで型に応じた適切な形でビルドできます。

## Property

中間のPropertyに指定する名前はデザイントークンのCategoryやTypeによって異なります。ただし、ダイナミックすぎると判断コストがかかるため、以下のように一般的な命名を定義するようにしたり、規則性を持たせたりしています。

### Design Tokens Format Moduleの定義とStyle Dictionaryの利便性の間をとる

命名の際にはある程度指標があると嬉しいかと思います。スマートバンクではデザイントークンの命名はW3CのDesign Tokens Community Groupが定義しているDesign Tokens Format Moduleを参考にしています。

- [Design Tokens Format Module](https://design-tokens.github.io/community-group/format/)

これを参考にしておくことで将来の標準の仕様にある程度近づけておくことができます。（ただしまだ確定した定義ではないことに注意）

しかし前述の通り、スマートバンクではStyle Dictionaryというライブラリを利用しており、2023年6月19日現在、Design Tokens Format Moduleの定義に合わせた形で定義することが難しい部分がいくつかあります。

そのような部分は現状はStyle Dictionaryでパースできるフォーマットに合わせつつ、将来的にはいくつかの文字列の置き換えによってDesign Tokens Format Moduleの仕様に合わせたものにできるように設計しています。

### B/43において一般的な命名を定義する

標準的な命名が用意されていない特別な概念を定義したい場合があります。その場合はB/43において一般的な命名を定義します。

この一般的な命名を定義していない場合、例えばサイズを表現して命名した値が人によって`m`や`md`、`medium`などと揺れてしまいコミュニケーションコストがかかってしまいます。そのため、B/43において一般的な命名をあらかじめ定義しておき、まずはそれを参照して命名するようにしています。

以下はB/43において一般的な命名の例です。（※ Lower camel caseで記述していますが、各言語や環境に依存してケースは変えています）

| Key | ✅ Do | ❌ Don’t |
| --- | --- | --- |
| size | extraSmall / small / medium / large / extraLarge | xs / s / m / l / xl, xs / sm / md / lg / xl |
| width | hug / full | min / max, auto / fill |
| density | dense / normal / comfort | narrow / default / wide |
| align | start / center / end | left / center / right |

## Theme

B/43のアプリケーションはライトモードやダークモードの輝度の設定が適用されるため、ライトモードの場合は`light`、ダークモードの場合は`dark` を末尾に指定します。Themeはモードによって変化が発生するColor型のトークンにのみ存在します。

```plain text
b43.system.color.impression.positive.base.light
b43.system.color.impression.positive.base.dark
```

# ビルドシステムの構築

次にこれらのデザイントークンを更新した際に効率よく各プラットフォームで使用できるようにするためのビルドシステムを構築しました。スマートバンクではこのビルドシステムにStyle Dictionaryを採用しています。

- [Style Dictionary - Style once, use everywhere. A build system for creating cross-platform styles.](https://amzn.github.io/style-dictionary/#/)

`/tokens` ディレクトリ以下に以下ような構造でJSONのデザイントークンを用意し、iOS（Swift）、Android（Kotlin）、Figma（JSON）、Web（Sass）、[Primer Prism](https://primer.style/prism/)（JSON）それぞれに最適化されたデザイントークンを`/build` ディレクトリ以下にビルドするようにしています。

```plain text
design-tokens
├──tokens
│   └── b43
│       ├── reference
│       │   ├── color
│       │   │   └── some.tokens.json
│       │   ├── dimension
│       │   │   └── some.tokens.json
│       │   ├── opacity
│       │   │   └── some.tokens.json
│       │   └── typography
│       │       └── some.tokens.json
│       └── system
│           ├── color
│           │   └── some.tokens.json
│           ├── dimension
│           │   └── some.tokens.json
│           ├── opacity
│           │   └── some.tokens.json
│           └── typography
│               └── some.tokens.json
└──build
    ├── android
    │   └── Some.kt
    ├── figma
    │   └── some.json
    ├── ios
    │   └── Some.swift
    ├── prism
    │   └── some.json
    └── scss
        └── _some.scss
```

生成されたデザイントークンは各プラットフォームに自動配信する仕組みがあればベストですが現状更新頻度がそこまで高いわけでもないので、後述するFigmaからの参照のみ自動配信に対応しています。

iOSやAndroidは変更があった際にコードレビューを兼ねて各担当者に声をかけ、マージされた後に各プラットフォームのリポジトリに手動で同期する運用を行っています。

# Figmaから利用する

デザイントークンをFigmaから利用すると一貫性が生まれるだけでなく、[Tokens Studio for Figma](https://www.notion.so/2023-06-05-aa7d7d7332624dce8adec9ed9584c5cf)プラグイン経由でノードに付加されたデザイントークンの情報が見れるようになり、**開発者にモックアップを渡す際のコミュニケーションが円滑に進みます**。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smartbank/20230615/20230615143024.png)

Tokens Studio for Figmaを使うとコンポーネントに適用されているデザイントークンを開発者が参照できる

Tokens Studio for Figmaでは有効なJSONのスキーマが定義されています。詳しい方法は省略しますが、スマートバンクではStyle Dictionaryでこのスキーマに合う形にデザイントークンをビルドするスクリプトを自前で用意しています。

- [JSON Schema – Tokens Studio for Figma](https://docs.tokens.studio/tokens/json-schema)

また、デザイントークンの変更をマージしたタイミングでGitHub Actionsでbuildブランチに生成物のみをデプロイするようにし、Tokens Studio for Figmaから参照するようにしています。（Tokens Studio for FigmaにはGitHubやGitLabなどに置かれたコードからデザイントークンを参照する機能があります。）

上記ではFigmaの例を紹介しましたが、このようなビルドスクリプトをiOSやAndroidアプリ向けの環境にも同様に用意しています。

これらのデザイントークンに関する仕様はとても複雑なため、後世に渡って共有されキャッチアップできるようにしておく必要があります。

スマートバンクでは効率的にメンバー間で共有・編集するためにガイドラインをNotionで管理しています。

デザイントークンを利用するメリットや、上記で説明した分類方法、命名規則に加え、ColorやTypographyなどのType別の設計思想などを記述して、新メンバーのオンボーディング時に理解できるような構成にしています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smartbank/20230615/20230615143444.png)

B/43のデザイントークンに関するガイドラインを記載したNotionページ

これらのガイドラインはプロダクト開発に伴って仕様が変更された場合には、誰でも更新できるようになっています。

次に上記のようなデザイントークンを設計して良かったことをご紹介します。

## 共通言語を持ってコミュニケーションできる

デザイントークンが共通言語の役割を果たすようになり、職種を超えたコミュニケーションが効率化されました。

```plain text
A: 「このコンポーネントのこの部分は何色にしますか？」

B: 「薄い緑（#CFF4ED）にしましょう！」
```

例えば、このようなやりとりでは受け手はなぜ緑にするのかを憶測するしかありませんし、なぜ薄い緑なのかも聞かなければわかりません。

```plain text
A: 「このコンポーネントのこの部分は何色にしますか？」

B: 「b43.system.color.impression.positive.containerにしましょう！」

A: 「(あーなるほど、impressionのpositiveだからポジティブな印象を与えたいんだな。
containerだから入れ物の背景色として扱いたそうだな。)」
```

デザイントークンを定義することで相手に伝わる情報量が増えて解像度が高くなり、より適切な意図で実装できるようになりました。

## 判断コストを減らして本質的なことに集中できる

プロダクトを作るデザイナーやエンジニアなどの各メンバーは配色やタイポグラフィ、サイズだけにとどまらない様々な問題を解決する必要があります。

デザイントークンが存在することで細かな日々の判断コストを減らすことができ、本質的な課題解決に集中することができます。

しかし良かったことばかりではなく、課題もあります。

## キャッチアップのコストがかかる

```plain text
A: 「このコンポーネントのこの部分は何色にしますか？」

B: 「b43.system.color.impression.positive.containerにしましょう！」

A: 「(impressionってことは印象かな？　positiveってことはポジティブにしたいのかも...？、
でもcontainerってなんだっけ...？)」
```

このように前提知識をインプットできていない場合には意図がうまく伝わらないかもしれません。また、前章までに説明した通り、覚えるべき概念の量が多いため、キャッチアップのコストがかかります。

スマートバンクの場合は現状デザイナーもエンジニアもキャッチアップのスピードが早いシニアなメンバーが多いため、それなりにうまく運用できていますが、今後はジュニアなメンバーが入社した場合のことも考慮した打ち手をいくつか考える必要がありそうと考えています。

現状の打ち手としてはデザイントークンの概念を説明したビデオを用意して、オンボーディング時に参照して学習できるようにしたり、隔週に1回デザイナーとエンジニアが集まってデザイントークンを含めた仕様を議論する会を設け、議論に参加することで当事者としてキャッチアップしやすい体制を整えています。

## デザイントークンは過渡期にある

デザイントークンは現状過渡期にあります。Design Tokens Format ModuleでDesign Tokens Community Groupが標準化を進めていますが、まだ確定した仕様ではありません。

今後パラダイムシフトが起こり、現状採用しているビルドシステムやプラグインよりも使い勝手がいいものが当然のように出てきて、仕様やツールに合わせた変更を余儀なくされる場合もあると考えています。

スマートバンクではこの現状を受け入れつつ、比較的当たりのよさそうなDesign Tokens Format Moduleに寄せた、または今後寄せやすい形で設計することを意識しています。

いかがでしたでしょうか？今回はスマートバンクが提供する「家計簿プリカ B/43」におけるデザイントークン設計の例を紹介しました。

**デザイントークンの最適な設計はサービスを提供しているプラットフォームやチームメンバーの構成・スキルセットなど様々な条件によって異なる**と考えています。

しかし、部分的に参考になる部分もあると思いますので、デザイントークンを設計する際に参考になれば幸いです。

スマートバンクでは一緒に B/43 を作り上げていくメンバーを募集しています！ カジュアル面談も受け付けていますので、お気軽にご応募ください！