# -*- coding: utf-8 -*-
"""成图回收 — 在浏览器内对成图 <img> 元素做 element.screenshot() 绕过防盗链。
(成图的 http url 直接下载会拿到登录 HTML, 必须截图)
用法:
  python collect.py woa gemini 30   # 回收 3000 gemini 页右侧最近 30 张
  python collect.py mj 40           # 回收 MJ 页最近 40 张
"""
import os, sys, time
from datetime import datetime
from playwright.sync_api import sync_playwright
import common as C


def collect_woa(page, model, n, outdir, log):
    cnt = page.evaluate("""(N)=>{const cs=[];document.querySelectorAll('img').forEach(im=>{const s=im.src||'',r=im.getBoundingClientRect();if(s.startsWith('http')&&r.x>560&&r.width>180&&r.height>120)cs.push({im,y:r.y,x:r.x});});cs.sort((a,b)=>a.y-b.y||a.x-b.x);const seen=new Set();let i=0;for(const c of cs){if(seen.has(c.im.src))continue;seen.add(c.im.src);i++;c.im.setAttribute('data-col',i);if(i>=N)break;}return i;}""", n)
    got = 0
    for i in range(1, cnt + 1):
        el = page.query_selector(f"img[data-col='{i}']")
        if el:
            try:
                el.scroll_into_view_if_needed(timeout=3000); time.sleep(0.3)
                el.screenshot(path=os.path.join(outdir, f"woa_{model}_{datetime.now():%H%M%S}_{i}.png"))
                got += 1
            except Exception:
                pass
    log(f"[woa/{model}] 回收 {got} 张 -> {outdir}")


def collect_mj(page, n, outdir, log):
    cnt = page.evaluate("""(N)=>{const cs=[];document.querySelectorAll('img').forEach(im=>{const s=im.src||'',r=im.getBoundingClientRect();if(s.includes('cdn.midjourney')&&r.width>150)cs.push({im,y:r.y});});cs.sort((a,b)=>b.y-a.y);let i=0;for(const c of cs){i++;c.im.setAttribute('data-col',i);if(i>=N)break;}return i;}""", n)
    got = 0
    for i in range(1, cnt + 1):
        el = page.query_selector(f"img[data-col='{i}']")
        if el:
            try:
                el.scroll_into_view_if_needed(timeout=3000); time.sleep(0.3)
                el.screenshot(path=os.path.join(outdir, f"mj_{datetime.now():%H%M%S}_{i}.png"))
                got += 1
            except Exception:
                pass
    log(f"[mj] 回收 {got} 张 -> {outdir}")


def main():
    cfg = C.load_cfg()
    out = os.path.join(cfg["output_dir"], "collected"); os.makedirs(out, exist_ok=True)
    log = C.logger(os.path.join(cfg["output_dir"], "collect.log"))
    args = sys.argv[1:]
    plat = args[0] if args else "woa"
    with sync_playwright() as pw:
        b = pw.chromium.connect_over_cdp(cfg["cdp"])
        if plat == "woa":
            model = args[1] if len(args) > 1 else "gemini"
            n = int(args[2]) if len(args) > 2 else 30
            page = C.find_page(b, "3000.woa.com", model)
            if not page:
                log(f"找不到 woa {model} 页"); return
            page.bring_to_front(); time.sleep(2)
            collect_woa(page, model, n, out, log)
        else:
            n = int(args[1]) if len(args) > 1 else 40
            page = C.find_page(b, "alpha.midjourney.com")
            if not page:
                log("找不到 MJ 页"); return
            page.bring_to_front(); time.sleep(2)
            collect_mj(page, n, out, log)


if __name__ == "__main__":
    main()
