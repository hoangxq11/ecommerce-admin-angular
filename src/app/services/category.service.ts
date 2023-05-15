import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryListRes, CategoryReq, CategoryRes } from '../commons/dto/category';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = "http://localhost:8081/api/categories";
  constructor(private httpClient: HttpClient, public authService: AuthService) { }

  getAllCategory(): Observable<CategoryListRes> {
    return this.httpClient.get<CategoryListRes>(`${this.baseURL}/all`);
  }

  getCategoriesByParentId(parentId:number): Observable<CategoryListRes> {
    return this.httpClient.get<CategoryListRes>(`${this.baseURL}/parent/${parentId}`);
  }

  getCategoriesById(categoryId:number): Observable<CategoryRes> {
    return this.httpClient.get<CategoryRes>(`${this.baseURL}/${categoryId}`);
  }

  createNewCategory(categoryReq: CategoryReq): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${this.baseURL}`, categoryReq, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }
  
}
