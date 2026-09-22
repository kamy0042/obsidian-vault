---
Created: 2021-09-19T22:14:00
URL: https://qiita.com/7tsuno/items/2301a35283db7cd54df9
Tags: [topic/技術/React]
---
RTK Queryおもしろそうなので調べてみたり触ってみたりした。
 どちらかというと雰囲気を伝えることを目的とした記事で、勘違いしている可能性もあるかもしれないので(つっこんでほしい)
 詳細については[公式](https://redux-toolkit.js.org/rtk-query/overview)を読んでください。

- Reactを使ってるひと
- Reactでのデータ取得のキャッシュの扱いとか管理がしんどいなってひと
- **Reduxは分からなくてもOK**

## RTK Query is 何？

[Redux Toolkit](https://redux-toolkit.js.org/)のチームが作ったデータ取得とキャッシングのためのツール。
 データを取得するのが楽になる。キャッシュのロジックを手書きする必要がなくなる。

最近のReactコミュニティでは「データの取得とキャッシュ」は「状態管理」を別のものとして管理したいという需要があった。
 → RTK Queryは「データの取得とキャッシュ」に特化したツール。(Reduxは「状態管理」に特化したツール)

実際のデータ取得とキャッシングのロジックは、Redux ToolkitのcreateSliceとcreateAsyncThunkのAPIの上に構築されている。
 → いい感じに隠蔽されているため、ThunksとかReducerとか書く必要がない。
 → **ReduxとかRedux Toolkitとか分からなくても使える**

### 簡単にいうと

- Hooksを使って簡単に非同期データ取得。
- キャッシュの実装もいろんなパターンを簡単にできる。

create react appで`redux-typescript`テンプレートを使えば最初から入っている。

```plain text
npx create-react-app my-app --template redux-typescript

```

もちろん既存プロジェクトに追加でもOK。

### Query Endpointsの定義

`createApi`を使い、`endpoints`に、`builder.query`メソッドを使用してフィールドを定義する。
 たとえば、 ユーザを全取得する`getUsers`とユーザを1件取得する`getUser`を定義したい場合、以下のように書く。

```plain text
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  name: string
}

type Users = User[]

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
    }),
    getUser: builder.query<User, string>({
      query: (userID: string) => `users/${userID}`,
    }),
  }),
})

// use + endpointsで設定した名前 + QueryでHooksが作られる
export const { useGetUsersQuery,useGetUserQuery } = userApi


```

use + endpointsで設定した名前 + QueryでHooksが作られるため、これをExportしておく。

reducerとmiddlewareに追加する。これでキャッシュをredux内でいい感じに管理してくれるようになる。

```plain text
import { configureStore } from '@reduxjs/toolkit'

import { userApi } from './service/user'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

```

index.tsxとかでstoreをReduxのProviderに設定

```plain text
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


```

Hooksを使ってデータ取得を行うことができる。

```plain text
import React from 'react'

import { useGetUserQuery } from './app/service/user'

const App: React.FC = () => {

  const {
    data,
    error,
    isFetching
  } = useGetUserQuery('A001')

  return (
    <div>
    {error ? (
      <div>エラー</div>
    ) : isFetching ? (
      <div>ロード中</div>
    ) : data ? <div>{data.name}</div>
     : <div>データなし</div>}
    </div>
  );
}

export default App;

```

Hooksの返却値はこんな感じ
 * `data` : クエリで取得したデータが入る
 * `error` : エラーが発生した場合、エラーの値
 * `isUninitialized` : まだクエリが発行されていない場合、`true` (後述)
 * `isLoading` : クエリが**初めて**発行されていて、返却されていない場合`true`
 * `isFetching` : クエリが発行されていて、返却されていない場合`true`
 * `isSuccess` : クエリが成功したデータがある場合`true`
 * `isError` : クエリにエラーがある場合`true`
 * `refetch` : 再度クエリを実行するための関数

`isLoading`と`isFetching`の違いは、`isLoading`は初回のクエリ発行のタイミングのみ走るものであるということ。
 → `isLoading`はページ読み込み時にスケルトンを出すときとかに使うイメージ

## キャッシュの動作について

Hooksを利用したデータ取得ではキャッシュが利用される。

RTK Queryでは基本のキャッシュを

- APIエンドポイント
- シリアル化されたクエリパラメータ
- アクティブなサブスクリプションの参照数

で管理する。

同じエンドポイントで同じクエリパラメータのクエリが別で実行されている場合にはクエリの発行を行わず、キャッシュデータを利用する。

```plain text
const Component1: React.FC = () => {
  const { data } = useGetUserQuery('A001')
  return <div>...</div>
}

const Component2: React.FC = () => {
  const { data } = useGetUserQuery('A002')
  return <div>...</div>
}

const Component3: React.FC = () => {
  const { data } = useGetUserQuery('A002')
  return <div>...</div>
}

```

たとえばこんな感じのコンポーネントがあってすべてマウントされた場合、Component2とComponent3は同じエンドポイントで同じクエリパラメータのため、どちらかではキャッシュが利用される。

キャッシュデータはアクティブなサブスクリプションがある限り残り、アクティブなサブスクリプションがすべてなくなって60秒経つと削除される。
 上記の例だとComponent2とComponent3がアンマウントされてから60秒経つとキャッシュが削除され、またマウントされるタイミングでクエリの発行が行われる。

なんか分かりづらいので簡単に言うと、同じクエリを別のところで投げている場合、自動的にキャッシュが利用されるということ。

refetchを行った場合、キャッシュを無効にして必ずデータの再取得を行う。

```plain text
import React from 'react'

import { useGetUserQuery } from './app/service/user'

const RefetchComponent: React.FC = () => {

  const { data, refetch } = useGetUserQuery('A001')

  return (
    <div>
      <div>{data && data.name}</div>
      <button onClick={() => refetch()} >
        データを再取得する
      </button>
    </div>
  );
}

export default RefetchComponent;

```

refetch後、取得データはキャッシュされ、同じエンドポイントで同じクエリパラメータを利用しているHooksの`data`もその値になる。

### キャッシュの設定変更

オプションを設定するとキャッシュのタイミングなどを調整することができる。

> アクティブなサブスクリプションがすべてなくなって60秒経つと

の`60秒`の部分を変えられる。`number`で秒数指定する。

```plain text
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  name: string
}

type Users = User[]

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  // APIに対するglobalな設定値。ここに書くとendpoints全てに反映される。
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
    }),
    getUser: builder.query<User, string>({
      query: (userID: string) => `users/${userID}`,
      // ここに書くとクエリ毎に設定できる。
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetUsersQuery,useGetUserQuery } = userApi

```

デフォルトの動作よりも頻繁にデータ再取得したいときに設定する。`boolean`か`number`を設定する

- `false`を設定した場合 : デフォルトと同じ。
- `true`を設定した場合 : クエリに新しいサブスクライバが追加されたときにクエリが常に再実行されるようになる。
- `number`を設定した場合 : クエリに新しいサブスクライバが追加されたとき、最後にクエリが実行されてから指定した数字の秒数が経過していた場合にクエリが常に再実行される。

```plain text
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  name: string
}

type Users = User[]

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  // APIに対するglobalな設定値。ここに書くとendpoints全てに反映される。
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
    }),
    getUser: builder.query<User, string>({
      query: (userID: string) => `users/${userID}`
    }),
  }),
})

export const { useGetUsersQuery,useGetUserQuery } = userApi

```

```plain text
const Component2: React.FC = () => {
  // 個別のクエリに設定することもできる
  const { data } = useGetUserQuery('A002',{ refetchOnMountOrArgChange: true })
  return <div>...</div>

```

ちょっとわかりづらいので、`true`を設定した場合の挙動について説明する。

```plain text
const Component2: React.FC = () => {
  const { data } = useGetUserQuery('A002')
  return <div>...</div>
}

const Component3: React.FC = () => {
  const { data } = useGetUserQuery('A002',{ refetchOnMountOrArgChange: true })
  return <div>...</div>
}

```

があって、Component2をマウントした後、Component3をマウントすると`refetch`の時と同様、Component3をマウント時(サブスクライバが追加)にデータ取得が再度行われ、その結果でComponent2の`data`も書き換わる。(Component2でまたデータ取得が行われるわけではない。)

これ結構すごいなって思ったやつ
 これが`true`になっていると、アプリケーションがフォーカスを取り戻した時にデータ取得する。
 別のタブとかから戻ってきたタイミングでデータの再取得が行われる。

```plain text
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  name: string
}

type Users = User[]

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  // APIに対するglobalな設定値。ここに書くとendpoints全てに反映される。
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
    }),
    getUser: builder.query<User, string>({
      query: (userID: string) => `users/${userID}`
    }),
  }),
})

export const { useGetUsersQuery,useGetUserQuery } = userApi

```

これ(と次の`refetchOnReconnect`)は別でstoreの設定変更も必要

```plain text
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { userApi } from './service/user'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// ここを追加
setupListeners(store.dispatch)

```

また、後述する`skip`が`true`の場合はデータの再取得が動かないことも注意。(`refetchOnReconnect`も)

ネットワークコネクションが復活したときにデータ取得する。

```plain text
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  name: string
}

type Users = User[]

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  // APIに対するglobalな設定値。ここに書くとendpoints全てに反映される。
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
    }),
    getUser: builder.query<User, string>({
      query: (userID: string) => `users/${userID}`
    }),
  }),
})

export const { useGetUsersQuery,useGetUserQuery } = userApi

```

storeの設定変更も必要(`refetchOnFocus`を参照)

データの登録更新削除が行われたときにその操作に影響のあるデータを再取得する必要がある。(再取得しないと登録したのにデータないじゃんってなる)
 RTK Queryでは、`cache tag`というシステムを使って再データ取得を管理する。

タグを使って、あるMutationが他のエンドポイントからのクエリによって提供されたデータを無効にする意図があるかどうかを判断する。

例えば、

1. ユーザID`A001`を取得するクエリ
2. ユーザID`A002`を取得するクエリ
3. ユーザをすべて取得するクエリ

があったとして、

ユーザID`A002`の情報を更新すると上記の2,3の結果は変わるが、1の結果には影響しない。
 つまり、2,3はキャッシュを無効化しデータを取得しなおすが、1のキャッシュは無効化しないようにしたい。

具体的にはクエリに`providesTags`を設定する。

4. ユーザID`A001`を取得するクエリ → `providesTags` : `[{ type: 'Users', id: 'A001' }],`
5. ユーザID`A002`を取得するクエリ → `providesTags` : `[{ type: 'Users', id: 'A002' }],`
6. ユーザをすべて取得するクエリ → `providesTags` : `[{ type: 'Users', id: 'A001' },{ type: 'Users', id: 'A002' }...]`

そしてMutationに`invalidatesTags`を設定する。
 ユーザID`A002`を更新するMutation → `invalidateTags` : `[{ type: 'Users', id: 'A002' }],`

`invalidateTags`を持つMutationが実行されたときに、そのタグの内容と一致する`providesTags`を持つクエリのキャッシュを無効にし、データの再取得を行わせる。

実装としてはこんな感じ

```plain text
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  name: string
}

type Users = User[]

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  // 利用するタイプをここに書く。リソース毎にタイプを定義するんじゃないだろうか。
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
      providesTags: (result) =>
        result
          ?
            [
              ...result.map(({ id }) => ({ type: 'Users', id } as const)),
              // addUserがあったときのために特別なタグを用意する。
              { type: 'Users', id: 'LIST' },
            ]
          : // エラーがあった場合でもユーザ追加をしたタイミングで再データ取得をする。
            [{ type: 'Users', id: 'LIST' }],
    }),
    getUser: builder.query<User, string>({
      query: (userID: string) => `users/${userID}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: `users`,
          method: 'POST',
          body,
        }
      },
      // getUsersのキャッシュを無効化する
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `users/${id}`,
          method: 'PUT',
          body,
        }
      },
      // 更新したユーザIDを含むクエリのキャッシュのみを無効化する。
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
    }),
    deletePost: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        }
      },
      // 削除したユーザIDを含むクエリのキャッシュのみを無効化する。
      invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
  }),
})

// Mutationはuse + Mutation名 + Mutationという名前のHookができる。
export const { useGetUsersQuery,useGetUserQuery,useAddUserMutation,useUpdateUserMutation,useDeletePostMutation } = userApi

```

詳しいサンプルは公式のCodeSandboxがわかりやすかった(突然の丸投げ)[https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/mutations](https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/mutations)

### Skipを使った条件付きのデータ取得

基本的にはコンポーネントがマウントされたタイミングでクエリは自動的に実行されるが、自動で実行したくない場合もある。
 クエリを自動的に実行しないためには、`skip`パラメータを利用する。

```plain text
import React from 'react'

import { useGetUserQuery } from './app/service/user'

const SkipComponent: React.FC = () => {

  const [skip, setSkip] = React.useState(true)
  const { data, isUninitialized } = useGetUserQuery('A002', {
    skip,
  })

  return (
    <div>
      <div>{isUninitialized && 'データ未取得'}</div>
      <div>{data && data.name}</div>
      <button onClick={() => setSkip(false)} >
        データを取得する
      </button>
    </div>
  );
}

export default SkipComponent;

```

`skip`が`true`の場合はクエリが実行されない。
 また、この時`isUninitialized`が`true`になる。

キャッシュのコントロールをうまくやったりするのにはとてもよさそう。
 Reduxのthunkにつらみを覚えている人は手を出すのありかも。
 個人的にはRedux Toolkitも最高って感じなので合わせて使っていきたい気持ち。

公式ドキュメントまだ半分くらいしか読んでないのでアレですがちらっと見た感じWebSocketとかとも使えたり自動生成とかもあるみたい。

![[Attachments/無題のフォルダ/qiitan-for-prompt-login-modal-014e085d3e40a240e3fe8d61b70b29a9.png]]

Why not register and get more from Qiita?

7. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
8. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2F7tsuno%2Fitems%2F2301a35283db7cd54df9&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2F7tsuno%2Fitems%2F2301a35283db7cd54df9&realm=qiita)

Comments

![[original.jpg]]