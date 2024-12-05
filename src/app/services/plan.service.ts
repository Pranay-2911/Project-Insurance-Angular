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

}
