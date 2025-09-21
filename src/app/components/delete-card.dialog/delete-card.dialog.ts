import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CardsService } from 'src/app/services/cards';

@Component({
  selector: 'app-delete-card.dialog',
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './delete-card.dialog.html',
  styleUrl: './delete-card.dialog.scss',
})
export class DeleteCardDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { tabId: string; cardId: string },
    public cardsService: CardsService,
  ) {}

  delete() {
    const tabId = this.data.tabId;
    this.dialogRef.close();
    this.cardsService.deleteCardByIdFromStore(
      this.data.cardId,
      this.data.tabId,
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
