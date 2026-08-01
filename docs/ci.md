# CI/CD

Пайплайн собран по образцу GitLab-пайплайнов `frontend-pipelines` (meta-frontend): одно место
знает про рантайм и кэш, стадии лежат отдельными файлами, а корневой файл — это граф, который
читается целиком за десять секунд.

```
quality ─┐
         ├→ build → lighthouse → deploy (только main)
test ────┘
```

## Файлы

| Файл                                   | Что это                                                          |
| -------------------------------------- | ---------------------------------------------------------------- |
| `.github/workflows/ci.yml`             | Граф пайплайна: кто за кем, что запускается на PR, что на `main` |
| `.github/workflows/quality.yml`        | Три параллельных job'а: линтеры + типы, jscpd, madge             |
| `.github/workflows/test.yml`           | Vitest + гейт покрытия 100%                                      |
| `.github/workflows/build.yml`          | Сборка обеих локалей, сборка корня сайта, бюджет веса, артефакты |
| `.github/workflows/lighthouse.yml`     | Аудит обеих локалей на собранном артефакте                       |
| `.github/workflows/deploy.yml`         | Публикация на GitHub Pages                                       |
| `.github/actions/setup/`               | Composite action: Bun, кэш зависимостей, установка с ретраями    |
| `.github/scripts/bun-install-retry.sh` | `bun install` с тремя попытками и таймаутом                      |
| `lighthouserc.json`                    | Пороги Lighthouse                                                |

Соответствие с эталоном: `.github/actions/setup` — это `.bun-install` + `.use-bun-cache`,
`quality.yml` — `code-quality` / `jscpd` / `detected-circular-dependencies`, `test.yml` —
`unit-tests` + `coverage-check`, `concurrency` в `ci.yml` — `interruptible: true`.

## Что проверяется

| Гейт                        | Команда                   | Падает, когда                                               |
| --------------------------- | ------------------------- | ----------------------------------------------------------- |
| Prettier                    | `bun run prettier:check`  | форматирование разъехалось                                  |
| ESLint (+ локальный плагин) | `bun run eslint`          | нарушены конвенции проекта                                  |
| Stylelint                   | `bun run stylelint:check` | нарушены правила SCSS                                       |
| TypeScript                  | `bun run typecheck`       | не сходятся типы приложения или спеков                      |
| jscpd                       | `bun run jscpd`           | дублирование в `src/` выше 1.5%                             |
| madge                       | `bun run madge`           | появился цикл зависимостей                                  |
| Vitest                      | `bun run test:ci`         | упал тест или покрытие ниже 100%                            |
| Сборка                      | `bun run build`           | не собирается или превышен бюджет `angular.json`            |
| Вес деплоя                  | `bun run size`            | что-то потяжелело сверх бюджета                             |
| Lighthouse                  | job `lighthouse`          | A11y / Best Practices / SEO не 100, TBT или CLS выше порога |

Первые пять шагов внутри `code-quality` идут с `if: !cancelled()` — один пуш показывает **все**
проблемы сразу, а не по одной за перезапуск.

## Кэш зависимостей

Кэшируется `~/.bun/install/cache` по ключу от `bun.lock`. На pull request'ах composite action
получает `cache-policy: read` — четыре параллельных job'а не гоняются наперегонки, кто первый
зальёт один и тот же архив. Кэш для конкретного `bun.lock` пишет прогон на `main`; ветки его
читают (правило GitHub: ветка видит свой скоуп и скоуп default-ветки).

## Lighthouse: почему Performance — предупреждение

Аудит идёт по артефакту сборки, который раздаёт `python3 -m http.server`: без gzip, без
`Cache-Control`. На таком сервере Performance физически не может быть похож на продовый — при
100 по остальным категориям он даёт 69–70, потому что FCP и LCP тянут вниз несжатые байты.
Поэтому:

- **error** — `categories:accessibility`, `categories:best-practices`, `categories:seo` (ровно
  100, как обещает бейдж в README);
- **error** — `total-blocking-time` (≤ 300 мс) и `cumulative-layout-shift` (≤ 0.1): эти метрики
  зависят от кода, а не от транспорта, и сейчас обе равны нулю;
- **warn** — `categories:performance`: число видно в логе, но пайплайн от него не красный.

Если захочется настоящий гейт на Performance — раздавать артефакт сервером с gzip и
`Cache-Control`, иначе гейт будет мерить не сайт, а `http.server`.

## Локально

```bash
bun run prettier:check && bun run eslint && bun run stylelint:check && bun run typecheck
bun run jscpd && bun run madge
bun run test:ci && bun run coverage:summary
bun run build && bun run assemble && bun run size
```

Lighthouse — так же, как в CI:

```bash
python3 -m http.server 8080 --directory dist/ngportfolio/browser &
bunx lighthouse@12 http://127.0.0.1:8080/ru/ --view
```

## Чего в пайплайне нет и почему

- **Шардирования тестов.** У `@angular/build:unit-test` нет `--shard`, а 110 спеков проходят
  меньше чем за две секунды. Появится минута — есть `--include`.
- **Гейта на апрувы** (в эталоне это `check-approvals`). На GitHub это branch protection, а не
  job.
- **Version-up коммита после мёрджа.** Сайт не версионируется — деплой и есть релиз.
