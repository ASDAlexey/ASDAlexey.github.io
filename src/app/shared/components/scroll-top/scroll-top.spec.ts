import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTop } from './scroll-top';
import { SCROLL_TOP_THRESHOLD } from './scroll-top.constant';

function setScrollY(value: number): void {
  Object.defineProperty(window, 'scrollY', { value, configurable: true });
}

describe('ScrollTop', () => {
  let fixture: ComponentFixture<ScrollTop>;

  afterEach(() => {
    setScrollY(0);
    fixture.destroy();
    vi.restoreAllMocks();
  });

  it('toggles visibility on scroll and scrolls to top on click', () => {
    fixture = TestBed.createComponent(ScrollTop);
    fixture.detectChanges();

    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    setScrollY(SCROLL_TOP_THRESHOLD - 1);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
    expect(fixture.nativeElement.querySelector('.scroll-top')).toBeNull();

    setScrollY(SCROLL_TOP_THRESHOLD + 1);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(true);

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.scroll-top');
    button.click();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
