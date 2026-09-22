---
Created: 2021-01-15T18:11:00
URL: https://teratail.com/questions/84388
Tags: [topic/技術/セキュリティ]
---
表題の通りなのですが、認証用トークン（具体的にはJWTトークン）はクッキーに保存すべきでしょうか？
ローカルストレージに保存すべきでしょうか？

クッキーに保存してリクエストヘッダーにクッキーに保存しておいたトークンを入れてリクエストを送信するといったやり方の方がセキュアでしょうか？

# 補足

前提として、ユーザーがログインに成功するとサーバー側から生成されたJWTトークンがクライアント側に送られてくるという仕様を想定しての話となります。そのトークンをクッキーに保存するべきか、もしくは、ローカルストレージに保存すべきかといった質問内容です。よろしくお願いいたします！

# 参考

https://stackoverflow.com/questions/34817617/should-jwt-be-stored-in-localstorage-or-cookie

- localStorage is subjected to XSS and generally it's not recommended to store any sensitive information in it.
- With Cookies we can apply the flag "httpOnly" which mitigates the risk of XSS. However if we are to read the JWT from Cookies on backend, we then are subjected to CSRF.

So based on the above premise - it will be best if we store JWT in Cookies. On every request to server, the JWT will be read from Cookies and added in the Authorization header using Bearer scheme. The server can then verify the JWT in the request header (as opposed to reading it from the cookies).

- 
気になる質問をクリップする
クリップした質問は、後からいつでもマイページで確認できます。
またクリップした質問に回答があった際、通知やメールを受け取ることができます。
クリップを取り消します
- 
良い質問の評価を上げる
以下のような質問は評価を上げましょう
- 質問内容が明確
- 自分も答えを知りたい
- 質問者以外のユーザにも役立つ

評価が高い質問は、TOPページの「注目」タブのフィードに表示されやすくなります。

質問の評価を上げたことを取り消します

- 
評価を下げられる数の上限に達しました
評価を下げることができません
- 1日5回まで評価を下げられます
- 1日に1ユーザに対して2回まで評価を下げられます

質問の評価を下げる

teratailでは下記のような質問を「具体的に困っていることがない質問」、「サイトポリシーに違反する質問」と定義し、推奨していません。

- プログラミングに関係のない質問
- やってほしいことだけを記載した丸投げの質問
- 問題・課題が含まれていない質問
- 意図的に内容が抹消された質問
- 過去に投稿した質問と同じ内容の質問
- 広告と受け取られるような投稿

評価が下がると、TOPページの「アクティブ」「注目」タブのフィードに表示されにくくなります。

質問の評価を下げたことを取り消します

この機能は開放されていません

評価を下げる条件を満たしてません

質問の評価を下げる機能の利用条件

この機能を利用するためには、以下の事項を行う必要があります。

- 質問回答など一定の行動
- [メールアドレスの認証](https://teratail.com/help/avoid-asking)
メールアドレスの認証
- [質問評価に関するヘルプページの閲覧](https://teratail.com/help/avoid-asking)
質問評価に関するヘルプページの閲覧
- 

回答 3 件

- sort評価が高い順
- sort
- sort

checkベストアンサー

+8

二つ、関連する記事を見つけたので、紹介します。

[Web Storage: セッショントークンのマシな手段 ― cookieとセキュリティ面を比較してみる | インフラ・ミドルウェア | POSTD](http://postd.cc/web-storage-the-lesser-evil-for-session-tokens/)[JWTを認証用トークンに使う時に調べたこと - Carpe Diem](http://christina04.hatenablog.com/entry/2016/06/07/123000)

セキュリティ的には、どちらが完全に劣っているというわけでは無く、きちんとした対策をとっていればどちらでも問題はないようです。問題になるのはブラウザのローカルストレージ対応状況でしょう。ターゲットにしているブラウザが全て対応しているか、動作に問題があったりしないか、プライベートブラウジングなどはどうするか、などを考慮しないと、ローカルストレージが使えることを前提にするのは難しいようです。

投稿 2017/07/16 09:06

- 
回答の評価を上げる
以下のような回答は評価を上げましょう
- 正しい回答
- わかりやすい回答
- ためになる回答

評価が高い回答ほどページの上位に表示されます。

- 
回答の評価を下げる
下記のような回答は推奨されていません。
- 間違っている回答
- 質問の回答になっていない投稿
- スパムや攻撃的な表現を用いた投稿

評価を下げる際はその理由を明確に伝え、適切な回答に修正してもらいましょう。


    
        
    
    
                                        
                                        
            
            
                2017/07/16 09:17                            
        
    

0

どちらでも良い気がしますが、以下のような記事を見つけました。

[認証トークンをCookieに保存するのは卒業しよう](http://qiita.com/hirohero/items/d74bc04e16e6d05d2a4a)
認証トークンの送信は Authorization ヘッダを使おう！という主旨の記事ですが、その場合、「流れで」localStrage を使用することになります。

> その場合は、認証トークンはCookieではなくlocalStrage（またはsessionStorage）に保存することになると思います。

参考まで＾＾

投稿 2017/07/16 08:19

- 
回答の評価を上げる
以下のような回答は評価を上げましょう
- 正しい回答
- わかりやすい回答
- ためになる回答

評価が高い回答ほどページの上位に表示されます。

- 
回答の評価を下げる
下記のような回答は推奨されていません。
- 間違っている回答
- 質問の回答になっていない投稿
- スパムや攻撃的な表現を用いた投稿

評価を下げる際はその理由を明確に伝え、適切な回答に修正してもらいましょう。


                
            
    
        
    
    
                                        
                                        
            
            
                2017/07/16 08:40                            
        
    
    
        
    
    
                                        
                                        
            
            
                2017/07/16 08:53                            
        
    
    
        
    
    
                                        
                                        
            
            
                2017/07/16 08:59                            
        
    
    
        
    
    
                                        
                                        
            
            
                2017/07/16 09:09                            
        
    
    
        
    
    
                                        
                                        
            
            
                2017/07/16 10:41                            
        
    
    
        
    
    
                                        
                                        
            
            
                2017/07/16 15:28                            
        
    
    
        
    
    
                                        
                                        
            
            
                2017/07/16 21:12                            
        
    
    
        
    
    
                                        
                                        
            
            
                2017/07/17 07:11                            
        
    

- 2

一般論ですが、サーバーの負荷が気にならないようなユーザー数なら、セッション機能を使う、つまりローカルストレージに保存すれば簡単でしょう。
ユーザー数が多く、サーバーの負荷が大きくなり応答が遅くなったり、フリーズする可能性があるのなら、クッキーを活用すればよいでしょう。ただし、ユーザー側のブラウザがクッキーをブロックしている場合があるので、その際の対応を考慮する必要があります。例えば、あらかじめユーザーに所定のドメインネームのクッキーは許可するように設定させておくとか、クッキーがブロックされたときだけ、セッション処理に頼るとか、クッキーがブロックされたらエラーのメッセージを応答するようにするとかです。

投稿 2017/07/16 04:51

- 
回答の評価を上げる
以下のような回答は評価を上げましょう
- 正しい回答
- わかりやすい回答
- ためになる回答

評価が高い回答ほどページの上位に表示されます。

- 
回答の評価を下げる
下記のような回答は推奨されていません。
- 間違っている回答
- 質問の回答になっていない投稿
- スパムや攻撃的な表現を用いた投稿

評価を下げる際はその理由を明確に伝え、適切な回答に修正してもらいましょう。


    
        
    
    
                                                    
            
            
                2017/07/16 08:20                            
        
    

**15分調べてもわからないことは、teratailで質問しよう！**

- ただいまの回答率 88.37%
- 質問をまとめることで、思考を整理して素早く解決
- テンプレート機能で、簡単に質問をまとめられる

[質問する](https://teratail.com/questions/input?btn=detail_05_jQ5FhLx3)

**関連した質問**
    
            解決済
回答
            1 / クリップ
            0
        
[【Railsチュートリアル】11章　herokuへのpush時のエラー](https://teratail.com/questions/148060?link=qa_related_pc)            
更新 2018/09/24解決済
回答
            1 / クリップ
            1
        
[name="codes[02]" でsubmitするとnginxエラー](https://teratail.com/questions/152509?link=qa_related_pc)            
更新 2019/12/19解決済
回答
            1 / クリップ
            0
        
[google hangout用のbotを動かすときのGoogle認証について教えてください](https://teratail.com/questions/169548?link=qa_related_pc)            
更新 2019/02/03受付中
回答
            0 / クリップ
            2
        
[JWTの正しい実装について](https://teratail.com/questions/174915?link=qa_related_pc)            
更新 2019/02/19解決済
回答
            1 / クリップ
            0
        
    
解決済
回答
            2 / クリップ
            1
        
[クロムのディベロッパーツールで表示されるエラーの意味と解決法について](https://teratail.com/questions/215493?link=qa_related_pc)            
更新 2019/10/16受付中
回答
            0 / クリップ
            1
        
[【Rails】production.logが更新されない](https://teratail.com/questions/220316?link=qa_related_pc)            
更新 2019/11/01解決済
回答
            1 / クリップ
            0
        
[Nuxt.jsでlocalStorageの値をasyncDataで使う方法](https://teratail.com/questions/233767?link=qa_related_pc)            
更新 2020/01/09

**同じタグがついた質問を見る**
    
        [JavaScript](https://teratail.com/tags/JavaScript)[Ruby](https://teratail.com/tags/Ruby)[Node.js](https://teratail.com/tags/Node.js)[API](https://teratail.com/tags/API)[セキュリティー](https://teratail.com/tags/%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E3%83%BC)