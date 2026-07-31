import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PROJECT_GALLERIES } from '../../shared/data/project-gallery.generated';
import { ProjectGalleryService } from './project-gallery.service';

describe('ProjectGalleryService', () => {
  const [key] = Object.keys(PROJECT_GALLERIES);

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'ru' }] });
  });

  it('returns the locale slides for a known project and nothing for anything else', () => {
    const service = TestBed.inject(ProjectGalleryService);

    expect(service.slides(key)).toBe(PROJECT_GALLERIES[key].ru);
    expect(service.slides('no-such-project')).toEqual([]);
    expect(service.slides(undefined)).toEqual([]);
  });
});
