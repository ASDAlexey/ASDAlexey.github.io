import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavComponent } from '@shared/components/nav/nav.component';
import { SeoService } from '@core/services/seo.service';
import { StructuredDataService } from '@core/services/structured-data.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly #seo = inject(SeoService);
  readonly #structuredData = inject(StructuredDataService);

  constructor() {
    this.#seo.init();
    this.#structuredData.init();
  }
}
