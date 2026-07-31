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

/**
 * True when the visitor has a real cursor to decorate — a mouse or a trackpad.
 *
 * Guards the pointer-led effects that a finger cannot trigger and should not pay for: the comet
 * trail and the hover wave in the footer both hang off a pointer position that a touch screen only
 * reports mid-tap. Same shape as the check above: safe on the server, false where unknown.
 */
export function supportsHover(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;
}
