---
Created: 2021-01-15T20:18:00
URL: https://www.izumisy.work/entry/2019/09/16/231734
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
自分が本格的に設計を意識するようになったのは、2015年の夏に現職であるFringe81株式会社で開催されていたサマー[インターン](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3)に参加してからだ。

設計はまさに Connecting the dots そのものだ。多くを知れば知るほど、アプリケーション開発において遭遇する問題に対しての適切な解決策が思いつく。知識としての設計だけでは不十分だが、知識がなければ設計はできない。そして、知識をつけるためにはこれまでの様々なソフトウェア・エンジニアが書き残してきた書物を読むことが一番だ。

### [オブジェクト指向設計](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE%C0%DF%B7%D7)実践ガイド

![](https://images-fe.ssl-images-amazon.com/images/I/51-TCt0H4UL._SL160_.jpg)

[オブジェクト指向設計実践ガイド ~Rubyでわかる 進化しつづける柔軟なアプリケーションの育て方](http://www.amazon.co.jp/exec/obidos/ASIN/477418361X/izumisy-22/)

- 作者: Sandi Metz,?山泰基
- 出版社/メーカー: [技術評論社](http://d.hatena.ne.jp/keyword/%B5%BB%BD%D1%C9%BE%CF%C0%BC%D2)
- 発売日: 2016/09/02
- メディア: 大型本
- [この商品を含むブログ (6件) を見る](http://d.hatena.ne.jp/asin/477418361X/izumisy-22)

この本は現時点で僕にとってのアプリケーション設計のバイブル。具体的な実装レベルで設計を学べる本といえば、特にこれだ。

これまで僕にとっての[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)はとても捉えどころのない概念だった。インターネットで検索をすると、大抵動物や車の例えと[Java](http://d.hatena.ne.jp/keyword/Java)のコード例が現れ、結局[OOP](http://d.hatena.ne.jp/keyword/OOP)がどのようなケースで有用なのか、という根本的なメリットがあまり明示されないケースが多い。

一方で、この「[オブジェクト指向設計](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE%C0%DF%B7%D7)実践ガイド」はどちらかといえば大学の授業で学ぶような雰囲気を避け、アプリケーション開発とスケーラビリティを意識した実践的な内容の[OOP](http://d.hatena.ne.jp/keyword/OOP)を、[Ruby](http://d.hatena.ne.jp/keyword/Ruby)という比較的とっつきやすい言語と共に紹介する。一般的な[OOP](http://d.hatena.ne.jp/keyword/OOP)のサンプルは[Java](http://d.hatena.ne.jp/keyword/Java)が多い印象があるが、その中で[Ruby](http://d.hatena.ne.jp/keyword/Ruby)を使って[OOP](http://d.hatena.ne.jp/keyword/OOP)を学ぶこの本は圧倒的に分かりやすい。

敢えて[Ruby](http://d.hatena.ne.jp/keyword/Ruby)を使っているのかは分からないが、動的型付言語をサンプルコードとして使うことで、[Java](http://d.hatena.ne.jp/keyword/Java)や[Golang](http://d.hatena.ne.jp/keyword/Golang)の[インターフェイス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%D5%A5%A7%A5%A4%A5%B9)がなぜ便利なのか、という点の理解がより深まってくる。一方で、言語仕様としての[インターフェイス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%D5%A5%A7%A5%A4%A5%B9)を持たない動的型付言語のダックタイピングの柔軟さも理解が深まる。

### Clean Architecture

![](https://images-fe.ssl-images-amazon.com/images/I/51LkcwTMC8L._SL160_.jpg)

[Clean Architecture 達人に学ぶソフトウェアの構造と設計](http://www.amazon.co.jp/exec/obidos/ASIN/4048930656/izumisy-22/)

- 作者: Robert C.Martin,[角征典](http://d.hatena.ne.jp/keyword/%B3%D1%C0%AC%C5%B5),高木正弘
- 出版社/メーカー: [KADOKAWA](http://d.hatena.ne.jp/keyword/KADOKAWA)
- 発売日: 2018/07/27
- メディア: 単行本
- [この商品を含むブログを見る](http://d.hatena.ne.jp/asin/4048930656/izumisy-22)

日本語訳が出た今でこそ、比較的膾炙し始めたクリーン・[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)であるが、この本が日本語訳されるまではインターネットにとても情報が少なかった。それだけに、ボブおじさんのこの本が日本語訳として登場したのは、とても喜ばしいことであるし、これが多くの人に読まれているというのはすごく素晴らしいことだ。

この本を手にとる各位においては、インターネットに転がるクリーン・[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)の真贋を一読した上でぜひ見極めてもらいたい。

### データ指向アプリケーションデザイン

![](https://images-fe.ssl-images-amazon.com/images/I/51T%2Bk4VRzpL._SL160_.jpg)

[データ指向アプリケーションデザイン ―信頼性、拡張性、保守性の高い分散システム設計の原理](http://www.amazon.co.jp/exec/obidos/ASIN/4873118700/izumisy-22/)

- 作者: Martin Kleppmann,斉藤太郎,玉川竜司
- 出版社/メーカー: [オライリージャパン](http://d.hatena.ne.jp/keyword/%A5%AA%A5%E9%A5%A4%A5%EA%A1%BC%A5%B8%A5%E3%A5%D1%A5%F3)
- 発売日: 2019/07/18
- メディア: 単行本（ソフトカバー）
- [この商品を含むブログを見る](http://d.hatena.ne.jp/asin/4873118700/izumisy-22)

嘘偽りなく現代のWebアプリケーション開発に必要なことが全部書いてあるバイブル。

自分はWebアプリケーション開発を[Rails](http://d.hatena.ne.jp/keyword/Rails)から始め、データベースといえば[PostgresQL](http://d.hatena.ne.jp/keyword/PostgresQL)か[MySQL](http://d.hatena.ne.jp/keyword/MySQL)くらしか触ったことがなかった。ところが、世の中には[Microsoft](http://d.hatena.ne.jp/keyword/Microsoft) AzureのCosmosDBや[GCP](http://d.hatena.ne.jp/keyword/GCP)のSpanner、そして[Amazon](http://d.hatena.ne.jp/keyword/Amazon)のDynamoDB、[Facebook](http://d.hatena.ne.jp/keyword/Facebook)のCassandraなど、一般的な[RDBMS](http://d.hatena.ne.jp/keyword/RDBMS)とは異なる特徴をもつ[ミドルウェア](http://d.hatena.ne.jp/keyword/%A5%DF%A5%C9%A5%EB%A5%A6%A5%A7%A5%A2)がある。では、それらがなぜ生まれ、どのようなアプリケーションに向いているのかを知るためには、彼らのもつ特徴や歴史背景などを知らねばならない。アプリケーションの規模が大きくなればなるほど、ビジネスの性質に応じて適切な道具を選ぶことで、コストの削減やパフォーマンスの向上が期待できる。その取捨選択が行えるのがアーキテクトたるソフトウェア・エンジニアの姿であるし、僕が目指すものでもある。

この本を読むまで、せいぜい親しいものといえば[伊藤直也](http://d.hatena.ne.jp/keyword/%B0%CB%C6%A3%C4%BE%CC%E9)氏による「[大規模サービス技術入門](https://amzn.to/2IbbXQt)」だったが、どちらかというとこの本は低レイヤの知識をベースにどうスケーラビリティを獲得するかについて語るものだったと言える。データ指向アプリケーションデザインはより広い[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)をカバーしており、ステップアップとしてはとても最適な本になっている。まあ、どちらも良書なので両方読むのがベターだろう。

- [1](about:blank#ipfootnote0):その当時はクリーン・[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)の本は日本語訳されておらず、いまのようにクリーン・[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)と呼べるのかどうかも紛らわしいような記事がQiitaに溢れたりしていなかった
- [3](about:blank#ipfootnote2):もちろん、必ずしも原典が一番ということはないが、原典に沿わないのであれば沿わないでどういうメリットが新しく享受できるのかを自分の言葉で説明してもらいたい、という気持ちはある
1. [インターン](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3)ではDDDとクリーン・[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)を一から勉強して[API](http://d.hatena.ne.jp/keyword/API)サーバーに実装する、というカリキュラムであったが、いま思うと2週間という比較的長い[インターン](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3)で僕が学べたことと言えば本当に微々たるものだった。つまるところ、それくらいには設計というものは奥が深い。常になんらか特定のデザイン・パターンなり[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)・パターンを適用することでアプリケーション開発がうまくいくということはなく、それらの様々な知識から少しづつ応用されたものが最終的なアプリケーションの設計に対して真の洞察を与えてくれるものというのが、僕自身のいまの認識である。
2. [インターフェイス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%D5%A5%A7%A5%A4%A5%B9)を分離すること、そして依存の方向を統一すること、このふたつだ。奥花子が歌っていたように、我々はアプリケーションの中で「変わらないもの」を探さねばならない。それがすなわち我々のビジネスルールであり、外部世界と分離して守らねばならない。
3. [アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)で実装してみました！という記事がたくさんインターネットで見つかるが、よくよく読んでみると[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)層の中でHTTPだとか[CSV](http://d.hatena.ne.jp/keyword/CSV)のようなどう考えても外部世界のフレーズが出てきたり、ボブおじさんが本の中で書いている Flow of Control に則ってない実装になっていたり、本当にクリーン・[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)の原典を読んで実装しているのかが疑わしいものがいくつもある。
4. [ビッグデータ](http://d.hatena.ne.jp/keyword/%A5%D3%A5%C3%A5%B0%A5%C7%A1%BC%A5%BF)ではない）や[トラフィック](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%D5%A5%A3%A5%C3%A5%AF)と常に戦い続けることだ。特に自分は文系大学出身かつ学生時代はさほど大きなアプリケーションに携わる経験がなかったこともあり、この本で説明されるような知識を全く持って持ち合わせていなかった。なぜNoSQLが生まれたのか、結果整合性とはなにか、ACID、CAP定理、CORBA、二層コミット、などなど。ソフトウェア・エンジニアとしてこれらのフレーズを一度も聞いたことがない、というのであれば今すぐにでも読むべきだと思う。