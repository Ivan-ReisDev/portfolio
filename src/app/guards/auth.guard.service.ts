import { Router, UrlTree } from '@angular/router';
import { AuthService } from './../resource/service/auth/auth.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ROUTES_ENDPOINTS } from '../../config/routers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map(status => {
        if (!status) {
          this.router.navigate([ROUTES_ENDPOINTS.SIGNIN]);
          return false;
        }
        return true;
      })
    );
  }
}
