---
title: "MCM study"
description: "美赛编程手所需内容学习"
pubDate: "2026-11-5"
---

# 配置环境

> **📅 11月5号**

美赛需要编程 Anaconda 来统筹管理所需要的软件，由于我之前在学习机器视觉的时候下载过 Anaconda，这里不再赘述。

安装好 Anaconda 之后点开 **Anaconda PowerShell Prompt**，在里面输入下面的命令即可完成环境配置：

| 命令 | 作用 |
| --- | --- |
| `conda create -n mcm python=3.10` | 创建一个新的环境沙箱，将美赛配置的环境和之前机器视觉所需的环境分隔开 |
| `conda info --envs` | 查看配置好环境的文件夹所在位置 |
| `conda activate mcm` | 启动 mcm 环境 |
| `conda install jupyter notebook -y` | 在新环境中安装 Jupyter Notebook |

> 💡 由于新环境中没有安装 Jupyter Notebook，故需要用上面的命令进行安装。

安装完成后，用 `jupyter notebook` 这个命令打开 Jupyter Notebook，之后美赛的编程就在这个命令打开的网页上完成。

打开之后应该是这样的页面：

<img src="/jupyter_notebook.png" alt="Jupyter 界面" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">