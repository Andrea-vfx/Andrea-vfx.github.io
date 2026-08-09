# Andrea Guerrero Aviña — Portfolio Context Document
## For Claude Code — HTML/CSS Build Handoff
### Version 2.0 — Design System extracted directly from homepage (August 2026)

---

## 1. PROJECT OVERVIEW

**Project:** Personal portfolio website — andreagvfx.github.io
**Owner:** Andrea Guerrero Aviña — Compositing & Lighting Artist
**Figma file key:** `8qxW6kN2M4D5pM5mWnk5pm`
**Existing UI repo:** https://andrea-vfx.github.io/portfolio-ui-AndreaGuerrero/
**GitHub:** https://github.com/Andrea-vfx
**Vimeo:** vimeo.com/andreagvfx
**Behance:** behance.net/guerreroandrea
**CUSMA/USMCA eligible** — Guadalajara MX, open to remote & relocation Canada/USA

---

## 2. DESIGN SYSTEM — TOKENS (extracted from homepage, source of truth)

### 2.1 Color Tokens

These were extracted by scanning every node in the homepage frame (`486:984`).
Sorted by frequency of use.

```css
:root {
  /* ── BACKGROUNDS ────────────────────────────── */
  --bg-light:    #f5e8f5;  /* 78 uses — CV section, info areas, text on dark bg */
  --bg-mid:      #b888b8;  /* 46 uses — homepage bg, section nav bg, hero titles */

  /* ── COLORS ─────────────────────────────────── */
  --color-ocean: #1e6898;  /* 95 uses (most used) — chips, labels, ticker, CTAs, links */
  --color-iris:  #5e3878;  /* 59 uses — body text, CTA backgrounds, dividers, social box */
  --color-purple:#9b6bd0;  /* 16 uses — company names, secondary subtitles */
  --color-white: #ffffff;  /* 48 uses — card backgrounds, chips text on dark bg, nav pill */

  /* ── UTILITY ─────────────────────────────────── */
  --ocean-chip:  #d0ecf8;  /* Chip backgrounds for VFX/3D/tech skills */
  --overlay:     rgba(59,34,76,0.51); /* Footer video scrim only */

  /* ── OPACITY VARIANTS (used directly) ────────── */
  /* --color-iris at 15%  → dividers (CSS: rgba(94,56,120,0.15)) */
  /* --color-iris at 10%  → active chip bg */
  /* --color-ocean at 10% → active nav bg */
  /* --bg-mid at 12%      → ticker strip bg */
  /* --bg-light at 33%    → social handle text */
  /* --bg-light at 60%    → "PDF" hint text */
  /* --bg-light at 45%    → "FIND ME ON" label */
}
```

**ELIMINATED — do NOT use in HTML:**
- `#05378a` Behance blue — removed from homepage
- `#13aff0` ArtStation cyan — removed from homepage
- `#b8d8f0` ocean.divider — only 1 use at 40% opacity, not a token
- `#fce8f8` pink.bg / `#882a78` pink.text — not in homepage
- `#f7f7f7` surface.card — only appears at opacity:0 (invisible), skip it

**Naming rationale:**
- `bg.mid` (was `text.muted`) — `#b888b8` is primarily a **background** color, not just text
- `bg.light` (was `bg.base`) — clearer for HTML/CSS context
- `color.iris` (was `text.primary`) — it's used for text AND button backgrounds
- `color.ocean` — kept same, most-used color in the entire design

---

### 2.2 Typography Scale

Both fonts load from Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Asap:wght@600;700;900&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
```

| Token | Family | Style | Size | Letter-spacing | Line-height | Color | Use |
|---|---|---|---|---|---|---|---|
| `display.hero` | Asap | Black 900 | 96px | -3% to -4% | 95–106% | `--bg-mid` or `--bg-light` | ABOUT ME, WORK titles |
| `display.section` | Asap | Black 900 | 80px | -3% | 105% | `--bg-light` | "Let's create ART together!" |
| `heading.card` | Asap | Black 900 | 32px | -2% | 110% | `--color-iris` | Card titles (5 instances) |
| `label.eyebrow` | Asap | Bold 700 | 28px | 20% | auto | `--color-ocean` | ABOUT, SKILLS, EXPERIENCE — always UPPERCASE |
| `heading.role` | DM Sans | Light 300 | 28px | 2% | auto | `--color-iris` | "Compositing & Lighting Artist" |
| `heading.card.sm` | Asap | SemiBold 600 | 16px | 0 | auto | `--color-iris` | CV role titles (6 instances) |
| `body.regular` | DM Sans | Regular 400 | 16px | 0 | 165% | `--color-iris` | Bio, long descriptions |
| `body.light` | DM Sans | Light 300 | 14px | 0 | auto | `--color-iris` | Tool names, skill values (13 instances) |
| `body.company` | DM Sans | Regular 400 | 14px | 0 | auto | `--color-purple` | Company names (9 instances) |
| `ui.skill` | DM Sans | Medium 500 | 14px | 0 | auto | `--color-iris` | Skill category names |
| `ui.ticker` | DM Sans | Medium 500 | 14px | 8% | auto | `--color-ocean` | Ticker strip text (7 instances) |
| `ui.meta` | DM Sans | Light 300 | 13px | 4% | auto | `--color-ocean` | Dates, periods (4 instances) |
| `chip.text` | DM Sans | Medium 500 | 12px | 0 | auto | `--color-ocean` | Inside chips (11 instances) |
| `ui.label.sm` | DM Sans | Medium 500 | 11px | 6% | auto | `--bg-light` | Email/Vimeo platform labels, UPPERCASE |
| `ui.micro` | DM Sans | Medium 500 | 10px | 8–18% | auto | varies | Platform labels, UPPERCASE |

**Typography rules:**
- Hero/display titles on `--bg-light` → use `--bg-mid` color
- Hero/display titles on `--bg-mid` → use `--bg-light` color
- NEVER use `--color-iris` for hero/display titles
- `label.eyebrow` (28px Asap Bold) is intentionally large — designer decision, keep it
- All content in **English**, use `·` not `—`

---

### 2.3 Border Radius

```css
:root {
  --radius-dot:  2px;   /* Dot indicators */
  --radius-badge:6px;   /* Small badges */
  --radius-sm:   12px;  /* Chips, small cards */
  --radius-card: 14px;  /* Main cards */
  --radius-pill: 20px;  /* Pill badges */
  --radius-btn:  30px;  /* Buttons */
  --radius-full: 9999px;/* Circles */
}
```

**Note:** `strokeWeight: 10` and `20` on homepage cards = intentional thick border design decision by Andrea. In HTML, implement as `border: 10px solid var(--bg-light)` on the card elements.

---

### 2.4 Spacing Scale (values actually used)

```css
:root {
  --space-1:  4px;
  --space-2:  6px;
  --space-3:  8px;
  --space-4:  10px;
  --space-5:  12px;
  --space-6:  14px;
  --space-7:  16px;
  --space-8:  20px;
  --space-9:  24px;
  --space-10: 28px;
  --space-11: 36px;
  --space-12: 40px;
  --space-13: 50px;
  --space-14: 56px;
  --space-15: 60px;
  --space-16: 72px;
  --space-17: 80px;  /* ← SAFE ZONE padding */
  --space-18: 96px;  /* Some sections use 100px — designer decision */

  /* Layout */
  --padding-page: 80px;
  --content-max:  1760px;  /* 1920 - (80*2) */
  --page-width:   1920px;
}
```

---

### 2.5 Stroke / Border Weights

```css
--border-thin:   0.5px;  /* Drawer borders, subtle UI */
--border-normal: 1px;    /* Chips, cards in section pages */
/* 10px, 20px = homepage cards only — intentional design, not a bug */
```

---

## 3. SITE ARCHITECTURE

### Pages & URLs

```
andreagvfx.github.io/           → Home (single scroll page)
  ↓ #hero                        → Portada (video background)
  ↓ #cv                          → CV visual 3-column
  ↓ #work                        → Section selector (5 cards)
  ↓ #contact                     → Footer contact + video bg

andreagvfx.github.io/vfx/       → Section 01: VFX & Compositing
  ↓ #compositing-reel            → Vimeo embed (hero)
  ↓ #poster-gallery              → Horizontal scroll — production posters

andreagvfx.github.io/3d/        → Section 02: 3D & Lighting
  ↓ #lighting-reel               → Vimeo embed (hero)
  ↓ #febra                       → Scroll section: FEBRA lookdev
  ↓ #ben-lemur                   → Scroll section: Ben el Lémur
  ↓ #ploop-vfx                   → Scroll section: Ploop VFX

andreagvfx.github.io/motion/    → Section 03: Motion & Editing
  ↓ #vertical                    → Short-form 9:16 videos
  ↓ #3-mistakes                  → Video 01
  ↓ #own-your-style              → Video 02
  ↓ #horizontal                  → Long-form 16:9
  ↓ #tiki                        → Tiki Restaurant brand film

andreagvfx.github.io/illustration/ → Section 04: Illustration
  ↓ #streampack                  → Behance iframe embed
  ↓ #concept-art                 → 3×2 image grid
  ↓ #process                     → Valorant illustration process (4 steps)

andreagvfx.github.io/design/    → Section 05: Design & UX/UI
  → Links to: andrea-vfx.github.io/portfolio-ui-AndreaGuerrero/
  ↓ #bys                         → BYS Cosmetics
  ↓ #sonnet                      → Sonnet Bare Earth
  ↓ #lazarus                     → Lazarus ODF
```

---

## 4. HOMEPAGE — COMPONENT INVENTORY

### Nav (position: fixed)
- **Figma:** `Group 17` > `449:485`
- Background: `--bg-light` rounded pill, blur backdrop
- Pills: "about · CV" | "work ↓" | "reel ↗" | "contact"
- Active pill: solid bg
- Work dropdown: `592:427` — absolute positioned, y:144, x:810, w:300px
  - Toggled with JS on click
  - Lists 5 sections with number + label + ↗

### Hero Section
- Full-screen video background
- `<video autoplay muted loop playsinline>`
- No text overlay — pure visual

### CV Section (`483:485`)
- Background: `--bg-light`
- 3-column layout, 80px padding
- **Hero row:** "ABOUT ME" (96px `--bg-mid`) · name iris 28px · Download/View buttons
- **Download CV button:** `--color-ocean` solid, "↓ Download CV · PDF"
- **View online button:** `--color-iris` border 0.5px, iris bg 8%
- **Ticker:** `--bg-mid` at 12% opacity strip, `--color-ocean` text, ls:8%
- **3 Columns (540px each, gap 60px):**
  - Col 1: About + Skills (categories 28px ocean + tool names 14px iris light)
  - Col 2: Experience (4 roles — Taller Chucho, Welab, Freelance, ITESM)
  - Col 3: Education + CUSMA badge + Languages
- **Contact Band** (`615:427`): `--bg-mid` solid, email/LinkedIn/Vimeo/Portfolio rows

### Section Nav / Work (`430:485`)
- Background: `--bg-mid`
- "CATEGORY" eyebrow 14px ocean ls:22% / "WORK" 96px `--bg-light`
- 4 cards (2×2 grid) — thick border `--bg-light` 10px (intentional)
- **Social Box** (`626:427`): `--color-iris` bg, absolute right side, 315×868px
  - Vimeo, LinkedIn, Behance, ArtStation
  - Link rows: NO fill background (transparent)
  - Icon chips: platform color at 20% opacity + border
- **Bottom band** (`624:427`): availability dot + status · "View compositing reel ↗" (iris solid) · "↓ Download CV" (iris border)

### Footer Contact (`481:485`)
- Video background → `<video autoplay muted loop playsinline>`
- Scrim overlay: `rgba(59,34,76,0.51)` — `481:488`
- "Let's create ART together!" 80px display
- Contact card (`520:480`): `--color-ocean` solid

---

## 5. SECTION PAGES — SHARED COMPONENTS

### Nav Bar (all section pages)
- AG ✦ logo (`--color-iris`) · breadcrumb · hamburger button
- `position: sticky` or `fixed`
- Hamburger: `--color-iris` border 0.5px

### Side Drawer (right, slide in)
```
Width: 380px
Background: --bg-light at 97% opacity
Border left: --color-iris 0.5px
Animation: translateX(100%) → translateX(0)

Close button: --bg-mid solid bg, --bg-light text
"NAVIGATE" label: --color-purple, 10px, ls:20%, UPPERCASE
Nav items inactive: number + label in --bg-mid
Nav items active: --color-ocean bg 10%, border ocean 0.5px, ocean text, ocean dot
Subsections: 20px indent, 2px ocean line
Footer: ocean link, iris copyright 40%
```

**Drawer node IDs:**
| Page | Drawer ID |
|---|---|
| VFX | `574:427` (inside hero `512:490`) |
| 3D | `574:479` (inside hero `570:701`) |
| Motion | `574:531` |
| Illustration | `574:588` |
| Design | `574:630` |

### Section Footer (all section pages)
```
Background: --color-iris solid
Layout: ← Back to Portfolio | Next Section → | link ↗
Title text: --bg-light
Links: --color-ocean
Back arrow: circle, --color-white 10% opacity, white border 0.5px
```

---

## 6. SECTION PAGES — CONTENT

### 01 — VFX & Compositing (`496:501`, bg: `--bg-mid`)

**Hero:**
- Reel placeholder: 1280×720, dark interior, `--color-iris` border 1px, play button
- Title block (left): "COMPOSITING REEL 2025" eyebrow ocean · "VFX & Compositing" 56px white
- Stats card (`--color-iris` bg): "50+" shots · "3" productions · "5 yr"
- "View on Vimeo ↗": `--color-ocean` solid button

**Info Band (bg `--bg-light`):**
- Left (860px): technique chips + reel description + credits table
- Right (860px): Contact card (`--color-ocean` solid) + availability pill + software badges

**Contact Card** (`520:480`): `--color-ocean` — email, LinkedIn, portfolio rows — NO white opacity rows

**Poster Gallery** (bg `--bg-mid` 20%):
- 5 posters horizontal scroll, 200×300px each
- Productions: La Guadalupana, Tipline Mysteries, Teatro Secreto, Munstro, Shadow of God

### 02 — 3D & Lighting (`521:598`, bg: `--bg-mid`)

Same IMDB-style structure. Lighting reel as hero.

**Scroll projects (3 sections alternating `--bg-light` / `--bg-mid`):**
1. **FEBRA** (bg-light, image left): lookdev fiber optics 2025
2. **Ben el Lémur** (bg-mid, image right): Cinépolis theatrical 2022
3. **Ploop VFX** (bg-light, image left): previs + camera animation 2022

Each: num band + 960px image + 960px info (title 52px, subtitle, role, description, chips)

### 03 — Motion & Editing (`234:354`, bg: `--bg-light`)

**Section title:** "Motion & Editing" 80px `--bg-mid`, pills for format types

**Vertical videos (2 side-by-side):**
- Each: 460×820px (9:16), dark gradient bg, play button, "+ info" pill bottom
- Info column (no card bg): 400px wide, transparent
- **Interaction: click video → modal/popup with full info**

**Horizontal section (bg `--bg-light`):**
- "Tiki Restaurant Brand Film" — video 960px + info 960px

**Process gallery:** 6 images 3×2 grid, 570×200px each

**Coming soon:** Dorotimer — dashed border frame

### 04 — Illustration (`549:427`, bg: `--bg-light`)

**Streampack section (bg `--bg-mid`):**
- Behance button — color from Behance brand
- `<iframe>` placeholder 1760×700px, dark interior, rounded 16px
- Implementation: `<iframe src="https://www.behance.net/embed/project/[ID]" allowfullscreen>`
- Always show fallback "View on Behance ↗" button outside iframe

**Concept Art grid:** 6 placeholders, 3×2, corner-radius 12px

**Valorant Process (4 columns, 422px each):**
- 01 Reference · 02 Style Ref · 03 Sketch · 04 Final
- Step 04 has `--color-ocean` border 1.5px (emphasized)
- Extra gallery: 2 wide images (868×180px) below

### 05 — Design & UX/UI (`555:598`, bg: `--bg-light`)

**Links to existing repo — do NOT rebuild:**
`https://andrea-vfx.github.io/portfolio-ui-AndreaGuerrero/`

**3 projects scroll (alternating bg-light / bg-mid):**
1. BYS Cosmetics → `/portfolio-ui-AndreaGuerrero/BYS/`
2. Sonnet Bare Earth → `/portfolio-ui-AndreaGuerrero/SONNET/`
3. Lazarus ODF → `/portfolio-ui-AndreaGuerrero/LAZARUS/`

Each: browser mockup with URL + info + buttons (primary iris solid / secondary iris border)

---

## 7. INTERACTIONS — JAVASCRIPT NEEDED

| Component | Trigger | Behavior |
|---|---|---|
| "work ↓" nav pill | click | Toggle dropdown `592:427` — absolute, y:144, x:810, w:300px |
| Click outside dropdown | click | Close dropdown |
| Hamburger button | click | Slide drawer in from right (`translateX`) |
| Drawer overlay | click outside | Close drawer |
| Vertical 9:16 video | click video or "+ info" | Open modal with full project info |
| Anchor links | page load with hash | Smooth scroll to section |
| Video backgrounds | page load | `autoplay muted loop playsinline` |
| Behance/ArtStation iframe | load | Show inline; always show fallback button |
| CV Download | click | `<a href="cv.pdf" download>` |

---

## 8. ASSETS PENDING

| Asset | Status | Notes |
|---|---|---|
| Compositing reel | ✅ Vimeo | Need embed URL from Andrea |
| Lighting reel | ✅ Vimeo | Separate URL — need from Andrea |
| Hero video (portada) | ⏳ Placeholder | Underwater/deep sea video |
| Footer video (contact) | ⏳ Placeholder | Underwater video (same or different) |
| CV PDF | ⏳ Pending | Andrea exports and provides filename |
| Behance project ID | ⏳ Pending | Streampack — need project ID for embed URL |
| ArtStation portfolio | ⏳ Pending | Upload concept art first |
| Production poster images | ⏳ Placeholder | La Guadalupana, Tipline, Teatro Secreto, Munstro, Shadow of God |
| Project images (3D/Motion) | ⏳ Placeholder | Replace gradient placeholders |

---

## 9. FIGMA NODE REFERENCE MAP

### Homepage (frame `486:984` on Page 1 "draft 2")

| Element | Node ID | Size / Notes |
|---|---|---|
| Main page frame | `486:984` | 1920×3830 |
| Hero video group | `Group 14` / `486:1277` | Vector placeholder → replace with `<video>` |
| CV section | `483:485` | 1920×1288 bg:--bg-light |
| CV hero row | `483:495` | 1920×200 — title + buttons |
| CV ticker | `483:498` | 1920×46 |
| CV body (3 cols) | `483:506` | 1920×853 |
| Contact band | `615:427` | 1920×339 bg:--bg-mid |
| Section Nav / Work | `430:485` | 1920×1247 bg:--bg-mid |
| Nav header (WORK) | `430:486` | |
| Nav cards grid | `430:492` | 4 cards 2×2 |
| Social box | `626:427` | 315×868 absolute right |
| Bottom action band | `624:427` | 1720×96 absolute bottom |
| Work dropdown (open) | `592:427` | 300×302 absolute y:144 x:810 |
| Footer Contact | `481:485` | 1920×537 video bg |
| Footer Scrim | `481:488` | Gradient overlay, sibling of contact |
| Nav Menu bar | `449:485` in `Group 17` | Fixed nav pill |

### Section Pages

| Section | Frame ID | Bg | Drawer ID |
|---|---|---|---|
| VFX & Compositing | `496:501` | --bg-mid | `574:427` |
| 3D & Lighting | `521:598` | --bg-mid | `574:479` |
| Motion & Editing | `234:354` | --bg-light | `574:531` |
| Illustration | `549:427` | --bg-light | `574:588` |
| Design & UX/UI | `555:598` | --bg-light | `574:630` |

---

## 10. EXISTING REPO TO LINK (not rebuild)

**Live URL:** https://andrea-vfx.github.io/portfolio-ui-AndreaGuerrero/
**GitHub:** https://github.com/Andrea-vfx/portfolio-ui-AndreaGuerrero
**Projects:**
- `/BYS/` — BYS Cosmetics (product page + case study PDF)
- `/SONNET/` — Sonnet Bare Earth (product page + design system)
- `/LAZARUS/` — Lazarus ODF (B2B catalog + PDF)

---

## 11. CREDITS & PROFESSIONAL CONTEXT

**Current role:** Compositing Artist + Nuke Mentor — Taller Chucho (Guillermo del Toro stop-motion), Feb 2026–Present. Film: "Munstro" (2027 release).

**Key VFX credits:**
- Tipline Mysteries — Hallmark 2024 (CG comp from Unreal in Nuke) · Welab Animation
- La Guadalupana — 2024 (dawn look-dev, 50+ shots, 2D/3D tracking) · Welab Animation
- Teatro Secreto — Annecy 2024 Official Selection (cleanup + light enhancement) · Taller Chucho
- Shadow of God — 2025 (visual development) · Welab Animation
- Munstro — 2027 upcoming · Taller Chucho / Guillermo del Toro

**Key 3D credits:**
- FEBRA — 2025 (3D lookdev, fiber optics display) · Freelance
- Ben, un lémur en fuga — 2022 (3D modeling + scene layout, Cinépolis theatrical) · Espíritu Santo Cine
- Ploop VFX — 2022 (camera animation + previs, Dell/Nu commercials)

**Bio text:**
"Artist with experience in Film & TV, highly skilled in the fundamental principles of cinematography. I work to place each visual element with intention — achieving scenes and compositions that capture the viewer's gaze and emotions, like stars in space."

---

## 12. TECHNICAL NOTES & GOTCHAS

1. **Nav** is a Group in Figma → implement as `position: fixed`, `top: 0`, `z-index: 100`
2. **Footer Scrim** (`481:488`) is a sibling frame, not a child of the footer → in HTML nest it as `position: absolute` inside footer container with `z-index` above video
3. **Social box** (`626:427`) and **bottom band** (`624:427`) use `layoutPositioning: ABSOLUTE` in Figma → `position: absolute` in CSS
4. **Work dropdown** (`592:427`) represents the "open" state → JS toggle, hidden by default
5. **Video backgrounds:** `object-fit: cover`, `width: 100%`, `height: 100%`
6. **Iframe embeds:** wrap in `border-radius: 16px; overflow: hidden` container. Fallback button ALWAYS visible outside iframe
7. **Poster gallery:** `display: flex; overflow-x: auto; scroll-snap-type: x mandatory`
8. **Drawer animation:** `transform: translateX(100%)` (hidden) → `translateX(0)` (open), `transition: transform 0.3s ease`
9. **Section nav cards → NOT anchor links** — they navigate to separate pages (`/vfx/`, `/3d/`, etc.)
10. **Anchor links** (`#section-name`) → `scroll-behavior: smooth` on `html`
11. **Card thick borders** (strokeWeight 10px, 20px in Figma) → `border: 10px solid var(--bg-light)` in CSS — intentional design
12. **Ticker strip:** `--bg-mid` at 12% opacity background → `background: rgba(184,136,184,0.12)`

---

## 13. CSS STARTING POINT (copy-paste ready)

```css
/* ── GOOGLE FONTS ── */
@import url('https://fonts.googleapis.com/css2?family=Asap:wght@600;700;900&family=DM+Sans:wght@300;400;500;700&display=swap');

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── TOKENS ── */
:root {
  /* Backgrounds */
  --bg-light:    #f5e8f5;
  --bg-mid:      #b888b8;

  /* Colors */
  --color-ocean: #1e6898;
  --color-iris:  #5e3878;
  --color-purple:#9b6bd0;
  --color-white: #ffffff;

  /* Utility */
  --ocean-chip:  #d0ecf8;
  --overlay:     rgba(59,34,76,0.51);

  /* Dividers */
  --divider:     rgba(94,56,120,0.15);
  --divider-ocean: rgba(30,104,152,0.4);

  /* Typography */
  --font-display: 'Asap', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  /* Layout */
  --padding-page: 80px;
  --content-max:  1760px;
  --page-width:   1920px;

  /* Border radius */
  --radius-chip: 20px;
  --radius-card: 14px;
  --radius-btn:  30px;
  --radius-sm:   12px;

  /* Transitions */
  --transition: 0.3s ease;
}

/* ── BASE ── */
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg-mid);
  color: var(--color-iris);
  font-size: 16px;
  line-height: 1.5;
}

/* ── SAFE ZONE WRAPPER ── */
.container {
  width: 100%;
  max-width: var(--page-width);
  padding-left: var(--padding-page);
  padding-right: var(--padding-page);
  margin: 0 auto;
}

/* ── COMMON COMPONENTS ── */

/* Chips */
.chip {
  display: inline-block;
  padding: 6px 14px;
  border-radius: var(--radius-chip);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 12px;
  background: var(--ocean-chip);
  color: var(--color-ocean);
  border: 1px solid var(--color-ocean);
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--radius-btn);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  background: var(--color-iris);
  color: var(--bg-light);
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--radius-btn);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  background: rgba(94,56,120,0.08);
  color: var(--color-iris);
  border: 0.5px solid var(--color-iris);
  cursor: pointer;
  text-decoration: none;
}

.btn-ocean {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--radius-btn);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  background: var(--color-ocean);
  color: var(--bg-light);
  border: none;
  cursor: pointer;
  text-decoration: none;
}

/* Dividers */
.divider {
  width: 100%;
  height: 1px;
  background: var(--divider);
}

/* Section footer */
.section-footer {
  background: var(--color-iris);
  padding: 48px var(--padding-page);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Drawer */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background: rgba(245,232,245,0.97);
  border-left: 0.5px solid var(--color-iris);
  transform: translateX(100%);
  transition: transform var(--transition);
  z-index: 200;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.drawer.open {
  transform: translateX(0);
}
```

---

*Document version: 2.0 — August 2026*
*Design system extracted from Figma frame `486:984` by scanning all nodes*
*Figma file key: `8qxW6kN2M4D5pM5mWnk5pm`*
*Previous DS tokens superseded by this document*
