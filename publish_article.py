#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hugo 双语文章自动发布脚本
"""

import os
import re
from datetime import datetime

DRAFTS_DIR = "drafts"
POSTS_DIR = "content/posts"

def clean_filename(text):
    """从标题生成文件名"""
    text = re.sub(r'[^\w\s\u4e00-\u9fff-]', '', text)
    text = text.lower()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'-+', '-', text)
    if len(text) > 50:
        text = text[:50]
    return text.strip('-')

def extract_title(content):
    """提取标题"""
    lines = content.strip().split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith('# '):
            return line[2:].strip()
        elif line and not line.startswith('---'):
            return line.strip()
    return "Untitled"

def create_frontmatter(title):
    """生成frontmatter"""
    date = datetime.now().strftime("%Y-%m-%d")
    return f"""---
title: "{title}"
date: {date}
tags: []
---

"""

def process_draft(filepath):
    """处理草稿"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    title = extract_title(content)
    
    if content.strip().startswith('---'):
        return content, title
    
    return create_frontmatter(title) + content, title

def main():
    print("=" * 60)
    print("Hugo 双语文章发布工具")
    print("=" * 60)
    
    zh_file = os.path.join(DRAFTS_DIR, 'chinese.txt')
    en_file = os.path.join(DRAFTS_DIR, 'english.txt')
    
    if not os.path.exists(zh_file):
        print(f"\n错误：未找到 {zh_file}")
        return
    
    if not os.path.exists(en_file):
        print(f"\n错误：未找到 {en_file}")
        print("请先翻译并创建英文版本")
        return
    
    print(f"\n处理中...")
    print(f"  中文: {zh_file}")
    print(f"  英文: {en_file}")
    
    zh_content, zh_title = process_draft(zh_file)
    en_content, en_title = process_draft(en_file)
    
    filename_base = clean_filename(en_title)
    if not filename_base or len(filename_base) < 3:
        filename_base = clean_filename(zh_title)
    if not filename_base:
        filename_base = f"article-{datetime.now().strftime('%Y%m%d')}"
    
    os.makedirs(POSTS_DIR, exist_ok=True)
    
    zh_post = os.path.join(POSTS_DIR, f"{filename_base}.zh.md")
    en_post = os.path.join(POSTS_DIR, f"{filename_base}.en.md")
    
    with open(zh_post, 'w', encoding='utf-8') as f:
        f.write(zh_content)
    print(f"  ✓ 已创建: {zh_post}")
    
    with open(en_post, 'w', encoding='utf-8') as f:
        f.write(en_content)
    print(f"  ✓ 已创建: {en_post}")
    
    print("\n" + "=" * 60)
    print("✓ 完成")
    print("=" * 60)
    print(f"\n已发布: {filename_base}")
    print("\n下一步: 运行 publish.bat 推送到GitHub")
    
    response = input("\n删除草稿? (y/n): ").strip().lower()
    if response == 'y':
        os.remove(zh_file)
        os.remove(en_file)
        print("✓ 草稿已删除")

if __name__ == "__main__":
    main()