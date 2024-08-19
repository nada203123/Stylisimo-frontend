import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';


import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ShowSubCategoriesComponent } from '../components/show-sub-categories/show-sub-categories.component';
import { AddCategoryComponent } from '../components/add-category/add-category.component';
import { ShowCategoriesComponent } from '../components/show-categories/show-categories.component'
import { AddSubCategoryComponent } from '../components/add-sub-category/add-sub-category.component';
import { UpdateSubCategoryComponent } from '../components/update-sub-category/update-sub-category.component';
import { ShowProductsComponent } from '../components/show-products/show-products.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { UpdateProductComponent } from '../components/update-product/update-product.component';
import { ShoppingComponent } from '../components/shopping/shopping.component';
import { ProductoverviewComponent } from '../components/productoverview/productoverview.component';
import { ClientproductComponent } from '../components/clientproduct/clientproduct.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { SigninComponent } from '../components/signin/signin.component';
import { SignupComponent } from '../components/signup/signup.component';
import { VerifyAccountComponent } from '../components/verify-account/verify-account.component';
import { ResetPasswordRequestComponent } from '../components/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { CartComponent } from '../components/cart/cart.component';
import { FavoriteComponent } from '../components/favorite/favorite.component';
import { OrderComponent } from '../components/order/order.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ForbiddenComponent } from '../components/forbidden/forbidden.component';
import { AuthGuard } from '../guards/auth.guard';
import { OutOfStockComponent } from '../components/out-of-stock/out-of-stock.component';
import { LoginFirstComponent } from '../components/login-first/login-first.component';
import { OrderemailsuccessComponent } from '../components/orderemailsuccess/orderemailsuccess.component';





export const routes: Routes = [
  { path: 'shopping', redirectTo: 'shopping', pathMatch: 'full' },
  

  
  { path: '',component: HomeComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'admin' },children: [
    { path: 'categories', component:ShowCategoriesComponent, outlet: 'right'},
    { path: 'dashboard', component: DashboardComponent , outlet: 'right'},
    { path: 'updateSubCategory', component:UpdateSubCategoryComponent , outlet: 'right'},
    { path: 'addSubCategory', component: AddSubCategoryComponent , outlet: 'right'},
    { path: 'subCategories', component: ShowSubCategoriesComponent , outlet: 'right'},
    { path: 'products', component: ShowProductsComponent , outlet: 'right'},
    { path: 'addProduct', component: AddProductComponent , outlet: 'right'},
    { path: 'updateProduct', component: UpdateProductComponent , outlet: 'right'},
    { path: 'orders', component: OrdersComponent , outlet: 'right'},

    { path: '', redirectTo: 'categories', pathMatch: 'full' },
  ] },
  {path:'shopping',component: ShoppingComponent},
  {path:'product-overview',component: ProductoverviewComponent},
  {path:'products/:categoryId',component:ClientproductComponent},
  { path: 'products/:categoryId/:subCategoryId', component: ClientproductComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verifyAccount', component: VerifyAccountComponent },
  { path: 'resetPasswordRequest', component: ResetPasswordRequestComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  { path: 'cart', component: CartComponent },
  { path: 'favorite', component: FavoriteComponent,},
  { path: 'order', component: OrderComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'outOfStock', component: OutOfStockComponent },
  { path: 'loginfirst', component: LoginFirstComponent },
  { path: 'orderEmail', component: OrderemailsuccessComponent },

  
  

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule {
  
 }
