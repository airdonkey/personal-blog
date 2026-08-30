# 图片资源

- `profile.webp`：页面优先加载的头像，720 × 946。
- `profile.jpg`：不支持 WebP 时的头像后备文件，720 × 946。
- `badge-96.webp` / `badge-96.png`：页眉品牌标记。
- `social/home-zh.png`：中文首页社交分享图，1200 × 630。
- `social/home-en.png`：英文首页社交分享图，1200 × 630。
- `social/the-second-examination.png`：英文代表作社交分享图，1200 × 630。

替换头像时请同时更新 `profile.webp` 与 `profile.jpg`，保持相同裁切和尺寸。原始高分辨率文件不要直接放入 `static/`，以免 Hugo 将大文件复制到生产站点。

社交分享图必须保持 1200 × 630。文章可在 front matter 的 `images` 列表中指定独立图片；未指定时，网站按语言使用对应首页分享图。头像不再作为分享卡片后备图。
