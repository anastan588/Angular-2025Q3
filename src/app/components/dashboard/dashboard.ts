import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Card, DashBoardItem, Data, Tab } from '../../data/types';
import { DataService } from '../../services/data';
import { Label } from '../label/label';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabService } from 'src/app/services/tab';
import {
  filter,
  Observable,
  of,
  shareReplay,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { exitEditMode } from 'src/app/store/smarthome.actions';
import { DashboardState } from 'src/app/store/smarthome.store';
import {
  loadCurrentDashboard,
  loadEditingMode,
} from 'src/app/store/smarthome.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddTabDialog } from '../add-tab.dialog/add-tab.dialog';
import { DeletetabDialog } from '../deletetab.dialog/deletetab.dialog';
import { EditTabDialog } from '../edit-tab.dialog/edit-tab.dialog';
import { AddCardDialog } from '../add-card.dialog/add-card.dialog';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatTabsModule, RouterModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  dashboard!: string;
  dashboardId!: string;
  dashBoardData!: Data;
  dashBoardDataEditing$!: Observable<Data>;
  cards!: Card[];
  currentTab!: string;
  dashboardDataSubscription!: Subscription;
  TabDataSubscription!: Subscription;
  isEditing$!: boolean;
  isEditingSubscription!: Subscription;
  isEditing: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tabService: TabService,
    private DashBoardService: DashboardService,
    private DataService: DataService,
    private store: Store<{ dashboard: DashboardState }>,
    private dialog: MatDialog,
  ) {
    this.TabDataSubscription = this.tabService.tab$.subscribe((tab) => {
      this.currentTab = tab?.id as string;
    });
    this.store.select(loadEditingMode).subscribe((value) => {
      this.isEditing = value;
    });
    this.dashBoardDataEditing$ = this.store
      .select(loadCurrentDashboard)
      .pipe(shareReplay(1));
  }

  ngOnInit() {
    this.dashboardDataSubscription =
      this.DashBoardService.dashBoardData$.subscribe((data) => {
        this.dashBoardData = data as Data;
        if (this.dashBoardData) {
          this.dashboardId = this.route.snapshot.params['dashboardId'];
          this.dashboard = this.route.snapshot.params['dashboard'];
          if (this.currentTab === undefined) {
            this.currentTab =
              this.route.snapshot.params['tabId'] ||
              this.dashBoardData.tabs[0].id;
          }
          const selectedTab = this.dashBoardData.tabs.find(
            (tab) => tab.id === this.currentTab,
          );
          if (selectedTab) {
            this.routerTab(selectedTab);
          }
          setTimeout(() => {}, 1000);
        }
      });
  }

  routerTab(tab: Tab) {
    this.currentTab = tab.id;

    this.tabService.setTabData(tab);
    this.router.navigate([tab.id], { relativeTo: this.route });
  }

  trackByTabId(index: number, tab: any): number {
    return tab.id;
  }

  ngOnDestroy() {
    if (this.dashboardDataSubscription) {
      this.dashboardDataSubscription.unsubscribe();
    }
    if (this.TabDataSubscription) {
      this.TabDataSubscription.unsubscribe();
    }
  }

  editDasboard() {
    this.DashBoardService.setcurrentDashBoardToStore();
  }
  discardChanges() {
    this.store.dispatch(exitEditMode());
  }

  saveDashboard() {
    this.dashBoardDataEditing$
      .pipe(
        take(1),
        switchMap((dashBoardForUpdate) => {
          if (dashBoardForUpdate) {
            return this.DataService.updateDashBoard(
              dashBoardForUpdate,
              this.dashboardId,
            );
          }
          return of(null);
        }),
        filter((response) => response !== null),
        switchMap(() => this.DataService.getDashBoardById(this.dashboardId)),
      )
      .subscribe(() => {
        this.store.dispatch(exitEditMode());
        console.log(this.dashBoardData);
      });
  }

  addTab() {
    this.dialog.open(AddTabDialog);
  }

  deleteTab(tabId: string) {
    this.dialog.open(DeletetabDialog, {
      data: { tabId: tabId },
    });
  }

  editTab(tabId: string, tabTitle: string) {
    this.dialog.open(EditTabDialog, {
      data: { tabId: tabId, tabTitle: tabTitle },
    });
  }
  reorderTab(tabId: string, direction: 'left' | 'right') {
    this.tabService.reorderTabInStore(tabId, direction);
  }

  addCard(tabId: string) {
    this.dashBoardDataEditing$
    .pipe(take(1))
    .subscribe((data) => {
      const tab = data.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        this.dialog.open(AddCardDialog, {
          data: { tabId: tabId, cards: tab.cards },
        });
      } else {
        console.error(`Tab with id ${tabId} not found.`);
      }
    });
  }
}
