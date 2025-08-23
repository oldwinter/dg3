---
{"publish":true,"permalink":"/Spaces/1-Project/Raycast/raycast ai 上下文限额测试.md","created":"2025-07-12","modified":"2025-08-16","cssclasses":""}
---


表面模型写着支持 1M，但是上传的时候，大约只有256k，就会超出。

## gemini上的限额

[三体1疯狂年代.txt](https://drive.google.com/open?id=1I59586NY3HjHvIX-dU-zFD-74M-onCM9)

[三体2黑暗森林.txt](https://drive.google.com/open?id=1JI-KSHUv4hITBp_WVghVQEl6BP13gsJX)

[三体3死神永生.txt](https://drive.google.com/open?id=1FHJrYKghuNk0v3E1MZeawOKKRHc_TKlI)

[三体X修订增补版.txt](https://drive.google.com/open?id=1_xWhyn-HF-crhdIXdx-wV3gi46ho8Tgg)

[CleanShot 2025-05-19 at 00.28.06@2x.png](https://pub-pic.oldwinter.top/2025/05/2963e328f53567bbb4cfd20441715205.png)

## 同样的丢到raycast

> 结论，raycast前端做了限制，上限256k，如果忽略，也可以发出去，但后端限制了512k。达不到模型本身的1M

无论是原文件，还是使用剪切板，都会提示超出了。毛估估的话，一半不到，大概只有256k上下文。

但经过测试，如果附上表面上显示超出的了图片，他依然能处理

![CleanShot 2025-05-19 at 00.43.00@2x.png](https://pub-pic.oldwinter.top/2025/05/1562425f5e977618a442f4e9ec625550.png)

由下图推测，是能支持1m上下文的，只是界面显示bug。

![CleanShot 2025-05-19 at 00.43.33@2x.png](https://pub-pic.oldwinter.top/2025/05/b184a5af7fedeb72db097424177868fb.png)

按照gemini那边的估计，这3本书应该只有600k左右。但这里却拦截了。证明raycast后端那边自己又做了一层判断，大概只有512k左右就会判断超出。换成gpt4.1模型也以后也一样的，所以肯定是raycast 后端自己判断的。

![CleanShot 2025-05-19 at 00.44.54@2x.png](https://pub-pic.oldwinter.top/2025/05/36da7e87fd07b24824e4974e5c0df5ac.png)

但是如果不是附上图片的话，其实它确实不响应了，证明是真的截断了。

![CleanShot 2025-05-19 at 00.54.48@2x.png](https://pub-pic.oldwinter.top/2025/05/e289d0b1f0f6919b8bd67cdbdbd8731f.png)
