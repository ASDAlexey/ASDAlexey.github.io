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
  { value: '90', suffix: '%+', caption: $localize`:@@stat.coverage:test coverage` },
  { value: '70', suffix: '+', caption: $localize`:@@stat.interviews:interviews run` },
];

export const SOCIALS: readonly SocialLink[] = [
  { label: 'GitHub', href: PROFILE.github, icon: 'github' },
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: 'linkedin' },
  { label: 'Telegram', href: PROFILE.telegram, icon: 'telegram' },
];

export const EXPERIENCES: readonly Experience[] = [
  {
    role: $localize`:@@exp.current.role:Senior Angular Developer`,
    company: null,
    location: $localize`:@@exp.current.loc:Remote`,
    period: $localize`:@@exp.current.period:2023 — Present`,
    description: $localize`:@@exp.current.desc:Architecting Angular 22 applications end-to-end — zoneless, signals, standalone and OnPush throughout, with NgRx Signals stores. Designed a type-safe API layer: an Orval client auto-generated from OpenAPI with zod runtime validation — signal-based httpResource for reads, HttpClient services for mutations. Built an Nx monorepo of shared Angular libraries (design system, theming, icons, dev tooling) auto-published to a private GitLab registry. Quality enforced by a custom ESLint plugin (private #fields, inject()-only DI, RxJS hygiene), a multi-plugin Prettier stack, 100% test coverage and duplication / circular-dependency gates in CI.`,
    tags: ['Angular', 'NgRx', 'Signals', 'RxJS', 'TypeScript', 'CI/CD'],
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
  },
  {
    name: 'Bonds Tracker',
    badge: $localize`:@@proj.bonds.badge:Desktop · Personal`,
    description: $localize`:@@proj.bonds.desc:Personal bonds portfolio tracker across multiple T-Bank Invest accounts. Smart-portfolio optimizer, audit with swap suggestions, scored screener, coupon calendar and a goal dashboard with growth roadmap. Real-time analytics over Tinkoff / MOEX ISS / CBR APIs, KMV-Merton default risk, Plotly, Telegram bot, Rust engines.`,
    links: [],
    tags: ['Angular 22', 'Tauri 2', 'Rust', 'SQLite', 'WebSocket'],
    featured: false,
  },
  {
    name: 'vitest-auto-spy',
    badge: $localize`:@@proj.vas.badge:Library · Open Source`,
    description: $localize`:@@proj.vas.desc:Typed auto-mocking for Vitest — the missing jest-auto-spies. Typed Spy<T> over conditional/mapped types, Observable mocking (nextWith/throwWith), calledWith dispatch, zoneless Angular, zero dependencies. Published on npm and dogfooded in this site's tests.`,
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/vitest-auto-spy' },
      { label: 'GitHub', href: 'https://github.com/ASDAlexey/vitest-auto-spy' },
    ],
    tags: ['Vitest', 'TypeScript', 'Testing'],
    featured: true,
  },
  {
    name: 'Angular shared libraries',
    badge: $localize`:@@proj.metalibs.badge:Design System · Work`,
    description: $localize`:@@proj.metalibs.desc:Self-authored Nx monorepo of shared Angular libraries (@shared/*) — design-system tokens generated from Figma, theming, inline-SVG icons, notifications, feature flags and dev-auth tooling. GitLab CI auto-versions, assembles and idempotently publishes every package to a private GitLab Package Registry, gated by coverage, lint, code-duplication and circular-dependency checks.`,
    links: [],
    tags: ['Nx', 'Angular 21', 'GitLab CI/CD', 'Design System', 'Bun'],
    featured: true,
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
