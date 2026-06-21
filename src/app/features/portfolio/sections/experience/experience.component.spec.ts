import { TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  it('renders a card for every experience entry', () => {
    const fixture = TestBed.createComponent(ExperienceComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#experience')).toBeTruthy();
    expect(el.querySelectorAll('app-experience-card').length).toBe(fixture.componentInstance.experiences.length);
  });
});
