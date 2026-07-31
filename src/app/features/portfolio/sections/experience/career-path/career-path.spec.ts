import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPath } from './career-path';
import { MIN_PATH_HEIGHT, PATH_LEFT, PATH_RIGHT, PATH_WIDTH } from './career-path.constant';

/** ResizeObserver stand-in — jsdom lays nothing out, so the spec sizes the host. */
class MockResizeObserver implements ResizeObserver {
  readonly #callback: ResizeObserverCallback;

  static last: MockResizeObserver | undefined;

  readonly observe = vi.fn<(target: Element) => void>((target) => {
    this.#target = target;
  });

  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();

  #target: Element | undefined;

  constructor(callback: ResizeObserverCallback) {
    this.#callback = callback;
    MockResizeObserver.last = this;
  }

  resize(height: number): void {
    if (!this.#target) {
      throw new Error('resize() called before observe()');
    }

    const box: ResizeObserverSize = { blockSize: height, inlineSize: PATH_WIDTH };
    const entry: ResizeObserverEntry = {
      borderBoxSize: [box],
      contentBoxSize: [box],
      contentRect: new DOMRectReadOnly(0, 0, PATH_WIDTH, height),
      devicePixelContentBoxSize: [box],
      target: this.#target,
    };

    this.#callback([entry], this);
  }
}

describe('CareerPath', () => {
  let fixture: ComponentFixture<CareerPath>;

  const create = (count = 4): void => {
    fixture = TestBed.createComponent(CareerPath);
    fixture.componentRef.setInput('count', count);
    fixture.detectChanges();
    TestBed.tick();
  };

  const resize = (height: number): void => {
    const observer = MockResizeObserver.last;

    if (!observer) {
      throw new Error('ResizeObserver was not created');
    }

    observer.resize(height);
    fixture.detectChanges();
  };

  beforeEach(() => vi.stubGlobal('ResizeObserver', MockResizeObserver));

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
    MockResizeObserver.last = undefined;
  });

  it('draws nothing until it has been measured', () => {
    create();

    expect(fixture.componentInstance.nodes()).toEqual([]);
    expect(fixture.componentInstance.d()).toBe('');
    expect(fixture.componentInstance.offsetPath()).toBe('none');
    expect(fixture.nativeElement.querySelector('.rail')).toBeNull();
  });

  it('spaces a node per role, alternating sides, and runs the curve edge to edge', () => {
    create(4);
    resize(800);

    const instance = fixture.componentInstance;

    expect(instance.height()).toBe(800);
    expect(instance.viewBox()).toBe(`0 0 ${PATH_WIDTH} 800`);
    // Each stop also carries the slice of the section's scroll it lights up in — the flare fires
    // where the runner reaches it, and the last one is clamped to the end of the range.
    expect(instance.nodes()).toEqual([
      { index: 0, x: PATH_LEFT, y: 100, litRange: 'contain 13% contain 19%' },
      { index: 1, x: PATH_RIGHT, y: 300, litRange: 'contain 38% contain 44%' },
      { index: 2, x: PATH_LEFT, y: 500, litRange: 'contain 63% contain 69%' },
      { index: 3, x: PATH_RIGHT, y: 700, litRange: 'contain 88% contain 94%' },
    ]);

    // Enters at the top edge, curves between the stops, leaves at the bottom.
    const d = instance.d();

    expect(d.startsWith(`M ${PATH_LEFT} 0 L ${PATH_LEFT} 100 C`)).toBe(true);
    expect(d.endsWith(`L ${PATH_RIGHT} 800`)).toBe(true);
    expect(d.match(/C /g)).toHaveLength(3);
    expect(instance.offsetPath()).toBe(`path('${d}')`);

    // The SVG is rendered at one user unit per pixel — that 1:1 mapping is what
    // keeps the runner's offset-path aligned with the drawn curve.
    const svg: SVGElement = fixture.nativeElement.querySelector('.rail');

    expect(svg.getAttribute('height')).toBe('800');
    expect(svg.getAttribute('width')).toBe(String(PATH_WIDTH));
    expect(fixture.nativeElement.querySelectorAll('.rail__stop')).toHaveLength(4);
  });

  it('ignores a host too short to be worth drawing, and an empty timeline', () => {
    create(4);
    resize(MIN_PATH_HEIGHT - 1);
    expect(fixture.componentInstance.nodes()).toEqual([]);

    fixture.destroy();
    MockResizeObserver.last = undefined;

    create(0);
    resize(800);
    expect(fixture.componentInstance.nodes()).toEqual([]);
    expect(fixture.componentInstance.d()).toBe('');
  });

  it('disconnects the observer when destroyed', () => {
    create();
    const observer = MockResizeObserver.last;

    fixture.destroy();
    expect(observer?.disconnect).toHaveBeenCalled();
  });

  it('falls back to a one-off measurement without ResizeObserver (SSR)', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    create();

    expect(MockResizeObserver.last).toBeUndefined();
    expect(fixture.componentInstance.height()).toBe(0);
  });
});
