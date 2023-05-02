import { ToastrService } from 'ngx-toastr';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ProductData } from 'src/app/commons/dto/product';
import { ProductService } from 'src/app/services/product.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent {

  productListData!: ProductData[];

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

  generateTableJquery () {
    let script = this._renderer2.createElement('script');
    script.text = `
        $(function () {
          $("#example1").DataTable({
            "responsive": true, "lengthChange": false, "autoWidth": false,
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
          }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
          $('#example2').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "responsive": true,
          });
        });
    `;

    this._renderer2.appendChild(this._document.body, script);
  }
}
