---
title: "NZQA已经让自动评分进入Writing CAA：机器怎样参与决定一篇作文是否达标"
date: 2026-09-07
slug: "nzqa-ai-writing-marking"
draft: false
status: "working"
nextStep: "正式发表前检查2026最新ATS validation、OIA release及是否已有subgroup/fairness data。"
description: "从2025年起数字Writing CAA使用Automated Text Scoring；真正该问的是validation、边界人工复核、fairness与持续透明度。"
workingThesis: "高影响自动评分不能只靠“AI”或“效率”评价；要看机器负责哪一步、边界如何复核、模型怎样持续验证。"
series: "education-and-technology"
tags: ["education", "technology-and-ai"]
featured: false
readerQuestion: "你最希望NZQA公开ATS的哪一项validation数据？"
translationKey: "nzqa-ai-writing-marking"
---

从2025年5月开始，所有digitally submitted Writing co-requisite assessments都使用Automated Text Scoring（ATS）。接近Achieved / Not Achieved边界的作品再进入人工check-marking；NZQA目前说明大约40%的Writing assessments会进入这一人工复核。如果机器和人工不同，以human result为准（New Zealand Qualifications Authority [NZQA], 2026a）。

这已经是实际运行的national assessment，不只是pilot。

## 先别把ATS想成“ChatGPT批作文”

NZQA把ATS描述成针对co-requisite Writing专门训练的stand-alone technology，使用过去已经由human markers评分的student responses建立模型（NZQA, 2025c）。公开资料没有把它描述成学生和教师日常使用的general-purpose generative LLM。

2024年先进行了small-scale trial，随后用约35,000份Writing responses进行large-scale pilot。通过OIA公开的资料显示，ATS与human marker在最终achievement decision上的agreement约为80%（NZQA, 2025a）。

这个数字不能写成“AI准确率80%”。它只表示同一批作品中机器与human achievement decision约八成一致，没有单独说明剩余分歧由谁“错”、分歧集中在哪类writing，也没有自动回答subgroup fairness。

NZQA在同一份OIA材料中还提供了其他human-to-human assessment processes的agreement作为背景。那些数字来自不同任务和comparison design，不能做成AI与人类“准确率排行榜”。

## 40%的边界人工复核比一句“有人监督”更具体

当前流程大致是：

**Writing response → ATS → 若接近achievement boundary → experienced human check-marker → 如有分歧，human result overrides。**

这是一种human-in-the-loop设计。边界附近的错误最危险，因为一点score variation可能直接改变学生是否达到literacy co-requisite。把human resource集中到高风险decision boundary，有清楚的风险管理逻辑。

自动评分也带来一个可量化收益：速度。NZQA表示2025年5月超过55,000名学生参加Writing assessment，使用ATS后结果比前一年提前约3.5周返回（NZQA, 2025b）。更早的结果可以给学校更多时间安排下一轮support。

## Agreement还不是完整validation

高风险automated scoring至少要持续回答四类问题。

**Reliability**：不同event、不同时间，系统判断是否稳定？

**Validity**：模型实际奖励的features是否与Writing standard要测的construct一致？Ferrara和Qunbar（2022）指出，automated scores的validity不能只靠和human scores相关得高，还要说明评分信息是否construct-relevant。

**Fairness**：overall agreement良好，仍然可能隐藏特定subgroup或prompt的systematic error。这里我目前没有证据说NZQA ATS已经对某一群体存在bias；问题是这种检查应当存在，并尽可能公开。

**Explainability**：系统能否不仅做出decision，还让学生、教师和公众理解其validation与human safeguard？

Budget 2026又为AI/ML在marking、moderation和exam development等pilot配置资金（Ministry of Education, 2026）。这使透明度问题更重要，而不是更不重要。

## 一套值得长期公开的dashboard

未来我更希望看到的不是一句“AI与人工一样准确”，而是一组持续指标：human–machine agreement、boundary disagreement、human override rate、不同prompt与relevant subgroup表现、model update history、turnaround time，以及发生显著model change后是否重新validation。

自动评分进入qualification以后，信任不能靠“机器客观”或“人类更懂写作”两种直觉。要看decision process有没有被拆开、测量并持续检查。

## References

Ferrara, S., & Qunbar, S. (2022). Validity arguments for AI-based automated scores: Essay scoring as an illustration. *Journal of Educational Measurement, 59*(3), 288–313. https://doi.org/10.1111/jedm.12333

Ministry of Education. (2026). *Investing in secondary achievement: Budget 2026*. https://www.education.govt.nz/our-work/publications/corporate-documents/budget-2026/investing-secondary-achievement

New Zealand Qualifications Authority. (2025c). *Information on May co-requisite results release 2025 (A2025/6).* https://www2.nzqa.govt.nz/about-us/publications/newsletters-circulars/assessment-matters/a2025-6/

New Zealand Qualifications Authority. (2025a, September 3). *AI marking [Official Information Act release OC01942].* https://www2.nzqa.govt.nz/assets/About-us/Official-releases/2025/AI-Marking-OC01942-PR_Redacted.pdf

New Zealand Qualifications Authority. (2025b, August 27). *Embracing AI in student assessments*. https://www2.nzqa.govt.nz/about-us/news/embracing-ai-in-student-assessments/

New Zealand Qualifications Authority. (2026a). *How we mark co-requisite assessments*. https://www2.nzqa.govt.nz/ncea/subjects/litnum/marking/

## Evidence notes

- **NZQA marking page / A2025-6 / OC01942**：共同支持ATS部署、trial规模、约80% agreement及boundary human check。
- **Ferrara & Qunbar (2022)**：用于解释automated-score validation原则，不证明NZQA系统的具体fairness。
