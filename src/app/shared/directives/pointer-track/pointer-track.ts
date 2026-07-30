import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

import { POINTER_VARS } from './pointer-track.constant';
import { prefersReducedMotion } from '@shared/utils/motion';

/**
 * Publishes the pointer's position inside the host as CSS custom properties, so
 * styles can react to the cursor without any of the work living in a template.
 *
 * One listener feeds every cursor-driven effect on the site — the spotlight that
 * follows the pointer across a project card, the 3D tilt of that same card, and
 * the aurora glows that lean toward the cursor in the hero. Which of those a
 * host actually does is decided purely in CSS, by reading the variables listed
 * in `POINTER_VARS`.
 *
 * Writes are coalesced into one `requestAnimationFrame` per frame and the
 * listeners are passive, so a fast drag can never outrun the compositor.
 * Everything is set up in `afterNextRender` (nothing on the server) and skipped
 * outright for visitors who prefer reduced motion — leaving the variables at
 * their CSS defaults, which every consumer styles as the resting state.
 */
@Directive({
  selector: '[appPointerTrack]',
  host: {
    class: 'pointer-track',
  },
})
export class PointerTrack {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #destroyRef = inject(DestroyRef);

  /** Latest pointer event position, consumed by the next scheduled frame. */
  #pending: { x: number; y: number } | null = null;

  #frame: number | null = null;

  constructor() {
    afterNextRender(() => this.#bind());
  }

  #bind(): void {
    if (prefersReducedMotion()) {
      return;
    }

    const el = this.#host.nativeElement;
    const move = (event: PointerEvent): void => this.#schedule(event);
    const leave = (): void => this.#rest();

    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave, { passive: true });

    this.#destroyRef.onDestroy(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      this.#cancel();
    });
  }

  #schedule(event: PointerEvent): void {
    this.#pending = { x: event.clientX, y: event.clientY };

    if (this.#frame !== null) {
      return;
    }

    this.#frame = requestAnimationFrame(() => {
      this.#frame = null;
      this.#apply();
    });
  }

  /**
   * Converts the buffered viewport coordinates into element-local values. The
   * rect is read inside the frame callback, so a card that moved (hover lift,
   * scroll) still maps the cursor to the right spot.
   */
  #apply(): void {
    const point = this.#pending;

    if (!point) {
      return;
    }

    const el = this.#host.nativeElement;
    const rect = el.getBoundingClientRect();
    const x = point.x - rect.left;
    const y = point.y - rect.top;

    el.style.setProperty(POINTER_VARS.x, `${Math.round(x)}px`);
    el.style.setProperty(POINTER_VARS.y, `${Math.round(y)}px`);
    el.style.setProperty(POINTER_VARS.nx, (x / rect.width - 0.5).toFixed(3));
    el.style.setProperty(POINTER_VARS.ny, (y / rect.height - 0.5).toFixed(3));
    el.style.setProperty(POINTER_VARS.on, '1');
  }

  /**
   * Returns to centre on leave. The position variables are kept as-is so the
   * spotlight fades out where it was instead of sliding back to a corner.
   */
  #rest(): void {
    this.#cancel();
    this.#pending = null;

    const style = this.#host.nativeElement.style;

    style.setProperty(POINTER_VARS.nx, '0');
    style.setProperty(POINTER_VARS.ny, '0');
    style.setProperty(POINTER_VARS.on, '0');
  }

  #cancel(): void {
    if (this.#frame !== null) {
      cancelAnimationFrame(this.#frame);
      this.#frame = null;
    }
  }
}
