import { Injectable } from '@angular/core';
import { JwtData } from '../commons/dto/account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtData: JwtData = JSON.parse(sessionStorage.getItem('jwtToken') || "{}");

  constructor() { }

  isLoggedIn() {
    return !!sessionStorage.getItem('jwtToken');
  }

  getToken() {
    return this.jwtData.token;
  }
}
