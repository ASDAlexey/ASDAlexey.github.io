import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { registerSwiper, swiperOf, toWebp } from './gallery-lightbox.util';

const register = vi.fn();

vi.mock('swiper/element/bundle', () => ({ register: () => register() }));

describe('gallery-lightbox util', () => {
  afterEach(() => vi.restoreAllMocks());

  it('derives the WebP twin of a slide and leaves anything else alone', () => {
    expect(toWebp('my-projects/demo/ru/1.avif')).toBe('my-projects/demo/ru/1.webp');
    expect(toWebp('my-projects/demo/en/diagram.svg')).toBe('my-projects/demo/en/diagram.svg');
  });

  it('finds no carousel before the element has upgraded, and none at all without a dialog', () => {
    const doc = TestBed.inject(DOCUMENT);
    const dialog = doc.createElement('dialog');

    expect(swiperOf(undefined)).toBeUndefined();
    expect(swiperOf(dialog)).toBeUndefined();

    const host = doc.createElement('swiper-container');
    const swiper = { activeIndex: 0, slideTo: () => undefined };
    Object.assign(host, { swiper });
    dialog.append(host);

    expect(swiperOf(dialog)).toBe(swiper);
  });

  it('defines the swiper element once the chunk lands', async () => {
    await registerSwiper();

    expect(register).toHaveBeenCalledOnce();
  });
});
