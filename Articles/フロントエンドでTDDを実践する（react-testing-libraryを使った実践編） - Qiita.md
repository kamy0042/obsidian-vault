---
URL: https://qiita.com/taneba/items/b21f5fee17eb593b30c8
Created: 2021-01-28T00:15:00
Tags: [topic/技術/テスト]
---
この記事は、[フロントエンドでTDDを実践する（理論編）](https://qiita.com/taneba/items/48db2ad9cf10ad644908)の続編として書きました。

本記事では、react-testing-libraryでReactでTDDする方法をサンプルを使って解説します。

## react-testing-library

react-testing-libraryは、PayPalのエンジニアでありフロントエンドのTDDの第一人者であるKent C Doddsが、enzymeのリプレイスを意図して作ったReactのための新しいテストユーティリティです。
 設計思想は、**The more your tests resemble the way your software is used, the more confidence they can give you.** enzymeのように実装そのもののテストをするよりも、ユーザーが使うようにテストされるべきというフィロソフィーがAPIに強く反映されています。

実際には、いくつかのライブラリを併用して使います。

- [jest](https://jestjs.io/en/): テストフレームワーク
- [jest-dom](https://github.com/gnapse/jest-dom): カスタムマッチャを提供してくれる
- [react-testing-library](https://github.com/kentcdodds/react-testing-library): render関数及び、DOMセレクタ等を提供してくれる。[dom-testing-library](https://github.com/kentcdodds/dom-testing-library)をラップしている

react-testing-libraryでのTDDでは、 **どのセレクタ/APIを使ってComponentを操作し、どのカスタムマッチャを使ってアサーションするか**がキモになってきます。最初はどれを使えばいいのか分かりづらいかもしれませんが、慣れてくるとサクサクテストコードが書けるようになります。

それでは、早速チュートリアルを始めてみましょう。

## ライブラリのinstall

reactとかreact-dom等のアプリケーションコードは割愛します

## CounterアプリでのTDD

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F1452792F7f735530-6b98-d107-7692-159877484a88.png]]

いわゆるカウンターアプリです。＋を押したらカウントアップ、ーを押したらカウントダウンします。

### 1.要件からテストケースを書き出す

まず、どんな機能面での仕様があるかをリストアップします。ざっくり下記のようになります。開発スタイルによっては、要件ドキュメントとして定義されていることもあると思います。

1. 初期状態は0である
2. 「+」ボタンを押すと１つカウントアップする
3. 「-」ボタンを押すと１つカウントダウンする

これをまずテストコードのit()に落とします
 ※jest v24からit.todo()が使えるようになり、passedとtodoを認識仕分けてくれるようになりました（test reportの中で、実装済みでテストが通っているのか実装していないのかが明確にわかるようになるのでおすすめです）

```plain text
// counter.test.js
describe('Counter', () => {
  it.todo('初期状態は0である')
  it.todo('「+」ボタンを押すと１つカウントアップする')
  it.todo('「-」ボタンを押すと１つカウントダウンする')
})

```

### 2. 最初のテストコードを書く

まず、空のdivを返すCounterを作っておきます

```plain text
// counter.js
import React from 'react'
export default () => <div />

```

次にテストコードです。まず、１つ目の仕様である「初期状態は0である」についてテストを書いていきます。

```plain text
// counter.test.js
import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import Counter from "./counter";

// テスト実行後にDOMをunmount, cleanupします
afterEach(cleanup);

describe("Counter", () => {
  it("初期値は0である", () => {
    const { getByTestId } = render(<Counter />);
    expect(getByTestId("result")).toHaveTextContent("0");
  });
  it.todo('「+」ボタンを押すと１つカウントアップする')
  it,todo('「-」ボタンを押すと１つカウントダウンする')
});

```

解説していきます。
 まず、`afterEach(cleanup)`と記述しています。これは各テストの実行後に必ず呼ばれる必要があります。

次に、「初期値は０である」のテストコードです。`render`はreact-testing-libraryの提供する関数です。返り値はobjectになっており、様々なコンポーネントセレクタを含んでいます。

「どのセレクタ/APIを使ってComponentを操作し、どのカスタムマッチャを使ってアサーションするかがキモ」だと触れましたが、今回はセレクタにgetByTestIdを使います。 `getByTestId('result')`は、`<div data-testid='result'>`のような指定したdata-testidアトリビュートを持つ最初のDOMにマッチします。
 また、カスタムマッチャにはtoHaveTextContentを使います。toHaveTextContentは文字通りdomが持つ内容をassertionできます。

このテストコードは当然落ちます。次にこのテストを満たすアプリケーションコードを書きます

### 3.最初のテストを通すアプリケーションコードを書く

```plain text
import React from "react";

export default () => <div data-testid="result">0</div>;

```

これだけです。data-testidが'result'のコンポーネントを見つけて、contentが0であることをみたしています。

これでテストは通り、greenになります。

### 4. カウントアップのテストコードを書く

```plain text
// counter.test.js
import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";

import Counter from "./counter";

afterEach(cleanup);

describe("Counter", () => {
  it("初期値は0である", () => {
    const { getByTestId } = render(<Counter />);
    expect(getByTestId("result")).toHaveTextContent("0");
  });
  it("「+」ボタンを押すと１つカウントアップする", () => {
    const { getByTestId, getByText } = render(<Counter />);
    fireEvent.click(getByText("+"))
    expect(getByTestId("result")).toHaveTextContent("1");
  });
  it.todo("「-」ボタンを押すと１つカウントダウンする");
});

```

カウントアップのテストは、 `「+」ボタンを押したらresultが1になる`という内容です。今回は「+」ボタンをgetByTextというセレクタで取ってきた上で、clickイベントを発火するのにreact-testing-libraryのfireEvent()を使っています。

getByTextは文字通り指定した文字列にマッチする最初のDOMを取ってきます。
 また、fireEventは様々なDOMのEventをシミュレートするものです。

このテストコード追加で、テストは落ちます。まだ「+」ボタンがないので `Unable to find an element with the text: +.`と言われるはずです。

### 5. カウントアップのテストを満たすアプリケーションコードを書く

```plain text
import React from "react";

export default class Counter extends React.Component {
  state = { count: 0 };
  render() {
    return (
      <div>
        <div data-testid="result">{this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
      </div>
    );
  }
}

```

まず、状態が必要なのでclassコンポーネントにしています。このとき、初期状態が0であることをテストするコードは内部実装を変えても通るのが嬉しいですね

そして、onClickでcountの状態を+1する「+」ボタンを追加しています。

これでテストは通りました。

### 6. カウントダウンのテストコード＆アプリケーションコードを書く

書き方はカウントアップと同じですね。

```plain text
// counter.test.js
  it("「-」ボタンを押すと１つカウントダウンする", () => {
    const { getByTestId, getByText } = render(<Counter />);
    fireEvent.click(getByText("-"));
    expect(getByTestId("result")).toHaveTextContent("-1");
  });

```

```plain text
// counter.js
import React from "react";

export default class Counter extends React.Component {
  state = { count: 0 };
  render() {
    return (
      <div>
        <div data-testid="result">{this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
        <button onClick={() => this.setState({ count: this.state.count - 1 })}>
          -
        </button>
      </div>
    );
  }
}

```

注意: codesandbox上では、codesandboxの問題で`afterEach(cleanup)`が動かずカウントダウンのテストが落ちてしまいますが、普通の環境では上記コードで動きます。これは[codesandbox上ではjsdom上ではなくブラウザー環境で動く仕組み](https://spectrum.chat/react-testing-library/general/cleanup-doesnt-work-on-codesandbox-io%7E582add2e-2b08-4c5e-ac88-a9e0dae17955?m=MTU0NDM4MTk0NDU3NA%3D%3D)だからということです。

### fin. デザインをあてる

TDDでは機能を先に実装し、デザインはあとで実装します。ただしケースバイケースでstyleがロジックに深く関わってくる場合は先にある程度デザインがないといけないこともあるでしょう。

今回はデザインはテーマではないので割愛しますが、完成コードは [codesandbox](https://codesandbox.io/s/o9vnx1xnwz) に載せておきます。

## TodoアプリでのTDD（いいねが50超えたら書く）

週末の時間がなくなってきたので、いいねが多くなったら書きます（汗）

authorのkentcdoddsは、getByTestIdよりも、getByText, getByLabelText, getByPlaceholderTextなどのセマンティックなセレクタを使うべきと述べています。そのほうがユーザーが使うのと同じようにテストを書くべきというprincipalに合っているということのようです。 see: (readme/getByTestId)[[https://github.com/kentcdodds/react-testing-library#getbytestidtext-textmatch-options-htmlelement](https://github.com/kentcdodds/react-testing-library#getbytestidtext-textmatch-options-htmlelement)]

### テストの実行コストを減らす

より複雑なアプリケーションのテストを書いていると、APIからフェッチしたデータをパターン別に出し分けるようなケースが出てきます。テストケースをあまりに細かくしてしまうと、ループが大量に回ってしまいテストの実行に時間がかかってしまうので、そうなったときはいくつかまとめて１つのテストケースでassertionすることも考えて良いでしょう。

### 前提となるテストを共通化する

複雑なアプリケーションの場合、データフェッチを前提として様々なテストケースを書く場合が多いので、DRYでなくなってしまうことがあります。その場合は、下記のようにsetup関数として切り出してあげると良いです。

```plain text
  const setup = async () => {
  const utils = renderWithRedux(<UserList />)
    const users = await waitForElement(() => utils.getAllByTestId('userList'))
    expect(users.length).toBe(userMockData.length + 1)

    return { ...utils }
  }

// 各テストケース
  it('foo', async () => {
    const { getByText } = await setup()
    // 固有のテストコード
  }

```

この方法でTDDを実践していくと、テストケースがそのままアプリケーションのドキュメントになります。

実際、自分のチームでは `jest --json`でテスト結果をjsonで吐き出し、それを元に静的サイトを生成してホスティングし、プロジェクト内に共有しています。

## おまけ：codesandbox上でjestが動く！

codesandboxではなんとjestのテストが動きます。本記事で紹介してるサンプルを動かしてみてください（但し、afterEachが動かない等、まだ不安定なようです）

20180604: jest v24でTDDを実践する上で有用なit.todoが加わったので反映させました。
 see: [https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly#testtodo](https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly#testtodo)