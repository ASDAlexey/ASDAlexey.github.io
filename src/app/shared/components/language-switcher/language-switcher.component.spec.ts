import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { LANG_CHOICE_KEY, LanguageSwitcherComponent } from './language-switcher.component';

function render(localeId: string): ComponentFixture<LanguageSwitcherComponent> {
  TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: localeId }] });
  const fixture = TestBed.createComponent(LanguageSwitcherComponent);
  fixture.detectChanges();

  return fixture;
}

describe('LanguageSwitcherComponent', () => {
  it('links to the alternate locale', () => {
    const fixture = render('en');
    const link = fixture.nativeElement.querySelector('a');

    expect(fixture.componentInstance.option.code).toBe('ru');
    expect(link.getAttribute('href')).toBe('/ru/');
    expect(link.textContent.trim()).toBe('RU');
  });

  it('persists the chosen locale in sessionStorage on click', () => {
    sessionStorage.clear();
    const fixture = render('ru');

    fixture.nativeElement.querySelector('a').click();

    expect(sessionStorage.getItem(LANG_CHOICE_KEY)).toBe('en');
  });

  it('swallows sessionStorage errors', () => {
    const fixture = render('en');
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(() => fixture.componentInstance.persist()).not.toThrow();

    spy.mockRestore();
  });
});
