import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { BillCriteria } from 'src/app/commons/dto/order';
import { BillStatusData, StatisticalCriteria } from 'src/app/commons/request/statistical.req';
import { StatisticalService } from 'src/app/services/statistical.service';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.component.html',
  styleUrls: ['./dashboard-kpi.component.scss']
})
export class DashboardKpiComponent implements OnInit {

  billStatusData: BillStatusData = new BillStatusData();
  statisticalCriteria: StatisticalCriteria = new StatisticalCriteria();

  listDataBestCustomerLabel: string[] = [];
  listDataBestCustomerValue: number[] = [];

  listDataWorstCustomerLabel: string[] = [];
  listDataWorstCustomerValue: number[] = [];

  listDataBestProductLabel: string[] = [];
  listDataBestProductValue: number[] = [];

  listDataWorstProductLabel: string[] = [];
  listDataWorstProductValue: number[] = [];

  listDataKpiLabel: string[] = ['Đợt 1', 'Đợt 2', 'Đợt 3', 'Dự đoán', 'Hiện tại'];
  listDataKpiValue: number[] = [];


  // TODO: remove
  scriptSaleByYears!: HTMLScriptElement;
  scriptBestCustomer!: HTMLScriptElement;

  year: string = "2021";

  listMonth = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',];
  listDataSales: any;
  listDataCustomer: any;
  listDataCustomerName: any;
  listDataCustomerCount: any;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private statisticalService: StatisticalService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetData();
    this.billStatus();
    this.getBestCustomer();
    this.getBestProduct();
    this.getWorstCustomer();
    this.getWorstProduct();
    this.kpiProcess();
    interval(5000).subscribe(x => {
      this.resetData();
      this.billStatus();
      this.getBestCustomer();
      this.getBestProduct();
      this.getWorstCustomer();
      this.getWorstProduct();
      this.kpiProcess();
    });
  }

  kpiProcess() {
    this.statisticalService.kpiProcess().subscribe(data => {
      this.listDataKpiValue.push(data.data.revenueFirstSpin);
      this.listDataKpiValue.push(data.data.revenueSecondSpin);
      this.listDataKpiValue.push(data.data.revenueThirdSpin);
      this.listDataKpiValue.push(data.data.revenuePredict);
      this.listDataKpiValue.push(data.data.revenueNow);
      this.generateBarChartWithJquery("barChart-kpi", "barChart-kpi-div",
        this.listDataKpiValue, this.listDataKpiLabel, "Doanh thu")
    })
  }

  billStatus() {
    this.statisticalService.billStatus().subscribe(data => {
      this.billStatusData = data.data;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  getBestCustomer() {
    this.statisticalCriteria.status = "DONE";
    this.statisticalService.bestCustomerByStatus(this.statisticalCriteria).subscribe(data => {
      data.data.forEach(e => {
        this.listDataBestCustomerLabel.push(e.phoneNumber + "-" + e.fullName);
        this.listDataBestCustomerValue.push(e.value);
      })
      this.generateDonutChartWithJquery("donutChart-best-customer", "donutChart-best-customer-div",
        this.listDataBestCustomerValue.slice(1, 7), this.listDataBestCustomerLabel.slice(1, 7), "")
    })
  }

  getBestProduct() {
    this.statisticalCriteria.status = "DONE";
    this.statisticalService.bestSalesProduct(this.statisticalCriteria).subscribe(data => {
      data.data.forEach(e => {
        this.listDataBestProductLabel.push("product" + "-" + e.id);
        this.listDataBestProductValue.push(e.value);
      })
      this.generateBarChartWithJquery("barChart-best-product", "barChart-best-product-div",
        this.listDataBestProductValue, this.listDataBestProductLabel, "Số mặt hàng đã bán")
    })
  }

  getWorstCustomer() {
    this.statisticalCriteria.status = "CANCELED";
    this.statisticalService.bestCustomerByStatus(this.statisticalCriteria).subscribe(data => {
      data.data.forEach(e => {
        this.listDataWorstCustomerLabel.push(e.phoneNumber + "-" + e.fullName);
        this.listDataWorstCustomerValue.push(e.value);
      })
      this.generateDonutChartWithJquery("donutChart-worst-customer", "donutChart-worst-customer-div",
        this.listDataWorstCustomerValue.slice(1, 7), this.listDataWorstCustomerLabel.slice(1, 7), "")
    })
  }

  getWorstProduct() {
    this.statisticalCriteria.status = "CANCELED";
    this.statisticalService.bestSalesProduct(this.statisticalCriteria).subscribe(data => {
      data.data.forEach(e => {
        this.listDataWorstProductLabel.push("product" + "-" + e.id);
        this.listDataWorstProductValue.push(e.value);
      })
      this.generateBarChartWithJquery("barChart-worst-product", "barChart-worst-product-div",
        this.listDataWorstProductValue, this.listDataWorstProductLabel, "Số mặt hàng đã bị hủy")
    })
  }

  resetData() {
    this.listDataBestCustomerLabel = [];
    this.listDataBestCustomerValue = [];

    this.listDataWorstCustomerLabel = [];
    this.listDataWorstCustomerValue = [];

    this.listDataBestProductLabel = [];
    this.listDataBestProductValue = [];

    this.listDataWorstProductLabel = [];
    this.listDataWorstProductValue = [];

    this.listDataKpiValue = [];
  }

  onProcess() {
    this.resetData();
    this.billStatus();
    this.getBestCustomer();
    this.getBestProduct();
    this.getWorstCustomer();
    this.getWorstProduct();
    this.kpiProcess();
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
        pdf.save('statistical' + '.pdf'); // Generated PDF   
      });
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }

  generateBarChartWithJquery(canvasId: string, divId: string, data: any, label: any, labelName: any) {
    let canvasElement = document.getElementById(canvasId);
    this._renderer2.removeChild(this._document.body, canvasElement);

    let barChartElement = document.getElementById(divId);
    let canvasE = this._renderer2.createElement('canvas');

    this._renderer2.setAttribute(canvasE, 'id', canvasId);
    this._renderer2.setStyle(canvasE, 'min-height', '250px');
    this._renderer2.setStyle(canvasE, 'height', '250px');
    this._renderer2.setStyle(canvasE, 'max-height', '250px');
    this._renderer2.setStyle(canvasE, 'max-width', '100%');

    this._renderer2.appendChild(barChartElement, canvasE);

    if (this.scriptSaleByYears) {
      this._renderer2.removeChild(this._document.body, this.scriptSaleByYears);
    }

    let script = this._renderer2.createElement('script');
    script.text = `
        $(function () {
          /* ChartJS
          * -------
          * Here we will create a few charts using ChartJS
          */

          //--------------
          //- AREA CHART -
          //--------------

          // Get context with jQuery - using jQuery's .get() method.

          var areaChartData = {
            labels:` + JSON.stringify(label) + `,
            datasets: [
              {
                label: `+ JSON.stringify(labelName) + `,
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: ` + JSON.stringify(data) + `
              }
            ]
          }

          //-------------
          //- BAR CHART -
          //-------------
          var barChartCanvas = $('#` + canvasId + `').get(0).getContext('2d')
          var barChartData = $.extend(true, {}, areaChartData)

          var barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
          }

          new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
          })

        })
    `;

    this._renderer2.appendChild(this._document.body, script);

    this.scriptSaleByYears = script;
  }

  generateDonutChartWithJquery(canvasId: string, divId: string, data: any, label: any, labelName: any) {
    let canvasElement = document.getElementById(canvasId);
    this._renderer2.removeChild(this._document.body, canvasElement);

    let barChartElement = document.getElementById(divId);
    let canvasE = this._renderer2.createElement('canvas');

    this._renderer2.setAttribute(canvasE, 'id', canvasId);
    this._renderer2.setStyle(canvasE, 'min-height', '250px');
    this._renderer2.setStyle(canvasE, 'height', '250px');
    this._renderer2.setStyle(canvasE, 'max-height', '250px');
    this._renderer2.setStyle(canvasE, 'max-width', '100%');

    this._renderer2.appendChild(barChartElement, canvasE);

    if (this.scriptBestCustomer) {
      this._renderer2.removeChild(this._document.body, this.scriptBestCustomer);
    }

    let script = this._renderer2.createElement('script');
    script.text = `
        $(function () {
          /* ChartJS
          * -------
          * Here we will create a few charts using ChartJS
          */

          //-------------
          //- DONUT CHART -
          //-------------
          // Get context with jQuery - using jQuery's .get() method.
          var donutChartCanvas = $('#`+ canvasId + `').get(0).getContext('2d')
          var donutData = {
            labels: ` + JSON.stringify(label) + `,
            datasets: [
              {
                data: ` + JSON.stringify(data) + `,
                backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
              }
            ]
          }
          var donutOptions = {
            maintainAspectRatio: false,
            responsive: true,
          }
          //Create pie or douhnut chart
          // You can switch between pie and douhnut using the method below.
          new Chart(donutChartCanvas, {
            type: 'doughnut',
            data: donutData,
            options: donutOptions
          })

        })
    `;

    this._renderer2.appendChild(this._document.body, script);

    this.scriptBestCustomer = script;
  }

}
