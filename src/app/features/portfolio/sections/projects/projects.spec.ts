import { TestBed } from '@angular/core/testing';

import { Projects } from './projects';

describe('Projects', () => {
  it('renders a card for every project', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('#projects')).toBeTruthy();
    expect(el.querySelectorAll('app-project-card').length).toBe(fixture.componentInstance.projects.length);
  });
});
