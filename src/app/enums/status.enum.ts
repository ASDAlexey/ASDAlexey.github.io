export const Status = {
  UNINITIALIZED: 'uninitialized',
  LOADING: 'loading', // GET
  LOADED: 'loaded', // GET
  SAVING: 'saving', // POST or PUT
  DELETING: 'deleting', // DELETE
  FAILED: 'failed',
} as const;

export type Status = (typeof Status)[keyof typeof Status];
