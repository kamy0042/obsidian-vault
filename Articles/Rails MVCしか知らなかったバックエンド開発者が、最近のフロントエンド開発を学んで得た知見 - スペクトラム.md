---
Created: 2021-02-22T11:24:00
URL: https://ksss9.hatenablog.com/entry/2021/02/20/155051
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
これは、これまで[Rails](http://d.hatena.ne.jp/keyword/Rails)の古き良き[MVC](http://d.hatena.ne.jp/keyword/MVC)な開発体制しか知らなかったバックエンド開発者が、環境が変わってフロントエンド開発を学ばざるをえなくなった者の記録です。

歴史的に正しい事実を書いたものではなく、私個人の理解を整理するための妄想日記です。

私はこれまではWebアプリの開発ばかりやってきて、[Rails](http://d.hatena.ne.jp/keyword/Rails)でHTMLテンプレートエンジン使ってviewを作るスタイルでしか開発してきませんでした。

![[20210221232753.png]]

しかし、ネイティブフロントとWebフロント両方があるアプリケーションが開発されているところを見て、ある事を思いつきました。

「Webフロントもネイティブフロントのように開発できれば、バックエンドエンジニアはバックエンドに、フロントエンドエンジニアはフロントエンドに分業できて、開発しやすくなるのでは？」

![[20210221232937.png]]

この気付きが超重要でした。このイメージを持てたおかげでフロント開発の意義がスルスル入ってきました。

[Rails](http://d.hatena.ne.jp/keyword/Rails)は[フルスタックフレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EB%A5%B9%A5%BF%A5%C3%A5%AF%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)なので、[Rails](http://d.hatena.ne.jp/keyword/Rails)でHTMLを生成して返すことができますが、その開発体制だと、「バックエンドエンジニアは、得意なバックエンドを沢山書いて、不得意なフロントエンドをちょっと書く。フロントエンドエンジニアは得意なフロントエンドを沢山書いて、不得意なバックエンドをちょっと書く。」ということが起こっていたように思います。

だんだんと、「ちょっと不得意な人が書いたコード」が増えていきます。レビューで指摘しあえれば良いのですが、なかなか完璧にはいきません。

もし、[Rails](http://d.hatena.ne.jp/keyword/Rails)のV部分を引き剥がして、フロントエンドが得意なエンジニアに開発を任せることができれば、[Rails](http://d.hatena.ne.jp/keyword/Rails)は[API](http://d.hatena.ne.jp/keyword/API)だけでよくなり、ネイティブフロントもWebフロントも同じように[API](http://d.hatena.ne.jp/keyword/API)を提供する形で開発できます。

どうやらこれを実現するのがSPA(シングルページアプリケーション)という事なのかなと思います(多分間違ってる)。

だからこそ[Rails](http://d.hatena.ne.jp/keyword/Rails)で[API](http://d.hatena.ne.jp/keyword/API)モードができたり、PWAだとかいう話が出てきたのかなと想像します。

そしてSPAを作りやすいReactやVueが盛り上がったと予想します。このSPAをS3とかなんかいい感じのプラットフォーム(これがNetlifyとかなのか？)にデプロイすれば、サーバーを管理せずとも簡単なアプリなら作れるし、Lambdaとかと組み合わせれば結構なことまで出来ちゃいます(これが[AWS](http://d.hatena.ne.jp/keyword/AWS) amplify?)。いわゆる[Linux](http://d.hatena.ne.jp/keyword/Linux)サーバーを立てたりしなくても[マッシュアップ](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%B7%A5%E5%A5%A2%A5%C3%A5%D7)サービスとかが作れてしまうので、サーバーレスとかも叫ばれてきたのかなあ？

このSPAも細かく言うと色々やりようがあるようです。

例えばブラウザでページを開いたときにJSが起動してHTMLを構築するシンプルな方法を[CSR](http://d.hatena.ne.jp/keyword/CSR)(クライアント サイド [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0))と言うそうです。だいたいのことは[CSR](http://d.hatena.ne.jp/keyword/CSR)で行けるし、create-react-appが出てきて学習コストも下がってきたので、今も結構使われてるのかなと予想します。

しかしながら[Google](http://d.hatena.ne.jp/keyword/Google)[クローラー](http://d.hatena.ne.jp/keyword/%A5%AF%A5%ED%A1%BC%A5%E9%A1%BC)がJSを実行するかしないか微妙な時期があったのか、最初のJS実行時のラグを気にしてか、サーバーサイドでReactなりVueなりを実行してHTMLを生成する手法が出てきました。これがNext.js(React)とかNuxt.js(Vue)ということかなと思います。これが[SSR](http://d.hatena.ne.jp/keyword/SSR)(サーバー サイド [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0))と言うそうです。

Next.jsの方をちょっと触っただけですが、動的画像生成を実装した経験からも、next/imageだけでもかなり便利そうです。

これは、libvipsを使って動的に画像を生成して、ブラウザ毎に最適な形式でファイルを作り、キャッシュ用のヘッダーもいい感じにして、なんなら専用サービス(Vercel？)にデプロイすれば生成したファイルをキャッシュしてくれます。

これだけでも導入する動機になりそうです。触ってみた感じ、S3のファイルとかでも[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)さえ設定すればなんでもいけそう。

ただし、この画像生成機能はビルド時ではなく画像へのリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トがサーバー上に来たときだけに使えるので、[SSR](http://d.hatena.ne.jp/keyword/SSR)では使えても後述するSSGでは使えないようです。

さて、そんな[SSR](http://d.hatena.ne.jp/keyword/SSR)も、[Google](http://d.hatena.ne.jp/keyword/Google)[クローラー](http://d.hatena.ne.jp/keyword/%A5%AF%A5%ED%A1%BC%A5%E9%A1%BC)がJSを実行してくれるようになったり、[CDN](http://d.hatena.ne.jp/keyword/CDN)が一般的になったり、そもそもサーバー側の要素が増えるので、実装が複雑になってしまいがちでした。そこで新たな策として、予めビルド時(デプロイ時)にDBなりを見てもいいからHTMLを生成しておいて、これを[CDN](http://d.hatena.ne.jp/keyword/CDN)なりで静的ファイルを配信すれば、サーバーのプロセスもいらないし、なんならDBもいらないし、既に[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)されているから表示も早いしでいい事ずくめとなったのがSSG(スタティック サイト ジェネレーター)なのかなーと予想します。

これがNext.jsの今の売りっぽいです。[CSR](http://d.hatena.ne.jp/keyword/CSR)に似ていますが、HTMLのあらかじめ生成度合いが、[CSR](http://d.hatena.ne.jp/keyword/CSR)が0だったのがSSGで80〜100になったイメージです。もちろん[API](http://d.hatena.ne.jp/keyword/API)をクライアントサイドから叩いて動的コンテンツを追加することもできます。なんかこの辺からJamstackと言うらいしいっぽい感じがします。ブログとかほとんどSSGでいけそうです。

更にISGやISRなんてのもあるっぽいですが、まだまだキャッチアップ中です。。。

さてさて、こんなことを最近学んでみて、また、少しNext.jsアプリケーションを作ってみて、昔ながらの[Rails](http://d.hatena.ne.jp/keyword/Rails)アプリケーションに対する考え方が変わり、ようやく時代に追いつけてないことが自覚できたレベルにはなれたかも？と思いました。

これまで作ってきたものは、サーバーサイドでほぼ同じHTMLを作って返すものなので、最近のフロント事情[からし](http://d.hatena.ne.jp/keyword/%A4%AB%A4%E9%A4%B7)たら無駄が多いのかもと思えてきました。

また、Next.jsをcreate-next-appで作ってみると、驚くほど簡単にコンテンツが作れてしまいます。フロントはからっきしだった私が、簡単なアンケートサイトみたいなやつなら作れたので確かです。

Next.jsはルーティングも簡単に(ファイルパスを切るだけ)できるので、最早VもCもフロントでできてしまいます。

そして、どうせ[SSR](http://d.hatena.ne.jp/keyword/SSR)するなら、そのnodeサーバーから[prisma](http://d.hatena.ne.jp/keyword/prisma)なりでDBを叩いて動的コンテンツを返せれば1プロセスだけでいいし、認証もFirebase AuthenticationやAuth0なんかで作れてしまいます。

そうなると「もはや[Rails](http://d.hatena.ne.jp/keyword/Rails)はいらない！」みたいな思考になる人が現れてもおかしくないなと思う気持ちも理解できます。

もちろん[Rails](http://d.hatena.ne.jp/keyword/Rails)でHTMLを生成する方法も、状況によってpros/consあるかとは思いますが、自分が見ないようにしていたものの大きさを急に知って、驚くばかりです。

っていうかもはや私としては、バックエンドエンジニアとは？自分の存在価値は？みたいな気持ちです。

これから、改めて「どうやってアプリを作るのか」を考え直してみたいと思います。