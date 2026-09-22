---
Created: 2025-07-06T01:46:00
URL: https://note.com/dubhunter/n/n33cc295b0bfc
Tags: [topic/デザインシステム/AI活用]
---
![](https://assets.st-note.com/production/uploads/images/199875319/rectangle_large_type_2_b4742aac1f1449db2643b4d6ab6d94d8.png?width=1200)

**Figmaの新機能**「DevMode MCP」と、FigmaのMCPのひとつAIツール「Talk to Figma」を組み合わせて、**デザインレビューの自動化と効率化を試しました**。

### ※この記事はYoutubeでも解説しています

![](https://www.youtube.com/embed/pxX0aq4-GSs?rel=0)

「Figmaのデザインレビュー、もっと効率的にできないかな…」

「客観的な視点でフィードバックが欲しいけど、人に見せるのは少し気が引ける…」

デザイナーなら誰しも一度はこんな悩みを抱えたことがあるのではないでしょうか。

先日、私がX（旧Twitter）に投稿した「AIでFigmaのデザインレビューが捗る方法」が、ありがたいことに多くの方から反響をいただきました。

Figma MCPのアップデートで、アノテーション（注釈）をAIに渡せるようになったので、次のようなことを試してみました。
Figmaでデザインを作成→AIと一緒にフィードバック→それを注釈としてFigmaに自動で書き込む流れです。… [pic.twitter.com/3zh4i9ANLj](https://t.co/3zh4i9ANLj)— 梅本 周作 / アジケ代表取締役 (@dubhunter) [June 30, 2025](https://twitter.com/dubhunter/status/1939537631471448251?ref_src=twsrc%5Etfw)

今回は、この投稿で紹介したAIエディター「Cursor」と「Figma」を連携させて、設計とレビューをシームレスにつなぐ具体的な方法を、こちらの動画と連動して詳しく解説していきます。

近年、**プロダクトの複雑化や開発スピードの加速により、効率的で客観的なデザインレビューの重要性が高まっています**。

従来はレビュワーの主観や経験に依存しやすく、属人的な課題がありましたが、**AIとデザインツールの連携による自動化・標準化が注目**されています。

本記事で紹介するFigmaとCursorのAI連携は、デザイナーの負担軽減やレビュー品質向上に大きな意義があると考え、トライしました。

## この連携で何ができるのか？

![](https://assets.st-note.com/img/1751524141-o7jJakbXPlTBq0nzhH8uQryY.png?width=1200)

全体のながれ

### 【指示】ユーザーがCursorで指示

AIエディター「Cursor」のチャット画面から、レビューしてほしいFigmaデザインのURLを貼り付け、「このデザインをレビューして」とプロンプトを入力します。

### 【情報取得】AIがFigmaの情報を取得

指示を受けたAIは、MCP（Model-Code Protocol）サーバーを介してFigmaファイルにアクセスし、デザイン情報を読み取ります。

### 【生成】AIがレビュー・提案を生成

取得したデザイン情報をもとに、AIがUI/UXの観点から評価や改善案を生成し、Cursor上に表示します。

### 【書き込み】AIがFigmaに書き込み

ユーザーが「この改善案をFigmaに書き込んで」と指示すると、AIは「Cursor talk to figma」プラグインを使い、レビュー結果をFigmaファイル上に直接アノテーション（注釈）として追加します。

この一連の流れにより、これまでデザイナーが一人で行っていた、あるいはチーム内で時間をかけて行っていたレビュープロセスを、AIが瞬時に肩代わりしてくれます。

## 必要なツール

![](https://assets.st-note.com/img/1751524220-viNC5cWGfQ3Fh9jrkVxlUwD6.png?width=1200)

この記事を実践するにあたり必要なもの

[**Figma**](https://www.figma.com/):

今回の連携の要である「Dev Mode MCP」を利用するために、有料プラン（Professional、Organization、Enterpriseのいずれか）への加入が必須です。

[**Cursor**](https://cursor.com/ja)**:**AIを搭載した高機能コードエディターです。無料で利用開始できます。

[**Cursor Talk to Figmaプラグイン**](https://www.figma.com/community/plugin/1485687494525374295/cursor-talk-to-figma-mcp-plugin)**:**CursorからFigmaを操作し、アノテーションを書き込むために必要なプラグインです。有志の方によって開発されています。

[**Figma Dev Mode MCP**](https://help.figma.com/hc/ja/articles/32132100833559-Dev-Mode-MCP%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E5%88%A9%E7%94%A8%E3%82%AC%E3%82%A4%E3%83%89)**:**

Figma公式が提供するプラグインで、CursorがFigmaのデザイン情報を読み取るために使用します。

## MCP（Model Context Protocol）とは？

簡単に言うと、**AIとデザインツールを直接つなぐ橋**のようなもの。これにより、AIがFigmaのデザインデータを理解し、分析できるようになります。

ここからは、動画の内容に沿って具体的なセットアップ手順を解説します。少し専門的な部分もありますが、一つずつ丁寧に進めていきましょう。

### ステップ1: Dev Mode MCPのセットアップ

まずは、Figma公式のプラグイン（Dev Mode MCP）を使って、CursorとFigmaが通信できるように設定します。

※このあたりは動画を見ていただいたほうがイメージがわきます

### 1. Cursor側の設定

- Cursorの Tools & Integrations 設定画面を開きます。
- MCP Tools の中にある Figma の Add Figma to Cursor をクリックし、インストールします。
- インストールが完了すると、MCP Server のリストに Figma が追加され、緑色のインジケーターで有効になっていることを確認します。

### 2. Figma側の設定

- Figmaファイルを開き、左上のメニューから Dev Mode MCP server を有効にします。
- キャンバスの下部に「Dev Mode MCPサーバーが有効になりました」という通知が表示されればOKです。
- Figmaでレビューしたいフレームを選択し、右クリックメニューから「Copy link to selection」でリンクをコピーします。
- Cursorに戻り、コピーしたリンクをチャットに貼り付け、「接続してください」と送信します。
- AIがFigmaのフレーム情報を正しく認識できれば、接続は成功です。

### ステップ2: Cursor Talk to Figma MCPのセットアップ

次に、CursorからFigmaへレビュー結果を書き込むためのプラグインを設定します。動画内でも触れていますが、ここは少し知識が必要なパートです。

※設定方法は下記のmakumaakuさんの記事がわかりやすいです。

[** CursorAIでFigmaのデザインを作る!? cursor-talk-to-figmaを試してみた **](https://zenn.dev/makumaaku/articles/4531ddbb67edd5)[   ](https://zenn.dev/makumaaku/articles/4531ddbb67edd5)[* zenn.dev *](https://zenn.dev/makumaaku/articles/4531ddbb67edd5)

![](https://assets.st-note.com/production/uploads/ext/087e733b71ad6e7716ba36d4e2e6b4b559f65f302b3aa2ef5261275c5f9f.png?x-type=ogp)

### 1. プラグインのインストール

- README.md に記載されている手順に従い、ターミナルを使ってインストールコマンドを実行します。

### 2. 接続の確立

- インストール後、動画で解説されている手順に沿って、ターミナルでWebSocketサーバーを起動します。
- Figma側で Cursor Talk To Figma Plugin を起動し、Use localhost で接続します。
- Cursor側でAIに接続を指示し、Figmaのプラグインに表示されたチャンネルIDを入力することで、双方向の通信が確立されます。

### 実践！AIによるデザインレビュー

すべての設定が完了したら、いよいよAIにデザインレビューを依頼します。

### 1.レビュー依頼と結果確認

Cursorのチャットで、Figmaのデザイン情報を読み込ませた後、以下のようなプロンプトを入力します。

このコンポーネントをUI/UXデザイナーの視点でフィードバックしてください。改善点があればそれも書いてください。

するとAIは、「良い点」と「改善提案」に分けて、具体的なフィードバックを瞬時に生成してくれます。

### 2. Figmaへアノテーションを挿入

生成されたレビュー結果を、Figmaのデザイン上に直接書き込んでもらいましょう。

先ほどの改善案をアノテーションとしてFigmaに書き込んでください。

この指示一つで、AIは関連するコンポーネントの横に、改善点をアノテーションとして自動で配置してくれます。

### 3. アノテーションの整理（カテゴリ分け）

さらに、レビュー内容を整理するためにカテゴリ分けを指示することも可能です。

アノテーションにカテゴリを付けてください。今回は任意で結構です。

![](https://assets.st-note.com/img/1751524514-VGIjzueKpFQHBkRJ80T7l4Aq.png?width=1200)

カテゴリ付きのアノテーションがついたFigmaのデザイン

これにより、「インタラクション」「アクセシビリティ」「コンテンツ」といったカテゴリごとにフィードバックが整理され、格段に見やすくなります。

Figma MCPとAIを組み合わせることで、デザインレビューにおける客観的な基準を導入し、フィードバックの品質と一貫性を向上させることができました。

この技術により、属人的なアドバイスを減らし、先人の知見に基づいた建設的なフィードバックが可能になります。

- [Cursor MCP Servers Tool](https://docs.cursor.com/tools/mcp)
- [Cursor Talk to Figma MCP Plugin](https://www.figma.com/community/plugin/1485687494525374295/cursor-talk-to-figma-mcp-plugin)

## 🤝メンバーを募集しています！【チーム伴走型のサービスデザイン会社｜アジケ】✒️

アジケでは、一緒に「人にとって豊かな体験をデザインすることで、『味気ある世の中』をつくる ”同志”を募集しています！

＜働き方＞

・リモートワークOK（一部出社あり）

・フレックスタイム制（コアタイム11:00~16:00）

＜現在募集中のポジション＞

・UIデザイナー