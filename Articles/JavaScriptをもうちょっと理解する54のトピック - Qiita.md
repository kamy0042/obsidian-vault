---
Created: 2022-11-09T10:27:00
URL: https://qiita.com/komlabo/items/3f14c8990a2f94fb5323#%E3%82%AD%E3%83%A3%E3%83%97%E3%83%81%E3%83%A3%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%95%E3%82%A7%E3%83%BC%E3%82%BA%E3%81%A8%E3%83%90%E3%83%96%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%95%E3%82%A7%E3%83%BC%E3%82%BA
Tags: [topic/技術/JavaScript]
---
### キャプチャリングフェーズとバブリングフェーズ

下記のように親から順番に div > p > span とタグが階層になっている要素があるときに

spanタグをクリックすると、clickイベントは上の階層(window)から順番に要素を下に降りてきます。これをキャプチャ（フェーズ）といいます。
 クリックした span 要素に到達すると、次はspanから上の階層に登っていきます。これをバブリング（フェーズ）といいます。

(1)キャプチャフェーズの進行方向（おりる）→
 window > document > html > body > div > p > span
 ←(2)バブリングフェーズの進行方向（のぼる）

### 基本はバブリングフェーズで処理する

一般的にイベントはバブリングフェーズで処理します。先程の例だと、クリックしたspan要素にイベントがあれば処理して、次にp要素にイベントがあれば処理して、さらに上の階層のイベント処理をして・・という風です。（イベントが登録されていない要素は何もせず上にのぼります）

jsでaddEventListenerを書いた場合、引数に明示的に指定しないとバブリングフェーズでの処理になります。
 （jQueryはキャプチャフェーズで処理する設定すらありません）

キャプチャフェーズは、外部のライブラリなどでバブリングフェーズが定義されていて、それを上書きや打ち消したりする場合などに使われたりするようです。

```plain text
// キャプチャフェーズに登録するには第3引数にオブジェクトで指定
el.addEventListener('click', 処理関数, {capture: true});
// または単にtrueを設定
el.addEventListener('click', 処理関数, true);

```

### イベントの制御

addEventListenerのコールバックの第1引数にはEventオブジェクトが入ります。Eventオブジェクトの特定のメソッドを呼ぶことでイベントの伝播（キャプチャリング＋バブリング）や、タグのデフォルトの動作（aタグならリンク遷移）などを止めるなどの制御ができます。

[1分でわかるreturn false; preventDefault(); stopPropagation() の違い | iwb.jp](https://iwb.jp/return-false-preventdefault-stoppropagation/)

### event.preventDefault()

タグのデフォルトの動作（aタグならリンク遷移）を止めます。
 例）デザインの都合でaタグを使っているけど、ページ遷移させたくない場合など。

```plain text
const el = document.querySelector('a');
el.addEventListener('click', function (event) {
    event.preventDefault(); // aタグのデフォルトイベント(=リンク遷移)をキャンセルする
});

```

### event.stopPropagation()

イベントが伝播（キャプチャリング＋バブリング）するのを停止します。これが呼ばれると、それ以降のタグにイベントが渡りません。
 例）ボタンのクリックは処理したいけど、親に設定してあるイベントを動かしたくない場合など。

preventDefault()とは意味合いが違うので、必要に応じて両方呼んでもOKです。

```plain text
const el = document.querySelector('a');
el.addEventListener('click', function (event) {
    event.stopPropagation(); // aタグの上位にあるタグにイベントを回さない
});

```

### eventでreturn false;

その場でそのイベントの処理を終了するのに加えて、イベント伝播とデフォルト動作も停止します。
 イベント処理終了＋preventDefault＋stopPropagationという感じです。

### おまじないの意味

こんな感じの書き方を見たことないでしょうか。
 意味合いとしては、スコープ制限（グローバルな領域に変数などを宣言しない）をするために記述します。

```plain text
// おまじない
(function () {
  // 処理
})()

// 1. 実行する処理が動くための無名関数を定義
function () {
  // やりたい処理
}

// 2. 即時で実行するためにカッコで囲う
(function () {
  // やりたい処理
})

// 3. その場で実行するために末尾にカッコをつける
(function () {
  // やりたい処理
})()

```

[【jQuery】よく見るおまじない的なアレについて - Qiita](https://qiita.com/tomcky/items/63cd6a35180af0699962)

## jQuery編

### jQueryはJSで書かれたユーティリティライブラリ

jQueryはJSで記述されたユーティリティです。
 DOMの記述をCSS風にすることで書きやすく、またブラウザごとの挙動の差異の吸収などをしてくれます。

DOMにquerySelectorが実装されたり、ReactやVueなどのフレームワークの登場で出番は減ったものの、作られた大量のプラグインなどもあり、今なお便利な存在です。

JSのユーティリティとしては他にUnderscore.jsなどが有名です。

### $はjQueryのエイリアス

何気なく書いている `$(selector)` って何か分かるでしょうか？

`$` はjQueryのエイリアスになります。つまり `$(なにか)` も `jQuery(なにか)` も処理は同じです。
 なぜ `$`か… $はJSの変数として普通に使える文字であり、なおかつよく使うのでできるだけ短く（1文字）ということで白羽の矢が立ったんだったと思います。

### jQuery関数

ではjQuery関数は何か、それは渡したものに応じていい感じのjQueryオブジェクトを返してくれる関数です。

セレクタを指定すればページ中の要素が入ったjQueryオブジェクトを、タグを書けば新しく作った要素の入ったjQueryオブジェクトを返してくれます。

### jQueryオブジェクト

jQueryオブジェクトは、DOMの要素が入っている特別なオブジェクトです。

例えば `addClass` というメソッドを持っていて、これを呼び出すと、中に入っている要素に引数で指定したクラスの付与をします。

```plain text
const $allDiv = $('div'); // ページ中のdivが全て入ったjQueryオブジェクト
$allDiv.addClass('hoge'); // 中のjQueryオブジェクトそれぞれにhogeクラスを追加

```

一般的には、jQueryオブジェクトが入った変数は先頭に `$` をつけることが多いようです。

### jQueryオブジェクトとJS(DOMオブジェクト)の比較

以前はDOM操作はjQueryの方が書きやすい印象でしたが、今は素のJS（バニラJS）も進化して、かなり近いものを書けるようになりました。例えば特定のクラス要素を取得してクラスを付与するコード。

```plain text
// jquery
$('.hoge').addClass('fuga');

// js、querySelector以前は取得してぐるぐる
var hogeList = document.getElementsByClassName("hoge");
for (var i = 0, len = hogeList.length; i < len; i++) {
    hogeList[i].classList.add('fuga');
}

// js、querySelector(All)を使う
const hogeList = document.querySelectorAll('.hoge');
hogeList.forEach(function(el) {
  el.classList.add('fuga');
});

// js、一発でやってもいい
document.querySelectorAll('.hoge').forEach(function(el) {
  el.classList.add('fuga');
});

```

### jQueryオブジェクトのメリット、空振りできる

違いが少なくなったらわざわざjQueryを使う必要もないですが、便利な面もあります。
 例えば、先程のような感じで、特定の要素を取得してクラスを付与するコードで、特定の1要素がターゲットの場合を考えます。

```plain text
// jquery #hoge要素がない場合、対象要素が0のjQueryオブジェクトにaddClass → 何も起きない
$('#hoge').addClass('fuga');

// js #hoge要素がない場合、hogeはnull → nullにclassListというプロパティがない → エラー
var hoge = document.getElementById("hoge");
hoge.classList.add('fuga');

// js(エラー対策) hogeがあるときだけ実行する
var hoge = document.getElementById("hoge");
if (hoge) {
  hoge.classList.add('fuga');
}

```

このように、対象要素がないとgetElementByIdはnullを返すので（querySelectorでも同様）チェックが必要になります。この挙動がいいとも悪いとも言えませんが、エラーで止まることがないのはメリットと言えるかもしれません。

ちなみにJSでも複数要素を取得してforEachで処理する場合は、0件でもエラーになりません。
 複数要素を取得するメソッドは数に限らずNodeListが返るので、NodeList要素.forEach(処理)は要素がなければ処理しないだけなので大丈夫です。

### JSでもオプショナルチェイニングで空振り可能（※追記）

コメントいただいたので追記します。
 この記事の最後の方で紹介しているオプショナルチェイニング `?.` を使えばJSでも空振りできます！

```plain text
// .hoge 要素がなければundefinedが返って終了
var hoge = document.getElementById("hoge");
hoge?.classList.add('fuga');

// 1行で書いてもOK
document.getElementById('hoge')?.classList.add('fuga');

```

### jQueryオブジェクトからn番目の要素をjQueryオブジェクトとして取り出す

jQueryオブジェクトに複数の要素が格納されているとき、n番目の要素を取り出す方法は `$obj.eq(n)` で取り出せます。
 ここで取り出したものは **jQueryオブジェクト** として取得されます。
 ※セレクタの時点でn番目に絞り込む場合は `$('selector:eq(n)')`のように書く

```plain text
const $divList = $('div'); // ページ中のdivが全て入ったjQueryオブジェクト
const $3rdDiv = $divList.eq(2); // 3番目のdivをjQueryオブジェクトで取り出す(0はじまり)

```

### jQueryオブジェクトからn番目の要素をDOMオブジェクトとして取り出す

jQueryオブジェクトに複数の要素が格納されているとき、n番目の要素を取り出す方法は `$obj.get(n)` で取り出せます。
 ここで取り出したものは **DOMオブジェクト** として取得されます。

```plain text
const $divList = $('div'); // ページ中のdivが全て入ったjQueryオブジェクト
const $3rdDiv = $divList.get(2); // 3番目のdivをDOMオブジェクトで取り出す(0はじまり)

```

### jQueryのイベント定義

jQueryでイベントを設定する場合、主に `.on` を使います。

### jQueryでイベントコールバック関数のthisはDOMオブジェクト

jQueryでコールバック関数に渡される this はDOMオブジェクトが入っています。jQueryオブジェクトではないため、例えばaddClassなどjQueryのメソッドを使いたい場合は $(this) などでjQueryオブジェクトにしてあげる必要があります。

```plain text
$('.btn').on('click', function (event, el) {
    const el = this; // DOMオブジェクト
    const $el = $(this); // jQueryのメソッドを使いたいなら
    $el.addClass('hoge'); // など
});

```

### noConflictの説明

jQueryはscriptタグで読み込まれると、その時点で `window.jQuery`に入っているものを内部の `_jQuery`に、 `window.$`に入っているものを内部の `_$`に退避して、読み込んでいるjQueryを新たに `window.jQuery`と `window.$`にセットします。

ここで `jQuery.noConflict(true);` か `$.noConflict(true);` を呼ぶと、window.jQueryとwindow.$を読み込む前に戻して、noConflictの関数はそのjQuery自身を返してくれます。

ちなみにnoConfilctの引数を空またはfalseにすると、 `window.$`だけ戻して `window.jQuery`はそのままです。 `$` だけを使っているユーティリティなどと同時に読み込むことを想定しているんでしょうかね・・

noConflictの使いどころは、複数バージョンのjQueryを共存して使いたい、 `$`をショートカットに使うユーティリティを同時に使用する場合などです。

```plain text
// window.jQueryやwindow.$には仮にjQuery2が入ってるものとする

<!-- ↓の読み込みとパースが終わると、window.jQueryとwindow.$はjquery3のものに置き換わっている -->
<script src="jquery3.js"></script>

<script>
// noConflictで window.jQueryはjquery3の直前に戻って、jQuery3に読み込んだjquery3が入ってきます
const jQuery3 = jQuery.noConflict(true);

(function ($) {
    // おまじないの書き方。この中で書く$はjQuery3で使える
})(jQuery3);

// ここで書く$はjquery3よりも上で読み込んでいた$として使える
</script>

```

### jQueryのfnはprototypeのエイリアス

上記のような感じでバージョンが見られます。fnは何かというと、prototypeのエイリアスです。prototypeにはjQueryオブジェクトが使うメソッドが入っています。

つまり、要素が入ったjQueryオブジェクトで呼んでも結果が得られます

[jQuery.fn のfnってどういう意味? $.fnの使い方[jQuery] - D-NET](https://forsmile.jp/javascript/1610/)

## ECMAScript

### ECMAScript(ES)はJSの規格

ECMAScript（以下ES）はEcma Internationalという情報分野の国際的な標準化団体が定めたプログラムの仕様です。ESの仕様に基づいて各社が実装したものがJSで、JSはESの基本仕様に加えてブラウザ関係の機能なども実装されています。

いわばESが親、JSは子・・・とは言うものの、ESはそもそもJSを元に作られたそうなので、そう単純でもないのかも。

ちなみに今はなき、Flashで使われたActionScriptもES準拠の言語です。

### 対応状況はブラウザによってまちまち、変換が主流

モダンブラウザはESにかなり対応していて、普通にブラウザ上のJSで使えるものも多くなっています。

とはいうものの.vueのような単一コンポーネントファイルや、Reactで使うJSXのように素のjsでないものが含まれることも多いので、実際はESを使ったコードを書く → ViteやbabelなどNode.js系のシステムで変換・ビルドして使われるのが主流かと思います。

ただ、シンプルなアロー関数や分割代入みたいな記法は、ブラウザ上のJSだけでも十分普及しているものと思われます。

### ESのバージョンと対応内容など

ここに一覧があります。西暦とバージョン番号の2種類の略称があります。ES2015はES6と同じで、ES2016はES7と同じ。（出来れば ES2015 = ES5 みたいに末尾が揃っていてくれたら分かりやすかった）

バージョンごとに追加された主な機能は以下の通りです。

- ES2015(ES6) 
    - クラス、モジュール、アロー関数、テンプレート文字列、let、const、デフォルト引数、Promise、分割代入、可変長引数
- ES2017(ES8) 
    - 非同期関数 (async/await)
- ES2018(ES9) 
    - オブジェクトに対するスプレッド構文、非同期イテレーション、Promise.prototype.finally、正規表現への機能追加
- ES2020(ES11) 
    - オプショナルチェイニング演算子?.、Null合体演算子??

### スプレッド構文

`...` ドット三つのスプレッド構文で、配列やオブジェクトの要素を全て展開できるようになりました。
 配列やオブジェクトのコピーなどで使ったりします。

```plain text
// 元のオブジェクトをコピー＆要素追加の例
const obj = {a: 1, b: 2, c: 3};
const obj2 = { ...obj };       // コピー
const obj3 = { ...obj, d: 4 }; // 要素追加しつつコピー

```

[スプレッド構文 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)[JavaScript operator: Spread syntax (...) | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/mdn-javascript_operators_spread)

### アロー関数

以前よりfunctionを短く書けるようになりました。

```plain text
// 従来の関数
function (a) {
  return a + 100;
}

// アロー関数に段階的に分解

// 1. function を削除、引数と本体の { の間に =>を配置する
(a) => {
  return a + 100;
}

// 2. 本体の {} と "return" を削除（returnは暗黙でされる）
(a) => a + 100;

// 3. 引数の括弧を削除
a => a + 100;

```

引数が0個の場合には引数にカッコ()が必要だったり、本体の処理が2行以上になる場合は {} と returnを削除できないなど、ルールはあります。

どこまで省略するかは文化やルールによると思いますが、アロー関数は一般的になった印象です。

### オブジェクトのプロパティ省略記法

オブジェクトの `キー` と `値にする変数名` が同じとき、`キー: 値` と書かずに `キー` と書けます。

```plain text
let name = 'kom',
    tags = {hobby: 'sake'};

// ちょっと冗長
let obj = {
  name: name,
  tags: tags,
}

// 省略してシンプルに
let obj = {
  name,
  tags,
}

```

### オブジェクトのメソッド省略記法

オブジェクトのメソッド定義で、functionキーワードを使わずに省略できます

```plain text
// 普通に
var counter = {
  count: 0,
  increment: function() {
    this.count++;
  }
};

// 省略記法 => ":" と "function" を省略
var counter = {
  count: 0,
  increment() {
    this.count++;
  }
};

// アロー関数を使うとthisの意味が変わるのでこれはNG
var counter = {
  count: 0,
  increment: () => {
    this.count++;
  }
};

```

[ES6オブジェクトリテラルの拡張 - Qiita](https://qiita.com/dondoko-susumu/items/aa79159d137c39251060)

### 分割代入

今まで配列やオブジェクトのデータを変数に代入したり、引数に渡すときはまるごと渡すしかなかったものを、一部の中身だけ渡せるようになりました。

```plain text
// 配列の場合
const info = ['Kom', 41];

// 今まで
const greeting = function (info) {
    console.log(`Hi, ${info[0]}! I'm ${info[1]}.`);
}
greeting(info);

// あるいは呼び出すときに個別に
const greeting = function (name, age) {
    console.log(`Hi, ${name}! I'm ${age}.`);
}
greeting(info[0], info[1]);

// 分割代入
const greeting = function ([name, age]) {
    console.log(`Hi, ${name}! I'm ${age}.`);
}
greeting(info);

```

```plain text
// オブジェクトの場合
const info = {
    name: 'Kom',
    age: 41,
};

// 今まで
const greeting = function (info) {
    console.log(`Hi, ${info.name}! I'm ${info.age}.`);
}
greeting(info);

// あるいは呼び出すときに個別に
const greeting = function (name, age) {
    console.log(`Hi, ${name}! I'm ${age}.`);
}
greeting(info.name, info.age);

// 分割代入
const greeting = function ({name, age}) {
    console.log(`Hi, ${name}! I'm ${age}.`);
}
greeting(info);

```

[分割代入](https://ja.javascript.info/destructuring-assignment)

### 関数のデフォルト引数

関数の引数にデフォルト値を持たせることができます

```plain text
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5, 2)); // 10

console.log(multiply(5)); // 5

```

### Promise

Promiseオブジェクトは、非同期処理の完了や失敗の結果と、その結果の値を表すことができるオブジェクトです。Promiseを使うことで、コールバックのネストではない書き方ができるようになりました。

（Promiseはかなり込み入った説明になるのでこの程度に・・）

```plain text
// コールバックネスト地獄の例
$.get(url1, function (res) {
    $.get(url2 + '/' + res.id, function (res2) {
        $.get(url3 + '/' + res2.id, function (res3) {
            // など
        })
    })
})

// Promiseチェーン
fetch(url1)
    .then(response => response.json())
    .then(res => {
        return fetch(url2 + '/' + res.id)
    })
    .then(response2 => response2.json())
    .then(res2 => {
        return fetch(url3 + '/' + res2.id)
    })
    ...

```

[Promise - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)[Promise と async/await の理解度をもう1段階上げる - Qiita](https://qiita.com/sotszk/items/f23199e864cba47455ce)

### クラス

JSでもクラスが使えます。試しに下記のコードをChromeのコンソールで実行すると、Hello, Edgeが出力されます

```plain text
class Browser {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log('Hello, ' + this.name);
    }
}

var edge = new Browser('Edge');
console.log(edge.greet()); // Hello, Edge

```

### モジュール

別ファイルのJSを取り込むことが出来ます。
 PHPでいうとuseのようなイメージです。

exportでモジュールを提供して、importで他のファイルを読み込みます。

```plain text
// sample-alert.js で sayMessageをエクスポート
export function sayMessage(message) {
  alert(message);
}

// index.jsで他ファイルの sayMessageをインポート
import { sayMessage } from "./sample-alert.js";
sayMessage("こんにちは世界");

```

### 非同期関数 (async/await) でPromiseをさらに簡単に

asyncとawaitキーワードを使うと、thenとcatchのメソッドチェーンですらなく、一連の処理のように書けます。
 内部的にはPromiseを使っており、async/awaitは単純にPromiseのシンタックスシュガーです。

```plain text
async function fetchData() {
    const res1 = await fetch(url1)
        .then(response => response.json());
    const res2 = await fetch(url2 + '/' + res.id)
        .then(response => response.json());
    const res3 = await fetch(url3 + '/' + res2.id)
        .then(response => response.json());
    ...
}
fetchData();

```

### オプショナルチェイニング演算子?.

nullやundefinedのものに `.`でプロパティ呼び出しをするとエラーになるので、nullでないことを確認しないとオブジェクトチェーンは呼び出せませんでしたが、nullやundefinedの場合はundefinedで終了してくれるオプショナルチェイニング演算子 `?.` が追加されました。

```plain text
const obj = {
    dog: {
        name: 'pochi',
    },
};

obj.dog.name // 'pochi'
obj.cat.name // catがundefinedなのでerror

// 今まではobj.catが存在することをチェックする必要があった
console.log(obj.cat && obj.cat.name); // あれば　obj.cat.name なければ obj.cat

// オプショナルチェイニングを使うと同等のことを短くかける
obj.cat?.name // undefined

```

[オプショナルチェーン (?.) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

### Null合体演算子??

今まで値がfalsy(false扱いの値)の場合は、右辺の値を返すというのは `||` で出来ていた
 この場合0や''空文字などもfalsyなため、右辺が表示された。
 Null合体演算子の場合、nullish(nullとundefined)の場合のみ右辺が表示される違いがある。

```plain text
console.log(val || val2); // valがfalsyならval2が表示される

console.log(val ?? val2); // valがnullishならval2が表示される

```

## まとめ

どうでしょう・・・知らないトピックは一つでもあったでしょうか？

普段よく触っていても、調べ始めると案外なあなあで対処していたことがあると気付かされました（今回もいくつか初めて知ったものがあります）

知らなくても結構対処できますが、知っていれば対応に役立つことも多いと思うので、ぜひ色々とサーフィンしてみてください！

![[image-qiitan_for_login_modal-014e085d3e40a240e3fe8d61b70b29a9.png]]

Register as a new user and use Qiita more conveniently

1. You get articles that match your needs
2. You can efficiently read back useful information

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fkomlabo%2Fitems%2F3f14c8990a2f94fb5323&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fkomlabo%2Fitems%2F3f14c8990a2f94fb5323&realm=qiita)

Comments