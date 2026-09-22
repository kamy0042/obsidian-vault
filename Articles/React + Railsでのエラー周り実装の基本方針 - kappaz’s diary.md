---
Created: 2021-08-28T04:07:00
URL: https://kappaz.hatenablog.com/entry/2020/08/23/230400
Tags: [topic/技術/React]
---
![[Attachments/無題のフォルダ/og-image-1500 2.png]]

タイトルの通り。そんな大した話ではないが今後の基本方針としてメモ。まぁ浅い内容。

動くコードは以下参照。

気にするべきエラーをひとまず以下の形で分類。

以下詳細

## フロント: 入力値のValidation

入力値のValidationは[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ライブラリ(ant design)に任せる形をとる。 自分で実装する場合はValidation結果はなるべく[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ローカルのstateにエラーの情報を持たせる方向を取りたい(reduxのstoreは使わない)

## フロント: [API](http://d.hatena.ne.jp/keyword/API)レスポンス

fetch等で[API](http://d.hatena.ne.jp/keyword/API)を叩いた結果、返ってきたレスポンスがエラーだった(4XX等)の場合の処理。 axiosであれば2XX以外は例外として処理されるので、catchして受け取ったエラーの中身をグローバルのstoreに反映させる。 反映結果を元に必要に応じてエラーメッセージを表示する

### axiosでcatchする場合の注意点

axiosを使った場合、catchで受け取ったエラー情報は以下のように`error.response`の形を取らないと参照できない。

```plain text
axios.post('/test/create', this.formData)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error.response)
  });
```

### async/awaitでエラー処理を書く際のパターン

以下の参考記事の通りいくつかパターンがあるので状況に応じて好きなものを使う。

個人的にお気に入りなのは、以下の「3. async function 内でエラーハンドリングしない」パターン。

```plain text
const asyncFuncHandleErrorOut = async () => {
  const result = await errorPromise()
  console.log(result) // unreachable
}

// async function を呼ぶ時にエラーハンドリング
asyncFuncHandleErrorOut()
  .catch(err => console.log(err)) // Some error occured
```

成功時、失敗の処理をキッチリ分けられる & 個人的にtry-catchの形があまり好きでない という理由から推しの手法。

参考サイト:

[[フロントエンド] axiosライブラリを使って、柔軟にHTTP通信を行う - YoheiM .NET](https://www.yoheim.net/blog.php?q=20170801)[axiosのcatchでerror objectの中身を見れない - Qiita](https://qiita.com/HorikawaTokiya/items/a18d59c864d1d1e1baf1)[Axios catch error returns javascript error not server response · Issue #960 · axios/axios · GitHub](https://github.com/axios/axios/issues/960)

## [API](http://d.hatena.ne.jp/keyword/API): サーバ側で発生する種々のエラー

サーバ側ではDBアクセスや外部サービスへのアクセス等、種々のエラーが発生し得る。発生し得るエラーの種類はとても書ききれないので以下記事参照。

エラー毎に対応する[httpステータスコード](http://d.hatena.ne.jp/keyword/http%A5%B9%A5%C6%A1%BC%A5%BF%A5%B9%A5%B3%A1%BC%A5%C9)を設定してレスポンスを返す。エラー毎にどの[ステータスコード](http://d.hatena.ne.jp/keyword/%A5%B9%A5%C6%A1%BC%A5%BF%A5%B9%A5%B3%A1%BC%A5%C9)が適切か？などあまり理解していない。

参考サイト:

### rescue_from

様々な箇所で共通で発生するようなエラー(例えば [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord)::RecordNotFound など)は、rescue_fromを用いることで共通で処理できる。

参考サイト:

[Rails tips: rescue_fromでコントローラのエラーをrescueする（翻訳）｜TechRacho（テックラッチョ）〜エンジニアの「？」を「！」に〜｜BPS株式会社](https://techracho.bpsinc.jp/hachi8833/2018_04_09/54676)[RailsのAPIサーバーのエラーレスポンスで例外に対応するエラーコードを返却する - Timee Product Team Blog](https://tech.timee.co.jp/entry/2020/08/11/182724)

## 最後に

全体的に[API](http://d.hatena.ne.jp/keyword/API)(RESTful [API](http://d.hatena.ne.jp/keyword/API))の設計周りの知識が明らかに不足している。今後以下の書籍を読んで基礎的な知識を固めて行きたいところ。

[書評: RESTful Webサービス - t-wada の日記（旧）](https://t-wada.hatenadiary.jp/entry/20071219/p1)[Web API: The Good Parts | 水野 貴明 |本 | 通販 | Amazon](https://www.amazon.co.jp/Web-API-Parts-%E6%B0%B4%E9%87%8E-%E8%B2%B4%E6%98%8E/dp/4873116864)