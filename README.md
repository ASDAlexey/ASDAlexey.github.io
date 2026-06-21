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
- **100% test coverage** — Vitest + my own [`vitest-auto-spy`](https://www.npmjs.com/package/vitest-auto-spy) library (dogfooded).
- **Lighthouse** — Accessibility, Best Practices and SEO at **100**; performance tuned with self-hosted fonts, inlined critical CSS and zero render-blocking third-party requests.
- **Quality gates** — ESLint (+ custom local rules), Prettier, Stylelint, Husky hooks, madge (circular deps), jscpd.
- **CI/CD** — GitHub Actions builds both locales and deploys to GitHub Pages.

## Tech stack

`Angular 22` · `TypeScript` · `RxJS` · `SCSS` · `@angular/localize` · `Vitest` · `vitest-auto-spy` ·
`ESLint` · `Prettier` · `Stylelint` · `GitHub Actions` · `Bun`

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
bun run test:coverage  # Vitest with 100% coverage gate
bun run check:code-quality   # prettier + eslint + stylelint
bun run madge          # circular-dependency check
```

## Project structure

```
src/app/
├── core/            # models + framework services (SEO, structured data, locale)
├── features/portfolio/
│   ├── sections/    # hero · about · experience · projects
│   └── portfolio.component
└── shared/
    ├── components/  # nav · footer · language-switcher · cards · icon
    └── data/        # locale-independent content
src/locale/          # messages.ru.xlf
seo/                 # robots.txt · sitemap.xml · root redirect
```

## Deployment

Pushing to `main` triggers [`.github/workflows/ci.yml`](.github/workflows/ci.yml): after lint, tests
and a 100% coverage gate pass, it builds the EN + RU locales, assembles the site root, and publishes to
GitHub Pages (source: GitHub Actions).

## Contact

- **GitHub:** [@ASDAlexey](https://github.com/ASDAlexey)
- **LinkedIn:** [alexey-popov](https://www.linkedin.com/in/alexey-popov-7988a874/)
- **Email:** ASDAlexey@yandex.ru
- **Location:** Taganrog, Russia · UTC+3 · remote-first
