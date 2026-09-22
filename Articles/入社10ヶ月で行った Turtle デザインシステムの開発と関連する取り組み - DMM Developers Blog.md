---
タグ: []
作成日時: 2025-01-25T19:18:00
URL: https://developersblog.dmm.com/entry/2024/12/02/110000
Tags: [topic/デザインシステム/導入事例]
---
![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121091857.png)

- [はじめに](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
- [私のチーム](https://developersblog.dmm.com/entry/2024/12/02/110000#%E7%A7%81%E3%81%AE%E3%83%81%E3%83%BC%E3%83%A0)
- [10ヶ月間での私の取り組みタイムライン](https://developersblog.dmm.com/entry/2024/12/02/110000#10%E3%83%B6%E6%9C%88%E9%96%93%E3%81%A7%E3%81%AE%E7%A7%81%E3%81%AE%E5%8F%96%E3%82%8A%E7%B5%84%E3%81%BF%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%A9%E3%82%A4%E3%83%B3)
- [Turtle とは](https://developersblog.dmm.com/entry/2024/12/02/110000#Turtle-%E3%81%A8%E3%81%AF)
    - [Turtle の構成要素](https://developersblog.dmm.com/entry/2024/12/02/110000#Turtle-%E3%81%AE%E6%A7%8B%E6%88%90%E8%A6%81%E7%B4%A0)
    - [デザイン原則](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%8E%9F%E5%89%87)
    - [ガイドライン](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%82%AC%E3%82%A4%E3%83%89%E3%83%A9%E3%82%A4%E3%83%B3)
    - [Turtle ライブラリ](https://developersblog.dmm.com/entry/2024/12/02/110000#Turtle-%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA)
    - [ドキュメント](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88)
- [Turtle 開発で取り組んだこと](https://developersblog.dmm.com/entry/2024/12/02/110000#Turtle-%E9%96%8B%E7%99%BA%E3%81%A7%E5%8F%96%E3%82%8A%E7%B5%84%E3%82%93%E3%81%A0%E3%81%93%E3%81%A8)
    - [デモサイト（リファレンスアプリ）の作成](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%83%87%E3%83%A2%E3%82%B5%E3%82%A4%E3%83%88%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E4%BD%9C%E6%88%90)
    - [デザイントークンの一元管理](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%AE%E4%B8%80%E5%85%83%E7%AE%A1%E7%90%86)
        - [デザイントークンの一元管理：改善案](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%AE%E4%B8%80%E5%85%83%E7%AE%A1%E7%90%86%E6%94%B9%E5%96%84%E6%A1%88)
        - [スプレッドシートと GAS](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%A8-GAS)
        - [Figma への JSON インポート（Local Variables Manipulator プラグイン）](https://developersblog.dmm.com/entry/2024/12/02/110000#Figma-%E3%81%B8%E3%81%AE-JSON-%E3%82%A4%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88Local-Variables-Manipulator-%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3)
        - [Turtle マニュアルと React コード](https://developersblog.dmm.com/entry/2024/12/02/110000#Turtle-%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB%E3%81%A8-React-%E3%82%B3%E3%83%BC%E3%83%89)
    - [Figma Code Connect の設定](https://developersblog.dmm.com/entry/2024/12/02/110000#Figma-Code-Connect-%E3%81%AE%E8%A8%AD%E5%AE%9A)
        - [React による Code Connect](https://developersblog.dmm.com/entry/2024/12/02/110000#React-%E3%81%AB%E3%82%88%E3%82%8B-Code-Connect)
    - [ドキュメントの一元管理](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%E3%81%AE%E4%B8%80%E5%85%83%E7%AE%A1%E7%90%86)
        - [Storybook の CSS, JS カスタマイズ](https://developersblog.dmm.com/entry/2024/12/02/110000#Storybook-%E3%81%AE-CSS-JS-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)
        - [Storybook のアクセス解析による統計情報の取得](https://developersblog.dmm.com/entry/2024/12/02/110000#Storybook-%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E8%A7%A3%E6%9E%90%E3%81%AB%E3%82%88%E3%82%8B%E7%B5%B1%E8%A8%88%E6%83%85%E5%A0%B1%E3%81%AE%E5%8F%96%E5%BE%97)
        - [サイドバーのメニュー項目の構造見直しと mdx 記述](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%82%B5%E3%82%A4%E3%83%89%E3%83%90%E3%83%BC%E3%81%AE%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E9%A0%85%E7%9B%AE%E3%81%AE%E6%A7%8B%E9%80%A0%E8%A6%8B%E7%9B%B4%E3%81%97%E3%81%A8-mdx-%E8%A8%98%E8%BF%B0)
- [その他の活動](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E6%B4%BB%E5%8B%95)
- [おわりに](https://developersblog.dmm.com/entry/2024/12/02/110000#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)

# はじめに

こんにちは。DMM.com の高井 実です。

私は2000年頃より debiru ([@debiru_R](https://x.com/debiru_R)) という名前で HTML, CSS の設計手法やリソースの在り方、URL の考え方について研究してきました。近年では Web アクセシビリティ、セキュアな Web アプリケーション開発手法、パスワードポリシーの在り方、DNS の仕組みについて考察・啓発しています。

DMM.com では、プラットフォーム開発本部 第3開発部 Developer Productivity グループのフロントエンドチームで、社内プロダクト向けのデザインシステム **Turtle** を開発しています。Turtle は現在 React アプリケーション専用のコンポーネントライブラリを提供しています。

2024年2月に DMM.com に入社し、この12月で入社11ヶ月目になります。私が入社する前から Turtle は開発されており、私は途中から開発に参加したという立場であるため、過去に行われた設計や実装については私が知らない部分もあります。

この記事では、私が入社してからこの10ヶ月間で DMM.com で取り組んできたこと、特に Turtle 開発の周辺情報についてお伝えできればと思います。

# 私のチーム

私の所属しているフロントエンドチーム（本部、部、課などでいう課に相当）は2024年12月現在で8名いますが、その中で2つのチームに分かれています。App チームと Turtle チームです。私は Turtle チームに所属しています。

App チーム（エンジニア4名）では、DMM のプロダクト関連サイトの開発リソースに関する Monorepo 管理や決済に関わるプロダクトのサイト開発など、フロントエンド領域のインフラ管理を担当しています。

Turtle チーム（デザイナー2名、エンジニア2名）では、DMM のプロダクト関連サイトを開発する際に効率的な開発ができるようにするためのデザインシステム **Turtle** を開発・運用・提供しています。

私の Turtle チームではスクラム開発を採用しており、1週間のスプリントで開発作業を行っています。1週間ごとに成果物を出しフィードバックを得ているので、まるで Web ブラウザ等のラピッドリリースのような、高速な新機能のリリースと軌道修正ができるようになっています。

また、モブ作業（複数人で群がって1つの作業をすること）を積極的に実施することで、デザイナーとエンジニアという垣根を超えて、それぞれの職種の視点を共有しながら日々の作業を行えています。チームにスクラム開発のベストプラクティスを馴染ませるのには少し時間がかかりましたが、慣れてからは効率的な開発が実現できるようになり、1週間という短いスプリント期間の中でも価値（成果物）を計画通り出せるようになりました。

# 10ヶ月間での私の取り組みタイムライン

- 2024年2月 
    - 入社し、React を初めて触りました
- 3月〜5月（第1四半期） 
    - React と Turtle に慣れる目的も含め、Turtle コンポーネントライブラリを使った「デモサイト（リファレンスアプリ）の作成」をしました
    - 社内横断型の LT 大会で「DNS 浸透いうな」というテーマで講演しました
- 6月〜8月（第2四半期） 
    - Turtle デザインシステムの改善施策として、「デザイン原則」の見直し、「デザイントークンの一元管理」を行いました
- 9月〜11月（第3四半期） 
    - 引き続き Turtle の改善施策として、「Figma Code Connect の設定」と「ドキュメントの一元管理」を行いました
    - 社内横断型の LT 大会で「DNS 浸透いうな（改）」というテーマで講演しました

さらっと書いていますが、Turtle の改善施策では技術的な仕組みづくりや工夫を凝らしたシステム設計術を多分に含んでいるため、この記事ではその工夫されたポイントについて紹介します。余談ですが DNS といった Turtle 以外の活動についても最後に少しだけ触れたいと思います。

# Turtle とは

まず始めに、Turtle の概要と構成について触れておきます。

**Turtle** とは、DMM.com プラットフォーム開発本部 フロントエンドチーム（Turtle チーム）にて開発しているデザインシステムの名称です。プラットフォーム開発本部は、認証・決済など DMM のプラットフォーム機能を担当しています。

DMM.com 社内では様々な部署があり、各部署ではプロダクトを開発しています。そのプロダクトの Web サイトを開発する際にデザインシステムを用いられることがありますが、そのデザインシステムはいくつかの部署によって独自に開発されたりもしています。

我々のフロントエンドチームは組織横断型のチームとして、社内で統一的に、全プロダクトで使われるような DMM.com 唯一のデザインシステムを目指して Turtle を開発しています。現状では Turtle はプラットフォーム機能全体への適用はできていませんが、いくつかのプロダクトでは採用してもらっています。また一方でプラットフォーム外でも一部のプロダクトで採用されており、そのシェアを少しずつ伸ばしています。将来的には DMM で全社的に使われるデザインシステムとして、社外公開もできたらと考えています。

Turtle について過去に公開された記事があるので、ここで紹介しておきます。

- [（2022年8月）DMM プラットフォームのフロントエンド開発を支えるエコシステム](https://inside.dmm.com/articles/dmm-frontend-ecosystem/)
- [（2022年10月）デザインシステムにおけるタイポグラフィーの試行錯誤](https://inside.dmm.com/articles/dmm-design-system-typography/)
- [（2023年3月）サービスを支える基盤であり共通言語。DMMのデザインシステム「Turtle」が目指すもの](https://spctrm.design/jp/interviews/launch-and-operation-of-design-system/)

## Turtle の構成要素

デザインシステムとして、次のような要素を持っています。

- デザイン原則
- ガイドライン 
    - スタイルガイドライン
    - アクセシビリティガイドライン
    - コミュニケーションガイドライン
- Turtle ライブラリ 
    - デザイントークン
    - コンポーネントデザイン（Figma）
    - コンポーネント実装（React）
- ドキュメント 
    - Turtle マニュアル（デザイントークンやコンポーネントの説明書）
    - コンポーネントショーケース（Storybook）

## デザイン原則

Turtle デザインシステムは、次の5つの価値を大切にします。

- Achieve Goals - 効率的に目的を達成できる
- Bring out Abilities - クリエイターの能力を最大限に引き出す
- Consistency - 一貫性を担保する
- Design Intent - 設計の意図を明確にする
- Evolve - 変化を恐れず進化する

それぞれの項目を英語にして頭文字を取ると ABCDE となるようにしてみました。デザイン原則を忘れたときにも ABCDE をきっかけにして思い出すことができます。

この項目それぞれについても、より詳細な意図や思いがありますが、ここでは割愛します。いつになるかはまだ分かりませんが、将来、Turtle がパブリックに公開できるようになった暁にお披露目できればと思います。

## ガイドライン

Turtle を使ったりカスタマイズしたりするときにはどのようなことを意識して守らなければならないかについて規定したガイドラインです。

スタイルガイドラインでは、主にデザイントークン（色や余白など）の使い方に関する取り決めを定めています。

アクセシビリティガイドラインでは、最終的に出力される HTML がどのようになっているべきなのかについて Web アクセシビリティの観点から取り決めを定めています。

コミュニケーションガイドラインでは、主にクリエイター（デザイナーとエンジニア）が効率よく開発を進めるための取り決めを定めています。

## Turtle ライブラリ

デザイントークンでは、次の5つの要素をトークンとして用意しています。

- border-radius
- color
- spacing
- typography (font-family, font-size, font-weight, line-height)
- z-index

コンポーネントデザインでは、Figma でデザインデータを管理しており、Turtle 利用者は Figma 上で Turtle のコンポーネントを利用して Web ページをデザインできます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241111/20241111000201.png)

Figma の画面キャプチャ

コンポーネント実装では、React のコンポーネントライブラリを提供しており、React ベースのアプリケーション（Web サイト）を開発するプロダクトであれば React コンポーネントを利用して実装できます。将来的には React に限定されない形で Turtle コンポーネントの提供を目指しています。

## ドキュメント

Turtle マニュアルでは、デザイントークンやコンポーネントの種類や使い方、設計意図について、Turtle 利用者が知りたい情報をまとめています。

コンポーネントショーケースでは、Storybook を用いて、実装コードの実際の表示結果やバリエーションを Web ブラウザ上で確認できるようにしています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241111/20241111000210.png)

Storybook の画面キャプチャ

# Turtle 開発で取り組んだこと

前置きが長くなりましたが、ここからが本題です。

- 3月〜5月（第1四半期） 
    - React と Turtle に慣れる目的も含め、Turtle コンポーネントライブラリを使った「デモサイト（リファレンスアプリ）の作成」をしました
- 6月〜8月（第2四半期） 
    - Turtle デザインシステムの改善施策として、「デザイン原則」の見直し、「デザイントークンの一元管理」を行いました
- 9月〜11月（第3四半期） 
    - 引き続き Turtle の改善施策として、「Figma Code Connect の設定」と「ドキュメントの一元管理」を行いました

デザイン原則については前述しましたが、見直した結果、現在の ABCDE 原則を制定しました。

ここからは、デモサイト（リファレンスアプリ）の作成、デザイントークンの一元管理、Figma Code Connect の設定、ドキュメントの一元管理について詳細に解説していきます。

## デモサイト（リファレンスアプリ）の作成

Turtle を使った参考サイトとして、リファレンスアプリと呼んでいるデモサイトを作成しました。Turtle の改善をするにあたってユーザー（Turtle 利用者）が何を求めているかをヒアリングしたところ、Turtle の使い方を理解できる実装例があると助かるという意見がでました。

そこでフォーム周りのコンポーネントの実装例を紹介するための、会員登録ページ（フォーム入力ページ、確認ページ、完了ページ）を作ることにしました。Turtle を使って Figma でデザインを行い、そのデザインに沿って React で実装をしています。デザインの再現だけでなく、住所入力フォームでは郵便番号から住所を導出するといったインタラクティブな機能も参考実装として行いました。

これまで Turtle デザインシステムを開発してきましたが、Turtle を実際に使って Web サイトを作るといった機会を設けていなかったため、実際に自分たちで Turtle を使ってみると不便な点や改善点がいくつか見つかりました。改善点についてはリファレンスアプリの開発と並行して修正作業を行い、改善したコンポーネントをリファレンスアプリで使える状態にできました。

## デザイントークンの一元管理

Turtle ライブラリとして「コンポーネントデザイン」と「コンポーネント実装」があり、またドキュメントとして「Turtle マニュアル」があると述べました。

例えば、Color のデザイントークンである `**Blue100**` について、このグローバルトークンに対応するカラーコードの値は何でしょうか。その値を我々は決めてはいるのですが、その値 `**#EBF3FF**` をどこに保持しているかというと、「コンポーネントデザイン」と「コンポーネント実装」と「Turtle マニュアル」にそれぞれ記述していました。

これでは、値が変わったりトークンが増減したときに3箇所を変えなければなりません。また、変更を忘れたり、書き間違えたりしたときにデザイントークンの整合性が失われてしまいます。

この問題を解決するための取り組みが「デザイントークンの一元管理」でした。これを第2四半期である6月〜8月に取り組みました。

### デザイントークンの一元管理：改善案

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241026/20241026153506.png)

この図では次のような構成であることを述べています。マスターデータとしてスプレッドシートを用意し、スプレッドシートから GAS（Google Apps Script）を経由して JSON を出力します。その JSON を GitHub でバージョン管理しつつ GitHub Pages で取得できるようにします。JSON には2種類あり、単にスプレッドシートの記述内容を二次元データとして出力した Simple JSON 形式と、Figma でデータをインポートできるように加工した JSON for Figma 形式があります。これらを「Turtle マニュアル」「コンポーネント実装」「コンポーネントデザイン」に渡してインポートして使うようにします。

### スプレッドシートと GAS

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241026/20241026153517.png)

スプレッドシートに gray100, gray200, gray300 のように色情報が数値トークンとともに列挙されている。

スプレッドシートにはデザイントークンとその具体値をプログラムから利用可能な形式で記述しておきます。一部のセルは計算式を利用して自動的に出力しています。

GAS（Google Apps Script）では、スプレッドシートに記述した内容を Web API として JSON で参照可能なように公開する機能があります。JSON として参照できるようにするためには、Web API のデプロイ操作の他に、GAS に `**doGet**` という関数を定義する必要があります。

以下は単純化した実装ですが、これでスプレッドシートの内容を JSON として参照できます。

```plain text

const SID = 'スプレッドシートのID';

function doGet(e) {

  const data = getRecords('globalColor');

  return jsonResponse(e, data);

}

function getRecords(sheetName) {

  const sheet = SpreadsheetApp.openById(SID).getSheetByName(sheetName);

  const values = sheet.getDataRange().getValues();

  const keys = values.shift();

  const records = values.map(row => row.reduce((acc, cell, i) => {

    acc[keys[i]] = cell;

    return acc;

  }, {}));

  return records;

}

function jsonResponse(e, data) {

  const json = JSON.stringify(data, null, 2);

  const response = {

    mime: ContentService.MimeType.JSON,

    content: json,

  };

  return ContentService.createTextOutput(response.content).setMimeType(response.mime);

}
```

```plain text

[

  {

    "colorName": "gray",

    "token": 50,

    "mode.Light": "#FFFFFF"

  },

  {

    "colorName": "gray",

    "token": 75,

    "mode.Light": "#FAFAFA"

  },

  {

    "colorName": "gray",

    "token": 100,

    "mode.Light": "#F5F5F5"

  },

  ...

]
```

GAS を実装するにあたっては、コードのバージョン管理やテストコードの実装も含めて行うため、[Clasp](https://github.com/google/clasp) を用いてコマンドラインベースで GAS の管理ができる仕組みを整えています。

詳細は [GAS を Clasp + esbuild + TypeScript + Jest + Git 環境で管理・開発する](https://qiita.com/debiru/items/d2e7e5b437b438014113)をご覧ください。

### Figma への JSON インポート（Local Variables Manipulator プラグイン）

Figma には Local Variables という変数を管理する仕組みがあります。これを用いて Figma 上でデザイントークンを管理しています。しかし、Figma には Local Variables のインポートやエクスポートといった機能が標準では用意されていません。そのため、それを実現したい場合はプラグインを用いる必要があります。

この作業を進めていた2024年7月時点で、Local Variables のインポート・エクスポートを行うプラグインはいくつか存在していましたが、JSON の形式や使い勝手に多少問題があったため、プラグインを自作することにしました。

自作したのがこちらの [Local Variables Manipulator](https://www.figma.com/community/plugin/1395633889534142383/local-variables-manipulator) プラグインです。略称は LVM です。LVM の内部実装について興味がある方は、[Figma Plugin API を用いた Local Variables Export/Import プラグインの開発](https://qiita.com/debiru/items/11f36ad5db5be8a120bc)をご覧ください。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241026/20241026153527.png)

LVM のポップアップ画面。上部にエクスポートのテキストエリア、下部にインポートのテキストエリアがある。

Export ボタンを押すと、現在の Figma ファイル上に設定されている Local Variables を JSON 形式で出力します。

Import ボタンは、Export される JSON と同じ形式で記述した JSON を基に Figma ファイルに Local Variables を設定（上書き）する処理を実行します。

JSON の形式は次の通りです。

```plain text

{

  "ColorExample": {

    "Alias Token/primary": {

      "$variableValues": {

        "Light": "$Global Token/blue/100",

        "Dark": "$Global Token/blue/100"

      },

      "$description": "",

      "$codeSyntax": {

        "WEB": "color.aliasToken.primary"

      },

      "$scopes": [

        "ALL_SCOPES"

      ],

      "$hiddenFromPublishing": false

    },

    "Global Token/blue/100": {

      "$variableValues": {

        "Light": "#0000FF",

        "Dark": "#0000FF"

      },

      "$description": "",

      "$codeSyntax": {

        "WEB": "color.globalToken.blue['100']"

      },

      "$scopes": [

        "ALL_SCOPES"

      ],

      "$hiddenFromPublishing": false

    }

  }

}
```

これで、Figma に関してはマスターデータであるスプレッドシートから、Figma の Local Variables へデザイントークンのデータを入れることができるようになりました。

### Turtle マニュアルと React コード

Turtle マニュアルは、もともとは JavaScript が記述可能な社内 Wiki サイト（Confluence）に掲載していました。そのため、2024年7月時点ではそのマニュアルページから JSON でスプレッドシートのデータを取得してマニュアルに書き出すという手順を採ることで、マニュアルについてもデザイントークンの一元化が実現できました。

コンポーネント実装である React コードについては、もともと実装側にデザイントークンをベタ書きしていたわけですが、これを JSON から変換して実装コードとして利用可能になるようにしました。JSON と実装コードの変換処理を吸収するライブラリとして turtle-design-tokens というものを新たに作り、そこで Simple JSON を受け取って実装コードに変換するという手順を採りました。

一つポイントだったのが、もともとデザイントークンの実装コードには JSDoc を丁寧に書いていて、それによって VS Code 等の開発環境で JSDoc の内容がコードヒントとして出力されていました。そのため、単に JSON をプログラム的にインポートするだけだと JSDoc の情報が失われてしまうという問題がありました。これを防ぐため、JSON をインポートするだけではなく、メタプログラミングする形で JSDoc や型情報を含めてデザイントークンの JSON を実装コードに変換するという仕組みを考えました。

「デザイントークンの一元管理」については以上です。次は「Figma Code Connect の設定」について見ていきます。

## Figma Code Connect の設定

Figma は高機能なデザインツールであり、デザインデータとしてコンポーネントやプロパティを設定できます。このため、Figma 側に各種コンポーネントが存在し利用可能になっているのですが、Turtle デザインデータでは、そのプロパティ設計などが実装コードと乖離しているという問題がありました。

実装コードと Figma データでは、そのプロパティの使い方などが若干異なるため、必然的に差異は多少生じてしまいます。しかしながら、同じ機能なのにプロパティ名が実装とデザインで異なっているなど、差異が生じなくてもよい場面で差異が生じているということがあったのでこれらを統一するために Figma データを修正することにしました。

また、Figma には **Code Connect** という機能があります。これはデザインデータ上で組んだコンポーネントやプロパティの設定に対して、それに対応する実装コードを Figma 上で出力するというものです。これを用いるとコーディング作業時に Figma からコードをコピーペーストするだけで実装ができてしまうという強力な機能になっています。この機能を活かすべく、Figma データを修正してから Code Connect を全コンポーネントに対して設定するという作業を2024年10月に行いました。

### React による Code Connect

[公式の React Code Connect ドキュメント](https://github.com/figma/code-connect/blob/main/docs/react.md)は、2024年9月時点で情報がそれほど充実しておらず、試行錯誤しながら Code Connect を設定する手順や仕様について調査しながら作業を進めました。

Code Connect のテンプレートファイルを生成するには、サブコマンドなしで `npx figma connect` を実行する手順が紹介されています。これは「Figma 上のどのコンポーネントに、どの実装ファイルを関連付けるか」というのを対話型モードで操作するのですが、対話型モードは操作するのが少し面倒です。慣れてくれば以下のようにサブコマンドを付けてコマンド一発で `*.figma.tsx` ファイルを生成した方が効率良く作業できました。

```plain text

npx figma connect create "Figma コンポーネントの URL" -o "./path/to/index.figma.tsx" --token "アクセストークン"
```

Code Connect は、設定用の実装コード（`*.figma.tsx`）を記述して、コマンドラインから publish コマンドを実行することで Figma ファイルへの設定をします。しかし、その設定用の実装コードは一般的なプログラムコードとは異なり、Code Connect 独自の構文上の制約が存在します。

[Code Connect の docs/react.md](https://github.com/figma/code-connect/blob/v1.2.1/docs/react.md#getting-started---manual-setup) より引用：

> Note: Code Connect files are not executed. While they're written using real components from your codebase, the Figma CLI essentially treats code snippets as strings. This means you can use, for example, hooks without needing to mock data. However, this also means that logical operators such as ternaries or conditionals will be output verbatim in your example code rather than executed to show the result. You also won't be able to dynamically construct figma.connect calls in a for-loop, as an example. If something you're trying to do is not possible because of this restriction in the API, we'd love to hear your feedback.

（拙訳）Code Connect ファイルは実行されません。これらのファイルはコードベースの実際のコンポーネントを使用して書かれていますが、Figma CLI は本質的にコードスニペットを文字列として扱います。つまり、データをモックすることなく、例えばフックを使用できます。しかし、これは、条件演算子（三項演算子）のような論理演算子が、結果を表示するために実行されるのではなく、サンプルコードにそのまま出力されることを意味します。また、例えば `figma.connect` の呼び出しを for ループの中で動的に構成できません。API にこのような制限があるために、あなたがやろうとしていることができないのであれば、ぜひフィードバックをお寄せください。

というようなことが書かれています。冒頭の「Code Connect ファイルは実行されません」というのが制約として特殊であり、通常であればループ文や条件分岐を使って書けるコードを、コピーペーストする形で何個も書かなければならないということです。

Code Connect 設定用の実装コードの例を以下に示します。この3行目の URL 部分を変数にしたり、コード下部の `example` プロパティの関数の中にロジックを記述したりすることが一切できません。実行コードのようで、文字列として解析されて処理されるというわけです。

```plain text

figma.connect(

  FormLabel,

  'https://www.figma.com/design/...',

  {

    props: {

      labelText: figma.string('labelText'),

      badgeType: figma.enum('badge?', {

        required: 'required',

        optional: 'optional',

        none: 'none',

      }),

    },

    example: (props) => {

      return (

        <FormLabel label={props.labelText} badgeType={props.badgeType} />

);

    },

  },

);
```

2024年10月はこの Code Connect の設定を Turtle の全コンポーネントに対して行いましたが、その経験によって Code Connect に関する知見をたくさん得ることができました。また、10月16日にリリースされた Code Connect v1.2.0 では React の publish 実行時の不具合を発見し報告しましたが、これは10月24日にリリースされた [Code Connect v1.2.1](https://github.com/figma/code-connect/releases/tag/v1.2.1) で修正していただきました。

「Figma Code Connect の設定」については以上です。最後に「ドキュメントの一元管理」について見ていきます。

## ドキュメントの一元管理

Turtle の利用者が Turtle の情報を確認したいとき、2024年10月時点では社内 Wiki サイトを確認したり、Storybook を確認したりと、リソースを行き来する必要がありました。将来的に Turtle の情報を一般公開することを考えたとき、社内 Wiki サイトは公開できないので困るということもあり、公開に向いている Storybook 上に Turtle マニュアル情報を集約することにしました。

また、ドキュメントの一元管理を進めるにあたってはユーザー（Turtle 利用者）へのアンケートを行い、よく参照している Turtle 関連文書は何か、Storybook は普段参照しているか、といった情報を収集しました。ユーザーにとって Storybook が馴染みのあるリソースであることを確認できたので、Storybook に情報を集約することがユーザーにとってもベストであるという判断をしています。

### Storybook の CSS, JS カスタマイズ

Storybook は、サイドバーとメインエリアを伴う「マネージャーエリア」と、ストーリーやドキュメントを表示する「プレビューエリア」で構成されています。プレビューエリアは `iframe` 要素で表示されています。

このそれぞれのウィンドウに対して、任意の head 要素内容を設定できます。つまり、任意の CSS や JavaScript を挿入できるというわけです。その方法は次の通りです。

- マネージャーエリアに対しては `.storybook/manager-head.html` ファイルを記述する
- プレビューエリアに対しては `.storybook/preview-head.html` ファイルを記述する

参考：[CSS escape hatches](https://storybook.js.org/docs/configure/user-interface/theming#css-escape-hatches)

### Storybook のアクセス解析による統計情報の取得

我々のチームでは Turtle の Storybook に Google Analytics を設定してアクセス解析を行っています。Turtle の利用者がどのコンポーネントを特に参照するのかを調査することで、優先的に改善すべきコンポーネントが何であるかの参考にしています。

なお Turtle 開発メンバーのアクセスを解析対象から除外するために、特定のフラグを localStorage にセットしています。フラグがあれば Google Analytics のコードを出力しないようなスクリプトを `manager-head.html` を介して設定しています。

### サイドバーのメニュー項目の構造見直しと mdx 記述

Storybook のサイドバーの構造を見直し、より適切な構造でデザイントークンおよびコンポーネントライブラリを展開できるようにするという作業を2024年11月に行いました。

mdx は「JSX が含められる Markdown」を書くことができる仕組みで、Storybook では mdx が使えるようになっています。特に Storybook v8.x では mdx のバージョン v3 に対応し、その機能が強化されました。これらを活用し、Turtle に関する情報を Storybook に集約することで、Storybook 本来のストーリー（ショーケース）と密に相互参照しながら、コンポーネントのプロパティや使い方について説明を参照できるようにしました。

mdx 上で各コンポーネントの Props 情報を出力するにあたっては、Storybook で提供されている [`ArgTypes`](https://storybook.js.org/docs/api/arg-types) という API を用いています。これを用いると表形式でコンポーネント実装のコードに JSDoc として記述しているコメントの説明文を自動的に取得して表示できます。しかし、その Props の型が Union や Intersection になっていると Props 情報がうまく取得できないという問題がありました。この問題を解決するため、Storybook v8.x から使われるようになった `react-docgen` というパーサーの代わりに従来使われていた `react-docgen-typescript` というパーサーを使うように設定を変更して対応しました。

以上で Turtle 開発に関する2024年中の取り組みの紹介は終わります。

# その他の活動

私は、フロントエンドチームで Turtle デザインシステムの開発に携わる傍ら、私の得意分野である HTML や URL の扱い方、Web アクセシビリティ、セキュアコーディング（セキュリティ）、DNS に関しても社内で発信したり啓発したりしています。

いくつかの事柄については関連する記事を書いているので、ここで紹介させてください。

- HTML について：[(PDF) Web の誕生とブラウザの歴史](https://lavoscore.org/assets/file/history-of-web-and-browser.pdf) 
    - 私の HTML に対する思いと Web ブラウザの歴史について解説しています
- URL について：[クールな URL の心得 - Knowledge of Cool URLs](https://url.lavoscore.org/) 
    - URL の設計やドメイン名の登録に関する箴言を書いています
- サーバー構築について：[Ubuntu サーバー構築手順書](https://server.lavoscore.org/) 
    - VPS サーバーに LAMP (Linux / Apache / MySQL / PHP) 環境を構築する手順書です
- DNS について：[DNS浸透いうな - それは言葉狩りじゃなくて](https://dns.lavoscore.org/) 
    - DNS の誤解を解くためのキーワード「浸透いうな」について啓発しています

# おわりに

2024年現在、社内向けに開発されたデザインシステムを一般公開している企業がいくつか存在しています。DMM.com でもその流れに乗れるよう Turtle デザインシステムの開発に勤しんでいます。今後の展望ではありますが、2025年中に Turtle を一般公開できればいいなと思いつつ、一方でコンポーネントライブラリの充実にも力を入れていきたいと考えています。

我々のチームでは Figma を使って Code Connect などの機能を活用しながらデザインシステムの開発、改善に取り組んでいます。同じように Code Connect や関連技術を使いこなしたいと思われているチームの方にとってこの記事が少しでも参考になれば幸いです。

Figma プラグインや Code Connect については私自身もかなり詳しくなったので、もし質問などがあればお答えできるかもしれません。X (Twitter) 経由でよければ、本記事に関する内容は [@debiru_R](https://x.com/debiru_R) までお気軽にお問い合わせください。

最後に、求人情報のご紹介です。DMM.com ではフロントエンド職種として一緒に働いてくれる仲間を募集しています！ご興味のある方は、ぜひ下記の募集ページをご確認ください！

[https://dmm-corp.com/recruit/search/?keyword=フロントエンドエンジニアdmm-corp.com](https://dmm-corp.com/recruit/search/?keyword=%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121105544.png)

- [はじめに](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
- [執筆時の各種ツールのバージョン](https://developersblog.dmm.com/entry/2024/12/01/110000#%E5%9F%B7%E7%AD%86%E6%99%82%E3%81%AE%E5%90%84%E7%A8%AE%E3%83%84%E3%83%BC%E3%83%AB%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3)
- [前提知識: 生成したObjective-Cコードでプロパティ名の末尾にアンダースコアがつく条件](https://developersblog.dmm.com/entry/2024/12/01/110000#%E5%89%8D%E6%8F%90%E7%9F%A5%E8%AD%98-%E7%94%9F%E6%88%90%E3%81%97%E3%81%9FObjective-C%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A7%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E5%90%8D%E3%81%AE%E6%9C%AB%E5%B0%BE%E3%81%AB%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%82%B9%E3%82%B3%E3%82%A2%E3%81%8C%E3%81%A4%E3%81%8F%E6%9D%A1%E4%BB%B6)
- [今回解決したい課題](https://developersblog.dmm.com/entry/2024/12/01/110000#%E4%BB%8A%E5%9B%9E%E8%A7%A3%E6%B1%BA%E3%81%97%E3%81%9F%E3%81%84%E8%AA%B2%E9%A1%8C)
- [デバッグの準備](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%83%87%E3%83%90%E3%83%83%E3%82%B0%E3%81%AE%E6%BA%96%E5%82%99)
    - [Kotlinのリポジトリを手元にcloneする](https://developersblog.dmm.com/entry/2024/12/01/110000#Kotlin%E3%81%AE%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%82%92%E6%89%8B%E5%85%83%E3%81%ABclone%E3%81%99%E3%82%8B)
        - [gradle.propertiesの書き換え(Kotlin/Nativeのみ)](https://developersblog.dmm.com/entry/2024/12/01/110000#gradleproperties%E3%81%AE%E6%9B%B8%E3%81%8D%E6%8F%9B%E3%81%88KotlinNative%E3%81%AE%E3%81%BF)
    - [IntelliJ IDEAでデバッグの準備をする](https://developersblog.dmm.com/entry/2024/12/01/110000#IntelliJ-IDEA%E3%81%A7%E3%83%87%E3%83%90%E3%83%83%E3%82%B0%E3%81%AE%E6%BA%96%E5%82%99%E3%82%92%E3%81%99%E3%82%8B)
        - [Debuggerの準備をする](https://developersblog.dmm.com/entry/2024/12/01/110000#Debugger%E3%81%AE%E6%BA%96%E5%82%99%E3%82%92%E3%81%99%E3%82%8B)
- [デバッグする](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%83%87%E3%83%90%E3%83%83%E3%82%B0%E3%81%99%E3%82%8B)
    - [目的の処理を探してブレークポイントを貼る](https://developersblog.dmm.com/entry/2024/12/01/110000#%E7%9B%AE%E7%9A%84%E3%81%AE%E5%87%A6%E7%90%86%E3%82%92%E6%8E%A2%E3%81%97%E3%81%A6%E3%83%96%E3%83%AC%E3%83%BC%E3%82%AF%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%82%92%E8%B2%BC%E3%82%8B)
    - [ビルドプロセスに対してDebuggerを接続する](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%83%93%E3%83%AB%E3%83%89%E3%83%97%E3%83%AD%E3%82%BB%E3%82%B9%E3%81%AB%E5%AF%BE%E3%81%97%E3%81%A6Debugger%E3%82%92%E6%8E%A5%E7%B6%9A%E3%81%99%E3%82%8B)
    - [Remote JVM Debugを実行する](https://developersblog.dmm.com/entry/2024/12/01/110000#Remote-JVM-Debug%E3%82%92%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B)
    - [Debuggerで値を確認する](https://developersblog.dmm.com/entry/2024/12/01/110000#Debugger%E3%81%A7%E5%80%A4%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)
- [プロパティ名の末尾にアンダースコアが付与される条件を調べる](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E5%90%8D%E3%81%AE%E6%9C%AB%E5%B0%BE%E3%81%AB%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%82%B9%E3%82%B3%E3%82%A2%E3%81%8C%E4%BB%98%E4%B8%8E%E3%81%95%E3%82%8C%E3%82%8B%E6%9D%A1%E4%BB%B6%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B)
    - [おまけ: なぜenum classがfinalでないのか](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%81%8A%E3%81%BE%E3%81%91-%E3%81%AA%E3%81%9Cenum-class%E3%81%8Cfinal%E3%81%A7%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)
- [BookSearchLabelTypeにアンダースコアが付与されないようにする](https://developersblog.dmm.com/entry/2024/12/01/110000#BookSearchLabelType%E3%81%AB%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%82%B9%E3%82%B3%E3%82%A2%E3%81%8C%E4%BB%98%E4%B8%8E%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B)
    - [おまけ: プロパティ名の衝突が発生した場合の対処法](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%81%8A%E3%81%BE%E3%81%91-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E5%90%8D%E3%81%AE%E8%A1%9D%E7%AA%81%E3%81%8C%E7%99%BA%E7%94%9F%E3%81%97%E3%81%9F%E5%A0%B4%E5%90%88%E3%81%AE%E5%AF%BE%E5%87%A6%E6%B3%95)
- [おわりに](https://developersblog.dmm.com/entry/2024/12/01/110000#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)
- [宣伝](https://developersblog.dmm.com/entry/2024/12/01/110000#%E5%AE%A3%E4%BC%9D)

# はじめに

この記事は、[DMMグループ Advent Calendar 2024](https://qiita.com/advent-calendar/2024/dmm)の1日目の記事です。

こんにちは。プレミアムプロダクト開発部でDMM TVのAndroidアプリを開発している、新卒3年目の富山([マヤミト@yt8492](https://x.com/yt8492))です。

DMM TVのモバイルアプリ開発では、KMP(Kotlin Multiplatform)を用いてAndroidとiOSの処理を一部共通化しています。Android, iOSから共通化したい処理をnative-sharedなKMPモジュールにおいてビルドすると、KotlinコードからiOS向けにはObjective-Cコードが生成され、それをSwiftコードから呼び出しています。

さて、普段からKMPで開発をしていると、生成したコードのプロパティ名や関数名に意図しないアンダースコアがついてしまうなど、「どうしてこのKotlinコードからこのObjective-Cコードが生成されるんだろう？」と思うことが稀によくあります。

今回は、そんなときに**コンパイラを**デバッグして問題を解決する方法を、実例とともに紹介したいと思います。

# 執筆時の各種ツールのバージョン

- Kotlin 1.9.0
- Gradle 8.3
- IntelliJ IDEA 2024.2.1

# 前提知識: 生成したObjective-Cコードでプロパティ名の末尾にアンダースコアがつく条件

例えば、以下のような2つのinterfaceがあったとします。

```plain text

interface Foo {

  val id: Int

}

interface Bar {

  val id: String

}
```

これら2つのinterfaceを同時に実装しようとすると、Kotlin上ではエラーになります。

```plain text

class Baz : Foo, Bar {

  val id: Int // compile error

}
```

しかし、Kotlin/Nativeでの開発は、いったんKotlinのKMPモジュールのビルドが走ったあとそれらの成果物を利用してiOS側の開発をするという流れになります。そのため、KMPモジュールのビルドの時点ではiOS側で2つのinterfaceのプロパティが衝突する可能性を排除しきれません。

そのため、衝突する可能性のあるプロパティ名の末尾にアンダースコアを付与することで、衝突する可能性を回避しています。Swiftでは以下のような実装が可能です。

```plain text

class Baz: Foo, Bar {

    var id: Int32

    var id_: String

    init(id: Int32, id_: String) {

        self.id = id

        self.id_ = id_

    }

}
```

しかし、どちらのinterfaceのプロパティにアンダースコアが付与されるかはKotlinのバージョンによって異なる場合があり、Kotlinのバージョン上げでiOS側のビルドが通らなくなる原因にもなります。 なるべくならプロパティ名を衝突させないような実装を心がけるとよいでしょう。

# 今回解決したい課題

DMM TVアプリ内でマンガを検索する際に使うラベルを表現するenum classがあります。

```plain text

enum class BookSearchLabelType(

  val id: Int,

  val imageUrl: String,

  val label: String,

  val filter: BookFilter,

)
```

これをiOS側から参照する際に、`id`プロパティが`id_`となってしまう問題がありました。

これ自体は大した問題ではないですが、先ほどのObjective-Cコードのプロパティ名にアンダースコアが付与される条件を考えると疑問が残ります。

interfaceはSwift側でprotocolとして利用する際にプロパティ名衝突の可能性があります。しかし、enum classはopen classのようにSwift側で何かに継承させることができないため、プロパティ名の衝突は起きないと考えてよいはずです。

そこで今回は、enum classがinterfaceと同様にプロパティ名にアンダースコアがついてしまう理由を探ります。このとき、`BookSearchLabelType`が何と衝突しているのかも見つけます。これらを、ビルド時にKotlinコンパイラをデバッグすることで調査します。

# デバッグの準備

## Kotlinのリポジトリを手元にcloneする

[JetBrains/kotlin](https://github.com/JetBrains/kotlin)を手元のマシンにcloneします。

cloneしたら、プロジェクトで使っているKotlinバージョンを確認し、KotlinのGitHubのReleasesから目的のバージョンのTagを確認してgit checkoutします。

### gradle.propertiesの書き換え(Kotlin/Nativeのみ)

デフォルトでは、`gradle.properties`で`kotlin.native.enabled=false`が指定されています。

このままだと、kotlin-nativeモジュールが読み込まれず、IntelliJのシンタックスハイライトやDebuggerの便利な機能などが使えません。

そのため、Kotlin/Nativeのビルドをデバッグしたい場合は`kotlin.native.enabled=true`を指定します。

## IntelliJ IDEAでデバッグの準備をする

IntelliJ IDEAでkotlinを開き、syncします。

### Debuggerの準備をする

`Edit Configurations`を開き、`Remote JVM Debug`を新規作成します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040228.png)

Edit Configurations

`Remote JVM Debug`の設定はデフォルトだと`Host`が`localhost`、`Port`が`5005`になっていると思うので、その設定のまま保存します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040235.png)

Remote JVM Debug

# デバッグする

## 目的の処理を探してブレークポイントを貼る

Kotlinコンパイラは、Kotlinのソースコードから中間表現を生成するFrontendと、中間表現から実際に生成したい形式(JVMならJVMのバイトコード、iOS向けならObjective-Cのコード)に出力するBackendから構成されています。

今回デバッグしたい処理は、Kotlinコンパイラが生成するObjective-Cのプロパティ名を決定する処理です。そのため、Backendの実装から対象の処理を探していきます。

`kotlin-native`モジュール以下を探していると、`ObjCExportHeaderGenerator.kt`というファイルに`translateClass`メソッドがあるのを見つけました。

```plain text

override fun translateClass(descriptor: ClassDescriptor): ObjCInterface {

  ...

  translateClassMembers(descriptor, genericExportScope)

  ...
```

その中の処理を辿っていくと`buildProperty`というメソッドにたどり着きます。

```plain text

private fun buildProperty(property: PropertyDescriptor, baseProperty: PropertyDescriptor, objCExportScope: ObjCExportScope): ObjCProperty {

  ...
```

Objective-Cのプロパティ名を取得している処理を見つけました。まずはここにブレークポイントを貼り、問題のenum classで実際に`id_`というプロパティ名になっているかを確認します。

```plain text

val propertyName = namer.getPropertyName(baseProperty)

val name = propertyName.objCName
```

さて、ここで単純にブレークポイントを貼っただけだと、問題のenum classに限らず全ての型のプロパティ生成でDebuggerが止まってしまいます。そこで、問題のenum classの生成ではじめてブレークポイントが止まるようにブレークポイントの設定をしていきます。

`translateClass`に戻ります。`translateClass`の引数で渡される`ClassDescriptor`には、Kotlinの型情報が含まれています。まずは`translateClass`にブレークポイントを貼り、そのブレークポイントに対して型名が問題のenum classの名前と一致する場合のみ止めるよう`Condition`を設定します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040243.png)

次に、`buildProperty`に貼ったブレークポイントに対し、`Disable until hitting the following breakpoint:`で先程`translateClass`に設定したブレークポイントを指定します。これにより、問題のenum classである`BookSearchLabelType`のプロパティで初めてDebuggerが止まるようになります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040251.png)

## ビルドプロセスに対してDebuggerを接続する

- `Dorg.gradle.debug=true`を指定してGradleタスクを実行することで、ビルドプロセスに対してDebuggerを接続できるようになります。これをプロジェクトのnative-sharedなコードからiOSに向けてビルドするタスクに対して実行します。

```plain text

./gradlew 目的のtask -Dorg.gradle.debug=true
```

`Starting Daemon`というメッセージで実行が止まり、Debuggerの接続を待つ状態になります。デフォルトだとポート5005でDebuggerの接続を待ち受けます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040259.png)

## Remote JVM Debugを実行する

Kotlinリポジトリを開いているIntelliJ IDEAで、先程作成したRemote JVM DebugのConfigurationを選択し、Debug Runします。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040306.png)

Debug Run

これにより先程のGradleビルドプロセスにDebuggerが接続し、Starting Daemonで止まっていたビルドが再開します。

## Debuggerで値を確認する

ビルドが再開して少し待つと、Debuggerが止まると思います。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040312.png)

ちゃんと`BookSearchLabelType`で止まっていますね。Resumeし、プロパティ名を確認します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040320.png)

`propertyName`が`id_`になっていることを実際に確認できました。`baseProperty`はちゃんと`id`になっているので、`namer.getPropertyName(baseProperty)`の処理でアンダースコアが付与されていることがほぼ確定しました。この結果をもとに、さらに調査していきます。

# プロパティ名の末尾にアンダースコアが付与される条件を調べる

アンダースコア付きのプロパティ名は`ObjCExportNamer#getPropertyName`から返されることが判明したため、そのメソッドの処理を詳しく調査します。

```plain text

override fun getPropertyName(property: PropertyDescriptor): ObjCExportNamer.PropertyName {

    assert(mapper.isBaseProperty(property))

    assert(mapper.isObjCProperty(property))

    val objCName = property.getObjCName()

    fun PropertyNameMapping.getOrPut(forSwift: Boolean) = getOrPut(property) {

        StringBuilder().apply {

            append(objCName.asIdentifier(forSwift))

        }.mangledSequence {

            append('_')

        }

    }

    return ObjCExportNamer.PropertyName(

            swiftName = swiftPropertyNames.getOrPut(true),

            objCName = objCPropertyNames.getOrPut(false)

    )

}
```

まさにアンダースコアを付与していそうな処理が見つかりました。これがどういう条件のときに当てはまるのかをさらに調べていきます。

`getOrPut`の処理を見ています。引数で渡されたプロパティ名候補のSequenceに対し、プロパティ名として使用可能なものを`tryAssign`で判定して返していそうですね。

```plain text

inline fun getOrPut(element: T, nameCandidates: () -> Sequence<N>): N {

    getIfAssigned(element)?.let { return it }

    nameCandidates().forEach {

        if (tryAssign(element, it)) {

            return it

        }

    }

    error("name candidates run out")

}
```

ついに衝突判定の処理を見つけました。`tryAssign`では、すでに存在するプロパティ名の一覧から、引数で渡されたプロパティ名と衝突するものが存在するかを`conflict`で判定していそうです。

```plain text

private fun tryAssign(element: T, name: N): Boolean {

    if (element in elementToName) error(element)

    if (reserved(name)) return false

    if (nameToElements[name].orEmpty().any { conflict(element, it) }) {

        return false

    }

    if (!local) {

        nameToElements.getOrPut(name) { mutableListOf() } += element

        elementToName[element] = name

    }

    return true

}
```

`conflict`に対してブレークポイントを貼ってみます。Conditionで`conflict`がtrueを返す場合を指定することで、実際に衝突したタイミングでDebuggerを止めることができます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/D/DMMTech/20241121/20241121040327.png)

これにより、`BlockSetting`というアプリ内のレイアウトに関する設定を表現したsealed interfaceと衝突する可能性があるということが判明しました。

```plain text

sealed interface BlockSetting {

  val id: BlockSettingId

  val name: String

}
```

何と衝突する可能性があるかがわかったところで、`conflict`の処理を見ていきます。

```plain text

override fun conflict(first: PropertyDescriptor, second: PropertyDescriptor): Boolean {

    if (forSwift && configuration.disableSwiftMemberNameMangling) return false // Ignore all conflicts.

    return !mapper.canHaveSameName(first, second, configuration.ignoreInterfaceMethodCollisions)

}
```

`mapper.canHaveSameName`で同じ名前を許容できるか判定しています。このメソッドの中身を追っていくと、最終的に`canHaveCommonSubtype`というメソッドに行き着きました。

```plain text

private fun ObjCExportMapper.canHaveCommonSubtype(first: ClassDescriptor, second: ClassDescriptor, ignoreInterfaceMethodCollisions: Boolean): Boolean {

    if (first.isSubclassOf(second) || second.isSubclassOf(first)) {

        return true

    }

    if (first.isFinalClass || second.isFinalClass) {

        return false

    }

    return (first.isInterface || second.isInterface) && !ignoreInterfaceMethodCollisions

}
```

このメソッドがどのように値を返すかを見てみましょう。

- 片方がもう片方のサブクラスの場合trueを返す
- そうでない場合、どちらかがfinalであればfalseを返す
- そうでない場合、片方がinterfaceであればtrueを返す

というロジックで値を返していることがわかります(ignoreInterfaceMethodCollisionsは今回考慮しません)。

そして、このメソッドがtrueの場合、これら2つの型を1つの同じクラスに対して継承させられるということになり、衝突可能性があるという判定になります。

さて、今回衝突可能性ありと判定された2つの型を見てみましょう。

- BookSearchLabelType 
    - BlockSettingのサブクラスではない
    - enum classなのでそもそもopenにはできない(つまりfinalでは？)
    - interfaceではない
- BlockSetting 
    - BookSearchLabelTypeのサブクラスではない
    - sealed interfaceなので外からは継承できない(つまりfinalでは？)
    - interfaceではある

これを見ると、どちらもfinalなので、`canHaveCommonSubtype`はfalseを返すのではと想定しましたが、結果は違いました。`isFinalClass`が実際にどういう条件になっているかを見てみましょう。

```plain text

val ClassDescriptor.isFinalClass: Boolean

    get() = modality == Modality.FINAL && kind != ClassKind.ENUM_CLASS
```

あらためて`BookSearchLabelType`と`BlockSetting`に当てはめて考えてみます。

- BookSearchLabelType 
    - modalityはFINALだが、kindがENUM_CLASSなのでfalse
- BlockSetting 
    - kindはINTERFACEだが、modalityがSEALEDなのでfalse

となり、どちらも`isFinalClass`がfalseになることがわかりました。

つまり、**package名に関係なくsealed interfaceとenum classが同じ名前のプロパティを持つ場合はKotlinコンパイラがプロパティ名の衝突可能性ありと判断し、片方にアンダースコアを付与する**ということです。

## おまけ: なぜenum classがfinalでないのか

kotlinlangのSlackに同じ質問をしている人がおり、それに対して回答がついていました。

```plain text

enum class Foo {

    One,

    Two {

        override fun toString() = "2"

    },

}

println(Foo.One::class)

println(Foo.Two::class)
```

上記の例だと、One, TwoはFooのサブクラスになります。つまり、サブクラスがあるということはfinalではないということです。

# BookSearchLabelTypeにアンダースコアが付与されないようにする

さて、原因がわかったところで本来の目的を果たそうと思います。

今回`BookSearchLabelType`と衝突可能性ありと判定された`BlockSetting`ですが、単純にsealed interfaceからsealed classに置き換え可能だったため、sealed classに変更しました。その結果、interfaceではなくなったため衝突可能性もなくなり、`BookSearchLabelType`の`id`プロパティにアンダースコアはつかなくなりました。

KMPで開発する際は、特別な理由がない限りはsealed interfaceではなくsealed classを使ったほうがいいのかもしれません。

## おまけ: プロパティ名の衝突が発生した場合の対処法

今回はsealed interfaceをsealed classに変更することで解決できましたが、今回のようなケースは稀で、実際にはどちらの型も構造を変えたくない場合があると思います。その際の対処法をいくつか紹介します。

1. 片方の名前を変更する

```plain text

interface Foo {

  val id: Int

}

interface Bar {

  val barId: String

}
```

名前を衝突しないものに変更してしまえば、アンダースコアは付与されません。しかし、名前を変更したプロパティやメソッドを呼び出している箇所をAndroid, iOSともに全て修正する必要があり、手間はかかります。

2. 片方のプロパティに@ObjCNameを付与して別名をつける

`@ObjCName`アノテーションを付与することによって、Kotlin側の名前を変更せずに生成するObjective-C側の名前を変更できます。

```plain text

interface Foo {

  val id: Int

}

interface Bar {

  @ObjCName("barId")

  val id: String

}
```

```plain text

bar.id
```

```plain text

bar.barId
```

これにより、Kotlin側は呼び出し側の変更をせずSwift側の変更だけで済むので、前述の方法よりは手間がかかりません。

# おわりに

今回は、ビルドプロセスでKotlinコンパイラのデバッグをする方法を実例とともに紹介しました。コンパイラのデバッグと聞くと難しい印象を受けるかもしれませんが、Remote JVM DebugとGradleオプションを使って意外と簡単にできることがわかったと思います。

紹介した例はKMPプロジェクトでしたが、今回紹介した方法はKMPに限らずKotlinを使った開発で使えるはずなので、皆さんんもぜひコンパイラの挙動に疑問を持った際に試してみてください。よきKotlinライフを！

# 宣伝

DMMグループでは、一緒に働いてくれる仲間を募集しています！ご興味のある方は、ぜひ下記の募集ページをご確認ください！

[dmm-corp.com](https://dmm-corp.com/recruit/search/?tags=191)