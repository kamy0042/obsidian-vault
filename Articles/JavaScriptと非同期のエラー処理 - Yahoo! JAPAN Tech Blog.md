---
Created: 2021-09-10T23:07:00
URL: https://techblog.yahoo.co.jp/programming/javascript_error/
Tags: [topic/技術/JavaScript]
---
Yahoo!デベロッパーネットワークの中野(@Hiraku)です。[前回のコールバック地獄に関する記事](https://techblog.yahoo.co.jp/programming/js_callback/)では、複雑な入れ子になりやすい非同期処理でも、GeneratorやjQuery.Deferredを使うことで、同期的な見た目に変形できることを示しました。

ところで、非同期処理においてはもう一つ「 **エラー処理に例外が使えない** 」という問題があります。今回はエラー処理について考えてみたいと思います。

非同期処理の話の前に、一度「例外」についておさらいしておきましょう。JavaScriptに限らず、エラーと言えばよく例外を使って記述されます。

「Web APIから500が返ってきた」とか「入力された値が期待する型でない」など、何かエラーが発生したことを例外としてthrowし、どこかでまとめてtry ～ catchブロックで囲って処理するという形です。なお、JavaScriptはthrowできる型に制限がないので、文字列であってもthrowできます。

```plain text
try {
  a();
} catch (e) {
  console.log(e);
  console.log('エラーから回復しました');
}

function a() {
  b();
}

function b() {
  c();
}

function c() {
  throw 'エラーが発生しました！';
}

/*
'エラーが発生しました!'
'エラーから回復しました'
…と出力される
*/

```

throwされた例外はtry～catchでトラップされない限り、関数呼び出しの上位に伝播していきます。一切try～catchに出会わなければ、処理系が停止します。

上記のコードで言えば、例外はc()→b()→a()とさかのぼっていき、最後に見つかったtry～catchで処理されます。

![[normal_exception.png]]

この挙動によって、「エラーを後ろの方でまとめて処理できる」「ライブラリ利用者にエラー処理の記述を強制できる」など、便利な効果があります。

この「 **例外は、関数の呼び出し履歴（コールスタック）をさかのぼって伝播していく** 」という点が後で重要になりますので、覚えておいてください。

問題は非同期処理の場合です。今回も非同期処理を行う関数の例としてsetTimeout()を使いますが、AjaxでWeb APIにリクエストするなど、他の関数でもあてはまります。

呼び出しから1秒後に例外が発生する、以下のような処理があるとします。

```plain text
setTimeout(function(){
  throw 'エラーが発生しました!';
}, 1000);

```

これをtry～catchで囲って、例外をcatchできるでしょうか？

```plain text
// try～catchで囲ってみた

try {
  setTimeout(function(){
    throw 'エラーが発生しました！';
  }, 1000);

} catch (e) {
  console.log(e);
  console.log('エラーから回復しました');
}

```

残念ながら、これは動きません。例外はcatchされず処理系が止まってしまいます。

先ほど「例外は、関数の呼び出し履歴（コールスタック）をさかのぼって伝播していく」と書きました。コールバックスタイルの非同期処理では、書いた場所から関数を呼んだことになりません。例外をthrowする関数は、このtry～catchの中では単に定義されただけです。実際に関数を実行するのはタイマーイベントによってであり、try内で例外が発生したことにならないため、例外が捕捉できないのです。

![[async_exception.png]]

こんな風に、非同期処理が挟まると（実質的に）try ～ catch構文が使えません。もちろん、finallyも使えなくなります。

上記の例であればまだミスに気付けますが、setTimeoutの部分を関数にまとめてしまったりすると、なぜ例外が捕捉できないのかわかりにくくなります。

```plain text
//こんな風に書きたい！！
try {
  asyncDoSomething(); //非同期な関数
  asyncDoSomething(); //非同期な関数
} catch (e) {
  //...
}

// これだと、asyncDoSomething()がthrowする例外は決してcatchされない

```

では、この課題をどう解決すればいいでしょうか？

まずは、あくまで例外を使う方法を模索してみます。

あらかじめtry～catch込みでコールバックを定義しておけば、例外が使えます。

```plain text
setTimeout(function(){
  try {
    //...
    throw 'エラーが発生しました!';
    //...
  } catch (e) {
    console.log(e);
    console.log('エラーから回復しました');
  }
}, 1000);

```

しかしこれだと「似たようなエラーはまとめて処理できる」というメリットが活かせません。何度もtry～catchブロックを書くことになってしまいます。

ライブラリ内でAOP(アスペクト指向プログラミング)風の拡張ポイントを置けば多少は改善されます。try～catchだけ関数に切り出しておいて、その関数をまとめて編み込むようにできれば、try～catchを書くのは一回で済みます。

AOPはJavaなどで柔軟性を持たせるために使うテクニックですが、JavaScriptのようなもともと柔軟すぎる言語では特にライブラリも必要なく、簡単に実現できます。

```plain text
/**
 * 例外処理を編み込む関数。
 * try～catchを共通化できる
 */
function errorHandle(process) {
  return function(){
    try {
      return process.apply(this, arguments);

    } catch (e) {
      console.log(e);
      console.log('エラーから復帰しました');
    }
  };
}

///使い方///////////////////
// errorHandle() で例外が発生するかもしれないコールバックを囲むだけ。

setTimeout(errorHandle(function(){
  throw 'エラーが発生しました!';
}), 1000);

setTimeout(errorHandle(function(){
  throw 'エラーが発生しました!';
}), 2000);

//↑両方のsetTimeoutで例外はトラップされる

```

ただ、もともとのtry～catchの書き方と変わってしまいますし、あまり綺麗ではありません。

各種フロー制御のライブラリに目を向けると、エラー処理に例外を使うことを諦めているものも多くあります。例外を使うことにこだわるのは、なかなか難しいようです。

ここまでは現在のJavaScriptの話です。実は将来、Generatorが導入されることによってこの問題は解決する可能性があります。

[http://wiki.ecmascript.org/doku.php?id=harmony:generators](http://wiki.ecmascript.org/doku.php?id=harmony%3Agenerators)

次期JavaScriptで取り込まれるであろうGeneratorですが、前回記事で非同期処理ととても相性がいいことを示しました。おさらいすると、

- Generatorを使うと、関数の処理を一時停止したり、再開したりできる
- 「処理が終わったらGeneratorの処理を再開させる」という風に非同期処理の関数を作っておく
- 非同期の関数呼び出しと同時にGeneratorの処理を一時停止することで、複数の関数に分けるしかなかった部分を一気に書くことができる

というものです。今回もFirefox版の実装で例を示します。

```plain text
/**
 * sleep
 * setTimeout()をGeneratorから使いやすくした関数。
 *
 * @param {number} ms ミリ秒
 * @param {Generator} thread 処理が終わったら処理再開するジェネレーターオブジェクト
 */
function sleep(ms, thread) {
  return setTimeout(function(){
    try {
      thread.next();
    } catch (e) {
      if (! e instanceof StopIteration) thread.throw(e);
    }
  }, ms);
}

```

```plain text
//上記のsleep()を使うと非同期処理がこんな風に書ける！同期っぽい見た目！

var thread = (function(){

  console.log(0);

  yield sleep(1000, thread);

  console.log(1);

  yield sleep(1000, thread);

  console.log(2);

})();
thread.next();

/*
 '0'を表示
 (一秒待つ)
 '1'を表示
 (一秒待つ)
 '2'を表示
…という挙動
 */

```

さて、これまで散々「非同期処理では例外が使えない」と書いてきましたが、実はGenerator内ではtry～catchが使えます。Generatorがあれば「例外が使えないため困る」という問題自体、なかったことにできます。

たとえば、指定時間待った後に例外をthrowするsleepAndErrorという関数（実用的なコードではありませんが…）があるとしましょう。

```plain text
function sleepAndError(ms, thread) {
  return setTimeout(function(){
    thread.throw('エラーが起きました');
  }, ms);
}

```

throwの代わりに、Generatorオブジェクトが持つ.throw()というメソッドを使うと、非同期関数内ではなく、yieldの位置から例外がthrowされたことにできます。単純にthrow文を使ってしまうと、相変わらず例外を捕捉できないのでご注意ください。

```plain text
var thread = (function(){
  try {
    console.log(0);

    yield sleepAndError(1000, thread); //ここで例外が発生する!

    console.log(1);

    yield sleepAndError(1000, thread);

    console.log(2);

  } catch (e) {
    console.log(e);
    console.log('エラーから回復しました');
  }
})();
thread.next();
/*
'0'を表示して、
1秒待って、
'エラーが起きました'を表示して
'エラーから回復しました'を表示する
 */

```

…わかりにくいので図にしてみましょう。

![[generator_exception.png]]

throwメソッドはその場では例外を発生させません。一度Generatorの処理を再開してから例外をthrowします。例外がGeneratorの内部で発生したことになるため、伝播の方向が"見た目通り"になります。

他の構文ではちょっと真似できない機能ですね。

Generatorはその名称も相まって正当に評価されていないようにも見えますが、実体はコルーチンの一種であり、様々な応用があるので、使い道を考えてみるとおもしろいでしょう。

- Generatorが導入されれば、非同期処理でも例外が使いやすくなる
- ただ、現状では非同期処理でエラーを扱うなら、例外は使いにくい。無理に使っても例外のメリットが活きてこない

例外処理の問題について書くだけで終わってしまいましたので、jQuery.Deferredの話はまた別の機会に解説を書ければと思います。