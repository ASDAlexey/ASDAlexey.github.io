import { TestBed } from '@angular/core/testing';

import { StatCard } from './stat-card';

describe('StatCard', () => {
  it('renders the value, suffix and caption', () => {
    const fixture = TestBed.createComponent(StatCard);
    fixture.componentRef.setInput('stat', { value: '14', suffix: '+', caption: 'years shipping' });
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.stat__num')?.textContent).toContain('14');
    expect(el.querySelector('.stat__plus')?.textContent).toBe('+');
    expect(el.querySelector('.stat__cap')?.textContent).toContain('years shipping');
  });
});
