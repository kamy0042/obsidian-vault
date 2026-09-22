---
URL: https://kappaz.hatenablog.com/entry/2020/09/14/233218
Created: 2021-09-26T21:31:00
Tags: [topic/技術/テスト]
---
![[og-image-1500 6.png]]

色々試したので基本方針、実装上の注意点、その他ハマりどころ等を記録に残す。

# 基本方針

## 構成

- 大まかな構成は[RSpec](http://d.hatena.ne.jp/keyword/RSpec)と似た形でいけそう。
- テストケースの構成は基本的には[RSpec](http://d.hatena.ne.jp/keyword/RSpec)のdescribe/context/itの考え方でいける。 
    - ただしJestではdescribe/testしかないので、describeを[入れ子](http://d.hatena.ne.jp/keyword/%C6%FE%A4%EC%BB%D2)にしてcontextの代用にする(わざわざcontext相当の層を作る必要はないかもしれない)
    - ここは今後の要調査ポイントの1つ
- 各テストケース内の構成も、"データの用意" -> "処理の実行" -> "結果の検証"の[RSpec](http://d.hatena.ne.jp/keyword/RSpec)でよく見る流れでいける。

## Testing Libraryについて

- 公式サイト([https://testing-library.com/docs/intro](https://testing-library.com/docs/intro))にある以下の記載の通り、ソフトウェアを実際に利用するようにテストことを常に認識しておく。つまりどんな機能をテストする場合も、「表示されるテキストやアイコン」で操作対象を特定し、「フォームへの入力」や「ボタン押下」を行う。
> We try to only expose methods and utilities that encourage you to write tests that closely resemble how your web pages are used.
- ただしあくまでインテグレーションテストであるため、外部のモジュール等と連携している箇所は、モックやスタブを用いる。例えばページ遷移が発生する操作をした場合は、「ページ遷移すること」の確認ではなく、「ページ遷移を実現する(おそらく外部の)モジュールにどんなパラメータを渡したか？」をモック等を利用しつつテストすることになる
- 公式ドキュメントが充実しているので、基本は公式ドキュメントを見れば良い。ただ次の翻訳記事も良い。 [React Testing Libraryの使い方 - Qiita](https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f#react-testing-library-%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88)

# 実装時の注意点

"データの用意" -> "処理の実行" -> "結果の検証"のそれぞれに関して、実装時に注意する内容を記載する。

## データの用意

## 処理の実行

- React Testing Libraryの userEventを利用して、フォームの入力/submitやボタンのクリックを行う。
- 操作対象となる要素の選択は React Testing Libraryのscreen.getByText() 等のクエリで取得する。
- フォーム送信時のパラメータを検証する等の必要がある場合は、この時点でMock Objectを、JestのMock関数を用いて作成しておく。詳細は後述。
- あくまでインテグレーションテストなので、処理結果に外部のライブラリが挟まる場合は、そこに渡すパラメータの検証までしかできない。
- userEventは以下参照 
    - 

## 結果の検証

- クエリを用いるだけでも検証になる。
- 必要に応じてexpectとカスタムマッチャを組み合わせる。 
    - ex) expect(screen.queryByText('在庫情報の新規作成')).not.toBeVisible()
- モックを利用して間接出力の検証を行う場合は、mockプロパティを利用する。
- userEventの後に非同期処理が走る場合は、waitForを用いる必要もあるので注意。

# ハマりどころ, 注意点

## Mock Object/Test Stubの作成

一番ハマるのがここ。[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に合わせて適切なMock関数を用意する必要がある。大抵の場合、外部モジュールのモック化が必要になるので、ここではその点に絞って注意点を記載する。恐らくもっと良いやり方はあるが、ひとまず暫定出来るやり方という位置付け。

- 基本的に以下の形でモジュールのmock化と処理の実装ができる。引数のチェックや戻り値が必要ない場合は、jest.mock('axios')だけでも可。jest.mock('XXX')でモック化したmodule内のメソッド等は、全てjest.fn()で置き換えられる。

```plain text
jest.mock('axios')
axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: stocks })
)
```

- ただしこの実装だと、TypeScript利用時にaxios.getがmockImplementationOnceを持つことを認識できないので、型エラーが起こる。そのため以下のような実装で型エラーが回避できる様子。(参考: [node.js - Typescript and Jest: Avoiding type errors on mocked functions - Stack Overflow](https://stackoverflow.com/questions/51495473/typescript-and-jest-avoiding-type-errors-on-mocked-functions))

```plain text
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: stocks })
)
```

- モジュールの構成によっては

```plain text
import * as reactRouterDom from 'react-router-dom'
```

のようにする必要もあるかもしれない。

- 間接出力を検証するためのモック(= Mock Object)の場合は、mockプロパティを用いるために、モックの実装時にjest.fnを利用する必要がある。ただし特に戻り値等の実装をする必要がない場合は、mockImplementationOnce等を利用せずjest.mock('axios')だけでmockプロパティの利用は可能。

```plain text
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const myGetMock = jest.fn(() =>
      Promise.resolve({ data: stocks }))
mockedAxios.get.mockImplementationOnce(myGetMock)
```

- デフォルトの実装を加えたいときは、jest.mockの第2引数を以下の形で用いる。これはあくまでデフォルトなので、別途mockImplementationOnce等で書き換え可能。

```plain text
jest.mock('react-redux', () => {
  return {
    useDispatch: () => () => {
      // do nothing
    },
    useSelector: jest.fn(() => ({
      errors: [],
      stockDetail: {},
    })),
  }
})
```

- mockImplementationOnce等に渡すmockの実装は、引数・戻り値の型をモック対象のメソッドに合わせないと型エラーが起きる点に注意

## TypeError: window.matchMedia is not a function

というエラーが出ることがある。これはJestの問題のようだが、以下の記事を参考にすると解決できる。 [reactjs - Jest test fails : TypeError: window.matchMedia is not a function - Stack Overflow](https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function)

モックとスタブの違いがわからん！かったが今回ある程度理解したので書き記す。 また Jestの公式ドキュメントのMock機能のページを一通り触りつつ、それぞれがモック・スタブのどちらに当たるか考えていく。

# モックとスタブの違い

## XUnitPatterns

前提として、モックやスタブの語源、というかネタ元に関して理解する必要がある。 きっと諸説ある類の話なんだろうが、私としては、XUnitPatterns([http://xunitpatterns.com](http://xunitpatterns.com/))が元だと考えている。 それを踏まえるとモックとスタブは正確に表現するなら、

- Mock Object
- Test Stub

ということになる。まずこの内容を理解するのが良さそうだ。

XUnitPatternsのサイトから理解するのは結構きつい。(英語だし量が多いし。。。) 以下のブログがすごくいい感じにまとめてくれているので参考になる。[xUnit Test PatternsのTest Doubleパターン(Mock、Stub、Fake、Dummy等の定義) - 千里霧中](https://goyoki.hatenablog.com/entry/20120301/1330608789)

以降このブログを参考に要点を書き出す。

## 間接入力と間接出力

理解のためには以下2つの用語がキーになりそうだ。

- 間接入力 
    - 間接入力はテストコードから見えないテスト対象への入力(fetchでhttp GETした場合とか)
- 間接出力 
    - テストコードから見えないテスト対象の出力(fetchでhttp POSTした場合とか)

詳細は上記記事参照のこと

## Mock Objectと Test Stub

その上でそれぞれを大体以下の形で理解した。 話の都合でTest Stubから説明する。 どちらもハリボテとして動くモジュールという意味では似ているが、果たす役割は全く逆と言ってもいいかもしれない。

### Test Stub

- Test Stub は SUT(System Under Test = テスト対象)への間接入力を行うためのモジュール。
- 任意の値をSUTに入力することで、テストの目的に応じてSUTの振る舞いを制御する。
- どちらかというとSUTの一部として機能するモジュール。

### Mock Object

- Mock Objectは、間接出力を検証するためのモジュール。
- SUT(System Under Test = テスト対象) からの間接出力の値が妥当かどうかをチェックして、結果をテストコードに返す。
- Test Stubの機能を包含することもある。
- どちらかというとテストコードの一部として機能するモジュール。

### (おまけ) Test [Spy](http://d.hatena.ne.jp/keyword/Spy)

- Mockオブジェクトから検証機能を抜いたやつ(雑な説明)
- 間接出力を受け取りテストコードに投げる。検証はテストコードで行う

## 注意点

この分類はあくまでXUnitPatterns における分類。世間一般ではモックやスタブは結構色々な意味で使われている可能性がある。 Mock ObjectとTest Stubをまとめてモックと呼ぶ場合もありそう。 そのため人と話す際には認識をきっちり合わせた方が良い。

# JestのMock機能の話

上を踏まえた上でJestのMock機能を触ってみた。 [Mock Functions · Jest](https://jestjs.io/docs/ja/mock-functions)

とりあえず章ごとに軽く所感を残す。 注意点はMock Object(相当) も Test Stub(相当) もどちらもモック機能 で通していること。

## 「モック関数を利用する」

ここは正しくMockObjectとしての使い方っぽい。forEachのコールバックの部分をMockにして、forEachから コールバックに渡すパラメータを中心に検証している。 うん、間接出力を検証している。まさにMock Objectだな！

## 「モックの戻り値」

本文に以下のような記載がある通り、これは間接入力を実現するための使い方であり、Test Stub っぽい。

> モック関数は、テスト中のコードにテスト用の値を注入するのにも利用できます。

正直こっちの使い方の方が出番が多い気がしてならないので、Test Stubとして使うにもかかわらず mockXXXといった名前の関数を使うことになるので、正直混乱をきたしそうだ。まぁJest的にはモックということなんだろうから受け入れる。

## 「モジュールのモック」

この機能もかなり出番が多そうだ。また、Mock Object, Test Stubという観点だと、モジュール次第でどちらもあり得る。

例えばドキュメントの例にもある axios であれば、get の場合は値をSUTに渡すだけなので完全に Test Stubだが、postの場合は まず値を渡すのでその検証を行えばMock Objectだが、postのレスポンスをSUTに渡せばTest Stubを包含していることにもなり、まさしく定義通りのMockObjectだ。

# 最後に

Jestのドキュメントと照らし合わせて、なんとなーくモックとかスタブとかを理解した気持ちになった！☝ ՞ਊ ՞)☝ｳｪｰｲ(古)