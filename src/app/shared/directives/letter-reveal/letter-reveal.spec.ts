import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LETTER_CLASS, LETTER_LEAD_S, LETTER_STEP_S, LETTER_WORD_CLASS } from './letter-reveal.constant';
import { LetterReveal } from './letter-reveal';

const TEXT = 'Alexey Popov';

@Component({
  selector: 'app-letter-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetterReveal],
  template: `<h1 appLetterReveal class="target">{{ text }}</h1>`,
})
class LetterHost {
  text = TEXT;
}

describe('LetterReveal', () => {
  let fixture: ComponentFixture<LetterHost>;
  let target: HTMLElement;

  const create = (text = TEXT): void => {
    fixture = TestBed.createComponent(LetterHost);
    fixture.componentInstance.text = text;
    fixture.detectChanges();
    TestBed.tick();

    target = fixture.nativeElement.querySelector('.target');
  };

  const chars = (): HTMLElement[] => [...target.querySelectorAll<HTMLElement>(`.${LETTER_CLASS}`)];

  const delayOf = (char: HTMLElement): number => parseFloat(char.style.animationDelay);

  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('splits into delayed letters inside unbreakable words, then restores the text', () => {
    create();

    const letters = chars();
    const words = target.querySelectorAll(`.${LETTER_WORD_CLASS}`);

    expect(words).toHaveLength(2);
    expect(letters).toHaveLength(TEXT.replace(' ', '').length);
    expect(target.textContent).toBe(TEXT);

    // The name stays readable as one label while it is spelled out in spans.
    expect(target.getAttribute('aria-label')).toBe(TEXT);

    // The wave crosses the space at the pace it crosses the letters, so the
    // first letter of the second word sits one extra beat behind the sixth.
    expect(delayOf(letters[0])).toBeCloseTo(LETTER_LEAD_S, 3);
    expect(delayOf(letters[1])).toBeCloseTo(LETTER_LEAD_S + LETTER_STEP_S, 3);
    expect(delayOf(letters[6])).toBeCloseTo(LETTER_LEAD_S + 7 * LETTER_STEP_S, 3);

    // The tail letter finishes last, so its end is the whole run's end.
    letters.at(-1)?.dispatchEvent(new Event('animationend'));

    expect(target.querySelector(`.${LETTER_CLASS}`)).toBeNull();
    expect(target.hasAttribute('aria-label')).toBe(false);
    expect(target.textContent).toBe(TEXT);
  });

  it('leaves the text alone under reduced motion, and for an empty host', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    create();

    expect(chars()).toHaveLength(0);
    expect(target.textContent).toBe(TEXT);

    fixture.destroy();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    create('   ');

    expect(chars()).toHaveLength(0);
  });

  it('stops listening when destroyed mid-run', () => {
    create();

    const last = chars().at(-1);

    fixture.destroy();

    expect(() => last?.dispatchEvent(new Event('animationend'))).not.toThrow();
    expect(target.querySelectorAll(`.${LETTER_CLASS}`).length).toBeGreaterThan(0);
  });
});
