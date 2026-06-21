import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';

function setup(localeId: string): LocaleService {
  TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: localeId }] });

  return TestBed.inject(LocaleService);
}

describe('LocaleService', () => {
  it('detects the English locale (and ru as alternate)', () => {
    const service = setup('en-US');

    expect(service.current).toBe('en');
    expect(service.alternate).toBe('ru');
  });

  it('detects the Russian locale (and en as alternate)', () => {
    const service = setup('ru');

    expect(service.current).toBe('ru');
    expect(service.alternate).toBe('en');
  });

  it('builds an absolute locale URL', () => {
    const service = setup('en');

    expect(service.localeUrl('ru')).toBe('https://asdalexey.github.io/ru/');
  });

  it('exposes the alternate option when current is en', () => {
    const service = setup('en');

    expect(service.alternateOption).toEqual({ code: 'ru', label: 'RU', href: '/ru/' });
  });

  it('exposes the alternate option when current is ru', () => {
    const service = setup('ru');

    expect(service.alternateOption).toEqual({ code: 'en', label: 'EN', href: '/en/' });
  });
});
