---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
`この記事はすでに古い情報ですのでご注意ください。

2018年02月01日 に誤字を修正したリクエストを受け入れてから閲覧する方が多くなっていますが
この記事の投稿日は 2014年05月06日 です。`

~~随時更新します。~~

1. [CoffeeScriptを使う理由](http://qiita.com/asaake88/items/9462844b049900ffb22c)
2. [TypeScriptを使う理由](http://qiita.com/asaake88/items/a0f17d9f4f757d88a83a)
3. AltJSを使わない理由
4. Dartを使う理由

仕事でTypeScriptを使う場合の説得材料まとめです。

# なぜJavaScriptではいけないのか

## クラス定義がないからです

みんな大好きオブジェクト指向をするために必須なのにJavaScriptではクラスは書けません。
いや、正確には書けます。

クラス定義

`function Person() {};`

なんだクラスは簡単に書けるじゃないかと思いましたか？

クラス定義その２

`function Person() {
  this.name = "takashi";
  this.age = 20;
};
Person.prototype.echo = function () {
  return "Hello " + this.name + " !!";
};`

コンストラクタ、メソッドを書いただけで、コード量が増えてきましたね。
毎回クラス名とprototypeと書く必要があります。
めげてきましたか？
私はめげてます。

次は継承してみましょう。

継承

`function inherits(ctor, superCtor) {
  ctor.super = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

inherits(Employee, Person);
function Employee() {
  Person.apply(this, arguments);
};

Employee.prototype.echo = function () {
  return "Hello " + Employee.super.prototype.echo.call(this);
};`

どうでしょうか？
継承元を呼び出すのにEmployee.super.prototype.echo.call(this)のように書かないといけません。

継承の方法は今まで迷走していたので各々実装方法も違います。
詳しく知りたい場合はこちらを参照するといいです。[そんな継承はイヤだ - クラス定義 - オブジェクト作成](http://qiita.com/LightSpeedC/items/d307d809ecf2710bd957)

## functionという記述が長過ぎる

JavaScriptはシングルスレッドなので、callbackを多用します。
多用するのに毎回functionと書かなければいけません。
後からコードを見直すとfunctionだらけで頭が痛くなることでしょう。

functionが長過ぎる

`var self = this;
$.get("/users", function (users) {
  var result = [];
  $.each(users, function (user) {
    result.push(new User(user));
  });
  return result;
}).done(function (users) {
  self.users = users;
}).fail(function (xhr, status, msg) {
  console.error(msg);
});`

## パッケージ管理が標準で存在しない

ある程度の規模のシステムになってくるとnamespaceを指定したくなってきます。
でもJavaScriptには標準でそのような機能はないので自分でそれらを実装する必要があります。

オブジェクトでまとめてみる

`var MyApp;
MyApp = MyApp || {};
MyApp.Models || MyApp.Models || {};
MyApp.Models.Person = {name: "takashi"};`

AMDを使ってみる

`define("myapp/models/person", function () {
  return {name: "takashi"};
});`

## 型がない

型がないとコード補完があまり効きません。
おもむろにCtrl+Spaceを押してがっかりしたことも多いはずです。

型がないことで、そこに入れるべきではない値を入れてしまうこともあります。

コード補完ができない

`var Person = {
  name: "takashi"
};
Persono.name; // 同じファイルならコード補完できるかも
              // ファイルが違ったり、AMDなら絶望的`

# TypeScriptを使おう

これらのよくないコードを未然に防いでくれるのがTypeScriptです。
それぞれ例をみていきましょう。

クラス定義

`class Person {

  name:string;
  age:number;

  constructor() {
    this.name = "takashi"
    this.age = 20
  }

  public echo():string {
    return "Hello " + this.name + " !!";
  }
}

class Employee extends Person {
  constructor() {
    super();
  }

  echo():string {
    return "Hello " + super.echo();
  }
}`

function文

`$.get("/users", (users) => {
  var result = [];
  $.each(users, (user) => {
    result.push(new User(user))
  });
  return result;
}).done((users) => {
  this.users = users
}).fail((xhr, status, msg) => {
  console.error(msg)
});`

パッケージ管理

`module MyApp {
  export module Models {
    export class Person {
      name:string;
      constructor() {
        this.name = "takashi";
      }
    }
  }
}
var person = new MyApp.Models.Person();
console.log(person.name);`

型がある

`class Person {
  name:string;
  constructor() {
    name = 1; // コンパイル時に警告
  }
  echo():string {
    return 1; // コンパイル時に警告
  }
}
new Person().e // Ctrl + Spaceでechoが表示される`

どうですか？
ダメなコードも未然に防げて、かつ簡素なコードでしょう？
さらにコード補完まで効いちゃいます。
これでドキュメントを嘗め回さなくても済みますね。

# TypeScriptはコンパイルしてJavaScriptを出力するけど、デバッグはどうするの？

TypeScriptにはSourceMapを出力するオプションが存在します。
これは出力されたJavaScriptがTypeScriptのどのコードの位置とマッチするかの情報を含んだファイルです。
これをIEに食わせることにより、TypeScriptでデバッグが行えます。

詳しいやり方はグーグルで`TypeScript source map ie`とかで検索するといいです。
ちなみにVisual Studioを使えばこの辺りはうまいことやってくれます。

TypeScriptはJavaScriptをそのまま拡張したようなものです。
class等の構文を除けばそのままなので、SourceMapを使ってデバッグしても問題ないと思います。

# ちょっと注意、魔法の杖ではありませんよ。

HibernateしかりActiveRecordしかり、ORMはDBの設計、SQLをある程度知っていて始めて使用することができます。
ORM使うからSQL知らなくても問題ないぜー！！バリバリー！！
みたいなことはしてませんよね？

TypeScriptもご多分に漏れずJavaScriptをある程度知っている必要があります。
いきなりTypeScriptから始めます！
というようなことは避けた方が懸命です。
JavaScriptを軽く学習されてからTypeScriptを学習されてください。
いくらTypeScriptがJavaScriptを拡張しただけのものとはいえ、コンパイルしてJavaScriptで実行しているのです。
TypeScriptを直接実行できるなら話は別ですがこのような状態ですので、JavaScriptは必ず学習されてください。
でないとデバッグで死にます。

# わかりました。TypeScriptを使います。

ようこそTypeScriptの世界へ。

あなたはTypeScriptを採用したことで以下の恩恵を受けることができます。

5. ソースコードが簡素になったことで保守性があがります。
6. 型が使用できることによってコード補完、リファクリングが容易に可能となります。

あれ？少ない？
いえいえ、すごく大事な２点です。
塵積です。

# でも待って・・・実は問題山積みなんです。

コンパイルするのがめんどうくさいのもあるのですが、なによりも問題は型の定義です。

## 型の定義

有名なライブラリーは[TSD](https://github.com/DefinitelyTyped/tsd)で揃っていますが、バージョンが古いものがあったりするようです。
野良ライブラリーや独自に溜め込んでいたライブラリーは絶望的です。

頑張って型情報を作成するか、割り切ってAnyを使用してなんでもありにするかの二択を迫られることになります。

## 依存ファイルの宣言

依存の定義

`/// <reference path="hello.ts"/>`

書くだけじゃないかと思われるでしょうか？
実はこれカレントディレクトリを指定する方法がないのです。
議論にはあがっているようなので対応を待つしかないのですが、その間はあまり深いネストをすると大変でしょう。

## exportの使い方を学びましょう

最初はどこをどのようにexport指定すればいいのか迷います。
なので公式のエディタでexportの使い方を学びましょう。

以下の方法だとexportsのPersonプロパティにPersonクラスを出力するので一段下がります。

person.ts

`export class Person { 
}`

main.ts

`/// <reference path="person.ts"/>
import PersonModule = require("person");
var Person = PersonModule.Person;
new Person();`

一段下げたくない場合はexportに直接代入してください。

person.ts

`class Person {
}
export = Person;`

main.ts

`/// <reference path="person.ts"/>
import Person = require("person");
new Person();`

モジュール以下のクラスを出力する場合は各々にexportを指定しましょう。
ひとつでも欠けると参照不可の警告が発生します。

person.ts

`module MyApp {
  export module Models {
    export class Person {
    }
  }
}`