import { Injectable } from '@angular/core';
import { Products } from '../shared/helpers/app.constants';

interface Product {
  price: number;
  name: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  selectedCart: Product[] = Products.map((product, index) => ({
    ...product,
    name: 'Product name ' + index,
    image: 'https://picsum.photos/id/' + index * 10 + '/200/200',
  }));
}
