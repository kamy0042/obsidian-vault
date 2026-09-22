---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
![](https://d1eu30co0ohy4w.cloudfront.net/assets/mark-white-8d908558fe78e8efc8118c6fe9b9b1a9846b182c503bdc6902f97df4ddc9f3af.svg)

### 大規模改修の裏でTypeScriptとテスト導入をすすめた話

[Amon Keishima](https://speakerdeck.com/pittan)

![](https://secure.gravatar.com/avatar/4c060f902c6d1baa80466a5931eda477?s=47)

June 05, 2020

[Programming
](https://speakerdeck.com/c/programming)

[11](https://speakerdeck.com/signin?return_to=%2Fpittan%2Fda-gui-mo-gai-xiu-falseli-detypescripttotesutodao-ru-wosusumetahua)

6.1k

![](https://secure.gravatar.com/avatar/4c060f902c6d1baa80466a5931eda477?s=128)

### [Amon Keishima](https://speakerdeck.com/pittan)

June 05, 2020

**Transcript**
1. [**⼤規模改修の裏で TypeScriptとテスト導⼊をすすめた話 LINE Growth Technology株式会社 UITチーム けいしま あもん**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_0.jpg)
            
        
        
        
2. [**今⽇お話すること 担当しているLINEポイントクラブで メインタスクの合間をぬってTypeScriptやテストの導⼊をしている話 現状 作戦 やったこと 知⾒やハマり の順でお話していく**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_2.jpg)
            
        
        
        
3. [**現状**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_4.jpg)
            
        
4. [**プロジェクトが抱えていた問題点 2013年にスタートしたサービスであるため… テストコードが書かれていない  ・Karmaが導⼊だけされているものの、テストコードがない  ・しかし、リリースの度にQAを⾏うので品質は担保できていた いろんな環境が古い  ・Webpackのバージョンが古い  ・Babelのバージョンが古い サブプロジェクトとメインプロジェクトのビルド環境が違う  ・Browserifyでビルドしている（gruntも使ってた）**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_5.jpg)
             ・module.exports / requireを使っており import / export ではない QA: Quality Assuranceのこと
        
5. [**⻑期的にその問題点を考える 今まで⻑くやってきたプロジェクトなので仕⽅ない⾯もありますが 今後も⻑く続いていくだろうことを考えると… 新しく⼊ってくるメンバーが古い技術を勉強することよりも モダンな技術の知識で 即戦⼒になれるような環境 を整備するべきと考えた**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_6.jpg)
            
        
6. [**問題点を解決するために… ・TypeScriptを導⼊すること ・テストを本格的に導⼊すること の2点はマストだと考えた**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_7.jpg)
            
        
7. [**TypeScriptへのモチベーション コードに型がつくことで潜在的なミスを減らすことができる ・ビルドをする段階でミスに気づけるので、サービスの品質向上につながる ・コードレビューの負荷を軽減（しょうもないミスは事前に解決できそう）**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_8.jpg)
            
        
8. [**テスト導⼊へのモチベーション 今後やりたいコードのリファクタリングを安⼼して⾏いたい ⼩さいバグを減らすことができれば、QAのコストも下がるかも**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_9.jpg)
            
        
9. [**作戦**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_10.jpg)
            
        
10. [**短期・中⻑期的な話 古いプロジェクトで機能追加案件も並⾏する場合 TSを導⼊して、テストを導⼊するのは時間がかかってしまうもの その中で早期に環境を整え、運⽤に組み込み基盤を作るのがプロジェクトでの最⼤の課題 そのために必要なのは、中⻑期を⾒据えた上での作戦（計画）を⽴てることだと思う 短期でTS運⽤基盤を構築することと、 中⻑期でのプロジェクトに適応させていくことが⼤きな鍵といえる 今回はまず、短期でのTS運⽤基盤の構築に注⼒した**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_11.jpg)
            
        
11. [**作戦 TypeScriptの環境を導⼊ / Vue.js の TypeScript対応 Jestの導⼊ / Babelのアップデート /**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_12.jpg)
            Webpackのアップデート 脱Browserify / 脱grunt など… やりたいこと（やらないといけないこと）はたくさんあるが、 ⼀気にいろいろ変えてしまうとコードの差分が⼤きくなってしまう 動作を確認するにも時間かかるし レビュワーの負担も⼤きくなってしまう 今回の作戦は なるべく⼩さく⼊れること とした
        
        
        
12. [**やったこと**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_14.jpg)
            
        
        
        
13. [**まずはTypeScriptをコンパイルできるように 1. TypeScriptのビルド環境を整えつつ、1つだけ⼩さめのファイルをTS化した  ・ビルド⽣成物を⾒て、そのファイル以外の差分がないことを確認した 2. tsconﬁg の allowJS オプションを有効にした  ・TS→JSの参照の場合、jsDocがちゃんと書かれていれば**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_16.jpg)
            型チェックをしてくれる /** * @param {Number} id */ export function getArticle(id) { // 略 } import { getArticle } from 'foo' export function doSomething(id: string) { const article = getArticle(id) } foo.js bar.ts
        
14. [**まずはTypeScriptをコンパイルできるように 3. tsconﬁg の target を es2019 にした  → ts-loader→babel-loaderを通すときに、tsでトランスパイルをしてほしくなかった**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_17.jpg)
             → spread-arrays や rest-spread は、今まで通りbabelでpolyﬁllを⼊れてほしい       → tsのトランスパイルで差し込まれるpolyﬁllで挙動が変わるかもしれない      みたいな⼼配をしたくなかった // spread-arrays const nums = [ 1, 2 ]; const newNums = [ 0, ...nums ]; console.log(newNums); // [ 0, 1, 2 ]; // rest-spread let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }; console.log(z); // { a: 3, b: 4 }
        
15. [**VueのSFCファイルをTS対応にする ・Vueの型定義を追加 ・まずはVue.extendを使う形に書き換えてみた（1ファイルだけ)  → 差分が出るので、ここは⾃分で動作確認。問題ないことを確認 declare module '*.vue' { import**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_18.jpg)
            Vue from 'vue'; export default Vue; } export default Vue.extend({ props: { propA: { type: Number } } }) export default { props: { propA: { type: Number } } }
        
16. [**VueのSFCファイルをTS対応にする import { Vue, Component, Prop } from 'vue-property-decorator' @Component**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_19.jpg)
            export default class FooComponent extends Vue { @Prop(Number) readonly propA: number | undefined } export default { props: { propA: { type: Number } } } "vue-class-decorator" や "vue-class-component" があるが、導⼊を⾒送った ・書き換え量が多いこと ・Vue3のRFCではrejectされていること  → これは特に⻑く続いているプロジェクトとして気にした    また⼤規模に書き換える必要がありそうなら、ここでやることはないと判断 Example: vue-class-component
        
17. [**ビルド時間の短縮 TypeScriptを導⼊してから、ビルドに倍以上の時間がかかるように "fork-ts-checker-webpack-plugin" を導⼊して、型チェックのプロセスを分離した Before / 117s After / 41s**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_20.jpg)
            ts-loader fork-ts... ts-loader ts js ts js type-check & transpile type-check transpile
        
18. [**ビルド環境のシンプル化 ts-loaderでJavaScript / TypeScript 両⽅ビルドするようにした  → 数秒ビルド時間が伸びる程度・環境のシンプルさを優先 module.exports = {**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_21.jpg)
            module: { rules: [ { test: /\.js$/, use: babelLoader, }, { test: /\.ts$/, loader: [ babelLoader, tsLoader ], } ] } } module.exports = { module: { rules: [ { test: /\.(js|ts)x?$/, loader: [ babelLoader, tsLoader ], } ] } } Before / 41s After / 45s
        
19. [**テストの導⼊ QAをしてもらえるとはいえ、しょうもないエラーを出すのは申し訳ない ⼀定のクオリティーを担保するためにテストを導⼊した ・KarmaからJestに移⾏した  ・windowオブジェクトを使うテストが書きやすい   → location.href を変更するようなコードとか  ・jest.resetModules() が便利だった**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_22.jpg)
              → コード中の変数でキャッシュしているコードなど ・新しく書くコード（特にユーテリティ系とか）を中⼼にテストを追加した
        
20. [**知⾒やハマり**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_23.jpg)
            
        
        
        
21. [**TODO<T>: any で "攻めながらanyを使う" js → ts に拡張⼦を変えただけでビルドが通らなくなるケースはあるはず そんなときにTODO型を使うと ・とりあえずビルドを通すことができる**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_25.jpg)
            ・やるべき型をメモしておけるので、anyより便利 // 内部的にはany でエラーを回避しつつ、本来当てたい型をメモしておける const foo: TODO<Article> = getArticles();   const foo = getArticles(); // なんかエラー出るんだけど！！！ ↓
        
22. [**Vueの型解決エラーはComputedの返り値を書け ・VueのSFCをTS化する最中に、どうしても  this.hogehoge の型が解決できないときがある ・こういうときはcomputedの返り値を明⽰的に書くことでほとんど解決した computed: { getOpacity(): number {**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_26.jpg)
            return this.isActive ? 1 : 0; } } 注釈: 循環参照の都合上こうなってしまうようです。詳しくは公式ドキュメント参照 → https://jp.vuejs.org/v2/guide/typescript.html#戻り値の型にアノテーションをつける
        
23. [**まとめ**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_27.jpg)
            
        
24. [**まとめ ・TypeScriptは段階的に導⼊することができる ・いきなり全部TSに書き換える必要はない ・可能なら⼀緒にユニットテストも書くとより安⼼かも ・プロジェクトに⼊ったばかりだからこそ、⾔える/思うようなこともある  ・⾃分が困ったことは、今後新しくプロジェクトに⼊るメンバーも困るはず  ・昔の技術を勉強するより、持っている最新の技術スタックで    即戦⼒になれるほうが双⽅ハッピーなはず**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_28.jpg)
            
        
25. [**お知らせ LINEやLINE Growth Technologyで働くことに興味のある⽅向けに 社員と直接情報交換ができるカジュアル⾯談を実施しています 興味のある⽅は、「LINE Developer meetup」で検索をお願いします！**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_29.jpg)
            
        
26. [**ありがとうございました！**](https://files.speakerdeck.com/presentations/772c9ba57b794ebabe45edd524f609f3/slide_30.jpg)