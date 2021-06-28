import { loadSelectedCart } from '@app/modules/cart/store/cart.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Status } from '@shared/helpers/async-item.helper';
import { nanoid } from 'nanoid';
import { Product } from '../services/cart.service';

export interface CartState extends EntityState<Product> {
  status: Status;
  error: string | null;
}

export function sortBy(a: Product, b: Product): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (event: Product) => event.uuid,
  sortComparer: sortBy,
});

export const initialState: CartState = {
  status: Status.UNINITIALIZED,
  error: null,
  ids: [],
  entities: {},
};

const cartReducer = createReducer(
  initialState,
  on(loadSelectedCart, (state, { data }) => {
    const products = data.map((item, index) => ({
      ...item,
      uuid: nanoid(),
      name: 'Product name ' + index,
      image: 'https://picsum.photos/id/' + index * 10 + '/200/200',
      createdAt: new Date().toISOString(),
    }));
    return adapter.addMany(products, { ...state });
  }),
  // on(loadRecordYearsSuccess, (state, { userId, years }) => ({
  //   ...state,
  //   years: {
  //     ...state.years,
  //     [+userId]: { ...state.years[userId], items: years, status: Status.LOADED },
  //   },
  // })),
);

export function reducer(state: CartState | undefined, action: Action): CartState {
  return cartReducer(state, action);
}
