---
Created: 2022-07-23T19:07:00
URL: https://speakerdeck.com/sadnessojisan/ssg-is-a-compiler
Tags: [topic/技術/フロントエンド]
---
![[Attachments/無題のフォルダ/preview_slide_0 7.jpg]]

[div 上にコメントを流す技術](https://speakerdeck.com/sadnessojisan/div-shang-nikomentowoliu-suji-shu)

![[Attachments/無題のフォルダ/preview_slide_0 8.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 9.jpg]]

[不用品掲示サイトを MicroCMS + NextJS + vanilla-extract で作った話](https://speakerdeck.com/sadnessojisan/bu-yong-pin-jie-shi-saitowo-microcms-plus-nextjs-plus-vanilla-extract-dezuo-tutahua)

![[Attachments/無題のフォルダ/preview_slide_0 10.jpg]]

[Node.jsの非同期とI/Oについて調べてみた](https://speakerdeck.com/sadnessojisan/onituitediao-betemita)

![[Attachments/無題のフォルダ/preview_slide_0 11.jpg]]

[TypeScriptのDIはどうすればいいの？](https://speakerdeck.com/sadnessojisan/typescriptfalsedihadousurebaiifalse)

![[Attachments/無題のフォルダ/preview_slide_0 12.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 13.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 14.jpg]]

[【超入門】対談前に知っておこう！ 新時代の常識「Web3」のきほん](https://speakerdeck.com/finengine/chao-ru-men-dui-tan-qian-nizhi-tuteokou-xin-shi-dai-falsechang-shi-web3-falsekihon)

![[Attachments/無題のフォルダ/preview_slide_0 15.jpg]]

[アーキテクトに求められるマインドとは / mindset for an architect](https://speakerdeck.com/iselegant/mindset-for-an-architect)

![[Attachments/無題のフォルダ/preview_slide_0 16.jpg]]

[Amazon Connectで自動化はじめました](https://speakerdeck.com/yamamanx/amazon-connectdezi-dong-hua-hazimemasita)

![[Attachments/無題のフォルダ/preview_slide_0 17.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 18.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 19.jpg]]

[小売マーケティングにおけるクーポン配信最適化に向けた取り組み](https://speakerdeck.com/cyberagentdevelopers/xiao-mai-maketeinguniokerukuponpei-xin-zui-shi-hua-nixiang-ketaqu-rizu-mi)

![[Attachments/無題のフォルダ/preview_slide_0 20.jpg]]

[Explained: Compose Compiler and Runtime](https://speakerdeck.com/canyudev/explained-compose-compiler-and-runtime)

![[Attachments/無題のフォルダ/preview_slide_0 21.jpg]]

[PKSHA アイテックチームSWEの話](https://speakerdeck.com/hey_event/pksha-aitetukutimuswefalsehua)

![[Attachments/無題のフォルダ/preview_slide_0 22.jpg]]

[Agile that works and the tools we love](https://speakerdeck.com/rasmusluckow/agile-that-works-and-the-tools-we-love)

![[Attachments/無題のフォルダ/preview_slide_0 23.jpg]]

[A Modern Web Designer's Workflow](https://speakerdeck.com/chriscoyier/a-modern-web-designers-workflow)

![[Attachments/無題のフォルダ/preview_slide_0 24.jpg]]

[Statistics for Hackers](https://speakerdeck.com/jakevdp/statistics-for-hackers)

![[Attachments/無題のフォルダ/preview_slide_0 25.jpg]]

[WebSockets: Embracing the real-time Web](https://speakerdeck.com/robhawkes/websockets-embracing-the-real-time-web)

![[Attachments/無題のフォルダ/preview_slide_0 26.jpg]]

[GitHub's CSS Performance](https://speakerdeck.com/jonrohan/githubs-css-performance)

![[Attachments/無題のフォルダ/preview_slide_0 27.jpg]]

![[Attachments/無題のフォルダ/preview_slide_0 28.jpg]]

[How to Ace a Technical Interview](https://speakerdeck.com/jacobian/how-to-ace-a-technical-interview)

![[Attachments/無題のフォルダ/preview_slide_0 29.jpg]]

[The Invisible Side of Design](https://speakerdeck.com/smashingmag/the-invisible-side-of-design)

![[Attachments/無題のフォルダ/preview_slide_0 30.jpg]]

[A designer walks into a library…](https://speakerdeck.com/pauljervisheath/a-designer-walks-into-a-library-dot-dot-dot)

![[Attachments/無題のフォルダ/preview_slide_0 31.jpg]]

[Code Reviewing Like a Champion](https://speakerdeck.com/maltzj/code-reviewing-like-a-champion)

![[Attachments/無題のフォルダ/preview_slide_0 32.jpg]]

## Transcript

1.  n番煎じな話なので詳細には立ち入りません。 それぞれのパフォーマンス上の特性は @takepepe さんの 「より速いWebを目指す Next.js」にまとまっており、こちらを参照してください。 また、これらは完全に分離できるものでもないことを断っておきます。 ex) template に react を CDN 経由で読み込んだものはどれ？ https://speakerdeck.com/takefumiyoshii/nextjs-make-the-web-faster
    ### [言葉の定義 - SST - CSR - SSR - SSG ](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_9.jpg)
2.  を生成してクライアントへ返す - 素直な構成だと TTFB の遅さが問題になりがち - 一方で後述するCSRと比較し、通信の往復は減る
    ### [SST: Server Side Templating - Server で HTML Template に値を埋め込み、HTML](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_10.jpg)
3.  を悪化させる要因を含む - コンテンツ描画のためにはクライアントでのデータ取得が 必要 - HTML / Styling を生成する仕事はクライアントが担う - コンテンツのアップデートにはHTMLを取得しなくて いいため SST より効率的になる
    ### [CSR: Client Side Rendering - サーバーから取得したデータを元に、コンテンツの 描画をクライアントサイドで完結させる - TTFB は速いが、LCP](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_11.jpg)
4.  される - hydration 後は CSR できる - SST における TTFB 周りのデメリットは引き継 ぐが、CSRの良いところを享受できる
    ### [SSR: Server Side Rendering - サーバーからテンプレートに値が埋め込まれた HTMLを受け取る - クライアントでそのHTMLは hydration](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_12.jpg)
5.  SSR サーバーがクライアントにHTMLを返す - (re)hydration - HTML を JS の世界で使えるように戻す処理 - Client ライブラリが実行する
    ### [(re)hydration - dehydration - JS世界にあるVDOM を HTML に変換する処理 -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_13.jpg)
6.  ビルド時の静的コンテンツとして固定されるデメ リットはある - しかしツールによっては hydration して dynamic な性質を取り込み、そのデメリットを回 避する
    ### [SSG: Static Site Generation - サーバーはリクエストに対してHTMLを返すだ け - HTMLをリクエストより前に生成しておく -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_14.jpg)
7.  な Site への対 抗として SSG が注目される - props: DBアクセスの削減 / TTFB の削減 - cons: ページ数に応じたビルドコスト - これまでに多くのツールが開発されている - 興味がある人は jamstack.org にあるまとめサイトを チェック https://jamstack.org/generators/
    ### [SSG: Static Site Generation - 歴史は長い - 2000年前半 Database Driven](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_15.jpg)
8.  CSR の要素がある JS ツールチェインの上に作られることで、transpiler, bundler, compressor などの恩恵が受けられる ex) Next, Gatsby, Nuxt, …
    ### [現代的なSSG - SSR FW や JS ツールチェインの上に作られる - hydration +](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_18.jpg)
9.  が可能 - 技術的には hydration 付きの SSG も可能である
    ### [hydration ≠ JS FW - wasm によって任意の言語で SSR + hydration](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_19.jpg)
10.  の商品ページを静的生成、在庫はCSRで取得 要件によってはCSRでも難しい C to C のECでページ作成が頻繁、通報された商品はページごとは消したい
    ### [SSG に対する批判 全てが静的に決まらないと使えない Twitter を SSG で作れますか？ 現代的なSSGでCSRすれば対処できるケースも多い EC](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_22.jpg)
11.  作者のブログ - Gatsby is meta-compiler - Gatsby は普通のサイトを速いサ イトへと変換する - Gatsby は webpack の設定ファイ ルを生成している https://www.gatsbyjs.com/blog/2017-09-13-why-is-gatsby-so-fast/
    ### [SSG is meta-compiler - Web performance 101 - 2017年の Gatsby](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_25.jpg)
12.  - commons-fa6c875ea4a0d1a31 7de.js - styles.80e97039b81d20471ead .css - hash があるとビルドごとに キャッシュを破棄できる
    ### [複雑な名前はchunkの規則 - ${key}-${hash} - app-44f67102fd3fe7d6ed63.js - component---src-pages-inde x-jsx-b3759d3c0476f9883dba. js ](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_29.jpg)
13.  ページごとに分ける - 共通ライブラリをくくり出す - 詳しくは @mizchi さんの「webpack chunk 最適 テク ニック」 https://qiita.com/mizchi/items/418be9abee5f785696f0
    ### [chunk の作り方 (webpack の場合) - chunk 名に対して条件を書く - 条件設定の指針 -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_30.jpg)
14.  重いライブラリは chunk - スタイリング系もchunk Improved Next.js and Gatsby page load performance with granular chunking https://web.dev/granular-chunking-nextjs/
    ### [Gatsbyはどのような chunk か - ページごとに chunk - 共通モジュールは chunk -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_33.jpg)
15.  ではなく <Link /> - ex) @gatsby/reach-router - 遷移先の chunk が必要
    ### [navigate - 現代的な SSG では CSR として遷移できる - <a />](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_35.jpg)
16.  の chunk があれば即座に遷移可能 - Gatsby の場合、<Link /> に hover したら chunk を取ってこれる
    ### [prefetch - resource の先読み - A から B に遷移する前に B](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_36.jpg)
17.  source, lazy load - Traced SVG: 小サイズのSVG placeholder を生成、画 像ロード時に差し替え - JSConfJP の Speaker が分かりやすい - https://jsconf.jp/2021/speakers/
    ### [Image optimaization - ビルド時に画像とHTMLを最適化 - Size, Resolution - Tag: picture,](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_37.jpg)
18.  の style - CSS in JS lib: (ex) styled-component, emotion, - LCP に影響あり - とはいえほとんどの場合は大丈夫 - ビルド時にCSSをHTMLに埋め込む - zero runtime xxx が流行 “静的に埋め込めるものは事 前に埋め込んでしまおう” - ex) linaria, vanila-extract
    ### [Zero Runtime CSS in JS - VDOMからのスタイル生成はクライアントで行わ れる - React](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_38.jpg)
19.  HTML に埋め込んでくれる （便利） - ただしランタイムでCSSを書き換える時は、CSS in JS ライブラリ環境下では対応するプラグイン が必要 - gatsby-plugin-emotion など
    ### [Gatsby での Zero Runtime CSS in JS の実現 - ビルド時に勝手に](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_39.jpg)
20.  They say “diffing”, “blazing fast”, … - 駆け出しエンジニア時代、SPA はすごいことをしているという誤解をする - 【翻訳】 2016年にJavaScriptを学んでどう感じたか ← これめちゃくちゃ面白い - https://www.fendo181.me/entry/2016/10/26/172404 - 冷静に考えると・・・ - 差分検知なんぞせず、手で直接実DOMを部分更新した方がエコでは？ - そもそもランタイムにReactライブラリを含めない方がエコでは？
    ### [手書きHTMLが最速？ - 個人的な誤解: React / Next / Gatsby を使えば早くなる -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_41.jpg)
21.  chunk へのリンクが挟まれているだけで、それは async load されるのでブロッキングされない - Gatsby のビルドは自然と HTML が minify される
    ### [手書きが勝てない理由, FCP に影響がない理由 - SSG （=静的化）しているのだから HTML に支払うコストは同じになる - ランタイムが膨らむと言っても](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_45.jpg)
22.  遷移先の chunk を巨大にする - 嫌がらせ chunk が分離されないように 1page component にベタ書く - 巨大 prefetch 中に遷移する 20MB のDOM要素を用意しました <p>heavy_heavy_heavy_…</p>
    ### [Gatsby に嫌がらせをしてみた - Gatsby の遷移は CSR としての遷移 - つまり、遷移を妨害すれば良い -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_46.jpg)
23.  に対しては、SSG 側もライブラリ分の容量を HTML からは削るので差が出 にくい - ランタイムで動かしたいJSがあっても（ex カルーセル、モーダル）、別チャンクに 切り出せば HTML を読み込むコストとしての差は出ない - 別コンポーネントに分けて、2カ所以上から読み込む SSGした方が良い
    ### [SSGした方が良い？ - SPA (1HTML しかない CSR) に対してはライブラリの分の容量分のアドバンテー ジがある - SSG](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_49.jpg)
24.  Gatsby Cloud でしか使えなかったが v3 でオープンに - とはいえ問題が根本的に解消はされない - うっかり cache を消した時のリカバリは？ - cache 全体に影響があるような変更が入ると？ - 運用者目線ではすぐにデプロイし直せる保証が欲しい - DSG (後述)
    ### [Incremental Build - Gatsby のビルドモードの一つ - ビルド時の cache を使って、次回は差分のみをビルド -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_53.jpg)
25.  静的ビルドするパスを宣言できる - ビルド時に生成しなかったページはユーザーの アクセス時に作られる = SSR - CDNレイヤーにcache - アクセスされたページの HTML が static/ フォ ルダに作られるわけではない - Gatsby Cloud を使う必要がある - 使わなくても良い方法があるが、それは後述す る方法と同じやり方 https://www.gatsbyjs.com/docs/conceptual/rendering-options/
    ### [DSG: Deferred Static Generation - Gatsby v4~ - ビルドタイミングを制御する機能 -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_54.jpg)
26.  SSG のいいところ取り - 一度 SSR した HTML をキャッシュし、次回のアクセスからそれを返す - 処理軽減 - IO削減 - stale な cache を返しつつ cache を fresh にできる - （基本的には）Vercel 環境でしか動かせない
    ### [ISR: Incremental Static Regeneration - NextJS のモードの一つ - SSR と](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_55.jpg)
27.  個人的には 「Vercel に乗っかりなよ」とは思うが、lock-in されたくない気持 ちも理解できる - よし、内製しよう - DSG / ISR のような動作は CDN で担保する - SSR FW を自作すればいい
    ### [lock-in が嫌われている気がする - Vercel や Gatsby が素晴らしい機能を出すたびに lock-in が心配される -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_57.jpg)
28.  cache - 一番素直で FW や Hosting 環境にし ばられないやり方 - cache の制御もしやすい - stale-while-revalidate => ISR - vary - dynamic cache purging
    ### [SSR + CDN - SSR した HTML を CDN に](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_58.jpg)
29.  を作っておく - ビルド時にクライアントコードの最適化 - chunk の作成 - linaria の実行 - NodeJS サーバーのエンドポイントで リクエストを待ち受ける - (p) react をサーバーで実行して HTML を作成 - cache control header を設定して返す 意外とシンプル preactとfastifyでSSR https://zenn.dev/takurinton/articles/4 c8625a43f024b
    ### [FW を使わない SSR -とある実装を参考に- - Best practice component library](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_59.jpg)
30.  _app.js, gatsby-browser.js より細かい粒度で共通設定を書ける - ビルドチェインの拡張が容易 - React app 以外のコードをビルド、SSR時に script tag で挟み込むといったことがやりや すい - 1 サービスを複数チームで育てる時に管理しやすい - partial hydration - とはいえ Astro, Next12 も凄い！
    ### [FW を使わないメリット - ランタイムライブラリの選択が自由 - 不都合なく preact が使える -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_60.jpg)
31.  バックエンドの扱いは慣れていない - cache hit ratio を上げる ※ と、ここまで偉そうに話しましたがほとんどが知人の実装やおかげです
    ### [FW を使わないデメリット、その指摘 - FW を作ることに消耗したくない、案件を進めたい - Next の完コピを目指すと大変だけど、ただのSSRサーバーを作るだけならそこまでコスト はない -](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_61.jpg)
32.  - SSG の辛さへの回答として、SSR で HTML を Generate して CDN で Cache - FW や PFM へのロックインが気になるなら自作できる
    ### [まとめ - 現代的な SSG は dynamic な要件に対応できる - SSG が内部でしていることはページの事前生成とパフォーマンスの最適化 ](https://files.speakerdeck.com/presentations/a098fcd04ea94eaca743cd1779b60087/slide_62.jpg)