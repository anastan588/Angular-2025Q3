import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AboutPage } from './pages/about-page/about-page';
import { LoginPage } from './pages/login-page/login-page';
import { AuthGuard } from './guard/auth-guard';
import { NotfoundPage } from './pages/notfound-page/notfound-page';
import { Dashboard } from './components/dashboard/dashboard';
import { Label } from './components/label/label';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: ':dashboard/:dashboardId',
    component: Dashboard,
    children: [
      {
        path: ':tabId',
        component: Label
      },
    ],
  },
  { path: '**', component: NotfoundPage },
];
