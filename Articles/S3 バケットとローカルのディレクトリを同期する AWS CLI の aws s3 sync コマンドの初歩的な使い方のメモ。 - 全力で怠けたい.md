---
タグ: []
作成日時: 2024-11-29T23:14:00
URL: https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428
Tags: [topic/デザインシステム/配信基盤]
---
- [aws s3 sync コマンドの初歩的な使い方](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#aws-s3-sync-%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AE%E5%88%9D%E6%AD%A9%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9)
    - [基本的な使い方](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9)
    - [-dryrun オプション: dry run する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#--dryrun-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-dry-run-%E3%81%99%E3%82%8B)
    - [-delete オプション: 削除を同期する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#--delete-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E5%89%8A%E9%99%A4%E3%82%92%E5%90%8C%E6%9C%9F%E3%81%99%E3%82%8B)
    - [-quiet オプション: 出力を抑制する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#--quiet-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E5%87%BA%E5%8A%9B%E3%82%92%E6%8A%91%E5%88%B6%E3%81%99%E3%82%8B)
    - [-exclude: ファイルやオブジェクトを同期から除外する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#--exclude-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%84%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%90%8C%E6%9C%9F%E3%81%8B%E3%82%89%E9%99%A4%E5%A4%96%E3%81%99%E3%82%8B)
    - [-include: ファイルやオブジェクトを同期から除外しない](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#--include-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%84%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%90%8C%E6%9C%9F%E3%81%8B%E3%82%89%E9%99%A4%E5%A4%96%E3%81%97%E3%81%AA%E3%81%84)
    - [ヘルプを見る](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#%E3%83%98%E3%83%AB%E3%83%97%E3%82%92%E8%A6%8B%E3%82%8B)
- [参考サイト](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/23/205428#%E5%8F%82%E8%80%83%E3%82%B5%E3%82%A4%E3%83%88)

S3 [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)とローカルの[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リを同期する `aws s3 sync` コマンドの初歩的な使い方のメモ。

[aws](http://d.hatena.ne.jp/keyword/aws) コマンドのバージョン。

```plain text
$ aws --version
aws-cli/2.1.21 Python/3.7.4 Darwin/19.6.0 exe/x86_64 prompt/off
```

# [aws](http://d.hatena.ne.jp/keyword/aws) s3 sync コマンドの初歩的な使い方

`aws s3 sync` コマンドは S3 [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)とローカルの[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リを同期する便利なコマンド。

S3 [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)とローカルの[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リの同期だけじゃなくて任意の S3 [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)の[プリフィックス](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D5%A5%A3%A5%C3%A5%AF%A5%B9)間でオブジェクトを同期したり S3 [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)間のオブジェクトを同期することもできる。

初歩的な使い方だけどたまに「あれ、どうやるんだっけ」みたいなのをメモしておく。

このあとのコマンドの実行でのローカルの[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リとファイル構成はこんな感じでやっていく。

```plain text
$ tree ./data
./data
├── a.txt
└── hoge
    ├── a.txt
    └── fuga
        ├── a.txt
        └── b.txt

2 directories, 4 files
```

## 基本的な使い方

`aws s3 sync <同期元> <同期先>` みたいに使う。

同期元と同期先はそれぞれローカルならローカルの[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リのパスを指定するし S3 [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)なら S3[バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)と[プリフィックス](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D5%A5%A3%A5%C3%A5%AF%A5%B9)を指定する。

たとえば同期元がローカルの `/home/alice/data` で同期先が S3 の `alice-s3-bucket` [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)の `data` [プリフィックス](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D5%A5%A3%A5%C3%A5%AF%A5%B9)だったらこんな感じにやる。

```plain text
$ aws s3 sync /home/alice/data s3://alice-s3-bucket/data
```

同期元が S3 の `alice-s3-bucket` [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)の `data` [プリフィックス](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D5%A5%A3%A5%C3%A5%AF%A5%B9)で同期先がローカルの `/home/alice/data` だったらこんな感じにやる。

```plain text
$ aws s3 sync s3://alice-s3-bucket/data /home/alice/data
```

同期元が S3 の `alice-s3-bucket` [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)の `data` [プリフィックス](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D5%A5%A3%A5%C3%A5%AF%A5%B9)で同期先が S3 の `alice-s3-bucket` [バケット](http://d.hatena.ne.jp/keyword/%A5%D0%A5%B1%A5%C3%A5%C8)の `data2` [プリフィックス](http://d.hatena.ne.jp/keyword/%A5%D7%A5%EA%A5%D5%A5%A3%A5%C3%A5%AF%A5%B9) だったらこんな感じにやる。

```plain text
$ aws s3 sync s3://alice-s3-bucket/data s3://alice-s3-bucket/data2
```

## -dryrun オプション: dry run する

- `-dryrun` オプションを指定すると dry run する。

実際にはファイルやオブジェクトは同期せずに「こんな感じにファイルをアップロードしたりコピーしたり削除するよ」を表示する。

```plain text
$ aws s3 sync --dryrun ./data s3://alice-s3-bucket/data
(dryrun) upload: data/a.txt to s3://alice-s3-bucket/data/a.txt
(dryrun) upload: data/hoge/a.txt to s3://alice-s3-bucket/data/hoge/a.txt
(dryrun) upload: data/hoge/fuga/a.txt to s3://alice-s3-bucket/data/hoge/fuga/a.txt
(dryrun) upload: data/hoge/fuga/b.txt to s3://alice-s3-bucket/data/hoge/fuga/b.txt
```

## -delete オプション: 削除を同期する

`aws s3 sync` コマンドは同期元にないファイルが同期先にあるときは同期先のファイルはそのままで削除はしない。

- `-delete` オプションを指定すると同期元にないファイルが同期先にあるときは同期先のファイルを削除する。

```plain text
$ rm data/a.txt

$ aws s3 sync --dryrun ./data s3://alice-s3-bucket/data

$ aws s3 sync --dryrun --delete ./data s3://alice-s3-bucket/data
(dryrun) delete: s3://alice-s3-bucket/data/a.txt
```

## -quiet オプション: 出力を抑制する

`aws s3 sync` コマンドはファイルやオブジェクトに対する操作を表示するけど `--quiet` オプションを指定するとファイルやオブジェクトに対する操作は表示しない。

```plain text
$ aws s3 sync --dryrun ./data s3://alice-s3-bucket/data
(dryrun) upload: data/a.txt to s3://alice-s3-bucket/data/a.txt
(dryrun) upload: data/hoge/a.txt to s3://alice-s3-bucket/data/hoge/a.txt
(dryrun) upload: data/hoge/fuga/a.txt to s3://alice-s3-bucket/data/hoge/fuga/a.txt
(dryrun) upload: data/hoge/fuga/b.txt to s3://alice-s3-bucket/data/hoge/fuga/b.txt

$ aws s3 sync --dryrun --quiet ./data s3://alice-s3-bucket/data

```

## -exclude: ファイルやオブジェクトを同期から除外する

- `-exclude` オプションを指定するとファイルやオブジェクトを同期から除外する。
- `-exclude` オプションを指定しないときは `a.txt` は3ファイルが同期する。

```plain text
$ aws s3 sync --dryrun ./data s3://alice-s3-bucket/data | grep a.txt
(dryrun) upload: data/a.txt to s3://alice-s3-bucket/data/a.txt
(dryrun) upload: data/hoge/a.txt to s3://alice-s3-bucket/data/hoge/a.txt
(dryrun) upload: data/hoge/fuga/a.txt to s3://alice-s3-bucket/data/hoge/fuga/a.txt
```

- `-exclude` オプションで `a.txt` を指定すると `./data/a.txt` が同期から除外する。

```plain text
$ aws s3 sync --dryrun --exclude a.txt ./data s3://alice-s3-bucket/data | grep a.txt
(dryrun) upload: data/hoge/a.txt to s3://alice-s3-bucket/data/hoge/a.txt
(dryrun) upload: data/hoge/fuga/a.txt to s3://alice-s3-bucket/data/hoge/fuga/a.txt
```

- `-exclude a.txt` みたいにすると `./data` 直下の `a.txt` だけが同期から除外するけど `-exclude '*a.txt'` みたいにするとすべての `a.txt` を同期から除外する。

```plain text
$ aws s3 sync --dryrun --exclude '*a.txt' ./data s3://alice-s3-bucket/data | grep a.txt
```

## -include: ファイルやオブジェクトを同期から除外しない

- `-include` オプションを指定するとファイルやオブジェクトを同期から除外しない。
- `-include` オプションは `-exclude` オプションと組み合わせて使う。たとえば `-exclude '*a.txt'` するとすべての `a.txt` は同期から除外するけど `-exclude '*a.txt' --include hoge/a.txt` すると `./data/hoge/a.txt` は同期から除外せずにちゃんと同期する。

```plain text
$ aws s3 sync --dryrun --exclude '*a.txt' ./data s3://alice-s3-bucket/data | grep a.txt

$ aws s3 sync --dryrun --exclude '*a.txt' --include hoge/a.txt ./data s3://alice-s3-bucket/data | grep a.txt
(dryrun) upload: data/hoge/a.txt to s3://alice-s3-bucket/data/hoge/a.txt
```

## ヘルプを見る

`aws s3 sync help` を実行するとヘルプが表示する。

自分は [AWS](http://d.hatena.ne.jp/keyword/AWS) [CLI](http://d.hatena.ne.jp/keyword/CLI) のヘルプは[ブラウザー](http://d.hatena.ne.jp/keyword/%A5%D6%A5%E9%A5%A6%A5%B6%A1%BC)で [マニュアル](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html) を読んじゃうので `aws s3 sync help` は[ブラウザー](http://d.hatena.ne.jp/keyword/%A5%D6%A5%E9%A5%A6%A5%B6%A1%BC)が使えないときくらいしか使わない気がする。

```plain text
$ aws s3 sync help

SYNC()                                                                  SYNC()



NAME
       sync -

DESCRIPTION
       Syncs  directories  and S3 prefixes. Recursively copies new and updated
       files from the source directory to the destination. Only creates  fold-
       ers in the destination if they contain one or more files.

       See 'aws help' for descriptions of global parameters.

# (省略)
```

# 参考サイト

- [sync - AWS CLI 2.1.21 Command Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html)
- [AWS CLI の S3 のファイルの --exclude と --include の使い方のメモ](https://ebc-2in2crc.hatenablog.jp/entry/2021/02/11/181333)
- [iTerm2 のコピーモード](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#iTerm2-%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC%E3%83%A2%E3%83%BC%E3%83%89)
    - [コピーモードの開始と終了](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E3%82%B3%E3%83%94%E3%83%BC%E3%83%A2%E3%83%BC%E3%83%89%E3%81%AE%E9%96%8B%E5%A7%8B%E3%81%A8%E7%B5%82%E4%BA%86)
    - [基本的なカーソル移動](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E3%82%AB%E3%83%BC%E3%82%BD%E3%83%AB%E7%A7%BB%E5%8B%95)
    - [コピー範囲の選択とコピーの実行](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E3%82%B3%E3%83%94%E3%83%BC%E7%AF%84%E5%9B%B2%E3%81%AE%E9%81%B8%E6%8A%9E%E3%81%A8%E3%82%B3%E3%83%94%E3%83%BC%E3%81%AE%E5%AE%9F%E8%A1%8C)
    - [単語の移動](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E5%8D%98%E8%AA%9E%E3%81%AE%E7%A7%BB%E5%8B%95)
    - [行の移動](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E8%A1%8C%E3%81%AE%E7%A7%BB%E5%8B%95)
    - [その他のカーソル移動](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E3%82%AB%E3%83%BC%E3%82%BD%E3%83%AB%E7%A7%BB%E5%8B%95)
    - [チートシート](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E3%83%81%E3%83%BC%E3%83%88%E3%82%B7%E3%83%BC%E3%83%88)
- [参考サイト](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/11/204306#%E5%8F%82%E8%80%83%E3%82%B5%E3%82%A4%E3%83%88)

iTerm2 のコピーモードはキーボードで範囲を指定してコピーできるのが便利なのでメモ。

このメモは Build 3.4.2 で動作を確認している。

[チートシート](http://d.hatena.ne.jp/keyword/%A5%C1%A1%BC%A5%C8%A5%B7%A1%BC%A5%C8)は最後に記載しているので[チートシート](http://d.hatena.ne.jp/keyword/%A5%C1%A1%BC%A5%C8%A5%B7%A1%BC%A5%C8)だけ見たいときはそちらを見てほしい。

# iTerm2 のコピーモード

iTerm2 は [コピーモード](https://iterm2.com/documentation-copymode.html) があって iTerm2 をコピーモードにするとキーボードで範囲を指定してコピーできるのがかなり便利なのでメモしておく。

iTerm2 のコピーモードはキーボードでカーソルを移動することができる。 [vim](http://d.hatena.ne.jp/keyword/vim) ライクなキー操作でもカーソルを移動することができるので [vim](http://d.hatena.ne.jp/keyword/vim) を使ったことがある人はすぐにコピーモードを使いこなせそう。個人的にはコピーモードを使う前はマウスで範囲を選択とコピーしててそんなに不自由はないように感じていたけど、コピーモードを使ってみたらカーソルの移動はコピーモード + キーボードでやるほうがかなり楽なように感じる。

## コピーモードの開始と終了

メニューから `Edit > Copy Mode` か `Command - Shift - c`. 一応、マウスで範囲選択した状態で `Shift - 矢印キー` でコピーモードを開始することもできる。

コピーモード中は `Esc` か `q` でコピーモードを終了する。 あるいは `Ctrl - c`, `Ctrl - g` でもコピーモードを終了する。

## 基本的なカーソル移動

コピーモード中は矢印キーでカーソルを移動する。

あと [vim](http://d.hatena.ne.jp/keyword/vim) ライクに `h, j, k, l` でカーソル移動することができる。

| キー | アクション |
| --- | --- |
| ←, h | 左に移動 |
| ↓, j | 下に移動 |
| ↑, k | 上に移動 |
| 右, l | 右に移動 |

## コピー範囲の選択とコピーの実行

`Ctrl - v` で矩形選択を開始。矩形選択中にカーソルを動かすとカーソルを動かした分が選択する。 矩形選択中に `Ctrl - v` で矩形選択を終了。

`Space` か `v` で文字選択を開始。文字選択中にカーソルを動かすとカーソルを動かした分が選択する。文字選択中に `Space` か `v` で文字選択を終了。

`V` で行選択を開始。行選択中にカーソルを動かすとカーソルを動かした分が選択する。行選択中に `V` を押すと行選択を解除。

文字、矩形か行を選択しているときに `Ctrl - k` か `y` を押すと選択しているものをコピーする。

あと `Ctrl - Space` を押すと選択を終了する。

## 単語の移動

カーソルは `Option - ←` か `Shift - Tab` か `b` を押すと1つ前の単語に移動して `Option - →` か `Tab` か `w` を押すと1つ先の単語に移動する。 これらのキーはどれも記号は単語の区切りとして扱う。

たとえばカーソルが `and` の `nd` 上にあるときに `b` を押すとカーソルは `and` の `a` に移動して、カーソルが `orange` の `o` の上にあるときに `b` を押すとカーソルは `apple,` の `,` に移動する。

```plain text
apple, orange and banana
```

あとカーソルは `B` を押すと1つ前の単語に移動して `W` を押すと1つ先の単語に移動する。 これらのキーはどれも記号は単語の一部分として扱う。

たとえばカーソルが `and` の `nd` 上にあるときに `B` を押すとカーソルは `and` の `a` に移動して、カーソルが `orange` の `o` の上にあるときに `B` を押すとカーソルは `apple,` の `a` に移動する。

```plain text
apple, orange and banana
```

## 行の移動

カーソルは `0` を押すと行頭に移動して `$` を押すと行末に移動する。あとカーソルは `^` か `Option - m` を押すと行頭かインデントの開始位置に移動して `Enter` (`Return`) を押すとカーソルが次の行の行頭に移動する。

`0` と `^` は行頭が印刷できない文字で始まっているときの動きが違う。

たとえばカーソルが `バージョンを表示します` 上にあるときに `0` を押すとカーソルは行頭つまり1つ上の行の `OPTION` の `O` の下の位置に移動するけど、 `^` を押すとカーソルは `--version` の `-` に移動する。

```plain text
OPTIONS:
  --version, -v             バージョンを表示します
```

## その他のカーソル移動

`g` を押すとカーソルがバッファの先頭に移動して `G` を押すとカーソルがバッファの最後に移動する。

`Ctrl - b` か `Page Up` を押すとカーソルが1画面分上に移動して `Ctrl - f` か `Page Down` を押すとカーソルが1画面分下に移動する。

あと `H`, `M`, `L` を押すとそれぞれカーソルが可視領域の一番上か真ん中か一番下に移動する。

## [チートシート](http://d.hatena.ne.jp/keyword/%A5%C1%A1%BC%A5%C8%A5%B7%A1%BC%A5%C8)

コピーモードの開始、終了、コピー範囲の選択とコピーの実行。

| キー | アクション |
| --- | --- |
| Ctrl - Space | 選択を終了する |
| Ecs, q, Ctrl - c, Ctrl - g | コピーモードを終了する |
| Ctrl - v | 矩形選択を開始する。矩形選択中は矩形選択を終了する |
| Space, v | 文字選択を開始する。文字選択中は文字選択を終了する |
| V | 行選択を開始する。行選択中は行選択を終了する |

基本のカーソル移動。

| キー | アクション |
| --- | --- |
| ←, h | 左に移動 |
| ↓, j | 下に移動 |
| ↑, k | 上に移動 |
| 右, l | 右に移動 |

コンテンツベースのカーソル移動。

| キー | アクション |
| --- | --- |
| Option - ←, Shift - Tab, b | 記号は単語の区切りとして扱って1つ前の単語に移動する |
| Option - →, Tab, w | 記号は単語の区切りとして扱って1つ前の単語に移動する |
| B | 記号は単語の一部分として扱って1つ前の単語に移動する |
| W | 記号は単語の一部分として扱って1つ前の単語に移動する |
| [ | 1つ前のマークに移動する |
| ] | 1つ後のマークに移動する |

行の移動。

| キー | アクション |
| --- | --- |
| ^, Option-m | 行頭かインデントの開始位置に移動する |
| 0 | 行頭に移動する |
| $ | 行末に移動する |
| Enter, Return | 次の行の先頭に移動する |

その他のカーソル移動。

| キー | アクション |
| --- | --- |
| g | バッファの先頭に移動する |
| G | バッファの最後に移動する |
| Ctrl - b, Page Up | 1画面分上に移動する |
| Ctrl - f, Page Down | 1画面分下に移動する |
| H | 可視領域の一番上に移動する |
| M | 可視領域の真ん中に移動する |
| L | 可視領域の一番下に移動する |

その他のコマンド。

| キー | アクション |
| --- | --- |
| o | 選択範囲の反対側に移動する |
| Ctrl - k, y | 選択しているものをコピーする |

# 参考サイト

- [Copy Mode - Documentation](https://iterm2.com/documentation-copymode.html)
- [id コマンドの使い方](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#id-%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)
    - [-help オプション: ヘルプ](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#--help-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E3%83%98%E3%83%AB%E3%83%97)
    - [オプションなし](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AA%E3%81%97)
    - [u, --user オプション: 実効ユーザー ID を表示する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-u---user-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E5%AE%9F%E5%8A%B9%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC-ID-%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B)
    - [g, --group オプション: 実効グループ ID を表示する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-g---group-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E5%AE%9F%E5%8A%B9%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97-ID-%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B)
    - [G, --groups オプション: ユーザーが所属するすべてのグループ ID を表示する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-G---groups-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%8C%E6%89%80%E5%B1%9E%E3%81%99%E3%82%8B%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97-ID-%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B)
    - [n, --name オプション: ID の代わりに名前を表示する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-n---name-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-ID-%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%AB%E5%90%8D%E5%89%8D%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B)
    - [r, --real オプション: 実効ユーザー ID の代わりに実ユーザー ID を表示する](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-r---real-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E5%AE%9F%E5%8A%B9%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC-ID-%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%AB%E5%AE%9F%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC-ID-%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B)
    - [z, --zero オプション](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-z---zero-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)
    - [Z, --context オプション](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-Z---context-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)
    - [a オプション: 他のバージョンとの互換性のためにあるオプション](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#-a-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E4%BB%96%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%81%A8%E3%81%AE%E4%BA%92%E6%8F%9B%E6%80%A7%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AB%E3%81%82%E3%82%8B%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)
- [参考サイト](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/08/234016#%E5%8F%82%E8%80%83%E3%82%B5%E3%82%A4%E3%83%88)

ユーザー ID とグループ ID を表示する id コマンドの使い方のメモ。

このメモは [ubuntu](http://d.hatena.ne.jp/keyword/ubuntu) 20.10 の Docker コンテナ上の id コマンドを使っている。

```plain text
$ docker container run --rm -it ubuntu:20.10 /bin/bash
```

id コマンドのバージョン。

```plain text
$ id --version
id (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Arnold Robbins and David MacKenzie.
```

# id コマンドの使い方

id コマンドはユーザー ID とグループ ID を表示するコマンド。

自分は普段そんなに使わなくて使うときになって使い方を調べたりすることがたまにあるので使い方をメモしておく。

## -help オプション: ヘルプ

- `-help` オプションを指定すると id コマンドの使い方を表示する……んだけど `man id` が使えないときにしか使わない

```plain text
$ id --help
Usage: id [OPTION]... [USER]...
Print user and group information for each specified USER,
or (when USER omitted) for the current user.

  -a             ignore, for compatibility with other versions
  -Z, --context  print only the security context of the process
  -g, --group    print only the effective group ID
  -G, --groups   print all group IDs
  -n, --name     print a name instead of a number, for -ugG
  -r, --real     print the real ID instead of the effective ID, with -ugG
  -u, --user     print only the effective user ID
  -z, --zero     delimit entries with NUL characters, not whitespace;
                   not permitted in default format
      --help     display this help and exit
      --version  output version information and exit

Without any OPTION, print some useful set of identified information.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Report any translation bugs to <https://translationproject.org/team/>
Full documentation <https://www.gnu.org/software/coreutils/id>
or available locally via: info '(coreutils) id invocation'
```

## オプションなし

id コマンドはオプションなしで実行すると id コマンドを実行したユーザーのユーザー ID、ユーザーの名前、ユーザーが所属するすべてのグループ ID とグループの名前を表示する。

```plain text
$ id
uid=1000(alice) gid=1001(alice) groups=1001(alice),1000(employees)

$ whoami
alice

$ groups
alice employees
```

ちなみに SUID 属性とか SGID 属性が id コマンドに付与しているとこんな感じで実ユーザー ID、実グループ ID と実効ユーザー ID と実効グループ ID をすべて表示する。

```plain text
# /home/alice/id
uid=0(root) gid=0(root) euid=1000(alice) egid=1001(alice) groups=1001(alice)
```

## u, --user オプション: 実効ユーザー ID を表示する

- `u` オプションか `-user` オプションを指定すると実効ユーザー ID (effective ID) を表示する。

```plain text
$ id --user
1000
```

- `u` オプションか `-user` オプションと一緒に `n` オプションか `-name` オプションを指定するとユーザーの ID の代わりにユーザーの名前を表示する。 このときの表示は whoami コマンドを実行するときの表示と同じ。

```plain text
$ id --user --name
alice

$ whoami
alice
```

## g, --group オプション: 実効グループ ID を表示する

- `g` オプションか `-group` オプションを指定すると実効グループ ID を表示する。

```plain text
$ id --group
1001
```

- `g` オプションか `-group` オプションと一緒に `n` オプションか `-name` オプションを指定するとグループの ID の代わりにグループの名前を表示する。

```plain text
$ id --group --name
alice
```

## G, --groups オプション: ユーザーが所属するすべてのグループ ID を表示する

- `G` オプションか `-groups` オプションを指定するとユーザーが所属するすべてのグループ ID を表示する。

```plain text
$ id --groups
1001 1000
```

- `G` オプションか `-groups` オプションと一緒に `n` オプションか `-name` オプションを指定するとグループの ID の代わりにグループの名前を表示する。 このときの表示は groups コマンドを実行するときの表示と同じ。

```plain text
$ id --groups --name
alice employees

$ groups
alice employees
```

## n, --name オプション: ID の代わりに名前を表示する

- `n` オプションか `-name` オプションを指定すると ID の代わりに名前を表示する。
- `n` オプションと `-name` オプションは単独で指定することはできなくて以下のオプションと一緒に使っていく。
- `u` オプションか `-user` オプション
- `g` オプションか `-group` オプション
- `G` オプションか `-groups` オプション

## r, --real オプション: 実効ユーザー ID の代わりに実ユーザー ID を表示する

id コマンドはデフォルトは [実効ユーザー ID](https://ja.wikipedia.org/wiki/Setuid) と実効グループ ID を表示するけど `-r` オプションか `--real` オプションを指定すると実効ユーザー ID と実効グループ ID の代わりに実ユーザー ID と実効グループ ID を表示する。

ちょっと分かりにくい気がするので id コマンドをコピーして SUID 属性と SGID 属性をコピーした id コマンドに付与してから実行してみる。

まずユーザー alice が id コマンドをコピーして SUID 属性と SGID 属性をコピーした id コマンドに付与していく。 `chmod ug+s` で SUID 属性と SGID 属性を id コマンドに付与してから ls コマンドを実行すると id コマンドの[パーミッション](http://d.hatena.ne.jp/keyword/%A5%D1%A1%BC%A5%DF%A5%C3%A5%B7%A5%E7%A5%F3)が `rwxr-xr-x` => `rwsr-sr-x` に変わっているのが確認できる。

```plain text
$ whoami
alice

$ pwd
/home/alice

$ cp /usr/bin/id .
$ ls -l ./id
-rwxr-xr-x 1 alice alice 47632 Dec 30 06:04 ./id

$ chmod ug+s ./id
$ ls -l ./id
-rwsr-sr-x 1 alice alice 47632 Dec 30 06:04 ./id
```

`su -` で root になってから `/home/alice/id` コマンドを実行するとユーザー ID とグループ ID はそれぞれ実効ユーザー ID の `alice` と実効グループ ID の `alice` が表示するけど、 `--real` オプションを指定して `/home/alice/id` コマンドを実行するとユーザー ID とグループ ID はそれぞれ実ユーザー ID の `root` と実グループ ID の `root` が表示する。

```plain text
$ su -
# whoami
root

# /home/alice/id --user --name
alice
# /home/alice/id --group --name
alice

# /home/alice/id  --user --name --real
root
# /home/alice/id --group --name --real
root
```

あと id コマンドをオプションなしで実行すると実ユーザー ID、実グループ ID と実効ユーザー ID と実効グループ ID をすべて表示する。

```plain text
# /home/alice/id
uid=0(root) gid=0(root) euid=1000(alice) egid=1001(alice) groups=1001(alice)
```

## z, --zero オプション

id コマンドはデフォルトでは区切り文字は空白だけど `-z` オプションか `--zero` オプションを指定すると NULL 文字を区切り文字にする。 あと実行例の最終行が `aliceemployees$` みたいになってて `id --groups --name --zero` の表示のあとに改行がなくてすぐプロンプトが表示している。

```plain text
$ id --groups --name
alice employees

$ id --groups --name --zero
aliceemployees$
```

- `z` オプションと `-zero` オプションはデフォルトの表示フォーマットでは指定できないので `-user` オプションとか `-group` オプションとかと組み合わせて指定していく。

```plain text
$ id --zero
id: option --zero not permitted in default format
```

## Z, --context オプション

- `Z` オプションか `-context` オプションを指定するとセキュリティコンテキストを表示する。

[SELinux](http://d.hatena.ne.jp/keyword/SELinux) が無効な環境で実行するとこんな感じに表示するよう。

```plain text
$ id --context
sysadm_u:sysadm_r:sysadm_t:s0
```

[SELinux](http://d.hatena.ne.jp/keyword/SELinux) が無効な環境で実行するとこんな感じに表示する。

```plain text
$ docker container run --rm -it ubuntu:20.10 /bin/bash

$ id --context
id: --context (-Z) works only on an SELinux-enabled kernel
```

## a オプション: 他のバージョンとの互換性のためにあるオプション

- `a` オプションは他のバージョンとの互換性のためだけにあるオプションで指定しても id コマンドの動作は一切変わらない。

```plain text
$ id
uid=1000(alice) gid=1001(alice) groups=1001(alice),1000(employees)
$ id -a
uid=1000(alice) gid=1001(alice) groups=1001(alice),1000(employees)

$ id --user --name
alice
$ id --user --name -a
alice
```

# 参考サイト

- [setuid - Wikipedia](https://ja.wikipedia.org/wiki/Setuid)
- [【 id 】コマンド――ユーザーの識別情報を表示する](https://www.atmarkit.co.jp/ait/articles/1808/02/news027.html)
- [SELinux とは - 仕組み、使い方、エラーへの対処 | Red Hat](https://www.redhat.com/ja/topics/linux/what-is-selinux)
- [SELinux の Tips - pyopyopyo - Linuxとかプログラミングの覚え書き -](http://pyopyopyo.hatenablog.com/entry/20090815/p1)
- [groups コマンドの使い方](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/05/195202#groups-%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)
    - [基本的な使い方](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/05/195202#%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9)
    - [-help オプション: ヘルプ](https://ebc-2in2crc.hatenablog.jp/entry/2021/01/05/195202#--help-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E3%83%98%E3%83%AB%E3%83%97)

ユーザーが所属するグループを表示する groups コマンドの使い方のメモ。

このメモは [ubuntu](http://d.hatena.ne.jp/keyword/ubuntu) 20.10 の Docker コンテナ上の groups コマンドを使っている。

```plain text
$ docker container run --rm -it ubuntu:20.10 /bin/bash
```

groups コマンドのバージョン。

```plain text
# groups --version
groups (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by David MacKenzie and James Youngman.
```

# groups コマンドの使い方

groups コマンドはユーザーが所属するグループを表示するコマンド。

groups コマンドは使い方に関しては特に書くことがないくらいシンプルなコマンドだけど自分はたまに「あれ、どうやって使うんだっけ」みたいになるので使い方をメモしておく。

## 基本的な使い方

groups コマンドは `groups <ユーザー>` みたいにユーザーを指定して実行すると指定したユーザーが所属するすべてのグループの名前を表示する。

```plain text
# whoami
root

# groupadd employees
# useradd alice --create-home --groups employees

# groups alice
alice : alice employees
```

groups コマンドは `groups` みたいにユーザーを指定しないで実行すると groups コマンドを実行したユーザーが所属するすべてのグループの名前を表示する。

```plain text
# su - alice
$ whoami
alice
$ groups
alice employees
```

## -help オプション: ヘルプ

- `-help` オプションを指定すると groups コマンドの使い方を表示する……んだけど `man groups` が使えないときにしか使わない。

```plain text
# groups --help
Usage: groups [OPTION]... [USERNAME]...
Print group memberships for each USERNAME or, if no USERNAME is specified, for
the current process (which may differ if the groups database has changed).
      --help     display this help and exit
      --version  output version information and exit

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Report any translation bugs to <https://translationproject.org/team/>
Full documentation <https://www.gnu.org/software/coreutils/groups>
or available locally via: info '(coreutils) groups invocation'
```