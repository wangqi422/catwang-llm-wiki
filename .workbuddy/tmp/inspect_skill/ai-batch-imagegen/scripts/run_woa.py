# -*- coding: utf-8 -*-
"""3000 平台 (司内 woa) 双模型批量生图 — 无限循环 + 自愈。
- gemini / openai 交替发送, 各自按 config 选 分辨率/比例/质量/思考
- reference_images 非空则覆盖式垫图(首次上传, 整批复用; 换类请用固定模型策略)
- 自愈: 连续 N 次进不去 -> reload 重连(应对司内登录态 6-8h 过期)
- 停止: output_dir 下建 STOP 文件, 或到达 config 的 stop_at 时刻
用法: python run_woa.py
"""
import os, sys, time
from playwright.sync_api import sync_playwright
import common as C

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from prompt_engine import PromptEngine


def main():
    cfg = C.load_cfg()
    wcfg = cfg["platforms"]["woa"]
    if not wcfg.get("enabled", True):
        print("woa 未启用"); return
    out = cfg["output_dir"]; os.makedirs(out, exist_ok=True)
    log = C.logger(os.path.join(out, "run_woa.log"))
    refs = cfg["task"].get("reference_images") or []
    stop_file = cfg["task"]["stop_file"]; stop_at = cfg["task"].get("stop_at")
    max_fail = cfg["task"].get("reconnect_after_fails", 3)
    models = list(wcfg["models"].keys())
    eng = PromptEngine()

    if cfg.get("auto_clean_tabs", True):
        n = C.clean_tabs(cfg["cdp"]); log(f"清理无关标签 {n} 个")

    state = {m: {"n": 0, "loaded": False, "fails": 0} for m in models}
    log(f"=== woa 双模型批量生图启动 models={models} 垫图={len(refs)}张 stop_at={stop_at} ===")

    with sync_playwright() as pw:
        b = pw.chromium.connect_over_cdp(cfg["cdp"])
        k = 0
        while not C.stop_check(out, stop_file, stop_at):
            m = models[k % len(models)]; k += 1
            mc = wcfg["models"][m]; st = state[m]
            try:
                page = C.find_page(b, "3000.woa.com", m)
                if not page or not C.woa_enter(page, m):
                    st["fails"] += 1
                    log(f"[{m}] 进不去 ({st['fails']}/{max_fail})")
                    if st["fails"] >= max_fail and page:
                        log(f"[{m}] 触发自愈 reload"); C.woa_reload(page, m); st["fails"] = 0
                    time.sleep(5); continue
                st["fails"] = 0
                page.bring_to_front()
                w = 0
                while C.woa_busy(page) and w < 260:
                    time.sleep(5); w += 5
                # ⭐ 自愈 A: textarea DOM 不存在, 强制 reload
                # ⭐ 自愈 B: 画图框被大图占满 (textarea 存在但被遮, type 不可达), 检测大图占中央区
                if not page.query_selector("[contenteditable=true]"):
                    log(f"[{m}] textarea 不存在, 强制 reload")
                    page.reload(wait_until="domcontentloaded", timeout=30000)
                    page.wait_for_timeout(3000)
                    C.woa_enter(page, m)
                    w = 0
                    while C.woa_busy(page) and w < 60:
                        time.sleep(5); w += 5
                else:
                    # 检测画图框中央是否被大图占满 (中央存在 >600x400 的 img)
                    big_img = page.evaluate("""()=>{
                        const imgs=document.querySelectorAll('img');
                        for(const im of imgs){
                            const r=im.getBoundingClientRect();
                            // 中央区, 大尺寸, 居中
                            if(r.width>500&&r.height>350&&r.x>100&&r.x<800&&r.y>200&&r.y<900) return true;
                        }
                        return false;
                    }""")
                    if big_img:
                        log(f"[{m}] 画图框被大图占满, 强制 reload 重置")
                        page.reload(wait_until="domcontentloaded", timeout=30000)
                        page.wait_for_timeout(3000)
                        C.woa_enter(page, m)
                        w = 0
                        while C.woa_busy(page) and w < 60:
                            time.sleep(5); w += 5
                # 首次垫图(覆盖式, 整批复用)
                if refs and not st["loaded"]:
                    C.woa_upload(page, refs); st["loaded"] = True
                    log(f"[{m}] 已上传 {len(refs)} 张垫图")
                # 画面参数
                C.woa_click_chip(page, mc["res"]); time.sleep(0.6)
                C.woa_click_chip(page, mc["ratio"], mw=35); time.sleep(0.5)
                if mc.get("quality"): C.woa_click_chip(page, mc["quality"]); time.sleep(0.5)
                if mc.get("thinking"): C.woa_click_chip(page, mc["thinking"], mw=50); time.sleep(0.5)
                # 发送
                if C.woa_type_prompt(page, eng.core()) and C.woa_generate(page):
                    st["n"] += 1
                    log(f"[{m}] ✓ 已发 {st['n']} 条")
                else:
                    log(f"[{m}] ✗ 发送失败")
                time.sleep(3)
            except Exception as e:
                log(f"[{m}] 异常 {str(e)[:100]}"); time.sleep(5)
        log(f"=== STOP, woa 退出. " + " / ".join(f"{m}={state[m]['n']}" for m in models) + " ===")


if __name__ == "__main__":
    main()
