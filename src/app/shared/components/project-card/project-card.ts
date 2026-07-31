import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { GalleryLightbox } from '@shared/components/gallery-lightbox/gallery-lightbox';
import { toWebp } from '@shared/components/gallery-lightbox/gallery-lightbox.util';
import { PointerTrack } from '@shared/directives/pointer-track/pointer-track';

import { Project } from '@core/models/portfolio.interface';
import { ProjectGalleryService } from '@core/services/project-gallery.service';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GalleryLightbox, PointerTrack],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly #gallery = inject(ProjectGalleryService);

  readonly project = input.required<Project>();

  readonly slides = computed(() => this.#gallery.slides(this.project().gallery));

  /** The shot the tile shows — the one named by `cover`, or the gallery's first. */
  readonly cover = computed(() => {
    const slides = this.slides();
    const named = this.project().cover;

    return slides.find((slide) => slide.id === named) ?? slides[0];
  });

  /**
   * Phone screenshots get a phone-shaped tile and desktop ones a landscape tile. One tile shape for
   * both is what cropped a 1200×2400 app screen into a 160×84 letterbox of its middle — a strip of
   * a stats table with no way to tell what app it came from.
   */
  readonly portrait = computed(() => {
    const cover = this.cover();

    return !!cover && cover.height > cover.width;
  });

  readonly toWebp = toWebp;
}
