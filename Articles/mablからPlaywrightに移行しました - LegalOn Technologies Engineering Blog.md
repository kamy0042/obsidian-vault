---
URL: https://tech.legalforce.co.jp/entry/2023/03/31/114250
Created: 2023-04-01T01:26:00
Tags: [topic/技術/テスト]
---
こんにちは！

株式会社LegalOn TechnologiesのLegalForceキャビネ開発部SET（Software Engineer in Test）のひきもち（[@rmochioo](https://twitter.com/rmochioo)）です。

昨年8月に入社し、LegalForceキャビネの[API](http://d.hatena.ne.jp/keyword/API)テスト、自動E2Eテストなどの自動テストの導入、QA業務まで幅広く携わっております。

[API](http://d.hatena.ne.jp/keyword/API)テストに関しては先日、記事出ていますのでご興味があれば見ていただければと思います。

## [APIテストで質とスピードの両立を実現 - LegalForceキャビネの事例](https://tech.legalforce.co.jp/entry/2023/01/23/151215)

こんにちは、株式会社LegalOn TechnologiesのLegalForceキャビネ開発部でQAリードを務めている島根（@shimashima35）と申します。 QAというとマニュアルテストが中心かと思われるかもしれません。確かにマニュアルテストはQAの業務の一部ではありますが、「質とスピードの両立」つまりプロダクト品質の高さとリリーススピ…

[2023-01-23 15:12](https://tech.legalforce.co.jp/entry/2023/01/23/151215)

LegalForceキャビネではE2Eテストの自動化ツールとしてmablを利用していましたが、この度Playwrightへの移行を行いました。

現在LegalForceキャビネで運用しているE2Eテストは全てPlaywrightで実行されており、リリース可否判断やQA環境でのマニュアルテストのサポートとして利用されています。

- [LegalForceキャビネでのQA、SETの関わり方と、自動テストについて](https://tech.legalforce.co.jp/entry/2023/03/31/114250#LegalForce%E3%82%AD%E3%83%A3%E3%83%93%E3%83%8D%E3%81%A7%E3%81%AEQASET%E3%81%AE%E9%96%A2%E3%82%8F%E3%82%8A%E6%96%B9%E3%81%A8%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
    - [QA、SETの関わり方](https://tech.legalforce.co.jp/entry/2023/03/31/114250#QASET%E3%81%AE%E9%96%A2%E3%82%8F%E3%82%8A%E6%96%B9)
    - [リリースフローについて](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%83%95%E3%83%AD%E3%83%BC%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
    - [テスト自動化戦略について](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%83%86%E3%82%B9%E3%83%88%E8%87%AA%E5%8B%95%E5%8C%96%E6%88%A6%E7%95%A5%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [E2Eテストとは](https://tech.legalforce.co.jp/entry/2023/03/31/114250#E2E%E3%83%86%E3%82%B9%E3%83%88%E3%81%A8%E3%81%AF)
    - [E2Eテスト自動化ツールについて](https://tech.legalforce.co.jp/entry/2023/03/31/114250#E2E%E3%83%86%E3%82%B9%E3%83%88%E8%87%AA%E5%8B%95%E5%8C%96%E3%83%84%E3%83%BC%E3%83%AB%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
        - [mablとは](https://tech.legalforce.co.jp/entry/2023/03/31/114250#mabl%E3%81%A8%E3%81%AF)
        - [Playwrightとは](https://tech.legalforce.co.jp/entry/2023/03/31/114250#Playwright%E3%81%A8%E3%81%AF)
- [移行理由](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E7%A7%BB%E8%A1%8C%E7%90%86%E7%94%B1)
    - [QAのスキルの幅を広げることで、新たな視点からテストが行える](https://tech.legalforce.co.jp/entry/2023/03/31/114250#QA%E3%81%AE%E3%82%B9%E3%82%AD%E3%83%AB%E3%81%AE%E5%B9%85%E3%82%92%E5%BA%83%E3%81%92%E3%82%8B%E3%81%93%E3%81%A8%E3%81%A7%E6%96%B0%E3%81%9F%E3%81%AA%E8%A6%96%E7%82%B9%E3%81%8B%E3%82%89%E3%83%86%E3%82%B9%E3%83%88%E3%81%8C%E8%A1%8C%E3%81%88%E3%82%8B)
    - [GitHub上でレビューができる](https://tech.legalforce.co.jp/entry/2023/03/31/114250#GitHub%E4%B8%8A%E3%81%A7%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%81%8C%E3%81%A7%E3%81%8D%E3%82%8B)
    - [柔軟な実装を可能にしたい](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E6%9F%94%E8%BB%9F%E3%81%AA%E5%AE%9F%E8%A3%85%E3%82%92%E5%8F%AF%E8%83%BD%E3%81%AB%E3%81%97%E3%81%9F%E3%81%84)
    - [アカウント管理コストの削減](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E7%AE%A1%E7%90%86%E3%82%B3%E3%82%B9%E3%83%88%E3%81%AE%E5%89%8A%E6%B8%9B)
- [移行までの流れ](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E7%A7%BB%E8%A1%8C%E3%81%BE%E3%81%A7%E3%81%AE%E6%B5%81%E3%82%8C)
    - [1. PlaywrightのCI連携](https://tech.legalforce.co.jp/entry/2023/03/31/114250#1-Playwright%E3%81%AECI%E9%80%A3%E6%90%BA)
    - [2. mablとPlaywrightの併用、Playwrightへの書き換え](https://tech.legalforce.co.jp/entry/2023/03/31/114250#2-mabl%E3%81%A8Playwright%E3%81%AE%E4%BD%B5%E7%94%A8Playwright%E3%81%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%8F%9B%E3%81%88)
    - [3. Playwrightのみでの運用](https://tech.legalforce.co.jp/entry/2023/03/31/114250#3-Playwright%E3%81%AE%E3%81%BF%E3%81%A7%E3%81%AE%E9%81%8B%E7%94%A8)
- [移行時の工夫](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E7%A7%BB%E8%A1%8C%E6%99%82%E3%81%AE%E5%B7%A5%E5%A4%AB)
    - [学習コストの軽減](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E5%AD%A6%E7%BF%92%E3%82%B3%E3%82%B9%E3%83%88%E3%81%AE%E8%BB%BD%E6%B8%9B)
        - [QA向けハンズオンの実施](https://tech.legalforce.co.jp/entry/2023/03/31/114250#QA%E5%90%91%E3%81%91%E3%83%8F%E3%83%B3%E3%82%BA%E3%82%AA%E3%83%B3%E3%81%AE%E5%AE%9F%E6%96%BD)
    - [メンテナンス工数の軽減](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%83%A1%E3%83%B3%E3%83%86%E3%83%8A%E3%83%B3%E3%82%B9%E5%B7%A5%E6%95%B0%E3%81%AE%E8%BB%BD%E6%B8%9B)
        - [Locators APIの利用](https://tech.legalforce.co.jp/entry/2023/03/31/114250#Locators-API%E3%81%AE%E5%88%A9%E7%94%A8)
        - [結果確認の工数を下げる](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E7%B5%90%E6%9E%9C%E7%A2%BA%E8%AA%8D%E3%81%AE%E5%B7%A5%E6%95%B0%E3%82%92%E4%B8%8B%E3%81%92%E3%82%8B)
- [移行による効果](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E7%A7%BB%E8%A1%8C%E3%81%AB%E3%82%88%E3%82%8B%E5%8A%B9%E6%9E%9C)
    - [開発者との距離が縮まった](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E9%96%8B%E7%99%BA%E8%80%85%E3%81%A8%E3%81%AE%E8%B7%9D%E9%9B%A2%E3%81%8C%E7%B8%AE%E3%81%BE%E3%81%A3%E3%81%9F)
    - [コスト削減](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%82%B3%E3%82%B9%E3%83%88%E5%89%8A%E6%B8%9B)
    - [フィードバックの高速化](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%83%95%E3%82%A3%E3%83%BC%E3%83%89%E3%83%90%E3%83%83%E3%82%AF%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96)
    - [レビュー容易性の向上](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E5%AE%B9%E6%98%93%E6%80%A7%E3%81%AE%E5%90%91%E4%B8%8A)
    - [テストケース数の増加](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%83%86%E3%82%B9%E3%83%88%E3%82%B1%E3%83%BC%E3%82%B9%E6%95%B0%E3%81%AE%E5%A2%97%E5%8A%A0)
- [課題](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E8%AA%B2%E9%A1%8C)
    - [運用における属人化](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E9%81%8B%E7%94%A8%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E5%B1%9E%E4%BA%BA%E5%8C%96)
    - [学習コストの高さ](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E5%AD%A6%E7%BF%92%E3%82%B3%E3%82%B9%E3%83%88%E3%81%AE%E9%AB%98%E3%81%95)
    - [メインのQA業務との両立](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%AEQA%E6%A5%AD%E5%8B%99%E3%81%A8%E3%81%AE%E4%B8%A1%E7%AB%8B)
- [QAメンバーからの声](https://tech.legalforce.co.jp/entry/2023/03/31/114250#QA%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E3%81%8B%E3%82%89%E3%81%AE%E5%A3%B0)
    - [良かったこと](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E8%89%AF%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%93%E3%81%A8)
    - [要改善](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E8%A6%81%E6%94%B9%E5%96%84)
- [おわりに](https://tech.legalforce.co.jp/entry/2023/03/31/114250#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)

### LegalForceキャビネでのQA、SETの関わり方と、自動テストについて

まず初めに、LegalForceキャビネでのQA、SETの関わり方と自動テストがどのように利用されているかについてお伝えします。

### QA、SETの関わり方

製品の機能群ごとに開発組織が分かれておりQAもその開発組織に含まれ、開発者と連携してテスト計画から実施までの品質保証業務にあたっています。

また、横断的なポジションとしてのQAもおり、QA組織全体の管理・改善や、機能群から外れる施策のテストも担当しています。

SETも横断的なポジションとして存在しており、機能全体の自動テストや静的解析の基盤作りを行なっています。

![[20230331101433.png]]

開発組織

### リリースフローについて

LegalForceキャビネのリリースフローは以下のような流れになっています。また、移行前後で流れは変わっていません。

1. 開発者は開発を行い、テストが可能になった状態でテスト環境にデプロイを行います。
2. デプロイ後、自動E2Eテストが走ります。
3. 自動E2Eテストの結果確認後、QAがマニュアルテストを行います。
4. テストがPassするとステージング環境へのデプロイを行います。
5. ステージング環境にて自動E2Eテスト、[API](http://d.hatena.ne.jp/keyword/API)テストが走ります。
6. 自動E2Eテスト、[API](http://d.hatena.ne.jp/keyword/API)テストが全てpassし、ステージングでの動作確認がPassすれば本番へのリリースを行います。

![[20230331101721.png]]

リリースフロー

### テスト自動化戦略について

LegalForceキャビネの自動E2Eテストではリスクベースでテストケースを作成しています。

- 機能の重要度
- 影響の深刻度

これらを機能が壊れた（= 多数の顧客への影響があった）と仮定してS、A、B、C、Dとランク付を行い、上位のランク（自動化による効果が大きいもの）から実装を進めています。

現状はS、A、Bまで実装可能なものは全て実装されています。

また、今後は障害再発防止の観点からもテストケースを増やしていきたいと考えています。

### E2Eテストとは

E2EテストはテストピラミッドのSystem Testに含まれるテストになり、システム全体を通してアプリケーションが期待通りに動作するかを確認するテストになります。

### E2Eテスト自動化ツールについて

E2Eテストは全て手動で行うとテスト[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)が膨大になるため、自動化するツールが普及しています。プログラミングの知識がほとんど必要ないローコードのテストツールと、プログラミングの知識が必要なコードベースのテストツールが存在します。本記事で取り上げている2つのE2Eテスト自動化ツールを紹介します。

### mablとは

mablはローコードでE2Eテストを自動化できるサービスです。ブラウザの操作の記録を行いテストケースの作成を行います。[機械学習](http://d.hatena.ne.jp/keyword/%B5%A1%B3%A3%B3%D8%BD%AC)によるオートヒーリングが強力でテストのメンテナンス[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)を削減することができます。

### Playwrightとは

コードベースのE2Eテスト自動化ツールです。ブラウザの操作だけではなく、要素の出現まで待つAuto-waitなど、自動E2EテストのFlakyさ（失敗しやすさ）をできるだけ軽減するための機能があるのが特徴です。

[playwright.dev](https://playwright.dev/)

### 移行理由

移行する理由は大きく分けると以下の4つになります。

### QAのスキルの幅を広げることで、新たな視点からテストが行える

現状のLegalForceキャビネ開発部のQAは開発経験がなく、コードの読み書きやソフトウェア設計の経験がない人も多いです。そのため、[ブラックボックステスト](http://d.hatena.ne.jp/keyword/%A5%D6%A5%E9%A5%C3%A5%AF%A5%DC%A5%C3%A5%AF%A5%B9%A5%C6%A5%B9%A5%C8)が中心となります。これ自体は決して悪いことではないですが、プログラミングを通してホワイトボックスの視点を持つことで、実装内容も考慮したより**効率的なテストの設計**や、**システムの裏側まで考慮した品質の作り込み**を行えるようになることを期待しています。

コードベースのE2Eテスト自動化ツールであるPlaywrightを利用し、テストコードを開発者と同じように実装していくことをその一歩目にしようと考えました。

### [GitHub](http://d.hatena.ne.jp/keyword/GitHub)上でレビューができる

また、コードベースの場合は[GitHub](http://d.hatena.ne.jp/keyword/GitHub)上でレビューをすることができるため、差分等が確認しやすいだけでなく、開発者と同じフローでレビューを行うことができ、[GitHub](http://d.hatena.ne.jp/keyword/GitHub)の利用方法も併せて学習することができるというメリットもあります。

### 柔軟な実装を可能にしたい

要素指定のカスタマイズや、条件分岐、細かい検証などの柔軟な実装がコードベースの方がしやすいこともあります。

例えばローコードのテストツールの場合実装難易度が高かった以下の操作が、Playwrightでは比較的容易に実装することができました。

### アカウント管理コストの削減

mablを利用する場合、アカウントはmabl上で管理されているため、追加や削除依頼があった場合は管理者が対応をする必要があります。

コードベースの場合は、[**GitHub**](http://d.hatena.ne.jp/keyword/GitHub)**のアカウント管理をそのまま利用することができる**ためアカウント管理コストの削減につながります。

### 移行までの流れ

リリースフローの説明でも記述しているように、自動E2Eテストはリリースフローの一部として**リリース可否判断**の役割を担っており、その部分を**止めずにPlaywrightに移行する必要**がありました。

そのため、以下の段階を踏んでPlaywrightへの移行を行いました。

7. PlaywrightのCI連携
8. mablとPlaywrightの併用、Playwrightへの書き換え
9. Playwrightのみでの運用

### 1. PlaywrightのCI連携

ローコードテストツールの場合、[SaaS](http://d.hatena.ne.jp/keyword/SaaS)であり[API](http://d.hatena.ne.jp/keyword/API)や[CLI](http://d.hatena.ne.jp/keyword/CLI)も用意されているため、**CIとの連携が非常に容易**です。ここもローコードテストツールを選ぶ理由の一つになるかと思います。コードベースのテストツールを利用する場合はこの部分は**自前で構築する必要**があります。

LegalForceキャビネは[GCP](http://d.hatena.ne.jp/keyword/GCP)を利用しているため、テスト実行環境の構築も[GCP](http://d.hatena.ne.jp/keyword/GCP)で行いました。

大まかな構成は以下のようになっています。

10. テストコードに変更が入ると[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Actionsにより、テストコードを含むPlaywrightイメージがビルドされコンテナ[レジストリ](http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%C8%A5%EA)に格納されます。
11. 各テスト環境へのデプロイの最後にCloud Run Jobsを発火させ、テスト実行を行ないます。 
    1. 秘匿情報を含むパラメータはSecret Managerから実行時に渡します。
12. テスト終了時にテストレポートをCloud Storageに格納し、Slackに結果通知を行ないます。

テスト実行が終われば、Cloud Run Jobsも終了するのでサーバーコストも抑えることができます。

### 2. mablとPlaywrightの併用、Playwrightへの書き換え

CIによる実行環境が整備できれば、あとはテストケースを書き換えていくだけです。

テストケース自体はそこまで多くなかったため、2週間程度で書き換えを完了することができました。

### 3. Playwrightのみでの運用

書き換えが完了すればあとは移行するだけなのですが、**1点問題が生じました**。

Playwrightではテスト実行速度は上がったものの、期待する挙動や要素の出現までの待ちの時間が足らないことによるテストの**Flakyさ（失敗しやすさ）が目立ちました**。このままではリリースの際にテストが失敗する頻度が増え、リリースの妨げになってしまいます。

ここでは適切に**timeout**を伸ばすことや**wait**を挟むことで、テストの安定化に繋げました。

[playwright.dev](https://playwright.dev/docs/test-timeouts)

[playwright.dev](https://playwright.dev/docs/api/class-locator#locator-wait-for)

安定して全てのテストが通るようになった段階で、mablを停止し、切り替えを行いました。

### 移行時の工夫

コードベースのツールを運用する上で[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)となるのは学習コストとメンテナンスコストです。これらをできるだけ軽減するために以下の施策を行いました。

### 学習コストの軽減

### QA向けハンズオンの実施

Playwrightのドキュメントを確認してもらうのではなく、ハンズオンを通して学習してもらう形にしました。

ページ内の要素や[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)、ロケータの話から、Playwrightでの操作、検証、メンテナンス[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)を減らすための[デザインパターン](http://d.hatena.ne.jp/keyword/%A5%C7%A5%B6%A5%A4%A5%F3%A5%D1%A5%BF%A1%BC%A5%F3)であるPage Object Modelまで、実際のテストコードを実装しながら学んでいただきました。

現在は**QA全員**が**テストケース実装**を進めており、実際の運用にも乗っています。

### メンテナンス[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)の軽減

### Locators [API](http://d.hatena.ne.jp/keyword/API)の利用

Playwrightではv1.27.0よりTesting Libraryから発想を得たLocators [API](http://d.hatena.ne.jp/keyword/API)が導入されました。

[github.com](https://github.com/microsoft/playwright/releases/tag/v1.27.0)

従来の[XPath](http://d.hatena.ne.jp/keyword/XPath)や[CSS](http://d.hatena.ne.jp/keyword/CSS) Selectorと比較して、ページの階層構造を気にせずに要素を指定することができるため、より壊れにくい要素の指定ができるようになっています。

基本的にはこのLocators [API](http://d.hatena.ne.jp/keyword/API)を利用する方針にしています。

### 結果確認の[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)を下げる

テストケースを実装する際は、コメントで日本語の手順を必ず入れる運用にしています。これにより、Playwrightから出力されるテストレポートを確認する際にどのような手順で失敗したかを判断しやすいようにしています。

また、テスト結果確認までの手順を少なくすることも心がけています。

以下はSlackへの通知ですが、対応するテストレポートはボタンをクリックするだけで確認できるようになっています。

### 移行による効果

### 開発者との距離が縮まった

「コードに触れることで**エンジニアのプルリクなども何をしているのか、なんとなく分かるようになってきた。**」という声や、「**プログラミングを行うことの楽しさが分かってきた。**」等の声をQAから頂くこともあり、移行をきっかけに少しは開発者との距離を縮められたのではないかと感じています。

今後は、1つ目の移行理由で期待している**効率的なテストの設計**や、**システムの裏側まで考慮した品質の作り込み**に繋げるため、その他の施策も併せて行いながら、引き続き効果を計測したいと考えています。

### コスト削減

目に見える効果として一番大きかったのはコストの部分になります。

前述したテスト実行環境の構成では固定費を除くと、**テスト1実行（約80テストケース）あたり$0.1以下**に抑えられています。

このようにコストに気を使わなくても良くなったため、テストケース追加、実行のハードルも下がりました。

### フィードバックの高速化

mablを利用していた頃は、実行コストのこともありQAによるマニュアルテストが完了した段階の最終確認としてmablを実行していましたが、現在はテスト環境へのデプロイが行われた段階でPlaywrightが回っています。

これにより、Playwrightで**マニュアルテスト開始前に**バグを検知することができ、QAのテスト[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)の削減にも繋がっています。

### レビュー容易性の向上

レビューの際に[GitHub](http://d.hatena.ne.jp/keyword/GitHub)を利用するになったことで差分も確認しやすく、非同期でのレビューがほとんどになり、レビュー容易性の向上に繋がりました。

### テストケース数の増加

柔軟な実装ができるようになったことや、テスト実装に携われる人員が増えたことでテストケース数を増やすことができました。現在は80ケースまで増え、mablで運用していた時と比較すると5倍以上になっています。

### 課題

Playwrightへの移行は無事できましたが、まだ課題もあります。

### 運用における属人化

mablを利用していた時期にも生じていた課題なのですが、リリース前のテスト結果確認や、テストメンテナンスなどを素早く実施するにはまだまだツールに慣れる必要があり、その部分がまだ属人化してしまっています。

引き続き、テスト実装や運用を通してツールに慣れてもらい、QA全員が運用に加われるような状態を目指しています。

### 学習コストの高さ

コードベースのテストツールはローコードのテストツールに比べて、当然学習コストは高くなります。これは課題でもありながら1つ目の移行理由でも述べた通り、**長期的に見ると価値**になるものであるため、許容すべきと考えています。できるだけ学習コストを低くする工夫と、QAが所属するチームに理解してもらうことは必要になります。

### メインのQA業務との両立

QA、SETでの関わり方で記述した通り、SETは自動テストの推進をメインに業務を進められますが、開発チームに所属しているQAは担当する機能群に対するテストがメインの業務になっています。その中でコードベースのPlaywrightを導入することは、その業務に負担を掛けることに繋がります。引き続き、負担を軽減するだけではなく、メインのQA業務でも活用できるような状態にするために策を講じていきたいと考えています。

### QAメンバーからの声

QAメンバーから頂いたその他のコメントを最後に記載します。

### 良かったこと

- コードでテストを書くことでテストの確実性が上がったことを実感している。 
    - 何が原因でテストが失敗したのか分かりやすくなった。
- LegalForceキャビネの機能全体を幅広く検証しているため、**簡単な**[**デグレ**](http://d.hatena.ne.jp/keyword/%A5%C7%A5%B0%A5%EC)**確認ではマニュアルテストを極力行わない運用**に持っていける。
- テストケースが拡充され、プロダクトコードの変更を検知しやすい分、失敗する頻度はmablより多いが、バグの検出率も上がっている。
- mablでのカスタム[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)実装の経験があったため、Playwrightでも実装の内容が理解しやすかった。

### 要改善

- マニュアルテスト開始前の自動テスト失敗時の**確認、メンテナンス**[**工数**](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)**により、マニュアルテストへの着手が遅れる**こともある。

### おわりに

mablからPlaywrightへの移行は、QAメンバーの理解とフロントエンドやSREなど色々なメンバーのアド[バイス](http://d.hatena.ne.jp/keyword/%A5%D0%A5%A4%A5%B9)や協力があってこそ実現することができました。改めて感謝したいと思います。

弊社ではテスト自動化のみならず、質とスピードを向上させるためのチャレンジングな課題がまだまだあります。

もし興味があれば下記の募集要項をご覧ください！

こんにちは。LegalOn Technologies Researchで研究員をしている神田 ([@kampersanda](https://twitter.com/kampersanda)) です。

この度、論文「[Engineering faster double-array Aho-Corasick automata](https://onlinelibrary.wiley.com/doi/10.1002/spe.3190)」がソフトウェア系の有名学術誌「[Software: Practice and Experience](https://onlinelibrary.wiley.com/journal/1097024x)」に採択されました。

- [ArXiv Link](https://arxiv.org/abs/2207.13870)
- [Shareable Read-only Link](https://onlinelibrary.wiley.com/share/author/BS2TPDQFTFNX75XIQUDR?target=10.1002%2Fspe.3190)

本記事では論文の紹介をします。論文内に記述された内容については簡単な概要紹介に留め、論文には書かれていない研究の動機などをメインにお伝えします。

本論文は、パターンマッチング[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)Aho-Corasick法（AC法）の効率的な（高速・省メモリな）実装方法を探求したものです。具体的には、高速な[オートマトン](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%C8%A5%DE%A5%C8%A5%F3)の表現技法[Double Array](https://ieeexplore.ieee.org/document/31365)に着目して、Double Arrayを用いたAC法（以下、DAAC）の数ある実装技法をレビューし、徹底的な実験的解析を通じて「本当に効率的なDAACの実装方法は何か？」を追求しました。この研究結果は、我々が開発するパターンマッチングライブラリDaachorseに活用されています。

## [GitHub - daac-tools/daachorse: 🐎 A fast implementation of the Aho-Corasick algorithm using the compact double-array data structure in Rust.](https://github.com/daac-tools/daachorse)

🐎 A fast implementation of the Aho-Corasick algorithm using the compact double-array data structure in Rust. - GitHub - daac-tools/daachorse: 🐎 A fast implementation of the Aho-Corasick algorithm u...

[github.com](https://github.com/daac-tools/daachorse)

Daachorseの開発のキッカケは単語分割器Vaporettoです。

Vaporettoは点予測に基づく高速な単語分割器です。単語分割は、[自然言語](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC)で書かれた文書データから特徴量を得る際など、[自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)や情報検索などの多くのアプリケーションで必要な前処理です。しかし、昨今の大規模な文書データでは、その処理時間がシステム全体の[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)になることも多く、処理の高速化が求められます。例えば、契約書なども一つの一つの文書がとても長いので大規模になりやすく、単語分割に数時間掛かることも珍しくありません。Vaporettoはそうした背景から、高速処理に向けた設計がされています。Vaporettoの重要な構成要素の一つがAC法によるパターンマッチングであり、そのモジュールを切り出してライブラリ化したものがDaachorseです。Vaporettoの詳細については、[論文](https://www.anlp.jp/proceedings/annual_meeting/2022/pdf_dir/D2-5.pdf)や[ブログ記事](https://tech.legalforce.co.jp/entry/2021/09/28/180844)をご参照ください。

Double Arrayはシンプルなア[イデア](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C7%A5%A2)に基づくデータ構造である一方、より高速な検索を得るためには計算機の[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)などを意識し、入念に実装する必要があります。しかし、数多くある実装技法から効率的なものを選び抜いて設計することは容易ではありません。Double Arrayの実装技法は出典が論文や[OSS](http://d.hatena.ne.jp/keyword/OSS)など多岐に渡り、慣習的に使われているような文書化されていないものも含まれるためです。故に、多くの人にとって例えば[darts-clone](https://github.com/s-yata/darts-clone)などで実装されているようなコアな技術にリーチするのが難しい現状にあります。

そこで、我々がDaachorseの開発過程で得た知見を共有し、文字列処理の発展に貢献したいと考え、論文として報告することにしました。

簡単に論文の主結果を紹介します。それぞれ詳しい内容は論文をご参照ください。

## 実装技法のレビューと比較実験

まず、数ある実装技法をいくつかの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に分類し整理しました。そして、各[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に属する技法を比較することで、どの組合せが最も効率的なDAACの設計に繋がるかを評価しました。以下は、それらカテゴリと技法をリストアップした表です。

![[20230317150541.png]]

[ArXiv](http://d.hatena.ne.jp/keyword/ArXiv)版より抜粋

文字列の表現方法や配列のメモリレイアウトなど、6つの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に分類されています。実装技法は、出典のあるものから慣習的に使用されているもの、本論文で提案したものまで様々です。表の「Selected」列にチェックが付いている技法が、実際にDaachorseに採用した技法になります。比較実験を通じて、現代の[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)におけるキャッシュ効率などの観点から、効率的な技法を選定しました。

## 既存ソフトウェアとの比較

有名なAC法の実装として、Rustで書かれた[aho-corasick (AC) ライブラリ](https://github.com/BurntSushi/aho-corasick)があります。このライブラリでは、高速な直接アドレス表とメモリ効率の良いリスト構造をハイブリッドに使い分けることで[オートマトン](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%C8%A5%DE%A5%C8%A5%F3)を表現しています。

比較した実装は以下の4種類です。

- **Bytewise-Daachorse:** Daachorseによるバイト単位で遷移するDAAC
- **Charwise-Daachorse:** Daachorseによる文字単位で遷移するDAAC
- **NFA-AC:** ACライブラリによる標準のAC[オートマトン](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%C8%A5%DE%A5%C8%A5%F3)
- [**DFA**](http://d.hatena.ne.jp/keyword/DFA)**AC:** ACライブラリによる遷移先候補を全て展開したAC[オートマトン](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%C8%A5%DE%A5%C8%A5%F3)

Charwise-Daachorseは、日本語などのマルチバイト文字に特化した実装です。[DFA](http://d.hatena.ne.jp/keyword/DFA)-ACは、メモリを多く使用する代わりに高速化した実装です。

以下の図が、それら実装について検索時間を比較した結果です。

縦軸が解析に要した時間、横軸が登録パターンの数を表しています。英語と日本語からなる3種類のパターンセットで評価しています。詳細な実験設定は論文をご参照ください。パターン数が増えてもDaachorseの速度低下は控えめであり、大きなパターンセットほどDaachorseが高速なことがわかります。これは、本研究での分析によりキャッシュ効率の良い実装技法を採用したことにも起因します。

メモリ使用量についても以下に示します。

Daachorseは大半のケースでACライブラリより省メモリです。

## Vaporettoでの性能評価

単語分割器VaporettoにDaachorseとACライブラリを組み込んだ場合の、解析速度の比較実験も行いました。UniDic v3.1.0に含まれる重複を除いた66万単語をパターンとし、BCCWJのサブ[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)を改行で区切り得られた590万文（平均33.8文字）について解析した結果が以下になります。

- **Bytewise-Daachorse:** 3.3 マイクロ秒/文
- **Charwise-Daachorse:**
<u>2.9 マイクロ秒/文</u>
- **NFA-AC:** 7.5 マイクロ秒/文
- [**DFA**](http://d.hatena.ne.jp/keyword/DFA)**AC:** 7.3 マイクロ秒/文

Daachorseは最大2.6倍程度高速であり、[NLP](http://d.hatena.ne.jp/keyword/NLP)応用においてもその効果が確認されます。

この論文は、内容が整理されている点や、レビューと実験結果がAC法を実装しようとしている人にとって有益なリソースとなり得る点などが評価され、採択に至りました。

初稿の時点で査読者からはかなりの好印象でした。しかしそれでも、L1/L3レベルでのキャッシュミス回数やCPU命令数、分岐数などまで含めた議論の拡充や、Rust言語を用いた実験結果の一般性の説明など、ソフトウェア系学術誌として非常にクリティカルな指摘を多く受けました。そして、多くの追加実験と説明を加え、採択して頂けました。

査読をクリアするのは大変でしたが、論文のクオリティは確実に改善しましたし、徹底的なソフトウェア分析に必要なことを学べたので、とてもよい経験でした。

本記事では、論文「Engineering faster double-array Aho–Corasick automata」の紹介として、その研究動機と主結果を解説しました。本論文の結果は、今後Double Arrayの実装を考える上で大いに役立つと思いますので、ご興味のある方は是非一読していただけると幸いです。

株式会社LegalOn Technologies では、SREや、バックエンドエンジニア、検索システム、研究開発に興味のある[インターン](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3)生など様々なポジションを募集しています。

ご興味がある方は以下の求人ページから求人要項をご確認いただけますので、お気軽にご応募ください！

[https://herp.careers/v1/legalforce/requisition-groups/d2e157cc-120b-4ade-8879-0326c32127bd](https://herp.careers/v1/legalforce/requisition-groups/d2e157cc-120b-4ade-8879-0326c32127bd)

## 初めに

こんにちは、株式会社 LegalOn Technologies の LegalForceキャビネ開発部でテッ[クリード](http://d.hatena.ne.jp/keyword/%A5%AF%A5%EA%A1%BC%A5%C9)を務めている横道と申します。

私たちのプロダクト、「LegalForceキャビネ(以下キャビネ)」では [Google](http://d.hatena.ne.jp/keyword/Google) Firebase を使用しています。

この [Google](http://d.hatena.ne.jp/keyword/Google) Firebase を、実際のプロダクト開発と運用で使用した際に生じた課題と対応ついて、「Firebase 使用上の注意 Functions 編」「同 Firestore 編」の 2 つに分けてお送りします。 今回は Functions 編として、Firebase Functions を使ったプロダクトが、規模の増大と機能が増加していった際に、どのような課題が生じ、そしてどのような対応を行ったかを共有します。

スタートした段階では、キャビネの開発チームも小さく、サービス自体もどれくらい普及するのかわかりませんでしたので、スモールスタートを行うこととしました。さらに少ない人数で迅速に開発することを目指し、以下の要件を設定しました。

- チームの人数を抑えるために、Front-end と Back-end を同じ言語で開発したい。
- スケジューリングタスク、イベント実行、[REST API](http://d.hatena.ne.jp/keyword/REST%20API) のデプロイを簡単に行いたい。
- [REST API](http://d.hatena.ne.jp/keyword/REST%20API) サーバーの運用を簡単に行いたい。
- データベースの運用を簡単に行いたい。

これらの要件を満たすものとして、[Google](http://d.hatena.ne.jp/keyword/Google) Firebase を選択しました。

[Google](http://d.hatena.ne.jp/keyword/Google) Firebase は以下の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の集合体です。

- Firebase Functions 
    - [Google](http://d.hatena.ne.jp/keyword/Google) Cloud Functions を元とした、[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) の Serverless 実行環境
- Firebase Cloud Firestore 
    - NoSQL ドキュメントデータベース
- Firebase Hosting 
    - 静的 Web ページの Hosting
- Firebase Authentication 
    - ユーザー認証機能の提供

これらの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)により [Google](http://d.hatena.ne.jp/keyword/Google) Firebase は以下のような特徴を持っています。

- [API](http://d.hatena.ne.jp/keyword/API) を Functions に [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) で構築できる。これにより、[REST API](http://d.hatena.ne.jp/keyword/REST%20API) サーバーの運用が簡単になり、Front-end と Back-end を TypeScript で共通で開発できる。
- データベースとして、1 プロジェクトに 1 つ Firestore データベースを割り当てることができ、さらにそのデータベースは自動的にスケーリングされる。
- スケジューリングタスク、イベント実行の定義をコード上に書くだけで自動的にデプロイされる。

これらの特徴により、初期段階の要件を満たしていましたので、Firebase を使い、キャビネの開発が始まりました。

しばらくして、キャビネの導入が進み、ユーザー数が多くなり、プロダクトの機能も増えてきて、Back-end の [API](http://d.hatena.ne.jp/keyword/API) が 100 個を超えるようになってきた際に、Firebase の運用で以下のような課題が生じました。

- デプロイが規模に合わせて遅くなる
- デプロイが途中でエラーになる。規模が大きくなるとエラーになる確率が上がる
- 分割デプロイが簡単には使えない
- Functions のメモリの設定が正しく反映されない
- firebase tools のバージョンを簡単に戻せない

これらの課題の詳細を共有しますので、これから Firebase を使用する方々、現在使用している方々に役立てていただければと思います。

## デプロイが規模に合わせて遅くなる

まず、大きな課題はデプロイに要する時間です。

Firebase では、デプロイする Function の数、使用しているライブラリのサイズに合わせて、デプロイ時間が長くなります。これは、サーバーへアップロードするコンテナイメージを作る際に、npm install にて、[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) のライブラリのインストールを毎回行い、そして、Functions の個数分、設定を変更する処理を行うためです。

私たちのプロダクトでは、前述の通り 100 個ほどの [REST API](http://d.hatena.ne.jp/keyword/REST%20API) があり、それぞれが Functions に対応しており、100 個ほどの Functions があります。その結果、Firebase のデプロイだけで、10 分程度の時間を要しています。 これは、プロダクトのリリースの[イテレーション](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C6%A5%EC%A1%BC%A5%B7%A5%E7%A5%F3)速度を上げるための大きな障害となっています。

プロジェクト内に yarn.lock ファイルがあると、コンテナイメージを作る際に npm の代わりに、yarn が使用され、デプロイ時間を若干短くすることが出来ますので、yarn を使うと良いでしょう。

## デプロイが途中でエラーになる。規模が大きくなるとエラーになる確率が上がる

もう一つの大きな課題が、デプロイ時のエラーです。

Firebase では、デプロイを処理する [GCP](http://d.hatena.ne.jp/keyword/GCP) のサーバーの負荷をあげないために、デプロイ関連の [API](http://d.hatena.ne.jp/keyword/API) の実行回数にクォータリミットが設定されています。通常はこのリミットに到達することはほとんどありませんが、多くの Functions を持つ大きなプロジェクトをデプロイする際には、このクォータリミットに到達する場合があります。

firebase tools の deploy コマンドでは、Functions の upsert 処理や Functions の実行権限の変更など、多数の処理が実行されます。一番重要な処理である Functions の upsert 処理に対しては、クォータリミットのエラーが [GCP](http://d.hatena.ne.jp/keyword/GCP) のサーバーから返されても、リトライを行っているようです。しかしながら、その後の Functions の実行権限変更の処理では、クォータリミットのエラーが返された場合、そのままリトライされず、エラーとなります。

Functions が全く作られていない状態からデプロイを行った場合には、100 個ほどの Functions の場合は、確実にクォータリミットに達します。一度デプロイを行った状態であれば、権限変更は行われないので、クォータリミットに達する確率は低くなりますが、全く起きないわけではありません。

クオータリミットのエラーが発生した場合、Functions デプロイのどの時点でエラーが発生したのかが定かではありません。そのため権限変更のみを自前のツールで行い修正したとしても、正しく動作しない可能性があります。そこで、私たちのプロダクトでは、クォーターリミットによるデプロイエラーが発生した場合は、再度デプロイを行うようにしています。

追記

その後、弊社の SRE が firebase tools の不具合を見つけ、プルリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トを出してくれました。

[https://github.com/firebase/firebase-tools/pull/5577](https://github.com/firebase/firebase-tools/pull/5577)

結論として、クォーターリミットのエラーが発生した場合には、upsert 処理、実行権限変更の処理、どちらにおいてもリトライは行われていませんでした。リトライを行うコードは存在していますが、不具合によりそのコードが実行されておりませんでした。

firebase tools の開発チームも、プルリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トにより不具合を認識し、違う形で修正するとのコメントをもらいましたので、近いうちに修正されるのではないかと思います。

## 分割デプロイが簡単には使えない

前述したデプロイ時のエラーを解消するために、Functions のデプロイを何回かに分ける分割デプロイも検討しました。[GCP](http://d.hatena.ne.jp/keyword/GCP) のドキュメントにも、プロジェクトに 5 つ以上の関数が含まれている場合は分割デプロイを推奨すると書かれています。(50 の間違いではありません。5 つです)

[https://firebase.google.com/docs/functions/manage-functions](https://firebase.google.com/docs/functions/manage-functions)

しかし、分割デプロイすると、デプロイ時間は分割した回数分増加してしまいました。これは、npm install が分割した回数分実行されてしまうためです。

また、firebase tools の一括デプロイでは、使われなくなった Functions は自動的にデリートしてくれる便利な機能がありますが、分割デプロイすると、当然この機能は使用することが出来ず、手作業でのデリートが必要になります。

これらの理由より、分割デプロイを選択することが出来ませんでした。

## Functions のメモリの設定が正しく反映されない

firebase tools の deploy コマンドには、[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) Functions のメモリの設定が正しく反映されないというバグがありました。このバグは Version 10.3.0 にて修正されています。

[https://github.com/firebase/firebase-tools/releases/tag/v10.3.0](https://github.com/firebase/firebase-tools/releases/tag/v10.3.0)

このバグは、複数の Functions をデプロイした際に、コンテナイメージの内の Node.js を起動するための[コマンドライン](http://d.hatena.ne.jp/keyword/%A5%B3%A5%DE%A5%F3%A5%C9%A5%E9%A5%A4%A5%F3)のメモリ設定のオプション(`--max-old-space-size`)が、全て最初にデプロイした Functions のメモリ設定と同じになってしまうというバグです。

どの Functions が最初にデプロイされるかは、Functions の追加、削除で変わり、予測することは困難ですので、このバグの発生も予測することは困難でした。

このバグの良くないところは、[GCP](http://d.hatena.ne.jp/keyword/GCP) の Functions のコンソールのメモリ設定からでは確認できないという点です。[GCP](http://d.hatena.ne.jp/keyword/GCP) の Functions のコンソール画面に表示されるメモリ設定は、コンテナイメージ自体のメモリの設定であり、Node.js の起動オプションのメモリ設定を確認する場所はありません。Functions 実行時にログなどで、Node.js の heap 情報を確認するしかありません。

さらに、私たちのプロダクトでは、このバグが修正された firebase tools を使うと、前述したクォータリミットに到達する確率があがり、デプロイが失敗することが多くなりました。そのため、簡単には firebase tools のバージョンを上げることが出来ませんでした。

私たちのプロダクトでは全ての Functions のメモリ設定をほぼ統一し、このバグが発生しないようにしました。

## Firebase tools のバージョンを簡単に戻せない

firebase tools では、コンテナをデプロイする際のイメージストアに Container Registry を使用していましたが、Version 11.2.1 から、Artifact Registry を使用するようになりました。

この切り替えの結果、一度、Artifact Registry を使用してデプロイされた Functions は、Container Registry を使用してデプロイできなくなりました。

つまり、Version 11.2.1 でデプロイし、firebase tools になんらかの問題が発生した場合に、Version 10.x などでデプロイが出来なくなります。

再度古いバージョンでデプロイを行うには、一度 Functions を消してからデプロイを行う必要があります。一度 Functions を消してからデプロイを行うとデプロイ終了までの時間は [API](http://d.hatena.ne.jp/keyword/API) が使用できなくなり、大きなダウンタイムが発生することになります。

私たちのプロダクトでは、前述の理由により、firebase tools のバージョンを上げてしまうとデプロイが失敗することが多くなり、結果としてデプロイ時間がさらに増大してしまったので、バージョンを戻さざるを得ませんでした。そこで、一度メンテナンス時間を設けて、サービスを１時間ほど停止させ、 Functions の全体消去、バージョンダウン、再デプロイを行いました。

24x365 日のサービス提供を行う必要のあるサービスの場合には注意が必要でしょう。

## まとめ

以上のような課題が発生し、運用での回避や、リトライを行い、解決してきました。

プロダクトの規模が大きくなり、Functions の個数が多くなってきてから発生し始める課題が多く、初期の段階ではこれらを予測することは困難でした。

Firebase は、デプロイが統合されており簡単にデプロイが可能で、Functions を使うことにより負荷が増大しても自動的にスケールし、デプロイ時のダウンタイムも０に出来る、など小さなプロダクトを高速に開発するには非常に便利なサービスだと思います。しかし、規模が大きくなるとこのような課題がありますので、この情報共有にて皆さんもプロダクトの予想規模を考え、Firebase を正しく使っていっていただければ幸いです。

## エンジニア募集

LegalOn Technologies では一緒にプロダクト開発を行うエンジニアを募集しています。詳しくは、[開発の求人一覧](https://herp.careers/v1/legalforce/requisition-groups/d2e157cc-120b-4ade-8879-0326c32127bd)をご覧ください。

また LegalOn Technologies の開発組織や、今回紹介したプロダクト「LegalForceキャビネ」とは別のプロダクトである「LegalForce」についてまとめた「[LegalOn Technologies にご興味を持っていただいた皆様へ](https://legalforce-recruit.notion.site/LegalOn-Technologies-3e114a8aecfb410a96424e34a0ed8bd6)」というページもありますので、合わせてご覧ください。

こんにちは、株式会社LegalOn Technologies の検索・推薦チームでエンジニアをしている、佐藤です。

弊社では LegalForce という製品で、お客様がアップロードした契約書を条文単位で検索ができる、条文検索機能を提供しています。 条文検索では既に契約書本文の Query Auto Completion (クエリ自動補完, 以下 QAC)が提供されており (*1)、今回は契約書のタイトルやファイル名などで絞り込み検索を行う際に利用される QAC の開発を行いました。

本記事では今回開発した QAC を実現する上で課題となった QAC データの更新について、継続的な更新を行うために検討したシステム設計や運用方法を紹介したいと思います。

(*1) [別の記事](https://tech.legalforce.co.jp/entry/2020/12/18/134454)で詳しく紹介されています。

**目次**

- [絞り込み検索のための QAC](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E7%B5%9E%E3%82%8A%E8%BE%BC%E3%81%BF%E6%A4%9C%E7%B4%A2%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE-QAC)
- [QAC データ更新における課題](https://tech.legalforce.co.jp/entry/2023/03/06/170757#QAC-%E3%83%87%E3%83%BC%E3%82%BF%E6%9B%B4%E6%96%B0%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E8%AA%B2%E9%A1%8C)
- [Completion 更新戦略](https://tech.legalforce.co.jp/entry/2023/03/06/170757#Completion-%E6%9B%B4%E6%96%B0%E6%88%A6%E7%95%A5)
- [イベント駆動型アーキテクチャによる非同期更新](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E9%A7%86%E5%8B%95%E5%9E%8B%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%AB%E3%82%88%E3%82%8B%E9%9D%9E%E5%90%8C%E6%9C%9F%E6%9B%B4%E6%96%B0)
- [イベント設計](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E8%A8%AD%E8%A8%88)
- [処理に失敗したイベントのハンドリング](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E5%87%A6%E7%90%86%E3%81%AB%E5%A4%B1%E6%95%97%E3%81%97%E3%81%9F%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%81%AE%E3%83%8F%E3%83%B3%E3%83%89%E3%83%AA%E3%83%B3%E3%82%B0)
- [差分更新によるデータ不整合の解消](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E5%B7%AE%E5%88%86%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E3%83%87%E3%83%BC%E3%82%BF%E4%B8%8D%E6%95%B4%E5%90%88%E3%81%AE%E8%A7%A3%E6%B6%88)
- [今後の展開](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E4%BB%8A%E5%BE%8C%E3%81%AE%E5%B1%95%E9%96%8B)
- [まとめ](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E3%81%BE%E3%81%A8%E3%82%81)
- [メンバー募集中!!](https://tech.legalforce.co.jp/entry/2023/03/06/170757#%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E5%8B%9F%E9%9B%86%E4%B8%AD)

### 絞り込み検索のための QAC

今回開発した QAC は契約書のタイトルやファイル名など(以下 [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)と呼ぶ)で契約書の絞り込み検索を行う際に利用されるものです。

ユーザーが契約書を検索する際に、検索フォームに入力途中のクエリ文字列から補完したクエリをサジェストすることで、効率的に絞り込みができるようになることを期待しています。

例えばユーザーが **「秘密」**と入力した場合、「秘密」が含まれる契約書の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)の値が返ります。[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)の要素は1つではなく複数返る可能性があり、下の例のようにタイトル・ファイル名など複数の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)が返ります。

ユーザーから「秘密」と入力された際に QAC が返す[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)例

```plain text
{
    "title": ["秘密情報", "秘密保持"],
    "filename": ["秘密情報管理規定.docx", "秘密保持契約書.docx"]
}

```

また、自動補完キーワードの検索には、Elasticsearchを利用しており、インメモリで高速なキーワードのルックアップを可能にする [Completion Suggester](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/search-suggesters.html#completion-suggester) で実現しています。

下の図のように、QAC [API](http://d.hatena.ne.jp/keyword/API) が入力中のクエリ文字列を受け取り、Elasticsearch に対して検索を行い、返されるキーワードを[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)としてユーザーにサジェストします。

![[20230301132753.png]]

自動補完検索時のデータフロー

### QAC データ更新における課題

契約書の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)はユーザーによって日々更新されるため、**契約書**[**メタデータ**](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)**の更新に追従して、自動補完キーワードも更新し同期をとる必要**があります。

特に削除に関してはより厳密に同期していく必要があり、**既に削除された契約書の**[**メタデータ**](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)**が自動補完キーワードとして表示されてしまうと、サジェストされたキーワードからの検索結果が0件になる(以下 0件ヒット) ため、ユーザーの検索体験を損ねます。**

自動補完キーワード(以下 Completion)と契約書(以下 Document)の関係を下図に示します。

これを見ると、Document A、Document B、Document C が同じ タイトル「秘密保持」を持っています。このように、複数の Document が同じ[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)の値を持つ可能性があります。

これは、**Completion と Document が1対多の関係になっている**と言えます。

そのため **Completion を削除する際はその Completion を参照する Document が他に存在しないかを確認する必要**があります。

![[20230301132851.png]]

Completion と Document の関係

上の例で言うと、Document A のタイトルが変更されたとしても、Completion X は他の Document に参照されているため、削除しません。

一方、Document D のタイトルが変更された場合、「損害賠償」をタイトルに持つ Document は存在しないため、Completion Y は削除します。

※ 補足ですが、契約書が更新されてから、自動補完キーワードが反映されるまで多少のタイムラグ(1分程度)は許容し、リアルタイムでの更新の反映は必須要件とはしませんでした。

### Completion 更新戦略

Document 更新に伴い Completion を更新して同期をとる方法は大きく分けて以下の2つの方法があります。

13. **全件入れ直し**     
定期的にバッチで全件 Document の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)を精査して、Completion を全て入れ直す
**メリット**
    - 全件入れ直しになるため2の方法で問題となるデータ不整合が発生しない
**デメリット**
    - Document 数が増えると、バッチ実行時間が長くなりスケールしない
並列でバッチを実行することで、実行時間を短縮できますが、同期先の[検索エンジン](http://d.hatena.ne.jp/keyword/%B8%A1%BA%F7%A5%A8%A5%F3%A5%B8%A5%F3)に負荷を与えすぎないように実行する必要があり並列数に限界があります
    - バッチが実行されるまでの間、同期が行われず差分が発生する
14. **差分更新**     
Document [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)が更新された際に、更新された[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)の Completion を更新する
**メリット**
    - 差分更新になるため、一度に更新するデータは少なく済む
    - Document の更新が Completion に反映されるまでのタイムラグが短い
**デメリット**
    - 一度更新に失敗するとそれ以降差分が発生し続けるため、データ不整合が起こりやすい

現状では、Document の数が多く、更新頻度はそれ程多くないことから、今回は2の差分更新を選択しました。発生しうるデータ不整合の対策については後述します。

### イベント駆動型[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)による非同期更新

差分更新を実現するためにイベント駆動型[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)を採用しました。

![[20230301135123.png]]

Completion が更新されるまでのデータフロー

Document が更新された際に、以下のステップでキューを経由して、連携する QAC サービスがCompletion を更新します。

15. Search [API](http://d.hatena.ne.jp/keyword/API) (Producer)が Document 更新リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トを受け取る
16. Search [API](http://d.hatena.ne.jp/keyword/API) が Document Indexに保存される Document を更新
17. Document の更新情報をイベントとしてキューに送信
18. QAC Worker (Consumer)が定期的にイベントをキューから受信
19. QAC Worker が受け取ったイベントを利用して、Completion Index に保存される Completion を更新

また Document は Elasticsearch の Document Index に保存し[全文検索](http://d.hatena.ne.jp/keyword/%C1%B4%CA%B8%B8%A1%BA%F7)を実現しています。 自動補完のための Completion Index は、負荷分散や可用性の観点から Document Index とは別[クラスタ](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%B9%A5%BF)で管理しています。

最終的に、更新時と検索時を合わせると以下のようなフローになります。(上が更新時, 下が検索時)

![[20230301135250.png]]

全体データフロー図

この構成を採用することによるメリット・デメリットは以下の通りです。

**メリット**

- Producer と Consumer が[疎結合](http://d.hatena.ne.jp/keyword/%C1%C2%B7%EB%B9%E7)になり各[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の責務がシンプルになる 
    - Consumer で問題が発生した場合に、Producer に影響を与えることがない
    - 将来的に QAC 以外の別の Consumer を追加することが可能で拡張性に優れている
- キューがバッファの役割を果たし、処理しきれないイベントはキューに保存され、非同期で Consumer の処理速度に応じて処理することが可能
Completion インデックスのデータ構造上 (*2)、Completion の更新は負荷が高い処理になります。Document の更新頻度が突発的に高くなった場合、中間バッファとなるキューにイベントのデータを置くことで、Consumer である QAC Worker が過負荷になることを防ぎます。
- 処理に失敗したイベントを記録・リプレイすることが可能 (後述)
- Consumer は必要に応じてスケールアウト可能

**デメリット**

- イベント送受信に失敗した場合や Consumer でイベント処理に失敗した場合、データ不整合が発生する (対策については後述)
- リアルタイムに同期ができない 非同期で更新するため、Document が更新されてから Completion が更新されるまでの間、一時的にデータが同期されていない期間が発生します。特にキューにイベントがたくさん溜まっている場合は、同期されるまでのタイムラグが長くなります。 今回はリアルタイム性は必須要件ではなかったため許容しています。

(*2) Completion Suggester で用いられるインデックスは、一般的に検索で使われる[転置インデックス](http://d.hatena.ne.jp/keyword/%C5%BE%C3%D6%A5%A4%A5%F3%A5%C7%A5%C3%A5%AF%A5%B9)と異なり、高速に自動補完結果を返すために最適化されたグラフ構造になっており、更新の度に発生するグラフの再構築が重いためです。

### イベント設計

以下は実際に QAC で利用した Document の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)追加時のイベント例です。

```plain text
{
  "tenant_id": "tenant1",
  "fields": [
    {
      "name": "title",
      "values": ["共同研究契約書"]
    },
    {
      "name": "filename",
      "values": ["秘密保持契約書.docx"]
    }
  ],
  "event_type": "document attribute created",
  "doc_count_increment": 1,
  "failure_count": 1,
  "timestamp": "2022-06-13T07:34:54+00:00"
}

```

主要な属性のみ説明します。

**fields**

Document [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)の更新情報

Document [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)は今後変更・追加されうるため柔軟性を保ちつつ、Consumer が統一的に処理できることを考慮し以下のような[スキーマ](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AD%A1%BC%A5%DE)になっています。

- 複数の Document [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)が一括で更新されるケースを考慮し、`fields` は配列に統一
- [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)のフィールド名 ( `name` )とフィールド値 ( `values` )は、任意に設定できるようにキー・バリュー形式で保持
- 1つのフィールドに対して複数の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)の値が設定される可能性を考慮し、`values` は配列に統一

**event_type**

イベント種別

値には Document [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)が作成・削除されたことを表す `document attribute created`, `document attribute deleted` が入ります。

**doc_count_increment**

Completionに紐づく Document 件数の増分

Completion に紐づく Document の数(以下 参照カウント)をこの値によって更新します。

[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)が追加された場合は正の値、削除された場合は負の値が入ります。

またバルク更新により複数の Document が更新されることを考慮し、1と-1以外の値も代入可能な整数値にしています。

参照カウントは Completion の結果をランキングする際の重みとして活用し、参照される Document の件数が多いほど自動補完結果の上位にランク付けするといった使い方ができるため、各 Completion に参照カウントを保持するようにしています。

**failure_count**

イベント処理失敗回数

Consumer で一定回数以上処理に失敗した場合、このカウントがインクリメントされ、デッドレターキュー (*3) に保存されます。一定回数以上処理に失敗したイベントは破棄されます。

また Document [メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)が更新された際は、更新前の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)を Completion から削除して、更新後の[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)を追加する必要があるため、[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)の削除と作成のイベントを作成します。

(*3) 処理に失敗したイベント(メッセージ)を格納しておくキューのことをデッドレターキューと言います。失敗した原因を調査したり、後から失敗したイベントを再送信する際に利用します。

### 処理に失敗したイベントのハンドリング

主に下の図の４箇所で処理に失敗し、Document と Completion 間で正しく同期が行われずデータ不整合が起きる可能性があります。

![[20230301133250.png]]

データ不整合が生じるエラー発生箇所

不整合が発生しうるステップを順に見ていき、対策について説明します。

- ステップ 2 で Document の更新に失敗した場合
イベントを送らないことで、不整合を回避できます。
- ステップ 3 で Producer からキューへのメッセージ送信に失敗した場合  
Document 更新に成功した後、イベント送信処理やキューを実現するシステムに問題がある場合に Completion は更新に失敗し不整合が起こります。
これを防ぐためには Document の更新とイベント送信をアトミックに実行する必要があります。
[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)がサポートされるデータベースでは２フェーズコミットや [Transactional outbox パターン](https://microservices.io/patterns/data/transactional-outbox.html) のような方法で同一[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)で実行することで整合性を担保できますが、分散型データストアである Elasticsearch の場 合[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)はサポートされていないため、今回はメッセージ送信に失敗した場合は、不整合を許容しエラーログを残し開発者に通知するに留めています。
- ステップ 4 でキューからのイベントを受信する際に失敗した場合 
イベント受信処理やキューを実現するシステムに問題がある場合に起こり得ます。
キューにイベントデータが永続化されている場合、後から復旧したタイミングで再度イベントを受信することで不整合を防げます。
- ステップ 5 で Completion 更新に失敗した場合  
想定しないデータ起因のエラーや、更新処理自体に問題がある場合、[検索エンジン](http://d.hatena.ne.jp/keyword/%B8%A1%BA%F7%A5%A8%A5%F3%A5%B8%A5%F3)に対する過負荷による失敗など、様々な問題が発生する可能性が高いのはこのステップです。
イベントは Consumer が受信したタイミングでキューから削除されるため、受信後処理に失敗した場合は消えてしまいます。
対策として失敗したイベントは、デッドレターキューに保存し毎日夜間に一度自動でイベントのリプレイを行います。一定回数連続して失敗してデッドレターキューに溜まったイベントは削除しています。(*4)

(*4) デッドレターキューを作らず、メッセージブローカーが Consumer からメッセージが正しく受信されたことを示す確認応答(Acknowledgement)を受け取る仕組みを利用して、更新失敗時は、Ack メッセージを返却しないことでイベントをキュー内に保存し、時間を置いて自動リトライするといった方法もあります。

### 差分更新によるデータ不整合の解消

差分更新の特性上、一度差分の更新に失敗するとそれ以降データの不整合が発生し続けます。

一方で前項で説明したように、処理に失敗する箇所は複数あり、差分の更新に失敗しデータの不整合が発生する可能性をゼロにはできません。

データの不整合が発生した場合に特に問題となるのは0件ヒットです。削除されるべき Completion をユーザーにサジェストして検索された場合、Completion に紐づく Document が存在せず0件が返りユーザーの検索体験を損ねます。

このような不整合を解消するために、**Document **[**メタデータ**](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)**削除イベントが送られたきた際は差分更新でを行いません。**

まず**データソースである Document インデックスに問い合わせて Completion に紐づく実際の Document 件数を取得**し、Completionが保持する参照カウントを更新し整合をとり、0件の場合は Completion を削除しています。

![[20230301133436.png]]

差分更新で生じた不整合の解消ポイント

また途中で処理に失敗し、デッドレターキューに溜まったイベントをリプレイする際も他のイベントで更新対象の Completion が既に更新されている可能性があるため、同様の処理を行います。

### 今後の展開

Document の更新イベントをトリガーに、連携する周辺サービスも更新処理を行うという[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)は他にも考えられます。

例えば以下のような[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)です。

- Document インデックス時に Document の特徴量を外部サービスで生成して検索時ランキングに利用したい
- Document のどのフィールドがどのような値で更新されたかをオペレーションログとして残しておきたい

今後このようなケースでも今回紹介した仕組みが活用できるのではないかと考えています。

### まとめ

本記事ではイベント駆動型[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)を採用し QAC データを更新する方法について紹介しました。

各マイクロサービス間をイベントを利用して非同期にやり取りを行うことで各[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は[疎結合](http://d.hatena.ne.jp/keyword/%C1%C2%B7%EB%B9%E7)になり、責務もシンプルになります。

一方でサービス間を連携する上での[プロトコル](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%C8%A5%B3%A5%EB)となるイベント[スキーマ](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AD%A1%BC%A5%DE)の設計や非同期処理に失敗した際のエラーハンドリングを適切に行うことが重要になります。

※ 本機能は、これから製品への搭載が予定されています。

### メンバー募集中!!

株式会社 LegalOn Technologies では、検索システムの開発に興味のある[インターン](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3)生や、一緒に働くエンジニアを募集しています。気軽にご応募ください！

こんにちは、株式会社LegalOn TechnologiesのLegalForceキャビネ開発部でQAリードを務めている島根（[@shimashima35](https://twitter.com/shimashima35)）と申します。

QAというとマニュアルテストが中心かと思われるかもしれません。確かにマニュアルテストはQAの業務の一部ではありますが、「質とスピードの両立」つまりプロダクト品質の高さとリリーススピードの両立を目指すため自動テストの導入もおこなっています。

今回は[LegalForceキャビネ](https://legalforce-cloud.com/cabinet)のバックエンドに対する[API](http://d.hatena.ne.jp/keyword/API)テストを実装した話をご紹介します。

# [API](http://d.hatena.ne.jp/keyword/API)テストとは

まず最初に[API](http://d.hatena.ne.jp/keyword/API)テストについて説明します。

## [API](http://d.hatena.ne.jp/keyword/API)テストの概要

[API](http://d.hatena.ne.jp/keyword/API)テストとはWeb [API](http://d.hatena.ne.jp/keyword/API)の外形的な仕様を満たしているかを HTTP(S)を用いてテストすることです。バックエンドのコントローラーに対する[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)とは以下の点が異なります。

- HTTP(S)を経由する
- データストアまで含めて結合している
- コード[カバレッジ](http://d.hatena.ne.jp/keyword/%A5%AB%A5%D0%A5%EC%A5%C3%A5%B8)を意識しない

テストピラミッドにおける `Integration Test` に相当するものです。

![[20230120172614.png]]

テストピラミッド

## [API](http://d.hatena.ne.jp/keyword/API)テストのメリット・デメリット

[API](http://d.hatena.ne.jp/keyword/API)テストの概要を説明しましたが、次に[API](http://d.hatena.ne.jp/keyword/API)テストと[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)・E2Eテストとの比較をしていきます。

### [ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)との比較

[API](http://d.hatena.ne.jp/keyword/API)テストには[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)と比べて以下のようなメリットがあります。

- Web [API](http://d.hatena.ne.jp/keyword/API)そのものについてのテストが行える
- 結合した状態での振る舞いの正しさを確認できる

一方で以下のようなデメリットがあります。

- データベースなど外部の状態に依存するので壊れやすい
- 実行速度が遅い
- 記述量が一般に増える

### ブラウザテストとの比較

[API](http://d.hatena.ne.jp/keyword/API)テストはブラウザテストと比べて以下のようなメリットがあります。

- 実行速度が速い
- 壊れにくい

一方で以下のようなデメリットがあります。

- 表示に関する問題を検出できない
- ブラウザ依存の問題を検出できない

# [API](http://d.hatena.ne.jp/keyword/API)テスト導入に至る経緯

## 前提および背景

モチベーションの前に、[API](http://d.hatena.ne.jp/keyword/API)テストを導入する前のLegalForceキャビネのテスト周りの状況について説明します。

LegalForceキャビネでの自動テストは以下のような状況でした。

- [ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)はフロントエンド・バックエンドともここ1年くらいの新規部分の[カバレッジ](http://d.hatena.ne.jp/keyword/%A5%AB%A5%D0%A5%EC%A5%C3%A5%B8)は高い一方、古い部分の[カバレッジ](http://d.hatena.ne.jp/keyword/%A5%AB%A5%D0%A5%EC%A5%C3%A5%B8)は低い。
- ブラウザテストは[mabl](https://www.mabl.com/)を使いリスクベースで優先順位を決めて書いているが、全体としての機能[カバレッジ](http://d.hatena.ne.jp/keyword/%A5%AB%A5%D0%A5%EC%A5%C3%A5%B8)はまだ低い。

全体的には自動テストを導入しているもののまだマニュアルテストが中心となっていました。

## [API](http://d.hatena.ne.jp/keyword/API)テスト導入のきっかけ

[API](http://d.hatena.ne.jp/keyword/API)テストは以前から導入したいと漠然と考えていましたが、LegalForceキャビネの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)変更により具体化しました。性能・キャパシティ向上を目的としてデータストアをそれまで使っていた[Firestore](https://firebase.google.com/products/firestore?hl=ja)から[MySQL](https://www.mysql.com/jp/)への移行が決まったためです。

LegalForceキャビネでは、フロントエンドがバックエンドのWeb [API](http://d.hatena.ne.jp/keyword/API)を呼び出しその結果をもとに[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)する、いわゆるSPA(Single Page Application)の構成をとっています。そのため、[API](http://d.hatena.ne.jp/keyword/API)仕様は変わらないものの、バックエンドのかなりの部分を書き換える必要が出てきます。書き換えるということは必然的に[リグレッション](http://d.hatena.ne.jp/keyword/%A5%EA%A5%B0%A5%EC%A5%C3%A5%B7%A5%E7%A5%F3)テストを行う必要も出てきます。

今ある[ユニットテスト](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%C3%A5%C8%A5%C6%A5%B9%A5%C8)とブラウザテストだけでは[カバレッジ](http://d.hatena.ne.jp/keyword/%A5%AB%A5%D0%A5%EC%A5%C3%A5%B8)の関係で[リグレッション](http://d.hatena.ne.jp/keyword/%A5%EA%A5%B0%A5%EC%A5%C3%A5%B7%A5%E7%A5%F3)テストの範囲全てはカバーしきれません。また、ブラウザテストのシナリオを拡充するという手段も検討しましたが、以下の点で好ましくありません。

- 一般にブラウザテストは他の自動テストと比較してメンテナンスコストが高いため、むやみにケースを増やしたくない。
- [API](http://d.hatena.ne.jp/keyword/API)内部のバリデーションのテストを行う際、ブラウザテストではUIレベルでバリデーションが行われるため、目的のテストができないことがある。

上記の前提を踏まえた結論として、[API](http://d.hatena.ne.jp/keyword/API)テストを実装し[API](http://d.hatena.ne.jp/keyword/API)レベルでバックエンドの実装を担保する仕組みを作ることにしました。理由は、バックエンドのデータストア変更のみで[API](http://d.hatena.ne.jp/keyword/API)仕様は変わらないため[リグレッション](http://d.hatena.ne.jp/keyword/%A5%EA%A5%B0%A5%EC%A5%C3%A5%B7%A5%E7%A5%F3)テストとして機能すること、作った[API](http://d.hatena.ne.jp/keyword/API)テストは資産として使い続けることができるからです。

# 技術選定

次に行ったのは、具体的にどの言語でどのツールを用いるかを選定することです。候補としては以下のようなものがありました。

- [Karate](https://github.com/karatelabs/karate)
- [REST Assured](https://rest-assured.io/)
- [Playwright](https://github.com/microsoft/playwright)
- [Cypress](https://www.cypress.io/)

これらのツールについて以下の観点で絞り込んでいきました。

- テスト記述言語
- 言語処理系
- シンプルさ

結論からいうと、上記で挙げた[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)は利用せず、既に利用していたJestのみを用いることになりました。以下に決定までの経緯を説明します。

LegalForceキャビネはフロントエンド・バックエンド共にTypeScriptで実装され、バックエンドはNode.js上で実行されます。[API](http://d.hatena.ne.jp/keyword/API)テストの導入はQA・SET（Software Engineer in Test）が主導するもののテストの追加・保守はバックエンドエンジニアが行うことになるので、バックエンドと言語・環境を揃えることが望ましいです。

また、導入にあたり[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)固有の知識を過度に要求するものも学習障壁になるため可能な限り避けたいものです。

KarateはGherkinによる[DSL](http://d.hatena.ne.jp/keyword/DSL)でテストをかけるので言語非依存という点ではよいですが、実行環境としてJavaVMを要求します。既存インフラでJavaVMはないので、このためにJavaVMを用意するのは望ましくありません。

REST Assured はテスト記述・実行環境ともに[Java](http://d.hatena.ne.jp/keyword/Java)/JavaVMなので却下。

PlaywrightとCypressはともにTypeScriptで記述しNode.js上で実行できるため今の環境との親和性が高くよいものでした。

その後社内のTypeScript[有識者](http://d.hatena.ne.jp/keyword/%CD%AD%BC%B1%BC%D4)と話をしたところ、

- [API](http://d.hatena.ne.jp/keyword/API)テストは行うことが非常にシンプル
- [JSON](http://d.hatena.ne.jp/keyword/JSON)は[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)/TypeScript組み込みでパースできる
- 余計な依存は増やしたくない

との意見があったため、[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)の利用を辞めることにしました。

## [API](http://d.hatena.ne.jp/keyword/API)テストの構成

[API](http://d.hatena.ne.jp/keyword/API)テストの基本的な構成は以下のようになっています。

[GitHub](http://d.hatena.ne.jp/keyword/GitHub)のPull Request毎に[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Actionsで起動し、TypeScriptで実装された[API](http://d.hatena.ne.jp/keyword/API)テストが実行されます。[API](http://d.hatena.ne.jp/keyword/API)テストはFirebase Authenticationによる認証をおこなった後、Cloud Functionsで実装されたバックエンド[API](http://d.hatena.ne.jp/keyword/API)をHTTP(S)で叩き、その戻り値を検証します。

![[20230120173409.png]]

[API](http://d.hatena.ne.jp/keyword/API)テスト構成図

# [API](http://d.hatena.ne.jp/keyword/API)テスト導入時の課題

導入以前は[API](http://d.hatena.ne.jp/keyword/API)テストでは、HTTPリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トを投げて返ってきた[JSON](http://d.hatena.ne.jp/keyword/JSON)を確認するだけと考えていましたが、実際に導入しようとするといくつもの課題が見えてきました。

ここではそれらの課題とその解決について解説します。

## 課題1：リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)ト頻度の制限

[API](http://d.hatena.ne.jp/keyword/API)テスト構成図の通り、LegalForceキャビネでは認証についてはFirebase Authenticationを利用しています。[API](http://d.hatena.ne.jp/keyword/API)テストを実行する際にも、その認証を行う必要があります。

最初の実装ではリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トごとにFirebase Authenticationでの認証を行なっていました。

しばらくはこれで問題ありませんでしたが、複数人でテストを実行した際に呼び出し回数の制限によりエラーになるという問題が発生しました。公式ドキュメントに記載はないですがどうやら単一IPからのRateLimitがあることがわかりました。

対策として、以下のような実装変更を行いました。

- jestの[GlobalSetup](https://jestjs.io/ja/docs/configuration#globalsetup-string)でFirebase Authenticationの呼び出しを行う。
- 上記で取得した認証キーをすべてのテストで利用する。

このようにすることでテストスイート全体で認証の実行は1回に抑えられ問題は発生しなくなりました。

## 課題2：大人数でのテスト・実装方針の統一が難しい

[API](http://d.hatena.ne.jp/keyword/API)テストの基盤部分は私ともう一人のSETで実装しましたが、[API](http://d.hatena.ne.jp/keyword/API)の変更時のテスト修正があるため、個別のテストについてはバックエンドエンジニアにも書いてもらうつもりでした。

少人数の場合、テスト・実装方針の共有は口頭レベルでもある程度機能しますが、バックエンドエンジニアまで含めた数になるとコミュニケーションパスが増えるため難しくなります。 そのため、以下を行うことでその解決を図りました。

- [API](http://d.hatena.ne.jp/keyword/API)テスト実装ガイドの作成
- [もくもく会](http://d.hatena.ne.jp/keyword/%A4%E2%A4%AF%A4%E2%A4%AF%B2%F1)の開催

[API](http://d.hatena.ne.jp/keyword/API)テスト実装ガイドでは[API](http://d.hatena.ne.jp/keyword/API)テストをどのように書くか、そしてどの範囲まで担保するかを明文化し、[もくもく会](http://d.hatena.ne.jp/keyword/%A4%E2%A4%AF%A4%E2%A4%AF%B2%F1)ではバックエンドエンジニアを集め、そのガイドをもとに[API](http://d.hatena.ne.jp/keyword/API)テストを実際に書いてもらうというものです。

![[20230120173451.jpg]]

[API](http://d.hatena.ne.jp/keyword/API)テスト実装ガイド抜粋

これにより、[API](http://d.hatena.ne.jp/keyword/API)テストの記述方針を揃えることができ、また実際に[API](http://d.hatena.ne.jp/keyword/API)テストを書くことでバックエンドエンジニア自身で実装・保守が行えるようになりました。

それだけではなく、大人数でテストを実行したことで課題1のような問題の発見にも繋げることができました。

## 課題3：テストデータの環境依存

`APIテストの構成` で書いたように、[API](http://d.hatena.ne.jp/keyword/API)テストはMockではないDB(Firestore)まで結合した状態で実行されます。このため、必然的に[API](http://d.hatena.ne.jp/keyword/API)テストはデータ依存を引き起こすことになります。このことで問題になるのは以下の3点です。

20. [API](http://d.hatena.ne.jp/keyword/API)テストごとにデータ作成が必要になる
21. [API](http://d.hatena.ne.jp/keyword/API)テスト以外がデータ操作を行うとテストが壊れる
22. [API](http://d.hatena.ne.jp/keyword/API)テスト用のデータを入れた環境でしか実行させることができない

1の問題に対しては愚直にテストデータを作り投入していくしかありません。具体的にはWeb画面から目的のデータを登録・変更していく作業を、テストで必要な分だけ実施しました。

2の問題は、LegalForceキャビネのデータが顧客ごとに独立していることを利用し、[API](http://d.hatena.ne.jp/keyword/API)テスト用のテナントを作成することで解決しました。

3つ目の問題ですが、これは以下のようなものです。

[API](http://d.hatena.ne.jp/keyword/API)テストは[リグレッション](http://d.hatena.ne.jp/keyword/%A5%EA%A5%B0%A5%EC%A5%C3%A5%B7%A5%E7%A5%F3)テストの一部としてビルド毎に[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Actionsからステージング環境で実行されます。しかし、このタイミング以外にも開発中の[API](http://d.hatena.ne.jp/keyword/API)に対して開発者毎の個別環境で動かしたいという要望もありました。

この問題に対してはステージング環境の[API](http://d.hatena.ne.jp/keyword/API)テスト用のデータをコピーする[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)を作成し、どの環境でも実行できるようにしました。

## 課題4：CIでの安定化

UnitTestではあまり起きないことですが、弊社で実装した[API](http://d.hatena.ne.jp/keyword/API)テストではタイミングの問題などによるFlaky Test（実行結果が不安定なテスト）の問題が発生しました。ローカルで実行している分にはそのまま再実行で良いのですが、上で書いたように[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Actionsによる自動実行でしかもこれが通らないとビルド環境と見做さない運用をしているので致命的です。

これに対しては、[API](http://d.hatena.ne.jp/keyword/API)テストの実[行基](http://d.hatena.ne.jp/keyword/%B9%D4%B4%F0)盤であるJestの `--onlyFailures` オプションを利用し、以下のように失敗したテストのみ再実行を行うようにしました。

```plain text
yarn jest tests_api/ || yarn jest tests_api/ --onlyFailures
```

⚠️ 実際には[API](http://d.hatena.ne.jp/keyword/API)テストはyarn経由で実行され、jestに対する引数もこれよりも多いですが、意図を伝えるために詳細は省略しています。

rerunは一回のみですが、これにより以前より安定性が増し、また再実行による時間増加も `--onlyFailures` を使うことで最小限にしました。

## 課題5：破壊的な[API](http://d.hatena.ne.jp/keyword/API)のテスト

課題3でもあげた[API](http://d.hatena.ne.jp/keyword/API)テストでのデータの扱いですが、事前状態だけでなくテストの再現性を担保するためにはデータを更新した場合そのままにしておくことはできません。

この問題に対しては、愚直ではありますが更新処理を行うテストの事後処理に元に戻す[API](http://d.hatena.ne.jp/keyword/API)呼び出しを追加することで対応しました。これにより、[API](http://d.hatena.ne.jp/keyword/API)テストを何度実行しても常に同じ状態で始まるため、データ不整合で失敗することはありません。

ただ、この方法だとテストの記述量が増えてしまうのと複雑性が上がるため、テスト用のデータを予め外部に保存しておき、テスト実行後に保存したデータを投入し初期状態に戻すということも計画しています。

# [API](http://d.hatena.ne.jp/keyword/API)テストを導入した結果

Firestoreから[MySQL](http://d.hatena.ne.jp/keyword/MySQL)への移行は今まさに佳境を迎えています。[API](http://d.hatena.ne.jp/keyword/API)テストを作り込んでおいたため、手動でテストしなければいけない部分は大幅に減り、テスト[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)の圧縮は現時点では成功しています。

また、[API](http://d.hatena.ne.jp/keyword/API)テストはデータ移行だけでなく普段の開発でもバックエンドの[リグレッション](http://d.hatena.ne.jp/keyword/%A5%EA%A5%B0%A5%EC%A5%C3%A5%B7%A5%E7%A5%F3)テストとして活用されています。[定量](http://d.hatena.ne.jp/keyword/%C4%EA%CE%CC)的なデータはとっていませんが、[API](http://d.hatena.ne.jp/keyword/API)仕様が変わらないバックエンドの修正についてはほとんど[API](http://d.hatena.ne.jp/keyword/API)テストのみでリリースをおこなっている状態になっています。

# おわりに

LegalForceキャビネでは[API](http://d.hatena.ne.jp/keyword/API)テストの導入を進めてきました。[API](http://d.hatena.ne.jp/keyword/API)テストの導入を進める中、多くの課題がありました。しかし、同僚でSETの[引持（@rmochioo）](https://twitter.com/rmochioo)の協力もあり、[MySQL](http://d.hatena.ne.jp/keyword/MySQL)移行時のテスト[工数](http://d.hatena.ne.jp/keyword/%B9%A9%BF%F4)を圧縮することができました。

弊社での[API](http://d.hatena.ne.jp/keyword/API)テスト導入については、2022年12月5日に開催された[ソフトウェアテスト自動化カンファレンス2022](https://testautomationresearch.connpass.com/event/262132/)にて引持による「[API](http://d.hatena.ne.jp/keyword/API)テストにおけるテスト駆動テスト実装のすゝめ」というタイトルでこのBlogとは別の観点で発表されています。この記事を執筆している時点ではまだ資料・動画は公開されていませんが、いずれ公開されると思いますのでそちらも参照していただけると幸いです。

# メンバー募集中！

弊社では一緒に自動テストや「質とスピードの両立」のための仕組みづくりを行うSoftware Engineer in Testを募集しています。まずは、カジュアルにお話しましょう！

[TECH-702- SET / Software Engineer in Test - 株式会社LegalOn Technologies](https://herp.careers/v1/legalforce/gsG_4dxXBE6-)

こんにちは。株式会社LegalOn Technologies でエンジニアをしている赤部です。

[自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)をしていると、単語の出現回数を数えたり、単語と何らかのデータを紐付けたりすることが頻繁に必要になります。これらのことを簡単に行える、最も一般的でよく知られたデータ構造はハッシュマップではないでしょうか？

[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC) Rust では、標準ライブラリの [`std::collections::HashMap`](https://doc.rust-lang.org/std/collections/struct.HashMap.html) を用いればハッシュマップを簡単に導入できます。しかし、場合によっては標準ライブラリの `HashMap` ではなく [hashbrown](https://github.com/rust-lang/hashbrown) クレートを利用したほうが、シンプルに効率的なコードを実装できるかもしれません。

この記事では、まず hashbrown クレートを紹介し、コード例とともに hashbrown クレートの使いどころを紹介します。

# hashbrown クレート

Rust 1.66 時点の標準ライブラリの `HashMap` は、 [hashbrown](https://github.com/rust-lang/hashbrown) クレートをラップしたものとなっています。

標準ライブラリと hashbrown クレートの大きな違いは、hashbrown クレートではデフォルトで [aHash](https://github.com/tkaitchuck/ahash) という高速なハッシュ[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)が使われていますが、標準ライブラリでは [Python](http://d.hatena.ne.jp/keyword/Python) や [Ruby](http://d.hatena.ne.jp/keyword/Ruby) などの他の[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)と同様に SipHash 1-3 という強力な HashDoS 対策が施された[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)がデフォルトとなっています。また、 hashbrown クレートは no_std 環境でも alloc クレートが有効であれば利用できますが、標準ライブラリの `HashMap` は環境ノイズを利用して[ハッシュ値](http://d.hatena.ne.jp/keyword/%A5%CF%A5%C3%A5%B7%A5%E5%C3%CD)にランダム性を与えるため、 [no_std では利用することができません](https://docs.rust-embedded.org/book/intro/no-std.html#overview)。

この他に、 hashbrown クレートではハッシュマップの低レベルな [API](http://d.hatena.ne.jp/keyword/API) や、標準ライブラリでまだ採用されていない [API](http://d.hatena.ne.jp/keyword/API) が提供されています。

標準ライブラリの `HashMap` は最も広く最初に使われるものなので、それを踏まえれば適切な実装でしょう。しかし、速度が重視される場面や組み込みデ[バイス](http://d.hatena.ne.jp/keyword/%A5%D0%A5%A4%A5%B9)等での利用を考えた場合は、状況に応じて最適なクレートを選択する必要があります。

# `std::collections::HashMap` で所有権を持つ型をキーにする際の問題点

Rust では、 `HashMap` のキーとして、データへの所有権を持つ型を指定することも、参照を指定することもできます。参照を利用すれば、データのコピーにかかるコストを削減できますが、参照先のデータが生存している期間しか利用することができません。

ではここで、入力された文字列を空白で区切り、単語の出現回数を `HashMap` で数え上げるプログラムを考えてみましょう。

## `HashMap::entry()` を利用する方法

まずは [`entry()`](https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry) を利用する方法です。コードは以下のようになります。

```plain text
use std::collections::HashMap;

fn count_words(text: &str) -> HashMap<String, usize> {
    let mut result = HashMap::new();
    for word in text.split(' ') {
        // ハッシュマップの指定されたキーの値をインクリメント
        // キーが登録されていなければ事前に0を追加する
        *result.entry(word.to_string()).or_insert(0) += 1;
    }
    result
}

fn main() {
    let result = count_words("I have a pen . You have a ball .");
    for (word, cnt) in result {
        println!("{word}: {cnt}");
    }
}

```

実行結果:

```plain text
.: 2
You: 1
ball: 1
a: 2
have: 2
I: 1
pen: 1
```

このコードでは、引数として与えられた `text` の参照先が破棄されても戻り値を使い続けられるように、 `HashMap` のキーの型を文字列への所有権を持つ `String` 型としています[*1](https://tech.legalforce.co.jp/entry/2023/01/12/095326#f-654ed4c5)。 [`HashMap::entry()`](https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry) の引数にはキーの型である `String` をムーブして渡す必要があります。しかし、 `word` は `text` を参照する文字列スライス (`&str`) であり、 `String` 型ではありません。このため、 [`str::to_string()`](https://doc.rust-lang.org/std/primitive.str.html#method.to_string-1) を呼び出して `word` から `String` を生成する必要があります。 `String` の生成にはヒープ上の領域確保と文字列のコピーが必要なため、それなりに大きなコストとなります。

`entry()` を用いる場合、単語が既に登録されている場合であっても毎回 `String` を生成する必要がありますが、それらは明らかに無駄な動作です。

## `HashMap::get()` と `HashMap::insert()` を利用する方法

そこで、単語が登録されているかを事前に確認し、必要な場合のみ `to_string()` を呼び出すことを考えます。コードは以下のようになります。

```plain text
fn count_words(text: &str) -> HashMap<String, usize> {
    let mut result = HashMap::new();
    for word in text.split(' ') {
        if let Some(c) = result.get_mut(word) {
            // 登録されている場合はインクリメント
            *c += 1;
        } else {
            // 登録されていない場合は新しいキーに1を追加
            result.insert(word.to_string(), 1);
        }
    }
    result
}

```

これで無駄に `String` を生成する必要が無くなりました。 しかし、このコードも無駄な処理が完全に無くなったわけではありません。[ハッシュ値](http://d.hatena.ne.jp/keyword/%A5%CF%A5%C3%A5%B7%A5%E5%C3%CD)の計算などを含めた `HashMap` の探索を、(1) 単語の有無を確認するときと、(2) 単語の登録を行うとき、の2回行う必要があるからです。

## `HashMap::raw_entry_mut()` を利用する方法

そこで、現時点の Nightly 版の Rust では [`raw_entry_mut()`](https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.raw_entry_mut) という[API](http://d.hatena.ne.jp/keyword/API)が用意されています。 `raw_entry_mut()` は、与えられたキーから `HashMap` の特定のエントリへのポインタのようなものを返します。これを用いると、探索とデータの挿入を分割することができるため、必要最小限の処理で上述のコードと同様の処理を実現できます。コードは以下のようになります。

```plain text
#![feature(hash_raw_entry)] // Nightly の機能を使用するために必要

use std::collections::HashMap;

fn count_words(text: &str) -> HashMap<String, usize> {
    let mut result = HashMap::new();
    for word in text.split(' ') {
        *result
            .raw_entry_mut()
            .from_key(word)
            .or_insert_with(|| (word.to_string(), 0))
            .1 += 1;
    }
    result
}

```

しかし、Nightly 版の Rust は [API](http://d.hatena.ne.jp/keyword/API) が変更される可能性があり、使い続けられる保証はありません。実際に、この [API](http://d.hatena.ne.jp/keyword/API) に対しては問題点が指摘がされ、[見直しが行われています](https://github.com/rust-lang/rust/issues/56167#issuecomment-910742027)。

主な指摘は以下の2つです。

- `or_insert_with()` で `from_key()` で指定したキーとは全く関係のないキーを登録できてしまう
- [API](http://d.hatena.ne.jp/keyword/API) が複雑

この [API](http://d.hatena.ne.jp/keyword/API) の使用目的として最も考えられるものは、本記事で取り上げているような「キーが登録されていないときだけ登録する」という処理を効率的に行うことです。であるならば、機能を今よりも簡略化し、より単純な [API](http://d.hatena.ne.jp/keyword/API) で目的を達成できるようにする必要があります。

## `hashbrown::HashMap::entry_ref()` を利用した解決策

上述の `raw_entry_mut()` の問題点を受けて、 hashbrown クレートには [`entry_ref()`](https://docs.rs/hashbrown/latest/hashbrown/struct.HashMap.html#method.entry_ref) という [API](http://d.hatena.ne.jp/keyword/API) が[追加されました](https://github.com/rust-lang/hashbrown/pull/301)。 `entry_ref()` ではキーの参照を受け取り、必要に応じて内部で所有権を持つ型を生成する仕組みとなっています。

`entry_ref()` を用いると、たった1行で、 `entry()` を用いた場合よりも短い文字数で単語の出現回数を数えることができます。コードは以下のようになります。

```plain text
use hashbrown::HashMap;

fn count_words(text: &str) -> HashMap<String, usize> {
    let mut result = HashMap::new();
    for word in text.split(' ') {
        *result.entry_ref(word).or_insert(0) += 1;
    }
    result
}

```

将来的には Rust の標準ライブラリでも `entry_ref()` を利用できるようになるかもしれません。

# 速度比較

ここまで hashbrown クレートを用いたシンプルで効率的なコードを紹介しましたが、実際に各コードでどれほどの速度差があるかを比較します。入力するテキストは、[現代日本語書き言葉均衡コーパス (BCCWJ)](https://clrd.ninjal.ac.jp/bccwj/) のコア約6万文を短単位分割した約127万語です。

実行時間の比較 [ms]

| 関数 | std::collections | hashbrown |
| --- | --- | --- |
| HashMap::entry() | 38.7 | 38.5 |
| HashMap::get() + insert() | 26.6 | 19.8 |
| HashMap::raw_entry_mut() | 26.5 | 19.7 |
| HashMap::entry_ref() | ― | 20.0 |

各ライブラリの中で比較すると、文字列のコピーを抑制することで、 `entry()` を利用する方法に比べて2倍程度高速化されることが確認できます。標準ライブラリと hashbrown クレートで比較すると、デフォルトのハッシュ[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)が高速な hashbrown が速度面で勝っていることが確認できます。

表を見る限り、 `get()` + `insert()` でハッシュマップの探索が2回行われることによる速度低下は確認できませんが、コードの単純さも鑑みれば `entry_ref()` を使うメリットは大きいように思います。

# おわりに

この記事では、Rust の hashbrown クレートを紹介し、標準ライブラリの `HashMap` との比較を行いました。

実際には、処理するデータの特徴も考慮しつつ、適切なデータ構造やライブラリを選択する必要があります。しかし、標準ライブラリの `HashMap` が扱いづらいと感じたとき、標準ライブラリの中で使われている hashbrown クレートは有力な候補の1つになるのではないでしょうか。

# メンバー募集中！

株式会社LegalOn Technologies では、SREや、バックエンドエンジニア、検索システム、研究開発に興味のある[インターン](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3)生など様々なポジションを募集しています。

ご興味がある方は以下の求人ページから求人要項をご確認いただけますので、お気軽にご応募ください！

[https://herp.careers/v1/legalforce/requisition-groups/d2e157cc-120b-4ade-8879-0326c32127bd](https://herp.careers/v1/legalforce/requisition-groups/d2e157cc-120b-4ade-8879-0326c32127bd)

こんにちは、LegalOn TechnologiesのLegalForce開発部のSRE 伊藤です。

私たちのチームでは、LegalForceの安定稼働と同様に、開発者がより楽に開発・運用できるような基盤を提供することをミッションにさまざまな改善活動を行なっています。

今回は[GitHub](http://d.hatena.ne.jp/keyword/GitHub) CodespacesをLegalForceのバックエンドの開発に導入した話をご紹介します。

## [GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesとは

[GitHub](http://d.hatena.ne.jp/keyword/GitHub)が提供している[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)開発環境で、通常十数秒で起動し、すぐ開発環境が手に入ります。

削除や再作成も手軽に行え、CPU/Memoryなどのスペックの変更も容易です。

デフォルトのエディタは[VS Code](http://d.hatena.ne.jp/keyword/VS%20Code)ですが、その他の[IDE](http://d.hatena.ne.jp/keyword/IDE)でもリモート開発機能を通じて扱うことが可能です。

[https://github.co.jp/features/codespaces](https://github.co.jp/features/codespaces)

## LegalForceの開発における課題

当時のバックエンドの開発環境は、開発者のローカルで複数のDockerコンテナ（[Hanami](https://hanamirb.org/)アプリケーション、nginx、[mysql](http://d.hatena.ne.jp/keyword/mysql)、redis、sidekiq）を動かす構成になっていました。

これを見直すきっかけとなったのは、2021年末〜2022年始に、リーダー陣が集まり今後のLegalForceの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)や開発スタイルの方向性を話す会が開催されたことでした。

その中で当時のバックエンドの開発環境において、

- ローカルの環境でコンテナ動かすのが重い
- 開発チームにジョインしたその日のうちにコードを読み、手元でステップ実行できる状態にしたい 
    - しかしソフトウェアのインストールや設定などが面倒である 
        - [Ruby](http://d.hatena.ne.jp/keyword/Ruby)、Docker、Docker Compose、direnv、[aws](http://d.hatena.ne.jp/keyword/aws)vaultなど

などの課題が上がりました。

また同時期に、自分達のチームが行っているDeveloper Surveyでも同様の課題感を抱えている開発者がいると分かりました。

※Developer Survey

LegalForce開発部内で独自に行っている開発者向けの[サーベイ](http://d.hatena.ne.jp/keyword/%A5%B5%A1%BC%A5%D9%A5%A4)。開発環境やCI/CD、モニタリングなどの現在の開発・運用における開発者の体験を計測し、改善に活かす目的で半年に一回程度のペースで行っている。

## 解決策

### 技術選定

上記を受けて、この問題の解決のオーナーシップが自分達のチームに割り当てられました。

社内でも既に他の部門が[GCP](http://d.hatena.ne.jp/keyword/GCP)上の[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)上でリモート開発している事例を知り、LegalForce開発部でも同じような環境を整備することでこの問題を一定解決できるのではと考えました。

そして、選択肢に上がった以下のものを調査・検証することになりました。

- [GitHub Codespaces](https://github.co.jp/features/codespaces)
- [GitPod](https://www.gitpod.io/)
- [Coder](https://coder.com/)
- [JetBrains Space](https://www.jetbrains.com/ja-jp/space/)
- [AWS Cloud9](https://aws.amazon.com/jp/cloud9/)
- [Amazon EC2](https://aws.amazon.com/jp/ec2/)

これらからツールを選定するにあたり、主に以下が論点となりました。

- 使い勝手
- コスト
- セキュリティ
- 機能・将来性

まず、使い勝手のところではDeveloper Surveyから[VS Code](http://d.hatena.ne.jp/keyword/VS%20Code)を使っている開発者が2/3程度を占めると分かっていたので相性の良いプラットフォームとして[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesが第一候補に上がりました。

他の選択肢も[SSH](http://d.hatena.ne.jp/keyword/SSH)で接続できたり、GitPodやCoderはかなり[VS Code](http://d.hatena.ne.jp/keyword/VS%20Code)風なブラウザエディタを使うことできますが、やはりワンクリックで[VS Code](http://d.hatena.ne.jp/keyword/VS%20Code) Desktopと接続し起動できる[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesの使い勝手は良さそうだと感じました。

※現在GitPodはβではありますが[VS Code](http://d.hatena.ne.jp/keyword/VS%20Code) DesktopやJetBrains [Gateway](http://d.hatena.ne.jp/keyword/Gateway)など各種[IDE](http://d.hatena.ne.jp/keyword/IDE)との連携ができるようです。

コスト面では金額の他に、開発者・SREの運用面でのコストを鑑みて、自分たちで[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)を立てる[Amazon EC2](http://d.hatena.ne.jp/keyword/Amazon%20EC2)や、[kubernetes](http://d.hatena.ne.jp/keyword/kubernetes)[クラスタ](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%B9%A5%BF)など自前のインフラにホストする必要があるCoderは選択肢から消えました。

ここまでで、第一候補[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespaces、第二候補GitPodというところまで絞り込み、両者は金額面でほぼ同じ、セキュリティも方法は違えど第[三者](http://d.hatena.ne.jp/keyword/%BB%B0%BC%D4)とのネットワーク、コンピューティング環境の分離レベルは実用レベルであると調査からわかりました。

最終的な判断としては、使い勝手のところで[VS Code](http://d.hatena.ne.jp/keyword/VS%20Code)との相性の良さや、（当時まだβでしたが）[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Copilotとの連携などプラットフォームとしての将来性を考慮し[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesを選択することにしました。

### 開発環境の構築において工夫した点

[GItHub](http://d.hatena.ne.jp/keyword/GItHub) Codespacesでローカルと同様の開発環境を提供するために課題となったのが、内部で使っている[API](http://d.hatena.ne.jp/keyword/API)へのアクセスです。

![[20221227151127.png]]

LegalForce構成図

上の構成図に表されるように、LegalForceの主な機能は[自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)や検索などの[API](http://d.hatena.ne.jp/keyword/API)を組み合わせて実現されており、Webバックエンドから利用されます。

本番環境や検証環境においては、これらの[API](http://d.hatena.ne.jp/keyword/API)は[VPC](http://d.hatena.ne.jp/keyword/VPC)の外部からはアクセスできない構成となっています。

開発環境では[VPC](http://d.hatena.ne.jp/keyword/VPC)外からのアクセス用の[ロードバランサー](http://d.hatena.ne.jp/keyword/%A5%ED%A1%BC%A5%C9%A5%D0%A5%E9%A5%F3%A5%B5%A1%BC)をオフィスの[IPアドレス](http://d.hatena.ne.jp/keyword/IP%A5%A2%A5%C9%A5%EC%A5%B9)を制限する形で用意しており、[VPN](http://d.hatena.ne.jp/keyword/VPN)接続や出社をすることで開発ができていました。

従来と同じような環境を提供するためには、[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesの機能によって起動したリモートの環境 （以下 codespace と呼びます） からそれらの[API](http://d.hatena.ne.jp/keyword/API)へアクセスする必要がありました。

[公式ドキュメント](https://docs.github.com/ja/codespaces/developing-in-codespaces/connecting-to-a-private-network)によるとプライベートネットワークへの接続について、[GitHub](http://d.hatena.ne.jp/keyword/GitHub) [CLI](http://d.hatena.ne.jp/keyword/CLI) [拡張機能](http://d.hatena.ne.jp/keyword/%B3%C8%C4%A5%B5%A1%C7%BD)を使用するか[VPN](http://d.hatena.ne.jp/keyword/VPN)を使用するかのどちらかが推奨されていますが、[VPN](http://d.hatena.ne.jp/keyword/VPN)製品の[CLI](http://d.hatena.ne.jp/keyword/CLI)をcodespaceのイメージにインストールしておき、それを使って[VPN](http://d.hatena.ne.jp/keyword/VPN)接続することで対応しました。

理由としては、codespace内でコマンドを実行する方がcodespace起動時に自動で[VPN](http://d.hatena.ne.jp/keyword/VPN)接続を確立することができ（後述）、毎回ローカルで[GitHub](http://d.hatena.ne.jp/keyword/GitHub) [CLI](http://d.hatena.ne.jp/keyword/CLI)コマンドを実行するよりも手間が少なくなると判断したからです。

[VPN](http://d.hatena.ne.jp/keyword/VPN)接続に必要な認証情報は[Codespaces secrets](https://docs.github.com/ja/codespaces/managing-your-codespaces/managing-encrypted-secrets-for-your-codespaces)にあらかじめ登録しておくことで、codespace内では[環境変数](http://d.hatena.ne.jp/keyword/%B4%C4%B6%AD%CA%D1%BF%F4)経由で[CLI](http://d.hatena.ne.jp/keyword/CLI)に値を渡し使用しています。

ここで一点ハマったポイントとしては、デフォルトの[VPN](http://d.hatena.ne.jp/keyword/VPN)設定ではcodespaceと外側の通信の全てが[VPN](http://d.hatena.ne.jp/keyword/VPN)トンネルに流れしまいローカルとcodespaceの通信が途切れてしまうことでした。

これに対しては[自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)や検索の[API](http://d.hatena.ne.jp/keyword/API)へ向かう通信のみ[VPN](http://d.hatena.ne.jp/keyword/VPN)トンネルに流れるようにcodepspace内のルーティングテーブルを起動時に設定することで対応しました。

![[20221227151351.png]]

ルーティングのイメージ図

泥臭く `ip route` コマンドを使ってルーティングの設定を書いているのですが、これを[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)化し、codespaceの作成・起動時に自動的に[VPN](http://d.hatena.ne.jp/keyword/VPN)接続・ルーティングの設定ができる仕組みになっています。

codespaceの作成・起動時に[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)を流す仕組みは、postCreateCommandとpostStartCommandを利用していて、それぞれ、codespaceが作成された時に実行されるコマンド、codespaceが起動する時に実行されるコマンドです。

ここではpostCreateCommandで[AWS](http://d.hatena.ne.jp/keyword/AWS) [CLI](http://d.hatena.ne.jp/keyword/CLI)の名前付きプロファイルの設定、postStartCommandでは[VPN](http://d.hatena.ne.jp/keyword/VPN)接続とルーティングの設定を行なっています。

それぞれの[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)の中身は以下の通りです。

-  
postCreateCommand.sh
```plain text
#!/bin/bash

ls ${HOME}/.aws >/dev/null 2>&1 || mkdir ${HOME}/.aws
cat <<EOS > ${HOME}/.aws/config
[profile lf-dev]
sso_start_url = <AWS SSOのログイン画面のURL>
sso_region = ap-northeast-1
sso_account_id = <AWSアカウントID>
sso_role_name = ${AWS_SSO_ROLE_NAME}
region = ap-northeast-1
output = json
EOS

```
-  
postStartCommand.sh
```plain text
#!/bin/bash

# LF_OFFICE_VPN_USERNAME, LF_OFFICE_VPN_PASSWORDはあらかじめCodespaces secretsに登録しておく
# vpn.confでは set-routes = 0 と設定し、VPN接続時にデフォルトで設定されるルーティングを無効にしてある
nohup bash -c "sudo --preserve-env=LF_OFFICE_VPN_USERNAME,LF_OFFICE_VPN_PASSWORD /usr/bin/openfortivpn --username \\"${LF_OFFICE_VPN_USERNAME}\\" --password \\"${LF_OFFICE_VPN_PASSWORD}\\" -c .devcontainer/vpn.conf &"

# connection確立まで待つ
sleep 10

for ip in $(dig <ロードバランサーのドメイン> A +short)
do
    sudo ip route add "${ip}"/32 via "$(ip addr show ppp0 | grep -oP '(?<=inet\\s)\\d+(\\.\\d+){3}')" dev ppp0
done

```

最終的な[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesを使った開発環境の構成は以下の通りになりました。

![[20221227151511.png]]

開発環境の構成図

## 結果

[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesを導入したことでバックエンドの開発環境が十数秒で準備できるようになり、ローカルが重くなる問題も解決しました。

仕組み上仕方ない部分ではありますが、codespaceとローカルとのレイテンシはある程度存在したり、codespaceの起動が若干面倒に感じたりする部分はあるものの、元々の課題の解決以外にも以下の点でメリットを感じており、総合的にデメリットを上回ると思っています。

- [ソースコード](http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9)やデータ、[AWS](http://d.hatena.ne.jp/keyword/AWS)の認証情報などをローカルに保存することなく開発ができる
- マシンスペックを柔軟に変更できる
- 気軽に環境を0から再作成できる
- インターネットに接続さえしていればローカルのマシンのスペック関係なく快適に開発ができる
- 作業場所のネットワーク帯域が狭くてもcodespaceは[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)上にあるのでパッケージのインストール等が高速に行える

## 今後

さらに[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesの機能を駆使すると、従来のローカルの環境でできなかった様々なことができるようになると考えています。

例えば、現状バックエンドとフロントエンドの[リポジトリ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA)が分かれており、これらを組み合わせて動かすには複数の[リポジトリ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA)の対象のブランチを引っ張ってきてローカルで同時に起動する、またはステージング環境にデプロイする必要があるなど手間がかかっています。

これに対し、codespace上で起動しているアプリケーションの[ポートを公開（認証付き）する機能](https://docs.github.com/en/codespaces/developing-in-codespaces/forwarding-ports-in-your-codespace)を利用することで、バックエンドエンジニアとフロントエンジニアが並行で開発を進めながら手軽に結合して動作確認ができるなど、当初の課題を超えてさらに楽に素早く開発ができるようになると考えています。

## まとめ

今回は[GitHub](http://d.hatena.ne.jp/keyword/GitHub) Codespacesをバックエンドの開発環境に導入した話をお届けしました。

LegalOn TechnologiesのSREチームでは、プロダクトの信頼性を担保する活動や開発者が楽に開発・運用できるような基盤を整備する活動を通じて顧客により大きな価値を届けられるようこれからも改善を続けていきます。

もし興味があれば下記の募集要項をご覧ください！

ぜひ私たちと一緒に、法とテク[ノロ](http://d.hatena.ne.jp/keyword/%A5%CE%A5%ED)[ジー](http://d.hatena.ne.jp/keyword/%A5%B8%A1%BC)の力で、安心して前進できる社会を創っていきましょう。

こんにちは。株式会社 LegalOn Technologies でエンジニアをしております、勝田([@WinField95](https://twitter.com/WinField95))です。この記事は、[情報検索・検索技術 Advent Calendar 2022](https://adventar.org/calendars/7389) の 22日目の記事として執筆されました。LegalForce キャビネについて紹介すると共に、社内で運用されている検索システムを作り直したきっかけとなった課題と改善点についてお話します。

**目次**

- [LegalForce キャビネの検索機能](https://tech.legalforce.co.jp/entry/2022/12/22/162748#LegalForce-%E3%82%AD%E3%83%A3%E3%83%93%E3%83%8D%E3%81%AE%E6%A4%9C%E7%B4%A2%E6%A9%9F%E8%83%BD)
- [Elasticsearch の構成要素について](https://tech.legalforce.co.jp/entry/2022/12/22/162748#Elasticsearch-%E3%81%AE%E6%A7%8B%E6%88%90%E8%A6%81%E7%B4%A0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [検索システムの課題](https://tech.legalforce.co.jp/entry/2022/12/22/162748#%E6%A4%9C%E7%B4%A2%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E8%AA%B2%E9%A1%8C)
- [Nodeあたりの最大 Shard 数のソフトリミット](https://tech.legalforce.co.jp/entry/2022/12/22/162748#Node%E3%81%82%E3%81%9F%E3%82%8A%E3%81%AE%E6%9C%80%E5%A4%A7-Shard-%E6%95%B0%E3%81%AE%E3%82%BD%E3%83%95%E3%83%88%E3%83%AA%E3%83%9F%E3%83%83%E3%83%88)
- [ソフトリミットの設定値変更による延命措置](https://tech.legalforce.co.jp/entry/2022/12/22/162748#%E3%82%BD%E3%83%95%E3%83%88%E3%83%AA%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E8%A8%AD%E5%AE%9A%E5%80%A4%E5%A4%89%E6%9B%B4%E3%81%AB%E3%82%88%E3%82%8B%E5%BB%B6%E5%91%BD%E6%8E%AA%E7%BD%AE)
- [単一の Index 設計への変更](https://tech.legalforce.co.jp/entry/2022/12/22/162748#%E5%8D%98%E4%B8%80%E3%81%AE-Index-%E8%A8%AD%E8%A8%88%E3%81%B8%E3%81%AE%E5%A4%89%E6%9B%B4)
- [まとめ](https://tech.legalforce.co.jp/entry/2022/12/22/162748#%E3%81%BE%E3%81%A8%E3%82%81)

### LegalForce キャビネの検索機能

[LegalForce キャビネ](https://legalforce-cloud.com/cabinet)は、2021年1月に正式版をリリースした契約締結後の契約リスクの制御を目的としたマルチテナンシー[SaaS](http://d.hatena.ne.jp/keyword/SaaS)であり、紙で管理されている契約書の電子化、契約書や契約書に記載されている情報を検索可能なデータベースに組み上げる機能を提供しています。2022年11月には、導入社数600社を突破しました!! 🎉

LegalForce キャビネを導入した顧客は、システム上ではテナントとして表され、テナント毎にユーザーや契約書などのリソースの管理がされます。そして、単一のシステムを複数のテナントで共有する[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)であるマルチテナンシーを採用しています。

契約書に対する操作は [REST API](http://d.hatena.ne.jp/keyword/REST%20API) としてキャビネ開発チームに提供され、契約書を Elasticsearch の Document として検索システムに登録することで、[全文検索](http://d.hatena.ne.jp/keyword/%C1%B4%CA%B8%B8%A1%BA%F7)を実現します。

![[20221222110046.png]]

LegalForce キャビネの条文検索機能

### Elasticsearch の構成要素について

LegalForce キャビネの検索システムでは、Elasticsearch (注1) を用いています。具体的な問題を説明するための導入として、まずは簡単に Elasticsearch の Node、Cluster、Index、Shard について説明をします。

(注1) 本記事は、Elasticsearch 7.17 をもとに記述されています。

**Node**

Elasticsearch が動作するサーバーのことを、Node と呼びます。Node は Cluster に含まれ、データを保存し、Cluster のインデキシング機能と検索機能に関係します。

**Cluster**

協調して動作する Node のグループのことを Cluster と呼びます。Cluster はすべての Node にわたって統合したインデキシング機能と検索機能を提供します。

**Index**

Elasticsearch 内の Document の集合のような概念です。Elasticsearch の Index には名前が割り当てられ、この名前を参照して、Document に対するインデキシング、検索、更新、削除の操作を実行します。

**Shard**

Shard は、Elasticsearch の Document の集合を複数の Node で水平分散して管理することで下記の課題を解決します。Elasticsearch の Index は複数の Shard から構成され、Index の作成時に 少なくとも1つの Shard が作成されます。

- **Elasticsearch の Index に、単一 Node のディスク容量を超えるデータを格納したい**

時系列データやログデータなどの非常に大きなデー[タセット](http://d.hatena.ne.jp/keyword/%A5%BF%A5%BB%A5%C3%A5%C8)を扱う場合、ひとつの Node が持つストレージ容量よりも格納したいデータのサイズが大きくなることがあります。複数の Node を用いて Cluster を組み、Shard を各Node に分散配置することで、複数のストレージを前提とした Index の作成ができます。

- **単一 Nodeでは検索リク**[**エス**](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)**トに応えるための処理速度が不足する**

Cluster 内に分散配置された Shard を用いて Index を構築することで、クエリ実行時に演算処理を並列化することができます。

### 検索システムの課題

LegalForce キャビネの検索システム(version1)では、1テナントあたりに1つの Index を割り当てる Index 設計としていました。しかし、1テナントあたりに1つのIndexを割り当てると、テナント数に比例してShardが増えていきます。NodeあたりのShardが増えすぎると、以下の問題が発生します。

- Node あたりの 最大 Shard 数のソフトリミットを超える可能性がある。新規 Node の追加やソフトリミットを変更しない場合、新規テナントの追加が出来なくなる。
- オーバーシャーディングのリスクがある。Cluster 内に Shard が多すぎる状態が、オーバーシャーディングであり、検索の応答効率の低下や Cluster が不安定になる可能性がある。

これら問題を解消するために、テナント数によらず、Nodeあたりの Shard の数を一定以下に保つ Index 設計が必要となりました。そこで、すべてのテナントに関する Elasticsearch の Document を1つの Index で管理するように Index 設計を見直し、検索システム(version2) の開発に取り組みました。

### Nodeあたりの最大 Shard 数のソフトリミット

Elasticsearch の Node が持つことができる 最大 Shard 数のソフトリミットのデフォルト値が1000になります。[(*1)](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-cluster.html#cluster-max-shards-per-node) 例えば、1つの Node で構成される Clusterで、1000社以上のテナントが存在する場合、テナントが独自に持つIndexごとに少なくとも1つの Shard が生成される設計であるため、Shard 数が1000を超えてしまうことになります。

Shard 数がソフトリミットを迎えた場合、Elasticsearch の Index の作成を試みたタイミングでエラーが生じるようになります。例えば、下記のようなエラーが生じ、Elasticsearch の Index 作成に失敗します。このエラーでは、Shard 数の上限値である1000に対し、991個の Shard が存在している前提のもとで、そこから10個の Shard を確保しようとして Index の作成に失敗しています。

```plain text
Validation Failed: 1: this action would add [10] total shards, but this cluster currently has [991]/[1000] maximum shards open;
```

### ソフトリミットの設定値変更による延命措置

検索システム(version2) の開発期間中も、現行の検索システム(version1)でサービスを運用し続ける必要があります。検索システム(version2) のリリース前に、新規テナントが現行の検索システムに追加不可能になる事態は避けなければなりません。

このような事態を防ぐため、Node あたりの 最大 Shard 数のソフトリミットを1000から2000に上げる調整をすることで時間稼ぎをしました。また、Cluster への Node 追加による延命措置の手段もありますが、運用コストの節約のため、ソフトリミットの設定値変更という手段を取りました。導入社数の増加ペースや営業部隊の増員計画などから、変更後の設定値については、リリース時に導入社数が1000社以上になる可能性はあるが、2000社以内に収まることが予想できていました。このため、運用面で安全と思われる値として2000を設定することになりました。

Elasticsearch の [cluster.max_shards_per_node](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-cluster.html#cluster-max-shards-per-node) の値を [cluster update settings API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cluster-update-settings.html) を用いて変えることで、Node あたりの 最大 Shard 数のソフトリミットを変更することができます。

ただし、デフォルト値を大きく超えるような値を設定することは、多くの Shard を生成することに繋がります。多量の Shard の存在は、オーバーヘッドの増加に繋がるため注意が必要です。[(*2)](https://www.elastic.co/jp/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster) また、 長期的な解決策として Cluster への Node の追加や、Shard 数を減らすことが推奨されています。[(*3)](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/size-your-shards.html#troubleshoot-shard-related-errors)

### 単一の Index 設計への変更

前述した課題の解決のため、検索システム(version2) では、テナント数によらず、Node あたりの Shard の数を一定以下に保つことを目的とし、テナントごとに Elasticsearch の Index を生成する検索システム(version1)の設計から、すべてのテナントに関する Elasticsearch の Document を1つの Index で管理する設計に変更しました。

LegalForceキャビネにおける、テナントごとに Elasticsearch の Index を生成する設計では、テナント毎に格納されるドキュメント数は異なり、小さなデータを持つ Shard から、大きなデータを持つ Shard が存在します。下記の図のように、各テナントの Elasticsearch の Index が持つ Primary Shard のデータ量を大きい順にプロットしてみると、[ロングテール](http://d.hatena.ne.jp/keyword/%A5%ED%A5%F3%A5%B0%A5%C6%A1%BC%A5%EB)な曲線が得られます。これより、少数のテナントが大きなデータを持ち、多くのテナントが比較的小さなデータを持つような傾向が分かります。8割ほどの Shard が 300MB 以下のデータサイズであり、小さなデータサイズの Shard が多数存在していました。

![[20221222114535.png]]

一方、単一 Index の設計では、Shardの総数を制御できます。例えば、検索システム(version1) では、Node あたり600個ほどの Shard を確保していましたが、検索システム(version2) では、160個の Shard で済むようになりました。Elasticsearch 7.17 では、 [Java](http://d.hatena.ne.jp/keyword/Java) Heap Size 1GB あたり、20個以下の Shard を確保することが推奨されており[(*4)](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/size-your-shards.html#shard-count-recommendation)(注2)、[Java](http://d.hatena.ne.jp/keyword/Java) Heap Size が 8GB である Node を使用しているため、Node あたり 160個の Shard を確保しています。

(注2) Elasticsearch 8.3 より、「ヒープメモリ1GBあたり20個以下の Shard の確保」を目安とする方針は非推奨となりました。Shard あたりのヒープ使用量が大幅に減少したためです。新しい方針は、[文献(*2)](https://www.elastic.co/jp/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster)に記載されていますので、興味のある方は確認してみてください。

なお、Elasticsearch の Document へのアクセスは、テナントごとに定義されている識別子での絞り込みを常に行うことで、異なるテナントの Document へのアクセスを防止するように検索システム(version2) を設計しています。さらに、Document の保存と検索時に [routing](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-shard-routing.html) を指定することで、テナントごとに用いる Shard を限定するようにしています。これにより、多数のShardを横断して検索するオーバーヘッドを避け，検索を高速化するメリットが得られます。[(*5)](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-shard-routing.html)

### まとめ

今回は、検索システム(version2)の開発に至った課題と改善点について紹介しました。もとはテナントごとに Elasticsearch の Index を作成する設計としていましたが、小さなデータサイズの Shard が多く存在することで、オーバーシャーディングのリスクや、新規テナント追加機能の不全という運用上のリスクが生じました。これら課題に対し、単一の Index に対して複数のテナントの Elasticsearch の Document を管理する設計への変更を行い、Shard の数を固定することにより、運用上の課題を回避しました。今後、マルチテナンシーを前提とした検索システムの設計や、リプレイスをするときの参考になれば幸いです。

**メンバー募集中!!**

株式会社 LegalOn Technologies では、SREや、バックエンドエンジニア、検索システムの開発に興味のある[インターン](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%F3)生を募集しています。気軽にご応募ください！

[ZST-03 Engineering Internship, Search](https://herp.careers/v1/legalforce/RUb2p6Z7XQzt)

[TECH-201- SRE / Site Reliability Engineer](https://herp.careers/v1/legalforce/3vMaOuULOPJm)

[TECH-101- Software Engineer, Back-end, LegalForce](https://herp.careers/v1/legalforce/m99JQNXyP-iG)

[TECH-102- Software Engineer, Back-end, LegalForce Cabinet](https://herp.careers/v1/legalforce/eiIEOqhD8PVg)

[TECH-MI-102- Software Engineer, LegalOn Technologies Research](https://herp.careers/v1/legalforce/NvglWz03nzzf)

**参考：**

(*1) Elastic Docs> Elasticsearch Guide [7.17]> Set up Elasticsearch> Configuring Elasticsearch, Cluster-level shard allocation and routing settings, cluster-max-shards-per-node[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-cluster.html#cluster-max-shards-per-node](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-cluster.html#cluster-max-shards-per-node)

(*2) How many shards should I have in my Elasticsearch cluster[https://www.elastic.co/jp/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster](https://www.elastic.co/jp/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster)

(*3) Elastic Docs > Elasticsearch Guide [7.17] > How to, Size your shards, Troubleshoot shard-related errors[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/size-your-shards.html#troubleshoot-shard-related-errors](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/size-your-shards.html#troubleshoot-shard-related-errors)

(*4) Elastic Docs > Elasticsearch Guide [7.17] > How to Size your shards, Aim for 20 shards or fewer per GB of heap memory[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/size-your-shards.html#shard-count-recommendation](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/size-your-shards.html#shard-count-recommendation)

(*5) Elastic Docs > Elasticsearch Guide [7.17] > Search your data, Search shard routing[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-shard-routing.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-shard-routing.html)

※ 本稿で紹介している内容はあくまで参考情報です。実際の場面では、自社の法務担当者や弁護士等の専門家に相談ください。

LegalForceの開発本部長（肩書が固いですが、プロダクトマネジャーをやっています）川戸（ [@kawato_takashi](https://twitter.com/kawato_takashi) ）です。

今回は外部サービスを利用する場合の特にビジネス観点からの留意点を解説します。外部サービスとは、ここでは一般に[オープンソース](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D7%A5%F3%A5%BD%A1%BC%A5%B9)で提供されているライブラリ等ではなく、商用で提供されているサービスを想定しています。[OSS](http://d.hatena.ne.jp/keyword/OSS)の場合には[GNU](http://d.hatena.ne.jp/keyword/GNU)-[GPL](http://d.hatena.ne.jp/keyword/GPL), MIT Licenseなど一般的なライセンスを中心に標準化が進んでいるのに対し、商用ソフトウェアの[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)は会社やサービスごとにスタンスも文言も様々です。

日々複雑化・高度化するソフトウェア開発の世界において、全てを自前で開発することは不可能であり、適切な外部サービスを選定・調達することはソフトウェア開発者にとって必須の知見となっていると考えられます。

サービスを判断する基準として[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)（英文の場合「Term of Service」「Master Service Agreement」等）は重要です。特に弊社はリーガルテック領域という法律に関する分野で製品を開発していることから、開発者も[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)を読み込む傾向があります。

そこで本稿では、ある程度のサービス導入などの意思決定に携わるエンジニアを念頭に、私自身の限られた経験から特に重要と思われる点をご紹介します。

- [説明の方針](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E8%AA%AC%E6%98%8E%E3%81%AE%E6%96%B9%E9%87%9D)
- [そのサービスを何に使うのか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%81%9D%E3%81%AE%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%82%92%E4%BD%95%E3%81%AB%E4%BD%BF%E3%81%86%E3%81%AE%E3%81%8B)
    - [顧客データの処理に用いるか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E9%A1%A7%E5%AE%A2%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%87%A6%E7%90%86%E3%81%AB%E7%94%A8%E3%81%84%E3%82%8B%E3%81%8B)
    - [競争上の問題はないか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E7%AB%B6%E4%BA%89%E4%B8%8A%E3%81%AE%E5%95%8F%E9%A1%8C%E3%81%AF%E3%81%AA%E3%81%84%E3%81%8B)
    - [禁止されているユースケースではないか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E7%A6%81%E6%AD%A2%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%83%A6%E3%83%BC%E3%82%B9%E3%82%B1%E3%83%BC%E3%82%B9%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%8B)
- [ベンダーは何を約束しているか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%83%99%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AF%E4%BD%95%E3%82%92%E7%B4%84%E6%9D%9F%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B)
    - [サービスレベルに問題はないか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%83%AC%E3%83%99%E3%83%AB%E3%81%AB%E5%95%8F%E9%A1%8C%E3%81%AF%E3%81%AA%E3%81%84%E3%81%8B)
    - [サービスの提供について保証があるか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E6%8F%90%E4%BE%9B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E4%BF%9D%E8%A8%BC%E3%81%8C%E3%81%82%E3%82%8B%E3%81%8B)
    - [責任分界点はどこか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E8%B2%AC%E4%BB%BB%E5%88%86%E7%95%8C%E7%82%B9%E3%81%AF%E3%81%A9%E3%81%93%E3%81%8B)
    - [他者の知財を侵害する可能性がないか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E4%BB%96%E8%80%85%E3%81%AE%E7%9F%A5%E8%B2%A1%E3%82%92%E4%BE%B5%E5%AE%B3%E3%81%99%E3%82%8B%E5%8F%AF%E8%83%BD%E6%80%A7%E3%81%8C%E3%81%AA%E3%81%84%E3%81%8B)
    - [データの取り扱いは適切か](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%8F%96%E3%82%8A%E6%89%B1%E3%81%84%E3%81%AF%E9%81%A9%E5%88%87%E3%81%8B)
        - [データはどこに保存されるか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AF%E3%81%A9%E3%81%93%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%95%E3%82%8C%E3%82%8B%E3%81%8B)
        - [ベンダーはデータをどの目的で利用するか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%83%99%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AF%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E3%81%A9%E3%81%AE%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%8B)
- [契約としての基本要素が揃っているか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E5%A5%91%E7%B4%84%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AE%E5%9F%BA%E6%9C%AC%E8%A6%81%E7%B4%A0%E3%81%8C%E6%8F%83%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B)
    - [解約条件や手続きは明確か](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E8%A7%A3%E7%B4%84%E6%9D%A1%E4%BB%B6%E3%82%84%E6%89%8B%E7%B6%9A%E3%81%8D%E3%81%AF%E6%98%8E%E7%A2%BA%E3%81%8B)
    - [一般条項は整備されているか](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E4%B8%80%E8%88%AC%E6%9D%A1%E9%A0%85%E3%81%AF%E6%95%B4%E5%82%99%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B)
- [まとめ](https://tech.legalforce.co.jp/entry/2022/09/28/163324#%E3%81%BE%E3%81%A8%E3%82%81)

# 説明の方針

大きく3つに分けて下記の順番で説明します。

- そのサービスを何に使うのか
- ベンダーは何を約束しているか
- 契約としての基本要素が揃っているか

まずサービスを利用する目的を明確にすることが重要です。使い方によって発生する問題や想定されるリスクは異なるからです。

続いてベンダーが約束している内容を確認します。[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)ではベンダーと利用者のそれぞれの権利と義務が記載されています。つまり[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)に記載されている内容が実際にベンダーが利用者に「約束」している内容です。ベンダーはこれを不特定多数の利用者に向けて約束しているので実際に何が問題かは個別の利用者の状況に依存します。

自社サービスで外部サービスを利用する場合に重要なのは顧客に自社が提供しているサービスや、その条件（多くの場合は自社の[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)で整理されている）との整合性です。ベンダーの[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)を読み解くにはそもそも自社の[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)を熟知していなければなりません。本稿では一般的な[B2B](http://d.hatena.ne.jp/keyword/B2B) [SaaS](http://d.hatena.ne.jp/keyword/SaaS)の[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)（というか、実際にはLegalForceの[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)）を念頭に解説します。読者は自社の[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)を参照しながら本稿の必要部分を参照することを推奨します。

最後に契約としての基本要素が揃っているかを確認します。契約ではトラブルがあった場合の対応や、取引を終了する場合の条件なども整理しておく必要があります。

# そのサービスを何に使うのか

何のために使うのか、は一番重要な部分です。現時点で想定している[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)だけではなく、将来的なロードマップも含めて検討するべきです。法務部門等に相談する場合も、こういった利用目的の部分を明確にして相談をすることで、スムーズな議論や、建設的な提案が得られる場合が多いと思われます。特に[B2B](http://d.hatena.ne.jp/keyword/B2B) [SaaS](http://d.hatena.ne.jp/keyword/SaaS)を想定すると、典型的に問題になるのは顧客データの処理に用いるか、そして競業避止義務等に抵触しないか、です。

## 顧客データの処理に用いるか

- 関連する規定: データ等の取り扱い（英: Protection of Data 等（以下、英文の場合にはたとえばどのようなタイトルの条文に含まれることがあるかを括弧書きで例示しますが、全く違う表記であることもありえます。あくまで参考情報としてご利用ください。また本稿では米国の法令等を踏まえた解説はしておりません。この点もご了承ください。））

たとえば認証・認可プラットフォームや[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)インフラなどを利用する場合、自社データを外部サービスに渡し、場合によっては当該サービス上で保存する必要があります。

この場合に外部サービスに渡すデータに顧客データ（顧客がサービス上で入力した情報や、顧客のサービス利用ログ等）が含まれるか、そして適切に取り扱われるかが大きな論点になります。顧客データが含まれる場合、自社の顧客に対する[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)との整合性を検討する必要があります。この点は「データ」という項を別途立てて詳述します。

## 競争上の問題はないか

- 関連する規定: 禁止事項（英: Responsibility and Restrictions 等）

将来的に自社で機能開発を行う予定で、短期的に外部サービスを利用したい、というケースもありえます。そのような場合、**禁止事項**等を確認する必要があります。

サービスによっては、競合する製品を開発する目的でのアクセスを明示的に禁止している場合もあります。どこから「競合」になるかは難しいところですが、コアとなる機能で利用を検討する場合には想定するロードマップも含めて法務部門や、外部の弁護士に相談する方が適切でしょう。

会社のスタンスにもよりますが、事前にベンダーに利用意図を伝えたうえで問題がないかを確認することが望ましいです。

## 禁止されている[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)ではないか

- 関連する規定: 禁止事項（英: Responsibility and Restrictions 等）

禁止事項では競争上の問題に加えて、特定の業界や使用方法を禁止しているケースがあります。

例えば[CDN](http://d.hatena.ne.jp/keyword/CDN)サービスの中にはポルノ利用を禁止しているものがあります。またDDoSに当たる行為や[スクレイピング](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EC%A5%A4%A5%D4%A5%F3%A5%B0)を禁止しているサービスもあります。

自社の想定している使い方が禁止事項に該当しないかは利用開始前に確認が必要です。不安がある場合にはこれもベンダーに相談する方が望ましいです。

# ベンダーは何を約束しているか

[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)はベンダーの顧客に対する「約束」です。何が約束されているのかを注意して読み解き、自社でサービスを導入して利用するに際して支障が生じないかを確認することが必要です。

## サービスレベルに問題はないか

- 関連する規定: サービスレベル （英: Availability 等）

利用できなくなった場合の影響がどの程度なのか、にもよります。たとえば認証基盤サービスが落ちた場合、自社サービスの提供は困難になります。

特に重要なサービスを外部から利用する場合には、サービスレベルは確認するべきです。ただし返金等は多くの場合、事業上意味がある金額にはならないので想定されている可用性の数値が何%かや、直近1年間の障害実績等を確認する形になるでしょう。サービスによってはヘルス[ダッシュ](http://d.hatena.ne.jp/keyword/%A5%C0%A5%C3%A5%B7%A5%E5)ボードを公開しているサービスもあり、過去の障害情報を参照することができます。

自社が顧客に対してサービスレベルを約束している場合には、特にこの点の整合性は重要です。

## サービスの提供について保証があるか

- 関連する規定: 保証（英: Warranty 等）

サービスレベルに関する規定がない場合は特にですが、「本サービスは現状有姿で提供され…正確性、信頼性その他一切の保証を行なわない（The Service is provided AS IS without any warranty…）」といった記載がある場合には注意が必要です。

## [責任分界点](http://d.hatena.ne.jp/keyword/%C0%D5%C7%A4%CA%AC%B3%A6%C5%C0)はどこか

- 関連する規定: 顧客の責任（英: Customer Responsibilities 等）

サービスを利用する上でベンダーが責任を負う範囲と、顧客（自社）が責任を負う範囲とを、利用開始前に明確にすることが重要です。[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)の規定に加えて、各社のセキュリティホワイトペーパーや責任共有モデルに関する説明資料等を参照することが適切です。

## 他者の[知財](http://d.hatena.ne.jp/keyword/%C3%CE%BA%E2)を侵害する可能性がないか

- 関連する規定: 保証（英: Warranty 等）

特に海外サービスの場合には「infringement」というキーワードで検索すると見つけられるケースが多いですが、他者の[知財](http://d.hatena.ne.jp/keyword/%C3%CE%BA%E2)を侵害する可能性を規約で排除しているかは重要です。

たとえば画期的なサービスと同様のサービスが安く使える、という場合にはこの[知財](http://d.hatena.ne.jp/keyword/%C3%CE%BA%E2)の問題が発生しえます。自社が[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)においてこういった特許侵害等に関する規定を設けている場合にはこの点は重要です。外部サービスによる第[三者](http://d.hatena.ne.jp/keyword/%BB%B0%BC%D4)の特許侵害によって自社が顧客に対する義務に違反してしまう可能性があるからです。

もちろん規約があっても権利者から訴訟が提起されるなど、侵害に関して紛争が生じる可能性はあります侵害に関する訴訟が提起される可能性はあります。しかし少なくともベンダー側にこの点について自身の責任を認めているかはトラブルが発生した場合の対応方針に大きな違いになります。ベンダーが自身の責任を否定している場合、ベンダーの責任を追及することはできないからです。

## データの取り扱いは適切か

### データはどこに保存されるか

- 関連する規定: データ等の取り扱い（英: Protection of Data 等）

ベンダーは自社のデータを保存するか、その場合に場所はどこになるかを検討する必要があります。国内でサービス展開をしている場合、特に日本国内かどうかが重要になります。たとえば[個人情報保護法](http://d.hatena.ne.jp/keyword/%B8%C4%BF%CD%BE%F0%CA%F3%CA%DD%B8%EE%CB%A1)では、越境移転が規制されています。

たとえば自社の[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)インフラ上で建てられるサービスを利用する場合、問題は小さくなります。これに対してベンダーが独自に運営しているサービスを[API](http://d.hatena.ne.jp/keyword/API)等を通じて利用する場合には保存先に関する問題は大きくなります。

特に顧客データを保存する場合にはこの論点は非常に重要です。別途同意の取得を行うなどする必要が発生するでしょう。この問題は直接に顧客が製品上に入力したデータを扱う場合だけではなく、たとえば検索をパーソナライズするためにログを利用する、といった場合にも発生しえます。

### ベンダーはデータをどの目的で利用するか

- 関連する規定: データ等の取り扱い（英: Protection of Data 等） / 秘密保持（英: Confidentiality 等）

ベンダーは自社のデータを保存する場合に、これをサービス提供以外の目的で利用する可能性があるかは注意が必要です。可能性がある場合には、それが自社の[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)や、[個人情報保護法](http://d.hatena.ne.jp/keyword/%B8%C4%BF%CD%BE%F0%CA%F3%CA%DD%B8%EE%CB%A1)などの関連法令との関係で追加の同意取得等が必要がないかなど、検討が必要になります。

# 契約としての基本要素が揃っているか

## 解約条件や手続きは明確か

- 関連する規定: 解約（英: Termination 等） / 有効期間（英: Term 等）

通常、[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)には契約期間や更新の条件（通常ソフトウェアのライセンス契約は本契約の場合は放っておけば更新されます）が記載されています。多くの場合はXX日前までに連絡することで更新を拒絶できる、とされていますので、このスケジュールは確認しておくことが望ましいです。

定額かつ年契約のライセンスの場合、解約を忘れると数十~数百万円の支出になる場合もあります。

## 一般条項は整備されているか

- 関連する規定: 反社会的勢力の排除（英文該当なし） / 準拠法（英: Goverinig Law; 日本語の場合は記載がない場合も多い） / 合意管轄（英: [Jurisdiction](http://d.hatena.ne.jp/keyword/Jurisdiction) 等） / 秘密保持義務（英: Confidentiality 等） / 不可抗力（英: Force Majeure 等） 等

提供しているサービスの[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)の記載内容が、外形的に明らかに不十分な場合（たとえば国内で運営しているにも関わらず反社会的勢力排除や合意管轄、秘密保持、不可抗力等に関する条項がないなど）は、[コンプライアンス](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D7%A5%E9%A5%A4%A5%A2%A5%F3%A5%B9)体制が不十分である可能性が疑われます。

規約の内容以外では提供元がISO/IEC 27001などの認証を取得しているかも指標になります。この点は自社のセキュリティ部門などと連携して、チェックリスト（そう、セキュリティチェックリストです…）を作成し、記入を依頼するといったアプローチが考えられます。なお、大きなベンダーになるとセキュリティホワイトペーパー等を提供しているケースもありますので、まずはそれを読んで確認する、でもよいでしょう。

# まとめ

本稿では特に問題になりやすい点を中心に外部サービス選定のポイントを[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)を中心にまとめました。規約は長く、細かい字で書かれているため、読みづらいと思ってしまうことも多いと思います。しかし開発チームのリーダーであればオーナーシップを持って理解する必要がある論点が多数埋め込まれています。

[利用規約](http://d.hatena.ne.jp/keyword/%CD%F8%CD%D1%B5%AC%CC%F3)は法的な拘束力を持つ「契約」であり、ビジネスはこうした契約の連鎖として成立しています。今日の話では法律の専門家だけでは知りえない、サービス運営の実態に関する情報が規約や契約の解釈では必要であることも理解いただけたと期待しています。契約は法律家に任せておけば安心！というものではありません。繰り返しますが、開発者がオーナーシップを持って議論をリードする必要があるのです。

株式会社LegalForceではこうした法務や契約の業務を支援するプロダクトを開発・運営しています。また日々上記のような点を議論しながら仕事をしています。これを読んで契約面白い（かも）と思っていただいた方、ぜひ一度お話ししてみませんか？

ということでまたどこかでお会いしましょう！

こんにちは。LegalForce Researchで研究員をしている神田 ([@kampersanda](https://twitter.com/kampersanda)) です。

LegalForce Researchでは、[MeCab](http://d.hatena.ne.jp/keyword/MeCab)互換の[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器Vibrato（ヴィブラ〰ト）を開発しています。[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)Rustで実装しており、高速に動作することが主な利点です。Vibratoは[オープンソース](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D7%A5%F3%A5%BD%A1%BC%A5%B9)ソフトウェアとして以下のレポジトリで公開しています。

## [GitHub - daac-tools/vibrato: 🎤 vibrato: Viterbi-based accelerated tokenizer](https://github.com/daac-tools/vibrato)

🎤 vibrato: Viterbi-based accelerated tokenizer. Contribute to daac-tools/vibrato development by creating an account on GitHub.

[github.com](https://github.com/daac-tools/vibrato)

[github.com](https://github.com/daac-tools/vibrato)

本記事では、Vibratoの技術仕様を解説します。以下のような方を読者として想定します。

- [自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)の要素技術に興味のある方
- データ構造・[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)に興味のある方
- Rustでの[自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)に興味がある方
- [Vibratoについて](https://tech.legalforce.co.jp/entry/2022/09/20/133132#Vibrato%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [最小コスト法による形態素解析](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E6%9C%80%E5%B0%8F%E3%82%B3%E3%82%B9%E3%83%88%E6%B3%95%E3%81%AB%E3%82%88%E3%82%8B%E5%BD%A2%E6%85%8B%E7%B4%A0%E8%A7%A3%E6%9E%90)
    - [単語ラティスの構築](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E5%8D%98%E8%AA%9E%E3%83%A9%E3%83%86%E3%82%A3%E3%82%B9%E3%81%AE%E6%A7%8B%E7%AF%89)
    - [最小コスト経路の計算](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E6%9C%80%E5%B0%8F%E3%82%B3%E3%82%B9%E3%83%88%E7%B5%8C%E8%B7%AF%E3%81%AE%E8%A8%88%E7%AE%97)
- [高速化の取り組み](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E9%AB%98%E9%80%9F%E5%8C%96%E3%81%AE%E5%8F%96%E3%82%8A%E7%B5%84%E3%81%BF)
    - [辞書引きのキャッシュ効率化](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E8%BE%9E%E6%9B%B8%E5%BC%95%E3%81%8D%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E5%8A%B9%E7%8E%87%E5%8C%96)
        - [実装での注意点](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E5%AE%9F%E8%A3%85%E3%81%A7%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)
    - [連接コスト参照のキャッシュ効率化](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E9%80%A3%E6%8E%A5%E3%82%B3%E3%82%B9%E3%83%88%E5%8F%82%E7%85%A7%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E5%8A%B9%E7%8E%87%E5%8C%96)
        - [事前知識](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E4%BA%8B%E5%89%8D%E7%9F%A5%E8%AD%98)
        - [連接表のボトルネック](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E9%80%A3%E6%8E%A5%E8%A1%A8%E3%81%AE%E3%83%9C%E3%83%88%E3%83%AB%E3%83%8D%E3%83%83%E3%82%AF)
        - [改善のアイディア](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E6%94%B9%E5%96%84%E3%81%AE%E3%82%A2%E3%82%A4%E3%83%87%E3%82%A3%E3%82%A2)
- [実験的評価](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E5%AE%9F%E9%A8%93%E7%9A%84%E8%A9%95%E4%BE%A1)
    - [実験設定](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E5%AE%9F%E9%A8%93%E8%A8%AD%E5%AE%9A)
    - [辞書引きのキャッシュ効率化についての評価](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E8%BE%9E%E6%9B%B8%E5%BC%95%E3%81%8D%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E5%8A%B9%E7%8E%87%E5%8C%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E8%A9%95%E4%BE%A1)
    - [連接コスト参照のキャッシュ効率化についての評価](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E9%80%A3%E6%8E%A5%E3%82%B3%E3%82%B9%E3%83%88%E5%8F%82%E7%85%A7%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E5%8A%B9%E7%8E%87%E5%8C%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E8%A9%95%E4%BE%A1)
        - [文脈ID使用頻度の偏り](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E6%96%87%E8%84%88ID%E4%BD%BF%E7%94%A8%E9%A0%BB%E5%BA%A6%E3%81%AE%E5%81%8F%E3%82%8A)
        - [ボトルネックの調査](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E3%83%9C%E3%83%88%E3%83%AB%E3%83%8D%E3%83%83%E3%82%AF%E3%81%AE%E8%AA%BF%E6%9F%BB)
        - [頻度順IDマッピングの評価](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E9%A0%BB%E5%BA%A6%E9%A0%86ID%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%AE%E8%A9%95%E4%BE%A1)
        - [訓練データに関する調査](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E8%A8%93%E7%B7%B4%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E8%AA%BF%E6%9F%BB)
    - [主結果：キャッシュ効率化による変化率](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E4%B8%BB%E7%B5%90%E6%9E%9C%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E5%8A%B9%E7%8E%87%E5%8C%96%E3%81%AB%E3%82%88%E3%82%8B%E5%A4%89%E5%8C%96%E7%8E%87)
    - [他の形態素解析器との比較](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E4%BB%96%E3%81%AE%E5%BD%A2%E6%85%8B%E7%B4%A0%E8%A7%A3%E6%9E%90%E5%99%A8%E3%81%A8%E3%81%AE%E6%AF%94%E8%BC%83)
        - [比較手法](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E6%AF%94%E8%BC%83%E6%89%8B%E6%B3%95)
        - [実験結果](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E5%AE%9F%E9%A8%93%E7%B5%90%E6%9E%9C)
- [開発の経緯・展望](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E9%96%8B%E7%99%BA%E3%81%AE%E7%B5%8C%E7%B7%AF%E5%B1%95%E6%9C%9B)
- [まとめ](https://tech.legalforce.co.jp/entry/2022/09/20/133132#%E3%81%BE%E3%81%A8%E3%82%81)

# Vibratoについて

まずはじめにVibratoの簡単な紹介をします。

Vibratoは高速な[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)を提供するRust製ライブラリです。日本語における[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)とは、文を単語の単位に分割し、品詞や活用形を求める一連の処理です。例えば、Vibratoで「本とカレーの街神保町へようこそ。」という文を解析すると、以下のような単語列を予測します。

```plain text
本  名詞,一般,*,*,*,*,本,ホン,ホン
と 助詞,並立助詞,*,*,*,*,と,ト,ト
カレー   名詞,固有名詞,地域,一般,*,*,カレー,カレー,カレー
の 助詞,連体化,*,*,*,*,の,ノ,ノ
街 名詞,一般,*,*,*,*,街,マチ,マチ
神保  名詞,固有名詞,地域,一般,*,*,神保,ジンボウ,ジンボー
町 名詞,接尾,地域,*,*,*,町,マチ,マチ
へ 助詞,格助詞,一般,*,*,*,へ,ヘ,エ
ようこそ    感動詞,*,*,*,*,*,ようこそ,ヨウコソ,ヨーコソ
。 記号,句点,*,*,*,*,。,。,。
```

このような操作を提供するソフトウェアを一般に[**形態素解析**](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)**器**といいます。[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器は、[MeCab](http://d.hatena.ne.jp/keyword/MeCab)やKuromoji、Sudachiなど、[オープンソース](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D7%A5%F3%A5%BD%A1%BC%A5%B9)ソフトウェアに限っても色々な実装が存在します。その中で、Vibratoは以下のような特徴を持ちます。

- [**MeCab**](http://d.hatena.ne.jp/keyword/MeCab)**互換:** VibratoはRustによる[MeCab](http://d.hatena.ne.jp/keyword/MeCab)の再実装です。[MeCab](http://d.hatena.ne.jp/keyword/MeCab)と同じ解析結果を返すので置き換え可能です。
[1](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:1)
[2](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:2)
- **高速解析:** 実装の簡略化や最適化により、[MeCab](http://d.hatena.ne.jp/keyword/MeCab)よりも高速に動作します。その技術詳細をこの記事で解説します。
- **Pure Rust:** Vibratoは[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)Rustのみを使って実装されているので、Rustプロダクトに自然に導入できます。例えば、Rust製[検索エンジン](http://d.hatena.ne.jp/keyword/%B8%A1%BA%F7%A5%A8%A5%F3%A5%B8%A5%F3)[Tantivy](https://github.com/quickwit-oss/tantivy)で使用可能な[tantivy-vibrato](https://github.com/akr4/tantivy-vibrato)が公開されています。

# 最小コスト法による[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)

Vibratoの[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)は**最小コスト法**[3](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:3)という[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)に基づきます。ここでは、技術解説の事前準備として最小コスト法を紹介します。

最小コスト法は、以下の2ステップにより解を得る[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)です。

23. 入力文に現れる単語をノードとしたグラフ構造（**単語ラティス**）を構築
24. 単語本体や単語の並びの出現しやすさを表したコストの和が最小となる経路を探索

例えば、以下の図は「元気になった」という入力文から構築された単語ラティスです。[4](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:4)

![[20220914212628.png]]

BOSとEOSは、文の先頭と末尾を表すダミーのノードです。単語に対応するノードと、単語の並びの対応するエッジにはそれぞれコストが割り当てられています。ノードのコストは**生起コスト**とよばれ、その単語の出現しやすさを表します。エッジのコストは**連接コスト**とよばれ、その単語の並びの出現しやすさを表します。

## 単語ラティスの構築

単語と品詞の情報やコスト値を格納した辞書を持っているとして、単語ラティスは以下のような手順で構築されます。

25. 入力文に現れる単語を列挙する（**辞書引き**）。
26. 単語をノードとして、文の位置について隣り合うノード同士をエッジで繋ぐ。

特に辞書引きが最も時間の掛かる処理です。辞書引きは複数パターン検索ともよばれ、**トライ木**を使って効率的に解くことができます。トライ木を用いた複数パターン検索については[過去の記事](https://tech.legalforce.co.jp/entry/2022/02/24/140316)で詳しく解説していますので、そちらをご参照ください。

## 最小コスト経路の計算

単語ラティスのBOSからEOSまでを繋ぐ、生起コストと連接コストの和が最小となる経路を探索します。そして、その経路に対応する単語系列を解として報告します。

最小コスト経路は、**ビタビ**[**アルゴリズム**](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)[5](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:5)を用いてエッジの数に線形の時間で計算できます。以下の例では、太線で示された経路が最もコストが最小となるので、この解は「元気/に/なっ/た」と判断されます。

![[20220914212741.png]]

ビタビ[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)やコストの学習については、[「形態素解析の理論と実装」（工藤拓, 2018）](https://www.kindaikagaku.co.jp/book_list/detail/9784764905771/)をご参照ください。

# 高速化の取り組み

最小コスト法は、辞書引きでのトライ木の探索、単語ラティスの探索など、何かとランダムアクセスが多くなりがちな[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)です。Vibratoでは、そのランダムアクセスによるキャッシュミスを緩和することを目的とし、参照の局所性を改善するような工夫を導入しています。[6](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:6)

## 辞書引きのキャッシュ効率化

1つ目は辞書引きのキャッシュ効率化についてです。

[MeCab](http://d.hatena.ne.jp/keyword/MeCab)をはじめとする多くの[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器では、辞書引きにダブル配列トライ[7](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:7)を採用しています。ダブル配列トライの代表的な実装としては、[MeCab](http://d.hatena.ne.jp/keyword/MeCab)で使用されている[Darts](http://chasen.org/~taku/software/darts/)、その改良である[Darts-clone](https://github.com/s-yata/darts-clone)、そのRust移植でありsudachi.rsやLinderaで使用されている[Yada](https://github.com/takuyaa/yada)などがあります。

一方Vibratoでは、**Crawdad**というダブル配列トライ辞書ライブラリを採用しています。

[github.com](https://github.com/daac-tools/crawdad)

Crawdadは日本語などのマルチバイト文字列の処理に特化した実装で、その他との違いは文字列の表現方法です。

Dartsなど多くのトライ実装では、文字列をそのデータ表現のバイト列として扱います。この方法は、文字列の[エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)に関わらずバイト列として処理することができるので、実装が容易で汎用的に利用できるという利点があります。

一方Crawdadでは、文字列をバイト単位ではなく[Unicode](http://d.hatena.ne.jp/keyword/Unicode)のコードポイント単位（**文字単位**）に分解し、コードポイント値の系列として扱います。この方法は、日本語などのマルチバイト文字を扱うときに、バイト列と比べ文字列長が短くなるという利点があります。トライの探索では文字列長に比例した回数のランダムアクセスが必要となるので、文字列長が短くなるのはキャッシュ効率に関して利点です。

単語「元気」と「活気」をトライで表現した例を以下に示します。上図が[UTF-8](http://d.hatena.ne.jp/keyword/UTF-8)符号をバイト列として表現した例、下図がコードポイント値の系列として表現した例です。

日本語の多くの文字は[UTF-8](http://d.hatena.ne.jp/keyword/UTF-8)で3バイトを使って表現されるので、上図では文字当たり3つの遷移が定義されています。一方で下図は文字当たり1つの遷移で済みます。このように、文字単位で遷移を定義すればランダムアクセスの回数を3分の1に削減できます。

### 実装での注意点

コードポイント値を使う場合、文字の種類数（アルファベットサイズ）が大きくなる点に注意する必要があります。バイト単位では `0x00` から `0xFF` までの高々256種類のラベルしか使いませんが、コードポイント値は `U+0000` から `U+10FFFF` までのおよそ110万種類のラベルを扱います。

アルファベットサイズが大きいダブル配列トライは、素朴に実装すると構築が低速化したりメモリ使用量が大きくなることが知られています。そこでCrawdadでは、文字の出現頻度の偏りを利用し、コード値を頻度順に割り当て直します。多くのコード値が小さい値になることで、これらの問題が緩和されることが経験的に知られています。[8](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:8)

## 連接コスト参照のキャッシュ効率化

2つ目は連接コスト参照のキャッシュ効率化についてです。

### 事前知識

改めて、連接コストとは単語ラティスのエッジに付随したコストです。左側ノードの素性情報と右側ノードの素性情報のペアによって決定されます。[9](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:9) 例えば、以下の連接コスト `2551` は「動詞」と「助動詞」のペアによって決定します。

より具体的には、素性には左文脈IDと右文脈IDが割り当てられ、それらIDのペアによって連接コストは決まります。ここで、左文脈IDはその単語の左側のエッジについてのID、右文脈IDはその単語の右側のエッジについてのIDです。

本記事では、左文脈IDの集合を X={0,1,…,|X|−1}、右文脈IDの集合を Y={0,1,…,|Y|−1} と定義し、文脈IDペア (x,y)∈X×Y の連接コストを C(x,y) と表記します。例えば、上の例を文脈IDを使って改めて書き直すと、以下のようになります。

連接コストは |X|×|Y| の**連接表**に保存され、文脈IDを使って参照されます。

単語ラティスの探索では、左文脈ID x を固定し、右文脈ID y についてループを回します。そのため、連接コスト値

C(x,0),C(x,1),…,C(x,|Y|−1)

がメモリ上で連続するように連接表を実装することで、参照の局所性が改善します。

例えば、以下のように右文脈ID y についてループを回す場合、青枠で囲まれた行がメモリ上で連続するように、行指向で連接表を実装すると参照の局所性が改善します。

### 連接表の[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)

行指向で連接表を実装しても、依然として文脈IDによる頻繁な連接表へのランダムアクセスは[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)です。これは連接表が大きい場合に顕著です。

例えば、[MeCab IPADIC v2.7.0](https://taku910.github.io/mecab/)では、|X|=|Y|=1316 で連接表のサイズは3.3 MiBです。この程度のサイズであれば、現代の計算機環境なら十分キャッシュに載りますので、ランダムアクセスはそこまで大きな[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)とはならないでしょう。

一方、[現代書き言葉UniDic v3.1.0](https://clrd.ninjal.ac.jp/unidic/back_number.html)では、|X|=15388,|Y|=15626 と非常に細かく素性が定義されていて、連接表のサイズは459 MiBにもなります。記事の後半で実験結果を示しますが、実際にこの巨大な連接表は重大な速度低下を引き起こします。

### 改善のアイディア

Vibratoの改善のアイディアはシンプルで、よく使われる文脈ID順に若いIDを割り当て直し、よく参照される連接コストがメモリ上で近接するように文脈IDを修正します。以降では、この再割り当てを**頻度順ID**[**マッピング**](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)とよびます。文脈IDの使用頻度に大きな偏りがある場合、頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)は参照の局所性を改善します。

例えば、ある左文脈ID xi について、いくつかの右文脈ID yj で連接コスト値を参照する様子を以下に示します。

![[20220914213627.png]]

標準の文脈IDを使用した場合、遠く離れたメモリを参照しキャッシュミスが発生します（上図）。しかし、これらの右文脈ID yj がよく使用されるものだった場合、頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)により連接コスト値が近接して配置されるので、参照の局所性が改善します（下図）。

Vibratoでは、訓練[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)を用いて左文脈ID xi と右文脈 yj のそれぞれの使用頻度を算出します。そして、その頻度の多い順に若いIDを割り当てます。

# 実験的評価

上記した高速化技法について、実験による結果を示します。

## 実験設定

実験に使用したマシン環境は以下の通りで、実験はすべてシングルスレッドで行いました。

- CPU: [Intel](http://d.hatena.ne.jp/keyword/Intel) [Core i9](http://d.hatena.ne.jp/keyword/Core%20i9)12900K (L3: 30MB, Cache-line: 64B, 16 Core, 3.2GHz-5.2GHz)
- RAM: 64GB (2×32GB, DDR5)
- OS: [Ubuntu](http://d.hatena.ne.jp/keyword/Ubuntu) 22.04

[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)用の辞書は、以下の4種類を評価しました。

- [mecab-ipadic](https://taku910.github.io/mecab/) (v2.7.0) 
    - 単語数: 392,126
    - 連接表: 1316×1316, 3.3 MiB
- [mecab-ipadic-neologd](https://github.com/neologd/mecab-ipadic-neologd) (2020-09-10) 
    - 単語数: 4,668,394
    - 連接表: 1316×1316, 3.3 MiB
- [unidic-mecab](https://clrd.ninjal.ac.jp/unidic/back_number.html) (v2.1.2) 
    - 単語数: 756,463
    - 連接表: 5981×5981, 68 MiB
- [unidic-cwj](https://clrd.ninjal.ac.jp/unidic/back_number.html) (v3.1.0) 
    - 単語数: 879,222
    - 連接表: 15388×15626, 459 MiB

テキスト[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)には[BCCWJ](https://clrd.ninjal.ac.jp/bccwj/) (v1.1)を使用しました。Vibratoの訓練にはコアデータ60,004文を用いました。[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)の実行速度の評価には、サブ[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)13カテゴリから各1万文ずつをランダムに抽出した計13万文を使用しました。[10](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:10)

Vibratoの解析時間を計測したコードは[ここ](https://github.com/daac-tools/vibrato/tree/main/benchmark)にあります。

## 辞書引きのキャッシュ効率化についての評価

バイト単位・文字単位のそれぞれのスキームでダブル配列トライを構築した場合の解析速度を比較します。以下のライブラリをそれぞれVibratoで使用し、評価データの解析に要した時間を計測しました。

- バイト単位: [Yada v0.5.0](https://github.com/takuyaa/yada)
- 文字単位: [Crawdad v0.3.0](https://github.com/daac-tools/crawdad)

頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)は適用していません。評価データ13万文の解析に要した時間を下の表に報告します。結果は10回試行した平均です。右端の列は「バイト単位」から「文字単位」への変化率を表します。[11](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fn:11)

| 辞書 | バイト単位 [ms] | 文字単位 [ms] | (変化率) |
| --- | --- | --- | --- |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic | 558 | 489 | −12.3% |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic-neologd | 739 | 649 | −12.1% |
| unidic-[mecab](http://d.hatena.ne.jp/keyword/mecab) | 839 | 749 | −10.6% |
| unidic-cwj | 1284 | 1210 | −5.8% |

すべてのケースで文字単位が高速です。unidic-cwjを除いて、10%以上の改善が見られます。一方で、unidic-cwjでは5.8%の改善に留まりました。巨大な連接表を持つunidic-cwjでは、辞書引きよりも連接コスト参照の方が[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)になることが原因です。

## 連接コスト参照のキャッシュ効率化についての評価

いくつかの段階に分けて、頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)の性能を評価します。ダブル配列トライは共通して文字単位を採用しています。

### 文脈ID使用頻度の偏り

まず、文脈IDの使用頻度に偏りがあるのかを調査します。各辞書について、訓練用テキストを解析したときの文脈IDの使用頻度を算出しました。

右文脈IDの使用頻度上位256件について、その割合を以下に示します。32件ずつの合計をプロットしています。（左文脈IDの結果も大きく変わらないので省略します。）

文脈IDの使用頻度には大きな偏りがあることがわかります。

例えば、文脈IDが1.5万種類も定義されているunidic-cwjにおいても、 上位32件が使用される割合は47%です。連接コスト値を2バイトで表現すると、64バイトのキャッシュラインには32個の値が載ります。これはつまり、頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)によって、おおよそ2回中1回は同じキャッシュラインを参照することを意味します。キャッシュ効率化による改善が期待できそうです。

### [ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)の調査

続いて、実際に連接表へのアクセスが[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)なのかを調査します。各辞書について、以下の2つの場合を比較します。

- 従来通り連接表にアクセスし、連接コストを用いて解析した場合
- 連接表へのアクセスを完全に除外し、連接コストはすべて0として解析した場合

連接コストが異なるので解析結果は変わりますが、定数時間の配列参照を取り除いただけなので**計算量は同じ**です。

評価データ13万文の解析に要した時間を以下に示します。結果は10回試行した平均です。右端の列は、「連接表有り」から「連接表無し」への変化率を示します。

| 辞書 | 連接表有り [ms] | 連接表無し [ms] | (変化率) |
| --- | --- | --- | --- |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic | 489 | 410 | −16.1% |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic-neologd | 649 | 548 | −15.5% |
| unidic-[mecab](http://d.hatena.ne.jp/keyword/mecab) | 749 | 509 | −32.0% |
| unidic-cwj | 1210 | 522 | −56.9% |

配列への参照を取り除いただけの簡単な修正でしたが、解析時間に大きな差が見られました。特にunidic-cwjでは57%も解析時間が短縮されています。辞書引きなど他の処理もある中で、巨大な連接表への参照がいかに[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)であるかが伺えます。

これらの結果は、頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)を適用した場合の変化率の下限になります。

### 頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)の評価

頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)を適用することにより、連接表の[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)が実際にどの程度解消されるかを調査します。以下がその結果です。前と同じく、結果は10回試行した平均です。右端の列は、「[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)無し」から「[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)有り」への変化率を示します。

| 辞書 | [マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)無し [ms] | [マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)有り [ms] | (変化率) |
| --- | --- | --- | --- |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic | 489 | 472 | −3.4% |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic-neologd | 649 | 623 | −4.0% |
| unidic-[mecab](http://d.hatena.ne.jp/keyword/mecab) | 749 | 658 | −12.2% |
| unidic-cwj | 1210 | 779 | −35.6% |

頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)により、unidic-cwjでの解析速度が36%も改善しました。この結果は、前述した分析結果に裏付けされています。一方で、連接表の小さなipadicでは大きな改善は確認されませんでした。

### 訓練データに関する調査

上記した実験結果は、BCCWJのコアデータ6万文、つまり均衡[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)を頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)の訓練に使用した場合のものです。ここでは、解析テキストの[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)に特化した訓練データを用いることで、頻度順ID[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)の性能が変わるのかを調査します。

評価用テキストのBCCWJサブ[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)は、[新聞（PN）や法律（OL）などの13カテゴリ](https://clrd.ninjal.ac.jp/bccwj/doc/manual/BCCWJ_Manual_02.pdf)から成ります。実験では、各カテゴリから1万文をランダムサンプリングし使用しています。各カテゴリについて、以下の2つの方法で[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)を訓練し、解析時間を比較しました。

- **均衡データ:** コアデータからサンプルした1万文で訓練
- **カテゴリ別:** 各カテゴリの評価用テキスト1万文について5分割交差検証

13カテゴリについて、評価データ1万文の解析に要した時間を以下に示します。使用した辞書はunidic-cwjです。数値は10回試行した平均です。

訓練データを[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)に特化しても、解析時間は大きく変化しないことがわかります。合計では、676ミリ秒から672ミリ秒へと改善していますが、その差は僅かです。

コアデータといくつかのサブ[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)で頻繁に使用された右文脈ID上位10件は以下の通りです。右文脈IDはunidic-cwjで定義されている標準のものです。

| ランク | コアデータ | 新聞 (PN) | 書籍 (LB) | [Yahoo!知恵袋](http://d.hatena.ne.jp/keyword/Yahoo%21%C3%CE%B7%C3%C2%DE) (OC) |
| --- | --- | --- | --- | --- |
| 1 | 850 | 850 | 850 | 850 |
| 2 | 6742 | 6742 | 6742 | 6742 |
| 3 | 9663 | 9663 | 9663 | 9663 |
| 4 | 11540 | 11540 | 11540 | 11540 |
| 5 | 14497 | 14497 | 14497 | 14497 |
| 6 | 2250 | 2250 | 2250 | 2250 |
| 7 | 11383 | 11383 | 11383 | 11383 |
| 8 | 6980 | 6980 | 14775 | 14775 |
| 9 | 12392 | 12392 | 12392 | 2410 |
| 10 | 14775 | 3917 | 2410 | 12392 |

上位7件まではどの[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)でも同一で、カテゴリによって使われるIDに大きな差は無いことがわかります。頻繁に使用されている右文脈IDに対応した素性列は以下のとおりです。

```plain text
850 名詞,普通名詞,サ変可能,*,*,*,*,*,*,*,*,*
6742 名詞,固有名詞,人名,一般,*,*,*,*,*,*,*,*
9663 名詞,固有名詞,地名,一般,*,*,*,*,*,*,*,*
11540 名詞,固有名詞,一般,*,*,*,*,*,*,*,*,*
14497 名詞,普通名詞,一般,*,*,*,*,*,*,*,*,*
2250 感動詞,一般,*,*,*,*,*,*,*,*,*,*
11383 名詞,普通名詞,一般,*,*,*,*,*,和,*,*,*,1,C3,*
6980 名詞,普通名詞,一般,*,*,*,*,*,漢,*,*,*,1,C3,*
12392 接尾辞,名詞的,一般,*,*,*,*,*,漢,*,*,*,*,C3,*
14775 副詞,*,*,*,*,*,*,*,和,*,*,*,1,*,*
3917 名詞,固有名詞,人名,名,*,*,*,*,固,*,*,*,1,*,*
2410 感動詞,一般,*,*,*,*,*,*,和,*,*,*,1,*,*
```

この結果から、頻繁に使用されているIDは品詞などのごく一部の情報によって識別可能な単語に割り当てられており、しかも、そのような単語は[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)を問わず[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)の大部分を占めているということが分かります。

これらの結果は、「幅広い[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)のテキストを解析するために、均衡データから訓練した[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)を一つ持っておけば十分である」ということを示唆しています。[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)適用済みの辞書を配布すればよいので、運用上ポジティブな結果と言えます。

## 主結果：キャッシュ効率化による変化率

改めて、本記事で提案した辞書引きと連接コスト参照のキャッシュ効率化による最終的な変化率を以下に示します。評価データ13万文の解析に要した時間です。

| 辞書 | 改善前 [ms] | 改善後 [ms] | (変化率) |
| --- | --- | --- | --- |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic | 558 | 472 | −15.3% |
| [mecab](http://d.hatena.ne.jp/keyword/mecab)-ipadic-neologd | 739 | 623 | −15.6% |
| unidic-[mecab](http://d.hatena.ne.jp/keyword/mecab) | 839 | 658 | −21.6% |
| unidic-cwj | 1284 | 779 | −39.3% |

## 他の[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器との比較

Vibrato (v0.1.2) と他の[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)との解析時間を比較します。

### 比較手法

Vibratoと同じ最小コスト法を使用したライブラリとして、以下の3種類を比較しました。

- [MeCab](https://taku910.github.io/mecab/) (2020-09-14)
- [Lindera](https://github.com/lindera-morphology/lindera) (v0.16.1)
- [sudachi.rs](https://github.com/WorksApplications/sudachi.rs) (v0.6.4-a1)

Vibratoと[MeCab](http://d.hatena.ne.jp/keyword/MeCab)は、辞書に[mecab-ipadic](https://taku910.github.io/mecab/) (v2.7.0)と[unidic-cwj](https://clrd.ninjal.ac.jp/unidic/back_number.html) (v3.1.0)を使用しました。Linderaは、ライブラリでサポートされている[lindera-ipadic](https://github.com/lindera-morphology/lindera/tree/main/lindera-ipadic)と[lindera-unidic](https://github.com/lindera-morphology/lindera/tree/main/lindera-unidic)の2種類を評価しました。sudachi.rsは、辞書に[SudachiDict-Core](https://github.com/WorksApplications/SudachiDict)を使用しました。Vibratoの訓練データには、引き続きBCCWJのコアデータ6万文を用いました。

点予測法を用いた単語分割器とも比較しました。使用したライブラリは以下の通りです。

- [Vaporetto](https://github.com/daac-tools/vaporetto) (v0.5.1)
- [KyTea](http://www.phontron.com/kytea/) (2020-04-03)
- [rust-tinysegmenter](https://github.com/woxtu/rust-tinysegmenter) (v0.1.1)

VaporettoとKyTeaは、[KyTea Models](http://www.phontron.com/kytea/model.html)で配布されている圧縮[SVM](http://d.hatena.ne.jp/keyword/SVM)モデル (jp-0.4.7-5) を使用しました。

最小コスト法と点予測法は[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)が異なり、提供する機能も違うので、あくまで[参考記録](http://d.hatena.ne.jp/keyword/%BB%B2%B9%CD%B5%AD%CF%BF)だという点にご留意ください。点予測法の詳細については、[過去の記事](https://tech.legalforce.co.jp/entry/2021/09/28/180844)をご参照ください。

### 実験結果

BCCWJサブ[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)13万文の解析に要した時間を以下に報告します。数値は100回試行した平均です。

最小コスト法ではVibratoが最速です。[MeCab](http://d.hatena.ne.jp/keyword/MeCab)と比較しても、2倍以上の速度性能が確認できます。

# 開発の経緯・展望

Vibratoを開発する以前は、既存のライブラリを修正することで高速化に貢献するつもりでした。[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器は社内外問わず至る所で使われているので、「高速化されたら少なからず誰かには喜ばれるだろう」と、筆者が思い立って個人的に着手したのが始まりです。しかし、作り込まれたライブラリに手を加えるのは中々に大変で、個々のアイディアを解析するのにも苦労しました。そこで、[フルスクラッチ](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EB%A5%B9%A5%AF%A5%E9%A5%C3%A5%C1)で最小構成の最小コスト法を実装し、それを通してアイディアと実験結果を提供する方針に切り替えました。結果として開発に至ったのがVibratoで、Vaporettoなどと同様に[daac-tools](https://github.com/daac-tools)以下で管理することにしました。

そういった経緯から、Vibratoはできる限り簡潔に実装することを心がけており、必要以上に機能を追加するつもりもありません。結果として、高い速度性能を維持できているので、大規模なテキストでの前処理などに活用して頂けます。一方で、[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器はそれぞれに特色があり、意図する応用も異なるので、Vibratoだけが高速になってもあまり建設的だとは思いません。Vibratoで試されるアイディアを通して、他の[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器の高速化にも貢献できるのが最善だと思っています。そのために、また何かアイディアがあればVibratoで試し、積極的に結果を発信していければと思っています。

# まとめ

本記事では、Rust製[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器Vibratoと、その技術詳細について解説しました。Vibratoは[オープンソース](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D7%A5%F3%A5%BD%A1%BC%A5%B9)ソフトウェアなので、自由な利用はもちろん、改善の依頼やコードの提供も受け付けております。

また LegalForce Research では、コーディングが好きなソフトウェアエンジニアや研究が好きなリサーチエンジニアを募集しています。主に[自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)の分野でソフトウェアを開発したい方や、大量の文書を利用した研究をしたい方の応募をお待ちしております。

- [「リサーチエンジニア」の募集](https://herp.careers/v1/legalforce/5rhXf6rNTrde)
- [「ソフトウェアエンジニア」の募集](https://herp.careers/v1/legalforce/NvglWz03nzzf)
- [「ソフトウェアエンジニア(DevOps)」の募集](https://herp.careers/v1/legalforce/u21lHVQmd9hK)
27. 
最小コスト値が同着となる場合を除き、BCCWJ全文について解析結果が同じとなることを確認しています。[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:1)
28. 
v0.1.2では1-best解しか対応しておらず、n-best解やソフト[分かち書き](http://d.hatena.ne.jp/keyword/%CA%AC%A4%AB%A4%C1%BD%F1%A4%AD)などは未対応です。[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:2)
29. 
久光徹, 新田義彦. 接続コスト最小法による[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)の提案と計算量の評価について. 電子情報通信学会技術研究報告, 1990[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:3)
30. 
[「形態素解析の理論と実装」（工藤拓, 2018）](https://www.kindaikagaku.co.jp/book_list/detail/9784764905771/)の図例を参考にしました。[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:4)
31. 
Viterbi. Error bounds for convolutional codes and an asymptotically optimum decoding algorithm. [IEEE](http://d.hatena.ne.jp/keyword/IEEE) Transactions on Information Theory, 1967[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:5)
32. 
キャッシュミスや参照の局所性については、例えば[この資料](https://www.ieice-hbkb.org/files/06/06gun_04hen_04.pdf)などをご参照ください。[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:6)
33. 
[Aoe](http://d.hatena.ne.jp/keyword/Aoe). An efficient digital search algorithm by using a double-array structure. [IEEE](http://d.hatena.ne.jp/keyword/IEEE) Transactions on Software Engineering, 1989.[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:7)
34. 
Liu et al., Compression methods by code mapping and code dividing for chinese dictionary stored in a double-array trie. IJCNLP, 2011[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:8)
35. 
簡単のために、本記事の例では素性として品詞を扱います。[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:9)
36. 
BCCWJのコアデータ、サブ[コーパス](http://d.hatena.ne.jp/keyword/%A5%B3%A1%BC%A5%D1%A5%B9)の仕様については、[公式ドキュメント](https://clrd.ninjal.ac.jp/bccwj/doc/manual/BCCWJ_Manual_02.pdf)をご参照ください。[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:10)
37. 
変化率は `(変化先−変化元)/変化元` で算出します。[↩](https://tech.legalforce.co.jp/entry/2022/09/20/133132#fnref:11)

こんにちは。LegalForce Researchで研究員をしている神田 ([@kampersanda](https://twitter.com/kampersanda)) です。

LegalForce Researchでは現在、**高速なパターンマッチングマシン Daachorse（ダークホース）**を開発・運用しています。文字列処理の基礎である**複数パターン検索**を提供するRust製ライブラリです。以下のレポジトリで公開されています。

## [GitHub - daac-tools/daachorse: 🐎 A fast implementation of the Aho-Corasick algorithm using the compact double-array data structure in Rust.](https://github.com/daac-tools/daachorse)

🐎 A fast implementation of the Aho-Corasick algorithm using the compact double-array data structure in Rust. - GitHub - daac-tools/daachorse: 🐎 A fast implementation of the Aho-Corasick algorithm u...

[github.com](https://github.com/daac-tools/daachorse)

[github.com](https://github.com/daac-tools/daachorse)

本記事はDaachorseの技術仕様を解説します。具体的には、

- 複数パターン検索に関係する基礎技術（トライ木・Aho–Corasick法・ダブル配列）
- Daachorseの実装の工夫と性能

を解説します。

以下のような方を読者として想定します。

- 文字列処理[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)やデータ構造に興味のある方
- [自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)の要素技術に興味のある方
- Rustライブラリに興味がある方
- [Daachorseについて](https://tech.legalforce.co.jp/entry/2022/02/24/140316#Daachorse%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [複数パターン検索の基礎知識](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E8%A4%87%E6%95%B0%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E6%A4%9C%E7%B4%A2%E3%81%AE%E5%9F%BA%E7%A4%8E%E7%9F%A5%E8%AD%98)
    - [複数パターン検索](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E8%A4%87%E6%95%B0%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E6%A4%9C%E7%B4%A2)
    - [トライ木](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E3%83%88%E3%83%A9%E3%82%A4%E6%9C%A8)
        - [トライ木による共通接頭辞検索](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E3%83%88%E3%83%A9%E3%82%A4%E6%9C%A8%E3%81%AB%E3%82%88%E3%82%8B%E5%85%B1%E9%80%9A%E6%8E%A5%E9%A0%AD%E8%BE%9E%E6%A4%9C%E7%B4%A2)
        - [トライ木による複数パターン検索](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E3%83%88%E3%83%A9%E3%82%A4%E6%9C%A8%E3%81%AB%E3%82%88%E3%82%8B%E8%A4%87%E6%95%B0%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E6%A4%9C%E7%B4%A2)
    - [Aho–Corasick法](https://tech.legalforce.co.jp/entry/2022/02/24/140316#AhoCorasick%E6%B3%95)
        - [ACマシンによる複数パターン検索](https://tech.legalforce.co.jp/entry/2022/02/24/140316#AC%E3%83%9E%E3%82%B7%E3%83%B3%E3%81%AB%E3%82%88%E3%82%8B%E8%A4%87%E6%95%B0%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E6%A4%9C%E7%B4%A2)
    - [ダブル配列](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E3%83%80%E3%83%96%E3%83%AB%E9%85%8D%E5%88%97)
        - [ACマシンの表現](https://tech.legalforce.co.jp/entry/2022/02/24/140316#AC%E3%83%9E%E3%82%B7%E3%83%B3%E3%81%AE%E8%A1%A8%E7%8F%BE)
- [Daachorse 効率化の工夫](https://tech.legalforce.co.jp/entry/2022/02/24/140316#Daachorse-%E5%8A%B9%E7%8E%87%E5%8C%96%E3%81%AE%E5%B7%A5%E5%A4%AB)
    - [メモリ効率の良い出力集合の保存](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E3%83%A1%E3%83%A2%E3%83%AA%E5%8A%B9%E7%8E%87%E3%81%AE%E8%89%AF%E3%81%84%E5%87%BA%E5%8A%9B%E9%9B%86%E5%90%88%E3%81%AE%E4%BF%9D%E5%AD%98)
        - [Daachorseの設計](https://tech.legalforce.co.jp/entry/2022/02/24/140316#Daachorse%E3%81%AE%E8%A8%AD%E8%A8%88)
    - [Bytewise & Charwise Daachorse](https://tech.legalforce.co.jp/entry/2022/02/24/140316#Bytewise--Charwise-Daachorse)
        - [使い分け基準](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91%E5%9F%BA%E6%BA%96)
    - [Bytewise Daachorseの要素圧縮](https://tech.legalforce.co.jp/entry/2022/02/24/140316#Bytewise-Daachorse%E3%81%AE%E8%A6%81%E7%B4%A0%E5%9C%A7%E7%B8%AE)
    - [参照の局所性を考慮した配列構造](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E5%8F%82%E7%85%A7%E3%81%AE%E5%B1%80%E6%89%80%E6%80%A7%E3%82%92%E8%80%83%E6%85%AE%E3%81%97%E3%81%9F%E9%85%8D%E5%88%97%E6%A7%8B%E9%80%A0)
    - [FAIL・OUTPUTの埋め込み検討](https://tech.legalforce.co.jp/entry/2022/02/24/140316#FAILOUTPUT%E3%81%AE%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E6%A4%9C%E8%A8%8E)
        - [Daachorseの設計](https://tech.legalforce.co.jp/entry/2022/02/24/140316#Daachorse%E3%81%AE%E8%A8%AD%E8%A8%88-1)
- [Daachorseのベンチマーク](https://tech.legalforce.co.jp/entry/2022/02/24/140316#Daachorse%E3%81%AE%E3%83%99%E3%83%B3%E3%83%81%E3%83%9E%E3%83%BC%E3%82%AF)
    - [結果](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E7%B5%90%E6%9E%9C)
        - [検索時間](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E6%A4%9C%E7%B4%A2%E6%99%82%E9%96%93)
        - [メモリ使用量](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E3%83%A1%E3%83%A2%E3%83%AA%E4%BD%BF%E7%94%A8%E9%87%8F)
- [まとめ](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E3%81%BE%E3%81%A8%E3%82%81)
- [参考文献](https://tech.legalforce.co.jp/entry/2022/02/24/140316#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

# Daachorseについて

まずはじめにDaachorseの簡単な紹介をします。

Daachorseは、文字列処理の基礎である複数パターン検索を提供するRust製ライブラリです。パターンの集合とテキストを入力すると、テキストに出現するパターンを列挙することができます。その特徴としては、以下が挙げられます。

- Aho–Corasick法に基づきテキスト長に対して線形時間で動作
[1](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fn:1)
- ダブル配列による高速・省メモリな実装
[2](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fn:2)
- 豊富な検索オプション
- シンプルなインタフェース

複数パターン検索には多くの応用があります。身近な例では、[形態素解析](http://d.hatena.ne.jp/keyword/%B7%C1%C2%D6%C1%C7%B2%F2%C0%CF)器や[正規表現](http://d.hatena.ne.jp/keyword/%C0%B5%B5%AC%C9%BD%B8%BD)エンジンなどです。Daachorseは非常に高速に動作するので、これらアプリケーションの高速化に寄与するでしょう。

例えば、LegalForce Researchでは[高速な単語分割器 Vaporetto（ヴァポレット）](https://tech.legalforce.co.jp/entry/2021/09/28/180844)を開発しており、そのコア[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)としてDaachorseを使っています。複数パターン検索は単語分割において大部分を占める処理なので、高速なVaporettoの実現には高速なDaachorseが必須です。

# 複数パターン検索の基礎知識

Daachorseはダブル配列を用いたAho–Corasick法の実装です。ここでは準備として、複数パターン検索、トライ木、Aho–Corasick法、ダブル配列を解説します。

## 複数パターン検索

複数パターン検索とは、入力として文字列パターン集合とテキストが与えられると、テキストに含まれるパターンとその位置のペアをすべて報告する問題です。

例えば、4つのパターン `世界,世界の,全世界,国民` を用いてテキスト `全世界の国民が` を検索すると、下線で示された4つの出現が報告されます。

![[20220222080136.jpg]]

本記事では、例の `全世界,世界,世界の` のように出現位置のオーバラップを許す問題を取り扱います。応用によっては、オーバラップを許さない問題設定もバリエーションとして考えられますが、本記事では取り扱いません。しかし、Daachorseではそのような検索も提供しています。興味のある方は[DaachorseのREADME](https://github.com/daac-tools/daachorse)をご参照ください。

## トライ木

複数パターン検索を解く[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)としてトライ木を使った方法があります。次に紹介するAho–Corasick法の基礎となる[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)です。

トライ木はパターンの集合を保存するデータ構造で、パターンの接頭辞を併合して構築される[オートマトン](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%C8%A5%DE%A5%C8%A5%F3)の一種です。下図に例を示します。

![[20220222080031.jpg]]

トライ木は枝に文字を付随し、文字を使って状態を遷移します。トライ木の状態はいずれかのパターンの接頭辞に対応し、根からその状態までの経路上の文字を連結することで接頭辞は復元されます。例えば、状態 2 は `世界` を表し、状態 0 → 1 → 2 の経路上の文字を連結することで `世界` は復元できます。

パターンに対応する状態を**出力状態**と呼び、灰色で描画しています。例えば、状態 2 は出力状態なので、`世界` がパターンとして登録されていることがわかります。

### トライ木による共通接頭辞検索

あるパターンがトライ木に登録されているかどうかは、その文字を使って根から状態を遷移し、最終的に訪れた状態が出力状態かどうかを調べることで確認できます。その状態が出力状態でなかったり、途中で遷移に失敗した場合は、そのパターンはトライ木に登録されていません。

例えば、パターン `世界の` が登録されているかどうかは、下図のように状態 0 から 3 まで遷移し、状態 3 が出力状態であるかことから確認できます。

![[20220222080354.jpg]]

ここでのトライ木の特徴は、検索パターンの接頭辞も同時に、パターンとして登録されているかを知ることができることです。これは、遷移中に訪れた状態が出力状態かを調べることで実現されます。例えば、 `世界の` の検索中に状態 2 を訪れますが、状態 2 が出力状態であることから接頭辞の `世界` もパターンとして登録されていることがわかります。

このように検索パターンのすべての接頭辞について、トライ木に登録されているかを調べる検索を**共通接頭辞検索**と言います。

### トライ木による複数パターン検索

トライ木を用いた複数パターン検索は、テキストの各位置を起点とした文字列について、共通接頭辞検索をすることで実現されます。例えば下の図は、テキストの位置 2 から開始する文字列について共通接頭辞検索をしたときの例です。テキストの位置 2 からは、 `世界` と `世界の` がパターンとして出現することがわかります。

このように、テキストのすべての位置を起点として共通接頭辞検索を実行することで、テキストに出現するパターンを漏れなく検索することができます。パターンの最大長を m とすると、共通接頭辞検索は O(m) 個の状態を遷移します。そのため、テキスト長を n とすると、トライ木を用いた複数パターン検索は O(nm) 時間で動作します。

## Aho–Corasick法

トライ木による複数パターン検索の欠点は、一つ前の共通接頭辞検索で読み込んだテキストの内容を捨ててしまう点です。例えば以下のように、テキストの先頭位置からの共通接頭辞検索で `全世界の` までを読み込んだのに、次の検索ではその読み込み位置を巻き戻して `世界の...` から改めて検索し直します。

![[20220222080611.jpg]]

しかし `全世界` を読み込んで状態 6 まで遷移できた時点で、次の検索で `世界` という文字列を使って状態 2 まで遷移することは、登録されているパターン集合から明らかです。状態 6 から状態 2 までにポインタを渡せば、 `世界` というテキストの再読み込みを回避できそうです。

Aho–Corasick法はこのようなア[イデア](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C7%A5%A2)に基づき、トライ木に追加の情報を持たせることでテキストの再読み込みを回避する[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)です。下図のようなトライ木を拡張した[オートマトン](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%C8%A5%DE%A5%C8%A5%F3)（**ACマシン**）を使って検索を実現します。

![[20220222080630.jpg]]

トライ木の例と比べて、破線の矢印が追加で描画されています。これを**接尾辞リンク**と呼びます。

接尾辞リンクを簡単に説明します。ある状態の接尾辞リンクは、その状態が表す文字列の接尾辞のうち、最長の接尾辞を表す別の状態を指すように定義されます。例えば、状態 6 が表す `全世界` の接尾辞 `世界,界` のうち、最長の `世界` を表す状態 2 への接尾辞リンクが定義されます。接尾辞には空文字列も含まれるので、いずれの状態にも空文字列を表す根への接尾辞リンクが少なくとも定義されます。ただし、上図では根への接尾辞リンクの描画は省略しています。

加えて、ACマシンでは各状態が出力するパターンの集合を保持します。これを**出力集合**と呼びます。ある状態の出力集合は、その状態から接尾辞リンクを使って辿ることのできる出力状態が表すパターンの集合です。例えば、状態 6 は `世界` を出力に持つ状態 2 を辿れるので、 `世界,全世界` を出力集合として持ちます。

### ACマシンによる複数パターン検索

ACマシンによる複数パターン検索は、トライ木の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)と同じようにテキストを一文字ずつ読み込みながら状態を遷移します。違う点は遷移に失敗したときの処理です。トライ木では根まで巻き戻って検索を再開していたのに対して、ACマシンでは接尾辞リンクを辿って遷移を継続します。

以下の検索例を見てみましょう。 `全世界` で検索し状態 6 まで遷移する様子はトライ木の例と同じです。状態 6 を訪れたところで、この状態は出力集合を持つのでパターン `世界,全世界` を出現として報告します。次に、文字 `の` で遷移を試みますが、遷移先状態が無いので検索は失敗します。ここで、ACマシンは接尾辞リンクを辿って状態 2 に移動し、再び `の` で遷移を試みます。今度は遷移先として状態 3 が見つかるので、検索を続行します。

このように、ACマシンは接尾辞リンクと出力集合を利用することで、テキストの読み込み位置を巻き戻すことなく複数パターン検索を実現します。テキスト長を n と解の個数を occ としたとき、検索は O(n+occ) 時間で動作します。

Aho–Corasick法は線形時間という優れた理論保証を持つ一方で、実際の検索速度はACマシンを表現するデータ構造に大きく影響します。これから説明する**ダブル配列**は実用に優れたデータ構造であり、高速なACマシンの実装を可能にします。

## ダブル配列

ダブル配列はトライ木を表現するための高速なデータ構造です。**BASE**と**CHECK**の2つの配列により状態を表現します。BASE・CHECK配列の各要素が状態に対応し、そのオフセット値が状態のIDになります。つまり状態 s には BASE[s], CHECK[s] が対応します。

状態 s から状態 t への文字 c による遷移について、以下の2式（遷移式）を満たすようにBASE・CHECK値は決定されます。

- BASE[s] + Code(c) = t
- CHECK[t] = s

ここで、Code(c) は文字 c に割り当てられた整数のコード値です。

この遷移式を図で表すと以下のようになります。状態 s から文字 c で遷移した先の状態のID t は、そのBASE値とコード値の足し算によって算出できます。そして、その遷移先状態 t のCHECK値が遷移元状態 s を指すとき、遷移が正しく定義されていることが確認できます。

「トライ木」節で例示したトライ木を、ダブル配列により表現した例を以下に示します。ただし出力として、パターン文字列の代わりに、そのIDを格納しています。

![[20220222081049.jpg]]

ダブル配列の遷移式を満たすように状態にIDが割り当てられ、BASE・CHECK値が決定されています。OUTPUT[s]は状態 s の出力を保存するための配列です。

例えば、状態 6 から文字 `界` による遷移先は

- BASE[6] + Code(`界`) = 5 + 2 = 7
- CHECK[7] = 6

なので状態 7 であることがわかります。

一方、状態 6 から文字 `全` による遷移は

- BASE[6] + Code(`全`) = 5 + 0 = 5
- CHECK[5] ≠ 6

なので定義されていないことがわかります。

ダブル配列の利点は、例からも分かるように単純な足し算と条件分岐だけで状態の遷移が実現できることです。実用において非常に高速なトライ木の遷移を実現します。

### ACマシンの表現

ACマシンはトライ木のシンプルな拡張なので、ダブル配列でも表現することができます。トライ木との違いは、各状態が接尾辞リンクと出力集合を保持する点です。

上図のACマシンをダブル配列で表現した例を下図に示します。

![[20220222081207.jpg]]

FAILは接尾辞リンクを格納した配列です。OUTPUTは状態に対応する出力集合へのポインタを保持した配列です。出力集合は配列として保存されています。

# Daachorse 効率化の工夫

Daachorseは、上記したようなダブル配列を用いたACマシンの実装です。そして、その性能を最大限に引き出すために入念に実装されています。ここでは、その工夫した点について解説します。

## メモリ効率の良い出力集合の保存

ここでは、効率的な出力集合の保存方法を考えます。最もシンプルな方法は、下図のように出力集合を配列として保存し、出力状態に配列へのポインタを格納する方法でしょう。

例えば、状態 7 の出力集合 `{C,A}` は OUTPUT[7] が指す配列を参照することで得られます。この方法は、配列をスキャンするだけで出力集合が復元できるので参照の局所性が良いです。しかし、 `A` のよ[うな重](http://d.hatena.ne.jp/keyword/%A4%A6%A4%CA%BD%C5)複する出力値を保存する必要がありメモリ効率が悪いです。

### Daachorseの設計

Daachorseでは、そのよ[うな重](http://d.hatena.ne.jp/keyword/%A4%A6%A4%CA%BD%C5)複する出力値を併合して保持することで、上記の方法のメモリ効率を改善します。具体的には、以下のような事実に基づいて出力集合を併合します。

事実

---

状態 s から接尾辞リンクを通して状態 t に到達できるとき、状態 t の出力集合は状態 s の出力集合の部分集合である。

---

例えば、状態 7 から接尾辞リンクを通して状態 3 に到達できるので、状態 3 の出力集合 `{A}` は状態 7 の出力集合 `{C,A}` の部分集合です。

この事実に基づけば、状態 t の配列は状態 s の配列の部分配列として表現できます。例えば下図のように、状態 3 の配列は、状態 7 の配列の後方部分で表現できます。つまり、OUTPUT[3] には状態 7 の配列の途中を指すポインタを格納すればよいです。

この方法により、保存する出力値の数を減らしてメモリを節約することができます。例えば本記事の実験で使用したデー[タセット](http://d.hatena.ne.jp/keyword/%A5%BF%A5%BB%A5%C3%A5%C8)では、**保存する出力値の数が20—40%少なくて済みます**。

**追記：v0.4.2で森構造を使った別の表現に置き換わりました。詳しくは**[**論文**](https://arxiv.org/abs/2207.13870)**の節3.1をご参照ください。**

## Bytewise & Charwise Daachorse

Daachorseでは、文字列をバイト列として扱う**Bytewise Daachorse**と、[ユニコード](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%B3%A1%BC%A5%C9)列として扱う**Charwise Daachorse**の2種類の実装を提供しています。Bytewise Daachorseは文字列の[エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)に依らず適用できる汎用的な実装で、Charwise Daachorseは日本語などのマルチバイト文字列に特化した実装です。

例えば `世界` というマルチバイト文字列は、それぞれの実装で以下のように処理されます。Bytewise Daachorseでは、[UTF-8](http://d.hatena.ne.jp/keyword/UTF-8)で `0xE4,0xB8,0x96,0xE7,0x95,0x8C` の6バイトで表現し、6個の遷移を定義します。Charwise Daachorseでは、[ユニコード](http://d.hatena.ne.jp/keyword/%A5%E6%A5%CB%A5%B3%A1%BC%A5%C9)で `U+4E16,U+754C` の2つのコードポイント値として表現し、2個の遷移を定義します。

例からも分かるように、マルチバイト文字列についてはCharwise Daachorseの方が少ない状態数でACマシンを構築でき、少ない遷移回数で検索できます。コード値が取りうる範囲は大きくなりますが、ダブル配列の遷移は定数時間なので影響ありません。そのため、日本語などのマルチバイト文字列からACマシンを構築する場合、Charwise Daachorseを使った方が高速な検索が期待できます。

ただし注意点として、状態から出る遷移数が多くなると、ダブル配列の構築が低速化しやすくなるという問題があります。ダブル配列の構築では、遷移式を満たすように配列の空要素を探索して状態を配置します。このとき、状態から出る遷移数が多いと空要素を見つけるのが難しくなり、結果として構築が低速化します。また、デー[タセット](http://d.hatena.ne.jp/keyword/%A5%BF%A5%BB%A5%C3%A5%C8)によっては空要素が多くなりメモリ効率が悪くなります。

バイト列では状態から出る遷移数が256個で抑えられます。そのため、バイト列から構築することで、空要素がほとんど無いダブル配列を高速に構築できることが経験的にわかっています。文字列の[エンコード](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9)に関わらず適用できるなどの利点もあるため、[Darts](http://chasen.org/~taku/software/darts/)を始めとする多くのライブラリがBytewiseを採用しています。

### 使い分け基準

まとめると、Bytewise/Charwise Daachorseは以下の特徴に注意して使い分けることをオススメします。

- Bytewise Daachorseはどんな文字列についても安定した性能を提供する
- Charwise Daachorseはマルチバイト文字列について高速な検索を提供するが、構築が低速なことに注意

## Bytewise Daachorseの要素圧縮

BASE・CHECKは配列のオフセット値を格納するので、一般的に要素当たり4バイトを割り当てて実装します。しかし文献 [3](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fn:3) の圧縮法を適用することで、オフセットの代わりにコード値をCHECK配列に格納することができます。

すなわち下図のように、遷移先 t のCHECK値に遷移元 s を格納する代わりに、遷移に使ったコード値 Code(c) を格納します。

ただし不正な遷移を回避するために、任意の状態ペア (s,s’) について BASE[s] ≠ BASE[s’] を満たす必要があります。

バイト列から構築するとき、コード値は 1 バイトで表現できます。Bytewise Daachorseはこの圧縮法を採用し、CHECK配列の要素当たりのサイズを 4 バイトから 1 バイトに圧縮しています。

## 参照の局所性を考慮した配列構造

ダブル配列の説明では、便宜上「BASEとCHECKの2つの配列」という表現を使っていますが、実際には「BASE値とCHECK値をメンバに持つ構造体の配列」として実装するのが効率的です。ダブル配列の遷移では、BASE[s]とCHECK[s]は連続して参照されるので、参照の局所性を考慮しての実装になります。

Daachorseでも同じように「BASE値・CHECK値・FAIL値・OUTPUT値をメンバに持つ構造体の配列」として実装しています。このとき、[データ構造アライメント](http://www.catb.org/esr/structure-packing/)を考慮して、各値の表現に何バイトを割り当てるのかを考える必要があります。

Charwise Daachorseでは各値がオフセット値なので、その表現に4バイトを割り当てます。つまり、配列の要素は16バイトで表現されます。これは、4バイトアライメントでメモリをパディングすること無くシンプルに実装することができます。

一方でBytewise Daachorseでは、CHECK値を1バイトに圧縮しているので、同じようにオフセット値に4バイトを割り当てると、配列の要素は13バイトで表現されることになります。この要素を4バイトアライメントでパディング無く実装するために、Bytewise DaachorseではFAIL値を3バイトに削減し、要素を12バイトで表現しています。

この修正により、Bytewise DaachorseはFAIL値を3バイトで表現できないような大きいACマシンを表現できなくなります。しかしAho–Corasick法の応用を考えたときに、それほど大きなACマシンを表現する需要はあまりないと判断して、このような実装を採用しています。

## FAIL・OUTPUTの埋め込み検討

上の例で示したダブル配列では、BASE・CHECK・FAIL・OUTPUTの4個の配列によりACマシンを表現しています。しかしデー[タセット](http://d.hatena.ne.jp/keyword/%A5%BF%A5%BB%A5%C3%A5%C8)によっては、FAILの多くの値が初期状態を指し、OUTPUTの多くの要素がポインタを持ちません。これらのメモリを節約するために、既存のダブル配列の実装では、[特殊文字](http://d.hatena.ne.jp/keyword/%C6%C3%BC%EC%CA%B8%BB%FA)によって遷移される状態を定義し、FAIL配列やOUTPUT配列を削除することを検討しています（例えば、文献 [4](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fn:4)）。

具体的には、初期状態以外の接尾辞リンクを持つ状態からは[特殊文字](http://d.hatena.ne.jp/keyword/%C6%C3%BC%EC%CA%B8%BB%FA) `$` により遷移する状態を、出力状態からは[特殊文字](http://d.hatena.ne.jp/keyword/%C6%C3%BC%EC%CA%B8%BB%FA) `#` により遷移する状態を定義します（下図）。

[特殊文字](http://d.hatena.ne.jp/keyword/%C6%C3%BC%EC%CA%B8%BB%FA)により新たに定義された状態は遷移先を持たず、それらのBASE値は必ず未使用になります。そのため、ポインタをBASE値に埋め込むことができ、FAIL・OUTPUT配列を削除することができます。一方で、状態数が増えることとポインタの取得に遷移を要することが欠点となります。

### Daachorseの設計

Daachorseを設計するに当たって、[日本語テキスト解析用辞書UniDic](https://ccd.ninjal.ac.jp/unidic/)に含まれる重複を除く68万単語からCharwiseにACマシンを構築した場合の統計値を調べました。その結果、99%程度の状態が初期状態以外を指す接尾辞リンクを保持し、99%程度の状態が出力集合へのポインタを保持していました。つまりUniDicの場合、FAIL・OUTPUT配列を削除する利点はありません。

もちろん、この結果はデー[タセット](http://d.hatena.ne.jp/keyword/%A5%BF%A5%BB%A5%C3%A5%C8)に依存するものです。しかし、Daachorseは第一にVaporettoの高速化を目的としたライブラリなので、[自然言語](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC)辞書による結果を優先し、BASE・CHECK・FAIL・OUTPUTの4個の配列を用いた実装にしています。

# Daachorseの[ベンチマーク](http://d.hatena.ne.jp/keyword/%A5%D9%A5%F3%A5%C1%A5%DE%A1%BC%A5%AF)

Daachorse v0.4.0と他のRust製パターンマッチングライブラリとの比較結果を示します。比較するライブラリは以下の3つです。

- [aho-corasick](https://github.com/BurntSushi/aho-corasick) (v0.7.18): Rustで最も有名なAC法の実装
- [fst](https://github.com/BurntSushi/fst) (v0.4.7): 有限状態トランスデューサを用いた辞書の実装
- [yada](https://github.com/takuyaa/yada) (v0.5.0): ダブル配列を用いたトライ木の実装

aho-corasickライブラリはNFA型と[DFA](http://d.hatena.ne.jp/keyword/DFA)型の2種類の実装を提供しています。NFA型は通常のACマシンの実装です。[DFA](http://d.hatena.ne.jp/keyword/DFA)型は、ACマシンのすべての状態と文字の組み合わせについて、遷移を展開し陽に保存した実装です。[DFA](http://d.hatena.ne.jp/keyword/DFA)型はNFA型より少ない状態遷移で検索できるので高速ですが、膨大なメモリを使用します。

デー[タセット](http://d.hatena.ne.jp/keyword/%A5%BF%A5%BB%A5%C3%A5%C8)としては、以下の2通りを使用しました。

- **Word100K** 
    - パターン集合: 英単語10万件 from [fstライブラリ](https://github.com/BurntSushi/fst/tree/master/data)
    - 検索テキスト: The Adventures of [Sherlock Holmes](http://d.hatena.ne.jp/keyword/Sherlock%20Holmes) from [Project Gutenberg](https://www.gutenberg.org/ebooks/1661)
- **UniDic** 
    - パターン集合: 日本語単語68万件 from [UniDic](https://ccd.ninjal.ac.jp/unidic/)
    - 検索テキスト: [吾輩は猫である](http://d.hatena.ne.jp/keyword/%B8%E3%C7%DA%A4%CF%C7%AD%A4%C7%A4%A2%A4%EB) from [青空文庫](https://www.aozora.gr.jp/cards/000148/card789.html)

より詳細な実験設定や他の検索オプションでの結果については、[レポジトリのWiki](https://github.com/daac-tools/daachorse/wiki/Performance-Comparison)をご参照ください。

## 結果

### 検索時間

テキストに出現するパターンをすべて列挙するのに所要した時間を以下に示します。

両デー[タセット](http://d.hatena.ne.jp/keyword/%A5%BF%A5%BB%A5%C3%A5%C8)において、daachorseが高速なことがわかります。Word100Kではaho-corasick ([DFA](http://d.hatena.ne.jp/keyword/DFA))が最速で、次点でdaachorseが高速でした。[DFA](http://d.hatena.ne.jp/keyword/DFA)型はリッチにメモリを確保しているので高速ですが、daachorseもそれに接近しています。yadaも非常に高速であり、ダブル配列の時間効率の良さが伺えます。UniDicではdaachorse (charwise)が突出して高速であり、CharwiseにACマシンを構築することの重要性が伺えます。

### メモリ使用量

[オートマトン](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%C8%A5%DE%A5%C8%A5%F3)のメモリ使用量を以下に示します。

ACマシンは有限状態トランスデューサやトライ木と比べて多くのデータを持つので、メモリ使用量は大きくなります。しかし、同じAho–Corasick法の実装であるaho-corasickと比べると、daachorseは少ないメモリ使用量なのがわかります。

# まとめ

本記事では、ダブル配列を用いたAho–Corasick法の実装であるDaachorseを紹介しました。Daachorseは[API](http://d.hatena.ne.jp/keyword/API)もシンプルなので、お手元のRustコードに簡単に組み込んで使って頂けます。複数パターン検索は非常に基本的な問題の一つなので、高速な文字列処理が必要な多くの場面で活躍するはずです。

Daachorseは[オープンソース](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D7%A5%F3%A5%BD%A1%BC%A5%B9)ソフトウェアなので、自由な利用はもちろん、改善の依頼やコードの提供も受け付けております。

また LegalForce Research では、コーディングが好きなソフトウェアエンジニアや研究が好きなリサーチエンジニア、チームのマネジメントをするエンジニア[リングマ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%F3%A5%B0%A5%DE)ネージャを募集しています。主に[自然言語処理](http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC%BD%E8%CD%FD)の分野でソフトウェアを開発したい方や、大量の文書を利用した研究をしたい方の応募をお待ちしております。

- [「リサーチエンジニア」の募集](https://herp.careers/v1/legalforce/5rhXf6rNTrde)
- [「ソフトウェアエンジニア」の募集](https://herp.careers/v1/legalforce/NvglWz03nzzf)
- [「ソフトウェアエンジニア（検索）」の募集](https://herp.careers/v1/legalforce/NIMV2NsI5OX3)
- [「エンジニアリングマネージャ」の募集](https://herp.careers/v1/legalforce/RqTf-xfOzn7v)

# 参考文献

38. 
Aho and Corasick. Efficient string matching: an aid to bibliographic search. Communications of the [ACM](http://d.hatena.ne.jp/keyword/ACM), 1975.[↩](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fnref:1)
39. 
[Aoe](http://d.hatena.ne.jp/keyword/Aoe). An efficient digital search algorithm by using a double-array structure. [IEEE](http://d.hatena.ne.jp/keyword/IEEE) Transactions on Software Engineering, 1989.[↩](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fnref:2)
40. 
Yata, Oono, Morita, Fuketa, [Sumitomo](http://d.hatena.ne.jp/keyword/Sumitomo), and [Aoe](http://d.hatena.ne.jp/keyword/Aoe). A compact static double-array keeping character codes, Information Processing & Management, 2007.[↩](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fnref:3)
41. 
信種, 森田, 泓田, and 青江. ダブル配列を用いたマシンACの効率的格納手法. [言語処理学会](http://d.hatena.ne.jp/keyword/%B8%C0%B8%EC%BD%E8%CD%FD%B3%D8%B2%F1)第13回年次大会, 2007年.[↩](https://tech.legalforce.co.jp/entry/2022/02/24/140316#fnref:4)