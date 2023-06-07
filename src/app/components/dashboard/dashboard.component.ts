import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillCriteria } from 'src/app/commons/dto/order';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  numOfProduct: number = 0;
  numOfCategory: number = 0;
  numOfAccount: number = 0;
  numOfBill: number = 0;
  billCriteria: BillCriteria = new BillCriteria();

  constructor(
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private billService: BillService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllAccountProfile();
    this.getAllCategory();
    this.getAllProduct();
    this.getCustomBills();
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe(data => {
      this.numOfProduct = data.data.length;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.numOfCategory = data.data.length;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getAllAccountProfile() {
    this.profileService.getAllAccountProfile().subscribe(data => {
      this.numOfAccount = data.data.length;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getCustomBills() {
    this.billService.getCustomBills(this.billCriteria).subscribe(data => {
      this.numOfBill = data.data.length;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    });
  }
}
