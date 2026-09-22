---
URL: https://qiita.com/naohikowatanabe/items/3f067763ce3b7a3a983f
Updated: 2021-01-03T02:18:00
Created: 2021-01-03T01:27:00
Tags: [topic/技術/React]
---
### はじめに

[ACCESS Advent Calendar 2018](https://qiita.com/advent-calendar/2018/access) の23日目です。[18日目](https://qiita.com/naohikowatanabe/items/97cb57333f4e32e2d46b)ぶり [@naohikowatanabe](https://qiita.com/naohikowatanabe) です。無事いきなりステーキゴールドカードになりました。

注
※社内勉強会の内容転記です。
※もちろんお客さんの情報部分は削除しています。

### React 未経験から運良く3案件連続で React に触れたので React 初心者あるある2018言いたい

2018/07/24 渡邉直彦

### 動機

- React 初めて触って結構悩んだので、次初めて触る人が少しでも楽になれば。。！
- 勉強時間は減らせないだろうけど悩む時間は減らしたい
- React 上級者の方へは
- 「最近の初心者はこの辺で悩んでいるのか」と感じていただければ。。
- 正確性より分かりやすさ重視にしたので温かい目で見て頂ければ幸いです

### 復習：React って何だっけ？

- Facebook 謹製 UI ライブラリ [https://reactjs.org/](https://reactjs.org/)
- JSX という「HTML と JS が悪魔合体」したスタイルらしい

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2Ff1f2e657-52a3-a57f-3d24-72a9d99880a4.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=debeae9df5dc75491dc946014e25119e)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2Fae66b765-5a6a-503b-3b7c-b19990ab2077.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=171d72719340efa4c74b4228e88f05ee)

### 初心者あるある1：どう始めたらいいかわからない

- create-react-appで始めるのが楽
- React 公式も勧めてる
- 利点: コマンド一発で環境構築
- 慣れたら babel + webpack
- babel: ES2015(6)やJSXをES5へトランスパイラ
- webpack: 開発時の JS を1つにまとめる

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2F7cf39cc2-6944-b874-30da-b95261b82b18.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=2be9bc515989f60c4da868a12fc0a246)

### create-react-app

`$ npm install create-react-app
$ mkdir sample
$ cd sample
$ create-react-app hello-react
$ cd hello-react
$ npm start`

`// メインの JS ファイル

$ cat src/App.js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
$`

### 案件1: AAAプロジェクト 2018/1~3

略

### あるある2：概念が多くて理解するのが大変

- 概念少しかい摘むのとサンプル書くのを繰り返した方が理解が進む
- component?
- ≒ HTML のタグ。div とかとか
- state? props?
- state = component 内での状態。変更可
- props = 親から子への渡す状態のデータ。子では不変
- container と component?
- container: ロジックを記述
- component: 見た目を記述

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2F62b8db64-1463-dc59-3eb0-640ece2b095d.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=f6ac389ec83f7e3582b8e37ee35dc6d0)

### 案件2: XXXXプロジェクト 2018/4~5

略

### あるある3：web に(古い)情報多過ぎ

- 問題：進化が早い故に軽くググっても古い情報が多い
- 「書き方が違う」
- 「あれ、警告出る。。」
- →公式か「React verXX の変更点」とバージョンを明記してまとめてる人の情報が頼りになる

### 案件3: XXXXプロジェクト 2018/6

略

### あるある4: 子から親、親から子の関数を呼びたい

- → 関数自体を props として持ち回る
- 参考
- コンポーネント間で情報の受け渡し – React入門
- props を親から子へ　例→
- props を子から親へ
- 関数を親から子へ
- 関数を子から親へ

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2F62cdb454-1467-d081-3ba5-9141ae4b389b.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6b300b5a25e53d18776e9bbbad9c58e6)

### あるある5: props の管理がめんどくさくなってくる

- → Redux(状態管理ライブラリ)を導入して管理する場所を一か所に
- Redux: Action, ActionCreator, Store, Reducer
- Redux サンプルのお勧め。2回写経すれば大丈夫
- 電卓アプリで学ぶReact/Redux入門(基礎知識編)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2F2dded759-b54d-7639-4d3d-19dba9e96bac.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e4ac30a7567a589f748e389d7e5ef190)

### あるある6: window.onload的な読込完了時の処理は?

- →それ用の関数があるのでその中に書く
- componentDidMount() : マウント時(≒window.onload)
- componentDidUpdate() : 更新時
- componentWillUnmount() : アンマウント時

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2F22040bec-0885-0d84-2e4e-afe366bf8627.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=c3e1e9febc57a88c28295957593ec0c2)

### 腕試し

- 一日で何かアプリ作ってみたい
- 作るもの
- 毎年やってる同期BBQの開催場所を決めるツールを作りたい
- 各自の最寄駅から公平な(等距離な)開催場所を決める
- みんな少しずつ引越すので毎年中心が分からなくなる。。
- 一日と言いつつ結果的には準備2.5日+実装0.5日の計土日3人日。。
- 準備
- google map api key : 2018/6 より多少変更(要クレジットカード登録(月200ドル分は無料))
- React 用 google map library 選定 : 種類多くて悩む。。
- React & github pages の設定方法
![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2F9fe87086-f2f9-60e2-6da5-c4f6a2ae1eb5.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=90611fb89b5f890289a979a49ab4fff4)

### 作ったアプリ デモ

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2Fc2a99286-5bea-2180-d315-7656f51a71af.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=f26b9ec82b2247974756e13d1bbd8a39)

### 今年のBBQ結果

- 江東区木場駅の木場公園まじでおすすめ(初使用)
- 利点
- 都心、駅近、スーパー近、区画広い、無料
- 欠点
- 競争率が高い
- 予約サイト募集開始30分で埋まる(8時開始、8時半には埋まってた)。。
- 今年はXX君と寝ぼけ眼でF5アタック頑張ったので、次回は自動化したい。。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2Fea374f00-59ae-617a-ba66-e994f5d55382.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=26a6e5f55aa746783982fed087c7e310)

### まとめ

- React 3案件やって得られた悩みポイントまとめました
- 初めて触れるときは create-react-app が楽
- 概念多くて大変だけど、少し読んでサンプル書いて、を繰り返すのが理解が早い
- Web に古い情報多いので、公式か「React verXX まとめ」のサイトを見るのが良い
- ここ10年ちょいちょい基本ブラウザ組込周りやってきましたけど、実機いじりから Web フロントエンドまでやれる会社ってそうないと思うので弊社の良さを実感（優等生的コメント）
- 実装したらすぐ結果が分かるフロントエンド楽しい！ React 楽しい！（正直感想）

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35514%2F1d8626d0-5aaa-f429-dc51-9c4d4e6fd85e.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=8af39aca3dfd9f0d7334b82ec76ccb85)

### おわりに

明日の担当は [@rheza_h](https://qiita.com/rheza_h) です。お楽しみに！🎉