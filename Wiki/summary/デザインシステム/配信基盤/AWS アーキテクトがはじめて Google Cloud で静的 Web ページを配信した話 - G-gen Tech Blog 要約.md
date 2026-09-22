---
type: summary
updated: 2026-07-25
---

# AWS アーキテクトがはじめて Google Cloud で静的 Web ページを配信した話 - G-gen Tech Blog 要約

ソース: [[AWS アーキテクトがはじめて Google Cloud で静的 Web ページを配信した話 - G-gen Tech Blog]]

みずほリサーチ&テクノロジーズの小野寺氏が、AWSアーキテクトの経験をもとに初めてGoogle Cloudで社内向け静的Webページ（Nuxt.js製、IPアドレス制限あり）を配信した経緯を記したG-genとのコラボ記事。
当初はAWSのCloudFront+WAF+S3構成をGoogle Cloudに置き換え、Cloud Load Balancing+Cloud Armor+Cloud Storageの構成を検討した。
しかし検証の結果、Cloud Storageの静的ウェブサイトホスティングではLoad Balancingを迂回する直接アクセスを拒否できず、オリジン保護ができないことが判明した。
そのためCloud Storageを諦めてCloud Runに切り替え、アクセス元をLoad Balancingに限定してオリジンを保護し、Source RepositoriesとCloud Buildでmasterブランチへのpushから自動デプロイされる構成を実現した。
結論として、類似サービスでも細かな仕様差により非機能面で思わぬ落とし穴があるため十分な検証が必要であり、マネージド範囲のバランスが良いCloud Runは特にお勧めだと述べている。
