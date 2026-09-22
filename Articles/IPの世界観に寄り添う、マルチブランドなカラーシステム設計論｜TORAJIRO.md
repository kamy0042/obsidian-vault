---
タグ: []
作成日時: 2025-03-09T03:59:00
URL: https://note.com/jirosh1998/n/n22d7c7cadc70
Tags: [topic/デザインシステム/導入事例]
---
![](https://assets.st-note.com/production/uploads/images/138312976/rectangle_large_type_2_06929231842afa0ba635c16ac2f652f8.png?width=1200)

## はじめに

このnoteで紹介するカラーシステム設計プロセスは、多くの人にとってはやりすぎで、役に立たない場合も多いです。

**既存のカラーシステムやカラーシステムジェネレイターを利用するのが、最短かつ最適ルート**だと思います。

**デザインシステムやカラーシステムは「プロダクトのためのプロダクト」**なので、とある事業における一つの解である、という前提で読んでください。

今もまだ多くの課題を抱えたものではありますが、イベントなど様々な場面でカラーパレットに興味を持っていただける機会が多かったため、自分が知らない誰かの知見に助けられたように、微力ながらコミュニティに貢献するべく、未完の状態でお見せすることにしました。

### Framework by Figma登壇資料

後でFigma Communityにも掲載します

[https://speakerdeck.com/player/ca91e24f54644442a87c1f17beab4038](https://speakerdeck.com/player/ca91e24f54644442a87c1f17beab4038)

## シチュエーションにおける最適解

繰り返しますが、今回説明するような**煩雑で、複雑で、面倒な、プロセス**をほとんどの場合では踏む必要がありません。**なので（基本的には）（絶対に）真似する必要はありません。**

代わりに、インターネッツの世界には、世界中の優秀なデザイナ・エンジニアが作った優れたカラー設計ツールが存在します。ぜひこれらのツールやプロセスを活用できないか検討してみてください。

**Ameba Spindle**プライマリーカラーをすでに持っているプロダクトの場合、この設計プロセスは大変参考になります。

[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)[** 「Ameba」15年の負債を払拭するカラーパレットのメソッド | CyberAgent Developers Blog **](https://developers.cyberagent.co.jp/blog/archives/26754/)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)[* 今年で16周年を迎える「Ameba」では、プロダクト再興の礎を構築しようとデザインシステムの開発をスタートしました。そのな *](https://developers.cyberagent.co.jp/blog/archives/26754/)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)[* developers.cyberagent.co.jp *](https://developers.cyberagent.co.jp/blog/archives/26754/)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)

## カラーシステム改修の背景

### そもそも何で、こんな面倒な課題に取り組むのか…

Gaudiyでは、Fanlinkというコミュニティプラットフォームを提供しています。Fanlinkは**ホワイトラベルのプラダクト**であるため、それ自体のブランドは持たず、利用するクライアント企業が持つ**IPの世界観に寄り添ったニュートラルなプロダクト**であり、一般ユーザーからはクライアント企業が運営として見られます。

![](https://assets.st-note.com/img/1713869989518-ayT7XngSSW.png?width=1200)

そのためプロダクトの性質上、**各IPが持つ世界観にできる限り寄り添うために、プライマリーカラーやテーマをコミュニティ単位で切り替える必要があります。**

### 当時のカラーシステムが抱える課題

取り組みの出発点は、**新しいIP導入に伴うダークモード対応の必要性**が見えてきたことでした。

当時のカラーシステムが持つ問題を解消しながら、将来に向けた柔軟性と拡張性を持つカラーシステムを目指します。

![](https://assets.st-note.com/img/1713870043052-b0hXqVb2Rl.png?width=1200)

**## もう少し詳しく1.** **彩度明度が低く、デバイス見た時にやや濁って見える**- カラーパレットの色調展開が直線的で、ややShadeのカラーが暗すぎる**2.** **コミュニティカラーのコンポーネントへの適応設計が十分ではない**- HoverやPressedなどの状態への対応が不十分- コミュニティカラーとUIカラーの相性が考慮されていない**3. 十分なコントラスト比を保ったカラーパレットの設計がなされていない**- 既存定義はアクセシビリティチェックを行っていない**4.** **ダークモードに対応できていない**- 階層を定義し、Elevationに対するカラー適用を設計する必要がある**5.** **Tailwindを用いた実装の命名規則に適応しきれていない**- エンジニア・デザイナー間の共通言語として機能が不十分**6. 長期的な運用に耐えられるロジックを持っていない**

## ホワイトラベルなプロダクトのための、カラーシステムが満たすべき要件

今回設計するカラーシステムが満たすべき要件は以下です。

1. ダークモード対応
2. 十分なコントラスト比率を担保する
3. 柔軟で視覚的に魅力的なカラーパレット
4. 拡張可能なロジック
5. 開発者間の共通言語として機能する

### 1. ダークモード対応

今回の取り組みの出発点であるダークテーマ対応は将来的なプロダクトの可能性を広げる取り組みです。

一方で、**「ダークモードは色を反転するだけだ」**と期待され、その工数を過小評価されることがあります。実際に僕もそう思っていた節があり、簡易的に実現できるだろうと楽観視していました。

**しかし実態はかなり、かなり面倒です。**オープンソースのカラーシステムを丸々採用していればその通りコストをかけずに実現可能かもしれませんが、デザイン環境や実装反映、少しの制約条件や要件を考慮するだけで、その作業は**複数のツールを組み合わせて試行錯誤を繰り返さなければいけません**🤢

![](https://assets.st-note.com/img/1713870091357-A2nK1T6f5H.png?width=1200)

Fanlinkのカラーシステムが実現したいのは「ユーザーがテーマ設定できる」ではなく、「IPの世界観に寄り添った表現に近づける」という要件です。

そのため**ビジネス要件としての課題でもあり、その優先度と探求に必要な時間を掛けられる状況を作り出すこと**はとても重要です。

我らがFigma先生も、このダークモードとの格闘がスーパーハードだと[Config2022](https://www.youtube.com/watch?v=1DTnojio89Y)で仰られていました。[テックブログ](https://www.figma.com/blog/illuminating-dark-mode/)もおすすめです。僕らも実際に設計開始から初期デリバリーまで3ヶ月程の時間をかけました。

![](https://www.youtube.com/embed/1DTnojio89Y?rel=0)

### 2. 十分なコントラスト比率を担保する

**以前のカラーパレットはコントラスト比を考慮していない**ため、幅広いユーザーに対してアクセシブルなカラーパレットではありませんでした。

十分なコントラスト比というのは、[WCAG](https://waic.jp/translations/WCAG21/)が定めている国際的な標準指針であり、このガイドラインに準拠することで、色覚異常や視力の低下があるユーザーを含む幅広いユーザーにとって、Webサイトやアプリケーションの可読性とアクセシビリティを担保するというものです。

[WCAG2.1](https://waic.jp/translations/WCAG21/)には**インターフェイス上の要素が満たすべきコントラスト比**が定められており、今回のカラーシステムではスケール定義にあたってこの基準に準拠したスケール設計を目指しています。

**どれだけ厳格にコントラスト比を担保すべきか？**コントラスト比をどの程度保つべきかはサービスドメインや将来的なユーザーも含めた視点で決定する必要があります。主観的な意見としては**公共性の高いサービスほど年齢や障害有無に関わらずアクセシブルである必要がある**ため、厳格に準拠する必要があると思います。一方でターゲットが限定的な場合や**toCサービスでは必ずしも厳格に準拠する必要はなく、より主観的・視覚的な魅力を優先可能**だと思っています。Gaudiyの場合、コミュニティサービス自体はC向けですが、グローバル展開と金融事業の計画を想定し、WCAG2.1に準拠したアクセシビリティを担保して設計する意思決定をしました。

![](https://assets.st-note.com/img/1713870156021-5kAhSuBOHK.png?width=1200)

### 3. "柔軟性"と"拡張性"を持ったテーマ変更

**コミュニティごとにIPのブランドカラーに近いプライマリカラーに変更可能**できる必要があります。

プラットフォームとしてどのブランドカラーを選択した場合も、異なる環境間で見た目の差分が出来るだけなくなるよう、**カラースケールが同じように知覚できるコントラストで設計する必要がありました**。（Red500とBlue500と同じコントラストを提供する）

また、未対応のブランドカラー要望があった場合に、**カラースケールを後から柔軟に追加可能**にしておく必要があります。属人化せずロジックに従ってカラースケールを追加できるような中長期の運用に耐えうるロジックを持っておくことが理想的です。

### 4. 開発者間の共通言語として機能する

カラーの**命名規則変更はデザイナーやエンジニアの日常的な作業に大きな影響を与えます。**命名が大きく変われば認知負荷が高まり、作業効率に悪影響を与えかねません。

出来る限りこれまでの記法に近い、**一貫したルールを守って命名することで、デザイナーやエンジニアがその利用用途や値を予測可能で、開発者間の共通言語として利用される**ことを目指します。

### 目指す方針

![](https://assets.st-note.com/img/1713870256354-AS7psf90Vl.png?width=1200)

**意味的で、アクセシブル**- 意味を持った色の命名が開発者の共通言語になり、システマチックに利用するだけでアクセシビリティを担保できる**柔軟性と拡張性**- 新しいカラーテーマが要求された場合に、同じルールで設計 / 追加できる**長期的に運用されるカラーパレットガイドラインにする**- 色の追加/変更した場合の変更しやすさを持たせる。目指せサステナブル。

## 落とし所の模索と、完成予想図

![](https://assets.st-note.com/img/1713870312977-N2AgilnTL0.png?width=1200)

### カラーシステムの設計プロセスを探る

上記の要件が一定で揃った所で、国内外の事例を片っ端からリサーチし、それぞれの設計思想を探ります。（参考文献はnoteの最後にまとめてます）

![](https://assets.st-note.com/img/1713929642197-4cehGZAhny.png?width=1200)

Figmaに翻訳してまとめてた

世の中にある多くの偉大な先人の知恵を拝読し、いくつかの目指すべき方向性が見えてきました。特に参考にした3つを紹介します。

### [Radix UI](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)

![](https://assets.st-note.com/img/1713870343265-XtWhonlvGx.png?width=1200)

コンポーネントライブラリが持つカラースケールで、各カラースケールの**12step全てに基本的な利用用途が定義されています。**カラースケールを追加すればそれだけで新しいパターンに展開可能になっています。

![](https://assets.st-note.com/img/1713870374828-Rb6hcsP0RA.png?width=1200)

一般的なデザインシステムではコントラスト担保が難しく捨てられがちな水色、黄色、オレンジといったカラーも、foreground textにdarkを使用するスケールとして切り離されて定義されています。

このように、**今後テーマカラーが増加した場合も、グローバルパレットを追加すればセマンティックカラーにルールのまま適用できる柔軟なカラーパターンを生み出すことができるというのがRadixの思想の魅力**です。

![](https://assets.st-note.com/img/1712463671409-pOfr6h5NvL.png?width=1200)

https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette

### Mineral UI / [Goldman Sachs](https://design.gs.com/foundation/color-system/creating-the-system)

この2つのカラーパレットの設計は、**プライマリカラーを持たない、かつ単一のカラースケールがLight / Darkの両方を実現可能**という点で設計のアプローチが似ています。

![](https://assets.st-note.com/img/1713870433987-TvzDLKuq7b.png?width=1200)

Radix UIは12stepそれぞれに明確な用途を定義しているため、step間の明度差分がやや極端で、dark theme用のカラースケールが別に定義されている。

特に[Minerarl UIのブログ](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)で紹介されているプロセスを最初のバージョンではかなり参考にしてます。既存カラーシステムの評価、カラーパレットの設計プロセス、コントラストの差分調整方法などなど。

**## Mineral UIの既存カラーシステムの評価を一部抜粋**
IBM Design / Material Design / Open Colorといった3つのオープンソースカラーシステムを「色相」「パターン」「彩度・明度」に焦点を当ててHSBベースでマッピングし、それぞれの特徴を分析します。**IBM:** アクセシビリティの問題を気にせずに色を使用できる、一貫したルールがある。**Material Design:** 様々な配色を可能にするが、全体としてパレットに一貫性がない。**Open Color:** 最もパターンがあり、パレットは他の色を追加するときに簡単に拡張できるように設計されている。トレンドを加味した色だが、コントラスト比を担保できていない。https://uxplanet.org/designing-systematic-colors-b5d2605b15c

![](https://assets.st-note.com/img/1712465812096-lpGYZ5D24G.png?width=1200)

3つのカラーシステムの特徴を比較した図 （出典：https://uxplanet.org/designing-systematic-colors-b5d2605b15c）

### Amaba Spindle

ブランドカラーの有無は違えど、セマンティックカラーの概念整理や手順において非常にわかりやすく参考になりました。色相空間でHSBを基準にしている点や、ブランドカラーに適合したカラー展開やグレーの選定方法など、非常に**ステップがロジカルかつ明快**で物凄く参考になりました。

[ ](https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03)[** 「Ameba」15年の負債を払拭するカラーパレットのメソッド | CyberAgent Developers Blog **](https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03)[* 今年で16周年を迎える「Ameba」では、プロダクト再興の礎を構築しようとデザインシステムの開発をスタートしました。そのな *](https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03)[* developers.cyberagent.co.jp *](https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03)

## テストバージョンの構築

ここで、目指していく大まかな完成図が整理できました。

Global Color Paletteが持つカラースケールを元に、実際にデザインや実装で利用するSemantic Color Paletteに色を適用する構造です。

![](https://assets.st-note.com/img/1712987287852-whKcqQpP5y.png?width=1200)

エクサウィザーズさんのカラー設計noteの図を元に作成しました（参考：https://note.exawizards.com/n/ncf6b8ad02078）

Global Color PaletteとSemantic Colorの関係性にもう少し注目すると、**Global Color Paletteの各ステップには「ターゲットコントラスト」と「対応するSemantic Color」が定義**されており、それに準じたGlobal Color Paletteをスケールとして追加すれば柔軟な色追加が行えるということです。

![](https://assets.st-note.com/img/1712990790239-69dRUAZsOG.png?width=1200)

グレースケール以外の場合も同様に、カラースケールにステップに役割が割り当てられており、Smenatic Colorに適用されます。

![](https://assets.st-note.com/img/1712991582629-csfb3yyGZc.png?width=1200)

## 一般的なスケール展開の問題点

最も簡単なグレースケールの構築は、任意の「黒」を決め、この**チャートに示されているように各明度の値を均一な間隔で増減させる方法**です。

以下の画像ではstep-10 を 95% の明度に設定し、step-100 を 14% の明度に設定した場合、各ステップで、テーマの値が高くなるにつれて、明度を 9% ずつ減少させています。

![](https://assets.st-note.com/img/1713929964626-YNOGgQgtVI.png?width=1200)

### 問題点1: コントラスト比の担保ができない

この方法でカラースケールを設計した場合、step-60=ライトテーマのベースカラーに該当するステップでコントラスト比を担保できていないため、このままでは利用できません。

![](https://assets.st-note.com/img/1713929985707-cdsFatW5xO.png?width=1200)

### 問題点2: 状態変化を表すには変化差分が激しい

もう一つの問題点は、直線的な明度変化ではState間の色差分が激しくなってしまい、思い通りの状態変化を表現することができません。

![](https://assets.st-note.com/img/1713929992317-aNFTD6Ps9Q.png?width=1200)

### 問題点3: カラースケール間の見た目が異なる

既存のカラーパレットを分析したブログでは、各スケール間で明度の増減幅が等しくないために、値間のズレが生まれていることを指摘しています。

**つまり、テーマカラーを変えると見た目が異なって見える状態です。**

![](https://assets.st-note.com/img/1713000726508-spaetZfoDc.png?width=1200)

出典：https://uxplanet.org/designing-systematic-colors-b5d2605b15c

今回のカラースケール設計では、**各ステップが持つ役割に応じて適切なコントラスト比の増減**を設計する必要があります。

この時点で把握していたカラーパレット設計ツール（Github Premirや[Colorbox by Lyft](https://medium.com/tap-to-dismiss/color-within-constraints-d6f777a3b72d)）ではこのゴールに対して適切な明度と彩度の変化を生み出すことが難しいと判断し、まずは手作業でスケールを設計しながらモックテストを反復することにしました。

## スケールの設計

先述したようにカラースケールへ展開してするための基準となるグレースケールでは、**一貫性を持った明度の差分（各Stepがどのような差分を持つか）とターゲットコントラスト**を設定する必要があります。

主に利用されるケースのコントラスト差分をRadixのカラーパレットなどから抽出し、主要な値にコントラストターゲットを設定してみます。初期バージョンの色定義ではHSBを色空間として用いて明度彩度の調整で完結するようにしています。

### 1. ベースポイントとエンドポイント（25, 950）の決定

まずベースポイントのコントラストターゲットを設定します。400, 500のステップはLight/Darkモードにおけるベースカラーになるためコントラスト比4.5:1以上を担保します。

次にスケールの両極端である最も明るい値と最も暗い値を決定します。

最も暗い値の目安はBrightness: 10前後（コントラスト比: 18:1程度）で、テキストで利用される基準の黒になります。反対に最も明るい値の目安はBrightness: 90前後にします。

![](https://assets.st-note.com/img/1713930030605-DjbpartUzv.png?width=1200)

### 2. 明度の増減パターンを決める

初期のバージョンで試したアプローチはRadixやGoldman Sachsなどいくつかのカラースケールを抽出し、各ステップの明度変化度の増減を共通のパターンとして利用するものです。

色々な増減パターンを試した結果、ピンク色の点で示した直線的な明度の増減ではなく、**明度の増減幅が山なり＝ベースポイントに近いステップほど変化幅が大きいパターン**を採用しました。（両端のstep数を刻んでいるため増減幅が綺麗ではないけど…）

![](https://assets.st-note.com/img/1712997245186-1IAUOIODet.png?width=1200)

このパターンで展開したカラースケールは以下のようになります。

![](https://assets.st-note.com/img/1713930058914-PX2BtPfH9j.png?width=1200)

### 3. 背景色と文字色に適用する

上記のグレースケールを利用して、ステップに具体的な役割を持たせていきます。まずは背景色と文字色を決め、それぞれのコントラスト比が担保でいるかどうか見ていきます。

基本的なレイヤー構造はBackground, Surface, Textの3つで表現します。

![](https://assets.st-note.com/img/1713930073632-AerW8GCkhN.png?width=1200)

Semantic Colorが持つ概念の定義 （参考：https://developers.cyberagent.co.jp/blog/archives/26754）

**Background:** 最下層としてどの画面の下地にもある層。Material Designでいう00dp。
**Surface:** Backgroundに上に乗る表層レイヤー。基本的にはWhiteが使われますが、状態考慮のためにSecondaryまで用意します。
**Text:** テキストやアイコンなどのオブジェクトレイヤー。画面上の優先度によって使い分けが可能で、コントラスト比が確実に担保されるようにする。参考：https://developers.cyberagent.co.jp/blog/archives/26754

Backgroundにはgrey-50を適用し, デスクトップでの用途を踏まえてgrey-0(\#FFFFFF)も選択肢に追加しました。Surfaceは多くのシーンでTextの背景になります。

![](https://assets.st-note.com/img/1712995650235-ERToUf56iu.png?width=1200)

### 4. 背景色と文字色のコントラスト比を検証する

文字色の定義数は多すぎると利用時に迷いやすく、少なすぎると優先度の表現幅が狭まりに使いずらくなってしまいます。文章の強弱や優先度を最低限表現できる定義数にします。

Primary - タイトルや見出し、本文などの強調したいテキストSecondary - サブテキストなど
Tertiary - 優先度が低いテキスト
Disabled - 非活性の状態
Accent - ブランドカラー

先ほどの背景色に対して、コントラスト比が担保されているかチェックしていきます。

![](https://assets.st-note.com/img/1712993772600-c78a4V6Ah2.png?width=1200)

Text Secondary, Tertiaryにおいても同じように行います。Disabledは押せない色であることを示すためにコントラスト比を満たない状態を許容します。

![](https://assets.st-note.com/img/1712996618729-pIjt0Wo6Wr.png?width=1200)

### 5. 可視化・反転させる

黒文字、白文字ともにベースとなる色のコントラスト比を設定し、基準となるグレースケールができたので、各stepに割り当てられた役割と共に一度可視化してみます。

![](https://assets.st-note.com/img/1712999053118-dwLkccrxGL.png?width=1200)

明るい色（Step25〜400）は暗い文字、暗い色（Step500〜950）は白い文字が前景色に適用

**グレースケールが定めたターゲットコントラストはこの後展開するカラースケールのいわば"見本"**になります。

このグレースケールはダークモード時にも同様に機能する必要があるため反転させたステップをダークモード時のTextに割り当て、同じようにコントラストチェックを行い調整していきます。

![](https://assets.st-note.com/img/1712999018566-IAZ31sjtT0.png?width=1200)

## カラースケールに展開する

![](https://assets.st-note.com/img/1713930430561-rhADWxHpr5.png?width=1200)

基準となるグレースケールを手に入れたので、他のカラースケールを展開していきます。ブランドカラーが存在する場合は[Adobeのカラーテーマジェネレーター](https://color.adobe.com/ja/)を利用し、**対照色相配色**で類似色と対称色相によってブランドカラーと相性の良い色相を導き出すのがオススメです。

ブランドカラーがない場合、**ある程度主観的に色を決める必要があります**。

1つの基準色を決めそれを基準に対象色相配色で展開したり、あるいは公開されているデザインシステムなどから実現イメージに近いカラースケールを参照し、基準色として利用するなどでもいいと思います。

### 色相を決める

今回は既に定義されていたカラーが存在しているため、少し調整はしましたが基本的な色の種類はそのまま利用します。初期バージョンでは、**コミュニティ毎に一定の選択肢を提供できるよう10色展開**としました。

![](https://assets.st-note.com/img/1712584902394-IOkXTSwypq.png?width=1200)

様々なIPのコミュニティに適応できるよう幅広いカラーが必要

展開する色相がを決めたら、明度と彩度を調整してベースポイントのターゲットコントラストになるように調整します。

![](https://assets.st-note.com/img/1713930452070-o9hjwC1MYD.png?width=1200)

ベースポイントのコントラスト比率4.74に近づくよう明度を調整

バージョン1のプロセスでは、ベースポイントの色相を基準に最も明るいstep-25と最も暗いstep-900を可視化することで、カラースケールの全体像が見えるようにしました。

![](https://assets.st-note.com/img/1712770676198-Bt2Zlpb1wF.png?width=1200)

### ステップを展開する

このベースポイント＋エンドポイントを彩度明度の軸でマッピングし、グレースケールの設計時に定めたターゲットコントラストと明度の増減幅をもとにstepに展開します。

![](https://assets.st-note.com/img/1712999614526-Swc7lfjcX8.png?width=1200)

より自然なカラースケールを設計するために、この地道な作業によって明度の増減を制御しながら滑らかな曲線的分布でスケールを展開することができます。

![](https://assets.st-note.com/img/1713000237948-XNdlkhtIZI.png?width=1200)

赤やオレンジなどのカラーでは楕円曲線を用いる事で暗い色でもより自然な彩度になります

### モックアップテスト

繊細な調整作業と並行して、モックを使ってテストを実施しました。各ブランドカラーごとの見え方をテストし、調整が必要なポイントを洗い出します。

![](https://assets.st-note.com/img/1712999661762-0lbRGxBvon.png?width=1200)

（よく見ると色が古いが、ご愛嬌）

## 色の役割を整理する

ようやくカラースケールが出揃いました（長い）。

このカラースケールを用いて**より実用的な色の役割＝Semantic Color（特定の役割を持つ色の定義）**を追加していきます。

![](https://assets.st-note.com/img/1713930579350-bmy73kFITV.png?width=1200)

### 色の役割分類

ここで定義する色の役割はデザイナー/エンジニアの日常的な利用色です。

よって、**その定義数が増えれば増えるほど認知負荷が高まり、厳密な定義と引き換えにデザインツール上での扱いが面倒になります。**

そのためプロダクト特性に配慮した上で、適切な定義数になるよう分類に配慮する必要があります。大まかな分類はAmebaの概念整理をほとんどそのまま転用させていただきました。

**Background**
最下層に位置するレイヤーで、すなわちアートボードの色。 いずれのUIにも必ずあるものとする。
**Surface**
Surface＝表層、Backgroundの上に乗るレイヤー色。
**Text**
あらゆるTextの色。WCAG2.0に準拠し、背景色に対してコントラスト4.5:1を保持する必要があり、背景色に応じて選択可能な色が限定される。
**Object**アイコンなど、textとは異なる図形に使用する色。コントラストは3:1を担保する必要がある。 **Border**罫線やInput Fieldのアウトラインなどに使用する、線の色。**Interactive (Focus)**ユーザーが要素をクリックやタップをしたり、キーボードの［タブ］キーで選択したりしたときに出現するFocusのスタイルにあてる色。**Third Party**他社サービスを引用した機能を組み込む時に、それぞれのガイドラインに則って使用される色。出典：https://developers.cyberagent.co.jp/blog/archives/26754/#chapter03

overlayのみ独自の定義で分類を追加しました。

**Overlay**
現在のコンテンツの上に重ねられる半透明のレイヤー色。中断されたタスクに対する焦点を再度集めるか、新たなタスクを促進するために使用される。

![](https://assets.st-note.com/img/1713004143134-m9PqJhp64q.png?width=1200)

再掲

### 命名規則

カラーシステムを効率的かつ有効に活用するには、**命名規則が非常に重要**です。開発者とデザイナーが日々やり取りする中で、色の名前が明確で意味のあるものだと、お互いの理解がスムーズになり、コミュニケーションがスムーズかつ正確になります。

色の名前を役割や機能に基づいて付けることで、デザインツールと開発ツールの両方で一貫性が保たれ、色の意味が直感的に伝わります。これにより、開発者はコードを書く際に、その色がUIのどの部分に使われているかを簡単に想像できるのも利点です。

デザインツール上でも、実装ツール上でもどちらにおいてもセマンティックカラーが同じように予測可能であるために、以下の変数を用いて命名されます。

**Theme**
- Light / Darkのmodeを指定します。
- 後のアップデートでvariablesが使用可能になったため削除済み。
**UI Element**
- 色の役割に基づく事で、UI上でどのように利用されるかが明確になります。
**・Color Role**
- 特定のUI要素内で、階層や視覚的な強調を調整するために優先度や意味を表します。
- 例えば、コミュニティのブランドカラーは「accent」でコミュニティごとの柔軟なカラー設定をサポートしています。
**・State**
- 各UI要素が持ち得る状態の変化を指定します。

![](https://assets.st-note.com/img/1713004065556-6TLoJSZebl.png?width=1200)

variablesが使用可能になったためthemeは削除

```plain text
## デザイン上の定義
- text/primary
- object/primary/hover

## 実装上の定義
'--object-inverse':: {light: White alpha[950], _dark: black alpha[950]}
'--object-inverse-subtle':: {light: White alpha[700], _dark: black alpha[700]}
- --text-primary
- --object-primary-hover
```

### Semantic Colorの定義

上記のルールを元に定義したSemantic Color Paletteはこのようになります。他のアプリケーションであればここまで不要な場合が多いはずです。

Text, Object, Borderなどは「OnSurface」と分類してまとめてしまうこともできるはず。

![](https://assets.st-note.com/img/1713004615211-65ein5BMR9.png?width=1200)

### Stateを定義するか否か定義数が増え過ぎる場合の回避策

Gaudiyが提供しているサービスは**プラットフォームがWebなので、インタラクティブ要素のStateを明確に区別する必要があります。**

元々はコンポーネント側にその責務を持たしていたものの、**開発者個人にその状態制御が依存しすぎるため実装箇所によって状態変化の規則がズレていってしまう課題**を持っていました。

そのため今回は**「State/」という分類**を設け、役割が持つ各状態をvariablesとして定義しました。結果的に開発者間での状態表現の差分が生まれづらくなり一定のメリットを感じています。

![](https://assets.st-note.com/img/1713063878169-Jkaj9GT5nr.png?width=1200)

Figma上での扱いを考えると、Stateだけでも数が多く素直に表示させてしまうと日常のデザイン作業で邪魔になります。なので、State/で分類し隠しておくようにしました。主な利用シーンとしてもデザインシステム上でコンポーネント定義する時に状態定義として利用する場面がほとんどです。

![](https://assets.st-note.com/img/1713930921006-YBQYSCcvYk.png?width=1200)

Stateを含めたSemantic Colorの全体がこちら↓

![](https://assets.st-note.com/img/1713064186701-10jfTASNW9.png?width=1200)

Stateを含めると一見誰が扱えるねんコレなパレットになります

## Bright Colorの制御

さて、具体的なユースケースが見えてきた所で、実はまだ放置していた重要な問題があります。

![](https://assets.st-note.com/img/1713930960928-kjKwODIGwv.png?width=1200)

**黄色やオレンジを始めとした白い文字でコントラストターゲットを満たすことが非常に難しいBright Color（明度の高い色相）**の扱い方です。今回の要件ではIP毎のブランドカラーを表現する必要があるため、これらの色についても利用できるようにする必要があります。

### Dark Yellow Problem： 濃い黄色問題

黄色はカラーシステムの議論において頻繁にその名前が話題にあがります。

というのも、黄色が白い文字でコントラスト比を満たすように調整すると、とても濁ってしまい、もはや黄色ではなくなるため、黄色が持つ意味的な役割を認識できなくなるという問題を抱えています。加えて、そもそもUIとして使うには魅力に欠けるよね….という話。

![](https://assets.st-note.com/img/1713001283459-798pukjcwW.png?width=1200)

出典：https://uxdesign.cc/the-dark-yellow-problem-in-design-system-color-palettes-a0db1eedc99d

この問題を改善するカラーシステムのアプローチとして、生成ロジックやプログラム側で制御するという選択肢が考えられますが、少なからずロジックが複雑になります。

そのためカラーシステムの「一貫性」を重視する場合、この複雑性を回避するためにBright Colorを定義から除外するケースも多く見られます。

![](https://assets.st-note.com/img/1713931016889-c9sH65bJ9F.png?width=1200)

IBMなど一貫性を重視するシステムでは除外され、Material Designなど色相数を重視する場合はコントラスト担保を許容している。

### ブライトカラーをどう扱うか？

先述の通り今回の要件では**IPのブランドカラーがBright Colorであるケースもあり、除外はできません。**そこで、Radixが行なっているアプローチを参考に、多少の複雑性を許容しシステムに組み込んでみようと思います。

RadixのアプローチはSky, Mint, Lime, Yellow, Amberの5色の**ブライトカラーが背景色に用いられる場合、前景色が黒文字になるように異なるルールを設けています。**

![](https://assets.st-note.com/img/1713001694297-Cxoj6QGTKp.png?width=1200)

出典：https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

例えば以下のような塗りつぶしのボタンに利用する際、コントラスト担保が難しいブライトカラーでは前景色に黒文字が用いられています。

![](https://assets.st-note.com/img/1713001906345-LqwV0z6aS5.png?width=1200)

出典：https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

### カラーシステムへの応用

通常のGlobal Color PaletteではStep-500 ~ 700の前景色に白文字が用いられますが、**ブライトカラーのStep-500 ~ 700の前景色には黒文字が用いられるようにルールを変更**しました。

![](https://assets.st-note.com/img/1713931088309-pgHdnSXPFL.png?width=1200)

実際に利用されるUI上ではOnAccent、つまり背景色がaccentである場合に利用される前景色はaccentカラーによって変化するように定義しています。

![](https://assets.st-note.com/img/1713067671702-q3hBiOSB68.png?width=1200)

コードベースでは以下のように分岐しています。

```plain text
text: {
    '--text-primary': { _light: grey[950], _dark: grey[0] },
    '--text-accent': { _light: { value: 500, _bright: 800 }, _dark: 400 },
    '--text-on-accent': { _light: { value: grey[0], _bright: grey[950] }, _dark: grey[950] },
  },
```

### Figma上での定義を効率化する便利ツール

スタイル定義効率化

[ ](https://www.figma.com/community/plugin/820660579767995949)[** Styler | Figma **](https://www.figma.com/community/plugin/820660579767995949)[ ](https://www.figma.com/community/plugin/820660579767995949)[* Styler unlocks the ability to manage multiple styles at once *](https://www.figma.com/community/plugin/820660579767995949)[ ](https://www.figma.com/community/plugin/820660579767995949)[* www.figma.com *](https://www.figma.com/community/plugin/820660579767995949)[ ](https://www.figma.com/community/plugin/820660579767995949)

カラーガイドライン生成

[ ](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)[** Color Style Guide | Figma **](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)[ ](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)[* How to use: Set local styles.Run this plugin.A new page will *](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)[ ](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)[* www.figma.com *](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)[ ](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)

ドキュメント整理

[ ](https://www.figma.com/community/plugin/767379019764649932)[** Clean Document | Figma **](https://www.figma.com/community/plugin/767379019764649932)[ ](https://www.figma.com/community/plugin/767379019764649932)[* Automagically organize and clean up your Figma document. Fun *](https://www.figma.com/community/plugin/767379019764649932)[ ](https://www.figma.com/community/plugin/767379019764649932)[* www.figma.com *](https://www.figma.com/community/plugin/767379019764649932)[ ](https://www.figma.com/community/plugin/767379019764649932)

[ ](https://www.figma.com/community/plugin/731271836271143349)[** Rename It | Figma **](https://www.figma.com/community/plugin/731271836271143349)[ ](https://www.figma.com/community/plugin/731271836271143349)[* Keep your Figma files organized, batch rename layers and fram *](https://www.figma.com/community/plugin/731271836271143349)[ ](https://www.figma.com/community/plugin/731271836271143349)[* www.figma.com *](https://www.figma.com/community/plugin/731271836271143349)[ ](https://www.figma.com/community/plugin/731271836271143349)

[ ](https://www.figma.com/community/plugin/799648692768237063)[** Select Layers | Figma **](https://www.figma.com/community/plugin/799648692768237063)[ ](https://www.figma.com/community/plugin/799648692768237063)[* Select layers based on name, type, or similarity. Fund my wo *](https://www.figma.com/community/plugin/799648692768237063)[ ](https://www.figma.com/community/plugin/799648692768237063)[* www.figma.com *](https://www.figma.com/community/plugin/799648692768237063)[ ](https://www.figma.com/community/plugin/799648692768237063)

### Variables

このv1.0の制作時点ではvariablesの機能が無くStyleで定義していたのでスタイル定義プラグインの[Styler](https://www.figma.com/community/plugin/820660579767995949)や、スタイルガイド作成プラグインの[Color Style Guide(by 谷さん)](https://www.figma.com/community/plugin/941680506965181089/color-style-guide)のを活用していたのですが、Variablesがリリースされたことでより運用を簡略化することができました。

Styles時代は「Brightの場合にOnAccentの文字色変える」や「コミュニティごとに色を変える」を実現するために一々Styleを定義するかDetachする他ありませんでした。

![](https://assets.st-note.com/img/1713068279793-crIOkeo5b5.png?width=1200)

Variablesによってmodeを定義することができるようになったため、以下の例のようにLight - Purple / Dark - Purple / Light - Yellow / Dark - Blueなど、「テーマ x ブランドカラー」の変数を定義することが可能になり、かなりスッキリしました。

![](https://assets.st-note.com/img/1713070170229-22g7TuwPK8.png?width=1200)

![](https://assets.st-note.com/production/uploads/images/138336381/picture_pc_3b49ed8336c8daf454006cb11078ab51.gif?width=1200)

現状プランの制約で最大mode数が4つなので、頻繁に利用するコミュニティのmodeを用意しています。（4じゃ足りない）

![](https://assets.st-note.com/img/1713070148345-vh0PV75TKH.png?width=1200)

常々せめぎ合っているのでもう少しmode数を作れるようにしてほしいな…

## v1.0 🚀

やや脱線しましたが、こうしてGlobal・Semantic両方のカラーが出揃いました！！長い道のりでした🤮🤮🤮

![](https://assets.st-note.com/img/1713067826387-MPQboCeEmD.png?width=1200)

完成と同時にダークモードへの対応も済んでおり、**コミュニティ毎にローカルでスタイルを変更しなくて良くなったことが地味にインパクトが大きかった**です。またStateの定義によってズレが起きづらくなり中長期で見ると負債が肥大化していくことを防げているのを実感しています。

## 煩雑なプロセスの再現性の低さ

ここまでカラーシステムについて考えてきたものの、実際問題として要件の一つである再現性あるロジックがどれくらい担保されたでしょうか？これを**チームメンバーが僕と同じく理解し、運用するのはあまりにも困難です**。

今このnoteを書きながら初期プロセスを思い返すこと自体も非常に苦痛です。（ダークテーマ対応したの2年前）

## Huetoneで視覚的にロジックを備える

気が遠くなるほど手作業を繰り返したv1.0のカラースケールの設計し終え、運用する中で見えてきた次の課題に向き合っている中でHuetoneというカラーパレット作成ツールに出逢います。

[ ](https://huetone.ardov.me/)[** Huetone • Make colors accessible **](https://huetone.ardov.me/)[ ](https://huetone.ardov.me/)[* Use LCH color space to come up with predictable and accessibl *](https://huetone.ardov.me/)[ ](https://huetone.ardov.me/)[* huetone.ardov.me *](https://huetone.ardov.me/)[ ](https://huetone.ardov.me/)

HuetoneはStripeのテックブログ「[Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)」が指摘しているHSL空間の課題とそれに対するアプローチをきっかけに超絶色マニアである[Alexey Ardov](https://ardov.me/)さんというプロダクトデザイナーが制作したカラーシステム設計ツールです。

上記のブログで紹介されている色の課題は非常にマニアックですが、最終的にHuetoneの利用に至った指摘と適切な解決策の提供をしてくれています。

## HSLを色相空間として利用する問題点

HSLという色空間が持つ問題点について以下の2つのブログを引用しながらお伝えします。

[ ](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)[** Accessible Palette: stop using HSL for color systems | Wildbit **](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)[ ](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)[* Accessible Palette is an app for building color systems with *](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)[ ](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)[* wildbit.com *](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)[ ](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)

[ ](https://stripe.com/blog/accessible-color-systems)[** Designing accessible color systems **](https://stripe.com/blog/accessible-color-systems)[ ](https://stripe.com/blog/accessible-color-systems)[* How we designed a color system with hand-picked, vibrant colo *](https://stripe.com/blog/accessible-color-systems)[ ](https://stripe.com/blog/accessible-color-systems)[* stripe.com *](https://stripe.com/blog/accessible-color-systems)[ ](https://stripe.com/blog/accessible-color-systems)

我々はRGBの色空間に基づいて画面上で扱う色について慣れており、色の足し引きで色をに記述することは**コンピューターにとっては自然**です。しかし、RGBの値が与えられたとき、明るくするには何を変更する？もっとカラフルにするには？というのに答えるのが難しいように、**人間にとっては直感的ではありません**。

より直感的に理解しやすくしたものがHSL（Hue, Sirtuation, Brightness）です。多くのツールやコードライブラリにサポートされています。
**HUE（色相）：**それは何色ですか？
**クロマ：**どのくらいカラフルですか？
**明るさ：**どのくらい明るいですか？出典：[Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)

RGBの代替表現として考案されたHSL (色相、彩度、明度) モデルとHSV/HSB (色相、彩度、値、明度) モデルの立体図

![](https://assets.st-note.com/img/1713078524329-5xi8888jEk.png?width=1200)

出典：Jacob Rus と Michael Horvath (SharkD) によるイラストに基づく、ウィキメディア コモンズ（出典：https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems）

HSLはHue(色相) / Saturation(彩度) / Lightness(明度)の3つの変数で色空間をコントロールできる、直感的なプローチであることには間違いありません。

![](https://assets.st-note.com/img/1712983887530-4JQSiUXuxP.png?width=1200)

出典：https://stripe.com/blog/accessible-color-systems

一方で以下のような問題が指摘されています。画像を見てわかるように、**HSLが持つ明度の計算方法による数学的な明度は実際に人間の視覚的には同じように見えません。**

**HSLには明度の計算方法に欠陥があります。**異なる色相は本質的には**人間の目には異なるレベルの明度として認識される**ということです。
同じレベルの数学的明度では、黄色は青よりも明るく見えます。出典：https://stripe.com/blog/accessible-color-systems

![](https://assets.st-note.com/img/1712984028793-zSgSC2iVpS.png?width=1200)

出典：https://stripe.com/blog/accessible-color-systems

実際に「**知覚的に均一な色空間で同じメイドと再度を持つ色**」というのは以下のように色同士が混ざり合い、同じくらいの明度・彩度を持っているように見えます。

![](https://assets.st-note.com/img/1712984096554-swVkYVV15C.png?width=1200)

出典：https://stripe.com/blog/accessible-color-systems

### 明度計算方法の課題に対するアプローチ

HSLの明度計算方式では知覚的に均一な色を割り出せないという問題点に対し、[**CIELAB**](https://editor.note.com/notes/n22d7c7cadc70/edit/)**(またはLab)という色空間を採用することで解決しようとしています**。LabのLは明度を指しますが、RGBやHSLとは異なり知覚的に均一に変化するように設計されています。

明度値L* は、黒を 0、白を 100 で定義します。a *軸は緑と赤の反対色を基準にしており、負の値は緑に、正の値は赤に向かいます。b *軸は青と黄色の反対色を表し、負の値は青に、正の値は黄色に向かいます。出典：https://en.wikipedia.org/wiki/CIELAB_color_space出典：https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems

CIELAB色空間内の可視色域（左）で示されているように、水平軸のaとbは色相と彩度を示し、それ自体によって明度は変更されません。**HSLやHSB(HSV)との最大の違いは円筒を埋め尽くしていない点です。この領域はコンピューターによって表現できないあるいは人の目では区別不可能な色空間を表します。**

![](https://assets.st-note.com/img/1713079108555-wzqdh4Fq43.png?width=1200)

LCHの色相空間（出典：illustrations by Jacob Rus and Michael Horvath (SharkD), CC BY-SA 3.0, Wikimedia Commons., https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems）

Huetoneの優れた点はこのLabを用いたことにより、

**・人間に知覚可能か / 再現可能か
・WCAG or ACPAのコントラスト比を満たすか**の2つをリアルタイムに可視化し、色の変更が可能かを示してくれる点です。

![](https://assets.st-note.com/img/1713944742174-j1jrWcEGB8.png?width=1200)

## WCAG2.0, 2.1の問題点

コントラストのガイドラインとして設けられているWCAGですが、実はその計算方式についての課題が2019年に問題提起されてから長らく議論されています。（[コントラスト比の計算と関連する視覚的な問題](https://github.com/w3c/wcag/issues/695)）

WCAG2.1のコントラスト比計算方法は前景色の輝度を背景色の輝度で割って計算しています。問題は**計算方式が「入力に対し出力が直線的な関係」であるのに対し、人間は明るい色のコントラストを暗い色のコントラストよりも高いと認識する**点です。

![](https://assets.st-note.com/img/1712985240168-unRlnhAU7h.png?width=1200)

WCAG2.1のコントラスト比率では左の暗い色ではAAを示すが、右の明るい色では不十分と判定される。 （出典：https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems）

この図を見てわかるように、**"Good"なコントラストよりも"Bad"なコントラストの方が認識しやすい**ように感じます。コントラスト比を満たしたカラーシステムを設計してずっとこの色の気持ち悪さを感じていたことが正しくこの問題だったため非常に腹落ちしました。

上記の問題へのアプローチとして、現在公開されているWCAG3.0のワーキングドラフトでは**APCA（Advanced Perceptual Contrast Algorithm）**という新しい計算方式が公開されています。APCAを用いると以下のような結果になり、GoodとBadが入れ替わってるのがわかります。

![](https://assets.st-note.com/img/1712985741730-b5CjSF79eQ.png?width=1200)

出典：https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems

この新しい計算方式はまだ草案の段階で今後正式な基準として採用されるのかどうか楽しみにしたい所です。

また、[Accessible Palette: stop using HSL for color systems](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)でも触れられていますが、**WCAG2.1のコントラスト比が役に立たないものだということではなく、課題があるから改善しようとしているよ**という話で、これを念頭により良いカラーパレットを構築できるといいねという話です。

先ほど紹介したHuetoneは、このAPCAロジックでのコントラスト比計算にも対応しており、以下のようにWCAG / APCAの両方でコントラストチェックを行うことが可能です。

![](https://assets.st-note.com/img/1713944866793-d5WbfQ9B6s.png?width=1200)

WCAG3.0に向けた最新の理解は以下のAPCAについてのページを読んでくれ！とのことですので興味がある方はぜひ。

[ ](https://git.myndex.com/)[** Accurate ContrastUsing the APCA **](https://git.myndex.com/)[ ](https://git.myndex.com/)[* A catalog of Myndex Research content, including APCA articles *](https://git.myndex.com/)[ ](https://git.myndex.com/)[* git.myndex.com *](https://git.myndex.com/)[ ](https://git.myndex.com/)

[ ](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/)[** The Realities And Myths Of Contrast And Color — Smashing Magazine **](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/)[ ](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/)[* In this article, Andrew Somers, a 35-year veteran of the Holl *](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/)[ ](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/)[* www.smashingmagazine.com *](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/)[ ](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/)

## Huetoneの運用

Huetoneの背景だけでnote1本書けるくらいの文章を書いてしまったのですが、実際に煩雑なプロセスをどれだけ省いてくれるものかご紹介しようと思います。

### Huetoneの使い方紹介

作成したカラーパレットをHuetone上に移行してみました。

既にVariablesとして定義している場合は[Export/Import Variables](https://www.figma.com/community/plugin/1256972111705530093)を利用してJsonを書き出すと一発でインポートが完了します。

![](https://assets.st-note.com/img/1713082007289-6fuJBl5Fb8.png?width=1200)

簡単に各要素をご紹介します。

画面左側は見ての通りカラーパレットのマッピングで、各ステップ上にWCAGのコントラスト比の値がoverlayされています。

![](https://assets.st-note.com/img/1713081994431-CztJXxCr9h.png?width=1200)

参照するコントラストアルゴリズムは右上から変更可能で、APCAも選択可能。

![](https://assets.st-note.com/img/1713082107032-9Xkh8Cj9cc.png?width=1200)

左側下部に表示されているのは「選択中の値」vs「指定色」のコントラスト比です。APCAとWCAGの2つのコントラストアルゴリズムによる判定がリアルタイムに実行されます。指定色の値はHEXや「50」などでも指定可能です。

![](https://assets.st-note.com/img/1713081993521-0n0s3MYDdm.png?width=1200)

画面右側は選択中のカラースケール内（red-100, red-200…）と他のスケール（red-100, blue-100, green-100…）とのLCH空間における比較です。透過部分が知覚できない色の範囲を示しており、視覚的に選択可能な色を認識することができます。

また他スケールとの比較が表示されることでブランドカラーを変えた場合の差分も同時に検知することができます。

![](https://assets.st-note.com/img/1713081997472-kGPioSBIPC.png?width=1200)

Huetoneの愛すべき点はまだあります。

**なんと「B」を長押しするとなんと彩度を一発で0にした値をプレビューさせてくれます！**Figmaで同じ作業をやる場合はカラーパレットのレイヤーから1つずつHSBのSの値を0にする作業が必要で、この超絶面倒なタスクを消滅させてくれました。

![](https://assets.st-note.com/img/1713945047142-PLW0QYMDIh.png?width=1200)

さらに**Huetoneは表現・認知不可能な色に変更しようとした場合、エラーを返してくれます**。このリアルタイムフィードバックのおかげで瞬時に問題に気づくことができ、針に糸を通すような作業も楽に行うことが可能になります。

### Huetone → Figmaへのお引越し 📦

Huetoneで定義した色をFigmaに移行します。

Huetone上に示されているように[Figma Tokens](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens)を使うなど、方法はいくつかありそうです。

[JSON to Color Variables](https://www.figma.com/community/plugin/1304481992729678387)というプラグインを使ってJSONをVariablesにインポートする方法を取りました。シンプルかつ簡単でオススメです。（なんとこれを作っているのも谷さん）

![](https://assets.st-note.com/img/1713084205139-ApY05E9wUY.png?width=1200)

出典：https://www.figma.com/community/plugin/1304481992729678387/json-to-color-variables

各カラーの左が元のバージョン、右が最新版です。

少しわかりづらいですがHuetoneでの調整を経て少し彩度の強調が強かった色がやや和らいだ色に落ち着きました。

![](https://assets.st-note.com/img/1713083835561-gUrqLVncME.png?width=1200)

まだ改善したいポイントは多々ある & お前の目を信じろ！的に調整しないといけない側面は強い。

### コンポーネントに適用されたStylesをVariablesに置き換える

綺麗にStylesを適用していたコンポーネントを全て手動でVariablesに置き換えるのはコレまた先の見えない作業です。いくつかのコンポーネントで実行しようとしましたがすぐに心が折れました。

もしかするとより良い方法が既にあるかもしれませんが、当時は妥当な解決策が見つからず、同僚でFigmaアンバサダーでもあるデザインエンジニアのseyaさん（[@sekikazu01](https://twitter.com/sekikazu01)）に相談するとすぐに**Stylesを対応するVariablesに置き換えてくれる神プラグインを実装してくれて、**この気が遠くなる作業を超効率化してくれました❤️‍🔥

![](https://assets.st-note.com/img/1713084632831-SngqSTbzbi.png?width=1200)

**2023年のベストプラグイン！！！**

というわけで、カラーパレットをコンポーネントにも反映することができ、リリース作業を完了できました ✅

## v2.0に向けて

### v1.0が持つ解決したい課題

無事リリースし、半年ほど運用していますが既にいくつかの課題を抱えています。

**色の魅力が低い**

WCAGが持つコントラストアルゴリズムの問題にあるように、実際UIで使っていくと思ったよりも濃く、エンタメ系のtoCアプリにしては魅力に劣る色になる場合があります。APCAにも準拠したより鮮明で魅力的なカラーパレットへ進化させる必要があります。（特に黄色やオレンジ、ブライトカラー）

![](https://assets.st-note.com/img/1713085057904-MU1Idj8sRv.png?width=1200)

黄色やオレンジでコントラストを満たしながら魅力的な色に組むのは非常に難しい

**ダークテーマにおける不整合**

いくつかの色ではダークテーマ時の薄い背景色に定義されたステップの値ではなくstep-500の透過色を用いています。定義された値では暗すぎて実際のUI上では必要なコントラストに達していないように感じるからです。

### v2.0で実現したい更なる"マルチブランド化"

次のメジャーアップデート（をする機会があるのであれば）では、よりそのコミュニティが持つ世界観を柔軟に表現可能にする仕組みを追加したいなと思っています。

**Grey Scaleの拡張**一つは使用するグレースケールを選択可能にすることです。本来ブランドカラーを混色して定義するグレーを現在は彩度が0のグレーを利用しています。よりコミュニティのブランドカラーに馴染むグレーを提供可能にすることで、よりファンにとって身近な存在になることを期待しています。

![](https://assets.st-note.com/img/1713085347023-aRHxMrdwbg.png?width=1200)

**ファウンデーションの柔軟性**そしてもう一つはRadiusやTypographyなど選択肢の提供です。このレベルでのTheme選択が実現すると、カワイイポップなコミュニティも、クールでカッチリしたコミュニティも、どちらの世界観にも合わせたUIを提供可能になるはずです。

![](https://assets.st-note.com/img/1713085737698-EXsRxyuqnn.png?width=1200)

実際は「Radiusが持つ意味がサービス内で変わって良いのか？」とか、問題は山積みだろうけど言うだけ自由なのでね。（出典：https://www.radix-ui.com/themes/playground）

## 拝啓 Figmaさんへ

我々はまだEnterprise（Bussinessプラン）に辿り付けてないのですが、**利用可能なVariablesのモード数を増やしていただけることを熱望しています！**

また、variablesの利用時にコレクションの命名順とvariablesを呼び出した際に表示される順番が一致していないために色を探すコストが高まっている問題も解決に向かっていただけると非常に嬉しいです🤝

[ ](https://t.co/ECzPyB8tYQ)[** Reorder variable collections list **](https://t.co/ECzPyB8tYQ)[ ](https://t.co/ECzPyB8tYQ)[* Can anyone figure out how to reorder the list of variable col *](https://t.co/ECzPyB8tYQ)[ ](https://t.co/ECzPyB8tYQ)[* t.co *](https://t.co/ECzPyB8tYQ)[ ](https://t.co/ECzPyB8tYQ)

## あとがき

このカラーシステム設計を0から調べて、手を動かして...ってやるのは超大変で、多くの人にとっては不要なプロセスがほとんどかなと思います。目先の課題や要件、将来像に沿ったものを既存のカラーや設計ツールで行えてしまうのが理想的です。とはいえ少しの要件を考慮しようとすると、ど真ん中んい適合するツールは中々なく、最後は目を信じて色を扱う必要が出てきます。

このnoteの中で少しでも将来的な課題を楽にするヒントが与えられていたら幸いです。

### SNSフォローしてね & コーヒー奢ってください☕️

noteの執筆&登壇資料作成で1ヶ月間週末篭ってたので、コーヒーを奢ってくれる方お待ちしてます〜 ☕️ 😋

🐦：[Twitter（@jirosh1998）](https://twitter.com/jirosh1998)

🍱：[Bento(Profile Links)](https://t.co/iEC2eZuxpR)

## 参考文献 📖

本文中に掲載されているもの、そうでないものを含めて色の設計をするにあたって読み漁った中で参考になった文献を掲載しておきます。先人の知恵よありがとう…

### 色の基本

- [デザイナーじゃなくても知っておきたい色と配色の基本(baige inc)](https://baigie.me/officialblog/2021/01/27/color_theory/)

### カラーパレット・制作事例（海外）

[ ](https://polaris.shopify.com/design/colors)[** Color — Shopify Polaris **](https://polaris.shopify.com/design/colors)[ ](https://polaris.shopify.com/design/colors)[* Color has purpose *](https://polaris.shopify.com/design/colors)[ ](https://polaris.shopify.com/design/colors)[* polaris.shopify.com *](https://polaris.shopify.com/design/colors)[ ](https://polaris.shopify.com/design/colors)

[ ](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)[** Designing Systematic Colors **](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)[ ](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)[* How to make themable, flexible, WCAG 2.1 compliant color ramp *](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)[ ](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)[* uxplanet.org *](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)[ ](https://uxplanet.org/designing-systematic-colors-b5d2605b15c)

[ ](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)[** Scales – Radix Colors **](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)[ ](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)[* See all accessible color scales that Radix Colors provides. *](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)[ ](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)[* www.radix-ui.com *](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)[ ](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)

[ ](https://stripe.com/blog/accessible-color-systems)[** Designing accessible color systems **](https://stripe.com/blog/accessible-color-systems)[ ](https://stripe.com/blog/accessible-color-systems)[* How we designed a color system with hand-picked, vibrant colo *](https://stripe.com/blog/accessible-color-systems)[ ](https://stripe.com/blog/accessible-color-systems)[* stripe.com *](https://stripe.com/blog/accessible-color-systems)[ ](https://stripe.com/blog/accessible-color-systems)

![](https://www.youtube.com/embed/1DTnojio89Y?rel=0)

[ ](https://www.figma.com/blog/illuminating-dark-mode/)[** Illuminating dark mode | Figma Blog **](https://www.figma.com/blog/illuminating-dark-mode/)[ ](https://www.figma.com/blog/illuminating-dark-mode/)[* The hidden challenges of a (seemingly) simple request *](https://www.figma.com/blog/illuminating-dark-mode/)[ ](https://www.figma.com/blog/illuminating-dark-mode/)[* www.figma.com *](https://www.figma.com/blog/illuminating-dark-mode/)[ ](https://www.figma.com/blog/illuminating-dark-mode/)

- [Creating the Goldman Sachs Color Design System (Goldman Sachs Design System)](https://design.gs.com/foundation/color-system/creating-the-system)
- [Adobe Spectrum](https://spectrum.adobe.com/page/color-fundamentals/)
    - [Adaptive Color in Design Systems(Adobe)](https://medium.com/thinking-design/adaptive-color-in-design-systems-7bcd2e664fa0)
    - [Introducing Adaptive Color Palettes (Adobe)](https://medium.com/thinking-design/introducing-adaptive-color-palettes-111b5842fc88)
    - [Adaptive Color in Spectrum, Adobe’s Design System (Adobe)](https://medium.com/thinking-design/adaptive-color-in-spectrum-adobes-design-system-feeeec89a2c7)
- [Color within Constraints (Lyft)](https://medium.com/tap-to-dismiss/color-within-constraints-d6f777a3b72d)
    - [Re-approaching Color（LyftによるColorBox設計の裏側）](https://design.lyft.com/re-approaching-color-9e604ba22c88)
- [Remaking Color for Indeed’s Design System](https://indeed.design/article/remaking-color-for-indeeds-design-system/)

### カラーパレット・制作事例（国内）

[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)[** 「Ameba」15年の負債を払拭するカラーパレットのメソッド | CyberAgent Developers Blog **](https://developers.cyberagent.co.jp/blog/archives/26754/)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)[* 今年で16周年を迎える「Ameba」では、プロダクト再興の礎を構築しようとデザインシステムの開発をスタートしました。そのな *](https://developers.cyberagent.co.jp/blog/archives/26754/)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)[* developers.cyberagent.co.jp *](https://developers.cyberagent.co.jp/blog/archives/26754/)[ ](https://developers.cyberagent.co.jp/blog/archives/26754/)

[ ](https://developers.cyberagent.co.jp/blog/archives/23447/)[** プロダクトの「色」と向き合う「デザインとエンジニアリング」 | CyberAgent Developers Blog **](https://developers.cyberagent.co.jp/blog/archives/23447/)[ ](https://developers.cyberagent.co.jp/blog/archives/23447/)[* UXエンジニアの谷です。 「クリエイターHangout」はデザイナー数名のグループで構成される社内の ... *](https://developers.cyberagent.co.jp/blog/archives/23447/)[ ](https://developers.cyberagent.co.jp/blog/archives/23447/)[* developers.cyberagent.co.jp *](https://developers.cyberagent.co.jp/blog/archives/23447/)[ ](https://developers.cyberagent.co.jp/blog/archives/23447/)

- [デジタル庁](https://www.digital.go.jp/policies/servicedesign/designsystem/20230531-2)
- [GMO Pepabo Design](https://design.pepabo.com/inhouse/flavors/color/)
- [SmartHR Design System ｜色](https://smarthr.design/basics/colors/)
- [スタディサプリのプロダクトを横断したデザインシステムを作る（デザイントークン編）](https://blog.recruit-productdesign.jp/n/nad86f59e2e1f)
- [デザインシステムに採用する色を決める5つのルール](https://yasuhisa.com/could/article/design-system-colors/?utm_content=buffer550e0&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)
- [デザインシステムにおける色の命名ルール](https://yasuhisa.com/could/article/design-sytem-color-name/)

### 色に関する専門的な文献

[ ](https://jamie-wong.com/post/color/)[** Color: From Hexcodes to Eyeballs **](https://jamie-wong.com/post/color/)[ ](https://jamie-wong.com/post/color/)[* If you're curious about rainbows, colorimetry, gamma encoding *](https://jamie-wong.com/post/color/)[ ](https://jamie-wong.com/post/color/)[* jamie-wong.com *](https://jamie-wong.com/post/color/)[ ](https://jamie-wong.com/post/color/)

- [Color Spaces by Bartosz Ciechanowski](https://ciechanow.ski/color-spaces/)（色空間について）
- [Perceptually uniform color spaces](https://programmingdesignsystems.com/color/perceptually-uniform-color-spaces/index.html)
- [The "dark yellow problem" in design system color palettes（濃い黄色問題について）](https://uxdesign.cc/the-dark-yellow-problem-in-design-system-color-palettes-a0db1eedc99d)

### そのほか

[ ](https://techblog.jmdc.co.jp/entry/20231214)[** デザインシステムめっちゃ見る③-1 カラー編 (前編) - JMDC TECH BLOG **](https://techblog.jmdc.co.jp/entry/20231214)[ ](https://techblog.jmdc.co.jp/entry/20231214)[* こんにちは。株式会社JMDCでヘルスケアプラットフォームサービス【Pep Up】 のフロントエンドエンジニアをしている新保 *](https://techblog.jmdc.co.jp/entry/20231214)[ ](https://techblog.jmdc.co.jp/entry/20231214)[* techblog.jmdc.co.jp *](https://techblog.jmdc.co.jp/entry/20231214)[ ](https://techblog.jmdc.co.jp/entry/20231214)

### お役立ちツイート

趣味でデザインシステムにおけるカラーマネジメントの手法模索してるんだけど、例えばブランドカラーやプライマリーカラーに合わせて”Delete”とかのネガティブ操作色を紫系の赤か橙系の赤にするみたいな自己流ノウハウはあって。赤緑色覚異常でもカラーテーマ単位では機能的意味論がわかるようにはする [pic.twitter.com/JPXtkmTLEi](https://t.co/JPXtkmTLEi)— ぼうくん | VoQn 🎨 (@VoQn) [September 6, 2019](https://twitter.com/VoQn/status/1169889500148858880?ref_src=twsrc%5Etfw)