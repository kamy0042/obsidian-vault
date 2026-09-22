---
プロパティ: ""
Created: 2021-01-15T20:26:00
Tags: [topic/技術/関数型プログラミング]
---
## はじめに

前に[ブログ](https://ichimaruni-design.com/2017/09/js-closure/)で書いた記事なのですが、せっかくなのでQiitaにも投稿します。

脱初級者の壁として君臨しているクロージャ。クロージャの使い方はわかったけど、いろんな記事を見るとクロージャは問題点もあるみたい。それに、そもそもクロージャの使い所がいまいちわかんないと思ってクロージャに再度立ち向かおうと思った次第です。同じような悩みを抱えているデザイナーさん、コーダーさん、フロントエンドエンジニアさんの参考になれば嬉しいです。

## クロージャとは

とりあえずおさらい & 補足をします。

よく見かけるクロージャの見本がこちら。

`function closure(initVal){
  var count = initVal;

  var innerFunc = function() {
    return ++count;
  }
  return innerFunc;
}

var myClosure = closure(100);
myClosure(); // 101
myClosure(); // 102
myClosure(); // 103`

ここで簡単にクロージャについて説明します。ちなみに、最近読んだ本で[何となくJavaScriptを書いていた人が一歩先に進むための本](https://af.moshimo.com/af/c/click?a_id=507707&p_id=170&pc_id=185&pl_id=4062&url=https%3A%2F%2Fwww.amazon.co.jp%2F%25E4%25BD%2595%25E3%2581%25A8%25E3%2581%25AA%25E3%2581%258FJavaScript%25E3%2582%2592%25E6%259B%25B8%25E3%2581%2584%25E3%2581%25A6%25E3%2581%2584%25E3%2581%259F%25E4%25BA%25BA%25E3%2581%258C%25E4%25B8%2580%25E6%25AD%25A9%25E5%2585%2588%25E3%2581%25AB%25E9%2580%25B2%25E3%2582%2580%25E3%2581%259F%25E3%2582%2581%25E3%2581%25AE%25E6%259C%25AC-%25E4%25BA%2594%25E5%258D%2581%25E5%25B5%2590%25E8%2582%2587-ebook%2Fdp%2FB01F0N36ES)が説明としてわかりやすかったので、そちらを引用させていただきながら。
まずクロージャとは

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.moshimo.com%2Faf%2Fi%2Fimpression%3Fa_id%3D507707%26p_id%3D170%26pc_id%3D185%26pl_id%3D4062?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=fdf270df2584b309ad14df4ad307609f)

> ローカル変数を参照している、関数の中に定義している関数

ということらしいです。なので今回の場合だと`innerFunc`関数がクロージャに該当しますね。では、なぜ、`myClosure()`が呼び出されるたびに結果が増えていくかというのがわかるとクロージャがどんなものなのかわかってきます。

まず、通常の関数の中に定義されているローカル変数は、関数の処理が終わった時点で破棄されます。しかし、先ほどのコードだとmyClosureがローカル変数`count`を参照し続けています。そのことによって結果が増えていきます。では、なぜこのようなことが起きるのかというと

1. closure関数ではローカル変数`count`を参照している関数`innerFunc`が返却されている
2. `innerFunc`そのものは`myClosure`に格納される
3. `myClosure`はグローバル変数なため、グローバルオブジェクトが存在し続ける限り解放されることがない
4. なので、ローカル変数`count`も破棄されない
5. `count`は破棄されないので、`closure`呼び出し時に代入された値が保持される
6. よってcountは加算されていく

こんな仕組みで動いているのがクロージャです。スコープチェーンと破棄されるタイミングさえ掴めれば理解できそうです。
ざっとクロージャとはどんなものかおさらいできたところで、今回の本題に入りたいと思います。

## クロージャによるメモリーリーク

コメントでいただいた[こちらの記事](https://qiita.com/tkdn/items/ea4f034e0d661def244a#3-%E3%82%AF%E3%83%AD%E3%83%BC%E3%82%B8%E3%83%A3)がわかりやすかったのでこちらを参照させていただきます。

`var theThing = null;
var replaceThing = function () {

  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // 'originalThing' への参照
      console.log("hi");
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
};

setInterval(replaceThing, 1000);`

どうしてメモリーリークが起きてしまうのかは[こちら](https://qiita.com/tkdn/items/ea4f034e0d661def244a#3-%E3%82%AF%E3%83%AD%E3%83%BC%E3%82%B8%E3%83%A3)の解説が非常にわかりやすいので、ぜひ目を通して見てください。他にも「4種類の一般的な JavaScript 共通のメモリリーク」として

- グローバル変数
- 放置されるタイマーもしくはコールバック
- DOM 参照

についても詳しく解説されています。

ちなみに、Google ChromeのDevToolsで調べてみると

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F47844%2F2fd1925c-c9e9-a9f2-0b56-2fa1318fb0be.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=a454e52b5b11c50d89f0b71a3bf7adb1)

このように毎秒ごとにメモリ使用量が増えてしまっているのがわかります。途中、手動GCをしても増え続けてしまっています。

このメモリーリークを修正すると、`replaceThing`の最後に`originalThing = null`を追加するだけです。

`var theThing = null;
var replaceThing = function () {

  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // 'originalThing' への参照
      console.log("hi");
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
  originalThing = null
};

setInterval(replaceThing, 1000);`

## クロージャの使い所とは

クロージャはメモリーリークを引き起こしてしまう可能性があるというのがわかってきました。では、実際クロージャはどんなケースで使えばいいのでしょうか？

### 状態を覚えておきたい時

よくあるのが、

`jQuery(function($){
  var isClicked = false;
  $('.btn').click(function(){
    if (isClicked) {
      console.log('クリック済みです');
    }
    isClicked = true;
  });
});`

こんな感じなのですね。クリックしたかどうかを覚えておく時に使ったりします。コーポレートサイトなんかでjQueryを使っている時なんかはいいのかもしれません。ただ、特にメモリーリークがおきやすいSPAだと、Reactなどを使っているケースがほとんどだと思います。その場合State管理しているので別段クロージャを使わなくていいですね。

### private プロパティの定義

Javascriptでは、「プライベートメンバ」という機能がありません。全てのメンバは常にパブリックになってしまいます。下記のprototypeの例だと、`name`が外部から操作されてしまっているのがわかります。

[mitsuruog/clean-code-javascript: Clean Code concepts adapted for JavaScript](https://github.com/mitsuruog/clean-code-javascript/#prefer-es2015es6-classes-over-es5-plain-functions)

`const Employee = function(name) {
  this.name = name;
};

Employee.prototype.getName = function() {
  return this.name;
};

const employee = new Employee('John Doe');
console.log('Employee name:' + employee.getName()); // Employee name: John Doe
delete employee.name;
console.log('Employee name:' + employee.getName()); // Employee name: undefined`

クロージャのテクニックを使って、private プロパティのようなものを作ることができます。下記の場合だと、`delete employee.name;`で操作できていないことがわかりますね。

`function makeEmployee(name) {
  return {
    getName: function() {
      return name;
    }
  };
}

const employee = makeEmployee('John Doe');
console.log('Employee name:' + employee.getName()); // Employee name: John Doe
delete employee.name;
console.log('Employee name:' + employee.getName()); // Employee name: John Doe`

ただクロージャを使えばプライベートメンバを作れるのですが、PrototypeベースというJavaScriptの利点をなくしてしまう他、インスタンス化する度にメソッドを定義するためメモリも余計に使ってしまう恐れもあります。これを回避するために、`this._name`のようにして紳士協定でprivate プロパティを作る方法があります。

`const Employee = function(name) {
  this._name = name;
};

Employee.prototype.getName = function() {
  return this._name;
};`

## ES6ではWeakMapを使ってprivate プロパティを作れる

Classをインスタンス化する際、そのインスタンス(this)をWeakMapにsetすればWeakMap.get(this)でメンバにアクセスできるようになります。

`var Func = (function() {
  var privates = new WeakMap();

  function Func() {
    privates.set(this, {});

    privates.get(this).prop = 1;
  }

  Func.prototype.method = function() {
    console.log('******************')
    console.log(privates.get(this).prop)
    console.log('******************')
  };

  return Func;
})();

let p = new Func();
p.method();`

## まとめ

今回クロージャについて再度調べてみました。クロージャのデメリットとメリットについてまとめてみました。
正直、ES6以前ではprivateプロパティを作るという点でいいんですが、どうしてもメモリ使用量とのトレードオフになってしまいますね。紳士協定に寄る対応策もありますがクロージャの使い所を間違えないようにしたいですね。んで、もしクロージャを使っているのであればメモリーの使用についてはしっかりと計測をしてメモリーリークがおきていないか把握したいところです。

ただ、ES6環境であればWeakMapでprivateプロパティを作れるのは大きいですね。

## 多数のコメントいただきありがとうございました

最初に投稿した時点では内容に間違いがありましたので、大幅な修正をさせていただきました。