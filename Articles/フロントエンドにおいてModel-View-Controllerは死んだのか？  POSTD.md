---
Created: 2021-01-15T20:19:00
URL: https://postd.cc/is-mvc-dead-for-the-frontend/
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![](https://cdn-images-1.medium.com/max/800/1*ZByyohMUALGVRHbMX9739Q.png)

多くのフロントエンド開発者が

[一方向のアーキテクチャ](http://staltz.com/unidirectional-user-interface-architectures.html)

を採用し始めている中で、Model-View-Controller（MVC）に未来はあるのでしょうか。

状況を把握するために、まずはフロントエンドのアーキテクチャの進化を振り返ってみたいと思います。

過去4年にわたり、私は多数のWebプロジェクトに取り組み、フロントエンドの構築、そしてフロントエンドとフレームワークの統合に多くの時間を費やしてきました。

2010年以前は、従来のウェブサイトにDOM操作を追加する場合は大抵JavaScript（*jQuery*が書かれたプログラミング言語）が使用されていました。当時の開発者はアーキテクチャ自体についてはそれほど気に掛けていなかったと思います。コードベースを構造化する場合、[Revealing module pattern](https://toddmotto.com/mastering-the-module-pattern/#revealing-module-pattern)のようなものがあれば十分でした。

現在、多くの議論が交わされているフロントエンド対バックエンドアーキテクチャのような構図が持ち上がってきたのは、せいぜい2010年後半からです。時期的には、開発者が*シングルページアプリケーション*のコンセプトに真剣に取り組み始め、[Backbone.js](http://backbonejs.org/)や[Knockout.js](http://knockoutjs.com/)のようなフレームワークが普及し始めた頃になります。

当時、これらのフレームワークの基礎となる原則の多くは、まったく新しいものであり、設計者たちは構築する際に、参考として他の場所に目を向ける必要がありました。そこで、サーバサイドのアーキテクチャとしてすでに確立されていた慣行を拝借したのです。その頃、人気のあったすべてのサーバサイドのフレームワークは、従来的な[MVC](https://ja.wikipedia.org/wiki/Model_View_Controller)モデル（[その派生形は](https://www.quora.com/What-are-the-main-differences-between-MVC-MVP-and-MVVM-design-patterns-for-the-JavaScript-developer)MV**という名前でも知られています）の実装が何らかの形で関係していました。

[React.js](https://facebook.github.io/react/)が最初に[レンダリングライブラリ](http://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library#answer-148788)として導入された時、多くの開発者たちは、JavaScriptでHTMLを扱う方法が直感に反していると言って、それを嘲笑しました。しかし彼らはReactがもたらす最も重要な貢献を見落としていました。それが**Component Based Architecture**（コンポーネントをベースにしたアーキテクチャ）です。

コンポーネントを発明したのはReactではありませんが、Reactはコンポーネントのアイデアを一歩前進させました。

アーキテクチャにおける主要なこのブレークスルーは、FacebookがReactを “V in the MVC（MVCのV）” として宣伝した時、彼らでさえ見過ごしていたものです。

ちなみは、私は今でも[Angular 1.xとReactの両方が連携する](https://github.com/ngReact/ngReact)コードベースを見直した後は、散々な思いをしています。

2015年、私たちの考え方に一大革新が起こりました。それは、慣れ親しんできたMVCのパターンから、[Redux](https://github.com/reactjs/redux)や[RxJS](https://github.com/Reactive-Extensions/RxJS)のようなツールがサポートする、FluxとFunctional Reactive Programmingに基づいた**一方向アーキテクチャとデータフロー**へのシフトです。

## MVCの何が悪かったのか

MVCは恐らく現在でもサーバサイドを扱うベストな方法でしょう。[Rails](http://rubyonrails.org/)や[Django](https://www.djangoproject.com/)のようなフレームワークも使い勝手は悪くありません。

問題は、MVCがサーバに導入する原則と分離がクライアント側と同じではないことです。

### Controller-Viewの連携

以下の図は、ViewとControllerがサーバ上でどのようにやり取りしているかを示しています。ViewとControllerの間にはタッチポイントが2つしかなく、どちらもクライアントとサーバの境界を越えています。

![](https://cdn-images-1.medium.com/max/800/1*QBsB-PGwkeKzjSbhulXqrQ.png)

クライアントでMVCに移動すると問題が発生します。Controllerがいわゆる “CodeBehind” に類似しているのです。ControllerはViewに大きく依存しており、フレームワークの実装においては、Viewによって作成されることもよくあります（例えば、Angularのng-controllerの場合）。

![](https://cdn-images-1.medium.com/max/800/1*BkoTjy0_y50zXIkaS5XFmA.png)

さらに、[Single Responsibility Principle（単一責任の原則）](http://www.oodesign.com/single-responsibility-principle.html)を念頭に置くと、これは明らかにその原則を破っていることになります。クライアントのControllerのコードが、一定のレベルにおいて**イベントハンドリング**と**ビジネスロジック**の両方を処理しているからです。

### Fat Model

クライアント側のModelに格納するような種類のデータについて少し考えてみてください。

一方では、**アプリケーションの状態**を表す*users*や*products*のようなデータがあり、もう一方では、*showTab*や*selectedValue*などのように、**UIの状態**を格納しなければなりません。

**UIの状態とアプリケーションの状態**を分離する方法がないという点では、ModelもControllerと同様、Single Responsibility Principleの原則を破っています。

## コンポーネントはこのモデルのどこに収まるのか

コンポーネントは、ビュー＋イベントハンドリング＋UI状態です。

下の図は、実際、どのように元のMVCモデルを分割し、コンポーネントを取得するのかを示しています。線の上の領域は**アプリケーションの状態**と**ビジネスロジック**の管理であり、正にFluxが解決しようとしているものです。

![](https://cdn-images-1.medium.com/max/800/1*ca_poTSXLLfBvnF2XnJEpA.png)

Reactと

**Component Based Architecture**

の普及により、アプリケーションの状態管理における

**一方向のアーキテクチャ**

が台頭してきています。

この2つの相性がいいのは、それらが典型的なMVCのアプローチを完全にカバーするからです。また、フロントエンドのアーキテクチャを構築する際には、より良い分離を提供します。しかし、これはもはやReactだけの話ではありません。[Angular 2](https://angular.io/)でも、アプリケーションの管理方法には[ngrx/store](https://github.com/ngrx/store)のような別の選択肢があるものの、全く同じパターンが用いられています。

上記と比較すると、MVCのクライアント側における優位性はほとんどありません。それは最初から失敗する運命で、私たちはその過程を見る必要があっただけなのです。約5年をかけて、フロントエンドのアーキテクチャは今ある形へと進化してきました。その時間を、ベストプラクティスが登場するための過程と考えるなら、5年というのはそれほど長い時間ではないと言えるでしょう。

フロントエンドのアプリケーションがより大規模により複雑化し始めた当初、私たちはそれをどのように構築すればいいか分からなかったので、MVCは必要でした。そしてその目的は、あるコンテキスト（サーバ）から適切なプラクティスを取り出し、別のコンテキスト（クライアント）に適用することについての優れた教訓を残しつつ、果たされたと思います。

## 未来には何が待ち受けるのか

フロントエンドのアプリケーション開発において、古典的なMVCアーキテクチャが近い将来、再び台頭するようなことはないと思います。

多くの開発者がコンポーネントと一方向アーキテクチャの利点を見出し始めたことにより、今後の焦点は、それに沿った良質なツールとライブラリの構築に移るでしょう。

こうしたアーキテクチャがこれからの5年にとって最高のソリューションになるのか？　もちろんそのチャンスは十分にあると思います。ただ、繰り返しになりますが、確実なものは何ひとつありません。

5年前には、アプリケーションの開発が現在の形になるとは誰も思わなかったでしょう。だからここで未来を確実視するのは、やめておこうと思います。

以上で終わりです。皆さんがこの記事を楽しんでいただければ幸いです。フィードバックがあれば、ぜひお願いします。