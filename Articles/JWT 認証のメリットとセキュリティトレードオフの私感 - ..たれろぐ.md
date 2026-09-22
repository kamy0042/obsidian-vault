---
Created: 2021-01-15T18:11:00
URL: https://naga-sawa.hatenadiary.org/entry/20180921/1537502662
Tags: [topic/技術/セキュリティ]
---
2020/5/9追記: 考えた結果、Authorization Bearer ヘッダを使った正規のJWTの場合、同一[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)下で読み込む全 [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) が信用できる場合でないとブラウザ上で安全に[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを保持できないのでブラウザからの[API](http://d.hatena.ne.jp/keyword/API)アクセス時の認証用には使うべきではないというところに着陸しました。ブラウザからのアクセスでは http only [cookie](http://d.hatena.ne.jp/keyword/cookie) に[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを入れ、 [CSRF](http://d.hatena.ne.jp/keyword/CSRF) 対策も忘れずにというこれまで通りの定石が手堅いように思います。 JWTを使うのは[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの安全な保管ができる非ブラウザなネイティブクライアントからの[API](http://d.hatena.ne.jp/keyword/API)アクセス時に限った方がよさそうです。 [API](http://d.hatena.ne.jp/keyword/API)サーバ側ではアクセス元に合わせて認証方法を使い分ける両対応が要求されるので手間は増えますが手抜きできる場所でもないので仕方なしと。

- [React(SPA)での認証についてまとめ - エンジニアの本棚](https://coders-shelf.com/react-auth-problem/)
- [JWTをセッション管理に転用するのはあまり良いアイデアではない(認証だけならいいよ) - id:anatooのブログ](https://anatoo.hatenablog.com/entry/2018/10/03/000518)
- [Storing Authentication Tokens - Local Storage or Cookies? : Angular2](https://www.reddit.com/r/Angular2/comments/cubdwa/storing_authentication_tokens_local_storage_or/)

2018/9/25追記: [https://gist.github.com/issm/63889b931b8c658f23634070b64f8b23](https://gist.github.com/issm/63889b931b8c658f23634070b64f8b23) も参考になるかも。 あと、以下の議論は『セッション』の意味するところに認識違いがあるのかもしれない(認証継続の意味でのセッションと、ステート保持機構としてのセッションと)。

[どうして JWT をセッションに使っちゃうわけ？ - co3k.org](https://co3k.org/blog/why-do-you-use-jwt-for-session) （←の[はてブ](http://b.hatena.ne.jp/entry/s/co3k.org/blog/why-do-you-use-jwt-for-session)）
とか[JWT認証、便利やん？ - ブログ](https://auth0.hatenablog.com/entry/2018/09/21/004131) （←の[はてブ](http://b.hatena.ne.jp/entry/s/auth0.hatenablog.com/entry/2018/09/21/004131)）
で話題になってるので、Webシステム素人の理解と私感をメモしてみる。[OpenID](http://d.hatena.ne.jp/keyword/OpenID) connect とかで使われてるって話だけど、そっちはノータッチで単純に[API](http://d.hatena.ne.jp/keyword/API)アクセス時の認証の仕組みとして使うことを前提としています。

JWT ベースの認証って、負荷分散などのために複数台のフロントサーバを使う場合や、複数のマイクロサービスを使ったサービスを実現するにあたって、認証(セッション)状態を都度セッションストアに確認したくない・できない場合に生きてくる仕組みなように思う。

一般に短寿命のアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンと比較的長寿命なリフレッシュ[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンのセット利用を前提としていて、次のような利用形態が前提（なはず）。

- 普段の [API](http://d.hatena.ne.jp/keyword/API)リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)ト時はアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンのみで認証する。
- アクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの寿命が来た場合には、リフレッシュ[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ン使ってアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを更新する。
- そのリフレッシュ時には都度ユーザDBなりにアクセスしてリフレッシュ可否を判定する。
- [API](http://d.hatena.ne.jp/keyword/API)リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)ト頻度 トークンのリフレッシュ頻度である。

従来の SessionID を使った[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンベース・[cookie](http://d.hatena.ne.jp/keyword/cookie)ベースの認証では、SessionID からユーザID などの認証情報を引かないといけないので、その対応関係(セッション情報)を一時保存するセッションストアが必要になる。

[API](http://d.hatena.ne.jp/keyword/API) リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トが高頻度に発生する場合では、複数台のフロントサーバで分散させる構成にするのが一般的だけれども、セッション情報は全体で共有しないと破綻するので、 [memcached](http://d.hatena.ne.jp/keyword/memcached) や Redis のような共有セッションストアサーバを別途用意して、フロントサーバ全体で共有しなければならなかった。

それに対して JWT だと普段の [API](http://d.hatena.ne.jp/keyword/API)リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トに対しては、各フロントサーバで JWT から認証情報を取り出せるので、共有セッションストアサーバが不要になる。（そこで改竄検知可能なのが JWT のキモだと思う）

リフレッシュの頻度は [API](http://d.hatena.ne.jp/keyword/API)リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トに対して十分に低頻度で、バックエンドの普通の DB サーバで十分に対処できる。
このため、リフレッシュが要求された時点で DB を参照してアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンをリフレッシュする/拒否することで認証状態をコン[トロール](http://d.hatena.ne.jp/keyword/%A5%C8%A5%ED%A1%BC%A5%EB)する。

[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの漏洩に対しては、漏洩発覚後、アクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの寿命が来るまでは[不正アクセス](http://d.hatena.ne.jp/keyword/%C9%D4%C0%B5%A5%A2%A5%AF%A5%BB%A5%B9)を許容できるサービスが適用対象で、即時止めたいというサービスには向かない。
そういうサービスの場合は、セッションストアサーバを使って確実にセッション無効化できるように構築しましょう。
無理に JWT で実現しようとしても、blacklist をフロントサーバ間で共有させないといけないので結局共有セッションストアのような仕組みが必要になってしまうので。

共有セッションストアサーバが不要になるというのが、JWT 認証での一番のメリットで、あとはアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの寿命の設定次第で、許容するリスクとリフレッシュ負荷との[トレードオフ](http://d.hatena.ne.jp/keyword/%A5%C8%A5%EC%A1%BC%A5%C9%A5%AA%A5%D5)を調整する。

この方面は素人なんで要点外したら申し訳ないけれど、調べた範囲だとこういう感じなのかなぁと。

自前サービスの[API](http://d.hatena.ne.jp/keyword/API)認証用途で使う場合であれば、ユーザの無効化操作と同時にフロントサーバ群にそのユーザ情報を管理[API](http://d.hatena.ne.jp/keyword/API)などで上手くばらまく仕組みができれば即時無効化もできるはず。
無効化情報はせいぜいアクセス[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンの寿命時間分保持すれば十分なので、再起動を考えなければオンメモリでもいけそうな。

各種[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)で用意されてる・対応してるセキュアな実装が使えるなら、それに乗っかるのが一番無難な選択よね。

あ、マサカリはウレタンでお願いします。