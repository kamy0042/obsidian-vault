---
Created: 2021-01-15T18:12:00
URL: https://onk.hatenablog.jp/entry/2020/11/11/024531
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
[設計ナイト2020](https://kichijojipm.connpass.com/event/191220/) を受けて、今どんな[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)を選ぶべきかという話をしたくなったのだ。

[kichijojipm.connpass.com](https://kichijojipm.connpass.com/event/191220/)

## お前誰よ

- 2000年代前半に SI
- 2000年代後半にブログ、[SNS](http://d.hatena.ne.jp/keyword/SNS)
- 2010年代に[ソーシャルゲーム](http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B7%A5%E3%A5%EB%A5%B2%A1%BC%A5%E0)
- [2020年代](http://d.hatena.ne.jp/keyword/2020%C7%AF%C2%E5)に [UGC](http://d.hatena.ne.jp/keyword/UGC) サービス

をやってきた人間。数百万〜数億行のデータ、月間数千万〜数十億 imp 程度を主戦場にしています。

## 今日の話

- DDD と PofEAA から学ぶパターン/[アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3)
- [Rails](http://d.hatena.ne.jp/keyword/Rails) によって発見された、密結合で速く走れるソフトウェア
- 今求められている[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)

昂ぶって 15,000 字ぐらい書いてしまった。

## DDD と PofEAA から学ぶパターン/[アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3)

![](https://m.media-amazon.com/images/I/6181Uutb1tL._SL160_.jpg)

[エリック・エヴァンスのドメイン駆動設計](https://www.amazon.co.jp/exec/obidos/ASIN/B00GRKD6XU/hatena-blog-22/)

- 作者:[Eric Evans](http://d.hatena.ne.jp/keyword/Eric%20Evans)
- 発売日: 2013/11/20
- メディア: [Kindle](http://d.hatena.ne.jp/keyword/Kindle)版

DDD も PofEAA も 2002 年出版だけど、ほとんど今でも通用する話なので、まずココを出発点とするのが良い。

### 利口な UI (Smart UI) [アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3)

- エリック・[エヴァ](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F4%A5%A1)ンスの[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)駆動設計に書いてある
- KENT WEB 時代ぐらいの [Perl](http://d.hatena.ne.jp/keyword/Perl) や [PHP](http://d.hatena.ne.jp/keyword/PHP) の [CGI](http://d.hatena.ne.jp/keyword/CGI) を思い出すと良いはず
- 画面ごとの .[cgi](http://d.hatena.ne.jp/keyword/cgi) ファイルに、上の方にデータロードのコードが、下の方に UI のコードが書いてある。何なら混ざり合ってる
- もちろん良いこともある
- 画面ごとに分かれているので、影響が局所化される

[minekoa.hatenadiary.org](https://minekoa.hatenadiary.org/entry/20100116/1263657955)

### これを少し改善したものが [トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/o/onk/20201111/20201111020809.png)

- 分かりやすいのは ISUCON のコード
- template とは分離された、依然として手続き的なコード
- 各 Action 間でのコピペは引き続き横行している

### PofEAA でのデータソースの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)に関するパターン

![](https://m.media-amazon.com/images/I/41Tz5dLB7dL._SL160_.jpg)

[エンタープライズアプリケーションアーキテクチャパターン](https://www.amazon.co.jp/exec/obidos/ASIN/B01B5MX2O2/hatena-blog-22/)

- 作者:[マーチン・ファウラー](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%C1%A5%F3%A1%A6%A5%D5%A5%A1%A5%A6%A5%E9%A1%BC)
- 発売日: 2016/02/19
- メディア: [Kindle](http://d.hatena.ne.jp/keyword/Kindle)版

第10章 データソースの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)に関するパターン

### [テーブルデータゲートウェイ](https://bliki-ja.github.io/pofeaa/TableDataGateway/)

[https://bliki-ja.github.io/pofeaa/TableDataGateway/](https://bliki-ja.github.io/pofeaa/TableDataGateway/)

> SIにいた人なら「ダオ」のほうが通りが良いのではと思います。テーブルデータゲートウェイなんて現場で聞いたことが無いより良いトランザクションスクリプトを目指す - enrike3のブログ

- ほぼ Table 単位
- すべての [CRUD](http://d.hatena.ne.jp/keyword/CRUD) はこの[ゲートウェイ](http://d.hatena.ne.jp/keyword/%A5%B2%A1%BC%A5%C8%A5%A6%A5%A7%A5%A4)を通る
- [SQL](http://d.hatena.ne.jp/keyword/SQL) や、クエリビルダの組み立てが書かれるクラス

### [行データゲートウェイ](https://bliki-ja.github.io/pofeaa/RowDataGateway/)

[https://bliki-ja.github.io/pofeaa/RowDataGateway/](https://bliki-ja.github.io/pofeaa/RowDataGateway/)

- 行単位の[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)
- insert/update/delete は行[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)自身が知っている
- アクティブレコードパターンと類似しているが、アクティブレコードパターンは何らかの[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)ロジックもレコードに持たせるところが違う。行データ[ゲートウェイ](http://d.hatena.ne.jp/keyword/%A5%B2%A1%BC%A5%C8%A5%A6%A5%A7%A5%A4)はただの[ゲートウェイ](http://d.hatena.ne.jp/keyword/%A5%B2%A1%BC%A5%C8%A5%A6%A5%A7%A5%A4)

> 私は、トランザクションスクリプトを使用する場合に、行データゲートウェイを使用する頻度が最も高い。この場合、行データゲートウェイでデータベースアクセスコードを適切に抜き出し、別のトランザクションスクリプトで容易に再使用できるようにする。
私は、ドメインモデルを使用する場合には行データゲートウェイを使用しない。シンプルなマッピングを実行する場合には、コードレイヤを追加しなくても、アクティブレコードが同じ役割を果たす。...トランザクションスクリプトを行データゲートウェイとともに使用する場合、複数のスクリプトで繰り返されるビジネスロジックこそが、行データゲートウェイに必要なロジックであることがわかるだろう。ロジックを移動することによって、行データゲートウェイは段階的にアクティブレコードへと変化し、ビジネスロジックの重複を軽減する効果をもたらす。(PofEAA より

### [アクティブレコード](https://bliki-ja.github.io/pofeaa/ActiveRecord/)

[https://bliki-ja.github.io/pofeaa/ActiveRecord/](https://bliki-ja.github.io/pofeaa/ActiveRecord/)

- 行データ[ゲートウェイ](http://d.hatena.ne.jp/keyword/%A5%B2%A1%BC%A5%C8%A5%A6%A5%A7%A5%A4)のところで書いた通り、[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)からロジックを[ゲートウェイ](http://d.hatena.ne.jp/keyword/%A5%B2%A1%BC%A5%C8%A5%A6%A5%A7%A5%A4)自身に持たせたら [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) パターンになる

### [データマッパー](https://bliki-ja.github.io/pofeaa/DataMapper/)

[https://bliki-ja.github.io/pofeaa/DataMapper/](https://bliki-ja.github.io/pofeaa/DataMapper/)

- レイヤー化しようと思うとデータマッパーパターンになりがち
- だけど、密結合してエイッてやるともっと楽だよというのが [Rails](http://d.hatena.ne.jp/keyword/Rails) が示した道 (後述
- 各レイヤー間を[疎結合](http://d.hatena.ne.jp/keyword/%C1%C2%B7%EB%B9%E7)にしようとすると [DTO](http://d.hatena.ne.jp/keyword/DTO) による詰め直しが必要になる
- [データ転送オブジェクト](https://bliki-ja.github.io/pofeaa/DataTransferObject/)

この辺りは一昔前 (2000年代前半) に [SSH](http://d.hatena.ne.jp/keyword/SSH) ([Struts](http://d.hatena.ne.jp/keyword/Struts), Spring, [Hibernate](http://d.hatena.ne.jp/keyword/Hibernate)) [アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)が流行っていた頃を思い出す。[Hibernate](http://d.hatena.ne.jp/keyword/Hibernate) は二次キャッシュで DB アクセスを隠蔽して、例えば

```plain text
# 概念コード
my $entry_1 = EntryRepository->find_all_by_author_id(author_id => 1)->[0]
my $entry_2 = EntryRepository->find_by_id(id => 2)

```

で読み込む `$entry_1`, `$entry_2` はメモリ上も同じ[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)であるべきという考え方で、片方に変更を加えると (同じ[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)であるので) もう片方にも影響する。

- 同じデータなんだから 1 つなのは当然だし、レースコンディションも絶対に発生しない
- DB からロード済みだと [SQL](http://d.hatena.ne.jp/keyword/SQL) は発行しない (Identity Map を持つ)、というのをデータマッパー上でできるので、うまく使うとパフォーマンスが向上する
- 我々の道具で言うと [Apollo Client](https://www.apollographql.com/apollo-client) のキャッシュに似たイメージ

PofEAA や DDD で語られたパターンの詳しい話は texta.fm で [id:t-wada](http://blog.hatena.ne.jp/t-wada/) と [id:Yasaichi](http://blog.hatena.ne.jp/Yasaichi/) が話しているのでぜひ聞いてください！

![](https://cdn.profile-image.st-hatena.com/users/t-wada/profile.png)

![](https://cdn.profile-image.st-hatena.com/users/Yasaichi/profile.png)

[anchor.fm](https://anchor.fm/textafm/episodes/1--Software-Development-in-2003-eimq17)

### 話は[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)に戻る

- Smart UI パターンよりモデル化していきやすいので、何らかのコードを[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)に抜き出すのは推奨されている
- どういうレイヤー分けを行うかは正解がない

> トランザクションスクリプトをどこに置くかは、レイヤをどのように体系化するかによって異なる。...トランザクションスクリプトを複数のクラスに体系化する方法は2つある。
最も一般的な方法は、複数のトランザクションスクリプトを1つのクラスに入れ、各クラスが関連するトランザクションスクリプトの対象エリアを定義する方法である。この方法は最も簡単で一般的な手法である。
もう1つの方法は、トランザクションスクリプトごとに独自のクラスを持たせ、「コマンドパターン」を使うというものだ。(PofEAA より

- 何もレイヤー化しないときはすべてを Controller に書く
- Fat Controller, Skinny Model
- むしろモデルは存在しなくてデータソースだけの場合もある
- ISUCON のコードでよく見るパターン
- 最も一般的な方法＝テーブル単位でクラスを作ること
- 一番分かりやすい分離ポイント
- なんだけど、元々は[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)境界を置くから[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)という名前にしているのに、このパターンだとテーブルをまたぐ処理に弱い
- もう一つの方法＝`<動詞>Service`
- [機能名ごとに作る](https://speakerdeck.com/hitode909/perlfalseshang-nimosan-nian-zututoiketerusabisuwozuo-risok-keruji-shu#101)
- [似非サービスクラスの殺し方 / \#ginzarb - Speaker Deck](https://speakerdeck.com/joker1007/number-ginzarb)

### [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)ロジックを構築する方法 3 種類

[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)ロジックを構築する方法は以下の 3 つが PofEAA に書かれている。(第2章 [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)ロジックの構築)

- [トランザクションスクリプト](https://bliki-ja.github.io/pofeaa/TransactionScript/)
- [テーブルモジュール](https://bliki-ja.github.io/pofeaa/TableModule/)
- [ドメインモデル](https://bliki-ja.github.io/pofeaa/DomainModel/)

それぞれのコストはこう図示される

![](https://cdn-ak.f.st-hatena.com/images/fotolife/o/onk/20201110/20201110231849.png)

- ここで[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)があるとテーブルモジュール/[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデルは作るのが非常に簡単になるので初期コストが下がる
- 例えば [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord)
- 集合をファーストクラスコレクションとして表現したもの＝テーブルモジュールという理解をしています
- この 3 つに実装上の差があるかというと無いというのが [id:onk](http://blog.hatena.ne.jp/onk/) の考えで、結局 PofEAA にはレールは無い
![](https://cdn.profile-image.st-hatena.com/users/onk/profile.png)
- もちろん考え方のベースは違う
- [トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)的な考えをしているとモデルに問い合わせずに if 文で処理する発想になりがち
- [ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)(アクション)中心にオブジェクト(メソッド)を組み立てるのが[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)で、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトを中心にオブジェクトを組み立てるのが[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデル[いまさらきけない「ドメインモデル」と「トランザクションスクリプト」 - higayasuo’s blog](https://higayasuo.hatenablog.com/entry/20080519/1211183826)
- ただ、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の考え方を用いてどんどんモデル化することでコードを進化させていく、という行為は、入り口がどれでも同じ
- また、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトを抽出しても手続き的なコードも必要になる。

> ドメインで扱う概念の中には、1つの機能や処理が単体で存在していて、もの（オブジェクト）として扱うのが不自然なものもある。そうしたものは、サービスという形でユビキタス言語に組み込む。サービスは基本的に状態をもたない（stateless）。[ 技術講座 ] Domain-Driven Designのエッセンス 第2回｜オブジェクトの広場

> ドメインにおける重要なプロセスや変換処理が、エンティティや値オブジェクトの自然な責務でない場合は、その操作は、サービスとして宣言される独立したインターフェイスとしてモデルに追加すること。モデルの言語を用いてインターフェイスを定義し、操作名が必ずユビキタス言語の一部になるようにすること。サービスには状態を持たせないこと。...このコードを見てもらうと、"なんだ ドメインモデルを入出力にとる関数じゃないか" と思うでしょう。そのとおりです。混乱しがちなサービスという概念について - かとじゅんの技術日誌

### ここまでのまとめ

- もっともコピペが横行していて、その分労働集約的に並列作業できる、他には影響を与えずに改修できるのが Smart UI パターン
- データロードと Template を分離する[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)
- まずは ISUCON コードを思い浮かべると良い
- 各 Action の中を設計しようと思うと、無限の可能性が広がっている。実装のレールは (PofEAA には) 無い
- データと振る舞いを 1 箇所に集めようとしているのが「[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)」
- [トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)からでも[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の考え方で育てていける

はい。まだ 1/3 ぐらいだよ！

## [Rails](http://d.hatena.ne.jp/keyword/Rails) によって発見された、密結合で速く走れるソフトウェア

> 和田：Ruby on Rails自身は疎結合の設計に対してNoを言っている。密結合にすることによって疎結合な設計以上の開発スピードが生まれる。少なくともスタートアップ企業にとってスピードは本当にクリティカルな力なので、もし密結合の状態でも速く走れるソフトウェアの構造があるのであれば、それはゆっくり安定して継続的に歩いていく疎結合のソフトウェア設計より強いということをRailsはある程度証明していたわけですね。そしていま、その構造のまま大きくなるとすごく大変になるということも証明している。マニアが潰したテスト駆動開発〜『健全なビジネスの継続的成長のためには健全なコードが必要だ』対談 （５） | by Takeshi Kakeda | 時を超えたプログラミングの道

DHH がどのように密結合を作り上げていったのか、については以下のスライドが詳しい。

[speakerdeck.com](https://speakerdeck.com/yasaichi/what-is-ruby-on-rails-and-how-to-deal-with-it)

> RESTful ルーティングと ActiveRecord パターンによって、URL で表されるリソースから DB 上のテーブルまでが密結合する構造を作ったActiveRecord パターンとその Validations/Callbacks によって、ビジネスロジックとその組み立て処理を全て Model に書けるようにした

この密結合は、間違いなく最速の設計技法である。じゃないとあんなにスタートアップ界隈で採用されなかったし、十分にワークすることは歴史が証明している。

[Rails](http://d.hatena.ne.jp/keyword/Rails) の [MVC](http://d.hatena.ne.jp/keyword/MVC) が標準となっていった歴史は最近だと[ここ](https://zenn.dev/koduki/articles/c07db4179bb7b86086a1#ajax%E3%81%AE%E7%99%BB%E5%A0%B4%E3%81%A8%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%AA%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%B3%E3%81%B8%E3%81%AE%E5%9B%9E%E5%B8%B0)でも語られている。

> この頃に同時に起こったのがRuby on Railsに代表されるLLの躍進とそれに伴うテンプレートエンジンの簡素化です。これによりASP.NETやJSFは所謂Web界隈と呼ばれるようなコンシューマよりへの拡大はもちろん、主戦場であるエンタープライズ領域すらLL言語にフロントエンド系を中心に浸食されていきました。またこれらのFWは細かい理由は知りませんが結果的にコンポーネント指向ではなく、シンプルなMVC Model 2を採用しておりテンプレートエンジンはループや条件分岐、変数をバインディングしたりレイアウトを作れる程度の簡素なものでイベントドリブンなどは採用さていません。一部、ClickやWicketなんかは採用していましたが、まあ普及していませんし？WASMとRustはVue.js/React.jsを打倒するのか？ - JSへの侵略の歴史

僕の感覚としても、シンプルに [Rails](http://d.hatena.ne.jp/keyword/Rails) をベースラインにしていると幸せ。

- [Rails](http://d.hatena.ne.jp/keyword/Rails) の [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) パターンは設計が揃いやすい
- すべてのコードが Model への [CRUD](http://d.hatena.ne.jp/keyword/CRUD) 操作を中心に整理され、テーブルと 1:1 に紐付いた Model, View, Controller だけがあるのが [Rails](http://d.hatena.ne.jp/keyword/Rails) というレール
- 一本筋が通っていることで楽になる
- [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)がある v.s. [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)がない
- [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) は行データ[ゲートウェイ](http://d.hatena.ne.jp/keyword/%A5%B2%A1%BC%A5%C8%A5%A6%A5%A7%A5%A4)ではなく[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)である
- [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)ロジックが書かれる
- ロジックが無くなり DAO として扱われると、[ドメインモデル貧血症](https://bliki-ja.github.io/AnemicDomainModel/) に陥る
- [Life is beautiful: Ruby on Railsの「えせMVC」の弊害](https://satoshi.blogs.com/life/2009/10/rails_mvc.html)
- 手続き的なコードが必要になることがある、とは言ったが、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデルを作らずにサービスを作ってはいけない

> このコードを見てもらうと、"なんだ ドメインモデルを入出力にとる関数じゃないか" と思うでしょう。そのとおりです。最初はその程度の認識でよいと思いますが、ここで一点だけいいたいのは、乱用は禁止ということです。...従属するエンティティや値オブジェクトがないということで早期あきらめてしまい、なんでもかんでもドメインサービスにするというのもの違うのです。後者の場合は、振る舞いがあるべきドメインモデルから振る舞いを奪うことになるので、ドメインモデル貧血症の温床になる可能性があるのです。混乱しがちなサービスという概念について - かとじゅんの技術日誌

### 素朴な密結合 [MVC](http://d.hatena.ne.jp/keyword/MVC) では限界がある

[Rails](http://d.hatena.ne.jp/keyword/Rails) は最速ではあるが、「その構造のまま大きくなるとすごく大変になる」[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)でもある。

素朴な [MVC](http://d.hatena.ne.jp/keyword/MVC) では限界があるというのを皆が発表している。

ただ僕の体感としては、複雑なのはごく一部 (10%程度) で、ほとんどの要件はシンプルに扱える。

複雑さをベースにした[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)は不当に難しい。シンプルな要件のときに大仰に見せたくないので、複雑なところは例外的に見えるような[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)であると良い。

### 本当に複雑なものと、複雑ではあるが工夫で対処できるもの

[ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) を前提として、解決方法はいくつも語られてきた

また、「アプリケーションサービス」はよく導入される（が、間違えやすい）

- [俺が悪かった。素直に間違いを認めるから、もうサービスクラスとか作るのは止めてくれ - Qiita](https://qiita.com/joker1007/items/25de535cd8bb2857a685)
- [似非サービスクラスの殺し方 / \#ginzarb - Speaker Deck](https://speakerdeck.com/joker1007/number-ginzarb)

[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)の延長にあるこの Service クラス (コマンドパターン) で戦う方法がよく採られている。

### 間違えないように Operation に持って行く＝Trailblazer

> そもそものはじまりは、作者のNick Sutterer氏がRailsのMVC抽象レイヤーのあり方に疑問を持ったこと。Railsの手軽さを認める一方、ModelやControllerの肥大カオス化により、のちの保守性が下がることを問題視されたそうです（Nickさんの本意訳）。TrailBlazer概要まとめてみた - Qiita

概要は [Rails のアーキテクチャ設計を考える - Qiita](https://qiita.com/kbaba1001/items/e265ad1e40f238931468) を読むと掴みやすいかもしれない。

[Trailblazer: Operation Overview](https://trailblazer.to/2.0/gems/operation/2.0/index.html)

- Model の validation に当たるものを `contract` に持っていく
- [契約による設計](https://speakerdeck.com/hitode909/perlfalseshang-nimosan-nian-zututoiketerusabisuwozuo-risok-keruji-shu?slide=117) と同じ語彙
- Operation の中身は本質的に手続き的なものなので `step` で処理する
- このときに step の連続である＝state を持っている、という点も扱いやすさに繋がっている
- クラスメソッドではなく、[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)を作って状態を持つと楽になる、というのが PofEAA でも語られている。

> この手法のメリットは、スクリプトのインスタンスを実行時にオブジェクトとして扱える点であるが、トランザクションスクリプトを使ってドメインロジックを体系化するようなシステムでは、このメリットを活かす必要性はほとんどない。もちろん多くの言語では、クラスを完全に無視してグローバル関数だけを使うこともできる。しかし、新たなオブジェクトをインスタンス化することでスレッドの問題が解決できる場合もある。データの分離が簡単になるからだ。(PofEAA より

### 間違えないように Interactor に持って行く＝Hanami(＝Clean Architecture)

> Hanami is based on two principles: Clean Architecture and Monolith First.Architecture: Overview | Hanami Guides

[Architecture: Interactors | Hanami Guides](https://guides.hanamirb.org/architecture/interactors/)

Overview の次に Interactors の章が置かれる程度には Interactor が主軸な[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)。

Interactor も Operation と同じく `initialize` と `call` のみを持つクラスである。[Iterator](http://d.hatena.ne.jp/keyword/Iterator) の考え方は [HanamiはRubyの救世主(メシア)となるか、愚かな星と散るのか](https://magazine.rubyist.net/articles/0056/0056-hanami.html) を読むと良いかな。

### イマ[イチ流](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C1%CE%AE)行らなかった [rectify](https://github.com/andypike/rectify)

[https://github.com/andypike/rectify](https://github.com/andypike/rectify)

- FormObject, Command パターンがあるのはもう前提として、僕は書き味の話をしたい！
- Controller が Controller に必要な本質だけを追究できる世界

Controller に必要な本質は、これも PofEAA に書かれている。

> ドメインロジックの扱いで最も難しいのは、人々が思っているように、何がドメインロジックで何が他のロジックかを見極めることだろう。私が好きな非公式のテストは、Webアプリケーションにコマンドラインインタフェースを追加するときのように、まったく異なるレイヤをアプリケーションに追加することを想像するというものである。この追加を行うときに機能を複製する必要があれば、それはドメインロジックがプレゼンテーションの中にはみ出していることを示している。(PofEAA より

Web アプリケーションとしてのインタフェース (View 以外) が Controller の役目で、「同機能の [CUI](http://d.hatena.ne.jp/keyword/CUI) コマンドを作るときに重複が無い」という基準で考えると良い。

rectify を使ったときの Controller は

```plain text
def create
  @form = RegistrationForm.from_params(params)

  RegisterAccount.call(@form) do
    on(:ok)      { redirect_to dashboard_path }
    on(:invalid) { render :new }
    on(:already_registered) { redirect_to login_path }
  end
end

```

と、[ビジネスロジック](http://d.hatena.ne.jp/keyword/%A5%D3%A5%B8%A5%CD%A5%B9%A5%ED%A5%B8%A5%C3%A5%AF)で起きたイベントを `on` で捕捉して、redirect や render を行う。これは [CUI](http://d.hatena.ne.jp/keyword/CUI) にするときにまったく重複しないまさしく Controller の役目だし、見た目も美しい。

とまぁ僕は好きなんだけど、ガッツリ実務で使ったわけではないので見た目の美しさにのみ囚われている可能性はある。

### いずれも **Controller or Action と 1:1 対応する新しい層** という考え方

- つまりいずれも CQS に行き着いている
- [サービスクラスについては僕も悪かったと思っているけど、それでもCQSは実現したいんだ - Qiita](https://qiita.com/a-suenami/items/8897e2e36fe2836c6949)
- なお [id:onk](http://blog.hatena.ne.jp/onk/) の 2017 年当時の意見は FormObject (ActiveModel::Model や Reform) のみ導入すれば十分、です
![](https://cdn.profile-image.st-hatena.com/users/onk/profile.png)
- [複雑なことをしない](https://www.slideshare.net/takafumionaka/rails-77195340/59)
- 素の [Rails](http://d.hatena.ne.jp/keyword/Rails) で 90% の[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)に対応している
- FormObject で残り 10% のうちの 8-9 割に対応できる
- つまり最後 1-2% の問題だけが本質的に複雑で、Command パターンが必要になる複雑性を持っている部分
- 全体の 1-2% を対象とした特殊な場合なので、この複雑性をベースにした[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)にすべきではない

### 本当に複雑なもの

以上、だいたいのことは工夫で解決できる程度の複雑性、と置いた。じゃあ本当に複雑なものは何かというと、SoR だろうと思う。

- [System of Record と System of Engagement - Speaker Deck](https://speakerdeck.com/naoya/system-of-record-to-system-of-engagement)
- [バイモーダルITとは何か？ 企業がITの「2つの流儀」を使い分ける方法 小野和俊 「次世代IT企業」への道｜ビジネス+IT](https://www.sbbit.jp/article/cont1/34971)
- [わたしのバイモーダル戦略 : 小野和俊のブログ](http://blog.livedoor.jp/lalha/archives/50524676.html)

ただ僕の目には [SoE](http://d.hatena.ne.jp/keyword/SoE)＝モード2 で十分なものがほとんどに見えている。

バランスを欠いていたと [id:naoya](http://blog.hatena.ne.jp/naoya/) は振り返っているが、p20 の表にあるようなシステム領域はあまり普段の開発＝[イテレーション](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C6%A5%EC%A1%BC%A5%B7%A5%E7%A5%F3)を回しながら不確実性に対処していく中には出てこないので、だいたい [SoE](http://d.hatena.ne.jp/keyword/SoE) と捉えていくのが Web アプリケーション開発の実情じゃないかな。

![](https://cdn.profile-image.st-hatena.com/users/naoya/profile.png)

## 今求められている[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)

[SoE](http://d.hatena.ne.jp/keyword/SoE) の戦場はクライアント側に移っている。

> ビジネスにおいて、(ネイティブ or Web SPA) クライアントの UX が必須な時代なので、 API 開発の手綱もサーバからクライアントに移していくような流れが生まれていますGraphQL も BFF も、クライアント側で制御していこうという発想


新しい概念「クエリ」を入れたのが GraphQL。クライアントはともかく、サーバは新規開発になるクライアントごとの中間レイヤーを作ろうというのが BFF。途中からでも導入しやすいThe NEXT of REST - onk.ninja

[【エンジニアブログ】ダイニーのエンジニアリング3カ条｜dinii（ダイニー）公式｜note](https://note.com/dinii/n/n9be778bd7da3) では [Hasura](https://hasura.io/) を用いると GraphQL の query 側はほとんど開発が要らないという話をしている。

[「フロントエンド領域」を再定義する - Speaker Deck](https://speakerdeck.com/mizchi/hurontoendoling-yu-wozai-ding-yi-suru#36) でもフロントエンジニアの領域がサーバ側に広がっている。 GraphQL や BFF をフロントエンジニアが扱うことで、ブラウザがバックエンドからデータを取得する、データソースの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)はフロントエンジニアのものになった。

> プレゼンテーション優位な技術駆動アーキテクチャを選択する場合は、むしろ立派な実装パターンであると言える。

> 「DDDのスマートUIアンチパターン」もSoEの目的に合わせて使えばデザインパターンになる

という話をしている。

まさに Smart UI パターンは再評価されるポイントに来ている。クライアントが、表示の都合でクエリを都度書く世界になった。

- フロントエンドでは[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の作り方が確立されている
- データマッパーは [Apollo](http://d.hatena.ne.jp/keyword/Apollo) Client のキャッシュが上手いことやってくれる

ので、Smart UI の痛みも少なく実装することができる。

そしてバックエンドは、[SoE](http://d.hatena.ne.jp/keyword/SoE) では [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) で表現できないほど複雑な「[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)」は無いと位置づけて良く、サーバサイドの仕事は GraphQL の schema を提供したら loader を考えるだけの仕事になっている、というのがｲﾏｺｺです。

(誤解がありそうなのでちょっとだけ言っておくと、GraphQL の schema を考える仕事は RESTful [API](http://d.hatena.ne.jp/keyword/API) の schema を考える仕事とほとんど変わんない感覚です。「DB を露出している」と捉えるのは筋違いかな)

### Mutation 側は？

Mutation はアプリケーションサービスと非常に親和性が高く、コマンドパターンの Service クラスを無思考で作ってしまいがち。

ただ今までの話であったように、安易に Service に全てを押し込めると[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデル貧血症に陥ります。[ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) の機能をちゃんと使って、適切に validation, callback を使った上で、それでも複雑だから Service クラスが必要になったというのが歴史です。まずは[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)的に育てることを忘れないでください。

シンプルな Muation はシンプルに扱える。もしナイーブに実装し過ぎたとしても、改善方法が確立されているので大丈夫。

![](https://m.media-amazon.com/images/I/5112hfXmhtL._SL160_.jpg)

[オブジェクト指向設計実践ガイド　～Rubyでわかる 進化しつづける柔軟なアプリケーションの育て方](https://www.amazon.co.jp/exec/obidos/ASIN/B01L8SEVYI/hatena-blog-22/)

- 作者:[Sandi Metz](http://d.hatena.ne.jp/keyword/Sandi%20Metz)
- 発売日: 2016/09/02
- メディア: [Kindle](http://d.hatena.ne.jp/keyword/Kindle)版

## なんか言及する隙が無かったものあれこれ

- [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)の抽出、実装方法
- クリーン[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)
- Event Sourcing
- 本当に複雑なものであると気づくキッカケ
- [モノリス](http://d.hatena.ne.jp/keyword/%A5%E2%A5%CE%A5%EA%A5%B9)とマイクロサービス
- [1](about:blank#ipfootnote0):複雑さは色んな指標があると思うけど、雑な一つの基準として、100 テーブル以内ぐらいだと考えると良いと思う
1. [Rails](http://d.hatena.ne.jp/keyword/Rails) は少人数スタートアップで小〜中規模 なアプリケーションを作るために最適化された[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)なので、ギャップはある。