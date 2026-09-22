---
タグ: []
作成日時: 2022-01-18T20:48:00
URL: https://qiita.com/tsuuuuu_san/items/f708a9f7ea8ab8eb6945
Tags: [topic/ツール/Git]
---
![](https://prod-files-secure.s3.us-west-2.amazonaws.com/954ccb56-0f01-4b97-ad2b-c797530c6f9d/c5d24fc6-14f1-4fba-a236-d96b13ab768a/https3A2F2Fqiita-user-contents.imgix.net2Fhttps253A252F252Fcdn.qiita.com252Fassets252Fpublic252Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png3Fixlib3Drb-4.0.026w3d120026mark643dahr0chm6ly9xawl0ys11c2vylwnvbnrlbnrzlmltz2l4lm5ldc9-dgv4dd9pegxpyj1yyi00ljaumcz3ptkxniz0ehq9juuzjtgwjtkwz2l0jtiwcmviyxnljtiwlwklrtmlodalotfnaxqlrtmlodelquvjb21taxqlrtmlodilotilrtmlodelqkulrtmlodelqtglrtmlodilodelrtmlodiloeimdhh0lwnvbg9ypsuymzixmjeymsz0ehqtzm9udd1iaxjhz2lubyuymfnhbnmlmjbxniz0ehqtc2l6zt01niz0ehqty2xpcd1lbgxpchnpcyz0ehqtywxpz249bgvmdcuyq3rvcczzptvmmjhlyzg5ywzhmwqzmtniyze0mwq1odmwmdbkmju026mark-x3d14226mark-y3d11226s3dfd2d4fe375a21e55872de6faeeab1b4d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652VILKZZ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T175547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAufD67zsnRq5SdulFoouDnuHtJ7b7afbcMoiQiwd4cBAiABkhGTnjzcMMDhO%2FxC3znsx%2BqH0q8V%2FEW%2BUaRy9uTH5yr%2FAwhiEAAaDDYzNzQyMzE4MzgwNSIMw40%2BdS3upHWCEp5yKtwDRf%2B8rm1Iz2uq%2Fsx2J%2BAqK6k5O775RizDhZqEary66XpxwahPIs0vUyKHDwQ1RWI3kNLnX5YLFNNMgnhhXwm%2F9tyVouyi6k%2FAqOiJjIzUAsSNqAQfTaFkylTiP2NRCmdxrZUhu0bEbRNxKkneYNzWDQQvHM1zxxvWfZW2dj08LMG0NiWfGa%2BMgHgdeUN6NTBoQNN%2BtKtt5Bfqo7uIKZAGBoif5y8gyEHY%2BYIFjA6oe%2Box1H4pjqvi1OO9PAJYqzSIRaKE7riH%2BpLC71ABdMH3NFbkXhNs4TLDPT5efbF7%2FhhOYX3PtbzgT9c65dtoE1UZ6OuHl20blspqYinHjV%2BTpyzOM%2BmGTfTqwKWkg2EOW1BE%2FTvb3J6kDWvdGP8UYBfOXHxkmZsX2E1YCSxaFOvbDt3skN3ihwpDd0oEGCuOt9coT6l45MaRT1FDF4pO4rVd9dN0KrWteK7j0Pz1FHLkTQhUt6wEklavn1vH%2FdjLvSvjxRpNPEprZKDuLVntbMPStV60RgC0lkdHt64lA4URVVYUxNa0lL86psTP%2BInCrvme10%2BsUQZ8CBT8s%2BhLkfBSO60ehdrp7ElJqnNhmF7aDL8fGAyGxedAffUmn1RLIbkYFeSGwUiU3qNQ1e4wuJPvzgY6pgF8WKmUvAReFD1igbnuoa7wLuZB00DFOrIur3NC%2FmkuC4IrI%2BVli0QYj74R1VNVrgCIKuTCAHtLDsJ3wPm4wi%2BZLeZEWDiqeRzSBmdFIyyd9OTxT6zxU%2BzIeKSynE%2FLKZNCmBbEiEBQJA1C8tNzxJJcoeRmSb4hBYChB8lAwsNL%2Fd5i5esqcGTrqlFydIgtheploSAiozgmfRdkR61XT82fzBKB9N29&X-Amz-Signature=7462b25c327b1ffdc28bfcc9c20b03ad20ec665d78be0d70a4f9ddfd1b7cc9cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

似た記事は沢山あるが、
 忘れたころに調べると、
 いろいろな記事を回ることが多いため、
 自分なりにまとめる。

# やりたいこと

「ぎゃー！細かくcommitしすギター！」

とか

「コミットログ見づれー！」

って時にcommitをまとめたい。**※リベースするって言うらしいですよ。**

# 作業手順

## commitログを確認

コマンド結果

```plain text
commit_id_3 commitメッセージ(2017/03/01)
commit_id_2 commitメッセージ(2017/02/01)
commit_id_1 commitメッセージ(2017/01/01)

```

※コミットの履歴が多い場合「q」キーで終了

## リベース指示書を作成

**※注意**
 指定するコミットidは、リベースしたいところの一つ前。
 例えば「commit_id_2」「commit_id_3」をリベースしたい場合、
 指定するのは「commit_id_1」になる。

コマンド実行後(viで下記の指示書が開く)

```plain text
pick commit_id_2 commitメッセージ(2017/02/01)
pick commit_id_3 commitメッセージ(2017/03/01)

# ~~省略~~
# 指示書の
# 書き方説明

```

**※指示書の詳細**
 「指示コマンド コミットid コミットメッセージ」が昇順で並んでいる。
 デフォルトで指示コマンドは「pick = コミットをそのまま残す」になっているので、
 「squash」か「fixup」にする必要がある。

**※指示コマンド**

![[Archive/import/【git rebase -i】gitのcommitをまとめる - Qiita/New database/New database.base]]

指示書修正例

```plain text
pick commit_id_2 commitメッセージ(2017/02/01)
s commit_id_3 commitメッセージ(2017/03/01)

# ~~省略~~
# 指示書の
# 書き方説明

```

## リベース後のコミットメッセージ編集(squashの場合)

指示書の保存後、自動的にコミットメッセージ編集に移る。
 編集して保存でおｋ。

## リベース後のpush

リベース後の状況によっては、
 pushしたい内容は、originよりもcommitが前になり、
 pushできないよ！と怒られる時がある。

originのcommitを破棄して、
 リベースした内容を反映させて良い場合は、

のように強制的にpushすればよい。

# 追加：間違ったrebaseを削除したい