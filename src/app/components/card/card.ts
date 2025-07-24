import { Component, Input } from '@angular/core';
import { Card } from '../../data/types';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Device } from '../device/device';
import { Sensor } from '../sensor/sensor';

@Component({
  selector: 'app-card-item',
  imports: [MatCardModule, CommonModule, Device, Sensor],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardItem {
  @Input() card!: Card;
}
