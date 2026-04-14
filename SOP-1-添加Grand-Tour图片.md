# SOP #1: Grand Tour 地点添加图片

## 🎯 目标

为游历地点添加照片，使用ImageKit CDN自动优化。

---

## 📁 ImageKit文件夹结构

```
airdonkey/
├── grand-tour/      # 地图标记照片（与网站URL对应）
├── posts/           # 游记配图（未来使用）
└── static/          # 其他资源
```

---

## ✅ 操作流程（3步）

### Step 1: 上传照片到ImageKit

**Web界面（推荐）**:
```
1. 访问 https://imagekit.io/dashboard/media-library
2. 进入文件夹: grand-tour/
3. 点击 "Upload Files"
4. 选择照片上传
```

**文件命名规则**:
```
✅ colombo.jpg       # 小写，英文城市名
✅ bangkok.jpg
✅ new-york.jpg      # 空格用连字符

❌ Colombo.jpg       # 大写
❌ 科伦坡.jpg         # 中文
❌ colombo-airport.jpg  # 太具体
```

---

### Step 2: 验证上传

```
浏览器打开测试URL:
https://ik.imagekit.io/airdonkey/grand-tour/你的文件名.jpg

能看到照片 = 上传成功 ✅
```

---

### Step 3: 添加到countries.json

**方法A: 使用工具（推荐）**

```bash
python add-image.py

🔍 输入地点名称: Bangkok
✅ 找到地点: 曼谷 / Bangkok (泰国)
💡 建议文件名: bangkok.jpg
📸 输入图片文件名: bangkok.jpg
✅ 成功添加图片!
```

**方法B: 手动编辑**

打开 `static/data/countries.json`:

```json
{
  "name": "曼谷",
  "name_en": "Bangkok",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "show_on_map": true,
  "note": "泰国首都",
  "note_en": "Capital of Thailand",
  "marker_image": "bangkok.jpg"  // ← 添加这一行
}
```

---

## 🧪 测试

```bash
hugo server

# 访问 http://localhost:1313/grand-tour/
# 点击地点标记 → 应该看到照片
```

---

## 🌏 双语地图说明

### 关键设计

```json
{
  "name": "科伦坡",           // 中文显示
  "name_en": "Colombo",      // 英文显示
  "note": "人生第一次出国的转机地",
  "note_en": "First international flight transit",
  "marker_image": "colombo.jpg"  // 中英文共用
}
```

**原理**:
- 中文页面: 显示"科伦坡" + colombo.jpg
- 英文页面: 显示"Colombo" + colombo.jpg
- **同一张照片，不同的文字说明** ✅

**为什么不分中英文照片？**
- 照片本身语言无关（埃菲尔铁塔就是埃菲尔铁塔）
- 维护简单（只需管理一个字段）
- 节省存储（不重复上传）
- URL稳定（切换语言不换图片）

---

## 📊 ImageKit自动优化

### 你的操作

```
上传: colombo.jpg (原始大小，如1.5MB)
位置: grand-tour/
```

### ImageKit的工作

```
同一张照片，不同URL参数 = 不同输出:

地图缩略图:
?tr=w-400,q-80,f-auto → 约30KB

地图弹窗:
?tr=w-800,q-85,f-auto → 约80KB

大图显示:
?tr=w-1200,q-90,f-auto → 约150KB

自动格式转换:
→ Chrome用户: WebP格式
→ Safari新版: AVIF格式  
→ 老浏览器: JPEG格式
```

**结论**: 上传高质量原图，ImageKit自动优化！

---

## 💡 照片准备建议

### 上传前

```
尺寸: 1600-2400px宽（推荐）
格式: JPEG
质量: 可用TinyPNG轻度压缩一次
大小: 500KB-1MB（理想）
```

**不需要**：
- ❌ 压缩到很小（ImageKit会优化）
- ❌ 转换为WebP（ImageKit自动转）
- ❌ 裁剪成固定尺寸（URL参数控制）

---

## 📋 批量操作

### 查看未添加图片的地点

```bash
python add-image.py --batch

# 显示所有未添加图片的地点
# 包含建议文件名
```

### 批量上传（ImageKit CLI）

```bash
# 安装CLI
npm install -g imagekit-cli

# 初始化（首次）
imagekit init

# 批量上传
cd local-photos/
imagekit upload --folder grand-tour *.jpg
```

---

## ⏱️ 时间估算

- 首次添加（含学习）: 10分钟
- 日常添加（单张）: 2-3分钟
- 批量添加（10张）: 15分钟

---

## 🆘 常见问题

### Q: 照片要多大？

A: 上传1600px宽的原图即可，ImageKit自动优化

### Q: 需要压缩吗？

A: 不需要过度压缩，ImageKit会自动处理

### Q: 中英文用不同照片吗？

A: 不需要，同一张照片，只有文字说明双语

---

渐进式完成，不需要一次性做完所有地点！
