"""
列出 openai 页所有 img 详细信息
"""
import asyncio
from playwright.async_api import async_playwright

CDP = "http://127.0.0.1:9222"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.connect_over_cdp(CDP)
        pages = [pg for pg in browser.contexts[0].pages if "/draw/openai" in pg.url]
        if not pages: print("❌"); return
        page = pages[0]
        # 拿到所有 img 元素的信息
        imgs = page.locator("img")
        n = await imgs.count()
        print(f"共 {n} 张")
        for i in range(n):
            try:
                b = await imgs.nth(i).bounding_box()
                if not b: continue
                src = await imgs.nth(i).get_attribute("src")
                alt = await imgs.nth(i).get_attribute("alt") or ""
                if b['width'] > 100 or b['height'] > 100:
                    print(f"#{i} {int(b['width'])}x{int(b['height'])} @ ({int(b['x'])},{int(b['y'])}) alt={alt[:30]} src={src[:80] if src else ''}")
            except: pass

asyncio.run(main())
