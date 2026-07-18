import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import {
  SHOWCASE_CHIPS,
  SHOWCASE_COVERAGE,
  SHOWCASE_FILES,
  SHOWCASE_LINE_COUNT,
  SHOWCASE_PLATFORM_BARS,
  type ShowcaseFile,
  showcaseGutter,
} from './showcase.constant';

// Radius of the coverage ring in the SVG (must match the <circle r> in the template).
const RING_RADIUS = 26;

// Resting forward pitch of the panel, plus the extra degrees it leans toward the cursor.
const BASE_TILT_X = 9;
const MAX_TILT = 6;

@Component({
  selector: 'app-hero-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The code mock renders token spans separated by literal spaces; without this,
  // Angular strips the inter-element whitespace and glues the tokens together.
  preserveWhitespaces: true,
  templateUrl: './showcase.html',
  styleUrl: './showcase.scss',
})
export class HeroShowcase {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #document = inject(DOCUMENT);

  // Parallax tilt driven by the cursor; resets to the resting pose on leave.
  readonly #tilt = signal({ rx: BASE_TILT_X, ry: 0 });

  readonly chips = SHOWCASE_CHIPS;
  readonly bars = SHOWCASE_PLATFORM_BARS;
  readonly coverage = SHOWCASE_COVERAGE;
  readonly files = SHOWCASE_FILES;

  // Which editor tab is open; drives the code block and the gutter length.
  readonly active = signal<ShowcaseFile>('ts');
  readonly gutter = computed(() => showcaseGutter(SHOWCASE_LINE_COUNT[this.active()]));

  // The "tabs are clickable" hint shows until the first tab interaction.
  readonly touched = signal(false);

  // Assigned in the constructor rather than inline so the ring's geometry is
  // computed once from the shared radius constant.
  readonly ringCircumference: number;

  // Portion of the ring left empty — animates in via the CSS transition on the circle.
  readonly ringOffset = computed(() => this.ringCircumference * (1 - this.coverage / 100));

  readonly stageTransform = computed(() => {
    const { rx, ry } = this.#tilt();

    return `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  constructor() {
    this.ringCircumference = 2 * Math.PI * RING_RADIUS;
  }

  onPointerMove(event: PointerEvent): void {
    // Fine-pointer only, and never fight a reduced-motion preference.
    if (event.pointerType !== 'mouse' || this.#prefersReducedMotion()) {
      return;
    }

    const rect = this.#host.nativeElement.getBoundingClientRect();

    if (!rect.width) {
      return;
    }

    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    this.#tilt.set({ rx: BASE_TILT_X - py * MAX_TILT, ry: px * MAX_TILT });
  }

  onPointerLeave(): void {
    this.#tilt.set({ rx: BASE_TILT_X, ry: 0 });
  }

  select(file: ShowcaseFile): void {
    this.active.set(file);
    this.touched.set(true);
  }

  #prefersReducedMotion(): boolean {
    const view = this.#document.defaultView;

    if (!view || typeof view.matchMedia !== 'function') {
      return false;
    }

    return view.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
