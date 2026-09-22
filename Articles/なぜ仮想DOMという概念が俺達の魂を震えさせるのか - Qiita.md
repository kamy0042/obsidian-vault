---
URL: https://qiita.com/mizchi/items/4d25bc26def1719d52e6
Updated: 2021-01-15T19:41:00
Created: 2021-01-15T18:11:00
Tags: [topic/技術/React]
---
追記: 情報が色々と古くなったため、2020年に書き直した版へのリンクを張っておきます。

[https://zenn.dev/mizchi/books/0c55c230f5cc754c38b9](https://zenn.dev/mizchi/books/0c55c230f5cc754c38b9)

この記事は [VirtualDOM Advent Calendar 2014 - Qiita](http://qiita.com/advent-calendar/2014/virtual-dom) の初日です。

初日ということで、基調講演風に、Virtual DOMとはなにか、なぜ僕はこんな興奮しているのか！という話から。

## Virtual DOMとはなにか

既存の概念で当てはめると、JavaScriptのMVC, MVW(Whatever)フレームワークのViewに位置します。が、その程度では終わりません。仮想DOMとは世界を革命する力であり、このjQueryのDOM操作で汚れきったフロントエンドを救う救世主なのです。

現時点で自分が知っている限りは、以下の実装を指します。

- [facebook/react](https://github.com/facebook/react)
- 最も使われてるFacebookの実装
- [Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom)
- Altenativeなvirtual domの実装
- [segmentio/deku](https://github.com/segmentio/deku)
- 現時点でwipと銘打たれているが、node.jsのコアコミッタが多数在籍するsegment.io社の仮想DOM実装

## なぜVirtual DOMか

結論から言うと、「設計と速度が両立する」から。以下その理由。

HTMLとはツリー構造であり、2つのツリー構造のdiffを算出して、それをDOMにpatchするアクションを作れば、常に最小のコストで状態遷移を表現できるよね、ってのがVirtual DOMという発想のスタート地点となります。

- State A : `<div class='foo'>aaa</div>`
- State B : `<div class='foo'>bbb</div>`
- 作られるdiff: fooのtextの`aaa+bbb`
- 差を埋めるpatch: `node.querySelector('.foo').innerHTML = 'bbb'`

(これは雑な表現)

このHTMLの生成する元となるツリー構造は、生のDOM(HTMLのインスタンス)である必要はなく、DOMと1対1に対応する単純な構造体で表現し、それを仮想DOMと呼びます。

Virtual DOM実装といった場合、仮想DOMの構造体表現と、それを用いたdiff/patchアルゴリズムを指します。

単純なJSの構造体なので、基本的に仮想DOM実装はブラウザ環境である必要がなく、node.jsやピュアなV8でも仮想DOMの構築とdiff生成までは可能です。

なので、実際の話、Virtual DOMのアルゴリズムはJavaScript以外でも書くことができます。patch処理の適用はブラウザ環境である必要がありますけどね。

実際に中で用いられるアルゴリズムに関しては、以下の資料を参考にしてください。

- [Performance Calendar » React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/)
- [Reconciliation | React](http://facebook.github.io/react/docs/reconciliation.html)
- [Virtual DOMのアルゴリズムが知りたくてvirtual-domのコードを読んだ話 - snyk_s log](http://saneyukis.hatenablog.com/entry/2014/09/03/134858)

とはいえ、ユーザーは基本的に中で行われるアルゴリズムを知る必要がないのですが、一点だけパフォーマンス上の理由で知らないといけないものがあります。それは、仮想DOMが前後の同意性を比定しやすくするためにユニークなkey属性を与えるということです。

`<ul class='list-container'>
  <li key='list-item-1'> 1 </li>
  <li key='list-item-2'> 2 </li>
  <li key='list-item-3'> 3 </li>
</ul>`

出来る限りユニークなkeyを全てのnodeに与えるのが推奨されます。Reactでは同一性を担保するのにkeyが使われます。(このキーは描画されるDOMには出現しません)

とはいえ、なくてもdiffが低速化するだけで動くことには動きます。

ユーザーは、key属性を指定する以外を除いて、内部で行われる操作を知る必要はありません。基本的に、ユーザーが取りうる行動は、「常に完成品の仮想DOMをPushし続ける」ということになります。

## Virtual DOMがもたらす、「古くて新しい」考え方

「常に完成品の仮想DOMをPushし続ける」というのは、結果として物事を単純化します。

ここでよく考えてみてください。

「状態遷移に応じて、完成品のHTMLをプッシュする」

これって見覚えがありませんか？

そうです、サーバーサイドで、HTTPリクエストに応えてHTMLを返却する操作そのものです。

Virtual DOMに基づいたフレームワークを使えば、この「古くて新しい考え方」でアプリケーションを記述することが可能になるのです。多くのサーバーサイドエンジニアが慣れ親しんだそれです。しかも、パフォーマンスは最適化された上でね！

これが最初に述べた、「設計と速度が両立する」という言葉の意味するところです。

現時点での各種クライアントサイドMVC実装は、正直僕でも学習コストが高過ぎると思っているのですが、Virtual DOMが惜しみなく使える時代が来ればパラダイムの変化が小さくなるので将来的にはVirtual DOMの方が学習コストは下がると思っています。

考えても見てください、今のjQueryって、Virtual DOMの発行するプリミティブなpatch処理を人間がやってるわけですよ！大抵の人間は時系列データをパッチできるぐらいには頭が良くないので、難しい部分は頭がいい人が書いたフレームワーク側に押し付けたいじゃないですか！！！

Virtual DOMなら、それができる！

本当にパフォーマンスでるの、っていうのは僕が書いたReactでsvgのパーティクルを物理演算する奴でもどうぞ

[http://mizchi-sandbox.github.io/react-svg-particle/](http://mizchi-sandbox.github.io/react-svg-particle/)

## Fluxアーキテクチャ

Virtual DOMは、アーキテクチャそのものを変化させます。

[Facebook の決断：MVCはスケールしない。ならば Flux だ。](http://www.infoq.com/jp/news/2014/05/facebook-mvc-flux)

この資料は「そもそもMVCを誤解している」という批判も多いのですが、大事なのは「常に一方向にデータが流れる」という点にあります。

今までのBackboneやAngularのクライアントサイドMVC/MVVMでは、次のような構成にならざるを得ませんでした。

`C -> (M <-> V)`

Cによって生成されたMとVが、双方向にイベントを交換しています。(あえて物事を単純にしてます。実際のモダンなクライアントサイドMVWは、MとVの間にMediatorかViewControllerかViewModelと呼ばれる中間層がいるでしょう)

これをFluxでは、Eventが常に一方向に流れるように規定します。

`C -> M -> V -> C  -> ...`

イベントが常に一方向に循環しています。これをUniDirectional Data Flow と呼んだりします。各層では、自分が受け取るイベントと発行するイベントに対し実装を行い、InとOutに対してだけテストを書けばよくなります。

![](http://www.infoq.com/resource/news/2014/05/facebook-mvc-flux/ja/resources/flux-react.png)

こうなると各層が元々のMVCとは意味がズレてくるので、 FluxではStore View Dispatcherと呼称します。

Storeはアプリケーションドメインのビジネスロジックを知っており、そこから仮想DOMをpushします。生成されたViewはDispatcherを経由してActionを発行します。Actionはルーティングやポーリングによっても発行されます。

古典的なサーバサイドの発想に当てはめると、ルーティングが最初に発行されるアクションに相当します。

これ以上詳しくは、日本語資料ならsaneyukiさんの解説を読んでください。

[Fluxアーキテクチャの覚え書きを書いた - snyk_s log](http://saneyukis.hatenablog.com/entry/2014/09/26/174750)

## なぜ今Fluxのような話が出てきたか

Virtual DOMによって「パフォーマンス面で問題を出さずに」常にゼロから状態を構築する、ということが可能になったからです。

データバインドだとパフォーマンスとイベントハンドラの都合で前のHTMLを捨てることはできませんでした。ゼロから構築して普通にHTMLをpushすると、画面が一度消えてしまい、イベントハンドラをデリゲートする処理をもう一度発行しないといけなくなります。

仮想DOMではイベントハンドラも同時に適用してpatchする対象なので、この心配はなくなります。

## Flux実装

なんか妙にたくさんあるんだけど…

- [Fluxxor - Home](http://fluxxor.com/)
- [DeLorean.js](http://deloreanjs.com/)
- [spoike/refluxjs](https://github.com/spoike/refluxjs)

ここらへんが比較的熱そう。

Flux、概念であり実装は簡単なので、皆自前で作る傾向があります。

(あとで自分が作ってる実装も公開したいなァ…結構Store層が分厚い設計だけど)

## FRP

このアーキテクチャ、副作用のないImmutableオブジェクト(ここでは仮想DOM)を時系列ストリームで表現する、と言い変えると、関数型言語とFunctional Reactive Programmingと相性がよく、Virtual DOMはFRPを行うためのパーツとして振る舞えるようになります。

どうです、その筋の人は興奮してきませんか。

実際、このアーキテクチャをClojureのImmutlablityを使って実現した、ClojureScriptのOmというフレームワークがあります。

[swannodette/om](https://github.com/swannodette/om)

また、FRPに特化したAltJSの一種である [Elm - functional web programming](http://elm-lang.org/) は、中でvirtul-dom(仮想DOM実装の一つ)を使っています。

一部のHaskellerが好きなpurescriptにも、もちろんバインディングがあります [purescript-contrib/purescript-react](https://github.com/purescript-contrib/purescript-react)

## Isomorphic

node.jsだと、DOMに描画するギリギリまでReactで表現することで、サーバーサイドとクライアントサイドを同じコードで記述する、Isomorphicというパラダイムが適用できたりします。

最近だとwebpackやbrowserifyでストレージ以外はだいたいビルドできるし、ストレージもこの前紹介した [mWater/minimongo](https://github.com/mWater/minimongo) 等を使えば抽象化できます。(とはいってもmongodb限定ですが…node環境だとmongo使うこと多いですし…)

[JavaScript - minimongoでIsomorphic Storage - Qiita](http://qiita.com/mizchi/items/e42cdf9eb0707fe86974)

つまりユニットテストを走らせるときはnodeで、みたいなのができます。不安定なphantomjsを使う必要がないの最高ですね。

## 現状の問題点

### 既存ライブラリとの相性の悪さ

Virtual DOMの基本アプローチは仮想DOM -> 生のDOM変換であり、この手続に依存する限り生DOMを触ることは推奨されません。patchに巻き込まれると、知らないうちにイベントハンドラごと吹き飛ぶ可能性があります。しかも内部のアルゴリズムに依存するので非常にデバッグ困難です。

つまりはjQueryは読み取りにしか使えません。副作用を起こすと仮想DOMと生DOMの対応関係がずれます。

こういうケースは現状どうやって対処するかというと、絶対にpatchが走らない空のDOMを用意してその中にDOMを展開したりしています。親に巻き込まれると消えます。

### エコシステム

仮想DOMに対応しているテンプレートエンジンがまだ少ししかありません。僕が知ってる中でReactの仮想DOMを吐けるのは次の2つです。

- jsx
- react-jade

[jadejs/react-jade](https://github.com/jadejs/react-jade)

テンプレートエンジンの多くはツリーごとの処理ではなくてフラットな文字列操作なので、仮想DOMを生成するのはそもそも難しかったりします。

とはいえ、生で生成してもよいのです。こんな風に。

`React.createElement('ul', {className: 'foo'}, [
  React.createElement('li', {key: 1}, 'item1'),
  React.createElement('li', {key: 2}, 'item2'),
  React.createElement('li', {key: 3}, 'item3')
]);`

結局jsxもreact-jadeもプレコンパイルすると↑のコードを生成しているだけです。ということはこれをテンプレートエンジンから吐けば良い。

Reactの惜しいところは仮想DOMがJSONで表現できないところですね。探せばあるかもしれないんで、誰かわかったら教えて下さい。

## 学習資料

[enaqx/awesome-react](https://github.com/enaqx/awesome-react)が一番まとまってる。

## Virtual DOMこそ未来

Angular2.0ではデータバインドを仮想DOM的な何かで経由するっていう話も出てきていますし、とにかくエッジな界隈ではみんな仮想DOMをみてる印象。なのに日本で注目度低くてヤバイってのが僕の中の危機感としてあって、騒いだりしてました。

お前それVue.jsのときにも言ってたじゃんってのはナシで。

## 最後に

どの実装が生き残るか、さらにもう一段階パラダイムシフトがあるのか？っていう懸念はありますが、僕は間違いなく仮想DOMが次世代のフロントエンド環境のスタンダードになると思っています。

とはいえプリミティブなレイヤーなので、ユーザーの目に見える場所から隠される可能性はありますが、それはそういうものなので隠れたっていいですよね。簡単な方がいい。まともに使えるようにするには各種WAFと一体化し、テンプレートエンジンが多く選べるようになったほうが便利なのは間違いありません。

たとえば僕は今Rubyでjadeテンプレートエンジンを仮想DOMとしてrenderするような実験してて、次のようなことができるのもわかってます。

[reactjs - Reactでサーバーサイドで生成したHTMLに対してDOMを初期化せずにReactComponentとして状態を更新する - Qiita](http://qiita.com/mizchi/items/dca6b82349e811a24158)

この世界、既存実装はまだ少なく、すべては可能性の中にのみあります。時代を切り開きたい人は是非、[VirtualDOM Advent Calendar 2014 - Qiita](http://qiita.com/advent-calendar/2014/virtual-dom) に参加しましょう！埋まらなかった日は、僕がベンチマーク貼ったりポエム書いたりします。