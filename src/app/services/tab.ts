import { Injectable } from '@angular/core';
import { Data, Tab } from '../data/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private tabSubject = new BehaviorSubject<Tab | null>(null);
  public tab$: Observable<Tab | null> = this.tabSubject.asObservable();

  setTabData(data: Tab): void {
    if (data) {
      this.tabSubject.next(data);
    } 
  }

  getTabData(): Tab | null {
    return this.tabSubject.getValue();
  }
}
