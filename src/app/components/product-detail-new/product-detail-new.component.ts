import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailData } from 'src/app/commons/dto/product';
import { ProductDetailReq } from 'src/app/commons/request/product.req';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail-new',
  templateUrl: './product-detail-new.component.html',
  styleUrls: ['./product-detail-new.component.scss']
})
export class ProductDetailNewComponent implements OnInit {

  @Input() productId!: number;

  date!: Date;

  productDetailReq: ProductDetailReq = {
    price: -1,
    countInStock: -1,
    productId: this.productId,
    discountValue: -1,
    discountEndDate: this.date,
    colorStr: "",
    sizeStr: "",
  };

  constructor(
    public activeModal: NgbActiveModal,
    public productService: ProductService,
    public toastrService: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  onUpdateStatus() {
    if (this.validate()) {
      this.productDetailReq.productId = this.productId;
      console.log(this.productDetailReq)
      this.productService.createProductDetail(this.productDetailReq).subscribe(data => {
        this.activeModal.close();
        this.toastrService.success("Thêm mới thành công")
      }, error => {
        this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
      })
    } else this.toastrService.error('Hãy nhập đầy đủ thông tin')
  }

  validate() {
    if (this.productDetailReq.price <= 0 || this.productDetailReq.countInStock <= 0)
      return false;
    if (this.productDetailReq.discountValue > 0 && this.productDetailReq.discountEndDate == null)
      return false;
    if (this.productDetailReq.discountValue < 0 && this.productDetailReq.discountEndDate != null)
      return false;
    return true;
  }

}
