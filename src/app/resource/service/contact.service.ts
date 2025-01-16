import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact/Contact';
import { map, Observable } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API_URL = environments.API_URL;
 constructor(private httpClient: HttpClient) { }

  public findByContactList(page: number, limit: number): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.API_URL}/contact?page=${page}&limit=${limit}`, { withCredentials: true })
      .pipe(
        map((response: Contact[]) => {
          return response;
        })
      );
  }

}
