---
URL: https://anond.hatelabo.jp/20160521190026
Updated: 2021-01-03T01:23:00
Created: 2021-01-03T01:18:00
Tags: [topic/技術/React]
---
## [2016-05-21](https://anond.hatelabo.jp/20160521)

### [■](https://anond.hatelabo.jp/20160521190026)[http://anond.hatelabo.jp/20160521163144](http://anond.hatelabo.jp/20160521163144)

まずReactの特徴は、「[状態](https://anond.hatelabo.jp/keyword/%E7%8A%B6%E6%85%8B)[データ](https://anond.hatelabo.jp/keyword/%E3%83%87%E3%83%BC%E3%82%BF)[から](https://anond.hatelabo.jp/keyword/%E3%81%8B%E3%82%89)変換してビューを生成する」[スタイル](https://anond.hatelabo.jp/keyword/%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB)に[統一](https://anond.hatelabo.jp/keyword/%E7%B5%B1%E4%B8%80)されることにある。

これは[jQuery](https://anond.hatelabo.jp/keyword/jQuery)をはじめとする[DOM](https://anond.hatelabo.jp/keyword/DOM)[操作](https://anond.hatelabo.jp/keyword/%E6%93%8D%E4%BD%9C)[モデル](https://anond.hatelabo.jp/keyword/%E3%83%A2%E3%83%87%E3%83%AB)での、「初期[状態](https://anond.hatelabo.jp/keyword/%E7%8A%B6%E6%85%8B)ビューの[作成](https://anond.hatelabo.jp/keyword/%E4%BD%9C%E6%88%90)」と「([イベント](https://anond.hatelabo.jp/keyword/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88)に伴う)[状態](https://anond.hatelabo.jp/keyword/%E7%8A%B6%E6%85%8B)変化[から](https://anond.hatelabo.jp/keyword/%E3%81%8B%E3%82%89)の部分ビュー変更」で[構成](https://anond.hatelabo.jp/keyword/%E6%A7%8B%E6%88%90)する[スタイル](https://anond.hatelabo.jp/keyword/%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB)[から](https://anond.hatelabo.jp/keyword/%E3%81%8B%E3%82%89)脱却され、たとえば部分処理の積み重ね[から](https://anond.hatelabo.jp/keyword/%E3%81%8B%E3%82%89)[想定外](https://anond.hatelabo.jp/keyword/%E6%83%B3%E5%AE%9A%E5%A4%96)の[状態](https://anond.hatelabo.jp/keyword/%E7%8A%B6%E6%85%8B)が生[まれ](https://anond.hatelabo.jp/keyword/%E3%81%BE%E3%82%8C)ることを防ぐ。

[SPA](https://anond.hatelabo.jp/keyword/SPA)は、[クライアント](https://anond.hatelabo.jp/keyword/%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88)が自立した1[プログラム](https://anond.hatelabo.jp/keyword/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0)として[状態](https://anond.hatelabo.jp/keyword/%E7%8A%B6%E6%85%8B)を[管理](https://anond.hatelabo.jp/keyword/%E7%AE%A1%E7%90%86)する。[サーバ](https://anond.hatelabo.jp/keyword/%E3%82%B5%E3%83%BC%E3%83%90)は[UI](https://anond.hatelabo.jp/keyword/UI)と同様の非同期な[イベント](https://anond.hatelabo.jp/keyword/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88)発生源/[イベント](https://anond.hatelabo.jp/keyword/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88)発行先の一つとして扱う。またReactとReduxの組は、[データベース](https://anond.hatelabo.jp/keyword/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9)[サーバ](https://anond.hatelabo.jp/keyword/%E3%82%B5%E3%83%BC%E3%83%90)と[サーバ](https://anond.hatelabo.jp/keyword/%E3%82%B5%E3%83%BC%E3%83%90)サイドページ生成の[スタイル](https://anond.hatelabo.jp/keyword/%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB)を、[サーバ](https://anond.hatelabo.jp/keyword/%E3%82%B5%E3%83%BC%E3%83%90)と[ブラウザ](https://anond.hatelabo.jp/keyword/%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6)でやるように[シフト](https://anond.hatelabo.jp/keyword/%E3%82%B7%E3%83%95%E3%83%88)させた[もの](https://anond.hatelabo.jp/keyword/%E3%82%82%E3%81%AE)ともみなせるだろう。

そしてReact[自体](https://anond.hatelabo.jp/keyword/%E8%87%AA%E4%BD%93)には、[JSX](https://anond.hatelabo.jp/keyword/JSX)構文もbabelもいらない。[JSX](https://anond.hatelabo.jp/keyword/JSX)[タグ](https://anond.hatelabo.jp/keyword/%E3%82%BF%E3%82%B0)を書くよりむ[しろ](https://anond.hatelabo.jp/keyword/%E3%81%97%E3%82%8D)React.[DOM](https://anond.hatelabo.jp/keyword/DOM).div({...},...)等で書いたほうが[プログラミング](https://anond.hatelabo.jp/keyword/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)では扱い[やす](https://anond.hatelabo.jp/keyword/%E3%82%84%E3%81%99)い。[JSX](https://anond.hatelabo.jp/keyword/JSX)は[サーバ](https://anond.hatelabo.jp/keyword/%E3%82%B5%E3%83%BC%E3%83%90)サイドページ生成の[テンプレート](https://anond.hatelabo.jp/keyword/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)[言語](https://anond.hatelabo.jp/keyword/%E8%A8%80%E8%AA%9E)利用[文化](https://anond.hatelabo.jp/keyword/%E6%96%87%E5%8C%96)に寄せた[表現](https://anond.hatelabo.jp/keyword/%E8%A1%A8%E7%8F%BE)に過ぎないといえる。そして今ではbabelで変換する[対象](https://anond.hatelabo.jp/keyword/%E5%AF%BE%E8%B1%A1)もES6 modulesのexport/importだけだ。これも分割[ファイル](https://anond.hatelabo.jp/keyword/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB)[対応](https://anond.hatelabo.jp/keyword/%E5%AF%BE%E5%BF%9C)のためにwebpackあたりを使うなら、ついでにbabelでES6 modulesも、といった程度のこと。

すでに[一般](https://anond.hatelabo.jp/keyword/%E4%B8%80%E8%88%AC)に忘れられつつある[prototype](https://anond.hatelabo.jp/keyword/prototype), [Dojo](https://anond.hatelabo.jp/keyword/Dojo), Mooと同格[である](https://anond.hatelabo.jp/keyword/%E3%81%A7%E3%81%82%E3%82%8B)[jQuery](https://anond.hatelabo.jp/keyword/jQuery)のほうが五年後も活発に[メンテ](https://anond.hatelabo.jp/keyword/%E3%83%A1%E3%83%B3%E3%83%86)されるのかどうか怪しいだろう。もちろん、[レガシー](https://anond.hatelabo.jp/keyword/%E3%83%AC%E3%82%AC%E3%82%B7%E3%83%BC)な[もの](https://anond.hatelabo.jp/keyword/%E3%82%82%E3%81%AE)としては残り続けるだろうが。

Reactの[モデル](https://anond.hatelabo.jp/keyword/%E3%83%A2%E3%83%87%E3%83%AB)は[関数型プログラミング](https://anond.hatelabo.jp/keyword/%E9%96%A2%E6%95%B0%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)の[モデル](https://anond.hatelabo.jp/keyword/%E3%83%A2%E3%83%87%E3%83%AB)そ[のもの](https://anond.hatelabo.jp/keyword/%E3%81%AE%E3%82%82%E3%81%AE)であって、そういう[観点](https://anond.hatelabo.jp/keyword/%E8%A6%B3%E7%82%B9)ではすでに何年も続いた[もの](https://anond.hatelabo.jp/keyword/%E3%82%82%E3%81%AE)であり、React[自体](https://anond.hatelabo.jp/keyword/%E8%87%AA%E4%BD%93)は消えたとしてもその[手法](https://anond.hatelabo.jp/keyword/%E6%89%8B%E6%B3%95)は長く続くことになる。

[Permalink](https://anond.hatelabo.jp/20160521190026) | [記事への反応(1)](https://anond.hatelabo.jp/20160521190026#tb) | 19:00

[シェア](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fanond.hatelabo.jp%2F20160521190026)

![](https://b.st-hatena.com/images/entry-button/button-only@2x.png)

記事への反応 -

- [React.js界隈の人に聞きたい](https://anond.hatelabo.jp/20160521163144)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160521163144)
**誰かみんなの主張のまとめを作ってくれないですか？** (まあそれこそお前がやれよって話かもしれないので、誰もやってくれなかったら私がしますが。。) 最近、JQueryはもはや不要でR...
- [http://anond.hatelabo.jp/20160521163144](https://anond.hatelabo.jp/20160521190026)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160521190026)
まずReactの特徴は、「状態データから変換してビューを生成する」スタイルに統一されることにある。 これはjQueryをはじめとするDOM操作モデルでの、「初期状態ビューの作成」と「(イベ...
- [http://anond.hatelabo.jp/20160521190026](https://anond.hatelabo.jp/20160521234423)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160521234423)
元増田です。 SPAは、クライアントが自立した1プログラムとして状態を管理する。サーバはUIと同様の非同期なイベント発生源/イベント発行先の一つとして扱う。またReactとReduxの組は...
- [http://anond.hatelabo.jp/20160521234423](https://anond.hatelabo.jp/20160522005239)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160522005239)
いうかですね、そもそもVをロジックの中にベタ書きしちゃうの嫌なんですよね。 わざわざ一緒くたにベタ書きする設計が悪いだけの話でしょう。それともJSで書くものはすべてロジ...
- [http://anond.hatelabo.jp/20160521234423](https://anond.hatelabo.jp/20160525212630)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160525212630)
というかですね、そもそもVをロジックの中にベタ書きしちゃうの嫌なんですよね。 MVCモデルというのは、オブジェクト指向の発想。 DOMというのは、そもそもDocumentObjectModelでオブジェ...
- [ｊQueryからReactに移ろうとしてる自分の個人的な理由](https://anond.hatelabo.jp/20160521214833)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160521214833)
http://anond.hatelabo.jp/20160521163144 内容から誰が書いてるかわかるかもしれんけど、まぁスルーよろしく。 jQueryもそんなにガッツリ使ってるわけでもないし、Reactはまだリリース前の調査兼...
- [http://anond.hatelabo.jp/20160521163144](https://anond.hatelabo.jp/20160521235357)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160521235357)
React.js界隈の人に聞きたい http://anond.hatelabo.jp/20160521163144 最近某所で、React使うとjQueryは不要だ的なタイトルの記事を書いちゃた気がするので一応反応しときます。長文ごめんね。 えー...
- [http://anond.hatelabo.jp/20160521235357](https://anond.hatelabo.jp/20160522003506)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160522003506)
元増田です。トラバありがとう。 世の中の絶対数は知りませんが、自分の脳内ではもう「ページ遷移しない方がずっと楽に開発できてユーザ体験も向上するのに、敢えてそうしない理...
- [http://anond.hatelabo.jp/20160522003506](https://anond.hatelabo.jp/20160522120724)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160522120724)
http://anond.hatelabo.jp/20160522003506 ども。 ウェブ側のフレームワークでちゃんとしたものを使っていれば別になんでもないこと 「ES6で書く以上はES6を使えばいいじゃん」「変な独自拡...
- [http://anond.hatelabo.jp/20160521163144](https://anond.hatelabo.jp/20160522004347)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160522004347)
coffeescriptは廃れたから使われなくなったんじゃなくて、言語仕様に吸収されて役目を終えたんじゃないの？ 欲しい機能を先行実装して、それが仕様に吸収されて基本仕様で需要が満たさ...
- [http://anond.hatelabo.jp/20160521163144](https://anond.hatelabo.jp/20160522094522)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160522094522)
SPAにしたことで画面表示のコードは全部クライアント側に持って来れるようになったからサーバ担当の俺は楽になったｗ
- [http://anond.hatelabo.jp/20160524082129](https://anond.hatelabo.jp/20160524082129)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160524082129)
■React.js界隈の人に聞きたい http://anond.hatelabo.jp/20160521163144 こういうの見ると gitも無いような化石みたいなweb制作会社で働いてるんだが React.jsとか使うような案件ってどんな感じでくる...
- [http://anond.hatelabo.jp/20160521163144](https://anond.hatelabo.jp/20160525211155)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160525211155)
ReactはJavaScript界隈の関数型プログラミング化の潮流で登場。 最近、炎上している別の方面で、特にFRPと組み合わせると圧倒的なパワーを発揮すると一部では実例とともに指摘されている...
- [[ポエム]http://anond.hatelabo.jp/20160521163144](https://anond.hatelabo.jp/20160526022943)
![](https://b.hatena.ne.jp/entry/image/https://anond.hatelabo.jp/20160526022943)
React.js界隈がなぜこじれたのか。 # インターネットに夢があった日 かつてのインターネットは未来だった。 ハイパーテキストは時代遅れな紙の本を超える、人類の叡智が終結したライ...