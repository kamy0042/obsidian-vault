---
URL: https://tenioioten.hatenablog.com/entry/2020/01/06/045551
Created: 2021-01-03T15:13:00
Tags: [topic/技術/テスト]
---
お疲れ様です tenIOIOten です

みなさんフロントでテストを書いてますか？

まさか手動でテストをしてたりしないですよね？

確かにフロントは「[json](http://d.hatena.ne.jp/keyword/json) 色付け係」と揶揄されるように [json](http://d.hatena.ne.jp/keyword/json) をいい感じにスタイリングすればいいので、他への影響が少なく、テストをしなくても壊れにくいです

しかし、本当にフロントは壊れにくいですか？

今回は React でのテストの書き方についてまとめていきたいと思います

テストを書く時間のない時期でも書くべき、[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)と[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のテストについてまとめていきます

[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)以上のテストはプロダクト初期では壊れやすいので、書くかどうかは任せます

## 書く場所

大まかに以下の所になります

- 条件分岐を持つ reducer
- 条件分岐を持つ saga（適宜利用している middleware に置き換えてください）
- action [creator](http://d.hatena.ne.jp/keyword/creator) を持つ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)
- regsuit

## reducer

[redux-toolkit](https://redux-toolkit.js.org/)を使ってます、boilerplate 削減の革命児なので触ってない人はぜひ触ってから記事に戻ってきてください

reducer では条件分岐を持つ場合のみテストを書くことにします

reducer は純粋関数なので条件分岐を持たないなら、テストは書く優先度は低いです

```plain text
import { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { addDays, addMonths, addWeeks, startOfWeek } from "date-fns";
import { ModeSelectEnum } from "./types";

const name = "sample";

type State = {
  mode: ModeSelectEnum;
  startTimestamp: number;
};

const initialState: State = {
  mode: ModeSelectEnum.weekly,
  startTimestamp: startOfWeek(new Date(), { weekStartsOn: 1 }).getTime()
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    selectMode: (state, action: PayloadAction<ModeSelectEnum>) => {
      state.mode = action.payload;
    },
    nextDate: (state: State) => {
      switch (state.mode) {
        case ModeSelectEnum.daily:
          state.startTimestamp = addDays(new Date(state.startTimestamp), 1)
            .getTime()
            .getTime();
          break;
        case ModeSelectEnum.weekly:
          state.startTimestamp = addWeeks(
            new Date(state.startTimestamp),
            1
          ).getTime();
          break;
        case ModeSelectEnum.monthly:
          state.startTimestamp = addMonths(
            new Date(state.startTimestamp),
            1
          ).getTime();
          break;
        default:
          break;
      }
    }
  }
});

export const actions = { ...slice.actions, index, failedIndex };

export default slice.reducer;

```

上記のような、`mode`が選択されそれによって`nextDate`の処理が変わるreducerがあるとします

次のように書く条件を通るように state を作りなおしつつ、テストをします

```plain text
import reducer, { actions } from "./slice";
import { ModeSelectEnum } from "./types";

describe("authReducer", () => {
  //　selectModeは条件分岐がないので省略

  describe("nextDate", () => {
    it("should go next day", () => {
      let mode = ModeSelectEnum.daily;
      let startTimestamp = new Date("2020/01/15").getTime();
      let state = { mode, startTimestamp };

      expect(reducer(state, actions.successSignIn(payload))).toEqual({
        ...state,
        startTimestamp: new Date("2020/01/16").getTime()
      });
    });

    it("should go next week", () => {
      let mode = ModeSelectEnum.weekly;
      let startTimestamp = 0;
      let state = { mode, startTimestamp };

      expect(reducer(state, actions.successSignIn(payload))).toEqual({
        ...state,
        startTimestamp: new Date("2020/01/22").getTime()
      });
    });
    it("should go next week", () => {
      let mode = ModeSelectEnum.monthly;
      let startTimestamp = 0;
      let state = { mode, startTimestamp };

      expect(reducer(state, actions.successSignIn(payload))).toEqual({
        ...state,
        startTimestamp: new Date("2020/02/15").getTime()
      });
    });
  });
});

```

## saga

saga も条件分岐を持つもののみテストします

```plain text
export const getSample = function*(dep: Dependencies) {
  const sampleApi = getSampleApi(dep);
  const state = yield select();
  const anyRes = yield call(sampleApi.index, {
    start_timestamp: selectors.startTimestamp(state)
  });
  const res: ThenArg<ReturnType<typeof sampleApi.index>> = anyRes; // ←　yieldは型をanyにしかできないので型を付け直す
  switch (res.status) {
    case Status.success:
      yield put(actions.successIndex(res.data.data));
      break;
    default:
      yield put(actions.failedIndex());
      break;
  }
};

```

簡単な [API](http://d.hatena.ne.jp/keyword/API) を呼ぶだけの saga です

redux-saga-test-plan を使って、条件分岐が入るところで save をしています

もし条件が増える場合は[セーブポイント](http://d.hatena.ne.jp/keyword/%A5%BB%A1%BC%A5%D6%A5%DD%A5%A4%A5%F3%A5%C8)を増やしてください

```plain text
import { axiosResponse } from "./../../test/axiosResponse";
import { SampleApi } from "./../../lib/api/SampleApi";
import { dependencies } from "../../components/contexts/DIContext/dependencies";
import { put, call } from "redux-saga/effects";
import { getSample } from "./sagas";
import { actions } from "./slice";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { testSaga } from "redux-saga-test-plan";

describe("sampleSagas", () => {
  describe("getSample", () => {
    const sampleApi = new SampleApi(); // ←　インスタンスを作っておく

    const dep = mergeDependencies({ api: { sample: sampleApi } }); // ←依存を作る

    const gen = testSaga(signIn, dependencies, actions.signIn(payload));
    const savePoint = "call api";

    it("should call api", () => {
      gen
        .next()
        .next(mockState)
        .call(sampleApi.index, {
          week: mockStartTimestamp,
          workId: mockWorkId
        })
        .save(savePoint);
    });
    it("should success", () => {
      const apiData = [{ x: 1, y: 1 }];
      gen
        .restore(savePoint)
        .save(savePoint)
        .next({ status: 200, data: { data: apiData } })
        .put(actions.successIndex(apiData)) // ←成功アクションがdispatchされるかの確認
        .next()
        .isDone();
    });

    it("should failed with other error", () => {
      gen
        .restore(savePoint)
        .save(savePoint)
        .next({ status: 500, data: null })
        .put(actions.failedIndex()) // ← 失敗アクションがdispatchされるかの確認
        .run();
    });
  });
});

```

## [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)

[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)では action 発行のテストしかしなくも問題ないです、描画の変更は regsuit を使って確認します

hook や個々のコールバックなどのテストをしたい場合は、@testing-libary/react や@testing-libary/react-hooks を使ったサンプルをググってみてください

無駄なテストが実装できないので、いいコードしかないです

ちなみに RTL には Angular や Vue への派生ライブラリもあります

```plain text
const Sample: React.FC<SampleProps> = () => {
  const startTimestamp = useSelector(sampleSelectors.startTimestamp);
  const { nextDate } = useBoundAction();
  useEffect(() => {
    nextDate();
  }, [getName]);
  return (
    <div>
      <button
        onClick={() => {
          nextDate();
        }}
      >
        Next Date
      </button>
      <div>
        {startTimestamp}
      </div>
    </div>
  );
};

const useBoundAction = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(
      {
        nextDate: actions.nextDate
      },
      dispatch
    );
  }, [dispatch]);
};

```

この[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)では以下のように action が発行されたかをテストします

```plain text
import React from 'react';
import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import Sample from './Sample';
import {createMockStore} from '../../../tests/createMockStore';
import { actions } from '../../../modules/sample/slice';
import { ModeSelectEnum } from '../../../modules/sample/types';
import { rootReducer } from '../../../modules/reducers';

const mockStore = createMockStore();

let mockState = {mock: { mode: ModeSelectEnum.daily, startTimestamp: new Date('2020/01/01').getTime()  } }; // ← selectorがundefを参照して落ちるので、storeのstateのモックはしっかりやる必要がある

let store = mockStore(mockState);

beforeEach(()=>{
  store = mockStore(let store = mockStore(mockState));
})

describe('sample page', () => {
  it('should next date on mount', () => {
    const wrapper = render(
      <ReduxProvider store={store}>
        <Sample />
      </ReduxProvider>);

    const resultActions = store.getActions();
    expect(resultActions[0]).toEqual(actions.getName());
  });
  it('should next date on click', () => {
    const { getByText } = render(
      <ReduxProvider store={store}>
        <Sample />
      </ReduxProvider>);

    const button = getByText('Next Date')
    button.click()

    const resultActions = store.getActions();
    expect(resultActions[1]).toEqual(actions.nextDate());
  });
});

```

## regsuit

1. ライブラリを入れる
`sh
yarn add -D reg-suit zisui`
2. `reg-suit`の初期化
`sh
yarn reg-suit init`
3. scripts の追加
`package.json`
`json
{
  "scripts": {
    "pretest-visual": "zisui --serverCmd \"npm run storybook\" http://localhost:9009 -o actual_images -V '1440x900'",
    "test-visual": "reg-suit run"
  }
}`

終わりです

## まとめ

プロダクト初期はとりあえずこれでいいと思います

保守フェイズに入ったら、e2e やインテグレーションテスト、条件分岐なしの reducer や saga の[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)、connect してない[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のテストを書いてもいいと思います