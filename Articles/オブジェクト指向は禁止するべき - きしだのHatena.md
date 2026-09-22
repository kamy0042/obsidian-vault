---
Created: 2021-01-21T08:56:00
URL: https://nowokay.hatenablog.com/entry/20140718/1405691217
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
プログラムがまだ不慣れな人が「プログラムちょっとわかるようになったけど、まだぜんぜん[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)とかできてません」のように言ったり、ちょっと慣れた人が「このソース、ぜんぜんだめ。[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)ができてない」にようなことを言ったり、まるで、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)ができてるかどうかがよいプログラムかどうかを表すことになってるようだ。[Java](http://d.hatena.ne.jp/keyword/Java)の[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)の本に、「[Java](http://d.hatena.ne.jp/keyword/Java)なのに[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)ができていない」のような書評がついているのを見たときには、お前は何を求めてるんだと思ったりもした。

そのような[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)は、窓から投げ捨てるべきだ。[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)はプログラムのよしあしの基準にならない。

むだに[Hoge](http://d.hatena.ne.jp/keyword/Hoge)インタフェースとHogeImplクラスがあったり、むだにnewするだけのcreateメソッドがあったり、どこで値が設定されてるかわからないオブジェクトがひきまわされてたり、[ソースコード](http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9)を追いにくくするためにやってるとしか思えない、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)なコードをよく目にする。
 こういうコードはかなり困る。

こんなのもあった。[オブジェクト指向できていますか？](http://www.slideshare.net/MoriharuOhzu/ss-14083300)
 「理想的な[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の世界とは、小さな大量のオブジェクトがお互いメッセージを送りながら協調し複雑なシステムを構築する。各クラスは、１つの機能に集中し、最小限のインターフェースで構成されています。」
 だそうだ。
 とてもすばらしい世界だけど、プログラム組むときには忘れたほうがいい。[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)迷路ができるだけだ。

こんなことだから「[オブジェクト指向でコーディングするとinterfaceやAbstractなど記載量とファイル数が増え、工数が増大すると思います。](http://oshiete.goo.ne.jp/qa/8220451.html)」などと素朴に言われたり、「[プログラマがすることといえば、自分の手であり得ないほど複雑に加工してしまった、神聖なるAPIに対してだけは責任を持つと声高に主張することです。その割には、ほとんどうまく機能しませんが](http://postd.cc/why-bad-scientific-code-beats-code-following-best-practices/)」などと言われるのです。

もう、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)は禁止したほうがいい。人類には早すぎたのだ。

ここで、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)が禁止なら継承もできないのか、のように、裏返せば継承つかったら[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)のような認識であるなら、メイヤーの「[オブジェクト指向入門](http://d.hatena.ne.jp/asin/4798111112/kishidassite-22)」２冊を隅から隅まで読んで出直すべきだ[*1](https://nowokay.hatenablog.com/entry/20140718/1405691217)。

クラスは単にユーザー定義型であり、継承は部分型と差分プログラミングを実現する仕組みだととらえるのがいい。
 オブジェクトがメッセージを送りあうとかメルヘンの世界には入らず、機能だけ考えるのがいい。

コードの基準としても機能的なものをまず考えたほうがいい。
 一番大事な基準は、変数の数だと思う。プログラムは、引数やフィールドも含めて、変数の数が少ないほうがえらい。
 ただしここで、再代入のない、状態変更もないローカル変数はカウントしない。
 再代入や状態変更がない変数を除くと、残る変数は状態を管理するものになる。プログラムにおいて、管理する状態が少なければ少ないほどえらい。
 残りの指標はあとでついてくる。必然的にコードの重複も減り長さも短くなる。コードの複雑さも減る。

ここで、変数の数やコードの長さに大差ない、数とおりの書き方があって迷ったときに初めて、責務や凝集度のような指標でコードの指針をえらぶ。
 つまり、「責務としてはこっちだけど、コードが単純になるからこのコード」は許されるけど「コードは複雑になるけど、責務としてはこのクラスに書くべきだからこのコード」というのはほとんどの場合よくないコードになる。

そのように、複雑度を下げることを指標としてプログラムを書いていると、「[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)する」という感覚にはならない。単にプログラム言語と向き合うだけになる。
 ただ、ここに書いているようなプログラムへのストイックな向き合い方は、プログラムに不慣れな人には難しい。責務や粒度のようなファンタジックな指標のほうが、なじみやすいと思う。けれど、そのようにプログラムに不慣れな人にファンタジックな指標を与えても、ファンタ[ジー](http://d.hatena.ne.jp/keyword/%A5%B8%A1%BC)あふれた夢の城のような無駄の多いプログラムができるだけだ。

プログラムに慣れた人は[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)する必要がなく、プログラムに不慣れな人が[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)すると全力で迷路を構築してしまう。
 かくして、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)は禁止するべき、という結論になる。

ところで、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)入門、この本は、ぜんぜん[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)してない。1800ページもあるし、ある程度は[型理論](http://d.hatena.ne.jp/keyword/%B7%BF%CD%FD%CF%C0)とかを知らないと読みにくいという点では入門でもない。オブジェクト機能をもつ[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)についていろいろな角度から説明した本で、興味あるとこだけ読んでもおもしろい。厚みもかなりあるので、夏休みの昼寝の枕におすすめ。

[オブジェクト指向入門 第2版 原則・コンセプト (IT Architect’Archive クラシックモダン・コンピューティング)](http://www.amazon.co.jp/exec/obidos/ASIN/4798111112/kishidassite-22/)

![[41A2yC7UpOL._SL160_.jpg]]

[オブジェクト指向入門 第2版 方法論・実践 (IT Architects' Archiveクラシックモダン・コンピューティング)](http://www.amazon.co.jp/exec/obidos/ASIN/4798111120/kishidassite-22/)

![[41sGZmUVCNL._SL160_.jpg]]

※2017/4/13 追記
 こちらの書籍の「[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)は[まぼろし](http://d.hatena.ne.jp/keyword/%A4%DE%A4%DC%A4%ED%A4%B7)か？」という記事で、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)の歴史的な流れから、どのように[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)は使われなくなったかということを書いています。