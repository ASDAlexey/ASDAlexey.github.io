/** Glyph pool the scramble draws from — mono-friendly, no letters that read as words. */
export const DECODE_GLYPHS = '#$%&/<>@[]{}~*+=01';

/** How long the whole string takes to resolve, in milliseconds. */
export const DECODE_DURATION_MS = 1300;

/**
 * Delay before the scramble starts, in milliseconds.
 *
 * The hero paints its real text first (it is prerendered and the fonts are
 * preloaded), then the effect takes over — so the name is never missing, it
 * only briefly turns to noise and settles.
 */
export const DECODE_DELAY_MS = 140;

/**
 * How often the glyphs are re-rolled, in milliseconds.
 *
 * Deliberately much slower than a frame: re-rolling every 16ms reads as a
 * jitter, while a few rolls per second reads as text resolving.
 */
export const DECODE_TICK_MS = 70;

/**
 * Width of the soft edge ahead of the wavefront, in characters.
 *
 * Characters behind the wave are settled and characters far ahead of it are
 * pure noise; the ones inside this window flicker between the two with a
 * probability that rises as the wave approaches, which is what turns a hard
 * boundary sweeping across the name into a gradient of text emerging.
 */
export const DECODE_SOFT_CHARS = 6;
