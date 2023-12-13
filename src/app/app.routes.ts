import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NotFoundComponent },
];
