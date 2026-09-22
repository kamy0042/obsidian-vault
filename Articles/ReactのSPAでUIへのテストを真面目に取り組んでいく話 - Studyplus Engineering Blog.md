---
URL: https://tech.studyplus.co.jp/entry/2020/10/05/090000?amp=1
Created: 2021-02-27T16:11:00
Tags: [topic/技術/テスト]
---
こんにちは。ForSchool事業部の@okuparaです。最近入社しました。今後ともよろしくお願いします。

Studyplus for SchoolはReactを使用したSPAとして構築されています。フロントエンドのテスト関しては以前よりReduxやロジックに対してのテストがいくつか存在していたものの、コンポーネント(UI)のテストはあまり存在していませんでした。最近自分の方でこの辺の足りていなかったUIテストへの対応を行ったので、その時のお話を書きたいと思います。

## Unit tests, Integration testsについて

元々フロントエンドのリポジトリにはEnzymeが入っていましたが、今回react-testing-libraryにしました。Integration testsを書くのに相性が良いと思ったからです。

テストの話をする際に、Unit tests、Integration testsはコンテキストや人によって微妙に意味が違ったりすることもあるので、一旦このエントリでそれぞれが何を意味するのか整理しておきます。 ここではreact-testing-libraryのauthorでもあるKent C. Dodds氏のブログから参考にしています。 [https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests)

- Unit tests

UIのそれぞれ独立したパーツへのテストです。ボタンやフォームなどです。

- Integration tests
- Unit testsが連携して動くのを確認する
- 出来る限り最低限のmockにとどめる

といった事が書かれています。出来る限り最低限のmockにとどめる、とはmockをするのはAPIやアニメーションだけにして、例えば`onSubmit`や`onClick`などにダミーのpropsを渡さないと言う意味だと解釈しています。これにより実際のアプリケーションの挙動に近い状況がテストできることになります。

自分がもう一つ、Integration testsの意味として大事にしておきたいと思っているのが "実際に特定の機能のシナリオに沿ってテストする" ということです。例えばユーザープロフィール機能でユーザーがユーザー名を変更するテストを書くとします。 その際、ForSchoolの画面上では以下の事が起こります。

- ユーザープロフィール機能のコンポーネントをロードする
- API(mock)からユーザー情報を取得する
- ユーザー名が画面に表示される
- ユーザーが、ユーザー名を編集するための編集ボタンをクリックする
- ユーザー名編集のためのモーダルダイアログが立ち上がる
- モーダルの中にテキストボックスが表示され、現在設定されているユーザー名がテキストボックスに入っている
- ユーザーが、ユーザー名を編集し、更新ボタンを押す
- ユーザー名を更新するためのAPIが呼ばれる(mock)
- APIが成功であれば、更新用のモーダルダイアログが閉じられる
- 画面上のユーザー名表示が新しい名前で更新されている

Integration testsではこのシナリオに沿ってテストすることができます。ロードするコンポーネントは、可能であればapp全体でも良いですし(Next.jsを採用している場合は難しいと思いますが・・・)、containers/presentationパターンを使っていればcontainerに相当するコンポーネントが主な対象にしても良いと思いますし、colocationを意識した設計ならそれぞれAPIとの通信が発生するコンポーネントになってくるでしょう。 いずれにせよ、Integration testsでは実際のアプリケーションの動作に出来る限り近い状況で、API通信を含めた一連のシナリオでテストできる単位のコンポーネントを使います。

## Integration testsにフォーカスする

Kent C. Dodds氏の[別のエントリ](https://kentcdodds.com/blog/write-tests)にて同氏はUnit testsやE2E testsより多くのリソースをIntegration testsに割くと良い、と書いています。

react-testing-libraryによるIntegration testsは各シナリオのテストを、jsdomにレンダリングされた内容を通して行うので、基本的には内部の実装がReduxかどうかということと依存関係がありません。これにより、内部のステートマネジメントの変更や各種ライブラリの移行、大きめのリファクタリングなどもIntegration testsが揃っていれば、自信をもって行うことができます。

それでは具体的なテスト回りについて書いていきたいと思います。先ほど例としてあげた、"ユーザーがプロフィール画面上でユーザー名を変更する"シナリオでテストを書いていきたいと思います。ForSchoolではこのような画面です。

![[20200929180912.gif]]

## APIのmock

今回セットアップしたIntegration testsはjestを用いたフロントエンドで閉じたテストとなりますので、バックエンドと通信する部分はmockの機能が必要となります。今回我々は[msw.js](https://mswjs.io/)を採用しました。 理由はKent C. Dodds氏が推薦していること、ユースケースとしてブラウザが含まれる(ブラウザで動作する場合はServiceWorker上で動作する)のでレスポンスのmockデータをそのままStorybookでも流用でき、APIとの連携が含まれるコンポーネントのstoryを作成する必要があった場合にも流用できると思ったからです。

```plain text
import { rest } from "msw"
import { setupServer } from "msw/node"
import { UserInfo } from "../mock/api/userinfo"

export const server = setupServer(
  rest.get("/api/me", (_, res, ctx) => {
    return res(ctx.json(UserInfoMock));
  }),
  rest.patch("/api/user_profile", (_, res, ctx) => {
    // 成功の場合は空のレスポンスを返している
    return res(ctx.json({}))
  }),
)

```

`/api/me`のmockデータとして返却しているUserInfoMockはJSのオブジェクトです。基本的にはダミーデータの入ったテスト環境のAPIのレスポンスのjsonからコピーしてきて作ったりしています。 ここで定義した`server`は後述するテスト本体にて`server.listen()`を呼び出すことでmockが使用可能になります。

Storybookで使うケースなど、ブラウザでmockしたい場合は`setupServer`の代わりに`setupWorker`を使います。中のハンドラの設定は同じです。

## テストを書く

では実際のテストを見てみましょう。 ForSchoolでは現状React Routerを使っているので、Routingをまとめているコンポーネントをロードできるようラッパーのヘルパーメソッドを作りました。

これによりURLを指定することで、対応したコンポーネントがロードされます。React RouterのURLのパラメータの値を解決して各コンポーネントのpropsに渡す部分もjestのテスト上でそのまま動きます。

```plain text
export const appRenderer = (url: string) => {
    if (typeof(window) === "undefined") {
      throw new Error("This function should be called on browser or jsdom")
    }
    window.history.pushState({}, "Integration Test", url)
    return render (
      <Router>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    )
}

```

```plain text
import { appRenderer } from "../../../tests/helpers/TestHelper"
import { screen, waitFor } from "@testing-library/react"
import { UserInfoMock } from "../../../mock/api/userinfo"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import { server } from "../../../tests/msw" // 先ほどmockを作ったモジュール
import { rest } from "msw"

const spyFetch = jest.spyOn(window, "fetch")

describe("SettingProfile", () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })
  test("アカウント名が変更できる", async () => {
    appRenderer("/settings/profile")
    await screen.findByText("アカウント設定")

    // 現在のユーザ名が画面に表示されているか
    const fullNameTexts = screen.queryAllByText("スタプラ タロウ")
    // ユーザー名はメイン画面とグローバルヘッダーの二箇所に表示されているか
    expect(fullNameTexts.length).toBe(2)

    // 変更ボタンを探す
    const buttons = screen.queryAllByText("変更")
    // ボタンが0ではないことをアサーション(変更ボタンは3つある)
    expect(buttons.length).not.toBe(0)

    const theFirstButton = buttons[0]
    userEvent.click(theFirstButton)

    // クリックした後にユーザー名変更のためのダイアログが出るまで待つ
    await screen.findByRole("dialog")

    // 姓、名、それぞれのテキストフィールドのエレメントを取得する
    const lastNameInput = screen.getByLabelText("姓")
    const firstNameInput = screen.getByLabelText("名")

    const newLastName = "新しい姓"
    const newFirstName = "新しい名"

    // 一旦テキストフィールの名前を消して、新しい名前を入力する
    // user-eventモジュールのtypeで定義済みの特別なキーワードを使うことで簡単に実装できる
    userEvent.type(lastNameInput, `{selectall}{backspace}${newLastName}`)
    userEvent.type(firstNameInput, `{selectall}{backspace}${newFirstName}`)

    const updateButton = screen.getByText("更新")
    userEvent.click(updateButton)

    // 更新後/api/meをもう一度叩いて更新を確かめているので、
    // msw.jsのresponse#onceを使って更新後のデータがmockできるようにする
    const newFullName = `${newLastName} ${newFirstName}`;
    const newResponse: typeof UserInfoMock = {
      ...UserInfoMock,
      fullName: newFullName,
      firstName: newFirstName,
      lastName: newLastName,
    }

    server.use(
      rest.get(`/api/me`, (_, res, ctx) => {
        return res.once(ctx.json(newResponse))
      })
    )

    // 画面を通して更新APIへリクエストした内容が期待通りになっているか
    await waitFor(() => {
      const calledProfileApi =spyFetch.mock.calls.find(item =>
        item[0] === `/api/user_profile` &&
        item[1]?.method === "PATCH"
      )
      // 更新の時送ったリクエストの内容をテスト
      if (!calledProfileApi || !calledProfileApi[1]) {
        throw new Error("The request for settings/profile couldn't be found")
      }
      const reqBody = JSON.parse(calledProfileApi[1].body as string)
      expect(reqBody).toStrictEqual({
        operator: {
          first_name: newFirstName,
          last_name: newLastName
        }
      })
    })

    // 更新後はダイアログが消える
    await waitFor(() => {
      const modal = screen.queryByRole("dialog")
      expect(modal).not.toBeInTheDocument()
    })

    const newElements = screen.queryAllByText(newFullName)
    // グローバルヘッダー + 情報画面 の名前が更新されている
    expect(newElements.length).toBe(2)
  })
})

```

`const buttons = screen.queryAllByText("変更")`のようにreact-testing-libraryの機能を使って画面上の文字列からUIのElementを特定しています。 もちろんjsdom上ではDOM APIを直接使って(siblingsやchildrenを使うのも含む)要素を特定することも可能ですが、避けた方が良いと思います。 DOM構造やReactコンポーネントのツリー構造に依存したテストをかくと、簡単なHTMLのリファクタリングをしただけなのにIntegration testsが落ちるといったことが発生し、逆にストレスとなり得ます。 こういった問題を避けるためにも、実際に画面上に表示されている情報からUIの要素を特定していくのが良いと思います。

上記ではわかりやすく`getByText`など要素を取得するメソッドのパラメータにテキストをベタ書きしていますが、こちらも実装側の文言が変わるとテストも落ちてしまうので、実装でi18n等に対応しmessagesのファイルから共有されたテキストを使うのが理想的だと思います。

内部の実装ではユーザーが更新ボタンをクリックした後、成功した後に一度プロフィール情報を取り直しているので、msw.jsの`response.once`を使って一度だけ上書きした内容でレスポンスするようにしています。

その後のwaitFor内でfetchを`jest.spyOn`している内容から更新のAPIが呼ばれたか、バックエンドへ想定した内容でリクエストボディを送っているかのアサーションが通るまで待っています。ユーザーがフォームを操作した内容が期待通りAPIへ送信されているかテストしておくことにより、自信を持ってバックエンドとの結合が行えますし、何か問題があった場合でも原因が切り分けやすくなります。

Integration testsではAPI(mock)を介してシナリオをシミュレートするので、上記のように非同期のメソッドを実行してawaitで待つようなケースが多くなってくると思います。その際に特定の要素が出現するのを待つfind*のメソッドと、特定のアサーションが成功するまで待ち続けるwaitForを使います。この辺りは慣れが必要になってくるかな、と個人的には思います。 自分もクリックした後すぐにAPIに送っているリクエストが正しいかアサーションしていたところ、どうしてもパスしなくてハマったことがあったのですが、理由はクリックした後にリクエスト送信は非同期で行われるため、waitForで少し待つ必要があった、ということでした。 アサーションを書く際には非同期が発生するシナリオかどうか毎回意識しておく必要があります。

## 運用について

テストの難しいところは導入すれば終わり、というわけではないところです。特にプロジェクトの初期からUIへのテストを書いていないと、"書いて当たり前"という雰囲気になるまでにはいろいろと工夫する必要があると思います。

始めはカバレッジなどの数値を指標として設定し、目標などに組み込んでも良いと思いますし、スクラムなどでチーム開発を行っていれば計画ミーティングなどで、ポイントの見積もりをする際にその機能にIntegration testsが存在しているか、なければIntegration testsを書くまでを作業見積もりに入れるかどうかを都度話したり、フロントエンド関連のスプリントバックログのゴールの項目の一つとして明示しておく等も効果があると思います。

自分達もまだまだ導入してあまり経っていないので、運用の中で振り返りつつしっかり継続できるように工夫していきたいと思っています。

Studyplus for School ではこのようなUIテストや新機能開発・機能改善を一緒にやってくれるフロントエンドエンジニアを募集しています！