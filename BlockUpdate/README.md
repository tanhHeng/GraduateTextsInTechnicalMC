# <center>Minecraft更新理论深入浅出</center>

## 概述

本篇旨在深入浅出地从表现和代码两方面分析Minecraft中的更新行为，主要解释包括NC更新、PP更新、其他类型更新、深度优先搜索与更新链等概念。每一部分都将分为基础解释与进阶的源码分析。

这不仅是一篇面向新手的更新理论入门教程，同样也是一篇面向进阶玩家的便于查阅的文档。

## 解释说明

为便于理解，**基础解释**部分可能会存在一些概括性的表述，这些表述并不绝对严谨，但不影响通常情况下的分析。这些表述会以`*`注明，并在**进阶**部分进一步解释。

本篇默认读者对Minecraft以及各种红石元件有**比较基础**的认识。若在阅读过程中存在问题，可自行查阅Wiki解决。同样，一些具有特殊性且并不典型的情况不在本篇的说明范围内，这些情况通常在Wiki已有归档罗列。当某一概念存在这些情况时，将会以`*`注明。

本篇中采用的代码使用`1.20.1-yarn`反编译，若有特殊情况会以`*`注明。

## 开源协议与著作权声明

本篇全篇基于[CC-BY-4.0协议](https://creativecommons.org/licenses/by/4.0/legalcode.zh-hans)开源。Copyright © 2024 tanh_Heng. All Rights Reserved.

Email: <fannbryan@gmail.com>,<tanh_heng@outlook.com>

- 作者 / BFladderbean, tanh_Heng
- 协作 / void, Petris, XJH_Jorhai
- 鸣谢 / Graduate texts in technical MC, Fallen_Breath, 五羊飞kaniol

## 目录

- [#00](./00-导论.md) 导论
- [#01](./01-更新概念与不同类型的更新.md) 更新概念与不同类型的更新
- [#02](./02-连续的方块更新及其分析方法.md) 连续的方块更新及其分析方法