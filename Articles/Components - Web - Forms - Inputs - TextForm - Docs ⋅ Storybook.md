---
Created: 2024-12-18T01:34:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-forms-inputs-textform--docs
Tags: [topic/ツール/BRIDGE]
---
# TextForm

## 文字入力フォームコントロールのうち、テキスト入力のためのコンポーネント

**テスト用入力欄**

※ 半角の英字と数字を含む、8文字以上の文字列

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **label*** | フォームのラベルですstring | - |   |
| **type*** | フォームのタイプですunion | - | Choose option...textpasswordemailtelurlnumbersearch |
| **errorMessage** | エラーメッセージです。文字列もしくは文字列の配列を受け取ります。union | - |   |
| **note** | フォームの補足・注釈ですstring | - |   |
| **isLarge** | trueの場合、heightがアイコンボタンを内包したフォーム(PasswordInput)と同じ値になります。PasswordInputと同じ画面に表示させる際に利用します。boolean | - | **Set boolean** |
| **isFixed** | trueの場合、レスポンシブではなく固定サイズとなりますboolean | - | **Set boolean** |
| **labelProps** | label要素が受け取るpropsの内、htmlForを除いたものをオブジェクトで受け取りますOmit | - | **Set object** |
| **inputProps** | input要素が受け取るpropsの内、idとtypeを除いたものをオブジェクトで受け取りますOmit | - | **Set object** |

**このコンポーネントは（現時点では）一部の画面でのみ採用されていますが、利用に制限なくどの画面でも用いることができます。**

しかしレスポンシブverとして利用する場合、（現時点では）アカウント設定のみ利用可能です。

# 概要

文字入力フォームコントロールは、UIの見た目に影響する以下の状態を持ちます（Typeに関わらず共通）。

- 入力可能
    - フォーカスの状態変化があります
- 入力不可：`disabled`
- 読み取り専用：`readonly`
    - Readonly状態時は、標準的なwebの仕様に倣いフォームへのフォーカスを有効にするという仕様です

また、web標準の機能としての属性とは別に、

- エラー状態

を持ちます。

### **文字入力フォームコントロールに関係するUX方針**

CW Specにフォームに関するUX方針がまとめられているので、併せてご確認ください。

[参照：フォームについての方針](https://chatwork.atlassian.net/l/cp/qXGwDN0Z)

# `type=text`と`type=password`の見た目上の違い

とても似たフォームコントロールとして、`<input type=password>`が存在します。

![[Archive/import/Components - Web - Forms - Inputs - TextForm - Docs ⋅ Storybook/New database/New database.base]]

いずれも文字入力の為のフォームコントロールながら、`type=password`の場合にはパスワードの表示／非表示化ボタンを内包するため（ボタン押下可能サイズを担保する必要があるため）、`type=text`のフォームよりも大きいサイズであることが求められます。

そのため、別々のコンポーネントとして定義されています。

[参考情報：達成基準 2.5.5: ターゲットのサイズを理解する](https://waic.jp/translations/WCAG21/Understanding/target-size.html)

### `**type=text**`**のフォームコントロールのサイズを大きくする**

両typeを同一画面上で利用する場合に限り、`type=text`のサイズを`type=password`と同等にする（`isLarge`の値を付与する）ことを許容する点、ご注意ください。

![[Archive/import/Components - Web - Forms - Inputs - TextForm - Docs ⋅ Storybook/New database/New database.base]]

# PCとモバイル〜タブレットでのサイズ差

マウス／キーボードで操作するPCと、タップで操作を行うモバイル〜タブレットとで、フォームコントロールに求められるサイズが異なります。

2024/05/24時点では、

- PC用
    - 内包するテキストサイズに準じたサイズ
- モバイル〜タブレット用
    - WCAGの根拠にもとづき、タップし易い`44csspx`を担保するサイズに固定

とする、異なるサイズ基準をもとにサイズ定義が行われています。

### **モバイル〜タブレットの**`**type=text**`**のサイズ調整**

前項で触れた通り、type=textとtype=passwordを併記する場合にはサイズ調整が必要となりますが、モバイル〜タブレット用のフォームコントロールではタップを前提としたサイズで設計が行われているため、type差分を持ちません。

# アクセシビリティ

### **ラベルについて**

- フォームには原則として`label`を定義してください
    - `label`が存在することで、利用者がタスクを完了するために何を入力すれば良いか理解しやすくなります

デザイン上どうしてもラベルを付与できない場合は、下記の代替手段を参考にしてください

- [3.3.2 ラベル又は説明 - 推奨されない達成方法](https://chatwork.atlassian.net/wiki/spaces/BRDG/pages/4117757978/3.3.2+A#%E6%8E%A8%E5%A5%A8%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84%E9%81%94%E6%88%90%E6%96%B9%E6%B3%95)
- [4.1.2 名前 (name)・役割 (role)・値 (value) - 可視ラベルを利用できない場合の対応](https://chatwork.atlassian.net/wiki/spaces/BRDG/pages/4140238198/4.1.2+name+role+value+A#%E5%8F%AF%E8%A6%96%E3%83%A9%E3%83%99%E3%83%AB%E3%82%92%E5%88%A9%E7%94%A8%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88%E3%81%AE%E5%AF%BE%E5%BF%9C)

### **placeholderについて**

- ラベルの代替としての`placeholder`属性の利用は避けてください
- chatworkの`placeholder`はコントラスト比が低くなりすぎない配色になっています
    - 「入力済」であるとユーザーが勘違いしないように配慮してください
- 入力内容を説明する場合は、`placeholder`属性の代わりにこのコンポーネントの`note`プロパティの利用も検討してください

**placeholderのアクセシビリティ面の問題点**

- 入力が開始されると不可視になるため、短期記憶障害のあるユーザーにとっては利用が難しくなる
- スクリーンリーダーによっては読み上げられません
- （一般的には）コントラスト比が低く、ユーザーや利用状況によっては認識が困難
    - chatworkではコントラスト比`4.5:1`を担保していますので問題ありません

### **エラーメッセージについて**

- エラーメッセージはできるだけ具体的かつわかりやすく記述してください
    - [参考：エラーメッセージ - デザイン方針](https://chatwork.atlassian.net/l/cp/5gLKCMdS)

### **autocomplete属性について**

- 適切な`autocomplete`属性を利用することで、ユーザーエージェントが入力目的を特定可能になり、自動入力を有効活用できます
- 特に認知障害を持つユーザーにとって、フォームの入力が容易になります
- 詳細は下記を参照してください
    - [1.3.5 入力目的の特定［AA]](https://chatwork.atlassian.net/l/cp/jXhNvC7z)
    - [MDN - HTML 属性: autocomplete](https://developer.mozilla.org/ja/docs/Web/HTML/Attributes/autocomplete)
    - [ICS MEDIA - autocomplete属性の書き方](https://ics.media/entry/11221/#autocomplete%E5%B1%9E%E6%80%A7%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9)