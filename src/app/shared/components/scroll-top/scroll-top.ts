import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

import { SCROLL_TOP_THRESHOLD } from './scroll-top.constant';

@Component({
  selector: 'app-scroll-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.scss',
})
export class ScrollTop {
  readonly visible = signal(false);

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.visible.set(window.scrollY > SCROLL_TOP_THRESHOLD);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
