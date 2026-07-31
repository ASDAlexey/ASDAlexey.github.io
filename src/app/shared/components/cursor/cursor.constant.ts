/**
 * How many circles make up the trail, head included.
 *
 * Seven is where the tail stops reading as separate dots and starts reading as one tapering
 * stroke, without so many nodes that a fast flick draws a caterpillar across the page.
 */
export const CURSOR_DOTS = 7;

/** Indices the template iterates, and the value each dot publishes as `--i` for its size. */
export const CURSOR_INDICES = Array.from({ length: CURSOR_DOTS }, (_, index) => index);

/**
 * Share of the remaining gap a circle closes each frame.
 *
 * The head chases the pointer at this rate and every following circle chases the one ahead of it,
 * so the lag compounds down the chain and the tail falls out of the arithmetic rather than out of
 * a stored history of positions.
 */
export const CURSOR_EASE = 0.34;

/** Below this the chain has caught up and the loop stops until the pointer moves again. */
export const CURSOR_REST_PX = 0.4;

/** Marks the trail as having a position to draw — before the first move it has none. */
export const CURSOR_ON_CLASS = 'cursor_on';
