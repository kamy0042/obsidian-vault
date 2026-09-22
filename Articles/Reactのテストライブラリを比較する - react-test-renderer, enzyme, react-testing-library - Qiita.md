---
URL: https://qiita.com/Hitomi_Nagano/items/8673be3c8907c6697cb6#react-testing-library
Created: 2021-01-28T00:15:00
Tags: [topic/技術/テスト]
---
![[Attachments/無題のフォルダ/https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94 2.png]]

```plain text
   
   
   
     
   


    
   


   
   
     
     
  
    
         
  

     
             
       
    
    
    
    
  
})

```

こちらもテストはALL PASSでしたが、選んだコンポーネントが悪かったのか、実装にかなり悩まされました。。

こちらはenzymeと似たような使い方ができるライブラリです。`Jest + enzyme`よりは記事数が少ないものの、`Jest + react-testing-library`コンビは人気が出てきているように見受けます。
 「ユーザーが実際に操作するイベントに沿ってテストする」を掲げたライブラリなので、まだ触って間もないですが使い勝手が良いです。

テキストフィールドコンポーネントを検証しようと思います。
 このコンポーネントでは以下、

- ①テキスト入力エリア
- ②残り何文字入力できるか、残文字数表示

を表現するようになっています。

react-testing-libraryはざっくりと、以下のような実装が可能です。

- `"jest-dom/extend-expect"`の読み込みが必要
- `react-testing-library`はイベント処理の発火に`fireEvent`を提供している
- 同様にレンダリングしたDOMのunmountに`cleanup`
- スナップショットを使いたい時は[asFragment](https://testing-library.com/docs/react-testing-library/api#asfragment)

```plain text
import TextField from "components/TextField"
import "jest-dom/extend-expect"
import React from "react"
import { cleanup, fireEvent, render } from "react-testing-library"

describe("<TextField />", () => {
  afterEach(cleanup)

  it("スナップショットテスト", () => {
    const { asFragment } = render(<TextField />)

    // スナップショットテスト
    expect(asFragment()).toMatchSnapshot()
  })
})

```

こちらのQiitaの記事が非常に参考にさせていただきました！
 → 「[フロントエンドでTDDを実践する（react-testing-libraryを使った実践編）](https://qiita.com/taneba/items/b21f5fee17eb593b30c8)」

こちらにある通り、本当なら`getByTestId`の多用は避けるべきとありますが、すみません、、まだ使い始めたばかりなのでこれしか使いませんでした。。`getByTestId`を使う場合、テスト対象となるエレメントに`<div data-testid="foo">`のように`data-testid`を付与する必要があります。

- テスト対象のエレメントに`data-testid="DUMMY"`を付与（避けるのが良い）
- テストコードでまず 
    - `const { getByTestId } = render(コンポーネント)`
    - `getByTestId`関数を使って取得
    - `const input = getByTestId("textField")`
- テキストの値をテストしたい時は`toHaveTextContent()`

```plain text
it("入力文字数が表示される", () => {
  const { getByTestId } = render(<TextField />)
  // 入力エリア
  const input = getByTestId("textField")
  // カウント数表示
  const count = getByTestId("counterNumber")

  // デフォルトは空であることを確認
  expect(input).toHaveTextContent("")

  // デフォルト表示"140"
  expect(count).toHaveTextContent("140")

  // テキストを1文字入力する
  input.innerHTML = "a"
  fireEvent.input(input)
  expect(input).toHaveTextContent(input.innerHTML)
  // カウント数が"140"から"139"に変更、且つ、エラーは表示されていない
  expect(count).toHaveTextContent("139")

  // テキストを200文字入力する
  input.innerHTML =
    "ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。ここには200文字のテキストが入ります。"
  fireEvent.input(input)
  expect(input).toHaveTextContent(input.innerHTML)
  // エラー表示される
  expect(count).toHaveTextContent("-45")
})

```

イベント処理のところ、今回`input`イベントですが、恐らくよく使われるイベントは`fireEvent.click(getByText("Up"))`
 とか

でしょうか。

感覚的にテストがしやすかったので、個人的にreact-testing-libraryの理解をさらに深めようと思っています。

比較してみましたが、「結果これが良い！」と断定出来ていません^ ^;
 「このライブラリのここが良かった」等ありましたら気軽にご意見ください！

Why not register and get more from Qiita?

1. We will deliver articles that match you
2. you can read useful information later efficiently

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2FHitomi_Nagano%2Fitems%2F8673be3c8907c6697cb6&realm=qiita)[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2FHitomi_Nagano%2Fitems%2F8673be3c8907c6697cb6&realm=qiita)