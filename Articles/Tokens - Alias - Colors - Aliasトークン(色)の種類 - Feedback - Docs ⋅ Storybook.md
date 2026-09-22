---
Created: 2024-12-18T01:06:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-feedback--docs
Tags: [topic/ツール/BRIDGE]
---
# **Feedback**

ユーザーがインタラクティブな要素を操作した際の視覚的なフィードバックとして利用します。

選択された状態での色の変化や、透過色によるオーバーレイなどが該当します。

# Selected

- 何らかの要素が選択されている状態を、背景色の変化によって表す時に利用します
- トグルボタンとしての役割を持つUIやセレクトボックスに利用します

**path:**`{プロパティ}.feedback.selected.{状態}`

**light**defaultbackgroundbordertext
CeruleanBlue.85

hoveredbackgroundbordertext
CeruleanBlue.70

pressedbackgroundbordertext
CeruleanBlue.100

disabledbackgroundbordertext
CeruleanBlue.85
**dark**defaultbackgroundbordertext
CeruleanBlue.alphaDark

hoveredbackgroundbordertext
CeruleanBlue.100

pressedbackgroundbordertext
BlackAlpha.10

disabledbackgroundbordertext
CeruleanBlue.alphaDark
**
Checked**
• フォームがチェックされている状態を表します
• ラジオボタンやチェックボックスに利用します**path:**`{プロパティ}.feedback.checked.{状態}`**light**defaultbackgroundbordertext
CeruleanBlue.100

pressedbackgroundbordertext
Gray.70

disabledbackgroundbordertext
Casper.55
**dark**defaultbackgroundbordertext
CeruleanBlue.25

pressedbackgroundbordertext
WhiteAlpha.70

disabledbackgroundbordertext
Casper.55
**
overlay**
• 透過色のレイヤーによって要素を強調表示したい時に利用します
• 選択する / カーソルを合わせる / クリックするといった操作に対して、固有の背景色が存在しない箇所にレイヤーとして被せるように用います
• 固有の背景色が存在している場合は、その色の状態ごとのバリエーションによって対応できないか検討してください
    ◦ 例：background.action.primary.defaultを背景色としたボタンにカーソルを合わせた時は、background.action.primary.hoverを用いる**path:**`{プロパティ}.feedback.overlay.{状態}`**light**defaultbackgroundbordertext
Casper.10
CeruleanBlue.85
hoveredbackgroundbordertext
Casper.10
CeruleanBlue.85
pressedbackgroundbordertext
BlackAlpha.10
CeruleanBlue.85**dark**defaultbackgroundbordertext
Casper.85
Casper.10
hoveredbackgroundbordertext
Casper.85
Casper.10
pressedbackgroundbordertext
BlackAlpha.25
Casper.10

**
hidden**
• ユーザーによる操作の結果、特定の箇所を非活性として扱いたい時に利用します
• ダイアログを表示時のバックドロップ等に用いられます
• ライトテーマ/ダークテーマ共に同じ色を使用します**path:**`{プロパティ}.feedback.hidden`**light**backgroundbordertext
BlackAlpha.70
**dark**backgroundbordertext
BlackAlpha.70
**
focus**
• 一般的なフォーカスリングに利用します**path:**`{プロパティ}.feedback.focus`**light**backgroundbordertext

Casper.25**dark**backgroundbordertext

Casper.70

**
focus-input**
• 入力フォームにフォーカスした時に利用します**path:**`{プロパティ}.feedback["focus-input"]`**light**backgroundbordertext

CeruleanBlue.100**dark**backgroundbordertext

Casper.40

**
focus-attention**
• フォーカス時、ユーザーに対して注意喚起を行いたい時に利用します
• 現在は組織外ユーザーが存在する時のメッセージ入力欄に使われています
• ライトテーマ/ダークテーマ共に同じ色を使用します**path:**`{プロパティ}.feedback["focus-attention"]`**light**backgroundbordertext

CarrotOrange.lightText**dark**backgroundbordertext

CarrotOrange.lightText

**
highlight**
• 要素にマウスカーソルを合わせた際、ボーダーによってハイライトする時に利用します
• ハイライトする際は、ボーダーの内側に`box-shadow:{celureanblue.alpha} 0px 0px 0px 2px inset`を設定してください**path:**`{プロパティ}.feedback.highlight.{状態}`**light**hoveredbackgroundbordertext

CeruleanBlue.40**dark**hoveredbackgroundbordertext

Casper.55

**
highlight-sub**
• 要素にマウスカーソルを合わせた際、ボーダーによってハイライトする時に利用します
• 現在はメッセージおよびメッセージアクションバーでのみ利用されています**path:**`{プロパティ}.feedback["highlight-sub"].{状態}`**light**hoveredbackgroundbordertext

CeruleanBlue.25**dark**hoveredbackgroundbordertext

Black
