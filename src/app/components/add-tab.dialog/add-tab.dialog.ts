import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Data, Tab } from 'src/app/data/types';
import { TabService } from 'src/app/services/tab';
import { loadCurrentDashboard } from 'src/app/store/smarthome.selectors';
import { DashboardState } from 'src/app/store/smarthome.store';
import { duplicateValidator } from 'src/app/validators/duplicateValidator';
import { idCaseValidator } from 'src/app/validators/idCaseValidator';
import { titleCaseValidator } from 'src/app/validators/titleCaseValidator';

import { UniqueIDValidator } from 'src/app/validators/uniqueIDValidator';
import { UniqueTitleValidator } from 'src/app/validators/uniqueTitleValidator';

@Component({
  selector: 'app-add-tab.dialog',
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
  templateUrl: './add-tab.dialog.html',
  styleUrl: './add-tab.dialog.scss',
})
export class AddTabDialog {
  tabForm: FormGroup;
  dashBoard!: Data;
  constructor(
    public dialogRef: MatDialogRef<AddTabDialog>,
    public tabService: TabService,
    private uniqueTitleValidator: UniqueTitleValidator,
    private uniqueIDValidator: UniqueIDValidator,
    private caseIDValidator: idCaseValidator,
    private caseTitleValidator: titleCaseValidator,
    private duplicateValidator: duplicateValidator,
    private store: Store<{ dashboard: DashboardState }>,
  ) {
    this.store.select(loadCurrentDashboard).subscribe((value) => {
      this.dashBoard = value;
    });
    this.tabForm = new FormGroup(
      {
        id: new FormControl(
          '',
          [Validators.required, Validators.maxLength(30)],
          [
            this.caseIDValidator.validateID(),
            this.uniqueIDValidator.validateID(this.dashBoard),
          ],
        ),
        title: new FormControl(
          '',
          [Validators.required, Validators.maxLength(50)],
          [
            this.caseTitleValidator.validateTitle(),
            this.uniqueTitleValidator.validateTitle(this.dashBoard),
          ],
        ),
      },
      { validators: this.duplicateValidator.validateDuplicate('id', 'title') },
    );
  }

  get id() {
    return this.tabForm.get('id');
  }

  get title() {
    return this.tabForm.get('title');
  }

  markIdAsTouched() {
    const control = this.tabForm.get('id');
    if (control?.errors) control?.markAsTouched();
  }

  markTitleAsTouched() {
    const control = this.tabForm.get('title');
    if (control?.errors) control?.markAsTouched();
  }
  onSubmit() {
    console.log(this.tabForm.valid, 'valid');
    if (this.tabForm.valid) {
      const formValue = this.tabForm.value;
      const newTab: Tab = {
        id: formValue.id,
        title: formValue.title,
        cards: [],
      };
      this.tabService.addNewTabToStore(newTab);
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
