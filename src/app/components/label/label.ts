import { Component, Input } from '@angular/core';
import { MatTabBody, MatTabsModule } from '@angular/material/tabs';
import { Data, Tab } from '../../data/types';
import { CommonModule } from '@angular/common';
import { CardItem } from '../card/card';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-label',
  imports: [MatTabsModule, CommonModule, CardItem],
  templateUrl: './label.html',
  styleUrl: './label.scss',
})
export class Label {
  @Input() tab!: Tab;
  constructor(private router: Router,private route: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation()?.extras.state)
    
    
  }
}
