/**
 * True when the visitor asked the OS to minimise animation.
 *
 * Guards every motion effect on the site. Written as a plain function (not a
 * service) so directives can call it before touching the DOM, and safe on the
 * server, where `matchMedia` does not exist — there it reports `false`, and the
 * effects themselves never start because they all set up in `afterNextRender`.
 */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
