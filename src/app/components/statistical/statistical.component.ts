import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatisticalService } from 'src/app/services/statistical.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {

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
    this.statisticalService.salesByYear("2021").subscribe(data => {
      this.listDataSales = data.data;
      this.generateBarChartWithJquery()
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  bestCustomer() {
    this.statisticalService.bestCustomer("2021").subscribe(data => {
      this.listDataCustomer = data.data;
      this.listDataCustomerName = Object.keys(this.listDataCustomer).map((key) => key);
      this.listDataCustomerCount = Object.keys(this.listDataCustomer).map((key) => this.listDataCustomer[key]);
      this.generateDonutChartWithJquery()
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    })
  }

  generateBarChartWithJquery() {
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

        })
    `;

    this._renderer2.appendChild(this._document.body, script);

  }

  generateDonutChartWithJquery() {
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

        })
    `;

    this._renderer2.appendChild(this._document.body, script);

  }

}
