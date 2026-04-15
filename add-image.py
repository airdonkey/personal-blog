#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Grand Tour 照片管理工具
用于添加地点照片到 countries.json
"""

import json
import os
import sys
from pathlib import Path

# 项目路径
PROJECT_ROOT = Path(__file__).parent
DATA_FILE = PROJECT_ROOT / "static" / "data" / "countries.json"
IMAGE_DIR = PROJECT_ROOT / "static" / "images" / "grand-tour" / "places"

def load_countries():
    """加载 countries.json"""
    if not DATA_FILE.exists():
        print(f"❌ 错误: 找不到 {DATA_FILE}")
        sys.exit(1)
    
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_countries(data):
    """保存 countries.json"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✓ 已保存到 {DATA_FILE}")

def list_places(data):
    """列出所有地点"""
    print("\n当前地点列表:")
    print("-" * 60)
    
    for idx, place in enumerate(data['places'], 1):
        name_zh = place.get('nameZh', '')
        name_en = place.get('name', '')
        has_image = '📷' if place.get('image') else '  '
        print(f"{idx:3}. {has_image} {name_zh} / {name_en}")
    
    print("-" * 60)
    print(f"共 {len(data['places'])} 个地点")

def find_place(data, query):
    """查找地点"""
    results = []
    query_lower = query.lower()
    
    for idx, place in enumerate(data['places']):
        name_zh = place.get('nameZh', '').lower()
        name_en = place.get('name', '').lower()
        city = place.get('city', '').lower()
        country_zh = place.get('countryZh', '').lower()
        country_en = place.get('country', '').lower()
        
        if (query_lower in name_zh or query_lower in name_en or 
            query_lower in city or query_lower in country_zh or 
            query_lower in country_en):
            results.append((idx, place))
    
    return results

def add_image_to_place():
    """添加照片到地点"""
    data = load_countries()
    
    print("\n" + "=" * 60)
    print("Grand Tour 照片管理工具")
    print("=" * 60)
    
    # 列出所有地点
    list_places(data)
    
    # 查找地点
    print("\n请输入地点名称（中文或英文）:")
    query = input("> ").strip()
    
    if not query:
        print("❌ 取消操作")
        return
    
    results = find_place(data, query)
    
    if not results:
        print(f"❌ 找不到匹配的地点: {query}")
        return
    
    if len(results) > 1:
        print(f"\n找到 {len(results)} 个匹配的地点:")
        for idx, (place_idx, place) in enumerate(results, 1):
            name_zh = place.get('nameZh', '')
            name_en = place.get('name', '')
            city = place.get('city', '')
            print(f"{idx}. {name_zh} / {name_en} ({city})")
        
        print("\n请选择编号:")
        try:
            choice = int(input("> ").strip())
            if 1 <= choice <= len(results):
                place_idx, place = results[choice - 1]
            else:
                print("❌ 无效的选择")
                return
        except ValueError:
            print("❌ 无效的输入")
            return
    else:
        place_idx, place = results[0]
    
    # 显示选中的地点
    print(f"\n选中地点: {place['nameZh']} / {place['name']}")
    print(f"城市: {place.get('city', 'N/A')}")
    print(f"当前照片: {place.get('image', '无')}")
    
    # 输入照片文件名
    print("\n请输入照片文件名（例如: colombo-airport.jpg）:")
    print(f"照片应放在: {IMAGE_DIR}")
    image_filename = input("> ").strip()
    
    if not image_filename:
        print("❌ 取消操作")
        return
    
    # 检查文件是否存在
    image_path = IMAGE_DIR / image_filename
    if not image_path.exists():
        print(f"⚠️  警告: 文件不存在: {image_path}")
        print("请确保照片已放在正确的目录")
        confirm = input("是否继续? (y/N): ").strip().lower()
        if confirm != 'y':
            return
    
    # 更新数据
    old_image = place.get('image', '无')
    place['image'] = f"/images/grand-tour/places/{image_filename}"
    data['places'][place_idx] = place
    
    # 保存
    save_countries(data)
    
    print("\n" + "=" * 60)
    print("✓ 照片已添加成功!")
    print("=" * 60)
    print(f"地点: {place['nameZh']} / {place['name']}")
    print(f"旧照片: {old_image}")
    print(f"新照片: {place['image']}")
    print("\n下一步:")
    print("1. 运行 hugo server -D 预览效果")
    print("2. 如果满意，运行 .\\publish.bat 推送到生产")

def main():
    """主函数"""
    try:
        add_image_to_place()
    except KeyboardInterrupt:
        print("\n\n❌ 操作已取消")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ 错误: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
