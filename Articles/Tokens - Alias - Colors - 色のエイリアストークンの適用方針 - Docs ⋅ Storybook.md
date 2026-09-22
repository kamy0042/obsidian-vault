---
Created: 2024-12-18T01:00:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-%E8%89%B2%E3%81%AE%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%AE%E9%81%A9%E7%94%A8%E6%96%B9%E9%87%9D--docs
Tags: [topic/ツール/BRIDGE]
---
# **色のAliasトークンの適用方針**

色のAliasトークンは配色を抽象化して分類したものであり、UIと1対1の関係ではありません。

そのため、

- 1つのトークンが複数のUIで使われる
- あるUIに対して複数のコンセプト（色の分類）が使われる

といった場面を想定した設計になっています。

# 例：1つのトークンが複数のUIで使われる場面

[background.feedback.overlay](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ftokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-feedback--docs#overlay)として定義されている色は、主にIconButtonやTextButtonにマウスオーバーした時の背景色として使われています。

![[image 1.png]]

しかし、ボタンだけではなく他のUI（例：カレンダーの日付）にマウスオーバーした際も同じ色を当てることがあります。

![[image 2.png]]

**これらの背景色の一貫性を保つためには、それぞれ同じ色を当てるべきであり、変更の際は同時に変更されるべきです。**

ボタン用の背景色とその他用の背景色として2つのトークンを定義してしまうと、

- 同じ種類の色だというUI知識を表すことができない
- 両者が同じ色だということを保証できない（運用の過程で意図せず変更されるかもしれない）

といった不都合が生じます。 そのため、[background.feedback.overlay](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ftokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-feedback--docs#overlay)として抽象化し、複数種類のUIに適用できるように設計しています。

# 例：あるUIに対して複数のコンセプト（色の分類）が使われる場面

上記のように、1つのトークンを複数種類のUIに対して適用するように設計しています。

従って、必然的に**1つのUIに対して複数のコンセプト（色の分類）が適用される**場面が出てきます。

### **TextButtonの色の構成**

![[image 3.png]]

TextButtonの場合、上で説明した[text.action.tertiary](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ftokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-action--docs#tertiary)として分類されるトークンと[background.feedback.overlay](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ftokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-feedback--docs#overlay)として分類されるトークンに加え、フォーカスリング用に定義した[border.feedback.focus](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ftokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-feedback--docs#focus)よって構成されています。

### 配色

- テキスト色:`text.action.tertiary.default / hovered / pressed / disabled`
- マウスオーバー時の背景色:`background.feedback.overlay.hovered / pressed`
- フォーカスリング:`border.feedback.focus`