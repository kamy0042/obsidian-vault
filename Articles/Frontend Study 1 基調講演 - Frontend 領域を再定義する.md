---

Tags: [topic/技術/NodeJS]
---
[Front-End Study \#1「Cloud Native時代のフロントエンド」 - connpass](https://forkwell.connpass.com/event/190313/) の発表内容のテキスト版です。

## 発表に載せられなかった参考資料集

- @mizchi / Plaid, inc
- Frontend Engineer
- React / Node / SPA
- Web の最新技術で新しい体験を実証 - 提供するのが好き

## 今日話す内容

- この10年の振り返りと最近のトレンド
- next.js に見るベストプラクティス
- フロントエンドの領域の変化
- Cloudflare Workers が切り開く新領域

## はじめに

- 自分は Frontend というより Node.js Engineer に近い
- 最先端〜近未来の話をするので、肌勘が合わない人はいるかも
- 本スライドは Rails に喧嘩を売りますが、Rails が歴史的に果たした役割を否定するものではありません

## ふりかえり

- IE First の時代の終わり
- Frontend において Node.js が支配的なポジションに
- 「動くテンプレートエンジン」が当たり前に

## IE First 時代のおわり

- 「IEで動かないから仕様をIEに合わせる」=>「モダンブラウザ水準を満たさないIEは段階的に切り捨てる」
- サポートしないわけではないが、足を引っ張る場合は切る
- 本音: IE対応をやりすぎると、モダンブラウザの経験値を稼げない…

## Node.jsによるフロントエンド

- Rails Sprockets などの言語/フレームワークごとのプリプロセッサが廃れた
- Node.js によって Frontend Toolchain が提供されるようになった

## 動くテンプレートが当たり前に

- 仮想DOM技術による宣言的UIが普及
- 「テンプレートエンジン」の役割が、昔ながらの文字列の生成ではなく、木構造とその後のロジックも管理することに変化
- 現状はJS以外の選択肢がない

## 最近のフロントエンドの流行

- パフォーマンス指向
- 「設計より規約」
- Modern JavaScript ≒ TypeScript

## ‘JavaScript is CO2’ by Alex Russell (Google) 2018

> JavaScriptはウェブのCO2です。私たちはそのうちのいくつかを必要としていますが、多すぎると生態系全体が危険にさらされることになります。最も多く排出している人(訳者注: 開発者)は、生態系が崩壊するまで、その結果に苦しむことから最も遠い存在です。JS の排出量をコントロールしない限り、ウェブはコンピューティングが向かう市場やフォームファクターで成功することはないでしょう。

[https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/](https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/)

## 近年のパフォーマンス指向

- Lighthouse によるスコア化
- WebVitals による SEO への影響
- フロントエンド技術は SPA の為の技術ではなく、「Webのベストプラクティスを実現するもの」へ

## Opinionated な「設計より規約」

- Deno
- Rome
- Blitz

## Deno

- Node.js オリジナル作者の Ryan Dahl による新しい Rust + V8 の JS 処理系
- npm エコシステムを否定し ESM の URL パスから依存解決
- 実行時に明示的に権限を付与するサンドボックスモデル
- TypeScript First

## Rome

- Babel オリジナル作者 sebmck によるNode.js 大統一ツールチェイン
- Babel, ESlint, Webpack, Prettier, Jest を置き換える
- 外部ライブラリ非依存で自前の Parser / AST で統一
- TypeScript First

## Blitz.js

- Next.js + Prisma ORM = Fullstack
- ベストプラクティスの詰め合わせ + Code Generator
- react-query / react-final-form / zod / etc…
- isomorphic なリモート関数呼び出し(meteor 風)
- TypeScript First

## なぜ今まで Node の Fullstack Framework が流行らなかったか？

- よい ORM がなかった
- Node.js 初期は Monolithic な Rails への反動があった
- Express は小さいミドルウェアの集合体
- Node.js のエコシステムが安定せず、取捨選択できなかった

## Prisma2

- 「Node.js に良いORM がない」という状況を覆せそうな ORM / Query Builder
- 宣言的 Migration: 専用のIDLの変更から自動でマイグレーションを生成
- TypeScript Friendly: TSの柔軟な表現力でどんなクエリにも型が付く
- SQL First: 自然な SQL と対応する API

## Prisma2 の影響

- Prisma を使うフレームワークの開発ラッシュ
- Blitz.js: Next.js + Prisma2 + Code Generator
- Redwood.js: React + Redwood Router + Prisma2
- Frourio: MS製 TS First な API サーバー

## Modern JavaScript = TypeScript

- 良いコード = 型があるコード
- 良い設計 = 型が付くAPI
- 良いライブラリ = 型定義(.d.ts)が提供されるライブラリ

## まとめ

- Frontend Toolchain は Node.js に集約された
- Node.js周辺は枯れつつあるが、実績がある開発者の Opinionated なオーバーホールも同時進行中
- 新規に開発されるものは、TypeScript First

# Next.jsから学ぶベストプラクティス

## Next.js とは何か

- socket.io の作者 Guillermo Rauch 率いる Vercel が開発
- Vercel: SSG + Serverless に最適化された PaaS
- (元々は) React の SSR Server + Routing をセットで提供するフレームワーク
- 初回レスポンスは SSR で返却し、以降の遷移を CSR で引き継ぐ(よくあるSPAの構造)

## Next.js Multi Paradigm Framework

- 複数の実行・出力モード
- SSR
- Server
- Serverless
- SSG
- SSG Export
- Incremental Static Regeneration

## Next.js: Incremental Static Regeneration

- SSG mode を動的に実行する形態
- cache を返しつつ、expire したものを裏で入れ替える
- Backend は更新頻度が低いCMS などを想定

## Next.js が実現したこと

- (Next.js 登場以前の) 非常に複雑な SSR/CSR を隠蔽
- Node.js のフロントエンドツールチェインと、SPA/SSR のベストプラクティスを、一つのフレームワークに
- Vue Nuxt, Svelte Sapper(SvelteKit) というフォロワー

## 議論: そもそも SSR は必要？

- ほとんどのケースで必要ない
- GoogleBot の CSR コンテンツに対するインデックスが数時間遅れる問題
- Nodeサーバーを持たないメリットとのトレードオフ
- Next.js は SSR しないにしても有用

## Next.js から学ぶベストプラクティス: まとめ

- 複雑な SPA/SSR を隠蔽し誰でも使えるように
- Next.js+Vercel は SSG/Serverless でマネージレスな方向に進化

# フロントエンドの領域の変化

- Legacy Monolithic Framework (Rails, Django, etc…)
- API Server + Single Page Application
- シングルファイルな 2010s Monolithic SPA
- ルーティングごとに chunk 分割された Modern SPA
- Backend API + SSR
- Blitz Fullstack Style

## Blitz Fullstack Style

- ORM + Next/Nuxt は、 Monolithic Rails へ先祖返りする
- もはや Frontend Engineer ではなく、本来の Application Engineer
- 範囲が広すぎるので、おそらく再び分業が発生しそう
- まだ流行ってない。これから

## 議論: 今の Frontend Engineer をなんと呼べばいいか問題

- (New) Application Engineer?: Backend 中心のNode.js エンジニア
- Frontend Ops Engineer?: ビルドツールチェインを管理
- Design Engineer?: Markup + JavaScript
- CDN Edge Engineer?: CDN 周辺を管理

## 想定反論: 「Node.js エンジニアのポジショントークでは？」

- 認めるが、現実的にフロントエンドはJS以外厳しい状況
- 自分はJS(ES5) が嫌で AltJS マニアだったが、 ES201x + TypeScript で満足。V8 は速度的にも十分。
- WebAssembly に期待
- Rust: yew, dodrio, percy
- C#: Blazor WebAssembly

## 他の言語のための、 Node.js Frontend の倒し方

- 宣言的UI+Next.js を WebAssembly で実装する
- 現状は Rust + wasm_bindgen が現実的だが、Rust がアプリケーション層を書くのに向いてるかというと…
- GC付き言語は、 WASM GC が仕様化されるまで、出力サイズが厳しい
- エコシステム成立には、Wasm Binary の 多言語間 Linker 仕様が必要かも

## 「他の言語によるJSツールの再実装は新しいトレンドか？」 by Dr.Axel

- esbuild: JS/TS Compiler (Go)
- swc: JS/TS Compiler (Rust)
- volta: Rust nvm alternative (Rust)
- fnm: npm alternative (Rust)

「言語によって向き不向きはあるので長所を活用すればいいけど、JSで書くことでドッグフーディングにもなるし、コミッターも集めやすいよ」 by Dr.Axel

## まとめ

- フロントエンドのベストプラクティスは SSR の是非に関わらず Server Application 層を侵食
- Node.js は Prisma ORM で Fullstack Framework (主にRails) に再挑戦
- 他の言語が追従するには時間が掛かりそう
- TypeScript + 部分的に Rust が、しばらくベストな選択肢

# Cloudflare Workers が切り開く新領域

## Cloudflare Workers

- CDN Edge で動く(!!!) Node.js
- 結果整合の Workers KV、強整合の Durable Objects
- CDN Edge による高い応答性と、 1 req あたり CPU Time 50ms, Memory 128MB という強い制約

## 他の CDN Edge Worker 実装

- AWS Lambda@Edge: Lambda の Edge 版
- Fastly Compute@Edge: WebAssembly を Edge にデプロイ
- Akamai: Edge Workers

## Cloudflare Workers が他社サービスより優れてる点

- 完成度の高いCLIツール(wrangler)
- 高速デプロイ
- 高いパフォーマンス / 応答性
- Edge 特性に合わせた Cache API

## なぜ Cloudflare Workers が Node.js なのか

- コンテナではなく V8 Isolates (プロセス) を CDN Edge 上で並列化
- リクエストごとにプロセス割当
- 最適化には WebAssembly を使う

## CDN Edge Workers のできること

- 自由度の高いキャッシュコントロール
- 「今と同じNode.jsアプリが動く」わけではない
- CPU制約を満たすアーキテクチャを再考する必要
- パフォーマンス仕様を満たすために WebAssembly がここで必要

# 「フロントエンド領域を再定義する」 まとめ

- 現状は TypeScript + Next.js(Nuxt.js) がWebのベストプラクティス
- おそらく 2020年代は Fullstack Node.js or Jamstack+CMS が、「スタートアップ界のJava」 こと Rails を置き換えるだろう
- CDN Edge Worker 活用や、Next.js ISR で「静的サイト」が動き出す
- WebAssembly はまだまだ枯れてない

# 課題

- 学習資料の不足
- 動きが速い界隈のため、資料にまとまる時間がない
- Node.js 界における「Rails Guide」がない