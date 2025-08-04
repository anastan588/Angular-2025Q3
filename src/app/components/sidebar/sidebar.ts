import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  logoUrl: string = './rs_school.svg';
}
