# Agent Notes — Lakshya 2047

Working notes for AI agents continuing work on this repo. Full-stack now: React frontend + Django backend.

## What this is

Marketing site + booking platform for Lakshya 2047 (Parul University labs program). Students browse labs, request a booking with a reason, admin approves/rejects. Admin can also add/remove labs and control which ones appear on the homepage.

Frontend was built section-by-section from screenshots the user pasted inline (no design files in-repo) — match pixel-by-pixel when revisiting a section, ask for the reference again if unsure.

## Architecture

- **Frontend** (`Frontend/`): React 18 + TypeScript + Vite + Wouter, plain CSS per component (no Tailwind/styled-components).
- **Backend** (`backend/`): Django 4.2 LTS + DRF, MySQL/MariaDB, token auth.
- Frontend talks to backend via `src/lib/api.ts` (fetch wrapper, `VITE_API_URL` from `Frontend/.env`).

## Backend specifics

- **Django pinned to 4.2**, not 5.2 — the dev MariaDB is 10.4.32, Django 5.2 requires MariaDB 10.5+. Don't upgrade Django without checking MariaDB version first (`django-filter` etc. will try to drag Django back to 5.x — pin with `"django-filter<24"`).
- DB: `lakshay` / `root` / no password, configured via `backend/.env` (see `.env.example`).
- Models in `core/models.py`: `Lab`, `Booking`, `TeamMember`, `Partner`.
  - `Lab.is_permanent` — the 12 seeded labs, blocked from deletion (API 403 + Django admin `has_delete_permission`).
  - `Lab.featured` — controls homepage preview (`LabsSection.tsx` fetches `?featured=true`).
  - `Booking.reason` — required text field, admin approval gate. `status`: pending/approved/rejected.
- Auth: DRF TokenAuthentication. `core/views.py` has `RegisterView`/`LoginView`/`MeView` (custom, not using DRF's built-in obtain_auth_token).
- Write permissions on `Lab`: `IsAdminOrReadOnly` custom permission class — anyone reads, only `is_staff` writes.
- Booking date validated server-side AND client-side: today → +14 days only (`BookingSerializer.validate_date`).
- Seed commands: `python manage.py seed_labs` (12 permanent labs, idempotent via `update_or_create`), `seed_test_student` (creates `student1`/`Student@123`).
- Test admin: `lakshay` / `Lakshay@123` (superuser, created via `createsuperuser --noinput`).

## Frontend specifics

- **Source of truth for labs is now the backend**, not a static array. `src/data/labsData.ts` only holds `IMAGE_FALLBACK` (slug → bundled image) and `PLACEHOLDER_IMAGE` — used when a backend `Lab.image` is null. `src/hooks/useLabs.ts` is the fetch hook (`useLabs()`, `getLabImage(lab)`).
- **Slug mismatch gotcha**: Django's `slugify("AR/VR LAB")` → `arvr-lab`, NOT `ar-vr-lab` (JS slugify would produce the latter). Always verify real slugs via `GET /api/labs/` before hardcoding fallback-image keys.
- Auth state: `src/context/AuthContext.tsx`, persisted to `localStorage` (`token`, `user` JSON). `useAuth()` hook everywhere else.
- Role-based redirect after login/register: `user.is_staff` → `/admin-dashboard`, else → `/dashboard`.
- Routing: Wouter only. Routes: `/`, `/labs`, `/labs/:slug`, `/login`, `/register`, `/dashboard`, `/admin-dashboard`, `/admin-dashboard/labs`.
- `ScrollToTop.tsx` mounted at app root — resets scroll on every route change (Wouter doesn't do this automatically).
- Dashboards share `DashboardLayout.tsx` (sidebar shell, role-aware nav). Student and Admin dashboards are separate page components but same visual shell.
- Animations: `useInView` hook + `.reveal`/`.stagger` classes from `src/styles/animations.css`. No animation library.
- Navbar: fixed position, transparent over hero video on `/` only, glassmorphism (`blur(16px) saturate(180%)`) on scroll or any other route.
- **CSS linter "hints"** about `transform`/`opacity` in `@keyframes` triggering "Composite/Paint" are false-positive noise — these are exactly the GPU-accelerated properties that should be animated. Ignore them.

## Known placeholder/incomplete content

- **Ethnotech Team** (`EthnotechTeam.tsx`): 2 Campus Manager + 10 Trainer cards are still dashed-border ghost placeholders, hardcoded client-side — not wired to `TeamMember` model yet despite the model existing and supporting `group='campus_manager'`/`'trainer'`. Next step if asked: build a fetch + admin CRUD like was done for Labs.
- **Partners** (`Partners.tsx`) and **MyTeam** (`MyTeam.tsx` leadership cards) — same situation: `Partner`/`TeamMember` backend models exist with read-only viewsets, but frontend still renders hardcoded arrays, not fetched.
- **Navbar links**: "Insights", "Partners", "My Team" still point to `#`.
- Newly admin-created labs default `available: false` (DRF multipart quirk) — admin must explicitly toggle Available ON via Manage Labs after creating.

## Running both servers

```powershell
# Backend
cd backend
./venv/Scripts/python.exe manage.py runserver 8000

# Frontend
cd Frontend
npm run dev
```

Both were left running during development — check `netstat -ano | grep :8000` / `:5173` before starting new instances.

## Asset folders

- `Frontend/src/assets/Labs/` — 12 lab photos + `Hero.png` (now reused as generic placeholder image for labs without photos), filenames descriptive (e.g. `ABB labb.png` — typo "labb" intentional/as-provided).
- `Frontend/src/assets/Logo/` — `parul.png`, `NSDC.png`, `ethnotech.png`.
- `Frontend/src/assets/team/` — 3 leadership photos, filenames match person names exactly.
- `Frontend/src/assets/hero video.mp4` — hero background (note the space in filename, intentional).
