import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'https://localhost:7217/api/Customer';
  constructor(private http:HttpClient) { }

  getAllCustomer(page: number, pageSize: number, searchQuery: string = '')
  {
    return this.http.get(this.url+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }

  getCustomer(id:any){
    return this.http.get(this.url+'/'+ id);
  }
  getPolicyAccount(id:any, page:number, pageSize:number, searchQuery:string=''){
    return this.http.get(`${this.url}/PolicyAccount?id=${id}&PageNumber=${page}&PageSize=${pageSize}&searchQuery=${searchQuery}`);
  }
  buyPolicy( data:any){
    return this.http.post(`${this.url}/purchase-policy`, data);
  }
  changePassword(data:any){
    return this.http.put(`${this.url}/ChangePassword`, data);
  }
  addCustomer(data:any){
    return this.http.post(this.url, data);
  }
  buyPolicyByAgent(id:any, data:any){
    return this.http.post(`${this.url}/purchase-policy/${id}/Agent`, data);
  }

  reuploadDocument(id:any){
    return this.http.put(`${this.url}/Reupload/${id}`, null);
  }
  getInfo(id:any){
    return this.http.get(this.url +'/GetInfo/' + id);
  }
  updateCustomer(data:any){
    return this.http.put(`${this.url}`, data);
  }
}
