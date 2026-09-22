---
Created: 2021-01-15T18:11:00
URL: https://reffect.co.jp/vue/nuxt-js-auth-setting-with-backend
Tags: [topic/技術/セキュリティ]
---
![](https://reffect.co.jp/wp-content/uploads/2019/12/vue_nuxt-1024x585.png)

本文書ではNuxt.jsのモジュールnuxtjs/authを利用してTokenを利用したJWTのAuth(認証)の設定を行っています。Nuxt.jsで認証を行うためにはバックエンドが必要になります。バックエンドはExpress.jsを使って構築します。本文書を読むことでNuxt.js環境でTokenを利用したユーザ認証の設定手順の流れを理解することができます。

Tokenを使って認証の設定が行えることを目的としているので入力フォームのデザイン、バリデーションやセキュリティについての説明は行っていません。特にセキュリティについて設定方法がわかった後にしっかりと勉強してください。

Express.jsを使ったバックエンドの設定については一緒に記述すると文書が長くなるため別の文書として作成しています。

目次

## バックエンドサーバの設定

本文書で利用するバックエンドサーバExpress.jsの構築はは下記の文書の通り行っています。

[あわせて読みたい](https://reffect.co.jp/node-js/express-js%e3%81%a7json-web-tokenjwt%e3%81%ae%e8%a8%ad%e5%ae%9a%e3%82%92%e8%a1%8c%e3%81%86)[Express.jsでJSON WEB TOKEN(JWT)の設定を行う](https://reffect.co.jp/node-js/express-js%e3%81%a7json-web-tokenjwt%e3%81%ae%e8%a8%ad%e5%ae%9a%e3%82%92%e8%a1%8c%e3%81%86)

![](https://reffect.co.jp/wp-content/uploads/2019/12/JWT_token_express.png)

バックエンドサーバ構築完了後に下記の処理を行うことができます。

http://localhost:5000/api/auth/registerにPOSTリクエスト(ユーザ名、メールアドレス、パスワード)があった場合にデータベースにユーザを登録します。http://localhost:5000/api/auth/loginにPOSTリクエストでメールアドレスとパスワードが送られてきた場合認証を行い、登録したユーザと一致すればTokenを返します。http://localhost:5000/api/auth/userにヘッダーに受け取ったTokenをつけてGETリクエストを送りTokenに問題がなければユーザ情報を戻します。

## Nuxt.jsのインストール

npx create-nuxt-appコマンドを利用してnuxt-secondという名前のプロジェクトを作成します。

```plain text

$ npx create-nuxt-app nuxt-second

```

nuxt.jsのインストールについては下記の文書に記述しています。インストール途中にサーバフレームワークの設定でExpress.jsが選択肢に出てきますが、選択する必要はありません。モジュールの選択ではaxiosを選択してください。

[あわせて読みたい](https://reffect.co.jp/vue/nuxt-js-first-step)[ゼロからしっかり理解したい人向けのNuxt.js入門](https://reffect.co.jp/vue/nuxt-js-first-step)

![](https://reffect.co.jp/wp-content/uploads/2019/12/vue_nuxt-350x200.png)

### nuxtjs/authのインストール

Nuxt.jsにはAuth用のモジュールが準備されているのでそのモジュールを利用します。npm installコマンドで@nuxtjs/authをインストールします。

```plain text

 $ npm install @nuxtjs/auth

```

Express.jsサーバにリクエストを送る時はaxiosを利用して行います。もしNuxt.jsをインストールする際にインストールを行っていない場合はnpm install @nuxtjs/axiosでインストールしてください。

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

Nuxt.jsの設定ファイルであるnuxt.config.jsにインストールしたnuxtjs/authモジュールの情報を追加します。

```plain text

** Nuxt.js modules
*/
modules: [
  '@nuxtjs/axios',  
  '@nuxtjs/auth'
],

```

追加した直後にnpm run dev を実行するとエラーが発生します。エラーを回避するためにはVuex用のstoreディレクトリの下にindex.jsを作成しておく必要があります。nuxtjs/authでVuexを利用しているためです。index.jsが作成済みの場合はエラーは発生しません。

```plain text

FATAL  Enable vuex store by creating store/index.js.       nuxt:auth 23:39:56


   ╭─────────────────────────────────────────────────────╮
   │                                                     │
   │   ✖ Nuxt Fatal Error                                │
   │                                                     │
   │   Enable vuex store by creating `store/index.js`

```

## nuxtjs/authの設定

### エンドポイントの設定

ユーザの認証を行うためサーバ側にアクセスする必要があります。それらの設定は個別に行うのではなくnuxtconfig.jsファイルにエンドポイントとして追加します。[nuxt.js/authのドキュメント](https://auth.nuxtjs.org/schemes/local.html#usage)に記述されている内容を最初はコピー&ペーストして使います。

```plain text

auth: {
  strategies: {
    local: {
      endpoints: {
        login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
        logout: { url: '/api/auth/logout', method: 'post' },
        user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
      },
      // tokenRequired: true,
      // tokenType: 'bearer'
    }
  }
}

```

ドキュメント通りに設定していますが、後ほど値を変更します。

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

バックエンドサーバにはaxiosを利用してリクエストを送ることまたバックエンドサーバは構築済みなのでaxiosのbaseURLにサーバのURLを設定しておきます。

```plain text

axios: {
  baseURL: 'http://localhost:5000/',
},

```

## ログイン処理の設定

通常ではユーザの登録が必要ですが、Express.jsサーバの構築時にユーザ作成が完了しているのでそのユーザを利用してログイン処理の動作確認を行います。

### ログインフォームの作成と動作確認

ログインフォームを記述したlogin.vueファイルを作成します。input要素を2つ用意し、メールアドレスとパスワードを入力する項目とします。

```plain text

<template>
<div>
  <div>
  <h1>ログインユーザ</h1>
  <form @submit.prevent="loginUser">
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" v-model="user.password">
    </div>
    <button type="submit">ログイン</button>
  </form>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return {
        user:{
          email:'',
          password:''
        }
      }
    },
    methods:{
      loginUser(){
        this.$auth.loginWith('local',{
          data:this.user
        })
      },
    }
  }
</script>

```

submitボタンにはクリックイベントを設定し、ログイン情報入力後にクリックすると実行されるloginUserメソッドが実行されます。loginUserメソッドの中にログインに関する処理を記述していきます。

nuxtjs/authを利用しているので、this.$auth.loginWithを追加して引数に送信するuser情報を設定するだけで設定は完了です。loginWithの引数のlocalはnuxt.config.jsのendpointsで追加したstrategiesのlocalに対応します。これらの情報が送信される先はnuxtcofig.jsで設定したloginのurlになります。

```plain text

methods:{
  loginUser(){
    this.$auth.loginWith('local',{
      data:this.user
    })
  },
}

```

ここまでの設定でExpress.jsサーバ側にログインフォームから送信するユーザ情報の入ったPOSTリクエストが送信されるのか確認してみましょう。

Express.jsのindex.jsファイルの/api/auth/loginに下記を追加してPOSTリクエストで送られてくる内容を表示します。

```plain text

app.post('/api/auth/login/',(req,res) => {
  return console.log(req.body)
  const sql = 'select * from users where email = ?'
  const params = [req.body.email]

```

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-2.png)

ログインを行う

EmailとPasswordを入力してログインボタンを押してもブラウザ上には何も変化はありません。その場合はデベロッパーツールのコンソールを確認し、エラーが発生していないか確認します。今回は、corsのエラーが発生していることが確認できます。

```plain text

Access to XMLHttpRequest at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

```

Express.js側でのcorsのインストールを行う必要があります。

```plain text

 $ npm install cors

```

Express.jsファイルのindex.jsファイル内でcorsをrequireを使って読み込み設定を行います。

```plain text

const cors = require('cors')
app.use(cors())

```

corsの設定が完了したので、Nuxt.jsからExpress.jsへのアクセスが可能となります。再度ログインフォームにメールアドレスとパスワードを入れてログインボタンを押すとExpress.jsを起動しているコンソールに送信した内容が表示されます。nuxt.config.jsの設定通りにExpress.jsサーバ側の/api/auth/loginにPOSTリクエストが送信されていることが確認できました。

```plain text

[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
Example app listening on port 5000!
Connected to the SQlite database.
{ email: 'kevin@test.co', password: 'password' }

```

Express.js側の設定が完了しているのでEmailとパスワードに間違いがなければユーザ認証は問題なく行われ、サーバ側からTokenが戻されます。

### Tokenを確認

ユーザの認証が完了しTokenを受け取るとそのままendpointで設定したuserのurlの/api/auth/userにアクセスしてユーザ情報を取得します。user情報を受け取る前に/api/auth/userの処理でヘッダーを確認しToken情報を確認しておきます。

/api/auth/userにアクセスする時はログイン処理で受け取ったTokenをサーバ側に送信するので送られてくるGETリクエストのヘッダーを確認してみましょう。

```plain text

app.get('/api/auth/user/',(req,res) => {

  const headers = req.headers

  return console.log(headers)

  const bearToken = req.headers['authorization']

```

ログインフォームにEmailとパスワードを入れてログインボタンを押すとExpress.jsサーバを起動(npx nodemon index.js)しているコンソールにヘッダー情報が表示されます。authorizationに Bearer + トークンが設定されていることが確認できます。

```plain text

Example app listening on port 5000!
Connected to the SQlite database.
{
  host: 'localhost:5000',
  connection: 'keep-alive',
  accept: 'application/json, text/plain, */*',
  origin: 'http://localhost:3000',
  authorization: 'Bearer ' +
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6ImtldmluIiwiZW1haWwiOiJrZXZpbkB0ZXN0LmNvbSIsImlhdCI6MTU3NzE2NTYyN30.w0KtYx_PVPNtKfnQK_4qPzFgOz3wj4YM5eXmibOKh8c',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 ' +
    'Safari/537.36',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  referer: 'http://localhost:3000/login',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
  'if-none-match': 'W/"4a-QvaCKH3FNt9xY+2bZiBbcCeAdC0"'
}

```

もし認証できない誤ったメールアドレスとパスワードでアクセスした場合は、Bearerはundefinedと表示されます。

```plain text

{
  host: 'localhost:5000',
  connection: 'keep-alive',
  accept: 'application/json, text/plain, */*',
  origin: 'http://localhost:3000',
  authorization: 'Bearer undefined',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 ' +
    'Safari/537.36',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  referer: 'http://localhost:3000/login',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
  'if-none-match': 'W/"4a-QvaCKH3FNt9xY+2bZiBbcCeAdC0"'
}

```

### Tokenを使ってuser情報を取得した後

ユーザのログイン認証が完了してTokenを取得し、Tokenを使ってユーザ情報を取得した後Nuxt.js上でどのようにユーザ情報にアクセスできるのかを確認していきます。

$authを使ってログイン状態やユーザ情報にアクセスすることができます。

### ログイン状態の確認

ログイン状態の確認は、$auth.loggedInで確認できます。index.vueファイルを開いて{{ $auth.loginIn }}を追加します。ログインページへのリンクも設定しておきます。

```plain text

<template>
  <div class="container">
    <div>
      <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
      <div>
        <nav>
        <nuxt-link to="/login">Login</nuxt-link>
        </nav>
      </div>
      <logo />

```

ブラウザで確認するとログインが行われていない状態では$auth.loggedInはfalseになっていることが確認できます。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-3.png)

ログイン状態の確認

Loginリンクからログイン画面に移動してログインを行います。ログインが完了すると自動で”/”にリダイレクトされます。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-2.png)

ログインを行う

リダイレクトされたトップのページではログインが完了しているので$auth.loggedInがtrueに変わります。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-4.png)

ログイン状態の確認　true

$store.

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

### ユーザ情報へのアクセス

ログインしているユーザへのアクセスは$auth.userで行うことができます。ログインした状態であれば{{ $auth.user }}でユーザ情報に入っている情報を確認することができます。

```plain text

<h2>ログイン状態:{{ $auth.loggedIn }}</h2>
<p>{{ $auth.user }}</p>

```

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-5.png)

ユーザ情報を表示

ユーザ情報について$store.state.auth.userからもアクセスすることができます。保持している情報$auth.usrと同じです。

### ローカルストレージとCookieを確認

Token情報がどこに保存されているのか確認してみましょう。確認するためにはChromeのデベロッパーツールを利用します。ツールのApplicationタグを選択してLocal Storageを確認してください。auth_token.localにTokenが設定されていることが確認できます。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-6.png)

ローカルストレージ

また、Cookiesの中身も確認してみましょう。Local Storageと同様にCookiesの中にもTokenの情報が保存されていることが確認できます。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-7.png)

Cookieの中身を確認

Local Storage, Cookieの設定はnuxt.config.jsファイルで無効にすることも可能です。

```plain text

auth: {
  cookie: false,
  // localStorage: false,
}

```

### ログアウト処理

ログアウト処理は$auth.logout()を実行することでLocal StorageとCookieに保存されているTokenを削除することで完了します。ログインしている場合のログアウトボタンを表示させています。

```plain text

<h2>ログイン状態:{{ $auth.loggedIn }}</h2>
<p>{{ $store.state.auth.user }}</p>
<div>
  <nav>
  <nuxt-link to="/login">Login</nuxt-link>
  </nav>
</div>
<div v-if="$auth.loggedIn">
  <button @click="$auth.logout()">logout</button>
</div>

```

$auth.logout()を実行した時にTokenを削除するだけではなくバックエンドサーバへアクセスを行いサーバ側でなにか処理を行うことも可能です。そのためnuxt.config.jsのendpointsのlogoutにサーバ側にアクセスするURLが記述されています。

```plain text

logout: { url: '/api/auth/logout', method: 'post' },

```

しかし、今回はlogout後にサーバ側での処理は必要ないのでfalseを設定します。falseを設定すると$auth.logout()を実行した時にバックエンドのサーバへのアクセスはなくCookieとLocal StorageからTokenの削除のみ行われます。

```plain text

logout: false,

```

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-8.png)

ログイン中なのでログアウトボタン表示

logoutボタンをクリックするとログイン状態はfalseに変更。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-9.png)

ログアウト状態

CookiesとLocal Storageを確認すると値が消えていることが確認できます。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-10.png)

Local StorageのTokenの値はなし

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-11.png)

Cookieの値もなし

ここまでの動作確認を通して、バックエンドサーバから取得したTokenはlogoutを行うまでブラウザのLocal StorageとCookiesに保管されていることがわかりました。ブラウザを一度閉じて、再度起動後にアクセスしてください。ログイン状態が保存されていることが確認できます。

## ユーザ登録

これまでは登録済みのユーザを利用して認証の動作確認を行ってきましたがここではNuxt.jsからのユーザ登録方法について確認を行っていきます。

### ユーザ登録フォームの作成

ログインフォームを元にユーザ登録フォームを作成していきます。register.vueファイルを作成します。

ユーザ登録フォームにはユーザ名とメールアドレスとパスワードの3つの項目を用意します。入力フォームにユーザを登録後、登録ボタンを押すとregisterUserメソッドが実行されます。

```plain text

<template>
<div>
  <div>
  <h1>ユーザ登録</h1>
  <form @submit.prevent="registerUser">
    <div class="form-group">
      <label for="name">Name:</label>
      <input v-model="user.name">
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" v-model="user.password">
    </div>
    <button type="submit">登録</button>
  </form>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return {
        user:{
          name:'Steve Harry',
          email:'steve@test.com',
          password:'password'
        }
      }
    },
    methods:{
      registerUser(){
        this.$axios.post('/api/auth/register',this.user)
                    .then((response) => {
                        this.$auth.loginWith('local',{
                            data: this.user
                    })
        })
      },
    }
  }
</script>

```

registerUserメソッド内ではExpress.js側にある/api/auth/registerに対してaxiosを利用してPOSTリクエストを送信します。POSTリクエストでユーザ登録が完了したら、そのままログイン処理を行うだけです。ログイン処理がわかっていれば難しい箇所はありません。

新しいユーザ情報を入力して登録ボタンを押すとそのままログインまで完了し”/”にリダイレクトされ登録したユーザ情報が画面に表示されます。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-12.png)

ユーザ登録画面

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-13.png)

登録したユーザのログイン後の画面

## middlewareでアクセス制限

ログインしていないユーザに表示させたくないページがある場合にmiddlewareを利用するとアクセスの制限を行うことができます。

新たに新規にpagesディレクトリの下にAbout.vueファイルを作成します。Nuxt.jsなのでpagesディレクトリの下にファイルを作成すると自動でルーティングを設定してくれます。

```plain text

<template>
    <h1>これはAboutページです。</h1>
</template>
<script>
export default {
 
}
</script>

```

ログインしているしていないに関わらず/aboutにアクセスすると以下のページが表示されます。

![](https://reffect.co.jp/wp-content/uploads/2019/12/nuxt-auth-14.png)

Aboutページを表示

このページをログインしているユーザのみしかアクセスできないようにmiddlewareを使って制限します。設定はシンプルでAbout.vueファイルのscriptタグの中に以下を追加するだけです。nuxtjs/authの機能です。

```plain text

export default {
    middleware: 'auth'
}

```

設定を行った後にログインしていないユーザでアクセスすると/loginにリダイレクトされます。リダイレクト先の/loginはデフォルトの設定値です。

ログイン画面が表示されるので、ログインを行うと/aboutページにアクセスすることが可能になります。

### すべてのページに一括で制限を行う

先程の場合は/aboutのみ個別でアクセスの制限を行いました。一括で設定を行いたい場合は、nuxt.config.jsで下記の設定を行う必要があります。

```plain text

  router: {
    middleware: ['auth']
  },

```

設定を行うとログインしていない場合は/aboutにアクセスすると/loginにリダイレクトされます。

nuxt.config.jsで一括に制限を行った時、ある特定のページのみログインしていてもしてなくてもアクセスを許可するためには下記の設定をページに設定します。

```plain text

export default {
    auth: false
}

```