---
Created: 2021-03-24T17:24:00
URL: https://qiita.com/Hiro-mi/items/18e00060a0f8654f49d6#session%E3%82%92%E7%94%A8%E3%81%84%E3%82%8B--csrf%E5%AF%BE%E7%AD%96%E3%81%AB%E3%83%97%E3%83%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%88%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%92%E5%88%A9%E7%94%A8
Tags: [topic/技術/セキュリティ]
---
![[Attachments/無題のフォルダ/https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94 1.png]]

# JWTを用い、localStorageに保存 + refreshトークン

# JWTを用い、Cookieに保存 + CSRF対策にプリフライトリクエストを利用

# JWTを用い、Cookieに保存、 JWT送信時はカスタムヘッダに付与して送信

SPAでないアプリケーションでAJAXするときのよくあるパターンのように、セッションを用いつつ、CSRFトークンで対策する
 おすすめ度：○

# Sessionを用いる + CSRF対策にプリフライトリクエストを利用

認証（mail + passwordなど）
 ↓
 SessionのCookie（Set-Cookie, httpOnly:true, secure:true）を返却
 ↓
 リクエスト時は、
 SessionのCookie（リクエストヘッダに自動的にCookieが付与される）とカスタムヘッダを送信

XSSが起きた場合でもhttpOnly:trueによりCookieが流出しない。

プリフライトリクエストで対策する。
 カスタムヘッダがあると、必ずプリフライトリクエストが起きる。サーバー側でどのOriginからのリクエストを許容するかをきちんと設定していれば、プリフライトリクエストで不正なリクエストが弾かれることになる。

また、カスタムヘッダがなければプリフライトリクエストが起こらないことがあるが、カスタムヘッダがないものはサーバー側で不正なリクエストとして扱えば良い。

おすすめ度：△
 Access-Control-Max-Ageの期間内だとCSRFがおきうる？

JWT in SameSiteCookieのSessionバージョン。
 SPAとAPIを同一Originにできる場合限定

認証（mail + passwordなど）
 ↓
 SessionのCookie（Set-Cookie, httpOnly:true, secure:true, **SameSite: Strict**）を返却
 ↓
 リクエスト時は、SessionのCookie（リクエストヘッダに自動的にCookieが付与される）を送信

SameSiteCookieを用いているため、クロスオリジンだとCookieが送信されずCSRF対策は不要。

XSSが起きた場合でもhttpOnly:trueによりCookieが流出しない。

JWTのときと同様、すごくシンプルな実装でSPAとAPIが同一ドメインの場合はこれだけでいいかと思いました。
 おすすめ度：○

# 今後の課題（自分用メモを兼ねる）

- IDaas(Cognitoなど)が使いやすそうか今後検証（参考：[https://tech.hicustomer.jp/posts/modern-authentication-in-hosting-spa/](https://tech.hicustomer.jp/posts/modern-authentication-in-hosting-spa/) )
- Contents Security Policyについて調べる
- Fetch Metadata Request Headersについて調べる
- DNS Rebindingをされても大丈夫かどうか、それぞれの方法で考える（参考：[https://blog.tokumaru.org/2007/11/dns-rebinding.html](https://blog.tokumaru.org/2007/11/dns-rebinding.html) ）
- リクエストメソッドの「Trace」メソッドによる脆弱性を検証
- セキュリティ関係諸々調べる

JWTをWebStorageやhttpOnly:falseのCookieに置かない。SessionのCookieにはhttpOnlyをつける。

CSRF対策で、本来改ざんできないはずのOriginを確認する方法があるようだが、場合によっては改ざん可能らしいので完璧ではないかもしれない。（参考：[https://insert-script.blogspot.com/2018/05/adobe-reader-pdf-client-side-request.html](https://insert-script.blogspot.com/2018/05/adobe-reader-pdf-client-side-request.html) ）
 また、プリフライトリクエストを用いる方法に疑問視の声もある（参考：[http://blog.a-way-out.net/blog/2015/03/23/stateless-csrf-protection/](http://blog.a-way-out.net/blog/2015/03/23/stateless-csrf-protection/) ）。**(2020.4.27追記)**
 プリフライトリクエストに関しては、Access-Control-Max-Ageの期限内だとCSRFが起きうる気がしてきました！

> 最後に Access-Control-Max-Age は、プリフライトリクエストを再び送らなくてもいいように、プリフライトのレスポンスをキャッシュしてよい時間を秒数で与えます。この例では86400秒、つまり24時間です。なお、ブラウザーは個々に内部の上限値を持っており、 Access-Control-Max-Age が上回った場合に制限を掛けます。

SameSiteCookieについては実装例があまり多くなさそうな気がするが妥当性はどうだろうか。