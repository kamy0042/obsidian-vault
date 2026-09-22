---
Created: 2021-01-15T20:37:00
URL: http://at-grandpa.hatenablog.jp/entry/2013/11/01/072636
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
お久しぶりです。[@at_grandpa](https://twitter.com/at_grandpa) です。

今回、[Model View Controller](http://ja.wikipedia.org/wiki/Model_View_Controller) について再考する機会があったので、自分なりに整理してみました。

### 勘違い

[MVC](http://d.hatena.ne.jp/keyword/MVC)の勘違いに関しては、以下の[SlideShare](http://d.hatena.ne.jp/keyword/SlideShare)が有名かと思います。

[やはりお前らのMVCは間違っている](http://www.slideshare.net/MugeSo/mvc-14469802) [@mugeso](https://twitter.com/mugeso)

これにはドキッとしたことを覚えています。
このスライドで「間違っている！」と指摘されている形式を、そういうものだと理解していたからです。

上記で指摘されている**勘違い形式**を、自分なりにわかりやすく噛み砕き、図にしてみました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/at_grandpa/20131101/20131101063913.png)

> Userからの入力をControllerが受け取るControllerはデータ置き場であるModelからデータを取得する取得したデータをControllerが加工する加工したデータをViewに転送するViewは、受け取ったデータを視覚表現しディスプレイに表示する

自分の中ではこういう理解でした。それぞれの役割は以下です。

**Model：データ置き場****Controller：何かを操作する人** 　あながち間違っていない表現だから困る**View：データを表示する** 　あながち間違っｔ（ｒｙ

このような解釈だと「**Controllerが肥大化する**」と、スライドでも指摘がありました。

その理由としては、**Controllerがデータを加工する**からなんですね。

じゃーどうするんだということですが、いろいろ調べて整理した結果、以下のような形で落ち着きました。

### [MVC](http://d.hatena.ne.jp/keyword/MVC)の本当の姿？

いきなり図で表してしまいます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/at_grandpa/20131101/20131101070231.png)

> Userからの入力をControllerが受け取るControllerはModelの持っている加工メソッドを操作する加工メソッドによってModelの持つ "状態" が変わるControllerがViewに命令を送るViewはModelの "状態" を見て、その内容をディスプレイに表示する

各役割は以下のとおりです。

**Model：アプリケーションの状態を表すもの＆状態の加工メソッド、この二つをまとめたもの****Controller：Modelの加工メソッドの操作＆Viewの操作をする人****View：Modelの状態を参照し視覚表現するもの**

この形だと、Controllerは加工処理を持たないので肥大化しません。ModelとViewの操作だけを記述すれば良いのです。

そして、よく聞く「[**ビジネスロジック**](http://d.hatena.ne.jp/keyword/%A5%D3%A5%B8%A5%CD%A5%B9%A5%ED%A5%B8%A5%C3%A5%AF)」というものは、Modelの持つ加工メソッドのことだったんですね。やっと理解できました...

Viewは、「もらった値を表示」ではなく、Modelの状態を見るものだったのです。

### 最後に

いかがでしたでしょうか。

[MVC](http://d.hatena.ne.jp/keyword/MVC)はよく誤解されてると言われていますが、自分もそのうちの一人でした。
ですが、今回再考してみてスッキリしました。

いろんな[MVC](http://d.hatena.ne.jp/keyword/MVC)の記事を読んでもいまいちイメージが湧かなかったのですが、改めて整理すると気付く部分も多いですね。

今後、[MVC](http://d.hatena.ne.jp/keyword/MVC)を使う時は、このイメージで実装しようと思います。

### さらに最後に

オレオレ説明だったので間違いも多々あるかもしれません。
何かツッコミがある方はコメントをくださいますと泣いて喜びます。