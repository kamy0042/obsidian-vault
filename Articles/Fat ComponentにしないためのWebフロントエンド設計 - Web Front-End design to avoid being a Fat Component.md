---
Created: 2021-01-15T20:19:00
URL: https://speakerdeck.com/tooppoo/web-front-end-design-to-avoid-being-a-fat-component
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![](https://d1eu30co0ohy4w.cloudfront.net/assets/mark-white-8d908558fe78e8efc8118c6fe9b9b1a9846b182c503bdc6902f97df4ddc9f3af.svg)

### Fat ComponentにしないためのWebフロントエンド設計 / Web Front-End design to avoid being a Fat Component

[philomagi](https://speakerdeck.com/tooppoo)

![](https://secure.gravatar.com/avatar/b8403d102456248570005ee7fb2ba0f7?s=47)

July 31, 2020

[Programming
](https://speakerdeck.com/c/programming)

[4](https://speakerdeck.com/signin?return_to=%2Ftooppoo%2Fweb-front-end-design-to-avoid-being-a-fat-component)

550

参考資料
・オブジェクト指向UIデザイン──使いやすいソフトウェアの原理
 ソシオメディア株式会社 (著)、上野 学 (著、監修)、 藤井 幸多 (著)
・MVCとはなにか
　・tenjuu99
　・[https://speakerdeck.com/tenjuu99/what-mvc-is](https://speakerdeck.com/tenjuu99/what-mvc-is)　・[https://note.com/tenjuu99/n/n0232ccd1089d](https://note.com/tenjuu99/n/n0232ccd1089d)　・[https://note.com/tenjuu99/n/nbbb4b273676d](https://note.com/tenjuu99/n/nbbb4b273676d)・MVC
　・Trygve Reenskaug
　・[http://folk.uio.no/trygver/themes/mvc/mvc-index.html](http://folk.uio.no/trygver/themes/mvc/mvc-index.html)・未来を作った人々 - ゼロックス・パロアルト研究所とコンピュータエイジの黎明
　・Michael Hiltzik（著）エ・ビスコム・テック・ラボ（監訳）鴨沢眞夫（訳）

関連する過去発表
・WEBフロントエンドにおけるソフトウェア設計の考察
　・[https://speakerdeck.com/tooppoo/consideration-of-software-design-in-web-front-end](https://speakerdeck.com/tooppoo/consideration-of-software-design-in-web-front-end)・Vue.js + デザインパターンによるコンポーネント実装
　・[https://speakerdeck.com/tooppoo/vue-dot-js-dezainpatan-niyorukonponentoshi-zhuang-v2](https://speakerdeck.com/tooppoo/vue-dot-js-dezainpatan-niyorukonponentoshi-zhuang-v2)・複雑なv-ifに負けないために
　・[https://speakerdeck.com/tooppoo/fu-za-nav-ifnifu-kenaitameni](https://speakerdeck.com/tooppoo/fu-za-nav-ifnifu-kenaitameni)

![](https://secure.gravatar.com/avatar/b8403d102456248570005ee7fb2ba0f7?s=128)

### [philomagi](https://speakerdeck.com/tooppoo)

July 31, 2020

[Limited time offer: Get 10 free Adobe Stock images.](https://srv.carbonads.net/ads/click/x/GTND42Q7FTBDKKQMFT7LYKQMF6ADT23WCWBILZ3JCWAIEK3WF6ADL2QKCEBDTKQWCE7I62Q7CTYDV23YFTADLK3KC6BIL53WCVADEK3EHJNCLSIZ?segment=placement%3Aspeakerdeckcom%3B)[ads via Carbon](http://carbonads.net/?utm_source=speakerdeckcom&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=carbon)

![](https://cdn4.buysellads.net/uu/1/41369/1551198561-Adobe_Stock_260x200.jpg)

**Transcript**
1. [**Fat Componentにしないための Webフロントエンド設計 1 @Philomagi 2020/07/31@Remove.vue #2 \#remote_vue**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_0.jpg)
            
        
2. [**発表者 @Philomagi • WEB系プログラマ • 自称フロントエンド寄り ◦ 最近のマイブームは SelfとSmalltalk ◦**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_1.jpg)
            vanila jsも久しぶりにちょっと触りたい • 設計の話とかが好きです ◦ DDDとかクリーンアーキテクチャとか ◦ 最近のSOLID原則の推しはI 2
        
3. [**今回のテーマ 3**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_2.jpg)
            
        
4. [**Fat Componentにしないための Webフロントエンド設計 4**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_3.jpg)
            
        
5. [**注 以降、特に断りが無い場合は 「フロントエンド = Webフロントエンド」 の意味で使います 5**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_4.jpg)
            
        
6. [**注 理由 • 題材のベースがVue.jsである • 発表者自身、Webフロントエンド以外のフロントエ ンド（デスクトップクライアント、iOS、Android）に 詳しくない 6**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_5.jpg)
            
        
7. [**Fat Component 7**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_6.jpg)
            
        
8. [**8 ほんとうにあったVueコンポーネント**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_7.jpg)
            
        
9. [**9**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_8.jpg)
            
        
10. [**10 ←全体のおよそ1/5**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_9.jpg)
            
        
11. [**11 <style> 約20行**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_10.jpg)
            
        
12. [**12 <style> 約20行 <template> 約200行**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_11.jpg)
            
        
13. [**13 <style> 約20行 <template> 約200行 <script> 約2200行**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_12.jpg)
            
        
14. [**14 全体で**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_13.jpg)
            
        
15. [**15 全体で 約2500行**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_14.jpg)
            
        
16. [**どうすれば防げたか or どうすれば改善できるか 16**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_15.jpg)
            
        
17. [**主張 17 • 何でもかんでもコンポーネントに書かない • 表示・操作を実現するためのルール・制約・知識は、コンポーネントから は独立したものとして別途定義する • 全ての実装の詳細を、コンポーネントに直接記述する必然性は無い •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_16.jpg)
            コンポーネントには具体的な表示様式と、バインディング・ハンドリングの みを記述する
        
18. [**主張 18 • 何でもかんでもコンポーネントに書かない • 表示・操作を実現するためのルール・制約・知識は、コンポーネントから は独立したものとして別途定義する • 全ての実装の詳細を、コンポーネントに直接記述する必然性は無い •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_17.jpg)
            コンポーネントには具体的な表示様式と、バインディング・ハンドリングの みを記述する
        
19. [**主張 19 • 何でもかんでもコンポーネントに書かない • 表示・操作を実現するための知識・情報・振る舞いは、コンポーネントか らは独立したものとして別途定義する • 全ての実装の詳細を、コンポーネントに直接記述する必然性は無い •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_18.jpg)
            コンポーネントには具体的な表示様式と、バインディング・ハンドリングの みを記述する
        
20. [**主張 20 • 何でもかんでもコンポーネントに書かない • 表示・操作を実現するための知識・情報・振る舞いは、コンポーネントか らは独立したものとして別途定義する • 全ての実装の詳細を、コンポーネントに直接記述する必然性は無い •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_19.jpg)
            コンポーネントには具体的な表示様式と、バインディング・ハンドリングの みを記述する
        
21. [**主張 21 • 何でもかんでもコンポーネントに書かない • 表示・操作を実現するための知識・情報・振る舞いは、コンポーネントか らは独立したものとして別途定義する • 全ての実装の詳細を、コンポーネントに直接記述する必然性は無い •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_20.jpg)
            コンポーネントには具体的な表示様式と、バインディング・ハンドリングの みを記述する
        
22. [**コンポーネントを もっと細かく分割する？ 22**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_21.jpg)
            
        
23. [**コンポーネント分割の効果と限界 • <template>や<style>の肥大化に対しては効果的 ◦ 複雑なHTMLやCSS定義を分割することで、肥大化を抑制 /改善できる ◦ スコープが限定されることで、実装自体も単純化しやすい • <script>の肥大化に対しては限界がある**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_22.jpg)
            ◦ HTML・CSSが別コンポーネントに分離されても、処理自体は親コンポーネントに残ることが多い ▪ v-if による表示分けのための計算など ◦ <script>の内容もコンポーネント毎に分離すると、「デザインだけ切り替え」が困難 ▪ 振る舞いが子コンポーネントに依存するため ▪ 「デザインは変わるが振る舞いは変わらない」が困難になる 23
        
24. [**コンポーネント分割の効果と限界 • <template>や<style>の肥大化に対しては効果的 ◦ 複雑なHTMLやCSS定義を分割することで、肥大化を抑制 /改善できる ◦ スコープが限定されることで、実装自体も単純化しやすい • <script>の肥大化に対しては限界がある**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_23.jpg)
            ◦ HTML・CSSが別コンポーネントに分離されても、処理自体は親コンポーネントに残ることが多い ▪ v-if による表示分けのための計算など ◦ <script>の内容もコンポーネント毎に分離すると、「デザインだけ切り替え」が困難 ▪ 振る舞いが子コンポーネントに依存するため ▪ 「デザインは変わるが振る舞いは変わらない」が困難になる 24
        
25. [**コンポーネント分割の効果と限界 • <template>や<style>の肥大化に対しては効果的 ◦ 複雑なHTMLやCSS定義を分割することで、肥大化を抑制 /改善できる ◦ スコープが限定されることで、実装自体も単純化しやすい • <script>の肥大化に対しては限界がある**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_24.jpg)
            ◦ HTML・CSSが別コンポーネントに分離されても、処理自体は親コンポーネントに残ることが多い ▪ v-if による表示分けのための計算など ◦ <script>の内容もコンポーネント毎に分離すると、「デザインだけ切り替え」が困難 ▪ 振る舞いが子コンポーネントに依存するため ▪ 「デザインは変わるが振る舞いは変わらない」が困難になる 25
        
26. [**コンポーネント分割の効果と限界 • <template>や<style>の肥大化に対しては効果的 ◦ 複雑なHTMLやCSS定義を分割することで、肥大化を抑制 /改善できる ◦ スコープが限定されることで、実装自体も単純化しやすい • <script>の肥大化に対しては限界がある**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_25.jpg)
            ◦ HTML・CSSが別コンポーネントに分離されても、処理自体は親コンポーネントに残ることが多い ▪ v-if による表示分けのための計算など ◦ <script>の内容もコンポーネント毎に分離すると、「デザインだけ切り替え」が困難 ▪ 振る舞いが子コンポーネントに依存するため ▪ 「デザインは変わるが振る舞いは変わらない」が困難になる 肥大化の全ての要因をコンポーネント分割のみで解決するのは困難 26
        
27. [**実装例 27**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_26.jpg)
            
        
28. [**28 実装サンプル https://github.com/tooppoo/sample-for-vue-with-design-patterns**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_27.jpg)
            
        
29. [**29 実装サンプル**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_28.jpg)
            
        
30. [**実装サンプル カート内には 複数の商品が存在する 30**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_29.jpg)
            
        
31. [**実装サンプル 31 ・買う個数を変更 ・カートから削除 ・削除せず後で買う といった操作が可能**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_30.jpg)
            
        
32. [**実装サンプル 32 カート内の ・購入する商品数 ・購入時の合計金額 を表示 ただし、後で買う商品は除外**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_31.jpg)
            
        
33. [**まずどこに注目するか 33**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_32.jpg)
            
        
34. [**まずどこに注目するか 34 • UIパーツ・レイアウト・外観ではなく、ユーザーに提供する知識・情報・振る舞い （≠データ）に注目する ◦ 「何がどのように見えるか」より先に、 見せるべき知識・情報は何か、それらはどのよう な構造・関連を取るか、に注目する**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_33.jpg)
            
        
35. [**まずどこに注目するか 35 • UIパーツ・レイアウト・外観ではなく、ユーザーに提供する知識・情報・振る舞い （≠データ）に注目する ◦ 「何がどのように見えるか」より先に、 見せるべき知識・情報は何か、それらはどのよう な構造・関連を取るか、に注目する •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_34.jpg)
            ユーザーは「カート内商品」の集まりである「カート内商品の一覧」に対して、特 定のカート内商品を「後で買う」「削除する」という操作を行うことができる
        
36. [**まずどこに注目するか 36 • UIパーツ・レイアウト・外観ではなく、ユーザーに提供する知識・情報・振る舞い （≠データ）に注目する ◦ 「何がどのように見えるか」より先に、 見せるべき知識・情報は何か、それらはどのよう な構造・関連を取るか、に注目する •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_35.jpg)
            ユーザーは「カート内商品」の集まりである「カート内商品の一覧」に対して、特 定のカート内商品を「後で買う」「削除する」という操作を行うことができる • ユーザーは「カート内商品の一覧」に基づいて、合計数や合計金額を知ることが できる
        
37. [**商品カートの構造 37**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_36.jpg)
            
        
38. [**商品カートの構造 ユーザーへ情報・振る舞いを 提示するためのUIパーツ構造 38**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_37.jpg)
            
        
39. [**商品カートの構造 UIを通じてユーザーが得る 情報・振る舞い 39**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_38.jpg)
            
        
40. [**商品カートの構造 40**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_39.jpg)
            
        
41. [**商品カートの構造 41**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_40.jpg)
            
        
42. [**商品カートの構造 UIとユーザーの間で発生する やり取り・相互作用 42**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_41.jpg)
            
        
43. [**実際のコード 43**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_42.jpg)
            
        
44. [**主張（再掲） 44 • 何でもかんでもコンポーネントに書かない • 表示・操作を実現するための知識・情報・振る舞いは、コンポーネントか らは独立したものとして別途定義する • 全ての実装の詳細を、コンポーネントに直接記述する必然性は無い •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_43.jpg)
            コンポーネントには具体的な表示様式と、バインディング・ハンドリングの みを記述する
        
45. [**45 Vueコンポーネント**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_44.jpg)
            
        
46. [**46 Vueコンポーネント**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_45.jpg)
            
        
47. [**47 Vueコンポーネント**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_46.jpg)
            
        
48. [**48 Vueコンポーネント**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_47.jpg)
            
        
49. [**49 Vueコンポーネント コンポーネントの<script>に書く内容は ・htmlとオブジェクトプロパティ ・イベントとオブジェクト操作 のマッピングでほとんど終わる**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_48.jpg)
            
        
50. [**50 Vueコンポーネント 複雑な処理や計算は コンポーネントから切り出した 個々のオブジェクトに任せる**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_49.jpg)
            
        
51. [**51 Vueコンポーネント Vueコンポーネントは 如何に知識を構成・表示・表現するか に注力する**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_50.jpg)
            
        
52. [**52 Vueコンポーネント UIは詳細な処理・計算よりも ユーザーに何を伝え、何を示すか に注力する**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_51.jpg)
            
        
53. [**コンポーネント以外のコード 53**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_52.jpg)
            
        
54. [**コンポーネント以外のコード 54 要するに 普通のjavascriptのコード**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_53.jpg)
            
        
55. [**コンポーネント以外のコード 55 普通のjavascriptのコードなので テストに必要な準備も最低限**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_54.jpg)
            
        
56. [**コンポーネント以外のコード 56 普通のjavascriptのコードなので オブジェクト指向でも関数型でも 既存の方法論を活用可能**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_55.jpg)
            
        
57. [**考え方 57**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_56.jpg)
            
        
58. [**ユーザーの関心事に注目する 58 • ユーザーがアプリケーションを通じて実現しようとしている、関心を持っている事柄 （＝知識・振る舞い）に注目する ◦ 「知識 ≠ データ」「振る舞い ≠**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_57.jpg)
            CRUD操作」 ◦ ユーザーが「しよう」と思ったことを、その通りに「した」と思えるようにする ▪ FYI 「未来を作った人々」 • 注目すべき事柄をオブジェクトとして定義し、可視化する ◦ ここの「オブジェクト」は、計算処理の対象に限定されない。個々の UIパーツやユーザー-UI間の 相互作用（= interaction）も、「オブジェクト（目当て、対象）」に含まれる • 個々のオブジェクトの責務、オブジェクト間の関連を踏まえつつ、全体像を整理してい く
        
59. [**ユーザーの関心事に注目する 59 • ユーザーがアプリケーションを通じて実現しようとしている、関心を持っている事柄 （＝知識・振る舞い）に注目する ◦ 「知識 ≠ データ」「振る舞い ≠**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_58.jpg)
            CRUD操作」 ◦ ユーザーが「しよう」と思ったことを、その通りに「した」と思えるようにする ▪ FYI 「未来を作った人々」 • 注目すべき事柄をオブジェクトとして定義し、可視化する ◦ ここの「オブジェクト」は、計算処理の対象に限定されない。個々の UIパーツやユーザー-UI間の 相互作用（= interaction）も、「オブジェクト = 注目すべき事柄」に含まれる • 個々のオブジェクトの責務、オブジェクト間の関連を踏まえつつ、全体像を整理してい く
        
60. [**ユーザーの関心事に注目する 60 • ユーザーがアプリケーションを通じて実現しようとしている、関心を持っている事柄 （＝知識・振る舞い）に注目する ◦ 「知識 ≠ データ」「振る舞い ≠**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_59.jpg)
            CRUD操作」 ◦ ユーザーが「しよう」と思ったことを、その通りに「した」と思えるようにする ▪ FYI 「未来を作った人々」 • 注目すべき事柄をオブジェクトとして定義し、可視化する ◦ 「オブジェクト」は、計算処理の対象に限定されない。個々の UIパーツやユーザー-UI間の相互 作用（= interaction）も、「オブジェクト = 注目すべき事柄」に含まれる • 個々のオブジェクトの責務、オブジェクト間の関連を踏まえつつ、全体像を整理してい く
        
61. [**ユーザーの関心事に注目する 61 • ユーザーがアプリケーションを通じて実現しようとしている、関心を持っている事柄 （＝知識・振る舞い）に注目する ◦ 「知識 ≠ データ」「振る舞い ≠**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_60.jpg)
            CRUD操作」 ◦ ユーザーが「しよう」と思ったことを、その通りに「した」と思えるようにする ▪ FYI 「未来を作った人々」 • 注目すべき事柄をオブジェクトとして定義し、可視化する ◦ ここの「オブジェクト」は、計算処理の対象に限定されない。個々の UIパーツやユーザー-UI間の 相互作用（= interaction）も、「オブジェクト = 注目すべき事柄」に含まれる • 個々のオブジェクトの責務、オブジェクト間の関連を踏まえつつ、全体像を整理してい く
        
62. [**FW・ライブラリとどう付き合うか 62 • 「FW・ライブラリを使いこなす」＝「細かな機能をアプリケーション全体で全面的に利 用する」か？ • FW・ライブラリは、自分たちが直面している課題を解決するための道具の一つでは あっても、特効薬そのものにはなり得ない • どこまでをFW・ライブラリに頼っても良く、どこからは自分達で守らなくてはならないの**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_61.jpg)
            かを考える • 何のために(Vue|FW|ライブラリ)を使うのか？ ◦ この発表では、知識・振る舞いと画面のバインディングを簡易かつ狭い範囲で 行うため、と位置付けている ◦ バインディングでは積極的にVueに頼るが、それ以外は自分たちで組み立てる （実際、Vueは知識・振る舞いを構造化する方法は提供しない）
        
63. [**FW・ライブラリとどう付き合うか 63 • 「FW・ライブラリを使いこなす」＝「細かな機能をアプリケーション全体で全面的に利 用する」か？ • FW・ライブラリは、自分たちが直面している課題を解決する道具ではあっても、特効 薬にはなり得ない • どこまでをFW・ライブラリに頼っても良く、どこからは自分達で守らなくてはならないの**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_62.jpg)
            かを考える • 何のために(Vue|FW|ライブラリ)を使うのか？ ◦ この発表では、知識・振る舞いと画面のバインディングを簡易かつ狭い範囲で 行うため、と位置付けている ◦ バインディングでは積極的にVueに頼るが、それ以外は自分たちで組み立てる （実際、Vueは知識・振る舞いを構造化する方法は提供しない）
        
64. [**FW・ライブラリとどう付き合うか 64 • 「FW・ライブラリを使いこなす」＝「細かな機能をアプリケーション全体で全面的に利 用する」か？ • FW・ライブラリは、自分たちが直面している課題を解決する道具ではあっても、特効 薬にはなり得ない • どこまでをFW・ライブラリに頼っても良く、どこからは自分達で守らなくてはならないの**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_63.jpg)
            かを考える • 何のために(Vue|FW|ライブラリ)を使うのか？ ◦ この発表では、知識・振る舞いと画面のバインディングを簡易かつ狭い範囲で 行うため、と位置付けている ◦ バインディングでは積極的にVueに頼るが、それ以外は自分たちで組み立てる （実際、Vueは知識・振る舞いを構造化する方法は提供しない）
        
65. [**FW・ライブラリとどう付き合うか 65 • 「FW・ライブラリを使いこなす」＝「細かな機能をアプリケーション全体で全面的に利 用する」か？ • FW・ライブラリは、自分たちが直面している課題を解決する道具ではあっても、特効 薬にはなり得ない • どこまでをFW・ライブラリに頼っても良く、どこからは自分達で守らなくてはならないの**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_64.jpg)
            かを考える • 何のために(Vue|FW|ライブラリ)を使うのか？ ◦ この発表では、知識・振る舞いと画面のバインディングを簡易かつ狭い範囲で 行うため、と位置付けている ◦ バインディングでは積極的にVueに頼るが、それ以外は自分たちで組み立てる （実際、Vueは知識・振る舞いを構造化する方法は提供しない）
        
66. [**FW・ライブラリとどう付き合うか 66 • 「FW・ライブラリを使いこなす」＝「細かな機能をアプリケーション全体で全面的に利 用する」か？ • FW・ライブラリは、自分たちが直面している課題を解決する道具ではあっても、特効 薬にはなり得ない • どこまでをFW・ライブラリに頼っても良く、どこからは自分達で守らなくてはならないの**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_65.jpg)
            かを考える • 何のために(Vue|FW|ライブラリ)を使うのか？ ◦ この発表では、知識・振る舞いと画面のバインディングを簡易かつ狭い範囲で 行うため、と位置付けている ◦ バインディングでは積極的にVueに頼るが、それ以外は自分たちで組み立てる （実際、Vueは知識・振る舞いを構造化する方法は提供しない）
        
67. [**FW・ライブラリとどう付き合うか 67 • 「FW・ライブラリを使いこなす」＝「細かな機能をアプリケーション全体で全面的に利 用する」か？ • FW・ライブラリは、自分たちが直面している課題を解決する道具ではあっても、特効 薬にはなり得ない • どこまでをFW・ライブラリに頼っても良く、どこからは自分達で守らなくてはならないの**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_66.jpg)
            かを考える • 何のために(Vue|FW|ライブラリ)を使うのか？ ◦ 個人的には、Vue（のSFC）の html/css/js がそれぞれ自身の世界観を維持し ている形が好き ◦ Reactのような全てをjsの世界に引き込むのは、シンプルでプログラミングフレン ドリーなのだろうけれど、あまり好きではない
        
68. [**• 「サーバーの「データ」をプリントするだけなんだから、フロントでやること は何も無い」 ◦ 振る舞いはどこにいった？ • サーバーで提供・管理できる情報には限界が有る ◦ 画面側の一時的・揮発的な情報は、サーバーでは管理しようが無い ◦**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_67.jpg)
            画面内部の動的な状態遷移も、サーバーでは管理・定義のしようが無い ▪ ex. ユーザー操作に伴うUIパーツ表示のON/OFF • 知識ではなく、データに強く注目・依存する考え方？ 「JSON色付け係」 68
        
69. [**• Smart UI アンチパターンが戒めているのは何もかもが区別無く一箇所に混在し た状態で、「画面に何らかのロジックが存在すること」ではない ◦ 「何もかもが区別無く一箇所に混在」 → 全部入りのVueコンポーネント •**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_68.jpg)
            画面の状態や操作に関する「ロジック」を、画面以外の誰が管理するのか ◦ 動的な表示変更も、一切のユーザー操作も提供しない LPなら、「ロジック」は無いと 言って良いかもしれない ◦ しかし、LPを基準として語れるほど、現代のフロントエンドソフトウェアは単純ではいら れなくなっている • 「ロジック = ビジネスロジック」ではない ◦ ビジネスロジック ∈ ロジック Smart UI アンチパターン 69
        
70. [**70**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_69.jpg)
            
        
        
        
        
71. [**まとめ • 「Vueを使っているから」とVueコンポーネントに何でもかんでも詰め込む と、程なくFat Componentに到達する • どこまでをVueに頼り、どこからは自分たちの領域として守りたいのかを 考える • UIパーツだけでなく、その奥に潜む知識・情報・振る舞いにも注目し、構**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_72.jpg)
            造化し、洗練させていく • 知識・情報・振る舞いの精査を通じて、自分たちが実現しようとしている ものを深く理解し、ソフトウェアに反映していく 73
        
72. [**雑感 74 • 古典的なMVCへ回帰する可能性 ◦ 実装のための「MVCパターン」というよりは、ソフトウェアの役割を規 程するものとしてのMVC ◦ Trygve Reenskaug**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_73.jpg)
            • OOUIとの接続 ◦ この発表では、デザインよりプログラムに寄った視点から「オブジェ クト指向」+「UI」に注目している、とも言えるかも ◦ 行き着くところは似通いそう
        
73. [**参考資料 75 • オブジェクト指向UIデザイン──使いやすいソフトウェアの原理 ◦ ソシオメディア株式会社 (著)、上野 学 (著、監修)、 藤井**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_74.jpg)
            幸多 (著) • MVCとはなにか ◦ tenjuu99 ◦ https://speakerdeck.com/tenjuu99/what-mvc-is ◦ https://note.com/tenjuu99/n/n0232ccd1089d ◦ https://note.com/tenjuu99/n/nbbb4b273676d • MVC ◦ Trygve Reenskaug ◦ http://folk.uio.no/trygver/themes/mvc/mvc-index.html • 未来を作った人々 - ゼロックス・パロアルト研究所とコンピュータエイジの黎明 ◦ Michael Hiltzik（著）エ・ビスコム・テック・ラボ（監訳）鴨沢眞夫（訳）
        
74. [**ご清聴ありがとうございました 76**](https://files.speakerdeck.com/presentations/40bdfeca897c4ee59620565b189a9ecf/slide_75.jpg)