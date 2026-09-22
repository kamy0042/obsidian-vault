---
タグ: []
作成日時: 2024-01-20T16:57:00
URL: https://momdo.hatenablog.jp/entry/20220815/1660552142
Tags: [topic/アクセシビリティ/WCAG]
---
![[og-image-1500 13.png]]

## Nu Html Checkerの場合

[Nu Html Checker](https://validator.w3.org/nu/)は、HTMLをチェックするツールである。Nu Html Checkerで特定の（種類の）エラーを0にすることは、「[構文解析](http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%B2%F2%C0%CF)」のWCAGの達成基準を満たすための[必要十分条件](http://d.hatena.ne.jp/keyword/%C9%AC%CD%D7%BD%BD%CA%AC%BE%F2%B7%EF)となる。

> 達成基準 4.1.1 構文解析 (レベル A): マークアップ言語を用いて実装されているコンテンツにおいては、要素には完全な開始タグ及び終了タグがあり、要素は仕様に準じて入れ子になっていて、要素には重複した属性がなく、どの ID も一意的である。ただし、仕様で認められているものを除く。

筆者による上記引用のハイライト部分“どのIDも一意的であること”について見てみる。たとえば以下のHTML断片のように、1つのページに同じ`id`属性値が2回出現することはHTMLのエラーであり、かつ、WCAGの達成基準の違反となる：

```plain text
<div id="id_1">...</div>
<div id="id_1">...</div>

```

このようなHTMLのエラーのほかに、達成基準4.1.1の対象となるすべての問題をNu Html Checkerは検出できるので、その対象となるエラーを0にすることは、達成基準4.1.1を満たすために必要なことである。また、Nu Html Checkerが報告するエラーを0にすることによって、達成基準4.1.1を十分に満たすことができる。

すべてのNu Html Checkerが報告するエラーを0にすることは、WCAGの達成基準を満たすために必要ではない。たとえば、次のようなHTML断片は、HTML仕様に違反しているためにエラーとなるが、このエラーはどのWCAG達成基準にも違反していることにはならない：

```plain text
<!-- div要素にx-error属性は存在しない -->
<div x-error="hoge">...</div>

```

また、warningは（当然ではあるが）HTMLのエラーではなく、たいていの場合、どのWCAG達成基準の違反にもならない。たとえば、`script`要素の`type`属性は（冗長で）不要であるために検出される：

```plain text
<!-- script要素のtype属性は不要である -->
<script type="application/javascript" src="script.js"></script>

```

ただし、特定のwarning[2](https://momdo.hatenablog.jp/entry/20220815/1660552142#fn:2)は、達成基準の違反となる。たとえば、次の項目は後述のAxe DevToolsで達成基準4.1.2の問題として報告される：

```plain text
<!-- See: WAI-ARIA 1.2 https://www.w3.org/TR/wai-aria-1.2/#prohibitedattributes -->
<div aria-label="label text">...</div>

```

Nu Html Checkerでエラーもwarningも0にすることは、WCAGの（全部の）達成基準を満たすために必要でも十分でもない。しかし、特定のエラーおよびwarningは、達成基準を満たすための必要条件となる（ただし、どのエラーやwarningがどの達成基準に関連するのか、Nu Html Checker自身は教えてくれない）。このことから、Nu Html Checkerによるエラーもwarningも0にすることを、WCAG達成基準の観点から個人的には強く推奨する。

## Axe DevToolsの場合

[Axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd?hl=ja)[3](https://momdo.hatenablog.jp/entry/20220815/1660552142#fn:3)は、ウェブ[アクセシビリティ](http://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)をチェックするツールとして知られている。

たとえば、次のようなHTML断片について、Axe DevToolsは（[コントラ](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%C8%A5%E9)スト比4.5:1未満であるという[コントラ](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%C8%A5%E9)スト比の問題として）エラーを検出する：

```plain text
<style>
body {
  background-color: #fff;
}
a {
  color: #0088cc; /* コントラスト比 3.9:1 */
}
a:hover {
  color: #005580; /* コントラスト比 8:1 */
}
</style>
...
<a href="/link">リンクテキスト</a>

```

しかし、以下のHTML断片に対して、Axe DevToolsは、ホバー時の[コントラ](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%C8%A5%E9)スト比に問題があることをエラーとして検出できない：

```plain text
<style>
body {
  background-color: #fff;
}
a {
  color: #005580; /* コントラスト比 8:1 */
}
a:hover {
  color: #0088cc; /* コントラスト比 3.9:1 */
}
</style>
...
<a href="/link">リンクテキスト</a>

```

Axe DevToolsに限らず、ウェブ[アクセシビリティ](http://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%B7%A5%D3%A5%EA%A5%C6%A5%A3)のツールで検出される「エラーとなる」項目を0にすることは、達成基準を満たすために必要であるが、ツールはすべての達成基準上の問題を検出できるわけではないので、十分ではない。

## いわゆるスキップリンクについて

WCAG 2.1には「[ブロックス](http://d.hatena.ne.jp/keyword/%A5%D6%A5%ED%A5%C3%A5%AF%A5%B9)キップ」という達成基準がある：

> 達成基準 2.4.1 ブロックスキップ (レベル A): 複数のウェブページ上で繰り返されているコンテンツのブロックをスキップするメカニズムが利用できる。

この達成基準を満たすための、「十分な[達成方法](https://waic.jp/docs/WCAG21/Understanding/bypass-blocks.html#techniques)」は大きく2つのパターンがある。この記事で説明するWCAG 2.1達成方法集にある達成方法もあわせて示す：

1. 繰り返されるブロックをスキップするリンクを作成する 
    - [G1: メインコンテンツエリアへ直接移動するリンクを各ページの先頭に追加する](https://waic.jp/docs/WCAG21/Techniques/general/G1)
2. スキップ可能な方法で繰り返されるブロックをグループ化する 
    - [ARIA11: ページのリージョンを特定するために ARIA ランドマークを使用する](https://waic.jp/docs/WCAG21/Techniques/aria/ARIA11)
    - [H69: コンテンツの各セクションの開始位置に見出し要素を提供する](https://waic.jp/docs/WCAG21/Techniques/html/H69)

具体例として[W3C WAI](https://www.w3.org/WAI/)のページを用いて説明する。

このページでは、ページの冒頭に「Skip to Content」というリンクがあり、このリンクでメインコンテンツまで「スキップ」できる。これはG1の達成方法そのものである。以下にコード断片を示す：

```plain text
<nav>
  <ul>
    <li><a href="#main">Skip to Content</a></li>
    ..
  </ul>
</nav>
<header>...</header>
<main id="main">
  ...
  <h2 id="mwa-title">
    <span class="title">Making the Web Accessible</span>
  </h2>
  ..
</main>

```

一方で、メインコンテンツ（`main`要素の箇所）の開始位置には見出し要素が提供されている（これはH69そのものである）。つまり、2種類の方法で[ブロックス](http://d.hatena.ne.jp/keyword/%A5%D6%A5%ED%A5%C3%A5%AF%A5%B9)キップの達成基準は満たされている。見方を変えると、適切な箇所に見出しさえ提供できていれば、H69の達成方法となるため、自動的に[ブロックス](http://d.hatena.ne.jp/keyword/%A5%D6%A5%ED%A5%C3%A5%AF%A5%B9)キップの達成基準は満たされることになる。言いかえると、WCAGの達成基準を満たすために、スキップリンクを導入することは必須ではない[4](https://momdo.hatenablog.jp/entry/20220815/1660552142#fn:4)。

ところで、ARIA11は[ARIA](http://d.hatena.ne.jp/keyword/ARIA)ランドマークとして`main`ロールについて言及しているが、`main`要素について言及しているわけではない。つまりARIA11そのものではない（しかし`main`要素は`main`ロールと同じ機能なので、ARIA11と同等である）。

これはつまり、解説書の[達成方法](https://waic.jp/docs/WCAG21/Understanding/bypass-blocks.html#techniques)にあるように、

> この節にある番号付きの各項目は、WCAG ワーキンググループがこの達成基準を満たすのに十分であると判断する達成方法、又は複数の達成方法の組み合わせを表している。しかしながら、必ずしもこれらの達成方法を用いる必要はない。その他の達成方法についての詳細は、WCAG 達成基準の達成方法を理解するの「その他の達成方法」を参照のこと。

とあるとおりである。ARIA11ではない、ARIA11によく似た方法で、達成基準は満たすことは可能である。

## 達成方法の位置づけ

前述のARIA11に関連するケースを念頭において、解説書の記述を読んでみる。

[その他の達成方法](https://waic.jp/docs/WCAG21/Understanding/understanding-techniques.html#other-techniques)には次のような文言がある：

> W3C の WCAG 2.1 達成方法集文書にある達成方法に加えて、WCAG 達成基準を満たすその他の方法がある。W3C の達成方法は包括的なものではなく、より新しい技術や状況をカバーしていないかもしれない。
> ウェブコンテンツは、WCAG 2.1 に適合するために [W3C](http://d.hatena.ne.jp/keyword/W3C) が公開している達成方法を用いなくてもよい。(上記達成方法は参考情報であるも参照のこと。)

[達成方法は参考情報である](https://waic.jp/docs/WCAG21/Understanding/understanding-techniques.html#techniques-are-informative)には次のような文言がある：

> 達成方法は、参考情報である。つまり、達成方法は必須要件ではない。WCAG 2.1 への適合を判断する根拠は、WCAG 2.1 で規定している達成基準であり、達成方法ではない。
> 注記 1: [W3C](http://d.hatena.ne.jp/keyword/W3C) は、[W3C](http://d.hatena.ne.jp/keyword/W3C) の十分な達成方法の要求に対して注意を促す。求められる唯一のことは WCAG 2.0[5](https://momdo.hatenablog.jp/entry/20220815/1660552142#fn:5) 達成基準を満たすことである。

つまり、WCAG 2.1達成方法集に記載されている達成方法は、WCAG 2.1を満たすための**参考情報にしか過ぎない**。

## まとめ

- ツールによる[機械的](http://d.hatena.ne.jp/keyword/%B5%A1%B3%A3%C5%AA)なチェックでチェックできることは限られている 
    - ツールにはエラーではないものも検出する（当たり前ではあるのだけれど）
- WCAG2達成方法集は参考情報にしか過ぎない 
    - 達成方法集はすべてをカバーしてはいない
    - 達成方法集に書いていることに全部従う必要はない