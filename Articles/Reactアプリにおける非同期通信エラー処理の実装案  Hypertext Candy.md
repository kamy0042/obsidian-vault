---
Created: 2021-08-27T22:36:00
URL: https://www.hypertextcandy.com/react-error-handling
Tags: [topic/技術/React]
---
![[eye-catch 1.jpg]]

この記事では、React アプリ（SPA）での非同期エラー処理について紹介します。

紹介する実装はあくまで今の時点でのアイディアです。アプリによって色々な設計があり得るので、一案として参考にしていただければと思います。

## Redux ストア

エラー処理の実装にあたってまず考えたいのは、エラーをどこで管理するかです。今回は Redux ストアにエラーを保管する方法を考えます。

以下は [Redux Toolkit](https://redux-toolkit.js.org/) を用いたストアの例です。Redux Toolkit については[こちらの記事](https://www.hypertextcandy.com/learn-react-redux-with-hooks-and-redux-starter-kit)でも紹介しているので参考にしてください。

```plain text
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
};

const slice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      return { response: payload };
    },
  },
});

export default slice.reducer;

export const { setError } = slice.actions;
```

## エラーを補足する

色々なケースで、どうやってストアにエラーを格納するか見ていきましょう。基本的にどのケースでも、async/await 構文を使っている場合は、`catch` ブロックでエラーを捕捉します。

### イベントハンドラー

```plain text
import { useDispatch } from "react-redux";
import { setError } from "../store/error";

function MyComponent() {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await someAsyncFunc();
      // ...
    } catch (err) {
      dispatch(setError(err));
    }
  };

  // ...
}
```

### useEffect

```plain text
import { useDispatch } from "react-redux";
import { setError } from "../store/error";

function useFetchUsers() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (err) {
        dispatch(setError(err));
      }
    };
    fetch();
  }, []);

  return users;
}
```

### ストアアクション

```plain text
import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./error";

const slice = createSlice({/* ... */});

export default slice.reducer;

export function fetchSomething() {
  return async function(dispatch) {
    try {
      const response = someAsyncFunc();
      // ...
    } catch (err) {
      // エラー用のストアからインポートしたアクションを呼ぶ
      dispatch(setError(err));
    }
  };
}
```

## エラーハンドリング

格納したエラーを、今度はどのように取り出してエラーを表示させるか考えます。

### エラーを表示する

各ページで使用する共通コンポーネントを作成して、そこでエラー処理を行うよう実装してみます。エラーだけでなく、ページの共通レイアウトなども受け持ってもよいでしょう。

```plain text
import React from "react";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";

function Page({ children }) {
  const error = useSelector(state => state.error.response);

  // エラー処理の例
  if (error) {
    switch (error.status) {
      case 404:
        return <NotFound />;
      default:
        break;
    }
  }

  // エラーがなければコンテンツを表示
  return children;
}

export default Page;
```

このように使用します。

```plain text
function Home() {
  return (
    <Page>
      {/* コンテンツ */}
    </Page>
  );
}
```

### エラーをクリアする

このままでは、画面遷移してもストアにエラーが残っている限り関係ないところでもエラー表示が出てしまいます。

そこで、React Router の `Route` コンポーネントをラップして、ルート変更のタイミングでエラーをクリアしましょう。

```plain text
import React from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../store/error";

export default function MyRoute(props) {
  // ルートが変わるタイミングでエラーをクリアする
  const dispatch = useDispatch();
  dispatch(setError(null));

  return <Route {...props} />;
}
```

このように使用します。

```plain text
<Switch>
  <MyRoute path="/" exact children={<Home />} />
  <MyRoute path="/about" children={<About />} /></Switch>
```

エラーをクリアすべきタイミングは他にもあるかもしれません。ルート変更のタイミングだけでなく、各画面のコンポーネント内でエラーをクリアすべきケースもありそうです。

### バリデーションエラー

エラーの中でもバリデーションエラーに限っては、エラー表示に切り替えずに、別の処理を行いたいはずです。

Redux のセレクターを用いればバリデーションエラーを取得できるでしょう。

```plain text
const invalidMessages = useSelector(state => {
  // バリデーションエラーはレスポンスコード 400 番と仮定する
  if (state.error.response.status !== 400) {
    return [];
  }

  // エラーレスポンスのオブジェクトの形式はアプリケーション次第
  return state.error.response.data.messages;
});
```

## Axios でエラー捕捉を共通化

非同期通信に Axios を使用している場合は、インターセプターの機能で、エラーの捕捉をまとめて最初に定義することができます。

```plain text
import axios from "axios";
import store from "./store";
import { setError } from "./store/error";

// Axios インスタンス
const client = axios.create();

// 成功の場合は何もしない
const onSuccess = response => response;

// エラーの場合はストアにエラーをセットする
const onError = err => {
  // 関数や Promise オブジェクトなど、JSON にシリアライズできない値を
  // アクションのペイロード（引数）に含めるとエラーになるため、
  // 必要なキーのみ取り出してアクションに渡す
  const { status, data } = err.response;
  // コンポーネントの外でアクションを呼び出したい場合は、
  // store の dispatch メソッドを利用する
  store.dispatch(setError({ status, data }));
  // エラーをスローしたい場合は...
  // Promise.reject(err);
};

client.interceptors.response.use(onSuccess, onError);

export default client;
```

この手法を使えば、ビジネスロジック側の `catch` ブロックでエラー捕捉する必要はなくなります。

## おまけ：ストアで管理しないパターン

おまけとして、Redux ストアではなく、各画面のコンポーネント内で管理するパターンも考えてみます。

### エラーの捕捉

独自 Hook からは、以下のようにエラーを返すことができます。

```plain text
// 独自 Hook
function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        /* ... */
      } catch (err) {
        setError(err);
      }
    };
    fetch();
  }, []);

  // 配列にエラーをまとめて返す
  return [users, error];
}

function MyComponent() {
  // 独自 Hook からエラーを受け取る
  const [users, fetchError] = useFetchUsers();

  // ...
}
```

イベントハンドラーでは、エラー用のステートを用意します。

```plain text
const [handlerError, setHandlerError] = useState(null);

const handleSubmit = async () => {
  try {
    /* ... */
  } catch (err) {
    setHandlerError(err);
  }
};

const handleClick = async () => {
  try {
    /* ... */
  } catch (err) {
    setHandlerError(err);
  }
};
```

ページ内の色々なポイントで発生するエラーを捕捉していくのはいいのですが、結局必要なのはどれか一つでしょう（複数異なるエラーが出たとしても、別々に表示したい要件はあまり聞かない）。

```plain text
const [foo, fooError] = useFetchFoo();
const [bar, barError] = useFetchBar();

const [handlerError, setHandlerError] = useState(null);
const handleSubmit = async () => {
  try {/* ... */} catch (err) {
    setHandlerError(err);
  }
};

// -> ページ内にいくつもエラーがある
```

そこで、複数のエラーをまとめる Hook を考えてみました。

```plain text
// エラーをまとめる独自 Hook
function useErrors(...errors) {
  const [error, setError] = useState(null);

  useEffect(() => {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i]) {
        setError(errors[i]);
        break;
      }
    }
  }, errors);

  return error;
}
```

このように使用します。

```plain text
const pageError = useErrors(fetchError, handlerError);
```

### エラーハンドリング

基本的には、ストアで管理するパターンで紹介した手法と同じです。`<Page>` 内でストアを参照するのではなく、エラー情報をプロパティで渡す仕組みに変えるだけでよいでしょう。

```plain text
const pageError = useErrors(fooError, barError, bazError);

return (
  <Page error={pageError}>
    {/* コンテンツ */}
  </Page>
);
```

以上、React アプリ（SPA）での非同期エラー処理を実装するアイディアを紹介しました。

Axios のインターセプターまで使って Redux ストアでエラーを管理すると、ビジネスロジック側ではエラーの扱いをほとんど意識しなくて済むので、結構綺麗にまとまりそうです。ただ、共有のストアで管理すると、適切にクリアするよう気にかける必要がありますね。

どの実装方式が適切かは、最終的には個別の要件次第でしょう。他にも良い実装を思いついたらまた記事に書きたいと思います。