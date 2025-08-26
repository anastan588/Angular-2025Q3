import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/app/services/auth';
import { TokenService } from 'src/app/services/token-service';
import { User } from 'src/app/data/types';

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

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  ngOnInit() {
    this.token = this.tokenService.getToken() || '';
    console.log('token', this.token);
    if (this.token) {
      this.authService.profile().subscribe({
        next: (response) => {
          console.log('User is authorized', response, 'profile');
          this.user = response;
        },
        error: (error) => {
          console.error('Authorization failed', error);
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
}
