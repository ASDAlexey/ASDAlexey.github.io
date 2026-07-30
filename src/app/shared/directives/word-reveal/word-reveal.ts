import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

import { SPOKEN_CLASS, WORD_CLASS, WORD_MAX_DELAY_S, WORD_OBSERVER_OPTIONS, WORD_STEP_S } from './word-reveal.constant';
import { prefersReducedMotion } from '@shared/utils/motion';

/**
 * Fades the host's text in word by word, as if it were being spoken.
 *
 * The words are wrapped client-side after hydration: the prerendered HTML (and
 * anything reading it — search engines, feed readers) keeps one clean text node,
 * and the wrapping only happens for visitors who will actually see the motion.
 * Screen readers are unaffected either way, since inline elements do not break
 * up the accessible text.
 *
 * The observer stays connected, so the line replays whichever way you scroll.
 */
@Directive({
  selector: '[appWordReveal]',
  host: {
    class: 'word-reveal',
  },
})
export class WordReveal {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.#setup());
  }

  #setup(): void {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const el = this.#host.nativeElement;

    if (!this.#split(el)) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      el.classList.toggle(SPOKEN_CLASS, entries[0].isIntersecting);
    }, WORD_OBSERVER_OPTIONS);

    observer.observe(el);
    this.#destroyRef.onDestroy(() => observer.disconnect());
  }

  /**
   * Replaces the host's text with one span per word, each carrying its own
   * delay. Returns false for an empty host, leaving it untouched.
   */
  #split(el: HTMLElement): boolean {
    const text = el.textContent;

    if (!text) {
      return false;
    }

    const words = text.trim().split(/\s+/).filter(Boolean);

    if (!words.length) {
      return false;
    }

    const fragment = this.#document.createDocumentFragment();

    words.forEach((word, index) => {
      const span = this.#document.createElement('span');

      span.className = WORD_CLASS;
      span.textContent = word;
      span.style.transitionDelay = `${Math.min(index * WORD_STEP_S, WORD_MAX_DELAY_S)}s`;

      fragment.append(span);

      // A real space between the spans — inline-block words would otherwise
      // run together, and a CSS margin would break at the end of a line.
      if (index < words.length - 1) {
        fragment.append(' ');
      }
    });

    el.replaceChildren(fragment);

    return true;
  }
}
