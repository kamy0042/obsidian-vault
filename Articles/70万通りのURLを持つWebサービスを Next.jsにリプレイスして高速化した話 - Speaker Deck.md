---
URL: https://speakerdeck.com/aiji42/70mo-tong-rifalseurlwochi-tuwebsabisuwo-next-dot-jsniripureisusitegao-su-hua-sitahua
Created: 2021-10-28T22:13:00
Updated: 2021-11-06T22:39:00
Tags: [topic/技術/React/Nextjs]
---
![[Attachments/無題のフォルダ/preview_slide_0 47.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 48.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 49.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 50.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 51.jpg]]

## Transcript

1.  aiji42_dev 8年のキャリアの中で、フロントエンジニアよりも バックエンドエンジニアとしてのキャリアのほうが長い (3:7くらい) でも最近はフロントエンドがメイン
    ### [1 © 2021 Ateam Inc. 1 Uejima Aiji リードエンジニア@株式会社エイチームライフスタイル Twitter:](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_1.jpg)
2.  1K Pages 700K Pages 30K Pages エントリー エリア(市区町村・駅)x霊園特徴(樹木葬, 納骨堂...etc.)
    ### [7 © 2021 Ateam Inc. 7 トップ 記事 霊園リスト&検索 霊園詳細](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_7.jpg)
3.  CLS (Cumulative Layout Shift)
    ### [10 © 2021 Ateam Inc. 10 LCP (Largest Contentful Paint)](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_10.jpg)
4. 
    ### [11 © 2021 Ateam Inc. 11 2020年 CoreWebVitalsをSEO評価に導入するとのアナウンスがあった https://developers.google.com/search/blog/2020/11/timing-for-page-experience](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_11.jpg)
5.  true(or "blocking") を指定すると、 ビルドターゲットにないパスでリクエストを受けた際にビルドを行う。(遅延ビルド)
    ### [45 © 2021 Ateam Inc. 45 getStaticPaths: SG/ISRのデプロイ時のビルドターゲット(パス)を決定する関数 返り値に fallback:](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_45.jpg)
6.  • BFFと通信してコンテンツを生成する場合、最大でも4桁程度のページ数が現実的 フルデプロイビルドパターン [slag].tsx PV 多 PV 少
    ### [47 © 2021 Ateam Inc. 47 フルデプロイビルドパターン 全ページをデプロイ時にビルド • 全ページ一定のアクセス量があるページ群に有効](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_47.jpg)
7.  <> 初アクセスはコンテンツを生成する分、多少TTFBが遅くなる • URLパターンがかけ合わせ等で指数関数的に増加するページ群に有効 フルリクエストビルドパターン product/[id]/sub.tsx PV 多 PV 少
    ### [48 © 2021 Ateam Inc. 48 フルリクエストビルドパターン デプロイ時のビルドを全スキップし、リクエスト時にビルド • デプロイは高速](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_48.jpg)
8.  (例: 主要都市と地方) • デプロイ時間と相談しながらビルド対象数を選択する デプロイビルド リクエストビルド search/[prefecture]/[city]/[condition].tsx PV 多 PV 少
    ### [49 © 2021 Ateam Inc. 49 ハイブリッドビルドパターン 一部のページをデプロイ時、それ以外をリクエスト時にビルド • アクセス数に偏りがあるページ群で強い効果を発揮](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_49.jpg)
9.  ハイブリッドビルド(単一条件) + フルリクエストビルド(掛合わせ条件) ハイブリッドビルド(メインページ) + フルリクエストビルド(サブページ)
    ### [52 © 2021 Ateam Inc. 52 記事 霊園リスト&検索 霊園詳細 フルデプロイビルド](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_52.jpg)
10.  ハイブリッドビルド(単一条件) + フルリクエストビルド(掛合わせ条件) ハイブリッドビルド(メインページ) + フルリクエストビルド(サブページ) 45分
    ### [54 © 2021 Ateam Inc. 54 記事 霊園リスト&検索 霊園詳細 フルデプロイビルド](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_54.jpg)
11. 
    ### [65 © 2021 Ateam Inc. 65 product.vercel.lifedot.jp search.vercel.lifedot.jp article.vercel.lifedot.jp 目的別でサービスを縦割り](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_65.jpg)
12.  /pref-*/cond-*/*/ /ohaka/[a-z]+/ product.vercel.lifedot.jp article.vercel.lifedot.jp search.vercel.lifedot.jp CDN (CloudFront) + エッジコンピューティング (LambdaEdge) で統合
    ### [66 © 2021 Ateam Inc. 66 www.lifedot.jp /db/*/ /pref-*/city-*/*/ /pref-*/st-*/*/](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_66.jpg)
13.  などが標準配備される テストを書く文化を浸透させやすい https://nx.dev
    ### [79 © 2021 Ateam Inc. 79 Storybook, Cypress, Jest, ESLint](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_79.jpg)
14.  依存パッケージのアップデートなどバージョン管理が楽 ※よく比較にあがる lerna などはルートと各appごとに発生する (ただし志向や用途が違うので単純比較していいものではない)
    ### [80 © 2021 Ateam Inc. 80 package.json と node_modules がリポジトリに1つなので](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_80.jpg)
15.  クリックでビルド&サーブしたりテスト実行できる 複雑なコマンド学習をメンバーに強要しなくて良い
    ### [81 © 2021 Ateam Inc. 81 vs code や IntelliJ用の公式プラグインがあり](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_81.jpg)
16.  import { Header } "@lifedot/components" import { useStockList } "@lifedot/hooks" libs apps article search product components relay(graphql) hooks, router, layouts, ...etc. @lifedot/components
    ### [82 © 2021 Ateam Inc. 82 appsとlibsが基本構造 共通モジュールはlibsに配備 自動的にプロジェクト名でエイリアスされる 無意識的にnpmモジュールライクな参照が可能](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_82.jpg)
17.  product.vercel.lifedot.jp search.vercel.lifedot.jp article.vercel.lifedot.jp Vercel の "Ignored Build Step" と組み合わせることで 変更が生じたappsのみデプロイできる ❌ ❌ update
    ### [83 © 2021 Ateam Inc. 83 apps article search product](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_83.jpg)
18.  • フルリクエストビルド • ハイブリッドビルド 2. サービスの縦割りと CDN+エッジコンピューティングによる統合 3. Nxによるリポジトリのモノレポ化
    ### [87 © 2021 Ateam Inc. 87 1. 3パターンのデプロイ方法と遅延ビルドの活用 • フルデプロイビルド](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_87.jpg)
19.  revalidate 3. GraphQLによるパフォーマンス改善の話
    ### [89 © 2021 Ateam Inc. 89 1. バンドルサイズの削減格闘記 2. 効率の良いキャッシュを目指した変動](https://files.speakerdeck.com/presentations/6f64d6fa47df4d0884319229087ca87c/slide_89.jpg)