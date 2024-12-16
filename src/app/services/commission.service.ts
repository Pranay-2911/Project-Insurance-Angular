import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  url = 'https://localhost:7217/api/Commission'

  constructor(private http: HttpClient) { }

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
}
