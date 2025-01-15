import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SentEmailRequest } from '../models/emails/SentEmailRequest';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  private API_URL = environments.API_URL;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private httpClient: HttpClient) { }

  public sentEmail(request: SentEmailRequest): Observable<HttpResponse<void>> {
    return this.httpClient.post<void>(
      `${this.API_URL}/emails`,
      { data: request },
      { headers: this.headers, withCredentials: true, observe: 'response' }
    );
  }
}
