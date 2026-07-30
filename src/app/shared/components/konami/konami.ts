import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';

import { KONAMI_LINE_MS, KONAMI_OUTPUT, KONAMI_SEQUENCE } from './konami.constant';
import { prefersReducedMotion } from '@shared/utils/motion';

/**
 * Easter egg: the Konami code opens a terminal that types out a `whoami`.
 *
 * Deliberately undiscoverable by mouse — it is a wink at the visitors most
 * likely to try it. Nothing is rendered until the sequence lands, so it costs a
 * single keydown listener and no markup.
 *
 * Under reduced motion the output appears at once instead of typing itself out;
 * the egg still hatches, it just skips the theatre.
 */
@Component({
  selector: 'app-konami',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './konami.html',
  styleUrl: './konami.scss',
})
export class Konami {
  readonly #document = inject(DOCUMENT);
  readonly #destroyRef = inject(DestroyRef);

  readonly #printed = signal(0);

  readonly open = signal(false);

  /** Lines revealed so far — the terminal types itself out one line per tick. */
  readonly lines = computed(() => KONAMI_OUTPUT.slice(0, this.#printed()));

  /** Rolling buffer of the last keys pressed, trimmed to the sequence length. */
  #buffer: string[] = [];

  #timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => this.#listen());
  }

  close(): void {
    this.#stopPrinting();
    this.open.set(false);
  }

  #listen(): void {
    const onKey = (event: KeyboardEvent): void => this.#onKey(event);

    this.#document.addEventListener('keydown', onKey);
    this.#destroyRef.onDestroy(() => {
      this.#document.removeEventListener('keydown', onKey);
      this.#stopPrinting();
    });
  }

  #onKey(event: KeyboardEvent): void {
    if (this.open()) {
      if (event.key === 'Escape') {
        this.close();
      }

      return;
    }

    this.#buffer = [...this.#buffer, event.key.toLowerCase()].slice(-KONAMI_SEQUENCE.length);

    if (this.#buffer.every((key, index) => key === KONAMI_SEQUENCE[index]) && this.#buffer.length === KONAMI_SEQUENCE.length) {
      this.#buffer = [];
      this.#hatch();
    }
  }

  #hatch(): void {
    this.open.set(true);

    if (prefersReducedMotion()) {
      this.#printed.set(KONAMI_OUTPUT.length);

      return;
    }

    this.#printed.set(0);
    this.#timer = setInterval(() => {
      this.#printed.update((count) => count + 1);

      if (this.#printed() >= KONAMI_OUTPUT.length) {
        this.#stopPrinting();
      }
    }, KONAMI_LINE_MS);
  }

  #stopPrinting(): void {
    if (this.#timer !== null) {
      clearInterval(this.#timer);
      this.#timer = null;
    }
  }
}
