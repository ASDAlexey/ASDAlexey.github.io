import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { HeroShowcase } from './showcase';
import { SHOWCASE_CHIPS, SHOWCASE_COVERAGE, SHOWCASE_FILES, SHOWCASE_LINE_COUNT, SHOWCASE_PLATFORM_BARS } from './showcase.constant';

const REST = 'rotateX(9deg) rotateY(0deg)';

function move(pointerType: string, clientX: number, clientY: number): PointerEvent {
  return { pointerType, clientX, clientY } as PointerEvent;
}

describe('HeroShowcase', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders chips, tabs, the coverage ring, the default hero.ts code and the Claude Code console', () => {
    const fixture = TestBed.createComponent(HeroShowcase);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const c = fixture.componentInstance;

    expect(el.querySelectorAll('.chip')).toHaveLength(SHOWCASE_CHIPS.length);
    expect(el.querySelectorAll('.bars__col')).toHaveLength(SHOWCASE_PLATFORM_BARS.length);
    expect(el.querySelectorAll('.tabs__tab')).toHaveLength(SHOWCASE_FILES.length);
    expect(el.querySelector('.tile--ring .tile__num')?.textContent).toContain(String(SHOWCASE_COVERAGE));
    expect(el.querySelectorAll('.code__line')).toHaveLength(SHOWCASE_LINE_COUNT.ts);
    expect(el.querySelector('.code__lines')?.textContent).toContain('$localize');
    expect(el.querySelector('.panel__console')?.textContent).toContain('Claude Code');
    expect(el.querySelector('.console__lib')?.textContent).toContain('vitest-auto-spy');
    expect(el.querySelector('.tabs__hint')).not.toBeNull();
    expect(c.ringOffset()).toBeCloseTo(c.ringCircumference * (1 - SHOWCASE_COVERAGE / 100), 5);
    expect(el.querySelector('[aria-hidden="true"].showcase')).not.toBeNull();
  });

  it('switches the open file, hides the hint after the first interaction and renders each language', () => {
    const fixture = TestBed.createComponent(HeroShowcase);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const c = fixture.componentInstance;
    const lines = (): NodeListOf<Element> => el.querySelectorAll('.code__line');
    const code = (): string => el.querySelector('.code__lines')?.textContent ?? '';

    c.select('spec');
    fixture.detectChanges();
    expect(c.touched()).toBe(true);
    expect(el.querySelector('.tabs__hint')).toBeNull();
    expect(lines()).toHaveLength(SHOWCASE_LINE_COUNT.spec);
    expect(code()).toContain('vitest-auto-spy');
    expect(code()).toContain('provideAutoSpy');

    c.select('html');
    fixture.detectChanges();
    expect(lines()).toHaveLength(SHOWCASE_LINE_COUNT.html);
    expect(code()).toContain('app-stat-card');

    c.select('scss');
    fixture.detectChanges();
    expect(lines()).toHaveLength(SHOWCASE_LINE_COUNT.scss);
    expect(code()).toContain('@include');
  });

  it('tilts toward a fine pointer but respects touch, reduced motion and a missing view or rect', () => {
    const fixture = TestBed.createComponent(HeroShowcase);
    const c = fixture.componentInstance;
    const el = fixture.nativeElement as HTMLElement;

    expect(c.stageTransform()).toBe(REST);

    // Touch input never tilts (and never consults the reduced-motion query).
    c.onPointerMove(move('touch', 10, 10));
    expect(c.stageTransform()).toBe(REST);

    // A reduced-motion preference is respected.
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    c.onPointerMove(move('mouse', 10, 10));
    expect(c.stageTransform()).toBe(REST);
    vi.unstubAllGlobals();

    // No window view → treated as no preference; the zero-size rect then bails out.
    vi.spyOn(TestBed.inject(DOCUMENT), 'defaultView', 'get').mockReturnValue(null);
    c.onPointerMove(move('mouse', 10, 10));
    expect(c.stageTransform()).toBe(REST);
    vi.restoreAllMocks();

    // matchMedia absent (default jsdom) + a real rect → the stage leans; leaving resets it.
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 200, height: 100 } as DOMRect);
    c.onPointerMove(move('mouse', 200, 100));
    expect(c.stageTransform()).toBe('rotateX(6deg) rotateY(3deg)');

    c.onPointerLeave();
    expect(c.stageTransform()).toBe(REST);
  });
});
