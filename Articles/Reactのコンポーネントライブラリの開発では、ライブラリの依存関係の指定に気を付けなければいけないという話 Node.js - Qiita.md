---
タグ: []
作成日時: 2024-03-07T16:55:00
URL: https://qiita.com/daichihasegawa0923/items/8105cad1af5d6da3eae5
Tags: [topic/デザインシステム/配信基盤]
---
![[https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Fadvent-calendar-ogp-background-f625e957b80c4bd8dd47b724be996090.jpg]]

Reactのコンポーネントライブラリを初めて開発しました。

今回はライブラリの依存関係で少し詰まった際に調べた内容を中心にお話しします。

## コンポーネントライブラリ開発で参考にした記事

以下の記事を参考に作成しました。大変分かりやすかったです。

- 公開方法の参考記事 
    - [3分でできるnpmモジュール](https://qiita.com/fnobi/items/f6b1574fb9f4518ed520)
- コンポーネントライブラリ開発の参考記事 
    - [React Component な npm のパッケージを作って TypeScript のプロジェクトで使う](https://qiita.com/pure-adachi/items/a9a39b3ffcb5af4c5b59)

## コンポーネントライブラリ開発プロジェクトの構成

- この後の説明をスムーズにするために、プロジェクトの構成を記載しておきます。

```plain text
root
├ sample-app (動作確認用プロジェクト)
│   ├ src
│   │ └ index.js
│   └ package.json
└ palette-component (コンポーネントライブラリプロジェクト)
    ├ src
    │ ├ canvas.tsx (ライブラリに含めるコンポーネント）
    │ ├ palette.tsx (ライブラリに含めるコンポーネント）
    │ └ index.tsx (コンポーネント参照用ファイル）
    └ package.json

```

## コンポーネントライブラリ開発で詰まったポイント

### 動作確認中にReactからエラーで怒られてしまう

-  
以下の手順で動かしている際に、突然Reactからエラーで怒られてしまいました。
    1. palette-componentプロジェクトを編集してビルド
    2. sample-appプロジェクトにpalette-componentのビルドを参照させて、コンポーネントライブラリを呼び出すように実装
    3. sample-appプロジェクトを起動
- 以下のエラーが出て怒られてしまいました・・・・。

```plain text
 Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

```

- エラーが出たタイミングとしては、palette-componentプロジェクト側でを使い出したタイミングでした。

### エラーが出た原因

- palette-componentプロジェクトと、sample-appプロジェクトはそれぞれのnode_modules内のReactを参照していました。

```plain text
root
├ sample-app (動作確認用プロジェクト)
│   ├ src
│   │ └ index.js ((1)のreactを参照しながら、(2)のreactを参照しているCanvasコンポーネントとPaletteコンポーネントを呼び出す）
│   ├ node_modules
│   │ └ react (1)
│   └ package.json
└ palette-component (コンポーネントライブラリプロジェクト)
    ├ src
    │ ├ canvas.tsx ((2)のreactを参照しながら、Canvasコンポーネントを提供する）
    │ ├ palette.tsx ((2)のreactを参照しながら、Paletteコンポーネントを提供する）
    │ └ index.tsx
    ├ node_modules
    │ └ react (2)
    └ package.json

```

- sample-appには、自身が持っているReactとpalette-componentが持っているReactの2つが含まれてしまったため、「[フックへのルール違反：重複した React のコピー](https://ja.reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)」となってしまったようです。
- sample-appで呼び出す際は、コンポーネントも、コンポーネントも(1)のreactを参照して動くようになっていないとエラーが出て正常に動かすことができないようです。

### 解決方法

-  
以下の記事を参考に解決しました。
    - [Reactライブラリー開発環境で、"Invalid Hook Call Warning"に対処する](https://qiita.com/Lzpeth/items/1310344e380a877fa7a6)
-  
sample-appプロジェクトが参照しているnode_modulesのとでコマンドを叩き、palette-componentプロジェクトで、コマンドを叩くことで、sample-appプロジェクトとpalette-componentプロジェクトが参照するReactを統一することができます。
    - 私はyarnを使っているため、「」コマンドを使って解決しました。

## ライブラリの依存関係にご注意！

コンポーネントライブラリを開発している際、パッケージの依存関係についてあまり意識せず開発を進めていました。そのため以下のような状態でした。

- palette-componentプロジェクトのpackage.jsonのdependenciesにとが入っている

package.json

```plain text
"dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
  }
```

この状態だとライブラリを呼び出すプロジェクトは以下のような構成になるため、ライブラリを使う人が私と同じ苦しみを味わうことになります。

```plain text
some-app (ライブラリを呼び出すアプリ)
  ├ src
  │ └ index.js ((1)のreactを参照しながら、(2)のreactを参照しているCanvasコンポーネントと、Paletteコンポーネントを呼び出す）
  ├ node_modules
  │ ├ react(1)
  │ └ simple-palette-component ((2)のreactを参照しながらCanvasコンポーネントとPaletteコンポーネントを提供するライブラリ）
  │   └ node_modules
  │     └ react(2)
  └ package.json


```

今回は開発中にエラーが出たのでたまたま気がつく事が出来ましたが、ライブラリのように、他のプロジェクトから参照することを前提としている場合は特に依存関係には気をつけたほうが良さそうですね。

今回の件で**かなり反省した**私は、package.jsonで定義できる依存関係の定義について、改めてnpmが公式にまとめているものを見てみることにしました。

### [dependencies](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies)

依存関係のあるパッケージをバージョンを指定する事ができるみたいですね。

太字で「**開発中だけに使うものはここに置くなよ**」って書いてありますね。ゴメンナサイ。

### [devDependencies](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#devdependencies)

開発中にのみ使用し、自分が作ったモジュールを誰かが使う際は不要である依存関係のあるライブラリ等を記載する場所みたいですね（テストツールとか）。

対象となるパッケージのルートフォルダでとかを叩くことで代替が可能とも書いてあります。なるほど。

### [peerDependencies](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)

「このモジュールを使う際は、このpeerDependenciesのライブラリ・ツールが使われる前提ですよ。」ということを示すためのものらしいです（難しい・・・。）。

npmのバージョンによって挙動が変わるらしく、npmのバージョン3～6ではpeerDependenciesは自動ではインストールされない仕様でしたが、npmのバージョン7からは自動でインストールされる仕様に変わったようです。

peerDependenciesに指定するライブラリやツールのバージョンの指定はある程度幅を持たせることを推奨していますね。

パッケージを公開したりしない限りはあまり使わない印象です・・・ということは、**今回は関係ありそうですね。**

（他にもとか、とかありますが・・・今回は割愛させていただきます・・）

### Reactのコンポーネントライブラリの依存関係はどう定義すべきか

-  
今回の場合、どう依存関係を解決すればよいのか・・ちょっと考えてみることにしました。
    - とかはインストール先のメインのプロジェクトが参照するnode_modules内のものを参照したい 
        - を使うので、Reactのver.16.8.0以降を使用してほしい
    - ただ、コンポーネントライブラリ開発中はテストもしたいので、開発環境でもとかを使わないわけではない
- うーん、なんとなくこうじゃないかなぁ・・・

package.json

```plain text
"devDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
  }"peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
  }
```

- よし、他の有名なコンポーネントライブラリがどうしているかを参考にしてみよう
- [react-loader-spinnerのV4.0.0のpackage.json](https://github.com/mhnpd/react-loader-spinner/blob/v4.0.0/package.json)

React周りはだいたい同じですね。

（本当は有名なコンポーネントライブラリがどうしているかを参考にして、自作コンポーネントライブラリのpackage.jsonがどうあるべきかを考えたのはここだけの話です。）

## まとめ

- いつもはコンポーネントライブラリを活用してWebアプリの開発をすることが多かったので、ライブラリの依存関係についてあまり考えることはありませんでした。これからは、前よりライブラリの依存関係には気を付けて開発することができそうです！

## おまけ