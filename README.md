# Zhou Penglong Personal Website

个人双语作者网站：[zhoupenglong.com](https://zhoupenglong.com)。网站围绕“无名者的自我建造”展开，以长篇写作、主题索引、实践经历和 Grand Tour 为主，不用于推广辅导业务。

## 内容架构

- **主文**：完整论述，每篇只进入一个长期母题，是专业判断的长期母本
- **来时路**：按人生阶段保存家庭、求学、职业、迁徙与安家的个人生活史
- **小径**：读书、影像、天文、地图与日常兴趣留下的短札记
- **话题**：一组固定、双语、最多选两个的横向标签，连接主文与小径
- **主题**：用四个长期问题组织文章，避免按职业经历建立过多栏目
- **实践**：说明写作背后的真实工作、学习与公共事务经历
- **关于**：作者立场、人生轨迹与读者对象
- **Grand Tour**：以“旅程”为基本单位，逐步补入路线、照片故事与游记；地图和地名是索引
- **联系**：从页脚进入，不占用主导航

网站以中文持续更新；英文只收录选择性翻译，不要求逐篇同步。

发布时如何在四条路径中选择、公开工作稿与私人草稿如何区分、标签何时留空，以及 Grand Tour 如何从一条记录逐步长成照片游记，统一写在 [`CONTENT_SYSTEM.md`](CONTENT_SYSTEM.md)。后台具体从哪里修改每一类文字，见 [`CMS_EDITING_GUIDE.md`](CMS_EDITING_GUIDE.md)。

## 降低写作启动难度

- 四个长期主题已经各自包含主题导言和四个可继续追问的问题，因此即使尚无文章也不是空栏目。
- 可视化编辑器中的“网站可见文字”集中管理首页身份文案、栏目导言、母题、人生阶段、标签、Grand Tour 地点，以及中英文导航、按钮和提示语。
- “固定页面”可以直接修改中文/英文个人简介、主题说明、实践页、联系页和 Grand Tour 总说明；页面标题也可直接修改。
- 新建文章时，正文会自动带入“场景—核心判断—反面与边界—读者关联—文末问题”的写作骨架。
- 新建来时路时，后台只要求选择人生阶段和阶段内顺序；每篇围绕一个现场、一段回看和一个待补证据继续生长。
- 新建小径时，只需记录触发念头的细节，以及它向前引出的一步联想。
- 新建旅程时，可以先只填年份、路线和“为什么值得记住”；主图、相册与长游记都可稍后补充。
- “这篇只想说清的一句话”是作者工作字段，只用于聚焦，不会显示在公开网站上。
- `draft: false` 与 `status: working` 组成公开工作稿；每篇只显示一个 `nextStep`，避免下次打开时重新规划全文。
- 中文个人简介同时包含首页短版和关于页长版；修改一次即可分别用于两个位置。

## 技术与版本

- Hugo `0.165.0`
- 自定义 Hugo templates（不依赖外部 theme）
- GitHub 版本管理
- Cloudflare Pages 构建与托管
- 中文路径 `/zh/`，英文路径 `/en/`

## 本地预览

先确认 Git 与 Hugo 已安装：

```bash
git --version
hugo version
```

启动本地预览：

```bash
hugo server -D
```

浏览器打开 `http://localhost:1313/zh/`。提交前运行生产构建：

```bash
hugo --gc --minify
```

生成的 `public/` 已被 `.gitignore` 忽略，不应提交。

## 新文章

中英文版本放在 `content/posts/`，文件主名相同、语言后缀不同：

```text
content/posts/20260819-example.zh.md
content/posts/20260819-example.en.md
```

Front matter 示例：

```yaml
---
title: "文章标题"
date: 2026-08-19
description: "用于列表页和搜索结果的简短说明。"
tags: ["education", "astronomy"]
series: "self-building"
featured: false
status: "working"
nextStep: "下一次只补入的一件事。"
readerQuestion: "这篇文章希望邀请读者回答的问题。"
---
```

`series` 必须使用以下四个值之一：

- `self-building`
- `migration`
- `work-and-learning`
- `education-and-technology`

只有中文稿时也可以先发布中文文件；语言切换器会回到另一语言的首页，不会产生失效链接。

来时路放在 `content/memoir/`；小径放在 `content/notes/`；旅程放在 `content/journeys/`。日常发布建议直接使用 Pages CMS，后台已经把标签限制为固定词表和最多两个，并为四类内容分别提供写作骨架。

## 安全更新流程

每次修改都从最新 `main` 建立独立分支：

```bash
git switch main
git pull --ff-only origin main
git switch -c content/short-description
hugo server -D
hugo --gc --minify
git status --short
git add path/to/changed-file
git commit -m "Update article title"
git push -u origin content/short-description
```

然后在 GitHub 创建 Pull Request，检查文件变化后合并到 `main`。Cloudflare Pages 只需监听 `main`，合并后会自动部署。

Windows 用户也可运行 `publish.bat`。脚本会先构建、显示待提交文件并要求确认；在非 `main` 分支运行时，它只推送分支，不会直接发布生产站点。

## Cloudflare Pages 设置

在 Cloudflare Dashboard 的 Pages 项目中确认：

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |
| Root directory | 留空 |
| Environment variable | `HUGO_VERSION=0.165.0` |

建议在 Production 和 Preview 两个环境都设置同一个 `HUGO_VERSION`。

## 主要文件

```text
config.toml                 # 双语站点配置与导航
.pages.yml                  # Pages CMS 后台字段与防误操作规则
CMS_EDITING_GUIDE.md        # 后台修改入口速查
content/                    # 文章及静态页面内容
layouts/                    # 首页、文章、列表、About、Grand Tour templates
i18n/                       # 中英文界面文本
static/css/style.css        # 全站设计系统
static/css/grand-tour.css   # Grand Tour 样式
static/js/site.js           # 移动导航
static/js/grand-tour.js     # 按需加载的互动地图
data/countries.json         # Hugo 构建时使用的游历数据
data/site_identity.toml     # 后台可改的作者身份与首页主文案
static/images/profile.*     # 头像
static/images/travel/       # Grand Tour 网页衍生图（不保存原片）
assets/brand/               # 不直接发布的品牌源文件
```

Grand Tour 的浏览器地图由 Hugo 在构建时从 `data/countries.json` 自动生成 JSON，因此只维护这一份数据。

## 许可

© 2026 Zhou Penglong. All rights reserved.
