import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  Data,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/app/services/auth';
import { TokenService } from 'src/app/services/token-service';
import { DashBoardItem, User } from 'src/app/data/types';
import { DataService } from 'src/app/services/data';
import { DashboardService } from 'src/app/services/dashboard';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../auth-dialog/auth-dialog';
import { AddDashboardDialog } from '../add-dashboard-dialog/add-dashboard-dialog';
import { DeleteDashboardDialog } from '../delete-dashboard-dialog/delete-dashboard-dialog';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar implements OnInit {
  logoUrl: string = './rs_school.svg';
  isDesktop: boolean = window.innerWidth > 768;
  sidenavOpened: boolean = this.isDesktop;
  token!: string;
  user!: User;
  dashboards!: DashBoardItem[];

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.token = this.tokenService.getToken() || '';
    if (this.token) {
      this.authService.profile().subscribe({
        next: (response) => {
          this.user = response;
          this.dataService.getDashBoards().subscribe(() => {
            this.dataService.dashboardsLoaded$.subscribe((dashBoardloaded) => {
              this.dashboards = dashBoardloaded;
              this.router.navigate([
                this.dashboards[0].title,
                this.dashboards[0].id,
              ]);
            });
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.dialog.open(AuthDialog, {
              data: { message: 'Invalid login or password.' },
            });
          } else {
            this.dialog.open(AuthDialog, {
              data: {
                message: 'Unknown error occurred. Please try again later.',
              },
            });
          }
        },
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = window.innerWidth > 768;
    if (this.isDesktop) {
      this.sidenavOpened = true;
    } else {
      this.sidenavOpened = false;
    }
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  logout() {
    this.authService.logout();
  }

  get userFullName() {
    return this.user ? this.user.fullName : 'Guest';
  }
  get userInitials() {
    return this.user ? this.user.initials : 'GU';
  }

  routerDash(dashboard: DashBoardItem) {
    this.dataService.getDashBoardById(dashboard.id).subscribe((response) => {
      this.router.navigate([dashboard.title, dashboard.id], {
        relativeTo: this.route,
      });
    });
  }

  openAddDashBoard(dashboards: Data) {
    this.dialog.open(AddDashboardDialog, {
      data: { dashboards },
    });
  }

  deleteDashBoard(dashboard: DashBoardItem, dashboards: Data) {
    this.dialog.open(DeleteDashboardDialog, {
      data: { dashboard, dashboards },
    });
  }
}
