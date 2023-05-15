import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';
import { ProfileListRes, ProfileRes } from '../commons/dto/profile';

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

}
