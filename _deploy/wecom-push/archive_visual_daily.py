#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
archive_visual_daily.py — 竞品视觉日报归档 + 发布 + 企微群推送（AI 日报同款样式）

用法：
  python archive_visual_daily.py <h5路径> [md路径]

流程（对齐 push-ai-daily.js 的推送形态）：
  1. 归档：H5 + MD → E:/catwang-llm-wiki/wiki/CODM_竞品日报/
  2. 发布：H5 复制到 docs/competitive-daily/visual-daily-YYYYMMDD.html，git push 上 GitHub Pages
  3. 出图：Playwright 截 1080x1920 预览卡（隐藏侧栏，≤2MB）
  4. 推送两件套：① Markdown 摘要（含 👉 [查看完整视觉日报](在线链接)）② 预览图卡片
     —— 不推本地文件、不发生硬长文

webhook 解析：环境变量 WECOM_WEBHOOK > config.local.json 的 visualDailyWebhook
Pages 基址：https://wangqi422.github.io/catwang-llm-wiki（config.json githubPagesBase）
"""
import base64, hashlib, json, os, re, shutil, struct, subprocess, sys, urllib.request
from pathlib import Path

WIKI_ROOT = Path('E:/catwang-llm-wiki')
ARCHIVE = WIKI_ROOT / 'wiki' / 'CODM_竞品日报'
PAGES_DIR = WIKI_ROOT / 'docs' / 'competitive-daily'
PAGES_BASE = 'https://wangqi422.github.io/catwang-llm-wiki'


def resolve_webhook():
    if os.environ.get('WECOM_WEBHOOK'):
        return os.environ['WECOM_WEBHOOK']
    cfg = WIKI_ROOT / '_deploy' / 'wecom-push' / 'config.local.json'
    if cfg.exists():
        d = json.loads(cfg.read_text(encoding='utf-8'))
        return d.get('visualDailyWebhook') or d.get('webhook') or ''
    return ''


def date_from_name(name):
    m = re.search(r'(20\d{6})', name)
    return m.group(1) if m else None


def build_push_markdown(md_text, page_url, date_str):
    title = '使命召唤竞品视觉日报'
    m = re.search(r'^#\s*(.+)$', md_text, re.M)
    if m:
        title = m.group(1).replace('#', '').strip()
    # 一句话洞察：概览里第一个非表格段
    insight = ''
    m = re.search(r'##\s*📊 今日概览\s*\n(.*?)(?:\n##|\n---)', md_text, re.S)
    if m:
        for ln in m.group(1).splitlines():
            s = ln.strip()
            if s and not s.startswith('|') and not s.startswith('**结构'):
                insight = re.sub(r'\*\*', '', s)
                break
    # 重点速览前 4 条
    highlights = []
    m = re.search(r'##\s*📌 重点速览\s*\n(.*?)(?:\n##|\n---)', md_text, re.S)
    if m:
        for ln in m.group(1).splitlines():
            s = ln.strip()
            if s.startswith('-'):
                highlights.append(re.sub(r'^-\s*', '', s))
            if len(highlights) >= 4:
                break
    d = f'{date_str[:4]}.{date_str[4:6]}.{date_str[6:8]}' if date_str else ''
    lines = [f'**{title} · {d}**', '']
    if insight:
        lines += [insight[:180], '']
    for h in highlights:
        lines.append(h if h.startswith('🔥') else f'🔥 {h}')
    lines += ['', '👉 [查看完整视觉日报](' + page_url + ')']
    md = '\n'.join(lines)
    if len(md.encode('utf-8')) > 4096:
        md = md.encode('utf-8')[:4000].decode('utf-8', 'ignore') + '\n👉 [查看完整视觉日报](' + page_url + ')'
    return md


def render_card(h5_path, png_path):
    from playwright.sync_api import sync_playwright
    js = ('document.querySelectorAll(".side,.menu,.arch,#barTrack").forEach(e=>e.style.display="none");'
          'document.body.style.paddingLeft="0";')
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={'width': 1080, 'height': 1920}, device_scale_factor=1)
        pg.goto(Path(h5_path).resolve().as_uri())
        pg.wait_for_timeout(900)
        pg.evaluate(js)
        pg.wait_for_timeout(200)
        pg.screenshot(path=str(png_path), clip={'x': 0, 'y': 0, 'width': 1080, 'height': 1920})
        b.close()
    sz = Path(png_path).stat().st_size
    print(f'📸 card: {sz//1024} KB')
    assert sz <= 2 * 1024 * 1024, '预览图超过 2MB'


def send_webhook(payload):
    url = resolve_webhook()
    if not url:
        raise SystemExit('未配置 webhook')
    req = urllib.request.Request(url, data=json.dumps(payload, ensure_ascii=False).encode('utf-8'),
                                 headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req, timeout=15) as r:
        body = r.read().decode('utf-8')
    print('[push]', body)
    return '"errcode":0' in body


def git_publish(paths):
    try:
        subprocess.run(['git', 'add', *map(str, paths)], cwd=str(WIKI_ROOT), check=True, capture_output=True)
        st = subprocess.run(['git', 'status', '--porcelain', *map(str, paths)], cwd=str(WIKI_ROOT),
                            capture_output=True, text=True)
        if not st.stdout.strip():
            print('ℹ️  无需提交')
            return
        subprocess.run(['git', 'commit', '-m', 'daily: CODM visual daily publish'], cwd=str(WIKI_ROOT),
                       check=True, capture_output=True)
        subprocess.run(['git', 'push', 'origin', 'main'], cwd=str(WIKI_ROOT), check=True, capture_output=True)
        print('✅ GitHub Pages 已推送')
    except Exception as e:
        print(f'⚠️  git push 失败: {e}（可运行 push-now.bat 补推）')


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args:
        print(__doc__); sys.exit(1)
    h5 = Path(args[0]).resolve()
    md = Path(args[1]).resolve() if len(args) > 1 else None
    if not h5.exists():
        raise SystemExit(f'❌ H5 不存在: {h5}')

    date_str = date_from_name(h5.name) or date_from_name(md.name if md else '') or ''
    ARCHIVE.mkdir(parents=True, exist_ok=True)

    # 1. 归档
    for src in [x for x in (h5, md) if x and x.exists()]:
        shutil.copy2(src, ARCHIVE / src.name)
        print('📦 archived:', ARCHIVE / src.name)

    # 2. 发布副本到 Pages
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    host_name = f'visual-daily-{date_str}.html' if date_str else h5.name
    host_html = PAGES_DIR / host_name
    shutil.copy2(h5, host_html)
    page_url = f'{PAGES_BASE}/docs/competitive-daily/{host_name}'

    # 3. 预览卡
    host_png = PAGES_DIR / host_name.replace('.html', '.png')
    try:
        render_card(h5, host_png)
    except Exception as e:
        print(f'⚠️  预览卡渲染失败: {e}（仅推文字）')
        host_png = None

    # 4. git 发布
    paths = [host_html] + ([host_png] if host_png and host_png.exists() else [])
    if md:
        paths.append(ARCHIVE / md.name)
    git_publish(paths)

    # 5. 推送（AI 日报同款：push-poster.js 一条 markdown_v2 = 海报图 + 「点击看更多内容」）
    png_arg = str(host_png) if host_png and host_png.exists() else str(PAGES_DIR / host_name.replace('.html', '.png'))
    png_url = f'{PAGES_BASE}/docs/competitive-daily/{Path(png_arg).name}'
    cmd = ['node', str(WIKI_ROOT / '_deploy' / 'wecom-push' / 'push-poster.js'),
           '--png', png_arg, '--pngurl', png_url, '--url', page_url,
           '--text', '点击看更多内容', '--group', '竞品视觉日报群']
    r = subprocess.run(cmd, cwd=str(WIKI_ROOT))
    if r.returncode != 0:
        raise SystemExit('push-poster.js 推送失败')
    print('🎉 归档 + 发布 + 推送完成')
    print('🔗', page_url)


if __name__ == '__main__':
    main()
