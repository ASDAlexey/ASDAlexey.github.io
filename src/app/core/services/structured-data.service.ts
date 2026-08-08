import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

import { LocaleService } from './locale.service';
import { PROFILE } from '@shared/data/portfolio.data';

const SCRIPT_ID = 'ld-json';

const KNOWS_ABOUT = [
  'Angular',
  'TypeScript',
  'RxJS',
  'NgRx',
  'NgRx Signals',
  'Angular Signals',
  'Zoneless Angular',
  'Nx monorepo',
  'Module Federation',
  'Design systems',
  'OpenAPI code generation',
  'zod validation',
  'Micro-frontends',
  'Server-Side Rendering',
  'Progressive Web Apps',
  'Smart TV',
  'Ionic',
  'Tauri',
  'Rust',
  'GitLab CI/CD',
  'Kubernetes',
  'Docker',
  'Unit testing',
  'Playwright',
  'Vitest',
  'Frontend architecture',
  'Technical leadership',
  'AI-assisted development',
] as const;

const OCCUPATION_SKILLS =
  'Angular, TypeScript, RxJS, NgRx Signals, Zoneless, Nx, Module Federation, OpenAPI codegen, zod, Design systems, SSR, PWA, Ionic, Tauri, Rust, GitLab CI/CD, Kubernetes, Vitest, Playwright, Technical leadership';

/**
 * Only Russian gets a proficiency node. Schema.org models fluency as a boolean, so B1 —
 * working proficiency, not fluency — would be a false claim either way it was set; the
 * language is still listed, just without a level attached.
 */
const KNOWS_LANGUAGE = [
  { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
  { '@type': 'Language', name: 'English', alternateName: 'en' },
] as const;

@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  readonly #doc = inject(DOCUMENT);
  readonly #locale = inject(LocaleService);

  init(): void {
    const lang = this.#locale.current;
    const url = this.#locale.localeUrl(lang);

    this.#inject({
      '@context': 'https://schema.org',
      '@graph': [
        this.#person(url),
        {
          '@type': 'WebSite',
          '@id': `${url}#website`,
          name: PROFILE.name,
          url,
          inLanguage: lang,
          // Site and profile both point back at the one Person node, so the
          // whole graph resolves to a single entity instead of three loose ones.
          author: { '@id': `${url}#person` },
          publisher: { '@id': `${url}#person` },
        },
        {
          '@type': 'ProfilePage',
          url,
          inLanguage: lang,
          isPartOf: { '@id': `${url}#website` },
          about: { '@id': `${url}#person` },
          mainEntity: { '@id': `${url}#person` },
        },
      ],
    });
  }

  #person(url: string): Record<string, unknown> {
    const jobTitle = $localize`:@@ld.jobTitle:Tech Lead / Senior Angular Developer`;
    const description = $localize`:@@ld.description:Tech Lead and Senior Angular Developer with 14+ years of commercial experience, 11+ of them on Angular (v2 → v22), shipping it on web (SSR), Smart TV, mobile (Ionic) and desktop (Tauri/Rust). Leads frontend teams, owns architecture, code review and GitLab CI/CD. Remote only.`;
    const alumniOf = $localize`:@@ld.alumniOf:Taganrog State Pedagogical Institute (A. P. Chekhov)`;

    return {
      '@type': 'Person',
      '@id': `${url}#person`,
      name: PROFILE.name,
      // Both name spellings plus the public handle on every locale, so Google
      // and Yandex resolve the Latin name, Cyrillic name and "ASDAlexey" to
      // one entity — the niche brand queries we target.
      alternateName: ['Alexey Popov', 'Алексей Попов', PROFILE.handle],
      url,
      jobTitle,
      description,
      // Portrait first: it is what a Person rich result wants. The social
      // banner stays as a second option for consumers that prefer 1200×630.
      image: [`${url}avatar.webp`, `${PROFILE.siteUrl}/og-image.png`],
      email: `mailto:${PROFILE.email}`,
      nationality: { '@type': 'Country', name: 'Russia' },
      sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.telegram, PROFILE.max],
      hasOccupation: { '@type': 'Occupation', name: jobTitle, skills: OCCUPATION_SKILLS },
      knowsAbout: KNOWS_ABOUT,
      knowsLanguage: KNOWS_LANGUAGE,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: alumniOf,
        address: { '@type': 'PostalAddress', addressLocality: 'Taganrog', addressCountry: 'RU' },
      },
      address: { '@type': 'PostalAddress', addressLocality: 'Taganrog', addressCountry: 'RU' },
    };
  }

  #inject(data: unknown): void {
    let script = this.#doc.querySelector<HTMLScriptElement>(`#${SCRIPT_ID}`);

    if (!script) {
      script = this.#doc.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      this.#doc.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }
}
