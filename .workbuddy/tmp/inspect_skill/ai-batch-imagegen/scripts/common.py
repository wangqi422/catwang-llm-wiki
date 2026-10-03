# -*- coding: utf-8 -*-
"""共享工具: 配置加载、日志、CDP页面定位、3000平台控件操作、停止判定。
被 run_woa.py / run_mj.py / collect.py 复用。
"""
import os, io, sys, time, yaml, urllib.request, json
from datetime import datetime, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")


def load_cfg(path="config.yaml"):
    with open(os.path.join(HERE, path), encoding="utf-8") as f:
        return yaml.safe_load(f)


def logger(logfile):
    os.makedirs(os.path.dirname(logfile), exist_ok=True)

    def log(m):
        line = f"[{datetime.now():%m-%d %H:%M:%S}] {m}"
        print(line, flush=True)
        try:
            with open(logfile, "a", encoding="utf-8") as f:
                f.write(line + "\n")
        except Exception:
            pass
    return log


# ---------- 停止判定 ----------
def stop_check(output_dir, stop_file, stop_at):
    """返回 True 表示应停止。STOP 文件存在 或 到达 stop_at 时刻。"""
    if os.path.exists(os.path.join(output_dir, stop_file)):
        return True
    if stop_at:
        try:
            h, m = map(int, stop_at.split(":"))
            now = datetime.now()
            target = now.replace(hour=h, minute=m, second=0, microsecond=0)
            # 仅当当天已过该时刻判停(挂机当晚到次日早上场景)
            if now >= target and (now - target) < timedelta(hours=12):
                return True
        except Exception:
            pass
    return False


# ---------- CDP / 标签 ----------
def clean_tabs(cdp):
    """关掉除 MJ/3000 之外的标签, 防止 CDP 变慢。"""
    try:
        data = json.loads(urllib.request.urlopen(cdp + "/json", timeout=10).read())
    except Exception:
        return 0
    closed = 0
    for x in data:
        if x.get("type") != "page":
            continue
        u = x.get("url", "")
        if "alpha.midjourney.com/imagine" in u or "3000.woa.com" in u:
            continue
        tid = x.get("id")
        if tid:
            try:
                urllib.request.urlopen(f"{cdp}/json/close/{tid}", timeout=5)
                closed += 1
            except Exception:
                pass
    return closed


def find_page(browser, keyword, model=None):
    for c in browser.contexts:
        for p in c.pages:
            if keyword in p.url and (model is None or model in p.url):
                return p
    return None


# ---------- 3000 平台控件 ----------
def woa_enter(page, model):
    if model not in page.url:
        page.evaluate(f"()=>{{location.hash='#/dashboard/draw/{model}'}}")
        time.sleep(5)
    return "passport" not in page.url and page.query_selector("[contenteditable=true]") is not None


def woa_click_chip(page, text, mw=80, mh=20):
    """点选画面参数 chip(分辨率/比例/质量/思考)。靠可见文字定位。"""
    return page.evaluate(
        """([t,mw,mh])=>{let tg=null;document.querySelectorAll('div').forEach(el=>{if(el.children.length===0&&(el.innerText||'').trim()===t){let c=el;for(let i=0;i<5&&c;i++){const r=c.getBoundingClientRect();if(r.width>mw&&r.height>mh){tg=c;break;}c=c.parentElement;}}});if(tg){tg.click();return true;}return false;}""",
        [text, mw, mh])


def woa_upload(page, paths):
    """覆盖式上传参考图。返回 True 即未报错(不做数量校验, 见 troubleshooting)。"""
    h = page.query_selector("input[type=file]")
    if not h:
        return False
    h.set_input_files(paths, timeout=20000)
    time.sleep(3 + 1.4 * len(paths))
    return True


def woa_type_prompt(page, prompt, log=print):
    for attempt in range(3):
        try:
            ce = page.query_selector("[contenteditable=true]")
            if not ce:
                time.sleep(1); continue
            ce.scroll_into_view_if_needed(timeout=3000)
            ce.click(); time.sleep(0.5)
            # ⭐ 三连清空保险(防止 Ctrl+A 单次失败留残影,导致后续 type 字符错位)
            for _ in range(3):
                page.keyboard.press("Control+a"); time.sleep(0.1)
                page.keyboard.press("Delete"); time.sleep(0.25)
            # ⭐ delay=8ms 慢速 type(平台 React 同步需要时间)
            page.keyboard.type(prompt, delay=8)
            time.sleep(1.0)
            txt = page.evaluate("()=>document.querySelector('[contenteditable=true]')?.innerText||''")
            if 50 < len(txt) < 5000:
                return True
            log(f"  woa_type_prompt attempt {attempt+1}: txt len={len(txt)} retry")
        except Exception as e:
            log(f"  woa_type_prompt attempt {attempt+1} exc: {str(e)[:80]}")
            time.sleep(1)
    return False


def woa_generate(page):
    return page.evaluate(
        """()=>{let tg=null;document.querySelectorAll('div,button').forEach(el=>{const t=(el.innerText||'').trim();if(t.match(/^消耗\\s*\\d+\\s*算力点生成$/)&&el.children.length<=2){const r=el.getBoundingClientRect();if(r.width>200&&r.y>700)tg=el;}});if(tg){tg.click();return true;}return false;}""")


def woa_busy(page):
    try:
        b = page.inner_text("body")
        return "当前有任务正在运行" in b or "生成中" in b or "排队" in b
    except Exception:
        return False


def woa_reload(page, model):
    """登录态自愈: reload 回干净 draw 页。"""
    try:
        page.evaluate(f"()=>{{location.hash='#/dashboard/draw/{model}'}}")
        page.reload(wait_until="domcontentloaded", timeout=30000)
        time.sleep(6)
    except Exception:
        pass
