import { GallerySlide, Project } from '@core/models/portfolio.interface';

export const PHONE_SLIDE: GallerySlide = {
  id: '1-stopwatch',
  src: 'my-projects/sportdiary/ru/1-stopwatch.avif',
  thumb: 'my-projects/sportdiary/ru/1-stopwatch-thumb.avif',
  width: 400,
  height: 840,
  vector: false,
};

export const DESK_SLIDE: GallerySlide = {
  id: 'dashboard',
  src: 'my-projects/sportdiary/ru/dashboard.avif',
  thumb: 'my-projects/sportdiary/ru/dashboard-thumb.avif',
  width: 1200,
  height: 620,
  vector: false,
};

export const VECTOR_SLIDE: GallerySlide = {
  id: 'vitest-auto-spy',
  src: 'my-projects/vitest-auto-spy/en/vitest-auto-spy.svg',
  thumb: 'my-projects/vitest-auto-spy/en/vitest-auto-spy.svg',
  width: 1200,
  height: 630,
  vector: true,
};

export const WITH_LINKS: Project = {
  name: 'vitest-auto-spy',
  badge: 'Library · Open Source',
  description: 'Typed auto-mocking for Vitest.',
  links: [
    { label: 'npm', href: 'https://www.npmjs.com/package/vitest-auto-spy' },
    { label: 'GitHub', href: 'https://github.com/ASDAlexey/vitest-auto-spy' },
  ],
  tags: ['Vitest', 'TypeScript'],
  featured: true,
  gallery: 'vitest-auto-spy',
  imageAlt: 'one API, three runtimes diagram',
};

/** `cover` names the second shot, so the tile is not simply the gallery's first. */
export const WITH_COVER: Project = {
  name: 'Sportdiary',
  badge: 'Mobile · Personal',
  description: 'Full-stack running tracker.',
  links: [],
  tags: ['Ionic'],
  featured: false,
  gallery: 'sportdiary',
  cover: '1-stopwatch',
  imageAlt: 'Sportdiary — stopwatch screen',
};

export const NO_MEDIA: Project = {
  name: 'Bonds-tracker',
  badge: 'Desktop · Personal',
  description: 'Personal bonds tracker.',
  links: [],
  tags: ['Angular'],
  featured: false,
};
