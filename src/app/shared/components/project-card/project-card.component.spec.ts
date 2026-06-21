import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project } from '@core/models/portfolio.interface';
import { ProjectCardComponent } from './project-card.component';

const withLinks: Project = {
  name: 'vitest-auto-spy',
  badge: 'Library · Open Source',
  description: 'Typed auto-mocking for Vitest.',
  links: [
    { label: 'npm', href: 'https://www.npmjs.com/package/vitest-auto-spy' },
    { label: 'GitHub', href: 'https://github.com/ASDAlexey/vitest-auto-spy' },
  ],
  tags: ['Vitest', 'TypeScript'],
  featured: true,
};

const noLinks: Project = {
  name: 'Bonds-tracker',
  badge: 'Desktop · Personal',
  description: 'Personal bonds tracker.',
  links: [],
  tags: ['Angular'],
  featured: false,
};

function render(project: Project): ComponentFixture<ProjectCardComponent> {
  const fixture = TestBed.createComponent(ProjectCardComponent);
  fixture.componentRef.setInput('project', project);
  fixture.detectChanges();

  return fixture;
}

describe('ProjectCardComponent', () => {
  it('renders a featured card with all project links', () => {
    const el = render(withLinks).nativeElement;

    expect(el.querySelector('.card').classList.contains('card--featured')).toBe(true);
    expect(el.querySelector('.card__title').textContent).toContain('vitest-auto-spy');

    const links = el.querySelectorAll('.card__links a');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toContain('npmjs.com');
    expect(links[1].getAttribute('href')).toContain('github.com');
  });

  it('renders a plain card without a links row', () => {
    const el = render(noLinks).nativeElement;

    expect(el.querySelector('.card').classList.contains('card--featured')).toBe(false);
    expect(el.querySelector('.card__links')).toBeNull();
    expect(el.querySelectorAll('.tags li').length).toBe(1);
  });
});
