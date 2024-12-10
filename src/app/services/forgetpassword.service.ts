import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private http:HttpClient) { }
  url="https://localhost:7217/api/ForgetPassword"

  changePassword(data: any)
  {
    return this.http.put(this.url, data)
  }
  forgetPassword(data: any)
  {
    return this.http.post(this.url, data)
  }
  
}
