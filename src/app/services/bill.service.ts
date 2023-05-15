import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillListRes, BillRes } from '../commons/dto/order';
import { AuthService } from './auth.service';
import { BaseResponse } from '../commons/dto/response';

@Injectable({
    providedIn: 'root'
})
export class BillService {
    private baseURL = "http://localhost:8081/api/sales/order";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getCustomBills(billCriteria: any): Observable<BillListRes> {
        return this.httpClient.post<BillListRes>(`${this.baseURL}/custom-bills`, billCriteria, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getBillById(billId: number): Observable<BillRes> {
        return this.httpClient.get<BillRes>(`${this.baseURL}/${billId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    updateBillStatus(billStatusUpdateReq: any): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}`, billStatusUpdateReq, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
