---
Created: 2021-01-15T20:37:00
URL: https://qiita.com/shinkuFencer/items/f2651073fb71416b6cd7
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
RubyOnRailsを触れる過程でMVCという概念を学び
その後、他のフレームワークでMVCやMVP、MVVMというものを知ったのですが
Railsで語られるMVCと他で語られるMVCのニュアンスが若干違うので
そこを基点にMVCの違い、そしてMVP、MVVMとは何なのかをまとめてみました。

## MVC(Model,View,Controller)

### 定義としてのMVC

上記でも挙げた通りMVCは使う場面やフレームワークによって
ニュアンスが異なっています。
そのため根本的な「MVC」の一般的な定義は一体どんなものなのかを見てみました。[Wikipedia](https://goo.gl/JkJ5EJ)からまとめると以下のとおり。

`アプリケーションソフトウェアの内部データを
ユーザーが直接参照・編集する情報から分離する。
そのためにアプリケーションソフトウェアを
「Model」「View」「Controller」の3つに分割する。

・Model（モデル）
　そのアプリケーションが扱う領域のデータと
　手続きを表現する要素である。
　また、データの変更をビューに通知するのもモデルの責任である
　（モデルの変更を通知するのにObserverパターンが用いられることもある）

・View（ビュー）
　モデルのデータを取り出して
　ユーザが見るのに適した形で表示する要素である。
　すなわち、UIへの出力を担当する。
　例えば、ウェブアプリケーションでは
　HTML文書を生成して動的にデータを表示するためのコードなどにあたる。
　GUIにおいては通常、階層構造を成す。

・Controller（コントローラー）
　ユーザからの入力（通常イベントとして通知される）を
　モデルへのメッセージへと変換してモデルに伝える要素である。
　すなわち、UIからの入力を担当する。
　モデルに変更を引き起こす場合もあるが
　直接に描画を行ったり
　モデルの内部データを直接操作したりはしない。`

Wikipediaから抜粋したものを見ると
RailsにおけるMVCとはMとVの関わりが若干違う気がします。

調べていくとどうやらWebアプリケーションで扱われるMVCは
上記のような**原初からあるMVC**よりも**Model2MVC**と呼ばれる派生のものの方が[近いようです](https://gist.github.com/tily/1362110)。

そこで原初のMVCとModel2MVCについて見ていこうと思います。

### 原初のMVCとModel2MVC

### 原初のMVC

原初のMVCは上記にあげたMVCの定義の通りなのですが
後続のものとの違いとしては**ViewとModelが繋がっており、データのやり取りが発生する**というところです。
以下の様なイメージ。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F15902%2Fdbf90be3-96a3-4aef-9e52-2ef2c026812a.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=76f0a70d0a584e1a611563fa798873a0)

元からあるMVCの場合はViewがユーザーのための表示にデータを加工したり
ユーザーの操作を補助したりと、Viewが肥大化する傾向にあるようです。
また、ViewとModelが密結合するため、双方の作業を分担しづらいという特徴もあります。

### Model2のMVC

原初のMVCとは異なり**ViewとModelは直接繋がらずControllerを介して両者が接続される。** 
そのため、ViewとModelは独立し、基本ViewとModelはControllerを介してやりとりをする。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F15902%2F545594a8-9bd1-b137-6ac0-c67519fda69f.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=a724bc0268477b568b7432e7c4bc2180)

前述のとおり、こちらのほうがWebアプリケーションのMVCに近いです。
ViewとModelが別れるため、作業分担しやすくなる反面
2つの仲介を果たすのでControllerの役割が大きくなりがちになるのも特徴です。

### 2つのMVCとMVP

デスクトップアプリなどのアプリケーションでMVCという場合は
原初のMVCを指すことが多く
RailsなどのWebアプリケーションではModel2MVCを
指すことが多いようです。

これはWebアプリケーションが
HTMLでの操作、表示が基本のため、従来の原初のMVCよりも
Model2MVCに沿った考え方のほうが馴染みやすかったという話なのだと思います。

では、MVPとはこれらのMVCとは異なるのでしょうか
更に追って見ていきます。

## MVP(Model,View,Presenter)

### MVPとは

Model2のMVCのModelとViewの結びつきをもっと疎にしたものがMVPです。
MVPは「Model」「View」「Presenter」で構成されます。

MVPもMVCのようにパターンがあり**パッシブビュー(Passive View)**と**監視コントローラ(Supervising Controller)**の2つに別れるようです。

まずはどちらも備えている特性としては以下の2つがあります。

- PresenterがViewへの参照を持ち、Modelが変更されたらViewを更新する
- Viewはなるべく簡素なものとし、Presenterにて操作を行う。

次に各々違うポイントごとに説明していきます。

### パッシブビュー(Passive View)MVP

パッシブビューはModel2MVCとほぼ流れは変わりません。
イメージは下記の通り。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F15902%2Fdcecea88-3892-d74c-b73d-df3c2f38b362.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ce58103c63253489056aea7129099a6d)

ModelとViewが完全に分離され、Presenterがその仲介を果たします。
Model2のMVCよりも、より分離するということが念頭にはおかれています。

こちらもModel2MVC同様に仲介役のPresenterの役割が膨れる傾向にあります。

### 監視コントローラ(Supervising Controller)MVP

こちらはパッシブビューとは違い、ViewがModelのデータに基づくUIを用意する場合
ViewがModelのデータ情報を監視(Observe)し、Modelの状態に応じて表示を変更します。

ただしデータの変更に関してはViewから直にModelを操作せず
Presenterを挟んでModelへのデータ変更の処理を行います。

イメージとしては下図のようになります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F15902%2F8c38b332-3e5e-dc8b-78e0-0c4f0a4b6c50.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=47fc7a9d6b2502a9e205c8319ac18bbb)

ユーザーアクションでViewが変わる場合はPresenterからViewに変更指示が行きますが
Model起因のデータの場合はPresenterを挟まずにView側でデータを直接参照して
表示を行います。

これらはモデル内のデータをそのまま表示させるような仕様の場合に効果を発揮します。
例えば以下の様なものです。

1. 監視しているModelの情報をView側でリスト表示させます。
2. ユーザーがリスト表示させたデータを操作します。
3. 操作された内容をPresenterに通知します。
4. 操作された内容に基づき、PresenterがModel側へデータの更新を依頼します。
5. 依頼された内容に基づき、Model内のデータを更新します。
6. Model内の更新をView側の監視が察知し、リスト表示に反映させます。

このように監視を挟むことにより、Presenterを経由せずともデータの反映を察知でき
また、View側からModelを監視するのみなので、Viewからはデータ操作もできず
Presenterからの操作のみという一貫性も担保できます。
また、PresenterからViewへのデータ加工のコストが減るため
その分Presenterの肥大化を和らげることができます。

しかし、原初のMVC同様にViewとModelの密度が上がるので
ViewのデザインにModelが引っ張られる可能性があります。

## MVVM(Model,View,ViewModel)

MVCとMVP、双方見たところでMVVMというものは一体何なのかを見ていこうと思います。
まずはイメージ図です。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F15902%2Fb3caa541-155f-4abd-746c-9f035217df48.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=016014d207d4c51a2df2b5172d329669)

双方向データバインディング（双方向DataBind）という形でViewとViewModelを結びつけています。
双方向でデータバインディングとは何かということを説明していきます。

### 双方向データバインディング

データバインディングとは文字の通りデータ(Data)を結びつける(Bind)する機能です。
これは監視コントローラ型のMVPで挙げた監視よりも更に密な考え方で
UIとデータオブジェクトを結びつけて、同一のデータをやりとりできるようにして
UIが操作されるとデータ側も書き換えるような仕組みです。

また、双方向データバインディングの場合はデータが書き換えられてもUIに反映
UI側の情報が書き換えられても反映というような
相互でデータをの更新をやりとりするようなイメージです。

### ViewModel

Modelから取得したデータをバインディングできるようにデータを定義して
表示と連動してデータが変更され、またデータに直接操作が必要な場合は
Modelへ操作を依頼するものとして存在するのがViewModelです。

Modelのデータを直接ViewのUIで取り扱いできない場合でも
ViewModelを用意し中間に挟むことで実現できるようにしています。

### MVVMとデータバインディング

このMVVMはデータバインディングができて初めて適応できるモデルのため
データバインディングの機能を有していないフレームワークでは実現できません。

そのためMVCやMVPほど考え方として適応はし辛いですが
データバインディングが機能としてスタンダードになっていけば
もっと利用される機会が多くなるかもしれません。

## まとめ

### MVC

MVCには最初からあるMVC（原初のMVC)の考え方とは別に
WebアプリケーションなどのMVCのベースとなった「Model2MVC」がある。

### MVP

MVPには大きく2種類あり
ViewとModelを監視する形で結びつける「監視コントロールMVP」と
ViewとModelを完全に独立させ、Presenterで結ぶ「パッシブビューMVP」があります。

### MVVM

MVVMはViewModelというModelのデータをViewで扱いやすくするようなものを設け
データバインディングという機能を使い、データそのものを共有して取り扱う考え方です。

## あとがき

MVCとMVP、そしてMVVMをむりくり同じ土俵にまとめましたが
それぞれの要素の関係性や、要素が受け持つ範囲はかなり違いました。
というよりもWebアプリケーションのMVCはイレギュラーな存在と考えたほうが良いのかもしれません。

MVCやMVPを利用する時は
どの機能までがViewに相当するのか
ControllerやPresenterに相当するのかなど
各々の担当範囲を明確にしておくことが大事だなと感じました。

※もし誤りなどありましたらご指摘いただけますと幸いです。。

## 参考サイト

- [MVCパターンの適用限界を考える(3) (Weblog on mebius.tokaichiba.jp)](http://goo.gl/QW6hJ4)
- [雑把の UI アーキテクチャー史(MVCからMVVMへ) | プログラマーズ雑記帳](http://goo.gl/0LoLa)
- [サバクラ両方で動く JavaScript の大規模開発を行うために](https://goo.gl/3mIq7)
- [MVC、本当にわかってますか？ - Qiita](http://goo.gl/flbkSK)
- [「MVCの勘違い」について、もう一度考えてみる - 圧倒亭グランパのブログ](http://goo.gl/qvEdRG)
- [開発者が知っておくべき、6つのUIアーキテクチャ・パターン － ＠IT](http://goo.gl/Dw83A)
- [MVPパターンによる設計アプローチ「あなたのアプリ報連相できてますか」](http://goo.gl/yTH6ny)
- [C#と諸々 MVP (Model View Presenter)パターン](http://goo.gl/mwGJc7)
- [MVPとかMVVMとか - ゆうなんとかさんの雑記帳的な。](http://goo.gl/HKzXta)
- [Neutoria: MVVMを図にしてみた](http://goo.gl/dlJsXg)
- [MVVMのModelにまつわる誤解 - the sea of fertility](http://goo.gl/uW9YIW)
- [RIA のアーキテクチャーとデザインパターン （リッチクライアント編） | デベロッパーセンター](http://goo.gl/W5Pjuk)
- [10分で振り返るソフトウェアアーキテクチャの歴史2017 // Speaker Deck](https://speakerdeck.com/takasek/10fen-tezhen-rifan-rusohutoueaakitekutiyafalseli-shi-2017)