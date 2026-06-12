---
title: "课表助手开发记录"
description: "记录课表助手从需求拆分、数据建模到前端交互设计的第一轮开发思路。"
pubDate: 2026-06-10
tags: ["项目开发", "TypeScript", "课表助手"]
featured: true
---

课表助手的起点很简单：我希望有一个比截图更灵活的课表查看方式，可以快速知道本周有哪些课、课程是否调停、某个时间段是否冲突。

第一轮不考虑账号系统和云同步，先做成本地可用的小工具。这样能把核心问题聚焦在数据结构和交互上。

## 需求拆分

当前版本先覆盖四个场景：

1. 导入或手动录入课程。
2. 按周查看课程安排。
3. 标记单双周、起止周和节次。
4. 检查同一时间段的课程冲突。

后续再考虑日历订阅、课程提醒和跨设备同步。过早做登录和后端会拉高复杂度，不利于先验证工具是否真的好用。

## 数据模型

课程数据可以先拆成课程信息和上课时间段：

```ts
type WeekMode = 'all' | 'odd' | 'even';

interface CourseSlot {
  weekday: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  startSection: number;
  endSection: number;
  startWeek: number;
  endWeek: number;
  weekMode: WeekMode;
  classroom?: string;
}

interface Course {
  id: string;
  name: string;
  teacher?: string;
  color: string;
  slots: CourseSlot[];
}
```

这样一门课可以有多个时间段，例如理论课和实验课分开上。冲突检测时只需要把 `CourseSlot` 展开到指定周，再比较星期和节次区间。

## 冲突检测思路

两个时间段冲突需要同时满足：

- 星期相同。
- 当前周都生效。
- 节次区间有交集。

节次区间判断可以写成：

```ts
function isSectionOverlapped(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return Math.max(aStart, bStart) <= Math.min(aEnd, bEnd);
}
```

这个函数本身很小，但它让冲突检测的主流程更容易读。后续如果要支持更细粒度的时间段，也可以把这层替换掉。

## 前端交互

课表视图应该优先保证扫视效率。移动端使用横向星期切换或紧凑列表，桌面端使用标准周视图。课程卡片展示课程名、教室、教师和周次，点击后进入编辑。

我准备把第一版做成纯前端本地存储：数据保存在 `localStorage`，导入导出使用 JSON。这样即使以后换成云端同步，也不会影响最核心的数据结构。

## 当前复盘

这个项目的难点不是写一个课表表格，而是把“周次、单双周、节次、冲突”这些规则统一建模。第一轮目标是先做一个稳定可用的本地版本，再根据真实使用频率决定是否继续扩展。
