import { TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  it('composes the hero, about, experience and projects sections', () => {
    const fixture = TestBed.createComponent(PortfolioComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('app-hero')).toBeTruthy();
    expect(el.querySelector('app-about')).toBeTruthy();
    expect(el.querySelector('app-experience')).toBeTruthy();
    expect(el.querySelector('app-projects')).toBeTruthy();
  });
});
