import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  cloudinaryUrl = 'https://api.cloudinary.com/v1_1/insuranceapp/image/upload';

  constructor(private http:HttpClient) { }

  uploadImage(data:any):Observable<any>{
    return this.http.post(this.cloudinaryUrl, data);
  }
}
