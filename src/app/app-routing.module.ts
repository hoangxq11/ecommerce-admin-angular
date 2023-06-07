import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { OrderHomeComponent } from './components/order-home/order-home.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';
import { StatisticalComponent } from './components/statistical/statistical.component';
import { AccountHomeComponent } from './components/account-home/account-home.component';
import { AccountAddComponent } from './components/account-add/account-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { ProductDetailAddComponent } from './components/product-detail-add/product-detail-add.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { DashboardKpiComponent } from './components/dashboard-kpi/dashboard-kpi.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountHomeComponent, canActivate: [AuthGuard] },
  { path: 'account/new', component: AccountAddComponent, canActivate: [AuthGuard] },
  { path: 'account/update/:id', component: AccountAddComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryHomeComponent, canActivate: [AuthGuard] },
  { path: 'category/new', component: CategoryAddComponent, canActivate: [AuthGuard] },
  { path: 'category/update/:id', component: CategoryAddComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductHomeComponent, canActivate: [AuthGuard] },
  { path: 'product/new', component: ProductAddComponent, canActivate: [AuthGuard] },
  { path: 'product-detail/:id', component: ProductDetailAddComponent, canActivate: [AuthGuard] },
  { path: 'product/update/:id', component: ProductUpdateComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderHomeComponent, canActivate: [AuthGuard] },
  { path: 'order/detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'order/update/:id', component: OrderUpdateComponent, canActivate: [AuthGuard] },
  { path: 'statistical', component: StatisticalComponent, canActivate: [AuthGuard] },
  { path: 'shipping-service', component: ShippingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-kpi', component: DashboardKpiComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
