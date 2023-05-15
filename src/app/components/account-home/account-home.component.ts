import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileData } from 'src/app/commons/dto/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent implements OnInit {

  profileDataList!: ProfileData[];

  constructor(
    private profileService: ProfileService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllAccountProfile();
  }

  getAllAccountProfile() {
    this.profileService.getAllAccountProfile().subscribe(data => {
      this.profileDataList = data.data;
      this.generateTableJquery();
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  generateTableJquery() {
    $(function () {
      $("#profileTable").DataTable({
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
