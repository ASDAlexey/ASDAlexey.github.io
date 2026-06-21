import { DOCUMENT } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { StructuredDataService } from './structured-data.service';

function setup(localeId: string): { service: StructuredDataService; doc: Document } {
  TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: localeId }] });

  return { service: TestBed.inject(StructuredDataService), doc: TestBed.inject(DOCUMENT) };
}

describe('StructuredDataService', () => {
  it('injects a JSON-LD graph with Person, WebSite and ProfilePage (en)', () => {
    const { service, doc } = setup('en');

    service.init();

    const script = doc.getElementById('ld-json');
    expect(script?.getAttribute('type')).toBe('application/ld+json');

    const json = JSON.parse(script?.textContent ?? '{}');
    const types = json['@graph'].map((node: { '@type': string }) => node['@type']);
    expect(types).toEqual(['Person', 'WebSite', 'ProfilePage']);
    expect(json['@graph'][1].inLanguage).toBe('en');
  });

  it('reuses the same script element and localises to ru', () => {
    const { service, doc } = setup('ru');

    service.init();
    service.init();

    expect(doc.querySelectorAll('#ld-json').length).toBe(1);
    const json = JSON.parse(doc.getElementById('ld-json')?.textContent ?? '{}');
    expect(json['@graph'][1].inLanguage).toBe('ru');
    expect(json['@graph'][0].url).toBe('https://asdalexey.github.io/ru/');
  });
});
