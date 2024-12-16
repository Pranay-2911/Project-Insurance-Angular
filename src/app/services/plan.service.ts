import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  planUrl = 'https://localhost:7217/api/Plan';

  constructor(private http:HttpClient) { }

  getAllPlans() {
    return this.http.get(this.planUrl);
  }

  getSchemes(page:number, pageSize:number, searchQuery:string=''){
    return this.http.get(this.planUrl+'/Schema'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`)
  }

  getScheme(id:any){
    return this.http.get(this.planUrl + '/Policy/' + id);
  }
  updateSchema(data:any){
    return this.http.put(this.planUrl+ '/Policy', data);
  }
  deleteSchema(id:any){  
    return this.http.delete(this.planUrl + '/' + id);
  }

  getSchemaByName(data:any)
  {
    return this.http.post(this.planUrl + '/GetSchemaByName', data);
  }

  addPlan(plan : any){
    return this.http.post(this.planUrl,plan);
  }

  addScheme(schema:any)
  {
    return this.http.post(this.planUrl+'/Schema',schema);
  }
}
