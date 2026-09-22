---
タグ: []
作成日時: 2024-10-01T23:46:00
URL: https://tech.plaid.co.jp/analyze-internal-ui-library-usage
Tags: [topic/デザインシステム/運用・浸透]
---
![](https://ik.imagekit.io/plaid/c4667546-efae-4d76-949d-c3c6f178d00e/analyze-internal-ui-library-usage.png?tr=w-1000,h-1000,c-at_max?tr=w-1000,height-1000,c-at_max)

株式会社プレイドでデザインエンジニアをしている安田です。

この記事では、社内向けに提供しているライブラリの使用状況を把握すべく作成した、プロダクト全体のソースコードを解析して、提供しているモジュールおよびそれを使用しているプロダクトごとに個別に自動集計する仕組みとその実装方法について解説します。

## ライブラリ開発の問題と使用状況の解析

弊社では、KARTEのプロダクト群全体のデザインシステムである「Sour」を開発しています。その一環として、React製のUIライブラリ「sour-react」を作成し、社内向けのnpmパッケージとして提供しています。現在、sour-reactはKARTEのいくつものプロダクトにおいて採用されており、UI開発に欠かせないものになるほど浸透しています。

作成したライブラリが広く使われるようになるのは喜ばしくもありますが、一方、それに伴って新たな問題が生じることもあります。その一つが、後からの仕様変更、とりわけ破壊的変更が難しくなってしまうことです。

原則的には、できるだけライブラリの破壊的変更を起こさないように開発を進めるべきではあります。しかし、ライブラリの機能が増え続けたり運用期間が長期化したりした結果、いずれその必要に迫られることは多かれ少なかれ避けがたいものです。

もし、ライブラリのユーザー数が少なく、その使用範囲も微々たるものであれば、破壊的変更が発生しても対応は容易です。しかしsour-reactは、数多くのプロダクトのUIにふんだんに組み込まれているため、破壊的変更に伴う影響を軽視できなくなりつつあります。また、破壊的変更に対応するためのユーザー側の労力が大きくなればなるほど、バージョンアップ作業が滞ってしまい、UIの不具合が放置される結果に繋がってしまうこともあります。とはいえ、その影響を必要以上に懸念して、変更すべきものを変更せずに誤魔化し続けるのも不健全です。

そこで、仕様変更に伴う影響範囲を適切に把握すべく、ライブラリの使用状況を解析して可視化する仕組みを作成しました。具体的に言えば、KARTEのすべてのソースコードの中から、sour-reactが読み込まれている箇所を検出して、どのプロダクトからどのモジュールが参照されているかを個別に自動集計するというプログラムを作成しています。これを用いて、マークダウンファイルとして次のような集計結果を出力しています。

![](https://ik.imagekit.io/plaid/b771e07d-ef2a-4f12-a1cb-05c25b971b8a/1.png)

![](https://ik.imagekit.io/plaid/0f570cbc-c10d-414a-9123-a67b638c14e1/2.png)

「sour-reactのモジュールごとの集計」という大見出しがあり、「Button (422)」という中見出しに続いて「XXX (140)」という小見出しがある。続いてファイルパスがリストで表示されている

![](https://ik.imagekit.io/plaid/02a8f29d-635b-4b2e-99dc-2eb40a111be7/3.png)

「sour-reactを利用するパッケージごとの集計」という大見出しがあり、「XXX (1720)」という中見出しに続いて「Button (140)」という小見出しがある。続いてファイルパスがリストで表示されている

これらの集計はGitHub Actionsによって定期的に自動実行され、毎朝9時になるたび最新の状態にアップデートされるようになっています。

この仕組みによって、実際にモジュールが参照されている箇所や、どのモジュールの使用頻度が高いか、どのプロダクトにおいて積極的に採用されているかなどを、効率的に調査できるようになりました。

一つの活用例としては、不要なモジュールをライブラリから削除するために、この集計結果を参考にして選定したことが挙げられます。Sourにはその歴史的な経緯により、特定のプロダクトでしか使われないような特殊なモジュールや機能が多く含まれていました。それらは本来的には、共有ライブラリとしてではなく、それぞれのプロダクト側のソースコードとして管理されるべきです。とはいえ、すでにライブラリとしての提供を行なってしまっている以上、意図せずそれらが使用されてしまっている可能性もあり、その疑念が晴れない限りは削除してしまうことが必ずしも得策とは言い切れませんでした。そこで、こうした集計結果を参考にすることで、各モジュールの使用状況を正確に把握し、確信を持って安全に変更を行うことができました。

## 実装方法の解説

続いて、先述した仕組みの実装方法について解説します。なお、この記事で紹介する仕組みは、OSSとしてGitHubに公開しています。解説と併せて参照してください。

[yuheiy/internal-library-reference-stats](https://github.com/yuheiy/internal-library-reference-stats)

集計結果の出力形式は次の3種類とします。

1. `README.md`: 横軸がsour-reactのモジュール名、縦軸がプロダクト名になったテーブルを出力する。セルにはそれに対応する参照箇所数を表示する。最終列と最終行には合計値を表示する。
2. `by-module-export-name.md`: 見出し2がsour-reactのエクスポート名、見出し3がプロダクト名という文書構造になり、参照箇所のファイル一覧がそれに続く。
3. `by-user-package.md`: 見出し2がプロダクト名、見出し3がsour-reactのエクスポート名という文書構造になり、参照箇所のファイル一覧がそれに続く。

処理の流れは主に次のようになります。

4. 
KARTEのソースコードを含むGitリポジトリから、拡張子が`js,ts,jsx,tsx`のいずれかに当たるファイルすべてを読み込む
5. 
TypeScriptのCompiler APIを使って、sour-reactを読み込むimport文を抽出する
6. 
import文の形式がnamed importsであれば、そのエクスポートの名前とimport文が出現する行数を取得する
7.  
named importsの解析結果をフラットな配列としてまとめる
```plain text
export type NamedImportsStat = {
  sourcePath: string;
  moduleExportName: string;
  lineRange: LineRange;
};

export function getNamedImportsStats(filePaths: string[]): NamedImportsStats[] {
  // ...
}

```
8. 
解析結果をまとめたものを出力形式に応じて加工して出力する

これらについて、いくつかにポイントを絞って解説します。

まず、ソースコードを解析するに当たって、対象となるソースコードを用意します。この仕組みをGitリポジトリとして管理するのであれば、解析対象のソースコードは[サブモジュール](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E3%82%B5%E3%83%96%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB)として取り込むのがよいでしょう。

それらのソースコードからimport文を抽出するには、ASTを使用するのが最適です。ソースコードからASTを生成するためにはいくつかのやり方がありますが、今回は[TypeScriptのCompiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)を使用することとします。

sour-reactでは、必要なモジュールを都度named importsによって読み込むことを推奨しています。具体的な使用例は次の通りです。

```plain text
import { Button, Tabs } from '@plaidev/sour-react';

```

このようなソースコードを解析して、named importsによって読み込まれているエクスポート名と、ソースコード内でimport文が出現する行数を取得します。たとえば次のような実装になります。

```plain text
import fs from 'node:fs';
import ts from 'typescript';

type LineRange = {
  start: number;
  end: number;
};

type NamedImports = Record<string, { lineRange: LineRange }>

export function analyzeNamedImports(filePath: string, targetModuleName: string): NamedImports {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

  const namedImports: NamedImports = {};

  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier.getText().slice(1, -1); // Remove quotes

      if (moduleSpecifier === targetModuleName) {
        const start = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
        const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
        const lineRange: LineRange = { start, end };

        const importClause = node.importClause;

        if (importClause) {
          if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
            importClause.namedBindings.elements.forEach((element) => {
              const importName = element.propertyName?.text ?? element.name.text;
              if (!(importName in namedImports)) {
                namedImports[importName] = { lineRange };
              }
            });
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return namedImports;
}

```

そして、この結果を後続の処理で扱えるように、フラットな配列としてまとめます。

```plain text
import { analyzeNamedImports, type LineRange } from './import-analyzer';

const targetModuleName = '@plaidev/sour-react';

export type NamedImportsStat = {
  sourcePath: string;
  moduleExportName: string;
  lineRange: LineRange;
};

export function getNamedImportsStats(filePaths: string[]) {
  const result: NamedImportsStat[] = [];

  for (const filePath of filePaths) {
    const namedImports = analyzeNamedImports(filePath, targetModuleName);

    for (const [moduleExportName, { lineRange }] of Object.entries(namedImports)) {
      result.push({
        sourcePath: filePath,
        moduleExportName,
        lineRange,
      });
    }
  }

  return result;
}

```

```plain text
import fg from 'fast-glob';
import { analyzeFiles } from './import-analysis-organizer';

async function main() {
  const filePaths = await fg.glob('internal-library-reference-stats-user-a/**/*.{js,ts,jsx,tsx}');
  const namedImportsStats = getNamedImportsStats(filePaths);
  // ...
}

main().catch((e) => {
  throw e;
});

```

こうして作成した配列を、データの出力形式に応じて分類します。モジュールのエクスポート名とプロダクト名というそれぞれの軸に応じて処理します。

```plain text
function groupByModuleExportName(namedImportsStats: NamedImportsStat[]): Map<string, NamedImportsStat[]> {
  // ...
}

function groupByUserPackage(namedImportsStats: NamedImportsStat[]): Map<string, NamedImportsStat[]> {
  // ...
}

const byModuleExportName = groupByModuleExportName(namedImportsStats);
const byUserPackage = groupByUserPackage(namedImportsStats);

```

データをプロダクトごとに分類する際には、import文が書かれているファイルがどの`package.json`に属しているかに基づいて処理します。[pkg-dir](https://github.com/sindresorhus/pkg-dir)を使うことで、そのファイルの親に当たる`package.json`のパスを取得できます。

```plain text
import path from 'node:path';
import { packageDirectorySync } from 'pkg-dir';

function groupByUserPackage(namedImportsStats: NamedImportsStat[]): Map<string, NamedImportsStat[]> {
  const result = Map.groupBy(namedImportsStats, ({ sourcePath }) =>
    packageDirectorySync({ cwd: path.dirname(sourcePath) })
  );
  // ...
}

```

これらのような操作によって、最終的に出力するコンテンツを生成します。実際の処理はやや複雑であるため、説明は割愛します。ご興味があればソースコードを見てみてください。

[internal-library-reference-stats/scripts/renderers.ts](https://github.com/yuheiy/internal-library-reference-stats/blob/main/scripts/renderers.ts)

最後に、これらの処理を定期的に実行させるために、GitHub Actionsのワークフローをセットアップします。ソースコードの解析を行う前に、サブモジュールとsour-reactのバージョンを最新の状態にアップデートするようにします。ワークフローは、日本時間で午前9時になるたび毎日実行されるように設定します。

```plain text
name: Auto update

on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  auto-update:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true
      - name: Update submodules
        run: git submodule update --remote
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - name: Install dependencies
        run: |
          npm ci
          npm update @plaidev/sour-react
      - name: Build
        run: npm run build
      - name: Commit changes
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
          git add --all
          git commit -m "Automated build"
          git push

```

## internal-library-reference-statsの使い方

[internal-library-reference-stats](https://github.com/yuheiy/internal-library-reference-stats)はOSSとして公開されているので、どなたでもご自由に利用することができます。基本的には、次のようにすることで使い始められます。

9. 
internal-library-reference-statsをテンプレートリポジトリとして新規リポジトリを作成する
10. 
作成したGitリポジトリをクローンする。`git clone`に`--recursive`フラグを付与するとサブモジュールも併せてクローンできるが、この時点では不要
11.  
サンプル用のサブモジュールとその設定を削除する
```plain text
rm -rf user-repositories/*/
rm .gitmodules
git add .
git commit -m "deinit submodules"

```
12.  
解析対象のGitリポジトリをサブモジュールとして追加する
```plain text
git submodule add https://github.com/<user>/<name> user-repositories/<name>

```
13.  
サブモジュールをクローンするためにトークンが必要であれば、`.github/workflows/auto-update.yml`でのチェックアウトのステップにトークンを設定する
```plain text
- name: Checkout
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.GITHUB_ACCESS_TOKEN }}
    submodules: true

```
14. 
`package.json`の`name`を任意の名前に変更する。これが`README.md`のタイトルになる
15.  
解析対象のモジュールをインストールする
```plain text
npm remove antd
npm install @plaidev/sour-react

```
16.  
`scripts/config.ts`の設定を書き換える
    - `targetModuleName`は解析対象のモジュール名。この記事で言うところの`@plaidev/sour-react`
    - `targetModuleTitle`は解析対象のモジュールのタイトル。`README.md`に表示される。`targetModuleName`と同じでも構わない
    - `targetModuleUrl`は解析対象のモジュールのURL。`README.md`からリンクされる
    - `userPackageNameMap`はプロダクトの表示名。対象となるプロダクトのディレクトリへのパスと、その名前の対応関係を設定する。未設定の場合は、ディレクトリのパスが表示名として出力される。ビルドを実行することで対象ディレクトリを把握できるので、一度ビルドを行ってからの方が設定しやすい
17.  
`.github/workflows/auto-update.yml`でのインストールのステップで、解析対象のモジュールをアップデートするように設定する
```plain text
- name: Install dependencies
  run: |
    npm ci
    npm install @plaidev/sour-react@latest

```
18.  
依存関係をインストールしてからビルドする。プロダクトの表示名が未設定の場合はディレクトリのパスが出力されるので、別の表示名にしたければ`scripts/config.ts`で設定する
```plain text
npm ci
npm run build

```
19.  
`.github/workflows/auto-update.yml`でコメントアウトされた`schedule`を有効化する
```plain text
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

```
20. 
変更をコミットしてプッシュする

## 最後に

ライブラリの使用状況を解析する仕組みについては、ライブラリを開発するエンジニアであれば一度は考えたことがあるかと思いますが、開発コストや実現可能性などの問題により、実際に作成された例はあまり多くはないのではないでしょうか。

今回作成したこの仕組みをオープンソースとして公開することで、みなさんの開発現場においても、使用状況の可視化を実現するための助けになれば幸いです。

記事をシェア