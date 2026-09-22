---
タグ: []
作成日時: 2024-01-20T16:47:00
URL: https://www.mitsue.co.jp/knowledge/blog/a11y/202012/13_0900.html
Tags: [topic/アクセシビリティ, topic/技術/テスト]
---
![[img-default 4.png]]

この記事は[ミツエーリンクス Advent Calendar 2020 - Adventar](https://adventar.org/calendars/5763)の13日目の記事です。

2019年からSection 508の適合テストプロセス（Trusted Tester）の有志によるオンライン勉強会に参加しており、現在は[ウェブアクセシビリティ基盤委員会（WAIC）](https://waic.jp/)の作業部会3（試験）のTrusted Testerについての調査・研究プロジェクトで活動させていただいています。今年のアドベントカレンダーは、Trusted Testerについてご紹介したいと思います。

## Section 508

まず、Trusted Testerの前提となるSection 508について触れておきましょう。アクセシビリティ対応に関わる担当者の方であれば、一度は耳にしたことがあるキーワードかと思います。

Section 508とはリハビリテーション法第508条（[Section 508 of the Rehabilitation Act](https://www.access-board.gov/ict/)）と呼ばれる、米国のアクセシビリティ関連の法律です。連邦政府機関が開発・調達・維持・利用する情報通信技術におけるアクセシビリティ確保を求める内容で、Webサイトだけでなく、ハードウェアやアプリケーション、情報通信技術を利用するためのサポート用ドキュメント類など広く対象としています。確保を求める項目についての技術基準も提示されており、Webサイトだけでなく、ソフトウェアおよびnon-Webコンテンツなどについて[WCAG 2.0への適合が求められます](https://www.access-board.gov/ict/#2-broad-application-of-web-content-accessibility-guidelines-2-0)。 （参考リンク：[Comparison Table of WCAG 2.0 to Existing 508 Standards](https://www.access-board.gov/ict/wcag2ict.html)）

しかし、技術基準が提示されているとはいえ、WCAGと同様に特定の対象に依拠しないよう抽象的な記述ではあります。 そのため技術基準の解釈が人によって異なることで、結果、基準を満たしているかどうかの判断も差異が生まれる可能性があります。チェック対象の実装や情報構造によって判断結果が一律にはなり得ない面をもともと含んでいることを前提とした上でも、この揺らぎは少ないほうが好ましいことに変わりありません。

Section 508では、対象とする情報通信技術への適合についてのテストツールや方法を[Test for Accessibility](https://www.section508.gov/test)で公開しています。Webに関しては、[Trusted Tester and ICT Testing Baseline](https://www.section508.gov/test/trusted-tester)に詳細があります。

## Trusted Testerとは？

Trusted Testerとは、Section 508のアクセシビリティ要件を満たすためのテスト基準に準じたテストプロセスです。

アクセシビリティ要件を満たすためのテスト基準が[Section 508 ICT Testing Baseline](https://section508coordinators.github.io/ICTTestingBaseline/)、テストプロセスが[Trusted Tester](https://www.dhs.gov/trusted-tester)であり、ツールによる自動チェックではなく、人間によるマニュアルチェックを前提としています。Section 508専用ですが、Section 508への適合のチェックにTrusted Testerを用いなければならない、というルールはありません。

前述した通り、マニュアルチェックでは判断結果の揺れが生じやすくなります。Trusted Testerでは、チェックの対象だけでなく、チェック手順と作業を具体的に指定し、すべての作業の結果がTRUE（真）であればそのテストプロセスは PASS（合格）とする、といったように判断基準のパターンを指定することで、この揺れを減らすようになっています。同様に、チェックの際に用いるツールもTrusted Tester用に開発された[ANDI](https://www.ssa.gov/accessibility/andi/help/install.html)というブラウザのアドオンと[Color Contrast Analyzer（以下CCA）](https://github.com/ThePacielloGroup/CCAe)のみとされています。また、HTMLやCSSなどのソースコードを直接テスト担当者が確認して問題を指摘するといった個別の判断を求めることはほとんどせず、あくまでもANDIとCCAで検出できる対象と範囲によるチェックにとどめるなど、マニュアルチェックによる判断の揺れ（属人性）を減らすために割り切った手法を取っていると感じました。その反面、本来人間によるチェックで対応するはずの、ツールが対応できない内容のチェックが残ったままになるというマイナス面も生じています。

もう１つの留意点としては、Section 508専用のため、Section 508独自のチェック内容が含まれていること、そしてWCAGの達成基準について一歩踏み込んだ独自のチェック基準を加えている箇所があることです。

こうしたことから、Trusted TesterのチェックはWCAG 2.0 AAに対する最低限の担保としてとらえるほうがよいと思われます。

次に、最新ドキュメント（[Trusted Tester Conformance Test Process - Version 5 - updated Aug 16 2019](https://www.dhs.gov/publication/dhs-section-508-compliance-test-processes)）の内容を参照してもう少し具体的に見てみましょう。

### 構成

Trusted Testerは、20個のSection 508 Conformance Tests（以下、「Section 508適合テスト」とします）によって構成されており、WCAGの構成とは大きく異なっています。WCAGでは、解消すべき問題を軸として、4つの原則と複数のガイドラインによって達成基準を分類していますが、Trusted Testerでは、チェックする操作や対象コンテンツにあわせて分類しているためです。

基本、Section 508適合テストの実施はナンバリング通りでなくてよい（テスト対象ごとに調整してよい）のですが、1.から4.までは[WCAG 2.0 適合要件 5. 非干渉](https://waic.jp/docs/UNDERSTANDING-WCAG20/conformance.html#uc-conf-req5-head)に関わるので、はじめに実施することを推奨されています。

> 
> ### Section 508 Conformance Tests
> 
> 1. Conforming Alternate Version and Non-Interference
> 2. Auto-Playing and Auto-Updating Content
> 3. Flashing
> 4. Keyboard Access and Focus
> 5. Forms
> 6. Links and Buttons
> 7. Images
> 8. Adjustable Time Limits
> 9. Repetitive Content
> 10. Content Structure
> 11. Language
> 12. Page Titles, Frames, and iFrames
> 13. Sensory Characteristics and Contrast
> 14. Tables
> 15. CSS Content and Positioning
> 16. Pre-Recorded Audio-Only, Video-Only, and Animations
> 17. Synchronized Media
> 18. Resize Text
> 19. Multiple Ways
> 20. Parsing

Section 508 適合テストは単数あるいは複数のテストプロセスで出来ています。"2. Auto-Playing and Auto-Updating Content" であれば、

- Auto-Playing Audio
- Moving, Blinking, and Scrolling Content
- Auto-Updating Information
- Notification of Automatic Content Changes

の4つのテストプロセスが存在します。

このテストプロセスごとにテストを実施し、合格（PASS）・不合格（FAIL）・該当なし（DOES NOT APPLY、以下DNA）を判定していく仕組みです。

### テストプロセス

個々のテストプロセスは以下のような構成です。

- チェック対象
    - 対象の識別
    - テストプロセス名・テストID
        - 適用性
            - 条件
        - テストの実施手順
            - 具体的な手順の指定
        - 判定結果
            - 具体的な判断の指定

引き続き、"2. Auto-Playing and Auto-Updating Content"を見てみます。

> 
> ### 2.Auto-Playing and Auto-Updating Content
> 
> - Auto-Playing Audio
>     - Identify contents
>         - Identify audio content that automatically plays (without user activation) for more than 3 seconds.
>             - Content of this type includes alerts, sounds, and music.
>         - If there is no such content, the result for the following test ID(s) is DOES NOT APPLY: 2.A.
>     - Check 1.4.2-audio-control (TestID : 2.A)
>         - Applicability
>             - This Test Condition DOES NOT APPLY (DNA) if there is no audio content that plays automatically for more than 3 seconds.
>         - How to Test
>             1. Determine if there is a mechanism within the first three elements encountered for the user to pauseor stop the audio or to control the volume of only the auto-playing audio.  a. The browser should already have been configured to disable auto-play. (See the Test ToolInstallation and Configuration Guide for instructions.)
>             2. Activate the mechanism.
>             3. Following this test process, test the mechanism for all applicable Test Conditions.
>         - Evaluate Results
>             - If ALL of the following are TRUE, then the content PASSES:
>                 1. There is a mechanism that can pause or stop the audio or control the volume of only the auto-playing audio, AND
>                 2. The mechanism is within the first three elements encountered by the user, AND
>                 3. The mechanism passes all applicable Test Conditions in this test process.

どのようなものを対象としているか（Identify Contents）や、その対象が本テスト適用対象となるか（Applicability）は、通常のアクセシビリティチェックでの内容とそうかわりはないのではと思います。 一方、How To Testでは、機能があるかどうかや、その機能が使えるかどうかについて、普段チェック担当者が無意識に1ステップで確認している事項を、明示的に複数のステップを設けて確認するようにしていることがわかります。

また、How to Testの1.では、WCAGの達成基準に独自のチェック内容が加えられています。

[達成基準 1.4.2 音声の制御](https://waic.jp/docs/WCAG20/Overview.html#visual-audio-contrast-dis-audio)では、

> 
> 1.4.2 音声の制御: ウェブページ上にある音声が自動的に再生され、3秒より長く続く場合、その音声を一時停止又は停止するメカニズム、もしくはシステム全体の音量レベルに影響を与えずに音量レベルを調整できるメカニズムが利用できる。 (レベル A)

のように規定されています。

しかし、

> 
> 1. Determine if there is a mechanism within the *first three elements* encountered for the user to pause or stop the audio or to control the volume of only the auto-playing audio.

では、「ユーザーが出会う最初の3つの要素以内で」という条件が加えられています。これは、3秒以内に音声が一時停止、停止、または音量の調整の機能が利用できる、と判断する条件が、テスト担当者によって異なる場合があるために、Trusted Testerのテストプロセス独自の指定を行ったものと考えられます。

なお、達成基準に適合するには「3秒以内に止められるようにする」「3秒以内に音量をユーザーの意図する大きさへ調整することができる」以外に「自動再生しないようにする」という判断も可能ですが、実装に対しての提案はこのテストプロセスに含みません。また、テスト結果のレポートの作成もTrusted Testerの作業手順には含まれていません。テスト対象のサイトに対する総合的判断も別のプロセスで対応するものとしてTrusted Testerの作業手順からは切り出されています。

### テスト担当者への教育

Trusted Testerには[教育プログラム](https://training.section508testing.net/)が用意されているのも特色の1つと言ってよいと思います。前述のようにWCAGに独自のチェック基準を設けている項目もありますが、基本的にはWCAG 2.0 AAに適合することを求めるものですので、Trusted Testerの教育プログラムはWCAG 2.0 AAを理解する教育プログラムの1つであると考えてよいと思います。 プログラムについて注意が必要なのは、一部、Section 508の基準への適合を求める項目があることと、Trusted Testerを前提とした説明なので達成基準そのものを説明する内容ではないということです。そのため、WCAGをこれから学ぶ人にはあまり向きません。アクセシビリティチェックの経験があり、WCAGにある程度親しんでいる人向きと言えるでしょう。

適合テストごとに理解度チェックテストがあり、通してすべて受講し試験を受けることでCertificateも発行されます（先日私も受講し、試験に合格しました。受講内容に沿ったテストなので難易度は高くありませんが、合格するとやはり嬉しいものですね）。

英語のみですが、オンラインかつ無料で提供されていますので、興味のある方は気軽に試してみていただければと思います。

## 最後に

駆け足でのご紹介でしたがいかがでしたでしょうか。世界各国では、米国のように法制度の整備と技術基準とをあわせて運用するなど、より効果的なアクセシビリティ対応を目指してさまざまな取り組みがすすめられています。 いずれ何かの機会に、Trusted Testerでの実際のチェック結果や、他国のアクセシビリティ対応の取り組みについて、さらにご紹介できればと思います。