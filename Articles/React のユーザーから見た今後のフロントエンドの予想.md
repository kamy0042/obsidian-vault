---
Created: 2021-01-15T20:37:00
URL: https://gist.github.com/mizchi/106d3c1bb8b8e5b46b45ceeeab0c348b
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
この記事は議論のたたき台で、ポジショントークや、偏見にまみれています。

## 今のフロントエンドの分類

- 古典的なサーバーサイド WAF への +α の味付け
- 大規模なクライアントアプリケーション管理のための SPA
- SEO / SSR を考慮した Node ヘヴィーな環境

他、提唱されてるパターン

- [マイクロフロントエンド - マイクロサービスのフロントエンドへの応用](https://micro-frontends-japanese.org/)
- [JAMstack | JavaScript, APIs, and Markup](https://jamstack.org/)
- [PRPL パターン | Web | Google Developers](https://developers.google.com/web/fundamentals/performance/prpl-pattern/?hl=ja)

## 今の React & Vue の受容され方

仮想 DOM アルゴリズムや、SPA を作るためのものというより、単なるテンプレートエンジンとして受容されている節がある。Web 制作で jQuery は絶対に滅びないと言われていたが、その潮目も変わってきているように見える。

クソアプリの中身を覗いてみたら React で…、みたいな話も増えてきたので、最新のフレームワークを使えば品質が高いみたいな幻想も薄れてきて、頑張って正しく使いましょうというフェーズ。

## 型: Babel or TypeScript?

本格的なフロントエンドの場合、型ありき。なので Flow か TypeScript の採用は前提とする。

Flow は残念ながら Facebook ぐらいしか使わなくなってしまった。Babel から段階的に採用しやすい、というメリットも、 Babel の TypeScript サポートで同じぐらいの移行しやすさになった。そういえば ReactNative も Flow から TypeScript にするとのこと。

今では Babel で TypeScript コンパイルできるようになった。この方式は Babel で .ts をコンパイルするが、TypeScriptで型チェックを行う。ビルドスタックによって使いやすい方を使えば良い。

Flow と TypeScript の表現力はさして変わらない。 Flow から TypeScript に移行するコストはそう高くない。下回りを整えて、正規表現を何発か打てば終わる。

現代では Language Server Procotol があるので、どのエディタでも構わないのだが、現状 VS Code + TypeScript の体験は圧倒的で、特にこだわりがない場合は VS Code を選ぶのがいいと思う。

EcmaScript に型が入るかは、 tc39 の議論スピードを見るに、今後数年では難しい。議事録見ても入れたい派と入れたくない派がはっきりしてる。ただ、「入れるとしたらここの型としてのセマンティクスは…」みたいな話も常に行われているので、意識されてないわけではない。

- [michaelficarra/proposal-first-class-protocols: a proposal to bring protocol-based interfaces to ECMAScript users](https://github.com/michaelficarra/proposal-first-class-protocols)
- [Request: Optional Static Typing · Issue #45 · tc39/ecma262](https://github.com/tc39/ecma262/issues/45)
- [Status of Static Typing in ECMAScript | ECMAScript Daily](https://ecmascript-daily.github.io/pages/status-of-static-typing-in-ecmascript/)

## Webpack or Parcel or Native ESM ?

本当にただ一つのエントリポイントを持つ SPA を作るのがが自明な場合、 Parcel を使うことは可能で、デフォルト設定が優秀。

ただし、ちょっと凝ったことをしようとすると、すぐ破綻する。ある程度の自由度を担保したい場合、なんだかんだで webpack を使うことになるだろう。

Native ESM は IE を落とす判断をした上で、TypeScript も使わない場合。Native ESM を選ぶようなエッジな環境では TypeScript を使うだろうから、現状何かしらの縛りがない限り、 Native ESM を選べるプレーヤーは思いつかない。Google ですらまだ webpack などで bundle することを推奨している。

## React の Vue との比較

Vue の勢いはすごいが、見る限り本質的な設計方針に違いは出ないので、 最終的に Vue Template 書くか、JSX 書くかぐらいの違いしかない。それぞれ一長一短なので、最終的には React と同じぐらいの位置に落ち着くだろう。どちらかを使えるユーザーが、あえて乗り換える強い動機はない。

Vue のメリットは、JSX を使う必要がなく各種プリコンパイラがいらなくて導入しやすい、というところにあったが、Vue も色々やるためにプリコンパイルのステップが厚くなってきたので、今はどちらもそう変わらない。Vue は全体的に無茶苦茶イージー側に倒してる言語なので、React より末端での破綻を起こしやすい印象。この辺トレードオフなので、全部ひっくるめて一長一短なので、ゼロベースだったら今は五分五分。ユーザーベースもそれぐらいに収束しそう。

次の時代はどうせ WebComponents ベースの、コンポーネント志向と Flux の思想(または次のなにか)を継承した新しいものになるだろうし、趨勢が決するのはおそらく IE 死ぬのが見えた 2021 年頃なので、それまで今使ってるフレームワークを使っても問題ないだろう。単方向データフローは既定路線。

SSR やエコシステム同士の連携は next.js より nuxt.js のが優秀。next.js ユーザーも、一度は nuxt を見ておいたほうがいい。ただし、 vue & vuex は TypeScript 連携に難がある。

おそらくだが、Vue の競争相手は React ではなく、 Nuxt vs Rails という構図になるのではないか、という気がする。Nuxt は next.js の発展形だったが、今はどちらかと言うと規約ベースの設計がどんどん Rails に似てきている。

React は Vue よりも明らかに「硬い」API なので、より大きなものを作るための、 SPA or ReactNative では今後も強い選択肢であり続けることだろう。

React は Facebook が SSR にあまり興味が無いので、SSR 周辺のエコシステムに難があり、全てを自分で組み上げる体力が必要。ただし Suspense 周辺でその辺りもテコ入れされるかもしれない。

[[WIP][Fizz] New Server Rendering Infra by sebmarkbage · Pull Request #14144 · facebook/react](https://github.com/facebook/react/pull/14144)

次のフレームワークが出るとしたら何か、を考えるために、とりあえず今見ておくべきもの

- [sveltejs/svelte: The magical disappearing UI framework](https://github.com/sveltejs/svelte): コンパイルするとランタイムが消えるフレームワーク
- [Stencil](https://stenciljs.com/): 様々なフレームワーク WebComponents
- [ampproject/worker-dom: The same DOM API and Frameworks you know, but in a Web Worker.](https://github.com/ampproject/worker-dom): WebWorker で DOM 操作。preact のサンプルがある

off the main thread の文脈も考慮すると、サイズというより、モバイルで UI スレッドでのランタイム評価のオーバーヘッドが大きな指標となってきている。worker-dom で preact が選ばれているのもそう。

## 今 WebComponents を採用できるか？

今の時代に WebComponents に振るのは、まだ恩恵より YakShaving のコストが高い。

実用レベルで必要なパーツが揃ってるかと言うと、仕様もライブラリも全然足りてない。特に Element に関数参照を渡せないのは、仮想 DOM の視点だとかなりの退化で、この問題はいつか必ず解決される必要がある。なので、誰かからの呼び出し元にも、何かの呼び出し先にもなれない。本当にプリミティブなボタン要素の拡張ぐらいしか、WebComponents で作る候補にない。

また、 WebComponents Polyfill の品質が悪く、IE でろくに動かないという話が多い。Polyfill の品質が向上するか、IE を捨てる判断ができないと、採用は難しい。おそらくクロスブラウザ環境下での API が実装される足並みも揃わないだろう。結局、何らかのライブラリによる、差分吸収層が必要となるのではないか。

一番の問題は、Google BOT の WebComponents のクロール指針が明確になっていない。今のままだと React などと同じく WebComponents の SSR が必須となってしまうが、そもそも LightDOM と ShadowDOM のセマンティクスの問題があり、SSR で ShadowDOM を表現することができない。

なので、今採用してもまだ大きな変化があると予想されるので、時間の無駄になる可能性が高い。WebComponents をフレームワーク層として使うことはなく、React/Vue/Angular のフレームワークの構成要素として採用される可能性がある、程度だろう。

## WebAssembly

WebAssembly を使う場合、パフォーマンス目的だったり、開発対象がすごく複雑だったりすると思われるので、この際 IE は忘れていい。asm.js 吐き出しで IE をサポートしようとすると、現実的な開発工数にならない。

WebAssembly を使う場合、気になってるのはこの辺

- WasmBindgen: Rust
- Blazer: C#
- Kotlin/Native: Kotlin

ピンポイントに重い処理を wasm に逃したい、という場合に小回りがきくのは Rust 周辺のエコシステム。とくに WasmBindgen はよく出来ている。

Blazer や Kotlin/Native は、おそらくフルセットのフレームワークを提供することになるのではないか。C++ の人は腕力が高いので多分エコシステムがなくても無理やり使えるだろう…。

Go の Wasm 吐き出しは、Go のランタイム一式がバイナリに含まれてしまい、現状サイズ面で厳しい。

JS が嫌いだから Wasm で、みたいな考え方は、おそらくやめたほうがいい。DOM API や、 他の Browser API アクセスと GC インテグレーションのやり方が固まった上で、それが枯れるまで厳しい気がする。結局その上でも、FFI 経由で JS を酷使することになるだろう。Scala.js を使うには専用の JS 職人が必要みたいな話と同じ。

## PWA

今現在、古典的な WAF でサーバーサイドのレンダリングしている場合、下手なフロントエンド技術を採用するより、 PWA 技術でのキャッシュ構築/Worker Side Rendering/Preload などに全振りしたほうがコスパが高いだろう。場合によって AMP のような縛りを導入してもいいかもしれない。これは特に、 Fastly のようなキャッシュパージの速い CDN と連携した場合に真価を発揮する。

SEO を考慮しつつ、複雑な画面を持つ、全部入りの場合は、PWA と SPA 技術を兼用することになる。既に難しいのに、この上に更に難しいことをやろうとすると複雑度が爆発するので、費用対効果の良い workbox の導入ぐらいに止めておいたほうがいいのではないか。

モバイルアプリケーション化のための PWA は、 Android Play Store で配信できるようになってから考えればいいだろう。これは Androind アプリを作るコストをサボることを可能にし、開発リソースが足りないプレーヤーに有効。この場合 iOS でパフォーマンスが出る ReactNative を採用して、クロスブラウザの確認コストも浮かすことを検討できる。あくまで貧者の技術として、だが…

色々あるけど各社の本音は Push 通知のリテンション効果のためのアプリ化だろうから、これは PWA で実現可能だろうけど、ほどほどに。そういえば Windows Store で既に PWA アプリは配信可能らしいが、Windows Store の存在感がなさすぎて考慮に値しない。

## IE

滅ぶべし。

いや真面目な話、IE8 が死ぬ 2022 年ぐらいまで捨てられないだろうので、それまで今のフロントエンドのビルドパイプラインが太い時代は続く。悲しいけど。

あと IE が死ぬのは Windows による IE のサポート切れではなく、そもそものデスクトップブラウザの衰退ではないか、という気がしなくもない。モバイルにはそもそも IE がなく、Safari が…

## おわり

各論の列挙なので、まとまりがないけど、このへんで