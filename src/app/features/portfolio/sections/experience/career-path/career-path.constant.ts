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
