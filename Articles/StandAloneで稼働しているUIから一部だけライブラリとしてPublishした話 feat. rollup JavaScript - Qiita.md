---
タグ: []
作成日時: 2024-03-07T16:56:00
URL: https://qiita.com/NOUV/items/981f66030c2f3d428114
Tags: [topic/デザインシステム/配信基盤]
---
![[https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-9f5428127621718a910c8b63951390ad 2.png]]

所属プロジェクトでは大量のReactコンポーネントを持っており、その中の一部(60%くらい)のコンポーネントを社内の別のプロジェクトでも使うため、ライブラリとして公開しろという指令が出ました。

実は既に社内で使われていましたが、ビルドがコンシューマ側で行われていたので、ここを何とかしろという話でした。(お前らのせいでビルドに余計な時間がかかるだろうが！)

### 結論: rollup ([https://www.npmjs.com/package/rollup](https://www.npmjs.com/package/rollup)) を使った。”まぁまぁ”うまくいった。

## 1. 現状とゴールの確認

### 現状:

コンシューマが を実行するとほぼソースコードそのものがnode_modules以下にinstallされる(babelでトランスパイルだけされている)、のでコンシューマ側でビルドが必要。

使う側はコード上で  のように、ファイルパスまで指定しないとダメ。

なぜこうなったのかの経緯は不明。

### ゴール:

を実行するとビルド済み(バンドルされた)jsファイルを提供する。使う側は みたいに余計なパス指定をしなくてよくする。

## 2. 状況の確認

まずプロジェクトのディレクトリ構成はこんな感じ。(説明のために簡略化してます。)

```plain text
.
├── node_modules
├── package.json
└── src
    └── components
	│   └── App
	│   └── ...
	│   └── ...
	│   └── common
	│   └── library
	│ 	    └── Config
	│     	    └── Config.js
	│     	    └── Config.scss
    └── index.js
    └── dashboard.js　 <- このファイルに記載されているコンポーネントをライブラリ化したい
    └── scss

```

dashboard.jsはimport/export のみ記述

```plain text
import Config from "./components/library/Config/Config";

export {
	Config
}

```

## 3. いざバンドル (rollup)

最終的なrollup.config.jsはこうなりました。以降解説。

```plain text
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import {babel} from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";

// entry file
const inputFileName = "src/dashboard.js";
const sourceMap = false;

const baseConfig = {
	input: inputFileName,
	external: [
		"react",
		"react-dom",
	],
	plugins: [
		babel({
			babelrc: false,
			exclude: ["node_modules/**"],
			babelHelpers: "bundled",
			presets: [
				[
					"@babel/preset-env",
				],
				[
					"@babel/preset-react", {
						"runtime": "automatic"
					}
				]
			],
		}),
		resolve(),
		commonjs(),
		postcss({
			modules: true,
			extensions: [".css", ".scss"],
			plugins: [autoprefixer()],
			extract: "css/dashboard.css",
		})
	],
};

export default [
	{
		...baseConfig,
		output: [
			{
				dir: "dist-es",
				format: "es",
				sourcemap: sourceMap,
			},
			{
				dir: "dist",
				format: "cjs",
				sourcemap: sourceMap,
			},
		]
	},
];

```

baseConfigのパートから解説します。

: その名の通り、このファイルをエントリーポイントとして必要なコンポーネントをrollupが走査する。

: ライブラリに含めないものを記述します。Reactの場合だとコンシューマ側とライブラリ側でそれぞれ別のReact instanceを持つと動きません。必ずexternalに入れましょう。(可能ならpackage.jsonのdependenciesからも外しましょう。*余談2)

: 一番重要かつ複雑な設定。気合い入れて理解しましょう。babel, resolve, commonjsは3種の神器。記述する順番は諸説あり(筆者もよくわかっていない)。

: お馴染みのトランスパイラ。presetsはbabel.rcに書き出すこともできる。

: node_modules以下のmoduleを読み込んでくれる。

: その名の通り、common jsで書かれたファイルをいい感じに処理してくれる。

: cssの処理をしてくれる。プロジェクトではCSS module(*余談1で少し解説)としてSCSSを使っているので、  をつけている。 オプションでバンドルしたcssを出力してくれる。コンシューマ側はこのcssをhtml headerに追加することでスタイルが適用できる。

:出力形式等をここで指定します。  ならES module,  ならcommon jsで出力してくれる。  で出力ディレクトリの指定も可能。ビルド成果物が1つなら  で出力ファイルのパスが指定できる。(コンポーネント内でダイナミックインポートをしてたりすると、複数のビルド成果物ができる。)

## 4. おわりに

当初の問題(コンシューマ側のビルド)はこれで解決となった。可能ならコンシューマー側でのスタイルの当て方に別のオプションを用意したかった。具体的には  のような1行をコンシューマ側のscssに追加するだけでスタイルが当てられるようにしたかった。結論で”まぁまぁ”といったのはこれが実現できなかったから。

## 5. 余談1

CSS moduleと普通のCSSの違いを少し解説します。

使い方の違いは以下の様な感じで、class名のscopeがglobalかlocal(moduleレベル)かといった違いがあります。普通のCSSの場合、すべてのコンポーネントで異なるクラス名をつける必要があります。CSS moduleの場合はビルド時に(今回の場合rollup-plugin-postcss)がいい感じにIdenticalなクラス名に変換してくれます。

```plain text
import styles from "./Config.scss";  <-- CSS module

const Config = () => {
	// CSS module
	return <div className={styles.config} />

}

```

```plain text
import "./Config.scss";  <-- 普通のCSS

const Config = () => {
	// 普通のCSS
	return <div className="config" />
}

```

## 6. 余談2

ディレクトリ構成を上で見せましたが、本当の本当の理想系は以下の様な構造です。Library以下が完全に独立していてピュアなコンポーネントであるべきです。Appやcommon等のコンポーネントはLibrary以下のコンポーネントを使っても良いですが、その逆はダメです。

package.jsonがLibraryとStand Alone UI用で別ファイルにできるのも”極めて”有益です。我々の場合これをやっていないせいで、publish時に余計なワークアラウンドが入っています。

我々は諸事情(主に時間的制約)によりディレクトリ構造の修正はしていませんがこれからライブラリ作るぞって人は可能な限りやってください。

```plain text
.
├── node_modules
├── package.json
└── src
    └── components
		│   └── App
		│   └── ...
		│   └── ...
		│   └── common
		└── Library
		│ 	└── src
		│   │   └── components
		│	│   │   └── Config
		│	│   │       └── Config.js
		│	│   │       └── Config.scss
		│   │   └── dashboard.js　 <- このファイルに記載されているコンポーネントをライブラリ化したい
		│	└── package.json
		│	└── rollup.config.js
        └── index.js
        └── scss

```