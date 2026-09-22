---
URL: https://zenn.dev/bom_shibuya/articles/5c3ae7745c5e94
Created: 2021-09-26T19:50:00
Tags: [topic/技術/テスト]
---
## 追記

以下の記事は`@testing-library/react-hooks`のv3系を使っていました。

v5系に上げると`HookResult`ではなく`RenderResult`になったようなので、v5を使われる場合は`RenderResult`の方をお使いください🙏

テストコードを書くことがプロダクトコードを書くことと、同じくらい重要であるという認識が浸透しつつある昨今、多くの関数にはおそらくテストがあることと思います😊

最近はReactの開発がメインです。
 僕は毎回フロントエンドでテストを書く場合は以下のような方針をとっています。

- コンポーネントのテスト 
    - storybook, Visual Regression Test
- 関数や、hooks 
    - jestで単体テスト <= 今回扱うのはこっち

コンポーネントの文言やDOMの構成、スタイルは変わりやすいですし、`jest`等でやるよりはstorybookやVisual Regression Testを行うほうが都合がいいと考えています。
 なので`jest`で単体テストを書くとなるとロジック関係の単体テストを書くわけですが、なかでもカスタムフックのテストの書き方がわからんみたいなことはあると思います。`react-redux`の`useDispatch`または`useSelector`が絡んでいる、`axios`やら`fetch`が呼ばれている、、、、`useEffect`、、、 そもそもカスタムフックはコンポーネントの中でしか呼べないのにどうやってテストするわけ？みたいになって、「ま、後で調べて書くわ」となりがちな気がしています👀
 ですが、昨今はカスタムフックの中でややこしい処理を行うことも少なくないと思います。そういう場合、テストを書くことで早期のバグの発見や、動作の担保をしたいはずです。
 というわけでやっていきましょう。

## 準備

今回は`create-react-app`でプロジェクトを作ってみました。
 そして`hooks`のテストを書くために、`@testing-library/react-hooks`を入れます。

```plain text
$ npm install --save-dev @testing-library/react-hooks

```

あとはこいつを動かすのに`react-test-renderer`がいります👀

```plain text
$ npm install --save-dev react-test-renderer

```

というかこいつを見れば大体書いていますね😀
 APIリファレンスはここにあります🙆🏻♂️‍

# 実践🚑

これは上記にも書いてあるやつですね。だいたいこんな感じで使います。

```plain text
// hooks/useCounter.ts
import { useCallback, useState } from 'react';

export type UseCounterReturnType = {
  count: number;
  increment: () => void;
};

export const useCounter = (): UseCounterReturnType => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((n) => n + 1), []);
  return {
    count,
    increment,
  };
};

```

簡単なカスタムフックですね🙆🏻♂️‍
 というわけでテストです💪
 コメントに説明を書きました🙆🏻♂️‍

```plain text
// hooks/useCounter.spec.ts
import { HookResult, renderHook, act } from '@testing-library/react-hooks';
import { useCounter, UseCounterReturnType } from './useCounter';

describe('useCounter', () => {
  /**
    カスタムフックの結果を受け取る変数です
    カスタムフックの引数が変わる場合、各test()で作ることになりますが、そうでない場合は
    こんな感じでletで変数を定義してbeforeEachで受け取ればいいと思います🙆🏻♂️‍
  */
  let result: HookResult<UseCounterReturnType>;
  beforeEach(() => {
    /**
      カスタムフックを使う場合はrenderHookを使用します
      renderHookの中でhookをよび、返り値のresultを上記の変数に格納します
      返り値はresult.current.countのようにして入っているので、テストではresult.currentを使うことになります
      result以外ではrerenderやwaitForNextUpdateなどが入っているので、
      それらを使う場合はresultではなくrenderHookの返り値自体を格納するか別途受け取る変数を定義してやるといいでしょう
    */
    result = renderHook(() => useCounter()).result;
  });

  test('countの初期値は0になっている', () => {
    expect(result.current.count).toBe(0);
  });

  test('incrementを呼ぶと、countが期待通りの値に変更される', () => {
    expect(result.current.count).toBe(0);
    /**
      useStateの更新関数を呼ぶ場合はactの中で呼びます。
      そうしないとエラーになります
      Warning: An update to TestHook inside a test was not wrapped in act(...).
      When testing, code that causes React state updates should be wrapped into act(...):
     */
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});

```

主にカスタムフックのテストはこの流れになります🙆🏻♂️‍
 いくつか補足しましょう。

カスタムフックを呼ぶための関数です。当たり前ですがカスタムフックは`React.FC`の中以外で呼ぶことができません。そのへんをいい感じにしてくれるのがこの関数になります。
 以下のように、引数を渡せるようにして発火させることもできます。
 後で紹介する`rerender`時に、異なる引数を渡したいような場合はこの形式で書くと、`rerender`で新しいpropsを渡すことができます。

```plain text
renderHook((props) => useCustom(props), {
  initialProps: {
    message: 'foo',
  }
});

```

renderHookが返す新しいオブジェクトで特に使用するものは以下の5つです。

`renderHook().result`は`current`を持ちます。`renderHook`で呼んだカスタムフックの返り値の現在の値がここに入っています。`expect`でstateの比較をしたり、返り値の関数を呼ぶときは主にここにぶら下がったものを使用することになると思います。

例えば`useEffect`が含まれているとき、再度レンダリングされた時をシミュレートすることができます。引数に新しいpropsを渡すことができます（上で紹介したように、propsを受け取れる状態にしておくことが必要です）。

`Promise`を返す関数です。単純に次の更新を待ちます。つまるところ、`useState`の更新関数が呼ばれるから更新されるわけですが、値が更新されているかどうかはわかりません。
 値の更新を確実に待つ場合は、次の`waitFor`を利用するほうが良さそうです。

`rerender`と組み合わせて使ったりすることになると思います。

注意としては例えば以下のような場合はいつまでも解決されず、テストがtimeoutして落ちてしまいます。

`Promise`を返します。引数に`boolean`を返す関数を渡し、それが`true`になるまで待つということになります。
 実際には、ここで`result.current.foo`が期待した結果とイコールかどうか、みたいな関数を渡すことになると思います。
 永遠にならない場合はtimeoutしてテストが落ちます。

```plain text
await waitFor(() => result.current.foo = expected);

```

わかりやすいですね。`unmount`時をシミュレートできます。`useEffect`のクリーンアップのテストをしたい時に使うことになると思います

`act`を呼ぶ必要があるときというのは、`useState`の更新関数が呼ばれるときです。
 なので、カスタムフックで返されるメソッドが更新関数を呼ぶのであれば`act`内で行う必要があります。
 あるいは、カスタムフックを呼んだ段階で`useEffect`が呼ばれるなどで中で更新関数を呼ぶ場合は`act`の中で`renderHook`を呼ぶ必要があります。

### だいぶわかりが生じてきましたか？🙆🏻♂️‍

他にもメソッド等は用意されていると思いますので、必要があれば見てみてください🙆🏻♂️‍

## axios、fetch等が絡んだhooksのテスト

`axios`やら`fetch`を使って`GET`、または`POST`をすることは多いかと思います。だいたいそういったコードは直接componentに書かずに、カスタムフックに書いて、そのカスタムフックをコンポーネントで使うみたいなことになるかなと思います👀
 そういうロジック関係はカスタムフックに押し込めたくなりますよね🙆🏻♂️‍
 なんですが、axiosとかfetchとか呼ばれたらどうしたらいいわけ？となりがちです👀

そもそもこういうカスタムフックでのテストするポイントとしては、`axios`とか`fetch`のテストではありません。
 僕たちがテストしたいのはカスタムフックの処理です。`axios`等が成功してある値が返ってきたとき、またはエラーになったときにしっかりとハンドリングできているのかがテスト対象になります。

そういうわけで、`axios`やら`fetch`やらを強気でmockしてしまいます。
 以下の例は`axios`の場合です
 ちょっと長いですが、まずはhookの具体例から

```plain text
// hooks/useFetchMessage.ts
import axios from 'axios';
import { useState } from 'react';

export type FetcherResponse = {
  message: string;
};
const fetcher = async (): Promise<FetcherResponse> => {
  const response = await axios.get<FetcherResponse>('path/to/api');
  return response.data;
};

export const FETCH_MESSAGE_RESPONSE_TYPE = {
  success: 'success',
  error: 'error',
} as const;
export type FetchMessageResponseSuccess = FetcherResponse & {
  type: typeof FETCH_MESSAGE_RESPONSE_TYPE.success;
};
export type FetchMessageResponseError = {
  type: typeof FETCH_MESSAGE_RESPONSE_TYPE.error;
};
type FetchMessageResponse =
  | FetchMessageResponseSuccess
  | FetchMessageResponseError;

export type UseFetchMessageReturnType = {
  fetching: boolean;
  fetchMessage: () => Promise<FetchMessageResponse>;
};

export const useFetchMessage = (): UseFetchMessageReturnType => {
  const [fetching, setFetching] = useState(false);

  const fetchMessage = async () => {
    setFetching(true);
    try {
      const response = await fetcher();
      return {
        type: FETCH_MESSAGE_RESPONSE_TYPE.success,
        message: response.message,
      };
    } catch {
      return {
        type: FETCH_MESSAGE_RESPONSE_TYPE.error,
      };
    }
  };
  return {
    fetching,
    fetchMessage,
  };
};

```

型情報が多いので長いですが、やっていることは簡単ですね`useFetchMessage`だけ見てもらえば、非常にシンプルなカスタムフックです。
 次に、本題のテストです。

```plain text
// hooks/useFetchMessage.spec.ts
import { HookResult, renderHook, act } from '@testing-library/react-hooks';
// こいつが肝です
import axios from 'axios';
import {
  useFetchMessage,
  UseFetchMessageReturnType,
  FetcherResponse,
  FetchMessageResponseSuccess,
  FETCH_MESSAGE_RESPONSE_TYPE,
} from './useFetchMessage';

// jest mockの第一引数にモジュールを入れることでモジュールをmockできます
jest.mock('axios');

describe('useFetchMessage', () => {
  let result: HookResult<UseFetchMessageReturnType>;
  beforeEach(() => {
    result = renderHook(() => useFetchMessage()).result;
  });

  test('fetchが成功したとき、期待した値を返却する', async () => {
    const mock: FetcherResponse = {
      message: 'hello world!!!',
    };
    // mockの返り値を返すようにします
    (axios.get as jest.Mock).mockResolvedValue({ data: mock })
    await act(async () => {
      const data = (await result.current.fetchMessage()) as FetchMessageResponseSuccess;
      expect(data.type).toBe(FETCH_MESSAGE_RESPONSE_TYPE.success);
      expect(data.message).toBe(mock.message);
    });
  });

  test('fetchが失敗したとき、期待した値を返却する', async () => {
    /**
      これだと簡単に失敗時のmockもできます🙆🏻♂️‍
      厳密にstatusを見るような場合は以下のようにシミュレーションしてやることもできます
      const response = {
        status: 404,
        data: {
          返り値
        },
      };
     */
   (axios.get as jest.Mock).mockRejectedValue({});
    await act(async () => {
      const data = await result.current.fetchMessage();
      expect(data.type).toBe(FETCH_MESSAGE_RESPONSE_TYPE.error);
    });
  });
});

```

`jest.mock`強いですね！
 ちなみに`jest.mock`を使わない書き方もあります。
 そういう場合は`jest.mock`は消して使うときに、`get`をmock関数に入れ替えます。

```plain text
// 成功時
(axios as any).get = jest.fn(() => Promise.resolve({ data: mock }));

// 失敗時
(axios as any).get = jest.fn(() =>Promise.reject());

```

これもこれで手軽です。`jest.mock`はモジュールしかmockできないので、`fetch`をmockする場合はこの感じでやるといいと思います🙆🏻♂️‍

```plain text
(fetch as any) = jest.fn(() =>
  Promise.resolve({
    json() {
      return mock;
    }
  })
);

```

## react-reduxが絡んだhooksのテスト

`react-redux`が絡むと`Provider`の関係もあり、どうやってテストするんだとなります。
 こんなときも手軽にテストできる方法があります。さすが`jest`。

まずは簡単な`action`等を用意します。`react-redux`、`@reduxjs/toolkit`を別途インストールしています。

```plain text
// store/message/index.ts
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export type Message = {
  message: string;
};

const initialState: Message = {
  message: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(_, action: PayloadAction<Message>) {
      return action.payload;
    },
  },
});

const { setMessage } = messageSlice.actions;
export type SetMessageAction = ReturnType<typeof setMessage>;
export const useSetMessageDispatch = (): Dispatch<SetMessageAction> =>
  useDispatch<Dispatch<SetMessageAction>>();

export { setMessage };

```

```plain text
// store/index.ts
export * from './message';

```

なんの変哲もないコードですね。`useDispach`に型をつけてここで`export`しています。
 別にしてもいいですし、しなくてもいいことですが、この場合は一旦しています。
 storeへの実際の接続は、今回の趣旨ではないのでしていません。

そういうわけで、さっきの`hooks/useFetchMessage.ts`でfetchが成功したときにdispatchを呼んでstoreの値を更新する処理を足したいと思います。
 （useFetchMessageなのに、中でstore更新しちゃうのは気持ち悪い気もしますが、一旦そこは飲みこみます）

```plain text
// hooks/useFetchMessage.ts
import axios from 'axios';
import { useState } from 'react';
import { setMessage, useSetMessageDispatch } from '../store';

// 中略

export const useFetchMessage = (): UseFetchMessageReturnType => {
  const [fetching, setFetching] = useState(false);
  const dispatch = useSetMessageDispatch(); // useDispatchを呼びます

  const fetchMessage = async () => {
    setFetching(true);
    try {
      const response = await fetcher();
      const { message } = response;

      // ここで成功したらdispatchを呼んでいます
      dispatch(setMessage({
        message,
      }));
      return {
        type: FETCH_MESSAGE_RESPONSE_TYPE.success,
        message,
      };
    } catch {
      return {
        type: FETCH_MESSAGE_RESPONSE_TYPE.error,
      };
    }
  };
  return {
    fetching,
    fetchMessage,
  };
};

```

はい。
 なんかこの状態でもなんか行けそうな気も若干しますが、上記の`test`を回すと以下のように怒られます。

```plain text
could not find react-redux context value; please ensure the component is wrapped in a <Provider>

```

ですが、いちいち`<Provider>`で囲うのはだるいよね、という話です🤔

このとき考えるべきことは、この関数でテストしたいことは何かということです👀`useDispatch`の挙動については、コミュニティがしっかりとしたテストをしているはずですし、`reducer`に`setMessage`が渡ったときの挙動は`store`の方でするべきテストです。
 今回の変更によってテストに追加したいことは、`setMessage`関数が期待通りの引数で発火されているか、ということになると思います。

というわけで、やります。
 上記でやったように`'../store'`をmockしてしまいます🙆🏻♂️‍

```plain text
// hooks/useFetchMessage.spec.ts
// 略 import

jest.mock('axios');

/**
  jest.mockの第一引数にmockしたいモジュールを記述します
  第二引数に、このモジュールが何を返すかを記述します
  今回の場合、useFetchMessageではsetMessageとuseSetMessageDispatchが使用されており、
  これらが問題でtestが動いていないので、両方ともmockしてしまいます
  なお、mock用関数は`mock`を接頭辞にしないと怒られます👀
 */
const mockSetMessage = jest.fn();
const mockSetMessageDispatch = jest.fn();
jest.mock('../store', () => ({
  setMessage: (...args: any[]) => mockSetMessage(...args),
  useSetMessageDispatch: () => (...args: any[]) => mockSetMessageDispatch(...args),
}))

describe('useFetchMessage', () => {
   let result: HookResult<UseFetchMessageReturnType>;

  beforeEach(() => {
    result = renderHook(() => useFetchMessage()).result;

    // 毎回mockはresetします
    mockSetMessage.mockReset();
    mockSetMessageDispatch.mockReset();
  });
  // 以下、追記
  test('fetchが成功したとき、期待した引数でsetMessageが呼ばれる', async () => {
    const mock: FetcherResponse = {
      message: 'hello world!!!',
    };
    (axios.get as jest.Mock).mockResolvedValue({ data: mock });
    await act(async () => {
      await result.current.fetchMessage();

      // ここでmockした関数がどのように呼ばれているかを確認します
      expect(mockSetMessage.mock.calls[0][0]).toStrictEqual(
        {
          message: mock.message
        }
      );
    });
  });

  test('fetchが失敗したとき、setMessageは呼ばれない', async () => {
    (axios.get as jest.Mock).mockRejectedValue({});
    await act(async () => {
      await result.current.fetchMessage();
      expect(mockSetMessage.mock.calls.length).toBe(0);
    });
  });
});

```

いいですね🙆🏻♂️‍
 バッチリ動きました👀

`useDispatch`をhook内で直接読んでいる場合、例えば

```plain text
jest.mock('react-redux', () => {
    useDispatch: () => () => mockUseDispatch()
});

```

のように`react-redux`自体をmockすることでも対応することできます🙆🏻♂️‍

## useEffectを含んだhooksのテスト

コンポーネントが最初にレンダリングされたタイミングだけ情報を取得して格納したい、みたいなことはままありそうな気がします。
 あるいは何らかの要件で、そのページが表示されたときに`script`なりを読み込んで、ページが遷移するときには先程挿入した`script`を消したい、みたいなことがあるかもしれません。

そういうときには`useEffect`の使用が検討されることでしょう。というわけでこのようなカスタムフックを用意しました。

```plain text
// hooks/useFetchIfNeeded.ts
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export type FetchedData = {
  name: string;
};

export type UseFetchIfNeededPayload = {
  id: string;
};

export const useFetchIfNeeded = (
  payload: UseFetchIfNeededPayload
): FetchedData | null => {
  const [data, setData] = useState<FetchedData | null>(null);
  const fetch = useCallback(async () => {
    const fetchedData = await axios.get<FetchedData>('path/to/get', {
      params: payload,
    });
    setData(fetchedData.data);
  }, [payload]);

  useEffect(() => {
    fetch();
    return () => {
      setData(null);
    };
  }, [fetch]);

  return {
    data,
  };
};

```

さて、テストです。`useEffect`のテストでこの様に非同期が絡む場合は、どっぷり`@testing-library/react-hooks`のお世話になることになります。

```plain text
// hooks/useFetchIfNeeded.spec.ts
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import {
  FetchedData,
  useFetchIfNeeded,
  UseFetchIfNeededPayload,
} from './useFetchIfNeeded';

describe('useFetchIfNeeded', () => {
  const mockPayload: UseFetchIfNeededPayload = {
    id: 'testId',
  };
  const mockFetchedData: FetchedData = {
    name: 'test boy',
  };
  let mockGet: jest.Mock;
  beforeEach(() => {
    mockGet = jest.fn(() =>
      Promise.resolve({
        data: mockFetchedData,
      })
    );
    (axios as any).get = mockGet;
  });

  test('payloadに変更がない場合、rerenderが行われても再度fetchされない', async () => {
    /**
     【ポイント⚡️】
      上述していますが、customHookので呼ばれるuseEffectの中でuseStateの更新関数を使っている場合、
      act関数の中でrenderHookしてやる必要があります
     */
    await act(async () => {
      // rerenderを呼びたいので、propsを渡す形式でやります
      const { waitForNextUpdate, rerender } = renderHook(
        (payload: UseFetchIfNeededPayload) => useFetchIfNeeded(payload),
        {
          initialProps: mockPayload,
        }
      );
      // 更新を待ちます
      await waitForNextUpdate();
      // このようにしてrerenderを起こすことができます
      // 今回のカスタムフックでは同じ参照のオブジェクト（参照という言葉は怖い）を渡しているので
      // 再度useEffectは呼ばれないはずです。
      rerender(mockPayload);
      await waitForNextUpdate();
    });
    expect(mockGet.mock.calls.length).toBe(1);
  });

  test('payloadに変更がある場合、rerenderが行われたときに再度fetchする', async () => {
    await act(async () => {
      const { waitForNextUpdate, rerender } = renderHook(
        (payload: UseFetchIfNeededPayload) => useFetchIfNeeded(payload),
        {
          initialProps: mockPayload,
        }
      );
      await waitForNextUpdate();
      // 新しいオブジェクトを渡した場合をシミュレートします
      rerender({ id: 'testId 2' });
      await waitForNextUpdate();
      rerender({ id: 'testId 3' });
      await waitForNextUpdate();
    });
    expect(mockGet.mock.calls.length).toBe(3);
  });

  test('unmount時にはクリーンアップ関数が呼ばれる', async () => {
    await act(async () => {
      const { result, waitFor, unmount } = renderHook(
        (payload: UseFetchIfNeededPayload) => useFetchIfNeeded(payload),
        {
          initialProps: mockPayload,
        }
      );
      await waitFor(() => result.current.data?.name === mockFetchedData.name);
      expect(result.current.data?.name).toBe(mockFetchedData.name);
      unmount();
      // このへんで何かしらのテストをする
      /**
        unmountされると、waitForNextUpload等で更新を待てなくなってしまうので
        stateのテストはできないっぽいですね、例として微妙でした😭
       */
    });
  });
});

```

クリーンアップ時の処理が思いつきませんでした😭

## 冷静に考えると、カスタムフックのテスト半分、jestの使い方半分という感じでしたね😊

多分、これで大体のカスタムフック（というか関数も）がテストできるはずなのでバリバリテストを書いていきましょう🙆🏻♂️‍

![[coinbox-dark 9.png]]

### Discussion

![[discussion 9.png]]

1. [実践🚑](https://zenn.dev/bom_shibuya/articles/5c3ae7745c5e94)