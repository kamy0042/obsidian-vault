---
Created: 2022-02-14T11:09:00
URL: https://ryozi.hatenadiary.jp/entry/2022/02/12/073014
Tags: [topic/技術/セキュリティ]
---
![[Attachments/無題のフォルダ/og-image-1500 2.png]]

以下のツイートを読んで気持ちが昂ったので。

> みんな、もうSNSでいがみ合うのはやめよう。平和に好きなJWTの話でもしようよ。JWTの格納場所はlocalStorageとCookieのどっちが好き？
> [2022年2月11日](https://twitter.com/ockeghem/status/1491990135394942977?ref_src=twsrc%5Etfw)

というのも、JWTをセッションに使うときに保存先含めて一時期悩んでいたので、その時の自分の解。

ただ、考えるたびに変化しているので、変わるのかもしれない。

## 要約

タイトル。

あとは優秀な方々が既に色々考えておられるのでそちらを読むとよいでしょう。

[SPAセキュリティ入門～PHP Conference Japan 2021](https://www.slideshare.net/ockeghem/phpconf2021spasecurity)

[JWT カテゴリーの記事一覧 - r-weblife](https://ritou.hatenablog.com/archive/category/JWT)

[どうしてリスクアセスメントせずに JWT をセッションに使っちゃうわけ？ - co3k.org](https://co3k.org/blog/why-do-you-use-jwt-for-session)

[JWT形式を採用したChatWorkのアクセストークンについて - Chatwork Creator's Note](https://creators-note.chatwork.com/entry/2018/09/25/132218)

以降は読む価値ないです。あとは自分からの社会への不平不満や嫉妬とか想いとか。

## 私の解

### JWTをセッションとして使う

色々課題があります。課題の答えを出した上でJWTを採用するのは、良いと思います。

ただし「JWTでセッション管理がステートレスになるぜ！スケールするぜ！！」と思っているなら、それは思い違いです。 JWT自体は「ある発行者が作った情報のためのフォーマット」にすぎません。JWTにはログアウトやセッションを無効化する話はありません。（セッションの有効期間は期限(exp)に持たせて表現するとかありますが） それに署名に使う鍵をどう管理したらよいでしょうか？アプリケーション単位でしょうか？ユーザ単位でしょうか？色々考えることはあるはずです。

まぁ、頑張って考えてもユーザや会社からは何の評価もされないと思いますけど。

どちらでもよいと思います。[Cookie](http://d.hatena.ne.jp/keyword/Cookie)だろうがlocalstorageだろうがどっちも[XSS](http://d.hatena.ne.jp/keyword/XSS)の前には無力です

とはいえ、[Cookie](http://d.hatena.ne.jp/keyword/Cookie)(httponly)なら[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)からどうあがいても読み取ることはできません。 そういった意味ではlocalstorageよりも[Cookie](http://d.hatena.ne.jp/keyword/Cookie)のほうがセキュアかもしれません。ただしhttponlyな[Cookie](http://d.hatena.ne.jp/keyword/Cookie)だろうが[XSS](http://d.hatena.ne.jp/keyword/XSS)で攻撃に繋げられるのであまり意味はないこともあります。

[クロスサイトスクリプティング(XSS)対策としてCookieのHttpOnly属性でどこまで安全になるのか - YouTube](https://www.youtube.com/watch?v=4JREwhSC2dQ)

つまり、[XSS](http://d.hatena.ne.jp/keyword/XSS)無いことを前提にすればどっちも安全です。[XSS](http://d.hatena.ne.jp/keyword/XSS)が無いことを踏まえて自分にメリットのある方法を選べば良いかと思います。

- Q1．機密情報をlocalstorageに入れるべきではないのでは？徳丸本でもそう言ってた
- A1．はい。見られて困るものは入れてはいけないですね
- Q2．じゃあセッション情報（セッションIDとかセッションとしてのJWT）を入れるべきではないのでは？
- A2．いいえ。[XSS](http://d.hatena.ne.jp/keyword/XSS)が無いなら、見られても無意味ですし、改ざんされても無意味なので入れてもいいと思いますよ。
- Q3．いや、セッション情報って見られたらそれを使って悪用できてしまうから、見られたら困るものでしょ？
- A3．結論出ましたね。じゃあそういうことなら[Cookie](http://d.hatena.ne.jp/keyword/Cookie)にしておけばいいんじゃないですかね。はい、さようなら。まぁ、悪意を持って見るためには[XSS](http://d.hatena.ne.jp/keyword/XSS)が必要で、[XSS](http://d.hatena.ne.jp/keyword/XSS)の前にはどっちも一緒だと思いますよ。
- Q4．どっちだよ？[XSS](http://d.hatena.ne.jp/keyword/XSS)無ければ機密情報を入れてもいいの？
- A4．私はそう思ってます。今は。

追記：A1とA4で矛盾してんじゃんという感じですが、A4の機密情報はセッションIDとかJWTを指してるつもりでした。クレジットカードとかの即座に使える機密情報は入れてはいけないのは当然です。それはlocalstorage自体のライフタイムの長さとその間に[XSS](http://d.hatena.ne.jp/keyword/XSS)が起きるリスクを考えて、私は「入れたらまずいよね」という感覚だからです。また、[Cookie](http://d.hatena.ne.jp/keyword/Cookie)なら機密情報を入れてもいいというわけでもないです。

### ランダムなセッションID vs JWT への自分の解

どちらでもよいです。

一応「ランダムなセッションID」とは従来のセッション管理の仕組みで使う方法です。サーバサイドでログイン時にセッションID払い出しユーザ情報に紐づけ、ブラウザにセッションIDを返して次回のリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トにセッションIDを付けてリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トしてもらうことでセッションの仕組みを成り立たせています。

「ランダムなセッションID」はセッションIDだけ見ても情報はわかりません。しかし、そこからサーバサイドに問い合わせてどういうユーザか等の情報を集めるということはできます。

一方、JWTは[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の内容から情報を抜き取ることができます。JWTをみれば誰がいつログインしたかとかの情報はわかってしまうかもしれません（持たせている情報によります） では暗号化しましょう、とJWE を採用するとか、独自に[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)部分を暗号化するのもよいでしょうが、そこまでする価値はあるかというと、私は無いと思います。 ランダムなセッションIDを使った場合と同じで、結局サーバサイドに問い合わせてどういうユーザか等の情報を集めるということはできるからです。

もし、奪取されてから次の攻撃までに無効化する運用が整っていれば暗号化の価値はあるかもしれませんが、私が知る限り「奪取された」という事を知る術は難しいと思うので価値が薄いと思っています（[アクセスログ](http://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B9%A5%ED%A5%B0)からその兆候が見られるかもしれません。ほらAI案件ですよ。よかったですね。）

## その他

### 「[Cookie](http://d.hatena.ne.jp/keyword/Cookie)に格納する」 は 「サーバーサイドセッションに格納する」というわけではない

> 「Cookieに格納する」の部分は正確には「サーバーサイドセッションに格納する」ですよね？
> [2022年2月11日](https://twitter.com/NewGyu/status/1492036258255671297?ref_src=twsrc%5Etfw)

リプライをみて「うーん？」という感じがしたので。

まず、「[Cookie](http://d.hatena.ne.jp/keyword/Cookie)の値をサーバサイドでユーザと紐づけることでセッションを保持する仕組み」が王道パターンです。これが「サーバーサイドセッションに格納する」という意味であれば正しいです。

しかし、別に[Cookie](http://d.hatena.ne.jp/keyword/Cookie)に「ユーザID」と「署名」を付けたものを与えれば、「サーバーサイドセッションに格納する」ことなくユーザを一意に特定できます。 サーバ側は[Cookie](http://d.hatena.ne.jp/keyword/Cookie)のユーザIDをみれば誰かわかります。もちろん署名もちゃんと検証しましょう。 悪い人がユーザIDを成り済まそうとしても、署名を作るのは困難なので大丈夫、という理屈です。 セッションのための情報をサーバサイドに持たなくても良くなるのでスケールもします。ワオ！いいことづくめですね！オレ天災なのでは？こんな簡単なことなんでみんなやらないんだろう？？？

という感じで独自フォーマットを考えてもいいですが、JWTはなんとこの特性を揃えています。JWTもただの文字列です。というわけでJWTを[Cookie](http://d.hatena.ne.jp/keyword/Cookie)に使うことができます。（[Cookie](http://d.hatena.ne.jp/keyword/Cookie)のサイズ制限には注意するぐらいか。`"alg":"none"`を認めちゃだめとかもあります。）

しかし、JWT自体はただのフォーマットなので、ログアウトの概念とか強制ログアウトさせたいとかの運用周りの問題があったり色々厄介なのです（上記の方法も同様です）。

ではログアウトのことを考えましょう、となると、結局何かしらサーバサイドで状態を持たないといけません。 JWTをlocalstorageで持とうが[Cookie](http://d.hatena.ne.jp/keyword/Cookie)で持とうが「サーバーサイドセッションに格納する」という点は変わらないことになるのかもしれません。

### Chatworkさんの事例

[徳丸先生のスライド中に](https://www.slideshare.net/ockeghem/phpconf2021spasecurity)Chatworkさんの事例があったので一応。 JWTを[Cookie](http://d.hatena.ne.jp/keyword/Cookie)にいれるかlocalstorageに入れるか、という話とはずれますが「アクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ン（JWT）をどう管理するか」という点は変わらないです。

Chatworkさんの事例ではアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンをステートレスで扱います。その代わり、期限を30分と短くしてその期限内の悪用は許容しています。 で、使い続けたい場合はリフレッシュ[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンでアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを作り直してくれ、というやり方です。そこにログアウトはないということです。 その代わり再発行するためのリフレッシュ[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンは結局ユーザに紐づけて管理しています。まぁ、ここを管理しないといくらでも再発行できちゃうor都度アクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを発行させるような作業をユーザに強いることになりますからね。

これは頭が良くて、よく「セッション情報が流出したから強制ログアウトさせたい」みたいな運用を求めることがありますが、この運用自体が手遅れなんです。流出した事実はかわらないですからね。 パスワードのハッシュが流出したんでパスワードを再設定してください、というのも手遅れ。[GitHub](http://d.hatena.ne.jp/keyword/GitHub)に[AWS](http://d.hatena.ne.jp/keyword/AWS)のアクセスキー流しちゃったとかも手遅れ。流出した事実はかわらないですからね。

そこで、流出したものが無意味になればどうでしょうか。パスワードのハッシュならハッシュに使うsalt値を変えれば概ね無意味になりますし、[AWS](http://d.hatena.ne.jp/keyword/AWS)のアクセスキーとかは失効できます。

しかし、それもその操作を行うまでです。そこにリードタイムがあり、その間は悪用できてしまいます。

Chatworkさんのアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンもこの考え方で、30分という期間の悪用は認めることでステートレスを手に入れています。 まぁ今度はリフレッシュ[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンが漏れないように注意しないといけなかったり、そのリフレッシュ[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンをWebアプリに適用する場合にどこに保存するか考えたり課題はあるのですが、[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)的には大半はアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを使った操作になるのでそこがスケールするのはおいしいでしょう。

リスクを許容すれば、こういうやり方もできますよという事例ですね。

### 「みんな、もう[SNS](http://d.hatena.ne.jp/keyword/SNS)でいがみ合うのはやめよう」とは

流行りのテンプレートみたいです。

[https://togetter.com/li/1843400](https://togetter.com/li/1843400)

## 以下はお気持ち

### セッションの管理・運用は簡単じゃない

- ログアウトという一般的な要件を満たせる
- セッションが悪用されているときに強制的に無効化する仕組みがあるか
- 内部犯の脅威

多分きちんとやっているところのほうが少ないと思います。[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)のサンプルのGet Startから始めて数分でログイン機能付きのウェブサイトができた！となり、そこに肉付けしていってるだけだと思います。私もそうです。それは別に恥ずべきことではないです。

ステートフルなセッション管理を採用する、つまりセッションIDはランダムに発行してその時々で紐づけて管理するというやり方は、先駆者らが色々考えた上でその仕組みになっており、色々と理にかなっています。

内部犯のために定期的に鍵のローテーションとか本当にやってる所あるんでしょうか？建前では言ってるけど本当にやってますか？やらなくても表面化しませんよね？ そもそも中の人が退職されたりしたら発行済みのセッションIDを全部リセットしましょうとか本当はやったほうがいいですよね？なんでやらないんですか？悪用のリスクとユーザ影響を天秤にかけたうえでの判断ですか？ならいいでしょう。私の責任じゃないですし。

あと、そんなところに[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)をかけてもお客さんや会社は見てくれないですからね。 ちゃんとアピールしていかないといけないんですが、セッション管理一つとっても、こういう課題があるんですよ！っていっても「ログイン・ログアウトとか今どきできて当たり前でしょ」ってなりますし、そもそもこういう攻撃のケースはなかなかイメージしてくれません。悲しいなぁ。

### [サプライチェーン](http://d.hatena.ne.jp/keyword/%A5%B5%A5%D7%A5%E9%A5%A4%A5%C1%A5%A7%A1%BC%A5%F3)攻撃

JWTとかもはやほとんど関係ないですが、[XSS](http://d.hatena.ne.jp/keyword/XSS)するにはなにもアプリの[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)だけではなくなってきています。

人為的か悪意的かともかくとして、npmや[CDN](http://d.hatena.ne.jp/keyword/CDN)を経由として、悪いコードを仕込む余地があります。

[Wordpress](http://d.hatena.ne.jp/keyword/Wordpress)なら[プラグイン](http://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)の[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)を使って攻撃を仕込まれるのも[サプライチェーン](http://d.hatena.ne.jp/keyword/%A5%B5%A5%D7%A5%E9%A5%A4%A5%C1%A5%A7%A1%BC%A5%F3)攻撃でしょう。

ところで、あなたが使ってる[VSCode](http://d.hatena.ne.jp/keyword/VSCode)の[プラグイン](http://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)、ブラウザのExtension、Ansibleのモジュール、[Linux](http://d.hatena.ne.jp/keyword/Linux)で得体の知れないパッケージ[リポジトリ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA)にあるパッケージなどについて何があるでしょうか？それは安全でしょうか？

あとは人ですね。人。悪い人が全部悪い。悪い人類は全て滅ぼそう。HTTPと信頼だけの優しいWebを取り戻しましょう。

最近はウェブサイト作ったら作っただけ[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)になるんじゃないかとヒヤヒヤしながら作ってます。楽をしたい