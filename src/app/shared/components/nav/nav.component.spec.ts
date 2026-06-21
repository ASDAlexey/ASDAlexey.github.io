import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'en' }] });
    fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
  });

  it('renders the brand name', () => {
    expect(fixture.nativeElement.querySelector('.nav__name').textContent).toContain('Alexey Popov');
  });

  it('renders in-page navigation links and the GitHub CTA', () => {
    const links = [...fixture.nativeElement.querySelectorAll('.nav__links a')].map((a: HTMLAnchorElement) => a.textContent?.trim());

    expect(links).toEqual(expect.arrayContaining(['About', 'Experience', 'Projects', 'GitHub ↗']));
    expect(fixture.nativeElement.querySelector('.nav__cta').getAttribute('href')).toContain('github.com/ASDAlexey');
  });

  it('embeds the language switcher', () => {
    expect(fixture.nativeElement.querySelector('app-language-switcher')).toBeTruthy();
  });
});
