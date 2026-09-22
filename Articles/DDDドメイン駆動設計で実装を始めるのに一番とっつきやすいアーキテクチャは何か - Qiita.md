---
Created: 2021-01-15T18:08:00
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
# 背景・前提

> ネット上の文献で紹介されるアーキテクチャが様々なものとなっているのです。IDDDではヘキサゴナルアーキテクチャというものが掲げられていましたが、それを進化させたオニオンアーキテクチャ、クリーンアーキテクチャなどの有名な亜種が存在します。
これが実装に着手する際に非常に大きな混乱を呼ぶのです。文脈の理解、採用するアーキテクチャの選定に時間を取られることでしょう。

と書きました。こちらに対して、私が「一番とっつきやすい」と考えるアーキテクチャを紹介します。

前提としてですが、***完全に個人的な経験に基づく私見***になります。

DDDの理論の中で、アーキテクチャに関しては[エリック・エヴァンスのドメイン駆動設計](https://www.amazon.co.jp/gp/product/4798121967/ref=as_li_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4798121967&linkCode=as2&tag=majackyy-22&linkId=7699973b1a98ab103afb5d261de7bfb1)(以下原典)と[実践ドメイン駆動設計 (Object Oriented SELECTION)](https://www.amazon.co.jp/gp/product/479813161X/ref=as_li_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=479813161X&linkCode=as2&tag=majackyy-22&linkId=aff868b58c9e780a12c6e0c21d99699d)(以下IDDD)とでも異なったものが紹介されており、唯一の正解というものは提示されていません。アーキテクチャは各プロジェクトの判断に委ねられているものであり、合う合わないはプロジェクトの要件やメンバーによって異なります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fir-jp.amazon-adsystem.com%2Fe%2Fir%3Ft%3Dmajackyy-22%26l%3Dam2%26o%3D9%26a%3D4798121967?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=3ad8f55fdc0fc2d62e137eb123aaf222)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fir-jp.amazon-adsystem.com%2Fe%2Fir%3Ft%3Dmajackyy-22%26l%3Dam2%26o%3D9%26a%3D479813161X?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=943c6b640254d9d8b60f5f6f6fb86032)

ただ、それだけではまず始める時にどう着手すればよいか迷ってしまうと思うので、*「初学者が手をつけるならこれが良いのでは」*というものを私が提案する形になります。ご了承ください。

# 候補となるアーキテクチャと、その関係性

ネットでDDDの記事を漁るとだいたい以下のものがでてくると思います。

1. レイヤードアーキテクチャ
2. ヘキサゴナルアーキテクチャ
3. オニオンアーキテクチャ
4. クリーンアーキテクチャ

これらの概略を簡単にお話しします。

# レイヤードアーキテクチャ

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F178da69e-b11a-591e-3430-128a5559ed75.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=b2c9f63ad88863e1da1ff3f080444319)

原典で紹介されているアーキテクチャ。
従来の3層アーキテクチャに比べて、Domain層を確立させ、そこにドメインロジックを凝集させよう、という発想のものです。

## ヘキサゴナルアーキテクチャ

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2Ff5c66a12-a500-a536-5805-eafcebab84ce.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=5825705035a993ff6128b48731cbadd6)

IDDDで紹介されているアーキテクチャ。別名「ポートアンドアダプターアーキテクチャ」。
元は[こちらのブログ](http://alistair.cockburn.us/Hexagonal+architecture)で2005年に提唱されたものです。

実は***「ヘキサゴナル、オニオン、クリーン」の3つは、本質的には全く同じ***です。

思想としてはこのヘキサゴナルで完成されているんですよ。責務の区切り方と名称が少しずつ違うだけなんです。じゃあ、ヘキサゴナルでいいじゃないかって？

そうです、本質的には基本的にヘキサゴナルでよいし、結果的に同じ設計をしていることになるんです。

ただし・・・・

***この図を見ても、実装イメージが湧かなくないですか？***

私はこれがポイントだと思っていて、このわかりづらさがIDDDを読んだ人が手をすぐ動かせない理由ではないかと考えているのです。

結論を変な位置でいうと、***私のオススメはオニオンアーキテクチャ***です。これは本質的には同じでも、責務の区切りと名称を変えた結果 直感的にわかりやすくなっているので、最初の導入はこの図を見ながらやるのが良いと思っています。

では、次にそちらを紹介します。

## オニオンアーキテクチャ

ヘキサゴナルアーキテクチャを受けて、2008年に[こちらのブログ](http://jeffreypalermo.com/blog/the-onion-architecture-part-1/)で提唱されたのがオニオンアーキテクチャです。

同じ構造を、平らに表現したのが以下の図です。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F81fcfd95-2ce1-82a8-db69-8618338a5f22.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0a1b02929bbc50313d2de64eba3c7494)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F843952a5-fd2e-cdd7-245d-47d95135a2af.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ef2ddbf5b165cf830a383c7e02a89c27)

少〜し、どういう構造にするのかイメージが湧いてきませんか？
詳細はこの後説明するのですが、ポイントは***依存関係逆転の原則***によってDomain層がInfrastructure層に依存しなくなっていることです。これによりDomain層のモデルが特定のライブラリなどに依存しない形の実装になるのです。

これはヘキサゴナルアーキテクチャでも全く同じ思想なのですが、概念図からはそのことが読み取りづらいのです。そのため、図を見たときの直感的なわかりやすさから、私は最初に着手するにあたってはオニオンアーキテクチャを推しています。

変な順番になってしまいましたが、比較のためにクリーンアーキテクチャも紹介します。

## クリーンアーキテクチャ

ヘキサゴナル、オニオンやその他のアーキテクチャを受けて、2013年に概念を統合しようとしたのがクリーンアーキテクチャです。[こちらのブログ](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)で提唱されました。

画像は[同ブログ](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)から引用

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2Fede07478-3be1-732a-82b3-c3558f4c9e49.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7ff56506ac2d9590c75e13a4b5b49e9b)

同じく同心円が重なっている構造からわかるように、基本的に言っていることは同じです。違いとしては単語だけだと思っています。

クリーンアーキテクチャは、Androidアプリケーションのアーキテクチャとして、DDDとは関係なく使われている記事がちらほら見受けられました。

これは全くもって好みになるのですが、「UseCase層」というレイヤに何を書くのかわかりにくい点、「Domain層」ではなく「Entity層」というネーミング(DDD的にはEntityはDomain層の一部なので、収まりが悪い)から、私はオニオンアーキテクチャの方がよいと思っています。

これがしっくり来る方はクリーンアーキテクチャのネーミングを採用すれば良いかと思います。

# アーキテクチャを使ってどう実装するのか

ドメイン層にどのようにふるまいを詰め込むのか、について、[【DDD】モデルでドメイン知識を表現するとは何か](http://little-hands.hatenablog.com/entry/2017/10/04/201201)
こちらの記事でサンプルコード付きで紹介しています。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F843952a5-fd2e-cdd7-245d-47d95135a2af.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ef2ddbf5b165cf830a383c7e02a89c27)

記事内のTaskエンティティがDomainModel、TaskRepositoryがDomainService、TaskApplicationがApplicationに該当します。
こうして見てみると、結構シンプルですし、レイヤーの名前と内容がイメージしやすいのではないでしょうか。

そういったわけで、私はDDDを最初に説明するときは、オニオンアーキテクチャと先ほどのようなサンプルコードの説明をするところから始めるようにしています。

オニオンアーキテクチャ、依存性の逆転については、また別の記事でもう少し深堀りしてみたいと思います。

# 後続記事

[ドメイン駆動 + オニオンアーキテクチャ概略](https://qiita.com/little_hand_s/items/2040fba15d90b93fc124)
こちらぜひご覧ください。

### もっと詳しく知りたい方は

初めてDDDを学ぶ方、もしくは実際に着手して難しさにぶつかっている方向けの書籍を出しました。

[ドメイン駆動設計 モデリング/実装ガイド](https://little-hands.booth.pm/items/1835632)

迷子になりがちな「DDDの目的」や「モデル」の解説からはじめ、
具体的なモデリングを行い実装まで落とす事例を元に、DDDの魅力や効果を体感することを目指します。

この本の「第5章 アーキテクチャ」では、この記事の内容をさらに詳細に解説しています。よろしければお求めください。

Twitterでも、DDDに関して発信したり、「質問箱」というサービスを通じて質問を受け付けています。こちらもよろしければフォローしてください。

[@little_hand_s](https://twitter.com/little_hand_s)