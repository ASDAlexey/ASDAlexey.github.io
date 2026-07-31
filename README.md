# Alexey Popov — Portfolio

**Tech Lead / Senior Angular Developer (NgRx)** · 14+ years · Web (SSR) · Smart TV · Mobile (Ionic) · Desktop (Tauri/Rust)

[![CI / Deploy](https://github.com/ASDAlexey/ASDAlexey.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/ASDAlexey/ASDAlexey.github.io/actions/workflows/ci.yml)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Tests](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-22-dd0031?logo=angular&logoColor=white)
![Lighthouse](https://img.shields.io/badge/Lighthouse-A11y%20·%20SEO%20·%20BP%20100-success)

🌐 **Live:** https://asdalexey.github.io/ &nbsp;·&nbsp; 🇬🇧 [/en/](https://asdalexey.github.io/en/) &nbsp;·&nbsp; 🇷🇺 [/ru/](https://asdalexey.github.io/ru/)

This repository is my personal portfolio — and the site itself is the demo: a production-grade **Angular 22**
application, fully bilingual, prerendered for SEO, and covered by tests at 100%.

---

## Highlights

- **Angular 22** — standalone components, **zoneless** change detection, signals, `inject()`, strict TypeScript, OnPush everywhere.
- **Bilingual (EN / RU)** — `@angular/localize` with prerendered `/en/` and `/ru/` builds, language switcher, browser-language redirect.
- **SEO-first** — static prerendering (SSG), per-locale meta/Open Graph/Twitter, `hreflang` + canonical, JSON-LD (`Person` / `WebSite` / `ProfilePage`), `sitemap.xml`, `robots.txt`, OG image.
- **Screenshot galleries** — Swiper carousel in a native `<dialog>`, loaded as its own chunk only when a gallery is opened. Screenshots are re-encoded to AVIF + WebP by a build script that also writes the locale manifest, so a project shot in one language still has a gallery in the other.
- **Pointer-led motion** — a comet trail that inverts the page beneath it (`mix-blend-mode: difference`), an accent that floods the scroll-top button from the side the cursor arrived on, and a hover wave through the footer's letters. All of it sleeps when the pointer does, and none of it binds a listener without a fine pointer or under `prefers-reduced-motion`.
- **Scroll-driven animation** — the career rail draws itself and lights each stop as its runner arrives, the CI pipeline flares node by node; both run on CSS scroll timelines with no scroll listener anywhere.
- **100% test coverage** — Vitest + my own [`vitest-auto-spy`](https://www.npmjs.com/package/vitest-auto-spy) library (dogfooded).
- **Lighthouse** — Accessibility, Best Practices and SEO at **100**; performance tuned with self-hosted fonts, inlined critical CSS and zero render-blocking third-party requests.
- **Quality gates** — ESLint (+ custom local rules), Prettier, Stylelint, Husky hooks, madge (circular deps), jscpd.
- **CI/CD** — GitHub Actions builds both locales and deploys to GitHub Pages.

## Tech stack

`Angular 22` · `TypeScript` · `RxJS` · `SCSS` · `@angular/localize` · `Swiper` · `Vitest` ·
`vitest-auto-spy` · `sharp` · `ESLint` · `Prettier` · `Stylelint` · `GitHub Actions` · `Bun`

## Local development

```bash
bun install
bun run start          # http://localhost:4200/ (source locale, EN)
bun run start:ru       # Russian locale
```

## Common scripts

```bash
bun run build          # production build, both locales, prerendered
bun run assemble       # add redirect / sitemap / robots / og-image to dist
bun run images:projects      # re-encode project screenshots, rewrite the gallery manifest
bun run test:coverage  # Vitest with 100% coverage gate
bun run check:code-quality   # prettier + eslint + stylelint
bun run madge          # circular-dependency check
```

## Project structure

```
src/app/
├── core/            # models + framework services (SEO, structured data, locale, galleries)
├── features/portfolio/
│   ├── sections/    # hero · about · experience · projects
│   └── portfolio.component
└── shared/
    ├── components/  # nav · footer · language-switcher · cards · icon · gallery-lightbox · cursor
    ├── directives/  # pointer-track · scroll-reveal · letter-reveal · word-reveal · letter-hover
    └── data/        # locale-independent content + the generated gallery manifest
src/locale/          # messages.ru.xlf
public/my-projects/  # project screenshots, <slug>/<locale>/, AVIF + WebP
scripts/             # image pipeline · dist assembly · resume renderer
seo/                 # robots.txt · sitemap.xml · root redirect
docs/                # design notes (motion references and what was built from them)
```

### Project screenshots

Drop the originals into `public/my-projects/<slug>/<en|ru>/` in any raster format and run
`bun run images:projects`. The script re-encodes each one to AVIF + WebP (a full-size slide and a
narrow thumb for the card tile), drops the heavy sources, and rewrites
`src/app/shared/data/project-gallery.generated.ts` — including the locale fallback, so a project
shot only in Russian still has a gallery in the English build. Re-running it does not re-compress
what it already converted. Point a project at its folder with `gallery: '<slug>'` in
`portfolio.data.ts`, and optionally name the tile's shot with `cover: '<file-stem>'`.

## Deployment

Pushing to `main` triggers [`.github/workflows/ci.yml`](.github/workflows/ci.yml): after lint, tests
and a 100% coverage gate pass, it builds the EN + RU locales, assembles the site root, and publishes to
GitHub Pages (source: GitHub Actions).

## Contact

- **GitHub:** [@ASDAlexey](https://github.com/ASDAlexey)
- **LinkedIn:** [alexey-popov](https://www.linkedin.com/in/alexey-popov-7988a874/)
- **Email:** ASDAlexey@yandex.ru
- **Location:** Taganrog, Russia · UTC+3 · remote-first
