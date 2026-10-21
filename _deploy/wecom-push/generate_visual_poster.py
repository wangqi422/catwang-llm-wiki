#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""generate_visual_poster.py — 竞品视觉日报封面海报生成器（Verkansk KV 版式）

构图：当日最好 KV 满幅打底 + 巨型标题 + 金色副标（当日洞察）+ 底部金框小图条 + 右上期号角标 + 落款

用法：
  python generate_visual_poster.py --bg kv.jpg --thumbs a.jpg,b.jpg,c.jpg,d.jpg \
    --labels 猩红月影,战火重燃,MW4,S12预告 --subtitle "四线分流 · 节日红利不是必选项" \
    --stats "4 PRODUCTS · 30 ASSETS · TOP 97M VIEWS" --no "NO.003 · 2026.10.20" --out out.jpg

输出默认 2x（2160x2880）JPEG q88，<2MB。
"""
import argparse, base64, tempfile
from pathlib import Path

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1280px;height:720px;overflow:hidden}
body{position:relative;background:#0A0C10;font-family:"PingFang SC","Microsoft YaHei",sans-serif}
.bg{position:absolute;inset:0;background:var(--bgimg) center/cover no-repeat}
.scrim-left{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(90deg,rgba(8,10,14,.88) 0%,rgba(8,10,14,.62) 28%,rgba(8,10,14,.18) 46%,transparent 62%)}
.scrim-bot{position:absolute;inset:auto 0 0 0;height:240px;
  background:linear-gradient(0deg,rgba(8,10,14,.92) 0%,rgba(8,10,14,.55) 45%,transparent 100%)}
.vignette{position:absolute;inset:0;box-shadow:inset 0 0 160px rgba(0,0,0,.5)}
.badge{position:absolute;top:30px;left:44px;text-align:left}
.badge .brand{font-size:18px;font-weight:800;letter-spacing:.18em;color:#fff}
.badge .brand em{font-style:normal;color:#E8C96A}
.badge .no{margin-top:7px;display:inline-block;padding:5px 13px;border:1.5px solid rgba(232,201,106,.75);
  font-family:Consolas,monospace;font-size:15px;letter-spacing:.2em;color:#E8C96A;background:rgba(10,12,16,.4)}
.title{position:absolute;top:150px;left:44px;text-align:left}
.title h1{font-size:64px;font-weight:900;letter-spacing:.14em;color:#fff;
  text-shadow:0 4px 34px rgba(0,0,0,.7),0 2px 8px rgba(0,0,0,.55);line-height:1.1}
.title .rule{width:88px;height:3px;background:linear-gradient(90deg,#E8C96A,transparent);margin:20px 0 0}
.sub{position:absolute;top:318px;left:44px;text-align:left}
.sub h2{font-size:27px;font-weight:800;letter-spacing:.12em;line-height:1.45;
  background:linear-gradient(180deg,#F6E7B0 0%,#E8C96A 40%,#C9A227 78%,#9A7520 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 3px 9px rgba(0,0,0,.6))}
.sub .stats{margin-top:14px;font-family:Consolas,monospace;font-size:14px;letter-spacing:.26em;color:rgba(255,255,255,.72)}
.thumbs{position:absolute;left:36px;right:36px;bottom:52px;display:flex;gap:14px}
.th{flex:1;position:relative;height:132px;border:2px solid #C9A227;overflow:hidden;
  box-shadow:0 10px 26px rgba(0,0,0,.55)}
.th img{width:100%;height:100%;object-fit:cover;display:block}
.th-lb{position:absolute;left:0;right:0;bottom:0;height:36px;line-height:36px;text-align:center;
  background:rgba(8,10,14,.8);color:#fff;font-size:16px;font-weight:700;letter-spacing:.22em}
.foot{position:absolute;left:0;right:0;bottom:18px;text-align:center;
  font-family:Consolas,"方正兰亭黑Pro 简","方正兰亭黑","FZLanTingHei",monospace;font-size:12px;letter-spacing:.3em;color:rgba(255,255,255,.5)}
.foot .cn{font-family:"方正兰亭黑Pro 简","方正兰亭黑","FZLanTingHei",sans-serif;font-weight:500;letter-spacing:.36em}
"""

def b64(p):
    return base64.b64encode(Path(p).read_bytes()).decode()

def build_html(bg, thumbs, labels, title, subtitle, stats, issue, foot):
    th = ''
    for data, label in zip(thumbs, labels):
        th += '<div class="th"><img src="data:image/jpeg;base64,' + data + '"><div class="th-lb">' + label + '</div></div>'
    bgimg = "url('data:image/jpeg;base64," + bg + "')"
    css = CSS.replace('var(--bgimg)', bgimg)
    return ('<!DOCTYPE html><html><head><meta charset="utf-8"><style>' + css + '</style></head><body>'
            + '<div class="bg"></div><div class="scrim-left"></div><div class="scrim-bot"></div><div class="vignette"></div>'
            + '<div class="badge"><div class="brand">CODM <em>竞品情报</em></div><div class="no">' + issue + '</div></div>'
            + '<div class="title"><h1>' + title + '</h1><div class="rule"></div></div>'
            + '<div class="sub"><h2>' + subtitle + '</h2><div class="stats">' + stats + '</div></div>'
            + '<div class="thumbs">' + th + '</div>'
            + '<div class="foot">' + foot + '</div></body></html>')

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--bg', required=True)
    ap.add_argument('--thumbs', required=True, help='逗号分隔 4 张小图')
    ap.add_argument('--labels', required=True, help='逗号分隔 4 个短标签')
    ap.add_argument('--title', default='竞品视觉日报')
    ap.add_argument('--subtitle', required=True)
    ap.add_argument('--stats', default='')
    ap.add_argument('--no', dest='issue', default='NO.003')
    ap.add_argument('--foot', default='PRODUCED FOR CODM MARKETING · <span class="cn">小柒运营</span>')
    ap.add_argument('--out', required=True)
    ap.add_argument('--scale', type=int, default=2, choices=[1, 2])
    a = ap.parse_args()

    thumbs = [b64(p.strip()) for p in a.thumbs.split(',')]
    labels = [x.strip() for x in a.labels.split(',')]
    assert len(thumbs) == 4 and len(labels) == 4, 'thumbs/labels 必须各 4 个'
    html = build_html(b64(a.bg), thumbs, labels, a.title, a.subtitle, a.stats, a.issue, a.foot)

    from playwright.sync_api import sync_playwright
    with tempfile.TemporaryDirectory() as td:
        hp = Path(td) / 'p.html'
        hp.write_text(html, encoding='utf-8')
        out = Path(a.out).resolve()
        with sync_playwright() as pw:
            b = pw.chromium.launch()
            pg = b.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=a.scale)
            pg.goto(hp.resolve().as_uri()); pg.wait_for_timeout(700)
            if out.suffix.lower() == '.png':
                pg.screenshot(path=str(out))
            else:
                pg.screenshot(path=str(out), type='jpeg', quality=88)
            b.close()
    sz = out.stat().st_size
    print('OK poster:', out, sz // 1024, 'KB')
    assert sz < 2 * 1024 * 1024, 'over 2MB'

if __name__ == '__main__':
    main()
