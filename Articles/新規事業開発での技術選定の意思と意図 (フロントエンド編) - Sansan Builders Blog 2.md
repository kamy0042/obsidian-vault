---
Created: 2021-09-03T14:27:00
URL: https://buildersbox.corp-sansan.com/entry/2020/09/03/110000
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[1595226135761044.bin]]

こんにちは、関西支店で新規事業開発室に所属するソフトウェアエンジニアの加藤です。[Bill One](https://bill-one.com/)という新規サービスの開発に携わっています。

[バックエンド編](https://buildersbox.corp-sansan.com/entry/2020/08/21/110000)の続きとして、フロントエンドで私たちが使用している技術やライブラリを振り返って、どんな意志と意図があるかを確認していきます。

Bill Oneは今年の1月ごろにピボットし、それまで開発してきたフロントエンドを全て捨て、1から作り直しました。ピボットの際に改めて技術選定を行い、それまで使っていたライブラリ等を見直したので、本稿ではピボット前後で変化した箇所を中心にフロントエンドの技術選定を紹介します。

## 前提

改めて前提です。私たちのチームで開発しているBill Oneは今年の5月にローンチしたばかりのサービスで、チームのエンジニアは5名です。開発しているアプリケーションはSingle Page Application (SPA) で、エンジニア全員がフロントエンドもバックエンドも両方担当します。

本稿での技術選定は私たちのチームのものであり、他の部署や隣のチームでは異なる選択が行われています。

## 主要な技術選定

まずは、主要な技術選定です。見出しは `カテゴリ: ピボット前 → ピボット後` という形式です。変化がないものはその旨を記載しています。

### 言語: TypeScript（変化なし）

言語はピボット前後で変わることなく[TypeScript](https://www.typescriptlang.org/)を使っています。静的な型チェックのおかげで、実行時エラーが少なくなり、躊躇することなくリファクタリングできています。現時点では、TypeScriptを使える場面で使わない理由はほとんどないと思っています。

ピボット前は途中からの導入だったので型を付けていくのにやや苦労しましたが、ピボット後は `"strict": true` で問題なく開発できています。

### JavaScriptフレームワーク: React（変化なし）

JavaScriptフレームワークもピボット前後で変わることなく[React](https://ja.reactjs.org/)を使っています。選択肢としてはVue.jsやAngularもありますが、 次の点でReactはシンプルで良いと考えています。

- 独自のテンプレート言語を学ばなくても、（JSXさえ学べば）全てをTypeScriptで書け、テンプレートまで型チェックが効く
- 複雑さをもたらす双方向バインディングがなく、Stateの変更→DOMへの反映という1方向の流れに統一されている

特にReact Hooksが導入されてからは、ほぼ全てのコンポーネントを関数コンポーネントで書けるようになりました。関数コンポーネントではrenderに集中できることに加え、HooksによってStateを意味のある単位で分割できたり、Propsが変化したときの副作用を一貫性のある形で書けたりと、わかりやすくなりました。

### Reactのビルド周り: Next.js → Create React App

ピボット前はReactのビルドに[Next.js](https://nextjs.org/)を使っていましたが、ピボットのタイミングで[Create React App](https://create-react-app.dev/)を使うよう変更しました。私たちが開発しているアプリケーションはログインしていることが前提のSaaSで、Static Site Generation (SSG) やServer Side Rendering (SSR) のメリットをさほど享受できないためです。むしろSSR周りでエラーが発生して対処が必要になったこともあり、 Client Side Renderingに集中してシンプルに保つ方が良いと判断しました。

Next.jsをやめたことで、ルーティングやCSS in JSのライブラリなどを個別に選定する必要がありますが、使わない機能を強みとするツールに依存し続けるのはリスクが高いので、やむを得ないと考えています。ピボット後は、ルーティングでは[React Router](https://reactrouter.com/)を、CSS in JSでは[React JSS](https://cssinjs.org/react-jss/)を使っています。

自分たちでwebpackなどの設定を保守していくのは大変なので、Create React Appはejectせずに使っています。若干制約を感じるところはありますが、ある程度のカスタマイズはできるので、特に困ることなく開発できています。

### Reactの状態管理: Redux → コンポーネントごとのState + Context

ピボット前はアプリケーション全体での状態管理に[Redux](https://redux.js.org/)を使っていましたが、機能を追加するたびにあまり本質的でないActionやReducerを書き足すのが辛く感じていました。バックエンドのAPI呼び出しの非同期処理もミドルウェアを使って複雑になるわりに、本当に必要な複雑さなのか疑問に感じていました。

そこで、ピボットを機会にReduxを一旦やめてみたところ、特に困ることなく開発できています。現在はコンポーネントごとにStateを持ち、必要に応じてPropsでバケツリレーしています。ログインしたユーザーの情報など、一部のコンポーネントをまたいで共通のStateはContextを使って受け渡しています。API呼び出しもコンポーネントからAPIクライアントを使って行い、一部では[react-use](https://github.com/streamich/react-use)のuseAsyncを使って記述を簡素化しています。

結局私たちは、Reduxをクライアントサイドにおけるサーバーサイドのキャッシュとしてのみ使っていたのだと理解しています。クライアントにおけるキャッシュとして[React Query](https://github.com/tannerlinsley/react-query)は気になっていますが、まだ手を出せていません。

さらに、ピボット前はReduxで管理するStateにImmutable.jsを使っていましたが、これもピボット時にやめました。コンポーネントローカルのStateはImmutable.jsではないJavaScriptのオブジェクトを使うことが多く、Immutable.jsとJavaScriptのオブジェクトが混在してわかりづらくなっていたためです。またJavaScriptのオブジェクトとスプレッド演算子を使った方が簡潔に書けるので、それで十分だと判断しました。

### UIライブラリ: Material UI → Semantic UI React

UIライブラリは、[Material UI](https://material-ui.com/)から[Semantic UI React](https://react.semantic-ui.com/)に変更しました。ピボットの少し前からデザイナーにデザインしてもらうようになったものの、社内での統一されたデザインとマテリアルデザインとの差異が大きく、マテリアルデザインを採用しないのにMaterial UIを使い続けるのはメリットを享受しづらいと判断したためです。テーマでのカスタマイズも検討しましたが、特に主要コンポーネントであるTextFieldは差異が大きく、これをカスタムコンポーネントとして再実装するのは虚しく感じました。

そこで、あまり主張が強くないデザインのUIライブラリを探してSemantic UI Reactを採用しました。Material UIと同様に豊富なコンポーネントが揃っています。

Semantic UI ReactはReact向けに書かれているものの、Reactコンポーネントとしての使い勝手はMaterial UIが勝ります。Semantic UI Reactは昔ながらのCSSでスタイルを適用するライブラリなので、スタイルを上書きしたい時に `!important` を多用する必要があります。グリッドシステムもあまり融通が効かず、結局CSSを書くこともしばしばあります。

ベストな選択だとは思っていないので、良さそうなUIライブラリは引き続きウォッチしていきたいです。

## その他のライブラリ

最後に、これまでに紹介できていないその他のライブラリを紹介します。

- [date-fns](https://date-fns.org/): 日付・時刻周りの処理
- [Formik](https://formik.org/): 入力フォームの状態管理
- [Linkify](https://github.com/Soapbox/linkifyjs): URLのリンク化
- [query-string](https://github.com/sindresorhus/query-string): クエリ文字列の組み立て
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd): ドラッグ&ドロップによる並び替え操作
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard): クリップボードへのコピー
- [react-cropper](https://github.com/react-cropper/react-cropper): 画像の切り抜きを行うUI
- [react-dropzone](https://github.com/react-dropzone/react-dropzone): ドラッグ&ドロップによるファイルアップロード
- [React Joyride](https://github.com/gilbarbara/react-joyride): チュートリアルの実装
- [React Toast Notifications](https://github.com/jossmac/react-toast-notifications): トーストによる通知
- [Yup](https://github.com/jquense/yup): 入力フォームのバリデーション

ライブラリ選定時は、以下の観点で判断しています。

- アクティブにメンテナンスされているか
- 必要十分な機能があってシンプルか
- ある程度人気があるか

## 最後に

フロントエンドは変化が早いと言われますが、あまり振り回されすぎずに、意志と意図を持って判断していくことで、自分たちの事業成長に役立つ技術を選択していければと考えています。本稿が読者の皆さんの技術選定の参考になれば幸いです。