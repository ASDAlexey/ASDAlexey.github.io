/** Class on each character span, and the variable it carries for its own share of the wave. */
export const HOVER_LETTER_CLASS = 'letter-hover__char';
export const HOVER_NEAR_VAR = '--near';

/**
 * How far from a glyph's centre the wave still reaches, in px.
 *
 * Wide enough that three or four letters move together — one letter rising alone reads as a
 * glitch, a group reads as the line reacting to a hand.
 */
export const HOVER_REACH_PX = 46;
