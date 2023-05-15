import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingServiceListRes } from '../commons/dto/shipping';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ShippingService {
    private baseURL = "http://localhost:8081/api/shipping-services";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getAllShippingService(): Observable<ShippingServiceListRes> {
        return this.httpClient.get<ShippingServiceListRes>(`${this.baseURL}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
