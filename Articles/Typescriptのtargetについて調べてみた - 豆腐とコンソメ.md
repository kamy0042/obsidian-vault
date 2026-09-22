---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
Typescriptでは、`tsconfig.json`で`target`を指定できる。`target`には、ES5だったり、ES6、ES2016と、ECMAScriptのバージョンを指定できる。

これは、TypescriptをコンパイルしてJavascriptに変換したときに、どのECMSScriptのバージョンにするかを指定できるオプション。

普段は、`babel`を使ってトランスパイルをしているんだけど、Typescriptであれば、`babel`を使う必要はなくなるんだと思う。

※とはいえ、既存の`babel`を使ったプロジェクトにTypescriptを導入する際など、共存する方法はあるみたいだけれども。

さて、この素晴らしい`target`の機能だが試しに使ってみると、Typescriptに書くECMAScriptはどのバージョンでもいいんだっけ？とか、`target`にES5を指定したら、Promiseでもなんでもどんとこいなの？とかいろんな疑問がでてくる。

ということで調べてみることにした。

## 結論

- Typescriptは`target`に指定されたバージョンにあわせて、コードをトランスパイルしてくれる。
- トランスパイルしてくれるのは、アロー関数だったり、クラス構文といった言語機能が対象となる。
- Promiseなどの新しく定義されたオブジェクトや、既存のオブジェクトにメソッドが追加される場合の新しい機能(ランタイム機能)などはpolyfillを自分で追加する必要がある。
- とはいえ、Typescriptに使いたいpolyfillを教えてあげないと、そんなオブジェクトorメソッドなんて知らねえと、コンパイル時に怒られるので、`lib`オプションに使いたいpolyfillを教えてあげることが必要。
- Promiseはちょっとややこしい。

※以下のstackoverflowの回答から言語系機能と、ランタイム機能という表現を引用しました。[https://stackoverflow.com/questions/51043439/using-latest-javascript-features-in-typescript-such-as-es2018](https://stackoverflow.com/questions/51043439/using-latest-javascript-features-in-typescript-such-as-es2018)

言語系機能とランタイム機能って具体的にどういうことよ、と思ったのですが、試しにコードをトランスパイルする機能を自分で作成することを想像するとちょっと腑に落ちた気がした。
Classだったり、アロー関数とかは構文解析することで、ES5の文法規則に乗っ取ってないからトランスパイルしなきゃ！ということはできそうな気がする。これが言語機能。
一方、オブジェクトにメソッドが存在しているかどうかは、実行される環境がそもそもそのオブジェクトが用意されているか等は実行時じゃないと判別がつかない。これがランタイム機能。
だから実行する環境を知っている作者が、個別にpolyfillを設定してねってことだと思う。

### polyfillを試してみる

環境は以下の通り、Node.jsを使うことにする。

```plain text
$ node -v
v10.15.0

```

```plain text
$ yarn tsc --version
Version 3.6.3
```

ここでは、ES2019で追加された`Array.flat`をTypescriptで使ってみるとどうなるかを見てみる。

ちなみに、`Array.flat`は自分の環境の`v10.15.0`では、そのまま使えない。

[node.green](https://node.green/)

### ES2019

まずは素直に`target`にES2019を指定する。

**tsconfig.json**

```plain text
{
  "compilerOptions": {
    // 使うJSのバージョン
    "target": "ES2019" ,
  },
}

```

この状態で以下のコードをコンパイルしてみる。

**index.ts**

```plain text
[[1, 2], 3, 4].flat()

```

コンパイルすると、以下のコードが生成される。

**コンパイル後**

```plain text
// なにもかわってない
[[1, 2], 3, 4].flat()

```

このコードをNode.jsで実行すると

```plain text
[[1, 2], 3, 4].flat();
               ^
TypeError: [[1,2],3,4].flat is not a function

```

`flat`というメソッドは存在していないので、そんな関数はないよと実行エラーになる。

### ES2018

次に、`flat`が存在しないES2018を指定してコンパイルをしてみる。

**tsconfig.json**

```plain text
{
  "compilerOptions": {
    // 使うJSのバージョン
    "target": "ES2018" ,
  },
}

```

こうすると、Arrayに`flat`なんてメソッドはないよってコンパイルエラーになる。

ここで試しに、`lib`に設定を加えArrayに`flat`があるんだよとTSに教えあげることにする。

**tsconfig.json**

```plain text
{
  "compilerOptions": {
    // 使うJSのバージョン
    "target": "ES2018" ,
    // flatの定義があるライブラリを指定
     "lib": ["es2019.array"],
  },
}

```

指定できる`lib`は、追加したtypescriptのディレクトリ`lib`配下で直接確認できる。

ちなみに`lib`のデフォルト値は、`target`によってかわるみたい。

[www.typescriptlang.org](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

> For --target ES5: DOM,ES5,ScriptHost

`lib`の設定をした後コンパイルを行うと、コンパイルが通った。
とはいえ、これはTypescriptに`flat`っていうメソッドがあるんだよと教えただけなので、コンパイル後のコードは以下の通りなんの変化もなくNode.jsで実行すると実行時エラーになる。

**コンパイル後**

```plain text
// コードはそのまま
[[1, 2], 3, 4].flat()

```

### polyfillを使う

ということで、polyfillを設定を行う。

pollyfillを提供してくれる`core-js`を追加して読み込む。

```plain text
$ yarn add --dev core-js@3
```

**index.ts**

```plain text
import "core-js"
[[1, 2], 3, 4].flat()

```

これをコンパイルすると、polyfillの定義が追加され、`flat`を使うことができた。**コンパイル後**

```plain text
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
[[1, 2], 3, 4].flat();
```

### 不思議なPromise

当初は`flat`ではなくPromiseを使って`target`をes5にして試していたんだけど、不思議とこれはコンパイルエラーにならない。

targetがes5だから、libには`DOM,ES5,ScriptHost`が指定されているはず。
ES5の仕様にPromiseはないはずなのに、なぜ、、、
と混乱を極めていたのですが、`lib.es5.d.ts`を覗いてみると、なんと、Promiseが定義されているじゃありませんか。

なぜ、`lib.es5.d.ts`にPromiseがあるんだろうかは、こちらのissueが上がっていました。[https://github.com/microsoft/TypeScript/issues/16132](https://github.com/microsoft/TypeScript/issues/16132)

が、明確な理由がわからず。誰か教えてください。