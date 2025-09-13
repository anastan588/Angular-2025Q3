import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DashBoardItem, Data, Tab } from '../../data/types';
import { DataService } from '../../services/data';
import { Label } from '../label/label';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabService } from 'src/app/services/tab';
import { Observable, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { exitEditMode } from 'src/app/store/smarthome.actions';
import { DashboardState } from 'src/app/store/smarthome.store';
import { loadCurrentDashboard, loadEditingMode } from 'src/app/store/smarthome.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatTabsModule, RouterModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit, OnDestroy {
  dashboard!: string;
  dashboardId!: string;
  dashBoardData!: Data;
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
    private store: Store<{ dashboard: DashboardState }>,
  ) {
    this.TabDataSubscription = this.tabService.tab$.subscribe((tab) => {
      this.currentTab = tab?.id as string;
    });
    this.store
      .select(loadEditingMode)
      .subscribe((value) => {
        this.isEditing = value;
      });
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

  saveDashboard() {}
}
