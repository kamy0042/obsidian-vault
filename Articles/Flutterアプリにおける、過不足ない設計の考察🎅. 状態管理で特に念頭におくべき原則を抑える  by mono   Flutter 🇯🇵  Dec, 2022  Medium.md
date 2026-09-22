---
Created: 2023-01-12T20:49:00
URL: https://medium.com/flutter-jp/architecture-240d3c56b597
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[0VAFlI_C6VbP1Q9kg.bin]]

Photo by [Hush Naidoo Jade Photography](https://unsplash.com/es/@hush52?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

![[07x2zuXUZfFfXzmDW.bin]]

「一般的なモバイルアプリ」の設計全般において、特に何に気を付ける必要があるか、あるいは逆にあまり気にしてなくても良いのではと思うことなどを述べていきます。
(…のつもりでしたが、後者含めると1記事に収めるの困難で、最後にさらっと触れつつ別記事で手厚く書きたいところです🤔)

ここでの「一般的なモバイルアプリ」は規模観点では以下程度のイメージですが、それを超えるような規模でも通ずる内容も多いと思っています。

- コード量: 数万〜十数万行
- 実装者: 一桁人

種類としては(スマホ向けの)クライアントアプリコードであり、以下などではないです。

- パッケージ・ライブラリではない
- サーバーサイドではない

この種類によって適切な組み方はけっこう変わり、アプリコードは依存関係の末端側(基本的に依存される側にはならない)なこともあり、比較的アバウトに組んで良い(雑なコードで良いという意味ではない)と思っています。また、一部の特殊なアプリでは例外的にあてはまらない内容も多少あるかもしれません(95%以上はあてはまる内容だろうとは思っています)。

例えば、以下のような感じで、Flutterプロジェクトとしては不自然な回りくどい作りになっていたり、本当に必要かどうか疑わしいようなレイヤーが挟まってたりと思うことがあります。

- 以前の(Flutter以外の)プロジェクトを踏襲してMVVM採用しよう
- Clean Architecture・Domain Driven Design(DDD)について調べたら、このレイヤーを挟むと良いらしいので、そのまま導入しよう

結果的にそれがある程度うまくハマることもあるかもしれませんが、闇雲に様々なパターンを取り入れず、まずはFlutterにおいて必ず守るべき基本原則をしっかり抑えて、さらに本当に必要な設計要素を適宜足し算で合わせていく方が過不足ないプロジェクトコードになると考えています。

Flutterアプリにおいて本当に念頭におくべきことは、まず第一に以下で、

- Single Source of Truth(SSOT)原則に従った状態管理
- 状態の流れを単方向データフローで組む

次点で以下(上の2点ほど遵守必須ではないが大抵守る方が良い)だと思っています。

- immutableプログラミングの徹底
- Unit/Widget Testが可能に
- 単一責任の原則を意識

これらさえきちんと満たして型セーフにお行儀良く組んでいれば、大抵は凝った工夫せずとも自然と及第点は満たす作りになってくる印象です(要件の複雑度に応じて適宜工夫は必要になりますが一般的なアプリではシンプルに済むところも多いと思います)。逆にこの基本を疎かにしながら、「MVVM採用」「Clean Architecture遵守」などと何となく掲げても、無駄に冗長だったりごちゃごちゃした歪な作りになりがちに思います。

以下、それぞれ噛み砕いて説明していきます(きちんと理解して書いている人にとっては当たり前の内容が多いかもしれません)。

全体的に [Riverpod](https://riverpod.dev/) 利用前提のところが多いですが、それ以外のパッケージ利用でも通ずる(応用可能な)内容がほとんどのはずです。

# Single Source of Truth(SSOT)原則に従った状態管理

SSOTについては、アプリ設計というよりデータ設計的な文脈ですが、Wikipediaでは以下のように説明されています。

> 信頼できる唯一の情報源 (Single Source of Truth; SSOT) とは、情報システムの設計と理論においては、すべてのデータが1か所でのみ作成、あるいは編集されるように、情報モデルと関連するデータスキーマとを構造化する方法である。データへのリンクで可能なものは参照のみである。プライマリ以外の他の場所のすべてのデータは、プライマリの「信頼できる情報源」の場所を参照するだけであり、プライマリのデータが更新された場合、どこかで重複したり失われたりすることなく、システム全体に伝播される。
> [https://ja.wikipedia.org/wiki/%E4%BF%A1%E9%A0%BC%E3%81%A7%E3%81%8D%E3%82%8B%E5%94%AF%E4%B8%80%E3%81%AE%E6%83%85%E5%A0%B1%E6%BA%90](https://ja.wikipedia.org/wiki/%E4%BF%A1%E9%A0%BC%E3%81%A7%E3%81%8D%E3%82%8B%E5%94%AF%E4%B8%80%E3%81%AE%E6%83%85%E5%A0%B1%E6%BA%90)

SSOTを正しく意識できている場合、例えば以下のようなよくある要件を満たしたい時、特別な工夫なく容易かつ確実に実現できるはずです。

1. 記事一覧画面で、自分のlike表示がされている(未like)
2. 詳細画面に遷移後、likeするとその詳細画面でlike済みに変わる
3. 一覧画面に戻ると、その記事がlike済みになっている

この際、SSOTになってない場合は以下のように脆い状態になります:

4. 一覧画面と詳細画面の記事データソースが別管理(同じ記事のインスタンスが2つ存在)
5. 詳細画面の記事インスタンスのlikeをtrueに変更(この時点では一覧画面のその記事インスタンスは未like)
6. 一覧画面の記事インスタンスにもlike済みであることを同期(ここに抜け漏れがあるとバグったり、あるいは概ね正しく組んでいてもその処理が煩雑になりがちだったり一時的に表示不整合が生じるなどしがち)
7. 同期処理完了後、一覧でもlike済みになる

SSOTを満たしたコード例(Riverpod利用)は、一貫して利用されるデータソースを以下のように定義し、

```plain text
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'example.freezed.dart';

final articlesProvider = StateNotifierProvider<ArticlesNotifier, List<Article>>(
 (ref) => ArticlesNotifier(),
);

// SSOTを満たした、記事データソース
class ArticlesNotifier extends StateNotifier<List<Article>> {
 ArticlesNotifier()
 : super(List.generate(10, (index) => Article(id: '$index')));

 void like(String id) {
 final index = state.indexWhere((article) => article.id == id);
 final article = state[index];
 state = List.of(state)
 ..[index] = article.copyWith(
 isLiked: true,
 );
 }
}

@freezed
class Article with _$Article {
 const factory Article({
 required String id,
 @Default(false) bool isLiked,
 }) = _Article;
 const Article._();
}
```

利用側では、以下のように一覧・詳細ともにその同一のデータソースを参照・操作します:

```plain text
// 一覧画面
class ArticleListView extends ConsumerWidget {
 const ArticleListView({super.key});
 @override
 Widget build(BuildContext context, WidgetRef ref) {
 final articles = ref.watch(articlesProvider);
 return ListView(
 children: [
 for (final article in articles) Text('$article'),
 ],
 );
 }
}

// 詳細画面
class ArticleDetailView extends ConsumerWidget {
 const ArticleDetailView({
 super.key,
 required this.id,
 });

 final String id;
 @override
 Widget build(BuildContext context, WidgetRef ref) {
 final article = ref.watch(
 articlesProvider.select(
 (articles) => articles.firstWhere((article) => article.id == id),
 ),
 );
 return TextButton(
 child: Text('$article'),
 onPressed: () {
 ref.read(articlesProvider.notifier).like(id);
 },
 );
 }
}
```

一覧と詳細での表示不整合が絶対に生じ得ない作りになっていることが分かるはずです。もちろん、一覧と詳細で都合の良いデータ構造が異なりそれぞれ加工が必要なこともありますが、その場合でも大元のSSOTなデータソースから派生させる作りにすることがポイントです。

上の例はローカルに閉じた簡易コードですが、Firestoreを使う場合は次のようなコードになります:

```plain text
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'example.freezed.dart';

final articlesRefProvider = Provider<CollectionReference<Article>>(
 (ref) => FirebaseFirestore.instance.collection('articles').withConverter(
 fromFirestore: (snapshot, options) =>
 Article.fromJson(snapshot.data()!..['id'] = snapshot.id),
 toFirestore: (article, options) => article.toJson()..remove('id'),
 ),
);

// データソース
final articlesProvider = StreamProvider<List<Article>>(
 (ref) => ref
 .watch(articlesRefProvider)
 .snapshots()
 .map((snap) => snap.docs.map((doc) => doc.data()).toList()),
);

// like操作のためのProvider
final articleLikeServiceProvider = Provider(ArticleLikeService.new);

class ArticleLikeService {
 ArticleLikeService(this._ref);

 final Ref _ref;
 void like(String id) {
 _ref.read(articlesRefProvider).doc(id).update({'isLiked': true});
 }
}

// 一覧画面
class ArticleListView extends ConsumerWidget {
 const ArticleListView({super.key});
 @override
 Widget build(BuildContext context, WidgetRef ref) {
 final articles = ref.watch(articlesProvider).value ?? [];
 return ListView(
 children: [
 for (final article in articles) Text('$article'),
 ],
 );
 }
}

// 詳細画面
class ArticleDetailView extends ConsumerWidget {
 const ArticleDetailView({
 super.key,
 required this.id,
 });

 final String id;
 @override
 Widget build(BuildContext context, WidgetRef ref) {
 final article = ref.watch(
 articlesProvider.select(
 (articles) => articles.value!.firstWhere((article) => article.id == id),
 ),
 );
 return TextButton(
 child: Text('$article'),
 onPressed: () {
 ref.read(articleLikeServiceProvider).like(id);
 },
 );
 }
}
```

Firestoreの場合は、それ自体( `FirebaseFirestore.instance` )が SSOT とみなせるので、上のように必ずしも同じProvider参照せずとも以下でも良いです。

```plain text
// データソース
final articleProviderFamily = StreamProvider.family<Article, String>(
 (ref, id) => ref
 .watch(articlesRefProvider)
 .doc(id)
 .snapshots()
 .map((doc) => doc.data()!),
);

// 詳細画面からの参照
final article = ref.watch(articleProviderFamily(id));
```

## `ref.invalidate` を用いたテクニック

Firestoreの場合に一貫して最新値を得るのは監視ベースで組む( `snapshots()` 活用する)だけで済んで簡単ですが、Web APIから取得したデータをSSOTとして扱う場合は、特にキャッシュが絡む場合に少し悩ましいこともあります。

スマートな対処例として、以下のセッションでのライブコーディング題材としても使われた [pub.dev クライアントサンプルアプリ](https://github.com/rrousselGit/riverpod/tree/master/examples/pub) のコードがとても参考になります。

Riverpod 2.0と同時にリリースされた [riverpod_generator](https://pub.dev/packages/riverpod_generator) を利用したコードとなっていますが、StateNotifier(Provider)と似たようなものだと思いながら雰囲気で読めるはずですし、書き換え可能です。

以下のようにパッケージのmetricsの状態管理をするStateNotifierっぽいクラスに定義された `like()` メソッドが呼ばれると、それが影響を及ぼすProvider(自身およびlikedPackagesProvider)が [invalidate](https://pub.dev/documentation/riverpod/latest/riverpod/Ref/invalidate.html) されて再取得(キャッシュを破棄してWeb APIリクエストし直し)を促されるようになっています。

[https://github.com/rrousselGit/riverpod/blob/cf1974eb873c9e5372f10c3b8d202a404bb180f4/examples/pub/lib/detail.dart#L58-L91](https://github.com/rrousselGit/riverpod/blob/cf1974eb873c9e5372f10c3b8d202a404bb180f4/examples/pub/lib/detail.dart#L58-L91) を改変

![[1Y7QgGgSRVv6Bpf-Z1tRBgA.png]]

自前でごちゃごちゃ状態保持・管理するのではなく、適当なタイミングでキャッシュ破棄する単純な操作だけでSSOTからデータが取り直されるというシンプルな作りで、とても良いと思います 👍

> StateNotifier(Provider)と似たようなものだと思いながら雰囲気で読めるはずですし、書き換え可能です。

参考に以下で書き換えた版も載せておきます:

- [StateNotifier版](https://gist.github.com/mono0926/5ad9e304515cf1c4733b75ea08466230)
- [AsyncNotifier版](https://gist.github.com/mono0926/94debe20f4209237939b3f991ee6684e) ([riverpod_generator](https://pub.dev/packages/riverpod_generator) はこれを用いたコードを生成している)

# 状態の流れを単方向データフローで組む

以下のようにコマンドとクエリを明確に分ける、コマンドクエリ責務分離(CQRS)という考え方があります。

- 副作用を与えるだけで戻り値 `void` のコマンド(上述のlike操作など)
- 副作用を与えずにデータを得るだけのクエリ

SSOT および CQRS に則ったデータの流れになるように組むと、自然と単方向データフロー(Unidirectional Data Flow)に行き着きます。

以下のスライド内の図などが分かりやすいです:

以前ツイートしたProviderの利用箇所と流れの図も単方向データフローを強く意識したものとなっています:

アプリ全体として大きな単方向データフローの流れ(A・B)があり、要件に応じてCのように局所的な単方向データフローも混ざることがあります(編集画面で初期値・ユーザー入力値をそこに閉じて状態管理必要な場合など)。「各データストア」部分が大元の SSOT に相当します。また、CQRS観点では、Aがクエリで、Bがコマンドに相当します。

Redux/Fluxなどと基本方針は同じで、Flutterでもそれらに準拠したようなパッケージが存在しますが、Riverpodを適材適所に使うことで冗長なコードなくシンプルに組めると感じています。

単方向データフローにすると、データがあちこち行ったり来たりすることなく、基本的に大元の SSOT から適宜加工されながら流れてくるということで、追いやすくなります(末端から遡って行けば大元のSSOTに辿り着きます)。

一方、StateNotifierを多用していると、単方向データフローを徹底できてないサインかもしれません。編集画面やその他ユーザー入力値の一時保持など必要な画面ではStateNotifier利用が適してますが、多くのアプリではそこまで出番が多くないはずです。最新データの再取得観点では以下で済むので、その理由でStateNotifierを使う必然性もあまり無いです。

- Firestore使っている場合は監視によるStreamProviderベースで組めばリアルタイム更新される
- Web API利用などでFutureProviderで組んでいる場合はautoDisposeにしたり(リスナーがゼロになると次回watch時に取得し直しされる)、任意のタイミングで [`ref.invalidte`](https://pub.dev/documentation/riverpod/latest/riverpod/Ref/invalidate.html) を読んで再取得を促せる

StateNotifierだと、SSOTから得られる値が流れる以外に、任意のタイミングで `state =` で値をセットできる余地があるため、周辺コードをよく確認しないとデータの流れを正確に読み解けなくなるので、StateNotifierは本当に必要なところで最小限の利用にとどめるのが良いです。

ここまでが最重要な考えで、次点で大事な考えについて続けて述べていきます。

# immutableプログラミングの徹底

immutableプログラミングについては、以下の記事で手厚く述べました。

この記事に書いたこと以上に付け加えることはあまりないですが、一貫してimmutableプログラミングを徹底することで、記事に記載の各種恩恵を得られるので遵守することをお勧めします。

特に、[freezed v2](https://pub.dev/packages/freezed/changelog#200) からは、デフォルトではそれで定義したクラスのコレクション系のフィールドに対してmutable操作すると実行時エラーが出るようになった( `Unmodifiable` 系として扱われるようになった)ので、自然と徹底しやすくなったはずです。
(Dartの標準のコレクション系クラスに寄り添うと、mutable操作を実行時エラーでしか検知できない(事前に静的エラーで弾けない)ですが、大抵は開発中に気付けるはずで足を引っ張られることは少ないはずです)

また、ちょうど最近、Riverpod v2用のドキュメントに、Immutability(不変性)の重要性とRiverpodでの取り扱い方のページが追加されて、こちらも参考になります👍

## [Why Immutability | Riverpod](https://docs-v2.riverpod.dev/docs/concepts/why_immutability)

### [What is Immutability?](https://docs-v2.riverpod.dev/docs/concepts/why_immutability)

[docs-v2.riverpod.dev](https://docs-v2.riverpod.dev/docs/concepts/why_immutability)

# Unit/Widget Testが可能なこと

各種処理をProviderで適切に包むようにしておくと、テスト可能なコードにできます。

Flutterでは、以下の3種類のテストがあります。

- Unit Test: 単体テスト
- Widget Test: 特定のWidgetのテスト
- Integration Test: 統合テスト

それぞれ、詳しくは以下を参照してください:

## [Testing Flutter apps](https://docs.flutter.dev/testing)

### [The more features your app has, the harder it is to test manually. Automated tests help ensure that your app performs…](https://docs.flutter.dev/testing)

[docs.flutter.dev](https://docs.flutter.dev/testing)

Integration Testのみ、iOS/Androidなどのシミュレーター・実機上での実行が必要で、実行速度が遅い一方で実際にネットワーク通信したりネイティブAPIを使ったりできます(必ずそうしなくてはいけないわけではなく一部差し替えても良いです)。

[https://docs.flutter.dev/testing](https://docs.flutter.dev/testing)

![[1fjG9M1cJeNPh2dSNJXTG8A.png]]

一方、Unit/Widget Testはシミュレーター・実機を使わずに高速に実行されます。そのため、ネイティブAPIを使えないのはもちろん、ネットワーク通信など時間がかかったり動作が不安定なものの利用も極力避けるべきです(たまにランダムに失敗するようなテストは避けるべきなので)。

Unit/Widget Test実行時、処理内容に応じて以下のような考慮事項があります:

- ネイティブAPI: 使えない
- ネットワーク通信: 原則避けるべき
- ローカルDBアクセス: 具体的な永続化処理はネイティブ依存で動かない(それをオンメモリに切り替えられるものは動く)
- 現在時刻のように随時変動する環境情報: テスト時は特定の時刻に固定できないと困ることが多い

つまり、これらへの依存がうまく切り離されていないと、Unit/Widget Testを書きたくても書けません。

個人的にはアプリコードのテストコードはそこまで多く書かなくても良いと思っています(費用対効果的にあまりペイしないことも多いと思うので)が、Unit/Widget Testがとても効果的な場面もちょくちょくあり、そういう時に手動確認ではなく自動テストで済ませられる手段を持っておくのは大事です。これらへ依存したコードを適当にベタ書きで済ませてしまった場合、実際にテストを書きたくなった時に、よほどの小規模プロジェクトでない限りテスト可能なコードへの書き換えにはかなり大きな対応コストが強いられます(テスト可能なように概ね心掛けていたものの抜けがあって一部のテストが書き難いことに気付いて実装を調整する程度ならよくあることで、問題ないと思います👌)。

依存を適切に切り離してテスト可能な作りにするには通常、コードの冗長さ・手間などが増えるトレードオフがありますが、Flutter(Dart単体でも同様)の場合は、Riverpodを使えば足を引っ張られる感じはほぼ無いレベルに感じています( [get_it](https://pub.dev/packages/get_it) なども悪くないですが [provider](https://pub.dev/packages/provider) と同様に型セーフではないことはマイナス面です)。

例えば、次のようなAPI通信の関数をRiverpodを使って差し替え可能にすると、

```plain text
import 'dart:convert';
import 'package:http/http.dart';

Future<Map<String, dynamic>> fetchUser(String id) async {
 final result = await Client().get(Uri.parse('https://example.com/users/$id'));
 // 実際には、Mapで済ませずにfreezedで定義したクラスに変換
 return (jsonDecode(result.body) as Map).cast<String, dynamic>();
}

// 利用側
final user = await fetchUser('xxx');
```

以下のようになって、ほとんど差がないコード量・使い勝手で済みます。

```plain text
final userProviderFamily = FutureProvider.family<Map<String, dynamic>, String>((ref, id) async {
 final result = await Client().get(Uri.parse('https://example.com/users/$id'));
 return (jsonDecode(result.body) as Map).cast<String, dynamic>();
});

// 利用側
final user = await ref.watch(userProviderFamily('xxx'));
```

さらに、良い感じのキャッシュ機構も付くなどのメリットも得られます( `autoDispose` モディファイアーで制御可能)。

上記の本実装に対して、次のようなダミー実装を用意して差し替えればテスト可能になります👌

- 本実装: ネットワーク通信を伴うWeb API呼び出しをしてユーザー情報を返す
- ダミー実装: ネットワーク通信などせず即座に同じ型のダミーデータを返す単純な処理をする

具体的な差し替えコード例としては、以下のようにoverridesでProviderを差し替えると、その `ProviderContainer` ・ `ProviderScope` でアクセスされた時に差し替えられたものになります。

```plain text
 test('Unit Testでは大抵こうする', () {
 final container = ProviderContainer(
 overrides: [
 // idに応じて適当なダミーデータを返す
 userProviderFamily.overrideWith((ref, id) => <String, dynamic>{}),
 ],
 );
 addTearDown(container.dispose);
 // overrideされたダミーデータが得られる
 final alice = container.read(userProviderFamily('alice'));
 });

 testWidgets('Widget Testでは大抵こうする', (teser) async {
 await tester.pumpWidget(
 ProviderScope(
 overrides: [
 // idに応じて適当なダミーデータを返す
 userProviderFamily.overrideWith((ref, id) => <String, dynamic>{})
 ],
 // ここ配下ではoverrideされたダミーデータが得られる
 child: ...,
 ),
 );
 });
```

より詳しくは、以下など参照ください。

## [Testing | Riverpod](https://riverpod.dev/docs/cookbooks/testing#overriding-the-behavior-of-a-provider-during-tests)

### [For any medium to large-scale applications, it is critical to test the application. To successfully test our…](https://riverpod.dev/docs/cookbooks/testing#overriding-the-behavior-of-a-provider-during-tests)

[riverpod.dev](https://riverpod.dev/docs/cookbooks/testing#overriding-the-behavior-of-a-provider-during-tests)

> 現在時刻のように随時変わるもの: テスト時は特定の時刻に固定できないと困ることが多い

ちなみに、これは [clock パッケージ](https://pub.dev/packages/clock)をProviderで提供・利用するようにするのがお勧めです。

## インターフェース(abscract class)の別途定義は不要

上の例では、非同期関数をFutureProviderで包むことによって差し替え可能にしましたが、クラスの場合は特に普通に組んでProviderで包むだけで良いです👌

```plain text
// Providerで包んでそれ経由で利用するようにして、差し替え可能に
final someServiceProvider = Provider((ref) => SomeService());

class SomeService {
 void foo() {
 print('foo');
 }

 void bar() {
 print('bar');
 }
}

// テスト用のクラス
class FakeSomeService implements SomeService {
 @override
 void foo() {
 print('[test] foo');
 }

 @override
 void bar() {
 print('[test] bar');
 }
}

// 差し替え例
final container = ProviderContainer(
 overrides: [
 // idに応じて適当なダミーデータを返す
 someServiceProvider.overrideWith((ref) => FakeSomeService()),
 ],
);
```

次のように別途インターフェース定義しても手間が増えたり取り回しにくくなるだけなので、単に差し替え可能にしたいというだけならこう書くべきではないです。

```plain text
final someServiceProvider = Provider<SomeServiceInterface>(
 (ref) => SomeService(),
);

// インターフェース定義
abstract class SomeServiceInterface {
 void foo();
 void bar();
}

class SomeService implements SomeServiceInterface {
 @override
 void foo() {
 print('foo');
 }

 @override
 void bar() {
 print('bar');
 }
}
```

以下に記載のように、Dartの全てのclassは暗黙的にインターフェースを定義してます。

> Implicit interfaces
> Every class implicitly defines an interface containing all the instance members of the class and of any interfaces it implements. If you want to create a class A that supports class B’s API without inheriting B’s implementation, class A should implement the B interface.
> 
> [https://dart.dev/guides/language/language-tour#implicit-interfaces](https://dart.dev/guides/language/language-tour#implicit-interfaces)

つまり、`class SomeService {}` が定義されると、次のような状態になります:

- SomeSeriviceインターフェースが定義される
- `class SomeService {}` はそのデフォルト実装となる
- 先述の通り、Provider経由でクラスインスタンス提供するようにしていれば差し替えは容易

Dartでは特にアプリコードにおいて、依存性逆転の原則(Dependency inversion principle, DIP)は全く気にする必要がないと思っています。
(逆に、プラグインパッケージで採用されている [Federated plugins 構成](https://docs.flutter.dev/development/packages-and-plugins/developing-packages#federated-plugins)はDIPに則った例で、そのように適材適所で有用と認識している前提です。)

ちなみに、 [flutter_testライブラリ](https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html)に含まれる [Fakeクラス](https://pub.dev/documentation/test_api/latest/test_api.fake/Fake-class.html) を継承すると未実装が残っていてもコンパイル通るようになり(未実装のものが実際に呼ばれるとUnimplementedErrorエラー発生)、そのテストと関係ないメソッド実装を無視できて便利です。

```plain text
class FakeSomeService extends Fake implements SomeService {
 @override
 void foo() {
 print('[test] foo');
 }
 // bar実装なくともコンパイルエラーにならない(上のfoo実装も同様)
}
```

また、より高度・複雑なテストは以下のいずれかが必要になってきます:

- [mockitoパッケージ](https://pub.dev/packages/mockito) (公式)
- [mocktailパッケージ](https://pub.dev/packages/mocktail) (mockitoのnull safety対応でコード自動生成必要な問題を解決したもの)

どちら使えば良いか迷うので決着付いて欲しいところですが、[[Proposal] Merge Mocktail into Mockito](https://github.com/dart-lang/mockito/issues/347) はありつつも統合は当面望み薄な雰囲気です。

ちなみに、個人的にはMockクラス用意するようなテストはアプリコードだとあまり書かなくても良いかな感覚です(費用対効果的に)。

真っ当なテストコードを書いていくのは本実装コード書くより難易度高めとも思いますが、不慣れでも以下のような感じで取り組んでいくのが良いと思います。

- Providerでの提供・利用を徹底してテスト可能な状態を保つように心掛ける
- 特に手動で面倒な動作確認していることに気付いたら(色々な入力に組み合わせ条件整えてUI確認繰り返し、など)、自動テストで済ませるようにトライしながら、テストの恩恵を理解して慣れていく(テストコードを実際にいくつか書かないとProviderで差し替え可能にする意義が理解しにくいはず)

# 単一責任の原則

Wikipediaでは以下のように説明されています。

> 単一責任の原則 (たんいつせきにんのげんそく、英: single-responsibility principle) は、プログラミングに関する原則であり、モジュール、クラスまたは関数は、単一の機能について責任を持ち、その機能をカプセル化するべきであるという原則である。モジュール、クラスまたは関数が提供するサービスは、その責任と一致している必要がある[1]。
> 単一責任の原則は、[ロバート・C・マーティン](https://ja.wikipedia.org/w/index.php?title=%E3%83%AD%E3%83%90%E3%83%BC%E3%83%88%E3%83%BBC%E3%83%BB%E3%83%9E%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3&action=edit&redlink=1)（[英語版](https://en.wikipedia.org/wiki/Robert_C._Martin)）によって定義された。この原則について、彼は、「クラスを変更する理由は、ひとつだけであるべきである」[[1]](https://ja.wikipedia.org/wiki/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E3%81%AE%E5%8E%9F%E5%89%87#cite_note-cleancode-1) と表し、「変更する理由」に関して、「この原則は、人についてのものである」と述べ[[2]](https://ja.wikipedia.org/wiki/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E3%81%AE%E5%8E%9F%E5%89%87#cite_note-2)、アクターについてのものであると補足した[[3]](https://ja.wikipedia.org/wiki/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E3%81%AE%E5%8E%9F%E5%89%87#cite_note-Martin2018-3)。
> 
> [https://ja.wikipedia.org/wiki/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E3%81%AE%E5%8E%9F%E5%89%87](https://ja.wikipedia.org/wiki/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E3%81%AE%E5%8E%9F%E5%89%87)

あまり厳密に難しく考え過ぎずとも、それぞれの関数・クラス・メソッドが以下を概ね満たすように組む程度で及第点なイメージです👌

- それぞれの責務を表す端的な名前が付けられている
- 実際の処理内容もそれに従っていて、余計なことをしていない(他のことも合わせてする必要がある場合は適切に[委譲](https://ja.wikipedia.org/wiki/%E5%A7%94%E8%AD%B2)するなど)
- コード量が多過ぎない(多過ぎる場合は、もっと細かい責務に細分化できないか考える)

この原則を守れていると特定の依存だけを差し替えしやすくなるので、テストコードの書きやすさにも繋がります。逆に色々乱雑に混ざったコードだと、それが困難かつ手間がかかるようになってしまい、差し替えコード増にも繋がり、メンテナンスしにくいテストコードを招きます。

さらに、以下を満たせていることも意識すると、より良くなると思います👌

- 高凝集(特定の責務が散らばらずに1箇所・あるいは近い場所に閉じていること)
- 疎結合(単一の機能としてうまく切り離されていること)

それぞれ、実装作業にあたって以下のような違和感があれば、うまく満たせてない疑いがあります。

- 特定機能の実装であちこちに点在する色んなクラス・Providerを触る → 高凝集でないかも？
- どの機能実装する時にも弄るような寄せ集めクラスがある → 疎結合でないかも

次のようなイマイチな実コードを見る機会は、意外とかなり多く感じます。

```plain text
// 無駄に寄せ集められている(≠疎結合)実装(意外と多い)
class Foo {
 // f1用
 String? v1;
 // f2用
 String? v2;

 // f2と直接関係しない, v2も使わない
 void f1() {
 print(v1);
 }

 // f1と直接関係しない, v1も使わない
 void f2() {
 print(v2);
 }
}

// 基本的にこちらが良い
class Foo1 {
 String? v1;
 void f1() {
 print(v1);
 }
}

class Foo2 {
 String? v2;
 void f2() {
 print(v2);
 }
}
```

[providerパッケージ](https://pub.dev/packages/provider) はたくさんのProviderを定義すると取り回しが面倒な感じもありましたが、[riverpodパッケージ](https://pub.dev/packages/riverpod)でのProviderは定義も利用も手軽にできて使い勝手よく、単一責任ごとにProviderを用意するのが良いです 👌

以上、Flutterアプリにおいて満たすと良いと思っている指針でした。

サンプルとしては、以下は基本的にそれらを満たしていると思っています。

- [Riverpodリポジトリの examples](https://github.com/rrousselGit/riverpod/tree/master/examples)
- [https://github.com/mono0926/wdb106-flutter](https://github.com/mono0926/wdb106-flutter)

Riverpodリポジトリのexamplesは、テストコードがないのが惜しいなと思っています。「Riverpodを用いたアプリコードに対するテストコードのサンプル」を求めている人は僕含めてとても多いと思うので、そのプルリクなどするのはとても意義がありそうです。
( [https://github.com/mono0926/wdb106-flutter](https://github.com/mono0926/wdb106-flutter) はざっとテストコード書いてあるので、ある程度参考になるはずです)

サンプルではない機能の多い実アプリになると作りがガラリと変わるわけではなく、個々のコンポーネントはサンプルと同様に小さく保ちつつ、その数が増えていくイメージです。

学習観点だと、大きなコードボリュームのプロジェクトで格闘するよりも、小さいサンプルで基礎を確実に抑えていくようにした方が捗り、また基礎がきちんと身に付けばその延長で自然と高機能な実アプリも無理なく組めるようになるはずです。

ただ、サンプルと比べて、コード量が多くなりがちな実アプリで悩ましく感じる点としてディレクトリ構成どうするか問題はあると思うので、それにも少し触れます。

# ディレクトリ構成

よく話題に挙がる、ディレクトリ構成はどうすれば良いのか問題ですが、基本的な考えとして「関連性のあるものを寄せる」(分けるのは機能ごと)が大事だと思っています。

これらの記事が、僕が良いと思うイメージです:

## [Flutter Project Structure: Feature-first or Layer-first?](https://codewithandrea.com/articles/flutter-project-structure/)

### [When building large Flutter apps, one of the first things we should decide is how to structure our project. This…](https://codewithandrea.com/articles/flutter-project-structure/)

[codewithandrea.com](https://codewithandrea.com/articles/flutter-project-structure/)

## [そのファイル、本当に hooks/・utils/ に入れるんですか？React プロジェクトを蝕む「見かけ駆動パッケージング」 - Qiita](https://qiita.com/honey32/items/dbf3c5a5a71636374567)

### [太郎くんの今日のタスクは、「トーストを作る」です。 イメージ図 太郎くん 「 コンポーネントを作るから..」 「ファイルの場所は components/Toast.tsxでええか。」 「 useState…](https://qiita.com/honey32/items/dbf3c5a5a71636374567)

[qiita.com](https://qiita.com/honey32/items/dbf3c5a5a71636374567)

Widgetと密接に関係するProviderがある場合、それらは必ずしも分離せず同一ファイルでも良いです。その考え前提で、実際にはファイルが長くなって扱いにくいのを解消するためにファイル分けて隣に置く、くらいがちょうど良いことが多いと思いますが。

一昔前はレイヤーごと(Model/UIなど)に分割する例が多かった気がして分業する際も同様にそこで区切られることも多かった印象ですが、最近はモバイルアプリ実装では機能ごとに一気通貫で担当(サーバーサイドがFirebaseの場合はそちらも含めて)することが多い気がします。そういう意味でもそれに沿ったフォルダ分けが自然かつ扱いやすく思います。

という前提で、プロジェクト全体から使われるような類のモデル・汎用Widgetなどはトップレベルに置いて、各利用箇所から多少離れてしまうのは仕方ないですね。関連性のあるもの同士を、不必要に距離を遠ざけなければ良いです。

こういう大枠の共通認識があれば細部は各開発者が柔軟に対応で良い気も半分する一方、チーム開発だとある程度画一的なルールがあると捗る面もあるので、トップレベルおよび各機能配下のディレクトリ構成は何かしら明確なルールを定めたりテンプレート設けたりするのも良いと思います(細部の具体的な構成は特に正解はなく決めの問題だと思います)。

ここまでが自分が重要と思っていることで、次に、逆に必ずしもそうしなくて良い(適宜割り切って端折るのが合理的なことが多い)と思うことについて触れていきたいところですが、長くなり過ぎたので、気が向いたら別記事として書こうかなと思います🐶
(少し書いてたら終わりが見えなくなってきて、別記事のDraftに移動しました🫠)

ただ、せっかくなので、その必ずしもそうしなくて良いと思っていることを箇条書きにしておきます。「常に不要」という意味ではなく、「常に必要なわけではないだろう」程度の部分否定です 🐶

- マルチパッケージ構成に凝る
- モデルとUIの中間レイヤーなどを画一的に常に設けること
- モデル用とUI用で同じ対象について別途クラス定義してレイヤー間で詰め替え
- MVVM の ViewModel的なもの
- 依存パッケージなどの乗り換え可能な作りにする(その型への依存などの隠蔽も徹底)
- 依存性逆転の原則(Dependency inversion principle, DIP)
- サービスロケーターパターンを避けようとする(調べるとアンチパターンと書かれていて気になるかもしれないが、Riverpodはサービスロケーターパターン前提であり問題・実害ない)

どのように組むがの良いかはケースバイケースですが、とりあえず「最近流行ってるから」「本に書いてあったから」とかではなく、それをプロジェクトコードに取り入れた場合を想像したり試してみたりした上で、具体的なメリットがデメリットを上回る手応えを得てから採用するのが重要だと思っています。

以上、設計周りについての意見でした。良いお年を🎅🎍

Photo by [Laura Beth Snipes](https://unsplash.com/@lbsnipes?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

![[02eLZ84N_4KZfqgS2.bin]]

Photo by [Justin Campbell](https://unsplash.com/@justinhikestn?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

![[00CceIZII57mLuxzz.bin]]

Dart/FlutterでのJSONエンコード・デコードは、以下のドキュメントで一通り説明されていて、単純に扱う分にはまずこれを参考にするのが良いです 👌

## [JSON and serialization](https://docs.flutter.dev/development/data-and-backend/json)

### [It is hard to think of a mobile app that doesn't need to communicate with a web server or easily store structured data…](https://docs.flutter.dev/development/data-and-backend/json)

[docs.flutter.dev](https://docs.flutter.dev/development/data-and-backend/json)

実際のプロジェクトでは、ここではカバーし切れていない細かい知識・テクニックが必要になることも多く、本記事ではそのあたりを説明していきます。

まず、前置きとして、たまに議論になる”JSON”という言葉の扱いについて触れます。

# Dart での JSON の扱い

JSONの定義は以下のように定められています。

## [JSON](https://www.json.org/json-en.html)

### [Edit description](https://www.json.org/json-en.html)

[www.json.org](https://www.json.org/json-en.html)

そのため例えば、Firestoreの[Timestamp](https://pub.dev/documentation/cloud_firestore_platform_interface/latest/cloud_firestore_platform_interface/Timestamp-class.html)などが入ったMap構造は”JSON”ではないです。なので、そういった値を含むものをJSONと呼ぶのはおかしいという声をたまに聞きます。

それはそうですが、Dartの場合は以下が慣例になっているため、厳密な定義に拘らず「JSON構造の `Map<String, dynamic>` 」をJSONと呼んで済ませる程度の割り切りをするのが良いと思っています。

- エンコード: `Map<String, dynamic> toJson() => {...};` 形式のメソッド定義
- デコード: `fromJson(Map<String dynamic> json)` 名前付きコンストラクタ定義

## [sdk/json.dart at 460075336b52d37176de9e052b583ee240abc0d1 · dart-lang/sdk](https://github.com/dart-lang/sdk/blob/460075336b52d37176de9e052b583ee240abc0d1/sdk/lib/convert/json.dart#L626)

### [You can't perform that action at this time. You signed in with another tab or window. You signed out in another tab or…](https://github.com/dart-lang/sdk/blob/460075336b52d37176de9e052b583ee240abc0d1/sdk/lib/convert/json.dart#L626)

[github.com](https://github.com/dart-lang/sdk/blob/460075336b52d37176de9e052b583ee240abc0d1/sdk/lib/convert/json.dart#L626)

※DartでのJSONの扱いが特殊という意味ではなく、DartでのJSONの扱いに乗っかるために、厳密なJSONの定義から外れるものもJSONと同様に扱ってしまう方が得策、という意味です。

> エンコード: Map<String, dynamic> toJson() => {...}; 形式のメソッド定義

これはインターフェースとして型的に定められているわけではないですが、[jsonEncode](https://api.dart.dev/be/175791/dart-convert/jsonEncode.html)関数を呼ぶと、内部で以下の処理が呼ばれます。

Dart実装内部で `toJson()` が呼ばれている箇所

![[13Q-mxLEOe8wqSlMohwgMrA.png]]

なので、 `toJson` という名前に正確に合わせることはとても重要です。

`fromJson` は [jsonDecode](https://api.flutter.dev/flutter/dart-convert/jsonDecode.html)関数を呼んだ後に適宜自分で呼ぶ処理なので違う名前あるいは未実装でも問題ないですが、あえて別の名前にする意味もないので普通にこの名前に従うのが良いです。

## エンコード・デコードなどの用語

以下のそれぞれの処理を指していて、他にも呼び名がありますが、本記事では書きやすいという程度のちょっとした理由でエンコード・デコード表記にしてます🐶

- Dartクラス → JSON: エンコード、シリアライズ
- JSON → Dartクラス: デコード、デシリアライズ、パース

それでは、以下Dart の JSON デコード・エンコード処理の Tips などを紹介していきます。

# typedef の活用

[Dart 2.13で、 ](https://medium.com/dartlang/announcing-dart-2-13-c6d547b57067)[`typedef`](https://medium.com/dartlang/announcing-dart-2-13-c6d547b57067)[ で型に別名を与えられるようになりました](https://medium.com/dartlang/announcing-dart-2-13-c6d547b57067)(それまでは関数型の定義しかできませんでした)。

これを活用して、以下のようにするとすっきりして、読み書きしやすくなって良いです👌

```plain text
typedef JsonMap = Map<String, dynamic>;
```

記事の例では、 `Json` という名前にしててどちらでも良いですが、 個人的には `Json` 構造の `Map` という意味合いで `JsonMap` にしてます(公式や定番パッケージで定義されたらそれに従う予定ですが、僕の知る限りそういうのがなくてプロジェクトなどで各々定義していることが多いです)。

以下、[json_serializable](https://pub.dev/packages/json_serializable) およびそれに依存している [freezed](https://pub.dev/packages/freezed) 利用に関するテクニックを書いていきます。[json_serializable](https://pub.dev/packages/json_serializable) 単体よりも [freezed](https://pub.dev/packages/freezed) 経由で使われることが多く感じるので、freezedでの書き方中心にします(json_serializable単体利用の場合でも同様の内容がほとんどです)。

# 自動生成コードの折り畳み

`user.dart` にfreezedで定義したクラスの自動生成を実行( `dart run build_runner build` )するとそのファイルの隣に自動生成ファイルが2つ生成されて、次のようになります。

![[1eocJ3RK9LVIY8aEbV_nFkg.png]]

こうやって並ぶと、同階層のファイルが無駄に多くなって微妙なので、フォルダに隔離して `user/user.dart` などとすることもけっこうあるはずです。

[VS Code 1.64で追加された機能であるExplorer file nesting](https://code.visualstudio.com/updates/v1_64#_explorer-file-nesting)を活用して、設定ファイル( `settings.json` )に以下の設定をすると、

以下のように自動生成ファイルが元ファイルに束ねられて折り畳み表示されるようになって良い感じです( [https://github.com/Dart-Code/Dart-Code/commit/a97d0eae32df7b3bc6e22532afe8136fd1df4c30](https://github.com/Dart-Code/Dart-Code/commit/a97d0eae32df7b3bc6e22532afe8136fd1df4c30) の対応により、デフォルトでも `*.g.dart` は畳まれますが `*.freezed.dart` は対象外なので現状では自前設定が必要です)。

![[1yrxqEbYy_esR-hArcsMKaw.png]]

![[16AXUVJIh1KJXsmtOzgztxg.png]]

Android Studioの場合は、以下の設定でできます:

## [File nesting dialog | IntelliJ IDEA](https://www.jetbrains.com/help/idea/file-nesting-dialog.html)

### [Use this dialog to configure presentation of files with the same names but different suffixes. Such bunches of files…](https://www.jetbrains.com/help/idea/file-nesting-dialog.html)

[www.jetbrains.com](https://www.jetbrains.com/help/idea/file-nesting-dialog.html)

個人的には、これらのIDEの設定を各開発者がする前提で、このためだけにフォルダで隔離することはせずにフラット配置(見た目的にはIDEの機能で折り畳まれる)で良いかなと思っています(あるいはIDEの機能活用せずフラット表示でも気にしないというのも個人の自由)。

VS Codeの場合は、プロジェクトルートの `.vscode/settings.json` に上述の設定を書いてコミットするとチーム間でその設定を統一できるので、チームメンバー全員が賛成するならそれも良いですね(自分の好む違う設定にしたいというメンバーがいるならやめた方が良いと思います)。

別解としては、プロジェクトルートの `build.yaml` に以下の記述をして自動生成結果を別のところに隔離するというのもありますが、 `part` が書きにくくなるのが微妙な気もして個人的には採用していません。

# analysis_options.yaml の analyzer/exclude で自動生成ファイルを除外**しない！**

自動生成ファイルに警告が出た際、それを抑制するために `analysis_options.yaml` の `analyzer/exclude` で警告対象から除外するような指定をすればそれを回避できます。

どうしても仕方ない時はそうするしかないですが、ここに指定すると警告だけではなくコンパイルエラーの対象外にもなってしまうので、内容におかしなことがあった時にビルドエラーで失敗するまで気付けなくなってしまいます(さらにそのエラーが分かりにくいものでハマったりもしがちです)。コード自動生成は運良く(?)成功したものの、指定にミスがありコンパイルの通らないコードになってしまった時などにその状況に陥ります。

以前は以下のように回避せざるを得なかったですが、

```plain text
analyzer:
 exclude:
 - '**/*.g.dart'
 - '**/*.freezed.dart'
```

freezedは [https://github.com/rrousselGit/freezed/pull/572](https://github.com/rrousselGit/freezed/pull/572) で、 `*.freezed.dart` の冒頭に以下が挿入されるようになり(Dart 2.15から可能になって指定)、[freezed 1.1.1 としてリリースされ](https://pub.dev/packages/freezed/changelog#111)、プロジェクト側で厳しいLint設定をしていても警告が出ないようになりました🎉
(コンパイルエラーはきちんと検出されます👌)

```plain text
// ignore_for_file: type=lint
```

このため、 `**/*.freezed.dart` 指定は完全に不要です。この改善前からfreezed利用しているプロジェクトや、その設定を引き継いだプロジェクトなどでこの指定が無駄に残っていることも多いと思うので、外しましょう。

また、さらに以下を記述した `build.yaml` をプロジェクトルートに配置してコード自動生成を実行すると、 `**/*.g.dart` でも同様のコメントがファイル冒頭に挿入されるようになって、つまり `**/*.g.dart` も `analyzer/exclude` に含めずに良くなりました🎉

というわけで、まとめると以下のように、 `**/*.freezed.dart` ・`**/*.g.dart` いずれも `analyzer/exclude` に指定するべきではありません。

- freezed 1.1.1 以降、 `*/*.freezed.dart` での警告はデフォルトで発生しない
- `*/*.g.dart` は、 `build.yaml` での指定により、その警告をfreezedと同様に抑制できる

## invalid_annotation_target警告の対処

`analysis_options.yaml` の話題ついでに、invalid_annotation_targetの警告抑制についても触れます。

freezedはjson_serializableパッケージに依存していて、そのアノテーションをfreezed定義コードに適用すると適宜json_serializableパッケージが解釈できる形にコピーして機能するようにしてくれるようになっています。

そのため、次のようなコードを書くと、3および5行目で、[invalid_annotation_target](https://dart.dev/tools/diagnostic-messages?utm_source=dartdev&utm_medium=redir&utm_id=diagcode&utm_content=invalid_annotation_target#invalid_annotation_target) という警告が発生してしまいます。

なぜなら、json_serializableパッケージとしては、次のように使われる想定のアノテーションであり、そこ以外の場所に指定されたものを誤用と指摘してくれているからです(先述の通りfreezedパッケージは自動生成コードとして適切な場所にコピーしてくれるので上の指定はfreezed的には正しく、機能します)。

- @JsonSerializable(): クラス定義の上に置かれる想定
- @JsonKey(): フィール定義の上に置かれる設定

次のIssueで管理されていますが、

## [Using json_serializable v5 causes invalid_annotation_target warnings · Issue #488 ·…](https://github.com/rrousselGit/freezed/issues/488)

### [You can't perform that action at this time. You signed in with another tab or window. You signed out in another tab or…](https://github.com/rrousselGit/freezed/issues/488)

[github.com](https://github.com/rrousselGit/freezed/issues/488)

とりあえずは `analysis_options.yaml` に以下指定して無効化するか、あるいは個別にignoreすることでしのぐしかないですね(アノテーション指定場所の誤りでハマることは少ないと思うので基本的には一括での無効化をお勧めします)。

```plain text
analyzer:
 errors:
 #https://github.com/rrousselGit/freezed/issues/488
 invalid_annotation_target: ignore
```

[https://github.com/rrousselGit/freezed/issues/488#issuecomment-1100608231](https://github.com/rrousselGit/freezed/issues/488#issuecomment-1100608231) のコメントのように、根本的に解決するにはjson_serializable依存せずにfreezed側で同様の処理をするしかなさそうと結論付けられています。
(現状、json_serializable依存していることで大きな問題抱えているわけではないので、実際にそのような変更が近いうちに行われる可能性は低いだろうと思っています)

# JSONのキー名とのマッピング指定

Json構造のMap(具体的にはWeb APIのレスポンスやFirestoreドキュメント)のキー名と、デコードされるクラスのフィールド名は、[Dartのフィールド名などの命名規則](https://dart.dev/guides/language/effective-dart/style#do-name-other-identifiers-using-lowercamelcase)に合わせて、lowerCamelCaseに揃えるのが楽でお勧めです(Dart関係なく一般的にもJSONのキー名はJavaScriptに合わせてlowerCamelCaseが良いだろうと思っています)。

しかしすでにデータ構造が確定していて別の命名規則になってしまっている場合はDart側で合わせる必要があります。

まず、次のようなコードがあったとします。

```plain text
@freezed
class User with _$User {
 const factory User(
 String? displayName,
 ) = _User;const User._();factory User.fromJson(JsonMap json) => _$UserFromJson(json);
}
```

JSONが以下であれば何の調整も不要ですが、

```plain text
{
 "displayName": "mono"
}
```

以下のように snake_case になっていたとします。

```plain text
{
 "display_name": "mono"
}
```

この場合、キー名不合致で値が得られなくなってしまうので、調整が必要です。

## @JsonKey(name:) での指定

もっとも簡単に辿り着くであろう方法がこちらです。

```plain text
@JsonKey(name: 'display_name') String? displayName,
```

このように書き換えてコード自動生成再実行すると、 `user.g.dart` で `'displayName'` となっていた箇所が `'display_name'` に変わります👌

ただ、個別に特殊なキー名へのマッピングが必要な場合はこれが適してますが、今回のように違う命名規則への変換であれば別の適した方法があります。

## [@JsonSerializable](http://twitter.com/JsonSerializable)(fieldRename) での指定

そのクラス全体(正確にはfreezedのコンストラクタのフィールド)の命名規則を変えたい場合は、以下のようにすればできます 👌

```plain text
@freezed
class User with _$User {
@JsonSerializable(fieldRename: FieldRename.snake)
 const factory User(
 String? displayName,
 ) = _User;const User._();factory User.fromJson(JsonMap json) => _$UserFromJson(json);
}
```

json_serializableパッケージとして指定する場合はクラス名の上ですが、freezedの場合はコンストラクタの上に指定することに注意です。

しかし、そのクラスだけではなく全体的にそのような命名ルールになっていることが多いはずです。

## `build.yaml` の `options/field_rename` 指定

全体で指定したい場合、`build.yaml` の `options/field_rename` に指定すれば良いです。

```plain text
targets:
 $default:
 builders:
 json_serializable:
 options:
 field_rename: snake
```

[FieldRename enum](https://pub.dev/documentation/json_annotation/latest/json_annotation/FieldRename.html) で定義されている値のいずれかを指定できます。

というわけでまとめると、以下の順に大きな粒度から必要に応じて細かい個別指定の優先順で検討・指定していくと良いです。

8. `build.yaml` の `options/field_rename` に指定
9. [@JsonSerializable](http://twitter.com/JsonSerializable)(fieldRename) での指定
10. [@JsonKey](http://twitter.com/JsonKey)(name:) での指定

指定されていた場合、個別指定ほど(下ほど)優先されます👌

# enum値のマッピング

次のようなenumとそのフィールドがあった時、デフォルトではエンコード時(JSONへの変換時)にenumの値はそのまま文字列に変換されます。

```plain text
enum Animal {
 dog,
 cat,
}@freezed
class User with _$User {
 const factory User(
Animal? favoriteAnimal,
 ) = _User;const User._();factory User.fromJson(JsonMap json) => _$UserFromJson(json);
}
```

実際に生成されるファイルを見るとより分かりやすいかもしれません。

![[1_OJTRlAXXT2KcNPWMbvy5w.png]]

$enumDecodeNullableは、json_annotationパッケージに含まれるコードで、説明と実装がそのドキュメントに記載されています。

## [$enumDecodeNullable function - json_annotation library - Dart API](https://pub.dev/documentation/json_annotation/latest/json_annotation/$enumDecodeNullable.html)

### [Returns the key associated with value source from enumValues, if one exists. If unknownValue is not null and source is…](https://pub.dev/documentation/json_annotation/latest/json_annotation/$enumDecodeNullable.html)

[pub.dev](https://pub.dev/documentation/json_annotation/latest/json_annotation/$enumDecodeNullable.html)

JSONのキー名と同様、これもこのデフォルトの挙動に合わせられるならそれに越したことがないですが、変える場合について説明します。

PascalCaseの命名規則にしたいと仮定します。

## [@JsonValue](http://twitter.com/JsonValue)() での指定

次のようにすると、値個別にenum値のマッピングを指定できます。

```plain text
enum Animal {
@JsonValue('Dog')
 dog,
@JsonValue('Cat')
 cat,
}
```

ただ、JSONのキー名と同様、もう少し一括で指定することもできます。

## [@JsonEnum](http://twitter.com/JsonEnum)(fieldRename) での指定

[@JsonEnum](http://twitter.com/JsonEnum)(fieldRename:) で指定すると、そのenumの全値のマッピングを一括で変えられるので、統一的に変えたい場合はこちらがベターです。

```plain text
@JsonEnum(fieldRename: FieldRename.pascal)
enum Animal {
 dog,
 cat,
}
```

残念ながら、 `build.yaml` に指定するやり方は現時点ではないようで、このIssueの動向に注目です👀

## [Configure fieldRename for enums in build.yaml · Issue #1021 · google/json_serializable.dart](https://github.com/google/json_serializable.dart/issues/1021)

### [We have now support for fieldRename on a per-enum basis (rather than per-value), which simplifies the setup. In our…](https://github.com/google/json_serializable.dart/issues/1021)

[github.com](https://github.com/google/json_serializable.dart/issues/1021)

## toJsonを利用したテクニック

[Dart 2.17 のEnhanced enum](https://medium.com/dartlang/dart-2-17-b216bfc80c5d) でメソッド定義ができるようになったことを利用して、以下のように書いてエンコード結果を変えることもできます。

`Animal.dog` はデフォルトでは `"dog"` 文字列にエンコードされます([name](https://api.flutter.dev/flutter/dart-core/EnumName/name.html)の結果と同じ)が、以下のように書いた場合は `"Animal.dog"` になります。

```plain text
enum Animal {
 dog,
 cat,
 ;String toJson() => toString();
}
```

# コード自動生成処理の高速化

話題は変わって、freezedのコード自動生成処理の高速化についてです。以下の記事でも簡単に触れた内容です。

freezed導入後、初めのうちはあまり気になりませんが、数万行規模のコードになるとコード自動生成にかかる処理がどんどん長くなってくるのが気になってきます(freezedの問題ではなくbuild_runner側の問題のはず)。

そこで、次のように `generate_for/include` で特定のファイル群に絞るとその絞った分に応じて速くなります(例として、20秒程度かかっていたコードが3秒程度になったりします)。

なので、実行時間が長くなった際の対処としお勧めなものの、その指定に従うようにファイルの置き場所・命名が足を引っ張られることがあるなどのマイナス面もあります。一長一短ですが、ある程度以上の規模の場合(になりそうな場合)には、指定を適当に工夫しながら取り入れると良いと思います👌

Dartに[Static Metaprogramming](https://github.com/dart-lang/language/issues/1482)が導入されて今freezedでbuild_runnerで自動生成されているものがその仕組みでカバーされるようになったら解消するはずですが、まだけっこう待つ必要がありそうです。

# build.yaml のその他の設定

`build.yaml` の `json_serializable/options` には [JsonSerializable](https://pub.dev/documentation/json_annotation/latest/json_annotation/JsonSerializable-class.html) のプロパティ名をcamel_caseにしたものを指定できます。その中でも必要なことがちょくちょくある2つの指定を紹介します。それぞれドキュメントを探しにくいのですが、リンク貼ってあります👌

## [`any_map`](https://pub.dev/documentation/json_annotation/latest/json_annotation/JsonSerializable/anyMap.html)

`Map<Object?, Object?>` 型などを `as Map<String, dynamic>` にキャストしようとすると以下のエラーになり、 `any_map: true` を指定するとそれを回避できるようになります。

> error: type ‘_InternalLinkedHashMap<Object?, Object?>’ is not a subtype of type ‘Map<String, dynamic>’ in type cast

特にFlutterFireのパッケージを使っているとこのエラーに遭遇しがちで、かなり改善されたものの、cloud_functionsのレスポンスにネストしたMap構造があるとまだこの問題が起こります。

- cloud_firestore: かつては [https://github.com/firebase/flutterfire/issues/833](https://github.com/firebase/flutterfire/issues/833) の問題があったが、現在は [https://github.com/firebase/flutterfire/pull/2913](https://github.com/firebase/flutterfire/pull/2913) にて解決済み✅
- cloud_functions: レスポンスにネストしたMap構造があるとこの問題が起こる([https://github.com/firebase/flutterfire/issues/6546](https://github.com/firebase/flutterfire/issues/6546))

逆に言うと、このcloud_functionsの問題に該当しないのであれば、今は `any_map: true` は不要な状況です👌

`any_map: true` を指定して自動生成し直すと、次のような差分が生じます。

自動生成ゆえの問題ではなく、手動の場合でも同様に上記のような状況では同じく一旦 `Map` ( `Map<dynamic, dynamic>` )を挟んでから明示的にキャスト処理( [Map.cast()](https://api.dart.dev/stable/2.17.3/dart-core/Map/cast.html) ・[Map.of()](https://api.dart.dev/stable/2.18.1/dart-core/Map/Map.from.html) など)を実行する必要があります。

## [explicit_to_json](https://pub.dev/documentation/json_annotation/latest/json_annotation/JsonSerializable/explicitToJson.html)

`explicit_to_json: true` とすると、自動生成された `toJson` 処理内で、ネストしたオブジェクトに対して、 `.toJson()` を呼んでくれるようになります。

デフォルトがfalseな理由としては、ドキュメントには以下のように書かれています。

> When using JSON encoding support in dart:convert, toJson is automatically called on objects, so the default behavior (explicitToJson: false) is to omit the toJson call.

しかし、Firestoreドキュメント保存処理の場合は [jsonEncode](https://api.dart.dev/be/175791/dart-convert/jsonEncode.html) は呼ばずに `Map<String, dynamic>` あたりを直接渡すのでドキュメントに記載されているようなネストしたオブジェクトの `toJson()` が自動的に呼ばれるようなことはありません。そのため、 `toJson()` が必要なオブジェクトがネストされたクラスをFirestoreに保存したい時などは`explicit_to_json: true` にする必要があります。そうなっていない場合は次のようなエラーが発生してしまいます。

> Invalid argument: Instance of ‘_$_Foo’

つまり、Firestoreである程度複雑なドキュメント構造の保存処理がある場合はいつかはこのエラーに遭遇する可能性が高く、初めから `explicit_to_json: true` にしておくことがお勧めかなと思います。

ちなみに、もしTimestampなどFirestore固有型でJSONの仕様外のものが含まれているMap(Firestoreにはそのまま保存可能)をjsonEncode関数に渡すと以下のようなエラーが発生します。

> Converting object to an encodable object failed: Instance of ‘Timestamp’

# JsonConverter

json_serializableパッケージは、String・intなど以外でも、以下の一部の基本型についてはデフォルトでデコード・エンコード処理をサポートしています。

- [BigInt](https://api.flutter.dev/flutter/dart-core/BigInt-class.html): 文字列表現
- Uri: 文字列表現
- DateTime: 文字列表現(ISO8601)
- Duration: int表現(マイクロ秒)

それ以外の型を扱いたい場合やエンコード時の値を変えたい場合(DateTimeをUNIX時間に変換したいなど)は、JsonConverterの実装などが必要になってきます( `@JsonKey(toJson:fromJson)` でも良いですがJsonConverterの方が扱いやすくあまり使わないはずです)。

## [JsonConverter class - json_annotation library - Dart API](https://pub.dev/documentation/json_annotation/latest/json_annotation/JsonConverter-class.html)

### [API docs for the JsonConverter class from the json_annotation library, for the Dart programming language.](https://pub.dev/documentation/json_annotation/latest/json_annotation/JsonConverter-class.html)

[pub.dev](https://pub.dev/documentation/json_annotation/latest/json_annotation/JsonConverter-class.html)

> DateTimeをUNIX時間に変換したいなど

例えば、こちらの場合は次のようなJsonConverterを定義して、

```plain text
class DateTimeEpochConverter implements JsonConverter<DateTime, int> {
 const DateTimeEpochConverter();
@override
 DateTime fromJson(int json) => DateTime.fromMillisecondsSinceEpoch(json);
@override
 int toJson(DateTime object) => object.millisecondsSinceEpoch;
}
```

次のように指定すれば良いです👌

```plain text
@DateTimeEpochConverter() DateTime? dateTime,
```

さらに、次のように定義して、

```plain text
const dateTimeEpochConverter = DateTimeEpochConverter();
```

次のように指定することもでき、少しだけスッキリさせることができます。

```plain text
@dateTimeEpochConverter DateTime? dateTime,
```

おなじみのfreezedのアノテーションも普段使っているのはこのように定数で定義された `@freezed` の方ですね。

```plain text
@freezed
@Freezed() // 様々なオプション指定をするときはこちらを使う
```

## nullableと非nullableでのJsonConverterは同じものを使える

Flutter 2/Dart 2.12リリース後、JsonConverterは同じ型でもnullableと非nullableのフィールドそれぞれに指定したい場合、それぞれに対して別途用意しなくてはならず面倒でした。

しかし、2022年7月にリリースされた[json_serializable 6.3.0](https://pub.dev/packages/json_serializable/changelog#630)で、非nullable版だけ用意しておけば済むようになってとても楽になりました🎉それより前から開発を進めていたプロジェクトは、大抵nullable版のJsonConverterも用意してしまっていると思うので、少なくとも新規コードは非nullable版だけで済ませたり既存コードも整理するのをお勧めします。

## JSON値がnullではなくて空系の場合は対処必要

例えば次のようなフィールドがあった時、

```plain text
@freezed
class User with _$User {
 const factory User(
DateTime? birthday,
 ) = _User;const User._();factory User.fromJson(JsonMap json) => _$UserFromJson(json);
}
```

`birthday` の値がない時のJSONは、フィールド自体が無いか、あるいは値が `null` であればそのまま簡単に扱えます。

しかし、値が無い時にJSONとしては次のような空系の値になっている場合、null扱いにする処理を追加した独自JsonConverterを定義・指定が必要になってきたりします。

```plain text
{
 "birthday": ""
}
```

あるいは、以下のように元のjsonを正規化するような処理を挟むのも良いと思います。こちらで済むなら、その方が簡単で良いと思います 👌

```plain text
@freezed
class User with _$User {
 const factory User(
 DateTime? birthday,
 ) = _User;const User._();factory User.fromJson(JsonMap json) =>
 _$UserFromJson(json..removeIfEmpty(['birthday']));
}extension JsonMapX on JsonMap {
 voidremoveIfEmpty(Iterable<String> keys) {
 for (final key in keys) {
 if (this[key] == '') {
 remove(key);
 }
 }
 }
}
```

## JsonConverterの一括指定

同じく、[json_serializable 6.3.0](https://pub.dev/packages/json_serializable/changelog#630)で、 `JsonSerializable(converters: <JsonConverter>[])` という書き方によって、特定のクラスにまとめてJsonConverterを指定できるようになりました 🎉

つまり、このような感じで扱えるようになって、以前より便利かつ指定忘れをほとんどせずに済むようになりました(指定漏れがあるとコード自動生成が失敗して原因箇所把握して再実行が面倒)。

11. そのプロジェクトで定義したJsonConverterの配列を用意、あるいはそれを`JsonSerializable(converters:)` に指定した定数を用意
12. freezedのコンストラクタの上にその`JsonSerializable` を指定
13. もしそれらとは別のJsonConverterを指定したいものがあった時だけ個別指定

弊[json_converter_helper](https://pub.dev/packages/json_converter_helper)パッケージ(ドキュメント不足・破壊的変更あり得るので注意)のコードが参考になると思うので、それぞれに相当するコードを貼っておきます。

1. [https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/lib/src/json_converter_helper.dart#L10-L19](https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/lib/src/json_converter_helper.dart#L10-L19)

![[1uU_0VTcnO14-qofKXztbMg.png]]

2. [https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/test/helper/entity.dart#L12](https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/test/helper/entity.dart#L12)

![[1nx558TZvSPu1uPBGCO3c2Q.png]]

3. [https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/test/helper/entity.dart#L18-L19](https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/test/helper/entity.dart#L18-L19)

![[10Z1MRMqAV9qSs5aikQrpXg.png]]

## [json_converter_helper](https://pub.dev/packages/json_converter_helper)の紹介

上で先に触れてしまいましたが、自作のjson_converter_helperパッケージについて少し紹介します。

これは先述の[json_serializable 6.3.0](https://pub.dev/packages/json_serializable/changelog#630)リリース直後に、開発中のプロジェクトをそれに合わせてリファクタリングするついでにリリースしたもので、特にFirestoreを扱う際に必要なJsonConverterを共通管理するために切り出しました。もし使う場合、ドキュメント不足・破壊的変更あり得る点に注意してください。

使わない場合でも、コード的に参考になると思うのでぜひご活用ください。

特に、以下のようにUnionクラスで用意したUnionTimestampを利用したunionTimestampConverterはFirestoreのTimestamp型を扱うときに便利かと思います。

- Dartフィールド: UnionTimestamp独自型( `DateTime` or `FieldValue.serverTimestamp()` )
- JSON: Timestamp

UnionTimestampConverter・UnionTimestamp: [https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/lib/src/union_timestamp.dart](https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/lib/src/union_timestamp.dart)

![[1Up8kjKLyzTWo-FOYqv_lYw.png]]

保存時に常に更新したいフィールドは、`@UnionTimestampConverter.alwaysServerTimestampConverter` を使うと、デコードはTimestampを元に普通にされる一方、エンコード結果は常に`FieldValue.serverTimestamp()` になって、つまり特に指定せずとも必ずサーバー時刻で保存されるようになります 👌

3. [https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/test/helper/entity.dart#L18-L19](https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/test/helper/entity.dart#L18-L19)

ちなみに、普通の定数では機能せず、次のようにクラス内の `static const` フィールドにする必要があって、謎でした 🤔

`@UnionTimestampConverter.alwaysServerTimestampConverterの実装: `[https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/lib/src/union_timestamp.dart#L13-L15](https://github.com/mono0926/json_converter_helper/blob/6d3cc31d5faf3b2c97e1218073d2b3718d5e11f7/lib/src/union_timestamp.dart#L13-L15)

![[14GnRK7Om3wszjKr81WR6tA.png]]

この他にもJSONデコード・エンコードに関する指定は色々ありますが、本記事を把握すれば、あとは似たような要領で、[JsonSerializable](https://pub.dev/documentation/json_annotation/latest/json_annotation/JsonSerializable-class.html)・[Freezed](https://pub.dev/documentation/freezed_annotation/latest/freezed_annotation/Freezed-class.html)などのコード補完やドキュメントなど頼りにスムーズに対応進められると思います🐶