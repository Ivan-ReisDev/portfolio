import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../resource/service/auth/auth.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ROUTES_ENDPOINTS } from '../../config/routers';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map(status => {
        if (status) {
          this.router.navigate([`app/${ROUTES_ENDPOINTS.DASHBOARD}`]);
          return false;
        }
        return true;
      })
    );
  }
}
