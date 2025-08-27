import { Component } from '@angular/core';
import { Dashboard } from '../../components/dashboard/dashboard';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Dashboard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
