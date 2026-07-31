import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

import { HOVER_LETTER_CLASS, HOVER_NEAR_VAR, HOVER_REACH_PX } from './letter-hover.constant';
import { prefersReducedMotion, supportsHover } from '@shared/utils/motion';

/**
 * Lifts the host's letters as the pointer passes over them — the one under the cursor rises
 * furthest and warms to the accent, its neighbours follow in proportion to how close they are, and
 * the line settles the moment the pointer leaves.
 *
 * Each character carries its own `--near`, from 1 under the cursor down to 0 at `HOVER_REACH_PX`
 * away, and the stylesheet decides what to do with it. The directive owns the arithmetic; nothing
 * about the look lives here.
 *
 * The split is done once, after hydration, and left in place — unlike `appLetterReveal`, which
 * puts its text node back when its run ends. This one has to answer a pointer at any moment, so
 * the spans stay, and an `aria-label` keeps a screen reader from spelling the host out letter by
 * letter.
 *
 * Glyph centres are measured on entry rather than per frame: the line cannot move while the
 * pointer is on it, so re-reading the layout sixty times a second would buy nothing. Skipped
 * outright without a fine pointer or under reduced motion, and never runs on the server.
 */
@Directive({
  selector: '[appLetterHover]',
  host: {
    class: 'letter-hover',
  },
})
export class LetterHover {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #destroyRef = inject(DestroyRef);

  #letters: readonly HTMLElement[] = [];
  #centres: readonly number[] = [];
  #pending: number | null = null;
  #frame: number | null = null;

  constructor() {
    afterNextRender(() => this.#bind());
  }

  #bind(): void {
    if (prefersReducedMotion() || !supportsHover()) {
      return;
    }

    const el = this.#host.nativeElement;
    const text = el.textContent?.trim();

    if (!text) {
      return;
    }

    this.#split(el, text);
    el.setAttribute('aria-label', text);

    const enter = (): void => this.#measure();
    const move = (event: PointerEvent): void => this.#schedule(event);
    const leave = (): void => this.#rest();

    el.addEventListener('pointerenter', enter, { passive: true });
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave, { passive: true });

    this.#destroyRef.onDestroy(() => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      this.#cancel();
    });
  }

  /** One span per character, spaces included — a gap the wave crosses like any other glyph. */
  #split(el: HTMLElement, text: string): void {
    const fragment = this.#document.createDocumentFragment();
    const letters: HTMLElement[] = [];

    for (const char of text) {
      const span = this.#document.createElement('span');

      span.className = HOVER_LETTER_CLASS;
      // A non-breaking space keeps the gap from collapsing once it is its own inline-block.
      span.textContent = char === ' ' ? ' ' : char;

      fragment.append(span);
      letters.push(span);
    }

    el.replaceChildren(fragment);
    this.#letters = letters;
  }

  #measure(): void {
    this.#centres = this.#letters.map((letter) => {
      const rect = letter.getBoundingClientRect();

      return rect.left + rect.width / 2;
    });
  }

  #schedule(event: PointerEvent): void {
    this.#pending = event.clientX;

    if (this.#frame === null) {
      this.#frame = requestAnimationFrame(() => this.#apply());
    }
  }

  #apply(): void {
    this.#frame = null;

    const x = this.#pending;

    if (x === null) {
      return;
    }

    this.#letters.forEach((letter, index) => {
      const distance = Math.abs(x - this.#centres[index]);
      const near = Math.max(0, 1 - distance / HOVER_REACH_PX);

      letter.style.setProperty(HOVER_NEAR_VAR, near.toFixed(3));
    });
  }

  #rest(): void {
    this.#cancel();
    this.#pending = null;
    this.#letters.forEach((letter) => letter.style.removeProperty(HOVER_NEAR_VAR));
  }

  #cancel(): void {
    if (this.#frame !== null) {
      cancelAnimationFrame(this.#frame);
      this.#frame = null;
    }
  }
}
