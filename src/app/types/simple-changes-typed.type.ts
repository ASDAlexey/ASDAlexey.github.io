import { SimpleChange, SimpleChanges } from '@angular/core';

export type SimpleChangeTyped<T> = Omit<SimpleChange, 'currentValue' | 'previousValue'> & { previousValue: T; currentValue: T };

export type SimpleChangesTyped<T> = SimpleChanges & {
  [K in keyof T]?: SimpleChangeTyped<T[K]>;
};
