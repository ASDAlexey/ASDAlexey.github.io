import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { NAV_SECTIONS, NAV_SECTION_IDS, NAV_SPY_OPTIONS } from './nav.constant';
import { PROFILE } from '@shared/data/portfolio.data';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageSwitcher],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  readonly #document = inject(DOCUMENT);
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly profile = PROFILE;
  readonly sections = NAV_SECTIONS;

  /** Only ever true on a phone: the burger the sheet belongs to is hidden above 640 px. */
  readonly menuOpen = signal(false);

  /**
   * Id of the section currently crossing the middle of the viewport, or `''`
   * before the reader has scrolled into one. Drives the underline on the nav
   * link, so the header doubles as a "you are here" indicator.
   */
  readonly active = signal<string>('');

  constructor() {
    afterNextRender(() => this.#spy());
  }

  openMenu(): void {
    this.menuOpen.set(true);
    this.#sheet()?.showModal();
  }

  closeMenu(): void {
    this.#sheet()?.close();
  }

  /** A tap on the sheet's own padding, or on the backdrop, closes it — the links do not. */
  onSheetClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeMenu();
    }
  }

  /**
   * The sheet is a sibling of the header rather than a child of it — a `<dialog>` inside a
   * `position: sticky` header inherits its stacking context and the backdrop stops covering the
   * page. Looked up on demand, which is at most twice per visit.
   */
  #sheet(): HTMLDialogElement | null {
    return this.#host.nativeElement.querySelector('dialog.sheet');
  }

  #spy(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver((entries) => this.#onCross(entries), NAV_SPY_OPTIONS);

    for (const id of NAV_SECTION_IDS) {
      const section = this.#document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    }
  }

  /**
   * Sections are tall enough that the band only ever holds one at a time, but
   * during a fast scroll two can report in the same batch — the last entering
   * one wins, and a lone leaving entry clears the highlight.
   */
  #onCross(entries: IntersectionObserverEntry[]): void {
    const entering = entries.filter((entry) => entry.isIntersecting).at(-1);

    if (entering) {
      this.active.set(entering.target.id);

      return;
    }

    if (entries.some((entry) => entry.target.id === this.active())) {
      this.active.set('');
    }
  }
}
