---
Created: 2024-12-18T01:31:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-buttons-iconbutton--docs
Tags: [topic/ツール/BRIDGE]
---
# IconButton

## アイコンだけで構成された汎用的なボタンコンポーネント

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **buttonType*** | ボタンのバリアントを指定しますunion | - | defaultdanger |
| **iconType*** | アイコンの種類を指定しますExclude | - |   |
| **version** | ボタンのバージョンを指定します。未指定の場合`regular`が適用されますunion | - | Choose option...regularMARUNI |
| **ariaLabel*** | 支援技術で用いるラベルを指定しますstring | - |   |
| **isDisabled** | `true`の場合ボタンを無効化しますboolean | - | [ ] **FalseTrue** |
| **hasBorder** | `true`の場合ボタンをボーダーで囲みますboolean | - | [ ] **FalseTrue** |
| **onClick** | function | - | - |
| **onKeyDown** | function | - | - |
| **onBlur** | function | - | - |
| **onFocus** | function | - | - |
| **isResponsive** | `true`の場合画面幅に応じてサイズが変化しますboolean | - | **Set boolean** |
| **testid** | 計測や自動テストで用いるdata-testidを指定しますstring | - | **Set string** |

※上記に加え、`type`以外の`ButtonHTMLAttributes<HTMLButtonElement>`も受け取ります

**レスポンシブverのコンポーネントは、（現時点では）アカウント設定のみで利用可能です。**

# 概要

- 何らかのアクションを引き起こすために使用されるクリック可能な要素です
- 利用の際はアクションを適切に図式化したアイコンを選んでください
- ラベルとアイコンを組み合わせたい時は、アイコンボタンではなくテキストボタン＋アイコンを利用してください
- [ボタン概要ページ](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ffoundations-buttons-overview--docs)には「主要機能を図式化したボタン」が登場しますが、このUIはそれに該当しません
    - 「主要機能を図式化したボタン」はグローバルヘッダー内にのみ出現します
    - 汎用的なアイコンボタンとグローバルヘッダー用アイコンボタンの違いは後述します

ボタン全般のデザイン方針は[ボタン概要ページ](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ffoundations-buttons-overview--docs)を参照してください

# 種類

### **Default**

- 通常のアイコンボタンです

### **Danger**

- 破壊的な処理や取り返しの付かない行動など、ネガティブな内容を実行させる際に利用します
- ユーザーに対する注意喚起の意味を含みます
- 色のコントラスト比を維持するため、マウスオーバー時にDefaultと異なる背景色を表示させています

# 利用場面

- テキストボタンをスペースの関係で省略したい時
    - 汎用的なアイコンボタンであり、表示しているページ、機能における補助的なアクションに利用できます
    - ボタンの強調度は低く、ページ中に何度登場しても大丈夫です

# レイアウト

### **アイコンの種類**

- IconTypeを指定することでアイコンの種類を出し分けます
- グローバルヘッダー用のアイコン（menu〇〇と名付けられたアイコン）は設定できません
- アイコン一覧はIconページ（※現在は未作成）を参照してください

### **バリエーション**

- 現在は`reguler`、`MARUNI`の2パターンが存在しています

### regular

- 以前よりChatwork内に存在していたアイコンボタンです
- ボタンサイズ：`24px × 24px`
- アイコンサイズ：`16px × 16px`

### MARUNI

- UI刷新PJ「MARUNI」で定義されたアイコンボタンです
- ボタンサイズ：`32px × 32px`
- アイコンサイズ：`16px × 16px`

### regularとMARUNIの利用方針

- 「どのサイズのアイコンボタンを使えば良いのか」という点について、現状では明確な基準が存在していません
    - 原則MARUNIversionは特定部分での利用に限るとし、当面、基本的にはregularを利用してください
- 今後、利用方針が定まり次第お知らせいたします

### **グローバルヘッダー内のアイコンボタンとの違い**

- このIconButtonとグローバルヘッダー用アイコンボタンは、それぞれ別のUIとして扱います
    - IconButton：汎用的に扱えるアイコンボタンであり、ボタンとしての強調度は低いです
    - グローバルヘッダー用アイコンボタン：グローバルヘッダー内に特化した振る舞いを持つ特殊なアイコンボタンです
        - 「主要機能を図式化したボタン」でもあり、ボタンとしての強調度は高いです

### グローバルヘッダー用アイコンボタン特有の振る舞い

- 設定可能な`iconType`が限定されています
    - 下記に挙げた、グローバルヘッダーでの利用を想定したアイコンのみ設定可能です
        - `menuContact`
        - `menuFile`
        - `menuInfo`
        - `menuPlatform`
        - `menuTask`
- コントラスト比の確保のため、常にダークテーマ時の配色が適用されます
- アイコンサイズとボタンサイズがこのIconButtonとは異なります

以上の違いにより、共通のUIではなくそれぞれ別個のUIとして扱っています。

### **hasBorderについて**

- `hasBorder`に`true`を設定することでボタンの周囲にボーダーが付与されます
- こちらはメッセージ検索オプションでのみ利用されています
- 基本的にはボーダーなしのボタンを使用してください

# アクセシビリティ

- 必ず`ariaLabel`を設定してください
    - 設定することで支援技術の利用者がボタンを認識可能になります
    - ボタンの目的を明確に示すようなラベルを設定してください
- その他、ラベルについての方針は下記を参照してください
    - [参考：ボタンのラベルについての方針](https://chatwork.atlassian.net/l/cp/xF8GqXZ7)

# 状態

- マウスオーバー時
    - default : 透過色を背景として表示することでマウスオーバーを認知させます
    - danger : コントラスト比を確保するため、透過色ではなく白背景を表示することでマウスオーバーを認知させます
- クリック中は透過色を変化させることでフィードバックを与えます

### **無効**

- 無効時はアイコンの色を薄くし、マウスオーバー時のインタラクションを発生させないことで非活性だと認知させます
- マウスオーバー時のアイコンを無効だとわかるように変更します
- 無効にする際は「なぜ無効となっているのか」をユーザーに認知させることを推奨します
    - [参考：ユーザー操作の可能な機能の表示（disable）／非表示条件](https://chatwork.atlassian.net/l/cp/X0u3cF3S)

# 関連コンポーネント

- [SingleButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-singlebutton--docs)
    - 主要なアクションなど、より強度の強いボタンコンポーネントが必要な時はこちらを用います
- [TextButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-textbutton--docs)
    - 補助的なアクションかつスペースに余裕がある時はこちらを用います