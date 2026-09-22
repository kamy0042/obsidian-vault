---
Created: 2022-05-26T21:23:00
URL: https://goodpatch-tech.hatenablog.com/entry/how_to_use_renovate
Tags: [topic/技術/フロントエンド]
---
この記事は[Goodpatch Advent Calendar](https://qiita.com/advent-calendar/2021/goodpatch) の8日目の記事です。

Design Div 所属フロントエンドエンジニアの[上垣](https://twitter.com/kjugk1222)です。

ソフトウェア開発において、依存するパッケージ/ライブラリを最新に保つことは非常に重要です。 なぜなら、パッケージ/ライブラリのアップデートによる以下のような利点を受けられなくなるからです。

- 新しい機能が導入される
- パフォーマンスが改善される
- バグが修正される
- セキュリティパッチが適用される

とはいえ、パッケージが更新されるたびに毎回手作業でアップデートしていくのは意外と面倒な作業です。この辺の仕組みがうまく回らずやむを得ず古いバージョンを使い続けていたり、一気に依存関係をバージョンアップしようとして苦しむプロジェクトは少なくないと思います。

我々が主に携わるフロントエンド開発も例外ではなく、プロジェクト初期にこの仕組みを整えることは、安定した開発体制の持続に欠かせない重要な要素です。

この記事では、[Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) というツールを導入して、GitHub 上にホストされたリポジトに対して、定期的にパッケージの依存関係を更新する方法を紹介していきます。

- [Renovate とは?](https://goodpatch-tech.hatenablog.com/entry/how_to_use_renovate#Renovate-%E3%81%A8%E3%81%AF)
- [設定例](https://goodpatch-tech.hatenablog.com/entry/how_to_use_renovate#%E8%A8%AD%E5%AE%9A%E4%BE%8B)

## Renovate とは?

![[20211207102324.png]]

[Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) は、対象のリポジトリをスキャンしてパッケージファイルとその依存関係を検出し、新しいバージョンが存在するかどうかを調べてから、利用可能な更新のプルリクエストを生成するソフトウェアです。

Renovate は、 [GitHub App](https://github.com/apps/renovate) 、[CLIツール](https://www.npmjs.com/package/renovate)、[Docker Image](https://hub.docker.com/r/renovate/renovate/) として**無料で**利用することができます。

競合としては GitHub の [dependabot](https://docs.github.com/ja/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates) や、[snyk](https://snyk.io/) が有名ですが、Renovate は非常に細かい設定ができることと、GitHub 以外にもデフォルトで多くのプラットフォームをサポートしているのが特徴です。

著名な OSS でもよく採用されているので、Contributer リストにRenovate のアイコンを見かけたことがある人も多いと思います。

## インストール

今回は、 [Renovate の Github App](https://github.com/apps/renovate) の使い方を紹介します。

インストールは、マーケットページの [Install] ボタンを押すだけで完了します。 GitHub の個人アカウント or 組織 に紐付けて、Renovate が配下の特定のリポジトリを操作できる権限を与えます。

![[20211207102432.png]]

インストールが完了すると、対象リポジトリのベースブランチに対して、 Renovate が**オンボーディングPR**を作成します。

オンボーディングPRには、Renovate が生成する アップデートPR のリストが記載されているので、まずはここを確認して、どんなPRが作成されるかを確認します。設定を変更してブランチに push すれば、そのたびに オンボーディングPR が更新されるので、納得行くまで何度も修正して作り直すと良いと思います。

![[20211207102459.png]]

このPRをマージすることで、Renovate のセットアップが完了します。 この辺は GitHub App ならではの面白いデザインですね 😀

## 設定方法

Renovate の設定は、オンボーディングPR作成時に自動生成される `renovate.json` に記述していきます。

### プリセットについて

Renovate の設定項目は[膨大](https://docs.renovatebot.com/configuration-options/)です。そこで、よく使う設定をまとめて共有する手段として、[プリセット](https://docs.renovatebot.com/config-presets/)という仕組みが用意されています。

例として、オンボーディングPRで自動生成された renovate.json の記述を見てみましょう。

```plain text
{
  "extends": ["config:base"]
}

```

**config:base** プリセットは、下記の設定を一つにまとめたプリセットです。

```plain text
{
  "extends": [
    ":dependencyDashboard",
    ":semanticPrefixFixDepsChoreOthers",
    ":ignoreModulesAndTests",
    ":autodetectPinVersions",
    ":prHourlyLimit2",
    ":prConcurrentLimit20",
    "group:monorepos",
    "group:recommended",
    "workarounds:all"
  ]
}

```

この中で例えば、[:prConcurrentLimit20](https://docs.renovatebot.com/presets-default/#prconcurrentlimit20) は、同時生成できるPRの制限を20までにする設定となります。

```plain text
{
  "prConcurrentLimit": 20
}

```

このように、複雑な設定を再利用できるので、自分で設定を1から定義するよりも、まずRenovateが用意するプリセットに自分のやりたい設定が定義されていないか探すのが良いと思います。

また、プリセットは自分で定義することも可能です。例えば、組織内の複数のレポジトリから参照されるプリセットを作ることで、リポジトリ感で複雑な設定を共有することもできます。(参考: [https://docs.renovatebot.com/config-presets/)](https://docs.renovatebot.com/config-presets/))

### パッケージ別の設定

特定のパッケージに対する設定をする場合は、**packageRules** にまとめていきます。

下記は、eslint 関連のパッケージをグループ化して、PR に[linting] ラベルをつける、それ以外は [dependencies] ラベルをつける設定です。 トップレベルで全体のルールを設定し、packageRules でパッケージ単位のルールで上書きしていく形となります。

```plain text
{
  "labels": ["dependencies"],
  "packageRules": [
    {
      "matchPackagePatterns": ["eslint"],
      "labels": ["linting"]
    }
  ]
}

```

## 設定例

では、実際に Renovate の設定を記述していきましょう。

### 前提

今回は、以下の条件のリポジトリを対象に Renovate を設定していきます。

- GitHub 上にホストされているプライベートリポジトリが対象
- アプリケーションの依存パッケージは全て npm で管理している

なお、Renovate は npm, yarn 以外にも、多くの言語、パッケージマネージャーをサポートしています。詳しくはドキュメントの [Language Support](https://docs.renovatebot.com/bazel/) の項を確認してみてください。

### 設定1. スケジューリング

定期実行のスケジュールは、**schedule** に記述していきます。(参考: [https://docs.renovatebot.com/key-concepts/scheduling/)](https://docs.renovatebot.com/key-concepts/scheduling/))

スケジューリングにも [プリセット](https://docs.renovatebot.com/presets-schedule/) が用意されているので、適合するものがあればこちらから選んでも良いと思います。 [timezone](https://docs.renovatebot.com/configuration-options/#timezone) も忘れずに指定しましょう。

毎週月曜日の AM3時 に実行する例

```plain text
{
  "timezone": "Asia/Tokyo",
  "schedule": [
    "before 3am on Monday"
  ]
}

```

### 設定2. マイナー・パッチバージョンアップは PR を一つにまとめる

Renovate はパッケージ単位で PR を作成します。

メジャーバージョンの更新は、後方互換性の確認、既存コードの改修など、手動で確認する作業が必要なので、パッケージ単位でPR を作成するのは理想的です。

一方で、マイナーバージョン以下でパッケージ単位のPRを作成すると、頻繁にアップデートが行われるので、管理が煩雑になってしまいます。マイナーバージョン以下のアップデートを１つのPRにまとめることで、この問題を解消します。

この設定は、[group:allNonMajor](https://docs.renovatebot.com/presets-group/#groupallnonmajor) プリセットを利用します。

```plain text
{
  "extends": [
    "group:allNonMajor"
  ]
}

```

### 設定３. PR の assignee, reviewer をランダムに割り当てる

Renovate が作る PR に assignee を自動で割り振る場合は、*assignees* にユーザー名を, **assigneesSampleSize** にランダムで抽出する人数を指定します。 これと、*reviewers*, **reviewersSampleSize** を指定することで、チーム内でマージ作業を分担させることができます。

```plain text
{
  "assignees": [@kjugk,@alice,@bob],
  "assigneesSampleSize": 2,
  "reviewers": [@kjugk,@alice,@bob],
  "reviewersSampleSize": 1,
  "timezone": "Asia/Tokyo",
  "schedule": [
    "before 3am on Monday"
  ],
  "extends": [
    "group:allNonMajor"
  ]
}

```

### 設定4. GItHub の VulnerabilityAlerts に追従する

スケジューリングの期間を長めに設定すると、緊急性の高い脆弱性警告を見逃してしまうリスクが高まります。 その場合は、GItHub の RepositoryVulnerabilityAlert に合わせて PR を作成することも可能です。 (参考: [https://docs.renovatebot.com/configuration-options/#vulnerabilityalerts)](https://docs.renovatebot.com/configuration-options/#vulnerabilityalerts))

```plain text
{
 "vulnerabilityAlerts": {
    "labels": ["security"]
  },
  "assigneesSampleSize": 2,
  "reviewersSampleSize": 1,
  "timezone": "Asia/Tokyo",
  "schedule": [
    "before 3am on Monday"
  ],
  "extends": [
    "group:allNonMajor"
  ]
}

```

## ワークフロー

### PR のマージ

設定が完了したら、 スケジュールに沿って Renovate が生成する PRをベースブランチに順番にマージしていけばOKです。 パッケージアップデートによりテストやビルドが落ちる場合は、手動でコードを修正して、PR ブランチに push していきます。

マージ前にベースブランチが更新されている場合は、PR の下記チェックボックスをチェックすると、自動的にリベース => PRの再作成できます。

### 更新を保留する

特定のバージョンに対して Renovate でのバージョンアップを保留する場合は、単純に PR をクローズすればOK です。以降は、クローズしたバージョン以降に対するPRが生成されなくなります。(ただし、保留したPR が埋もれると管理不能になるので、ラベル付け、issue 化などの対応は必須)

### 構成の変更

設定を変更する場合は、ブランチを切って設定ファイルを変更し、renovate パッケージに含まれる `renovate-config-validator` を実行します。 [https://docs.renovatebot.com/getting-started/installing-onboarding/#reconfigure-via-pr](https://docs.renovatebot.com/getting-started/installing-onboarding/#reconfigure-via-pr)

バリデーションがパスしたら、変更をベースブランチにマージすれば、次回以降は新しい設定でPRが作成されます。

```plain text
npm i -g renovate
renovate-config-validator
```

```plain text
 INFO: Validating renovate.json
 INFO: Config validated successfully
```

## まとめ

Renovate の GitHub App を利用して、パッケージの依存関係を更新する方法を紹介しました。

記事内でも紹介しましたが、Renovate で設定できる項目は膨大なので、今回紹介した設定は本当にごく一部です。 プロジェクト初期は小さく初めて、徐々にプロジェクトに合った設定を追加していくのが良いと思います。

良いデザイン、ユーザー体験を実現するには、面倒な作業はなるべく減らして開発体験・スピードを向上させることも重要です。 Goodpatch エンジニアの行動指針としても定義されているポイントなので、妥協せずに日々工夫していきたいと思います 🔨

Goodpatch では、フロントエンドにこだわりを持って実装できる仲間を絶賛募集中です！ カジュアルな面談から対応可能なので、少しでも気になる方はぜひ気軽に応募してみてください!

- 新卒採用エンジニア [22卒](https://hrmos.co/pages/goodpatchhr/jobs/0000094) / [23卒](https://hrmos.co/pages/goodpatchhr/jobs/0000097)