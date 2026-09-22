---
Created: 2024-01-20T19:12:00
URL: https://yuheiy.hatenablog.com/entry/2020/05/25/021342
Tags: [topic/技術/CSS]
---
[Tailwind CSS](https://tailwindcss.com/)作者の[Adam Wathan](https://twitter.com/adamwathan)氏による「[CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)」の日本語訳です。翻訳に当たって原著者の許諾を得ています。

**2021年10月29日に全文再翻訳しました。**

この数年の間で、私の[CSS](http://d.hatena.ne.jp/keyword/CSS)の書き方は、非常に「セマンティック」なアプローチから「ファクショナル[CSS](http://d.hatena.ne.jp/keyword/CSS)」と呼ばれるものに変わりました。

この書き方で[CSS](http://d.hatena.ne.jp/keyword/CSS)を書くと、多くの開発者から[かなりの反感を買う](https://twitter.com/mezzoblue/status/794419442272714752)ことがあります。そのため、私がいかにしてここまでたどり着いたかを説明することで、その過程で得た教訓や洞察について共有したいと思います。

## 第1段階 「セマンティック」な[CSS](http://d.hatena.ne.jp/keyword/CSS)

よい[CSS](http://d.hatena.ne.jp/keyword/CSS)のためのベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスとして、耳にするであろうことのひとつは「関心の分離」です。

考え方としては、HTMLには*コンテンツ*についての知識のみを含めるべきであり、スタイルの規定はすべて[CSS](http://d.hatena.ne.jp/keyword/CSS)の中で行わなければならないというものです。

次のHTMLを見てください。

```plain text
<p class="text-center">
    Hello there!
</p>

```

`.text-center`クラスが見えますね？ テキストの中央揃えはデザインの規定であるため、このコードは「関心の分離」に反します。スタイルの知識がHTMLに漏れ出てしまっているのです。

代わりに推奨されるアプローチは、コンテンツに基づいたクラス名を要素に付与し、それらのクラスを[CSS](http://d.hatena.ne.jp/keyword/CSS)の*フック*にして[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)にスタイルを設定することです。

```plain text
<style>
.greeting {
    text-align: center;
}
</style>

<p class="greeting">
    Hello there!
</p>

```

このアプローチの真骨頂が[CSS Zen Garden](http://www.csszengarden.com/)です。「関心を分離」しさえすれば、[スタイルシート](http://d.hatena.ne.jp/keyword/%A5%B9%A5%BF%A5%A4%A5%EB%A5%B7%A1%BC%A5%C8)を入れ替えるだけで、サイトを完全に再構築できることを示すために設計されたのです。

ワークフローは次のような感じになります。

1. 新しく作るUI（この場合は著者略歴（author bio）カード）の[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)をする。

```plain text
<div>
  <img src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
  <div>
    <h2>Adam Wathan</h2>
    <p>
      Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
    </p>
  </div>
</div>

```

2. コンテンツに基づいた説明的なクラスを1、2個追加する。

```plain text
- <div>
+ <div class="author-bio">
    <img src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
    <div>
      <h2>Adam Wathan</h2>
      <p>
        Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
      </p>
    </div>
  </div>

```

3. [マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)にスタイルを適用するために、これらのクラスを[CSS](http://d.hatena.ne.jp/keyword/CSS)やLess、Sassの「フック」として用いる。

```plain text
.author-bio {
  background-color: white;
  border: 1px solid hsl(0,0%,85%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  > img {
    display: block;
    width: 100%;
    height: auto;
  }
  > div {
    padding: 1rem;
    > h2 {
      font-size: 1.25rem;
      color: rgba(0,0,0,0.8);
    }
    > p {
      font-size: 1rem;
      color: rgba(0,0,0,0.75);
      line-height: 1.5;
    }
  }
}

```

最終的には次のデモのようになります。

- [ HTML ](https://yuheiy.hatenablog.com/entry/2020/05/25/021342#html-box)
- [ SCSS ](https://yuheiy.hatenablog.com/entry/2020/05/25/021342#css-box)
- [ Result ](https://yuheiy.hatenablog.com/entry/2020/05/25/021342#result-box)

[EDIT ON](https://codepen.io/adamwathan/pen/ZJeWBY)

```plain text
<div class="container">
  <div class="author-bio">
    <img src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
    <div>
      <h2>Adam Wathan</h2>
      <p>
        Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
      </p>
    </div>
  </div>
</div>
```

このアプローチは理解しやすく、筋が通っていると思ったので、しばらくはこのようにHTMLと[CSS](http://d.hatena.ne.jp/keyword/CSS)を書いていました。

しかし、そのうちなにか違和感を覚え始めます。

「関心を分離」しても、[CSS](http://d.hatena.ne.jp/keyword/CSS)とHTMLは明らかに結びついていたのです。ほとんどの[CSS](http://d.hatena.ne.jp/keyword/CSS)が[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)と合わせ鏡のようでした。[入れ子](http://d.hatena.ne.jp/keyword/%C6%FE%A4%EC%BB%D2)になった[CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)に、HTMLの構造がそのまま反映されてしまっていました。

[**マークアップ**](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)**はスタイルの規定について関心を持ちませんでしたが、**[**CSS**](http://d.hatena.ne.jp/keyword/CSS)**は**[**マークアップ**](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)**の構造に関心を持っていました。**

結局のところ、関心は分離できていなかったのでしょう。

## 第二段階 スタイルを構造から切り離す

この結びつきを切り離す方法を探し回った結果、行き着いたのは、[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)により多くのクラスを追加して、直接要素を選択できるようにする――[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)の詳細度を低く保ち、[CSS](http://d.hatena.ne.jp/keyword/CSS)を特定のDOM構造に依存させないようにするという解決策でした。

こうした考え方を提唱する方法論として、最も有名なのが[Block Element Modifier](http://getbem.com/introduction/)――略して*BEM*です。

BEMらしいアプローチを取ると、著者略歴の[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)は次のようになります。

```plain text
<div class="author-bio">
  <img class="author-bio__image" src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
  <div class="author-bio__content">
    <h2 class="author-bio__name">Adam Wathan</h2>
    <p class="author-bio__body">
      Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
    </p>
  </div>
</div>

```

そして、[CSS](http://d.hatena.ne.jp/keyword/CSS)は次のようになります。

```plain text
.author-bio {
  background-color: white;
  border: 1px solid hsl(0,0%,85%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}
.author-bio__image {
  display: block;
  width: 100%;
  height: auto;
}
.author-bio__content {
  padding: 1rem;
}
.author-bio__name {
  font-size: 1.25rem;
  color: rgba(0,0,0,0.8);
}
.author-bio__body {
  font-size: 1rem;
  color: rgba(0,0,0,0.75);
  line-height: 1.5;
}

```

[CodePenで見る](https://codepen.io/adamwathan/pen/ZJepYj)

これはかなりの進歩だと感じました。[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)は「セマンティック」なままで、スタイルを規定していません。[CSS](http://d.hatena.ne.jp/keyword/CSS)は[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)の構造から切り離されているように思えますし、加えて、[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)の不用意な詳細度に悩まされずに済みます。

しかし、私はジレンマに陥るのです。

## 似たような[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の扱い

サイトの新しい機能として、記事の概要をカードレイアウトで表示する機能を追加するとしましょう。

記事概要（article [preview](http://d.hatena.ne.jp/keyword/preview)）カードの中には、上部に幅いっぱいの画像が、下部に余白を伴うコンテンツセクションが含まれます。太字のタイトルと、小さく本文テキストもあります。

これが、著者略歴とまったく同じ見た目だとします。

![[29088772-342696c0-7c48-11e7-877d-9f28b52a7a51.png]]

あくまで関心は分離されたままにしつつ、どのように対処するのが最適でしょうか？

記事概要に`.author-bio`クラスを使用することはできません。もはやセマンティックではなくなってしまうからです。したがって、この[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のために`.article-preview`を作らざるを得ません。

[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)は次のようになります。

```plain text
<div class="article-preview">
  <img class="article-preview__image" src="https://i.vimeocdn.com/video/585037904_1280x720.webp" alt="">
  <div class="article-preview__content">
    <h2 class="article-preview__title">Stubbing Eloquent Relations for Faster Tests</h2>
    <p class="article-preview__body">
      In this quick blog post and screencast, I share a trick I use to speed up tests that use Eloquent relationships but don't really depend on database functionality.
    </p>
  </div>
</div>

```

では、[CSS](http://d.hatena.ne.jp/keyword/CSS)はどのように取り扱うべきでしょうか？

### 選択肢1 スタイルを複製する

ひとつのアプローチは、単純に`.author-bio`のスタイルを複製しつつクラス名を変更することです。

```plain text
.article-preview {
  background-color: white;
  border: 1px solid hsl(0,0%,85%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}
.article-preview__image {
  display: block;
  width: 100%;
  height: auto;
}
.article-preview__content {
  padding: 1rem;
}
.article-preview__title {
  font-size: 1.25rem;
  color: rgba(0,0,0,0.8);
}
.article-preview__body {
  font-size: 1rem;
  color: rgba(0,0,0,0.75);
  line-height: 1.5;
}

```

これでもうまくいきますが、当然まったく*DRY*ではありません。それに、これらの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)はわずかに違う道に逸れやすくなり（異なるパディングや文字色になるなど）、デザインの一貫性が失われることになります。

### 選択肢2 著者略歴[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を`@extend`する

別のアプローチとしては、好みの[プリプロセッサ](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D7%A5%ED%A5%BB%A5%C3%A5%B5)ーの`@extend`機能を使って、すでに`.author-bio`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)として定義されたスタイルを参照することができます。

```plain text
.article-preview {
  @extend .author-bio;
}
.article-preview__image {
  @extend .author-bio__image;
}
.article-preview__content {
  @extend .author-bio__content;
}
.article-preview__title {
  @extend .author-bio__name;
}
.article-preview__body {
  @extend .author-bio__body;
}

```

[CodePenで見る](https://codepen.io/adamwathan/pen/ZJepLq)

`@extend`の使用は[一般的には推奨されません](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)が、それはさておき、問題は解決できたように思いますよね？

[CSS](http://d.hatena.ne.jp/keyword/CSS)から重複を取り除いていますし、[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)はスタイルを規定していません。

しかし、もうひとつの選択肢についても考えてみましょう。

### 選択肢3 コンテンツに依存しない[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成する

「セマンティック」な観点では、`.author-bio`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)と`.article-preview`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)にはなんの共通点もありません。ひとつは著者の略歴であり、ひとつは記事の概要です。

しかしこれまで見てきたように、デザインの観点では*大いに*共通しています。

そのため、共通する性質にちなんだ新しい[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成してもよいでしょう。そうすれば、両方の種類のコンテンツで利用できるようになります。

これを`.media-card`と呼びましょう。

[CSS](http://d.hatena.ne.jp/keyword/CSS)は次のようになります。

```plain text
.media-card {
  background-color: white;
  border: 1px solid hsl(0,0%,85%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}
.media-card__image {
  display: block;
  width: 100%;
  height: auto;
}
.media-card__content {
  padding: 1rem;
}
.media-card__title {
  font-size: 1.25rem;
  color: rgba(0,0,0,0.8);
}
.media-card__body {
  font-size: 1rem;
  color: rgba(0,0,0,0.75);
  line-height: 1.5;
}

```

著者略歴の[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)は次のようになります。

```plain text
<div class="media-card">
  <img class="media-card__image" src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
  <div class="media-card__content">
    <h2 class="media-card__title">Adam Wathan</h2>
    <p class="media-card__body">
      Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
    </p>
  </div>
</div>

```

そして、記事概要の[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)は次のようになります。

```plain text
<div class="media-card">
  <img class="media-card__image" src="https://i.vimeocdn.com/video/585037904_1280x720.webp" alt="">
  <div class="media-card__content">
    <h2 class="media-card__title">Stubbing Eloquent Relations for Faster Tests</h2>
    <p class="media-card__body">
      In this quick blog post and screencast, I share a trick I use to speed up tests that use Eloquent relationships but don't really depend on database functionality.
    </p>
  </div>
</div>

```

このアプローチでは[CSS](http://d.hatena.ne.jp/keyword/CSS)の重複もなくせますが、しかし、これでは「関心の混合」ではないでしょうか？

この瞬間から、これらのコンテンツ両方をメディアカードとしてスタイリングするという知識が[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)に含まれてしまっています。ではもし、記事概要[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の見た目を変更せずに、著者略歴[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の見た目を変更したくなった場合にはどうすればよいでしょうか？

これまでは、[スタイルシート](http://d.hatena.ne.jp/keyword/%A5%B9%A5%BF%A5%A4%A5%EB%A5%B7%A1%BC%A5%C8)を開いて、ふたつの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のどちらかに新しいスタイルを適用するだけでした。それが今では、HTMLを編集しなければならなくなってしまったのです！ なんということでしょう！

しかし、別の側面からも考えてみます。

**もし*****新しい種類のコンテンツ*****を追加することになって、それにもまた同じスタイリングが必要だとすればどうしましょう？**

「セマンティック」なアプローチでは、まずHTMLを記述し、コンテンツ固有のクラスをスタイリングのための「フック」としていくつか追加し、[スタイルシート](http://d.hatena.ne.jp/keyword/%A5%B9%A5%BF%A5%A4%A5%EB%A5%B7%A1%BC%A5%C8)を開き、新しい種類のコンテンツのための[CSS](http://d.hatena.ne.jp/keyword/CSS)[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成し、そして共通のスタイルを複製するか、`@extend`やMixinを使って割り当てます。

コンテンツに依存しない`.media-card`クラスでは、記述するのは新しいHTMLのみで、[スタイルシート](http://d.hatena.ne.jp/keyword/%A5%B9%A5%BF%A5%A4%A5%EB%A5%B7%A1%BC%A5%C8)を開く必要はまったくありません。

もし本当に「関心の混合」をしているなら、複数の箇所に変更を加える必要が出てくるのではないでしょうか？

## 「関心の分離」は論証上の誤り

HTMLと[CSS](http://d.hatena.ne.jp/keyword/CSS)の関係性について「関心の分離」の観点から考えると、白黒は非常にはっきりしています。

「関心の分離」ができている（よい！）か、できていない（悪い！）かだけです。

しかしこれは、HTMLと[CSS](http://d.hatena.ne.jp/keyword/CSS)について考える上では正しい方法ではありません。

代わりに、**「依存の方向」について考えてみましょう**。

HTMLと[CSS](http://d.hatena.ne.jp/keyword/CSS)にはふたつの書き方があります。

1. 「関心の分離」   
** HTMLに依存する**[**CSS**](http://d.hatena.ne.jp/keyword/CSS)
コンテンツに基づいたクラス名（`.author-bio`など）を付与することで、[CSS](http://d.hatena.ne.jp/keyword/CSS)がHTMLに依存するように見なせます。
HTMLは依存していません。どのような見た目になるかは意識せず、`.author-bio`のような*HTML自身が制御できるフック*を公開しているだけです。
一方、[CSS](http://d.hatena.ne.jp/keyword/CSS)は依存しています。HTMLがどのようなクラスを公開しているのかを知った上で、それらを介してHTMLにスタイルを設定する必要があります。
このモデルでは、HTMLのスタイル変更が可能になる代わりに、[CSS](http://d.hatena.ne.jp/keyword/CSS)は再利用できません。
2. 「関心の混合」   
** **[**CSS**](http://d.hatena.ne.jp/keyword/CSS)**に依存するHTML**
UIの繰り返しのパターン（`.media-card`など）にちなんで、コンテンツにとらわれないようにクラスを[命名](http://d.hatena.ne.jp/keyword/%CC%BF%CC%BE)することで、HTMLが[CSS](http://d.hatena.ne.jp/keyword/CSS)に依存するように見なせます。
[CSS](http://d.hatena.ne.jp/keyword/CSS)は依存していません。どのようなコンテンツに適用されるかは意識せず、[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)に適用できる一連のブロックを公開しているだけです。
HTMLは依存しています。[CSS](http://d.hatena.ne.jp/keyword/CSS)から提供されたクラスを利用しているので、目的とするデザインを実現するためには、どのようなクラスが存在するかを知った上で、必要に応じてそれらを組み合わせる必要があります。
このモデルでは、[CSS](http://d.hatena.ne.jp/keyword/CSS)には再利用性がありますが、HTMLのスタイル変更はできません。

[CSS](http://d.hatena.ne.jp/keyword/CSS) Zen Gardenが最初のアプローチを取る一方で、[Bootstrap](http://v4-alpha.getbootstrap.com/)や[Bulma](http://bulma.io/)のようなUI[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)はふたつ目のアプローチを取ります。

本質的にはどちらも間違っていません。特定の状況下において、なにがより重要であるかに基づいて判断される問題です。

あなたが取り組んでいるプロジェクトでは、スタイル変更できるHTMLと再利用性のある[CSS](http://d.hatena.ne.jp/keyword/CSS)のどちらに価値があるでしょうか？

### 再利用性の選択

転機が訪れたのは、ニコラス゠[ギャラガ](http://d.hatena.ne.jp/keyword/%A5%AE%A5%E3%A5%E9%A5%AC)ー氏の「[HTMLのセマンティクスとフロントエンドアーキテクチャ](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)」を読んだときでした。

彼の指摘のすべてをここで繰り返すつもりはありませんが、そのブログ記事を読んで確信したのは、私が手がけているようなプロジェクトでは、[CSS](http://d.hatena.ne.jp/keyword/CSS)の再利用性に舵を切ることが明らかに正しい選択だということです。

## 第三段階 コンテンツに依存しない[CSS](http://d.hatena.ne.jp/keyword/CSS)[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)

この時点での私の目標は、コンテンツに基づいたクラスの作成を明確に避けることです。代わりに、できるだけ再利用性しやすい名前をつけるようにしました。

たとえば次のようなクラス名です。

- `.card`
- `.btn`、`.btn--primary`、`.btn--secondary`
- `.badge`
- `.card-list`、`.card-list-item`
- `.img--round`
- `.modal-form`、`.modal-form-section`

という具合です。

再利用性の高いクラスの作成に注力するようになってから、あることに気づきました。

[**コンポーネント**](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)**がより多くのことをしようとすればするほど、あるいは**[**コンポーネント**](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)**が特有のものであればあるほど、再利用しづらくなります。**

直感的な例を挙げてみましょう。

フォームを作っているとして、中にはいくつかのセクションがあり、下部に送信ボタンがあるとします。

フォームのコンテンツがすべて`.stacked-form`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の一部だと考えると、送信ボタンには`.stacked-form__button`のようなクラスを付与できます。

```plain text
<form class="stacked-form" action="#">
  <div class="stacked-form__section">
    <!-- ... -->
  </div>
  <div class="stacked-form__section">
    <!-- ... -->
  </div>
  <div class="stacked-form__section">
    <button class="stacked-form__button">Submit</button>
  </div>
</form>

```

しかしもしかすると、フォームの一部ではない別のボタンが含まれていて、同じようにスタイルを設定する必要があるかもしれません。

このボタンに`.stacked-form__button`クラスを使用すると辻褄が合いません。スタックドフォーム（stacked form）の一部ではないからです。

いずれにしてもボタンは、各ページにおける主要なアクションです。そのため、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の共通点に基づいた名前として`.btn--primary`と呼ぶことにして、`.stacked-form__`という接頭辞を取り払ってしまうのはどうでしょう？

```plain text
  <form class="stacked-form" action="#">
    <!-- ... -->
    <div class="stacked-form__section">
-     <button class="stacked-form__button">Submit</button>
+     <button class="btn btn--primary">Submit</button>
    </div>
  </form>

```

加えて、このスタックドフォームを、浮遊するカードのように見せたいとします。

ひとつのアプローチとしては、モディファイアを作成してこのフォームに適用することです。

```plain text
- <form class="stacked-form" action="#">
+ <form class="stacked-form stacked-form--card" action="#">
    <!-- ... -->
  </form>

```

しかしすでに`.card`クラスがあるのであれば、既存のカードとスタックドフォームを組み合わせて、この新しいUIを構成してみてはどうでしょうか？

```plain text
+ <div class="card">
    <form class="stacked-form" action="#">
      <!-- ... -->
    </form>
+ </div>

```

このようなアプローチを取ることで、どんなコンテンツにも対応できる`.card`と、どんなコンテナの内側にも配置できる、柔軟な`.stacked-form`ができます。

[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の再利用性が高まり、**新たな**[**CSS**](http://d.hatena.ne.jp/keyword/CSS)**を記述する必要もありませんでした**。

## サブ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)よりも[コンポジション](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)

たとえばスタックドフォームの下部に別のボタンを追加する必要があり、既存のボタンから少し間隔を空けて配置したいとします。

```plain text
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section">
    <button class="btn btn--secondary">Cancel</button>
    <!-- Need some space in here -->
    <button class="btn btn--primary">Submit</button>
  </div>
</form>

```

ひとつのアプローチとして、`.stacked-form__footer`のような新しいサブ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成し、`.stacked-form__footer-item`のような追加クラスを各ボタンに追加した上で、子孫[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)を使ってマージンを設定します。

```plain text
  <form class="stacked-form" action="#">
    <!-- ... -->
-   <div class="stacked-form__section">
+   <div class="stacked-form__section stacked-form__footer">
-     <button class="btn btn--secondary">Cancel</button>
-     <button class="btn btn--primary">Submit</button>
+     <button class="stacked-form__footer-item btn btn--secondary">Cancel</button>
+     <button class="stacked-form__footer-item btn btn--primary">Submit</button>
    </div>
  </form>

```

[CSS](http://d.hatena.ne.jp/keyword/CSS)は次のようになるでしょう。

```plain text
.stacked-form__footer {
  text-align: right;
}
.stacked-form__footer-item {
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
}

```

しかし、どこかのサブナビやヘッダーにも同じ問題があるとすればどうでしょう？

`.stacked-form`の外側で`.stacked-form__footer`を再利用することはできないので、ヘッダーの内側にも新しいサブ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成することになるかもしれません。

```plain text
  <header class="header-bar">
    <h2 class="header-bar__title">New Product</h2>
+   <div class="header-bar__actions">
+     <button class="header-bar__action btn btn--secondary">Cancel</button>
+     <button class="header-bar__action btn btn--primary">Save</button>
+   </div>
  </header>

```

しかしそうすると、`.stacked-form__footer`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を構築したのと同じ労力を、新しい`.header-bar__actions`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のためにも費やすことになります。

これは最初に出てきた、コンテンツありきのクラス名の問題と同じように思えます。

この問題を解決するひとつの方法は、再利用や[コンポジション](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)が容易にできる、別の*新しい*[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成することです。

たとえば`.actions-list`のようなものです。

```plain text
.actions-list {
  text-align: right;
}
.actions-list__item {
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
}

```

これで`.stacked-form__footer`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)と`.header-bar__actions`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を完全に取り払って、代わりに両方の場面で`.actions-list`を使用できるようになりました。

```plain text
<!-- Stacked form -->
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section">
    <div class="actions-list">
      <button class="actions-list__item btn btn--secondary">Cancel</button>
      <button class="actions-list__item btn btn--primary">Submit</button>
    </div>
  </div>
</form>

<!-- Header bar -->
<header class="header-bar">
  <h2 class="header-bar__title">New Product</h2>
  <div class="actions-list">
    <button class="actions-list__item btn btn--secondary">Cancel</button>
    <button class="actions-list__item btn btn--primary">Save</button>
  </div>
</header>

```

しかし、これらアクションリスト（actions list）の一方を左揃えに、もう一方を右揃えにしたいとすればどうでしょう？ `.actions-list--left`と`.actions-list--right`モディファイアを作るのでしょうか？

## 第四段階 コンテンツに依存しない[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)＋ユーティリティクラス

絶え間なくこのような[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の名前を考え続けていると疲れ果ててしまいます。

`.actions-list--left`のようなモディファイアを作るということは、ひとつの[CSS](http://d.hatena.ne.jp/keyword/CSS)プロパティを割り当てるためだけにひとつの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を新しく作るということです。名前に`left`と含まれている以上、「セマンティック」であると惑わされることもないでしょう。

もし、別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)でも左揃えと右揃えのモディファイアが必要になれば、同様に新しいモディファイアを作成するのでしょうか？

こうして、`.stacked-form__footer`と`.header-bar__actions`を廃止して、ただひとつの`.actions-list`と置き換える判断をしたときに直面した問題に戻ってきます。

**重複よりも**[**コンポジション**](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)**を選びます。**

では、アクションリストのひとつは左揃えに、もうひとつは右揃えにしたいとき、[コンポジション](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)を使えばどのように問題を解決できるでしょうか？

### 配置ユーティリティ

[コンポジション](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)を用いてこの問題を解決するには、再利用可能で、かつ必要な効果を得られるクラスを追加しなければいけません。

モディファイアのことはすでに`.actions-list--left`と`.actions-list--right`と呼ぶことにしていたので、これから作る新しいクラスを`.align-left`や`.align-right`のように呼ばない手はありません。

```plain text
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}

```

これで[コンポジション](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)を用いて、スタックドフォームのボタンを左揃えにできるようになりました。

```plain text
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section">
    <div class="actions-list align-left">
      <button class="actions-list__item btn btn--secondary">Cancel</button>
      <button class="actions-list__item btn btn--primary">Submit</button>
    </div>
  </div>
</form>

```

そして、ヘッダーのボタンは右揃えに。

```plain text
<header class="header-bar">
  <h2 class="header-bar__title">New Product</h2>
  <div class="actions-list align-right">
    <button class="actions-list__item btn btn--secondary">Cancel</button>
    <button class="actions-list__item btn btn--primary">Save</button>
  </div>
</header>

```

### 不安がらないで

HTMLの中にある「left」と「right」という表現を見て不安になるかもしれません。しかし確認しておきたいのは、もうしばらく前から、視覚的なパターンにちなんだ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)名を使っているということです。

`.stacked-form`が`.align-right`よりも「セマンティック」であるということはありません。いずれも[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)に属するプレゼンテーションにどのように影響を与えるかにちなんで名付けられたもので、特定の形のプレゼンテーションを実現するためにこれらのクラスを[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)に適用するのです。

つまり、[CSS](http://d.hatena.ne.jp/keyword/CSS)に依存したHTMLを書いています。フォームを`.stacked-form`から`.horizontal-form`に変更したければ、[CSS](http://d.hatena.ne.jp/keyword/CSS)ではなく[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)で行います。

### 不要な抽象化を削除する

この解決策において興味深いのは、`.actions-list`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が根本的に使い物にならなくなったことです。その以前はコンテンツを右揃えにするためだけのものでした。

これを削除してみましょう。

```plain text
- .actions-list {
-   text-align: right;
- }
  .actions-list__item {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }

```

しかし、`.actions-list`がないのに`.actions-list__item`があるのはちょっと変ですよね。`.actions-list__item`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作らずに、元々の問題を解決する方法はほかにないでしょうか？

思い返してみると、この[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作ったのは、ふたつのボタンの間に少しのマージンを追加するためでした。`.actions-list`は、ボタンのリストを表すのに適切なメタファーであり、総称的かつ十分に再利用可能なものでしたが、もちろん「アクション」ではない項目の間にも同じだけの余白が必要な場面もあるでしょう。

より再利用性しやすい名前にするとすれば、`.spaced-horizontal-list`というところでしょうか？ すでに、実際にスタイル設定する必要があるのは子要素だけだからという理由で、`.actions-list`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を削除したばかりなのにもかかわらず。

### スペーサーユーティリティ

子要素だけにスタイルが必要なのであれば、手の込んだ擬似[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)を使ってグループとしてスタイルを設定するのではなく、子要素に個別にスタイルを設定したほうが簡単ではないでしょうか？

要素の隣に余白を追加したいとき、最も再利用性しやすいのは、「この要素の隣には余白ができる」と表現できるクラスです。

すでに`.align-left`や`.align-right`のようなユーティリティを追加していますし、右方向のマージンを追加するためだけのユーティリティも新しく作るのはどうでしょうか？

`.mar-r-sm`のような新しいユーティリティクラスを作成して、要素の右側にわずかなマージンを追加してみましょう。

```plain text
- .actions-list__item {
-   margin-right: 1rem;
-   &:last-child {
-     margin-right: 0;
-   }
- }
+ .mar-r-sm {
+   margin-right: 1rem;
+ }

```

フォームとヘッダーは次のようになります。

```plain text
<!-- Stacked form -->
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section align-left">
    <button class="btn btn--secondary mar-r-sm">Cancel</button>
    <button class="btn btn--primary">Submit</button>
  </div>
</form>

<!-- Header bar -->
<header class="header-bar">
  <h2 class="header-bar__title">New Product</h2>
  <div class="align-right">
    <button class="btn btn--secondary mar-r-sm">Cancel</button>
    <button class="btn btn--primary">Save</button>
  </div>
</header>

```

`.actions-list`の概念はもはやどこにも見当たらず、[CSS](http://d.hatena.ne.jp/keyword/CSS)は小さくなり、クラスの再利用性は高まりました。

## 第五段階 ユーティリティファースト[CSS](http://d.hatena.ne.jp/keyword/CSS)

これが腑に落ちると、一般的なビジュアル調整のために必要なユーティリティクラス一式を構築してしまうまで時間はかかりませんでした。これは例えば――

- テキストサイズ、色、ウェイト
- ボーダーカラー、幅、基準位置
- 背景色
- フレックスボックスのユーティリティ
- パディングとマージンのヘルパー

これによって、驚くべきことに、新しい[CSS](http://d.hatena.ne.jp/keyword/CSS)を記述することなくまったく新しいUI[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を構築できるのです。

私のプロジェクトにある一種の「商品カード」[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を見てみましょう。

![[29088813-62ff9b86-7c48-11e7-9854-9c966ffbf9c4.png]]

[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)は次のようになっています。

```plain text
<div class="card rounded shadow">
    <a href="..." class="block">
        <img class="block fit" src="...">
    </a>
    <div class="py-3 px-4 border-b border-dark-soft flex-spaced flex-y-center">
        <div class="text-ellipsis mr-4">
            <a href="..." class="text-lg text-medium">
                Test-Driven Laravel
            </a>
        </div>
        <a href="..." class="link-softer">
            @icon('link')
        </a>
    </div>
    <div class="flex text-lg text-dark">
        <div class="py-2 px-4 border-r border-dark-soft">
            @icon('currency-dollar', 'icon-sm text-dark-softest mr-4')
            <span>$3,475</span>
        </div>
        <div class="py-2 px-4">
            @icon('user', 'icon-sm text-dark-softest mr-4')
            <span>25</span>
        </div>
    </div>
</div>

```

これに使われているクラスの数を見ると、最初は躊躇してしまうかもしれません。しかし、もしこれをユーティリティで構成するのではなく、真の[CSS](http://d.hatena.ne.jp/keyword/CSS)[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)にしたいとすれば、これをなんと呼ぶのでしょうか？

コンテンツありきの名前にすると、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は特定のコンテキストでしか使えなくなってしまうので、そうしたくはありません。

すると、こんなところでしょうか？

```plain text
.image-card-with-a-full-width-section-and-a-split-section { ... }

```

もちろんあり得ません。それよりも、前に説明したようなもっと簡単な[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)で構成したいと思うでしょう。

では、それはどういった[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)でしょうか？

たとえば、カードという[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)とか。しかし、すべてのカードに影があるわけではないので、`.card--shadowed`モディファイアを用意するといいでしょうし、任意の要素に適用できる`.shadow`ユーティリティを作成することもできます。そのほうが再利用性しやすそうなので、そうしてみましょう。

サイトにあるカードの中には、角が丸くなっていないものもありますが、このカードは違います。`.card--rounded`としてもよいですが、サイトには同じように角が丸くなっている要素がほかにもありますし、それらはカードではありません。`.rounded`ユーティリティのほうが再利用しやすいでしょう。

トップの画像はどうでしょう？ `.img--fitted`のような名前で、カードいっぱいになるかもしれません。サイトでは、親の幅に合わせてなにかをフィットさせたい場所はほかにもいくつかあって、それが画像とは限りません。`.fit`ヘルパーのほうがいいかもしれませんね。

そう。私がどこに向かおうとしているか、お分かりになるでしょう。

再利用性に焦点を当てて、この道をずっと辿っていくと、再利用可能なユーティリティを使ってこの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を構築するようになるのが自然な流れなのです。

### 一貫性の強制

小さくて組み合わせ可能なユーティリティを使用する大きな利点は、チームにいるすべての開発者に対して、つねに、固定されたオプションの中から値を選択させられることです。

HTMLのスタイルを設定するとき、「このテキストはもう少し暗くしたほうがいいかな」と思って、ベースとなる`$text-color`を`darken()`関数で調整したようなことが何度もあるのではないでしょうか？

あるいは「このフォントはもう少し小さいほうがいいな」と思って、手を入れている[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に`font-size: .85em`を追加したことはありませんか？

任意の値ではなく、相対的な色や相対的なフォントサイズを使用しているので、「正しい」やり方をしているように感じられることでしょう。

しかし、あなたが自分の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のためにテキストを10%暗くする一方で、ほかの人は12%暗くするとすればどうでしょう？ 気づいたころには、[スタイルシートには402種類もの独自の文字色が存在することになります](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2Fe5349db6f1ccbd175f7dd7c581e061b4d49c1ff4%2Fgitlab.css)。

スタイルを設定するたびに新しく[CSS](http://d.hatena.ne.jp/keyword/CSS)を書くことになる場合、コードベースがこのようになる事態は避けられないのです。

- [GitLab](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2Fe5349db6f1ccbd175f7dd7c581e061b4d49c1ff4%2Fgitlab.css): 402の文字色、239の背景色、59のフォントサイズ
- [Buffer](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2Fd560c4dadb9e85197d6e33ac0cb55c2435c45c65%2Fbuffer.css): 124の文字色、86の背景色、54のフォントサイズ
- [HelpScout](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2F1a12773f211891f4199d03c59bde97e814e044f0%2Fhelpscout.css): 198の文字色、133の背景色、67のフォントサイズ
- [Gumroad](http://cssstats.com/stats?link=https%3A%2F%2Fstatic-1.gumroad.com%2Fres%2Fgumroad%2Fassets%2Fapplication-f7ade6b83ca73dcd02cc9762068df43c4ea824e0c94babde8e4c9ecfc2653acb.css): 91の文字色、28の背景色、48のフォントサイズ
- [Stripe](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2Fca146a9dbe99754159c07c6599ea45d2%2Fraw%2F90d64ed31422e9c4fc8b08b035b47ea048275ad1%2Fstripe.css): 189の文字色、90の背景色、35のフォントサイズ
- [GitHub](http://cssstats.com/stats?url=http%3A%2F%2Fgithub.com&name=GitHub): 163の文字色、147の背景色、56のフォントサイズ
- [ConvertKit](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F4ca6aafc50342ad87a98970204053b71%2Fraw%2Fbb42e4fda01d9933afff7225b33e77dbfbd559ff%2Fconvertkit.css): 128の文字色、124の背景色、70のフォントサイズ

新しく[CSS](http://d.hatena.ne.jp/keyword/CSS)を書くことは、真っ白なキャンバスに絵を描くようなもので、好きな値を使うことを妨げるものはなにもありません。

変数やMixinを使って一貫性を持たせることもできますが、そもそも**新しく書かれる**[**CSS**](http://d.hatena.ne.jp/keyword/CSS)**のすべてが複雑性の元凶なのです**。[CSS](http://d.hatena.ne.jp/keyword/CSS)を増やしても[CSS](http://d.hatena.ne.jp/keyword/CSS)がシンプルになることは決してありません。

代わりに、既存のクラスを適用してスタイルを設定できれば、真っ白なキャンバスの問題はたちまち解消されることになります。

テキスト色の暗さを少し和らげたいですか？ `.text-dark-soft`クラスを追加しましょう。

フォントサイズを少し小さくする必要がありますか？ `.text-sm`クラスを使いましょう。

プロジェクトに携わる全員が、選定されたオプションの中からスタイルを決めることで、プロジェクトの規模とともに[CSS](http://d.hatena.ne.jp/keyword/CSS)が直線的に増大してしまう事態を回避できるだけでなく、自ずと一貫性も保たれます。

### それでも[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は作るべきです

ほかのファンクショナル[CSS](http://d.hatena.ne.jp/keyword/CSS)の熱心な支持者と少し違うのは、私は、ユーティリティ*だけ*で作るべきだとは考えていないという点です。

ユーティリティベースの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)として人気の[Tachyons](http://tachyons.io/)などを見ると、ボタンのスタイルでさえも純粋なユーティリティから作られているのがわかります（Tachyonsはもちろんすばらしいプロジェクトです）。

```plain text
<button class="f6 br3 ph3 pv2 white bg-purple hover-bg-light-purple">
  Button Text
</button>

```

ひとまず、これを分解してみましょう。

- `f6`: フォントサイズをフォントサイズスケールの6番目にする（Tachyonsでは.875rem）
- `br3`: ボーダーラディウスをラディウススケールの3番目にする（.5rem）
- `ph3`: 水平方向のパディングをパディングスケールの3番目のサイズにする（1rem）
- `pv2`: 垂直方向のパディングをパディングスケールの2番目のサイズにする（.5rem）
- `white`: テキストを白くする
- `bg-purple`: 背景色を紫にする
- `hover-bg-light-purple`: ホバーの際には背景色を明るい紫にする

このような同じクラスの組み合わせからなるボタンが複数必要な場合、Tachyonsでは、[CSS](http://d.hatena.ne.jp/keyword/CSS)ではなくテンプレートを通して抽象化することが推奨されています。

たとえば[Vue.js](https://vuejs.org/)を使っているのなら、次のように使える[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作ります。

```plain text
<ui-button color="purple">Save</ui-button>

```

これは、次のような定義になります。

```plain text
<template>
  <button class="f6 br3 ph3 pv2" :class="colorClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['color'],
  computed: {
    colorClasses() {
      return {
        purple: 'white bg-purple hover-bg-light-purple',
        lightGray: 'mid-gray bg-light-gray hover-bg-light-silver',
        // ...
      }[this.color]
    }
  }
}
</script>

```

これは多くのプロジェクトにとって有力なアプローチですが、テンプレートベースの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成するよりも、[**CSS**](http://d.hatena.ne.jp/keyword/CSS)[**コンポーネント**](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)**を作成したほうが役立つ場面も多いと私は考えています**。

私が手がけているようなプロジェクトでは、サイトにある小さな[ウィジェット](http://d.hatena.ne.jp/keyword/%A5%A6%A5%A3%A5%B8%A5%A7%A5%C3%A5%C8)をすべてテンプレート化するよりも、新しい`.btn-purple`クラスを作って、これら7つのユーティリティをバンドルしたほうがたいてい簡単です。

### それでも、最初はユーティリティで作ります

[CSS](http://d.hatena.ne.jp/keyword/CSS)に対して私が取るアプローチをユーティリティ*ファースト*と呼んでいるのは、できる限りのものをユーティリティで作ってから、**繰り返されるパターンが登場したときにだけ抽出するようにしているから**です。

[プリプロセッサ](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D7%A5%ED%A5%BB%A5%C3%A5%B5)ーとして[Less](http://lesscss.org/)を使用しているなら、既存のクラスをMixinにできます。つまり、エディタでマルチカーソルを使ってちょっとした操作をするだけで`.btn-purple`[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作成できます。

![[29084097-f16c97c6-7c38-11e7-92dd-d20c1364d869.gif]]

残念なのは、SassやStylusでも同じようなことをするには、すべてのユーティリティクラスのために個別のMixinを作成する必要があり、少し手間がかかることです。

もちろん、ユーティリティだけで[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のすべての宣言が行えるわけではありません。親要素をホバーしたときに子要素のプロパティを変更するような、要素間の複雑なインタ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ションは、ユーティリティだけでは困難です。よりシンプルに感じられるやり方を判断して選択するようにしてください。

### 早すぎる抽象化はもうやめよう

[CSS](http://d.hatena.ne.jp/keyword/CSS)で[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ファーストのアプローチを取ると、たとえ再利用されることがなくても[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作ることになります。この時期尚早の抽象化が原因で、[スタイルシート](http://d.hatena.ne.jp/keyword/%A5%B9%A5%BF%A5%A4%A5%EB%A5%B7%A1%BC%A5%C8)は肥大化したり複雑化することになります。

ナビバーを例に考えてみましょう。アプリにあるメインのナビバーの[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)は何度も繰り返し記述するでしょうか？

私のプロジェクトでは、メインのレイアウトファイルに一度だけ記述するのが普通です。

まずはユーティリティを使って作るようにして、重複が気になった場合にのみ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)として抽出するようにすれば、**ナビバーを**[**コンポーネント**](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)**にする必要はおそらくないでしょう**。

そして、ナビバーは次のようになります。

```plain text
<nav class="bg-brand py-4 flex-spaced">
  <div><!-- Logo goes here --></div>
  <div>
    <!-- Menu items go here -->
  </div>
</nav>

```

抽出すべきものはなにもありません。

## ただのインラインスタイルなのでは？

このアプローチは、HTML要素にスタイル属性を書き殴って必要なプロパティを追加するのと変わらないと考えることも容易でしょう。しかし私の経験では、まったく異なるものです。

インラインスタイルでは、どのような値を選択するかに制約がありません。

ある要素は`font-size: 14px`、別の要素は`font-size: 13px`、また別の要素は`font-size: .9em`、そのまた別の要素は`font-size: .85rem`ということになり得るのです。

**つまり、新しい**[**コンポーネント**](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)**ごとに新しい**[**CSS**](http://d.hatena.ne.jp/keyword/CSS)**を記述する場合に直面する、真っ白なキャンバスの問題です。**

ユーティリティでは選択を迫られます。

これは`text-sm`か`text-xs`か？

`py-3`と`py-4`のどちらを使うべきか？

`text-dark-soft`と`text-dark-faint`のどちらにしたいのか？

なんでも好きな値を選択することはできず、選定されたリストの中から選ばなければなりません。

380色の文字色ではなく、10色や12色に制限されます。

ユーティリティファーストで作業することは、最初は、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ファーストよりも直感的ではないかもしれませんが、より一貫したデザインになると経験上言えます。

## どこから始めるか

このアプローチに興味を持たれた方は、次の[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)について調べてみるのがいいでしょう。

- [Tachyons](http://tachyons.io/)
- [Basscss](http://basscss.com/)
- [Beard](http://buildwithbeard.com/)
- [turretcss](http://turretcss.com/)

また最近、私は[Tailwind CSS](https://tailwindcss.com/)というPostCSS[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)を[オープンソース](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D7%A5%F3%A5%BD%A1%BC%A5%B9)でリリースしました。実用性を第一に考えながら、繰り返されるパターンから構成要素を抽出するという考え方に基づいて設計しています。

興味のある方は、ぜひ[Tailwind CSSのウェブサイトにアクセス](https://tailwindcss.com/)して試してみてください。

「[CSSにおける汎用化の先送り、ユーティリティファーストCSS、レイアウトプリミティブ](https://yuheiy.hatenablog.com/entry/2020/05/06/213311)」の続き。

同じようなレイアウトを実現するための[CSS](http://d.hatena.ne.jp/keyword/CSS)を僕は実のところ何度も繰り返し書いていた。そのたびに新しい[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作り、意図を表明するための名前を捻り出し、やってることはたいして変わらないのに別々になった実装を増やしていた。その総量に埋もれて全体が見えなくなっていった。

個別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を汎用的なように変換するのは難しい。本当にまったく同じレイアウトならそれほど難しくないが、多くの場合には微妙な差分がある。余白の大きさが違う、グリッドのカラム数が違う、コンテナの幅が違う。いかにしてそれらに規則性を見い出してうまくいく設計ができるかは、腕の見せどころとも言える一方で再現性がなく見通しのつかない仕事だと思っていた。

Every Layoutのレイアウトプリミティブはそのようなレイアウトの構成要素が最小単位まで分解され、パターン集として文書化されたもの。これら最小単位のパターンはパターンと対応する[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)として切り出せる粒度になっていて、また複数のパターン同士を組み合わせることによって最終的なレイアウトを実現する前提で設計されている。有名なところではBootstrapのグリッドシステムの設計が近い：

```plain text
<div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>

```

出典：[Grid system · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/layout/grid/)

`.row`は子要素をカラムとして扱うためのコンテナであり、`.col-sm`はカラムである子要素につねに対応するので、カラムのパターンとしては`.row`と`.col-sm`はセットになるが、`.container`はコンテナ幅を制御するためだけのクラスであるためカラムの実現には必要ではない。`.container`と`.row`は互いに依存関係を持たない独立した存在であり、それぞれは自らの責務のみを意識している。そしてテンプレート側でこれら別々のパターンを組み合わせることで、最終的な結果として、制御されたコンテナ幅の中でカラム分割されたレイアウトが実現される。

このように独立したパターンを組み合わせてレイアウトする利点は、あるパターンの利用が別のパターンに制約されなくなることにより組み合わせ可能なバリエーションが大幅に増え、より少ない[CSS](http://d.hatena.ne.jp/keyword/CSS)でより多くのレイアウトを実現できるようになる冗長性にある。あるパターンに3のバリエーションがあり、別のパターンには5のバリエーションがあるとき、テンプレート側でそれらをかけ合わせると15のバリエーションを表現できるようになる。[CSS](http://d.hatena.ne.jp/keyword/CSS)は8のままで。

レイアウトプリミティブを利用するとそれだけで相当数のレイアウトが表現できる。すべてのパターンがプリミティブであり、かつそれぞれが組み合わせ可能なことを前提としているからだ。ひとつひとつのパターンとしても利用頻度が高いものが多く、自分が携わるほとんどのサイトの構築において汎用的な[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)設計のパターンとして効果を上げた実績もある。

しかしEvery Layoutでの解説にもとづくとそのままでは現実のプロジェクトに適用しづらい部分がある。そのひとつはパターンのバリエーションをカスタムプロパティを用いて表現していること。多くのプロジェクトではIE11でもほとんど同じように表示できることを求められるのでこれは採用できない。ポリフィルもあまり信用できないし。もうひとつはメディアクエリによる上書きを意図的に想定していないこと。Every Layoutはレイアウトの制御を[ブラウザや公理に委ねること](https://every-layout.dev/rudiments/axioms/)を強く主張しており、ビューポート幅にもとづくスタイル宣言の変更というある種恣意的なレイアウトの操作に依存しないようにレイアウトプリミティブも設計されている。しかしそれでは少なくとも業務での実践は難しいだろう。

この記事ではレイアウトプリミティブを現実のプロジェクトに取り入れるために行ったいくつかの対処方法を紹介する。レイアウトプリミティブを[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)として実装していく方向で進めるが、後述する理由によりすべてを[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)にはしない（あるいはできない）。なおこの記事ではそれぞれのレイアウトプリミティブについては詳しく言及せず、あらかじめ理解されている前提で述べる。必要に応じてEvery Layoutをご参照いただきたい。また記事中では説明の都合上、[ソースコード](http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9)の一部のみを抜粋して掲載している。完全な状態は記事の末尾でまとめて確認できる。

## バリエーション

[Stack](https://every-layout.dev/layouts/stack/)は縦方向に配置された要素間に均一の余白を設定するパターン。この場合の余白の大きさの指定方法として次のような実装が紹介されている。

```plain text
<div class="stack">
  <p>Lorem ipsum dolor sit amet.</p>
  <p>Lorem ipsum dolor sit amet.</p>
  <h2>title</h2>
  <p>Lorem ipsum dolor sit amet.</p>
  <p>Lorem ipsum dolor sit amet.</p>
</div>

```

```plain text
.stack {
  --space: 1.5rem;
}

.stack > * + * {
  margin-top: var(--space);
}

h2,
h2 + * {
  --space: 3rem;
}

```

`.stack`の`--space`プロパティの上書きによってデフォルトの余白が変更可能になっており、個別の要素の前後の余白は`--space`プロパティの宣言によって、詳細度の高い`.stack > * + *`の`margin-top`を上書きせずに変更できる。

- `-space`プロパティのおかげで`.stack`は自らが表現する余白のバリエーションを知っておかなくてもよくなる。場面に応じて利用する側から指定されればそれに対応できる。これがカスタムプロパティを使えないとすれば、BEMのモディファイアのようなやり方で余白の大きさを指定することになる。モディファイアでそのままサイズを指定することはできないので、キーであるモディファイアと値との対応を考えなければならない。つまりあらゆる余白のバリエーションを把握する必要がある。

デザイン[ガイドライン](http://d.hatena.ne.jp/keyword/%A5%AC%A5%A4%A5%C9%A5%E9%A5%A4%A5%F3)として余白のバリエーションが文書化されていればそれを利用できるが、多くの場合では各ページのデザインファイルから地道に拾い上げていくしかない。しかしそうするとバリエーションが膨大になってしまったり、デザイン変更のたびにバリエーションが影響を受けて再考の作業が生まれてしまう。多くの箇所で再利用する前提の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に参照されている以上、余白のバリエーションは可能な限り早い段階でフリーズさせたい。最初からあらかじめわかっている状態にできればベストだ。そのため特定のページだけに依存せずあらゆるプロジェクトに適用できるパターンを模索してきたが、現在としては「[音楽、数学、タイポグラフィ](https://standard.shiftbrain.com/blog/music-math-typography)」で紹介された8px（0.5rem）を基数として[フィボナッチ数列](http://d.hatena.ne.jp/keyword/%A5%D5%A5%A3%A5%DC%A5%CA%A5%C3%A5%C1%BF%F4%CE%F3)をかけ合わせて生成されたバリエーションをベースに少し変形させたものを足がかり的に利用している。その状態から最後まで変更なしのままプロジェクトを見届けることもあれば、細かい調整が必要になることもあるが、まったく見当違いの設定になっていることはなかった。

こうして計画した余白のバリエーションから、Sassを利用してモディファイアを次のように実装している。

`_core.scss`:

```plain text
// Spacing

$-spacing-unit: 0.5rem;

$spacing-1: $-spacing-unit / 2;
$spacing-2: $-spacing-unit * 1;
$spacing-3: $-spacing-unit * 1.5;
$spacing-4: $-spacing-unit * 2;
$spacing-5: $-spacing-unit * 3;
$spacing-6: $-spacing-unit * 5;
$spacing-7: $-spacing-unit * 8;
$spacing-8: $-spacing-unit * 13;
$spacing-9: $-spacing-unit * 21;

$spacings: (
  0: 0,
  1: $spacing-1, // 0.25rem =   4px
  2: $spacing-2, //  0.5rem =   8px
  3: $spacing-3, // 0.75rem =  12px
  4: $spacing-4, //    1rem =  16px
  5: $spacing-5, //  1.5rem =  24px
  6: $spacing-6, //  2.5rem =  40px
  7: $spacing-7, //    4rem =  64px
  8: $spacing-8, //  6.5rem = 104px
  9: $spacing-9, // 10.5rem = 168px
);
```

（余白のバリエーションを個別の変数とマップで宣言しているのはエディタの補完とループのためという事情。ループを用いない場面では個々の変数を参照する。）

`_Stack.scss`:

```plain text
/**
 * Spacing variant:
 *
 * <div class="Stack -s{spacing}"></div>
 */

@each $spacing-key, $spacing in $spacings {
  $name: s#{$spacing-key};

  .Stack.-#{$name} > * + * {
    margin-top: $spacing;
  }
}
```

```plain text
<div class="Stack -s4">
  <p>foo</p>
  <p>bar</p>
  <p>baz</p>
</div>

```

こうしてあらゆる縦の余白のバリエーションがひとつの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)だけで実現できるようになった。しかしこれだけでは特定の箇所に異なる余白がある場合に対応できない。それについては2つのやり方を場面によって使い分けている。ひとつはユーティリティクラスの導入だ。なんとなく導入されたユーティリティクラスは悪い設計を招いてしまうが、利用の目的がはっきりとしていれば問題はない。この場合ではStackのコンテキスト内で個別の`margin-top`を設定すること。またそのユーティリティクラスを使うことで新たな[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)を増やさず済ませられる場合にも利用できる。

`_utilities.scss`:

```plain text
// margin-top property

/**
 * Usage:
 *
 * <div class="Stack -s2">
 *   <div>foo</div>
 *   <div class="mt-4">bar</div>
 *   <div>baz</div>
 * </div>
 *
 * <div class="mt-3"></div>
 *
 * Spacing variant:
 *
 * <div class="mt-{spacing}"></div>
 */

@each $spacing-key, $spacing in $spacings {
  $name: mt-#{$spacing-key};

  .#{$name} {
    margin-top: $spacing !important;
  }
}
```

`margin-bottom`や`padding`などのユーティリティクラスは本当に必要になるタイミングまで作らない。

もうひとつのやり方は、Stackとそもそも別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作ってしまうこと。新しい[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は増えてしまうが、特殊な対応は個別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に切り出して閉じ込めておいた方がいい場合もある。あるいはすでに存在する[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)にBEMでいうエレメントとして追加するのであれば比較的気兼ねなく行えるだろう。

```plain text
<div class="ArticleBody">
  <p>レイアウトプリミティブを現実のプロジェクトに取り入れるために…</p>
  <h2>バリエーション</h2>
  <p>Stackは縦方向に配置された要素間に均一の余白を…</p>
</div>

```

`_ArticleBody.scss`：

```plain text
.ArticleBody > * + * {
  margin-top: 1.5rem;
}

.ArticleBody > h2,
.ArticleBody > h2 + * {
  margin-top: 3rem;
}
```

ほとんどのレイアウトプリミティブは余白を表現する責務を持つので、余白のモディファイアについては先ほどのバリエーションを参照することで同様の解法がとれる。しかしStackの余白は縦方向のみなのに対して、たとえばClusterには縦横両方向の余白がある。Every Layoutでは縦横で同じ余白が挿入される実装になっているが、汎用性としては別々の値を指定できた方が良い。そのために全方向の余白・X軸の余白・Y軸の余白を個別に指定できる別々のモディファイアを設定するようにした：

`_Cluster.scss`:

```plain text
.Cluster {
  display: block;
  overflow: hidden;
}

.Cluster > * {
  display: flex;
  flex-wrap: wrap;
}

/**
 * Spacing variant:
 *
 * <div class="Cluster -s{spacing}"></div>
 * <div class="Cluster -sx{spacing}"></div>
 * <div class="Cluster -sy{spacing}"></div>
 */

@each $spacing-key, $spacing in $spacings {
  $name: s#{$spacing-key};

  .Cluster.-#{$name} > * {
    margin: ($spacing / 2 * -1);
  }

  .Cluster.-#{$name} > * > * {
    margin: ($spacing / 2);
  }
}

@each $spacing-key, $spacing in $spacings {
  $name-x: sx#{$spacing-key};

  .Cluster.-#{$name-x} > * {
    margin-right: ($spacing / 2 * -1);
    margin-left: ($spacing / 2 * -1);
  }

  .Cluster.-#{$name-x} > * > * {
    margin-right: ($spacing / 2);
    margin-left: ($spacing / 2);
  }

  $name-y: sy#{$spacing-key};

  .Cluster.-#{$name-y} > * {
    margin-top: ($spacing / 2 * -1);
    margin-bottom: ($spacing / 2 * -1);
  }

  .Cluster.-#{$name-y} > * > * {
    margin-top: ($spacing / 2);
    margin-bottom: ($spacing / 2);
  }
}
```

またEvery Layoutではあまり言及されていない点として、ネガティブマージンによってはみ出る領域を`overflow: hidden`で非表示にしてしまうハックの扱いにくさがある。この手を使ってしまうと、ネガティブマージン以外にもはみ出る`outline`プロパティや`box-shadow`プロパティ、あるいは外方向に動くアニメーションが見切れてしまう。これについては、デフォルトとしては`overflow: hidden`を設定しておいて、問題になる箇所だけを個別にオプトアウトするようにした：

`_Cluster.scss`:

```plain text
.Cluster {
  display: block;
}

/**
 * Overflow variant:
 *
 * <div class="Cluster -overflow"></div>
 */

.Cluster:not(.-overflow) {
  overflow: hidden;
}

.Cluster > * {
  display: flex;
  flex-wrap: wrap;
}
```

デフォルトを`hidden`にしているのは、ネガティブマージンによるはみ出しの方がより無意識的なバグを生んでしまいそうに思えるから。

そしてClusterには余白だけでなく`justify-content`と`align-items`も個別に設定できるようになっている。オリジナルではカスタムプロパティで直接値を渡せるが、モディファイアとして表現するには余白と同様にあらかじめバリエーションを列挙する必要がある。これらのプロパティでよく使う値はだいたいわかっているのでほぼ決め打ちにできる。

`_Cluster.scss`：

```plain text
/**
 * Justify variant:
 *
 * <div class="Cluster -justify-{justify}"></div>
 */

$Cluster-justifiers: (
  start: flex-start,
  end: flex-end,
  center: center,
  between: space-between,
);

@each $justifier-key, $justifier in $Cluster-justifiers {
  $name: justify-#{$justifier-key};

  .Cluster.-#{$name} > * {
    justify-content: $justifier;
  }
}

/**
 * Align variant:
 *
 * <div class="Cluster -align-{align}"></div>
 */

$Cluster-aligners: (
  start: flex-start,
  end: flex-end,
  center: center,
  stretch: stretch,
);

@each $aligner-key, $aligner in $Cluster-aligners {
  $name: align-#{$aligner-key};

  .Cluster.-#{$name} > * {
    align-items: $aligner;
  }
}
```

次に、CenterはBootstrapの`.container`に似たパターンで、`max-width`の値はカスタムプロパティから渡される想定になっている。具体的な幅はサイトによってまちまちなので、この設定は実際のものを作り始めてみるまでどうにもならない。多くのサイトは複数のコンテンツ幅を組み合わせて構成されているので、作りながらバリエーションを探って、やはりこれもモディファイアで表現していく：

`_Center.scss`:

```plain text
.Center {
  box-sizing: content-box;
  display: block;
  max-width: 60rem;
  margin-right: auto;
  margin-left: auto;
}

.Center.-wide {
  max-width: 75rem;
}

.Center.-narrow {
  max-width: 45rem;
}

/**
 * Gutters variant:
 *
 * <div class="Grid -noGutters"></div>
 */

.Center:not(.-noGutters) {
  padding-right: $spacing-5;
  padding-left: $spacing-5;
}
```

これは単[純化](http://d.hatena.ne.jp/keyword/%BD%E3%B2%BD)した例で、実際にはブレイクポイントごとに個別の幅を設定することが多い。しかしブレイクポイントをまたいだときの変化が均一化されていない場合もあり、モディファイアの設計が難しいパターンかもしれない。そういった場合はStackについて述べたように別[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)化してしまうか、あるいはメディアクエリ付きモディファイアの導入を検討する。

## メディアクエリ

ビューポート幅が変化しても同じパターンのレイアウトのままで成立させられる場面は多いが、余白などのキーだけは個別に変更が必要になることがほとんどだ。たとえば狭いビューポート幅では余白も狭く、広いビューポート幅では余白も広くというのが典型的。結局これに対応できないと再利用性のない個別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作り込んでいくしかなくなってしまう。そのためメディアクエリごとに機能するモディファイアを用意して利用側で個別に指定する形で対処した：

`_core.scss`:

```plain text
$mq-breakpoints: (
  xs: 0,
  sm: 36em, //  576px
  md: 48em, //  768px
  lg: 64em, // 1024px
  xl: 80em, // 1280px
);

@mixin breakpoint($key, $until: false) {
  @if map.has-key($mq-breakpoints, $key) == false {
    @error "`#{$key}` not found in $mq-breakpoints";
  }
  $breakpoint: map.get($mq-breakpoints, $key);
  $is-zero: $breakpoint == 0;

  @if $is-zero and $until {
    @error "Breakpoints are not available for screens smaller than 0px";
  }

  @if $is-zero {
    @content;
  } @else if $until {
    @media not all and (min-width: #{$breakpoint}) {
      @content;
    }
  } @else {
    @media (min-width: #{$breakpoint}) {
      @content;
    }
  }
}
```

`_Stack.scss`:

```plain text
/**
 * Spacing variant:
 *
 * <div class="Stack -s{spacing}"></div>
 * <div class="Stack -{breakpoint}:s{spacing}"></div>
 */

@each $breakpoint-key, $breakpoint in $mq-breakpoints {
  $uses-media-query: $breakpoint != 0;
  $breakpoint-prefix: if($uses-media-query, "#{$breakpoint-key}\\:", null);

  @include breakpoint($breakpoint-key) {
    @each $spacing-key, $spacing in $spacings {
      $name: s#{$spacing-key};

      .Stack.-#{$breakpoint-prefix}#{$name} > * + * {
        margin-top: $spacing;
      }
    }
  }
}
```

```plain text
<div class="Stack -s3 -md:s5 -lg:s6">
  <p>foo</p>
  <p>bar</p>
  <p>baz</p>
</div>

```

ほかのパターンの余白や`justify-content`、ユーティリティクラスなどについても同様に実装する。

メディアクエリごとの宣言を追加することで[CSS](http://d.hatena.ne.jp/keyword/CSS)の出力サイズは増えてしまうが、レイアウトプリミティブが全体の個別性を吸収することで結果的にはむしろサイズを抑えられる場合もある。あるいはレイアウトプリミティブによって[CSS](http://d.hatena.ne.jp/keyword/CSS)の実装時間を節約することで、より費用対効果の高いパフォーマンス改善に臨めるとも考えられる。

メディアクエリごとのモディファイアを記述する煩雑さについては、テンプレートエンジンの機能によってある程度軽減できる。たとえばReactであれば、次のような宣言によって上記と同様のクラス属性値が出力されるようにすると良い：

```plain text
<Stack s={[3, null, 5, 6]}>
  <p>foo</p>
  <p>bar</p>
  <p>baz</p>
</Stack>

```

こうすれば必要に応じて型チェックも挿入できる。配列としてキーを渡すア[イデア](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C7%A5%A2)は[Styled SystemのArray Props](https://styled-system.com/guides/array-props)から拝借した。同様のインターフェースはPugのmixin機能などでも実現できる。

またオリジナルのレイアウトプリミティブの中には、メディアクエリには依存せずに要素自身の幅の変化によって子要素の並びが変わる[Sidebar](http://d.hatena.ne.jp/keyword/Sidebar)やSwitchがある。これらには並びを変化させるブレイクポイントとしてそのタイミングの要素の幅をカスタムプロパティで指定するが、メディアクエリを前提とした設計であれば普通にメディアクエリで上書きした方が素直だろう。ブレイクポイントの指定は先述と同様にモディファイアで行う：

`_Switcher.scss`:

```plain text
.Switcher > * {
  display: flex;
  flex-direction: column;
}

.Switcher > * > * {
  flex-shrink: 0;
  width: 100%;
}

/**
 * Row variant:
 *
 * <div class="Switcher -row"></div>
 * <div class="Switcher -{breakpoint}:row"></div>
 */

$Switcher-row-name: row;

@each $breakpoint-key, $breakpoint in $mq-breakpoints {
  $uses-media-query: $breakpoint != 0;
  $breakpoint-prefix: if($uses-media-query, "#{$breakpoint-key}\\:", null);

  @include breakpoint($breakpoint-key) {
    .Switcher.-#{$breakpoint-prefix}#{$Switcher-row-name} > * {
      flex-direction: row;
    }

    .Switcher.-#{$breakpoint-prefix}#{$Switcher-row-name} > * > * {
      flex-shrink: 1;
    }
  }
}
```

```plain text
<div class="Switcher -md:row">
  <div>
    <p>foo</p>
    <p>bar</p>
    <p>baz</p>
  </div>
</div>

```

ビューポートの幅によってレイアウトプリミティブのパターン自体を切り替えたい場面もある。狭い幅ではカードをReel（横スクロール）で並べ、広い幅ではGridで並べるというような。個別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)にすれば共通の[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)で実現できなくもないが、ここは汎用性のためブレイクポイントごとに別々の[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)を使う。[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)で出し分けてもいいが、両方のパターンを含んだ静的テンプレートを記述した上で、メディアクエリごとに`display: none`を制御するユーティリティクラスを付与する方が簡単になる：

`_utilities.scss`:

```plain text
// display property

/**
 * Usage:
 *
 * <div class="hidden md:block">hello</div>
 *
 * Display variant:
 *
 * <div class="{display}"></div>
 * <div class="{breakpoint}:{display}"></div>
 */

$-displayers: (
  block: block,
  inline: inline,
  hidden: none,
  inlineBlock: inline-block,
);

@each $breakpoint-key, $breakpoint in $mq-breakpoints {
  $uses-media-query: $breakpoint != 0;
  $breakpoint-prefix: if($uses-media-query, "#{$breakpoint-key}\\:", null);

  @include breakpoint($breakpoint-key) {
    @each $name, $displayer in $-displayers {
      .#{$breakpoint-prefix}#{$name} {
        display: $displayer !important;
      }
    }
  }
}
```

```plain text
<div class="md:hidden">
  <div class="CardReel">
    <div class="Card">...</div>
    <div class="Card">...</div>
    <div class="Card">...</div>
  </div>
</div>

<div class="hidden md:block">
  <div class="Grid -sm:col-2 -lg:col-3 -s3">
    <div>
      <div>
        <div class="Card">...</div>
      </div>
      <div>
        <div class="Card">...</div>
      </div>
      <div>
        <div class="Card">...</div>
      </div>
    </div>
  </div>
</div>

```

この場合カードの内容をテンプレートの2箇所に記述しなければならないが、テンプレートエンジンを使っていれば問題にならないだろう。

ちなみにReelはカスタムプロパティの表現を代替するのが難しく、また利用頻度も少ないため個別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)にすることが多い。

## そのほかの[IE](http://d.hatena.ne.jp/keyword/IE)への対処

Gridについては`display: grid`による実装ではグリッドアイテムの折り返しを[IE](http://d.hatena.ne.jp/keyword/IE)で実現できないので、フレックスボックスを用いた独自の実装にしている：

```plain text
.Grid > * {
  display: flex;
  flex-wrap: wrap;
}

.Grid > * > * {
  width: 100%;
}

/**
 * Columuns variant:
 *
 * <div class="Grid -col-{columns}"></div>
 * <div class="Grid -{breakpoint}:col-{columns}"></div>
 */

$Grid-columns-list: (2, 3, 4);

@each $breakpoint-key, $breakpoint in $mq-breakpoints {
  $uses-media-query: $breakpoint != 0;
  $breakpoint-prefix: if($uses-media-query, "#{$breakpoint-key}\\:", null);

  @include breakpoint($breakpoint-key) {
    @each $columns in $Grid-columns-list {
      $name: col-#{$columns};

      .Grid.-#{$breakpoint-prefix}#{$name} > * > * {
        width: percentage(1 / $columns);
      }
    }
  }
}

/**
 * Spacing variant:
 *
 * <div class="Grid -s{spacing}"></div>
 * <div class="Grid -{breakpoint}:s{spacing}"></div>
 */

@each $breakpoint-key, $breakpoint in $mq-breakpoints {
  $uses-media-query: $breakpoint != 0;
  $breakpoint-prefix: if($uses-media-query, "#{$breakpoint-key}\\:", null);

  @include breakpoint($breakpoint-key) {
    @each $spacing-key, $spacing in $spacings {
      $name: s#{$spacing-key};

      .Grid.-#{$breakpoint-prefix}#{$name} > * {
        margin: ($spacing / 2 * -1);
      }

      .Grid.-#{$breakpoint-prefix}#{$name} > * > * {
        padding: ($spacing / 2);
      }
    }
  }
}
```

また[IE](http://d.hatena.ne.jp/keyword/IE)には[`flex-direction: column`](https://github.com/philipwalton/flexbugs#flexbug-5)[を利用するとそのフレックスアイテムや子孫の固有のアスペクト比（intrinsic aspect ratios）が維持されないバグ](https://github.com/philipwalton/flexbugs#flexbug-5)がある。StackとSwitcherでは`flex-direction: column`を利用しているので、フレックスアイテムに対して`flex-shrink: 0`を明示的に指定することでバグを回避している：

`_Stack.scss`:

```plain text
.Stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.Stack > * {
  flex-shrink: 0;
}
```

`_Switcher.scss`:

```plain text
.Switcher > * {
  display: flex;
  flex-direction: column;
}

.Switcher > * > * {
  flex-shrink: 0;
  width: 100%;
}
```

しかしそれでも予期しないバグはまれに発生するため、そういったときには別[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を作るなどしてバグを回避するなにかしらの対応をしている。

## 外部からのスタイル宣言の上書き

実装の汎用化を図ろうといろいろ工夫しても例外的な対応が必要になってしまうのは珍しくない。もっともレイアウトプリミティブによる汎用化は全体の個別性の程度を軽減させるためのメソッドであって、これだけですべてを完全に表現し切るのが目的ではない。Every Layoutはレイアウトプリミティブを[プログラミング言語におけるプリミティブなデータ型に例えている](https://every-layout.dev/rudiments/composition/#layout-primitives)。標準的なレイアウトの型を活用することで、すべてのレイアウトは実現できないにしても、無駄なルーティンワークはかなり削減できるだろうという話だ。

モディファイアによってバリエーションを表現するこのアプローチの難点は利用するあらゆる値を中央集権的に管理しなければならない点だ。末端のページでのちょっとしたアドリブのためにコアに手を入れなければならないというような。余白のバリエーションなら比較的規則化しやすいが、[Sidebar](http://d.hatena.ne.jp/keyword/Sidebar)の幅やSwitchのアイテムの比率などどうしても必要なときになってみるまでわからないものもある。こうした場合には汎用的な解決を考えるのは諦めて、レイアウトプリミティブをラップする個別の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)などを作って上書きするようにする：

```plain text
<div class="MyComponent">
  <div class="Switch">
    <div>
      <div>default</div>
      <div class="MyComponent__featuredItem">featured</div>
      <div>default</div>
    </div>
  </div>
</div>

```

```plain text
<div class="MyComponent">
  <div class="Stack">
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>

    <div class="MyComponent__specialItem">
      <div class="Card">...</div>
    </div>

    <p>Lorem ipsum dolor sit amet.</p>
  </div>
</div>

```

こうすればエッジケースへの対応の影響を局所的にできる。

またレイアウトプリミティブとそれ以外の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の境界を明確にするためにレイヤリングを行うこともできる。既存の[CSS](http://d.hatena.ne.jp/keyword/CSS)[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)でいうと[ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)のObjectsとComponentsのモデルが適しているように思える。ObjectsはOOCSSと同様の装飾がなく汎用的なパターンだ。装飾はComponentsのレイヤーで施され、また汎用性のないスタイルもここに属する。レイアウトプリミティブのみがあらかじめObjectsとして位置していて、プロジェクトの開始後に追加された実装は基本的にはComponentsとして扱うのが良いだろう。

```plain text
// Center, Cluster, Grid, Stack, Switcher...
@import "objects/*";

// ArticleBody, Card, CardReel, MyComponent...
@import "components/*";
```

ITCSSの目的はスタイル記述順の制御であり、同じ詳細度の宣言はより後のレイヤーによって上書きされる仕組み。もっともレイアウトプリミティブでは全称[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)を多用するので、詳細度が高まっていてあまりうまくは機能させられないが……。はっきり区別させる意味では役に立つ。

## 各レイアウトプリミティブの[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)の例示

よくある「目に見える」[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)カタログと違って、レイアウトプリミティブの[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)は最初は少し想像しづらい。その汎用性ゆえに抽象的で、具体例が欲しくなる。その解決のためにパターンごとの[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)を掲載したスタイルガイドを作成した。

![[20200517215124.jpg]]

[_shifted/1-objects.pug at master · yuheiy/_shifted](https://github.com/yuheiy/_shifted/blob/master/boilerplate-static/app/views/style-guide/1-objects.pug)

利用方法はこれらの例から学習できるだろう。

## プロジェクトのセットアップ

これまで紹介してきたレイアウトプリミティブの実装はひとつの[リポジトリ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA)に集約させていて、それらがあらかじめ用意された状態で新しいプロジェクトをはじめられるようにしてある。基本的なパターンを繰り返し実装し直す手間を省いて、個別の問題により集中できるようにする狙いがある。

[_shifted/boilerplate-static/app/assets/objects at master · yuheiy/_shifted](https://github.com/yuheiy/_shifted/tree/bdcc3da8676f1107b1d9b22f6663f8575d4528f8/boilerplate-static/src/assets/objects)

カスタムプロパティを用いずに汎用化するのが困難なパターンや、利用頻度が少ないパターンは含んでいない。

ちなみに[CSS](http://d.hatena.ne.jp/keyword/CSS)以外の開発環境構築についても汎用化できないか長らく考えていて、これについてもまたいつか書きたい。

## 宣伝

この記事では自分なりのEvery Layoutの応用について書いたが、その根底には原著が伝えるもとの意図がなければ成立しない。しかしながらEvery Layoutは英語であり有料コンテンツであるためになかなか紹介しづらく、また読んでもらうハードルも高く、非常にやりきれない思いになっていた。

そうしたところで偶然、編集者の岡本さんにお声がけいただき、Every Layoutを日本語訳して出版する事の運びとなった。友人の横内さんとも一緒に。

> \#dist30 でこのLTをされた @_yuheiy さんと @8845musign さんの共同監訳で、LTで取り上げられているEvery Layout @layoutplusplus の電子書籍を日本語版を刊行（紙＋電子）することになりました。凡百のHTML+CSS本と違う中級者向けのCSS本を目指します。お楽しみに :-)https://t.co/Szi3lm1fOC
> [2020年2月21日](https://twitter.com/orange_juno/status/1230676123802988545?ref_src=twsrc%5Etfw)

原著の内容をなんとかうまく伝えられるよう精一杯やりますので、みなさん何卒よろしくお願いします。

[CSS](http://d.hatena.ne.jp/keyword/CSS)は普通、[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)の記述から始まる。目の前にあるHTML片に対してどのようなスタイリングを施すかという前に、いかにしてそのHTML片を選択するかという意識が先に来る。あらかじめ完成したHTML文書へ向けてスタイルを適用していくのであればそれでうまくやれるのかもしれない。だが広く行われているウェブデザインの制作では、まずゴールとして定められた描画結果だけがあり、そこから逆算してHTMLと[CSS](http://d.hatena.ne.jp/keyword/CSS)を書き進めていく。つまり個別の結果だけがある状態で実装に取り掛かることになる。実装のために必要な構造化はたいてい後手に回る。

それでも[CSS](http://d.hatena.ne.jp/keyword/CSS)が[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)から始まることは変わらない。実装を進めるためにはまず[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)を書かなければならない。[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)は規則の根幹である。バグを減らし、開発を効率的にするためには、あらゆるスタイリングの意図を[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)に反映させるのが基本だ。しかし最初から正確にその意図を把握できる機会はまれであり、現実には、無理矢理こじつけた妄想のような規則性を実装してしまう場合も少なくない。それが瞬く間にサイト全体に広まって取り返しがつかなくなることも。

これを回避するためには、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)などに**局所的な利用を明示するような名前**を*最初は*つけておくことだ。再利用性を念頭においた[CSS](http://d.hatena.ne.jp/keyword/CSS)設計では一般に、やや曖昧なコンテンツに依存しない[命名](http://d.hatena.ne.jp/keyword/%CC%BF%CC%BE)が奨められるが、最初からそうするのは時期尚早だと経験上感じられる。まずは再利用性を制限するために、その[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が利用される箇所やコンテンツの性質を積極的に反映させる。サイトのホームでニュース記事を表示させているカ[ルーセル](http://d.hatena.ne.jp/keyword/%A5%EB%A1%BC%A5%BB%A5%EB)ならば、「HomeNewsCarousel」のような冗長すぎる名前を選ぶのがむしろ良い。そして同じ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を別のページやコンテンツについても利用するのであれば、それが*はっきりとわかってから*、ふたたびその段階で判明しているコンテキストに応じて[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の名前をつけ直す。たとえばフィーチャーしたい記事をコンテンツ種別ごとの複数のカ[ルーセル](http://d.hatena.ne.jp/keyword/%A5%EB%A1%BC%A5%BB%A5%EB)の繰り返しによってホームに表示するのであれば「HomeFeaturedCarousel」とか、別ページでもニュース記事を表示させるために使うのであれば「NewsCarousel」とか。

このように利用箇所に応じたコンテキストを明示し、変化があれば見直しの上で追従していく作業を、プロジェクトの生存期間中は半永久的に行う。利用するコードの意図がつねに明快になっている意味では健全だが、難点としてはただ、**めんどくさい**。特に開発の初期段階ではところ構わず再利用できた方が手数が少なくて楽な場合もある。しかし時に想定よりもはるかに長い期間メンテナンスされ続ける[CSS](http://d.hatena.ne.jp/keyword/CSS)において、いかにすればこのめんどくささを軽減させて継続的な意図の反映を行なっていけるのか。

## ユーティリティファースト[CSS](http://d.hatena.ne.jp/keyword/CSS)

ユーティリ[ティー](http://d.hatena.ne.jp/keyword/%A5%C6%A5%A3%A1%BC)ファースト（またはAtomic）[CSS](http://d.hatena.ne.jp/keyword/CSS)と呼ばれるアプローチがある。スタイル宣言と対応する細かなクラスが[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)としてあらかじめひと通り用意されており、ユーザーは基本的には新たに[CSS](http://d.hatena.ne.jp/keyword/CSS)を書かずともHTML上でクラスを組み合わせていくだけでスタイリングが行えるというもの。

もっとも人気の実装である[Tailwind CSS](https://tailwindcss.com/)では、たとえばチャットの通知アラートは、ユーザーが新しく[CSS](http://d.hatena.ne.jp/keyword/CSS)を記述しなくても次のHTMLだけで作ることができる。

```plain text
<div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="ml-6 pt-1">
    <h4 class="text-xl text-gray-900 leading-tight">ChitChat</h4>
    <p class="text-base text-gray-600 leading-normal">You have a new message!</p>
  </div>
</div>

```

出典：[Utility-First - Tailwind CSS](https://tailwindcss.com/docs/utility-first/)

これを利用すれば初手にまず名前を考えるという作業はスキップできる。一見スタイルの再利用性の問題がありそうに思えるが、昨今のプロジェクトではなにかしらのテンプレートエンジンを採用するはずなので、テンプレート機能を用いて[マークアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%AF%A5%A2%A5%C3%A5%D7)を[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)的に管理すれば解決できる。要点は後から共[通化](http://d.hatena.ne.jp/keyword/%C4%CC%B2%BD)できることである。

インラインstyle属性との違いとしては、まずインラインstyle属性では利用できないメディアクエリや擬似クラスがユーティリ[ティー](http://d.hatena.ne.jp/keyword/%A5%C6%A5%A3%A1%BC)クラスとして用意されている点。そして次に各スタイル宣言の値が特定のバリエーションによって意図的に制約されるという点。単にインラインstyle属性を使うのでは、宣言の値は場当たり次第でユニークになってしまうことがある。余白やフォントサイズ、テキストの色など、これらの判断が宣言ごとにバラバラになっているとシステムとしての一貫性がなくなってしまう。

Tailwind [CSS](http://d.hatena.ne.jp/keyword/CSS)はあらかじめ決められた値のバリエーションと対応するユーティリティクラスだけを提供している。たとえば色については[デフォルトのカラーパレットが設定されていて](https://tailwindcss.com/docs/customizing-colors/#default-color-palette)、カラーパレットにある値だけが色に関するプロパティと対応するユーティリティクラスになっている。提供されるクラスを使う限りはカラーパレットのルールを外れないというわけだ。

最初からこの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)を利用してページをデザインするなら制約として機能するだろう。しかしそれを意識せずにすでにSketchなどのデザインツールでデザインされたページがあったとすれば、当然[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)の設定値（デザインシステムの文脈ではデザイン[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンと呼ばれる）は意図に沿わない間違った制約になってしまう。ユーザーが任意の値によってデザイン[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを設定できるようになっていたとしても、やはり汎用化の話と同じく、最初から正しいデザイン[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを見つけ出すこと自体が困難だ。仕組み上、ほとんどのユーティリティクラスはデザイン[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンとセットになっていないと存在できないので、ユーティリティファーストのアプローチは結果的に成り立たなくなってしまう。

さらにかなりの数が存在するユーティリティクラスの[命名規則](http://d.hatena.ne.jp/keyword/%CC%BF%CC%BE%B5%AC%C2%A7)を覚える必要もある。長期的に付き合っていくプロジェクトではまだしも、そうでない場合に少し関わる程度のメンバーが毎度これに慣れるというのはそれなりの負担になる。

そしてこれはいわば低レイヤーの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)であり、[CSS](http://d.hatena.ne.jp/keyword/CSS)[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)というよりは[CSS](http://d.hatena.ne.jp/keyword/CSS)を組み立てるための[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)と表現した方が近い。既存の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のようなものは用意されていないので、最初はすべてのものをユーザーが組み上げなければならない。

ユーティリティファースト[CSS](http://d.hatena.ne.jp/keyword/CSS)についてここまでで浮上した問題をまとめると、正しいデザイン[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの発見を前提にしないとアプローチが成り立たないことと、[CSS](http://d.hatena.ne.jp/keyword/CSS)の記述方法を代替する以上のものではないということだ。ではどうすればいいのか？

## レイアウトプリミティブ

[Every Layout](https://every-layout.dev/)が提唱するレイアウトプリミティブは、頻繁に出現するレイアウトの最小要素を、レスポンシブデザインを前提とした[CSS](http://d.hatena.ne.jp/keyword/CSS)においても再利用可能にしたパターンのこと。

たとえば「The Stack」は、縦方向に繰り返す要素間に共通の余白を挿入するためのパターン。

```plain text
<div class="Stack">
  <p>Lorem ipsum dolor sit amet consectetur.</p>
  <p>Lorem ipsum dolor sit amet consectetur.</p>
  <p>Lorem ipsum dolor sit amet consectetur.</p>
</div>

```

```plain text
.Stack > * + * {
  margin-top: 1.5rem;
}

```

「The Center」は、要素の幅を特定のサイズを超えないように制限した上で中央に寄せるパターン。

```plain text
<div class="Center">
  <p>Lorem ipsum dolor sit amet consectetur.</p>
  <p>Lorem ipsum dolor sit amet consectetur.</p>
  <p>Lorem ipsum dolor sit amet consectetur.</p>
</div>

```

```plain text
.Center {
  max-width: 40rem;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}

```

このようなパターンが今のところ合計で12個[紹介されている](https://every-layout.dev/layouts/)。

![[20200506210443.png]]

レイアウトプリミティブの特徴は、パターンの役割がとにかく純粋であること。責務を混合させずに独立させることによって、かなり広範囲の問題に対してパターンが適用できるようになっている。

それぞれのパターンは相互に組み合わせて利用する前提で設計されている。たとえばダイアログは次のような構成で実装できる。

![[20200506211211.png]]

登録フォームならこんな感じに。

![[20200506211250.png]]

あるいは講演でのスライド。

![[20200506211304.png]]

いずれも出典は「[Composition: Every Layout](https://absolutely.every-layout.dev/rudiments/composition/)」より。

個人的な経験則として、レイアウトプリミティブのパターンは実際にかなり多くのレイアウトの実装に適用できる。それぞれのパターンをクラスとして再利用できるようにしておくと、結果的に[CSS](http://d.hatena.ne.jp/keyword/CSS)の総量をかなり削減できる。つまりは[CSS](http://d.hatena.ne.jp/keyword/CSS)を書く場面が減り、新しく作らなければならない[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)や要素の数が減り、[**命名**](http://d.hatena.ne.jp/keyword/%CC%BF%CC%BE)**の機会が減る**。もちろん共[通化](http://d.hatena.ne.jp/keyword/%C4%CC%B2%BD)はテンプレートエンジンで行える。

パターンの収集という意味でレイアウトプリミティブは絶妙である。ウェブデザインの中で無意識的に繰り返されていたようなレイアウトの手法を拾い上げ、極めて汎用的な[形式知](http://d.hatena.ne.jp/keyword/%B7%C1%BC%B0%C3%CE)に変換することによって、思いもしない抽象化の可能性が提示されたように感じた。OOCSSの原則であった「[構造とスキンの分離](https://github.com/stubbornella/oocss/wiki#separate-structure-and-skin)」は、ページからそのパターンを発見する困難さゆえに機能しなかった。大袈裟かもしれないが、レイアウトプリミティブはウェブデザインの普遍的なパターンに思える。設計を進めていく最中でパターンを発見していくのには無理があり、あらかじめわかっているパターンを拠り所にできる方が間違いがないだろう。（レスポンシブデザインという制約が昨今のレイアウト規則を画一化した結果とも言えるかもしれない。）

しかし残念ながらEvery Layoutで紹介されている実装はそのままでは現実のプロジェクトには適用しづらい。特定の画面幅への最適化を避けて意図的にメディアクエリによるブレイクポイントに依存しない仕組みになっていたり、IE11で利用できない機能にしっかり依存していたり……。これらにはある程度納得できる理屈がありつつも、業務においても「そういうことで」とするにはかなり無理がある。ただそれでもこのア[イデア](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C7%A5%A2)はなんとか活用してみたかったので、1年近く苦心して、ある程度安定したプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスを見つけ出すことができた。それについては次の記事「[実践的レイアウトプリミティブ](https://yuheiy.hatenablog.com/entry/2020/05/18/094715)」で紹介する。

## 参考文献