import { PipelineStage } from './pipeline.type';

/**
 * The stages of the GitLab pipelines described in the copy above, in order.
 *
 * Names stay in CI vocabulary — `lint`, `test`, `build` read the same in both
 * locales and are what the stages are actually called in the `.gitlab-ci.yml`,
 * so only the two ends carry translatable labels.
 */
export const PIPELINE_STAGES: readonly PipelineStage[] = [
  { id: 'commit', label: $localize`:@@about.pipeline.commit:commit` },
  { id: 'lint', label: 'lint' },
  { id: 'test', label: 'test' },
  { id: 'build', label: 'build' },
  { id: 'deploy', label: $localize`:@@about.pipeline.deploy:deploy` },
];
