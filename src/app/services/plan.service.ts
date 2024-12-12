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

  getScheme(id:any){
    return this.http.get(this.planUrl + '/Policy/' + id);
  }
  updateSchema(data:any){
    return this.http.put(this.planUrl+ '/Policy', data);
  }
  deleteSchema(id:any){  
    return this.http.delete(this.planUrl + '/' + id);
  }

  getSchemaByName(data:any){
  {
    return this.http.post(this.planUrl + '/GetSchemaByName', data);
  }
}
}
