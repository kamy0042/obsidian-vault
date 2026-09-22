---
Created: 2025-07-01T09:48:00
URL: https://zenn.dev/moneyforward/articles/43bcef16b033f8
Tags: [topic/デザインシステム/AI活用]
---
この記事は、弊社で開発しているデザインシステム MFUI のコンポーネント情報を AI コーディングアシスタントに効率的に提供するために開発した Model Context Protocol (MCP) サーバーの実装と活用方法について解説します。

なお、MFUI の詳細についてはこの記事では触れません。

弊社のテックイベント [Money Forward TECH DAY'24](https://techday.moneyforward-dev.jp/2024/#main) にて同じチームの [Taiga Kiyokawa](https://zenn.dev/taigakiyokawa) さんの Money Forward UI の紹介をご覧ください。

また、Model Context Protocol の詳細についての詳しい解説もありませんので、公式の情報を参照してください。

## MCPサーバーの目的

MFUI は、Storybook をドキュメンテーション基盤とし、詳細の利用方法は各ストーリーに、コンポーネントのインターフェース詳細は JSDoc に記載されています。この情報を AI コーディングアシスタント（Cursor など）が正確に理解して活用できるようにするため、MCP サーバーを通じてコンポーネントのソースコードを直接提供する仕組みを構築しました。

MFUI の MCP サーバー（以下 `mfui-developer-mcp`）は、[@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) を使用して実装されており、主に以下の 3 つのツールを提供しています。

1. **get_available_components**: 利用可能なすべての MFUI コンポーネントのリストを取得
2. **get_available_react_icons**: 利用可能なすべての MFUI アイコンのリストを取得
3. **get_component_files**: コンポーネント名を受け取り、そのコンポーネントのディレクトリ内にある全ファイルを取得

### 技術スタック

- **言語**: TypeScript
- **ランタイム**: Node.js
- **依存パッケージ**: 
    - `@modelcontextprotocol/sdk`: MCP サーバー実装のための SDK
    - `zod`: 入力バリデーション用ライブラリ

### MFUIのディレクトリ構成

MFUI は、モノレポ構造で管理されており、主要なパッケージとアプリケーションは以下のような構成になっています。

```plain text
mfui/
├── apps/
│   └── mcp-server/          # mfui-developer-mcpの実装
│       ├── dist/
│       │   └── index.js     # ビルド時に生成され、MCPクライアントによって実行されるファイル
│       ├── src/
│       │   └── index.ts     # サーバーの実装
│       └── package.json
│
├── packages/
│   ├── components/          # UIライブラリ
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Checkbox/
│   │   │   ├── ... (その他のコンポーネント)
│   │   │   └── index.ts    # パッケージのエントリーポイント
│   │   └── package.json
│   │
│   └── icons-react/        # Reactアイコンコンポーネント
│   │   ├── dist/
│   │   │   ├── ... (各アイコンのtsxファイル)
│   │   │   └── index.ts    # パッケージのエントリーポイント
│   │   └── package.json
│
└── package.json

```

### コンポーネントの構成

各コンポーネントは、以下のようなファイル構造で実装されています。

```plain text
components/src/ComponentName/
├── ComponentName.tsx          # コンポーネント本体
├── ComponentName.types.tsx    # 型定義
├── ComponentName.stories.tsx  # Storybook用定義
└── index.ts                   # エクスポート定義

```

## 実装詳細

リポジトリは公開できませんので、ソースコードの一部を紹介します。

余談ですが、これらのコードもほとんど Cursor の Agent を使って実装したため、人間の手はほとんど入っていません。

恐ろしい時代になってきましたね。

### サーバーの初期化

```plain text
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// サーバーインスタンスの作成
const server = new McpServer({
  name: 'mfui-developer-mcp',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {},
  },
});

```

### コンポーネント一覧取得ツール

パッケージのエントリーポイントである index.ts で export されているファイル名を取得し、コンテキストに含めています。

アイコンの取得も同様の処理で行なっています。

```plain text
// get_available_components ツールの登録
server.tool('get_available_components', 'Get a list of available MFUI components', {}, async () => {
  const componentsIndexPath = path.join(rootDir, 'packages/components/src/index.ts');
  const componentsIndexContent = await fs.promises.readFile(componentsIndexPath, 'utf-8');

  // コンポーネント名を components/index.ts から抽出
  const componentNames = componentsIndexContent
    .split('\n')
    .filter((line) => line.startsWith('export *'))
    .map((line) => {
      const match = line.match(/['"]\.\/(.+)['"]/);
      return match ? match[1] : '';
    })
    .filter((name) => name !== '');

  return {
    content: [
      {
        type: 'text',
        text: 'Available MFUI Components:\n\n' + componentNames.join('\n'),
      },
    ],
  };
});

```

### コンポーネントファイル取得ツール

コンポーネント名は引数として受け取ることができます。MCP 公式ドキュメントに従い、zod でバリデーションを行なっています。

コンポーネント名のディレクトリの中のファイルを全てコンテキストに含めて返却しています。

```plain text
// get_component_files ツールの登録
server.tool(
  'get_component_files',
  'Get files for a specific MFUI component',
  {
    componentName: z.string().describe('Name of the component to get information for'),
  },
  async ({ componentName }) => {
    const componentsDir = path.join(rootDir, 'packages/components/src');
    const componentPath = path.join(componentsDir, componentName);

    try {
      // コンポーネントディレクトリの存在確認
      await fs.promises.access(componentPath);

      // ディレクトリ内のファイル一覧取得
      const files = await fs.promises.readdir(componentPath);

      // 各ファイルの内容読み込み
      const fileContents = {};
      for (const file of files) {
        const filePath = path.join(componentPath, file);
        try {
          const content = await fs.promises.readFile(filePath, 'utf-8');
          fileContents[file] = content;
        } catch (error) {
          fileContents[file] = `Error reading file: ${error.message}`;
        }
      }

      return {
        content: [
          {
            type: 'text',
            text:
              `Component: ${componentName}\n` +
              `Directory: ${componentPath}\n\n` +
              `Available files:\n${files.join('\n')}\n\n` +
              `File contents:\n\n` +
              Object.entries(fileContents)
                .map(([filename, content]) => `=== ${filename} ===\n${content}\n`)
                .join('\n'),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Component "${componentName}" not found. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
      };
    }
  }
);

```

## MCPサーバーの配布方法

MCP サーバーの代表的な配布方法としては以下の方法があります。

4. ソースコードを配布し、利用者自身の端末に直接インストールしてビルドしてもらう

mfui-developer-mcp では、3 番目の「直接インストールしてビルド」アプローチを選択しました。この決定は以下の理由に基づいています。

- ソースコードをそのまま返却してしまうため、セキュリティの観点から懸念点を減らすため
- プロダクト開発者に MFUI リポジトリを直接クローンして関わることを奨励し、デザインシステムへのコントリビュートを促進するという目的に沿うため

## セットアップ方法

5. 利用者の端末に MFUI リポジトリを直接クローン
6. いくつかのコマンドを実行して MCP サーバーをビルド
7. MCP クライアントにサーバーの設定を追加

### Cursor を例にした設定

```plain text
{
  "mcpServers": {
    "mfui-developer-mcp": {
      "command": "node",
      "args": [
        "/your/path/to/mfui/apps/mcp-server/build/index.js"
      ]
    }
  }
}

```

`mfui-developer-mcp` の活用方法をご紹介します。

### 1. コンポーネント実装サポート

AI に MFUI コンポーネントの利用方法を尋ねることができます。

![](https://res.cloudinary.com/zenn/image/fetch/s--rWc07Anx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/7e46eac754d31d5902068eee.png%3Fsha%3D4e72f46b5676ebac6956485de098e2437487bfcd)

Cursor AgentにMFUIのDataGridの使い方を聞いている画像。DataGridコンポーネントの利用方法が正確に回答されている。

各プロパティの詳細の利用方法などを聞くこともできるので、開発のサポートをしてくれます。

### 2. Figmaデザインとの連携

[Framelink Figma MCP Server](https://github.com/GLips/Figma-Context-MCP) と組み合わせて使用することで、デザインデータから MFUI コンポーネントを活用した実装提案を受けることができます。

![](https://res.cloudinary.com/zenn/image/fetch/s--mbeYq5YR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/a833a0fce951700e2d8941f0.png%3Fsha%3D60f8d27c6729f334a044bea067071cfca3da5cd8)

Cursor AgentにFigmaのリンクを渡してページを作るために必要なMFUIのコンポーネントを洗い出すように依頼している画像。Cursor AgentはFigmaとMFUIのmfui-developer-mcpを利用し、実際にMFUIで提供されているいくつかのコンポーネントを提示している。

## 今後の改善点

### 1. コンテキストウィンドウに与える影響

`get_component_files` ではコンポーネントそれぞれのソースコードをコンテキストに含めるため、かなりのトークンサイズになってしまいます。そのため、今後は詳細な利用方法をドキュメントに落とし込んで返却するなど、トークンサイズを減らす工夫をする必要があります。

しかし、ソースコードそのものをコンテキストに含めるということはソースコード全てを理解できるため、デバッグなどにも役に立つと考えています。またドキュメントを作るということは、ドキュメントをメンテナンスする必要が発生します。

そのため、どのように改善していくかは、MCP を使った回答精度やメンテナンスの負荷も考慮して、慎重に進める必要があります。

### 2. 他のリソースとの連携方法を模索する

コンポーネント実装のベストプラクティスやアクセシビリティガイドラインなどと連携させ、AI が MFUI を含めたより良いコードを生成できるように改善していきたいと考えています。

### 3. 開発者だけでなくデザイナーやPdMにとっても便利なものにする

MFUI は単なる UI ライブラリではなく、デザインスタンダードやデザイン原則なども含むデザインシステムです。そのため、開発者が MFUI のコンポーネントを使う場合だけでなく、デザイナーがプロダクトをデザインする時や、PdM などがプロダクトの仕様を検討する時などにも、UI の利用方法を把握するために MCP サーバーを利用できる可能性があります。

本記事では、デザインシステム MFUI を MCP サーバー化して社内に提供した取り組みについて紹介しました。

MCP サーバーを通じて MFUI のコンポーネント情報を AI に提供することで、開発者の生産性向上に貢献できると確信しています。

今後は、より多くのユースケースに対応できるよう機能を拡充していくとともに、開発者だけでなくデザイナーや PdM など、より多くのステークホルダーにとって価値のあるツールとなることを目指していきます。

また、この取り組みを通じて得られた知見が、他のチームや企業のデザインシステム運用の参考になれば幸いです。

[GitHubで編集を提案](https://github.com/tongari07/zenn-content/blob/main/articles/43bcef16b033f8.md)

![](https://static.zenn.studio/images/drawing/discussion.png)