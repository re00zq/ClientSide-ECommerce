import { Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { Product } from '../../types/product.type';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[];

  faStar = faStar;
  constructor(private productService: ProductsService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((res) => (this.products = res.data));
  }
}
