---
タグ: []
作成日時: 2022-01-18T20:48:00
URL: https://qiita.com/getty104/items/a9b56f30744dfe52a05f#git-add--p%E3%81%A7%E4%BD%9C%E3%82%8A%E3%81%9F%E3%81%84%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%94%E3%81%A8%E3%81%AB%E5%A4%89%E6%9B%B4%E3%82%92stage%E3%81%AB%E3%81%82%E3%81%92%E3%81%A6%E3%81%84%E3%81%8F
Tags: [topic/ツール/Git]
---
前の項目でまとめ上げたコミットを、一度取り消します。

`git reset HEAD~`を実行すれば取り消しができます。

## `git add -p`で作りたいコミットごとに変更をstageにあげていく

おそらく変更をstageにあげていく際、`git add ファイル名`でファイルごとあげていくことが多いと思います。
 しかし、綺麗なコミットを作り上げたいとなると、ファイル単位ではなく、行単位でコミットログを作っていきたい場合が多いです。
 そこで`git add -p`を用います。この記事の山場です。

`git add -p`とは、unstageの変更に対して対話形式でstageに上げるかどうかを選んでいけるオプションです。

`git add -p` を実行すると、このような表示がされます。

```plain text
diff --git a/foo b/foo
index e69de29..a5e2a02 100644
--- a/foo
+++ b/foo
@@ -0,0 +1,3 @@
+foo
+hoge
+bar
(1/1) Stage this hunk [y,n,q,a,d,e,?]?

```

このような感じでstageに上げるかどうかをいくつかのコマンドで決定していくことができます。
 細かいオプションについてはこちらをご覧ください。

ここでは一旦 `s`、`y`、`e`コマンドについて説明していきます。

`s`コマンドは、差分を行単位で切り分けてより細かいレベルでステージに上げるかどうかを決められるコマンドです。
 これを用いることで、ファイル内の行ごとに差分をstageにあげていくことができます。

そして`y`コマンドは表示された差分をそのままstageに上げるコマンドです。変更をそのままstageにあげてしまって問題ない場合は`y`を選択しましょう。

そして一番便利なのが`e`コマンドです。`e`コマンドはstageに上げる変更を自分で指定できる方法です。
 上の差分の中で、`foo`と`bar`だけをstageにあげたい場合、どのようにすると良いでしょうか？`s`差分を行の境界で切離分けるので、今回のように間の`hoge`だけは入れたくない、みたいな場合は利用できません。こんなときにまさに`e`コマンドは真価を発揮します。

上の変更で`e`を選択すると、エディタが開きます。そこで差分として取り込みたい行のみ残し、取り込みたくない行は消し、保存をすることでstageにあげたい差分だけを取り込めます。この際エディタで差分を変更しても実際のファイルが書き変わるわけではないのでご安心ください。

```plain text
# Manual hunk edit mode -- see bottom for a quick guide.
@@ -0,0 +1,3 @@
+fuga
+hoge <-ここを消す
+baz
# ---
# To remove '-' lines, make them ' ' lines (context).
# To remove '+' lines, delete them.
# Lines starting with # will be removed.
#
# If the patch applies cleanly, the edited hunk will immediately be
# marked for staging.
# If it does not apply cleanly, you will be given an opportunity to
# edit again.  If all lines of the hunk are removed, then the edit is
# aborted and the hunk is left unchanged.

```

## コミットを作成する

stageにあげ終わったら最後はコミットを作成するだけです。適切なコミットメッセージを書きましょう。

![[Attachments/無題のフォルダ/qiitan-for-login-modal-014e085d3e40a240e3fe8d61b70b29a9 1.png]]

Why not register and get more from Qiita?

1. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
2. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fgetty104%2Fitems%2Fa9b56f30744dfe52a05f&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fgetty104%2Fitems%2Fa9b56f30744dfe52a05f&realm=qiita)