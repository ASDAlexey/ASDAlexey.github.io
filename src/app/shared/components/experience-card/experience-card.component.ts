import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Experience } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-experience-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss',
})
export class ExperienceCardComponent {
  readonly experience = input.required<Experience>();

  readonly title = computed(() => {
    const exp = this.experience();

    return exp.company ? `${exp.role} · ${exp.company}` : exp.role;
  });
}
