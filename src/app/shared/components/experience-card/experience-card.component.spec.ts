import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experience } from '@core/models/portfolio.interface';
import { ExperienceCardComponent } from './experience-card.component';

const base: Experience = {
  role: 'Senior Frontend Engineer',
  company: null,
  location: 'Remote',
  period: '2023 — Present',
  description: 'Architecting a large Angular product.',
  tags: ['Angular', 'NgRx'],
};

function render(experience: Experience): ComponentFixture<ExperienceCardComponent> {
  const fixture = TestBed.createComponent(ExperienceCardComponent);
  fixture.componentRef.setInput('experience', experience);
  fixture.detectChanges();

  return fixture;
}

describe('ExperienceCardComponent', () => {
  it('shows only the role when there is no company', () => {
    const fixture = render(base);

    expect(fixture.componentInstance.title()).toBe('Senior Frontend Engineer');
    expect(fixture.nativeElement.querySelector('.card__title').textContent).toContain('Senior Frontend Engineer');
  });

  it('appends the company when present', () => {
    const fixture = render({ ...base, company: 'The 5th Kind' });

    expect(fixture.componentInstance.title()).toBe('Senior Frontend Engineer · The 5th Kind');
  });

  it('renders period, location and tags', () => {
    const el = render(base).nativeElement as HTMLElement;

    expect(el.querySelector('.card__period')?.textContent).toContain('2023');
    expect(el.querySelector('.card__org')?.textContent).toContain('Remote');
    expect(el.querySelectorAll('.tags li').length).toBe(2);
  });
});
