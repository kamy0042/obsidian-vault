---
Created: 2021-01-15T18:11:00
URL: https://qiita.com/basho/items/acd6a17bb6e2a2f7a932
Tags: [topic/技術/セキュリティ]
---
davidroyerさんの[nuxt-ssr-firebase-auth.v2](https://github.com/davidroyer/nuxt-ssr-firebase-auth.v2)というリポジトリをベースに解説していきます。

# はじめに

この記事では

section1.未認証ユーザーをはじく実装
section2.新規登録(Email)の実装
section3.新規登録(Googleアカウント)の実装
section4.nuxtServerInitによる自動認証

の順でソースを読んで行きます。

## 認証方式

認証の実装はGoogleアカウントorEmailの2種類。
Firebase認証のソリューションは2つありますが、今回利用するのはFirebase SDK Authenticationです。後で詳しく触れます。
大まかな流れは、
クライアントのEmail・パスワードからJWTを取得 ⇒ storeとcookieに保存 ⇒ 認証です。sessionは利用しません。

認証におけるJWT(Json Web Token)の利用について下記がわかりやすいと思います。「JWT」と「cookieのsessionによる認証」の2つを比較した記事ですが、JWTをlocalStrageやcookieに保存する点での注意事項も記載されています。[JWT・Cookieそれぞれの認証方式のメリデメ比較](https://qiita.com/doyaaaaaken/items/02357c2ebca994160804)

簡単に説明すると、JSON Web Tokenとは、ユーザー識別用のIDと有効期限が含まれた改ざん検証が可能なデータです。「ログイン済みです」という証をクライアント側が保持しているんですね。見た目はドット区切りで　{base64エンコードしたuserデータ}.{base64エンコードした有効期限}.{署名}　というフォーマットです。別のユーザーになりすまそうとして改ざんしたり、有効期限を改ざんしても署名による検証でひっかかります。

## ディレクトリ構造

この記事の説明に関連するディレクトリの構造は下記です。

`  ├firebase/
  |  └app.js
  ├helpers/
  |  └index.js
  ├layouts/
  |  ├default.vue
  |  └protected.vue
  ├middleware/
  |  ├authenticated.js
  |  ├check-auth.js
  |  └handle-login-route.js
  ├page/
  |  ├index.vue  //topページ
  |  ├auth/
  |  |  ├signin.vue
  |  |  └signup.vue
  |  └protected/
  |     └index.vue //認証済みのユーザーのみ閲覧可能。
  └store
     ├modules/
     |  └user.js
     └index.js`

# リーディング

まずは認証されていないユーザーがどのようにはじかれているのかを確認するところからはじめます！

## section1.未認証ユーザーをはじく

未認証のユーザーをはじく機能はlayoutsとmiddleware、そしてstoreが担っています。

page -- > layouts --> middleware -- >storeの順でソースを見てみましょう。

### page/protected/index.vue

- page/index.vueは認証不要なトップページ
- page/protected/index.vueは認証済みユーザーのみアクセスできるページです。

今回の実装の場合、「認証不要なページ」と「認証済みユーザーのみアクセスできるページ」の違いはlayoutにprotectedを指定しているか否かだけです。
新たにページを作る際も、これを指定するだけで未認証ユーザーをはじくことができます。

pageにおける実装のコードもたったの1行。

page/protected/index.vue

`//...略
<script>
  import { mapGetters } from 'vuex'
  import firebaseApp from '~/firebase/app.js'

  export default {
    layout: 'protected', //ここでlayoutを指定しています。
    data () {
//...略`

では次にこのlayoutでは何を行っているのかを見てみます。

### layoutsは以下の2つ

リポジトリを見るとlayoutsは2つのみです。それぞれの役割は下記。

- `-|layouts/
----|default.vue //誰でも見れるページ用
----|protected.vue //認証済みユーザーのみのページ用`

もちろん、default.vueでは特別な処理は行いません。肝心なのはprotected.vueの方です。コードは以下。

layouts/protected.vue

`//...略
<script>
  import { mapActions } from 'vuex'

  export default {
    middleware: 'authenticated', //ここでmiddlewareを指定しています。
    methods: {
//...略`

Nuxt.jsにおけるmiddlewareの適用方法をここで改めて整理しておきます。全部で3つあります。

1. nuxt.config.jsで指定
2. layoutでミドルウェアを指定 --> pageでlayoutを読み込む
3. 各ページでミドルウェアを指定。

今回はlayoutで指定する2番ですね。
middlewareはページがレンダリングされる前に実行されます。

今回の実装では、レンダリング前に「認証済みか否かをチェックして未認証の場合はリダイレクトする」ことで未認証ユーザーを弾いていることがわかります。ではmiddlewareのコードを見てみましょう。

### middlewareのソース

- `-|middleware/
----|authenticated.js //上記で呼び出されていたmiddleware
----|check-auth.js
----|handle-login-route.js`

それぞれの役割は以下です。

名前
役割




authenticated.js
認証済みかチェック。未認証ならsign inページへリダイレクト。未認証ユーザーがprotectedページへ遷移しようとしたときに実行されます。


check-auth.js
ご自由に使えます。中身はstore/index.jsと似ています。


handle-login-route.js
認証済みかチェック。認証済みならprotectedへリダイレクト。認証済みユーザーがログインページへ遷移しようとしたときに実行されます。

layouts/protected.vueで呼び出されていたauthenticated.jsのコードは次のようになっています。

authenticated.js

`export default function ({ store, redirect }) {
  if (!store.getters['modules/user/isAuthenticated']) {
    return redirect('/auth/signin')
  }
}`

gettersでstoreからisAuthenticatedを取得していますね。
このisAuthenticatedで認証済/未認証チェックを行い、falseの場合はsigninページへリダイレクトしています。

ちなみに、Nuxt.js公式のmiddlewareの解説もほとんど同じコードです。公式の場合はpageに直接middlewareを指定している例ですね。[API: middleware プロパティ 公式](https://ja.nuxtjs.org/api/pages-middleware/)

### 最後にstoreです

- `-|store/
----|index.js
----|modules/
------|user.js //上記で呼び出していたstore`

それぞれの役割は下記

名前
役割




index.js
nuxtServerInitでcookieをチェック。認証データがあれば自動ログインさせます。


user.js
userデータを保持。login/logout/cookieへのデータ登録を行います。認証済みかチェックするためには、userデータが存在するかどうかをチェックします。

user.jsのソースを見てみます。

store/modules/user.js

`import firebaseApp from '~/firebase/app'
import Cookies from 'js-cookie'
// state
export const state = () => ({
  uid: null,  //userのID
  user: null  //userのデータ
})


// getters
export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },
  user(state) {
    return state.user
  },

  //上記middlewareで呼び出されていた認証チェック
  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  }
}

export const actions = {
//略`

isAuthenticatedではuserのidが存在するかをチェックしていることがわかりますね。省略しましたが、先述の通りuser.jsはlogin/logoutの機能も担っています。新規登録の実装を見ながらlogin/logoutの機能にも触れていきます。

## section2.新規登録(Email)の実装

このセクションではfirebaseAppの機能も参照しながら、新規登録の実装を読んでいきます。

### 前提の確認

4. 上記の認証の流れから、新規登録時にはuser.jsのstate.userにデータを格納しているのだろうというのはわかっています。
5. 新規登録はGoogleアカウントとEmailの2つが利用できます。

改めてpagesの構造です。役割も追記しました。

- `-|page/
----|index.vue //topページ
----|auth/
------|signin.vue //次のsectionで扱う。Googleアカウントによる新規登録を担う。
------|signup.vue //このsectionで扱う。Emailによる新規登録を担う。
----|protected/
------|index.vue //前section1。認証済みのユーザーのみ閲覧可能。`

GoogleアカウントとEmailでそれぞれ新規登録のpageが異なりますね。
では、まずはEmailの方から見ていきましょう。

### その前に認証ソリューションもおさらい

ソースを見る前に改めてfirebaseの認証ソリューションをおさらいしておきます。
大きく2つの方法があります。

名前
解説




FirebaseUI Auth
FirebaseUI に備わっているドロップイン認証ソリューションは、メールアドレスとパスワード、電話番号を使用したり、Google ログインや Facebook ログインなどの一般的なフェデレーション ID プロバイダを使用したりしてユーザーをログインさせるための UI フローを処理します。


Firebase SDK Authentication
1つまたは複数のログイン方法を手動でアプリに統合することができる。メールアドレスとパスワードを使用した認証、Google、Facebook、Twitter、GitHub アカウントを使用した認証、電話番号認証、匿名認証など。

[Firebase Authentication 公式](https://firebase.google.com/docs/auth?hl=ja)より一部引用。
Google推奨のソリューションはFirebaseUI Authですが、今回扱っているのはFirebase SDK Authenticationです。

公式のJavaScriptによる認証の解説ページは[こちら](https://firebase.google.com/docs/auth/web/password-auth?hl=ja)。

### signup.vue（Email登録）

さっそくコードを見ていきます。

pages/auth/signup.vue

`<template>
  <section class="container">
    <div>
      <!-- ログインページへのリンク -->
      <nuxt-link to="/auth/signin">Already a user? Sign-in</nuxt-link>
    </div>
    <div>
      <!-- サインアップ -->
      <form @submit.prevent="signUp">
        <label for="usernameTxt">Username:</label>
        <input id="usernameTxt" type="text" v-model="email">
        <label for="passwordTxt">Password:</label>
        <input id="passwordTxt" type="password" v-model="password">
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import firebaseApp from '~/firebase/app'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('modules/user', [ 'login' ]),
    async signUp () {
      try {
        const firebaseUser = await　 firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password) //①

        await this.writeUserData(firebaseUser.uid, firebaseUser.email) //この1行は一旦無視
        await this.login(firebaseUser.uid) //②
        this.$router.push('/protected') //③
      } catch (error) {
        console.log(error.message)
      }
    },
    writeUserData (userId, email) {
      return firebaseApp.database().ref('users/' + userId).set({
        email: email
      })
    }
  }
}
</script>

<style scoped>
//略`

上記コメントの①②③の順で見ていきます。
大まかに、以下の流れです。

- ①でfirebaseの認証
- ②でstoreへの登録、cookieへの登録
- ③でリダイレクト

### ①createUserWithEmailAndPassword

Emailとパスワードから新規アカウントを作成するには、
createUserWithEmailAndPasswordを利用します。[公式のAPIリファレンスページはこちら。](https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html?hl=ja#createuserwithemailandpassword)

`createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential>`

2つのstring（emailとpassword）を受けて、Promiseを返します。
また、新しいアカウントが作成されると、そのユーザーは自動的にログインされた状態になります。
User情報はUserCredentialから参照することができます。フェデレーション ID プロバイダ(Googleアカウント・Facebookアカウントなど）での認証時にはproviderIDなどの情報も参照できるようです。

### ②storeへの登録、cookieへの登録

①で「新しいアカウントが作成されると、そのユーザーは自動的にログインされた状態になります。」と述べましたが、storeやcookieにログイン情報を登録しておかないとNuxt.jsは認証ユーザーか未認証ユーザーかの判別がつきません。

②ではその処理を行っています。
①で取得したデータ（firebaseUser）をstoreに登録するために呼び出しているthis.login(firebaseUser.uid)。
store/modules/user.jsでそのソースを見てみましょう。以下のコメント「ログイン処理」の部分です。

store/modules/user.js

`import firebaseApp from '~/firebase/app'
import Cookies from 'js-cookie'
//略
export const actions = {
  //ログイン処理
  async login({dispatch, state}, user) {
    console.log('[STORE ACTIONS] - login')
    const token = await firebaseApp.auth().currentUser.getIdToken(true) //②-1
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    }
    Cookies.set('access_token', token)  //②-2
    await dispatch('setUSER', userInfo) //②-3
    await dispatch('saveUID', userInfo.uid)
    console.log('[STORE ACTIONS] - in login, response:', status)

  },
  //ログアウト処理
  async logout({commit, dispatch}) {
    console.log('[STORE ACTIONS] - logout')
    await firebaseApp.auth().signOut()

    Cookies.remove('access_token');
    commit('setUSER', null)
    commit('saveUID', null)
  },
//略`

### ②-1 currentUser.getIdToken(true)

ログインしているユーザーは、firebaseApp.auth().currentUserで取得できます。
②では、更にgetIdTokenメソッドを呼び出してJWT(JSON Web Token)を取得しています。

`getIdToken(forceRefresh?: boolean): Promise<string>`

[公式レファレンス User getIdToken](https://firebase.google.com/docs/reference/js/firebase.User.html?hl=ja#getidtoken)

### ②-2 Cookies.set

取得したJWTをcookieにセット。

### ②-3 dispatch('setUSER', userInfo)

userデータをstoreに保存。
ログアウト処理を見ると、ログアウト時にcookieとstoreからuserデータを削除しているのも確認できますね。

### ③でリダイレクト

リダイレクト時にはstoreにuserデータが保存されているので、section1で見たmiddlewareも素通りできます。
ちなみに無視した1行はデータベースへのユーザー情報の登録です。このリポジトリはログインしたユーザーがデータベースのユーザー情報を閲覧できるようなデモになっています。今回は扱わないのでpages/protected/index.vueを参照ください。

## section3.新規登録(Googleアカウント)の実装

Googleアカウントによる認証もほとんど同じです。

### pages/auth/signin.vue(Googleアカウントによる新規登録)

既存ユーザーのログイン処理のコードが目立ちますが、fbGoogleLoginの処理を見ていきます。

pages/auth/signin.vue

`<template>
  <section class="container">
    <div>
      <nuxt-link to="/auth/signup">Not a user? Sign-up</nuxt-link>
    </div>
    <div>
      <form @submit.prevent="submit">//このformは既存ユーザーのログイン処理用
        <label for="usernameTxt">Username:</label>
        <input id="usernameTxt" type="email" v-model="email">
        <label for="passwordTxt">Password:</label>
        <input id="passwordTxt" type="password" v-model="password">
        <button type="submit">Sign In</button>
      </form>
      //以下を見ていきます。
      <button class="button" @click.prevent="fbGoogleLogin">Google Login</button>
      <button class="button" @click.prevent="fbGoogleLogout">Google Logout</button>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import firebaseApp, { googleProvider } from "~/firebase/app";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  //section1で触れたようにログイン済みのユーザーはこのページにアクセスできません。middlewareでリダイレクトされます。
  middleware: ["handle-login-route"], 
  methods: {
    ...mapActions("modules/user", ["login"]),
    //既存ユーザーのlogin処理
    submit() { 
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(firebaseUser => {
          return this.login(firebaseUser.uid);
        })
        .then(() => {
          this.$router.push("/protected");
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    //Googleアカウントによるログイン
    async fbGoogleLogin() {
      const { user } = await firebaseApp.auth().signInWithPopup(googleProvider);　//③-1
      await this.login(user); //③-2
      this.$router.push("/protected");
    },
    async fbGoogleLogout() {
      await this.logout();
      this.$router.push("/");
    }
  }
};
</script>
//略`

ここで利用しているのはfirebaseApp.auth().signInWithPopup(googleProvider)。
戻り値は先程のcreateUserWithEmailAndPassword(email: string, password: string)と同じPromiseですね。

`signInWithPopup(provider: AuthProvider): Promise<UserCredential>`

[公式レファレンス](https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html?hl=ja#signinwithpopup)

### ③-1 firebaseApp.auth().signInWithPopup

引数で渡しているgoogleProviderはあらかじめ~/firebase/appでexportしてあるものを読み込んでいます。SDKから簡単に作れます。

### ③-2 login

③-1で取得したUserCredentialのデータをuserに格納し、先のEmail認証と同じくlogin処理をstoreに投げてログインを完了させています。

### login処理

ここまでくれば、上記sumit()によるログイン処理もなんとなく想像がつくと思います。再度抜粋します。

`submit() { //既存ユーザーのlogin処理
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(this.email, this.password)  //tokenの取得
    .then(firebaseUser => {
      return this.login(firebaseUser.uid);  //store・cookieへの登録
    })
    .then(() => {
      this.$router.push("/protected");  //リダイレクト
    })
    .catch(error => {
      console.log(error.message);
    });`

## section4.nuxtServerInitによる自動認証

ここまでで認証関連はほとんど説明しました。

最後に、cookieを利用したログインしっぱなしの状態の実現を見てみます。
以下の記事にもあるように、storeのデータは簡単に飛んでしまいます。

> window.location や href でページ遷移すると、Storeに格納にした状態が飛ぶ。理由としてはページが初回ロード扱いとなるため。nuxtServerInitアクションで状態を復元するコードを書かなくてはならない。NuxtLink や this.$router.pushを使用してページ遷移すると、ページが初期化されないため状態が維持される。

[Nuxt.js 状態管理でハマった件 Qiita](https://qiita.com/shintarogit/items/c14cf6156201e0b8667a)

ログイン状態を維持するためには欠かせない処理ですね。

まずは、store/index.jsを見てみます。

store/index.js

`import {getUserFromCookie, getUserFromSession} from '@/helpers'

export const actions = {

  async nuxtServerInit ({ dispatch }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('modules/user/setUSER', { name: user.name, email: user.email, avatar: user.picture, uid: user.user_id})
    }
  }
}`

nuxtServerInitで/helpers/index.jsのgetUserFromCookie()を呼び出しています。

getUserFromCookie()のソースは

/helpers/index.js

`import jwtDecode from 'jwt-decode'
var cookieparser = require('cookieparser')

export function getUserFromCookie (req) {
  if (process.server && process.static) return //①
  if (!req.headers.cookie) return //②

  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token
    if (!accessTokenCookie) return

    const decodedToken = jwtDecode(accessTokenCookie) //③
    if (!decodedToken) return

    return decodedToken
  }
}
// 略`

getUserFromCookieで行っているのは、cookieからアクセストークンを取り出して、jwtDecodeにかけて返すところまでですね。

### ①でチェックしているのは、

- サーバーサイドの処理であるか否か
- nuxt genrateで作られた静的サイトであるか否か

ページがサーバでレンダリングされている時にcookieを探しても意味はないので、どちらかがtrueの場合は処理しません。

[プラグイン利用 nuxt.js公式](https://ja.nuxtjs.org/guide/plugins/#%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%B5%E3%82%A4%E3%83%89%E9%99%90%E5%AE%9A%E3%81%AE%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E5%88%A9%E7%94%A8)

### ②cookieが無い場合は処理しません。

### ③JWTをデコード。

JWTをデコード。その後、store/index.jsに戻って、デコードされたデータから、ユーザーの名前やemailアドレス、idを取り出しstoreにdispatchしています。

こうしてserverinitが完了した後、トップページのindex.vueにレンダリングが行われます。下記のソースgettersでuidを取得できるのでSigninではなく、Logoutのリンクが表示されることがわかります。

pages/index.vue

`//略
<template>
  <section>
    <div>
      <div>
        <nuxt-link to="/protected">Protected</nuxt-link>
        <nuxt-link v-if="uid" to="/auth/signin">Logout</nuxt-link>
        <nuxt-link v-else to="/auth/signin">Sign In</nuxt-link>
      </div>
      <h2>Updated with Cookie check in nuxt server init</h2>
      <p>
        Unprotected page --- anyone can see this
      </p>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('modules/user', [
        'uid'
      ])
    }
  }
//略`

# 最後に

以上です。
間違いなどありましたらご指摘いただけるとありがたいです。