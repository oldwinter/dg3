---
date created: 2023-12-06
date modified: 2024-11-05
publish: true
---

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