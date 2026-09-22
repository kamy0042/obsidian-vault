---
Created: 2022-10-06T20:26:00
URL: https://www.fastly.com/jp/blog/run-your-next-js-app-on-fastly
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
Fastly の新しい next-compute-js ライブラリを使用することで、Compute@Edge プラットフォーム上で Next.js アプリケーションをホストできるようになりました。これにより、Next.js 開発者のエクスペリエンスが向上し、圧倒的なスピードを誇る Fastly のグローバルエッジネットワークのメリットが得られます。オリジンサーバーも必要ありません。

[<u>Next.js</u>](https://nextjs.org/) は広く普及している JavaScript ベースのサーバーフレームワークで、開発者に優れたエクスペリエンスを提供します。具体的には、フロントエンドのコードを React で作成できるほか、ごくわずかな設定で本番環境に必要な優れた機能 (ハイブリッドの静的レンダリングとサーバーレンダリング、スマートバンドル、ルートプリフェッチなど) を直感的にセットアップできる便利さを備えています。

## Next.js を使用する理由

Next.js などのフレームワークは、最先端のWebサイトを構築するのに非常に便利です。早速ですが、React で「Hello, World!」のコンポーネントを作成し、Webサイトのルートから配信してみましょう。まずは Node.js が必要です。ディレクトリを作成し、npm を使用していくつかの依存関係をインストールします。

コンテンツを保持するためのディレクトリを2つ作成します。

ここで、このコンポーネントを使用して `pages/index.js` にファイルを作成します。

```plain text
export default function Index() {return (<div>Hello, World!</div>
```

ファイルを作成したら、次は開発サーバーを実行します。

```plain text
npx next dev
```

そして、Web ブラウザが [<u>http://localhost:3000/</u>](http://localhost:3000/) にアクセスするようにします。

![[01-hello-world.png]]

素晴らしいでしょう？大したことないように見えるかもしれませんが、これは本当によくできています。React を使用して完全な開発環境をセットアップできました。ただ単に `pages/index.js` にファイルを作成するだけで、Next.js サーバーによって React コンポーネントがレンダリングされ、その出力がブラウザに表示されたのです。

![[02-index.png]]

これで、React の機能をフルに活用できるようになりました。カスタムコンポーネントを作成することも、以前に作成したコンポーネントを使用することも、サードパーティのコンポーネントを読み込むこともできます。さらに、この `pages/index.js` ファイルを編集すると、変更内容がホットリロードされるため、開発中にブラウザ内で即時にフィードバックを得ることができます。

Next.js では、規則に従ってパスをルーティングできます。つまり、ファイルシステム内にファイルを配置することで、対応する場所にあるファイルが Next.js によって配信されます。このため、同様のファイルを `pages/about.js` に追加すると、[<u>http://localhost:3000/about</u>](http://localhost:3000/about) で利用可能になります。パスに動的セグメントが必要な場合も、簡単に追加できます。`pages/users/[id].js` (ファイル名に角括弧を含みます) を作成すると、そのファイル内のコンポーネントが、このコンポーネントに渡された props を介して ID を受け取ります。画像、フォント、または robots.txt ファイルなどの静的ファイルを配信したい場合は、それらのファイルを `public` という名前のディレクトリ内に配置するだけでそのまま配信されます。

Next.js には、多くの機能が用意されています。[<u>CSS のビルトインサポート</u>](https://nextjs.org/docs/basic-features/built-in-css-support)、[<u>レイアウト</u>](https://nextjs.org/docs/basic-features/layouts)、[<u>サーバーサイドレンダリング</u>](https://nextjs.org/docs/basic-features/pages#server-side-rendering)、[<u>MDX のサポート</u>](https://nextjs.org/docs/advanced-features/using-mdx)などはほんの一例です。こうした機能の多くは、ほとんど設定が不要です。Next.js では、JavaScript ファイルを `pages/api/` に配置することで、[<u>API Routes</u>](https://nextjs.org/docs/api-routes/introduction) を使って、JavaScript で書かれたお客様の API にルーティングすることも可能です。

本番環境に移行する準備が整ったら、一連の中間ファイルを使ってサイトをビルドします。

```plain text
npx next build
```

これにより、サイトの各ページを実行するために必要なファイルがすべてコンパイルされてビルドされ、`.next` という名前のディレクトリに配置されます。この場合、コード分割などの適切な最適化が適用されるため、特定のページを読み込む際に、最低限必要な JavaScript のみがブラウザに送信されます。そして、Next.js のサーバーサイドレンダリングによって、利用可能なすべての React コンポーネントのプリレンダリングが行われます。この実装を試みた経験がある方なら、この機能によってどれほど多くの時間を節約できるかご存知だと思います。ここでは *.next* で利用できるすべての機能について詳しく説明することはしませんが、.next は非凡な能力を備えています。undefined

![[06-build.png]]

サイトの成果物を作成できたら、以下のようにサイトの配信を開始できます。

```plain text
npx next start
```

おめでとうございます。最適化されたサイトがローカルの Node.js サーバーで稼働するようになりました。

![[07-next_start.png]]

これは素晴らしいのですが、ご覧のとおり、**Next.js は Node.js サーバー**上で動作するよう設計されています。動的ランタイム機能を使用しなくても構わない場合は、静的出力ファイルのセットを (

を使用して) エクスポートすることもできます。バンドルされたファイルとしてこれらのファイルをアップロードすることで、従来の Web サーバーから配信できます。

しかし、お客様が Fastly を使用している場合はどうでしょう。Fastly は従来の Web サーバーとは異なります。Fastly を介して静的サイトを配信することはもちろんできますが (これに関する耳寄りなニュースを近日中にお届けします！)、Fastly は JavaScript からコンパイルできる Wasm バイナリを実行できます。ということは、Fastly は Next.js のビルド出力を配信できるだけでなく、Compute@Edge を使用してエッジでサーバー側のコンポーネントも実行できるのではないかと思う方もいらっしゃるでしょう。もちろん可能です！

## @fastly/next-compute-js のご紹介

ここで、拡大し続ける Fastly の開発ツールライブラリに新たに追加された、最新のツールをご紹介します。[<u>next-compute-js</u>](https://github.com/fastly/next-compute-js) は、Compute@Edge プラットフォーム向けの Next.js ランタイムとプロジェクトの基盤を組み合わせて提供します。これは、next build コマンドで生成されるのとまったく同じビルド成果物上で動作し、Next.js ランタイムのあらゆる機能を利用できるようにすることを目指して作成されています (現時点で完全な Node.js ランタイムを必要とする [<u>Vercel Edge ランタイム</u>](https://vercel.com/blog/introducing-the-edge-runtime)に依存する機能は除きます)。

使い方は非常にシンプルです。ここでは引き続き、上記の例を使います。next build コマンドを実行したら、`.next` ディレクトリが作成されるはずです。では、以下のように next-compute-js を実行してみましょう。

```plain text
npx @fastly/next-compute-js
```

出力は Compute@Edge アプリケーションが `compute-js` の新しいディレクトリで初期化されていることを示します。依存関係がインストールされ、しばらくすると、コマンドプロンプトに戻ります。

![[08-npx_next-compute-js.png]]

これを [<u>Fastly の開発サーバー</u>](https://developer.fastly.com/learning/compute/testing/#running-a-local-testing-server)で実行してみましょう。ここでは、[<u>Fastly CLI</u>](https://developer.fastly.com/reference/cli/) がインストールされていると想定し、単純に fastly compute serve コマンドを実行します。

これだけで、Next.js アプリケーションが Compute@Edge アプリケーションとして動作しています (ただし、お客様のマシン上での話ですが)。では、本番環境に移行したい場合はどうすれば良いでしょうか。fastly compute publish を使うのではないかとお考えでしたら、正解です。

![[10-publish.png]]

実際に試してみましょう。以下の2行を Next.js プロジェクトの `package.json` ファイルの scripts セクションに追加します。これにより、Next.js プロジェクトをビルドして、テストまたはデプロイするコマンドを、いつでもすぐに利用できるようになります。

```plain text
"scripts": {"fastly-serve": "next build && cd compute-js && fastly compute serve","fastly-publish": "next build && cd compute-js && fastly compute publish"
```

本当にこれだけで、このシンプルなツールを使用できます。

`next dev` を使用していつも通りに開発します。次に、`npm run fastly-serve` でテストし、準備が整ったら `npm run fastly-publish` でクラウドにデプロイできます。

## オリジンサーバーは使わないのですか？

そうです。そのとおりです。next-compute-js によって `.next` ディレクトリ全体が Wasm バイナリの一部としてパッケージ化され、お客様のすべてのコンテンツはビジターに最も地理的に近い位置にある Fastly のエッジノードから世界中に配信されるため、Next.js アプリケーション用のオリジンサーバーは不要になります。その結果、最高の開発者エクスペリエンスと本番環境パフォーマンスを実現できます。

この仕組みに関心のある方は、Next.js によって提供されている [<u>NextServer</u>](https://github.com/vercel/next.js/blob/7de3cf5f8962f28ff667aedeb2331c4b0a33ee65/packages/next/server/base-server.ts#L172) クラスのカスタム実装をご覧ください。これは、Wasm バイナリから適切なファイルを読み込むことで機能します。

## サポートされている Next.js の機能

Fastly では、ほぼすべての機能をサポートしています。

- 静的ファイルのルーティング
- 静的および動的にルーティングされる React ページ
- ルーター/命令型ルーティング/浅いルーティング/リンク
- データなしでの静的生成
- 静的 props /静的パスを使用したサーバーサイド生成
- サーバーサイド props を使用したサーバーサイドレンダリング
- クライアントサイドのフェッチと SWR
- ビルトイン CSS/CSS モジュール
- 圧縮 (gzip)
- ETag 生成
- ヘッダー/書き換え/リダイレクト/国際化ルーティング
- レイアウト
- フォントの最適化
- MDX
- カスタムアプリケーション/ドキュメント/エラーページ
- API ルート/ミドルウェア

以下の機能はまだサポート対象ではありませんが、今後サポートを開始する予定です。

- 画像最適化
- プレビューモード

プラットフォームの違いにより、現時点では、以下の機能をサポートする予定はありません (しかし、可能性がゼロなわけではありません！)。

- エッジ API ルート/ミドルウェア
- 段階的な静的サイト生成
- 動的インポート

## API ルートでさえも？

はい、[<u>API ルート</u>](https://nextjs.org/docs/api-routes/introduction)でさえもです。Next.js では、API を JavaScript で作成し、ページの場合と同様にパスディレクトリを使ってこれらの API を利用可能にできます。

実際に試してみましょう。`pages/api/hello/[name].js` (ファイル名に角括弧を含みます) にあるプロジェクトにファイルを追加します。

```plain text
export default function handler(req, res) {const { name } = req.query;  res.statusCode = 200;  res.end(JSON.stringify({message: `Hello, ${name}!`}));
```

ファイルを追加したら、プログラムを実行します。

```plain text
npm run fastly-serve
```

ここで [<u>http://127.0.0.1:7676/api/hello/World</u>](http://127.0.0.1:7676/api/hello/World) にアクセスしてみると、以下が表示されます。

```plain text
{"message": "Hello, World!"}
```

API をコールするための URL がファイルのパスに直接マッピングされること、および `req.query` オブジェクトを介して動的セグメント `[name]` の値にアクセスできることが分かります。とてもシンプルです。

API ルートハンドラーに渡されるリクエストオブジェクトとレスポンスオブジェクトについてご説明すると、Fastly では、[<u>@fastly/http-compute-js</u>](https://github.com/fastly/http-compute-js) を使用してお客様に Node.js スタイルの `req` オブジェクトと `res` オブジェクトを提供してから、[<u>API ルートリクエストヘルパー</u>](https://nextjs.org/docs/api-routes/request-helpers)を使用してこれらを拡張し、next dev と互換性のあるハンドラーを作成できるようにします。req オブジェクトのストリームインターフェイスは、Compute@Edgeの `Request` のボディストリームにつながれます。そして、ハンドラーが `res` オブジェクトへの出力の送信を終了すると、送信されたデータがヘッダーやステータスコードと一緒に `Response` オブジェクトにパッケージ化され、Compute@Edge による配信が可能になります。

この機能に加え、Fastly がサポートできる Next.js のその他すべての機能を利用できる Compute@Edge は、お客様の Next.js アプリケーションにとってメリットの大きい魅力的なプラットフォームです。

## Next.js アプリケーションの新しい拠点

Next.js と Compute@Edge がシームレスに統合され、オリジンサーバーなしで Next.js アプリケーションを Compute@Edge 上でホストできるようになりました。開発プロセスで Next.js の素晴らしい機能のメリットを活用し、世界最速を誇る Fastly のエッジ・コンピューティング・プラットフォーム Compute@Edge で本番環境にデプロイし、世界的なオンラインプレゼンスを実現できます。

次回のブログ記事では、この記事でも簡単に触れた、`@fastly/compute-js-static-publish` を取り上げます。これは、エッジから静的サイト全体を配信することを可能にするツールです。

Fastly は今後も、お客様がエッジでさらに多くのコードを実行し、より迅速に開発することを可能にするツールを構築し続けると同時に、より幅広いツールを利用できる環境作りに取り組みます。皆さまはこれらのツールをお使いでしょうか。また、どのような用途にお使いでしょうか。ぜひ [<u>Twitter</u>](https://developer.fastly.com/learning/compute/testing/#running-a-local-testing-server) でお聞かせください。