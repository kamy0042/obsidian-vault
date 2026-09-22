---
Created: 2025-04-02T15:30:00
URL: https://www.mizdra.net/entry/2025/04/02/093100
Tags: [topic/技術/TypeScript]
---
![[1743567281.bin]]

tsconfig.json を使うと、型チェックを緩く/強くしたり、また出力する JS の形式を変えたりできる。しかしいくつかの事情から、正しく書くのが難しい。

- オプションの数が非常に多い 
    - その数なんと 133 個 [1](https://www.mizdra.net/entry/2025/04/02/093100#f-2dabe149)
- オプションの意味や役割が理解しにくい 
    - 公式ドキュメントは丁寧にかかれているが...
    - JavaScript や TypeScript の仕様、型の知識、歴史的経緯などを知らないと理解しづらい
- 推奨されるオプションが変わっていく 
    - 言語やエコシステムの進化/変化によって変わる
    - 最近だと Node.js の TypeScript サポートで変わった

「オプションの細かい意味とかは一旦いいから、モダンで最小限の tsconfig.json がすぐに欲しい！！！」。そうした声に応えて、[id:mizdra](http://blog.hatena.ne.jp/mizdra/) がオススメする「4 ステップでモダンな tsconfig.json を作る方法」を紹介する。

CommonJS ではなく ESM を使うこと、Node.js で TypeScript を実行する時は [Type Stripping](https://nodejs.org/api/typescript.html#type-stripping) を使うことを前提に解説していく。また、個々のオプションの解説は最小限にとどめて、これをコピペしたら良いという説明にしてる。所々で解説を折りたたんだ状態で書いてるので、オプションの意図を知りたくなったら読んで欲しい。

## 「記事読むのも面倒だぜ！」という人は

ジェネレータ作ったので、これをポチポチしてください。

- [tsconfig.json generator for @mizdra](https://mizdra.github.io/tsconfig-generator/)

## 簡単 4 ステップ

以下の 4 ステップでモダンな tsconfig.json を作成できる。

1. 雛形を生成する
2. Bundler や Node.js Type Stripping で利用できない構文を制限する
3. プロジェクトの構成に応じたオプションを選ぶ
4. コンパイル時のチェックを厳しくする

## 1. 雛形を生成する

実は `tsc`(コンパイルするコマンド) には、tsconfig.json の雛形を生成する機能がある。TypeScript 公式の推奨オプションも反映されてるため、この雛形から始めるのが良い。

```plain text
# npm
npm i -D typescript
npx tsc --init
# pnpm
pnpm i -D typescript
pnpx dlx tsc --init
```

`npx tsc --init`すると以下のような`tsconfig.json` が生成される (説明のために一部整形済)。

```plain text
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "es2016",
    /* Modules */
    "module": "commonjs",
    /* Interop Constraints */
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    /* Type Checking */
    "strict": true,
    /* Completeness */
    "skipLibCheck": true
  }
}

```

下 4 つのオプション (`esModuleInterop`,`forceConsistentCasingInFileNames`, `strict`, `skipLibCheck`) は現代では必須とされるもの。まず外すこともないので、これらの意味は知らなくて良い。**とにかく付けておくこと。**

それ以外はこの後のステップで変えていく。

## 2. Bundler や Node.js Type Stripping で利用できない構文を制限する

TypeScript には複数の `*.ts` ファイルを解析しないとトランスパイルできない構文がある (難しいので詳細は割愛)。これらの記法は `tsc` ではトランスパイルできるのだけど、Bundler や Node.js Type Stripping は 複数の `*.ts` を1ファイルずつ独立して並列でトランスパイルする仕組みであるため、一般にトランスパイルできない。

そこでこうした構文をコンパイラレベルで使用を禁止しておくと良い。以下のオプションを足す。

```plain text
{
  "compilerOptions": {
    "verbatimModuleSyntax": true
  }
}

```

> [!note]+ 解説
> `"isolatedModules": true` を設定すると複数の `*.ts` を1ファイルずつ独立して変換できるよう、一部構文を禁止できる。
> 
> - [isolatedModules | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/tsconfig/isolatedModules)
> 
> これを単に ON にしておくので十分だけど、現代では `"verbatimModuleSyntax": true` というより上位のオプションがある。これは、`"isolatedModules": true` を自動で設定したうえで、更に import 文から型の import を削除する挙動を改善してくれる。
> 
> - [TypeScript 5.0 で追加された verbatimModuleSyntax とは何か？](https://zenn.dev/teppeis/articles/2023-04-typescript-5_0-verbatim-module-syntax)
> 
> 「Bundler や Node.js Type Stripping で利用できない構文を制限する」のとはちょっと違うけど、まあこれを付けておくと良いと思う。

## 3. プロジェクトの構成に応じたオプションを選ぶ

tsconfig.json は、プロジェクトの構成によって推奨のオプションが異なる。主に`"target"`, `"module"`, `"moduleResolution"`, `"noEmit"` の 4 つを変えることになる。それぞれどういうオプションというと...

- `"target"` 
    - どの ES バージョンに downlevel (古い ES バージョンへの変換) するかを指定
    - 主な値 
        - `"ES2021"`/`"ES2020"`/...: ES20XX に downlevel する
        - `"ESNext"`: 変換せずそのまま
- `"module"` 
    - モジュールの出力形式 (CJS や ESM のこと) を指定 
        - import 文を CJS 形式 (`require(...)`) に変換するのか、そのままにするのかなどを決められる
    - 主な値 
        - `"NodeNext"`: `.cts`は CJS、`.mjs`は ESM、`.js`は (よしなに判定して) CJS or ESM に変換して出力
        - `"Preserve"`: 変換せずそのまま出力
- `"moduleResolution"` 
    - `import ... from 'module-name'`の`module-name`をどう絶対パスに解決するか指定
    - 主な値 
        - `"nodenext"`: Node.js が実装してる解決方法を真似る
        - `"bundler"`: 一般的な Bundler が実装してる解決方法を真似る
- `"noEmit"` 
    - `.js`を出力するかどうかを決める
    - 主な値 
        - `true`: 出力しない
        - `false` or 省略: 出力する

見ての通り Bundler 利用時はこれ、Node.js 利用時はこれ、というのがある。実際にどういう時にどんな値にすればよいか、よくあるプロジェクト構成ごとに紹介していく。

### 例 1: Web アプリケーションのフロントエンド向けの構成

以下のような構成のプロジェクトのこと。

- Bundler でコードを bundle
- Bundler でトランスパイル (TS => JS)
- 成果物をブラウザで実行
- JSX でコンポーネントを書く

この場合、以下のような設定にする。

```plain text
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "Preserve",
    // "moduleResolution": "bundler",
    "noEmit": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable", "DOM.AsyncIterable"],
    "jsx": "preserve"
  }
}

```

> [!note]+ 解説
> - `"noEmit": true` 
>     - tsc でトランスパイルしないので
> - `"target": "ESNext"` 
>     - `"noEmit"`は出力形式に関するオプションで、 `"noEmit": true`併用時は不要に思えるが... 
>         - `target`は出力形式の指定だけでなく、「変換先のバージョンが古すぎて正しく downlevel できない構文をコンパイルエラーにする」機能も兼ねてる
>         - `"target": "es5"` だと、ES5 で表現しきれない一部言語機能 (top-level await など) が使えない
>     - コンパイルエラー回避のため、`"target": "ESNext"` にすべき
> - `"module": "Preserve"` 
>     - `"module"`も出力形式に関するオプションで、 `"noEmit": true`併用時は不要に思えるが... 
>         - 出力形式の指定だけでなく、一部構文 (top-level await など) をコンパイルエラーにする機能も兼ねてる
>     - コンパイルエラー回避のため、`"module": "Preserve"`にすべき
> - `"moduleResolution": "bundler"` 
>     - Bundler を使ってるので
>     - `"module": "Preserve"`の時は自動で設定されるので省略可
> - `"lib": ["ESNext", "DOM", "DOM.Iterable", "DOM.AsyncIterable"]` 
>     - DOM API の型定義を読み込むために必要
> - `"jsx": "preserve"` 
>     - JSX を記述するために必要

### 例 2: バックエンドサーバー向けの構成

以下のような構成のプロジェクトのこと。

- `node src/server.ts`で実行 (Node.js の Type Stripping を使う)
- bundle や minify はしない 
    - bundle や minify はブラウザが`.js`を効率的に fetch するための仕組みなので
    - 今回は`.js`を実行するのはブラウザではなく Node.js なので、全く不要

この場合、以下のような設定にする。

```plain text
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    // "moduleResolution": "nodenext",
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "erasableSyntaxOnly": true,
  }
}

```

> [!note]+ 解説
> - 実行環境が Node.js なので... 
>     - `"module": "NodeNext"`
>     - `"moduleResolution": "nodenext"` 
>         - `"module": "NodeNext"`の時は自動で設定されるので省略可
> - tsc でトランスパイルしないので... 
>     - `"noEmit": true`
>     - `"target": "ESNext"`
> - TS を`.ts`拡張子付きで import できるように 
>     - `"allowImportingTsExtensions": true`
>     - `"moduleResolution": "nodenext"`の時、デフォルトだと `import xxx from './collection.ts'`がコンパイルエラーになる 
>         - 許可するには`allowImportingTsExtensions`が必要
> - Node.js Type Stripping がサポートしてない構文を禁止するため... 
>     - `"erasableSyntaxOnly": true`
>     - TypeScript は JavaScript に型注釈を追加しただけの言語...なのだけど、その範疇を超えた構文がいくつかある 
>         - [enum](https://www.typescriptlang.org/docs/handbook/enums.html)
>         - [namespace](https://www.typescriptlang.org/docs/handbook/namespaces.html)
>         - [Parameter Properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)
>         - ...
>         - これらの構文は、TypeScript 公式のコンパイラ (`tsc`) はサポートされているが、Node.js の [Type Stripping](https://nodejs.org/api/typescript.html#type-stripping) ではサポートされていない
>         - そこで `erasableSyntaxOnly`を付けて、これらの構文を禁止するべき

### 例 3: npm package 向けの構成

以下のような構成のプロジェクトのこと。

- bundle はしない
- `tsc` でトランスパイル (TS => JS)
- 成果物を Node.js で実行
- ソースコードは `src/` に、成果物は `dist/` にある

この場合、以下のような設定にする。

```plain text
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "NodeNext",
    // "moduleResolution": "nodenext",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "rootDir": "src",
    "outDir": "dist"
  }
}

```

> [!note]+ 解説
> - 各種オプションを Node.js 向けの推奨値に 
>     - `"module": "NodeNext"`
>     - `"moduleResolution": "nodenext"` 
>         - `"module": "NodeNext"`の時は自動で設定されるので省略可
> - Node.js 向けに downlevel の設定を適切に行う 
>     - 2025/3 時点では`"target": "ES2021"`が良い 
>         - Node.js 18 が 100% サポートしてるのがこれ
>         - [https://node.green/](https://node.green/) を見ると良い
> - 型定義や sourcemap を出力するオプションを有効化 
>     - `"declaration": true`
>     - `"declarationMap": true`
>     - `"sourceMap": true`
> - 成果物の出力先のディレクトリ、ディレクトリの構成などを指定 
>     - `"rootDir": "src"`
>     - `"outDir": "dist"`
>     - 好きな値にカスタマイズできるけど、↑ が一般的

## 4. コンパイル時のチェックを厳しくする

いくつかのオプションで、コンパイル時のチェックを厳しくできる。気軽に導入できるものから、厳しすぎて導入が躊躇されがちなものまであるので、好みに応じて入れると良い。

とはいっても迷うと思うので、[id:mizdra](http://blog.hatena.ne.jp/mizdra/) がよく入れてるものを書いておく。

```plain text
{
  "compilerOptions": {
    "checkJs": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowUnusedLabels": true,
    "allowUnreachableCode": true
  }
}

```

> [!note]+ 解説
> - `checkJs` 
>     - `.js`も型チェックする
> - `noUncheckedIndexedAccess` 
>     - `numbers[0]`を`number`ではなく`number | undefined`にする
> - `noImplicitReturns` 
>     - 誤って void を返すのを防ぐ ([ref](https://typescriptbook.jp/reference/tsconfig/noimplicitreturns]))
> - `noFallthroughCasesInSwitch` 
>     - switch 文の case 句で break 省略禁止
> - `allowUnusedLabels: false` 
>     - 未使用のラベルを禁止
> - `allowUnreachableCode: false` 
>     - 到達不能なコードを禁止

逆に、以下は厳しすぎて基本的に使ってない。

- `noUnusedLocals` 
    - 警告を無視しようと思うと`// @ts-ignore` or `// @ts-expect-error`するしかない 
        - 他の`noUnusedLocals`以外のコンパイルエラーも無視されてしまい、不便
    - 代わりに eslint の no-unused-vars を使ってる
- `noUnusedParameters` 
    - 同上
- `exactOptionalPropertyTypes` 
    - npm package 作る時だけ一応付けてる
    - Web アプリケーション作る時は厳しすぎて付けない

これで全てのステップが完了した。皆さんの手元にモダンな tsconfig.json ができているはず。

## tsconfig-generator for @mizdra

記事冒頭でもしたけど、ボタンポチポチで tsconfig.json を生成するツールを作った。よければ使ってください。

- [tsconfig.json generator for @mizdra](https://mizdra.github.io/tsconfig-generator/)

一応 [id:mizdra](http://blog.hatena.ne.jp/mizdra/) 専用ツールという建付けなので、オプションの変更や追加の提案は基本的に reject するつもり。カスタマイズしたければ fork してください。

## おまけ

- 実はステップ 3 で解説した内容と同じことが、 TypeScript/Node.js のドキュメントに書いてある 
    - [https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html)
    - [https://nodejs.org/api/typescript.html#type-stripping](https://nodejs.org/api/typescript.html#type-stripping)
- `node scripts/build.ts`/`node scripts/migrate-db.ts` で実行する script 向けの設定は? 
    - Node.js で実行されるから、[バックエンドサーバー向けの構成](https://www.mizdra.net/entry/2025/04/02/093100#%E4%BE%8B-2-%E3%83%90%E3%83%83%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%89%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E5%90%91%E3%81%91%E3%81%AE%E6%A7%8B%E6%88%90) と同じ
- `eslint.config.ts`/`vite.config.ts`などのファイル向けの設定は? 
    - Node.js で実行されるから、[バックエンドサーバー向けの構成](https://www.mizdra.net/entry/2025/04/02/093100#%E4%BE%8B-2-%E3%83%90%E3%83%83%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%89%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E5%90%91%E3%81%91%E3%81%AE%E6%A7%8B%E6%88%90) と同じ
    - けど厳密には `vite.config.ts` は [bundle されてから実行される](https://github.com/vitejs/vite/blob/2c4a0920ec7730e61508745fb8e4d49fc2945f00/packages/vite/src/node/config.ts#L1840)ので Bundle 利用時向けの設定をすべき 
        - `vite.config.ts`だけ例外的に扱うの面倒すぎるので、[id:mizdra](http://blog.hatena.ne.jp/mizdra/) は無視してるけど...
- `include`オプションは何指定したら良い? 
    - [https://www.mizdra.net/entry/2024/07/27/193815](https://www.mizdra.net/entry/2024/07/27/193815) 見て
- 型チェックを高速化するには? 
    - `"incremental": true`でキャッシュを有効化しよう
- テストコード / アプリケーションコードで設定を分ける方法 
    - `tsconfig.src.json`/`tsconfig.test.json`に分けて、Solution Style tsconfig.json を使う 
        - ref: [https://www.mizdra.net/entry/2022/03/24/093000#余談-1](https://www.mizdra.net/entry/2022/03/24/093000#%E4%BD%99%E8%AB%87-1)
    - `tsconfig.test.json`の書き方 
        - Vitest で実行するなら [Web アプリケーションのフロントエンド向けの構成](https://www.mizdra.net/entry/2025/04/02/093100#%E4%BE%8B-1-Web-%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E5%90%91%E3%81%91%E3%81%AE%E6%A7%8B%E6%88%90) と同じ
        - `node --test`で実行するなら [バックエンドサーバー向けの構成](https://www.mizdra.net/entry/2025/04/02/093100#%E4%BE%8B-2-%E3%83%90%E3%83%83%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%89%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E5%90%91%E3%81%91%E3%81%AE%E6%A7%8B%E6%88%90) と同じ
    - とはいえ別々の設定ファイルをメンテナンスするの面倒だと思う 
        - テストとアプリケーションで同じ設定でいけるなら、それで良いと思う
        - [id:mizdra](http://blog.hatena.ne.jp/mizdra/) は同じ設定でいけるところまでいって、破綻した時分けてる
- モノレポで workspace ごとに設定を分けるには? 
    - workspace ごとに `tsconfig.json`配置したら良い
    - 例: `packages/pkg-a/tsconfig.json`, `packages/pkg-b/tsconfig.json`, ...
- `pkg-b`から`import {...} from 'pkg-a'`すると、pkg-a をビルドしてない時に型チェック通らないんだけど...? 
    - `pkg-a` が bundle をせず、`tsc` でトランスパイルする構成なら、[TypeScript Project Reference](https://www.typescriptlang.org/docs/handbook/project-references.html) が使える
    - `pkg-a` の tsconfig.json に `"composite": true` を、`pkg-b` の tsconfig.json に `"references": [{"path": "../pkg-a/tsconfig.json"}]` を追加すれば OK 
        - これで pkg-b を `tsc` で型チェックする時に、自動で pkg-a をビルドしてから型チェックが走るようになる
        - pkg-a をビルドしてない状態でエディタで `import {...} from 'pkg-a'` を含むファイルを開いたときも、赤線が出ない 
            - tsserver (TypeScript の Language Server) がいい感じに pkg-a のソースファイルを参照してくれてる
- Bundler を使わずにブラウザで実行するプロジェクトで `moduleResolution` の値は何にすべき? 
    - 現状それ向けの `moduleResolution` はないはず... 
        - Issue はある: [https://github.com/microsoft/TypeScript/issues/37971](https://github.com/microsoft/TypeScript/issues/37971)
    - 正直どの値にすべきか分からない。動くやつなら何でも良いんじゃないか。
- faux-ESM (syntax は ESM のものを使うけど CJS にトランスパイルされるモジュール) が書けないのだけど? 
    - `"verbatimModuleSyntax": true` による制約で書けないようになってる 
        - ref: [TypeScript 5.0 で追加された verbatimModuleSyntax とは何か？](https://zenn.dev/teppeis/articles/2023-04-typescript-5_0-verbatim-module-syntax#verbatimmodulesyntax%E3%81%A8-cjs-%E3%81%AE%E7%9B%B8%E6%80%A7%E3%81%8C%E6%82%AA%E3%81%84)
    - 以下のどっちかの対応をすると良い 
        -  
            1. `"verbatimModuleSyntax": true` を消して `"isolatedModules": true` を付ける
        -  
            1. `import ... from '...'` を`import ... = require(...)` に書き換える
    - `import ... = require(...)` 書くの嫌だから、[id:mizdra](http://blog.hatena.ne.jp/mizdra/) は 1 の方法でやってる
    - 一方でそもそも faux-ESM 書かずに済むならそれが良いので、faux-ESM ではなく ESM で書けないかをまず検討すること
- [1](https://www.mizdra.net/entry/2025/04/02/093100#fn-2dabe149):2025/3/31 時点で [https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/) に掲載されていたオプションの数より。