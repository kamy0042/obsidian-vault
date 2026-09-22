---
タグ: []
作成日時: 2022-07-25T14:11:00
URL: https://qiita.com/xrxoxcxox/items/2c498537292c6388cb80
Tags: [topic/アクセシビリティ]
---
React 18で新しく[useIdというhooks](https://ja.reactjs.org/docs/hooks-reference.html#useid)が使えるようになりました。
 コンポーネントにWAI-ARIAを導入するにあたって、便利になると思ったのでいくつかのパターンを紹介します。

また、Qiita Engineer Festa 2022の「React 18、あなたならどう使いこなす？」への投稿記事でもあります。

## 記事を書こうと思った理由——useId登場以前の迷い

実例を紹介する前に、なぜこの記事を書こうと思ったかについて説明します。

例えば`aria-labelledby`を使う場合、以下のようになります。
 （コードは[MDN Docsのaria-labelledbyのページ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)より拝借）

```plain text
<span role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="tac"></span>
<span id="tac">I agree to the Terms and Conditions.</span>

```

簡単に説明すると、まず`role="checkbox"`のspanは`aria-labelledby="tac"`の記述によって`id="tac"`のspanを参照しています。
 そのためスクリーンリーダー使用時に`role="checkbox"`のspanにフォーカスを当てると`I agree to the Terms and Conditions.`と読み上げられます。

`aria-labelledby`が無かった場合、見た目としては紐付いていてもスクリーンリーダーはそれを検知できません。
 マシンからしたら、謎のチェックボックスがぽつんと置いてある感じ……とでも言えるのでしょうか。

`aria-labelledby`も含めて、この後紹介する属性はすべて他要素のidを参照して読み上げなどを支援します。

ここで、idを使用するため若干の難しさが生まれます。
 コンポーネントを作るにあたって、どの場所で何回使われるか？は考慮に入れるべきではありません。
 しかしidは1ページで1つしか使ってはいけないので、単に固定した文字列を指定すると、他要素と重複してしまう可能性があります。

回避するために、propsとして毎回idを指定する、[nanoid](https://github.com/ai/nanoid)などのライブラリを使用する、といった選択肢が挙げられるでしょう。
 前者は結局人間が指定するのでうっかり重複してしまうかもしれませんし、後者は（気持ちの問題ですが）このために依存関係を増やすのは……となっていました。

上記のような悩みがあったため、React自体がユニークなidを生成する仕組みを提供してくれたのはありがたいです。

useIdを使う場合、以下のように書きます。（ほぼ[React公式ドキュメントのuseIdの説明](https://reactjs.org/docs/hooks-reference.html#useid)のままです。）
 特に迷うことはありませんね。

```plain text
import { useId } from "react";

export function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react" />
    </>
  );
}

```

ここから、2つの例を紹介します。
 基本はMDN DocsにあるHTMLのコードをReactに置き換えて記載しています。

### 1つのコンポーネントに1つのidで済むパターン

上で書いた内容、ほぼそのままです。

```plain text
import { useId } from "react";

export function Checkbox({ description }) {
  const id = useId();
  return (
    <>
      <span
        role="checkbox"
        aria-checked={isChecked} // 何かしらでコントロール。記事の内容とは直接関係ないので省略。
        tabIndex={0}
        aria-labelledby={id}
      ></span>
      <span id={id}>{description}</span>
    </>
  );
}

```

例では`aria-labelledby`を使いましたが、書き方は`aria-describedby`や`aria-details`、`aria-owns`なども同じです。

参考：

inputコンポーネントを作るとして、label要素とエラーメッセージもセットにしておきたいものです。
 すると、labelの`htmlFor`で指定するidと、inputの`aria-errormessage`で指定するためのidが2つ必要になります。

このように1つのコンポーネント内で複数のidが必要な場合は`id + 接尾辞`の形式をとってください。
 これも[React公式ドキュメントのuseIdの説明](https://ja.reactjs.org/docs/hooks-reference.html#useid)に記載があります。

```plain text
import { useId } from "react";

export function Input({ label, errorMessage, ...props }) {
  const id = useId();
  return (
    <p>
      <label htmlFor={`${id}-input`}>{label}</label>
      <input
        type={props.type}
        name={props.name}
        id={`${id}-input`}
        aria-invalid={!!errorMessage}
        aria-errormessage={`${id}-errorMessage`}
      />
      {!!errorMessage && <span id={`${id}-errorMessage`}>{errorMessage}</span>}
    </p>
  );
}

```

もう少し複雑なパターンだと、タブリストのUIなんかがあるでしょう。
 このままでは全然役に立たなそうなコンポーネントですが、イメージは掴めると思うので例として示します。

```plain text
import { useId } from "react";

export function TabList({ firstTab, secondTab }) {
  const id = useId();
  return (
    <div>
      <div role="tablist" aria-label="Sample Tabs">
        <span
          role="tab"
          aria-selected={isSelected} // 何かしらでコントロール。記事の内容とは直接関係ないので省略。
          aria-controls={`${id}-panel-1`}
          id={`${id}-tab-1`}
          tabIndex={tabIndex} // 何かしらでコントロール。記事の内容とは直接関係ないので省略。
        >
          First Tab
        </span>
        <span
          role="tab"
          aria-selected={isSelected} // 同上
          aria-controls={`${id}-panel-2`}
          id={`${id}-tab-2`}
          tabIndex={tabIndex} // 同上
        >
          Second Tab
        </span>
      </div>
      <div
        id={`${id}-panel-1`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${id}-tab-1`}
        hidden={isHidden} // 同上
      >
        <p>{firstTab}</p>
      </div>
      <div
        id={`${id}-panel-2`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${id}-tab-2`}
        hidden={isHidden} // 同上
      >
        <p>{secondTab}</p>
      </div>
    </div>
  );
}

```

最後まで読んでくださってありがとうございます！
 Twitterでも情報を発信しているので、良かったらフォローお願いします！

![[Attachments/無題のフォルダ/qiitan-for-login-modal-014e085d3e40a240e3fe8d61b70b29a9 2.png]]

Why not register and get more from Qiita?

1. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
2. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fxrxoxcxox%2Fitems%2F2c498537292c6388cb80&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fxrxoxcxox%2Fitems%2F2c498537292c6388cb80&realm=qiita)

Comments