import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';
import { ProfileListRes, ProfileRes } from '../commons/dto/profile';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private baseURL = "http://localhost:8081/api/admin/accounts";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getAllAccountProfile(): Observable<ProfileListRes> {
        return this.httpClient.get<ProfileListRes>(`${this.baseURL}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
