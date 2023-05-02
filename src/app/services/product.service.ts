import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListProductDetailRes, ProductListRes, SearchReq } from '../commons/dto/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = "http://localhost:8081/api/products";
  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<ProductListRes> {
    return this.httpClient.get<ProductListRes>(`${this.baseURL}`);
  }

  getDataProductDetailByProductId(productId:number): Observable<ListProductDetailRes> {
    return this.httpClient.get<ListProductDetailRes>(`${this.baseURL}/${productId}`);
  }

  getProductsOfCategory(categoryId:number): Observable<ProductListRes> {
    return this.httpClient.get<ProductListRes>(`${this.baseURL}/category/${categoryId}`);
  }

  searchProducts(searchReq: SearchReq): Observable<ProductListRes> {
    return this.httpClient.post<ProductListRes>(`${this.baseURL}/search`, searchReq);
  }
  
}
