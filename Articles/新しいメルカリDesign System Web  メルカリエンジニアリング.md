---
タグ: []
作成日時: 2022-07-20T23:14:00
URL: https://engineering.mercari.com/blog/entry/20210823-8128e0d987/
Tags: [topic/デザインシステム/導入事例]
---
![[b4569a84-screenshot.png]]

@nekobatoです。メルカリDesign SystemのWeb版開発者をしています。[以前の記事](https://engineering.mercari.com/blog/entry/20210810-the-new-mercari-web/)で新しくなったメルカリ Webの紹介がありましたが、本記事ではそこで使われている、同じく新しくなったDesign System Webの紹介をします。

![[b4569a84-screenshot-300x174.png]]

## Design System Webの提供

Design Systemを元にした実装の構造はプラットフォームごとに異なりますが、Design System Webはmonorepoで管理されたnpm module群で、プロダクトはモジュールを用途に合わせて利用可能です。全てを使う必要はなく、基本的にはコンポーネントモジュール（CoreまたはReact）を利用すればDesign Systemの恩恵を受けられます。現在は新しくなったデザインのメルカリ Webで実際に利用例を見ることができます。

この記事はDesign System Webの技術的な概要を紹介しますので、新しいDesign Systemの詳しい部分には言及しません。その辺りについてはまた新しい記事をお待ち下さい。

## いままでのDesign System Web

[以前のDesign System Webについてのブログ](https://engineering.mercari.com/blog/entry/2019-08-26-090000/)にある通り、2019年の今頃の時点でDesign Systemとそのコンポーネントライブラリ(Design System Web)は一旦の完成を見ていました。主なライブラリはメルカリ Webの技術スタックに合わせてReactが使われており、その後は修正を加えつつメルカリ Webに逐次導入という作業を暫くの間行っていました。

## 新しいDesign System Web

今回、Design Systemはメルカリのためのプロジェクトという方向性を改め、メルカリグループ全体、ひいてはマーケットアプリ全体で使われうるDesign Systemを構築するという目的に向かって再度作り直しています。
 今までのDesign Sysstem WebはReactで作られているために、Reactで作られたプロダクトでしか採用することができません。新しいDesign System Webもよりモダンな体験を、以前よりも広いスコープでユーザーに提供するために作り直されることになり、そのための技術選定が必要になりました。

## Web Componentsの採用

メルカリグループではそれぞれのプロダクトで使うWebフロントエンドの技術スタックはチームの判断に委ねられています。

今回、Design System Webはメルカリ Webで使われているReactだけでなく、様々な技術スタックと共に使用できる、真にスケーラブルなライブラリでなくてはなりません。また、各ライブラリの仕様に引っ張られて細かい箇所で挙動が違ったり、メンテナンスや実装速度の都合上仕様に差分が出てくることは避けたいと考えていました。以上のことから、新しいDesign System Webを構築する技術スタックはWeb Componentsを採用しました。

Web ComponentsはWebが標準で持っている機能であるため、大抵のWeb Viewライブラリは動作を約束しています。実際には様々な対応が必要でしたが、Design System Webのコンポーネントは連携するライブラリを問わずに利用することが可能になりました。

また、Web Componentsを構築するためのライブラリは[Lit](https://lit.dev/) (採用の時点ではLitElement)を採用しています。これはシンプルな分カスタムが効きやすいという判断です。

## Design System Webが保証するもの

Design Systemがコンポーネントを提供するにあたり、デザインに留まらずプロダクトの様々な機能をDesign System側が担保することになります。Design System Webを利用する開発者はライブラリを規則に従って設置すれば後はプロダクト固有のロジックに集中できるというのが理想で、それが実現できれば大幅な工数の削減をもたらしてくれるでしょう。以下はDesign System Webがプロダクトにおいて保証する要素たちです。

### アクセシビリティ(a11y)対応

コンポーネント単位でa11yが保証されていれば、ライブラリ利用者は正しくコンポーネントを設置するだけで、Webページの大部分で既にアクセシブルな状態になってくれます。

Design System Webの各コンポーネントはそれぞれWCAG2.1のAAに到達するよう実装しています。検証方法は、[@open-wc/testing](https://www.npmjs.com/package/@open-wc/testing)で機械から読み取れる情報のテストを行い、CLI上では色のコントラストまではチェックできないため、その部分はlighthouseまたは[@storybook/addon-a11y](https://www.npmjs.com/package/@storybook/addon-a11y)で確認しています。また、キーボード操作とスクリーンリーダー操作の実際の動作も検証しています。

### 国際化(i18n)対応

i18nに対してはライブラリ側からは何もしていません。日本語のページに英語が紛れ込んだり、その逆があった場合ユーザーの体験はこちらの意図とは違ったものになります。そのようなことが起こらないよう、プロダクト側で全てを管理できる仕組みにしています。逆に言うと何もしないことを徹底するために、機械が読み上げたり普段目に見えない部分（altやaria-label）に至ってもattributeを提供し、利用者側が設定するのを必須にしています。

### ダークモード対応 + テーマ対応

これはWeb Componentsに限らず最近は様々な場面で使われている手法です。
 Design SystemのColor Tokenはライトモードとダークモードに同じ名称の色情報を定義しています。コンポーネント内ではCSS variableを使用して色の定義リストを参照しており、Global CSS側では対応する色情報を提供しています。利用者は定義の参照先を置き換えればダークモードとライトモードを切り替えられ、更に利用者が用意した色情報一覧を用意すれば、独自のテーマ色も対応することが可能です。

### React対応

新しいメルカリ WebはReactを使って構築されています。しかし[Custom Elements Everywhere](https://custom-elements-everywhere.com/)にもある通り、React上でWeb Componentを使うにはいくつかの問題があります。これを解決するためにReact Wrapperと呼ばれるライブラリを実装し、それぞれのコンポーネントに対するEvent Listener、JSXの型付け、attributeの型変換などをサポートするReact Componentを各コンポーネントごとに生成しています。

この対応は面倒な他にも良い作用もありました。React WrapperはJSXで型を提供できるという利点があります。これは特にa11yの対応のために必須であるattributesをIDE上で利用者に教えることができます。

### SSR対応

現状Lit単体でSSRに対応する方法はありません。StencilJSではSSR内でのLightDOM展開とhydrationについてのエコシステムが標準で備わっていますが、それらを自前で用意するのは非常に骨の折れる作業なので一旦実装していません。

メルカリJP Webでは元々SSRをお客様向けに行う予定はなかったため、Design System Web側では根本的なSSR対応をすることはせず、JavaScript実行環境の無いクローラ向けにはRendertronとPolyfillによるLightDOMへの展開を現在は推奨しています。

## おわりに

他にもWeb Componentsを使って出てきた問題とその対処は山程ありますが、無事プロダクションで使うことができるまでに洗練させることができたということで一旦一段落という感じです。我々がWeb Componentsを実運用に乗せたことで、界隈でのWeb Componentsを採用する機運が高まってくれれば幸いです。

開発中、Web Componentsで本当に運用していけるのかという不安は常にありましたし、後に参加してくれたメンバー達も当初は半信半疑でしたが、それでもメンバー達の多大な努力による問題の解決があったことと、このチャレンジを続けられる組織であったことが幸運だったと思います。

現在Design System Webを完全導入しているのはメルカリ Webのみとなっております。これからのDesign System Webを作るのも導入するのも、[手を貸してくださる方を募集しております](https://careers.mercari.com/search-jobs/?cat=merpay-inc-company%2Csouzoh-inc%2Cmercoin-inc%2Cmercari-inc-company%2Cfull-time%2Cspecialist%2Csoftware-engineering-jobs)。