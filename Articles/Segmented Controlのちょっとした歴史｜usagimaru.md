---
Created: 2025-01-11T19:02:00
URL: https://note.com/usagimaruma/n/n7f3229b68111
Tags: [topic/デザイン/UIデザイン]
---
![](https://assets.st-note.com/production/uploads/images/169000509/rectangle_large_type_2_36a23cb51567c7a67ac0c8babd73c73e.jpeg?width=1200)

Segmented Control（セグメンテッド・コントロール、分割コントロール）というと、複数のボタンが連なったような見た目をした、カプセル型のコントロールを指しますが、これの始まりは（少なくともそれが「Segmented Control」と命名された起源としては）初期Mac OS Xにあるようです。

「Segmented Control」はその名前が示すように、「分割されたコントロール」です。そもそもUI用語としての「コントロール」とは、ボタンやスライダーなどの、ユーザー操作によって何かしらのアクションを実行できるようデザインされた部品の総称なので、この名前は『なんか分割された、アクションを実行するための部品』くらいのふわっとした説明に留まっています。

そう考えると、「Segmented Control」の名前はなんだかはっきりしなくて不思議に感じられますが、Segmented Controlは他のコントロールよりも広い用途に対応できる汎用性の高いコントロールなので、「ボタン」とか「スイッチ」のような、その性質を一つに言及し切るような命名は避けられたようです。

Segmented Controlの挙動タイプには、セグメントそれぞれが個別にオンオフできる集合スイッチモードと、全体で一つだけが排他選択されるラジオボタンモードと、それぞれがプッシュボタン的に機能するモメンタリーモードがあります。さらに、セグメントを長押しするとメニューを表示するような派生型もあり、一つのコントロールで多様な用途に対応できます。このような多くの用途を想定できるものを「〜スイッチ」とかの名前で言い切るのは、確かに適切ではないようにも思います。

![](https://assets.st-note.com/img/1736212808-Xif2g8h01x3TNaAnZouL7BWk.jpg?width=1200)

ラジオボタン／出典：https://dime.jp/genre/1426002/

macOS（Mac OS X）の開発環境では、Segmented Controlを「NSSegmentedControl」と言います。NSSegmentedControlはMac OS X 10.3 (Panther)で公開APIになりましたが、それ以前からFinderなどではすでに独自に実装されていて、デザイン自体はユーザーにも知られていました。ただ、まだ「Finderのビューセレクタっぽいやつ」「例のスイッチするアレ」くらいの呼ばれ方をされていて、デザインパターンとしては定着していませんでした。

### New Control—“That Switcher Thing”

Pantherが発表されたWWDC 2003の「410 Cocoa Update」セッション内にて、この新コントロールの公開APIがMac OS Xに実装される旨が発表されましたが、まだその正式名称（クラス名）が定まっておらず、当時はデベロッパーから命名のアイディアを募っていたようです。

![](https://assets.st-note.com/img/1736182060-6dLXwJlQWiPknu31ejt2q8sD.jpg?width=1200)

出典：https://web.archive.org/web/20220224235838im_/https://pbs.twimg.com/media/EdozIQJU4AAmjm8.jpg

この時に実際に命名候補を送ったデベロッパーの投稿を見ると、興味深いです。

Oh wow, I've also got the list of submissions here, thank you Eudora. [pic.twitter.com/Q6TtWTV2Sz](https://t.co/Q6TtWTV2Sz)— aaron tuller (@tullera) [July 24, 2020](https://twitter.com/tullera/status/1286453734478774272?ref_src=twsrc%5Etfw)

### Mac OS X Public Beta

![](https://assets.st-note.com/img/1736183471-zs6wB87tkjMfvPHLlSqr35mU.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

Mac OS X Public Beta（v10.0より前のバージョン）のFinderですでにSegmented Controlのようなラジオボタン型コントロールを確認することができますが、まだ採用例は限られていたようです。

### Mac OS X Panther (10.3)

![](https://assets.st-note.com/img/1736183615-8lTkR9NJmSuv5IcnYOExqQ0K.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

![](https://assets.st-note.com/img/1736183739-J8K3yEkoWD7GNbTjPAU2B6zZ.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

![](https://assets.st-note.com/img/1736183619-H8Tke0VPnA6EZMuhB2Xiwrd3.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

![](https://assets.st-note.com/img/1736183637-m2Fp0gjKkazGTOVJscnZD4Pr.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

![](https://assets.st-note.com/img/1736183647-jpg7SBnbAQMo2rIGhCU4kNwR.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

Mac OS X Panther (10.3)になると、Segmented Controlの採用例が一気に増えます。ビューの切り替えを行うラジオボタン型コントロールとしての例や、ブラウザの戻る／進むを統合した分割ボタンが目立ちます。ほぼ現代のSegmented Controlと同じ使い方です。

### Pantherでタブが「プルタブ」ではなくなった

Segmented Controlの用途を考えるのに、タブの存在は無視できないと個人的に考えています。現代の抽象化されたUIの潮流では、以下のイメージのようなカプセル型のタブバーはよく見慣れた表現ですが、Pantherが登場した当時としては、これまでの「プルタブ」のメタファーを無視していて新鮮味がありました。

![](https://assets.st-note.com/img/1736185179-lXotGFsWJArQ9IEC5cU3eT8b.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

Pantherより前のMac OS X Jaguar (10.2)では以下のようなタブバーをしていたので、NSSegmentedControlがデビューしたPantherで同時にプルタブ表現を廃したことは、Segmented Controlとのデザイン統合を意識してのことだったのかもしれません。

![](https://assets.st-note.com/img/1736185397-qGj4EzU8OPY5r2dhFSKBTbit.png?width=1200)

出典：https://512pixels.net/projects/aqua-screenshot-library/

Segmented Controlのデザインは、その後のiOSにも引き継がれていきます。当初Segmented Controlで実装されていたステッパーは、この頃から別のコンポーネント／クラスである「Stepper」として定義されるようになりました。

![](https://assets.st-note.com/img/1736186551-bOEd9sqcvpn0zCx1iar5fAgo.png)

出典：https://www.kodeco.com/2847-user-interface-customization-in-ios-6/page/2

![](https://assets.st-note.com/img/1736191417-Z2V0LWdrgvFA13yTeh45SBOp.jpg?width=1200)

iOS 18の標準的なSegmented Control

![](https://assets.st-note.com/img/1736191580-HwV1tu5KlUI79pORsvbngZ0N.jpg?width=1200)

iOS 18「写真」のカスタムSegmented Control

### その他の資料

以下のメーリングリストを読むと、まだ当時は「スイッチするやつ」と呼ばれていたことがわかります。

**switch thing**

[https://lists.apple.com/archives/cocoa-dev/2003/Oct/msg01191.html](https://lists.apple.com/archives/cocoa-dev/2003/Oct/msg01191.html)

当時のNSSegmentedControl名称候補をランク付けするYouTubeビデオを見つけたので、ついでに紹介しておきます。

![](https://www.youtube.com/embed/SM1c1wL62so?rel=0)