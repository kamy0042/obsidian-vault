---
Created: 2021-01-01T15:43:00
URL: https://qiita.com/erukiti/items/fb7bcbd9d79696579d06
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
[@erukiti](https://qiita.com/erukiti)

2019年09月29日に更新



# **宣言的UIはReact Hooksで完成に至り、現代的設計論が必須の時代になる**

[設計](https://qiita.com/tags/%e8%a8%ad%e8%a8%88)[hooks](https://qiita.com/tags/hooks)[React](https://qiita.com/tags/react)[クリーンアーキテクチャ](https://qiita.com/tags/%e3%82%af%e3%83%aa%e3%83%bc%e3%83%b3%e3%82%a2%e3%83%bc%e3%82%ad%e3%83%86%e3%82%af%e3%83%81%e3%83%a3)[宣言的UI](https://qiita.com/tags/%e5%ae%a3%e8%a8%80%e7%9a%84ui)

この記事は最終更新日から1年以上が経過しています。

この記事は、**ある程度以上の規模**のGUI開発において、React Hooks以後の宣言的UIにより、大規模開発に用いられる設計論に完全に対応できるようになり「ビジネスロジックの変更や追加」に対応するコストを低く保つこと（技術的負債の抑制）ができるようになったことを解説するものです。

技術的負債の抑制には、技術的負債の原因となりがちな「広範囲の密結合」と「適切な疎結合を保つ仕組みの欠如」が欠かせません。それをカバーするのが、大規模開発をクリーンに行える設計論（ここでは「現代的な設計論」とよぶもの）です。[クリーンアーキテクチャ](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)なんかでGUIによく適用される[Humble Object Pattern](http://xunitpatterns.com/Humble%20Object.html)のようにプレゼンテーションとビューを分離する必然性が無くなるでしょう。

ポイントは

- ある程度以上の規模で開発するなら設計論をうまく使い設計しないと、技術的負債を抱え込む（ビジネスロジックの変更や追加に対応するコストが高くなる）
- React Hooks以後の宣言的UIならば完全に設計論に対応できる

です。

もし、貴方のプロダクトがjQueryや他のお手軽なものや、命令的記述によるGUI構築をしていても、ビジネスロジックの変更や追加に**もちろん要件次第ですが**1・2週間といった短いイテレーションで対応できるというのであれば、この記事は「貴方には不要な記事」です。

## [**対象読者**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)

[• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[設計論を熟知しているバックエンドエンジニア](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[今React/Vue/Angularなどを触っている開発者](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[スマートデバイスやデスクトップアプリの開発者](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[クリーンアーキテクチャやDDDなどといった設計論について熟知しているバックエンドエンジニアは、ウェブフロントエンドにも手を広げるチャンスです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[もちろん、現代的なフロントエンドやスマートデバイスやデスクトップアプリで、現代的技術で開発している人たちも同様です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)[React Hooksが今回のキーですが、おそらくすぐ他の環境でも似たようなものが実装・実用化されていくでしょう。React Hooksという特定の実装から始まっていますが、Webや特定ライブラリ・フレームワークに依存しない、GUI開発と設計論の記事です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)

## [**宣言的UIについて**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

[宣言的 "declarative" の反対は、命令的 "imperative" です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[命令的記述によるGUI開発では、何かしらの関数・メソッドなどに、パーツやピクセルを制御する命令を逐一記述します。あるコンポーネントに必要な要素を命令なりプロパティの変更（という形をとった命令）で組み立てていくものです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[それに対して、宣言的記述を用いたGUI開発自体は以前から存在していましたが、この記事でいう](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**宣言的UI**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[とは、GUI開発の主たる部分を宣言的記述のみで完結できるモノという](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**狭義の宣言的UI**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[を指すものとします。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[たとえば、HTML/XUL/XAMLあるいはその他の宣言的記述を使った技術でも、ビューの構築などに](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**命令的記述があるもの**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[はこの記事では対象とはしません。この記事はそういった](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**広義の宣言的UI**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[は対象ではありません。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**Reactなどでも、互換性や既存資産の流用など、命令的記述を用いたコンポーネントは存在しますが例外とします。またこういった場合は、Humble Object Patternが重要になるでしょう。**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[XAML/WPFに言及する方がいらっしゃいますが、狭義の宣言的UIには該当しないと認識しています。もし狭義の宣言的UIに該当するのであればご指摘いただければ幸いです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[XAMLで、標準のWPFのままだと確かに動作コードをタグの中に書く必要がある場合もあると思いますが、](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
Caliburn Micro/PRISM/Livetなど、各種MVVMフレームワークを併用すればほぼ完全な宣言UIが実現できるんじゃないでしょうか。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[というご指摘がありました。筆者としてはそれらMVVMフレームワークで、今回の記事で書いたものに該当するかはわかりませんが、追記しておきます。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**※以下「宣言的UI」といった場合はすべて狭義の宣言的UIを指します。**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

### [**筆者の主張する意見について**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

[筆者の趣旨としては、「Reactが広義的な意味での宣言的UIの元祖」という主張をするつもりではなく、「仮想DOMと宣言的記述を組み合わせることで、現在広く使われるようになった狭義の宣言的UIの流れを作ったのがReactである」という認識です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[また、ReactやFLUXなりReduxや最近のECMAScript言語仕様など、関数型言語からの影響も大きいと認識しております。実際にReact開発元のFacebook社でもReactやJS関連のプロダクトで関数型言語による開発が行われているようですし。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[筆者は関数型言語には全く詳しくも無く、せいぜいScalaを一年程度触った、RxJavaやRxJSを触っていた、HaskellをH本で読んで少し触った程度なので、関数型言語に関してうまく言及できないので、詳しい方には是非とも記事なりを書いていただければ幸いに思います。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**関数型言語界隈で申したい人たちの「感情的ではない」記事を期待しています。**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[Reactのレンダリングの制限や、FLUXがもたらした制限など、狭義の宣言的UIが真にパラダイムシフトである理由は、](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[**制限されている**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)[ことに大きな要素があると考えています。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E7%AD%86%E8%80%85%E3%81%AE%E4%B8%BB%E5%BC%B5%E3%81%99%E3%82%8B%E6%84%8F%E8%A6%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

### [**今のGUIトレンドである宣言的UIという流れ、パラダイムシフト**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E4%BB%8A%E3%81%AEgui%E3%83%88%E3%83%AC%E3%83%B3%E3%83%89%E3%81%A7%E3%81%82%E3%82%8B%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8%E3%81%84%E3%81%86%E6%B5%81%E3%82%8C%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)

[ここまでに述べた通り、現代のGUI開発に広く取り入れられるようになった](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E4%BB%8A%E3%81%AEgui%E3%83%88%E3%83%AC%E3%83%B3%E3%83%89%E3%81%A7%E3%81%82%E3%82%8B%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8%E3%81%84%E3%81%86%E6%B5%81%E3%82%8C%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[**宣言的UI**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E4%BB%8A%E3%81%AEgui%E3%83%88%E3%83%AC%E3%83%B3%E3%83%89%E3%81%A7%E3%81%82%E3%82%8B%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8%E3%81%84%E3%81%86%E6%B5%81%E3%82%8C%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[というパラダイムシフトがあります。この流れは、Facebook社が開発した](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E4%BB%8A%E3%81%AEgui%E3%83%88%E3%83%AC%E3%83%B3%E3%83%89%E3%81%A7%E3%81%82%E3%82%8B%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8%E3%81%84%E3%81%86%E6%B5%81%E3%82%8C%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[React](https://reactjs.org/)に端を発するものです。

宣言的UIはVue.jsやAngular、あるいはAndroid開発フレームワークでも当たり前のように使われています。

2019年6月はじめに開催されたAppleの開発者イベントであるWWDC 2019では、Appleもついに[SwiftUI](https://developer.apple.com/xcode/swiftui/)によって宣言的UIを導入したとして大きく話題になりました。このとき、もちろんReactの影響について数多く語られていました。

Reactがもたらした宣言的UIの新たなる価値と、Reactが宣言的UIを打ち立ててから5年の歳月でたどり着いたさらなる境地であるReact Hooksについて、どうしてそれがGUI開発における、新たなシフトになるのか？について記します。

もし、ここが分かりにくいという感想や、疑問・ツッコミなどありましたら、お気軽にコメントなどいただければ幸いです。随所で反応があり、とてもありがたいです。

## [**GUI開発は複雑さによる屍山血河の歴史である**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)

[Xeroxのパロアルト研究所で生み出されたGUIは現代に広く浸透しています。デスクトップアプリも、スマートフォンのアプリも、WebアプリもGUIです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)[ところが、GUI開発に用いられるアーキテクチャは、一番素朴なMVCから現代の改良されたどれも、大なり小なり](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)[**密結合**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)[になり](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)[**複雑化**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)[するという問題がありました。これは技術的負債として積み上がるものです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)

[詳しくはちょうど技術的負債の原因潰すために、先ほど](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#gui%E9%96%8B%E7%99%BA%E3%81%AF%E8%A4%87%E9%9B%91%E3%81%95%E3%81%AB%E3%82%88%E3%82%8B%E5%B1%8D%E5%B1%B1%E8%A1%80%E6%B2%B3%E3%81%AE%E6%AD%B4%E5%8F%B2%E3%81%A7%E3%81%82%E3%82%8B)[知識の露出・共有を適切にしてクリーンな設計をしよう](https://qiita.com/erukiti/items/82fb4982c53b6928bd92)という記事を公開したので、詳細はそちらをご覧ください。この宣言的UIの記事と対になる大切な記事です。

もちろんMVCの問題点を様々なアプローチから改善していこうという流れはありましたが、どれもこの問題を解決しきれていませんでした。理由はアーキテクチャやライブラリ・フレームワークなどの要因により、適切な境界線を引くことが出来なかったことにあります。

宣言的UIはその問題を解決に導くパラダイムです。

## [**Reactがもたらした宣言的UIというパラダイム**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8%E3%81%84%E3%81%86%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0)

[先日開催された builderscon Tokyo 2019で sonatard さんが発表した ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8%E3%81%84%E3%81%86%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0)[宣言的UI](https://speakerdeck.com/sonatard/xuan-yan-de-ui)というスライドが、宣言的UIとは何か？という説明と、宣言的UIの歴史についてまとまっています。

元々この記事を書こうと思ったきっかけはbuildersconの感想ブログのつもりでしたが、自分なりに宣言的UIのもたらす価値について再考した結果、設計論と切っても切れないと考え、この記事を書き起こしました。

### [**宣言的な記述によるシンプルさ**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)

[一世を風靡したjQueryは命令的記述の代表例とも言えます。もちろんjQueryで宣言的UIを行えるライブラリを構築することは可能でしょうが、そこまでしているような事例は現実的ではないと思っています。もしjQueryで宣言的UIを行えるライブラリがあれば教えていただければ幸いです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[**※もちろん今でもjQueryが便利な局面はあります。技術的負債を気にせずに命令的UIを書ける環境、たとえばペライチのページ作成などにおいては、十分役立つでしょう。それを否定する気は全くありません。適用ジャンルが異なるものです。**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)

[`const btn = $('button')
btn.on('click', () => {
  if (this.color === 'red') {
    btn.removeClass('red')
    btn.addClass('blue')
    this.color = 'blue'
  } else {
    btn.removeClass('blue')
    btn.addClass('red')
    this.color = 'red'
  } 
})
`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[命令的UIがどのようなものかはこのコードを見ればわかると思います。コンポーネント化したりするのも面倒で些末なので、](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[`this.color`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[ってなに?とかは置いておいてください。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[**※ただ、筆者はjQueryをあまり触ってないので、よりよい書き方があれば提示していただけると助かります**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[Reactで書き直してみましょう。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)

[`  handleClick() {
    const color = this.state.color === 'red' ? 'blue' : 'red'
    this.setState({ color })
  }
  render() {
    return <button 
      className={`btn ${this.state.color}`}
      onClick={() => this.handleClick()} />
  }
`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[こちらも本筋に関係ないところは省略しています。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[Reactでは、コンポーネントクラスの](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[`render`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[メソッドは、与えられたプロパティやステートによって、React.ElementのDSLであるJSXという値を返すだけの関数です。決して命令を並べるのではなくて、表示に必要な要素は、](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[**演算（コンピュータによる演算なので文字列の結合・展開も含むもの）**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[のみで行われています。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)

[この仕組みは仮想DOM（とほぼ類似する）内部実装により、JSXから実際のHTMLへのレンダリングが高速化されていることがとても大切なポイントです。むしろこういった](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%AA%E8%A8%98%E8%BF%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%95)[魂の震える処理方法](https://qiita.com/mizchi/items/4d25bc26def1719d52e6)により、速度の為に開発者が詳細を操作する理由が無くなりました。

**※ReactはDOMそのものを対象としていませんし、厳密には仮想DOMそのものではありませんが、記事では以下、全て仮想DOMと呼びます。**

繰り返しになってしまいますが、筆者がなぜ「Reactが今の宣言的UIブームを切り開いた」と主張しているのか？は以下の通りです。

広義の宣言的UIはReactより以前から存在していましたが、Reactではビュー更新を`render`メソッドやコンポーネント関数に制限し、仮想DOMと組み合わせることで、**狭義の宣言的UIを現実的な速度で実現出来るようにしたことが新規性**です。

- Reactのレンダリング方法は明確にルール化されて、**制限**されている
    - `render`メソッドかコンポーネント関数が、**JSX（React.Element）を返す**という仕組みのみ
- 仮想DOMによりこのやり方でも現実的な速度がでるようになっている

さて、宣言的UIにより、sonatardさんのスライドの表現では「時間軸から解放された」とあるように、以前のDOMの状態にアクセスする必要性が無くなりました。命令的UIでは、`btn`が`red`だったかどうかなどの過去の状態を引きずっているため、それを考慮する必要がありましたが、宣言的UIでは、ボタンが過去にどのような状態を持っていたかを**完全に無視**できます。

状態はプロパティやステートだけが持っていればいいのです。**状態管理と実際のDOMが切り離されました。**

宣言的UIが命令的UIよりも、ロジカルな仕組みに移行したことがわかると思います。ただし、これだけではまだいくつかパーツが足りません。

### [**FLUXアーキテクチャがもたらしたステート管理のパラダイムシフト**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)

[React単体ではステート管理という問題点が残ります。MVVMのようなアーキテクチャが度々抱えるコンポーネント間接続の問題が解決できていません。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[そこでReact開発元のFacebook社はステート管理をシンプルにするためにFLUXというアーキテクチャを発表しました。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[FLUXアーキテクチャは、MVCやそれに連なる様々なアーキテクチャが持っていた複雑性を解決するために、いくつかの制約を設けています。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
1. ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[データモデル（ステートを貯めるストア）と、ビューは完全に分離されている](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
2. ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[データモデルの更新は、更新専用のプレーンオブジェクト（アクションと呼ぶ）を、ディスパッチャに投げるだけ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
3. ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[アクションは、アクションクリエイタによって生成される](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
4. ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[ビューは、データモデルに応じてリアクティブに書き換わる](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
5. ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[結果として、データおよび制御の流れは一方通行である](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[既存のモデル・ビュー・コントローラ（やビューモデル）の類いはそれぞれが複雑強固に接続されていました。それぞれのパーツは多対多で接続され、データや制御の方向性も秩序がなく、密結合や相互依存・循環依存といった問題に悩まされ続けていました。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[FLUXではストアとビューは完全に分離されています。ストアの更新は、ディスパッチャにアクションと呼ばれるプレーンなオブジェクトを投げることで、ストア自体がそれを解釈してステート（コンポーネントがもつステートとは別物）を更新します。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[ディスパッチャはインターフェース分離原則を使い、ストアとも分離可能なものです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[ストアのステートが更新されると、それがトリガーとなって、ビューに新たな値が渡ります。この仕組みはReactのような宣言的UIかつ仮想DOMだからこそできるものです。ビューは新たな値を元にJSX（React.Element）を再生成し、仮想DOMが現実的な速度で、再レンダリングします。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[ディスパッチャ・ストアや、ストアがビューに新たな値を渡す仕組みなどは、SOLID原則などを駆使することでクリーンな設計が可能ですし、それらはライブラリが勝手にやってくれるものなので、それを利用する人はいちいち命令を記述する必要はありません。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)

[これら、ステート管理の革命に関しては数年前に筆者が書いた](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#flux%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%97%E3%81%9F%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E7%AE%A1%E7%90%86%E3%81%AE%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88)[React+Redux入門 - Qiita](https://qiita.com/erukiti/items/e16aa13ad81d5938374e)を読むといいかもしれません。（もちろん古くなっているため参考程度にとどめてください）

実際にFLUXアーキテクチャ類似のReduxは王座を保ち続けています。少なくともReact界隈ではReact+Reduxという組み合わせは鉄板でしたし、ReduxはReactに一切依存していないため、他のビューライブラリでもReduxが使われることもありましたし、Reduxによく似たステート管理アーキテクチャも随所で使われています。

React Hooksにより、必ずしもReduxを使う必要性は無くなった段階ではありますが。

さて、このようなとてもシンプルな概念だけで、過去のGUIアーキテクチャのどれもがはらんでいた、ビュー、モデル、コントローラや、ビューコントローラといったパーツの相互依存・循環依存という極めてやっかいな問題が片付きました。

**※この記事では触れませんが、FLUX/Reduxは循環依存なしに設計・実装が可能です。**

- 宣言的UIでかつ仮想DOMを持つReact
- 宣言的UIを前提として、ステート管理をとてもシンプルにしたFLUXアーキテクチャ（Reduxなど）

この2つがもたらされて、現実的な速度で動きつつ複雑さから開放されるようになりました。

もし仮想DOMを用いた宣言的UIがなければ、FLUXアーキテクチャの実現はかなり大変です。速度の面で問題が出るか速度の為に、とても高度な命令を並べることになるでしょう（そしてそれは宣言的UIを作るのとおそらく変わらないはずです）。これが宣言的UIの記事でFLUXアーキテクチャに言及する重大な理由です。

**※Haskellは別途触っていたものの、Elmは名前は聞いたことしかなく、Elmについて語れない事についてはご容赦ください。きっと誰かがElmのこと書いてくれるはずです**

### [**関数型コンポーネントでいいのでは？？？**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)

[React（仮想DOMおよび宣言的UI）とFLUXアーキテクチャのような制限されたステート管理の仕組みを使えば、Reactのコンポーネントは受け取った引数に応じてJSXを返すだけの](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[**純粋関数**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[でも実現でき、簡単にユニットテストを書けますし、バグの発生を減らせられます。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)

[`interface Props {
  color: 'red' | 'blue'
  onClick: (color: string) => void
}

const HogeButton: React.FC<Props> = ({ color, onClick }) => {
  function handleClick () {
    onClick(color === 'red' ? 'blue' : 'red')
  }
  return <button 
    className={`btn ${color}`}
    onClick={onClick} />
}
`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[このコードは、色と、クリック色が変更した事を通知する関数を、コンポーネント関数 ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[`HogeButton`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[ に渡します。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[関数型コンポーネントには、ライフサイクルメソッドと呼ばれるものを実装する方法や、コンポーネントがステートを持つべきときでも、持つための方法がありませんでした。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[**そもそも純粋な関数なので副作用を持つ処理を記述できません**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)[これを解決する苦肉の策として高階関数を駆使する関数型言語的解決方法が流行りましたが、Reactチームは、React Hooksという、より根本的な解決方法をもたらしました。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%A7%E3%81%AF)

### [**React Hooks**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)

[React Hooksは関数型コンポーネントでのみ使えるもの（Hooks関数）です。関数型コンポーネントに、Hooks関数でステート利用や副作用（一部のライフサイクルメソッド相当）を宣言できる仕組みです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[Facebook社は、React Hooksとは宣言的UIに立ち戻るものであると定義しています。Hooks関数でコンポーネント関数に、](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[**様々な宣言をコールバックという形で入れられる**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[からです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)

[`interface Props {
  color: 'red' | 'blue'
}

const HogeButton: React.FC<Props> = ({ color: defaultColor }) => {
  const [color, setColor] = React.useState<'red' | 'blue'>(defaultColor)
  function handleClick () {
    setColor(prevColor => prevColor === 'red' ? 'blue' : 'red')
  }

  return <button 
    className={`btn ${color}`}
    onClick={handleClick} />
}
`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[Hooksを使わない関数型コンポーネントとは違って、自前でステートをもてるので、クラス型コンポーネントで書いていたのとほとんど同様のことができるようになっています。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[React Hooksはただの関数という](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[**本来コンテキストを持たないもの**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[に、コンポーネントを管理するReactライブラリ本体の特権を活用して、コンテキストを注入することができます。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[ただしReact Hooksを正しく活用するためには考え方を大きくシフトしなければいけません。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[Hooksでは、コンポーネント関数は何度も繰り返し呼び出されます。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[コンポーネント関数そのものは、与えられたデータから、JSXを生成するだけの、軽量な純粋関数とする](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[**コンポーネント関数そのものには**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[、重い演算や複雑な処理を、直接記述してはいけない](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[**コンポーネント関数そのものには**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[、副作用を、直接記述していはいけない](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[「](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[**コンポーネント関数そのものには**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[」と書いているのは、Hooks関数によってコールバックを宣言することで、重い処理や複雑な処理、副作用を全てコールバック関数に実装すべきだからです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[コンポーネント関数は何度も繰り返し呼び出されるため、Hooks関数ではメモ化というテクニックが多用されています。メモ化はキャッシュの一種だと考えてください。競技コーディングでもおなじみのテクニックですが、動的計画法や特定の数学計算アルゴリズムなどとは用途が異なり、コンポーネント関数が何度も呼び出されるときに速度問題を緩和する仕掛けとしてのみ使っています。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[React HooksではHooks関数を使いUIコンポーネントから、ロジックや外部通信などを宣言という形で適切に切り離しました。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[カスタムフックというHooks関数を自作する仕組みが重要です。カスタムフックにより、より責務に適した形に自由に切り分けられるようになりました。これが大規模開発に必須の設計論に対応できるようになった最後のキーです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)

[React Hooksについては説明が長くなるため、詳しいことは、](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#react-hooks)[Effective React Hooksという本の電子版をPixiv Booth](https://tk-rabbit-house.booth.pm/items/1477000)で販売しています。また大幅改訂バージョンの物理本を、[技術書典7で頒布予定](https://techbookfest.org/event/tbf07/circle/5669342192599040)ですので、そちらをご覧ください。

## [**宣言的UIとHooksがもたらすパラダイムシフトの真価とは**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)

[筆者は（狭義的な）宣言的UIがReact Hooksによって完成に至ると考えています。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[React Hooksでは、](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[UIコンポーネントは純粋関数になる](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[UIコンポーネントは純粋関数ではあるが、宣言を別途記述、追加できる](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[UIコンポーネント関数は純粋関数であるためユニットテストが簡単に記述出来る](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[カスタムフックは、少しコツが必要なもののユニットテストを記述できる](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
• ](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[Hooks関数およびカスタムフックにより、責務に応じた任意の分割を行える](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[という特徴があります。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[繰り返しますが最後の項目が一番大切なことです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[本来GUIでは、分割というのは、時間軸・性能やライブラリ・フレームワークの都合といった、外部的要因により、分割ないし結合させられていましたが、React Hooksでは設計者が主体となって境界線を引かなければなりません。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[油断をすると](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[`useEffect`](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[など多数のHooks関数とそのコールバックを愚直に詰め込んだ、巨大コンポーネント関数がいとも簡単に誕生してしまいます。もちろんそれはアンチパターンです。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[一部の強いフレームワーク（RoRなど）といった例外を除けば、フロントエンド以外での開発では当たり前の話です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[**（React Hooksやあるいは同様の機能を持った）宣言的UIでは、GUI開発で、ライブラリやフレームワークの都合に左右されることなく、任意の境界線を引き、どことどこを結合するかを、自由に設計できるようになります。**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[境界線を引くのはアーキテクトや設計者の大切なお仕事です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[ステート管理をReduxに任せるのか、あるいは他の方式に任せるのか、個々のコンポーネント関数にステートを持たせるか持たせないか？なども全て任意に選択可能です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[SOLID原則などの設計論、DDDや、さらに推し進めた集大成であるクリーンアーキテクチャなど、GUI以外の世界では当たり前だった、現代の設計論に適合したものを記述できるようになります。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[むしろ、そういった設計論についていけない技術者は、今後の大規模GUI設計では足を引っ張るかもしれません。これはフロントエンド界隈以外で、現代の設計論を知らない・できない人たちが](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[**老害**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)[と呼ばれるのと全く同じ現象で、それがフロントエンドにも到来するというだけの話です。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E8%A8%80%E7%9A%84ui%E3%81%A8hooks%E3%81%8C%E3%82%82%E3%81%9F%E3%82%89%E3%81%99%E3%83%91%E3%83%A9%E3%83%80%E3%82%A4%E3%83%A0%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E7%9C%9F%E4%BE%A1%E3%81%A8%E3%81%AF)

## [**まとめ**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E3%81%BE%E3%81%A8%E3%82%81)

[**既存のGUI開発にはライブラリやフレームワークの都合による線引きがありましたが、React Hooksによって狭義の宣言的UIというGUI作成パラダイムが次の段階に至り、任意の境界線を引けるようになり、開発者が、適切な責務分割をする義務を請け負うようになりました。**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E3%81%BE%E3%81%A8%E3%82%81)

[適切な責務分割、境界線の引き方、というまさに](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E3%81%BE%E3%81%A8%E3%82%81)[クリーンアーキテクチャ本](https://www.amazon.co.jp/dp/B07FSBHS2V)に書かれている、クリーンな設計で必須となる概念が、GUI開発でも重要になります。

- 関連記事
    - [Clean Architectureは全てのプログラマにお奨めしたい良著](https://note.mu/erukiti/n/n36fee4a014d9)
    - [クリーンアーキテクチャ本を読むためのポイント](https://note.mu/erukiti/n/naed6e8c9e31a)
    - [よくわかるSOLID原則1: S（単一責任の原則）](https://note.mu/erukiti/n/n67b323d1f7c5)

これは、今までGUI開発にあまり興味を持っていなかった技術者には福音です。DDDやクリーンアーキテクチャといった、設計論について意識が高い技術者には、**特に現代フロントエンド**こそが貴方の目指すべきポイントであると言っておきましょう。現代フロントエンドは決してオモチャではありません。あなた方の領域と現代フロントエンドは完全に混じり合っています。

幸いにも、最先端の静的型付け言語であるTypeScriptと、類を見ない強力さを持ちつつ超軽量なIDEであるVSCodeがあります。これらはバックエンドエンジニアにこそおなじみの技術です。

さらにいうと、あと少しでIEが撲滅されることもあり、ウェブフロントエンドにおけるバッドノウハウをも今後は減っていきます。（最悪、詳しい人を1人でも2人でも雇いましょう）

また、現代フロントエンド技術にうまく適合できているフロントエンドエンジニアの皆さんも、ご自身の価値がさらに高まることになります。

**※もちろん、AndroidやiOSなどのスマートデバイスのアプリ開発も同様です。（言及していなくて申し訳ありません）**

宣言的UIも、設計論も、どちらも学んで損はありません。今後も長く使われる本物のパラダイムです。

これは、技術の移り変わりが激しいとされてきたウェブフロントエンドを6年以上戦いぬき今でも世界で最も使われているReactが既に実証しています。

### [**謝辞**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E8%AC%9D%E8%BE%9E)

[もし、ここ分かりにくいという感想や、疑問・ツッコミなどありましたら、お気軽にコメントなどいただければ幸いです。適宜追記・編集など行います。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E8%AC%9D%E8%BE%9E)[
](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E8%AC%9D%E8%BE%9E)[方々での感想など、どうもありがとうございます。皆さんのおかげ、記事の内容がブラッシュアップできたと思います。](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E8%AC%9D%E8%BE%9E)

### [**宣伝**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E4%BC%9D)

[技術書典7では東京ラビットハウスというサークルで「TypeScriptとクリーンアーキテクチャで、最高の開発者体験をしよう！」と「Effective React Hooks改訂版」という2冊の本を出す予定です。ご興味有れば](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06#%E5%AE%A3%E4%BC%9D)[サークルチェック](https://techbookfest.org/event/tbf07/circle/5669342192599040)お願いします。

技術書典7にお越しいただいた皆様ありがとうございました。

- [Effective React Hooks - 東京ラビットハウス - BOOTH](https://tk-rabbit-house.booth.pm/items/1477000)
- [東京ラビットハウス - BOOTH](https://tk-rabbit-house.booth.pm/)

技術書典7で出した本のPDF電子版を、Pixiv Boothで頒布しております。よろしければどうぞ。

[**編集リクエスト**](https://qiita.com/drafts/fb7bcbd9d79696579d06/edit)

[**618**](https://qiita.com/erukiti/items/fb7bcbd9d79696579d06/likers)





[**@erukiti**](https://qiita.com/erukiti)

React/TypeScript/VSCodeやメタプロが好きです。元々バックエンドエンジニア経験および、UNIX/Win32ネイティブアプリ開発経験の方がフロントエンド経験より遙かに長いので、フロントエンド初心者です。

**ユーザー登録して、Qiitaをもっと便利に使ってみませんか。****
1. ****あなたにマッチした記事をお届けします****ユーザーやタグをフォローすることで、あなたが興味を持つ技術分野の情報をまとめてキャッチアップできます****便利な情報をあとで効率的に読み返せます****気に入った記事を「ストック」することで、あとからすぐに検索できます**[****](https://help.qiita.com/ja/articles/qiita-login-user)[**より詳しく**](https://help.qiita.com/ja/articles/qiita-login-user)[登録する](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Ferukiti%2Fitems%2Ffb7bcbd9d79696579d06&realm=qiita)[ログインする](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Ferukiti%2Fitems%2Ffb7bcbd9d79696579d06&realm=qiita)