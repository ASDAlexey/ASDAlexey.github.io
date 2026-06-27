// Generates the styled résumé HTML (EN + RU) in the site's dark Litely design
// language. Render to PDF with headless Chrome — see scripts/resume/render.sh.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SHARED = {
  name: 'Alexey Popov',
  links: {
    telegram: { label: 'Telegram', value: '@ASDAlexey', href: 'https://t.me/ASDAlexey' },
    github: { label: 'GitHub', value: 'github.com/ASDAlexey', href: 'https://github.com/ASDAlexey' },
    linkedin: { label: 'LinkedIn', value: 'in/alexey-popov', href: 'https://www.linkedin.com/in/alexey-popov-7988a874/' },
    site: { label: 'Portfolio', value: 'asdalexey.github.io', href: 'https://asdalexey.github.io' },
  },
};

const EN = {
  lang: 'en',
  dir: 'Alexey-Popov-Resume.pdf',
  role: 'Tech Lead / Senior Frontend (Angular) Engineer',
  location: 'Taganrog, Russia · UTC+3 · Remote-first',
  labels: {
    contact: 'Contact',
    summary: 'Summary',
    skills: 'Core Skills',
    experience: 'Experience',
    projects: 'Personal Projects / Open Source',
    education: 'Education',
    languages: 'Languages',
    highlights: 'Key Highlights',
  },
  summary:
    'Tech Lead and Senior Frontend Engineer with 14+ years building production web apps — 11+ of them on Angular (v2 → v22). I architect large-scale Angular applications end-to-end and ship them across every platform: web (SSR), Smart TV, mobile (Ionic) and desktop (Tauri/Rust). Reactive-first with NgRx, RxJS, Signals and a zoneless, standalone, OnPush architecture. I build GitLab CI/CD from scratch, drive a testing-first culture (90%+ coverage) and lead frontend teams — code review, mentoring and hiring. Currently driving AI-assisted development with custom Claude Code skills, agents and hooks.',
  highlights: [
    'Sped up multi-select on large virtualized lists ~200× — from 180–200 ms down to 0.4–0.5 ms per item.',
    'Led migration from service-based to a layered NgRx architecture with clean business-logic separation.',
    'Raised unit-test coverage to 90%+ with enforced coverage gates in CI.',
    'Ran 70+ technical interviews; hired, onboarded and mentored frontend engineers.',
    'Published vitest-auto-spy on npm — typed auto-mocking for Vitest.',
  ],
  skills: [
    {
      group: 'Angular',
      items: 'Angular 2–22, Standalone, Signals, Zoneless, OnPush, NgRx, RxJS, ControlValueAccessor, Angular Material, Ag-Grid',
    },
    { group: 'Language', items: 'TypeScript, JavaScript (ES2015+), HTML5, SCSS / CSS, BEM, Responsive Design, Web Components' },
    {
      group: 'Architecture',
      items: 'Nx Monorepo, Micro-frontends, Design Systems, Clean Architecture, i18n / Localization, SSR (@angular/ssr)',
    },
    { group: 'Platforms', items: 'Web (SSR), Smart TV (Tizen / webOS), Mobile (Ionic, iOS/Android), Desktop (Tauri + Rust)' },
    { group: 'CI/CD & Infra', items: 'GitLab CI/CD, Docker (multi-stage), Nginx, Kubernetes / Kustomize, Feature Flags' },
    { group: 'Testing', items: 'Jest, Vitest, TestBed, vitest-auto-spy, 90%+ coverage gates, TDD' },
    {
      group: 'Backend & Tools',
      items: 'Node.js, Express, REST, WebSocket, PostgreSQL, SQLite, Redis, Rust, Figma, ESLint / Prettier / Stylelint',
    },
    {
      group: 'Leadership',
      items: 'Tech Lead, Frontend Architecture, Code Review, Mentoring, Hiring, Performance Optimization, AI-assisted Dev',
    },
  ],
  experience: [
    {
      role: 'Senior Angular Developer',
      company: 'Remote',
      period: '2023 — Present',
      points: [
        'Architect large-scale Angular apps with a modern reactive stack — NgRx, Signals, zoneless, OnPush — plus a shared design system and libraries.',
        'Enforce a testing-first culture and CI/CD: coverage gates, performance budgets and automated code-quality checks.',
        'Drive AI-assisted development to accelerate delivery and code review.',
      ],
    },
    {
      role: 'Tech Lead / Senior Frontend',
      company: 'The 5th Kind · US, Remote',
      period: '2019 — 2023',
      points: [
        'Built a distributed digital-asset-management platform used by Marvel, Disney, Warner Bros., Epic Games and Universal (via Sohonet).',
        'Led the migration to a layered NgRx architecture with clean business-logic separation across effects.',
        'Sped up multi-select on large virtualized lists ~200× (180–200 ms → 0.4–0.5 ms) via an OnPush + immutability overhaul.',
        'Wrote custom virtual-scroll strategies for dynamic-height items and complex forms via ControlValueAccessor.',
        'Ran 20+ technical interviews and helped build the team’s code-review process.',
      ],
    },
    {
      role: 'Senior Angular Developer / Tech Lead',
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
      desc: 'Typed auto-mocking for Vitest — the missing jest-auto-spies. Typed Spy<T>, Observable mocking, zoneless Angular, zero dependencies. → github.com/ASDAlexey/vitest-auto-spy',
    },
    {
      name: 'Bonds Tracker',
      meta: 'Angular 22 · Tauri 2 · Rust · SQLite',
      desc: 'Personal bonds-portfolio tracker — smart-portfolio optimizer, scored screener and coupon calendar over Tinkoff / MOEX ISS / CBR APIs with KMV-Merton default risk and a Telegram bot.',
    },
    {
      name: 'Claude Code config & skills',
      meta: 'AI · Automation',
      desc: 'Custom Claude Code skills, agents and hooks that encode project conventions, code generation and an AI code-review workflow for large Angular MRs.',
    },
  ],
  education: [{ title: 'Taganrog State Pedagogical Institute (A.P. Chekhov)', meta: 'Physics & Mathematics, 2004 — 2009 · GPA 4.97 / 5' }],
  languages: [
    { name: 'Russian', level: 'Native' },
    { name: 'English', level: 'Professional (B2)' },
  ],
};

const RU = {
  lang: 'ru',
  dir: 'Alexey-Popov-Resume-ru.pdf',
  role: 'Tech Lead / Senior Frontend (Angular) разработчик',
  location: 'Таганрог, Россия · UTC+3 · Удалённо',
  labels: {
    contact: 'Контакты',
    summary: 'О себе',
    skills: 'Ключевые навыки',
    experience: 'Опыт работы',
    projects: 'Личные проекты / Open Source',
    education: 'Образование',
    languages: 'Языки',
    highlights: 'Достижения',
  },
  summary:
    'Tech Lead и Senior Frontend-разработчик с опытом 14+ лет, из них 11+ на Angular (v2 → v22). Проектирую крупные Angular-приложения целиком и выпускаю их на всех платформах: web (SSR), Smart TV, mobile (Ionic) и desktop (Tauri/Rust). Реактивный стек: NgRx, RxJS, Signals, zoneless, standalone, OnPush. Настраиваю GitLab CI/CD с нуля, выстраиваю testing-first культуру (90%+ покрытие) и руковожу фронтенд-командами — code review, менторинг, найм. Развиваю AI-assisted разработку через собственные скиллы, агенты и хуки Claude Code.',
  highlights: [
    'Ускорил мультивыбор в больших виртуализированных списках в ~200 раз — со 180–200 мс до 0,4–0,5 мс на элемент.',
    'Перевёл проект с сервисной архитектуры на слоистую NgRx с чистым разделением бизнес-логики.',
    'Поднял покрытие unit-тестами до 90%+ с обязательными coverage-гейтами в CI.',
    'Провёл 70+ технических собеседований; нанимал, адаптировал и менторил инженеров.',
    'Опубликовал vitest-auto-spy в npm — типизированный auto-mock для Vitest.',
  ],
  skills: [
    {
      group: 'Angular',
      items: 'Angular 2–22, Standalone, Signals, Zoneless, OnPush, NgRx, RxJS, ControlValueAccessor, Angular Material, Ag-Grid',
    },
    { group: 'Язык', items: 'TypeScript, JavaScript (ES2015+), HTML5, SCSS / CSS, BEM, Responsive Design, Web Components' },
    {
      group: 'Архитектура',
      items: 'Nx Monorepo, микрофронтенды, Design Systems, Clean Architecture, i18n / локализация, SSR (@angular/ssr)',
    },
    { group: 'Платформы', items: 'Web (SSR), Smart TV (Tizen / webOS), Mobile (Ionic, iOS/Android), Desktop (Tauri + Rust)' },
    { group: 'CI/CD & Infra', items: 'GitLab CI/CD, Docker (multi-stage), Nginx, Kubernetes / Kustomize, Feature Flags' },
    { group: 'Тестирование', items: 'Jest, Vitest, TestBed, vitest-auto-spy, coverage-гейты 90%+, TDD' },
    {
      group: 'Backend & Tools',
      items: 'Node.js, Express, REST, WebSocket, PostgreSQL, SQLite, Redis, Rust, Figma, ESLint / Prettier / Stylelint',
    },
    {
      group: 'Лидерство',
      items: 'Tech Lead, архитектура фронтенда, code review, менторинг, найм, оптимизация производительности, AI-assisted Dev',
    },
  ],
  experience: [
    {
      role: 'Senior Angular Developer',
      company: 'Удалённо',
      period: '2023 — н.в.',
      points: [
        'Проектирую крупные Angular-приложения на современном реактивном стеке — NgRx, Signals, zoneless, OnPush — с общим design-системой и библиотеками.',
        'Выстраиваю testing-first культуру и CI/CD: coverage-гейты, performance-бюджеты и автоматические проверки качества кода.',
        'Развиваю AI-assisted разработку для ускорения поставки и code review.',
      ],
    },
    {
      role: 'Tech Lead / Senior Frontend',
      company: 'The 5th Kind · США, удалённо',
      period: '2019 — 2023',
      points: [
        'Платформа управления медиа-активами для Marvel, Disney, Warner Bros., Epic Games и Universal (через Sohonet).',
        'Возглавил миграцию на слоистую NgRx-архитектуру с чистым разделением бизнес-логики в effects.',
        'Ускорил мультивыбор в больших виртуализированных списках в ~200 раз (180–200 мс → 0,4–0,5 мс) за счёт OnPush + immutability.',
        'Написал кастомные стратегии virtual-scroll для элементов с динамической высотой и сложные формы через ControlValueAccessor.',
        'Провёл 20+ технических собеседований и помог выстроить процесс code review.',
      ],
    },
    {
      role: 'Senior Angular Developer / Tech Lead',
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
      desc: 'Типизированный auto-mock для Vitest — недостающий jest-auto-spies. Типизированный Spy<T>, мокирование Observable, zoneless Angular, без зависимостей. → github.com/ASDAlexey/vitest-auto-spy',
    },
    {
      name: 'Bonds Tracker',
      meta: 'Angular 22 · Tauri 2 · Rust · SQLite',
      desc: 'Личный трекер портфеля облигаций — умный оптимизатор портфеля, скринер с баллами и купонный календарь по API Tinkoff / MOEX ISS / ЦБ РФ с риском дефолта по KMV-Merton и Telegram-ботом.',
    },
    {
      name: 'Claude Code config & skills',
      meta: 'AI · Automation',
      desc: 'Собственные скиллы, агенты и хуки Claude Code, кодирующие конвенции проекта, генерацию кода и AI code-review для крупных Angular MR.',
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
    { name: 'Английский', level: 'Professional (B2)' },
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
      ${link(SHARED.links.telegram)}${link(SHARED.links.github)}${link(SHARED.links.linkedin)}${link(SHARED.links.site)}
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

for (const d of [EN, RU]) {
  const out = join(__dirname, `resume.${d.lang}.html`);
  writeFileSync(out, render(d));
  console.log('wrote', out);
}
