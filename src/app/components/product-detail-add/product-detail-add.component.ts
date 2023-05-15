import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailData, SizeData, ColorData, ListProductDetailRes, ProductData } from 'src/app/commons/dto/product';
import { CreateCustomProductReq } from 'src/app/commons/request/product.req';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { LoginComponent } from '../login/login.component';
import { ProductDetailNewComponent } from '../product-detail-new/product-detail-new.component';
import { ProductDetailUpdateComponent } from '../product-detail-update/product-detail-update.component';

@Component({
  selector: 'app-product-detail-add',
  templateUrl: './product-detail-add.component.html',
  styleUrls: ['./product-detail-add.component.scss']
})
export class ProductDetailAddComponent {

  productId!: number;
  productData: ProductData = new ProductData();

  listProductDetailData!: ProductDetailData[];

  constructor(
    private productService: ProductService,
    private router: Router,
    public authService: AuthService,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split("/");
    this.productId = Number(url.at(url.length - 1));
    this.getSingleProductById();
    this.getDataProductDetailByProductId();
  }

  getSingleProductById() {
    this.productService.getSingleProductById(this.productId).subscribe(data => {
      this.productData = data.data;
    }, error => {
      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getDataProductDetailByProductId() {
    this.productService.getDataProductDetailByProductId(this.productId).subscribe(data => {
      this.listProductDetailData = data.data;
    }, error => {
      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau')
    });
  }

  onOpenModalCreate() {
    const modalRef = this.modalService.open(ProductDetailNewComponent, {
      backdrop: false,
      size: 'xl'
    });

    modalRef.componentInstance.productId = this.productId;
    modalRef.result.then((data) => {
      this.getDataProductDetailByProductId();
    })
  }

  onOpenModalUpdate(productDetailData: ProductDetailData) {
    const modalRef = this.modalService.open(ProductDetailUpdateComponent, {
      backdrop: false,
      size: 'xl'
    });

    modalRef.componentInstance.productDetailData = productDetailData;
    modalRef.result.then((data) => {
      this.getDataProductDetailByProductId();
    })
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

}
