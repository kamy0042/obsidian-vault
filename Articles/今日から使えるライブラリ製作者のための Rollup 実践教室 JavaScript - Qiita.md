---
タグ: []
作成日時: 2024-03-07T16:55:00
URL: https://qiita.com/karak/items/9bc75ee0bc3db37a001d#%E3%83%97%E3%83%AD%E3%83%80%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%93%E3%83%AB%E3%83%89
Tags: [topic/デザインシステム/配信基盤]
---
やっていることは見てのとおり。ES2015 用の "file" と package.json の "module" エントリを揃えるのを忘れないこと。

## プロダクションビルド

### Minify/Uniglify

uglify プラグインを追加する。

### Source Map

デバッグに必須のソースマップを使うには、istanbul プラグインを追加する。"node_modules" 以下にあるファイルなど特定のファイルを除外することもできる。

両者を含む設定はつぎのようになる。

rollup.config.js

```plain text
import istanbul from 'rollup-plugin-istanbul';
import uglify from 'rollup-plugin-uglify';

const plugins = [
  // always
  ...
];

if (process.env !== 'production') {
  // dev-only
  plugins.push(istanbul({
    exclude: [
      'test/**/*.js',
      'node_modules/**/*.js'
    ]
  }));
} else {
  // production-only
  plugins.push(uglify());
}

export default {
  ...
  pluguins,
};

```

## UMD モジュールの出力

UMD モジュールでの出力を最近使ったので、追加で記述しておく。

rollup.config.js

```plain text
export default {
  ...
  output: {
    file: './dist/index.umd.js',
    format: 'umd',
    name: 'YourGreatLibrary',
    global: {
      'jquery': 'jQuery',
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  }
}

```

新たな項目が2つ出てきている。それぞれについて説明する。

- name …… 自身のパッケージのグローバル名。
- output.global ...… 依存パッケージのパッケージ名と UMD におけるグローバル名の対応を記述する。

注意点として、UMD にないものは自身のバンドルに加えるようにしなければならない（「バンドル用設定」を参照）。

## 参考

- [Rollup Official Guide](https://rollupjs.org/guide/en)
- [Rollup Starter Project](https://github.com/rollup/rollup-starter-project)
1. 
[https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c) [↩](https://qiita.com/karak/items/9bc75ee0bc3db37a001d#fnref1)

![]('https://cdn.qiita.com/assets/public/image-qiitan_for_login_modal-014e085d3e40a240e3fe8d61b70b29a9.png')

Register as a new user and use Qiita more conveniently

2. You get articles that match your needs
3. You can efficiently read back useful information
4. You can use dark theme

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fkarak%2Fitems%2F9bc75ee0bc3db37a001d&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fkarak%2Fitems%2F9bc75ee0bc3db37a001d&realm=qiita)