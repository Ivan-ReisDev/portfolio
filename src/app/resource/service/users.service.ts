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
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private httpClient: HttpClient) { }

  public signUp(request: UserCreateRequest): Observable<HttpResponse<void>> {

    return this.httpClient.post<void>(
      `${this.API_URL}/users`, request, { headers: this.headers, withCredentials: true, observe: 'response' }
    );
  }
}
