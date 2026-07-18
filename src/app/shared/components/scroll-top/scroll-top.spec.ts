import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTop } from './scroll-top';
import { SCROLL_TOP_THRESHOLD } from './scroll-top.constant';

function getView(): Window {
  const view = TestBed.inject(DOCUMENT).defaultView;

  if (!view) {
    throw new Error('DOCUMENT has no defaultView');
  }

  return view;
}

describe('ScrollTop', () => {
  let fixture: ComponentFixture<ScrollTop>;
  let view: Window;

  function setScrollY(value: number): void {
    Object.defineProperty(view, 'scrollY', { value, configurable: true });
  }

  afterEach(() => {
    setScrollY(0);
    fixture.destroy();
    vi.restoreAllMocks();
  });

  it('toggles visibility on scroll and scrolls to top on click', () => {
    fixture = TestBed.createComponent(ScrollTop);
    view = getView();
    fixture.detectChanges();

    const scrollTo = vi.spyOn(view, 'scrollTo').mockImplementation(() => undefined);

    setScrollY(SCROLL_TOP_THRESHOLD - 1);
    view.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
    expect(fixture.nativeElement.querySelector('.scroll-top')).toBeNull();

    setScrollY(SCROLL_TOP_THRESHOLD + 1);
    view.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(true);

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.scroll-top');
    button.click();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    // Without a window (e.g. during SSR) the component stays inert instead of throwing.
    scrollTo.mockClear();
    vi.spyOn(TestBed.inject(DOCUMENT), 'defaultView', 'get').mockReturnValue(null);
    button.click();
    view.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(scrollTo).not.toHaveBeenCalled();
    expect(fixture.componentInstance.visible()).toBe(false);
  });
});
