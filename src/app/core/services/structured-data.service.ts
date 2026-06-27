import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

import { LocaleService } from './locale.service';
import { PROFILE } from '@shared/data/portfolio.data';

const SCRIPT_ID = 'ld-json';

@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  readonly #doc = inject(DOCUMENT);
  readonly #locale = inject(LocaleService);

  init(): void {
    const lang = this.#locale.current;
    const url = this.#locale.localeUrl(lang);
    const jobTitle = $localize`:@@ld.jobTitle:Tech Lead / Senior Angular Developer`;

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: PROFILE.name,
          url,
          jobTitle,
          image: `${PROFILE.siteUrl}/og-image.png`,
          email: `mailto:${PROFILE.email}`,
          sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.telegram],
          knowsAbout: [
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
          ],
          knowsLanguage: ['Russian', 'English'],
          address: { '@type': 'PostalAddress', addressLocality: 'Taganrog', addressCountry: 'RU' },
        },
        { '@type': 'WebSite', name: PROFILE.name, url, inLanguage: lang },
        {
          '@type': 'ProfilePage',
          name: PROFILE.name,
          url,
          inLanguage: lang,
          about: { '@type': 'Person', name: PROFILE.name },
        },
      ],
    };

    this.#inject(graph);
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
