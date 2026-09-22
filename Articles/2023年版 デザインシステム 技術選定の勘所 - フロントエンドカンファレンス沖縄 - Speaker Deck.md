---
タグ: []
作成日時: 2023-11-20T02:10:00
URL: https://speakerdeck.com/takanorip/2023nian-ban-tesainsisutemuji-shu-xuan-ding-nokan-suo
Tags: [topic/デザインシステム/配信基盤]
---
![[slide_0 18.jpg]]

## Transcript

1.  
2023年版
デザインシステム
技術選定の勘所
大木尊紀 / takanorip
Fronend Conference Okinawa 2023
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_0.jpg)
2.  
自己紹介
大木尊紀 / takanorip
Ubie株式会社 デザインエンジニア
元フロントエンドエンジニア、現デザインエンジニア。
症状検索エンジン ユビーの開発やデザインシステム構築、
アクセシビリティ改善などに携わっている。
趣味は筋トレ、料理、ロードバイク、キーボード、特撮。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_1.jpg)
3.  
Zennにて好評発売中！
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_2.jpg)
4.  
目次
0 デザインシステムの構成技術要素
１ Figmaの技術選定
２ デザイントークンの技術選定
3 UIライブラリの技術選定
4 ドキュメントサイトの技術選定
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_3.jpg)
5.  
デザインシステムの
構成技術要素
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_4.jpg)
6.  
“「デザインシステム」は一般的に、「デザインの再
現性を高め、一貫した製品体験を効率よく表現するこ
と」を目的に導入される「ドキュメントやリソース群
のこと」と説明されます。”
大塚 亜周,稲葉 志奈,金森 悠,samemaru,圓山 伊吹,植田 将基,関口 裕,8chari,後藤 拓
也,小木曽 槙一,桝田 草一. ちいさくはじめるデザインシステム (p.5). Kindle 版.
デザインシステムの定義
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_5.jpg)
7.  
デザインシステムの想定構成
ドキュメントサイト
C デザイン原7
C スタイルガイ(
C プレビュー機#
C etc...
デザイントークン
UIコンポーネント
CSS
Figma
library群
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_6.jpg)
8.  
僕のデザインシステム設計思想
１ デザインデータが雑でも意図したUIが実装される
２ できるだけ標準化された機能・仕様に則る
3 運用・更新まで考えてシステムに組み込む
3 ドキュメントサイトもデザインシステムの一部
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_7.jpg)
9.  
デザインシステムにおいて大事なこと
デザインシステムの目的を明確にする
「デザインシステム」といっても、組織やプロダクトが違えば必要なシステムも違ってくる。
誰かのマネをするとか正解を突き詰めるとかではなく、自分たちが必要としているシステム像
を明確にすることが良い技術選定につながる。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_8.jpg)
10.  
Figmaの技術選定
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_9.jpg)
11.  
Figmaの活用の仕方
デザイナー向けの
パーツを提供する
デザイントークンの
Single Sourceとして
Figmaを活用する
Figma
CSS
TypeScript
iOS
Tailwind CSS
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_10.jpg)
12.  
なんでFigmaをデザイントークンのSingle Sourceにするの？
見た目と値をセットで管理が吉
JSONファイルをSingle Sourceにする方法もあるが、カラーコードや数字が並んでいるだ
けではその値がデザイン的に正しいのかどうか判別しにくい
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_11.jpg)
13.  
Variables or Styles
結論：Styles > Variables
Variablesはまだ機能的に未熟なので、積極的に使う必要はない。
APIがEnterpriseプランでないと使えない、タイポグラフィが管理できない、など。
特にAPI経由でデータを取得できないというのが運用において致命的。
Numberを保存できる、テーマを管理できるなどのメリットはあるので、機能が拡充したら乗
り換えを検討しても良いかも。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_12.jpg)
14.  
Token Studio or not
特段必要ない
Variablesの機能が拡充されていくはずなので、将来的に乗り換えることを考えるとToken
Studio（または類似のトークン管理プラグイン）を導入するメリットは薄い。
費用対効果が明確に説明できるなら導入を検討するのもあり。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_13.jpg)
15.  
Plugins, Widgetsの技術選定
目先の便利さに惑わされない
特定のプラグインを業務のコアな部分に組み込んでしまうと作業が複雑化し、業務効率の悪化
や属人化が起きてしまう可能性がある。それが許容できるなら組み込んでも良い。
（例：Token Studioの使い方がわからないので〇〇さんにお願いしよう）
乗り換え時のコストについても考えておく必要がある。共通の仕様があるわけではないので、
プラグインから別の同じようなプラグインに乗り換えるのはとても大変なことが多い。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_14.jpg)
16.  
Plugins, Widgetsの技術選定
GitHubとの連携はAPI経由で
API経由にすることでCI/CDに組み込んだり自動化したりできる。プラグイン経由だと煩雑に
なるので、継続して運用していくことが難しくなる可能性が高い。（特にデザイナーやエンジ
ニアの多い組織。）
乗り換え時のコストについても考えておく必要がある。共通の仕様があるわけではないので、
プラグインから別の同じようなプラグインに乗り換えるのはとても大変なことが多い。
https://www.figma.com/developers/api
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_15.jpg)
17.  
デザイントークンの
技術選定
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_16.jpg)
18.  
Style Dictionary
デザイントークンビルドシステムの
デファクトスタンダード
Amazon製デザイントークンビルドツール。JSONファイルから各種プラットフォーム向けの
設定ファイルを生成できる。
マルチプラットフォームを想定してないデザインシステムでも、これを使うと取り回しやすく
なるので、導入を強く推奨する。UbieではこれでCSS、JS、型情報などなどを生成してる。
https://amzn.github.io/style-dictionary/#/
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_17.jpg)
19.  
Design Tokens Community Group
“The Design Tokens Community Group's goal is to provide standards
upon which products and design tools can rely for sharing stylistic pieces
of a design system at scale.”
Design Tokens Community Group
デザイントークンに関するツールを選定するときは、このコミュニティで議論されている仕様
（Design Tokens Format Module）に準拠しているものを選ぶ。
正式なW3C Standardではないけど、業界標準のようなものになっていく可能性が高い。
前述のStyle Dictionaryはこの仕様に準拠している。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_18.jpg)
20.  
Tailwind CSS
導入は覚悟を持って
デザイントークンを実装に組み込む良い手段だが、もし導入するならデザインシステムを
Tailwind CSS中心に振り切って設計する覚悟が必要。（他の CSS in JS ようなものを導入
するときも同じ。）
Style DictionaryからTailwind CSSのテーマを出力するのは少し工夫が必要。
Style Dictionary Tailwind CSS Transformerというライブラリもある。
https://github.com/nado1001/style-dictionary-tailwindcss-transformer
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_19.jpg)
21.  
Panda CSS
Chakra製 Zero Runtime CSS
最近注目しているZero Runtime CSSツール。型安全でプリミティブなCSSを生成するなど
のメリットがある。Design Tokens Format Moduleとの相性はこちらのほうが良いかも？
https://panda-css.com/docs/theming/tokens
詳しいことはこちらの記事でも解説されてる。
https://zenn.dev/cybozu_frontend/articles/panda-is-coming
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_20.jpg)
22.  
Panda CSS
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_21.jpg)
23.  
Ubieでやってること
Zennに記事を公開してるので詳しくはこちらで
https://zenn.dev/ubie_dev/articles/7a6413af237eae
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_22.jpg)
24.  
UIコンポーネントの
技術選定
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_23.jpg)
25.  
車輪の再発明を避けて運用を楽にする
UI開発で求められる機能はほとんど同じ。
Stylelessなコンポーネントを活用することで開発工数を大きく減らせる。
またUIコンポーネントのアクセシビリティ担保も容易になる。
StylelessなUIコンポーネントライブラリを活用
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_24.jpg)
26.  
Headless UI
p Tailwind CSSを開発元が同A
p ReactとVueの実装があ0
p Tailwind CSSかclassName経由で
スタイリンB
p 収録コンポーネントが少な
p 個人的にはあまりおすすめできない
Ark UI
p Chakra UIのチームが開発してい0
p コンポーネントの数は豊}
p アクセシビリティ対応もされてい0
p 複数のフレームワークに対応するために
Zag.jsというステート管理ツールを使用して
おり、ファイルサイズが大きくなりが
p React、Vue、Solidに対n
p https://ark-ui.com/
Radix UI
p
Work
OSが開
C
p Reactにの
み対n
p アクセシビリティもいい
感A
p コンポーネントの
種類も豊
富で使い
勝手も
p themeというst
yleありのコンポーネント
も
用
意されてい0
p https://www.radi
x-ui.com/primiti
ves
StylelessなUIライブラリの活用
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_25.jpg)
27.  
番外編：Kuma UI
次世代CSS最適化ツール
UIコンポーネントライブラリだが、CSS in JSとしての側面が強め。
Hybrid CSS in JSでコンポーネントのパフォーマンスを最適化してくれる。
https://www.kuma-ui.com/
用意されているコンポーネントの種類は多くないので、前述のUIコンポーネントライブラリと
併用するかたちになりそう。
App RouterのServer Componentsに対応しているのは嬉しいポイント。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_26.jpg)
28.  
ビルドツールの技術選定
tsupがおすすめ
esbuildをラップしてライブラリ向けの設定をいい感じにやってくれるやつ。
同じようなものにviteもあるが、viteはよりアプリケーション開発向け。
https://tsup.egoist.dev/
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_27.jpg)
29.  
番外編：デザインシステムのリポジトリ設計
小さく始める場合はツールごとにリポジトリを作る方がおすすめ。
小さく始める場合はデザインシステムの全体像や将来像が掴めていない場合が多いので、とり
あえずできるものからやっていくのが良い。
大きいデザインシステムを作る想定ならモノレポにすると良い。
セットアップは大変だが、モノレポで管理するほうがpackage同士の連携やリリース管理が
しやすいメリットがある。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_28.jpg)
30.  
VRTの技術選定
Chromatic
UIテスト統合マネジメントサービj
VRTをはじめ様々なUIテスト機能を提供してくれ
セットアップが簡%
Freeプランだと5000スナップショット/`
多そうに見えるが、ビルドごとにスナップショットが作られるので
あっという間に消費してしまP
TurboSnapという最適化ツールを使う必要があ
有料プランはけっこう高p
https://www.chromatic.com/
reg-suit + Storycap
VRTのOSSツーÊ
StorybookのStoryを活用してVRTでき
VRT以外の機能はなp
セットアップがすこし大
画像のホスティングを自前で管理する必要がある、な
https://github.com/reg-viz/reg-suiÎ
https://github.com/reg-viz/storycap
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_29.jpg)
31.  
Chromaticの必要性
確かにとても便利だが、月150ドル＋従量課金で使うほどのメリットあるかは疑問。
Freeプラン内で利用できるなら、選択肢の1つにはなりそう。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_30.jpg)
32.  
番外編：Lintは厳しく
妥協を輸出しないためのLint
UIコンポーネント側で厳しくチェックすることで、コンポーネント利用者が意識しなくても
実装品質を高めることができる。
厳しさをコンポーネントに隔離することで全体の生産性と品質を向上させる。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_31.jpg)
33.  
ドキュメントサイトの
技術選定
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_32.jpg)
34.  
ドキュメントサイトどうする？
重要なのは読まれる・使われるドキュメントを作ること
Notion
x 一番手軽に構築できY
x FigmaのPreviewを載せれY
x 実装との接続ができなb
x 自由度が低b
x 読みにくい
Zeroheight
x デザインシステム用のドキュメントを書くこ
とに特化しているため、機能が豊i
x 実装との接続が少し面
x 別途コストがかかY
x 自由度は中くらい
️自前で構築する
¾ 自由度が高À
¾
¾ 要求に合ったドキュメントサイトを
構築できY
¾ 自動化など運用の工夫がしやすい
初期コストが高À
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_33.jpg)
35.  
Astroはいいぞ
U 高速なWebサイトを作ることに特化している'
U ReactやVueのコンポーネントも使えるので、デザインシステムのUIコンポーネントを組
み込むこともできる'
U Interactiveな機能も盛り込むことができる。
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_34.jpg)
36.  
ドキュメントが継続して書かれるようにする
ドキュメントを書くハードルを潰す
ドキュメンが更新されなくなるとドキュメントサイトは死ぬ
i ドキュメント更新まで含めたワークフローを設計す
o LintとかTestでで怒ってもらうとかケツをたたく人を設置するm
i Scaffdogなどのscaffoldingツールを活用す
i 誰が書くか（エンジニアが書くのかデザイナーが書くのか）明確にす
i ChatGPTを活用して書く
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_35.jpg)
37.  
まとめ
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_36.jpg)
38.  
技術選定に正解はない。
デザインシステムの目的を明確にして
悔いのない意思決定を！
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_37.jpg)
39.  
Ubieでは
フロントエンドエンジニアを
絶賛採用中です！
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_38.jpg)
40. 
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_39.jpg)
41.  
人類の健康を
大きく飛躍させる
プロダクトを一緒に
作りましょう！
カジュアル面談は
こちらから↓
[View Slide](https://files.speakerdeck.com/presentations/a7b580a07aef4799b3526b4b725a6db4/slide_40.jpg)