---
type: summary
updated: 2026-07-26
---

# Naming Tokens in Design Systems 要約

ソース: [[Naming Tokens in Design Systems]]

Nathan Curtis（EightShapes）によるデザイントークン命名の体系的な整理で、10以上のシステム構築経験から命名の「レベル」を4グループに分類する。

- **Base**: category（color）・concept（action）・property（size）
- **Modifier**: variant（primary）・state（hover）・scale（100）・mode（on-dark）
- **Object**: component（button）・element（left-icon）・component group（forms）
- **Namespace**: system（esds）・theme（サブブランド）・domain（事業部）

category / property の組だけでは目的を表せず、concept と modifier を加えて初めて意図を持ったトークンになると説く。
主要な原則は「同音異義語を避ける（type は使わない）」「クラス内は同質・クラス間は異質に保つ」「コンポーネント固有トークンはローカルに始め、3コンポーネント以上で共有されたらグローバルへ昇格する（早すぎる全体化はしない）」「theme と mode は直交する別概念」。
全レベルを常に含める必要はなく、意図を十分に記述・区別できる最小限のレベルだけを使い、順序は Namespace → Object → Base → Modifier が安定パターン（ただし唯一解ではない）とする。
同じ決定が複数の階層に現れるポリヒエラルキーでは、両方のセットの完全性を保ちつつ一方を他方のエイリアスにすることで、後の変更影響を目的単位に限定できると結ぶ。
