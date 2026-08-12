(function () {
  'use strict';
  const assets = Array.isArray(window.BLACKCELL_ASSETS) ? window.BLACKCELL_ASSETS : [];
  let activeFilter = 'all';
  let visibleAssets = assets.slice();
  let activeIndex = -1;
  let priorFocus = null;
  const statusLabels = { official_video_frame: '官方视频帧', official_poster: '官方海报', derived_layout: '二次排版', duplicate: '重复文件', unverified: '待确认' };

  function filterAssets(status) {
    return status === 'all' ? assets.slice() : assets.filter((asset) => asset.sourceStatus === status);
  }
  function makeFallback(image, asset) {
    image.hidden = true;
    const fallback = image.parentElement.querySelector('.image-fallback');
    if (fallback) { fallback.hidden = false; fallback.textContent = `${asset.fileName} / IMAGE UNAVAILABLE`; }
  }
  function renderGallery(items) {
    visibleAssets = items.slice();
    const grid = document.getElementById('asset-grid');
    const count = document.getElementById('visible-count');
    if (!grid || !count) return items;
    count.textContent = String(items.length);
    grid.replaceChildren();
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'gallery-empty';
      empty.innerHTML = '<strong>NO MATCHING ASSETS</strong><p>当前分类没有素材。</p>';
      const reset = document.createElement('button'); reset.type = 'button'; reset.textContent = '查看全部';
      reset.addEventListener('click', () => applyFilter('all')); empty.append(reset); grid.append(empty); return items;
    }
    const fragment = document.createDocumentFragment();
    items.forEach((asset, index) => {
      const card = document.createElement('button'); card.type = 'button'; card.className = 'asset-card reveal'; card.dataset.assetId = asset.id;
      card.setAttribute('aria-label', `查看 ${asset.fileName}`);
      const media = document.createElement('span'); media.className = 'asset-media';
      const image = document.createElement('img'); image.src = asset.thumbnailPath; image.alt = ''; image.loading = index < 8 ? 'eager' : 'lazy';
      image.addEventListener('error', () => makeFallback(image, asset), { once: true });
      const fallback = document.createElement('span'); fallback.className = 'image-fallback'; fallback.hidden = true; media.append(image, fallback);
      const info = document.createElement('span'); info.className = 'asset-info';
      const top = document.createElement('span'); top.className = 'asset-topline';
      const label = document.createElement('b'); label.textContent = statusLabels[asset.sourceStatus] || asset.sourceStatus;
      const confidence = document.createElement('em'); confidence.textContent = `${Math.round(asset.confidence * 100)}%`; top.append(label, confidence);
      const name = document.createElement('strong'); name.textContent = asset.fileName;
      const dimensions = document.createElement('small'); dimensions.textContent = `${asset.width} × ${asset.height} // ${asset.id.toUpperCase()}`;
      info.append(top, name, dimensions); card.append(media, info); card.addEventListener('click', () => openAsset(asset.id)); fragment.append(card);
    });
    grid.append(fragment); observeReveals(); return items;
  }
  function applyFilter(status) {
    activeFilter = status;
    document.querySelectorAll('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === status)));
    return renderGallery(filterAssets(status));
  }
  function openAsset(id) {
    const index = visibleAssets.findIndex((asset) => asset.id === id); if (index < 0) return null;
    activeIndex = index; const asset = visibleAssets[index]; const modal = document.getElementById('asset-modal'); if (!modal) return asset;
    priorFocus = document.activeElement;
    const image = document.getElementById('modal-image'); image.src = asset.localPath; image.alt = asset.fileName;
    document.getElementById('modal-status').textContent = `${statusLabels[asset.sourceStatus]} // CONFIDENCE ${Math.round(asset.confidence * 100)}%`;
    document.getElementById('modal-title').textContent = asset.fileName;
    document.getElementById('modal-meta').innerHTML = `<dt>尺寸</dt><dd>${asset.width} × ${asset.height}</dd><dt>编号</dt><dd>${asset.id}</dd><dt>时间点</dt><dd>${asset.videoTimestamp || '不适用'}</dd><dt>重复关联</dt><dd>${asset.duplicateOf || '无'}</dd>`;
    document.getElementById('modal-evidence').textContent = asset.evidence; document.getElementById('modal-learning').textContent = asset.learningValue;
    const source = document.getElementById('modal-source'); source.hidden = !asset.officialUrl; if (asset.officialUrl) source.href = asset.officialUrl;
    modal.hidden = false; document.body.classList.add('modal-open'); modal.querySelector('[data-modal-close]').focus(); return asset;
  }
  function closeAsset() {
    const modal = document.getElementById('asset-modal'); if (!modal || modal.hidden) return false;
    modal.hidden = true; document.body.classList.remove('modal-open'); activeIndex = -1;
    if (priorFocus && typeof priorFocus.focus === 'function') priorFocus.focus(); return true;
  }
  function moveAsset(delta) {
    if (visibleAssets.length === 0 || activeIndex < 0) return null;
    const nextIndex = (activeIndex + delta + visibleAssets.length) % visibleAssets.length;
    return openAsset(visibleAssets[nextIndex].id);
  }
  function observeReveals() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); current.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => observer.observe(element));
  }
  function init() {
    document.documentElement.classList.add('js');
    document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
    document.querySelector('[data-modal-close]')?.addEventListener('click', closeAsset);
    document.querySelector('[data-modal-prev]')?.addEventListener('click', () => moveAsset(-1));
    document.querySelector('[data-modal-next]')?.addEventListener('click', () => moveAsset(1));
    document.addEventListener('keydown', (event) => { const modal = document.getElementById('asset-modal'); if (!modal || modal.hidden) return; if (event.key === 'Escape') closeAsset(); if (event.key === 'ArrowLeft') moveAsset(-1); if (event.key === 'ArrowRight') moveAsset(1); });
    renderGallery(filterAssets(activeFilter)); observeReveals();
  }
  window.BlackCellArchive = { filterAssets, renderGallery, openAsset, closeAsset, moveAsset, applyFilter };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
