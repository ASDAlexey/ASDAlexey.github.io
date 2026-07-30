import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PIPELINE_STAGES } from './pipeline.constant';

/**
 * Illustrative CI/CD run under the About copy: a dot travels the pipeline and
 * each stage goes green as it is passed.
 *
 * It shows the thing the paragraph above claims — building GitLab pipelines —
 * instead of only asserting it. The run is tied to the scroll position via a
 * view timeline, so it plays as the reader arrives and rewinds if they scroll
 * back; nothing animates on its own in the background.
 *
 * Decorative and hidden from assistive tech: the stage names carry no
 * information the surrounding paragraph does not already state.
 */
@Component({
  selector: 'app-pipeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pipeline.html',
  styleUrl: './pipeline.scss',
})
export class Pipeline {
  readonly stages = PIPELINE_STAGES;
}
