---
URL: https://qiita.com/yaki-shake/items/737a4acf23dfac358b89
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
LaravelやRailsみたいな環境で、バックエンドからフロントエンドに値を渡したいときのアレです。i18n対応とか。~~方法忘れて2時間くらい溶けたのでメモ。~~

## 今回の用途

LaravelのViewから `@lang('hoge.fuga')` ヘルパ関数で、i18n済みメッセージ文字列を渡したい

> 今回は省略しますが、セキュリティ対策は各環境でお願いします。

### Laravel View

コツってほどでもないですが `mix()` は一番最後。

dokoka.blade.php

`... 中略

<script>
  var __SYS_GLOBALS_ = {
    HOGE_FUGA_MESSAGE: "@lang('hoge.fuga')"
  };
</script>

... 中略
/
<script src="{{ mix('/js/app.js') }}"></script>
</body>
</html>`

### Typescript側

モジュールとして、どこか新規ファイルに下記のように書いておけば良いです。**ただしインポートするとエラーになります。**インポートはしない。不思議ですよね。

__SYS_GLOBALS__.ts

`export {};
declare global {
  const __SYS_GLOBALS__: any;
}`

> インポートするとTS内で再定義されてしまうのでしょうか、その場合確かに(TS内には)実体はないのでエラーになりそう。TS2304: Cannot find name '__SYS_GLOBALS__'.

あとはお好みで定数を使います。

nanika.ts

`alert(__SYS_GLOBALS__.LOADING_NOW_MESSAGE);`

### まとめ

こんな設計はいけません。わかってはいるのですが、そういうときもあるのです。[終]