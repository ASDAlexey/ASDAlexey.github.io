import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { LocaleService } from './locale.service';
import { LocaleCode } from '@core/models/portfolio.interface';
import { PROFILE } from '@shared/data/portfolio.data';

interface SeoCopy {
  readonly title: string;
  readonly description: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);
  readonly #doc = inject(DOCUMENT);
  readonly #locale = inject(LocaleService);

  readonly #copy: Record<LocaleCode, SeoCopy> = {
    en: {
      title: $localize`:@@seo.title:Alexey Popov — Tech Lead / Senior Angular Developer`,
      description: $localize`:@@seo.desc:Tech Lead / Senior Angular Developer (NgRx). 14+ years of Angular across every platform — Web (SSR), Smart TV, Mobile (Ionic), Desktop (Tauri/Rust). Nx, GitLab CI/CD, 90%+ test coverage, AI code-review. Frontend team lead.`,
    },
    ru: {
      title: $localize`:@@seo.title:Alexey Popov — Tech Lead / Senior Angular Developer`,
      description: $localize`:@@seo.desc:Tech Lead / Senior Angular Developer (NgRx). 14+ years of Angular across every platform — Web (SSR), Smart TV, Mobile (Ionic), Desktop (Tauri/Rust). Nx, GitLab CI/CD, 90%+ test coverage, AI code-review. Frontend team lead.`,
    },
  };

  init(): void {
    const current = this.#locale.current;
    const copy = this.#copy[current];
    const ogLocale = current === 'ru' ? 'ru_RU' : 'en_US';
    const ogAlternate = current === 'ru' ? 'en_US' : 'ru_RU';
    const ogImage = `${PROFILE.siteUrl}/og-image.png`;

    // Reflect the build locale on <html lang> — search engines (especially
    // Yandex) weight it heavily for language targeting; it ships baked into
    // each prerendered locale instead of the static "en" from index.html.
    this.#doc.documentElement.lang = current;

    this.#title.setTitle(copy.title);
    this.#meta.updateTag({ name: 'description', content: copy.description });
    this.#meta.updateTag({ name: 'author', content: PROFILE.name });

    this.#meta.updateTag({ property: 'og:type', content: 'website' });
    this.#meta.updateTag({ property: 'og:site_name', content: PROFILE.name });
    this.#meta.updateTag({ property: 'og:title', content: copy.title });
    this.#meta.updateTag({ property: 'og:description', content: copy.description });
    this.#meta.updateTag({ property: 'og:url', content: this.#locale.localeUrl(current) });
    this.#meta.updateTag({ property: 'og:image', content: ogImage });
    this.#meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.#meta.updateTag({ property: 'og:image:height', content: '630' });
    this.#meta.updateTag({ property: 'og:image:alt', content: copy.title });
    this.#meta.updateTag({ property: 'og:locale', content: ogLocale });
    this.#meta.updateTag({ property: 'og:locale:alternate', content: ogAlternate });

    this.#meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.#meta.updateTag({ name: 'twitter:title', content: copy.title });
    this.#meta.updateTag({ name: 'twitter:description', content: copy.description });
    this.#meta.updateTag({ name: 'twitter:image', content: ogImage });
    this.#meta.updateTag({ name: 'twitter:image:alt', content: copy.title });

    this.#setLink('canonical', null, this.#locale.localeUrl(current));
    this.#setLink('alternate', 'en', this.#locale.localeUrl('en'));
    this.#setLink('alternate', 'ru', this.#locale.localeUrl('ru'));
    this.#setLink('alternate', 'x-default', this.#locale.localeUrl('en'));
  }

  #setLink(rel: string, hreflang: string | null, href: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.#doc.head.querySelector<HTMLLinkElement>(selector);

    if (!link) {
      link = this.#doc.createElement('link');
      link.setAttribute('rel', rel);

      if (hreflang) {
        link.setAttribute('hreflang', hreflang);
      }

      this.#doc.head.appendChild(link);
    }

    link.setAttribute('href', href);
  }
}
