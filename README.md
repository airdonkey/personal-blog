# Zhou Penglong Personal Website

🌐 **网站地址:** [https://zhoupenglong.com](https://zhoupenglong.com)

## 📖 简介

个人博客网站，记录跨文化观察与终身学习。

- 🌍 中英双语支持
- 🗺️ Grand Tour 游历功能（交互式地图）
- 📱 响应式设计

## 🛠️ 技术栈

- **框架:** Hugo 静态网站生成器
- **托管:** Cloudflare Pages
- **语言:** 中文 / English

## 🚀 本地开发

### 预览网站
```bash
hugo server -D
```

访问: http://localhost:1313

### 创建新文章

在 `content/posts/` 目录创建文件：

**中文版 (`your-article.zh.md`):**
```markdown
---
title: "文章标题"
date: 2026-04-15
tags: ["标签1", "标签2"]
---

文章内容...
```

**英文版 (`your-article.en.md`):**
```markdown
---
title: "Article Title"
date: 2026-04-15
tags: ["tag1", "tag2"]
---

Article content...
```

## 📦 部署

### 推送到 GitHub
```bash
.\publish.bat
```

Cloudflare Pages 会自动构建并部署（约2-3分钟）。

## 🗺️ Grand Tour 功能

交互式地图展示访问过的42个国家和特色地点。

### 添加地图照片
```bash
python add-image.py
```

详见: `SOP-1-添加Grand-Tour图片.md`

## 📁 项目结构

```
professional-blog/
├── content/          # 页面内容
│   ├── posts/       # 文章
│   ├── about.*      # 关于页面
│   ├── contact.*    # 联系页面
│   └── grand-tour.* # 游历页面
├── layouts/         # 布局模板
├── static/          # 静态资源
│   ├── css/         # 样式表
│   ├── images/      # 图片
│   └── data/        # 数据文件
├── i18n/            # 国际化配置
└── config.toml      # 网站配置
```

## 🎨 自定义

### 修改网站信息
编辑 `config.toml`:
```toml
[languages.zh.params]
  author = "你的名字"
  description = "你的描述"
```

### 修改样式
编辑 `static/css/style.css`

## 📝 许可

© 2026 Zhou Penglong. All rights reserved.
