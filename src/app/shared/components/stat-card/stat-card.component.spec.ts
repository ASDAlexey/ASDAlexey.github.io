import { TestBed } from '@angular/core/testing';

import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  it('renders the value, suffix and caption', () => {
    const fixture = TestBed.createComponent(StatCardComponent);
    fixture.componentRef.setInput('stat', { value: '14', suffix: '+', caption: 'years shipping' });
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.stat__num')?.textContent).toContain('14');
    expect(el.querySelector('.stat__plus')?.textContent).toBe('+');
    expect(el.querySelector('.stat__cap')?.textContent).toContain('years shipping');
  });
});
