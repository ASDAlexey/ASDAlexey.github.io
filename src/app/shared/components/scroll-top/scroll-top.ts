import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SCROLL_TOP_THRESHOLD } from './scroll-top.constant';

@Component({
  selector: 'app-scroll-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.scss',
})
export class ScrollTop {
  readonly #document = inject(DOCUMENT);

  readonly visible = signal(false);

  @HostListener('window:scroll')
  protected onScroll(): void {
    const view = this.#document.defaultView;

    this.visible.set((view?.scrollY ?? 0) > SCROLL_TOP_THRESHOLD);
  }

  protected scrollToTop(): void {
    this.#document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
