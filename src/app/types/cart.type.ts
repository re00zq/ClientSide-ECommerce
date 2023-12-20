import { cartProducts } from './cart-products.type';

export interface Cart {
  _id: string;
  cartOwner: string;
  products: cartProducts[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
