# Digital Lab — Aymane El Khadraoui Developer Portfolio

A developer portfolio styled as an engineer's technical workstation ("Digital Lab") for **Aymane El Khadraoui**, Full Stack Developer seeking a **Developer Internship**.

- **Focus:** Java EE, Laravel, Next.js
- **Location:** Beni Mellal, Morocco
- **Identity:** Recruiter-friendly, strictly factual, high accessibility (WCAG 2.2 AA), zero tracking, and static generation.

---

## 1. Design & Engineering Concept: "Digital Lab"

- **Workstation Aesthetic:** Monospace headings and spec identifiers, subtle graph-paper grid background (`linear-gradient` grid), 1px borders, and status-bar metadata chips.
- **Strictly Factual & Honest:** No invented metrics, employers, user counts, or code excerpts. Missing optional fields (e.g. absent repo URLs or screenshots) are omitted gracefully with zero placeholder text.
- **Theme Support:** Follows visitor's system setting only via `prefers-color-scheme` (no manual toggle). Polished in both Light (`#F6F7F5`) and Dark (`#0E1116`) modes with WCAG AA/AAA compliant contrast.
- **Typography:**
  - **Headings & UI Chrome:** `JetBrains Mono` (`next/font/google`) — Chosen for technical precision, distinctive character forms, and clean tabular readability for spec sheets and badges.
  - **Body Copy:** `Inter` (`next/font/google`) — Chosen for optimal readability, high x-height, and open apertures for dense technical project descriptions across screen sizes.
- **Accessibility & Motion:**
  - Skip-to-content link, semantic HTML landmarks (`header`, `main`, `footer`, `section`, `nav`), visible focus rings.
  - Wrapped in `MotionConfig` with `reducedMotion="user"` plus CSS `@media (prefers-reduced-motion: reduce)` overrides to disable all animations for users requesting reduced motion.
  - All interactive touch targets are at least 44×44px.

---

## 2. Technology Stack

- **Framework:** Next.js 15 (App Router, static site generation)
- **Library:** React 19
- **Type Safety:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4
- **Animation:** Motion (`motion` package v12)
- **Testing:**
  - Unit & Integration: Vitest + React Testing Library (`tests/unit/`)
  - End-to-End: Playwright smoke suite (`tests/e2e/`)
- **Code Quality:** ESLint (`next/core-web-vitals`, `next/typescript`), Prettier (`prettier-plugin-tailwindcss`)
- **CI/CD:** GitHub Actions workflow (`.github/workflows/ci.yml`)

---

## 3. Project Structure

```
myPortfolio/
├── .github/workflows/ci.yml    # Continuous Integration workflow
├── app/
│   ├── globals.css             # Theme variables, grid background, accessibility styles
│   ├── layout.tsx              # Root layout with fonts, header, footer, palette, MotionProvider
│   ├── not-found.tsx           # Custom 404 specification error page
│   ├── page.tsx                # Single-page home (Hero, Projects, Skills, About, Contact)
│   ├── projects/[slug]/page.tsx# Statically generated case-study routes
│   ├── robots.ts               # Robots.txt generator
│   └── sitemap.ts              # Sitemap.xml generator
├── components/
│   ├── architecture/
│   │   └── ArchitectureExplorer.tsx # Interactive SVG/HTML topology diagram & detail panel
│   ├── palette/
│   │   └── CommandPalette.tsx       # Accessible search dialog (Ctrl/Cmd+K)
│   ├── projects/
│   │   └── ProjectCard.tsx          # Featured, medium, and compact card renderer
│   ├── sections/
│   │   ├── AboutSection.tsx         # Verified education, languages, and activities
│   │   ├── ContactSection.tsx       # Direct mailto, copy email, GitHub, LinkedIn, CV
│   │   ├── Hero.tsx                 # Status strip, titles, and 3 primary actions
│   │   ├── ProjectsSection.tsx      # Grouped project cards
│   │   └── SkillsSection.tsx        # CV skill groups with verified evidence links
│   └── ui/
│       ├── Badge.tsx                # Status and tag badge component
│       ├── Footer.tsx               # Semantic footer with metadata
│       ├── Header.tsx               # Brand, anchor navigation, command palette button
│       ├── MotionProvider.tsx       # Reduced-motion provider
│       └── SectionHeader.tsx        # Numbered section header component
├── content/
│   ├── architecture/                # Topology data for My-City-Life and Sprintly
│   ├── index.ts                     # Content helpers and central exports
│   ├── profile.ts                   # Verified personal, education, and language data
│   ├── projects.ts                  # All 6 verified project definitions
│   ├── skills.ts                    # Grouped CV skills with project evidence mappings
│   └── types.ts                     # Strict TypeScript data models
├── lib/
│   ├── fonts.ts                     # JetBrains Mono and Inter font definitions
│   └── palette.ts                   # Palette event dispatchers
├── public/
│   ├── cv/                          # Place Aymane_El_Khadraoui_CV_EN.pdf here
│   └── projects/                    # Optional project screenshots directory
├── tests/
│   ├── e2e/smoke.spec.ts            # Playwright smoke test suite
│   ├── setup.ts                     # Vitest environment setup
│   └── unit/                        # Content, card, palette, and architecture tests
├── CONTENT_TODO.md                  # Checklist of missing assets/content to supply
├── next.config.ts                   # Security headers, CSP, and missing CV warning check
└── tailwind.config.ts               # Theme tokens mapped to CSS variables
```

---

## 4. Setup & Running Locally

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Installation

```bash
npm install
```

### Scripts

| Command              | Action                                                                 |
| :------------------- | :--------------------------------------------------------------------- |
| `npm run dev`        | Launch local development server at `http://localhost:3000`             |
| `npm run build`      | Compile optimized production build and statically pre-render all pages |
| `npm run start`      | Serve production build locally at `http://localhost:3000`              |
| `npm run lint`       | Run ESLint across codebase                                             |
| `npm run typecheck`  | Run TypeScript compiler type checking without emit                     |
| `npm run format`     | Verify Prettier code formatting                                        |
| `npm run format:fix` | Fix code formatting with Prettier                                      |
| `npm test`           | Run Vitest unit test suite (35 tests)                                  |
| `npm run test:watch` | Run Vitest in interactive watch mode                                   |
| `npm run test:e2e`   | Run Playwright end-to-end smoke tests against web server               |

---

## 5. Content Editing Guide

All site content is stored in typed data files under `content/` and is validated at build and test time:

1. **Profile Data (`content/profile.ts`)**:
   - Update name, contact email, social profile URLs, education entries, languages, and activities.
2. **Projects Data (`content/projects.ts`)**:
   - Update project summaries, stack tags, implemented feature lists, roadmap items, repository URLs, or demo URLs.
   - Any missing optional field (`repoUrl`, `demoUrl`, `role`, `decisions`, `screenshots`) should remain `undefined`; the UI will gracefully omit them without rendering placeholder text.
3. **Architecture Diagrams (`content/architecture/`)**:
   - For My-City-Life and Sprintly, node IDs, labels, descriptions, and directional connections (`linksTo`) are managed here.
4. **Skills Data (`content/skills.ts`)**:
   - Grouped into: `Back end`, `Front end`, `Databases`, `DevOps and tools`, and `Practices`.
   - `evidenceProjectSlug` links a skill to its matching case study.
5. **Missing Content Checklist (`CONTENT_TODO.md`)**:
   - Consult `CONTENT_TODO.md` in the repository root for the full list of items awaiting user-supplied assets.

---

## 6. Deployment Guide (Vercel)

The portfolio is structured for zero-configuration static deployment on Vercel:

1. Push your repository to GitHub (or GitLab/Bitbucket).
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `myPortfolio` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Under **Environment Variables**, set:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app` (or your custom domain)
6. Click **Deploy**. Vercel will run `npm run build` and serve the statically generated site on its global edge network with the pre-configured security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
