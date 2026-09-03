# 图片资源

- `profile.webp`：页面优先加载的头像，720 × 946。
- `profile.jpg`：不支持 WebP 时的头像后备文件，720 × 946。
- `brand/emblem-primary.svg`：浅色背景使用的“开放之方”标准版。
- `brand/emblem-reverse.svg`：深色页眉使用的反白标准版。
- `brand/emblem-monochrome.svg`：单色印章与压印版本。
- `brand/emblem-micro.svg`：小尺寸显示的光学校正版。
- `badge-96.webp` / `badge-96.png`：旧调用兼容文件，内容已同步为“开放之方”微型版。
- `social/home-zh.png`：中文首页社交分享图，1200 × 630。
- `social/home-en.png`：英文首页社交分享图，1200 × 630。
- `social/the-second-examination.png`：英文代表作社交分享图，1200 × 630。

浏览器图标、Apple Touch Icon 和 Android 图标均由 `brand/emblem-micro.svg` 生成；页眉直接调用反白标准版。替换头像时请同时更新 `profile.webp` 与 `profile.jpg`，保持相同裁切和尺寸。原始高分辨率文件不要直接放入 `static/`，以免 Hugo 将大文件复制到生产站点。

社交分享图必须保持 1200 × 630。文章可在 front matter 的 `images` 列表中指定独立图片；未指定时，网站按语言使用对应首页分享图。头像不再作为分享卡片后备图。
