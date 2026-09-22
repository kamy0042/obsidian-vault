---
URL: https://numb86-tech.hatenablog.com/entry/2020/12/01/093704
Updated: 2021-11-06T22:50:00
Created: 2021-09-03T20:20:00
Tags: [topic/技術/ビルドツール]
---
JavaScript や TypeScript を使ってウェブアプリを提供する場合、開発時は`import`や`export`などの ES Modules を使い、公開時はファイルをバンドルして公開することが多い。
 以下の記事に書いたように、現在の主要なブラウザは ES Modules に対応してものの、バンドルせずに公開してしまうとパフォーマンスに悪影響を与える可能性がある。

ファイル数が増えれば増えるほど影響は深刻になるため、依存関係が深いライブラリを使っている場合などは、レイテンシが飛躍的に増加してしまう。
 そのため、バンドルせずに公開するのは現実的ではない。

バンドルしてひとつのファイルにまとめてしまえば、JavaScript のダウンロードは一度で済む。
 しかしそうすると今度は、バンドルファイルの肥大化という問題が発生する。
 巨大なファイルはダウンロードやパースに時間がかかるため、ユーザ体験を悪化させてしまう。

この問題を解決するために、主要なモジュールバンドラにはコードを分割するための機能が備わっている。
 この機能を適切に使用することで、バンドルファイルのサイズを削減し、パフォーマンスを改善することができる。

この記事では、webpack でコード分割を行うにはどうすればよいのか、具体的にどのような形に分割されるのか、などを見ていく。

使用したライブラリのバージョンは以下の通り。

- webpack@5.6.0
- webpack-cli@4.2.0
- clean-webpack-plugin@3.0.0
- html-webpack-plugin@5.0.0-alpha.14
- nodemon@2.0.6
- react@17.0.1
- react-dom@17.0.1
- @babel/core@7.12.7
- @babel/preset-react@7.12.7
- babel-loader@8.2.1
- webpack-bundle-analyzer@4.1.0
- lodash@4.17.20

## 環境構築

まず、検証用の環境を準備する。

以下の`package.json`を用意してから`$ yarn`を実行して、必要なライブラリをインストールする。

```plain text
{
  "name": "chunk",
  "license": "MIT",
  "scripts": {
    "start": "nodemon server.js",
    "build": "NODE_ENV=production webpack"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^5.0.0-alpha.14",
    "nodemon": "^2.0.6",
    "webpack": "^5.6.0",
    "webpack-cli": "^4.2.0"
  }
}

```

`webpack.config.js`は以下のようにする。
 この時点では、コード分割に関する設定は入れていない。

```plain text
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      scriptLoading: 'defer',
    }),
    new CleanWebpackPlugin(),
  ],
}

module.exports = config;

```

最後に、`server.js`。
 HTML ファイルは即時レスポンスを返すが、JavaScript ファイルについては`3`秒後にレスポンスを返す。
 こうすることで、挙動を確認しやすくしている。

```plain text
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  switch(true) {
    case /^\/$/.test(req.url):
      fs.readFile('./dist/index.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(data);
        res.end();
      })
      break;
    case /\.js$/.test(req.url):
      fs.readFile(`./dist${req.url}`, 'utf-8', (err, data) => {
        setTimeout(() => {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          res.write(data);
          res.end();
        }, 3000)
      })
      break;
    default:
      res.writeHead(404);
      res.end();
  };
}).listen(8080);

```

まずはこの状態で検証を行う。必要に応じて設定を追加、変更していく。

## Dynamic Import によるコード分割

Dynamic Import を使うと、webpack が自動的にコードを分割してくれる。

まずは Dynamic Import を使わずにコードを書いてみる。

```plain text
// src/a.js
const elem = document.createElement('div');
elem.textContent = 'execute a';
document.body.appendChild(elem);

export const a = 1;

```

```plain text
// src/index.js
import {a} from './a.js';

const elem = document.createElement('button');
elem.textContent = 'click';
elem.addEventListener('click', () => {
  alert(a);
})

document.body.appendChild(elem);

```

この状態でビルド（`$ yarn build`）すると、`dist/index.bundle.js`が出力される。
 このファイルは、`src/index.js`と`src/a.js`をバンドルしたものなので、読み込まれると両方のファイルの内容が実行される。

`$ yarn start`でサーバを起動して、確認してみる。`http://localhost:8080/`にアクセスすると、以下のようになる。

![[20201201050601.gif]]

`index.bundle.js`が実行されると`src/a.js`の内容も実行されるため、`execute a`が挿入される。

次に、Dynamic Import を使った形に書き換えてみる。
 Dynamic Import の基本的な使い方については、以下に書いた。

`src/index.js`が`src/a.js`を`import`しているが、そこで使われている`a`という値は、ボタンが押下されたときに必要になる。
 そのため、初期読み込み時には`import`が不要であり、Dynamic Import を使うことができる。
 以下のコードでは、ボタンが押下された時に動的に`src/a.js`を読み込むようにしている。

```plain text
// src/index.js
const elem = document.createElement('button');
elem.textContent = 'click';
elem.addEventListener('click', () => {
  import('./a.js').then(res => {
    alert(res.a);
  })
})

document.body.appendChild(elem);

```

この状態でビルドすると、`index.bundle.js`の他に、`85.bundle.js`が生成されている。
 これが、コード分割である。ふたつのバンドルファイルに分割されている。

挙動は以下のようになる。

![[20201201050650.gif]]

HTML ファイルの`head`要素に`<script defer="defer" src="/index.bundle.js"></script>`があるので`index.bundle.js`が読み込まれるが、このファイルには`src/a.js`の内容は含まれていないため、`execute a`は挿入されない。
 ボタンを押下したタイミングで`85.bundle.js`のダウンロードが始まり、その後ファイルが実行され、`execute a`が挿入される。
 より具体的には、ボタンを押下すると`head`要素に`script`要素が追加される。そして読み込みが終わると、追加された`script`要素は削除される。

![[20201201050742.gif]]

ダウンロードは一度のみ行われるので、ボタンを複数回押下しても重複してダウンロードされることはない。

今回は JavaScript のダウンロードに`3`秒かかるようにしているので却って使い勝手が悪くなったが、コード分割を上手く使うことで、「ページロード時は必要最低限の JavaScript コードだけを読み込み、それ以外のコードは必要になったタイミングで読み込む」ということが可能になる。

### prefetch

先程の例では、ボタンを押下したタイミングで`85.bundle.js`のダウンロードが開始されるため、ボタンを押下してからアラートが表示されるまで、必ず`3`秒以上かかってしまう。`prefetch`を使うことで、この問題を解決できる。

`/* webpackPrefetch: true*/`というコメントを追加することで、`prefetch`が有効になる。

```plain text
 const elem = document.createElement('button');
 elem.textContent = 'click';
 elem.addEventListener('click', () => {
-  import('./a.js').then(res => {
+  import(/* webpackPrefetch: true*/ './a.js').then(res => {
     alert(res.a);
   })
 })

```

`index.bundle.js`のダウンロードと実行が終わったタイミングで`<link rel="prefetch" as="script" href="/85.bundle.js">`が追加され、`85.bundle.js`のダウンロードが開始される。
 ページの初期化に必要な`index.bundle.js`の実行をまず行い、それが終わったら`85.bundle.js`をダウンロードしておく。
 こうすることで、ページの読み込みを最適化しつつ、ボタンを押下した時の待ち時間を短縮できる。

事前に行われるのはダウンロードのみで実行はされない。ボタンを押下したタイミングで、ファイルが実行されて`execute a`が挿入される。

![[20201201050840.gif]]

### 分割されたファイルに名前をつける

デフォルトだと、先程の`85.bundle.js`のように数字がファイル名になる。
 このままだと分かりづらいので、設定を変えていく。

まず、`webpack.config.js`の`optimization.chunkIds`を`'named'`にすると、パスに基づいて自動的に名前がつけられる。

```plain text
     }),
     new CleanWebpackPlugin(),
   ],
+  optimization: {
+    chunkIds: 'named'
+  }
 }

```

今回の例の場合、`output.filename`の設定と合わさって、`src_a_js.bundle.js`という名前になる。

通常のバンドルファイルとは別のルールを適用させたい場合は、`output.chunkFilename`を使う。
 以下のようにすると、`src_a_js.foo.js`という名前になる。

```plain text
   },
   output: {
     filename: '[name].bundle.js',
+    chunkFilename: '[name].foo.js',
     path: path.resolve(__dirname, 'dist'),
     publicPath: '/',
   },

```

`chunkFilename`には関数を渡すことも可能。
 以下の場合は`src~a~js.async.js`という名前になる。

```plain text
   },
   output: {
     filename: '[name].bundle.js',
-    chunkFilename: '[name].foo.js',
+    chunkFilename: (pathData) => {
+      return pathData.chunk.id.replace(/_/g, '~') + '.async.js';
+    },
     path: path.resolve(__dirname, 'dist'),
     publicPath: '/',
   },

```

Dynamic Import に`webpackChunkName`というコメントを書くことで、個別に名前をつけることもできる。
 この場合、`optimization.chunkIds`の設定は無視される。
 以下のようにすると、先程の`chunkFilename`の設定と合わさって`x~y-z.async.js`という名前になる。

```plain text
import(/* webpackChunkName: 'x_y-z', webpackPrefetch: true*/ './a.js')

```

## ライブラリのコードを別のファイルに分割する

エントリポイントが複数ありそれぞれで同じライブラリを使っていた場合、重複してバンドルされ、バンドルファイルが肥大化してしまう。
 コード分割は、これを回避するためにも使われる。

以降は、React アプリを作って動作確認していく。

まず、`package.json`を以下の内容にする。
 必要なライブラリをインストールする他、`build`コマンドに`--analyze`オプションをつけてバンドル結果を見れるようにした。

```plain text
{
  "name": "chunk",
  "license": "MIT",
  "scripts": {
    "start": "nodemon server.js",
    "build": "NODE_ENV=production webpack --analyze"
  },
  "devDependencies": {
    "@babel/core": "^7.12.7",
    "@babel/preset-react": "^7.12.7",
    "babel-loader": "^8.2.1",
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^5.0.0-alpha.14",
    "nodemon": "^2.0.6",
    "webpack": "^5.6.0",
    "webpack-bundle-analyzer": "^4.1.0",
    "webpack-cli": "^4.2.0"
  },
  "dependencies": {
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  }
}

```

次に、`webpack.config.js`。
 JavaScript ファイルを Babel で処理するようにした他、エントリポイントに`another`を追加した。

```plain text
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
  entry: {
    index: './src/index.js',
    another: './src/another.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      scriptLoading: 'defer',
    }),
    new HtmlWebpackPlugin({
      filename: 'another.html',
      chunks: ['another'],
      scriptLoading: 'defer',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    chunkIds: 'named'
  }
}

module.exports = config;

```

`babel.config.js`は以下のようにした。

```plain text
module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development',
        'runtime': 'automatic'
      }
    ]
  ]
};

```

最後に、`server.js`に以下の変更を加えて、`/another`のルーティングを追加する。

```plain text
         res.end();
       })
       break;
+    case /^\/another$/.test(req.url):
+      fs.readFile('./dist/another.html', 'utf-8', (err, data) => {
+        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
+        res.write(data);
+        res.end();
+      })
+      break;
     case /\.js$/.test(req.url):
       fs.readFile(`./dist${req.url}`, 'utf-8', (err, data) => {
         setTimeout(() => {

```

環境は整ったので、早速コードを書いていく。

```plain text
// src/index.js
import {render} from 'react-dom';

const App = () =>
  <div>
    index<br />
    <a href="/another">to another</a>
  </div>;

render(<App />, document.body);

```

```plain text
// src/another.js
import {render} from 'react-dom';

const App = () =>
  <div>
    another<br />
    <a href="/">to index</a>
  </div>;

render(<App />, document.body);

```

この状態でビルドすると`index.bundle.js`と`another.bundle.js`が出力されるが、両方に`react`や`react-dom`が含まれてしまい、無駄が生まれている。

![[20201201050056.png]]

`http://localhost:8080/`から`http://localhost:8080/another`に遷移した場合、ライブラリのコードが二重に読み込まれることになる。

`webpack.config.js`の`optimization.splitChunks.chunk`を`'all'`に設定すると、ライブラリのコードを自動的に分割してくれるようになる。

```plain text
     new CleanWebpackPlugin(),
   ],
   optimization: {
-    chunkIds: 'named'
+    chunkIds: 'named',
+    splitChunks: {
+      chunks: 'all',
+    },
   }
 }

```

これでビルドした結果が以下。

![[20201201050048.png]]

`vendors-node_modules_react-dom_index_js-node_modules_react_jsx-runtime_js.bundle.js`が生成され、ライブラリのコードはそこに含まれている。`index.bundle.js`と`another.bundle.js`からはライブラリのコードが取り除かれているため、重複が解消されている。
 ライブラリのバンドルコードをキャッシュさせるなどすれば、パフォーマンスの向上が見込める。

なお、この設定を行うと、エントリポイントがひとつしかない場合でも、ライブラリのコードを分割してくれる。

HTML Webpack Plugin はコード分割に対応しているため、自動的に以下の`script`要素を`index.html`に挿入してくれる。
 分割したファイルを手動で読み込ませる必要はない。

```plain text
<script defer="defer" src="/vendors-node_modules_react-dom_index_js-node_modules_react_jsx-runtime_js.bundle.js"></script>
<script defer="defer" src="/index.bundle.js"></script>

```

### 名前付け

`optimization.splitChunks.name`で、ファイル名を指定できる。
 以下では`foo`と指定しているので、`output.filename`の設定と組み合わさり、`foo.bundle.js`という名前になる。

```plain text
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
      name: 'foo',
    },
  }

```

以降の例では、`optimization.splitChunks.name`は何も設定せずにビルドしている。

### 使用状況に応じたコードの分割

先程の例では、両方のエントリポイントが同じライブラリに依存していた。
 では、片方のエントリポイントのみが依存しているライブラリがある場合は、どうなるのか。

`lodash`をインストールし、それを`src/index.js`でのみ使うようにすることで、確認してみる。

```plain text
import {render} from 'react-dom';
import _ from 'lodash';

const App = () =>
  <div>
    another<br />
    {`${_.join(['Hello', 'webpack'], '-')}`}<br />
    <a href="/">to index</a>
  </div>;

render(<App />, document.body);

```

この状態でビルドすると、`vendors-node_modules_react-dom_index_js-node_modules_react_jsx-runtime_js.bundle.js`の他に、`vendors-node_modules_lodash_lodash_js.bundle.js`が生成される。

![[20201201050028.png]]

後者は、`http://localhost:8080/`にアクセスしたときにのみ、読み込まれる。

```plain text
<!-- http://localhost:8080/ -->
<script defer="defer" src="/vendors-node_modules_react-dom_index_js-node_modules_react_jsx-runtime_js.bundle.js"></script>
<script defer="defer" src="/vendors-node_modules_lodash_lodash_js.bundle.js"></script>
<script defer="defer" src="/index.bundle.js"></script>

```

```plain text
<!-- http://localhost:8080/another -->
<script defer="defer" src="/vendors-node_modules_react-dom_index_js-node_modules_react_jsx-runtime_js.bundle.js"></script>
<script defer="defer" src="/another.bundle.js"></script>

```

このように、webpack が最適な形で分割してくれる。

### cacheGropes.***.test で、分割するライブラリを指定する

再びエントリポイントを`src/index.js`のみにして、ビルドしてみる。
 そうすると、`index.bundle.js`と、全てのライブラリのコードを含むバンドルファイルが、生成される。
 この挙動は既に説明した通りである。

![[20201201050018.png]]

`cacheGropes.***.test`を使うと、ライブラリを一緒くたにまとめてしまうのではなく、指定したライブラリだけを分割することが可能になる。

例えば、`react-dom`と`lodash`を分割したい場合は、以下のように書く。
 パスの区切り文字を`[\\/]`にしているのは、クロスプラットフォームに対応するため。

```plain text
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        reactDom: {
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
          name: 'react_dom',
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: 'lodash',
        }
      }
    },
  }

```

この状態でビルドすると、`index.bundle.js`の他に、`react_dom.bundle.js`と`lodash.bundle.js`が生成される。

![[20201201045923.png]]

`react-dom`と`lodash`だけがそれぞれに分割され、それ以外のライブラリは`index.bundle.js`に含まれている。