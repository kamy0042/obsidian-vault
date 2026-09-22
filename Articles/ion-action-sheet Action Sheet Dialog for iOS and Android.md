---
タグ: []
作成日時: 2024-04-14T17:19:00
URL: https://ionicframework.jp/docs/api/action-sheet/#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3
Tags: [topic/デザインシステム/リファレンス]
---
![[open-graph.png]]

# ion-action-sheet

[CSSカスタムプロパティ](https://ionicframework.jp/docs/api/action-sheet/#css-custom-properties-1) は、個々の要素を対象とすることなく、アクションシートのスタイルに使用することができます。

## アクセシビリティ

### Screen Readers

アクションシートは、スクリーンリーダーにとって [アクセシブル](https://ionicframework.jp/docs/reference/glossary#a11y) であるためにariaプロパティを設定しますが、これらのプロパティは、十分な説明になっていなかったり、アクションシートがアプリでどのように使用されているかに合っていなかったりする場合、オーバーライドすることができます。

### Role

アクションシートには `role` として [`dialog`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role) が設定されます。ARIA仕様に合わせるためには、`aria-label`属性か`aria-labelledby`属性のどちらかを設定しなければなりません。

### Action Sheet の概要

Ionicは自動的にヘッダー要素を指すように `aria-labelledby` を設定するので、すべてのアクションシートには `header` プロパティを定義することを強く推奨します。しかし、`header`を含めない場合は、`htmlAttributes`プロパティを使って、説明的な`aria-label`を指定するか、カスタムの`aria-labelledby`値を設定することもできます。

- Angular
- Javascript
- React
- Vue

```plain text
const actionSheet = await this.actionSheetController.create({
htmlAttributes: {
'aria-label': 'action sheet dialog',
},
});

```

### Action Sheet Buttons の概要

テキストを含むボタンはスクリーンリーダーによって読み取られる。ボタンがアイコンのみを含んでいる場合や、既存のテキスト以外の説明が必要な場合は、ボタンの `htmlAttributes` プロパティに `aria-label` を渡して、ラベルをボタンに割り当てる必要があります。

- Angular
- Javascript
- React
- Vue

```plain text
const actionSheet = await this.actionSheetController.create({
header: 'Header',
buttons: [
{
icon: 'close',
htmlAttributes: {
'aria-label': 'close',
},
},
],
});

```

## Interfaces

### ActionSheetButton

```plain text
interface ActionSheetButton<T = any> {
  text?: string;
  role?: 'cancel' | 'destructive' | 'selected' | string;
  icon?: string;
  cssClass?: string | string[];
  id?: string;
  htmlAttributes?: { [key: string]: any };
  handler?: () => boolean | void | Promise<boolean | void>;
  data?: T;
}

```

### ActionSheetOptions

```plain text
interface ActionSheetOptions {
  header?: string;
  subHeader?: string;
  cssClass?: string | string[];
  buttons: (ActionSheetButton | string)[];
  backdropDismiss?: boolean;
  translucent?: boolean;
  animated?: boolean;
  mode?: Mode;
  keyboardClose?: boolean;
  id?: string;
  htmlAttributes?: { [key: string]: any };
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}

```

## プロパティ

### animated

| **Description** | `true`の場合、アクションシートはアニメーションを行います。 |
| --- | --- |
| **Attribute** | `animated` |
| **Type** | `boolean` |
| **Default** | `true` |

### backdropDismiss

| **Description** | `true`の場合、バックドロップがクリックされるとアクションシートが解除されます。 |
| --- | --- |
| **Attribute** | `backdrop-dismiss` |
| **Type** | `boolean` |
| **Default** | `true` |

### buttons

| **Description** | アクションシートのボタンの配列です。 |
| --- | --- |
| **Attribute** | `undefined` |
| **Type** | `(string ｜ ActionSheetButton<any>)[]` |
| **Default** | `[]` |

### cssClass

| **Description** | カスタムCSSに適用する追加のクラス。複数のクラスを指定する場合は、スペースで区切る必要があります。 |
| --- | --- |
| **Attribute** | `css-class` |
| **Type** | `string ｜ string[] ｜ undefined` |
| **Default** | `undefined` |

### enterAnimation

| **Description** | アクションシートの提示時に使用するアニメーションです。 |
| --- | --- |
| **Attribute** | `undefined` |
| **Type** | `((baseEl: any, opts?: any) => Animation) ｜ undefined` |
| **Default** | `undefined` |

### header

| **Description** | アクションシートのタイトルです。 |
| --- | --- |
| **Attribute** | `header` |
| **Type** | `string ｜ undefined` |
| **Default** | `undefined` |

### htmlAttributes

| **Description** | アクションシートに渡す追加属性。 |
| --- | --- |
| **Attribute** | `undefined` |
| **Type** | `undefined ｜ { [key: string]: any; }` |
| **Default** | `undefined` |

### isOpen

| **Description** | `true`の場合、アクションシートは開かれます。`false`の場合、アクションシートは閉じます。プレゼンテーションの細かな制御が必要な場合はこれを使用し、そうでない場合は actionSheetController または `trigger` プロパティを使用します。注意: アクションシートが終了しても、`isOpen`は自動的に`false`に戻されません。あなたのコードでそれを行う必要があります。 |
| --- | --- |
| **Attribute** | `is-open` |
| **Type** | `boolean` |
| **Default** | `false` |

### keyboardClose

| **Description** | `true`の場合、オーバーレイが表示されたときにキーボードが自動的に解除されます。 |
| --- | --- |
| **Attribute** | `keyboard-close` |
| **Type** | `boolean` |
| **Default** | `true` |

### leaveAnimation

| **Description** | アクションシートが解除されたときに使用するアニメーションです。 |
| --- | --- |
| **Attribute** | `undefined` |
| **Type** | `((baseEl: any, opts?: any) => Animation) ｜ undefined` |
| **Default** | `undefined` |

### mode

| **Description** | modeは、どのプラットフォームのスタイルを使用するかを決定します。 |
| --- | --- |
| **Attribute** | `mode` |
| **Type** | `"ios" ｜ "md"` |
| **Default** | `undefined` |

### subHeader

| **Description** | アクションシートのサブタイトルです。 |
| --- | --- |
| **Attribute** | `sub-header` |
| **Type** | `string ｜ undefined` |
| **Default** | `undefined` |

### translucent

| **Description** | `true`の場合、アクションシートは半透明になります。modeが `"ios"` で、デバイスが [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility) をサポートしている場合にのみ適用されます。 |
| --- | --- |
| **Attribute** | `translucent` |
| **Type** | `boolean` |
| **Default** | `false` |

### trigger

| **Description** | クリックするとアクションシートが開くトリガー要素に対応するID。 |
| --- | --- |
| **Attribute** | `trigger` |
| **Type** | `string ｜ undefined` |
| **Default** | `undefined` |

## イベント

| Name | Description |
| --- | --- |
| `didDismiss` | アクションシートが解散した後に発行されます。ionActionSheetDidDismissの略記。 |
| `didPresent` | アクションシートが提示された後に発行されます。ionActionSheetWillDismissの略語。 |
| `ionActionSheetDidDismiss` | アクションシートが解散した後に発行されます。 |
| `ionActionSheetDidPresent` | アクションシートが提示された後に発行されます。 |
| `ionActionSheetWillDismiss` | アクションシートが解散する前に発行されます。 |
| `ionActionSheetWillPresent` | アクションシートが提示される前に発行されます。 |
| `willDismiss` | アクションシートが解散する前に発行されます。ionActionSheetWillDismissの略記。 |
| `willPresent` | アクションシートが提示される前に発行されます。ionActionSheetWillPresentの略記。 |

## メソッド

### dismiss

| **Description** | アクションシートのオーバーレイが提示された後、それを解除します。 |
| --- | --- |
| **Signature** | `dismiss(data?: any, role?: string) => Promise<boolean>` |

### onDidDismiss

| **Description** | アクションシートが解散したときに解決するPromiseを返します。 |
| --- | --- |
| **Signature** | `onDidDismiss<T = any>() => Promise<OverlayEventDetail<T>>` |

### onWillDismiss

| **Description** | アクションシートが解散するタイミングを解決するPromiseを返します。 |
| --- | --- |
| **Signature** | `onWillDismiss<T = any>() => Promise<OverlayEventDetail<T>>` |

### present

| **Description** | アクションシートのオーバーレイを作成後に提示します。 |
| --- | --- |
| **Signature** | `present() => Promise<void>` |

## CSS Shadow Parts

No CSS shadow parts available for this component.

## CSSカスタムプロパティ

| Name | Description |
| --- | --- |
| `--backdrop-opacity` | 背景の不透明度 |
| `--background` | アクションシートグループの背景 |
| `--button-background` | アクションシートボタンの背景 |
| `--button-background-activated` | アクションシートボタンが押されたときの背景。注意：これを設定すると、Material Designの波紋に干渉します。 |
| `--button-background-activated-opacity` | アクションシートボタンが押されたときの背景の不透明度 |
| `--button-background-focused` | にタブしたときのアクションシートボタンの背景。 |
| `--button-background-focused-opacity` | にタブしたときのアクションシートボタンの背景の不透明度。 |
| `--button-background-hover` | ホバー時のアクションシートボタンの背景 |
| `--button-background-hover-opacity` | ホバー時のアクションシートボタンの背景の不透明度 |
| `--button-background-selected` | 選択したアクションシートボタンの背景 |
| `--button-background-selected-opacity` | 選択されたアクションシートボタンの背景の不透明度 |
| `--button-color` | アクションシートボタンの色 |
| `--button-color-activated` | アクションシートボタンが押されたときの色 |
| `--button-color-focused` | にタブで移動したときのアクションシートのボタンの色。 |
| `--button-color-hover` | ホバー時のアクションシートボタンの色 |
| `--button-color-selected` | 選択されたアクションシートのボタンの色 |
| `--color` | アクションシートテキストの色 |
| `--height` | アクションシートの高さ |
| `--max-height` | アクションシートの最大の高さ |
| `--max-width` | アクションシートの最大幅 |
| `--min-height` | アクションシートの最小高さ |
| `--min-width` | アクションシートの最小幅 |
| `--width` | アクションシートの横幅 |

## Slots

No slots available for this component.

[Edit this page](https://github.com/ionic-team/ionic-docs/tree/main/docs/api/action-sheet.md)