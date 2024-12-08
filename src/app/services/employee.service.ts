import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  url="https://localhost:7217/api/Employee/"
  constructor(private http:HttpClient) { }

 getDocument(page: number, pageSize: number)
 {
   return this.http.get(this.url+'GetAllDocument'+`?pageNumber=${page}&pageSize=${pageSize}`);
 }

 verifyDocument(id: any)
 {
   return this.http.put(this.url+'Verify/'+id, null);
 }
 rejectDocument(id: any)
 {
   return this.http.put(this.url+'Reject/'+id, null);
 }
 getAllQuery(page: number, pageSize: number)
 {
   return this.http.get(this.url+'GetAllQuery');
 }
 queryResponse(id: any, data: any)
 {
   return this.http.put(this.url+'QueryResponse/'+id, data);
 }
 changePassword(data:any){
  return this.http.put(`${this.url}ChangePassword`, data);
}

}
