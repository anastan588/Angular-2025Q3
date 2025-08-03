import { Component, OnInit } from '@angular/core';
import { Data } from '../../data/types';
import { DataService } from '../../services/data';
import { Labels } from '../labels/labels';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [Labels, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  items: Data = {
    tabs: [],
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.items = data;
      console.log(this.items);
    });
  }
}
