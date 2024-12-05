import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url='https://localhost:7217/api/Admin';
  planUrl = 'https://localhost:7217/api/Plan';
  agentUrl = 'https://localhost:7217/api/Agent';
  employeeUrl = 'https://localhost:7217/api/Employee';
  
  constructor(private http:HttpClient) { }

  getState()
  {
    return this.http.get(this.url + '/States');
  }
  getCities(){
    return this.http.get(this.url + '/City');
  }

  getPolicyAccount(){
    return this.http.get(this.url + '/PolicyAccount');
  }

  getPlan(){
    return this.http.get(this.planUrl)
  }
  getScheme(){
    return this.http.get(this.planUrl+'/Schema')
  }

  addPlan(plan : any){
    return this.http.post(this.planUrl,plan);
  }

  addScheme(schema:any)
  {
    return this.http.post(this.planUrl+'/Schema',schema);
  }

  addCity(city:any){
    return this.http.post(this.url + '/City', city);
  }

  addState(data:any){
    return this.http.post(this.url + '/State', data);
  }
  addAgent(agent:any){
    return this.http.post(this.agentUrl, agent);
  }
  getAgent(){
    return this.http.get(this.agentUrl);
  }
  getCommissions(){
    return this.http.get(this.url + '/Commission');
  }
  addEmployee(employee:any){
    return this.http.post(this.employeeUrl, employee);
  }
  getEmployee(){
    return this.http.get(this.employeeUrl);
  }
  getUnverifiedAgents(){
    return this.http.get(this.agentUrl+'/UnVerified');
  }
  verifyAgent(id: any) {
    return this.http.put(`${this.agentUrl}/Verify?id=${id}`, null);
  }
  deleteAgent(id: any) {
    return this.http.delete(this.agentUrl+ "/" +id);
  }
  deleteEmployee(id: any) {
    return this.http.delete(this.employeeUrl+ "/" +id);
  }
  
}
