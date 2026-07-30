import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

import { LETTER_CLASS, LETTER_LEAD_S, LETTER_STEP_S, LETTER_WORD_CLASS } from './letter-reveal.constant';
import { prefersReducedMotion } from '@shared/utils/motion';

/**
 * Assembles the host's text letter by letter — each character lifts out of a
 * warm blur, tilts upright and cools into place, one beat behind the last.
 *
 * The split happens client-side after hydration and is undone the moment the
 * last letter lands, so the prerendered HTML, the copied text and search
 * engines only ever see one clean text node. While the spans exist the host
 * carries an `aria-label`, which keeps screen readers from spelling the name
 * out character by character.
 *
 * Everything moves on compositor-friendly properties (`translate`, `rotate`,
 * `filter`, `opacity`) — the glyph boxes never change, so the line cannot
 * reflow or shimmer mid-animation. Runs once, never on the server, and is
 * skipped entirely under reduced-motion.
 */
@Directive({
  selector: '[appLetterReveal]',
  host: {
    class: 'letter-reveal',
  },
})
export class LetterReveal {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.#play());
  }

  #play(): void {
    if (prefersReducedMotion()) {
      return;
    }

    const el = this.#host.nativeElement;
    const text = el.textContent?.trim();

    if (!text) {
      return;
    }

    // Trimmed text that survived the guard always holds at least one word, and
    // therefore at least one letter.
    const letters = this.#split(el, text);
    const last = letters[letters.length - 1];

    el.setAttribute('aria-label', text);

    // The tail letter is the one that finishes last, so its `animationend` is
    // the whole run's end — that is where the element gets its text node back.
    const restore = (): void => {
      el.removeAttribute('aria-label');
      el.replaceChildren(text);
    };

    last.addEventListener('animationend', restore, { once: true });
    this.#destroyRef.onDestroy(() => last.removeEventListener('animationend', restore));
  }

  /**
   * Rebuilds the host as one span per word, each holding one span per
   * character with its own delay, and returns the characters in order.
   *
   * Words are wrapped as well as split: a line break may only fall between
   * them, exactly as it would in the plain text node.
   */
  #split(el: HTMLElement, text: string): HTMLElement[] {
    const words = text.split(/\s+/).filter(Boolean);
    const fragment = this.#document.createDocumentFragment();
    const letters: HTMLElement[] = [];

    let beats = 0;

    words.forEach((word, index) => {
      const wordEl = this.#document.createElement('span');

      wordEl.className = LETTER_WORD_CLASS;

      for (const char of word) {
        const charEl = this.#document.createElement('span');

        charEl.className = LETTER_CLASS;
        charEl.textContent = char;
        charEl.style.animationDelay = `${(LETTER_LEAD_S + beats * LETTER_STEP_S).toFixed(3)}s`;

        wordEl.append(charEl);
        letters.push(charEl);
        beats += 1;
      }

      fragment.append(wordEl);

      // A real space between the wrappers — inline-block words would otherwise
      // run together. It costs a beat too, so the wave crosses the gap at the
      // same speed it crosses the letters.
      if (index < words.length - 1) {
        fragment.append(' ');
        beats += 1;
      }
    });

    el.replaceChildren(fragment);

    return letters;
  }
}
