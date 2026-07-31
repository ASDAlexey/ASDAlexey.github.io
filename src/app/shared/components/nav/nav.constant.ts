/**
 * The sections the nav points at, in document order.
 *
 * One list for both renderings — the row of links on a desktop header and the sheet a phone opens
 * from the burger. Two hand-written copies of the same four anchors is how one of them ends up
 * missing a section nobody noticed was added.
 */
export const NAV_SECTIONS = [
  { id: 'about', no: '01', label: $localize`:@@nav.about:About` },
  { id: 'experience', no: '02', label: $localize`:@@nav.experience:Experience` },
  { id: 'projects', no: '03', label: $localize`:@@nav.projects:Projects` },
  { id: 'recommendations', no: '04', label: $localize`:@@nav.recommendations:Recommendations` },
] as const;

/** Section ids the nav tracks, in document order. */
export const NAV_SECTION_IDS = NAV_SECTIONS.map((section) => section.id);

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
