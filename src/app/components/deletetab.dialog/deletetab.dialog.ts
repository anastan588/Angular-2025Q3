import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TabService } from 'src/app/services/tab';

@Component({
  selector: 'app-deletetab.dialog',
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './deletetab.dialog.html',
  styleUrl: './deletetab.dialog.scss',
})
export class DeletetabDialog {
  constructor(
    public dialogRef: MatDialogRef<DeletetabDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { tabId: string },
    public tabService: TabService,
  ) {}

  delete() {
    const tabId = this.data.tabId;
    this.dialogRef.close();
    this.tabService.deleteTabFromStore(tabId);
  }

  close(): void {
    this.dialogRef.close();
  }
}
