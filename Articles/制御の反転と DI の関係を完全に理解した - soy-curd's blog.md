---
Created: 2021-01-15T20:18:00
URL: http://soy-curd.hatenablog.com/entry/2018/05/31/234029
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
自分は会社で利用している web [フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)や Angular で DI を日頃から使っているのだけれど、なんかモックとかぶちこめて便利だな、ぐらいの理解で、
`制御の反転`っていう概念がよくわからなかったし、それと DI がどのようにな関係にあるかについては全然考えていなかった。なので、最近いろいろ調べてわかったことを書いてみる。

まず、`制御の反転`なのだけれど、[wikipedia](https://ja.wikipedia.org/wiki/%E5%88%B6%E5%BE%A1%E3%81%AE%E5%8F%8D%E8%BB%A2)に概念がまとめられている。しかしDI を念頭にこの文章を読んでも、この説明だとよくわからないと思う。

これはなぜかというと、この [wiki](http://d.hatena.ne.jp/keyword/wiki) に載っている例が、[Dependency](http://d.hatena.ne.jp/keyword/Dependency) Injection とは直接関係ないからだ。[実装技法](https://ja.wikipedia.org/wiki/%E5%88%B6%E5%BE%A1%E3%81%AE%E5%8F%8D%E8%BB%A2#%E5%AE%9F%E8%A3%85%E6%8A%80%E6%B3%95)
の項目になって、ようやく依存性の注入の話が出てくる。この時点で、`依存性の注入`は`制御の反転`を行うための一つの手段でしかないことがわかる。

それではいったい DI における`制御の反転`は何の制御を反転しているのか？ということだけど、これは、`クラスの管理（制御）の責務`を反転している。

[この記事](https://msdn.microsoft.com/ja-jp/library/ff921087.aspx)からその責務を抜粋すると、

- 依存関係の置換または更新を行う(a)
- 依存関係の有効期間の特定(b)

である。DI においては、`クラスの管理（制御）の責務`を担うのは、利用する側のオブジェクトではなく、[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)だ。

これを Angular の[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)で考えると、(a)は例えば[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)のためにモックの注入を行う場合で、 (b)は[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)側の機能として[Provider](https://angular.io/guide/providers)や
[Singleton service](https://angular.io/guide/singleton-services)を提供している点だろう。

以上を意識してから読むと面白いのが、[この記事](https://fsharpforfunandprofit.com/posts/dependency-injection-1/)と[この記事](https://hackernoon.com/you-dont-need-to-know-dependency-injection-2e9d2ba1978a)
だ。

> F#でDIするやつ / “Functional approaches to dependency injection | F# for fun and profit” https://t.co/y5xsMBtKTT— soy-curd (@soycurd1) 2018年5月31日

> React等のフロントエンドにおいて、propsは依存性の注入にあたるし、event handlingは制御の反転にあたるから、わざわざDependency Injectionの概念をJsの世界に持ち込む必要なんてないよねっていう… https://t.co/JHfxi2VRLn— soy-curd (@soycurd1) 2018年5月30日

前者では必要な機能を持った関数を引数として渡したり、部分適用を行うことで依存性の注入を実現していて、後者では、 React は props の機能で DI 相当の機能が実現できるから、DI なんて知る必要はない、と言っている。

つまり、[OOP](http://d.hatena.ne.jp/keyword/OOP) の文脈で DI を実現するためには DI コンテナのような[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)が必要だが、FP においては関数が first class であることで、言語機能として制御の反転を担保している、と言えるのかもしれない。（React は FP 側）

[google](http://d.hatena.ne.jp/keyword/google) の Peter Norvig のスライドで、[「動的言語でのデザインパターン」](http://norvig.com/design-patterns/)というものがあって、この中で [GoF](http://d.hatena.ne.jp/keyword/GoF) の[デザインパターン](http://d.hatena.ne.jp/keyword/%A5%C7%A5%B6%A5%A4%A5%F3%A5%D1%A5%BF%A1%BC%A5%F3)のうち 16 個は[動的言語](http://d.hatena.ne.jp/keyword/%C6%B0%C5%AA%B8%C0%B8%EC)では不可視化されるかシンプルになると言っている。確かに [Python](http://d.hatena.ne.jp/keyword/Python) なんかでは[イテレータ](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C6%A5%EC%A1%BC%A5%BF)は言語に組み込まれているし、頻出するパターンは[プログラマ](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DE)の手を煩わせないように言語設計者が上手く取り込んでくれているのだろう。

もし FP が今後もっと台頭すれば、DI の概念もいずれは、すでに言語にビルトインされたものとして特におおげさに言及されることもなくなるのかもしれないと思った。