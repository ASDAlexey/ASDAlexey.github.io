import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';

import { Stat } from '@core/models/portfolio.interface';

import { COUNT_UP_DURATION_MS, STAT_OBSERVER_OPTIONS } from './stat-card.constant';

/**
 * Stat tile whose value counts up from zero every time it scrolls into view.
 *
 * Numeric values (`'14'`, `'100'`) animate via `requestAnimationFrame` with an
 * ease-out curve; anything non-numeric is shown verbatim. The observer stays
 * connected, so the count-up replays whichever way you scroll — counting up on
 * entry and resetting to zero on exit. Set up in `afterNextRender`, so nothing
 * runs on the server. Users who prefer reduced motion see the final value
 * immediately.
 */
@Component({
  selector: 'app-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly #target = computed(() => Number(this.stat().value));

  readonly #isNumeric = computed(() => this.stat().value.trim() !== '' && !Number.isNaN(this.#target()));

  readonly #current = signal(0);

  readonly stat = input.required<Stat>();

  /** What the template paints: the animated count for numbers, the raw string otherwise. */
  readonly display = computed(() => (this.#isNumeric() ? this.#current().toString() : this.stat().value));

  /** In-flight rAF handle, so a re-entry can cancel the previous run before replaying. */
  #frame: number | null = null;

  constructor() {
    afterNextRender(() => this.#setup());
  }

  #setup(): void {
    if (!this.#isNumeric()) {
      return;
    }

    if (this.#prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.#current.set(this.#target());

      return;
    }

    // Stays connected so the count-up replays on every entry — up on the way in,
    // reset to zero on the way out — whichever way the page is scrolled.
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.#animate();
      } else {
        this.#reset();
      }
    }, STAT_OBSERVER_OPTIONS);

    observer.observe(this.#host.nativeElement);
  }

  #animate(): void {
    this.#cancel();

    const target = this.#target();
    const start = performance.now();

    const step = (now: number): void => {
      const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.#current.set(Math.round(eased * target));
      this.#frame = progress < 1 ? requestAnimationFrame(step) : null;
    };

    this.#frame = requestAnimationFrame(step);
  }

  #reset(): void {
    this.#cancel();
    this.#current.set(0);
  }

  #cancel(): void {
    if (this.#frame !== null) {
      cancelAnimationFrame(this.#frame);
      this.#frame = null;
    }
  }

  #prefersReducedMotion(): boolean {
    return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
