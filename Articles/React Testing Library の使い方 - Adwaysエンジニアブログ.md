---
URL: https://blog.engineer.adways.net/entry/2020/06/12/150000
Created: 2021-01-27T21:59:00
Tags: [topic/技術/テスト]
---
![[og-image-1500 7.png]]

こんにちは。[Testing Library](https://testing-library.com/) を布教したいマンの梅津です。[以前書いた記事](https://blog.engineer.adways.net/entry/2020/05/29/153000)で実装の詳細をテストすることの弊害と React Testing Library による解決方法を Kent から学びました。

今回はその [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) の簡単な使い方を紹介したいと思います。
 Testing Library には [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro) や [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro) などもあるので、普段 React を触っていない人も是非目を通してみてください！

サンプルとして次のようなコンポーネントを用意しました。
 あまり意味のない処理も入っていますが、気にせずテストを書いていきましょう。

```plain text
import React, { ChangeEvent, FormEvent, useState } from "react"
import { updateProfile } from "../api"

type Props = {
  title?: string
  name?: string
}

function UserProfileEditor({ title, name: initialName }: Props) {
  const [name, setName] = useState(initialName ?? "")
  const [inputValue, setInputValue] = useState("")
  const [hasError, setHasError] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasError(false)
    try {
      const { userName } = await updateProfile(inputValue)
      setName(userName)
      setInputValue("")
    } catch (e) {
      setHasError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title ?? "Edit Your Profile"}</h1>

      <div>Current Name: {name}</div>

      <label htmlFor="name-input">Name</label>
      <input id="name-input" value={inputValue} onChange={handleChange} />

      <button type="submit">Submit</button>

      {hasError && <div role={"alert"}>update error!!</div>}
    </form>
  )
}

export { UserProfileEditor }

```

## まずは何からはじめればいいの？

必要なものをインストールしましょう。`jest` を入れたら[こちらを参考に](https://github.com/testing-library/react-testing-library#installation)React Testing Library のインストールを行ってください。

```plain text
npm install --save-dev @testing-library/react
```

それと [jest-dom](https://github.com/testing-library/jest-dom) のカスタムマッチャーがとても便利なので、こちらも入れておくことをオススメします。
 jest-dom を入れたあとは `jest.config.js` に次のような設定をしておくとカスタムマッチャーの import を省略できます。

```plain text
module.exports = {
    ...
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
}

```

ESLint を入れているなら [plugin](https://github.com/testing-library/eslint-plugin-testing-library) の設定をしておくのもいいでしょう。

## テストを書き始めるには？

まずは `render` 関数を使ってコンポーネントを描画しましょう。
 UI テストを行うにはこれがないと始まりません。

```plain text
import React from "react"
import { render } from "@testing-library/react"
import { UserProfileEditor } from "./UserProfileEditor"

test("プロフィール編集フォームのレンダリング", () => {
  render(<UserProfileEditor />)
})

```

## 要素を取得したい

`getByLabelText` や `getByText` といった `getBy*` 関数を使いましょう。
 React Testing Library では、この `getBy*` 関数を使うことが基本になります。
 これらの関数は `render` 関数の戻り値から取得できます。

```plain text
import React from "react"
import { render } from "@testing-library/react"
import { UserProfileEditor } from "./UserProfileEditor"

test("プロフィール編集フォームのレンダリング", () => {
  const { getByLabelText, getByText } = render(<UserProfileEditor />)

  // 第１引数に渡した値にマッチする要素を返す
  const heading = getByText("Edit Your Profile")
  expect(heading).toBeInTheDocument()

  // getBy* 関数はマッチする要素がないときにエラーを投げる
  // document内に該当の要素があることを確認したいだけならこれでも効果はある
  getByText("Edit Your Profile")

  // 正規表現を渡すことも可能
  const nameInput = getByLabelText(/name/i) as HTMLInputElement
  nameInput.value = "umetsu"
  expect(nameInput).toHaveValue("umetsu")

  // ボタンの取得には getByText が使える
  getByText(/submit/i)
})

```

`getBy*` 関数はマッチする要素がない場合にエラーを投げます。
 つまり、これらの関数はある要素が存在することを確認するための暗黙的なアサーションにもなっています。
 加えて複数の要素がマッチした場合もエラーを投げます。
 複数の要素を扱いたい場合は `getAllBy*` 関数を使ってください。

他の `getBy*` 関数や、引数として渡すマッチャーの詳細は次のドキュメントをご参照ください。

## 描画している DOM の内容を知りたい

`debug` 関数が用意されているのでこれを使いましょう。`debug` 関数は呼び出した時点の DOM の状態を記録しログに出力してくれます。
 また、特定の要素を渡せばそれを出力してくれます。

```plain text
import React from "react"
import { render } from "@testing-library/react"
import { UserProfileEditor } from "./UserProfileEditor"

test("プロフィール編集フォームのレンダリング", () => {
  const { getByText, debug } = render(<UserProfileEditor />)
  debug()

  const submitButton = getByText(/submit/i)
  debug(submitButton)
})

```

出力結果

```plain text
  ● Console

    console.log node_modules/@testing-library/react/dist/pure.js:94
      <body>
        <div>
          <form>
            <h1>
              Edit Your Profile
            </h1>
            <div>
              Current Name:

            </div>
            <label
              for="name-input"
            >
              Name
            </label>
            <input
              id="name-input"
              value=""
            />
            <button
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </body>
    console.log node_modules/@testing-library/react/dist/pure.js:94
      <button
        type="submit"
      >
        Submit
      </button>
```

## イベントを発火させたい

`fireEvent` を使いましょう。`fireEvent` に用意されている `change` や `click` を使うことで各イベントを発火させることができます。

```plain text
import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { UserProfileEditor } from "./UserProfileEditor"

test("プロフィール編集フォームのレンダリング", () => {
  const { getByLabelText, getByText } = render(<UserProfileEditor />)

  const nameInput = getByLabelText(/name/i)
  // onChangeの発火
  fireEvent.change(nameInput, { target: { value: "umetsu" } })
  expect(nameInput).toHaveValue("umetsu")

  const submitButton = getByText(/submit/i)
  // onClickの発火
  fireEvent.click(submitButton)
})

```

`fireEvent` の他に [User Event Module](https://github.com/testing-library/user-event) というものもあります。
 こちらのほうが抽象度の高いコードを書けるのでオススメです。

```plain text
import React from "react"
import { render } from "@testing-library/react"
import user from "@testing-library/user-event"
import { UserProfileEditor } from "./UserProfileEditor"

test("プロフィール編集フォームのレンダリング", () => {
  const { getByLabelText, getByText } = render(<UserProfileEditor />)

  const nameInput = getByLabelText(/name/i)
  // targetやvalueといった文字が消え、「ユーザーが文字を入力する」ということをより表現したコードになる
  user.type(nameInput, "umetsu")
  expect(nameInput).toHaveValue("umetsu")

  const submitButton = getByText(/submit/i)
  user.click(submitButton)
})

```

## Props を変更して再描画したい

`rerender` 関数が用意されているのでこれを使いましょう。

```plain text
import React from "react"
import { render } from "@testing-library/react"
import { UserProfileEditor } from "./UserProfileEditor"

test("プロフィール編集フォームのレンダリング", () => {
  const { getByText, rerender } = render(<UserProfileEditor />)
  getByText(/edit your profile/i)

  rerender(<UserProfileEditor title={"Custom Title"} />)
  getByText(/custom title/i)
})

```

## 要素が表示されていないことを確認したい

`queryBy*` 関数を使いましょう。`queryBy*` 関数はマッチする要素がない場合に null を返します。`getBy*` のようにエラーにはなりません。

```plain text
import React from "react"
import { render } from "@testing-library/react"
import { UserProfileEditor } from "./UserProfileEditor"

test("プロフィール編集フォームのレンダリング", () => {
  const { queryByRole } = render(<UserProfileEditor />)
  expect(queryByRole("alert")).toBeNull()
})

```

## 非同期処理を行うコンポーネントをテストしたい

`findBy*` 関数を使って非同期処理の終了を待ちましょう。`findBy*` 関数は通信処理を含むコンポーネントでよく使います。
 他にもアプリケーション全体のテストを書く場合、画面遷移やアニメーションが含まれることもあるでしょう。
 こういったときも `findBy*` 関数を使うとテストが柔軟になり壊れにくくなります。

```plain text
import React from "react"
import { render } from "@testing-library/react"
import user from "@testing-library/user-event"
import { updateProfile } from "../api"
import { UserProfileEditor } from "./UserProfileEditor"

jest.mock("../api")
const mockUpdateProfile = updateProfile as jest.Mock

test("プロフィール編集フォームのレンダリング", async () => {
  mockUpdateProfile.mockResolvedValueOnce({ userName: "umetaro" })

  const { getByLabelText, getByText, findByText } = render(
    <UserProfileEditor name={"umetsu"} />
  )

  // 現在の名前が表示されているか
  getByText(/current name: umetsu/i)

  await user.type(getByLabelText(/name/i), "umetaro")
  user.click(getByText(/submit/i))

  // 通信処理が呼ばれているか確認
  expect(mockUpdateProfile).toHaveBeenCalledWith("umetaro")
  expect(mockUpdateProfile).toBeCalledTimes(1)

  // 更新後の名前が表示されているか
  await findByText(/current name: umetaro/i)
})

```

## まとめ

いかがだったでしょうか。
 今回は本当に基本的な部分のみの紹介となりましたが、これだけでも意味のある UI テストを書ける気がしませんか？
 この記事によって Testing Library を使う際のハードルが下がれば幸いです。

最後におさらいをして終わりにしましょう。

- 基本は `findBy*` , `findAllBy*` 関数を使う
- 表示されていないことを確認したければ `queryBy*` , `queryAllBy*` 関数を使う
- 非同期処理やアニメーションがある場合は `findBy*` , `findAllBy*` 関数を使う

以上です！それでは、また。