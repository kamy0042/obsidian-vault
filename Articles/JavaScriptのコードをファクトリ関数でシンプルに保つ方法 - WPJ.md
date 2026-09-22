---
プロパティ: ""
Created: 2021-01-15T20:26:00
Tags: [topic/技術/関数型プログラミング]
---
関数やオブジェクトの習得なくして、JavaScriptプログラマーとして成功はできません。また、関数やオブジェクトは、[コンポジション](https://en.wikipedia.org/wiki/Composition_over_inheritance)と呼ばれる強力なオブジェクトパラダイムを開始するために必要な土台となります。今回はファクトリ関数を使用して関数、オブジェクト、Promiseを生成する際によく使われるパターンを説明していきます。

関数が1つのオブジェクトを返すとき、その関数をファクトリ関数と呼びます。

簡単な例を示します。

```plain text
function createJelly() {
  return {
    type: 'jelly',
    colour: 'red'
    scoops: 3
  };
}

```

ファクトリを呼び出すたびに、ファクトリは「jelly」オブジェクトの新しいインスタンスを返します。

重要なのは、ファクトリ名にcreateという接頭辞をつける必要はないということです。ただし、接頭辞をつけるとほかの人たちにもその関数の目的をより明確に伝えられます。typeプロパティについても同様ですが、プログラム内で使用するオブジェクトの識別に役立つことがあります。

## パラメーター化ファクトリ関数

ほかの関数と同様に、ファクトリ関数に返されるオブジェクトの形式を変えるパラメーターを定義できます。

```plain text
function createIceCream(flavour='Vanilla') {
  return {
    type: 'icecream',
    scoops: 3,
    flavour
  }
}

```

理論上は、非常に特殊で階層の深いオブジェクトを返すのに、何百もの引数を指定してパラメーター化ファクトリも使用できますが、あとで述べるように、コンポジションの趣旨とはまったくかけ離れたものになってしまいます。

## 構成可能なファクトリ関数

ほかのファクトリからファクトリを定義すれば、複雑なファクトリをより小さく、再利用可能なフラグメントに分解できます。

たとえば、前もって定義された「jelly」および「ice cream」ファクトリから「dessert」ファクトリを生成できます。

```plain text
function createDessert() {
  return {
    type: 'dessert',
    bowl: [
      createJelly(),
      createIceCream()
    ]
  };
}

```

ファクトリを構成することで、[new](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/new)や[this](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/this)に手を加えることなく、自由に複雑なオブジェクトを生成できます。

is-a関係ではなくhas-a関係として表現されるオブジェクトは、継承の代わりにコンポジションを使って実装できます。

次に、継承の例を示します。

```plain text
// A trifle *is a* dessert

function Trifle() {
  Dessert.apply(this, arguments);
}

Trifle.prototype = Dessert.prototype;

// or

class Trifle extends Dessert {
  constructor() {
    super();
  }
}

```

同じ内容をコンポジションを使って書くこともできます。

```plain text
// A trifle *has* layers of jelly, custard and cream. It also *has a* topping.

function createTrifle() {
  return {
    type: 'trifle',
    layers: [
      createJelly(),
      createCustard(),
      createCream()
    ],
    topping: createAlmonds()
  };
}

```

## 非同期ファクトリ関数

すべてのファクトリですぐにデータを返せるようになるわけではありません。たとえば、最初にデータを取得しなければならないケースもあります。

そのような場合は、代わりにPromiseを返すファクトリを定義できます。

```plain text
function getMeal(menuUrl) {
  return new Promise((resolve, reject) => {
    fetch(menuUrl)
      .then(result => {
        resolve({
          type: 'meal',
          courses: result.json()
        });
      })
      .catch(reject);
  });
}

```

このような深い階層のインデントになると、非同期ファクトリの解読やテストが困難になります。複数の異なるファクトリに分解してから構成すると使いやすくなる場合もあります。

```plain text
function getMeal(menuUrl) {
  return fetch(menuUrl)
    .then(result => result.json())
    .then(json => createMeal(json));
}

function createMeal(courses=[]) {
  return {
    type: 'meal',
    courses
  };
}

```

もちろん、代わりにコールバックを使えますが、すでにPromise.allのようなPromiseを返すファクトリを構成するツールが存在します。

```plain text
function getWeeksMeals() {
  const menuUrl = 'jsfood.com/';

  return Promise.all([
    getMeal(`${menuUrl}/monday`),
    getMeal(`${menuUrl}/tuesday`),
    getMeal(`${menuUrl}/wednesday`),
    getMeal(`${menuUrl}/thursday`),
    getMeal(`${menuUrl}/friday`)
  ]);
}

```

命名規則としてcreateではなくgetを使用して、これらのファクトリが非同期処理しPromiseを返すことを示します。

## 関数およびメソッド

これまでに、メソッドと一緒にオブジェクトを返すファクトリは1つも出てきませんでしたが、これは意図的なものです。なぜなら、通常は不要だからです。

ファクトリによって計算結果からデータを分離できるからです。

つまり、常にオブジェクトをJSONにシリアライズできるということですが、オブジェクトを複数のセッションをまたいで保持し、HTTPまたはWeb Socket経由で送信し、さらにデータストアに保存する上で重要なことなのです。

たとえば「jelly」オブジェクト上に「eat」メソッドを定義するのではなく、オブジェクトをパラメーターとして受け取り、修正されたバージョンを返す新しい関数を定義すれば良いのです。

```plain text
function eatJelly(jelly) {
  if(jelly.scoops > 0) {
    jelly.scoops -= 1;
  }
  return jelly;
}

```

これが、 [ちょっとした構文の助け](https://babeljs.io/docs/plugins/transform-object-rest-spread/)によって、データ構造を変化させずにプログラムすることを好む人向けの実行可能パターンになります。

```plain text
function eat(jelly) {
  if(jelly.scoops > 0) {
    return { ...jelly, scoops: jelly.scoops - 1 };
  } else {
    return jelly;
  }
}

```

ここで、次のように記述するのではなく、

```plain text
import { createJelly } from './jelly';

createJelly().eat();

```

以下のように記述します。

```plain text
import { createJelly, eatJelly } from './jelly';

eatJelly(createJelly());

```

最終的には1つのオブジェクトを受け取り、1つのオブジェクトを返す関数となります。

それでは、1つのオブジェクトを返す関数を何と呼ぶのでしょうか？ ファクトリです！

## 高階ファクトリ

ファクトリを[高階関数](https://www.sitepoint.com/higher-order-functions-javascript/)として扱うことで、コントロールできる範囲が広くなります。たとえば、エンハンサーを生成するのにこの概念を使用できます。

```plain text
function giveTimestamp(factory) {
  return (...args) => {
    const instance = factory(...args);
    const time = Date.now();
    return { time, instance };
  };
}

const createOrder = giveTimestamp(function(ingredients) {
  return {
    type: 'order',
    ingredients
  };
});

```

このエンハンサーは既存のファクトリを受け取ってラップし、タイムスタンプを持つインスタンスを返すファクトリを生成します。

あるいは、確実にファクトリが不変オブジェクトを返すようにしたい場合は、freezer（フリーザー）を使って拡張できますよ。

```plain text
function freezer(factory) {
  return (...args) => Object.freeze(factory(...args)));
}

const createImmutableIceCream = freezer(createIceCream);

createImmutableIceCream('strawberry').flavour = 'mint'; // Error!

```

## 最後に

かつて、ある[賢明なプログラマー](https://www.youtube.com/watch?v=4anAwXYqLG8)が以下のように述べました。

> 抽象化のない箇所の修復は、誤った抽象化の修復より、はるかに容易だ。

JavaScriptのプロジェクトはテストやリファクタリングが難しくなる傾向にあります。これは、一緒にビルドすることがたびたび推奨される、複雑に何層にも重なる抽象化によるものです。

プロトタイプやクラスでは、言語仕様に追加されてから何年も経ったいまでも、[あらゆる混乱](http://stackoverflow.com/questions/tagged/javascript%20this?mode=all)を引き起こしているnewやthisのような複雑で不自然なツールを用いて、シンプルなアイデアを実装するのです。

オブジェクトや関数はたいていの場合プログラマーにとって意味があり、双方ともにJavaScriptのプリミティブ型であるため、ファクトリプロセスと抽象化はまったく異なるものといえます。

こうしたシンプルな構成要素を使用すると、 経験の浅いプログラマーでもコードが扱いやすくなります。同時に、あらゆる開発者が関心を持つべきことであるのは間違いありません。プリミティブは高次の抽象化を実施せずともコンポジションできる特性を持っているので、ファクトリでは複雑な非同期データをプリミティブを使って生成することが推奨されます。シンプルさを追求すれば、JavaScriptはもっと魅力的になるのです！

※本記事は[Jeff Mott](https://www.sitepoint.com/author/jmott)が査読を担当しています。最高のコンテンツに仕上げるために尽力してくれたSitePointの査読担当者のみなさんに感謝します。

［翻訳：市川千枝／編集：[Livit](http://livit.media/)］

Copyright © 2016, Dan Prince All Rights Reserved.

![](https://cdn.webprofessional.jp/wp-content/uploads/sites/2/2016/08/31201155/1472641914_image1.jpeg)

Dan Prince

デジタルノマドであり、UKベースのスタートアップ企業Astral Dynamicsの共同設立者です。