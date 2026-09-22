---
タグ: []
作成日時: 2022-01-18T20:48:00
URL: https://qiita.com/Kawanji01/items/15bc6ff0be3697d77015#%E3%82%B1%E3%83%BC%E3%82%B9%EF%BC%93%E3%81%82%EF%BC%91%E3%81%A4%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E5%A4%89%E6%9B%B4%E3%82%92%E5%8A%A0%E3%81%88%E3%81%A6staging%E3%81%97%E3%81%A1%E3%82%83%E3%81%A3%E3%81%9F%E3%81%91%E3%81%A9%E5%A4%89%E6%9B%B4%E3%81%AF%E3%81%9D%E3%82%8C%E3%81%9E%E3%82%8C%E5%88%86%E3%81%91%E3%81%A6commit%E3%81%97%E3%81%9F%E3%81%84%E3%81%AA
Tags: [topic/ツール/Git]
---
# ケース別commit履歴の整理法

これで終わり！！！
 お疲れ様！！

## ケース３「あ〜。１つのファイルに複数の変更を加えてstagingしちゃったけど、変更はそれぞれ分けてcommitしたいな...」

とりあえず、`git diff`でどのへんを変更したのか確認しよう。
 もうデータはstagingしちゃったので、変更前との差分を見たいなら`--staged`をつけよう。
 （[参考記事：git 差分を見る](https://qiita.com/ikenji/items/42248085c4f4b55660d6)）

どれどれ？？

出力結果

```plain text
 diff --git a/config/routes.rb b/config/routes.rb
index 02fcf8e4..ebcf4fa1 100644
--- a/config/routes.rb
+++ b/config/routes.rb
@@ -18,14 +18,14 @@ Rails.application.routes.draw do

   #get  "how_to_use",     to: "static_pages#how_to_use"
   #-  #get '/landing_page', to: 'static_pages#landing_page'
index 02fcf8e4..ebcf4fa1 100644
--- a/config/routes.rb
+++ b/config/routes.rb
@@ -18,14 +18,14 @@ Rails.application.routes.draw do

   #get  "how_to_use",     to: "static_pages#how_to_use"
   #-  #get '/landing_page', to: 'static_pages#landing_page'

```

なるほどね。
 まずはconfig/routes.rbをindexから外さないとね。
 indexからファイルをunstagingするには、`git reset <ファイル名>`か`git rm --cached <ファイル名>`ですね。[（参考記事：git add の取り消し方法と、関連コマンドまとめ）](http://www-creators.com/archives/1282#git_add-2)

さて、unstagingしたこのファイル変更箇所の一部分だけをstagingし直すには...。
 ヘェ〜、`git add -p <ファイル名>`なんてあるのか。なるほど。[（参考記事：Git 変更のあるファイルの一部だけをコミットしたい。）](https://chaika.hatenablog.com/entry/2017/06/28/120000)

どれどれ？

出力結果

```plain text
 diff --git a/config/routes.rb b/config/routes.rb
index 02fcf8e4..ebcf4fa1 100644
--- a/config/routes.rb
+++ b/config/routes.rb
@@ -18,14 +18,14 @@ Rails.application.routes.draw do

   #get  "how_to_use",     to: "static_pages#how_to_use"
   #-  #get '/landing_page', to: 'static_pages#landing_page'
+

   get "/select_plan", to: "static_pages#select_plan"
   get "/update", to: "static_pages#update"
   get "/invitation_or_premium", to: "static_pages#invitation_or_premium"
-  get "/new", to: "static_pages#new"
+


(1/1) Stage this hunk [y,n,q,a,d,s,e,?]?

```

hunk?
 あぁ、stagingする単位のことか。
 って、変更が全部１つにまとまっちゃってんじゃ〜ん！
 変更を分割するには、`s`を入力してenter。

出力結果

```plain text
 (1/1) Stage this hunk [y,n,q,a,d,s,e,?]? s
Split into 2 hunks.
@@ -18,10 +18,10 @@

   #get  "how_to_use",     to: "static_pages#how_to_use"
   #-  #get '/landing_page', to: 'static_pages#landing_page'
+

   get "/select_plan", to: "static_pages#select_plan"
   get "/update", to: "static_pages#update"
   get "/invitation_or_premium", to: "static_pages#invitation_or_premium"

(1/2) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]?

```

この変更をstagingしよう。`y`を入力して、enter。

出力結果

```plain text
 (1/2) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? y
@@ -22,10 +22,10 @@

   get "/select_plan", to: "static_pages#select_plan"
   get "/update", to: "static_pages#update"
   get "/invitation_or_premium", to: "static_pages#invitation_or_premium"
-  get "/new", to: "static_pages#new"
+


(2/2) Stage this hunk [y,n,q,a,d,K,g,/,e,?]?

```

この変更はあとでcommitするので、今はstagingしない。`n`を入力してスキップ！
 OK、終了終了。

よし、これで１つのファイルの２つの変更のうち１つだけstagingできたぞ〜！
 できてるよね？？
 不安なので、`git status`でindexを確認しよう。

どれどれ〜？

出力結果

```plain text
 On branch fix_bug
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   config/routes.rb

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   config/routes.rb


```

よしよし。ちゃんとconfig/routesrbが分割でstagingされてる。

じゃあ、まずは今stagingしたファイルをcommitしよう。

それから残りの変更もstagingして、

commit！

終わり！！！

## ケース４「あぁ〜、いくつか前のcommit、粒度粗いし分割したい〜〜〜」

過去のcommitの分割は、「ケース１」「ケース２」「ケース３」を合わせた知識でできます。

`rebase -i`で、過去のcommitに移動したあと、**そのcommitを**`**git reset --soft HEAD^**`**で取り消す。**

その後は、すでにindexにある分割してcommitしたいファイルを、`git reset <ファイル名>` でunstagingしたり、
 「ケース３」で紹介した手順で、１つのファイルの複数の変更を分割してstagingして、何回かに分けてcommitするなどすれば、commitの粒度を細かくできます。

**このときのcommitは、**`**commit --amend**`**ではなく、**`**commit -m "コミットメッセージ"**`**を使います。**

最後に `git rebase --continue`を打ってrebaseを終了し、`git log --oneline`で確認すれば、
 きちんとcommitが分割されていることがわかります。

Terminalの英語が読めない僕とあなたのために、[BooQsという学習の科学に基づいた英単語学習サービス](https://www.booqs.net/)を開発しています。
 BooQsの中でもとくに人気のあるコンテンツは、[NGSL（New General Service List）と呼ばれる、一般的な英文の９割を網羅した英単語帳](https://note.com/kawanjin01/n/na861d9264699)です。
 よろしければぜひ！

> 
> BooQs（ブックス） は、楽しく効率的に英単語を覚えられるサービスです。現在、『基礎英単語』『学術英単語』『TOEIC英単語』『ビジネス英単語』を学ぶことができます。ぜひご活用ください！！[\#BooQs](https://twitter.com/hashtag/BooQs?src=hash&ref_src=twsrc%5Etfw)[https://t.co/Ygvf3QeZKL](https://t.co/Ygvf3QeZKL)
> 
> [March 19, 2020](https://twitter.com/BooQs_net/status/1240537593806086145?ref_src=twsrc%5Etfw)

![[Attachments/無題のフォルダ/qiitan-for-login-modal-014e085d3e40a240e3fe8d61b70b29a9 2.png]]

Why not register and get more from Qiita?

1. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
2. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2FKawanji01%2Fitems%2F15bc6ff0be3697d77015&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2FKawanji01%2Fitems%2F15bc6ff0be3697d77015&realm=qiita)

Comments