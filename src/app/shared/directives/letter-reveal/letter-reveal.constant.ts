/** Class each character span carries; the motion itself is styled globally. */
export const LETTER_CLASS = 'letter-reveal__char';

/** Class the word wrappers carry, so a name never breaks apart mid-flight. */
export const LETTER_WORD_CLASS = 'letter-reveal__word';

/**
 * Beat before the first letter lifts, in seconds.
 *
 * Long enough for the hero to have painted (it is prerendered and the fonts are
 * preloaded) and short enough that the page still feels like it opens with the
 * name rather than after it.
 */
export const LETTER_LEAD_S = 0.12;

/**
 * Delay added per character, in seconds — the pace the name assembles at.
 *
 * Deliberately shorter than one letter's travel, so the letters overlap and the
 * line reads as a single wave instead of a queue of separate arrivals.
 */
export const LETTER_STEP_S = 0.038;
