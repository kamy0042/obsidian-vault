---
Created: 2024-12-18T01:32:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-forms-checkbox--docs
Tags: [topic/ツール/BRIDGE]
---
# Checkbox

## 単一の値の選択/未選択を切り替えるフォームコントロール

- [ ] サンプル

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **onChange** | チェックした時の処理を設定しますfunction | - | - |
| **children** | ラベルを設定しますReactNode | - |   |
| **indeterminate** | trueの場合Checkboxが未決定状態となりますboolean | - | **Set boolean** |
| **disabled** | trueの場合Checkboxを選択できなくなりますboolean | - | **Set boolean** |

※上記に加え、`type`、`onClick`以外の`InputHTMLAttributes<HTMLInputElement>`も受け取ります

# 概要

- 主にフォーム等で項目の選択/未選択を切り替えるときに利用する要素です
- 複数の項目から1つを選択したい時は[RadioButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-forms-radioButton--docs)を利用してください
- 機能のオン/オフを切り替えたい時は[ToggleSwitch](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-forms-toggleswitch--docs)の利用も検討してください

# 種類

### **通常のCheckbox**

- [ ] 未チェック
    - [x] チェック済み

### **選択不可状態（disabled）**

- [ ] 選択不可

### **チェックが未決定な状態（indeterminate）**

- [ ] 未決定
- 項目がオンともオフとも言えない状態です
- 複数のサブCheckboxを統括するCheckboxにおいて、1つ以上のサブCheckboxが他とは異なるチェック状態にあるときに未決定状態となります

# アクセシビリティ

- その項目を明確に表すラベルと共に利用してください
- ラベルとセットで利用することにより、利用者がその項目の意図を理解しやすくなります

### **複数のCheckboxのグループ化**

- 複数のCheckboxを1つのグループとして扱う時は、そのグループを示す小見出しと共に利用してください
    - それにより、スクリーンリーダーの利用者がフォームの構成を理解しやすくなります
- 実装時は`fieldset`要素でグループをラップし、小見出しを`legend`要素でマークアップしてください

[参考：MDN - checkbox - 複数チェックボックスの扱い](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/checkbox#%E8%A4%87%E6%95%B0%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AE%E6%89%B1%E3%81%84)

### **コンテキストの変化**

- Checkboxのオン/オフによるコンテキストの変化を避けてください
- コンテキストの変化とは
    - ウェブページ全体を一度に見ることのできない利用者を混乱させる恐れのある大きな変化のこと

**コンテキストの変化の具体例：**

- ユーザエージェントの変化
- ビューポートの変化
- フォーカスの変化
- ウェブページの意味を変えるようなコンテンツの変化

※参考：[3.2.2 入力時［A］](https://chatwork.atlassian.net/l/cp/w43S6utx)