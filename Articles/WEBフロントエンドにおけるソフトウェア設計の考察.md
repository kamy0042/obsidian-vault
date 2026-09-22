---
Created: 2021-01-15T20:19:00
URL: https://speakerdeck.com/tooppoo/webhurontoendoniokerusohutoueashe-ji-falsekao-cha
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![](https://d1eu30co0ohy4w.cloudfront.net/assets/mark-white-8d908558fe78e8efc8118c6fe9b9b1a9846b182c503bdc6902f97df4ddc9f3af.svg)

### WEBフロントエンドにおけるソフトウェア設計の考察

[philomagi](https://speakerdeck.com/tooppoo)

![](https://secure.gravatar.com/avatar/b8403d102456248570005ee7fb2ba0f7?s=47)

February 09, 2020

[Technology
](https://speakerdeck.com/c/technology)

[10](https://speakerdeck.com/signin?return_to=%2Ftooppoo%2Fwebhurontoendoniokerusohutoueashe-ji-falsekao-cha)

3.6k

![](https://secure.gravatar.com/avatar/b8403d102456248570005ee7fb2ba0f7?s=128)

### [philomagi](https://speakerdeck.com/tooppoo)

February 09, 2020

[Limited time offer: Get 10 free Adobe Stock images.](https://srv.carbonads.net/ads/click/x/GTND42Q7FTBDKKQMFT7LYKQMF6ADT23WCWBILZ3JCWAIEK3WFTAILK7KCEBDTKQWCE7I62Q7CTYDV23YF6SD42QKC6BIL53WCVADEK3EHJNCLSIZ?segment=placement%3Aspeakerdeckcom%3B)[ads via Carbon](http://carbonads.net/?utm_source=speakerdeckcom&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=carbon)

![](https://cdn4.buysellads.net/uu/1/41369/1551199042-Adobe_Stock_260x200-3.jpg)

**Transcript**
1. [**WEBフロントエンドにおける ソフトウェア設計の考察 1 @Philomagi 2020/02/09@Java Doでしょう #17 \#javado**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_0.jpg)
            
        
2. [**発表者 @Philomagi • 主にフロントエンド主体のWEB系エンジニア • ScalaとTypescriptとRubyが好き ◦ Rubyは最近、公私共に若干疎遠 • PHPは中々縁が切れない悪友**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_1.jpg)
            ◦ 最近は、「然程悪いやつでもないな」と思い始めてる 2
        
3. [**注 以降、特に断りが無い場合は 「フロントエンド = Webフロントエンド」 の意味で使います 3**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_2.jpg)
            
        
4. [**注 • 今の主な関心事がWebフロントエンド • 他のフロントアプリ事情に詳しくない ◦ iOS/Android/デスクトップとか という理由です 4**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_3.jpg)
            
        
5. [**目次 1. 現代フロントエンドの難しさ 2. フロントエンドの「ドメイン」 3. フロントエンドを「設計」する 4. フロントエンドアーキテクチャ考察 5**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_4.jpg)
            
        
        
        
6. [**反論したいこと ❌ フロントエンドは表示して終わり ❌ 表示だけなので、「ドメイン」も「ロジック」も存在しな い ❌ フロントエンドの「設計」と言えば「画面設計」（で終 わる議論） 7**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_6.jpg)
            
        
7. [**1. 現代フロントエンドの難しさ 8**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_7.jpg)
            
        
8. [**フロントエンドといえば 9**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_8.jpg)
            
        
9. [**開発環境の多様化・複雑化 10**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_9.jpg)
            
        
10. [**開発環境の多様化・複雑化 11 本質的な問題ではない**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_10.jpg)
            
        
11. [**開発環境の多様化・複雑化 12 道具選びが大変なのは事実**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_11.jpg)
            
        
12. [**開発環境の多様化・複雑化 13 しかし フロントエンドの難しさ = 道具選び ではない**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_12.jpg)
            
        
13. [**フロントエンドを 複雑にするもの 14**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_13.jpg)
            
        
14. [**ユーザー操作の複雑化 • よりリッチ/インタラクティブなUI • 操作のバリエーション増加 • 入力バリデーションの組み合わせ 画面に対する操作が複雑になっている 15**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_14.jpg)
            
        
15. [**画面状態の複雑化 16 • 状態毎に複雑に切り替わる表示内容 • 複数状態の組み合わせによる表示変化 • 操作に応じて動的に切り替わる画面表示 画面の表示状態が複雑になっている**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_15.jpg)
            
        
16. [**現代フロントエンドの複雑さ 17 • 複雑なユーザー操作 • 複雑な画面状態**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_16.jpg)
            
        
17. [**現代フロントエンドの難しさ 18 • 複雑なユーザー操作 • 複雑な画面状態 この2点を如何に捉え管理するか**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_17.jpg)
            
        
18. [**2. フロントエンドの「ドメイン」 19**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_18.jpg)
            
        
19. [**ここでの「ドメイン」について 20 すべてのソフトウェアプログラムは、それを使用する ユーザの何らかの活動や関心と関係がある。ユーザ がプログラムを適用するこの対象領域が、ソフトウェア のドメインである。 -「エリック・エヴァンスのドメイン駆動設計」p.2**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_19.jpg)
            
        
20. [**フロントエンドの「ドメイン」を探る 21 フロントエンドが対象とする 「ユーザの何らかの活動や関心」は何か？**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_20.jpg)
            
        
21. [**再掲）現代フロントエンドの複雑さ 22 • 複雑なユーザー操作 • 複雑な画面状態 この2点を如何に捉え管理するか**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_21.jpg)
            
        
22. [**再掲）現代フロントエンドの複雑さ 23 • 複雑なユーザー操作 • 複雑な画面状態 この2点を如何に捉え管理するか なぜこの2点が複雑化するのか？**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_22.jpg)
            
        
23. [**操作と状態が複雑化する理由 24 それがフロントエンドのユーザの 主たる「活動や関心」だから**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_23.jpg)
            
        
24. [**「ポップアップメニュー」のエピソード 25 いつものカット・アンド・ペーストをやったとき、（中略）ピー ター・ドイッチュが立ち上がってスクリーンを指さしていた。 「今やったのは、やったんじゃないかと俺が思ってること か？」 「未来をつくった人々」 - Chapter15, p.323**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_24.jpg)
            注：「ポップアップメニュー」の先駆けが初めてデモされた時のエピソード。 BitBltという技術の開発 により、オーバーラッピングウィンドウが実用化されたことに依る。
        
25. [**フロントエンドのドメイン 26 ユーザーが「した」と思ったことを 画面に表すこと**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_25.jpg)
            
        
26. [**フロントエンドのドメイン 27 操作（「した」） と 表示（画面に表す）**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_26.jpg)
            
        
27. [**3. フロントエンドを「設計」する 28**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_27.jpg)
            
        
28. [**フロントエンドの何を「設計」するのか 29 ２種類の「設計」対象が存在する • 画面 ◦ ex. Atomic Design, UIデザイン**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_28.jpg)
            • ソフトウェア ◦ ex. モジュール設計, 依存設計
        
29. [**フロントエンド「設計」への問題提起 30 画面の「設計」ばかりが語られていないか？ • 画面の「設計」は重要だが、それだけで完結 はしない（はず） • 画面の奥にあるソフトウェアをいかに組み立 てるかの議論が不足していないか？**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_29.jpg)
            
        
30. [**Atomic Designと「設計」 31 • Atomic Design はUIパーツの設計方法論 ◦ ソフトウェアの設計までカバーするものでは ない**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_30.jpg)
            ◦ Atomic Design のスコープは「UIパーツをど う組み立てるか」まで ◦ Atomic Design で「設計」は完結しない
        
31. [**今回の発表が扱う「設計」 32 「画面設計」ではなく、 「ソフトウェア設計」に焦点をあてる**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_31.jpg)
            
        
32. [**どうやって設計するのか？ 33 フロントエンドソフトウェアを、どうやって設計するか？**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_32.jpg)
            
        
33. [**どうやって設計するのか？ 34 フロントエンドソフトウェアを、どうやって設計するか？ Atomic Design のような、 フロントエンドソフトウェア設計の 新たな方法が必要だ！**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_33.jpg)
            
        
34. [**どうやって設計するのか？ 35 フロントエンドソフトウェアを、どうやって設計するか？ Atomic Design のような、 フロントエンドソフトウェア設計の 新たな方法が必要だ！**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_34.jpg)
            
        
        
        
35. [**オブジェクト指向 37**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_36.jpg)
            
        
36. [**再掲）フロントエンドのドメイン 38 操作（「した」） と 表示（画面に表す）**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_37.jpg)
            
        
37. [**オブジェクト指向をどのように用いるか？ フロントエンドのドメインである 「操作」と「表示」に注目する 39**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_38.jpg)
            
        
38. [**オブジェクト指向をどのように用いるか？ フロントエンドのドメインである 「操作」と「表示」に注目する 40 ↓ 「操作」と「表示」に関わる要素を オブジェクトとして抽出する**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_39.jpg)
            
        
39. [**サンプル 41**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_40.jpg)
            
        
40. [**複雑な「操作ルール」を考える 42**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_41.jpg)
            
        
41. [**複雑な「操作ルール」を考える 43 Loading中は クリックしても反応しない**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_42.jpg)
            
        
42. [**複雑な「操作ルール」を考える 44**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_43.jpg)
            
        
43. [**複雑な「操作ルール」を考える 45 Loading後は クリックするとポップアップ**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_44.jpg)
            
        
44. [**複雑な「操作ルール」を考える 46 Loading後は クリックすると再読み込み**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_45.jpg)
            
        
45. [**複雑な「操作ルール」を考える 47**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_46.jpg)
            
        
46. [**複雑な「操作ルール」を考える 48**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_47.jpg)
            
        
47. [**複雑な「操作ルール」を考える 49**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_48.jpg)
            
        
48. [**複雑な「操作ルール」を考える 50**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_49.jpg)
            
        
49. [**複雑な「操作ルール」を考える 51 Stateパターン**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_50.jpg)
            
        
50. [**複雑な「操作ルール」を考える 52 Strategyパターン**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_51.jpg)
            
        
51. [**複雑な「操作ルール」を考える 53 （有る種の）MVC**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_52.jpg)
            
        
        
        
52. [**要するに 「ちゃんと設計しよう」 「ちゃんとオブジェクト考えよう」 って言ってるだけじゃない？ 55**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_54.jpg)
            
        
53. [**YES 56**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_55.jpg)
            
        
54. [**YES 57 その「ちゃんと」が大変で難しいけれど ……**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_56.jpg)
            
        
55. [**再掲）フロントエンド「設計」への問題提起 58 画面の「設計」ばかりが語られていないか？ • 画面の「設計」は重要だが、それだけで完結 はしない（はず） • 画面の奥にあるソフトウェアをいかに組み立 てるかの議論が不足していないか？**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_57.jpg)
            
        
56. [**注意点 • 関心の中心が「表示」と「操作」であること • サーバーサイドだと「UI層の話」として、あまり気に しない部分が中心 • サーバーサイドの感覚のままで考えると、オブジェ クトや関連を見落としやすいと思う 59**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_58.jpg)
            
        
57. [**60 横道）フロントエンドと「ロジック」 • ここで言う「ロジック」とは何か？ • 「ロジック」＝ビジネスルール・業務ルールとは限らない ◦ 「ロジック」といえばビジネスルール・業務ルールというのは、主にバックエンドというコンテクスト における表現 ◦**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_59.jpg)
            この意味での「ロジック」ならば、フロントエンドには無い（むしろ、有ってはいけない） • フロントエンドにおける「ロジック」は、表示と操作のルール ◦ そもそもフロントエンドとバックエンドでコンテクストが異なるのだから、「ロジック」が同じ意味で あるという保証は無い ◦ むしろ、それぞれ関心事が違うのだから、扱う「ロジック」は異なって当然
        
58. [**4. フロントエンドアーキテクチャ考察 61**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_60.jpg)
            
        
59. [**フロントエンドアーキテクチャの候補 62 • フロントエンドソフトウェアの設計 ◦ オブジェクト指向が有力そう • フロントエンドソフトウェアのアーキテクチャ ◦ ？？？**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_61.jpg)
            
        
60. [**Fluxアーキテクチャ 63 https://www.infoq.com/jp/news/2014/05/facebook-mvc-ﬂux/**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_62.jpg)
            
        
61. [**Fluxアーキテクチャ 64 https://www.infoq.com/jp/news/2014/05/facebook-mvc-ﬂux/**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_63.jpg)
            
        
62. [**Fluxアーキテクチャへの見解 • Fluxは強力だが、Fluxだけでアーキテクチャを完結させるのは厳しい • 単方向データフローは有用だが、データフローを動作させるモジュールの 構造については何も提供しない ◦ 巨大な泥団子、単なる巨大グローバル変数になりがち • 何か他のアーキテクチャ論と組み合わせて使うことになると思う**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_64.jpg)
            • フロントエンドにおけるCQRS(+ES)という見方は有力かも ◦ cf. Almin.js | JavaScriptアーキテクチャ ◦ CQRS(+ES)の知見が薄いので、今回は深堀りしない 65
        
63. [**Fluxアーキテクチャへの見解 • Fluxは強力だが、Fluxだけでアーキテクチャを完結させるのは厳しい • 単方向データフローは有用だが、データフローを動作させるモジュールの 構造については何も提供しない ◦ 巨大な泥団子、単なる巨大グローバル変数になりがち • 何か他のアーキテクチャ論と組み合わせて使うことになると思う**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_65.jpg)
            • フロントエンドにおけるCQRS(+ES)という見方は有力かも ◦ cf. Almin.js | JavaScriptアーキテクチャ ◦ CQRS(+ES)の知見が薄いので、今回は深堀りしない 66
        
64. [**他のアーキテクチャ 67**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_66.jpg)
            
        
65. [**68 Clean Architecture (Kindle位置No.3141)**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_67.jpg)
            
        
66. [**フロントエンドで クリーンアーキテクチャ（CA)？ 69**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_68.jpg)
            
        
67. [**70 Clean Architecture (Kindle位置No.3141)**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_69.jpg)
            
        
68. [**こんな薄い層できるの？ 外周でやって意味有るの？ 71**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_70.jpg)
            
        
        
        
        
69. [**74 フロントにおけるCAの意義 重要なのは同心円ではなく 依存性のルール**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_73.jpg)
            
        
70. [**75 フロントにおけるCAの意義 重要なのは同心円ではなく 依存性のルール ↓ この「4重の同心円」という 形を守る必要は無い**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_74.jpg)
            
        
71. [**それならば 76**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_75.jpg)
            
        
72. [**77 UI層 View Controller Model State Action UI層の中で、さらに依存 関係の階層を作る**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_76.jpg)
            
        
73. [**78 UI層 View Controller Model State Action UI層の同心円内で依存 性のルールを守り**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_77.jpg)
            
        
74. [**79 UI層 View Controller Model State Action UI層とその内部の層で も依存性のルールを守 る**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_78.jpg)
            
        
75. [**80 Clean Architecture (Kindle位置No.3141) この同心円の図も、システムの ほんの一面的な表現でしかない**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_79.jpg)
            
        
76. [**Clean Architecture (Kindle位置No.3141) 81**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_80.jpg)
            
        
        
        
77. [**Clean Architecture (Kindle位置No.3141) 83 DBの内部にはDBから見た デバイスの内部にはデバイスから見た UIの内部にはUIから見た 内側（コア）と外側（周辺）が それぞれ有ると考えたほうが自然**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_82.jpg)
            
        
78. [**84**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_83.jpg)
            
        
79. [**85 同心円は入れ子状の構造になる**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_84.jpg)
            
        
80. [**86**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_85.jpg)
            
        
81. [**87**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_86.jpg)
            
        
82. [**88 参考）iOSアプリのクリーンアーキテクチャ @takasekさんによる発表資料 • クリーンアーキテクチャの同心円を、山に例 えて説明。最終的に山は 連峰へ • WebフロントエンドとiOSアプリの違いは有る が、主張の内容としては近い？**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_87.jpg)
            • 「単純化された創界山に引きずられず、思考 停止せずに丁寧に設計していきましょう」 - p.41
        
83. [**89 UI層 View Controller Model State Action**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_88.jpg)
            
        
84. [**サンプルで考える 90**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_89.jpg)
            
        
85. [**サンプルで考える 91 View**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_90.jpg)
            
        
86. [**サンプルで考える 92 View Controller/Applcaton**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_91.jpg)
            
        
87. [**サンプルで考える 93 View Controller/Applcaton Model**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_92.jpg)
            
        
88. [**94 サンプルで試した感触 • フロントエンドでも、クリーンアーキテクチャによる階層の整 理は有用そうだった ◦ 中心の関心事（状態・操作）と周辺の関心事（html/css、DIやバインディング）を分け て思考・実装できる ◦ サンプルはVue.jsで実装したが、React、あるいはjQueryにも（バインディングを頑張っ**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_93.jpg)
            て書けば）移植できそう！？→フレームワーク非依存 • 「中心の関心事と周辺の関心事を分けて思考・実装できる」 ことが大きい
        
89. [**まとめ 95**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_94.jpg)
            
        
90. [**フロントエンドのドメイン 96 • フロントエンドのドメインは「操作」と「状態」 • ユーザーが「した」と思ったことを現実にするた めに、この2つをいかに管理するか**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_95.jpg)
            
        
        
        
        
91. [**最後に 99**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_98.jpg)
            
        
92. [**「フロントエンド」を誇ろう • 「表示」と「操作」こそ重大な関心事 ◦ サーバーとフロントは、関心事が違うだけ ◦ それぞれの重要度は所与ではない（システムによる） • 胸を張って 「フロントエンド」に挑もう**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_99.jpg)
            ◦ 「JSON色付け係」のような卑下は要らない 100
        
93. [**• ドメインは避けられない ◦ ドメインを分析し理解することは、サーバーサイドだけの仕事ではな い ◦ ドメインの分析・理解は、フロントにおいても重要な仕事 • 「設計」も避けられない ◦**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_100.jpg)
            「表示するだけ」では最早済まない。画面の奥に潜むロジックを飼い 慣らす術を身に着けよう 「フロントエンド」に立ち向おう 101
        
94. [**参考資料(敬称略) 102 • エリック・エヴァンスのドメイン駆動設計 ◦ Eric Evans（著）今関 剛（監訳）和智 右桂、牧野祐子（訳） •**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_101.jpg)
            Clean Architecture　達人に学ぶソフトウェアの構造と設計 ◦ Robert C. Martin（著）角 征典、高木 正弘（訳） • 未来を作った人々 - ゼロックス・パロアルト研究所とコンピュータエイジの黎明 ◦ Michael Hiltzik（著）エ・ビスコム・テック・ラボ（監訳）鴨沢眞夫（訳） • オブジェクト指向のハードコア ◦ https://www.zerobase.jp/salon/2019/05/25/hardcore-oo.html ◦ (2) 哲学 ◦ (3) Smalltalk by @sumim ◦ (8) GUI by 上野学（@manabuueno） • クライアントアプリの「中心」とは何か ◦ by @takasek ◦ https://speakerdeck.com/takasek/20200121-the-center-of-the-client-number-ios-ca
        
95. [**参考資料(敬称略) 103 • 複雑なJavaScriptアプリケーションに立ち向かうためのアーキテクチャ ◦ by しんぺい（@shinpei0213） ◦ https://speakerdeck.com/shinpeim/fu-za-najavascriptapurikesiyonnili-tixiang-kautamefalseakit ekutiya**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_102.jpg)
            ◦ http://techblog.reraku.co.jp/entry/2017/08/08/184313 • Almin.js | JavaScriptアーキテクチャ ◦ by azu（@azu_re） ◦ https://azu.github.io/slide/2016/child_process_sushi/almin-javascript-architecture.html • CQRS+ES(再)入門 ◦ by かとじゅん（@j5ik2o） ◦ https://speakerdeck.com/j5ik2o/cqrs-plus-es-zai-ru-men • Facebook の決断：MVCはスケールしない。ならば Flux だ。 ◦ https://www.infoq.com/jp/news/2014/05/facebook-mvc-ﬂux/ • Vue.js + デザインパターンによるコンポーネント実装 ◦ by @philomagi ◦ https://speakerdeck.com/tooppoo/vue-dot-js-dezainpatan-niyorukonponentoshi-zhuang-v2 ◦ https://github.com/tooppoo/sample-for-vue-with-design-patterns
        
96. [**ご清聴ありがとうございました 104**](https://files.speakerdeck.com/presentations/2774691f5bbb4bc08ab6b020d093282e/slide_103.jpg)