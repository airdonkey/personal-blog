---
title: "当学生说“ChatGPT给我Excellence”：谁有资格判断一篇作文？"
date: 2026-09-07
slug: "chatgpt-grades-student-writing"
draft: false
status: "working"
nextStep: "用3–5篇公开NCEA-style exemplars做一个可重复小实验，测试prompt与model variation对grade judgement的影响。"
description: "AI能给grade并不等于一次聊天窗口输出具备summative assessment authority；关键在校准、证据、moderation与责任。"
workingThesis: "教师专业判断的价值不在于‘人永远比AI准’，而在于正式assessment judgement可追溯、可校准、可复核并有人负责。"
series: "education-and-technology"
tags: ["education", "technology-and-ai"]
featured: false
readerQuestion: "如果AI与老师给出不同grade，你认为最先该检查什么？"
translationKey: "chatgpt-grades-student-writing"
---

以后英语老师越来越可能听到一句话：“You gave me Merit, but ChatGPT said this is Excellence.”

如果学生真的把作文、standard和rubric放进AI，AI还给出一整套听起来合理的解释，他问“为什么你和它不一样”，这是一个合理问题。教师需要有比“Because I’m the teacher”更好的答案。

## 别说ChatGPT不会评分

研究已经说明general-purpose LLM确实能够对student writing产生与human ratings有一定agreement的scores。Tate等人（2024）在多个secondary essay corpora上发现，ChatGPT的holistic scoring在特定prompt和数据条件下可以达到有实际意义的agreement，但human-human agreement总体仍更强，作者把更合理的应用边界主要放在low-stakes formative contexts。Shermis（2025）使用ChatGPT-4o重新测试essay与short constructed-response datasets时也发现，部分essay数据表现接近human agreement，但并不稳定，尤其short responses更弱。

所以正确问题不是“AI会不会评分”，而是：**一次AI grade是什么性质的证据？**

## “它给我Excellence”还缺很多信息

至少要问：用了哪个model和version？prompt是什么？有没有current standard、Conditions of Assessment、clarification和official exemplars？完整task context有没有提供？模型的judgement引用了学生文本里的什么具体evidence？

AI很容易写出“The response demonstrates sophisticated insight”。这句话本身不证明文章真的有sophisticated insight。最有用的动作，是要求AI把每一个criterion对应到student text中的exact evidence，再和official boundary exemplar比较。

教师或moderator的优势也不是“更会读英语”。正式judgement嵌在一个有current standard、exemplars、moderation、department calibration和appeal or review processes的系统里。个体教师仍然会错，这正是moderation存在的原因。

## NZQA使用AI，并不等于随手让聊天机器人做summative marking

NZQA用于Writing CAA的Automated Text Scoring经过purpose-specific training、large-scale piloting、controlled deployment和human safeguards。general-use AI不自动具备同样的validation与accountability条件（NZQA, 2026）。

Ministry当前GenAI guidance也把teacher responsibility、professional judgement、privacy和human oversight放在assessment use的中心（Ministry of Education, 2026）。

课堂上如果学生拿AI challenge grade，我会用五步：看完整prompt；检查它使用的authority是否current；要求criterion-by-criterion evidence mapping；和boundary exemplar比较；如果仍是合理边界争议，再找第二位qualified teacher moderation。不要继续问五个AI，直到得到最喜欢的答案。

## AI可能更适合做第二读者

Steiss等人（2024）比较trained human和ChatGPT writing feedback时发现，人类在多数反馈质量维度上总体更强，但AI仍可能在early drafts和低风险环境中提供有用、快速的反馈。

因此更强的问题不是“What grade is this?”，而是：“指出你对我这篇文章最不确定的一个criterion，并引用具体证据。”或者“找出你认为最弱的一个argument，并说明为什么。”

这把AI从final assessor改成一个可质疑的second reader。

还要注意privacy。student writing可能包含个人和敏感信息，不能因为“只是让AI看一眼”就忽略学校批准的工具和data policy。

AI时代，教师专业权威更可靠的版本不是“只有我能判断”，而是：我能指出我依据的standard和student evidence；我知道哪里是边界；不确定时愿意moderate；新证据证明我错了时会改grade。

## References

Ministry of Education. (2026). *Generative AI*. https://www.education.govt.nz/school/digital-technology/generative-ai

New Zealand Qualifications Authority. (2026). *AI marking and assessment [Official Information Act release OC02156].* https://www2.nzqa.govt.nz/about-us/official-information/oia/information-releases/

Shermis, M. D. (2025). Using ChatGPT to score essays and short-form constructed responses. *Assessing Writing, 66*, 100988. https://doi.org/10.1016/j.asw.2025.100988

Steiss, J., Tate, T., Graham, S., Cruz, J., Hebert, M., Wang, J., Moon, Y., Tseng, W., Warschauer, M., & Olson, C. B. (2024). Comparing the quality of human and ChatGPT feedback of students’ writing. *Learning and Instruction, 91*, 101894. https://doi.org/10.1016/j.learninstruc.2024.101894

Tate, T. P., Steiss, J., Bailey, D., Graham, S., Moon, Y., Ritchie, D., Tseng, W., & Warschauer, M. (2024). Can AI provide useful holistic essay scoring? *Computers and Education: Artificial Intelligence, 7*, 100255. https://doi.org/10.1016/j.caeai.2024.100255

## Evidence notes

- **Tate et al. (2024); Shermis (2025)**：支持“LLM并非完全不会评分”，也同时限制high-stakes外推。
- **NZQA (2026)**：支持purpose-built validated assessment system与general-use AI之间的制度区别。
