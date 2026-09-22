---
Created: 2021-01-15T18:12:00
URL: https://hachibeechan.hateblo.jp/entry/super-scalable-flutter-architecture
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
## あわせて読みたい

[FlutterでBLoCだChangeNotifierと振り回されて消耗するまえに - タオルケット体操](https://hachibeechan.hateblo.jp/entry/change-notifier-does-not-solve-anything-by-itselfs)

筆者のFlutterに対する印象は半年前にこのエントリーを書いたときから**驚くほどに何も変わっていない**ので、逆にFlutterは非常に明快でわかりやすいライブラリなのかもしれないですね。
[hachibeechan.hateblo.jp](https://hachibeechan.hateblo.jp/entry/flutter-is-great-good-but-dart-is-dirt)

## 筆者の主張の事前まとめ

- Reactの学習は実質Flutterの予習
- クライアントアプリを設計するにあたってはActiveRecordパターンの再発明をしてはいけない
- 結局MVX
- RXSteamとはなんだったのか
- DDDの勉強をすると多くの示唆を得られる
- Remi wareを信じろ

ちなみにここ以下で述べるActiveRecordパターンはPoEEAとRoRのものの混合があるかもしれませんが、利用すべきじゃないという点において同一なので特に問題はありません。
また、サーバーサイドでこのパターンを採用することの可否についても本稿で述べることはしません。

以下に超わかりやすい図解を置きます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hachibeechan/20200829/20200829150057.png)

super-duper-scalable-flutter-architecture

## ActiveRecordパターンの再発明をしてはいけない、とは

筆者のメインフィールドはReactによるWebのフロントエンドでアプリ開発をがっつりやったのはここ半年がほぼ初めてみたいなもんなんですが、SPAの開発は利用しているツールやなんかが違うだけでアーキテクチャ的に求められる思想はモバイルアプリと変わりません。
そして世の中の90%のアプリは、よほど小規模なものでもない限りはこの「ActiveRecordパターンの再発明」という罠をダイナミックに踏みつけて爆死します。

ActiveRecordパターンの再発明とは、簡単に述べるのであれば [Simple app state management - Flutter](https://flutter.dev/docs/development/data-and-backend/state-mgmt/simple) にあるCartModelのようなアプローチのことです。

この例にあるような `XXXModel` というようなクラスは多くの設計で頻出しますが、このようなクラスはアプリケーションの規模が成長するにしたがって以下のような役割を持つことになります

- アプリケーションを流れるデータ構造の記述
- アプリケーションの状態への副作用（ビジネスロジックと呼ばれるものの一部）
- 自身が抽象化しているリソースとの同期（RailsのActiveRecordであればRDBと交信するが、クライアントではhttpで通信することになる）
- 自身をsubscribeしているViewへの更新通知

え……私のモデル、役割持ちすぎ……？
ということでもれなくFat、開発進めばスパゲッティ、毎度ありがとうございますModelクラスの実装でございます。

なおWebフレームワーク界隈ではFatXXXを「ソースコードの行数が多い状態」として捉えて、黒魔術的なやり方で行数を減らすことが横行していたりしますが、見た目上コードが分割されていても極度の密結合や暗黙のinclude地獄に陥っていればそれはFatです。気を付けましょう。

## いかにしてこの四密を避けるのか

ひとつのクラスはひとつの役割を持つ、オブジェクト指向プログラミングの原則ですね。
というわけでこのよっつの役割をそれぞれクラスに分解していきましょう。

1. データ構造はPlain Old Dart ”Immutable" Object、PODIO（JavaでいうPOJOです）として宣言する。
"Immutable" は宣言的UIにとって重要です。
とはいえEquatableが言語標準に組み込まれているSwiftと違ってDartは全部手でやらないといけないですし、FlutterはMutableベースなので恩恵は薄いのですが、筆者はImmutableを「強く」推奨します。等値性比較ができるようになるだけでもマジ大きい。
Equatableを使って自力でやるか、freezedを使うのか、好きなほうを選んでください。
PODIOは、ValueObjectとしての責務に違反しない範囲内であれば振る舞いを持つことが可能です。
例えば `firstName` , `lastName` という属性を持つPODIOが、それらを合わせて返してくれる `fullName` というメソッドを持つのは許されます。
ただしPODIOが自身のvalidityを判断しては**いけません**。
例えばはてなブログを構築するのであれば、 `Article` というPODIOが `isValid` というメソッドを持ってはいけないです。
なぜなら現実世界のアプリにおいてバリデーションはデータ単体で完結することはないからです。
例えば通常の投稿処理においてはタイトルと本文が空の記事は不正だったとします、しかしドラフトの保存、あるいは更新においてはその限りではないでしょう。また、スパム対策に連投防止を入れるのであれば前後のブログ記事の投稿からの経過時間、内容の重複をチェックする必要があります。
他にもブロックリストに入っているユーザーのコメント管理なども必要でしょう。
これらのことを考えて、PODIOはなるべく素朴な実装にとどめておきましょう。
ちなみにPODIO設計でよく悩むケースとして、同じ `User` であっても、 `Admin` や `Me` などによって持っている属性が異なる……というような設計になっているアプリもあるかもしれません。
この場合、多くの人は継承を使って解決するかもしれませんが、今現在DartにはKotlinでいう `sealed class` にあたる機能がないため、派生先の保証を行えず、変更に弱いです。
仕方がないので [freezed | Dart Package](https://pub.dev/packages/freezed) のUnion機能を使って解決しましょう。
2. アプリケーションの状態への副作用は "Behavior" という名前で実装します。
DDDが勉強するそばから内容が頭から抜け出すくらいクッソ複雑なのはこの部分と真摯に向き合っているからです。
ただし難しいことをやると組織的スケーラビリティの確保が難しくなりますし、何より設計した本人が理解できなくなるのでやめましょう。
ここで重要なのは
3. Behaviorは状態を持たない（どこで何回インスタンス化されようがアプリは壊れない）
4. アプリケーションへの副作用はすべてBehaviorに記述される
5. Behaviorはアプリのユースケースの抽象化である、と言い換えることもできる
6. Store（以下で説明します）を変更していいのはBehaviorだけ
7. Viewはシナリオに応じてBehaviorを呼び出すだけ
8. DIとかをうまく使ってテスタビリティには気を付けてね

この原則を守ることです。
これさえ守れば後は割と自由に書いてオッケーです。
具体的な実装方法については [FlutterでBLoCだChangeNotifierと振り回されて消耗するまえに - タオルケット体操](https://hachibeechan.hateblo.jp/entry/change-notifier-does-not-solve-anything-by-itselfs) とかが参考になるとおもいます。
各種メソッドはStoreへの副作用を主な目的とするので基本的に返り値はvoidとなりますが、非同期処理の終了や成否を通知するためにFutureを返してもよいです。

9. 各種リソースとStoreの同期は "Repository" を使って行います。
原理原則とかを述べ始めるとまた色々とあるのですが、以下の原則を守れば極端に破綻することはありません
10. Rest, GraphQL, LocalStorageなどのアクセスはすべてRepositoryを経由して行う
11. トランザクションなどの複雑な要件による抽象化の漏れはある程度許容する
12. 「状態の抽象化」ではなく、「リソースの抽象化」であることを意識する。 例えばDBのリソースからRepositoryのCRUD IFを自動で生成しとこwwwwみたいなのは典型的な負けパターン。 はてなブログのアプリを作るとして「記事の中身をとってくるクエリ」はユースケースやパフォーマンスチューニングなどの要件から数パターンあってもおかしくない。何度でも書くが**DBに対するCRUD操作**みたいな発想にとらわれているとクライアントアプリの設計はスケールしない。というかDBのことは意図的に忘れるべき
13. Viewへの更新通知はObservableを使って行います。Storeと呼びます。
具体的にどのライブラリを使うかは各人好みとかもあるとおもうので好きなものを使いましょう。
ChangeNotifierを使いたい人は筆者のエントリにある `ModelProtocol` （この記事を書いたときはまだModelの重力に魂を惹かれていた）を参考に、そうじゃない方は [state_notifier | Dart Package](https://pub.dev/packages/state_notifier) を使いましょう。
Flutterの `InheritedWidget` に乗せる都合上、Storeは同一context上においてはSingletonであります。また、私のブログやstate_notifierを読めばわかりますが、自身はStateの変更を検知してViewへと通知するためにmutableとなりますが、stateはimmutableです。
ここはFlutterのやり方と相反するところかもしれませんが、リアクティブなアーキテクチャにmutableを持ち込んでもロクなことにはならないので強い気持ちでやり抜きましょう。

Storeはふるまいを持ちません。
  いろいろ検討しましたが、持たせないほうがいいです。全部Behaviorでやってください。

ちなみに界隈ではオワコン扱いされて久しいBLoCですが、あれはViewModelのパターンなのでそもそもここでは比較の対象になりません。
上の図で、あえて `Widget` ではなく `View` と名付けてあるのはその辺の伏線です。

## ここまでのまとめ

Flutter界のShougoことRemi氏が作成しているライブラリのコンセプトを理解するためにはReactをやる必要がある。逆にReact経験者がFlutterをやったら彼と同じものを内製してしまう。

長くなりそうなので今回はここまでです。
次以降はStore設計のベストプラクティス、Behaviorの具体例、BLoC亡き現代のViewロジカルサバイバル術、苦しんでわかるFlutterのGraphQL事情などについて書いていけたらとおもいます。
あとボイラープレートみたいな具体例を作ったほうがわかりやすいかもしれないですね。

## つづき

Store編書きました。

[hachibeechan.hateblo.jp](https://hachibeechan.hateblo.jp/entry/super-scalable-flutter-store-design)

- [1](about:blank#ipfootnote0):それこそUtilsクラスを避けるようにModelクラスを避ける
14. ただしスケールするクライアントアプリの設計をするのであればCRUDを基準にした "Model" というクラスは作るべきではない。
Modelはモジュールの総体として浮かび上がるものである。