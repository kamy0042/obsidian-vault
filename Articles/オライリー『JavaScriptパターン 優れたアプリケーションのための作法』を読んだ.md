---
Created: 2021-01-15T20:25:00
URL: https://noah.plus/blog/019/
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
ちょっと放置気味だったが図書館への返却期限が近いので読み切った。返却日駆動読書、アリだと思います。

以下、印象的な部分についてまとめた。

## ・必須パターン

### 単独varパターン

`var a = 1,
	b = 2,
	sum = a + b;`

関数の先頭に全ての変数宣言をまとめる。
本書では一貫してこのパターンが採用されている。先頭にまとめることで、変数宣言の巻き上げによる混乱を避けられる。
ただ `const` と `let` に別れたES6以降ではあんまり見かけない気がする。

### forループ

`var myArray = [0, 1, 2, 3, 4, 5];


for (var i = 0; i < myArray.length; i++) {
    
}


for (var i = 0, max = myArray.length; i < max; i++) {
    
}`

for文の継続条件を `i < myArray.length` としてしまうとループの度に配列の `length` プロパティにアクセスするので非効率的。`length` を毎回取得せずに、ローカル変数にキャッシュしておくべき。これを怠ったがためにパフォーマンスがガタ落ちしたというような話が[プログラマが知るべき97のこと](https://amzn.to/2xIEs1S)にも書いてあった気がする。

### parseInt()による数値変換

`var month = "09";


parseInt(month);


parseInt(month, 10);`

ES3では、0から始まる文字列は8進数として扱われていたらしい。その場合、`month` の”09”という値は8進数として妥当ではないため、`parseInt("09")`の戻り値は0になってしまう。

現在ではそのようなことにはならず、`parseInt("09")`はちゃんと整数値の9を返す。しかし想定外のバグを回避するためにも、基数を指定しておくが吉。

MDNのドキュメントにも以下のように書かれている

> 第1引数のstringが「0」で始まるときは、第2引数のradixは8(8進法)または10(10進法)とされます。厳密には、基数がどちらになるかは実装によります。ECMAScript 5 の仕様では10(10進法)です。ただし、まだすべてのブラウザがサポートしている訳ではありません。したがって、parseInt()関数を使うとき基数は必ず与えてください

[https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/parseInt](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

## ・リテラルとコンストラクタ

わざわざ組み込みコンストラクタを使わずに、リテラル記法やプリミティブで書く。これに尽きる。

`var o = new Object();
var a = new Array();
var s = new String();


var o = {};
var a = [];
var s = "";`

## ・関数

### 自己定義関数

`var sayYeah = function () {
    console.log("Yeah!");
    sayYeah = function () {
        console.log("Double Yeah!");
    }
}

sayYeah(); 
sayYeah();`

このパターンは「遅延関数定義」とも呼ばれる。一度きりの初期化作業が必要な場合に便利。2回目以降、初期化作業部分がなくなるのでパフォーマンス向上に役立つ。

ただし、自己定義関数を代入する変数の名前（上の例でいう`var sayYeah`）が関数内部にある関数名（`sayYeah`）と一致している必要がある。一致していないと、関数の再定義がうまく機能しないので注意。

### 即時オブジェクト初期化

`({
    first: "John",
    last: "Doe",
    getFullName: function () {
        return this.first + " " + this.last
    }

    
    init: function () {
        console.log(getFullName());
        
    }
}).init();`

1度きりの初期化作業を、名前空間を汚さずに実行できる。このパターンでは初期化手続き全体に構造を持たせることができるので、複雑な初期化処理がある場合に有用。

### 関数プロパティによるメモ化パターン

`var myFunc = function (param) {
    if (!myFunc.cache[param]) {
        var result = {};
        

        
        myFunc.cache[param] = result;
    }
    return myFunc.cache[cache];
}`

関数の結果をキャッシュすることをメモ化（memoization）という。時間のかかる重い処理を毎回行わず、キャッシュをそのまま返すので大幅なパフォーマンス向上が図れる。

### 設定オブジェクト

`function addPerson(first, last, displayName, gender, address, dob) {...}


function addPerson(config) {...}

var config = {
    first: "",
    last: "",
    displayName: ""
};
addPerson(config);`

関数の引数を冗長に書き連ねるのではなく、一つの設定オブジェクトにまとめる。設定オブジェクトのおかげで、パラメータの順序を気にしなくてもよく、パラメータの追加や削除が簡単になる。

ES6環境では分割代入やデフォルト引数などが使えるため、このパターンの優位性がより強化されている。「設定オブジェクト」パターンをさらに拡張したパターンとして、ROROパターンというのが提唱されている。Receive an object, return an object (RORO) という名前の通り、引数としてオブジェクトを取り、戻り値としてオブジェクトを返す、というパターンで面白い。

[Elegant patterns in modern JavaScript: RORO](https://medium.freecodecamp.org/elegant-patterns-in-modern-javascript-roro-be01e7669cbd)

### カリー化

`function add(x, y) {
    
    if (typeof y === "undefined") {
        return function(y) {
            return x + y;
        };
    }

    
    return x + y;
}

add(3, 4); 
add(3)(4); 

var add2000 = add(2000);
add2000(18); 
add2000(20);`

関数の引数を一部分だけ渡し、渡されなかった残りが引数になる新しい関数を生成する。
カリー化のカリーは Haskell Curry さんのカリー。関数を呼び出すのではなく、関数を**適用していく**イメージ。

同じ関数をほとんど同じ引数で繰り返し使用している場合、関数をカリー化することでコードをスッキリさせられる。

## ・オブジェクト作成のパターン

### プライベートメンバ

`function Gadget() {
    var name = "iPhone";
    this.getName = function() {
        return name;
    }
}
var toy = new Gadget();

console.log(toy.name); 
console.log(toy.getName());`

クロージャを使えばプライベートなメンバを実現できる。上の例では特権メソッド `getName()` 経由でないとプライベートメンバ `name` にはアクセスできない。

ただし、このやり方でオブジェクト型のプライベートメンバを作ってしまうと、外部からオブジェクトの書き換えが可能になってしまうので注意。オブジェクトは参照渡しなので、その参照経由でプライベートメンバにアクセスされてしまう。

ES6環境でプライベートメンバ（的なこと）をやりたいときは Symbol を使う。

[ES6 class での private プロパティの定義](https://qiita.com/k_ui/items/889ec276fc04b1448674)

### 連鎖パターン

`var obj = {
    value: 1,
    increment: function() {
        this.value += 1;
        return this;
    },
    add: function(v) {
        this.value += v;
        return this;
    },
    shout: function() {
        alert(this.value);
    }
};


obj.increment().add(3).shout();`

メソッドの戻り値として `this` を返すことで、メソッドを数珠つなぎに呼び出すことができる。よく見る形だが、とっても納得した。

## ・デザインパターン

本書の山場だが、この部分だけで無限にブログ記事が書けそうなので今回は割愛。別の記事にする。

- シングルトン
- ファクトリ
- イテレータ
- デコレータ
- ストラテジー
- ファサード
- プロキシ
- メディエータ
- オブザーバ

## おわりに

この本は2011年に出版され、内容がES3・ES5に準拠して書かれているためやや古く感じる部分もある。また、開発環境もbrowserifyやwebpackが出てくる前なので、「グローバルな名前空間を絶対汚染しない！」という執念がひしひしと伝わってきて時代を感じる。

現在ではあまり使われなくなったパターンもあるが、JavaScript特有の仕様を活用したハックが目白押し。勉強になる部分が多かったので読んで良かった。