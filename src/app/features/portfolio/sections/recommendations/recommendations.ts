import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TESTIMONIALS } from '@shared/data/portfolio.data';
import { TestimonialCard } from '@shared/components/testimonial-card/testimonial-card';

@Component({
  selector: 'app-recommendations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TestimonialCard],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.scss',
})
export class Recommendations {
  readonly testimonials = TESTIMONIALS;
}
