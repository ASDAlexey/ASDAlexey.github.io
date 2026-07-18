import { Experience, LocaleCode, Project, SocialLink, Stat, Testimonial } from '@core/models/portfolio.interface';

export const PROFILE = {
  name: $localize`:@@hero.name:Alexey Popov`,
  handle: 'ASDAlexey',
  email: 'ASDAlexey@yandex.ru',
  telegram: 'https://t.me/ASDAlexey',
  github: 'https://github.com/ASDAlexey',
  linkedin: 'https://www.linkedin.com/in/alexey-popov-7988a874/',
  linkedinRecommendations: 'https://www.linkedin.com/in/alexey-popov-7988a874/details/recommendations/?detailScreenTabIndex=0',
  resume: $localize`:@@hero.resume.file:Alexey-Popov-Resume.pdf`,
  siteUrl: 'https://asdalexey.github.io',
  role: $localize`:@@hero.role:Tech Lead & Senior Frontend Developer`,
  eyebrow: $localize`:@@hero.eyebrow:Angular · every platform`,
  hint: $localize`:@@hero.hint:Taganrog, Russia · UTC+3 · remote-first`,
} as const;

export const PLATFORMS: readonly string[] = ['Web · SSR', 'Smart TV', 'Mobile · Ionic', 'Desktop · Tauri/Rust'];

export const STATS: readonly Stat[] = [
  { value: '14', suffix: '+', caption: $localize`:@@stat.years:years shipping` },
  { value: '4', suffix: '', caption: $localize`:@@stat.platforms:platforms shipped` },
  { value: '100', suffix: '%', caption: $localize`:@@stat.coverage:test coverage` },
  { value: '70', suffix: '+', caption: $localize`:@@stat.interviews:interviews run` },
];

export const SOCIALS: readonly SocialLink[] = [
  { label: 'GitHub', href: PROFILE.github, icon: 'github' },
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: 'linkedin' },
  { label: 'Telegram', href: PROFILE.telegram, icon: 'telegram' },
  { label: $localize`:@@social.resume:Résumé`, href: PROFILE.resume, icon: 'resume', download: true },
];

export const EXPERIENCES: readonly Experience[] = [
  {
    role: $localize`:@@exp.current.role:Senior Angular Developer`,
    company: null,
    location: $localize`:@@exp.current.loc:Remote`,
    period: $localize`:@@exp.current.period:2023 — Present`,
    description: $localize`:@@exp.current.desc:Architecting Angular 22 applications end-to-end — zoneless, signals, standalone and OnPush throughout, with NgRx Signals stores. Designed a type-safe API layer: an Orval client auto-generated from OpenAPI with zod runtime validation — signal-based httpResource for reads, HttpClient services for mutations. Built a self-authored Nx monorepo of shared Angular libraries (design-system tokens from Figma, theming, inline-SVG icons, notifications, feature flags, dev-auth tooling), auto-versioned and idempotently published to a private GitLab Package Registry. Quality enforced by a custom ESLint plugin (private #fields, inject()-only DI, RxJS hygiene), a multi-plugin Prettier stack, 100% test coverage and duplication / circular-dependency gates in CI.`,
    highlights: [
      $localize`:@@exp.current.hl1:Led a team of 5+ developers — decomposed complex work, estimated timelines, set goals and shipped a release at the end of every sprint.`,
      $localize`:@@exp.current.hl2:Owned the frontend architecture — modular Nx boundaries, NgRx Signals state and reusable patterns that keep large apps maintainable as they scale.`,
      $localize`:@@exp.current.hl3:Set architectural standards and eliminated anti-patterns (god components, leaky effects, cross-layer coupling) via custom lint rules, ADRs and code review.`,
      $localize`:@@exp.current.hl4:Mentored engineers and ran code reviews with constructive feedback, raising code quality and accelerating the team's growth.`,
      $localize`:@@exp.current.hl5:Cut critical production bugs by 25% through test automation (Vitest / Jest) and CI/CD pipelines.`,
      $localize`:@@exp.current.hl6:Built a design system and a shared library (tests, utilities, components) reused across projects — improving consistency and cutting delivery time by 15%.`,
      $localize`:@@exp.current.hl7:Planned product architecture with backend and design, ran stand-ups, and set up unified CI/CD templates that sped up my team and the adjacent teams I hired and led.`,
    ],
    tags: ['Angular', 'NgRx', 'Signals', 'RxJS', 'TypeScript', 'CI/CD', 'Jira', 'Confluence'],
  },
  {
    role: $localize`:@@exp.fifthkind.role:Tech Lead / Senior Frontend`,
    company: 'The 5th Kind',
    location: $localize`:@@exp.fifthkind.loc:US, Remote`,
    period: '2019 — 2023',
    description: $localize`:@@exp.fifthkind.desc:Distributed digital-asset management platform. Led the migration to a layered NgRx architecture, built custom virtual-scrolling for dynamic-height items, complex forms via ControlValueAccessor, and an OnPush + immutability performance overhaul. Ran 20+ technical interviews; hired and mentored newcomers.`,
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
    description: $localize`:@@exp.arcadia.desc:Designed the product's UI architecture, planned refactoring, and shipped 10+ major features. Built the mobile iOS/Android app with Ionic.`,
    tags: ['Angular', 'Webpack', 'TypeScript', 'PostgreSQL', 'Ionic', 'WebSocket'],
  },
  {
    role: $localize`:@@exp.umbrella.role:Senior Full Stack Developer`,
    company: 'Umbrella IT',
    location: $localize`:@@exp.umbrella.loc:Taganrog`,
    period: '2015 — 2018',
    description: $localize`:@@exp.umbrella.desc:Full-stack development (Angular + Node.js) for international US/EU clients via Upwork.`,
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
    image: 'litely.webp',
    imageAlt: $localize`:@@proj.litely.img.alt:Litely desktop app — compression settings screen`,
  },
  {
    name: 'Bonds Tracker',
    badge: $localize`:@@proj.bonds.badge:Desktop · Personal`,
    description: $localize`:@@proj.bonds.desc:Personal bonds portfolio tracker across multiple T-Bank Invest accounts. Smart-portfolio optimizer, audit with swap suggestions, scored screener, coupon calendar and a goal dashboard with growth roadmap. Real-time analytics over Tinkoff / MOEX ISS / CBR APIs, KMV-Merton default risk, Plotly, Telegram bot, Rust engines.`,
    links: [],
    tags: ['Angular 22', 'Tauri 2', 'Rust', 'SQLite', 'WebSocket'],
    featured: false,
    image: 'bonds-tracker.webp',
    imageAlt: $localize`:@@proj.bonds.img.alt:Bonds Tracker desktop app — portfolio dashboard`,
  },
  {
    name: 'vitest-auto-spy',
    badge: $localize`:@@proj.vas.badge:Library · Open Source`,
    description: $localize`:@@proj.vas.desc:Typed auto-mocking for Vitest — the spiritual successor to jest-auto-spies. One API, three runtimes: the same helpers run on Vitest, Bun (bun:test) and Node.js (node:test) behind a swappable MockAdapter. Generate fully-typed spies from a class (createSpyFromClass) or from a TypeScript type alone (createAutoMock, Proxy-based — never instantiates the class). Return-type-aware controls: mockReturnValue, resolveWith / rejectWith for promises, nextWith / throwWith / complete for Observables, plus calledWith dispatch and readonly / signal property mocking. First-class RxJS entry point and DI helpers (provideAutoSpy / injectSpy) for Angular, NestJS, React, Vue and Svelte. Zero runtime dependencies, 100% coverage, published on npm and dogfooded in this site's tests.`,
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/vitest-auto-spy' },
      { label: 'GitHub', href: 'https://github.com/ASDAlexey/vitest-auto-spy' },
    ],
    tags: ['Vitest', 'Bun', 'Node.js', 'TypeScript', 'RxJS'],
    featured: true,
    image: 'vitest-auto-spy.svg',
    imageAlt: $localize`:@@proj.vas.img.alt:vitest-auto-spy — one API, three runtimes diagram`,
    imageContain: true,
  },
  {
    name: 'SundayRun',
    badge: $localize`:@@proj.sundayrun.badge:Web · Community`,
    description: $localize`:@@proj.sundayrun.desc:Web app for a community park-run club (Taganrog). Organizers upload race results (stopwatch xlsx export) → the app detects participant gender, computes rankings and generates an official-format PDF protocol on the fly in the browser. Every result set is published to the repo archive in one atomic commit; the home page is an archive of all published runs with downloadable PDF protocols. Zoneless Angular, 100% test coverage.`,
    links: [
      { label: 'Live', href: 'https://asdalexey.github.io/sundayrun/ru/' },
      { label: 'GitHub', href: 'https://github.com/ASDAlexey/sundayrun' },
    ],
    tags: ['Angular 22', 'Bun', 'Vitest', 'pdfmake', 'GitHub Pages'],
    featured: false,
    image: 'sundayrun.webp',
    imageAlt: $localize`:@@proj.sundayrun.img.alt:SundayRun web app — park-run landing page`,
  },
  {
    name: 'Sportdiary',
    badge: $localize`:@@proj.sportdiary.badge:Mobile · Personal`,
    description: $localize`:@@proj.sportdiary.desc:Full-stack running tracker for iOS & Android, built solo end to end. Built-in GPS tracking with live route maps, automatic lap detection and rich per-workout stats — pace, cadence, step length, heart rate, calories and elevation. Weekly / monthly volume analysis with personal-record tables, plus a social feed to follow, comment on and compare workouts with other runners. Ionic + Angular front end, Node.js backend self-hosted on my own VPS. Ran in production for over a year.`,
    links: [],
    tags: ['Ionic', 'Angular', 'Node.js', 'iOS / Android', 'GPS'],
    featured: false,
    image: $localize`:@@proj.sportdiary.img:sportdiary-en.webp`,
    imageAlt: $localize`:@@proj.sportdiary.img.alt:Sportdiary mobile app — workout detail with route map and stats`,
  },
  {
    name: 'Claude Code config & skills',
    badge: $localize`:@@proj.claude.badge:Tooling · Open Source`,
    description: $localize`:@@proj.claude.desc:Custom Claude Code skills, agents and hooks that encode project conventions, code generation and token-optimization — including an AI code-review skill built for large Angular MRs.`,
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
