---
Created: 2021-08-13T14:05:00
URL: https://techblog.zozo.com/entry/itcss-to-zozotown
Tags: [topic/技術/CSS]
---
![[20210803200739.jpg]]

こんにちは。ZOZOTOWN部フロントエンドチームの菊地（）です。

2021年3月、ZOZOTOWNは10年ぶりのリニューアルをしました。この記事では、そのリニューアルで再考したCSS設計について紹介します。

# 背景

今回のリニューアルでは、ウェブとアプリが部分的に共通のデザインになりました。

<!-- Column 1 -->
![[20210804174505.jpg]]

<!-- Column 2 -->
![[20210804171727.jpg]]

このデザイン刷新には、CSSの大規模変更が必要です。チーム内で検討を重ね、最終的に、大きく書き換えるのであればコンポーネント駆動開発ができるようにCSS設計を見直すべきという結論に至りました。

## CSS設計で特別に考慮する点

現在、ZOZOTOWNのフロントエンドは、「Classic ASP」から「」へのリプレイスを進めています。新規開発や変更のタイミングで、Classic ASPに依存した実装をReactへ改修します。

ただ、今回のリニューアルではClassic ASPをReactへリプレイスする時間的余裕がなく、見た目は共通でもClassic ASPとReactが混在する実装にせざるを得ませんでした。Classic ASP側にドラスティックな変更を入れず、かつシステム全体を通してはコンポーネント駆動開発を実現する、そのようなCSS設計が必要でした。

# 設計

## 体制

現在、ZOZOTOWNのWebフロントエンドは3チームに分かれています。全てのチームで共通の設計を採用できるよう、各チームから1人ずつCSSリーダーを選出し、合計3名で新たなCSS設計をしました。実装や運用に伴って発生する問題もCSSリーダーが取りまとめ、都度設計に反映、コードやルールに落とし込むという体制です。

## 要件

既存のCSSでも一部はコンポーネントごとに定義がまとめられています。しかしながら、仕様追加の積み重ねによってカスケードが多重化され、CSSファイルからその状態を把握することが難しくなっていました。

一方、今回のリニューアルプロジェクトはスケジュールが逼迫しており、チームを横断して多数のメンバーが同時期に実装することが必要でした。これらを踏まえ、設計の要件を下記のように定めました。

- **作業分担しやすいこと** 
    - 複数のメンバーが同時に作業をしても競合しづらい

CSSには様々な設計手法がありますが、以上の要件を満たしつつ現状のZOZOTOWNにマッチする設計手法は、「ITCSS」という判断に至りました。

# ITCSSとは

ITCSSは、氏が提唱したCSSの詳細度を管理する設計思想です。
 「Inverted Triangle CSS (逆三角形のCSS)」の略で、設定の詳細度順に階層化して記述します。7つのレイヤーが定義されており、この記述が逆三角形として可視化されます。

## ITCSSのレイヤー

1. Settings
2. Tools
3. Generic
4. Base
5. Objects
6. Components
7. Trumps

![[20210803200754.jpg]]

「CSSプリプロセッサなどで利用する変数や設定」であればSettings、「OOCSSの概念に基づいた定義」であればObjects、というように各レイヤーの役割が決まっています。 なお、ITCSSのレイヤーは、必要に応じて追加・削除することも許容されます。

- CSSプリプロセッサを利用していない場合、SettingsやToolsなどのレイヤーを削除
- OOCSSを使用していなければObjectsレイヤーを削除
- テーマ性が必要であればThemeレイヤーを追加

といった調整も可能です。今回のリニューアルプロジェクトでは標準のITCSSに加えて、カスタムレイヤーを加えました。詳細は後述します。

各レイヤーは次の性質を持っています。

8. 下位レイヤー（図の下側）ほど詳細度が上がる
9. 上位レイヤーが下位レイヤーを上書きしない

この性質は、複数人での同時作業を助けます。

複数の作業者が同時に作業しながら破綻を避けるには、定義や分割粒度を設計者以外でも同じように行えることが重要です。それはITCSS以外の設計手法を用いても可能ですが、ITCSSの場合は各定義の責務を理解しやすいのが大きなメリットだと感じました。

例えばAtomic Designは、デザイナー・エンジニア間で浸透した設計思想であるため、共通の思想で各インタフェースの責務を分割できるのが大きなメリットです。ただ、デザイナー同士でも責務分割の粒度が異なるケースもあります。また、デザイナーとエンジニアでも言語や仕様などの都合によって、責務分割の粒度が大きく異なることも少なくありません。さらにはエンジニア同士の責務分割の粒度が異なってしまうことも当然あり、そうなるとソースコードの混沌は避けられません。

デザインの意図を正確にソースコード（CSS）に落とし込むことができればCSSの破綻は防げるのですが、デザイナーと実装者が同じでない限り、例に上げたように伝達の過程で歪みは生じやすくなります。その点、ITCSSでは定義の責務が明確で個人の判断に任せる部分が少なく、一貫した設計が可能です。

## コンポーネントの命名規則

ITCSSでは、コンポーネントごとの命名規則が定められていません。私達はMindBEMding（BEM）に接頭辞を組み合わせることにしました。

### MindBEMding（BEM）

は、BEMから派生した命名規則です。こちらもITCSSと同様にHarry Roberts氏が提唱しています。

下記の命名パターンで構成します。

命名は基本的なBEMに準じていれば良しとしています。ただし、`.Block__Element__Element`という命名パターンだけは、構造が複雑になり見通しも悪くなることが明らかであったため採用していません。

BEMを利用した命名のメリットに「クラス名からクラスが持っている役割が分かりやすくなる」という点がありますが、さらにITCSSとの組み合わせによって役割と責務が一見して分かりやすい構造になります。共通の命名規則が決まっていることで実装とレビューが円滑にできるようになりました。

### 接頭辞

今回のリニューアルは、広範囲に渡る大規模な改修ですが、それでもCSSを全て置き換えるわけではありません。そのため、命名によっては既存CSSと競合する可能性があります。そこで競合しないように接頭辞を整備しました。

ITCSSのレイヤーに応じた接頭辞を付与します。これにより接頭辞を一目見ただけで役割を把握できます。また、レイヤー同士の名前衝突も避けられます。次の表は、接頭辞の例です。

既存のCSSに接頭辞が基本的に付いていなかったこともあり、副次的なメリットとして、ソースコードを一見して新旧コードが分かりやすくなりました。

## ITCSSと命名規則（MindBEMding + 接頭辞）の組み合わせで実現できること

以下のような設計が実現できます。

- **ITCSS** 
    - レイヤーに沿うだけで詳細度が管理できるため、破綻しにくく、保守しやすいコードを書ける
    - 管理方法が分かりやすいため、設計者以外のメンバーでも定義のズレがなく、分割粒度が揃いやすい
- **MindBEMding + 接頭辞** 
    - クラス名を一見して定義のもつ役割が分かりやすい
    - 命名のブレや迷いが少なくなる
    - ITCSSのレイヤーに基づく接頭辞を使うことで、コンポーネント同士で命名の衝突が少なくなる 
        - 元より接頭辞がない既存CSSとは衝突しない

# 詳細

最終的に次のように設計しました。

**ITCSSディレクトリ構造例**

```plain text
style
 ├── Settings
 │   ├── _colors.css
 │   ├── _variables.css
 │   └── ...
 ├── Tools
 │   ├── _animation.css
 │   ├── _mixins.css
 │   └── ...
 ├── Generic
 │   ├── _font.css
 │   ├── _reset.css
 │   └── ...
 ├── Base
 │   ├── _global.css
 │   └── ...
 ├── Layouts
 │   ├── _grid.css
 │   └── ...
 ├── Objects
 │   ├── _form.css
 │   └── ...
 ├── Vendor
 │   ├── _swiper.css
 │   └── ...
 ├── Components
 │   ├── _breadcrumbs.css
 │   ├── _button.css
 │   └── ...
 ├── Model
 │   ├── _pagination.css
 │   └── ...
 ├── Site
 │   ├── _drawer.css
 │   ├── _header.css
 │   ├── _footer.css
 │   └── ...
 ├── Pages
 │   ├── _home.css
 │   ├── _goods.css
 │   ├── _cart.css
 │   └── ...
 └── Trumps
     ├── _text.css
     └── ...
```

**CSS命名例**

```plain text
/* Objects */
.o-scroll {}
.o-scroll__container {}

/* Components */
.c-catalog {}
.c-catalog-header {}
.c-catalog-body {}
.c-catalog-body__title {}

/* Model */
.m-catalog-scroll {}
.m-catalog-scroll__item {}

```

順を追って説明します。

## レイヤー構造

ZOZOTOWNでは多くのページを管理する必要があり、責務をより明確にするにはデフォルトのレイヤーだけでは足りなかったため、独自のレイヤーを追加しました。
 下記のようなレイヤー構成にしています（太字のものが追加したレイヤーです）。

![[Archive/import/ITCSSを採用して共同開発しやすいCSS設計をZOZOTOWNに導入した話 - ZOZO Technologies TECH BLOG/New database/New database.base]]

各レイヤーの利用方法の詳細は、以下の通りです（各種コードはサンプルです）。

### Settings

このレイヤーには、CSSプリプロセッサなどで利用する変数や設定を配置します。
 CSS Custom Propertiesの定義もこのレイヤーで行いました。

```plain text
$font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Segoe UI Symbol", "Noto Color Emoji" !default;

$color-ui: #bada55;
$spacing-unit: 10px;

```

### Tools

このレイヤーには、CSSプリプロセッサで利用する `mixin` や `function` などの定義を配置します。CSSプリプロセッサを利用していない場合は不要かもしれません。

```plain text
@function str-replace($string, $search, $replace: "") {
  $index: str-index($string, $search);

  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace +
      str-replace(
        str-slice($string, $index + str-length($search)),
        $search,
        $replace
      );
  }

  @return $string;
}

@mixin font-brand() {
  font-family: "UI Font", sans-serif;
  font-weight: 400;
}

```

### Generic

このレイヤーには、リセットスタイルや固有のリセットスタイル定義を配置します（低詳細度で広範囲に当たる定義）。

```plain text
@import "reset.css";

*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

```

### Base

このレイヤーには、素のHTML要素のスタイル定義を配置します。クラスセレクターなどは使用せず、`a`, `h1…6`, `ul…li` などの要素セレクターのみで構成します。

```plain text
ul {
  list-style: square outside;
}

```

### Layouts

このレイヤーは独自に追加したレイヤーです。

このレイヤーには、ページ間で共通の大きなレイアウト定義（グリッドなど）を配置します。余白や幅など装飾を持たないスタイルを定義します。

```plain text
.l-main {
  margin: 0 auto;
  width: 100%;
}

```

### Objects

このレイヤーには、OOCSS（Object Oriented CSS）の概念に基づいた定義を配置します。Layoutsレイヤーとの違いとしては、ページ内で繰り返し使えるものを想定しています。余白や幅など装飾を持たないスタイルを定義します。

```plain text
.o-ui-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.o-ui-list__item {
  padding: $spacing-unit;
}

```

### Vendor

このレイヤーは独自に追加したレイヤーです。

このレイヤーには、外部ライブラリから提供される固有のスタイルを読み込み、外部ライブラリが定義しているスタイルを上書きするための定義を配置します。

```plain text
@import 'swiper/swiper-bundle.css';

.swiper-module {
  overflow: hidden;
}

```

### Components

このレイヤーには、再利用可能なコンポーネント（UIパーツ）を定義します。コンポーネントにマージンは持たせず、ObjectsやModelレイヤーとの組み合わせで余白は再現します。

```plain text
.c-products-list {
  @include font-brand();
  border-top: 1px solid $color-ui;
}

.c-products-list__item {
  border-bottom: 1px solid $color-ui;
}

```

### Model

このレイヤーは独自に追加したレイヤーです。

このレイヤーには、コンポーネント同士の組み合わせやコンポーネントの粒度に満たない汎用的なUIの定義を配置しています。

コンポーネント同士を組み合わせたい場面はよくあるものの、保守性の観点から、同レイヤー同士の組み合わせをルールで禁止しています。一方、組み合わせの定義を繰り返すと冗長になってしまうため、このレイヤーを設けています。中間層のレイヤーを導入したことにより、可読性の面だけではなく、詳細度の複雑さを和らげる効果もありました。

下記は、年月日のフォームの例です。`c-input`の組み合わせで特殊なフォームを再現しています。このフォームは情報登録・編集画面の限られた共通パーツであったため、Modelレイヤーに定義をします。

![[20210721120142.jpg]]

```plain text
.m-input-decoration-birth {
  display: flex;

  @each $date-name, $date-label in (year: "年", month: "月", day: "日") {
    &__#{$date-name} {
      display: flex;
      flex: 1;
      align-items: center;

      &::after {
        content: $date-label;
        width: 24px;
        text-align: center;
      }
    }
  }
}

```

```plain text
<div class="m-input-decoration-birth">
  <div class="m-input-decoration-birth__year">
    <div class="c-input">
      <input type="text" class="c-input__text">
    </div>
  </div>

  <div class="m-input-decoration-birth__month">
    <div class="c-input">
      <input type="text" class="c-input__text">
    </div>
  </div>

  <div class="m-input-decoration-birth__day">
    <div class="c-input">
      <input type="text" class="c-input__text">
    </div>
  </div>
</div>

```

### Site

このレイヤーは独自に追加したレイヤーです。

このレイヤーには、サイトを横断的に利用されるUI（グローバルヘッダーやグローバルフッターなど）の定義を配置しています。コンポーネントとほぼ役割は変わりませんが、ページ内で一度登場するようなものをこのレイヤーにまとめています。

```plain text
.s-header {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin: 0 auto;
}

```

### Pages

このレイヤーは独自に追加したレイヤーです。

このレイヤーには、ページ固有の定義や上位のレイヤーの定義を上書きするような定義を配置します。

これまでのレイヤーで定義したコンポーネントやレイアウトスタイルの組み合わせで完結しないような、ページ固有のUIパーツやコンポーネントのバリエーションを再現するのに使います。

Pagesレイヤーではカスケード用のクラスを用意して、トップレベルのHTML要素にクラス付与して実装を定義します。また、Pages固有の定義については、カスケード用のクラスを継承した名称で定義します。

```plain text
.p-product-detail {
  background-color: $bg-color-gray;

  .o-form-group {
    margin-bottom: 16px;
  }

  .c-button {
    border: none;
  }
}

.p-product-detail-heading {
  font-size: 28px;
  margin-bottom: 8px;
}

```

```plain text
<body class="p-product-detail">
  <header class="l-header">
    <div class="s-header"></div>
  </header>
  <main class="l-main">
    <h1 class="p-product-detail-heading">heading</h1>
    <div class="o-form-group">
      <input type="text" class="c-input" />
      <button type="button" class="c-button">button</button>
    </div>
  </main>
  <footer class="l-footer">
    <div class="s-footer"></div>
  </footer>
</body>

```

### Trumps（Utility）

このレイヤーには、ヘルパー・ユーティリティ系の汎用スタイルを定義します。これまでのレイヤーよりもスコープが最も狭くなるよう1つのDOMだけに影響させるような定義をします。

本来は「Trumps（切り札）」という名称ですが、あまり馴染みのある表現ではなかったので、ZOZOTOWNでは「Utility」という名称で運用しています。

```plain text
.u-text-color {
  color: $color-text-important !important;
}

```

しかしながら、このTrumpsレイヤーは、本当に切り札として使うのが最適だと考えています。詳細度を管理する上での問題もありますが、汎用クラスはその実装から「どのような状態になるのか」を理解しづらいためです。例えば「色を変えたい」のか「セール価格として強調したい」のかをCSSの実装だけで汲み取るのは困難で、HTMLと前後の文脈を照らし合わせる必要があります。こういう理由から、汎用クラスは後のリファクタリグの際に実装を紐解いていく必要があり、使い方によっては負債になりがちな要素となります。

# まとめ

以上が今回のリニューアルで再考したCSS設計の思想とルールです。

詳細度の管理のためにITCSSを、既存実装に影響を与えないようにクラス命名規則にMindBEMdingと接頭辞を採用しました。これらの導入によって、CSSの詳細度の管理が容易となり、設計に造詣が深くないメンバーでもITCSSのルールに則るだけで破綻しにくいCSS実装が可能となりました。まだまだリプレイスの途中ということもあり、過去の資産と共存するために記載以外でも拡張している箇所があります。しかし、ITCSSの柔軟性のおかげで追加仕様もその枠組で吸収できています。

なお、本記事では触れませんでしたが、ZOZOTOWNのCSSを取り巻く状況は以下のようになっています。

- モジュールバンドラはを利用
- CSSプリプロセッサはを利用
- Classic ASPとReactが生成するHTMLは、同じグローバルCSSによってスタイリングされる

CSS Modulesが生成する一意なCSSクラス名を排除しているものの、ITCSSと命名規則によってCSSクラス名に一意性が保たれるため、クラス名の衝突という点では全く支障ありませんでした。

CSS ModulesはCSSクラスの出力順序がJavaScript側の参照順に依存しているため、JavaScriptの変更でカスケード順が変わると予期せぬスタイル崩れが起こる恐れもあります。ZOZOTOWNではページによって表現パターンをカスケードして変えることが多く、クラス名をCSS Modulesに任せるよりも、CSS設計でクラス名を決定する方が安全に長期運用ができると判断しました。

# 最後に

ZOZOテクノロジーズでは、一緒にサービスを作り上げてくれる仲間を募集中です。ご興味のある方は、以下のリンクからご応募ください！

10. 
コンポーネント駆動開発とは、UI開発をコンポーネントから始めて、コンポーネントを徐々に組み合わせて最終的にページを作り上げていくボトムアップな開発プロセスのことです。コンポーネントを分離して構築するため、開発と設計の並列化による効率性の向上などのメリットが見込まれます。
11. 
webpackの`css-loader`の`options`に`modules.localIdentName: '[local]'`を設定します。