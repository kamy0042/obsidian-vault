---
type: summary
updated: 2026-07-25
---

# CloudFrontとS3で作成する静的サイト構成の私的まとめ  DevelopersIO 要約

ソース: [[CloudFrontとS3で作成する静的サイト構成の私的まとめ  DevelopersIO]]

Classmethod のしばた氏が、CloudFront と S3 で静的サイトを構築する2つのパターンを設定例付きで整理した記事。
パターン1「S3 静的ウェブサイトホスティング」は HTTP のみ対応でバケットのパブリック公開が必須となり、CloudFront 経由に限定するにはカスタム Referer ヘッダーと `aws:Referer` 条件付きバケットポリシーで制限するしかないが、リファラは偽装可能で完璧ではない。
パターン2「REST API を使うパターン」は、Origin Access Identity (OAI) に `s3:GetObject` を許可することでプライベートバケットのまま CloudFront から HTTPS でアクセスでき、パブリック公開が不要になる。
使い分けとして、HTTPS が標準の2022年現在は REST API パターンを基本とし、インデックスドキュメントやリダイレクト機能が必要な場合のみ静的ウェブサイトホスティングを選ぶのが良いというのが筆者の暫定的な結論である（REST API パターンでも Lambda@Edge や CloudFront Functions で代替可能）。
また経路暗号化が要件にある場合は REST API パターン一択になると補足している。
