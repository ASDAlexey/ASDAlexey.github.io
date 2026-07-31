import { inject, Injectable } from '@angular/core';

import { GallerySlide } from '@core/models/portfolio.interface';
import { LocaleService } from '@core/services/locale.service';
import { PROJECT_GALLERIES } from '@shared/data/project-gallery.generated';

/**
 * Looks a project's screenshots up for the locale the build was compiled in.
 *
 * The locale fallback — Russian shots for an English reader when a project was only ever
 * screenshotted in one language, and the other way round — is resolved by the generator, not here:
 * see `scripts/optimize-project-images.mjs`. Both keys of a manifest entry are always populated,
 * so this is a lookup and nothing more.
 */
@Injectable({ providedIn: 'root' })
export class ProjectGalleryService {
  readonly #locale = inject(LocaleService);

  slides(key: string | undefined): readonly GallerySlide[] {
    if (!key) {
      return [];
    }

    return PROJECT_GALLERIES[key]?.[this.#locale.current] ?? [];
  }
}
