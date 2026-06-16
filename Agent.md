# Agent Notes — Lakshya 2047 Frontend

Working notes for AI agents continuing work on this repo.

## What this is

Marketing site for Lakshya 2047 (Parul University labs program). Built section-by-section from Figma-style screenshots provided by the user — each component was matched pixel-by-pixel to a shared image, not built from a spec doc.

## Conventions established

- **No Tailwind, no styled-components** — plain CSS per component, co-located (`Component.tsx` + `Component.css`), imported into `App.tsx`.
- **Dark/light alternating sections** — Hero (video, dark overlay) → Ticker (dark) → Labs (white) → Insights (dark `#0a0a0a`) → Partners (light `#fafafa`) → Team (dark) → Ethnotech (dark) → Footer (darkest `#080808`).
- **Animations**: `useInView` hook (`src/hooks/useInView.ts`) + `.reveal` / `.stagger` classes from `src/styles/animations.css`. No Framer Motion, no animation libs — pure CSS keyframes + IntersectionObserver.
- **Routing**: Wouter, not React Router. Two routes only: `/` and `/labs`.
- **Navbar behavior**: fixed position, transparent over hero video, glassmorphism (`blur(16px) saturate(180%)` + white bg) when scrolled past 20px OR when on any route other than `/`.
- **CSS linter "hints"** about `transform`/`opacity` in `@keyframes` triggering "Composite/Paint" are false-positive noise — these are the GPU-accelerated properties, exactly what should be animated. Ignore them, don't refactor away from them.

## Known placeholder/incomplete content

- **Ethnotech Team** (`EthnotechTeam.tsx`): 2 Campus Manager + 10 Trainer cards are dashed-border ghost placeholders with no real names or photos. Replace `campusManagers`/`trainers` arrays with real data + images from `src/assets/team/` (or a new subfolder) when available.
- **Navbar links**: "Insights", "Partners", "My Team" still point to `#` — only "Labs" routes to `/labs`. Wire up anchor scroll or routes when those sections need direct linking.
- **Hero video**: `src/assets/hero video.mp4` (note the space in filename — intentional, matches asset as provided).

## Source images for sections

Each major section was built to match a screenshot the user pasted inline (not saved to disk) — no design files exist in-repo. If a section needs revisiting, ask the user for the reference screenshot again rather than guessing from current code.

## Asset folders

- `src/assets/Labs/` — 12 lab photos + `Hero.png` (unused now, replaced by video), all named descriptively (e.g. `ABB labb.png` — note typo "labb" is intentional/as-provided).
- `src/assets/Logo/` — `parul.png`, `NSDC.png`, `ethnotech.png`.
- `src/assets/team/` — 3 leadership photos, filenames match person names exactly.
