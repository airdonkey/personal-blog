# 完整更新包 - 自动翻译 + 内容更新

本更新包包含两个重要升级：
1. ✅ **自动翻译功能** - 只写中文，自动生成英文
2. ✅ **网站内容更新** - 真实背景替换暂填内容

---

## 🎯 核心改进：ADHD超级友好工作流

### 旧工作流（需要2个步骤）
```
1. 写 drafts/chinese.txt
2. 写 drafts/english.txt  ← 🤯 需要翻译，增加认知负担
3. 双击 "Publish-Article"
4. 双击 "Push-Online"
```

### 新工作流（只需1个步骤）
```
1. 写 drafts/chinese.txt  ← 只需要这一步！
2. 双击 "Publish-Article"（自动翻译+发布）
3. 双击 "Push-Online"
```

**你再也不需要自己翻译！Claude API会自动处理。**

---

## 📦 包含的文件

```
complete-update/
├── config.toml                    # 更新后的配置（邮箱、描述、标题）
├── publish-article.py             # 新版脚本（支持自动翻译）
├── content/
│   ├── about.zh.md               # 中文关于页面（真实背景）
│   ├── about.en.md               # 英文关于页面
│   ├── contact.zh.md             # 中文联系页面
│   └── contact.en.md             # 英文联系页面
└── layouts/
    ├── index.html                # 首页（更新描述）
    └── partials/
        └── sidebar.html          # 侧边栏（更新订阅文字）
```

---

## 🚀 安装步骤

### 步骤1：备份（保险起见）
```powershell
cd C:\Users\zhoup\Desktop
Copy-Item professional-blog professional-blog-backup-20250401 -Recurse
```

### 步骤2：解压并替换文件
1. 解压 `complete-update.zip`
2. 将所有文件复制到你的项目目录，覆盖旧文件：
   ```
   complete-update/
   └── 所有文件 → C:\Users\zhoup\Desktop\professional-blog\
   ```

### 步骤3：安装Python依赖（一次性）
打开PowerShell，运行：
```powershell
cd C:\Users\zhoup\Desktop\professional-blog
pip install anthropic --break-system-packages
```

### 步骤4：测试新工作流
1. 编辑 `drafts/chinese.txt`，写入测试内容：
   ```markdown
   # 这是测试文章

   测试自动翻译功能。如果你看到这篇文章的英文版本，说明一切正常。
   ```

2. 双击桌面 "Publish-Article"
3. 等待脚本完成（你会看到"🤖 正在调用Claude翻译..."）
4. 检查 `content/posts/` 目录，应该看到：
   - `test-article.zh.md`（中文）
   - `test-article.en.md`（英文，自动翻译）

5. 确认无误后，双击 "Push-Online"

---

## 🔄 新工作流详解

### 场景A：只写中文（推荐，99%的情况）
```
1. 编辑 drafts/chinese.txt
2. 双击 "Publish-Article"
   → 脚本检测到只有中文
   → 自动调用Claude API翻译
   → 生成 .zh.md 和 .en.md
3. 双击 "Push-Online"
```

### 场景B：手动提供英文（特殊情况）
```
如果你不信任AI翻译某篇特殊文章：
1. 编辑 drafts/chinese.txt（中文）
2. 编辑 drafts/english.txt（你自己的英文）
3. 双击 "Publish-Article"
   → 脚本检测到有english.txt
   → 跳过翻译，直接使用你的英文
4. 双击 "Push-Online"
```

**脚本很聪明：有english.txt就用，没有就自动翻译。**

---

## 📊 更新内容对比

### config.toml
| 项目 | 旧值 | 新值 |
|------|------|------|
| 邮箱 | `your.email@example.com` | `contact@zhoupenglong.com` |
| 中文标题 | 战略与技术 | 跨文化观察与学习 |
| 英文标题 | Strategy & Technology | Cross-Cultural Learning |
| 中文描述 | 战略咨询顾问 & 技术专家 | 教育工作者 & 天文学会执行秘书 |
| 英文描述 | Strategy Consultant & Technology Advisor | Educator & Executive Secretary of RASNZ |
| 社交链接 | LinkedIn/Twitter/GitHub | 已删除（未提供） |

### 关于页面
- 真实职业轨迹：德勤 → 信保 → 进出口银行 → 新西兰教师 → 天文学会
- 关注领域：跨文化观察、教育比较学、天文、地球科学
- 语气：客观、不夸张、不煽情

### 联系页面
- 简化为只有邮箱
- 列出相关话题（跨文化教育、天文科普、职业转型）
- 删除社交媒体链接

---

## 🤖 自动翻译技术细节

### 使用的模型
- `claude-sonnet-4-20250514`（Claude 4.5 Sonnet）
- 成本：极低（约0.003美元/千字）
- 速度：通常3-10秒

### 翻译质量保证
脚本会指示Claude：
1. 保持原文语气和风格
2. 保留Markdown格式
3. 使用恰当的专业术语
4. 保持段落结构

### 如果翻译失败？
1. 检查网络连接
2. 确认已安装 `anthropic` 库
3. 如果还是失败，手动创建 `english.txt` 作为备用

---

## ⚠️ 重要提示

### 1. 首次使用可能需要认证
如果脚本提示API错误，可能需要设置环境变量（通常不需要，因为你在用Claude.ai）。

### 2. 删除示例文章
现有的3篇示例文章（AI战略、数字化转型、产品vs平台）与新定位不符，建议删除：
```powershell
cd C:\Users\zhoup\Desktop\professional-blog\content\posts
Remove-Item *.zh.md
```

### 3. 翻译不满意？
直接创建 `drafts/english.txt` 并手动写英文，脚本会优先使用你的版本。

---

## 🎨 保持不变的部分

- ✅ 深海军蓝 + 古铜金配色
- ✅ 双语URL结构（/zh/ 和 /en/）
- ✅ 桌面快捷方式
- ✅ Git自动化工作流
- ✅ Cloudflare自动部署

---

## 🧪 测试清单

安装后请依次测试：

- [ ] 网站内容是否更新（访问 https://zhoupenglong.com/zh/about/）
- [ ] 邮箱链接是否正确（点击footer的Email链接）
- [ ] 写一篇测试文章，只提供chinese.txt
- [ ] 双击 "Publish-Article"，检查是否生成英文版
- [ ] 英文翻译质量是否满意
- [ ] 双击 "Push-Online"，检查是否成功部署

---

## 🆘 故障排查

### 问题1：Python找不到anthropic模块
```powershell
pip install anthropic --break-system-packages
```

### 问题2：翻译时提示API错误
- 检查网络连接
- 确认能访问claude.ai
- 如果问题持续，手动创建english.txt

### 问题3：文件覆盖后网站无法访问
1. 运行 `hugo server -D` 本地预览
2. 查看错误信息
3. 恢复备份：
   ```powershell
   cd C:\Users\zhoup\Desktop
   Remove-Item professional-blog -Recurse -Force
   Copy-Item professional-blog-backup-20250401 professional-blog -Recurse
   ```

---

## 📈 下一步建议

### 1. 删除示例内容
```powershell
cd C:\Users\zhoup\Desktop\professional-blog\content\posts
Remove-Item ai-strategy-paradox.zh.md
Remove-Item digital-transformation.zh.md
Remove-Item products-vs-platforms.zh.md
```

### 2. 写第一篇真实文章
建议主题（基于你的背景）：
- 从金融到教育：为什么离开？
- 中亚工作经历的跨文化观察
- 在新西兰皇家天文学会的工作是什么体验
- 三种教育体系的比较（中国/中亚/新西兰）

### 3. 优化翻译（可选）
如果发现翻译经常不满意某些专业术语，可以修改 `publish-article.py` 中的翻译提示词。

---

## 🎉 总结

你现在有了一个**真正的零决策点工作流**：

1. 打开 `drafts/chinese.txt`
2. 写内容（Markdown格式）
3. 保存
4. 双击桌面图标两次
5. 等待3分钟
6. 网站更新完成

**没有翻译压力，没有格式烦恼，没有部署焦虑。**

这就是为ADHD设计的完美博客系统。

---

有任何问题请随时反馈。祝写作愉快！ 🚀