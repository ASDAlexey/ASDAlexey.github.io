import { createSelector, MemoizedSelector } from '@ngrx/store';

// For expand Status enum need to make something like this
// enum B {....}
// export const C =  { ...Status, ...B };
// export type C = Status | B;
export enum Status {
  UNINITIALIZED = 'uninitialized',
  LOADING = 'loading', // GET
  LOADED = 'loaded', // GET
  SAVING = 'saving', // POST or PUT
  DELETING = 'deleting', // DELETE
  FAILED = 'failed',
}

export function queryState<T>(item: {
  state: Status;
}): {
  isUninitialized: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  isFailed: boolean;
} {
  return {
    isUninitialized: status === Status.UNINITIALIZED,
    isLoading: status === Status.LOADING,
    isLoaded: status === Status.LOADED,
    isSaving: status === Status.SAVING,
    isDeleting: status === Status.DELETING,
    isFailed: status === Status.FAILED,
  };
}

// queryStatus
export const qs = (item: MemoizedSelector<Object, Status>) =>
  createSelector(
    item,
    status => ({
      isUninitialized: status === Status.UNINITIALIZED,
      isLoading: status === Status.LOADING,
      isLoaded: status === Status.LOADED,
      isSaving: status === Status.SAVING,
      isDeleting: status === Status.DELETING,
      isFailed: status === Status.FAILED,
    }),
  );
