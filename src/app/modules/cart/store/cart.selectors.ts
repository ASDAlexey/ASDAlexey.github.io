import { adapter, CartState } from '@app/modules/cart/store/cart.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectAll } = adapter.getSelectors();

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectProducts = createSelector(selectCartState, selectAll);
export const selectTotalProductsPrice = createSelector(selectProducts, products => {
  return products.reduce((acc, product) => acc + product.price, 0);
});
export const selectActiveCurrency = createSelector(selectCartState, state => state.activeCurrency);
export const selectCurrencyPairsRates = createSelector(selectCartState, state => state.currencyPairsRates);
