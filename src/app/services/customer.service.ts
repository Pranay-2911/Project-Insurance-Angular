import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'https://localhost:7217/api/Customer';
  constructor(private http:HttpClient) { }

  getAllCustomer()
  {
    return this.http.get(this.url);
  }

  getCustomer(id:any){
    return this.http.get(this.url+'/'+ id);
  }
  getPolicyAccount(id:any){
    return this.http.get(`${this.url}/PolicyAccount?id=${id}`);
  }
  buyPolicy( data:any){
    return this.http.post(`${this.url}/purchase-policy`, data);
  }
  changePassword(data:any){
    return this.http.post(`${this.url}/changepassword`, data);
  }
  addCustomer(data:any){
    return this.http.post(this.url, data);
  }

}
