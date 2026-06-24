import { TestBed } from '@angular/core/testing';

import { About } from './about';

describe('About', () => {
  it('renders the section title and three paragraphs', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#about')).toBeTruthy();
    expect(el.querySelector('.section__title')?.textContent).toContain('Angular specialist');
    expect(el.querySelectorAll('.prose p').length).toBe(3);
  });
});
