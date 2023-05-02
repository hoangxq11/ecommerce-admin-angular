import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryData } from 'src/app/commons/dto/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  categoryListData!: CategoryData[];
  categoryReq: CategoryData = new CategoryData();

  categoryId!: number;
  categoryData: CategoryData = new CategoryData();

  module: string = 'CREATE';

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router,
    private categoryService: CategoryService,
    public toastrService: ToastrService
  ) { }

  public ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl != '/category/new') {
      this.module = "UPDATE";
      const urlSplit = currentUrl.split("/");
      this.categoryId = Number(urlSplit[urlSplit.length - 1]);
      this.getCategoryById();
    }
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categoryListData = data.data;
      this.generateJquery();
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getCategoryById() {
    this.categoryService.getCategoriesById(this.categoryId).subscribe(data => {
      this.categoryData = data.data;
      this.categoryReq = data.data;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
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

        });
    `;

    this._renderer2.appendChild(this._document.body, script);
  }

}
