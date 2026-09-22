---
URL: https://blog.engineer.adways.net/entry/2020/05/29/153000
Created: 2021-01-27T21:58:00
Tags: [topic/技術/テスト]
---
![[og-image-1500 8.png]]

こんにちは。自称 Kent C. Dodds ファンの梅津です。
 最近はまっていることは Kent のブログを読み漁ることです。

これは Kent C. Dodds が書いた [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details) を翻訳したものです。

- Enzyme のテストの辛さ
- 実装の詳細をテストすることの弊害
- Testing Library による解決方法

などが解説されています。
 また、最後の方に「テストは何のために、誰のために書くのか？」が語られているのですが、いやーこれが本当に深い！
 元の記事が書かれたのは 2018 年ですが、とてもいい内容だったので今更ながらまとめてみました。
 皆さんも是非読んでみてください。

# Testing Implementation Details

実装の詳細をテストすることは災いの元です。
 なぜそうなるのか？そして、それは何を意味しているのでしょうか？

去年（2017 年）、Enzyme を使っていた時（当時はみんなそうだったけど）Enzyme の特定の API を慎重に扱っていました。[shallow rendering は完全に避け](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)、 `instance()` , `state()` , `find('ComponentName')` のような API は絶対に使いませんでした。
 また、他の人のプルリクエストのコードレビューでは、なぜこれらの API を避けることが重要なのかを何度も何度も説明しました。理由は、これらの API はそれぞれコンポーネントの実装の詳細をテストすることを可能にするからです。
 「実装の詳細」とはどういう意味かとよく聞かれます。つまり、これらの API を避けてテストを書くのは難しいのです。なぜこのようなルールを作ってテストを難しくする必要があるのでしょうか？

## なぜ実装の詳細をテストするのが悪いのか

実装の詳細をテストしていると次のような問題が起こります。

1. アプリケーションのコードをリファクタリングしたときにテストが失敗する可能性がある **偽陰性**
2. アプリケーションのコードを壊してもテストが失敗しない可能性がある **偽陽性**

以下の簡単な Accordion コンポーネントを例にそれぞれを順番に見ていきましょう。 

```plain text
// accordion.js
import React from "react";
import AccordionContents from "./accordion-contents";

class Accordion extends React.Component {
  state = { openIndex: 0 };
  setOpenIndex = (openIndex) => this.setState({ openIndex });
  render() {
    const { openIndex } = this.state;
    return (
      <div>
        {this.props.items.map((item, index) => (
          <>
            <button onClick={() => this.setOpenIndex(index)}>
              {item.title}
            </button>
            {index === openIndex ? (
              <AccordionContents>{item.contents}</AccordionContents>
            ) : null}
          </>
        ))}
      </div>
    );
  }
}

export default Accordion;

```

ここに実装の詳細をテストするようなテストコードがあります。

```plain text
// __tests__/accordion.enzyme.js
import React from "react";
// if you're wondering why not shallow,
// then please read https://kcd.im/shallow
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Accordion from "../accordion";

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

test("setOpenIndex sets the open index state properly", () => {
  const wrapper = mount(<Accordion items={[]} />);
  expect(wrapper.state("openIndex")).toBe(0);
  wrapper.instance().setOpenIndex(1);
  expect(wrapper.state("openIndex")).toBe(1);
});

test("Accordion renders AccordionContents with the item contents", () => {
  const hats = { title: "Favorite Hats", contents: "Fedoras are classy" };
  const footware = {
    title: "Favorite Footware",
    contents: "Flipflops are the best",
  };
  const wrapper = mount(<Accordion items={[hats, footware]} />);
  expect(wrapper.find("AccordionContents").props().children).toBe(
    hats.contents
  );
});

```

 あなたのコードベースでこのようなテストを見た（書いた）ことがある人は手を挙げてください（🙌）。
 では、これらのテストがどのようにして壊れていくのか見てみましょう・・・。

## リファクタリング時の偽陰性

驚くほど多くの人がテストを不快に感じています。とくに UI テストに対して。これはなぜでしょうか？理由はいろいろありますが、私が何度も何度も耳にする大きな理由の 1 つは、人々がテストの子守に時間を費やしすぎているということです。**「コードを変更するたびにテストが壊れてしまう！」**
 これは生産性の足を引っ張ることになります。私たちのテストがどのようにしてこのイライラする問題の餌食になるか見てみましょう。

たとえば複数のアコーディオン項目を一度に開くことができる機能を準備しているとしましょう。
 この機能のためにまずはリファクタリングをします。リファクタリングは既存の動作を変更するのではなく、実装を変更するだけです。なので、動作を変えない方法で実装を変更してみましょう。

```plain text
class Accordion extends React.Component {
-  state = {openIndex: 0}
-  setOpenIndex = openIndex => this.setState({openIndex})
+  state = {openIndexes: [0]}
+  setOpenIndex = openIndex => this.setState({openIndexes: [openIndex]})
    render() {
-    const {openIndex} = this.state
+    const {openIndexes} = this.state
      return (
        <div>
          {this.props.items.map((item, index) => (
            <>
              <button onClick={() => this.setOpenIndex(index)}>
                {item.title}
              </button>
-            {index === openIndex ? (
+            {openIndexes.includes(index) ? (
                <AccordionContents>{item.contents}</AccordionContents>
              ) : null}
            </>
          ))}
        </div>
      )
    }
  }

```

いいですね！正常に動作しているかアプリで簡単にチェックして見ましょう。すべてがまだ正常に動作しています。それではテストを実行してみると・・・ 💥 ドカーン！💥
 テストが失敗しました。一体なにが原因なのでしょうか？
 setOpenIndex はオープンインデックスの状態を適切に設定しています。

エラーメッセージを見てみましょう。

```plain text
expect(received).toBe(expected)
Expected value to be (using ===):
  0
Received:
  undefined
```

テストの失敗は実際に壊れている部分を警告しているのでしょうか？いやいや！コンポーネントはまだ正常に動作しています。
 これは**偽陰性**と呼ばれるものです。これはテストに失敗したことを意味しますが、それはアプリケーションのコードが壊れているのではなくテストが壊れていることが原因でした。
 正直なところ、これ以上に迷惑なテスト失敗の状況は思いつきません。さて、気を取り直してテストを修正しましょう。

```plain text
test('setOpenIndex sets the open index state properly', () => {
    const wrapper = mount(<Accordion items={[]} />)
-   expect(wrapper.state('openIndex')).toEqual(0)
+   expect(wrapper.state('openIndexes')).toEqual([0])
    wrapper.instance().setOpenIndex(1)
-   expect(wrapper.state('openIndex')).toEqual(1)
+   expect(wrapper.state('openIndexes')).toEqual([1])
})

```

このように実装の詳細をテストしているとコードをリファクタリングしたときに偽陰性を与える可能性があります。これは何か変更を加えるたびに壊れるような脆くてイライラするテストにつながります。

## 偽陽性

さて、次にあなたの同僚がアコーディオンのコードを変更していて、このようなコードを見たとしましょう。

```plain text
<button onClick={() => this.setOpenIndex(index)}>{item.title}</button>

```

彼はこのコードを見るなりこう言いました。
 「render 内で[インラインアロー関数を使うとパフォーマンスが悪くなる](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578)から変更しよう！ちょっとした修正でうまくいくはず。すぐに試してテストを実行してみよう！」

```plain text
<button onClick={this.setOpenIndex}>{item.title}</button>

```

テストを実行してみると・・・ ✅✅ いいね! テストが通りました。彼らはテストが通ったことに安心し、ブラウザでの確認はせずにコードをコミットしました。そのコミットは数千行のコードを変更するまったく関係のない Pull Request に入り、当然のことながら見落とされます。
 本番環境ではアコーディオンが壊れ（`setOpenIndex` にインデックスが渡っていないため）、ナンシーは来年 2 月にソルトレイクで行われる Wicked を見るためのチケットを手に入れることができません。ナンシーは泣いていて、チームの皆は恐ろしく感じています。

では、何がいけなかったのでしょうか？setOpenIndex が呼ばれた時に状態が変化し、アコーディオンの内容が適切に表示されることを確認するテストはなかったのでしょうか！？いいえ、ありました！**問題はボタンが正しく setOpenIndex に配線されているかどうかを確認するテストがなかったこと**です。

これを**偽陽性**といいます。本当はテストに失敗してほしかったのに通ってしまった！ということです。では、このようなことが二度と起こらないようにするにはどうすればいいのでしょうか？ボタンをクリックすることで状態が正しく更新されることを確認するために、別のテストを追加しましょう。そしてこのようなミスを繰り返さないように、コードカバレッジのしきい値を 100%にしましょう。さらに実装の詳細をテストしやすくする API を使わないように、ESLint プラグインを何十個もインストールするべきですね。

... うわー、ほんとないわー... こういった偽陽性と偽陰性に疲れてしまって、テストを書くのをもうやめようかと思っています。いっそのことすべてのテストを削除してしまおう！
 もっと簡単に[成功への落とし穴](https://blog.codinghorror.com/falling-into-the-pit-of-success/)へ落ちていけるツールがあったらいいと思いませんか？思いますよね！そんなツールがあるんです！

## 実装の詳細がないテスト

すべての Enzyme のテストを実装の詳細がない API に限定して書き換えてもいいのですが、代わりに実装の詳細をテストに含めることが困難になる[React Testing Library](https://github.com/testing-library/react-testing-library)を使うことにします。それでは早速見ていきましょう。

```plain text
// __tests__/accordion.rtl.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Accordion from "../accordion";

test("can open accordion items to see the contents", () => {
  const hats = { title: "Favorite Hats", contents: "Fedoras are classy" };
  const footware = {
    title: "Favorite Footware",
    contents: "Flipflops are the best",
  };
  const { getByText, queryByText } = render(
    <Accordion items={[hats, footware]} />
  );

  expect(getByText(hats.contents)).toBeInTheDocument();
  expect(queryByText(footware.contents)).toBeNull();

  fireEvent.click(getByText(footware.title));

  expect(getByText(footware.contents)).toBeInTheDocument();
  expect(queryByText(hats.contents)).toBeNull();
});

```

Sweet! すべての動作を本当によく検証するユニットテストです。そしてこのテストは、コンポーネントの state が `openIndex` と呼ばれるか `openIndexes` と呼ばれるか `tacosAreTasty`🌮 と呼ばれるかにかかわらずパスしています。いいね！偽陰性がなくなりました。
 クリックハンドラーの配線が間違っていたらこのテストは失敗します。いいね！偽陽性も取り除けた！
 ルールのリストを暗記したり煩わしい ESLint プラグインをインストールする必要はありません。典型的な使い方でこのツールを使うだけで、アコーディオンがユーザーの望むように動作しているか確認するためのテストを書くことができます。

## つまり実装の詳細とは？

ここでは私が思いつく中でもっとも簡単な定義を紹介します。

**実装の詳細とは、あなたのコードのユーザーが通常使用したり、見たり、知ったりすることのないものです。**

そして次のことも考えなくてはいけません。**「このコードのユーザーは誰ですか？」**
 ブラウザ上でコンポーネントと対話するエンドユーザーは間違いなく 1 つのユーザーです。彼らは、レンダリングされたボタンやコンテンツを観察し、対話することになります。
 しかし、アコーディオンを Props（私たちの場合は与えられたアイテムのリスト）でレンダリングする開発者というユーザーもいます。
 つまり React コンポーネントには通常、エンドユーザーと開発者という 2 つのユーザーがいます。**エンドユーザーと開発者はアプリケーションコードが考慮しなければならない 2 つの「ユーザー」なのです。**

では、これらのユーザーはコードのどの部分を使用し、見て、知っているのでしょうか？エンドユーザーは render メソッドでレンダリングしたものを見たり、操作したりします。開発者はコンポーネントに渡す Props を見たり、操作したりします。ですから、私たちのテストは通常、渡された Props とレンダリングされた出力だけを見たり、操作したりするべきです。

これはまさに[React Testing Library](https://github.com/testing-library/react-testing-library)テストが行っていることです。アコーディオンに偽の Props を渡してから、ユーザーに表示されるコンテンツを確認し（または表示されないことを確認し）、ボタンをクリックすることでレンダリングされた結果とインタラクトします。

ここで Enzyme のテストを考えてみましょう。Enzyme では、 `openIndex` の state にアクセスします。これはユーザーが直接気にすることではありません。それが何と呼ばれているかも知らないし `openIndex` が単一のプリミティブ値として保存されているのか配列として保存されているのかも知りません。率直に言ってそんなことは気にもしません。また、 `setOpenIndex` メソッドについても知りませんし気にもしません。それなのに私たちのテストはこれらの実装の詳細を知っています。

これが Enzyme のテストが偽陰性になりやすい原因です。なぜなら、**エンドユーザーや開発者とは異なる方法でコンポーネントを使用することで、アプリケーションコードが考慮しなければならない第三のユーザー、つまりテストを作成しているからです。**そして率直に言ってテストは誰も気にしないユーザーです。私は自分のアプリケーションコードにテストのことを考慮して欲しくありません。完全に時間のムダです。私は自分のために書かれたテストなんて欲しくありません。自動化されたテストは、アプリケーションコードが本番ユーザーのために動作するかを検証するべきです。

> The more your tests resemble the way your software is used, the more confidence they can give you.— Kent C. Dodds 🧑‍🚀 (@kentcdodds) March 23, 2018

これについては [Avoid the Test User](https://kentcdodds.com/blog/avoid-the-test-user) を読んでみてください。

あ、それと React Hooks が盛り上がってきましたね。Accordion コンポーネントを React Hooks を使うように書き換えると Enzyme のテストはひどく失敗しますが React Testing Library のテストは機能し続けます。

## 結論

では、実装の詳細をテストしないようにするにはどうすればいいのでしょうか？まずは正しいツールを使うことが良いスタートです。
 数週間前に、私は良いテストを書くための方法をまとめました。次の方法に従うことでテストをするときに正しい考え方を持つことができ、自然と実装の詳細を避けることができます。

3. あなたの試していないコードベースで、どの部分が壊れたら本当にヤバいのかを見つける （たとえば決済処理など）
4. 影響するコードを 1 つ以上のユニットに絞り込んでみる （「チェックアウト」ボタンをクリックすると、Checkout API にカートの商品と一緒にリクエストが送られてくる）
5. このコードを見て「ユーザー」が誰なのかを考える （チェックアウトフォームをレンダリングする開発者、ボタンをクリックするエンドユーザー）
6. コードが壊れていないことを確認するために、そのユーザーが手動でそのコードをテストするための指示リストを書き留める （カート内のいくつかの偽のデータでフォームをレンダリングし、チェックアウトボタンをクリックし、モックされた Checkout API が正しいデータで呼び出されたことを確認し、偽の成功したレスポンスで応答し、成功メッセージが表示されていることを確認する）
7. その指示のリストを自動テストにする

あなたのお役に立てれば幸いです。もし本当にテストを次のレベルに引き上げたいのであれば、[TestingJavaScript.com](https://testingjavascript.com/)🏆 の Pro ライセンスを取得することをオススメします。

頑張ってください！

P.S. 記事内の例を試してみたい方はこちらの[codesandbox](https://codesandbox.io/s/rlnw1r5nxo)をどうぞ。

P.S.P.S. あなたのための練習として・・・。AccordionContents コンポーネントの名前を変更すると、2 個目の Enzyme テスト（Accordion renders AccordionContents with the item contents）はどうなりますか？