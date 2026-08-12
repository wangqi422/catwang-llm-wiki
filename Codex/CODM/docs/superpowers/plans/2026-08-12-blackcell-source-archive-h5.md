# BlackCell Source Archive H5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, offline-capable static H5 that archives all 30 local BlackCell reference images, identifies their official Modern Warfare III sources, and teaches the visual system through a cinematic BlackCell presentation.

**Architecture:** Use a framework-free static site under `blackcell-source-archive/`. A PowerShell inventory script copies source images without modifying them, computes dimensions and hashes, generates thumbnails, and writes a browser-ready JavaScript data file; the page then renders all content from that local data without `fetch`, so it also works under `file://`.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, PowerShell, Windows System.Drawing, Node.js syntax checks, Playwright/browser screenshots when available.

## Global Constraints

- Include all 30 files from `G:\工作2026新\40.1\周年庆版本主调 01\` and never modify or delete the originals.
- Use exactly these source-state values: `official_video_frame`, `official_poster`, `derived_layout`, `duplicate`, `unverified`.
- Mark only verified material as official; show evidence and confidence for every item.
- Support direct `file://` opening with no backend, framework, package install, or runtime data fetch.
- Use near-black `#090A0A` / `#0D0D0D`, module black `#141414` / `#191A18`, primary text `#F2F1EB`, and controlled deep gold near `#C8A84E`.
- Use sharp corners, no glassmorphism, no large shadows, no particle effects, and no bright esports-neon treatment.
- Support 1440×900, 1024×768, and 390×844 without horizontal overflow.
- Respect `prefers-reduced-motion`.
- Keep official external sources as links; local content and all explanatory text must remain usable offline.

---

## File Structure

```text
blackcell-source-archive/
  index.html                 semantic page sections and modal shell
  README.md                  usage, source, and copyright notes
  assets/
    local/                   untouched copies of all 30 input images
    thumbs/                  640px JPEG thumbnails
  css/
    styles.css               BlackCell visual system and responsive layout
  js/
    assets-data.js           generated `window.BLACKCELL_ASSETS`
    app.js                   gallery, filters, modal, navigation, reveal behavior
  scripts/
    build-assets.ps1         inventory, copy, hash, dimensions, thumbnail generation
  tests/
    validate-assets.ps1      asset count, paths, duplicate groups, required fields
    validate-page.mjs        static HTML/JS contract checks
```

## Task 1: Reproducible Asset Inventory

**Files:**
- Create: `blackcell-source-archive/scripts/build-assets.ps1`
- Create: `blackcell-source-archive/tests/validate-assets.ps1`
- Create: `blackcell-source-archive/js/assets-data.js`
- Create: `blackcell-source-archive/assets/local/*`
- Create: `blackcell-source-archive/assets/thumbs/*`

**Interfaces:**
- Consumes: source directory passed as `-SourceRoot`.
- Produces: `window.BLACKCELL_ASSETS`, an array of objects with `id`, `fileName`, `localPath`, `thumbnailPath`, `width`, `height`, `category`, `sourceStatus`, `confidence`, `evidence`, `officialUrl`, `videoTimestamp`, `duplicateOf`, and `learningValue`.

- [ ] **Step 1: Write the failing inventory validation**

Create `tests/validate-assets.ps1` so it loads `js/assets-data.js` by stripping the `window.BLACKCELL_ASSETS =` prefix and terminal semicolon, parses the JSON, and asserts:

```powershell
$assets.Count -eq 30
($assets | Where-Object sourceStatus -eq 'duplicate').Count -eq 2
($assets | Group-Object fileName | Measure-Object).Count -eq 30
$assets | ForEach-Object {
  if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot $_.localPath))) { throw "Missing local file: $($_.fileName)" }
  if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot $_.thumbnailPath))) { throw "Missing thumbnail: $($_.fileName)" }
  if ($_.width -le 0 -or $_.height -le 0) { throw "Invalid dimensions: $($_.fileName)" }
  if ($validStates -notcontains $_.sourceStatus) { throw "Invalid source state: $($_.sourceStatus)" }
}
```

- [ ] **Step 2: Run the validation and confirm it fails**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\blackcell-source-archive\tests\validate-assets.ps1
```

Expected: failure because `assets-data.js` and copied assets do not exist.

- [ ] **Step 3: Implement the asset builder**

Implement `scripts/build-assets.ps1` with parameters:

```powershell
param(
  [Parameter(Mandatory=$true)][string]$SourceRoot,
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)
```

The script must:

1. Resolve and verify `SourceRoot` before copying.
2. Enumerate `.jpg`, `.jpeg`, and `.png` recursively in stable full-path order.
3. Generate collision-safe ASCII filenames such as `asset-001.jpg`.
4. Copy bytes to `assets/local/` without changing the input.
5. Read dimensions using `System.Drawing.Image`.
6. Compute SHA-256 and assign the second member of each repeated hash group `sourceStatus: "duplicate"` and `duplicateOf` pointing to the first member ID.
7. Generate 640px-wide JPEG thumbnails under `assets/thumbs/` with preserved aspect ratio.
8. Apply the curated classifications and verified timestamps established during source research; uncertain items receive `unverified` rather than guessed attribution.
9. Write UTF-8 `js/assets-data.js` as one assignment:

```javascript
window.BLACKCELL_ASSETS = [
  {
    "id": "asset-001",
    "fileName": "01 黑金 01.jpg",
    "localPath": "assets/local/asset-001.jpg",
    "thumbnailPath": "assets/thumbs/asset-001.jpg",
    "width": 1280,
    "height": 720,
    "category": "poster",
    "sourceStatus": "derived_layout",
    "confidence": 0.85,
    "evidence": "BlackCell explainer layout using official Season 1 campaign imagery.",
    "officialUrl": "https://www.callofduty.com/blog/2023/12/call-of-duty-modern-warfare-III-warzone-season-1-blackcell-battle-pass-bundles",
    "videoTimestamp": null,
    "duplicateOf": null,
    "learningValue": "Study title hierarchy and controlled black-gold branding."
  }
];
```

- [ ] **Step 4: Build and validate the complete asset set**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\blackcell-source-archive\scripts\build-assets.ps1 -SourceRoot 'G:\工作2026新\40.1\周年庆版本主调 01'
powershell -ExecutionPolicy Bypass -File .\blackcell-source-archive\tests\validate-assets.ps1
```

Expected: `PASS: 30 assets, 30 thumbnails, 2 duplicate records`.

- [ ] **Step 5: Commit the inventory deliverable**

```powershell
git add blackcell-source-archive/scripts blackcell-source-archive/tests/validate-assets.ps1 blackcell-source-archive/js/assets-data.js blackcell-source-archive/assets
git commit -m "feat: build BlackCell source inventory"
```

## Task 2: Cinematic Static Page Skeleton

**Files:**
- Create: `blackcell-source-archive/index.html`
- Create: `blackcell-source-archive/css/styles.css`
- Create: `blackcell-source-archive/README.md`
- Create: `blackcell-source-archive/tests/validate-page.mjs`

**Interfaces:**
- Consumes: `window.BLACKCELL_ASSETS` from Task 1.
- Produces: stable DOM targets `#hero`, `#identity`, `#video`, `#posters`, `#gallery`, `#style-dna`, `#learning-template`, `#sources`, `#asset-grid`, and `#asset-modal`.

- [ ] **Step 1: Write the failing static page contract test**

Create `tests/validate-page.mjs` using only Node built-ins. Read `index.html`, `css/styles.css`, `js/app.js`, and `js/assets-data.js`; assert the required IDs, stylesheet/script links, official source URLs, reduced-motion CSS, and no forbidden `border-radius` declaration:

```javascript
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing #${id}`);
}
if (!html.includes('js/assets-data.js') || !html.includes('js/app.js')) throw new Error('Missing scripts');
if (!css.includes('@media (prefers-reduced-motion: reduce)')) throw new Error('Missing reduced-motion support');
if (/border-radius\s*:/.test(css)) throw new Error('Rounded corners are forbidden');
```

- [ ] **Step 2: Run the page contract test and confirm it fails**

Run:

```powershell
node .\blackcell-source-archive\tests\validate-page.mjs
```

Expected: failure because `index.html` and `styles.css` do not exist.

- [ ] **Step 3: Implement semantic HTML and the full visual foundation**

Create `index.html` with:

- skip link and sticky section navigation;
- cinematic hero with project title, verified badge, counts, and anchor actions;
- identity evidence section;
- official video section with YouTube, Steam CDN, and GameSpot links;
- official poster section;
- gallery filter toolbar and empty `#asset-grid`;
- eight style-DNA articles;
- reference-role hierarchy;
- reusable learning template and prohibitions;
- source index and copyright notice;
- accessible dialog-like modal shell with close, previous, and next buttons.

Create `styles.css` using the exact global color constraints, sharp corners, CSS Grid/Flexbox, fluid typography, visible focus states, `content-visibility` for lower sections, and responsive rules for 1280px, 768px, and mobile breakpoints.

- [ ] **Step 4: Add offline usage documentation and rerun validation**

`README.md` must include:

```text
Open index.html directly in a browser.
Rebuild assets with build-assets.ps1 after the source folder changes.
Official links require internet access; the local archive and analysis do not.
All referenced Call of Duty imagery remains the property of its respective rights holders and is included for internal visual study.
```

Run:

```powershell
node .\blackcell-source-archive\tests\validate-page.mjs
```

Expected: `PASS: static page contract`.

- [ ] **Step 5: Commit the page skeleton**

```powershell
git add blackcell-source-archive/index.html blackcell-source-archive/css blackcell-source-archive/README.md blackcell-source-archive/tests/validate-page.mjs
git commit -m "feat: add cinematic BlackCell archive shell"
```

## Task 3: Gallery, Filters, and Accessible Lightbox

**Files:**
- Create: `blackcell-source-archive/js/app.js`
- Modify: `blackcell-source-archive/tests/validate-page.mjs`
- Modify: `blackcell-source-archive/css/styles.css`

**Interfaces:**
- Consumes: `window.BLACKCELL_ASSETS`.
- Produces: `filterAssets(status)`, `renderGallery(items)`, `openAsset(id)`, `closeAsset()`, and `moveAsset(delta)`.

- [ ] **Step 1: Extend the contract test for application behavior**

Assert that `app.js` defines all five interface functions, reads `window.BLACKCELL_ASSETS`, updates `aria-pressed`, handles `Escape`, `ArrowLeft`, and `ArrowRight`, and never calls `fetch(`.

- [ ] **Step 2: Run validation and confirm it fails**

Run:

```powershell
node .\blackcell-source-archive\tests\validate-page.mjs
```

Expected: failure because gallery behavior is absent.

- [ ] **Step 3: Implement deterministic gallery rendering and filters**

`renderGallery(items)` must create semantic buttons/cards with thumbnail, filename, dimensions, source label, confidence, and a safe fallback on image error. `filterAssets(status)` must support:

```javascript
['all', 'official_video_frame', 'official_poster', 'derived_layout', 'duplicate', 'unverified']
```

It must update the visible count and the selected filter's `aria-pressed` state. Empty results must show a reset button that calls `filterAssets('all')`.

- [ ] **Step 4: Implement the modal and keyboard navigation**

`openAsset(id)` populates the large image and all metadata, stores the prior focused element, opens the modal, and moves focus to the close button. `moveAsset(delta)` follows the current filtered list. `closeAsset()` restores focus. Add a document key handler for `Escape`, `ArrowLeft`, and `ArrowRight` only while the modal is open.

- [ ] **Step 5: Validate and commit interactions**

Run:

```powershell
node .\blackcell-source-archive\tests\validate-page.mjs
powershell -ExecutionPolicy Bypass -File .\blackcell-source-archive\tests\validate-assets.ps1
```

Expected: both validations pass.

```powershell
git add blackcell-source-archive/js/app.js blackcell-source-archive/css/styles.css blackcell-source-archive/tests/validate-page.mjs
git commit -m "feat: add BlackCell gallery and lightbox"
```

## Task 4: Evidence, Style DNA, and Learning Content

**Files:**
- Modify: `blackcell-source-archive/index.html`
- Modify: `blackcell-source-archive/js/assets-data.js`
- Modify: `blackcell-source-archive/css/styles.css`
- Modify: `blackcell-source-archive/tests/validate-page.mjs`

**Interfaces:**
- Consumes: verified source URLs and per-asset metadata.
- Produces: complete editorial content with the four-part pattern `可见证据 / 专业推断 / 可复用规则 / 禁止项` for every style-DNA dimension.

- [ ] **Step 1: Add editorial completeness assertions**

Extend the Node test to check for the three reference responsibilities, all eight style-DNA dimensions, the official blog URL, YouTube video ID `CTDdmSbGT_k`, Steam CDN URL, GameSpot URL, and the phrases `可见证据`, `专业推断`, `可复用规则`, `禁止项`.

- [ ] **Step 2: Run validation and confirm missing content fails**

Run:

```powershell
node .\blackcell-source-archive\tests\validate-page.mjs
```

Expected: failure listing missing editorial markers or sources.

- [ ] **Step 3: Write the complete sourced editorial content**

Populate the page with concise Chinese copy covering:

- MWIII + Warzone Season 1 identity and Abolisher evidence;
- official video camera, focal-length feel, combat blocking, weapon foreground, spatial depth, and lighting;
- Abolisher identity, armor layers, black/gold ratio, material roughness, and rim lighting;
- Battle Pass typography, grid, modular reward hierarchy, and restrained gold usage;
- explicit reference responsibilities and conflict order;
- production formula and prohibited failure modes.

Every external claim must sit next to its official source link. Visual inferences must use the label `专业推断`.

- [ ] **Step 4: Validate copy and metadata consistency**

Run both validators and confirm every official-labeled asset has a non-null `officialUrl`, every `official_video_frame` has a timestamp, and every `duplicate` has `duplicateOf`.

- [ ] **Step 5: Commit the completed content**

```powershell
git add blackcell-source-archive/index.html blackcell-source-archive/js/assets-data.js blackcell-source-archive/css/styles.css blackcell-source-archive/tests
git commit -m "feat: add sourced BlackCell visual study"
```

## Task 5: Browser QA and Final Delivery

**Files:**
- Modify: `blackcell-source-archive/index.html`
- Modify: `blackcell-source-archive/css/styles.css`
- Modify: `blackcell-source-archive/js/app.js`
- Create: `blackcell-source-archive/design-qa.md`

**Interfaces:**
- Consumes: complete static H5.
- Produces: verified desktop, tablet, and mobile artifact with recorded QA status.

- [ ] **Step 1: Run all nonvisual checks**

```powershell
powershell -ExecutionPolicy Bypass -File .\blackcell-source-archive\tests\validate-assets.ps1
node .\blackcell-source-archive\tests\validate-page.mjs
git diff --check
```

Expected: all pass with no whitespace errors.

- [ ] **Step 2: Serve the static directory for browser QA**

Use an available local static server without adding a dependency, for example:

```powershell
python -m http.server 4173 --directory .\blackcell-source-archive
```

Open `http://127.0.0.1:4173/` in the available browser automation tool.

- [ ] **Step 3: Capture and inspect three viewport screenshots**

Capture full-page screenshots at:

```text
1440 × 900
1024 × 768
390 × 844
```

Inspect hero crop, text contrast, image loading, four/three/two-column gallery behavior, modal controls, filter wrapping, and horizontal overflow. Also open `index.html` directly with `file://` and confirm gallery rendering does not depend on HTTP.

- [ ] **Step 4: Exercise primary interactions and record QA**

Verify:

1. all six filters update count and visible cards;
2. clicking a card opens the correct image and metadata;
3. previous/next buttons and keyboard arrows work;
4. `Esc` closes the modal and restores focus;
5. official links open in a new tab with `rel="noopener noreferrer"`;
6. failed-image fallback is readable;
7. reduced-motion mode disables nonessential animation.

Write `design-qa.md` with viewport results, test commands, and final `passed` or an explicit unresolved `blocked` item. Do not claim visual completion with a `blocked` result.

- [ ] **Step 5: Fix issues, rerun the full check, and commit**

After fixing every P0/P1/P2 issue, rerun Step 1 and repeat affected screenshots/interactions.

```powershell
git add blackcell-source-archive
git commit -m "feat: complete BlackCell source archive H5"
```

Expected final state: validators pass, `design-qa.md` says `passed`, and the site opens directly from `blackcell-source-archive/index.html`.
