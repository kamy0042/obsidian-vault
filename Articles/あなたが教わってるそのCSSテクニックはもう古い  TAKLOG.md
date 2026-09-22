---
Created: 2024-04-14T15:34:00
URL: https://www.tak-dcxi.com/article/that-css-technique-you-learned-is-outdated/
Tags: [topic/技術/CSS]
---
![](https://www.tak-dcxi.com/_astro/thumbnail_that-css-technique-you-learned-is-outdated.BxaISFVe_Z9r1U7.jpg)

Xの初学者のポストにて古の手法を教わっている方をよく見かけるので、2024年現在そのCSSテクニックはもう古いってものをいくつか列挙しました。

## ブロックのセンタリングに margin を使うなら margin-inline:auto を使いなさい

marginを使ってブロックのセンタリングを行う際によく教わるのは`margin:0 auto`あるいは`margin:auto`でしょう。

従来の書き方

一般的に上下のmarginの値が`auto`になった際は結果的に0として扱われる（[参考文献](https://www.w3.org/TR/CSS2/visudet.html#inline-replaced-height)）ので、`margin:auto`でも同じ効果が期待できるため上下の0は不要です。じゃあ`margin:auto`でいいじゃんかと思われるでしょうが、この指定だと本来不要な上下のmarginに`auto`を指定しているのと同等です。

これがどういう弊害を与えるかというと次のようなケースです。

`child`要素を最大値360pxとしながら`margin`で中央寄せをし、親要素で子要素同士の間に同じ大きさの余白(1rem)ができるようにするという構成ですが、`child`要素の上方向の`margin`に不用意に指定された`auto`が邪魔をして`margin-top: 1rem;`が上書きされてしまい、結果的に要素間に余白が生じなくなってしまいます。

![](https://www.tak-dcxi.com/_astro/image_that-css-technique-you-learned-is-outdated_screenshot01.3MMLN6qx_Z1NdciJ.png)

一方、`margin-inline:auto`では要素の**インライン方向**(横書きの場合は左右)のみの`margin`を一括auto指定し、**ブロック方向**(横書きの場合は上下)の`margin`には関与しないため上記のような問題は起こらなくなります。

🙆‍♂ Recommended

注意点として、`margin-inline`のような論理プロパティは縦書きの場合は上下の中央揃えとなります。横書きのみの場合は問題にはなりませんが、縦書き対応のWebサイトを作成する方は論理プロパティや論理値を優先するコーディングを行ってください。

`margin-inline`は`margin-left`および`margin-right`のショートハンドではありません。

当ブログでは論理プロパティと論理値を優先して実装を行っています。

## 要素を格子状に並べたいなら display:grid を使いなさい

要素を格子状に並べる際に`display:flex`(絶滅危惧種として`float:left`)でのレイアウトを教わっている方もいるようですが、現在では`display:grid`での指定に比べて記述量が増えるだけでなくデメリットも多いです。

flexでの組み方

これだけなら`display:flex`でも大した記述量ではありませんが、格子状に要素を並べる場合多くは`gap`を設けると思います。`display:flex`で`gap`を設けつつ要素を格子状に並べる場合は「コンテナの横幅からギャップの合計値を引いたものをn等分する」という計算式が必要となります。

一方`display:grid`であれば特別な計算は不要で、これだけのCSSで実現できます。

🙆‍♂ Recommended

また、`display:grid`であれば`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`のように子要素の最小幅を決めながら親要素の横幅に合わせてレスポンシブにカラムを切り替えるという柔軟なレイアウトも簡単に実現できます。

`display:grid`に敷居の高さを感じている初学者も見受けられますが、このようなシンプルなレイアウトであれば`display:flex`よりも簡単に扱えます。

## position:absolute した要素を親要素いっぱいに広げたいなら inset:0 を使いなさい

疑似要素を要素いっぱいにオーバーレイするといった実装の際、だいたいこのあたりを教わっている方が多いと思われます。

現在では`inset`プロパティが普及しており、`inset`で置き換えると次のような実装で済みます。

🙆‍♂ Recommended

`inset`は `top` `right` `bottom` `left` を一括指定するプロパティで、`inset:0` は `top` `right` `bottom` `left` にそれぞれ0を指定しているのと同等になります。

`img` 要素のように `width:100%` `height:100%` を明示する必要がある場合もありますが、そこは臨機応変にスタイリングしてください。この場合でも `top:0` `left:0` をそれぞれ指定する必要はなく、`inset:0` のみで問題ありません。

## 要素を親要素の上下左右中央に配置したいなら次の2つから選びなさい

上下左右中央に要素を配置したいのなら多くの場合は次の指定で十分です。

child が absolute, fixedの場合

昔の文献でよく紹介されていた`top:50%; left:50%; translate:-50% -50%;`のような指定は現在ではあまりやる必要はございません。

以下上級者向けの解説です。

`contain`はコンテンツの一部を独立したサブツリーとしてブラウザに認識させる「封じ込め」に関する指定をするプロパティで、`contain:content`で新しい包含ブロックの生成(`position:absolute`における`relative`のような役割)、スタッキングコンテキストの生成、要素のはみ出しの抑制(`overflow:hidden`に似た役割)を兼ね揃えます。ブラウザにレイアウト、スタイル、描画、およびその組み合わせの再計算を絞ることができるのでパフォーマンス向上も見込まれます。`position:relative`と`overflow:hidden`を両方指定するような場合、もしくは片方だけでも指定するような場合は`contain`プロパティを使ったほうがメリットある場合もございます。レイアウトによっては利用できない場合もあるため、詳細はMDNを参照してください。

[contain - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/contain)

## スタイリングをロールバックするなら値に revert を使いなさい

`revert`はプロパティの値をスタイルの変更を行わなければそのプロパティが持っていたであろう値にロールバックする値です。簡単に言えば親から継承された値もしくはブラウザデフォルトのスタイルまでロールバックできます。

例えば普段は消している `ul` `ol` 要素のリストマーカーをある箇所では復活させたい、もしくは `a` 要素のアンダーラインを復活させたいという場合、`revert`を使えば簡単に復活させることができます。

🙅‍♂ Not Recommended

🙆‍♂ Recommended

レスポンシブ対応でメディアクエリを使用する際に以前の設定を取り消したくなるような場合も、`display:block`のように明示的な値を指定をしてロールバックするのではなく、`revert`を使用することで本来持っている値に戻しつつ、`revert`と記述することでロールバックしたことをコードで明示できます。

メディアクエリ内での比較演算子はiOS Safariではバージョン16.4からのサポートのため、16以上が条件の場合は利用を控えるかPostCSSのプラグインを利用する必要があります。

## 現在のテキストカラーと同じ色を指定するなら currentColor を使いなさい

SVGの`fill`やCSSでアイコンを描画する際の`background-color`などの配色に`color`で指定しているものと同じ値を設定している教材を見かけますが、バリエーションや状態変化でテキストカラーが変わるような実装だと記述量が増えたり、それぞれの値を管理する手間も増えます。

🙅‍♂ Not Recommended

このケースの場合、SVGの`fill`に`currentColor`を指定すれば、バリエーションで`color`の値が変わった際に`fill`の色も連動して現在のテキストカラーと同色になるため記述量が減り、管理が楽になります。

🙆‍♂ Recommended

また、`border-color`の値にテキストカラーと同色を指定している方をよく見かけますが、`border-color`の初期値は`currentColor`なので現在のテキストカラーと同じ色にしたい場合はわざわざ`border-color`を指定する必要はございません。

🙅‍♂ Not Recommended

🙆‍♂ Recommended

## 要素のアスペクト比を保ちたいなら padding-top ではなく aspect-ratio を使いなさい

画像や`iframe`要素をアスペクト比を保ちながらレスポンシブする際、かつては `padding-top` or `padding-bottom` の仕様を利用して行っていました。

現在では `aspect-ratio` プロパティを使えば同等のことを実現できます。

🙆‍♂ Recommended

`aspect-ratio` プロパティのほうが記述量を抑えられるだけではなく、古のテクニックは高さを `padding` で保っている都合上、子要素が `position:absolute` などで縛られます。`aspect-ratio` であれば子要素の `position` は縛られないため、柔軟にレイアウトを指定することが可能になります。

## 三角形を描くなら border ではなく clip-path を使いなさい

三角形をCSSで描く際、かつては`border`の仕様を利用して描いていましたが、現在は簡単な図形であれば`clip-path`で描画することが可能です。

🙅‍♂ Not Recommended

🙆‍♂ Recommended

`clip-path`で描画したほうが記述量が少なく済みますし、サイズ調整も容易です。次のCSS変数をコピペしてグローバルなCSSに適用してください。

[clip-pathで描画した三角形の表示例](https://codepen.io/tak-dcxi/pen/oNzojRw)

clip-pathで図形を描く際はCSS変数に格納し、変数を参照するようにしてください。`clip-path: polygon(0 50%, 100% 0, 100% 100%);` をそのまま埋め込むとコードを見ただけではそれがどのような図形か判断がしにくいです。変数化すれば変数名で判断できますし、再利用も容易になります。

🙅‍♂ Not Recommended

🙆‍♂ Recommended

今回のケースでは`calc(var(--size) / 2 * tan(60deg))`で正三角形を描いています。かつてはCSSで正三角形を描く難易度が高い印象でしたが、現在はCSSで三角関数がサポートされているので描画が容易になりました。16pxの上向き下向きの正三角形を描くなら`width: 16px; height: calc(16px / 2 * tan(60deg));`、左向き右向きのそれを描くなら`width: calc(16px / 2 * tan(60deg)); height: 16px;`が計算式です。覚えておくと役立つかもしれません。

また、簡単な図形であればオンラインジェネレーターで作成するよりもChatGPTで生成してもらったほうが早いです。

![](https://www.tak-dcxi.com/_astro/image_that-css-technique-you-learned-is-outdated_screenshot02.CFzIKO4Y_Z11mg9H.png)

## 正方形や円形を描くなら aspect-ratio:1 を使いなさい

正方形や円形を描く時、よく教わるのが`width`と`height`それぞれの値に同じ数値を指定するやり方です。

このやり方では値を変更する際に`width`と`height`それぞれの値を変更する必要が出てきます。CSS変数を使用すれば変数の値を変えるだけで済みますが、そのぶん記述量は増えます。

`aspect-ratio:1`であれば`width`と`height`どちらかの値を指定するだけで実現できます。

また、レスポンシブ対応などにおいて親要素の横幅を基準とした相対指定(%)で正方形を描く場合、`width`と`height`で実現するのは困難ですが、`aspect-ratio:1`であれば親要素の横幅を基準とした相対指定でも正方形や円形を描くことができます。

[相対指定で円形を描くサンプル](https://codepen.io/tak-dcxi/pen/KKYgXyw)

## 画面いっぱいのメインビジュアルを実装するなら高さの値に 100svb(100svh) を使いなさい

前提として、画面いっぱいのメインビジュアル(ヒーローイメージ)を実装する際に`100vh`を指定するとiOSではアドレスバーの高さを含んでしまうためはみ出てしまいます。

数年前に[この問題をJavaScriptで解決する記事](https://zenn.dev/tak_dcxi/articles/2ac77656aa94c2cd40bf)を投稿しましたが、このやり方も現在は利用する必要はありません。

現在では`100svb(100svh)`でアドレスバーの高さを含まない画面の高さを取得できるので、基本的にはこれを指定すれば問題ありません。

論理的指定

物理的指定

横書き表示のみであれば`100svh`で良いですが、縦書き対応の場合はブロックサイズを基準とする`100svb`を指定しましょう。

また、コンテンツが少ない時にフッターを最下部に固定する実装を行う際も同様です。`body` に `min-block-size: 100svb` を指定しておくといいでしょう。ちなみに現在では `position:sticky` を使えば `display:flex` や `display:grid` を指定したラッパーを用意しなくとも固定フッターを実装できます。