import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryData, CategoryReq } from 'src/app/commons/dto/category';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  categoryListData!: CategoryData[];
  categoryReq: CategoryReq = {
    categoryParentId: -1,
    name: "",
    imageId: ""
  };

  file: File | null = null;

  categoryId!: number;
  categoryData: CategoryData = new CategoryData();

  module: string = 'CREATE';

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router,
    private categoryService: CategoryService,
    public toastrService: ToastrService,
    private imageService: ImageService
  ) { }

  public ngOnInit() {
    this.getAllCategory();
    const currentUrl = this.router.url;
    if (currentUrl != '/category/new') {
      this.module = "UPDATE";
      const urlSplit = currentUrl.split("/");
      this.categoryId = Number(urlSplit[urlSplit.length - 1]);
      this.getCategoryById();
    }
    this.generateJquery()
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categoryListData = data.data;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getCategoryById() {
    this.categoryService.getCategoriesById(this.categoryId).subscribe(data => {
      this.categoryData = data.data;
      this.categoryReq.name = this.categoryData.name;
      this.categoryReq.categoryParentId = this.categoryData.categoryParent.id;
      if (this.categoryData.image != null)
        this.categoryReq.imageId = this.categoryData.image.id;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  handleFileInput(eventTarget: any) {
    this.file = eventTarget.files.item(0);
  }

  onCreate() {
    if (this.file == null || this.categoryReq.name.trim() == "")
      this.toastrService.error("Vui lòng nhập đầy đủ thông tin")
    else {
      this.imageService.uploadFile([this.file]).subscribe(data => {
        this.categoryReq.imageId = data.data[0];
        this.categoryService.createNewCategory(this.categoryReq).subscribe(data => {
          this.toastrService.success("Thêm mới thành công")
          this.router.navigate(['/category'])
        }, error => {
          this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
        })
      }, error => {
        this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
      })
    }
    console.log(this.file);
    console.log(this.categoryReq)
  }

  onUpdate() {
    if (this.categoryReq.name.trim() == "")
      this.toastrService.error("Vui lòng nhập đầy đủ thông tin")
    else if (this.file != null) {
      this.imageService.uploadFile([this.file]).subscribe(data => {
        this.categoryReq.imageId = data.data[0];
        this.categoryService.updateCategory(this.categoryId, this.categoryReq).subscribe(data => {
          this.toastrService.success("Cập nhật thành công")
          this.router.navigate(['/category'])
        }, error => {
          this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
        })
      }, error => {
        this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
      })
    } else {
      this.categoryService.updateCategory(this.categoryId, this.categoryReq).subscribe(data => {
        this.toastrService.success("Cập nhật thành công")
        this.router.navigate(['/category'])
      }, error => {
        this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
      })
    }
    console.log(this.file);
    console.log(this.categoryReq)
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
