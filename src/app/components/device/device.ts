import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../data/types';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './device.html',
  styleUrls: ['./device.scss'],
})
export class Device implements OnInit {
  @Input() item!: Item;
  @Output() checkedChange = new EventEmitter<boolean>();
  isChecked: boolean = false;

  iconMap: { [key: string]: string } = {
    Light: 'light_group',
    Lamp: 'lightbulb',
    TV: 'tv',
  };

  constructor() {}

  ngOnInit() {
    this.isChecked = this.item?.state ?? false;
    this.checkedChange.emit(this.isChecked);
  }

  onToggleClick() {
    this.isChecked = !this.isChecked;
    this.item.state = this.isChecked;
    this.checkedChange.emit(this.isChecked);
  }

  onToggleChange() {
    this.item.state = this.isChecked;
    this.checkedChange.emit(this.isChecked);
  }
  getIcon(label: string): string {
    if (label.includes('Lamp')) {
      return this.iconMap['Lamp'];
    }
    if (label.includes('Light')) {
      return this.iconMap['Light'];
    }
    if (label.includes('Chandelier')) {
      return this.iconMap['Light'];
    }
    if (label.includes('TV')) {
      return this.iconMap['TV'];
    }
    return 'help';
  }
}
