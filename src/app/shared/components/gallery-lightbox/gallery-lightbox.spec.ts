import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { GalleryLightbox } from './gallery-lightbox';
import { SLIDES, SLIDE_VECTOR } from './gallery-lightbox.mock';
import { toWebp } from './gallery-lightbox.util';

// The carousel chunk is fetched on the first browser render; jsdom has no business loading 360 kB
// of it to prove the component asked.
vi.mock('swiper/element/bundle', () => ({ register: vi.fn() }));

describe('GalleryLightbox', () => {
  let fixture: ComponentFixture<GalleryLightbox>;

  const build = (slides = SLIDES, alt = 'diagram'): GalleryLightbox => {
    fixture = TestBed.createComponent(GalleryLightbox);
    fixture.componentRef.setInput('slides', slides);
    fixture.componentRef.setInput('alt', alt);
    fixture.detectChanges();

    return fixture.componentInstance;
  };

  const query = (selector: string): HTMLElement | null => fixture.nativeElement.querySelector(selector);

  /** jsdom implements neither showModal nor close — and `close` has to fire its event by hand. */
  const stubDialog = (): HTMLDialogElement => {
    const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');

    dialog.showModal = vi.fn();
    dialog.close = vi.fn(() => dialog.dispatchEvent(new Event('close')));

    return dialog;
  };

  afterEach(() => vi.restoreAllMocks());

  it('renders the carousel only while open, and closes on the backdrop and the button', () => {
    const component = build();
    const dialog = stubDialog();

    // Nothing is decoded for a card nobody clicked.
    expect(query('.gallery__figure')).toBeNull();

    component.open();
    fixture.detectChanges();

    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(dialog.getAttribute('aria-label')).toBe('diagram');
    expect(query('.gallery__caption')?.textContent).toContain('diagram');
    expect(query('.gallery__count-now')?.textContent).toBe('1');
    expect(query('.gallery__count-all')?.textContent).toBe('2');
    expect(fixture.nativeElement.querySelectorAll('swiper-slide').length).toBe(2);
    // Four corner marks per slide; the stylesheet shows them on the active one only.
    expect(fixture.nativeElement.querySelectorAll('.gallery__mark').length).toBe(8);
    expect(query('.gallery__img')?.getAttribute('src')).toBe(toWebp(SLIDES[0].src));

    // A click inside the figure leaves it open; the dialog itself (backdrop) closes it.
    query('.gallery__figure')?.click();
    expect(dialog.close).not.toHaveBeenCalled();

    dialog.click();
    fixture.detectChanges();

    expect(dialog.close).toHaveBeenCalledOnce();
    expect(component.opened()).toBe(false);
  });

  it('walks the slides with the arrows and stops at both ends', () => {
    const component = build();

    stubDialog();
    component.open();
    fixture.detectChanges();

    const prev: HTMLButtonElement = fixture.nativeElement.querySelector('.gallery__nav_prev');
    const next: HTMLButtonElement = fixture.nativeElement.querySelector('.gallery__nav_next');

    expect(prev.disabled).toBe(true);

    next.click();
    fixture.detectChanges();

    expect(component.index()).toBe(1);
    expect(next.disabled).toBe(true);
    expect(query('.gallery__count-now')?.textContent).toBe('2');

    // Past the last slide is a no-op rather than an index nothing can render.
    component.step(1);
    expect(component.index()).toBe(1);

    prev.click();
    expect(component.index()).toBe(0);

    // A swipe moves the carousel behind Angular's back; the counter reads it off the instance.
    // Before the element upgrades there is no instance, and the counter simply stays put.
    component.onSlideChange();
    expect(component.index()).toBe(0);

    const host: HTMLElement = fixture.nativeElement.querySelector('swiper-container');
    Object.assign(host, { swiper: { activeIndex: 1, slideTo: () => undefined } });
    host.dispatchEvent(new CustomEvent('swiperslidechange'));

    expect(component.index()).toBe(1);
  });

  it('drops the caption, counter and arrows for a lone vector slide', () => {
    const component = build([SLIDE_VECTOR], '');

    stubDialog();
    component.open();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('dialog').getAttribute('aria-label')).toBeNull();
    expect(query('.gallery__caption')).toBeNull();
    expect(query('.gallery__count')).toBeNull();
    expect(query('.gallery__nav_prev')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('source').length).toBe(0);
    expect(query('.gallery__img')?.getAttribute('src')).toBe(SLIDE_VECTOR.src);
  });
});
