---
Created: 2025-10-22T23:13:00
URL: https://zenn.dev/cybozu_frontend/articles/e17267112d7816
Tags: [topic/デザインシステム/AI活用]
---
![[og-base-w1200-v2 13.png]]

## はじめに

2025年8月末にStorybook公式のMCPが登場しました。これがMCP Addonです。

また、Storybook MCPに関するさまざまな議論も行われています。

本記事では、Storybookの公式MCP Addonの機能とAgentic Workflow、そしてDesign Systems with Agentsという提案について解説します。

## Storybook MCP Addonとは

Storybook MCP Addonは、AIエージェントがStorybookのコンポーネント情報に直接アクセスして活用できるようにする公式アドオンです。

### 基本機能の説明

MCP Addonを使用すると、Storybookのベストプラクティスに基づいたStoryファイルを簡単に作成できます。

これにより、Storybookのバージョン更新やテスト機能など、Storybookの機能をフル活用できるようになります。

現在はClaude Codeでのみ動作検証をしているようです。

### Storybook MCPを使用してCursorと連携する

実際にStorybook MCPをCursorで使用する例です。

### セットアップ手順

MCPを使用するための準備をします。

公式ページではnpxを使った例が紹介されていますが、ここでは手動で設定していきます。

1. パッケージをインストールします。
2. storybookの設定ファイルに追加します。

```plain text
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp' // 追加
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}
export default config


```

3. Storybookを起動します。Storybookを起動したローカルサーバがそのままMCPサーバとして機能します。
4. 任意のコーディングエージェントやエディタでMCPの設定を追加します。

```plain text
{
  "mcpServers": {
    "storybook-mcp": {
      "type": "http",
      "url": "http://localhost:6006/mcp"
    }
  }
}

```

5. 確実にMCPを使用してもらうため、プロジェクトのルールやプロンプトの先頭に、下記のプロンプトを追加します。

```plain text
Before doing any UI, frontend or React development, ALWAYS call the storybook MCP server to get further instructions.

```

### 使用例

今回は下記のButtonコンポーネントにStoryファイルを作成します。

```plain text
import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

export interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

export default Button

```

まずは、MCPを読み込まない状態で、Storyファイルを生成してみます。

シンプルなプロンプトを使用しました。

以下のようなStoryファイルが生成されましたが、非常にシンプルな内容になっています。

```plain text
import { Button, type ButtonProps } from './Button'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<ButtonProps>

export const Primary: Story = {
  args: { label: 'Primary Buttons', variant: 'primary' },
}

export const Secondary: Story = {
  args: { label: 'Secondary', variant: 'secondary' },
}

export const Danger: Story = {
  args: { label: 'Delete', variant: 'danger' },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}


```

次にMCPを読み込ませたところ、Storyのパターン数が増えただけでなく、play関数やイベントのMockを活用したテストコードまで自動生成してくれました。

```plain text
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import { Button, type ButtonProps } from './Button'

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
  },
}

export default meta
type Story = StoryObj<ButtonProps>

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    variant: 'primary',
    fullWidth: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Button label="Primary" variant="primary" onClick={fn()} />
        <Button label="Secondary" variant="secondary" onClick={fn()} />
        <Button label="Danger" variant="danger" onClick={fn()} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Button label="Disabled Primary" variant="primary" disabled onClick={fn()} />
        <Button label="Disabled Secondary" variant="secondary" disabled onClick={fn()} />
        <Button label="Disabled Danger" variant="danger" disabled onClick={fn()} />
      </div>
    </div>
  ),
}

export const WithAccessibility: Story = {
  args: {
    label: 'Accessible Button',
    variant: 'primary',
    'aria-label': 'Save document',
    'aria-describedby': 'save-description',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p id="save-description" style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
          This button saves your document to the cloud.
        </p>
      </div>
    ),
  ],
}

export const ButtonTypes: Story = {
  render: () => (
    <form style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button label="Submit" type="submit" variant="primary" onClick={fn()} />
      <Button label="Reset" type="reset" variant="secondary" onClick={fn()} />
      <Button label="Button" type="button" variant="secondary" onClick={fn()} />
    </form>
  ),
}


```

Storybook MCP Addonを使用すると精度が上がり、Storybookの機能を使ったコードがすぐに生成されました。storybookの最新バージョンを使用した記法にもなっています。

### Stroy URLの提示

Storybook MCP Addonを使用すると、Storyからコンポーネントや状態を探し出し、そのURLを提示してくれます。プロジェクトの規模が大きくなりStoryの数が増えても、必要なコンポーネントを簡単に見つけることができるようになります。

プロンプトの例

```plain text
> わしたはprimaryのButtonコンポーネントを見たいです

⏺ ButtonコンポーネントのPrimaryバリアントを表示します。

  Primary Buttonを見る方法：

  ブラウザで以下のURLを開いてください：
  http://localhost:6006/?path=/story/components-button--primary

  これでPrimaryスタイルの青いボタンが表示されます。

```

## Storybook MCP Addonの展望の先にあるAgentic Workflow RFC

Storybook MCP Addonは現在も発展途上の段階にあり、これからの展望として **Agentic Workflow RFC** という提案で詳細が述べられています。

### AIが生成したUIの「見えない壁」をどう超えるか

AIを使ってUI開発を行うときの大きな問題点は、**AIが作ったUIがどう見えるか確認しにくい**ことです。AIがコードを生成しても、実際にアプリに組み込む前にそのUIが正しく動くか確かめるのが難しいのです。

Storybookは開発者がUIを目で見て確認するためのツールですが、今のところAIとの連携はまだ十分ではありません。

今回のRFCでわかることは、Storybook MCP Addonは、すでにStorybookを使っている開発者の作業をより便利にし、生成AIとの連携を高めることです。

### Storybook MCP Addonこの先の展望

これからさらに良いAIワークフローを作るために、以下の機能が考えられているようです。

6. **良いストーリーの基準を明確にする:** `play-functions`でのテスト量や、様々な設定の組み合わせなど、「良いストーリー」とは何かを明確にし、AIに理解させる方法を改善する。
7. **評価の自動化:** 現在は手作業で何度も実験していますが、`evalite`などのツールを使って自動化する必要がある。
8. **AIによる自己チェックと改善:** MCPサーバーを通じて、AIが自分の作業を見直し、改善できるようにする。
9. **専用の確認画面の作成:** AIが作業したとき、コードの変更だけでなく、ユーザーが**見た目の**変化を確認できるように、Storybook内に専用の画面を作る計画も考えている。

この取り組みはまだ始まったばかりですが、Storybookと生成AIを活用した開発がより進む可能性があります。

## AIエージェントがデザインシステムを使いこなすために「Storybook Design Systems with Agents RFC」の提案

最近、AI（LLM）でUIを自動的に作る取り組みが増えています。でも問題があります。AIが**デザインシステムを守らない**ことが多いのです。

この問題を解決するため、StorybookのデザインシステムとAIを上手く連携させる「**Storybook Design Systems with Agents RFC**」（意見募集）が提案されています。

### AIがデザインシステムを使えていない

多くのチームがデザインシステムを作る時に使うStorybookですが、AIを使ってUI開発をする時に問題が起きています。AIが**デザインシステムを正しく使えていない**のです。

AIは既存のコンポーネントとは違う独自のパーツやスタイルを作ってしまいます。例えば、チームが時間をかけて作ったデザインシステムがあるのに、AIはそれを使わず、**shadcnやTailwind**だけを使って新しく作ってしまうことが多いです。

今のStorybookには、AIにデザインシステム情報を提供するための**連携機能がありません**。また、Storybookは必要な情報を直接公開していないので、チームが独自に連携させるのも難しいのが現状です。

[Figma Code Connect](https://developers.figma.com/docs/code-connect/) と [Figma DevMode MCP](https://help.figma.com/hc/ja/articles/32132100833559-Dev-Mode-MCP%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E5%88%A9%E7%94%A8%E3%82%AC%E3%82%A4%E3%83%89)を使えば、Figmaのデザインデータとコードを連携させることはできますが、Storybookの資産をうまく活用することはまだできていません。新しく提案されている「Storybook Design Systems with Agents RFC」は、Storybookのデザインシステム情報をAIに提供することで、この問題を解決しようとしています。

### マニフェストとMCPサーバー

このRFCでは、StorybookのコンポーネントデータをAIが使えるように公開する方法を提案しています。

**1. コンポーネント・マニフェストを作る**

Storybookは、コンポーネントの情報を整理したデータを作ります。これを「**コンポーネント・マニフェスト**」と呼んでいます。

このマニフェストには、AIがデザインシステムを理解するために必要な情報が含まれます：

- 使えるコンポーネントとツールの一覧
- 各コンポーネントの名前と説明
- 設定できる**項目（Props）**とその詳細
- 使用例となる**サンプルコード**
- 関連ドキュメントや他のコンポーネント

このデータは、開発中はJSONで動的に提供され、公開時は**静的ファイル**として保存されます。コンポーネントが多くても扱いやすいように、個別のファイルに分けて管理される仕組みのようです。

**2. MCP サーバーの働き**

このデータをAIが使えるようにするのが「**Design System MCP Server**」です。

MCPサーバーは、マニフェストをAIが理解しやすい形式（読みやすいテキストやMarkdown形式など）に変換することが考えられています。

MCPサーバーは、Storybookを*使う人*（アプリ開発チームなど）のためのもので、**Storybookに直接つながっているわけではありません**。デザインシステムがStorybookで作られていれば、Storybookを使っていないチームでもMCPサーバーを利用できます。**これがAddon MCPとの違いのようです。**

### 提案されているアーキテクチャとツール

MCPサーバーは、AIが簡単に情報を取得できるよう、次の3つの機能が提案されています。

10. **コンポーネント一覧表示**：AIが使えるコンポーネントをすべて確認できる。
11. **コンポーネント詳細表示**：AIが選んだコンポーネントの詳しい情報（設定項目や使用例など）を見れる。
12. **キーワード検索**：大きなデザインシステムの中から必要なコンポーネントを効率よく探せる。

マニフェストファイルはnpmパッケージに入れたり、Storybookのビルドから取得したり、開発サーバーから取得したり、Chromaticなどの公開Storybookから取得できる予定のようです。

### 実現のためのステップ

この提案されたRFCの実現には、Storybookのコアに対する大きなアーキテクチャ変更が必要とのことです。現在、公開したいメタデータの95%はクライアント側でのみ利用可能ですが、この仕組みを機能させるにはサーバー側で利用可能にする必要があるためのようです。

このため、RFCでは段階的な実装計画が提案されています。

- **v0.0.1（実験版）**：Storybookを使わず、LLM（例：Claude 4 Sonnet）にMarkdown形式の「マニフェスト」を生成させ、MCPサーバーで消費する実験を行い、ソリューションの価値を検証。
- **v0.0.2**：LLM生成の出力をMarkdownではなく、**構造化されたJSON形式**にすることで、マニフェストの構造を反復的に検証する。
- **v0.1.0**：Storybookが生成する最初の最小バージョンとして、**コンポーネントのトップレベルリストのみ**（名前と説明）をマニフェストとして公開。
- **v0.2.0**：コンポーネントの**Propsの型と説明**を追加。これには、現在クライアント側で実行されているドキュメント生成プロセス（docgen）をサーバー側へ移行する必要がある。
- **v1.0.0**：ストーリーに基づいた**コンポーネントの使用例（例：JSXスニペット）**を追加。これも現在ブラウザで生成されているデータをサーバー側で生成する必要がある。

### 今後の展望

まだまだ先は長いようですが、Stroybookにデータを貯めているデザインシステムにとっては、とても夢のある話です。

弊社のデザインシステムでも、デザインシステムを中心に、デザインと実装に関するデータはStorybookで管理されています。Single Source of Truthの状態をどこに投資するかはこのような展望を追っておくと判断材料が増えるのではないでしょうか。

弊社のデザインシステムの事例はnoteにまとまっているので、こちらもご参考にどうぞ。

## 参考リンク