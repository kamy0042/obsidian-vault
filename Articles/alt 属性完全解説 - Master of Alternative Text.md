---
タグ: []
作成日時: 2024-12-19T21:23:00
URL: https://alt.lavoscore.org/
Tags: [topic/アクセシビリティ]
---
## [この文書について](https://alt.lavoscore.org/#about-this-page)

この文書は、2024年12月17日に私 [@debiru_R](https://twitter.com/debiru_R) によって記述されました。私は2000年頃より HTML, CSS を研究し始めましたが、2013年頃から MDN Web Docs（旧 Mozilla Developer Network）の日本語訳コントリビューターも務めており、MDN Web Docs や Wikipedia といった各種 Web コンテンツの HTML 関連の記事の整備に従事しています。

代替テキスト、特に `alt` 属性値について言及していますが、私の理解が不足している箇所があるかもしれません。内容に誤りや不適切な点があると判断された方は [@debiru_R](https://twitter.com/debiru_R) までお知らせいただけると幸いです。

余談ですが、この文書自体および本文中の**空要素（Void Element）**については、Self-Closing Tag（自己終了タグ）を書かないようにしています。歴史的には XHTML5 や[ポリグロット・マークアップ（Polyglot Markup）](https://momdo.github.io/html-polyglot/)という考え方もあったようですが、現在ではそうした考え方は否定されているようです。「[もうHTMLをXHTMLで書くことは推奨されないという話](https://www.mitsue.co.jp/knowledge/blog/frontend/202404/03_1140.html)」にも書かれていますが、空要素タグは `<elem />` ではなく `<elem>` と書くことが推奨されるようです。ただし、これは HTML 文脈の話です。SVG など別の文脈では要素名による空要素かどうかの判定が行われないため Self-Closing Tag を書かないと DOM 構造が意図しない形になります。

## [alt 属性とは](https://alt.lavoscore.org/#what-is-alt)

HTML には `**alt**`** 属性**というものが存在します。`alt` 属性を持てる要素は `<img>` の他に `<area>`, `<input type="image">` があります。`alt` は Alternative Text（代替テキスト）の **Alternative**（オルタナティブ）を略したものです。代替テキストを設定するための属性で、属性値として文字列を取ります。

一般に HTML において「要素」と「タグ」は別物であるため区別してください。ただし、この文書では「`<img>` 要素」のように、要素を示す際にはタグの形で示すことにします。これは `<input type="image">` のように属性を含めて要素を示したい場合に有用であり、また MDN Web Docs の流儀でもあります。

`alt` 属性以外の形で代替テキストを取る要素はいくつかあります。`<object>` や `<iframe>` あるいはかつて [HTML+ の仕様に存在していた](https://www.w3.org/MarkUp/HTMLPlus/htmlplus_21.html) `<image>` は、その内容（子孫コンテンツ）を代替コンテンツとして解釈します。また、[すでに廃止されています](https://html.spec.whatwg.org/multipage/obsolete.html#attr-img-longdesc)が `<img>` の `longdesc` 属性というものもありました。これは代替コンテンツのリソース URL（ハッシュフラグメントも可）を属性値として指定するもので、その URL の先に代替コンテンツがあることを示すことができました。

しかしながら、今日の HTML 仕様において主流な画像を扱う要素である `**<img>**` は、代替テキストを `alt` という**属性の形**でしか扱うことができません。これは `<img>` 要素が登場した NCSA Mosaic ブラウザ（Firefox の前身である Netscape の前身、Internet Explorer の前身でもあります）と、HTML 2.0 において標準化された `alt` 属性が歴史的に広く使われており、その互換性を維持した結果であると考えられます。

我々は、画像の代替テキストを（マークアップ可能な子孫コンテンツとしてではなく）文字列しか受け入れられない `alt` 属性の形で記述することを余儀なくされているのです。そのような制限がある中で、`alt` 属性を適切に設定するにはどうすればよいかを解説します。

### [alt 属性を設定する目的](https://alt.lavoscore.org/#why-set-alt)

`alt` 属性を指定する目的は大きく二つあります。一つは検索エンジンや生成AIなどが画像（`img` 要素）やリンク先（`area` 要素）の**意味**を解釈できるように**マシンリーダビリティ**を確保するためです。もう一つは視覚的に情報が得られない人（視覚障害者や、一時的に画面を見ることができない環境にいる人など）が代替情報としてその内容を知ることができるように**アクセシビリティ**を確保するためです。

前述の段落は「[Wikipedia - alt属性](https://ja.wikipedia.org/wiki/Alt%E5%B1%9E%E6%80%A7)」から引用したものですが、Wikipedia のその段落は私が書きました。

### [マシンリーダビリティのための代替テキスト](https://alt.lavoscore.org/#for-machine-readabiilty)

何百個という論文データを HTML 文書としてまとめている Web サイトを想像してください。その論文の中から、被検体である「コロ」という名の犬の情報を集めたいとします。コロはどんな見た目をしていたでしょうか。

```plain text
<h1>被検体のデータ</h1>
<p>...</p>
<p>被検体の写真を次に示す。</p>
<p><img src="/xxx/subject.jpg" alt="被験体の写真"></p>
<p>...</p>
```

Web サイトのソースコードに対して `grep` コマンドで「コロ」と検索しても「犬」と検索してもヒットしません。これでは大量の論文データの中から目的の情報を探し出すことができません。

```plain text
<h1>被検体のデータ</h1>
<p>...</p>
<p>被検体の写真を次に示す。</p>
<p><img src="/xxx/subject.jpg" alt="コロと名付けられた犬の写真。全身が黒毛で犬種はラブラドール・レトリーバー。"></p>
<p>...</p>
```

このように代替テキストが設定されていれば `grep` コマンド、あるいは HTML ソースをブラウザ上で「コロ」などと検索した際にヒットします。

「コロ」という名前は画像を見ただけでは分からないので代替テキストに名前情報を含めるのは不適切ではないのか？とも思われた方は alt 属性に対して深い理解があるようです。はたして、画像からは分からない情報を代替テキストに含めるのは不適切なのでしょうか。――いいえ、このケースでは「コロ」という情報は含めるべきです。なぜなら、この犬が「コロ」であることは論文の著者にとっては既知であり、コロの情報を伝えようとしているのですから「コロ」であることを代替テキストとして示しても問題ないのです。と言っても違和感があるという方がいるかもしれません。被験体が「コロ」であることは地の文（通常の段落テキスト）に書くべきであると考えることもできます。そしてその考えは決して間違ってはいません。しかし、代替テキストに「コロ」という情報を含めてはいけない理由にはなりません。

これらの論文データをもとに生成AIに対して「コロという犬の毛の色を教えてください」と指示すれば、生成AIは「コロという犬は、論文 xxx によると全身が黒毛であると書かれています」のようなテキストを生成してくれるでしょう。

マシンリーダビリティのための代替テキストは、アクセシビリティのための代替テキストと少し感覚が異なるかもしれません。いずれにしても、代替テキストというものは、その「画像」に対して一意的に決まるものではなく、前後の文章やその画像自身の文脈によって変化し得るものです。

![](https://alt.lavoscore.org/assets/img/icon-warning.png)

例えば、上記の画像は、次のような `alt` 属性値を持つかもしれません。

```plain text
<p><img src="warning.png" alt="警告！"> 一度データを削除すると復元できません</p>
```

しかし一方で、次のようなケースもあり得ます。

```plain text
<p>標識の種類を紹介します。警告マークは次のような標識です。</p>
<p><img src="warning.png" alt="黄色い背景の三角に黒い枠、中央に黒色の大きなエクスクラメーションマークがある。"></p>
```

同じ画像でも文脈によって**適切な代替テキスト**は変わり得るのです。

実際、このページに表示している上記の警告画像の `alt` 属性値は「警告アイコンの画像」にしています。

### [アクセシビリティのための代替テキスト](https://alt.lavoscore.org/#for-accessibility)

（視覚障害者に限らず）目の不自由な方や、一時的に画面を見ることができない環境にいる人は、視覚的にコンテンツの情報を得ることができません。以下では、このように（一時的であろうと）アクセシビリティに関して何らかのハンディキャップを持つ人を「**当事者**」と呼ぶことにします。そのような人でも情報を得るためには**代替コンテンツ**が必要です。

一つの手段としては、音声データ（代替音声）を提供してしまう方法が考えられます。これは音声データを何らかの形で用意して、その音声を聞かせることで視覚以外の手段で情報を得られるようにするというものです。具体例としては、テレビの副音声などがあります。Web サイトにおいては、全てのコンテンツに対応する音声データを用意して、部分ごとに音声を再生できる仕組みを用意すればよいのかもしれませんが、多くの場合においてそのアプローチは現実的ではありません。どうやって音声データを用意するのでしょうか。

そこで現実的には、Web サイトは当事者側でテキストデータをもとに音声読み上げツール（支援技術の一つ）を使って読み上げさせるというアプローチが取られています。そのために使われる読み上げツールは「**スクリーンリーダー**」と呼ばれます。スクリーンリーダー利用者に対して代替音声を提供したければ、適切な**代替テキスト**あるいは、HTML で定義されている **WAI-ARIA**（ウェイ・アリア）プロパティを設定すればよいということになります。

WAI-ARIA プロパティは、WAI-ARIA 属性によって**明示的**に設定する方法と、HTML 要素のネイティブ・セマンティクスによって**暗黙的**に設定する方法があります。つまり、セマンティックな HTML を記述していれば、WAI-ARIA 属性を記述するまでもなく適切に WAI-ARIA プロパティを設定できるということです。

## [alt 属性の文脈（コンテキスト）](https://alt.lavoscore.org/#context-of-alt)

前述した通り、代替テキストというものは画像に対して一意に決まるものではありません。画像の前後あるいは画像自身の文脈に応じて代替すべき内容が異なり得るのです。つまり、適切な `alt` 属性を設定するには、その文脈を正しく理解することが重要です。

### [Accessible Name である文脈](https://alt.lavoscore.org/#context-of-accessible-name)

**Accessible Name**（アクセシブルな名前）という概念があります。[WCAG では「名前 (name)」として定義されています](https://waic.jp/translations/WCAG22/#dfn-name)。その定義では次のように説明されています。

> 
> ソフトウェアが、ウェブコンテンツのコンポーネントを利用者に識別させることができるテキスト。

例えば、ある `a` 要素が存在しているとき、その `a` 要素が「何に対するリンクなのか」を示す Accessible Name が必要になります。

```plain text
<a href="/about/">About</a>
<a href="/company/">Company</a>
```

上記のように書かれていれば、それぞれのリンクは「About」のものと「Company」のものであると識別することができます。

```plain text
<div class="shopItem">
  <p>商品 1</p>
  <p><a href="/product/1">Read more</a></p>
</div>
<div class="shopItem">
  <p>商品 2</p>
  <p><a href="/product/2">Read more</a></p>
</div>
```

一方で上記のこの場合、異なるリンクであるにもかかわらずどちらも「Read more」という名前が付いていて、その名前をもとにリンク先 URL を識別することができません。これを改善するには、次のような対応を行います。

```plain text
<div class="shopItem">
  <p>商品 1</p>
  <p><a href="/product/1" aria-label="Read more about product 1">Read more</a></p>
</div>
<div class="shopItem">
  <p>商品 2</p>
  <p><a href="/product/2" aria-label="Read more about product 2">Read more</a></p>
</div>
```

上記のように `aria-label` 属性を用いる場合には、リンクテキスト（`a` 要素の内容）と同一の文字列を `aria-label` に含める必要があります。特に可能な限りその文字列は `aria-label` 属性値の先頭に含まれるようにします。「[WCAG Techniques G208 - アクセシブルな名前 (accessible name) の一部として可視ラベルのテキストを含める](https://waic.jp/translations/WCAG21/Techniques/general/G208)」も併せて参照ください。これは英語の場合は「Read more about Product 1」となり自然ですが、日本語の場合は語順が逆転し「もっと読む」に対し「Product 1 をもっと読む」となってしまうことに注意してください。日本語の場合であれば「もっと読む：Product 1 について」のように記述することで語順の問題を回避できます。

あるいは、次のようにします。

```plain text
<div class="shopItem">
  <p>商品 1</p>
  <p><a href="/product/1">Read more <span class="sr-only">about product 1</span></a></p>
</div>
<div class="shopItem">
  <p>商品 2</p>
  <p><a href="/product/2">Read more <span class="sr-only">about product 2</span></a></p>
</div>
```

`sr-only` は Screen-Readers only（スクリーンリーダー限定）の意味で、テキストを不可視にしつつアクセシビリティツリーにはそのテキストを残すというテクニックです。`sr-only` クラスには通称 Visually Hidden のスタイルを当てる必要があります。

### [`<area>`](https://alt.lavoscore.org/#context-of-accessible-name-for-area-and-input)[ および ](https://alt.lavoscore.org/#context-of-accessible-name-for-area-and-input)[`<input type="image">`](https://alt.lavoscore.org/#context-of-accessible-name-for-area-and-input)[ 向けの alt 属性](https://alt.lavoscore.org/#context-of-accessible-name-for-area-and-input)

`<area>` はイメージマップで用いられる要素です。詳細は [MDN - <area>](https://developer.mozilla.org/ja/docs/Web/HTML/Element/area) を参照ください。`<input type="image">` は画像によるサブミットボタンに用いられる要素です。詳細は [MDN - <input type="image">](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/image) を参照ください。

これらの要素は必然的に Accessible Name の文脈で使われます。そのため、`alt` 属性値には Accessible Name として相応しい文字列を設定する必要があります。

### [`<img>`](https://alt.lavoscore.org/#context-of-accessible-name-for-img)[ 向けの alt 属性](https://alt.lavoscore.org/#context-of-accessible-name-for-img)

`<img>` 要素を `<a>` 要素の唯一の内容とする場合を考えてみましょう。

```plain text
<a href="/about/"><img src="aboutText.png" alt=""></a>
```

上記は `alt` 属性値を空文字列に設定しています。これでは、Accessible Name が空文字列になってしまい不適切です。`<img>` 要素を `<a>` 要素の唯一の内容として使う場合には、その `alt` 属性値に Accessible Name として相応しい文字列を設定する必要があります。

```plain text
<a href="/about/"><img src="aboutText.png" alt="About"></a>
```

なお、ロゴ画像をサイトタイトルとして表示したい場合の `alt` 属性値が話題になりますが、これも同様です。

```plain text
<h1><img src="ExampleCompanyLogo.png" alt="株式会社 Example のロゴ"></h1>
```

上記が不適切な理由は、`<h1>` 要素の Accessible Name として `alt` 属性値の文字列が相応しくないためです。適切な文言は次の通りです。

```plain text
<h1><img src="ExampleCompanyLogo.png" alt="株式会社 Example"></h1>
```

### [装飾画像である文脈](https://alt.lavoscore.org/#context-of-decoration-image)

**装飾画像**とは何でしょうか。装飾画像とは、本来 CSS で表現されるべき見栄えを HTML の画像で表現する際に使われる画像を指します。典型的には **spacer.gif**（スペーサーGIF）が該当します。

他の例も考えてみましょう。以下の例を見てください。

火気厳禁！

このように使われるアイコン画像は通常、コンテンツとして特記すべきテキスト情報を持っていません。このように、本文（「火気厳禁！」）に対して補助的な視覚情報を提示するような画像も**装飾画像**として扱われます。

装飾画像である文脈ではテキスト情報を持たないため、それに対応する適切な `alt` 属性値は**空文字列**になります。

```plain text
<p><img src="icon-prohibit-fire.png" alt=""> 火気厳禁！</p>
```

`alt` 属性値を空文字列にすると、支援技術（アクセシビリティに関するハンディキャップを持つ人のために、機器の操作を補助するツールの総称）は画像が存在しないものとして扱うようになります。`<img>` 要素が存在しないものとして扱われるため、例えばスクリーンリーダーでは、画像があることすら通知されなくなります。

例によって、このページ上での上記の火気厳禁アイコン画像に対しては「火気厳禁のアイコン」という `alt` 属性値を設定しています。文脈に応じて適切な代替テキストは変わり得るということを忘れないでください。

### [周囲のコンテンツを考慮した文脈](https://alt.lavoscore.org/#context-with-surrounding-content)

画像の代替テキストは、画像の代わりに代替テキストに表示内容を切り替えても文書全体の文章構造が自然になるようにすべきであるとされています。

```plain text
<p>
  あなたは今、家の西にある草原に立っている。
  <img src="house.jpeg" alt="門扉がある白い家">
  そこには小さな郵便受けがある。
</p>
```

上記は、`<img>` 要素をその `alt` 属性値に置換したとき、文章の流れがおかしくなっています。これを修正するには次のように `alt` 属性値を設定します。

```plain text
<p>
  あなたは今、家の西にある草原に立っている。
  <img src="house.jpeg" alt="家は白く、門扉がある。">
  そこには小さな郵便受けがある。
</p>
```

上記のマークアップ例は [HTML Living Standard の仕様書の翻訳 - 4.8.4.4.3節](https://triple-underscore.github.io/HTML-image-alt-ja.html#a-phrase-or-paragraph-with-an-alternative-graphical-representation:-charts,-diagrams,-graphs,-maps,-illustrations)から引用しています。

このように、`alt` 属性値というものは、画像だけに注目してそれを言い換える代替テキストを考えればよい、というものではないことを理解いただけたでしょうか。何度も繰り返しますが文脈が重要なのです。適切な代替テキストを考える際には「画像の存在があることを言及することなく、電話で誰かに画像を含むページをどのように読むかを考えること」が重要だとも言われます（これは [HTML Living Standard の仕様書の翻訳 - 4.8.4.4.1節](https://momdo.github.io/html/images.html#alt)に書かれています）。

「Accessible Name」「装飾画像」「周囲のコンテンツ」これらの**文脈**を考慮することで、より適切な `<img>` 要素の `alt` 属性値を考えることができるようになるでしょう。

## [alt 属性設定指針](https://alt.lavoscore.org/#good-alt-guidelines)

適切な `alt` 属性値を設定するための指針を示します。

### [指針1. 画像が存在しなくても意味が変わらない場合](https://alt.lavoscore.org/#good-alt-guideline-unnecessary-image)

画像を削除しても何ら文章構造に影響がないかを考えます。影響がないと判断できる場合、それは**装飾画像**です。

```plain text
<img src="..." alt="">
```

装飾画像の `alt` 属性値は空文字列に設定します。

「`**alt**`** 属性を設定しないこと**」と「`**alt**`** 属性値に空文字列を設定すること**」は意味が異なります。`alt` 属性を設定しないでよいケースが仕様書に記述されていますが（[HTML Living Standard - コンテンツが未知である画像](https://momdo.github.io/html/images.html#unknown-images)）、そのようなケースを使いこなすには我々には難しすぎます。属性値は空文字列であるかもしれませんが、`alt` 属性は常に設定するようにしましょう。

### [指針2. 短いフレーズを画像で代替している場合](https://alt.lavoscore.org/#good-alt-guideline-short-phrase)

そもそもですが、「画像があって、代替テキストを考える」のではなく、「何らかの情報があって、それを画像で代替している」という事実を認識する必要があります。画像は、**画像によって表現したい情報**の代替表現なのです。

```plain text
<p><img src="warning.png" alt="警告！"> 一度データを削除すると復元できません</p>
```

```plain text
<h1><img src="ExampleCompanyLogo.png" alt="株式会社 Example"></h1>
```

上記のこのようなケースでは、単に「テキストとしてその部分を記述するとしたらどのような文言（フレーズ）を書けばよいだろう」という観点で代替テキストを設定すればよいということになります。

### [指針3. 画像自体が主要なコンテンツである場合](https://alt.lavoscore.org/#good-alt-guideline-image-content)

典型的には、プロフィールエリアにおける顔写真がこれに該当します。

```plain text
<p class="userInfo"><img src="profile/alice.jpg" alt="Alice の写真"> <span class="userName">Alice</span></p>
```

上記のようなケースについて、`alt` 属性値を空文字列にした方がよいのではないかと考える方もいるかと思います。しかし思い出してください。`alt` 属性値を空文字列にするとアクセシビリティツリーから取り除かれ、支援技術はその存在を無視するのです。これでは、そこに Alice の写真画像が存在することを検知できません。

また、`alt` 属性はアクセシビリティのためだけではないことも思い出してください。大量の Web ページデータの中から Alice の容姿を扱っているリソースを探し出すにはどうしておくべきだったでしょうか。マシンリーダビリティを確保するためには、画像に対して `alt` 属性を適切に設定しておく必要があるのでした。もし可能な場合は、上記よりも下記のように、画像から読み取れる雰囲気を `alt` 属性値を設定することが望ましいと考えられます。

```plain text
<p class="userInfo"><img src="profile/alice.jpg" alt="Alice の顔写真。黒くて長い髪の女性が笑顔でこちらを見ている。"> <span class="userName">Alice</span></p>
```

余談ですが、主に視覚障害者の方に向けて「映画等において、その状況を副音声で伝える」という取り組みがあります。例えば劇中で、「一つの林檎をもらって微笑むアリス」のような読み上げがされるといった感じです。これは [Visual Description](https://blogs.microsoft.com/on-the-issues/2021/11/05/what-is-visual-description-as-events-evolve-greater-accessibility-for-the-disability-community-emerges/) と呼ばれます。この考え方を応用して、セミナーセッション等の登壇時に登壇者が自分自身の容姿について自己紹介するという試みがあります。これは主に視覚障害者の方に向けて普段は知り得ない登壇者の容姿情報を伝えるための取り組みで **Self Description** と呼ばれます。Self Description をする際には、自身の容姿や表情についての情報を積極的に開示します。写真画像において **Visual Description** を意識して `alt` 属性を設定した例が、上記のアプローチになります。

SNS 等におけるユーザーアイコン画像も同様です。安易に `alt` 属性値に空文字列を設定しないでください。ユーザーアイコンがそこにあることが閲覧者にとって意味があるのであれば（閲覧者がユーザーアイコンを取得できるようにしたいのであれば）、`alt` 属性値には「〜のアイコン画像」のような文字列を設定しておくべきです。

近い将来、生成AIによって Web ページのコンテンツが自動的に解釈され再利用されるかもしれません。そのような際にマシンリーダビリティを意識して HTML で（代替テキストも含めた）情報をマークアップしておくとコンテンツの再利用の幅が大きく広がります。代替テキストは、コンテンツを AI にも読めるように設定することを意識すると考えやすいかもしれません。

### [指針4. 地の文とテキストが重複する場合](https://alt.lavoscore.org/#good-alt-guideline-duplicate-text)

地の文（Web ページ上に表示されている本文部分）にテキストが書かれている場合、それに隣接する画像の代替テキストには重複した文言をいれるべきではないという指針があります（[HTML Living Standard の仕様書の翻訳 - 4.8.4.4.1節](https://momdo.github.io/html/images.html#alt)を参照ください）。次の例を見てください。

```plain text
<p>
  あなたは今、家の西にある草原に立っている。
  その家は白く、門扉がついている。
  <img src="house.jpeg" alt="家は白く、門扉がある。">
  そこには小さな郵便受けがある。
</p>
```

「家が白く、門扉があること」を説明する文章が繰り返されています。このような代替テキストは不適切です。このようなケースでは `**alt**`** 属性値を空文字列に設定する**か、**次のような文字列を設定**します。

```plain text
<p>
  あなたは今、家の西にある草原に立っている。
  その家は白く、門扉がついている。
  <img src="house.jpeg" alt="その白い家の写真">
  そこには小さな郵便受けがある。
</p>
```

画像の代替テキストは、スクリーンリーダーなどでは単にそのまま読まれるわけでなく、「画像、その白い家の写真」のように画像の代替テキストであることがわかるように読み上げられます。そのため、このように「〜の写真」といった形式での代替テキストの設定が適切な場面もあります。

```plain text
<p class="userInfo"><img src="profile/alice.jpg" alt="Alice"> <span class="userName">Alice</span></p>
```

しばしば、上記のような `alt` 属性値が設定されることがあります。これは氏名が繰り返されているだけなので不適切な代替テキストです。設定するのであれば前述の通り「Alice の写真」のような文言にすべきです。

### [指針5. 情報が多い画像（グラフや地図）の場合](https://alt.lavoscore.org/#good-alt-guideline-many-information-image)

![](https://alt.lavoscore.org/assets/img/sample-map.png)

上記のような地図の代替テキストはどうすべきでしょうか。その答えは「もしも音声データを用意するとしたらどのように説明するか」を考えてその文言を設定するという方法で適切な文言を見出すことができます。

この地図画像で伝えたいことは何でしょうか。それを言葉にして、文字に書き表すのです。

```plain text
<p><img src="map.png" alt="目的地の何々店舗までの経路は次の通りです。JR何々駅の北口を出て、何々交差点から西に向かいます。何々川がありますが何々橋は渡らずにその手前の交差点の何々通りを西方向に2ブロックほど進むと何々バス停が見えます。何々バス停の正面にあるビルの1階が目的の何々店舗です。"></p>
```

ところで、このような説明は代替テキストとして設定するだけでよいのでしょうか。代替テキストの内容は通常、スクリーンリーダー利用者には伝わりますが支援技術を使っていない一般利用者には伝わりません。支援技術の利用者だけでなく全ての人に情報を伝えたほうが良い内容については、地の文に記述するようにします。

```plain text
<p><img src="map.png" alt="何々店舗までの地図画像。詳細は次の段落を参照。"></p>
<p>目的地の何々店舗までの経路は次の通りです。JR何々駅の北口を出て、何々交差点から西に向かいます。何々川がありますが何々橋は渡らずにその手前の交差点の何々通りを西方向に2ブロックほど進むと何々バス停が見えます。何々バス停の正面にあるビルの1階が目的の何々店舗です。</p>
```

このような「〜の画像。詳細は次の段落を参照。」といった `alt` 属性値を設定するアプローチであれば、代替テキストに相当する内容を属性値の形ではなく**マークアップ可能な形**で提供することができます。`longdesc` 属性が廃止された今では、画像とその説明文を機械的に関連付けることはできませんが、どうしても関連付けたい場合は `aria-describedby` 属性を使う方法があります（[ARIA15: 画像の説明を提供するために aria-describedby を使用する](https://waic.jp/translations/WCAG-TECHS/ARIA15)を参照ください）。

表データやグラフ（棒グラフ、折れ線グラフ、円グラフなど）の情報を画像で提供する場合には、`alt` 属性にその内容を細かく記述するよりも、地の文に `<table>` 要素を用いて記述した方がマシンリーダビリティの面でも有益です。`alt` 属性の呪縛に囚われず代替テキストを設定したい場合には是非このパターンを活用しましょう。

## [alt 属性の記述パターン](https://alt.lavoscore.org/#pattern-of-alt)

`alt` 属性値の記述パターンについて紹介します。

### [パターン1. 文言を設定しない](https://alt.lavoscore.org/#pattern-of-alt-with-empty)

`alt` 属性を空文字列に設定するパターンです。「[指針1. 画像が存在しなくても意味が変わらない場合](https://alt.lavoscore.org/#good-alt-guideline-unnecessary-image)」に採用すべきです。

```plain text
<img src="..." alt="">
```

なお、`alt` 属性そのものを省略してはいけません。

```plain text
<img src="...">
```

`alt` 属性そのものを省略すること自体は HTML Living Standard の仕様では特定の条件下で許可されていますが、その条件を使いこなすには我々には難しすぎます。また、一部の UA（ユーザーエージェント）では、`alt` 属性のない `<img>` 要素については代替テキストとして `src` 属性値を用いるケースがあります。

### [パターン2. 画像の種類を明記する](https://alt.lavoscore.org/#pattern-of-alt-with-kind)

`alt` 属性の書き方として、「画像の存在を明示するか」という観点があります。「[指針2. フレーズを画像で代替している場合](https://alt.lavoscore.org/#good-alt-guideline-short-phrase)」には画像の存在を明記してはいけません。なぜなら、その画像は「画像であること」には意味がなく、本質的にはテキスト情報を表しているからです。

```plain text
<h1><img src="ExampleCompanyLogo.png" alt="株式会社 Example のロゴ"></h1>
```

逆に、「[指針3. 画像自体が主要なコンテンツである場合](https://alt.lavoscore.org/#good-alt-guideline-image-content)」には特に、画像であることを明記すべきです。

```plain text
<h1>株式会社 Example のロゴ画像を制作しました！</h1>
<p><img src="ExampleCompanyLogo.png" alt="株式会社 Example のロゴ。白い背景に黒い文字で、筆記体で Example.inc と書かれている。"></p>
```

このように「〜のロゴ」や「〜の画像」、「〜の写真」のような記述をすることに意味があるケースがあるということです。

画像の種類の記述の仕方として、次のように先頭に画像の種類を書く流儀もあります。

```plain text
<h1>株式会社 Example のロゴ画像を制作しました！</h1>
<p><img src="ExampleCompanyLogo.png" alt="【ロゴ画像】白い背景に黒い文字で、筆記体で Example.inc と書かれている。"></p>
```

先頭に画像の種類を書くことで、先頭だけ読み上げれば画像の種類がわかるというメリットがありますが、通常 alt 属性値は「**画像**、ロゴ画像、白い背景に…」のようにスクリーンリーダーは画像であることを自動的に読み上げるため、「画像」という言葉が重複してしまうというデメリットがあります。個人的には文章として自然な前者の「〜のロゴ」のように文章中に画像の種類を示す書き方を好んでいます。

### [パターン3. 画像を Visual Description する](https://alt.lavoscore.org/#pattern-of-alt-with-visual-description)

「[指針3. 画像自体が主要なコンテンツである場合](https://alt.lavoscore.org/#good-alt-guideline-image-content)」や「[指針5. 情報が多い画像（グラフや地図）の場合](https://alt.lavoscore.org/#good-alt-guideline-many-information-image)」に、画像そのものを説明する文章を `alt` 属性値として設定します。この場合は `alt` 属性値が長くなっても問題ありませんが、スクリーンリーダーでは `alt` 属性値を途中から読むといった機能がないため、長い文章を聞き逃したりした場合に再生し直すと `alt` 属性値が最初から読み直されるという問題があります。それを嫌う場合や、マークアップを伴わない文字列のみの記述では書くのが大変な場合は、次に示す「別の段落を参照する」パターンを用いるとよいでしょう。

```plain text
<p><img src="map.png" alt="目的地の何々店舗までの経路は次の通りです。JR何々駅の北口を出て、何々交差点から西に向かいます。何々川がありますが何々橋は渡らずにその手前の交差点の何々通りを西方向に2ブロックほど進むと何々バス停が見えます。何々バス停の正面にあるビルの1階が目的の何々店舗です。"></p>
```

### [パターン4. 別の段落を参照する](https://alt.lavoscore.org/#pattern-of-alt-with-reference)

「[指針5. 情報が多い画像（グラフや地図）の場合](https://alt.lavoscore.org/#good-alt-guideline-many-information-image)」の例などでは、スクリーンリーダーで代替テキストを読ませたときに途中で聞き逃したりすると、再度聞き直す際に `alt` 属性値が最初から読み直されるという問題があるのでした。これを改善するためには、次のような `alt` 属性値を記述し、地の文で内容を説明します。表やグラフを説明する場合には `<table>` 要素を用いるとよいでしょう。

```plain text
<p><img src="map.png" alt="何々店舗までの地図画像。詳細は次の段落を参照。"></p>
<p>目的地の何々店舗までの経路は次の通りです。JR何々駅の北口を出て、何々交差点から西に向かいます。何々川がありますが何々橋は渡らずにその手前の交差点の何々通りを西方向に2ブロックほど進むと何々バス停が見えます。何々バス停の正面にあるビルの1階が目的の何々店舗です。</p>
```

### [パターン5. 複数の連続した画像における alt 属性値](https://alt.lavoscore.org/#pattern-of-multiple-images)

次の例を見てください。

```plain text
<p>あなたは <img src="1.png" alt="1"><img src="0.png" alt="0"><img src="0.png" alt="0"> 人目のお客様です</p>
```

上記は懐かしきアクセスカウンターを模したものですが、このように `alt` 属性値を設定すると、「ヒャク」ではなく「イチ、ゼロ、ゼロ」と読み上げられるなどして不適切だという考えがあります。そこで提案されているのが次のような記述方法です（これは [HTML Living Standard の仕様書の翻訳 - 4.8.4.4.2節](https://momdo.github.io/html/images.html#a-link-or-button-containing-nothing-but-the-image)に書かれています）。

```plain text
<p>あなたは <img src="1.png" alt="100"><img src="0.png" alt=""><img src="0.png" alt=""> 人目のお客様です</p>
```

私はこのアプローチに懐疑的です。このアプローチは、確かにスクリーンリーダー利用者に対するアクセシビリティという面では問題ないのかもしれません。しかしマシンリーダビリティという面ではどうでしょうか。`100.png` という画像があり `100` を表している場合と区別ができないのはおかしいと思いませんか。生成AIに「100 を表す画像を見せて」とお願いしたときに「`1.png`」が表示されてしまいかねません。

折衷案として、私であれば次のようにマークアップします。

```plain text
<p>あなたは <img src="1.png" alt=""><img src="0.png" alt=""><img src="0.png" alt=""><span class="sr-only">100</span> 人目のお客様です</p>
```

なお、次のように `role` が `generic` であるような `<span>` 要素に `aria-label` 属性を指定することはできません。

```plain text
<p>あなたは <span aria-label="100"><img src="1.png" alt=""><img src="0.png" alt=""><img src="0.png" alt=""></span> 人目のお客様です</p>
```

## [alt 属性に関するよくある質問](https://alt.lavoscore.org/#faq)

`alt` 属性に関するよくある質問について解説します。他にも質問があれば [@debiru_R](https://twitter.com/debiru_R) まで連絡ください。

### [alt タグと呼ぶのは間違いですか？](https://alt.lavoscore.org/#faq-alt-is-not-tag)

間違いです。HTML において、**要素**と**タグ**を混同する人は多いですが、**属性**と**タグ**を混同するというのは一体どういうことなのでしょう。`<alt>` なる要素があるとでも思っているのでしょうか。出直してきてください。

### [キャプションとの違いは何ですか？](https://alt.lavoscore.org/#faq-difference-with-caption)

キャプション、特に `<figcaption>` 要素内容と `alt` 属性値の関係に悩む人がいるようです。キャプションとは「見出し」や「表題」を意味するもので、その対象物の**概要**を示すようなテキストが設定されます。概要は内容ではないので、その点で内容を表すべき代替テキストにキャプションを設定することは通常は不適切となります。

「`alt` 属性値にはキャプション、タイトルとみなすことができるテキストを含めるべきではない」という指針があります（これは [HTML Living Standard の仕様書の翻訳 - 4.8.4.4.1節](https://momdo.github.io/html/images.html#alt)に書かれています）。ただし、その指針は「`alt` 属性値にキャプションを絶対に含めてはならない」という意味ではないと私は考えます。適切な `alt` 属性値というものは文脈によって変わり得るのでした。その文脈によっては「キャプションを含めた方が適切なケース」というのが存在するのです。次の例を見てください。

```plain text
<figure>
  <img src="map.png" alt="何々店舗までの地図画像。詳細は後述の段落を参照。">
  <figcaption>図1. 何々店舗の地図、2024年12月時点。</figcaption>
</figure>
<p>目的地の何々店舗までの経路は次の通りです。JR何々駅の北口を出て、何々交差点から西に向かいます。何々川がありますが何々橋は渡らずにその手前の交差点の何々通りを西方向に2ブロックほど進むと何々バス停が見えます。何々バス停の正面にあるビルの1階が目的の何々店舗です。</p>
```

このように、代替テキストに相当する文章が適切に地の文に記述されているのであれば、`alt` 属性値はキャプションを（部分的に）含むような文言を設定しても構いません。`alt` 属性値にキャプションを設定することが問題なのではなく、**あるべき適切な代替テキストが存在しないことが問題**なのです。

## [おわりに](https://alt.lavoscore.org/#finally)

適切な `alt` 属性を設定するのは簡単ではありません。Web 制作の現場では、サイト構成検討時、ページデザイン時、実装時の担当者がそれぞれ異なることがあり、実装時点で**その画像が何を伝えたいのか**を読み取れない場合があります。`alt` 属性値を考えるべきなのは実装者だけではないのです。デザイン時あるいはサイト構成検討時に考えておくべきものなのです。それによって、地図画像だけにするのか、地図画像とは別に地の文に説明文を示すべきなのかが決まるのです。

Web に関わるすべての人に、適切な代替テキストを考えてもらえることを切に願っています。

最後に、参考文献を示しておきます。

### [参考文献](https://alt.lavoscore.org/#references)

- [altはつけるだけじゃなくて - 森田 雄](https://yuugop.com/articles/practicalaccessiblehtml/pah01.html)
- [alt属性の良い事例(つけ方・書き方) - 情報バリアフリーポータルサイト](http://jis8341.net/jirei_sample/jirei_chapter_01.html)
- [学術文献の視覚障害者等用テキストデータ製作における代替テキスト製作仕様書](https://www.ndl.go.jp/jp/library/supportvisual/docs/ac_image_description_spec.pdf)
- [HTML Living Standard 日本語訳 - 4.8.4.4 画像に対して代替として動作するテキストを提供に対する要件](https://momdo.github.io/html/images.html#alt)
- [論文の図の代替テキストの書き方 - Seita Kayukawa](https://wotipati.github.io/blog/200507_alternativeText/200507_alternativeText.html)
- [書籍『Webアプリケーションアクセシビリティ - 今日から始める現場からの改善』](https://webapp-a11y.com/)
- [書籍『HTML解体新書 - 仕様から紐解く本格入門』](https://www.borndigital.co.jp/book/25999/)