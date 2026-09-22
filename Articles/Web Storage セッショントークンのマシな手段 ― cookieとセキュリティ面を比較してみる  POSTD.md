---
Created: 2021-01-15T18:10:00
URL: https://postd.cc/web-storage-the-lesser-evil-for-session-tokens/
Tags: [topic/技術/セキュリティ]
---
最近、私は「セッショントークンを、cookieの代わりに[Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) (sessionStorage/localStorage)に保存するのは安全ですか？」ということを尋ねられました。このことについてGoogleで検索したところ、検索結果の上位のほとんどが「Web storageはcookieに比べてかなりセキュリティが弱く、セッショントークンには不向きである」と断言していました。透明性のため、私はこの逆の結論に至った理論的根拠を公に書くことにしました。

Web Storageに関する議論の中核として言われるのは、「Web StorageはsecureフラグやHttpOnlyフラグといったcookie特有の機能をサポートしていないため、攻撃者が容易に盗み取ることが可能」というものです。path属性についても言及されます。私は、これらの機能それぞれについて調べてみました。そして、なぜそれらが実装されたのか、どういう目的を提供するものなのか、それらが本当にcookieをセッショントークンの最善手段たらしめているのか……ということを確かめてみました。

## Secureフラグ

[Secureフラグ](https://www.owasp.org/index.php/SecureFlag)は、cookieにおいて極めて重要で、またWeb Storageには明らかに無関係な物です。Web Storageは[同一生成元ポリシー](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)に従っていて、これはドメイン名とプロトコルからなる生成元に基づいてデータを隔離するものです。CookieがSecureフラグを必要とする理由は、この同一生成元ポリシーに適切に従っていないことに起因します。どういう事かというと、デフォルトでは、**https**://example.comで設定されたcookieが、**http**://example.comにも送信され、アクセス可能になっているのです。逆に、**https**://example.comがlocalStorageに保存したデータは、プロトコルの違いに基づいて**http**://example.comからは完全にアクセス不可能になっています。

言い換えれば、Cookieはデフォルトではセキュリティが弱く、Secureフラグは単にWeb Storageと同程度に中間者攻撃に強くなるための継ぎはぎのようなものです。HTTPSを有効に利用したWeb Storageは、すでにSecureフラグをデフォルトで持っているのです。同一生成元ポリシーに関連したニュアンスのより多くの情報は、Michal Zalewskiによる[The Tangled Web](http://lcamtuf.coredump.cx/tangled/)で見ることができます。

## Path属性

path属性は、セキュリティにはほとんど役に立たないことが[広く知られています](http://security.stackexchange.com/a/12447)。これは、cookieが同一生成元ポリシーに従っていないことを示すもう一つの例ともいえます。pathは生成元の一部と考えられていないため、セキュリティの境界が存在しないのです。二つのアプリケーションをアプリケーション層で互いに分離する唯一の方法は、二つのアプリケーションを違う生成元に置くほかにないのです。

## HttpOnlyフラグ

HttpOnlyフラグは、XSSの対策としてほとんど意味がありません。このフラグは、セッショントークンを盗むためのXSSを防ぐために[2002年に](https://msdn.microsoft.com/en-us/library/ms972826.aspx)開発されました。当時においてはcookieを盗むことが最も有名な攻撃手段でしたが、その4年後には[CSRFが「眠れる巨人」](http://blog.jeremiahgrossman.com/2006/09/csrf-sleeping-giant.html)と呼ばれるに至っていました。

私が思うに、現在の有能な攻撃者は[カスタムCSRFペイロード](https://youtu.be/3cT0uE7Y87s?t=1894)を用いてXSSをエクスプロイトするか、[BeEFフック](http://beefproject.com/)を利用するでしょう。それに比べ、セッショントークンを盗む攻撃では時間差が発生し、環境の違いも生じるため、実用的でなかったりエラーが生じがちだたったりします。その理由の背景をより深く知るためには[Why HttpOnly Won’t Protect You(なぜHttpOnlyはあなたを守らないのか)](http://www.gnucitizen.org/blog/why-httponly-wont-protect-you/)を見てください。つまり、熟練した攻撃者に対しては、HttpOnlyは攻撃を遅らせることすらできないのです。有効に働かないあまり攻撃者に気付かれもしないWebアプリケーションファイアウォールのようなものです。

HttpOnlyが有効なセキュリティ境界になる唯一の例として私が見たことがあるのは、bugzilla.mozilla.orgにおけるものです。クッキーが正確に同一生成元ポリシーを適用していないせいで、親ドメインのセッションのcookieがサブドメインからアクセス可能になっており、サブドメインから信頼できないHTML添付ファイルが送信されていました.最終的に言えることとして、Secureフラグと同様に、HttpOnlyフラグも「cookieをWeb Storageと同レベルのセキュリティに引き上げる」だけに必要とされているものなのです。

## 問題となる相違点

2つの選択肢の間の大きな相違点の一つとして、Web Storageはその内容がHTTPリクエストに自動的に付加されない点がcookieと異なる、ということが挙げられます。そのため、HTTPヘッダにセッショントークンを付加するためにはJavaScriptを書く必要があります。このことは「セッショントークンがambient authorityとして機能しない」ことを意味し、そのお蔭でセキュリティ上の利点が得られます。これはあらゆる種類のエクスプロイトに関連してきます。クロスドメインのリクエストに対してcookieを自動的に付加してしまうブラウザの動作は、CSRFや[クロスオリジンの時間差攻撃](http://scarybeastsecurity.blogspot.co.uk/2009/12/cross-domain-search-timing.html)を可能にしてしまっています。現在この問題を解決するために開発中の[更に更に別のクッキー属性](https://tools.ietf.org/html/draft-west-first-party-cookies-07)の仕様が存在しますが、この属性が得られたところで、最善の賭けはWeb Storageでしょう。

そうしている間にも、cookieプロトコルの不健全な現状により、cookieヘッダが[信用情報とそうでない情報を一緒くたに含め](http://kuza55.blogspot.co.uk/2008/02/understanding-cookie-security.html)られるというおかしな状況が起きています。まずい発想の2重サブミットCSRF防御が[陥ってしまうものです](https://media.blackhat.com/eu-13/briefings/Lundeen/bh-eu-13-deputies-still-confused-lundeen-wp.pdf)。これを解決する手段は、また更に別のcookie属性、[Origin](https://tools.ietf.org/html/draft-west-origin-cookies-01)です。

cookieと違い、Web Storageは自動破棄をサポートしていません。セッショントークンの破棄はサーバサイドで行われるべきことを考えたら、このことのセキュリティへの影響は小さいですが、それでも目を向けるには足るものでしょう。他の違いとして、sessionStorageはブラウザを閉じた時ではなくタブを閉じた時に破棄されますが、これはユースケースによって便利だったり不便だったりすることでしょう。また、SafariはプライベートブラウズモードではWeb Storageが無効化されていますが、これはあまり意味がありません。

この投稿は、「Web Storageは多くの場合、有用でセキュアなcookieの代替品になる」ということを論じるために書きました。Web Storageは必ずしもすべての状況でセッショントークンとして有効とは限りません。シングルページアプリでないものにこれを付加する場合は明らかにリクエストのオーバーヘッドが増えますし、SafariのプライベートブラウズモードではWeb Storageは無効化されていますし、[Internet Explorer 8ではWeb Storageはセキュアではありません](https://twitter.com/albinowax/status/738359848006524928)。同じように、cookieを使う場合はHttpOnlyとSecureの両属性を使うようにしてください。

## 結論

一見するとcookieはより多くのセキュリティ機能を備えているように見えますが、結局のところ貧弱な基本設計に継ぎ接ぎしているにすぎません。より深くcookieを判断するためには、[HTTP cookies, or how not to design protocols(HTTP cookie、あるいはどのようにしてプロトコルを設計しないか)](https://lcamtuf.blogspot.co.uk/2010/10/http-cookies-or-how-not-to-design.html)をチェックしてみてください。Web Storageはcookieにとって代われるものを提供しています。もしデフォルトでセキュアでないとしても、少なくともデフォルトでcookieよりセキュアでないことはないのです。

[@albinowax](https://twitter.com/albinowax)