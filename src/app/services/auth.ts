import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenService } from './token-service';
import { AuthResponse, ProfileResponse, User } from '../data/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/user';
  private authenticated: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {}

  login(loginData: {
    userName: string;
    passWord: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        console.log('Login successful', response);
        this.authenticated = true;
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        this.authenticated = false;
        return throwError(() => error);
      }),
    );
  }

  profile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profile`).pipe(
      tap((response) => {
        console.log('User is authorized', response);
        this.authenticated = true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Authorization failed', error);
        this.authenticated = false;
        if (error.status) {
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      }),
    );
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!this.tokenService.getToken()) {
      this.authenticated = false;
    }
    return this.authenticated;
  }
}
