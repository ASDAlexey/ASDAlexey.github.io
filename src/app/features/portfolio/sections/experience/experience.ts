import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EXPERIENCES } from '@shared/data/portfolio.data';
import { ExperienceCard } from '@shared/components/experience-card/experience-card';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExperienceCard],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  readonly experiences = EXPERIENCES;
}
