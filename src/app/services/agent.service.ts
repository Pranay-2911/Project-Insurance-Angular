import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  url='https://localhost:7217/api/Agent';
  constructor(private http:HttpClient) { }

  getAgents() {
    return this.http.get(this.url);
  }

  getAgent(id:any) {
    return this.http.get(`${this.url}/${id}`);
  }

  getCommission(id:any) {
    return this.http.get(`${this.url}/Commission/${id}`);
  }
}
