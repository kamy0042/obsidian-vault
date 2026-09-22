---
Created: 2024-09-06T01:33:00
URL: https://nowokay.hatenablog.com/entry/2021/09/25/042831
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
定期的に[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)disを書いてしまってるのだけど。

とりあえず[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の話をすると定義が人によって違いすぎるので、改めてここでの定義を書いておくと 、基本的には[OMT](https://www.amazon.co.jp/dp/4810185273?tag=kishidassite-22&linkCode=ogi&th=1&psc=1)の「データ構造と振る舞いが一体となったオブジェクトの集まりとしてソフトウェアを組織化すること」 に従うのですが

「1990年に流行りソフトウェア開発のすべてを飲み込み、いまとなっては人それぞれ定義が違って技術的議論に使えなくなった、主にオブジェクトを基本単位としてプログラムを整理するやりかたを指す[マーケティング](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%B1%A5%C6%A5%A3%A5%F3%A5%B0)用語」

という感じです。

ほとんどの場合で人によって[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の指す範囲が違いすぎて、技術的知見の共有には使えなくなっています。でも、いずれの定義にしろオブジェクトを基本単位にするというのは重要ではないかと。

ソフトウェアの組織化の単位としてオブジェクトを使うというのが大事で、データの搬送に構造体代わりのクラス使うくらいで[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)っておおげさに言う必要ないと思ってます。

なので、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)いらないと書いたときに「大きいプログラム作らなければそれでいいんでは」みたいなコメントつくけど、「大きいプログラムつくるときにオブジェクトを基本にする必要なくない？オブジェクトを基本にすることほとんどなくない？」となります。

あと、「オブジェクトを使わなくても[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の考え方は使える」みたいなツッコミが入ることあるけど「オブジェクト使わないなら[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)って名前で議論する必要なくない？それ[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)関係なく[ソフトウェア工学](http://d.hatena.ne.jp/keyword/%A5%BD%A5%D5%A5%C8%A5%A6%A5%A7%A5%A2%B9%A9%B3%D8)の話では」ってなります。

[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)が流行ったときは、分析設計で出てきた要素をコーディングでもそのまま使えるというのが大きな宣伝文句でした。

ソフトウェア部品の再利用をするときに、オブジェクトを単位として販売するというのも見込まれていました。それで販売されたのは結局は画面部品だけだったので、[ビジネスロジック](http://d.hatena.ne.jp/keyword/%A5%D3%A5%B8%A5%CD%A5%B9%A5%ED%A5%B8%A5%C3%A5%AF)を組織をまたがって再利用できるようにするというのを目指したのが[EJB](http://d.hatena.ne.jp/keyword/EJB)([Enterprise JavaBeans](http://d.hatena.ne.jp/keyword/Enterprise%20JavaBeans))でもありました。でも[ビジネスロジック](http://d.hatena.ne.jp/keyword/%A5%D3%A5%B8%A5%CD%A5%B9%A5%ED%A5%B8%A5%C3%A5%AF)を再利用する部品として[EJB](http://d.hatena.ne.jp/keyword/EJB)が商売になることはありませんでしたね。

結局のところ、ソフトウェアの部品を組織をまたがって再利用する方法としてはWeb [API](http://d.hatena.ne.jp/keyword/API)が主流になっています。

組織内でソフトウェアを管理しやすいように分類するときも、オブジェクトを基本として考えるのではなくて、マイクロサービスとしてサーバごと分離してWeb [API](http://d.hatena.ne.jp/keyword/API)経由で結合することが主になっています。

つまり、ソフトウェアの記述をどうまとめるかというレイヤーで管理するのではなく、サービスとして管理するようになっています。

これは[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)のあとに現れた[SOA](http://d.hatena.ne.jp/keyword/SOA)(サービス指向[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3))が、ようやく形になったとも言えます。ただ、すでにCORBAみたいな分散オブジェクトというのは忘れられていて、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)はベースになっておらずHTTPがベースになりました。

追記：ライブラリとして共有されてるのでは、という指摘をもらっていて、確かにその通りなのだけどうまくこの話の筋に組み込めてない・・・

追記続き：クラスを使ったライブラリは[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)なのかというと、またそれは別の話だけど、本筋から外れるので、ここでは「クラスライブラリ=[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)」ではない、とだけ書いておきます

[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)がなぜソフトウェア部品の共[通化](http://d.hatena.ne.jp/keyword/%C4%CC%B2%BD)流[通化](http://d.hatena.ne.jp/keyword/%C4%CC%B2%BD)で使われなかったかというと、ソフトウェアのバージョンアップやメンテナンス、運用といったソフトウェアライフサイクルを管理する視点が欠けていたからだと思います。

そういったライフサイクルまで含めてマイクロサービスとして管理されるようになりました。

サービス管理の細分化を推し進めて、ラムダとかファンクションという単位でサーバレスとして配備するようにもなっています。

そうするともうソフトウェアの記述としてはオブジェクトという単位は大きすぎて、関数という単位で管理すれば十分ということにもなります。

ソフトウェアの記述をまとめるという視点では主にステートレスな関数を分類できれば充分で、データと振る舞いをまとめたオブジェクトというのは大きすぎる、システムを分割して管理しやすくするという視点ではオブジェクトというのはライフサイクルやリソース管理の視点が足りず小さすぎる、ということで、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の粒度でのソフトウェア管理は出番がなくなっているのではないか、と思います。

「[オブジェクト指向でなぜつくるのか](https://www.amazon.co.jp/dp/B092HDFJKK?tag=kishidassite-22&linkCode=ogi&th=1&psc=1)」という本がありますが、「え、いまどき[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)でつくらなくない？」っていつも思います。内容的には、もうほとんどは[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)関係ない[ソフトウェア工学](http://d.hatena.ne.jp/keyword/%A5%BD%A5%D5%A5%C8%A5%A6%A5%A7%A5%A2%B9%A9%B3%D8)の紹介になっていますね。発祥が[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)ならオブジェクトが関係なくてもそれは[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)だ、みたいな考えの本です。「[ソフトウェア工学](http://d.hatena.ne.jp/keyword/%A5%BD%A5%D5%A5%C8%A5%A6%A5%A7%A5%A2%B9%A9%B3%D8)でなぜつくるのか」って名前変えればいいのだけど、それでは売れないんでしょう。

[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)が流行ったときに、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)方法論というのが流行って、いろいろな方法論をつくってそれをベースにコンサルするというのが流行りました。とにかく[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)と名前をつけておけばコンサル料が取れるという感じだったのだと思います。

いまでも書籍に「[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)」とタイトルにつければ売れるということで、まあ結局、昔も今も、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)は技術用語ではなく[マーケティング](http://d.hatena.ne.jp/keyword/%A5%DE%A1%BC%A5%B1%A5%C6%A5%A3%A5%F3%A5%B0)用語なんでしょうね。

もしソフトウェアをうまく作る方法として「[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)」を勉強したいと思ったら、その知りたいことは実際には[ソフトウェア工学](http://d.hatena.ne.jp/keyword/%A5%BD%A5%D5%A5%C8%A5%A6%A5%A7%A5%A2%B9%A9%B3%D8)という分野でまとまっているので、そういったタイトルの本を読むのがいいと思います。

![](https://m.media-amazon.com/images/I/41seG-k8XzL._SL500_.jpg)

![](https://m.media-amazon.com/images/I/51-zrGba3RL._SL500_.jpg)

エルディンガーのアルコールフリー、レモン

ビールにレモンの酸味と小麦の甘みがいい感じに混ざっておいしい。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nowokay/20210920/20210920185331.png)

瓶に「リフレッシュにピッタリな1本です」って書いてあるとおり、食事と一緒に飲むよりは休憩時間に飲むとよさそう。

なので今回はパスタと一緒ではない。

原材料は「小麦[麦芽](http://d.hatena.ne.jp/keyword/%C7%FE%B2%EA)、大麦[麦芽](http://d.hatena.ne.jp/keyword/%C7%FE%B2%EA)、ホップ、[酵母](http://d.hatena.ne.jp/keyword/%B9%DA%CA%EC)」といったエルディンガーに「果糖、レモン果汁、レモンエキス、[アセロラ](http://d.hatena.ne.jp/keyword/%A5%A2%A5%BB%A5%ED%A5%E9)果汁」を混ぜたものになってる。

アルコール度数は0.2%。エルディンガーアルコールフリーが0.4%なので、少し薄まっている。

MARUKUから6本単位で買えます。

[大人の味わい エルディンガー アルコールフリー レモン330ml ボトル – MARUKU](https://maruku09.com/collections/non-alcoholic-beer/products/nb0002)

1本あたり286円

アマゾンではここから選べるけど在庫切れ

[エルディンガー (世界トップクラスの小麦ビールブランド) アルコールフリー レモンフレーバー ボトル (ノンアルコール ドイツ) [ ノンアルコール 330ml×24本 ]](https://www.amazon.co.jp/exec/obidos/ASIN/B0876QDBGZ/kishidassite-22/)

![](https://m.media-amazon.com/images/I/51mZlZPNTJL._SL500_.jpg)

[エルディンガー (世界トップクラスの小麦ビールブランド) アルコールフリー レモンフレーバー ボトル (ノンアルコール ドイツ) [ ノンアルコール 330ml×24本 ]](https://www.amazon.co.jp/exec/obidos/ASIN/B0876QDBGZ/kishidassite-22/)

- エルディンガー

他のノンアルビールについてはこちら。

[常陸](http://d.hatena.ne.jp/keyword/%BE%EF%CE%A6)野ネストのノンアル

日本の低アルコールビールでいちばんうまい

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nowokay/20210919/20210919171339.png)

おいしい。エールの味がする。

苦めで、ホップの香りもしっかりあって、[クラフトビール](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%D5%A5%C8%A5%D3%A1%BC%A5%EB)感があります。

わかりやすく言うと [よなよなエール](http://d.hatena.ne.jp/keyword/%A4%E8%A4%CA%A4%E8%A4%CA%A5%A8%A1%BC%A5%EB)のノンアル版。実際には[常陸](http://d.hatena.ne.jp/keyword/%BE%EF%CE%A6)野ネスト [ペールエール](http://d.hatena.ne.jp/keyword/%A5%DA%A1%BC%A5%EB%A5%A8%A1%BC%A5%EB)のノンアル版というのがいいのだろうけど、伝わりやすさ・・・

ノンアルコールというにはちょっとアルコール高めの0.3%

原材料は[麦芽](http://d.hatena.ne.jp/keyword/%C7%FE%B2%EA)(外国製造)、ホップと炭酸です。

[常陸野 ノン・エール 330ml×24本 茨城県 木内酒造 ビール クラフトビール ビールテイスト飲料](https://www.amazon.co.jp/exec/obidos/ASIN/B01BY40BZY/kishidassite-22/)

![](https://m.media-amazon.com/images/I/41f7hQUmiXL._SL500_.jpg)

[常陸野 ノン・エール 330ml×24本 茨城県 木内酒造 ビール クラフトビール ビールテイスト飲料](https://www.amazon.co.jp/exec/obidos/ASIN/B01BY40BZY/kishidassite-22/)

- [常陸](http://d.hatena.ne.jp/keyword/%BE%EF%CE%A6)野ネスト

[Amazon](https://www.amazon.co.jp/exec/obidos/ASIN/B01BY40BZY/kishidassite-22/)

1本あたり240円ですね。

他のノンアルビールについてはこちら。

> 常陸野ネスト ノン・エール
> おいしい！これはエール
> 
> 苦味とかホップの匂いとか、[クラフトビール](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%D5%A5%C8%A5%D3%A1%BC%A5%EB)ぽさもありとてもいい。
> 
> わかりやすく言えば [よなよなエール](http://d.hatena.ne.jp/keyword/%A4%E8%A4%CA%A4%E8%A4%CA%A5%A8%A1%BC%A5%EB)のノンアル版
> 
> ただ、ノンアルというにはアルコール度数高いか。0.3% [pic.twitter.com/yYVoRM3c4p](https://t.co/yYVoRM3c4p)
> 
> [2021年9月19日](https://twitter.com/kis/status/1439495322305105924?ref_src=twsrc%5Etfw)

イタリアビール、[モレッティ](http://d.hatena.ne.jp/keyword/%A5%E2%A5%EC%A5%C3%A5%C6%A5%A3)のノンアル

カートに行くときに早起きしたら @at_tun さんがごほうびにくれた。ありがとう！

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nowokay/20210918/20210918174325.png)

0.0%という表記だけど実際には0.05%らしい。 [クリーミー](http://d.hatena.ne.jp/keyword/%A5%AF%A5%EA%A1%BC%A5%DF%A1%BC)で、アロマの匂いがして、ビールでいうと[エーデルワイス](http://d.hatena.ne.jp/keyword/%A5%A8%A1%BC%A5%C7%A5%EB%A5%EF%A5%A4%A5%B9)のような味です。

原材料は水・[麦芽](http://d.hatena.ne.jp/keyword/%C7%FE%B2%EA)・ホップ・アロマ

[モレッティ](http://d.hatena.ne.jp/keyword/%A5%E2%A5%EC%A5%C3%A5%C6%A5%A3)ビールにはコーンが入っているので、[モレッティ](http://d.hatena.ne.jp/keyword/%A5%E2%A5%EC%A5%C3%A5%C6%A5%A3)ゼロにもコーンが入ってるかなと思いきや、入ってないようです。

だいたいすぐ品切れになるのだけど、飲み比べセットに入ってるものがありますね。

[世界のノンアルコールビール6本 飲み比べギフトセット 【ビットブルガードライブ、サグレスゼロ、エルディンガー、エストレーリャガリシア0.0 モレッティゼロ】 専用ギフトボックスでお届け](https://www.amazon.co.jp/exec/obidos/ASIN/B00OT1IWY2/kishidassite-22/)

![](https://m.media-amazon.com/images/I/51LwJ7iM4ML._SL500_.jpg)

[世界のノンアルコールビール6本 飲み比べギフトセット 【ビットブルガードライブ、サグレスゼロ、エルディンガー、エストレーリャガリシア0.0 モレッティゼロ】 専用ギフトボックスでお届け](https://www.amazon.co.jp/exec/obidos/ASIN/B00OT1IWY2/kishidassite-22/)

- Beer Earth

[Amazon](https://www.amazon.co.jp/exec/obidos/ASIN/B00OT1IWY2/kishidassite-22/)

2021/10/6 ここで買えます

[https://item.rakuten.co.jp/tartaruga/653924/](https://item.rakuten.co.jp/tartaruga/653924/)

0.05%がどのくらいのアルコールかというと、グレープフルーツ程度、みかん未満という感じか。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nowokay/20210918/20210918175030.png)

[https://www.jstage.jst.go.jp/article/shokueishi1960/33/6/33_6_619/_pdf](https://www.jstage.jst.go.jp/article/shokueishi1960/33/6/33_6_619/_pdf)

他のノンアルビールについてはこちら。

> モレッティゼロ
> うめぇー！
> 
> アロマはいって香りがよい。[エーデルワイス](http://d.hatena.ne.jp/keyword/%A5%A8%A1%BC%A5%C7%A5%EB%A5%EF%A5%A4%A5%B9)のような感じ。
> 
> 原材料は水、[麦芽](http://d.hatena.ne.jp/keyword/%C7%FE%B2%EA)、ホップ、アロマ [pic.twitter.com/Ik26fHtcXe](https://t.co/Ik26fHtcXe)
> 
> [2021年9月18日](https://twitter.com/kis/status/1439140367178240007?ref_src=twsrc%5Etfw)

書籍とかのサンプルコードをそのまま入力して勉強することを「写経」というけども、それを言い出したのは角谷さん、というメモ。

写経は言葉ではなく心で理解するのが大事。

> 2004-2005頃に @t_wada と働いていた頃、サンプルコードをコピペでなく手打ちすることを「写経」と呼んでました。和田さんが以前の現場に通いながら"TDD by Example"のサンプルコードを「祈るような気持ち」で手打ちしていたというエピソードを形容して「写経ですね」と呼んだのが始まりだったような…
> [2021年9月18日](https://twitter.com/kakutani/status/1439084691768840194?ref_src=twsrc%5Etfw)

恐らく2005年7月ごろではないかと思われる。

[この夏は写経が来るね, 地震が来た - 角谷HTML化計画(2005-07-23)](https://kakutani.com/20050723.html#p01)

角谷さんのブログでの初出も7/15だけど、babieさんのコメントを見るとこの時期にまわりで語ってたことを推しはかることができる。

[『カンフーハッスル コレクターズ・エディション』, 『ふつうのLinuxプログラミング Linuxの仕組みから学べるgccプログラミングの王道』 - 角谷HTML化計画(2005-07-15)](https://kakutani.com/20050715.html#p02)

このころ角谷さんはPofEAA読書会などたくさんの勉強会を主催していたので、そこで広めていたんじゃないだろうか。そもそも「勉強会」という言葉も定着させてないか？

t_wadaの「以前の現場に通いながら」という話はここで語られてる。

[第 43 回 和田卓人 さんの巻 | オブジェクトの広場](https://www.ogis-ri.co.jp/otc/hiroba/others/OORing/interview43.html)

> t_wadaがTDD by Exampleのコードを手打ちして「言葉ではなく心で理解できた」エピソードはこれかー。https://t.co/OHDJqm5Y6C pic.twitter.com/JYO4kVleQw
> [2021年9月18日](https://twitter.com/kis/status/1439092091238305794?ref_src=twsrc%5Etfw)

[Java](http://d.hatena.ne.jp/keyword/Java)には関数型インタフェースがたくさん用意されてるのだけど、なにがあってなにがないのかとかわかりにくいのでまとめている。

ここの最後にまとめていたのだけど、検索しづらいので独立させた

[https://nowokay.hatenablog.com/entry/20130824/1377300917](https://nowokay.hatenablog.com/entry/20130824/1377300917)

しかし見れたもんじゃないな・・・

下のほうに再掲

| 第一引数 | 第二引数 | void | int | long | double | boolean | object R | (T=U=R) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|   |   | **Runnable** | IntSupplier | LongSupplier | DoubleSupplier | BooleanSupplier | **Supplier** |   |
| int |   | IntConsumer | IntUnaryOperator | IntToLongFunction | IntToDoubleFunction | IntPredicate | **IntFunction** |   |
| int | int |   | IntBinaryOperator |   |   |   |   |   |
| long |   | LongConsumer | LongToIntFunction | LongUnaryOperator | LongToDoubleFunction | LongPredicate | LongFunction |   |
| long | long |   |   | LongBinaryOperator |   |   |   |   |
| double |   | DoubleConsumer | DoubleToIntFunction | DoubleToLongFunction | DoubleUnaryOperator | DoublePredicate | DoubleFunction |   |
| double | double |   |   |   | DoubleBinaryOperator |   |   |   |
| ObjectT |   | **Consumer** | ToIntFunction | ToLongFunction | ToDoubleFunction | **Predicate** | **Function** | UnaryOperator |
| ObjectT | ObjectU | BiConsumer | ToIntBiFunction | ToLongBiFunciton | ToDoubleBiFunction | BiPredicate | **BiFunction** | BinaryOperator |
| ObjectT | int | ObjIntConsumer |   |   |   |   |   |   |
| ObjectT | long | ObjLongConsumer |   |   |   |   |   |   |
| ObjectT | double | ObjDoubleConsumer |   |   |   |   |   |   |

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

・

| 第一引数 | 第二引数 | void | int | long | double | boolean | object R | (T=U=R) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|   |   | **Runnable** | IntSupplier | LongSupplier | DoubleSupplier | BooleanSupplier | **Supplier** |   |
| int |   | IntConsumer | IntUnaryOperator | IntToLongFunction | IntToDoubleFunction | IntPredicate | **IntFunction** |   |
| int | int |   | IntBinaryOperator |   |   |   |   |   |
| long |   | LongConsumer | LongToIntFunction | LongUnaryOperator | LongToDoubleFunction | LongPredicate | LongFunction |   |
| long | long |   |   | LongBinaryOperator |   |   |   |   |
| double |   | DoubleConsumer | DoubleToIntFunction | DoubleToLongFunction | DoubleUnaryOperator | DoublePredicate | DoubleFunction |   |
| double | double |   |   |   | DoubleBinaryOperator |   |   |   |
| ObjectT |   | **Consumer** | ToIntFunction | ToLongFunction | ToDoubleFunction | **Predicate** | **Function** | UnaryOperator |
| ObjectT | ObjectU | BiConsumer | ToIntBiFunction | ToLongBiFunciton | ToDoubleBiFunction | BiPredicate | **BiFunction** | BinaryOperator |
| ObjectT | int | ObjIntConsumer |   |   |   |   |   |   |
| ObjectT | long | ObjLongConsumer |   |   |   |   |   |   |
| ObjectT | double | ObjDoubleConsumer |   |   |   |   |   |   |