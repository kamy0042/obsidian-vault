---
Created: 2024-12-18T01:31:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-buttons-singlebutton--docs
Tags: [topic/ツール/BRIDGE]
---
# SingleButton

## 背景色付きのボタンコンポーネント

button

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **onClick** | (event: MouseEvent<HTMLButtonElement>) => void | - | - |
| **onKeyDown** | function | - | - |
| **onBlur** | function | - | - |
| **onFocus** | function | - | - |
| **buttonType** | ボタンのバリアントを指定しますunion | "default" | defaultprimarydanger |
| **children*** | ボタン内部の要素（ラベル等）を指定しますReactNode | - |   |
| **isDisabled** | `true`の場合ボタンを無効化しますboolean | - | **Set boolean** |
| **tabIndex** | number | - | **Set number** |
| **shapeExpand** | `true`の場合、親要素の横幅いっぱいに広がりますboolean | - | **Set boolean** |
| **isResponsive** | `true`の場合、画面サイズに応じてボタンサイズが変化しますboolean | - | **Set boolean** |
| **testid** | 計測や自動テストで用いるdata-testidを指定しますstring | - | **Set string** |
| **type** |   | "button" | **Set object** |

※上記に加え、`ButtonHTMLAttributes<HTMLButtonElement>`も受け取ります

**レスポンシブverのコンポーネントは、（現時点では）アカウント設定のみで利用可能です。**

# 概要

- 何らかのアクションを引き起こすために使用されるクリック可能な要素です
- ボタンの優先度や役割に合わせて３種類のSingleButtonが存在します

ボタン全般のデザイン方針は[ボタン概要ページ](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ffoundations-buttons-overview--docs)を参照してください

# 種類

### **Default**

button

- もっとも汎用的で、画面内に多用可能なボタンです
- ボタンとしての強調度は中程度です
- 利用に制限はありません

### **Primary**

button

- ユーザーの承認を求める内容や、ポジティブな同意を促す場合に利用するボタンです
    - 大きな変更の伴う内容の編集などには、このボタンを利用します
- ボタンとしての強調度が高く、画面内の主要なアクションにのみ利用できます
    - Defaultボタンと異なり、画面内で多用できません

### **Danger**

button

- 破壊的な処理や取り返しの付かない行動など、ネガティブな内容を実行させる際に利用します
- ユーザーに注意喚起の意味を含みます

# 利用場面

- 何らかのアクションを実行する際に、汎用的なボタンを利用したい時
    - 用途に合わせて上記の`default`,`primary`,`danger`を使い分けてください
- 補助的なアクションを実行したいときは`TextButton`を利用してください
- 補助的なアクションかつスペースが足りない時は、代わりに`IconButton`を利用可能です

# レイアウト

### **ボタンサイズ**

- shapeExpandがtrueの時はボタンが親要素の横幅いっぱいに広がります
    - 通常のボタンか横幅いっぱいに広がるボタンか、デザイン面でより適切な方を選択してください
- ラベルの文字数が多い時は、省略されずに横幅が広がります

### **アイコンの有無**

- 子要素としてラベルを指定しています。その子要素にアイコンを含めることも可能です
- アイコンはラベルの左右に付与してください
    - 必要に応じて左右両方に付与することも可能です
- アイコンのみのボタンを利用したい時はIconButtonコンポーネントを用いてください
- その他、アイコン利用時の方針は下記を参照してください
    - [参考：アイコンとラベル（テキスト）の組み合わせUI 利用ルール](https://chatwork.atlassian.net/l/cp/3tF8c5AK)

### **複数行のラベル**

- ボタンのラベルが長くなる場合、ボタン内テキストを省略したり書き換えるよりも、ボタンラベル自体を複数行表示することを推奨しています
    - ボタンの親要素に幅を指定することで、ボタンのラベルを折り返し可能です
    - children内に`<br>`要素を含める or 最大幅を指定する方法でも問題ありません
- その際は、基本的に中揃えの改行を利用してください
- 左右いずれかに寄せる場合、実装時に個別にスタイルを当ててください

[参考：ボタンのラベルについての方針](https://chatwork.atlassian.net/l/cp/NSMJTvcA)

# アクセシビリティ

- ボタンの目的を明確に示すようなラベルを設定してください
    - アイコンと共に利用している場合、目的を示す際にアイコンの図式に依存しないよう注意してください
    - 支援技術の利用者はスクリーンリーダー上でアイコンを認識できません
- その他、ラベルについての方針は下記を参照してください
    - [参考：ボタンのラベルについての方針](https://chatwork.atlassian.net/l/cp/xF8GqXZ7)

# 状態

- マウスオーバーを視認できるようにボーダー及びバックグラウンドカラーの色調を変更します
- クリック中は背景色の色調を変化させることでフィードバックを与えます

### **無効**

- 無効時はボタンの透過度を上げ、上記のインタラクションを発生させないことで非活性だとわかるようにします
- マウスオーバー時のマウスカーソルを、無効だとわかるように変更します
- 無効にする際は「なぜ無効となっているのか」をユーザーに認知させることを推奨します
    - [参考：ユーザー操作の可能な機能の表示（disable）／非表示条件](https://chatwork.atlassian.net/l/cp/X0u3cF3S)

# 関連コンポーネント

- [TextButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-textbutton--docs)
    - 補助的なアクションかつスペースに余裕がある時はこちらを用います
- [IconButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-iconbutton--docs)
    - 補助的なアクションかつスペースが足りない時はこちらを用います