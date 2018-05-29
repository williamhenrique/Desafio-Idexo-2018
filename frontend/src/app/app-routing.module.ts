import { AccountComponent } from './front/account/account.component';
import { LoginComponent } from './front/login/login.component';
import { CheckoutComponent } from './front/checkout/checkout.component';
import { ProductSingleComponent } from './front/product/product_single/product_single.component';
import { HomeComponent } from './front/home/home.component';
import { CartComponent } from './front/cart/cart.component';

import { HomeComponent as HomeAdminComponent } from './admin/home/home.component';
import { LoginComponent as LoginAdminComponent} from './admin/login/login.component';
// import { ProductListComponent as ProductAdminListComponent } from './admin/product-list/product-list.component';
// import { ProductComponent as ProductAdminComponent } from './admin/product/product.component';
// import { OrderComponent as OrderAdminComponent } from './admin/order/order.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produto/:id', component: ProductSingleComponent},
  {path: 'cart', component: CartComponent },
  {path: 'checkout', component: CheckoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'conta', component: AccountComponent},
  {path: 'admin', component: HomeAdminComponent},
  {path: 'admin/login', component: LoginAdminComponent},
  // {path: 'admin/product-list', component: ProductAdminListComponent},
  // {path: 'admin/product', component: ProductAdminComponent},
  // {path: 'admin/order', component: OrderAdminComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
