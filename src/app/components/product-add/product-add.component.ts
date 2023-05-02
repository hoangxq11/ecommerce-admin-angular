import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryData } from 'src/app/commons/dto/category';
import { ColorData, MaterialData, ProductData, ProductDetailData, SizeData, SupplierData } from 'src/app/commons/dto/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  categoryListData!: CategoryData[];
  productReq: ProductData = new ProductData();

  productId!: number;
  productDetailListData!: ProductDetailData[];

  material: MaterialData = new MaterialData();
  supplier: SupplierData = new SupplierData();
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
      this.productReq = this.productDetailListData[0].productDto;
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

          // CodeMirror
          CodeMirror.fromTextArea(document.getElementById("codeMirrorDemo"), {
            mode: "htmlmixed",
            theme: "monokai"
          });

        });
    `;

    this._renderer2.appendChild(this._document.body, script);
  }

}
