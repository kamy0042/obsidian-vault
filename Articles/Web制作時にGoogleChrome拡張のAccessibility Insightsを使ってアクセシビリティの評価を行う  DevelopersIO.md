---
タグ: []
作成日時: 2023-03-17T19:06:00
URL: https://dev.classmethod.jp/articles/accessibility-insights/
Tags: [topic/アクセシビリティ, topic/技術/テスト]
---
![[eyecatch_accessibility-960x504 1.png]]

いわさです。

皆様、アクセシビリティに配慮したWebサイトの設計されてますでしょうか。
 Webアクセシビリティを評価するためのツールがMicrosoftから提供されていますので紹介したいと思います。

Accessibility Insightsというツールです。

## [Accessibility Insights](https://www.accessibilityinsights.io/)

Solve accessibility issues before they reach your customers.

[www.accessibilityinsights.io](https://www.accessibilityinsights.io/)

元々はMicrosoftにて内部開発されていたもので、2019年にオープンソース化されています。
 本日はWebサイトのアクセシビリティの評価を行いたいと思いますが、AndroidやWindowsのアプリケーションにも対応しています。

Webアクセシビリティの場合はGoogle Chromeの拡張として提供されています。

## Webアクセシビリティとは

全ての利用者や環境下において、使用できるようにWebサイトが設計・開発されていることを指します。
 弊社の以下のエントリをご参照ください。

## [ダイバーシティを実現するアクセシビリティの基礎と実践 \#devio2020 \#a11y | DevelopersIO](https://dev.classmethod.jp/articles/developers-io-2020-connect-diversity-and-accessibility-primer-on-ios/)

あなたが開発したアプリケーション、実は使えなくて困っている人がいるかもしれないです。 そのような問題を扱う「アクセシビリティ」について、それは何なのか、なぜダイバーシティの実現に必要なのかを、デモ動画を2つ交えて、ご説明します。

## 使ってみた

テスト用のWebサイトはSelenium用のテストサイトを使ってみます。

[example.selenium.jp](http://example.selenium.jp/reserveApp/)

![[444E5C84-4F2E-4B24-8FDE-C56BF2D9F841.png]]

Google Chrome拡張は以下です。
 Microsoft EdgeもChromeと互換性があり、この拡張を利用可能です。

## [Accessibility Insights for Web](https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni)

Accessibility Insights for Web helps developers quickly find and fix accessibility issues.

![[FA2A94B0-7571-4828-AA46-5B9E3FC1690B_4_5005_c.jpeg]]

FastPassとAssessmentの２種類の機能が提供されています。

FastPassは短時間で簡易的に重要な問題を特定することが出来ます。

Assessmentは、WCAG 2.1(Web Content Accessibility Guidelines)に準拠した測定を行います。
 評価プロセスには24のテストがあり、自動テスト、支援、手動テストの３つのタイプがあります。

WCAG2.1については以下を参照ください。

### FastPass

自動チェックツールと、手動でのタブストップテストの２種類があります。

自動チェックツールは、数十のアクセシビリティ要件への準拠を自動的にチェックします。
 プロパティの欠落や無効など、一般的なアクセシビリティの問題を検出することが可能です。

ただし、これだけではアクセシビリティの観点では不十分ですので、Assessmentまでしっかり行うことを前提に考えたほうが良いでしょう。
 最低限のチェックという印象です。

なお、自動チェックにはウェブアクセシビリティ検証ツール axe のエンジン axe-coreライブラリ を使っています。

以下のようにそれぞれのチェック結果が表示され、推奨される対策方法も案内されます。

タブストップの手動テストでは、手動でタブ移動操作を行うと視覚的なヘルパーを通して、意図したタブストップになっているか、キーボードトラップが発生してしまっていないか、タブ順序は正しいかなどタブに関するアクセシビリティの問題を特定出来るようにします。

実行すると、タブ操作の結果が視覚的に表示されます。

### Assessment

前述のとおり、WACG2.1に準拠して24の評価テストを実施します。
 テストには自動テストもありますが、手動で操作や判断が必要なテストも多いです。
 ただし、ツールによって支援してくれるので手動テストでもどういった観点で判断すれば良いかなどわかりやすいと思います。

評価結果をサマリ形式で確認し、個別に対応を検討することが出来ます。

### おまけ：Filing

Issue filingという機能もあります。

これはChrome拡張の設定画面にて、任意のGitHubリポジトリのIssues画面のURLを入力します。
 すると、評価結果結果から対応が必要な項目をIssueとして起票するためのテンプレートが起動されます。

![[30F1B09A-FCF9-4395-9D69-84E071491837.png]]

なおこの機能は、GitHub以外で Azure Boardにも対応しています。

## まとめ

アクセシビリティの観点はUI/UXの観点では必ず出てくると思いますが、こういったChrome拡張が存在することは知りませんでした。
 アクセシビリティの話が出れば、まずこういったものを使って評価してみるのもおもしろいと思います。
 無料ですのでみなさん使ってみてください。