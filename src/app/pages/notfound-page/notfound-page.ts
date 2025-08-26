import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound-page',
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './notfound-page.html',
  styleUrl: './notfound-page.scss',
})
export class NotfoundPage {}
