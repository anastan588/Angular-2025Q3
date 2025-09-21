import { Component, Input } from '@angular/core';
import { Card, Tab } from '../../data/types';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Device } from '../device/device';
import { Sensor } from '../sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CardHilight } from 'src/app/directives/card-hilight';
import { Observable, shareReplay } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardState } from 'src/app/store/smarthome.store';
import { loadEditingMode } from 'src/app/store/smarthome.selectors';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCardDialog } from '../delete-card.dialog/delete-card.dialog';

@Component({
  selector: 'app-card-item',
  imports: [
    MatCardModule,
    CommonModule,
    Device,
    Sensor,
    MatSlideToggleModule,
    FormsModule,
    CardHilight,
    MatIcon,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardItem {
  @Input() card!: Card;
  @Input() tab!: Tab;
  isChecked!: boolean;
  isDevice: boolean = false;
  isEditing$!: Observable<boolean>;
  constructor(
    private store: Store<{ dashboard: DashboardState }>,
    private dialog: MatDialog,
  ) {
    // this.store.select(loadEditingMode).subscribe((value) => {
    //   this.isEditing = value;
    // });
    this.isEditing$! = this.store.select(loadEditingMode).pipe(shareReplay(1));
  }
  ngOnInit() {
    this.isDevice = this.card.items.some((item) => item.type === 'device');
  }

  onCheckedChange(value: boolean) {
    if (value) {
      this.isChecked = value;
    } else {
      this.isChecked = this.card.items.some(
        (item) => item.type === 'device' && item.state,
      );
    }
  }

  deleteCard(cardId: string, tabId: string) {
    this.dialog.open(DeleteCardDialog, {
      data: { tabId: tabId, cardId: cardId },
    });
  }
}
