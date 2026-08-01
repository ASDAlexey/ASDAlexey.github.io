import { ChangeDetectionStrategy, Component, ComponentRef, computed, inject, input, ViewContainerRef } from '@angular/core';

import type { GalleryLightbox } from '@shared/components/gallery-lightbox/gallery-lightbox';
import { toWebp } from '@shared/components/gallery-lightbox/gallery-lightbox.util';
import { PointerTrack } from '@shared/directives/pointer-track/pointer-track';

import { Project } from '@core/models/portfolio.interface';
import { ProjectGalleryService } from '@core/services/project-gallery.service';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PointerTrack],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly #gallery = inject(ProjectGalleryService);
  readonly #view = inject(ViewContainerRef);

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

  /** Built by the first `openGallery()`, reused by every click after it. */
  #lightbox?: ComponentRef<GalleryLightbox>;

  /**
   * The gallery is built on the first click and never before it. Six cards render on this page and
   * none of their dialogs is open, so leaving the component in the template put its markup and its
   * whole stylesheet into the prerendered document for a view most visitors never ask for.
   *
   * Imported by hand rather than with `@defer` on purpose: the loader Angular generates for a defer
   * block is never called under the unit-test builder, which leaves an uncovered statement in every
   * component that uses one — and the 100% gate is worth more than the shorter template. The same
   * reason `registerSwiper()` next door is a plain dynamic import.
   */
  async openGallery(): Promise<void> {
    if (!this.#lightbox) {
      const { GalleryLightbox } = await import('@shared/components/gallery-lightbox/gallery-lightbox');

      this.#lightbox = this.#view.createComponent(GalleryLightbox);
      this.#lightbox.setInput('slides', this.slides());
      this.#lightbox.setInput('alt', this.project().imageAlt ?? '');
    }

    this.#lightbox.instance.open();
  }
}
