import { TestBed } from '@angular/core/testing';

import { Projects } from './projects';

describe('Projects', () => {
  it('renders a card for every project', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#projects')).toBeTruthy();
    expect(el.querySelectorAll('app-project-card').length).toBe(fixture.componentInstance.projects.length);
  });
});
