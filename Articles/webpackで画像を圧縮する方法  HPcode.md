---
URL: https://haniwaman.com/webpack-image/
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
![](https://haniwaman.com/wp/wp-content/uploads/2020/04/webpack-image0.png)

webpackで画像を圧縮する方法です。流れとしては、**公開用フォルダに移動させてそちらのファイルを圧縮する**といった形となります。

拡張させるだけの簡単作業なのでぜひ取り入れて見てください！
なお、webpackの導入等の説明は行いませんので、もし分からない場合は以下の記事を参考にしてもらえたらと思います。

[webpackの基本的な使い方！最小構成で動作を試してみよう](https://haniwaman.com/webpack-start/)[webpackの基本的な使い方です。似たようなものにgulpがありますが、違いとしては以下のような認識です。 …](https://haniwaman.com/webpack-start/)[haniwaman.com](https://haniwaman.com/webpack-start/)

![](https://haniwaman.com/wp/wp-content/uploads/2020/04/webpack-start0.png)

![](https://haniwaman.com/wp/wp-content/uploads/2018/10/cropped-haniwa-1-32x32.png)

スポンサード リンク

目次

最初の構成ファイルとしては、以下のように配置していますので、同様に進めたい方は作成しておいてください。

- dist・・・ビルド後の出力先フォルダ
- src・・・ビルド前の出力元フォルダ
- – img・・・画像フォルダ
- — hoge.png・・・png画像
- — hoge.jpg・・・jpg画像
- — hoge.gif・・・gif画像
- — hoge.svg・・・svg画像
- index.html・・・静的HTMLファイル
- webpack.config.js・・・webpackの設定ファイル

![](https://haniwaman.com/wp/wp-content/uploads/2020/04/webpack-image4-700x193.png)

### 画像フォルダをコピーする

フォルダ、ファイルをコピーできるプラグインを導入します。

```plain text
コピーnpm install --save-dev copy-webpack-plugin

```

webpack.config.jsの設定ファイルの`plugins`に以下のように追記します。

```plain text
webpack.config.jsコピーconst CopyPlugin = require('copy-webpack-plugin');

// 中略

plugins: [
	new CopyPlugin([
		{ from: 'src/img', to: 'img' },
	]),
]
```

`from`が元の画像フォルダの場所。`to`が出力先のコピーフォルダに対応しています。
※ なお、`to`のベースとなるフォルダは`output`の`path`で指定した場所です。

実行してみると、、、

```plain text
コピーnpx webpack

```

コピーされていることが分かります！（単純なコピーです）

![](https://haniwaman.com/wp/wp-content/uploads/2020/04/webpack-image1-700x381.png)

### 画像を圧縮する

webpackで画像圧縮するための大本のプラグインを導入します。

```plain text
コピーnpm install --save-dev imagemin-webpack-plugin

```

そして各種ファイル形式に応じたパッケージおよびプラグインも導入していきます。

### png画像

pngを圧縮するための必要なパッケージ「`imagemin-pngquant`」。

```plain text
コピーnpm install --save-dev imagemin-pngquant

```

### jpg画像

jpgを圧縮するための必要なプラグイン「`imagemin-mozjpeg`」。

```plain text
コピーnpm install --save-dev imagemin-mozjpeg

```

### gif画像

gifを圧縮するための必要なパッケージ「`imagemin-gifsicle`」。

```plain text
コピーnpm install --save-dev imagemin-gifsicle

```

### svg画像

svgを圧縮するための必要なパッケージ「`imagemin-svgo`」。

```plain text
コピーnpm install --save-dev imagemin-svgo

```

webpack.config.jsに設定を追加していきましょう！`test`に対象の拡張子を書いて、それぞれの画像形式に対する圧縮の設定を行っています。

```plain text
webpack.config.jsコピーconst ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

// 中略

plugins: [
	new ImageminPlugin({
		test: /\.(jpe?g|png|gif|svg)$/i,
		pngquant: {
			quality: '65-80'
		},
		gifsicle: {
			interlaced: false,
			optimizationLevel: 1,
			colors: 256
		},
		svgo: {
		},
		plugins: [
			ImageminMozjpeg({
				quality: 85,
				progressive: true
			})
		]
	})
]
```

実際に実行してみると、、、

```plain text
コピーnpx webpack

```

変更前（src/img）が以下。

![](https://haniwaman.com/wp/wp-content/uploads/2020/04/webpack-image2.png)

圧縮後（dist/img）が以下。

![](https://haniwaman.com/wp/wp-content/uploads/2020/04/webpack-image3.png)

pngとjpgは圧縮されていることが分かります。gifとsvgは設定の問題か素材の問題か分からないところですが、出現頻度は高くないので、ひとまずはこれで運用してみます。

## おわり

プラグインを拡張すれば画像のコピーおよび圧縮が容易にできることが分かりました。

まとめると以下の2つを導入すればOKです！

- `copy-webpack-plugin`でフォルダごとコピーして本番用フォルダへ移動
- `imagemin-webpack-plugin`で各種画像形式の圧縮ツールを取りまとめる

画像の圧縮も手作業だととても手間がかかる作業なので、webpack等で自動化できるととても捗ります。

スポンサード リンク