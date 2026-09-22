---
Created: 2021-01-02T17:38:00
URL: https://moneyforward.com/engineers_blog/2020/02/18/react-component-rules/
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
こんにちは。
経費精算サービス「[マネーフォワード クラウド経費](https://biz.moneyforward.com/expense)」の開発チームでフロントエンドエンジニアをしている坂本です。

クラウド経費ではJSのライブラリとしてReactを採用しているのですが、最近クラウド経費で React Component を実装する際のルールをまとめたので、その話を書こうと思います。

## なぜルールをまとめようと思ったのか

Componentの分割ルールとしてAtomic Design、スタイルの管理としてstyled-components、GraphQL用のライブラリとしてApollo Clientを導入し実装を進めています。
昨年の10月までは挙げた３つとも使用していなかったので、試行錯誤しながら進めています。

チームメンバーの各々が試行錯誤しながら実装を進めていくので、最近はチーム内で認識の齟齬や持っている情報に差が出るようになりました。
そこで一旦現状を整理して、クラウド経費でReact Componentを実装する際の各種ルールをまとめよう、となりました。

## 出来上がったルール

まとめたルールは以下のようになりました。

```plain text
- Atomic Designを意識する
  - 各レベルのルール
  - 自分のレベル以下の要素で構成する
  - 最初から完璧に設計する必要はない
- ファイルの命名規則
- Functional Componentで実装する
- Container ComponentとPresentational Componentに分けて実装する
- Templates以下のComponentではuseQuery・useMutationを実行しない
- global state と local stateの使い分け
- スタイル管理
- その他
  - export defaultを使用しない
  - Componentを作成する際はclassNameを受け取ることが可能なようにpropsを定義する
  - Material-UIを利用する
- Componentの利用
  - RailsのViewへのReact Componentの埋め込み
  - client/Components/other/以下のComponentは原則利用しない

```

以下ではインデックスの中からいくつかをピックアップして、詳細を書いていきます。

### Functional Componentで実装する

Hooksの登場によりClass Componentでなければならないケースがほぼなくなりました。
さらに、life cycleも意識せずに済み実装もしやすくなるので Functional Componentで統一することにしました。
ただし、useMemoやrefの取り扱いが難しかったり、UIコンポーネントとしてMaterial-UIを使用しているとforwardRefでエラーが出ることもあったりと、まだ試行錯誤することもあります・・・

### Container ComponentとPresentational Componentに分けて実装する

ロジックと見た目の管理を分離するためのルールになります。
ロジックをContainer Componentに、見た目に関する部分をPresentational Componentに記述します。
見た目を変更するからといってロジックも合わせて変更するパターンは稀なので、それぞれの関心ごとにファイルを分けてしまうことで保守性を高める狙いがあります。
さらに、Container ComponentはPresentational Componentに加工したpropsを渡すだけなので、ロジックに対するテストも簡単になります。

例えば、最大文字数以上は`...`に置換して表示するComponentは以下のようになります。

```plain text
// Container.jsx

import React from "react";
import { Presenter } from "./Presenter";

const LEADER = "...";

export function Container({ length, place = "end", children: text }) {
  if (text.length < length) {
    return <Presenter>{text}</Presenter>;
  }

  let sliced = text;
  switch (place) {
    case "end": {
      sliced = text.slice(0, length) + LEADER;
      break;
    }
    case "head": {
      sliced = LEADER + text.slice(length * -1);
      break;
    }
    case "middle": {
      const halfLength = Math.floor(length / 2);
      sliced =
        text.slice(0, halfLength + (length % 2)) +
        LEADER +
        text.slice(halfLength * -1);
      break;
    }
    default: {
      sliced = text;
      break;
    }
  }

  return <Presenter>{sliced}</Presenter>;
}

```

```plain text
// Presenter.jsx

import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  color: #fff;
  font-size: 14px;
  background-color: #f00;
`;

export function Presenter({ children: text }) {
  return <StyledSpan>{text}</StyledSpan>;
}

```

簡単な例ですが、文字を置換する位置などのロジックと見た目の管理を分離することができました。

### Templates以下のComponentではuseQuery・useMutationを実行しない

要約すると、Pages ComponentからしかAPIを叩かないと言う制限です。
こうすることでTemplates Component以下はデータに依存せず実装できるので、モックデータをセットすることでテストが書きやすかったり、Storybookでの表示がしやすくなるメリットあります。

### global stateとlocal stateの使い分け

ここで言うglobal stateはReduxのStoreのことを言い、local stateはそれ以外のことを指しています。
クラウド経費はSPAではないと言うことと、ドロップダウンなどの開閉状態までReduxのStoreに入れるのは流石に面倒くさいと言うことで、クラウド経費ではglobal stateとlocal stateの２つのstateを使い分けることにしました。
ただ、実装していると「このstateはどっちだ？」ということが出てくるようになりました。
ドロップダウンの開閉状態などはlocal stateで大丈夫だろうと感覚的に判断できるのですが、フォームの入力値などになると中々判断が難しくなります。
そこで、クラウド経費では以下に該当する場合は global State とすることにしました。

- そのデータがUI上関連の無いComponent同士で参照される時
- ヘッダーとサイドメニューでユーザー情報を参照するなど
- そのデータから派生データを作成する必要がある時

もっと簡潔に「UIの状態はgloba state」としてしまってもよかったのですが、もう少し抽象度を下げて出来るだけ考えることを少なくしたいと言う個人的な思いから上記にしました。（もちろんチームに承認は頂いています）
そして理由ですが、正直なところ明確で論理的な理由というものはありません。[Redux公式が採用しているルール](https://redux.js.org/faq/organizing-state/#organizing-state)を参考に、これだけglobalにしとけば困らないだろうといった感じで作成しました。
今後実装していきながら状況を見て、微修正を細かくしていこうと思っています。

### export defaultを使用しない

これは実装者によって分かれる部分かもしれませんが、クラウド経費ではComponentのexport defaultを禁止することにしました。
理由としては単純で、名前を間違えずにimport/exportするためです。
default exportの場合はimportの際に自由に名前をつけることができるため、typoに気づけなかったり、export先の名前が統一されなかったりすることがありました。
また、IDEでのコード補完とも相性が悪く、export defaultを禁止することのメリットの方が大きいと判断しました。

```plain text
export default function DummyComponent() {

}

---

//  DumyのところをTypoしていても動作する
import DumyComponent from './DummyComponent';



```

## まとめ・今後について

以上、実装ルールのいくつかをピックアップしてみました。
作業としてはその時暗黙の了解となっていたものを整理してまとめるだけだったのですが、この実装は本当にそれでいいのか…などを考えだすと沼にはまってしまって大幅に時間がかかってしまいました・・・
また、いざ作ってはみたものの、思ったよりまとめることができなかったな〜と言うのが正直なところです。
試行錯誤しながら日々実装しているのでなかなか難しいとは思いますが、最終的にはビジネスロジック以外は何も考える必要がなくなるようにしたいと思っています。
とはいえ、整理する中で自分の中の考えなども整理することができてやってよかったと思います。
まだまだ改善の余地はあるのでこれからも引き続きアップデートを行なっていきます！

—

マネーフォワードでは、エンジニアを募集しています。
ご応募お待ちしています。

【採用サイトのご案内】
■[マネーフォワード採用サイト](https://recruit.moneyforward.com/)
■[Wantedly](https://www.wantedly.com/companies/moneyforward)

【プロダクトのご紹介】
■[お金の見える化サービス　『マネーフォワード ME』](https://moneyforward.com/)　[iPhone,iPad](https://itunes.apple.com/jp/app/id594145971)　[Android](https://play.google.com/store/apps/details?id=com.moneyforward.android.app)

![](https://b.hatena.ne.jp/images/entry-button/button-only@2x.png)

[Pocket](https://getpocket.com/save)