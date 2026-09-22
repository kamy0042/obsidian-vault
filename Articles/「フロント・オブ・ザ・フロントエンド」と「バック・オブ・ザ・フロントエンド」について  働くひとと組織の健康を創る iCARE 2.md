---

Tags: [topic/組織/キャリア]
---
[https://dev.icare.jpn.com/dev_cat/front-of-the-front-end_back-of-the-front-end](https://dev.icare.jpn.com/dev_cat/front-of-the-front-end_back-of-the-front-end)

![](https://d39kau1ie0fw3g.cloudfront.net/wp-content/uploads/2021/03/29133259/Screen-Shot-2021-03-29-at-13.31.50-600x338.png)

こちらの記事はzennにも投稿しています。

[https://zenn.dev/watsuyo_2/articles/c36a3880cf6e3e2fc21c](https://zenn.dev/watsuyo_2/articles/c36a3880cf6e3e2fc21c)

## フロントエンドエンジニアの多様性

ひょっこりカジュアル面談や採用活動に片足を突っ込んでみると、

- どんなエンジニアが今の組織に必要なのだろうか？
- どういう基準で採用、お見送りを判断すれば良いのだろうか？ と考えるきっかけになります。

直近は、フロントエンドエンジニアメンバーと1on1や雑談をしている中で`フロントエンドエンジニア`の主語は大きすぎて様々なタイプのエンジニアがいるなぁと日々感じています。

そんな中、Webデザイナーの[Brad Frostさん](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/)の記事を参考にフロントエンドエンジニアの分類についてまとめてみます。

Brad Frostさんはデザインシステムを作成する方法として、[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)も提唱しています。

## 「フロント・オブ・ザ・フロントエンド」と「バック・オブ・ザ・フロントエンド」について

フロントエンドエンジニアを2分すると

- フロント・オブ・ザ・フロントエンド(front-of-the-front-end)
- バック・オブ・ザ・フロントエンド(back-of-the-front-end) となります。 次に両者の違いを確認してきます。

## 両者の簡単な違い

例えば、フロントエンドエンジニアがUI上のボタンの外観を実装し、そのボタンがクリックしたとします。

### フロント・オブ・ザ・フロントエンドエンジニアは、HTML、CSS等のプレゼンテーション層やJavaScriptの実装を専門とするエンジニア

- ボタンの見た目を実装 
    ### バック・オブ・ザ・フロントエンドは、Webアプリケーションを適切に機能させるために必要なJavaScriptの実装を専門とするエンジニア
- ボタンがクリックされたときのイベントを実装

次は両者の詳細な違いを明らかにしていきます。

## フロント・オブ・ザ・フロントエンドエンジニア

### 定義(再掲)

- フロント・オブ・ザ・フロントエンドエンジニアは、HTML、CSS等のプレゼンテーション層やJavaScriptの実装を専門とするエンジニア

### 役割

- ブラウザ、アクセシビリティ、SEO、HTMLを様々な環境に適した体験を作るために、アクセシビリティに重点を置いてセマンティックHTMLを作成
- 色、タイポグラフィ、レスポンシブ、アニメーションなど、UIのあらゆる視覚的側面に対応し、ウェブ体験における見た目をコントロールするCSSコードを作成
- モジュール性、柔軟性、互換性、拡張性に重点を置いて、柔軟性の高いCSSコードを設計
- アコーディオンパネルの開閉、モーダルウィンドウを閉じるなどのJavaScriptの実装
- PC、モバイル、タブレット、その他のデバイスでUIの確認をするために、ブラウザやデバイス間でテストを行う
- パフォーマンスを最適化することで、軽量化、ローディングの高速化などの体験を実現
- デザイナーと協力して、ブランディング、デザインビジョン、UXのベストプラクティスが適切にブラウザへ反映
- フロントエンドのコードがバックエンドのコード、サービス、API、その他のアーキテクチャと互換性があることを確認
- プレゼンテーション用のUIコンポーネントを作成し、他のエンジニアが使用できるように共通化
- 各UIコンポーネントのために、堅牢で直感的なコンポーネントを作成、文書化し、コンポーネントを使用するエンジニアが必要なものを簡単にプラグイン化
- UIコンポーネントのユニットテストを作成し、コンポーネントの外観と機能が適切であることを確認
- UIコンポーネントをメンテナンス

次に、バック・オブ・ザ・フロントエンドが具体的に何をするのかを確認します。

## バック・オブ・ザ・フロントエンドエンジニア

### 定義(再掲)

- バック・オブ・ザ・フロントエンドは、Webアプリケーションを適切に機能させるために必要なJavaScriptの実装を専門とするエンジニア

### 役割

- CRUD機能などを扱うアプリケーションのビジネスロジックを記述し、アプリケーションのState、ルーティング、キャッシュ、認証/認可などを制御。つまり、バック・オブ・ザ・フロントエンドエンジニアは、アプリケーションが正しく機能するために必要な実装をする
- CMSからのコンテンツ取得、操作、表示や、ユーザーがフォーム送信したときにデータをPOSTする
- フロント・オブ・フロントエンドエンジニアが作成したUIコードを利用して、画面を構成
- JavaScriptコードのパフォーマンスを最適化することで、データを素早く取得や投稿できるアプリケーションを実現する
- アプリケーションが意図された通りに動作することを確認するためのE2E、統合テスト、その他のテストの作成
- Node.js、ツールなど、JavaScriptベースのインフラを構築・管理
- JavaScriptのモジュールバンドラー、デプロイメントツール、CI/CDなどのDevops関連の管理
- フロント・オブ・ザ・フロントエンドエンジニアと協力して、UIコンポーネント・ライブラリに、アプリケーションのStateを構築するために必要なコンポーネント、変数、APIフックが含まれていることを確認
- 適切な技術インフラを整備し、アプリケーションがJavaScript以外のバックエンドコード(API)と適切に通信できるように実装

## そもそも分類する必要あるの？

- 正直、既にフロントエンドエンジニアといってもできることは多様で(SSRやサーバーレスで実装できるし、インフラもGUIから誰でも触れるし)、肩書として名乗るれるほど明確な分類はできないと思います。
- 1画面や機能を実装する場合は、デザイン実装からState管理、ユーザーアクションを含めたインタラクティブな実装まで一貫して行うケースも多いです。
- ただ、採用や評価の際に、フロントエンドエンジニアという巨大主語から、ある程度の分類をすることによって、今、エンジニア組織に必要なタイプのエンジニアはどんなタイプだろうか？だったり、中長期的に目指すフロントエンドエンジニア像の提案がしやすくなるのではないかと考えます。

## おわりに

最後に、iCAREではフロントエンドエンジニアを採用をしています。

Vue.js(Composition API)、TypeScript、GraphQLで開発してます。

興味のある方は、Wanteadlyもしくは記事を書いた[watsuyo_2](https://twitter.com/watsuyo_2)までご連絡ください。

[https://www.wantedly.com/projects/549145](https://www.wantedly.com/projects/549145)

## 参考文献

- 
[https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/)
- 
[https://www.bram.us/2021/02/19/front-of-the-front-end-back-of-the-front-end/](https://www.bram.us/2021/02/19/front-of-the-front-end-back-of-the-front-end/)
- 
[https://sagaratechnology.medium.com/the-fundamentals-of-front-end-and-back-end-development-5973ac0910cf](https://sagaratechnology.medium.com/the-fundamentals-of-front-end-and-back-end-development-5973ac0910cf)