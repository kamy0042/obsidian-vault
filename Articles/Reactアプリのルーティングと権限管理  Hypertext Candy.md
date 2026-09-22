---
Created: 2021-02-04T14:52:00
URL: https://www.hypertextcandy.com/react-route-guard
Tags: [topic/技術/権限管理]
---
![[Attachments/無題のフォルダ/eye-catch.jpg]]

この記事では、React で SPA を構築する場合に、認証状態によってアクセスできるページを制限する方法を紹介します。

現実的なアプリケーションでは必須の要件かと思いますので、これから SPA 開発にチャレンジする、という方は参考にしてみてください。

## サンプルアプリ

### CodeSandbox

今回作成するサンプルアプリを載せておきます。

[CodeSandbox のページ](https://codesandbox.io/s/stupefied-hertz-yibdv?fontsize=14&hidenavigation=1&theme=dark)からも確認いただけます。

### 要件

サンプルアプリは以下の要件を満たします。

![[Archive/import/Google Testing Blog/New database/New database.base]]

### 作戦

以下の作戦で要件を実装します。

- ログイン後にユーザー情報を受け取り、ストアに保存する。
- React Router の `<Route />` をラップした独自ルートコンポーネントを作成する。
- そのコンポーネントでは、ストアにアクセスしてユーザー情報の有無を確認する。
- ユーザー情報の有無によって、指定されたアクセス先を表示するか、リダイレクトするかを判定する。

ここから、ポイントを紹介していきます。コードの全体は上掲の CodeSandbox を参照してください。

## ログイン機能

まずはログイン機能について説明します。

### API

API はダミーです。実際はサーバーサイドに対して非同期通信を行うでしょう。

```plain text
export function login(username, password) {
  return new Promise(resolve => {
    resolve({
      id: 123,
      username,
      email: "sample@email.com",
    });
  });
}
```

### Store

認証情報を保管する Redux ストアです。実装には[こちらの記事](https://www.hypertextcandy.com/learn-react-redux-with-hooks-and-redux-starter-kit)でも紹介した、[Redux Toolkit](https://redux-toolkit.js.org/) を使用しています。

```plain text
import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi } from "../api/auth";

const initialState = {
  user: null, // ユーザー情報の格納場所
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload });
    }
  }
});

export default slice.reducer;

// 認証済みか確認するセレクター
export const isAuthSelector = state => state.auth.user !== null;

// ログイン機能
export function login(username, password) {
  return async function(dispatch) {
    const user = await loginApi(username, password);
    // ログイン後にユーザー情報をストアに格納する
    dispatch(slice.actions.setUser(user));
  }
}
```

```plain text
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";

const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({ reducer });

export default store;
```

### Login.js

ログインが成功したら、`/mypage` にリダイレクトします。

```plain text
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const submit = async () => {
    await dispatch(login(username, password));
    history.push("/mypage");
  };

  // 以下略...
}
```

## Route Components

ここまでで、ログインしていればストアにユーザー情報が入っている、つまりストアから認証状態を確認できる、というところまで実装できています。

独自ルートコンポーネントを見ていきましょう。

### 認証必須ルート

まずは認証されていないと通れないルートです。ストアから認証状態を見て、未認証であればリダイレクトコンポーネントを返します。

```plain text
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../store/auth";

function PrivateRoute(props) {
  const isAuth = useSelector(isAuthSelector);

  // 渡された props をそのまま Route に設定する
  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
```

認証状態を確認する方法がアプリによって違っても、基本的に同じ発想で作れるでしょう。

### 未認証必須ルート

こちらは認証前にしか通れないルートです。`PrivateRoute.js` とやっていることは同じで、ここでは認証していればリダイレクトしています。

```plain text
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../store/auth";

function GuestRoute(props) {
  const isAuth = useSelector(isAuthSelector);

  return isAuth ? <Redirect to="/" /> : <Route {...props} />;
}

export default GuestRoute;
```

### ルート定義

`PrivateRoute.js` と `GuestRoute.js` を使って、以下のようにルート定義を行います。

```plain text
<BrowserRouter>
  <Menu />
  <Switch>
    <Route path="/" exact children={<Home />} />
    <GuestRoute path="/login" children={<Login />} />
    <PrivateRoute path="/mypage" children={<MyPage />} />
  </Switch></BrowserRouter>
```

`<Switch>` の子要素は `<Route>` または `<Redirect>` でなくてはいけませんが、それらをレンダリングするコンポーネントでも OK なので、それを利用したテクニックです。

認証必須のページが複数ある場合は、以下のように `<PrivateRoute>` を複数配置します。

```plain text
<Switch>
  <Route path="/" exact children={<Home />} />
  <GuestRoute path="/login" children={<Login />} />
  <PrivateRoute path="/mypage" children={<MyPage />} />
  <PrivateRoute path="/secret" children={<Secret />} />
  <PrivateRoute path="/profile" children={<Profile />} /></Switch>
```

## アクセス時にログイン状態を復元する

CodeSandbox に載せたのはここまでですが、このままでは不足があります。

認証状態はストアに入れている、つまりメモリ上に格納しているので、画面をリロードすると消えてしまいます。セッションクッキーや JWT トークンが生きていても、認証されていないと見なされてしまいます。

そこで、アプリケーションが起動する直前に API から認証状態を取得してストアにコミットする仕組みを作ります。

### API

この API も当然ダミーです。ログイン中のユーザー情報が返ってくる想定です。

```plain text
export function currentUser() {
  return new Promise(resolve => {
    resolve({
      id: 123,
      username: "john-doe",
      email: "sample@email.com",
    });
  });
}
```

### Store

上記の API にアクセスする機能をストアに追加します。

```plain text
import { login as loginApi, currentUser } from "../api/auth";

// 中略...

export function setCurrentUser() {
  return async function(dispatch) {
    try {
      const user = await currentUser();
      dispatch(slice.actions.setUser(user));
    } catch(err) {
      // 未認証の場合は 403 などのエラーが発生する想定だが、
      // 初期状態でログインしていないことは異常ではないので
      // 特にハンドリングはしない
    }
  }
}
```

### 非同期にレンダリング

`store` の `dispatch` メソッドで `setCurrentUser` アクションを実行します。

```plain text
import { setCurrentUser } from "./store/auth";

// 中略...

// store の dispatch メソッドを使えば、
// コンポーネントの外でもアクションを実行できる
store.dispatch(setCurrentUser()).then(() => {
  // 認証状態を取得したあとにアプリを起動する
  ReactDOM.render(<App />, root);
});
```

この実装では、`store.dispatch(setCurrentUser())` の実行中は画面に何も表示されません。それが NG であれば、たとえば `<App>` のようなルートコンポーネントでアクションを実行して、実行中はローディングを表示するなどのアレンジもできるでしょう。

以上、React 製の SPA において、認証状態によってアクセスできるページを制限する方法を紹介しました。