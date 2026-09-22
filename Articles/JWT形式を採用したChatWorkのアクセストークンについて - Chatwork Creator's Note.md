---
Created: 2021-03-08T23:02:00
URL: https://creators-note.chatwork.com/entry/2018/09/25/132218
Tags: [topic/技術/セキュリティ]
---
## JWTを使うことは難しい？

こんにちは、かとじゅん(@j5ik2o)です。最近、JWTに関する以下のブログが話題です[*1](https://creators-note.chatwork.com/entry/2018/09/25/132218)。

[どうしてリスクアセスメントせずに JWT をセッションに使っちゃうわけ？ - co3k.org](https://co3k.org/blog/why-do-you-use-jwt-for-session)

このブログで言及されているのは、JWTをセッションの保存先に選ぶことで「何が問題なの？」に書かれているリスクがあるよ、という話[*2](https://creators-note.chatwork.com/entry/2018/09/25/132218)。確かにいくつか検討することがありますね。

auth0の中の人？よくわからないけど、反論的なブログエントリが公開されています。この記事では、指摘の問題が起こらないように設計するのはあたり前では？という意見みたいです。まぁごもっともではないでしょうか。

私も技術そのものというより、要件に合わせて技術を組み合わせる設計の問題だと思っています。加えて、JWTを利用することはそんなに難しいことかという疑問があったので、考えをまとめてみることにしました。

## JWT形式のアクセストークン

引き続き、JWT関連の話題ですが、ここからはセッションとは異なる話になります。OAuth2のアクセストークンの話題です。

実は、ChatWorkのOAuth2で払い出されるアクセストークンはJWT[*3](https://creators-note.chatwork.com/entry/2018/09/25/132218)形式を採用しています。話題になっている懸念点を考慮した上で、どのような仕様になっているか簡単に解説したいと思います。

まず、[チャットワークAPIドキュメント](http://developer.chatwork.com/ja/oauth.html)の「3.アクセストークンの発行/再発行」のセクションにある、tokenエンドポイントのレスポンス形式をみてください。アクセストークン(有効期限は30分間)は、ピリオドでつながるBASE64形式(url-safe)になっています。リフレッシュトークン(有効期間はデフォルト時は14日間。offline_access時は認可が失効されるまで)はセキュアランダムで生成した文字列になっています。アクセストークンのメタデータはJWT内部に含まれています。また、リフレッシュトークンはトークンIDのみで、トークンIDに紐付く認可状態はサーバ側で管理されています。

```plain text
> POST /token HTTP/1.1
> Host: 127.0.0.1
> Authorization: Basic THZvMFlOOTJnYTVrUDphYmNkZWZnaGlqa2xu
bW9wcXJzdHV2d3h5ejAxMjM0NTY3ODk=
> Accept: */*
> Content-Length: 199
> Content-Type: application/x-www-form-urlencoded
>

< HTTP/1.1 200 OK
< Cache-Control: no-store
< Pragma: no-cache
< Content-Type: application/json
< Content-Length: 989

{
  "access_token": "eyJjdHkiOiJKV1QiLCJ0eXAiOiJKV1QiL
CJhbGciOiJSUzI1NiIsImtpZCI6ImlOUVh0dFR2RHZhcDVkSW
pGQzA5ZHZadHFXaGQ2WmFRb2pKenVuUS1vV28ifQ.eyJh
dWQiOiJodHRwczovL2FwaS5jaGF0d29yay5jb20iLCJzdWIi
OiIzIiwiYWNjb3VudF9pZCI6IjMiLCJzY29wZSI6WyJhbGwiXS
wiaXNzIjoiaHR0cHM6Ly9vYXV0aC5jaGF0d29yay5jb20iLC
JleHAiOjE1MDExMzgwNDEsImlhdCI6MTUwMTEzNzE0MSw
ianRpIjoiOTcwNDAwOWItNTdlNi00NDU5LTg5NzMtNjc3Zm
M5YjA5MjgyIiwiY2xpZW50X2lkIjoiTHZvMFlOOTJnYTVrUCJ9.
BIS8QvyTHz7KK_fnmvc0fa8NQDOWy7v8Ni0LvLyuROE5UEi
7l_HxDT8tHLTQLELIm3jOw4SiW94KPYwduRL467vJ2j2eNT
-zTkCXtEN8pxbA0HtnBrtCcp0dRJEMnfBegzkoAe8BTB6gee
3rrXy6sQcLb19WBrrHNbjICFL0--SG3IvPanOzABqiNMqfScn
asTtj7xtIaNpbxf8LDIH3EF150Iif4BqSczJr-XppBTBYuP32Ul
BnRlQOXvXqymGijQXgqDOo3LLFY_k62OoPYAQ3UXkaum8
6Al-DJM6iC-043kBINbYLLPo0uwwsolmjRDG5zBzPC0GtcjXiLy4Gqg",
  "token_type": "Bearer",
  "expires_in": 1800,
  "refresh_token": "86277ab4fd9d111bd3225215d96d6
22c9ae6810d82cd6d0e9530bf35adda67ab7d3c24e2a0
052e9d3b442ce212ca17ecf07ddbd8c3477aa3abde15e4ebcf7b53",
  "scope": "rooms.all:read_write"
}

```

## なぜJWT形式なのか

トークンは大別すると、以下の形式があります。

- Artifact 
    - トークンにはメタデータを保持せずIDのみ。メタデータはサーバ側のストレージに持つことが一般的
- Assertion 
    - メタデータをすべて内包する形式。JWTはその代表格。

ArtifactはIDのみであるため、サーバ側にストレージを持ち、IDに対応する情報を引き出すAPIが必要となりますが、アクセストークンの失効自体は即時に行えます。 一方、JWTはAssertionに分類されますが、メタデータはJWT本体に組み込める訳ですから、そのためのサーバサイドにストレージは不要です。しかし、アクセストークンの失効は即座に行えません。サーバ側にストレージがないから当然です。

ChatWorkでは、なぜJWT形式を選んだか？その理由は以下です

1. サーバ側でメタデータを管理するストレージの運用コスト削減のため
2. マイクロサービスが増えた場合に、リソースサーバ単体での認可を実装しやすい

今のところ、大きな理由は1番ですね。 とはいえ、サーバ側で状態管理しないことによるデメリットもあります。それをどうカバーしたか、もしくは仕様として対象外としたかを説明します。

## 検討した設計上のトレードオフ

### アクセストークンの失効管理

Assertion形式のJWTの場合はサーバに状態がないので、トークンの失効が即時にできません。なので、できるだけ有効期間を短くした方がよいです。また、漏れたアクセストークンは有効期間の間は失効できません。そのアクセストークンの生存期間中の二次被害を防止するには、認可サーバでの当該認可の破棄、リソースサーバでの利用権限の一次停止などの別の仕組みを検討する必要があるでしょう。

しかし、サーバに状態があるArtifact形式だからといって、即座に失効できるとは限らないと考えます。当該認可の破棄、漏洩したトークンの確認、API権限の一時停止、分散キャッシュ上からトークンIDを特定・削除の実行などのワークフローを社内で実行するには30分ぐらいは掛かると考えました。

ChatWorkのアクセストークンも期限が30分と比較的短い時間に設定しています。仮に、アクセストークンが漏洩した場合は、当該認可の破棄、対象のユーザのAPI機能を一次停止するなどの対応を取るものの、漏洩したトークンが利用できなくなるまで(30分間)待つことになります。もちろん、漏洩した根本原因に対しては恒久対策すべきですが、応急対策としてはこのようになると想定しています。というわけで、我々は、Assertionでも実運用に耐えられると判断し、JWT形式のアクセストークンを選択しました。

Assertion形式を採用する場合は、この運用ポリシーを許容できなければなりません。まず設計の最初でこれを確認しておきましょう[*4](https://creators-note.chatwork.com/entry/2018/09/25/132218)。

### 署名するための鍵ペアの管理

次に考えるべきポイントは電子署名の安全性です。JWTにはJWS, JWEと二種類ありますが、電子署名による検証のためにJWS(署名アルゴリズムはRS256)を利用しています。そのため、署名用鍵ペアが必要です。加えて秘密鍵を推測されないために、署名用鍵ペアに期限を設け、定期的に交換します(ローテーション)。考え方は以下のようになります。

3. 規定のキーペア数に満たない場合は、必要な数分キーペアオブジェクトを作る(RSAKeyPair)。そして、RSAKeyPairを[JWK](https://tools.ietf.org/html/rfc7517)に変換する。JWK中の公開鍵, 秘密鍵はJSON化してDBに保存します。 
    - ここで問題になるのは秘密鍵の秘匿方法ですね。普通に暗号化するとなると秘密鍵を暗号化する鍵をどう管理すればいいのかという話になります。自前で頑張らずにAWSやGCPのキーマネジメントサービスを利用する方法もあります。ウチはAWS KMSエンベローブ暗号で秘匿しています[5](https://creators-note.chatwork.com/entry/2018/09/25/132218)
    - さらに、鍵ペアの有効期限も設定します。有効期限は少なくとも署名するアクセストークンより長くないと意味がありません。
4. 有効期限が切れた鍵ペアは削除します。
5. DBには公開鍵のJWKが保存されているので、それをJWKSetとしてエクスポートし、ウェブサーバから公開します。 
    - あくまで公開されるのは公開鍵のJWKSetです。このJWKSetをリソースサーバでアクセストークンの検証目的で利用します。

ちなみに、1と2は期限が過ぎれば鍵ペアがローテーションすることを意味しています。万が一、秘密鍵が漏洩しても短時間で古くなり使われなくなります。

少し実装の話をすると、JWT自体はauth0/java-jwtにScala用ラッパー(j5ik2o/sw4jj)を適用して利用しています。JWKSetはchatwork/scala-jwkを利用しています。

このような、鍵ペアのローテーション・公開鍵のJWKSetとしてのデプロイの仕組みは、設計がまともにできる人ならそれほど難しくないと思います。まぁ、我々もそれになりに開発コストを掛けました [*6](https://creators-note.chatwork.com/entry/2018/09/25/132218)が、長期間の運用を考えると、ストレージコスト・インフラ担当者の人件費などが削減できるので、十分に元が取れると思います！

### リソースサーバでの検証

Artifact形式の場合は、[OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662)のようなインターフェイスを認可サーバが持ち、リソースサーバからのアクセストークン検証リクエストに応じる必要があります。たとえば、認可サーバは、分散キャッシュなどに保存された、アクセストークンのメタデータを利用し、アクセストークン検証のレスポンスを返すことになると思われます。

一方、AssertionであるJWT(JWS)では、リソースサーバは、認可サーバが署名に使った秘密鍵に対応する公開鍵を利用して、アクセストークンを検証します。検証にはJWT(JWS)以外に、公開鍵を表現するJWKが必要です。JWKは集合になっている場合があるので、JWKSetとしWebサーバから公開されている必要があります。リソースサーバはJWKSetに依存するものの、APIでの直接的な連携はありません。実装的には、auth0/java-jwtならJWTVerifierを使えば簡単に検証できます。

[GitHub - auth0/java-jwt: Java implementation of JSON Web Token (JWT)](https://github.com/auth0/java-jwt#verify-a-token)

あと、署名アルゴリズムとしてnoneを受け付ける実装もあるようなので、JWTヘッダーぐらいは自前でバリデーションしてもよいのではないでしょうか。RS256を受け付けるのであれば、それ以外はクライアントエラーにすればよいと思います。ヘッダの構造はシンプルなので簡単に実装できると思います[*7](https://creators-note.chatwork.com/entry/2018/09/25/132218)。ライブラリに検証を委譲する場合でも、noneやHMAC-SHA*などの想定外の署名アルゴリズムを受け付けないか単体テストで確認するぐらいはやっておいて損はないと思います。

追記: java-jwtの検証コードの例は秘密鍵を指定しているので、実用的じゃないサンプルでした…。なので以下に例を示しておきます。

```plain text
val accessToken = "..."
// JWTのヘッダー部分をBase64デコード→JSONオブジェクト化
val header: Json = getHeder(accessToken)
// headerからalgを取得する
val alg: String = getAlg(header)

// 署名アルゴリズムを検証
require(alg == "RS256")

// 署名されている公開鍵IDをヘッダから取得する。JWTを生成するときに指定している前提
val kid = getKeyId(header)

// ウェブサーバなどからJWKSetを取得する
val jwkSet: JWKSet = getJWKSet()
// kidのJWKを取得
val jwk: JWK = getJWK(jwkSet, kid)
// JWKからRSAPublicKeyへの変換
val rsaPublicKey: RSAPublicKey = getRSAPublicKey(jwk)

val  jwt: DecodedJWT = try {
  // private keyは指定しなくてもよい
  val algorithm = Algorithm.RSA256(rsaPublicKey)
  val verifier = JWT.require(algorithm)
    .withIssuer(oauthUrl) // 適宜条件を指定
    .build()
  // 検証する。成功するとDecodedJWTが取得できます
  verifier.verify(token)
} catch {
  case ex: JWTVerificationException =>
    // ...
}
// DecodedJWTから各クレイムにアクセスできます

```

### アクセストークンの永続化について

JWTのように長い文字列をDBに保存する際、インデックス化に問題が生じることがあります。そのため、ChatWorkのOAuth2クライアントとしては、アクセストークンを永続化せずにオンメモリで保持し、文字列長が短いリフレッシュトークンを保存することを推奨しています。アクセストークンを失ったとしても、リフレッシュトークンの期限内であれば、通信コストは掛かりますが再度アクセストークンを取得できます[*8](https://creators-note.chatwork.com/entry/2018/09/25/132218)。この点については、完全にトレードオフです。

## まとめ

というわけで、ChatWorkのアクセストークンにJWT形式を採用する際の設計上のトレードオフを紹介しました。このようにリスクヘッジも含めて要件に合致すればJWTでも十分に運用できると思います。参考になれば幸いです！ぜひよいJWTライフを:P

## 補足

### JWTに含める値について

JWTのクレイムに含める情報は、RFCの予約済みクレイム[*9](https://creators-note.chatwork.com/entry/2018/09/25/132218)に代表されるように、JWTのライフサイクル上で変化しない値＝不変な値(クライアントIDやリソースオーナーIDなど)を前提にしています。独自にクレイムを設定できますが、いわゆる可変属性を含める(含めたとしても、リソースサーバはそのときの値しか評価できない)というのは、そもそも用途に合わないので注意しましょう。

![[bnr_devday2021_article.png]]