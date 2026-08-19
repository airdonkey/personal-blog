# 图片资源

- `profile.webp`：页面优先加载的头像，720 × 946。
- `profile.jpg`：不支持 WebP 时的头像后备文件，720 × 946。
- `badge-96.webp` / `badge-96.png`：页眉品牌标记。

替换头像时请同时更新 `profile.webp` 与 `profile.jpg`，保持相同裁切和尺寸。原始高分辨率文件不要直接放入 `static/`，以免 Hugo 将大文件复制到生产站点。
