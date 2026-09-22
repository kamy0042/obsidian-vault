---
title: "What happens to the design system when AI changes the product?"
source: "https://medium.com/design-bootcamp/what-happens-to-the-design-system-when-ai-changes-the-product-ee5e0cecba22"
author:
  - "[[Wenbin]]"
published: 2026-03-23
created: 2026-04-20
description: "What happens to the design system when AI changes the product? Design systems were built for operators. AI is turning users into decision-makers. The assumptions underneath need to evolve. I’ve …"
Tags: [topic/デザインシステム/AI活用]
---
[続く](https://medium.com/me/following-feed/writers?source=post_page---sidebar_menu-----------------------------------------)

[中級スタッフ](https://medium.com/me/following-feed/writers/a32c340ea342?source=post_page---sidebar_menu_following------------------------------following_badge-----------)

フォローすべき作家や出版物を見つけよう。

[提案を見る](https://medium.com/me/following/suggestions?source=post_page---sidebar_menu_following-----------------------------------------)

## [ブートキャンプ](https://medium.com/design-bootcamp?source=post_page---publication_nav-48e972f5c24e-ee5e0cecba22---------------------------------------)

[![ブートキャンプ](https://miro.medium.com/v2/resize:fill:76:76/1*_wDJs77bAPiwuAe9qOK5Zg.png)](https://medium.com/design-bootcamp?source=post_page---post_publication_sidebar-48e972f5c24e-ee5e0cecba22---------------------------------------)

アイデアから製品まで、一つずつ学びながら。あなたのストーリーを投稿するには： [https://tinyurl.com/bootspub1](https://tinyurl.com/bootspub1)

![記事の表紙：タイトルテキスト「AIが製品を変えると、デザインシステムはどうなるのか？」とともに、丸みを帯びた形状から角張った形状へと変化する抽象的な幾何学的形状。](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CQoL5LFpIng7ge1EpAtiiw.png)

記事の表紙：タイトルテキスト「AIが製品を変えると、デザインシステムはどうなるのか？」とともに、丸みを帯びた形状から角張った形状へと変化する抽象的な幾何学的形状。

## 設計システムはオペレーター向けに構築されてきた。AIはユーザーを意思決定者へと変えつつある。その根底にある前提を進化させる必要がある。

私は長年、企業向けUXや企業向け製品のためのデザインシステム構築に携わってきました。ゼロから構築したり、成熟したシステムを引き継いだり、周辺製品の進化に合わせてシステムを運用し続けたりしてきました。そのため、ここ1年ほど「AIとデザインシステム」に関する記事を読み始めたとき、私は答えを探していたのです。

それらのほとんどに私は苛立ちを覚えました。どれもAIを使ってコンポーネントコードをより速く生成したり、デザインファイルが仕様に準拠しているかを確認したり、トークンをより効率的に管理したりといった内容ばかりです。確かに、これらは真の改善点です。しかし、これらはすべて **効率性の向上に過ぎません** 。既存のワークフローを少し速くするだけです。誰もより根本的な問いを投げかけていません。AI **が製品そのものを変えたとき、デザインシステムはどうなるのでしょうか？**

これらは同じ問題ではありません。一方はレンガをより速く積むことに関する問題であり、もう一方は建物の形状が変わることに関する問題です。

1年前、私は何をすべきか全く分からなかった。あらゆるものが変化しているのを感じていたが、どう対応すればいいのか見当もつかなかった。周りの多くの人も同じように感じていた。これは、私がその変化に対応しようと試みたものだ。

## 今すぐB2B製品を見てください

Google広告、Meta Ads Manager、HubSpotなど、あるいは他のエンタープライズ向け製品でも構いません。表面的な機能は進化していますが、基本的なレイアウトは驚くほど安定しています。左側にナビゲーションツリー、中央にデータテーブル、右側に詳細パネル。広告やCRMレコードを作成したいですか？それなら、複数のステップからなるフォームをクリックし、フィールドを一つずつ入力していく必要があります。

そして、当社のデザインシステムはまさにそれに基づいて構築されています。テーブルコンポーネント、フォームコンポーネント、ナビゲーションコンポーネント、フィルターなど、長年にわたる改良を経て、エンタープライズソフトウェアにおけるほぼすべての既知のインタラクションパターンを網羅しています。

しかし、既に動きは始まっている。Google広告には、AIがオーディエンスの選択と入札を自動的に処理する [Performance Maxが導入された。Salesforceは、どのリードがコンバージョンにつながるかを予測するために](https://support.google.com/google-ads/answer/10724817) [Einstein AI](https://www.salesforce.com/artificial-intelligence/) を組み込んだ 。Notion [は、ドキュメントやデータベースのあらゆる部分にAIを導入した](https://www.notion.com/product/ai) 。

![2つのインタラクションモデルを比較した図。左：「オペレーター」—ユーザーがフォームのフィールドに入力し、送信ボタンをクリックする。右：「意思決定者」—AIが提案を生成し、ユーザーがそれを受け入れる、編集する、または拒否する。](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mo-OQEP3ulYhkDhOGt73lw.png)

オペレーターから意思決定者へ：デザインシステムが追いついていないインタラクションモデルの変化。

これらは単なる新機能ではありません。ユーザーと製品との関わり方を変えるものです。以前は「システムに何をすべきかを段階的に指示する」というものでした。しかし今では「自分が何を望んでいるかをシステムに伝えれば、システムがそれを解決してくれる」という形になりつつあります。ユーザーは操作者から意思決定者へと変化しているのです。

そして、当社の設計システムは？オペレーターのために設計されています。

## 根底にある前提が崩れる

デザインシステムは、孤立して構築されるものではありません。すべてのシステムは、製品とは何か、そしてユーザーがどのように製品とインタラクトするかについての一連の前提に基づいています。過去10年間、これらの前提はあまりにも安定していたため、ほとんどの人はその存在すら忘れていました。AIは、それらを一つずつ明らかにしつつあります。

**前提その1：インタラクションは直線的である。** ユーザーはAからB、そしてCへと進み、一連の流れを順番に完了する。この前提に基づいて構築されたデザインシステムは、ステップインジケーター、複数ページフォーム、そして直線的なナビゲーションを生み出した。しかし、AIがユーザーの意図から結果へと直接ジャンプし、途中のステップを圧縮またはスキップできるようになった今、これらのコンポーネントは何の役割を果たしているのだろうか？直線性は完全に消滅したわけではない。多くのシナリオにおいて、ユーザーは依然として正確な制御を必要としている。しかし、それはもはや唯一の道ではない。そして、私たちのシステムはこの道しか知らないのだ。

**前提２：ユーザーは操作者である。** これはより根本的な前提かもしれない。我々のデザインシステムのコンポーネントは、ほぼすべて同じ質問に答えている。「 *ユーザーは何をする必要があるのか？」* フィールドに入力する、ボタンをクリックする、オプションを選択する。コンポーネントの語彙全体はアクションを中心に構築されている。入力、選択、切り替え、送信。しかし、AIが登場すると、ユーザーはレビュー担当者および意思決定者になる。もはやシステムにステップバイステップで何をすべきかを指示するのではなく、システムが出した結果を評価する。これには全く異なるコンポーネント言語が必要となる。推奨事項をどのように提示するのか？提案をどのように説明するのか？ユーザーが受け入れるか拒否するかについて十分な情報に基づいた選択をできるように支援するのか？AIモードと手動制御をスムーズに切り替えられるのか？我々のコンポーネントライブラリには、これらの機能がほとんどない。

この2つの前提は別々の問題ではなく、同じことを意味している。つまり、 **デザインシステムの世界観が時代遅れになりつつあるということだ。** 「時代遅れ」というのは、それが壊れているという意味ではない。進化する必要があるという意味なのだ。

しかし、一体何に進化するのでしょうか？これは、業界のほとんどがまだ真剣に検討していない部分だと思います。「デザインシステムをAI化する」という話になると、議論はほぼ必ずツールレベルにとどまります。AIを使ってボタンを作成したり、コードを生成したり、仕様を確認したりする。これは進化ではありません。古い車に新しいエンジンを搭載するようなものです。車は依然として同じ車です。

真の進化とは、形態に関わるものです。デザインシステムはもはや、単なるコンポーネントライブラリとドキュメントのセットであってはなりません。オペレーター（形態、線形フロー、決定論的な相互作用）と意思決定者（推奨、レビュー、非線形、不確実性）という2つの世界観を同時に保持できるものでなければなりません。そして、その2つの世界観間の移行を管理する必要があります。なぜなら、その移行がどれくらい続くのか、どこに落ち着くのかは誰にもわからないからです。

そこが実は難しいところなんです。動かす必要のない土台はどこなのか？何を再構築しなければならないのか？そして、システム全体を停止させることなく、どうやって再構築するのか？

## 私が試してきたことは

基盤となるレイヤーは安全だと言えるでしょう。製品がどのように進化しようとも、人間が情報を認識する方法は変わりません。テキストは読みやすく、色はコントラストがあり、間隔はリズムがあり、ブランドは認識可能でなければなりません。デザイントークン、フォントサイズ、アクセシビリティ基準など、AIはこれらのどれも変えません。

私は実際にこの現象を目の当たりにしてきました。AI機能が製品に導入されても、基盤となるレイヤーはそのまま機能し続けます。すべてが不安定に感じられる時でも、足元を見渡せば、土台がしっかりとしていることが分かるので安心できます。

本当の問題は、インタラクションパターンのレイヤーにある。フォーム、テーブル、直線的なワークフローは、完全に消滅するわけではないが、その独占的な地位を失いつつある。新しいパターンが出現しているのだ。そして、今、私たち大多数が時間を費やすべきは、まさにこの部分だと私は考えている。

**提案とレビュー。** システムが何かを提案します。ユーザーはそれを見て、承認、変更、または拒否を決定します。これにはまったく新しいコンポーネントロジックが必要です。推奨事項をどのように提示しますか？比較をどのように表示しますか？システムがこれを提案した理由をどのように説明しますか？私が初めて製品でこのパターンをサポートしようとしたとき、チームの本能は既存の確認ダイアログを再利用することでした。うまくいきませんでした。確認ダイアログは「本当によろしいですか？」と尋ねます。提案レビューコンポーネントは「これが私の考えです。どう思いますか？」と尋ねます。これらはまったく異なる会話です。

**段階的な委任。** ユーザーはAIに処理を委ねたり、制御を取り戻したりすることができ、2つのモード間をスムーズに切り替えることができます。1つの機能で両方のモードを同時にサポートする必要がある場合もあります。実際には、これは想像以上に難しい作業です。なぜなら、基本的に2つのインタラクションモデルを並行して維持する必要があり、それらの間の遷移はアプリを切り替えるような感覚ではなく、シームレスに感じられる必要があるからです。デザインシステムでは、その仕組み、開始点と終了点の外観、引き継がれる状態、リセットされる状態などを定義する必要があります。

**不確実性の表現。** これは、間違えると事態を悪化させる可能性があるため、詳しく見ておく必要があります。AIの出力に信頼度パーセンテージを付けるのが自然な発想です。「82%の信頼度」。しかし実際には、ほとんどのユーザーはその数値をどう扱えばよいのか分かりません。82%というのは、信頼すべきという意味でしょうか？編集すべきでしょうか？最初からやり直すべきでしょうか？

私の経験上、より効果的だったのは、意思決定の重要性に合わせてコミュニケーションスタイルを合わせることでした。

リスクが低く、元に戻せる操作（フォームフィールドの自動入力など）の場合は、明確な取り消し方法とともに提案をインラインで表示するだけで十分です。信頼度スコアは必要ありません。間違えた場合でも損失は少ないため、余計な手間をかける必要はありません。

中程度の重要度を持つアクション（オーディエンスセグメントの推奨や予算配分など）については、それが提案であることを明確に示し、その根拠を提示してください。「類似製品をターゲットとした過去のキャンペーンに基づいています。」ユーザーは、モデルの確信度が78%であることを知る必要はありません。ユーザー自身が判断を下せるだけの十分な情報が必要です。

For high-stakes or irreversible actions (like publishing a campaign or committing budget), don’t frame them as recommendations at all. Frame it as a draft that requires review. Show source data. Make the user actively confirm rather than passively accept.

The point is: uncertainty expression isn’t one pattern. It’s a spectrum. And the design system needs to define which pattern applies at which level of consequence.

![不確実性の度合いは、低リスク（インライン提案、簡単に取り消し可能）、中リスク（理由付きのラベル付き提案）、高リスク（ソースデータ付きのドラフト、積極的な確認が必要）の3段階に分かれています。左から右に向かって摩擦が増加する様子がスケールで示されています。](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*njLHb36RRdWPWoMnTPygEg.png)

Match the friction to the stakes. Not every AI suggestion needs the same level of scrutiny.

**Trust repair.** This is the one I see almost nobody talking about, but it might matter more than any of the above. AI will get things wrong. Not occasionally, regularly. And when it does, the user’s trust drops. The design system needs patterns for how the product recovers from that. What does the AI say when it’s wrong? How does the interface acknowledge the error without being so apologetic that users lose confidence in the whole feature? How do you make it easy to correct the system and make sure the correction sticks?

In my experience, the worst thing you can do is silently get it wrong and hope the user doesn’t notice. The second worst is an over-engineered “we’re sorry” moment that makes the AI feel fragile. The sweet spot is something closer to how a good colleague handles a mistake: acknowledge it, fix it, move on. But defining that in a component-level pattern, the exact copy, the visual treatment, the interaction flow is genuinely hard. This is something I’m still working through.

One thing worth noting: **don’t try to build a perfect AI component library right now.** Nobody knows what AI interactions will look like in their final form. Not the PMs. Not the engineers. Not the researchers. If you try to nail down a comprehensive set of AI patterns today, most of it will be outdated in six months. How these new patterns get introduced, validated, and retired is really no different from how any component lifecycle works. Experimental to recommended to standard to deprecated. The existing governance mechanisms still apply.

## Where this goes

A couple of longer-term questions I keep coming back to.

**Does “consistency” need a new definition?** Design systems have always been about consistency, same family feel across products and pages. But if AI starts tailoring every user’s interface differently, maybe consistency stops being about visual sameness. Maybe it becomes about the mental model staying coherent, regardless of what the interface looks like. Two users could see completely different layouts and still understand where they are and what they can do. That’s a different kind of consistency, and we don’t have good language for it yet, let alone patterns.

**Maybe the endgame isn’t a component library at all. Maybe it’s a set of constraints.** A system that tells AI: you can generate whatever you want within these boundaries, but don’t cross these lines. Less about providing components, more about defining rules. If that’s true, it changes what a design system even is. And it changes the skill set of the people who work on them, less about building and maintaining components, more about defining how experiences work at a structural level.

These two questions might actually be the same question, viewed from different angles. If consistency becomes about mental models rather than pixels, and if the system becomes constraints rather than components, then the future design system is something much closer to a constitution than a library. Here’s what we believe. Here’s what we protect. Go build.

I don’t know if I’m right about all of this. But I think about it every day, and I figured it was worth writing down. If you’re dealing with similar questions, I’d love to hear how you’re thinking about it.