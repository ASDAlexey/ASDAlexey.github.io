import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, signal, viewChild } from '@angular/core';

import { GallerySlide } from '@core/models/portfolio.interface';
import { registerSwiper, swiperOf, toWebp } from './gallery-lightbox.util';

/**
 * Fullscreen screenshot gallery — a native `<dialog>` shown as a modal, with a Swiper carousel
 * inside it.
 *
 * `showModal()` gives the backdrop, the focus trap, top-layer stacking and Escape-to-close for
 * free, so the only thing left to own is the carousel. Swiper arrives as a custom element on the
 * first `open()` and not before: it is 360 kB, this site is prerendered, and a visitor who never
 * clicks a screenshot should never pay for it. `<swiper-container>` upgrades itself whenever the
 * definition lands, so the markup can be in the DOM first.
 *
 * The slides are rendered only while the dialog is open. A closed gallery that still holds eleven
 * `<img>` elements would have the browser decoding eleven screenshots for a card nobody clicked,
 * and there are six such cards on the page.
 */
@Component({
  selector: 'app-gallery-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './gallery-lightbox.html',
  styleUrl: './gallery-lightbox.scss',
})
export class GalleryLightbox {
  readonly slides = input.required<readonly GallerySlide[]>();
  readonly alt = input('');

  readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  /** Drives the `03 / 08` counter and the disabled state of the arrows. */
  readonly index = signal(0);
  readonly opened = signal(false);

  readonly toWebp = toWebp;

  open(): void {
    void registerSwiper();
    this.index.set(0);
    this.opened.set(true);
    this.dialog()?.nativeElement.showModal();
  }

  close(): void {
    this.dialog()?.nativeElement.close();
  }

  /** Native `close` — fired by the button, by Escape and by the backdrop alike. */
  onClosed(): void {
    this.opened.set(false);
  }

  /** Close only when the click is on the dialog itself (backdrop/padding), not the figure. */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /** A swipe moves the carousel without going through `step()`; the counter follows it back. */
  onSlideChange(): void {
    const swiper = swiperOf(this.dialog()?.nativeElement);

    if (swiper) {
      this.index.set(swiper.activeIndex);
    }
  }

  step(delta: number): void {
    const next = this.index() + delta;

    if (next < 0 || next >= this.slides().length) {
      return;
    }

    swiperOf(this.dialog()?.nativeElement)?.slideTo(next);
    this.index.set(next);
  }
}
