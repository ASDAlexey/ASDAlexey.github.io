import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Testimonial } from '@core/models/portfolio.interface';
import { TestimonialCard } from './testimonial-card';

const base: Testimonial = {
  quote: 'A great developer and team player.',
  author: 'Steve Cronan',
  title: 'Ex-CEO / CTO, The 5th Kind',
};

function render(testimonial: Testimonial): ComponentFixture<TestimonialCard> {
  const fixture = TestBed.createComponent(TestimonialCard);
  fixture.componentRef.setInput('testimonial', testimonial);
  fixture.detectChanges();

  return fixture;
}

describe('TestimonialCard', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders the quote, author and title', () => {
    const el: HTMLElement = render(base).nativeElement;

    expect(el.querySelector('.card__quote')?.textContent).toContain('A great developer');
    expect(el.querySelector('.card__name')?.textContent).toContain('Steve Cronan');
    expect(el.querySelector('.card__title')?.textContent).toContain('Ex-CEO / CTO');
  });

  it('shows initials without a photo and an image when one is provided', () => {
    expect(render(base).componentInstance.initials()).toBe('SC');
    expect(render(base).nativeElement.querySelector('.card__avatar_photo')).toBeNull();
    expect(render({ ...base, author: 'Eugene Golubev' }).componentInstance.initials()).toBe('EG');
    expect(render({ ...base, author: 'Cher' }).componentInstance.initials()).toBe('C');

    const host: HTMLElement = render({ ...base, image: 'steve.webp' }).nativeElement;
    const img = host.querySelector<HTMLImageElement>('.card__avatar_photo');

    expect(img?.getAttribute('src')).toBe('steve.webp');
    expect(img?.getAttribute('alt')).toBe('Steve Cronan');
  });

  it('confirms before opening the external profile, then navigates', () => {
    const href = 'https://www.linkedin.com/in/stevecronan/';
    const host: HTMLElement = render({ ...base, href }).nativeElement;
    const dialog = host.querySelector('dialog');

    if (!dialog) {
      throw new Error('dialog was not rendered');
    }

    // jsdom does not implement showModal/close — replace them with mocks.
    dialog.showModal = vi.fn();
    dialog.close = vi.fn();
    const open = vi.spyOn(globalThis.window, 'open').mockReturnValue(null);

    host.querySelector<HTMLButtonElement>('.card__open')?.click();

    expect(dialog.showModal).toHaveBeenCalledOnce();

    host.querySelector<HTMLButtonElement>('.confirm__btn_primary')?.click();

    expect(open).toHaveBeenCalledWith(href, '_blank', 'noopener,noreferrer');
    expect(dialog.close).toHaveBeenCalledOnce();
  });

  it('cancels without navigating', () => {
    const host: HTMLElement = render({ ...base, href: 'https://example.test/' }).nativeElement;
    const dialog = host.querySelector('dialog');

    if (!dialog) {
      throw new Error('dialog was not rendered');
    }

    dialog.close = vi.fn();
    const open = vi.spyOn(globalThis.window, 'open').mockReturnValue(null);

    host.querySelector<HTMLButtonElement>('.confirm__btn_ghost')?.click();

    expect(dialog.close).toHaveBeenCalledOnce();
    expect(open).not.toHaveBeenCalled();
  });

  it('hides the controls and guards the actions when there is no href', () => {
    const fixture = render(base);
    const open = vi.spyOn(globalThis.window, 'open');

    expect(fixture.nativeElement.querySelector('.card__open')).toBeNull();
    expect(fixture.nativeElement.querySelector('dialog')).toBeNull();
    expect(() => {
      fixture.componentInstance.openConfirm();
      fixture.componentInstance.cancel();
      fixture.componentInstance.confirm();
    }).not.toThrow();
    expect(open).not.toHaveBeenCalled();
  });
});
