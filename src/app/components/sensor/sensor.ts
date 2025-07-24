import { Component, Input } from '@angular/core';
import { Item } from '../../data/types';

@Component({
  selector: 'app-sensor',
  imports: [],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor {
  @Input() item!: Item;
}
