---
タグ: []
作成日時: 2022-01-12T13:46:00
URL: https://uxdaystokyo.com/articles/glossary/design-system/
Tags: [topic/デザインシステム]
---
デジタルプロダクトの作成に関するあらゆるルールやツールをまとめて体系化したもの。組織にとって唯一の指針であり、デザインの設計・実装の基盤となる。

以下がデザインシステムの構成要素の一例である。これらを組み合わせて構成される。全て必要という訳ではなく、組織によって最適な構成を選択する。

- スタイルガイド
- コンポーネントライブラリ(コードで実装されたUI要素)
- 共通の用語
- デザイン原則・デザインガイドライン
- パターンライブラリ
- UIキット
- Voice & Tone（文章・文言のトーン）
- 情報設計
- コンテンツ原則
- 分類方法
- アクセシビリティ
- ブランドガイドライン

![[design-system-definition.png]]

## デザインシステムの利点

デザインシステムを入れることでいくつかのメリットがある。ここでは5つのメリットを紹介する。

### 一貫性のあるUIを容易に実装できる

機能やページをコンポーネントの集合体と考えることができるため、要素それぞれのデザインについて考慮しなくても、役割によって一貫した動作・見た目のUIを容易に実装できる。

例：開発者がボタンを実装する場合、デザインシステムでは、色や書体や余白を一つ一つ考え実装するのではなく、このボタンは単なるプライマリーボタン（第一優先度のボタン）であると理解し、複数のページで同一のボタンコンポーネントを使用する。

### 高品質の印象を与える

一貫性があるUIは高品質の印象を与える。品質保証の面でも、デザインシステムのドキュメントを使用して、実装されたデザインに一貫性があるかどうか簡単にチェックできるため、品質向上につながる。

### チームコミュニケーションを最善化できる

デザインシステムは、チームにおける唯一の情報源(Single Source of Truth)であることが条件の上、デザインシステムを確認することでルールが把握でき、プロダクトにおける一貫性の維持とデザイン・設計の迅速化・効率化に役立つ。

また、プロジェクトで使用される語彙の定義もデザインシステムに含まれているため、開発者とデザイナーがデザイン要素について議論する際に、認識の齟齬を防ぐことができる。

### 設計プロセスを高速化できる

新しい機能やページを作成する際にも、すでにあるデザインシステムのパターンライブラリやコンポーネントライブラリを利用することで、設計プロセスを高速化できる。

UIのライブラリをゼロから構築するには時間がかかるが、一旦構築してしまえば新しい機能のUIを作成する場合においても時間を短縮することができる。

### 見た目ではなくUXに集中して設計できる

一貫した動作や見た目を持つUIコンポーネントを利用することで、ユーザーの学習コストを下げることができる。また、開発現場においても、より良いユーザビリティとUXの設計に集中することができる。

## 代表的なデザインシステム

デザインシステムの紹介サイト[Adele by UXPin](https://adele.uxpin.com/)にて、実際に各社で利用・運用されているデザインシステムが多く紹介されている。中でも代表的なデザインシステムを紹介する。

- [Material Design](https://material.io/) (Google)
- [Fluent design system](https://uxdaystokyo.com/articles/glossary/fluent-design-system/) (Microsoft)
- [Lightning Design System](https://lightningdesignsystem.com/) (Salesforce)

## アトミックデザインとデザインシステムの関係

デザインシステムの構築のための設計手法のひとつに[Atomic Design](https://uxdaystokyo.com/articles/glossary/atomic-design/)がある。アトミックデザインは、化学のメタファーを用いて階層と粒度を定義したもので、直感的に推測しやすい階層の分類によって、チームでデザインシステムを構築するときにイメージを共有しやすいことが利点である。

## プロダクトとして育てる

デザインシステムは、システムに含まれるドキュメントやコンポーネントといった部品を利用してもらうことに価値がある。内容や構成物に関わらず、作り切ったら終わりというものではない。

デザインシステムは、1度作り終わった後も運用し続けていくもので、単なるドキュメント・ツール群とみなすのではなくプロダクトとして育てていくものである。

## 関連用語

## 参考文献

- [Design Systems ―デジタルプロダクトのためのデザインシステム実践ガイド, Alla Kholmatova (2018)](https://www.amazon.co.jp/dp/B07PTXXK1S/)

## 参考リンク

- [デザインシステム、パターンライブラリ、スタイルガイドそれぞれの定義と違い](https://uxmilk.jp/69278)
- [What is a Design System – Everything You Need to Know](https://uxmisfit.com/2019/03/26/what-is-a-design-system-everything-you-need-to-know/)
- [A Design System isn’t a Project. It’s a Product, Serving Products.](https://medium.com/eightshapes-llc/a-design-system-isn-t-a-project-it-s-a-product-serving-products-74dcfffef935)
- [Design systems, style guides, pattern libraries. What the hell is the difference?](https://product-unicorn.com/design-systems-style-guides-all-those-libraries-what-the-hell-is-the-difference-4c2741193fdc)