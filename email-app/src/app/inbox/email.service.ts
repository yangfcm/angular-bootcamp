import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

interface EmailDetail {
  id: string;
  subject: string;
  to: string;
  from: string;
  text: string;
  html: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<EmailDetail>(`${this.rootUrl}/emails/${id}`);
  }
}
