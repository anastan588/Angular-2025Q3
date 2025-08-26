import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);; 
  const router = new Router();

  if (authService.isAuthenticated()) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false; 
  }
};
