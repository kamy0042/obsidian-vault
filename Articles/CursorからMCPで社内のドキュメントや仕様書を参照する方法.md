---
Created: 2025-04-07T10:37:00
URL: https://zenn.dev/kadoya/articles/872f4dac6d8bcc
Tags: [topic/AI]
---
![](https://storage.googleapis.com/zenn-user-upload/topics/23eef6d9d7.png)

![](https://storage.googleapis.com/zenn-user-upload/topics/54d1e3ddea.png)

![](https://storage.googleapis.com/zenn-user-upload/topics/59acb4066e.png)

![](https://storage.googleapis.com/zenn-user-upload/topics/f11c7465e5.png)

# はじめに

CursorやGithub Copilot、Clineなど、コーディングに生成AIを使うのは当たり前になりました。AIにコードを書かせているとき、この仕様どおりに書いてくれないかなあ、と思う場面があります。Cursorには外部ドキュメントを読み込む機能があるので、指定しておけば、公開されているリファレンスなどをAIが読み込むことができるのですが、社内にある仕様書や開発標準などのドキュメントを参照したいケースもあるでしょう。この記事ではRunbookのMCPサーバーを使って、社内ドキュメントをAIに読み込ませる方法を紹介します。

# Runbookについて

Runbookはマニュアルや手順書を作成するためのWebサービスです。マニュアルを社内で共有したり、インターネットに公開したりできます。あと手順を組み合わせてワークフローのように実行できるらしいです。有料サービスですが、今回の方法ではAPIアクセスのみなので、一番安いプランで十分利用できます（APIの実行回数の制限はあります）。30日間の無料お試しもあります。

# MCPってなに

この記事を読まれる方にはもはや説明不要と思いますが、CursorやChatGPTなどの生成AIから使えるプラグインの標準仕様のようなものです。CursorやClineといったAIエディタからも呼び出すことができます。

Runbookの公式MCPサーバーが公開されているので、これを使います。

# セキュリティは大丈夫？

MCPから取得したデータは、学習に使われるわけではなく、内部的にユーザーが入力したプロンプトの一部として利用されます。このように外部データを用いて、生成AIの回答の精度を高めることを、検索拡張生成 (RAG)と呼びます。RunbookのMCPサーバーより取得される情報には、Runbookのアクセス権が適用されます。

CursorにはPrivacy modeという設定があり、これをオンにすることでプロンプトやコードを学習データに使用しないとあります。非公開のコードを扱う場合は必ずオンにしてください。

# MCPサーバーを設定する

## RunbookのAPIトークンを取得する

仕様書があるワークスペースの設定画面を開いて、APIトークンを発行します。

![](https://storage.googleapis.com/zenn-user-upload/e700d420b5d4-20250404.png)

## Node.jsのインストール

RunbookのMCPサーバーを使うには、バージョン20.0.0以上のNode.jsが必要です。古いバージョンのNode.jsを使っている場合はアップグレードしてください。

```plain text
node --version

```

## CursorにMCPサーバーの設定をする

`Cursor Settings` > `MCP` で、RunbookのMCPサーバーを追加します。APIトークンとサブドメインは適宜置き換えてください。今回は、RunbookのAPIリファレンスを読み込んでみることにします。

mcp.json

```plain text
{
  "mcpServers": {
    "Runbook API Reference": {
      "command": "npx",
      "args": [
        "-y",
        "@runbook-docs/mcp-server",
        "--api-token=your-api-token",
        "--base-url=https://your-subdomain.runbook.jp"
      ]
    }
  }
}

```

設定が完了したら、ステータスにEnabledと表示されます。

![](https://storage.googleapis.com/zenn-user-upload/b1f39d1a1b5c-20250404.png)

# 使ってみよう

準備ができましたので、いよいよCursorのチャットウインドウから指示を出してみます。

```plain text
RunbookのAPIリファレンスを参照して、APIから記事一覧を取得するコードを書いて

```

リファレンスを検索して、適切な記事を探してくれています。

![](https://storage.googleapis.com/zenn-user-upload/c6e21e4efa53-20250404.png)

使い方の説明もしてくれました。

![](https://storage.googleapis.com/zenn-user-upload/415adcdb488b-20250404.png)

実際に書いてくれたのがこのコードです。インターフェイスもきちんと仕様書どおりに作成してくれていますね。GraphQLのパラメーターも合っています。

```plain text
interface GraphQlResponse {
  errors?: { message: string; extensions: { code: number } }[];
  data?: { [key: string]: any };
}

interface Article {
  uid: string;
  name: string;
  slug: string;
  id: string;
  bodySnippet: string;
  createdAt: string;
  updatedAt: string;
}

export async function listArticles(
  config: Config,
  bookUid: string
): Promise<Article[]> {
  const response = await fetch(`${config.baseUrl}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiToken}`
    },
    body: JSON.stringify({
      query: queries.getArticles,
      variables: {
        bookUid,
        orderBy: 'updatedAt'
      }
    })
  });

  const result = (await response.json()) as GraphQlResponse;

  if (result.errors) {
    throw new RequestError(
      result.errors[0].message,
      result.errors[0].extensions.code
    );
  }

  return result.data?.node?.articles?.nodes || [];
}

```

# まとめ

わずか数行の設定をコピペするだけで、CursorとRunbookが連携できるようになりました。これでバイブコーディングも爆速になりますね！

最近はCursorをコーディングだけではなくブログなどの執筆や文書作成にも利用する方も多いと聞きます。今後さらに、社内の共有ドキュメントを生成AIから利用したいシーンが増えるのではないでしょうか。

![](https://static.zenn.studio/images/drawing/discussion.png)