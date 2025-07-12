---
date created: 2025-07-04
date modified: 2025-07-04
title: kubectl
aliases:
  - kubernetes-cli
publish: true
---

## 安装

```
brew install kubectl
```

## 自动补全配置

为了在所有的 Shell 会话中实现此功能，请将下面内容加入到文件 ~/.zshrc 中。

```
source <(kubectl completion zsh)
```

比如直接执行

```
echo "source <(kubectl completion bash)" >> ~/.zshrc
```

## 当我输入kubectl命令，背后发生了什么

[zh-cn](https://github.com/jamiehannaford/what-happens-when-k8s/tree/master/zh-cn)

## 好用的提速kubectl的工具kubectx kubens

https://github.com/ahmetb/kubectx

多集群，多namespace管理的时候，尤其好用，避免了很多的重复指定-n dev这种操作。

安装完[[Spaces/3-Resource/软件梳理/linux常用命令/fzf]]后，只敲命令不跟参数，则会自动进入fzf模糊搜索模式。

```bash
      
//阻塞式命令，拿来控制流程
kubectl wait --for=condition=Ready pods --all --timeout=1200s 

//获取指定label的pod信息
kubectl get pod --show-labels |grep app-ch

```