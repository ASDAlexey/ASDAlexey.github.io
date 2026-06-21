import { TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  it('renders the section title and three paragraphs', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#about')).toBeTruthy();
    expect(el.querySelector('.section__title')?.textContent).toContain('Angular specialist');
    expect(el.querySelectorAll('.prose p').length).toBe(3);
  });
});
