import { ProductDetailData } from './../../commons/dto/product';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailReq } from 'src/app/commons/request/product.req';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail-update',
  templateUrl: './product-detail-update.component.html',
  styleUrls: ['./product-detail-update.component.scss']
})
export class ProductDetailUpdateComponent implements OnInit {

  @Input() productDetailData!: ProductDetailData;

  date!: Date;

  productDetailReq: ProductDetailReq = new ProductDetailReq();

  constructor(
    public activeModal: NgbActiveModal,
    public productService: ProductService,
    public toastrService: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.productDetailData)
    this.productDetailReq.price = this.productDetailData.price;
    this.productDetailReq.countInStock = this.productDetailData.countInStock;
    this.productDetailReq.productId = this.productDetailData.productDto.id;
    if (this.productDetailData.discount != null) {
      this.productDetailReq.discountValue = this.productDetailData.discount.value;
      this.productDetailReq.discountEndDate = this.productDetailData.discount.endDate;
    } else {
      this.productDetailReq.discountValue = -1;
      this.productDetailReq.discountEndDate = new Date;
    }
    this.productDetailReq.colorStr = this.productDetailData.color != null ? this.productDetailData.color.name : "";
    this.productDetailReq.sizeStr = this.productDetailData.size != null ? this.productDetailData.size.name : "";
  }

  onUpdateStatus() {
    if (this.validate()) {
      console.log(this.productDetailReq)
      this.productService.updateProductDetail(this.productDetailData.id, this.productDetailReq).subscribe(data => {
        this.activeModal.close();
        this.toastrService.success("Cập nhật thành công")
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
