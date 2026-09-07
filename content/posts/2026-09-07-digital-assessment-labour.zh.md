---
title: "数字考试把哪些工作留给了学校？"
date: 2026-09-07
slug: "digital-assessment-labour"
draft: false
status: "working"
nextStep: "把NZQA digital readiness要求整理成Required / Recommended / Contingency三栏，避免把建议写成硬性规则。"
description: "电子化把部分流程集中到NZQA，也把设备、网络、SAC、技术备份和本地执行条件变成assessment infrastructure。"
workingThesis: "数字化是否节省总成本需要数据；目前可以确认的是operational dependencies被重新分配。"
series: "education-and-technology"
tags: ["education"]
featured: false
readerQuestion: "一场digital assessment最容易在哪个本地环节出问题？"
translationKey: "digital-assessment-labour"
---

学生打开电脑、登录、作答、提交，一场digital assessment看起来比纸笔轻很多。站到学校这一边，还有另一张清单：device compatibility、power、network、supervisor dashboard、SAC、software conflicts、backup devices，以及失败时的paper contingency。

这不是说数字考试特别糟。它说明“电子化”没有让assessment失去physical infrastructure，基础设施只是换了形状。

## 哪些工作被中央系统接走，哪些留在本地

NZQA负责digital assessment platform、entries、training、technical support和central delivery infrastructure（New Zealand Qualifications Authority [NZQA], 2026a）。digital responses还可以直接进入central marking process。

学校则要保证学生和supervisors有合适device、考虑电池与充电、兼容browser和background software、安排SAC、检查network，并为technical failure准备fallback。某些digital language assessments还涉及whitelisting或separate network/VLAN等建议性配置（NZQA, 2026a）。

这里必须区分“原本考试就有的工作”和“digital-specific dependency”。supervision本来就存在，但supervisor dashboard device是数字化新增条件；SAC本来就存在，但platform compatibility和digital/paper selection改变了执行方式。

Budget 2026还专门安排资金帮助学校和kura承担NCEA co-requisite external assessment的administrative cost（Ministry of Education, 2026）。这至少说明local administration不是一个纯粹想象出来的问题，但仍不能据此断言数字化使全国总workload净增加。

## 一个digital system要先画failure path

Primary path可以很简单：

**device → network → platform → submission**

然后逐个问：如果这一点失败怎么办？于是出现compatibility checks、practice activities、spare devices、paper buffers、technical support和supervisor monitoring。

NZQA从2025年调整digital NCEA exam的paper backup安排，为digital entries配置额外buffer packs，应对device failure或无法继续digital assessment的情况（NZQA, 2025）。成熟数字系统并不假装technology永远不失败，而是提前设计failure mode。

digital assessment还会产生纸笔时代较弱的一层：process data。NZQA当前向学生说明，系统可收集mouse movements、clicks、device information、lockout times和saved versions of answers，并按其说明用于system improvement或rule-breach investigation（NZQA, 2026b）。这值得以后单独研究privacy与assessment validity，本篇不提前把它写成隐私侵害。

## 总workload现在还不能下结论

数字化可能减少printing、transport、script handling、部分manual marking和storage，也可能增加device management、network readiness、technical support、cybersecurity和fallback planning。我目前没有找到足够的全国数据把两边都算进去，因此不写“数字考试增加了教师工作量”。

更可靠的判断是：**工作结构改变了。**

学校可以维护一张Digital Assessment Readiness Register，把Devices、Power、Software、Network、Entries、SAC、Supervision、Student readiness和Failure plan逐项写清，并给每一项指定Owner。VLAN不应该突然变成English teacher的工作；成熟制度要把责任放到最合适的位置。

以后真正值得公布的数据包括technical incident rate、forced switch-to-paper rate、school IT/support time、SAC access、digital/paper comparability、cost per assessment和result turnaround。那时才有资格回答digital-first到底更便宜、更公平或更有效。

## References

Ministry of Education. (2026). *Investing in secondary achievement: Budget 2026*. https://www.education.govt.nz/our-work/publications/corporate-documents/budget-2026/investing-secondary-achievement

New Zealand Qualifications Authority. (2025). *Changes to paper backups for digital NCEA examinations from 2025 (A2025/9).* https://www2.nzqa.govt.nz/about-us/publications/newsletters-circulars/assessment-matters/a2025-9/

New Zealand Qualifications Authority. (2026a). *Digital external assessment*. https://www2.nzqa.govt.nz/ncea/external-assessment/about-digital-external-assessment/

New Zealand Qualifications Authority. (2026b). *Preparing for digital assessment as a student*. https://www2.nzqa.govt.nz/ncea/external-assessment/about-digital-external-assessment/preparation-for-students/

## Evidence notes

- **NZQA digital guidance**：支持本地设备、网络、SAC、backup等实际dependencies。
- **Budget 2026**：只用于证明school-level co-requisite administration被正式视为需要资源的工作，不证明净workload方向。
