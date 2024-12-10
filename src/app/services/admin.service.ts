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

  getPolicyAccount(page:number, pageSize:number, searchQuery:string='', searchQuery1:string=''){
    return this.http.get(this.url + '/PolicyAccount'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&searchQuery1=${searchQuery1}`);
  }

  getPlan(){
    return this.http.get(this.planUrl)
  }
  getScheme(page:number, pageSize:number, searchQuery:string=''){
    return this.http.get(this.planUrl+'/Schema'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`)
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
  getAgent(page:number, pageSize:number, searchQuery:string=""){
    return this.http.get(this.agentUrl+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }
  getCommissions(page:number, pageSize:number, searchQuery:string, selectedCommissionType:string){
    return this.http.get(this.url + '/Commission'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&selectedCommissionType=${selectedCommissionType}`);
  }
  addEmployee(employee:any){
    return this.http.post(this.employeeUrl, employee);
  }
  getEmployee(page:number, pageSize:number, searchQuery:string=''){
    return this.http.get(this.employeeUrl+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }
  getUnverifiedAgents(page:number, pageSize:number, searchQuery:string =''){
    return this.http.get(this.agentUrl+'/UnVerified'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
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
  getAllRequest(page:number, pageSize:number, searchQuery:string='')
  {
    return this.http.get(this.url+'/CommissionRequest'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }

  approve(id: any) {
    return this.http.put(this.url +"/CommissionRequest/Approve/" +id, null);
  }
  reject(id: any)
  {
    return this.http.put(this.url +"/CommissionRequest/Reject/" +id, null);
  }

  getPayments(page: number, pageSize: number, searchQuery: string ='')
  {
    return this.http.get(this.url+'/Payments'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }

  getGlobalvariable()
  {
    return this.http.get(this.url+'/Global');
  }
  updateGlobalvariable(data: any)
  {
    return this.http.put(this.url+'/Global',data);
  }
  
}
