---
Created: 2022-09-26T12:01:00
URL: https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p1
Tags: [topic/技術/セキュリティ]
---
![[GJWLZG66E2.jpg]]

スライド概要

SPA(Single Page Application)の普及が一層進んでおり、従来型のMPAを知らないウェブ開発者も生まれつつあるようです。SPA対応のフレームワークでは基本的な脆弱性については対策機能が用意されていますが、それにも関わらず、脆弱性診断等で基本的な脆弱性が指摘されるケースはむしろ増えつつあります。
 本セッションでは、LaravelとReactで開発したアプリケーションをモデルとして、SQLインジェクション、クロスサイトスクリプティング、認可制御不備等の脆弱性の実例を紹介しながら、現実的な対策について紹介します。LaravelやReact以外のフレームワーク利用者にも役立つ説明を心がけます。
 PHPカンファレンス2022での講演資料です。

### 各ページのテキスト

[2.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p2)

徳丸浩の自己紹介 • 経歴 – 1985年 京セラ株式会社入社 – 1995年 京セラコミュニケーションシステム株式会社(KCCS)に出向・転籍 – 2008年 KCCS退職、HASHコンサルティング株式会社(現社名:EGセキュアソリューションズ株式会社)設立 • 経験したこと – 京セラ入社当時はCAD、計算幾何学、数値シミュレーションなどを担当 – その後、企業向けパッケージソフトの企画・開発・事業化を担当 – 1999年から、携帯電話向けインフラ、プラットフォームの企画・開発を担当 Webアプリケーションのセキュリティ問題に直面、研究、社内展開、寄稿などを開始 – 2004年にKCCS社内ベンチャーとしてWebアプリケーションセキュリティ事業を立ち上げ • 現在 – – – – EGセキュアソリューションズ株式会社取締役CTO https://www.eg-secure.co.jp/ 独立行政法人情報処理推進機構 非常勤研究員 https://www.ipa.go.jp/security/ 著書「体系的に学ぶ 安全なWebアプリケーションの作り方（第2版）」(2018年6月) YouTubeチャンネル「徳丸浩のウェブセキュリティ講座」 https://j.mp/web-sec-study – 技術士（情報工学部門） 徳丸浩のウェブセキュリティ講座 © 2022 Hiroshi Tokumaru 2

[26.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p26)

[beta]

```plain text
再認証をバイパスしてパスワード変更が可能
攻撃者
www.example.com

POST /auth HTTP/1.1
{"currentPass":"P@assword"}

HTTP/1.1 200 OK

$ curl -X POST -H "Content-Type:
application/json" -d '{"newPass":"123456"}
https://www.example.com/changepassword

POST /changepassword HTTP/1.1
{"newPass":"123456"}
HTTP/1.1 200 OK

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

26


```

[29.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p29)

[beta]

```plain text
APIの認可制御不備（正常系）
利用者

example.jp

POST /login HTTP/1.1
example.jp

<script>
xhr = new XMLHttpRequest()
xhr.open('POST', '/user')
xhr.send(…)
</script>

HTTP/1.1 200 OK
Set-Cookie: SESSID=xxxx
GET /secret HTTP/1.1
Cookie: SESSID=xxxx

HTTP/1.1 200 OK
{"text":"Secret Information…"}
徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

29


```

[30.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p30)

[beta]

```plain text
APIの認可制御不備（攻撃）
攻撃者

example.jp

POST /login HTTP/1.1
HTTP/1.1 200 OK
Set-Cookie: SESSID=xxxx

$ curl https://example.jp/secret
{"text":"Secret Information…"}

GET /secret HTTP/1.1
<Cookie なし>

HTTP/1.1 200 OK
{"text":"Secret Information…"}
徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

認証チェック
なしに秘密情
報を返す
30


```

[31.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p31)

[beta]

```plain text
Laravel/Sanctum の認証設定
// routes/api.php

脆弱なルーティング設定

Route::get('secret', [SecretController::class, 'secret']);

// Laravel/Sanctumで認証を要求するルーティング設定例(routes/api.php)

Route::middleware('auth:sanctum')->group(function(){
Route::get('secret', [SecretController::class, 'secret']);
});

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

31


```

[35.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p35)

[beta]

```plain text
ポリシーによる認可制御の実装例(Laravel)
// app/Policies/TaskPolicy.php
class TaskPolicy
{
use HandlesAuthorization;
public function view(User $user, Task $task)

// showコントローラに対応するポリシー

{
return $user->id === $task->user_id;

// タスクの持ち主のみがアクセスできる

}

}
// コントローラの定義
class TaskController extends Controller
{
public function show(Task $task)
{
$this->authorize($task); // ポリシーの確認
return $task;
}

}
徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

35


```

[37.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p37)

[beta]

```plain text
APIの認可制御不備（正常系）
管理者

example.jp

POST /login HTTP/1.1
example.jp

<script>
xhr = new XMLHttpRequest()
xhr.open('POST', '/user')
xhr.send(…)
</script>

HTTP/1.1 200 OK
Set-Cookie: SESSID=xxxx
{"id":1}
PATCH /users/10 HTTP/1.1
Cookie: SESSID=xxxx
{"email":"carol@example.jp"}
HTTP/1.1 200 OK

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

37


```

[38.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p38)

[beta]

```plain text
APIの認可制御不備（攻撃）
攻撃者（一般ユーザー）

example.jp

POST /login HTTP/1.1
example.jp

<script>
xhr = new XMLHttpRequest()
xhr.open('POST', '/user')
xhr.send(…)
</script>

HTTP/1.1 200 OK
Set-Cookie: SESSID=zzzz
{"id":6}
PATCH /users/10 HTTP/1.1
Cookie: SESSID=zzzz

※一般ユーザーからは呼び出されないエンドポイント

{"email":"carol@example.jp"}

HTTP/1.1 200 OK
徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

他人のメールアド
レスが変更される
38


```

[40.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p40)

[beta]

```plain text
APIの認可制御不備（正常系）
管理者

example.jp

POST /login HTTP/1.1

localStorage

HTTP/1.1 200 OK
Set-Cookie: SESSID=xxxx
{"id":1, "role":1}

role:1

PATCH /users/10 HTTP/1.1
Cookie: SESSID=xxxx
{"role":1, "email":"carol@example.jp"}
HTTP/1.1 200 OK

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

40


```

[41.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p41)

[beta]

```plain text
APIの認可制御不備（攻撃）
攻撃者（一般ユーザー）

example.jp

POST /login HTTP/1.1

localStorage

HTTP/1.1 200 OK
Set-Cookie: SESSID=zzzz
{"id":6, "role":0}

role:0
role:1

PATCH /users/10 HTTP/1.1
Cookie: SESSID=zzzz
{"role":1, "email":"carol@example.jp"}
HTTP/1.1 200 OK

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

他人のメールアド
レスが変更される
41


```

[42.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p42)

[beta]

```plain text
Gateファサードによる認可実装例(Laravel)
// app/Providers/AuthServiceProvider.php
class AuthServiceProvider extends ServiceProvider
{
/* */
public function boot()
{
$this->registerPolicies();
Gate::define('admin', function ($user) { // adminポリシーの定義
return $user->role >= 1; // ユーザのroleが1以上をadminとする
});

}
}

// routes/api.php

ルーティング設定

// ...
Route::group(['middleware' => ['auth', 'can:admin']], function () {

// adminのみupdateEmail を許可する

Route::patch('user/update_email/{user}', [UserController::class, 'updateEmail']);
});

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

42


```

[48.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p48)

[beta]

```plain text
脆弱性のあるアプリケーション（正常系）
class TaskController extends Controller
{
public function getTaks(Request $request)
{
kind=Shopping
$kind = $request->kind;
$tasks = Task::whereRaw("kind = BINARY '$kind'")->get();
return $tasks;
大文字・小文字
}
を区別して検索
[
}
{

select * from `tasks` where BINARY id = 'Shopping'

"id":2,
"kind":"Shopping",
"title":"Remember the milk",
"memo":"Get one milk. If the eggs are there, get six."
},

【以下略】

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

48


```

[49.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p49)

[beta]

```plain text
脆弱性のあるアプリケーション（攻撃）
class TaskController extends Controller
{
public function getTaks(Request $request)
kind=' UNION SELECT id, name, email, password, FROM users #
{
$kind = $request->kind;
$tasks = Task::whereRaw("kind = BINARY '$kind'")->get();
return $tasks;
}
select * from `tasks` where BINARY id = '' UNION SELECT id, name, email, password FROM users #'
}
[

{

パスワードハッシュ値を
"id":2,
含む個人情報が漏洩する
"kind":"takahashi",
"title":"takahashi@example.jp",
"memo":"$2y$10$wMgTH4/IDTpzuUtRDvkYj.kDbfdnXJ6odWnJ5BvfZCKeu0bTJpFhG"
},

【以下略】
徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

49


```

[50.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p50)

[beta]

```plain text
対策 プレイスホルダ
• O/Rマッパーの機能を正しく使うことでSQLインジェクション対策
• whereRaw等を用いる場合は、文字列連結による条件生成をやめて、
プレイスフォルダを用いること
$tasks = Task::whereRaw("kind = BINARY '$kind'")->get();

$tasks = Task::whereRaw("kind = BINARY ?", [$kind])->get();

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

50


```

[59.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p59)

[beta]

```plain text
ReactでinnerHTML相当の機能を使う
const App = () => {
return <span dangerouslySetInnerHTML={{__html : nl2br(param)}}></span>
}
const newlineRegex = /(¥n)/g
const nl2br = str => str.replace(newlineRegex, '<br/>')

// 改行を<br>に変換

• Reactの場合、innerHTML相当の機能はdangerouslySetInnerHTMLと
いう見るからに危険そうな名前のディレクティブ
• それでも使ってしまう開発者はいる

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

59


```

[65.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p65)

[beta]

```plain text
JSXを活用して改行表示
const App = () => {
return <span>{ nl2br(param) }</span>
}
const newlineRegex = /(¥r¥n|¥r|¥n)/g
const nl2br = (str) =>
str.split(newlineRegex).map((line, index) =>
line.match(newlineRegex) ?
<br key={index}/> :
line
)

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

文字列 ABC¥nDEF

配列 ABC

配列 "ABC"

¥n

DEF

<br key=0/>

"DEF"

DOM span
ABC
br
DEF

65


```

[67.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p67)

[beta]

```plain text
【参考】AngularでDOM Based XSSに対してサニタイズが入る
app.component.html
<div><span [innerHTML]="text"></span></div>
import { Component } from '@angular/core'
@Component({
selector: 'app-root',
templateUrl: './app.component.html',
})
export class AppComponent {
text = '<img src=/ onerror=alert(1)>';
}

app.component.ts

onerrorイベントが
削除されている

<img src="/">

徳丸浩のウェブセキュリティ講座

Copyright © Hiroshi Tokumaru

67


```

[69.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p69)

[beta]

```plain text
Content Security Policy入門
• 以下は、JavaScriptのソースを自分自身のオリジンと api.example.com に限定する
– Content-Security-Policy: script-src 'self' api.example.com

• 同時にインラインスクリプトも禁止される
– <script> … </script> や <body onload="…"> は禁止される

• インラインスクリプトを書きたい場合は、ナンスまたはハッシュを指定
<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
…
</script>
に対して下記のCSPヘッダ
Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

あるいは
<script>alert('Hello, world.');</script>
に対しては下記のCSPヘッダ
Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

参考: https://developers.google.com/web/fundamentals/security/csp/?hl=ja

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

69


```

[73.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p73)

[beta]

```plain text
まず被害者は正規サイトにログインしている前提
利用者

example.jp

GET /loginform HTTP/1.1
example.jp

<script>
xhr = new XMLHttpRequest()
xhr.open('POST', '/user')
xhr.send(…)
</script>

HTTP/1.1 200 OK
Content-Length: 1056
POST /login HTTP/1.1
{"id":"bob","password":"123456"}

HTTP/1.1 200 OK
Set-Cookie: SESSID=xxxx

徳丸浩のウェブセキュリティ講座

© 2022 Hiroshi Tokumaru

73


```

[74.](https://www.docswell.com/s/ockeghem/K2PPNK-phpconf2022#p74)

[beta]

```plain text
脆弱なAPI（メールアドレス変更）の正常系
利用者

example.jp

<script>
xhr = new XMLHttpRequest()
xhr.open('PATCH', '/user')
xhr.send(…)
</script>

徳丸浩のウェブセキュリティ講座

example.jp

PATCH /user HTTP/1.1
{"email":"bob@example.jp"}

HTTP/1.1 200 OK
Set-Cookie: SESSID=xxxx

© 2022 Hiroshi Tokumaru

74


```