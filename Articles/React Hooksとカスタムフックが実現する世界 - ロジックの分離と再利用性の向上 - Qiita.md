---
URL: https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2
Created: 2020-12-31T16:10:00
Updated: 2020-12-31T16:10:00
Tags: [topic/技術/React]
---
[@sonatard](https://qiita.com/sonatard)

2020年09月02日に更新



# **React Hooksとカスタムフックが実現する世界 - ロジックの分離と再利用性の向上**

[オブジェクト指向](https://qiita.com/tags/%e3%82%aa%e3%83%96%e3%82%b8%e3%82%a7%e3%82%af%e3%83%88%e6%8c%87%e5%90%91)[TypeScript](https://qiita.com/tags/typescript)[React](https://qiita.com/tags/react)[react-hooks](https://qiita.com/tags/react-hooks)

## [**はじめに**](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

[React HooksはReact 16.8 で追加された新機能であり、state などの React の機能をクラスを書かずに使えるようになります。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[React Hooks以前は、ロジックの再利用がコンポーネントに依存してしまいロジック単独でのモジュール化が難しいという問題がありました。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
しかしReact Hooksのカスタムフックという独自のフックを作成する機能を使うことで、Viewに依存することなくロジックだけを再利用することができるようになります。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[この記事では、v1からv6まで改善していく様子を見て頂くことでReact Hooksの利用方法を紹介します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[今回の実例ではコンポーネントのコード量は以下のように削減されます。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

## [**実例紹介**](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E5%AE%9F%E4%BE%8B%E7%B4%B9%E4%BB%8B)

[コンポーネント間のページネーションを実装するuseLocalHistoryカスタムフックを作成します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E5%AE%9F%E4%BE%8B%E7%B4%B9%E4%BB%8B)[
ブラウザのhistory APIのようなものです。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E5%AE%9F%E4%BE%8B%E7%B4%B9%E4%BB%8B)

[実行サンプル](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E5%AE%9F%E4%BE%8B%E7%B4%B9%E4%BB%8B)

[https://oh7c3.csb.app/](https://oh7c3.csb.app/)

### [**v1 カスタムフック未使用**](https://qiita.com/sonatard/items/617f324228f75b9c802f#v1-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E6%9C%AA%E4%BD%BF%E7%94%A8)

[このコンポーネントはViewとロジックが混在しているため、読みづらく、ロジックのテストが難しいコードとなっています。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v1-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E6%9C%AA%E4%BD%BF%E7%94%A8)

[Page.tsx](https://qiita.com/sonatard/items/617f324228f75b9c802f#v1-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E6%9C%AA%E4%BD%BF%E7%94%A8)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v1-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E6%9C%AA%E4%BD%BF%E7%94%A8)[`import React, { useState } from "react";

export const Page = () => {
  const topPage = 1;
  const lastPage = 4;
  const initHistory: number[] = [topPage];
  const [history, setHistory] = useState<number[]>(initHistory);

  const currentPage = history[history.length - 1];

  return (
    <div>
      <div>現在のページ: {currentPage}</div>
      <button
        onClick={() => {
          // 現在トップページの場合は移動しない
          if (currentPage === topPage) {
            return;
          }
          const nextHistory = [...history, topPage];
          setHistory(nextHistory);
        }}
      >
        トップ
      </button>
      <button
        onClick={() => {
          const nextPage = currentPage + 1;
          // ラストページより先には進めない
          if (lastPage < nextPage) {
            return;
          }
          const nextHistory = [...history, nextPage];
          setHistory(nextHistory);
        }}
      >
        次へ
      </button>
      <button
        onClick={() => {
          // トップページより前には戻れない
          if (history.length <= 1) {
            return;
          }
          const nextHistory = [...history.slice(0, history.length - 1)];
          setHistory(nextHistory);
        }}
      >
        戻る
      </button>
      <button
        onClick={() => {
          // 現在ラストページの場合は移動しない
          if (currentPage === lastPage) {
            return;
          }
          const nextHistory = [...history, lastPage];
          setHistory(nextHistory);
        }}
      >
        ラスト
      </button>
      <button
        onClick={() => {
          setHistory(initHistory);
        }}
      >
        履歴を消去
      </button>
    </div>
  );
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v1-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E6%9C%AA%E4%BD%BF%E7%94%A8)

[https://codesandbox.io/s/custom-hook-v1-tv2un](https://codesandbox.io/s/custom-hook-v1-tv2un)

### [**v2 カスタムフック**](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)

[コンポーネントからロジックをカスタムフックに分離します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[コンポーネントが必要な情報は以下だけなので、historyはカスタムフックに隠蔽します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[値は、currentPage](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[操作は、Top、Next、Back、Last、Reset](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)

[Page.tsx](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[`import React from "react";
import { useLocalHistory } from "./useLocalHistory";

export const Page: React.FC = () => {
  const topPage = 1;
  const lastPage = 4;

  const [currentPage, Top, Next, Back, Last, Reset] = useLocalHistory(
    topPage,
    lastPage
  );

  return (
    <div>
      <div>現在のページ: {currentPage}</div>
      <button onClick={Top}>トップ</button>
      <button onClick={Next}>次へ</button>
      <button onClick={Back}>戻る</button>
      <button onClick={Last}>ラスト</button>
      <button onClick={Reset}>リセット</button>
    </div>
  );
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)

[useLocalHistory.ts](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)[`import { useState } from "react";

export const useLocalHistory = (
  topPage: number,
  lastPage: number
): [number, () => void, () => void, () => void, () => void, () => void] => {
  const initHistory: number[] = [topPage];
  const [history, setHistory] = useState<number[]>(initHistory);

  const currentPage = history[history.length - 1];

  const Top = (): void => {
    // 現在トップページの場合は移動しない
    if (currentPage === topPage) {
      return;
    }
    const nextHistory = [...history, topPage];
    setHistory(nextHistory);
  };

  const Next = (): void => {
    const nextPage = currentPage + 1;

    // ラストページより先には進めない
    if (lastPage < nextPage) {
      return;
    }
    const nextHistory = [...history, nextPage];
    setHistory(nextHistory);
  };

  const Back = (): void => {
    // トップページより前には戻れない
    if (history.length <= 1) {
      return;
    }
    const nextHistory = [...history.slice(0, history.length - 1)];
    setHistory(nextHistory);
  };

  const Last = (): void => {
    // 現在がラストページの場合は移動しない
    if (currentPage === lastPage) {
      return;
    }
    const nextHistory = [...history, lastPage];
    setHistory(nextHistory);
  };

  const Reset = (): void => {
    setHistory(initHistory);
  };

  return [currentPage, Top, Next, Back, Last, Reset];
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v2-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF)

[https://codesandbox.io/s/custom-hook-v2-phjz4](https://codesandbox.io/s/custom-hook-v2-phjz4)

PageコンポーネントはViewに関連する実装が中心となり、とても読みやすくなりました。

### [**v3 インターフェースの定義**](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)

[履歴機能を提供する ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[`LocalHistory`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[ インターフェースを ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[`useLocalHistory.ts`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[ に定義します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[
Pageコンポーネントは](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[`LocalHistory`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[ インターフェースを介して操作をします。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)

[Page.tsx](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[`import React from "react";
import { useLocalHistory } from "../../utils/useLocalHistory";

export const Page: React.FC = () => {
  const topPage = 1;
  const lastPage = 4;

  const [currentPage, history] = useLocalHistory(topPage, lastPage);

  return (
    <div>
      <div>現在のページ: {currentPage}</div>
      <button onClick={history.Top}>トップ</button>
      <button onClick={history.Next}>次へ</button>
      <button onClick={history.Back}>戻る</button>
      <button onClick={history.Last}>ラスト</button>
      <button onClick={history.Reset}>リセット</button>
    </div>
  );
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)

[useLocalHistory.ts](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)[`import { useState } from "react";

interface LocalHistory {
  Top: () => void;
  Next: () => void;
  Back: () => void;
  Last: () => void;
  Reset: () => void;
}

export const useLocalHistory = (
  topPage: number,
  lastPage: number
): [number, LocalHistory] => {
  const initHistory: number[] = [topPage];
  const [history, setHistory] = useState<number[]>(initHistory);

  const currentPage = history[history.length - 1];

  const Top = (): void => {
    // 現在トップページの場合は移動しない
    if (currentPage === topPage) {
      return;
    }
    const nextHistory = [...history, topPage];
    setHistory(nextHistory);
  };

  const Next = (): void => {
    const nextPage = currentPage + 1;

    // ラストページより先には進めない
    if (lastPage < nextPage) {
      return;
    }
    const nextHistory = [...history, nextPage];
    setHistory(nextHistory);
  };

  const Back = (): void => {
    // トップページより前には戻れない
    if (history.length <= 1) {
      return;
    }
    const nextHistory = [...history.slice(0, history.length - 1)];
    setHistory(nextHistory);
  };

  const Last = (): void => {
    // 現在がラストページの場合は移動しない
    if (currentPage === lastPage) {
      return;
    }
    const nextHistory = [...history, lastPage];
    setHistory(nextHistory);
  };

  const Reset = (): void => {
    setHistory(initHistory);
  };

  return [currentPage, { Top, Next, Back, Last, Reset }];
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v3-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%AE%9A%E7%BE%A9)

[https://codesandbox.io/s/custom-hook-v3-cb016](https://codesandbox.io/s/custom-hook-v3-cb016)

LocalHistoryインターフェースを定義することで、一連の操作の関連が明確になりました。
また一連の操作を他のコンポーネントに渡すことが容易になりました。

### [**v4 データ構造を独立したカスタムフックに分離**](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)

[LocalHistoryはStack(LIFO)のデータ構造で実現されています。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[
これをuseStackカスタムフックとして切り出します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[
カスタムフックは多段構成が可能なため、useLocalHistoryから切り出したuseStackを実行します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[Pageコンポーネントは変わらないため省略します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)

[useLocalHistory.ts](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[`import { useStack } from "./useStack";

export interface LocalHistory {
  Top: () => void;
  Next: () => void;
  Back: () => void;
  Last: () => void;
  Reset: () => void;
}

export const useLocalHistory = (
  topPage: number,
  lastPage: number
): [number, LocalHistory] => {
  const initHistory: number[] = [topPage];
  const [currentPage, stack] = useStack<number>(initHistory);

  const Top = (): void => {
    // 現在トップページの場合は移動しない
    if (currentPage === topPage) {
      return;
    }
    stack.Push(topPage);
  };

  const Next = (): void => {
    const nextPage = currentPage + 1;

    // ラストページより先には進めない
    if (lastPage < nextPage) {
      return;
    }
    stack.Push(nextPage);
  };

  const Back = (): void => {
    // トップページより前には戻れない
    if (stack.Length() <= 1) {
      return;
    }
    stack.Pop();
  };

  const Last = (): void => {
    // 現在がラストページの場合は移動しない
    if (currentPage === lastPage) {
      return;
    }
    stack.Push(lastPage);
  };

  const Reset = (): void => {
    stack.Reset();
  };

  return [currentPage, { Top, Next, Back, Last, Reset }];
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)

[useStack.ts](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)[`import { useState } from "react";

export interface Stack<T> {
  Pop: () => void;
  Push: (v: T) => void;
  Reset: () => void;
  Length: () => number;
}

// Stackのデータ構造をカスタムフックとして定義する
export const useStack = <T>(init?: T[]): [T, Stack<T>] => {
  const initStack: T[] = init ?? [];
  const [stack, setStack] = useState<T[]>(initStack);

  const Pop = (): void => {
    if (stack.length === 0) {
      return;
    }

    const newStack = [...stack.slice(0, stack.length - 1)];
    setStack(newStack);
  };

  const Push = (v: T): void => {
    const newStack = [...stack, v];
    setStack(newStack);
  };

  const Reset = (): void => {
    setStack(initStack);
  };

  const Length = (): number => stack.length;

  return [stack[stack.length - 1], { Pop, Push, Reset, Length }];
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v4-%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0%E3%82%92%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9F%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%AB%E5%88%86%E9%9B%A2)

[https://codesandbox.io/s/custom-hook-v4-mn2ub](https://codesandbox.io/s/custom-hook-v4-mn2ub)

これによりuseLocalHistoryがStackの実装詳細を意識せず、画面遷移の制御だけをロジックとして持つようになりました。

また詳しくは説明しませんが、setStateには以前の状態を受け取り更新する方法もあります。[https://codesandbox.io/s/custom-hook-v41-hokuq](https://codesandbox.io/s/custom-hook-v41-hokuq)

### [**v5 useStateの代わりにuseReducerを利用する**](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[v4の ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`useStack`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[ では、配列に追加や削除をするために現在の状態を知っている必要があります。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[
これでも問題はないのですが、配列やオブジェクトの一部を操作する場合のように前回の状態に依存した更新処理をする場合には ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`useState`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[ の代わりに ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`useReducer`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[ を利用することで、より簡潔に記述することができるようになります。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[useStack.ts](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`import { useReducer } from "react";

type StackState<T> = T[];

type StackAction<T> =
  | { type: "ACTION_POP" }
  | { type: "ACTION_PUSH"; value: T }
  | { type: "ACTION_RESET"; initStack: T[] };

const stackReducer = <T>() => (
  stack: StackState<T>,
  action: StackAction<T>
): StackState<T> => {
  switch (action.type) {
    case "ACTION_POP":
      if (stack.length === 0) {
        return stack;
      }
      return [...stack.slice(0, stack.length - 1)];
    case "ACTION_PUSH":
      return [...stack, action.value];
    case "ACTION_RESET":
      return action.initStack;
  }
};

export interface Stack<T> {
  Pop: () => void;
  Push: (v: T) => void;
  Reset: () => void;
  Length: () => number;
}

export const useStack = <T>(init?: T[]): [T, Stack<T>] => {
  const initStack: T[] = init ?? [];
  const [stack, dispatch] = useReducer(stackReducer<T>(), initStack);

  // 前回の状態は必要なく、実行するActionとActionに必要な値だけが必要となる。
  const Pop = (): void => dispatch({ type: "ACTION_POP" });
  const Push = (value: T): void => dispatch({ type: "ACTION_PUSH", value });
  const Reset = (): void => dispatch({ type: "ACTION_RESET", initStack });
  const Length = (): number => stack.length;

  return [stack[stack.length - 1], { Pop, Push, Reset, Length }];
};
`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`useStack`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[ 関数は、v4ではstackの前の状態を利用した手続き的なコードでしたが、v5では ](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`ACTIONS_POP`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[ のように、前の状態を知らずにイベントを発火させるだけでよくなりました。またreducerも手続き的なコードを書く必要はなく、新たな状態を返すだけで目的を達成することができるようになります。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[この書き方はReduxを書いていた方は慣れ親しんでいるかと思いますが、公式ドキュメントに書いてある通り基本的にはuseStateを利用しましょう。 useReducerは複数の値が関連する複雑な状態ロジックを持つ場合や次の状態が前の状態に依存する場合にだけ利用することをお勧めします。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v5-usestate%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABusereducer%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[https://codesandbox.io/s/custom-hook-v5-38z1m](https://codesandbox.io/s/custom-hook-v5-38z1m)

### [**v6 ContainerコンポーネントとPresentationalコンポーネントの分離**](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)

[副作用を起こすレイヤーを分離します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)[
Reduxではconnectを実行するレイヤーを分離することがフレームワークで強制されていますが、これと同じ設計方針です。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)[useLocalHistoryとuseStackは同様のため省略します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)

[Page.tsx](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)[

](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)[`import React from "react";
import { LocalHistory, useLocalHistory } from "./useLocalHistory";

// Containerコンポーネント
export const PageContainer: React.FC = () => {
  const topPage = 1;
  const lastPage = 4;

  const [currentPage, history] = useLocalHistory(topPage, lastPage);
  return <Page currentPage={currentPage} history={history} />;
};

interface PageProps {
  currentPage: number;
  history: LocalHistory;
}

// Presentationalコンポーネント
const Page: React.FC<PageProps> = ({ currentPage, history }: PageProps) => {
  return (
    <div>
      <div>現在のページ: {currentPage}</div>
      <button onClick={history.Top}>トップ</button>
      <button onClick={history.Next}>次へ</button>
      <button onClick={history.Back}>戻る</button>
      <button onClick={history.Last}>ラスト</button>
      <button onClick={history.Reset}>リセット</button>
    </div>
  );
};`](https://qiita.com/sonatard/items/617f324228f75b9c802f#v6-container%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8presentational%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%88%86%E9%9B%A2)

[https://codesandbox.io/s/custom-hook-v6-yqrx4](https://codesandbox.io/s/custom-hook-v6-yqrx4)

これによりPageコンポーネントは引数を受けて返り値を返すという純粋な関数になりました。
Viewが純粋な関数になるというのは昔のGUI開発では考えられない素晴らしいことです。

ただしこちらも必ず採用する必要があるわけではありません。適宜判断して採用を決めてください。

## [**まとめ**](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)

[v1からv6にかけて以下のように改善されました。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[コンポーネントからロジックが分離 (Presentation Domain Separation)](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[一般的なデータ構造をロジックから分離 委譲(delegation)](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[history履歴がPageコンポーネントには渡らない 情報隠蔽(カプセル化)](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[インターフェースの定義 開放閉鎖原則(OCP)](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[Pageコンポーネントの関数化 副作用を内部で取得せず引数として受け取る](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[各モジュールの設計意図が明確化 単一責任の原則(SRP)](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[これらによりViewとロジックが分離し、再利用性、可読性、テスタビリティが向上します。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[このようにReact Hooksのカスタムフックの登場により、状態と実装の詳細をカプセル化することができ、コンポーネントに必要な値とインターフェースだけを公開することが可能となります。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[PDS、委譲、カプセル化、SOLID原則(OCP, SRP)などのとおり、](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[**今まで培われてきたオブジェクト指向設計と何も変わらない普遍的な設計能力が必要とされます。**](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[ React Hooks特有の設計能力が求められるものではありません。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[実際にカスタムフックとクラスを以下のように比較してみると、同様であることが理解できると思います。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[クラス

](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
    ◦ ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[状態 :メンバフィールド](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
    ◦ ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[操作: メソッド](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
    ◦ ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[初期化: コンストラクタ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[カスタムフック

](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
    ◦ ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[状態: useState](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
    ◦ ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[操作: 関数](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
    ◦ ](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[初期化: フックの引数](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)[実装されたコードを比較してみても基本的な表現に大きな違いはありません。](https://qiita.com/sonatard/items/617f324228f75b9c802f#%E3%81%BE%E3%81%A8%E3%82%81)

## [**React Hooksが実現する世界**](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)

[今まではReactのロジックがReactコンポーネントのライフサイクルに依存し、ロジック単独でのモジュール化が難しく再利用性が低い問題がありました。しかしReact Hooksの登場で改善されます。](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[そのため今回開発したuseStackやuseLocalHistoryはViewに依存していないため、みなさんのユースケースにあわせて利用することが可能です。](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[このように ](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[**ReactのロジックをOSSとして気軽に共有できる世界になりました。**](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[
](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[これがコードを綺麗に設計できるようになったこと以上の](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[**最大のメリット**](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)[です。](https://qiita.com/sonatard/items/617f324228f75b9c802f#react-hooks%E3%81%8C%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E4%B8%96%E7%95%8C)

## [**OSS**](https://qiita.com/sonatard/items/617f324228f75b9c802f#oss)

[これからは状態に基づく処理を自分で書く前にOSSのReact Hooksを調べてみることをお勧めします。](https://qiita.com/sonatard/items/617f324228f75b9c802f#oss)[
恐らく自分が思いついた実装よりもOSSとして洗練された良い実装が見つかるはずです。](https://qiita.com/sonatard/items/617f324228f75b9c802f#oss)[
また自分で実装する場合にもとても参考になります。](https://qiita.com/sonatard/items/617f324228f75b9c802f#oss)

- [https://github.com/streamich/react-use/](https://github.com/streamich/react-use/)
- [https://nikgraf.github.io/react-hooks/](https://nikgraf.github.io/react-hooks/)
- [https://usehooks.com/](https://usehooks.com/)

[**編集リクエスト**](https://qiita.com/drafts/617f324228f75b9c802f/edit)

[**348**](https://qiita.com/sonatard/items/617f324228f75b9c802f/likers)





[**そな太**](https://qiita.com/sonatard)[**@sonatard**](https://qiita.com/sonatard)

組み込みC言語ネットワークスタック開発者からGoバックエンドエンジニアにジョブチェンジしました。
最近はTypeScript, React(Hooks), GraphQL, SwiftUIに夢中。

[https://github.com/sonatard/](https://github.com/sonatard/)

**ユーザー登録して、Qiitaをもっと便利に使ってみませんか。****
1. ****あなたにマッチした記事をお届けします****ユーザーやタグをフォローすることで、あなたが興味を持つ技術分野の情報をまとめてキャッチアップできます****便利な情報をあとで効率的に読み返せます****気に入った記事を「ストック」することで、あとからすぐに検索できます**[****](https://help.qiita.com/ja/articles/qiita-login-user)[**より詳しく**](https://help.qiita.com/ja/articles/qiita-login-user)[登録する](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fsonatard%2Fitems%2F617f324228f75b9c802f&realm=qiita)[ログインする](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fsonatard%2Fitems%2F617f324228f75b9c802f&realm=qiita)

[**コミュファ光**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=JZFqH_4o-6J8_x2AzFoqT_Sik4v19HJP8_WGlwBJvInyTT7v-K5Vd87IxSrmOKmMl420A4A9v2jwNVBqxyz9T3hb5DdPNuHtLSszJHWcKDk3k7PYRQ6-AnnkatQPP-eXeYYZm9LjTh1G8ZhqUvyuwHbjGcwU3PwsdcMofywvlQCQld33HsnYaWqBf6YUt2Mav4EItx16N27aajz-5nUodakKdypluyZ0OEeMNygUoz5QFH6IQIMQZ7FzCTTVThOb1xLx5NpeL8RHx29floxbNL27ZG--IJhTxn1Bwk9sWhYLtDjO-C4DXapQZKh1vaZ4S_aCf7D7l_PT67IBFH6DgHyfgz9eZuNza1iUHdORu8hz642qQOX4n8hN8CqrWsI5BDOfV8N82ClWRoPIScDQq8AhoFjpb3pQulVI-I-pU5YPmd3zq9HkSaTbXAPlNXPgyMzoH7Y4dKHYw50-A83KcwvJcJfdSN2_r7ZHizCc5VEiVTnH&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fhikari%2Fcommufa%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_ACCM%26argument%3DRQq2zPub%26dmai%3D08CMh_crto_rt_b)[東海地方にお住まいならコミュファ光…](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=JZFqH_4o-6J8_x2AzFoqT_Sik4v19HJP8_WGlwBJvInyTT7v-K5Vd87IxSrmOKmMl420A4A9v2jwNVBqxyz9T3hb5DdPNuHtLSszJHWcKDk3k7PYRQ6-AnnkatQPP-eXeYYZm9LjTh1G8ZhqUvyuwHbjGcwU3PwsdcMofywvlQCQld33HsnYaWqBf6YUt2Mav4EItx16N27aajz-5nUodakKdypluyZ0OEeMNygUoz5QFH6IQIMQZ7FzCTTVThOb1xLx5NpeL8RHx29floxbNL27ZG--IJhTxn1Bwk9sWhYLtDjO-C4DXapQZKh1vaZ4S_aCf7D7l_PT67IBFH6DgHyfgz9eZuNza1iUHdORu8hz642qQOX4n8hN8CqrWsI5BDOfV8N82ClWRoPIScDQq8AhoFjpb3pQulVI-I-pU5YPmd3zq9HkSaTbXAPlNXPgyMzoH7Y4dKHYw50-A83KcwvJcJfdSN2_r7ZHizCc5VEiVTnH&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fhikari%2Fcommufa%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_ACCM%26argument%3DRQq2zPub%26dmai%3D08CMh_crto_rt_b)[**3,880円(税抜価格)**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=JZFqH_4o-6J8_x2AzFoqT_Sik4v19HJP8_WGlwBJvInyTT7v-K5Vd87IxSrmOKmMl420A4A9v2jwNVBqxyz9T3hb5DdPNuHtLSszJHWcKDk3k7PYRQ6-AnnkatQPP-eXeYYZm9LjTh1G8ZhqUvyuwHbjGcwU3PwsdcMofywvlQCQld33HsnYaWqBf6YUt2Mav4EItx16N27aajz-5nUodakKdypluyZ0OEeMNygUoz5QFH6IQIMQZ7FzCTTVThOb1xLx5NpeL8RHx29floxbNL27ZG--IJhTxn1Bwk9sWhYLtDjO-C4DXapQZKh1vaZ4S_aCf7D7l_PT67IBFH6DgHyfgz9eZuNza1iUHdORu8hz642qQOX4n8hN8CqrWsI5BDOfV8N82ClWRoPIScDQq8AhoFjpb3pQulVI-I-pU5YPmd3zq9HkSaTbXAPlNXPgyMzoH7Y4dKHYw50-A83KcwvJcJfdSN2_r7ZHizCc5VEiVTnH&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fhikari%2Fcommufa%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_ACCM%26argument%3DRQq2zPub%26dmai%3D08CMh_crto_rt_b)

[**WiMAX 2+**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=sfY3Bv4o-6J8_x2AzFoqT_Sik4uHQ1CgEYq21jsg1IMx99Kchfa6TrnlHRqYefemwRMarPwjJtO6ns_YznczsY00lukf38z3Iu2Q0OWbJx6PiwJ-M4g3ZPxiZEhNQJR-_q57p24fWm0ZZ6_HgW_CLrHoPDlhl244NNATrt05tsyQrQ_szKEeJ2O2gHRchvYACfHnWNlb5w39QZ2so_2IBRCf8l_D_JiSxHhVuz6_kQZmVOzSWqHZwOVk3npuzv6ra6fd-K5M78p-KFpEOQiF4XN4OfeXsoH4cuk3A_v6tvmndFVAk6GoXv80fXcqjZS5ARSsewd2pbAbr2dfD1_dPqpCmXVYWrq5P9HqKZmxymTtveVvhvPZcGLuxnqZDj0qPmGaSktq1Djp6z-Vx9ciOJzVvjRnu0xpOSz5OZc2nsnbXD2sh1pdJyjyS6Ea0j5999-Zjl4mWnIN0xTgWZUy5ccRlVtmJKyPgoLLUGAga2Ooqdo4&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[ギガ放題プランも月3,380円！1年間…](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=sfY3Bv4o-6J8_x2AzFoqT_Sik4uHQ1CgEYq21jsg1IMx99Kchfa6TrnlHRqYefemwRMarPwjJtO6ns_YznczsY00lukf38z3Iu2Q0OWbJx6PiwJ-M4g3ZPxiZEhNQJR-_q57p24fWm0ZZ6_HgW_CLrHoPDlhl244NNATrt05tsyQrQ_szKEeJ2O2gHRchvYACfHnWNlb5w39QZ2so_2IBRCf8l_D_JiSxHhVuz6_kQZmVOzSWqHZwOVk3npuzv6ra6fd-K5M78p-KFpEOQiF4XN4OfeXsoH4cuk3A_v6tvmndFVAk6GoXv80fXcqjZS5ARSsewd2pbAbr2dfD1_dPqpCmXVYWrq5P9HqKZmxymTtveVvhvPZcGLuxnqZDj0qPmGaSktq1Djp6z-Vx9ciOJzVvjRnu0xpOSz5OZc2nsnbXD2sh1pdJyjyS6Ea0j5999-Zjl4mWnIN0xTgWZUy5ccRlVtmJKyPgoLLUGAga2Ooqdo4&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[**3,380円(税抜価格)**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=sfY3Bv4o-6J8_x2AzFoqT_Sik4uHQ1CgEYq21jsg1IMx99Kchfa6TrnlHRqYefemwRMarPwjJtO6ns_YznczsY00lukf38z3Iu2Q0OWbJx6PiwJ-M4g3ZPxiZEhNQJR-_q57p24fWm0ZZ6_HgW_CLrHoPDlhl244NNATrt05tsyQrQ_szKEeJ2O2gHRchvYACfHnWNlb5w39QZ2so_2IBRCf8l_D_JiSxHhVuz6_kQZmVOzSWqHZwOVk3npuzv6ra6fd-K5M78p-KFpEOQiF4XN4OfeXsoH4cuk3A_v6tvmndFVAk6GoXv80fXcqjZS5ARSsewd2pbAbr2dfD1_dPqpCmXVYWrq5P9HqKZmxymTtveVvhvPZcGLuxnqZDj0qPmGaSktq1Djp6z-Vx9ciOJzVvjRnu0xpOSz5OZc2nsnbXD2sh1pdJyjyS6Ea0j5999-Zjl4mWnIN0xTgWZUy5ccRlVtmJKyPgoLLUGAga2Ooqdo4&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)