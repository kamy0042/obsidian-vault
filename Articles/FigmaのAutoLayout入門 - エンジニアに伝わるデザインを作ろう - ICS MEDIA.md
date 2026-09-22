---
タグ: []
作成日時: 2024-10-01T23:29:00
URL: https://ics.media/entry/211015/
Tags: [topic/ツール/Figma]
---
![](https://ics.media/entry/211015/images/eyecatch.png)

- [Figma](https://ics.media/entry/tag/Figma/)

106

287

徐々に日本でもメジャーなデザインツールとなっている「Figma」。前回の記事『[FigmaのSmart Animateを活用したプロトタイプ入門](https://ics.media/entry/210526/)』では、簡単にアニメーションを実現できる「Smart Animate」機能を紹介しました。

本記事では**デザイン制作とその後のコーディング作業を強力にサポートしてくれる「Auto Layout」について**詳しく紹介します。「Auto Layout」はデザインを効率よく進められるだけでなく、**デザイン段階でHTML・CSSコーディングの参考になる情報を追加できます。**

デザイン段階での使い方はもちろん、Figmaで**デザインを受け取ったエンジニアがどう考えて実装していくべきか**まで紹介します。デザイナーはもちろん、Figmaで作られたデザインファイルを受け取る可能性があるエンジニアの方も是非ご覧ください。

### Auto Layoutとは

「Auto Layout」とは、**設定した内容やオブジェクトの中身に応じて余白や配置が自動で調整され、レイアウト調整などの手間を省いてくれる機能**です。Adobe XDを利用している方であれば以下の記事で紹介した、「スタック」や「パディング」機能をイメージして頂ければわかりやすいかと思います。

- [Adobe XD 待望の新機能！自由自在な動的レイアウトを実現するスタックとスクロールグループの使い方](https://ics.media/entry/200702/)

「Auto Layout」を利用することで、以下のようにテキストの変更やレイアウトの調整が容易になります。

![](https://ics.media/entry/211015/images/211015_auto_layout_demo.gif)

Auto Layoutのデモ

Figma公式の「Auto Layout」のチュートリアル用デザインファイル[「Figma Auto Layout playground」](https://www.figma.com/community/file/784448220678228461/Figma-Auto-Layout-playground) （[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ja)）を翻訳しましたので、以下から確認してみてください。

- [Figma Auto Layout チュートリアル (日本語版)](https://www.figma.com/community/file/1030308171146621283/Figma-Auto-Layout-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-(%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%89%88))

すでにFigmaのアカウントにログインしている状態であれば、「Duplicate」をクリックすることで、ご自身のアカウントの「Drafts」に追加され、自由に編集可能となりますので触りながら読み進めてみてください。

![](https://ics.media/entry/211015/images/211015_auto_layout_duplicate.png)

「Auto Layout」は**大きくわけて「パディング」、「リサイズ」、「ネスト」の3つ機能を組み合わせたもの**です。順に機能を確認していきましょう。

### パディング（Padding）

最初にテキストの量に応じてサイズが変化するボタンを例に、パディング機能を解説します。パディング機能はCSSのpaddingと同じく、**オブジェクトに対して余白を持たせる機能**です。

この機能を活用することで意図しない余白のズレが起こらなくなり、コンテンツの内容が変化した際の余白調整の必要もなくなります。

「Auto Layout」を使うには、まず対象のオブジェクトをフレームにまとめる必要があります。フレーム化はオブジェクトを選択後、右クリックで開くメニューから[Frame selection]をクリックするか、ショートカットキーOption+Command+G (macOS) / Alt+Control+G (Windows)を入力します。

![](https://ics.media/entry/211015/images/211015_auto_layout_frame.png)

画面右側のプロパティパネル、[Design]タブに「Auto Layout」が表示されるので、[+]ボタンをクリックすると準備完了です。この項目内の右から2番目のプロパティがパディング機能です。数値を入力するとオブジェクトに余白が追加され、テキスト量が変化してもこの数値分の余白は確保されつつサイズが変化するようになります。

![](https://ics.media/entry/211015/images/211015_auto_layout_padding.png)

このプロパティに「20,10,30,10」と入力すると、上側に20px、右側に10px、下側に30px、左側に10pxの余白の指定ができます。このようにバラバラの余白を指定すると表示が[Mixed]となります。その際は右端のアイコンをクリックすることで[Alignment]パネルが開き確認可能です。

![](https://ics.media/entry/211015/images/211015_auto_layout_individual_padding.png)

エンジニアはパディングが設定されているデザインを受け取った際は、[Design]タブではなく[Inspect]タブを確認しましょう。`padding: 20px 10px 30px;`のようにCSSコードが出力されていますので、こちらをコピーすればデザインが実装可能です。

![](https://ics.media/entry/211015/images/211015_auto_layout_inspect.png)

エンジニア目線でも**パディングのブレが少なくなるだけでなく、余白の値を目視で確認する必要が無くなりコーディングも容易になる**とても便利な機能です。

### リサイズ（Resizing）

次にブログ投稿などによく見られるカードを例に、リサイズ機能を解説します。リサイズ機能は**フレームの幅や高さが変化した際のふるまいを決める機能**です。

この機能を活用することでレイアウト変更に強くなり、モバイルからデスクトップのように幅が変化するデザインを作成できます。また、コンテンツ量が変化した際にどのようなふるまいをするかも設定できるので、エンジニアとの認識を合わせやすくなります。

画面右側のプロパティパネル、[Design]タブの[Auto Layout]の下に[Constraints and Resizing]という項目が確認できます。横幅、縦幅に関するプロパティをそれぞれ指定できます。

![](https://ics.media/entry/211015/images/211015_auto_layout_resizing.png)

各プロパティで次の指定ができます。

- Fixed width/height 
    - 横幅/縦幅を固定値とし、フレームの幅や高さの変化の影響を受けない。
- Hug contents 
    - コンテンツのサイズにしたがって横幅/縦幅のサイズが変化する。
- Fill container 
    - 該当のフレームを囲う親フレームを埋めるように横幅/縦幅のサイズが変化する。親フレームがない場合は表示されない。

![](https://ics.media/entry/211015/images/211015_auto_layout_resizing_demo.gif)

これらのプロパティを適切に設定することで、細かい調整を行わずとも表示したいカード数の変化や横幅の変化に対応できます。

![](https://ics.media/entry/211015/images/211015_auto_layout_card_resizing_demo.gif)

このリサイズ機能によって、**デザインのサイズからウィンドウサイズが変化した際の動きを指定できるので、エンジニアが実装時に迷わなくなります。**

横幅/縦幅のサイズは[Inspect]タブに絶対値で出力されてしまいますので、エンジニアはそのまま値をコピーすれば終わりという訳にはいきません。[Properties]にて設定情報が確認できるので、使用するレイアウト手法（FlexboxやCSS Grid Layoutなど）に合わせてこちらを参考にしながら実装するとよいでしょう。

![](https://ics.media/entry/211015/images/211015_auto_layout_resizing_inspect.png)

### ネストされた「Auto Layout」（Nested Auto Layout）

次にテーブルを例に、ネストされた「Auto Layout」を解説します。ネストされた「Auto Layout」は親子関係をもつフレームが存在する場合に役に立つ機能です。

この機能を活用することで、**複数フレームのレイアウトを管理でき、より複雑なデザインであっても変更に強く、意図が伝わりやすいデザインを作成できます。**

画面右側のプロパティパネル、[Design]タブの[Auto Layout]内の左端の矢印マークを確認しましょう。このボタンは「Auto Layout」の並び方向を指定できます。並び方向を垂直方向（縦並び）にしたい際には[↓]、水平方向（横並び）にしたい際には[→]をクリックしましょう。

![](https://ics.media/entry/211015/images/211015_auto_layout_direction.png)

並び方向の右隣にあるプロパティで「オブジェクト間の余白」を指定できます。 並び方向とオブジェクト間の余白を指定することで、子要素の並び替えや追加といった作業がスムーズに行えるようになります。

![](https://ics.media/entry/211015/images/211015_auto_layout_table_demo.gif)

[Auto Layout]内の右端のアイコンをクリックすると[Alignment]パネルが開かれます。こちらはPaddingが指定できるだけでなく、子要素の配置を指定できます。

子要素の配置は、水平方向の「左寄せ・中央寄せ・右寄せ」、垂直方向「上寄せ・中央寄せ・下寄せ」を組み合わせた合計9種類の指定方法があります。指定方法はUI上の青いオブジェクトを選択するだけの、直感的な操作です。

![](https://ics.media/entry/211015/images/211015_auto_layout_alignment_demo.gif)

エンジニアがネストされた「Auto Layout」を含む、デザインデータを受け取った際には[Inspect]タブを確認しましょう。 並び方向は`flex-direction`プロパティで出力され、[Alignment]パネルでの指定は`justify-content`プロパティ、`align-items`プロパティで出力されます。

![](https://ics.media/entry/211015/images/211015_auto_layout_nested_inspect.png)

ネストされた「Auto Layout」Inspectタブ

ただし現在「オブジェクト間の余白」の情報は[Inspect]タブに出力されないため、[Auto Layout]の項を確認し実装する必要があります。筆者は`gap`プロパティが実用的になれば、出力されるようになるのではないかと予想しています。`gap`プロパティについては以下の記事で紹介しています。

- [gapの余白指定が便利！ gridとflexでできる新しいCSSレイアウト手法](https://ics.media/entry/210628/)

### まとめ

「Auto Layout」によって**デザイン作業が楽になるだけでなく、エンジニアはどのようなCSSを指定すれば良いのかわかり、デザインの意図を伝えられる**ことが理解して頂けたかと思います。デザイナーは、「Auto Layout」を活用して、認識齟齬が起こりにくいデザインファイル作成を目指しましょう。

エンジニアは、デザインファイルを見た目だけで判断するのではなく、「Auto Layout」等の指定を理解し、**デザインの意図を汲み取る力**を身に付けるといいでしょう。

「Auto Layout」の機能はこれがすべてではなく、ここで紹介しきれなかった機能、組み合わせるとさらに便利な使い方ができる機能などもあります。文字だけで理解するのは難しいかと思いますので、冒頭でも紹介したデザインファイルから実際に触ってみることをオススメします。

- [Figma Auto Layout チュートリアル (日本語版)](https://www.figma.com/community/file/1030308171146621283/Figma-Auto-Layout-%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-(%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%89%88))