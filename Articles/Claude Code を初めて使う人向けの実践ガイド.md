---
Created: 2025-09-10T14:37:00
URL: https://zenn.dev/hokuto_tech/articles/86d1edb33da61a#reviewit-%E3%81%A7%E5%AE%8C%E6%88%90%E6%99%82%E3%81%AB%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC
Tags: [topic/AI]
---
![](https://storage.googleapis.com/zenn-user-upload/1373eae929eb-20250619.png)

![](https://storage.googleapis.com/zenn-user-upload/121aaf7f84c9-20250620.png)

![](https://storage.googleapis.com/zenn-user-upload/b3e83c741a1a-20250620.png)

![](https://storage.googleapis.com/zenn-user-upload/f2c87e7c3ecc-20250620.png)

| ファイル | 場所 | 用途 |
| --- | --- | --- |
| `CLAUDE.md` | プロジェクトルート | チーム共有のルール |
| `CLAUDE.md` | `.claude/` | 個人のプロジェクトのルール |
| `CLAUDE.md` | `~/.claude/` | 全プロジェクト共通の個人のルール |
| `settings.json` | `.claude/` | プロジェクトでのClaude Codeの設定 |
| `settings.local.json` | `.claude/` | 個人＆プロジェクトでのClaude Codeの設定 |
| `settings.json` | `~/.claude/` | 全プロジェクト共通のClaude Codeの設定 |

![](https://storage.googleapis.com/zenn-user-upload/565eb7a23f15-20250619.png)

![](https://storage.googleapis.com/zenn-user-upload/2938883db146-20250619.png)

## reviewit で完成時にレビュー

こちらを使うとタスクの完了時に [reviewit](https://www.npmjs.com/package/reviewit) を起動できます。 [reviewit](https://www.npmjs.com/package/reviewit) を使うと AI の変更内容をレビューできて、指摘事項をまとめてコピペすることができます。

`.claude/settings.local.json` (プロジェクト限定) or `~/.claude/settings.json` (プロジェクト共通) に以下を追加。

```plain text
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/scripts/launch-reviewit.sh /path/to/project"
          }
        ]
      }
    ]
  },
}

```

`~/.claude/scripts/launch-reviewit.sh` に以下を追加。

```plain text
#!/bin/bash

REPO_PATH="${1:-$(pwd)}"

cd "$REPO_PATH" || exit 1

if [[ -n $(git diff --name-only) || -n $(git diff --cached --name-only) || -n $(git ls-files --others --exclude-standard) ]]; then
  max_attempts=1000
  attempt=0

  while [ $attempt -lt $max_attempts ]; do
    port=$((RANDOM % 6000 + 4000))

    if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
      reviewit . --port $port &
      break
    fi

    ((attempt++))
  done

  if [ $attempt -eq $max_attempts ]; then
    echo "Error: Could not find an available port after $max_attempts attempts" >&2
    exit 1
  fi
fi

```

`launch-reviewit.sh` に実行権限を付与。

git の差分があるときだけ実行してます。

(スクリプトはポートのところ適当なのすんません😹)

## お願い

Claude Code 使い始めて3週間なので理解不足や、もっと良い使い方等あると思います。よければぜひお気軽にコメント等で教えていただけると嬉しいです 🙇

## 参考サイト

**告知**  
• HOKUTOでは**フルリモート** x 生成AI積極活用中で、**Devin AI, Claude Code Maxプラン** 全メンバーに配布しています。 
• プロダクトグループでは全ポジションで採用活動をしております！  
    ◦ エンジニア、QA,PdMなど     
こちらの記事もぜひお読みください
 ▶︎Newspicks掲載
 [「医師の3人に1人が利用。急成長の医療プラットフォーム「HOKUTO」が描く勝ち筋」](https://newspicks.com/news/9527775/)

- • HOKUTOでは**フルリモート** x 生成AI積極活用中で、**Devin AI, Claude Code Maxプラン** 全メンバーに配布しています。
- • プロダクトグループでは全ポジションで採用活動をしております！ 
    - ◦ エンジニア、QA,PdMなど
- 