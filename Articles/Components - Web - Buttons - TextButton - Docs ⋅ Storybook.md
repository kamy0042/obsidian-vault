---
Created: 2024-12-18T01:32:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-buttons-textbutton--docs
Tags: [topic/ツール/BRIDGE]
---
# TextButton

## ラベルのみ存在するボタンコンポーネント

**TextButton**

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **buttonType*** | ボタンのバリアントを指定しますunion | - | defaultdanger |
| **children*** | ボタンのラベルを指定しますReactReactNode | - |   |
| **onClick** | (event?: React.SyntheticEvent<EventTarget>) => void | - | - |
| **onKeyDown** | function | - | - |
| **onBlur** | function | - | - |
| **onFocus** | function | - | - |
| **testid** | 計測や自動テストで用いるdata-testidを指定しますstring | - |   |
| **isDisabled** | `true`の場合ボタンを無効化しますboolean | - | **Set boolean** |
| **leftIconSelect** | 左側のアイコンの種類を指定しますunknown[number] | - | Choose option...areaScaleButtonLeftareaScaleButtonRightarrowDoubleLeftarrowDoubleRightbookmarkbookmarkEmptycalendarcancelcancelCirclechatTimeLineReplyBadgecheckcheckboxCheckedcheckboxUnCheckedcheckboxIndeterminateradioCheckedradioUnCheckedcontactcontentClosecontentOpencopydeletedownloaddrafteditemoticonerrorexternalUserMarkOnTextfieldeyeCloseeyeOpenfilefileUploadhelphelpFillhomeinfolinklinkBlanklinkPreviewFaviconlistSelectedlivemailmemberDetailmemberDetail_olmentionmenuContactmenuFilemenuInfomenuPlatformmenuTaskmessageMoveArrowmoremovemuteorganizationpinpluspublicquotereactionreplysearchsendfilesettingshowRoomLIsttasktaskAssigntaskMinetimelineBookmarktoSelectorToAlltriangleDowntriangleLefttriangleRighttriangleUpunBookmarkunreaduserAddwarning |
| **rightIconSelect** | 右側のアイコンの種類を指定しますunknown[number] | - | Choose option...areaScaleButtonLeftareaScaleButtonRightarrowDoubleLeftarrowDoubleRightbookmarkbookmarkEmptycalendarcancelcancelCirclechatTimeLineReplyBadgecheckcheckboxCheckedcheckboxUnCheckedcheckboxIndeterminateradioCheckedradioUnCheckedcontactcontentClosecontentOpencopydeletedownloaddrafteditemoticonerrorexternalUserMarkOnTextfieldeyeCloseeyeOpenfilefileUploadhelphelpFillhomeinfolinklinkBlanklinkPreviewFaviconlistSelectedlivemailmemberDetailmemberDetail_olmentionmenuContactmenuFilemenuInfomenuPlatformmenuTaskmessageMoveArrowmoremovemuteorganizationpinpluspublicquotereactionreplysearchsendfilesettingshowRoomLIsttasktaskAssigntaskMinetimelineBookmarktoSelectorToAlltriangleDowntriangleLefttriangleRighttriangleUpunBookmarkunreaduserAddwarning |
| **textAlign** | ラベルが複数行になる時に行揃えの方向を指定しますunion | - | leftcenterright |

※上記に加え、`type`以外の`ButtonHTMLAttributes<HTMLButtonElement>`も受け取ります

### **CSS**

スタイルのみ利用する際はこちらを参照してください。

※ CSS nesting を利用しています。利用状況に応じて随時調整してください。

> [!note]+ 共通スタイル：クリックで開きます
> ```plain text
> 
> 
> 
> ```

> [!note]+ defaultカラー(light)：クリックで開きます
> ```plain text
> 
> 
> 
> ```

> [!note]+ defaultカラー(dark)：クリックで開きます
> ```plain text
> 
> 
> 
> ```

> [!note]+ dangerカラー(light)：クリックで開きます
> ```plain text
> 
> 
> 
> ```

> [!note]+ dangerカラー(dark)：クリックで開きます
> ```plain text
> 
> 
> 
> ```

# 概要

- 何らかのアクションを引き起こすために使用される、クリック可能な要素です
- 表示しているページや機能における補助的なアクションを実行する時に利用します

ボタン全般のデザイン方針は[ボタン概要ページ](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Ffoundations-buttons-overview--docs)を参照してください

# 種類

### **Default**

**TextButton**

- 通常のテキストボタンです

### **Danger**

**TextButton**

- 破壊的な処理や取り返しの付かない行動など、ネガティブな内容を実行させる際に利用します
- ユーザーに対する注意喚起の意味を含みます
- 色のコントラスト比を維持するため、マウスオーバー時にDefaultと異なる背景色を表示させています

# 利用場面

- 何らかの補助的なアクションを実行するために、控えめなボタンを利用したい時
    - ボタンの強調度は弱く、1画面内に複数個表示可能です
    - 通常のアクションや重要なアクションを実行したいときは`SingleButton`を利用してください
- 補助的なアクションかつスペースが足りない時は、代わりに`IconButton`を利用可能です

# レイアウト

### **ラベルの文字**

- ラベルの文字数が多い時は省略されずに横幅が広がります

### **アイコンの有無**

- `leftIconSelect`、`rightIconSelect`にIconの種類を設定することで、左右にアイコンを表示可能です
    - ラベルにアイコンを含めることも可能ですが、余白やサイズを統一するため非推奨です
    - Figmaファイルでは`leftIconVisibility`、`rightIconVisibility`という設定も存在していますが、実装時には指定しなくても問題ありません
- アイコンのみのボタンを利用したい時は`IconButton`を用いてください
- その他、アイコン利用時の方針は下記を参照してください
    - [参考：アイコンとラベル（テキスト）の組み合わせUI 利用ルール](https://chatwork.atlassian.net/l/cp/3tF8c5AK)

### **複数行のラベル**

- ボタンのラベルが長くなる場合、ボタン内テキストを省略したり書き換えるよりも、ボタンラベル自体を複数行表示することを推奨しています
    - ボタンの親要素に幅を指定することで、ボタンのラベルを折り返し可能です
    - children内に`<br>`要素を含める or 最大幅を指定する方法でも問題ありません
- ラベルが複数行になった際に、`textAlign`を設定することで行揃えの方向を指定できます

[参考：ボタンのラベルについての方針](https://chatwork.atlassian.net/l/cp/NSMJTvcA)

# アクセシビリティ

- ボタンの目的を明確に示すようなラベルを設定してください
    - アイコンと共に利用している場合、目的を示す際にアイコンの図式に依存しないよう注意してください
        - 支援技術の利用者はスクリーンリーダー上でアイコンを認識できません
- その他、ラベルについての方針は下記を参照してください
    - [参考：ボタンのラベルについての方針](https://chatwork.atlassian.net/l/cp/xF8GqXZ7)

# 状態

- マウスオーバー時
    - default : 透過色を背景として表示することでマウスオーバーを認知させます
    - danger : コントラスト比を確保するため、透過色ではなく白背景を表示することでマウスオーバーを認知させます
- クリック中は透過色を変化させることでフィードバックを与えます

### **無効**

- 無効時はラベルの色を薄くし、マウスオーバー時のインタラクションを発生させないことで非活性だと認知させます
- マウスオーバー時のアイコンを無効だとわかるように変更します
- 無効にする際は「なぜ無効となっているのか」をユーザーに認知させることを推奨します
    - [参考：ユーザー操作の可能な機能の表示（disable）／非表示条件](https://chatwork.atlassian.net/l/cp/X0u3cF3S)

# 関連コンポーネント

- [SingleButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-singlebutton--docs)
    - 主要なアクションなど、より強度の強いボタンコンポーネントが必要な時はこちらを用います
- [IconButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-iconbutton--docs)
    - 補助的なアクションかつスペースが足りない時はこちらを用います