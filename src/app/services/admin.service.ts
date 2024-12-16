import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url='https://localhost:7217/api/Admin';
  // planUrl = 'https://localhost:7217/api/Plan';
  // agentUrl = 'https://localhost:7217/api/Agent';
  // employeeUrl = 'https://localhost:7217/api/Employee';

  
  constructor(private http:HttpClient) { }

  
 
  getCommissions(page:number, pageSize:number, searchQuery:string, selectedCommissionType:string, startDate:string, endDate:string){
    return this.http.get(this.url + '/Commission'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&selectedCommissionType=${selectedCommissionType}&startDate=${startDate}&endDate=${endDate}`);
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
