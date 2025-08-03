import { Component, Input } from '@angular/core';
import { Card } from '../../data/types';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Device } from '../device/device';
import { Sensor } from '../sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-item',
  imports: [
    MatCardModule,
    CommonModule,
    Device,
    Sensor,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardItem {
  @Input() card!: Card;
  isChecked!: boolean;
  isDevice: boolean = false;
  ngOnInit() {
    this.isDevice = this.card.items.some((item) => item.type === 'device');
  }

  onCheckedChange(value: boolean) {
    if (value) {
      this.isChecked = value; // Set to true if any device is checked
    } else {
      // Check if any device is checked to update isChecked
      this.isChecked = this.card.items.some(
        (item) => item.type === 'device' && item.state,
      );
    }
    console.log('Checkbox state:', this.isChecked);
  }
}
