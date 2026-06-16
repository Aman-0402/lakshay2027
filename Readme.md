# Lakshya 2047 — Centre of Future Skills

Frontend marketing site for Lakshya 2047, Parul University's innovation labs program.

## Tech Stack

- React 18 + TypeScript
- Vite
- Wouter (routing)
- Plain CSS (no Tailwind/styled-components)

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx / .css        # Transparent → glassmorphism on scroll/route
│   │   ├── Hero.tsx / .css          # Video background, ripple "Explore" button
│   │   ├── HeroTitle.tsx / .css     # Interactive cursor-repel title text
│   │   ├── LabTicker.tsx / .css     # Scrolling marquee of lab names
│   │   ├── LabsSection.tsx / .css   # Landing page labs preview (3 cards)
│   │   ├── PlatformInsights.tsx     # Stats section (dark)
│   │   ├── Partners.tsx             # Partner logos grid
│   │   ├── MyTeam.tsx                # Leadership team cards
│   │   ├── EthnotechTeam.tsx        # Campus managers + trainers placeholders
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── Labs.tsx / .css          # Full /labs page — filters, search, all 12 labs
│   ├── hooks/
│   │   └── useInView.ts             # IntersectionObserver hook for scroll-reveal
│   ├── styles/
│   │   └── animations.css           # Shared fadeUp/stagger keyframes
│   ├── assets/
│   │   ├── Labs/                    # Lab photos (16:9)
│   │   ├── Logo/                    # Partner logos
│   │   ├── team/                    # Team member photos
│   │   └── hero video.mp4
│   └── App.tsx                      # Routes: "/" (home) and "/labs"
```

## Commands

```powershell
cd Frontend
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Pages

- **`/`** — Hero (video + interactive title) → Lab ticker → Labs preview → Platform Insights → Partners → My Team → Ethnotech Team → Footer
- **`/labs`** — Full lab directory with category filters + search

## Notes

- Navbar is `position: fixed`, transparent on home hero, switches to glassmorphism (blur + white bg) on scroll or on any non-home route.
- All sections use `useInView` + CSS classes (`reveal`, `stagger`) for scroll animations — no animation library.
- Ethnotech Team section has placeholder cards (2 Campus Managers, 10 Trainers) pending real names/photos.
