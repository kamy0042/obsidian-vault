---
Created: 2024-12-18T01:33:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-forms-radiobutton--docs
Tags: [topic/ツール/BRIDGE]
---
# RadioButton

## 複数項目から1つを選択するフォームコントロール

サンプル１サンプル２

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **children** | 各項目のラベルを設定しますReactNode | - | **Set object** |
| **onChange** | 選択した時の処理を設定します- | - | - |
| **disabled** | trueの場合RadioButtonを選択できなくなりますboolean | - | **Set boolean** |

※上記に加え、`type`以外の`InputHTMLAttributes<HTMLInputElement>`も受け取ります

# 概要

- 関連する複数の項目から1つを選択するときに利用する要素です
- デフォルトで未選択状態をとることも可能です
    - 一度項目を選択した場合、未選択に戻すことはできません
- 複数の項目を選択したい時は[Checkbox](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-forms-checkbox--docs)を利用してください
- 機能のオン/オフを切り替えたい時は[ToggleSwitch](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-forms-toggleswitch--docs)の利用も検討してください

### **通常のRadioButton**

未選択選択済み

### **選択不可状態（disabled）**

未選択選択済み

# アクセシビリティ

- その項目を明確に表すラベルと共に利用してください
- ラベルとセットで利用することにより、利用者がその項目の意図を理解しやすくなります

### **複数のRadioButtonのグループ化**

- 複数のRadioButtonを1つのグループとして扱う時は、そのグループを示す小見出しと共に利用してください
    - それにより、スクリーンリーダーの利用者がフォームの構成を理解しやすくなります
- 実装時は`fieldset`要素でグループをラップし、小見出しを`legend`要素でマークアップしてください
- 同一グループ内の各RadioButtonには共通の`name`属性を設定してください

![](https://d7lazuefhn8wz.cloudfront.net/assets/components/forms/radio/radio_group.png)

参考：MDN - ラジオグループの定義

### **コンテキストの変化**

- RadioButtonの選択によるコンテキストの変化を避けてください
- コンテキストの変化とは
    - ウェブページ全体を一度に見ることのできない利用者を混乱させる恐れのある大きな変化のこと

**コンテキストの変化の具体例：**

- ユーザエージェントの変化
- ビューポートの変化
- フォーカスの変化
- ウェブページの意味を変えるようなコンテンツの変化

※参考：[3.2.2 入力時［A］](https://chatwork.atlassian.net/l/cp/w43S6utx)