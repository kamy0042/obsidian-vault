---
Created: 2021-01-26T15:29:00
URL: https://note.com/taira_daishiro/n/nf037bf199ed8
Tags: [topic/技術/パフォーマンス]
---
![[rectangle_large_type_2_190431d03714d958c4347e6ece2cfaf6.png]]

先日、辻さんの下記ツイートを拝見しました。

だれかWebのチョットワカル人、「(日本語など大容量の)Web FontのCore Web Vitalsへの影響 使い続ける方法とその是非」を記事に書いてほしい。。。preload頼りでいいんだろうか。どのくらい失敗するんだろうか……— 辻正浩 | Masahiro Tsuji (@tsuj) [January 20, 2021](https://twitter.com/tsuj/status/1351919660535476230?ref_src=twsrc%5Etfw)

私自身も、WebフォントがどれくらいCore Web Vitals影響するのか、影響を回避しながらWebフォントを使う方法がハッキリ分かっていなかったので、調査してみました。

> 本投稿はWEB上から入手できる情報源をもとに内容をまとめています。情報の正確性には留意していますが、私の独自の解釈・予想も含まれています。以上から、本情報はいち見解として捉えていただきますようお願い致します。

### WebフォントによるCore Web Vitalsへの影響とは

Core Web Vitalsの中でも、LCP、CLSの２つが影響を受けると考えられます。

![[picture_pc_aeaf11a3f0335f07f9f7a93c0a8e3029.png]]

**■影響１：最大コンテンツの描画（LCP）**

最大コンテンツの描画にかかる時間が、Webフォントによって遅延する可能性が想定されます。

![[picture_pc_4df71e4dc31101a789492be02c23d740.png]]

シンプルなWebページであればCSSやJavaScriptが少ない為、レンダリング処理も限定的であり、WebフォントによってLCPに悪影響をきたす可能性は低いと考えられます。

しかし、多数のCSSやJavaScriptを読み込み実行している中、さらに大きなWebフォントが読み込まれ描画というタスクが入る事で、結果的にLCPの描画にも影響（遅延）をきたす可能性があります。

![[picture_pc_393cc783466d052be19dff1119847bcf.png]]

また、Google Fontsの早期アクセスVerを利用した事で、結果的にFirst Paintをブロックしてしまう事もあります。

早期アクセスVer：[https://fonts.googleapis.com/earlyaccess/notosansjp.css](https://fonts.googleapis.com/earlyaccess/notosansjp.css)

**■影響２：レイアウトのズレ（CLS）**

Webフォントが描画されることにより、コンテンツの文字サイズが変わり、レイアウトが移動。結果、CLSのスコアが悪化するケースです。

**「Webフォントが影響するCore Web Vitals」と聞いて、真っ先に思い浮かべるのがCLS（レイアウトシフト）への影響です。**

![[picture_pc_e53cc2bc12da38fde997a108320dc0ea.png]]

今回、WebFontとCore Web Vitalsの調査にあたって、デモページを作ってみました。CLSの影響を実際にご覧になりたい場合は下記デモページを御覧ください。

なお、デモページをCSL計測ツール「[CLS Calculator](https://layoutstability.rocks/)」で測った所、0.046でした。

![[picture_pc_20eedb57fd29792650dbc840671e4edb.png]]

[CLSの基準値](https://web.dev/cls/#what-is-cls)で見れば、0.046はまだ「Good」の範囲内ではあるものの、ページ内のコンテンツ（文章）量が増えればWebフォントによる再描画によってレイアウトシフトがCLSの基準値（Good）を超えてしまうのでは無いかと思います。

- --

簡単ではありますが、以上が「Webフォントが影響するCore Web Vitals」になります。

特にCLSへの影響が大きく、その要因として下記が考えられます：

> (1) ページ表示後にWebフォントが再描画 ↓↓(2) 文字の大きさや幅が変化 ↓↓(3) レイアウトが移動 ↓↓(4) CLSが悪化

以上から、Webフォントを使いながらもCore Web Vitalsに影響しない為には、上記１～３の発生をいかに防ぐかがポイントとなります。

### CWVに影響せずにWebフォントを使う方法

Core Web Vitalsに影響せずに、Webフォントを使い続ける方法は下記の通りです。

![[picture_pc_cf0d9d2c74481cbc89807e7d106d72da.png]]

まず基本方針としては、
①再描画させない
②描画に時間をかけさせない
を挙げました。

WebフォントがCore Web Vitalsに悪影響をきたしてしまう根本的な要因は「**文字サイズの変化と、描画にかかる時間**」にあります。

この２点をいかに防ぎ、短縮化するかが重要となります。

では、この基本方針をどう実現するのか？そこで立てたのが以下の対処方針です。

![[picture_pc_04334953f6b5cffcd9069eaab7d552ee.png]]

基本方針である
・後から文字サイズを変化させない
・描画に時間かけない
を考えた際、上記の１～３が対処案となりました。

では、各々説明していきます。

### 【対処1】font-display:optionalを利用する

[font-display](https://developer.mozilla.org/ja/docs/Web/CSS/@font-face/font-display)とは、Webフォントが描画できるまでの間、どのように表示するかを指定できるプロパティとなり、下記のようにCSSで指定できます。

![[picture_pc_caa9ef1f8db14739d2cd102e62e2fa69.png]]

現在、「auto」、「swap」、「block」、「fallback」、「optional」の計５つの選択肢があります。

今回、各値の説明は省きますが（詳細→[MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/CSS/@font-face/font-display)）、このfont-displayを利活用する事で「後から文字サイズを変化させない」に対処できます。

**■ブラウザのデフォルトは「font-display: auto」**

font-displayを指定しない場合、「auto」が適用されます。この「auto」の共同は下記の通りです：

> (1) 2~3秒の間、Webフォントの描画を試みる ↓↓(2) 2~3秒以内に描画出来ない場合は、ローカルフォントで表示 ↓↓(3) Webフォントで描画できるタイミングで、フォントを変える

上記の流れにおいて、（２）の「一旦、ローカルフォントで表示」が入ってしまう為、（３）の「Webフォントで再描画」の時にレイアウトシフトが発生してしまいます。

![[picture_pc_060fcdf5c6051aad6df1159810e5c6c6.png]]

ブラウザのデフォルト設定である「一旦、ローカルフォントで表示」が、結果的にCLSの悪化を招いている状態です。

※ブラウザごとの対応とタイムアウト時間に関しては「[Controlling Font Performance with font-display](https://developers.google.com/web/updates/2016/02/font-display)」を御覧ください。

**■「optional」で再描画を防ぐ**

「一旦、ローカルフォントで表示 → Webフォントで再描画」がレイアウトシフトを引き起こしているという事がわかりました。

この「再描画」は font-displayの「auto」や「swap」が該当し、Core Web Vitalsの観点からはこれら値をfont-displayに設定する事はできません。

では、どうするのか？
ここで利用するのが「optional」です。

font-display: optional の挙動は
・100ミリ秒はWebフォントの描画を試みる
・それ以上時間がかかる場合はローカルフォントで表示
・以上（再描画しない）
になり、**基本方針の「再描画させない」にマッチ**します。

![[picture_pc_19777e987d472b4111f84312b0380e74.png]]

つまり、「Webフォントの描画は約束しないが、レイアウトはズラさない」という挙動であり、Core Web Vitalsの面では適切な選択肢といえます。

font-displayによるWebフォント表示の差を実際に体験できる[デモページ](https://seoskilllife.work/core-web-vitals/webfonts_slow_example_fontdisplay.php)を作りました。

![[picture_pc_07f874fcf273f8a64cbb46c6eeb8491c.png]]

[こちら](https://seoskilllife.work/core-web-vitals/webfonts_slow_example_fontdisplay.php)からアクセスし、「auto」、「swap」、「block」、「optional」の違いを御覧ください。

font-display: optionalを利用する事で、「Webフォントの再描画」を防ぐ事はできましたが、ここで新たな課題も出てきました。

それは「100ミリ秒以内にWebフォントを読み込み、描画できる状態に無ければならない」という点です。

![[picture_pc_d195bf9cf942b6724d9527949fd1648b.png]]

この点を対処しないと、レイアウトシフトは発生しないがWebフォントで表示されない、という本末転倒な状態に陥ります。

そこで必要なのが対処２の「ローディング時間の短縮化」です。

### 【対処2】ローディング時間の短縮化

font-display:optionalを利活用する為にも、Webフォントのファイルを素早くWebブラウザにダウンロードさせ、いち早く描画できる状態にしなければなりません。

そこで重要になるのが、Webフォントのローディング時間の短縮化です。

英語と比較し、文字数が多い日本語は、当然フォントファイルのサイズも大きくなります。[Noto Sans CJK JP](https://www.google.com/get/noto/#sans-jpan)のBoldに至っては、14.3MBもあります。

Webフォントのファイルサイズが大きければ、ダウンローディング（読み込み）とレンダリングにも時間を要してしまいます。

実際に[デモページ](https://seoskilllife.work/core-web-vitals/webfonts_slow_example.php)を作った所、フォントサイズが軽いWebフォントの方が描画が速い結果となりました。

![[picture_pc_71c1be46dc9dc11a25ee1d42fb7dff2b.png]]

では、このローディング時間を短縮していきます。

**■Webフォントを軽量化（サブセット化）**

日本語のフォントには、普段あまり使われない漢字などが含まれます。フォント「全部入り」の状態から、日常的に使われるフォントのみを抽出する事で、フォントファイルそのものを軽量化（サブセット化）します。

![[picture_pc_637bb83b35778695628e2d7439a4bdb4.png]]

サブセット化する文字は「[日本語WEBフォントをサブセット化する際の参考文字列一覧](https://u-618.org/webfont-subset/)」の「JIS第1水準＋常用漢字＋その他でまとめると」を利用しました。

![[picture_pc_4b107ae2987089df0016ecc3b0b10741.png]]

[サブセットフォントメーカー](https://opentype.jp/subsetfontmk.htm)を使って、Webフォントを軽量化します。

今回サブセット化したNotoSans Boldの場合、13.9MB→0.5MBまで軽量化できました。

![[picture_pc_aa119fa417505d3a5e329f40f28a7f1e.png]]

という事は、日常的に利用されないフォントが多数入っている事になります。Core Web Vitalsの観点からも、Webフォントを利用する際は、サブセット化（必要な文字フォントのみを抽出）を検討した方が良いでしょう。

![[picture_pc_f9bfbb0ea1bfdc5a6c0e00ac704174f2.png]]

なお、サブセット化によって軽くなったNotoSansを体験できる[デモページ](https://seoskilllife.work/core-web-vitals/webfonts_slow_example_notosans.php)を作りました。合わせてご覧ください。

※Webフォントのサブセット化やファイル形式については「[Webフォントをサーバにアップロードして使うには？](https://www.granfairs.com/blog/staff/webfont-by-selfhosting)」をご覧いただく事をお勧めします。

**■Webフォントフォーマットの変更**

メジャーどころのWebフォントフォーマットとして下記４つがあります。

> ・EOT：IEのみに対応している・TTF：WindowsやMacで標準的に利用されるフォント・WOFF：Web向けのフォント・WOFF2：WOFFの圧縮形式を改善し、軽量化したフォント

「Webフォント」として利用するのであれば、圧縮率の観点からWOFFもしくはWOFF2を利用するのが望ましいでしょう。

web.devの「[WebFont format](https://web.dev/reduce-webfont-size/#webfont-formats)」によると、

> ・対応しているブラウザであればWOFF 2.0を提供・大多数のブラウザであればWOFFを提供・Android (4.4 以下) の古いブラウザにはTTFを提供・IE9以下の古いブラウザ向けにはEOTを提供

との事。

[MDN Web docs](https://developer.mozilla.org/ja/docs/Web/Guide/WOFF)によると、WOFFおよびWOFF２に対応しているブラウザと、そのバージョンは下記の通りです：

![[picture_pc_587eb81718a43ef46a2d3f55e06e1f9f.png]]

ざっと見た感じ、今日よく利用されているブラウザの大半はWOFF2に対応していそうです。

Googleアナリティクスから自分のWebサイトにアクセスするユーザーのブラウザとバージョンを確認できるので、一度対応しているユーザーの割合を確認してみると良いでしょう。

しかし、全てのユーザーに意図した形でWebページを見せたいもの。ブラウザやバージョンによってフォント形式の対応・非対応がある中、どうすれば良いのでしょうか？

Webフォントは、CSSを通して読み込むフォントファイルやフォーマット、Class名を指定します。

![[picture_pc_74361d26a7ae5a6b5aaea2076c934325.png]]

この際、上記のように複数のフォントフォーマットを format(); で指定出来るようになっています。

同じフォントを異なるフォーマットで複数回指定しても、全てが読み込まれる事はありません。ブラウザが自動的に判断し、自ら対応している最善のフォーマットを１つ選んでくれます。

![[picture_pc_78a65ff135fce5450a811ccca7f397d6.png]]

上の図は、私の環境（PC Chrome 88）での結果です。woff2が指定されている場合はwoffは読み込まず、woff2のみを利用している事が分かります。

＜WOFF２の生成＞

[WOFFコンバータ](https://opentype.jp/woffconv.htm)でWebフォントを生成する際、「WOFF2を作成する」にもチェックを入れます。

![[picture_pc_b8da036e86850b354cdc3c3530fb5674.png]]

実際、[Noto Sans CJK JP](https://www.google.com/get/noto/#sans-jpan)のBoldを、サブセット化（軽量化）前と後の両方でWOFFとWOFF2を比較してみました。

![[picture_pc_daf72b9398b7562123a0fc008cf0fc65.png]]

ファイルの容量としては10％～15％ほど圧縮できています。

**■HTTP/2とファイル分割**

ローディング時間を短縮する方法に「**Webフォントのファイルを細かく別けて、それらファイルを同時に一度で取得する**」があります。

![[picture_pc_64ba51bfb22338a39264f8cab992136e.png]]

複数のHTTP通信が同時に行えるようになったHTTP/2を活用し、ファイルサイズが大きいWebフォントのダウンロードを速くする方法です。

[Google Fonts](https://fonts.google.com/)では既にこの方法が実装されており、ファイルサイズが大きいNotoSansを100個近くに分割し、HTTP/2で同時送受信しています。

![[picture_pc_f202872dcf9c0d32632d154425d890e2.png]]

以上、Webフォントファイルのダウンロードを短縮する方法を解説しました。

しかし、font-display: optionalを利用するには、100ミリ秒以内にWebフォントを読み込み、描画に移らなくてはなりません。

![[picture_pc_b32a232b0d9763be2eace139b1aef9c4.png]]

しかし、この「100ミリ秒」はとても短く、軽量化したWebフォントでもダウンロードに90ミリ秒近くかかってしまいます。（※状況やファイルによって異なる）

HTTP/2とファイル分割によってこのダウンロード時間を短縮する事は可能ですが、とわいえ、ダウンロード→読み込み→描画という３つの工程を短い時間でこなすには、もう一つ重要な対処があります。

それが、対処３の「描画に必要なファイルを先にロードする」です。

### 【対処3】描画に必要なファイルを先にロードする

いち早くWebフォントの描画に移るには、Webフォントのファイルを優先的にロードする必要があります。

ここで利用するのが preload です。

![[picture_pc_fe350775aced954f5c225ec18c03f35b.png]]

上の図は、とある実験ページのHTMLです。

上から
・CSSのリンク
・Webフォントの読み込み（src）
・link="preload"によるWebフォントの読み込み
という順番で記載されています。

以前であれば、ソースコードの上から順にロードされていましたが、現在のブラウザにおいてPreloadを指定した際、その読み込み順はどう変わるのでしょうか？

![[picture_pc_708b43f25067321d408450cea6807a29.png]]

案の定、Webフォントのファイルが真っ先にローディングを試みているのが分かります。仕様通りですね。

![[picture_pc_7a3aee0eaaa7d67ce24bba131da33b62.png]]

画像など読み込みの対象となるファイルが増えても、Preloadを指定したファイルが優先的に読み込まれます。

軽量化したWebフォントファイルをPreloadで先読みする事で、font-display:optionによる100ミリ秒以内での描画に備えます。

![[picture_pc_44e50d7f05775ec84d4fa1d3436e4602.png]]

また、キャッシュとしてブラウザ内に保存されているWebフォントもPreloadを用いる事で先にキャッシュから呼び出し、高速に描画できるようになります。

### 対処済みのWebページ

[こちらのデモページ](https://seoskilllife.work/core-web-vitals/webfonts_slow_example_fontdisplay.php)の「キャッシュあり＋Preload」をクリックしてみてください。

![[picture_pc_d216e69d69abe8415b7de8b36cc9fd54.png]]

非常に最小限の構成で作られたデモページですので、実際のWebページとは事情が異なりますが、
１）font-display:optionalを使う
２）ローディング時間を短くする
３）先に読み込む
を反映した結果、レイアウトシフトを引き起こさずにWebフォントを適用できているページになるかと思います。

### Webフォントを使い続ける是非

最後に、SEOの観点からWebフォントを使い続ける是非について、私の見解を書きたいと思います。

結論は下記の通りです：

> ・Core Web Vitals対応した形でWebフォントを使う事は可能・しかし、技術的な技能や工数（費用）を多く要する場合もある・「デザイン」と「SEO」は相反する場合もある・「何を最優先したいか」を明確し、利用方針を決める

今回、「SEOの観点」からWebフォントを使い続ける方法を模索しました。ローディング時間の短縮化やPreloadなど色々打てる手はあり、これら手法を通してWebフォントをCore Web Vitalsに対応した形で利用できる事も分かりました。

しかし、同時に「デフォルトのフォントでも良くないか？」とも感じていました。

趣味で作るWebページではフォントを指定する事は殆ど無く、それでもある程度きれに表示されるので、Webページ作りにおいてフォントの重要性を意識した事はありませんでした。

しかし、それは単に私がWebデザインに明るくなく、フォントの重要性を理解していないからでもある、と思っています。

SEO観点でWebページを見た際、フォントよりもページエクスペリエンスやコンテンツ、とりわけ検索意図に対するアンサー度に目が向きます。

しかし、Webページというクリエイティブを通して伝えたいメッセージを表現する「デザイン」という観点では、「フォント」の重要性は私が感じている以上に高いものなのでしょう。

**■「デザイン」と「SEO」の両方を満たす実装**

では、「デザイン」と「SEO」の両方を常に満たす実装方法があるか？と聞かれると、私自身、まだYesともNoとも言い切れません。

SEOの観点からWebフォントの使用を考えると、再描画によるレイアウトシフトは防ぐ必要がある為、font-display:optional を使わざるを得ないと考えます。

しかし、デザイン面で考えると、出来る限り指定したWebフォントでページを表示させたいものです。そうなると、Webフォントのロードと描画を待ち続ける必要があり、その後に発生する可能性があるレイアウトシフトを容認しなければなりません。

もちろん、optional範囲内（100ミリ秒以内）でWebフォントが確実に表示できれば良いですが、クリエイティブを最優先にする場合であれば、font-display:blockやswapを使う方が適切でしょう。

以上からも、**確実にSEOとデザインの両方を満たす実装方法は、まだ無いのではないか**と考えています。

**■Page Speed Insightの提案**

Core Web Vitalsを含めた総合的なユーザー体験を計測するPage Speed Insightでは、Webフォントに関して下記診断を表示する事があります。

![[picture_pc_af1924720823c70df16f8ec7d5185084.png]]

この「ウェブフォント読み込み中のテキストの表示」の[詳細リンク](https://web.dev/font-display/)先を見るとfont-display:swapの利用が提案されています。

確かに、FOIT対策としては「swap」は正しい選択かもしれません。しかし、swapを指定する事でWebフォントの再描画を許し、結果的にレイアウトシフトを招く可能性があります。これでは、CLS観点で考えるとswapの利用は適切とは言えないでしょう。

また、2020年4月にリリースされたChrome 83から font-display: optional が改善され、レイアウトシフトへの対応がより可能となりました。

> font-display: optional の改善Chrome で font-display の動作方法がいくつか変更されます。・font-display を optional に設定しても、再レイアウトが発生しなくなります。・ウェブフォントを十分高速に読み込める場合にフォールバック レンダリングを行わなくてもいいように、フォントのプリロードは（すべての font-display 値について）レンダリングをわずかにブロックできるようになります。この結果、font-display: optional とプリロードの両方が使われている場合、フォントの交換によるレイアウトの切り替えが起こらなくなります。

※出典：[https://developers-jp.googleblog.com/2020/04/chrome-83-xss-cors.html](https://developers-jp.googleblog.com/2020/04/chrome-83-xss-cors.html)

以上、Page Speed Insightを含め、GoogleおよびWeb.devのドキュメントに置いて、表示速度を優先にするのか？それともWebフォントの描画を追うのか？はたまたレイアウトシフトの抑制を最優先とするのか、議論が拡散している印象を受けます。

**■最終的な見解**

いろいろ書きましたが、改めて「何を最優先とするか」が重要だと私は考えています。

Webサイトの構築はSEOの観点だけで考えて良いものではありません。事業上、なにを優先するかによって、とるべき観点や施策も変わってくる事でしょう。

例えば、とある単品商品の通販サイトにおいて、その商品の印象やイメージが事業上最も大切なのであれば、SEO以上にデザインを優先するのが望ましく、font-display:swap; の利用が適正と言えるでしょう。

たとえ、swapによってレイアウトシフトが発生したとしても、事業上デザインの方が重要度が高ければ、デザイン優先で考えるのが最善といえます。

逆に、自然検索流入数が事業収益に大きく影響するとあるECサイトであれば、SEOは事業上の優先度が高く、Core Web Vitalsに対応したWebページ作りが望ましいといえます。

すべての要求・要件に応えることができれば良いのですが、今回のようにSEOと他の要求が相反する場合は、事業上なにを最優先にするかで最終的にWebフォントの利用有無や実装方針を決めるのが望ましいと考えます。

以上がWeb FontによるCore Web Vitalsへの影響と使い続ける方法、そして私の見解になります。

ご指摘などあればコメント欄で頂けると幸いです。

お読み頂きありがとうございました。