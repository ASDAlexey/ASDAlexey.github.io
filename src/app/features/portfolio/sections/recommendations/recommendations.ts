import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROFILE, TESTIMONIALS } from '@shared/data/portfolio.data';
import { Icon } from '@shared/components/icon/icon';
import { TestimonialCard } from '@shared/components/testimonial-card/testimonial-card';
import { ScrollReveal } from '@shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-recommendations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TestimonialCard, ScrollReveal],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.scss',
})
export class Recommendations {
  readonly testimonials = TESTIMONIALS;
  readonly recommendationsUrl = PROFILE.linkedinRecommendations;
}
