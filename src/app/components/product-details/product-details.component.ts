import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../types/product.type';
import { GetDynamicStarsService } from '../../services/Rating/get-dynamic-stars.service';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  product!: Product;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    library: FaIconLibrary,
    private getstarsService: GetDynamicStarsService,
    private cartService: CartService
  ) {
    library.addIcons(fasStar, farStar, faHalf);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => (this.productId = params.get('id') as string)
    );

    this.productsService
      .getProductDetails(this.productId)
      .subscribe((response) => {
        this.product = response.data;
        console.log(this.product);
      });
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
