import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { CategoryData } from 'src/app/commons/dto/category';
import { ProductDetailData, SizeData, ColorData, ProductData } from 'src/app/commons/dto/product';
import { CreateCustomProductReq } from 'src/app/commons/request/product.req';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {

  public Editor = ClassicEditor;
  dataEditor: string = "<p>Hello, world!</p>";
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
  productDto: ProductData = new ProductData();

  sizes!: SizeData[];
  colors!: ColorData[];

  files: File[] = [];

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
    const urlSplit = currentUrl.split("/");
    this.productId = Number(urlSplit[urlSplit.length - 1]);
    this.getSingleProductById();
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

  getSingleProductById() {
    this.productService.getSingleProductById(this.productId).subscribe(data => {
      this.productDto = data.data;

      this.productReq.name = this.productDto.name;
      this.productReq.description = this.productDto.description;
      this.dataEditor = this.productReq.description;
      this.productReq.categoryId = this.productDto.category.id;
      this.productReq.materialStr = this.productDto.material == null ? 'None' : this.productDto.material.name;
      this.productReq.supplierStr = this.productDto.supplier == null ? 'None' : this.productDto.supplier.name;

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

  onUpdate() {
    this.productReq.description = this.dataEditor;

    if (this.validate()) {
      this.productService.updateProduct(this.productId, this.productReq).subscribe(data => {
        this.toastrService.success('Cập nhật thành công')
        this.router.navigate(['/product'])
      }, error => {
        this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
      })
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
