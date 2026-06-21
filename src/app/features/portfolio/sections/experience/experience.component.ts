import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EXPERIENCES } from '@shared/data/portfolio.data';
import { ExperienceCardComponent } from '@shared/components/experience-card/experience-card.component';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExperienceCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCES;
}
