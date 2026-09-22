---
タグ: []
作成日時: 2022-12-20T17:19:00
URL: https://qiita.com/uzresk/items/ffba17c0a3554e8df8b0
Tags: [topic/デザインシステム/配信基盤]
---
More than 5 years have passed since last update.

# はじめに

S3のWebホスティングを使った場合のあるある設定をまとめてみます。
 書き途中ですがちびちび公開します。

## ステージング環境の限定公開

ステージング環境を用意した時に公開前のコンテンツはもちろん公開したくありませんが、S3ではBasic認証はサポートされていないため、別の手段でなんらかのアクセス制御を行う必要があります。
 ここではそのやり方について紹介します。

ここで紹介していないリファラを使ったアクセス制御などは下記を参照してください。[http://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/AccessPolicyLanguage_UseCases_s3_a.html](http://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/AccessPolicyLanguage_UseCases_s3_a.html)

### IPアドレスで制限

開発者ガイドでも紹介されていますが、IPアドレスを使って制限するのが一番簡単で且つ詐称しにくいのでお勧めです。
 ポリシーはこんな感じで書きます。

```plain text

{
    "Version": "2008-10-17",
    "Id": "Policy1415169329890",
    "Statement": [
        {
            "Sid": "Stmt1415169322264",
            "Effect": "Allow",
            "Principal": {
                "AWS": ""
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::uzr.staging/",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "XXX.XXX.XXX.XXX"
                }
            }
        }
    ]
}

```

このようにすれば、該当のIP以外からのアクセスは下記のように４０３エラーが表示されるようになります。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F576862Fc2f5a79e-728d-c9ff-dc1a-6f84e63ada37.png]]

ただし、このエラー画面ではあまりに不親切です。
 該当IP以外からのアクセスでもErrorDocumentだけ許可するようにポリシーを記載します。

```plain text

{
    "Version": "2008-10-17",
    "Id": "Policy1415169329890",
    "Statement": [
        {
            "Sid": "Stmt1415169322264",
            "Effect": "Allow",
            "Principal": {
                "AWS": ""
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::uzr.staging/",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "XXX.XXX.XXX.XXX"
                }
            }
        },
        {
            "Sid": "Stmt1415169322264",
            "Effect": "Allow",
            "Principal": {
                "AWS": ""
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::uzr.staging/error",
            "Condition": {
                "NotIpAddress": {
                    "aws:SourceIp": "XXX.XXX.XXX.XXX"
                }
            }
        }
    ]
}

```

## 404エラーページを設定する

website hostingでErrorDocumentにURLを指定しておくことでエラーになった場合にユーザに表示するドキュメントを指定することができます。
 apacheではErrorDocumentにあたります。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F576862F24192a61-032f-e232-ba3e-0c1dc94b26e4.png]]

ErrorDocumentと同じようにレスポンスコードに合わせてエラーのコンテンツを出し分けてみたいと思います。

### 404.htmlにリダイレクトする。

RedirectionRulesに記載してあげましょう。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F576862F4467eaca-51b5-5a7a-d6d2-850bd8980283.png]]

試してみます。
 301リダイレクトしたあとに200でコンテンツもとれているようです。
 ちなみにcurlの-Lオプションでリダイレクト先も追ってくれます。
 curl -I -L uzr.staging.s3-website-ap-northeast-1.amazonaws.com/a

```plain text

HTTP/1.1 301 Moved Permanently
x-amz-id-2: rHadFey6gNmNCJK3TwC6IdoTNc78wYO8p46Okxyigu+zLSVSf7EdeNvz08BiRGK/8nUeBhruKnc=
x-amz-request-id: 07ED0891921B9BF1
Date: Mon, 10 Nov 2014 04:11:13 GMT
Location: http://uzr.staging.s3-website-ap-northeast-1.amazonaws.com/404.html
Content-Length: 0
Server: AmazonS3

HTTP/1.1 200 OK
x-amz-id-2: W7nQlk86qEDeW3uL/ps5APPXw9ZfqPqWj+CV1triny9GYFlmxw1vlYnKcdQqC2qECIXo4WdmFGk=
x-amz-request-id: 54A8D6602377E95E
Date: Mon, 10 Nov 2014 04:11:13 GMT
Last-Modified: Mon, 10 Nov 2014 03:48:13 GMT
ETag: "1def52c025ed4f6296d633d4eaf2846c"
Content-Type: text/html
Content-Length: 10
Server: AmazonS3

```

curl -L uzr.staging.s3-website-ap-northeast-1.amazonaws.com/a

ReplaceKeyWithで何と何を置換しているかというと、要求されたURIと設定されたURLを置換しています。
 つまり今回の例では404エラーが発生した場合、aと404.htmlを置換してできたURLに301リダイレクトさせる。ということなります。

### 別ホストにリダイレクト

404エラーが発生したらあるホストにリダイレクトさせたい。と思ったときはこんなかんじで書いてあげます。ここではamazon.co.jpにリダイレクトさせてみました。

RoutingRules.xml

```plain text
<RoutingRules>
    <RoutingRule>
        <Condition>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <HostName>www.amazon.co.jp</HostName>
        </Redirect>
    </RoutingRule>
</RoutingRules>

```

### 別ホストのとあるページにリダイレクト

404エラーが発生したら別のbucketでwebhostingしているホストのredirect.htmlにリダイレクトさせてみます。

RoutingRules.xml

```plain text
<RoutingRules>
    <RoutingRule>
        <Condition>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <HostName>data.xxx.s3-website-ap-northeast-1.amazonaws.com</HostName>
            <ReplaceKeyWith>redirect.html</ReplaceKeyWith>
        </Redirect>
    </RoutingRule>
</RoutingRules>

```

結果

```plain text

air-2:Documents $ curl -I -L uzr.staging.s3-website-ap-northeast-1.amazonaws.com/a
HTTP/1.1 301 Moved Permanently
x-amz-id-2: SxBCf1/RYlDVLm4vl/SCCMkGPlqSsdnIR/4qbE86fIIVPx96+3cjqvoduzouPSLvV1Xiu2VttKk=
x-amz-request-id: 231ADED9001A1BA3
Date: Mon, 10 Nov 2014 04:48:55 GMT
Location: http://data.xxx.s3-website-ap-northeast-1.amazonaws.com/redirect.html
Content-Length: 0
Server: AmazonS3

HTTP/1.1 200 OK
x-amz-id-2: OR/9ckaf1rzsZ/K73XR40cYYT/f0lkXC/KPhfTEH2rPYBWC23dKQpsHoMsgaK1GO9OpjOv7TaX0=
x-amz-request-id: E834934465B8A05D
Date: Mon, 10 Nov 2014 04:48:55 GMT
Last-Modified: Mon, 10 Nov 2014 04:48:15 GMT
ETag: "9413dfc00206ab9df4284730a169e955"
Content-Type: text/html
Content-Length: 14
Server: AmazonS3


```

Register as a new user and use Qiita more conveniently

1. You get articles that match your needs
2. You can efficiently read back useful information

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

Comments