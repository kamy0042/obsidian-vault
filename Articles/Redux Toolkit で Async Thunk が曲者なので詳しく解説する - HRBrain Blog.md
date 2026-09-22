---
Created: 2021-01-16T04:04:00
URL: https://times.hrbrain.co.jp/entry/2020/12/08/redux-toolkit-async-thunk
Tags: [topic/技術/React]
---
![[1554776372268242.bin]]

こんにちは HRBrainでフロントエンドを書いている鈴木です

この記事は[HRBrainAdventCalendar](https://qiita.com/advent-calendar/2020/hrbrain)8日目の記事です

Reduxには `@reduxjs/toolkit` という超メガドデカハチャメチャ便利ライブラリがありますが、 `createAsyncThunk` で作ったコードでなんやかんやしようとするとかなりハマったのでそちらの紹介です

- [型パラしんどい](https://times.hrbrain.co.jp/entry/2020/12/08/redux-toolkit-async-thunk)

# 型パラしんどい

`createAsyncThunk` には3つの型パラメーターが必要ですが、複雑でかなりしんどいです まずは型定義を見てみましょう

```plain text
function createAsyncThunk<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = {}
>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
    options?: AsyncThunkOptions<ThunkArg, ThunkApiCongi>
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;

```

パッと見よくわかりませんね 一つ一つ見ていきましょう

## 結論

```plain text
function createAsyncThunk<
    第2引数の関数の返り値,
    第2引数の関数の第1引数の型（生成された関数を実行する時に必要な引数）,
    Thunkが引き回しているコンテキストの型
>(/* ... */)

```

以下解説です

## Returned

1つ目の型パラメータは `Returned` となっています この `Returned` は `AsyncThunkPayloadCreator` に渡されているので、こっちを見てみます

```plain text
type AsyncThunkPayloadCreator<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = {}
> = (arg: ThunkArg, thunkAPI: GetThunkAPI<ThunkApiConfig>) => AsyncThunkPayloadCreatorReturnValue<Returned, ThunkApiConfig>;

```

`AsyncThunkPayloadCreator` から渡ってきた `Returned` は更に `AsyncThunkPayloadCreatorReturnValue` に渡されています

```plain text
type AsyncThunkPayloadCreatorReturnValue<
    Returned,
    ThunkApiConfig extends AsyncThunkConfig
> = Promise<Returned | RejectWithValue<GetRejectValue<ThunkApiConfig>>> | Returned | RejectWithValue<GetRejectValue<ThunkApiConfig>>;

```

入ってきた `Returned` がそのまま `Promise<T>` の中に渡されています そもそも `AsyncThunkPayloadCreatorReturnValue` は `AsyncThunkPayloadCreator` の返り値として定義されていましたし、更に `AsyncThunkPayloadCreator` は `createAsyncThunk` の第2引数の関数だと定義されていたので… どうやら **createAsyncThunkの第2引数の関数の返り値** だということがわかりました

ですので、大抵は `void` とかフェッチしてきたデータを返してあげたりする時の型を入れてあげれば良いでしょう

```plain text
// 例えばこんなかんじ
const fetch = createAsyncThunk<{ users: User[] }, ?, ?>('fetch', async (arg, thunkAPI) => {
    const res = await axios.get<User[]>('/api/users')
    return res.data
})

```

## ThunkArg

次は `ThunkArg` ですが、こちらも `AsyncThunkPayloadCreator` に渡されてたのでもう一度思い出してみます

```plain text
type AsyncThunkPayloadCreator<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = {}
> = (arg: ThunkArg, thunkAPI: GetThunkAPI<ThunkApiConfig>) => AsyncThunkPayloadCreatorReturnValue<Returned, ThunkApiConfig>;

```

こちらはこの時点で第1引数の `arg` で使われています ということは、 **createAsyncThunkの第2引数の関数の第1引数** であることがわかりました

## ThunkApiConfig

これはRedux ToolkitがThunkのAPIをまとめた型で、中にはおなじみの `dispatch` や `getState` などが入っています `ThunkApiConfig extends AsyncThunkConfig` となっているので、 `AsyncThunkConfig` を詳しく見てみましょう

```plain text
type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
}

```

とんでもなくざっくりとした型となっています これを実際のコードのどこで使うかと言うと、第2引数の関数の第2引数で使います

```plain text
const hoge = createAsyncThunk('hoge', (arg, thunkAPI) => {})
//                                         ^^^^^^^^^ これ

```

`thunkAPI` の名前にある通り `redux-thunk` で使う関数などが入っています 型がざっくりしているのは、開発プロジェクトによって可変になるからです

このままだと使いづらいし何よりRedux Toolkitの型定義がこいつを `export` してくれていないので、自分の好きなように型を作ってしまいます

```plain text
type RootState = { /* ... */ }
type ExtraArg = { /* ... */ }

export type AsyncThunkConfig<T = unknown> = {
    state: RootState
    dispatch: Dispatch
    extra: ExtraArg
    rejectValue: T
}

```

## 使い方

全部の型パラメータの正体がわかったので早速使ってみましょう

```plain text
// 例 カウンターの増幅はこうなりそう
const increment = createAsyncThunk<
    { count: number },
    undefined,
    AsyncThunkConfig
>('increment', (arg, thunkAPI) => {
    return thunkAPI.getState().count + 1
})

// 例 IDからユーザーをフェッチするとこう
const fetchUserById = createAsyncThunk<
    { user: User },
    { id: string },
    AsyncThunkConfig
>('fetchUserById', async (arg, thunkAPI) => {
    const res = await window.fetch(`/api/user/${arg.id}`)
    return JSON.parse(res.json())
})

```

# 動きがいまいちわからん

さて、これだけ丹精込めて `createAsyncThunk` を使って関数を作っても、肝心の作った関数の使い方が全然わからないということはないでしょうか 実は従来の `redux-thunk` のように使うよりもより便利なAPIがReduxToolkitから提供されていることも併せて理解しておきたいところです

## 作った関数を実行する

これは特に変なところはないです 普通に実行しましょう

```plain text
const increment = createAsyncThunk(/* ... */)

const Component = () => {
    const dispatch = ReactRedux.useDispatch()

    const clickIncrement = React.useCallback(() => {
        // 普通にThunk関数として使える
        dispatch(increment())
    }, [dispatch])

    return (/* ... */)
}

```

## 非同期のアクションを受け取る

`createAsyncThunk` で作成したThunk関数には必ず `pending` `fulfilled` `rejected` の3つのActionが一緒に作成されます どれも作成されたThunk関数の中にオブジェクトとして入っており、以下のように参照可能です

```plain text
const increment = createAsyncThunk(/* ... */)

increment.pending
increment.fulfilled
increment.rejected

```

また、それぞれが表すイベントはこんな感じです

![[Archive/import/Redux Toolkit で Async Thunk が曲者なので詳しく解説する - HRBrain Blog/New database/New database.base]]

これらを使うと、非同期関数を実行した時の各イベントでReducerを書くことができます

```plain text
const slice = createSlice({
    name: 'counter',
    reducer: {},
    extraReducer: builder => {
        builder.addCase(increment.pending, (state, action) => { /* ... */ })
        builder.addCase(increment.fulfilled, (state, action) => { /* ... */  })
        builder.addCase(increment.rejected, (state, action) => { /* ... */ })
    }
})
```

めちゃくちゃ便利ですね フェッチの関数とかであればフェッチ中はローディングのフラグをStateに建てるなんてこともできちゃいます

更に、 `fulfilled` と `rejected` では `action.payload` に値を詰めることができます まずは `createAsyncThunk` の中身を弄ります

```plain text
const fetch = createAsyncThunk<
    // Returned = fulfilledのPayload
    { users: User[] },
    undefined,
    // AsyncThunkConfig<T> の T = rejectedのPayload
    AsyncThunkConfig<{ errorMessage: string }>
>(
    'fetch',
    (arg, thunkAPI) => {
        let res
        try {
            res = await fetch('/api/users')
        } catch (e) {
            thunkAPI.rejectWithValue({ errorMessage: 'Fetch error' })
            return
        }
        
        return JSON.parse(res.json())
    }
)

```

`fulfilled` に値を詰める場合は `createAsyncThunk` の `Returned` が型になり、第2引数の関数の返り値がそのまま入ります `rejected` に値を詰める場合は `AsyncThunkConfig<T>` の `{ rejectValue: T }` がその型になります 値を詰めるのは `thunkAPI.rejectWithValue()` で行います

そうしたらあとはReducerで受け取るだけです

```plain text
const slice = createSlice({
    name: 'user',
    reducer: {},
    extraReducer: builder => {
        builder.addCase(increment.fulfilled, (state, action) => {
            // { users: User[] } が入ってくる
            state.list = action.payload.users
        })
        builder.addCase(increment.rejected, (state, action) => { 
            state.status = 'error'
            // { errorMessage: string } が入ってくる
            state.message = action.payload.errorMessage
        })
    }
})

```

このように非同期のActionを使いこなすことによって **非同期の管理からエラー処理までを簡単に書くことができます**

# おわりに

ReduxToolkit の AsyncThunk は非常に強力です！この機会に是非使いこなしてみてください！