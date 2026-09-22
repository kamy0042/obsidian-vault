---
URL: https://qiita.com/chimame/items/e97883fd46b67529d59f
Created: 2021-01-28T19:58:00
Tags: [topic/技術/テスト]
---
![[Attachments/無題のフォルダ/https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94 1.png]]

みなさん、日頃JavaScriptのテストはどのように行っていますか？
 昨今ではAngularJSやReactJSを始め、JavaScriptのフレームワークやライブラリを使用してのフロントエンドの開発が当たり前のようになってきております。
 ではそのフロントエンド、JavaScriptのテストはどんなツールを使っていますか？
 mochaやpower-assert、chai、Karma、Jasmine等を組み合わせて使用してテストしているでしょうか。
 前置きが少し長くなりましたが、Facebookが開発したオールインワンな「[Jest](https://facebook.github.io/jest/)」というツールのReactでのHowto的な使い方から実際のテストでの使用例を交えて紹介したいと思います。
 ちなみにこのJest、最近リリースされて話題になったパッケージ管理のYarnでも使われています。

# 対象バージョン

Jest:22.0.4
 React:16.2.0

# 本記事で使用したサンプルソース

対象PCにNodejsがインストールされていること
 package.jsonが作成されていること

# セットアップ編

まずはインストールしないと始まらないので、インストール方法です。
 インストールはすごく簡単です。

次にpackage.jsonに以下を記述しておきます。

```plain text
{
  ･･･
  "scripts": {
    "test": "jest"
  },
  ･･･}
```

これで`npm run test`とコマンドを打てばテストが実行されます。
 ただ、Babelが必要なJavaScriptならばついでに以下も入れておくといいです。

更に、ルートディレクトリに`.babelrc`ファイルを作成し、以下を記述しておきます。

これでインストールが完了です。

# テストファイル配置編

テストファイルのフォルダ名やファイル名に一定の決まりがありますので、それを守ればルート以下のどこにおいても大丈夫です。

## 方法その1：テストフォルダ名で実行ファイルを分ける

**__tests__**という名前のフォルダ直下に拡張子付きファイルを配置すると直下のファイルが実行されます。
 例：(root)/__tests__/Counter.js

## 方法その2：テストファイル名で実行ファイルを分ける

ファイル名が`.spec.js`もしくは`.test.js`で終了するファイルをテストファイルとして実行します。
 例：(root)/test/Counter.test.js

**テストをある程度書いたことのある経験者はここは飛ばして次のテストマッチャー編にお進みください。**
 テストを書くにはある程度決まった構文があります。これはJestに限らずテストツール全般に言えることです。Jestも決まった記述がありますので、それを紹介していきます。自身はRSpecを使っていたので違和感なく書けたのでそんな人はスラスラ書けると思います。

## describe(name, fn)

テスト箇所の宣言と考えればいいです。
 例えばこんなコードをテストする場合に

Counter.js

```plain text
export default class Counter {
  constructor(count) {
    this.count = count
  }

  increment() {
    this.count += 1
  }

  decrement() {
    this.count -= 1
  }
}

```

テストコードの書き出しは

今から「Counterのテストを実施します」と宣言すると考えれば大丈夫です。
 さらに上記のCounter.jsの実装ではメソッドがありますので

```plain text
describe('Counter', () => {
  describe('increment()', () => {
  })
})

```

という風に"Counter"の"incurement()"をテストする宣言って感じで書きます。

## it(name, fn) or test(name, fn)

次にテストする内容を記載する記述方法です。RSpecに慣れ親しんでいる方はこれも違和感なく書けると思います。ただ、Jest独特の記述に`test`というものもあります。これは`it`の別名です。
 実際に書いて見ると

```plain text
describe('Counter', () => {
  describe('increment()', () => {
    it('should be increment', () => {
      expect(hoge).toBe(1)
    })
  })
})

```

という感じになります。`expect(hoge).toBe(1)`は後に解説します。`test`も同様で

```plain text
describe('Counter', () => {
  describe('increment()', () => {
    test('increment', () => {
      expect(hoge).toBe(1)
    })
  })
})

```

と書けばいいでしょうか。要は文章を書くようにテストが書けるよってことです。

## expect(value)

ではさっそく出てきた`expect`から解説です。これはテスト対象を指定します。指定方法は引数に入れるだけです。例えば

```plain text
describe('Counter', () => {
  describe('increment()', () => {
    test('increment', () => {
      const counter = new Counter(1)
      counter.increment()
      expect(counter.count).toBe(2)
    })
  })
})

```

のように書くと「`counter`の`count`をテスト対象とする」と書けます。最後の`toBe`は詳しくは後で書きますが、「結果が2になる」はずと書いています。
 これを実行すると、テストが実行できるはずです。

## beforeEach(fn)

`it`もしくは`test`毎に必ず実施したい前処理がある場合にこの`beforeEach`を使用します。例えば上の例では`increment()`しかテストしませんでしたが、`decrement()`もテストする場合

```plain text
describe('Counter', () => {
  describe('increment()', () => {
    test('increment', () => {
      const counter = new Counter(1)
      counter.increment()
      expect(counter.count).toBe(2)
    })
  })
  describe('decrement()', () => {
    test('decrement', () => {
      const counter = new Counter(1) // increment上記と同じ
      counter.decrement()
      expect(counter.count).toBe(0)
    })
  })
})

```

と書くとDRYではないので、

```plain text
describe('Counter', () => {
  let counter
  beforeEach(() => {
    counter = new Counter(1)
  })
  describe('increment()', () => {
    test('increment', () => {
      counter.increment()
      expect(counter.count).toBe(2)
    })
  })
  describe('decrement()', () => {
    test('decrement', () => {
      counter.decrement()
      expect(counter.count).toBe(0)
    })
  })
})

```

と書くと共通の前処理をやってくれるってことになります。

## beforeAll(fn)

`beforeEach`では`test`毎に実施しましたが、ブロック間で１度だけでいいといった場合には`beforeAll`を使用します。

```plain text
describe('Counter', () => {
  let counter
  beforeAll(() => {
    counter = new Counter(0)
  })
  beforeEach(() => {
    counter.count = 1
  })
  describe('increment()', () => {
    test('increment', () => {
      counter.increment()
      expect(counter.count).toBe(2)
    })
  })
  describe('decrement()', () => {
    test('decrement', () => {
      counter.decrement()
      expect(counter.count).toBe(0)
    })
  })
})

```

上記の例では`counter`は最初に1回作るだけにして`test`毎にcountを初期化しています。ちなみに`beforeAll`はブロック内で初回だけですが、**必ずブロック内の最初、つまり**`**beforeEach**`**より先に実行されます**。

## afterEach(fn)

`beforeEach`がテストの前ならばもちろんその後のバージョンもあり、それが`afterEach`です。

## afterAll(fn)

さらに`beforeAll`の後バージョンの`afterAll`もあります。`afterAll`は**ブロック内で必ず最後に実行されます**。

```plain text
describe('Counter', () => {
  let counter
  beforeAll(() => {
    console.log('beforeAll')
    counter = new Counter(0)
  })
  beforeEach(() => {
    console.log('beforeEach')
    counter.count = 1
  })
  afterAll(() => {
    console.log('afterAll')
  })
  afterEach(() => {
    console.log('afterEach')
  })
  describe('increment', () => {
    test('increment()', () => {
      counter.increment()
      expect(counter.count).toBe(2)
    })
  })
  describe('decrement', () => {
    test('decrement()', () => {
      counter.decrement()
      expect(counter.count).toBe(0)
    })
  })
})

```

だと、出力されるログは

となります。

## .only .skip

これはJest独特かもれません。`.only`と書けばそれだけを実施してくれます。

```plain text
describe('Counter', () => {
  let counter
  beforeEach(() => {
    counter = new Counter(1)
  })
  describe.only('increment()', () => {
    test('increment', () => {
      counter.increment()
      expect(counter.count).toBe(2)
    })
  })
  describe('decrement()', () => {
    test('decrement', () => {
      counter.decrement()
      expect(counter.count).toBe(0)
    })
  })
})

```

と書くと`describe.only('increment()', () => {`のテストしか実行されません。ただし、スキップしたテストもあるというのは結果に表示されます。例では`describe`につけましたが、`it`や`test`にもつけることが可能です。

逆に`.skip`というのもあります。これは`.only`はそれだけを実行しますが、`.skip`は対象のテストのみをスキップします。

長かったですが、とりあえずこれがJestの基本的構文です。
 他にもあるのですが、これだけあればほぼ事足ります。

基本的な構文を理解しましたので、ここからが本記事の本題となるテストの使用例です。（前置きが異常に長いですね）

## 同値となることを検証する `.toBe(value)`

これは先程の前置きにも出てきましたが、**単純な値の比較に使うマッチャーです**。

```plain text
describe('toBe example', () => {
  test('equal 1', () => {
    expect(1).toBe(1)
  })
})

```

## 検証を否定する `.not`

`toBe`は同値をテストしましたが逆に同値じゃないテストをしたい場合に使うのがこの`.not`です。

```plain text
describe('toBe example', () => {
  test('not equal 0', () => {
    expect(1).not.toBe(0)
  })
})

```

この`.not`は以降に登場する例外系(`toThrow`、`toThrowError`、`toThrowErrorMatchingSnapshot`)のマッチャー以外に使え、それの否定を意味することになります。

## 判定での`false`を意味する検証をする `.toBeFalsy()`

JavaScriptでは`false`だけがif文でfalseを意味するのではなく、`undefined`もfalseを意味します。それ以外には`0`や`null`等もfalseを意味します。そのfalseを意味する検証を行うのがこの`toBeFalsy()`です。

```plain text
describe('toBeFalsy example', () => {
  test('equal false', () => {
    expect(false).toBeFalsy()
  })

  test('equal false', () => {
    expect(undefined).toBeFalsy()
  })

  test('equal false', () => {
    expect(0).toBeFalsy()
  })
})

```

## 判定での`true`を意味する検証をする `.toBeTruthy()`

今度は逆にtrueを意味するものの検証を行うのが`toBeTruthy()`です。

```plain text
describe('toBeTruthy example', () => {
  test('equal true', () => {
    expect(true).toBeTruthy()
  })

  test('equal false', () => {
    expect(1).toBeTruthy()
  })

  test('equal false', () => {
    expect('aaa').toBeTruthy()
  })
})

```

## `null`を検証する `.toBeNull()`

これは`.toBe(null)`とほぼ同義です。ただ、公式によると「エラーメッセージがましだからnullのチェックの時はこっち使って」(超意訳)とのことです。

```plain text
describe('toBeNull example', () => {
  test('equal null', () => {
    expect(false).not.toBeNull()
  })

  test('equal null', () => {
    expect(null).toBeNull()
  })
})

```

## `undefined`を検証する `.toBeUndefined()`

これも`toBeNull()`と同じく`toBe(undefined)`と同じだけどこっち使おうねってやつです。(`toBe(undefined)`と書く人がいれば注意しましょう)

```plain text
describe('toBeUndefined example', () => {
  test('not equal undefined', () => {
    expect(false).not.toBeUndefined()
  })

  test('equal undefined', () => {
    expect(undefined).toBeUndefined()
  })
})

```

## `defined`を検証する `.toBeDefined()`

先程の`toBeUndefined()`の逆です。これも`toBe(undefined)`と`.not`を使って書かないでねってやつです。

```plain text
describe('toBeDefined example', () => {
  test('not equal defined', () => {
    expect(undefined).not.toBeDefined()
  })

  test('equal defined', () => {
    expect('aa').toBeDefined()
  })
})

```

## `NaN`を検証する `.toBeNaN()`

これは公式の[API Refarence](https://facebook.github.io/jest/docs/expect.html#content)にないですが、マッチャーとして実装されています。これも`toBe(NaN)`使うなってことですかね。

```plain text
describe('toBeNaN example', () => {
  test('not equal NaN', () => {
    expect(false).not.toBeNaN()
  })

  test('equal NaN', () => {
    expect(NaN).toBeNaN()
  })
})

```

## 結果が特定の数値より大きいことを検証する `.toBeGreaterThan(number)`

"より大きい"ので同値は含みません。要するに`11 > 10`を判断するということです。

```plain text
describe('toBeGreaterThan example', () => {
  test('more than 10', () => {
    expect(11).toBeGreaterThan(10)
  })

  test('not more than 10', () => {
    expect(10).not.toBeGreaterThan(10)
  })
})

```

## 結果が特定の数値以上であることを検証する `.toBeGreaterThanOrEqual(number)`

先程とは違うのは"以上"を検証します。要するに`10 >= 10`を判断するということです。

```plain text
describe('toBeGreaterThanEqual example', () => {
  test('more than 10 or equal', () => {
    expect(11).toBeGreaterThanOrEqual(10)
  })

  test('more than 10 or equal', () => {
    expect(10).toBeGreaterThanOrEqual(10)
  })
})

```

## 結果が特定の数値より小さいことを検証する `.toBeLessThan(number)`

"より小さい"ので同値は含みません。要するに`9 < 10`を判断するということです。

```plain text
describe('toBeLessThan example', () => {
  test('less than 10', () => {
    expect(9).toBeLessThan(10)
  })

  test('not less than 10', () => {
    expect(10).not.toBeLessThan(10)
  })
})

```

## 結果が特定の数値以下であることを検証する `.toBeLessThanOrEqual(number)`

先程とは違うのは"以下"を検証します。要するに`10 <= 10`を判断するということです。

```plain text
describe('toBeLessThanOrEqual example', () => {
  test('less than 10 or equal', () => {
    expect(9).toBeLessThanOrEqual(10)
  })

  test('less than 10 or equal', () => {
    expect(10).toBeLessThanOrEqual(10)
  })
})

```

## 特定の小数桁まである数値と一致するか検証する `.toBeCloseTo(number, numDigits)`

JavaScriptがIEEE 754という規格に従って実装されているため、小数計算に誤差がでます。例えば

となります。その小数誤差のためにある特定の小数桁までで検証するのが、`toBeCloseTo`です。第一引数に結果となる小数を指定し、第二引数の小数桁を指定します。

```plain text
describe('toBeCloseTo example', () => {
  test('equal', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.35, 0)
    expect(0.1 + 0.2).toBeCloseTo(0.35, 1)
  })

  test('not equal', () => {
    expect(0.1 + 0.2).not.toBeCloseTo(0.35, 2)
    expect(0.1 + 0.2).not.toBe(0.3)
  })
})

```

例を見て分かる通り、これは検証する値と結果の値の両方に対して小数桁以上は切り捨てられていることがわかります。

## 結果が特定の長さ(length)であることを検証する `.toHaveLength(number)`

検証するオブジェクトに対して`.length`を呼んだ値を検証するマッチャーです。`.length`を書くのが手間な人向け？

```plain text
describe('toHaveLength example', () => {
  test('equal 3', () => {
    expect([1, "2", 3]).toHaveLength(3)
  })

  test('equal 4', () => {
    expect('abcd').toHaveLength(4)
  })

  test('equal 0', () => {
    expect('').toHaveLength(0)
  })
})

```

## 結果が特定の型（インスタンス）かを検証する `.toBeInstanceOf(Class)`

JavaScriptにある`instanceof`がマッチャーで提供されています。

```plain text
describe('toBeInstanceOf example', () => {
  class A {}

  test('instance of A', () => {
    expect(new A()).toBeInstanceOf(A)
  })

  test('instance of Function', () => {
    expect(() => {}).toBeInstanceOf(Function)
  })

  test('not instance of Function', () => {
    expect(new A()).not.toBeInstanceOf(Function)
  })
})

```

例ではAというクラスのインスタンスかというような検証を行っています。

## 結果がある正規表現に一致するかを検証する `.toMatch(regexp)`

皆さん正規表現得意ですか？かくゆう私はそんなに得意ではありませんｗ
 正規表現で文字列内に含まれる検証等を使う場合にこのマッチャーが便利です。

```plain text
describe('toMatch example', () => {
  test('match', () => {
    expect("aabcdeb").toMatch(/(abc|def)/)
  })

  test('not match', () => {
    expect("aabcdeb").not.toMatch(/(def)/)
  })
})

```

## 連想配列の中身が一致するかを検証する `.toEqual(value)`

JavaScriptでは連想配列（呼び方あってる？いわゆるハッシュ）が別に定義されると中身が一緒でも`===`で比べるとfalseとなります。なのでその中身が一致するかの検証がこのマッチャーです。

```plain text
describe('toEqual example', () => {
  const test1 = {a: 1, b:"aaa"}
  const test2 = {a: 1, b:"aaa"}
  test('equal', () => {
    expect(test1).toEqual(test2)
  })

  test('not equal Object', () => {
    expect(test1).not.toBe(test2)
    expect(test1 === test2).toBeFalsy()
  })
})

```

こんな感じというコードを書いたので、これでわかりやすいでしょうか。（公式のものを少しいじっただけともいう）

## 連想配列の特定キーの値が一致するかを検証する .toHaveProperty(keyPath, value)

先程は連想配列がすべて一致することのマッチャーでしたが、今度は連想配列の特定キーに対しての値だけを検証したい時に使うマッチャーです。

```plain text
describe('toHaveProperty example', () => {
  const testHash = {a: 1, b:"aaa", c: {aa: 12, bb:"abab"}, d: false}
  test('equal', () => {
    expect(testHash).toHaveProperty('d')
    expect(testHash).not.toHaveProperty('e')

    expect(testHash).toHaveProperty('c.bb', 'abab')
  })
})

```

JSON等で中身すべてを検証するのではなく、特定キーの内容が一致するかを検証するのにいいかもしれません。

## 連想配列の一部が一致するかを検証する `toMatchObject(object)`

連想配列の場合に複数の特定キーの値を検証したい場合があるかもしれません。そんな場合に使うマッチャーです。

```plain text
describe('toMatchObject example', () => {
  const testHash = {a: 1, b:"aaa", c: {aa: 12, bb:"abab"}, d: false}
  test('equal', () => {
    expect(testHash).toMatchObject({a: 1, c: {aa: 12}})
  })
})

```

## 結果の配列に特定の値が含まれているか検証する `.toContain(item)`

そのままなんですが、配列内に特定の値があるかの検証します。`indexof`の結果が`-1`以外を検証するマッチャーとでもいえばいいでしょうか。

```plain text
describe('toContain example', () => {
  test('include 1', () => {
    expect([1,"2",3]).toContain(1)
  })

  test('not include 2', () => {
    expect([1,"2",3]).not.toContain(2)
  })
})

```

## 文字列に特定の文字が含まれているか検証する `.toContain(item)`

`toContain`は先程説明した通り配列内の値が含まれているか検証することができますが、文字列も同様に含まれているかを検証することが可能です。

```plain text
describe('toContain example', () => {
  test('include aabb', () => {
    expect("testaabbcc").toContain('aabb')
  })
})

```

## 結果の配列に特定の連想配列が含まれているか検証する `.toContainEqual(item)`

`toContain`と`toEqual`のあわせ技のマッチャーです。

```plain text
describe('toContainEqual example', () => {
  const array = [{a: "1", b: 2}, {c: 3, d: "4"}]
  test('include {a: "1", b: 2}', () => {
    expect(array).toContainEqual({a: "1", b: 2})
  })

  test('not include {c: 3, d: 4}', () => {
    expect(array).not.toContainEqual({c: 3, d: 4})
  })
})

```

配列内がさらに連想配列になっている場合に、その配列内に特定の連想配列を持っているかを検証します。

## 特定のFunctionが呼び出されたかを検証する `.toBeCalled()` or `.toHaveBeenCalled()`

`toBeCalled`は`toHaveBeenCalled`の別名です。
 ある関数があり、その関数内で別関数が呼ばれたかどうかを検証します。
 ちょっと書いてることがわかりにくので、ここはReactのComponetsで例を書いてみます。

```plain text
import React, { Component }   from 'react'
import { shallow } from 'enzyme'

class Sample extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {onWillMountHandle} = this.props
    onWillMountHandle()
  }

  render() {
    const {onClickHandle} = this.props
    return (
      <div>
        <span onClick={onClickHandle}>aaaa</span>
      </div>
    )
  }
}

describe('toHaveBeenCalled example', () => {
  let testMock1
  let testMock2
  let subject

  beforeEach(() => {
    testMock1 = jest.fn()
    testMock2 = jest.fn()
    subject = shallow(<Sample onWillMountHandle={testMock1} onClickHandle={testMock2} />)
  })

  test('handle onWillMountHandle', () => {
    expect(testMock1).toHaveBeenCalled()
  })

  test('handle onClickHandle', () => {
    subject.find('span').simulate('click')
    expect(testMock2).toBeCalled()
  })
})

```

今までと比べReactを使っているのでぐっと難易度があがったかもしれませんが、特に難しいことはしてません。
 まず`Sample`というコンポーネントではdiv要素内にspanを持ったものを返します。ただし、`componentWillMount`があるのでコンポーネント描画前にpropsの`onWillMountHandle`を実行します。さらにspanをクリックする`onClickHandle`が実行されます。
 なのでテストは、「renderしただけで`onWillMountHandle`が実行されているか」と「spanをクリックした時に`onClickHandle`が実行されているか」を検証しています。(`enzyme`とか出てきてうわってなったかもしれません)
 またここで初めて出てきた`jest.fn()`ですが、これはFunctionのモックを作成しています。Jestにはモックを作る機能も提供されています。ここでモックを使ったのは、実際にコンポーネントを作成する上でこういうFunctionを渡すことは多々ありますが、それが実際のFunctionである必要はなく、ただ実行されているかを検証しております。モックについては今回は詳しく触れないので、またどこかで詳しく書きます。

ちなみにこのテストを実施するには以下のコマンドでパッケージをインストールしました。

さらに`.babelrc`を

のように変更します。

## 特定のFunctionが何回呼び出されたかを検証する `.toHaveBeenCalledTimes(number)`

`toHaveBeenCalled`ではFunctionが1回でも呼び出されたらテストをパスしました。`toHaveBeenCalledTimes`は呼び出された回数も一致しないとテストとしてパスしません。

```plain text
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import React, { Component }   from 'react'
import { shallow } from 'enzyme'

class Sample extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {onWillMountHandle} = this.props
    onWillMountHandle()
  }

  render() {
    const {onClickHandle} = this.props
    return (
      <div>
        <span onClick={onClickHandle}>aaaa</span>
      </div>
    )
  }
}

describe('toHaveBeenCalledTimes example', () => {
  let testMock1
  let subject

  beforeEach(() => {
    testMock1 = jest.fn()
    subject = shallow(<Sample onWillMountHandle={testMock1} onClickHandle={testMock1} />)
  })

  test('handle onWillMountHandle', () => {
    expect(testMock1).toHaveBeenCalledTimes(1)
  })

  test('handle onClickHandle', () => {
    subject.find('span').simulate('click')
    expect(testMock1).toHaveBeenCalledTimes(2)
  })
})

```

`Sample`のコンポーネントは変わりませんが、今回は`onWillMountHandle`と`onClickHandle`に同じFunctionを渡しています。renderだけでは1回しか呼び出せれませんが、クリックも合わせると2回呼び出されるというテストをしています。

## 特定のFunctionが特定の引数で呼び出されたかを検証する `.toHaveBeenCalledWith(arg1, arg2, ...)` or `.toBeCalledWith(arg1, arg2, ...)`

次に引数付きのFunctionがあり、そのFunctionが適切な引数で実行されたかを検証するのが`toHaveBeenCalledWith`です。`toBeCalledWith`は`toHaveBeenCalledWith`の別名です。

```plain text
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import React, { Component }   from 'react'
import { shallow } from 'enzyme'

class Sample extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {onWillMountHandle} = this.props
    onWillMountHandle('a')
  }

  render() {
    const {onClickHandle} = this.props
    const clickHandle = () => {onClickHandle(2,3)}
    return (
      <div>
        <span onClick={clickHandle}>aaaa</span>
      </div>
    )
  }
}

describe('toHaveBeenCalledWith example', () => {
  let testMock1
  let subject

  beforeEach(() => {
    testMock1 = jest.fn()
    subject = shallow(<Sample onWillMountHandle={testMock1} onClickHandle={testMock1} />)
  })

  test('handle onWillMountHandle', () => {
    expect(testMock1).toHaveBeenCalledWith('a')
  })

  test('handle onClickHandle', () => {
    subject.find('span').simulate('click')
    expect(testMock1).toHaveBeenCalledWith('a')
    expect(testMock1).toHaveBeenCalledWith(2, 3)
  })
})

```

例ではrenderの時は引数が`'a'`で呼ばれるのに対してクリック時は`2`と`3`を引数に実行されるというのをテストしています。（若干無理くりですが）

## 特定のFunctionが特定の引数で最後に呼ばれたことを検証する `.toHaveBeenLastCalledWith(arg1, arg2, ...)`

あるFunctionが引数付きで何回か呼ばれる場合に、最後に呼ばれた引数での実行を検証するマッチャーです。`toHaveBeenCalledWith`は呼ばれただけ検証しますが、`toHaveBeenLastCalledWith`は最後のみです。

```plain text
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import React, { Component }   from 'react'
import { shallow } from 'enzyme'

class Sample extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {onWillMountHandle} = this.props
    onWillMountHandle('a')
  }

  render() {
    const {onClickHandle} = this.props
    const clickHandle = () => {onClickHandle(2,3)}
    return (
      <div>
        <span onClick={clickHandle}>aaaa</span>
      </div>
    )
  }
}

describe('toHaveBeenLastCalledWith example', () => {
  let testMock1
  let subject

  beforeEach(() => {
    testMock1 = jest.fn()
    subject = shallow(<Sample onWillMountHandle={testMock1} onClickHandle={testMock1} />)
  })

  test('handle onWillMountHandle', () => {
    expect(testMock1).toHaveBeenLastCalledWith('a')
  })

  test('handle onClickHandle', () => {
    subject.find('span').simulate('click')
    expect(testMock1).not.toHaveBeenLastCalledWith('a')
    expect(testMock1).toHaveBeenLastCalledWith(2, 3)
  })
})

```

## 特定のコンポーネントのrender結果をsnapshotと比較して検証する `.toMatchSnapshot()`

これが**Jestの目玉のマッチャー**といっても過言ではないかもしれません。
 条件によりrenderが変化するコンポーネントがある場合にそれを記憶しておくのがこのマッチャーです。
 ただし、このマッチャーを使う場合にはTDDで開発する必要があります。このマッチャーは保存してあるsnapshotと結果が一致するかを検証するのですが、初回はsnapshotが存在しないで、snapshotを新規に作成するとともに検証を必ずパスします。なので

1.コンポーネントの初回テストを実施
 2.コンポーネントを完成させて、保存してあるsnapshotを修正
 3.再度テストを流して、パスすればOK

という流れになると思います。
 また、snapshotの保存先も決まっており、テストファイルの同階層に`__snapshots__`フォルダ内（なければ作られる）に`<テスト実行ファイル名>.snap`で作成されます。さらにこのsnapshotファイルに記述されている検証がない場合は全テストをパスしてもテストとしてはfailとなります。

toMatchSnapshot.test.js

```plain text
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

const Sample = ({renderChild}) => {
  let child = null
  if (renderChild) {
    child = <span>aaa</span>
  }

  return (
    <div className={'pearent'}>
      {child}
    </div>
  )
}

describe('toMatchSnapshot example', () => {
  const subject = (renderChild) => {
    const sampleRender = shallow(<Sample renderChild={renderChild} />)
    return shallowToJson(sampleRender)
  }
  test('render child', () => {
    expect(subject(true)).toMatchSnapshot()
  })

  test('not render child', () => {
    expect(subject(false)).toMatchSnapshot()
  })
})

```

__snapshots__/toMatchSnapshot.test.js.snap

```plain text
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`toMatchSnapshot example not render child 1`] = `
<div
  className="pearent"
/>
`;

exports[`toMatchSnapshot example render child 1`] = `
<div
  className="pearent"
>
  <span>
    aaa
  </span>
</div>
`;

```

公式では`react-test-renderer`を使用していますが、今回は公式と違い`enzyme`を使用しているため、`enzyme-to-json`も合わせて使用しております。（`npm install -D enzyme-to-json`を実行下さい）
 もちろんプログラムができあがってからもこのテストを実施してもいいですが、このsnapshotファイルを目視で確認することが必要になります。
 余談ですが**テスト実行時に**`**-- -u**`**のオプションを付けると現在のテストで全snapshotを再構築します**。（不要なものは削除で、変わっているものはsnapshotファイルの中身も書き換えます）

## 例外が発生したかを検証する `.toThrow()`

処理で例外が発生したかを検証するマッチャーが`toThrow`になります。例えば何かのリクエスト処理で例外が発生する場合にといった内容が考えられるのではないでしょうか。

```plain text
const sample = (throwError) => {
  if (throwError) {
    throw new Error("throw sample")
  }
}

describe('toThrow example', () => {
  test('throw error', () => {
    expect(() => {sample(true)}).toThrow()
  })
})

```

## 発生した例外が特定の例外かを検証する `.toThrowError(error)`

`toThrow`と大きく違うのは例外発生で終わってもいいことです。`toThrow`は例外が発生しても`try-catch`で処理しておかないといけませんが、`toTorowError`は例外発生で終わってもよいという点が大きく違います。ただし、`toThrowError`は引数が必要で、「例外メッセージ」か「例外種類」が必要になります。「例外メッセージ」については正規表現で書くことも可能です。

```plain text
const sample = () => {
  throw new Error("throw sample")
}

describe('toThrowError example', () => {
  test('throw error', () => {
    expect(sample).toThrowError(Error)
    expect(sample).toThrowError('throw sample')
    expect(sample).toThrowError(/sample/)
  })
})

```

## 発生した例外の結果をsnapshotと比較して検証する `. toThrowErrorMatchingSnapshot()`

`toMatchSnapshot`と例外版と考えてくれて結構です。

toThrowErrorMatchingSnapshot.test.js

```plain text
const sample = () => {
  throw new Error("throw sample")
}

describe('toThrowErrorMatchingSnapshot example', () => {
  test('throw error', () => {
    expect(sample).toThrowErrorMatchingSnapshot()
  })
})

```

例外テストで楽したい場合はこちらを使えばいいと思います。

## 独自のマッチャーを追加する `extend(matchers)`

Jestには独自にマッチャーを追加する機能もあります。例えば**『結果が特定値で割り切れるかどうかのマッチャー』**を追加するとします。（公式ドキュメントと一緒です）
 そんな場合は以下のように記載します。

```plain text
expect.extend({
  toBeDivisibleBy(received, argument) {
    const pass = (received % argument == 0)
    if (pass) {
      return {
        message: () => (
          `expected ${received} not to be divisible by ${argument}`
        ),
        pass: true,
      }
    } else {
      return {
        message: () => (`expected ${received} to be divisible by ${argument}`),
        pass: false,
      }
    }
  },
})

describe('Custom matcher example', () => {
  test('even and odd numbers', () => {
    expect(100).toBeDivisibleBy(2)
    expect(101).not.toBeDivisibleBy(2)
  })
})

```

`extend`にfunctionを定義し、返り値に`message`と`pass`を設定するだけで独自のマッチャーが作れます。

Promiseのオブジェクトをテストしたい場合は少しだけ書き方を変える必要があります。書き方は2パターンあります。

```plain text
describe('Promise example', () => {
  test('resolves to 1', () => {
    return expect(Promise.resolve('1')).resolves.toBe('1')
  })
})

```

まず、1つ目のパターンで大きく違うのは`expect`部分に`return`を書くパターンです。
 これでPromiseのテストができます。

```plain text
describe('Promise example', () => {
  test('resolves to 1', async () => {
    await expect(Promise.resolve('1')).resolves.toBe('1')
  })
})

```

2つ目はasync,awaitで書く方法です。好みなので、好きな方でどうぞ。ただPromiseをテストする場合は必要なので必ずどちらかで書く必要があります。

Promiseがresolveした場合の戻り値を検証することができます。

```plain text
describe('Promise example', () => {
  test('resolves to 1', () => {
    return expect(Promise.resolve('1')).resolves.toBe('1')
  })
})

```

Promiseがrejectした場合の戻り値を検証することができます。

```plain text
describe('Promise example', () => {
  const rejectPromise = new Promise(() => {
    throw new Error("throw sample")
  })

  test('resolves', async () => {
    await expect(rejectPromise).rejects.toEqual(new Error('throw sample'))
  })
})

```

テストではモックが必要な場合が多々あります。Jestはそのモックを簡単に作成することができます。が、記事自体が長くなってきたので、この辺は軽く書いておいて後日追記する形にしたいと思います。

## モックのFunctionを作る `jest.fn()`

これはマッチャー編にも出てきましたが、Functionのモックを作成します。ユニットテストをする場合は他のユニットのFunctionを呼ぶ場合がありますが、必ずしも実体が必要な場合があるわけではないので、その場合にこのFunctionのモックを使います。

## モックのFunctionの返り値を作る `.mockImplementation(fn)`

作成したFunctionのモックに返り値が必要な場合があります。その場合にこの`.mockImplementation`を設定し、返り値を設定してやります。

```plain text
describe('mockImplementation example', () => {
  const mock = jest.fn()
  mock.mockImplementation(() => 1)
  // 上記の記述は以下と同様
  // const mock = jest.fn(() => 1)
  test('return 1', () => {
    expect(mock()).toBe(1)
    expect(mock()).toBe(1)
    expect(mock()).toBe(1)
  })

  test('not equal 0', () => {
    expect(mock()).not.toBe(0)
  })
})

```

## モックのFunctionの呼び出し1回に限った返り値を作る `. mockImplementationOnce(fn)`

先程の`. mockImplementation`は設定後は何度呼び出してもその返り値が返ります。ですが、何度か呼ぶFunctionのモックを作成し、さらには呼ぶ度に返り値を変えたい場合に`. mockImplementationOnce`を使います。

```plain text
describe('mockImplementationOnce example', () => {
  const mock = jest.fn(() => 1)
  mock.mockImplementationOnce(() => "aa")
  mock.mockImplementationOnce(() => 4)

  test('changing return val', () => {
    expect(mock()).toBe("aa")
    expect(mock()).toBe(4)
    expect(mock()).toBe(1)
  })
})

```

Jestはまだまだ機能があり、正直1記事での分量ではないほどあります。起動オプションに`--coverage`を付けることでカバレッジを測ったりすることもできたりと盛りだくさんです。

いかがでしたでしょうか。今回はテストのためのコードとして最低限知っておけばJestを使えるということをお伝えしたつもりです。
 これによりフロントエンドにおけるテストの助けになれば幸いです。
 記事の不備等に関して遠慮なくご指摘ください。

1. We will deliver articles that match you
2. you can read useful information later efficiently

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fchimame%2Fitems%2Fe97883fd46b67529d59f&realm=qiita)[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fchimame%2Fitems%2Fe97883fd46b67529d59f&realm=qiita)