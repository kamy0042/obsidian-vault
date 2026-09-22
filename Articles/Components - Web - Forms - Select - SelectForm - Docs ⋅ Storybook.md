---
Created: 2024-12-18T01:33:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-forms-select-selectform--docs
Tags: [topic/ツール/BRIDGE]
---
# SelectForm

## 複数の項目を持つ選択式のフォームコントロール

**テスト用**

選択肢を選んでください選択肢１選択肢２無効化された選択肢

※ 項目を選択してください

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **label*** | フォームのラベルですstring | - |   |
| **errorMessage** | エラーメッセージです。文字列もしくは文字列の配列を受け取ります。union | - |   |
| **viewType** | セレクトボックスの外観を切り替えます。button / text の２パターンが存在しますstring | - | buttontext |
| **note** | フォームの補足・注釈ですstring | - |   |
| **options** | 選択肢をオブジェクトの配列で受け取ります。オブジェクトの中身はこの右側のサンプルを参照してください。※ optgroup要素を利用するときはStory内の「Opt Group」を参照してくださいarray | - | **RAW**options : [0 : {...} 2 keys1 : {...} 2 keys2 : {...} 2 keys3 : {...} 3 keys] |
| **selectProps** | select要素が受け取るpropsの内、idを除いたものをオブジェクトで受け取りますobject | - | **RAW**selectProps : {} |
| **labelProps** | label要素が受け取るpropsの内、htmlForを除いたものをオブジェクトで受け取りますOmit | - | **Set object** |
| **isResponsive** | trueの場合レスポンシブ対応されたコンポーネントが表示されます- | - | **Set boolean** |

**このコンポーネントは（現時点では）一部の画面でのみ採用されていますが、利用に制限なくどの画面でも用いることができます。**

しかしレスポンシブverとして利用する場合、（現時点では）アカウント設定のみ利用可能です。

# 概要

複数の項目から1つの選択肢を選ぶ際に利用するコンポーネントです。

複数要素の選択は想定していません。

主にフォームコントロールとして利用します。

### **ボタンタイプ**

SingleButtonを踏襲したスタイルを持ちます。

参考リンク：[SingleButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-singlebutton--docs)

**テスト用**

選択肢を選んでください選択肢１選択肢２無効化された選択肢

※ 項目を選択してください

### **テキストタイプ**

TextButtonを踏襲したスタイルを持ちます。

参考リンク：[TextButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-textbutton--docs)

**テスト用**

選択肢を選んでください選択肢１選択肢２無効化された選択肢

※ 項目を選択してください

# 利用場面

複数項目から1つの選択肢を選ぶ場面かつ、以下の条件に当てはまる際に利用できます。

- ユーザーが選択すべき答えを把握しており、全ての選択肢を確認する必要がない
    - 例：居住中の都道府県や締切時刻の選択など
- 表示領域を節約する必要がある

ユーザーが全ての選択肢を確認する必要がある場合、ラジオボタンの利用を検討してください。

また、このコンポーネントはフォームの項目選択としての利用を意図しています。

メニューの切り替えのように、表示を変化させる場面には利用できません。

詳細は[アクセシビリティ - コンテキストの変化](https://d7lazuefhn8wz.cloudfront.net/iframe.html?viewMode=docs&id=components-web-forms-select-selectform--docs#a11y-menu-select)を参照してください。

# レイアウト

### **表示の種類**

`viewType`を指定することで外観を切り替えます。

### **レスポンシブ時のサイズ**

`isResponsive:true`の場合、表示領域に応じてサイズを切り替えます。

**通常時**

**テスト用**

選択肢を選んでください選択肢１選択肢２無効化された選択肢

※ 項目を選択してください

**レスポンシブ時**

**テスト用**

選択肢を選んでください選択肢１選択肢２無効化された選択肢

※ 項目を選択してください

# アクセシビリティ

- 選択すべき内容を理解するために補足が必要な場合、`note`にテキストを渡すことで注釈として表示できます
- 支援技術での利用やキーボード操作のために、独自の実装ではなく`select`要素+`option`要素を利用しています
    - そのためポップアップのスタイルを編集することはできません

### **コンテキストの変化**

SelectFormをメニュー切り替えに利用することは避けてください。

メニューの切り替えはコンテキストの変化を伴います。項目選択時にコンテキストの変化を引き起こすと、変化を知覚しづらい利用者、又は変化によって気を取られやすい利用者を混乱させてしまう恐れがあります。

### コンテキストの変化とは

ウェブページ全体を一度に見ることのできない利用者を混乱させる恐れのある大きな変化のこと

**コンテキストの変化の具体例：**

- ユーザエージェントの変化
- ビューポートの変化
- フォーカスの変化
- ウェブページの意味を変えるようなコンテンツの変化

※参考：[3.2.2 入力時［A］](https://chatwork.atlassian.net/l/cp/w43S6utx)

### **項目のグループ化**

項目が複数のグループに分類可能な場合、それを支援技術に伝える必要があります。

そのために`optgroup`要素によるマークアップを行わなければなりません。

このコンポーネントでは、`options`にグループが含まれる配列を渡すことで自動的に`optgroup`要素が適用されます。

具体例は下記を参照してください。

**テスト用**

キャベツ玉ねぎりんご桃

※ 項目を選択してください

```plain text
[
  {
    "groupLabel": "野菜",
    "options": [
      {
        "label": "キャベツ",
        "value": "cabbage"
      },
      {
        "label": "玉ねぎ",
        "value": "onion"
      }
    ]
  },
  {
    "groupLabel": "果物",
    "options": [
      {
        "label": "りんご",
        "value": "apple"
      },
      {
        "label": "桃",
        "value": "peach"
      }
    ]
  }
]

Copy

```