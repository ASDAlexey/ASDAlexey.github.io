import { TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  it('renders a card for every project', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#projects')).toBeTruthy();
    expect(el.querySelectorAll('app-project-card').length).toBe(fixture.componentInstance.projects.length);
  });
});
