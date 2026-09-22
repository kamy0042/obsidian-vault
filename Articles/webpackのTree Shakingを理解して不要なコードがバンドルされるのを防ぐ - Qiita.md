---
URL: https://qiita.com/soarflat/items/755bbbcd6eb81bd128c4
Updated: 2021-11-06T22:49:00
Created: 2021-09-03T20:53:00
Tags: [topic/技術/ビルドツール]
---
webpack の Tree Shaking に関する備忘録です。以下を目的とした記事になります。

- Tree Shaking とは何か、なぜ Tree Shaking をするのかを理解する
- webpack を利用して Tree Shaking するためにはどうすれば良いのかを理解する
- Tree Shaking 以外の「デッドコードをバンドルさせない」ための手段を理解する

解説に利用しているコードの最終形態は GitHub 上にあります（[hira777/webpack-tree-shaking-example](https://github.com/hira777/webpack-tree-shaking-example)）。

webpack を理解していることを前提とした記事ですので、基礎知識を習得したい方は [webpack 4 入門](https://qiita.com/soarflat/items/28bf799f7e0335b68186)をご覧ください。

## Tree Shaking とは

- webpack などでファイルをバンドルする際に、デッドコード（利用されていない不要なコード）を除去してファイルを出力すること
- デッドコードを除去する機能のこと

そのため、以下の言葉の意味は大体同じ。

- 「Tree Shaking する」=「デッドコードを除去する」
- 「Tree Shaking を利用する」=「デッドコードを除去する機能を利用する」

webpack や Rollup などのモジュールバンドラに Tree Shaking 機能が備わっている。

### なぜ Tree Shaking するのか（Tree Shaking を利用するのか）

- デッドコードを除去することにより、不要なコードがバンドルされるのを防ぐため（ファイルサイズが無駄に増加するのを防ぐため）

### Tree Shaking は必ず利用した方が良いのか

Tree Shaking 以外にも「デッドコードをバンドルさせない」ための手段はあるため、あくまで手段の一つという認識で問題ない（別の手段は後述）。

## webpack を利用して Tree Shaking されたファイルを出力する

以下の条件を満たしていれば、webpack で Tree Shaking されたファイルを出力できる（そのため、こちらが意図せずとも Tree Shaking されていることもある）。

- ES2015（ES6）の`import`/`export`構文でモジュールのエクポート、インポートする
- `production`モードで実行（Tree Shaking するための設定が有効になる）

上記を満たしたファイルを準備し、Tree Shaking されたファイルを出力してみる。

```plain text
.
├── dist
│   └── bundle.js
├── package.json
├── src
│   ├── index.js
│   └── modules.js
└── webpack.config.js

```

### 各ファイルの詳細

### `package.json`

package.json

```plain text
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "devDependencies": {
    "webpack": "^4.14.0",
    "webpack-cli": "^3.0.2"
  }}
```

上記の`package.json`が存在する階層で以下のコマンドを実行すれば、必要なパッケージ（モジュール）をインストールできる。

or

### `webpack.config.js`

Tree Shaking するために`mode: 'production'`を指定する。

webpack.config.js

```plain text
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};

```

### `index.js`

`modules.js`の`moduleB`をインポートして利用しているエントリーポイント。

index.js

```plain text
import { moduleB } from './modules';

moduleB();

```

**Tree Shaking するためには、ES2015（ES6）の**`**import**`**/**`**export**`**構文で記述をする必要がある**。そのため、`**require()**`**でモジュールをインポートしても Tree Shaking されない**ので注意。

### `modules.js`

複数のモジュールをエクスポートしているファイル。

modules.js

```plain text
// どこにもインポートされていないため、デッドコード
const moduleA = () => {
  console.log('moduleA');
  console.log('moduleA');
  console.log('moduleA');
  console.log('moduleA');
  console.log('moduleA');
};

const moduleB = () => {
  console.log('moduleB');
  console.log('moduleB');
  console.log('moduleB');
  console.log('moduleB');
  console.log('moduleB');
};

export { moduleA, moduleB };

```

前述の通り、`import`/`export`構文で記述をする必要があるため、`**exports**`**でモジュールをエクスポートしても Tree Shaking されない**ので注意。

今回、`index.js`でインポートされているのは`moduleB`だけなので、`**moduleA**`**がデッドコードになる**。

上記構成の`webpack.config.js`が存在する階層で`webpack --display-used-exports`コマンドを実行すれば、Tree Shaking されたファイル（`bundle.js`）が出力される。

```plain text
webpack --display-used-exports

# 以下のような出力がされる
Hash: 81de0f15f0b44482d5cf
Version: webpack 4.14.0
Time: 220ms
Built at: 2018-07-04 20:49:02
    Asset      Size  Chunks             Chunk Names
bundle.js  1.04 KiB       0  [emitted]  main
[0] ./src/index.js + 1 modules 544 bytes {0} [built]
    | ./src/index.js 223 bytes [built]
    | ./src/modules.js 321 bytes [built]
    |     [only some exports used: moduleB]

```

- `-display-used-exports`オプションを利用すれば、Tree Shaking されているか確認できる。`modules.js`の`moduleB`のみをインポートしているため、`[only some exports used: moduleB]`が出力される。

また、出力される`bundle.js`は以下の通り。

bundle.js

```plain text
!function(e){var o={};function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(o){return e[o]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o,t){"use strict";t.r(o);console.log("moduleB"),console.log("moduleB"),console.log("moduleB"),console.log("moduleB"),console.log("moduleB")}]);

```

`console.log('moduleA');`の記述はないため、Tree Shaking されている（デッドコードである`moduleA`が除去されている）ことがわかる。

というわけで、webpack を利用して Tree Shaking されたファイルを出力できた。

## `babel-loader`を利用して Tree Shaking されたファイルを出力する際の注意点

webpack を利用して Tree Shaking されたファイルを出力できたが、`babel-loader`を利用する場合、**設定次第では Tree Shaking されていないファイルが出力されるため注意**。

どのような設定にすれば、Tree Shaking されたファイルが出力されるのか確認してみる。

### `babel-loader`を利用するために必要なパッケージをインストール

or

### `webpack.config.js`に`babel-loader`を利用するための記述を追加する

webpack.config.js

```plain text
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  mode: 'production',
};

```

### Babel の設定ファイルである`.babelrc`を `webpack.config.js`と同じ階層に作成する

.babelrc

```plain text
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]}
```

`**"modules": false**`**を記述しないと、**`**import**`**/**`**export**`**構文が別の構文に変換されてしまうため、 Tree Shaking されなくなる**。

そのため、必ず記述する。

### `.babelrc`に`"modules": false`を記述してファイルを出力する

上記の設定で`webpack --display-used-exports`コマンドを実行すれば、以下のような出力がされる。

```plain text
webpack --display-used-exports

# 以下のような出力がされる
Hash: 2fbecc0c60bb0018e77a
Version: webpack 4.14.0
Time: 1042ms
Built at: 2018-07-04 21:09:06
    Asset      Size  Chunks             Chunk Names
bundle.js  1.04 KiB       0  [emitted]  main
[0] ./src/index.js + 1 modules 588 bytes {0} [built]
    | ./src/index.js 222 bytes [built]
    | ./src/modules.js 366 bytes [built]
    |     [only some exports used: moduleB]

```

Tree Shaking されたファイルが出力された。

### `.babelrc`に`"modules": false`を記述せずにファイルを出力する

`.babelrc`に`"modules": false`を記述せずに`webpack --display-used-exports`コマンドを実行すれば、以下のような出力がされる。

```plain text
webpack --display-used-exports

# 以下のような出力がされる
Hash: 3f29224989943d0f6723
Version: webpack 4.14.0
Time: 313ms
Built at: 2018-07-04 21:10:07
    Asset      Size  Chunks             Chunk Names
bundle.js  1.29 KiB       0  [emitted]  main
[0] ./src/modules.js 471 bytes {0} [built]
[1] ./src/index.js 251 bytes {0} [built]

```

`**bundle.js**`**のサイズが 1.04KB から 1.29KB に増えており、**`**[only some exports used: moduleB]**`**も出力されていない。**

また、出力される`bundle.js`は以下の通り。

bundle.js

```plain text
!function(e){var o={};function n(t){if(o[t])return o[t].exports;var l=o[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var l in e)n.d(t,l,function(o){return e[o]}.bind(null,l));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=1)}([function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});o.moduleA=function(){console.log("moduleA"),console.log("moduleA"),console.log("moduleA"),console.log("moduleA"),console.log("moduleA")},o.moduleB=function(){console.log("moduleB"),console.log("moduleB"),console.log("moduleB"),console.log("moduleB"),console.log("moduleB")}},function(e,o,n){"use strict";(0,n(0).moduleB)()}]);

```

`**console.log('moduleA');**`**の記述があるため、Tree Shaking されていない（デッドコードである**`**moduleA**`**が除去されていない）ことがわかる**。

ということで、`babel-loader`を利用する場合、Babel の設定ファイルに`"modules": false`の記述を必ず追加する。

## 外部モジュール（`npm install`や`yarn add`したパッケージ）を Tree Shaking したファイルを出力する

一部の外部モジュールも Tree Shaking できるため、今回は lodash-es を Tree Shaking してみる。

### なぜ lodash ではなく lodash-es を 利用するのか。

**通常の**[**lodash**](https://www.npmjs.com/package/lodash)**は**`**import/export**`**構文でエクスポートされていないため、Tree Shaking できないから**。

そのため lodash を`import/export`構文でエクスポートした[lodash-es](https://www.npmjs.com/package/lodash-es)を利用する。

### lodash-es のインストール

or

### lodash-es が Tree Shaking されていないファイルを出力する

出力されたファイルサイズを比較するため、まずは Tree Shaking されていないファイルを出力する。

`index.js`に`lodash-es`をインポートする記述を追加する。

index.js

```plain text
import _ from 'lodash-es';
import { moduleB } from './modules';

moduleB();
_.map();

```

この状態で`webpack --display-used-exports`コマンドを実行すれば、以下のような出力がされる。

```plain text
webpack --display-used-exports

# 以下のような出力がされる
Hash: 4ebd051f340d11f02706
Version: webpack 4.14.0
Time: 6823ms
Built at: 2018-07-04 21:55:22
    Asset      Size  Chunks             Chunk Names
bundle.js  85.9 KiB       0  [emitted]  main
[6] (webpack)/buildin/harmony-module.js 573 bytes {0} [built]
[8] ./src/index.js + 611 modules 572 KiB {0} [built]
    | ./src/index.js 242 bytes [built]
    | ./src/modules.js 366 bytes [built]
    |     [only some exports used: moduleB]
    |     + 610 hidden modules
[9] (webpack)/buildin/global.js 489 bytes {0} [built]

```

出力された`bundle.js`のサイズは**85.9KB**。

### lodash-es が Tree Shaking されたファイルを出力する

`lodash-es`をインポートする記述を変更する。

index.js

```plain text
import { map } from 'lodash-es';
import { moduleB } from './modules';

moduleB();
map();

```

この状態で`webpack --display-used-exports`コマンドを実行すれば、以下のような出力がされる。

```plain text
webpack --display-used-exports

# 以下のような出力がされる
Hash: 913ae7a5807c6b8f5465
Version: webpack 4.14.0
Time: 1942ms
Built at: 2018-07-04 21:53:13
    Asset      Size  Chunks             Chunk Names
bundle.js  16.6 KiB       0  [emitted]  main
 [6] (webpack)/buildin/harmony-module.js 573 bytes {0} [built]
 [9] (webpack)/buildin/global.js 489 bytes {0} [built]
[10] ./src/index.js + 117 modules 82.7 KiB {0} [built]
     | ./src/index.js 210 bytes [built]
     | ./src/modules.js 366 bytes [built]
     |     [only some exports used: moduleB]
     |     + 116 hidden modules

```

出力された`bundle.js`のサイズは**16.6KB**。先ほど出力したファイルのサイズは**85.9KB** のため、lodash-es が Tree Shaking されたファイルが出力されたことがわかる。

というわけで、外部モジュールが Tree Shaking されたファイルを出力できた。

## Tree Shaking 以外の「デッドコードをバンドルさせない」ための手段

Tree Shaking は**「デッドコードを除去する」という手段で「デッドコードをバンドルさせない」という目的は果たしているだけなので、Tree Shaking 以外にも「デッドコードをバンドルさせない」ための手段はある**。

### 外部モジュールの必要なものだけインポートする

`lodash`の場合、以下のように記述すれば`lodash`全体はインポートされないため、デッドコードが含まれないファイルを出力できる。

```plain text
// `lodash/map`をインポートしているため、`lodash`全体はインポートされない
import map from 'lodash/map';

```

外部モジュールによっては「必要なものだけインポートする」こともできないため、そこは留意しておく

### babel-plugin-transform-imports を利用して`import`の記述を簡潔にする

`lodash`で必要なメソッドのみを複数インポートする場合、以下のように記述する必要がある。

index.js

```plain text
import map from 'lodash/map';
import differenceWith from 'lodash/differenceWith';
import divide from 'lodash/divide';
import drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';
import dropRightWhile from 'lodash/dropRightWhile';
import { moduleB } from './modules';

map();
differenceWith();
divide();
drop();
dropRight();
dropRightWhile();
moduleB();

```

メソッドの数だけ`import`を記述する必要があるため、面倒だしコードの見通しが悪くなる。

そのため、本来なら以下のように記述したい。

index.js

```plain text
import {
  map,
  differenceWith,
  divide,
  drop,
  dropRight,
  dropRightWhile,
} from 'lodash';
import { moduleB } from './modules';

map();
differenceWith();
divide();
drop();
dropRight();
dropRightWhile();
moduleB();

```

しかし、これだと前述の通り`lodash`全体をインポートしてしまい、デッドコードが含まれたファイルが出力されてしまう。

上記の記述でも デッドコードが含まれないように babel-plugin-transform-imports（一部の`import`の記述を変換する Babel プラグイン）を利用する。

### lodash と babel-plugin-transform-imports のインストール

or

### babel-plugin-transform-imports を有効にする

babel-plugin-transform-imports を有効にするために`.babelrc`に以下の記述を追加する。

.babelrc

```plain text
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "lodash": {
          "transform": "lodash/${member}"
        }
      }
    ]
  ]}
```

`lodash`のメソッドをインポートするための記述は`import map from 'lodash/map';`のようになるため、`"transform": "lodash/${member}"`と記述する。

### `webpack`コマンドでファイルを出力する

上記の設定で`webpack --display-used-exports`コマンドを実行すれば、以下のような出力がされる。

```plain text
webpack --display-used-exports

# 以下のような出力がされる
Hash: 88bbda292c3d7b04cd56
Version: webpack 4.15.0
Time: 1301ms
Built at: 2018-07-05 13:58:34
    Asset      Size  Chunks             Chunk Names
bundle.js  24.9 KiB       0  [emitted]  main
 [32] (webpack)/buildin/module.js 519 bytes {0} [built]
 [51] ./src/index.js + 1 modules 791 bytes {0} [built]
      | ./src/index.js 367 bytes [built]
      | ./src/modules.js 394 bytes [built]
      |     [only some exports used: moduleB]
[141] (webpack)/buildin/global.js 509 bytes {0} [built]
    + 152 hidden modules

```

出力された`bundle.js`のサイズは**24.9KB**。

`lodash`全体をインポートして出力されるファイルのサイズは**70.6KB**のため、デッドコードが含まれていないファイルを出力できた。

### `preventFullImport`でモジュール全体がインポートされるのを防ぐ

babel-plugin-transform-imports には`preventFullImport`という設定項目があり、以下のように`"preventFullImport": true`を指定すると、モジュール全体がインポートされるのを防ぐ。

.babelrc

```plain text
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "lodash": {
          "transform": "lodash/${member}",
          "preventFullImport": true
        }
      }
    ]
  ]}
```

上記の設定で`index.js`を以下のように変更する

そして`webpack --display-used-exports`コマンドを実行すると、以下のようなエラーが出力してファイルが出力されない。

```plain text
Hash: cad8881fdbd6cd207941
Version: webpack 4.15.0
Time: 445ms
Built at: 2018-07-05 13:59:43
 1 asset
[0] ./src/index.js 3.01 KiB {0} [built] [failed] [1 error]

ERROR in ./src/index.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: /Users/mac/GitHub/webpack-tree-shaking-example/src/index.js: babel-plugin-transform-imports: import of entire module lodash not allowed due to preventFullImport setting

```

### babel-plugin-transform-imports を利用して React-Bootstrap の`import`の記述を簡潔にする

React-Bootstrap の必要なものだけインポートするためには、以下のような記述になる。

index.js

```plain text
import Row from 'react-bootstrap/lib/Row';
import MyGrid from 'react-bootstrap/lib/Grid';
import {
  map,
  differenceWith,
  divide,
  drop,
  dropRight,
  dropRightWhile,
} from 'lodash';
import { moduleB } from './modules.js';

moduleB();

```

babel-plugin-transform-imports を利用して、以下のように記述してもデッドコードが含まれていないファイルを出力する。

index.js

```plain text
import { Row, Grid as MyGrid } from 'react-bootstrap';
import {
  map,
  differenceWith,
  divide,
  drop,
  dropRight,
  dropRightWhile,
} from 'lodash';
import { moduleB } from './modules.js';

moduleB();

```

### React-Bootstrap を利用するために必要なパッケージをインストール

or

### `.babelrc`に React-Bootstrap に関する設定を追加する

.babelrc

```plain text
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "lodash": {
          "transform": "lodash/${member}",
          "preventFullImport": true
        },
        "react-bootstrap": {
          "transform": "react-bootstrap/lib/${member}",
          "preventFullImport": true
        }
      }
    ]
  ]}
```

上記の設定で`webpack --display-used-exports`コマンドを実行すれば、以下のような出力がされる。

```plain text
webpack --display-used-exports

# 以下のような出力がされる
Hash: 022da9eab2b616389757
Version: webpack 4.15.0
Time: 2031ms
Built at: 2018-07-05 14:03:23
    Asset      Size  Chunks             Chunk Names
bundle.js  57.7 KiB       0  [emitted]  main
 [63] (webpack)/buildin/module.js 519 bytes {0} [built]
 [97] ./src/index.js + 1 modules 820 bytes {0} [built]
      | ./src/index.js 386 bytes [built]
      | ./src/modules.js 394 bytes [built]
      |     [only some exports used: moduleB]
[192] (webpack)/buildin/global.js 509 bytes {0} [built]
    + 258 hidden modules

```

ファイルサイズは**57.7KB**。

`react-bootstrap`全体をインポートして出力されるファイルのサイズは**291KB**のため、デッドコードが含まれていないファイルを出力できた。

自分の設定や`import`などの構文の記述が原因で Tree Shaking が動作していない可能性があります。

また、Tree Shaking を利用しなくても、`import`などの記述を変更するだけで不要なファイルサイズを削減できる可能性もあります。

この機会に、設定や記述を一度見直してみると良いかもしれません。

Udemy で webpack の講座を公開したり、Kindle で技術書を出版しています。

Udemy:[webpack 最速入門](https://www.udemy.com/course/practical-webpack/?couponCode=2641C1AAF53A48CDDFC9)（**10,800 円 -> 2,400 円**）

Kindle（Kindle Unlimited だったら無料）:[React 実践入門](https://www.amazon.co.jp/dp/B088ZMFPFV/)（500 円）[React Hooks 入門](https://www.amazon.co.jp/gp/product/B08JTXQ2M6)（500 円）

興味を持ってくださった方はご購入いただけると大変嬉しいです。よろしくお願いいたします。

![[qiitan-for-prompt-login-modal-014e085d3e40a240e3fe8d61b70b29a9 2.png]]

Why not register and get more from Qiita?

1. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
2. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fsoarflat%2Fitems%2F755bbbcd6eb81bd128c4&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fsoarflat%2Fitems%2F755bbbcd6eb81bd128c4&realm=qiita)