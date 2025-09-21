import { Component, Input } from '@angular/core';
import { Card, Item } from '../../data/types';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormatvaluesPipe } from 'src/app/pipes/formatvalues-pipe';

@Component({
  selector: 'app-sensor',
  imports: [MatIconModule, CommonModule, FormatvaluesPipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor {
  @Input() item!: Item;
  @Input() card!: Card;
  iconMap: { [key: string]: string } = {
    Temp: 'thermostat',
    Humidity: 'dew_point',
    CO2: 'co2',
    Weather: 'thunderstorm',
    Sensor: 'sensors',
  };

  getIcon(label: string): string {
    if (label.includes('Temperature')) {
      return this.iconMap['Temp'];
    }
    if (label.includes('Humidity')) {
      return this.iconMap['Humidity'];
    }
    if (label.includes('CO2')) {
      return this.iconMap['CO2'];
    }
    if (label.includes('Weather')) {
      return this.iconMap['Weather'];
    }
    if (label.includes('Sensor')) {
      return this.iconMap['Sensor'];
    }
    return 'help';
  }
}
