import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(private http:HttpClient) { }
  url="https://localhost:7217/api/Enum/"

  getNominee(){
    return this.http.get(this.url+'Nominee');
  }
}
