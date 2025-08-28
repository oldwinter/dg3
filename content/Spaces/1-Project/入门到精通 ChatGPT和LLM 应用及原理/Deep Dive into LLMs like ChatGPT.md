---
{"publish":true,"permalink":"/Spaces/1-Project/入门到精通 ChatGPT和LLM 应用及原理/Deep Dive into LLMs like ChatGPT.md","created":"2025-04-03","modified":"2025-04-09","cssclasses":""}
---


[Deep Dive into LLMs like ChatGPT - YouTube](https://www.youtube.com/watch?v=7xTGNNLPyMI&list=WL&index=1&t=276s)

## pre-train 预训练

最终生成base model基础模型，也就是一个 互联网文档模拟器。只具备预测下一个token的能力，基本没有指令遵循的能力。

所以下一步要通过post-train 把base model 训练成 assistant，能遵循人类的指令Instruct。

## post-train 后训练

先用SFT，让模型能否理解人类指令并遵从。这里就需要用到大量的人类标记员。人类标记员就是提供问答对，给base model。

SFT 只是模仿人类专家

RL 让模型自己不断迭代进化，从而超越人类。

![](https://pub-pic.oldwinter.top/2025/04/f6bec730744ac894aa71000c5434e6fa.png)

比如alphago和李世石的对战中的第37手，人类专业棋手下出那一手的概率几乎为0，但是alphago下出来了，这是RL的魅力。

大模型通过RL，以后也许也会出现需要人类目前做到的洞见、惊艳表现等。

之后再进行 [[Cards/RLHF]]。
1. 对问题集，进行人为排序打分，human feedback。
2. 基于以上问题集及其评分，额外训练出[[Cards/奖励模型]]，这个模型充当了人类模拟器的作用。
3. 此时，对待模型对同一个问题生成的成千上万条回答，使用上一步的奖励模型打分，奖励其中答得最好的，以此强化模型选择这一条最佳的回答。

与SFT的最大不同点在于，这里的奖励，是[[Cards/奖励模型]]自己回答出的最佳答案，而不是人类标记员提前写好的所谓标准答案。  
![](https://pub-pic.oldwinter.top/2025/04/3a756c2172bc2d1bdfdb91c2b413c6ea.png)
![](https://pub-pic.oldwinter.top/2025/04/2d61121c3d6f2ede5ee165c7e974e5b6.png)

### SFT

可以简单粗暴地理解，4o等模型，着重的就是SFT，虽然它也带做了一些RL

[[Cards/SFT - Supervised Fine Tuning]]

### RL

可以简单粗暴理解，o1，r1等reasoning推理模型，着重的就是RL。

[[Cards/RL]]

### RLHF

RL着重于答案可验证的领域。但比如诗歌创作，写段子等，没有所谓标准答案，就需要人工标注介入，所以有了[[Cards/RLHF]]。

这里的human feedback，不再像之前的SFT需要人类专家给出专业的问题的答案。这里只需要给模型给出的结果，进行优劣排序既可，所以这里的，就是我们听说的打标员的工作。
 

这个阶段的训练，很依赖human feedback。所以我显著地感觉到deepseek r1写段子的能力很强，估计是因为中国人更懂中国人吧。

[[Cards/RLHF]]更像是一种 fine tune微调，因为[[Cards/奖励模型]]总有漏洞，导致改进失败。所以RL的存在，能让围棋能力无止境上升，但RLHF无法让LLM模型的能力无限上升。
