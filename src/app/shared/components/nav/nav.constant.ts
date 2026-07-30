/** Section ids the nav tracks, in document order. */
export const NAV_SECTION_IDS = ['about', 'experience', 'projects', 'recommendations'] as const;

/**
 * IntersectionObserver options for the active-link spy.
 *
 * The margins collapse the viewport to a thin band across its middle, so the
 * "current" section is whichever one the reader is actually looking at rather
 * than whichever one merely peeks in at the bottom edge.
 */
export const NAV_SPY_OPTIONS: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: '-45% 0px -50% 0px',
};
