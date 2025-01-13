import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateRequest } from '../models/user/UserCreateRequest';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = environments.API_URL
  constructor(private httpClient: HttpClient) { }

  public signUp(request: UserCreateRequest): Observable<HttpResponse<void>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<void>(
      `${this.API_URL}/users`,
      request,
      { headers, withCredentials: true, observe: 'response' }
    );
  }
}
