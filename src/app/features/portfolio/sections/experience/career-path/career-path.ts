import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { CURVE_TENSION, MIN_PATH_HEIGHT, PATH_LEFT, PATH_RIGHT, PATH_WIDTH } from './career-path.constant';

/**
 * The rail beside the experience timeline: a curve weaving past every role,
 * drawn as the section scrolls, with a dot running along it.
 *
 * The curve is generated rather than authored, because it has to match the real
 * height of the cards next to it — which depends on the copy, the locale and the
 * viewport. A ResizeObserver on the host keeps `height` current, the path is
 * recomputed from it, and the SVG is rendered at exactly that many user units
 * per pixel. That 1:1 mapping is what lets the same path data serve as the
 * dot's `offset-path` without the two drifting apart.
 *
 * Drawing and travel are both scroll-driven in CSS — no scroll listener, no work
 * per frame. Browsers without scroll-driven animations get the finished line and
 * no dot (see the stylesheet), which is the same thing reduced-motion gets.
 */
@Component({
  selector: 'app-career-path',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './career-path.html',
  styleUrl: './career-path.scss',
})
export class CareerPath {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #destroyRef = inject(DestroyRef);

  readonly #height = signal(0);

  /** How many stops the curve weaves past — one per role in the timeline. */
  readonly count = input.required<number>();

  readonly width = PATH_WIDTH;

  /** Measured height, mirrored into the SVG so one user unit is one pixel. */
  readonly height = this.#height.asReadonly();

  readonly viewBox = computed(() => `0 0 ${PATH_WIDTH} ${this.#height()}`);

  /**
   * Node positions — one per role, centred in its share of the height and
   * alternating sides, so the curve reads as a route with stops rather than a
   * decorative squiggle.
   */
  readonly nodes = computed(() => {
    const height = this.#height();
    const count = this.count();

    if (height < MIN_PATH_HEIGHT || count < 1) {
      return [];
    }

    const step = height / count;

    return Array.from({ length: count }, (_, index) => ({
      index,
      x: index % 2 === 0 ? PATH_LEFT : PATH_RIGHT,
      y: step * (index + 0.5),
    }));
  });

  /** Cubic path through every node, with vertical control points at each turn. */
  readonly d = computed(() => {
    const nodes = this.nodes();

    if (!nodes.length) {
      return '';
    }

    const [first, ...rest] = nodes;
    const segments = rest.map((node, index) => {
      const previous = nodes[index];
      const reach = (node.y - previous.y) * CURVE_TENSION;

      return `C ${previous.x} ${previous.y + reach}, ${node.x} ${node.y - reach}, ${node.x} ${node.y}`;
    });

    // Run the line to both edges, so it enters and leaves the block rather than
    // starting and stopping in mid-air beside the first and last card.
    const last = nodes[nodes.length - 1];

    return [`M ${first.x} 0`, `L ${first.x} ${first.y}`, ...segments, `L ${last.x} ${this.#height()}`].join(' ');
  });

  /** The generated curve, handed to CSS as the dot's motion track. */
  readonly offsetPath = computed(() => (this.d() ? `path('${this.d()}')` : 'none'));

  constructor() {
    afterNextRender(() => this.#measure());
  }

  #measure(): void {
    const el = this.#host.nativeElement;

    if (typeof ResizeObserver === 'undefined') {
      this.#height.set(el.clientHeight);

      return;
    }

    const observer = new ResizeObserver(([entry]) => this.#height.set(Math.round(entry.contentRect.height)));

    observer.observe(el);
    this.#destroyRef.onDestroy(() => observer.disconnect());
  }
}
