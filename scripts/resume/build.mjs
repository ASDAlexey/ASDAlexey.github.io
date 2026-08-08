// Generates the styled résumé HTML (EN + RU) in the site's dark Litely design
// language. Render to PDF with headless Chrome — see scripts/resume/render.sh.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SHARED = {
  name: 'Alexey Popov',
  links: {
    email: { label: 'Email', value: 'ASDAlexey@yandex.ru', href: 'mailto:ASDAlexey@yandex.ru' },
    telegram: { label: 'Telegram', value: '@ASDAlexey', href: 'https://t.me/ASDAlexey' },
    // MAX profile URLs are opaque one-way tokens with no public handle, so the
    // row shows the bare domain and carries the full link in the PDF anchor.
    max: { label: 'MAX', value: 'max.ru', href: 'https://max.ru/u/f9LHodD0cOIvsoWjpCYHxdF8aiJ7csO8bFyeafox3xVes4OWbQgToULJSRE' },
    github: { label: 'GitHub', value: 'github.com/ASDAlexey', href: 'https://github.com/ASDAlexey' },
    linkedin: { label: 'LinkedIn', value: 'in/alexey-popov', href: 'https://www.linkedin.com/in/alexey-popov-7988a874/' },
    site: { label: 'Portfolio', value: 'asdalexey.github.io', href: 'https://asdalexey.github.io' },
  },
};

const EN = {
  lang: 'en',
  dir: 'Alexey-Popov-Resume.pdf',
  role: 'Tech Lead · Senior Angular Developer',
  location: 'Taganrog, Russia · UTC+3 · Remote only',
  labels: {
    contact: 'Contact',
    summary: 'Summary',
    skills: 'Core Skills',
    experience: 'Experience',
    projects: 'Personal Projects / Open Source',
    education: 'Education',
    languages: 'Languages',
    highlights: 'Key Highlights',
    keyExperience: 'Key Experience',
  },
  summary:
    'Tech Lead and Senior Frontend Engineer with 14+ years building production web apps — 11+ of them on Angular (v2 → v22). I architect large-scale Angular applications end-to-end and ship them across every platform: web (SSR), Smart TV, mobile (Ionic) and desktop (Tauri/Rust). Reactive-first with NgRx, RxJS, Signals and a zoneless, standalone, OnPush architecture. I build GitLab CI/CD from scratch, drive a testing-first culture (89% on the main app, 100% on greenfield, enforced by CI gates) and lead frontend teams — code review, mentoring and hiring. Currently driving AI-assisted development with custom Claude Code skills, agents and hooks. Remote only.',
  highlights: [
    'Sped up multi-select on large virtualized lists ~200× — from 180–200 ms down to 0.4–0.5 ms per item.',
    'Led migration from service-based to a layered NgRx architecture with clean business-logic separation.',
    'Took a project from 0% to ~10,400 unit tests at 89% coverage, and to 100% on the shared libraries — all gated in CI.',
    'Ran 70+ technical interviews; hired and led a team of 9 in-house engineers plus ~6 subcontractors.',
    'Published vitest-auto-spy on npm — typed auto-mocking for Vitest.',
  ],
  // Same eight groups the site's Skills section shows, in the same order — the résumé keeps the
  // exhaustive list, the site keeps the scannable subset. Change one, change the other.
  skills: [
    { group: 'Languages', items: 'TypeScript (strict mode), JavaScript (ES6+ / ES2023+), Node.js, HTML5, CSS3 / SCSS, Tailwind CSS' },
    {
      group: 'Frontend',
      items:
        'Angular 2–22, zoneless change detection, Signals, httpResource, standalone components, OnPush, RxJS, NgRx / NgRx Signals, Angular Material, Ionic, micro-frontends, Module Federation, PWA / offline-first, SSR / SSG, i18n / l10n, high-load and content-heavy UIs, real-time interfaces, design systems, Ag-Grid, virtual scrolling, ControlValueAccessor, lazy loading and code splitting, responsive mobile-first design, accessibility (WCAG / ARIA), performance optimization',
    },
    {
      group: 'Architecture',
      items:
        'Nx monorepos, module boundaries, shared libraries, Node.js / Express microservices, REST APIs, WebSocket, API-first development against OpenAPI specifications, OpenAPI code generation (Orval) with zod runtime validation, ADRs, feature flags, OOP, data structures and algorithmic complexity, frontend security (OWASP, CSP, role-based access), scalability',
    },
    {
      group: 'Testing',
      items:
        'TDD, Vitest, Jest, Karma / Jasmine, Playwright, unit, integration and e2e tests, auto-mocking, 89–100% coverage, duplication and circular-dependency gates',
    },
    {
      group: 'DevOps',
      items:
        'GitLab (expert level): CI/CD from scratch, GitLab Runners, reusable pipeline templates, affected-only builds, parallel test sharding, semantic versioning, Docker multi-stage, Nginx, Kubernetes / Kustomize, GitHub Actions, private package registry; familiar with Azure DevOps / Azure Pipelines and cloud deployment (AWS, Azure)',
    },
    {
      group: 'Platforms',
      items:
        'Web, Smart TV (Tizen / webOS / VIDAA), iOS / Android (Ionic, Capacitor / Cordova), Desktop (Tauri 2 — shipped apps, Rust at project scope)',
    },
    {
      group: 'Tools',
      items:
        'Git, Jira, Confluence, Figma, ESLint (custom plugins), Prettier, Webpack, Vite, Bun, PostgreSQL, SQLite, Redis, Node.js / Express, REST, Claude Code',
    },
    {
      group: 'Leadership',
      items:
        'Team lead, hiring and onboarding, mentoring junior and mid-level developers, 70+ technical interviews, code review with constructive feedback, coding standards and best practices, technical architecture and system design, estimation and work decomposition, Agile / Scrum, cross-functional work with product owners, backend and UX/UI, release every sprint, fully remote distributed teams',
    },
  ],
  keyExperience: [
    'Angular on every platform — web (SSR), Smart TV (Tizen / webOS / VIDAA), mobile (Ionic, iOS / Android) and desktop (Tauri 2 + Rust), on every version from v2 to v22.',
    'Architecture at scale — sole architect of a multi-tenant Angular 22 app (286 components, ~107k lines, 8+ environments); Nx monorepos up to 5 apps and 81 libraries; an OpenAPI-first API layer generated with Orval and validated by zod.',
    'Performance — a streaming service at ~4M web users and ~100k TV devices; multi-select on large virtualized lists made ~200× faster; OnPush and immutability applied across whole codebases.',
    'Testing and delivery — a project taken from 0% coverage to ~10,400 unit tests at 89%, gated in CI; GitLab CI/CD built from scratch with test sharding, affected-only builds and quality gates.',
    'Teams and releases — a frontend team grown from one engineer to nine across three directions over 70+ interviews, and the release owned for all of them.',
  ],
  experience: [
    {
      role: 'Tech Lead / Senior Angular Developer',
      company: 'Remote',
      period: '2023 — Present',
      points: [
        'KION (MTS) — a streaming platform with ~4M web users and ~100k Smart TV devices. Shipped SSR web features (age-gating and PIN compliance, profile, subscriptions, legal consent) and the whole gamification vertical — achievements, levels, leaderboards, fortune wheel — to web and Smart TV, inside an Nx monorepo of 5 apps and 81 libraries.',
        'Enterprise 3D digital-twin and geospatial platform — sole architect of a multi-tenant Angular 22 app: 286 components, ~107k lines of TypeScript, real-time pixel streaming, deployed to 8+ environments from a single codebase.',
        'Inherited a frontend team of one and built it out across three directions — my own group of 4–5, a reporting vertical of 5 and an international one of 2 — hiring every engineer myself over 70+ interviews.',
        'Own the release for all three frontend teams: I cut the epic, the teams raise the MRs, I merge once the approvals land — often as one of the reviewers. Reviewed an external contractor team’s code for a year, then hired the senior who took it over.',
        'Introduced unit testing to a project sitting at 0% coverage and taught 20+ developers to write it — the main app now runs ~10,400 unit tests at 89% coverage gated in CI, and the greenfield projects sit at 100%.',
        'Own production health — Sentry, performance metrics and the regression runs for the whole project. Defects reaching production fell from the 10–12 per sprint I inherited to 2–3.',
        'Built the GitLab CI/CD from scratch on Kubernetes runners — reusable templates shared across projects, nx affected, three-way sharding that clears 10,400 tests in ~3 minutes, and coverage, duplication, circular-dependency and custom approval gates, with a custom ESLint plugin enforcing the conventions.',
        'Published an Nx monorepo of 13 shared Angular libraries — design-system tokens from Figma, theming, SVG icons, notifications, feature flags, dev-auth, a generated Orval API client and test helpers — auto-versioned into a private GitLab registry and consumed by 3 apps.',
      ],
    },
    {
      role: 'Tech Lead / Senior Frontend',
      company: 'The 5th Kind · US, Remote',
      period: '2019 — 2023',
      points: [
        'Built a distributed digital-asset-management platform used by Marvel, Disney, Warner Bros., Epic Games and Universal (via Sohonet).',
        'Led the migration to a layered NgRx architecture over about a year, staged to keep the product shipping — new features first, then auth and the core user / permissions / roles services, then the rest.',
        'Sped up multi-select on large virtualized lists ~200× (180–200 ms → 0.4–0.5 ms) via an OnPush + immutability overhaul.',
        'Wrote custom virtual-scroll strategies for dynamic-height items and complex forms via ControlValueAccessor.',
        'Ran 20+ technical interviews, hired and mentored newcomers, and set up the code-review process for a team that ran 4–5 strong and peaked at 8.',
      ],
    },
    {
      role: 'Senior Angular Developer',
      company: 'Arcadia Inc. · Taganrog',
      period: '2018 — 2019',
      points: [
        'Designed the product’s UI architecture and refactoring roadmap; shipped 10+ major features.',
        'Introduced CSS variables and the OnPush + immutability strategy across the codebase.',
        'Built the mobile iOS/Android app with Ionic; conducted 20+ Angular/JS interviews and trained new hires.',
      ],
    },
    {
      role: 'Senior Full-Stack Developer',
      company: 'Umbrella IT · Taganrog',
      period: '2015 — 2018',
      points: [
        'Full-stack delivery (Angular + Node.js) for international US/EU clients — Top Rated, 100% Job Success on Upwork.',
        'Shipped SPAs and Node.js back ends (rademacher.de, pooltrackr.com).',
      ],
    },
    {
      role: 'Frontend Web Developer',
      company: 'TutMee Agency · Taganrog',
      period: '2012 — 2015',
      points: ['Built 50+ landing pages and online stores with heavy SVG/animation; focus on responsive layout and performance.'],
    },
  ],
  projects: [
    {
      name: 'Litely',
      meta: 'Tauri · Angular 22 · Rust',
      desc: 'Cross-platform desktop app for batch image / video / PDF compression (WebP, AVIF, JPEG, PNG, SVG). Browser extension pastes compressed files straight into Jira / GitLab with Cmd+V. Watch-folders, system tray, before/after compare. → asdalexey.github.io/litely',
    },
    {
      name: 'vitest-auto-spy',
      meta: 'TypeScript · Open Source · npm',
      desc: 'Typed auto-mocking for Vitest — the spiritual successor to jest-auto-spies. One API, three runtimes (Vitest, Bun, Node.js) behind a swappable MockAdapter. Typed spies from a class or from a type alone, Observable / promise / signal controls, DI helpers for Angular and NestJS. Zero dependencies, 100% coverage. → github.com/ASDAlexey/vitest-auto-spy',
    },
    {
      name: 'Bonds Tracker',
      meta: 'Angular 22 · Tauri 2 · Rust · SQLite',
      desc: 'Personal bonds-portfolio tracker across multiple T-Bank Invest accounts — smart-portfolio optimizer, audit with swap suggestions, scored screener, coupon calendar and a goal dashboard. Real-time analytics over Tinkoff / MOEX ISS / CBR APIs, KMV-Merton default risk, Plotly, Telegram bot, Rust engines.',
    },
    {
      name: 'SundayRun',
      meta: 'Angular 22 · offline-first PWA · Bun · Vitest',
      desc: 'In real-world use: it runs the weekly park races for a community club in Taganrog — 300+ runners a year. The whole race happens inside the app: a built-in stopwatch times finishers on-site, the offline-first PWA keeps working with no connectivity and syncs on the way back, and results publish themselves to the site in one atomic commit — official-format PDF protocol included, generated in the browser. Zoneless Angular, 100% test coverage. → asdalexey.github.io/sundayrun',
    },
    {
      name: 'Sportdiary',
      meta: 'Ionic · Angular · Node.js · iOS / Android',
      desc: 'Full-stack running tracker for iOS & Android, built solo end to end — GPS tracking with live route maps, automatic lap detection, per-workout stats, volume analysis with personal records and a social feed. Node.js backend self-hosted on my own VPS; ran in production for over a year.',
    },
    {
      name: 'Claude Code config & skills',
      meta: 'AI · Automation',
      desc: 'Custom Claude Code skills, agents and hooks that encode project conventions, code generation and token-optimization — including an AI code-review workflow built for large Angular MRs. Treated as a second opinion, not an authority: it reports findings, I read the diff and verify them before anything merges.',
    },
  ],
  education: [{ title: 'Taganrog State Pedagogical Institute (A.P. Chekhov)', meta: 'Physics & Mathematics, 2004 — 2009 · GPA 4.97 / 5' }],
  languages: [
    { name: 'Russian', level: 'Native' },
    { name: 'English', level: 'Working proficiency (B1) · 8+ years with US / EU teams' },
  ],
};

const RU = {
  lang: 'ru',
  dir: 'Alexey-Popov-Resume-ru.pdf',
  role: 'Tech Lead · Senior Angular Developer',
  location: 'Таганрог, Россия · UTC+3 · только удалённо',
  labels: {
    contact: 'Контакты',
    summary: 'О себе',
    skills: 'Ключевые навыки',
    experience: 'Опыт работы',
    projects: 'Личные проекты / Open Source',
    education: 'Образование',
    languages: 'Языки',
    highlights: 'Достижения',
    keyExperience: 'Ключевой опыт',
  },
  summary:
    'Tech Lead и Senior Frontend-разработчик с опытом 14+ лет, из них 11+ на Angular (v2 → v22). Проектирую крупные Angular-приложения целиком и выпускаю их на всех платформах: web (SSR), Smart TV, mobile (Ionic) и desktop (Tauri/Rust). Реактивный стек: NgRx, RxJS, Signals, zoneless, standalone, OnPush. Настраиваю GitLab CI/CD с нуля, выстраиваю testing-first культуру (89% на основном приложении, 100% на greenfield, с гейтами в CI) и руковожу фронтенд-командами — code review, менторинг, найм. Развиваю AI-assisted разработку через собственные скиллы, агенты и хуки Claude Code. Работаю только удалённо.',
  highlights: [
    'Ускорил мультивыбор в больших виртуализированных списках в ~200 раз — со 180–200 мс до 0,4–0,5 мс на элемент.',
    'Перевёл проект с сервисной архитектуры на слоистую NgRx с чистым разделением бизнес-логики.',
    'Довёл проект с 0% до ~10 400 unit-тестов при 89% покрытия, а общие библиотеки — до 100%, всё с гейтами в CI.',
    'Провёл 70+ технических собеседований; нанял и веду команду из 9 штатных инженеров и ~6 на субподряде.',
    'Опубликовал vitest-auto-spy в npm — типизированный auto-mock для Vitest.',
  ],
  skills: [
    { group: 'Языки', items: 'TypeScript (strict mode), JavaScript (ES6+ / ES2023+), Node.js, HTML5, CSS3 / SCSS, Tailwind CSS' },
    {
      group: 'Frontend',
      items:
        'Angular 2–22, zoneless change detection, Signals, httpResource, standalone-компоненты, OnPush, RxJS, NgRx / NgRx Signals, Angular Material, Ionic, micro-frontends, Module Federation, PWA / offline-first, SSR / SSG, i18n / l10n, высоконагруженные и контентно-насыщенные интерфейсы, real-time UI, дизайн-системы, Ag-Grid, virtual scroll, ControlValueAccessor, lazy loading и code splitting, адаптивная mobile-first вёрстка, доступность (WCAG / ARIA), оптимизация производительности',
    },
    {
      group: 'Архитектура',
      items:
        'Nx-монорепозитории, модульные границы, общие библиотеки, микросервисы на Node.js / Express, REST API, WebSocket, API-first разработка по спецификациям OpenAPI, кодогенерация из OpenAPI (Orval) с рантайм-валидацией zod, ADR, feature-флаги, ООП, структуры данных и алгоритмическая сложность, безопасность фронтенда (OWASP, CSP, авторизация по ролям), масштабируемость',
    },
    {
      group: 'Тестирование',
      items:
        'TDD, Vitest, Jest, Karma / Jasmine, Playwright, unit-, интеграционные и e2e-тесты, авто-мокинг, покрытие 89–100%, гейты дублирования и циклических зависимостей',
    },
    {
      group: 'DevOps',
      items:
        'GitLab (экспертный уровень): CI/CD с нуля, GitLab Runners, переиспользуемые шаблоны пайплайнов, affected-сборки, шардинг тестов, семантическое версионирование, Docker multi-stage, Nginx, Kubernetes / Kustomize, GitHub Actions, приватный Package Registry; знаком с Azure DevOps / Azure Pipelines и облачным деплоем (AWS, Azure)',
    },
    {
      group: 'Платформы',
      items:
        'Web, Smart TV (Tizen / webOS / VIDAA), iOS / Android (Ionic, Capacitor / Cordova), Desktop (Tauri 2 — выпущенные приложения, Rust в объёме проекта)',
    },
    {
      group: 'Инструменты',
      items:
        'Git, Jira, Confluence, Figma, ESLint (кастомные плагины), Prettier, Webpack, Vite, Bun, PostgreSQL, SQLite, Redis, Node.js / Express, REST, Claude Code',
    },
    {
      group: 'Лидерство',
      items:
        'Тимлид, найм и онбординг, менторинг junior/middle-разработчиков, 70+ технических собеседований, code review с конструктивной обратной связью, стандарты кодирования и best practices, техническая архитектура и system design, оценка и декомпозиция задач, Agile / Scrum, кросс-функциональная работа с product owner, бэкендом и UX/UI, релиз каждый спринт, полностью удалённая работа с распределёнными командами',
    },
  ],
  keyExperience: [
    'Angular на всех платформах — web (SSR), Smart TV (Tizen / webOS / VIDAA), mobile (Ionic, iOS / Android) и desktop (Tauri 2 + Rust), на всех версиях от v2 до v22.',
    'Архитектура в масштабе — единственный архитектор мульти-тенант приложения на Angular 22 (286 компонентов, ~107 тыс. строк, 8+ окружений); Nx-монорепозитории до 5 приложений и 81 библиотеки; API-слой по OpenAPI с генерацией Orval и валидацией zod.',
    'Производительность — стриминговый сервис с ~4 млн пользователей web и ~100 тыс. устройств TV; мультивыбор в больших виртуализированных списках ускорен примерно в 200 раз; OnPush и иммутабельность по всей кодовой базе.',
    'Тестирование и поставка — проект доведён с 0% покрытия до ~10 400 unit-тестов при 89% с гейтом в CI; GitLab CI/CD построен с нуля — шардинг тестов, affected-сборки и гейты качества.',
    'Команды и релизы — фронтенд-команда выращена с одного инженера до девяти по трём направлениям за 70+ собеседований, релиз всех трёх на мне.',
  ],
  experience: [
    {
      role: 'Tech Lead / Senior Angular Developer',
      company: 'Удалённо',
      period: '2023 — н.в.',
      points: [
        'KION (МТС) — стриминговый сервис с ~4 млн пользователей на web и ~100 тыс. устройств Smart TV. Реализовал SSR-фичи на web (возрастные ограничения и PIN по требованиям РКН, профиль, подписки, юридические согласия) и вертикаль геймификации целиком — достижения, уровни, лидерборды, колесо фортуны — на web и Smart TV, внутри Nx-монорепо из 5 приложений и 81 библиотеки.',
        'Enterprise-платформа цифрового двойника и геовизуализации — единственный архитектор мульти-тенант приложения на Angular 22: 286 компонентов, ~107 тыс. строк TypeScript, real-time pixel streaming, деплой в 8+ окружений из одной кодовой базы.',
        'Пришёл в команду из одного фронтендера и вырастил её по трём направлениям — своя группа 4–5 человек, вертикаль отчётов на 5 и международное направление на 2 — нанял каждого лично, проведя 70+ собеседований.',
        'Отвечаю за релиз всех трёх фронтенд-команд: нарезаю эпик, команды готовят MR, я мержу после аппрувов — часто сам же и ревьюер. Год ревьюил код внешней команды подрядчиков, потом нанял сеньора, который это перенял.',
        'Внёс культуру unit-тестов в проект с нулевым покрытием и научил писать их 20+ разработчиков — сейчас основное приложение гоняет ~10 400 unit-тестов при 89% покрытия с гейтом в CI, а greenfield-проекты стоят на 100%.',
        'Отвечаю за здоровье прода — Sentry, метрики производительности и регресс по всему проекту. Багов, доходящих до прода, стало 2–3 за спринт вместо унаследованных 10–12.',
        'Построил GitLab CI/CD с нуля на Kubernetes-раннерах — переиспользуемые шаблоны на несколько проектов, nx affected, шардинг на три части, прогоняющий 10 400 тестов за ~3 минуты, и гейты покрытия, дублирования, циклических зависимостей и аппрувов, плюс кастомный ESLint-плагин под конвенции.',
        'Опубликовал Nx-монорепо из 13 общих Angular-библиотек — токены дизайн-системы из Figma, темизация, SVG-иконки, уведомления, feature-флаги, dev-auth, сгенерированный Orval-клиент и тест-хелперы — с авто-версионированием в приватный GitLab-registry; их используют 3 приложения.',
      ],
    },
    {
      role: 'Tech Lead / Senior Frontend',
      company: 'The 5th Kind · США, удалённо',
      period: '2019 — 2023',
      points: [
        'Платформа управления медиа-активами для Marvel, Disney, Warner Bros., Epic Games и Universal (через Sohonet).',
        'Возглавил миграцию на слоистую NgRx-архитектуру примерно за год, поэтапно, без остановки поставки — сначала новые фичи, потом авторизация и ключевые сервисы пользователей, прав и ролей, затем всё остальное.',
        'Ускорил мультивыбор в больших виртуализированных списках в ~200 раз (180–200 мс → 0,4–0,5 мс) за счёт OnPush + immutability.',
        'Написал кастомные стратегии virtual-scroll для элементов с динамической высотой и сложные формы через ControlValueAccessor.',
        'Провёл 20+ технических собеседований, нанимал и обучал новичков, участвовал в построении процесса code review в команде из 4–5 человек, доходившей до 8.',
      ],
    },
    {
      role: 'Senior Angular Developer',
      company: 'Arcadia Inc. · Таганрог',
      period: '2018 — 2019',
      points: [
        'Спроектировал UI-архитектуру продукта и план рефакторинга; выпустил 10+ крупных фич.',
        'Внедрил CSS-переменные и стратегию OnPush + immutability по всему проекту.',
        'Собрал мобильное iOS/Android-приложение на Ionic; провёл 20+ собеседований по Angular/JS и обучал новичков.',
      ],
    },
    {
      role: 'Senior Full-Stack разработчик',
      company: 'Umbrella IT · Таганрог',
      period: '2015 — 2018',
      points: [
        'Full-stack (Angular + Node.js) для международных клиентов из США/ЕС — Top Rated, 100% Job Success на Upwork.',
        'Выпустил SPA и бэкенды на Node.js (rademacher.de, pooltrackr.com).',
      ],
    },
    {
      role: 'Frontend Web разработчик',
      company: 'TutMee Agency · Таганрог',
      period: '2012 — 2015',
      points: ['Сделал 50+ лендингов и интернет-магазинов с активным SVG/анимацией; фокус на адаптив и производительность.'],
    },
  ],
  projects: [
    {
      name: 'Litely',
      meta: 'Tauri · Angular 22 · Rust',
      desc: 'Кроссплатформенное desktop-приложение для пакетного сжатия изображений / видео / PDF (WebP, AVIF, JPEG, PNG, SVG). Расширение для браузера вставляет сжатые файлы прямо в Jira / GitLab по Cmd+V. Watch-папки, трей, сравнение до/после. → asdalexey.github.io/litely',
    },
    {
      name: 'vitest-auto-spy',
      meta: 'TypeScript · Open Source · npm',
      desc: 'Типизированный auto-mock для Vitest — идейный наследник jest-auto-spies. Один API, три рантайма (Vitest, Bun, Node.js) за сменным MockAdapter. Типизированные спаи из класса или из одного типа, управление Observable / промисами / сигналами, DI-хелперы для Angular и NestJS. Без зависимостей, 100% покрытие. → github.com/ASDAlexey/vitest-auto-spy',
    },
    {
      name: 'Bonds Tracker',
      meta: 'Angular 22 · Tauri 2 · Rust · SQLite',
      desc: 'Личный трекер портфеля облигаций по нескольким счетам Т-Банк Инвестиций — умный оптимизатор портфеля, аудит с предложениями замен, скринер с баллами, купонный календарь и дашборд целей. Аналитика в реальном времени по API Tinkoff / MOEX ISS / ЦБ РФ, риск дефолта по KMV-Merton, Plotly, Telegram-бот, движки на Rust.',
    },
    {
      name: 'SundayRun',
      meta: 'Angular 22 · offline-first PWA · Bun · Vitest',
      desc: 'Работает в реальных забегах: на нём проходят еженедельные парковые пробеги клуба в Таганроге — 300+ бегунов в год. Забег целиком идёт внутри приложения: встроенный секундомер засекает финиши прямо в парке, offline-first PWA продолжает работать без связи и синхронизируется по возвращении, а результаты сами публикуются на сайт одним атомарным коммитом — вместе с PDF-протоколом официального образца, сгенерированным в браузере. Zoneless Angular, 100% покрытие тестами. → asdalexey.github.io/sundayrun',
    },
    {
      name: 'Sportdiary',
      meta: 'Ionic · Angular · Node.js · iOS / Android',
      desc: 'Full-stack трекер бега для iOS и Android, сделан в одиночку от и до — GPS-трекинг с картой маршрута, автоопределение кругов, статистика по тренировке, анализ объёмов с личными рекордами и социальная лента. Бэкенд на Node.js на собственном VPS; больше года в продакшене.',
    },
    {
      name: 'Claude Code config & skills',
      meta: 'AI · Automation',
      desc: 'Собственные скиллы, агенты и хуки Claude Code, кодирующие конвенции проекта, генерацию кода и оптимизацию токенов — включая AI code-review для крупных Angular MR. Это второе мнение, а не авторитет: инструмент выдаёт находки, я читаю дифф и проверяю их до мерджа.',
    },
  ],
  education: [
    {
      title: 'Таганрогский гос. педагогический институт им. А.П. Чехова',
      meta: 'Физика и математика, 2004 — 2009 · средний балл 4,97 / 5',
    },
  ],
  languages: [
    { name: 'Русский', level: 'Родной' },
    { name: 'Английский', level: 'Рабочий (B1) · 8+ лет с US / EU командами' },
  ],
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const css = `
*{margin:0;padding:0;box-sizing:border-box}
@page{size:A4;margin:0}
:root{
  --bg:#06060a;--surface:#0e0e16;--surface-2:#111118;--border:#1f1f2e;
  --text:#eeeef0;--text-2:#a6a6be;--muted:#7e7e98;
  --accent:#a78bfa;--accent-2:#7c3aed;--blue:#60a5fa;--green:#34d399;
  --font:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif;
  --mono:'JetBrains Mono','SF Mono',ui-monospace,monospace;
}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--font);background:var(--bg);color:var(--text);font-size:9.6px;line-height:1.5;letter-spacing:.1px}
.page{width:210mm;min-height:297mm;background:
  radial-gradient(900px 500px at 78% -8%,rgba(124,58,237,.16),transparent 60%),
  radial-gradient(700px 500px at -5% 8%,rgba(59,130,246,.10),transparent 55%),
  var(--bg);
  display:grid;grid-template-columns:62mm 1fr;}
.side{padding:13mm 8mm 12mm;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent);border-right:1px solid var(--border)}
.main{padding:13mm 11mm 12mm 10mm}
.name{font-size:25px;font-weight:800;letter-spacing:-.6px;line-height:1.05;
  background:linear-gradient(120deg,#fff 30%,var(--accent) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.role{margin-top:5px;font-weight:600;font-size:11px;
  background:linear-gradient(90deg,var(--accent),var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent}
.loc{margin-top:6px;color:var(--muted);font-size:8.6px;font-family:var(--mono)}
.eyebrow{font-family:var(--mono);font-size:7.6px;letter-spacing:1.4px;text-transform:uppercase;color:var(--accent);
  font-weight:600;margin:0 0 7px;display:flex;align-items:center;gap:6px}
.eyebrow::before{content:'';flex:none;width:5px;height:5px;border-radius:50%;background:var(--green)}
.side .block{margin-top:14px}
.side .block:first-of-type{margin-top:18px}
.c-row{display:block;margin-bottom:7px}
.c-row .k{font-family:var(--mono);font-size:7.2px;letter-spacing:.8px;text-transform:uppercase;color:var(--muted)}
.c-row .v{color:var(--text);font-size:9px;word-break:break-word}
.c-row .v a{color:var(--accent);text-decoration:none}
.skill{margin-bottom:8px}
.skill .g{font-weight:700;font-size:9px;color:#fff;margin-bottom:2px}
.skill .i{color:var(--text-2);font-size:8.4px;line-height:1.45}
.lang{display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:4px;font-size:8.8px}
.lang>span:first-child{flex:none}
.lang .lv{color:var(--muted);font-family:var(--mono);font-size:8px;text-align:right;line-height:1.35}
.edu .t{font-weight:600;font-size:9px;color:#fff}
.edu .m{color:var(--text-2);font-size:8.2px;margin-top:1px}
.summary{color:var(--text-2);font-size:9.4px;line-height:1.6;margin-bottom:4px}
.main .block{margin-top:13px}
.hl{list-style:none}
.hl li{position:relative;padding-left:14px;color:var(--text-2);font-size:9px;margin-bottom:4px}
.hl li::before{content:'▹';position:absolute;left:0;color:var(--accent);font-size:9px}
.job{margin-bottom:10px;break-inside:avoid}
.job-h{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.job-r{font-weight:700;font-size:10px;color:#fff}
.job-p{font-family:var(--mono);font-size:8px;color:var(--accent);white-space:nowrap}
.job-c{color:var(--blue);font-size:8.8px;font-weight:500;margin:1px 0 4px}
.job ul{list-style:none}
.job li{position:relative;padding-left:12px;color:var(--text-2);font-size:8.8px;line-height:1.5;margin-bottom:2.5px}
.job li::before{content:'';position:absolute;left:2px;top:6px;width:3px;height:3px;border-radius:50%;background:var(--accent-2)}
.proj{margin-bottom:7px;break-inside:avoid}
.proj-h{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.proj-n{font-weight:700;font-size:9.4px;color:#fff}
.proj-m{font-family:var(--mono);font-size:7.4px;color:var(--muted);white-space:nowrap}
.proj-d{color:var(--text-2);font-size:8.6px;line-height:1.45;margin-top:1px}
.divider{height:1px;background:linear-gradient(90deg,var(--border),transparent);margin-top:13px}
`;

function render(d) {
  const L = d.labels;
  const link = (x) =>
    `<div class="c-row"><div class="k">${esc(x.label)}</div><div class="v"><a href="${x.href}">${esc(x.value)}</a></div></div>`;
  return `<!doctype html><html lang="${d.lang}"><head><meta charset="utf-8">
<title>${esc(SHARED.name)} — Résumé</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style></head><body><div class="page">
  <aside class="side">
    <div class="name">${esc(SHARED.name)}</div>
    <div class="role">${esc(d.role)}</div>
    <div class="loc">${esc(d.location)}</div>

    <div class="block"><div class="eyebrow">${esc(L.contact)}</div>
      ${link(SHARED.links.email)}${link(SHARED.links.telegram)}${link(SHARED.links.max)}${link(SHARED.links.github)}${link(SHARED.links.linkedin)}${link(SHARED.links.site)}
    </div>

    <div class="block"><div class="eyebrow">${esc(L.skills)}</div>
      ${d.skills.map((s) => `<div class="skill"><div class="g">${esc(s.group)}</div><div class="i">${esc(s.items)}</div></div>`).join('')}
    </div>

    <div class="block"><div class="eyebrow">${esc(L.languages)}</div>
      ${d.languages.map((l) => `<div class="lang"><span>${esc(l.name)}</span><span class="lv">${esc(l.level)}</span></div>`).join('')}
    </div>

    <div class="block edu"><div class="eyebrow">${esc(L.education)}</div>
      ${d.education.map((e) => `<div class="t">${esc(e.title)}</div><div class="m">${esc(e.meta)}</div>`).join('')}
    </div>
  </aside>

  <main class="main">
    <div class="eyebrow">${esc(L.summary)}</div>
    <p class="summary">${esc(d.summary)}</p>

    <div class="block"><div class="eyebrow">${esc(L.keyExperience)}</div>
      <ul class="hl">${d.keyExperience.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
    </div>

    <div class="block"><div class="eyebrow">${esc(L.highlights)}</div>
      <ul class="hl">${d.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
    </div>

    <div class="block"><div class="eyebrow">${esc(L.experience)}</div>
      ${d.experience
        .map(
          (
            j,
          ) => `<div class="job"><div class="job-h"><span class="job-r">${esc(j.role)}</span><span class="job-p">${esc(j.period)}</span></div>
        <div class="job-c">${esc(j.company)}</div>
        <ul>${j.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>`,
        )
        .join('')}
    </div>

    <div class="block"><div class="eyebrow">${esc(L.projects)}</div>
      ${d.projects
        .map(
          (
            p,
          ) => `<div class="proj"><div class="proj-h"><span class="proj-n">${esc(p.name)}</span><span class="proj-m">${esc(p.meta)}</span></div>
        <div class="proj-d">${esc(p.desc)}</div></div>`,
        )
        .join('')}
    </div>
  </main>
</div></body></html>`;
}

// Plain single-column variant, for job boards and ATS uploads.
//
// Same data object as the designed résumé — one source, two renderings, so the two can never drift
// apart. Everything the designed one does for a human is stripped here for a parser and a recruiter
// screening at volume: black on white, one column, a system serif/sans stack instead of a webfont
// (no network fetch at print time), no icons, no photo, no tables, no colour carrying meaning.
// Section headings are the plain nouns a parser looks for, in the order Western résumés use them.
const plainCss = `
*{box-sizing:border-box}
body{margin:0;background:#fff;color:#000;font:9.5pt/1.32 Arial,Helvetica,sans-serif}
.page{max-width:190mm;margin:0 auto;padding:9mm 0}
h1{margin:0;font-size:17pt;line-height:1.15}
.role{margin:1px 0 0;font-size:10.5pt;font-weight:700}
.loc,.contact{margin:2px 0 0;font-size:8.5pt}
.contact a{color:#000;text-decoration:none}
h2{margin:10px 0 4px;padding-bottom:1px;border-bottom:1px solid #000;font-size:9.5pt;letter-spacing:.04em;text-transform:uppercase}
p{margin:0 0 4px}
ul{margin:0 0 4px;padding-left:15px}
li{margin:0 0 2px}
.job{margin:0 0 7px}
h2,.job-h{break-after:avoid}
.job,.proj,li{break-inside:avoid}
.job-h{font-weight:700}
.job-m{font-size:10pt}
.skill{margin:0 0 4px}
.skill b{font-weight:700}
.proj{margin:0 0 7px}
`;

function renderPlain(d) {
  const L = d.labels;
  const contacts = [
    SHARED.links.email,
    SHARED.links.telegram,
    SHARED.links.max,
    SHARED.links.github,
    SHARED.links.linkedin,
    SHARED.links.site,
  ];
  const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

  return `<!doctype html><html lang="${d.lang}"><head><meta charset="utf-8">
<title>${esc(SHARED.name)} — Résumé</title>
<style>${plainCss}</style></head><body><div class="page">
  <h1>${esc(SHARED.name)}</h1>
  <p class="role">${esc(d.role)}</p>
  <p class="loc">${esc(d.location)}</p>
  <p class="contact">${contacts.map((c) => `<a href="${c.href}">${esc(c.value)}</a>`).join(' · ')}</p>

  <h2>${esc(L.summary)}</h2>
  <p>${esc(d.summary)}</p>

  <h2>${esc(L.keyExperience)}</h2>
  ${list(d.keyExperience)}

  <h2>${esc(L.skills)}</h2>
  ${d.skills.map((k) => `<div class="skill"><b>${esc(k.group)}:</b> ${esc(k.items)}</div>`).join('')}

  <h2>${esc(L.experience)}</h2>
  ${d.experience
    .map(
      (j) => `<div class="job"><div class="job-h">${esc(j.role)} — ${esc(j.company)}</div>
    <div class="job-m">${esc(j.period)}</div>
    ${list(j.points)}</div>`,
    )
    .join('')}

  <h2>${esc(L.highlights)}</h2>
  ${list(d.highlights)}

  <h2>${esc(L.projects)}</h2>
  ${d.projects.map((x) => `<div class="proj"><b>${esc(x.name)}</b> — ${esc(x.meta)}<br>${esc(x.desc)}</div>`).join('')}

  <h2>${esc(L.education)}</h2>
  ${d.education.map((e) => `<div>${esc(e.title)} — ${esc(e.meta)}</div>`).join('')}

  <h2>${esc(L.languages)}</h2>
  ${d.languages.map((l) => `<div>${esc(l.name)} — ${esc(l.level)}</div>`).join('')}
</div></body></html>`;
}

for (const d of [EN, RU]) {
  const out = join(__dirname, `resume.${d.lang}.html`);
  writeFileSync(out, render(d));
  console.log('wrote', out);

  const plain = join(__dirname, `resume.${d.lang}.ats.html`);
  writeFileSync(plain, renderPlain(d));
  console.log('wrote', plain);
}
