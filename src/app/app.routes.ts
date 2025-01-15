import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.service';
import { ROUTES_ENDPOINTS } from '../config/routers';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES_ENDPOINTS.SIGNIN, pathMatch: 'full' },

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
    path: ROUTES_ENDPOINTS.APP,
    loadComponent: () =>
      import('./pages/app/app.component').then((c) => c.AppParent),
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: 'full',
        redirectTo: ROUTES_ENDPOINTS.DASHBOARD,
      },
      {
        path: ROUTES_ENDPOINTS.DASHBOARD,
        loadComponent: () =>
          import('./pages/app/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },

      {
        path: ROUTES_ENDPOINTS.SETTINGS,
        loadComponent: () =>
          import('./pages/app/settings/settings.component').then((c) => c.SettingsComponent),
      },

      {
        path: ROUTES_ENDPOINTS.EMAILS,
        loadComponent: () =>
          import('./pages/app/emails/emails.component').then((c) => c.EmailsComponent),
      },
    ],
  },
];
