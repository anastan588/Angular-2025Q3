import { Injectable } from '@angular/core';
import { Data, Tab } from '../data/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { addTab, deleteTab, updateTabTitle } from '../store/smarthome.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private tabSubject = new BehaviorSubject<Tab | null>(null);
  public tab$: Observable<Tab | null> = this.tabSubject.asObservable();
  constructor(private store: Store) {}
  setTabData(data: Tab): void {
    if (data) {
      this.tabSubject.next(data);
    }
  }

  getTabData(): Tab | null {
    return this.tabSubject.getValue();
  }
  addNewTabToStore(newTab: Tab) {
    if (newTab) {
      this.store.dispatch(addTab({ newTab: newTab }));
    }
    return;
  }
  deleteTabFromStore(tabId: string) {
    if (tabId) {
      this.store.dispatch(deleteTab({ tabId: tabId }));
    }
    return;
  }
  editTabTitleStore(tabId: string, tabTitle: string) {
    if (tabId && tabTitle) {
      this.store.dispatch(updateTabTitle({ tabId: tabId, newTitle: tabTitle }));
    }
    return;
  }
}
