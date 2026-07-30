import { DOCUMENT } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockIntersectionObserver } from '../../spec-utils/intersection-observer.mock';
import { NAV_SECTION_IDS } from './nav.constant';
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

  it('tracks which section is in view and highlights its link', () => {
    create();

    expect(observer().observe).toHaveBeenCalledTimes(NAV_SECTION_IDS.length);

    // Entering a section marks it active…
    observer().fire(true, sections[1]);
    fixture.detectChanges();
    expect(fixture.componentInstance.active()).toBe('experience');
    expect(isActive('experience')).toBe(true);
    expect(isActive('about')).toBe(false);

    // …a batch from a fast scroll resolves to the last one entering…
    observer().fireBatch([
      [sections[1], false],
      [sections[2], true],
    ]);
    expect(fixture.componentInstance.active()).toBe('projects');

    // …a different section leaving is ignored…
    observer().fire(false, sections[0]);
    expect(fixture.componentInstance.active()).toBe('projects');

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
