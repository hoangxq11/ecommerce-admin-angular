import { ShippingService } from './../../services/shipping.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShippingServiceData } from 'src/app/commons/dto/order';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  shippingListData!: ShippingServiceData[];

  constructor(
    private toaStrService: ToastrService,
    private shippingService: ShippingService
  ) { }

  ngOnInit(): void {
    this.getAllShippingService();
  }

  getAllShippingService() {
    this.shippingService.getAllShippingService().subscribe(data => {
      this.shippingListData = data.data
    }, error => {
      this.toaStrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

}
