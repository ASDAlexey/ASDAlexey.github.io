import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';

/**
 * Fullscreen image lightbox — a native `<dialog>` shown as a modal so the full-size
 * image opens in place instead of navigating away to the browser's bare image viewer.
 *
 * Opened imperatively via `open()` (see the trigger in `project-card`). Using
 * `showModal()` gives the backdrop, focus trap, top-layer stacking and Escape-to-close
 * for free; a click that lands on the dialog itself (its padding, and the `::backdrop`)
 * closes it, while clicks on the figure inside leave it open.
 */
@Component({
  selector: 'app-image-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-lightbox.html',
  styleUrl: './image-lightbox.scss',
})
export class ImageLightbox {
  readonly src = input.required<string>();
  readonly alt = input('');

  readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  /** Close only when the click is on the dialog itself (backdrop/padding), not the figure. */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
