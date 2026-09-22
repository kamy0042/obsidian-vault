---
Created: 2021-01-15T18:08:00
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
DDD連載記事

- [なぜDDD初心者はググリ出してすぐに心がくじけてしまうのか](http://little-hands.hatenablog.com/entry/2017/09/24/005903)
- [ドメイン駆動設計の定義についてEric Evansはなんと言っているのか](http://little-hands.hatenablog.com/entry/2017/09/27/014403)
- [モデルでドメイン知識を表現するとは何か](http://little-hands.hatenablog.com/entry/2017/10/04/201201)
- [ドメイン駆動設計で実装を始めるのに一番とっつきやすいアーキテクチャは何か](http://little-hands.hatenablog.com/entry/2017/10/04/231743)
- [ドメイン駆動 + オニオンアーキテクチャ概略](http://little-hands.hatenablog.com/entry/2017/10/11/075634)

# 背景

[ドメイン駆動設計で実装を始めるのに一番とっつきやすいアーキテクチャは何か](http://little-hands.hatenablog.com/entry/2017/10/04/231743)の記事で、オススメしていたのはオニオンアーキテクチャでした。

今回は、オニオンアーキテクチャについて詳しく説明したいと思います。

上述の記事でも書いた通り、「ヘキサゴナル、オニオン、クリーン」の3つは、本質的には全く同じで、思想としてはヘキサゴナルで完成されているのですが、より具体的に説明されているオニオンアーキテクチャから説明を読んだ方が理解がしやすいと思います。
その後にヘキサゴナルの説明を読むと「なるほど」となって「あれ、結局ヘキサゴナルじゃん」となります。笑

# 伝統的レイヤードアーキテクチャ

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F93afdd73-af3f-abd0-304a-b2c792ef6357.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6704a8c287eb55d514f4a607ce1a30c8)

このアーキテクチャでは、BusinessLogic層に文字通りすべてのビジネスロジックを凝集するという設計です。しかし、

- DataAccess層の存在でモデリングの中心がDBになり、業務的なモデリングが阻害されがち
- BusinessLogic層がファットになりがち
- 結果、長く運用しているほどメンテが辛くなって行きがち

といったデメリットがあります。

# 「EricEvansのドメイン駆動」で紹介されたレイヤードアーキテクチャ

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F10a278dd-d6da-1f17-83f2-72b91c46526d.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7b445861ab4cd63e9fd718b24f27b38b)

伝統的レイヤードアーキテクチャから、Domain層のモデルに業務的な知識を持たせ、メンテナンス性を高めようとしたのがこちらのアーキテクチャです。

これに関しては[モデルでドメイン知識を表現するとは何か](http://little-hands.hatenablog.com/entry/2017/10/04/201201)の記事でサンプルコード付きで解説しているのでそちらをご参照ください。

この設計によってモデリングのしやすいさは大幅に改善されましたが、まだ弱点があります。 ***Domain層がInfrastructure層に依存していること*** です。

これはつまり、ライブラリの変更やデータベースの切り替えなどのインフラストラクチャレイヤの変更により、ビジネスロジック全体に影響が発生する可能性があるということです。

具体例を挙げてみましょう。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F3d832cd1-30a9-343c-f7e2-79cc8ca274d4.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6e15bad607cd1ebb957711f9e9c65693)

あるモデルのDBアクセスをRDBとして実装していたとします。Infrastructure、Domain層の実装が特定のRDBMSで使用する前提の記述になっていた場合、後からRDBをAWSのDynamoに変更しようすると、どれだけのコードを変更しないといけないか・・・？想像するだけでも大変ですね。

Infrastructure層を差し替える他の事例としては、メール送信サービスを最初は自作していたところから、より高機能な外部サービスに切り替えたくなる、というケースは現実的に想像がつくのではないでしょうか。

これはつまり、「ドメインモデルを中心に設計」しようとしているのに、Domain層がなんらかのレイヤーに依存していることが問題なのです。Domain層は、ドメインモデルに変更があった時のみ、修正するようにしたいのです。

# オニオンアーキテクチャ

## 依存関係逆転の原則

そこでこのアーキテクチャです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F1d725954-ee52-ebd9-0580-97ce1114eece.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0b7e9325a77b587d2cf9c2d182f6bd84)

[モデルでドメイン知識を表現するとは何か](http://little-hands.hatenablog.com/entry/2017/10/04/201201)の記事で紹介しているサンプルのオブジェクトを元に説明すると・・・

Copied!

`Task： DomainModel層(実クラス)
TaskRepository： DomainService層(レポジトリ / インターフェイス)
TaskApplication： ApplicationService層
TaskRDBRepository： Infrastructure層(レポジトリ / 実クラス)
TaskDynamoRepository： Infrastructure層(レポジトリ / 実クラス)`

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F817fe669-7e30-6e8c-e48a-f4098b05d94e.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=21007085eddc2e5b2966c969cf4fc312)

おっと、見事にドメインモデルを何にも依存しないクラスとして実装することができました！

違いは何でしょうか？

そう、TaskRepositoryが実クラスではなくInterfaceになったことにより、Infrastructure層との依存関係が逆転したのです。

このような手法を依存関係逆転の原則と言います。([参考資料](https://www.slideshare.net/ShintaroKurosawa/20160526-62511723))***ローレベルなレイヤを実装してからハイレベルなレイヤに依存させるのではなく、ハイレベルなレイヤが公開したInterfaceに基づいてローレベルレイヤが実装する***のです！これにより、ハイレベルなレイヤの独立性を高めることができます。

この事例では、

Copied!

`public inteterface TaskRepository {
  Task findById(Long taksId);

  void save(Task task);
}`

DomainService内では、このように呼び出し方と、戻りの型だけ定義していて、永続化先は明言していません。 *「永続化先はどこでもいいけど、こういう風に検索・保存するから実装クラスはこれに合わせてね」* という形で宣言するわけですね。ApplicationServiceはTaskRepository型で定義しておいて、あとは[DI(依存性の注入)](https://ja.wikipedia.org/wiki/%E4%BE%9D%E5%AD%98%E6%80%A7%E3%81%AE%E6%B3%A8%E5%85%A5)などの仕組みで実クラスが実行時に判断されるようにするのです。

これで、永続化先がRDBからDynamoに差し替えたい場合も、実装クラスを別のものを用意すれば、DomainModel, DomainService, ApplicationServiceいずれも一切修正しなくて良い設計になります。素晴らしいですね。

メリットとしては、実装クラスの差し替えが容易になるだけではなく、業務を表現するモデルにローレベルなコードが入らなくなるので、読みやすくなりメンテナンス性が上がる、ということもあります。

## 丸型で表現する意味

前述の図では、レイヤードアーキテクチャとの比較のためにフラットにレイヤを表現しましたが、「オニオン」と名がつくだけあって丸型に表現される方が元の定義になります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F1a309b15-d1d9-0829-8456-92ab11ba50cb.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=713736ac7330725fd4028a42d52ee72f)

ではこの丸型は何を意味しているのでしょうか？

これは、 ***アプリケーションとその外側に境界があり、その間はアダプターを通じて通信する*** というモデルを表現しています。(矢印はリクエストの向きを表現しています。それぞれが逆向きにレスポンスを受けます)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F18f36be6-c6b7-d99c-c7cb-63f1ec443a28.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=57c3f9fef4be5bf464b6ca55136376fe)

例えば、あるHttpClientからのリクエストの場合はまず専用のAdapterで受け、アプリケーションがなんらかの処理を行い、必要に応じてDBから情報取得を行い、アプリケーションがDBのレスポンスを加工してHttpClientのレスポンスとして返します。

結合テストの場合も専用のAdapterからリクエストを受けてアプリケーションで処理をするのですが、その場合はDBをMockDB(インメモリなど)に差し替えることも可能です。

このモデルのメリットは、 ***DomainModel、Applicationが常に独立した形で書け、その単位で品質保証をすることができるということ*** です。
外部からはApplicationが許可したメソッドでしか呼び出せないので、Apllicationが自動テストで品質保証されていれば、それを呼び出すクライアントはなんであろうとApplicationがおかしな挙動することはない、と考えることができます。この安心感は非常に大きいものです。

## テスト戦略

ここは各プロジェクトの方針によるものだと思いますが、私個人的にはApplicationServiceに対する結合テストのみ実装するのが最低限、という方針が一番費用対効果がよいと思っています。

また、DDDではリファクタリングをしてモデルを成熟させていくことを重視するのですが、ApplicationSericeというある程度大きな粒度でのテストにしておいたほうが、内部を自由にリファクタがしやすいという利点もあります。あまりクラス単位で細かくテストすると、リファクタ時にクラスごとなくなったりとリファクタする気が重くなり、結果リファクタしなくなる、という力学が働くことがあります。

前述の通り、ApplicationService単位でテストしておくとかなり品質は安心感が持てます。テスト戦略を検討の際には参考に指定だければと思います。

## あれ、この形って

おっと、そして最後のAdapterのは何かに似ているような・・・そう、ヘキサゴナルアーキテクチャです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F7e133df6-2b84-d6f6-e09e-75a1182eec0b.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=61ddbd2b564aca658bf39cd9eb605016)

[ドメイン駆動設計で実装を始めるのに一番とっつきやすいアーキテクチャは何か](http://little-hands.hatenablog.com/entry/2017/10/04/231743)の記事で紹介したヘキサゴナルアーキテクチャのモデル図

そうなんです、このアプリケーションと外界をアダプターでつなぐという発想はヘキサゴナルのものをそのまま使っているのです。結局、このヘキサゴナルの思想がとても優れているのですよね。

オニオンアーキテクチャは、Applicationの内部のレイヤを少し細かくして、Adapterの種類を明示して全体的に少し具体的になっただけなのです。

この記事の冒頭で書いた通り、「あれ、結局ヘキサゴナルじゃん」となっていただけましたか？笑

## まとめ

さて、オニオンアーキテクチャの魅力と実装イメージは伝わったでしょうか？ここまでがイメージできれば、あとは細かい話を必要都度参照していけば少しずつ進めていけると思います。

今後はより細かい話を書いていこうと思いますので、またよろしければお付き合いください。

### もっと詳しく知りたい方は

初めてDDDを学ぶ方、もしくは実際に着手して難しさにぶつかっている方向けの書籍を出しました。

[ドメイン駆動設計 モデリング/実装ガイド](https://little-hands.booth.pm/items/1835632)

迷子になりがちな「DDDの目的」や「モデル」の解説からはじめ、
具体的なモデリングを行い実装まで落とす事例を元に、DDDの魅力や効果を体感することを目指します。

この本の「第5章 アーキテクチャ」では、この記事の内容をさらに詳細に解説しています。よろしければお求めください。

Twitterでも、DDDに関して発信したり、「質問箱」というサービスを通じて質問を受け付けています。こちらもよろしければフォローしてください。

[@little_hand_s](https://twitter.com/little_hand_s)