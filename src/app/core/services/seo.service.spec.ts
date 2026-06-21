import { DOCUMENT } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { SeoService } from './seo.service';

function setup(localeId: string): { service: SeoService; doc: Document } {
  TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: localeId }] });

  return { service: TestBed.inject(SeoService), doc: TestBed.inject(DOCUMENT) };
}

describe('SeoService', () => {
  it('sets English title, description and OG locale', () => {
    const { service, doc } = setup('en');

    service.init();

    expect(TestBed.inject(Title).getTitle()).toContain('Alexey Popov');
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('Angular');
    expect(doc.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('en_US');
    expect(doc.querySelector('meta[property="og:locale:alternate"]')?.getAttribute('content')).toBe('ru_RU');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://asdalexey.github.io/en/');
  });

  it('writes reciprocal hreflang alternates', () => {
    const { service, doc } = setup('en');

    service.init();

    expect(doc.querySelector('link[rel="alternate"][hreflang="en"]')?.getAttribute('href')).toBe('https://asdalexey.github.io/en/');
    expect(doc.querySelector('link[rel="alternate"][hreflang="ru"]')?.getAttribute('href')).toBe('https://asdalexey.github.io/ru/');
    expect(doc.querySelector('link[rel="alternate"][hreflang="x-default"]')?.getAttribute('href')).toBe('https://asdalexey.github.io/en/');
  });

  it('reuses existing head links on repeated init (no duplicates)', () => {
    const { service, doc } = setup('en');

    service.init();
    service.init();

    expect(doc.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(doc.querySelectorAll('link[rel="alternate"][hreflang="ru"]').length).toBe(1);
  });

  it('sets Russian OG locale and canonical', () => {
    const { service, doc } = setup('ru');

    service.init();

    expect(doc.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('ru_RU');
    expect(doc.querySelector('meta[property="og:locale:alternate"]')?.getAttribute('content')).toBe('en_US');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://asdalexey.github.io/ru/');
  });
});
