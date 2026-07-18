import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

import { REVEAL_OBSERVER_OPTIONS } from './scroll-reveal.constant';
import { RevealDirection } from './scroll-reveal.type';

/**
 * Reveals an element as it scrolls into view and hides it again as it leaves,
 * so the entrance replays smoothly whichever way you scroll.
 *
 * The hidden state and the transition live in the global `.reveal` class (added
 * on the host); this directive only toggles `.is-visible` via IntersectionObserver,
 * letting the CSS transition interpolate both ways. Set up in `afterNextRender`,
 * so nothing runs during SSR.
 *
 * An optional direction (`[appScrollReveal]="'left'"`) is surfaced as a
 * `data-reveal` attribute the CSS reads to pick the travel offset; a bare
 * `appScrollReveal` defaults to rising from below.
 */
@Directive({
  selector: '[appScrollReveal]',
  host: {
    class: 'reveal',
    '[attr.data-reveal]': 'direction()',
  },
})
export class ScrollReveal {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly direction = input<RevealDirection, RevealDirection | ''>('up', {
    alias: 'appScrollReveal',
    transform: (value) => value || 'up',
  });

  constructor() {
    afterNextRender(() => this.#observe());
  }

  #observe(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const el = this.#host.nativeElement;

    const observer = new IntersectionObserver((entries) => {
      el.classList.toggle('is-visible', entries[0].isIntersecting);
    }, REVEAL_OBSERVER_OPTIONS);

    observer.observe(el);
  }
}
