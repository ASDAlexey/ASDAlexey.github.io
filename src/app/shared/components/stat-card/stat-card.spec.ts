import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCard } from './stat-card';
import { NUMERIC_STAT, TEXT_STAT } from './stat-card.mock';

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
    const entry = { isIntersecting } as IntersectionObserverEntry;

    this.#callback([entry], this);
  }
}

describe('StatCard', () => {
  let fixture: ComponentFixture<StatCard>;
  let frames: FrameRequestCallback[];
  let cancelSpy: ReturnType<typeof vi.fn>;

  const create = (stat = NUMERIC_STAT): void => {
    fixture = TestBed.createComponent(StatCard);
    fixture.componentRef.setInput('stat', stat);
    fixture.detectChanges();
    TestBed.tick();
  };

  beforeEach(() => {
    frames = [];
    cancelSpy = vi.fn();
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.stubGlobal('performance', { now: () => 0 });
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal('cancelAnimationFrame', cancelSpy);
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
    MockIntersectionObserver.last = undefined;
  });

  // Zoneless CD also schedules via rAF, so drain every pending frame per tick.
  const flush = (time: number): void => frames.splice(0).forEach((cb) => cb(time));

  it('counts up on entry, resets on exit and replays on re-entry', () => {
    create();
    const observer = MockIntersectionObserver.last;

    if (!observer) {
      throw new Error('IntersectionObserver was not created');
    }

    expect(observer.observe).toHaveBeenCalledWith(fixture.nativeElement);
    expect(fixture.componentInstance.display()).toBe('0');

    // Enters view → counts part-way up.
    observer.fire(true);
    flush(800);
    expect(fixture.componentInstance.display()).toBe('12');

    // Leaves mid-animation → cancels the pending frame and resets to zero, yet
    // never disconnects, so it stays ready to replay.
    observer.fire(false);
    expect(cancelSpy).toHaveBeenCalled();
    expect(observer.disconnect).not.toHaveBeenCalled();
    expect(fixture.componentInstance.display()).toBe('0');

    // Re-enters → replays from zero to the full target.
    frames.length = 0;
    observer.fire(true);
    flush(1600);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.stat__num')?.textContent).toContain('14');
    expect(el.querySelector('.stat__plus')?.textContent).toBe('+');
    expect(el.querySelector('.stat__cap')?.textContent).toContain('years shipping');
  });

  it('renders non-numeric values verbatim without observing or animating', () => {
    create(TEXT_STAT);

    expect(fixture.componentInstance.display()).toBe('∞');
    expect(MockIntersectionObserver.last).toBeUndefined();
  });

  it('jumps straight to the final value for reduced motion or when observers are unavailable', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    create();

    expect(fixture.componentInstance.display()).toBe('14');
    expect(MockIntersectionObserver.last).toBeUndefined();

    fixture.destroy();
    vi.stubGlobal('matchMedia', undefined);
    vi.stubGlobal('IntersectionObserver', undefined);
    create();

    expect(fixture.componentInstance.display()).toBe('14');
  });
});
