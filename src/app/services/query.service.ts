import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  url="https://localhost:7217/api/Query"
  constructor(private http:HttpClient) { }

  getQueries(){
    return this.http.get(this.url);
  }

  addQuery(data:any){
    return this.http.post(this.url, data);
  }

}
