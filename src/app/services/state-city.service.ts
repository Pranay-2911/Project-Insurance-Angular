import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateCityService {

  url = 'https://localhost:7217/api/StatesCities'

  constructor(private http: HttpClient) { }

  addCity(city:any){
    return this.http.post(this.url + '/City', city);
  }

  addState(data:any){
    return this.http.post(this.url + '/State', data);
  }

  getState()
  {
    return this.http.get(this.url + '/States');
  }
  getCities(){
    return this.http.get(this.url + '/City');
  }
}
