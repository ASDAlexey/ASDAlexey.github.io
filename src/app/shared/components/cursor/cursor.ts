import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';

import { CURSOR_EASE, CURSOR_INDICES, CURSOR_ON_CLASS, CURSOR_REST_PX } from './cursor.constant';
import { prefersReducedMotion, supportsHover } from '@shared/utils/motion';

/**
 * A comet trail that follows the pointer across the whole page.
 *
 * The head chases the cursor, each circle behind it chases the one ahead, and every circle is a
 * little smaller than its predecessor — so the tail stretches on a flick and collapses into a
 * single dot at rest, out of the arithmetic alone. Nothing keeps a history of where the pointer
 * has been.
 *
 * The trail is painted white under `mix-blend-mode: difference` (see the stylesheet), which is
 * what makes it worth having on this palette: over the near-black page it simply reads white, and
 * it inverts only where the page is bright — the amber call to action, the green figures in the
 * stats, the avatar, the screenshots. The effect turns itself on exactly at the accents.
 *
 * The system cursor stays: the trail is an addition, not a replacement, so a link still shows the
 * hand that says it is a link.
 *
 * The loop sleeps as soon as the chain has caught up and wakes on the next move, so a still
 * pointer costs nothing. Positions are written straight to `style.translate` and never through a
 * signal — this application is zoneless, and sixty change-detection passes a second to move seven
 * dots would be sixty too many.
 */
@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cursor.html',
  styleUrl: './cursor.scss',
})
export class Cursor {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #destroyRef = inject(DestroyRef);

  /** Where the pointer was when it last reported in — the whole chain's target. */
  readonly #pointer = { x: 0, y: 0 };

  readonly #points = CURSOR_INDICES.map(() => ({ x: 0, y: 0 }));

  readonly indices = CURSOR_INDICES;

  #dots: readonly HTMLElement[] = [];
  #frame: number | null = null;
  #awake = false;

  constructor() {
    afterNextRender(() => this.#bind());
  }

  #bind(): void {
    if (prefersReducedMotion() || !supportsHover()) {
      return;
    }

    this.#dots = [...this.#host.nativeElement.querySelectorAll<HTMLElement>('.cursor__dot')];

    const root = this.#document.documentElement;
    const move = (event: PointerEvent): void => this.#onMove(event);
    const leave = (): void => this.#onLeave();

    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerleave', leave, { passive: true });

    this.#destroyRef.onDestroy(() => {
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
      this.#cancel();
    });
  }

  /**
   * The first move is a teleport, not a journey: the chain is parked at the origin until then, and
   * easing it across from the corner would draw a stroke the visitor never made.
   */
  #onMove(event: PointerEvent): void {
    this.#pointer.x = event.clientX;
    this.#pointer.y = event.clientY;

    if (!this.#awake) {
      this.#awake = true;
      this.#points.forEach((point) => Object.assign(point, this.#pointer));
      this.#host.nativeElement.classList.add(CURSOR_ON_CLASS);
    }

    this.#schedule();
  }

  /** Pointer off the window — the trail goes with it rather than hanging in the last corner. */
  #onLeave(): void {
    this.#awake = false;
    this.#cancel();
    this.#host.nativeElement.classList.remove(CURSOR_ON_CLASS);
  }

  #schedule(): void {
    if (this.#frame === null) {
      this.#frame = requestAnimationFrame(() => this.#step());
    }
  }

  #step(): void {
    this.#frame = null;

    let target = this.#pointer;
    let moving = false;

    this.#points.forEach((point, index) => {
      const dx = target.x - point.x;
      const dy = target.y - point.y;

      point.x += dx * CURSOR_EASE;
      point.y += dy * CURSOR_EASE;

      if (Math.abs(dx) > CURSOR_REST_PX || Math.abs(dy) > CURSOR_REST_PX) {
        moving = true;
      }

      this.#dots[index].style.setProperty('translate', `${point.x.toFixed(1)}px ${point.y.toFixed(1)}px`);
      target = point;
    });

    if (moving) {
      this.#schedule();
    }
  }

  #cancel(): void {
    if (this.#frame !== null) {
      cancelAnimationFrame(this.#frame);
      this.#frame = null;
    }
  }
}
