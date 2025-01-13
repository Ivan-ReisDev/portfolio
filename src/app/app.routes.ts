import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.service';
import { ROUTES_ENDPOINTS } from '../config/routers';

export const routes: Routes = [
  {path: "", redirectTo: ROUTES_ENDPOINTS.SIGNIN, pathMatch: "full" },
  {path: "app", redirectTo: ROUTES_ENDPOINTS.DASHBOARD, pathMatch: "full" },

  {
    path: ROUTES_ENDPOINTS.PORTFOLIO,
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then((c) => c.PortfolioComponent),

  },

  {
    path: ROUTES_ENDPOINTS.SIGNIN,
    loadComponent: () =>
      import('./pages/signin/signin.component').then((c) => c.SigninComponent),

  },

  {
    path: ROUTES_ENDPOINTS.SIGNUP,
    loadComponent: () =>
      import('./pages/signup/signup.component').then((c) => c.SignupComponent),

  },

  {
    path: ROUTES_ENDPOINTS.DASHBOARD,
    loadComponent: () =>
      import('./pages/app/dashboard/dashboard.component').then((c) => c.DashboardComponent),
    canActivate: [AuthGuard]
  },

];
