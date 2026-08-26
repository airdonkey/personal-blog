# Zhou Penglong Personal Website

个人双语作者网站：[zhoupenglong.com](https://zhoupenglong.com)。网站围绕“无名者的自我建造”展开，以长篇写作、主题索引、实践经历和 Grand Tour 为主，不用于推广辅导业务。

## 内容架构

- **文章**：按时间保存全部文章，是网站的长期母本
- **主题**：用四个长期问题组织文章，避免按职业经历建立过多栏目
- **实践**：说明写作背后的真实工作、学习与公共事务经历
- **关于**：作者立场、人生轨迹与读者对象
- **Grand Tour**：保留为迁徙与跨文化经验的独立档案
- **联系**：从页脚进入，不占用主导航

网站以中文持续更新；英文只收录选择性翻译，不要求逐篇同步。

## 降低写作启动难度

- 四个长期主题已经各自包含主题导言和四个可继续追问的问题，因此即使尚无文章也不是空栏目。
- 可视化编辑器中的“固定页面”可以直接修改中文/英文个人简介、主题说明、实践页和联系页。
- 新建文章时，正文会自动带入“场景—核心判断—反面与边界—读者关联—文末问题”的写作骨架。
- “这篇只想说清的一句话”是作者工作字段，只用于聚焦，不会显示在公开网站上。
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
tags: ["教育", "天文"]
series: "self-building"
readerQuestion: "这篇文章希望邀请读者回答的问题。"
---
```

`series` 必须使用以下四个值之一：

- `self-building`
- `migration`
- `work-and-learning`
- `education-and-technology`

只有中文稿时也可以先发布中文文件；语言切换器会回到另一语言的首页，不会产生失效链接。

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
content/                    # 文章及静态页面内容
layouts/                    # 首页、文章、列表、About、Grand Tour templates
i18n/                       # 中英文界面文本
static/css/style.css        # 全站设计系统
static/css/grand-tour.css   # Grand Tour 样式
static/js/site.js           # 移动导航
static/js/grand-tour.js     # 按需加载的互动地图
data/countries.json         # Hugo 构建时使用的游历数据
static/data/countries.json  # 浏览器地图使用的同一份数据
static/images/profile.*     # 头像
assets/brand/               # 不直接发布的品牌源文件
```

编辑 Grand Tour 数据时，`data/countries.json` 与 `static/data/countries.json` 必须保持完全一致。

## 许可

© 2026 Zhou Penglong. All rights reserved.
