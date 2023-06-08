import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../commons/dto/response';
import { BillStatusRes, CustomerStatisticalRes, KpiRes, ProductStatisticalRes, StatisticalCriteria } from './../commons/request/statistical.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class StatisticalService {
    private baseURL = "http://localhost:8081/api/admin/statistical";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    salesByYear(year: string): Observable<BaseResponse> {
        return this.httpClient.get<BaseResponse>(`${this.baseURL}/${year}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    bestCustomer(year: string): Observable<BaseResponse> {
        return this.httpClient.get<BaseResponse>(`${this.baseURL}/best-customer/${year}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    billStatus(): Observable<BillStatusRes> {
        return this.httpClient.get<BillStatusRes>(`${this.baseURL}/bill-status`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    bestSalesProduct(statisticalCriteria: StatisticalCriteria): Observable<ProductStatisticalRes> {
        return this.httpClient.post<ProductStatisticalRes>(`${this.baseURL}/best-sales-product`, statisticalCriteria, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    bestCustomerByStatus(statisticalCriteria: StatisticalCriteria): Observable<CustomerStatisticalRes> {
        return this.httpClient.post<CustomerStatisticalRes>(`${this.baseURL}/best-customer`, statisticalCriteria, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    kpiProcess(): Observable<KpiRes> {
        return this.httpClient.get<KpiRes>(`${this.baseURL}/kpi`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
