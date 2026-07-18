import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Project } from '@core/models/portfolio.interface';
import { ProjectCard } from './project-card';

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
  image: 'vitest-auto-spy.svg',
  imageAlt: 'one API, three runtimes diagram',
};

const noLinks: Project = {
  name: 'Bonds-tracker',
  badge: 'Desktop · Personal',
  description: 'Personal bonds tracker.',
  links: [],
  tags: ['Angular'],
  featured: false,
};

function render(project: Project): ComponentFixture<ProjectCard> {
  const fixture = TestBed.createComponent(ProjectCard);
  fixture.componentRef.setInput('project', project);
  fixture.detectChanges();

  return fixture;
}

describe('ProjectCard', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders a featured card with all project links', () => {
    const el = render(withLinks).nativeElement;

    expect(el.querySelector('.card').classList.contains('card--featured')).toBe(true);
    expect(el.querySelector('.card__title').textContent).toContain('vitest-auto-spy');

    const links = el.querySelectorAll('.card__links a');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toContain('npmjs.com');
    expect(links[1].getAttribute('href')).toContain('github.com');

    const media = el.querySelector('button.card__media');
    expect(media.querySelector('.card__media-thumb').getAttribute('src')).toBe('vitest-auto-spy.svg');
    expect(media.querySelector('.card__media-thumb').getAttribute('alt')).toBe('one API, three runtimes diagram');
  });

  it('opens the lightbox with the project image when the preview is clicked', () => {
    const el = render(withLinks).nativeElement;
    const dialog: HTMLDialogElement | null = el.querySelector('dialog');

    if (!dialog) {
      throw new Error('dialog was not rendered');
    }

    // jsdom does not implement showModal — replace it with a mock.
    dialog.showModal = vi.fn();

    expect(dialog.querySelector('.lightbox__img')?.getAttribute('src')).toBe('vitest-auto-spy.svg');

    el.querySelector('button.card__media').click();
    expect(dialog.showModal).toHaveBeenCalledOnce();
  });

  it('renders a plain card without a links row or media', () => {
    const el = render(noLinks).nativeElement;

    expect(el.querySelector('.card').classList.contains('card--featured')).toBe(false);
    expect(el.querySelector('.card__links')).toBeNull();
    expect(el.querySelector('.card__media')).toBeNull();
    expect(el.querySelectorAll('.tags li').length).toBe(1);
  });
});
