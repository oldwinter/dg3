---
star_date: 2023-12-06 05:46:59
repo_name: pyenv/pyenv
repo_url: https://github.com/pyenv/pyenv
description: Simple Python version management
language: Roff
stars: 42385
forks: 3182
created_date: 2012-08-31
updated_date: 2025-06-19
pushed_date: 2025-06-18
is_fork: false
license: MIT License
topics:
- python
- shell
size_kb: 6189
issues: 65
date created: 2023-12-06
date modified: 2024-11-05
publish: true
分类:
- '[[Atlas/Categories/github开源 - fileclass]]'
---


# pyenv/pyenv

## 📝 项目描述

Simple Python version management

## 🔗 链接

[GitHub仓库](https://github.com/pyenv/pyenv)

## 📊 仓库统计

- ⭐ Stars: 42385
- 🍴 Forks: 3182
- 🐛 Issues: 65
- 📦 大小: 6189 KB

## 💻 技术信息

- 🔤 主要语言: Roff
- 🏷️ 标签: python, shell

## 📅 时间线

- 🌟 我的收藏时间: 2023-12-06 05:46:59
- 🎂 项目创建: 2012-08-31
- 🔄 最后更新: 2025-06-19
- 🚀 最后推送: 2025-06-18

## ℹ️ 其他信息

- 🔀 是否Fork: 否
- ⚖️ 开源协议: MIT License


---

## 合并内容


## 安装命令

通过 brew 直接安装 python，会有很多问题，pip install 的时候会报各种错误，所以还是考虑换成 pyenv 来安装 python 执行环境，而且还可以方便的换不同的 python 版本。

```
brew install pyenv
```

也需要配置 [[Cards/zshrc文件备份\|zsh]]

```
pyenv install 3.12.0

pyenv local 3.12.0

python --version
```