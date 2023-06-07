import { ToastrService } from 'ngx-toastr';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ProductData, SearchReq } from 'src/app/commons/dto/product';
import { ProductService } from 'src/app/services/product.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent {

  productListData!: ProductData[];

  searchReq: SearchReq = new SearchReq();

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private productService: ProductService,
    public toastrService: ToastrService
  ) { }


  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe(data => {
      this.productListData = data.data;
      this.generateTableJquery();
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  onSearch() {
    this.productService.searchProducts(this.searchReq).subscribe(data => {
      this.productListData = data.data;
      $("#datatableexample").DataTable().destroy();
      this.generateTableJquery();
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  onDelete(productId: number) {
    this.productService.deletedProduct(productId).subscribe(data => {
      let index = this.productListData.findIndex(e => e.id == productId);
      this.productListData[index].isDeleted = !this.productListData[index].isDeleted;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  generateTableJquery() {
    $(function () {
      $("#datatableexample").DataTable({
        "responsive": true,
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "dom": 'Blfrtip',
      });
    });
  }
}
