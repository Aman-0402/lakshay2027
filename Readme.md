# Lakshya 2047 — Centre of Future Skills

Full-stack site for Lakshya 2047, Parul University's innovation labs program. Public marketing pages, student lab-booking flow with admin approval, and admin lab management.

## Tech Stack

**Frontend** (`Frontend/`)
- React 18 + TypeScript, Vite
- Wouter (routing)
- Plain CSS (no Tailwind/styled-components)

**Backend** (`backend/`)
- Django 4.2 LTS + Django REST Framework
- MySQL/MariaDB
- Token authentication

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx / .css        # Transparent → glassmorphism on scroll/route
│   │   ├── Hero.tsx / .css          # Video background, ripple "Explore" button
│   │   ├── HeroTitle.tsx / .css     # Interactive cursor-repel title text
│   │   ├── LabTicker.tsx / .css     # Scrolling marquee of lab names
│   │   ├── LabsSection.tsx / .css   # Landing page labs preview (featured labs, from API)
│   │   ├── PlatformInsights.tsx     # Stats section (dark)
│   │   ├── Partners.tsx             # Partner logos grid
│   │   ├── MyTeam.tsx               # Leadership team cards
│   │   ├── EthnotechTeam.tsx        # Campus managers + trainers placeholders
│   │   ├── DashboardLayout.tsx      # Shared sidebar shell for student/admin dashboards
│   │   ├── ScrollToTop.tsx          # Resets scroll position on route change
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Labs.tsx / .css          # Full /labs directory — filters, search (from API)
│   │   ├── LabDetail.tsx / .css     # Single lab page + booking request form
│   │   ├── Login.tsx / Register.tsx # Auth pages (Auth.css)
│   │   ├── StudentDashboard.tsx     # Student: stats, upcoming sessions, booking history
│   │   ├── AdminDashboard.tsx       # Admin: stats, approve/reject bookings
│   │   └── ManageLabs.tsx           # Admin: add/delete labs, toggle featured/available
│   ├── context/
│   │   └── AuthContext.tsx          # Login/register/logout, persisted to localStorage
│   ├── hooks/
│   │   ├── useInView.ts             # IntersectionObserver hook for scroll-reveal
│   │   └── useLabs.ts               # Fetches labs from backend, image fallback resolver
│   ├── lib/
│   │   └── api.ts                   # fetch wrapper, token auth header, backend base URL
│   ├── data/
│   │   └── labsData.ts              # Bundled image fallback map (slug → image) only
│   ├── styles/
│   │   └── animations.css           # Shared fadeUp/stagger keyframes
│   ├── assets/
│   │   ├── Labs/                    # Lab photos (16:9)
│   │   ├── Logo/                    # Partner logos
│   │   ├── team/                    # Team member photos
│   │   └── hero video.mp4
│   └── App.tsx                      # All routes + AuthProvider

backend/
├── config/                          # Django project (settings, urls)
├── core/
│   ├── models.py                    # Lab, Booking, TeamMember, Partner
│   ├── serializers.py
│   ├── views.py                     # ViewSets + auth views (Register/Login/Me)
│   ├── admin.py                     # Django admin, bulk approve/reject actions
│   └── management/commands/
│       ├── seed_labs.py             # 12 permanent labs (idempotent)
│       └── seed_test_student.py     # student1 / Student@123
└── manage.py
```

## Commands

```powershell
# Backend
cd backend
./venv/Scripts/python.exe manage.py runserver 8000
./venv/Scripts/python.exe manage.py seed_labs
./venv/Scripts/python.exe manage.py migrate

# Frontend
cd Frontend
npm install
npm run dev      # http://localhost:5173
npm run build
```

Backend `.env` (see `.env.example`): DB credentials, `DEBUG`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`.
Frontend `.env`: `VITE_API_URL=http://127.0.0.1:8000/api`.

## Pages

- **`/`** — Hero (video + interactive title) → Lab ticker → Featured labs preview → Platform Insights → Partners → My Team → Ethnotech Team → Footer
- **`/labs`** — Full lab directory, category filters + search, live from API
- **`/labs/:slug`** — Lab detail + booking request form (date locked to next 14 days, reason required)
- **`/login`, `/register`** — Auth, redirects by role on success
- **`/dashboard`** — Student: booking stats, upcoming approved sessions, full history
- **`/admin-dashboard`** — Admin: booking stats, approve/reject requests, search/filter
- **`/admin-dashboard/labs`** — Admin: add new labs, toggle featured/available, delete non-permanent labs

## Booking flow

1. Student registers/logs in → browses `/labs` → opens a lab → submits booking (date + reason)
2. Backend validates date is within 14 days, status set to `pending`
3. Admin reviews on `/admin-dashboard` (or Django admin `/admin/`) → approve/reject
4. Student sees updated status on `/dashboard`

## Test accounts

- Admin: `lakshay` / `Lakshay@123`
- Student: `student1` / `Student@123`

## Notes

- The 12 original labs are `is_permanent` — visible everywhere, cannot be deleted (API + Django admin both block it). Admin can add new ones freely and delete those.
- `featured` flag on `Lab` controls homepage preview; toggle from `/admin-dashboard/labs`.
- Ethnotech Team and Partners/MyTeam sections are still frontend-hardcoded placeholders, not yet wired to their (already-existing) backend models.
