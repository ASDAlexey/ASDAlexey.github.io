import { Stat } from '../../../core/models/portfolio.interface';

export const NUMERIC_STAT: Stat = { value: '14', suffix: '+', caption: 'years shipping' };

export const TEXT_STAT: Stat = { value: '∞', suffix: '', caption: 'possibilities' };

const EMPTY_RECT: DOMRectReadOnly = new DOMRect();

export const createIntersectionEntry = (target: Element, isIntersecting: boolean): IntersectionObserverEntry => ({
  boundingClientRect: EMPTY_RECT,
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: EMPTY_RECT,
  isIntersecting,
  rootBounds: null,
  target,
  time: 0,
});
