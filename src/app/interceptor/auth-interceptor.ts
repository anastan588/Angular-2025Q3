import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = new TokenService();
  const router = new Router();
  const token = tokenService.getToken();
  console.log(req,145878);
  let clonedRequest = req.clone({ url: `http://localhost:3004/api${req.url}` });
  if (token) {
    clonedRequest = clonedRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        tokenService.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => error); 
    }),
  );
};
