import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = 'https://localhost:7217/api/Payment'

  constructor(private http: HttpClient) { }

  getPayments(page: number, pageSize: number, searchQuery: string ='', startDate: string, endDate: string)
  {
    return this.http.get(this.url+'/Payments'+`?pageNumber=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`);
  }
}
