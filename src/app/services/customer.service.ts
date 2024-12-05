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

}
