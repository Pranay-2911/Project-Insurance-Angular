import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  url="https://localhost:7217/api/Query"
  constructor(private http:HttpClient) { }

  getQueries(id: any, page: number, pageSize: number){
    return this.http.get(this.url+ '/' + id);
  }

  addQuery(data:any){
    return this.http.post(this.url, data);
  }

}
