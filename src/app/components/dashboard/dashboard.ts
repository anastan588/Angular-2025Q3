import { Component, OnInit } from '@angular/core';
import { DashBoardItem, Data, Tab } from '../../data/types';
import { DataService } from '../../services/data';
import { Label } from '../label/label';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatTabsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  dashboard!: string;
  dashboardId!: string;
  dashBoardData!: Data;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe((params) => {
      this.dashboardId = params['dashboardId'];
      this.dashboard = params['dashboard'];
      if (this.dashboardId !== undefined) {
        this.loadDashboard(this.dashboardId);
      }
    });
  }

  ngOnInit() {
    this.dataService.firstDashboardsLoad$.subscribe((isDashBoardLoaded) => {
      if (!isDashBoardLoaded) {
        this.dataService.dashboardsLoaded$.subscribe((dashboardsLoaded) => {
          this.dataService.setFirstDashboardsLoad(true);
          if (dashboardsLoaded.length > 0) {
            const firstDashboard = dashboardsLoaded[0];
            this.dashboard = firstDashboard.title;
            this.dashboardId = firstDashboard.id;
            if (
              this.route.snapshot.params['dashboardId'] !== this.dashboardId &&
              this.dashboardId !== undefined
            ) {
              console.log(this.dashboard, 1455787878);
              this.router.navigate([this.dashboard, this.dashboardId]);
            }
          }
        });
      }
    });
  }

  loadDashboard(dashboardId: string): void {
    this.dataService.getDashBoardById(dashboardId).subscribe(
      (dashboardData) => {
        this.dashBoardData = dashboardData;
        console.log('Dashboard data loaded:', dashboardData);
      },
      (error) => {
        console.error('Error loading dashboard:', error);
      },
    );
  }

  logRouterLink(tab: Tab) {
    console.log(`/${this.dashboard}/${this.dashboardId}/${tab.id}`);
    this.router.navigate( [this.dashboard, this.dashboardId, tab.id], {state: tab});
  }
}
