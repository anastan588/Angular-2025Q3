import { Component, OnInit, signal } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-home');
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

    isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
