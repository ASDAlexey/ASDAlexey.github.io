import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CURSOR_DOTS, CURSOR_ON_CLASS, CURSOR_REST_PX } from './cursor.constant';
import { Cursor } from './cursor';

describe('Cursor', () => {
  let fixture: ComponentFixture<Cursor>;
  let frames: FrameRequestCallback[];
  let root: HTMLElement;

  const create = (): void => {
    fixture = TestBed.createComponent(Cursor);
    fixture.detectChanges();
    TestBed.tick();
  };

  const move = (clientX: number, clientY: number): void => {
    root.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY }));
  };

  // Zoneless change detection schedules through rAF too, so the queue holds more than this
  // component's frames — drain all of them rather than counting them.
  const flush = (): void => frames.splice(0).forEach((cb) => cb(0));

  const dots = (): HTMLElement[] => [...fixture.nativeElement.querySelectorAll('.cursor__dot')];

  const at = (index: number): string => dots()[index].style.getPropertyValue('translate');

  beforeEach(() => {
    frames = [];
    // A mouse, and no reduced-motion preference — the one combination that binds a listener.
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('hover') }));
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    root = TestBed.inject(DOCUMENT).documentElement;
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('teleports the whole chain to the first move, then eases it and sleeps once caught up', () => {
    create();

    const host: HTMLElement = fixture.nativeElement;

    expect(dots().length).toBe(CURSOR_DOTS);
    expect(host.classList.contains(CURSOR_ON_CLASS)).toBe(false);

    // The chain is parked at the origin, so the first move is a jump — easing it across from the
    // corner would draw a stroke the visitor never made.
    move(400, 300);
    flush();

    expect(host.classList.contains(CURSOR_ON_CLASS)).toBe(true);
    expect(at(0)).toBe('400.0px 300.0px');
    expect(at(CURSOR_DOTS - 1)).toBe('400.0px 300.0px');

    // A second move is chased, not jumped to: the head closes a third of the gap, the tail less.
    move(500, 300);
    flush();

    expect(at(0)).toBe('434.0px 300.0px');
    expect(Number.parseFloat(at(1))).toBeLessThan(434);
    expect(Number.parseFloat(at(CURSOR_DOTS - 1))).toBeGreaterThan(400);

    // The loop keeps itself alive while anything is still moving…
    expect(frames.length).toBeGreaterThan(0);

    // …and stops once every circle has caught the one ahead of it.
    for (let i = 0; i < 60 && frames.length; i += 1) {
      flush();
    }

    // Asleep, with the tail inside the resting tolerance of the head rather than exactly on it —
    // chasing the last fraction of a pixel is what the threshold exists to stop.
    expect(frames.length).toBe(0);
    expect(Math.abs(Number.parseFloat(at(CURSOR_DOTS - 1)) - 500)).toBeLessThanOrEqual(CURSOR_REST_PX);
  });

  it('takes the trail away with the pointer when it leaves the window', () => {
    create();
    move(120, 120);
    flush();

    // Leaving mid-flight, with a frame already booked: the booking is cancelled rather than left
    // to fire against a trail that is on its way out.
    move(600, 400);
    // A burst books one frame, not one per event.
    move(610, 405);

    expect(frames.length).toBe(1);

    root.dispatchEvent(new PointerEvent('pointerleave'));

    expect(fixture.nativeElement.classList.contains(CURSOR_ON_CLASS)).toBe(false);

    // Back in from a new corner: the chain jumps again rather than sliding in from where it was.
    move(900, 40);
    flush();

    expect(at(CURSOR_DOTS - 1)).toBe('900.0px 40.0px');
  });

  it('never binds a listener without a fine pointer or under reduced motion', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query === '(prefers-reduced-motion: reduce)' }));
    create();

    move(300, 300);
    flush();

    expect(fixture.nativeElement.classList.contains(CURSOR_ON_CLASS)).toBe(false);
    expect(at(0)).toBe('');

    fixture.destroy();

    // No reduced-motion preference either, but a touch screen — still nothing to follow.
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    create();

    move(300, 300);
    flush();

    expect(fixture.nativeElement.classList.contains(CURSOR_ON_CLASS)).toBe(false);
  });
});
