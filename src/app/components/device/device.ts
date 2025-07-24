import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../data/types';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-device',
  standalone: true, 
  imports: [MatSlideToggleModule, CommonModule, FormsModule],
  templateUrl: './device.html',
  styleUrls: ['./device.scss'],
})
export class Device implements OnInit {
  @Input() item!: Item;
  isChecked: boolean = false; 

  constructor() {}

  ngOnInit() {
    this.isChecked = this.item?.state ?? false;
  }
}
