---
Updated: 2021-01-03T02:18:00
URL: https://recruit-tech.co.jp/blog/2018/09/19/react_spa_performance_tuning/
Created: 2021-01-03T01:30:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12182734/thumbnail.png)

こんにちは.エンジニアリングマネージャーの五味です.
今回から 11 月末まで,18入社新人のうち9名によるブログリレーを開催します.[配属前研修](https://recruit-tech.co.jp/blog/2018/07/23/rtech_bootcamp_2018/) ) を終えた彼らは、それぞれのスペシャリティが最も活かせるであろうグループに配属されました.
当社の若手エンジニアがどのような仕事に取り組み,何を感じ,何をしているのか.本連載では,その一端を紹介していきたいと思います.
SPA 開発,セキュリティ診断,プロダクト開発におけるプロセス運用・機能改善事例などを予定していますので,どうぞ楽しみにしていてください.
初回はフロントエンドエンジニア `辻 健人` からのエントリーです.

## はじめに

はじめまして！リクルートテクノロジーズに4月に新卒入社した 辻 健人です！GitHubでは[maxmellon](https://github.com/MaxMEllon)で活動しています．

今回は，私が担当しているAirシフトというシフト管理サービスで実施した内容を紹介します．

本記事では，Reactにおける再レンダリングのメカニズムを基本的な部分から扱い， SPAにおける再レンダリングの最適化での着眼点や改善方法を紹介します．

### Airシフトとは

[Airシフト](https://airregi.jp/shift/)は，シフト表の作成はもちろん，スタッフとのやりとりや細かな調整業務もラクになるシフト管理サービスです．

直感的に操作できるシンプルな画面で，簡単にシフト作成が行えます．シフト表と一体となったチャットを使ってスタッフとやりとりができるので，シフトの作成はもちろん，急な調整や連絡ができます．

技術スタックとしては，React/Redux，チャット機能にWebSocket， SSRやユーザ認証，ファイルダウンロードにBFFアーキテクチャを採用しています．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12182557/airshift.gif)

### 背景

Airシフトのユーザを訪問する機会があり，ヒアリングを行った結果，Airシフトの動作が重いという声があがりました． シフト表の表示期間を切り替えると，次の画面が表示されるまでに数十秒かかっているようでした． ユーザの利用環境は必ずしもハイスペックなPCというわけではないため，より多くの環境で快適に利用してもらえるよう，パフォーマンス改善を実施することにしました．

それにあたって調査した技術や，実際にプロダクトに導入した技術を紹介します．

### 課題

今回，Reactのパフォーマンスについて触れるのは，Airシフトにおいてパフォーマンスの課題があったからです． どのような課題かというと，たくさん使ってくれているユーザーほど重くなり，結果として遷移に数十秒かかっているという課題がありました． 特に，今回ヒアリングに行った店舗では，マシンリソースが潤沢ではない環境で操作後に待つ時間非常にが長くなってしまっていました．

実際にどれぐらい遅いのかを，低スペックなPCをエミュレートして計測してみました．

- 計測環境

### MacBook Pro (13-inch, 2017)

項目
詳細




OS
macOS High Sierra


CPU
3.1GHz Intel Core i5


メモリ
16GB 2133 MHz LPDDR3


グラフィクス
Intel Iris Plus Graphics 650 1536MB


ブラウザ
Google Chrome 68.0.3440 (64bit)


追加条件

**CPU x4 Slow Down**

(スペックの低いPCで遅い問題を再現するため)


データ数
15人 2グループ 150シフト/月 (現実的なデータ数)

今回，ヒアリングでスペックの低いPCで著しくこの問題が顕著に現れたので，その環境を再現するために， Google Developer Tools の機能で，**CPUの性能を4倍低速**にします．

厳密な再現にはなりませんが，低スペック時にどう動いているかを気軽に再現できるので，今回はこの機能を使いました．

### 計測結果

- 計測対象の操作

**週から月へ変更するという操作**

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184314/perf-operation1.gif)

- 合計レンダリング時間

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12182852/perf-prod-580x259.png)

- APIリクエスト/レスポンス時間

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12182928/api-580x243.png)

APIも900msecとそれなりに時間がかかっていますが，それ以上にScripting (JavaScript を実行している時間) に時間がかかってしまっていることがわかります．その時間合計するとなんと 15secにもなります．

これを解決するにあたって使った手法や解決策を紹介します．

## 仕組みの理解

### マウントと再レンダリング

まず，調査や改善を行う前に，React とはどういう仕組みで動いているかを理解することが重要です． なので，Reactのライフサイクルやレンダリング周辺の処理について着目します．

ReactにおけるComponent が レンダリング する場面は，2つあります． それぞれ，マウントと再レンダリングです．

違いとしては，マウントでは，フルにDOMを生成し，親要素にマウントするのに対して， 再レンダリングでは差分を計測し，再レンダリングの必要があるものに対して，最小限の更新を行います．

### Tips:

> マウントは，公式ドキュメントでは Mounting や Mount と表記されています
再レンダリングのことは Updating や Update と表記されています

### マウント時のライフサイクル

マウント時には，Component に実装された次の関数が順に実行されます．

- [constructor()](https://reactjs.org/docs/react-component.html#constructor)
- [static getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [render()](https://reactjs.org/docs/react-component.html#render)
- [componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)

### 再レンダリング時のライフサイクル

再レンダリング時には，Component に実装された次の関数が順に実行されます．

- [static getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [shouldComponentUpdate()](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
- [render()](https://reactjs.org/docs/react-component.html#render)
- [getSnapshotBeforeUpdate()](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
- [componentDidUpdate()](https://reactjs.org/docs/react-component.html#componentdidmount)

ここで，重要になるのが， **shouldComponentUpdate** です．

**shouldComponentUpdate** 関数は，prevProps, prevState を受け取り，現在の props, state を比較して更新する必要があるかどうかを判定し，その結果をbooleanで返す関数です． 更新の必要がありとした場合は， `true` を返します． デフォルトでは，常に `true`  です． つまり，propsのインスタンス，stateのインスタンスが変化したとき，その中身の値が全く同じでも再レンダリングされてしまいます．

再レンダリングをチューニングする際には，**shouldComponentUpdate** に着目する必要があります．

### React における List と key

リストにおいては，気をつけておくことがライフサイクルに加えてもう一つあります． それは[key](https://reactjs.org/docs/lists-and-keys.html) です． keyは，繰り返しの要素において同じ要素かどうかを判定し，要素を増減させるための識別子です．

適切なkeyとそうでないkeyで何が変わるかを具体的に見ていきましょう．

次のようなアイテムコンポーネントをリストで表示するとします

1

2

3

4

5

6

7

8

9

10

type ItemType = {

id: string,

content: string,

}

function Item({ item }: { item: ItemType }) {

return (

<li>{item.content}</li>

)

}

次のように2つのkeyの付け方で実装したとします

- 悪いkeyの付け方

1

2

3

4

5

6

7

8

9

10

function List({ items }: { items: Array<ItemType> }) {

return (

<div>

<h1>不適切なkey</h1>

<ul>

{items.map((item) => <Item key={Math.random() + ''} item={item} />)}

</ul>

</div>

)

}

- 良いkeyの付け方

1

2

3

4

5

6

7

8

9

10

function List({ items }: { items: Array<ItemType> }) {

return (

<div style={{ display: 'inline-block', width: '25vw' }}>

<h1>適切なkey</h1>

<ul>

{items.map((item) => <Item key={item.id} item={item} />)}

</ul>

</div>

)

}

これらをレンダリングすると次のようになります．(propsの変化がわかりやすいように1秒ごとにitemsを追加します)

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184413/mount.gif)

緑色に光っている箇所が新しいDOMが生成されている箇所になります．データとkeyが対応していない場合，常にマウントが発生しています． 加えて，再レンダリングではなく，マウントになってしまうので，shouldComponentUpdateによる制御もできません． 非常にコストが高くなってしまいます．

一般的に，APIがDBの内容をjsonで返したものを描画するとき，そのデータの主キーや代用キーをReact の key にすると良いでしょう．

### keyを指定しなかったときどうなるか

keyが存在するかどうか，あるいはuniqueであるかどうかのvalidationは開発環境でのみReact側がしてくれます．

- [ReactChildFiber.js#L69-L99](https://github.com/facebook/react/blob/340bfd9393e8173adca5380e6587e1ea1a23cefa/packages/react-reconciler/src/ReactChildFiber.js#L69-L99)
- [ReactChildFiber.js#L692-L732](https://github.com/facebook/react/blob/340bfd9393e8173adca5380e6587e1ea1a23cefa/packages/react-reconciler/src/ReactChildFiber.js#L692-L732)

そして，keyが存在しなかったときは，配列のindexがkeyとして自動的に使われます． しかし，indexをkeyとする場合でも，`map((item, key) => <Component key={key} />)` のように，きちんと明記しましょう．

- [ReactChildFiber.js#L862-L882](https://github.com/facebook/react/blob/340bfd9393e8173adca5380e6587e1ea1a23cefa/packages/react-reconciler/src/ReactChildFiber.js#L862-L882)

### Listにおける再レンダリング

データによって一意に定まるkeyを設定することで，マウントを制御できることをここまでで見てきました． ただ，Listでは更に罠があります．特にデータ数が多いものや更新の頻度が高いものは注意が必要です．

少し前に触れましたが，**shouldComponentUpdateは常にtrueを返す** ということを意識しなければなりません． 特にshouldComponentUpdateを気をつけずにリストを描画すると次のようになります．

keyによって，マウント/再レンダリングを制御できることがわかりました．不要なマウントを再レンダリングにし，ある程度改善ができたと思います． ただ，ここで気をつけなければいけないのが，**shouldComponentUpdateを実装していない場合，defaultで常にtrueを返す** という点です． デモでみていきましょう．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184446/no-pure.gif)

水色の四角は，再レンダリングが発生している箇所です． shouldComponentUpdateがtrueを返しているので，無駄に再レンダリングしてしまっていることがわかると思います．

実際のコードを見てどう対策するのかを見てみましょう． リストの実装は先程と基本的に同じです．

1

2

3

4

5

6

7

function List({ items }: { items: Array<ItemType> }) {

return (

<ul>

{items.map((item) => <Item key={Math.random() + ''} item={item} />)}

</ul>

)

}

1

2

3

4

5

6

7

8

9

10

11

import { Component } from 'react'

class Item extends Component<ItemType> {

render() {

const { item } = this.props

return (

<li>{item.content}</li>

)

}

}

このような，ListとItemの関係において，差分レンダリングを制御するにあたり，Itemに着目します． 汎用的な，shouldComponentUpdate の実装として，PureComponent というものがあります．

PureComponentが具体的にしていることは，propsに対してshallowCompareして差分を見ています．このとき注意なのがshallow なので， 任意の `props[key]` が object だった場合そのObjectの中身の値が同じかどうかではなく， **同じインスタンスであるかどうか** (通常のstrict equalと同じ挙動)を見ます．

なので，たとえObjectが全て同じ値でも，[Rest parameters](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions_and_function_scope/rest_parameters) や [Object.assign](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) などで コピーしていると異なるインスタンス扱いになってしまうということに気をつける必要があります．

ちなみに，shallowCompare の具体的な実装は，[fbjs/shallowEqual](https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/shallowEqual.js) です．

1

2

3

4

5

6

7

8

9

10

11

import { PureComponent } from 'react'

class PureItem extends PureComponent<ItemType> {

render() {

const { item } = this.props

return (

<li>{item.content}</li>

)

}

}

これを実際にレンダリングするとどうなるか見てみましょう．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184514/pure.gif)

実際に差分レンダリングがされている箇所を見てみると，stateが書き換わっているListのみ再レンダリングされ， 各Itemは再レンダリングされていないことがわかります．

ここでは `PureComponent` を用いた例を紹介しましたが， Stateles Functional Component を用いている場合は[`recompose/pure`](https://github.com/acdlite/recompose/blob/master/src/packages/recompose/pure.js) というものがあります． もし，Functional Component を軸に開発を進めるのであれば，PureComponent を継承する代わりに recompose/pure を利用することで同じ効果が得られます．

1

2

3

4

5

6

7

8

9

import { pure } from 'recompose'

function Item({ item }: { item: ItemType }) {

return (

<li>{item}</li>

)

}

const PureItem = pure(Item)

## ボトルネックを調査・計測

## chrome developer tools

Reactのversion 16から，[react-addons-perf](https://reactjs.org/docs/perf.html) のサポートがなくなりました． その代わりに，Chrome の devtools を使って計測する方法を紹介していきます．

### パフォーマンストレースを閲覧する

Chrome の機能を用いて React のアプリケーションのパフォーマンストレースを見られます． React内部でUserTiming API を利用して，それぞれの処理時間を見ることができます． (Reactの内部処理時間は開発環境のみ閲覧可能)

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184748/devtools-perf-580x114.png)

赤枠のボタン押下することで，任意の操作のパフォーマンスツリーを見ることができます． 青枠のボタンは，フルリロードからDOMContentLoaded をハンドルして実行されたscriptingが終わるまでのパフォーマンスツリーを見ることができます．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184826/pref-tree-504x500.png)

① の縦の領域で調べたい範囲のスコープを絞ることができます．また，その範囲において実際に掛かった時間を下部(②)で見ることができます．

また，バックエンドかフロントエンドどちらがボトルネックになっているかを調べるときは，`▶ Network` をクリックすると， わかりやすいです．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184902/network-580x282.png)

> ネットワークの所要した時間とscriptingによって処理している時間を並べてみることができます

`▶ User Timing` をクリックすると，各コンポーネントのレンダリング及び，再レンダリングににどれだけ時間がかかったかの内訳を見ることができます

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184936/user-timing-580x495.png)

> 各ブロックにカーソルを合わせることで具体的な所要時間がわかります

### 関数レベルで遅いものを見つける

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12184959/func-tree-580x339.png)

- ① : 閲覧したいトップレベルの関数を選択します
- ② : Bottom-Up をクリックします
- ③ : Total Time でソートします
- ④ : 遅い関数のツリーを展開します
- ⑤ : `gridDataGenerator.js` をクリック, すると行数レベルの実行時間を閲覧することができます (sourcemapが必要)

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12185021/source-map-580x305.png)

> この例だと，convertArrangingShift() や shifts.reduce() が他と比べると遅いということがわかります

## React Developer Tools

Chromeの拡張で [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) というものがあります．

これを使って再レンダリングの頻度が高い箇所を見つけることができます．

### 再レンダリングの頻度を見る

(記事中で `React における List と key` のデモで利用した機能の紹介です)

事前に[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) がインストールされていなければをインストールします

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12185039/react-devtools-580x319.png)

- ① : Chrome Devloper Tools から React を選びます
- ② : 歯車 (⚙ ) のマークをクリックします
- ③ : Highlight Update にチェックを入れます

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12185104/highlight-update.gif)

差分レンダリングが発生していないとき何も起きません． 差分レンダリングの頻度が低いと寒色（青），高いと暖色（赤）の枠線が表示されます．

注意としては，**差分レンダリングしか** ハイライトされないので，マウントは検出することができません．

## why-did-you-update

不要な再レンダリングが行われているかどうかを判定するためのライブラリとして，[why-did-you-update](https://github.com/maicki/why-did-you-update) というものがあります． これは，Reactのlifecycleである，componentDidUpdate にモンキーパッチを当てて([index.js#L31](https://github.com/maicki/why-did-you-update/blob/master/src/index.js#L31))，具体的には，prevProps, prevState と 現在のprops, state を [deepCompare](https://github.com/maicki/why-did-you-update/blob/master/src/deepDiff.js#L26) して，それぞれの要素が同じとき，updateが不要であるということを，ログ出力して教えてくれます．

具体的に，どういうケースを発見できるかというと，値は全く同じだけど，異なるObjectのinstanceを抱えているときです． setState  などで `{ ...state }` しているときに，不要なコピーが走っているケースです． あとは，初期状態では `shouldComponentUpdate` は常にtrueを返すので，propsに同じ値が来たとしても， createElementによって呼び出されると，差分更新が必要と判定され`componentDidUpdate` が呼び出されます．

特に，ログ件数が多いコンポーネントは，たくさん差分レンダリングしていることになるので， `shouldComponentUpdate` を実装するべきと考えることができます． 一般的に，[React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) や [recompose/pure](https://github.com/acdlite/recompose/blob/master/docs/API.md#pure) を使うのが良いでしょう．

実際に，why-did-you-update で不要なupdateを検出してみましょう． 検出するための方法はシンプルで，まず，npm or yarn お好みのもので why-did-you-update をインストールしましょう

1

$ npm install why-did-you-update

次に，`import React from 'react'` している任意のファイルで，

1

2

3

4

import React from 'react'

import { whyDidYouUpdate } from 'why-did-you-update'

whyDidYouUpdate(React)

とします．（このとき，shouldComponentUpdate が全て上書きされることに気をつけましょう） そして，いつもどおり起動し，ブラウザで実行すると，次のような出力が得られます．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12185345/why-did-you-update-580x169.png)

上の画像の例では，items の中身が全て同じなのに，配列のインスタンスが異なっているため， 再レンダリングが無駄に行われていることや，shouldComponentUpdate が 常に true を返していることが推測できます． 前者であれば，少し工夫してshouldComponentUpdateを実装する必要があります． 後者の場合は，React.PureComponent や recompose/pure を利用すればよいです．

出力方法であったり，検出したいコンポーネントを指定するには `whyDidYouUpdate()` の第二引数で指定可能です． 例えば，`Hoge` というコンポーネントだけを対象としたいときは

1

whyDidYouUpdate(React, { include: [/^Hoge$/] });

とします． 詳細のオプションの指定は，[document](https://github.com/maicki/why-did-you-update#options) を参照してください．

## Airシフトでの改善施策

### コンポーネント設計を見直す

現状のシフト表のコンポーネント群を見ると，少し Fat なものが目立ちました． 具体的にどういうコンポーネントの構造になっていたかを見てみると，次のようになっていました．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12190541/component-design-580x291.png)

Fatなものでいいものは基本無いですが，なぜ React において Fat なコンポーネントが良くないかを解説します． 例えば青枠は，指定期間の日付を描画するコンポーネントです．

Airシフトにおいて，各日に対して★ をつけることができ目印に活用できます． 仮に，上の画像で 28日に★ をつけたとします．すると何が起きるかというと，

全ての日付が再レンダリングされてしまいます． というのも，ReactのComponent の粒度はshouldComponentUpdateで再レンダリングを判定する範囲と同等だからです． つまり，青枠にたいして一つのshouldComponentUpdateしか無いため，これがtrueを返すと青枠内全てが再レンダリングされてしまいます．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12190618/full-rerender-in-day-action.gif)

これを解決するために，コンポーネント設計の見直しを行いました． 基本的には，shouldComponentUpdate を繰り返しの各要素で行えるようにコンポーネントを切り分けました．

keyを付ける必要性がある繰り返しの要素は，基本的にコンポーネントを分けたほうがいいと思います． （もし，分けていないと要素が増減・更新されたときにつられて再レンダリングが走ってしまうため)

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12190601/component-new-design-580x290.png)

このように各マスでコンポーネントを分けることで，それぞれのマスがshouldComponentUpdateを持つことができ， 必要最小限の再レンダリングに抑えることができます．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12191631/minimal-rerender.gif)

### 表示していない領域のDOMを生成しないようにする

例えば，1,000件のデータを表示するために高さ10,000pxのDOMを用意して，スクロールして見れるようにしたとします． このとき，ブラウザのサイズが 1600×900 だとします．とすると，実際に見えているのは，おおよそ1,600件のデータだと思います． つまり，残りの8,400の要素を描画するのは，基本的に無駄だと考えられます．

それを考慮したスクロールできる要素を作るReact用ライブラリ [React-Virtualized](https://github.com/bvaughn/react-virtualized) というものがあります．今回のパフォーマンス改善でこのライブラリを導入しました． スペックの低いPCは，ディスプレイのサイズも低い事が多いと推測して，よりパフォーマンスの低いデバイスで効果がでやすいのではないかと考えています．

Airシフトのシフト表を実現するために向いてそうなComponentとして[MultiGrid](https://bvaughn.github.io/react-virtualized/#/components/MultiGrid) を採用しました．

実際にどんなタイミングでコンポーネントがマウントされているのかを見てみます．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12191116/react-virtualized.gif)

描画直前に範囲外で緑の枠が出ていることから，スクロール中にもうすぐ見える領域に移動するであろうコンポーネントを直前に マウントしていることがわかります．こうすることで，初期レンダリング時に，全てのコンポーネントを描画することなく 最小限のコンポーネントだけを描画するので初回レンダリングの速度が劇的に上がります．

重要なのは，`React における List と key` で触れたように，マウント時に仮想DOMのインスタンスを再利用するために， データに対応した一意に定まるkeyを用意することが重要です．デフォルトでは，`React-Virtualized` が用意した `key` を 利用すればよいですが，絞り込みなどで index がコロコロ変わる場合は，そのkeyに加えて絞り込み状況を含んだものにする必要性があります．

また，要素が増減するとき，shouldComponentUpdateが実装されていないと全ての要素が再レンダリングされてしまうということも考慮する必要があります． React-Virtualizedは，スクロールの領域外になったら削除・領域内になったら追加するので毎回再レンダリングが発生しないために， shouldComponentUpdateの実装の必要性が高くなります．

これにより，初期レンダリングの速度を向上しつつ，スムーズなスクロールを維持することができました．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12191137/scrolling.gif)

## 改善結果

これらの施策や，そのほか細かな修正を積み重ねた結果，4倍低速モードで実行した状態で3.6secで表示できるようになりました．

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12191211/result-580x225.png)

### 4倍低速環境でのビフォー・アフター

before
after

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12191231/before.gif)

![](https://s3-ap-northeast-1.amazonaws.com/prod-rtc-blog/wp-content/uploads/2018/09/12191253/after.gif)

今回のパフォーマンスチューニングでは，ほとんどReactにフォーカスを当てて行いましたがReduxを含めた課題はまだまだあります． 具体的には，XHRを送ってから受け取る間までのloading状態を，実際にAPIから受け取った状態と同列に扱っているため， loading状態が変わるだけで，関係のない部分まで再レンダリングされたり，APIのレスポンスデータを React-Virtualized用に 二次元配列に変更するselectorの部分の計算量が大きくなってしまっていたりする現状があります．

今後，これらを修正していきさらなるパフォーマンスの向上を目指していきます．

## おわりに

この記事では，Reactに焦点をあてたときのパフォーマンス改善について触れてきました． しかし，一般的なケースでは，フロントエンドにボトルネックがあるとは限りません． バックエンド，特にDBへのアクセスにボトルネックを抱えていることもあります． 今回，自分が担当したAirシフトでは，それ以上にフロントエンドにボトルネックがあったため，フロントエンドから改善を行いました．

そして，現在でもまだまだフロントエンドで改善すべき箇所はたくさんあります． 例えば，

- shouldComponentUpdate が 特化した実装のためメンテナビリティが低い
- Store の state で随時 描画に関係ない状態を更新してしまって，無駄に再レンダリングしてしまっているケースがある

などです．

パフォーマンス改善を実行するにあたって，大切にしたいと思っていることが一つあります． それは，**動作を高速化して終わりではなく，継続的に事業側を含んだチームメンバ全員で今動いているアプリケーションが，十分なスピードであるのかどうか**を意識することだと思います．

自分の次のミッションとしては，改善の次のステップである，**アプリケーションのパフォーマンスを習慣的に観測するための基盤であったり文化を作る**ことだと考えています．

新人ブログリレーの次回の記事は、平松 耕輔によるセキュリティのお話が9月25日
公開予定です！乞うご期待。