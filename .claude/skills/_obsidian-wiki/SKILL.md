---
name: _obsidian-wiki
description: Obsidian「LLM Vault」内の LLM wiki（Karpathy の LLM Wiki パターン）を操作する橋渡しスキル。ソースの取り込み（ingest）、wiki への質問（query）、記事の要約確認、新規クリップ処理、健全性チェック（lint）を行う。「wikiに取り込んで」「この記事をingestして」「wikiに聞いて」「wikiで調べて」「この記事の要約を教えて」「新たに追加した記事を処理して」「Clippingsの記事を整理して」「wikiをlintして」「知識wikiを整備して」などの依頼時に使用。Articles/Clippings の記事を知識として編纂したいときにも積極的にトリガーする。
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, WebFetch
---

# \_obsidian-wiki

このスキルは橋渡し（ポインタ）であり、スキーマの実体は Vault 内の AGENTS.md にある。

**手順: まず以下を読み、記載された規約・操作フロー（ingest / query / 要約確認 / 新規クリップ処理 / lint）に厳密に従うこと。**

```
/Users/kamy0042/workspace/obsidian-vault/AGENTS.md
```

- Vault をカレントディレクトリとするセッションでは AGENTS.md が自動ロードされるため、このスキルは主に他プロジェクトのセッションから wiki を操作するための入口
- スキーマ・規約をこのファイルに複製しない（二重管理禁止。常に AGENTS.md が唯一の真実）
