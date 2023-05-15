import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryData } from 'src/app/commons/dto/category';
import { ColorData, MaterialData, ProductData, ProductDetailData, SizeData, SupplierData } from 'src/app/commons/dto/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateCustomProductReq } from 'src/app/commons/request/product.req';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  public Editor = ClassicEditor;
  data: string = "<p>Hello, world!</p>";
  @ViewChild("myEditor", { static: false }) myEditor: any;

  categoryListData!: CategoryData[];
  productReq: CreateCustomProductReq = {
    name: "",
    description: "",
    categoryId: -1,
    materialStr: "",
    supplierStr: "",
    imageUUIDs: []
  };

  productId!: number;
  productDetailListData!: ProductDetailData[];

  sizes!: SizeData[];
  colors!: ColorData[];

  files: File[] = [];

  module: string = 'CREATE';

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    public toastrService: ToastrService
  ) { }

  public ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl != '/product/new') {
      this.module = "UPDATE";
      const urlSplit = currentUrl.split("/");
      this.productId = Number(urlSplit[urlSplit.length - 1]);
      this.getProductDetailList();
    }
    this.generateJquery();
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categoryListData = data.data;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getProductDetailList() {
    this.productService.getDataProductDetailByProductId(this.productId).subscribe(data => {
      this.productDetailListData = data.data;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCreateNew() {
    this.productReq.description = this.data;
    
    if (this.validate()) {
      if (this.files.length > 0) {
        this.imageService.uploadFile(this.files).subscribe(data => {
          this.productReq.imageUUIDs = data.data;
          this.productService.createNewProduct(this.productReq).subscribe(data => {
            this.toastrService.success('Thêm sản phẩm mới thành công')
            this.router.navigate(['/product'])
          }, error => {
            this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
          })
        }, error => {
          this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
        })
      }
      
    } else {
      this.toastrService.error('Hãy nhập đầy đử thông tin')
    }
  }

  validate() {
    return this.productReq.name.trim() != '' && this.productReq.categoryId != -1
      && this.productReq.description.trim() != '' && this.productReq.materialStr.trim() != ''
      && this.productReq.supplierStr.trim() != ''
  }

  generateJquery() {
    let script = this._renderer2.createElement('script');
    script.text = `

        $(function () {
          
          bsCustomFileInput.init();

          //Initialize Select2 Elements
          $('.select2').select2()

          //Initialize Select2 Elements
          $('.select2bs4').select2({
            theme: 'bootstrap4'
          })

          // Summernote
          $('#summernote').summernote()

        });
    `;

    this._renderer2.appendChild(this._document.body, script);
  }

}
