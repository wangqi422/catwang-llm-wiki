# -*- coding: utf-8 -*-
'''一次性脚本: 在调试 Chrome 里开一个 openai 画图页标签'''
from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    b = pw.chromium.connect_over_cdp('http://127.0.0.1:9222')
    page = b.new_page()
    page.goto('https://3000.woa.com/ai/#/dashboard/draw/openai', wait_until='domcontentloaded', timeout=30000)
    page.wait_for_timeout(3000)
    print(f'[OK] openai 标签已开: {page.url}')
    # 列出当前所有 page
    for c in b.contexts:
        for p in c.pages:
            print(f'  - {p.url[:80]}')
