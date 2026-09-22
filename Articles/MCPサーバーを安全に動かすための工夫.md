---
Created: 2025-04-12T21:19:00
URL: https://blog.lai.so/crashing-mcp-server/
Tags: [topic/AI]
---
StdoutトランポートのMCPサーバー起動コマンドを設定ファイルにnpxやuvxで記述することは、MCPサーバー接続時に、その場でダウンロードしたスクリプトファイルを実行することを意味する。これは開発者にはお馴染みの危険な方法「curlしてbash（URLでダウンロードしてきたシェルスクリプトをノールックで実行）」と似ている。MCPセキュリティの話題は“面白”優先で[プロンプトインジェクション方面に偏りがちだが](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/?ref=blog.lai.so)、それ以前にこの実行方式にも問題がある。

- [The Dangers of curl | bash](https://lukespademan.com/blog/the-dangers-of-curlbash/?ref=blog.lai.so)

MCPには[Roots](https://modelcontextprotocol.io/docs/concepts/roots?ref=blog.lai.so)というパスベースでアクセスを管理できる、いかにも安全に配慮した仕様があるが、現実としてはMCPクライアント側が対応していない。Claude Desktopですら未実装だ。

![](https://blog.lai.so/content/images/2025/04/image-2.png)

[https://modelcontextprotocol.io/clients](https://modelcontextprotocol.io/clients?ref=blog.lai.so)

### より安全なMCPサーバー

なので著者としてはより安全なMCPサーバーの実行方法を求めている。MCPサーバーのサンプルには、PythonやTypeScriptだけでなく、Brave SearchなどDocker Hubを経由して実行するものもある。これはコンテナを起動してその中で実行するため、直接プログラムを実行するより安全だ。さらにMCPサーバーの実行にDenoを通すことで、ユーザー側がスクリプトにパーミッションを付与できる。このMCPサーバーがネットやディスクにアクセスしないと判断した場合、その権限を削ればよい。

[MCPことはじめ / MCPサーバーのセキュリティリスク](https://findy-code.io/media/articles/modoku20250404-yusuktan?ref=blog.lai.so) では以下のように説明されている。

> つまり、第三者が作成したMCPサーバーを利用しようとする際、Denoで実行するようにして、そのMCPサーバーが必要とするであろう最小限の権限のみを与えるようにセットアップすれば、万が一そのサーバーが良からぬ動きをしようとしたとしてもそれを防ぐことができます。
> [https://findy-code.io/media/articles/modoku20250404-yusuktan](https://findy-code.io/media/articles/modoku20250404-yusuktan?ref=blog.lai.so)

Denoでスクリプトを書き、ユーザーがmcp.configに記述する設定では、以下のようにdocker run以下でJSRなどにデプロイしたDenoスクリプトのURLを指定する。これをMCP対応のエージェントに設定して利用できる。

![](https://blog.lai.so/content/images/2025/04/image-3.png)

ここに例を書いた

[Gist262588213843476](https://gist.github.com/laiso/d82d4320f2277627ed1ca8060ef2860e?ref=blog.lai.so)

![](https://blog.lai.so/content/images/icon/pinned-octocat-093da3e6fa40-7.svg)

![](https://blog.lai.so/content/images/thumbnail/gist-og-image-54fd7dc0713e-2.png)

加えて、VSCodeは、GitHub Actionsのsecretsのようなインターフェイスでクレデンシャルをベタ書きせず、外部に保存する仕組みがあるため、勧めやすい。

![](https://blog.lai.so/content/images/2025/04/image-4.png)

[https://code.visualstudio.com/docs/copilot/chat/mcp-servers](https://code.visualstudio.com/docs/copilot/chat/mcp-servers?ref=blog.lai.so)

### ローカルリソース依存のMCPサーバーの課題

しかしトレードオフもあって、実行環境（ローカル）のリソースを使うようなMCPサーバーは、そのままではコンテナ化すると動かなくなる。日やタイムラインに登場する元気にバズって、派手なデモを持つMCPサーバーたちは、大抵そのような要件になっていることが多い。大いなる力には大いなる責任が伴う、ってやつよ。

例えばObsidian MCPサーバーのようにローカルのファイルを読み込むものは、別途コンテナにパスをマウントしてサーバーから読み込めるように必要がある。これは特に手間ってほどではない（Dockerユーザーには）。

他にはデスクトップアプリケーションデバイスを制御するMCPサーバーは、ユーザーのマシンでネイティブにプログラムを実行したいはずであり、コンテナ経由で動かすのは無理がある。unity-mcpはユーザーのデスクトップで動作するUnityエディタにソケット接続し、スクリプトを操作する。

[GitHubjustinpbarnett](https://github.com/justinpbarnett/unity-mcp?ref=blog.lai.so)

![](https://blog.lai.so/content/images/icon/pinned-octocat-093da3e6fa40-6.svg)

![](https://opengraph.githubassets.com/4a7ebddb115739e96285463cad06555b8deeb11b2e9ff16f424ed636cd07eac1/justinpbarnett/unity-mcp)

### MCPサーバーの未来

ただ全員がStdoutのMCPサーバーを動かす時代は、今の過渡期だけだろう。逆に言えば、実装を楽にするために、現在はローカルでユーザーPCを危険に晒す必要のないプログラムまで動いている。

新仕様ではHTTPでリモートかつ複数クライアントをさばく使い方ができ、SDKの開発も進んでいる。Cloudflareは[マイグレーション用のプロキシモジュールまで用意している](https://developers.cloudflare.com/agents/guides/remote-mcp-server/?ref=blog.lai.so#connect-your-remote-mcp-server-to-claude-and-other-mcp-clients-via-a-local-proxy)。

モバイルアプリのMCPクライアントやサーバー間呼び出し、Google手動のエージェント間呼び出し仕様のA2Aなどもあり、状況はまだ変わるだろう。