---
プロパティ: ""
Created: 2021-01-15T20:46:00
Tags: [topic/技術/関数型プログラミング]
---
# Functional JavaScript(関数型言語としてのJavaScript)

JavaScriptでは関数型言語の一部の機能が備わっています。

ここでは小難しい話は抜きにして、より可読性やメンテナンス性などをよくするために、
実践的なJavaScriptの関数型について考えていきます。

# 関数型の特徴

JSでの実装のみを知りたい場合は、
この項を飛ばして、へどうぞ。

関数型言語では関数でプログラムを組みます。
特徴としては

- 変数は再代入禁止である
- 関数は参照透過性が保たれている(副作用がない)

があります。

しかし、前者の「変数の再代入禁止」は縛りとして強すぎるので、
JSでの実装においてはそこまで重視しません。
ただ再代入が少ない程、可読性はあがりやすいです。

後者の「参照透過性」とは、
「引数が同じであれば何回その関数を実行しても結果が変わらない」ことをいいます。

後者の参照透過性を気をつける事により、
よりよい実装が目指せます。

【関数型言語】

静的
動的




純粋関数型言語
Clean, Haskell, Miranda
Lazy K


非純粋関数型言語
ML, OCaml, Scala, F#
Erlang, LISP

【他キーワード】

- 第一級関数(高階関数が扱える)
- カリー化(部分適用)
- 型推論

# 気をつけるべきは三点

JavaScriptで関数型を考えるにあたっては、
抑えるべきポイントは下記三点となります。

- すべての関数が値を返す
- 関数に副作用がない（参照透過）
- 関数を値として扱える

関数型として気をつけることはほかにもあるのですが、
入門として今回は扱いません。

# すべての関数が値を返す

関数がすべての値を返すようにします。

`// Good
function hello() {
  return 'Hello'
}
console.log(hello()); // Hello

// Bad
function hello() {
  console.log('Hello');
}
hello();// Hello`

これによりその返り値を利用し、さらに関数を組み立てていきます。

# 関数に副作用がない（参照透過）

簡単に考えると、下記２点となります

- 関数は外側の変数を変更しない
- 参照渡しの引数の値を変更しない

下記は関数は外側の変数を変更しないの例です。
そもそも外側の変数は変更しないだけでなく、極力利用しないほうがいいです。

`// Good 副作用がない
var z = 2;
function add(x, y) {
  return x + y;
}
console.log(add(z, 3)); // 5
console.log(add(z, 3)); // 5

// Bad　副作用がある
var z = 2;
function add(x, y) {
  z = x + y;
  return z;
}
console.log(add(z, 3)) // 5
console.log(add(z, 3)) // 8`

次に参照渡しの引数の値を変更しないの例です。

`// Good 副作用がない
var arr = [1, 2, 3];
function double(arr) {
  var _arr = [];
  for(var i = 0; i < arr.length; i++) {
    _arr.push(arr[i] * 2);
  }
  return _arr;
}
console.log(double(arr)); // [2, 4, 6]
console.log(double(arr)); // [2, 4, 6]

// Bad　副作用がある
var arr = [1, 2, 3];
function double(arr) {
  for(var i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
  }
  return arr;
}
console.log(double(arr)); // [2, 4, 6]
console.log(double(arr)); // [4, 8, 12]`

Goodでは、新しく配列を作りそこに一つずつ二倍した値をいれていっています。

しかし、Badでは二倍した要素を再び参照渡しで送られてきた配列にいれてしまっています。
それでは外側の値に変更が生じてしまい、副作用ありの関数となってしまいます。

ここでは説明のためにあえて二つに分けたのですが、
本当は一つ目の「関数は外側の変数を変更しない」で集約されますね。

# 関数が値として扱える

関数が値として扱えるので引数に関数を渡して処理を委譲、
もしくは、関数を返り値として処理を委譲する事もできます。

これらの関数を高階関数と言います。

`function calc(cal) {
  return cal(3, 2);
}

function add(x, y) {
  return x + y;
}
console.log(calc(add)); // 5

function sub(x, y) {
  return x - y;
}
console.log(calc(sub)); // 1`

足し算のaddや引き算のsubをcalc関数に渡して、
処理を委譲しています。

次にクロージャによる返り値として関数を返す例です。

`function human() {
  var name = 'Haru39';
  return function() {
    return name;
  }
}
var sayName = human();
console.log(sayName()); // Haru39`

関数を返り値として処理を委譲しています。

さらにクロージャにより、カプセル化が実現できます。
クロージャがわからない方はこちらの記事へどうぞ。[JavaScriptでクロージャ入門](http://qiita.com/Haru39/items/4975031faf6f7baf077a)

# まとめ

ポイントは三点。

- すべての関数が値を返す
- 関数に副作用がない(参照透過)
- 関数を値として扱える

注意点として、純粋関数型言語のように再代入ができないなどを考えると、
非常に非効率的な実装となってしまいます。
ループがfor文ではなく再帰を使用したりなど。

しかし、for文をラップして使用する事は非常にメリットがあります。
そういった関数型を支援するライブラリとして、Underscore.jsがあります。

さらにカリー化などを用いて、関数でプログラムを組んでいくこともある程度は可能です。
カリー化はまた紹介します。

# 外部アカウント

技術情報のみつぶやくアカウント作成しました。JavaScriptは最新情報も追っていきます。[Twitterはこちら](https://twitter.com/takeharumikami)[Feedlyのフォローはこちら](http://cloud.feedly.com/#subscription%2Ffeed%2Fhttp%3A%2F%2Fqiita.com%2Ftakeharu%2Ffeed)

# おすすめの記事

もういい時期です。そろそろ始めましょう。ECMAScript6。[もうはじめよう、ES6~ECMAScript6の基本構文まとめ(JavaScript)](http://qiita.com/takeharu/items/cbbe017bbdd120015ca0)

関数型プログラミングを強力に後押しするライブラリ、Underscore.jsとlodashとは。[JavaScriptで関数型プログラミングを強力に後押しするUnderscore.jsのおすすめメソッド12選(lodashもあるよ)](http://qiita.com/takeharu/items/7d4ead780710c627172e)

JavaScriptでは関数はすべてクロージャ。[そもそもクロージャって？JavaScriptでクロージャ入門](http://qiita.com/takeharu/items/4975031faf6f7baf077a)