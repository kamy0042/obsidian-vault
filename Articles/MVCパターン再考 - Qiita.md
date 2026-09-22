---
Created: 2021-01-15T18:12:00
URL: https://qiita.com/ffggss/items/15943c6c3908a6f25cb5
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
## 背景

Java, Groovy, C++, C#などいろいろな言語使ってアプリケーションを作成するなかで、MVCパターンを常に意識して開発してきました。
自分的な解釈だと、上記のような大雑把の分類です。

- Model: ビジネスロジック、データベース処理、データオブジェクトなど
- View: 画面出力
- Controller: ViewとModelの仲介役、ユーザーの入力をModelに渡すなど

しかし、あるセミナーで「ネイティブアプリでは、MVCは合わない」という話を聞き、改めて、MVCがどこまで適用できるものなのか、そもそもMVCってなんだろう？と再考したくなりました。というわけで、MVCModelを再考してみます。

## MVCと一言で言っても・・・

改めて調べて分かったのですが、一口にMVCといっても、以下、分類があることがわかりました

- MVC1
- MVC2
- Pull-MVC
- Push-MVC

## MVC1(Smalltalk MVCとも呼ぶ)

- 1979年 SmalltalkのGUI設計で用いられた概念
- **デザインパターンのObserverパターンが具体例として有名**
1. Modelに対して変更があったときに情報を受け取りたいViewを登録する
2. 変更されたら登録されたすべてのViewに対して通知を行う

## MVC2

- 1998年 JSP仕様のドラフトで提唱された。MVC1をWebサービスに適応させたもの
- サーバー側からいきなりModelの状態変更が 通知されることはHTTPがステートレスなのでできない
- Modelの状態変更は、Controllerを経由してViewへの通知するように修正された
- **WebアプリにおいてのMVCとはMVC2のことを指す**

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F112294%2F3f340910-d2c9-ffa3-cdc3-be229ecaa4d2.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7d426c54952480e342cb438feaf593bf)

3. クライアントからのリクエスト(URL)
+リクエストを通知
4. 結果を返す
5. 結果を反映させる
6. レスポンス

## Push-MVC(MVC2)

- ほとんどのMVCフレームワークは、Pull-MVCのアーキテクチャにしたがっている
- このようなフレームワークは、処理を要求するアクションを実行し、次に結果を出力するためにデータを表示のレイヤにプッシュする。Struts、Django、Ruby on Rails、Spring Frameworkの一部であるSpring MVCなどがこのアーキテクチャの良い例

## Pull-MVC(MVC2)

- Push-MVCに対するアーキテクチャで、「コンポーネント型」とも呼ばれている
- 「コンポーネント型」は表示レイヤから処理を開始し、必要に応じて複数のコントローラからの処理の結果を「プル」する
- 「コンポーネント型」では、複数のControllerが一つのViewに関連付けられる。 Tapestry、Velocity などがプル型アーキテクチャの一例である

## MVCのメリット

7. ViewとModelでの並行開発が可能となる。ViewとModelが分離されており、それぞれの変更の影響を受けないため
8. Modelを機能別に分けることで、テストがしやすく再利用性が高いコンポーネントを作成することができる
9. ViewとModelの相互参照を避けることができるのでコードの見通しが良くなり、影響範囲も限定しやすい

## 上記メリットを踏まえた上で実務で感じたこと

### ViewとModel、Controllerの並行開発はなかなか難しい

- UIが複雑に、またビジュアルで応答性を高めるほど、ユーザー入力がViewに依存して制御されるようになるため（UIが複雑になるとjQuery等のフロントエンド側のコーディングで頑張ることになるから）、ViewとControllerの結合が強くなり、ViewやControllerが単独で交換可能にならなくなる。
- 例えば、ECサイトで`配送日を指定する`を選択した場合、日時指定のカレンダーが表示され、`配送日を指定しない`を選択すると`配送予定日が表示される`ような画面があると、配送日の選択状態によって、Viewを変える必要がでてくる。
- この場合、Controllerは、Viewの配送日の選択状態によって、配送予定日を計算するModelに依頼するのか、配送可能日を取得するModelに依頼するのかが変わってくる（このケースだと、javascript側でのController制御になる）
- しかし、UIが複雑だとUIの修正に合わせて、Controllerの修正も変更しなければならない可能性が高くなる。
- このようなケースだと、クライアント側でのControllerが実装されるため、ViewとControllerの分離が難しくなる
- このようなM-VCとなるような構造をDocument-Viewと呼ぶらしい
- View、Model、Controllerはそれぞれ相互依存してくることが多い。Viewの実装によって、Modelのレスポンスは影響を受けるし、逆にModelの実装によってもViewの実装にも影響してくる。View、Model、Controllerが全て同じフレームワークの方が開発スピードは早いが、完全にViewは分離しようとすると、View、Model、Controller間のインタフェース設計が必要になり開発スピードは落ちてくる。例えば、Ruby on Railsなどを使っていると、View、Model、Controllerのインタフェースが統一されてくるので楽だが、View、Model、Controllerが別のフレームワークになってくると、ViewとControllerは、json形式などの汎用形式でやりとりが必要になってくるなどである。

## MVCという用語の功罪

### 功

- ｢ModelとViewを分離させる｣という常識を浸透させたこと
- 知ってしまうと当たり前のように考えてしまうが、MVCを知らない人が最初からModelとViewを分離しようと考えることは難しい。ViewとModelが混ざったソフトウェアを作ってしまい、痛い目をみるという経験をしてたどり着く考え方である
- Viewの部分(html)をデザイナーに依頼、Model部分をエンジニアが開発という分業が可能になった

### 罪

罪というか、自分の無知が大きいのですが。。。

- **MVC1とMVC2というのがごっちゃになってコミュニケーションされる傾向があり、モヤっとさせる場面がある**
- Javaなどで扱うデザインパターンは、`MVC=MVC1`ですし、Webアプリ入門などで取り上げられるのは`MVC=MVC2`という感じで同じ用語で違う意味で使われている

## MVCの捉え方によって違ってくる！

MVCをどのように捉えるのかでえらく変わってくることが解ってきました。

### 捉え方1 サーバーサイドのみでMVCを考える

`(Browser)View -> |Network| -> (Routing)Controller -> (Buiness Logic)Model -> (HTML)View -> |Network| -> (Browser)View`

- Model: データ重複、ロジック重複を避けるために共通化する。共通化する単位としてビジネスロジックなど
- Controller: ユーザー入力を受け付けて、それに合ったModelを起動する
- Push型: 担当するViewにModelの情報をPushする。
- Pull型: （-）ViewがModelからデータをPullする。ControllerはViewと密着する。
- View: ControllerからのデータをもとにHTMLを出力する

### 捉え方2 クライアントサイト、サーバーサイド、それぞれでMVCを考える

`(Browser)View -> Controller -> (Application Logic)Model -> |Network| -> (Routing)Controller -> (Buiness Logic)Model -> (DataFormat)View -> |Network| -> (Application Logic)Model -> (Browser)View`

### クライアントサイド

- Model: サーバーサイドのAPIを利用しながら、そのアプリケーションが扱う領域のデータと手続きを表現する。
- View: ユーザーにModelの状態を反映したHTMLを出力する
- Controller: ユーザーの入力を受け取って判断し、Modelを起動する

### サーバーサイド

- Model: ビジネスロジック、データベース処理など
- View: json形式等、APIに適したDataFormatでクライアントに返す
- Controller: クライアントのリクエストを受け付けてそれに合ったModelを起動する

## まとめ

- **MVCにはMVC1とMVC2がある**
- MVC1では、Modelの変化を引き金として、Viewにその変化を通知する。
- MVC2では、サーバー側からModelの状態変更を通知することはHTTPがステートレスなのでできない。したがって、Modelの状態変更は、Controllerを経由してViewへの通知するように修正された
- **MVCといったら、WebアプリではMVC2を指す**
- **サーバーサイドとクライアントと分割してMVCを考えた方がしっくりくる**
- 調査以前は、Viewはブラウザ、ModelとControllerはサーバーとして、サーバーサイドとクライアントサイドを統合して考えていたが、分割して考えた方がMVCをすっきりと受け入れられる気がした。
- **Viewはブラウザと捉えずにHTML, json, xmlなど最終的にクライアントに返すフォーマットという広い捉え方にしよう**
- そういう捉え方をすることで、API+ネイティブアプリという構成であっても、MVCで捉えることもできる
- 「APIサーバーはMVCパターンだけど、ネイディブ側はDocument-Viewパターンだよ」とか

## 参考サイト

- [http://ynomura.dip.jp/archives/2012/09/mvc1.html](http://ynomura.dip.jp/archives/2012/09/mvc1.html)
- [http://qiita.com/tshinsay/items/5b1724baf32b8b5113c2](http://qiita.com/tshinsay/items/5b1724baf32b8b5113c2)
- [http://cartman0.hatenablog.com/entry/2015/12/17/045635](http://cartman0.hatenablog.com/entry/2015/12/17/045635)
- [http://javazuki.com/articles/mvc-tutorial.html](http://javazuki.com/articles/mvc-tutorial.html)
- [http://forza.cocolog-nifty.com/blog/2014/07/mvc2mvc-ffd9.html](http://forza.cocolog-nifty.com/blog/2014/07/mvc2mvc-ffd9.html)