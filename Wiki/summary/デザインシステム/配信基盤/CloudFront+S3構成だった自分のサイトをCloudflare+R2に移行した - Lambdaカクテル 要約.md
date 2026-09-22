---
type: summary
updated: 2026-07-25
---

# CloudFront+S3構成だった自分のサイトをCloudflare+R2に移行した - Lambdaカクテル 要約

ソース: [[CloudFront+S3構成だった自分のサイトをCloudflare+R2に移行した - Lambdaカクテル]]

Lambdaカクテル（blog.3qe.us）の著者が、CloudFront＋S3（間に ALB を挟む構成）で配信していた自分の静的サイトを Cloudflare＋R2 に移行した記録。
クリップ本文の大半は手描き構成図などの画像で、旧構成では HTTPS を受ける CloudFront の背後に ALB を経由して S3 へルーティングしていたこと、移行後は Cloudflare Worker（Denoflare でデプロイ）が R2 からコンテンツを配信し DNS も Cloudflare の CNAME レコードで管理する構成になったことが図から読み取れる。
R2 という名前が S3 から文字も数字も1つずつ若い Cloudflare 流の対抗命名であることもネタとして図示されている。
オチとして、移行後に「CloudFront のオリジンに S3 バケットを直接指定すれば ALB は要らなかった」という指摘を受け、著者は「マジかよ！まあいいか」と締めている。
つまり移行の一因だった ALB のコストは、実は AWS のままでも構成変更で解消できたというのが本記事の落ちである。
