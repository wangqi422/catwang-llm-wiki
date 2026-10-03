# -*- coding: utf-8 -*-
"""Midjourney (alpha.midjourney.com) 纯文本批量生图 — 无限循环。
- 默认 Relax 模式(免费无限); 检测到 "run out of Fast hours" 自动 reload+切 Relax
- 每条核心提示词 × config 里的 versions(默认 v6/v7/v8.1, 不含需 --fast 的 v8.0)
- 横版比例来自 components.yaml 的 aspect_pool
- 停止: STOP 文件 或 stop_at 时刻
用法: python run_mj.py
"""
import os, sys, time
from playwright.sync_api import sync_playwright
import common as C

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from prompt_engine import PromptEngine

INPUT = "#desktop_input_bar"
ALPHA = "alpha.midjourney.com"


def healthy(p):
    try:
        return ALPHA in p.url and p.query_selector(INPUT) is not None
    except Exception:
        return False


def fast_out(p):
    try:
        return "run out of Fast hours" in p.inner_text("body")
    except Exception:
        return False


def ensure_relax(p):
    try:
        p.reload(wait_until="domcontentloaded", timeout=30000); time.sleep(6)
        p.evaluate("""()=>{let b=[...document.querySelectorAll('button')].find(e=>(e.innerText||'').trim()==='Relax');if(b)b.click()}""")
        time.sleep(1)
    except Exception:
        pass


def send(p, prompt):
    try:
        p.fill(INPUT, prompt, timeout=8000); time.sleep(0.35)
        if len(p.input_value(INPUT)) < 20:
            return False
        p.focus(INPUT, timeout=5000); time.sleep(0.1)
        p.keyboard.press("Enter"); time.sleep(1.3)
        return len(p.input_value(INPUT)) < 5
    except Exception:
        return False


def main():
    cfg = C.load_cfg()
    mcfg = cfg["platforms"]["mj"]
    if not mcfg.get("enabled", True):
        print("mj 未启用"); return
    out = cfg["output_dir"]; os.makedirs(out, exist_ok=True)
    log = C.logger(os.path.join(out, "run_mj.log"))
    stop_file = cfg["task"]["stop_file"]; stop_at = cfg["task"].get("stop_at")
    interval = mcfg.get("interval_sec", 31)
    versions = mcfg.get("versions", ["--v 6", "--v 7", "--v 8.1"])
    stylize = mcfg.get("stylize", 80)
    eng = PromptEngine()
    n = 0
    log(f"=== MJ 纯文本批量生图启动 versions={versions} stylize={stylize} ===")

    with sync_playwright() as pw:
        b = pw.chromium.connect_over_cdp(cfg["cdp"])
        while not C.stop_check(out, stop_file, stop_at):
            page = C.find_page(b, ALPHA)
            if not page or not healthy(page):
                log("健康检查失败, 等 10s"); time.sleep(10); continue
            if mcfg.get("force_relax", True) and fast_out(page):
                log("⚠ Fast hours 用完, 切 Relax"); ensure_relax(page); time.sleep(2); continue
            core = eng.core(); ar = eng.aspect()
            for ver in versions:
                if C.stop_check(out, stop_file, stop_at):
                    break
                page = C.find_page(b, ALPHA)
                if not page or not healthy(page):
                    log("掉线, 等 10s"); time.sleep(10); break
                page.bring_to_front()
                if send(page, f"{core} --ar {ar} --s {stylize} {ver}"):
                    n += 1
                    if n % 15 == 0:
                        log(f"已发 {n} 条")
                time.sleep(interval)
        log(f"=== STOP, MJ 退出, 累计 {n} 条 ===")


if __name__ == "__main__":
    main()
