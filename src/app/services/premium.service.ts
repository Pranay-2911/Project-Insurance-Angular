import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {
  paymentUrl='https://localhost:7217/api/Premium'
  // https://localhost:7217/api/Premium/Account/8e8f7150-01bf-4151-bcb1-08dd12db91b4
  constructor(private http:HttpClient) { }


  pay(id:any) {
    return this.http.post(`${this.paymentUrl}/${id}`, null);
  }

  getPremium(id:any, page:number, pageSize:number) {
    return this.http.get(this.paymentUrl+'/Account/'+id+`?pageNumber=${page}&pageSize=${pageSize}`);
  }
}
