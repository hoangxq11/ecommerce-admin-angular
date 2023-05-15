import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { BillData } from 'src/app/commons/dto/order';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  @Input() billData: BillData = new BillData();

  statusUpdate: string = this.billData.status;

  constructor(
    public activeModal: NgbActiveModal,
    private billService: BillService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  changeStatus(e: any) {
    this.statusUpdate = e.target.value;
  }

  onUpdateStatus() {
    const billStatusUpdateReq = {
      billId: this.billData.id,
      status: this.statusUpdate
    }
    this.billService.updateBillStatus(billStatusUpdateReq).subscribe(data => {
      this.toastrService.success('Cập nhật trạng thái đơn hàng thành công');
      this.billData.status = this.statusUpdate;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
    this.activeModal.close()
  }

}
