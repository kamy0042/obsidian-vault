---
URL: https://dev.classmethod.jp/articles/redux-testing-rtk/
Created: 2021-09-26T22:13:00
Tags: [topic/技術/テスト]
---
![[unnamed-file-1-960x504.png]]

## Overview

本記事では extraReducer に定義された Thunk Action と Selector のテストの記述例をご紹介します。

Redux-Toolkit に関しては以下にまとめていますのでもし良ければ参考にしてみてください。 [React + Typescript プロジェクトに Redux Toolkit を導入したので使い方をざっくりとまとめてみる](https://dev.classmethod.jp/articles/react-typescript-redux-toolkit/)

## 検証環境

- Typescript v3.9.6
- React v16.13.1
- Redux v7.2.3
- Redux-Toolkit v1.5.1

## Slice

テストしたいこと：サードパーティ API を呼び出して pending, fulfilled, rejected それぞれのケースで Redux Store に想定する値が入ってくるかどうかをテストする

以下の`authSlice.ts`では サードパーティ API ( [LINE Login API](https://developers.line.biz/en/docs/line-login/integrate-line-login/) ) を呼び出して成功時に返却される `LiffIdToken` を Redux Store に格納します。API の呼び出しに失敗した場合は state の`error`が更新されます。

### authSlice.ts

```plain text
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import liff from "@line/liff";
import {AuthState, getCXPToken} from ".";

const liffId = process.env.REACT_APP_LIFF_ID;

const initialState: AuthState = {
  liffIdToken: undefined,
  error: undefined,
};

interface Payload {
  liffIdToken?: string;
}

/**
 * LIFF.login() APIを呼び出して返却された値をStateへ格納する
 * @returns liffIdToken
 **/
export const getLiffIdToken = createAsyncThunk<Payload>(
  "liffIdToken/fetch",
  async (): Promise<Payload> => {
    if (!liffId) {
      throw new Error("liffId is not defined");
    }
    await liff.init({liffId});
    if (!liff.isLoggedIn()) {
      // set `redirectUri` to redirect the user to a URL other than the endpoint URL of your LIFF app.
      liff.login();
    }
    const liffIdToken = liff.getIDToken();
    if (liffIdToken) {
      return {liffIdToken} as Payload;
    }
    throw new Error("LINE login error");
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLiffIdToken.fulfilled, (state, action) => {
      state.liffIdToken = action.payload.idToken;
    });
    builder.addCase(getLiffIdToken.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
```

### authSlice.spec.ts

```plain text
import {getLiffIdToken, authSlice} from "../../ducks/auth/authSlice";
import {RootState} from "../../store";

const initialState: AuthState = {
  liffIdToken: undefined,
  },
  error: undefined,
}

const testState: RootState = {
  auth: {
    liffIdToken: 'asdfghj',
    },
    error: undefined,
  }
}

describe('authSlice', () => {
  describe('getLiffIdToken', () => {
    it('sets initialValue when getLiffIdToken is pending', () => {
      const action = { type: getLiffIdToken.pending.type }
      const state = authSlice.reducer(undefined, action)
      expect(state).toEqual(initialState)
    })

    it('sets customer data when getLiffIdToken is fulfilled', () => {
      const action = {
        type: getLiffIdToken.fulfilled.type,
        payload: {
          liffIdToken: 'asdfghjk',
        },
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.liffIdToken).toEqual('asdfghjk')
      expect(state.error).not.toBeDefined()
    })

    it('sets error when getLiffIdToken is rejected', () => {
      const action = {
        type: getLiffIdToken.rejected.type,
        payload: { error: 'some error' },
      }
      const state = authSlice.reducer(initialState, action)
      expect(state.error).not.toBeDefined()
    })
  })
})
```

## Selector

テストしたいこと：Selector で定義したデータのみを成形し返却しているかをテストする

### authSelector.ts

```plain text
import {createSelector} from "reselect";
import {RootState} from "../../store";

// auth情報を取得するSelector
export const authSelector = (state: RootState) => state.auth;

/**
 * liffIdTokenを取得する
 * @returns liffIdToken
 */
export const liffIdTokenSelector = createSelector(authSelector, (auth) => {
  return auth.liffIdToken;
});
```

### authSelector.spec.ts

```plain text
import {AuthState, liffIdTokenSelector} from "../../ducks/auth";

const initialState: AuthState = {
  liffIdToken: undefined,
};

const testState: RootState = {
  auth: {
    liffIdToken: "asdfghj",
  },
};

describe("authSelector", () => {
  it("selectors to get selected values from auth state", () => {
    const liffIdToken = liffIdTokenSelector(testState);

    expect(liffIdToken).toEqual("asdfghj");
  });
});
```

## References