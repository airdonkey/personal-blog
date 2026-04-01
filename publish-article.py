#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hugo 双语文章自动发布脚本
用法：将中英文内容放入 drafts 文件夹，运行此脚本
"""

import os
import re
from datetime import datetime
import shutil

# 配置
DRAFTS_DIR = "drafts"
POSTS_DIR = "content/posts"

def clean_filename(text):
    """从标题生成干净的文件名"""
    # 移除特殊字符，只保留字母、数字、中文
    text = re.sub(r'[^\w\s\u4e00-\u9fff-]', '', text)
    # 转换为小写
    text = text.lower()
    # 空格替换为连字符
    text = re.sub(r'\s+', '-', text)
    # 移除多余的连字符
    text = re.sub(r'-+', '-', text)
    # 截断到合理长度
    if len(text) > 50:
        text = text[:50]
    return text.strip('-')

def extract_title(content):
    """从内容中提取第一个标题"""
    lines = content.strip().split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith('# '):
            return line[2:].strip()
        elif line and not line.startswith('---'):
            # 如果没有 # 标题，用第一行非空内容
            return line.strip()
    return "Untitled"

def create_frontmatter(title, tags=None):
    """生成 Hugo frontmatter"""
    if tags is None:
        tags = []
    
    date = datetime.now().strftime("%Y-%m-%d")
    
    frontmatter = f"""---
title: "{title}"
date: {date}
tags: {tags if tags else []}
---

"""
    return frontmatter

def process_draft(filepath, language):
    """处理单个草稿文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取标题
    title = extract_title(content)
    
    # 如果内容已经有 frontmatter，跳过
    if content.strip().startswith('---'):
        print(f"  ✓ {filepath} 已包含 frontmatter，直接使用")
        return content, title
    
    # 添加 frontmatter
    frontmatter = create_frontmatter(title)
    full_content = frontmatter + content
    
    print(f"  ✓ 为 {filepath} 添加 frontmatter")
    return full_content, title

def find_draft_pairs():
    """查找成对的中英文草稿"""
    if not os.path.exists(DRAFTS_DIR):
        os.makedirs(DRAFTS_DIR)
        print(f"已创建 {DRAFTS_DIR} 目录")
        print("请将中英文草稿文件放入此目录：")
        print("  - chinese.txt (中文内容)")
        print("  - english.txt (英文内容)")
        return []
    
    files = os.listdir(DRAFTS_DIR)
    
    # 查找成对文件
    pairs = []
    
    # 方法 1：查找明确的 chinese/english 配对
    if 'chinese.txt' in files and 'english.txt' in files:
        pairs.append({
            'zh': os.path.join(DRAFTS_DIR, 'chinese.txt'),
            'en': os.path.join(DRAFTS_DIR, 'english.txt')
        })
    
    # 方法 2：查找 xxx-zh.txt 和 xxx-en.txt 配对
    basenames = {}
    for f in files:
        if f.endswith('-zh.txt'):
            base = f[:-7]  # 移除 '-zh.txt'
            if base not in basenames:
                basenames[base] = {}
            basenames[base]['zh'] = os.path.join(DRAFTS_DIR, f)
        elif f.endswith('-en.txt'):
            base = f[:-7]  # 移除 '-en.txt'
            if base not in basenames:
                basenames[base] = {}
            basenames[base]['en'] = os.path.join(DRAFTS_DIR, f)
    
    for base, pair in basenames.items():
        if 'zh' in pair and 'en' in pair:
            pairs.append(pair)
    
    return pairs

def publish_article(zh_file, en_file):
    """发布一对中英文文章"""
    print(f"\n处理文章配对：")
    print(f"  中文: {zh_file}")
    print(f"  英文: {en_file}")
    
    # 处理中文
    zh_content, zh_title = process_draft(zh_file, 'zh')
    
    # 处理英文
    en_content, en_title = process_draft(en_file, 'en')
    
    # 生成文件名（基于中文标题，确保 URL 友好）
    # 优先使用英文标题生成 URL，如果没有则用中文拼音
    filename_base = clean_filename(en_title)
    if not filename_base or len(filename_base) < 3:
        filename_base = clean_filename(zh_title)
    
    if not filename_base:
        filename_base = f"article-{datetime.now().strftime('%Y%m%d')}"
    
    # 确保 posts 目录存在
    os.makedirs(POSTS_DIR, exist_ok=True)
    
    # 生成最终文件路径
    zh_post = os.path.join(POSTS_DIR, f"{filename_base}.zh.md")
    en_post = os.path.join(POSTS_DIR, f"{filename_base}.en.md")
    
    # 写入文件
    with open(zh_post, 'w', encoding='utf-8') as f:
        f.write(zh_content)
    print(f"  ✓ 已创建: {zh_post}")
    
    with open(en_post, 'w', encoding='utf-8') as f:
        f.write(en_content)
    print(f"  ✓ 已创建: {en_post}")
    
    return filename_base

def main():
    print("=" * 60)
    print("Hugo 双语文章自动发布工具")
    print("=" * 60)
    
    # 查找草稿配对
    pairs = find_draft_pairs()
    
    if not pairs:
        print("\n未找到草稿文件！")
        print("\n请在 drafts/ 目录中放入以下文件：")
        print("  chinese.txt  - 中文内容")
        print("  english.txt  - 英文内容")
        print("\n或使用命名格式：")
        print("  my-article-zh.txt")
        print("  my-article-en.txt")
        return
    
    print(f"\n找到 {len(pairs)} 对文章")
    
    published = []
    for pair in pairs:
        filename = publish_article(pair['zh'], pair['en'])
        published.append(filename)
    
    print("\n" + "=" * 60)
    print("✓ 发布完成！")
    print("=" * 60)
    print(f"\n已发布 {len(published)} 篇文章：")
    for name in published:
        print(f"  • {name}")
    
    print("\n下一步：")
    print("  1. 预览: hugo server -D")
    print("  2. 访问: http://localhost:1313")
    print("  3. 满意后运行: publish.bat")
    
    # 询问是否清理草稿
    print("\n是否删除 drafts/ 中的源文件？")
    response = input("输入 y 删除，其他键保留: ").strip().lower()
    if response == 'y':
        for pair in pairs:
            if os.path.exists(pair['zh']):
                os.remove(pair['zh'])
                print(f"  已删除: {pair['zh']}")
            if os.path.exists(pair['en']):
                os.remove(pair['en'])
                print(f"  已删除: {pair['en']}")
        print("✓ 草稿已清理")
    else:
        print("✓ 草稿已保留")

if __name__ == "__main__":
    main()
