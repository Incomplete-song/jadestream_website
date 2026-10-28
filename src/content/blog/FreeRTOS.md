---
title: "FreeRTOS"
description: "FreeRTOS相关学习历程"
pubDate: "2026-10-28"
---

# FreeRTOS

> FreeRTOS的学习过程(更新中💤)



## 一、FreeRTOS概述

FreeRTOS是用来处理复杂并行任务的好方法，将原本需要写在一个while（1）循环中的并行任务解耦形成n个独立任务，这样代码好写也比较明确


## 二、基本操作
### 1. 找到CubeMX支持的FreeRTOS
在Cubemx中用图中按钮打开FreeRTOS<br>
![FreeRTOS1](/FreeRTOS1.png)<br>
打开后图示选择CMSIS_V2<br>
![FreeRTOS2](/FreeRTOS2.png)<br>
为什么选CMSIS_V2？<br>
**因为它的兼容性好**<br>
CMSIS本质上是一层“翻译层”，把底层FreeRTOS的功能封装成统一的API给我们调用，这样我的应用层代码是独立于具体操作系统的，如果以后想从FreeRTOS换成其它系统直接把底层换掉就行了，不用重写API代码<br>

然后在这个页面可以创建任务<br>
![FreeRTOS4](/FreeRTOS4.png)<br>
创建好了后生成的代码中就有对应的任务<br>
为什么？因为CubeMX是通过FreeRTOS的osThreadNew函数帮我们创建任务的<br>
![FreeRTOS5](/FreeRTOS5.png)<br>
![FreeRTOS6](/FreeRTOS6.png)<br>

FreeRTOS在调度的时候会执行上个函数的第一个参数（其实也是个函数）中的代码，所以我们写代码需要写在下图的for循环中（注：延时函数需要写成osDelay而不是HAL_Delay<br>
![FreeRTOS7](/FreeRTOS7.png)<br>

双击tasks可以看到这个任务的参数（这是默认任务）<br>
![FreeRTOS8](/FreeRTOS8.png)<br>
<br>
###  2.	创建并发任务<br>
![FreeRTOS9](/FreeRTOS9.png)<br>
这张图的Task Name是给自己看的，<br>
Entry Function是“入口函数”，也就是cubemx在生成下面一张图时使用的函数名<br>
![FreeRTOS10](/FreeRTOS10.png)<br>
![FreeRTOS11](/FreeRTOS11.png)<br>

FreeRTOS是如何实现任务并发的呢？<br>
**本质上就是改变cpu的工作方向**<br>
CPU在计算时只能调用寄存器中的数据来计算，计算完成后把结果再存入寄存器中，寄存器再把数据放到内存或者其他地方。<br>
而寄存器中有一个“PC寄存器”，这个寄存器中存储的数据是CPU处理数据的“命令”，CPU根据PC寄存器的命令来处理其他寄存器中的数据，根据这个原理，FreeRTOS实现了“并发”执行任务<br>
具体原理：FreeRTOS给每个任务分配一个“时间片“，在这个时间片中，FreeRTOS指示PC寄存器读取任务A的处理命令，使得其他寄存器读取任务A中的数据给CPU处理，当时间片用完之后，FreeRTOS会把这时候寄存器中的待处理的数据压入A任务栈，接着分配个时间片给任务B，指示PC寄存器去读取任务B的处理命令，其他寄存器读取任务B的数据，然后重复A的操作<br>
如果有多个任务都是同理。<br>
![FreeRTOS12](/FreeRTOS12.png)<br>
![FreeRTOS13](/FreeRTOS13.png)<br><br>

如果在一个完整的时间片中遇到对应的任务出现osDelay（延时函数）怎么办？<br>

就像图中所说，FreeRTOS会划分出任务的四个状态，当调用asThreadNew函数时会给该任务分配个“就绪态“（Ready），当要处理的任务处于就绪态的时候如果要开始执行，FreeRTOS就会给任务分配时间片使其进入”运行态“（Running），如果该任务在运行态中进行到了osDelay延时函数，该任务就会被分配到”阻塞态“（Delayed）/（Blocked），这时候下一个任务就会被分配时间片，进入运行态。如果该任务也在运行态中进行到了osDelay延时函数，那么也会被挂起进入阻塞态，下一个任务就会被分配时间片，进入运行态；如果没有，那就会执行完时间片回到就绪态排队，阻塞态的延时结束后也会回到就绪态排队。如果有任务处理完了就会被分配到”挂起态“（Suspended），用asThreadResume函数可以把它重新唤起进入就绪态。<br>

也正是这个原因，延时函数要用osDelay释放CPU算力<br>
（HAL_Delay是不断比较是否达到设定的时间点实现延时的，需要不断调用CPU计算）<br>
![FreeRTOS14](/FreeRTOS14.png)<br>
同时FreeRTOS会将代表正在运行的指针变量指向优先级最高的任务，以便调度器刚启动的时候就可以执行该任务

为什么有待处理任务和无待处理任务的状态都被标记为了Blocked？<br>
因为FreeRTOS将无超时时间的阻塞态与挂起态的任务都放入了同一个列表中，编译器没有区分。故我们区分的方法是如果有等待的事件那就是阻塞态，没有等待的事件就是挂起态<br><br>
###  3.	优先级与抢占<br>
每个任务在创建的时候会被分配一个“优先级”，不同优先级的任务在就绪态排的队伍也不一样，高优先级的任务始终排在队列的最前面，率先进入运行态，如果高优先级任务没有被安排进入阻塞态或者挂起态，那么高优先级任务会一直占用CPU算力，造成其他低优先级的任务出现“任务饥饿”。<br>

如果高优先级的任务进入了阻塞态，此时低优先级任务进入运行态，当高优先级任务延时结束进入就绪态且低优先级任务时间片没用完时，高优先级任务会把低优先级任务踢出运行态自己进入运行态。这被称为“抢占式调度”机制。<br>
![FreeRTOS15](/FreeRTOS15.png)<br>
这个可以选择开不开，一般都是开着的<br>
··············网址·············在这里可以看到所有Config parameters中的设置<br>
![FreeRTOS16](/FreeRTOS16.png)<br>
在这段代码中第三个参数就是任务的设置结构体，在里面可以看到在CubeMX中配置的优先级，注：FreeRTOS中优先级数字越大优先级越高，与STM32的优先级相反。同时，FreeRTOS中一共有0~55共56个优先级<br>

总结
![FreeRTOS17](/FreeRTOS17.png)<br>