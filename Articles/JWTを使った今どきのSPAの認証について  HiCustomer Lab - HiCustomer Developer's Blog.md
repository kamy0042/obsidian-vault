---
Created: 2021-09-13T14:09:00
URL: https://tech.hicustomer.jp/posts/modern-authentication-in-hosting-spa/
Tags: [topic/技術/セキュリティ]
---
![[eyecatch-tech.png]]

## TL;DR

- JWTはCookieを使った認証の代わりに使うのはきつい。
    - コードを静的にホスティングしているSPAの話。
    - JWTの有効期間を長くすれば危険で、短くすればUXが犠牲になるというトレードオフがある。
- AWS AmplifyはlocalStorageにJWTを保存
    - 悪意のあるThird partyライブラリが混ざっていたらJWTを抜かれる。
    - yarn.lockが依存している全ライブラリを監査することはつらい。
- Auth0ではiFrameを活用してメモリ上にJWTを格納できる
    - Auth0いいね😍

## まくら

Youtubeが大好きなHiCustomerの小田です。ちょっと遅いですが年明け最初のエントリーです。今年もテックブログをよろしくお願いします😎ちなみに、気分がいいので年明けに観ていたYoutubeのエントリーの中で一番おもしろかった動画を紹介します。世界中で有名な「Auld Lang Syne」という曲のルーツを辿った動画です。この曲は、アメリカでよく大晦日に流れ、オランダでもサッカーの試合で使用されます。日本では蛍の光として愛されているあの曲です。「なぜ世界中でこの曲が、同じようなコンテキストで流れているのか？」といった根本的な謎は解明してくれないんですが結構面白かったです。コメント欄も世界中の人がこの曲をどう感じているのかがわかってへーって感じでした。時間が切り替わるタイミングで過去を振り返り、過去に思いをはせ、なんとも言えない気持ちになるのは、当たり前なんですが人類共通なのかもしれません。

## 前提条件

本題のSPAの認証ですが、前提として現在弊社ではRailsからフロントエンドのコードを切り離しています。そして最終的にはRailsを消そうとしています。できるだけコンポーネント間を疎結合にして、開発をスケールさせたり保守しやすくしたり、ときには実装を捨てやすくすることが、その主な意図になります。

フロントエンドを切り離したあとの流れとしては、Next.jsやNuxt.jsといった薄いBFFを用意するのが定石らしいですが、以下の理由で弊社ではフロントエンドのコードをただホスティングするだけにしたいと考えています。

- Railsにほとんどロジックがない。組織情報などのマスターデータの管理のみ。
- 既に大量のバックエンドのAPIがLambdaで実装されている。
- そのため、本当にほしいのはBFFではなくAppMeshや素のEnvoyなどのProxy。デプロイのことを考えると、サービスディスカバリーやL7のルーティングなどがほしい。

以上が前提条件です。

## JWTはCookieを使った認証の代わりにならない

まず、既にバックエンドのAPIとはJWTを使って認証しているため、ホスティングされたフロントエンドの認証に流用できないかどうか検討しました。以下のような流れです。

- ユーザはログイン画面で認証情報を入力してログインする。
    - 入力された認証情報はバックエンドに送信し認証される。バックエンドで認証に通るとJWTがフロントに返却される。
- フロントはログイン後に受け取ったJWTを以降のバックエンドとの通信の認証に使用する。

ここまでは何も問題ないですが、この後を考えるとすぐに問題にぶち当たりました。あがってきた問題は以下になります。

- JWTの有効期間が切れた後に、再度ログイン画面を表示する必要がある。JWTが切れるたびにログイン情報を入力させるのは、Cookieを使用したステートフルな認証に比べてUXが劣る。
- JWTは有効期間を長くすると危険。今回の用途だとJWTは、HttpOnly cookiesのようにJSからアクセスできない領域に保存できないため、常に漏洩のリスクと戦うことになる。npmの最近のCVEを見る限り、Third partyのJSライブラリを全て監査することは不可能。そのためあまり有効期限を長くできない。これはrefresh tokenの仕組みを使っても同じ。

結局、JWTの有効期間を長くすれば危険で、短くすればUXが犠牲になるため、Cookieを使った認証の代わりにするのは難しいことがわかりました。そのため、JWTの典型的な使用方法である、以下のようなSSOを使った認証を行う方向に切り替えました。

- ログイン時はSSOサーバとCookieを使った認証を行う。このときにJWTのトークンを発行する。
- フロントはログイン後に受け取ったJWTを以降のバックエンドとの通信に使用する。
- JWTが切れた場合はSSOサーバとセッションの経路で再発行する。

方針が決まったので次はSSOをどうするか考えました。

## AWS CognitoにするかAuth0にするか

まず以下の理由から、どのSSOの仕組みを採用するかではなく、どの認証のフルマネージドのサービスを利用できるかを考えました。

- 過去にSAMLやOpenID Connectを使用した経験から、Identity ProviderやOpenID Providerをセキュアに運用するのはシード期のスタートアップには高コストすぎる。
- どうせまともなフルマネージドのサービスならFederationと呼ばれる仕組みにより、複数のSSOの仕組みをつなげることができる。そのため、もはやSAMLかOpenID Connectかの差異は大きくない。

弊社のシステムはほぼAWS上で動作しているため、まずはAWS Cognitoを、続いて比較用途としてAuth0を検討しました。個人的なイメージとしては、Firebase Authenticationが一番セキュアですぐに組み込んで使えて、一番便利そうなんですが🤪。。。ちなみに、どちらも以下のような認証のSaaSに求められる主な機能は揃っていて基本機能に大差はなかったです。

- MFA(Multi Factor Authention)
- 認証の前後でのフックとロギング
- Identity Providerと連携するAPI
    - プロビジョニングで使用
- Third partyのIdentity ProviderとのFederation

各サービス毎に特徴的だなと思ったのは以下の機能です。

- AWS Cognito
- Auth0
    - プロビジョニングなしでの既存システムとの連携
        - カスタムデータベースという機能が存在し、この機能を使用するとまずAuth0から既存システムのデータベースに問い合わせを行い、ユーザがなかったらAuth0のIdentity Providerで認証をするという仕組みが可能。この機能はかなりあつい。ただしエンタープライズプランからのみ。

一通り調べた後に、JWTの扱いだけを深掘りしてさらに調べました。

## AWS AmplifyはlocalStorageに認証情報を保存

CognitoとはAWS Amplifyが提供するクライアントライブラリを使用して、認証を行うのが定石らしいです(Cognitoが提供するクライアントライブラリもありますが、非推奨になっています)。AWS Amplifyで認証を行うサービスは [https://aws-amplify.github.io/docs/js/authentication](https://aws-amplify.github.io/docs/js/authentication) になります。このサービスはsignupを呼び出すとログインできて、singoutを呼ぶとログアウトできる非常にシンプルなライブラリです。実際に、サンプルを実装した際もめちゃめちゃ簡単でした。

ただ、一点微妙だったのは [https://aws-amplify.github.io/docs/js/authentication#managing-security-tokens](https://aws-amplify.github.io/docs/js/authentication#managing-security-tokens) の以下の記載でした。

> When using Authentication with AWS Amplify, you don’t need to refresh Amazon Cognito tokens manually. The tokens are automatically refreshed by the library when necessary.

言いたいことはわかるんですが、ホスティングしているSPAに組み込んで安全かどうかはこれだけでは判別が難しいです。SPAの場合はこうやるべきみたいなドキュメントもなく、どのタイミングでどのような方法でtokenをrefreshしているのかがわからないと正直不安です。そのため、ソースコードを深掘しててみたところ、結構微妙でした。

- tokenを取り出すたびにexpireしているかどうか検証し、している場合はrefreshする。
    - [https://github.com/aws-amplify/amplify-js/tree/aws-amplify%401.1.19/packages/amazon-cognito-identity-js/src/CognitoUser.js#L1142](https://github.com/aws-amplify/amplify-js/tree/aws-amplify%401.1.19/packages/amazon-cognito-identity-js/src/CognitoUser.js#L1142)
- tokenはlocalStorageに保存する。

上記の実装だと、一番安全に管理しなければならないrefresh tokenをlocalStorageに格納しているため、このtokenは悪意のあるThird partyのライブラリが読み込まれていた場合、簡単に抜かれてしまいます。正直、yarn.lockで依存している全ライブラリを監査できないのでこれは結構怖いです。AWSのsupportにも確認したところ現在の仕様とのことでした。同じ問題点を指摘した下記のような機能追加のリクエストも認識しているとのことですが、今のところはどうにもしようがないそうです。

結論としては、現段階ではSPAで使用するのは少し微妙かなと考えています。

## Auth0ではiFrameを使うことでメモリ上に認証情報を格納できる

調べる前は期待していなかったんですが、Auth0はSPA用のドキュメントがかなり充実していました。

- [https://auth0.com/docs/architecture-scenarios/spa-api](https://auth0.com/docs/architecture-scenarios/spa-api)
    - SPA用のチュートリアル
- [https://auth0.com/docs/api-auth/tutorials/silent-authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication#renew-expired-tokens)
    - SPAで使用する認証方式の説明

特にrefreshに関する説明がきちんとしていて、どのようにどのタイミングでrefreshすべきかが明確でした。[https://auth0.com/docs/api-auth/tutorials/silent-authentication#renew-expired-tokens](https://auth0.com/docs/api-auth/tutorials/silent-authentication#renew-expired-tokens)

> Since Single Page Applications cannot request or use Refresh Tokens to renew an expired token, a silent authentication request can be used instead to get new tokens as long as the user still has a valid session at Auth0.

実装を読んだ限りもずれはなかったです。この実装ならtokenをlocalStorageに保存せずにメモリに持っておくことが可能です。

- renewAuthでauth0と通信するiframeを生成し認証情報をlocaltion.hashかまたはpostMessage経由で取得する。

一つ残念だったのは、ライブラリはout of the boxで使用できるようなものではなかったです。非同期処理もPromiseではなく昔ながらのcallback形式ですし(これはCognitoも一緒ですが)、それなりに愚直にかかないといけないです。そのため、品質がアプリケーションプログラマの実装によってブレる気がします。ブログなどでAuth0を使ってみた系の記事があるんですが、かなり品質があやしいものが結構ありました。まあこの記事もあやしいブログなんですが😅

結論としては、SPAでの選択としてめちゃめちゃありな気がします🙆

## まとめ

まとめると認証めんどくさいですね。ただ、現在の構成でこのへんがスッキリするとフロントエンドのコードがかなり書きやすくなるため頑張っています。他にもTypeScriptの導入なども行っているのでかなりフロントエンドのコードが書きやすくなってくるはずです。

ちなみに弊社ではフロントエンドをゴリゴリ進めてくれるリードエンジニアを募集しています。フロント以外のめんどくさいのは私が全部面倒見るので、ある程度フロントに集中できる環境は提供できるのかなと思います。興味をもたれたかたは、ぜひ弊社のナイスガイ肥前までTwitter経由でご連絡ください。肥前は、知的に誠実で話がわかる上司のため一緒に仕事をしやすいですよ😎😎😎

余談ですが、実は気になったのでFirebase Authenticationも調べていました。実装はAuth0が採用した方式(iFrameを生成しlocation.hashかpostMessageで取得する)に近いものでした。ただし、動作確認していないので間違っているかもしれません。詳しい方がいらしたらぜひSNS経由で教えていただけると喜びます。Cognitoがもっと進化してくれるとめちゃめちゃ嬉しいんですが👼