import { Component, OnInit, signal } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-home');
}
