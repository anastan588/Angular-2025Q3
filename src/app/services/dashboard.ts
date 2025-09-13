import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { enterEditMode } from '../store/smarthome.actions';
import { DashBoardItem, Data } from '../data/types';

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

  constructor(private store: Store) {}

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

  setcurrentDashBoardToStore() {
    const currentDashBoard = this.dashBoardDataSubject.getValue();
    console.log(currentDashBoard);
    if (currentDashBoard) {
      this.store.dispatch(enterEditMode({ originalDashboard: currentDashBoard }));
    }
    return;
  }
}
