---

Tags: [topic/技術/HTML]
---
[https://ics.media/entry/250417/](https://ics.media/entry/250417/)

前回の記事『[階層メニューやトーストUIが簡単に作れる新技術! JavaScriptで利用するポップオーバーAPI](https://ics.media/entry/230530/)』ではポップオーバーAPIについて紹介しました。今回はその続編として、Chrome 133、Edge 133で新しく追加された`popover="hint"`属性に焦点を当てます。ツールチップなどのUIの実装に便利な属性で、その特徴や使い方、他の属性との違いを詳しく説明します。

![](https://ics.media/entry/250417/images/250417_usage.jpg)

### ポップオーバーAPIのおさらい

まずはポップオーバーAPIについて簡単におさらいしましょう。ポップオーバーAPIはその名の通りポップオーバーを実装するためのものです。ポップオーバーとは画面上の最前面に表示させるUIで、確認メッセージやトースト、メニューなどに使えます。

ポップオーバーAPIを使わなくてもCSS、JavaScriptを駆使して同じようなUIを作れますが、**ポップオーバーAPIを使えば細かなケアを実装する手間が省けます。**たとえば以下のような機能はポップオーバーAPIに標準で備わっているため自分で実装する必要はありません。

- ポップオーバーAPIを使って表示させたUIは`z-index`の値にかかわらず画面の最上レイヤーに配置される
- ポップオーバーの外側をクリック、または`Esc`キーで閉じる
- 複数のポップオーバーがあった場合は勝手に他を閉じてくれる

### popover="hint"属性とは

ポップオーバーAPIには当初`popover="auto"`と`popover="manual"`の2種類の属性がありました。この2つでは解決できない用途のために追加されたのが`popover="hint"`属性です。

[Chrome for Developersのブログ](https://developer.chrome.com/blog/popover-hint?hl=ja)によると、ポップオーバーAPIを利用する場面は主に2つと考えられています。1つめは**メニューやダイアログなど「永続的」なUI**です。画面の操作を行うのに必要で、ユーザーが能動的に開閉する動作を行います。2つめは**ツールチップなどの「一時的」なUI**です。操作に必須ではないけれど、補助的な情報などを一時的に表示させます。

`**popover="hint"**`**は2つめの「一時的」なUIを実現するために追加されました。**

### それぞれの属性の特徴と使いわけ

3つの属性（`auto`、`manual`、`hint`）それぞれの特徴と使いわけについて説明します。このセクションで使われているデモは以下から確認できるので、記事を読み進めながら実際に操作してみてください。

また、`auto`と`manual`については[前回の記事](https://ics.media/entry/230530/)でも詳しく説明しています。こちらもあわせてご確認ください。

- [サンプルを別タブで開く](https://ics-creative.github.io/250417_popover-hint/)
- [ソースコードを確認する](https://github.com/ics-creative/250417_popover-hint)

### `popover="auto"`属性の特徴

`popover="auto"`は「永続的」なUIを作るときに使用します。デモではメニューのパネルに使用しました。特徴としては主に3つです。

**特徴**

1. JavaScriptを使用せずにHTMLとCSSだけで表示/非表示を実装可能
2. ポップオーバーの外側をクリックまたは`Esc`キーで閉じられる
3. 複数のポップオーバーがあった場合は他を閉じる（一度に表示できるポップオーバーは1つだけ）※ネストされた場合は例外

![](https://ics.media/entry/250417/images/250417_auto.jpg)

### `popover="manual"`属性の特徴

`popover="manual"`は、`auto`や`hint`では実現できないケースに使用します。デモではトーストに使用しています。このトーストは`Esc`キーや外側クリックでは閉じず、画面に複数表示させるため`manual`が適しています。

**特徴**

4. `auto`と`hint`では実現できない特殊なユースケースに使う
5. 表示/非表示をJavaScriptで実装する必要がある
6. 外側クリック、`Esc`キーでは閉じない
7. 一度に複数のポップオーバーが表示できる

![](https://ics.media/entry/250417/images/250417_manual.jpg)

### `popover="hint"`属性の特徴（今回の新機能）

今回追加された`popover="hint"`は前述の通り「一時的」なUIに使います。デモではツールチップに使っています。`hint`が登場する前は`auto`か`manual`で実装するところですが、それぞれの属性では少し使い勝手が悪いところがありました。

`auto`でツールチップを実装した場合、一度に表示できるポップオーバーは1つだけのため、メニューのパネルとツールチップは共存できません。`manual`の場合は、`Esc`や外側クリックで閉じる挙動などを自分で実装する必要があります。

そこで`hint`属性の登場です。`hint`属性を持ったポップオーバーは**表示/非表示はJavaScriptで実装する必要がありますが、**`**Esc**`**や外側クリックで閉じる機能は備わっています。**

また、`**hint**`**属性"以外"のポップオーバーと共存できる**ため、メニューやトーストと同時に表示できます。逆に`hint`を持ったポップオーバー同士で表示できるのは1つのため、ツールチップが複数表示される心配はありません。

**特徴**

8. 表示/非表示をJavaScriptで実装する必要がある
9. ポップオーバーの外側をクリックまたは`Esc`キーで閉じられる
10. 複数の`hint`以外のポップオーバーと共存できる

![](https://ics.media/entry/250417/images/250417_hint.jpg)

### popover="hint"属性の使い方

先ほどのデモで表示したツールチップを例に、`popover="hint"`属性の使い方を解説します。

### 1. HTML要素に`popover="hint"`を付与

ツールチップとして使いたい要素に`popover="hint"`を付与します。

```plain text
<span
  class="hint js-menu-hint"
  popover="hint" // ⭐️hint属性を付与
  style="position-anchor: --menu-like"
>
  <span class="hint__inner">いいね</span>
</span>

```

### 2. ツールチップの表示/非表示の実装

`popover="hint"`属性を付与しただけでは画面に表示されません。表示（または非表示に）するにはJavaScriptでの実装が必要です。

このデモでは、`mouseenter`時にツールチップを表示させ、`mouseleave`で非表示にします。`showPopover()`、`hidePopover()`メソッド、`:popover-open`疑似クラスの詳細は[前回の記事](https://ics.media/entry/230530/)をご確認ください。

```plain text
// mouseenterでツールチップを表示する
button.addEventListener("mouseenter", () => {
  const tooltip = button.parentElement.querySelector(".js-menu-hint");
  if (tooltip && !tooltip.matches(":popover-open")) {
    tooltip.showPopover();
  }
});

button.addEventListener("mouseleave", () => {
  // mouseleaveでツールチップを非表示にする
  const tooltip = button.parentElement.querySelector(".js-menu-hint");
  if (tooltip && tooltip.matches(":popover-open")) {
    tooltip.hidePopover();
  }
});

```

### 3. ツールチップのスタイルを調整

ツールチップのスタイルをCSSで調整します。ツールチップの位置は各ボタンの上部中央に表示するため、[CSSアンカー位置指定](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_anchor_positioning)の`anchor-name`や`position-anchor`プロパティを使用しています。

CSSアンカー位置指定は、2025年4月現在Chrome、Edgeでのみ使用できる機能です。[前回の記事](https://ics.media/entry/230530/)でも解説しているのでこちらも参考にしてください。

▼ HTML

```plain text
<button
  class="menu-button"
  aria-label="いいね"
  style="anchor-name: --menu-like" // ⭐️アンカーの名前を指定
>
</button>
<span
  class="hint js-menu-hint"
  popover="hint"
  style="position-anchor: --menu-like" // ⭐️アンカーの名前を指定
>
  <span class="hint__inner">いいね</span>
</span>

```

▼ CSS

```plain text
.hint {
  position-area: top; // ⭐️ どこに配置するかを指定
  padding-bottom: 6px;
  margin-bottom: 2px;
  opacity: 0;
  scale: 0.8;
  translate: 0 8px;
  transition: opacity 0.2s, scale 0.2s, translate 0.2s;
}

```

### 4. アニメーションさせる

ポップオーバーがふわっと出てきてふわっと消えるアニメーションをつけてみましょう。

ポップオーバーの表示アニメーションを実現するには`@starting-style`というアットルールが必要です。アニメーションの開始値を`@starting-style`であらかじめ定義しておくことで、非表示の状態から表示に切り替わる際のアニメーションが可能になります。

```plain text
.hint {
  position-area: top;
  padding-bottom: 6px;
  margin-bottom: 2px;
  /* ツールチップが消えた時の状態 */
  opacity: 0;
  scale: 0.8;
  translate: 0 8px;
  /* トランジションの設定 */
  transition: opacity 0.2s, scale 0.2s, translate 0.2s;
}

.hint:popover-open {
  /* ツールチップが表示された時の状態 */
  opacity: 1;
  scale: 1;
  translate: 0 0;
}

@starting-style {
  /* アニメーションの開始時の状態をあらかじめ定義しておく */
  .hint:popover-open {
    opacity: 0;
    scale: 0.8;
    translate: 0 8px;
  }
}

```

### コラム：将来的にはJavaScriptを使わずに実装できる？

`popover="hint"`を付与した要素は、前述した通りJavaScriptで表示/非表示を切り替える必要があります。現在開発中の[Interest Invokers API](https://open-ui.org/components/interest-invokers.explainer/)では`interesttarget`という属性を付与するだけでホバーをきっかけとした制御を可能にします。

JavaScriptでの制御がなくなれば実装の手間がさらに減るので、今後に期待したいですね！

**▼**`**interesttarget**`**の実装イメージ**

```plain text
<button
  class="menu-button"
  aria-label="いいね"
  style="anchor-name: --menu-like"
  interesttarget="menu-like" // ⭐️表示/非表示を制御したい要素のidを指定するとホバーで切り替えられる
>
</button>
<span
  id="menu-like" // ⭐️idを指定する
  class="hint js-menu-hint"
  popover="hint"
  style="position-anchor: --menu-like"
>
  <span class="hint__inner">いいね</span>
</span>

```

### 対応ブラウザ

`popover="hint"`属性は2025年4月現在、Chrome 133、Edge 133（2025年2月）以降で対応しています。

- 参照：[Can I use…](https://caniuse.com/mdn-api_htmlelement_popover_hint)

![](https://ics.media/entry/250417/images/250417_caniuse.jpg)

### まとめ

新しく登場した`popover="hint"`属性について紹介しました。2025年4月時点ではChromeとEdgeのみ対応しているため、実際に使うタイミングはあまりないかもしれません。`popover="auto"`や`popover="manual"`と組み合わせて使うととても便利なので、すべてのブラウザーで使えるようになるのを楽しみにしています！

### 参考サイト

- [ポップオーバー = ヒント | Blog | Chrome for Developers](https://developer.chrome.com/blog/popover-hint?hl=ja)
- [ポップオーバー API の使用 - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Popover_API/Using)
- [Chrome 133 | Release notes | Chrome for Developers](https://developer.chrome.com/release-notes/133?hl=ja)