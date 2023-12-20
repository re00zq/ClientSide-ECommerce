import { Product } from './product.type';

export interface cartProducts {
  count: number;
  _id: string;
  product: Product;
  price: number;
}
