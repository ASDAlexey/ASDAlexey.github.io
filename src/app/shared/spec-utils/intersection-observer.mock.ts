/**
 * Minimal IntersectionObserver stand-in for specs.
 *
 * Records the observed targets and lets a test drive the callback directly, so
 * scroll-triggered behaviour can be exercised without a real viewport. The most
 * recent instance is exposed as `last`, which is how a spec reaches the observer
 * a directive created internally.
 */
export class MockIntersectionObserver implements IntersectionObserver {
  readonly #callback: IntersectionObserverCallback;

  static last: MockIntersectionObserver | undefined;

  readonly root = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: readonly number[] = [];

  readonly targets: Element[] = [];

  readonly observe = vi.fn<(target: Element) => void>((target) => {
    this.targets.push(target);
  });

  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();
  readonly takeRecords = vi.fn<() => IntersectionObserverEntry[]>(() => []);

  constructor(callback: IntersectionObserverCallback) {
    this.#callback = callback;
    MockIntersectionObserver.last = this;
  }

  /** Fires the callback for one of the observed targets. */
  fire(isIntersecting: boolean, target: Element = this.targets[0]): void {
    this.#callback([createEntry(target, isIntersecting)], this);
  }

  /** Fires a single batch containing several targets, as a fast scroll would. */
  fireBatch(entries: readonly [Element, boolean][]): void {
    this.#callback(
      entries.map(([target, isIntersecting]) => createEntry(target, isIntersecting)),
      this,
    );
  }
}

const createEntry = (target: Element, isIntersecting: boolean): IntersectionObserverEntry => ({
  boundingClientRect: new DOMRect(),
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: new DOMRect(),
  isIntersecting,
  rootBounds: null,
  target,
  time: 0,
});
