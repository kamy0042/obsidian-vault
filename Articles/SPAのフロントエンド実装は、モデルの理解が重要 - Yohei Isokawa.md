---
Created: 2021-01-01T14:52:00
URL: https://blog.yuhiisk.com/archive/2017/07/10/frontend-spa-with-model.html
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
# **SPAのフロントエンド実装は、モデルの理解が重要**

[五十川 洋平（Yohei Isokawa）](https://blog.yuhiisk.com/author/yuhiisk)2020.08.30 【更新】

どうも、イソップです。

[React](https://facebook.github.io/react/)や[Angular](https://angular.io/)、最近では[Vue.js](https://jp.vuejs.org/)が普及してきたおかげで、シングルページアプリケーション（以下SPA）の実装を多くの人ができるようになってきました。

宣言的なコンポーネント志向のアーキテクチャ、Fluxを用いたデータフロー。
コンポーネントの構築やデータの流れを意識することで、昔に比べて設計やデータ管理がラクになりました。

ただ注意したいのは、昔に比べてUIを実装しやすくなっただけで、アプリケーション実装のポイントを抑えておかないと次第にコードが散らかってしまうことです。
例えばReact + Reduxでは、始めは良くてもすぐにReducerやActionが膨れ上がります。
その結果コードの行数は増え、コードを追うのに時間がかかり、修正作業も困難。常にあれこれ考えながら実装を進めることになってしまっては元も子もありません。

そこで、重要になってくるのがモデルの概念です。
モデルを適用することで、データ管理をモデルに任せることができ、コードの見通しが良くなります。
今日はSPAにおけるフロントエンド実装とモデルの話をしたいと思います。

目次

- [フロントエンドのモデルとは](https://blog.yuhiisk.com/archive/2017/07/10/frontend-spa-with-model.html#i)
- [モデルを使うと何が嬉しいのか](https://blog.yuhiisk.com/archive/2017/07/10/frontend-spa-with-model.html#i-2)
- [モデルの実体](https://blog.yuhiisk.com/archive/2017/07/10/frontend-spa-with-model.html#i-3)
- [SPA実装ではMVCフレームワークを経験しておくと◎](https://blog.yuhiisk.com/archive/2017/07/10/frontend-spa-with-model.html#SPAMVC)

## **フロントエンドのモデルとは**

始めにモデルに馴染みがない人もいると思うので簡単に説明をします。

モデルとは、サーバーサイドなどのMVCフレームワークにおける「Model（モデル）」「View（ビュー）」「Controller（コントローラー）」のモデル部分を指します。[Model View Controller – Wikipedia](https://ja.wikipedia.org/wiki/Model_View_Controller)

モデルの役割は、アプリケーションで使用するデータの保持やビジネスロジックの処理などが挙げられます。

> ビジネスロジックは、データベース上のデータに対する処理手順といったようなものを指す、ソフトウェア工学的な用語である。ビジネスロジック – Wikipedia

今回説明するフロントエンドのモデルは、MVCフレームワークのモデルと同じ役割のものを言います。
記事の冒頭で挙げた各ライブラリ・フレームワーク（React、Angular、Vue.js）では、テンプレートがMVCのビュー、ルーターがMVCのコントローラーと考えればわかりやすいでしょう。

しかし、それぞれのライブラリ・フレームワークにはモデルの機能がそれほど強力ではないのです。
ReactのstateやFluxのデータフローを持ち込んだだけでは複雑なアプリケーション実装には耐えられません。
（もしReact以外のライブラリでの解決策をご存じでしたら、教えて頂けると幸いです。）

昔人気があった[Backbone.js](http://backbonejs.org/)では、MVCの概念取り入れられていて、Backbone.Modelというモデルの機能がありました。
これはAPI通信の機能はあれど、MVCのモデルそのままの機能を持ったものでした。（本来のモデルではAPIを叩きません）
当時は結構好きだったんですが、昨今の流れで行くとモデルは置いてけぼり感があります。

## **モデルを使うと何が嬉しいのか**

ではモデルを利用することで、具体的にどんな利点があるのでしょうか。

### **モデルを使わない場合**

引き続き、Reactを例に挙げます。
記事の冒頭でReact + Recuxのツライところとして、**ReducerやActionが簡単に膨れ上がる**、という話をしましたが、次の例を見てください。

APIから受け取るデータがあるとします。

**APIレスポンス**

[js]
const posts = [
{
“id”: 1,
“name”: “foo”
“description”: “text1”,
“checked”: false
},
{
“id”: 2,
“name”: “bar”,
“description”: “text2”,
“checked”: false
},
{
“id”: 3,
“name”: “baz”,
“description”: “text3”,
“checked”: false
},
];
[/js]

データを受け取って、テーブルで表示します。

**コンポーネント（ビュー）**
[js]
render() {
return (

{this.props.posts.map((post, i) => ())}

<!-- Column 1 -->


<!-- Column 2 -->


<!-- Column 3 -->


);
}
[/js]

データはactionとしてreducerに渡され、 `switch` 文でreduceします。

**Reduxのreducer**
[js]
const postsState = [];

function reducer(state = postsState, action) {
switch (action.type) {
// データの追加
case ActionTypes.GET_POSTS:
return Object.assign({}, state, {
posts: state.concat(action.posts)
});

// データの削除
case ActionTypes.REMOVE_POST:
return Object.assign({}, state, {
posts: state.filter((post, i) => i !== action.index)
});

// データの更新
case ActionTypes.UPDATE_POST:
return Object.assign({}, state, {
posts: state.map(post => {
if (post.id === action.data.id) {
return action.data;
}
return post;
});
});

// チェックボックスのトグル
case ActionTypes.TOGGLE_CHECK:
return Object.assign({}, state, {
posts: state.map(post => {
if (post.id === action.id) {
post.checked = !post.checked;
}
return post;
});
});

default:
return state;
}
}
[/js]

reducer内のcase文でActionTypeを振り分けて、その中でビジネスロジックを定義しているのがお分かりでしょうか。
Reactでは**これがツライのです**。パッと見た感じ、コードは長く、見通しも悪いため**ストレスを感じると思います**。

case文ごとに見ていけばなんとかやっていることはわかりますが、reducer全体がごちゃごちゃしているので直感的にコードの内容がわかりません。
処理が増えればコードも増え、それと同時にストレスも増えます。
このまま開発を行っていくことで、開発効率は落ちてコード品質を維持するのが難しくなり、最終的に修正するのが苦しい技術的負債になりかねません。
また、丁寧にコメントを書いて内容がわかるようにしても、そもそもコード量が多いわけですから根本解決にはならないのです。
（注：コメントを書かないということではありません。自分や周りの人のためにコメントは極力書きましょう。）

### **モデルを使った場合**

そこで、満を持してモデルの登場です。
先ほどのコードにモデルを利用してみます。

**修正されたreducer**
[js]
const postsState = new PostsModel();

function reducer(state = postsState, action) {
switch (action.type) {
// データの追加
case ActionTypes.GET_POSTS:
return state.add(action.posts);

// データの削除
case ActionTypes.REMOVE_POST:
return state.remove(action.index);

// データの更新
case ActionTypes.UPDATE_POST:
return state.update(action.data);

// チェックボックスのトグル
case ActionTypes.TOGGLE_CHECK:
return state.toggleCheck(action.id);

default:
return state;
}
}
[/js]

配列データの操作処理（ビジネスロジック）がごっそり無くなって、スッキリしました。
actionで渡ってくるデータを、state（モデル）のメソッドへ受け渡すだけです。

Reducerはstoreの内容やactionで渡ってくるデータのことも考えないといけないため、全てを一度に考えることが複雑化する原因になります。
そこで、Reducerからデータ操作の役割を分離することで、モデルにデータの処理を丸投げすることができるのです。
Reducerでは、モデルのメソッドを実行するだけで済みます。

モデルを適用することで、いかにコードの見通しが良くなることがお分かりいただけたかと思います。

## **モデルの実体**

モデルを利用した例では、stateの初期化時に `postsState = new PostsModel()` として、モデルを生成しています。
では、そのモデル内部を見てみましょう。

**作成したPostsModel**
[js]
import { Record } from ‘immutable’;

const PostsRecord = Record({
posts: [], // 取得データ
});

class Posts extends PostsRecord {

/**
* データの追加
* @param {array} data – 取得したデータ配列
*/
add(data) {
return this.set(‘entries’, this.get(‘posts’).concat(data));
}

/**
* データの削除
* @param {number} id – postのid
*/
remove(id) {
const _posts = this.get(‘posts’).filter((post) => post.id !== id);
return this.set(‘posts’, _posts);
}

/**
* データの更新
* @param {object} data – postオブジェクト
*/
update(data) {
const _posts = this.get(‘posts’).map((post) => {
if (post.id === data.id) {
return data;
}
return post;
});
return this.set(‘posts’, _posts);
}

/**
* チェックのトグル
* @param {number} id – postのid
*/
toggleCheck(id) {
const _posts = this.get(‘posts’).map((post) => {
if (post.id === id) {
post.checked = !post.checked;
}
return post;
});
return this.set(‘posts’, _posts);
}

}

export default Posts;
[/js]

このモデルは、 `Immutable.js` の `Record` を使用しています。

[Immutable.js](https://facebook.github.io/immutable-js/)[Record – Immutable.js](https://facebook.github.io/immutable-js/docs/#/Record)

Immutable.jsは、常にImmutableな値を返すライブラリです。
またその中の `Immutable.Record` はクラスとして機能するので、メソッドを定義することができます。
そこで、もともとReducer内で処理していたデータ操作をモデルへ移動しました。

そして、モデルの各メソッド実行時に自身を返すようにすることで、Reducerで特別な処理をしなくてもstoreの更新ができるようになります。（コードサンプルではわかりやすいように `get`, `set` を使っていますが、 `update` でも同じことができます）

データ処理はモデルに全て閉じ込めたほうが、実装をシンプルにすることができるわけです。
このようにモデルの考えかたが理解できると、データ処理の役割が明確に分離されているので頭の中がラクになりませんか？

また、モデルは自分でメソッドを定義できるので、イレギュラーなデータ取得やバリデーションなどもモデルに実装することで、よりシンプルな設計にすることが可能です。

**モデルは自由にメソッドを定義できる**

[js]
/**
* postsが空か
* @return {boolean}
*/
isEmpty() {
return this.get(‘posts’).length === 0;
}

/**
* データの初期化
*/
reset() {
return this.set(‘posts’, []);
}

/**
* 入力値のバリデーションなども実装可能
*/
validate() { … }

[/js]

ReactではImmutable.jsでモデルを実装するのが定石です。
今回はReactを例に紹介しましたが、AngularやVue.jsなど、どのライブラリ・フレームワークにも共通する概念ではないかと思います。

勘がいい方はお気づきかもしれませんが、何を隠そう、やっていることはサーバーのモデルと同じなわけです。

## **SPA実装ではMVCフレームワークを経験しておくと◎**

今回はSPAのフロントエンド実装におけるモデルの例を紹介しました。
モデルの利便性を少しでも理解していただけたら幸いです。

日頃実装していてつくづく思いますが、**SPA構築はライブラリ・フレームワークを利用したUI実装だけでは通用しない**ということです。

[**五十川洋平 / writer.app**](https://twitter.com/Yuhiisk?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E880603190038675457%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fblog.yuhiisk.com%2Farchive%2F2017%2F07%2F10%2Ffrontend-spa-with-model.html)[@Yuhiisk](https://twitter.com/Yuhiisk?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E880603190038675457%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fblog.yuhiisk.com%2Farchive%2F2017%2F07%2F10%2Ffrontend-spa-with-model.html)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-13gxpu9 r-4qtqp9 r-yyyyoo r-6zzn7w r-19fsva8 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-q1j0wu js-evernote-checked' data-evernote-id='46'%3e%3cg%3e%3cpath d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

SPAのフロントエンド実装の要は、モデルの概念を理解・適用することである。UI構築だけ出来てもダメで、その先に設計力が必要になる。モデルを理解する一番の近道は、サーバーのMVCフレームワークを経験するのが一番良い。（RailsとかDjangoとかCakePHPとか）[\#spa](https://twitter.com/hashtag/spa?src=hashtag_click)

[午前10:45 · 2017年6月30日](https://twitter.com/Yuhiisk/status/880603190038675457?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E880603190038675457%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fblog.yuhiisk.com%2Farchive%2F2017%2F07%2F10%2Ffrontend-spa-with-model.html)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr js-evernote-checked' data-evernote-id='47'%3e%3cg%3e%3cpath d='M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z'%3e%3c/path%3e%3ccircle cx='12' cy='8.042' r='1.25'%3e%3c/circle%3e%3cpath d='M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

[10](https://twitter.com/intent/like?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E880603190038675457%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fblog.yuhiisk.com%2Farchive%2F2017%2F07%2F10%2Ffrontend-spa-with-model.html&tweet_id=880603190038675457)[五十川洋平 / writer.appさんの他のツイートを見る](https://twitter.com/Yuhiisk?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E880603190038675457%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fblog.yuhiisk.com%2Farchive%2F2017%2F07%2F10%2Ffrontend-spa-with-model.html)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr js-evernote-checked' data-evernote-id='48'%3e%3cg%3e%3cpath d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr js-evernote-checked' data-evernote-id='49'%3e%3cg%3e%3cpath d='M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

ぼくのオススメは、サーバーのMVCフレームワークを経験すること。
SPAはサーバーの負荷分散な面もあるので、MVCの理解は非常に強力で、フロントエンドの実装に必ず役立ちます。

個人的にはRailsがわかりやすく、手っ取り早く雰囲気を掴みたいのであれば、[Udemy](https://px.a8.net/svt/ejp?a8mat=2NXI7K%20FKUCMQ%203L4M%205YJRM)のRailsコースの受講をオススメします。

[Web開発入門完全攻略コース – プログラミングをはじめて学び創れる人へ！未経験から現場で使える開発スキルを習得！](https://px.a8.net/svt/ejp?a8mat=2NXI7K%20FKUCMQ%203L4M%20BW8O2&a8ejpredirect=https%3A%2F%2Fwww.udemy.com%2Fweb-application-development%2F)

ぼくも実際に受講しましたが、心底やっておいてよかったと実感しています。
Railsのモデルを意識することで、フロントエンド実装の強力な武器になります。

そこまで時間無いよ、という方には、2014年の本でちょっと古いのですが、オライリーのSPA本にモデルの概念が書かれています。
UI実装はjQueryですが、モデルの他にもExpress・MongoDBでの構築方法も書かれているので、非サーバーサイドだったら必ず役に立つはずです。

[シングルページWebアプリケーション ―Node.js、MongoDBを活用したJavaScript SPA](http://www.amazon.co.jp/exec/obidos/asin/4873116732/yuhiisk03-22/)

posted with [ヨメレバ](http://yomereba.com/)

Michael S. Mikowski,Josh C. Powell オライリージャパン 2014-05-24

[**Amazon**](http://www.amazon.co.jp/exec/obidos/asin/4873116732/yuhiisk03-22/)

[**Kindle**](http://www.amazon.co.jp/gp/search?keywords=%EF%BF%BDV%EF%BF%BD%EF%BF%BD%EF%BF%BDO%EF%BF%BD%EF%BF%BD%EF%BF%BDy%EF%BF%BD%5B%EF%BF%BDWWeb%EF%BF%BDA%EF%BF%BDv%EF%BF%BD%EF%BF%BD%EF%BF%BDP%EF%BF%BD%5B%EF%BF%BDV%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BD%20%EF%BF%BD%5CNode.js%EF%BF%BDAMongoDB%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BDp%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BDJavaScript%20SPA&__mk_ja_JP=%EF%BF%BDJ%EF%BF%BD%5E%EF%BF%BDJ%EF%BF%BDi&url=node%3D2275256051&tag=yuhiisk03-22)

[**楽天ブックス**](https://hb.afl.rakuten.co.jp/hgc/15d3ce7d.24371b59.15d3ce7e.443b6a87/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F12790590%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F)

ぜひモデルを理解してSPA実装に役立ててください。

- [JavaScript](https://blog.yuhiisk.com/categories/javascript/)
- [プログラミング](https://blog.yuhiisk.com/categories/programming/)
- [Angular](https://blog.yuhiisk.com/tags/angular/)
- [React](https://blog.yuhiisk.com/tags/react/)

![](data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='twitter' class='svg-inline--fa fa-twitter fa-w-16 fa-lg js-evernote-checked' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-evernote-id='0'%3e%3cpath fill='currentColor' d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z' data-evernote-id='756' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)

![](data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='facebook' class='svg-inline--fa fa-facebook fa-w-16 fa-lg js-evernote-checked' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-evernote-id='1'%3e%3cpath fill='currentColor' d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' data-evernote-id='758' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)

**五十川 洋平（Yohei Isokawa）**
フロントエンドエンジニア／面白法人カヤックなどのWeb制作会社に勤務したのち、故郷の新潟に戻り独立。JSフレームワークAngularやFirebase、Google Cloud Platformを使ったWebアプリ開発が得意。
また、Udemyのプログラミング解説の講師、writer.appの自主開発や上越TechMeetupの主催などを行っています。
[プロフィール](https://blog.yuhiisk.com/about)

  [フリーランスの仕事選びは「その仕事は自分にとって価値があるか」で判断する](https://blog.yuhiisk.com/archive/2017/07/15/freelance-work-selection.html)[「すぐやる人」がすべてを手に入れる](https://blog.yuhiisk.com/archive/2017/07/02/to-do-it-now.html)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 15 15' data-evernote-id='28' class='js-evernote-checked'%3e%3cpath d='M7.5%2c1.5a6%2c6%2c0%2c1%2c0%2c0%2c12a6%2c6%2c0%2c1%2c0%2c0%2c-12m0%2c1a5%2c5%2c0%2c1%2c1%2c0%2c10a5%2c5%2c0%2c1%2c1%2c0%2c-10ZM6.625%2c11l1.75%2c0l0%2c-4.5l-1.75%2c0ZM7.5%2c3.75a1%2c1%2c0%2c1%2c0%2c0%2c2a1%2c1%2c0%2c1%2c0%2c0%2c-2Z'%3e%3c/path%3e%3c/svg%3e)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 15 15' data-evernote-id='27' class='js-evernote-checked'%3e%3cpath d='M3.25%2c3.25l8.5%2c8.5M11.75%2c3.25l-8.5%2c8.5'%3e%3c/path%3e%3c/svg%3e)

![](data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-left' class='svg-inline--fa fa-chevron-left fa-w-10 fa-lg js-evernote-checked' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' data-evernote-id='2'%3e%3cpath fill='currentColor' d='M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z' data-evernote-id='771' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)

![](data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10 fa-lg js-evernote-checked' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' data-evernote-id='3'%3e%3cpath fill='currentColor' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z' data-evernote-id='776' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)