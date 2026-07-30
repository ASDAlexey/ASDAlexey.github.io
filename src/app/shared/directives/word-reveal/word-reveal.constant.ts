/** Class the wrapped words carry; the cascade itself is styled globally. */
export const WORD_CLASS = 'word-reveal__word';

/** Class toggled on the host while it is in view, which plays the cascade. */
export const SPOKEN_CLASS = 'is-spoken';

/** Delay added per word, in seconds — the pace the sentence "speaks" at. */
export const WORD_STEP_S = 0.035;

/** Longest stagger, in seconds, so a long quote's tail does not lag behind. */
export const WORD_MAX_DELAY_S = 1.2;

/**
 * IntersectionObserver options for the cascade — matches the site's other
 * reveals, so a quote starts speaking on the same beat as the card around it.
 */
export const WORD_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: '0px 0px -12% 0px',
};
