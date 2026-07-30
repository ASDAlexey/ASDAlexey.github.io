import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ImageLightbox } from '@shared/components/image-lightbox/image-lightbox';
import { PointerTrack } from '@shared/directives/pointer-track/pointer-track';

import { Project } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageLightbox, PointerTrack],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
