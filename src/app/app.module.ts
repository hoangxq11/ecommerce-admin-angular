import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { AccountHomeComponent } from './components/account-home/account-home.component';
import { AccountAddComponent } from './components/account-add/account-add.component';
import { OrderHomeComponent } from './components/order-home/order-home.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';
import { StatisticalComponent } from './components/statistical/statistical.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ProductDetailAddComponent } from './components/product-detail-add/product-detail-add.component';
import { ProductDetailNewComponent } from './components/product-detail-new/product-detail-new.component';
import { ProductDetailUpdateComponent } from './components/product-detail-update/product-detail-update.component';
import { ShippingComponent } from './components/shipping/shipping.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    CategoryHomeComponent,
    CategoryAddComponent,
    ProductHomeComponent,
    ProductAddComponent,
    AccountHomeComponent,
    AccountAddComponent,
    OrderHomeComponent,
    OrderDetailComponent,
    OrderUpdateComponent,
    StatisticalComponent,
    ProductDetailAddComponent,
    ProductDetailNewComponent,
    ProductDetailUpdateComponent,
    ShippingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule,
    NgxDropzoneModule,
    DataTablesModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
