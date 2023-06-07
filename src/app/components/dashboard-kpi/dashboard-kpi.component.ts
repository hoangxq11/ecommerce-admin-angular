import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { StatisticalService } from 'src/app/services/statistical.service';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.component.html',
  styleUrls: ['./dashboard-kpi.component.scss']
})
export class DashboardKpiComponent implements OnInit {

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
    this.salesByYear();
    this.bestCustomer();
  }

  salesByYear() {
    this.statisticalService.salesByYear(this.year).subscribe(data => {
      this.listDataSales = data.data;
      this.generateBarChartWithJquery()
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  bestCustomer() {
    this.statisticalService.bestCustomer(this.year).subscribe(data => {
      this.listDataCustomer = data.data;
      this.listDataCustomerName = Object.keys(this.listDataCustomer).map((key) => key);
      this.listDataCustomerCount = Object.keys(this.listDataCustomer).map((key) => this.listDataCustomer[key]);
      this.generateDonutChartWithJquery()
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  onProcess() {
    this.salesByYear();
    this.bestCustomer();
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

  generateBarChartWithJquery() {
    let canvasElement = document.getElementById("barChart");
    this._renderer2.removeChild(this._document.body, canvasElement);

    let barChartElement = document.getElementById("barChart-div");
    let canvasE = this._renderer2.createElement('canvas');

    this._renderer2.setAttribute(canvasE, 'id', 'barChart');
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
            labels:` + JSON.stringify(this.listMonth) + `,
            datasets: [
              {
                label: 'Số mặt hàng bán',
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: ` + JSON.stringify(this.listDataSales[0]) + `
              },
              {
                label: 'Số mặt hàng nhập',
                backgroundColor: 'rgba(210, 214, 222, 1)',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: false,
                pointColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: ` + JSON.stringify(this.listDataSales[1]) + `
              },
            ]
          }

          //-------------
          //- BAR CHART -
          //-------------
          var barChartCanvas = $('#barChart').get(0).getContext('2d')
          var barChartData = $.extend(true, {}, areaChartData)
          var temp0 = areaChartData.datasets[0]
          var temp1 = areaChartData.datasets[1]
          barChartData.datasets[0] = temp1
          barChartData.datasets[1] = temp0

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

          // ádadas
          var areaChartData = {
            labels: ['Đợt 1', 'Đợt 2', 'Đợt 3', 'Dự đoán', 'Hiện tại'],
            datasets: [
              {
                label: 'Doanh thu (VNĐ)',
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: [3660985, 4269800, 7237000, 10353344, 1995000]
              },
            ]
          }

          //-------------
          //- BAR CHART -
          //-------------
          var barChartCanvas = $('#barChart1').get(0).getContext('2d')
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

  generateDonutChartWithJquery() {
    let canvasElement = document.getElementById("donutChart");
    this._renderer2.removeChild(this._document.body, canvasElement);

    let barChartElement = document.getElementById("donutChart-div");
    let canvasE = this._renderer2.createElement('canvas');

    this._renderer2.setAttribute(canvasE, 'id', 'donutChart');
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
          var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
          var donutData = {
            labels: ` + JSON.stringify(this.listDataCustomerName) + `,
            datasets: [
              {
                data: ` + JSON.stringify(this.listDataCustomerCount) + `,
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

          //-------------
          //- DONUT CHART -
          //-------------
          // Get context with jQuery - using jQuery's .get() method.
          var donutChartCanvas = $('#donutChart1').get(0).getContext('2d')
          var donutData = {
            labels: ` + JSON.stringify(this.listDataCustomerName) + `,
            datasets: [
              {
                data: ` + JSON.stringify(this.listDataCustomerCount) + `,
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

          //-------------
          //- DONUT CHART -
          //-------------
          // Get context with jQuery - using jQuery's .get() method.
          var donutChartCanvas = $('#donutChart2').get(0).getContext('2d')
          var donutData = {
            labels: ` + JSON.stringify(this.listDataCustomerName) + `,
            datasets: [
              {
                data: ` + JSON.stringify(this.listDataCustomerCount) + `,
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
