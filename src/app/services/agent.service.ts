import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  url='https://localhost:7217/api/Agent';
  constructor(private http:HttpClient) { }

  getAgents(page:number, pageSize:number) {
    return this.http.get(this.url+`?pageNumber=${page}&pageSize=${pageSize}`);
  }

  getAgent(id:any) {
    return this.http.get(`${this.url}/${id}`);
  }

  getCommission(id:any, page:number, pageSize:number) {
    return this.http.get(`${this.url}/Commission/${id}?pageNumber=${page}&pageSize=${pageSize}`);
  }
  getBalance(id:any) {
    return this.http.get(`${this.url}/CurrentBalance/${id}`);
  }
  commissionRequest(data :any) {
    return this.http.post(`${this.url}/CommissionRequest`, data);
  }
  getRequests(id:any) {
    return this.http.get(`${this.url}/CommissionRequest/${id}`);
  }
  changePassword(data:any) {
    return this.http.put(`${this.url}/ChangePassword`, data);
  }

}
