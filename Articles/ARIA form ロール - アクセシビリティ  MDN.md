---

Tags: [topic/アクセシビリティ/WAI-ARIA]
---
![[mdn-social-share.cd6c4a5a.png]]

## [説明](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E8%AA%AC%E6%98%8E)

フォーム (`form`) ランドマーク ([landmark](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/ARIA_Techniques#landmark_roles)) は、(メイン ([`main`](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/main_role)) や検索 ([`search`](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/search_role)) など) 他の名前付きランドマークが適切でない場合に、全体として結合してフォームを作成する、項目とオブジェクトのコレクションを含むコンテンツのリージョンを識別します。

**メモ:** [`<form>`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/form) 要素を使用すると、アクセス可能な名前が提供されている場合、コンテンツのセクションがフォーム (`form`) ランドマークとして自動的に伝えられます。 開発者は、ARIA を使用するよりも正しい意味論の HTML 要素を使用することを常に好むべきです。

可能であれば、HTML の [`<form>`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/form) 要素を使用してください。 `<form>` 要素は、アクセス可能な名前 (`aria-labelledby`、`aria-label`、`title` など) がある場合にフォーム (`form`) ランドマークを定義します。 ユーザーがフォームの目的を理解できるように、文書内の各フォームに一意のラベルを付けるようにしてください。 このラベルは、支援技術のユーザーだけでなく、全てのユーザーに表示するべきです。 フォームを検索機能に使用する場合は、フォーム (`form`) ランドマークの代わりに検索 (`search`) ランドマークを使用してください。

`role="form"` は、ページのリージョンを識別するために使用し、フォームフィールドそれぞれを識別するために使用しないでください。 `<form>` の代わりにフォーム (`form`) ランドマークを使用している場合でも、`<button>`、`<input>`、`<select>`、`<textarea>` などのネイティブな HTML フォームコントロールを使用することをお勧めします。

### [関連する WAI-ARIA のロール、ステート、プロパティ](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E9%96%A2%E9%80%A3%E3%81%99%E3%82%8B_wai-aria_%E3%81%AE%E3%83%AD%E3%83%BC%E3%83%AB%E3%80%81%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E3%80%81%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)

ロールに固有のステートやプロパティはありません。

### [キーボードインタラクション](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%A9%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3)

ロールに固有のキーボードインタラクションはありません。

### [必要な JavaScript 機能](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E5%BF%85%E8%A6%81%E3%81%AA_javascript_%E6%A9%9F%E8%83%BD)

[`onsubmit`](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#onsubmit)  onSubmit イベントハンドラーは、フォームの送信時に発生するイベントを処理します。 `<form>` でないものは送信できないため、JavaScript を使用して、[`XMLHTTPRequest`](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest) などの代替データ送信メカニズムを構築する必要があります。 

## [例](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E4%BE%8B)

html

```plain text
<div role="form" id="send-comment" aria-label="コメントを追加">
  <label for="username">ユーザー名</label>
  <input
    id="username"
    name="username"
    autocomplete="nickname"
    autocorrect="off"
    type="text" />

  <label for="email">電子メール</label>
  <input
    id="email"
    name="email"
    autocomplete="email"
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    type="text" />

  <label for="comment">コメント</label>
  <textarea id="comment" name="comment"></textarea>

  <input value="コメント" type="submit" />
</div>

```

代わりに `<form>` を使用することをお勧めします。

html

```plain text
<form id="send-comment" aria-label="コメントを追加">....</form>

```

## [アクセシビリティに関する懸念](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%87%B8%E5%BF%B5)

### [控えめに使用する](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E6%8E%A7%E3%81%88%E3%82%81%E3%81%AB%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)

[ランドマークロール](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/ARIA_Techniques#landmark_roles)は、文書のより大きな全体的なセクションを識別することを意図しています。 あまりにも多くのランドマークロールを使用すると、スクリーンリーダーで「ノイズ」が発生し、ページ全体のレイアウトを理解することが難しくなります。

### [入力はフォームではない](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E5%85%A5%E5%8A%9B%E3%81%AF%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84)

[フォーム要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element#forms)（入力、テキスト領域、選択など）それぞれで `role="form"` を宣言する必要はありません。 それは、フォーム要素を包む HTML 要素で宣言するべきです。 理想的には、包む要素として [`<form>`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/form) 要素を使用し、`role="form"` を宣言しないでください。

### [検索](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E6%A4%9C%E7%B4%A2)

フォームを検索に使用する場合は、より専門化した `role="search"` 値を使用するべきです。

### [ランドマークのラベル付け](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E3%83%A9%E3%83%B3%E3%83%89%E3%83%9E%E3%83%BC%E3%82%AF%E3%81%AE%E3%83%A9%E3%83%99%E3%83%AB%E4%BB%98%E3%81%91)

ランドマークとして公開する必要がある、それぞれの [`<form>`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/form) 要素とフォームロール (form `role`) には、アクセス可能な名前を付ける必要があります。 この名前により、支援技術のユーザーはフォームランドマークの目的をすばやく理解できるようになります。

`role="form"` を与えたのと同じ要素で、`aria-labelledby`、`aria-label`、または `title` を使用して、アクセス可能な名前を付けます。

### `role="form"` の使用

html

```plain text
<div role="form" id="gift-cards" aria-label="ギフトカードの購入">
  <!-- フォームのコンテンツ -->
</div>

```

### 冗長な説明

スクリーンリーダーは、ランドマークロールの種類をアナウンスします。 このため、ラベルでランドマークが何であるかを説明する必要はありません。 例えば、`role="form"` の宣言に `aria-label="お問い合わせフォーム"` を使用した場合、「お問い合わせフォームフォーム」として重複してアナウンスすることがあります。

## [ベストプラクティス](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E3%83%99%E3%82%B9%E3%83%88%E3%83%97%E3%83%A9%E3%82%AF%E3%83%86%E3%82%A3%E3%82%B9)

### [好ましい HTML](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E5%A5%BD%E3%81%BE%E3%81%97%E3%81%84_html)

[`<form>`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/form) 要素を使用すると、セクションがフォーム (`form`) ロールを持つことを自動的に伝えます。 可能であれば、`<form>` を代わりに使用することをお勧めします。

### [追加された利点](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E8%BF%BD%E5%8A%A0%E3%81%95%E3%82%8C%E3%81%9F%E5%88%A9%E7%82%B9)

ブラウザー拡張などの特定の技術は、ページ上に存在する全てのランドマークロールのリストを生成することができ、スクリーンリーダーを使用していないユーザーでも文書の大きなセクションを素早く識別してナビゲートできます。

- [ランドマークブラウザー拡張](https://matatk.agrip.org.uk/landmarks/)（英語）

## [仕様](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/form_role#%E4%BB%95%E6%A7%98)

Specification

---

[Accessible Rich Internet Applications (WAI-ARIA) ](https://w3c.github.io/aria/#form)[# form](https://w3c.github.io/aria/#form)

---

[Unknown specification](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/form.html)

---