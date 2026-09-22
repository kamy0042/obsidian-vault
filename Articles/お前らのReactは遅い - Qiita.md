---
Updated: 2021-01-03T01:23:00
URL: https://qiita.com/teradonburi/items/5b8f79d26e1b319ac44f
Created: 2021-01-02T17:41:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
煽りタイトルですみません。
最近、Reactのプロジェクトのページを動かしていて、
もっさりしてる（レンダリングの負荷が高いな）と思ったので
どうやったら無駄なレンダリングを減らせるか思考錯誤したことをまとめました。[preact](https://github.com/developit/preact)とか別ライブラリの話はしません。

よかったらこちらもどうぞ[ReactJSで作る今時のSPA入門（基本編）](https://qiita.com/teradonburi/items/fb91e5feacab5071cfef)

**2019年07月06日追記：**
ブラウザのレンダリングの仕組みに関して良記事があったので先に一読しておくことをおすすめします。
良記事１：[実際のところ「ブラウザを立ち上げてページが表示されるまで」には何が起きるのか](https://qiita.com/tsin1rou/items/d4c781a2f25e2b92fa5e)
良記事２：[ブラウザレンダリング入門〜知ることで見える世界〜](https://qiita.com/Leapin_JP/items/caed57ec30d638e40728)
１ピクセルがブラウザに表示されるまで：[Life of a Pixel 2018](https://docs.google.com/presentation/d/1boPxbgNrTU0ddsc144rcXayGA_WF53k96imRH8Mp34Y/edit#slide=id.p)

この記事に関してはReactのDOMツリー（レイアウト）レンダリングに関する最適化戦略です。

**2020年02月15日追記：**
続編：[お前らのReactは遅すぎる(SSG編)](https://qiita.com/teradonburi/items/09724de3738a25dfe8ba)

# RAILモデル

まず、Googleのパフォーマンスガイドなのですが、[RAIL モデルでパフォーマンスを計測する](https://developers.google.com/web/fundamentals/performance/rail?hl=ja)というのがあります。

- ユーザーを第一に考えます。最終目標は、特定の端末でのサイトの処理速度を上げることではありません。ユーザーが満足感を得ることが最終目標です。
- ユーザーに対して即座に応答します。ユーザー入力は、100 ミリ秒以内に認識します。
- アニメーションやスクロールでは、10 ミリ秒以内にフレームを生成します。
- メインスレッドのアイドル時間を最大限に活用します。
- ユーザーの作業を妨げません。インタラクティブ コンテンツは 1000 ミリ秒以内に提供します。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F10e47760-273d-c6d6-ff2d-d35b8f4be7e7.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=5cf8f55f2bcae9fdf88eeafdcf735275)

## 遅延に対するユーザーの反応

- 0～16 ミリ秒: とても良い、ゲームとかでも60FPS(1フレームあたりの描画間隔が16ミリ秒)とかになっていますね
- 0～100 ミリ秒: ページ内動作としては許容範囲
- 100～300 ミリ秒: ページ内動作のレスポンスとしてはやや遅い
- 300～1000 ミリ秒: ページの読み込み単位であればスムーズな体験を提供している
- 1000 ミリ秒以上: １秒を超えるとユーザは実行したタスクへの関心を失う
- 10,000 ミリ秒以上: ユーザーは不満を感じてタスクを中断し、そのまま戻ってこない恐れがあります

レスポンスが早いことはユーザ体験的にも正義です。

# どのコンポーネントがレンダリングされているか可視化する

[ChromeのReact Devtoolアドオン](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ja)のHighlight Updateでどこがレンダリングされているか可視化できます。レンダリングされている箇所がボーダーでハイライトされます。

![](https://qiita-image-store.s3.amazonaws.com/0/55077/bccfcc26-d140-a835-ff63-ce3413f4813b.gif)

# レンダリングパフォーマンスの計測方法(React 16)

React Devtoolアドオンなどがレンダリングパフォーマンスに悪影響を及ぼす可能性があるので、実際に計測する際はdisableにすることが推奨されています。
画面をフルにつかうため、Chrome Dev toolのドックを分離します。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2Ff6eac361-4396-023b-41a0-2c8053e3457a.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7fb27b2966164a6f963d16c4ece8b0ff)

実際の実行環境が高スペックなPCとは限りません。ロースペックなモバイル端末かもしれません。
PerformanceタブのCPUの設定でダウングレードエミュレートする設定があります。
その上のNetworkの設定でも、３G環境など通信環境が悪い想定をエミュレートできる設定があります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2Fbbd54eed-080d-138e-a1c6-22cb1a81ceb1.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0c2039fffb4b111b05d1b89509646935)

ページをリロードしてローディングのパフォーマンス計測するにはPerformanceタブの更新ボタンを押します。
ページ内での操作を行い、計測をするには●ボタンで行い、Stopを押します。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F7390a544-1169-1188-38b7-0a2661a403a1.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0519933bc6d0750933de21785a2006ad)

Scriptが実行されている箇所は黄色い箇所です。SummaryにScriptが実行されたトータル時間が表示されます。
①の青い線が[DOMContentLoaded（最初のDOMの解析が完了した時間）](https://developer.mozilla.org/ja/docs/Web/Events/DOMContentLoaded)イベントが発生した時間、赤い線が[load(ページが完全に読み込まれた時間)](https://developer.mozilla.org/ja/docs/Web/Events/load)イベントが発生した時間です。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2Fbe3ab692-cf0e-05e7-6024-de83e979f8fc.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6458c98e4b0dad053e0f97c4c4448ac2)

User Timingを開き、Reactの処理がされている箇所に移動します。

![](https://qiita-image-store.s3.amazonaws.com/0/55077/4805d959-463a-290f-3d43-02271227b057.gif)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F5711f9a0-d4ff-2ece-3b56-c06c27cebf9a.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=06432af5ee74f881d0420a1e700bda45)

ソースマップファイルが存在する場合、さらに処理内部のどこで時間がかかったかわかります。

1. フレームグラフのバーをクリックすると各処理がかかった時間がわかります。
2. Bottom-Upをタブを開きます。
3. 処理の時間をソートします。
4. ソースマップファイルがある場合表示されます。
5. 実際のソースコード内のどこで時間がかかっているか調査できます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2Fb2902e19-86ea-30e6-e13c-80d6bfb1fec0.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7d0b04e4b8711be99df0eba2c8f36364)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F8f72509d-694a-1904-931f-9563ecff9918.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=63b753d065f59909f239a572bd72c270)

ソースマップファイルはwebpackでビルドしている場合は、webpack.config.jsのdevtool設定で出力できます。
出力するフォーマットに関してはwebpack公式ドキュメントを参考にしてください。

参考: [Devtool](https://webpack.js.org/configuration/devtool/)

webpack.config.js

`module.exports = {
  mode: 'development', // 開発モード
  devtool: 'source-map', // ソースマップファイル出力
}`

# Reactのレンダリングパフォーマンス最適化戦略

とあるページで表示される次のようなDOMツリーがあるとします。
各ノードはReactのコンポーネントを想定しています。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F98e7f2a5-8e43-8eff-aed6-d4e63b5930ac.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=f5154da66bf4e1df1927b93873e5ae62)

末端のノードDでsetStateをしてコンポーネントの状態を変更した場合、Dのレンダリングが走ります。
この場合、影響範囲はレンダリングのDのみです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2Fc0ac74c8-2400-18d3-3665-f99ea91d238f.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=1e247b821acb3b5faeeafca70cc14fba)

では、一番親のAでsetStateした場合はどうなるのかというと、Aのrenderメソッドが呼ばれて、
子以下の全てのComponentがレンダリング対象になります。（子のコンポーネントがReact.Component、Stateless Functional Componentのみの場合）
この場合、再レンダリングをする必要がない子コンポーネントも無駄にrenderメソッドが呼ばれてしまいます。
(子コンポーネントのpropsにstateのパラメータを渡すとかは関係なしに子コンポーネント以下のrenderが呼ばれます！)
厄介なのは親のコンポーネントにぶらさがっている子コンポーネントが多ければ多いほど、何も対処しない場合にレンダリング負荷が上がっていきます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F5491975e-7ad5-996a-64ae-e2f704610d92.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=3bc2f08ce6ac5b453d5f1599b4b9d4e8)

reduxとreact-reduxを使う場合、renderの影響コンポーネントを限定的にすることができます。
(connectの第1引数のmapStateToPropsで参照している箇所のみ)
この構造のメリットはconnectの第2引数であるmapDispatchToPropsでreduxのアクションをどこからでも呼べます。
注意したいのは親コンポーネント（この図だとA）では[mapStateToPropsを参照しない](https://spin.atomicobject.com/2018/04/02/redux-rerendering/)ようにすることです。
（参照してAの方のpropsを更新してしまうと木全体が再レンダリングの対象となるため）
ただし、この場合でもB以下のD、Eはレンダリングが走ります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2Fa88c5b60-ae34-30f5-b23a-3ce487bd8880.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=12656dd3480f4567c15471b3db4d3406)

根本的に余計なレンダリングを減らすためには子コンポーネント側でshouldComponentUpdateをオーバライドして条件によってfalseを返す必要があります。（デフォルトは常にtrue）

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F49a1626e-647a-b317-2940-1f0ba29c7826.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6fb0aa7c59f53a670cbc97cab1f020bb)

shouldComponentUpdateを自前で書く場合は、shouldComponentUpdateに渡ってくるprops、stateと
コンポーネントが持っているpropsとstateを比較して、違いがあるのみレンダリングするという判定をします。

`class SampleComponent extends React.Component {
  static get defaultProps() {
    return {
      sampleProp: '',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      sampleState: '',
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.sampleState === nextState.sampleState &&
             this.props.sampleProp === this.props.SampleProp)

  }

  render() {
    // 略
  }
}`

上記のshouldComponentUpdateの判定処理を自動的にやってくれるPureComponentがReact 15.3以降から使えます。
簡易的にやるには、React.ComponentはReact.PureComponentに置き換え、
Stateless Functional Component(SFC)の場合はReact 16.6から使える[React.memo](https://reactjs.org/docs/react-api.html#reactmemo)でwrapすると良いでしょう。
ちなみに、connectでwrapされたコンポーネントはデフォルトでPureComponent扱いになります。
参考：[connectの第４引数のoptions](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#arguments)

基本的にはPureComponent、React.memoとreact-reduxのconnectを組み合わせる方針で良いと思いますが次のアンチパターンには気をつけなければいけません。

## PureComponentの再レンダリングを引き起こすアンチパターン

特にpropsで子PureComponentにパラメータを渡す箇所に関して気をつけないと子コンポーネントの再レンダリングを誘発します。
propsに渡すものは再生成しない、いいね？
極力renderで変数の定義や即時実行を避ける

ちなみにrefに関してはpropsじゃないのでインラインのアロー関数を渡してもOK
参考：[PureComponent にインラインのアロー関数を渡してもいい場合](https://qiita.com/mpyw/items/33a76b9f937f3ccbc507)

### アロー関数をpropsに即時関数で渡す

即時関数で直接propsに渡してしまうと、親のrenderが呼ばれるたびに別のオブジェクトとして即時関数が再生成される
そのため、PureComponentのshouldComponentUpdateでは違うpropsが渡ってきたものとみなされるので再レンダリングされてしまう。
次の例はChildコンポーネントにchange propsで親のハンドリング関数を渡す場合

・NG

` render () {
   return <Child change={() => console.log('hoge')} />
 }`

・OK

bindを使う

` constructor(props) {
   super(props)
   this.hoge = this.hoge.bind(this)
 }

 hoge() {
   console.log('hoge')
 }

 render () {
   return <Child change={this.hoge} />
 }`

もしくは[plugin-proposal-class-propertiesプラグイン](https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html)を使っている場合はクラス内アロー関数で定義しておいたものを指定できます

` hoge = () => {
   console.log('hoge')
 }

 render () {
   return <Child change={this.hoge} />
 }`

### デフォルトパラメータ付きでpropsに渡す

途中で値が変わるような場合はpropsが変更されたとみなされて、子コンポーネントのrenderが呼ばれる

・NG

` render () {
   return <Child options={this.abc || []} />
 }`

・OK
constructorでやりましょう

` constructor(props) {
   super(props)
   this.abc = []
 }

 render () {
   return <Child options={this.abc} />
 }`

### bindをrenderでやってしまう

・NG

` hoge() {
   console.log('hoge')
 }

 render () {
   return <Child change={this.hoge.bind(this)} />
 }`

・OK
constructorでやりましょう

`constructor(props) {
   super(props)
   this.hoge = this.hoge.bind(this)
 }

 hoge() {
   console.log('hoge')
 }

 render () {
   return <Child change={this.hoge} />
 }`

## SFC vs React.memo vs PureComponent

ステートレスなComponentに関してはSFCにしたほうがReactの無駄なライフサイクルの処理がないため、レンダリング速度があがります。
参考：[45% Faster React Functional Components, Now](https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f)
→ 45%とタイトルになってますが、記事内の画像では、class → Function Componentへの変更で得たのは6%の高速化だそうです

React.memoやPureComponentはどの粒度で使えば良いのかというとHOCや特にライフサイクルメソッドのコストが軽くはないので少なくとも小規模なDOMしか持たないコンポーネントにとってはReact.memoやPureComponentは機能過多になり、パフォーマンスが逆に落ちます。
おそらくレンダリングするDOM数とトレードオフなので使いどころは考えましょう。~~この辺はどれくらいがトレードオフなのか実際に計測してみないとわかりません。~~
→ React.memoに関してはprops内容が変更しない場合（レンダリング内容が初期化時から変更しない場合）に限り使うのが良さそうです。

また、React 16.8で出たReact Hooksを使うとuseStateでSFCにstateを持つことも可能になりました。(以下FC)[React 16.8: 正式版となったReact Hooksを今さら総ざらいする](https://qiita.com/uhyo/items/246fb1f30acfeb7699da)
さらにuseMemoやuseCallbackを使うことでFunctional Component内の変数や関数を再生成せずに再利用することが可能のため、~~そちらのほうがパフォーマンスが出そうです~~[雰囲気で使わない React hooks の useCallback/useMemo](https://qiita.com/seya/items/8291f53576097fc1c52a)
より、可読性が下がりバグの原因になる確率があがるため適材適所で使ったほうが良さそうです。

そもそもページ単位でstateを持たせるような設計がアンチパターンのため、stateを持つのはできるだけ末端のコンポーネントに限定します。
データの参照が必要なコンポーネントに関してはconnectで直接参照するようにします。（ページ内で更新されうるデータを持つ）
個人的にはFC群をまとめた、React.memoの親コンポーネントを用意するとレンダリングの影響範囲を限定できて良い気がします。これはAtomic DesignのOrganisms（有機体）くらいの粒度のイメージだと思います。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F8e22cfa7-ede0-6d8a-cfac-ac25763f8363.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0ce13b93879e48347b5fe479cb6b4b66)

原子: デザインの最小要素、カラー、フォント、見出し、ボタン、入力欄等
分子: 原子を組み合わせてグルーピングしたパターン（見出しと本文のセットなど）
有機体: 分子を組み合わせて作り出されたインタフェース（見出し＋メニュー欄→ナビゲーションバー）
テンプレート: 有機体を組み合わせてできた、ページのワイヤーフレーム
ページ: ワイヤーフレーム外のページ独自デザイン要素も入ったページそのもの

### 結局全部FCにすればいいの？

[React Hooks — Slower than HOC?](https://hackernoon.com/react-hooks-slower-than-hoc-ff105586036)
useEffectつきのFCとHOCをベンチマークした結果HOCのほうが早いという結果がでてしまったようです。

これに関してDan先生が反論してます。[This benchmark is indeed flawed.](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f)
componentDidMountはuseEffectより早くコールバックされるらしいのですが、コール時にはユーザーには実際には何も表示されません。
useLayoutEffectで比較した結果はHooksが優勢のようです。
ただ、一概にHooksが早いとは言えないようです。
（とはいえ、カスタムフックでロジックの処理とUI表示を分離が可能なのでHooksを使うメリットのほうが大きいのが現状だと思います。）

## 無駄なレンダリングを検知する

[why-did-you-update](https://github.com/maicki/why-did-you-update)パッケージを使うと
stateやpropsが子コンポーネントに伝わったタイミングで無駄なレンダリングを検知することができます。（デバッグ用）

`import React from 'react'

// 無駄なレンダリングを検知する
if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}`

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F27aaf6a7-f9a4-94c8-6877-352429003d8e.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=329d1d991697c6c8e55417c8da1a29ac)

## サンプル

StackBlitzに[レンダリングが呼ばれるかの比較](https://stackblitz.com/edit/react-render-perform)を書いてみたので確認してみると挙動がわかります。
（console開いてみてね）

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2F16e14c5a-1d8f-ad74-f734-f377a18b8e5e.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e02e712f0a924693c3092f232a6b553d)

# Code SplitingとDynamic importによるローディング高速化

[Code Spliting](https://reactjs.org/docs/code-splitting.html#code-splitting)を使えば、ビルド時にbundle.jsから指定のcomponentを別のjsファイルに分離することができます。

Webpackの場合はwebpackのoptimization項目で主要なライブラリを別ファイルに分離することができます。[webpack CodeSplitting](https://webpack.js.org/guides/code-splitting/)

以下の例は１つだったbundle.jsから
react.jsファイルとcore.jsファイルとbundle.jsファイルの３つのファイルに分離する例です。
（巨大なbundle.jsを１つ読み込むよりも複数の同サイズのjsファイルを並列で読み込んだほうがローディングが高速化します）
react関連のパッケージはreact.jsにそれ以外のサイズが大きいライブラリはcore.jsに分離します。

webpack.build.js

`const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
  mode: 'production', // 本番環境
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /react/,
          name: 'react',
          chunks: 'all',
        },
        core: {
          test: /redux|core-js|jss|history|matarial-ui|lodash|moment|rollbar|\.io|platform|axios/,
          name: 'core',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new Visualizer({filename: './stats.html'})
  ],
}`

[webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer)プラグインを使えば、生成されたjsファイルの容量の内訳を可視化してくれます。(この例だと、stats.htmlを出力)
いわずもがなですが、使っていないライブラリはパッケージから除外しましょう。もしくは不必要に大きいパッケージは気をつけたほうが良いです。bundle.jsのサイズが膨れ上がります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F55077%2Fe258190e-fc21-ee00-0fe3-00107921c3ae.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=95f9f84e03792a583c68c77e254f48e1)

最近は[webpack-bundle-analyzerプラグイン](https://github.com/webpack-contrib/webpack-bundle-analyzer)のほうが内訳が細かく出るのでもっぱらこっちを使ってます。
設定はプラグインに追加するだけです。

webpack.build.js

`  plugins: [
    new BundleAnalyzerPlugin()
  ]`

![](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/55077/40f0d024-da00-c268-49bb-15c91172f3fe.gif)

また、dynamic importと呼ばれる技術で非同期にjsファイルをローディングすることができます。
これにより同期読み込みでブロッキングされる時間が短縮されます。
（※ただし、SSRする際はランディングするページのコンポーネントに関しては同期読み込みしないとDOM一致しないという問題があったりします。）
一応、ランディングしたページに関してのみ同期読み込みするサンプルを作ってみました。[SSR(サーバサイドレンダリング)について](https://github.com/teradonburi/learnReactJS/tree/SSR)

`// 同期
import Sample from './Sample'
// 非同期
import('./Sample').then(module => module.default).then(Sample => {/*処理*/})`

また、webpackでビルドする際はimportするファイルにwebpackChunkNameというマジックコメントをつけることで、
webpackビルド時にimport対象のファイルをbundle.jsから分離することができます。
次の例は、Sampleコンポーネントをsample.jsに分離する例です。（webpackChunkNameはファイル名を指定するため、一意である必要があります。）

`import(/* webpackChunkName: "sample" */ './Sample')`

さらに、webpack 4.6.0以降では、prefetchの機能もつけることが可能になりました。
webpackPrefetchのマジックコメントを付与することで、アイドル時間を利用して先読みでjsリソースファイルを取得することが可能です。
読み込む優先順位もz-indexライクな数値で指定することができます。（その場合、trueは0扱い）
参考：[`<link rel=”prefetch/preload”> in webpack`](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)
webpackPrefetchに関しては指定しまうと非同期で対象のjsリソースを取りに行くため、
次のページで使用されると予想されるComponentにのみに対象を絞ったほうが良いでしょう。(無駄な通信を避ける)
未検証ですが、GAのトラッキングデータなどからどのページに遷移しそうか推測してくれる[Guess.js](https://blog.mgechev.com/2018/05/09/introducing-guess-js-data-driven-user-experiences-web/)なんてものもあったりします。

`import(/* webpackPrefetch: true, webpackChunkName: "sample" */ './Sample')`

[React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy)という機能も実装されたのですが、SSR未対応なため、まだ[loadable-components](https://github.com/smooth-code/loadable-components)が推奨されています。(使うタイミングで非同期読込する)

使い方は次のような感じです。

`import loadable from '@loadable/component'

const Sample = loadable(() => import(/* webpackChunkName: 'sample' */ './Sample'))`

簡易的にloadableと等価なComponentを自作すると次のような感じです。

AsyncComponent.js

`import React from 'react'

// 遅延レンダリングを行うコンポーネント
export default (loader) => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.Component = null
      this.state = { Component: AsyncComponent.Component }
    }

    componentDidMount() {
      // 遅延して読み込み完了させる
      setTimeout(() => this.setState({startProgress: true}), 500)
      if (!this.state.Component) {
        loader()
          .then(module => module.default) // export defaultされたコンポーネント
          .then(Component => {
            // コンポーネントを遅延読み込みしたものに差し替え
            AsyncComponent.Component = Component
            this.setState({ Component })
          })
      }
    }

    render() {
      if (this.state.Component) {
        // Wrapしたコンポーネントをレンダリングする
        return <this.state.Component { ...this.props } />
      }

      if (!this.state.startProgress) {
        return null
      }

      // Loading中コンポーネント
      return <div>Now Loading...</div>
    }
  }
)`

縦に長いページに関してはファーストビュー以外は非同期importにしたほうが、初回のレンダリングが早くなります。
（ただし、SSR onlyなページやAMPページの場合はサーバ側で全部レンダリングさせるしかない）

またloadable-componentsに関してはリンクホバー時にprefetchする機能があるのでこちらも活用すると不要なJSファイルのローディングをさらに減らすことが出来ます。（直前までロードしない）[Reactのcode splitting用のライブラリとしてloadable-componentsが良かったので推していきたい](https://medium.com/@terrierscript/react%E3%81%AEcode-spliting%E7%94%A8%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%A8%E3%81%97%E3%81%A6loadable-components%E3%81%8C%E8%89%AF%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%AE%E3%81%A7%E6%8E%A8%E3%81%97%E3%81%A6%E3%81%84%E3%81%8D%E3%81%9F%E3%81%84-743ccc371163)

# SSRとSSG(スタティックサイトジェネレーション)について

これまで自分はSSR（サーバサイドレンダリング）のほうがCSR（クライアントサイドレンダリング）より早いと思っていましたが
サーバのスペックやブラウザのスペック、回線状況にも依存しますが
興味深いのはSSRしたほうがCSRよりトータルの読み込みの時間が遅くなる場合があるということです。
（もちろんファーストビューのインタラクションはCSRが真っ白に対して部分表示できてるSSRのほうがよいですが）[The Benefits of Server Side Rendering Over Client Side Rendering](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)

これはDOMの量が多いページだとバックエンドでレンダリングに時間がかかり、TTFB(Time to First Byte)が遅くなることに起因するそうです。（`RenderDOMServer.renderToString`の負荷が高い）
解決策としては

・CDNなどでページをキャッシュさせる
・SSG（スタティックサイトジェネレーション）でプリレンダリングしてhtmlを吐き出しておく

などが考えられます。

SSGに関しては静的なページを予め生成するため、
更新があまり少ないけど速度が重視されるLPやブログなどに有効です。
React公式でも使われてる[GatsbyJS](https://www.gatsbyjs.org/)がおすすめです。
（静的といいつつも、ルーティングなども構築済みで出力できるし、仮想DOMの構築をJSでやらずに出力済みのhtmlファイルを生成できるので圧倒的に早いです）

**追記2020/02/15:****試したら動的なサイトもできるのでもう全部Gatsbyでいいんじゃないかな：**[**お前らのReactは遅すぎる(SSG編)**](https://qiita.com/teradonburi/items/09724de3738a25dfe8ba)

# まとめ

レンダリング

- そもそも親コンポーネントでのstate変更が必要な設計は極力さける、react-reduxのconnectでレンダリングするコンポーネントを限定する。末端のノードのみstateを持つ設計にすることでレンダリングの影響範囲を少なくする
- 親でstateが必要だと感じた場合はデータの影響部分をReduxに切り出し、connect経由で子コンポーネントに伝える。条件ハンドリングしたい場合はthisメンバ変数を使うことも視野に入れる
- 親コンポーネントではRedux（connectのmapStateToProps）を参照しない
- propsにインライン関数は使わない、render内での処理を極力避ける（constructorで前処理する、メンバ関数を指定する）
- stateの変更の影響を受けないpropsは渡しても可（初回のレンダリングのみ渡す系のprops）
- レンダリングの負荷： Component > PureComponent > FC(wrapped React.memo) > FC
- レンダリングするDOMの粒度が小さいコンポーネントはFCにする
- FC群をまとめたReact.memoを作る

結局はどの粒度でコンポーネントをまとめるかという問題とどのデータをconnectで参照するかに尽きる気がしました。

ローディング

- そもそも使っていないライブラリは削除してbundle.jsを軽くする
- WebpackのCodeSplitting機能を使ってjsファイルをbundle.jsから分離する
- dynamic importを活用することでjsリソース読み込み時のブロッキングを避ける
- prefetch付きdynamic importをすることで次表示されるページのjsリソースを先読みできる

このライブラリは本当に必要なのかも導入する前に考慮しましょう。