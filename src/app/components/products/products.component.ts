import { Component } from '@angular/core';
import {
  faStar as farStar,
  faStarHalfStroke as faHalf,
} from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { Product } from '../../types/product.type';
import { ProductsService } from '../../services/products/products.service';
import { RouterModule } from '@angular/router';
import { GetDynamicStarsService } from '../../services/Rating/get-dynamic-stars.service';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products!: Product[];

  constructor(
    private productService: ProductsService,
    library: FaIconLibrary,
    private getstarsService: GetDynamicStarsService,
    private cartService: CartService
  ) {
    library.addIcons(fasStar, farStar, faHalf);
  }

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((response) => (this.products = response.data));
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getStars(averageRating: number) {
    return this.getstarsService.getDynamicStars(averageRating);
  }
}
