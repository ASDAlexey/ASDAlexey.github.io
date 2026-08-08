import { Credential, Experience, LocaleCode, Project, SocialLink, Stat, Testimonial } from '@core/models/portfolio.interface';

export const PROFILE = {
  name: $localize`:@@hero.name:Alexey Popov`,
  handle: 'ASDAlexey',
  email: 'ASDAlexey@yandex.ru',
  telegram: 'https://t.me/ASDAlexey',
  max: 'https://max.ru/u/f9LHodD0cOIvsoWjpCYHxdF8aiJ7csO8bFyeafox3xVes4OWbQgToULJSRE',
  github: 'https://github.com/ASDAlexey',
  linkedin: 'https://www.linkedin.com/in/alexey-popov-7988a874/',
  linkedinRecommendations: 'https://www.linkedin.com/in/alexey-popov-7988a874/details/recommendations/?detailScreenTabIndex=0',
  // Root-absolute: both PDFs live in `static/` and are copied to the site root once,
  // not into `/en/` and `/ru/` (see scripts/assemble-dist.mjs).
  resume: $localize`:@@hero.resume.file:/Alexey-Popov-Resume.pdf`,
  siteUrl: 'https://asdalexey.github.io',
  role: $localize`:@@hero.role:Tech Lead & Senior Frontend Developer`,
  eyebrow: $localize`:@@hero.eyebrow:Angular · every platform`,
  hint: $localize`:@@hero.hint:Taganrog, Russia · UTC+3 · remote only`,
} as const;

export const PLATFORMS: readonly string[] = ['Web · SSR', 'Smart TV', 'Mobile · Ionic', 'Desktop · Tauri/Rust'];

export const STATS: readonly Stat[] = [
  { value: '14', suffix: '+', caption: $localize`:@@stat.years:years shipping` },
  { value: '4', suffix: '', caption: $localize`:@@stat.platforms:platforms shipped` },
  // A range rather than a round number, and both ends are real: the main commercial app is
  // gated at 89% in CI, the greenfield projects and the shared libraries at 100%. The card
  // animates to the low end and shows the span beside it.
  { value: '89', suffix: '–100%', caption: $localize`:@@stat.coverage:test coverage` },
  { value: '70', suffix: '+', caption: $localize`:@@stat.interviews:interviews run` },
];

export const SOCIALS: readonly SocialLink[] = [
  { label: 'GitHub', href: PROFILE.github, icon: 'github' },
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: 'linkedin' },
  { label: 'Telegram', href: PROFILE.telegram, icon: 'telegram' },
  { label: 'MAX', href: PROFILE.max, icon: 'max' },
  { label: $localize`:@@social.resume:Résumé`, href: PROFILE.resume, icon: 'resume', download: true },
];

/** Education and languages — the résumé's closing facts, kept as one line under the About copy. */
export const CREDENTIALS: readonly Credential[] = [
  {
    label: $localize`:@@about.education.label:Education`,
    value: $localize`:@@about.education.value:Taganrog State Pedagogical Institute (A. P. Chekhov) — Physics & Mathematics, 2004—2009 · GPA 4.97 / 5`,
  },
  {
    label: $localize`:@@about.languages.label:Languages`,
    value: $localize`:@@about.languages.value:Russian — native · English — B1, working proficiency across 8+ years with US / EU teams`,
  },
];

export const EXPERIENCES: readonly Experience[] = [
  {
    role: $localize`:@@exp.current.role:Tech Lead / Senior Angular Developer`,
    company: null,
    location: $localize`:@@exp.current.loc:Remote`,
    period: $localize`:@@exp.current.period:2023 — Present`,
    description: $localize`:@@exp.current.desc:Architecting Angular 22 applications end-to-end — zoneless, signals, standalone and OnPush throughout, with NgRx Signals stores. Designed a type-safe API layer: an Orval client auto-generated from OpenAPI with zod runtime validation — signal-based httpResource for reads, HttpClient services for mutations. Built a self-authored Nx monorepo of shared Angular libraries (design-system tokens from Figma, theming, inline-SVG icons, notifications, feature flags, dev-auth tooling), auto-versioned and idempotently published to a private GitLab Package Registry. Quality enforced by a custom ESLint plugin (private #fields, inject()-only DI, RxJS hygiene), a multi-plugin Prettier stack, 100% test coverage and duplication / circular-dependency gates in CI.`,
    // Each bullet is written as action + scope + result: the responsibility is what a screen
    // matches against, the number at the end is what makes it worth reading.
    //
    // The two flagship products lead, because a name a reader already knows buys more attention
    // than any metric underneath it. The employer stays unnamed — the products are what matter
    // here, and naming them costs nothing that naming the company would.
    highlights: [
      $localize`:@@exp.current.proj1:KION (MTS) — a streaming platform with ~4M web users and ~100k Smart TV devices. Shipped SSR web features (age-gating and PIN compliance, profile, subscriptions, legal consent) and the whole gamification vertical — achievements, levels, leaderboards, fortune wheel — to web and Smart TV, inside an Nx monorepo of 5 apps and 81 libraries.`,
      $localize`:@@exp.current.proj2:Enterprise 3D digital-twin and geospatial platform — sole architect of a multi-tenant Angular 22 app: 286 components, ~107k lines of TypeScript, real-time pixel streaming, deployed to 8+ environments from a single codebase.`,
      $localize`:@@exp.current.hl1:Inherited a frontend team of one and built it out across three directions — my own group of 4–5, a reporting vertical of 5 and an international one of 2 — hiring every engineer myself over 70+ interviews.`,
      $localize`:@@exp.current.hl2:Own the release for all three frontend teams: I cut the epic, the teams raise the MRs, I merge once the approvals land — often as one of the reviewers. Reviewed an external contractor team's code for a year, then hired the senior who took it over.`,
      $localize`:@@exp.current.hl3:Introduced unit testing to a project sitting at 0% coverage and taught 20+ developers to write it — the main app now runs ~10,400 unit tests at 89% coverage gated in CI, and the greenfield projects sit at 100%.`,
      $localize`:@@exp.current.hl4:Own production health — Sentry, performance metrics and the regression runs for the whole project. Defects reaching production fell from the 10–12 per sprint I inherited to 2–3.`,
      $localize`:@@exp.current.hl5:Built the GitLab CI/CD from scratch on Kubernetes runners — reusable templates shared across projects, nx affected, three-way sharding that clears 10,400 tests in ~3 minutes, and coverage, duplication, circular-dependency and custom approval gates, with a custom ESLint plugin enforcing the conventions.`,
      $localize`:@@exp.current.hl6:Published an Nx monorepo of 13 shared Angular libraries — design-system tokens from Figma, theming, SVG icons, notifications, feature flags, dev-auth, a generated Orval API client and test helpers — auto-versioned into a private GitLab registry and consumed by 3 apps.`,
    ],
    tags: ['Angular', 'NgRx', 'Signals', 'RxJS', 'TypeScript', 'CI/CD', 'Jira', 'Confluence'],
  },
  {
    role: $localize`:@@exp.fifthkind.role:Tech Lead / Senior Frontend`,
    company: 'The 5th Kind',
    location: $localize`:@@exp.fifthkind.loc:US, Remote`,
    period: '2019 — 2023',
    description: $localize`:@@exp.fifthkind.desc:5th Kind CORE (Sohonet) — the distributed digital-asset management platform film and TV production runs on: ~10k users, with Marvel, Disney, Warner Bros., Epic Games and Universal among its clients.`,
    highlights: [
      $localize`:@@exp.fifthkind.hl1:Led the migration to a layered NgRx architecture over about a year, staged to keep the product shipping — new features first, then auth and the core user / permissions / roles services, then the rest.`,
      $localize`:@@exp.fifthkind.hl2:Made multi-select on large virtualized lists roughly 200× faster — 180–200 ms down to 0.4–0.5 ms per item — through an OnPush + immutability overhaul.`,
      $localize`:@@exp.fifthkind.hl3:Wrote custom virtual-scrolling strategies for dynamic-height items, and complex forms via ControlValueAccessor.`,
      $localize`:@@exp.fifthkind.hl4:Ran 20+ technical interviews, hired and mentored newcomers, and set up the code-review process for a team that ran 4–5 strong and peaked at 8.`,
    ],
    tags: ['Angular', 'NgRx', 'RxJS', 'Ionic', 'Angular Material', 'WebSocket', 'Ag-grid'],
    media: {
      href: 'https://www.sohonet.com/',
      image: 'sohonet-5th-kind.webp',
      imageAlt: $localize`:@@exp.fifthkind.link.alt:Sohonet — 5th Kind CORE platform`,
      caption: $localize`:@@exp.fifthkind.link.caption:Sohonet — 5th Kind CORE platform`,
    },
  },
  {
    role: $localize`:@@exp.arcadia.role:Senior Angular Developer`,
    company: 'Arcadia Inc.',
    location: $localize`:@@exp.arcadia.loc:Taganrog`,
    period: '2018 — 2019',
    description: $localize`:@@exp.arcadia.desc:Owned the product's UI architecture and the refactoring roadmap that went with it.`,
    highlights: [
      $localize`:@@exp.arcadia.hl1:Designed the UI architecture and refactoring plan, then shipped 10+ major features against it.`,
      $localize`:@@exp.arcadia.hl2:Rolled CSS variables and an OnPush + immutability strategy across the codebase.`,
      $localize`:@@exp.arcadia.hl3:Built and released the mobile iOS / Android app with Ionic; ran Angular / JS interviews and trained new hires.`,
    ],
    tags: ['Angular', 'Webpack', 'TypeScript', 'PostgreSQL', 'Ionic', 'WebSocket'],
  },
  {
    role: $localize`:@@exp.umbrella.role:Senior Full Stack Developer`,
    company: 'Umbrella IT',
    location: $localize`:@@exp.umbrella.loc:Taganrog`,
    period: '2015 — 2018',
    description: $localize`:@@exp.umbrella.desc:Full-stack development (Angular + Node.js) for international US/EU clients via Upwork — SPAs and the Node.js back ends behind them, with direct client communication in English.`,
    tags: ['Angular', 'Node.js', 'TypeScript'],
    badge: 'Top Rated · 100% Job Success · Upwork',
    links: [
      { label: 'rademacher.de', href: 'https://rademacher.de/' },
      { label: 'pooltrackr.com', href: 'https://pooltrackr.com/' },
    ],
  },
  {
    role: $localize`:@@exp.tutmee.role:Frontend Web Developer`,
    company: 'TutMee Agency',
    location: $localize`:@@exp.tutmee.loc:Taganrog`,
    period: '2012 — 2015',
    description: $localize`:@@exp.tutmee.desc:Built 50+ landing pages and online stores with a focus on responsive layout and performance.`,
    tags: ['Angular', 'Node.js', 'SVG', 'Animation'],
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: 'Litely',
    badge: $localize`:@@proj.litely.badge:Desktop · Personal`,
    description: $localize`:@@proj.litely.desc:Cross-platform desktop app for batch image / video / PDF compression (WebP, AVIF, JPEG, PNG, SVG). Browser extension pastes compressed files straight into Jira / GitLab via Cmd+V. Watch-folders, system tray, drag&drop, dark/light, before/after compare. Rust backend.`,
    links: [{ label: 'Live', href: 'https://asdalexey.github.io/litely/' }],
    tags: ['Tauri', 'Angular 22', 'Rust', 'TypeScript'],
    featured: true,
    gallery: 'litely',
    imageAlt: $localize`:@@proj.litely.img.alt:Litely desktop app — compression settings screen`,
  },
  {
    name: 'Bonds Tracker',
    badge: $localize`:@@proj.bonds.badge:Desktop · Personal`,
    description: $localize`:@@proj.bonds.desc:Personal bonds portfolio tracker across multiple T-Bank Invest accounts. Smart-portfolio optimizer, audit with swap suggestions, scored screener, coupon calendar and a goal dashboard with growth roadmap. Real-time analytics over Tinkoff / MOEX ISS / CBR APIs, KMV-Merton default risk, Plotly, Telegram bot, Rust engines.`,
    links: [],
    tags: ['Angular 22', 'Tauri 2', 'Rust', 'SQLite', 'WebSocket'],
    featured: false,
    gallery: 'bonds-tracker',
    imageAlt: $localize`:@@proj.bonds.img.alt:Bonds Tracker desktop app — portfolio dashboard`,
  },
  {
    name: 'vitest-auto-spy',
    badge: $localize`:@@proj.vas.badge:Library · Open Source`,
    description: $localize`:@@proj.vas.desc:Typed auto-mocking for Vitest — the spiritual successor to jest-auto-spies. One API, three runtimes: the same helpers run on Vitest, Bun (bun:test) and Node.js (node:test) behind a swappable MockAdapter. Generate fully-typed spies from a class (createSpyFromClass) or from a TypeScript type alone (createAutoMock, Proxy-based — never instantiates the class). Return-type-aware controls: mockReturnValue, resolveWith / rejectWith for promises, nextWith / throwWith / complete for Observables, plus calledWith dispatch and readonly / signal property mocking. First-class RxJS entry point and DI helpers (provideAutoSpy / injectSpy) for Angular, NestJS, React, Vue and Svelte. Zero runtime dependencies, 100% coverage, published on npm at ~7k downloads a month, and dogfooded in this site's own tests.`,
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/vitest-auto-spy' },
      { label: 'GitHub', href: 'https://github.com/ASDAlexey/vitest-auto-spy' },
    ],
    tags: ['Vitest', 'Bun', 'Node.js', 'TypeScript', 'RxJS'],
    featured: true,
    gallery: 'vitest-auto-spy',
    imageAlt: $localize`:@@proj.vas.img.alt:vitest-auto-spy — one API, three runtimes diagram`,
  },
  {
    name: 'SundayRun',
    badge: $localize`:@@proj.sundayrun.badge:Web · Community`,
    description: $localize`:@@proj.sundayrun.desc:In real-world use: it runs the weekly park races for a community club in Taganrog — 300+ runners a year. The whole race happens inside the app. A built-in stopwatch times finishers on-site, the offline-first PWA keeps working with no connectivity and syncs on the way back, and results publish themselves to the site in one atomic commit — official-format PDF protocol included, generated in the browser. The home page is the archive of every run published so far. Zoneless Angular, 100% test coverage.`,
    links: [
      { label: 'Live', href: 'https://asdalexey.github.io/sundayrun/ru/' },
      { label: 'GitHub', href: 'https://github.com/ASDAlexey/sundayrun' },
    ],
    tags: ['Angular 22', 'PWA · offline-first', 'Bun', 'Vitest', 'pdfmake', 'GitHub Pages'],
    featured: false,
    gallery: 'sundayrun',
    imageAlt: $localize`:@@proj.sundayrun.img.alt:SundayRun web app — park-run landing page`,
  },
  {
    name: 'Sportdiary',
    badge: $localize`:@@proj.sportdiary.badge:Mobile · Personal`,
    description: $localize`:@@proj.sportdiary.desc:Full-stack running tracker for iOS & Android, built solo end to end. Built-in GPS tracking with live route maps, automatic lap detection and rich per-workout stats — pace, cadence, step length, heart rate, calories and elevation. Weekly / monthly volume analysis with personal-record tables, plus a social feed to follow, comment on and compare workouts with other runners. Ionic + Angular front end, Node.js backend self-hosted on my own VPS. Ran in production for over a year.`,
    links: [],
    tags: ['Ionic', 'Angular', 'Node.js', 'iOS / Android', 'GPS'],
    featured: false,
    gallery: 'sportdiary',
    cover: '1-stopwatch',
    imageAlt: $localize`:@@proj.sportdiary.img.alt:Sportdiary mobile app — workout detail with route map and stats`,
  },
  {
    name: 'Claude Code config & skills',
    badge: $localize`:@@proj.claude.badge:Tooling · Open Source`,
    description: $localize`:@@proj.claude.desc:Custom Claude Code skills, agents and hooks that encode project conventions, code generation and token-optimization — including an AI code-review skill built for large Angular MRs. The review skill is deliberately a second opinion, not an authority: it reports findings for me to verify, and I read the diff and chase down what looks wrong before anything is merged.`,
    links: [],
    tags: ['Claude Code', 'AI', 'Automation'],
    featured: false,
  },
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote: $localize`:@@rec.cronan.quote:I had the pleasure of working with Alexey for over 5 years. A great developer and team player, who jumped into a complex product, got up to speed quickly and was flexible to the needs of the business. Also a great communicator in English and would recommend him for any lead technical role.`,
    author: 'Steve Cronan',
    title: $localize`:@@rec.cronan.title:Ex-CEO / CTO, The 5th Kind`,
    href: 'https://www.linkedin.com/in/stevecronan/',
    image: 'steve.webp',
  },
  {
    quote: $localize`:@@rec.golubev.quote:I worked with Alexey for about 5 years, he did a great job as a Senior Frontend Engineer. I can mark him as an executive developer who can be trusted to solve any technical problems. He also helped with the introduction of new employees to the project and the training of juniors.`,
    author: 'Eugene Golubev',
    title: $localize`:@@rec.golubev.title:Director of Frontend & Mobile Engineering`,
    href: 'https://www.linkedin.com/in/emgolubev/',
    image: 'eugene.webp',
  },
];

export const LOCALE_LABELS: Readonly<Record<LocaleCode, string>> = {
  en: 'EN',
  ru: 'RU',
};
