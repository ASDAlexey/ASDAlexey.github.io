import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DECODE_DELAY_MS, DECODE_DURATION_MS, DECODE_GLYPHS } from './decode-text.constant';
import { DecodeText } from './decode-text';

const TEXT = 'Alexey Popov';

@Component({
  selector: 'app-decode-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecodeText],
  template: `<h1 appDecodeText class="target">{{ text }}</h1>`,
})
class DecodeHost {
  text = TEXT;
}

describe('DecodeText', () => {
  let fixture: ComponentFixture<DecodeHost>;
  let frames: FrameRequestCallback[];
  let target: HTMLElement;

  const create = (): void => {
    fixture = TestBed.createComponent(DecodeHost);
    fixture.detectChanges();
    TestBed.tick();

    target = fixture.nativeElement.querySelector('.target');
  };

  // Zoneless change detection schedules through rAF too, so drain the queue
  // rather than assuming a frame count.
  const flush = (now: number): void => frames.splice(0).forEach((cb) => cb(now));

  beforeEach(() => {
    frames = [];
    vi.useFakeTimers();
    // Pinned low, so every character still ahead of the wavefront resolves to
    // the same glyph — the soft edge is probabilistic, the assertions are not.
    vi.spyOn(Math, 'random').mockReturnValue(0.01);
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.stubGlobal('performance', { now: () => 0 });
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    fixture.destroy();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('scrambles the text and settles back on the original', () => {
    create();
    expect(target.textContent).toBe(TEXT);

    vi.advanceTimersByTime(DECODE_DELAY_MS);

    // Part-way: the head has resolved, the tail is still noise.
    flush(DECODE_DURATION_MS / 2);
    const midway = target.textContent ?? '';

    expect(midway).toHaveLength(TEXT.length);
    expect(midway).not.toBe(TEXT);
    expect(midway.startsWith('Alexe')).toBe(true);

    // Spaces are never scrambled, so the wrap can't shift mid-animation.
    expect(midway[6]).toBe(' ');
    expect([...midway.slice(7)].every((char) => DECODE_GLYPHS.includes(char) || TEXT.includes(char))).toBe(true);

    // A frame arriving inside the tick window leaves the glyphs alone — that is
    // what keeps the effect from vibrating at 60fps.
    flush(DECODE_DURATION_MS / 2 + 5);
    expect(target.textContent).toBe(midway);

    flush(DECODE_DURATION_MS);
    expect(target.textContent).toBe(TEXT);
  });

  it('softens the edge: characters just ahead of the wave can already be settled', () => {
    // High rolls resolve the whole soft band early, so only the far tail is
    // still noise — the gradient that makes the effect read as emerging text.
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    create();

    vi.advanceTimersByTime(DECODE_DELAY_MS);
    flush(DECODE_DURATION_MS / 2);

    expect(target.textContent?.startsWith('Alexey Popo')).toBe(true);
  });

  it('leaves the text alone under reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    create();

    vi.advanceTimersByTime(DECODE_DELAY_MS);
    flush(DECODE_DURATION_MS / 2);

    expect(target.textContent).toBe(TEXT);
  });

  it('does nothing for an empty host', () => {
    fixture = TestBed.createComponent(DecodeHost);
    fixture.componentInstance.text = '';
    fixture.detectChanges();
    TestBed.tick();

    target = fixture.nativeElement.querySelector('.target');
    vi.advanceTimersByTime(DECODE_DELAY_MS);
    flush(DECODE_DURATION_MS / 2);

    expect(target.textContent).toBe('');
  });

  it('stops cleanly when destroyed before and during the run', () => {
    create();
    fixture.destroy();
    vi.advanceTimersByTime(DECODE_DELAY_MS);

    expect(target.textContent).toBe(TEXT);

    create();
    vi.advanceTimersByTime(DECODE_DELAY_MS);
    flush(DECODE_DURATION_MS / 2);
    expect(target.textContent).not.toBe(TEXT);

    fixture.destroy();
    expect(() => flush(DECODE_DURATION_MS)).not.toThrow();
  });
});
