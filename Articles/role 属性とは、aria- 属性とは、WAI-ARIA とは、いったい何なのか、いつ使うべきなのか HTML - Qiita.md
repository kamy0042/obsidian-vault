---
タグ: []
作成日時: 2024-10-01T23:27:00
Tags: [topic/アクセシビリティ/WAI-ARIA]
---
[https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc)

![[https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-412672c5f0600ab9a64263b751f1bc81.png]]

最近、いくつかの場面でWebアクセシビリティについて、コーディングに関する技術的な説明をする機会がありました。そのなかで、そもそもWAI-ARIAというものが、どういう立ち位置のものなのかがわかりづらい状態にあるということに気付きました。その結果として、WAI-ARIAの活用を含めたWebアクセシビリティ向上に取り組むことへのネガティブな印象が生まれてしまったり、理解が足りないままWAI-ARIAの属性を使うことでかえって問題が発生しやすくなってしまったりしている現状があるのではないかと思うようになりました。

そこでこの記事では、なるべくわかりやすい形で、WAI-ARIAそのものや、その中で登場する `role` 属性や、名前に `aria-` のプレフィックスをもつ属性（総称して 「`aria-*` 属性」と表記します）の使い道や使うべきタイミングについて解説してみたいと思います。

この記事はいろいろなドキュメントへの参照や引用文が含まれます。なるべく根拠を示しながら説明したいためリンクを張りますが、この記事を読むのを途中でやめて原文を読みにいく必要はありません。引用文については、まず原文（英語）を引用し、続けて日本語訳が存在しているものについては日本語訳からの同じ部分の引用を、日本語訳が見当たらないものについては筆者が翻訳したものを掲載します。引用文についても日本語訳のみを読んで理解・納得できるのであれば、必ずしも原文を読む必要はありません。

## `role` 属性の値や `aria-*` 属性は、WAI-ARIAの仕様で定義されている

アクセシビリティの話題や、あるいはアクセシビリティを意識したHTMLの実装には、しばしば `role` 属性や、名前が `aria-` で始まる属性（`aria-label` とか、 `aria-describedby` とか、 `aria-expanded` とか……）が登場します。これらは[HTMLの仕様](https://html.spec.whatwg.org/)ではなく、 Accessible Rich Internet Applications (WAI-ARIA)という仕様によって定められています。

- [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [Accessible Rich Internet Applications (WAI-ARIA) 1.2 日本語訳](https://momdo.github.io/wai-aria-1.2/)

これらの属性が何なのか、どんなときに使うべきなのかは、WAI-ARIAへの理解が必要です。ところが、この仕様書をいきなり読んだところで、WAI-ARIAが何を目的としていて、どんなときに使うべきなのかを読みとるのは難しいでしょう。なぜなら、この仕様書はWebサイト製作者やWebアプリケーション開発者に向けて書かれたものではないからです。

### WAI-ARIA スイート

WAI-ARIAの仕様書の「概要」のセクションには以下のような一文が書かれています。

> 
> This document is part of the WAI-ARIA suite described in the [WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/).
> 
> [Abstract - Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/#abstract)

> 
> この文書は、[WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/)で説明されているWAI-ARIAスイートの一部と位置付けられている。
> 
> [概要 - Accessible Rich Internet Applications (WAI-ARIA) 1.2 日本語訳](https://momdo.github.io/wai-aria-1.2/#abstract)

つまりこの仕様書こそがWAI-ARIAなのではなく、「WAI-ARIAスイートの一部」でしかないというのです。この[WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/)のページには、「スイート（suite）」と名のつくとおり、WAI-ARIAには仕様書以外にもいろいろな文書が紹介されています[1](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc#fn-suite)。

- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)（[日本語訳](https://momdo.github.io/wai-aria-1.2/)）
- [Core Accessibility API Mappings 1.2](https://www.w3.org/TR/core-aam-1.2/)
- [Accessible Name and Description Computation 1.2](https://www.w3.org/TR/accname-1.2/)（[日本語訳](https://momdo.github.io/accname-1.2/)）
- [HTML Accessibility API Mappings 1.0](https://www.w3.org/TR/html-aam-1.0/)
- [SVG Accessibility API Mappings 1.0](https://www.w3.org/TR/svg-aam-1.0/)

このなかで、一般のWebページ製作者・Webアプリケーション開発者を主な読者の対象と書かれているのはARIA Authoring Practices Guide (APG) だけです。それ以外の文書は、Webブラウザや支援技術（スクリーンリーダーなど）やその他の「ユーザーエージェント」の開発者、Web技術そのものの開発者、アクセシビリティ評価ツールの開発者を主な読者層として想定しています。

この記事を読んでいる人のほとんどはブラウザを開発したり、支援技術を開発したり、アクセシビリティ評価ツールを開発したりしていないでしょう。仕様書よりAPGのドキュメントのほうが読みやすいはずです。

## WAI-ARIAとは何なのか

APGの[ARIA Basics](https://www.w3.org/WAI/ARIA/apg/about/aria-basics/) には、WAI-ARIAが何なのかについての説明が書かれています。APG内にあるので、もちろんWebページ製作者・Webアプリケーション開発者向けの説明になっています。

原文の英語の引用の後ろに、筆者による日本語訳を載せます。

> 
> ARIA, which stands for Accessible Rich Internet Applications, refers to a set of more than 150 declarations that can be added into web page code so assistive technologies, such as screen readers, can understand how to present the page. For example, the text "Home" might be visually presented as a heading, an interactive link or button, or as the label for a phone number. If the web code does not declare what the element containing that text represents, a screen reader cannot present it to a blind user in an accessible way.
> 
> The declarations that can be made with ARIA are defined by the [WAI-ARIA Specification](https://www.w3.org/TR/wai-aria/). These attributes and other features required to make sites usable by people who rely on assistive technologies or keyboard navigation are not natively included in the languages used to create web sites, such as HTML, JavaScript, CSS, and SVG.
> 
> [What is ARIA? - ARIA Basics | APG](https://www.w3.org/WAI/ARIA/apg/about/aria-basics/#whatisaria?)

> 
> ARIAは Accessible Rich Internet Applicationsの略で、スクリーンリーダーのような支援技術が、ページをどのように提示するかを理解できるように、Webページのコードに追加して利用できる150以上の宣言のセットです。たとえば「Home」というテキストは見出しかもしれないし、インタラクティブなリンクやボタンかもしれないし、電話番号に対するラベルかもしれません。Webのコードがそのテキストを含む要素が何を表現しているのかを宣言してくれなければ、スクリーンリーダーはそれをアクセシブルな方法で視覚障害者のユーザーに提示できません。
> 
> ARIAで使われる宣言は[WAI-ARIA仕様書](https://www.w3.org/TR/wai-aria/)で定義されています。支援技術やキーボードナビゲーションを使うユーザーがサイトを使うのに必要なこれらの属性や機能は、HTML、JavaScript、CSS、SVGのような、Webサイトを作るのに使われる言語にはネイティブに含まれていません。

WAI-ARIAはHTMLなどがネイティブにサポートしていない、スクリーンリーダーのような支援技術やキーボードナビゲーションに必要な情報を伝えるためのコードに追加して利用できる宣言というのが `role` 属性の値や `aria-*` 属性のことでしょう[2](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc#fn-count-attributes)。

### ロール、プロパティ、ステート

そして、これに続く「Accessibility semantics」の説明に、ようやく「ロール」が登場します。また英語の引用文の後ろに筆者による日本語訳を載せます。

> 
> Accessibility semantics refer to the meaning of user interface elements that need to be conveyed to assistive technology users in order for those users to understand and use the elements.
> 
> （中略）
> 
> The types of accessibility semantics that may be required to make an element accessible include:
> 
> - Role: The type of element, e.g., "button" or "list". ARIA includes more than 80 roles that can be declared in content.
> - Properties: Attributes that provide information about the nature of an element, such as its name, orientation, or position in a set.
> - State: A dynamic property, such as selected, checked, or disabled, whose value may be changed by users or application events.
> 
> [What Are Accessibility Semantics? | APG](https://www.w3.org/WAI/ARIA/apg/about/aria-basics/#whatareaccessibilitysemantics?)

> 
> アクセシビリティセマンティクスとは、支援技術のユーザーがユーザーインターフェース上の要素を理解して使用するために、支援技術に伝えられる必要のある、それらの要素のもつ意味を指します。
> 
> （中略）
> 
> 要素をアクセシブルにするために必要なアクセシビリティセマンティクスの種類には以下が含まれます:
> 
> - ロール: 「ボタン」や「リスト」などの要素の種類。ARIAにはコンテンツの中で宣言できる80以上のロールがあります
> - プロパティ: 名前や向きやセット内の位置など、要素の性質についての情報を提供する属性
> - ステート: 選択されている、チェックされている、無効になっているなどの、ユーザーの操作やアプリケーションのイベントにより変化する動的なプロパティ

これらのアクセシビリティセマンティクスのうち、ロールはそのまま `role` 属性、プロパティとステートは `aria-*` 属性によって表現することが[WAI-ARIAの仕様書に書かれています](https://www.w3.org/TR/wai-aria-1.2/#host_languages)（[日本語訳](https://momdo.github.io/wai-aria-1.2/#host_languages)）。

プロパティとステートは、値の変更されやすさによって区別されているものの、非常に似た性質をもちます。仕様書の中でも「[ステートとプロパティの区別はほとんどのウェブコンテンツ著者に取るに足りないことである](https://momdo.github.io/wai-aria-1.2/#statevsprop)（[the distinction between states and properties is of little consequence to most web content authors](https://www.w3.org/TR/wai-aria-1.2/#statevsprop)）」とまで書かれていて、属性名からもそれらの明確な区別を読み取れるようにはなっていません。実際に筆者の経験の上でも、あまり意識して区別する必要は感じていません。

WAI-ARIA Overviewで触れられている、APGとWAI-ARIA仕様書以外の文書には、「アクセシビリティAPI」とWAI-ARIAセマンティクスとのマッピングが含まれています（[Core Accessibility API Mappings 1.2](https://www.w3.org/TR/core-aam-1.2/)）。アクセシビリティAPIというのはOSが支援技術に提供しているAPIで、これを通してスクリーンリーダーなどの支援技術が各アプリケーションの情報を取得したり、操作したりしています。また、HTMLの要素や属性とアクセシビリティAPIとのマッピングも含まれています（[HTML Accessibility API Mappings 1.0](https://www.w3.org/TR/html-aam-1.0/)）。これらを通して、支援技術がWebページとユーザーの間に立ち、情報を伝達することができるようになっているのです。

### つまり、WAI-ARIAとは何なのか

ここまでの内容をまとめると以下のような感じです。

- WAI-ARIAは、Webページの情報をスクリーンリーダーのような支援技術に伝え、ユーザーがWebページを使えるようにするためのアクセシビリティセマンティクスを提供します
- WAI-ARIAの仕様には、HTMLなどのWebコンテンツ言語に含まれていない、支援技術やキーボードナビゲーションに必要な機能が含まれています
- WAI-ARIAが提供するアクセシビリティセマンティクスには、ロール、プロパティ、ステートがあり、これらが `role` 属性や `aria-*` 属性としてHTMLで使用できます

## ARIA in HTML

WAI-ARIAはHTMLやSVGの仕様からは独立しています。これによってHTMLでもSVGでも、あるいは（将来使われるようになるかもしれない）ほかの「ホスト言語」であっても、共通してWAI-ARIAのセマンティクスが使えて、支援技術やキーボードナビゲーションに対応できるようになっています。

HTMLでWAI-ARIAの属性が使えるようになるためには、HTMLの仕様からもWAI-ARIAが参照され、WAI-ARIAの属性が使えることが定義されていなければなりません。[HTMLの仕様書](https://html.spec.whatwg.org/)（[日本語訳](https://momdo.github.io/html/)）では、WAI-ARIAへの言及はほとんどありませんが、数少ないWAI-ARIAへの言及である「[Element Definitions](https://html.spec.whatwg.org/#element-definitions)（[要素定義](https://momdo.github.io/html/dom.html#element-definitions)）」に、重要なことが書かれています。

> 
> Accessibility considerations
> 
> For authors: Conformance requirements for use of ARIA `role` and `aria-*` attributes are defined in ARIA in HTML. [[ARIA](https://html.spec.whatwg.org/#refsARIA)] [[ARIAHTML](https://html.spec.whatwg.org/#refsARIAHTML)]
> 
> For implementers: User agent requirements for implementing accessibility API semantics are defined in HTML Accessibility API Mappings. [[HTMLAAM](https://html.spec.whatwg.org/#refsHTMLAAM)]
> 
> [Element Definitions - HTML Standard](https://html.spec.whatwg.org/#element-definitions)

> 
> アクセシビリティの考慮
> 
> 著者向け：ARIA `role`および`aria-*`属性の使用に関する適合要件は、ARIA in HTMLで定義される。[[ARIA](https://momdo.github.io/html/references.html#refsARIA)] [[ARIAHTML](https://momdo.github.io/html/references.html#refsARIAHTML)]
> 
> 実装者向け：アクセシビリティAPIセマンティックスを実装するためのユーザーエージェント要件は、HTML Accessibility API Mappingsで定義される。[[HTMLAAM](https://momdo.github.io/html/references.html#refsHTMLAAM)]

ここでいう「著者（authors）」はWebページの作成者、「実装者（implementers）」はユーザーエージェント（Webを解釈するプログラム）の開発者を指します。つまり、Webサイト製作者やWebアプリケーション開発者は、ARIA in HTMLを読むのがよさそうです。

- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [ARIA in HTML 日本語訳](https://momdo.github.io/html-aria/)

ARIA in HTMLには、HTMLでWAI-ARIAを意識してコーディングすることで重要なことが書かれています。HTML内でWAI-ARIAの属性を使う上での前提知識として、このあたりも頭に入れておいたほうが良いでしょう。ところが、ARIA in HTMLからもWAI-ARIA仕様書が参照されていたりして、結局何から読むべきかわからない状態になってしまいます。そこでここからは、なるべくWebサイト制作者やWebアプリケーション開発者向けに、ARIA in HTMLに書かれている重要なことを説明してみます。

### 暗黙のWAI-ARIAセマンティクス

HTML内でWAI-ARIAの属性を使う上で重要なのは、 「HTMLの要素は暗黙のWAI-ARIAセマンティクスを持つ」ということです。暗黙（implicit）というのは、 `**role**`** 属性や **`**aria-***`** 属性を書かなくても、明示的（explicit）に書いたのと同じ状態になっている** ということです。

たとえばHTMLの `<button>` 要素は、あきらかにボタンです。

```plain text
<button>送信</button>

```

上記のコードで示されているボタンは、WAI-ARIAの`role` 属性や `aria-*` 属性がなくても、以下のようなセマンティクスを持っています。

- ボタンというロール
- 「送信」という名前（プロパティ）

つまり、HTMLのネイティブな機能だけで、「『送信』という名前のボタン」であることを表現できているのです。これらは、ロールを指定するために `role="button"` 、名前を指定するために `aria-label="送信"` というWAI-ARIAの属性を付けても、同じセマンティクスを表現できます。しかし、そんなことをしなくても、Webに対応した全てのスクリーンリーダーが上記のコードだけで「『送信』という名前のボタン」であることを理解できるはずです。

```plain text
<!-- こんな書き方をしなくても、「『送信』ボタン」であることは伝わります -->
<button role="button" aria-label="送信">送信</button>

<!-- 上のコードのWAI-ARIAセマンティクスは、これと同じです -->
<button>送信</button>

```

このような暗黙のWAI-ARIAセマンティクスは、多くの要素・属性に設定されています。その内容は[HTML Accessibility API Mappings 1.0](https://www.w3.org/TR/html-aam-1.0/)に定義されています。

とはいえ、ほとんどのWebサイト制作者やWebアプリケーション開発者は、この暗黙のセマンティクスをわざわざ憶える必要はありません。HTMLの要素や属性をそれらの目的通りに使っていれば、それらの目的にあわせた暗黙のWAI-ARIAセマンティクスを持つようになっています。

WAI-ARIAの属性は、HTMLのような「ホスト言語」のネイティブな機能を補うことを意図して作られています。中にはWAI-ARIAの属性を使わなければ表現できないアクセシビリティセマンティクスもあり、その場合にはWAI-ARIAの属性を使う必要があります。しかし、HTMLがネイティブにサポートしている（つまり暗黙のWAI-ARIAセマンティクスがある）ロール・プロパティ・ステートについては、わざわざ `role` 属性や `aria-*` 属性を付ける必要はありません。

### WAI-ARIAセマンティクスとHTMLのコンフリクト

HTMLのネイティブな機能とWAI-ARIAの属性に重複しているものがあるとすれば、当然、それらが衝突することもあります。WAI-ARIAの仕様では、そういった場合には基本的にWAI-ARIAの属性が採用され、スクリーンリーダーのような支援技術に提示されることが原則となっています。

```plain text
<!-- h1要素は暗黙うちに aria-level="1" （見出しレベル1）のセマンティクスを持つが、
     aria-level属性が明示的に指定されたことで見出しレベル2に変更されている。 -->
<h1 aria-level="2">これは見出しレベル2です</h1>

```

このおかげで、いろいろな事情があってマークアップに大規模な変更を入れにくい場合であっても、 `role` 属性や `aria-*` 属性をつけることによって多少なりともマシなセマンティクスを伝えることができたりします。一方、WAI-ARIAの属性がセマンティクスを上書きしてしまうことで、誤った属性値を使ってしまうとアクセシビリティを下げてしまうことも起こり得ます。しかも、「普通」の動作確認ではその誤りに気付けません。スクリーンリーダーのような支援技術のユーザーが、開発者の気付かないところでWebサイトやWebアプリケーションを使えなくなっているということが起こります。

さきほど、「原則としてWAI-ARIAの属性の値が使われる」と書きましたが、原則には例外がつきものです。例外として、「強いネイティブセマンティクス」という、WAI-ARIAの属性の値が無視される場合も存在します。

```plain text
<label>
  <input type="checkbox"
    checked="checked"
    aria-checked="false"
  >
  このチェックボックスは、チェックされているでしょうか？
</label>

```

たとえば上記の例では、HTMLの `checked` 属性がついています。しかしチェック状態を表現するWAI-ARIAの属性である `aria-checked` の値は `false` になっていて、つまりチェックされていないことを表現しようとしています。チェック状態について矛盾が発生しています。

この場合、`aria-checked` は無視され、HTMLネイティブの `checked` 属性値のみが支援技術に提示されることが[HTML Accessibility API Mappings 1.0に定められています](https://www.w3.org/TR/html-aam-1.0/#att-checked)。そうしなければ、チェックされている状態のはずのチェックボックスが、チェックされていない状態としてスクリーンリーダーのような支援技術に理解されてしまい、ユーザーに正しい情報を伝えられなくなってしまいます。

暗黙のWAI-ARIAセマンティクスや強いネイティブセマンティクスのように、HTMLの中でWAI-ARIAの属性を使う上では複雑なルールが定められています。WAI-ARIAの属性をただ闇雲に付けていくと、こうしたルールの存在に気付くことはできませんし、そもそも暗黙のセマンティクスだけでもスクリーンリーダーのような支援技術へ充分な情報が伝わるようになっているものも多く、闇雲にWAI-ARIAの属性を使ったからといってアクセシビリティが高まるわけではありません。

### ARIAの誤った使用を回避するための著者ガイダンス

ARIA in HTMLでは、WAI-ARIAに複雑なルールが存在することや使用法を誤った場合の危険性の高さもあり、以下のような5項目で[Webサイト製作者やWebアプリケーション開発者向けのガイダンス](https://www.w3.org/TR/html-aria/#author-guidance-to-avoid-incorrect-use-of-aria)（[日本語訳](https://momdo.github.io/html-aria/#author-guidance-to-avoid-incorrect-use-of-aria)）を含めています。

- インタラクティブな要素を非インタラクティブなロールで上書きするのを避ける
- 冗長なロールの指定を避ける
- 副作用に気をつける
- ARIAのルールを遵守する
- HTMLのルールを遵守する

「インタラクティブな要素を非インタラクティブなロールで上書きする」の例として挙げられているのは、`<button>` 要素に対して `role="heading"` を指定するというものです。これをやってしまうと、ボタンにあるインタラクティブな機能があることが、スクリーンリーダーのような支援技術には伝わりません。

「冗長なロールの指定」は、たとえば `<button>` 要素に対して `role="button"` を指定するようなものです。暗黙のロールと同じロールを指定することは意味がなく、一方で「ロールを指定しなければならない」ようなコーディング規約にすることで、誤ったロールが付与されたり、次の「副作用に気をつける」の問題を発生させます。

「副作用」は、`role` 属性の指定をすることによって、スクリーンリーダーのような支援技術に伝わるべきだった情報が伝わらなくなることを指しています。例では `<summary>` 要素への `role="button"` の指定が挙げられています。`<summary>` 要素は多くのブラウザでボタンに近い振る舞いをしますが、[HTML Accessibility API Mappings 1.0では「WAI-ARIA 1.2に該当するロールなし」という扱いになっています](https://www.w3.org/TR/html-aam-1.0/#el-summary)。「該当するロールなし」のHTML要素は意外と多くあり、それらはWAI-ARIAの仕様にはロールが存在しないものの、WebブラウザとアクセシビリティAPIの間ではどんなUIなのかという情報がやり取りされています。それらを単なる「ボタン」などに上書いてしまうと、支援技術のユーザーが知れるはずだった情報を得られないことにつながります。

「ARIAのルール」「HTMLのルール」に関しては特に触れることはありません。それぞれ、仕様として認められるものとそうでないものがあり、それらを遵守しなかった場合には意図しない結果となる可能性があります。

## No ARIA is better than Bad ARIA

実際にWAI-ARIAをどう使っていくと良いのかは、APGの[Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)や[Practices](https://www.w3.org/WAI/ARIA/apg/practices/)のドキュメントや、実装サンプルを見ていくのが良いでしょう。そしてこれらのページの冒頭には、[Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)へのリンクが貼られています。ここには No ARIA is better than Bad ARIAとして、WAI-ARIAの属性を使う上で重要な2つの原則が紹介されています。

この2つはNo ARIA is better than Bad ARIA（悪いARIAよりもARIA無しのほうが良い）が何故そうなのかを直接的には説明してくれない印象があります。しかし、ここまでの内容と以下の2つの原則を読めば、悪いARIAとは何なのか、ARIA無しでも良いのかどうか、理解できるのではないかと思います。

### 原則1: ロールは、約束である

例として挙げられているのは以下のコードです。

```plain text
<div role="button">Place Order</div>

```

`role` 属性として `button` を指定しています。つまりスクリーンリーダーのユーザーは、これを「『Place Order』というボタン」として認識します。ボタンである以上、これをクリックすると（ECサイトなどの）注文ができるとユーザーは期待するはずです。

しかし `<div>` 要素は本来はボタンではありません。クリックに反応したりしてくれないし、キーボードで操作したりもできません。もし `<div>` をボタンとして `button` ロールを使用するのであれば、`<button>` 要素と同じように、クリックだけでなく、キーボードでフォーカスできてSpaceキーやEnterキーでも操作できる必要があります。ボタンとして完璧に振る舞うよう、見た目をCSSで、挙動をJavaScriptで記述しなければなりません。

ロールを指定するということは「このロールに期待されることは、この要素がすべて満たしています」というユーザーに対する約束であるというのが、原則の1つめです。

### 原則2: ARIA は情報を隠してしまうことも拡張することもでき、パワーと危険の両方をもたらす

2つめの原則に挙げられている内容は、これまでの説明でも触れてきたものです。WAI-ARIAはHTMLのようなホスト言語のネイティブの機能を拡張することものできますが、一方でホスト言語の機能を隠してしまうこともあります。

以下の例では、`role="menuitem"` ロールをつけることで、リンクがメニュー項目であることを伝えたり、`aria-label` 属性を使って、リンクのテキストとは別の内容を支援技術に対して伝えています。

```plain text
<a role="menuitem">Assistive tech users perceive this element as an item in a menu, not a link.</a>
<a aria-label="Assistive tech users can only perceive the contents of this aria-label, not the link text">Link Text</a>

```

以下の例では `aria-pressed` 属性を使って、ボタンがトグルボタンであることを伝えています。

```plain text
<button aria-pressed="false">Mute</button>

```

これらはHTMLのネイティブな機能だけでは実現できないものでした。これこそがWAI-ARIAのパワーです。

一方で、WAI-ARIAは危険ももたらします。`role` 属性が暗黙のロールを上書きしてしまうことで、HTML要素のネイティブの機能が損なわれる（ARIA in HTMLで「副作用」と呼ばれていたものです）ことがあったり、WAI-ARIAを使って情報を伝えようとしたが、仕様の理解に間違いがあったりコーディングにミスがあったり、支援技術の側が対応していなかったりすることによって上手くいかない、つまりユーザーがWebサイトやWebアプリケーションを使えなくなるということが起こりやすくなってしまいます。強力なパワーを持つものだからこそ、慎重に扱わなければなりません。

## WAI-ARIAの属性は、いつどうやって使うべきものなのか

ここまで触れてきたように、WAI-ARIAの属性はHTMLのネイティブの機能と重複する部分もあり、そもそもHTMLのネイティブの機能が暗黙のWAI-ARIAセマンティクスを持っており、そして強力なパワーがあるぶん慎重に使う必要のあるものです。だからこそ、「いつ使うべきか」がとても重要です。

私は、WAI-ARIAの属性は「使わなければいけない理由がなければ使わない」ようにするべきと考えています。たとえば以下のようなときには、WAI-ARIAの属性を使用します。

- HTMLのネイティブの機能だけではアクセシブルにできないとき
- HTMLの標準の仕様では実現できない・実現が難しいことをやろうとしているとき
- コードに大きな変更を加えづらい状況で、少しでもアクセシビリティを高めようとしているとき

### HTMLのネイティブの機能だけではアクセシブルにできないとき

たとえば、HTML内に `<svg>` 要素によってアイコンを配置するとき、視覚的にはアイコンの画像が配置されているように見えるでしょう。ふつう画像を配置するのに使われる `<img>` 要素には `alt` 属性があり、画像を代替するテキスト（名前）を提示することができます。ところが、`<svg>` 要素はそもそも、スクリーンリーダーによっては画像として認識しないことがあります。そこで、「画像」のロールと代替テキストを、 `role` 属性と `aria-label` 属性によって提供します。こういうケースは、HTMLのネイティブの機能だけではアクセシブルにできません。

```plain text
<!-- img要素は、暗黙のimgロールをもち、alt属性が名前となる -->
<img src="error.png" alt="エラー">

<!-- svg要素は、暗黙のロールはgraphics-documentで、「画像」として扱われないことがある
     そのためimgロールを明示し、さらにaria-label属性で名前をつけている -->
<svg role="img" aria-label="エラー">
  ...
</svg>

```

ほかにも、APGの[Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)にある[Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)や[Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)あたりのパターンは、HTMLに「タブ」や「ツリー」を表現する要素がありません。ボタンを並べたりリストをネストさせたりして、それらしい見た目や挙動を作ることはできても、それが「タブ」や「ツリー」であることをスクリーンリーダーのような支援技術に伝えることはできません。こういったUIも、WAI-ARIAを使わなければアクセシブルな実装ができないものです。

### HTMLの標準の仕様では実現できない・実現が難しいことをやろうとしているとき

HTMLの要素が用意されているUIであっても、似たようなものを作らなければいけないケースというのは存在します。たとえばセレクトボックスの選択肢にスタイルをあてて区別を付けやすくしたいとか、データが数万行あるテーブルを作りたいとか、そういった場合です。こういう場合、 `<select>` 要素や `<table>` 要素ではそもそも実装ができなかったり、要素の親子関係の制約などから難しくなったりして、`<span>` や `<div>` やその他の要素を組み合わせて作らざるを得なくなります。

もちろん、そもそもそれが必要なのかは問う必要があります。HTMLに用意されている要素を使うほうがいろいろなリスクは低くなる場合があります。アクセシビリティは明らかに損われやすくなります。そうまでしてやる必要があるものなのかは真剣に考えなければなりません。

しかしそれでもやる必要があるのなら、すこしでもアクセシビリティが高い状態で世に出していくしかありません。そんなときにはWAI-ARIAの属性の出番になります。

### コードに大きな変更を加えづらい状況で、少しでもアクセシビリティを高めようとしているとき

これはすこし毛色が違う話かもしれません。長期間にわたって運用されているWebサイトやWebアプリケーションでは、ちょっとした改修すらも難しくなってしまっている場合があります。長い期間をかけて継ぎ足しつづけられた秘伝のタレのようなシステムでは、要素の種類すら変えるとスタイルが崩れてしまったり、E2Eテストが落ちてしまって誰も直せなくなってしまっていたり、アクセシビリティ改善の施策を打とうにも手の出しようがないという状況になっていたりします。

WAI-ARIAはアクセシビリティセマンティクスを書き換える強力なパワーがあるので、コードを大々的に書き換えることはできなくても、属性を足すくらいならどうにかなる、というときの助け舟になれる可能性があります。あくまで対処療法であり、保守性を失なってしまっていること自体を直していくべきですが（そしてだいたい、そういう場所にはアクセシビリティ以外にももっともっといろんな問題が隠れています）、それを説明して開発予算を獲得して実際に開発してリリースするまでに何年もかかるより、WAI-ARIAの属性を足して来週リリースしたほうが良いというケースは充分に考えられます。

### いずれの場合も、支援技術での確認が必要

このようにWAI-ARIAを使うべき場面のみで使うようにしたとしても、**必ずWAI-ARIAを解釈できる支援技術を使って検証するべき** です。WAI-ARIAの `role` 属性や `aria-*` 属性は、スクリーンリーダーのような支援技術のみが参照しています。もし使い方を間違えたりしていても、支援技術を使っていない開発者は気付くことができず、支援技術のユーザーだけがひっそりとWebサイトやWebアプリケーションを使えない状況に追いやられてしまいます。

[日本の視覚障害者を対象にした調査](https://jbict.net/survey/at-survey-03)では、日本で最も使われているPC向けのスクリーンリーダーは[PC-Talker](https://www.aok-net.com/screenreader/)であり、スマートフォン向けのスクリーンリーダーはiOSのVoiceOverです。また、[世界的な調査](https://webaim.org/projects/screenreadersurvey10/)では、PC向けスクリーンリーダーとして[JAWS](https://www.extra.co.jp/jaws/)と[NVDA](https://www.nvda.jp/)が大きなシェアを占めます。

[Accessibility Support (a11ysupport.io)](https://a11ysupport.io/)には、各種スクリーンリーダーとブラウザの組み合わせで、WAI-ARIAのロールやプロパティやステートがサポートされているかどうかを確認することができます。ただしこのサイトには、日本国内のローカルなスクリーンリーダー製品であるPC-Talkerは掲載されていません。また、「Supported」といっても、そのサポートのされ方はスクリーンリーダーによって異なります。

WAI-ARIAの属性を使うのであれば、最低でも開発者が使っているOSとブラウザ、そのOS上で動くスクリーンリーダーでの動作確認をするべきで、さらに[クリエイター版 PC-Talker](https://www.aok-net.com/pctksdk.htm)やNVDAでの動作確認をしておくべきでしょう[3](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc#fn-screenreaders)。

また、 **WAI-ARIAの属性を使うことだけがアクセシビリティ向上ではない** ということも最後に強調しておきたいと思います。WAI-ARIAの属性を解釈できる支援技術のユーザーは多くはありません。あらゆる人がWebサイトやWebアプリケーションを使える状態をどう実現していくのかを、WAI-ARIAの属性を使う・使わないだけでなく、あらゆる角度から考える必要があると思います。

1. 
ここで紹介しているもののうち、ARIA Authoring Practices Guide (APG) のみWAI-ARIA Overviewページでは別立てで紹介され、残りのものはWAI-ARIA 1.2という見出しの下のリストで触れられています。APGにバージョニングがないこと、ほかの文書はW3Cの勧告プロセスに基いてリリースされていること、WAI-ARIA 1.2の仕様書内でほかの文書を参照していて、これらの文章を含めてWAI-ARIA 1.2が構成されているという扱いになっていることから、扱いに差があるのだろうと思われます。 [↩](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc#fnref-suite)
2. 
ロール（`role`属性の値になるものだが、一部は `role` 属性の値として使用することを禁止されているAbstract Role 12種類を含む）が94種類、`aria-*` 属性が48種類で、合計142種類です……。「more than 150 declarations」については、もうちょっとほかの何かまで数える対象に含めた数字なのかもしれません。 [↩](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc#fnref-count-attributes)
3. 
クリエイター版PC-TalkerとNVDAを例に挙げているのは、PC本体以外は費用なしで手軽に試せるものであり、特にクリエイター版PC-Talkerに関しては晴眼者（目が見えている人）の動作確認に使う意図で配布されているからです。[JAWSにもデモ版がありますが](https://www.extra.co.jp/jaws/Download/jfw_trial.html)、こちらは起動時間の制限があり、あくまで視覚障害者がJAWSの購入前に試用する目的のものと考えられます。WebサイトやWebアプリケーションの動作確認用として使用して問題ないのかは確認していません。 [↩](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc#fnref-screenreaders)