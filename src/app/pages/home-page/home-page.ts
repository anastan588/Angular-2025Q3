import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Labels } from '../../components/labels/labels';
import { Data } from '../../data/types';
import { DataService } from '../../services/data';
import { Dashboard } from '../../components/dashboard/dashboard';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Sidebar, Dashboard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
