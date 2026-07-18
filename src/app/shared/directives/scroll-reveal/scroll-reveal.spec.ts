import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollReveal } from './scroll-reveal';

class MockIntersectionObserver implements IntersectionObserver {
  readonly #callback: IntersectionObserverCallback;

  static last: MockIntersectionObserver | undefined;

  readonly root = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: readonly number[] = [];

  readonly observe = vi.fn();
  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();
  readonly takeRecords = vi.fn<() => IntersectionObserverEntry[]>(() => []);

  constructor(callback: IntersectionObserverCallback) {
    this.#callback = callback;
    MockIntersectionObserver.last = this;
  }

  fire(isIntersecting: boolean): void {
    const entry: IntersectionObserverEntry = {
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: new DOMRectReadOnly(),
      intersectionRect: new DOMRectReadOnly(),
      rootBounds: null,
      target: globalThis.document.createElement('div'),
      time: 0,
    };

    this.#callback([entry], this);
  }
}

@Component({
  selector: 'app-reveal-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollReveal],
  template: '<div class="target" appScrollReveal></div>',
})
class RevealHost {}

describe('ScrollReveal', () => {
  let fixture: ComponentFixture<RevealHost>;

  beforeEach(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
    MockIntersectionObserver.last = undefined;
  });

  it('adds the hidden class and toggles visibility as it enters and leaves view', () => {
    fixture = TestBed.createComponent(RevealHost);
    fixture.detectChanges();
    TestBed.tick();

    const target: HTMLElement = fixture.nativeElement.querySelector('.target');
    const observer = MockIntersectionObserver.last;

    if (!observer) {
      throw new Error('IntersectionObserver was not created');
    }

    expect(target.classList.contains('reveal')).toBe(true);
    expect(observer.observe).toHaveBeenCalledWith(target);

    observer.fire(true);
    expect(target.classList.contains('is-visible')).toBe(true);

    observer.fire(false);
    expect(target.classList.contains('is-visible')).toBe(false);
  });
});
