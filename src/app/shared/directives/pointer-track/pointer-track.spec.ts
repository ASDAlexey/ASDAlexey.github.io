import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POINTER_VARS } from './pointer-track.constant';
import { PointerTrack } from './pointer-track';

@Component({
  selector: 'app-pointer-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PointerTrack],
  template: `<div appPointerTrack class="target"></div>`,
})
class PointerHost {}

describe('PointerTrack', () => {
  let fixture: ComponentFixture<PointerHost>;
  let frames: FrameRequestCallback[];
  let target: HTMLElement;

  const create = (): void => {
    fixture = TestBed.createComponent(PointerHost);
    fixture.detectChanges();
    TestBed.tick();

    target = fixture.nativeElement.querySelector('.target');
    // jsdom lays nothing out, so the rect a real browser would report is faked
    // — the directive's job is the arithmetic on top of it.
    target.getBoundingClientRect = (): DOMRect => new DOMRect(100, 50, 200, 100);
  };

  const move = (clientX: number, clientY: number): void => {
    target.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY }));
  };

  // Zoneless change detection schedules through rAF too, so the queue holds more
  // than this directive's frames — drain all of them rather than counting them.
  const flush = (): void => frames.splice(0).forEach((cb) => cb(0));

  const read = (name: string): string => target.style.getPropertyValue(name);

  beforeEach(() => {
    frames = [];
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('publishes the pointer position as pixel and normalised custom properties', () => {
    create();
    move(200, 100);
    flush();

    expect(read(POINTER_VARS.x)).toBe('100px');
    expect(read(POINTER_VARS.y)).toBe('50px');
    expect(read(POINTER_VARS.nx)).toBe('0.000');
    expect(read(POINTER_VARS.ny)).toBe('0.000');
    expect(read(POINTER_VARS.on)).toBe('1');
  });

  it('normalises to -0.5…0.5 around the centre', () => {
    create();
    move(100, 50);
    flush();

    expect(read(POINTER_VARS.nx)).toBe('-0.500');
    expect(read(POINTER_VARS.ny)).toBe('-0.500');
  });

  it('coalesces a burst of moves into one write using the latest position', () => {
    create();
    move(150, 75);
    move(300, 150);
    flush();

    expect(read(POINTER_VARS.x)).toBe('200px');
    expect(read(POINTER_VARS.nx)).toBe('0.500');
  });

  it('recentres and switches off on leave, keeping the last position for the fade-out', () => {
    create();
    move(300, 150);
    flush();

    target.dispatchEvent(new PointerEvent('pointerleave'));

    expect(read(POINTER_VARS.on)).toBe('0');
    expect(read(POINTER_VARS.nx)).toBe('0');
    expect(read(POINTER_VARS.ny)).toBe('0');
    expect(read(POINTER_VARS.x)).toBe('200px');
  });

  it('drops a frame still pending when the pointer leaves', () => {
    create();
    move(300, 150);
    target.dispatchEvent(new PointerEvent('pointerleave'));
    flush();

    // The queued frame must not resurrect the position it was scheduled with.
    expect(read(POINTER_VARS.on)).toBe('0');
    expect(read(POINTER_VARS.x)).toBe('');
  });

  it('stops listening once destroyed', () => {
    create();
    move(200, 100);
    flush();
    fixture.destroy();

    move(300, 150);
    flush();

    expect(read(POINTER_VARS.x)).toBe('100px');
  });

  it('does nothing at all under reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    create();
    move(300, 150);
    flush();

    expect(read(POINTER_VARS.on)).toBe('');
  });
});
