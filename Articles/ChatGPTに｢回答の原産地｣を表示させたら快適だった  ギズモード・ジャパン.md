---
Created: 2025-11-17T00:55:00
URL: https://www.gizmodo.jp/2025/11/chatgpt_custom_instruction_original_source_note.html
Tags: [topic/AI]
---
![](https://media.loom-app.com/gizmodo/dist/images/2025/11/12/instruction.jpg?w=1280)

カスタム指示の設定画面 Photo: かみやまたくみ

ChatGPTには**回答を自分好みにカスタムする機能**（カスタム指示）があります。

この機能を使って｢何を参考に回答を作成したか？｣をより具体的に表示させるようにしたらいい感じだったので紹介します。

最初に｢回答をどう変えたのか｣から紹介すると、**｢どの文章のどの文を参考に回答しているのか｣──出典だけでなく、参照した文章自体（原文, original_text）**を表示させるようにしました。

> ユーザー：Linnaeus の発音を教えて
> **ChatGPT**：英語では Linnaeus は /lɪˈneɪ.əs/（リネイアス）と発音する。
> 
> IPA（国際音声記号）：/lɪˈneɪ.əs/
> 
> カタカナ表記：リネイアス
> 
> 原典：
> 
> original_text: “Linnaeus pronunciation: /lɪˈneɪ.əs/.”
> 
> note:
> 
> 英語圏では｢リネイアス｣と発音されるが、学術文献や日本語圏では｢リンネ｣と呼ばれることが多い。後者は彼のラテン名 Carolus Linnaeus のスウェーデン語名 Carl von Linné に由来する。

[この例](https://chatgpt.com/share/69143158-9d44-8002-a0bd-d8de63d812fd)では信頼できる組織（ケンブリッジ大学）の資料を参照して回答を作成しているのがわかります。**リンク先には回答内にある記述が実際に存在**し、ハルシネーションではなく、正しい回答であることが確認できます。

ChatGPTは無カスタムでもリンクを表示しますが、**参照した文章自体は明確にされません。そのため、｢本当に正しいのか｣がかなり判断しにくい**です。

このようにすると**ソースを開き、original_textの一部をコピーして検索すれば当該箇所に飛べる**ため、不安があっても楽に裏を取れます。

ChatGPTが**虚偽報告**を行うことがあるのもこういった形式を考えた動機です。出典リンクがあっても実在しなかったり、実際には参照されていなかったりすることがあります。

AIのウソ・変なもの・実体がないものを自分の中に入れたくないのですよね。食品の産地や栄養成分を気にするのとかなり似ています。

ちなみに、このカスタムを[エージェントモード](https://www.gizmodo.jp/2025/07/chatgpt_agent.html)と組み合わせるとさらに強力でした。複雑なタスクをこなすためのモードで、Deep Research並みに複雑な回答も可能です。そこに参照元へのアクセスのしやすさが加わり、さらに便利に。

![](https://www.youtube.com/embed/W8MGSKT8YMs)

エージェントモードと併用した例。ChatGPT上では[こちら](https://chatgpt.com/share/69143394-18ac-8002-9024-0f170058829a)

Video: かみやまたくみ

チャット一覧下部の自分のログインアカウント名から**［設定］＞［パーソナライズ］と進み、｢カスタム指示｣**の項目に以下を入力してこの回答形式にしています（プランや他の設定で効きが変わるので、再現には調整が必要な場合もある点はご了承ください）。

> You are my research assistant. For me, “research” means gathering reliable information to support my writing. Therefore, every time you provide an answer, include the following:
> original_text — Quote the exact sentence, passage, or paragraph from the source.
> 
> source — Provide the source of the material, usually as a URL.
> 
> If the source is paginated (e.g., a PDF or book), also specify the exact location of the quoted text using the John Newman citation method (for example: (Newman, *Apologia*, p. 47, mid)).
> 
> note — Add your own comment, interpretation, or summary.

ChatGPTはカスタム指示でかなり変わります。口調やキャラクターなどを設定できることは有名ですが、｢回答の要素｣も自分の都合に合わせて変えられます。何気に強力な機能で、ご自身にあったものを考えてみる価値があるのではないかと。[GPT-5.1の実装](https://www.gizmodo.jp/2025/11/openai_chatgpt_gpt_5_1_released.html)で効きも良くなっています。

上で軽く触れましたが、設定によって効きが変わる印象です。無課金版だとかなり守られにくくなり、メモリーや過去のチャットの参照機能をオフにしても効きにくくなりました（本稿はProプランでの利用経験をベースに執筆しています）。