import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatTabBody, MatTabsModule } from '@angular/material/tabs';
import { Card, Data, Tab } from '../../data/types';
import { CommonModule } from '@angular/common';
import { CardItem } from '../card/card';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Observable, shareReplay, Subscription } from 'rxjs';
import { TabService } from 'src/app/services/tab';
import { DashboardService } from 'src/app/services/dashboard';
import { Store } from '@ngrx/store';
import { DashboardState } from 'src/app/store/smarthome.store';
import { loadCardsFromTbById, loadEditingMode } from 'src/app/store/smarthome.selectors';

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
  isEditing!: boolean;
  cardsEditing$!: Observable<Card[]>;
  constructor(
    private tabService: TabService,
    private store: Store<{ dashboard: DashboardState }>,
  ) {
    this.store.select(loadEditingMode).subscribe((value) => {
      this.isEditing = value;
    });
  }

  ngOnInit(): void {
    this.tab = this.tabService.getTabData() as Tab;
    this.isLoading = false;
    if (this.tab !== null) {
      this.cardsEditing$ = this.store
        .select(loadCardsFromTbById(this.tab.id))
        .pipe(shareReplay(1));
    }
  }
  trackByCardId(index: number, card: any): number {
    return card.id;
  }
}
