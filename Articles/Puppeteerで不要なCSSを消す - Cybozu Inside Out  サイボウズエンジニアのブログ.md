---

Tags: [topic/技術/NodeJS]
---
こんにちは。フロントエンドエキスパートチームの穴井（[@pirosikick](https://twitter.com/pirosikick)）です。福岡在住で、普段は福岡のweworkで働いています。他のメンバーは皆、東京に居てリモートで仕事をしていますが、モブでわいわい開発していますし、weworkが快適すぎて、毎日楽しいです！

フロントエンドエキスパートチームでは、サイボウズの各プロダクトが抱えるWebフロントエンドの課題を解決するのが仕事の一つです。

[blog.cybozu.io](https://blog.cybozu.io/entry/2019/08/05/190000)

最近の取り組みとして、Puppeteerで不要なCSSを消した事例を紹介します。

このブログは、6/19に福岡で開催した「[Google I/O '19のWebをまとめる会](https://mentaico-js.connpass.com/event/132416/)」で登壇したときの内容を詳細に説明しつつ、アップデートした部分もあるので、発表見たぞ、スライド見たぞという方も見ていただけますと幸いです。

[speakerdeck.com](https://speakerdeck.com/pirosikick/puppeteerdeiranaicsswoxiao-su)

## きっかけ

とあるプロダクトのCSSをstyled-componentsに移行していたのですが、その中の一つのCSSファイルが、

- 1万行ある
- どこで使われているのか不明なスタイルが多くある
- 大量のセレクタに対してスタイルを当てているルールが多くあり移行作業のコストが高い

など、多くの課題を抱えており、どうやって移行すればよいのかと頭を抱えていました。そんな時、たまたま観た[Google I/O '19のPuppeteerに関するセッション](https://www.youtube.com/watch?v=MbnATLCuKI4)でCSSのカバレッジを取得できることを知り、「この機能を使って不要なCSSを洗い出せば、ちょっとは楽ができるのでは？」と思ったのがきっかけです。

結果はあまり期待せずPuppeteerを使い始めたのですが、結果として1万行あったCSSファイルは7%くらいしか使われていないことが判明し、想定よりも大幅に不要なスタイルを削除できました。そのかいあって、styled-componentsへの移行作業を無事終えることができました！

ここから、Puppeteerとは何か？から、取得したカバレッジをもとにCSSを削除する方法について解説していきます。

## Puppeteerとは？

[Puppeteer](https://pptr.dev/)

> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

Puppeteerは、Chromeを操作するAPIを提供するNode.jsのライブラリです。ChromeのDev Toolsのプロトコルを介して、Chromeを操作します。使い方は簡単で、`npm install puppeteer`でPuppeteerをインストールし、コードを書くだけです。

```plain text
const puppeteer = require("puppeteer");

(async () => {
  // ブラウザの起動
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Googleに移動
  await page.goto("https://google.com");
})();

```

もっと詳しく知りたい場合は[公式ドキュメント](https://pptr.dev/)もよいですが、Google I/O '19のPuppeteerのセッションがわかりやすいのでおすすめです。

[www.youtube.com](https://www.youtube.com/watch?v=MbnATLCuKI4)

## PuppeteerでCSSのカバレッジを取る

PuppeteerでCSSのカバレッジを収集するには、まず`page.coverage.startCSSCoverage()`でカバレッジの収集を開始します。`startCSSCoverage`呼び出し時のオプションで、`resetOnNavigation`を`false`にしないと、ページ遷移が発生するたびにカバレッジがリセットされてしまうので注意しましょう。その後、`page.goto(...)`などでブラウザを操作し、カバレッジを収集したいページを表示させます。収集したいページを表示し終えたら、`page.coverage.stopCSSCoverage()`でカバレッジの収集を終わります。`stopCSSCoverage`は、`startCSSCoverage`呼び出しから`stopCSSCoverage`呼び出しまでに収集したカバレッジを返します。

```plain text
// カバレッジ収集を開始
await page.coverage.startCSSCoverage({
  // ページ遷移のたびにカバレッジがリセットされるのを防ぐ
  resetOnNavigation: false
});

// ブラウザを操作しカバレッジを収集したいページを表示する
await page.goto('…');
…


// カバレッジ収集を終了
// startCSSCoverageからstopCSSCoverageまでの間に収集したカバレッジを返す
const coverage = await page.coverage.stopCSSCoverage();

```

ちなみに、JavaScriptのカバレッジは`page.coverage.startJSCoverage()`, `page.coverage.stopJSCoverage()`で同様に取得できます。

## カバレッジを視覚的に確認する

収集したカバレッジを視覚的に確認するには、[puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul)でカバレッジを[istanbul](https://istanbul.js.org/)のフォーマットで出力し、istanbulのCLIツールである[nyc](https://github.com/istanbuljs/nyc)でレポートを出力します。

```plain text
# puppeteer-to-istanbulのインストール
$ npm install --save puppeteer-to-istanbul
```

```plain text
const puppeteer = require('puppeteer');
const ptoi = require('puppeteer-to-istanbul');

…割愛…

// カバレッジを収集
const coverage = await page.coverage.stopCSSCoverage();
// カバレッジをistanbul形式に変換＆.nyc_output以下に出力
ptoi.write(coverage);

```

```plain text
# HTML形式でレポートを出力
$ npx nyc report --reporter=html

# ブラウザで表示する（macの場合）
$ open coverage/index.html
```

HTML形式で出力した場合、以下のようなレポートが出力されます。赤く表示されている部分がカバレッジがない部分です。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815173330.png)

HTML形式のカバレッジレポート

## 取ったカバレッジを元にCSSから不要な部分を削除する

`page.coverage.stopCSSCoverage()`が返すカバレッジ情報は以下のような構造になっています。

```plain text
[
  {
    url: "ファイルのURL",
    text: "ファイルの中身",
    ranges: [
      { start: "カバレッジ開始位置", end: "カバレッジ終了位置" },
      { start: "カバレッジ開始位置", end: "カバレッジ終了位置" },
      …
    ]
  },
  …
]

```

よって、以下のように`range`を元に`text`からカバレッジがあるコードのみ抜き出せば、使われていないコードが除外されたCSSを生成できそうな感じがします。

```plain text
const coverage = await page.coverage.stopCoverage();

const coolCSS = coverage.map(({ url, text, ranges }) => {
  // rangesを元に使われているCSSだけを抜き出す
  const css = ranges
    .map(({ start, end }) => text.substring(start, end))
    .join("");

  return { url, css };
});

console.log("I got cool css!", coolCss);

```

が、この方法にはいくつか落とし穴があります。

### 落とし穴 ①: `@font-face`にカバレッジが発生しない

Puppeteerの出力するカバレッジには、`@font-face { … }`のカバレッジが発生しません。よって、カバレッジからCSS中の`@font-face {…}`が必要なものなのか判断することができません。そのため、表示崩れを防ぐためには、`@font-face`は、消さずに常に残す必要があります。

ちなみに、PuppeteerのGithub に[この挙動に関する issue](https://github.com/GoogleChrome/puppeteer/issues/4324)が登録されていますが、開発チームから反応がなく、現時点では仕様なのかバグなのかはわかりません。

### 落とし穴 ②: `@media`にカバレッジが発生しない

`@media`を使うとスタイルが適応される条件を定義できます。レスポンシブ対応でお馴染みの記法です。

```plain text
/* 引用元: http://www.tohoho-web.com/css/rule/media.htm */
/* 幅が 767px 以下であれば */
@media (max-width: 767px) {
  ...;
}

/* 幅が 768px 以上であれば */
@media (min-width: 768px) {
  ...;
}

/* 幅が 768px以上 1200px以下であれば */
@media (min-width: 768px) and (max-width: 1200px) {
  ...;
}

/* カラーディスプレイまたはモノクロ印刷であれば */
@media screen and (color), print and (monochrome) {
  ...;
}

```

Puppeteerでは、`@media … { … }`内のスタイルはカバレッジが発生しますが、開始の`@media … {`と終了の`}`にカバレッジが発生しません。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815173536.png)

@media{}にカバレッジが発生しない

よって、中身のスタイルにカバレッジがある`@media`だけ消さずに残すというやや複雑な処理が必要です。

## AST を使ってコードを抜き出す

このような落とし穴があるため、最初に紹介した方法（カバレッジを元にsubstring関数を使って必要なCSSだけを抜き出す）では、必要なCSSまで削除されてしまいます。また、落とし穴②を文字列ベースで解決しようとすると、なかなか複雑な処理を書く必要があります。そこでおすすめなのが、ASTを使って処理する方法です。

### ASTとは？

ASTとはAbstract Syntax Treeの略で、日本語でいうと抽象構文木で、ソースコードを木構造で表現したものです。Webフロントエンドでは欠かせないツールになっているBabelやwebpack、TypeScriptなども内部でASTを利用しており、WebフロントエンドにおいてASTはだいぶ馴染み深いものになっているのではないでしょうか？CSSだと[PostCSS](https://postcss.org/)が有名なので、PostCSSのASTを使って説明していきます。以下のCSSをPostCSSでASTに変換すると図のような木構造になります。

```plain text
@media screen and (min-width: 480px) {
  body {
    background-color: lightgreen;
  }
}

#main {
  border: 1px solid black;
}

ul li {
  padding: 5px;
}

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815173634.png)

ASTのイメージ図

[AST Explorer](https://astexplorer.net/)を使うと、ソースコードがどのようなASTに変換されるかリアルタイムかつ視覚的に確認することができます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815173749.png)

AST explorer

ASTを使ってソースコードを編集する利点は、シンタックスエラーを含むソースコードを生成する可能性がないことと、編集するロジックがシンプルになる点です。
ソースコードを文字列として扱って編集した場合、編集するロジックに誤りがあるとシンタックスエラーになるようなソースコードが生成される恐れがあります。一方、ASTに変換して編集すれば、ASTからソースコードに戻すときにエラーになるのでシンタックスエラーになるようなコードは生成されません。また、編集のロジックもシンプルになります。例えば、上記のCSSで「\#mainのスタイルを消したい」という場合は、図の真ん中のRuleを木構造から削除するだけです。

PostCSSが出力するASTは、実際にはJSのオブジェクトで表現されます。ASTの木構造への追加・削除などの操作は、各オブジェクトに関数が定義されています。では、PostCSSのASTを使って、カバレッジのないスタイルを削除するコードを解説していきます。

### 0. PostCSSのインストール

まず、PostCSSをnpmでインストールします。

```plain text
# PostCSSのインストール
# 適宜--saveや--save-devを付ける
$ npm install postcss
```

### 1. CSSからASTを生成する

CSSのソースコードからASTを生成します。`postcss.parser`関数にCSSを文字列で渡すと、ASTのRoot（木構造の根）を返します。ちなみに、渡したCSSにシンタックスエラーがあるとエラーを投げます。

```plain text
const postcss = require("postcss");

/**
 * PuppeteerのCSSカバレッジから不要なスタイルを削除したCSSを生成
 *
 * @param {Object} coverage - stopCSSCoverageが返す配列の要素
 */
const removeUnusedCSS = coverage => {
  // CSSからASTを生成
  const root = postcss.parser(coverage.text);
  …
};

```

### 2. ASTを探索して削除対象のノードを見つける

次に、rootに生えているwalk関数を使って木構造を探索し、削除対象のノードを見つけます。

```plain text
// ASTの探索
root.walk(node => {
  // 削除対象か？
  if (isNodeUnneeded(node)) {
      // 削除対象ならASTから削除する
      node.remove();
  }
});

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815173851.png)

root.walk()のイメージ図

### 3. ノードが削除対象か判定する

ノードが削除対象か判定する`isNodeUnneeded`関数を実装します。ノードを削除するかは以下のような条件です。コメントを削除するかは好みですが、今回は「さらなる高みへ：使われていないセレクタ記述も除去する」の章で必要になるのでそのまま残します。PuppeteerのCSSのカバレッジはルール単位にしか発生しないので、Declarationも削除対象とせず、無視します。その他のノードに関しては、カバレッジの有無を判断して決めます。

- 以下のノードは削除しない
- Root
- `@font-face`（落とし穴①）
- コメント
- Declaration
- その他のノードは、カバレッジがあれば削除しない

ノードの種類は`node.type`で取得でき、Rootの場合は`"root"`、 コメントの場合は`"comment"`という感じで文字列が入っています。ノードが`@font-face`かどうかは、`node.type`が`"atrule"`で、`node.name`が`"font-face"`かで判定します。

```plain text
// ノードが削除対象か判定
const isNodeUnneeded = (node, coverage) => {
  // Root, Comment, Declarationは削除しない
  if (['root', 'comment', 'decl'].includes(node.type)) {
    return false;
  }

  // @font-faceは削除しない
  if (node.type === 'atrule' && node.name === 'font-face') {
    return false;
  }

  // その他：カバレッジが無ければ削除
  …
};

```

ノードのカバレッジ有無は、ノードのソースコード上の位置がカバレッジの範囲に存在するかで判定します。ノードのソースコード上の位置は`node.source`から取得します（①）。`node.source.start`が開始位置、`node.source.end`が終了位置です。
`node.source`は行番号・列番号、`coverage.ranges`は文字列位置になっており、そのまま比較できないため、`node.source`を文字列位置に変換します（②）。
あとは、`node.source`と範囲が被っている要素が`coverage.ranges`内にあるか探します（③）。`isNodeUnneeded`関数なので、カバレッジが無ければtrueを返しています。

```plain text
  …
  // その他：カバレッジが無ければ削除

  // ①ノードのソース上での開始・終了位置（行列番号）
  const { start, end } = node.source;
  // ②行列番号を文字列位置（0 ~ ソースコード文字列.length - 1）に変換
  const startIndex = lineColumnToIndex(coverage, start.line, start.column);
  const endIndex = lineColumnToIndex(coverage, end.line, end.column);

  // ③ノードのソースコード上の範囲を含むカバレッジを探す
  const covered = coverage.ranges.find(
    range => !(startIndex >= range.end || endIndex < range.start)
  );

  // カバレッジが見つかれなければ、trueを返す
  return typeof covered === "undefined"
}

```

### 4. ASTからソースコードを生成する

1~3の処理で、ASTから不要なノードがなくなりました。最後に処理後のASTからCSSを生成します。ASTからCSSを生成するには、`root.toString()`を実行します。

```plain text
// 不要なノードが削除されたASTからCSSを生成
return root.toString();
```

ちなみに、Root以外のノードも`toString()`を実行すると、そのノードが表すソースコードを返します。

コードの完全版は以下に置いています。割愛した`lineColumnToIndex`関数の実装など、見てみたい場合はこちらからどうぞ。

[removeUnusedCSS.js](https://gist.github.com/pirosikick/45ec70cc625b0fce8e66546d9dda4b8f)

## さらなる高みへ：使われていないセレクタ記述も除去する

PuppeteerのCSSのカバレッジは、CSSのルールごとに発生します。

```plain text
/* ルール = セレクタ（h1）＋宣言ブロック（color: red;…）*/
h1 {
    color: red;
    font-size: 12px;
}

```

例えば、以下のようなh1〜h6にスタイルを宣言しているルールがあるときに、実際にはh1しか使われていない場合でも、ルール全体にカバレッジが発生します。

```plain text
/* 実際にはh1しか使われていない場合でも、ルール全体にカバレッジが発生 */
h1, h2, h3, h4, h5, h6 {
  ...
}

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815173950.png)

使われていないセレクタがあってもルールごとにカバレッジが発生する

今回、対応を行ったCSSには以下のような多くのセレクタを指定しているルールがいくつもありました。このままではカバレッジをもとにCSSを削除した後にstyled-componentsにスタイルを移すとき、セレクタが使われているか精査する手間が発生し大変です。

```plain text
/* 実際にあったセレクタがいっぱいあるルールの一例 */
.btn, .btn-danger.active, .btn-danger:active, .btn-default.active, .btn-default:active, .btn-info.active, .btn-info:active, .btn-primary.active, .btn-primary:active, .btn-warning.active, .btn-warning:active, .btn.active, .btn:active, .dropdown-menu>.disabled>a:focus, .dropdown-menu>.disabled>a:hover, .form-control, .navbar-toggle, .open>.dropdown-toggle.btn-danger, .open>.dropdown-toggle.btn-default, .open>.dropdown-toggle.btn-info, .open>.dropdown-toggle.btn-primary, .open>.dropdown-toggle.btn-warning {
  …;
}

```

使われていないセレクタも削除できるように一工夫しましたので、紹介します。

### 1. ルールを各セレクタごとに定義する

Puppeteerがルールごとにしかカバレッジを出せない部分は変更できないので、ルールに複数のセレクタがある場合に各セレクタごとにルールを定義するようにCSSを変換しました。言葉だとわかりづらいと思うので、変換前後で説明すると、変換前がさきほどのh1〜h6に対するルールが一つある場合、h1~h6それぞれにルールを定義するようにCSSを変換しました。h1〜h6の場合、同じ宣言ブロックをもつルールが6個できるということです。また、手順3で必要なので、変換後のコードの前後の行に目印として`/* flatten-start */`、`/* flatten-end */`を付けます。

```plain text
/* 変換前 */
h1, h2, h3, h4, h5, h6 {
  …
}

/* 変換後 */
/* flatten-start */
h1 {
  …
}
h2 {
  …
}
…h3, h4, h5は割愛…
h6 {
  …
}
/* flatten-end */

```

こちらの作業もpostcssを使って、実装しました。

```plain text
/**
 * flatten.js
 *
 * ## before
 * a, b, c { … }
 *
 * ## after:
 * a { … }
 * b { … }
 * c { … }
 */
const fs = require("fs");
const postcss = require("postcss");

const filePath = process.argv[2];
if (typeof filePath !== "string") {
  console.log("USAGE: node flatten.js path");
  process.exit(1);
}

const css = fs.readFileSync(filePath).toString();
const root = postcss.parse(css);

root.walkRules(node => {
  // セレクタが一つしかないルールは無視
  if (node.selectors.length === 1) {
    return;
  }
  // ルールのセレクタごとにルールを作る
  const rules = node.selectors.map(selector =>
    postcss.rule({ selector, nodes: node.nodes })
  );
  // 作成したルールと目印コメントを挿入
  node.after([
    postcss.comment({ text: "flatten-start" }),
    ...rules,
    postcss.comment({ text: "flatten-end" })
  ]);
  // 元のルールを削除
  node.remove();
});

console.log(root.toString());

```

```plain text
# 実行
$ node flatten.js app.css > flatten.app.css
```

### 2. 1のCSSのカバレッジを出し、不要なCSSを削除

1の作業で生成したCSSでカバレッジを取ると、使われているセレクタ・使われていないセレクタが分かります。`h1, h2, h3, h4, h5, h6 {…}`のようなルールで、実際はh1しか使われていなかった場合、以下のようなカバレッジになります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815174052.png)

flatten.js実行後のCSSで取ったカバレッジ

取ったカバレッジを元にCSSを削除すると、使われているセレクタのルールだけが残ります。

### 3. セレクタごとに分解したルールを元に戻す

1で本来一つのルールがセレクタごとに分解された状態になっているので、元に戻します。1で付けた目印（`/* flatten-start */`、`/* flatten-end */`）の間に定義しているルールを一つにまとめます。

```plain text
/**
 * deflatten.js
 */
// …ファイルからCSSを文字列で読み込む処理はflatten.jsと全く同じなので割愛…

const root = postcss.parse(css);

// コメントのノードを探索
root.walkComments(node => {
  // /* flatten-start */
  if (node.text.match(/flatten-start/)) {
    const selectors = [];
    let nodes;
    let current = node.next();
    // /* flatten-end */を見つけるまで探索
    while (!(current.type === "comment" && current.text.match(/flatten-end/))) {
      // セレクタと宣言ブロックを収集
      selectors.push(current.selector);
      nodes = current.nodes;

      const prev = current;
      current = current.next();
      prev.remove(); // 分解したルールは削除
    }

    if (selectors.length) {
      // セレクタをまとめたルールを作成・挿入
      node.after(postcss.rule({ selectors, nodes }));
    }

    // 目印コメントは削除
    node.remove();
    current.remove();
  }
});

console.log(root.toString());

```

この作業を行った後の差分の一部のスクリーンショットです。多くのセレクタがあるルールでも実際に利用している2~3個だったりして、多くのセレクタを削除できました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/cybozuinsideout/20190815/20190815174142.png)

実際の対応前後の差分

## おわり

Puppeteerのカバレッジ収集機能を使って、CSSを削除する事例を紹介しました。今回はページの表示パターンが少ないプロダクトだったので楽でしたが、ページ数・表示パターンが多い場合は特定のページに絞ってカバレッジを取るとうまくいきそうな予感がします。
また、Puppeteerのカバレッジ収集機能はGoogle I/O '19の動画を観て知ったので、これからもチームでWebフロントエンドの探究活動を行いつつ、プロダクトをどんどん改善していきたいです。

## PR

9月26日（木）に福岡でCybozu Meetupを開催します。フロントエンドエキスパートチームはもちろん、生産性向上チームや、Kintoneなどのプロダクトチームも福岡に集結します。イベントページは8月中にサイボウズのconnpassにて公開予定です。福岡のエンジニアの皆さんとわいわい技術の話ができるのを楽しみにしております！

[cybozu.connpass.com](https://cybozu.connpass.com/)

### 変更履歴

### 2020/04/07

以下のコードに誤りがあったので修正しました。

```plain text
  // ③ノードのソースコード上の範囲を含むカバレッジを探す
  const covered = coverage.ranges.find(
-    range => !(startIndex => range.end || endIndex < range.start)
+    range => !(startIndex >= range.end || endIndex < range.start)
  );

```