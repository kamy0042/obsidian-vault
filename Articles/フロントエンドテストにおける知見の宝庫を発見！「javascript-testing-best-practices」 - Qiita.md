---
URL: https://qiita.com/taisei-13046/items/662a289dc7328fb64836
Created: 2023-02-16T10:49:00
Tags: [topic/技術/テスト]
---
# はじめに

JavaScriptにおけるテストのベストプラクティスをまとめた「**javascript-testing-best-practices**」というGitHubレポジトリが大変勉強になったため、特に参考になった内容をまとめて共有したいと思います。

（補足）本レポジトリにはfrontendのみならずbackendのテストに関する情報もありますが、今回はfrontendに焦点を当てて共有します。そのため扱うSectionは以下の4つです。

- Section 0: The Golden Rule
- Section 1: The Test Anatomy
- Section 3: Frontend
- Section 4: Measuring Tests Effectiveness

## 想定読者

- フロントエンドの実装はできるが、テスト経験はない方
- テストに対して解像度が低い方
- これからテストを学びたいと思っている方

# 🏆 テスト設計における黄金律

Section0の**The Golden Rule**では「テストとは？」という全ての土台となるアドバイスが書かれています。まとめると以下2つのことを主張しています。

## アドバイス1

テストコードは本番コードとは違うため非常にシンプルで、短く、抽象さを排除したものにしましょう。また誰がみても一目で伝わるようなテストを心がけると良いです。

## アドバイス2

私たちの頭はいつもメインコードのことでいっぱいなので、余計に複雑なものを追加するような「脳内のスペース」なんてありません。もしも複雑なテストを書いてしまったらチームの開発スピードを停滞させ、結果的にテストを諦める原因になってしまうでしょう。

科学的に人間には2つの脳のシステムがあります。1つはガラガラの道路を車で運転するような努力のいらない活動のために使われ、もう1つは数式を解くような複雑で意識的な操作のために使われます。
 テストは前者のような努力のいらない脳の使い方で処理できるデザインをするべきです。

その達成のためには、テクニック、ツール、費用対効果が高いテスト対象を選択的に取捨選択するとよいでしょう。時には信頼性を敏捷性と簡潔さと天秤にかけ、いくつかのテストを捨てることも有効です。

これら2つのアドバイスはこの先のSectionの土台となるものです。

![[https3A2F2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com2F02F10718892F0ae31710-542d-403b-8eef-df694ecd9197.png]]

# 📝 テスト解剖図

Section1の**The Test Anatomy**ではテストを実装する上でのアドバイスを具体例とともに述べてくれています。その中でも特に重要だと感じた点を以下に紹介します。

## テスト名には3つの要点を含める

テストレポートは、現在のアプリケーションが要件を満たせているかどうかを伝えるものです。その要件とはコードベースに詳しくない人たちに向けたものであり、テスターやデプロイをするDevOpsエンジニアや2年後のあなたです。その意味で、3つの要点をテスト名に含めることで確実に相手にテストの結果を伝えることができます。

いいコード👏

```plain text
//1. unit under test
describe('Products Service', function() {
  describe('Add new product', function() {
    //2. scenario and 3. expectation
    it('When no price is specified, then the product status is pending approval', ()=> {
      const newProduct = new ProductService().add(...);
      expect(newProduct.status).to.equal('pendingApproval');
    });
  });
});

```

## AAAパターンでテスト構成をする

- Arrange（準備）では、テストがシミュレートしたい状況をセットアップします。例えば、テストしたい対象のインスタンス化、DBレコードの追加、特定のオブジェクトをモック/スタブすることなどが含まれます。
- Act（動作）では、実際にテストの対象を実行します。
- Assert（確認）では、返り値が期待している結果となっているかどうかを確認します。

AAAパターンを使うことでテストコードの可読性が飛躍的に上がります。
 では実際にAAAパターンを使ったテストコードと、そうでないコードを見比べてみましょう。

AAAパターンを使用しない🙁

```plain text
test("Should be classified as premium", () => {
  const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
  const DBStub = sinon.stub(dataAccess, "getCustomer").reply({ id: 1, classification: "regular" });
  const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);
  expect(receivedClassification).toMatch("premium");
});

```

AAAパターンを使用👏

```plain text
describe("Customer classifier", () => {
  test("When customer spent more than 500$, should be classified as premium", () => {
    //Arrange
    const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
    const DBStub = sinon.stub(dataAccess, "getCustomer").reply({ id: 1, classification: "regular" });

    //Act
    const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);

    //Assert
    expect(receivedClassification).toMatch("premium");
  });
});

```

## ブラックボックステストを守る

実装の詳細をテストしても大きなオーバーヘッドの割に何も得られません。公開されている振る舞いがテストされている時は、常に内部実装も暗黙的にテストされていて、そのテストが壊れる時というのは何か特定の問題があった時だけです。逆に内部実装をテストする場合、焦点がコンポーネントの出力から実装の詳細に移ります。それにより小さなリファクタリングによって、たとえ出力結果が問題なかったとしてもテストが壊れるかもしれません。これはメンテナンスコストを著しく高めてしまいます。

より詳細な内容は、Kent C.Doddsさんの記事で説明されています。

## リアルな入力データを使う

時にプロダクションのバグは予期せぬ限定的な入力値によって生じます。そこで、fakerなどのライブラリを使って擬似的にリアルで、プロダクションの様々な状態に似せたデータを生成しましょう。このようなライブラリでは電話番号、ユーザー名、クレジットカード情報、会社名などよりリアルなデータを生成することができます。

いいコード👏

```plain text
it("Better: When adding new valid product, get successful confirmation", async () => {
  const addProductResult = addProduct(faker.commerce.productName(), faker.random.number());
  //Generated random input: {'Sleek Cotton Computer',  85481}
  expect(addProductResult).to.be.true;
  //Test failed, the random input triggered some path we never planned for.
  //We discovered a bug early!
});

```

## エラーをcatchするのではなく、期待する

ある処理がエラーを起こすことをテストする際、try-catchを使うことが一見正しいかと思えます。しかし、try-catch文を使うと冗長なコードになりテストのシンプルさが失われてしまいます。エラーが起きることをテストする際は、エラーをcatchするのではなくエラーを期待する形で実装しましょう。

よくないコード🙁

```plain text
it("When no product name, it throws error 400", async () => {
  let errorWeExceptFor = null;
  try {
    const result = await addNewProduct({});
  } catch (error) {
    expect(error.code).to.equal("InvalidInput");
    errorWeExceptFor = error;
  }
  expect(errorWeExceptFor).not.to.be.null;
  //if this assertion fails, the tests results/reports will only show
  //that some value is null, there won't be a word about a missing Exception
});

```

いいコード👏

```plain text
it("When no product name, it throws error 400", async () => {
  await expect(addNewProduct({}))
    .to.eventually.throw(AppError)
    .with.property("code", "InvalidInput");
});

```

## 平坦で長いテストレポートは可読性が低い

テスト結果を確認する人が要件やテストされたシナリオを理解するために、テストを実行する前に少なくとも2つの`describe`ブロックを置くことを推奨します。これは、上記で紹介した「テスト名には3つの要点を含める」とも関連性がありますが、「何がテストされているのか？」と「どのような状況とシナリオを想定しているか？」というブロックを追加することによってテストレポートの可読性を大幅に向上させることができます。

実際にテストレポートの例で確認してみましょう。

よくないコード🙁

```plain text
test("Then the response status should decline", () => {});

test("Then it should send email", () => {});

test("Then there should not be a new transfer record", () => {});

```

テストレポート結果

これでは、どこで何がテストされているのかわかりません。では、最低でも2階層にテストを分類してみます。

いいコード👏

```plain text
// Unit under test
describe("Transfer service", () => {
  //Scenario
  describe("When no credit", () => {
    //Expectation
    test("Then the response status should decline", () => {});

    //Expectation
    test("Then it should send email to admin", () => {});
  });
});

```

テストレポートの可読性が格段に上がったかと思います！少なくとも2つの階層にテストを分類し、「何がテストされているのか？」と「どのような状況とシナリオを想定しているか？」を明らかにすることによってテストコードに詳しくない人がみても瞬時に理解できるレポートになります。

# 🐹 フロントエンドテスト

今までは広くテストを設計する上で有効なアドバイスを扱いましたが、Section3の**Frontend**ではフロントエンドのテストに特化してまとめられています。こちらも特に重要だと感じたものを抜粋して紹介します。

## 変更されにくいHTML属性を使用する

テストでHTML要素をクエリする際、対象のHTML要素に変更されにくい属性が無ければ`data-test-id`のようなカスタムデータ属性を付与することでスタイルの変更などに起因してテストが落ちる事態を回避することができます。またその場合、`test`という専用の属性名を使用することで「この属性はテストで使用される」ということを開発者間で明らかにし意図せず属性を削除してしまうことを避けましょう。実際に以下のようなコードはアンチパターンです。

よくないコード🙁

```plain text
<!-- the markup code (part of React component) -->
<span id="metric" className="d-flex-column">{value}</span>
<!-- what if the designer changes the class? -->


// this example is using enzyme
test("Whenever no data is passed, error metric shows zero", () => {
  // ...

  expect(wrapper.find("[className='d-flex-column']").text()).toBe("0");
});

```

## スリープは使わない！

多くの場合、テスト中のユニットの完了時間は不明です。そのようなケースで、setTimeoutのようなスリープ関数を使用してしまうとテストが大幅に遅延してリスクが向上します。そこで、ライブラリに搭載されている非同期イベントを扱うAPIを使いましよう。Cypressであれば`cy.request('url')`、testing-libraryであれば`wait(expect(element))`のようなAPIが提供されています。

よくないコード🙁

```plain text
test("movie title appears", async () => {
  // element is initially not present...

  // custom wait logic (caution: simplistic, no timeout)
  const interval = setInterval(() => {
    const found = getByText("the lion king");
    if (found) {
      clearInterval(interval);
      expect(getByText("the lion king")).toBeInTheDocument();
    }
  }, 100);

  // wait for appearance and return the element
  const movie = await waitForElement(() => getByText("the lion king"));
});

```

いいコード👏

```plain text
// @testing-library/dom
test("movie title appears", async () => {
  // element is initially not present...

  // wait for appearance
  await wait(() => {
    expect(getByText("the lion king")).toBeInTheDocument();
  });

  // wait for appearance and return the element
  const movie = await waitForElement(() => getByText("the lion king"));
});

```

## テストをドキュメントとして公開する

テストはアプリケーションの信頼を高めるだけでなく、ドキュメント（仕様書）としての役割も持ちます。そして、適切なツールを使うことで開発者と顧客間のコミュニケーションを円滑にすることができるでしょう。これらのメリットは、要件と期待する挙動を人間が読める言語によって表現できることにあります。例えばStorybookを使用すると、コンポーネントのさまざまな状態とそれに対する挙動を一覧的に確認することができます。そして、このカタログは顧客とのコミュニケーションを円滑にするだけでなく、開発者間でのドキュメントとしての役割も担います。

# 📐 テストの効果を測る

Section4の**Measuring Tests Effectiveness**ではテストの効果を測る指標を提示してくれています。

## 十分な自信を得るためのカバレッジは？

テストの目的は、アプリケーションが期待通りに動くための十分な自信を得ることです。多くのコードをテストすればするほど、チームはより自信を持つことができます。カバレッジとは、テストによってどれだけのコードライン（およびブランチ、ステートメントなど）に到達したかを示す尺度です。では、どの程度あれば十分なのでしょうか？10-30%では、ビルドの正確さを知るには明らかに低すぎます。一方、100%では非常に高価で本質的なテストの焦点からずれてしまう可能性があります。そこで、80%のカバレッジを意識することによりアプリケーションを十分満足させるだけのテストができるでしょう。

# まとめ

私自身テストに対する知見や経験が浅い中、非常に参考になる資料でした！テストに対する考え方から実践的な例を交えたベストプラクティスの紹介はこれからのテスト設計における基礎となります。今回扱いきれなかった内容も多くあるので、ぜひ一度ご覧になっていただけたらと思います。

Register as a new user and use Qiita more conveniently

1. You get articles that match your needs
2. You can efficiently read back useful information

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

Comments