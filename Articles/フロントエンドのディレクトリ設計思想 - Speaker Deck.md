---
notion-id: 1f61a9b7-e922-48fd-b2a5-001fad4af261
Created: 2023-10-17T15:29:00
URL: https://speakerdeck.com/teppeita/hurontoentonoteirekutorishe-ji-si-xiang
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
# フロントエンドのディレクトリ設計思想

## More Decks by teppeita

See All by teppeita

GraphQLの社内ドキュメントを作った話

teppeita

0    63

## Other Decks in Programming

See All in Programming

CodeReviewerが求められること

onopon

0    240

RubyVM を PHP で実装する 〜Hello World を出力するまで〜

memory1994

PRO

1    3.8k

プルリクサイズが大きいと警告してくれる君を作りました！

yamamotohiroya

0

Oracle Database MLE JavaScript & SQL Developer Web

thatjeffsmith

0    850

ivargrimstad

0    430

htmx is not a typo

kimihito_

5    3.8k

On the way to io_uring networking

ennael

PRO

0    260

![[Attachments/無題のフォルダ/preview_slide_0 18.jpg]]

Cloudflare Workers で OpenAI の LINE Chatbotを作ってみた

koda

0    260

ノーコードE2Eテストで実現する高速開発

nozomiito

0

![[Attachments/無題のフォルダ/preview_slide_0 19.jpg]]

フレームワークが存在しない時代からのレガシープロダクトを、 Laravelに”載せる”実装戦略

hirobe1999

0    330

PGConf NYC 2023: Lightning Talk — Query Identifier

andyatkinson

PRO

0    220

Micro Frontends with Modern Angular

manfredsteyer

PRO

0    180

## Featured

See All Featured

Gamification - CAS2011

davidbonilla

75    4.3k

For a Future-Friendly Web

brad_frost

168    8.3k

chriscoyier

500    130k

RailsConf & Balkan Ruby 2019: The Past, Present, and Future of Rails at GitHub

eileencodes

123    31k

実際に使うSQLの書き方 徹底解説 / pgcon21j-tutorial

soudai

51    18k

Building Effective Engineering Teams - LeadDev

addyosmani

21    1k

RailsConf 2023

tenderlove

0    270

rasmusluckow

323    20k

Building a Scalable Design System with Sketch

lauravandoore

453    31k

BBQ

matthewcrist

76    8.4k

Building Adaptive Systems

keathley

29    1.6k

Writing Fast Ruby

sferik

615    59k

## Transcript

1.  
フロントエンドのディレクトリ設計思想
2023-10-11 ハッカー鮨
竹尾哲平（@_teppeita）
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_0.jpg)
2.  
自己紹介
Index
1
ディレクトリについて
2
設計思想
3
マイベストの方針
4
まとめ
5
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_1.jpg)
3.  
竹尾 哲平（@_teppeita）
takeo teppei
フロントエンドエンジニア
デザインシステムとGraphQLに関心が有ります。
画像
自己紹介
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_2.jpg)
4.  
ディレクトリ構成
どうしていますか？
画像
https://tabelog.com/tokyo/A1302/A130204/13018162/
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_3.jpg)
5.  
ディレクトリ構成
どう考えるのが良いと思いますか？
画像
https://tabelog.com/tokyo/A1302/A130204/13018162/
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_4.jpg)
6.  
どれを選びますか？
フロントエンド界隈を見ると
世の中にはいろんなパターンが出回っています
Atomic Design
Features Directory
App Directory Clean Architecture
Container / Presenter
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_5.jpg)
7.  
アーキテクチャ全般の話から考えてみましょう
概念的な話として
設計思想：どう分けるか
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_6.jpg)
8.  
どう分けるか、を
キャッチーに命名
Layer型 Feature型
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_7.jpg)
9.  
MVCとかも分類できますが、割愛します
先ほどあげた
よくあるパターンを分類
Layer型 Feature型
Atomic Design Features Directory
App Directory
Clean Architecture
Container / Presenter
(Micro Frontends)
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_8.jpg)
10.  
よくあるパターンの導入理由や失敗事例を見ると分かりやすいです
分類ごとの
Pros / Cons
Layer型 Feature型
Pros
・処理の共通化がしや
すい
Cons
・階層分けが難しい
・依存の管理が難しい
Pros
・ドメインごとに疎結合 &
高凝集にできる
Cons
・境界の定義が難しい
・処理の重複が発生
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_9.jpg)
11.  
少し視点を変えて
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_10.jpg)
12.  
Layer型・Feature型と似てますね
組織で考えてみると
機能別組織と事業部制組織が有ります
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_11.jpg)
13.  
つまり、組み合わせて構成する
組織の場合
組織の構造は、ハイブリッドに帰結する
「共通の事業目的を持つすべての大組織は、最後にはハイブリッド組織形態に落ち着くことになる」
アンドリュー・S・グローブ. 『ハイアウトプットマネジメント』 .日経BP.2017
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_12.jpg)
14.  
コンウェイの法則に従えば、
システムもハイブリッドが良い？
→組み合わせ方を考える。
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_13.jpg)
15.  
先ほどの
Pros / Cons を再確認
Layer型 Feature型
Pros
・処理の共通化がしや
すい
Cons
・階層分けが難しい
・依存の管理が難しい
Pros
・ドメインごとに疎結合 &
高凝集にできる
Cons
・境界の定義が難しい
・処理の重複が発生
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_14.jpg)
16.  
どう組み合わせるか
マイベストの方針
Layer型 Feature型
Pros
・処理の共通化がしや
すい
→Componentsに適用
Pros
・ドメインごとに疎結合・
高凝集にできる
→Pagesに適用
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_15.jpg)
17.  
Layer型を適用
Componentsディレクトリ
Layer型
Pros
・処理の共通化がしや
すい
→Componentsに適用
・デザインシステム構築中
・Atomic Designをベースに議論して、独
自にカスタマイズした階層
（詳細話したいですが、今回は割愛）
・処理を共通化して複数箇所で扱いや
すい
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_16.jpg)
18.  
Feature型を適用
Pagesディレクトリ
Feature型
Pros
・ドメインごとに疎結合・
高凝集にできる
→Pagesに適用
・Next.jsのルーティングに合わせて機
能をまとめる
・App Directoryに倣ってコロケーショ
ン
（pageExtensions optionを利用）
・境界の定義が明確で迷わない
[View Slide](https://files.speakerdeck.com/presentations/79409fce28f543fda19cace26816eb6e/slide_17.jpg)
19. 
まとめ
ディレクトリ設計思想は
01
Layer型とFeature型
に分類できそう
02
2つの型の
組み合わせ
を考える
03
マイベストでは
componentsと
pagesで組み合わせ