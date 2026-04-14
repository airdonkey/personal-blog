#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Grand Tour 图片添加工具
用于将图片信息添加到countries.json
"""

import json
import os
import sys
import re

# 配置
COUNTRIES_JSON = "static/data/countries.json"

def load_countries():
    """加载countries.json"""
    with open(COUNTRIES_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_countries(data):
    """保存countries.json"""
    with open(COUNTRIES_JSON, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def search_place(countries_data, query):
    """搜索地点"""
    query_lower = query.lower()
    matches = []
    
    for country in countries_data:
        # 搜索cities
        for city in country.get('cities', []):
            name_match = query_lower in city.get('name', '').lower()
            name_en_match = query_lower in city.get('name_en', '').lower()
            
            if name_match or name_en_match:
                matches.append({
                    'type': 'city',
                    'place': city,
                    'country': country,
                    'display_name': f"{city.get('name')} / {city.get('name_en')} ({country.get('country')})"
                })
        
        # 搜索featured_places
        for place in country.get('featured_places', []):
            name_match = query_lower in place.get('name', '').lower()
            name_en_match = query_lower in place.get('name_en', '').lower()
            
            if name_match or name_en_match:
                matches.append({
                    'type': 'featured_place',
                    'place': place,
                    'country': country,
                    'display_name': f"⭐ {place.get('name')} / {place.get('name_en')} ({country.get('country')})"
                })
    
    return matches

def add_image_to_place(countries_data, match, image_filename):
    """为地点添加图片"""
    match['place']['marker_image'] = image_filename
    return countries_data

def clean_filename(name):
    """清理文件名"""
    # 转小写
    name = name.lower()
    # 替换空格为连字符
    name = name.replace(' ', '-')
    # 只保留字母、数字、连字符
    name = re.sub(r'[^a-z0-9-]', '', name)
    # 移除多余的连字符
    name = re.sub(r'-+', '-', name)
    name = name.strip('-')
    return name

def interactive_add():
    """交互式添加图片"""
    print("=" * 60)
    print("Grand Tour 图片添加工具")
    print("=" * 60)
    
    # 加载数据
    try:
        countries_data = load_countries()
    except FileNotFoundError:
        print(f"\n错误：未找到 {COUNTRIES_JSON}")
        return
    
    # 搜索地点
    query = input("\n🔍 输入地点名称（中文或英文）: ").strip()
    if not query:
        print("已取消")
        return
    
    matches = search_place(countries_data, query)
    
    if not matches:
        print(f"\n❌ 未找到匹配的地点: {query}")
        return
    
    # 显示搜索结果
    if len(matches) == 1:
        selected = matches[0]
        print(f"\n✅ 找到地点: {selected['display_name']}")
    else:
        print(f"\n找到 {len(matches)} 个匹配结果:\n")
        for idx, match in enumerate(matches, 1):
            print(f"  {idx}. {match['display_name']}")
        
        try:
            choice = input("\n选择 (输入序号): ").strip()
            idx = int(choice) - 1
            if 0 <= idx < len(matches):
                selected = matches[idx]
            else:
                print("无效选择")
                return
        except ValueError:
            print("无效输入")
            return
    
    # 检查是否已有图片
    current_image = selected['place'].get('marker_image')
    if current_image:
        print(f"\n⚠️  该地点已有图片: {current_image}")
        replace = input("是否替换? (y/n): ").strip().lower()
        if replace != 'y':
            print("已取消")
            return
    
    # 建议文件名
    suggested_name = clean_filename(selected['place'].get('name_en', '')) + '.jpg'
    print(f"\n💡 建议文件名: {suggested_name}")
    print("   格式要求: 小写字母、连字符、.jpg后缀")
    print("   示例: colombo.jpg, new-york.jpg")
    
    # 输入文件名
    image_filename = input("\n📸 输入图片文件名 (直接回车使用建议): ").strip()
    if not image_filename:
        image_filename = suggested_name
    
    # 验证文件名格式
    if not image_filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        print("\n⚠️  警告：文件名应该以 .jpg 结尾")
        confirm = input("继续? (y/n): ").strip().lower()
        if confirm != 'y':
            return
    
    # 添加图片
    countries_data = add_image_to_place(countries_data, selected, image_filename)
    
    # 保存
    try:
        save_countries(countries_data)
        print(f"\n✅ 成功添加图片!")
        print(f"   地点: {selected['display_name']}")
        print(f"   图片: {image_filename}")
        print(f"\n💾 已保存到 {COUNTRIES_JSON}")
        print(f"\n🔗 ImageKit URL:")
        print(f"   https://ik.imagekit.io/airdonkey/grand-tour/{image_filename}")
    except Exception as e:
        print(f"\n❌ 保存失败: {e}")

def batch_suggest():
    """批量建议：列出所有没有图片的地点"""
    print("=" * 60)
    print("批量建议：未添加图片的地点")
    print("=" * 60)
    
    try:
        countries_data = load_countries()
    except FileNotFoundError:
        print(f"\n错误：未找到 {COUNTRIES_JSON}")
        return
    
    no_image_places = []
    
    for country in countries_data:
        # 检查cities
        for city in country.get('cities', []):
            if not city.get('marker_image'):
                no_image_places.append({
                    'name': city.get('name_en', city.get('name')),
                    'country': country.get('country_en', country.get('country')),
                    'suggested_filename': clean_filename(city.get('name_en', '')) + '.jpg'
                })
        
        # 检查featured_places
        for place in country.get('featured_places', []):
            if not place.get('marker_image'):
                no_image_places.append({
                    'name': place.get('name_en', place.get('name')),
                    'country': country.get('country_en', country.get('country')),
                    'suggested_filename': clean_filename(place.get('name_en', '')) + '.jpg'
                })
    
    if not no_image_places:
        print("\n🎉 所有地点都已添加图片！")
        return
    
    print(f"\n找到 {len(no_image_places)} 个地点未添加图片:\n")
    
    for idx, place in enumerate(no_image_places[:20], 1):  # 只显示前20个
        print(f"{idx:3d}. {place['name']:30s} ({place['country']:20s}) → {place['suggested_filename']}")
    
    if len(no_image_places) > 20:
        print(f"\n... 还有 {len(no_image_places) - 20} 个地点")
    
    print(f"\n建议：运行 python add-image.py 逐个添加")

def main():
    """主函数"""
    if len(sys.argv) > 1 and sys.argv[1] == '--batch':
        batch_suggest()
    else:
        interactive_add()

if __name__ == "__main__":
    main()
