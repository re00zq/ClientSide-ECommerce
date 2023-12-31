import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../services/Cart/cart.service';
import { Cart } from '../../types/cart.type';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart!: Cart;
  cartItems!: number;
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        this.cartItems = response.numOfCartItems;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeProduct(productId: string) {
    this.cartService.removeProduct(productId).subscribe({
      next: (response) => {
        this.cart = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateProductQuantity(productId: string, count: number) {
    this.cartService.updateProductQuantity(productId, count).subscribe({
      next: (response) => {
        this.cart = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
