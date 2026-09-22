---
タグ: []
作成日時: 2024-10-21T12:43:00
URL: https://shuaruta.github.io/ARIA-Barriers/2024/10/20/checkbox-mixed.html
Tags: [topic/アクセシビリティ, topic/デザイン/UIデザイン]
---
[@nishimotz](https://github.com/nishimotz) です。

[ウェブアクセシビリティLT＆交流会 vol.4](https://a11y-discord.connpass.com/event/331889/) に参加して、交流会で話したことを、あとで気になって調べてみたのが今回の記事です。

混合状態(部分的にチェック済み)のチェックボックスは、あるオプションが複数のサブオプションを統括しているような場合に便利な UI 要素です。

しかし、アクセシビリティを確保するためには、適切な実装が必要だとされています。

さて、どうしたらいいのでしょうか。

## APGの実装

ARIA Authoring Practices Guide (APG) [Checkbox Example (Mixed-State)](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/) の実装を見てみましょう。

テキストだけ日本語に翻訳しました。

```plain text
<fieldset class="checkbox-mixed">
  <legend>
    サンドイッチの具材
  </legend>
  <div role="checkbox"
       class="group_checkbox"
       aria-checked="mixed"
       aria-controls="cond1 cond2 cond3 cond4"
       tabindex="0">
    すべての具材
  </div>
  <ul class="checkboxes">
    <li>
      <label>
        <input type="checkbox" id="cond1">
        レタス
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox"
               id="cond2"
               checked="">
        トマト
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" id="cond3">
        マスタード
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" id="cond4">
        スプラウト
      </label>
    </li>
  </ul>
</fieldset>

```

APGの実装で重要なARIA属性は以下の通りです。

- `role="checkbox"`: 要素がチェックボックスであることを示します。
- `tabindex="0"`: キーボードフォーカスを受け取れるようにします。
- `aria-checked="mixed"`: チェックボックスが部分的にチェックされた状態を示します。
- `aria-controls`: 制御する子チェックボックスのIDを指定します。

JavaScriptでは、チェックボックスの状態を管理し、aria-checked属性を適切に更新する必要があります。状態は以下の通りです。

- false: 「チェックなし」
- true: 「すべてチェック」
- mixed: 「部分的にチェック」

以下のキーボード操作に対応しています。

- `Tab` キー: チェックボックス間を移動
- `スペースキー`: チェックボックスの状態を切り替え

APGの実装では、OSのハイコントラストモードを考慮してCSSでカスタマイズを行っています。 ここでは深入りしません。

以下はこのコードの一部を取り出したデモです。操作はできませんが、NVDA が「一部チェック」と読み上げます。

すべての具材

## 改善したつもりなのに

混合状態のチェックボックスを、div 要素ではなく、input 要素で実装してみます。

```plain text
<fieldset class="checkbox-mixed">
  <legend>
    サンドイッチの具材
  </legend>
  <label>
    <input
      type="checkbox"
      role="checkbox"
      class="group_checkbox"
      aria-checked="mixed"
      aria-controls="cond1 cond2 cond3 cond4"
      tabindex="0">
    すべての具材
  </label>
  <!-- 省略 -->
</fieldset>

```

なんとなく、このほうがよさそうだな、と思いましたか？

どうして APG はこうしなかったのでしょう？

ためしにこれを NVDA と Chrome で読み上げてみましょう。

すべての具材

aria-checked=”mixed” という属性があるのに「チェックボックス チェックなし すべての具材」になりました。

もうすこしよく考えてみましょう。

## 強いネイティブセマンティクス

HTML標準のチェックボックス (input) 要素には、以下の値があります。

- `checked` プロパティ
- `indeterminate` プロパティ

もちろん div 要素にはこれらの属性はありません。

checked プロパティはチェックの有無を表します。値は true または false となり、JavaScript からは boolean 値を代入できます。HTML では checked 属性が存在する場合に true となります。このコードでは true の意味で `checked=""` と書かれています。

indeterminate プロパティは混合状態を表します。 aria-checked 属性の mixed に相当する場合に true となり、それ以外の場合に false となります。HTML としては indeterminate 属性は存在しません。

checked や indeterminate は「強いネイティブセマンティクス」を持つとされ、aria-checked 属性よりも優先されます。

[role 属性とは、aria-* 属性とは、WAI-ARIA とは、いったい何なのか、いつ使うべきなのか](https://qiita.com/ymrl/items/6c9c059208ea11e6d7bc)

だから div 要素にはただ

- aria-checked: mixed

とするだけで混合状態を表現できたのですが、input 要素の場合は

- aria-checked: mixed
- indeterminate: false

と解釈され、indeterminate の値が優先されて、混合状態を表現できなかったようです。

HTML の属性では制御できないとのことなので JavaScript を直さないといけませんね。

でも input 要素でもともと混合状態がサポートされているのであれば、もしかして WAI-ARIA はいらないのでは？

## 標準的な要素を使用した実装

標準的なチェックボックス要素を使用しつつ、混合状態を表現する方法を考えてみましょう。

MDN [input 要素の checkbox 型](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/checkbox) には「未決定状態のチェックボックス」として説明されています。

## aria-checked を使わないデモ

## aria-controls 属性

ところで `aria-controls`属性がスクリーンリーダーによって適切にサポートされている場合、以下が期待されます。

- `aria-controls`で指定された要素に直接ジャンプする機能により、ユーザーは関連する子チェックボックスにすばやくアクセスできる（かも知れません）。
- 「このチェックボックスは他の4つの要素を制御しています」のような追加情報を提供できる（かも知れません）。

ただし、例えば[NVDAは aria-controls 属性をまだサポートしていません](https://github.com/nvaccess/nvda/issues/8983)。

aria-controls 属性は[アクセシビリティ サポーテッド](https://waic.jp/guideline/as/)ではないかも知れないですね。

## やっぱり less ARIA is better

Accessible Rich Internet Applications (WAI-ARIA) 1.3 日本語訳 [checkboxロール](https://momdo.github.io/wai-aria-1.3/#checkbox) の注には、

> 
> HTMLのネイティヴチェックボックスの強いネイティヴセマンティックスのために、著者はinput type=checkboxでaria-checkedを使用しないことを勧める。むしろ、チェックボックスの”チェック済み”または”混合”状態をそれぞれ指定するために、ネイティヴのchecked属性またはindeterminate IDL属性を使用する。

と説明されていました。

APG の実装例は、なにげなく書かれているようで、実はちょっとアレンジしただけで前提が成り立たなくなることがあると気づきました。注意が必要です。

さらに言えば、APG の実装例は WAI-ARIA をあえて使っている例ばかりです。可能であれば「WAI-ARIA を使用しない」ほうがよいはずです。

HTML の要素そのものを正しく理解し、HTML を適切に使用し、不要な WAI-ARIA 属性は削除することをお勧めします。