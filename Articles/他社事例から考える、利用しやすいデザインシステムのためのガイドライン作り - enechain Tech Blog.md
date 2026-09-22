---
タグ: []
作成日時: 2024-09-10T15:45:00
URL: https://techblog.enechain.com/entry/design-system-guideline
Tags: [topic/デザインシステム/ドキュメント]
---
![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725879728/design-system-guideline/ogp.png)

- [はじめに](https://techblog.enechain.com/entry/design-system-guideline#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
- [enechainデザインシステムについて](https://techblog.enechain.com/entry/design-system-guideline#enechain%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [デジタル庁デザインシステム](https://techblog.enechain.com/entry/design-system-guideline#%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E5%BA%81%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0)
    - [特徴](https://techblog.enechain.com/entry/design-system-guideline#%E7%89%B9%E5%BE%B4)
    - [Figmaファイル](https://techblog.enechain.com/entry/design-system-guideline#Figma%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB)
    - [Webサイト](https://techblog.enechain.com/entry/design-system-guideline#Web%E3%82%B5%E3%82%A4%E3%83%88)
- [GitHub Primer](https://techblog.enechain.com/entry/design-system-guideline#GitHub-Primer)
    - [特徴](https://techblog.enechain.com/entry/design-system-guideline#%E7%89%B9%E5%BE%B4-1)
    - [Figmaファイル](https://techblog.enechain.com/entry/design-system-guideline#Figma%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB-1)
    - [Webサイト](https://techblog.enechain.com/entry/design-system-guideline#Web%E3%82%B5%E3%82%A4%E3%83%88-1)
- [Ameba Spindle](https://techblog.enechain.com/entry/design-system-guideline#Ameba-Spindle)
    - [特徴](https://techblog.enechain.com/entry/design-system-guideline#%E7%89%B9%E5%BE%B4-2)
    - [Figmaファイル](https://techblog.enechain.com/entry/design-system-guideline#Figma%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB-2)
    - [Webサイト](https://techblog.enechain.com/entry/design-system-guideline#Web%E3%82%B5%E3%82%A4%E3%83%88-2)
- [各デザインシステムの構成まとめ](https://techblog.enechain.com/entry/design-system-guideline#%E5%90%84%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E6%A7%8B%E6%88%90%E3%81%BE%E3%81%A8%E3%82%81)
- [enechainへの反映](https://techblog.enechain.com/entry/design-system-guideline#enechain%E3%81%B8%E3%81%AE%E5%8F%8D%E6%98%A0)
    - [Notionでのガイドライン](https://techblog.enechain.com/entry/design-system-guideline#Notion%E3%81%A7%E3%81%AE%E3%82%AC%E3%82%A4%E3%83%89%E3%83%A9%E3%82%A4%E3%83%B3)
- [まとめ](https://techblog.enechain.com/entry/design-system-guideline#%E3%81%BE%E3%81%A8%E3%82%81)

## はじめに

こんにちは、デザイナーの渡邉と申します。私はenechainの業務委託メンバーとして、enechainの複数プロダクトを支えるデザインシステムの改善に携わっています。

この記事では、利用しやすいデザインシステムへと改善していく上でデザインチームが取り組んでいたことをまとめます。

## enechainデザインシステムについて

enechainでは10個以上のマルチプロダクトを開発・運用しており、デザイナーは各プロダクトでUIデザインを担当しつつ、共通で使えるコンポーネントをenechainデザインシステムとして定義し、各プロダクトへ反映させています。

例えばあるプロダクトで既存コンポーネントに改修を加える必要が出てきた場合、#design_system チャンネルにてデザイナーが提案 → デザインシステムメンバーでレビュー → 実装されてStorybook上に反映されるというフローをとっています。

enechainのデザインシステムはNotionをハブとして以下のツールで構成しています。

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725812962/design-system-guideline/azswrbkve1resqszazlw.png)

しかしコンポーネントに関していうとFigmaと実装で乖離が目立つようになり、以下のような状態が発生していました。

- 実装で使っているがFigmaに定義されていないコンポーネントがある
- Figmaで定義しているが実装されていない・実装と異なるコンポーネントがある

この乖離を減らしていくタイミングで、デザイナー側で運用している「Figma」「Notion」2つの理想状態を改めて考えることになりました。

本記事では「**“デザインガイドライン” としてのデザインファイル・ドキュメントのあるべき姿**」を探すべく、他社のデザインシステムを調査していきたいと思います。

## デジタル庁デザインシステム

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725880441/design-system-guideline/stsv0si9egjy4rpsvghg.png)

日本のデジタル庁が公開しているデザインシステムです。2022年11月にFigmaファイルが先行して公開された後、2024年5月にWebサイトも公開されるなど、行政のデザインシステムとして日々アップデートし続けています。

### 特徴

- **デザイナーが使用する上でのガイドラインがFigmaに集約**
- WebサイトではルールそのものだけでなくWCAGを引用した根拠ある背景が記述されている
- 概要、メインコンポーネント、ガイドライン、仕様、作例で構成

### Figmaファイル

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816301/design-system-guideline/gng62bxvtodrniy0s4q3.png)

現在公開されているFigmaファイルは2系統あります。2024年5月以前のv1系ではFigma上にデザインデータとガイドラインが集約されていましたが、v2以降ではFigmaにはデザインデータのみ、Webサイトにはガイドラインという棲み分けをしていくようです。

> デザインデータ（Figma）v2系 v2.0.0以降のFigmaファイルです。本ウェブサイトのガイドラインに対応したデザインデータです。Figma Communityから取得できます。
> **デザインデータ（Figma）v1系** v1.x系統のFigmaファイルは以前のバージョンです。v1.x系統のガイドラインやコンポーネントは今後、順次v2系統に置き換えられます。

v1系のFigmaファイルでは、デザインデータとガイドラインが1つのページにまとめられています。デザイナーがコンポーネントを使用する動線上にガイドラインが載っていることで、他のツールを開くことなくガイドラインを参照しながらデザインできるメリットがあります。

また情報が分散しないため、**ミニマムな運用が求められる初期のデザインシステムの構成**として良い参考例になると思います。

### Webサイト

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725880437/design-system-guideline/kns4jtbrkyvjab4olbds.png)

Webサイトでも、Figmaにあった丁寧なガイドラインは健在のまま、そのルールに至る考え方までより丁寧に言及されています。2024年9月時点ではボタンに関する記述しかありませんが、今後のアップデートに期待が持てます。

## GitHub Primer

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725880446/design-system-guideline/j4ippce9khjdux43muzv.png)

開発者が日々お世話になっているGitHubの「Primer」というデザインシステムです。コンポーネントの網羅性が高く、GitHub自身のプロダクトに適用されているため、実例を確認しやすいデザインシステムとして私自身もよく参考にしています。

### 特徴

- **Figmaファイルはコンポーネント集ではありつつも、プロパティの説明が丁寧**
- メインコンポーネントとPROP_OVERVIEW(プロパティの一覧表)は別々に表示
- Webサイトではデザイナー向け・実装者向けのガイドラインが充実

### Figmaファイル

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816311/design-system-guideline/z4vshzndsayy2ghi6xri.png)

Figmaファイルは1ページに1種類のコンポーネントがまとめられており、各プロパティの説明が連なっています。ガイドラインのような記述はなく、**あくまでコンポーネント集としての立ち位置**になっています。

### Webサイト

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816314/design-system-guideline/toz3lfknjwbpzxj7flnn.png)

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816317/design-system-guideline/tbsxmb5h4gnqigz0ksjv.png)

Webサイトではコンポーネントを使用する上でのガイドラインが充実しています。特に`UI patterns` のページではフォームやローディング、ナビゲーションなどの複数のコンポーネントに対しての設計方針がまとめられており、似たようなコンポーネントをどう使い分けるか迷った時に見る資料として非常に参考になります。

## Ameba Spindle

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725880449/design-system-guideline/ginqf6ozegzb2jji2d1q.png)

サイバーエージェントが提供するメディアサービス「Ameba」のデザインシステムです。UIに関するリソース・ガイドラインだけでなく、パフォーマンス改善のチェックリストやAmebaのイラストシステムなども含まれています。

### 特徴

- **Figma・Webサイトの両方にガイドラインがまとまっている**
- メインコンポーネントとは別に、実際に利用しやすい形式でインスタンス化された「Sticker Sheet」という項目がある

### Figmaファイル

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816322/design-system-guideline/wa6bw3eggwaw6dqvdus9.png)

SpindleはWebサイトだけでなくFigmaファイル上にもガイドラインがまとめられているのが特徴です。これによりデザイナーがFigmaを見るだけでコンポーネントの使い方を知ることができます。

### Webサイト

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816327/design-system-guideline/omciydkf2vy5j6kpajli.png)

コンポーネントページには基本的にFigmaファイルと同じ内容が掲載されていますが、Figmaにないセクションとして、各ページの末尾にアクセシビリティの項目が用意されています。各コンポーネントごとに注意すべきアクセシビリティ項目と、それに関連する[Ameba Accessibility Guidelines](https://a11y-guidelines.ameba.design/)のリンクが併記されています。

## 各デザインシステムの構成まとめ

今回はあくまで外部公開されているリソースだけでの調査でしたが、大きなデザインシステムほどWebサイト側にガイドラインが集約されている印象がありました。

私たちのような中小規模のデザインシステムにおいては、デジタル庁デザインシステム(v1系)やSpindleなど、**Figma上にコンポーネントとガイドラインを集約**すると情報が分散せず運用しやすいと思います。

|   | Figma |   | Web |   |
| --- | --- | --- | --- | --- |
|   | コンポーネント | ガイドライン | コンポーネント | ガイドライン |
| **GitHub Primer** | ⚪︎ | - | ⚪︎ | ⚪︎ |
| **デジタル庁デザインシステム (v1系)** | ⚪︎ | ⚪︎ | - | - |
| **デジタル庁デザインシステム (v2系)** | ⚪︎ | - | △ (一部のみ) | ⚪︎ |
| **Spindle** | ⚪︎ | ⚪︎ | △ (一部のみ) | ⚪︎ |

## enechainへの反映

enechainではまずFigmaファイルを整理しました。enechainでは複数プロダクトで使用するためコンポーネントやデザイントークンだけを切り出したファイルをライブラリ化しています。

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725880443/design-system-guideline/zfxtr6twaierpnmeejb0.png)

Figmaファイル内では**各コンポーネントをセクションで区切り、タイトルや概要文、コンポーネントのプレビューなどの情報を並べる**ようにしました。

また手動での更新にはなりますが、**変更履歴を残すようにしたことでデザインの変更点をエンジニア・デザイナーが追いやすく**なりました。

### Notionでのガイドライン

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816308/design-system-guideline/tgudnglwpexsquxcs6fu.png)

一部のコンポーネントに関しては別途Notionにページを作り、ボタンのヒエラルキーのルールやフォームの使い方のOK/NG例など、より詳細な使い方のガイドをまとめています。

## まとめ

今回はFigma・Notionをより使いやすくする改善をし、現場メンバーからは喜びの声をもらえました。

![](https://res.cloudinary.com/enechain-techblog/image/upload/v1725816319/design-system-guideline/nobtleh8zfpsv47kikaf.png)

最高に利用しやすいデザインシステムを育てていくために、まだまだたくさんの課題が残っていますが、さらなる改善を続けていきます。enechainデザインシステムについてのアップデートの新しい記事をぜひ楽しみにしていてください！

enechainでは、一緒に事業を拡大していける仲間を絶賛募集中です。新しい取引と価値を一緒に作っていきたいチャレンジングなデザイナー、エンジニアの応募をお待ちしています。