---
URL: https://html5experts.jp/hokaccha/13301/
Updated: 2021-01-01T03:26:00
Created: 2021-01-01T03:26:00
Tags: [topic/技術/React]
---
- [HTML5Experts.jp](https://html5experts.jp/)>
- [外村 和仁](https://html5experts.jp/hokaccha/)>
- [今話題のReact.jsはどのようなWe...](https://html5experts.jp/hokaccha/13301/)

# **今話題のReact.jsはどのようなWebアプリケーションに適しているか？ Introduction To React─ Frontrend Conference**

[外村 和仁（株式会社 ピクセルグリッド）](https://html5experts.jp/hokaccha/)

- [JavaScript](https://html5experts.jp/tag/javascript/),
- [React.js](https://html5experts.jp/tag/react-js/)

2015年3月4日

- [](http://www.facebook.com/sharer.php?src=bm&u=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F&t=%E4%BB%8A%E8%A9%B1%E9%A1%8C%E3%81%AEReact.js%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AAWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AB%E9%81%A9%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B%EF%BC%9F%20Introduction%20To%20React%E2%94%80%20Frontrend%20Conference) 0
- [](http://twitter.com/intent/tweet?url=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F&text=%E4%BB%8A%E8%A9%B1%E9%A1%8C%E3%81%AEReact.js%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AAWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AB%E9%81%A9%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B%EF%BC%9F%20Introduction%20To%20React%E2%94%80%20Frontrend%20Conference&hashtags=html5exp&tw_p=tweetbutton) [click](https://twitter.com/search?q=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F)
- [](http://b.hatena.ne.jp/add?mode=confirm&url=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F) [1128](http://b.hatena.ne.jp/entry/https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F)
- [](http://getpocket.com/edit?url=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F&title=) 0

**連載： **[**Frontrend Conference 特集**](https://html5experts.jp/series/frontrend/)** (3)**

本記事は、2015/2/21に行われた[Frontrend Conference](http://frontrend.github.io/conference/)の「Introduction To React」の内容を紹介します。

当日の資料は以下にアップされていますので、こちらも参照してください。

[Introduction To React // Speaker Deck](https://speakerdeck.com/hokaccha/introduction-to-react)

# **React.jsとは何か**

React.jsはFacebook製のJavaScriptライブラリです。

[http://facebook.github.io/react/](http://facebook.github.io/react/)

公式サイトに、「A JavaScript library for building user interfaces」とあるように、React.jsはUIを構築するためのライブラリです。フレームワークでなくあくまでUIを構築するだけのライブラリで、MVCでいうところのVのみの機能を提供します。

開発を行っているFacebookやInstagramはもちろん、YahooやAirbnbなど多くの採用事例があり、現在注目を集めているライブラリの一つです。

# **React.jsの特徴**

React.jsの特徴を知るために、まずは他のライブラリやフレームワークの問題点について見ていきましょう。例えば[Todo MVC](http://todomvc.com/)のような、フォームを送信したらリストに項目が追加されるようなUIの実装を考えてみましょう。

### **jQuery**

単純にjQueryだけで実装すると次のようになるでしょう。

**JavaScript
			
			****1****2****3****4****5****6****7****8****9*****// Submitされたら*****$('form').on('submit', functino() {****  *****// 要素作って*****  ****var**** $li = $('<li>');****  *****// ...***** ****  *****// リストに追加*****  $('ul').append($li);****});****
****
****しかし、これだとデータがDOMにしかないので、何か機能を追加しようとしたときに非常にやりづらいですし、テストも書きにくいコードになります。****
****Backbone.js****
****Backbone.jsを使うとこの問題をある程度解決することができます。Backbone.jsはデータは管理するModelと、表示を管理するViewに分け、さらにViewをコンポーネントごとに分けるという設計を提案します。例えば次のようになります。****
****
		
			JavaScript
			
			****1****2****3****4****5****6****7****8****9****10****11****12****13****var**** FormView = Backbone.View.extend({****  onSubmit: ****function****() {****    *****// dataを作ってモデルに追加するだけ*****    ****this****.collection.add(data)****  }****});**** ****var**** ListView = Backbone.View.extend({****  initialize: ****function****() {****    *****// モデルが更新されたらリストを更新*****    ****this****.collection.on('add', ****this****.render);****  }****});****
****
****FormViewやListViewといった、UIの部品ごとに機能を分けていますが、このようなものをここではコンポーネントと呼ぶことにします。****
****Backbone.jsでデータやコンポーネントを分けて管理できるようになるとある程度の規模ではうまくいきますが、Viewの更新処理を手動で書かないといけない面倒さがあったり、ModelとView間のイベント管理が煩雑になるなど、規模が大きくなった時にスケールしづらいという問題があります。（Backbone.jsのラッパーライブラリである**[**Marionette**](http://marionettejs.com/)**や**[**Chaplin**](http://chaplinjs.org/)**といったものもありますが、本質的な問題は同じです）****
****Angular.js、Vue.js****
****Angular.js、Vue.jsなどに代表される、いわゆるMVVM系のライブラリの特徴はデータが変更されたら自動的に表示が変わる、という考え方です。****
****
		
			XHTML
			
			****1****2****3****4****5****6****7****8****9****<form ****ng-submit="onSubmit()"****>****  ****<input ****type="text" ng-model="text"****>****</form>**** ****<ul>****  ****<li ****ng-repeat="item in list"****>****    {{item.text}}****  ****</li>****</ul>****
****
****
		
			JavaScript
			
			****1****2****3****4****5*****// Controller*****$scope.onSubmit = ****function****() {****  *****// データを更新したら勝手にViewが変わる*****  $scope.list.push(newItem);****};****
****
****このように、HTMLに描画されるデータを記述し、JavaScript側ではデータを更新するだけで自動的に表示が更新されます。しかし、これらのライブラリも、規模が大きくなってきた時に状態を管理するのが難しくなってきます。****
****React.js****
****jQueryやBackbone.js、Angular.jsは規模が大きくなったときに管理するのが難しくなる、と述べましたが、きちんと設計すれば管理しやすいアプリケーションにすることは可能でしょう。しかし、それらは元々そのような目的のためのライブラリではないので、規模が大きくなっても管理可能に設計するというのは簡単なことではありません。****
****React.jsは、規模が大きくなっても管理できるような仕組みを提供してくれるライブラリです。逆に言えば、小さいアプリケーションを高速に開発するためのライブラリではないので、そういった場合はBackbone.jsやVue.jsを使ったほうがいいケースが多いと思います。****
****React.jsの特徴として、コンポーネントを極力ステートレスにすることで、コンポーネントを管理しやすくするというものがあります。****
****
		
			JavaScript
			
			****1****2****3****4****5****6****7****8****9****10****11****12****13****14****15****var**** ****Form**** = React.createClass({****  onSubmit: ****function****() {****    *****// 親にデータの更新を通知*****  },****  render: ****function****() {****    ****return**** <form ****onSubmit****={****this****.onSubmit}>...</form>;****  }****});**** ****var**** List = React.createClass({****  render: ****function****() {****    *****// 親からもらったデータを元に構築するだけ*****    ****return**** <ul>{****this****.props.list.map(...)</ul>;****  }****});****
****
****各コンポーネントは親からデータをもらい、それを元にViewを構築します。ここで重要なのは、コンポーネント自身は状態を持たないということです。常に外部（多くの場合は親コンポーネント）からの入力によって一意な表示を出力することでテストしやすく、管理可能で再利用性の高いコンポーネントにすることができます。****
****もちろん、全てのコンポーネントが状態を持たないと単なる静的なHTMLと同じですので、状態を持つコンポーネントも必要になりますが、そのようなコンポーネントを最小限にし、基本的にはステートレスなコンポーネントを作って組み合わせていくのがReact.jsにおけるプログラミングの考え方です。****
****普通はツリーのルートのコンポーネントだけに状態を持たせ、その状態を子のコンポーネントに伝え、ツリーを構築します。****
****
****また、コンポーネントの状態が変更すると自動的にツリーは再構築されるので、表示の更新を手動でやる必要がありません。これはAngular.jsなどのような、データが変わったら自動的に表示が変わるという考え方と同じです。****
****
****基本的にはルートのコンポーネント以外は状態を持たないようにするのがよいですが、input要素などはユーザーアクションによって自身のデータを変更する必要があるので状態を持ちます。****
****Virtual DOM****
****ルートのコンポーネントだけで状態を持ち、その状態が変更したらツリーを再構築するというのは、非常に設計を単純にしますが、一部分の変更だけで毎回全てのDOMツリーを再構築するのは速度的な面で問題になります。そこでReact.jsはVirtual DOMという仕組みを導入しました。****
****Virtual DOMはざっくり言うと、JavaScriptのオブジェクトとしてDOMツリーのようなものを持っておき、データに変更があった場合にそのオブジェクトの差分を計算し、実際のDOMへの再レンダリングを最小限にするという仕組みです。****
****React.jsでは**`**React.createClass**`**でコンポーネントを作成し、renderメソッドの返り値にVirtual DOMの定義を返します。Virtual DOMは**`**React.createElement**`**によって作成します。****
****
		
			JavaScript
			
			****1****2****3****4****5****6****7****8****var**** MyComponent = React.createClass({****  render: ****function****() {****    ****return**** React.createElement("div", {className: "foo"}, ****      React.createElement("div", {className: "bar"},****        "Hello ", ****this****.props.name****      )****    );****});****
****
****また、JSXという独自シンタックスを使うことで、XMLのようなシンタックスでVirtual DOMを表現することができます。****
****
		
			
			
			****1****2****3****4****5****6****7****8****9****10****11****var**** MyComponent = React.createClass({****  render: ****function****() {****    ****return**** (****      <div className="foo">****        <div className="bar">****          Hello {****this****.props.name}****        </div>****      </div>****    );****  }****});****
****
****これは**[**react-tools**](https://www.npmjs.com/package/react-tools)**や**[**babel**](https://www.npmjs.com/package/babel)**のようなツールで実行可能なJavaScriptのコードに変換することができます。****
****React.jsの速度について****
****React.jsは速い、と聞いたことがある人もいるかもしれませんが、はたして本当でしょうか。Virtual DOMという仕組みを導入し、ルートのデータを変更してもDOMへの変更が最小限になるので、高速になりますが、それはあくまでも全てのDOMを再構築する場合と比べた場合の話です。ここでは以下の3つのケースについて速度を計測しました。****
1. ****Backbone.jsで変更があった部分だけDOMを再構築****
2. ****Backbone.jsで何か変更があった場合全てのDOMを再構築****
3. ****React.jsで何か変更があった場合Virtual DOMの仕組みを通して差分のみDOMを再構築****
****結果は次のようになります。****
****
****※ **[**TodoMVC Benchmark**](http://hokaccha.github.io/todomvc-perf-comparison/)**
****このように、React.jsは、Backbone.jsで部分的に再構築するよりは遅いが、全てのDOMを再構築するよりははるかに速いことがわかります。****
****前述したように、状態をルートのコンポーネントだけに持つというのは非常に設計を単純にできます。そのような設計と速度を両立できるのがReact.jsの一番の特徴といえるでしょう。****
****Flux****
****Fluxはアプリケーションの設計手法の一つとしてFacebookが提唱しているものです。よくMVCと比較され、MVCと比べてデータの流れが一方通行であるという特徴があります。****
****引用元：**[**http://facebook.github.io/flux/docs/overview.html**](http://facebook.github.io/flux/docs/overview.html)**
****ここまでで、React.jsの基本的な設計として、状態をルートコンポーネントに持ち、何か変更があったらその状態を変更すると述べてきましたが、どのようにその変更を通知するかについては触れませんでした。****
****例えば、ツリーの末端のコンポーネントで何かユーザーのアクションを検知し、状態の変更が必要になったとします。このとき、React.jsではこの末端のコンポーネントはステートレスなので、変更を外に通知する必要があります。このとき、変更があった場合のイベントを公開しておき、直接の親のコンポーネントにイベントハンドラを通して通知する方法があります。****
****
		
			JavaScript
			
			****1****2****3****4****5****6****7****8****9****10****11****12****13****14****15****16****17****18****19****20****var**** ****Parent**** = React.createClass({****  handleChange: ****function****(changedData) {****    *****// 子で何か変更があった時の処理*****  },****  render: ****function****() {****    *****// 子のコンポーネントのイベントにハンドラを設定*****    ****return**** <****Child**** ****onChange****={****this****.handleChange}>a</****Child****>;****  }****});**** ****var**** ****Child**** = React.createClass({****  handleSubmit: ****function****() {****    *****// 親から受け取ったイベントハンドラを実行*****    ****this****.props.onChange(changedData);****  },****  render: ****function****() {****    *****// formのDOMイベントにハンドラを設定*****    ****return**** <form ****onSubmit****={****this****.handleSubmit}>...</form>;****  }****});****
****
****しかし、この方法だと、ネストが深いところのコンポーネントの変更を状態を持っているルートコンポーネントに伝えるのは非常に面倒です。そこで、FluxではViewで起こった変更を一括でActionに通知し、Dispatcherを通じてStoreに変更を通知します。****
****Storeというのはデータを管理する層で、MVCでいうMにあたる部分です。ViewのルートコンポーネントはこのStoreの変更を購読しており、Storeが変更されると自動的に状態が変更されます。****
****
****Flux自体は、設計の考え方なので、色々な実装があります。Fluxの考案元であるFacebookにも**[**facebook/flux**](https://github.com/facebook/flux)**という実装がありますが、これはDispacherのみを提供するかなりミニマムな実装です。他には、例えば次のようなものがあります。****
• ****・**[**spoike/refluxjs**](https://github.com/spoike/refluxjs)**
• ****・**[**jmreidy/fluxy**](https://github.com/jmreidy/fluxy)**
• ****・**[**yoshuawuyts/barracks**](https://github.com/yoshuawuyts/barracks)**
• ****・**[**BinaryMuse/fluxxor**](https://github.com/BinaryMuse/fluxxor/)**
• ****・**[**deloreanjs/delorean**](https://github.com/deloreanjs/delorean)**
****まとめ****
****React.jsやFluxの思想・特徴について説明しました。文中でも述べたように、React.jsが提供するのは規模が大きくなってもスケールできるような仕組みで、小さいアプリケーションを高速に開発するためのライブラリではありません。そのようなアプリケーションはAngular.jsやVue.jsのほうが向いている場合も多いですし、静的なページにちょっとしたUIをつけるだけならjQueryだけで十分なケースもあります。****
****実際にReact.jsとFluxでアプリケーションを書いてみるとわかりますが、ステートレスなコンポネートを組み合わせていくというのは面倒だと感じることも多いです。しかし、その面倒な制限と引き換えに得られるのが堅牢でメンテナンス可能なアプリケーションです。****
****もしそのような仕組みがほしいと思っている方がいればReact.jsも採用の候補に考えてみてはいかがでしょうか。****
****イベント動画****
****イベントの模様はYoutubeで公開されています。よろしければ、ご覧ください。**** **[**

        
        **](https://www.youtube.com/watch?v=Biam884qSjg)[**
            Tags : **](https://www.youtube.com/watch?v=Biam884qSjg)**
• **[**JavaScript**](https://html5experts.jp/tag/javascript/)**,****
• **[**React.js**](https://html5experts.jp/tag/react-js/)**            
                
                                ****
• **[****](http://www.facebook.com/sharer.php?src=bm&u=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F&t=%E4%BB%8A%E8%A9%B1%E9%A1%8C%E3%81%AEReact.js%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AAWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AB%E9%81%A9%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B%EF%BC%9F%20Introduction%20To%20React%E2%94%80%20Frontrend%20Conference)** 0 ****
• **[****](http://twitter.com/intent/tweet?url=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F&text=%E4%BB%8A%E8%A9%B1%E9%A1%8C%E3%81%AEReact.js%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AAWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AB%E9%81%A9%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B%EF%BC%9F%20Introduction%20To%20React%E2%94%80%20Frontrend%20Conference&hashtags=html5exp&tw_p=tweetbutton)** **[**click**](https://twitter.com/search?q=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F)** ****
• **[****](http://b.hatena.ne.jp/add?mode=confirm&url=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F)** **[**1128**](http://b.hatena.ne.jp/entry/https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F)** ****
• **[****](http://getpocket.com/edit?url=https%3A%2F%2Fhtml5experts.jp%2Fhokaccha%2F13301%2F&title=)** 0 ****
                
            **[**次の記事**](https://html5experts.jp/miyuki-baba/13369/)[**現役UIデザイナーが語る「今、**](https://html5experts.jp/miyuki-baba/13369/)**
            
                            **[**前の記事**](https://html5experts.jp/takazudo/13339/)[**理解しておきたい、CSSによる**](https://html5experts.jp/takazudo/13339/)