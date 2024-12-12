import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://localhost:7217/api/Email/send-email'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, body: string) {
    const emailData = { to, subject, body };
    return this.http.post(this.apiUrl, emailData);
  }

  sendEmailAgent(to: string[], subject: string, body: string)
  {
    const emailData = { to, subject, body };
    return this.http.post(this.apiUrl+'/Agents', emailData);
  }
}
