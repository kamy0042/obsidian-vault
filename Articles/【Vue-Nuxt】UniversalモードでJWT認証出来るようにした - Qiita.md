---
Created: 2021-01-15T18:11:00
URL: https://qiita.com/arthur_foreign/items/fadd784610d764419786
Tags: [topic/技術/セキュリティ]
---
## Nuxt.jsのUniversalモードのおさらい

> 'universal': アイソモーフィックなアプリケーション（サーバーサイドレンダリングに加え、クライアントでのナビゲーションを行う）
引用：https://ja.nuxtjs.org/api/configuration-mode/

Universalモードで開発するとSSRとCSRをやってくれるようですね。

SSRを利用する利点的なところは以下のサイトが参考になりました。

## nuxt.config.jsの設定をする

nuxt.config.js

`require('dotenv').config()
export default {
  srcDir: 'app/',
  mode: 'universal',
  plugins: ['@/plugins/axios.js'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    'cookie-universal-nuxt'
  ]
}`

※auth-moduleでOAuth認証しつつ、その情報をAPIに送信して保持しています。(今回はサインインについてのみ触れています。)

## axiosでエンドポイントのURLを設定

`API_URL = http://localhost:8080`

Nuxt.jsのaxios-moduleでは、`API_URL`を`.env`で設定してあげると、APIコールするエンドポイントのURLが設定されます。

すると、nuxt.config.jsでエンドポイントを設定してあげなくてよくなりますね。

### CORS対策でOriginをリクエストヘッダーに含める場合

毎回リクエストヘッダーにOriginを含めるのは面倒かと思いますので、以下のようにpluginsを利用して共通化しても良いかもしれません。

axios.js

`export default function({ $axios, app }) {
  $axios.onRequest((config) => {
    if (process.server) {
      config.headers.common.Origin = process.env.HOST // .envで任意のHOSTを設定してください
    }
  })
}`

認証を毎回しないといけない運用なら、Authorization: Bearer ヘッダも共通化してもよいのかもしれません。

## APIサーバーからJWTを取得

index.js

`export const actions = {
  async nuxtServerInit({ dispatch }, req) {
    await dispatch('user/initialAuth', req)
  }
}`

## 取得したJWTをCookieに保存してVuexで一時保管

user.js

`export const state = () => ({
  userToken: ''
})

export const mutations = {
  SET_USER_TOKEN(state, val) {
    state.userToken = val
  }
}

export const actions = {
  async initialAuth({ commit }, req) {
    await Promise.all([
      this.$axios
        .$post('/auth/session', { account_id: req.$auth.$state.user.id }) // auth-moduleで取得出来るアカウント情報
        .then((res) =>
          this.$cookies.set('token', res, { // APIサーバーから返却されたJWTをCookieで保持
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.HOST !== 'http://localhost:3000', // 開発中にsecure属性をつけるとSSR時にCookieが取れませんでした。
            sameSite: 'strict'
          })
        )
        .then((res) => commit('SET_USER_TOKEN', res))
        .catch((error) => console.log(error))
    ])
  }
}`

現プロジェクトでは、APIサーバーはGOのechoで開発しています。

JWTをWebStorageに入れる運用を避けるためにCookieを利用することとしました。

APIサーバーから返却されたJWTをCookieに保存しつつ、httpOnly属性 + secure属性 + sameSite属性(strict)を付与するようにしています。

そのため、SSR時に`app.$cookies.get('xxxxx')`でCookieを取得するようにしています。

また、Cookieに保存していたJWTをVuexに保存して、リクエスト時にヘッダーにJWTを含められるようにする運用です。

cookie-universal-nuxtの使い方は以下を参考にしました。

## リクエストヘッダーにJWTを含める

Vuexに保存しているJWTをリクエストヘッダーに含めてPOSTすることで、APIサーバー側はJWTを利用してユーザーを識別出来るようにしています。

article.js

`export const actions = {
  async postArticleInfo({ dispatch }, body) {
    await this.$axios
      .$post('/articles', body, {
        headers: { Authorization: `Bearer ${this.state.user.userToken}` }
      })
      .catch((error) => console.log(error))
  }
}`