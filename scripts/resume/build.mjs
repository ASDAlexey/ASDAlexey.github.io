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
    summary: 'Profile',
    skills: 'Core Skills',
    experience: 'Experience',
    projects: 'Personal Projects / Open Source',
    education: 'Education',
    languages: 'Languages',
    keyExperience: 'Key Experience',
    recommendations: 'Recommendations',
  },
  profile: [
    'Tech Lead and Senior Frontend Developer with **14+ years** of commercial experience, 11+ of them on Angular (v2 → v22). I architect large Angular applications end-to-end and ship one stack across every platform: **Web (SSR), Smart TV (Samsung / LG / Hisense), Mobile (Ionic, iOS / Android) and Desktop (Tauri + Rust)**.',
    'I built a frontend team from one engineer to nine across three directions, have run **70+ technical interviews**, and own frontend architecture, code review and CI/CD. I took a project from zero tests to **~10,400 unit tests at 89% coverage** gated in CI, and defects reaching production fell from 10–12 a sprint to 2–3. I drive AI-assisted development — custom Claude Code skills and agents, including an AI code-review skill for very large merge requests — and I read every diff a model produces before it lands.',
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
  recommendations: [
    {
      quote:
        'I had the pleasure of working with Alexey for over 5 years. A great developer and team player, who jumped into a complex product, got up to speed quickly and was flexible to the needs of the business. Also a great communicator in English and would recommend him for any lead technical role.',
      author: 'Steve Cronan — ex-CEO / CTO, The 5th Kind',
    },
    {
      quote:
        'I worked with Alexey for about 5 years, he did a great job as a Senior Frontend Engineer. An executive developer who can be trusted to solve any technical problem. He also assisted with onboarding new employees onto the project and training juniors.',
      author: 'Eugene Golubev — Director of Frontend & Mobile Engineering',
    },
  ],
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
    keyExperience: 'Ключевой опыт',
    recommendations: 'Отзывы коллег',
  },
  profile: [
    'Tech Lead и Senior Frontend-разработчик с **14+ годами** коммерческого опыта, 11+ из них на Angular (v2 → v22). Проектирую крупные Angular-приложения целиком и вывожу один стек на все платформы: **Web (SSR), Smart TV (Samsung / LG / Hisense), Mobile (Ionic, iOS / Android) и Desktop (Tauri + Rust)**.',
    'Вырастил фронтенд-команду с одного инженера до девяти по трём направлениям, провёл **70+ технических собеседований**, отвечаю за архитектуру, code review и CI/CD. Довёл проект с нуля тестов до **~10 400 unit-тестов при 89% покрытия** с гейтом в CI, а багов, доходящих до прода, стало 2–3 за спринт вместо 10–12. Внедряю AI-assisted разработку — кастомные скиллы и агенты Claude Code, включая скилл авто-код-ревью для очень больших MR — и читаю каждый дифф, который выдала модель, до того как он попадёт в проект.',
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
  recommendations: [
    {
      quote:
        'Отличный разработчик и командный игрок: быстро вник в сложный продукт и гибко подстраивался под потребности бизнеса. Рекомендую его на любую ведущую техническую роль.',
      author: 'Steve Cronan — экс-CEO / CTO, The 5th Kind',
    },
    {
      quote:
        'Отлично справлялся с ролью Senior Frontend Engineer: ответственный разработчик, которому можно доверить любую техническую задачу; помогал вводить новых сотрудников и обучал джунов.',
      author: 'Eugene Golubev — директор Frontend и Mobile разработки',
    },
  ],
  languages: [
    { name: 'Русский', level: 'Родной' },
    { name: 'Английский', level: 'Рабочий (B1) · 8+ лет с US / EU командами' },
  ],
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// `**bold**` in the copy above becomes <b> — the only markup the data carries, so a phrase can be
// emphasised the way the profile paragraphs do without letting raw HTML into the strings.
const rich = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

// Light, single-column, print-first. The dark two-column version this replaces looked good on a
// screen and wrong on a recruiter's printer: it read as a template rather than as a document, and
// the sidebar meant the eye had two places to start. One column, black on white and a single blue
// accent is what the format expects — and it happens to be what parsers read most reliably.
const css = `
*{margin:0;padding:0;box-sizing:border-box}
@page{size:A4;margin:0}
:root{
  --text:#1c1c1e;--text-2:#3a3a3e;--muted:#75757c;--rule:#d8d8de;
  --accent:#4a72b0;
  --font:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif;
  --mono:'JetBrains Mono','SF Mono',ui-monospace,monospace;
}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--font);background:#fff;color:var(--text);font-size:9.1px;line-height:1.45}
.page{width:210mm;min-height:297mm;padding:14mm 17mm 12mm}
.name{font-size:30px;font-weight:800;letter-spacing:-.8px;line-height:1.02}
.role{margin-top:6px;font-size:12px;font-weight:700;color:var(--accent)}
.loc{margin-top:6px;color:var(--text-2);font-size:9.6px}
.contact{margin-top:9px;display:flex;flex-wrap:wrap;gap:4px 16px;font-family:var(--mono);font-size:8.6px;color:var(--text-2)}
.contact a{color:var(--text-2);text-decoration:none}
.contact a.site{color:var(--accent);text-decoration:underline}
.rule{height:1.4px;background:var(--text);margin:11px 0 0}
.eyebrow{font-size:9px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--accent);margin:12px 0 6px;break-after:avoid}
.block:first-of-type .eyebrow{margin-top:13px}
p.para{color:var(--text-2);margin-bottom:6px}
p.para b{color:var(--text);font-weight:700}
.row{display:grid;grid-template-columns:74px 1fr;gap:5px 12px;margin-bottom:6px;break-inside:avoid}
.row .k{font-weight:700;font-size:9.1px}
.row .v{color:var(--text-2)}
.hl{list-style:none}
.hl li{position:relative;padding-left:12px;color:var(--text-2);margin-bottom:4px;break-inside:avoid}
.hl li::before{content:'';position:absolute;left:2px;top:5.4px;width:3.2px;height:3.2px;border-radius:50%;background:var(--accent)}
.job{margin-bottom:9px}
.job-h{display:flex;justify-content:space-between;align-items:baseline;gap:12px;break-after:avoid}
.job-r{font-weight:700;font-size:10.6px}
.job-p{font-family:var(--mono);font-size:8.6px;color:var(--muted);white-space:nowrap}
.job-c{color:var(--muted);font-size:9px;margin:1px 0 4px;break-after:avoid}
.job ul{list-style:none}
.job li{position:relative;padding-left:12px;color:var(--text-2);margin-bottom:2.6px;break-inside:avoid}
.job li::before{content:'';position:absolute;left:2px;top:5.4px;width:3.2px;height:3.2px;border-radius:50%;background:var(--accent)}
.proj{margin-bottom:6.5px;break-inside:avoid}
.proj-h{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.proj-n{font-weight:700;font-size:9.8px}
.proj-m{font-family:var(--mono);font-size:8px;color:var(--muted);white-space:nowrap}
.proj-d{color:var(--text-2);margin-top:1px}
.quote{border-left:2.2px solid var(--rule);padding-left:10px;margin-bottom:8px;break-inside:avoid}
.quote p{color:var(--text-2);font-style:italic}
.quote .by{color:var(--muted);font-size:8.6px;margin-top:2px}
`;

function render(d) {
  const L = d.labels;
  const links = [
    SHARED.links.site,
    SHARED.links.telegram,
    SHARED.links.max,
    SHARED.links.linkedin,
    SHARED.links.email,
    SHARED.links.github,
  ];
  const section = (title, body) => `<div class="block"><div class="eyebrow">${esc(title)}</div>${body}</div>`;
  const rows = (items) =>
    items.map((i) => `<div class="row"><div class="k">${esc(i.k)}</div><div class="v">${esc(i.v)}</div></div>`).join('');
  const bullets = (items) => `<ul class="hl">${items.map((i) => `<li>${rich(i)}</li>`).join('')}</ul>`;

  return `<!doctype html><html lang="${d.lang}"><head><meta charset="utf-8">
<title>${esc(SHARED.name)} — Résumé</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style></head><body><div class="page">
  <div class="name">${esc(SHARED.name)}</div>
  <div class="role">${esc(d.role)}</div>
  <div class="loc">${esc(d.location)}</div>
  <div class="contact">${links
    .map((x) => `<a class="${x === SHARED.links.site ? 'site' : ''}" href="${x.href}">${esc(x.value)}</a>`)
    .join('')}</div>
  <div class="rule"></div>

  ${section(L.summary, d.profile.map((t) => `<p class="para">${rich(t)}</p>`).join(''))}
  ${section(L.keyExperience, bullets(d.keyExperience))}
  ${section(L.skills, rows(d.skills.map((x) => ({ k: x.group, v: x.items }))))}

  ${section(
    L.experience,
    d.experience
      .map(
        (
          j,
        ) => `<div class="job"><div class="job-h"><span class="job-r">${esc(j.role)}</span><span class="job-p">${esc(j.period)}</span></div>
    <div class="job-c">${esc(j.company)}</div>
    <ul>${j.points.map((x) => `<li>${rich(x)}</li>`).join('')}</ul></div>`,
      )
      .join(''),
  )}

  ${section(
    L.projects,
    d.projects
      .map(
        (
          x,
        ) => `<div class="proj"><div class="proj-h"><span class="proj-n">${esc(x.name)}</span><span class="proj-m">${esc(x.meta)}</span></div>
    <div class="proj-d">${esc(x.desc)}</div></div>`,
      )
      .join(''),
  )}

  ${section(
    `${L.education} · ${L.languages}`,
    rows([
      ...d.education.map((e) => ({ k: L.education, v: `${e.title} — ${e.meta}` })),
      ...d.languages.map((l) => ({ k: l.name, v: l.level })),
    ]),
  )}

  ${section(
    L.recommendations,
    d.recommendations.map((r) => `<div class="quote"><p>“${esc(r.quote)}”</p><div class="by">${esc(r.author)}</div></div>`).join(''),
  )}
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
  // The plain variant drops the emphasis rather than rendering it — bold carries no meaning to a
  // parser, and `**` left in the text would.
  const plain = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '$1');
  const list = (items) => `<ul>${items.map((i) => `<li>${plain(i)}</li>`).join('')}</ul>`;

  return `<!doctype html><html lang="${d.lang}"><head><meta charset="utf-8">
<title>${esc(SHARED.name)} — Résumé</title>
<style>${plainCss}</style></head><body><div class="page">
  <h1>${esc(SHARED.name)}</h1>
  <p class="role">${esc(d.role)}</p>
  <p class="loc">${esc(d.location)}</p>
  <p class="contact">${contacts.map((c) => `<a href="${c.href}">${esc(c.value)}</a>`).join(' · ')}</p>

  <h2>${esc(L.summary)}</h2>
  ${d.profile.map((t) => `<p>${plain(t)}</p>`).join('')}

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
