---
type: summary
updated: 2026-07-27
---

# The Token Structure That Survives Five Products (Google Uses It Too) 要約

ソース: [[The Token Structure That Survives Five Products (Google Uses It Too)]]

Material 3 と同じ reference / system / component の3層トークン構造こそ複数プロダクトを生き延びる構造だと、W3C Design Tokens 形式のコード例つきで解説する記事。
1つのヘックス値が数百ファイルに散らばる問題はフラットな1層トークンでは解決せず（名前が変わっただけで結合は残る）、各層が下の層だけを指す参照チェーンが必要だと述べる。
コンポーネントはセマンティックな system トークン（役割）だけを参照するため、system 層の差し替えでリブランド・ダークモード・新テーマが「移行ではなく切り替え」になる。
今この構造が必須になった理由は AI エージェントで、MCP 経由でシステムを直接読む機械にとってトークンは API の型システム＝ブランドとの契約であり、意味を持たないヘックスの羅列では「自信を持って間違う」UI を生む。
唯一のルールは「コンポーネントは生の値を絶対に指さない」であり、監査→プリミティブ抽出→セマンティック層追加→コンポーネント付け替え→lint での境界封印、の5段階で big-bang なしに移行せよと説く。
