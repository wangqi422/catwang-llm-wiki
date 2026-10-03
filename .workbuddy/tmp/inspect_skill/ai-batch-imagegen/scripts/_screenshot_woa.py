# -*- coding: utf-8 -*-
'''截图两个 woa 标签, 给用户看试水效果 (带重试)'''
import os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright

OUT = r'D:\WorkBuddy\codm-x-bh3'

with sync_playwright() as pw:
    b = pw.chromium.connect_over_cdp('http://127.0.0.1:9222')
    for c in b.contexts:
        for p in c.pages:
            url = p.url
            if '3000.woa.com' not in url:
                continue
            if '/gemini' in url:
                tag = 'gemini'
            elif '/openai' in url:
                tag = 'openai'
            else:
                continue
            print(f'[{tag}] 截图准备: {url[:80]}')
            out_path = os.path.join(OUT, f'preview_{tag}.png')
            # 重试 3 次, 每次都等
            for attempt in range(3):
                try:
                    p.wait_for_load_state('domcontentloaded', timeout=10000)
                    time.sleep(3)
                    p.screenshot(path=out_path, full_page=True, timeout=60000)
                    print(f'  -> 保存: {out_path}  ({os.path.getsize(out_path)//1024} KB)')
                    break
                except Exception as e:
                    print(f'  -> 尝试 {attempt+1} 失败: {str(e)[:80]}')
                    time.sleep(5)
            else:
                print(f'  -> 放弃, 3 次都失败')
    print('=== 截图完成 ===')
