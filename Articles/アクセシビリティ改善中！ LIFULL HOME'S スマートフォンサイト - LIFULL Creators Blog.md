---
タグ: []
作成日時: 2024-04-14T15:31:00
URL: https://www.lifull.blog/entry/accessibility-improvements-homes-sp
Tags: [topic/アクセシビリティ]
---
フロントエンドエンジニアの嶌田です。株式会社 LIFULL でプロダクトのアクセシビリティ向上をミッションとして活動しています。

本日は、不動産・住宅情報の総合サービスである [LIFULL HOME'S のスマートフォンサイト](https://www.homes.co.jp/smp/)において、過去半年間で実施したアクセシビリティ向上施策をご紹介します。ご紹介する施策のうちいくつかは、内容を掘り下げて実装コードを交えて解説をしていきます。

それでは、早速アクセシビリティ向上のために実施した施策を見ていきましょう。

ウェブサイトにおいて、ユーザーがアクションを実行するためにボタンが用いられます。ボタンは通常 `button` 要素を使って実装するのが望ましいですが、適切ではない要素（例えば `a` 要素、`span` 要素、`p` 要素など）を使って実装された箇所が数多くありました。これでは**キーボード操作ができず、スクリーンリーダーにも「ボタン」であることが伝わりません**。そこで、私たちはこれらの要素を正しくボタンにし、キーボード操作が可能になるよう改善を行いました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/L/LIFULL-202005002/20230329/20230329105214.png)

p 要素、 dt 要素、 a 要素、 span 要素など、様々な要素で実装されたボタンたち

`button` 要素に差し替えるのが王道です。とはいえ、`button` 要素がデフォルトで持っているスタイルのリセットや、要素セレクタに依存した JS の処理の存在を考慮すると、要素の書き換えによって予期しない不具合を呼び込んでしまうかもしれません。ノーリスクかつ最小工数を目指したかった私たちは、WAI-ARIA を使って役割を上書きすることにしました。

次のような HTML があったとします。

```plain text
<p class="load-more">
  もっと見る
</p>

```

`p` 要素はデフォルトで `paragraph` の役割を持っています[1](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:1)。ボタンではありません。ボタンであることを示すために、`role` 属性を使って役割を上書きします。

```plain text
<p class="load-more" role="button">
  もっと見る
</p>

```

次に、キーボードで操作できるようにします。このボタンはマウスクリックで機能が実行されるようになっていますが、キーボードフォーカスが当たらないためキーボードのみで操作できません。`tabindex="0"` を設定すると、通常のインタラクティブ要素（`a` 要素やフォーム関連要素など）のようにフォーカスを受取るようになります。

```plain text
<p class="load-more" role="button" tabindex="0">
  もっと見る
</p>

```

これで問題が解決したと思いきや、キーボード操作を試すと、元々の機能が実行されないことに気付きます。`button` 要素や `a` 要素でないと、Enter キーや Space キーが押されたときに `click` イベントが発火しないことが原因です。JavaScript を使ってここの穴を埋めてあげましょう。コード例[2](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:2)は Stimulus です。

```plain text
<p
  class="load-more"
  role="button"
  tabindex="0"
  data-controller="button"
  data-action="keydown->button#keyboardClick"
>
  もっと見る
</p>

```

```plain text
// button_controller.js

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  keyboardClick(event) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      this.element.click();
    }
  }
}

```

以上の対応により、p 要素がボタンとしての意味と振る舞いを持つようになりました。さらに、HTML の構造が変わらないため、スタイルの調整は不要であり、既存のイベントハンドラを修正する必要もありません。

## 追加コンテンツを読み込む機能のフォーカス管理

LIFULL HOME'S では、クリックにより追加コンテンツが表示される UI パターンがよく使われています。このパターンでは、ボタンをクリックするとボタンが消え、追加コンテンツが表示されます。このボタンが消える特徴は、ディスクロージャー[3](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:3)と呼ばれる UI パターンとはやや異なります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/L/LIFULL-202005002/20230329/20230329111245.png)

ボタンをクリックするとボタンは消え、代わりに追加のコンテンツが表示される

この部分にアクセシビリティ上の問題がありました。**ボタンを押すと同時にボタンが消え、同時にキーボードフォーカスが失われてしまう**のです。フォーカスの位置がわからなくなり、キーボード操作を行うユーザーにとって不便な状況が生じます。この問題を解決するために、**ボタンをクリックしたときに表示されるコンテンツにフォーカスを当てる**ように改善を行いました。

次の HTML コードを想定します。追加で読み込まれるコンテンツには `hidden` クラスが付いています。CSS で `.hidden { display: none }` が指定されていると想定してください。

```plain text
<div>
  <a href="...">敷金礼金0（ゼロ・なし）の物件</a>
  <a href="...">新築・築浅物件</a>
</div>
<button class="load-more" type="button">
  もっと見る
</button>
<div class="hidden">
  <a href="...">二人暮らし物件</a>
  <a href="...">タワーマンション（高層マンション）</a>
</div>

```

追加コンテンツの表示には `hidden` クラスを取り除き、ボタンを非表示にするには `hidden` クラスを付与します。

キーボード操作の場合、元々フォーカスがあったボタンが消えてしまいます。そこで、追加で表示されるコンテンツにフォーカスを移動してあげることで、キーボード操作のユーザーが操作箇所を見失わないようにします。

これらの観点を実装すると以下のようになります。まず HTML に、`aria-controls` 属性を使って、ボタンの操作対象となる要素を関連付けます[4](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:4)。

```plain text
<div>
  <a href="...">敷金礼金0（ゼロ・なし）の物件</a>
  <a href="...">新築・築浅物件</a>
</div>
<button
  class="load-more"
  type="button"
  aria-controls="next-content"
  data-controller="inlay"
  data-action="inlay#show"
>
  もっと見る
</button>
<div id="next-content" class="hidden">
  <a href="...">二人暮らし物件</a>
  <a href="...">タワーマンション（高層マンション）</a>
</div>

```

JavaScript のコードは次のようになります。ボタンをクリックすると `show` メソッドが呼ばれます。やや複雑ですが、**追加で表示される最初のタブ可能な要素にフォーカスを当てる**という処理が読み取れるでしょうか？ また、コード内で使用されている `tabbable` 関数は、パラメーターに渡された要素内の「タブ可能な」要素を列挙し、配列として返す npm パッケージです[5](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:5)。

```plain text
// inlay_controller.js

import { Controller } from '@hotwired/stimulus';
import { tabbable } from 'tabbable';

export default class extends Controller {
  show() {
    this.nextContent.classList.remove('hidden');
    this.element.classList.add('hidden');
    this.firstTabbableItem?.focus();
  }

  get nextContent() {
    let control = this.element.getAttribute('aria-controls');
    return document.getElementById(control);
  }

  get firstTabbableItem() {
    return tabbable(this.nextContent)[0];
  }
}

```

## チェックボックスに適切な名前を付ける

物件の一覧ページでは、物件を複数選び、まとめて不動産屋に問い合わせたり、お気に入りに追加したりできる機能が提供されています。そのために各物件にはチェックボックスが設けられています。しかし、このチェックボックスには適切な名前が設定されておらず、スクリーンリーダーで利用するときに「クリック可能 チェックボックス チェックなし」としか読み上げられず、**何のチェックボックスなのかわからない**状況が発生しています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/L/LIFULL-202005002/20230329/20230329111427.png)

スクリーンリーダーでチェックボックスにフォーカスを当てると「クリック可能 チェックボックス チェックなし」と読み上げられる

HTML を見ると、チェックボックスが単体で置かれているだけで、ラベルと紐づいていないことがわかります。

```plain text
<div class="room">
  <input type="checkbox">
  <div class="spec">
    <p class="photo noImage">No Image</p>
    <p class="spec">
      -/3LDK/120.00m²
      8.5万円 管理費:12,000円
      敷金1ヶ月/礼金1ヶ月
    </p>
  </div>
</div>

```

この問題を解決する難しさは、チェックボックスが建物全体ではなく各部屋を対象としているため、簡潔で明確なラベルが存在しないことです。適切な名前を設定するためには、適切な場所を探し出し、それを名前として使用する必要があります。

解決策として、**部屋の間取り・面積・賃料などを表すテキスト部分をラベルとして使用**しました。チェックボックスとラベルは離れた場所にあるため、`label` 要素の `for` 属性を使うか、チェックボックスに `aria-labelledby` 属性をつけることで名前を指定します。今回は事情[6](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:6)があって、`aria-labelledby` を用いました。

```plain text
<div class="room">
  <input type="checkbox" aria-labelledby="room-0123">
  <div class="spec">
    <p class="photo noImage">No Image</p>
    <p id="room-0123" class="spec">
      -/3LDK/120.00m²
      8.5万円 管理費:12,000円
      敷金1ヶ月/礼金1ヶ月
    </p>
  </div>
</div>

```

この対応により、スクリーンリーダーによる読み上げは「クリック可能 -/3LDK/120.00m² 8.5万円 管理費:12,000円 敷金 1ヶ月/ 礼金 1ヶ月 チェックボックス チェックなし」となりました。正直なところ、この読み上げ方で完全に不便なく利用できるかは疑問が残りますが、何もない状態よりは改善されているでしょう。

カルーセルはアクセシビリティ上の問題が起きやすい UI です。スライダーなどとも呼ばれたりします。LIFULL HOME'S のトップページにもドドンとカルーセルが置かれています。カルーセルに起因する問題はいろいろとありますが、中でも致命的な問題につながるのは「自動再生」です。一定時間ごとにスライドが切り替わる機能です。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/L/LIFULL-202005002/20230329/20230329111738.gif)

3秒ごとにスライドが切り替わるカルーセル

LIFULL HOME'S のカルーセルも自動再生つきのものでした。自動再生するカルーセルは WCAG の達成基準「[2.2.2 一時停止、停止、非表示](https://waic.jp/translations/WCAG21/#pause-stop-hide)」に違反しており、**動きのあるコンテンツの動きを追うのが苦手な人や、切り替わるスピードに合わせて文字を読み切れない人は利用が難しいでしょう。動きに気を取られて注意が維持できなくなる人は、ページのほかの部分が利用できなくなることすらあり得ます。**

代表的な解決策は「一時停止ボタンを設ける」というものです。自動再生はするものの、一時停止ボタンを押せば動きは止まるため、自分のペースでスライドを見ていけるようになります。

今回、私たちは「**自動再生せず、アクセスごとにスライドをランダムに並び替える**」というアプローチをとりました。自動再生を導入するモチベーションは、複数の優先度の高いコンテンツをユーザーに提示することです。ランダムに並び替えて表示することでも同様の結果は得られるだろうと考えました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/L/LIFULL-202005002/20230329/20230329111931.png)

自動再生されなくなったカルーセル

うれしかった副次的効果として、もともと後ろのほうに追いやられていたスライドのクリック率が向上しました。カルーセルのスライドは、最初に表示されるスライドの優先度が高いという「大まかな」傾向はある一方、後のほうのスライドの優先度が低いとは必ずしも言えません。スライドをランダムに並び替えると、これまで埋もれていたスライドがユーザーに届くようになる可能性もあり、ランダム化は意外と多くのユースケースで有効な手法かもしれないと思いました。

ちなみに、スライドを前後に送るボタンもコントラストを高くし、視認性が向上しています。

## スクリーンリーダーによる検索結果の件数の読み上げ

LIFULL HOME'S では、物件を探す際に検索条件を指定することができます。現在の条件で検索した場合のヒット件数が、画面下部にリアルタイムで表示されます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/L/LIFULL-202005002/20230329/20230329112059.png)

検索条件を変更すると、該当物件の件数がリアルタイムに更新される

スクリーンリーダーの利用者は、このような**操作と離れた場所で変化が起こったことに気づくことができません**。件数を知るためには、フォームを送信して物件一覧ページまで遷移するか、検索条件の最下部にあるボタンの横まで読み進めなければなりません。

これを解決するために、**該当物件件数の部分をライブリージョンとしてマークアップする**ことで、件数の変化がスクリーンリーダーで読み上げられるようになります。

```plain text
<!-- これまで：変化がスクリーンリーダーで読み上げられない -->
<p class="itemTxt">
  該当物件<br>
  <span class="num">1,366</span>件
</p>

```

```plain text
<!-- 修正後：変化がスクリーンリーダーで読み上げられる -->
<p class="itemTxt" role="status">
  該当物件<br>
  <span class="num">1,366</span>件
</p>

```

`role="status"` という属性が追加されています。この属性によって物件数の部分が「ライブリージョン」となり、内容の変化は逐次スクリーンリーダーによって読み上げられるようになります。類似の属性として `role="alert"` もあり、こちらはより緊急度の高いフィードバックのために用います[7](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:7)。

さて、件数の表示はもう少しだけ複雑な仕様がありました。検索条件が変更されたあと、件数の表示が即座に行われるわけではないという点です。設定された条件の該当物件数がいくつあるかサーバーに問い合わせを行いますが、その間は件数の表示が「…」に変わるのです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/L/LIFULL-202005002/20230329/20230329122438.png)

この表示になっている間はスクリーンリーダーで読み上げさせないようにしたいです。そこで、読み込みが行われている間は `aria-busy` 属性を `true` に設定することで、読み込み中はテキスト読み上げが行われないようにしました。

```plain text
<p class="itemTxt" role="status" aria-busy="true">
  該当物件<br>
  <span class="num">...</span>件
</p>

```

以上の対応で、スクリーンリーダーを使用しているユーザーも、該当物件数を確認しながら、自由に検索条件を調整できるようになりました。

さらに、事前に実施していたテストによって明らかになった多くの問題点も修正しています。

- **名前の付いていないボタンに名前を設定する**
名前がなかったボタンに適切な名前を設定しました。スクリーンリーダー利用者もボタンの機能を理解しやすくなりました。
- **モーダルダイアログのフォーカス管理、キーボード操作対応**
キーボード操作だけでモーダルダイアログを利用できるようになりました。
- **ピンチアウトでズームできるようにする**
これまでスマートフォンサイトはビューポートの設定（`user-scalable=no`）によってピンチアウトでのズームが制限されていましたが、この制約を解除しました。
- **アイコンやテキストのコントラスト改善**
一部のアイコンやテキストのコントラストが不足していたため、十分なコントラストが得られるように色を調整しました[8](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fn:8)。

本記事では、ウェブアクセシビリティ向上に向けた取り組みとして、いくつかの改善策について解説しました。解説した内容は多くのウェブサイトやサービスで共通するものだと思います。この内容を参考に、ぜひあなたのプロダクトのアクセシビリティ改善に役立ててください。

また、キーボードや支援技術ユーザーの皆さんには是非サイトを使ってみていただき、感想をお聞かせください。ご意見をもとに、さらにアクセスしやすいウェブサイトにしていきたい気持ちです！

ここ半年くらいをかけて、LIFULL HOME'S のスマートフォンサイトのアクセシビリティを改善してきました。デスクトップサイトは次の半年で改善を加えていく予定です。テスクトップサイトは特に歴史が長く、コアなファンも多いと聞きます。これからも、一人でも多くのユーザーが快適にサービスを利用できるように品質向上に努めてまいります。

お読みいただきありがとうございました。LIFULL では共に働く仲間を募集しています！

1. `aria-controls` 属性である必要は必ずしもありません。操作対象の要素を特定できる仕組みとして `data` 属性を用いてもいいでしょう。[↩](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fnref:4)
2. 部屋のスペック部分が `ul` 要素でマークアップされていたため、`label` 要素で括ることができなかったことが理由です。[↩](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fnref:6)
3. `role="alert"` は `role="status"` よりも高い緊急度を持つ領域のマークアップに向いています。`role="status"` の領域での変化は適度なタイミングで読み上げられる一方、`role="alert"` は即座に読み上げられることが期待されます。[↩](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fnref:7)
4. LIFULL のブランドカラー `#ED6103` は白色 `#FFFFFF` と組み合わせて用いられますが、この２色間のコントラストはテキストに対して不足（3.32:1）しています。社内的には [APCA](https://apcacontrast.com/) のコントラスト計算方式を推奨しており、問題ない（59.7）としています。[↩](https://www.lifull.blog/entry/accessibility-improvements-homes-sp#fnref:8)