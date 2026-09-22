---
タグ: []
作成日時: 2022-08-01T01:59:00
URL: https://dev.classmethod.jp/articles/s3-cloudfront-static-site-design-patterns-2022/
Tags: [topic/デザインシステム/配信基盤]
---
![[amazon-cloud-front-960x504.png]]

しばたです。

[以前の記事](https://dev.classmethod.jp/articles/tips-for-cloudfront-default-root-object-2022/)でも触れた様にCloudFrontとS3を使って静的サイトを作る構成に対する理解にあいまいな部分があったので改めてまとめてみました。
 特に目新しい話も無く知っている人には当たり前の内容かもしれませんが、まあ、自分自身の理解を整理するために記事にしていきます。

## 1. S3静的ウェブサイトを使うパターン

はじめの構成は「S3静的ウェブサイト」を使ったパターンです。

S3にはバケットの内容を静的ウェブサイトとしてホストできる[静的ウェブサイトホスティング](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/WebsiteHosting.html)の機能があります。
 この機能ではHTTPのみ利用可能なためHTTPSを使う場合はCloudFrontと組み合わせる必要があります。

![[s3-cloudfront-static-site-design-patterns-2022-01.png]]

S3静的ウェブサイトを使うにはバケット内のコンテンツを公開する必要があり、S3バケットはパブリックアクセス可能にする必要があります。
 また、必ずHTTPのWEBサイトが公開されることになるためユーザーのアクセスをCloudFrontからのみに制限するのが一筋縄ではいきません。

### 設定例

簡単な例として`s3-site-test-20220730-1`という名前のS3バケットを用意し設定してみます。
 単純にHTTPサイトとして公開したい場合はバケット名の付け方に制約 [*1](https://dev.classmethod.jp/articles/s3-cloudfront-static-site-design-patterns-2022/#note-917582-1)がありますが、今回はCloudFrontと組み合わせますので名前はなんでも構いません。

S3バケットのプロパティから「静的ウェブサイトホスティング」を編集し、機能を有効にしてホスティングタイプを「静的ウェブサイトをホストする」にします。

![[s3-cloudfront-static-site-design-patterns-2022-02.png]]

その他の設定は環境に応じて異なりますが、今回はインデックスドキュメントを`index.html`にしています。

これで静的ウェブサイトが公開され`http://s3-site-test-20220730-1.s3-website-ap-northeast-1.amazonaws.com`というエンドポイントが割り当てられます。

![[s3-cloudfront-static-site-design-patterns-2022-03.png]]

この状態ではまだコンテンツが公開できないので「ブロックパブリックアクセス」設定を無効にして、

![[s3-cloudfront-static-site-design-patterns-2022-04.png]]

さらに以下の様なバケットポリシーを設定してコンテンツをパブリックにアクセス可能にします。

```plain text
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3-site-test-20220730-1/*"
        }
    ]
}
```

![[s3-cloudfront-static-site-design-patterns-2022-05.png]]

これでバケット内のオブジェクトがパブリックに公開されます。
 今回はバケットのルートに簡単な`index.html`を一つ配置しておきます。

`index.html`

```plain text
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>テストサイト</title>
</head>
<body>
Hello Classmethod!
</body>
</html>
```

これで`http://s3-site-test-20220730-1.s3-website-ap-northeast-1.amazonaws.com`にアクセスすると`index.html`の内容が表示されます。

続けてCloudFrontと連携してやります。

ディストリビューションを一つ作成し、オリジン設定に`http://s3-site-test-20220730-1.s3-website-ap-northeast-1.amazonaws.com`を指定します。
 S3バケット名ではないのでご注意ください。

![[s3-cloudfront-static-site-design-patterns-2022-08.png]]

S3静的ウェブサイトを使う場合オリジンタイプが`Custom Origin`になります。

合わせてビヘイビアも設定してやります。
 今回はシンプルに`デフォルト (*)`のみ設定しています。

これでCloudFrontからのアクセスもこの様に期待した表示となります。

本記事ではこれ以上解説しませんが、必要に応じて独自ドメインやサーバー証明書の設定をしてください。

### 補足 : カスタムヘッダーを使ったアクセス制御

先述の通りCloudFrontと連携してもHTTPサイト`http://s3-site-test-20220730-1.s3-website-ap-northeast-1.amazonaws.com`はアクセス可能です。

残念ながらユーザーのアクセスをCloudFrontからのみに強制する手段はありません。
 代替策としてCloudFrontで独自のヘッダー(リファラ)を付けてやり、このリファラが設定されている場合のみS3静的ウェブサイトにアクセスできる様にすることであれば可能です。

![[s3-cloudfront-static-site-design-patterns-2022-12.png]]

まずはCloudFrontのオリジン設定から「カスタムヘッダーを追加」してやり、`Referer = xxxxxxxxxxxxxxxxxxxx (推測しにくい任意の値)`とリファラを追加します。

![[s3-cloudfront-static-site-design-patterns-2022-13.png]]

次にS3のバケットポリシーに以下の様な`Condition`を追加してやります。
 IAMポリシーの[グローバル条件キー](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-useragent)に接続元のリファラを検査する`aws:Referer`があるので、この値がCloudFrontで設定したものと一致するか判定し、一致した場合のみアクセスを許可してやるわけです。

```plain text
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3-site-test-20220730-1/*",
            "Condition": {
                "StringEquals": {
                    "aws:Referer": "xxxxxxxxxxxxxxxxxxxx"
                }
            }
        }
    ]
}
```

![[s3-cloudfront-static-site-design-patterns-2022-14.png]]

この設定をした後はブラウザから直接`http://s3-site-test-20220730-1.s3-website-ap-northeast-1.amazonaws.com`にアクセスしてもリファラが付いていないのでアクセスエラーとなります。

ただ、リファラは簡単に偽装できますのでこの設定が完璧ではないことは予めご了承ください。

## 2. S3 REST APIを使うパターン

次のパターンはAWS上決まった呼称が無い [*2](https://dev.classmethod.jp/articles/s3-cloudfront-static-site-design-patterns-2022/#note-917582-2)様なので便宜上「REST APIを使うパターン」と表記しています。

このパターンではCloudFrontのオリジンに通常のプライベートなS3バケットを指定します。
 CloudFrontに[Origin Access Identity (OAI)](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)と呼ばれる特別なユーザーを作成し、このOAIに対し`s3:GetObject`を許可するバケットポリシーを設定することでプライベートなバケット内のコンテンツにアクセス可能にしています。

このためCloudFrontからS3のアクセスは通常のAWS REST API(HTTPS通信)となります。

### 設定例

こちらの例として`s3-site-test-20220730-2`という名前の新しいS3バケットを用意して設定していきます。

コンテンツは前のパターンと同じ`index.html`を配置しておきます。

このバケットでは静的ウェブサイトホスティングは無効のままです。

ブロックパブリックアクセス機能も有効にしています。

ここで一旦CloudFrontに移り、「オリジンアクセスアイデンティティ」設定から新しい「オリジンアクセスアイデンティティを作成」します。

![[s3-cloudfront-static-site-design-patterns-2022-20.png]]

作成ダイアログが表示されたら任意の名前を入力し「作成」します。

作成されたOAIにはランダムなID(下図では`EU82XXXXXXXXXX`)が付きますのでこのIDを控えておきます。

S3に戻り以下の様に`Principal`をOAIにして`s3:GetObject`を許可するバケットポリシーを設定します。

```plain text
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PolicyForCloudFrontPrivateContent",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EU82XXXXXXXXXX"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3-site-test-20220730-2/*"
        }
    ]
}
```

![[s3-cloudfront-static-site-design-patterns-2022-23.png]]

これでCloudFrontからS3に対して`GetObject`出来る様になるわけです。

S3バケットの設定はこれで完了です。
 あとはCloudFrontのオリジンにS3バケット`s3-site-test-20220730-2`を追加します。

![[s3-cloudfront-static-site-design-patterns-2022-24.png]]

その際に「S3バケットアクセス」設定を

- OAIを使用する
- オリジンアクセスアイデンティティを前節で作ったものを指定
- バケットポリシーの更新は手動 (今回は事前にポリシー設定済みのため)

にしてやります。
 作成後のオリジンタイプが`S3`になっていればOKです。

併せてビヘイビアも変えておきます。

あとは環境に応じてよしなにCloudFrontの設定を変更してやればOKです。
 今回は一般設定の「デフォルトルートオブジェクト」を`index.html`にしています。

![[s3-cloudfront-static-site-design-patterns-2022-27.png]]

こちらは[以前の記事](https://dev.classmethod.jp/articles/tips-for-cloudfront-default-root-object-2022/)で紹介した通りの挙動の違いがあるためです。

最後にブラウザからアクセスしてやればS3静的ウェブサイトを使うパターンと同様にコンテンツが表示されます。

## パターンの使い分け

2つのパターンについて説明しましたが、それぞれどう使い分けるべきかについては未だ明確な答えを出せていません。

HTTPSが普及していなかった昔であれば「まずは静的ウェブサイトホスティングを使いHTTPでサイト公開、必要に応じてCloudFrontを使いHTTPS化する」といった使い方がメジャーだったと思います。
 2022年現在であれば逆にHTTPでサイトを公開する必要性が薄いので「REST APIを使いHTTPSサイトのみ公開」の方が良い気がしています。

また、静的ウェブサイトホスティングで持っている「インデックスドキュメント機能」や「リダイレクト機能」を使いたい場合は今でも静的ウェブサイトホスティングを選んだ方が楽でしょう。
 とはいえREST APIを使うパターンでもLambda@EdgeやCloudFront Functionsを組み合わせることでこれらの機能を代替することが可能です。

これ以外の両者の細かい差異が以下に記載されていますので、こちらの内容を踏まえて選択しても良いでしょう。

- [ウェブサイトエンドポイントと REST API エンドポイントの主な違い](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/WebsiteEndpoints.html#WebsiteRestEndpointDiff)

他にはセキュリティ要件により経路暗号化が求められる場合はREST APIを使うパターンを選ぶしかありません。
 (とはいえ静的なサイト構築で経路暗号化が求められるケースは少ないとは思いますが...)

個人的には「まずはREST APIを使うパターンで設計し、インデックスドキュメントなどの機能が必要で構成をシンプルにまとめたい場合にのみ静的ウェブサイトホスティングを使う」のが良いのかな、と、いまのことろ考えています。
 (まだ完全に考えがまとまってないので将来的には考えを改めるかもしれません。)

## 最後に

以上となります。

個人的な理解の整理のためにダラダラ書き連ねてきましたが、本記事をご覧の皆さんにもなにか役立つことがあれば幸いです。

## 脚注

![[loading.png]]