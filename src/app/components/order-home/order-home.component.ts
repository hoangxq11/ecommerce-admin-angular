import { BillCriteria, BillData } from './../../commons/dto/order';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css']
})
export class OrderHomeComponent implements OnInit {

  billDataList!: BillData[];
  billCriteria: BillCriteria = new BillCriteria();

  constructor(
    public toastrService: ToastrService,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.getCustomBills()
  }

  getCustomBills() {
    this.billService.getCustomBills(this.billCriteria).subscribe(data => {
      this.billDataList = data.data;
      this.generateTableJquery()
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    });
  }

  onSearchBill() {
    this.billService.getCustomBills(this.billCriteria).subscribe(data => {
      this.billDataList = data.data;
      $("#billTable").DataTable().destroy();
      this.generateTableJquery()
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    });
  }

  generateTableJquery() {
    $(function () {
      $("#billTable").DataTable({
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
