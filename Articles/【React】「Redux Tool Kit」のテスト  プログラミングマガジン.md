---
URL: http://www.code-magagine.com/?p=13587
Created: 2021-09-26T22:16:00
Tags: [topic/技術/テスト]
---
各コンポーネントからuseDispatchなどでRedux Tool Kit内のReducer関数を呼び出したり、useSelectorでstateを参照したりすると思いますが、RTK独自の構文になるのでRenderでそのまま呼び出そうとしてもエラーになってしまいます。

Redux Tool Kitのテストをする場合は下記のように記述します。

テストコードにテスト用のストア(store)を定義して、beforeEachによって各コンポーネントごとにstoreを再構築します。

各コンポーネントごとに、Providerでstoreを毎回渡します。

そうすることで、**RTKのuseDispatchや、useSelectorを使ったとしてもエラーになることなくテストを実施することが可能**になります。