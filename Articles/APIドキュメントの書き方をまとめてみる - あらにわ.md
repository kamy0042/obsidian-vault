---
タグ: []
作成日時: 2021-01-15T20:37:00
Tags: [topic/技術/要件定義]
---
# 背景

転職してサーバサイドエンジニアとして、RESTfulなWebAPIドキュメント書く機会が増えた。
RESTの歴史はそれなりに長いため、仕様書の書き方にもベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスが確立されている。
なので、今更感もあるが、せっかくなのでまとめてみようと思う。

# 心構え

- 出来の良い[API](http://d.hatena.ne.jp/keyword/API)仕様書をマネすること
- ユーザの対象を意識すること（社内利用か社外利用など。仕様書で意識するポイントが変わるため）
- トリッキーな使い方をするエンドポイントは疑う

# 最低限記載すること

- 共通項目
- ドキュメントのメタ情報（バージョン、更新日付など）
- 常に必要なパラメータ（認証系）
- [流入](http://d.hatena.ne.jp/keyword/%CE%AE%C6%FE)制限
- エンドポイント（[URI](http://d.hatena.ne.jp/keyword/URI)）
- HTTPメソッド（GET、POST、PUT、DELETE、HEAD、OPTIONS、TRACE、CONNECT）
- Description（概要）
- Notes（備考）
- リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トについて
- パラメータ（クエリパラメータ、リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トボディのパラメータ）
- 意味の説明（id、q、dateなど。なるべく意味を説明せずとも伝わるパラメータがbetter）
- 形式（日付のパラメータの指定方法とか）
- 必要（required）なのか任意（optional）を明確にすること
- レスポンスについて
- [ステータスコード](http://d.hatena.ne.jp/keyword/%A5%B9%A5%C6%A1%BC%A5%BF%A5%B9%A5%B3%A1%BC%A5%C9)（特に異常系がメイン。エラーコードは標準に忠実に従うこと。）
- 取得形式（[JSON](http://d.hatena.ne.jp/keyword/JSON)、[XML](http://d.hatena.ne.jp/keyword/XML)など）
- 取得項目（階層構造を意識させる記載をする。はインデントを付ける、などの工夫をする）
- 取得順序（そもそもサーバサイド側でする必要があるか確認しよう。たまにクライアント側がやってたりするし...)
- その他利用上の注意点
- 似ているエンドポイントとの違い
- バージョンによるdeprecated
- 取得ユーザ「自分」だったらわざわざ指定しなくてもこういう[エイリアス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%EA%A5%A2%A5%B9)的なエンドポイントあるぜ！とか。

当たり前のことだが、[API](http://d.hatena.ne.jp/keyword/API)ドキュメントだからといって、基本はプログラミングのコメントと一緒だと思う。
例えれば、リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トパラメータはメソッドの引数のことだし、レスポンスが返り値である。あくまでもHTTPという[プロトコル](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)をインターフェースとして活用しているだけに過ぎない。

# ツール

ツールを使うだけで、一気にそれっぽく仕様書ができるので、積極的に採用しよう！

- [API](http://d.hatena.ne.jp/keyword/API) Blueprint
- Swagger
- iodocs

# 個人的に参考にしているドキュメント

### 海外のドキュメント

- [API Reference | Drive REST API v2 | Google Developers](https://developers.google.com/drive/api/v2/reference/)
- [GitHub API v3 | GitHub Developer Guide](https://developer.github.com/v3/#schema)
- [Standard search API — Twitter Developers](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html)

### 日本のドキュメント

- [Messaging APIリファレンス](https://developers.line.biz/ja/reference/messaging-api/)
- [Sansan Open API](https://docs.ap.sansan.com/ja/api/openapi/index.html)

# さいごに

今後も気づき次第アップデートしていきます🎉