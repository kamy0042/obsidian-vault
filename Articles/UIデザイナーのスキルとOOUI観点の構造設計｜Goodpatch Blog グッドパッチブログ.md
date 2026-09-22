---
Created: 2024-04-14T16:48:00
URL: https://goodpatch.com/blog/uidesigner-skill-ooui-structure
Tags: [topic/デザイン/OOUI]
---
この記事は[Goodpatch UI Design Advent Calendar 2019](https://adventar.org/calendars/4365)の8日目の記事です。

目次 ［］

- [はじめに](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#i)
- [社内の有志のチームに参加](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#i-2)
- [3つの概念を学んだ](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#3)
    - [1. UX設計における5段階](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#1_UX5)
    - [2. ソフトウェアデザインの対象となる3つのモデル](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#2_3)
    - [3. OOUI](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#3_OOUI)
- [構造設計のフレームワーク](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#i-3)
    - [UIクラス図](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#UI)
    - [ビュー設計](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#i-4)
    - [UIクラス図からの応用](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#UI-2)
- [まとめ](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#i-5)
- [おわりに](https://goodpatch.com/blog/uidesigner-skill-ooui-structure#i-6)

## はじめに

UI デザイナーとして、スキルを伸ばす方向性を悩んだことがありますか？

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.001.jpeg?w=1600&ssl=1)

去年、私はスキルを伸ばす方向性をすごく悩みました。世の中の流れとして、UIデザイナーはUXデザイナーを目指すのが多いのに対して、私はインターフェイスアーキテクチャやインタラクションデザイン、エンジニアリングについてすごく興味があるんです。しかし、どうやってそれらのスキルを伸ばすのかは分かりませんでした。

## 社内の有志のチームに参加

その時、OOUIをはじめUIデザインを研究する有志の集まりがあって、私はそのチームに参加しました。

> 
> 【Today's Goodpatch✍️】有志で発足された、オブジェクトベースなUIデザインを研究するチームの様子をキャッチ👀上野学さんの記事をチームで読みながら、オブジェクトベースなUIデザインへの取り組み方などディスカッションが白熱していました！ [pic.twitter.com/CQdsMdt5mT](https://t.co/CQdsMdt5mT)
> 
> — Goodpatch Inc. (@GoodpatchTokyo) [November 9, 2018](https://twitter.com/GoodpatchTokyo/status/1060834444951470083?ref_src=twsrc%5Etfw)

私たちは毎週一緒に勉強したり、議論したりしました。チームに参加してから、いろんな概念を学んだり、さまざまな観点を獲得して、私のスキルは急速に成長しました。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.003.jpeg?w=1600&ssl=1)

スキルを伸ばす方向性を見つけた私は、すごく楽しく幸せです。ですから、もし私と同じく、インターフェイスアーキテクチャやエンジニアリングに興味があるなら、ご参考になればと思います。

## 3つの概念を学んだ

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.004.jpeg?w=1920&ssl=1)

私たちは、これらの本から、3つの概念を学びました。

### 1. UX設計における5段階

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.005.jpeg?w=1920&ssl=1)

1つ目は、UX設計における5段階です。

UX設計の中で必要な観点を5つの要素に分解することで、ユーザー体験全体をより深く理解することができます。抽象的なコンセプトから具体的なアウトプットまで一貫性のある体験作りにも役に立ちます。 そして、UIデザイナーは、主に構造、骨格、表層を担当します。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.006.jpeg?w=1920&ssl=1)

5段階の中でも、特に構造設計が抜け落ちてしまった場合、UX設計の全体が崩壊する恐れがあります。なぜなら、構造は、抽象から具体化に転換するための要素で、サービスの拡張性と柔軟性を考慮したUIの基礎・土台を担保する役割だからです。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.007.jpeg?w=1920&ssl=1)

そして、UIデザイナーは2つの役割に分かれていると思います。 UIの表面であるビジュアル担当と、UIの裏面であるインターフェイスアーキテクチャの担当です。私は、特にUIの裏面であるインターフェイスアーキテクチャのスキルを伸ばしたいと思いました。

### 2. ソフトウェアデザインの対象となる3つのモデル

2つ目の概念は、ソフトウェアデザインの対象となる3つのモデルです。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.008.jpeg?w=1920&ssl=1)

ソフトウェアデザインの対象は、この3つのモデルで区別できます。簡単に言うと、脳内モデルは、システムに対するユーザーの理解の仕方です。実装モデルは、システムの仕組みです。そして、表現モデルはシステムの表現方法です。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.009.jpeg?w=1920&ssl=1)

UIデザイナーの最も重要な目標の1つは、表現モデルをユーザーの脳内モデルに可能な限り一致させること、そして、エンジニアとうまく連携することです。ですから、UIデザイナーは、ユーザーがソフトウェアで行う作業についてどのように考えるかを詳しく理解することが重要ですし、エンジニアリングも理解する必要があります。

表現モデルは、表層設計と構造設計に分けることができます。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.010.jpeg?w=1920&ssl=1)

構造設計には主に原則、インタラクション、モデリングの3つの要素があります。

モデリングを行う1つの方法としては、「オブジェクト指向ユーザーインターフェイス」と呼ばれる概念を使用することです。オブジェクト指向ユーザーインターフェイスは「OOUI」と省略されます。

「OOUI」は、三つ目の概念として紹介したいと思います。

### 3. OOUI

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.011.jpeg?w=1920&ssl=1)

「オブジェクト指向ユーザーインターフェイス」を話す前に、まず、オブジェクト指向とは何かを話したいと思います。オブジェクト指向とは、ソフトウェアが**オブジェクト**の集まりとして編成され、メッセージを処理してプログラムを駆動するという考え方です。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.012.jpeg?w=1920&ssl=1)

オブジェクト指向により、ソフトウェアの操作が簡単になり、ユーザーが使いやすくなります。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.013.jpeg?w=1920&ssl=1)

なぜなら、ソフトウェアの中に、**オブジェクト**を使用すると、ユーザーは現実の世界で**オブジェクト**を整理するのと同じように、コンピューター環境で情報を整理できるからです。

ですから、現実の世界と同様に、ソフトウェアは**オブジェクト**間の関係を定義し、その役割と機能を設計する必要があります。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.014.jpeg?w=1920&ssl=1)

そして、UI要素をオブジェクトに分解することにより、ユーザーはソフトウェアを簡単にナビゲートして理解できます。これが、「オブジェクト指向ユーザーインターフェイス」を使用して設計する必要がある理由です。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.015.jpeg?w=1920&ssl=1)

OOUIはユーザーが自分の仕事を達成するため、使用する「**もの**」、**オブジェクト**にフォーカスします。例えば、お腹が空きました。UberEatsで**食べ物**を注文したいです。**食べ物**を注文する前に**レストラン**を選びます。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.016.jpeg?w=1920&ssl=1)

このようには、UberEatsのオブジェクトは、レストランと食べ物に分解することができます。

## 構造設計のフレームワーク

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.017.jpeg?w=1920&ssl=1)

ざっくり、3つの概念を紹介しました。私たちは、これら3つの概念から構造設計のフレームワークを開発しました。構造設計のフレームワークとして、UIクラス図とビュー設計を紹介したいと思います。

### UIクラス図

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.018.jpeg?w=1920&ssl=1)

オブジェクトは、クラスという概念で分類します。例えば、これらの店をレストランで分類します。それらの商品をメニューに分類します。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.019.jpeg?w=1920&ssl=1)

次に、クラス同士の関係を定義し、クラスの役割と機能を設計する必要があります。たとえば、レストランクラスには名前とメニューがあります。ユーザーはレストランをお気に入りに追加できます。メニュークラスには、写真、名前、と説明文があります。ユーザーはメニューをカートに追加できます。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.020.jpeg?w=1920&ssl=1)

そして、すべてのクラスを接続します。この図を、クラス同士の関係を示す「UIクラス図」と呼びます。

UIクラス図は、UMLのクラス図とほぼ同一の表現になりますが、Goodpatchでは独自に「UIクラス図」と呼んでいます。UMLの記法をほぼそのまま引用していますが、「ユーザーがUIで触れるだろう〈オブジェクト〉についての構造を表す」ことの目的を明らかにするために、あえてUIに関するモデル図であることを強調しています。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.021.jpeg?w=1920&ssl=1)

そして、場合によって、このようなシンプルなバージョンも作ります。

### ビュー設計

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.022.jpeg?w=1920&ssl=1)

UIクラス図を設計した後、ビューとのインタラクションを設計します。

クラスは、**コレクションビュー**と**シングルビュー**で表示することができます。簡単に言うと、一覧と詳細の意味です。ビューはユーザーに情報を提示し、ユーザーが情報を使用して目的のタスクを実行できるようにします。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.023.jpeg?w=1920&ssl=1)

次に、スクリーン（画面）の単位でビューを繋げます。

ビュー設計図は、ビュー同士のインタラクションのイメージを示し、スクリーン同士のインタラクションも示します。

そして、ビュー設計図を元に、ワイヤフレームを書くことができます。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.024.jpeg?w=1920&ssl=1)

また、同じビュー設計図を元に、Webバージョンのワイヤフレームを書くこともできます。

### UIクラス図からの応用

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.026.jpeg?w=1920&ssl=1)

UIクラス図を使用して、製品のコンバージョン設定とナビゲーションを設計することもできます。

例えば、メニューはUberEatsのコンバージョンになります。ナビゲーション設計は、ユーザーがコンバージョンするための複数のルートを提供するように設計しています。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.027.jpeg?w=1920&ssl=1)

実際見てみると、UberEatsのホームタブから、レストランを見つけることができます。

また、検索タブからカテゴリ別のレストランを見つけることもできます。そして、注文タブから過去の注文履歴を確認できます。四つのタブの中、三つのタブからレストランに辿り着くことができます。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.028-1.jpeg?w=1920&ssl=1)

以上が構造設計のフレームワークです。このフレームワークを使えば、構造設計を高いクオリティで素早く実現できます。

## まとめ

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.029.jpeg?w=1920&ssl=1)

この3つの概念を紹介しました。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.030.jpeg?w=1920&ssl=1)

UX設計における5段階の中、特に構造が良くない場合、UX設計の全体が崩壊する恐れがあります。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.031.jpeg?w=1920&ssl=1)

そこで、UIクラス図とUIモデリングのフレームワークを開発し、構造設計を高いクオリティで素早く実現できるようになりました。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.032.jpeg?w=1920&ssl=1)

UIデザイナーの最も重要な目標の1つは、表現されたモデルをユーザーの脳内モデルに可能な限り一致させることと、エンジニアとうまく連携することです。

![](https://i0.wp.com/cms.goodpatch.com/wp-content/uploads/2019/12/UI-Designer-Skill-OOUI.033.jpeg?w=1920&ssl=1)

そして、UI要素をオブジェクトに分解することにより、ユーザーはソフトウェアを簡単にナビゲートして理解できます。「オブジェクト指向ユーザーインターフェイス」を使用して設計する必要がある理由です。

## おわりに

本記事が私のようなインターフェイスアーキテクチャやエンジニアリングのスキルを伸ばしたい方のご参考になれば嬉しいです。また、インターフェイスアーキテクトについて詳しく知りたければ、こちら「[UIデザインにおけるインターフェイスアーキテクトの役割](https://goodpatch.com/blog/ui-interface-architect/)」をご覧ください。

Goodpatchのクライアントワークでは**UIクラス図を描くデザイナー**、**オブジェクト指向を実践するデザイナー**が多く活躍しています。

また、Goodpatchではインターフェイスアーキテクチャをはじめ、UIデザインに関わるさまざまな領域で活躍したいデザイナーも随時募集しております。もしご興味ありましたらこちらから応募くださいませ。お待ちしております。