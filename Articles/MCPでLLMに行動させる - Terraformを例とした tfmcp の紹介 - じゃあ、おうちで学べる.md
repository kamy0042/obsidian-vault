---
Created: 2025-04-06T00:56:00
URL: https://syu-m-5151.hatenablog.com/entry/2025/03/09/020057
Tags: [topic/AI]
---
## はじめに

こんにちは！今回は、私が最近開発した `tfmcp` というツールを紹介します。これは [Terraform](https://www.terraform.io/) を LLM（大規模[言語モデル](https://d.hatena.ne.jp/keyword/%B8%C0%B8%EC%A5%E2%A5%C7%A5%EB)）から操作できるようにするツールで、Model Context Protocol ([MCP](https://d.hatena.ne.jp/keyword/MCP)) を活用しています。

[github.com](https://github.com/nwiizo/tfmcp)

このブログが良ければ[**読者になったり**](https://blog.hatena.ne.jp/syu-m-5151/syu-m-5151.hatenablog.com/subscribe?from_url=https%3A%2F%2Fsyu-m-5151.hatenablog.com%2F&utm_source=hatena-follow-button-box&utm_medium=button&utm_campaign=subscribe_blog)、[**GitHub リポジトリ**](https://github.com/nwiizo/tfmcp)にStarをいただけると開発の励みになります。[nwiizo](https://x.com/nwiizo)をフォロワーしてくれるのもありがたいです。より良いツール開発のためのフィードバックもお待ちしています！

## [MCP](https://d.hatena.ne.jp/keyword/MCP) とは何か？

記事を始める前に、まず [MCP](https://d.hatena.ne.jp/keyword/MCP) (Model Context Protocol) について簡単に説明しましょう。[MCP](https://d.hatena.ne.jp/keyword/MCP) についてより詳しい情報は、公式ドキュメント [modelcontextprotocol.io](https://modelcontextprotocol.io/) や Anthropic の [Model Context Protocol に関する記事](https://www.anthropic.com/news/model-context-protocol) を参照してください。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/syu-m-5151/20250309/20250309080541.png)

[MCP](https://d.hatena.ne.jp/keyword/MCP) は Cline や Cursor などの LLM クライアントが外部サービスと連携するための[プロトコル](https://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)です。従来の LLM は学習したデータに基づいて「考える」ことしかできませんでしたが、[MCP](https://d.hatena.ne.jp/keyword/MCP) を通じて外部と連携し、「行動する」能力を持つことができます。

具体的には、[MCP](https://d.hatena.ne.jp/keyword/MCP) を使うことで以下のようなことが可能になります。

- Notion のファイル編集
- Supabase のデータベースクエリ
- Cloudflare のステータスチェック
- ローカルファイルの編集や操作

[mcpserver.cc](https://mcpserver.cc/)

[MCP](https://d.hatena.ne.jp/keyword/MCP) が[プロトコル](https://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)として統一されていることで、LLM プロバイダーやサービスを柔軟に切り替えることができるという大きなメリットがあります。

[modelcontextprotocol.io](https://modelcontextprotocol.io/docs/concepts/architecture)

### [MCP](https://d.hatena.ne.jp/keyword/MCP) の仕組み

[MCP](https://d.hatena.ne.jp/keyword/MCP) は基本的に [JSON](https://d.hatena.ne.jp/keyword/JSON)-RPC ベースの[プロトコル](https://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)で、詳細な仕様は [modelcontextprotocol.io/docs/concepts/transports#message-format](https://modelcontextprotocol.io/docs/concepts/transports#message-format) で確認できます。主要な構成要素は以下のとおりです。

1. **リソース（**[**Resources**](https://modelcontextprotocol.io/docs/concepts/resources)**）**：データへのアクセスを提供（[REST API](https://d.hatena.ne.jp/keyword/REST%20API) の GET に相当）
2. **ツール（**[**Tools**](https://modelcontextprotocol.io/docs/concepts/tools)**）**：アクションの実行を可能にする（[REST API](https://d.hatena.ne.jp/keyword/REST%20API) の POST に相当）
3. **プロンプト（**[**Prompts**](https://modelcontextprotocol.io/docs/concepts/prompts)**）**：LLM がどのようにサービスを使うべきかのガイダンス

[MCP](https://d.hatena.ne.jp/keyword/MCP) の実装をサポートするための公式 [SDK](https://d.hatena.ne.jp/keyword/SDK) が複数の言語で提供されています(2024年3月9日 現在)。

- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

しかし、[MCP](https://d.hatena.ne.jp/keyword/MCP) は標準的な [JSON](https://d.hatena.ne.jp/keyword/JSON)-RPC [プロトコル](https://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)をベースとしているため、任意の[プログラミング言語](https://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)で独自に実装することも可能です。本プロジェクト `tfmcp` では、Rust で実装しています。

ちなみに[JSON−RPC](https://www.jsonrpc.org/)について詳しく知りたい場合は「Real World HTTP 第3版」を読むととても勉強になるのでオススメです。

[Real World HTTP 第3版 ―歴史とコードに学ぶインターネットとウェブ技術](https://www.amazon.co.jp/dp/4814400667?tag=nwiizo-22&linkCode=ogi&th=1&psc=1)

![](https://m.media-amazon.com/images/I/41hZVIhn1IL._SL500_.jpg)

[Real World HTTP 第3版 ―歴史とコードに学ぶインターネットとウェブ技術](https://www.amazon.co.jp/dp/4814400667?tag=nwiizo-22&linkCode=ogi&th=1&psc=1)

- 作者:[渋川 よしき](https://d.hatena.ne.jp/keyword/%BD%C2%C0%EE%20%A4%E8%A4%B7%A4%AD)
- [オライリージャパン](https://d.hatena.ne.jp/keyword/%A5%AA%A5%E9%A5%A4%A5%EA%A1%BC%A5%B8%A5%E3%A5%D1%A5%F3)

[Amazon](https://www.amazon.co.jp/dp/4814400667?tag=nwiizo-22&linkCode=ogi&th=1&psc=1)

今後、どうなってゆくかはRoadmapが存在しているのでぜひ、こちらを読んでもらいたいです。

[modelcontextprotocol.io](https://modelcontextprotocol.io/development/roadmap)

### [JSON](https://d.hatena.ne.jp/keyword/JSON)RPC の基本

[MCP](https://d.hatena.ne.jp/keyword/MCP) は [JSON](https://d.hatena.ne.jp/keyword/JSON)-RPC 2.0 仕様に基づいており、以下の3種類のメッセージ形式が使われます。

4. **リク**[**エス**](https://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)**ト**：クライアントからサーバーへの要求

```plain text
{
     "jsonrpc": "2.0",
     "id": 1,
     "method": "tools/call",
     "params": { /* パラメータ */ }
}

```

5. **レスポンス**：サーバーからクライアントへの応答

```plain text
{
     "jsonrpc": "2.0",
     "id": 1,
     "result": { /* 結果オブジェクト */ }
}

```

エラー時：

```plain text
{
     "jsonrpc": "2.0",
     "id": 1,
     "error": {
       "code": -32700,
       "message": "エラーメッセージ"
  }
}

```

6. **通知**：レスポンスを必要としないサーバーからの一方的なメッセージ

```plain text
{
     "jsonrpc": "2.0",
     "method": "$/log",
     "params": { /* パラメータ */ }
}

```

## tfmcp: Terraform を LLM から操作する

さて、本題の `tfmcp` の紹介に移ります。`tfmcp` は Model Context Protocol を活用して、LLM（特に Claude Desktop など）から Terraform の操作を可能にするツールです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/syu-m-5151/20250309/20250309072102.png)

### tfmcp の主な機能

`tfmcp` を使うと、以下のようなことが可能になります。

7. **Terraform 設定ファイルの読み取り** 
    - プロジェクト内の .tf ファイルを解析し構造を理解
8. **Terraform プランの解析** 
    - `terraform plan` の結果を解析して LLM に伝える
9. **Terraform の適用** 
    - 設定をインフラに適用する `terraform apply` を実行
10. **状態管理** 
    - Terraform の状態ファイルを管理・読み取り
11. **設定ファイルの作成・修正** 
    - 新しい Terraform 設定の作成や既存の設定の変更

### デモ

Claude Desktop と連携している `tfmcp` のデモを見てみましょう：

![](https://github.com/nwiizo/tfmcp/raw/main/.github/images/tfmcp-demo.gif)

tfmcp Demo with Claude Desktop

このデモでは、Claude が[自然言語](https://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC)で Terraform プロジェクトを操作し、分析、実行しています。

## インストール方法

`tfmcp` は Rust で書かれており、Cargo を使って簡単にインストールできます。

```plain text
cargo install tfmcp
```

ソースからのインストールも可能です。

```plain text
# リポジトリをクローン
git clone https://github.com/nwiizo/tfmcp
cd tfmcp

# ビルドとインストール
cargo install --path .
```

## Claude Desktop との連携方法

Claude Desktop と `tfmcp` を連携するには、以下の手順を行います。

12. まず、`tfmcp` をインストールします。 `bash
cargo install tfmcp`
13. インストールされた `tfmcp` 実行ファイルのパスを見つけます。 `bash
which tfmcp`
14. Claude Desktop の設定ファイルを開き、以下の設定を追加します。

```plain text
{
     "mcpServers": {
       "tfmcp": {
         "command": "/path/to/your/tfmcp",  // 実際のパスに置き換えてください
         "args": ["mcp"],
         "env": {
           "HOME": "/Users/yourusername",  // あなたのユーザー名に置き換えてください
           "PATH": "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
           "TERRAFORM_DIR": "/path/to/your/terraform/project"  // オプション：Terraformプロジェクトのパス
      }
    }
  }
}

```

15. Claude Desktop を再起動し、tfmcp ツールを有効にします。
16. もし Terraform プロジェクトが存在しない場合、`tfmcp` は自動的に `~/terraform` に基本的なサンプルプロジェクトを作成します。

## 使用例

`tfmcp` の使い方や詳細なドキュメントは [GitHub リポジトリの README](https://github.com/nwiizo/tfmcp/blob/main/README.md) で確認できます。以下のようなシナリオで特に役立ちます。

17. **Terraform 設定の説明と理解** 
    - 「このプロジェクトで使われている Terraform リソースを分析して」
18. **設定の検証と**[**トラブルシューティング**](https://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%D6%A5%EB%A5%B7%A5%E5%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0) 
    - 「この Terraform プロジェクトのエラーを見つけて修正して」
19. **インフラの計画と適用** 
    - 「このプランを実行するとどうなるか説明して」
    - 「この変更を適用して結果を報告して」
20. **設定の自動生成** 
    - 「S3[バケット](https://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)とIAMポリシーを作成する Terraform コードを書いて」

## セキュリティに関する考慮事項

`tfmcp` を使用する際には、以下の点に注意が必要です。

- `tfmcp` は Terraform コマンドをユーザーに代わって実行するため、インフラの作成、変更、削除が可能です
- 本番環境では、適切な IAM 権限やロール境界を使用することを検討してください
- AI によって生成された Terraform プランは、適用前に必ず確認してください
- Terraform の状態ファイルに含まれる機密情報が AI アシスタントからアクセス可能になる可能性があります

### [MCP](https://d.hatena.ne.jp/keyword/MCP)自体のセキュリティリスク

作っていて思ったんですけど[MCP](https://d.hatena.ne.jp/keyword/MCP)はLLMにローカル環境への強いアクセス権を付与するので、本質的にセキュリティ上の懸念があります。普通にもう狙ってきていると思いますのでむやみやたらにインストールするのはやめましょう。

- [**サードパーティ**](https://d.hatena.ne.jp/keyword/%A5%B5%A1%BC%A5%C9%A5%D1%A1%BC%A5%C6%A5%A3)[**MCP**](https://d.hatena.ne.jp/keyword/MCP)**サーバーのリスク**: 信頼できない「野良[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバー」をインストールすると、[マルウェア](https://d.hatena.ne.jp/keyword/%A5%DE%A5%EB%A5%A6%A5%A7%A5%A2)や情報漏洩のリスクが高まります。[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーはローカル[ファイルシステム](https://d.hatena.ne.jp/keyword/%A5%D5%A5%A1%A5%A4%A5%EB%A5%B7%A5%B9%A5%C6%A5%E0)や他のリソースへのアクセス権を持つため、悪意のあるコードを実行される可能性があります。
- **権限の過剰付与**: [MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーが必要以上の権限を持つと、攻撃者がLLMとの対話を通じてシステムリソースに[不正アクセス](https://d.hatena.ne.jp/keyword/%C9%D4%C0%B5%A5%A2%A5%AF%A5%BB%A5%B9)する可能性があります。
- **データ漏洩のリスク**: ローカルファイルやクレデンシャルなどの機密情報が、LLMとの対話を通じて外部に漏洩する可能性があります。
- **プロンプトインジェクション攻撃**: 悪意あるプロンプトを通じて、[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーに予期しない操作を実行させるリスクがあります。

### 安全な[MCP](https://d.hatena.ne.jp/keyword/MCP)利用のための注意事項

以下の対策を実施することで、[MCP](https://d.hatena.ne.jp/keyword/MCP)の安全な利用が多少、可能になります。それでも完璧ではないです。金払ってくれるなら作ってやるから連絡してくれ。

21. **信頼できるソースからのみ**[**MCP**](https://d.hatena.ne.jp/keyword/MCP)**サーバーをインストール**: 公式[リポジトリ](https://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA)や信頼できる開発者からの[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーのみを使用し、コードを確認してから実行してください。
22. **最小権限の原則を適用**: [MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーには必要最小限の権限のみを付与し、特に本番環境や機密データへのアクセスは制限してください。
23. [**サンドボックス**](https://d.hatena.ne.jp/keyword/%A5%B5%A5%F3%A5%C9%A5%DC%A5%C3%A5%AF%A5%B9)**環境での実行**: 可能であれば、[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーを隔離された環境で実行し、重要なシステムやデータへのアクセスを制限してください。
24. **監査ログの有効化**: [MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーを通じて実行されたすべてのコマンドや操作を記録し、不審な活動がないかを定期的に確認してください。
25. **機密情報のフィルタリング**: LLMに送信される前に、[API](https://d.hatena.ne.jp/keyword/API)キーやパスワードなどの機密情報を検出・削除するメ[カニ](https://d.hatena.ne.jp/keyword/%A5%AB%A5%CB)ズムを実装してください。
26. **定期的なセキュリティレビュー**: [MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーの設定やコードを定期的にレビューし、セキュリティの[脆弱性](https://d.hatena.ne.jp/keyword/%C0%C8%BC%E5%C0%AD)がないかを確認してください。

tfmcpを含む[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーは強力なツールですが、その力は適切に管理されなければリスクにもなり得ます。特に初めての利用時は、非本番環境でのテストから始め、リスクを理解した上で徐々に本番環境への導入を検討することをお勧めします。

## tfmcp の技術的詳細と実装

`tfmcp` の内部実装について詳しく説明します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/syu-m-5151/20250309/20250309072943.png)

### 全体[アーキテクチャ](https://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)

`tfmcp` は大きく分けて以下の[コンポーネント](https://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)から構成されています。

```plain text
tfmcp
├── config      - 設定管理
├── core        - コアロジック
├── mcp         - MCPプロトコル実装
├── shared      - 共通ユーティリティ
└── terraform   - Terraform連携
```

### 主要[コンポーネント](https://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の詳細

### 1. [MCP](https://d.hatena.ne.jp/keyword/MCP) サーバー (`src/mcp/`)

[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーは、LLMクライアント（Claude Desktopなど）との通信を処理する部分です。主に以下のファイルから構成されています。

- `handler.rs`: [MCP](https://d.hatena.ne.jp/keyword/MCP)リク[エス](https://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トの処理とレスポンスの生成
- `stdio.rs`: 標準入出力を使った通信の実装

`handler.rs` の核となる部分は `McpHandler` 構造体で、リク[エス](https://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トに応じて適切なTerraformコマンドを実行します。

```plain text
pub struct McpHandler<'a> {
    tfmcp: &'a mut TfMcp,
    initialized: bool,
}

impl<'a> McpHandler<'a> {
    // ...

    async fn handle_tools_call(
        &mut self,
        transport: &StdioTransport,
        id: u64,
        params_val: serde_json::Value,
    ) -> anyhow::Result<()> {
        let name = params_val
            .get("name")
            .and_then(|v| v.as_str())
            .unwrap_or("");

        match name {
            "list_terraform_resources" => {
                self.handle_list_terraform_resources(transport, id).await?;
         }
            "analyze_terraform" => {
                self.handle_analyze_terraform(transport, id, &params_val).await?;
         }
            "get_terraform_plan" => {
                self.handle_get_terraform_plan(transport, id).await?;
         }
            // 他のツール処理...
     }

        Ok(())
 }

    // 各ツールの実装...
}

```

[MCP](https://d.hatena.ne.jp/keyword/MCP)のリク[エス](https://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)ト/レスポンスフローを図示すると次のようになります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/syu-m-5151/20250309/20250309071924.png)

### 2. Terraform サービス (`src/terraform/`)

Terraformとの実際の連携を担当する[コンポーネント](https://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)です。主に以下のファイルで構成されています。

- `service.rs`: Terraformコマンドの実行とその結果の解析
- `model.rs`: Terraformの設定やステート用のデータモデル

`TerraformService` 構造体が主要なインターフェースを提供します。

```plain text
pub struct TerraformService {
    terraform_path: PathBuf,  // terraform実行ファイルのパス
    project_directory: PathBuf,  // Terraformプロジェクトのディレクトリ
}

impl TerraformService {
    // 初期化
    pub fn new(
        terraform_path: PathBuf,
        project_directory: PathBuf,
    ) -> Result<Self, TerraformError> {
        // ... 検証ロジック ...
 }

    // プロジェクトディレクトリの変更
    pub fn change_project_directory(
        &mut self,
        new_directory: PathBuf,
    ) -> Result<(), TerraformError> {
        // ... ディレクトリ変更ロジック ...
 }

    // Terraformコマンドの実行
    pub async fn apply(&self, auto_approve: bool) -> anyhow::Result<String> {
        let mut args = vec!["apply", "-no-color"];
        if auto_approve {
            args.push("-auto-approve");
     }

        let output = Command::new(&self.terraform_path)
            .args(&args)
            .current_dir(&self.project_directory)
            .output()?;

        // ... 出力処理 ...
 }

    // 設定ファイルの解析
    pub async fn analyze_configurations(&self) -> anyhow::Result<TerraformAnalysis> {
        // ... 解析ロジック ...
 }

    // その他のメソッド...
}

```

### 3. コア (`src/core/`)

`TfMcp` 構造体は、アプリケーションの中心的なコントローラーとして機能し、[MCP](https://d.hatena.ne.jp/keyword/MCP)ハンドラーとTerraformサービスを橋渡しします。

```plain text
pub struct TfMcp {
    config: Config,
    terraform_service: TerraformService,
}

impl TfMcp {
    pub fn new(config_path: Option<String>, project_dir: Option<String>) -> anyhow::Result<Self> {
        // ... 初期化ロジック ...
 }

    pub async fn launch_mcp(&mut self) -> anyhow::Result<()> {
        // ... MCPサーバー起動ロジック ...
 }

    // Terraformサービスへの橋渡し
    pub async fn analyze_terraform(&mut self) -> anyhow::Result<()> {
        let analysis = self.terraform_service.analyze_configurations().await?;
        println!("{}", serde_json::to_string_pretty(&analysis)?);
        Ok(())
 }

    // その他のメソッド...
}

```

### 4. 設定管理 (`src/config/`)

アプリケーションの設定を管理します。設定ファイルからの読み込みと、デフォルト設定の提供を担当します。

```plain text
pub struct Config {
    pub terraform: TerraformConfig,
    pub mcp: McpConfig,
}

pub fn init_default() -> anyhow::Result<Config> {
    // ... デフォルト設定ロジック ...
}

pub fn init_from_path(path: &str) -> anyhow::Result<Config> {
    // ... 設定ファイル読み込みロジック ...
}

```

### 実装の特徴

- **高速なパフォーマンス**：Rust のエコシステムを活用した高速な処理
- **自動セットアップ**：必要に応じてサンプル Terraform プロジェクトを自動作成
- **エラー処理**：適切なエラーメッセージとロギング
- **プロジェクト**[**ディレクト**](https://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)**リの動的切り替え**：実行中にプロジェクト[ディレクト](https://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リを変更可能

### Rust での [JSON](https://d.hatena.ne.jp/keyword/JSON)RPC 2.0 実装

`tfmcp` では Rust で [JSON](https://d.hatena.ne.jp/keyword/JSON)-RPC 2.0 を実装するために、標準的なアプローチを採用しています。以下は [JSON](https://d.hatena.ne.jp/keyword/JSON)-RPC メッセージの定義と処理の詳細な実装方法です。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/syu-m-5151/20250309/20250309072348.png)

### 1. 依存パッケージの設定

まず、`Cargo.toml` に必要な依存関係を定義します。

```plain text
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
anyhow = "1.0"
thiserror = "1.0"
tokio = { version = "1.0", features = ["full"] }
futures = "0.3"
async-trait = "0.1"
```

### 2. メッセージ構造体とエラー型の定義

```plain text
use serde::{Deserialize, Serialize};
use std::pin::Pin;
use std::sync::{Arc, Mutex};
use tokio::sync::broadcast;
use futures::Stream;
use async_trait::async_trait;

// JSON-RPC エラーコード
#[derive(Debug)]
#[allow(dead_code)]
pub enum JsonRpcErrorCode {
    ParseError = -32700,
    InvalidRequest = -32600,
    MethodNotFound = -32601,
    InvalidParams = -32602,
    InternalError = -32603,
    // カスタムエラーコード（-32000 から -32099 の範囲）
    TerraformNotFound = -32000,
    InvalidProjectDirectory = -32001,
}

// トランスポートエラー
#[derive(thiserror::Error, Debug, Clone)]
pub enum Error {
    #[error("IO error: {0}")]
    Io(String),

    #[error("Serialization error: {0}")]
    Serialization(String),

    #[error("Other error: {0}")]
    Other(String),
}

// JSON-RPC メッセージ
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum Message {
    Request {
        #[serde(rename = "jsonrpc")]
        jsonrpc: String,

        #[serde(rename = "method")]
        method: String,

        #[serde(rename = "id")]
        id: u64,

        #[serde(rename = "params")]
        #[serde(skip_serializing_if = "Option::is_none")]
        params: Option<serde_json::Value>,
 },
    Notification {
        #[serde(rename = "jsonrpc")]
        jsonrpc: String,

        #[serde(rename = "method")]
        method: String,

        #[serde(rename = "params")]
        #[serde(skip_serializing_if = "Option::is_none")]
        params: Option<serde_json::Value>,
 },
    Response {
        #[serde(rename = "jsonrpc")]
        jsonrpc: String,

        #[serde(rename = "id")]
        id: u64,

        #[serde(rename = "result")]
        #[serde(skip_serializing_if = "Option::is_none")]
        result: Option<serde_json::Value>,

        #[serde(rename = "error")]
        #[serde(skip_serializing_if = "Option::is_none")]
        error: Option<serde_json::Value>,
 },
}

```

ここで重要なのは：

- `#[serde(untagged)]` [アノテーション](https://d.hatena.ne.jp/keyword/%A5%A2%A5%CE%A5%C6%A1%BC%A5%B7%A5%E7%A5%F3)により、3種類のメッセージタイプを同じ列挙型で表現
- `#[serde(skip_serializing_if = "Option::is_none")]` で null 値のフィールドを出力しない設定
- `thiserror` を使った明確なエラー型の定義

### 3. トランスポートトレイトとその実装

[JSON](https://d.hatena.ne.jp/keyword/JSON)-RPC メッセージの送受信を行うための抽象インターフェースとして、トランスポートトレイトを定義します。

```plain text
#[async_trait]
pub trait Transport: Send + Sync {
    // メッセージを送信する
    async fn send(&self, message: Message) -> Result<(), Error>;

    // メッセージストリームを受け取る
    fn receive(&self) -> Pin<Box<dyn Stream<Item = Result<Message, Error>> + Send>>;

    // トランスポートを閉じる
    async fn close(&self) -> Result<(), Error>;
}

```

標準入出力を使ったトランスポート実装例：

```plain text
pub struct StdioTransport {
    stdout: Arc<Mutex<std::io::Stdout>>,
    receiver: broadcast::Receiver<Result<Message, Error>>,
}

impl StdioTransport {
    pub fn new() -> (Self, broadcast::Sender<Result<Message, Error>>) {
        let (sender, receiver) = broadcast::channel(100);
        let transport = Self {
            stdout: Arc::new(Mutex::new(std::io::stdout())),
            receiver,
     };

        // 標準入力からの読み取りをバックグラウンドで実行
        let stdin = tokio::io::stdin();
        let mut reader = tokio::io::BufReader::new(stdin);
        let sender_clone = sender.clone();

        tokio::spawn(async move {
            let mut line = String::new();
            loop {
                line.clear();
                match reader.read_line(&mut line).await {
                    Ok(0) => break, // EOF
                    Ok(_) => {
                        // 空白を除去して解析の問題を回避
                        let trimmed_line = line.trim();
                        eprintln!("[DEBUG] Received JSON: {}", trimmed_line);

                        // JSON-RPC メッセージを解析
                        let parsed = parse_json_message(trimmed_line);

                        if sender_clone.send(parsed).is_err() {
                            eprintln!("[ERROR] Failed to send parsed message to channel");
                            break;
                     }
                 }
                    Err(e) => {
                        eprintln!("[ERROR] Error reading from stdin: {}", e);
                        let _ = sender_clone.send(Err(Error::Io(
                            format!("Error reading from stdin: {}", e))
                        ));
                        break;
                 }
             }
         }
     });

        (transport, sender)
 }
}

#[async_trait]
impl Transport for StdioTransport {
    async fn send(&self, message: Message) -> Result<(), Error> {
        let mut stdout = self.stdout.lock()
            .map_err(|_| Error::Other("Failed to lock stdout".into()))?;

        // メッセージを JSON 文字列に変換
        let json = match serde_json::to_string(&message) {
            Ok(s) => s,
            Err(e) => return Err(Error::Serialization(
                format!("JSON serialization error: {}", e)
            )),
     };

        // デバッグログ用に送信するJSONを出力
        let truncated_json = if json.len() > 500 {
            format!("{}... (truncated)", &json[0..500])
     } else {
            json.clone()
     };
        eprintln!("[DEBUG] Sending JSON: {}", truncated_json);

        // JSON 文字列を改行付きで出力し、フラッシュ
        if let Err(e) = writeln!(stdout, "{}", json) {
            return Err(Error::Io(format!("Failed to write to stdout: {}", e)));
     }

        if let Err(e) = stdout.flush() {
            return Err(Error::Io(format!("Failed to flush stdout: {}", e)));
     }

        Ok(())
 }

    fn receive(&self) -> Pin<Box<dyn Stream<Item = Result<Message, Error>> + Send>> {
        let rx = self.receiver.resubscribe();
        Box::pin(futures::stream::unfold(rx, |mut rx| async move {
            match rx.recv().await {
                Ok(msg) => Some((msg, rx)),
                Err(_) => None,
         }
     }))
 }

    async fn close(&self) -> Result<(), Error> {
        Ok(())
 }
}

```

より[ロバスト](https://d.hatena.ne.jp/keyword/%A5%ED%A5%D0%A5%B9%A5%C8)な[JSON](https://d.hatena.ne.jp/keyword/JSON)パース処理の実装：

```plain text
// エラー対応の改善されたJSONメッセージパース関数
fn parse_json_message(json_string: &str) -> Result<Message, Error> {
    // 空入力のバリデーション
    if json_string.is_empty() {
        return Err(Error::Serialization("Empty JSON string".into()));
 }

    // 一般的なJSON問題を修正
    let mut processed_json = json_string.to_string();

    // 問題のある空白文字を除去
    processed_json = processed_json.replace(['\n', '\r', '\t'], " ");

    // エスケープされていないバックスラッシュと引用符の処理
    if processed_json.contains("\\\\") || processed_json.contains("\\\"") {
        processed_json = processed_json
            .replace("\\\\", "\\")
            .replace("\\\"", "\"");
 }

    // 修正された文字列で解析を試行
    let parse_result = serde_json::from_str::<Message>(&processed_json);

    match parse_result {
        Ok(msg) => Ok(msg),
        Err(e) => {
            eprintln!("[ERROR] JSON parse error: {}. Input: {}", e, processed_json);

            // 追加診断情報の提供
            if let Ok(value) = serde_json::from_str::<serde_json::Value>(&processed_json) {
                eprintln!("[DEBUG] JSON parsed as generic value: {:?}", value);
         } else {
                eprintln!("[ERROR] Could not parse JSON even as generic value");
         }

            Err(Error::Serialization(format!("JSON parse error: {}", e)))
     }
 }
}

```

### 4. リク[エス](https://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)ト処理とメソッドディスパッチ

[MCP](https://d.hatena.ne.jp/keyword/MCP) サーバー内でのリク[エス](https://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)ト処理は、メソッド名に基づいてディスパッチ（振り分け）します。

```plain text
pub struct McpHandler<'a> {
    tfmcp: &'a mut TfMcp,
    initialized: bool,
}

impl<'a> McpHandler<'a> {
    pub fn new(tfmcp: &'a mut TfMcp) -> Self {
        Self {
            tfmcp,
            initialized: false,
     }
 }

    pub async fn launch_mcp(&mut self, transport: &StdioTransport) -> anyhow::Result<()> {
        let mut stream = transport.receive();

        logging::info("MCP stdio transport server started. Waiting for JSON messages on stdin...");

        // メッセージループ
        while let Some(msg_result) = stream.next().await {
            match msg_result {
                Ok(Message::Request { id, method, params, .. }) => {
                    logging::debug(&format!(
                        "Got Request: id={}, method={}, params={:?}",
                        id, method, params
                    ));

                    // 初期化リクエストの特別処理
                    if method == "initialize" {
                        if let Err(err) = self.handle_initialize(transport, id).await {
                            logging::error(&format!("Error handling initialize request: {}", err));
                     }
                        self.initialized = true;
                        continue;
                 }

                    // 他のすべてのリクエストでは、初期化されていることを確認
                    if !self.initialized {
                        self.send_error_response(
                            transport,
                            id,
                            JsonRpcErrorCode::InvalidRequest,
                            "Server not initialized. Send 'initialize' request first.".to_string(),
                        ).await?;
                        continue;
                 }

                    // リクエスト処理の実行
                    if let Err(err) = self.handle_request(transport, id, method, params).await {
                        logging::error(&format!("Error handling request: {:?}", err));
                        self.send_error_response(
                            transport,
                            id,
                            JsonRpcErrorCode::InternalError,
                            format!("Failed to handle request: {}", err),
                        ).await?;
                 }
             }
                Ok(Message::Notification { method, params, .. }) => {
                    logging::debug(&format!("Got Notification: method={}, params={:?}", method, params));
                    // 通知の処理（必要に応じて）
             }
                Ok(Message::Response { id, result, error, .. }) => {
                    logging::debug(&format!(
                        "Got Response: id={}, result={:?}, error={:?}",
                        id, result, error
                    ));
                    // レスポンスの処理（必要に応じて）
             }
                Err(e) => {
                    logging::error(&format!("Error receiving message: {:?}", e));
             }
         }
     }

        Ok(())
 }

    async fn handle_request(
        &mut self,
        transport: &StdioTransport,
        id: u64,
        method: String,
        params: Option<serde_json::Value>,
    ) -> anyhow::Result<()> {
        match &*method {
            "initialize" => self.handle_initialize(transport, id).await?,
            "tools/list" => self.handle_tools_list(transport, id).await?,
            "tools/call" => {
                if let Some(params_val) = params {
                    self.handle_tools_call(transport, id, params_val).await?;
             }
         }
            "resources/list" => self.handle_resources_list(transport, id).await?,
            "prompts/list" => self.handle_prompts_list(transport, id).await?,
            _ => {
                self.send_error_response(
                    transport,
                    id,
                    JsonRpcErrorCode::MethodNotFound,
                    format!("Method not found: {}", method),
                ).await?;
         }
     }
        Ok(())
 }
}

```

### 5. レスポンス送信メソッド

成功レスポンスとエラーレスポンスのヘルパーメソッド：

```plain text
impl<'a> McpHandler<'a> {
    // テキストコンテンツを持つレスポンスを送信
    async fn send_text_response(
        &self,
        transport: &StdioTransport,
        id: u64,
        text: &str,
    ) -> anyhow::Result<()> {
        logging::info(&format!("Sending text response for id {}", id));

        // 適切に構造化されたテキストレスポンスを作成
        let response = Message::Response {
            jsonrpc: "2.0".to_string(),
            id,
            result: Some(json!({
                "content": [{
                    "type": "text",
                    "text": text
             }]
         })),
            error: None,
     };

        // レスポンスをログに記録（デバッグ用）
        if let Ok(json_str) = serde_json::to_string_pretty(&response) {
            logging::debug(&format!("Sending text response: {}", json_str));
     }

        // レスポンスを送信
        match transport.send(response).await {
            Ok(_) => {
                logging::info("Text response sent successfully");
                Ok(())
         }
            Err(e) => {
                logging::error(&format!("Failed to send text response: {}", e));
                Err(anyhow::anyhow!("Failed to send text response: {}", e))
         }
     }
 }

    // エラーレスポンスを送信
    async fn send_error_response(
        &self,
        transport: &StdioTransport,
        id: u64,
        code: JsonRpcErrorCode,
        message: String,
    ) -> anyhow::Result<()> {
        logging::warn(&format!(
            "Sending error response for id {}: {}",
            id, message
        ));

        // 適切に構造化されたエラーレスポンスを作成
        let response = Message::Response {
            jsonrpc: "2.0".to_string(),
            id,
            result: None,
            error: Some(json!({
                "code": code as i32,
                "message": message
         })),
     };

        // レスポンスをログに記録（デバッグ用）
        if let Ok(json_str) = serde_json::to_string_pretty(&response) {
            logging::debug(&format!("Sending error response: {}", json_str));
     }

        // レスポンスを送信
        match transport.send(response).await {
            Ok(_) => {
                logging::info("Error response sent successfully");
                Ok(())
         }
            Err(e) => {
                logging::error(&format!("Failed to send error response: {}", e));
                Err(anyhow::anyhow!("Failed to send error response: {}", e))
         }
     }
 }
}

```

### 6. 具体的なメソッドハンドラの実装例

例として、`tools/list` メソッドのハンドラ実装：

```plain text
async fn handle_tools_list(&self, transport: &StdioTransport, id: u64) -> anyhow::Result<()> {
    // ツール一覧を含むJSONを取得
    let tools_value: serde_json::Value = serde_json::from_str(TOOLS_JSON)
        .expect("tools.json must be valid JSON");

    // レスポンスを作成して送信
    let response = Message::Response {
        jsonrpc: "2.0".to_string(),
        id,
        result: Some(tools_value),
        error: None,
 };

    transport.send(response).await?;
    Ok(())
}

```

ツール呼び出しハンドラの実装例：

```plain text
async fn handle_tools_call(
    &mut self,
    transport: &StdioTransport,
    id: u64,
    params_val: serde_json::Value,
) -> anyhow::Result<()> {
    let name = params_val
        .get("name")
        .and_then(|v| v.as_str())
        .unwrap_or("");

    logging::info(&format!("Handling tools/call for tool: {}", name));

    match name {
        "get_terraform_plan" => {
            // Terraform プランを取得
            match self.tfmcp.get_terraform_plan().await {
                Ok(plan) => {
                    // 結果のJSONを構築
                    let result_json = json!({ "plan": plan });
                    let obj_as_str = serde_json::to_string(&result_json)?;

                    // テキストレスポンスとして送信
                    self.send_text_response(transport, id, &obj_as_str).await?;
             }
                Err(err) => {
                    // エラーレスポンスを送信
                    self.send_error_response(
                        transport,
                        id,
                        JsonRpcErrorCode::InternalError,
                        format!("Failed to get Terraform plan: {}", err),
                    ).await?;
             }
         }
     }
        // 他のツールハンドラ...
        _ => {
            self.send_error_response(
                transport,
                id,
                JsonRpcErrorCode::MethodNotFound,
                format!("Tool not found: {}", name),
            ).await?;
     }
 }

    Ok(())
}

```

これらのコードパターンにより、`tfmcp` は [MCP](https://d.hatena.ne.jp/keyword/MCP) [プロトコル](https://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)の [JSON](https://d.hatena.ne.jp/keyword/JSON)-RPC メッセージを効率的に処理し、Terraform コマンドの実行結果をクライアントに返すことができます。

Rust の主要な利点としては以下が挙げられます。

27. **型安全性**: `serde` による強力な[シリアライズ](https://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)/デ[シリアライズ](https://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)の型検証
28. **強力なエラーハンドリング**: `Result` 型と `thiserror` によるエラー処理
29. **非同期処理**: `tokio` と `async/await` による効率的な非同期I/O
30. **トレイトベースの抽象化**: `Transport` トレイトによる異なる通信方式のサポート
31. **メモリ安全性**: ランタイムの安全性とパフォーマンス

## おわりに

`tfmcp` は、Terraform と LLM の統合における最初の一歩です。[MCP](https://d.hatena.ne.jp/keyword/MCP)（Model Context Protocol）に関して色々説明してきましたが、すごく簡単に言うなら「LLMのための[API](https://d.hatena.ne.jp/keyword/API)サーバー」です。この技術を活用することで、インフラスト[ラク](https://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)チャの管理に[自然言語](https://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC)インターフェースをもたらし、複雑な IaC (Infrastructure as Code) の作業を簡素化することができます。

Model Context Protocol は、AIモデルがローカル環境のリソースやツールに安全にアクセスするための架け橋となります。実装自体はシンプルな[JSON](https://d.hatena.ne.jp/keyword/JSON)-RPCベースの[プロトコル](https://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)なので、皆さんも自分の得意な分野や業務で使える[MCP](https://d.hatena.ne.jp/keyword/MCP)サーバーを実装してみてください。AIとのコラボレーションの可能性が大きく広がるはずです。

Rust による実装は、~~型安全性、堅牢なエラー処理、効率的な非同期処理など、多くの利点をもたらしています。特に~~[~~通信プロトコル~~](https://d.hatena.ne.jp/keyword/%C4%CC%BF%AE%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)~~の実装において、これらの特性は重要な役割を果たし、AIとツールの間のやり取りをスムーズかつ確実に行うための信頼性の高い基盤となっています。~~とても楽しいです。

また、こちらも応援お願いします。

> こちらCfPを書きました。皆様の応援が力になるので投票お願いします。
> 生成AIによるCloud Native 基盤構築の可能性と実践的ガードレールの敷設について | CloudNative Days Summer 2025 [https://t.co/vs2EfE2m41](https://t.co/vs2EfE2m41) [\#CNDS2025](https://twitter.com/hashtag/CNDS2025?src=hash&ref_src=twsrc%5Etfw)
> 
> [2025年2月25日](https://twitter.com/nwiizo/status/1894203706754707890?ref_src=twsrc%5Etfw)

あ、会社にも所属していて技術支援もやっているので興味があれば話をしましょうやー！

[sreake.com](https://sreake.com/)

## 各種参考リンク

- [Model Context Protocol 公式ドキュメント](https://modelcontextprotocol.io/)
- [MCP メッセージフォーマットとトランスポート仕様](https://modelcontextprotocol.io/docs/concepts/transports#message-format)
- [MCP GitHub リポジトリ](https://github.com/modelcontextprotocol)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Anthropic の MCP 紹介記事](https://www.anthropic.com/news/model-context-protocol)
- [Cline における MCP の解説記事](https://zenn.dev/codeciao/articles/cline-mcp-server-overview)
- [MCPで広がるLLM ~Clineでの動作原理~](https://zenn.dev/codeciao/articles/cline-mcp-server-overview)

syu-m-5151 [22日前](https://syu-m-5151.hatenablog.com/entry/2025/03/09/020057)  [ 読者になる ](https://blog.hatena.ne.jp/syu-m-5151/syu-m-5151.hatenablog.com/subscribe?utm_campaign=subscribe_blog&utm_source=blogs_entry_footer&utm_medium=button)

[https://www.facebook.com/v17.0/plugins/share_button.php?app_id=719729204785177&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df7e3447ce0e13b242%26domain%3Dsyu-m-5151.hatenablog.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fsyu-m-5151.hatenablog.com%252Ff096efd5f76139ca5%26relation%3Dparent.parent&container_width=0&href=https%3A%2F%2Fsyu-m-5151.hatenablog.com%2Fentry%2F2025%2F03%2F09%2F020057&layout=box_count&locale=ja_JP&sdk=joey](https://www.facebook.com/v17.0/plugins/share_button.php?app_id=719729204785177&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df7e3447ce0e13b242%26domain%3Dsyu-m-5151.hatenablog.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fsyu-m-5151.hatenablog.com%252Ff096efd5f76139ca5%26relation%3Dparent.parent&container_width=0&href=https%3A%2F%2Fsyu-m-5151.hatenablog.com%2Fentry%2F2025%2F03%2F09%2F020057&layout=box_count&locale=ja_JP&sdk=joey)

関連記事

- [ 2025-03-10 ](https://syu-m-5151.hatenablog.com/archive/2025/03/10) [tfmcp 🦀: A Rust-Implemented Tool to Operate Terraf…](https://syu-m-5151.hatenablog.com/entry/2025/03/10/091144) Introduction Hello! Today, I'd like to introduce a tool I r…
- [ 2025-01-15 ](https://syu-m-5151.hatenablog.com/archive/2025/01/15) [なんとなくRustで書いたNeovimプラグイン - cargo.nvim の話](https://syu-m-5151.hatenablog.com/entry/2025/01/15/110831) はじめに 全てのエンジニアが生成AIやAgentに夢中な2025年。私…
- [ 2025-01-10 ](https://syu-m-5151.hatenablog.com/archive/2025/01/10) [RustでのProtocol Buffersを学習するための図書管理システム実装](https://syu-m-5151.hatenablog.com/entry/2025/01/10/133852) はじめに Protocol BuffersとRustの実践的な学習を目的として図…
- [ 2024-12-04 ](https://syu-m-5151.hatenablog.com/archive/2024/12/04) [Rustによる郵便番号検索API (yubin_api) の技術解説](https://syu-m-5151.hatenablog.com/entry/2024/12/04/233641) こちらの記事は Rust Advent Calendar 2024 シリーズ 3 7日目の…