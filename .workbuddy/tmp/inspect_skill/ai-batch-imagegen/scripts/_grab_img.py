"""
升级版: 找中央预览图(所有可见 img, 取最合适的)
"""
import asyncio
from playwright.async_api import async_playwright

CDP = "http://127.0.0.1:9222"
SAVE_DIR = r"D:\WorkBuddy\codm-x-bh3"

async def shoot(playwright, model, hash_url, out_name):
    browser = await playwright.chromium.connect_over_cdp(CDP)
    pages = [p for p in browser.contexts[0].pages if hash_url in p.url]
    if not pages: print(f"[{model}] ❌"); return
    page = pages[0]
    print(f"[{model}] 已在 {page.url[:90]}")
    # 列出所有较大 img (按位置: 偏中部的)
    imgs = page.locator("img:visible")
    n = await imgs.count()
    print(f"[{model}] 找到 {n} 张可见 img")
    best = None
    for i in range(n):
        b = await imgs.nth(i).bounding_box()
        if b and b['width'] >= 300 and b['height'] >= 200:
            print(f"  img#{i} {int(b['width'])}x{int(b['height'])} @ ({int(b['x'])},{int(b['y'])})")
            if not best or b['width']*b['height'] > best['width']*best['height']:
                best = b
    if best:
        clip = {
            "x": max(0, best['x']-15),
            "y": max(0, best['y']-15),
            "width": min(2000, best['width']+30),
            "height": min(2000, best['height']+30),
        }
        out = f"{SAVE_DIR}\\{out_name}.png"
        await page.screenshot(path=out, clip=clip, timeout=20000)
        print(f"[{model}] 选最大图 {int(best['width'])}x{int(best['height'])} -> {out}")
    else:
        print(f"[{model}] 未找到大图")

async def main():
    async with async_playwright() as p:
        await shoot(p, "openai", "/draw/openai", "img_openai")

asyncio.run(main())
