import { TestBed } from '@angular/core/testing';

import { Portfolio } from './portfolio';

describe('Portfolio', () => {
  it('composes the hero, about, experience and projects sections', () => {
    const fixture = TestBed.createComponent(Portfolio);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('app-hero')).toBeTruthy();
    expect(el.querySelector('app-about')).toBeTruthy();
    expect(el.querySelector('app-experience')).toBeTruthy();
    expect(el.querySelector('app-projects')).toBeTruthy();
  });
});
