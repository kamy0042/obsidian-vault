---
Created: 2023-10-30T11:51:00
URL: https://ics.media/entry/200609/
Tags: [topic/技術/CSS]
---
![[eyecatch.jpg]]

CSSで要素の重なりを表現する時はスタッキングコンテキストによって決められています。スタッキングコンテキスト（Stacking Context）はウェブページ上の仮想的な奥・手前方向の概念であり、「重ね合わせコンテキスト」、あるいは「スタック文脈」とも言います。

`z-index`による重なり位置の指定もこのスタッキングコンテキストのうちの一つです。今回は`z-index`より広い概念のスタッキングコンテキストの深淵を覗いてみます。

### z-index:5がz-index:53万に勝つ方法

重なりといえば、`z-index`です。`z-index`はWeb初心者キラーなプロパティで、その値が**必ずしも重なりの順序になりません**。例えば次のような`z-index`が53万と5の要素があったとします。この場合、53万の要素が上にきます。

```plain text
<div class="wrapper wrapper-freeza">
  <div class="freeza">私のz-indexは53万です</div>
</div>
<div class="wrapper wrapper-mob">
  <div class="mob">z-indexたったの5</div>
</div>

```

```plain text
.wrapper {
  position:relative;
}

.freeza {
  position:absolute;
  z-index: 530000;
}

.mob {
  position:absolute;
  z-index: 5;
}

```

![[2005_stacking_context1.png]]

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example1/)

しかし、次のように親要素に`z-index: 1`を追加すれば`z-index`が5の要素が上にきます。

```plain text
.wrapper-freeza {
  z-index: 1;
}

```

![[2005_stacking_context2.png]]

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example2/)

これは`z-index: 1`の中に`z-index: 530000`が内包されることで、`z-index: 5`と比較するのが`z-index: 1`に変わるからです。なので、`z-index`が5の要素が53万の要素の上にきます。

初心者向けの説明であればこれで済み、普段の業務でも上記のようなコードで問題ないでしょう。今回はどんなルールで重なりの上下関係が決定しているか、もう少し深堀りしていきます。

### スタッキングコンテキストの生成

さきほど、「内包される」と表現しましたが、**親要素にスタッキングコンテキストが生成される**という表現がより正確です。Webページの重なり関係は基本的にこのスタッキングコンテキストのルールに基づいて決定されています。

まず、`z-index`で重なりを比較するのは同一スタック上の要素です。先の例では、`.wrapper-freeza`に`z-index:1`が指定されたことでスタッキングコンテキストが生成され、53万の要素は別のスタックの中へ移動したわけです。

`z-index`の指定だけでなく、スタッキングコンテキストを生成するプロパティを追加すれば解決できます。意外かもしれませんが、次のプロパティでもスタッキングコンテキストは生成されます。

```plain text
.wrapper-freeza {
  opacity: 0.99;
}

```

![[2005_stacking_context3.png]]

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example3/)

主だったスタッキングコンテキストを生成するプロパティは以下の通りです。

- `position`の値が`absolute`あるいは`relative`で、かつ`z-index`の値が`auto`以外
- `position` の値が `fixed` あるいは `sticky`
- `display: flex`あるいは`display: grid`の子要素で、かつ`z-index`の値が`auto`以外
- `opacity`の値が`1`以外
- `mix-blend-mode`の値が`normal`以外
- `transform`、`filter`、`perspective`、`clip-path`、`mask`、`mask-image`、`mask-border`の値が`none`以外
- `isolation`の値が`isolate`の場合
- `will-change`の値が`auto`以外で上記のようなプロパティを指定している場合

ここで注意したいのは、`position`でも値が`absolute(relative)`と`fixed (sticky)`で扱いが違う点です。`position: absolute`が`z-index`の値を指定しないとスタッキングコンテキストが生成されないのに対し、`position: fixed`は指定した時点でスタッキングコンテキストが生成されます。

ほかにも、`display: flex`、`display: grid`で並べている子要素も`z-index`を指定することで重ね合わせコンテキストが発生します。あまりないかもしれませんが、`display: gird`で並べた要素の重なり順を指定したい時に使えるテクニックです。

### floatとの関係

上下の重なりと言えば、`float`プロパティも忘れてはいけません。`display: flex`が出るまで主流の横並びプロパティでした。`float`はその文字の通り、浮いた要素になります。ただし、スタッキングコンテキストとは別ものです。

上下の関係はどのようになるかというと、スタッキングコンテキストより下のレイヤーになります（何もしていない要素とスタッキングコンテキスト要素の間）。

![[2005_stacking_context4.png]]

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example4/)

### スタッキングコンテキスト同士の高低

では同一スタック上のスタッキングコンテキスト同士の高低はどのように決まるのでしょうか？次の優先度で決まっていきます。

1. `z-index`の値（有効なプロパティが設定されている時のみ）
2. 要素の出現順

`z-index`の値が`1`以上あるもの同士はその値が大きい方が上になります。`z-index`の値があるものとないものとを比べた時は`z-index`があるものが上になります。

![[2005_stacking_context5.png]]

- [デモを別ウインドウで再生する（z-index同士の高低）](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section1)
- [デモを別ウインドウで再生する（z-indexがあるものとそうでないもの）](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section2)

`z-index`がないもの同士、`z-index`の値が`0`の場合、あるいは同じ値の場合は、要素の出現があとに出てきた要素が上になります。

- [デモを別ウインドウで再生する（z-index: 0とそうでないもの）](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section3)
- [デモを別ウインドウで再生する（z-indexが同じ値のとき）](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section4)

高さ関係で言えば、

`z-index:0` ＝ `z-index: auto` ＝ `z-index`のないプロパティ

という関係が成り立ちます。

出現順は基本的にはHTMLのコード順になりますが、`flex`の`order`プロパティなどで順番を入れ替えた場合はその`order`順になります。

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section5)

また、`z-index`にマイナスの値を使うと、重なり方は背景方向になりますが、`z-index`が53万の例と同様、同一スタック上の背景方向の位置であって、別スタックや親要素より後ろに配置されるとも限りません。

例えば、`.hoge`にスタッキングコンテキストを生成させた場合、その中の要素は`<body>`より後ろには配置されません。

```plain text
<body>
  <div class="hoge">
    <div class="background"></div>
  </div>
</body>

```

```plain text
.hoge {
  position: absolute;
  z-index: 1;
}

.background {
  position: fixed;
  z-index: -1;
}

```

`.hoge`にスタッキングコンテキストが生成されているので、`.background`の`z-index`の値は`.hoge`の中のスタッキングコンテキストの相対的位置を示します。これは一番最初の例の負方向バージョンといえる話です。

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section6)

### positionの落とし穴

`position: absolute (relative)`は`z-index`の値が`auto`でない場合にスタッキングコンテキストが生成される、と書きましたが、`z-index`が無指定（デフォルトの`z-index: auto`）でも、**スタッキングコンテキストのような重なりが発生します**。

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section7)

つまり、`position: absolute (relative)`を指定した時点で通常の要素より上にきて、`z-index: auto`の振る舞いをします。そのため、`transform`などのスタッキングコンテキストの後に`position`要素を配置した場合、**スタッキングコンテキストでもないのにも関わらず、スタッキングコンテキストより上**になります。ただし、`z-index: 0`の時とは違いスタッキングコンテキストは生成されないので、子要素の`z-index`は親要素のスタックで影響します（53万の例の初期状態と同じです）。

また、`z-index: auto`の要素と`z-index: 0`の要素が並んだ場合、要素の出現順に応じて上下関係が決定します。

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example5/#section8)

### 予期せぬ重なり

ここまでの挙動は、なんとなく`position`を使うと上にくるんだなー、という認識でも`z-index`の値と関係さえ気をつけていればそこまで問題になりません。しかし、他のスタッキングコンテキストとの複合では予期せぬ重なりが発生する可能性があります。

### 親より上の要素よりも、さらに上にいく

`z-index: auto`の要素の中に`z-index: 1`の要素があった場合、要素の出現順によっては、

`z-index: auto` ＜ スタッキングコンテキスト ＜ `z-index: 1`

という関係性が成り立ちます。この時、親要素より上にある、スタッキングコンテキストを子要素が上回るという、現象が発生します。

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example6/#section1)

### transitionで急に発生する

ほかにも注意したいのは、`opacity`でもスタッキングコンテキストが発生することです。特に`1`以外の値で発生するところが予期せぬ重なりを発生させるかもしれません。例えば次のような場合です。

```plain text
.hoge:hover {
  opacity:0.5;
}

```

このとき、非ホバー時は`opacity: 1`なのでスタッキングコンテキストは生成されず、ホバーした時のみにスタッキングコンテキストが生成されます。

より具体的には下記デモのようなカードデザインでアイコンを載せていた場合に、`opacity`をかける場所を間違えると、予期せぬ重なりが発生します。

これは、アイコンの要素と`opacity`の要素が並列になっており、スタッキングコンテキストが発生すると、要素順に応じて`opacity`が上になってしまうためです。

- [デモを別ウインドウで再生する](https://ics-creative.github.io/200525_z-index-of-the_abyss/example6/#section2)

### 俺たちは雰囲気でz-indexをやっている

`position`、`z-index`プロパティと重ね合わせコンテキスト関係性はきちんと見てみると結構複雑です。私も`z-index`の重なりについては冒頭の「包含関係」くらいの認識でした。

絶対的な指針ではありませんが、以下のことを気をつけてコーディングすると`z-index`まわりの不具合回避に役立つでしょう。

- `z-index`のスコープを気をつける
- 特に`transform`、`opacity`などと`position`を組み合わせるときは気をつける
- 重なりの親要素に`z-index: 1`などを指定してスコープを閉じてしまう
- ヘッダーやポップアップ背景など一番上に表示したい要素はルートの直下でコードの後の方（`</body>`の直前など）に配置する

正直、`z-index`やスタッキングコンテキストの一挙一動について理解していなくても一番最初の例の仕組みさえ分かっていれば実務上はそんなに困りません。「あれ、重なりがおかしいな？」と思ったら、この記事のことを思い出してもらえれば幸いです。

### 参考文献

- [Appendix E. Elaborate description of Stacking Contexts](https://www.w3.org/TR/CSS22/zindex.html)
- [重ね合わせコンテキスト | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)