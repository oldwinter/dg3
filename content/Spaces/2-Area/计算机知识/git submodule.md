---
{"publish":true,"permalink":"/Spaces/2-Area/计算机知识/git submodule.md","title":"git submodule","created":"2022-06-23","modified":"2025-07-10","published":"2025-07-17T11:00:41.857+08:00","cssclasses":""}
---


> AI时代，这些复杂git操作，统统交给ai自动化搞就行了。

## 添加子模块

添加一个仓库到本仓库的指定目录，将其设置为子模块：

```
 git submodule add git@github.com:oldwinter/knowledge-garden.git  _netes/
 git submodule add https://github.com/oldwinter/knowledge-garden.git content/
```

⚠️添加ssh子模块，还会有认证鉴权问题，所以如果是public的，用https格式的.git链接最方便。

## 删除子模块

**删除子模块比较麻烦，需要手动删除相关的文件，否则在添加子模块时有可能出现错误**

同样以删除`assets`文件夹为例

1. 删除子模块文件夹

```sh
$ git rm --cached assets
$ rm -rf assets
```

1. 删除`.gitmodules`文件中相关子模块信息

```sh
[submodule "assets"]
  path = assets
  url = https://github.com/maonx/vimwiki-assets.git
```

1. 删除`.git/config`中的相关子模块信息

```sh
[submodule "assets"]
  url = https://github.com/maonx/vimwiki-assets.git
```

1. 删除`.git`文件夹中的相关子模块文件

```sh
$ rm -rf .git/modules/assets
```

##

[Git Submodule 命令使用与详细教程 - 掘金](https://juejin.cn/post/6948251963133788196)
