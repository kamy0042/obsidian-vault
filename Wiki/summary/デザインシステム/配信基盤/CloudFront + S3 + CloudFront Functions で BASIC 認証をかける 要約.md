---
type: summary
updated: 2026-07-26
---

# CloudFront + S3 + CloudFront Functions で BASIC 認証をかける 要約

ソース: [[CloudFront + S3 + CloudFront Functions で BASIC 認証をかける]]

CloudFront + S3 の静的サイトのステージング環境に簡易アクセス制限をかけたい、というケースを CloudFront Functions で解決する手順記事。
主流の Lambda@Edge ではなく、より軽量な CloudFront Functions で authorization ヘッダーを検査する関数を登録し、Viewer Request イベントに関連付けるだけで BASIC 認証が実現できる。
CloudFront Functions は 1ms 以内に処理を返す必要があるため、認証文字列は事前に BASE64 エンコードして定数として埋め込むのがポイント。
掲載コードの Compute utilization は 23 で、上限値 100 に対し十分な余裕があり、この用途には Lambda@Edge を持ち出すまでもないと結論づけている。
