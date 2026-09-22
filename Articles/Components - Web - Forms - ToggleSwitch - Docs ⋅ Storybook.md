---
Created: 2024-12-18T01:34:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-forms-toggleswitch--docs
Tags: [topic/ツール/BRIDGE]
---
# ToggleSwitch

## ユーザーが有効／無効の状態の切り替えをできるコンポーネント

- [ ] 

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **label** | aria-labelを設定するときに利用します。利用は非推奨です。可能な限りaria-labelではなくlabel要素を利用してくださいstring | - |   |
| **inputProps** | input要素が受け取るpropsの内、typeを除いたものをオブジェクトで受け取りますOmit | - | **Set object** |
| **isResponsive** | trueを設定すると画面幅に応じて表示が切り替わりますboolean | - | **Set boolean** |

**このコンポーネントは（現時点では）一部の画面でのみ採用されていますが、利用に制限なくどの画面でも用いることができます。**

しかしレスポンシブverとして利用する場合、（現時点では）アカウント設定のみ利用可能です。

# 概要

- 有効／無効の状態の切り替えを「ユーザーが選択できる」場合には、トグルボタンを利用できます
    - 二者択一であっても、並列の1か2かを選択するようなものには、トグルボタンは利用せずにラジオボタンなどの複数から1択できるUIを利用してください
- また、現在選択している「有効／無効」の状態表現としてもトグルボタンを利用できます

### **上記根拠**

[Switch Pattern | APG | WAI | W3C](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)にて、スイッチパターンの補足が行われています。

# アクセシビリティ

- ToggleSwitchは必ず`label`と併記する形で配置をして、制御状態が明確になるように利用をしてください
    - [参考：ユーザーが迷わないトグルスイッチの使い方 | ベイジのUIラボ～業務システムとSaaSのUIを考える](https://baigie.me/blog-ui/2023/11/30/toggleswitch/#section-5)＞トグルスイッチのメリットとデメリット