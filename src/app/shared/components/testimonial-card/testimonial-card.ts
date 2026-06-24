import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';

import { Testimonial } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-testimonial-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
})
export class TestimonialCard {
  readonly #document = inject(DOCUMENT);

  readonly testimonial = input.required<Testimonial>();

  readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  readonly initials = computed(() =>
    this.testimonial()
      .author.split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  );

  openConfirm(): void {
    this.dialog()?.nativeElement.showModal();
  }

  cancel(): void {
    this.dialog()?.nativeElement.close();
  }

  confirm(): void {
    const href = this.testimonial().href;

    if (href) {
      this.#document.defaultView?.open(href, '_blank', 'noopener,noreferrer');
    }

    this.dialog()?.nativeElement.close();
  }
}
