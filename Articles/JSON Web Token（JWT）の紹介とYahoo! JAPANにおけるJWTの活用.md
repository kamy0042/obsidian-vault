---
Created: 2021-01-15T18:11:00
URL: https://techblog.yahoo.co.jp/advent-calendar-2017/jwt/
Tags: [topic/技術/セキュリティ]
---
テクノロジー

2017.12.01

こんにちは。IDソリューション本部の都筑です。新卒2年目で普段はYahoo! ID連携のサーバーサイド、iOSのSDKの開発などを担当しています。今回は最近ユーザーやデバイスの認証で用いられる”JSON Web Token（JWT）”についての解説と、Yahoo! JAPANと他社の活用事例を紹介したいと思います。

# JWTとは？

JWTとはJSON Web Tokenの略称であり、属性情報（Claim）をJSONデータ構造で表現したトークンの仕様です。仕様は[RFC7519](https://tools.ietf.org/html/rfc7519)（外部サイト）で定められています。特徴として、署名、暗号化ができ、URL-safeであることなどが挙げられます。発音は"ジョット"です。JWTと関連する仕様として、JSON Web Signature（JWS）、JSON Web Encryption（JWE）というものがあり、それぞれJSONデータ構造を用いて署名、暗号化するための仕様です。これらもそれぞれ[RFC7515](https://tools.ietf.org/html/rfc7515)（外部サイト）と[RFC7516](https://tools.ietf.org/html/rfc7516)（外部サイト）にて仕様が定められています。JWTでは、署名付きデータの場合はJWS、暗号化する場合はJWEの仕様に基づき、JWTが利用されますが、現状使われている多くのJWTが署名付きのものであるため、今回扱うJWTはJWSを用いた署名付きのJWTとします。

## JWTの構造

文字だけの説明ではわかりづらいので、実際のJWTをみながらJWTの構造について理解をしたいと思います。下記の文字列がJWTの例です。

```plain text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

JWTの構成をわかりやすくするため、改行をしてみます。

```plain text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9
.
TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

すると、JWTは2つのピリオド（"."）で区切られた3つのパートによって成り立っているということがわかります。この3つのパートにはそれぞれ役割があり、前から順番にヘッダー（Header）、ペイロード（Payload）、署名（Sinature）となっています。

```plain text
<ヘッダー>.<ペイロード>.<署名>
```

### ヘッダー

ヘッダーはJWTの署名検証を行うために必要な情報を格納するためのパートとなっています。文字列の形式としては、キー名と値のペアで表現されたJSONをBase64urlエンコードした文字列となっています。Base64エンコードの場合は"+", "/", "="が含まれますが、JWTはURIのクエリパラメーターなどに使用されることを想定しているので、URL-safeに表現するためにBase64urlエンコードがされています。Base64urlエンコードでは"+"を"-"に、"/"を"_"、"="を""に変換しています。デコードをするとJSONに変換できるので、デコードをしてみます。

```plain text
{
  "typ": "JWT",
  "alg": "HS256"
}
```

"typ"は"JWT"の文字列からJWTであることを示し、"alg"は署名アルゴリズムを示しています。上記の例の"HS256"はHMAC SHA-256を表しています。署名アルゴリズムはHMAC SHA-256が実装を義務付けられていますが、他にもデジタル署名のRSA-SHA256などをサポートすることが推奨されています。このヘッダーから署名アルゴリズムでJWTの検証を行います。

### ペイロード

ペイロードはやりとりに必要な属性情報（Claim）です。ペイロードの内容はアプリケーションによっては異なるため、必須とされるものは存在しませんが、相互運用性のある属性情報については予約済みパラメーターとして提供されています。ヘッダーと同様に、JSONをBase64urlエンコードした文字列なので、デコードが容易にできます。

```plain text
{
  "admin": true,
  "name": "John Doe",
  "sub": "1234567890"
}
```

### 署名

署名パートは、エンコード済みヘッダー、ピリオド（"."）、エンコード済みペイロードを連結したものを入力値として"alg"の署名アルゴリズムで署名し、Base64urlエンコードすることにより作成されます。

```plain text
TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

こちらの文字列をヘッダーで指定されたアルゴリズムで署名検証することにより、ID Tokenの正当性を評価できます。

ここまでJWTの構造を見てきましたが、JWTの中身を気軽に見たい場合は

[jwt.io](https://jwt.io/)

（外部サイト）のDebuggerが便利なので、ぜひ使ってみてください。

![](https://s.yimg.jp/images/tecblog/2017-2H/jwt/jwtio.png)

JWTのデコード、エンコードがリアルタイムででき、さらにHMAC SHA-256とRSA-SHA256で署名されたJWTに関しては検証まで行ってくれるので非常に便利です。

# JWTを利用した仕様の紹介

では、実際にはどういった用途でJWTが使用されているのでしょうか。JWTを利用している仕様を紹介いたします。

## OAuth 2.0のAccess Token取得のためのJWTの利用

OAuth 2.0は[RFC6749](https://tools.ietf.org/html/rfc6749)（外部サイト）で策定されている、認可の標準仕様です。OAuth 2.0はサードパーティーアプリケーションによるHTTPサービスへ、限定的なアクセスを可能にします。OAuth 2.0のAccess Tokenを取得する際のクライアント認証はBasic認証や、クライアントIDとシークレットを用いた認証でも可能ですが、[RFC7523](https://tools.ietf.org/html/rfc7523)では、それらの代わりにJWTを用いる方法が提案されています。また、[RFC7523](https://tools.ietf.org/html/rfc7523)の中でもう1つの仕様として、Authorization grantとしてJWTを用いる方法も提案されています。これは、バッチ処理でのAPIアクセスなどの際に、ユーザーのインタラクションなしでAccessTokenを取得することを想定したものです。

## OAuth 2.0のstate

また、最近ではOAuth 2.0の拡張で、使用されるCSRF対策のパラメーターである"state"に対して、JWTのフォーマットを適用する仕様がIETFのdraftとして提案されています。

OAuth 2.0では、発行されたトークンを受け渡すためにリダイレクト先のURIを指定する"redirect_uri"というパラメーターが存在します。このパラメーターは、"client_id"にひもづいており、予期せぬアプリにトークンをわたしてしまわないように、登録している"redirect_uri"以外にはリダイレクトしないような仕組みになっています。OAuth 2.0を提供する認可サーバーの検証内容としては、リクエスト時にわたした"redirect_uri"パラメーターの値と、認可サーバーに保存された"client_id"にひもづく"redirect_uri"が完全に一致しているかを確認しています。したがって、例えば"redirect_uri"にurlをクエリパラメーターとしてつけ、認可サーバーからサードパーティーアプリケーションにリダイレクトで戻ってきた後、そのurlにリダイレクトしたいなどといった要件があっても、"redirect_uri"には付加できないため、別途パラメーターをわたす必要がありました。このdraftでは"state"をJWTのフォーマットにしてリダイレクト先のURIなどの属性情報を含めることが提案されています。JWTのフォーマットを用いることで、本来の"state"としてCSRF対策の役割も果たしつつ、安全に複数の属性情報を持たせることが可能です。

## OpenID ConnectのID Token

OpenID ConnectとはID連携の標準仕様であり、OAuth 2.0の仕様を拡張し、認証機能を加え、ID連携に必要な機能を定義したものとなっています。OpenID ConnectはOpenID Foundationが使用を定義しています。

OAuth 2.0にはない拡張機能として、ID Tokenというものがあります。ID Tokenはユーザーの認証情報をもったトークンで、改ざんを検知するためにJWTのフォーマットで表現されることが仕様で定められています。

# Yahoo! JAPAN におけるJWT活用

Yahoo! JAPANでは、ユーザーのクレデンシャル情報や、Yahoo! ID連携 v2のID TokenなどにJWTが活用されています。今回はYahoo! ID連携 v2に注目してJWTをどう検証しているのかを見ていきたいと思います。

## Yahoo! ID連携 v2 のID Token

- [Yahoo! ID連携 v2](https://developer.yahoo.co.jp/yconnect/v2/)

Yahoo! JAPANでは、OpenID Connectの仕様に準拠したID連携のサービスを提供しています。Yahoo! ID連携 v2を利用することで、Yahoo! JAPAN IDをもつユーザーに対しての認証機能を利用でき、またYahoo! JAPAN IDにひもづく属性情報を取得し利用することも可能です。Yahoo! ID連携 v2においてもOpenID Connectの仕様通り、ID TokenはJWTのフォーマットで実装されています。

## iOSアプリ上でのID Tokenの検証

基本的には、アプリを提供する場合、サーバーサイドの実装も行いサービスを提供することが多いため、ID Tokenの検証はサーバーサイドで行われることが多いですが、アプリのみで動作する場合などはアプリ内でID Tokenの検証を行います。Yahoo! JAPANのアプリでもアプリ内でID Tokenの検証を行っています。JWTの理解を深めるために、Yahoo! ID連携 v2で発行されたID TokenをiOSアプリ上で検証してみたいと思います。

まずは下記手順ににしたがってYahoo! ID連携 v2 を利用するためにClient IDを登録します。

- [Yahoo! ID連携 Client IDを登録する](https://developer.yahoo.co.jp/yconnect/v2/registration.html)

Yahoo! ID連携 iOS SDKを使い、アプリケーションにID連携を実装していきます。

- [Yahoo! ID連携 iOSアプリ](https://developer.yahoo.co.jp/yconnect/v2/client_app/ios/)

今回は、iOSアプリ上でのID Token検証が目的のため、Hybridフローで実装を行います。ログインボタンなどを設置し、YConnectManagerのrequestAuthorizationメソッドを呼びます。

```plain text
//ログインボタンタップ時などに下記を実行する

// stateとnonceは本来ランダム値を使用します
// ここでは簡略化するため固定値にしています
let state = "44GC44GC54Sh5oOF"
let nonce = "U0FNTCBpcyBEZWFkLg"
let manager = YConnectManager.sharedInstance（）

// Safariでログイン画面を表示
manager.requestAuthorization（withState: state, prompt: "login", nonce: nonce）
```

Safariでログイン画面が表示されるのでログインします。

![](https://s.yimg.jp/images/tecblog/2017-2H/jwt/login.png)

ログインが正常に行われると、Info.plistで指定したYConnectRedirectUriの値のURLSchemeにリダイレクトされます。URLSchemeにリダイレクトされると、指定したアプリが起動し、AppDelegateのopen urlメソッドが呼ばれます。この中でYConnectManagerのparseAuthorizationResponseを呼ぶことで、ID Tokenの取得、チェックをSDK内で行います。

```plain text
func application（_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any） -> Bool {
    let manager = YConnectManager.sharedInstance（）!
        // RedirectUriをパースし、AuthorizationCode、ID Tokenを保持する
        // ID Tokenのチェックも同時に行われる
        manager.parseAuthorizationResponse（url） { （error） in
            // Access Token、ID Tokenを取得
            manager.fetchAccessToken（manager.authorizationCode, handler: { （token, error） in
        }）
    }）
}
```

OpenID Connectの仕様では、ID Tokenの検証方法に関しても記載されており、これに準拠した形で検証を行っています。あくまでOpenID Connectの仕様であり、JWTの仕様ではありません。

実際に発行されたID Tokenを見ながら検証していきたいと思います。

```plain text
{
  "iss": "https://auth.login.yahoo.co.jp/yconnect/v2",
  "sub": "<sub>",
  "aud": [
    "<client_id>"
  ],
  "exp": 1514010319,
  "iat": 1511591119,
  "amr": [
    "pwd"
  ],
  "nonce": "U0FNTCBpcyBEZWFkLg",
  "at_hash": "qoKGnB5D_6hG0m3Bw9FEMw"
}
```

ID Tokenのペイロードの中身の検証は、iss, nonce, aud, exp, iatに関して行っています。

名前
詳細
検証内容




iss
ID Tokenの発行元
"

```plain text
https://auth.login.yahoo.co.jp/yconnect/v2
```

"と一致することを確認


nonce
リプレイアタック防止用のランダム値
リクエスト時に積んだ"nonce"と一致することを確認


aud
クライアントの識別子
"client_id"の値と一致することを確認


exp
ID Tokenの有効期限
現在時刻と比較し、ID Tokenが有効期限がきれていないことを確認


iat
ID Tokenの発行時間
発行時間が現在時刻よりもはるか昔でないことを確認

ここまでで、ペイロードの検証はできました。加えて、ID Tokenが改ざんされていないかを確認するための署名検証も行っています。

# JWTの署名検証時の注意

JWTの署名検証の実装方法やライブラリーの利用方法によっては、ぜい弱性を作り出してしまう可能があるため注意が必要です。

## ヘッダーの"alg"を"none"に改ざん

1つめはヘッダーの"alg"の値を"none"とする方法です。

JWTの標準仕様では、署名を行わないケースもサポートしており、署名を行わない場合はヘッダーの"alg"の値を"none"にし、署名検証を行いません。

あるサービスが発行するJWTは改ざん防止のために署名検証を必ず行いたいときでも、"none"をサポートした実装やライブラリーを利用している場合、"alg"が"none"に改ざんされると、JWTが署名検証を行わずに処理してしまう可能性があります。

これを防ぐために、JWTの署名検証を必ず行う場合はヘッダーの"alg"が"none"であるJWTは受け付けないなどの対処が必要です。

![](https://s.yimg.jp/images/tecblog/2017-2H/jwt/alg_none.png)

## ヘッダーの"alg"をHMAC-SHAに改ざん

2つめはヘッダーの"alg"の値を"HS256"とし、RSA SHA-256の公開鍵の文字列を鍵としてHMAC SHA-256で署名を生成する方法です。

![](https://s.yimg.jp/images/tecblog/2017-2H/jwt/kid_bad.png)

JWSではヘッダーに"kid"というものが予約済みパラメーターとして定義されています。"kid"は必須ではありませんが、JWSの署名のためにどの鍵が使用されたのかを判断するために用いられます。

まずJWTのヘッダーの"kid"を元に鍵を取得し、ヘッダーの"alg"の値にあったアルゴリズムで検証するようなフローを想定します。

上記のようなJWTの署名検証フローの場合にJWTを改ざんする方法を説明します。"HS256"と"RS256"（RSA SHA-256）のアルゴリズムをサポートしているとします。RSA SHA-256の公開鍵は公開されており取得が容易であるとします。取得したその公開鍵を使って偽装したJWTの署名をHMAC SHA-256のアルゴリズムを用いて行います。そして、JWTのヘッダーの"alg"の値を"HS256"とし、"kid"は利用した公開鍵の値とします。すると、JWTの署名を検証する際にまず"kid"を元に鍵を取得するため、公開鍵を取得します。次に"alg"の値が"HS256"なので、公開鍵を用いてのJWTの署名の検証をHMAC SHA-256のアルゴリズム行うため、改ざんされているにもかかわらずJWTの署名検証が通ってしまいます。署名検証はHMAC SHA-256の共通鍵で行われることを想定していますが、RSA SHA-256の公開鍵を用いてJWTの署名が行われ、公開鍵を用いてJWTの署名が検証されているのが問題です。

これを防ぐためには、検証する側が"kid"で指定された鍵が"alg"で指定されたアルゴリズムの鍵であることをチェックする対策などが必要です。

![](https://s.yimg.jp/images/tecblog/2017-2H/jwt/kid.png)

このように誤った実装やライブラリーの利用をするとぜい弱性を作り出してしまう可能性がありますが、正しく利用すればJWTはとても便利なため、ぜひ活用してみてください。

# 他社の事例

JWTはOAuth 2.0やOpenID Connect以外にも利用されることもあり、他社でも活用されています。一例とはなりますが、他社のJWT活用事例を紹介します。

## SORACOM

SORACOM Endorseというサービスでは、Air SIMを使用しているデバイスに対して、SORACOMを認証プロバイダーとしてデバイスの認証を行っています。このサービスでは、デバイスがAir SIMを使用していて、SORACOM Airの回線を通じてネットワーク接続可能である状態を証明するトークンを発行していますが、このトークンもJWTのフォーマットとなっています。下記の記事では実際にSORACOM Endorseで発行されたトークンの検証を行っています。

## Amazon Cognito

モバイルアプリケーションのための、ユーザー管理、認証等の機能を提供するAmazon CognitoでもJWTが使われています。Amazon Cognitoの機能の一つにAmazon Cognito User Poolsというものがあり、モバイルアプリケーションやウェブアプリケーションにサインアップ、サインインの機能を簡単に追加できます。この機能を利用する際にも、ユーザーの認証に成功した後に、ID Token、 Access Token、Refresh Tokenが発行されますが、それぞれJWTのフォーマットとなっており、下記ではその構造などが説明されています。

- [Amazon Cognito とは](http://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)（外部サイト）

# まとめ

JWTについての説明、JWTのYahoo! JAPANにおける活用事例、他社の利用事例についてご紹介しました。JWTはBase64urlエンコードされた文字列で、署名、暗号化ができ、一般的にはOAuth 2.0やOpenID Connectに用いられています。Yahoo! JAPANにおいてもYahoo! ID連携 v2のID TokenなどにJWTのフォーマット利用しており、JWTは他社でもユーザーやデバイスの認証で用いられている技術であることを紹介しました。最後に、みなさんのサービスにYahoo! ID連携を導入してもらいユーザーによりよい体験を提供できるように努めていきますので、今後もYahoo! ID連携をよろしくお願いします。

※2017/12/06 記事の内容に関していくつか修正させていただきました。ご指摘いただいた皆様ありがとうございました。

- 誤字脱字の修正
- RFC7523に関する内容の修正
- リンクの修正

Yahoo! JAPANでは情報技術を駆使して人々や社会の課題を一緒に解決していける方を募集しています。詳しくは[採用情報](https://about.yahoo.co.jp/hr/)をご覧ください。

[前の記事へ](https://techblog.yahoo.co.jp/advent-calendar-2017/announce/)

[一覧へ戻る](https://techblog.yahoo.co.jp/)

[次の記事へ](https://techblog.yahoo.co.jp/advent-calendar-2017/web/auth/oauth2_device_flow_gyao/)

## 関連記事