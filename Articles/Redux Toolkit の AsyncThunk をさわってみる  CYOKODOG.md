---
Created: 2021-01-16T04:00:00
URL: https://www.cyokodog.net/blog/redux-toolkit-async-thunk/
Tags: [topic/技術/React]
---
[Redux Toolkit をさわってみる](https://www.cyokodog.net/blog/redux-tookit/) のつづき。createAsyncThunk とは

- Redux Toolkit の機能の 1 つで、Redux Toolkit v1.3.0 から使える
- 非同期処理に対応した ActionCreator を生成する関数

## createAsyncThunk を使用しない場合との違い

### createAsyncThunk を使用しない

- [こちら](https://pxgrid.esa.io/posts/2667#Redux%20Thunk%20%E3%81%AB%E3%82%88%E3%82%8B%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86%E3%81%AE%E9%80%A3%E6%90%BA)でサンプルを紹介
- createAsyncThunk を使用しない場合は、非同期処理が完了した後に`dispatch(sliceに定義されたaction)`のようにして`dispatch()`する構成になるため、`store`に依存した実装となる

```plain text
export const loadTasks = (): AppThunk => {return async (dispatch, getState): Promise<void> => {const tasks = await todoApi.getTasks();    dispatch(todoSlice.actions.setTasks(tasks));
```

### createAsyncThunk を使用する

- createAsyncThunk では、第一引数に`ActionType`、第二引数に`Payload`を生成する関数を指定するのみなので（payload を返すのみで dispatch はしない）、`store`には依存しない構成となる
- store(slice)の定義側から、上記関数を参照し`extraReducers`で設定する(`extraReducers`の書き方はなんパターンかあるけど ts の場合は以下のように書く)

```plain text
export const todoSlice = createSlice({  name: 'todo',  reducers: { ... },  extraReducers: (builder) => {    builder.addCase(loadTasks.fulfilled, (state, action) => {      state.tasks = action.payload.tasks;
```

- component からの呼び出し方法は変わらず、非同期処理の関数を`dispatch`する
- ts の場合は以下のように`AppDispatch`を型注釈として指定しないとコンパイルエラーになる
- `AppDispatch`は store を定義したモジュールとかで以下のように宣言しておく
- createAsyncThunk を使用する場合は依存関係が逆転するので、モジュールに切り出して管理する場合は、これに合わせたディレクトリ構成や循環参照に配慮した構成にする（公式では 1 ファイルにまとめちゃうことを推奨してる感あり）
- [こんな風](https://codesandbox.io/s/ionic-react-redux-toolkit-sample-ous9u?file=%2Fsrc%2Fstore%2Ftodo%2Factions%2Ftodo.action.ts)にまとめてる人もいる

## createAsyncThunk を使うメリット

- 前述の例だと依存関係が逆転して、コード量が増えたぐらいであまりメリットを感じられないけど、createAsyncThunk を使うと、非同期リクエストにおける次の各ライフサイクル毎に処理をフックすることができる
    - pending: 非同期処理中
    - fulfilled: 非同期処理の成功時
    - rejected: 非同期処理の失敗時

### 非同期処理の失敗時を考慮

```plain text
export const loadTasks = createAsyncThunk<{ tasks: Task[] },>("todo/loadTasks", async (_args, thunkApi) => {const tasks = await todoRepo.fetchTasks();return { tasks };} catch (e) {      status: -1,      message: "タスクデータの取得に失敗しました",
```

```plain text
export const todoSlice = createSlice({  extraReducers: (builder) => {    builder.addCase(loadTasks.fulfilled, (state, action) => {      state.tasks = action.payload.tasks;      state.info = 'データ取得成功';    builder.addCase(loadTasks.pending, (state, action) => {      state.info = 'データ取得中';    builder.addCase(loadTasks.rejected, (state, action) => {if (action.payload) {const title = `[${action.payload.message}] エラーの原因を調べる`;const newTask = makeTask(title);        state.tasks = [newTask];        state.info = 'データ取得失敗';
```

- component 側では、次のように非同期処理の成否を判定し、payload の取得ができる

```plain text
const resultAction = await dispatch(loadTasks());if (loadTasks.fulfilled.match(resultAction)) {  console.log("データ取得成功", unwrapResult(resultAction));if (loadTasks.rejected.match(resultAction)) {  console.log("データ取得失敗", unwrapResult(resultAction));
```

## state の更新を既存の reducer で行う

- createAsyncThunk による実装は、Vuex でいうところの action に似ている感じがした
- Vuex の action の場合は非同期処理後に直接 state を更新することもできるけど、「`commit`して`mutation`を呼び出す」ことで state の更新箇所をまとめることができ、そっちの実装が推奨されてた記憶...
- 前述の`extraReducers`の実装の場合、次のように同じ`state`の更新が、複数箇所で重複する可能性がある

```plain text
export const todoSlice = createSlice({    setTasks(state: State, action: PayloadAction<{ tasks: Task[] }>) {      state.tasks = action.payload.tasks;  extraReducers: (builder) => {    builder.addCase(loadTasks.fulfilled, (state, action) => {      state.tasks = action.payload.tasks;
```

- ちなみに createAsyncThunk を使用しない場合は、reducers で定義された action を dispatch するだけなので、このような問題は起こり得ない
- createAsyncThunk を使用する場合は、次のように書けば`extraReducers`側から、`reducers`を呼び出せる