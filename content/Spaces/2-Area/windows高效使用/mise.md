---
{"publish":true,"permalink":"/Spaces/2-Area/windows高效使用/mise.md","description":"dev tools, env vars, task runner","created":"2025-06-18","modified":"2025-07-04","published":"2025-07-29T23:24:26.598+08:00","tags":["linux命令","github开源"],"cssclasses":""}
---


在macos和linux上，可以替换掉[[Sources/GithubStarsSync/goenv\|goenv]]、[[Cards/rvm]]、[[Sources/GithubStarsSync/vfox]]了。windows还是得继续用这些。

https://github.com/jdx/mise

这篇教程写得很好了：

[[Sources/Clippings/Mise：跨语言开发环境的高效配置工具]]

## 配置文件

[[Cards/dot文件配置同步仓库]] clone后，

进入到mise配置目录，直接执行，既可自动安装全部开发环境

```
mise trust
mise install
```

查看是否成功安装和配置环境变量：

```bash
bun --version && go version && java -version && node --version && python --version && ruby --version && rustc --version
```

## linux或macos安装

```
curl https://mise.run | sh
```

## windows上安装

### 使用powershell

```
# https://github.com/ScoopInstaller/Main/pull/6374
scoop install mise


## 配置环境变量
$shimPath = "$env:USERPROFILE\AppData\Local\mise\shims"
$currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$newPath = $currentPath + ";" + $shimPath
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')

## 测试是否成功
mise use --global node@22
node -v
# v22.x.x
```

### 使用wsl

```

curl https://mise.run | sh


## 如果上面失败，则 以linux apt的形式安装
sudo apt update -y && sudo apt install -y gpg sudo wget curl
sudo install -dm 755 /etc/apt/keyrings
wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor | sudo tee /etc/apt/keyrings/mise-archive-keyring.gpg 1> /dev/null
echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main" | sudo tee /etc/apt/sources.list.d/mise.list
sudo apt update
sudo apt install -y mise
## 配置环境变量
echo 'eval "$(mise activate bash)"' >> ~/.bashrc

## 验证node是否识别 ，新建terminal tab以激活环境变量
node -v
```

## mise ls

```

```

