# -*- coding: utf-8 -*-
import sys, time, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # common 已包装 stdout, 这里不再重复包
from prompt_engine import PromptEngine
from playwright.sync_api import sync_playwright

cfg=C.load_cfg()
wcfg=cfg["platforms"]["woa"]
out=cfg["output_dir"]; os.makedirs(out,exist_ok=True)
log=C.logger(os.path.join(out,"quick.log"))
eng=PromptEngine()
PER=1
models=list(wcfg["models"].keys())
log(f"=== 崩坏3联动试水: 每模型{PER}条, models={models} ===")
with sync_playwright() as pw:
    b=pw.chromium.connect_over_cdp(cfg["cdp"])
    for m in models:
        mc=wcfg["models"][m]
        page=C.find_page(b,"3000.woa.com",m)
        if not page or not C.woa_enter(page,m):
            log(f"[{m}]进不去"); continue
        page.bring_to_front()
        w=0
        while C.woa_busy(page) and w<200: time.sleep(5); w+=5
        for i in range(PER):
            while C.woa_busy(page): time.sleep(5)
            C.woa_click_chip(page,mc["res"]); time.sleep(0.6)
            C.woa_click_chip(page,mc["ratio"],mw=35); time.sleep(0.5)
            if mc.get("quality"): C.woa_click_chip(page,mc["quality"]); time.sleep(0.5)
            if mc.get("thinking"): C.woa_click_chip(page,mc["thinking"],mw=50); time.sleep(0.5)
            if C.woa_type_prompt(page,eng.core()) and C.woa_generate(page):
                log(f"[{m}] 第{i+1}/{PER}条 已发")
            else:
                log(f"[{m}] 第{i+1}条 发送失败")
            time.sleep(4)
    log("=== 快刷发送完成 ===")
