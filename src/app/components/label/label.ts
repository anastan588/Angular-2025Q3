import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatTabBody, MatTabsModule } from '@angular/material/tabs';
import { Data, Tab } from '../../data/types';
import { CommonModule } from '@angular/common';
import { CardItem } from '../card/card';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabService } from 'src/app/services/tab';
import { DashboardService } from 'src/app/services/dashboard';

@Component({
  selector: 'app-label',
  imports: [MatTabsModule, CommonModule, CardItem],
  templateUrl: './label.html',
  styleUrl: './label.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Label implements OnInit {
  tab!: Tab;
  isLoading: boolean = true;
  constructor(
    private tabService: TabService,
    private route: ActivatedRoute,
    private DashBoardService: DashboardService,
  ) {
  }

  ngOnInit(): void {
    this.tab = this.tabService.getTabData() as Tab;
    this.isLoading = false;
    if (this.tab !== null) {
     
    }
  }
}
