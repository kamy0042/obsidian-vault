---
URL: https://note.com/narihara/n/nc92a02710ed5
Created: 2021-09-26T19:49:00
Tags: [topic/技術/テスト]
---
![[picture_pc_b41f1fd10ae8913bcba7ff6dd813a8cf.png]]

はじめまして、スペースマーケットでフロントエンドエンジニアをやっている成原です。
趣味は筋トレ。
好きなトレーニングはインクライン・トライセップス・エクステンション。
リモート勤務になりジムにも行けなくなったので、自宅にトレーニング環境を構築し、現在高ボリュームの全身法でトレーニングしています。

![[picture_pc_7da34252dbbe2f22f6e3025f23c9d3f7.jpg]]

(40kgのダンベル×2と60/70/80kgのハンドグリップ)

というわけで、本日はスペースマーケットにおけるフロントエンドUTへの取り組みを話します。

### UT文化をどのように根付かせてゆこうとしているのか

入社当初、フロントエンドUT実務経験者は、自分のみな状況でした。
この状況でUT書きましょう！と言っても「いや、書き方わかんねーし...」とモチベーション下げるだけになるのは明白です。
ですので、UTのメリットと書き方を理解して頂けるように、フロントエンドUTハンズオンを開催しました。

### フロントエンドUTハンズオンについて

スペースマーケットではフロントエンドUTテストフレームワークにJest + React Testing Libraryを採用しています。
このフレームワークの使用方法を段階的に学習できるよう、以下にテーマを分け、ハンズオンをトータル5回開催しました。

> ・ UT入門・ FrontEnd Unit Test入門・ イベント処理の扱い方・ 非同期処理を行うコンポーネントのテスト・ スタイルのテストと実務でのTips

各ハンズオンではテーマに沿ったtutorial / exerciseのコードとドキュメントを用意し、受講して頂きました。
（この進め方はヘルシンキ大学の[FullStrackOpen](https://fullstackopen.com/en/)という公開講座を参考にしています）

exerciseで実装した内容はPRで自分が確認し、適宜アドバイスを行います。

またReact Testing Libraryの思想や、VSCodeでのテストコードデバッグなどもハンズオンの中で適宜説明しました。

### 実務でのUT開発サポート

とはいえ、あとはヨロシク！で完結させるのも難しいです。
ですので、実務でのUT開発を適宜サポートできるように、UT質問専用Slackチャンネルを用意して頂きました。
こちらにUTで詰まった箇所があれば投稿して頂き、適宜答えながらUTを進めて頂いています。

### React Testing LibraryでUTを書くときに役立つTips

という訳でハンズオン用のコードを含めて、めっちゃUT書いています。
その中で溜まったTipsやハマった箇所を紹介させて頂きます。

### queriesの優先順位

React Testing Libraryの最重要メソッド、html要素を取得するクエリですが、取得方法(ByXXX)が複数あります。
どれを使えばよいのか迷いますが、公式が優先順位を規定してくれています。

詳細は公式を読んでいただきたいですが、ざっくり書くと優先度は以下になっています。

> 1. ByRole2. ByLabelText3. ByPlaceholderText4. ByText5. ByDisplayValue6. ByAltText7. ByTitle8. ByTestId

どの取得方法を使えばよいか迷った時は、この優先順位に従って考えましょう。

### getBy or queryBy or findBy、どれを使うべきか？

まずgetBy or queryByです。
getByは要素が存在しない場合、エラーでテストが落ちます。
一方queryByは要素が存在しない場合、テストは落ちません。
テストが落ちないことは、エラーを早期発見できないということです。
ですのでgetByを優先して使うのが良いでしょう。

次にgetBy or findByです。
findByは戻り値の型からわかるように、await、つまり非同期で取得します。
ですので、非同期で表示される要素を取得する場合は、findByを使用すると良いでしょう。
この辺りは公式のチートシートにもまとまっているので、是非読んでみてください。

### fireEventとuser-event、どちらを使うべきなのか？

Testing Libraryのサポートライブラリとして、ブラウザ上のユーザー操作をシミュレーションしてくれる @testing-library/user-eventが存在します。

このライブラリを使えば、formの入力や要素のクリックも含めたUIの操作もテストできます。
しかし、Testing Libraryの組み込みAPIでfireEventというイベントシミュレーションAPIも存在します。

こうなるとfireEventと user-event どちらを使うべきか迷いますが、公式に以下記述があります。

> user-event is a companion library for Testing Library that provides more advanced simulation of browser interactions than the built-in fireEvent method.

つまり、user-eventの方が優れているので、 user-event使ってねと書いてあります。
ですので、イベントシミュレーションのAPIは user-eventを使用しましょう。

### actに関するwarningが表示された時の解決方法

非同期処理を含んだコンポーネントのUTを書いていると以下のwaraningが表示されるケースがあります。

```plain text
  Warning: An update to Book inside a test was not wrapped in act(...).
   When testing, code that causes React state updates should be wrapped into act(...):
   act(() => {
     /* fire events that update state */
   });
   /* assert on the output */
```

この場合の対応方法ですが、React Testing Libraryの作者KentC氏が自身のブログで解決方法を上げています。

こちらに載っている通りwaitFor / waitForElementToBeRemovedを使用すれば解決するケースが多いです。[waitFor / waitForElementToBeRemovedに関する公式ドキュメント](https://testing-library.com/docs/dom-testing-library/api-async)

ですので、上記warningが発生した場合は、それらのapiを使用して解決できないか試してみると良さそうです。
また、経験談での共有で恐縮ですが、findByを使うことで解決されたケースもありました。

### セレクタを使用し、要素を取得する

『class/ID/属性セレクタを使用し、要素を取得しテストをすべきではない』というのがReact Testing Libraryの思想です。

ですが、現場ではどうしてもセレクタを使用せざるを得ない場面があります。
例えば、アイコン要素です。
アイコン要素を<i />セレクタで表示している現場は多いと思いますが、<i />セレクタには明確なroleがありません。
またテキストも含まれおりません。
よって、getByRole / getByTextなどのクエリによる要素取得ができません。
こうなると『xアイコンがクリックされた時〇〇になる』というテスト自体ができません。
その場合は**最終手段として手動クエリを使用します。**

```plain text
const { container } = render(<Hoge />)
// containerではなくdocumentからも取得可能です
const closeButton = container.querySelector('.icon-close')
```

ただし、繰り返しますがこの手法は最終手段です。**セレクタを使用したテストは壊れやすいです。****
ですので、まずはgetByRole / getByTextなどの標準クエリを使用する方法を考えてください。****
それでもダメだった場合のみ、この手段を使用してください。**

### 今後について

という訳で、スペースマーケットでのフロントエンドUTの取り組みを述べさせて頂きました。
ですが、当然これで終わりではありません。
まだまだUTが少なく、GraphQLクエリを実行している箇所のテストが難しいなどの問題もあります。
(GraphQL部分のテストに関しては[msw](https://mswjs.io/)の導入を検討しています)
ですので、どんどんUTを書けて、安心安全に施策リリースができる状況になるまで、文化/技術の両面から継続的な取り組みを続けてゆきます！

またスペースマーケットでは現在バックエンドエンジニアを絶賛募集中です！

三ヶ月ほど前に入社したバックエンドエンジニア/北島さんの入社エントリにリアルな感想が詰まっているので、是非読んでみてくださいー！

最後に、コロナの状況でも使えそうなプライベートジムをまとめてみました。
パワーラックの写真を見るだけで楽しい気分になってきますね。
自分もやはり150キロとか200キロとかでBIG3ガンガンやりたいです。
周囲を気にせずトレーニングに励んでみたい方、是非利用してみてください。