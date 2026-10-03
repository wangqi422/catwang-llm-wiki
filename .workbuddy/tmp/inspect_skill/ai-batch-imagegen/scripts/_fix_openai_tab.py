# -*- coding: utf-8 -*-
"""把 openai 标签切回画图页 (navigate), 确认在 draw/openai 路由。"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import common as C

cfg = C.load_cfg()
with sync_playwright() as pw:
    b = pw.chromium.connect_over_cdp(cfg["cdp"])
    for t in b.contexts[0].pages:
        url = t.url or ''
        if '3000.woa.com' in url and 'openai' in url:
            print(f"找到 openai 标签: {url[:100]}")
            # 强制 reload 清掉详情页 state
            print(f"  → reload 清掉详情页 state")
            t.reload(wait_until="domcontentloaded", timeout=30000)
            t.wait_for_timeout(3000)
            t.bring_to_front()
print("完成")
