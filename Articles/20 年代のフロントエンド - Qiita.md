---
Created: 2021-01-15T18:11:00
URL: https://qiita.com/mizchi/items/50937c7f702da566e989
Tags: [topic/技術/フロントエンド]
---
## これはなに

- 高円寺.dev #3 用の資料 [https://koenji.connpass.com/event/160886/](https://koenji.connpass.com/event/160886/)
- フロントエンド専門じゃない人向けの、フロントエンドの最先端〜やや未来の話です
- このレイヤーでは Node.js を使うべき/使うと強いという部分がありますが、他言語を否定しているわけではありません。むしろ他言語でこのアーキテクチャを模倣してほしいという話です。

# 10 年代のフロントエンドのポストモーテム

## 10 年代まとめ

- IE が死ななかったので各種ポリフィル、メタ言語からのトランスパイルが発達。しかしモダンとレガシーの乖離が深刻に。
- node と npm エコシステムの成立
- 仮想 DOM がフロントエンドライブラリの標準的な状態管理手法に
- モジュールシステム需要が ES Modules(ES2015)に結実。しかし webpack は死ねなかった。

## モダンとレガシーの乖離

- IE 需要+ブラウザ自身も後方互換性を維持し続けたために、先進的な技術を使う人と、素朴なサポート水準の技術を使う人のスキルセットが完全に乖離してしまった。IE を言い訳に、最新仕様を勉強しないことへのインセンティブが強く残った。
- 2010 年代前半のモバイルアプリ需要で、若者の供給が一度途絶えて、人の入れ替わりがない時期があった。最近になって一部の Web 回帰、または Firebase や ReactNative 需要で多少盛り返した。
- 作りきりの Web 制作の文脈と、アーキテクチャのある Web アプリケーションの文脈が完全に別物になってしまい、合流しなかった。

## IE (almost) Dies.

- 世界シェア 3% 国内シェア 11.7%
- Win7 の EOL (Win7 は Edge 非搭載)
- EOL の Win7, Win8.1 への MS Edge の配信: Chrome Based Edge が入ってるんだから IE を使えと言えるように

もはや toC では商用サポートされていないので、よほどの理由がない限り、IE を落とすことができるはず…とはいえ日本の 12%は気になるところだが…

実際には IE をサポートし続ける痛みが、現場のアーキテクチャの進化を強く阻害しているので、サポート切れを根拠になんとかして落としたい。

参考:

- [Web ブラウザシェアランキング TOP10(日本国内・世界) | ソフトウェアテスト・第三者検証ならウェブレッジ](https://webrage.jp/techblog/pc_browser_share/)
- [新 Edge ブラウザ登場に伴う IE サポート終了についてチームのコンセンサスを得るためのシンプルなテンプレ - Qiita](https://qiita.com/uupaa/items/ad1f0f64191dbec56889)

## Webpack Never Die.

- Dependency Hell: Pure な ESM では、`import a from "./a.js"` と書くと、現行の仕様では、一旦サーバーからスクリプトを取得し、パースして、初めて、 `./a.js` の更に下の階層の依存が判明する。
- npm 時代のモジュールの依存は深い。とても深い。とてもではないが、深さ n(>5) のラウンドトリップに耐えうるものではない。元々の node.js 環境においては単にローカル FS の read でしかないので問題にならなかった。
- 依存を先に宣言しておいてストリームに投機的に次のデータを突っ込んでおく、という用途で期待されていた HTTP Server Push の仕様が死んでしまった [https://blog.jxck.io/entries/2019-01-19/cache-digest-status.html](https://blog.jxck.io/entries/2019-01-19/cache-digest-status.html)
- ESM と HTTP の話とは別に、ECMA 非標準な TypeScript の人気が増しているので、結局プリプロセッサは必要なわけで、だったら結局 Webpack 通すわけでビルドの手間は一緒じゃん、といったコミュニティの温度感がある。

一応、 [https://github.com/WICG/import-maps](https://github.com/WICG/import-maps) や [https://blog.jxck.io/entries/2019-11-12/webbundle.html](https://blog.jxck.io/entries/2019-11-12/webbundle.html) でどうにかならないか、という試行錯誤はあるが…

# 「フロントエンド」の領域の変化

## 「フロントエンド」の領域の変化

フロントエンドは「UX のための差別化技術」から、「アプリケーション層のベストプラクティス」に。

## 「アプリケーション層のベストプラクティス」

- next.js/nuxt.js への開発リソースの集中 (最近は Google も支援)
- 他者に配られる静的アセットから、「アセットパイプラインと連携して、それらを効率よく配る node サーバー」に昇格
- TypeScript の漸進的な型付けで,(比較的)堅牢なアーキテクチャに

重要なのこととして、 **next.js/nuxt.js 型のフロントエンドサーバーが、次世代の Rails になりつつある**

## next/nuxt では、なぜクラサバが同じ言語環境(node/v8)である必要があるか

- (古くは)異なる言語で同じものを作っていた二重テンプレート問題
- 初期化が重い SPA の効率的な画面遷移には、 Server Side Rendering(SSR) の他に、サーバーを経由しない Client Side Routing(CSR) が必要
- => SPA じゃないとしても、アセット再取得が最小限になる CSR は、パフォーマンス上有効なことがわかった

[App Shell モデル  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/architecture/app-shell?hl=ja)

next.js の実体は webpack によるチャンク生成と node.js を緊密に連携させるように設計されたフレームワーク。

## フロントエンドのアーキテクチャ上の分解点はどこになるか

マイクロサービス上の、永続層を含まない、ユーザーと通信する **フロントエンドサーバー**

- CDN First な設計: DC の外側にある CDN Edge とのコミュニケーション(主にインバリデーションの発行管理)という新たな領域の出現
- 永続層を含まない: Node.js は永続層周りのサポートが貧弱なので、外部に丸投げする。PaaS, DBaaS, No Code Backend

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2Fe55590a70a4125cea3c94a65d32e136e.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=622cd23cfd93ec1382442ef951a374bf)

## しかし人間は愚かなので

次代のスタートアップの MVP/個人 Web 制作はこうなる

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2Faf835227f27a1724f5641f9cc6b179ec.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7f5533d2eaacb862af40930917c988e7)

- 静的アセット + PaaS の露出 (Firebase スタイル)
- ほぼ JS だけで完結
- API として露出した部分の Firebase/Serverless の持つパーミッションがセキュリティ関心の中心に

## Next.js の出力モードから考える

- ２つの出力モード
- 静的モード: SSR なしで完全な静的アセットとして出力。
- 動的モード: セッションの状態を含んだ First View で出力可能。
- 現代の Google Bot の挙動
- クローラーが静的コンテンツをインデックス。その後、レンダリングキューに入る。
- n 時間後、レンダリングキューの順番が来ると、 Chrome でレンダリングされてインデックスされる。

**速報性が高く競合が多いニュースサイトは SSR が必須**。逆に言うとそれ以外では重要度が徐々に下がりつつある。
年々この n 時間は縮小傾向。

[https://developers.google.com/search/docs/guides/javascript-seo-basics?hl=ja](https://developers.google.com/search/docs/guides/javascript-seo-basics?hl=ja)

## 余談: WASM で Next.js と同じアーキテクチャが可能か

状態管理の目線では、出力の冪等性のためにテンプレートが同じ言語のロジックで管理される必要があり(仮想 DOM、多重テンプレート問題等の需要)、Next.js / Nuxt.js は開発言語を node.js に制限してしまう。

ブラウザとサーバーで同じロジックで動けばいい、という点では WebAssembly で仮想 DOM アルゴリズム実装込みで出力できればよい。しかし、WASM の仕様に GC が含まれないのと、出力サイズの問題で、現実的に WASM Backend として選択可能な言語は、現実的には C/C++/Rust のみ。例えば Go を WASM 出力すると、GC のために Interpreter 一式がビルドされ、Hello World 程度でも 1.4MB になってしまう。

C/C++/Rust は(好みの問題ではあると思うが)、アプリケーション層のロジックを記述する言語としてデザインされておらず、Web 開発の現場で一般的になるのは想像し辛い。

WASM の GC が標準化され、かつそれが GC 付きの言語が現実的なサイズでビルドできるような仕様であり、かつ Rust の wasm-bindgen のような優秀な DOM API ブリッジが各言語で実装されれば、 Java, C#、Ruby,Python,Swift といった言語がウェブフロントエンドの選択肢になるかもしれない。ただ、そのエコシステムが整うのが 2020 年代前半に来るとは考えづらい。

- [https://github.com/rustwasm/wasm-bindgen](https://github.com/rustwasm/wasm-bindgen)
- [https://github.com/WebAssembly/gc/blob/master/proposals/gc/Overview.md](https://github.com/WebAssembly/gc/blob/master/proposals/gc/Overview.md)

まとめると、 WASM が来るから JS 勉強しなくていい、みたいな時代は、まだ来る気配はないです。一旦諦めてください。

## 実験: Blazor

すでに WASM 経由の Isomorphism の実験例がある。Blazor は WebAssembry, iOS, Android の出力を持つ、MS 製の実験的なテンプレートエンジン (埋め込める言語は C#/F#)。

コード例

`<div>
    <h1>@Title</h1>

    @ChildContent

    <button @onclick="OnYes">Yes!</button>
</div>

@code {
    [Parameter]
    public string Title { get; set; }

    [Parameter]
    public RenderFragment ChildContent { get; set; }

    private void OnYes()
    {
        Console.WriteLine("Write to the console in C#! 'Yes' button was selected.");
    }
}`

これが実用的になれば、クラサバを C#(.NET) で完結したオールインワンの開発環境が実現されるかもしれない。

現在は Mono を使っているからサイズが大きいが、最終的な Minimal な .NET ランタイムになるから軽量(60kb)、 とのこと(本当か？)

## AMP はどうなるか

[https://amp.dev](https://amp.dev/)

初期の Webcomponents v0/Polymer Project が目指した、宣言的な HTML だけですべてが成立する世界。JS が使えないという制約と引き換えに、Google 検索や Google CDN による各種優遇を受ける。

サーバーサイドを node.js にしない場合、むしろこっちを目指したほうが全体的なコスパは上がると思う。フロントエンドスタックを一切導入しない Rails や PHP はこちらを目指した方がいいかもしれない。

動的コンテンツを含む場合、Google CDN キャッシュ時にある種の SSR 的なテクニックは必要。 (amp-bind)

- * とても政治的な要素を含む技術である点に注意。** ある種のベストプラクティスの強制であり、Google が一部の技術を優遇することの批判が絶えない。

[http://ampletter.org/?lang=ja](http://ampletter.org/?lang=ja)

# 言語環境

## TypeScript について

- 一強。現行のフロントエンド開発において、選ばない理由はない。
- しかし現場のプラクティスは追いついてない。とくに既存コードの型付けには、JSの言語仕様の深い理解が要求される
- 「自由に書いても型が付く」という発想は捨てたほうがよく、今後はおそらく、型が付きやすいライブラリの人気が出るだろう
- eslint-typescript の実装過程において、Babel 側から TypeScript AST が扱えるようになったので、今後は babel, typescript のエコシステムは統合されるだろう。

## TypeScript が標準になるか

- おそらくない。そのために議論しないといけない既存のセマンティクスが多すぎる。
- tc39 の議論をみていても、型があるとしたらこういう解釈になる、という議論は常にあるので、tc39 も考えてないわけではない。ただ型を入れたい派と入れたくない派は両方いる気配がある。
- python3 のように、型アノテーション文法だけ予約する、みたいな
- しかしネイティブにTSがうごくようになっても、前述の ESM の RTT があり、結局 webpack を通すことが要求される

# パフォーマンス

## モバイルパフォーマンスの時代

- MFI: FMP や FCP などの各種スコアが検索スコアに関与するようになる
- フロントエンドパフォーマンスが、贅沢品から、コンテンツを見てもらうための必需品の時代に
- 5G や http/3 でまた設計が何かしら変わるかも

## 軽量ライブラリ

JS は Developper Experience の名の下に富豪的に使われすぎている。144kb以下にしろ、という主張

[https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/](https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/)

で、よく挙げられるライブラリに以下のものがある。

- preact: 軽量 React
- lit-html
- (ライブラリとしての) AMP

よく見落とされていることだが、 AMP 制約を満たさなくても AMP をライブラリとして使うことは可能。

## Off the main thread

UI Thread から描画に関するものを排除し、ペイロードや初期化時間を効率化しよう、という戦略。IE に搭載されながらも日の目を見なかった WebWorker を使っていこうという Google Dev Rel 周りが推奨してる戦略。

- comlink: 使いづらい WebWorker をラップしてくれるフレームワーク
- comlink-loader: comlink 経由で webpack で指定した読み込み先を worker 化してくれる。便利
- worker-dom: WebWorker 上に仮想の DOM ツリーを構築して、そこに行われた変更をメインスレッドの対応する DOM に sync するライブラリ。 AMP Script の実体。

vscode がサクサク動くのも WebWorker で各種処理(コードハイライトや補完エンジン)が並列化されてるから。

## 余談: Double Keyed HTTP Cache

キャッシュのキーに読み込んだドメインが追加されるブラウザ仕様の変更。現在、キャッシュ状態に対してサイドチャネル攻撃で検索履歴などを抜き出せたり、特定の DNS の解決速度で fingerprint に使われたりする。

例えば、 Cloudflare  CDN 経由で jquery を読み込んでおけば、他のページで読み込まれてる可能性が高いから読み込みが速い、みたいな可能性が、今後ゼロになる。なんでもかんでも script タグで CDN から JS を引っ張る人に叩きつけましょう。

[Double-keyed HTTP cache に関するメモ - ASnoKaze blog](https://asnokaze.hatenablog.com/entry/2019/08/28/020026)

## 最後に

ウェブ開発の歴史上、パフォーマンスやセキュリティをウリ文句にしたフレームワークが覇権をとったことはないので、結局 Firebase や AWS AppSync が問題を抱えながら普及するのだと思う。

なんらかの品質やプロダクティビティに貢献する制約を隠れ蓑に、パフォーマンスやセキュリティ意識を向上させる開発者環境に取り組んでいく必要がある。