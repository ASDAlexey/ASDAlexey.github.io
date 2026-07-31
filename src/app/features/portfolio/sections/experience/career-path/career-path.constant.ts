/** Width of the rail, in px — also the SVG's user-space width. */
export const PATH_WIDTH = 34;

/** Horizontal extremes the snake weaves between, in px. */
export const PATH_LEFT = 9;
export const PATH_RIGHT = 25;

/** Height below which the rail is not worth drawing (an unmeasured host). */
export const MIN_PATH_HEIGHT = 80;

/**
 * Share of the gap between two nodes that the bezier control points reach.
 *
 * 0.5 puts them halfway, which rounds each turn into a smooth S instead of a
 * corner, without letting the curve overshoot the rail's width.
 */
export const CURVE_TENSION = 0.5;

/**
 * How much of the section's scroll a stop takes to light up, in per cent.
 *
 * Six is about a fifth of a second at a comfortable scroll: long enough to read as a flare rather
 * than a repaint, short enough that the dot has not left the stop behind by the time it finishes.
 */
export const STOP_FLARE_SPAN = 6;
