import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { DashBoardItem, Data } from '../data/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dashboardsUrl = '/dashboards';
  private dashboards = new BehaviorSubject<DashBoardItem[]>([]);
  private isFirstDashboardsLoad = new BehaviorSubject<boolean>(false);
  dashboardsLoaded$: Observable<DashBoardItem[]> =
    this.dashboards.asObservable();
  firstDashboardsLoad$: Observable<boolean> =
    this.isFirstDashboardsLoad.asObservable();

  constructor(private http: HttpClient) {}

  getDashBoards(): Observable<DashBoardItem[]> {
    return this.http.get<DashBoardItem[]>(this.dashboardsUrl).pipe(
      tap((response) => {
        this.dashboards.next(response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Dashboards download failed', error);
        return throwError(() => error);
      }),
    );
  }

  getDashBoardById(dashboardID: string): Observable<Data> {
    const url = `${this.dashboardsUrl}/${dashboardID}`;
    return this.http.get<Data>(url).pipe(
      tap((response) => {
        console.log('Dashboard is downloaded', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Dashboard download failed', error);
        return throwError(() => error);
      }),
    );
  }

  setFirstDashboardsLoad(isLoaded: boolean): void {
    this.isFirstDashboardsLoad.next(isLoaded);
  }
}
