---
Created: 2024-12-18T01:34:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-forms-textarea-textareaform--docs
Tags: [topic/ツール/BRIDGE]
---
# TextareaForm

## 文字入力フォームコントロールのうち、複数行入力のためのコンポーネント

**テスト用入力欄**

※ ここに注釈が入ります

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **label** | フォームのラベルですstring | - |   |
| **layout** | ラベルと入力欄のレイアウトを指定しますstring | - | Choose option...verticalhorizontal |
| **resize** | リサイズ可能な方向を指定しますstring | - | Choose option...bothhorizontalverticalnone |
| **errorMessage** | エラーメッセージです。文字列もしくは文字列の配列を受け取ります。string | - |   |
| **note** | フォームの補足・注釈ですstring | - |   |
| **testid** | textarea要素に渡すdata-testidを指定します（計測用）string | - |   |
| **textareaProps** | textarea要素が受け取るpropsの内、idを除いたものをオブジェクトで受け取りますOmit | - | **Set object** |
| **labelProps** | label要素が受け取るpropsの内、htmlForを除いたものをオブジェクトで受け取りますOmit | - | **Set object** |
| **formWidth** | 入力欄の幅を指定しますunion | - | **Set object** |
| **labelWidth** | ラベルの幅を指定します- | - | - |
| **minHeight** | textarea要素の最小の高さです- | - | - |
| **maxHeight** | textarea要素の最大の高さです- | - | - |
| **minWidth** | textarea要素の最小幅です- | - | - |
| **maxWidth** | textarea要素の最大幅です- | - | - |

# 概要

- 複数行の文字入力フォームで利用するコンポーネントです
- 主に複数センテンスの自由記述テキストを入力させたい時に利用します

# 種類

### **通常のTextareaForm**

**サンプル**

**サンプル**

**サンプル**

- 通常状態です
- 初期状態でのフォームの最大幅や行数は自由に変更可能です
- （実装）行数変更時は`rows`属性に整数を指定して`textarea`要素に渡します
    - `textarea`要素に渡す際は`textareaProps`を利用してください

### **横並び**

**サンプル**

**サンプル**

- ラベルとフォームを横並びに設定できます
- ラベルの幅は自由に設定可能です

### **サイズ変更の制限**

**サンプル**

**サンプル**

**サンプル**

**サンプル**

- `resize`を指定することで拡大・縮小の方向を制限できます
- 初期状態：`resize:both`
- `resize:none`を指定するとユーザーがサイズを変更できなくなります

### **disabled**

**サンプル**

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