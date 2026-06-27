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
  'Angular Signals',
  'Nx monorepo',
  'Micro-frontends',
  'Server-Side Rendering',
  'Smart TV',
  'Ionic',
  'Tauri',
  'Rust',
  'GitLab CI/CD',
  'Docker',
  'Unit testing',
  'AI-assisted development',
] as const;

const OCCUPATION_SKILLS = 'Angular, TypeScript, RxJS, NgRx, Signals, Nx, SSR, GitLab CI/CD';

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
        { '@type': 'WebSite', '@id': `${url}#website`, name: PROFILE.name, url, inLanguage: lang },
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
    const description = $localize`:@@ld.description:Tech Lead and Senior Angular Developer with 14+ years of experience, shipping Angular on web (SSR), Smart TV, mobile (Ionic) and desktop (Tauri/Rust).`;

    return {
      '@type': 'Person',
      '@id': `${url}#person`,
      name: PROFILE.name,
      // Both spellings on every locale so Google and Yandex resolve the
      // Latin and Cyrillic name to one entity.
      alternateName: ['Alexey Popov', 'Алексей Попов'],
      url,
      jobTitle,
      description,
      image: `${PROFILE.siteUrl}/og-image.png`,
      email: `mailto:${PROFILE.email}`,
      nationality: { '@type': 'Country', name: 'Russia' },
      sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.telegram],
      hasOccupation: { '@type': 'Occupation', name: jobTitle, skills: OCCUPATION_SKILLS },
      knowsAbout: KNOWS_ABOUT,
      knowsLanguage: ['Russian', 'English'],
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
