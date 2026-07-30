/** One stage in the illustrative CI/CD run drawn under the About copy. */
export interface PipelineStage {
  /** Stable key for `@for` tracking. */
  id: string;
  label: string;
}
