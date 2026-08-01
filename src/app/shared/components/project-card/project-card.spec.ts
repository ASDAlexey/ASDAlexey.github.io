import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Project } from '@core/models/portfolio.interface';
import { ProjectGalleryService } from '@core/services/project-gallery.service';
import { DESK_SLIDE, NO_ALT, NO_MEDIA, PHONE_SLIDE, VECTOR_SLIDE, WITH_COVER, WITH_LINKS } from './project-card.mock';
import { ProjectCard } from './project-card';

// Opening the gallery registers the carousel element; jsdom has no business loading 360 kB of it.
vi.mock('swiper/element/bundle', () => ({ register: vi.fn() }));

describe('ProjectCard', () => {
  const gallery = { slides: vi.fn() };

  // jsdom implements no <dialog> methods, and the lightbox is created outside this fixture —
  // the stub has to sit on the prototype before the element exists.
  const showModal = vi.fn<() => void>();

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: ProjectGalleryService, useValue: gallery }] });

    showModal.mockClear();
    HTMLDialogElement.prototype.showModal = showModal;
  });

  function render(project: Project): ComponentFixture<ProjectCard> {
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();

    return fixture;
  }

  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
  });

  it('renders a featured card, a landscape tile and every project link', () => {
    gallery.slides.mockReturnValue([VECTOR_SLIDE]);

    const el = render(WITH_LINKS).nativeElement;

    expect(el.querySelector('.card').classList.contains('card--featured')).toBe(true);
    expect(el.querySelector('.card__title').textContent).toContain('vitest-auto-spy');

    const links = el.querySelectorAll('.card__links a');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toContain('npmjs.com');
    expect(links[1].getAttribute('href')).toContain('github.com');

    const thumb = el.querySelector('.card__media-thumb');
    expect(thumb.getAttribute('src')).toBe(VECTOR_SLIDE.thumb);
    expect(thumb.getAttribute('alt')).toBe('one API, three runtimes diagram');
    expect(thumb.classList.contains('card__media-thumb_contain')).toBe(true);
    expect(el.querySelector('.card__media-frame').classList.contains('card__media-frame_portrait')).toBe(false);

    // A single shot is a picture, not a gallery: no count, and the old wording stands.
    expect(el.querySelector('.card__media-count')).toBeNull();
  });

  it('shows the named cover in a portrait tile and opens the gallery when clicked', async () => {
    gallery.slides.mockReturnValue([DESK_SLIDE, PHONE_SLIDE]);

    const fixture = render(WITH_COVER);
    const el = fixture.nativeElement;

    expect(fixture.componentInstance.cover()).toBe(PHONE_SLIDE);
    expect(el.querySelector('.card__media-frame').classList.contains('card__media-frame_portrait')).toBe(true);
    expect(el.querySelector('.card__media-thumb').getAttribute('src')).toBe(PHONE_SLIDE.thumb.replace('.avif', '.webp'));
    expect(el.querySelector('.card__media-count').textContent).toContain('2');

    // Nothing of the lightbox exists until the tile is clicked — it is imported by the click.
    el.querySelector('button.card__media').click();
    await vi.waitFor(() => expect(showModal).toHaveBeenCalledOnce());

    // The second open reuses the instance the first one created.
    await fixture.componentInstance.openGallery();

    expect(showModal).toHaveBeenCalledTimes(2);

    // A project with no alt text opens all the same — the caption is simply empty.
    await render(NO_ALT).componentInstance.openGallery();

    expect(showModal).toHaveBeenCalledTimes(3);
  });

  it('renders a plain card without a links row or media', () => {
    gallery.slides.mockReturnValue([]);

    const el = render(NO_MEDIA).nativeElement;

    expect(el.querySelector('.card').classList.contains('card--featured')).toBe(false);
    expect(el.querySelector('.card__links')).toBeNull();
    expect(el.querySelector('.card__media')).toBeNull();
    expect(el.querySelectorAll('.tags li').length).toBe(1);
  });
});
