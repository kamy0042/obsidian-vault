---
タグ: []
作成日時: 2023-01-13T01:13:00
URL: https://zenn.dev/mallowlabs/articles/cloudfront-functions-basic-auth
Tags: [topic/デザインシステム/配信基盤]
---
![[og-base_z4sxah 3.png]]

## はじめに

CloudFront + S3 で静的な Web サイトをホスティングしている。
 ステージング環境として同様のサイトを作ったが、超簡単なアクセス制限をかけるために BASIC 認証をかけたい。
 こういったケースでは Lambda@Edge を使うのが主流のようだが、最近リリースされた CloudFront Functions を使ってやってみた。

## 手順

CloudFront Functions のサイドバーに Functions メニューがあるので、そこから以下の内容で Functions を登録する。

```plain text
function handler(event) {
  var request = event.request;
  var headers = request.headers;

  // echo -n user:pass | base64
  var authString = "Basic dXNlcjpwYXNz";

  if (
    typeof headers.authorization === "undefined" ||
    headers.authorization.value !== authString
  ) {
    return {
      statusCode: 401,
      statusDescription: "Unauthorized",
      headers: { "www-authenticate": { value: "Basic" } }
    };
  }

  return request;
}

```

その後、Publish タブから **Publish** をする。

最後に Associate タブから Distribution と Cache behavior を選んで **Add association** する。
 この時、Event Type は `Viewer Request` を選ぶ。

しばらくまって、 CloudFront 経由でコンテンツにアクセスすると BASIC 認証が有効になっているはず。

## ポイント

CloudFront Functions は 1ms 以内に処理を返さないといけないので、予め BASE64 エンコーディングをかけておくのがポイント。
 このコードで authorization ヘッダーなしだと Compute utilization は `23` だった(この値が 100 を超えると CloudFront Functions では実行できないらしい)

## まとめ

CloudFront Functions 便利〜。