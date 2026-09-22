---
Created: 2022-09-14T14:54:00
URL: https://zenn.dev/inamiy/articles/f3d34d18c7c213
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[95e9c0757d20-20220913.png]]

こんにちは、[@inamiy](https://twitter.com/inamiy) です。
 今年も [iOSDC Japan 2022](https://iosdc.jp/2022/) (2022/09/10-12) で登壇しましたので `#iwillblog` の感想ブログで締め括りたいと思います。

## Swift アクターモデルと Elm Architecture の融合

7回目の登壇となる今年は、一昨年 2020 年に発表した [SwiftUI 時代の Functional iOS Architecture](https://zenn.dev/inamiy/books/795a2d9e6954abb46878) の続編として、 Elm Architecture に Swift アクターモデルの機能を加えた [**Actomaton**](https://github.com/Actomaton/Actomaton)** という状態管理＋副作用管理フレームワーク** について紹介しました。

当日のデモで紹介したサンプルアプリはこちらになります。

今回の発表内容については、すでに Composable Architecture に慣れ親しんでいる方にとって分かりやすかったという声もあり、例年よりも手応えを感じて一安心しています。

Actomaton を MVVM として簡単に扱う設計方針については、こちらのチュートリアルも合わせてご参照ください。

また、発表の終盤では唐突に Comonadic UI と余代数のキーワードを出して、若干話を盛った感がありますが、今回の発表の裏側を支える理論（関数型とオブジェクト指向の融合論）として頭の片隅に置いてもらえれば幸いです。

## 後日談

当日は時間の都合上、紹介し切れませんでしたが、Actomaton では `Reducer` による単純な再帰計算モデルを採用しており、**必ずしも UI アプリ開発用途にとらわれる必要がなく、基本的にどんな計算でも扱える** のが特徴です。
 例えば、コマンドラインツールとしての **最大並行数付き Web クローラー** を、 `EffectQueue` という仕組みを組み合わせて簡単に実装することができます。

(Actomaton + Python interop + Playwright を使った例)

また、OS プラットフォームや View フレームワークの種類を問わない設計のため、最近話題の [**SwiftWasm**](https://swiftwasm.org/)** + **[**Tokamak UI**](https://github.com/TokamakUI/Tokamak) 上でも期待通りに動作します。

なお、SwiftWasm については、@kateinoigakukun さんの今年の登壇発表が参考になりますので、合わせてチェックしてみて下さい。

## 全体の感想

今年の iOSDC はオフラインとオンラインの同時開催という新しい試みで、私はオンラインで参加させていただきましたが、とても楽しかったです。
 特に今年は Lightning Talk のレベルが高くて、笑いが止まらないものばかりでした。
 SF Symbols で描く `ForEach Hair` と「Xco治郎」の劇に、新たな才能を感じずにはいられません。

あと個人的にとても印象的だった LT が、 Roku さんの [神速iOSDC 〜6年分〜](https://speakerdeck.com/mikiyoshida/shen-su-iosdc-6nian-fen) まとめでした。

6年前の UIKit とリアクティブプログラミング全盛の時代から、 SwiftUI と Swift Concurrency の新しい時代へと移り変わっていく様が、懐かしい思い出アルバムを見ている気持ちになりました。
 自分の興味関心もこの時代の流れを追っているのだと思うと、なおのこと感慨深いものがあります。
 奥の深い Swift / iOS の世界に身を置きながら、エンジニア同士で自由に語り合える環境の有り難さを実感します。

## おわりに

最後に、今回初のオフライン・オンライン同時開催にも関わらず、円滑にイベントを運営して下さったスタッフの皆様に感謝します。
 また、イベントを盛り上げてくれたスピーカーの方々、現地・オンライン参加者の皆様もありがとうございました。
 また次回も参加したいと思います。