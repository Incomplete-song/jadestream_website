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

# Pandas 常用命令

以下是各个命令的作用：

## df.info 命令

<img src="/df.info.png" alt="df.info用法" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">

| 输出信息 | 含义 |
| --- | --- |
| `RangeIndex: 46 entries, 0 to 45` | 说明这个表格一共只有 46 行 |
| `Data columns (total 3 columns)` | 只有 3 列 |
| `Non-Null Count`（非空数量） | 3 列都是 46，说明没有缺失值 |
| `Dtype: object` | object 在 Pandas 里代表文本（字符串），说明这 3 列全是文字，没有数字 |

## df.describe 命令

<img src="/df.describe.png" alt="df.describe用法" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">

因为你的 3 列全是文本，所以 `describe()` 自动统计了文本信息，而不是数学上的最大值、最小值：

| 输出信息 | 含义 |
| --- | --- |
| `count` (46) | 总数 46 行 |
| `unique` (46, 46, 24) | 第一列有 46 种不同的值，第二列也有 46 种，第三列有 24 种 |
| `top` | 出现频率最高的词，比如 match_id 是变量名，match identification 是它的解释 |
| `freq` | 出现的次数 |

> 💡 这说明这个表里没有可以画图的数值，只有解释说明。

## df.isnull().sum() 命令

<img src="/df.isnull.sum.png" alt="df.isnull.sum用法" style="max-width: 70%; border-radius: 8px; display: block; margin: 10px auto;">

全是 0，说明这 46 行说明书没有任何缺失值，非常干净。