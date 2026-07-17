import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '@shared/components/footer/footer';
import { Nav } from '@shared/components/nav/nav';
import { ScrollTop } from '@shared/components/scroll-top/scroll-top';
import { SeoService } from '@core/services/seo.service';
import { StructuredDataService } from '@core/services/structured-data.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Nav, Footer, ScrollTop],
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
