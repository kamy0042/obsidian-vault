---
Created: 2023-06-04T11:44:00
URL: https://zenn.dev/mizchi/articles/component-based-css
Tags: [topic/デザインシステム/コンポーネント設計]
---
- React や Svelte でコンポーネントベースで開発するとき特有の CSS ノウハウってあんまり効かない気がする
- Twitter に書いたら反響があったので、自己流だけどまとめておく
- React Component の管理単位と、CSS としてのレイアウトの管理ポリシーは違うよね、みたいな話をマークアップエンジニアに時折されるが、そんな話は無視して完全一致させる。そういう星のもとで開発している

## コンポーネントの分類

- ロジックコンポーネント
- レイアウトコンポーネント
- ブロックコンポーネント
- インラインコンポーネント

## 定義

- ロジックコンポーネント 
    - Provider や hooks などのデータ処理だけを扱い、子に渡すコンポーネント
    - 一切の CSS や DOM 実体を持たない
- レイアウトコンポーネント 
    - レイアウトコンポーネントは複数の子ブロックコンポーネント(または slot)を持ち、子ブロックコンポーネントを配置を決定することのみを責務とする
    - ルート以外のレイアウトコンポーネントは基本的に `width: 100%, height: 100%; margin: 0; padding: 0; box-sizing: border-box;` で `display: grid` or `display: flex`。 grid 推奨
    - レイアウトコンポーネントは自身の占める領域を `flex`, `grid` などを用いて領域を分割する
    - 分割された領域に対して、配置可能なブロックコンポーネントの数は 1 または 0 である
    - レスポンシブの実装もここで行う
- ブロックコンポーネント 
    - ブロックコンポーネントはレイアウトから与えられた領域を埋める要素
    - ブロックコンポーネントのルート要素は `width: 100%; height: 100%; margin:0; padding: 0; box-sizing: border-box; display: flex;`
    - ブロックコンポーネントの内部は、 1つのレイアウトコンポーネント、 または複数のインラインコンポーネントで構成される
- インラインコンポーネント 
    - 高さや幅を持たず、それ自身のコンテンツでサイズが決まる要素
    - **width, height が指定された固定サイズのコンテナー要素を挟んだブロックコンポーネントまたはレイアウトコンポーネントは、インラインコンポーネントとして扱う**
- 例外的な扱い 
    - 経験上、 DnD のようなデータと DOM構造が密な場合、ロジックコンポーネントとそれ以外を分離するのは不可能または困難
    - サービスがアプリケーション的なレイアウトの場合、レイアウトコンポーネントのルート要素は `width: 100vw; height: 100vh;` とすることが多いが、伝統的な縦に伸びるサービスでは、 ルートから近いレイアウトの一部では `height: auto; overflow: auto;` とする。

結果として Root => Layout => Block => Inline or Layout => Block => ... のような Layout と Block の繰り返しになる

## サンプル

- 説明用に style に直書きしている。(何かのCSSフレームワークを前提にするとその説明が必要なので...)
- 説明用に適当に書いたので、コードとしての可読性を重視しているが、実際何がレンダリングされるかみてない

```plain text
// Logic Component
const DataContext = createContext<{ value: number }>({ value: 0 });

function RootProvider(props: {children: React.ReactElement}) {
  return <DataContext.Provider value={{ value: 1 }}>
    {props.children}
  </DataContext.Provider>;
}

// Layout Component
function RootLayout(props: {
  header: React.ReactElement;
  content: React.ReactElement;
  footer: React.ReactElement;
}) {
  return <div style={{
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "grid",
    gridTemplateAreas: `
      'header'
      'content'
      'footer'
    `,
    gridTemplateColumns: "1fr",
    gridTemplateRows: "100px 1fr 300px"
  }}>
    <div style={{gridArea: "header"}}>{props.header}</div>
    <div style={{gridArea: "content"}}>{props.content}</div>
    <div style={{gridArea: "content"}}>{props.footer}</div>
  </div>
}

// Inline Component
function Title() {
  return <div>Hello, Example</div>;
}

// Block Component
function HeaderBlock() {
  return <div style={{
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    display: "flex",
  }}>
    Header
  </div>;
}

// Block Component
function ContentBlock() {
  return <div style={{
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    display: "flex",
  }}>
    <Title />
    Content~~~
  </div>;
}

// Block Component
function FooterBlock() {
  return <div style={{
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    display: "flex",
  }}>
    Footer
  </div>;
}

// Root Component
function App() {
  return <RootProvider>
    <RootLayout
      header={<HeaderBlock />}
      content={<ContentBlock />}
      footer={<FooterBlock />}
    />
  </RootProvider>
}

```

## メリット

- CSS に何の属性を書いたかで、コンポーネントの種類が自然と分類される
- ブロックコンポーネントは常に `width: 100%, height; 100%` として扱うので、どのブロックも交換可能
- レイアウトとブロックに分離することで、要素の配置変更に強く、レスポンシブや複数の画面表示モードの実装も容易
- ほとんどの要素に対して高さが事前に確定するので、スケルトンスクリーンの実装やクリティカルレンダリングパス最適化に優しい

## デメリット

- リキッドレイアウトに対して一貫した height 継承ポリシーを持ちづらい
- 油断するとブロックコンポーネントが overflow しやすい
- 慣習的な(Web制作の)スタイルとは言い難い

![[discussion 14.png]]