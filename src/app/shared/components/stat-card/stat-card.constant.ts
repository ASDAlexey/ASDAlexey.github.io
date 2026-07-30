/** How long the count-up runs, in milliseconds, once the card scrolls into view. */
export const COUNT_UP_DURATION_MS = 1600;

/** Suffix that marks a stat as a share of a whole, and so earns a progress ring. */
export const PERCENT_SUFFIX = '%';

/** Value a percentage ring is full at. */
export const RING_FULL = 100;

/**
 * IntersectionObserver options for the count-up — starts the animation as soon
 * as the card edges into view, matching the scroll-reveal timing.
 */
export const STAT_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: '0px 0px -10% 0px',
};
