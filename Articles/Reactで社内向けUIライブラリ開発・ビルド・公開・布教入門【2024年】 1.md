---
タグ: []
作成日時: 2024-02-27T01:35:00
URL: https://zenn.dev/meijin/articles/howto-build-react-ui-private-package-2024
Tags: [topic/デザインシステム/配信基盤]
---
![[og-base-w1200-v2 9.png]]

会社で複数の新規事業を立ち上げる機運が高まったことをきっかけに社内向けUIライブラリを開発し、限定公開して利用を始めました。

本記事ではReactで社内向けUIライブラリを開発・ビルド・公開・布教するためのアレコレを共有します。

以下のような話題について知りたい方に特に読んでほしいです。

- Private Packageの作り方、配布の方法のイメージがつかない方
- CommonJSとES Modules、今はどちらでビルドするのがいいのか知りたい方
- ライブラリの作り方について網羅的に知りたい方

# 前提

- 利用側のアプリケーションはNext.js固定を前提とする
- Tailwind CSSを内部的には利用する
- 利用側のアプリケーションはパフォーマンス（Lighthouseスコア）重視することが多い
- 社内の様々なレベルのエンジニアがContributeする可能性がある

端的に言うと、社内のプライベートリポジトリにて開発中のプロダクトコードから

```plain text
npm install @org_name/package_nane

```

でインストールできて通常利用でき、CIも通せる状態がゴールかつ、ライブラリ側もメンテしやすく配信やLint等のCIが設定されている状態も実現します。

# 開発編

## 大まかな方針

※以下、これしかないという唯一解ではないですが、ある程度この方針なら変なことにはならない、という前提で弊社で実践した方針を共有します。

### プロダクトコード実装

- srcディレクトリ以下にライブラリ化したいコードを集結させる
- 具体的には、src/components以下にコンポーネントを、src/hooks以下にフックをといった感じでコードを書いていく
- 最終的にsrc/index.tsにてそれらをExportする（エントリポイント）。これによって最終的にライブラリ利用側のImportが`import { Hoge } from 'libraryName`で統一できます。他方、ES Modulesでのビルド成果物を同梱することがほぼ必須となります（後述）
- Tailwind CSSを使う場合、利用側のCSSと競合しないためにPrefixを指定します

### Storybook実装

- 社内向けUIライブラリということで、どんなものがあるかひと目でわかり、Playground代わりになるStorybookを採用しました
- component実装したときに、同階層に.stories.tsxも置きます（コロケーション）
- 省エネのため、StorybookはGitHub Pagesで公開します。GitHub Actionsで簡単に設定できますね

### Lintなど

- ESLintとPrettierは入れます。[SmartHR UIで利用されているESLint Plugin](https://github.com/kufu/eslint-plugin-smarthr)がA11yのルールなど多く勉強になりますが、実際に言う通りにするのが大変だったのでいくつかOFFにして運用開始しています
- GitHub ActionsでmainブランチへのPull Request時に実行します

# ビルド編

## 大まかな方針

### CommonJSとES Modulesの併用

- ビルド成果物のJSが採用するモジュールシステムはCommonJSとES Modulesに二分されているが、本記事ではこれらをハイブリッドで出力することを推奨します
- ハイブリッドで出力するための技術として、esbuildやSWC、tsup、bun bundler、babelなど複数選択肢があるようですが、本記事では慣れの問題でesbuildを選定しました。bun bundlerも並行して試しましたがモダンで悪くなさそうでした
- 型定義はtscで生成します
- CommonJS、ES Modules、型定義のすべてをdist/ディレクトリ以下に吐き出すようにします
- package.jsonからそれらのモジュールのエントリポイントを指定します

# 公開編

## 大まかな方針

### GitHub Private Packages

- すでにGitHubに課金している組織であればnpmではなく、GitHubのPrivate Packageを使うのが良いと思います
- GitHub Actionsを通してnpm publishするときも、GITHUB_TOKENでできるので便利です

### 配信の自動化

- [release-please](https://github.com/googleapis/release-please)というツールを使うのがおすすめです。[GitHub Actionsと組み合わせる](https://github.com/google-github-actions/release-please-action)ことで、mainブランチにfeat: またはfix: から始まるCommitがPushされるごとに、package.json内のバージョンのインクリメントとCHANGELOG.mdへの差分をPull Requestにして自動生成してくれます。そのPull Requestのマージをフックにしてnpm publishすれば、バージョンの更新まで含めてほとんど自動化できます 
    - `feat:`から始まるコミットがPushされるとマイナーバージョンを、`fix:`から始まるコミットがPushされるとパッチバージョンをインクリメントしてくれます。超便利
- この辺の設定が終わっていれば、新規コンポーネント作る→mainブランチにPR→Lintなど通る→マージ→バージョンインクリメント＆CHANGELOG.mdの更新PRが自動生成→マージ→新バージョンでの配信完了。となります

### 細かいところ

- READMEにStorybookの公開URL、目的、何が目的ではないか、制約条件、How to Install、How to Setup、実装方法、How to Contributeを記載
- npmignoreを設定するなどして、ビルド配布物に余計なファイルが含まれないようにする

# 活用編

## 大まかな方針

### 利用側のリポジトリの設定

- 各開発者が、適切な権限をつけた自身のGitHub Personal Access Tokenを発行して、シェルの環境変数NODE_AUTH_TOKENに設定する
- 各リポジトリのrootに`.npmrc`ファイルを置き、所定のOrganization以下のパッケージへのアクセス時にNODE_AUTH_TOKENを参照するように実装する（このファイルはGit管理してOK）
- CI環境上でも、npm installするときはトークンが必要。リポジトリ自体がまず社内向けUIライブラリにアクセス可能になるように設定するとともに、GitHub Actions上でGITHUB_TOKENを環境変数に設定したり、Docker Buildを行う場合はコンテナ内に環境変数を引き回す

### 社内への布教：エンジニア編

- 現在弊社では1つの既存事業と2つの新規事業が動いています。そこで、それぞれの事業に対してハンズオンをしつつ、原理の説明だけはして作業を一部巻き取るなどして導入を終わらせます
- 各事業で作りたいUIをヒアリングして、1つまず自分で作って導入→Production Releaseまで進めます。これを通して、CIが動作することや、Bundle Sizeへの悪影響有無をテストします。その他、作りたいけど手が回っていないUIなどをヒアリングしてIssueに溜めておきます。また、一回Production Releaseまで終わっていることは各事業のエンジニアにとって安心材料になります

### 社内への布教：その他

- 各事業の意思決定者（弊社の場合は小規模なので事業責任者）にそれぞれ説明の機会を作り、UIを始めとするソースコードの部品を統一していくことの工数上のメリットやスキルセットの統一による採用上、育成上のメリット等を伝えます。同時に、他事業でこういうUIいいなと思ったものは真似できることが多いので互いにノウハウを交換していきましょう、という話も添えます
- もちろんUIライブラリを使ったら各事業同じようにUIが使えるのは理想環境です。全事業がReact（Next.js）で統一されていることは前提だし、エンジニアのレベルもある程度揃っており問題なくUIライブラリを扱える必要があります。弊社の場合は私がCTOなので、こういった技術統一や教育観点でも並行していろいろな取組みを進めていきますが、体制が異なる場合はそういった教育部隊や採用関連との連携も必要だと思います

# 詳細な解説

## ビルドについて

### そもそもの話

大前提の話を書いておくと、ライブラリをTypeScriptで実装した場合、配信（npm publish）するときにはJSにトランスパイルしておく必要があります。イメージが湧かない方は、実際に手元のNext.jsプロジェクトでmuiをインストールして、node_modules以下の`@mui`パッケージを見に行くといいでしょう。型定義ファイル`d.ts`はあるけど、TSXファイルなどは一切ないはずです。Reactコンポーネントは`react/jsx-runtime`の`jsx`関数に置き換えられるなどで、JSXではないコードになっています（余談ですが、tsconfig.jsonでjsx: preserveに設定するとtsc実行後のコードにJSXが残ります）。

そして、TSをJSに変換する方法は、普通はtscを--noEmit付けずに実行しましょう、なんですけど、諸般の事情によりその方法一辺倒ではいかないような事情があるので、このように節を用意したという流れになります。なお、時流が速いのと自分も専門家ではないというところで、正確ではない表現もあるかと思いますが、参考文献を読んでいただいたり、手元で実際にビルド→配布→インストールしてみることで試していってください。

### CommonJSとES Modulesのどちらを選ぶか？

2024年初頭現在、CommonJSとES Modulesのどちらを選ぶべきかについては、以下の選択肢があります。

- CommonJSだけビルド成果物に含める
- ES Modulesだけビルド成果物に含める
- 両方含める

まず、歴史的にCommonJSのほうが先にあったという背景もあり、「単一のモジュールをエクスポートするだけ」なライブラリであれば、CommonJSのみ含めるでOKだし、TSCによるコンパイルのみでOKです。

たとえば以下のライブラリは私が以前公開したものですが、CommonJSのみです。

CommonJSだけでいいならとてもシンプルで済むしTSCだけでいいので、まずCommonJSだけでいいかを考えるのが良いと思います。

ただし、複数モジュールのExportを行うUIライブラリのようなライブラリの場合、Tree Shakingの観点で不都合が生じます。

以下、具体的に説明します。

MUIなど大半のUIライブラリは以下のような形式（naned imports）でImportして使うことが多く、

```plain text
import { Hoge, Fuga } from 'awesome-library'

```

以下のようにImportする（default imports）ことはほとんど無いと思います。

```plain text
import Hoge from 'awesome-library/Hoge'
import Fuga from 'awesome-library/Fuga'

```

前者のようにまとめてImportしたいとき、ビルド時にTree Shakingが効くことが必須です。Tree Shakingが効かないと、結果として1コンポーネントしかImportしなくても、もとのライブラリが30コンポーネントあると30コンポーネント分のBundle Sizeが加算されてしまいます（[MUIのReduce Bundle Sizeのページ](https://mui.com/material-ui/guides/minimizing-bundle-size/)を見るとイメージ湧くかも）。

ライブラリがCommonJSでしか配布されていないと、前者のImport形式においてビルド時にTree Shakingが効きません。よって、ES Modules形式でビルドされたJSも配布する必要があります。

すると、そうなるくらいなら、最初からES Modulesだけ配布すればいいじゃないか、という発想に至ります。ES Modulesしか配布しないパッケージのことをPure ESMと呼び、実際にPure ESMなパッケージを配布することは可能です。

前提条件次第ではPure ESMなパッケージにしておいたほうが、歴史的な背景に左右されることなく長期的にパッケージをメンテナンスできる可能性が高いと思います。ただ、社内向けUIライブラリで複数人でメンテナンスする可能性を想定する場合は、Pure ESMパッケージにおける「import文において拡張子.jsを必須でつける」といった細かい縛りが第三者によるコントリビューションの難易度を上げてしまう危惧のほうが大きかったです。

なお、じゃあビルド時に拡張子をつける処理をインターセプトしたら良いじゃないかという声も聞こえてきそうだし、実際Headless UIはBuild時にesbuildでビルドしておきながら、最後に成果物のJS内でImport文を全部.js付きに書き換えるパワープレイに出ています。

（これは誰かに教わったのではなく、今回ビルドについて調べる中で既存プロダクトのnode_modulesを見て回っていたらHeadless UIのビルド成果物に拡張子がついていてビックリしてリポジトリを見に行ったという流れです）

そして私もシェルスクリプトまで書き出すとメンテナンスつらそう〜と思ったのであくまでesbuildの範囲内でどうにかできないかと頑張った瞬間もありました。

build.mjs

```plain text
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/index.ts', 'src/**/**.ts', 'src/**/**.tsx'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  format: 'esm',
  sourcemap: true,
  splitting: true,
  external: ['*'],
  plugins: [
    {
      name: 'resolve-ts',
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.kind === 'entry-point') return
          let path = args.path
          // pathがcomponentsを含んでいる場合、末尾に/indexをつける
          if (path.includes('components')) {
            if (!path.endsWith('index')) path += '/index'
          }
          // とりあえず末尾にjsをつける
          if (!path.endsWith('.js') && (path.startsWith('.') || path.startsWith('src'))) path += '.js'
          return { path, external: true }
        })
      },
    },
  ],
})

```

ただ、お察しの通りたった10個程度のコンポーネントを追加したあたりで、どこどこのImportがビルド後におかしくなったとか、このファイルのImportがおかしいだの起きてしまい、やり切ろうと思えばいずれ行けるだろうが、本来の目的から考えてここで差別化しにいくメリットが薄いと思ったので撤退し、CommonJSとES Modulesの両方を配布する方向性にしました。

CJSとESMの両方を配布する時点で選択肢は割と広がっており、tsconfigをesm用とcjs用のもので作り分ける方法を採っているライブラリも多く有力です。私は検証の仮定でesbuildを使っていたので、そのままesbuildに頼ってビルドすることにしました。

build.mjs

```plain text
import * as esbuild from 'esbuild'

await Promise.all([
  esbuild.build({
    entryPoints: ['src/index.ts', 'src/**/**.ts', 'src/**/**.tsx'],
    outdir: 'dist/esm',
    bundle: true,
    minify: true,
    format: 'esm',
    target: 'esnext',
    sourcemap: true,
    splitting: true,
    external: ['*'],
  }),  esbuild.build({
    entryPoints: ['src/index.ts', 'src/**/**.ts', 'src/**/**.tsx'],
    outdir: 'dist/cjs',
    bundle: true,
    minify: true,
    format: 'cjs',
    target: 'esnext',
    sourcemap: true,
    external: ['*'],
  }),])

```

こうやって作成したbuild.mjsの実行自体は`node build.mjs`なんかで普通に実行できます。

### ビルドするnpm scriptsの例

最終的にTailwind CSSのCSSビルドも含めて以下のようなnpm scriptsができあがります。

```plain text
"build": "rm -rf dist/ && run-p build:*",
"build:types": "tsc --emitDeclarationOnly",
"build:js": "node build.mjs",
"build:css": "tailwindcss -i ./src/styles/index.css -o ./output.css",

```

ただの型定義生成なので蛇足ですがTSconfigは以下のとおりです。

tsconfig.json

```plain text
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist/cjs",
    "jsx": "react-jsx",
    "declaration": true,
    "types": ["react"],
    "lib": ["ES2022", "DOM"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
    }  },  "exclude": ["node_modules", "src/**/*.test.ts", "src/**/*.test.tsx", "src/**/*.stories.tsx", "src/**/__tests__"],
  "include": ["src/**/*"]
}

```

`moduleResolution`を`nodenext`にするべきかといった[論点はあります](https://blog.s2n.tech/articles/dont-use-moduleresolution-node)が、結局上記のような設定に落ち着きました。この辺は他ツールとの兼ね合いとか、結局TSCは型定義のためにしか使わなくなったといった事情との兼ね合いなので、実際に立ち上げる方はそれらも合わせて検討ください。

細かいけどReact18以上を前提にするならjsxはreactじゃなくてreact-jsxでいいよね、といった論点もあります。

### package.jsonのモジュール宣言

CommonJSとES Modulesのハイブリッドであることを宣言するためには、Conditional Exportsといった記法もありますが、インスタントに済ますなら以下のようにmain以外にmoduleを指定することでも動作しました。

```plain text
"sideEffects": false,
"main": "./dist/cjs/index.js",
"module": "./dist/esm/index.js",
"types": "./dist/cjs/index.d.ts",

```

[こちらの記事](https://www.wantedly.com/companies/wantedly/post_articles/410531)を拝見する限り、私が今回採った方法はFake ESM Packageという分類に入るっぽいです。正直全部ちゃんと理解しきれないくらい詳しいので、本記事を読んで補足情報が欲しくなった方はこちらの記事も読むと良いと思います。ていうかなんでライブラリ作って配布したいだけなのにこんなに考えないといけないんだ・・・（独り言）

### Tailwind CSSのビルドについて

Tailwind CSSのビルドも必要です。上述のとおり、以下のようなビルドスクリプトを実行します。

```plain text
"build:css": "tailwindcss -i ./src/styles/index.css -o ./output.css",

```

また、ライブラリの利用者はRootに近い位置でCSSをImportする必要があります。

```plain text
import '@texmeijin/ui-library-example/output.css'

```

こちらが必要になる理由について簡単に解説します。Tailwind CSSの利用者の方は読み進めてください。

大前提、Tailwind CSSがなぜパフォーマンスにさほど悪影響しないかで言うと、Purge CSSがあるからです。Tailwind CSSはおそらく数千以上のCSSルールを有しており、かつJITによる動的生成も加えるとその数は無限に発散していきますが、Purge CSSがビルド時に（tailwind.config.jsのcontentで指定されている）プロダクトコード内で利用されているクラスのみを選び、それ以外のクラスを最終的なCSSに含まれないようにしているため、プロダクションでは現実的なルール数に落ち着くというカラクリです。

tailwind.config.js

```plain text
content: ['./src/**/*.{js,jsx,ts,tsx}'],

```

蛇足ですが、どうやら内部的には単純な文字列検索が使われているようなので、クラスとして使われていなくてもページ内に「absolute」といった単語があるとabsoluteクラスは最終成果物に入ってしまう（これを嫌うならprefixを使おう）し、一方で、Propsに応じて「`mt-${margin}`」といったように動的生成しているクラスは他ページ・他コンポーネントで見つかるクラスであれば残るしそうじゃないと残らないから運ゲーになってしまいます。パフォーマンスに本気でこだわるならPrefix指定してArbitrary Valuesを避けてConfig側でExtendsしていけばルール数の最適化が図れますね（僕はCSSルール数なんて数十個増えても微差だろうと思う派ですがシビアな環境ならやったほうがいいかもなので追記）。

逆に言えば、contentで指定されていない範囲のコードでTailwind CSSのクラスを使っていても、それが最終的なCSSに残るとは限らないと言えます。

よって、社内向けUIライブラリでTailwind CSSを使いたい場合、Prefixを使わずに「mt-8」といったクラスを使っているとき、利用者側で「mt-8」に合ったスタイルが当たるかどうかは利用者側のコンポーネント内でmt-8が1箇所以上利用されているかに依存するし、JIT（というかArbitrary Values）を使っていたりすると言わずもがなです。

なんなら、利用者側では同じmt-8というクラス名でも数字あたりのピクセル数をカスタムしていた場合はライブラリ作成者と利用者側でCSSが異なる可能性すらあります。

こういったケースまで想定すると、ほぼ「ライブラリ側でライブラリ固有のPrefixを当ててスタイリングし、ビルド時にCSSも生成。利用者側でGlobalに近い位置でCSSをImportしてもらう」一択になってきます。Next.jsが進歩したらこれ以外の選択肢も生まれるかもしれませんが。

なお、Tailwind CSSのCSSをビルドすると、通常はpreflight用のCSSなどもついてきてしまって無駄なサイズになってしまいますので、不要なcorePluginはOFFにしましょう。

```plain text
  corePlugins: {
    preflight: false,
    gridTemplateColumns: true,
    gridColumn: true,
    gridColumnStart: true,
    gridColumnEnd: true,
    boxShadowColor: false,
    caretColor: false,
    divideColor: false,
    placeholderColor: false,
    ringColor: false,
    ringOffsetColor: false,
    textDecorationColor: false,
  },

```

それはそれでこうしてしまうと、Storybookからコンポーネントを見る時にReset CSSが当たっていなくて悲しいことになるので、Storybook側のpreview.tsからはpreflightをImportしてあげるといいです。

```plain text
import type { Preview } from '@storybook/react'
import '../src/styles/index.css'
import 'tailwindcss/lib/css/preflight.css' // 将来的にPathが変わるのが怖いなら内製でCSSを置いちゃうのも一案

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {

```

## GitHub Private Packagesについて

GitHub Private Packagesについては、既存文献も多く、公式Docsを読みながら気合でなんとか終わらせられる印象でした。本節では引っかかった落とし穴だけ数個書いておきます。

### 落とし穴：プロダクトコードRepoからのRead権限

地味な注意点としては、最終的に社内向けパッケージはGitHubのOrg傘下に作ることができるのですが、以下のようなURLで開ける設定画面にてプロダクトコードのRepositoryのActionsからReadできるようにしてあげないと、プロダクトコード側のCIからPackageがInstallできなくて詰みます。

`https://github.com/orgs/{org_name}/packages/npm/{package_name}/settings`

### 落とし穴：CI上でのPrivate Packageのインストール

また、CI上でPrivate PackageをInstallするには、環境変数で`secrets.GITHUB_TOKEN`にアクセスできればよい、というのは直感的に分かる話だと思うのですが、CI上でDocker BuildしてAmazon ECRなどにPushしています、といった場合においては、実質Dockerfile内でnpm installしているはずなので、Dockerfile内に環境変数を取り回してあげないといけません。

```plain text
- name: Build and tagging to docker images
  id: build-image
  run: |
    docker build {中略} --build-arg NODE_AUTH_TOKEN=${{ secrets.GITHUB_TOKEN }} -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -f Dockerfile .

```

```plain text
ARG NODE_AUTH_TOKEN
ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

# プライベートパッケージのインストールに必要
COPY .npmrc .npmrc

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

```

### 落とし穴：開発者のGitHub PATの権限不足

開発者が各自でGitHub Personal Access Tokenを発行し、それを使ってローカルでnpm installするわけですが、以下のように権限を付与する必要があります（repoはチェックいらないかも）。あと、最近はFine Grained Tokenなるものも増えているようですが、2024年1月時点では使えなかったので、今後の動向はキャッチする必要がありそうです。

## ライブラリとして仕上げよう

一通りの技術的な障壁を乗り越えたら、最後にライブラリとしての仕上げを行います。

- READMEを書き込む
- 事業側からIssueを受け取り、とりあえず数個起票する
- パッケージ名を決める。@org_name/org_name-uiといった形式がベター
- dependenciesとdevDependenciesの使い分けを見直す
- 利用者側に使用を強制したいライブラリをpeerDependenciesにいれる
- CIでLintやType Checkを入れる
- StorybookをGitHub Pagesにデプロイする。そのURLをGitHub RepoのURLに設定し、来訪した人がひと目で開けるようにする
- .npmignoreを設定し、余計なファイルが成果物に紛れ込まないようにする

.npmignore

```plain text
.github
.scaffdog
.storybook
/node_modules
/src
storybook-static
tsconfig.json
.eslintrc.cjs
.eslintignore
.prettier*
.npmrc
postcss.config.cjs
tailwind.config.*

```

## ライブラリの目的を見失わない

最後に、社内向けUIライブラリを作るにあたっては、目的を見失わないことが重要です。本記事では意図的に省略して書きましたが、今回私がライブラリを作った背景は以下の通りでした。

- 社内にて既存事業に加えて新規事業を数個立ち上げることが決定
- それぞれの事業はWebサービスではあるもののプロダクト特性は確定していない
- アサインするエンジニアは「フルスタックではあるがフロントエンドが得意とは限らない」
- 既存事業に揃えてフロントエンドはReactとNext.jsで統一する方針 以上から、目的もさることながら、「何が目的ではないか」を明示することが重要です。私はライブラリのREADMEに以下のように記載しました。

```plain text
## 何が目的ではないか
- デザインシステムの構築
  - サービスの特性が明確になっていないので、デザインシステムのように緻密な規約や規則を構築しきってしまうことは求めていない
  - ただし、再利用性を高めるなど必要だと判断できる工夫は都度取り入れる
- 高度に汎用性の高いライブラリの構築
  - たとえば以下のようなことは意図的にやっていません
    - Tailwind CSS以外のデザインシステムへの対応
    - モノレポ化して、フックやコンポーネント等ごとにサブパッケージを分ける
    - VueやSvelteなど他のフレームワークへの対応

```

また、過度に広めようとしすぎるのも問題です。課題があってそれに適したソリューションがあるわけなので、たとえば新規事業がバックエンドの技術に追われているときは、無理に話しかけにいってUIライブラリ使ってよ〜と言ってもワークしないでしょう。適宜メリットとデメリットを客観的に把握しながら、本当に不要になったら廃止することも辞さない考えを持っておくくらいがちょうどいいのかなぁ、と思っており、今回の社内向けUIライブラリは業務時間の合間に3営業日くらいという短めの期間で開発し、10コンポーネント程度からスタートしてみました。

# 終わりに：独学で情報収集するには

今回UIライブラリを作ってみるといいのではないか、と思い立ってから実行するまで、期間としては1週間足らずと短い間でした。加えて、私自身過去にライブラリを完成させたことは1度しか無い（文中に紹介しました）ですし、なんだかんだCJSとESMについて何となくの理解で生きてきましたし、そもそもフロントエンドの専門家でもないです。しかしその中で多くの調査や検証を行い、最終的に通常利用でき、Tree Shakingも効くようなライブラリが完成しました。

（強いフロントエンドエンジニアから見たら間違っていたりトレンドに追いついていない記述もあるかもしれないので、ぜひコメントで教えてください！）

そこで最後に、こういった場面で気合でなんとかそれっぽい成果物を完成させるための情報収集や検証のコツみたいなものをシェアして、本記事の〆にします。

- 複数種類の情報をInputする 
    - 今回のケースだと、以下のような情報ソースを行き来しました 
        - Node.jsのドキュメント
        - GitHubのドキュメント
        - TypeScriptのドキュメント
        - ESBuildやBun Bundlerのドキュメント
        - Private Packageを公開した企業の事例
        - Dual Packageを公開した企業の事例
        - [SmartHR UI](https://github.com/kufu/smarthr-ui/tree/master)のGitHub上のコード
        - 手元のNext.jsプロジェクトのnode_modules内からMUIやHeadless UIなど類似のパッケージのビルド結果を見る→GitHub上のビルドスクリプトを調べて答え合わせ
        - 知人のフロントエンドエンジニアさんと飲みに行った時に軽く質問
    - 特におすすめなのがとにかく類似のパッケージのコードを読みまくることです。また、MUIなど一定以上昔からあるUIライブラリだけでなくNextUIなど比較的モダンと思われるライブラリも見ることで、変遷を知ることもできます。Pure ESMパッケージについて知ったら、世の中のライブラリでPure ESMになっているパッケージを調べて実際に読んでみて自社でもできるかどうかいろいろな観点から考えます
    - 1次情報を読みに行くというのは当然の話で、どんな1次情報を仕入れるかを目前の目的に対して使い分けられるといいですね。SmartHR UIなんかは目先の目的とも一致度が高いですし、大いに参考にさせていただきました。
    - CHANGELOGの書き換えやバージョン更新をやってくれるrelease-pleaseという便利ツールも、どうやって見つけたか覚えていないですがいろいろなパッケージの配信周り追っていたら見つけた気がします
- 探索的に学習する 
    - ライブラリ作成は未知の分野ではありつつ、npmでpublishして手元のNext.jsからInstallすることですぐに動作確認ができ、CIを回してBundle Sizeへの影響を見れるので、とにかく調べた内容を上手くいくかわからんがpublishしてみる。そしてInstallしてみるというフィードバックループを実践できます
    - 探索的な学習が有効な場面だったので、片っ端から設定値いじってビルドして差分を見て、なるほどこの設定値をいじればこうなるのか〜を体験していけます
    - ただ私の個人的な悪い癖として、ゾーンに入るとひたすら実験を繰り返してロクにメモも残さないというのがあります。たとえばpostcss.config.cjsといった感じでライブラリ内の設定ファイルの拡張子が必ずcjsかmjsと明示していますが、これって何の意味があったのか覚えていません。反省です

# 告知

今回の記事の内容は一部、以下のGitHub Repoにて公開しているのでStarしてね！

以下のような話題で喋りたい方、ぜひご連絡ください！あまり表に出ないというか事例の少ない領域だと思うのでぜひ知見交換しましょう

- 自社ではこんな感じでビルド・配布している
- 布教活動はこのように進んでいる・こういった目的や課題感で作っている
- UIだけでなくHookとかESLintの設定も配布しているよ〜

また、私がCTOを務めている株式会社NoSchoolでは、以下のポジションでエンジニア採用をやっています（※執筆時点）。カジュアル面談とか雑談とかいつでも緩募していますのでお声がけください！

- 2020年リリースで、アフターコロナ下で安定した成長を続ける[オンライン家庭教師マナリンク](https://manalink.jp/)のWebエンジニア
- 社内向けUIライブラリなど、技術的なバックアップがある状況下でオンライン教育を軸に複数展開する新規事業のWebエンジニア

すでに立ち上がった事業をより確実に成長させていったり、成長に伴う痛みだったり課題に向き合っていきたい方は前者を、最初の1円の売上を上げるところからWeb事業をやってみたい方は後者にぜひ！

## 連絡先

Twitter（X）

Pitta（Meety）

# 参考文献