import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experience } from '@core/models/portfolio.interface';
import { ExperienceCard } from './experience-card';

const base: Experience = {
  role: 'Senior Frontend Engineer',
  company: null,
  location: 'Remote',
  period: '2023 — Present',
  description: 'Architecting a large Angular product.',
  tags: ['Angular', 'NgRx'],
};

function render(experience: Experience): ComponentFixture<ExperienceCard> {
  const fixture = TestBed.createComponent(ExperienceCard);
  fixture.componentRef.setInput('experience', experience);
  fixture.detectChanges();

  return fixture;
}

describe('ExperienceCard', () => {
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

  it('renders a credential badge only when one is provided', () => {
    expect(render(base).nativeElement.querySelector('.card__credential')).toBeNull();

    const badge = 'Top Rated · 100% Job Success · Upwork';
    const el = render({ ...base, badge }).nativeElement.querySelector('.card__credential');

    expect(el?.textContent).toContain(badge);
  });

  it('renders a media preview only when media is provided', () => {
    expect(render(base).nativeElement.querySelector('.card__media')).toBeNull();

    const media = {
      href: 'https://www.sohonet.com/',
      image: 'sohonet-5th-kind.webp',
      imageAlt: 'Sohonet preview',
      caption: 'Sohonet — 5th Kind CORE platform',
    };
    const el = render({ ...base, media }).nativeElement as HTMLElement;
    const anchor = el.querySelector('.card__media') as HTMLAnchorElement;
    const img = el.querySelector('.card__media-thumb') as HTMLImageElement;

    expect(anchor.getAttribute('href')).toBe(media.href);
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(img.getAttribute('src')).toBe(media.image);
    expect(img.getAttribute('alt')).toBe(media.imageAlt);
    expect(el.querySelector('.card__media-caption')?.textContent).toContain(media.caption);
  });

  it('renders text links only when links are provided', () => {
    expect(render(base).nativeElement.querySelector('.card__links')).toBeNull();

    const links = [
      { label: 'rademacher.de', href: 'https://rademacher.de/' },
      { label: 'pooltrackr.com', href: 'https://pooltrackr.com/' },
    ];
    const items = render({ ...base, links }).nativeElement.querySelectorAll('.card__links a');

    expect(items.length).toBe(2);
    expect(items[0].getAttribute('href')).toBe(links[0].href);
    expect(items[0].textContent).toContain('rademacher.de');
  });
});
