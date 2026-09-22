---
Created: 2025-10-28T13:57:00
URL: https://developers.cyberagent.co.jp/blog/archives/59564/
Tags: [topic/デザインシステム/AI活用]
---
## はじめに

AmebaLIFE事業本部でWebフロントエンドエンジニアをしている湯本航基（[@yu_3in](https://twitter.com/yu_3in)）です。

本記事では、AI（Claude Code / Cursor）とデザインシステムSpindleが提供する[Spindle MCP](https://github.com/openameba/spindle/tree/main/packages/spindle-mcp-server#readme)を活用してTableコンポーネントを開発した話をします。

特に、**Spindle MCPがどのように開発速度と品質の両立に貢献したか**について、具体的な活用例とともに紹介します。

## Spindle Table コンポーネントについて

まず、今回開発したTableコンポーネントについて簡単に紹介します。

Storybookからぜひ実際に見て触ってみてください。

[https://ameba-spindle.web.app/?path=/docs/table–docs](https://ameba-spindle.web.app/?path=%2Fdocs%2Ftable--docs)

### Tableコンポーネントが解決する課題

テーブルは一見シンプルに見えて、実装時のつまづきポイントが多いコンポーネントです。

- 角丸の適用
- セル結合と border の組み合わせ
- 横スクロール時の挙動

こうした課題に毎回向き合うのは面倒です。

### Spindle Tableの設計思想

Spindle Tableコンポーネントは、**Web標準の **[**<table>**](https://html.spec.whatwg.org/multipage/tables.html#the-table-element)** をwrapする立ち位置**を目指して開発しました。

上記の課題を予め解消した「Amebaでよく使われるデザインパターン」を提供します。

Reactのコンポーネントとして使う場合は以下のように書けます。

```plain text
<Table.Frame borderTypes={['horizontal', 'outlined']} rounded striped>
  <Table.Caption>売上データ（2023年第4四半期）</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>商品名</Table.Head>
      <Table.Head align="right">売上（円）</Table.Head>
      <Table.Head align="center">前年比</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Head scope="row">商品A</Table.Head>
      <Table.Cell align="right">1,200,000</Table.Cell>
      <Table.Cell align="center">+12%</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Head scope="row">商品B</Table.Head>
      <Table.Cell align="right">980,000</Table.Cell>
      <Table.Cell align="center">-3%</Table.Cell>
    </Table.Row>
    {/* ... */}
  </Table.Body>
</Table.Frame>
```

例えば `<Table.Frame>` には`borderTypes` や `rounded`、 `striped` などのプロパティを用意しています。

このコンポーネントはこのように表示されます。

![](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2025/10/spindle-table-sample.png)

他にも様々なパターンを用意しているので、詳しくは[Storybook](https://ameba-spindle.web.app/?path=%2Fdocs%2Ftable--docs)をご覧ください。

### カスタマイズ性の高い設計

AmebaLIFE事業本部では[Amebaブログ](https://www.ameba.jp/)をはじめ、[Ameba塾探し](https://terakoya.ameba.jp/)、[Ameba学校探し](https://school.ameba.jp/)、[Amebaチョイス](https://choice.ameba.jp/)、[ドットマネー](https://d-money.jp/)などの様々なサービスを運営しています。

サービスによってテーブルのカラーセットなどのデザイン要件が異なることが多いため、これまでのSpindleコンポーネントではあまりなかった**カスタマイズ性の高い設計**を念頭に設計しました。

具体的には、**CSS Variablesによるスタイル上書きを全面的に許可**しています。

以下はその例です。基本的にはプロダクト全体でカスタマイズすることを想定していますが、個別のテーブルでもカスタマイズ可能です。

```plain text
/* プロダクト全体でのカスタマイズ */
:root {
  --Table-head-backgroundColor: var(--color-surface-accent-primary);
  --Table-head-color: var(--color-text-high-emphasis-inverse);
}

/* 個別のテーブルでのカスタマイズ */
.custom-table {
  --Table-cell-padding: 16px 12px;
  --Table-borderRadius: 8px;
}
```

CSS Variablesは5つに分類して整備しました。

- **Surface** – 背景関連
- **Text** – テキスト関連
- **Border** – ボーダー関連
- **Layout** – レイアウト関連
- **Caption** – キャプション関連

![](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2025/10/spindle-table-css-variables.jpg)

CSS Variables リファレンス。大量のCSS Variablesが用意されていることがわかる

これにより、Tableを扱うときのつまづきを解消しつつ、プロダクトごとの要件に柔軟に対応できる共通基盤となりました。

## AI活用の実践

ここからが本題です。Tableコンポーネントの開発におけるAIとSpindle MCPの活用の話をします。

### 開発フロー概要

開発は大きく以下の流れです。

1. **Design Doc（詳細設計）**（Cursor + Spindle MCP）
2. **実装**（Claude Code + Spindle MCP）
3. **レビュー・調整**

設計時と実装時で期間が空いていたため、使用するAIツールが異なっています。

DesignDocは後述のSpindle MCPの活用もあり、短期間で書き上げることができました。

実装自体もDesignDocからの生成精度がかなり高く、DesignDocのレビュー段階で既に動くものを提示できていました。

もちろん、`border`の細かいところなど調整が必要な部分はありましたが、基礎部分はAIが担当してくれたおかげで、デザイン要件との整合性確認やエッジケースの対応に集中できました。

### Spindle MCPの威力

[Spindle MCP](https://github.com/openameba/spindle/tree/main/packages/spindle-mcp-server#readme)は、SpindleデザインシステムをAIに理解させるためのツールです。

詳細については、[Spindle MCP で変わるデザインシステムの開発 ~ Figma 連携で実現する超高速開発 ~](https://developers.cyberagent.co.jp/blog/archives/56844/)をご覧ください。

### 1. Design Doc作成での活用

Design Doc作成時には、主に以下のSpindle MCPツールを活用しました。

### `get_component_design_doc_templete`

Design Docのテンプレートを取得し、それをベースにAIに初稿を作成してもらいました。

### `get_design_tokens` / `get_design_token`

Design Docの「CSS Variables リファレンス」セクションにて、CSS VariablesとDesign Tokenのマッピングに活用しました。

AIがDesign Tokenの意図を一定の精度で理解してくれたこと、他のリファレンスを手渡しせずともかなりの精度が出ました。

手動でやっていたらかなりの時間がかかっていたと思います。

### `get_accessibility_docs`

Design Docでは、[Ameba Accessibility Guidelines](https://a11y-guidelines.ameba.design/)に則したアクセシビリティセクションの生成およびレビューをAIにやってもらいました。

実装後のレビュー依頼前にも、セルフレビューの一環としてこのツールを活用してアクセシビリティチェックを行いました。

### `get_components` / `get_component_info`

Design Docから初期コードを生成する際に使用しました。

Spindleならではの書き方やルールがあるので、代表的なコンポーネントを参照するよう指示しました。

### AI活用の課題と学び

AIを活用することで高速に開発を進めることができた一方で課題もありました。

### DO/DO NOTの生成精度

Design Doc作成時、DO/DO NOTセクションの生成はうまくいかず、手動で調整しました。

うまくいかなかった主な原因は、DO/DO NOTに何をどの粒度で書くかという共通認識が不足していたためと考えています。

### Figma MCPの未活用

今回、Figma MCPは使用しませんでした。

FigmaでTableコンポーネントを直接的に表現できない制約があり、デザインデータとしても活用が難しいと考えたためです。

Tableのような構造的なコンポーネントでは、Figmaよりもテキストベースでの設計が適していると感じました。

Cursor/Claude CodeとSpindle MCPの併用により、**ラクに速く、そして品質を保ったまま**Tableコンポーネントを開発できました。

特にDesign Docからのコードの生成精度が高く、Storybookも自動生成で大きく工数を削減できました。実際、Storybookはパターン数が多くブラウザが固まるほどで、手作業なら日が暮れていたと思います。

AI活用が進む中で、実装の詳細からより抽象度の高い設計へ時間を割けるようになりました。とりわけ、**どんなコンポーネントを提供するのが長期的に良いか**という観点をより意識できたのが良かったです。

今後もAIやMCPとの協働を通じて、より良い開発体験を追求していきます。