# Professional Blog - Hugo Website

一个高设计感、专业商务风格的个人博客，使用深蓝+金铜色系，适合策略顾问、技术领导者等专业人士。

## 设计特点

### 色彩系统
- **主色调**: 深海军蓝 (#0A2540) - 沉稳、专业、值得信赖
- **强调色**: 古铜金 (#B8860B) - 高级感、成就导向
- **中性色**: 温暖灰背景 + 深灰文字 - 舒适的阅读体验

### 设计理念
- **现代专业主义**: 不同于艺术家风格的活泼，更适合商务专业人士
- **极简高端**: 大量留白、精致排版、考究细节
- **响应式设计**: 完美适配桌面、平板、手机

## 本地预览

### 安装 Hugo

**macOS:**
```bash
brew install hugo
```

**Windows:**
```bash
choco install hugo-extended
```

**Linux:**
```bash
sudo apt-get install hugo
```

### 运行本地服务器

```bash
cd professional-blog
hugo server -D
```

访问 `http://localhost:1313` 查看网站。

## 自定义配置

### 1. 修改个人信息

编辑 `config.toml`:

```toml
[params]
  author = "你的名字"
  description = "你的职位/描述"
  tagline = "你的标语"
  email = "your.email@example.com"
  linkedin = "https://linkedin.com/in/yourprofile"
  twitter = "https://twitter.com/yourhandle"
  github = "https://github.com/yourhandle"
```

### 2. 添加头像

将你的头像图片命名为 `profile.jpg`，放入 `static/images/` 目录。
建议尺寸: 300x300 像素，正方形。

### 3. 创建新文章

```bash
hugo new posts/my-new-article.md
```

文章格式:
```markdown
---
title: "文章标题"
date: 2025-03-15
tags: ["标签1", "标签2"]
---

文章内容...
```

## 部署到 Cloudflare Pages

### 方法一: 通过 GitHub (推荐)

1. **创建 GitHub 仓库**
   ```bash
   cd professional-blog
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-blog.git
   git push -u origin main
   ```

2. **连接 Cloudflare Pages**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 Pages → Create a project
   - 选择你的 GitHub 仓库
   - 构建设置:
     - **Build command**: `hugo --minify`
     - **Build output directory**: `public`
     - **Environment variables**: 
       - `HUGO_VERSION` = `0.121.0` (或最新版本)
   - 点击 "Save and Deploy"

3. **自定义域名** (可选)
   - 在 Cloudflare Pages 项目中，进入 "Custom domains"
   - 添加你的域名
   - 按照指引配置 DNS

### 方法二: 直接上传

1. **构建网站**
   ```bash
   hugo --minify
   ```

2. **上传到 Cloudflare Pages**
   - 使用 Wrangler CLI:
   ```bash
   npm install -g wrangler
   wrangler pages deploy public
   ```

## 邮件订阅功能

侧边栏的邮件订阅表单需要后端支持。推荐方案:

### 选项 1: Mailchimp (免费)
1. 注册 [Mailchimp](https://mailchimp.com)
2. 创建受众列表
3. 获取嵌入式表单代码
4. 替换 `layouts/partials/sidebar.html` 中的表单

### 选项 2: ConvertKit
专为创作者设计，界面更现代。

### 选项 3: Cloudflare Workers (技术方案)
使用 Cloudflare Workers 处理表单提交，存储到 KV 或 D1 数据库。

## 色彩自定义

如果你想调整配色方案，编辑 `static/css/style.css` 中的 CSS 变量:

```css
:root {
  /* 将深蓝改为深绿 */
  --navy-dark: #0D3B2E;
  
  /* 将古铜金改为深红 */
  --bronze: #8B0000;
}
```

其他建议的高端配色:

**方案 A: 墨绿 + 金色**
```css
--primary: #0D3B2E;
--accent: #D4AF37;
```

**方案 B: 深紫 + 银色**
```css
--primary: #2E1A47;
--accent: #C0C0C0;
```

**方案 C: 纯黑 + 电光蓝**
```css
--primary: #000000;
--accent: #00E5FF;
```

## 成本

- **Hugo**: 完全免费
- **GitHub**: 免费（公开仓库）
- **Cloudflare Pages**: 免费额度
  - 每月 500 次构建
  - 无限带宽
  - 免费 SSL
  - 完全够用于个人博客

**总成本: $0/月**（如果使用免费域名）

## 技术栈

- **静态网站生成器**: Hugo
- **代码托管**: GitHub
- **部署平台**: Cloudflare Pages
- **CDN**: Cloudflare (自动)
- **SSL**: Cloudflare (免费)

## 性能优化

网站已内置性能优化:
- ✅ 最小化 CSS
- ✅ 响应式图片
- ✅ 优化的字体加载
- ✅ Cloudflare CDN
- ✅ 自动 HTTPS

预期性能:
- **Lighthouse 分数**: 95+
- **首次加载**: < 1 秒
- **全球访问**: < 200ms (CDN)

## 许可

此模板可自由使用和修改。建议保留设计风格的一致性以保持专业感。

## 支持

如有问题，可以:
1. 查看 [Hugo 官方文档](https://gohugo.io/documentation/)
2. 查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
3. 在 GitHub Issues 中提问

---

**记住**: 好的个人网站不在于复杂的功能，而在于清晰的内容、专业的设计、和始终如一的更新。专注于写作高质量的内容，让设计为内容服务。
