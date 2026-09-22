---
URL: https://qiita.com/d0ne1s/items/4e8130292fefd76107bb
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
webpack、ようやくちゃんと触ってみました。

私は主に、Railsアプリ作成と静的ページのコーディングをしています。
今後はJavaScriptもゴリゴリ書いていきたいと思っているので、webpackの事始めとしてまずはコーディングの環境を作ってみました。

## webpackでできること

コーダー目線で考える、webpackでできることは以下の通りです。

- ローカルサーバーを立てる
- ホットリロード（ファイルを変更した時にブラウザが自動でリロードされる）
- Sassのコンパイル
- Pugのコンパイル
- 画像ファイルの圧縮
- CSSのminify
- CSS、画像ファイル等の名前を変えることで、キャッシュが残って変更が反映されない問題を防ぐ
- コーディングに必要なライブラリをpackage.jsonで管理する
- swiper(スライドショー)とか、chart.js(グラフ)とか

webpackがなくてもできそうなことも多いですね。
でも今の時代、JavaScriptが絡んでくるとwebpackが採用される可能性がかなり高いので、今後も積極的に使っていこうと思います。

## 導入

### 前提

`node.js`がインストールされている。

`$ node -v
# v13.11.0`

### ディレクトリを作成

以下のような構成を作ります。後のコマンドで自動で生成されないものは、手動で作っておきましょう。

`dist                \#ビルドの結果が格納される。基本触らない
src                 \#ソースを格納
 ├── images/          # 画像
 ├── javacscripts/    # Javarcript
 ├── stylesheets/     # Sass
 ├── templates/       # Pug
node_modules
package.json
package-lock.json
webpack.config.js`

terminal

`$ mkdir src
$ mkdir src/images
$ mkdir src/javascripts
$ touch src/javascripts/index.js
$ mkdir src/stylesheets
$ mkdir src/templates`

### `webpack.config.js`を作成

webpack.config.js

`const path = require('path');

module.exports = {
  mode: 'production',
  // devtool: 'eval-source-map',
  entry: {
    main: './src/javascripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/[name]-[hash].js',
  },
  module: {
    rules: [],
  },
  plugins: [],
};`

### webpack本体を導入

`$ npm init -y
$ npm install --save-dev webpack webpack-cli
$ npx webpack --mode=development`

### gitでの管理を開始

`$ git init
$ touch .gitignore`

.gitignore

`node_modules/
dist/`

`$ git add -A
$ git commit -m "First commit"`

### Pugを導入

`$ npm install --save-dev html-webpack-plugin html-loader pug-html-loader`

webpack.config.js

`const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
//省略
  module: {
    rules: [
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
  ],
};`

`$ touch src/templates/index.pug
$ npx webpack --mode=development`

### Sassを導入

`$ npm install --save-dev css-loader sass-loader node-sass mini-css-extract-plugin`

webpack.config.js

`const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//省略
module.exports = {
//省略
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
//省略
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name]-[hash].css',
    }),
//省略
  ],
};`

`$ touch src/stylesheets/style.scss`

src/javascripts/index.js

`import '../stylesheets/main.scss';`

`$ npx webpack --mode=development`

### 画像の読み込み、圧縮

`$ npm install --save-dev file-loader image-webpack-loader`

webpack.config.js

`//省略
const imageRoot = '/'
//サブディレクトリにデプロイする場合、ディレクトリ名を指定
//画像のパスを正しく設定できるように
//const imageRoot = '/projectA/20200415/dist'

module.exports = {
//省略
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
//省略
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name]-[hash].[ext]',
              publicPath: imageRoot,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.pug/,
//省略`

`src/images/`に適当な画像ファイルを配置 → pugファイルから読み込んで

`$ npx webpack --mode=development`

`dist/images/`中の画像ファイルが圧縮されていれば成功。

### ローカルサーバーで開発

- ローカルサーバーを使った開発
- ホットリロード
- ビルド前にdistディレクトリの中身を自動で削除する

この3つを実装します。

`$ npm install --save-dev clean-webpack-plugin webpack-dev-server`

webpack.config.js

`const path = require('path');
//省略
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
//省略
  plugins: [
//省略
    new CleanWebpackPlugin(),
  ],
};`

`$ npx webpack-dev-server`

[http://localhost:8080](http://localhost:8080/)にアクセスすると、開発中のファイルを確認することができます。

### npm scriptを登録

いちいち`npx webpack --mode=development`とか打ち込むのは面倒なので。

package.json

`{
  "scripts": {
   "start": "webpack-dev-server",
    "build": "webpack",
    "build:dev": "webpack --mode=development"
  },
}`

ついでに`.zshrc`にもエイリアスを貼っておきましょう。

.zshrc

`alias ns='npm run'`

これで`npx webpack --mode=development`が`ns build:dev`に省略されました。

- ローカルサーバーを立てて開発をする時に`ns start`
- 本番で使うファイルを生成したい時に`ns build`
- 開発環境でファイルの実体を確認に`ns build:dev`

を使います。`ns start`で開発中、変更内容はすべてメモリ領域に保存され、`dist`内にファイルが出力されることはないので注意。

### Pugの編集を楽にする

今の状態だと、pugファイルを追加するたびに`webpack.config.js`に追記する必要があります。

こういうやつ

`plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/about.pug',
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/contact.pug',
      filename: 'contact.html',
    }),`

毎回追記するのはシンドいので、一括で指定できるようにしましょう。

`$ npm install --save-dev globule`

webpack.config.js

`//省略
const globule = require('globule')
//省略

//削除↓
//module.exports = {
const app = {
//省略
  plugins: [
//省略
    //削除↓
    //new HtmlWebpackPlugin({
    //  template: './src/templates/index.pug',
    //  filename: 'index.html',
    //}),
//省略
  ],
};

const templates = globule.find(
  './src/templates/**/*.pug', {
    ignore: [
      './src/templates/**/_*.pug'
    ]
  }
)

templates.forEach((template) => {
  const fileName = template.replace('./src/templates/', '').replace('.pug', '.html')
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`,
      template: template,
    })
  )
})

module.exports = app`

### Autoprefixerを導入

`$ npm install --save-dev postcss-loader autoprefixer 
$ touch .browserslistrc`

.browserslistrc

`> 0.5% in JP`

webpack.config.js

`module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
//追加ここから
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer"),
              ],
            },
          },
//追加ここまで
          {
            loader: 'sass-loader',
          },
        ],
      },`

### faviconを設定

faviconはdist直下に置く必要があるので、`copy-webpack-plugin`を使います。

`$ npm i -D copy-webpack-plugin`

webpack.config.js

`const CopyPlugin = require("copy-webpack-plugin");
//省略
  plugins: [
    //省略
    new CopyPlugin([
      {
        from: "./favicon.png",
        to: "favicon.png",
      },
    ]),
  ],`

src/templates/_layout.pug

`link(rel="icon", href="/favicon.png" type='image/png')`

### ライブラリをpackage.jsonで管理

`swiper.js`を使って、スライダーを導入してみます。

`$ npm install --save-dev swiper
$ touch src/javascripts/swiper.js
$ touch src/templates/swiper_test.pug`

src/javascripts/swiper.js

`import Swiper from 'swiper'
import 'swiper/css/swiper.css'

const options = {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}
const mySwiper = () => {
  new Swiper ('.swiper-container', options)
}
export default mySwiper`

src/javascripts/index.js

`//省略
import swiper from './swiper.js'
swiper()`

src/templates/swiper_test.pug

`.swiper-container
  .swiper-wrapper
    .swiper-slide Slide 1
    .swiper-slide Slide 2
    .swiper-slide Slide 3
  .swiper-pagination
  .swiper-button-prev
  .swiper-button-next`

バンドル時に、ファイルサイズが大きすぎる的な警告が出ました。`webpack.config.js`に以下を追記して警告を非表示にしました。

webpack.config.js

`const app = {
//省略
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  }
//省略
}`

## すぐに設定したい人向け

githubにソースをアップしたので、クローンして使ってください。[https://github.com/nyshk97/qiita-webpack-coding](https://github.com/nyshk97/qiita-webpack-coding)

`$ git clone https://github.com/nyshk97/qiita-webpack-coding.git
$ cd qiita-webpack-coding
$ npm install
$ npm run build
$ npm start`

## おまけ

プロジェクトをDropboxに配置している場合、`node_module`が共有されるとめんどくさい。`node_module`だけ同期を解除したい場合には以下のコマンドで解決。

`$ xattr -w com.dropbox.ignored 1 ~/Dropbox/<project名>/node_module`

長いのでエイリアスを貼ってます。

.zshrc

`alias dignore='xattr -w com.dropbox.ignored 1'`

`$ dignore ~/Dropbox/<project名>/node_module`

## 参考

- [Webpackでウェブサイト制作のHTML/CSS/JSコーディングを一気に効率化する実践講座 (Mac / Win) | Udemy](https://www.udemy.com/course/webpack-config/)
- [【脱gulp】webpackでpugを使う。jsonで一括ビルドも。 | 上間ウェブ店](https://uemaweb.com/tech/2331/)
- [【脱jQuery】jqueryレスの高機能スライダー"swiper"をwebpackで使う方法。複数設置例も。 | 上間ウェブ店](https://uemaweb.com/tech/2544/)