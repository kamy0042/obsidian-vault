---
type: summary
updated: 2026-07-26
---

# Color Tokens - Goldman Sachs Design 要約

ソース: [[Color Tokens - Goldman Sachs Design]]

Goldman Sachs のデザインシステム（GSUI）における公式カラートークンリファレンス。
カラートークンはセマンティックに命名されたスタイルラベルで、各トークンにデフォルトパレットとダークモードパレットの2値が割り当てられ、命名と用途のギャップを橋渡しする。
トークンは用途別に Surface（背景）・Border・Text・Status・Data Visualization などに分類され、Surface と Border にはホバー・アクティブ・選択などのインタラクション状態トークンが揃う。
各カラーランプには bold / subtle / minimal の3段階の強調（emphasis）を表す Core Colors が定義され、Status 系トークンはそこから派生する。
インタラクション状態は「ランプ上で2段階濃い色を20%（hover）/ 40%（active）で重ねる」といった数式ベースで導出され、ダークモードでは方向が反転するなど、体系的な設計ルールが貫かれている。
