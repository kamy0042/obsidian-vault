---
Created: 2025-04-11T13:35:00
URL: https://zenn.dev/layerx/articles/7e9f87fca65e94
Tags: [topic/デザインシステム/AI活用]
---
![](https://storage.googleapis.com/zenn-user-upload/topics/d94932ce30.png)

LayerX バクラク事業部 Enabling チームでスタッフエンジニアをしている [izumin5210](https://x.com/izumin5210) です。

Ubie さんの「[**社内デザインシステムをMCPサーバー化したらUI実装が爆速になった**](https://zenn.dev/ubie_dev/articles/f927aaff02d618)」を拝見し、~~悔しかった~~感動したので、自分でも試してみました。

## MCP ツール設計

以下に引用する Ubie さんのスライドで解説されているとおりですが、現行モデルでは全コンポーネントのコードやルールを一気に渡してもノイズが多くなりすぎるためか、満足のいく性能は出ませんでした。

これは MCP サーバ化したとしても同様で、Tool 1回の呼び出しで全コンポーネントの詳細情報をすべて返すとやはり情報がぼやけてしまいます。

> 
> ![](https://storage.googleapis.com/zenn-user-upload/c95827aa1663-20250410.png)
> 
> [*AI Coding Agent Enablement - エージェントを自走させよう (p.23)*](https://speakerdeck.com/yukukotani/ai-coding-agent-enablement?slide=23)

これらを踏まえると、以下のような2つのツールに分けて提供するのがよさそうだと判断しました。

- 利用可能なコンポーネントの名前・ざっくりした概要など、最低限の利用可能性判断に使える情報を返すリスト取得 tool
- 指定したコンポーネントの props 一覧の型・ドキュメントや、そのコンポーネントの利用例などをの詳細情報取得 tool

（RESTish な API における List API / Get API の分割と同じような考え方になりますね。ちょっとおもしろい。）

## MCP サーバの情報ソースに Storybook を参考にする

弊社バクラク事業部でも React 製 webapp 向けに共通 UI コンポーネントを整備しており、かつコードコメントと Storybook による簡易なドキュメント・用例集をメンテナンスしています。それを AI Agent が活用できれば生産性がグッと高まることが期待できます。

MCP は公式で TypeScript SDK を公開しています。TypeScript や React のエコシステムを活用しつつ MCP サーバを実装することが比較的容易にできます。

### Storybook からコンポーネント一覧を取得し、MCP サーバから返す

Storybook をブラウザで開くときに Chrome DevTools などで通信を見てみると、最初に `index.json` というファイルをフェッチしています。

これは名前そのままで、提供されている Story の一覧が記述されたファイルです。

```plain text
{
    "v": 5,
    "entries": {
        "button--docs": {
            "id": "button--docs",
            "title": "アクションUI/ボタン Button [ready]",
            "name": "Docs",
            "importPath": "./src/components/Button/Button.stories.tsx",
            "type": "docs",
            "tags": [
                "autodocs"
            ],
            "storiesImports": []
        },
        // ...
    }
}

```

コンポーネントの一覧を取得する方法は色々ありますが、「外部からの利用が想定された共通 UI コンポーネントの一覧」と捉えると Storybook の Story 一覧が手っ取り早いかなと思い、この JSON を加工して MCPサーバから返すようにしてみました。

公開 API ではないので仕様が変わって壊れる可能性もありますが、社内ツールならなんとかなるだろ！の精神で勢いよくやっています。

### Storybook を参考にコンポーネント詳細を取得し、MCP サーバから返す

先程もかるく触れましたが、エディタの hover や Storybook などで参照できるようにするため、各コンポーネントには TSDoc(コメント) で簡単な説明や利用例を記述していました。

```plain text
type ButtonProps = {
  disabled?: boolean;
  /**
   * 無効状態の理由を説明するための popover の本文。
   */
  disabledReason?: ReactNode;
};

/**
 * @see https://example.com/path/to/hosted-storybook
 * @see https://example.com/path/to/figma
 *
 * @example disabled な理由を popover で表示
 * ```tsx
 * <Button disabled disabledReason="権限が不足しています">
 *   送信
 * </Button>
 * ```
 *
 * @example ボタンリンク
 * ```tsx
 * <Button asChild>
 *   <Link href="/foo/bar">リンク</Link>
 * </Button>
 * ```
 *
 * ...
 *
 */
export function Button(props: ButtonProps) {
  // ...
}

```

なので、この情報を MCP サーバから返すことができればよさそうです。最も単純には、このコンポーネントが実装された `.tsx` ファイルを渡すことが考えられます。

しかし、バクラク事業部で利用する共通コンポーネント実装では [cva](https://cva.style/docs) を利用してスタイルを記述していたり、複数ファイルにまたがる多少複雑なコンポーネントがあるなど、コンポーネントが1ファイルしないことも多いです。かといって関連する全てのファイルを渡してしまうと情報の密度が下がってしまいます。

そこで、最低限かつ詳細なコンポーネント情報を取得するために、Storybook に着目しました。

Storybook は TypeScript の型情報やコンポーネントのコメントからドキュメントを生成してくれます。

![](https://storage.googleapis.com/zenn-user-upload/e5ddfe52beaa-20250410.png)

*Button コンポーネントの Storybook。 
型定義と TSDoc（コメント） から Props のドキュメントを生成してくれている。*

この Props のドキュメントは内部的には [react-docgen](https://github.com/reactjs/react-docgen) あるいは [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript) というパッケージを用いることで実現されています。

ということは、これらのパッケージを使うことで Props の詳細情報が取得できるはずです。

できました。

![](https://storage.googleapis.com/zenn-user-upload/3b23728c55a0-20250410.png)

*Cursor Agent に Button の Props を聞くと答えてくれる*

![](https://storage.googleapis.com/zenn-user-upload/3a873333a32b-20250410.png)

*Cursor Agent に Button の使い方を聞くと答えてくれる*

## 雑考察・雑感想

この記事で紹介した MCP サーバの実装はやっつけプロトタイプですが、これだけでも AI による開発支援の恩恵の向上はそれなりに感じることができました。他にも Storybook を Playwright で解釈させる、API 上重要な実装だけを何らかの手段で抜き出して読ませる、あるいはコンテキストが拡大したら全部読ませる… など、さまざまなアプローチや改善の方法が考えられそうです。

また、「デザインシステム（共通 UI コンポーネント）」というアセットはもちろんですが、ドキュメント・コードコメントや Storybook などもいままで以上に開発生産性を高めるツールとして有効になりそうです。

また、個人的にはコードや API スキーマを静的解析してアレコレすることが好きなのですが、AI 時代においても決定的な形で情報を圧縮する手段として有効活用できる道もあるのかな？と感じています。

自分は MCP をプロトコルの仕様以上のことはすごく浅い理解しかしていなかったのですが、実際に手を動かしてみたことで意義が腹落ちした感じがしたのもよかったです。

AI による開発支援の世界はまだまだ進化し続けている・なにが起きるかわからないですが、それでも手を動かし解像度を高めていくことのは大事だし楽しいのでやっていきます。

LayerX により固定**すべての経済活動を、デジタル化する。一緒に挑戦してくれる仲間を募集しています！**  
• [LayerX 採用情報](https://jobs.layerx.co.jp/) 
• [LayerX OpenDoor ーカジュアル面談ページー](https://jobs.layerx.co.jp/opendoor) 

- • [LayerX 採用情報](https://jobs.layerx.co.jp/)
- • [LayerX OpenDoor ーカジュアル面談ページー](https://jobs.layerx.co.jp/opendoor)