/**
 * CSS custom properties the directive writes on its host.
 *
 * `x`/`y` are pixel offsets inside the element (spotlight gradients read them
 * directly); `nx`/`ny` are the same position normalised to `-0.5…0.5` around the
 * centre, which is what tilt transforms multiply by an angle. `on` is a 0/1
 * switch styles fade with, so leaving the element eases the effect out instead
 * of snapping it off.
 */
export const POINTER_VARS = {
  x: '--pt-x',
  y: '--pt-y',
  nx: '--pt-nx',
  ny: '--pt-ny',
  on: '--pt-on',
} as const;
