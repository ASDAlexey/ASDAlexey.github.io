import { TestBed } from '@angular/core/testing';

import { Experience } from './experience';

describe('Experience', () => {
  it('renders a card for every experience entry', () => {
    const fixture = TestBed.createComponent(Experience);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('#experience')).toBeTruthy();
    expect(el.querySelectorAll('app-experience-card').length).toBe(fixture.componentInstance.experiences.length);
  });
});
