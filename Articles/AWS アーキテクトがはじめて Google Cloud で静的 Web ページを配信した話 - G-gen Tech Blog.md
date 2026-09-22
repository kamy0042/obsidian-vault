---
タグ: []
作成日時: 2023-01-18T10:49:00
URL: https://blog.g-gen.co.jp/entry/static-website-on-google-cloud
Tags: [topic/デザインシステム/配信基盤]
---
当記事は [みずほリサーチ&テクノロジーズ × G-gen エンジニアコラボレーション企画](https://g-gen.co.jp/news/g-genmizuho-rt.html) で執筆されたものです。

はじめまして、みずほリサーチ&テクノロジーズの小野寺と申します。 みずほでは 2022 年 3 月に発表した [Google との戦略的提携](https://www.mizuho-fg.co.jp/release/20220323release_jp.html) の一環として Google Cloud の活用に取り組んでいます。

この記事では AWS のアーキテクトを経験してきた著者がはじめて Google Cloud で社内向けの静的 Web ページを配信するまでの経緯を記述しています。
 Single Page Application を Google Cloud で構築予定の方や、これから Google Cloud に取り組む方の参考となれば幸いです。

![[20230112175314.png]]

当ブログは G-gen × みずほRT によるコラボ記事です

- [システム特性](https://blog.g-gen.co.jp/entry/static-website-on-google-cloud#%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E7%89%B9%E6%80%A7)
- [初期構成の検討](https://blog.g-gen.co.jp/entry/static-website-on-google-cloud#%E5%88%9D%E6%9C%9F%E6%A7%8B%E6%88%90%E3%81%AE%E6%A4%9C%E8%A8%8E)
- [その他](https://blog.g-gen.co.jp/entry/static-website-on-google-cloud#%E3%81%9D%E3%81%AE%E4%BB%96)
- [まとめ](https://blog.g-gen.co.jp/entry/static-website-on-google-cloud#%E3%81%BE%E3%81%A8%E3%82%81)

# システム特性

先ずは配信する静的 Web ページの特徴（システム特性）についてまとめます。

題材の静的 Web ページは社内向けに Google Cloud の情報を発信する Web サイトです。 ポイントとなるシステム特性は以下の 3 点です。

1. 将来的に Google Cloud のサービスとの連携を予定している。Google Cloud のサービスを使用して配信する
2. 既存のインフラになるべく手を入れず、運用負荷が低い構成を優先する。通信はインターネット経由とする
3. 利用者は社員のみ。アクセス元 IP アドレスによりアクセスを制限する

# 初期構成の検討

構成を検討するにあたり、先ずは経験のある AWS のサービスによる構成を考えました。 AWS での静的 Web サイト配信では Cloud Front 、WAF、S3 （静的サイトホスティング）を組み合わせるパターンが一般的です。

静的 Web サイトは Nuxt.js で開発し、リポジトリでソースを管理します。 特定の git ブランチに更新が発生した際に自動でデプロイされるようにしたいです。

また、Google Cloud には VPC Service Controls というサービスがあり、Google Cloud の API に対するアクセスを制御することができます。 アクセス元 IP アドレスによるアクセス制限で利用できそうなので、VPC Service Controls も検証してみます。

これを基本に、Google Cloud で対応するサービスに置き換えることで構成の初期案を作成しました。

| 役割 | AWS | Google Cloud |
| --- | --- | --- |
| WAF との連携によるオリジン保護 | Cloud Front | Cloud Load Balancing |
| WAF (アクセス可能なＩＰアドレスの制御) | WAF | Cloud Armor |
| 静的コンテンツの配置・配信 | S3 | Cloud Storage |
| リポジトリ | Code Commit | Source Repositories |
| 継続的デプロイ | Code XXX(Code Pipeline, Code Buildなど) | Cloud Build |
| アクセス可能なＩＰアドレスの制御 | - | VPC Service Controls |

![[20230105145653.png]]

初期構成案

# Cloud Load Balancing と Cloud Armor

Cloud Load Balancing はクライアントから見た最前面にあります。 今回はクライアントとの通信でインターネットを利用しますので、 アクセス元 IP アドレスベースのアクセス制御 と 十分に安全なアルゴリズムを使用した通信の暗号化 が必要になります。

Cloud Armor のセキュリティポリシーではクライアントの情報に基づいて Cloud Load Balancing へのアクセスを許可 / 拒否することができます。 アクセス元 IP アドレスを参照するアクセス制限が実現できます。 それ以外にも、[地理的条件やレートベースのアクセス制御](https://cloud.google.com/armor/docs/security-policy-overview?_ga=2.236551815.-767268019.1643334553#about)も実現できます。

Cloud Load Balancing では SSL 証明書を配置することで、クライアントとの通信暗号化が可能です。 今回は最も手のかからない Google マネージドの SSL 証明書を利用しました。 Google マネージドの SSL 証明書では DNS レコードを追加するだけで Google が証明書を発行・Cloud Load Balancing への配置まで実施してくれます。

また、Cloud Armor の SSL ポリシーを使用すると脆弱な暗号化方式による通信を拒否することができます。

これらにより、クライアント ⇔ Cloud Load Balancing の通信を保護することができました。

同様の構成を検討する場合、以下の点に留意してください。

- Cloud Armor が併用可能な HTTP（s）ロードバランサは グローバル外部 HTTP(S) ロードバランサ のみ
- Google マネージドの SSL 証明書には厳格な審査プロセスはない（EV 証明書などが求められる場合は利用不可）
- Google マネージドの SSL 証明書は持ち出し不可

# Cloud Storage から Cloud Run への切り替え

## Cloud Storage の検証

初期構成案を実装・検証してみると、以下のことがわかりました。

- **Cloud Storage 単体のアクセス制御では、アクセス元 IP アドレスのみを条件にすることはできない**

Cloud Storage へのアクセスは IAM によって制御します。 IAM では Principal（操作する主体）として Google アカウント、もしくは allUsers、allAuthenticatedUsers を指定します。
 また、IAM には IAM の条件という設定があり、IP アドレスや操作時刻の条件を追加することができます。 IAM 条件でアクセス元 IP アドレスを指定した allUser に対して Storage レガシーバケット読み取りの権限を付与すれば、アクセス元 IP アドレスのみを参照するアクセス制御ができそうです。
 しかし、Principal に allUsers/allAuthenticatedUsers を指定する場合は IAM の条件を指定することはできません。

- **VPC Service ControlsでCloud Storage 静的ウェブサイトホスティングへのHTTPアクセスを保護できる**

VPC Service Controls の保護対象は Google Cloud の API ですが、Cloud Storage 静的ウェブサイトホスティングでのHTTPアクセスも VPC Service Controls で保護されるようです。

- **Cloud Load Balancing と組み合わせたとしても、Cloud Storage への直接アクセスを制限することはできない**

Cloud Storage では Cloud Load Balancing を介して配信するように設定可能ですが、その場合も Cloud Storage への直接のアクセスを禁止することができません。 すなわち、オリジンを保護することができません。

## 構成の見直し Cloud Run への切り替え

Cloud Storage 静的ウェブサイトホスティングではオリジンの保護ができない（ Load Balancing を迂回するアクセスを拒否できない）ことがわかりました。 Load Balancing + Cloud Armor により、SSLポリシーによる通信の暗号アルゴリズム制限などを実装しています。 Load Balancing を迂回するアクセスは Cloud Armor で保護されませんので、オリジンへの直接アクセスは許容できません。

そこで Cloud Storage をあきらめ、Cloud Run を利用することにしました。 Cloud Run はコンテナイメージを Google Cloud 管理のマシン上で実行できるマネージドサービスです。
 Cloud Run では Cloud Run へのアクセス元を Cloud Load Balancing に限定することで、オリジンを保護できます。
 コンテナイメージの作成と登録が必要になりますが、静的 Web ページで利用している Nuxt.js では[公式ガイドに Cloud Run へのデプロイ方法が掲載](https://nuxtjs.org/deployments/google-cloud-run/)されており、スムーズにデプロイすることができました。

また、Cloud Build を利用することで Cloud Run への継続的デプロイを構成することができます。 Source Repositories でのコード管理、 Cloud Build によるパイプラインの構築によって master ブランチに push するだけで Cloud Run に最新の Frontend アプリケーションがデプロイされるようになりました。

最終的に以下の構成となりました。

![[20230105145338.png]]

最終的な構成

# その他

記事が冗長になってしまうので詳細は省略しますが、その他の気になった点です。

- Cloud Run の利用体験はすばらしかった 
    - すぐに利用できた。AWS の類似サービスでは VPC の構築、クラスタ定義等が必要だが Cloud Run では必要ない。
    - Cloud Run 自体もエンドポイントを持つ。Cloud Load Balancing を使用せず、直接独自ドメインで公開することもできる。
    - Google Cloud の他サービスとの連携が充実している。時刻起動させたり、キューをトリガーにすることもできる。
- Web Security Scanner は同じ Google Cloud プロジェクトにある固定 IP アドレスに対してのみ利用可能。
- Source Repositories は最低限の機能しかない。例えばプルリクはなく、ブランチの保護もできない。

# まとめ

書いてしまえば当たり前なのですが、類似サービスといえど細かな仕様の違いがあります。 一見、同じような構成だとしても前述のオリジン保護のように非機能面で思わぬ落とし穴が潜んでいるかもしれません。 構成の検討に当たっては十分に検証しましょう。

個人的な感想ですが Cloud Run は設定可能な範囲と Google マネージドな範囲のバランスがよく、特にオススメできます。

最後まで読んでいただきありがとうございました。 どなたかの助けになれば幸いです。

みずほリサーチ&テクノロジーズ

2019年よりクラウドアーキテクトとして、主にAWSへのマイグレーションプロジェクトで活動。 2023年現在はGoogle Cloudの社内向け環境や教育コンテンツの整備を実施中。