---
URL: https://qiita.com/tomi_linka/items/ef66a60950939618c449
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
webpackを利用してビルドするとき、CSS内の画像をバンドルせず外部ファイルとして出力したい場合があります。
その際「CSS内に記載したいパス」と「画像ファイルを保存するディレクトリ」をそれぞれ個別に指定したいときの方法です。

## 構成

例えば、以下のようなディレクトリ構成だったとして、
root/
　├ dist/ (公開用ディレクトリ)
　│　└ asset/
　│　　└ images/ ← ここに画像ファイルを出力したい
　│　　└ css/ ← ここにCSSファイルを出力したい
　├ dev/ (開発用ディレクトリ)
　│　└ images/
　│　　└ example.png
　│　└ css/
　│　　└ example.css
　└ webpack.config.js

CSSはこんな感じです。

root/dev/css/example.css

`.sample{
    background-image: url(../images/example.png);
}`

## NG例（1）

まずNG例から示します。

root/webpack.config.js

`// --(略)--
output: {
  path: path.join(__dirname, 'dist/asset')
},
module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: "css-loader",
            })
        },
        {
            test: /\.(jpg|png|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '../images/[name].[ext]'
                    }
                }
            ]
        }
   ]
},
plugins: [
    new ExtractTextPlugin('css/[name].css')
]
// --(略)--`

これをビルドすると、CSSは

root/dist/asset/css/example.css

`.sample{
    background-image: url(../images/example.png);
}`

と予定通り出力されますが、画像ファイルはoutputのpathディレクトリを基点として../images/example.pngのパスに置かれるため、
root/dist/asset/../images/example.png
↓
root/dist/images/example.png
となり、本来ファイルを置きたい場所とズレが出てしまいます。

## NG例（2）

今度はNG例（1）を変更して、画像が正常なパスに置かれるように修正してみます。

root/webpack.config.js

`// --(略)--
output: {
  path: path.join(__dirname, 'dist/asset')
},
module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: "css-loader",
            })
        },
        {
            test: /\.(jpg|png|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }
            ]
        }
   ]
},
plugins: [
    new ExtractTextPlugin('css/[name].css')
]
// --(略)--`

これをビルドすると、画像ファイルは
root/dist/asset + images/example.png
↓
root/dist/asset/images/example.png
となり、目的の位置に出力されますが、CSSは

root/dist/asset/css/example.css

`.sample{
    background-image: url(images/example.png);
}`

となり、今度はこちらのパスがズレてしまいます。

## 成功例

file-loaderの仕様を見たところ、これらを個別に指定する方法はないのですが、**outputPath**と**publicPath**というオプションがあり、これらに**functionが使える**ことからその応用で対応できます。

root/webpack.config.js

`// --(略)--
output: {
  path: path.join(__dirname, 'dist/asset')
},
module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: "css-loader",
            })
        },
        {
            test: /\.(jpg|png|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath : 'images/',
                        publicPath : function(path){
                            return '../' + path;
                        }
                        /* es2015ならば
                        publicPath : path => '../' + path
                        で書けます。*/
                    }
                }
            ]
        }
   ]
},
plugins: [
    new ExtractTextPlugin('css/[name].css')
]
// --(略)--`

### 解説

まずoutputPathで「画像の保存先」を合わせます。
"images/" + (ファイル名).(拡張子)

次にCSSファイル内のパス指定にpublicPathを使います。
publicPathの引数（例ではpath のところ）に**outputPathを使って生成した「画像の保存先」**が渡されるので、これをベースにpublicPath で加工したものをreturnします。
"../" + "images/" + (ファイル名).(拡張子)
　↓
../images/(ファイル名).(拡張子)

これでCSS内の記述と画像保存パスを個別に指定することができました。

## 所感

ドキュメントには特に何もヒントが無かったので困っていましたが、node_modules内のfile-loaderファイルの中を見て解決できました。
他にも困っている方がいたら手助けになれば幸いです。

## 参考URL

[file-loader公式GitHub](https://github.com/webpack-contrib/file-loader)