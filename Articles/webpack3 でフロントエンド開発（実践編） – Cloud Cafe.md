---
URL: http://cloudcafe.tech/?p=653
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
[webpack3 でフロントエンド開発（入門編）](http://cloudcafe.tech/?p=289) の記事で、webpack のインストールから JavaScript を動かすまでをやりましたが、今回は「実践編」として、JavaScript 以外のファイルをいろいろ読み込んでみようと思います。

プロジェクトですが、前回はフォルダを何も作成せずに進めましたが、今回はきちんとファイルの種類ごとにフォルダを分けます。以下のフォルダ構成になるように各ファイルを作成してください。

sample_app
    ├  package.json
    ├  webpack.config.js
     |
    ├  js
     |    └ index.js
     |
    ├  css
     |    └ index.css
     |
    └  html
          └ index.html

**index.html**

**index.js**
空

**index.css**
空

**package.json**

```plain text
{
  "name": "sample_app",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server -d"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.1",
    "babel-preset-es2015": "^6.24.1",
    "webpack": "^3.5.4",
    "webpack-dev-server": "^2.7.1"
  }
}

```

**webpack.config.js**

```plain text
module.exports = {
  entry:  './js/index.js',
  output: {
    path: __dirname + '/build', // build 用のフォルダを設定
    filename: 'js/index.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  }
}

```

動作確認には webpack-dev-server を使用します。 webpack-dev-server は内部的にサーバを起動していて、ポート8080で動作しています。-d のオプションがついていますが、これは--debug --devtool eval-cheap-module-source-map --output-pathinfo の省略形で、ブラウザからソースを見る時に圧縮前のソースをみたりすることができて便利です。

publicPath は、style や link タグなどでファイルを読み込む時のURLになります。何も指定しないとプロジェクト直下を読みにいきますが、今回のようにビルド用のフォルダを設定する場合は、ファイル読み込み時のパスもそのディレクトリを指すように設定します。output.path に 「__dirname + /build」と設定しているので、publicPath に /build/ と設定します。すると、webpack-dev-server 上でルートパスが http://localhost:8080/build/ になり、ビルドしたファイルを読み込めるようになります。ファイルの配置場所に CDN(コンテンツデリバリネットワーク) を使用する場合は、「http://...」のようにプロトコルから指定します。

また、webpack-dev-server は webpack.config.js に従いファイルのビルドを行いますが、実際にファイルはビルド先に出力されません。これは、内部的にビルドしたファイルをメモリ上に保存しているためです。ファイルが実際にビルド先に出力されるか確かめる時は、$ npm run build を使いましょう。

※ ローカルで HTMLファイルなどをブラウザで表示する場合、PublicPath を指定すると、パスが file:///build になってしまうので読み込みエラーになります。webpack-dev-server を使うようにしましょう。

上記のフォルダ・ファイルを用意したら、 $ npm install と $ npm run dev を実行してください。この状態からスタートします。(node_modules フォルダがある場合は削除してからインストールしてください)

### CSS

CSSを読み込むためには、css-loader と style-loader を使用します。css-loader は css ファイルを解析し、style-loader は 解析した情報を元に style タグを HTML に埋め込みます。

```plain text
$ npm install --save-dev style-loader css-loader

```

webpack.config.js の module.loaders に css の読み込みを追加します。

```plain text
{
  test: /\.css$/,
  loader: ['style-loader', 'css-loader']
}

```

index.css に style を設定します。

**index.css**

```plain text
body {
  background: green;
}

```

index.js で index.css を読み込みます。

**index.js**

```plain text
import '../css/index.css'

```

これで完了です。webpack.config.js の設定を読み込ませるためには、一度 webpack-dev-server を再起動します。(Macの場合、webpack-dev-server を実行したコンソール上で ctrl + c で停止し、もう一度 $ npm run dev を実行します)

http://localhost:8080/html/index.html にアクセスしてみましょう。ページが緑色になるはずです。HTMLの中身を見てみると、head タグに以下の style タグが追加されていると思います。

### 拡張子を省略しよう

index.js で css を読み込む時に、'../css/index.css' のように拡張子をつけていますが、これを毎回つけるのは少し手間だと思うので、以下の設定で自動的に webpack 側で拡張子を解決するようにしましょう。

**webpack.config.js**

```plain text
module.exports =
  ...,
  resolve: {
    extensions: ['.js', '.css']
  }
}

```

index.js を以下のように書き換えます。

**index.js**

```plain text
import '../css/index'

```

webpack-dev-server を再起動して、HTML がエラーなく表示されるのを確認しましょう。

### ルートパスを設定しよう

index.js で css を読み込む時に、'../css/index' のように、index.js からの相対パスで記述していますが、これも毎回相対パスを考えるのはめんどうなので、プロジェクトのルートパスを設定し、'css/index' で設定できるようにしましょう。

**webpack.config.js**

```plain text
resolve: {
  extensions: ['.js', '.css'],
  modules: [__dirname, 'node_modules'] // 'node_modules' がいるので注意
}

```

index.js を以下のように書き換えます。

**index.js**

```plain text
import 'css/index'

```

webpack-dev-server を再起動して、HTML がエラーなく表示されるのを確認しましょう。

### ビルド後の出力ファイルを CSS と JavaScript で分けよう

現在は HTML で build/js/index.js のみ読み込むようにしていますが、build/js/index.js と build/css/index.css を作成するようにして、style タグを挿入するのではなく css ファイルを読み込む形にしたいと思います。

output ではすでに JavaScript の出力設定をしているので、css を別ファイルに出力する設定は ExtractTextPlugin というプラグインを使用します。

```plain text
$ npm install --save-dev extract-text-webpack-plugin

```

設定は以下のように行います。

**webpack.config.js**

```plain text
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  ...,
  plugins: [
    new ExtractTextPlugin('css/index.css') // 出力先を設定. output.filename に当たります
  ],
  module: {
    loaders: [
      ...,
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader') // style-loaderを削除
      }
    ]
  }
}

```

**index.html**

webpack-dev-server を再起動して、HTML がエラーなく表示されるのを確認しましょう。

### JavaScript / CSS を圧縮しよう

JavaScript の圧縮には uglifyjs-webpack-plugin、CSS の圧縮にはcssnano を使用します。

```plain text
$ npm install --save-dev uglifyjs-webpack-plugin cssnano 

```

**webpack.config.js**

```plain text
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  ...,
  plugins: [
    new UglifyJSPlugin(),
    ...,
  ],
  module: {
    loaders: [
      ...,
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize') // css-loader に minimize のオプションを付与します
      }
    ]
  }
}

```

$ npm run dev ではわからないので、$ npm run build を実行し、出力した JavaScript / CSS ファイルが圧縮されているか確認しましょう。

### 複数の JavaScript/CSS をビルドしよう

現在は index.js と index.css というファイルをビルドしているだけですが、HTMLの数を1つ増やし、それぞれ別の JavaScript / CSS を読み込むようにしてみましょう。

フォルダ構成を以下のようにします。

sample_app
   ├  js
    |    ├ index.js
    |    └ another.js
    |
   ├  css
    |     ├ index.css
    |     └ another.css
    |
   └  html
          ├ index.html
          └ another.html

出力先の設定を変更します。

**webpack.config.js**

```plain text
module.exports = {
  // entry をオブジェクトにすると、出力されるファイルも複数になります
  // cf. 配列にすると、 main.js という1つのファイルとなって出力されます
  entry: {
    index: './js/index.js',
    another: './js/another.js'
  },
  output: {
    ...,
    filename: 'js/[name].js', // [name]には、元のファイル名が自動的に入ります
    ...,
  },
  ...,
  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ],
  ...
}

```

以下の新しいファイルを用意します。

**another.html**

**another.js**

```plain text
import 'css/another'

```

**another.css**

```plain text
body {
  background: orange;
}

```

webpack-dev-server を再起動後、 http://localhost:8080/html/index.html と
http://localhost:8080/html/another.html にアクセスし、それぞれ背景色が変わるのを確認しましょう。

### 画像

ファイルをパスで指定する file-loader と、ファイルをバイナリで読み込む url-loader があります。まずは file-loader から使ってみます。

```plain text
$ npm install --save-dev file-loader 

```

プロジェクト直下に images フォルダを作成して、その中に sample.jpg という名前の画像を置いておきます。そして、index.html を以下のように変更します。

**index.html**

次に、JavaScript ファイルで画像を読み込んで、img タグの src 属性に設定します。

**index.js**

```plain text
import 'css/index'
import sampleImg from 'images/sample.jpg'

document.getElementById('sample_img').setAttribute('src', sampleImg)

```

最後に webpack.config.js で画像を読み込む設定を追加します。

**webpack.config.js**

```plain text
{
  test: /\.(jpg|png|gif)$/,
  loader: 'file-loader?name=[path][name].[ext]'
}

```

file-loader はビルド時に画像を出力して、その画像をパスで読み込みます。出力先は「name=...」で指定します。[path] は 読み込む画像のパス(/images)、[name] は画像の名前(sample)、[ext] は拡張子(jpg)を指します。$ npm run build をすると、output.path のフォルダに、/images/sample.jpg が出力されるのが確認できると思います。

では、webpack-dev-server を再起動して http://localhost:8080/html/index.html にアクセスしてみましょう。画像が表示されるはずです。

今度は url-loader を使ってみます。

```plain text
$ npm install --save-dev url-loader 

```

あとは webpack.config.js で使用するローダを変えるだけです。

**webpack.config.js**

```plain text
{
  test: /\.(jpg|png|gif)$/,
  loader: 'url-loader'
}

```

webpack-dev-server を再起動して HTMLを開いてみると、同じように画像が表示されるはずです。HTML の中身を見てみると、img タグが「src="data:image/jpeg;base64 ...」というように、パスではなくバイナリで読み込まれているのがわかります。

### Webfont

Webfont は url-loader を使用します。フォントファイルは種類によって Mime タイプが決まっているので、明示的に指定してあげましょう（なくても拡張子に従って暗黙的に解釈されますが、あったほうが正確です）。

```plain text
{
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url-loader?mimetype=image/svg+xml'
},
{
  test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url-loader?mimetype=application/font-woff'
},
{
  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url-loader?mimetype=application/vnd.ms-fontobject'
},
{
  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url-loader?mimetype=application/x-font-ttf'
}

```

今回は Google の material-design-icons を利用してみます。

```plain text
$ npm install --save material-design-icons

```

index.html を以下のようにしてフォントを使用します。

**index.html**

index.js でフォントを読み込みます。モジュールのパスは、インストールされた
 node_moduels/material-design-icons フォルダの中から css ファイルを探し出して指定します。

**index.js**

```plain text
import 'material-design-icons/iconfont/material-icons'

```

これでフォントが表示されるはずです。

### 本番環境に向けて

開発時は webpack-dev-server を利用することが多いと思いますが、本番では $ npm run build でビルドしたファイルを HTML で読み込ませることになります。ここで、build コマンドを何回叩いても同名のファイルが同じ場所に出力されるわけですが、同名のファイルはWebサーバがキャッシュしてしまい、リロードしても新しいソースが反映されない場合があります。

そこで、ビルドする度にファイル名にランダムのハッシュ値をつけて、ファイル名が毎回異なるようにしてみます(ハッシュ値はファイルに変更がなければ前回と同じになります)。

**webpack.config.js**

```plain text
module.exports = {
  ...,
  output: {
    ...,
    filename: 'js/[name]-[hash].js',
    ...
  },
  plugins: [
    ...,
    new ExtractTextPlugin('css/[name]-[hash].css')
  ],
  module: {
    loaders: [
      ...,
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=[path][name]-[hash].[ext]'
      },
    ]
  }
}

```

[hash] とつけると、自動的にランダムのハッシュ値をつけてくれます。$ npm run build で確かめてみましょう。

ここで、現在のハッシュ値が何なのかを別ファイルで出力する webpack-manifest-plugin というプラグインがあるのでご紹介します。

```plain text
$ npm install --save-dev webpack-manifest-plugin

```

webpack.config.js に設定を追加します。

**webpack.config.js**

```plain text
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  ...,
  plugins: [
    new ManifestPlugin(),
    ...
  ],
}

```

再度 $ npm run build を実行すると、build フォルダの直下に manifest.json が生成され、中身を開くと各ファイルのハッシュ情報が表示されます。HTML でファイルを読み込む時は、このファイルと照合するようにすると便利です。

また、ハッシュ値はファイルの内容が変わる度に異なるものが生成されますが、build フォルダに出力されたファイルは消えるわけではありません。これだとファイルが溜まる一方なので、ビルド時に出力先フォルダの中身を空にするプラグイン clean-webpack-plugin も使いましょう。

```plain text
$ npm install --save-dev clean-webpack-plugin

```

webpack.config.js に設定を追加します。

**webpack.config.js**

```plain text
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  ...,
  plugins: [
    new CleanWebpackPlugin(['build']), // フォルダを配列で指定します
    ...
  ],
}

```

再度 $ npm run build を実行して、出力前に build フォルダの中身が削除されていることを確認しましょう。

さて、ここでお気づきの方もいらっしゃるかと思いますが、$ npm run dev で HTML を開くとエラーになると思います。これは、出力ファイルがハッシュ値がついたものになっているものの、現在の HTML ではまだハッシュ値付きのファイル名になっていないからです。ハッシュ値をつけるのは本番時のみで開発時には必要ないので、本番用と開発用で処理を分けてみましょう。

$ npm run build をする時に、変数を渡してみます。

**package.json**

```plain text
"scripts": {
    "build": "NODE_ENV=production webpack"
    ...,
  },

```

これを、webpack.config.js で受け取ることができるので、それに従って処理を分けてみます。

**webpack.config.js**

```plain text
const fileName = process.env.NODE_ENV == 'production' ?  '[name]-[hash]' : '[name]'

module.exports = {
  ...,
  output: {
    ...,
    filename: `js/${fileName}.js`,
    ...
  },
  plugins: [
    ...,
    new ExtractTextPlugin(`css/${fileName}.css`)
  ],
  module: {
    loaders: [
      ...,
      {
        test: /\.(jpg|png|gif)$/,
        loader: `file-loader?name=[path]${fileName}.[ext]`
      },
    ]
  }
}

```

値は process.env.NODE_ENV で受け取れます。本番用のビルドで使用する $ npm run build の時はハッシュ値つき、開発時の $ npm run dev はハッシュ値なしの名前になるので、今度はエラーにならないはずです。

ただし、本番ではハッシュ値付きのファイル名にしないといけないので、先ほどの manifest.json  を参照するなどして、HTML で読み込むファイル名を動的に変更するようにしましょう。

以上で webpack の実践編は終了です。上記で説明したものは webpack のほんの一部の機能です。開発してみて「こうしたいな」と思うことがあれば、検索すると webpack でできることが多いと思うので、随時調べていけばより良い開発環境を構築できるはずです。

最後に、ここまで作業した上での webpack.config.js と package.json を残しておきます。モジュールもバージョンによって仕様が変わる可能性があるので注意しましょう。

**webpack.config.js**

```plain text
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const fileName = process.env.NODE_ENV == 'production' ?  '[name]-[hash]' : '[name]'

module.exports = {
  entry: {
    index: './js/index.js',
    another: './js/another.js'
  },
  output: {
    path: __dirname + '/build', // build 用のフォルダを設定
    filename: `js/${fileName}.js`,
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js', '.css'],
    modules: [__dirname, 'node_modules'] // 'node_modules' がいるので注意
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new ManifestPlugin(),
    new UglifyJSPlugin(),
    new ExtractTextPlugin(`css/${fileName}.css`) // 出力先を設定. output.filename に当たります
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize') // css-loader に minimize のオプションを付与します
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: `file-loader?name=[path]${fileName}.[ext]`
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=image/svg+xml'
      },
      {
        test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/vnd.ms-fontobject'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/x-font-ttf'
      }
    ]
  }
}

```

**package.config.js**

```plain text
{
  "name": "sample_app",
  "version": "1.0.0",
  "scripts": {
    "build": "NODE_ENV=production webpack -d",
    "dev": "webpack-dev-server"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.1",
    "babel-preset-es2015": "^6.24.1",
    "clean-webpack-plugin": "^0.1.16",
    "css-loader": "^0.28.5",
    "cssnano": "^3.10.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^0.11.2",
    "style-loader": "^0.18.2",
    "uglifyjs-webpack-plugin": "^0.4.6",
    "url-loader": "^0.5.9",
    "webpack": "^3.5.4",
    "webpack-dev-server": "^2.7.1",
    "webpack-manifest-plugin": "^1.3.1"
  },
  "dependencies": {
    "material-design-icons": "^3.0.1"
  }
}

```

[webpack](http://cloudcafe.tech/?cat=9)