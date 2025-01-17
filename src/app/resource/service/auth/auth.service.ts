import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { SignInRequest } from '../../models/auth/SignInRequest';
import { catchError, map, Observable, of } from 'rxjs';
import { SignInResponse } from '../../models/auth/SignInResponse';
import { CookieService } from 'ngx-cookie-service';
import { UserResponse } from '../../models/user/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environments.API_URL;

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService
  ) { }

  public signIn(request: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${this.API_URL}/auth/login`, request, { withCredentials: true })
  }
  public isLoggedIn(): Observable<boolean> {
    return this.httpClient.get<UserResponse>(`${this.API_URL}/users/profile`, { withCredentials: true }).pipe(
      map((response: UserResponse) => {
        if (response) {
          this.cookie.set('portfolio_profile', JSON.stringify(response), { path: '/' });
        }
        return !!response;
      }),
      catchError((error) => {
        if (error.status === 401) {
          return of(false);
        } else {
          return of(false); 
        }
      })
    );
  }

  public logout(): Observable<void> {
    return this.httpClient.post<void>(`${this.API_URL}/auth/logout`, {} , { withCredentials: true })
  }
}
