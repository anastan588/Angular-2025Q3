import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AboutPage } from './pages/about-page/about-page';
import { LoginPage } from './pages/login-page/login-page';
import { AuthGuard } from './guard/auth-guard';
import { NotfoundPage } from './pages/notfound-page/notfound-page';

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
  { path: '**', component: NotfoundPage },
];
