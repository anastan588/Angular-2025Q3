import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { DashBoardItem, Data } from '../data/types';
import { DashboardService } from './dashboard';
import { TabService } from './tab';

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

  constructor(
    private http: HttpClient,
    private DashBoardService: DashboardService,
    private tabService: TabService,
  ) {}

  getDashBoards(): Observable<DashBoardItem[]> {
    return this.http.get<DashBoardItem[]>(this.dashboardsUrl).pipe(
      tap((response) => {
        this.dashboards.next(response);
        if (this.isFirstDashboardsLoad.getValue() === false) {
          this.getDashBoardById(this.dashboards.getValue()[0].id).subscribe();
          this.isFirstDashboardsLoad.next(true);
        }
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
        this.DashBoardService.setDashBoardData(response);
        this.tabService.setTabData(response.tabs[0]);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Dashboard download failed', error);
        this.getDashBoards().subscribe();
        return throwError(() => error);
      }),
    );
  }

  setFirstDashboardsLoad(isLoaded: boolean): void {
    this.isFirstDashboardsLoad.next(isLoaded);
  }

  createBoard(newDashBoard: DashBoardItem): Observable<DashBoardItem> {
    return this.http.post<DashBoardItem>(this.dashboardsUrl, newDashBoard).pipe(
      tap((response) => {
        console.log('New Dashboard is created', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('New Dashboard creation failed', error);

        return throwError(() => error);
      }),
    );
  }

  deleteDashBoardById(dashboardID: string) {
    const url = `${this.dashboardsUrl}/${dashboardID}`;
    return this.http.delete(url).pipe(
      tap((response) => {
        console.log('Dashboard is deleted', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Dashboard detetion failed', error);
        return throwError(() => error);
      }),
    );
  }

  updateDashBoard(dashboard: Data, dashboardId: string) {
    const url = `${this.dashboardsUrl}/${dashboardId}`;
    return this.http.put(url, dashboard).pipe(
      tap((response) => {
        console.log('Dashboard updated successfully', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Dashboard update failed', error);
        if (error.status === 404) {
          console.error('Dashboard not found');
        } else if (error.status === 400) {
          console.error('Bad request', error.error);
        }
        return throwError(() => new Error('Failed to update dashboard'));
      }),
    );
  }
}
