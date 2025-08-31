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
import {
  catchError,
  finalize,
  Observable,
  Subscription,
  tap,
  throwError,
} from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatTabsModule, RouterModule],
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tabService: TabService,
    private DashBoardService: DashboardService
  ) {
    this.TabDataSubscription = this.tabService.tab$.subscribe((tab) => {
      this.currentTab = tab?.id as string;
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
        }
      })
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
}
