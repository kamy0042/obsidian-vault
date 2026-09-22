---
タグ: []
作成日時: 2022-01-18T20:48:00
URL: https://qiita.com/crifff/items/1abf08bca4ce51db4775
Tags: [topic/ツール/Git]
---
More than 1 year has passed since last update.

## 特技は`git commit -a -m いろいろ修正`です！

ダメ。ゼッタイ。
 しかしこまめにコミットするのは面倒臭いですよね。でもrebaseやらrevertやらcherry-pickするにもコミットログは綺麗にしたい。そんなズボラで凝り性なあなたは`git add -p`でコミットを整えるといいと思います。

適当な名簿があったとします。**ここでは１コミットにつき１行の変更するのが決まりとしましょう。**

下のように変更してみました。

```plain text
-1: 芹沢鴨
+1: 近藤勇
 2: 原田左之助
 3: 藤堂平助
 4: 沖田総司
-5: 山南敬助
+5: 土方歳三

```

さてこのまま`git add`すると両方の変更が一度にステージングされてしまいます。
 そこで`git add -p`すると以下のようなdiffがコンソールに表示されます。

console

```plain text
diff --git a/members b/members
index 15440ce..1f43716 100644
--- a/members
+++ b/members
@@ -1,5 +1,5 @@
-1: 芹沢鴨
+1: 近藤勇
 2: 原田左之助
 3: 藤堂平助
 4: 沖田総司
-5: 山南敬助
+5: 土方歳三
Stage this hunk [y,n,q,a,d,s,e,?]?

```

変更のひとかたまり(ハンク)を表示し、そのハンクに対しての指示を待ち受けます。サンプルが小さいのですべて表示されますが、ハンクの間が７行以上空くと別のハンクとして扱われます。

## 変更を分割する

コミットを分割するのが目的なのでここで`s`を入力します。

console

```plain text
Split into 2 hunks.
@@ -1,4 +1,4 @@
-1: 芹沢鴨
+1: 近藤勇
 2: 原田左之助
 3: 藤堂平助
 4: 沖田総司
Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]?

```

するとハンクが２つに分割され、diffの表示される範囲が狭まり一人だけの変更になりました。`y`でこの変更をステージングしましょう。
 さらに次のハンクが表示されステージングするか否か選べますがひとまず`n`でスキップするか`q`で終了します。

git-status

```plain text
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#   modified:   members
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   modified:   members
#

```

`git status`を見るとmembersステージされているにもかかわらずワークスペースに残った状態になってますね。
 ここで`git diff`を見ると

git-diff

```plain text
@@ -2,4 +2,4 @@
 2: 原田左之助
 3: 藤堂平助
 4: 沖田総司
-5: 山南敬助
+5: 土方歳三

```

最終行の変更だけが残っています。
 そしてステージングされた状態を確認するために`git diff --cached`すると

git-diff-cached

```plain text
@@ -1,4 +1,4 @@
-1: 芹沢鴨
+1: 近藤勇
 2: 原田左之助
 3: 藤堂平助
 4: 沖田総司

```

先頭の変更だけがステージングされていますね。
 これで１つの変更だけどコミットすることができます。

## さらに分割する

ハンク同士が１行以上空いている場合は`s`で分割できますが、連続する行の場合はそうはいきません。

console

```plain text
@@ -1,5 +1,5 @@
 1: 芹沢鴨
-2: 原田左之助
-3: 藤堂平助
+2: 斎藤一
+3: 永倉新八
 4: 沖田総司
 5: 山南敬助
Stage this hunk [y,n,q,a,d,/,e,?]?

```

このように変更した行が連続する場合`s`が使えません。もしこの状態を分割したい場合は`e`で直接編集する必要があります。

edit

```plain text
# Manual hunk edit mode -- see bottom for a quick guide
@@ -1,5 +1,5 @@
 1: 芹沢鴨
-2: 原田左之助
-3: 藤堂平助
+2: 斎藤一
+3: 永倉新八
 4: 沖田総司
 5: 山南敬助
# ---
# To remove '-' lines, make them ' ' lines (context).
# To remove '+' lines, delete them.
# Lines starting with # will be removed.
#
# If the patch applies cleanly, the edited hunk will immediately be
# marked for staging. If it does not apply cleanly, you will be given
# an opportunity to edit again. If all lines of the hunk are removed,
# then the edit is aborted and the hunk is left unchanged.

```

`e`を押すとエディタが立ち上がり、diffの編集画面になります。元の状態からの差分を記述することでその変更を適用することができます。

edit/２行目だけを適用する場合

```plain text
# Manual hunk edit mode -- see bottom for a quick guide
@@ -1,5 +1,5 @@
 1: 芹沢鴨
-2: 原田左之助
+2: 斎藤一
 3: 藤堂平助
 4: 沖田総司
 5: 山南敬助
# ---
# To remove '-' lines, make them ' ' lines (context).
# To remove '+' lines, delete them.
# Lines starting with # will be removed.
#
# If the patch applies cleanly, the edited hunk will immediately be
# marked for staging. If it does not apply cleanly, you will be given
# an opportunity to edit again. If all lines of the hunk are removed,
# then the edit is aborted and the hunk is left unchanged.

```

上記のように内容を変更し保存するとステージングとして適用されます。ちなみにdiffとして正しければ何を書いてもいいのでこの画面で変更をさらに変更することもできます。フォーマットがおかしかったり差分が解決できない場合はステージングされません。

git-diff-cached

```plain text
@@ -1,5 +1,5 @@
 1: 芹沢鴨
-2: 原田左之助
+2: 斎藤一
 3: 藤堂平助
 4: 沖田総司
 5: 山南敬助

```

これで連続した行の変更を分割してステージングすることができました。

## これで綺麗なコミットログがつくれるね！

とは言うものの変更が増えた後にいちいちハンクを分割してコミットだのやってられないので作業のスコープをちゃんとしぼってこまめにコミットしたほうがいいと思います。ちなみに僕の特技は`git commit -a -m いろいろ修正`です！

## おまけ：git add -pした時のコマンド一覧

- `y` - このハンクをステージングする
- `n` - スキップする
- `q` - 終了する
- `a` - 以降のハンクをすべてステージングする
- `d` - 以降のハンクをすべてスキップする
- `g` - 指定したハンクへ移動
- `/` - 正規表現によるハンクの検索
- `j` - 未確定な次のハンクへ移動する
- `J` - 次のハンクへ移動する
- `k` - 未確定な前のハンクへ移動する
- `K` - 前のハンクへ移動する
- `s` - ハンクを分割する
- `e` - 手動で現在のハンクを修正する
- `?` - ヘルプを表示する

![[Attachments/無題のフォルダ/qiitan-for-login-modal-014e085d3e40a240e3fe8d61b70b29a9.png]]

Why not register and get more from Qiita?

1. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
2. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fcrifff%2Fitems%2F1abf08bca4ce51db4775&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fcrifff%2Fitems%2F1abf08bca4ce51db4775&realm=qiita)