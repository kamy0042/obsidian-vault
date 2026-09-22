---
Created: 2021-01-15T18:13:00
URL: https://qiita.com/techneconn/items/7db887a670434cdc4006
Tags: [topic/技術/権限管理]
---
# まえがき

ログインしたユーザによって表示したい内容や操作できる内容を管理する、
いわゆるロール管理のやり方です。**アクセス制限リスト(ACL)**という
考え方をもとに、フレームワーク非依存の内容を目指して書きました。
※3行だけVueのサンプルコードが出てきますがVue知らなくても大丈夫です。

※この記事のアイデアは[browser-acl](https://github.com/mblarsen/browser-acl)および[vue-browser-acl](https://github.com/mblarsen/vue-browser-acl)にインスパイアされています。

# シチュエーション

それでは早速ロール管理ですが、まずはこんなシチュエーションを考えてみます。

<掲示板>

- `guest / ゲストユーザ` (ログインしていないユーザ)は何も出来ない
- `readonly / 閲覧ユーザ` は掲示板を観覧できるが、書き込むことは出来ない
- `general / 一般ユーザ` は掲示板を観覧し、書き込み・編集を行うことが出来るが他のユーザの書き込みを編集することは出来ない
- `admin / 管理ユーザ` は掲示板の観覧、書き込み・編集を行える

表にするとこんな感じですかね。

article / 役割
guest
readonly
general
admin




list
✕
◯
◯
◯


create
✕
✕
◯
◯


edit
✕
✕
△(自分の記事のみ)
◯

これを、「コンポーネントに直書きする」パターン(アカンやつ)、
「アクセス制限リスト(ACL)で管理する」パターン(betterなやつ)
でそれぞれ見ていきましょう。

※以降、現在のuser情報のアクセスにuserというのが出てきますが、
これはlocalstorageにあるデータでもいいですし、Vuex等のstoreに
保存されているデータでもいいです。適宜読み替えてください。

# コンポーネントに直書きする

## BBS記事一覧

Copied!

`<ArticleList v-if="user.isLoggedIn"></ArticleList>`

うん

## BBS記事作成

Copied!

`<NewArticleForm v-if="user.isLoggedIn && user.type !== 'readonly'"></NewArticleForm>`

おお…

## BBS記事編集

Copied!

`<EditArticle v-if="user.isLoggedIn && (user.type === 'admin' || post.owner === user.id )"></EditArticle>`

えぇ…

この調子でv-if内に条件を撒き散らしていくと、条件が増えるごとに辛みが爆発しそうです。
methodなりcomputedにまとめてもいいですが、結局アプリが成長するに連れ色んなコンポーネントに
権限の定義が増えていき、辛みがあることには変わりません。

# アクセス制限リスト(ACL)による権限管理

## 考え方

そこで登場するのがアクセス制限リスト(ACL, Access Control List)を作る方法です。
「役割が」「どれに」「何を」できるのかの表を一箇所にまとめて定義して、
コンポーネントからはその定義を参照するようにすれば、
権限の知識を分離できるのでとっ散らからなくなります。

この表をコード化するイメージです。

article / 役割
guest
readonly
general
admin




list
✕
◯
◯
◯


create
✕
✕
◯
◯


edit
✕
✕
△(自分の記事のみ)
◯

定義の粒度としては「どれに」はページ単位やAPI側リソース単位、
「何を」はCRUD単位で作ると、しっくり来やすい感じがします。
もちろん厳密に規約があるわけではないので、要件に合わせて柔軟に
リストを育てていけばいいですが。

## 下準備編

さて実装ですが、リストはただのオブジェクト、権限確認を行うメソッドも
リストから目的のアクセス制限を取り出すだけなのでとても簡単です。
早速、リストの一部と権限確認メソッド(can)を作ってみましょう。

Copied!

`// ----- 定義
const acl = {
  article: { // どれに
    create: { // 何を
      // 役割が
      guest: false,
      readonly: false,
      general: true,
      admin: true
    }
  }
}

const can = (role, verb, subject) => {
  return acl[subject][verb][role]
}`

試しに使ってみます。

Copied!

`// ----- テスト
// 役割が、どれに、何をできるんですか？

let user = methodToGetUser()

user.role = 'readonly'
can(user.role, 'create', 'article') // => false

user.role = 'admin'
can(user.role, 'create', 'article') // => true`

※順番やデータ構造はお好みで作るといいですが、メソッド名をcanにして
上記順番の引数にすると、語順的に英語の質問 `Can readonly create article?`
になるので、思考の順に書けます。

## 改善編

上記フォーマットのACLオブジェクトの作成で、基本的なリストは表現できるようになりました。
しかし、これでは「ログインしているかどうか」や「自分の記事しか編集できない」といった、
単にtrue/falseを返すだけで判断出来ないものを扱えません。
なので、ちょっと修正を加えてみましょう。
→「役割が」ではなく「誰が」で判断する。「誰」のインスタンスが持ってる情報はすべて使える。
→「~~役割が~~誰が」「どれに」「何を」できるのか、の判定をメソッド化する
→「何を」を判断するために追加情報が必要なら、メソッドの引数に足す
　(以下の例ならeditの判定にarticle情報が必要なので引数に追加)

Copied!

`// ----- 定義

// 判定をメソッド化。ついでにlistとeditも追加
const acl = {
  article: {
    list: (user) => {
      if (!user.isLoggedIn) return false
      return true
    },
    create: (user) => {
      if (!user.isLoggedIn) return false
      if (user.role === 'readonly') return false
      return true
    },
    edit: (user, article) => {
      if (!user.isLoggedIn) return false
      if (user.role === 'admin') return true
      if (user.role === 'general' && user.id === article.user_id) return true
      return false 
    }
  }
}

// option引数を取れるように修正
const can = (user, verb, subject, ...args) => {
  return acl[subject][verb](user, ...args)
}`

Copied!

`// ----- テスト
// 誰が、どれに、何をできるんですか？

let user = methodToGetUser()
let article = methodToGetArticle()

user.isLoggedIn = false
can(user, 'create', 'article') // => false

user.isLoggedIn = true
user.role = 'general'
can(user, 'create', 'article') // => true

user.isLoggedIn = true
user.role = 'general'
article.id = user.id
can(user, 'edit', 'article', article) // => true (option引数を使った判定)`

良さげですね。

### さらなる改善(任意)

### option引数部分の工夫

現状、option引数を使った場合は読み的に `Can user edit article (article instance)?`
となりますが、canメソッドを工夫して「何を」部分をインスタンスも受取可能なように工夫すれば
大多数の判定を`Can user edit　(article instance)?` といった具合にoption引数無しで
行えるようになります。もちろんインスタンス側に「ワイは●●のインスタンスや！」
と判定できる情報が必要ですが…

### Enum化

「どれに」「何を」をStringではなくEnum化したものを使用すれば、
入ってくる値を厳密に管理できます。この方式だとエディタ補完で
どのような権限があるのか一覧することもできるので便利です。

## アプリへの組み込み

上記をexportして、PJでconfigを置いているディレクトリに配置します。
この記事では~~面倒くさい~~分かりやすさ重視で同じファイルにブチ込んでますが、
canは厳密にはconfigではないので、PJ要件によってこの場所が適切ではないと
判断した場合はlibなりutilなりに定義場所移動して下さい。

Copied!

`// ./configs/acl.js

export const acl = {
  ...
}

export const can = (user, verb, subject, ...args) => {
  return acl[subject][verb](user, ...args)
}`

あとは、権限確認を行いたい場所からcanをimportして使用します。

Copied!

`import { can } from './configs/acl'
.
.
.

can(currentUser, 'create', 'article')`

これで、権限の知識はcan先輩の中に分離できました。
めでたしめでたし。

## おまけ：Vueの場合

### $canインスタンスメソッドを生やして便利にする

Vueのインスタンスメソッドにcanをラップした$canを生やすことで、とても扱いやすくなります。

Copied!

`// main.js
import Vue from 'vue'
import store from './store/'
import router from './router'
import { can } from './config' // ここは適宜読み替え

// Vuex storeのauthモジュールが現在のユーザ情報ならこんな感じ。
Vue.prototype.$can = (...args) => can(store.state.auth, ...args)
// 別の方法でユーザを取得するメソッドがあるなら、そいつもimportしてこんな感じ
Vue.prototype.$can = (...args) => can(someMethodToGetUser(), ...args)


const vm = new Vue({
  el: '\#app',
  store,
  router
})`

$canでcanをラップする際にユーザ情報を渡すようにしているのがミソで、
このように定義しておけばテンプレート内では`v-if="$can('create', 'article')"``v-if="$can('edit', 'article', article)"`
コンポーネント内では`methods: { hoge1 { return this.$can('crete', 'article')" } }``computed: { hoge2 { return this.$can('edit', 'article', article)" } }`

のように「何を」「どれに」「(オプションパラメータ)」
だけの記述でユーザの権限を確認できるようになります。

### その他いろいろ

- routeガード
コンポーネント内は上記方法でとてもスッキリ権限管理できますが、routerのrouteガードの書き方は少し工夫が必要かもしれません。
- aclオブジェクトとcanをクラスでラップしbuilderメソッドを増やして動的にリストを作成できるようにすれば、いろんなPJで使い回せるようになります。
- そしてそれをプラグイン化すると導入が簡単になります。
- Vueインスタンスメソッドだけではなく、ディレクティブ(v-can)を作成して更に便利にする事もできます。でも自分は書き方が統一できないのが嫌なのでやってません。

# あとがき

権限管理でボタン等を隠せたとしても、スキルのある人なら普通にイベント発火させたりできますし
apiアクセスも飛ばせます。なので、「ロール管理はフロント側でやってるから大丈夫だよ！」
などと安心せずにapiエンドポイント側でもしっかり権限によるガードはして下さい。