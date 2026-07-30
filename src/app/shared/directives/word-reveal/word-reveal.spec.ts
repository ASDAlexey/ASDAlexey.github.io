import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockIntersectionObserver } from '../../spec-utils/intersection-observer.mock';
import { SPOKEN_CLASS, WORD_CLASS, WORD_MAX_DELAY_S, WORD_STEP_S } from './word-reveal.constant';
import { WordReveal } from './word-reveal';

const QUOTE = 'A great developer and team player';

@Component({
  selector: 'app-word-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WordReveal],
  template: `<blockquote appWordReveal class="target">{{ quote }}</blockquote>`,
})
class WordHost {
  quote = QUOTE;
}

describe('WordReveal', () => {
  let fixture: ComponentFixture<WordHost>;
  let target: HTMLElement;

  const create = (quote = QUOTE): void => {
    fixture = TestBed.createComponent(WordHost);
    fixture.componentInstance.quote = quote;
    fixture.detectChanges();
    TestBed.tick();

    target = fixture.nativeElement.querySelector('.target');
  };

  const observer = (): MockIntersectionObserver => {
    const instance = MockIntersectionObserver.last;

    if (!instance) {
      throw new Error('IntersectionObserver was not created');
    }

    return instance;
  };

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
    MockIntersectionObserver.last = undefined;
  });

  it('wraps each word in its own span, spaced and staggered', () => {
    create();

    const words = [...target.querySelectorAll<HTMLElement>(`.${WORD_CLASS}`)];

    expect(words.map((word) => word.textContent)).toEqual(QUOTE.split(' '));
    expect(words[0].style.transitionDelay).toBe('0s');
    expect(words[2].style.transitionDelay).toBe(`${2 * WORD_STEP_S}s`);

    // Spaces survive as real text nodes, so the words still wrap as a sentence.
    expect(target.textContent).toBe(QUOTE);
  });

  it('caps the stagger so a long quote does not trail off', () => {
    create(Array.from({ length: 80 }, (_, index) => `w${index}`).join(' '));

    const words = target.querySelectorAll<HTMLElement>(`.${WORD_CLASS}`);

    expect(words[words.length - 1].style.transitionDelay).toBe(`${WORD_MAX_DELAY_S}s`);
  });

  it('plays as the quote enters view and rewinds as it leaves', () => {
    create();

    expect(observer().observe).toHaveBeenCalledWith(target);
    expect(target.classList.contains(SPOKEN_CLASS)).toBe(false);

    observer().fire(true);
    expect(target.classList.contains(SPOKEN_CLASS)).toBe(true);

    observer().fire(false);
    expect(target.classList.contains(SPOKEN_CLASS)).toBe(false);
  });

  it('disconnects when destroyed', () => {
    create();
    const instance = observer();

    fixture.destroy();
    expect(instance.disconnect).toHaveBeenCalled();
  });

  it('leaves empty and blank text untouched, and never observes it', () => {
    create('');
    expect(MockIntersectionObserver.last).toBeUndefined();

    fixture.destroy();
    create('   ');

    expect(target.querySelector(`.${WORD_CLASS}`)).toBeNull();
    expect(MockIntersectionObserver.last).toBeUndefined();
  });

  it('leaves the text as one node under reduced motion or without observers', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    create();

    expect(target.querySelector(`.${WORD_CLASS}`)).toBeNull();
    expect(target.textContent).toBe(QUOTE);

    fixture.destroy();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.stubGlobal('IntersectionObserver', undefined);
    create();

    expect(target.querySelector(`.${WORD_CLASS}`)).toBeNull();
  });
});
