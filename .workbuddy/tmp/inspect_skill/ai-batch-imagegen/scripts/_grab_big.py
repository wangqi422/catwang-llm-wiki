"""
扩大当前预览/历史最新图片的视野,点击大图并截下来。
"""
import asyncio, sys
from playwright.async_api import async_playwright

CDP = "http://127.0.0.1:9222"
SAVE_DIR = r"D:\WorkBuddy\codm-x-bh3"

async def grab(playwright, model, hash_url, out_name):
    browser = await playwright.chromium.connect_over_cdp(CDP)
    pages = [p for p in browser.contexts[0].pages if hash_url in p.url]
    if not pages:
        print(f"[{model}] ❌ 找不到 {hash_url} 的标签")
        return
    page = pages[0]
    print(f"[{model}] 已在 {page.url[:90]}")
    # 找中央预览大图(div.preview img) 或历史最新一张
    # 1) 先点中央预览(图比较大)
    try:
        big = page.locator("div[class*='preview'] img, div[class*='result'] img").first
        if await big.count() > 0:
            await big.click()
            await page.wait_for_timeout(1500)
            print(f"[{model}] 点击中央预览")
    except Exception as e:
        print(f"[{model}] 点击失败: {e}")
    await page.wait_for_timeout(500)
    out = f"{SAVE_DIR}\\{out_name}.png"
    await page.screenshot(path=out, full_page=False)
    print(f"[{model}] -> {out}")

async def main():
    async with async_playwright() as p:
        await grab(p, "openai", "/draw/openai", "big_openai")
        await grab(p, "gemini", "/draw/gemini", "big_gemini")

asyncio.run(main())
