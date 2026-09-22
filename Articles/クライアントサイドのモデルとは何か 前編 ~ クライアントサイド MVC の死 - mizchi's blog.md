---
Created: 2021-01-15T20:34:00
URL: https://mizchi.hatenablog.com/entry/2018/05/15/181819
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
## 前置き

この記事、本来は [Flux には Model がないのではないかと思った覚書 - ナカザンドットネット](http://blog.nkzn.info/entry/2018/05/15/103658) と [Flux の Store が ViewModel かって話からの MVW とかどうでもいいって話 - 猫型の蓄音機は 1 分間に 45 回にゃあと鳴く](https://nekogata.hatenablog.com/entry/2018/05/15/110907) のアンサーとして書き始めた記事だが、前置きだけで別テーマとなったので、前後編に分割する。

僕は元々がゲームクライアント屋だったときの発想を引きずってるのと、既存の Web の開発の文脈に対して距離を置いていることを明言しておく。あとこういうテーマでとある原稿書いていたので、頭の整理も兼ねて。

## [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) の功罪を振り返る

このテーマを語るにあたって、まず [Rails](http://d.hatena.ne.jp/keyword/Rails) の [MVC](http://d.hatena.ne.jp/keyword/MVC) について述べなければならない。なぜなら、フロントエンドの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)とは、サーバーサイドの [MVC](http://d.hatena.ne.jp/keyword/MVC) の模倣に始まり、破綻し、結果として [iOS](http://d.hatena.ne.jp/keyword/iOS)/[Android](http://d.hatena.ne.jp/keyword/Android)/Desktop の [GUI](http://d.hatena.ne.jp/keyword/GUI) アプリ設計手法と合流したからだ。

[Rails](http://d.hatena.ne.jp/keyword/Rails) の ActvieRecord の失敗は、端的に指摘できて、それは Storage 層 と、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)を記述するための Entity を区別しないというところにある。本来の [MVC](http://d.hatena.ne.jp/keyword/MVC) を WAF に特化した省略形で、この設計は [MVC2](http://d.hatena.ne.jp/keyword/MVC2) と言われることもある。

[MVC と MVC2 について改めて考えてみる - スタジオ・アルカナ技術ブログ](http://www.s-arcana.co.jp/tech/2011/07/mvc-mvc2.html)

この [MVC2](http://d.hatena.ne.jp/keyword/MVC2) は Web 特有のリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)ト・レスポンスに起因していて、コントローラで受けてから値を返すまでのライフサイクルが以上に短い(50ms~1500ms)。また雛形のコードも短い。なので、Enitity と Storage を区別しているステップがもったいない。

あえて区別しない express の[擬似コード](http://d.hatena.ne.jp/keyword/%B5%BC%BB%F7%A5%B3%A1%BC%A5%C9)を書くならこうだろうか。

```plain text
server.post('/users/save', (req, res) => {
  const attrs = req.body
  // 無意味なコードなのであえて冗長に書いている
  const newUserEnitity = new UserEnitity(attrs)
  const userStorage = await UserStaroge.save({
    id: newUserEnitity.id,
    name: newUserEnitity.name,
    email: newUserEnitity.email
  })

  res.json(userStorage.attributes)
})
```

そして外部 IO から来る値を元に Entity を組み上げても、短いコードではそのロジックを使う間もなく、Storage にセーブして終わり、となりがち。なので、この Entity と Storage は一体化した Model という名前のストレージ兼ロジック抽象の何かになった。そしてたぶん [CakePHP](http://d.hatena.ne.jp/keyword/CakePHP) で導入されたその思想は [Rails](http://d.hatena.ne.jp/keyword/Rails) 等の他の [MVC](http://d.hatena.ne.jp/keyword/MVC) に受け継がれていった、と理解している。

簡単なうちは簡単で済む。それはいいことだと思う。他を害さない限り。

追記: [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) パターン、 Cake => [Rails](http://d.hatena.ne.jp/keyword/Rails) という順番だと聞きかじっていたけど、Martin Fowler の PoEAA => [Rails](http://d.hatena.ne.jp/keyword/Rails) => Cake3 らしいです

## 良い解決策とは何か

セットアップを短くして、初心者や初学者にいい顔するのはいいことで、不必要なことを抽象化できてるということだし、興味のスコープを宣言できてることなので、悪いことではない。

最近でも next.js なんかはそれの権化で、`pages/index.js` に `export default () => <h1>Hello</h1>` と書くだけで [SSR](http://d.hatena.ne.jp/keyword/SSR) する React アプリケーションの開発がはじめられる。この体験は鮮烈だった。確かに、本質的に削ぎ落とすと最初はこれだけでいいはずだ。

[https://github.com/zeit/next.js/](https://github.com/zeit/next.js/)

で、問題は、これが複雑化した画面でどういう柔軟性があるか。

next.js の難点は、多様な要求に対してオプションを提供するのではなく、 作者の `@rauchg` の[ミニマリズム](http://d.hatena.ne.jp/keyword/%A5%DF%A5%CB%A5%DE%A5%EA%A5%BA%A5%E0)な思想に従うことを強制してくるタイプの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)で、その点使い勝手は後発の nuxt.js に劣る。

[Rails](http://d.hatena.ne.jp/keyword/Rails) に Service 層を生やすかどうかよく議論にあがるが、それは [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) が Entity としての振る舞いをどこに書くかの居場所が [Rails](http://d.hatena.ne.jp/keyword/Rails) の [MVC](http://d.hatena.ne.jp/keyword/MVC) モデルだと用意されてないからだと思う。Controller が分厚くなったら、共通処理は Model に書きましょう、というのがこの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)から自然と導かれてしまう[アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3)で、これは悪い DRY の話にもつながる。

[俺が悪かった。素直に間違いを認めるから、もうサービスクラスとか作るのは止めてくれ - Qiita](https://qiita.com/joker1007/items/25de535cd8bb2857a685)

## クライアントの「モデル」

前置きが長くなった。で、本題のクライアントサイドのモデルだが、複数の解釈が発生してしまった。

1. サーバーサイドのモデルを抽象したプロキシ
2. クライアント上の[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)を表現した Entity
3. クライアント側の永続層(IndexedDB/LocalStorage) のストレージ抽象

これに対して誰も一貫した答えを持っていなかった。というのが 2012 年ぐらいから段階的に明らかになったことで、DDD 的解釈や素朴な WAF の延長と捉えた人で解釈が違っていた。僕は Electron アプリの開発をしていたので 3 とも向き合うことになった。

1 が Backbone と Ember で、これは前提に REST がある。1 画面が 1 つの Model に紐付いていて、その Model のクライアントにおける[写像](http://d.hatena.ne.jp/keyword/%BC%CC%C1%FC)を用意すれば、一貫した開発体験が得られる、というわけだ。

結果から言うとこれは破綻した。理由は 2 つある。

まずサーバーとクライアントのライフサイクルが違う。サーバーは先に述べたようにせいぜい 200ms~15 秒だが、クライアントサイドはタブが生成されてから破棄されるまで動き続ける。(ここは暗に SPA を意図している) なので、想定すべきは 3 分とか 15 分、しかも複数レスポンスに跨って状態を持つ、みたいな話になる。そのトリガーは何かしらのイベント駆動で、また抽象が違う。そもそもリソースに関与しない振る舞いすらある。

2 つ目は、クライアントサイドで発生するリレーションの問題で、クライアントの要求が増える度、必要なデータのクライアントサイドのジョイン が発生する。開発が長い環境ほどインターナルな REST 抽象は破壊され、専用 ViewAPI が増えるかカスタマイズされるかどっちかになる。ちなみに、これに対する解答の一つが GraphQL だったりする。 (ちなみに自分は REST 懐疑派で、もはや誰から見てもユニバーサルなリソースなど存在せず、クライアントからの要求は専用 [API](http://d.hatena.ne.jp/keyword/API) か RPC を作るのが良いと思っている)。

node だと isomorphic というテーマがあって、それを無理矢理に一致させようという研究は行われていたが、結果として上手くいったとは言えない。専用の PaaS が必要な Meteor は結局流行らなかったし、結果としてその差を強く意識するようになってしまった。

じゃあどうなったのか？それは ウェブの [MVC](http://d.hatena.ne.jp/keyword/MVC) という前提を捨てて、Flux という名前で [MVC](http://d.hatena.ne.jp/keyword/MVC) モデルを見つめ直したことで、結果として [GUI](http://d.hatena.ne.jp/keyword/GUI) プログラミングと潮流と合流しつつ、ストリームの監視と差分適用というものにフォーカスした[パラダイム](http://d.hatena.ne.jp/keyword/%A5%D1%A5%E9%A5%C0%A5%A4%A5%E0)に進化したのだ、と自分は思っている。

後編に続く。

[mizchi.hatenablog.com](http://mizchi.hatenablog.com/entry/2018/05/17/220431)

## おまけ: 初心者にいい顔できるツールが流行る

やや愚痴っぽい話。

ちょっと本題からずれるが、[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)や[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)の流行は、以下に初学者に対していい顔をするか、という点に尽きると思っている。かっこいいものを手数少なく書けるとカッコイイ。[チュートリアル](http://d.hatena.ne.jp/keyword/%A5%C1%A5%E5%A1%BC%A5%C8%A5%EA%A5%A2%A5%EB)は短ければ短いほどいい。ここ近年の静的型付の[復権](http://d.hatena.ne.jp/keyword/%C9%FC%B8%A2)は、単に型表現のパターンや推論機が発達して、[チュートリアル](http://d.hatena.ne.jp/keyword/%A5%C1%A5%E5%A1%BC%A5%C8%A5%EA%A5%A2%A5%EB)のサンプルコードを短く書けるようになったかどうかに過ぎない点もあるのではないか。

これは悩ましい問題で、実際仕事でアプリケーションを書いていくにあたって、[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)の選定などを行うアーキテクトの立場では、コミュニティで人気があるものと、[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)的な伸びしろがあるかどうかはまったく独立した要素だ。前述した next.js は、僕も便利だと思いつつ、仕事のような要件がコン[トロール](http://d.hatena.ne.jp/keyword/%A5%C8%A5%ED%A1%BC%A5%EB)できない場合に採用するのを薦めることができない。[SEO](http://d.hatena.ne.jp/keyword/SEO) 上の理由で [SSR](http://d.hatena.ne.jp/keyword/SSR) する必要があるなら苦労してでも redux [SSR](http://d.hatena.ne.jp/keyword/SSR)のボイラープレートを一つ採用するのを薦める。そもそも [SSR](http://d.hatena.ne.jp/keyword/SSR) 不要なら [SSR](http://d.hatena.ne.jp/keyword/SSR) 不要であると言うことのほうが多い。

極端なのは「プログラミング抜きで〜できる！」という煽りで、その場合、[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)に等しい一つの [DSL](http://d.hatena.ne.jp/keyword/DSL) やツールを覚えることになるのだが、それらのツールがその説明を果たしているとは言い難い。極端なのは [RPG](http://d.hatena.ne.jp/keyword/RPG) ツクールだと思っていて、例えば僕がプログラミングを最初にやったのは、WolfRPG Editor(ウディタ) の戦闘画面のコモン[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)を改造していて、こんなんプログラミングじゃん！って思ってはじめたのが最初だったような気がする…。

- [1](about:blank#ipfootnote0):個人的に、ここの静的検査の弱さが 10 年前の動的型付ブームの理由の一つだったのでは、とも思っている。自分は逆に[アノテーション](http://d.hatena.ne.jp/keyword/%A5%A2%A5%CE%A5%C6%A1%BC%A5%B7%A5%E7%A5%F3)としての型を書くべき派だが…
4. `res.json(...)` も同様。