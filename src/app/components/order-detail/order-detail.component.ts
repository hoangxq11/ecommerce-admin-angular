import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BillData } from 'src/app/commons/dto/order';
import { BillService } from 'src/app/services/bill.service';
import { OrderUpdateComponent } from '../order-update/order-update.component';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  billData: BillData = new BillData();
  billId!: number;
  receiveDate!: Date;

  constructor(
    private billService: BillService,
    public toastrService: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url.split("/");
    const billId = currentUrl[currentUrl.length - 1];
    this.billId = Number(billId);
    this.getBillById();
  }

  getBillById() {
    this.billService.getBillById(this.billId).subscribe(data => {
      this.billData = data.data;
      this.calculateReceiveDate();
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau');
      console.log(error);
    })
  }

  calculateReceiveDate() {
    const paymentTime = new Date(this.billData.paymentTime);
    this.receiveDate = paymentTime;
    this.receiveDate.setDate(paymentTime.getDate() + this.billData.shippingService.time);
  }

  onChangeStatus() {
    const modalRef = this.modalService.open(OrderUpdateComponent, {
      backdrop: false,
      size: 'xl'
    });

    modalRef.componentInstance.billData = this.billData;
  }

  generatePdf() {
    let data = document.getElementById('pdfContent');
    if (data != null) {
      let unwantedElement = data.querySelector('#no-print');
      if (unwantedElement != null) {
        unwantedElement.classList.add('pdf-hidden'); // Thêm class mới
      }
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
  
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('bill#' + this.billId + '.pdf'); // Generated PDF   
      });  
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }

  onPrint(){
    window.print()
  }

}
