---
タグ: []
作成日時: 2023-11-13T14:24:00
URL: https://momdo.hatenablog.jp/entry/20231112/1699762351
Tags: [topic/アクセシビリティ/WCAG]
---
[LINEヤフーにおけるこれからのアクセシビリティ](https://speakerdeck.com/lycorptech_jp/fukuoka-a11yconf-ly-corpration)というスライドで「WCAGはハードルが高い」という文言を見かけました。どうしてハードルが高い、言いかえるならば難しいとされるのか、その難しさはどこから来るのかをちょっと深掘りしてみようと思います。

[LINEヤフーにおけるこれからのアクセシビリティ](https://speakerdeck.com/lycorptech_jp/fukuoka-a11yconf-ly-corpration)

by [LY Corporation Tech](https://speakerdeck.com/lycorptech_jp)

WCAGという言葉について、改めて見ておきましょう。WCAGはもっぱら、Web Content Accessibility Guidelines（ウェブコンテンツ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)[ガイドライン](https://d.hatena.ne.jp/keyword/%A5%AC%A5%A4%A5%C9%A5%E9%A5%A4%A5%F3)）という[W3C](https://d.hatena.ne.jp/keyword/W3C)の発行する技術文書を指すわけですけども、現時点でよく参照されるのが[ウェブアクセシビリティ基盤委員会（WAIC）](https://waic.jp/)が公開している日本語訳の[WCAG 2.1](https://waic.jp/translations/WCAG21/)でしょう。ちなみに本家の[W3C](https://d.hatena.ne.jp/keyword/W3C)は、WAICが現時点で公開している[WCAG 2.1](https://www.w3.org/TR/2023/REC-WCAG21-20230921/)の改訂版を今年9月に公開し、さらにバージョンの進んだ[WCAG 2.2](https://www.w3.org/TR/2023/REC-WCAG22-20231005/)を先月に発行したばかりだったりします。

WCAG 2.1だったり2.2だったり、あるいはWCAG 2.0というような2系列のものをひっくるめて、WCAG 2と呼ぶことがあります[*1](https://momdo.hatenablog.jp/entry/20231112/1699762351#f-d3cc36a7)。そのWCAG 2とは別に、WCAG 3.0[*2](https://momdo.hatenablog.jp/entry/20231112/1699762351#f-8bf5fb15)という[ガイドライン](https://d.hatena.ne.jp/keyword/%A5%AC%A5%A4%A5%C9%A5%E9%A5%A4%A5%F3)を[W3C](https://d.hatena.ne.jp/keyword/W3C)は開発しようとしています[*3](https://momdo.hatenablog.jp/entry/20231112/1699762351#f-4ac8b274)。

このWCAG 3.0の開発にあたって、Silver Task Force[*4](https://momdo.hatenablog.jp/entry/20231112/1699762351#f-359ddc57)は、2017年から2018年にわたりWCAG 2にどのような問題があるのかの研究・調査を行いました[*5](https://momdo.hatenablog.jp/entry/20231112/1699762351#f-67684daf)。その調査結果のサマリーが[Googleスライド](https://docs.google.com/presentation/d/1POs7orJ4ALB0bq5_vyo4v8RxDcr-5ctwD1noVgpXuJc/edit#slide=id.gc6f73a04f_0_0)にまとめられています。

そのスライドの6枚目では、[ユーザビリティ](https://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B6%A5%D3%A5%EA%A5%C6%A5%A3)の問題点として、

> 1. Too Difficult to Read 2. Difficult to get started 3. Ambiguity in interpreting the success criteria 4. Persuading Others to use WCAG

という4つのポイントを挙げています。最初に挙げられているのが「難しすぎて読めない」というものです。どういうことなのかは続きで記載されています。

> Undefined acronyms, specialized terms, pseudo-legalese, and complex sentence structure decrease user’s comprehension, especially for people in the development cycle who are less technical (project managers, designers, social media marketing leads), regulators, and international users who need translations.

[Google翻訳](https://d.hatena.ne.jp/keyword/Google%CB%DD%CC%F5)をあわせて載せておきます：

> 未定義の頭字語、専門用語、擬似法律用語、および複雑な文構造は、特に技術的に詳しくない開発サイクルの人々 (プロジェクト マネージャー、デザイナー、ソーシャル メディア マーケティング リーダー)、規制当局、および翻訳を必要とする国際ユーザーにとって、ユーザーの理解力を低下させます。

WCAG 2の文章自体が難解だ、ということですね。ウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)に関連する前提知識だけでなく、技術文書であることも手伝って、HTMLや[CSS](https://d.hatena.ne.jp/keyword/CSS)などの実装寄りの前提知識も、暗黙のうちに要求されるような記述になっています。文章中の文の構造も複雑で、これに引きずられるように、WAICが公開している日本語訳も難しく、ときには正確に日本語に翻訳できていない箇所もあります。

2つ目の「始めるのが難しい」を見ていきましょう。

> WCAG is so complex in structure and content with documents, layers and resources that it is overwhelming to people who want to use it as a reference. Among other issues, it also difficult to search for – across multiple documents, and search within. This can be intimidating for people new to the topic who are genuinely interested in and / or tasked with supporting accessibility.

[Google翻訳](https://d.hatena.ne.jp/keyword/Google%CB%DD%CC%F5)：

> WCAGは、ドキュメント、レイヤー、リソースを含む構造とコンテンツが非常に複雑なので、リファレンスとして使用したい人にとっては圧倒されます。とりわけ、複数のドキュメントにまたがって検索したり、ドキュメント内を検索したりすることは困難です。これは、アクセシビリティに真に興味がある、またはアクセシビリティをサポートする任務を負っている、このトピックに初めて携わる人々にとっては威圧的なものになる可能性があります。

WCAG 2は、文章の構成がWCAG 2独特のレイヤーを形成しており、さらにWCAG 2の構成自体が、WCAG 2の関連文書とセットで読まないと読み解けないようになっています。これからウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)に取り組んでいく人にとっては、ハードモードを通り越したナイトメアモードな難易度になっているといえます。つまり、**最初にWCAG 2を読んではいけません**。事前準備をしたり、ウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)の専門家のサポートを得られるようにしたりした上で、WCAG 2を読むのがおすすめです。

3つ目の「達成基準の解釈が曖昧である」について、

> There isn’t a clear distinction on what is the “right answer”. Even accessibility experts disagree. As the technology and contexts that can make requests and output web content continues to expand, it becomes less clear over time, which contexts the guidelines apply to. A browser is now only one of many such contexts.

[Google翻訳](https://d.hatena.ne.jp/keyword/Google%CB%DD%CC%F5)：

> 何が「正しい答え」なのかについては、明確な区別はありません。アクセシビリティの専門家ですらこれに同意しません。リクエストを行って Web コンテンツを出力できるテクノロジーとコンテキストが拡大し続けるにつれて、ガイドラインがどのコンテキストに適用されるのかが時間の経過とともに明確になりません。ブラウザは現在、そのような多くのコンテキストの1つにすぎません。

達成基準[*6](https://momdo.hatenablog.jp/entry/20231112/1699762351#f-14659820)というのは、[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)を確保するに当たって満たす必要のあるWCAG 2が定めた項目のことです。あるウェブページに対して、ある達成基準を満たせているのかどうかをチェックすると、達成基準自体の曖昧さも手伝って、ウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)の専門家間ですら解釈がブレるという非常に厄介な事態を引き起こします。ある会社による[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)チェックで達成基準を満たせているとされても、別の会社によるチェックでは達成基準を満たせてないという結果が返ってくる原因はここにあります。

最後となる4つ目の「他人を説得してWCAGを利用させる」について、

> Demonstrating that accessibility is not only important to people with disabilities, but that it also benefits the business as a whole can be a challenge. The fact that accessibility is required by law does not necessarily influence decision makers to invest in accessibility. There are many compelling reasons for this, but ultimately, it can be difficult to calculate or predict the business and human impact within any given industry.

[Google翻訳](https://d.hatena.ne.jp/keyword/Google%CB%DD%CC%F5)：

> アクセシビリティが障害を持つ人々にとって重要であるだけでなく、ビジネス全体にも利益をもたらすことを実証することは、困難な場合があります。アクセシビリティが法律で義務付けられているという事実は、意思決定者がアクセシビリティに投資することに必ずしも影響を与えるわけではありません。これには説得力のある理由がたくさんありますが、最終的には、特定の業界内でビジネスと人的影響を計算したり予測したりするのは難しい場合があります。

WCAG 2に取り組んでいくと、どうよいことが起きるのか、どんな利益をもたらすのか…というのをWCAG 2だけで会社のマネージャーや経営層なりを説得するのは困難です。これはWCAG 2自身が技術文書にしか過ぎないためでもありますが、そうはいっても必要な資料を見つけるのが極めて困難な状況にあるとこの調査は分析しています。

このような難しさを解決する1つの方策として、WCAG 3.0の開発が考えられているわけですが、まだ初期の策定段階です。現時点でおぼろげながら形は見えるものの、大枠が整備されているとは言いがたい状況にあります。WCAG 3.0を作成するWorking Groupは2024年にもレビューできる状態のWCAG 3.0を発行するようなことを言っていますが、個人的にはほとんど信用できないと思っています[*7](https://momdo.hatenablog.jp/entry/20231112/1699762351#f-05e764da)。また、それなりに使えるものが[2020年代](https://d.hatena.ne.jp/keyword/2020%C7%AF%C2%E5)に出てくるのかも個人的には怪しいと思っています。なによりも、WCAG 3.0はWCAG 2と別物ですから、WCAG 2と中期的に付き合っていく必要があるわけです。

では、WCAG 2の困難さに立ち向かっていくにはどうすればよいのでしょうか。まず考えられるのは、オンライン上の無料で入手可能なリソースを当たっていくという手です。

[W3C](https://d.hatena.ne.jp/keyword/W3C)にはWAIというウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)の専門の組織があって、WCAG 2やウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)を説明するリソースが多数あります。英語ではあるものの、幸いなことにWCAG 2とは違って、[機械翻訳](https://d.hatena.ne.jp/keyword/%B5%A1%B3%A3%CB%DD%CC%F5)で読めるような英語で書かれていて、読むのにそこまで苦労しないと思われます。

- [The WCAG 2 Documents](https://www.w3.org/WAI/standards-guidelines/wcag/docs/)では、WCAG 2自身の構造と、WCAG 2を理解する上で欠かせないWCAG 2の関連文書についての概要が説明されています。
- [Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/)は、WCAG 2の要求事項（達成基準）がどのようなことを求めているのかの概要を掴むことができるでしょう。 
    - それより手前のウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)とはそもそも何なのか？について、WCAG 2は説明しません。じっくり最初から取り組むということであれば[Accessibility Fundamentals Overview](https://www.w3.org/WAI/fundamentals/)がよいかもしれません。

英語はいやだという人は、日本語の資料もあります。

- 筆者と[@bakera](https://twitter.com/bakera/)とで作成した[アクセシビリティ・ガイドラインの歩き方（初心者編）](https://docs.google.com/presentation/d/1U74164uPJsHQU12OcAeZPVwfwCzAWJy6hSPZyCxG8kM/edit#slide=id.p)というスライドを公開しています。少し古いですが、WCAG 2をどう読んでいけばよいのかのヒントを記載していますので、未見の方は一読していただければ幸いです。
- デジタル庁の[ウェブアクセシビリティ導入ガイドブック](https://www.digital.go.jp/resources/introduction-to-web-accessibility-guidebook)を当たるのもよいでしょう。ただし、WCAG 2という観点ではわかりやすさが優先されていることもあり、やや正確性に欠けるところも見受けられます。[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)の入門としてよい資料ではありますが、官公庁が出しているから全面的に信用できるというわけではないことに注意してください。

[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)に関連する書籍を当たってみるという手もあるでしょう。いくつか挙げてみたいと思います。

- [デザイニングWebアクセシビリティ: アクセシブルな設計やコンテンツ制作のアプローチ](https://www.amazon.co.jp/dp/B01N3CGZ7W?tag=momdos35xreac-22&linkCode=osi&th=1&psc=1)。古典的ですがウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)界隈で最初の1冊としてよく取り上げられます。
- [Webアプリケーションアクセシビリティ──今日から始める現場からの改善 (WEB+DB PRESS plus)](https://www.amazon.co.jp/dp/4297133660?tag=momdos35xreac-22&linkCode=osi&th=1&psc=1)。2023年に発売された実践的な書籍。中級者向けの書籍であり、実装についての記載はもちろんのこと、[ボトムアップ](https://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%E0%A5%A2%A5%C3%A5%D7)的に組織にウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)を定着させた著者陣による方法論や、マネージャーや経営層を説得するためのヒントもあります。
- [見えにくい、読みにくい「困った！」を解決するデザイン (Compass Booksシリーズ)](https://www.amazon.co.jp/dp/483998087X?tag=momdos35xreac-22&linkCode=osi&th=1&psc=1)。必ずしもWCAGに即しているわけではないですが、ウェブ[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)を考慮したビジュアルデザインのとっかかりとして読んでみるのもよいでしょう。
- [HTML解体新書-仕様から紐解く本格入門](https://www.amazon.co.jp/dp/4862465277?tag=momdos35xreac-22&linkCode=osi&th=1&psc=1)。拙著（[@bakera](https://twitter.com/bakera/)との共著）ですが、HTML仕様とWCAGがどう結びつくのかを注記で折に触れて言及しています。仕様の読み方についても触れており、これもWCAGを読むための手がかりになるかのもしれません。未見の方は手に取っていただけると幸いです。
- [武器になるHTML](https://www.amazon.co.jp/dp/B0BL6R37BT?tag=momdos35xreac-22&linkCode=osi&th=1&psc=1)。これからHTMLを身につけるというのによい1冊。HTMLと[アクセシビリティ](https://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)の結びつきを意識した作りになっています。

必要な知識を蓄えて、心の準備ができたら、[WCAG 2.1 解説書](https://waic.jp/translations/WCAG21/Understanding/)を読み進めていきましょう。ただし、（日本語訳の宿命ですが）日本語訳は原文の[WCAG 2.1 Understanding Docs](https://www.w3.org/WAI/WCAG21/Understanding/)に比べて古い日付のものをベースに翻訳しています。必要に応じて[機械翻訳](https://d.hatena.ne.jp/keyword/%B5%A1%B3%A3%CB%DD%CC%F5)に頼りながら原文を読んでいくとよいでしょう。また、日本語訳は翻訳の誤りがあるかもしれません。翻訳の誤りや翻訳で疑問に思う箇所を見つけた場合は、[Googleフォーム](https://docs.google.com/forms/d/e/1FAIpQLSdIpvogLx8kGIMewhQ6MzhG2pOCQZ50iIBViGg8pUrRJuslKg/viewform)でコメントをしてみてください。

とまあ、今日のところは感じでおしまいです。

[デザイニングWebアクセシビリティ: アクセシブルな設計やコンテンツ制作のアプローチ](https://www.amazon.co.jp/dp/B01N3CGZ7W?tag=momdos35xreac-22&linkCode=osi&th=1&psc=1)

![[516DF8MI-vL._SL500_.jpg]]