import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AccountLogin, AccountRegister, JwtResponse } from '../commons/dto/account';
import { BaseResponse } from '../commons/dto/response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseURL = "http://localhost:8081/api/auth";
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  authentication(accountLogin: AccountLogin): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.baseURL}/signin`, accountLogin);
  }

  register(accountRegister: AccountRegister): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${this.baseURL}/signup`, accountRegister);
  }

}
