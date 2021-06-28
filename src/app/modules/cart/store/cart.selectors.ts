import { adapter, CartState } from '@app/modules/cart/store/cart.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectProducts = createSelector(selectCartState, selectAll);
