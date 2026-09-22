---
Created: 2021-01-15T20:37:00
URL: https://standard.shiftbrain.com/blog/cdd-for-static-deliverables-ja
Tags: [topic/デザインシステム/コンポーネント設計]
---
ここ数年で、「デザインシステム」はウェブ開発やデザインのコミュニティでとても人気の話題になりました。そして「コンポーネント」として定義される一連のデザイン成果物を開発・メンテナンスするために、[Styleguidist](https://github.com/styleguidist/react-styleguidist)や[Storybook](https://storybook.js.org/)といったツールが多くのプロジェクトで一般的に使われています。このプロセスはデザインシステムという概念の一部として、**コンポーネント駆動開発**（Component Driven Development）と定義することができるでしょう。

さて、コンポーネント駆動開発にまつわる資料のほとんどは、ReactやVue、Angularといった、フロントエンドのビューのためのメジャーなライブラリを利用することについてのものです。しかしもっとトラディショナルな技術スタックの場合はどうすればいいでしょう？

例えば私たちスタンダードデザインユニットでは、静的なHTMLとCSSのアセットを納品し、あとからWordPressなどのサーバーサイド技術と連携することがよくあります。またTwigや[Phug](https://github.com/pug-php/pug)（PHPのためのPugテンプレートエンジン）のようなサーバーサイドのテンプレート言語をベースにした動的なテーマを、バックエンドのチームに直接納品することもあります。そしてこれらどちらの場合も、コンポーネント駆動開発の恩恵を受けられないように見えるかもしれません。

この記事では、私たちチームがこの課題にどのように取り組んだか、そしてどのようなソリューションにたどり着いたかについて紹介します。

この記事は「[Component Driven Development for Static Deliverables: A Retrospective](https://standard.shiftbrain.com/blog/cdd-for-static-deliverables-en)」の日本語訳です。

## 目次

## コンポーネント駆動開発の原則

コンポーネント駆動開発の要点は、デザインから小さくて再利用可能なUIのパーツを定義し、それらを**コンポーネント**と呼ばれる個別のユニットとして開発することです。それぞれのコンポーネントは、その周囲に配置されたコンポーネントやレイアウトパーツから不必要に干渉されないよう、独立したものとして開発されるべきです。そうすることによって再利用性が高まり、テストがしやすくなります（より詳しくはアディ・オスマーニ氏の[FIRST](https://addyosmani.com/first/)原則を参照してください）。

私たちのチームが携わるプロジェクトの多くは企業サイトやメディアサイトです。これらのサイトにはたくさんのページがあるものの、カードやボタンなど比較的小さなUIパターンの繰り返しでできており、コンポーネント駆動開発にうってつけです。しかしもし技術的な問題があるからと言ってコンポーネント駆動開発の機会を逃すとしたら、それは実にもったいない話です。

## 以前の手法

フロントエンドのうちCSSに目を向けると、[SMACSS](http://smacss.com/)や[BEM](http://getbem.com/introduction/)といったテクニックが、ReactのようなJavaScriptライブラリのずっと前から、コンポーネントという考えを開拓していました。そのため、リビングスタイルガイドという形でデザインシステムを設計・開発する上で、CSSを信頼できる唯一の情報源（[Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)）と見なすのはごく自然なことでした。[KSS](https://github.com/kneath/kss)のような従来のツールは、CSSファイルを処理して、つねに最新の変更に追従するスタイルガイドをビルドするという発想で作られています。

こういったツールは、スタイルガイドとして、コンポーネントの振る舞いについてチームでやりとりしたり共有したりする上では十分に機能します。しかし柔軟性に欠け、開発のプレイグラウンドとして使うには難があるのです。例えば多くの場合、ライブリロードやコンポーネント内に表示されるデータの書き換え、JavaScriptとの連携といった機能がありません。

## Storybookへの移行

私たちはプロジェクトで採用するコンポーネント駆動開発の環境として[**Storybook**](https://storybook.js.org/)を選びました。その時点でプレーンなHTMLをストーリーのソースとして使える唯一のツールだった、というのが主な理由です。

そしてCSSベースで進められていたプロジェクトをHTMLベースのコンポーネントシステムへと移行するにあたり、選択肢として2つの方針を考えました。

1. テンプレート指向。ページをエリアごとに切り取って、それらを大きな粒度のコンポーネントとして扱う。
2. 利用中のテンプレート言語には、コンポーネント的な働きの機能があらかじめ備わっているので、これを活用する。

最終的には2つめの方針を選びました。そして私たちが主に使っているテンプレート言語は[Pug](https://pugjs.org/)だったので、コンポーネント定義の方法としてPugの[`mixin`](https://pugjs.org/language/mixins.html)機能を使うことにしました。

またボイラープレートを少なくして開発体験をすっきりさせるため、私たちは[Storypug](https://www.npmjs.com/package/storypug)というパッケージを作りました。これには良い開発者体験のために必要な設定やヘルパーが含まれています。

皆さんもぜひ[Storypugのドキュメンテーション](https://www.npmjs.com/package/storypug)を読んでパッケージを試してみてください。フィードバックも大歓迎です！

## Pugコンポーネントをめぐる旅

Storybookへの移行によって私たちの開発ワークフローはどう変わったか？

まず第一に、Pugミックスインがビュー系ライブラリと同じような感覚で使えるようになりました。例えば`Button`コンポーネントのファイルはこういう感じになります。

`Button.pug`:

```plain text
mixin Button(params={})
  - const props = Object.assign({ type: 'button'}, params)
  button.Button(type=props.type)&attributes(attributes)
    span.Button__label
      block

```

コンポーネントはこのようにページテンプレートに読み込んで使えます。

`about.pug`:

```plain text
include /components/Button/Button.pug

form(method="post")
  //- ...
  +Button({ type: 'submit' }) Send

```

2つめの恩恵は、前出のスニペットからもご想像いただけるように、コンポーネント駆動開発のアプローチによって**コンポーネント基準でプロジェクトを構成**できるようになったことです。これはフォルダのツリー構成にも反映されます。例えば次のような配置になります。

```plain text
- components/
  - Button/
    - Button.pug <-- Pugコンポーネント
    - Button.js <-- JavaScriptの振る舞い
    - Button.scss <-- スタイル
    - Button.stories.js <-- Storybookのストーリー
    - Button.test.js <-- ユニットテスト

```

Storybookについてはどうでしょう？　前出の例のうち、ストーリーファイルは次のようになります。

`Button.stories.js`:

```plain text
import { renderer } from 'storypug'
import Button from './Button.pug'

const { html } = renderer()

export default {
  title: 'Components/Button',
}

// ただのボタンを描画
export const Default = () => html(Button, {}, 'Label')

// 送信ボタンを描画
export const Submit = () => html(Button, { type: 'submit' }, 'Send')

```

以下が最終的な結果です。

![](https://standard.shiftbrain.com/assets/img/blog/cdd-for-static-deliverables/storybook-button.png)

Storybookに描画されたButtonコンポーネントのストーリー

### バリエーションのテスト

Storybookを使ってコンポーネントを個別に開発することによって、同じコンポーネントの複数の状態やバリエーションをテストできるようになります。

次のようなPugとCSSによる`Media`コンポーネントを考えてみましょう。

`Media.pug`:

```plain text
mixin Media(params={})
  - const props = Object.assign({ image: '', reverse: false }, params)
  .Media(type=props.type, class={ '-reverse': props.reverse })&attributes(attributes)
    img.Media__image(src=props.image)
    .Media__body
      block

```

```plain text
.Media {
  display: flex;
}

.Media__image {
  flex: 0 0 auto;
}

.Media.-invert {
  flex-direction: row-invert;
}

```

- `invert`バリアントがどのように描画されるかを検証するのに、2つの異なるストーリーを作ってもいいでしょう。

しかしより有力なソリューションは、[Storybook Addon Knobs](https://www.npmjs.com/package/@storybook/addon-knobs)を使ってコンポーネントの属性を動的に書き換えることです。

この手法の優れた点は、**複数のバリアントの組み合わせを同じストーリーでテストできる**ことです。

以下の例では`boolean`ノブを使って`reverse`属性の値をトグルし、同時に`select`ノブでアスペクト比の異なる2つの画像を切り替えられるようにしています。

`Media.stories.js`:

```plain text
import { withKnobs, boolean, select } from '@storybook/addon-knobs'

import { renderer } from 'storypug'
import Media from './Media.pug'

const { html } = renderer()

const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/350x150',
]

export default {
  title: 'Components/Media',
  decorators: [withKnobs],
}

export const Default = () =>
  html(
    Media,
    {
      image: select('Image', images, images[0]),
      reverse: boolean('Reverse Style', false),
    },
    '<p>Contents...</p>',
  )

```

このストーリーはブラウザでは以下のように見えます。

### JavaScriptインタラクションの実装

Pugテンプレートに限らず、HTMLコンポーネント駆動のプロジェクトでJavaScriptを扱おうとすると、インタラクションをどこで、どのように登録するかという疑問が頭をもたげます。

「どこで」については、**JavaScriptを機能コンポーネントに収める**ことをお勧めします。機能コンポーネントとは、Atomic Designの方法論にある[**organism**](https://bradfrost.com/blog/post/atomic-web-design/#organisms)[の定義](https://bradfrost.com/blog/post/atomic-web-design/#organisms)を真似て言うと、複数のコンポーネントの集まりで、比較的複雑な、インターフェース上で明確に区分できるセクション、と言えます。HTMLとCSSだけから成り立っているシンプルなボタンなどプリミティブな単機能のコンポーネントに対し、画像ギャラリーやフォーム、モーダルのような「複合体」コンポーネントは、JavaScriptのロジックを閉じ込めるにはうってつけです。

「どのように」については、プロジェクトの性質と要件によります。私たちは多くのプロジェクトで[**Stimulus**](https://stimulusjs.org/)を使っています。ページを静的あるいは動的にサーバーサイドで生成するタイプのプロジェクトにおいて、フロントエンドのコードベースをシンプルに、整理された状態に保つように作られたフレームワークです。

Stimulusのコントローラーを機能コンポーネントにマップすれば、コンポーネントをStorybook内で個別に開発できます。

例として検索コンポーネントを作ってみましょう。

`Search.pug`:

```plain text
//- load children components
include /components/Button/Button

mixin Search(props={})
  form.Search(
    action="/search"
    role="search"
    data-controller="search"
    data-action="search#send"
  )
    label.Search__field
      span.Search__label Keywords
      input.Search__input(type="search" name="keywords" data-target="search.keywords")
    +Button({ type: 'submit' }) Search

```

コントローラーは次のようになります。

`Search.js`:

```plain text
import { Controller } from 'stimulus'

export default class SearchController extends Controller {
  static targets = ['keywords']

  send(e) {
    e.preventDefault()
    const query = this.keywordsTarget.value.trim()

    if (!query) {
      alert(`Type a keyword!`)
      return
    }
    alert(`Fetching results for: "${query}"...`)

    // fetch search results...
  }
}

```

コントローラーを初期化するにあたっては、Stimulusが自身の状態を管理するためのコンテナ（`Application`クラスのインスタンス）に登録しておく必要があります。通常Stimulusの`Application`クラスは`html`要素に結びつけられますが、私たちのケースではコンポーネントごとに個別のコンテキストが必要です。これを解決するため、私たちはStorypugの[`render`](https://www.npmjs.com/package/storypug#render-to-a-dom-element)関数を使っています。これによりPugコンポーネントをラッパー要素内のDOMツリーに描画することが可能になります。そしてこのラッパー要素を、検索コンポーネントだけを子コントローラーとして持つローカルの（個別の）アプリケーションを初期化するために利用するのです。

`Search.stories.js`:

```plain text
import { renderer } from 'storypug'
import Search from './Search.pug'
import { Application } from 'stimulus'
import SearchController from './Search'

const { render } = renderer()

export default {
  title: 'Components/Search',
}

export const Default = () => {
  // render instead of returning the raw HTML
  const wrapper = render(Search)

  // initialize a local stimulus application
  const application = Application.start(wrapper.el)

  // register (initialize) the Search controller
  application.register('search', SearchController)

  // return the application wrapper element
  return wrapper.el
}

```

以下は実際に動いているコンポーネントのデモです。

### テストプロセスの改善

コンポーネント駆動開発とStorybookによって得られるさらなる恩恵として、コードベースにユニットテストを導入しやすくなるという点があります。

一般にフロントエンドのプロジェクトではユニットテストよりもインテグレーションテストを重視するのが[ベストプラクティス](https://kentcdodds.com/blog/write-tests)とされています。しかし私たちの場合、[**スナップショット**](https://jestjs.io/docs/en/snapshot-testing)と呼ばれる手法によって、ユニットテストについても恩恵を受けられます。スナップショットはもともと、Jestフレームワークによって広められたものです。

スナップショットを使うと、Jestはまずコンポーネントによって描画されたHTMLを保存し、そしてテストを実行してコンポーネントのHTMLが保存されたものと一致するかを検出します。これにより、コンポーネントやその子孫に変更を加えたときに起こる非一貫性やエラーを追跡できます。そしてより重要なのは、コンポーネントが想定どおりに描画されているかどうかを検証できることです。

Storybookの最新バージョンでは、ストーリーをテストファイルにインポートすればそのままスナップショットテストに使えます。

`Button.test.js`:

```plain text
import { Default, Submit } from './Button.stories'

describe('Button', () => {
  test('matches the Default snapshot', () => {
    expect(Default()).toMatchSnapshot()
  })
  test('matches the submit snapshot', () => {
    expect(Submit()).toMatchSnapshot()
  })
})

```

[Storypugのドキュメンテーション](https://www.npmjs.com/package/storypug)では、`.pug`テンプレートをテストファイルで使うときJestをどのように設定すればいいかを詳しく解説しています。

## チーム全体のための方法論

ここまでStorybookとコンポーネント駆動開発の利点について開発者の立場から見てきました。しかし実際には、この手法が可能にする開発ワークフローは、チームの全体がその恩恵を受けられるものです。

### 内部チームに向けて

実際、アジャイルの手法を開発に取り入れたとしても、様々な分野の専門性を持ったメンバー間で仕事の進捗を共有するのは難しいことがあります。

しかしもしデザイナーやプロジェクトマネジャーに対し、閲覧しやすく、いい感じにまとめられたプレビューを見せることができれば、早い段階でのフィードバックや検証がもらいやすくなります。

小さなプロジェクトなら、Storybookを静的にビルドしてウェブ上のプライベートな場所に上げ、チームメンバーとシェアしてもいいでしょう。

複数の開発者が関わるような大規模プロジェクトの場合、すべてのブランチでプッシュするごとにスタイルガイドを最新の状態にするような、継続的デプロイのシステムを構築するとよいでしょう（このようなタスクの有力候補は[Netlify](https://www.learnstorybook.com/intro-to-storybook/react/en/deploy/)です）。

バックエンド開発者もまた、これまで述べてきたコンポーネント駆動開発からの恩恵を受けられます。フロントエンドとバックエンドのテンプレート実装が異なる場所で進められているとき、バックエンド開発者にとってにとってのStorybookは、コンポーネントを閲覧できるディクショナリでもあり、最終版のリリース可能な実装を検証するためのベンチマークでもあります。

### ステークホルダーに向けて

もうひとつ、コンポーネント駆動開発とStorybookを使って有用だと感じのは、クライアントやステークホルダーとのコミュニケーションをより良いものにしてくれるという点です。

ページテンプレートの開発というものは、とくにプロジェクトの初期段階では、開発者の努力や進捗がステークホルダーから見えない状態が長く続きがちです。

そこでStorybookのようなスタイルガイドをステークホルダーに公開すれば、チームがプロジェクトにしっかりコミットしていることを伝えられます。またコンポーネントの面で見ると、例えばオフキャンバスメニューのような、シンプルだと*思われている*UIを作るのにどのような努力が払われているかを示す成果物にもなります。

### ドキュメンテーションツールとして

その上、バージョン5.2の最新機能である[Docsアドオン](https://medium.com/storybookjs/storybook-docspage-e185bc3622bf)があれば、**Storybookを本格的なドキュメンテーションツールとして使うことができます**。

StorybookはJavaScriptのストーリーのほか、MarkdownとMDXファイルをサポートしているので、開発者だけでなく非開発者も、コンポーネントのリッチなドキュメンテーションやデザインガイドライン、組み込みガイドを書くことが可能です。

ReactコンポーネントをサポートするMarkdown拡張であるMDXを使えば、プロジェクトのタイポグラフィやカラーパレットをグラフィカルで直観的な形式で展開するビルトインコンポーネントも利用できます（くわしくは[こちらの記事](https://medium.com/storybookjs/rich-docs-with-storybook-mdx-61bc145ae7bc)をご覧ください）。

## まとめ

開発のプロセスやツールをStorybookへと移行するのは、ときに困難なこともありました。しかし最終的には、静的なHTMLのためのコンポーネント駆動開発手法の可能性に大きな価値を感じることができました。

この記事では主にPugにフォーカスしましたが、NunjucksやTwigなど、静的サイトジェネレーターで広く使われているどのようなテンプレートエンジンでも、この手法は適用可能です。