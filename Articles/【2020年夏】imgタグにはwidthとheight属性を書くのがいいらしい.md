---
Created: 2021-01-15T18:11:00
Tags: [topic/技術/パフォーマンス]
---
![](https://parashuto.com/rriver/wp/wp-content/uploads/2020/07/img-size-attributes-are-back.svg)

そうなんです。

2020年夏、ページの読み込み中にレイアウトがシフトしないように、`img`要素には`width`と`height`属性を記述するのがいいらしいんです。

```plain text
<img src="link/to/image.jpg" width="300" height="400" alt="画像の説明">
```

その昔、これが普通の時代もあったんですけどね。レスポンシブな時代には`width`と`height`属性を書かないのが一般的（？）になっていました。また、`width`と`height`属性が記述してあってもCSSで`width: 100%; height: auto;`が指定されているとレイアウトシフトが発生してしまっていました。

**参考：** `img`要素のサイズ属性の記述の有無についての[Twitterのアンケート](https://twitter.com/clockmaker/status/1278556129480470528)

## なんでいまさら？

なぜなら、2019年の後半にブラウザにレイアウトシフトを回避するための新たな機能が実装されたからです。これにより、ブラウザは`img`要素に指定された`width`と`height`属性の値をもとにアスペクト比を計算して、ページ読み込み中に画像のスペースをより正確に保持できるようになりました。

### サイズ属性を記述しない場合のページレンダリング

`img`要素に`width`と`height`属性を記述しない場合、下のGIF動画のように画像が読み込まれた後に、下にあるテキストが大幅に移動します。

![](https://parashuto.com/rriver/wp/wp-content/uploads/2020/07/img-without-size-attributes.gif)

### サイズ属性を記述した場合のページレンダリング

`img`要素に`width`と`height`属性を記述した場合、下のGIF動画のようにはじめから画像のスペースが保持されていて、画像の読み込み後にも下にあるテキストの位置は変わりません。

![](https://parashuto.com/rriver/wp/wp-content/uploads/2020/07/img-with-size-attributes.gif)

ちなみに、GIF動画で表示されている画像にはCSSで`width: 100%; height: auto;`が指定されているので、レスポンシブに対応した画像の表示になっています。

### レスポンシブの場合どのサイズを記述すれば良いのか

レスポンシブなサイトの場合どのサイズを記述するか迷うかもしれませんが、ここで重要なのは画像のアスペクト比（縦横比）です。なので、元画像のサイズをそのまま記述しても良いですし、デスクトップでの表示をベースにサイズ属性を書いてもOKです。

### Lazy-loadingにも有効

画像の読み込みを遅延させる`lazy-loading`を使用する際も、画像のサイズ属性の記述がないとレイアウトシフトが発生します。それを避けるためにもサイズ属性の記述は重要です。でなければLazy-loadingのメリットがレイアウトシフトによって帳消しになってしまうことも考えられます。

```plain text
<img src="link/to/image.jpg" width="300" height="400" loading="lazy" alt="画像の説明">
```

ページ内リンクでページ下部に飛べる場合や、高速スクロールができるホイール付きのマウスとかだと、画像が読みこまれる前にページ下部に移動できてしまうので、レイアウトシフトが顕著に邪魔になる場合があるんですよね。あれもユーザ体験をかなり損なうので注意したいですね

## モダンなブラウザに実装済み

この機能は[Firefox 71 ](https://developer.mozilla.org/ja/docs/Mozilla/Firefox/Releases/71)、[Chrome 79 ](https://chromestatus.com/feature/5695266130755584)、Safariの[Technology Preview Release 99 ](https://developer.apple.com/safari/technology-preview/release-notes/#r99) から実装されていて、2020年7月現在、Chromiumベースの最新のEdgeを含むメジャーなブラウザでサポートされています。

このレイアウトシフトのことを英語では「Jank」って呼ぶんですけど、Jankによってページが読みにくくなったり、ブラウザの描画のパフォーマンスにも影響が出ます。`img`要素に`width`と`height`属性を記述するだけで、それが回避できるんだから書かない理由はないですよね。

画像が読み込まれたタイミングでレイアウトがシフトして、読んでた文章を見失ってしまった、なんてことありませんか？あれが起こると頭が混乱するし、同じところを読み返す必要があって無駄に時間を取られたりするんですよね。

## むかーし、昔…

その昔、`img`タグには`width`と`height`属性を書くのがあたりまえの時代がありました。僕がウェブ制作を始めたのは1990年台の後半ですが、そのころは`img`要素に`width`と`height`が記述されているか必ずチェックしていた気がします。

でも、レスポンシブWebデザインによって画像を可変で表示すようになって、`img`要素に`width`と`height`属性は記述せずに、CSSで幅を100%に指定する以下のような書き方が広まりました。

```plain text
img {
  width: 100%;
  height: auto;
}
```

`width`と`height`属性が記述してあってもCSSで`width: 100%; height: auto;`が指定されていると、画像がダウンロードされるまでブラウザが高さを判別できなくてレイアウトシフトが発生してしまっていました。

そして2020年、この記述方法によって多くなったJankの問題が解決されたわけです。

これを提案してくれたウェブコミュニティの方々（たぶん[MozillaのJenさん ](https://www.youtube.com/watch?v=4-d_SoCHeWE)）もすごいし、それをスピーディに実装した各ブラウザの開発者の方々もすごいなぁと思います。Chrome、Safari、Firefoxのすべてにこんなにスピーディに実装されるのって珍しい気がします（そんなことない？）

問題があったら、みんなで議論して、解決策を見出して、実装していく。ウェブのこういうところが本当に大好きです（ここで告白w）。だからやめられない。

## 注意点もいくつか

このすばらしいブラウザ機能ですが、いくつか注意点もあります。

- CSSで`width: 100%; height: auto;`か`width: auto; height: 100%;`を指定しないと縦横比が狂ってしまう
- `img`要素しかサポートされてない（`video`や`iframe`などでは、まだサポートされていない）
- `srcset`で複数の画像を指定する場合、すべての画像の縦横比が同じなら問題ないが違う場合は要注意
- `picture`要素で違う縦横比の画像を使う場合は（まだ）使えない（2019年10月時点で仕様をまとめている状態）

注）たとえば、WebPを使うために`picture`要素を使って同じ縦横比の画像を表示したい場合は有効のようです。FirefoxとChromeでどのような挙動になるのか確認してしておきました。

詳しい仕組みを知りたい方は、英語ですが以下のページやビデオを参考にしてみてください。日本語字幕がないですが、Jenさんのビデオが一番わかりやすいかな。Smashing Magazineの記事にはかなりの詳細が書かれています。

- [Do This to Improve Image Loading on Your Website (YouTube)](https://www.youtube.com/watch?v=4-d_SoCHeWE)
- [Setting Height And Width On Images Is Important Again — Smashing Magazine](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/)
- [Mapping the width and height attributes of media container elements to their aspect-ratio – Web media technologies | MDN](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping)

## picture要素でWebPを使うような場合

たとえば、WebPを使うために`picture`要素を使って以下のような記述をした場合、`img`要素の`width`と`height`属性の記述がしっかり反映された挙動になっていました。同じ縦横比の画像を使うのであれば問題ないようです。

```plain text
<picture>
  <source srcset="img/muffins-and-coffee.webp" type="image/webp">
  <img src="img/muffins-and-coffee.jpg" width="800" height="480" alt="画像の説明">
</picture>
```

こちら、取り急ぎFirefox 78とChrome 83で確認しました。

### 検証用のデモページ

以下に検証用のデモページへのリンクをはっておきます。

- [picture要素でwidth/height属性なし](http://parashuto.com/playground/img-size-attributes/picture-element-without-size-attributes.html)
- [picture要素でwidth/height属性あり](http://parashuto.com/playground/img-size-attributes/picture-element.html)

## 以下のブラウザで確認済み

いまのところ、開発ツールにスロットリング機能がついている以下のブラウザで確認しました。

- Firefox 78.0.1（Mac/Win）
- Chrome 83.0.4103.116（Mac/Win）
- Chromium版Edge 83.0.478.56

まだSafariでは確認できてないです。

## さいごに

ということで、画像のサイズ属性は記述していきましょう！

（このブログで使ってる画像はサイズ属性いれてないんだよな。WordPressをアップデートして自動で記述されるようになおさなきゃ…）

**更新情報**について追記しました（2020/07/16）について追記しました（2020/07/16）

2020年7月2日に公開され、2020年7月16日に更新された記事です。

## About the author

![](https://parashuto.com/rriver/wp/wp-content/themes/rriver2/img/ryo-watanabe.png)

「明日のウェブ制作に役立つアイディア」をテーマにこのブログを書いています。アメリカの大学を卒業後、ボストン近郊のウェブ制作会社に勤務。帰国後、東京のウェブ制作会社に勤務した後、ウェブ担当者として日英バイリンガルのサイト運営に携わる。詳しくは[こちら](https://parashuto.com/rriver/about/)。

ウェブ制作・ディレクション、ビデオを含むコンテンツ制作のお手伝い、執筆・翻訳のご依頼など、お気軽にご相談ください。いずれも日本語と英語で対応可能です。まずは、[Twitter @rriver ](https://twitter.com/rriver) または[Facebook ](https://www.facebook.com/ryo.watanabe) まで。

**この記事をシェアする**