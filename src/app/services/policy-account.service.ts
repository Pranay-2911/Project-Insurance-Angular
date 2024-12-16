import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyAccountService {

  url = 'https://localhost:7217/api/PolicyAccount';

  constructor(private http: HttpClient) { }

  getAllClaims(page: number, pageSize: number, searchQuery: string ='')
  {
    return this.http.get(this.url+'/Claims'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }
  claimApprove(id: any)
  {
    return this.http.post(this.url+'/Approve/Claim/' +id, null);
  }

  getPolicyAccount(page:number, pageSize:number, searchQuery:string='', searchQuery1:string=''){
    return this.http.get(this.url + '/PolicyAccount'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&searchQuery1=${searchQuery1}`);
  }
}
