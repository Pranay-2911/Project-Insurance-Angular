import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  url='https://localhost:7217/api/Agent';
  constructor(private http:HttpClient) { }

  getAgents(page:number, pageSize:number, searchQuery:string='') {
    return this.http.get(this.url+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }

  getAgent(id:any) {
    return this.http.get(`${this.url}/${id}`);
  }

  getCommission(id:any, page:number, pageSize:number, searchQuery:string='') {
    return this.http.get(`${this.url}/Commission/${id}?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }
  getBalance(id:any) {
    return this.http.get(`${this.url}/CurrentBalance/${id}`);
  }
  commissionRequest(data :any) {
    return this.http.post(`${this.url}/CommissionRequest`, data);
  }
  getRequests(id:any, page:number, pageSize:number, selectedCommissionType:string) {
    return this.http.get(`${this.url}/CommissionRequest/${id}?pageNumber=${page}&pageSize=${pageSize}&selectedCommissionType=${selectedCommissionType}`);
  }
  changePassword(data:any) {
    return this.http.put(`${this.url}/ChangePassword`, data);
  }
  activeAgent(id:any) {
    return this.http.put(`${this.url}/Active/${id}`, null);
  }

  updateAgent(data :any) {
    return this.http.put(`${this.url}`, data);
  }

  getUnverifiedAgents(page:number, pageSize:number, searchQuery:string =''){
    return this.http.get(this.url+'/UnVerified'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }
  verifyAgent(id: any) {
    return this.http.put(`${this.url}/Verify?id=${id}`, null);
  }
  deleteAgent(id: any) {
    return this.http.delete(this.url+ "/" +id);
  }
  
  addAgent(agent:any){
    return this.http.post(this.url, agent);
  }
  
}
