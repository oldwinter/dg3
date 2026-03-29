---
publish: true
permalink: /Spaces/3-Resource/软件梳理/macos软件/macos m3 重装list.md
created: 2024-07-11
modified: 2025-07-13
---

[[macos m4 新装 list]]

其实现在有非常多都支持 brew cask 安装，后面记得尝试。

> 要注意，有 arm 或通用版本，则尽量不要使用 intel 版本，卡顿且耗电。

## 前置模块

- [[Homebrew]]
- [[Xcode Command Line Tools]]

## 个人必装

- [[搜狗输入法]]
- [[Arc浏览器]]
  - 目前还不支持 profile 同步，所以需要重新手动弄一遍插件和账号登录等等。
  - [[arc浏览器插件重装list]]
  - 2024-11-21 大概率要停止开发新功能，换成最合适的平替 [[Zen Browser]]
- [[阿里云盘]]
- [[夸克网盘]]
- [[Obsidian]]
- [[Notion]]
  - [[飞书]]
- [[Bob]]
- [[滴答清单]]
- [[VSCode]]
  - [[Cursor]] ，[[AI Native]] 软件
- [[Raycast]]
- [[Clash Pro]]
  - [[Clash Verge]] 还在继续维护
  - [[Surge]] 🛫 2025-05-12
- [[Warp App]] ✅ 2024-07-23
  - 中文乱码问题还没解决，可能是 macOS 15 beta 版本导致的。
- [[Contexts]] ✅ 2024-07-23
  - 因为 raycast 的应用配置快捷键功能很好用，弃用 ✅ 2024-07-23
- [[Keyboard Maestro]]
- [[Bartender]] ✅ 2024-07-23
  - [[Ice]] 免费
  - [[Barbee]]
- [[ChatGPT 桌面端]] ✅ 2024-07-23
- [[Snipaste]] ✅ 2025-06-25
  - [[shottr]] 免费
  - [[PixPin]] ✅ 2024-07-23
  - [[CleanShot X]] ✅ 2024-07-23
- [[KeyboardHolder]]
  - [[Input source pro]] ✅ 2024-07-23
- [[istat Menus]] ✅ 2024-07-23
- [[BetterAndBetter]]
- [[Reeder]] ✅ 2024-07-23
- [[Latest - MacOS软件]]
- [[1Piece]]
- [[腾讯会议]]
- [[微信]]
- [[微信读书]]
- [[AlDente]]
- [[CotEditor]]
- [[Cubox]]
- [[IINA]]
- [[Input source pro]]
- [[Keka]]
- [[localsend]]
- [[menubarX]]
- [[Linear Mouse]]
- [[OpenAI Translater]]
- [[OrbStack]]
- [[Presentify]] ✅ 2025-06-25
- [[QLmarkdown]] ✅ 2024-07-23
- [[QuickRecorder]]
- [[UTM]] ✅ 2024-07-23
  - [[VMware]] ✅ 2024-07-23
  - [[Parallels Desktop]]
- [[Steam]] ✅ 2024-07-23
  - 只有 intel 架构版本，不用了。 ✅ 2024-07-23
- [[Amnesia macos软件]] ✅ 2025-06-25

## 还在考查作用

[[playcover]]

### 可以通过 homebrew 一键安装

2025-04-03 ：brew list 备份

```
brew list --cask
adrive			ngrok
android-platform-tools	orbstack
bruno			pearcleaner
cherry-studio		piclist
clash-verge-rev		qlcolorcode
claude			qlmarkdown
coteditor		qlstephen
cursor			qlvideo
feishu			quicklook-json
folo			quicklookase
font-lxgw-wenkai	quickrecorder
karabiner-elements	raycast
keyboardholder		tencent-meeting

```

- [[Ice]]
  - brew install jordanbaird-ice
- [[QuickRecorder]]
  - brew install lihaoyun6/tap/quickrecorder
- [[Input source pro]]
  - brew install --cask input-source-pro
- [[KeyboardHolder]]
  - brew install --cask keyboardholder
- [[Linear Mouse]]
  - brew install --cask linearmouse
- [[Warp App]]
  - brew install --cask warp
- orbstack
  - brew install orbstack
- applite
- [[VSCode]]
  - brew install --cask visual-studio-code
- arc
  - brew install --cask arc
- utm
  - brew install --cask utm

## 命令行

- [[Homebrew]]
  - [[kubectl]]
  - [[QLmarkdown]]
  - [[pandoc]]
- [[z命令]]
- [[tldr]]
- [[fzf]]

## 开发环境

### 通用

- [[Docker]]
- [[Python]]
  - [[pyenv]]
- [[Golang]]
- [[nodejs]]
  - [[nvm]]
- [[ruby]]
  - [[rvm]]

### 后端

- [[Navicat]]
- [[Proxyman]]
- [[Goland]]

### 安卓

- [[360 加固助手]]
- [[Android Studio]]

### iOS 开发

- [[Developer]]

### 前端

- [[微信开发者工具]]

### 运维

- [[kubectl]]

## MacOS 系统配置

[[macos 使用体验优化配置]]

## 发给老妹 5 星级推荐：

- [[Homebrew]]
  - 有了它，什么软件，环境依赖，都是一键式完成了。
- [[Clash Verge|clash verge rev]]
  - 翻墙后，打开增强模式，以后将通畅无阻。
- [[Arc浏览器]]
  - 比 chrome 浏览器进行了非常多的创新，值得一试。
- [[Raycast]]
  - 必学，效率神器。
- [[BetterAndBetter]]
  - 配置 3 指，4 指手势后，你将放弃鼠标，彻底爱上触摸板。
- [[ChatGPT 桌面端]]
  - 官方出品，快捷键随时呼出提问，24 小时 on call 的万能助手。
