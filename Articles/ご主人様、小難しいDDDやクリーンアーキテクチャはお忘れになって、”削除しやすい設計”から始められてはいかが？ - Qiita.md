---
Created: 2021-01-15T20:18:00
URL: https://qiita.com/mejileben/items/48473a572ec07cbaf65f
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
ある日夢の中で設計に詳しい悪役令嬢が現れてこんなことを言い放ったので、考察してみましたという**設定**のポエムです。

# 問題提起

ドメイン駆動設計、オニオンアーキテクチャ、クリーンアーキテクチャといった考え方はもちろん重要なものの、僕は難しく考えずに「削除しやすいように機能を作る」のが第一歩として重要ではないかと考えています。

本記事では「削除しやすい設計」について持論を展開してみます。

※議論のスコープはWebサービスに限定し、例示としてPHPのフレームワークであるLaravelを用います

## 削除しやすいことがなぜ重要か

一度開発した機能は、それで終わりではなく、改修、改善を繰り返し、そして場合によっては仕様が廃止されることがあります。

機能の廃止に伴ってコードを削除するとき、もし既存のコードの依存関係が複雑で、簡単に削除できなかった場合は、**フロントエンドのみ削除して、バックエンドのロジックを残したままにする、といった暫定対処を行う**こともあるでしょう。

こういった対応で要件を満たし続けた場合、徐々に新規機能の開発や、既存機能の改善に影響を及ぼします。

既存のソースコードがどの機能で使われているのか不透明になることで、ソースコードの再利用がやりにくくなり開発工数が増加、加えて、使われていない可能性もあると開発者が認知することにより、**使われていないと思って改修したら実は使われていた**、という逆にハマってしまう事例も起きうるでしょう。それに、ライブラリや言語のバージョンアップといったメンテナンス工数も肥大化します。

残念なことに、一度開発した機能が廃止されるというのはWebサービスではよくあることです。

こういった背景から、改修しやすいように、改善しやすいようにという観点だけではなく、消しやすいように作るということを考えるのが重要ではないかと考えますし、実は、**削除しやすいということが最も重要な設計要件といっても過言ではない**のではとも思います。

## 削除しやすいように作ることで何が嬉しいか

前節の通り、削除しやすいようにコードを作ることで、機能の廃止時にほぼ全ての関連するコードを削除することが可能になります。

そうすれば、常にソースコードを無駄に肥大化させることを防ぎ、メンテナンスのしやすさを向上できます。

また、削除しやすいように作るということは、ソースコード間の依存関係に気を使うということになる、副次的に設計の改善効果をもたらすと思います。

例えばドメイン駆動設計に則って開発しよう、というと人によって考え方が異なるケースが多いです。**削除しやすいように作ろう、と言う標語は、それに比べればかなり明確な指針**と言えるのではないでしょうか。

※もちろんDDDを否定する意見では有りませんし、僕自身もDDDを愛用しています。ただ、DDDだけで全ての機能開発ができるわけではないですし、もっと明確な指針という意味でも本記事で提示する考え方を主張しています。

# 削除しやすい設計を実践する

弊社ではLaravelを使っているので、Laravel前提での解説となりますが、他のフレームワークにおいても応用ができると思います。

前置きが大袈裟でしたが、実践する内容は至ってシンプルなものばかりです。それでは説明を始めます。

## Controllerは1クラス1メソッドにする

Controllerは1メソッドしか持たないように実装します。

Laravelですと、`__invoke` メソッドを実装したControllerにすることで、1メソッドしか持たないことを強制できます。ルーティングファイル(routes/web.php等)でも`XXXController@hoge`ではなく、`XXXController`だけで書けてシンプルです。

一例として、ログイン処理を実行するControllerを示します。

`class SignInController extends Controller
{
    public function __invoke(LoginRequest $request, LoginUseCase $loginUseCase): UserAccountResource
    {
        // ログイン処理を行いユーザーアカウントを示すインスタンス$userを取得する。詳細は省略
        // $user = $loginUseCase->execute(...

        return new UserAccountResource($user);
    }
}`

### Pros

利点としては、本来の目的通り、機能削除時にクラスごと消せばいいので大変明確です。

機能が増えてもControllerがFatになりにくい利点もあります。ログイン処理のControllerなんて基本1メソッドだから__invokeとしなくて良いのではという見解もあるかもしれませんが、例えば複数の種別のユーザーを扱っておりそれぞれログイン処理が異なる可能性などがあります。

弊社では以前UserControllerといった粒度で命名したControllerに大量のユーザー関連の処理が詰め込まれ、各アクションメソッドが何をしたいのか分からなくなることが有りましたが、その心配も不要になります。

## ユースケース（またはサービスクラス）も1クラス1メソッドにする

Controllerと同様、よくあるサービスクラスも1クラス1メソッドにします。

僕は統一した決まりとして、ユースケースは`execute`メソッドだけを持っており、コンストラクタでRepository等をインジェクションしています。

Prosについても同様です。UserServiceといったサービス名で作ってしまうと、あらゆる処理が詰め込まれてしまい、機能削除時に削除漏れしてしまうことが発生します。

## あらゆる実装を統一したディレクトリ名の配下に置く

Laravelの場合は、

- Controller
- ユースケース（サービスクラス）
- Repository
- Eloquent Model
- メール
- イベントとイベントリスナ
- 通知
- コマンド
- テストコード

といった各機能が、基本的にはLaravelが決めたディレクトリの下に置かれることが多いと思いますが、これらのnamespaceに含まれるディレクトリ名にできるだけ単語の統一を図ります。

ある機能名が、SomeAwesomeとした場合、

- `**App\Http\Controllers\SomeAwesome\XXXController**`
- `**App\Domain\SomeAwesome**`** の下にユースケース、Repositoryを始めとするドメインロジック**
- `**App\Mail\SomeAwesome**`**の下にメール**
- `**App\Events\SomeAwesome**`**の下にイベント、同様にリスナも配置**
- `**App\Commands\SomeAwesome**`**の下にコマンド**

といったように、Laravelの規律に従いつつ、機能別の単語に合ったnamespaceに置くようにしています。

### Pros

まだ全ての機能に対しては実現できていませんが、実現できた機能は廃止するときに大変削除しやすかったです。

### 補足

全ての機能を`App\Domain`以下に置く方針も考えたのですが、Laravelの経験者が実装するときの学習コストが無駄に上がってしまうデメリットも鑑みて、Laravelに依存しない純粋なドメインロジックのみ`App\Domain`以下に置くやり方で現状は進めています。このへんはFWとどう向き合うかによって異なります。

### 補足2

機能名の英語ですが、ユニーク性にこだわるあまり長い名前にするとタイピングがしんどいので、多少厳密な英訳でなくてもタイピングしやすい名前にするのがおすすめです。そもそも機能名なんて割と仕様の都合で変わりますし。（経験済み）

## フレームワークが提供するORMに機能に関する知識を渡さない

続いてはWebアプリケーションフレームワークが往々にして提供しているORMに関する指針です。

Laravelだと`Eloquent Model`が該当しますので、`Eloquent Model`を例に話を進めます。

Railsだと`Active Record`、TypeORMだと`Entity`が該当すると思います。

削除しやすい設計をする上で重要なのは、データベースとやり取りするためのORMに機能に関する知識を渡さないことです。

### ORMのクラスは機能と独立したディレクトリに置く

往々にしてこれらのクラスは、データベースのテーブルと1:1の関係性で作られます。しかし、例えばusersテーブルは様々な機能で利用されるテーブルでしょうから、SomeAwesomeディレクトリを切ってその下に置くのは不適切と考えるほうが自然です。

そのため、`Eloquent Model`に関しては機能名のディレクトリの下に置くルールを適用しません。シンプルに`App\Models`の下に置きます。

### ORMに機能に関する知識をもたせるとどうなるか

例えば、Q&A機能を持ったサービスを開発しているとして、すでに質問したことのあるユーザーかどうかを判断するアクセサをモデルに実装したとします。Laravelでは`XXXAttribute`というメソッドを生やすことでアクセサを定義できます（個人的には分かりにくいのであまり好きではな略）。

`public function getHasQuestionsAttribute(): bool {
    return $this->questions->isNotEmpty();
}`

これだけだと非常にシンプルですが、実際にはここに「誹謗中傷の含まれた質問だったため運営から非表示対応された質問は除く」といったドメイン知識が混ざってくるとしましょう。

`public function getHasQuestionsAttribute(): bool {
    // 雑に書いているので動くかわかりませんが、一応これが動く前提で話を進めます
    return $this->questions->where('is_hidden', false)->isNotEmpty();
}`

この書き方ですとquestionsを取得した後`Collection`のメソッドで絞っているのでパフォーマンス良くないですし、「運営が質問を非表示対応できる」機能の一部がここに現れてしまっており、今後この機能を廃止したときに削除漏れしてしまう可能性があります。

このように、`Eloquent Model`を使い回す前提の機能開発は、どこに機能の実装があるか不透明になってしまい、削除しにくくなる、または削除したと思っても消しきれておらずバグを誘発する可能性があります。

### 機能ごとにデータを取得・保持・整形するクラスを用意する

というわけで指針としては、前節における`App\Domain\SomeAwesome`といった機能別のnamespace以下に、各機能ごとのデータを取得・保持・整形するクラスを用意することになります。

データの取得は機能ごとに`Repository`を作成します。同時に、データを保持するためのDTOを作成しておき、`Repository`はORMを使ってデータベースから値を取得するものの、戻り値としてはDTOを返すように実装します。（※ドメイン駆動設計のアプローチではここでのDTOがEntityだったりValueObjectと呼ばれていますが、ここではDTOと便宜上呼ぶことにします）

弊社で組んでいる簡単な`Repository`で例を示すと下記の感じです。

`<?php

namespace App\Domain\SomeAwesome\Infrastructure;

use App\Domain\SomeAwesome\Domain\Entity\Teacher;
use App\Domain\SomeAwesome\Domain\Repository\TeacherRepositoryInterface;
use App\Models\Teacher as TeacherModel;

final class MySQLTeacherRepository implements TeacherRepositoryInterface
{
    public function find(int $userId): Teacher
    {
        $teacherData = TeacherModel::findOrFail($userId);

        return Teacher::reconstructFromRepository(
            $teacherData->id,
            $teacherData->name
        );
    }
}`

`App\Models\Teacher`を使ってデータを取得しているものの、`Repository`の返り値としては`Teacher`という`Entity`になっていることがわかると思います。（※ここでの`Entity`はDDDにおける`Entity`を指しますが、本記事では単にデータの入れ物と思っていただければ差し支えないです）

機能の仕様は、`Entity`の`reconstructFromRepository`メソッド内で表現したり、この`Repository`で投げるSQLで表現します。いずれにせよ、`Eloquent Model`自体には何もメソッドが足されていないことがポイントです。

クエリを実行するための`Repository`という存在、およびデータを運ぶDTOを作成することによって、機能に依存した実装をORMから引き剥がすことができるという話でした。

## 細かい機能でも気軽に1クラスに切り出す

最後に書くのは、細かい機能でも気軽にクラスとして切り出すというものです。

ここまでの話でも似たようなことを言ってきましたが、一応セクションとして用意しておきます。

### フォーマッタの例

まずは、フォーマッタの実装について挙げます。

弊社で以前、「生徒の学年表記を短縮して表示したい」という要件が来ました。

「小学1年生、小学2年生、小学3年生」という配列を「小学1〜3年生」と表示してほしいという要件です。同じ条件が中学生、高校生にもあります。

ただ実装するだけですと、`API Resource`内でprivateなメソッドを切って変換用の関数としたり、`Eloquent Model`のAttributeとして`getFormattedGradeAttribute`などを切っても良かったでしょう。

しかしここでは、専用の、`XXXXGradeFormatter`というクラスを作成することにしました。そして、そのクラスはたった1つのpublicメソッドである`formatGradesToText`を持つようにしました。

`final class XXXXGradeFormatter
{
    /**
     * 対象学年をテキスト形式にフォーマットする
     *
     * @param MasterGrade[] $grades
     * @return string|null
     */
    public static function formatGradesToText(array $grades)
    {`

### Pros

こうするとテストも書きやすくなりますし、もちろん、削除したいときはクラス名でIDEを使って依存を検索すればすぐにわかります。

クラス名にXXXXとついているのは、機能の名前です。単にGrade Formatterという命名にすると、その機能以外で学年のフォーマットをしたいときに自動的に仕様が同じになります。そのときに仕様が同じとは限りませんし、そうなればリファクタしたらいい話です。最初から過度に使われることを想定するのは悪手が多いと思います。

一応、テストの例を下記に示します。学年のデータしか用意しなくていいのでテストがスリムです。

`final class XXXXGradeFormatterTest extends SetUpUserDataTestCase
{
    /**
     * @dataProvider dp__grade_patterns
     */
    public function testFormatGradesToTextTest($gradeNames, $expectText)
    {
        $grades = [];
        //...中略
        $this->assertEquals($expectText, XXXXGradeFormatter::formatGradesToText($grades));
    }

    public function dp__grade_patterns()
    {
        return [
            [
                ['小学2年生'],
                '小学2年生',
            ],
            //...中略
            [
                ['小学1年生', '小学2年生', '小学4年生', '小学5年生', '小学6年生', '中学1年生', '中学2年生', '中学3年生', '高校1年生', '高校2年生', '高校浪人'],
                '小学1・2、4〜6年生、中学1〜3年生、高校1・2年生、高校浪人',
            ],
            [
                ['小学1年生', '小学2年生', '小学3年生', '小学5年生', '小学6年生', '中学1年生', '中学3年生', '中学浪人', '高校1年生', '高校2年生', '高校3年生', 'その他'],
                '小学1〜3、5・6年生、中学1・3年生、中学浪人、高校1〜3年生、その他',
            ],
        ];
    }
}`

### 外部APIへのリクエストの例

外部のAPIへのリクエストも、リクエストごとにクラスに切り出すのがよいです。

弊社ではHeadless CMSの`microCMS`を使っており、基本はフロントエンドから呼び出すのですが、まれにバックエンドから呼ぶことがあります。

外部APIへリクエストするとき、下記のようにAPIのパスを呼び出し側のクラスに直接書くのはアンチパターンです。

`        $response = (new Client())->get(
            "何かしらのAPIパス",
            [
                'headers' => [
                    'X-API-KEY' => '何かしらのAPIキー'
                ],
                'timeout' => 30
            ]
        );`

というのも、これが複数のクラスで使われるAPIだった場合、もしAPIが廃止になったり変更になったときの影響範囲が文字列検索でしか見つけられなくなるからです。

下記のように専用のクラスに入れておくことで、IDEの依存を検索すれば見つけられるようになり、より手軽と言えます。

`    public function __construct(
        GeneralArticleMicroCmsClient $generalArticleMicroCmsClient
    )
    {
        $this->generalArticleMicroCmsClient = $generalArticleMicroCmsClient;
    }

// ...中略

    $response = $this->gradeArticleMicroCmsClient->get();`

※本気で組むならRepositoryとしてインターフェースを作成して、裏で`microCMS`を使っていることを隠蔽したほうが良いと思います。マサカリ防止

割と初心者のうちは次々とクラスを切るという発想が浮かばないものですが、切ってみるとテストも書きやすいし再利用も効く、そして削除するときも楽になるのでおすすめです。

# まとめ

色々と削除しやすい設計について書いてみました。

エンジニアの学習過程という観点でも、クラスやインターフェースを気軽にサクサク作るレベルになる前にDDDやクリーンアーキテクチャを学んでも理解が追いつかないんじゃないかなと思っているフシが有り、まずは機能別にクラスを分けていこうという標語はレベル差を吸収できて便利じゃないかなあと思ってます。

クラスを次々に作っていくような方針になっているので、日に日にクラス名や変数名の命名の難しさと向き合うことになってきています。

個人的にはクラス名などの中に、主語動詞目的語をどのように入れるべきかの明確な指針が欲しいです。。。誰か知っている方がいれば教えて下さい！

ぜひTwitterもフォローお願いします！Web開発全般（AWS、Laravel、TypeScript、DDD、Firebase、GitHub Actions等々）についてゆるゆるとツイートしています。

[https://twitter.com/Meijin_garden](https://twitter.com/Meijin_garden)