import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOVER_LETTER_CLASS, HOVER_NEAR_VAR, HOVER_REACH_PX } from './letter-hover.constant';
import { LetterHover } from './letter-hover';

@Component({
  selector: 'app-hover-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetterHover],
  template: `<span appLetterHover class="target">{{ text }}</span>`,
})
class HoverHost {
  text = 'ab c';
}

describe('LetterHover', () => {
  let fixture: ComponentFixture<HoverHost>;
  let frames: FrameRequestCallback[];
  let target: HTMLElement;

  const create = (): void => {
    fixture = TestBed.createComponent(HoverHost);
    fixture.detectChanges();
    TestBed.tick();

    target = fixture.nativeElement.querySelector('.target');
  };

  /** jsdom lays nothing out, so the glyph boxes a real browser would report are faked: one 10px
      character every 10px from the left edge. The directive's job is the arithmetic on top. */
  const layOut = (): void => {
    chars().forEach((char, index) => {
      char.getBoundingClientRect = (): DOMRect => new DOMRect(index * 10, 0, 10, 16);
    });
  };

  const chars = (): HTMLElement[] => [...target.querySelectorAll<HTMLElement>(`.${HOVER_LETTER_CLASS}`)];

  const near = (index: number): string => chars()[index].style.getPropertyValue(HOVER_NEAR_VAR);

  const enter = (): void => {
    target.dispatchEvent(new PointerEvent('pointerenter'));
  };

  const move = (clientX: number): void => {
    target.dispatchEvent(new PointerEvent('pointermove', { clientX }));
  };

  const leave = (): void => {
    target.dispatchEvent(new PointerEvent('pointerleave'));
  };

  // Zoneless change detection schedules through rAF too — drain the whole queue.
  const flush = (): void => frames.splice(0).forEach((cb) => cb(0));

  beforeEach(() => {
    frames = [];
    // A mouse, and no reduced-motion preference — the one combination that splits the text.
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('hover') }));
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('splits the text into characters and labels the host for screen readers', () => {
    create();

    // The space is a character of its own, so the wave crosses the gap like any other glyph.
    expect(chars().map((char) => char.textContent)).toEqual(['a', 'b', ' ', 'c']);
    expect(target.getAttribute('aria-label')).toBe('ab c');
    expect(near(0)).toBe('');
  });

  it('falls off with distance from the cursor and settles when it leaves', () => {
    create();
    layOut();
    enter();

    // Dead on the first glyph's centre: full strength there, less on its neighbour, nothing on the
    // characters further away than the wave reaches.
    move(5);
    flush();

    expect(near(0)).toBe('1.000');
    expect(Number.parseFloat(near(1))).toBeLessThan(1);
    expect(Number.parseFloat(near(1))).toBeGreaterThan(0);

    move(5 + HOVER_REACH_PX);
    flush();

    expect(near(0)).toBe('0.000');

    leave();

    expect(near(0)).toBe('');
  });

  it('coalesces a burst of moves into one write using the latest position', () => {
    create();
    layOut();
    enter();

    // Zoneless change detection books frames of its own, so count the delta rather than the queue.
    const booked = frames.length;

    move(5);
    move(35);

    expect(frames.length - booked).toBe(1);

    flush();

    // Only the last position was applied: the wave peaks on the character it ended on.
    expect(near(3)).toBe('1.000');
    expect(Number.parseFloat(near(0))).toBeLessThan(Number.parseFloat(near(2)));
  });

  it('does nothing without a fine pointer, under reduced motion, or with no text', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query === '(prefers-reduced-motion: reduce)' }));
    create();

    expect(chars().length).toBe(0);
    expect(target.getAttribute('aria-label')).toBeNull();

    fixture.destroy();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    create();

    expect(chars().length).toBe(0);

    // A host with a pointer but nothing to split is left exactly as it was found.
    fixture.destroy();
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('hover') }));
    fixture = TestBed.createComponent(HoverHost);
    fixture.componentInstance.text = '   ';
    fixture.detectChanges();
    TestBed.tick();

    expect(fixture.nativeElement.querySelector('.target').getAttribute('aria-label')).toBeNull();
  });

  it('ignores a frame that fires after the pointer has already left', () => {
    create();
    layOut();
    enter();
    move(5);

    // The leave cancels the booking, but a frame already in flight must not repaint the line.
    leave();
    flush();

    expect(near(0)).toBe('');
  });
});
