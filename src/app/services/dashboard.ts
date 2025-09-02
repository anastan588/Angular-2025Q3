import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashBoardDataSubject = new BehaviorSubject<Data | null>(null);
  dashBoardData$: Observable<Data | null> =
    this.dashBoardDataSubject.asObservable();
  private isFirstDashboardRender = new BehaviorSubject<boolean>(false);
  firstDashboardRender$: Observable<boolean> =
    this.isFirstDashboardRender.asObservable();

  setDashBoardData(data: Data) {
    this.dashBoardDataSubject.next(data);
  }
  getDashBoardData(): Data | null {
    return this.dashBoardDataSubject.getValue();
  }

  setDashBoardRender(data: boolean) {
    this.isFirstDashboardRender.next(data);
  }
  getDashBoardRender(): boolean {
    return this.isFirstDashboardRender.getValue();
  }
}
