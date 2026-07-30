import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KONAMI_LINE_MS, KONAMI_OUTPUT, KONAMI_SEQUENCE } from './konami.constant';
import { Konami } from './konami';

describe('Konami', () => {
  let fixture: ComponentFixture<Konami>;
  let document: Document;

  const create = (): void => {
    fixture = TestBed.createComponent(Konami);
    fixture.detectChanges();
    TestBed.tick();
  };

  const press = (...keys: string[]): void => {
    keys.forEach((key) => document.dispatchEvent(new KeyboardEvent('keydown', { key })));
  };

  const enterCode = (): void => press(...KONAMI_SEQUENCE);

  /** Runs the printer to completion and repaints. */
  const printAll = (): void => {
    vi.advanceTimersByTime(KONAMI_LINE_MS * (KONAMI_OUTPUT.length + 1));
    fixture.detectChanges();
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    document = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    fixture.destroy();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('stays shut until the full sequence lands, then types the output out', () => {
    create();

    // A wrong key resets the run — the buffer only ever holds the last N keys.
    press('arrowup', 'arrowup', 'x');
    expect(fixture.componentInstance.open()).toBe(false);

    enterCode();
    expect(fixture.componentInstance.open()).toBe(true);
    expect(fixture.componentInstance.lines()).toEqual([]);

    vi.advanceTimersByTime(KONAMI_LINE_MS * 2);
    expect(fixture.componentInstance.lines()).toEqual(KONAMI_OUTPUT.slice(0, 2));

    printAll();
    expect(fixture.componentInstance.lines()).toEqual([...KONAMI_OUTPUT]);
    expect(fixture.nativeElement.querySelectorAll('.egg__line')).toHaveLength(KONAMI_OUTPUT.length);
  });

  it('closes on Escape and on the close button, and ignores the code while open', () => {
    create();
    enterCode();
    printAll();

    // Keys other than Escape do nothing while the terminal is up.
    press('a');
    expect(fixture.componentInstance.open()).toBe(true);

    press('Escape');
    fixture.detectChanges();
    expect(fixture.componentInstance.open()).toBe(false);
    expect(fixture.nativeElement.querySelector('.egg')).toBeNull();

    // It can be summoned again, and dismissed with the button this time.
    enterCode();
    printAll();
    fixture.nativeElement.querySelector('.egg__close').click();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('prints everything at once under reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    create();
    enterCode();

    expect(fixture.componentInstance.lines()).toEqual([...KONAMI_OUTPUT]);
  });

  it('stops listening and stops printing once destroyed', () => {
    create();
    enterCode();
    fixture.destroy();

    expect(() => vi.advanceTimersByTime(KONAMI_LINE_MS * KONAMI_OUTPUT.length)).not.toThrow();

    press(...KONAMI_SEQUENCE);
    expect(fixture.componentInstance.open()).toBe(true);
  });
});
