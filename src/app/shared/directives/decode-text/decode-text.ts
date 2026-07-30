import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

import { DECODE_DELAY_MS, DECODE_DURATION_MS, DECODE_GLYPHS, DECODE_SOFT_CHARS, DECODE_TICK_MS } from './decode-text.constant';
import { prefersReducedMotion } from '@shared/utils/motion';

/**
 * Resolves the host's text out of scrambled glyphs, left to right.
 *
 * The element keeps its real text in the markup — this only rewrites it for the
 * length of the animation and always restores the original, so the prerendered
 * HTML, the accessibility tree and search engines see the actual name. Runs once
 * after hydration, never on the server, and is skipped entirely under
 * reduced-motion.
 *
 * Whitespace is never scrambled, which keeps the line breaks (and therefore the
 * layout) identical from the first frame to the last.
 */
@Directive({
  selector: '[appDecodeText]',
})
export class DecodeText {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #destroyRef = inject(DestroyRef);

  #frame: number | null = null;
  #timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    afterNextRender(() => this.#start());
  }

  #start(): void {
    if (prefersReducedMotion()) {
      return;
    }

    this.#destroyRef.onDestroy(() => this.#stop());
    this.#timer = setTimeout(() => this.#run(), DECODE_DELAY_MS);
  }

  #run(): void {
    this.#timer = null;

    const el = this.#host.nativeElement;
    const text = el.textContent;

    if (!text) {
      return;
    }

    const start = performance.now();
    let painted = -DECODE_TICK_MS;

    const step = (now: number): void => {
      const progress = Math.min((now - start) / DECODE_DURATION_MS, 1);

      // Re-roll on the tick, not on the frame — the difference between text
      // resolving and text vibrating.
      if (now - painted >= DECODE_TICK_MS) {
        painted = now;
        el.textContent = this.#frameText(text, progress);
      }

      if (progress < 1) {
        this.#frame = requestAnimationFrame(step);

        return;
      }

      this.#frame = null;
      el.textContent = text;
    };

    this.#frame = requestAnimationFrame(step);
  }

  /**
   * One rendering of the string at a point in the run.
   *
   * The wavefront eases out across the text, leaving settled characters behind
   * it. Ahead of it sits a soft band where each character is settled only with
   * a probability that grows as the wave nears, so the name emerges out of the
   * noise instead of being uncovered by a hard sweeping edge. Whitespace is
   * never touched, which keeps the line breaks fixed from first frame to last.
   */
  #frameText(text: string, progress: number): string {
    const eased = 1 - Math.pow(1 - progress, 2);
    const wave = eased * (text.length + DECODE_SOFT_CHARS) - DECODE_SOFT_CHARS;

    return [...text]
      .map((char, index) => {
        const distance = index - wave;

        if (char === ' ' || distance <= 0) {
          return char;
        }

        if (distance < DECODE_SOFT_CHARS && Math.random() > distance / DECODE_SOFT_CHARS) {
          return char;
        }

        return DECODE_GLYPHS[Math.floor(Math.random() * DECODE_GLYPHS.length)];
      })
      .join('');
  }

  #stop(): void {
    if (this.#frame !== null) {
      cancelAnimationFrame(this.#frame);
      this.#frame = null;
    }

    if (this.#timer !== null) {
      clearTimeout(this.#timer);
      this.#timer = null;
    }
  }
}
