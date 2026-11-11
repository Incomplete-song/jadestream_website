---
title: "I2C"
description: "I2C深入学习"
pubDate: "2026-11-11"
---

今天小项目结束，不知道接下来做什么项目，就先深入学习了I2C通信相关知识，之前我的了解太浅显了。

<img src="/i2c1.png" alt="Jupyter 界面" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">

当SCL（时钟线）为高电平的时候从机才会把读取到的SDA（数据线）信号记录，
每发送8位信号,主机就要求从机返回一个应答位（从机将高电平的SDA拉向低电平表示收到数据）
<img src="/i2c2.png" alt="Jupyter 界面" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">

<center>从机应答原理<center>
<img src="/i2c3.png" alt="Jupyter 界面" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">

<center>i2c数据帧内容格式<center>
<img src="/i2c4.png" alt="Jupyter 界面" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">