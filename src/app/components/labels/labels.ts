import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Data } from '../../data/types';
import { CommonModule } from '@angular/common';
import { CardItem } from '../card/card';

@Component({
  selector: 'app-labels',
  imports: [MatTabsModule, CommonModule, CardItem],
  templateUrl: './labels.html',
  styleUrl: './labels.scss',
})
export class Labels {
  @Input() items!: Data;
}
