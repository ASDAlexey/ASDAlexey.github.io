import { Action } from '@ngrx/store';

/**
 * Определение типа для экземпляра Jest Spy, используемого для отправки действий.
 *
 * @typedef {jest.SpyInstance<void, [действие: Action], any>} SpyDispatch
 */
export type SpyDispatch = jest.SpyInstance<void, [action: Action], any>;
