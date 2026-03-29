---
publish: true
permalink: /Sources/GithubStarsSync/claude-code-router.md
aliases:
  - ccr
description: Use Claude Code as the foundation for coding infrastructure, allowing you to decide how to interact with the model while enjoying updates from Anthropic.
created: 2025-06-18
modified: 2025-06-18
---

更简洁的竞品：[[y-router]]
部署在服务器上的竞品：[[claude-relay-service]]

如果是使用官方的key，则一般直接提供claude code的兼容api，可以直接使用：[[kimi v2用于claude code-官方token-不用ccr的情况下]]

vi ~/.claude-code-router/config.json

```
npm install -g @musistudio/claude-code-router
```

##

```
ccr code --dangerously-skip-permissions --model ZhipuAI/GLM-4.5

ccr code --dangerously-skip-permissions --model Qwen/Qwen3-235B-A22B-Thinking-2507

ccr code --dangerously-skip-permissions --model moonshotai/Kimi-K2-Instruct
```
