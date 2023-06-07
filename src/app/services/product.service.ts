import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListProductDetailRes, ProductListRes, ProductRes, SearchReq } from '../commons/dto/product';
import { BaseResponse } from '../commons/dto/response';
import { CreateCustomProductReq, ProductDetailReq } from '../commons/request/product.req';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = "http://localhost:8081/api/products";
  constructor(private httpClient: HttpClient, public authService: AuthService) { }

  getAllProducts(): Observable<ProductListRes> {
    return this.httpClient.get<ProductListRes>(`${this.baseURL}`);
  }

  getSingleProductById(productId: number): Observable<ProductRes> {
    return this.httpClient.get<ProductRes>(`${this.baseURL}/single-product/${productId}`);
  }

  getDataProductDetailByProductId(productId: number): Observable<ListProductDetailRes> {
    return this.httpClient.get<ListProductDetailRes>(`${this.baseURL}/${productId}`);
  }

  getProductsOfCategory(categoryId: number): Observable<ProductListRes> {
    return this.httpClient.get<ProductListRes>(`${this.baseURL}/category/${categoryId}`);
  }

  searchProducts(searchReq: SearchReq): Observable<ProductListRes> {
    return this.httpClient.post<ProductListRes>(`${this.baseURL}/search`, searchReq);
  }

  createNewProduct(productReq: CreateCustomProductReq): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-product`, productReq, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  createProductDetail(productDetailReq: ProductDetailReq): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-product-detail`, productDetailReq, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  updateProductDetail(productDetailId: number, productDetailReq: ProductDetailReq): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-product-detail/${productDetailId}`, productDetailReq, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  updateProduct(productId: number, productReq: CreateCustomProductReq): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${this.baseURL}/${productId}`, productReq, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  deletedProduct(productId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${productId}`);
  }

}
