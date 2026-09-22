---
タグ: []
作成日時: 2024-03-07T16:56:00
URL: https://numb86-tech.hatenablog.com/entry/2019/06/28/220736
Tags: [topic/デザインシステム/配信基盤]
---
![[1552392850810796 3.bin]]

TypeScript で書いたプログラムを npm パッケージとして配布する手順を書いていく。

まだ npm パッケージの配布をしたことがない人を、想定読者としている。

よりよい書き方、詳細な設定、は措いておき、まずは最低限の要件を満たすものを作り上げる。

今回の「最低限の要件」は以下。

- `npm install`や`yarn add`でインストールできる
- `import`でも`require`でもインポートすることが出来る
- 型定義ファイルを同梱し、TypeScript アプリにもスムーズに導入できる

`require`（`CommonJS`）にも対応させるかどうかはライブラリの性質によって異なると思うが、今回は対応する。

npm パッケージに限らず、粗削りでいいから最初から最後まで動くものをまずは作り、あとから必要に応じて勉強や調査をすればいいと思っている（セキュリティやコンプライアンスに関わることは除く）。今回もその方針でいく。

この記事で利用しているライブラリのバージョンは以下。

- `npm@6.2.0`
- `typescript@3.5.2`
- `@types/node@12.0.10`
- `dayjs@1.8.14`

## TypeScript の設定とプログラムの作成

何はともあれプログラムを作らないと、配布も何もない。

今回は、`YYYY-MM-DD`形式の文字列を渡すと、その日付の曜日を英語で返すプログラムを作る。

といっても、主な処理はライブラリに任せてしまい、自分ではほとんどコードを書かないが。

まず、パッケージの名前を決めておく。既に存在するパッケージの名前は利用できないので、使いたい名前が既に使われていないかどうか[公式サイト](https://www.npmjs.com/)で検索して確かめておく。

今回は実際には公開しないので何でもよいが、`day-of-week`にする。

次に TypeScript をインストール。

```plain text
$ yarn add typescript
```

次に TypeScript の設定ファイルである`tsconfig.json`を作成。

あとで追加する項目もあるが、取り敢えずは以下の内容で進める。

```plain text
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es2018"],
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist/",
    "sourceMap": true
  },
  "include": [
    "src"
  ]
}

```

TypeScript については自分も初心者なので、詳しい説明は避ける。

`src/`の中身をコンパイルして`dist/`に出力すること、出力後のコードは`es5`で動くものであること。

それさえ把握しておけば、この記事を読み進めるのに問題はないはず。

`dist/`はコンパイルしたコードを置くだけなので、`.gitignore`に追加して Git の管理から外しておく。

今回は Node.js 環境でも使えるライブラリにするので、型定義ファイル`@types/node`をインストールしておく。

```plain text
$ yarn add @types/node
```

他に、依存ライブラリとして`dayjs`をインストール。

```plain text
$ yarn add -D dayjs
```

実は今回のケースでは`-D`オプションは付けてはいけないのだが、説明の都合上、敢えてこうしている。後で修正するので、そのときに説明する。

下準備が出来たので`src/`以下にコードを書いていく。

以下の内容で`src/index.ts`を作る。

```plain text
import dayjs from 'dayjs';

const DayOfWeek = (date: string): string => dayjs(date).format('dddd');

export default DayOfWeek;

```

これで完成したので、以降は、パッケージとしての形を整えるための作業になる。

まずはコンパイル。

`$ yarn run tsc`でコンパイルできるので実行すると、`dist/index.js`と`dist/index.js.map`が生成されている。

この内容でも動作はするのだが、せっかく TypeScript で作ったのだから、型定義ファイルも同梱させておきたい。そうすることで、TypeScript アプリの開発者がこのパッケージをインポートしたときに、型情報も自動的にインポートされるようになる。

`tsconfig.json`に`declaration`を追加すると、コンパイル時に型定義ファイルも作られるようになる。

```plain text
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -6,6 +6,7 @@
     "strict": true,
     "esModuleInterop": true,
     "outDir": "./dist/",
+    "declaration": true,
     "sourceMap": true
   },
   "include": [

```

再度コンパイルすると、以下の内容の`dist/index.d.ts`も生成された。

```plain text
declare const DayOfWeek: (date: string) => string;
export default DayOfWeek;

```

これで、配布したいプログラムを`dist/`に生成できるようになった。

あとは、それを npm パッケージとして配布するための作業をすればよい。

## package.json

パッケージの配布においては、`package.json`の記述内容が重要になる。

ライブラリをインストールした時点で`package.json`作成され、以下の内容になっているはず。

```plain text
{
  "dependencies": {
    "@types/node": "^12.0.10",
    "typescript": "^3.5.2"
  },
  "devDependencies": {
    "dayjs": "^1.8.14"
  }
}

```

ここに、必要な項目を追加していく。

**name**

パッケージの名前。前述の通り、既存のパッケージと被ってはいけない。

**version**

パッケージのバージョン。`name`と`version`の組み合わせで、パッケージが一意に特定される。

**license**

パッケージのライセンスの種類を書く。

**main**

ここで指定したファイルが、パッケージをインポートしたときに読み込まれることになる。

**types**

`main`で指定したファイルに対応する型定義ファイルを、このフィールドに指定する。

**files**

パッケージとして配布したいファイルやディレクトリを、ホワイトリスト形式で記述していく。

今回の例だと、`dist/`を指定する。そうすることで、パッケージで配布する必要のない`src/`などを除外することが出来る。

`package.json`など一部のファイルは、`files`で指定した内容に影響を受けない。

[https://docs.npmjs.com/files/package.json#files](https://docs.npmjs.com/files/package.json#files)

上記以外にも様々なフィールドがあり、公式ドキュメントで確認できる。

[docs.npmjs.com](https://docs.npmjs.com/files/package.json)

完成形は以下。

```plain text
{
  "name": "day-of-week",
  "version": "1.0.0",
  "license": "MIT",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "dependencies": {
    "@types/node": "^12.0.10",
    "typescript": "^3.5.2"
  },
  "devDependencies": {
    "dayjs": "^1.8.14"
  }
}

```

これでパッケージとして配布できるようになったので、次は動作確認を行う。

## 動作確認

動作確認のために実際にパッケージを配信するわけにはいかないので、`$ npm pack`を使う。

このコマンドを使うことで、実際に配信することなくローカル環境で、パッケージとして問題なく機能するかどうか確認することが出来る。

早速実行してみる。

```plain text
$ npm pack
npm notice
npm notice 📦  day-of-week@1.0.0
npm notice === Tarball Contents ===
npm notice 282B package.json
npm notice 77B  dist/index.d.ts
npm notice 409B dist/index.js
npm notice 243B dist/index.js.map
npm notice === Tarball Details ===
npm notice name:          day-of-week
npm notice version:       1.0.0
npm notice filename:      day-of-week-1.0.0.tgz
npm notice package size:  735 B
npm notice unpacked size: 1.0 kB
npm notice shasum:        ec082bdcf157f89045c19737ec853ea3ddc47dc2
npm notice integrity:     sha512-SY1YfL2l+eG67[...]K1JoGgnMn/sHQ==
npm notice total files:   4
npm notice
day-of-week-1.0.0.tgz
```

`day-of-week-1.0.0.tgz`というファイルが作成され、`package.json`の他、`files`で指定した`dist/`が含まれていることが分かる。

この`.tgz`ファイルをパッケージとして指定してインストールすることで、動作確認が出来る。

何か適当に新しいプロジェクトを作り、試してみる。

```plain text
$ yarn add day-of-week-1.0.0.tgzのパスを指定
```

そして、動作確認用のプログラムを`index.js`として書く。

```plain text
const DayOfWeek = require('day-of-week').default;

console.log(DayOfWeek('2019-06-28'));

```

満を持して`$ node index.js`を実行、すると、エラーになる。

```plain text
$ node index.js
internal/modules/cjs/loader.js:583
    throw err;
    ^

Error: Cannot find module 'dayjs'
```

`dayjs`がないと怒られるので`yarn.lock`を確認してみると、`day-of-week`の他に`typescript`と`@types/node`は入っているが、`dayjs`が入っていない。

## 依存関係について

これは、`dayjs`をインストールする際に`$ yarn add -D dayjs`としてしまった（この説明をするためにわざとそうしたのだが）のが原因。

パッケージをインストールしたときに一緒にインストールされるのは`dependencies`に書かれているライブラリのみで、`devDependencies`はインストールされない。

なので、`dayjs`を`dependencies`にする。

```plain text
$ yarn remove dayjs
$ yarn add dayjs
```

これで修正完了。

`package.json`の`version`を`1.0.1`にした上で、`$ npm pack`を行う。

`day-of-week-1.0.1.tgz`が生成されるので、それを、動作確認用のプロジェクトでインストールする。

改めて`$ node index.js`を実行すると、今度は正しく動いた。

```plain text
$ node index.js
Friday
```

このように、開発するパッケージの依存関係には注意する必要がある。

依存関係ついては [TypeScript の公式ドキュメント](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#dependencies) にも記述がある。

簡単に動作確認できるので`require`を使ったが、`import`することも出来るし、TypeScript なら型チェックも行われる。

```plain text
import DayOfWeek from 'day-of-week';

// Friday
console.log(DayOfWeek('2019-06-28'));

// error TS2322: Type 'string' is not assignable to type 'number'.
const result: number = DayOfWeek('2019-06-28');

```

## 公開作業

無事にパッケージを作れたので、ここから先は、公開（パブリッシュ）のための作業を行っていく。

この手順通りに作業すると実際に公開されてしまうので、注意すること。

`npm scripts`に`prepublishOnly`を設定する。

このスクリプトは、パブリッシュの前に必ず実行される。なので、ビルド作業などを設定しておくとよい。

`package.json`に以下の内容を追記。

```plain text
  "scripts": {
    "prepublishOnly": ビルド作業など
  },

```

ただ、`prepublishOnly`には類似のコマンドが複数あるうえ、`npm cli`のバージョンによって挙動が異なるらしい。 実際に使う際にはよく確認しておく。

参考：[npm の prepublish と prepare の変遷 - Qiita](https://qiita.com/ndxbn/items/f0cd2b13a3268254f2aa)

パブリッシュのためには npm のアカウントが必要なので、まだ持っていない場合は作成する。

[Sign Up - npm](https://www.npmjs.com/signup)

`$ npm login`でログインする。

ログインしているかどうかは、`$ npm whoami`で確認できる。ユーザー名が表示されたら、そのユーザーでログインしている。

```plain text
$ npm whoami
ユーザー名
```

あとは、パッケージのルートディレクトリで`$ npm publish`を実行すれば、`prepublishOnly`のあとに、パブリッシュが実行される。

`$ npm install`や`$ yarn add`でそのパッケージをインストールできれば成功。

パブリッシュが終わったあとは`$ npm logout`で忘れずにログアウトしておく。

## まとめ

npm パッケージを公開すること自体はすごく簡単に出来る。

t-wada さんも、[細かすぎて伝わらない package.json 小ネタ三選](https://t-wada.hatenablog.jp/entry/nodejs-package-json-tips)という記事でこう言っている。

> Node.js のエコシステムの豊穣さは、モジュール利用者からモジュール作成者に進むためのハードルが低いことで成り立っています。このエントリを読んだ皆さんも、ぜひ npm author になってみてください。そのハードルを越えるのは、意外と難しくありません。

ということで、自分以外の誰かにも役立ちそうなプログラムを書けたときは、積極的にパッケージとして公開していこう。

## 参考資料

- [Babelで書かれたJavaScriptライブラリをTypeScriptへ移行する方法 | Web Scratch](https://efcl.info/2019/01/09/babel-to-typescript-library/)
- [npm-package.json | npm Documentation](https://docs.npmjs.com/files/package.json)

Error Boundary は React の`v16`から導入された機能で、これを使うとコンポーネント内で発生したエラーをキャッチすることが出来る。

主に、エラー用のUIを表示したり、エラーを記録したりすることに使われる。

前者には`static getDerivedStateFromError`というメソッドを、後者には`componentDidCatch`というメソッドを用いる。

Error Boundary のためのクラスコンポーネントを作り、そこにこれらのメソッドを定義して使う。

この記事では、バージョン`16.8.6`で動作確認している。

## 動作確認用のアプリの用意

以下の内容でアプリを作る。

```plain text
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Template htmlfile</title>
</head>
<body>
  <p>↓この下に React アプリが表示される↓</p>
  <div id="app"></div>
  <p>↑この上に React アプリが表示される↑</p>
</body>
</html>

```

```plain text
import React from 'react';
import ReactDOM from 'react-dom';

const AquaChild = () => (
  <div style={{backgroundColor: 'white'}}>aqua child</div>
);

const Aqua = () => (
  <div style={{backgroundColor: 'aqua', padding: '10px'}}>
    aqua
    <AquaChild />
  </div>
);
const Lime = () => <div style={{backgroundColor: 'lime'}}>lime</div>;

const App = () => (
  <>
    <Aqua />
    <Lime />
  </>
);

ReactDOM.render(<App />, document.querySelector('#app'));

```

これをビルドすると以下のようなUIを持ったアプリが出来るので、これを対象に検証していく。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20190615/20190615221816.png)

## エラー用のUIを表示させる

React は`v16`から、発生したエラーがキャッチされなかった場合、コンポーネントツリー全体をアンマウントするようになった。

[公式ドキュメントによれば](https://ja.reactjs.org/docs/error-boundaries.html#new-behavior-for-uncaught-errors)これは、壊れたUIを表示することは何も表示しないことよりも悪いことである、という考えによるもの。

試しに、先程作ったサンプルでエラーを発生させてみる。

```plain text
 const Aqua = () => (
   <div style={{backgroundColor: 'aqua', padding: '10px'}}>
-    aqua
+    aqua{x}
     <AquaChild />
   </div>
 );

```

`Aqua`のなかで`x`を参照しているが、`x`は存在しない変数なので`ReferenceError`が発生する。

この結果、アプリ全体が表示されなくなる。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20190615/20190615221856.png)

エラーが発生した`Aqua`だけでなく、`Lime`も含めたコンポーネントツリー全体がアンマウントされているのが分かる。

`static getDerivedStateFromError`を使ってエラーをキャッチすることで、ツリー全体がアンマウントされるのを防ぎ、適切なUIを表示させることが出来る。

Error Boundary を使うため、以下のコンポーネントを作成した。

```plain text
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    console.log(error instanceof Error);
    return {hasError: true};
  }

  render() {
    const {state, props} = this;
    if (state.hasError) {
      return (
        <div style={{backgroundColor: 'orange'}}>
          背景がオレンジのコンポーネントは ErrorBoundary
          によって表示されているエラー用のコンポーネントです。
        </div>
      );
    }
    return props.children;
  }
}

```

`static getDerivedStateFromError`の引数で、キャッチしたエラーオブジェクトを取得できる。

そしてこのコンポーネントで、`Aqua`と`Lime`をそれぞれラップする。

```plain text
 const App = () => (
   <>
-    <Aqua />
-    <Lime />
+    <ErrorBoundary>
+      <Aqua />
+    </ErrorBoundary>
+    <ErrorBoundary>
+      <Lime />
+    </ErrorBoundary>
   </>
 );

```

こうすることで、`Aqua`や`Lime`のなかでエラーが発生した際に、それをキャッチできる。

この状態でページを表示すると、今度は以下のようになっている。

`Aqua`で発生したエラーをキャッチしてエラー用のUIが表示されている。

その一方で、`Lime`ではエラーが発生していないので、そのまま表示されている。

このように、Error Boundary を上手く使うことでアプリ全体がクラッシュするのを防ぎ、適切なUIをユーザーに提供できるようになる。

Error Boundary の直下ではなくもっと深い階層でエラーが発生しても、問題なくキャッチできる。

```plain text
 const AquaChild = () => (
-  <div style={{backgroundColor: 'white'}}>aqua child</div>
+  <div style={{backgroundColor: 'white'}}>aqua child{x}</div>
 );

 const Aqua = () => (
   <div style={{backgroundColor: 'aqua', padding: '10px'}}>
-    aqua{x}
+    aqua
     <AquaChild />
   </div>
 );

```

`Aqua`ではなく`AquaChild`でエラーを発生させても、先程と同じ表示になる。

コンポーネントのなかでエラーが発生すると、ツリーを上に辿っていき、一番最初に到達した ErrorBoundary がエラーをキャッチする仕組みになっている。つまり、JavaScript の`catch{}`と同じような挙動である。

最後までキャッチされなかった場合は、既に述べたようにツリー全体がアンマウントされる。

Error Boundary の対象になるのは、配下のコンポーネントで発生したエラーのみ。

Error Boundary 自身のなかで発生したエラーは、キャッチすることが出来ない。

例えば以下のようにすると、キャッチできずにツリー全体がアンマウントされてしまう。

```plain text
 const AquaChild = () => (
-  <div style={{backgroundColor: 'white'}}>aqua child{x}</div>
+  <div style={{backgroundColor: 'white'}}>aqua child</div>
 );

const App = () => (
   <>
     <ErrorBoundary>
       <Aqua />
+      <div>{x}</div>
     </ErrorBoundary>
     <ErrorBoundar

```

このエラーをキャッチしたければ、`App`をラップする必要がある。

```plain text
-ReactDOM.render(<App />, document.querySelector('#app'));
+ReactDOM.render(
+  <ErrorBoundary>
+    <App />
+  </ErrorBoundary>,
+  document.querySelector('#app')
+);

```

そうすると`App`の代わりにエラー用のUIが表示されるようになる。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20190615/20190615221954.png)

## エラーを記録する

エラーをログに残したり、エラー監視サービスなどに送信したりする場合は、Error Boundary に`componentDidCatch`メソッドを定義して、そのなかで行う。

```plain text
     return {hasError: true};
   }

+  componentDidCatch(error, info) {
+    console.log(error);
+    console.log(info.componentStack);
+  }
+
   render() {
     const {state, props} =

```

第一引数で、キャッチしたエラーオブジェクトを取得できる。

第二引数の`info`は`componentStack`を持っており、ここには、エラーが発生したコンポーネントのスタックトレースが入っている。

以下は、`AquaChild`でエラーが発生した際のスタックトレース。

```plain text
    in AquaChild (at src/index.js:13)
    in div (at src/index.js:11)
    in Aqua (at src/index.js:21)
    in ErrorBoundary (at src/index.js:20)
    in App (at src/index.js:29)
```

`static getDerivedStateFromError`との違いだが、[公式のAPIリファレンス](https://ja.reactjs.org/docs/react-component.html#static-getderivedstatefromerror)によれば、`static getDerivedStateFromError`はUIの描画のために使い、副作用を扱う場合に`componentDidCatch`を使うとよいらしい。

## キャッチできないエラー

既に述べたように Error Boundary は自身のエラーをキャッチすることが出来ないが、配下のコンポーネントのエラーでもキャッチしないものが2つある。

1つ目は、イベントハンドラ内でのエラー。

以下のようにボタンを押した際にエラーが発生するようにした場合、レンダリング時にはエラーを出さないので、そのまま表示される。

```plain text
   <div style={{backgroundColor: 'aqua', padding: '10px'}}>
     aqua
     <AquaChild />
+    <button
+      type="button"
+      onClick={() => {
+        x;
+      }}
+    >
+      error button
+    </button>
   </div>

```

そしてボタンを押すとエラーが発生するのだが、このエラーはキャッチされず、表示にも影響がない。

2つ目が、非同期処理のなかでのエラー。これも、エラーはどこにもキャッチされないまま終わり、アプリはそのまま表示され続ける。

```plain text
const Aqua = () => {
  Promise.resolve().then(() => x);
  return (
    <div style={{backgroundColor: 'aqua', padding: '10px'}}>
      aqua
      <AquaChild />
    </div>
  );
};

```

## 参考資料

- [Error Boundary – React](https://ja.reactjs.org/docs/error-boundaries.html)

[SPAをフルスクラッチで作ることになり](https://numb86-tech.hatenablog.com/entry/2019/02/23/224342)、設計に対して関心が高まっていた。いきなりドメイン駆動設計は厳しいしそもそもオブジェクト指向についてよく分かっていないので、ネット上で評判がよかった本書を読んだ。

サンプルが Ruby で書かれているのも、選んだ理由。これなら読めると思った。

[gihyo.jp](https://gihyo.jp/book/2016/978-4-7741-8361-9)

非常に読みやすく、よかった。

特に、「設計」に対する変な苦手意識や劣等感を払拭すると同時に、新たな視点を得ることが出来たのがよかった。

「設計」や「オブジェクト指向」というのは、今の自分には理解できないような高尚な目的のために、自分には理解できない高度な何かを行っているものだと、思っていた。

だがそうではなかった。

まず目的。

なぜオブジェクト指向で設計するのか。

それは、「変更に強いプログラムを作る」という、きわめて実利的でシンプルな目的のため。

ちなみに、最近自分が関心を持っているドメイン駆動設計についても、その目的は[「変更しやすいソフトウェアを作ること」](https://www.slideshare.net/masuda220/ss-1376086520)にあるらしい。

当たり前の話ではあるが、オブジェクト指向設計もドメイン駆動設計も、それ自体は目的ではなく、あくまでも手段に過ぎない。

この認識を持てたのは大きい。今後どんなに難しい話が出てきても、土台にあるのは、「変更を簡単にする」というシンプルで自分にも共感できる価値。

ともすれば高名な設計を取り入れること自体が目的になってしまうが、そうではない。

そしてやっている内容についても、自分とそこまで距離を感じなかった。

単一責任は普段から意識しているし、依存性の注入にしろダックタイピングにしろ、これまでに何度も実践してきた。ただそれらを、そういった用語で呼んでいなかっただけで。

もちろん見落とすことはよくあるし、様々な制約によって理想を実装に上手く落とし込めないこともある。

それに、例えばダックタイピングなんかは、意識してそれを使っていたというより、よりよいコードを求めて改善を重ねていたら結果的にそうなったということが多い。ダックタイピングという概念を知っていることで、最初からそれを選択肢として持つことが出来る。これは他の設計パターンやテクニックにも言える。

だが、「オブジェクト指向」や「設計」はそこまで自分から遠いものではないと感じたのも事実だ。どこまで自覚的か、どこまで徹底できているかはともかく、普段からやっていることではある。本書が入門書だからなのだろうが、「設計」に対する敷居の高さを緩和することが出来た。

これは俺にセンスがあるから、ではなく、職業プログラマになりたての時に優秀なメンターに色々と教えてもらったからだと思う。

[numb86-tech.hatenablog.com](https://numb86-tech.hatenablog.com/entry/2017/08/26/095327)

そして、これが最大の収穫だが、設計に対して新たな視点を得ることが出来た。

今まで、どこかに「正解」があると思っていた。「すごいプログラマ」は一瞬でそれを見抜き実装するのだと。

だがそうではなかった。「完璧な設計」がどこかにあるのだと思っていたが、そうではなかった。

そんなものは存在しない。

そもそも、設計が終わることはない。設計は変化していく。

そして、変化が前提になっている。まず完璧なものを作って定期的に変更する、ではなく、最初から変化を前提にしている。

だから、完璧な設計はどこにも存在し得ない。設計は常に変化の「途中」である。

そして、だからこそ、変更容易性というものが非常に重要になってくる。アプリケーションは変化していくものであり、それゆえに、変更に強いものでなければならない。

何を作るべきか、というのは思っているよりも自明ではない。それを知るための情報は不足しているし、自分自身の能力不足によって先を見通せないこともある。状況も常に動いていく。

ゴールは変化していく。だから、設計が「完璧」に到達することも決してない。

そんなことを考えていたら、まさに「あとがき」にこう書かれていた。

> アプリケーションが完璧になることはありませんが、くじけてはいけません。完璧さというのは捉えがたく、おそらく到達もできないでしょう。

そして、本書の序盤に書かれてある「設計は漸進的なプロセス」「設計とは、アプリケーションの可変性を保つために技巧を凝らすことであり、完璧を目指すための行為ではない」といった言葉の意味を、理解することが出来た。

「正解」や「完璧」などないのだ、という視点を得られたのは大きい。

設計は漸進的な行為であるという視点を得られたことで、設計やプログラミングに対する考え方が大きく変わる気がしている。

`CircleCI`の`2.0`で導入された`Workflows`を使うことで、複数のジョブを実行できる。

ちなみに`CircleCI`のCLIツールでは、`Workflows`は使えない模様。

バージョン`0.1.5607+f705856`のCLIツールを使ってローカルで実行しようとしたところ、ダメだった。

`Workflows`を使うには、`.circleci/config.yml`に`workflows`セクションを追加し、`CircleCI`のバージョンのあとに`workflow`の名前を書いていく。

その`wordflow`で実行するジョブを`jobs`に書いていく。

以下の`build_and_test`は、`my_build`と`my_test`を実行する。

```plain text
version: 2
jobs:
  my_build:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "ビルドしたよ"
  my_test:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "テストしたよ"
workflows:
  version: 2
  build_and_test:
    jobs:
      - my_build
      - my_test

```

上記の記述だと、`my_build`と`my_test`をパラレルに実行する。

これを、シーケンシャルに実行する形に書き換える。今回は`my_build`の次に`my_test`を実行することにする。

ジョブに`requires`を指定すると、指定されたジョブが処理されるまで実行を待つ。

以下の例だと、`my_build`の処理が完了するまで、`my_test`は実行されない。

```plain text
version: 2
jobs:
  my_build:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "ビルドしたよ"
  my_test:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "テストしたよ"
workflows:
  version: 2
  build_and_test:
    jobs:
      - my_build
      - my_test:
            requires:
                - my_build

```

`my_build`をわざと失敗させて、確認してみる。

`& exit 1`をつけて、`my_build`が失敗するようにした。

```plain text
version: 2
jobs:
  my_build:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "ビルドしたよ" & exit 1
  my_test:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "テストしたよ"
workflows:
  version: 2
  build_and_test:
    jobs:
      - my_build
      - my_test:
            requires:
                - my_build

```

意図通り、`my_test`は実行されなかった。

そして、`requires`の指定を外してパラレルに戻すと、`my_test`は`my_build`の実行や失敗には影響されずに処理された。

最後に、ブランチによって処理を変える方法について記述する。

`filters:branches:only:ブランチ名`で、そのブランチでのみ、そのジョブを実行する。

以下は、`development`ブランチでのみ、`my_build`を処理したあとに`my_test`を実行する場合の記述。

```plain text
version: 2
jobs:
  my_build:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "ビルドしたよ"
  my_test:
    docker:
      - image: circleci/node:10.9.0
    steps:
      - run: echo "テストしたよ"
workflows:
  version: 2
  build_and_test:
    jobs:
      - my_build
      - my_test:
            filters:
                branches:
                    only: development
            requires:
                - my_build

```

## 参考資料

- [ジョブの実行を Workflow で制御する - CircleCI](https://circleci.com/docs/ja/2.0/workflows/)

TypeScript で書いている React アプリで、ユニットテストも TypeScript で書くようにするための手順。

テスティングフレームワークは`Jest`で、`React`コンポーネントのテストをしやすくするために`Enzyme`も使う。

また、アサーションライブラリとして`Power Assert`を使用する。

既に以下の記事の内容で`TypeScript`が導入済みであるという前提で話を進める。

[numb86-tech.hatenablog.com](https://numb86-tech.hatenablog.com/entry/2019/05/08/220953)

この記事で出てくるライブラリのバージョンは以下。

- jest@24.8.0
- babel-jest@24.8.0
- enzyme@3.9.0
- enzyme-adapter-react-16@1.13.2
- react-test-renderer@16.8.6
- power-assert@1.6.1
- babel-preset-power-assert@3.0.0
- typescript@3.4.5
- ts-jest@24.0.2
- @types/jest@24.0.13
- @types/enzyme@3.9.3
- eslint@5.16.0
- @typescript-eslint/parser@1.9.0
- @typescript-eslint/eslint-plugin@1.9.0

## テスト対象のコンポーネントを作る

`props`として`text`を受け取り、その値を表示するコンポーネント。`text`の型は`string`に指定している。

```plain text
import React from 'react';

type Props = {
  text: string;
};

const App: React.FC<Props> = ({text}) => <>{`Props is ${text}.`}</>;
export default App;
```

`<App text="foo" />`とすると、`Props is foo.`と表示される。このコンポーネントをテストする。

## JavaScript でテストを書く

説明を分かりやすくため、段階的に進めていく。まずは JavaScript でテストを書き、それを TypeScript に置き換えることにする。

必要なライブラリをインストールする。

```plain text
$ yarn add -D jest babel-jest enzyme enzyme-adapter-react-16 react-test-renderer
```

`Enzyme`は`v3`からアダプタが必要になり、そのための設定の記述も必須になった。

アダプタのインストールは上記で済ませているので（`enzyme-adapter-react-16`）、次は設定の記述。

テストの設定ファイルとしてルートディレクトリに`test.config.js`を作り、以下のように記述する。

これでアダプタが有効になる。

```plain text
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

```

そして`Jest`の設定ファイルとしてルートディレクトリに`jest.config.js`を作り、テスト実行時に`test.config.js`を読み込むようにする。

```plain text
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test.config.js'],
};

```

これで設定は完了。あとは`App.test.js`として以下のテストコードを書いて`$ yarn jest`を実行すると、テストが実行されて無事にパスする。

```plain text
import React from 'react';
import {shallow} from 'enzyme';
import assert from 'assert';

import App from '../App';

describe('App', () => {
  it('表示する文字列に props.text を含む', () => {
    const wrapper = shallow(<App text="hogehoge" />);
    assert(wrapper.text().includes('hogehoge'));
  });
});

```

## Power Assert の導入

`Power Assert`を導入しないならここは飛ばしてもよい。

エラーメッセージが分かりやすくなるため個人的には必ず入れているが。

必要なライブラリは以下の2つ。

```plain text
$ yarn add -D power-assert babel-preset-power-assert
```

`babel.config.js`に以下の内容を追加して、テスト実行時にのみ`babel-preset-power-assert`が有効になるようにしている。

```plain text
if (process.env.NODE_ENV === 'test') {
  presets.push(['power-assert']);
}

```

これで導入完了。試しにわざとテストを失敗させると、次のように出力される。

```plain text
  ● App › 表示する文字列に props.text を含む

    assert.equal(received, expected) or assert(received)

    Expected value to be equal to:
      true
    Received:
      false

    Message:
        # src/__tests__/App.test.js:10

      assert(wrapper.text().includes('foo'))
             |       |      |
             |       |      false
             |       "Props is hogehoge."
             ShallowWrapper{}

       8 |   it('表示する文字列に props.text を含む', () => {
       9 |     const wrapper = shallow(<App text="hogehoge" />);
    > 10 |     assert(wrapper.text().includes('foo'));
         |     ^
      11 |   });
      12 | });
      13 |
```

これで JavaScript ファイルとしてはテストコードを書けたので、次はこのコードを TypeScript に置き換える。

## TypeScript でテストコードを書き、ユニットテスト時に型チェックも行うようにする

テストファイルの拡張子を`.tsx`にする。

```plain text
$ git mv src/__tests__/App.test.js src/__tests__/App.test.tsx
```

次に、TypeScript をトランスパイルするために`ts-jest`を導入する。

インストールして、設定を記述する。

```plain text
$ yarn add -D ts-jest
```

設定については、公式サイトが分かりやすく説明している。

[kulshekhar.github.io](https://kulshekhar.github.io/ts-jest/user/config/)

JavaScript ファイルについては`babel-jest`でトランスパイルさせたいので、`preset`を`ts-jest/presets/js-with-babel`で指定する。

> ts-jest/presets/js-with-babel TypeScript files will be handled by ts-jest, and JavaScript files will be handled by babel-jest.

記述場所は`jest.config.js`。

```plain text
diff --git a/jest.config.js b/jest.config.js
index f3b8536..5f1bb3f 100644
--- a/jest.config.js
+++ b/jest.config.js
@@ -1,3 +1,4 @@
 module.exports = {
   setupFilesAfterEnv: ['<rootDir>/test.config.js'],
+  preset: 'ts-jest/presets/js-with-babel',
 };

```

最後に、`jest`と`enzyme`の型宣言ファイルをインストールする。

```plain text
$ yarn add -D @types/jest @types/enzyme
```

これで完了。

確認のため、わざと`text`に`number`を渡してテストしてみる。

```plain text
diff --git a/src/__tests__/App.test.tsx b/src/__tests__/App.test.tsx
index 52dd85b..acd1b3b 100644
--- a/src/__tests__/App.test.tsx
+++ b/src/__tests__/App.test.tsx
@@ -6,7 +6,7 @@ import App from '../App';

 describe('App', () => {
   it('表示する文字列に props.text を含む', () => {
-    const wrapper = shallow(<App text="hogehoge" />);
-    assert(wrapper.text().includes('hogehoge'));
+    const wrapper = shallow(<App text={1} />);
+    assert(wrapper.text().includes('1'));
   });
 });

```

`assert`の条件は満たしているが型が違うので、エラーを出してくれる。

```plain text
src/__tests__/App.test.tsx:9:34 - error TS2322: Type 'number' is not assignable to type 'string'.
```

## ESLint の誤検知に対応する

張り切ってテストコードに型を書いていくと、ある問題が発生する。

```plain text
diff --git a/src/__tests__/App.test.tsx b/src/__tests__/App.test.tsx
index 52dd85b..2564664 100644
--- a/src/__tests__/App.test.tsx
+++ b/src/__tests__/App.test.tsx
@@ -1,12 +1,12 @@
 import React from 'react';
-import {shallow} from 'enzyme';
+import {shallow, ShallowWrapper} from 'enzyme';
 import assert from 'assert';

 import App from '../App';

 describe('App', () => {
   it('表示する文字列に props.text を含む', () => {
-    const wrapper = shallow(<App text="hogehoge" />);
+    const wrapper: ShallowWrapper = shallow(<App text="hogehoge" />);
     assert(wrapper.text().includes('hogehoge'));
   });
 });

```

`wrapper`に対して`ShallowWrapper`という型をつけたが、そのことで ESLint がエラーを出すようになってしまった。

`no-unused-vars`が誤検知してしまっている。

```plain text
2:18  error  'ShallowWrapper' is defined but never used  no-unused-vars
```

いずれライブラリ側でこの問題が修正されるかもしれないが、この誤検知を消すのはすぐに出来るので対応する。

なお、ESLint の TypeScript 対応の基本的な設定はこちらを参照。

[numb86-tech.hatenablog.com](https://numb86-tech.hatenablog.com/entry/2019/05/09/221954)

`@typescript-eslint/eslint-plugin`が必要になるのでインストールする。

```plain text
$ yarn add -D @typescript-eslint/eslint-plugin
```

`.eslintrc`を編集。

先程インストールしたプラグインを追加して、`no-unused-vars`のルールを一度無効にして、改めて有効にしている。

```plain text
diff --git a/.eslintrc b/.eslintrc
index 09486d6..33a6430 100644
--- a/.eslintrc
+++ b/.eslintrc
@@ -1,6 +1,9 @@
 {
   "extends": "numb",
   "parser": "@typescript-eslint/parser",
+  "plugins": [
+    "@typescript-eslint"
+  ],
   "settings": {
     "import/resolver": {
       "node": {
@@ -13,5 +16,9 @@
         ]
       }
     }
+  },
+  "rules": {
+    "no-unused-vars": "off",
+    "@typescript-eslint/no-unused-vars": "error"
   }
 }

```

これで直る。

以下の記事を参考にした。

[teppeis.hatenablog.com](https://teppeis.hatenablog.com/entry/2019/02/typescript-eslint)

## Babel plugins を有効にする

`Power Assert`を導入している場合は、まだ問題がある。

テストを失敗させると分かるが、`Power Assert`が有効になっていない。

これは、Babel plugins が有効になっていないため。

設定で有効に出来るので、対応する。

これについても、公式サイトの説明が分かりやすい。

[kulshekhar.github.io](https://kulshekhar.github.io/ts-jest/user/config/babelConfig)

```plain text
diff --git a/jest.config.js b/jest.config.js
index 5f1bb3f..836c286 100644
--- a/jest.config.js
+++ b/jest.config.js
@@ -1,4 +1,9 @@
 module.exports = {
   setupFilesAfterEnv: ['<rootDir>/test.config.js'],
   preset: 'ts-jest/presets/js-with-babel',
+  globals: {
+    'ts-jest': {
+      babelConfig: true,
+    },
+  },
 };

```

## 参考資料

- [ts-jest | ts-jest is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.](https://kulshekhar.github.io/ts-jest/)
- [@typescript-eslint ことはじめ - teppeis blog](https://teppeis.hatenablog.com/entry/2019/02/typescript-eslint)

`ArrayBuffer`と`TypedArray`はバイナリデータを扱うためのオブジェクトで、ES2015で標準化された。

この記事では、これらのオブジェクトの概要について述べたあと、Node.js でバイナリファイルを読み書きする方法についても説明する。

動作確認は Node.js の`v10.9.0`で行っている。

## データとインターフェース

バイナリデータは`ArrayBuffer`オブジェクトで表現する。

`new ArrayBuffer(バイト単位のサイズ)`で`ArrayBuffer`のインスタンスを作ることが出来る。

```plain text
const buf = new ArrayBuffer(8);
console.log(buf); // ArrayBuffer { byteLength: 8 }

```

しかし、`ArrayBuffer`インスタンスの中身を見たり操作したりすることは出来ない。

インスタンス自身は何のプロパティも持たないし、プロトタイプである`ArrayBuffer`の`prototype`にも、中身を操作するプロパティはない。`byteLength`で長さを取得することくらいしか出来ない。

値は全て`0`なのだが、それを確認することも出来ない。

```plain text
const buf = new ArrayBuffer(8);
console.log(buf); // ArrayBuffer { byteLength: 8 }

console.log(buf[0]); // undefined
console.log(Object.getOwnPropertyNames(buf)); // []

console.log(Object.getPrototypeOf(buf)); // ArrayBuffer {}
console.log(Object.getOwnPropertyNames(ArrayBuffer.prototype)); // [ 'constructor', 'byteLength', 'slice' ]
console.log(Object.getPrototypeOf(ArrayBuffer.prototype)); // {}

console.log(buf.byteLength); // 8

```

バイナリデータの中身を読み書きする際には、`TypedArray`オブジェクトを使う。

例えば、`TypedArray`を継承している`Uint8Array`に`ArrayBuffer`インスタンスを渡して`Uint8Array`インスタンスを作成すると、バイナリデータの中身を操作できるようになる。

```plain text
const buf = new ArrayBuffer(8);
const ta = new Uint8Array(buf);
console.log(ta); // Uint8Array [ 0, 0, 0, 0, 0, 0, 0, 0 ]
console.log(ta[0]) // 0
ta[0] = 1;
console.log(ta[0]); // 1
console.log(ta); // Uint8Array [ 1, 0, 0, 0, 0, 0, 0, 0 ]

```

`TypedArray`を直接使うことは出来ず、`TypedArray`を継承しているオブジェクトを使う。

```plain text
TypedArray // ReferenceError: TypedArray is not defined

```

`TypedArray`を継承しているオブジェクトは`Uint8Array`以外にも複数あり、バイナリデータを配列としてどのように表現するのかが異なる。

例えば`Uint8Array`は8ビット（1バイト）ごとに符号なし整数で表現し、`Uint16Array`は16ビット（2バイト）ごとに符号なし整数で表現する。

```plain text
const buf = new ArrayBuffer(8);
const u8 = new Uint8Array(buf);
const u16 = new Uint16Array(buf);

console.log(u8); // Uint8Array [ 0, 0, 0, 0, 0, 0, 0, 0 ]
console.log(u16); // Uint16Array [ 0, 0, 0, 0 ]

```

`TypedArray`を継承しているオブジェクトの一覧は[このページ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#TypedArray_objects)で見ることが出来る。

`TypedArray`のインスタンスは`buffer`プロパティを使うことができ、コンストラクタを初期化する際に渡した`ArrayBuffer`のインスタンスを参照している。

```plain text
const typedArray = Object.getPrototypeOf(Uint8Array);
console.log(typedArray); // [Function: TypedArray]
console.log(typedArray.prototype.hasOwnProperty('buffer')); // true
console.log('buffer' in Uint8Array.prototype); // true

const buf = new ArrayBuffer(8);
const ta = new Uint8Array(buf);
console.log(ta.buffer === buf); // true

```

1つの`ArrayBuffer`に対して複数の`TypedArray`を作ることが出来るが、どの`buffer`も同じものを参照している。

そして、いずれかの`TypedArray`で行った操作の結果は、他の`TypedArray`にも反映される。

```plain text
const buf = new ArrayBuffer(8);
const arr1 = new Uint8Array(buf);
const arr2 = new Uint8Array(buf);
const arr3 = new Uint16Array(buf);

// それぞれ別の TypedArray インスタンスだが……

console.log(arr1 === arr2); // false
console.log(arr1 === arr3); // false
console.log(arr2 === arr3); // false

// 参照している ArrayBuffer は同じ

console.log(buf === arr1.buffer); // true
console.log(arr1.buffer === arr2.buffer); // true
console.log(arr1.buffer === arr3.buffer); // true
console.log(arr2.buffer === arr3.buffer); // true

console.log(arr1[0], arr2[0], arr3[0]); // 0 0 0
arr1[0] = 9;
console.log(arr1[0], arr2[0], arr3[0]); // 9 9 9

```

つまり、`TypedArray`はバイナリデータのインターフェースを作成するものであり、インターフェースが複数あったとしても操作するバイナリデータは同じであると言える。

`TypedArray`のインスタンスを作る際に数値を渡すと、その数の要素を持ったインスタンスが作られる。

```plain text
console.log(new Uint8Array(1)); // Uint8Array [ 0 ]
console.log(new Uint8Array(2)); // Uint8Array [ 0, 0 ]

```

この書き方をすると`ArrayBuffer`のインスタンスの作成を暗黙的に行う。

つまり、`new Uint8Array(1)`と`new Uint8Array(new ArrayBuffer(1))`は同じことを行っている。

```plain text
const arr1 = new Uint8Array(1);
console.log(arr1); // Uint8Array [ 0 ]

const arr2 = new Uint8Array(arr1.buffer);
console.log(arr2); // Uint8Array [ 0 ]

console.log(arr1.buffer === arr2.buffer); // true

```

## fs モジュールを使ってバイナリファイルを読み書きする

ここからは Node.js 固有の話。

以前、フロントエンドでのバイナリファイルの取り扱いについて書いたが、それの Node.js 版である。

[numb86-tech.hatenablog.com](https://numb86-tech.hatenablog.com/entry/2018/01/22/203406)

バイナリファイルの出力は単に`fs.writeFile`で`TypedArray`を書き出せばいい。

```plain text
const fs = require('fs');

const arr = new Uint8Array(4);
arr[0] = 4;
arr[1] = 3;
arr[2] = 2;
arr[3] = 1;

fs.writeFile('./foo', arr, err => {
  if (err) throw err;
  console.log('done!');
});

```

`hexdump`コマンドで確認すると、正しく出力されているのを確認できる。

```plain text
$ hexdump foo
0000000 04 03 02 01
0000004
```

ファイルの読み込みに使うのは`fs.readFile`。

テキストファイルを読み込むときは`fs.readFile(ファイルパス, エンコーディング, コールバック関数)`だが、バイナリファイルのときはエンコーディングは指定せず`fs.readFile(ファイルパス, コールバック関数)`とする。

```plain text
const fs = require('fs');

fs.readFile('./foo', (err, result) => {
  if (err) throw err;
  console.log(result); // <Buffer 04 03 02 01>
});

```

ファイルの内容をもとに`Buffer`インスタンスが作られる。

`Buffer`は`ArrayBuffer`とは別のもので、EcmaScript で定義されたものではない。そのためブラウザ環境には存在しない。

```plain text
const fs = require('fs');

fs.readFile('./foo', (err, result) => {
  if (err) throw err;
  console.log(result instanceof Buffer); // true
  console.log(result instanceof ArrayBuffer); // false
});

```

実は`Buffer`は`Uint8Array`を継承しており、そのため、値を操作することが出来る。

```plain text
const fs = require('fs');

fs.readFile('./foo', (err, result) => {
  if (err) throw err;
  console.log(result instanceof Uint8Array); // true
  console.log(result[0]); // 4
  result[0] = 9;
  console.log(result); // <Buffer 09 03 02 01>
});

```

## 参考資料

- [ArrayBuffer - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [TypedArray - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [十二章第五回 File API — JavaScript初級者から中級者になろう — uhyohyo.net](https://uhyohyo.net/javascript/12_5.html)

JavaScript で書いていたプロジェクトを TypeScript に移行する場合、アノテーションの追加やビルドの設定の他、ESLint の対応も必要になる。

この記事では、TypeScript に移行した後も引き続き ESLint を使えるようにするための手順を書いていく。

方針として、ESLint のルールは既存のものをそのまま引き継ぎ、TypeScript 用のルールは採り入れない。まずは移行を完了させてから必要に応じて適宜ルールを追加していく、という考え方。

## 前提

`eslint-config-airbnb`を使用しており、`.eslintrc`が以下の状態になっていると仮定する。

```plain text
{
  "extends": "airbnb"
}

```

## パーサーの設定

デフォルトのパーサーでは TypeScript の記法をパースできないので、`@typescript-eslint/parser`をパーサーとして設定する。

インストールして、`.eslintrc`に設定を追加する。

```plain text
$ yarn add -D @typescript-eslint/parser
```

```plain text
{
  "extends": "airbnb",
  "parser": "@typescript-eslint/parser"
}

```

これで、パースできるようになる。

## TypeScript ファイルを ESLint の対象にする

そもそもデフォルトでは`.ts`や`.tsx`は ESLint の対象ではないので、明示的に指定する必要がある。

- `-ext`を使って指定する。`src/`以下のファイルを対象にする場合は次のコマンドを実行すればよい。

yarn の場合。

```plain text
$ yarn eslint --ext .js,.jsx,.ts,.tsx src/
```

npm の場合。

```plain text
$ npx eslint --ext .js,.jsx,.ts,.tsx src/
```

## import/no-unresolved を修正する

これで TypeScript ファイルに対しても ESLint を実行できるようになったが、`import/no-unresolved`というエラーが出ているはず。

TypeScript ファイルのインポートを ESLint が解決できないことで、このエラーが発生してしまっている。

`import/resolver`を設定することで解決できる。

解決したい拡張子を指定すればよいので、次のように記述する。

```plain text
{
  "extends": "airbnb",
  "parser": "@typescript-eslint/parser",
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".json",
          ".ts",
          ".tsx"
        ]
      }
    }
  }
}

```

これで`import/no-unresolved`は解消したはず。

## VSCode の設定

エディタの自動修正を利用することで、開発効率が大幅に上がる。

TypeScript ファイルも自動修正の対象にして、コードを保存するたびに自動修正が実行されるようにしたい。

VSCode の場合は、設定ファイルに以下の内容を追加すればよい。

```plain text
    "editor.formatOnSave": false,
    "javascript.format.enable": false,
    "javascript.validate.enable": false,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        { "language": "typescript", "autoFix": true },
        { "language": "typescriptreact", "autoFix": true }
    ],

```

## 参考資料

- [typescript-eslint/README.md at master · typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/README.md)
- [@typescript-eslintでtypescriptのlintをeslintで行いつつ、airbnbの設定でいきましょう的なお話 ~ 適当な感じでプログラミングとか！](http://watanabeyu.blogspot.com/2019/02/typescript-eslinttypescriptlinteslintai.html)

最小構成のサンプルから始めて、React のビルドや Babel プラグインの利用も出来るようにしていく。

当初は`ts-loader`と`babel-loader`を組み合わせてビルドする予定だったのだが、Babel プラグインが動かなかったので断念した。[この資料](https://speakerdeck.com/mukai21/react-and-typescriptfalse-huan-jing-gou-zhu-toshi-zhuang-tips-fa7c2d52-e540-4da6-93f8-b88c8dace16e)の内容に沿って設定してもダメだった。

そのため、`babel-loader`のみでビルドすることにした。

使用しているライブラリのバージョン。

- webpack@4.30.0
- webpack-cli@3.3.2
- babel-loader@8.0.5
- @babel/core@7.4.4
- @babel/preset-env@7.4.4
- @babel/preset-typescript@7.3.3
- typescript@3.4.5
- react@16.8.6
- react-dom@16.8.6
- @types/react@16.8.17
- @types/react-dom@16.8.4
- @babel/preset-react@7.0.0
- babel-plugin-react-remove-properties@0.3.0

## 対象ファイルの作成

以下の内容の`src/index.ts`を作成する。TypeScript の拡張子は`.ts`なので注意する。

```plain text
const value: number = 1;
console.log(value);

```

`: number`という JavaScript にはない記法を使っているので、JavaScript ファイルとして実行することは出来ない。

```plain text
$ node src/index.ts
> SyntaxError: Missing initializer in const declaration
```

まずはこのシンプルな TypeScript ファイルを、JavaScript 実行エンジンが処理できる形にビルドする。

## 必要なライブラリをインストールする

`$ yarn init -y`でプロジェクトを開始して、必要なライブラリをインストールしていく。

まずは webpack。

```plain text
$ yarn add -D webpack webpack-cli
```

次に、`babel-loader`とそれを使用するためのライブラリ。

ここで入れている`@babel/preset-typescript`が、TypeScript のビルドを担う。

```plain text
$ yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-typescript
```

## 設定ファイルを作成してビルドする

`webpack.config.js`を作成。

```plain text
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  },
  module: {
    rules: [
      {test: /\.ts$/, use: ['babel-loader']}
    ],
  },
}

```

`src/index.ts`をエントリポイントとして、`dest/main.js`を出力する。

`.ts`ファイルに対して`bable-loader`を使用する。

これで、`src/index.ts`に対して`babel-loader`を実行した結果が`dest/main.js`として出力されるようになったので、あとは Babel の設定ファイルを書けばよい。

以下の内容で`babel.config.js`を作成する。

```plain text
const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        ie: '11',
        safari: '7',
      },
    },
  ],
  ['@babel/preset-typescript'],
];

const config = {
  presets,
};

module.exports = config;

```

`@babel/preset-env`の設定内容は何でもいいのだが、今回はこのような内容にした。

ビルドのための`npm scripts`を定義して、それを実行する。

```plain text
diff --git a/package.json b/package.json
index 4204881..963f549 100644
--- a/package.json
+++ b/package.json
@@ -3,6 +3,9 @@
   "version": "1.0.0",
   "main": "index.js",
   "license": "MIT",
+  "scripts": {
+    "build": "webpack --mode=production"
+  },
   "devDependencies": {
     "@babel/core": "^7.4.4",
     "@babel/preset-env": "^7.4.4",

```

```plain text
$ yarn build
```

これで、`dest/main.js`が生成される。

JavaScript としてビルドされたので、JavaScript 実行エンジンが処理できるようになった。

```plain text
$ node dest/main.js
1
```

## 型チェックも行うようにする

これでビルドは出来るようになったのだが、型チェックは行われない。

`babel-loader`はあくまでもファイルの変換だけを行い、型については見ていないためである。

例えば、`src/index.ts`を以下の内容にする。

```plain text
const value: number = 'foo';
console.log(value);

```

`number`であるべき`value`に文字列を代入しているが、問題なくビルドできてしまう。

```plain text
$ yarn build
$ node dest/main.js
foo
```

これでは TypeScript を利用する意味がないので、型チェックを行うための設定も追加する。

まず、`typescript`をインストールする。

```plain text
$ yarn add -D typescript
```

次に、TypeScript の設定ファイルである`tsconfig.json`を作成する。

[公式ブログ](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/)の内容を参考にした。

```plain text
{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "isolatedModules": true,
    "esModuleInterop": true
  },
  "include": [
    "src"
  ]
}

```

これで`$ yarn tsc`を実行すると、型チェックが実行される。

```plain text
src/index.ts:1:1 - error TS1208: Cannot compile namespaces when the '--isolatedModules' flag is provided.
src/index.ts:1:7 - error TS2322: Type '"foo"' is not assignable to type 'number'.
```

エラーが2つ出た。`TS2322`は`value`に数値を代入するようにすれば直る。

`TS1208`は、`value`をエクスポートすることで直る。

```plain text
const value: number = 1;
console.log(value);
export default value;

```

例えばビルドの前に`tsc`を実行することで、型が合っていないのにビルドされるのを防げる。

```plain text
diff --git a/package.json b/package.json
index b183a11..5f112b0 100644
--- a/package.json
+++ b/package.json
@@ -4,7 +4,7 @@
   "main": "index.js",
   "license": "MIT",
   "scripts": {
-    "build": "webpack --mode=production"
+    "build": "tsc && webpack --mode=production"
   },
   "devDependencies": {
     "@babel/core": "^7.4.4",

```

## React + TypeScript

次に、React をビルドできるようにする。

まずは`index.html`を作成する。

このファイルが`dest/main.js`を読み込み、React で作ったアプリを表示する。

```plain text
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TypeScript</title>
</head>
<body>
<div id="app"></div>
<script src="./dest/main.js"></script>
</body>
</html>

```

React をインストール。

```plain text
$ yarn add react react-dom
```

`jsx`を扱うファイルは拡張子を`.tsx`にするので、`src/index.tsx`を作成する。

```plain text
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Hello!</div>;

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);

```

`webpack.config.js`を、`.tsx`に対応させる。

```plain text
diff --git a/webpack.config.js b/webpack.config.js
index f8b09f6..be31412 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -2,7 +2,7 @@ const path = require('path');

 module.exports = {
   entry: {
-    main: './src/index.ts',
+    main: './src/index.tsx',
   },
   output: {
     filename: '[name].js',
@@ -10,7 +10,7 @@ module.exports = {
   },
   module: {
     rules: [
-      {test: /\.ts$/, use: ['babel-loader']}
+      {test: /\.*(ts|tsx)$/, use: ['babel-loader']}
     ],
   },
 }

```

`tsconfig.json`にも、`jsx`オプションを追加する。

```plain text
diff --git a/tsconfig.json b/tsconfig.json
index 5f7b294..4a611ef 100644
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -5,7 +5,8 @@
     "noEmit": true,
     "strict": true,
     "isolatedModules": true,
-    "esModuleInterop": true
+    "esModuleInterop": true,
+    "jsx": "react"
   },
   "include": [
     "src"

```

React の型定義ファイルをインストールする。

```plain text
$ yarn add -D @types/react @types/react-dom
```

これで、`$ yarn tsc`は通るにようになった。

だが Babel の対応が終わっていないので、ビルドは出来ない。

`@babel/preset-react`をインストールして`babel.config.js`を追加すれば、ビルドできるようになる。

```plain text
$ yarn add -D @babel/preset-react
```

```plain text
diff --git a/babel.config.js b/babel.config.js
index 27ad3e1..14bec9b 100644
--- a/babel.config.js
+++ b/babel.config.js
@@ -9,6 +9,12 @@ const presets = [
     },
   ],
   ['@babel/preset-typescript'],
+  [
+    '@babel/preset-react',
+    {
+      development: process.env.NODE_ENV === 'development',
+    },
+  ],
 ];

 const config = {

```

`$ yarn build`したあとに`$ open index.html`するとページが開き、`Hello!`と表示されているはず。

## import/export

通常、React のコンポーネントは別ファイルに記述してそれを`export/import`するのが一般的なので、ここでもそれに合わせる。

`src/App.tsx`として、別ファイルに切り出す。

```plain text
import React from 'react';

const App = () => <div>Hello!</div>;
export default App;

```

```plain text
diff --git a/src/index.tsx b/src/index.tsx
index c31e3ed..3da2e7a 100644
--- a/src/index.tsx
+++ b/src/index.tsx
@@ -1,7 +1,7 @@
 import React from 'react';
 import ReactDOM from 'react-dom';

-const App = () => <div>Hello!</div>;
+import App from './App';

 ReactDOM.render(
   <App />,

```

だがこれでビルドしようとすると`Module not found: Error: Can't resolve './App'`となり、`App.tsx`をインポートできないので、`webpack.config.js`を編集する。

```plain text
diff --git a/webpack.config.js b/webpack.config.js
index be31412..219f7d9 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -8,6 +8,9 @@ module.exports = {
     filename: '[name].js',
     path: path.resolve(__dirname, 'dest'),
   },
+  resolve: {
+    extensions: ['.ts', '.js', '.tsx', 'jsx'],
+  },
   module: {
     rules: [
       {test: /\.*(ts|tsx)$/, use: ['babel-loader']}

```

これでビルドできる。

## Babel プラグインの利用

最後に、Babel プラグインの利用を試す。

サンプルとして利用するプラグインは、`babel-plugin-react-remove-properties`。

[github.com](https://github.com/oliviertassinari/babel-plugin-react-remove-properties)

React の要素から、任意の属性を取り除くことが出来る。

例えば`data-test`は、デフォルトで取り除いてくれる。

テストコードのために`data-test`という属性を持たせたいが、プロダクションではこの属性は不要なので削除したい、というケースなどで使う。

早速、属性を追加する。

```plain text
diff --git a/src/App.tsx b/src/App.tsx
index de582d9..38cd448 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,4 +1,4 @@
 import React from 'react';

-const App = () => <div>Hello!</div>;
+const App = () => <div data-test="text">Hello!</div>;
 export default App;

```

これをビルドすると当然、そのまま`data-test`がレンダリングされてしまう。

```plain text
<div id="app"><div data-test="text">Hello!</div></div>

```

`babel-plugin-react-remove-properties`を使えばこれを除去できる。

```plain text
$ yarn add -D babel-plugin-react-remove-properties
```

```plain text
diff --git a/babel.config.js b/babel.config.js
index 14bec9b..1175e1f 100644
--- a/babel.config.js
+++ b/babel.config.js
@@ -17,8 +17,15 @@ const presets = [
   ],
 ];

+const plugins = [];
+
+if (process.env.NODE_ENV !== 'test') {
+  plugins.push('react-remove-properties');
+}
+
 const config = {
   presets,
+  plugins,
 };

 module.exports = config;

```

これでビルドしたものをブラウザで確認すると、`data-test`が除去されているのが分かる。

```plain text
<div id="app"><div>Hello!</div></div>

```

## 参考資料

- [TypeScript and Babel 7 | TypeScript](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/)

SPA を開発する際に必須のタスクの一つとして、`History API`のフォールバック（以下、単に「フォールバック」と記述する）がある。

この事象について掻い摘んで説明すると、SPA においては URL と HTML ファイルが一対一になっていないので、それに伴う対応を行うこと。

SPA ではその名の通りページは一枚しかなく、URL の管理や表示するコンテンツの切り替えは、ルーティングライブラリが行っている。

例えば、唯一のページを返す URL が`http://example.com/`である場合、その URL が返す HTML ファイルが JS ファイルを読み込み、その JS ファイルがルーティングライブラリによるプログラムを実行することで、`http://example.com/foo`や`http://example.com/bar`といった URL が有効になる。

問題となるのが、いきなり`http://example.com/foo`などの URL にアクセスされた場合。他のサイトからのリンクであったり、ページのリロードなどで、発生する。

この場合、`http://example.com/foo`に対応する HTML ファイルは存在しないため、`404`となってしまう。

そのため、`http://example.com/foo`や`http://example.com/bar`へのアクセスがあった場合は、`http://example.com/`が対応している HTML ファイルを返すようにしないといけない。

そうすることで、必要な HTML ファイルと JS ファイルが読み込まれ、アクセスのあった URL に対応するコンテンツを表示させることが出来る。

開発環境でよく使われている`webpack-dev-server`では、`historyApiFallback`オプションを使うことで、対応できる。

[devServer.historyApiFallback](https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback)

本番環境ではサーバーの設定が必要。

`Vue`と組み合わせて使うルーティングライブラリ`Vue Router`のドキュメントで、いくつかの例が簡単に紹介されている。

[HTML5 History モード | Vue Router](https://router.vuejs.org/ja/guide/essentials/history-mode.html#%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E8%A8%AD%E5%AE%9A%E4%BE%8B)

この記事では、SPA の配信に`CloudFront`を使う場合にどうやってフォールバックをするのか、書いていく。

## Error Pages を使う？

`CloudFront`には`Error Pages`という設定項目があり、`403`や`404`といったステータスコード毎に、レスポンスするページを設定できる。

これを使ってフォールバックを設定することが出来る。

先程の例なら、`404`が発生したときは`/index.html`を返すように設定すればよい。

だがこの方法だと、起点となるページが複数あるケースに対応できない。

SPA の規模によっては、起点となるページが一つだとは限らない。

そのようなときは、レスポンスしたいページは複数になる。

例えば、`http://example.com/user/*`にアクセスがあったときは`http://example.com/user/index.html`を、`http://example.com/product/*`にアクセスがあったときは`http://example.com/product/index.html`を返したいとする。

`Error Pages`では、このようなニーズに応えることは出来ない。一つのステータスコードに対して、一つのページしか設定できないから。

複数のフォールバックを設定するには、`Lambda@Edge`を使う。

## Lambda@Edge で URL をリライトする

`Lambda@Edge`は、`CloudFront`のエッジロケーションで`Lambda`を実行するサービス。

[Lambda@Edge - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-edge.html)

これを利用して、リクエストのあった URL に応じてリライトすることで、複数のフォールバックを設定できる。

**IAMの設定**

`Lambda`を利用するには`IAM`ロールが必要なので、作成する。

まず、以下の内容の`IAM`ポリシーを作成する。

`CloudWatch Logs`にログを出力することになるので、その権限が必要。

```plain text
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}

```

新しくロールを作り、上記のポリシーを付与する。

そして、「信頼されたエンティティ」として`lambda.amazonaws.com`と`edgelambda.amazonaws.com`を指定する。

これで`IAM`の設定は完了。

**関数の作成**

`Lambda`で関数を作成する。

`Lambda@Edge`を使うには、リージョンを「バージニア北部」に、ランタイムを`Node.js 8.10`か`Node.js 6.10`に設定しておく必要がある。

ロールは、先程作成したものを使う。

**コードを書く**

先程の例だと、以下のように書けばいい。

そんなに難しい内容ではないのだが、ポイントとしては以下。

- 第一引数の`event`の中から、リクエストされた URI を取得する
- その URI に応じて処理を変えたり、URI を書き換えたりする
- `console.log`を実行すると、その内容が`CloudWatch`に保存される

```plain text
exports.handler = (event, context, callback) => {
  const {request} = event.Records[0].cf;

  const currentUri = request.uri;

  // ドットを含むURIは、アセットへのアクセスとみなし、リライトしない
  if (currentUri.indexOf('.') !== -1) {
    console.log(`Don't rewrite. Uri is ${currentUri}`);
    return callback(null, request);
  }

  let newUri = currentUri;
  switch (true) {
    case /^\/user/.test(currentUri):
      newUri = '/user/index.html';
      break;
    case /^\/product/.test(currentUri):
      newUri = '/product/index.html';
      break;
    default:
  }

  console.log(`Old URI: ${currentUri}`);
  console.log(`New URI: ${newUri}`);

  request.uri = newUri;

  return callback(null, request);
};

```

**デプロイ**

コードを保存したら、デプロイする。

ページ上部の「アクション」ボタンから「Lambda@Edge へのデプロイ」を選択すればよい。

今回のケースでは「CloudFront イベント」は「オリジンリクエスト」を選ぶ。

## Lambda@Edge の解除

設定した`Lambda@Edge`の解除は、`Lambda`の画面からは出来ない。

`CloudFront`のディストリビューションの設定画面から`Behaviors`を選び、`Lambda Function Associations`を編集することで解除できる。

そうすると、`Lambda`の画面から、関数を削除することも出来るようになる。

備忘録として、記録していく。

ひとつひとつのサービスについて詳しく説明したりはしない。あくまでも概要や役割と、サービス間の関係について紹介するのみ。

そもそも AWS について詳しくない。フロントエンドエンジニアが必要に駆られて触っている、という感じなのでまだまだ初心者である。

## S3

ストレージサービス。

純粋にストレージとして使うことも出来るし、コンテンツ配信のためにファイルを置くことも出来る。

単純にアセット（画像やJSファイルなど）を置いてもいいし、ホスティング機能を使って`S3`をウェブサーバとして使うことも出来る。

他の AWS のサービスと連携して、ファイルの保存先として使うことも多い。

ログファイルもそうだし、AWS が提供するメールサービスのメールの受信先として、`S3`を設定することも出来る。

ファイルは、「バケット」という単位で管理する。

バケットに保存されているそれぞれのファイルのことを、「オブジェクト」と呼ぶ。

`S3`では、かなり細かくアクセス権を設定できる。コンテンツ配信に使うのでなければ、非公開にしておくべき。

詳細は以下を参照。

[S3で誤ったデータの公開を防ぐパブリックアクセス設定機能が追加されました ｜ DevelopersIO](https://dev.classmethod.jp/cloud/aws/s3-block-public-access/)

## CloudFront

CDNサービス。

「ディストリビューション」という単位で、設定を管理する。

ディストリビューション単位で、配信するコンテンツを設定する。

`CloudFront`では、大本のコンテンツを配信しているサーバを「オリジンサーバ」、ユーザーへの配信を行うサーバを「エッジサーバ」と呼ぶ。「エッジサーバ」は「エッジロケーション」と呼ばれることもある。

[AWS再入門 Amazon CloudFront編 ｜ DevelopersIO](https://dev.classmethod.jp/cloud/)

`CloudFront`を使うにはまず、ディストリビューションを作成する。色々と設定を行うが、そのときにオリジンサーバの指定も行う。

ディストリビューションが作成されると、`xxxxx.cloudfront.net`というドメインが生成される。

このドメインにアクセスすると、「オリジンサーバ」と同じ内容のコンテンツが「エッジサーバ」から配信される。

オリジンサーバには、先程紹介した`S3`を指定することも出来る。

`S3`に置いてあるコンテンツを`CloudFront`経由で配信する。この方法を使えば、SSL証明書を使ってHTTPS化することも出来る。

オリジンサーバに`S3`のコンテンツを指定したい場合、バケットそのものを指定するパターンと、`S3`のホスティングサービスが出力したURLを指定するパターンがあり、それぞれに特徴が異なるので留意する。

[CloudFront + S3 で静的サイトを運用する際の注意点 - Qiita](https://qiita.com/ooxif/items/d28b7caf72bf5290588c)

オリジンサーバとしてバケットを指定する場合、バケットやオブジェクトに直接アクセスすることを禁止できるので、セキュリティ的にはこちらのほうが望ましいと思われる。

具体的にはまず、バケットのアクセス権の設定で、外部からアクセスできないようにする。

次に、ディストリビューションを作成するときの設定で、`Restrict Bucket Access`を`Yes`に、`Yes, Update Bucket Policy`を有効にする。

こうすると、ディストリビューションからはバケットにアクセスできるようになり、そのためのバケット側の設定も自動的に行われる。

[[CloudFront + S3]特定バケットに特定ディストリビューションのみからアクセスできるよう設定する ｜ DevelopersIO](https://dev.classmethod.jp/cloud/aws/cloudfront-s3-origin-access-identity/)

注意点としては、この方法でコンテンツを配信してもすぐには有効にならないこと。

ステータスコード`307`のリダイレクトが発生してしまい、正しく表示されない。

解消されるのを1時間ほど待つ必要がある。

[Cloudfront,S3で307リダイレクトに苦しめられた - パパエンジニアのアウトプット帳](http://masaru-tech.hateblo.jp/entry/2018/03/27/111327)

もうひとつの注意点としては、エラーページの設定。

ディストリビューション毎にエラーページを設定することができ、表示させるページをステータスコード毎に設定する。`404`が発生したときはこのページ、`500`が発生したときはこのページ、といった具合に。

だが`S3`は、コンテンツが見つからなかったときに何故か`403`を返すので、それに合わせた設定をする必要がある。

## IAM

AWS の各種サービスを利用するための権限の設定。

「ユーザー」「ロール」「ポリシー」といった単位で管理する。

例えば、ルート権限（に相当するもの）で AWS にログインするのではなく、必要な機能へのアクセス権のみを持つユーザーを作成して、それでログインすることでセキュリティを高める。

また、CIサービスで AWS の操作（`S3`へのデプロイなど）を行うときも、適切な権限を設定してユーザーを作成し、そのユーザーのアクセスキーをCIサービスに登録する必要がある。

## Route 53

DNSサービス。

ドメインの取得や管理を行う。もちろん、他社で取得したドメインも使える。

サブドメインの作成なども、ここで行う。

「ホストゾーン」という単位で管理する。

`CloudFront`の設定画面で`Alternate Domain Names(CNAMEs)`にドメインを入力すると、そのドメインでコンテンツを配信できる。

## ACM

SSL証明書の発行や管理を行う。

証明書を登録すると、`CloudFront`の`Custom SSL Certificate`で選択肢として表示されるので、それを選ぶとコンテンツをHTTPS化できる。

## Lambda@Edge

`Lambda`は、サーバーレスでコードを実行するためのサービス。

そして`Lambda@Edge`は、`CloudFront`のエッジサーバで`Lambda`を実行するサービス。

このサービスを使うことで、`CloudFront`で配信しているコンテンツにアクセスがあった際に、任意の処理を差し込むことが出来る。

具合的には、ベーシック認証を設定したり、URLのリライトを行ったりすることが出来る。

[Amazon CloudFrontとAWS Lambda@EdgeでSPAのBasic認証をやってみる ｜ DevelopersIO](https://dev.classmethod.jp/cloud/aws/cloudfront-lambdaedge-basic-spa/)

[できた！S3 オリジンへの直接アクセス制限と、インデックスドキュメント機能を共存させる方法 ｜ DevelopersIO](https://dev.classmethod.jp/cloud/aws/directory-indexes-in-s3-origin-backed-cloudfront/)

`Lambda@Edge`を利用するにはまず、そのための`IAM`ロールを作成する必要がある。

必要なアクセス権を付与する他、「信頼されたエンティティ」に`lambda.amazonaws.com`と`edgelambda.amazonaws.com`を設定する。

`Lambda@Edge`を利用できるリージョンは今日現在では「バージニア北部」のみ、[ランタイムは](https://aws.amazon.com/jp/about-aws/whats-new/2018/05/lambda-at-edge-adds-support-for-node-js-v8-10/)[`Node.js v6.10`](https://aws.amazon.com/jp/about-aws/whats-new/2018/05/lambda-at-edge-adds-support-for-node-js-v8-10/)[と](https://aws.amazon.com/jp/about-aws/whats-new/2018/05/lambda-at-edge-adds-support-for-node-js-v8-10/)[`Node.js v8.10`](https://aws.amazon.com/jp/about-aws/whats-new/2018/05/lambda-at-edge-adds-support-for-node-js-v8-10/)[を利用できる](https://aws.amazon.com/jp/about-aws/whats-new/2018/05/lambda-at-edge-adds-support-for-node-js-v8-10/)。

先程作成したロールを使って`Lmabda`で関数を作成し、 「アクション」から「Lambda@Edge へのデプロイ」を選択すればよい。

[[アップデート] Lambda@Edge が超簡単にデプロイ出来るようになったよ！ ｜ DevelopersIO](https://dev.classmethod.jp/cloud/aws/easily-deploy-lae/)

仕事で多少 Rails を触る機会があったが、そもそも Ruby を理解していないとダメだなと感じて、本書を読んだ。

[gihyo.jp](https://gihyo.jp/book/2017/978-4-7741-9397-7)

とても分かりやすく、Ruby に対する理解が深まった。

ちゃんと説明しているのがよい。

入門者向けだからと誤魔化さず、言語仕様について程よく踏み込んでいる。

例えば`private`メソッドについて、「そのクラスの中でのみ使える」ではなく「レシーバを指定して呼び出すことが出来ないメソッド」と説明しており、これはとても分かりやすかったし、`protected`との違いも分かりやすくなる。

ほぼ全ての説明にサンプルコードが書かれてあるのも素晴らしかった。何か新しいことを説明する度に、そのサンプルが出てくる。

言葉での説明だけだと伝えにくい概念もあるが、サンプルコードがあることで理解がスムーズになる。

サンプルコードの質も高く、簡潔にまとまっていて、伝えたいことに的を絞った内容になっている。

まともなコードを書くためには、最低限の言語仕様は理解していないと話にならない。テクニックやコーディングスタイル以前の問題。

そういう意味でまさしく「プロを目指すため」の、つまり職業プログラマとしてちゃんとしたコードを書けるようになるための、書籍だと思う。

言語仕様の説明だけを淡々とするのではなく、理解を深めるための練習問題をTDDで進めたり、バックトレースの読み方を解説したり、ネットで見つけた記事を鵜呑みにすることを戒めたりしており、そういったところにも、実際に開発の現場で Ruby を使えるようになってもらおうという意図を強く感じた。

プログラミング自体は初めてではないが Ruby や Rails は触ったことがなく、これから本格的に勉強していきたいという人は、まず本書から入ると学習がスムーズに進むと思う。

非常にオススメ。

使用している Ruby のバージョンは`2.5.3`。

以下の構文で定義する。

```plain text
module モジュール名
end

```

モジュールはクラスと違い、インスタンスを作ることは出来ない。

```plain text
module MyModule
end
MyModule.new # undefined method `new' for MyModule:Module (NoMethodError)

```

## ミックスイン

クラスが、あるモジュールを取り入れてそのモジュールのメソッドを使えるようにすることを、ミックスインと呼ぶ。

`include`でミックスインすると、モジュールで定義したメソッドをインスタンスメソッドとして使えるようになる。 ミックスインしたクラスのサブクラスでも、そのまま使える。

```plain text
module SelfIntroduction
  def who_am_i(oneself)
    p "I'm #{oneself}."
  end
end

class Parent
  include SelfIntroduction

  def hello
    print 'Hello! '
    who_am_i self
  end
end

class Child < Parent
  def hey
    print 'Hey! '
    who_am_i self
  end
end

parent = Parent.new
parent.hello # Hello! "I'm #<Parent:0x00007ff97d895868>."
child = Child.new
child.hey # Hey! "I'm #<Child:0x00007ff97d895638>."

```

`extend`を使ってミックスインすると、モジュールのメソッドを、そのクラスの特異メソッド（クラスメソッド）として使うことが出来る。

```plain text
module SelfIntroduction
  def who_am_i(oneself)
    p "I'm #{oneself}."
  end
end

class User
  extend SelfIntroduction
end

User.who_am_i(User) # "I'm User."

```

## include されているモジュールを調べる

`include?`メソッドの引数にモジュールを渡すと、そのモジュールを`include`しているかどうかが返ってくる。

`included_modules`メソッドは、`include`しているモジュールを配列で返す。

```plain text
module SelfIntroduction
end

class Parent
  include SelfIntroduction
end

class Child < Parent
end

p Parent.include?(SelfIntroduction) # true
p Child.include?(SelfIntroduction) # true

p Parent.included_modules # [SelfIntroduction, Kernel]
p Child.included_modules # [SelfIntroduction, Kernel]

```

## Kernel とトップレベル

`p`や`require`といったメソッドは、`Kernel`というモジュールで定義されている。

そして、`Object`クラスが`Kernel`を`include`しているため、`Object`を継承している全てのクラスで、`p`などのメソッドを使える。

```plain text
p Object.included_modules # [Kernel]

```

Ruby では、クラス構文やモジュール構文などで囲まれていない一番外側の部分を、「トップレベル」と呼ぶ。

そしてトップレベルの`self`は、`main`という名前のオブジェクトを指すが、これは`Object`クラスのインスタンスである。トップレベルで`p`などを使えるのは、このため。

```plain text
p self # main
p self.class # Object
p self.class.include?(Kernel) # true

```

## モジュールは Module クラスのインスタンス

モジュールは、`Module`クラスのインスタンスである。

```plain text
module SelfIntroduction
end

p SelfIntroduction.class # Module

```

そして、`Module`クラスは、`Object`クラスを継承している。

```plain text
p Module.superclass # Object

```

`Class`クラスは`Module`クラスを継承している。

そのため、継承関係は`Class -> Module -> Object -> BasicObject`になっている。

```plain text
p Class.superclass # Module
p Module.superclass # Object
p Object.superclass # BasicObject

```

全てのクラスは、`Class`クラスのインスタンスでもある。

```plain text
p Class.class # Class
p Module.class # Class
p Object.class # Class
p BasicObject.class # Class

```

*ここらへんは自分でも理解できていない。循環参照のようになっていないか？ *`*Class*`*は*`*BasicObject*`*や*`*Object*`*を継承しているが、それらスーパークラスは、*`*Class*`*のインスタンスなのだから、*`*Class*`*から生まれてくる。だからまず先に*`*Class*`*が存在しているはず。しかしその*`*Class*`*は*`*BasicObject*`*などを継承しておかないといけない。*`*Class*`*定義時にはまだ*`*BasicObject*`*は存在しないにも拘わらず！*

*以下の状況が成立してしまうのがよく分からない。*

```plain text
p Module.instance_of?(Class) # true
p Class.superclass # Module

```

## 名前空間としてモジュールを使う

クラス定義をモジュール構文で囲うことで、名前空間を分けることが出来る。

参照する際は`モジュール名::クラス名`と記述する。

```plain text
module Seller
  class Alice
    def role
      p 'I am seller.'
    end
  end
end

module Buyer
  class Alice
    def role
      p 'I am buyer.'
    end
  end
end

seller = Seller::Alice.new
seller.role # "I am seller."

buyer = Buyer::Alice.new
buyer.role # "I am buyer."

```

モジュールを入れ子にすることも出来る。

```plain text
module User
  module PremiumUser
    class Alice
      def initialize
        p 'This is premium user.'
      end
    end
  end
end

User::PremiumUser::Alice.new # "This is premium user."

```

モジュールが既に定義済みの場合、`class モジュール名::クラス名`という構文でクラスを定義することも可能。

```plain text
module Seller
end

class Seller::Alice
  def role
    p 'I am seller.'
  end
end

seller = Seller::Alice.new
seller.role # "I am seller."

```

トップレベルで定義しているクラスを明示的に呼び出す場合は、`::クラス名`と記述する。

```plain text
class Alice
end

module Seller
  class Alice
    def initialize
      print Alice
      print ', '
      p ::Alice
    end
  end
end

Seller::Alice.new # Seller::Alice, Alice

```

## 関数や定数を提供するためにモジュールを使う

モジュールに特異メソッドを定義すれば、ミックスインすることなくそのメソッドを使える。

```plain text
module SelfIntroduction
  def self.who_am_i(oneself)
    p "I'm #{oneself}."
  end
end

SelfIntroduction.who_am_i 1 # "I'm 1."

```

ミックスインとしても特異メソッドとしても使えるメソッドを、モジュール関数という。

モジュール関数は`module_function`を使って定義する。

モジュール関数は自動的に`private`になるので、レシーバを指定して呼び出すことは出来ない。

```plain text
module SelfIntroduction
  def who_am_i(oneself)
    p "I'm #{oneself}."
  end

  module_function :who_am_i
end

class User
  include SelfIntroduction

  def hello
    print 'Hello! '
    who_am_i self
  end
end

SelfIntroduction.who_am_i 1 # "I'm 1."
user = User.new
user.hello # Hello! "I'm #<User:0x00007fed11115930>."

user.who_am_i # private method `who_am_i' called for #<User:0x00007fed11115930> (NoMethodError)

```

モジュールは定数を定義することもでき、`モジュール名::定数名`で取得できる。

```plain text
module SelfIntroduction
  SOME_VALUE = 'foo'
end

p SelfIntroduction::SOME_VALUE # "foo"

```

## メソッド探索

クラスに対して`ancestors`メソッドを使うと、クラスやモジュールの配列が返ってくる。

クラスのインスタンスがメソッドを呼び出すとき、`ancestors`の返り値の順番でメソッドを探索し、最初に見つかったメソッドを実行する。

最後まで見つからなかった場合は`NoMethodError`になる。

```plain text
module A
end

class Parent
  include A

  def foo
    p "Parent's foo"
  end
  def bar
    p "Parent's bar"
  end
end

class Child < Parent
  def foo
    p "Child's foo"
  end
end

p Child.ancestors # [Child, Parent, A, Object, Kernel, BasicObject]
child = Child.new
child.foo # "Child's foo"
child.bar # "Parent's bar"

```

モジュールを`include`した場合、モジュールのメソッドより先にクラスのインスタンスメソッドを探索するが、`prepend`メソッドでミックスインした場合は、ミックスインしたモジュールのメソッドを先に探索する。

```plain text
module A
end

class Foo
  include A
end

class Bar
  prepend A
end

p Foo.ancestors # [Foo, A, Object, Kernel, BasicObject]
p Bar.ancestors # [A, Bar, Object, Kernel, BasicObject]

```

## 参考資料

使用している React のバージョンは`16.8.4`。

## レンダー後の処理を指定するための仕組み

React Hooks の一つである`useEffect`は、レンダー後に実行したい処理を React に伝えるための仕組み。

`useEffect(fn)`と記述すると、DOMの更新が終わったあとに`fn`を実行する。

`useEffect`はレンダー後に必ず実行される。最初にレンダーした際もそうだし、`props`や`state`に変更があってレンダーし直した際もそう。そこに区別はない。

以下の例では、このコンポーネントが表示された際に`effect!`というログが流れる。

そしてボタンを押下した際にも、その都度`effect!`というログが流れる。

```plain text
import React, {useState, useEffect} from 'react';

const App = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log('effect!');
  });

  return (
    <>
      <div>{state}</div>
      <button
        type="button"
        onClick={() => {
          setState(state + 1);
        }}
      >
        increment
      </button>
    </>
  );
};
export default App;

```

[公式ドキュメント](https://ja.reactjs.org/docs/hooks-effect.html)では`useEffect`の第一引数に渡している関数（上記の例では`console.log('effect!')`を実行しているアロー関数）を「副作用関数」と呼んでいる（英語では単純に`effect`）ので、ここでもそれに倣って副作用関数と呼ぶことにする。

## 副作用関数はレンダーする度に新しく作られる

副作用関数は、レンダーされる度に毎回新しく作られ、それが呼び出される。

そのため、そのときのコンポーネントの状態に応じて処理の内容を変える、ということが可能になる。

先程の例の`console.log`の部分を以下のように書き換えてみる。

```plain text
console.log(state === 0 ? 'mounted!' : 'updated!');

```

こうすると、このコンポーネントが表示された際に`mounted!`とログに表示され、以降、ボタンを押下するたびに`updated!`がログに表示される。

これは、レンダーする度に副作用関数が新しく作られることによって可能になっている。

このコンポーネントがマウントされたとき、以下の副作用関数が作られて実行される。

このときの`state`は`0`なので、こうなっている。

```plain text
() => {console.log(0 === 0 ? 'mounted!' : 'updated!');}

```

そしてボタンを押すと`state`が`1`になり、DOMの更新が行われたあと、以下の副作用関数が作られて実行される。

```plain text
() => {console.log(1 === 0 ? 'mounted!' : 'updated!');}

```

もう1度ボタンを押すとこう。

```plain text
() => {console.log(2 === 0 ? 'mounted!' : 'updated!');}

```

つまり、公式ドキュメントにあるように「それぞれの副作用は特定のひとつのレンダーと結びついている」。

この仕組みを理解していないと、思った通りに副作用を実行できないことがある。

以下の例では、`state`を1秒間隔でログに流す。

```plain text
useEffect(() => {
  setInterval(() => {
    console.log(state);
  }, 1000);
});

```

マウント時に`state`が`0`の状態で実行されるので、`0`が表示され続ける。

ここでボタンを押して`state`が`1`になるとどうなるのかというと、`1`が毎秒流れるだけでなく、引き続き`0`もログに流れ続ける。

なぜこうなるかというと、ボタンを押下した際に呼び出される副作用関数は、マウント時に呼び出された副作用関数とは何の関係もない独立した関数なので、以前に呼び出された副作用関数には何も影響を与えない。

そのため、上記の例だと、ボタンを押す度に新しく`setInterval`が実行される。

では古い`setInterval`をクリアするにはどうすればいいのか。

クリーンアップと呼ばれる機能を使うと、新しく副作用関数を実行する前に、前回実行した副作用関数の処理に影響を与えることが出来る。

## クリーンアップは、新しく副作用関数を実行する前に呼び出される

副作用関数のなかで関数を返すと、それがクリーンアップのための関数になる。

この関数は、次に副作用関数が実行される際に、それに先立って呼び出される。

以下の例だと、`console.log(`Previous state is ${state}.`);`を実行しているアロー関数が、クリーンアップ。

```plain text
const [state, setState] = useState(0);

useEffect(() => {
  console.log(`Current state is ${state}.`);
  return () => {
    console.log(`Previous state is ${state}.`);
  };
});

```

この場合、マウント時に`Current state is 0.`と表示される。

その後、ボタンを押すなどして`setState(state + 1)`を実行して`state`が`1`になると、次の副作用関数が呼ばれる前に、前回呼び出した副作用関数のクリーンアップが実行され、それから新しい副作用関数が呼ばれる。

そのため、まず`Previous state is 0.`が表示され、そのあとに`Current state is 1.`が表示される。 以降、ボタンを押す度に同じ流れで処理が行われる。

先程のタイマーの例で言えば、以下のように書くことで、前回の副作用関数でセットしたタイマーがリセットされる。

```plain text
useEffect(() => {
  const id = setInterval(() => {
    console.log(state);
  }, 1000);
  return () => {
    clearInterval(id);
  };
});

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20190321/20190321174857.gif)

## 副作用関数の実行をスキップする

副作用関数はレンダーされる度に必ず実行されるが、副作用の内容によっては毎回呼び出す必要がない、あるいは呼び出したくないケースもある。

その場合、`useEffect`の第二引数に配列を渡すことで、副作用関数を呼び出す条件を指定することが出来る。

`useEffect(fn, [..deps])`と記述すると、`deps`の内容を前回の`fn`実行時の内容と比較して、変化があったときにのみ再び`fn`を呼び出す。

以下の例では、`inc state`ボタンを押下しても副作用関数は実行されず、マウント時と、`inc keyState`ボタンを押下した場合にのみ、副作用関数が実行される。

```plain text
import React, {useState, useEffect} from 'react';

const App = () => {
  const [state, setState] = useState(0);
  const [keyState, setKeyState] = useState(0);

  useEffect(() => {
    console.log('keyState has been incremented!');
  }, [keyState]);

  return (
    <>
      <div>{`${state}, ${keyState}`}</div>
      <button
        type="button"
        onClick={() => {
          setState(state + 1);
        }}
      >
        inc state
      </button>
      <button
        type="button"
        onClick={() => {
          setKeyState(keyState + 1);
        }}
      >
        inc keyState
      </button>
    </>
  );
};
export default App;

```

`useEffect`の第二引数の配列に`keyState`を渡している。

マウント時に副作用関数を実行するのはこれまで通りだが、そのときの`keyState`は`0`である。

次に、`inc state`を押下する。そうすると`state`が更新されたので再びレンダーする。

このとき React は副作用関数を実行しようとするが、その前に`keyState`の値をチェックする。前回は`0`だったが、今回も`0`である。そのため、配列の値に変化がないため、副作用関数は実行されない。

今度は`inc keyState`を押下してみる。そうすると`keyState`がインクリメントされ、前回の値が`0`であったのに対して今回は`1`なので、副作用関数が実行される。

配列には複数の値を渡すことが可能で、どれか一つでも前回の値と違っていれば、副作用関数が実行される。

## 副作用関数のなかで非同期処理を行う際の注意点

副作用関数のなかで非同期処理を行う場合、処理の順序が担保されない可能性があることに注意する。

副作用関数はレンダーされる毎に実行するわけだが、以前実行した副作用関数の非同期処理のほうが解決に時間がかかった場合、意図しない動きになる可能性がある。

少し長いが、サンプルを貼る。

```plain text
import React, {useState, useEffect} from 'react';

const fetchUser = id =>
  new Promise(resolve => {
    const responseTime = id === 1 ? 3000 : 1000;
    setTimeout(() => {
      resolve(`This is data ${id}`);
    }, responseTime);
  });

const App = () => {
  const [id, setId] = useState(null);
  const [message, setMessage] = useState('Please click button.');
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const res = await fetchUser(id);
        setApiStatus(`complete (user is ${id})`);
        setMessage(res);
      })();
    }
  }, [id]);

  return (
    <>
      <div>{message}</div>
      <br />
      <div>API STATUS: {apiStatus}</div>
      <br />
      <button
        type="button"
        onClick={() => {
          setId(1);
        }}
      >
        Fetch data of user number 1.
      </button>
      <button
        type="button"
        onClick={() => {
          setId(2);
        }}
      >
        Fetch data of user number 2.
      </button>
    </>
  );
};
export default App;

```

`fetchUser`というAPIを叩く想定で、APIによってレスポンスの時間が異なる設定。

`id`が`1`のときは3秒で、`2`のときは1秒でレスポンスが来る。

問題になるのは、`1`のAPIを叩いた直後に`2`のAPIを叩いたとき。

副作用関数の実行そのものは`1`のほうが早いが、APIのレスポンスを待っている場合に`2`の副作用関数が実行され、`setMessage`まで実行されてしまう。そしてその後で、`1`のレスポンスがようやく返ってきて、`setMessage`が実行される。

そのため、`message`の最終的な値は`This is data 1`になってしまう。

これに対処するには、クリーンアップを上手く使うとよい。

今回のケースでは、`useEffect`を以下のように書き換える。

```plain text
  useEffect(() => {
    let didCancel = false;

    if (id) {
      (async () => {
        const res = await fetchUser(id);
        setApiStatus(`complete (user is ${id})`);
        if (!didCancel) setMessage(res);
      })();
    }

    return () => {
      didCancel = true;
    };
  }, [id]);

```

`didCancel`の初期値は`false`なので、そのままなら`setMessage`は実行される。

だが、次の副作用関数が呼ばれると（今回のケースでは`id`が`1`から`2`に変わったタイミング）、前回の副作用関数のクリーンアップが実行され、前回の副作用関数における`didCancel`は`true`になる。

このため、APIのレスポンスがようやく返ってきて`await`以降の処理を行う際に`(!didCancel)`の条件が満たされず、前回の副作用関数の`setMessage`は実行されずに済む。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20190321/20190321175002.gif)

## 参考資料

- [副作用フックの利用法 – React](https://ja.reactjs.org/docs/hooks-effect.html)
- [A Complete Guide to useEffect — Overreacted](https://overreacted.io/a-complete-guide-to-useeffect/)

Rubyのクラスの理解が曖昧だったので、整理して記録しておく。

Railsをやるにしても、ここらへんをきちんと理解しておくのは前提だと思う。

動作確認しているRubyのバージョンは`2.5.3`。

## 用語の整理

オブジェクトとインスタンスは、同じものを指していることが多い。

文脈によっては、オブジェクトをレシーバと呼ぶこともある。メソッドを受け取るという意味。

`user.first_name`なら、`user`は、`first_name`のレシーバ。

そしてこの場合、メソッドをメッセージと呼ぶことがある。つまり`first_name`がメッセージ。そのメッセージを受け取るのが、`user`というレシーバ。

この記事では出てこないが、インスタンスメソッドのことを`クラス名#メソッド名`と表記し、クラスメソッドのことは`クラス名.メソッド名`もしくは`クラス名::メソッド名`と表記することがある。

## Rubyでは万物がオブジェクト

数値や`nil`もオブジェクト。

```plain text
1.to_s # => "1"
1.class # => Integer
nil.to_s # => ""
nil.class # => NilClass

```

そしてクラスもまた、オブジェクトである。

```plain text
Integer.class # => Class
NilClass.class # => Class

```

## 基礎

クラスを定義するには`class`構文を使う。

クラス名はアッパーキャメルケースにするのが慣習。

`クラス名.new`でインスタンスが作成される。

```plain text
class User
end
user = User.new
p user # #<User:0x00007fea09926508>

```

クラス内でメソッドを定義するとそれは「インスタンスメソッド」となり、インスタンスに対して呼び出すことが出来る。

`initialize`メソッドは特殊なメソッドで、定義すると、インスタンス作成時に自動的に呼び出される。

```plain text
class User
  def initialize
    p 'This is initialize.'
  end
end
user = User.new # "This is initialize."

```

## インスタンス変数とアクセサメソッド

インスタンス変数とは、インスタンス内で共有される変数。名前は必ず`@`から始める。

インスタンス変数にアクセスするインスタンスメソッドのことを、アクセサメソッドと呼ぶ。

下記の例では`@name`がインスタンス変数で、`name`がアクセサメソッド。

```plain text
class User
  def initialize(name)
    @name = name
  end

  def name
    @name
  end
end
user = User.new('Alice')
p user.name # "Alice"

```

存在しないインスタンス変数を参照した場合は`nil`を返す。

```plain text
class User
  def initialize(name)
    @name = name
  end

  def name
    @foo
  end
end
user = User.new('Alice')
p user.name # nil

```

アクセサメソッドは`attr_accessor`で定義することも出来る。

```plain text
class User
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end
user = User.new('Alice')
p user.name # "Alice"

```

`attr_accessor`は指定したインスタンス変数の読み書き両方を許可するが、読み込み専用にする`attr_reader`、書き込み専用にする`attr_writer`もある。

## クラスメソッド

インスタンスではなくクラスに対して呼び出すメソッドを、クラスメソッドと呼ぶ。

書き方は以下の2種類。

**メソッド名の前に**`**self.**`**をつける**

```plain text
class User
  def self.foo
    p 'This is class method.'
  end
end
User.foo # "This is class method."

```

**メソッドの定義を**`**class << self**`**と**`**end**`**で囲う**

```plain text
class User
  class << self
    def boo
      p 'This is class method also.'
    end
  end
end
User.boo # "This is class method also."

```

## self キーワード

`self`は、インスタンスメソッド内ではそのインスタンス自身を指し、クラスメソッド内ではクラスを指す。

```plain text
class User
  def self.c_method
    p self
  end

  def i_method
    p self
  end
end
User.c_method # User
user = User.new
user.i_method # #<User:0x00007fcaea8828d8>

```

## 継承

Rubyの継承は単一継承。単一継承とは、一つのスーパークラスを継承すること。複数のスーパークラスは継承できない。

クラスをレシーバにして`superclass`メソッドを呼び出すと、継承元のクラスを知ることが出来る。

独自に作成したクラスは、デフォルトで`Object`クラスを継承する。

何も定義しなくても`class`メソッドなどを使うことが出来るのはそのため。

```plain text
class User
end
p User.superclass # Object

```

`Object`は組み込みライブラリの一種で、`Array`や`String`といった組み込みライブラリも、`Object`を継承している。

```plain text
p Array.superclass # Object
p String.superclass # Object

```

ちなみに、`Object`のスーパークラスは`BasicObject`で、これが継承関係の頂点にある。

`BasicObject.superclass`は`nil`を返す。

```plain text
p Object.superclass # BasicObject
p BasicObject.superclass # nil

```

## インスタンスのクラスを調べる

インスタンスに対して`class`メソッドを呼び出すと、クラスを返す。

`instance_of?(クラス)`で、そのクラスのインスタンスかどうかを真偽値で返す。

`is_a?`は継承関係にあるかを真偽値で返す。

```plain text
class User
end

user = User.new

p user.class # User

p user.instance_of?(User) # true
p user.instance_of?(Object) # false

p user.is_a?(User) # true
p user.is_a?(Object) # true
p user.is_a?(Array) # false

```

## Object 以外のクラスを継承する

以下の構文を使う。

```plain text
class サブクラス < スーパークラス
end
```

以下の例では、`Array`クラスを継承した`MyArray`クラスを定義している。

```plain text
class MyArray < Array
end

array = MyArray.new

p array.class # MyArray
p array.is_a?(MyArray) # true
p array.is_a?(Array) # true

```

## オーバーライドと super

サブクラスがスーパークラスと同名のメソッドを定義すると、オーバーライドする。

インスタンスメソッドもクラスメソッドも同じ挙動。

```plain text
class Parent
  def foo
    p 'super'
  end

  def bar
    p 'bar'
  end
end

class Child < Parent
  def foo
    p 'sub'
  end
end

child = Child.new
child.foo #  "sub"
child.bar # "bar"

```

```plain text
class Parent
  def self.foo
    p 'super'
  end

  def self.bar
    p 'bar'
  end
end

class Child < Parent
  def self.foo
    p 'sub'
  end
end

Child.foo # "sub"
Child.bar # "bar"

```

メソッド内で`super`を実行すると、スーパークラスの同名のメソッドを呼び出す。

これも、インスタンスメソッドとクラスメソッドで同じ挙動。

```plain text
class Parent
  def foo
    'super'
  end
end

class Child < Parent
  def foo
    p "#{super}, sub"
  end
end

child = Child.new
child.foo # "super, sub"

```

```plain text
class Parent
  def self.foo
    'super'
  end
end

class Child < Parent
  def self.foo
    p "#{super}, sub"
  end
end

Child.foo # "super, sub"

```

メソッドだけでなく、インスタンス変数もオーバーライドされる。

```plain text
class Parent
  def initialize
    @name = 'Alice'
  end

  def greeting
    p "Hello, I am #{@name}."
  end
end

class Child < Parent
  def initialize
    @name = 'Bob'
  end
end

parent = Parent.new
parent.greeting # "Hello, I am Alice."
child = Child.new
child.greeting # "Hello, I am Bob."

```

## public, private, protected

Rubyのメソッドは、公開レベルに応じて3つに分類できる。

デフォルトでは`public`メソッドになるが、`initialize`メソッドだけはデフォルトで`private`メソッドになる。

`public`メソッドは、外部から自由に呼び出せる。

`private`メソッドは、レシーバを指定して呼び出すことが出来ない。

クラスの定義内で`private`キーワードを書くと、そこから下で定義したインスタンスメソッドは`private`メソッドになる。

下記の例では、`name`は`private`メソッドなので、レシーバを指定して呼び出そうとするとエラーになる。

```plain text
class User
  def hello
    "Hello, #{self.name}."
  end

  def bye
    "Bye, #{name}."
  end

  private

  def name
    'Alice'
  end
end

u = User.new
p u.name # private method `name' called for #<User:0x00007fa6e81c9d78> (NoMethodError)
p u.hello # private method `name' called for #<User:0x00007fbb358bdc18> (NoMethodError)
p u.bye # "Bye, Alice."

```

レシーバを指定しない、というルールさえ守れば、サブクラスでスーパークラスの`private`メソッドを呼び出すことも出来る。

```plain text
class Parent
  private

  def name
    'Alice'
  end
end

class Child < Parent
  def print_name
    p name
  end
end

child = Child.new
child.print_name # "Alice"

```

クラスメソッドは`private`キーワードの下に定義しても`private`にならず、以下のいずれかの書き方で設定する。

```plain text
class User
  class << self
    private

    def hello
      'Hello!'
    end
  end

  p "#{hello} This is private." # "Hello! This is private."
end

User.hello # private method `hello' called for User:Class (NoMethodError)

```

```plain text
class User
  def self.hello
    'Hello!'
  end

  private_class_method :hello

  p "#{hello} This is private." # "Hello! This is private."
end

User.hello # private method `hello' called for User:Class (NoMethodError)

```

`protected`メソッドは、そのクラス自身とサブクラスのインスタンスからのみ、レシーバを指定して呼び出せる。

```plain text
class User
  def hello
    "Hello, #{self.name}."
  end

  def bye
    "Bye, #{name}."
  end

  protected

  def name
    'Alice'
  end
end

u = User.new
p u.name # protected method `name' called for #<User:0x00007fb73d0edcc8> (NoMethodError)
p u.hello # "Hello, Alice." private メソッドと違い、これはエラーにならない
p u.bye # "Bye, Alice."

```

## respond_to?

`respond_to?`は、指定したレシーバが、引数に渡されたメソッドを持つかを返す。

```plain text
p 1.respond_to?(:to_s) # true
p 1.respond_to?(:foo) # false

```

## 特異メソッド

Rubyでは、オブジェクト単位でメソッドを定義することが出来る。

```plain text
str1 = 'abc'
str2 = 'xyz'

def str1.foo
  "#{self} has foo."
end

p str1.respond_to?(:foo) # true
p str2.respond_to?(:foo) # false

p str1.foo # "abc has foo."

```

このように、特定のオブジェクトに紐付いたメソッドを特異メソッドと呼ぶ。

これまでクラスメソッドと呼んでいたものも、特異メソッドの一種である。

クラスもまたオブジェクトなので特異メソッドを定義することができ、それがいわゆるクラスメソッド。

```plain text
class User
  p self # User
  p self.class # Class
  p self.instance_of?(Class) # true

  def self.foo # Class インスタンスである User オブジェクトに、特異メソッドを定義している
    'This is foo.'
  end
end

p User.foo # "This is foo."

```

なお、数値やシンボルに対しては特異メソッドを定義することは出来ない。

```plain text
sym = :sym
def sym.foo # can't define singleton (TypeError)
end

i = 1
def i.foo # can't define singleton (TypeError)
end

```

## 参考資料

![](https://github.com/numb86.png)

「よりよいプログラミング」を考える上で示唆に富む記事を読んだので、自分なりにまとめておく。

以下の記事を読むことで、プログラミングに対して大きなヒントを得られた。

設計やアーキテクチャの話ではなく、プログラミングというものに対する発想や認識の話。

プログラミングを「必要な動きを実装するもの」と捉えるのではなく、「対象を定義するもの」と捉える。

そうすることで、プログラミングにおいて最も重要な原則の一つである「正しい名前をつける」ということを実現できるようになる。

## 「正しい名前」という羅針盤

よいコードとは何か。

様々な議論や視点があるが、中核的な要素の一つが、命名。

関数や変数に適切な名前をつけることで、コードの質が高まる。

より正確に言えば「名前が正しい状態を維持し続ける努力」を弛まず行うことで、コードの質が高まっていく。

名前が正しい状態を維持するために、コードにも手を入れることになるから。

「正しい名前」とは、「それは何？」を一言で表現するもの。

それぞれの関数や変数が何であるのかを、過不足なく説明するもの。

「名前が「それは何？」を的確に表現している状態」を維持しようと心がけることで、名前とコードが相互作用を及ぼし、双方が洗練されていく。

関数に名前をつけようとしたとき、その関数の役割や意味が曖昧だと、正しい名前をつけることなど出来ない。そのため、まずはその関数の役割や意味を整理することになり、コードの書き換えや分割を行うことになる。それから、意味や役割に見合った名前をつける。

既存の関数に手を加えようとしたときも、名前が適切な状態を崩さないように気をつける。そのため、その関数の役割から外れた処理が紛れ込むことがなくなる。あるいは、そもそも既存の名前が適切ではなかったことに気付くかもしれない。場合によっては、より適切な粒度に関数を分割するべきなのかもしれない。

例として関数を出したが、変数やクラスなど、名前をつけるもの全てに同じことが言える。例えば変数については、どんな役割を期待され、何のために存在する変数なのかを考え抜いて名前をつけ、その名前に見合わないような値が入り込んだり、適切でない箇所で参照されたりすることを、防がなければならない。

その名前は「それは何？」を上手く説明できているのか、そのコードは名前の正しさを崩していないか、ということを絶えず意識してプログラミングしていく。

このような名前とコードの相互作用を繰り返すことで、コード全体の質が高まっていく。

可読性が高まるのはもちろんのこと、単機能で短い関数が適切な粒度で作成され、それぞれが疎結合になる。

一つ一つの変数や関数の意味が明確だから、間違った使い方をしたり間違った処理を加えたりしてしまう可能性も低くなる。

そもそもの設計が間違っていた場合、正しい名前をつけることやコードを整理することがどんどん苦しくなっていくので、名前の正しさにこだわり続けることで設計の間違いに気付き、より妥当な設計が見えてくる。

コードを改善していくための指針や道標が「正しい名前」であると言える。

「正しい名前」と「名前に見合ったコード」が、コード改善のための羅針盤となる。

## 「必要な動きを実装する」という考え方

しかしほとんどの現場では「正しい名前をつける」ということは軽視されている。

代わりに何が重視されているかというと、「動くこと」が最優先になっている。

もちろん動くことは大前提であり動かないコードに価値はないのだから、間違ってはいない。

しかし現実には、「動くことは大前提」ではなく、「動きさえすればよい」となってしまっている。

その結果、「正しい名前」ということについては軽視されるようになる。

「正しい名前をつけること」は努力義務のようになってしまい、それが出来るに越したことはないが、取り敢えず動いてさえいれば及第点とされてしまう。

なぜそうなってしまうのかと言えば、「プログラミングとは必要な動きを実装すること」だと思っているから。プログラミングを、そういうものだと捉えている。

確かにこの定義に照らし合わせれば「動けばよい」となる。動きさえすれば、立派にプログラミングをしていることになる。

中身の処理がどうなっていようと、表示させたいボタンが表示されており、それを押したときに意図した動作が行われていれば、それでよいということになる。

ここに「正しい名前」という観点は一切ない。「正しい名前が大切」ということを否定するわけではないが、特にそれを重視するわけでもない。

そしてこういう世界では、「正しい名前をつけよう」という努力は、どんどんおざなりになっていく。

優先順位が下だから。

命名が上手くいけば儲けものだが、そんなことよりも、とにかく求められた機能を実装しなければならない。報告のあったバグを直し、意図した動作が行われるようにしなければならない。

そしてそれさえ出来れば、目出度くリリースされる。名前とコードの不一致など、大して気に留めない。

取り敢えず動くコードを書くことに比べて、正しい名前を徹底することには大きな労力がかかるので、そのこともこの傾向に拍車をかける。

## 「対象を定義する」という考え方

このように、プログラミングを「必要な動きを実装するもの」だと捉えている限り、「正しい名前をつける」という努力を徹底することは非常に難しい。

なので、プログラミングに対する認識を変える。

プログラミングを、「実現しようとしている対象を定義する行為」と捉える。そのように認識を変える。

「実現しようとしている対象」とは、作ろうとしているソフトウェアであり、それによって実現されるビジネスなりサービスなりユーザー体験なりである。開発現場でいうところの「要件」とも言えるかもしれない。

それについてプログラミング言語を使って記述していき定義することが、プログラミングである。それによって生まれた完成物、つまり対象について定義したものが、プログラム。

その過程で、対象について記述するための語彙を増やしていくことになる。

プログラミング言語が予め用意している語彙だけでは表現力に限界がある。

なので、語彙を組み合わせて、新しい語彙を定義する。その対象に特有の概念や表現についても、語彙として定義してしまったほうが効率がよい。

このように語彙を作ったり語彙を駆使したりして、プログラム全体を定義していく。

そして過不足なく対象について定義できたとき、プログラムは完成となる。そしてここに到るまでの一連の作業こそがプログラミングである。

そしてこの世界においては、語彙の意味が明確で一貫性を持っているのが「よいプログラム」であり、語彙の意味が曖昧で一貫性がないことが「汚いプログラム」であるといえる。

語彙の定義や意味が曖昧だと、使い物にならない。厳密で一貫性のある記述はできず、対象を定義していくことに困難が生じる。的確に記述できない。

取り敢えずは記述できるかもしれないが、語彙が示しているものが不明瞭だから、書き換えや追記がしづらい。

そして、語彙の定義が間違っていたり、語彙の使い方を間違っていると、それはバグとなって現れる。

プログラミングに対するこのような捉え方は、「正しい名前をつける」という態度と相性がよい。というより、両者は同じものを指している。

「語彙の定義」とは「名前をつける」ということであり、正しく定義された語彙（＝変数や関数）を駆使して、プログラム全体を表現していく。

だから、「プログラミング言語を使って対象を定義していく」という認識でプログラミングに取り組むことで、自然と「名前」に対する意識を保つことが出来る。

そして既に書いたように「正しい名前」を追求しながらプログラミングすることで、コードの質は高まっていく。

## 見える景色が変わる

長々と書いてきたが、ただ発想を変えただけで、人気のライブラリや最新のアーキテクチャを入れたわけではない。 プログラミングに対する認識を変えただけの話。

しかし発想の転換というのはとても重要で、難問だと思っていたことも切り口を変えてみることであっさり解決する、というのはよくある。 それはプログラミングにも言えて、考え方が変わるだけで、書き方も変わる。

[はてなブックマークからの引用](http://b.hatena.ne.jp/entry/s/r-west.hatenablog.com/entry/20090516/1242489952)だが、『動きに名前をつけるのでなく名前の定義を書く』『「どう作る?」ではまって、「それ何?」を見直したら周辺の課題も巻き込んで解決』とあるように、意識を変えるだけで、プログラミングのやり方が大きく変わる可能性がある。

自分は業務でSPAを開発することが多いが、それについても、「SPAという対象を過不足なく記述していく作業」と捉えることが出来る。

JavaScriptというプログラミング言語に用意された語彙を使っていくことになるが、それだけでは効率が悪く冗長になる。汎用的で基礎的な語彙しか用意されていないから表現力に限界があるし、同じ記述を何度も繰り返したりすることになる。

だから、自分で新しく語彙を定義して、それを使っていく。

しかしそれだけでは大変なので、ライブラリも使う。ライブラリは語彙集と言える。

SPAの記述に役立つ語彙集として、`React`や`Vue`などがあり、ライブラリ毎に語彙の種類や特徴は異なる。

このように、たくさんの語彙を定義し、それを駆使して、表示、レイアウト、機能、などを定義していき、SPAという全体像について書き上げる。

## まとめ

「正しい名前をつける」のが大切であり、それを実践するための手法として「プログラミングとは、プログラミング言語を使って対象を定義することである」という認識に切り替える。単純な話ではあるが、実践するのは難しい。

だがこれを習慣や態度として身に着けることが出来れば、プログラマとしての地力がかなり上がると思っている。