---
タグ: []
作成日時: 2023-03-07T19:06:00
URL: https://creators.bengo4.com/entry/2023/02/28/120000#4Storybook%E3%81%A8%E9%80%A3%E6%90%BA%E3%81%99%E3%82%8B
Tags: [topic/デザインシステム/デザイントークン]
---
![[20230228120010.png]]

デザイントークンを使った連携イメージ

![[20230228120014.png]]

Gitlab上でアクセストークンを発行

![[20230228120017.png]]

Tokens Studio For Figma でGitlabと連携

![[20230228120020.png]]

連携画面での確認モーダル

こともやりたかったのですがこちらはまだ非対応で、次のバージョン(4.0)で対応が検討されているようです。

### 4.Storybookと連携する

最後にStorybookのプラグインをインストールして、デザイントークンのドキュメントを生成します。

1. `npm install storybook-design-token` を実行してプラグインをインストールする
2. `.storybook/main.js` にプラグインを追加する

参考： [https://github.com/UX-and-I/storybook-design-token](https://github.com/UX-and-I/storybook-design-token)

プラグインの設定が終わったら、Storybookのストーリーに `DesignTokenDocBlock` を追加すると、さきほど作成したデザイントークンがカテゴリごとに出力できます。

```plain text
// colors.stories.mdx

import { DesignTokenDocBlock } from 'storybook-design-token/dist/doc-blocks';

<DesignTokenDocBlock categoryName="Color" maxHeight={600} viewType="card" />;

```

公式ドキュメントでは「デフォルトでは、トークンカテゴリは次のカテゴリのコメントブロックで終了します」とされていますが、Storybook上でトークンカテゴリがうまく認識されず、プレビュー表示されない現象がありました。

何度か試したところ、オプションとして用意されている終了のコメントブロックも入れておくとプレビュー表示が安定するようでした。そのため、トークングループごとに開始/終了ブロックを宣言するフォーマットにしています。

```plain text
/**
  * @tokens Colors
  * @presenter Color
  */

// ここにVariablesを出力する

/**
  * @tokens-end
  */


/**
  * @tokens FontSize
  * @presenter FontSize
  */

// ここにVariablesを出力する

/**
  * @tokens-end
  */

```

## 今後のアイデア

メンバー間の意思疎通促進に加えて、ツール内外での展開や応用へのハードルが低くなるメリットもあると考えています。

アイデアとしていま試しているものや、他の記事を読んで興味深かったものをいくつか例として紹介します。

### Figma上にドキュメントを自動生成

Token Studio for Figmaでは、トークンを更新するたびに更新されるリファレンスシートを作成できる「[ドキュメンテーション トークン](https://docs.tokens.studio/tokens/documentation-tokens)」という機能があります。トークンの値や説明を変更すると随時更新してくれるのでとても便利です。

この機能を使う際に「[Automator](https://www.figma.com/community/plugin/1005114571859948695)」というプラグインを組み合わせると、定義したデザイントークンを読み取ってレイヤーを作成する作業をさらに自動化できます。

こちらは実際にいくつかのチームのデザイナーが試しているところなので、いずれ別の機会に詳細を記事にできればと思っています。

[www.youtube.com](https://www.youtube.com/watch?v=QA5d8eXPI4A)

![[20230228120007.png]]

Automatorの使い方イメージ

### いまとは別のツールや手段に移行する

上記の紹介ではFigmaとSassを使っていますが、今後の方針によっては別のツールや方法に移行する可能性もあります。 たとえば「SassのVariablesはやめてCSS変数（カスタムプロパティ）に移行しましょう」となったときも、デザイントークンがあれば変数部分の乗り換えハードルが下がります。

今回使ったToken Studio for Figmaも、今後はFigma以外のツールでも使用できるデザイントークンマネージャーを開発する意向を表明しています。

> Figma、Sketch、または次のホットなものを使用しているかどうかに関係なく使用できる専用のデザイン トークン マネージャーにも取り組んでいます。 Figma Tokens becomes Tokens Studio for Figma

### Illustratorのスウォッチにカラーを読み込む

デザイナーの場合、Illustratorでもデザイントークンで定義したカラーを使いたいときがあるかもしれません。 数が少なければ手動で登録すれば良いですが、数が多いときはスクリプトを使ってCSVからスウォッチを作成し一括登録できるアイデアが公開されています。

[www.youtube.com](https://www.youtube.com/watch?v=4CZFWa7Z92E)

JSONからCSVへの変換などの加工は多少必要なものの、大量のカラーコードを手打ちするよりミスも少なく合理的です。

## まとめ

最初に紹介した[@metsa77さんの記事](https://qiita.com/metsa77/items/3e20383237488d64bca2)にもあるように、デザイントークンはただの変数ではなく、組織やチームの共通言語として使う意図があります。

サービスを運用する中で、

- スタイルの適用に使っているツールを別のものに移行したい
- プロダクトをWebから別のプラットフォームに展開したい

などのニーズが出てきたときにも、デザイントークンが「信頼できる唯一の情報源」となってくれるため、ツールやプラットフォームに依存せず運用できることも強みです。

今年に入ってからも、新規で準備しているプロダクトで同じ仕組みを導入したり別チームでも関心を持って検討をしてくれたりと、弁護士ドットコム内でもデザイントークンの輪が徐々に広がってきています。

とはいえ、運用方法がしっかり固まる段階まではもう少しかかりそうなので、社内外の事例や体験談を参考にしながらよりうまく取り入れていければと考えています。