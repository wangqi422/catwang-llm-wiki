#!/usr/bin/env python3
"""
写实类军事提示词库 v10
Changes from v9:
- Renamed: 写实类军事提示词库
- Thumbnails: file-based (thumbs/) instead of base64 inline → HTML ~30KB
- Prompt feature enhanced: user can input custom prompt per card
- Upload: fixed (was broken due to Owner gate logic)
- Delete mode: fixed
- Card actions: icon + text, prompt icon changed to ✏️
- Delta Force: 25 items (was 5)
"""
import json, os, sys
from pathlib import Path

MANIFEST = '/tmp/agent-a-v4/h5/manifest.json'
CARDS_DIR = Path('/tmp/agent-a-v4/h5/cards')
THUMBS_DIR = Path('/tmp/codm-h5/thumbs')
ORIGINALS_DIR = Path('/tmp/codm-h5/originals')
OUT = '/tmp/codm-h5/v16.html'
OWNER_HASH = '0f01ec262cbab2733888a9a3aa6273c52560cdb7b9f75e751335b12a75626824'
# v16: 大图走公网 cards/ URL 拿原图（真高清），内嵌只放 thumb
PUBLIC_BASE = 'https://workspace4fiopidt7iew351gya-8080.gz.cloudide.woa.com/cards/'

with open(MANIFEST) as f:
    items = json.load(f)

old_count = sum(1 for x in items if x.get('has_old_prompt'))
assert old_count == 7, f'Pitfall #52 fail: {old_count}'
assert all(x.get('source_url') for x in items), 'Pitfall #53 fail'

js_items = []
# Load pre-encoded b64 map for inline mode
INLINE_B64 = {}
INLINE_BIG = {}
inline_map = Path('/tmp/inline_b64_map.json')
big_map_path = Path('/tmp/inline_big_map.json')
if inline_map.exists():
    with open(inline_map) as f:
        INLINE_B64 = json.load(f)
if big_map_path.exists():
    with open(big_map_path) as f:
        INLINE_BIG = json.load(f)

for it in items:
    card_name = Path(it['card']).name
    b64_data = INLINE_B64.get(card_name, '')
    card_url = PUBLIC_BASE + card_name  # v16: 公网原图 URL
    # v16: big 不再内嵌，改用公网 URL
    
    js_items.append({
        'id': it['id'],
        'title': it.get('title', it['id']),
        'source': it['source'],
        'source_site': it.get('source_site', ''),
        'source_url': it.get('source_url', ''),
        'cat': it.get('cat', 'scene'),
        'video_id': it.get('video_id', ''),
        'has_old_prompt': it.get('has_old_prompt', False),
        'old_prompt': it.get('old_prompt', ''),
        'has_auto_prompt': bool(it.get('has_auto_prompt')),
        'auto_prompt': it.get('auto_prompt', {}) or {},
        'thumb': '',
        'b64': b64_data,
        'card_url': card_url,  # v16 真高清走公网原图
        'orig_url': '',
        'is_ugc': False
    })

GAMES = {
    'all': {'name': '全部', 'color': '#FFE600', 'sources': []},
    'codm': {'name': 'COD 端游', 'color': '#fa5', 'sources': ['COD-PC', 'cod-pc-4kw']},
    'delta': {'name': '三角洲', 'color': '#5fb', 'sources': ['三角洲', '三角洲行动']},
    'anqu': {'name': '暗区突围', 'color': '#f75', 'sources': ['anqu']},
    'bf': {'name': '战地 BF', 'color': '#7af', 'sources': ['BF']},
    'ugc': {'name': '我上传的', 'color': '#f5f', 'sources': ['UGC']},
    'log': {'name': '📋 日志', 'color': '#aaa', 'sources': ['__LOG__']},
}
CATS = {'all': '全部', 'character': '人物', 'brand_promo': '品牌宣发', 'brand_collab': '品牌合作', 'weapon': '武器', 'scene': '场景'}

html = """<!DOCTYPE html><html lang='zh-CN'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>写实类军事提示词库</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}html,body{background:#0D0D0D;color:#E8E8E8;font:14px/1.5 -apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}body{display:flex;min-height:100vh}
.sidebar{width:160px;background:#1a1a1a;padding:16px 12px;border-right:1px solid #2a2a2a;position:sticky;top:0;height:100vh;overflow-y:auto}
.main{flex:1;display:flex;flex-direction:column;min-width:0}.topbar{position:sticky;top:0;background:#0D0D0Dcc;backdrop-filter:blur(8px);padding:10px 16px;border-bottom:1px solid #1a1a1a;z-index:10}
.cats{display:flex;gap:6px;flex-wrap:wrap}.cat,.mini-btn{padding:5px 10px;border-radius:6px;background:#1a1a1a;color:#aaa;cursor:pointer;font-size:12px;border:1px solid #2a2a2a;transition:all .2s}.cat.active,.mini-btn.on{color:#FFE600;border-color:#FFE60055}
.toolbar{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}.gallery{padding:14px;column-count:4;column-gap:12px}@media(max-width:1200px){.gallery{column-count:3}}@media(max-width:820px){.gallery{column-count:2}.sidebar{width:100px;padding:10px 6px}}@media(max-width:480px){.gallery{column-count:2;padding:8px;column-gap:8px}.sidebar{display:none}.topbar{padding:8px 10px}}
.card{break-inside:avoid;display:inline-block;width:100%;margin-bottom:12px;background:#1a1a1a;border-radius:8px;overflow:hidden;position:relative}.card img,.card video{width:100%;display:block;cursor:pointer;min-height:80px;background:#111}
.badges{position:absolute;left:6px;top:6px;display:flex;gap:4px;z-index:2}.badge{font-size:10px;padding:2px 6px;border-radius:4px;background:#000a}.badge.cat{background:#FFE600cc;color:#000}.badge.prompt{background:#5fbcc;color:#000}
.play-overlay{position:absolute;right:8px;top:8px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:2;pointer-events:none;border:2px solid rgba(255,255,255,.9);box-shadow:0 2px 8px rgba(0,0,0,.4)}.play-overlay::before{content:'';display:block;width:0;height:0;margin-left:3px;border-style:solid;border-width:7px 0 7px 11px;border-color:transparent transparent transparent #fff}
.card-meta{padding:8px 10px;font-size:11px;color:#999}.actions{display:flex;border-top:1px solid #2a2a2a}.act{flex:1;text-align:center;padding:8px 0;cursor:pointer;background:#161616;color:#888;font-size:11px;border-right:1px solid #2a2a2a;display:flex;align-items:center;justify-content:center;gap:3px}.act:last-child{border-right:none}.act:hover{color:#FFE600}
.game-btn{display:flex;justify-content:space-between;align-items:center;padding:7px 9px;border-radius:6px;color:#bbb;cursor:pointer;font-size:12px}.game-btn.active{background:#2a2a2a;color:#FFE600}
.modal{display:none;position:fixed;inset:0;background:#000d;z-index:100;padding:20px;overflow:auto}.modal.show{display:flex;justify-content:center;align-items:flex-start}.inner{background:#1a1a1a;border-radius:12px;max-width:760px;width:100%;padding:20px;position:relative;margin:auto}
.close{position:absolute;right:12px;top:8px;font-size:24px;color:#666;cursor:pointer}.inp{width:100%;padding:10px;background:#0f0f0f;border:1px solid #2a2a2a;color:#ddd;border-radius:6px;margin-top:8px}textarea.inp{min-height:100px;resize:vertical}
pre{background:#0d0d0d;padding:10px;border-radius:6px;white-space:pre-wrap;font-size:12px;margin-top:8px}.empty{padding:60px 20px;color:#555;text-align:center}
.prompt-section{margin-top:12px;padding:12px;background:#0f0f0f;border-radius:8px}.prompt-label{color:#FFE600;font-size:11px;margin-bottom:4px}.prompt-actions{display:flex;gap:8px;margin-top:10px}
.btn{padding:6px 14px;border-radius:6px;background:#2a2a2a;color:#ddd;border:none;cursor:pointer;font-size:12px}.btn:hover{background:#3a3a3a}.btn.primary{background:#FFE600;color:#000}
.tabs{display:flex;gap:4px;padding:8px 16px 0;background:#0D0D0D;border-bottom:1px solid #1a1a1a}.tab{padding:8px 16px;cursor:pointer;color:#888;font-size:13px;border-radius:8px 8px 0 0;border:1px solid transparent;border-bottom:none}.tab.active{background:#1a1a1a;color:#FFE600;border-color:#2a2a2a}
.workbench{padding:16px;display:none}.workbench.show{display:block}
.wb-section{background:#1a1a1a;border-radius:10px;padding:14px;margin-bottom:14px}.wb-h{color:#FFE600;font-size:13px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.wb-refs{display:flex;gap:8px;flex-wrap:wrap;min-height:60px;padding:8px;background:#0d0d0d;border-radius:6px;border:1px dashed #2a2a2a}
.wb-ref{position:relative;width:80px;height:80px;border-radius:6px;overflow:hidden;background:#222}.wb-ref img{width:100%;height:100%;object-fit:cover}.wb-ref .x{position:absolute;right:2px;top:0;background:#000a;color:#fff;width:18px;height:18px;border-radius:50%;text-align:center;line-height:18px;cursor:pointer;font-size:12px}
.wb-ref-empty{color:#555;font-size:11px;align-self:center;padding:0 8px}
.iter{display:flex;gap:10px;background:#0d0d0d;border-radius:8px;padding:10px;margin-bottom:8px;align-items:flex-start}
.iter-img{width:90px;height:90px;background:#222;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;color:#555;font-size:11px;border:1px dashed #2a2a2a}.iter-img img{width:100%;height:100%;object-fit:cover}
.iter-body{flex:1;display:flex;flex-direction:column;gap:6px}.iter-tag{font-size:11px;color:#FFE600}.iter-rm{color:#666;font-size:11px;cursor:pointer}.iter-rm:hover{color:#f55}
.act.add-wb{background:#1a2a1a;color:#5fb}
.flow-wrap{background:#1a1a1a;border-radius:10px;padding:14px;margin-bottom:14px}
.flow-h{color:#FFE600;font-size:13px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.flow-svg{width:100%;height:auto;display:block;background:#0d0d0d;border-radius:8px}
.flow-node{cursor:pointer;transition:opacity .2s}.flow-node:hover{opacity:.85}
.flow-node rect{transition:filter .2s}.flow-node:hover rect{filter:brightness(1.2)}
.flow-tip{font-size:11px;color:#666;margin-top:8px;text-align:center}
.flow-legend{display:flex;gap:12px;justify-content:center;margin-top:10px;flex-wrap:wrap;font-size:11px;color:#888}
.flow-legend span{display:inline-flex;align-items:center;gap:4px}.flow-legend i{width:10px;height:10px;border-radius:2px;display:inline-block}
@media(max-width:600px){.flow-svg{font-size:10px}}
.log-wrap{padding:10px}.log-row{display:flex;gap:10px;padding:8px 10px;border-bottom:1px solid #1a1a1a;font-size:12px;align-items:center}.log-ts{color:#666;font-size:11px;min-width:100px}.log-type{color:#FFE600;min-width:100px}.log-title{color:#ccc;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.select-cat{background:#1a1a1a;color:#FFE600;border:1px solid #FFE60055;border-radius:6px;padding:4px 8px;font-size:12px;cursor:pointer}
.modal .cat-picker{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
</style></head><body></style></head><body>
<aside class='sidebar'>
<div style='font-size:11px;color:#666'>AGENT <b style='color:#FFE600'>A</b></div>
<div style='color:#FFE600;font-size:12px;margin:4px 0 10px'>写实类军事提示词库</div>
<div id='game-list'></div>
<div style='margin-top:14px;font-size:10px;color:#666'>上传/删除/编辑 仅 Owner</div>
</aside>
<main class='main'>
<div class='tabs'>
<div class='tab active' data-tab='lib' onclick="switchTab('lib')">📚 提示词参考库</div>
<div class='tab' data-tab='wb' onclick="switchTab('wb')">🛠️ 提示词工作台</div>
</div>
<div id='tab-lib'>
<div class='topbar'>
<div class='cats' id='cat-list'></div>
<div class='toolbar'>
<div class='mini-btn' id='btn-owner' onclick='openOwner()'>🔐 Owner</div>
<div class='mini-btn' id='btn-upload' onclick='openUpload()'>📤 上传</div>
<div class='mini-btn' id='btn-manage' onclick='toggleManage()'>🗑️ 删除模式</div>
</div>
</div>
<div class='gallery' id='gallery'></div>
</div>

<!-- Workbench Tab -->
<div id='tab-wb' class='workbench'>
<div class='wb-section'>
<div class='wb-h'>📌 当前需求 <span style='font-size:10px;color:#666'>本地保存</span></div>
<input class='inp' id='wb-need' placeholder='例如：CODM 春节 KV / 三角洲新武器宣发图'>
</div>

<div class='wb-section'>
<div class='wb-h'>🧬 参考卡片 <span style='font-size:10px;color:#666'>从库里点 ➕加入工作台</span></div>
<div class='wb-refs' id='wb-refs'></div>
</div>

<div class='wb-section'>
<div class='wb-h'>✏️ 我的提示词草稿</div>
<div style='font-size:11px;color:#888;margin-bottom:4px'>中文（先在这里搭骨架）</div>
<textarea class='inp' id='wb-zh' style='min-height:120px' placeholder='在这里写中文提示词...'></textarea>
<div style='font-size:11px;color:#888;margin:8px 0 4px'>英文（贴 ChatGPT 翻译结果，或直接英文写）</div>
<textarea class='inp' id='wb-en' style='min-height:120px' placeholder='英文提示词最终版...'></textarea>
<div class='prompt-actions'>
<button class='btn' onclick='copyWb("wb-zh")'>📋 复制中</button>
<button class='btn' onclick='copyWb("wb-en")'>📋 复制英</button>
<button class='btn primary' onclick='saveWbDraft()'>💾 保存草稿</button>
</div>
</div>

<div class='wb-section'>
<div class='wb-h'>🔁 出图迭代记录 <button class='btn' onclick='addIter()'>+ 加一版</button></div>
<div id='wb-iters'></div>
</div>

<div class='wb-section'>
<div class='wb-h'>📤 导出 SOP（给同学）</div>
<div class='prompt-actions'>
<button class='btn primary' onclick='exportSOP()'>📥 下载 .md</button>
<button class='btn' onclick='copySOP()'>📋 拷贝全文</button>
<button class='btn' onclick='clearWb()' style='color:#f55'>🗑 清空工作台</button>
</div>
</div>
</div>

</main>

<!-- Prompt Modal -->
<div class='modal' id='m-prompt'><div class='inner'><div class='close' onclick="closeM('m-prompt')">×</div>
<h3 id='p-title' style='color:#FFE600;margin-bottom:8px'>提示词</h3>
<div id='p-body'></div>
<div class='prompt-section'>
<div class='prompt-label'>✏️ 自定义提示词（可直接输入/编辑）</div>
<textarea class='inp' id='p-custom' placeholder='输入你的生图提示词...'></textarea>
<div class='prompt-actions'>
<button class='btn primary' onclick='saveCustomPrompt()'>💾 保存提示词</button>
<button class='btn' onclick='copyPrompt()'>📋 复制</button>
</div>
</div>
</div></div>

<!-- Image Modal -->
<div class='modal' id='m-img'><div class='inner' style='background:transparent;padding:0;max-width:95vw'><div class='close' onclick="closeM('m-img')" style='color:#fff'>×</div><img id='m-img-src' style='width:100%;max-height:92vh;object-fit:contain'></div></div>

<!-- Video Modal -->
<div class='modal' id='m-video'><div class='inner' style='background:transparent;padding:0;max-width:95vw'><div class='close' onclick="closeM('m-video')" style='color:#fff'>×</div><video id='m-video-src' controls style='width:100%;max-height:92vh'></video></div></div>

<!-- Owner Modal -->
<div class='modal' id='m-owner'><div class='inner'><div class='close' onclick="closeM('m-owner')">×</div><h3 style='color:#FFE600'>Owner 鉴权</h3><input class='inp' type='password' id='owner-pass' placeholder='输入 owner passphrase'><button class='btn primary' style='margin-top:10px' onclick='ownerLogin()'>解锁</button><p style='color:#666;font-size:11px;margin-top:10px'>仅本机浏览器有效（localStorage）</p></div></div>

<!-- Change Category Modal -->
<div class='modal' id='m-chgcat'><div class='inner'><div class='close' onclick="closeM('m-chgcat')">×</div>
<h3 style='color:#FFE600'>🏷️ 修改分类</h3>
<p style='color:#888;font-size:12px;margin-top:8px' id='chgcat-title'>选择新分类</p>
<div class='cat-picker' id='chgcat-btns'></div>
</div></div>

<!-- Upload Modal -->
<div class='modal' id='m-upload'><div class='inner'><div class='close' onclick="closeM('m-upload')">×</div>
<h3 style='color:#FFE600'>📤 上传素材</h3>
<p style='color:#888;font-size:12px;margin-top:8px'>文件保存在浏览器本地 IndexedDB，不上传服务器。</p>
<input id='u-files' class='inp' type='file' multiple accept='image/*,video/*'>
<div style='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap'>
<select id='u-cat' class='inp' style='max-width:180px'>
<option value='character'>人物</option><option value='weapon'>武器</option><option value='brand_promo'>品牌宣发</option><option value='brand_collab'>品牌合作</option><option value='scene'>场景</option>
</select>
<input id='u-title' class='inp' style='flex:1' placeholder='标题（可选）'>
</div>
<textarea class='inp' id='u-prompt' placeholder='提示词（可选，后续也可在卡片编辑）'></textarea>
<button class='btn primary' style='margin-top:10px' onclick='saveUpload()'>✅ 保存入库</button>
</div></div>

<script>
const OWNER_HASH='__OWNER_HASH__';
const GAMES=__GAMES__;
const CATS=__CATS__;
const BASE_DATA=__DATA__;
let DATA=[],curGame='all',curCat='all',manage=false;
let owner=(localStorage.getItem('ownerAuth')==='1');

// ============= 日志系统 v16 =============
const LOG_LABELS={upload:'📤 上传',delete:'🗑️ 删除',edit_prompt:'✏️ 编辑提示词',add_wb:'➕ 加入工作台',open:'👁️ 打开大图'};
let LOG_CACHE=[];
async function LOG_ADD(type,id,title){
  try{
    const db=await openDB();
    const rec={ts:Date.now(),type,id,title:title||''};
    await new Promise((res,rej)=>{const tx=db.transaction(LOG_STORE,'readwrite');tx.objectStore(LOG_STORE).add(rec);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});
    LOG_CACHE.unshift(rec);
    if(curGame==='log')renderGallery();
  }catch(e){console.warn('LOG_ADD fail',e);}
}
async function loadLog(){
  const db=await openDB();
  return new Promise((res,rej)=>{const tx=db.transaction(LOG_STORE,'readonly');const r=tx.objectStore(LOG_STORE).getAll();r.onsuccess=()=>{const arr=(r.result||[]).sort((a,b)=>b.ts-a.ts);LOG_CACHE=arr;res(arr);};r.onerror=()=>rej(r.error);});
}
async function clearLog(){
  if(!confirm('清空所有日志？'))return;
  const db=await openDB();
  await new Promise((res,rej)=>{const tx=db.transaction(LOG_STORE,'readwrite');tx.objectStore(LOG_STORE).clear();tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});
  LOG_CACHE=[];
  renderGallery();
}
function fmtTs(ts){const d=new Date(ts);const pad=n=>String(n).padStart(2,'0');return `${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;}
const DB_NAME='agentA_prompt_lib_v2',STORE='ugc_assets',PROMPT_STORE='custom_prompts';
let promptDB={};

// IndexedDB for UGC
function openDB(){return new Promise((res,rej)=>{const req=indexedDB.open(DB_NAME,3);req.onupgradeneeded=e=>{const db=e.target.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE,{keyPath:'id'});if(!db.objectStoreNames.contains(PROMPT_STORE))db.createObjectStore(PROMPT_STORE,{keyPath:'id'});if(!db.objectStoreNames.contains(LOG_STORE))db.createObjectStore(LOG_STORE,{autoIncrement:true});};req.onsuccess=()=>res(req.result);req.onerror=()=>rej(req.error);});}

// Custom prompts (stored locally)
async function loadPrompts(){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction(PROMPT_STORE,'readonly');const r=tx.objectStore(PROMPT_STORE).getAll();r.onsuccess=()=>{const arr=r.result||[];promptDB={};arr.forEach(p=>promptDB[p.id]=p.prompt);res();};r.onerror=()=>rej(r.error);});}
async function savePromptToDB(id,prompt){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction(PROMPT_STORE,'readwrite');tx.objectStore(PROMPT_STORE).put({id,prompt});tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}

function getDeleted(){try{return JSON.parse(localStorage.getItem('deletedBaseIds')||'[]')}catch(e){return[]}}
function setDeleted(a){localStorage.setItem('deletedBaseIds',JSON.stringify(a));}
async function loadUGC(){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction(STORE,'readonly');const r=tx.objectStore(STORE).getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);});}

async function refreshData(){const ugc=await loadUGC();const del=new Set(getDeleted());DATA=BASE_DATA.filter(x=>!del.has(x.id)).concat(ugc);renderGames();renderGallery();}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function renderGames(){Object.values(GAMES).forEach(g=>g.count=0);for(const it of DATA){GAMES.all.count++;for(const [k,v] of Object.entries(GAMES)){if(k==='all')continue;if(v.sources.includes(it.source)){v.count++;break;}}}
const el=document.getElementById('game-list');el.innerHTML=Object.entries(GAMES).map(([k,v])=>`<div class='game-btn ${k===curGame?"active":""}' data-k='${k}'><span>${v.name}</span><span style='font-size:11px;color:#666'>${v.count||0}</span></div>`).join('');
el.querySelectorAll('.game-btn').forEach(b=>b.onclick=()=>{curGame=b.dataset.k;renderGames();renderGallery();});
document.getElementById('btn-owner').classList.toggle('on',owner);
document.getElementById('btn-manage').classList.toggle('on',owner&&manage);
}

function renderCats(){const el=document.getElementById('cat-list');el.innerHTML=Object.entries(CATS).map(([k,v])=>`<div class='cat ${k===curCat?"active":""}' data-k='${k}'>${v}</div>`).join('');el.querySelectorAll('.cat').forEach(c=>c.onclick=()=>{curCat=c.dataset.k;renderCats();renderGallery();});}

function filt(){return DATA.filter(it=>{if(curGame!=='all'&&!GAMES[curGame].sources.includes(it.source))return false;if(curCat!=='all'&&it.cat!==curCat)return false;return true;});}

function renderGallery(){
const el=document.getElementById('gallery');
const arr=filt();
if(!arr.length){el.innerHTML="<div class='empty'>该筛选下暂无素材</div>";return;}
el.innerHTML=arr.map(it=>{
const hasPrompt=(it.has_old_prompt||it.has_auto_prompt||promptDB[it.id]);
const pb=hasPrompt?"<span class='badge prompt'>✏️</span>":'';
const delBtn=(owner&&manage)?`<div class='act' onclick="event.stopPropagation();delItem('${it.id}')">🗑️ 删除</div>`:'';
const isVideo=!!it.video_id||it.media_type==='video';
const imgSrc=it.thumb?it.thumb:(it.b64?`data:image/jpeg;base64,${it.b64}`:'');
const playOverlay=isVideo?`<div class='play-overlay'></div>`:'';
const media=(it.media_type==='video'&&it.video_url)?
  `<video muted playsinline onclick="onOpen('${it.id}')" poster='${imgSrc}'></video>`:
  `<img loading='lazy' onclick="onOpen('${it.id}')" src='${imgSrc}' onerror="this.style.background='#222';this.alt='加载中...'">`;
return `<div class='card'>${media}${playOverlay}<div class='badges'><span class='badge cat'>${CATS[it.cat]||it.cat}</span>${pb}</div><div class='card-meta'>${esc(it.title||it.id)}<div style='font-size:10px;color:#666'>${it.source_site||it.source}</div></div><div class='actions'><div class='act' onclick="showPrompt('${it.id}')">✏️ 提示词</div><div class='act add-wb' onclick="addToWb('${it.id}')">➕ 工作台</div><div class='act' onclick="openSource('${it.id}')">🔗 出处</div><div class='act' onclick="openChgCat('${it.id}')">🏷️ 改分类</div>${delBtn}</div></div>`;
}).join('');}

function onOpen(id){const it=DATA.find(x=>x.id===id);if(!it)return;
if(it.media_type==='video'&&it.video_url){document.getElementById('m-video-src').src=it.video_url;openM('m-video');return;}
if(it.video_id){window.open(`https://www.youtube.com/watch?v=${it.video_id}`,'_blank');return;}
const src=it.card_url?it.card_url:(it.b64?`data:image/jpeg;base64,${it.b64}`:'');
document.getElementById('m-img-src').src=src;openM('m-img');}

let currentPromptId='';
function showPrompt(id){
currentPromptId=id;
const it=DATA.find(x=>x.id===id);
document.getElementById('p-title').textContent=it.title||id;
const b=document.getElementById('p-body');
const custom=promptDB[id]||'';
if(it.has_old_prompt)b.innerHTML=`<div style='color:#5fb;font-size:11px;margin-bottom:4px'>📌 原始提示词</div><pre>${esc(it.old_prompt||'')}</pre>`;
else if(it.has_auto_prompt)b.innerHTML=`<div style='color:#5fb;font-size:11px'>${esc(it.auto_prompt.framework||'Agent A 7维反推')}</div><pre>${esc(it.auto_prompt.prompt_en||'')}</pre>${it.auto_prompt.prompt_zh?`<pre>${esc(it.auto_prompt.prompt_zh)}</pre>`:''}`;
else b.innerHTML=`<div style='color:#666;font-size:12px'>暂无反推提示词</div>`;
document.getElementById('p-custom').value=custom||(it.has_old_prompt?it.old_prompt:'');
openM('m-prompt');}

async function saveCustomPrompt(){
const id=currentPromptId;if(!id)return;
const prompt=document.getElementById('p-custom').value.trim();
if(!prompt)return alert('提示词不能为空');
await savePromptToDB(id,prompt);
promptDB[id]=prompt;
renderGallery();
alert('✅ 提示词已保存');
}
function copyPrompt(){
const txt=document.getElementById('p-custom').value||'';
if(!txt)return alert('没有内容可复制');
navigator.clipboard.writeText(txt).then(()=>alert('📋 已复制到剪贴板')).catch(()=>{
const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);alert('📋 已复制');});}

function openSource(id){const it=DATA.find(x=>x.id===id);if(it&&it.source_url)window.open(it.source_url,'_blank');else alert('无出处链接');}

async function delItem(id){if(!owner){alert('请先 Owner 解锁');return;}if(!manage){alert('请先开启删除模式');return;}if(!confirm('确认删除 '+id+' ？'))return;
const it=DATA.find(x=>x.id===id);if(!it)return;
if(it.is_ugc){const db=await openDB();await new Promise((res,rej)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}
else{const arr=getDeleted();if(!arr.includes(id))arr.push(id);setDeleted(arr);}
await refreshData();}

function openOwner(){openM('m-owner');}
async function sha256(s){const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');}
async function ownerLogin(){const p=document.getElementById('owner-pass').value||'';const h=await sha256(p);if(h===OWNER_HASH){owner=true;localStorage.setItem('ownerAuth','1');closeM('m-owner');renderGames();renderGallery();alert('✅ Owner 已解锁');}else alert('❌ 口令错误');}
function toggleManage(){if(!owner){alert('请先 Owner 解锁');return;}manage=!manage;renderGames();renderGallery();}

function openUpload(){if(!owner){alert('请先 Owner 解锁');return;}openM('m-upload');}
function fileToB64(file){return new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(String(fr.result).split(',')[1]||'');fr.onerror=rej;fr.readAsDataURL(file);});}

async function saveUpload(){if(!owner){alert('请先 Owner 解锁');return;}
const input=document.getElementById('u-files');
const files=[...(input.files||[])];
if(!files.length)return alert('请先选择文件');
const cat=document.getElementById('u-cat').value||'scene';
const title=document.getElementById('u-title').value||'';
const prompt=document.getElementById('u-prompt').value||'';
const db=await openDB();
for(const f of files){
const id='ugc_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);
const rec={id,title:title||f.name,source:'UGC',source_site:'Owner Upload',source_url:'',cat,is_ugc:true,media_type:'image',has_old_prompt:!!prompt,old_prompt:prompt,has_auto_prompt:false,auto_prompt:{}};
if((f.type||'').startsWith('image/')){rec.b64=await fileToB64(f);rec.thumb='data:image/jpeg;base64,'+rec.b64;}
else if((f.type||'').startsWith('video/')){rec.media_type='video';const url=URL.createObjectURL(f);rec.video_url=url;rec.thumb='';}
else continue;
await new Promise((res,rej)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(rec);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});
if(prompt)await savePromptToDB(id,prompt);
}
closeM('m-upload');input.value='';document.getElementById('u-title').value='';document.getElementById('u-prompt').value='';
await refreshData();alert('✅ 上传成功 ('+files.length+' 个文件)');}

function openM(id){document.getElementById(id).classList.add('show');}
function closeM(id){document.getElementById(id).classList.remove('show');}
document.querySelectorAll('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove('show');});

// =========== Workbench ===========
const WB_KEY='wb_state_v1';
let WB={need:'',refs:[],zh:'',en:'',iters:[]};
function loadWb(){try{const s=JSON.parse(localStorage.getItem(WB_KEY)||'null');if(s)WB={need:s.need||'',refs:s.refs||[],zh:s.zh||'',en:s.en||'',iters:s.iters||[]};}catch(e){}}
function saveWb(){localStorage.setItem(WB_KEY,JSON.stringify(WB));}
function switchTab(t){document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===t));
document.getElementById('tab-lib').style.display=(t==='lib'?'':'none');
document.getElementById('tab-wb').classList.toggle('show',t==='wb');
if(t==='wb')renderWb();}
function addToWb(id){const it=DATA.find(x=>x.id===id);if(!it)return;
if(WB.refs.length>=8)return alert('最多 8 张参考');
if(WB.refs.find(r=>r.id===id))return alert('已加入工作台');
WB.refs.push({id,title:it.title||id,thumb:it.b64?`data:image/jpeg;base64,${it.b64}`:(it.thumb||''),prompt:promptDB[id]||it.old_prompt||((it.auto_prompt&&it.auto_prompt.prompt_zh)||'')||((it.auto_prompt&&it.auto_prompt.prompt_en)||'')});
saveWb();
// auto-fill draft if empty
if(!WB.zh&&WB.refs.length===1){WB.zh=WB.refs[0].prompt||'';saveWb();}
alert('✅ 已加入工作台');}
function rmRef(id){WB.refs=WB.refs.filter(r=>r.id!==id);saveWb();renderWb();}
function addIter(){WB.iters.push({v:'V'+(WB.iters.length+1),img:'',prompt:document.getElementById('wb-zh').value||'',note:''});saveWb();renderWb();}
function rmIter(i){if(!confirm('删除 V'+(i+1)+' ?'))return;WB.iters.splice(i,1);WB.iters.forEach((it,k)=>it.v='V'+(k+1));saveWb();renderWb();}
function pickIterImg(i){const fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=e=>{const f=e.target.files[0];if(!f)return;const fr=new FileReader();fr.onload=()=>{WB.iters[i].img=fr.result;saveWb();renderWb();};fr.readAsDataURL(f);};fi.click();}
function updateIter(i,k,v){WB.iters[i][k]=v;saveWb();}
function renderWb(){
document.getElementById('wb-need').value=WB.need;
document.getElementById('wb-zh').value=WB.zh;
document.getElementById('wb-en').value=WB.en;
const r=document.getElementById('wb-refs');
r.innerHTML=WB.refs.length?WB.refs.map(x=>`<div class='wb-ref' title='${esc(x.title)}'><img src='${x.thumb}'><span class='x' onclick="rmRef('${x.id}')">×</span></div>`).join(''):"<div class='wb-ref-empty'>从【提示词参考库】每张卡的【➕ 工作台】按钮加入参考</div>";
const ic=document.getElementById('wb-iters');
ic.innerHTML=WB.iters.length?WB.iters.map((it,i)=>`<div class='iter'>
<div class='iter-img' onclick='pickIterImg(${i})'>${it.img?`<img src='${it.img}'>`:'+ 上传出图截图'}</div>
<div class='iter-body'>
<div style='display:flex;justify-content:space-between'><span class='iter-tag'>${it.v}</span><span class='iter-rm' onclick='rmIter(${i})'>删除</span></div>
<textarea class='inp' style='min-height:60px;font-size:11px' placeholder='这一版用的提示词' oninput='updateIter(${i},"prompt",this.value)'>${esc(it.prompt)}</textarea>
<input class='inp' style='font-size:11px' placeholder='吐槽备注：手糊了 / 光对了 / 改背景' oninput='updateIter(${i},"note",this.value)' value='${esc(it.note)}'>
</div></div>`).join(''):"<div style='color:#555;font-size:12px;padding:10px'>点 【+ 加一版】 开始记录每次出图迭代</div>";
}
document.addEventListener('input',e=>{
if(e.target.id==='wb-need'){WB.need=e.target.value;saveWb();}
if(e.target.id==='wb-zh'){WB.zh=e.target.value;saveWb();}
if(e.target.id==='wb-en'){WB.en=e.target.value;saveWb();}
});
function copyWb(id){const v=document.getElementById(id).value||'';if(!v)return alert('草稿为空');navigator.clipboard.writeText(v).then(()=>alert('📋 已复制'));}
function saveWbDraft(){saveWb();alert('💾 已保存到本地（localStorage）');}
function clearWb(){if(!confirm('清空整个工作台？'))return;WB={need:'',refs:[],zh:'',en:'',iters:[]};saveWb();renderWb();}
function buildSOPText(){
const lines=[];
lines.push('# '+(WB.need||'未命名需求')+' 制作 SOP');
lines.push('');
lines.push('> 由 Agent A 写实类军事提示词库工作台导出 ｜ '+new Date().toLocaleString());
lines.push('');
if(WB.refs.length){lines.push('## 🧬 参考素材');WB.refs.forEach(r=>lines.push('- '+r.title));lines.push('');}
if(WB.zh){lines.push('## ✏️ 最终提示词（中）');lines.push('```');lines.push(WB.zh);lines.push('```');lines.push('');}
if(WB.en){lines.push('## ✏️ 最终提示词（英）');lines.push('```');lines.push(WB.en);lines.push('```');lines.push('');}
if(WB.iters.length){lines.push('## 🔁 迭代记录');WB.iters.forEach(it=>{lines.push('### '+it.v);if(it.note)lines.push('- 备注：'+it.note);if(it.prompt){lines.push('- 提示词：');lines.push('  ```');it.prompt.split('\\n').forEach(l=>lines.push('  '+l));lines.push('  ```');}});lines.push('');}
lines.push('## 📋 制作流程（给同学）');
lines.push('1. 打开生图工具（liblib / MJ / SDXL）');
lines.push('2. 复制上方【最终提示词（英）】到正向提示词框');
lines.push('3. 参数建议：写实类用 SDXL + DPM++ 2M Karras + 30 步 + CFG 7');
lines.push('4. 出图后对照参考素材检查：人脸 / 装备 / 光感 / 构图');
lines.push('5. 如不满意，照【迭代记录】里的备注调整');
return lines.join('\\n');}
function exportSOP(){const txt=buildSOPText();const blob=new Blob([txt],{type:'text/markdown;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(WB.need||'SOP').replace(/[\\/:*?"<>|]/g,'_')+'.md';a.click();}
function copySOP(){const txt=buildSOPText();navigator.clipboard.writeText(txt).then(()=>alert('📋 SOP 全文已复制'));}

loadWb();
(async()=>{await loadPrompts();renderCats();await refreshData();renderWb();})();

// ============= 改分类功能 =============
let chgCatId = '';
function openChgCat(id){
  chgCatId = id;
  const it = DATA.find(x=>x.id===id);
  if(!it) return;
  document.getElementById('chgcat-title').textContent = '当前分类：' + (CATS[it.cat]||it.cat) + '  →  选择新分类';
  renderCatPicker(it.cat);
  openM('m-chgcat');
}
function renderCatPicker(currentCat){
  const el = document.getElementById('chgcat-btns');
  el.innerHTML = Object.entries(CATS).filter(([k])=>k!=='all').map(([k,v])=>{
    const active = (k===currentCat)?' style="background:#FFE600;color:#000"':'"';
    return `<div class='select-cat'${active} onclick="doChgCat('${k}')">${v}</div>`;
  }).join('');
}
async function doChgCat(newCat){
  if(!chgCatId) return;
  const item = BASE_DATA.find(x=>x.id===chgCatId);
  if(item) item.cat = newCat;
  const d = DATA.find(x=>x.id===chgCatId);
  if(d) d.cat = newCat;
  const ugc = await loadUGC();
  const rec = ugc.find(x=>x.id===chgCatId);
  if(rec){ rec.cat = newCat; const db=await openDB(); await new Promise((res,rej)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(rec);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);}); }
  closeM('m-chgcat');
  renderGallery();
  alert('✅ 已改为：'+(CATS[newCat]||newCat));
}
</script></body></html>
"""

html = html.replace('__OWNER_HASH__', OWNER_HASH)
html = html.replace('__GAMES__', json.dumps(GAMES, ensure_ascii=False))
html = html.replace('__CATS__', json.dumps(CATS, ensure_ascii=False))
html = html.replace('__DATA__', json.dumps(js_items, ensure_ascii=False))

with open(OUT, 'w') as f:
    f.write(html)

size_kb = os.path.getsize(OUT) // 1024
print(f'✅ v10 写入 {OUT} {size_kb}KB', file=sys.stderr)
print(f'items: {len(js_items)} (三角洲 {sum(1 for x in js_items if x["source"]=="三角洲")})', file=sys.stderr)
print(f'source_url: {sum(1 for x in items if x.get("source_url"))}/{len(items)}', file=sys.stderr)
print(f'old_prompt: {old_count}/7', file=sys.stderr)
