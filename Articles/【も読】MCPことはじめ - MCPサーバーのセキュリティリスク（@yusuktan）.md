---
Created: 2025-04-06T02:11:00
URL: https://findy-code.io/media/articles/modoku20250404-yusuktan
Tags: [topic/AI]
---
![](https://findy-code.io/_next/image?url=https%3A%2F%2Fstorage.findy-code.io%2Fstorage%2Fblobs%2Fproxy%2FeyJfcmFpbHMiOnsiZGF0YSI6NzIxODUsInB1ciI6ImJsb2JfaWQifX0%3D--b1e223c2d6ad05e457e92e2255d5685174544caf%2Feyecatch-2025-03-31.png&w=3840&q=75)

【#も読】MCPことはじめ / MCPサーバーのセキュリティリスク（@yusuktan）のトップ画像

Deno Land Inc. / ソフトウェアエンジニア

maguro

「あの人も読んでる」略して「も読」。さまざまな寄稿者が最近気になった情報や話題をシェアする企画です。他のテックな人たちがどんな情報を追っているのか、ちょっと覗いてみませんか？

みなさんこんにちは。

「あの人も読んでる」、第2回目の投稿です。maguro (X [@yusuktan](https://x.com/yusuktan))がお届けします。

## 今回のテーマ: MCP

AIの進歩があまりにも目覚ましすぎる昨今、いかがお過ごしでしょうか。僕は少しキャッチアップが遅れ気味で危機感を持っているところです。

そんな中で僕が最近導入して即座に「もっと早く使い始めておくべきだった」と感じたのが「[MCP（Model Context Protocol）](https://modelcontextprotocol.io/introduction)」です。

すでに利用している方も多いと思いますが、2週間前の筆者のように「MCPって最近よく聞くけど、まあいつか気が向いたら設定するか」と考えているような方がもしいらっしゃったら、そのような方の背中を押したいと思いMCPを取り上げることにしました。

いくつか記事を紹介していきますが、百聞は一見に如かずで、実際に手元で試してみることで初めてMCPがいかに強力な仕組みであるのかを実感できると思います。今まで井の中の蛙だったAIが、外界とやりとりするための「USB-Cポート」（[MCP公式が使っている比喩表現](https://modelcontextprotocol.io/introduction)）を手に入れたことで、拡張性は無限大です。

まだMCPのセットアップができていない方は、ぜひ今すぐに試してみてください。

## MCPことはじめ

まず最初に紹介するのは、この記事です。

[「MCP？聞いたことあるけど使ってない…😅」人向けに初歩から少し踏み込んだ内容まで解説](https://zenn.dev/yamada_quantum/articles/465c4993465053)

この記事では、MCPのかんたんな概要から始まり、MCPサーバーを自分で実装してみるチュートリアル、そして作成したMCPサーバーがどのようにMCPクライアントから使われるのかといった内容がカバーされています。高速でMCPの大枠を把握することができるかと思います。

さらっと触れましたが、MCPはプロトコルとしては非常に単純なことに加え、MCP実装をするための公式SDKが各主要言語に対して提供されているため、独自のMCPサーバーを容易に実装することができます。

この記事を執筆している2025年3月31日時点では、[公式のGitHub org上で以下の言語のSDKが存在することが確認できます](https://github.com/modelcontextprotocol?q=sdk)。

- Python
- TypeScript
- Java
- Kotlin
- Swift
- Rust
- C#

このあと2つ目で紹介する記事でも紹介されている通り、現状の仕組みでは、第三者が作成したMCPサーバーを無邪気に使用することはセキュリティ上の危険性が高いと言えます。ちょっとしたMCPサーバーであればサクッとAIの手も借りつつ自作して使う、というのが良いのかもしれません。

## MCPサーバーのセキュリティリスク

次にこの記事を紹介します。

[MCPサーバーを利用することはセキュリティ的に安全か?](https://zenn.dev/arrowkato/articles/mcp_security)

「大いなる力には大いなる責任が伴う」ではないですが、MCPはAIにとってのUSB-Cポートなので、例えば悪意のあるデバイス、脆弱性のあるデバイスに繋いでしまうと、セキュリティ的にまずいということは想像がつくと思います。

将来的にこの点についてプロトコル策定側での議論が進むことも予想されますが（[実際Discussionでコミュニティからの話題提起がなされている](https://github.com/orgs/modelcontextprotocol/discussions/243)）、少なくとも現時点では、MCPサーバーのセットアップをする我々が、どのMCPサーバーを導入するのかという点について注意を払う必要があります。

ここに関して一定の指針を提供してくれるのが、件の記事です。

MCPの公式が提供しているリファレンスサーバーか、あるいはあるサービスの公式がそのサービス向けに提供しているMCPサーバー（例: Cloudflare公式が提供している[cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)）は信頼してよいだろう、としています。筆者も個人的にはこの指針を採用しています。

少し脱線しますが、個人的には[Deno](https://deno.com/)のパーミッションモデルが、MCPサーバーをセキュアにするための手法としてかなり筋がいいのでは、と考えています。（注: 筆者はDenoを作っている会社に勤めているため、ポジショントーク成分が入っています）

Denoでは実行されるプログラムに対してどのような操作を許可するのかを以下のように指定できます。

```plain text
# example.com へのネットワークアクセスのみを許可
# 例えば google.com へのアクセスはできない
# ファイルシステムへのアクセス、環境変数の読み取りなどもできない
deno run --allow-net=example.com some_mcp_server.ts

```

つまり、第三者が作成したMCPサーバーを利用しようとする際、Denoで実行するようにして、そのMCPサーバーが必要とするであろう最小限の権限のみを与えるようにセットアップすれば、万が一そのサーバーが良からぬ動きをしようとしたとしてもそれを防ぐことができます。例えばCursorのMCP設定ファイル `mcp.json` に以下のように設定すれば、`some_mcp_server.ts` は `example.com` へのネットワークアクセスのみ許可されます。

```plain text
{
  "mcpServers": {
    "some-mcp-server": {
      "command": "deno",
      "args": ["run", "--allow-net=example.com", "some_mcp_server.ts"]
    }
  }
}

```

今は過渡期のためMCPのセキュリティ的側面が見過ごされがちな印象もありますが、近いうちにコミュニティ全体として良い方向性が定まると良いなと思います。

**追記** この記事の執筆後、興味深い関連エントリが公開されていたため、そちらも軽くご紹介します。

[MCP Security Notification: Tool Poisoning Attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)

この報告では、AIモデルには見えるがユーザーには見えない悪意のあるプロンプトがMCPサーバーに埋め込まれる可能性が指摘されています。実際にCursorを使った実験を行い、悪意のあるプロンプトを埋め込むことで、ユーザーに気づかれにくい形でSSHの秘密鍵ファイル `~/.ssh/id_rsa` を読み取ることに成功したとのこと。

MCPのセキュリティ面についての議論が急がれる状況だと言えるでしょう。

## MCPのビッグウェーブ

最後にこの記事を紹介します。

[Why We're All-In on MCP](https://mastra.ai/blog/mastra-mcp)

この記事では、TypeScriptでAIエージェントを構築するためのフレームワーク[Mastra](https://mastra.ai/)がMCPにフルベットすることに決めた理由が語られています。

さまざまなツールをAIに統合するための試みとして、MCP以外にも数々のものが提唱されてきた中で、MCPがどういう点で「勝ち馬」になるに至ったのかが簡潔にまとめられています。

MCPの提唱元はAnthropic社です。同社の最大の競合であるOpenAIがMCPをどう扱っていくかが注目されていましたが、つい先日[OpenAIもMCPのサポートを始めたことが発表されました](https://gihyo.jp/article/2025/03/openai-mcp)。

これらの動向から、一般ユーザーである我々もMCPに全力投球をしてまったく問題がない、と言えるレベルになっていると考えます。 ビッグウェーブに乗っていきましょう。

## おわりに

MCPに関して、概要と実装、セキュリティ的な観点、業界内のビッグウェーブ、という3つの観点から記事をご紹介しました。

MCPに限らずですが、今のAIの急速な進化スピードを見ていると、これに適応できるかできないかでこの先10年の人生が左右されるといっても過言ではないような気がしています。正念場ですね。

また次回、おすすめコンテンツを紹介していきます。お楽しみに！

## この記事の執筆者

Deno Land Inc. / ソフトウェアエンジニア

maguro

趣味の一環でDenoにコントリビュートしていたらいつの間にか入社することになった。主にDeno Deployの開発を担当。米ジョージア工科大学のオンライン修士号コースにも通っている。