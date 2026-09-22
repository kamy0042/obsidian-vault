---
Created: 2024-12-18T01:02:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-action--docs
Tags: [topic/ツール/BRIDGE]
---
# **Action**

ボタンやフォームなど、ユーザーが直接操作し、システムに影響を与えるUIに利用します。

1つの定義が1つのUIに対応しているわけではありません。あるUIを構成するために複数種類のトークンを用いることもあります。

※ 例：TextButtonにマウスオーバーした時の背景色に[background.feedback.overlay.hovered](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ftokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-feedback--docs#overlay)を用いる等

# primary

- ユーザーが直接操作するUIのうち、画面上の強度が高いもの（=ユーザーにとってより重要なもの）に利用します
- 枠や背景色を持つボタン等に利用できます
    - ボタンの背景色として用いる場合、ラベルの視認性を維持するために`text.general.on-background`と組み合わせてください
- ボタンの強度の説明は[ボタン概要](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ffoundations-buttons-overview--docs)を参照してください

**path:**`{プロパティ}.action.primary.{状態}`

**light**defaultbackgroundbordertext
CeruleanBlue.70
CeruleanBlue.70
hoveredbackgroundbordertext
CeruleanBlue.55
CeruleanBlue.55
pressedbackgroundbordertext
CeruleanBlue.85
CeruleanBlue.85
disabledbackgroundbordertext
CeruleanBlue.alphaCommon
CeruleanBlue.alphaCommon**dark**defaultbackgroundbordertext
CeruleanBlue.70
CeruleanBlue.70
hoveredbackgroundbordertext
CeruleanBlue.55
CeruleanBlue.55
pressedbackgroundbordertext
CeruleanBlue.85
CeruleanBlue.85
disabledbackgroundbordertext
CeruleanBlue.alphaCommon
CeruleanBlue.alphaCommon

**
secondary**
• ユーザーが直接操作するUIのうち、通常の強度のものに利用します
• 強調する必要のない一般的なボタン等に用いられます
• 枠や背景色を持つボタン等に利用できます
    ◦ ボタンの背景色として用いる場合、基本的にはラベル色として`text.general.primary`を組み合わせてください
• ボタンの強度の説明は[ボタン概要](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ffoundations-buttons-overview--docs)を参照してください**path:**`{プロパティ}.action.secondary.{状態}`**light**defaultbackgroundbordertext
Alice.light.50
Alice.light.100
Gray.85hoveredbackgroundbordertext
White
Alice.light.90
Gray.85pressedbackgroundbordertext
Alice.light.60
Alice.light.100
Gray.85disabledbackgroundbordertext
WhiteAlpha.25
Casper.25
Gray.25**dark**defaultbackgroundbordertext
WhiteAlpha.05
WhiteAlpha.25
WhiteAlpha.85hoveredbackgroundbordertext
Casper.70
000
WhiteAlpha.85pressedbackgroundbordertext
Casper.85
Casper.85
WhiteAlpha.85disabledbackgroundbordertext
WhiteAlpha.05
000
WhiteAlpha.25

**
tertiary**
• ユーザーが直接操作するUIのうち、最も強度が低いものに利用します
• テキストボタンや一般的なアイコンボタンに用いられます
• ボタンの強度の説明は[ボタン概要](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ffoundations-buttons-overview--docs)を参照してください**path:**`{プロパティ}.action.tertiary.{状態}`**light**defaultbackgroundbordertext


CeruleanBlue.100hoveredbackgroundbordertext


CeruleanBlue.85pressedbackgroundbordertext


Gray.70disabledbackgroundbordertext


Casper.55**dark**defaultbackgroundbordertext


CeruleanBlue.25hoveredbackgroundbordertext


Whitepressedbackgroundbordertext


WhiteAlpha.70disabledbackgroundbordertext


Casper.55

**
danger**
• ユーザーが直接操作するUIのうち、操作結果に危険が伴うもの（削除など）に利用します
• ユーザーに対して警告が必要なボタン等に用いられます
• ボタンの背景色として用いる場合、ラベルの視認性を維持するために`text.general.on-background`と組み合わせてください**path:**`{プロパティ}.action.danger.{状態}`**light**defaultbackgroundbordertext
Crimson.85
Crimson.85
Crimson.85hoveredbackgroundbordertext
Crimson.70
Crimson.70
Crimson.70pressedbackgroundbordertext
Crimson.100
Crimson.100
Crimson.100disabledbackgroundbordertext
Crimson.alpha
Crimson.alpha
Crimson.alpha**dark**defaultbackgroundbordertext
Crimson.85
Crimson.85
Crimson.40hoveredbackgroundbordertext
Crimson.70
Crimson.70
Crimson.25pressedbackgroundbordertext
Crimson.100
Crimson.100
Crimson.55disabledbackgroundbordertext
Crimson.alpha
Crimson.alpha
Crimson.alpha

**
input**
• ユーザーが直接操作するUIのうち、何らかの入力を伴うものに利用されます
• 入力フォーム、ラジオボタン等に用いられます**path:**`{プロパティ}.action.input.{状態}`**light**defaultbackgroundbordertext
White
Alice.light.90
disabledbackgroundbordertext
BlackAlpha.05
Alice.light.70**dark**defaultbackgroundbordertext
Alice.dark.30
Casper.55
disabledbackgroundbordertext
BlackAlpha.10
WhiteAlpha.10
