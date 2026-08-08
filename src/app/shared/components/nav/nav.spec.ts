import { DOCUMENT } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockIntersectionObserver } from '../../spec-utils/intersection-observer.mock';
import { NAV_SECTIONS, NAV_SECTION_IDS } from './nav.constant';
import { Nav } from './nav';

describe('Nav', () => {
  let fixture: ComponentFixture<Nav>;
  let sections: HTMLElement[];

  const create = (): void => {
    fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    TestBed.tick();
  };

  const observer = (): MockIntersectionObserver => {
    const instance = MockIntersectionObserver.last;

    if (!instance) {
      throw new Error('IntersectionObserver was not created');
    }

    return instance;
  };

  const isActive = (id: string): boolean =>
    fixture.nativeElement.querySelector(`.nav__links a[href="#${id}"]`).classList.contains('is-active');

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'en' }] });
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    // The sections the nav spies on live in the page, not in this component.
    const document = TestBed.inject(DOCUMENT);

    sections = NAV_SECTION_IDS.map((id) => {
      const section = document.createElement('section');

      section.id = id;
      document.body.append(section);

      return section;
    });
  });

  afterEach(() => {
    fixture.destroy();
    sections.forEach((section) => section.remove());
    vi.unstubAllGlobals();
    MockIntersectionObserver.last = undefined;
  });

  it('renders the brand, the links, the switcher and the progress bar', () => {
    create();

    const links = [...fixture.nativeElement.querySelectorAll('.nav__links a')].map((a: HTMLAnchorElement) => a.textContent?.trim());

    expect(fixture.nativeElement.querySelector('.nav__name').textContent).toContain('Alexey Popov');
    expect(links).toEqual(expect.arrayContaining(['About', 'Experience', 'Projects', 'GitHub ↗']));
    expect(fixture.nativeElement.querySelector('.nav__cta').getAttribute('href')).toContain('github.com/ASDAlexey');
    expect(fixture.nativeElement.querySelector('app-language-switcher')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.nav__progress')).toBeTruthy();
  });

  it('opens the phone sheet from the burger and closes it on a link, the backdrop and the ✕', () => {
    create();

    const el: HTMLElement = fixture.nativeElement;
    const sheet = el.querySelector<HTMLDialogElement>('dialog.sheet');

    if (!sheet) {
      throw new Error('the sheet was not rendered');
    }

    // jsdom implements neither showModal nor close — and `close` has to fire its event by hand.
    sheet.showModal = vi.fn();
    sheet.close = vi.fn(() => sheet.dispatchEvent(new Event('close')));

    const rows = [...sheet.querySelectorAll('.sheet__link')];
    // Read off the constant rather than spelled out, so adding a section to the nav does not
    // fail a test that is about the sheet rendering the list it is given.
    expect(rows.map((row) => row.querySelector('.sheet__index')?.textContent)).toEqual(NAV_SECTIONS.map(({ no }) => no));
    expect(rows[1].getAttribute('href')).toBe(`#${NAV_SECTION_IDS[1]}`);

    el.querySelector<HTMLButtonElement>('.nav__burger')?.click();
    fixture.detectChanges();

    expect(sheet.showModal).toHaveBeenCalledOnce();
    expect(fixture.componentInstance.menuOpen()).toBe(true);
    expect(el.querySelector('.nav__burger')?.getAttribute('aria-expanded')).toBe('true');

    // Following a section closes the sheet behind it…
    rows[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen()).toBe(false);

    // …a tap on the sheet's own padding closes it, one on the list inside does not…
    sheet.querySelector('.sheet__links')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(sheet.close).toHaveBeenCalledOnce();

    sheet.click();
    sheet.querySelector<HTMLButtonElement>('.sheet__close')?.click();
    expect(sheet.close).toHaveBeenCalledTimes(3);
  });

  it('tracks which section is in view and highlights its link', () => {
    create();

    expect(observer().observe).toHaveBeenCalledTimes(NAV_SECTION_IDS.length);

    // Entering a section marks it active…
    observer().fire(true, sections[1]);
    fixture.detectChanges();
    expect(fixture.componentInstance.active()).toBe(NAV_SECTION_IDS[1]);
    expect(isActive(NAV_SECTION_IDS[1])).toBe(true);
    expect(isActive(NAV_SECTION_IDS[0])).toBe(false);

    // …a batch from a fast scroll resolves to the last one entering…
    observer().fireBatch([
      [sections[1], false],
      [sections[2], true],
    ]);
    expect(fixture.componentInstance.active()).toBe(NAV_SECTION_IDS[2]);

    // …a different section leaving is ignored…
    observer().fire(false, sections[0]);
    expect(fixture.componentInstance.active()).toBe(NAV_SECTION_IDS[2]);

    // …and the active one leaving clears the highlight.
    observer().fire(false, sections[2]);
    expect(fixture.componentInstance.active()).toBe('');
  });

  it('skips sections missing from the page and does not spy without observers (SSR)', () => {
    sections.splice(0).forEach((section) => section.remove());
    create();
    expect(observer().observe).not.toHaveBeenCalled();

    fixture.destroy();
    MockIntersectionObserver.last = undefined;
    vi.stubGlobal('IntersectionObserver', undefined);
    create();

    expect(MockIntersectionObserver.last).toBeUndefined();
    expect(fixture.componentInstance.active()).toBe('');
  });
});
