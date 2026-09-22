---
Created: 2025-04-18T13:36:00
URL: https://fuyu.hatenablog.com/entry/2025/04/06/143012
Tags: [topic/AI]
---
[https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.m3tech.blog%2Fentry%2Ffuture-with-mcp-servers](https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.m3tech.blog%2Fentry%2Ffuture-with-mcp-servers)

[https://hatenablog-parts.com/embed?url=https%3A%2F%2Fzenn.dev%2Fubie_dev%2Farticles%2Ff927aaff02d618](https://hatenablog-parts.com/embed?url=https%3A%2F%2Fzenn.dev%2Fubie_dev%2Farticles%2Ff927aaff02d618)

最近Web開発業界で、「[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバー」というものが注目されている。自社で管理している任意の情報システムと生成AIツールを連携できるような仕組みとして、活用の可能性が模索されているようだ。

簡単に実装できそうな様子があったので、まずはプライベートで実験してみたいと思って、自作の短歌投稿サイトUtakataと連携する[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーを作ってみた。

[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーの構築に興味はあるが、やり方がよく分からないような方の参考になるように、作り方を紹介してみる。

### 今回やったこと

- Utakataの[Rails](https://d.hatena.ne.jp/keyword/Rails)アプリケーションに、ユーザーごとの短歌の一覧を[JSON](https://d.hatena.ne.jp/keyword/JSON)の配列で返す[API](https://d.hatena.ne.jp/keyword/API)を作成する
- ローカル環境で動作する[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーを構築し、ユーザーごとの短歌の一覧を取得するToolを作成する
- Claude Desktopに[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーを登録し、AIとのチャットでユーザーの投稿短歌についてやりとりできるようにする

[https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Ffuyu77%2Fmcp-utakata](https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Ffuyu77%2Fmcp-utakata)

今回作ってみた[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーの実装を、動作確認できる形で[GitHub](https://d.hatena.ne.jp/keyword/GitHub)に公開している。

### Utakataにユーザーごとの短歌一覧[API](https://d.hatena.ne.jp/keyword/API)を作成

今回の[ユースケース](https://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)では、[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーから、連携するアプリケーションの[API](https://d.hatena.ne.jp/keyword/API)をリク[エス](https://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トして情報を取得する仕組みだ。

そのための[API](https://d.hatena.ne.jp/keyword/API)をまず用意する必要がある。以下のような[JSON](https://d.hatena.ne.jp/keyword/JSON)の配列を返す[API](https://d.hatena.ne.jp/keyword/API)を作ってみた。

GET /[api](https://d.hatena.ne.jp/keyword/api)/users/:user_id/posts

```plain text
[
  {
    "id": 25401,
    "published_at": "2021-05-15T17:39:00.000+09:00",
    "tanka_text": "片耳にマスクをかけて池の面をながれる風に呼応している",
    "likes_count": 32
  },
  {
    "id": 23563,
    "published_at": "2021-03-29T13:45:16.888+09:00",
    "tanka_text": "人びとの残りをもとめ散る花の上を歩いてゆく鳩の群れ",
    "likes_count": 17
  }
]

```

[Rails](https://d.hatena.ne.jp/keyword/Rails)での[API](https://d.hatena.ne.jp/keyword/API)の実装方法の紹介は今回の本筋でないので省略するが、興味がある方は[GitHubに公開されているUtakataの実装](https://github.com/fuyu77/utakata/blob/master/app/controllers/api/posts_controller.rb)を参考にしてみて欲しい。

[https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fmodelcontextprotocol%2Ftypescript-sdk](https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fmodelcontextprotocol%2Ftypescript-sdk)

公式の[SDK](https://d.hatena.ne.jp/keyword/SDK)が用意されているので、これを使って開発するのがお手軽だ。現状5種類の言語に対応されているようで、今回はtypescript-[sdk](https://d.hatena.ne.jp/keyword/sdk)を用いて、Node.js環境で動作するように実装する。

[SDK](https://d.hatena.ne.jp/keyword/SDK)のREADMEで、Resources, Tools, Promptsという3つの概念が紹介されていて、使い分けの理解が難しい印象があるが、試行錯誤してみて、Claude Desktopと連携して使う用途では、Toolとして作っておくのがお手軽に実行できて良さそうだった。

index.jsのファイルを作成し、以下のように、 `fetch-user-tanka` のToolを実装する。

Node.jsのfetchでUtakataの[API](https://d.hatena.ne.jp/keyword/API)から情報取得し、[JSON](https://d.hatena.ne.jp/keyword/JSON)の配列を整形して以下のようなテキストをアウトプットする仕組みだ。

```plain text
# ユーザーID: 5 の短歌一覧（最新順）

- 片耳にマスクをかけて池の面をながれる風に呼応している（投稿日時: 2021-05-15T17:39:00.000+09:00、いいね数: 32）
- 人びとの残りをもとめ散る花の上を歩いてゆく鳩の群れ（投稿日時: 2021-03-29T13:45:16.888+09:00、いいね数: 17）

```

[MCP Inspector](https://github.com/modelcontextprotocol/inspector)という便利なツールが公式で用意されていて、ローカルで動作確認できる。

```plain text
npx @modelcontextprotocol/inspector node index.js
```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/f/fuyu77/20250406/20250406135726.png)

### Claude Desktopとの連携

[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーの動作確認ができたら、あとは生成AIツールと連携して使ってみるだけだ。[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーとの連携に対応している任意のツールと連携可能だが、今回は[Claude Desktop](https://claude.ai/download)と連携して使ってみる。この記事では[Mac](https://d.hatena.ne.jp/keyword/Mac)の環境で確認した結果を紹介する。

[https://hatenablog-parts.com/embed?url=https%3A%2F%2Fclaude.ai%2Fdownload](https://hatenablog-parts.com/embed?url=https%3A%2F%2Fclaude.ai%2Fdownload)

まずは、Claudeのデスクトップアプリケーションをインストールする。

[https://hatenablog-parts.com/embed?url=https%3A%2F%2Fmodelcontextprotocol.io%2Fquickstart%2Fuser](https://hatenablog-parts.com/embed?url=https%3A%2F%2Fmodelcontextprotocol.io%2Fquickstart%2Fuser)

公式ドキュメントに記載の方法を参考に連携設定する。[Mac](https://d.hatena.ne.jp/keyword/Mac)の場合、Claudeのアプリケーション内の設定ではなく、[Mac](https://d.hatena.ne.jp/keyword/Mac)のヘッダーメニューの「Claude > Settings > Developer」から該当メニューに辿り着く必要がある。「Get Started」ボタンを押すと設定ファイルが `~/Library/Application Support/Claude/claude_desktop_config.json` のように作成されるので、エディタで編集して[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーとの連携設定を追加する。

```plain text
{
  "mcpServers": {
    "utakataTankaReader": {
      "command": "/Users/fuyu77/.nodenv/shims/node",
      "args": [
        "/Users/fuyu77/mcp-utakata/index.js"
      ]
    }
  }
}

```

私の環境では、上のような設定で動作した。nodeコマンドとjsファイルのパスは、個別の環境の値に置き換える必要がある。

この設定を保存して、Claudeのアプリケーションを起動すると、Utakataの情報を参照したAIとのやりとりが可能になった。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/f/fuyu77/20250406/20250406142102.png)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/f/fuyu77/20250406/20250406142320.png)

### TypeScriptでの実装

[https://hatenablog-parts.com/embed?url=https%3A%2F%2Fmodelcontextprotocol.io%2Fquickstart%2Fserver](https://hatenablog-parts.com/embed?url=https%3A%2F%2Fmodelcontextprotocol.io%2Fquickstart%2Fserver)

説明を簡単にするために、この記事では[JavaScript](https://d.hatena.ne.jp/keyword/JavaScript)での実装で紹介したが、TypeScriptで実装してビルドする方法が上の公式ドキュメントに解説されている。

### まとめ

[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーの実装はこのように簡単にできて、任意の情報システムと生成AIツールとの連携が可能になるので、業界で大いに注目されているのも頷ける印象だ。

Utakataの投稿短歌についても、この仕組みを活用して何か面白いことができるかも知れない。もしUtakataの[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーの活用について何かアイディアがある方がいれば、[連絡先](https://utakatanka.jp/about#contacts)に記載のXアカウントのDMや、メールアドレスに連絡いただきたい。