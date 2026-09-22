---
タグ: []
作成日時: 2024-10-07T16:52:00
URL: https://ics.media/entry/11221/
Tags: [topic/アクセシビリティ, topic/デザイン/UIデザイン]
---
![](https://ics.media/entry/11221/images/eyecatch.jpg)

みなさん、入力フォームを制作する際、どのような施策をおこなっていますか？ 入力項目を見直したり、入力ステップを明確にしたりなど、入力フォーム最適化をおこなっていると思います。そのことで、コンバージョン率があがったり、ユーザーがストレスを感じないようになるでしょう。入力フォーム最適化は[EFO対策](https://ja.wikipedia.org/wiki/%E5%85%A5%E5%8A%9B%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E6%9C%80%E9%81%A9%E5%8C%96) = Entry Form Optimizationとも呼ばれます。

**サイトの設計段階で検討すべきことが多いですが、コーディングでも考慮すべき事が多々あります**。今回はHTMLコーダーがエントリーフォームを制作する際に考慮すべき点について紹介します。

※本記事では最近のブラウザに適したHTMLコーディング方法の紹介を目的としています。そのため、デザインとアクシビリティーでのベストプラクティスを紹介したものではありませんのでご了承ください。

### 自動入力機能に対応しよう

Google Chrome（デスクトップ、iOS、Android）とSafari（macOS、iOS）ではフォームに自動的に連絡先を入力する機能があります。動画で紹介しているように、自動入力機能を使えばわずらわしい入力を一発で済ますことができます。

![](https://ics.media/entry/11221/images/160304_EFO_demo.gif)

この機能をブラウザで使うには次の設定をおこないます。

- [Chromeブラウザの設定方法](https://support.google.com/chrome/answer/142893?hl=ja)
- [Safariブラウザの設定方法](https://support.apple.com/ja-jp/guide/iphone/iphccfb450b7/ios)
- [Edgeブラウザの設定方法](https://support.microsoft.com/ja-jp/microsoft-edge/microsoft-edge-%E3%81%A7%E3%81%AE-web-%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%AE%E3%82%AA%E3%83%BC%E3%83%88%E3%82%B3%E3%83%B3%E3%83%97%E3%83%AA%E3%83%BC%E3%83%88-d0410ada-ed6d-f2b6-998b-9dcf321e7e31)

誰もが自動入力機能を有効にしているわけではありませんが、この機能を普段から使っているユーザーからすれば負担が少なくなります。ただでさえ離脱率が高い入力フォーム。少しでも離脱率を改善するために、自動入力機能を施策として実施してみるのは効果的です。次にデモとソースコードを掲載していますのでお試しください。

![](https://ics.media/entry/11221/images/240501_title_demo_page.png)

- [デモを別ウインドウで開く](https://ics-creative.github.io/160304_form_autocompletetype/index.html)
- [ソースコードを確認する](https://github.com/ics-creative/160304_form_autocompletetype/blob/gh-pages/index.html)

まずはこの自動入力機能に対応させるための`input`要素の書き方を解説します。

### autocomplete属性の書き方

```plain text
<input type="text" name="name" autocomplete="name" />

```

`input`要素に`autocomplete`属性を設定することで、フォームへの自動入力を有効にできます。この属性を適切に設定することで、ユーザーはブラウザーに登録している情報を自動で入力できます。代表的な項目を以下にまとめました。

- `name` : 姓名
- `family-name` : 姓
- `given-name` : 名
- `email` : メールアドレス
- `postal-code` : 郵便番号
- `address-level1` : 都道府県
- `address-level2` : 市区町村
- `address-line1` : 番地・マンション名（1行目）
- `address-line2` : 番地・マンション名（2行目）
- `organization` : 会社名
- `off` : 自動入力を無効にする

その他、生年月日や性別、クレジット情報の項目などもあります。詳しくはWHATWG（ワットダブルジー）が提供している「WHATWG Standard」の[AutoFill](https://html.spec.whatwg.org/multipage/forms.html#autofill)についての仕様をご覧ください。

`autocomplete`属性は、セキュリティの観点から`off`にしているウェブサイトも多いですが、現在はほとんどのブラウザーで無視されてしまうため、`off`に設定してもあまり意味がありません。**自動入力を使用しているユーザーがいるのであれば、そのユーザーが利用しやすいように設定しておくべき**だと思います。

この属性を設定するうえでの注意点と工夫としては次となります。

- 都道府県は`select`要素だと、自動入力が効かないことがあるため、`input`要素にするのが無難
- 生年月日の自動入力はSafariのみ有効。Chromeは未対応

### input要素のname属性の値を適切に設定する

✕ NGの例

```plain text
<input type="text" name="YBBG" />

```

◯ OKの例

```plain text
<input type="text" name="postal-code" autocomplete="postal-code" />

```

各サイトのエントリーフォームを見ていると、サイトにより`name`値の命名規則はさまざまです。たとえば姓を`name1`や`familyname`としているサイトや、郵便番号を`zip`や`postal`、ひどい場合だと`YBBG`（You Bin Ban Gou）というパラメーターを見たことがあります。

`name`値は、前項で紹介した`autocomplete`属性が設定されていない場合、`**name**`**値の名称を見てブラウザー側が自動入力する情報を判断している**ように見受けられるため、適切な名称を設定するべきであると思います。無難なアイデアとしては`autocomplete`属性で定義されている名称で設定します。`autocomplete`値を設定せず`name`値が適当なものだと、自動入力が働かなかったり、逆に意図しない場所に入力されてしまうなど、余計にユーザーの手間がかかる場合があります。`name`属性を指定する際は注意して設定しましょう。

### 昔ながらのフォームのセオリーから脱却しよう

みなさんは住所入力で全角入力が強制されうんざりしたことはありませんか？ 番地を入力したところ「**全角で入力してください**」と弾かれてしまった経験は何度もあるでしょう。

全角数字と半角数字はサーバーサイドで簡単に変換できるはずなのに、ユーザーがわざわざ半角数字を全角数字で入力しなおさなければならないことが多いです。

このような不便なことがないようにシステムエンジニアと相談し、使いやすい入力フォームを目指しましょう。次に、簡単に改善できる対策をまとめました。

- **電話番号や郵便番号のフォームを複数にわけない**。自動入力が効かないことも理由の1つだが、そもそも手入力でも煩わしい。モバイルフレンドリーではない
- **住所の数字を全角入力必須としない**。全角/半角はいずれも可とする。ユーザーのリテラシーによっては全角半角の区別がつかないため
- 読み仮名欄でカナかなが異なっていたらサーバーサイドで変換するべき
- 半角スペースと全角スペースの違いは許容する

![](https://ics.media/entry/11221/images/160310_form_ng.png)

### 最適なキーボードを設定する

デスクトップブラウザーだけでなく、スマートフォンでも多くのユーザーがフォームを利用しています。キーボードを適切に設定されていないと入力時にユーザーがストレスを感じてしまい、コンバージョン率の低下につながります。

下記は一例ですが、入力項目に応じて適切なキーボードを設定しましょう。キーボードの指定には以下の2種類の方法があります。

1. `type`属性を利用する
2. `inputmode`属性を利用する

### メールアドレス

```plain text
<input type="email" name="email" autocomplete="email" />

```

`type="email"`と指定すると、iOSでの場合はUSキーボードが起動し、[Space]の横に`@`や`.`のボタンが表示されます。

![](https://ics.media/entry/11221/images/160304_EFO_keyboard_email-512x401.png)

### 電話番号

```plain text
<input type="tel" name="tel" autocomplete="tel" />

```

`type="tel"`と指定すると、テンキーのキーボードが起動します。

![](https://ics.media/entry/11221/images/160304_EFO_keyboard_tel-512x401.png)

### 英字入力の項目

```plain text
<input name="username" type="text" autocomplete="username" autocorrect="off" autocapitalize="off" />

```

iOSでは英字入力の場合に、先頭の文字を自動的に大文字入力にする機能（Auto Capitalize）やアルファベットのスペルミスを正してくれる機能（Auto Correct）が動作します。文章を入力する際はこれらの補助機能は便利なのですが、フォームでのユーザー名の入力などでは意図した文字が入力できなかったりと、ユーザーにストレスを与えてしまいます。

`autocorrect="off"`と`autocapitalize="off"`を設定し、これらの機能が不要な項目では設定を無効にしましょう。

![](https://ics.media/entry/11221/images/160304_EFO_textfield_autocorrect-512x464.png)

Auto Correct

### さまざまなキーボード入力の指定方法

`input`タグの`type`属性は便利ですが、指定できるオプションに限りがあります。対して、`inputmode`属性を利用するとキーボードの入力種別を指定できます。

たとえば、`inputmode`属性でURLを入力させたい場合は次のように指定します。

```plain text
<input type="text" inputmode="url" />

```

さまざまな値を指定できるので参照ください。

![](https://ics.media/entry/11221/images/images/201201_efo_inputmode.png)

- [inputmode - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/inputmode)

### ページ離脱時にアラートを表示する

フォーム入力時に誤って閉じてしまい、はじめからやり直した事はありませんか？ 再度やり直してくれればよいですが、そのまま離脱してしまうケースもあると思います。下記のJavaScriptを実装しておくと、画面遷移時に警告を出し、誤って閉じてしまうケースを無くせます。

![](https://ics.media/entry/11221/images/160304_EFO_conform.png)

```plain text
window.addEventListener("beforeunload", (event) => {
  const confirmationMessage = "入力内容を破棄します。";
  event.returnValue = confirmationMessage;
  return confirmationMessage;
});

```

※`beforeunload`イベントはiOS Safariには対応しておりません。

### おわりに

エントリーフォームの最適化は、サイト設計やデザイン面だけでなく、**コーディングフェーズでも考慮すべき点は多くあります**。コーディング時に上記のようなちょっとした対応を行うだけで、ユーザービリティーが大きく向上します。マークアップエンジニアの方も**コンバージョン率アップのために意識して制作をおこないましょう**。

以下の入力フォームのウェブアクセシビリティーを高めるための記事や、フォームバリデーションに関する記事もあわせて参照ください。

- 『[お問い合わせフォームのウェブアクセシビリティー対応の方法](https://ics.media/entry/201016/)』
- 『[2024年版 HTMLで作るフォームバリデーション](https://ics.media/entry/240418/)』

※この記事が公開されたのは**8年前**ですが、**4か月前の5月**に内容をメンテナンスしています。