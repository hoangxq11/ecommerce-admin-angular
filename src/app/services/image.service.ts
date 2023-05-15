import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';
import { ProfileListRes, ProfileRes } from '../commons/dto/profile';
import { ImageListRes } from '../commons/dto/image';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private baseURL = "http://localhost:8081/api/images";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    uploadFile(files: File[]): Observable<ImageListRes> {
        const formData: FormData = new FormData();
        files.forEach(e => {
            formData.append('file', e);
        })
        
        return this.httpClient.post<ImageListRes>(`${this.baseURL}/upload`, formData, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
