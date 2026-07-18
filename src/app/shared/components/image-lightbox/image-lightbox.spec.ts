import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ImageLightbox } from './image-lightbox';

describe('ImageLightbox', () => {
  let fixture: ComponentFixture<ImageLightbox>;

  const build = (alt = 'diagram'): ImageLightbox => {
    fixture = TestBed.createComponent(ImageLightbox);
    fixture.componentRef.setInput('src', 'shot.webp');
    fixture.componentRef.setInput('alt', alt);

    return fixture.componentInstance;
  };

  const query = (selector: string): HTMLElement | null => fixture.nativeElement.querySelector(selector);

  afterEach(() => vi.restoreAllMocks());

  it('shows the image as a modal, closing on the backdrop and button but not the figure', () => {
    build();
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const dialog = host.querySelector('dialog');

    if (!dialog) {
      throw new Error('dialog was not rendered');
    }

    // jsdom does not implement showModal/close — replace them with mocks.
    dialog.showModal = vi.fn();
    dialog.close = vi.fn();

    expect(query('.lightbox__img')?.getAttribute('src')).toBe('shot.webp');
    expect(query('.lightbox__img')?.getAttribute('alt')).toBe('diagram');
    expect(dialog.getAttribute('aria-label')).toBe('diagram');
    expect(query('.lightbox__caption')?.textContent).toContain('diagram');

    fixture.componentInstance.open();
    expect(dialog.showModal).toHaveBeenCalledOnce();

    // A click inside the figure leaves it open.
    query('.lightbox__figure')?.click();
    query('.lightbox__img')?.click();
    expect(dialog.close).not.toHaveBeenCalled();

    // The backdrop (the dialog itself) and the close button both close it.
    dialog.click();
    query('.lightbox__close')?.click();
    expect(dialog.close).toHaveBeenCalledTimes(2);
  });

  it('drops the caption and aria-label when there is no alt text', () => {
    build('');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('dialog').getAttribute('aria-label')).toBeNull();
    expect(query('.lightbox__caption')).toBeNull();
  });
});
