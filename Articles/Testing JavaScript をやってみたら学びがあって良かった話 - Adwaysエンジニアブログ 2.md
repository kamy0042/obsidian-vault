---
URL: https://blog.engineer.adways.net/entry/2020/05/08/150000
Created: 2021-06-07T22:32:00
Tags: [topic/技術/テスト]
---
こんにちは。リファクタリングが大好きなフロントエンドおじさん梅津です。

自信を持ってリファクタリングするには信頼できる自動テストが必要ですよね。
 じゃあ信頼できる自動テストとはなんだろう？どう書いたらいいんだろう？と考えていました。
 とくにコンポーネントを含む UI テストに対しての悩みが強かったです。
 そんなときに出会ったのが Testing JavaScript です。
 この記事ではその Testing JavaScript の紹介をしたいと思います。

## Testing JavaScript とは

[Testing JavaScript](https://testingjavascript.com/) は PayPal のエンジニアである [Kent C. Dodds](https://kentcdodds.com/) によって作成された教材です。
 ページを開いてすぐ目に飛び込んでくるテスティングトロフィーが特徴的ですね。

![[20200501145901.png]]

Testing JavaScript では、ここに記されている Static, Unit Test, Integration Test, End to End Test それぞれの方法を学ぶために全部で 8 つのコースが用意されています。
 それでは各コース内容と実際にやってみた感想を見ていきましょう。

## Fundamentals of Testing in JavaScript

テストフレームワークがどうやってテストを実行したりエラーを出力しているのか気になりませんか？
 何をしているのか知るためには作るのが一番！
 というわけで、このコースではシンプルなテストフレームワークを自作します。

シンプルとはいえ必要な機能はそろっているので、普段使っているテストフレームワークがどういうことをしているのか想像しやすくなりました。

## Static Analysis Testing JavaScript Applications

アプリケーションとはなんとも脆いもので、typo したり、型に合わない値をいれるだけで簡単に壊れてしまいます。
 こういった不具合を起こさないように網羅的なテストを書いてもいいですが、正直言って労力に見合わないですよね。
 できればそういったことはコードを書いているときに自動的にチェックしてほしいものです。
 このコースでは次のようなツールを入れて、アプリケーションを守るための仕組みづくりについて学びます。

- eslint の設定
- prettier の設定
- TypeScript の導入
- husky + lint-staged によって git commit の前にリンターを走らせる
- npm-run-all による npm script の並列実行

僕は静的型付け言語が好きなので自分が触るコードには TypeScript を入れていきたいと思っています。
 husky と lint-staged については馴染みがなかったので、こういったこともできるんだなと勉強になりました。

## JavaScript Mocking Fundamentals

テストの粒度によってモックはどうしても必要になってきますよね。
 通信処理のように成功するか失敗するかわからないものはテスト中に使いたくありません。
 きっと jest.mock などを使って成功しか返さないようにモックすることでしょう。
 このコースでは jest が提供している fn, spyOn, mock などの使い所を学んだり、それらの仕組みを知るためにモック機能を自作します。

レッスン内の require オブジェクトを使ってモック機能を実装していく場面では、こういった使い方もあるのか！とワクワクしていました。

## Configure Jest for Testing JavaScript Applications

jest はシンプルであり便利なテストフレームワークですが、フロントエンドのアプリケーションをテストするときにはいくつか設定が必要になります。（例:window オブジェクトが参照できない）
 そういったつまずきポイントへの対処法のほかに、次のようなものが学べます。

- コードカバレッジ
- プロジェクト機能
- タスクランナーとしての使い方
- ウォッチモードをより便利にするプラグイン

jest の設定に関する情報がここまでまとまっていることはあまりないので、とても学びのある内容となりました。
 個人的にはかなりオススメのコースとなっています！

## Test React Components with Jest and React Testing Library

Kent が言うには「信頼性のある UI テストとは、ユーザーが実際に UI を使うときの様子をリアルに再現できているもの」だそうです。
 ここではその信頼性のあるテストを書くために次のようなことを学んでいきます。

- [Testing Library](https://testing-library.com/) の使いかた
- リファクタリングしやすいテストを書くための考え方
- TDD によるコンポーネントの実装方法
- Context API を使ったコンポーネントのテスト（react-touter, Redux）
- カスタム Hooks のテスト方法
- アプリケーション全体のインテグレーションテスト
- 非同期処理のモック

冒頭でも少し書きましたが、もともと僕は UI テストに馴染みがなく価値のある UI テストをどう書いたらいいのだろうと悩んでいました。
 Testing JavaScript を始めたのもこのコースでその答えがわかるのではないかと思ったのがきっかけです。
 結果として期待していた以上のものを学ぶことができました！
 コース内でテストもアプリケーションも壊さずにリファクタリングしていく様子を見せてくれました！
 これにはしびれたなー。

## Install, Configure, and Script Cypress for JavaScript Web Applications

このコースでは E2E テストのフレームワークである Cypress の使い方について学びます。
 主な内容は次のとおりです。

- Cypress のインストールから設定
- Cypress Testing Library の紹介
- カスタム Cypress Command の作り方
- デバッグ方法

こちらもよくまとまった内容になっています。
 「Cypress をテストしてくれるユーザーだと考えてテストコードを書くのが好みです」という部分が印象的でした。

```plain text
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    const user = cy
    user.visit('http://localhost:8080')
      .get('xxx')
      .click()
      ...
      .get('yyy')
      .should('have.text', '1')
  })
})

```

## Use DOM Testing Library to test any JS framework

React, Vue, Anguler, jQuery, ...etc で [DOM Testing Library](https://github.com/testing-library/dom-testing-library) を使ってテストするときの話が書かれています。
 React Testing Library のようにそれぞれのフレームワークに特化した Testing Library がある中、敢えて少し低レベルなライブラリとして位置する DOM Testing Library を使ったコードを紹介しています。
 おもしろいのは render 関数を自作した後のテストコードがどのフレームワークでもほとんど変わらないところです。
 これは Testing Library が実装の詳細を隠したテストを書くための API を揃えている証拠です。
 これなら何かのフレームワークで学んだテストの知識を他のフレームワークでも使えるだろうなと感じました。

## Test Node.js Backends

Express を使ったアプリケーションを例として使い、Node.js の Web フレームワーク全般で扱えるような知識を学べます。

- 純粋な関数のテスト
- ミドルウェアのテスト
- コントローラーのテスト
- API route のテスト
- サードパーティの依存関係をモックする
- 認証済みコードのテスト

実はまだこのコースについては学べていないので詳しい内容が書けません。
 バックエンドで必要となる普遍的なテストの知識を学べそうな雰囲気はありました。
 レッスン数は Test React Components with Jest and React Testing Library と同じくらいあるので、力の入りようが伺えます。

## さいごに

いかがだったでしょうか。すこしでも Testing JavaScript に興味を持っていただけたら幸いです。
 個人的にとくに学びがあってよかったなと感じたのは次の 2 つでした。

- Configure Jest for Testing JavaScript Applications
- Test React Components with Jest and React Testing Library

ちなみに今回紹介したすべてのコースを受講するには $332 かかります！（一部のコースだけを学べる安いコースもあります）
 一瞬高く感じるかも知れませんが値段に十分見合った価値があったと感じています。
 名著と呼ばれているようなお高めの技術書 5, 6 冊分だと考えれば安い安い。

みなさんも Testing JavaScript で信頼できるテストの書き方を共に学んでいきましょう！
 それでは、また。