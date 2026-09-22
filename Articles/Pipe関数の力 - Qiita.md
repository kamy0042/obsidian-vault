---
プロパティ: ""
Created: 2021-01-15T20:46:00
Tags: [topic/技術/関数型プログラミング]
---
Javascriptで役に立つ関数型プログラミングというシリーズを始めます。

今回は、関数型プログラミングの中心的な概念、**関数合成**について書こうと思います。
関数合成とは〜という学術的な話をするとキリがないので、例を見ていきましょう:

Copied!

`const addFive = num => num + 5;
const double = num => num * 2;
const addFiveAndDouble = num => double(addFive(num));`

`addFiveAndDouble`は`addFive`と`double`を合成した関数になります。タスクによっては、二つ以上の関数を合成することが多いと思います。しかしそうなると、コードが以下のように読みづらくなります:

Copied!

`const result = countLikes(pickLongest(excludeCommentsByAuthor(getTodayComments(post))));`

関数のネーミング関係なく、カッコが多くて長い表現になってしまいます。

ここに、`pipe`関数が登場します！

## Pipeで関数合成

Javascriptでは、`pipe`を以下のように定義できます。

Copied!

`// わかりやすくするためにあえてfunctionを使います
function pipe(...fns) {
  return function(arg) {
    return fns.reduce((val, fn) => fn(val), arg);
  }
}`

上記の長すぎる表現は`pipe`を使えばもっと簡潔に書けます:

Copied!

`const result = pipe(
  getTodayComments,
  excludeCommentsByAuthor,
  pickLongest,
  countLikes
)(post);`

行う処理も、上が最初で下が最後、人間にとって自然な流れになっています。もちろん左から右に書いても構わないです。[Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)の仕組みがわかる前提で書いてますが、自分で`reduce`を定義してみると、`pipe`もわかりやすくなると思います:

Copied!

`function reduce(list, fn, startVal) {
  let acc, startIdx;
  if (arguments.length == 3) {
    acc = startVal;
    startIdx = 0;
  } else {
    acc = list[0];
    startIdx = 1;
  } 
  for (let i = startIdx; i < list.length; i++) {
    acc = fn(acc, list[i]);
  }
  return acc;
}`

もちろん、`pipe`をワンラインで定義したければ、できます:

Copied!

`const pipe = (...fns) => arg => fns.reduce((x, f) => f(x), arg);`

`pipe`の定義を見ればわかりますが、関数の配列`fns`はクロージャによって、アクセス可能なので、`pipe`に関数の配列だけ与えると、その配列を覚えた合成関数が返ってきます。最初に挙げた例に戻ると、たとえば投稿のコメントを処理する合成関数を以下のように作り、再利用できます:

Copied!

`const processPostComments = pipe(
  getTodayComments,
  excludeCommentsByAuthor,
  pickLongest,
  countLikes
);
// ...
// コードのどこかで
fetch(postUrl)
.then(response => response.json())
.then(processPostComments);`

## おまけに

ちなみに、関数型言語と言われる言語には、合成のために演算子があって、非常に便利です。
Haskellではこういう書き方ができます:

Copied!

`processPostComments = countLikes . pickLongest . excludeCommentsByAuthor . getTodayComments`

Javascriptには合成演算子はないですが、将来導入される[可能性](https://github.com/tc39/proposal-pipeline-operator)があります。もしそうなれば以下のような書き方ができるようになります:

Copied!

`let result = post
  |> getTodayComments
  |> excludeCommentsByAuthor
  |> pickLongest
  |> countLikes;`

以上、`pipe`の話でした。