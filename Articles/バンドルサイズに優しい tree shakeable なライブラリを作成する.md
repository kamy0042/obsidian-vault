---
タグ: []
作成日時: 2024-03-07T16:57:00
URL: https://zenn.dev/nissy_dev/articles/how-to-make-tree-shakeable-libraries#%E3%83%88%E3%83%83%E3%83%97%E3%83%AC%E3%83%99%E3%83%AB%E3%81%A7%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AB-%2F*%23__pure__*%2F-%E3%82%B3%E3%83%A1%E3%83%B3%E3%83%88%E3%82%92%E6%8C%BF%E5%85%A5%E3%81%99%E3%82%8B
Tags: [topic/デザインシステム/配信基盤]
---
![[og-base-w1200-v2 6.png]]

もし、ライブラリ内に副作用のあるコードを含む場合は、配列でファイル名を列挙します。列挙の仕方などは、[webpack のドキュメント](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)が参考になります。

### トップレベルで実行するコードに `/*#__PURE__*/` コメントを挿入する

トップレベルで実行されるコードは副作用をもつと判断されますが、実際に tree shaking されても問題無いコードもあると思います。社内のライブラリでも、次のようなコードが原因で tree shaking されてほしいコードがバンドルされてしまうケースがありました。

```plain text
export const someContext = React.crateContext(null);

```

**このようなコードについては、次のように **`**/*#__PURE__*/**`** コメントを挿入します。これによって、バンドラーに文 (statement) 単位での副作用がないことを明示できます。**

```plain text
export const someContext = /*#__PURE__*/ React.crateContext(null);

```

[react-redux](https://github.com/reduxjs/react-redux) などのライブラリでも、実際にこのような対応がされています。

このコメントについては、バンドラー内部で利用している minifier ([terser](https://github.com/terser/terser) など) が解釈し、副作用がないことを理解しています。

## まとめ

この記事では、バンドルサイズに優しい tree shakeable な JavaScript ライブラリの作成方法について紹介しました。最近だと、デザインシステムの重要性が高まって来たり、monorepo 開発のツールも多く登場している事もあって、JavaScript ライブラリを開発することも多いと思います。開発しているライブラリのバンドルサイズが気になっていて、tree shaking について右も左もわからないと感じている方の参考になれば幸いです。

最後になりますが、JavaScript ライブラリを作成する際のより一般的な Tips については、次のリポジトリも参考になります。良いライブラリ生活を！

脚注

1. 
広義な意味では、dead code elimination と同じように感じるのですが、あえて異なる名前にしている理由については [Rich Harris さんがブログを書いて説明していました](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)。 [↩︎](https://zenn.dev/nissy_dev/articles/how-to-make-tree-shakeable-libraries#fnref-e092-1)
2. 
複数のモジュール形式で配布を行う場合の package.json の設定は、[こちらの記事](https://trap.jp/post/1666/)にもある通り歴史的経緯から難しいケースが多いので、[publint](https://github.com/bluwy/publint) や [Packemon](https://packemon.dev/) などのツールを検討してもよいかもしれないです。 [↩︎](https://zenn.dev/nissy_dev/articles/how-to-make-tree-shakeable-libraries#fnref-e092-2)
3. 
[こちらの記事](https://www.kabuku.co.jp/developers/tree-shaking-in-2018)によると、CJS 形式のコード の tree shaking に対応するバンドラーとして [Parcel](https://parceljs.org/) があるようです。 [↩︎](https://zenn.dev/nissy_dev/articles/how-to-make-tree-shakeable-libraries#fnref-e092-3)
4. 
サンプルコードや依存ツリーの図を用いながらの丁寧な解説となっており、気になる人は「Preserve the library's module tree and ...」のタイトルで始まる章を読んでみることをおすすめします。 [↩︎](https://zenn.dev/nissy_dev/articles/how-to-make-tree-shakeable-libraries#fnref-e092-4)

[GitHubで編集を提案](https://github.com/nissy-dev/zenn-docs/blob/main/articles/how-to-make-tree-shakeable-libraries.md)