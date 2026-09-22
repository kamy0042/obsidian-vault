---
Created: 2021-01-15T18:08:00
URL: https://hachibeechan.hateblo.jp/entry/super-scalable-flutter-store-design
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
[hachibeechan.hateblo.jp](https://hachibeechan.hateblo.jp/entry/super-scalable-flutter-architecture)

前回の続き

そういえば、前回の記事のブコメで

- Behavior = TransactionScript?
- 実践CQRS

という感じの~~元ネタばらし~~鋭い指摘をしてくれた方がいました。
90%方その通りなのですが、実装の平易さ、許容できるパターンの広さを優先するために元の定義からかなり離れてしまっており、混乱を招くかもしれないと感じたので別の用語で説明している次第です。

読み返すと文字の密度が高くて読むの大変な記事ですね。
今回は具体的な話になるのでサンプルコードとか載せられるといいなとおもいます。

## スケーラブルなデータ設計の基本アイディア

ここで目指すものは至極シンプルです。

1. 「アプリケーションの取りうる状態」というものがStoreの定義をみるだけですぐに理解できるようにする
2. アプリケーションの状態遷移が明確で、予測可能な状態を常に保つ

この二つですね。
これを目指すために、本設計では以下の二つを常に守るようにします。

- Immutability
- データの流れは一方通行

はい、たった二つです。これを守るだけで驚くほど堅牢なアプリケーションが出来上がります。
しかも今回、その方法を特別に無料でお届けしちゃおうという企画なわけです。

### Storeの構成要素

3. データ構造は "PODIO" として分離して宣言する
4. PODIOとは "Plain Old Dart Object" の略
5. Storeの実装にはstate_notifierを使う（自信があれば自作してもよい）
6. ただしStoreには振る舞いを持たせてはならない（つまり公式のサンプルコードは無視する形になる）
7. Storeは実質的なシングルトンとする
8. いわゆるクライアントアプリケーション設計に慣れていない人は、色々な箇所で何度もStoreをnewするような実装を書いてしまいがちだが、これは保守性を大幅に下げることになる
9. 同一Context上には一つのインスタンスしか存在しないということ。本当のシングルトンとして実装してはいけない
10. データ構造は必ずノーマライズした状態で定義する（超重要）
Normalizeという用語に覚えがない人も多いかもしれないですね。基本的にはRedux界隈でよくやられるやり方なので、その辺のポストを読んで勉強するとよいでしょう。[Redux Essentials, Part 6: Performance and Normalizing Data | Redux](https://redux.js.org/tutorials/essentials/part-6-performance-normalization#optimizing-the-posts-list)
とはいえReduxのやり方を完コピする必要はありません。コンセプトさえ押さえておけば問題ないです。
11. Storeは振る舞いを持たない
Storeには振る舞いを持たせません。
"Behavior" として定義します。Behaviorは逆に状態を持たず、引数として受け取ったStoreに副作用を与えるのみとなります。

さて、初見でこのコンセプトや採用のメリットを完全に理解できる人は少数だとおもいますので、この章の最後に具体的なコードを提示します。

まずPODIOです。
これは簡単ですね。

```plain text
import 'package:equatable/equatable.dart';

part 'user.freezed.dart';

/// StringやIntなどのプリミティブをそのままIDとして使うのは型安全性や保守性の観点から好ましくない。
/// 等値性比較を実装したオブジェクトでラップする。
/// Phantom Typeみたいなかんじ。
abstract class NodeKey extends Equatable {
  @protected
  final String val;
  @mustCallSuper
  const NodeKey(this.val);

  @override
  List<Object> get props => [val];

  String exposeValue() => val;

  @override
  String toString() => '${runtimeType}(${val})';
}

/// ----------------------------

/// freezedなどのcode generation系アノテーションの利用には抵抗がある人が多いかもしれないが、宣言的UIの
/// 実装を効率的に行うために必要なimmutabilityや等価性比較への対応をDart標準のライブラリだけで行うのは
/// 苦痛を通り越してプロジェクトにダメージを与えかねないほどに非効率的。
/// 諦めてfreezedを使おう。コンパイル時間は伸びる。
@freezed
abstract class User implements _$User {
  /// _OtherUser, _MyUserの書き方はfreezedの機能の一つで、限定的ではあるがUnion型を再現することができる。
  /// 例えば自分のアカウントの場合は電話番号を閲覧できる……というような処理が存在する場合は、以下のように書けば
  /// 型レベルでプロパティの有無を担保できる。
  /// 詳しいところは公式ドキュメントを熟読しよう。その価値はあるライブラリだ。
  const factory User({
    @override UserId id,
    @required String name,
    @Default('') String icon,
  }) = _OtherUser;
  const factory User.me({
    @override UserId id,
    @required String name,
    @Default('') String icon,
    @required String phoneNumber,
  }) = _MyUser;

  const User._();

  /// 自分がもっているデータの提出などのロジックをPODIOに持たせるのは構わないが、
  /// ビジネスロジック的なValidationはなどの処理はやらないこと。
  String toMentionedName() => '@${name}';
}

/// 補足がてら
/// 複数のPODIOをまとめるものもArrayやMapを直接使うのは避けて、下記のようなラッパーを作って今後に備えるのがベター。
/// なおStoreのデータをNormalizeする関係上、「IDから対象のデータを探索する」という処理が大量に走る。
/// なので委譲先のデータ構造はHashを使うことを推奨する。
class Users extends Equatable {
  final Map<UserId, User> _contents;

  const Users(this._contents);
  factory Users.fromIterable(Iterable<User> users) => Users(
        {for (final u in users) u.id: u},
      );

  @override
  List<Object> get props => [_contents];

  /// プロパティに直接アクセスさせずに、以下のような便利メソッドを介する。
  Iterable<User> get values => _contents.values;
  Iterable<UserId> get keys => _contents.keys;

  User find(UserId id) => _contents[id];
  Iterable<User> filterByIds(List<UserId> ids) => _contents.values.where((k) => ids.contains(k.id));
  Iterable<User> filterByName(String name) =>
      name.isEmpty ? _contents.values : _contents.values.where((u) => u.name.contains(name));
}

```

次にStateです。
先ほど書いたノーマライズ処理もこちらでやることになります。

```plain text
/// ReduxのようにSingle Stateにする必要はない……というかFlutterはあまり相性が良くない気がする。
/// どっちを採用するかは好みで良いとおもう。
/// 分割をどうやるかはチームによって変わるだろう。筆者は起動時に必ず必要になるデータを `AppRequiredState` に
/// 格納する……というようなユースケースに対する明快さを重視した分類を好む。
@freezed
abstract class AppRequiredState implements _$AppState {
  const factory AppState({
    /// RemoteStatusの実装詳細については https://elmprogramming.com/remote-data.html
    /// これを挟むことで画面のローディング処理などを行いやすくする。
    @Default(RemoteStatus.notAsked()) RemoteStatus status,
    @Default(User.myUserNotExists) @nullable MyUser me,
    /// `User[]` ではなく `UserId[]` なのはnormalizeのため。
    /// なので当然、これとは別にUser情報を参照するための `User[State|Store]` が存在する。
    @Default(<UserId>[]) @nullable UserId[] followers,
  }) = _AppState;

```

最後にStore。
こちらには最低限の処理のみを記述します。

```plain text
/// `ModelProtocol` については
///   https://hachibeechan.hateblo.jp/entry/change-notifier-does-not-solve-anything-by-itselfs
/// 普通は `state_notifier` で事足りるが、筆者は `initialState` を通じたStoreの一括リセットなどカスタマイズを
/// 加えたかったので自作している。
///
/// 見ての通り独自の振る舞いや状態を持つことはない。フレームワークの都合上仕方なく宣言するclassなのでDartの
/// code generationに自信がある人は自動で生成しても良い。筆者はドキュメントをチラ見して諦めたので手で書いた。
class AppRequiredStore extends ModelProtocol<AppState> {
  @override
  AppState value;
  AppStore.init();

  @override
  AppState initialState() => const AppState();
}

```

なお本稿ではStoreの配置の方法をどうするか、など具体的な方法については言及しません。
重要なのは思想が正しく反映されているかどうかなので、 `provider` の `ChangeNotifier` だけで内製しようが、 `riverpod` を使おうが大差ないと考えています。
Remi氏が時計を高速で進めていますが、現状として言語機能やフレームワーク的な縛りなどもありFlutterの状態管理関連は前時代的です。今ここでベストプラクティスを提示しても、数ヶ月後には細かいインターフェースはアップデートされていることでしょう。

「State Xを持つStoreは同一コンテクスト上においてシングルトンであること」
これだけ守りましょう。

## アンチパターン

この手のものには付きものですが、陥りやすいアンチパータンというものが存在します。
その中でも代表的な、特に設計を台無しにしてしまうようなものについて列挙していきます。

### 1. Modelという名前がついたクラス

例えばAppRequiredStateが自身を初期化するための非同期リクエストを持ったりするのは最低最悪です。
逆にいうと、そのような振る舞いは全てBehaviorとして冗長性を確保した状態で実装していくので `AppRequiredState` のように恣意的であまり美しいとは言い難い宣言をしても設計が破綻しないのです。

StoreとStateの実装は単体テストを書くのが馬鹿らしくなるくらい単純にしておきましょう。
ちなみにFlutterに限らず、現代的なアーキテクチャを目指すのであればXXXModelというクラス名が出てきたら既に赤信号だと考えてよいです。

### 2. "DBに対するCRUD操作" のような抽象度でStoreを設計してしまう

こちらはRailsのようなバックエンドでRESTを使ってAPIを実装していると陥りがちなパターンです。

これは常にアンチパターンというわけではありません。
誰かが「Ruby on Railsの高い生産性」という話をしているとき、その背後にあるのはこのパターンです。

ただし何事にもメリットとデメリットがあり、このパターンはテーブル設計さえ終わればScaffoldなどを使って半自動的に実装を生成してあっという間にプロトタイピングを終わらせることができます。
半面、このやり方はアプリのスケーラビリティを強く激しく落とします。また細かいUX向上の詰めやパフォーマンスのチューニングも困難になります。

ここについて語るだけで記事が一つ書けてしまうので長くは延べませんが、 **アプリのAPI呼び出しはユースケースに対して依存** しており、DBの構造に依存性を持たせたCRUD型の設計ではその要求を満たすことが困難だからです。
詳細は次の記事に譲りますが、僕の設計ではGraphQLやgRPCの採用を **強く激しくくるおしくお勧め** しています。

### 3. 同一の対象を表すデータが複数存在している（Normalize, Selectorが正しく行えていない）

このアンチパターンは先で述べたNormalizeを正しく行えば自然と避けられるはずのパターンなのですが、非常によく見かける失敗なので取り上げました。

これに関しては言葉よりもコードで説明したほうが早いでしょう。Twitterのクライアントを実装している……と仮定してください。
なおDartだとコードが煩雑になるので、TypeScriptのデータ構造で示します。

```plain text
const Timeline: ReadonlyArray<Tweet> = [
  {id: 'abbba', userId: 'taoru', message: 'プロテインだね', liked: []},
  // ...
];

const ListedTweets: ReadonlyArray<Tweet> = [
  {id: 'abbba', userId: 'taoru', message: 'プロテインだね',  liked: []},
  {id: 'asfagalk', userId: 'abooo', message: 'ウケる～',  liked: ['taoru']},
  // ...
];

const SearchedResult: ReadonlyArray<Tweet> = [
  // ...
];

```

これは以下のようにリファクタリングします。

```plain text
const Tweets: ReadonlyMap<TweetId, Tweet> = {
  {id: 'abbba', userId: 'taoru', message: 'プロテインだね', liked: []},
  {id: 'asfagalk', userId: 'abooo', message: 'ウケる～',  liked: ['taoru']},
};

const Timeline: ReadonlyArray<Tweet> = [
  'abbba',
  'asfagalk',
];

const ListedTweets: ReadonlyArray<Tweet> = [
  {id: 'abbba', userId: 'taoru', message: 'プロテインだね',  liked: []},
  // ...
];

const SearchedResult: ReadonlyArray<Tweet> = [
  // ...
];

```

### 4. Storeのインスタンスが複数生成されている

↑の例を拝借するのであれば

```plain text
ChangeNotifierProvider<AppRequiredStore>(
  create: (_) => AppRequiredStore.init(),
),

```

というコードが二箇所以上存在していたら、貴方は何かを間違えていることになります。

このパターンは「更新したはずの情報がページバックすると元に戻ってる。アプリリロードすると反映される」というバグとして出てくるので簡単にみつけられますが、放置するほどコードの依存性が絡まって修正がめんどくさくなりがちなので最初から作らないように気をつけましょう。

## まとめ

- Storeは極力シンプルに、依存性を排除して単独で存在できるように宣言する
- DartやFlutterがサポートしてくれていないImmutability、等価性比較についてはfreezedやstate_notifierなどのサードパーティライブラリを使ってうまく対処する
- バックエンドが使っているDBの構造という重力に魂を惹かれない。
APIが返すデータ構造からも同上。
特にRailsが提供するREST APIはその高速プロトタイピング性能と引き換えにRDBやActive Recordの制約が漏れ出していることが多いのでなおさら気をつける。
実装しているアプリのこと、アプリの要件から導かれる状態のあり方に集中する。

今回は以上です。
前回からだいぶ間が空いてしまったので一貫性に揺れがないか心配です（ごめんなさい）。

質問、反論などありましたらコメント、メール、DM、リプライとかで送ってくれたら頑張ってアンサーします。
次はBehavior、そしてAPI呼び出しによるステートの同期について書く予定です。

- [1](about:blank#ipfootnote0):同一Context上におけるシングルトンで、Observableなオブジェクト
- [2](about:blank#ipfootnote1):例えばどれか一つのツイートにイイネしたら全てのツイートが再レンダリングされてCPUを食うようなアプリなんて嫌ですよね？
- [3](about:blank#ipfootnote2):DDDなど本格的なアーキテクチャ論だとこの辺の分類がもっと詳細で難解になるんだけど、僕の経験ではこれ以上分割すると逆にメンテナビリティやチームのスケーラビリティが落ちてしまうのでこの程度が一番ちょうどいい
- [4](about:blank#ipfootnote3):間違いではないし、公式がそう捉えているフシもあったりなかったり
12. Storeの定義はFluxの流儀にのっとるものとします。
13. `==` メソッドはデフォルトだと参照の等価性比較を行います。
Equatableやfreezedはそれを補ってくれます。
Stateや、そのNodeがImmutabilityと等値性比較をサポートすることで、宣言的UIとパフォーマンスの最適化を両立させることができます。
14. アプリケーションの振る舞い部分は全てBehaviorとして分割すること。
15. `AppRequiredStore` という名前がついているのでありえないミスのようにみえますが、フロントエンドの開発経験が少ない人が急遽参加して既存コードを模倣した結果、 `ChangeNotifier` をView更新のための道具として捉えてしまった結果このようなコードが生まれるのを何度かみてきました。