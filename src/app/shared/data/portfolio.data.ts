import { Experience, LocaleCode, Project, SocialLink, Stat } from '@core/models/portfolio.interface';

export const PROFILE = {
  name: 'Alexey Popov',
  email: 'ASDAlexey@yandex.ru',
  github: 'https://github.com/ASDAlexey',
  linkedin: 'https://www.linkedin.com/in/alexey-popov-7988a874/',
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
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: 'email' },
];

export const EXPERIENCES: readonly Experience[] = [
  {
    role: $localize`:@@exp.current.role:Senior Angular Developer`,
    company: null,
    location: $localize`:@@exp.current.loc:Remote`,
    period: $localize`:@@exp.current.period:2023 — Present`,
    description: $localize`:@@exp.current.desc:Building and architecting large-scale Angular applications — modern reactive architecture (NgRx, Signals, zoneless, OnPush), a strong testing culture and CI/CD. Focused on performance, code quality and developer experience.`,
    tags: ['Angular', 'NgRx', 'Signals', 'RxJS', 'TypeScript', 'CI/CD'],
  },
  {
    role: $localize`:@@exp.fifthkind.role:Tech Lead / Senior Frontend`,
    company: 'The 5th Kind',
    location: $localize`:@@exp.fifthkind.loc:US, Remote`,
    period: '2019 — 2023',
    description: $localize`:@@exp.fifthkind.desc:Distributed digital-asset management platform. Led the migration to a layered NgRx architecture, built custom virtual-scrolling for dynamic-height items, complex forms via ControlValueAccessor, and an OnPush + immutability performance overhaul. Ran 20+ technical interviews; hired and mentored newcomers.`,
    tags: ['Angular', 'NgRx', 'RxJS', 'Ionic', 'Angular Material', 'WebSocket', 'Ag-grid'],
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
    description: $localize`:@@exp.umbrella.desc:Full-stack development (Angular + Node.js) for international US/EU clients via Upwork. Top Rated, 100% job success.`,
    tags: ['Angular', 'Node.js', 'TypeScript'],
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
    badge: $localize`:@@proj.litely.badge:Desktop · Open Source`,
    description: $localize`:@@proj.litely.desc:Cross-platform desktop app for batch image / video / PDF compression (WebP, AVIF, JPEG, PNG, SVG). Browser extension pastes compressed files straight into Jira / GitLab via Cmd+V. Watch-folders, system tray, drag&drop, dark/light, before/after compare. Rust backend.`,
    links: [
      { label: 'Live', href: 'https://asdalexey.github.io/litely/' },
      { label: 'GitHub', href: 'https://github.com/ASDAlexey/litely' },
    ],
    tags: ['Tauri', 'Angular 22', 'Rust', 'TypeScript'],
    featured: true,
  },
  {
    name: 'Bonds Tracker',
    badge: $localize`:@@proj.bonds.badge:Desktop · Personal`,
    description: $localize`:@@proj.bonds.desc:Personal bonds portfolio tracker across multiple T-Bank Invest accounts (your own and others'). Smart-portfolio optimizer by risk profile, portfolio audit with swap recommendations, a scored screener, coupon calendar by month and year, monthly income vs. contributions, and a goal dashboard with a growth roadmap. Real-time analytics over Tinkoff Invest / MOEX ISS / CBR APIs, Plotly charts, KMV-Merton default risk, a Telegram bot and Rust quant engines.`,
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
    name: 'Claude Code config & skills',
    badge: $localize`:@@proj.claude.badge:Tooling · Open Source`,
    description: $localize`:@@proj.claude.desc:Custom Claude Code skills, agents and hooks that encode project conventions, code generation and token-optimization — including an AI code-review skill built for large Angular MRs.`,
    links: [{ label: 'GitHub', href: 'https://github.com/ASDAlexey/claude' }],
    tags: ['Claude Code', 'AI', 'Automation'],
    featured: false,
  },
];

export const LOCALE_LABELS: Readonly<Record<LocaleCode, string>> = {
  en: 'EN',
  ru: 'RU',
};
