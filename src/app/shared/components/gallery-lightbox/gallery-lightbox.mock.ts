import { GallerySlide } from '@core/models/portfolio.interface';

export const SLIDE_ONE: GallerySlide = {
  id: '1',
  src: '/my-projects/demo/ru/1.avif',
  thumb: '/my-projects/demo/ru/1-thumb.avif',
  width: 1200,
  height: 620,
  vector: false,
};

export const SLIDE_TWO: GallerySlide = {
  id: '2',
  src: '/my-projects/demo/ru/2.avif',
  thumb: '/my-projects/demo/ru/2-thumb.avif',
  width: 1200,
  height: 2400,
  vector: false,
};

export const SLIDE_VECTOR: GallerySlide = {
  id: 'diagram',
  src: '/my-projects/demo/en/diagram.svg',
  thumb: '/my-projects/demo/en/diagram.svg',
  width: 1200,
  height: 630,
  vector: true,
};

export const SLIDES: readonly GallerySlide[] = [SLIDE_ONE, SLIDE_TWO];
