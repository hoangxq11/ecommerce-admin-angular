import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryListRes, CategoryRes } from '../commons/dto/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = "http://localhost:8081/api/categories";
  constructor(private httpClient: HttpClient) { }

  getAllCategory(): Observable<CategoryListRes> {
    return this.httpClient.get<CategoryListRes>(`${this.baseURL}/all`);
  }

  getCategoriesByParentId(parentId:number): Observable<CategoryListRes> {
    return this.httpClient.get<CategoryListRes>(`${this.baseURL}/parent/${parentId}`);
  }

  getCategoriesById(categoryId:number): Observable<CategoryRes> {
    return this.httpClient.get<CategoryRes>(`${this.baseURL}/${categoryId}`);
  }
  
}
