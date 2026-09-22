---
Created: 2024-12-18T01:03:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-accent--docs
Tags: [topic/ツール/BRIDGE]
---
# **Accent**

情報を強調表示したい時に利用します。

数語程度のテキストに用いることもありますが、attention-message以外は文章に対して用いません。

# system

- Chatworkの機能に関する通知に利用します
- ユーザーの操作に関係しない通知に利用します

**path:**`{プロパティ}.accent.system`

**light**backgroundbordertext
BarbiePink.light
BarbiePink.light
BarbiePink.light**dark**backgroundbordertext
BarbiePink.dark
BarbiePink.dark
BarbiePink.dark

# system-notify

- グローバルヘッダーの通知バッジ背景色としてのみ利用します
- 必ずWhiteの文字色と共に利用してください

**path:**`{プロパティ}.accent["system-notify"]`

**light**backgroundbordertext
BarbiePink.notify
**dark**backgroundbordertext
BarbiePink.notify
**
mention**
• 他のユーザーからの通知を強調表示するときに利用します
• 主にメッセージ（タスクを含む）関連で利用します**path:**`{プロパティ}.accent.mention`**light**backgroundbordertext
BottleGreen.light
BottleGreen.light
BottleGreen.textLight**dark**backgroundbordertext
BottleGreen.dark
BottleGreen.dark
BottleGreen.dark

**
attention**
• ユーザーに注意を促したい時に利用します
• 警告の意味は持ちません
• 文章として利用したいときは、後述のattention-messageを利用してください**path:**`{プロパティ}.accent.attention`**light**backgroundbordertext
CarrotOrange.light
CarrotOrange.light
CarrotOrange.light**dark**backgroundbordertext
CarrotOrange.dark
CarrotOrange.dark
CarrotOrange.dark

**
attention-message**
• 文章形式でユーザーに注意喚起したい時に利用します
• アイコン等、ワンポイントで利用したい時は前述のattentionを利用してください**path:**`{プロパティ}.accent["attention-message"]`**light**backgroundbordertext
CarrotOrange.lightBg
CarrotOrange.light
CarrotOrange.lightText**dark**backgroundbordertext
CarrotOrange.darkBg
CarrotOrange.dark
CarrotOrange.dark
