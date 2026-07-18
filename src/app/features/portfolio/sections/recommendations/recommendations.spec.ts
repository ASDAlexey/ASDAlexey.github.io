import { TestBed } from '@angular/core/testing';

import { Recommendations } from './recommendations';

describe('Recommendations', () => {
  it('renders a card for every testimonial', () => {
    const fixture = TestBed.createComponent(Recommendations);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('#recommendations')).toBeTruthy();
    expect(el.querySelectorAll('app-testimonial-card').length).toBe(fixture.componentInstance.testimonials.length);
    expect(el.querySelector<HTMLAnchorElement>('.more')?.href).toBe(fixture.componentInstance.recommendationsUrl);
  });
});
