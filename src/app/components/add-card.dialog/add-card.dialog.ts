import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Data } from '@angular/router';
import { AddTabDialog } from '../add-tab.dialog/add-tab.dialog';
import { UniqueTitleValidator } from 'src/app/validators/uniqueTitleValidator';
import { UniqueIDValidator } from 'src/app/validators/uniqueIDValidator';
import { idCaseValidator } from 'src/app/validators/idCaseValidator';
import { titleCaseValidator } from 'src/app/validators/titleCaseValidator';
import { duplicateValidator } from 'src/app/validators/duplicateValidator';
import { Store } from '@ngrx/store';
import { DashboardState } from 'src/app/store/smarthome.store';
import { loadCurrentDashboard } from 'src/app/store/smarthome.selectors';
import { Card } from 'src/app/data/types';
import { CardsService } from 'src/app/services/cards';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-card.dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './add-card.dialog.html',
  styleUrl: './add-card.dialog.scss',
})
export class AddCardDialog {
  cardForm: FormGroup;
  dashBoard!: Data;

  constructor(
    public dialogRef: MatDialogRef<AddTabDialog>,
    private uniqueTitleValidator: UniqueTitleValidator,
    private uniqueIDValidator: UniqueIDValidator,
    private caseIDValidator: idCaseValidator,
    private caseTitleValidator: titleCaseValidator,
    private duplicateValidator: duplicateValidator,
    private store: Store<{ dashboard: DashboardState }>,
    private cardsService: CardsService,
    @Inject(MAT_DIALOG_DATA) public data: { tabId: string; cards: Card[] },
  ) {
    this.store.select(loadCurrentDashboard).subscribe((value) => {
      this.dashBoard = value;
    });
    this.cardForm = new FormGroup(
      {
        id: new FormControl(
          '',
          [Validators.required, Validators.maxLength(30)],
          [
            this.caseIDValidator.validateID(),
            this.uniqueIDValidator.validateID(this.data.cards),
          ],
        ),
        title: new FormControl(
          '',
          [Validators.required, Validators.maxLength(50)],
          [
            this.caseTitleValidator.validateTitle(),
            this.uniqueTitleValidator.validateTitle(this.data.cards),
          ],
        ),
        layout: new FormControl('singleDevice', [Validators.required]),
      },
      { validators: this.duplicateValidator.validateDuplicate('id', 'title') },
    );
  }

  get id() {
    return this.cardForm.get('id');
  }

  get title() {
    return this.cardForm.get('title');
  }

  markIdAsTouched() {
    const control = this.cardForm.get('id');
    if (control?.errors) control?.markAsTouched();
  }

  markTitleAsTouched() {
    const control = this.cardForm.get('title');
    if (control?.errors) control?.markAsTouched();
  }

  markLayoutAsTouched() {
    const control = this.cardForm.get('layout');
    if (control?.errors) control?.markAsTouched();
  }
  onSubmit() {
    console.log(this.cardForm.valid, 'valid');
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;
      const newCard: Card = {
        id: formValue.id,
        title: formValue.title,
        layout: formValue.layout,
        items: [],
      };
      this.cardsService.addNewCardToStore(newCard, this.data.tabId);
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
