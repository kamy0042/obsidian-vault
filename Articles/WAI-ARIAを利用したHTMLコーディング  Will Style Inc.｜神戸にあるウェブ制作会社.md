---
タグ: []
作成日時: 2024-01-20T19:11:00
URL: https://willstyle.co.jp/blog/3357/
Tags: [topic/アクセシビリティ/WAI-ARIA]
---
![[wai-aria.jpg]]

### WAI-ARIA（ウェイ エリア）とは

WAI-ARIAとは、「Web Accessibility Initiative – Accessible Rich Internet Applications」の頭文字をとった、いわゆる略称です。

WAI-ARIAはW3Cで定められた仕様であり、HTMLやSVG内で利用することでアクセシビリティの向上に役立てることができます。

> WAI-ARIA
> WAI-ARIAは、ウェブコンテンツおよびアプリケーションのアクセシビリティと相互運用性を改良するためのフレームワークを提供する技術仕様である。

WAI-ARIAには主に3つの機能が備わっています。

これら3つの機能を付与させることで、HTMLタグに深い意味を持たせることができます。

### ロール（定義）

要素が何なのか・もしくは何をするかを「role属性」を用いて定義することができます。

```plain text
<a class="btn btn-primary" href="#" role="button">Link</a>
<!-- ※属性値は変化しない -->
```

### プロパティ（性質）

「aria-*属性」を用いることで、要素の性質について表現することができます。要素に追加の意図や意味合いを含ませたいときに使う、と表現すると分かりやすいかもしれません。

```plain text
<button aria-label="閉じる" onclick="myDialog.close()">X</button>
<!-- ※属性値は変化しない(例外あり） -->
```

### ステート（状態）

要素の状態を示す際に用います。こちらもプロパティと同様に、[aria-*属性]を用います。

```plain text
<form>
    <div>
        <label for="name">* Name:</label>
        <input type="text" value="name" id="name" aria-required="true"/>
    </div>
</form>
<!-- ※属性値は変化しうる -->
```

### 暗黙のARIAセマンティクス

「WAI-ARIA」は便利な仕様ですが、注意しなければならないのは、あくまでWAI-ARIAは必要な場合のみに使用しなければいけないといった点です。

例えばulやnavなどのHTML5のタグには、同じroleの要素が既に存在しているので重複して記述する必要はありません。

```plain text
<!-- 不適切な例 -->
<ul role="list">
    <li> role="listitem">item</li>
    <li> role="listitem">item</li>
    <li> role="listitem">item</li>
</ul>
<!-- 適切な例 -->
<ul>
    <li>item</li>
    <li>item</li>
    <li>item</li>
</ul>
```

そもそも、WAI-ARIAは、HTMLの適切な仕様で実装できない場合に、それらを補う手段として存在しています。

そのため、JavaScriptやCMSなどで特に制限がない場合は、無理にWAI-ARIAを使うのではなく、適切なタグで記述してあげるのが良いでしょう。

```plain text
<!-- 不適切な例 -->
<div role="list">
    <div role="listitem">item</div>
    <div role="listitem">item</div>
    <div role="listitem">item</div>
</div>
<!-- 適切な例 -->
<ul>
    <li>item</li>
    <li>item</li>
    <li>item</li>
</ul>
```

では、実際にWAI-ARIAを利用したコーディング例を見ていきます。

今回はサンプルとして、Bootstrap4のコンポーネントを参照していきます。

通常、ボタンを実装したいときは、<button>を使用します。

```plain text
<button type="button" class="btn btn-primary">Primary</button>

```

ただし、例えば<a>タグを用いてボタンのようにに見せたいケースもあると思います。

その際は、「role=”button”」を用い、役割を明示してあげる必要があります。

```plain text
<a class="btn btn-primary" href="#" role="button">Link</a>

```

ボタンを無効化したい場合は、「aria-disabled=”true”」で明示してあげましょう。

```plain text
<a href="#" class="btn btn-primary btn-lg disabled" role="button" aria-disabled="true">Primary link</a>

```

```plain text
<form>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

<button>などは、既に適切なタグで表記しているため、roleは必要はありません。

また、「aria-describedby」を用いることで、入力欄と注釈文を紐付けることができます。

### パンくずリスト

```plain text
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li><a class="breadcrumb-item active" aria-current="page">Library</li>
    </ol>
</nav>
```

「aria-label」はプロパティです。これは、文字列でオブジェクトを修飾する機能を持ちます。

これにより、navはbreadcrumb（パンくずリスト）と示すことができました。

「aria-current」では、ステート（状態）を示しています。値にpageを与えることで、サイト内の現在地であることを表現しています。

```plain text
<nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
    </div>
</nav>
<div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
</div>
```

まず、タブの選択エリアを「role=”tablist”」で覆っています。

そして、タブのボタンは「role=”tab”」、タブのコンテンツは「role=”tabpanel”」と、役割が明示されているのがわかります。

「aria-controls」は、プロパティです。値をIDで指定し、コンテンツが制御されている要素を識別しています。

「aria-selected」とありますが、これはステート（状態）を示し、要素の選択状況を表しています。この値は、タブのボタンの選択に伴いながら変化していきます。

### ヘッダーロゴ（インラインSVG）

imgタグであればalt属性で修飾できますが、svgにはそれがありません。

参考としてBootstrap公式を見に行ったところ、<a>タグに「aria-label」で定義付けし、svg内にtitle属性を含めていました。

```plain text
<a class="navbar-brand mr-0 mr-md-2" href="/" aria-label="Bootstrap">
    <svg class="d-block" width="36" height="36" viewBox="0 0 612 612" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <title>Bootstrap</title>
        <path> fill="currentColor" d="M510 8a94.3 94.3 0 0 1 94 94v408a94.3 94.3 0 0 1-94 94H102a94.3 94.3 0 0 1-94-94V102a94.3 94.3 0 0 1 94-94h408m0-8H102C45.9 0 0 45.9 0 102v408c0 56.1 45.9 102 102 102h408c56.1 0 102-45.9 102-102V102C612 45.9 566.1 0 510 0z"></path>
        <path> fill="currentColor" d="M196.77 471.5V154.43h124.15c54.27 0 91 31.64 91 79.1 0 33-24.17 63.72-54.71 69.21v1.76c43.07 5.49 70.75 35.82 70.75 78 0 55.81-40 89-107.45 89zm39.55-180.4h63.28c46.8 0 72.29-18.68 72.29-53 0-31.42-21.53-48.78-60-48.78h-75.57zm78.22 145.46c47.68 0 72.73-19.34 72.73-56s-25.93-55.37-76.46-55.37h-74.49v111.4z"></path>
    </svg>
</a>
```

また、わたしは下記のような書き方でも対応しました。

```plain text
<svg class="d-block" width="36" height="36" viewBox="0 0 612 612" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title">
    <title id="title">Bootstrap</title>
    <path fill="currentColor" d="M510 8a94.3 94.3 0 0 1 94 94v408a94.3 94.3 0 0 1-94 94H102a94.3 94.3 0 0 1-94-94V102a94.3 94.3 0 0 1 94-94h408m0-8H102C45.9 0 0 45.9 0 102v408c0 56.1 45.9 102 102 102h408c56.1 0 102-45.9 102-102V102C612 45.9 566.1 0 510 0z"></path>
    <path fill="currentColor" d="M196.77 471.5V154.43h124.15c54.27 0 91 31.64 91 79.1 0 33-24.17 63.72-54.71 69.21v1.76c43.07 5.49 70.75 35.82 70.75 78 0 55.81-40 89-107.45 89zm39.55-180.4h63.28c46.8 0 72.29-18.68 72.29-53 0-31.42-21.53-48.78-60-48.78h-75.57zm78.22 145.46c47.68 0 72.73-19.34 72.73-56s-25.93-55.37-76.46-55.37h-74.49v111.4z"></path>
</svg>
```

SVGでは、スクリーンリーダーによる<title>タグの読み上げができないようです。そこで、「aria-labelledby」で参照するかたちをとりました。

> svgタグのアクセシビリティ
> SVG単体では、<title>タグと<desc>がスクリーンリーダーで適切に読み上げられないため、WAI-ARIAを使ってアクセシブルにする必要があります。

### スクリーンリーダーへの対応

先程、「スクリーンリーダー」という言葉が出てきたので、これについても解説していきます。

スクリーンリーダーとは、「画面の表示内容や操作内容などを音声で読み上げてくれるソフト」です。

弱視など視覚障害をお持ちの方は、健常者と同じ様にWebサイトやアプリケーションを閲覧することができません。

そこで、パソコンやスマートフォンを利用する際はスクリーンリーダーを使用することで、必要な情報に到達することができるようになります。

Webのアクセシビリティでは、スクリーンリーダーへの配慮も意識する必要があり、またその際にもWAI-ARIAを利用することができます。

例えば、「視覚的にコンテンツは見せたいが、スクリーンリーダーでは読み上げられてほしくない」ときなどは、「aria-hidden」属性を付与して回避することができます。

```plain text
<a href="#" class="navbar-brand d-flex align-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2" focusable="false" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
    <strong>Album</strong>
</a>
```

逆に、「コンテンツとしては隠しておきたいが、スクリーンリーダーでは読み上げてほしい」要素については、下記のようなCSSで対応することができます。

```plain text
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
}
```

WAI-ARIAに、はじめは取っ付きにくさや抵抗感を感じていましたが、少しずつ意識しながらコーディングができるようになりました。

複雑でわかりにくいといった方は、この記事のように、一度自分なりに体系的にまとめてみると理解が深まるのかなと感じています。

これからも、アクセシビリティへの配慮が行き届いたコーディング・デザインができればと思います。