import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url="https://localhost:7217/api/Document"
  documentType="https://localhost:7217/api/Enum/Document"
  constructor(private http:HttpClient) { }

  addDocument(data:any){
    return this.http.post(this.url, data)
  }

  getDocumentType(){
    return this.http.get(this.documentType)
  }
}
