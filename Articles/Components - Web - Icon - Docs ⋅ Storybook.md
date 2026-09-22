---
Created: 2024-12-18T01:31:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/components-web-icon--docs
Tags: [topic/ツール/BRIDGE]
---
# Icon

## Chatwork内の機能や概念を図式化したSVG画像

**Show code**

# コンポーネントが受け取る値(props)

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| **type*** | アイコンの種類を指定しますunknown[number] | - | Choose option...areaScaleButtonLeftareaScaleButtonRightarrowDoubleLeftarrowDoubleRightbookmarkbookmarkEmptycalendarcancelcancelCirclechatTimeLineReplyBadgecheckcheckboxCheckedcheckboxUnCheckedcheckboxIndeterminateradioCheckedradioUnCheckedcontactcontentClosecontentOpencopydeletedownloaddrafteditemoticonerrorexternalUserMarkOnTextfieldeyeCloseeyeOpenfilefileUploadhelphelpFillhomeinfolinklinkBlanklinkPreviewFaviconlistSelectedlivemailmemberDetailmemberDetail_olmentionmenuContactmenuFilemenuInfomenuPlatformmenuTaskmessageMoveArrowmoremovemuteorganizationpinpluspublicquotereactionreplysearchsendfilesettingshowRoomLIsttasktaskAssigntaskMinetimelineBookmarktoSelectorToAlltriangleDowntriangleLefttriangleRighttriangleUpunBookmarkunreaduserAddwarning |
| **title** | アイコンのラベルを設定します。ラベルを渡さない場合、アクセシビリティツリー上で存在しないものとして扱われます。string | - |   |
| **size** | mid:16px, large:20px が適用されますunion | "mid" | midlarge |
| **exceptionalSize** | 文字列としてサイズを自由に設定できます。※非推奨string | - | **Set string** |

※上記に加え、`SVGAttributes<SVGElement>`も受け取ります

# 概要

プロダクト内でアイコンとして利用可能なコンポーネントです。

グローバルアイコン、機能アイコン、汎用操作アイコンの3種類が存在します。

[アイコン一覧を見る](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fstory%2Fcomponents-web-icon--all-icons&globals=viewport%3Aresponsive)

### **グローバルアイコン**

- Chatworkのメイン機能自体を表し、切り替えるためのアイコンです
    - 参考リンク：[IconButton - グローバルヘッダー内のアイコンボタンとの違い](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-iconbutton--docs#iconButtonDiff)
- 「menu〇〇」と名付けられており、グローバルヘッダーでの利用を想定して設計されています
- 他の箇所での利用は避けてください

menuContact

menuFile

menuInfo

menuPlatform

menuTask

### **機能アイコン**

- アイコンの形状自体がChatwork上の機能として意味を持つアイコンです
- 利用箇所の制限はありません

reaction

memberDetail

link

など

### **汎用操作アイコン**

- Chtwork上の機能に限定されない汎用的な図形をアイコン化したものです
- 利用箇所の制限はありません

triangleRight

areaScaleButtonLeft

cancel

など

# 利用場面

テキストだとスペースが足りない時、図式を用いて情報を強調したい時などに利用します。

# レイアウト

### **アイコンの種類**

`type`を指定することでアイコンの種類を出しわけます。

### **アイコンサイズ**

sizeを指定することでアイコンのサイズを変化させます。

現在は以下の2種類が存在します。

- mid:`16px * 16px`
- large:`20px * 20px`

例外的なサイズを指定したいときは`exceptionalSize`を利用してください。

文字列として渡したサイズが適用されます。

※ UIに一貫性を持たせるため利用は非推奨です。あくまでも例外措置としてご利用ください。

### レスポンシブなIconButtonで利用する際のアイコンサイズ

IconButtonを`isResponsive:true`で利用する場合、モバイル、タブレットでのアイコンサイズは`24px * 24px`に固定されます。

**レスポンシブverのコンポーネントは、（現時点では）アカウント設定のみで利用可能です。**

# アクセシビリティ

スクリーンリーダー等の支援秘術の利用者はアイコンの形状を認識できません。

そのため、アイコンが提供している内容と同等の情報をテキストでも提供する必要があります。

### **ラベルと併記する場合**

ボタンやフォーム等のラベルや、それに類する可視テキストとアイコンを併記する場合、`title`にアイコンの形状を示すテキストを設定してください。

それにより、利用環境に関わらずユーザー間で同等の情報を得られるようになります。

### **アイコン単体で利用する場合**

ラベル等を用いずにアイコン単体で利用する場合は、`title`にアイコンの機能、役割を示すテキストを設定してください。

ボタンとして用いる場合も同様です。詳細は[IconButton - アクセシビリティ](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-iconbutton--docs#a11y)を参照してください。

### **例外**

`title`を設定しない場合、支援技術上でアイコン自体が存在しないものとして扱われます。

アイコンを無視しても受け取れる情報に差が生じない場面では、`title`を設定する必要がありません。

例）単なる装飾目的であり、何も情報を提供していないアイコン

※ アイコンは機能を伝えるために置かれることが前提なので、基本的には`title`の設定が必要です。

参考リンク：

[代替テキスト付与についての方針](https://chatwork.atlassian.net/l/cp/aTs9odkr)

[達成基準 1.1.1: 非テキストコンテンツを理解する](https://waic.jp/translations/WCAG21/Understanding/non-text-content.html)

# 関連コンポーネント

[IconButton](https://d7lazuefhn8wz.cloudfront.net/iframe.html?path=%2Fdocs%2Fcomponents-web-buttons-iconbutton--docs)