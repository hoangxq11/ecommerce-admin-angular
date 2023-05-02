import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryData } from 'src/app/commons/dto/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.css']
})
export class CategoryHomeComponent {

  categoryListData!: CategoryData[];

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private categoryService: CategoryService,
    public toastrService: ToastrService
  ) { }

  public ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory () {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categoryListData = data.data;
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
