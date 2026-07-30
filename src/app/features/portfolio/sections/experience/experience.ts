import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CareerPath } from './career-path/career-path';
import { EXPERIENCES } from '@shared/data/portfolio.data';
import { ExperienceCard } from '@shared/components/experience-card/experience-card';
import { ScrollReveal } from '@shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExperienceCard, ScrollReveal, CareerPath],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  readonly experiences = EXPERIENCES;
}
