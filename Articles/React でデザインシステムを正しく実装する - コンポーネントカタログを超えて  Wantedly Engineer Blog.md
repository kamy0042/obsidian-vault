---
タグ: []
作成日時: 2021-01-21T17:28:00
URL: https://www.wantedly.com/companies/wantedly/post_articles/302873
Tags: [topic/デザインシステム/コンポーネント設計]
---
Wantedly でバックエンドのテックリード的なやつをやってる [@izumin5210](https://github.com/izumin5210) です。半年くらい前から取り組んでいた、UI デザインシステムの React 実装について紹介します。ソフトウェアの設計としても非常にエキサイティングだったので、ライブラリ作ったりするのが好きな人なども楽しんでもらえると思います。

## TL;DR

- Wantedly の UI デザインシステムは「WantedlyのUIをデザインする上での**共通の考え方とツール＆アセット**」であり**エンジニアとデザイナが効率よくコミュニケーションするための共通言語**となる
- デザインシステムを (Web) Frontend に持ち込む際は、単なるコンポーネントカタログではなく、システムが定義するものと同じレベルの抽象を持つライブラリ・フレームワークとして実装することで、より有効性を発揮する
- この話が気になった（Web・モバイル問わず）フロントエンドエンジニア・デザイナはぜひ話を聞きに来てください！！

## UI デザインシステムについて

Wantedly におけるデザインシステムは、「プロダクト・デバイスをまたいでも・誰がデザインしても体験やブランドとしての一貫性を保つ」「デザインの生産性を向上させ、デザイナ - エンジニア 間コミュニケーションを改善することで、ユーザに価値を届ける速度を向上させる」といった目的のために作られたものです。

2019年に CTO の川崎が発表した資料が詳しいので、それを見てもらうほうが早いかもしれません。

次の2つの画像にあるように、Wantedly のプロダクトなどをデザインするときに利用する色やフォントなどのスタイルと、ボタンやテキストフィールドなどの UI コンポーネントなどが定義されています。

## Wantedly の UI デザインシステムとは何か・何でないか

Wantedly が作っている「UI デザインシステム」とは何か、内部のドキュメントでは次の一文で表現されています（強調は筆者による）。

この「共通の考え方とツール＆アセット」とは何か、いくつか具体例を見ていきます。

たとえば「Button」を表すコンポーネントですが、Sketch 上では以下のようなインタフェースとなっています。右のパネル中央付近に「Overrides」というセクションがあり、「TextStyle」「Shape」「State」「BackgroundColor」「Elevation」というパラメタが並んでおり、ここから見た目を変更できるようになっています。

> デザインシステムの Sketch 実装 - デザインシステムが加速させるプロダクト開発, p.41

上記5つのパラメタは **Foundation** としてデザインシステムに定義されており、殆どのオブジェクトはこれらのパラメタを変更することで見た目を決定するようになっています。

また、上記の画像では Button の見た目よりも少し外側に線が出ていますが、実際にその空白まで含んで Button であると定義されています。これは TouchArea と呼ばれ、そのコンポーネントが持つべき最低限の余白を表しています。これは Button や TextField などの Interactive なコンポーネントに適用されており、余白自身もコンポーネントの一部になります。

> TouchArea によりコンポーネント間の余白がいい感じになるの図。この領域を含めて Apple や Google の Interface Guideline を満たすように設計されている。

ここまで例に上げたとおり、Wantedly の UI デザインシステムは「コンポーネントカタログ」ではなく、コンポーネントの構成要素・原則からなる「**共通の考え方とツール＆アセット**」であるというのがなんとなくわかってもらえたでしょうか。

## なぜ UI デザインシステムを作るのか

Wantedly では何のために UI デザインシステムというものを作っているのか、社内のドキュメントでは以下のような目的が挙げられています。

- ブランド表現 - Wantedlyとしての見た目と振る舞い の一貫性を保つ
- ベーシックなユーザビリティの担保
- デザインアウトプットの効率化
    - 細かい造形で悩まず、プロダクトとして大切な体験にフォーカスできるように
    - 複数のプロダクトをまたいでも、共通の考え方で対応できるように
- エンジニアとのフロントエンド開発、コミュニケーション、メンテナンスの効率化

ここでは「エンジニア」と明記されている「エンジニアとのフロントエンド開発、コミュニケーション、メンテナンスの効率化」について、なぜそうなるのかをもうちょっと掘り下げます。前節での「デザインをする上での共通の考え方とツール＆アセット」というのを前提として考えると、以下のような理由があると考えています。

- （UI）デザインシステムが、**エンジニアとデザイナが効率よくコミュニケーションするための共通言語**となる
- UI デザインシステムにより、**コンポーネントの作り方に一貫したルール**が生まれる
    - このルールを知り、使いこなす（使いこなせるツールが存在する）ことで、誰でも「Wantedly らしい UI コンポーネント」が作れる

「デザイナがどういう言語を用いて、どのようなルールの上でデザインをしているか」をエンジニアが知ることで、コミュニケーションが円滑になり、背景・ロジックを知った上で実装ができるようになる。それにより「エンジニアとのフロントエンド開発、コミュニケーション、メンテナンスの効率化」が達成できるのではないでしょうか。

余談ですが「デザイナがどういう言語を用いて、どのようなルールの上でデザインをしているか」というのは、Web エンジニアが Ruby on Rails や Next.js といったフレームワークを利用するのと似たような構造に思えます。Wantedly のデザイナは**デザインシステムというフレームワークに乗ることで、細かいことを気にせずプロダクトの価値を生み出すことに集中できる**と解釈するとわかりやすそうです。

## React 実装の設計

前節で（UI）デザインシステムは「**エンジニアとデザイナが効率よくコミュニケーションするための共通言語**」であり「**コンポーネントの作り方に一貫したルール**」をもたらすものである、という解釈をしました。また、「**UI デザインシステムというフレームワーク**」とも表現しました。これを実現するために、エンジニア向けの実装はどのようにあるべきでしょうか。

「共通言語」であり「一貫したルール」であるために、エンジニアとデザイナはデザインシステムに関して**同じレベルの抽象**をもってコミュニケーションしていく必要があるはずです。ライブラリとして提供する実装に関しても、基本的にはデザイナが扱っている抽象・フレームワークとおなじレベルのものを提供していく必要があるでしょう。

「同じレベルの抽象」というとかなり抽象的な表現ですが、誤解を恐れずに言い換えると「**デザイナと同じロジックでコンポーネントを作れること**」ということでしょうか。わかりやすいところでいうと「デザイナがコンポーネントを作るときに指定するパラメタが、そのままコンポーネントの Props として表出している」などです。もっと深堀りすると「Button は〇〇と△△と…から構成されており、そのパラメタとして Elevation と ... がある」みたいなものが、正しく React コンポーネントの実装およびインタフェースとなっている必要があります。

```plain text
type ButtonProps = {
  shape?: Shape;
  reaction?: Reaction;
  backgroundColor?: Color | Gradation;
  elevation?: Elevation;
  // ...
};
```

ここまでで満たすべき要件を確認したので、設計に移っていきます。前提として、TypeScript + React でシステムを実装していきます。これは Wantedly における Web Frontend の主要な技術選択にあわせています。内部では [**styled-components**](https://styled-components.com/) を利用していますが、これは peerDependencies を除きインタフェースとして露出することは無いようにしています。

### UI デザインシステム構成要素について

これは React 実装に限らない UI デザインシステムの定義上の話です。UI デザインシステムは次の3~段階の要素から構成されています。

- **Lv.0 Foundation**
    - 一貫した Corporate Branding のためのシステム
    - UI に限らない Graphic Standards: 色, フォント, アイコン など
    - UI で守るべき基本原則: Layout unit, Shape, Elevation, Reaction, Typographic scale
- **Lv.1 Basic Components**
    - (Designer|Developer) Productivity を向上させるためのシステム
    - ボタンやテキストフィールドなどの基礎コンポーネント群
- Lv.2 ここまでの要素の組み合わせからなる UI コンポーネント群
- Lv.3 プロダクトの UX を向上させるための機能コンポーネント群
- ...

Lv.2 以降に関してはそこまでのコンポー ネントの組み合わせが主になります。よって、Lv.0 Foundation および Lv.1 Basic components を React の上でどう表現するかがポイントになってきます（Lv.2以降についてはまたの機会があれば紹介します）。

### Lv.0 Foundation

Lv.0 Foundation には前述したとおり、色・フォント・アイコン・Elevation などのデザインパラメタが定義されています。また、[Elevation](https://material.io/design/environment/elevation.html) や Reactionなど UI コンポーネントの振る舞いの原則も含まれます（Reaction: [Material Design における State](https://material.io/design/interaction/states.html#usage) のような、Hover や Focus など、ユーザのアクションによってコンポーネントに起こる反応のパターン）。

さて、この Foundation を React + styled-components の世界に落とし込むとどうなるでしょうか？単なるデザインパラメタと捉えられれば、CSS プロパティの集合として表現することができそうです。styled-components には [css という CSS interpolation を作るための API](https://styled-components.com/docs/api#css) があるので、それを使います。

```plain text
//==== UI デザインシステムの実装

import { css } from "styled-components";

export type Elevation = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;

export const elevationCss = css<{ elevation: Elevation }>`
  box-shadow: ${p => getElevationBoxShadow(p.elevation)};
`;


//==== 利用イメージ

// 上で定義した CSS を埋め込めば、elevation を props で指定できるコンポーネントになる
const Card = styled.div<{ elevation: Elevation }>`
  ${elevationCss}`;
```

これで Wantedly の UI デザインシステムを表現できたでしょうか？実はまだ足りません。Foundation のパラメタを決定するタイミングでいくつかロジックが絡むことがあります。例えば次のようなものです。

- Reaction は (対象物) × (アクションの種類) の組み合わせで変化するパラメタが異なる
    - ボタンは Elevation と背景色どちらも変化するが、テキストフィールドは背景色のみが変わるパターンが定義されている
    - Focus と Press では背景色の濃さなどが変わる
- ユーザの閲覧環境や言語によって、同じテキストスタイルでも文字の大きさや行の高さが変化する場合がある

このようなロジックが絡むパラメタをうまく扱うために、styled-components の Interpolation だけでなく React のカスタム Hook も提供するようにしています。たとえば Reaction であれば useReaction というカスタムフックにリアクション推定のためのロジックを隠蔽しています。

```plain text
//==== 利用イメージ

const Card: React.FC = ({ children }) => {
  // `useReaction` はライブラリで提供する
  // 返り値には onMouseEnter などのリアクションを取るためのイベントハンドラと、
  // CSS に渡すための props が含まれる（elevation や backgroundColor など）
  const reactionProps = useReaction()

  return (
    <CardContainer {...reactionProps}>
      {children}
    </CardContainer>
  )
};

const CardContainer = styled.div`
  /* reactionCss はライブラリで提供する */
  ${reactionCss};
`;
```

コードスニペット中にも書いていますが、提供する Hook の返り値には onMouseEnter などのイベントハンドラが仕込まれており、そのままコンポーネントに渡されることを想定しています。このあたりの API は [**downshift**](https://github.com/downshift-js/downshift) などのライブラリを参考にしました。また、リアクションの推定などは [**React Spectrum**](https://react-spectrum.adobe.com/) の一部である [React Aria](https://react-spectrum.adobe.com/react-aria/) というライブラリを内部的に利用しています（自分で実装するとアクセシビリティ観点などで考慮漏れするのが目に見えているため）。

単なる汎用スタイル定義集であれば Interpolation を提供するだけでも問題ないでしょう（[**styled-system**](https://styled-system.com/) などがそういうアプローチです）。ただ、**Wantedly で作りたかったのは「Wantedly における UI コンポーネントの原則を適用するためのツールキット」であり、その "原則" にはロジックも含まれる**ため、カスタムフックを併用するような構成となりました。

### Lv.1 Basic components

Foundation の実装で、UI コンポーネントの原則を React component に適用するためのツールキットを作りました。これを利用して Button や TextField などの基礎コンポーネントに適用していきました。

```plain text
export interface ButtonProps {
  elevation: Elevation;
  size: Size;
  shape: Shape;
  // ...
}

// NOTE: `forwardRefStyled` は styled-components のコンポーネントに対して
// Props 移譲と `forwardRef` をするためのユーティリティ
export const Button = forwardRefStyled<ButtonProps, "button">(function Button(
  props,
  ref
) {
  const { reactionProps } = useReaction()

  return (
    <StyledButton {...props} {..reactionProps}>
      {children}
    </StyledButton>
  )
});

const StyledButton = styled.button`
  /* 前節のreactionCssに加え、elevationやshapeまわりのスタイルを束ねた便利interpolation */
  ${foundationCss};
`
```

コンポーネントの実装に関しては基本的に Lv.0 で定義した interpolation を埋め込み、それに渡す property は custom hook から取得しています。styled-components をハードに使うので、とくに型周りに関していい感じになるようなユーティリティ関数を用意していたりしますが、そのあたりはこの記事では割愛します。

### その他 生産性向上のための工夫

この記事中では具体的に紹介しませんでしたが、エンジニアがデザイナの思考をなぞりデザインシステムを使いこなすための、提供する実装にもいくつかの工夫をしています。

わかりやすい例としては、 [**Storybook**](https://storybook.js.org/) の提供があります。Props の定義・そこに記述したドキュメントが閲覧できるほか、[knobs](https://www.npmjs.com/package/@storybook/addon-knobs) addon によって挙動の理解・確認の支援をしています。

この Storybook は Pull Request を作るたびに URL が発行されるようになっており、レビューや動作確認時の助けにもなっています。

また、開発時にエディタ上から利用しやすくするために、「見やすい型」にするようにしていたりもします。

このあたりの細やかな（？）工夫についてはまた別の記事で紹介できればと思います。

## まとめ & Future work

ここまでで、「Wantedly における UI デザインシステムとはなにか」「デザインシステムの React 実装の設計」について紹介しました。この記事で紹介したデザインシステムの実装は、Wanteldy の最近のプロジェクトで活用されています。

一方で、デザインシステムについては、ここで紹介した React 実装以外にもやるべきこと・やると良さそうなことが無数に残っています。いくつか例を上げると、

- Android および iOS 向けの実装
- デザイナ - エンジニアのさらなるコミュニケーション改善のためのエンジニアリング
- エンジニア実装（React, Android, iOS, ...）とデザイナ実装（Sketch or Figma）のインテグレーション
- ...

などでしょうか。

デザインシステムのような技術領域の境界をなめらかにするような開発は、それぞれの領域への一定の知識・理解やそれなりの抽象化能力を問われる一方で、うまくキマればプロダクトの開発生産性を飛躍的に向上させるものだと思っています。こういうエキサイティングな開発をしたいエンジニアや、システムの力で本質的なプロダクトづくりに取り組みたい・そういうシステムを作りたいデザイナのみなさん、ぜひ話を聞きに来てください！