import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 url='https://localhost:7217/api/Login';
 
  constructor(private http:HttpClient) { }

  logIn(loginData:any){
    return this.http.post(this.url, loginData, {observe: 'response'});
  }

}
