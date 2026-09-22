---
title: "The Design System You Actually Need"
source: "https://www.designsystemscollective.com/the-design-system-you-actually-need-791f5b697731"
author:
  - "[[Han]]"
published: 2026-02-21
created: 2026-04-20
description: "The Design System You Actually Need I’ve seen teams spend six months building a design system nobody uses. I’ve also seen a shared Figma file with twelve components carry a startup through its …"
Tags: [topic/デザインシステム/批評・本質論]
---
[続く](https://medium.com/me/following-feed/writers?source=post_page---sidebar_menu-----------------------------------------)

[中級スタッフ](https://medium.com/me/following-feed/writers/a32c340ea342?source=post_page---sidebar_menu_following------------------------------following_badge-----------)

フォローすべき作家や出版物を見つけよう。

[提案を見る](https://medium.com/me/following/suggestions?source=post_page---sidebar_menu_following-----------------------------------------)

## [デザインシステムズコレクティブ](https://www.designsystemscollective.com/?source=post_page---publication_nav-dbd299f90c1d-791f5b697731---------------------------------------)

[![デザインシステムズコレクティブ](https://miro.medium.com/v2/resize:fill:76:76/1*KfuDI5s2VksG_8pWv0nCFA.jpeg)](https://www.designsystemscollective.com/?source=post_page---post_publication_sidebar-dbd299f90c1d-791f5b697731---------------------------------------)

拡張性と一貫性のあるデザインに情熱を注ぐデザイナーや開発者のための、温かいコミュニティです。記事、洞察、リソースを活用して、デザインシステムの構築と改善に役立ててください。ぜひご参加いただき、交流を深め、共に学び、体系的なデザインの未来を形作っていきましょう。

誰も使わないデザインシステムを構築するために、チームが6ヶ月も費やしているのを見たことがあります。

また、12個のコンポーネントからなる共有Figmaファイルを使って、スタートアップ企業がシリーズB資金調達を成功させた事例も見てきました。これらはどちらも実話です。どちらのチームも、当時の判断において間違っていたわけではありません。

デザインシステムの構築に関するアドバイスはたくさんあります。トークン、セマンティックレイヤー、貢献モデル、バージョン管理戦略、アクセシビリティ監査など。そして、それらはすべて最終的には重要です。しかし、デザインシステムについて語る際に、私たちはあるステップを飛ばしているように思います。 *実際に今何が必要なのか* を問うことなく、 *どうすればうまく構築できるか* という話に直結してしまうのです。

そのステップについてお話ししたいと思います。

## 解決策ではなく、問題から始めよう

ShopifyやGitHub、Atlassianが構築したものを見て、 *「これがデザインシステムの姿だ」と* 考えてしまいがちです。そして、それを自分たちで構築しようと試みるのです。たった4人のチームのために。

これは罠だ。

彼らの設計システムは、 *彼らの* 問題を解決する。彼らには数百人のエンジニアがおり、数十種類の製品があり、長年にわたって蓄積された矛盾を解消する必要があった。彼らの解決策の形は、彼らが抱える問題の形に対する反応なのだ。

あなたの問題は恐らく別のものでしょう。

問題は、2人のデザイナーがそれぞれ微妙に異なるボタンを作り続けていることかもしれません。あるいは、新しく採用したデザイナーがどの青色を使うべきか分かっていないのかもしれません。もしかしたら、アプリに3種類の異なるモーダルパターンがあり、ユーザーが混乱しているのかもしれません。

*これらは現実的な問題です。解決するために本格的なデザインシステム™は* 必要ありません 。場合によっては、共有のFigmaライブラリと「モーダルウィンドウの作成方法は以下のとおりです」と書かれた短いドキュメントがあれば十分です。

以上です。これがデザインシステムです。見た目は派手ではありませんが、機能します。

## ベストプラクティスバイアス

私がよく遭遇する特定のバイアスがあります。正式な名称があるかどうかは分かりませんが、私はそれを「 *ベストプラクティスバイアス」* と呼んでいます。それは次のようなものです。

> *「もし最善の方法がXであるならば、Xを下回るということは、やり方が間違っているということだ。」*

これは誤りです。ベストプラクティスとは、特定の規模や状況において有効な方法を記述したものであり、普遍的な法則ではありません。あくまでも、 *他者にとっての* 局所的な最適解に過ぎないのです。

例を挙げましょう。多くのデザインシステムに関する文献では、デザイントークンを使うように勧めています。そして、トークンは素晴らしいものです。視覚言語の唯一の信頼できる情報源を提供し、テーマ設定を可能にし、デザインとエンジニアリング間の契約を確立します。

しかし、製品が1つ、テーマが1つ、チームが5人の場合、トークンは必要でしょうか？それとも、適切な名前の変数を含むCSSファイルが必要でしょうか？

CSSファイルは構築が速く、理解しやすく、変更も簡単です。トークンは抽象化のレイヤーを追加しますが、これは大規模な運用において効果を発揮します。その規模に達していない場合、抽象化のコストを支払うだけで、そのメリットを享受することはできません。

これはトークン自体が悪いという意味ではありません。トークンを導入するのに *最適な時期* は、初日ではないという意味です。

## 実際に必要なものを決定するもの

何かを構築する前に、いくつか率直に自問自答すべき質問があると思います。

**チームの規模はどれくらいですか？** デザイナー2人とエンジニア3人なら、貢献度モデルは必要ありません。Slackチャンネルと週1回のミーティングがあれば十分です。デザイナー30人とエンジニア100人なら？もちろん、ガバナンスは必要でしょう。

**いくつの製品をサポートしていますか？製品が1つだけなら、多少の制約は許容範囲です。しかし、UIを共有する2つ目の製品を開発するとなると、コンポーネントを共有** *しない* ことによるコストは 急速に上昇します。

**実際にどれくらいの時間がありますか？** これは辛い質問です。なぜなら、たいていの場合、答えは「足りない」だからです。デザインシステムはインフラストラクチャです。インフラストラクチャは、機能と時間を奪い合います。もしあなたの会社が生き残りをかけた状況にあるなら、包括的なデザインシステムは贅沢品です。小さく、焦点を絞ったデザインシステムこそが、生き残りのためのツールなのです。

**今、最も苦痛を感じているのは何ですか？それに対応する対策を講じましょう。理論上の将来の苦痛のためではありません。ブログ記事で後々痛むと書かれていたことのためでもありません。** *今日、* あなたの足を引っ張っているものに対応するのです 。

## 成長していくのであって、外へ出るのではない

私が好む考え方はこうです。デザインシステムを *横に* 広げるのではなく、 *上に* 伸ばしていく。

システムを拡張するということは、コンポーネント、トークン、ドキュメント、ツールなどを追加することを意味します。つまり、システムを幅広くするということです。

成長するということは、既に持っているものをより強固にするということ。誰も求めていない20個のコンポーネントを作るのではなく、実際に使っている5つのコンポーネントにアクセシビリティを追加するということ。そして、何度も間違った実装がなされているパターンについて、使用ガイドラインを作成するということ。

幅広さは生産性を高めるように感じられます。デザインシステムを真に役立つものにするのは、奥行きです。

ライブラリに80個ものコンポーネントがあるチームでも、既存のコンポーネントは柔軟性に欠けたり、バグが多かったり、ドキュメントが不十分だったりして、エンジニアが独自にコンポーネントを開発しているケースを見たことがあります。これは、システム自体は広範ではあるものの、深みのあるシステムとは言えません。

最初は狭く始め、深く掘り下げ、痛みがそれを教えてくれたら広げる。

## 梯子であって、設計図ではない

デザインシステムの成熟度を、私は梯子に例えています。すべての段を登る必要はありません。必要なものが見える高さで立ち止まればいいのです。

**Rung 1: Shared decisions.** You and your team agree on colors, spacing, type. Maybe this lives in a Figma file. Maybe it’s a wiki page. The point is that decisions are written down somewhere.

**Rung 2: Shared components.** You’ve built a small set of reusable UI components. Button, input, card, modal. They’re in code. Designers and engineers both know they exist.

**Rung 3: Shared language.** You have tokens or variables that encode your decisions. Design and engineering share a vocabulary. When a designer says “surface-primary,” an engineer knows exactly what that means.

**Rung 4: Shared process.** You have a way for people to propose, build, and release new components. There’s versioning. There’s documentation. There might be a small team that owns this.

**Rung 5: Shared ecosystem.** You have tooling, plugins, linters, analytics. You know which components are used where. You can make changes confidently because you understand the blast radius.

Most teams I’ve worked with need to be somewhere between rung 1 and rung 3. That’s fine. Rung 2 is a great place to be for a long time.

## The Biases That Get Us

Let me name a few biases that I think lead to over-engineered design systems. Not because naming them will make them go away, but because seeing them helps.

**Survivorship bias.** We study the design systems that succeeded and got famous. We don’t study the ones that were abandoned six months in because they were too ambitious. The successful ones are not representative.

**Complexity bias.** We tend to assume that complex problems require complex solutions. Sometimes they do. Often they don’t. A naming convention can solve problems that people want to throw a token pipeline at.

**Premature abstraction.** This one comes from engineering, but it applies here too. We abstract too early, before we understand the actual patterns. Then we’re stuck with abstractions that don’t quite fit, and we build workarounds on top of them.

**Social proof.** “Stripe has this, so we should too.” Stripe also has a team dedicated to this full-time. You don’t. That’s the part of the equation people leave out.

## A Practical Starting Point

If you’re starting from zero, here’s what I’d actually do.

First, audit what you already have. Look at your product. Screenshot every button, every form, every card. Group the ones that should be the same but aren’t. That’s your backlog.

Second, pick the three to five components that appear most often. Build those well. Make them flexible enough to cover real use cases, rigid enough to enforce consistency. No more, no less.

Third, write down your decisions. Not in a 50-page document. In something short that answers the question “why does it look like this?” Future you will thank present you.

Fourth, make it easy to use. If using the design system is harder than building a custom component, people will build custom components. Every time.

That’s your foundation. Build on it when you need to. Not before.

## The Point

The point is not that design systems are overrated. They’re not. At the right scale, they’re essential.

The point is that *your* design system should be a response to *your* problems, at *your* scale, with *your* constraints. Not a copy of someone else’s solution to someone else’s problems.

Keep it simple. Not because simple is always better, but because simple is the easiest thing to change when you learn more. And you will learn more. You always do.

Build the design system you need today. Make it easy to grow into the one you’ll need tomorrow.

That’s it. That’s the whole thing.[Last published 1 day ago](https://www.designsystemscollective.com/claude-design-just-launched-a-designers-first-walkthrough-c79d7ce47b9b?source=post_page---post_publication_info--791f5b697731---------------------------------------)

A welcoming community for designers and developers passionate about scalable, consistent design. Explore articles, insights, and resources to build and refine your design systems. Join us to connect, learn, and shape the future of systematic design together.

## More from Han and Design Systems Collective[ヘルプ](https://help.medium.com/hc/en-us?source=post_page-----791f5b697731---------------------------------------)[状態](https://status.medium.com/?source=post_page-----791f5b697731---------------------------------------)[について](https://medium.com/about?autoplay=1&source=post_page-----791f5b697731---------------------------------------)[採用情報](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----791f5b697731---------------------------------------)[プレス](mailto:pressinquiries@medium.com)[ブログ](https://blog.medium.com/?source=post_page-----791f5b697731---------------------------------------)[プライバシー](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----791f5b697731---------------------------------------)[ルール](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----791f5b697731---------------------------------------)[条項](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----791f5b697731---------------------------------------)[テキスト読み上げ](https://speechify.com/medium?source=post_page-----791f5b697731---------------------------------------)